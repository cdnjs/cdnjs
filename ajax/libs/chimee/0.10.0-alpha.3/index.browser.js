
/**
 * chimee v0.10.0-alpha.3
 * (c) 2017-2018 toxic-johann
 * Released under MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Chimee = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _global$1 = /*#__PURE__*/Object.freeze({
		default: _global,
		__moduleExports: _global
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _core$1 = /*#__PURE__*/Object.freeze({
		default: _core,
		__moduleExports: _core,
		version: _core_1
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	var _aFunction$1 = /*#__PURE__*/Object.freeze({
		default: _aFunction,
		__moduleExports: _aFunction
	});

	var aFunction = ( _aFunction$1 && _aFunction ) || _aFunction$1;

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
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

	var _ctx$1 = /*#__PURE__*/Object.freeze({
		default: _ctx,
		__moduleExports: _ctx
	});

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _isObject$1 = /*#__PURE__*/Object.freeze({
		default: _isObject,
		__moduleExports: _isObject
	});

	var isObject = ( _isObject$1 && _isObject ) || _isObject$1;

	var _anObject = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _anObject$1 = /*#__PURE__*/Object.freeze({
		default: _anObject,
		__moduleExports: _anObject
	});

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	var _fails$1 = /*#__PURE__*/Object.freeze({
		default: _fails,
		__moduleExports: _fails
	});

	var fails = ( _fails$1 && _fails ) || _fails$1;

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var _descriptors$1 = /*#__PURE__*/Object.freeze({
		default: _descriptors,
		__moduleExports: _descriptors
	});

	var require$$0 = ( _global$1 && _global ) || _global$1;

	var document$1 = require$$0.document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document$1) && isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _domCreate$1 = /*#__PURE__*/Object.freeze({
		default: _domCreate,
		__moduleExports: _domCreate
	});

	var require$$0$1 = ( _descriptors$1 && _descriptors ) || _descriptors$1;

	var cel = ( _domCreate$1 && _domCreate ) || _domCreate$1;

	var _ie8DomDefine = !require$$0$1 && !fails(function () {
	  return Object.defineProperty(cel('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	var _ie8DomDefine$1 = /*#__PURE__*/Object.freeze({
		default: _ie8DomDefine,
		__moduleExports: _ie8DomDefine
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var _toPrimitive$1 = /*#__PURE__*/Object.freeze({
		default: _toPrimitive,
		__moduleExports: _toPrimitive
	});

	var anObject = ( _anObject$1 && _anObject ) || _anObject$1;

	var IE8_DOM_DEFINE = ( _ie8DomDefine$1 && _ie8DomDefine ) || _ie8DomDefine$1;

	var toPrimitive = ( _toPrimitive$1 && _toPrimitive ) || _toPrimitive$1;

	var dP = Object.defineProperty;

	var f = require$$0$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
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

	var _objectDp = {
		f: f
	};

	var _objectDp$1 = /*#__PURE__*/Object.freeze({
		default: _objectDp,
		__moduleExports: _objectDp,
		f: f
	});

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _propertyDesc$1 = /*#__PURE__*/Object.freeze({
		default: _propertyDesc,
		__moduleExports: _propertyDesc
	});

	var $defineProperty = ( _objectDp$1 && _objectDp ) || _objectDp$1;

	var createDesc = ( _propertyDesc$1 && _propertyDesc ) || _propertyDesc$1;

	var _hide = require$$0$1 ? function (object, key, value) {
	  return $defineProperty.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var _hide$1 = /*#__PURE__*/Object.freeze({
		default: _hide,
		__moduleExports: _hide
	});

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _has$1 = /*#__PURE__*/Object.freeze({
		default: _has,
		__moduleExports: _has
	});

	var require$$1 = ( _core$1 && _core ) || _core$1;

	var ctx = ( _ctx$1 && _ctx ) || _ctx$1;

	var require$$5 = ( _hide$1 && _hide ) || _hide$1;

	var $has = ( _has$1 && _has ) || _has$1;

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? require$$1 : require$$1[name] || (require$$1[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? require$$0 : IS_STATIC ? require$$0[name] : (require$$0[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && $has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, require$$0)
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
	      if (type & $export.R && expProto && !expProto[key]) require$$5(expProto, key, out);
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
	var _export = $export;

	var _export$1 = /*#__PURE__*/Object.freeze({
		default: _export,
		__moduleExports: _export
	});

	var $export$1 = ( _export$1 && _export ) || _export$1;

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export$1($export$1.S + $export$1.F * !require$$0$1, 'Object', { defineProperty: $defineProperty.f });

	var $Object = require$$1.Object;
	var defineProperty = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};

	var defineProperty$1 = /*#__PURE__*/Object.freeze({
		default: defineProperty,
		__moduleExports: defineProperty
	});

	var require$$0$2 = ( defineProperty$1 && defineProperty ) || defineProperty$1;

	var defineProperty$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$2, __esModule: true };
	});

	var _Object$defineProperty = unwrapExports(defineProperty$2);

	var defineProperty$3 = /*#__PURE__*/Object.freeze({
		default: _Object$defineProperty,
		__moduleExports: defineProperty$2
	});

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var _cof$1 = /*#__PURE__*/Object.freeze({
		default: _cof,
		__moduleExports: _cof
	});

	var cof = ( _cof$1 && _cof ) || _cof$1;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

	var _iobject$1 = /*#__PURE__*/Object.freeze({
		default: _iobject,
		__moduleExports: _iobject
	});

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	var _defined$1 = /*#__PURE__*/Object.freeze({
		default: _defined,
		__moduleExports: _defined
	});

	var IObject = ( _iobject$1 && _iobject ) || _iobject$1;

	var defined = ( _defined$1 && _defined ) || _defined$1;

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return IObject(defined(it));
	};

	var _toIobject$1 = /*#__PURE__*/Object.freeze({
		default: _toIobject,
		__moduleExports: _toIobject
	});

	var f$1 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$1
	};

	var _objectPie$1 = /*#__PURE__*/Object.freeze({
		default: _objectPie,
		__moduleExports: _objectPie,
		f: f$1
	});

	var pIE = ( _objectPie$1 && _objectPie ) || _objectPie$1;

	var toIObject = ( _toIobject$1 && _toIobject ) || _toIobject$1;

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$2 = require$$0$1 ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if ($has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$2
	};

	var _objectGopd$1 = /*#__PURE__*/Object.freeze({
		default: _objectGopd,
		__moduleExports: _objectGopd,
		f: f$2
	});

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (require$$1.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export$1($export$1.S + $export$1.F * fails(function () { fn(1); }), 'Object', exp);
	};

	var _objectSap$1 = /*#__PURE__*/Object.freeze({
		default: _objectSap,
		__moduleExports: _objectSap
	});

	var gOPD$1 = ( _objectGopd$1 && _objectGopd ) || _objectGopd$1;

	var require$$1$1 = ( _objectSap$1 && _objectSap ) || _objectSap$1;

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)

	var $getOwnPropertyDescriptor = gOPD$1.f;

	require$$1$1('getOwnPropertyDescriptor', function () {
	  return function getOwnPropertyDescriptor(it, key) {
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

	var $Object$1 = require$$1.Object;
	var getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  return $Object$1.getOwnPropertyDescriptor(it, key);
	};

	var getOwnPropertyDescriptor$1 = /*#__PURE__*/Object.freeze({
		default: getOwnPropertyDescriptor,
		__moduleExports: getOwnPropertyDescriptor
	});

	var require$$0$3 = ( getOwnPropertyDescriptor$1 && getOwnPropertyDescriptor ) || getOwnPropertyDescriptor$1;

	var getOwnPropertyDescriptor$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$3, __esModule: true };
	});

	var _Object$getOwnPropertyDescriptor = unwrapExports(getOwnPropertyDescriptor$2);

	var getOwnPropertyDescriptor$3 = /*#__PURE__*/Object.freeze({
		default: _Object$getOwnPropertyDescriptor,
		__moduleExports: getOwnPropertyDescriptor$2
	});

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(defined(it));
	};

	var _toObject$1 = /*#__PURE__*/Object.freeze({
		default: _toObject,
		__moduleExports: _toObject
	});

	var SHARED = '__core-js_shared__';
	var store = require$$0[SHARED] || (require$$0[SHARED] = {});
	var _shared = function (key) {
	  return store[key] || (store[key] = {});
	};

	var _shared$1 = /*#__PURE__*/Object.freeze({
		default: _shared,
		__moduleExports: _shared
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _uid$1 = /*#__PURE__*/Object.freeze({
		default: _uid,
		__moduleExports: _uid
	});

	var shared = ( _shared$1 && _shared ) || _shared$1;

	var uid = ( _uid$1 && _uid ) || _uid$1;

	var shared$1 = shared('keys');

	var _sharedKey = function (key) {
	  return shared$1[key] || (shared$1[key] = uid(key));
	};

	var _sharedKey$1 = /*#__PURE__*/Object.freeze({
		default: _sharedKey,
		__moduleExports: _sharedKey
	});

	var toObject = ( _toObject$1 && _toObject ) || _toObject$1;

	var require$$1$2 = ( _sharedKey$1 && _sharedKey ) || _sharedKey$1;

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO = require$$1$2('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if ($has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var _objectGpo$1 = /*#__PURE__*/Object.freeze({
		default: _objectGpo,
		__moduleExports: _objectGpo
	});

	var $getPrototypeOf = ( _objectGpo$1 && _objectGpo ) || _objectGpo$1;

	// 19.1.2.9 Object.getPrototypeOf(O)



	require$$1$1('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject(it));
	  };
	});

	var getPrototypeOf = require$$1.Object.getPrototypeOf;

	var getPrototypeOf$1 = /*#__PURE__*/Object.freeze({
		default: getPrototypeOf,
		__moduleExports: getPrototypeOf
	});

	var require$$0$4 = ( getPrototypeOf$1 && getPrototypeOf ) || getPrototypeOf$1;

	var getPrototypeOf$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$4, __esModule: true };
	});

	var _Object$getPrototypeOf = unwrapExports(getPrototypeOf$2);

	var getPrototypeOf$3 = /*#__PURE__*/Object.freeze({
		default: _Object$getPrototypeOf,
		__moduleExports: getPrototypeOf$2
	});

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	var _toInteger$1 = /*#__PURE__*/Object.freeze({
		default: _toInteger,
		__moduleExports: _toInteger
	});

	var toInteger = ( _toInteger$1 && _toInteger ) || _toInteger$1;

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
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

	var _stringAt$1 = /*#__PURE__*/Object.freeze({
		default: _stringAt,
		__moduleExports: _stringAt
	});

	var _library = true;

	var _library$1 = /*#__PURE__*/Object.freeze({
		default: _library,
		__moduleExports: _library
	});

	var _redefine = require$$5;

	var _redefine$1 = /*#__PURE__*/Object.freeze({
		default: _redefine,
		__moduleExports: _redefine
	});

	var _iterators = {};

	var _iterators$1 = /*#__PURE__*/Object.freeze({
		default: _iterators,
		__moduleExports: _iterators
	});

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var _toLength$1 = /*#__PURE__*/Object.freeze({
		default: _toLength,
		__moduleExports: _toLength
	});

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	var _toAbsoluteIndex$1 = /*#__PURE__*/Object.freeze({
		default: _toAbsoluteIndex,
		__moduleExports: _toAbsoluteIndex
	});

	var toLength = ( _toLength$1 && _toLength ) || _toLength$1;

	var toAbsoluteIndex = ( _toAbsoluteIndex$1 && _toAbsoluteIndex ) || _toAbsoluteIndex$1;

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
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

	var _arrayIncludes$1 = /*#__PURE__*/Object.freeze({
		default: _arrayIncludes,
		__moduleExports: _arrayIncludes
	});

	var require$$0$5 = ( _arrayIncludes$1 && _arrayIncludes ) || _arrayIncludes$1;

	var arrayIndexOf = require$$0$5(false);
	var IE_PROTO$1 = require$$1$2('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO$1) $has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if ($has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	var _objectKeysInternal$1 = /*#__PURE__*/Object.freeze({
		default: _objectKeysInternal,
		__moduleExports: _objectKeysInternal
	});

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	var _enumBugKeys$1 = /*#__PURE__*/Object.freeze({
		default: _enumBugKeys,
		__moduleExports: _enumBugKeys
	});

	var $keys = ( _objectKeysInternal$1 && _objectKeysInternal ) || _objectKeysInternal$1;

	var require$$0$6 = ( _enumBugKeys$1 && _enumBugKeys ) || _enumBugKeys$1;

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return $keys(O, require$$0$6);
	};

	var _objectKeys$1 = /*#__PURE__*/Object.freeze({
		default: _objectKeys,
		__moduleExports: _objectKeys
	});

	var getKeys = ( _objectKeys$1 && _objectKeys ) || _objectKeys$1;

	var _objectDps = require$$0$1 ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) $defineProperty.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var _objectDps$1 = /*#__PURE__*/Object.freeze({
		default: _objectDps,
		__moduleExports: _objectDps
	});

	var document$2 = require$$0.document;
	var _html = document$2 && document$2.documentElement;

	var _html$1 = /*#__PURE__*/Object.freeze({
		default: _html,
		__moduleExports: _html
	});

	var dPs = ( _objectDps$1 && _objectDps ) || _objectDps$1;

	var html = ( _html$1 && _html ) || _html$1;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$2 = require$$1$2('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = cel('iframe');
	  var i = require$$0$6.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][require$$0$6[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$2] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};

	var _objectCreate$1 = /*#__PURE__*/Object.freeze({
		default: _objectCreate,
		__moduleExports: _objectCreate
	});

	var _wks = createCommonjsModule(function (module) {
	var store = shared('wks');

	var Symbol = require$$0.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var _wks$1 = /*#__PURE__*/Object.freeze({
		default: _wks,
		__moduleExports: _wks
	});

	var wks = ( _wks$1 && _wks ) || _wks$1;

	var def = $defineProperty.f;

	var TAG = wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !$has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var _setToStringTag$1 = /*#__PURE__*/Object.freeze({
		default: _setToStringTag,
		__moduleExports: _setToStringTag
	});

	var require$$0$7 = ( _objectCreate$1 && _objectCreate ) || _objectCreate$1;

	var setToStringTag = ( _setToStringTag$1 && _setToStringTag ) || _setToStringTag$1;

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	require$$5(IteratorPrototype, wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = require$$0$7(IteratorPrototype, { next: createDesc(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

	var _iterCreate$1 = /*#__PURE__*/Object.freeze({
		default: _iterCreate,
		__moduleExports: _iterCreate
	});

	var LIBRARY = ( _library$1 && _library ) || _library$1;

	var redefine = ( _redefine$1 && _redefine ) || _redefine$1;

	var Iterators = ( _iterators$1 && _iterators ) || _iterators$1;

	var $iterCreate = ( _iterCreate$1 && _iterCreate ) || _iterCreate$1;

	var ITERATOR = wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
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
	    IteratorPrototype = $getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') require$$5(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    require$$5(proto, ITERATOR, $default);
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
	    } else $export$1($export$1.P + $export$1.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var _iterDefine$1 = /*#__PURE__*/Object.freeze({
		default: _iterDefine,
		__moduleExports: _iterDefine
	});

	var require$$0$8 = ( _stringAt$1 && _stringAt ) || _stringAt$1;

	var $iterDefine = ( _iterDefine$1 && _iterDefine ) || _iterDefine$1;

	var $at = require$$0$8(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	$iterDefine(String, 'String', function (iterated) {
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

	var _addToUnscopables = function () { /* empty */ };

	var _addToUnscopables$1 = /*#__PURE__*/Object.freeze({
		default: _addToUnscopables,
		__moduleExports: _addToUnscopables
	});

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var _iterStep$1 = /*#__PURE__*/Object.freeze({
		default: _iterStep,
		__moduleExports: _iterStep
	});

	var addToUnscopables = ( _addToUnscopables$1 && _addToUnscopables ) || _addToUnscopables$1;

	var step = ( _iterStep$1 && _iterStep ) || _iterStep$1;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = $iterDefine(Array, 'Array', function (iterated, kind) {
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

	var TO_STRING_TAG = wks('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = require$$0[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) require$$5(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

	var f$3 = wks;

	var _wksExt = {
		f: f$3
	};

	var _wksExt$1 = /*#__PURE__*/Object.freeze({
		default: _wksExt,
		__moduleExports: _wksExt,
		f: f$3
	});

	var wksExt = ( _wksExt$1 && _wksExt ) || _wksExt$1;

	var iterator = wksExt.f('iterator');

	var iterator$1 = /*#__PURE__*/Object.freeze({
		default: iterator,
		__moduleExports: iterator
	});

	var require$$0$9 = ( iterator$1 && iterator ) || iterator$1;

	var iterator$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$9, __esModule: true };
	});

	var iterator$3 = unwrapExports(iterator$2);

	var iterator$4 = /*#__PURE__*/Object.freeze({
		default: iterator$3,
		__moduleExports: iterator$2
	});

	var _meta = createCommonjsModule(function (module) {
	var META = uid('meta');


	var setDesc = $defineProperty.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !fails(function () {
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
	  if (!$has(it, META)) {
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
	  if (!$has(it, META)) {
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
	  if (FREEZE && meta.NEED && isExtensible(it) && !$has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var _meta$1 = /*#__PURE__*/Object.freeze({
		default: _meta,
		__moduleExports: _meta,
		KEY: _meta_1,
		NEED: _meta_2,
		fastKey: _meta_3,
		getWeak: _meta_4,
		onFreeze: _meta_5
	});

	var defineProperty$4 = $defineProperty.f;
	var _wksDefine = function (name) {
	  var $Symbol = require$$1.Symbol || (require$$1.Symbol = LIBRARY ? {} : require$$0.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$4($Symbol, name, { value: wksExt.f(name) });
	};

	var _wksDefine$1 = /*#__PURE__*/Object.freeze({
		default: _wksDefine,
		__moduleExports: _wksDefine
	});

	var f$4 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$4
	};

	var _objectGops$1 = /*#__PURE__*/Object.freeze({
		default: _objectGops,
		__moduleExports: _objectGops,
		f: f$4
	});

	var gOPS = ( _objectGops$1 && _objectGops ) || _objectGops$1;

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
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

	var _enumKeys$1 = /*#__PURE__*/Object.freeze({
		default: _enumKeys,
		__moduleExports: _enumKeys
	});

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};

	var _isArray$1 = /*#__PURE__*/Object.freeze({
		default: _isArray,
		__moduleExports: _isArray
	});

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = require$$0$6.concat('length', 'prototype');

	var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$5
	};

	var _objectGopn$1 = /*#__PURE__*/Object.freeze({
		default: _objectGopn,
		__moduleExports: _objectGopn,
		f: f$5
	});

	var gOPN = ( _objectGopn$1 && _objectGopn ) || _objectGopn$1;

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN$1 = gOPN.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN$1(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$6 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(toIObject(it));
	};

	var _objectGopnExt = {
		f: f$6
	};

	var _objectGopnExt$1 = /*#__PURE__*/Object.freeze({
		default: _objectGopnExt,
		__moduleExports: _objectGopnExt,
		f: f$6
	});

	var require$$0$10 = ( _meta$1 && _meta ) || _meta$1;

	var require$$0$11 = ( _wksDefine$1 && _wksDefine ) || _wksDefine$1;

	var enumKeys = ( _enumKeys$1 && _enumKeys ) || _enumKeys$1;

	var isArray = ( _isArray$1 && _isArray ) || _isArray$1;

	var require$$1$3 = ( _objectGopnExt$1 && _objectGopnExt ) || _objectGopnExt$1;

	// ECMAScript 6 symbols shim





	var META = require$$0$10.KEY;



















	var gOPD$2 = gOPD$1.f;
	var dP$1 = $defineProperty.f;
	var gOPN$2 = require$$1$3.f;
	var $Symbol = require$$0.Symbol;
	var $JSON = require$$0.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = wks('_hidden');
	var TO_PRIMITIVE = wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var OPSymbols = shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = require$$0.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = require$$0$1 && fails(function () {
	  return require$$0$7(dP$1({}, 'a', {
	    get: function () { return dP$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$2(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$1(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
	} : dP$1;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = require$$0$7($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty$1 = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty$1(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if ($has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!$has(it, HIDDEN)) dP$1(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if ($has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = require$$0$7(D, { enumerable: createDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$1(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty$1(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? require$$0$7(it) : $defineProperties(require$$0$7(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto$1 && $has(AllSymbols, key) && !$has(OPSymbols, key)) return false;
	  return E || !$has(this, key) || !$has(AllSymbols, key) || $has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor$1 = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto$1 && $has(AllSymbols, key) && !$has(OPSymbols, key)) return;
	  var D = gOPD$2(it, key);
	  if (D && $has(AllSymbols, key) && !($has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$2(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!$has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$2(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if ($has(AllSymbols, key = names[i++]) && (IS_OP ? $has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if ($has(this, HIDDEN) && $has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (require$$0$1 && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  gOPD$1.f = $getOwnPropertyDescriptor$1;
	  $defineProperty.f = $defineProperty$1;
	  gOPN.f = require$$1$3.f = $getOwnPropertyNames;
	  pIE.f = $propertyIsEnumerable;
	  gOPS.f = $getOwnPropertySymbols;

	  if (require$$0$1 && !LIBRARY) {
	    redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}

	$export$1($export$1.G + $export$1.W + $export$1.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

	for (var wellKnownSymbols = getKeys(wks.store), k = 0; wellKnownSymbols.length > k;) require$$0$11(wellKnownSymbols[k++]);

	$export$1($export$1.S + $export$1.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return $has(SymbolRegistry, key += '')
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

	$export$1($export$1.S + $export$1.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty$1,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor$1,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export$1($export$1.S + $export$1.F * (!USE_NATIVE || fails(function () {
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
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || require$$5($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(require$$0.JSON, 'JSON', true);

	require$$0$11('asyncIterator');

	require$$0$11('observable');

	var symbol = require$$1.Symbol;

	var symbol$1 = /*#__PURE__*/Object.freeze({
		default: symbol,
		__moduleExports: symbol
	});

	var require$$0$12 = ( symbol$1 && symbol ) || symbol$1;

	var symbol$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$12, __esModule: true };
	});

	var symbol$3 = unwrapExports(symbol$2);

	var symbol$4 = /*#__PURE__*/Object.freeze({
		default: symbol$3,
		__moduleExports: symbol$2
	});

	var _iterator = ( iterator$4 && iterator$3 ) || iterator$4;

	var _symbol = ( symbol$4 && symbol$3 ) || symbol$4;

	var _typeof_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _iterator2 = _interopRequireDefault(_iterator);



	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};
	});

	var _typeof = unwrapExports(_typeof_1);

	var classCallCheck = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	});

	var _classCallCheck = unwrapExports(classCallCheck);

	var possibleConstructorReturn = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _typeof3 = _interopRequireDefault(_typeof_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};
	});

	var _possibleConstructorReturn = unwrapExports(possibleConstructorReturn);

	var _getPrototypeOf = ( getPrototypeOf$3 && _Object$getPrototypeOf ) || getPrototypeOf$3;

	var _getOwnPropertyDescriptor = ( getOwnPropertyDescriptor$3 && _Object$getOwnPropertyDescriptor ) || getOwnPropertyDescriptor$3;

	var get = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);



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
	});

	var _get = unwrapExports(get);

	var _defineProperty = ( defineProperty$3 && _Object$defineProperty ) || defineProperty$3;

	var createClass = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



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
	});

	var _createClass = unwrapExports(createClass);

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = ctx(Function.call, gOPD$1.f(Object.prototype, '__proto__').set, 2);
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
	var _setProto_1 = _setProto.set;
	var _setProto_2 = _setProto.check;

	var _setProto$1 = /*#__PURE__*/Object.freeze({
		default: _setProto,
		__moduleExports: _setProto,
		set: _setProto_1,
		check: _setProto_2
	});

	var require$$0$13 = ( _setProto$1 && _setProto ) || _setProto$1;

	// 19.1.3.19 Object.setPrototypeOf(O, proto)

	$export$1($export$1.S, 'Object', { setPrototypeOf: require$$0$13.set });

	var setPrototypeOf = require$$1.Object.setPrototypeOf;

	var setPrototypeOf$1 = /*#__PURE__*/Object.freeze({
		default: setPrototypeOf,
		__moduleExports: setPrototypeOf
	});

	var require$$0$14 = ( setPrototypeOf$1 && setPrototypeOf ) || setPrototypeOf$1;

	var setPrototypeOf$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$14, __esModule: true };
	});

	var setPrototypeOf$3 = unwrapExports(setPrototypeOf$2);

	var setPrototypeOf$4 = /*#__PURE__*/Object.freeze({
		default: setPrototypeOf$3,
		__moduleExports: setPrototypeOf$2
	});

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export$1($export$1.S, 'Object', { create: require$$0$7 });

	var $Object$2 = require$$1.Object;
	var create = function create(P, D) {
	  return $Object$2.create(P, D);
	};

	var create$1 = /*#__PURE__*/Object.freeze({
		default: create,
		__moduleExports: create
	});

	var require$$0$15 = ( create$1 && create ) || create$1;

	var create$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$15, __esModule: true };
	});

	var _Object$create = unwrapExports(create$2);

	var create$3 = /*#__PURE__*/Object.freeze({
		default: _Object$create,
		__moduleExports: create$2
	});

	var _setPrototypeOf = ( setPrototypeOf$4 && setPrototypeOf$3 ) || setPrototypeOf$4;

	var _create = ( create$3 && _Object$create ) || create$3;

	var inherits = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);



	var _create2 = _interopRequireDefault(_create);



	var _typeof3 = _interopRequireDefault(_typeof_1);

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
	});

	var _inherits = unwrapExports(inherits);

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = wks('toStringTag');
	// ES3 wrong here
	var ARG = cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var _classof$1 = /*#__PURE__*/Object.freeze({
		default: _classof,
		__moduleExports: _classof
	});

	var classof = ( _classof$1 && _classof ) || _classof$1;

	var ITERATOR$1 = wks('iterator');

	var core_isIterable = require$$1.isIterable = function (it) {
	  var O = Object(it);
	  return O[ITERATOR$1] !== undefined
	    || '@@iterator' in O
	    // eslint-disable-next-line no-prototype-builtins
	    || Iterators.hasOwnProperty(classof(O));
	};

	var core_isIterable$1 = /*#__PURE__*/Object.freeze({
		default: core_isIterable,
		__moduleExports: core_isIterable
	});

	var require$$2 = ( core_isIterable$1 && core_isIterable ) || core_isIterable$1;

	var isIterable = require$$2;

	var isIterable$1 = /*#__PURE__*/Object.freeze({
		default: isIterable,
		__moduleExports: isIterable
	});

	var require$$0$16 = ( isIterable$1 && isIterable ) || isIterable$1;

	var isIterable$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$16, __esModule: true };
	});

	var isIterable$3 = unwrapExports(isIterable$2);

	var isIterable$4 = /*#__PURE__*/Object.freeze({
		default: isIterable$3,
		__moduleExports: isIterable$2
	});

	var ITERATOR$2 = wks('iterator');

	var core_getIteratorMethod = require$$1.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

	var core_getIteratorMethod$1 = /*#__PURE__*/Object.freeze({
		default: core_getIteratorMethod,
		__moduleExports: core_getIteratorMethod
	});

	var getIterFn = ( core_getIteratorMethod$1 && core_getIteratorMethod ) || core_getIteratorMethod$1;

	var core_getIterator = require$$1.getIterator = function (it) {
	  var iterFn = getIterFn(it);
	  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

	var core_getIterator$1 = /*#__PURE__*/Object.freeze({
		default: core_getIterator,
		__moduleExports: core_getIterator
	});

	var require$$2$1 = ( core_getIterator$1 && core_getIterator ) || core_getIterator$1;

	var getIterator = require$$2$1;

	var getIterator$1 = /*#__PURE__*/Object.freeze({
		default: getIterator,
		__moduleExports: getIterator
	});

	var require$$0$17 = ( getIterator$1 && getIterator ) || getIterator$1;

	var getIterator$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$17, __esModule: true };
	});

	var _getIterator = unwrapExports(getIterator$2);

	var getIterator$3 = /*#__PURE__*/Object.freeze({
		default: _getIterator,
		__moduleExports: getIterator$2
	});

	var _isIterable2 = ( isIterable$4 && isIterable$3 ) || isIterable$4;

	var _getIterator2 = ( getIterator$3 && _getIterator ) || getIterator$3;

	var slicedToArray = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



	var _isIterable3 = _interopRequireDefault(_isIterable2);



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
	});

	var _slicedToArray = unwrapExports(slicedToArray);

	var isEnum$1 = pIE.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = toIObject(it);
	    var keys = getKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) if (isEnum$1.call(O, key = keys[i++])) {
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

	var _objectToArray$1 = /*#__PURE__*/Object.freeze({
		default: _objectToArray,
		__moduleExports: _objectToArray
	});

	var require$$0$18 = ( _objectToArray$1 && _objectToArray ) || _objectToArray$1;

	// https://github.com/tc39/proposal-object-values-entries

	var $entries = require$$0$18(true);

	$export$1($export$1.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	var entries = require$$1.Object.entries;

	var entries$1 = /*#__PURE__*/Object.freeze({
		default: entries,
		__moduleExports: entries
	});

	var require$$0$19 = ( entries$1 && entries ) || entries$1;

	var entries$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$19, __esModule: true };
	});

	var _Object$entries = unwrapExports(entries$2);

	// 19.1.2.14 Object.keys(O)



	require$$1$1('keys', function () {
	  return function keys(it) {
	    return getKeys(toObject(it));
	  };
	});

	var keys = require$$1.Object.keys;

	var keys$1 = /*#__PURE__*/Object.freeze({
		default: keys,
		__moduleExports: keys
	});

	var require$$0$20 = ( keys$1 && keys ) || keys$1;

	var keys$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$20, __esModule: true };
	});

	var _Object$keys = unwrapExports(keys$2);

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || fails(function () {
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

	var _objectAssign$1 = /*#__PURE__*/Object.freeze({
		default: _objectAssign,
		__moduleExports: _objectAssign
	});

	var assign = ( _objectAssign$1 && _objectAssign ) || _objectAssign$1;

	// 19.1.3.1 Object.assign(target, source)


	$export$1($export$1.S + $export$1.F, 'Object', { assign: assign });

	var assign$1 = require$$1.Object.assign;

	var assign$2 = /*#__PURE__*/Object.freeze({
		default: assign$1,
		__moduleExports: assign$1
	});

	var require$$0$21 = ( assign$2 && assign$1 ) || assign$2;

	var assign$3 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$21, __esModule: true };
	});

	var _Object$assign = unwrapExports(assign$3);

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	var _anInstance$1 = /*#__PURE__*/Object.freeze({
		default: _anInstance,
		__moduleExports: _anInstance
	});

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};

	var _iterCall$1 = /*#__PURE__*/Object.freeze({
		default: _iterCall,
		__moduleExports: _iterCall
	});

	// check on default Array iterator

	var ITERATOR$3 = wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR$3] === it);
	};

	var _isArrayIter$1 = /*#__PURE__*/Object.freeze({
		default: _isArrayIter,
		__moduleExports: _isArrayIter
	});

	var call = ( _iterCall$1 && _iterCall ) || _iterCall$1;

	var isArrayIter = ( _isArrayIter$1 && _isArrayIter ) || _isArrayIter$1;

	var _forOf = createCommonjsModule(function (module) {
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
	});

	var _forOf$1 = /*#__PURE__*/Object.freeze({
		default: _forOf,
		__moduleExports: _forOf
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES = wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

	var _speciesConstructor$1 = /*#__PURE__*/Object.freeze({
		default: _speciesConstructor,
		__moduleExports: _speciesConstructor
	});

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
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

	var _invoke$1 = /*#__PURE__*/Object.freeze({
		default: _invoke,
		__moduleExports: _invoke
	});

	var invoke = ( _invoke$1 && _invoke ) || _invoke$1;

	var process = require$$0.process;
	var setTask = require$$0.setImmediate;
	var clearTask = require$$0.clearImmediate;
	var MessageChannel = require$$0.MessageChannel;
	var Dispatch = require$$0.Dispatch;
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
	  if (cof(process) == 'process') {
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
	  } else if (require$$0.addEventListener && typeof postMessage == 'function' && !require$$0.importScripts) {
	    defer = function (id) {
	      require$$0.postMessage(id + '', '*');
	    };
	    require$$0.addEventListener('message', listener, false);
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
	var _task = {
	  set: setTask,
	  clear: clearTask
	};
	var _task_1 = _task.set;
	var _task_2 = _task.clear;

	var _task$1 = /*#__PURE__*/Object.freeze({
		default: _task,
		__moduleExports: _task,
		set: _task_1,
		clear: _task_2
	});

	var require$$0$22 = ( _task$1 && _task ) || _task$1;

	var macrotask = require$$0$22.set;
	var Observer = require$$0.MutationObserver || require$$0.WebKitMutationObserver;
	var process$1 = require$$0.process;
	var Promise = require$$0.Promise;
	var isNode = cof(process$1) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process$1.domain)) parent.exit();
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
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(require$$0.navigator && require$$0.navigator.standalone)) {
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
	      macrotask.call(require$$0, flush);
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

	var _microtask$1 = /*#__PURE__*/Object.freeze({
		default: _microtask,
		__moduleExports: _microtask
	});

	// 25.4.1.5 NewPromiseCapability(C)


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

	var f$7 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$7
	};

	var _newPromiseCapability$1 = /*#__PURE__*/Object.freeze({
		default: _newPromiseCapability,
		__moduleExports: _newPromiseCapability,
		f: f$7
	});

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var _perform$1 = /*#__PURE__*/Object.freeze({
		default: _perform,
		__moduleExports: _perform
	});

	var newPromiseCapability = ( _newPromiseCapability$1 && _newPromiseCapability ) || _newPromiseCapability$1;

	var _promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _promiseResolve$1 = /*#__PURE__*/Object.freeze({
		default: _promiseResolve,
		__moduleExports: _promiseResolve
	});

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else require$$5(target, key, src[key]);
	  } return target;
	};

	var _redefineAll$1 = /*#__PURE__*/Object.freeze({
		default: _redefineAll,
		__moduleExports: _redefineAll
	});

	var SPECIES$1 = wks('species');

	var _setSpecies = function (KEY) {
	  var C = typeof require$$1[KEY] == 'function' ? require$$1[KEY] : require$$0[KEY];
	  if (require$$0$1 && C && !C[SPECIES$1]) $defineProperty.f(C, SPECIES$1, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var _setSpecies$1 = /*#__PURE__*/Object.freeze({
		default: _setSpecies,
		__moduleExports: _setSpecies
	});

	var ITERATOR$4 = wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$4]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$4]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$4] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	var _iterDetect$1 = /*#__PURE__*/Object.freeze({
		default: _iterDetect,
		__moduleExports: _iterDetect
	});

	var anInstance = ( _anInstance$1 && _anInstance ) || _anInstance$1;

	var forOf = ( _forOf$1 && _forOf ) || _forOf$1;

	var speciesConstructor = ( _speciesConstructor$1 && _speciesConstructor ) || _speciesConstructor$1;

	var require$$1$4 = ( _microtask$1 && _microtask ) || _microtask$1;

	var perform = ( _perform$1 && _perform ) || _perform$1;

	var promiseResolve = ( _promiseResolve$1 && _promiseResolve ) || _promiseResolve$1;

	var redefineAll = ( _redefineAll$1 && _redefineAll ) || _redefineAll$1;

	var setSpecies = ( _setSpecies$1 && _setSpecies ) || _setSpecies$1;

	var require$$0$23 = ( _iterDetect$1 && _iterDetect ) || _iterDetect$1;

	var task = require$$0$22.set;
	var microtask = require$$1$4();



	var PROMISE = 'Promise';
	var TypeError$1 = require$$0.TypeError;
	var process$2 = require$$0.process;
	var $Promise = require$$0[PROMISE];
	var isNode$1 = classof(process$2) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability$1 = newGenericPromiseCapability = newPromiseCapability.f;

	var USE_NATIVE$1 = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[wks('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch (e) { /* empty */ }
	}();

	// helpers
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
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
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
	  task.call(require$$0, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = perform(function () {
	        if (isNode$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else if (handler = require$$0.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = require$$0.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(require$$0, function () {
	    var handler;
	    if (isNode$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else if (handler = require$$0.onrejectionhandled) {
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
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
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
	if (!USE_NATIVE$1) {
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
	  Internal.prototype = redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability$1(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$2.domain : undefined;
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
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	$export$1($export$1.G + $export$1.W + $export$1.F * !USE_NATIVE$1, { Promise: $Promise });
	setToStringTag($Promise, PROMISE);
	setSpecies(PROMISE);
	Wrapper = require$$1[PROMISE];

	// statics
	$export$1($export$1.S + $export$1.F * !USE_NATIVE$1, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export$1($export$1.S + $export$1.F * (LIBRARY || !USE_NATIVE$1), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
	  }
	});
	$export$1($export$1.S + $export$1.F * !(USE_NATIVE$1 && require$$0$23(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
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
	    var capability = newPromiseCapability$1(C);
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

	$export$1($export$1.P + $export$1.R, 'Promise', { 'finally': function (onFinally) {
	  var C = speciesConstructor(this, require$$1.Promise || require$$0.Promise);
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

	// https://github.com/tc39/proposal-promise-try




	$export$1($export$1.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = newPromiseCapability.f(this);
	  var result = perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });

	var promise = require$$1.Promise;

	var promise$1 = /*#__PURE__*/Object.freeze({
		default: promise,
		__moduleExports: promise
	});

	var require$$0$24 = ( promise$1 && promise ) || promise$1;

	var promise$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$24, __esModule: true };
	});

	var _Promise = unwrapExports(promise$2);

	// 20.1.2.3 Number.isInteger(number)

	var floor$1 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !isObject(it) && isFinite(it) && floor$1(it) === it;
	};

	var _isInteger$1 = /*#__PURE__*/Object.freeze({
		default: _isInteger,
		__moduleExports: _isInteger
	});

	var require$$0$25 = ( _isInteger$1 && _isInteger ) || _isInteger$1;

	// 20.1.2.3 Number.isInteger(number)


	$export$1($export$1.S, 'Number', { isInteger: require$$0$25 });

	var isInteger = require$$1.Number.isInteger;

	var isInteger$1 = /*#__PURE__*/Object.freeze({
		default: isInteger,
		__moduleExports: isInteger
	});

	var require$$0$26 = ( isInteger$1 && isInteger ) || isInteger$1;

	var isInteger$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$26, __esModule: true };
	});

	var _Number$isInteger = unwrapExports(isInteger$2);

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var _stringWs$1 = /*#__PURE__*/Object.freeze({
		default: _stringWs,
		__moduleExports: _stringWs
	});

	var spaces = ( _stringWs$1 && _stringWs ) || _stringWs$1;

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
	  $export$1($export$1.P + $export$1.F * FORCE, 'String', exp);
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

	var _stringTrim = exporter;

	var _stringTrim$1 = /*#__PURE__*/Object.freeze({
		default: _stringTrim,
		__moduleExports: _stringTrim
	});

	var require$$1$5 = ( _stringTrim$1 && _stringTrim ) || _stringTrim$1;

	var $parseFloat = require$$0.parseFloat;
	var $trim = require$$1$5.trim;

	var _parseFloat = 1 / $parseFloat(spaces + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim(String(str), 3);
	  var result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	var _parseFloat$1 = /*#__PURE__*/Object.freeze({
		default: _parseFloat,
		__moduleExports: _parseFloat
	});

	var $parseFloat$1 = ( _parseFloat$1 && _parseFloat ) || _parseFloat$1;

	// 20.1.2.12 Number.parseFloat(string)
	$export$1($export$1.S + $export$1.F * (Number.parseFloat != $parseFloat$1), 'Number', { parseFloat: $parseFloat$1 });

	var _parseFloat$2 = require$$1.Number.parseFloat;

	var _parseFloat$3 = /*#__PURE__*/Object.freeze({
		default: _parseFloat$2,
		__moduleExports: _parseFloat$2
	});

	var require$$0$27 = ( _parseFloat$3 && _parseFloat$2 ) || _parseFloat$3;

	var _parseFloat$4 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$27, __esModule: true };
	});

	var _Number$parseFloat = unwrapExports(_parseFloat$4);

	/**
	 * to check whether the object is defined or not
	 */
	function defined$1(obj) {
	  return typeof obj !== 'undefined';
	}
	/**
	 * is void element or not ? Means it will return true when val is undefined or null
	 */
	function isVoid(obj) {
	  return obj === undefined || obj === null;
	}
	/**
	 * to check whether a variable is array
	 */
	function isArray$1(arr) {
	  return Array.isArray(arr);
	}

	/**
	 * is it a function or not
	 */
	function isFunction(obj) {
	  return typeof obj === 'function';
	}

	/**
	 * is it an object or not
	 */
	function isObject$1(obj) {
	  // incase of arrow function and array
	  return Object(obj) === obj && String(obj) === '[object Object]' && !isFunction(obj) && !isArray$1(obj);
	}
	/**
	 * to tell you if it's a real number
	 */
	function isNumber(obj) {
	  return typeof obj === 'number';
	}
	/**
	 * to tell you if the val can be transfer into number
	 */
	function isNumeric(obj) {
	  return !isArray$1(obj) && obj - _Number$parseFloat(obj) + 1 >= 0;
	}
	/**
	 * is it an interget or not
	 */
	function isInteger$3(num) {
	  return _Number$isInteger(num);
	}

	/**
	 * return true when the value is "", {}, [], 0, null, undefined, false.
	 */
	function isEmpty(obj) {
	  if (isArray$1(obj)) {
	    return obj.length === 0;
	  } else if (isObject$1(obj)) {
	    return _Object$keys(obj).length === 0;
	  } else {
	    return !obj;
	  }
	}
	/**
	 * is it an event or not
	 */
	function isEvent(obj) {
	  return obj instanceof Event || (obj && obj.originalEvent) instanceof Event;
	}
	/**
	 * is it a string
	 */
	function isString(str) {
	  return typeof str === 'string' || str instanceof String;
	}
	/**
	 * is Boolean or not
	 */
	function isBoolean(bool) {
	  return typeof bool === 'boolean';
	}
	/**
	 * is a promise or not
	 */
	function isPromise(obj) {
	  return !!obj && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	}
	/**
	 * is Primitive type or not, whick means it will return true when data is number/string/boolean/undefined/null
	 */
	function isPrimitive(val) {
	  return isVoid(val) || isBoolean(val) || isString(val) || isNumber(val);
	}
	/**
	 * to test if a HTML node
	 */
	function isNode$2(obj) {
	  return !!((typeof Node === 'undefined' ? 'undefined' : _typeof(Node)) === 'object' ? obj instanceof Node : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.nodeType === 'number' && typeof obj.nodeName === 'string');
	}
	/**
	 * to test if a HTML element
	 */
	function isElement(obj) {
	  return !!((typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object' ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string');
	}
	/**
	 * check if node B is node A's posterrity or not
	 */
	function isPosterityNode(parent, child) {
	  if (!isNode$2(parent) || !isNode$2(child)) {
	    return false;
	  }
	  while (child.parentNode) {
	    child = child.parentNode;
	    if (child === parent) {
	      return true;
	    }
	  }
	  return false;
	}
	/**
	 * check if the string is an HTMLString
	 */
	function isHTMLString(str) {
	  return (/<[^>]+?>/.test(str)
	  );
	}
	/**
	 * check if is an error
	 */
	function isError(val) {
	  return val instanceof Error;
	}

	function formatter(tag, msg) {
	  if (!isString(tag)) throw new TypeError('Log\'s method only acccept string as argument, but not ' + tag + ' in ' + (typeof tag === 'undefined' ? 'undefined' : _typeof(tag)));
	  if (!isString(msg)) return '[' + Log.GLOBAL_TAG + '] > ' + tag;
	  tag = Log.FORCE_GLOBAL_TAG ? Log.GLOBAL_TAG : tag || Log.GLOBAL_TAG;
	  return '[' + tag + '] > ' + msg;
	}
	/**
	 * Log Object
	 */

	var Log = function () {
	  function Log() {
	    _classCallCheck(this, Log);
	  }

	  _createClass(Log, null, [{
	    key: 'error',

	    /**
	     * equal to console.error, output `[${tag}] > {$msg}`
	     * @param {string} tag optional, the header of log 
	     * @param {string} msg the message
	     */

	    /**
	     * @member {boolean}
	     */

	    /**
	     * @member {boolean}
	     */

	    /**
	     * @member {boolean}
	     */
	    value: function error(tag, msg) {
	      if (!Log.ENABLE_ERROR) {
	        return;
	      }

	      (console.error || console.warn || console.log).call(console, formatter(tag, msg));
	    }
	    /**
	     * equal to console.info, output `[${tag}] > {$msg}`
	     * @param {string} tag optional, the header of log 
	     * @param {string} msg the message
	     */

	    /**
	     * @member {boolean}
	     */

	    /**
	     * @member {boolean}
	     */

	    /**
	     * @member {boolean}
	     */

	    /**
	     * @member {string}
	     */

	  }, {
	    key: 'info',
	    value: function info(tag, msg) {
	      if (!Log.ENABLE_INFO) {
	        return;
	      }
	      (console.info || console.log).call(console, formatter(tag, msg));
	    }
	    /**
	     * equal to console.warn, output `[${tag}] > {$msg}`
	     * @param {string} tag optional, the header of log 
	     * @param {string} msg the message
	     */

	  }, {
	    key: 'warn',
	    value: function warn(tag, msg) {
	      if (!Log.ENABLE_WARN) {
	        return;
	      }
	      (console.warn || console.log).call(console, formatter(tag, msg));
	    }
	    /**
	     * equal to console.debug, output `[${tag}] > {$msg}`
	     * @param {string} tag optional, the header of log 
	     * @param {string} msg the message
	     */

	  }, {
	    key: 'debug',
	    value: function debug(tag, msg) {
	      if (!Log.ENABLE_DEBUG) {
	        return;
	      }
	      (console.debug || console.log).call(console, formatter(tag, msg));
	    }
	    /**
	     * equal to console.verbose, output `[${tag}] > {$msg}`
	     * @param {string} tag optional, the header of log 
	     * @param {string} msg the message
	     */

	  }, {
	    key: 'verbose',
	    value: function verbose(tag, msg) {
	      if (!Log.ENABLE_VERBOSE) {
	        return;
	      }
	      console.log(formatter(tag, msg));
	    }
	  }]);

	  return Log;
	}();

	Log.GLOBAL_TAG = 'chimee';
	Log.FORCE_GLOBAL_TAG = false;
	Log.ENABLE_ERROR = true;
	Log.ENABLE_INFO = true;
	Log.ENABLE_WARN = true;
	Log.ENABLE_DEBUG = true;
	Log.ENABLE_VERBOSE = true;

	var uaParser = createCommonjsModule(function (module, exports) {
	/**
	 * UAParser.js v0.7.17
	 * Lightweight JavaScript-based User-Agent string parser
	 * https://github.com/faisalman/ua-parser-js
	 *
	 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
	 * Dual licensed under GPLv2 & MIT
	 */

	(function (window, undefined) {

	    //////////////
	    // Constants
	    /////////////


	    var LIBVERSION  = '0.7.17',
	        EMPTY       = '',
	        UNKNOWN     = '?',
	        FUNC_TYPE   = 'function',
	        UNDEF_TYPE  = 'undefined',
	        OBJ_TYPE    = 'object',
	        STR_TYPE    = 'string',
	        MAJOR       = 'major', // deprecated
	        MODEL       = 'model',
	        NAME        = 'name',
	        TYPE        = 'type',
	        VENDOR      = 'vendor',
	        VERSION     = 'version',
	        ARCHITECTURE= 'architecture',
	        CONSOLE     = 'console',
	        MOBILE      = 'mobile',
	        TABLET      = 'tablet',
	        SMARTTV     = 'smarttv',
	        WEARABLE    = 'wearable',
	        EMBEDDED    = 'embedded';


	    ///////////
	    // Helper
	    //////////


	    var util = {
	        extend : function (regexes, extensions) {
	            var margedRegexes = {};
	            for (var i in regexes) {
	                if (extensions[i] && extensions[i].length % 2 === 0) {
	                    margedRegexes[i] = extensions[i].concat(regexes[i]);
	                } else {
	                    margedRegexes[i] = regexes[i];
	                }
	            }
	            return margedRegexes;
	        },
	        has : function (str1, str2) {
	          if (typeof str1 === "string") {
	            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
	          } else {
	            return false;
	          }
	        },
	        lowerize : function (str) {
	            return str.toLowerCase();
	        },
	        major : function (version) {
	            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined;
	        },
	        trim : function (str) {
	          return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	        }
	    };


	    ///////////////
	    // Map helper
	    //////////////


	    var mapper = {

	        rgx : function (ua, arrays) {

	            //var result = {},
	            var i = 0, j, k, p, q, matches, match;//, args = arguments;

	            /*// construct object barebones
	            for (p = 0; p < args[1].length; p++) {
	                q = args[1][p];
	                result[typeof q === OBJ_TYPE ? q[0] : q] = undefined;
	            }*/

	            // loop through all regexes maps
	            while (i < arrays.length && !matches) {

	                var regex = arrays[i],       // even sequence (0,2,4,..)
	                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
	                j = k = 0;

	                // try matching uastring with regexes
	                while (j < regex.length && !matches) {

	                    matches = regex[j++].exec(ua);

	                    if (!!matches) {
	                        for (p = 0; p < props.length; p++) {
	                            match = matches[++k];
	                            q = props[p];
	                            // check if given property is actually array
	                            if (typeof q === OBJ_TYPE && q.length > 0) {
	                                if (q.length == 2) {
	                                    if (typeof q[1] == FUNC_TYPE) {
	                                        // assign modified match
	                                        this[q[0]] = q[1].call(this, match);
	                                    } else {
	                                        // assign given value, ignore regex match
	                                        this[q[0]] = q[1];
	                                    }
	                                } else if (q.length == 3) {
	                                    // check whether function or regex
	                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
	                                        // call function (usually string mapper)
	                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
	                                    } else {
	                                        // sanitize match using given regex
	                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
	                                    }
	                                } else if (q.length == 4) {
	                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
	                                }
	                            } else {
	                                this[q] = match ? match : undefined;
	                            }
	                        }
	                    }
	                }
	                i += 2;
	            }
	            // console.log(this);
	            //return this;
	        },

	        str : function (str, map) {

	            for (var i in map) {
	                // check if array
	                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
	                    for (var j = 0; j < map[i].length; j++) {
	                        if (util.has(map[i][j], str)) {
	                            return (i === UNKNOWN) ? undefined : i;
	                        }
	                    }
	                } else if (util.has(map[i], str)) {
	                    return (i === UNKNOWN) ? undefined : i;
	                }
	            }
	            return str;
	        }
	    };


	    ///////////////
	    // String map
	    //////////////


	    var maps = {

	        browser : {
	            oldsafari : {
	                version : {
	                    '1.0'   : '/8',
	                    '1.2'   : '/1',
	                    '1.3'   : '/3',
	                    '2.0'   : '/412',
	                    '2.0.2' : '/416',
	                    '2.0.3' : '/417',
	                    '2.0.4' : '/419',
	                    '?'     : '/'
	                }
	            }
	        },

	        device : {
	            amazon : {
	                model : {
	                    'Fire Phone' : ['SD', 'KF']
	                }
	            },
	            sprint : {
	                model : {
	                    'Evo Shift 4G' : '7373KT'
	                },
	                vendor : {
	                    'HTC'       : 'APA',
	                    'Sprint'    : 'Sprint'
	                }
	            }
	        },

	        os : {
	            windows : {
	                version : {
	                    'ME'        : '4.90',
	                    'NT 3.11'   : 'NT3.51',
	                    'NT 4.0'    : 'NT4.0',
	                    '2000'      : 'NT 5.0',
	                    'XP'        : ['NT 5.1', 'NT 5.2'],
	                    'Vista'     : 'NT 6.0',
	                    '7'         : 'NT 6.1',
	                    '8'         : 'NT 6.2',
	                    '8.1'       : 'NT 6.3',
	                    '10'        : ['NT 6.4', 'NT 10.0'],
	                    'RT'        : 'ARM'
	                }
	            }
	        }
	    };


	    //////////////
	    // Regex map
	    /////////////


	    var regexes = {

	        browser : [[

	            // Presto based
	            /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
	            /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,                      // Opera Mobi/Tablet
	            /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
	            /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80
	            ], [NAME, VERSION], [

	            /(opios)[\/\s]+([\w\.]+)/i                                          // Opera mini on iphone >= 8.0
	            ], [[NAME, 'Opera Mini'], VERSION], [

	            /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
	            ], [[NAME, 'Opera'], VERSION], [

	            // Mixed
	            /(kindle)\/([\w\.]+)/i,                                             // Kindle
	            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,
	                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer

	            // Trident based
	            /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
	                                                                                // Avant/IEMobile/SlimBrowser/Baidu
	            /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

	            // Webkit/KHTML based
	            /(rekonq)\/([\w\.]+)*/i,                                            // Rekonq
	            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser)\/([\w\.-]+)/i
	                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser
	            ], [NAME, VERSION], [

	            /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i                         // IE11
	            ], [[NAME, 'IE'], VERSION], [

	            /(edge)\/((\d+)?[\w\.]+)/i                                          // Microsoft Edge
	            ], [NAME, VERSION], [

	            /(yabrowser)\/([\w\.]+)/i                                           // Yandex
	            ], [[NAME, 'Yandex'], VERSION], [

	            /(puffin)\/([\w\.]+)/i                                              // Puffin
	            ], [[NAME, 'Puffin'], VERSION], [

	            /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i
	                                                                                // UCBrowser
	            ], [[NAME, 'UCBrowser'], VERSION], [

	            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
	            ], [[NAME, /_/g, ' '], VERSION], [

	            /(micromessenger)\/([\w\.]+)/i                                      // WeChat
	            ], [[NAME, 'WeChat'], VERSION], [

	            /(QQ)\/([\d\.]+)/i                                                  // QQ, aka ShouQ
	            ], [NAME, VERSION], [

	            /m?(qqbrowser)[\/\s]?([\w\.]+)/i                                    // QQBrowser
	            ], [NAME, VERSION], [

	            /xiaomi\/miuibrowser\/([\w\.]+)/i                                   // MIUI Browser
	            ], [VERSION, [NAME, 'MIUI Browser']], [

	            /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android
	            ], [VERSION, [NAME, 'Facebook']], [

	            /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
	            ], [VERSION, [NAME, 'Chrome Headless']], [

	            /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
	            ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [

	            /((?:oculus|samsung)browser)\/([\w\.]+)/i
	            ], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [                // Oculus / Samsung Browser

	            /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i        // Android Browser
	            ], [VERSION, [NAME, 'Android Browser']], [

	            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
	                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia
	            ], [NAME, VERSION], [

	            /(dolfin)\/([\w\.]+)/i                                              // Dolphin
	            ], [[NAME, 'Dolphin'], VERSION], [

	            /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
	            ], [[NAME, 'Chrome'], VERSION], [

	            /(coast)\/([\w\.]+)/i                                               // Opera Coast
	            ], [[NAME, 'Opera Coast'], VERSION], [

	            /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
	            ], [VERSION, [NAME, 'Firefox']], [

	            /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i                       // Mobile Safari
	            ], [VERSION, [NAME, 'Mobile Safari']], [

	            /version\/([\w\.]+).+?(mobile\s?safari|safari)/i                    // Safari & Safari Mobile
	            ], [VERSION, NAME], [

	            /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i  // Google Search Appliance on iOS
	            ], [[NAME, 'GSA'], VERSION], [

	            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
	            ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

	            /(konqueror)\/([\w\.]+)/i,                                          // Konqueror
	            /(webkit|khtml)\/([\w\.]+)/i
	            ], [NAME, VERSION], [

	            // Gecko based
	            /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
	            ], [[NAME, 'Netscape'], VERSION], [
	            /(swiftfox)/i,                                                      // Swiftfox
	            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
	                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
	            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,
	                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
	            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

	            // Other
	            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
	                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
	            /(links)\s\(([\w\.]+)/i,                                            // Links
	            /(gobrowser)\/?([\w\.]+)*/i,                                        // GoBrowser
	            /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
	            /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
	            ], [NAME, VERSION]

	            /* /////////////////////
	            // Media players BEGIN
	            ////////////////////////

	            , [

	            /(apple(?:coremedia|))\/((\d+)[\w\._]+)/i,                          // Generic Apple CoreMedia
	            /(coremedia) v((\d+)[\w\._]+)/i
	            ], [NAME, VERSION], [

	            /(aqualung|lyssna|bsplayer)\/((\d+)?[\w\.-]+)/i                     // Aqualung/Lyssna/BSPlayer
	            ], [NAME, VERSION], [

	            /(ares|ossproxy)\s((\d+)[\w\.-]+)/i                                 // Ares/OSSProxy
	            ], [NAME, VERSION], [

	            /(audacious|audimusicstream|amarok|bass|core|dalvik|gnomemplayer|music on console|nsplayer|psp-internetradioplayer|videos)\/((\d+)[\w\.-]+)/i,
	                                                                                // Audacious/AudiMusicStream/Amarok/BASS/OpenCORE/Dalvik/GnomeMplayer/MoC
	                                                                                // NSPlayer/PSP-InternetRadioPlayer/Videos
	            /(clementine|music player daemon)\s((\d+)[\w\.-]+)/i,               // Clementine/MPD
	            /(lg player|nexplayer)\s((\d+)[\d\.]+)/i,
	            /player\/(nexplayer|lg player)\s((\d+)[\w\.-]+)/i                   // NexPlayer/LG Player
	            ], [NAME, VERSION], [
	            /(nexplayer)\s((\d+)[\w\.-]+)/i                                     // Nexplayer
	            ], [NAME, VERSION], [

	            /(flrp)\/((\d+)[\w\.-]+)/i                                          // Flip Player
	            ], [[NAME, 'Flip Player'], VERSION], [

	            /(fstream|nativehost|queryseekspider|ia-archiver|facebookexternalhit)/i
	                                                                                // FStream/NativeHost/QuerySeekSpider/IA Archiver/facebookexternalhit
	            ], [NAME], [

	            /(gstreamer) souphttpsrc (?:\([^\)]+\)){0,1} libsoup\/((\d+)[\w\.-]+)/i
	                                                                                // Gstreamer
	            ], [NAME, VERSION], [

	            /(htc streaming player)\s[\w_]+\s\/\s((\d+)[\d\.]+)/i,              // HTC Streaming Player
	            /(java|python-urllib|python-requests|wget|libcurl)\/((\d+)[\w\.-_]+)/i,
	                                                                                // Java/urllib/requests/wget/cURL
	            /(lavf)((\d+)[\d\.]+)/i                                             // Lavf (FFMPEG)
	            ], [NAME, VERSION], [

	            /(htc_one_s)\/((\d+)[\d\.]+)/i                                      // HTC One S
	            ], [[NAME, /_/g, ' '], VERSION], [

	            /(mplayer)(?:\s|\/)(?:(?:sherpya-){0,1}svn)(?:-|\s)(r\d+(?:-\d+[\w\.-]+){0,1})/i
	                                                                                // MPlayer SVN
	            ], [NAME, VERSION], [

	            /(mplayer)(?:\s|\/|[unkow-]+)((\d+)[\w\.-]+)/i                      // MPlayer
	            ], [NAME, VERSION], [

	            /(mplayer)/i,                                                       // MPlayer (no other info)
	            /(yourmuze)/i,                                                      // YourMuze
	            /(media player classic|nero showtime)/i                             // Media Player Classic/Nero ShowTime
	            ], [NAME], [

	            /(nero (?:home|scout))\/((\d+)[\w\.-]+)/i                           // Nero Home/Nero Scout
	            ], [NAME, VERSION], [

	            /(nokia\d+)\/((\d+)[\w\.-]+)/i                                      // Nokia
	            ], [NAME, VERSION], [

	            /\s(songbird)\/((\d+)[\w\.-]+)/i                                    // Songbird/Philips-Songbird
	            ], [NAME, VERSION], [

	            /(winamp)3 version ((\d+)[\w\.-]+)/i,                               // Winamp
	            /(winamp)\s((\d+)[\w\.-]+)/i,
	            /(winamp)mpeg\/((\d+)[\w\.-]+)/i
	            ], [NAME, VERSION], [

	            /(ocms-bot|tapinradio|tunein radio|unknown|winamp|inlight radio)/i  // OCMS-bot/tap in radio/tunein/unknown/winamp (no other info)
	                                                                                // inlight radio
	            ], [NAME], [

	            /(quicktime|rma|radioapp|radioclientapplication|soundtap|totem|stagefright|streamium)\/((\d+)[\w\.-]+)/i
	                                                                                // QuickTime/RealMedia/RadioApp/RadioClientApplication/
	                                                                                // SoundTap/Totem/Stagefright/Streamium
	            ], [NAME, VERSION], [

	            /(smp)((\d+)[\d\.]+)/i                                              // SMP
	            ], [NAME, VERSION], [

	            /(vlc) media player - version ((\d+)[\w\.]+)/i,                     // VLC Videolan
	            /(vlc)\/((\d+)[\w\.-]+)/i,
	            /(xbmc|gvfs|xine|xmms|irapp)\/((\d+)[\w\.-]+)/i,                    // XBMC/gvfs/Xine/XMMS/irapp
	            /(foobar2000)\/((\d+)[\d\.]+)/i,                                    // Foobar2000
	            /(itunes)\/((\d+)[\d\.]+)/i                                         // iTunes
	            ], [NAME, VERSION], [

	            /(wmplayer)\/((\d+)[\w\.-]+)/i,                                     // Windows Media Player
	            /(windows-media-player)\/((\d+)[\w\.-]+)/i
	            ], [[NAME, /-/g, ' '], VERSION], [

	            /windows\/((\d+)[\w\.-]+) upnp\/[\d\.]+ dlnadoc\/[\d\.]+ (home media server)/i
	                                                                                // Windows Media Server
	            ], [VERSION, [NAME, 'Windows']], [

	            /(com\.riseupradioalarm)\/((\d+)[\d\.]*)/i                          // RiseUP Radio Alarm
	            ], [NAME, VERSION], [

	            /(rad.io)\s((\d+)[\d\.]+)/i,                                        // Rad.io
	            /(radio.(?:de|at|fr))\s((\d+)[\d\.]+)/i
	            ], [[NAME, 'rad.io'], VERSION]

	            //////////////////////
	            // Media players END
	            ////////////////////*/

	        ],

	        cpu : [[

	            /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64
	            ], [[ARCHITECTURE, 'amd64']], [

	            /(ia32(?=;))/i                                                      // IA32 (quicktime)
	            ], [[ARCHITECTURE, util.lowerize]], [

	            /((?:i[346]|x)86)[;\)]/i                                            // IA32
	            ], [[ARCHITECTURE, 'ia32']], [

	            // PocketPC mistakenly identified as PowerPC
	            /windows\s(ce|mobile);\sppc;/i
	            ], [[ARCHITECTURE, 'arm']], [

	            /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
	            ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

	            /(sun4\w)[;\)]/i                                                    // SPARC
	            ], [[ARCHITECTURE, 'sparc']], [

	            /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
	                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
	            ], [[ARCHITECTURE, util.lowerize]]
	        ],

	        device : [[

	            /\((ipad|playbook);[\w\s\);-]+(rim|apple)/i                         // iPad/PlayBook
	            ], [MODEL, VENDOR, [TYPE, TABLET]], [

	            /applecoremedia\/[\w\.]+ \((ipad)/                                  // iPad
	            ], [MODEL, [VENDOR, 'Apple'], [TYPE, TABLET]], [

	            /(apple\s{0,1}tv)/i                                                 // Apple TV
	            ], [[MODEL, 'Apple TV'], [VENDOR, 'Apple']], [

	            /(archos)\s(gamepad2?)/i,                                           // Archos
	            /(hp).+(touchpad)/i,                                                // HP TouchPad
	            /(hp).+(tablet)/i,                                                  // HP Tablet
	            /(kindle)\/([\w\.]+)/i,                                             // Kindle
	            /\s(nook)[\w\s]+build\/(\w+)/i,                                     // Nook
	            /(dell)\s(strea[kpr\s\d]*[\dko])/i                                  // Dell Streak
	            ], [VENDOR, MODEL, [TYPE, TABLET]], [

	            /(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i                               // Kindle Fire HD
	            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [
	            /(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i                  // Fire Phone
	            ], [[MODEL, mapper.str, maps.device.amazon.model], [VENDOR, 'Amazon'], [TYPE, MOBILE]], [

	            /\((ip[honed|\s\w*]+);.+(apple)/i                                   // iPod/iPhone
	            ], [MODEL, VENDOR, [TYPE, MOBILE]], [
	            /\((ip[honed|\s\w*]+);/i                                            // iPod/iPhone
	            ], [MODEL, [VENDOR, 'Apple'], [TYPE, MOBILE]], [

	            /(blackberry)[\s-]?(\w+)/i,                                         // BlackBerry
	            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,
	                                                                                // BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
	            /(hp)\s([\w\s]+\w)/i,                                               // HP iPAQ
	            /(asus)-?(\w+)/i                                                    // Asus
	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	            /\(bb10;\s(\w+)/i                                                   // BlackBerry 10
	            ], [MODEL, [VENDOR, 'BlackBerry'], [TYPE, MOBILE]], [
	                                                                                // Asus Tablets
	            /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i
	            ], [MODEL, [VENDOR, 'Asus'], [TYPE, TABLET]], [

	            /(sony)\s(tablet\s[ps])\sbuild\//i,                                  // Sony
	            /(sony)?(?:sgp.+)\sbuild\//i
	            ], [[VENDOR, 'Sony'], [MODEL, 'Xperia Tablet'], [TYPE, TABLET]], [
	            /android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i
	            ], [MODEL, [VENDOR, 'Sony'], [TYPE, MOBILE]], [

	            /\s(ouya)\s/i,                                                      // Ouya
	            /(nintendo)\s([wids3u]+)/i                                          // Nintendo
	            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [

	            /android.+;\s(shield)\sbuild/i                                      // Nvidia
	            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [

	            /(playstation\s[34portablevi]+)/i                                   // Playstation
	            ], [MODEL, [VENDOR, 'Sony'], [TYPE, CONSOLE]], [

	            /(sprint\s(\w+))/i                                                  // Sprint Phones
	            ], [[VENDOR, mapper.str, maps.device.sprint.vendor], [MODEL, mapper.str, maps.device.sprint.model], [TYPE, MOBILE]], [

	            /(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i                         // Lenovo tablets
	            ], [VENDOR, MODEL, [TYPE, TABLET]], [

	            /(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,                               // HTC
	            /(zte)-(\w+)*/i,                                                    // ZTE
	            /(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i
	                                                                                // Alcatel/GeeksPhone/Lenovo/Nexian/Panasonic/Sony
	            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

	            /(nexus\s9)/i                                                       // HTC Nexus 9
	            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [

	            /d\/huawei([\w\s-]+)[;\)]/i,
	            /(nexus\s6p)/i                                                      // Huawei
	            ], [MODEL, [VENDOR, 'Huawei'], [TYPE, MOBILE]], [

	            /(microsoft);\s(lumia[\s\w]+)/i                                     // Microsoft Lumia
	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

	            /[\s\(;](xbox(?:\sone)?)[\s\);]/i                                   // Microsoft Xbox
	            ], [MODEL, [VENDOR, 'Microsoft'], [TYPE, CONSOLE]], [
	            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
	            ], [[MODEL, /\./g, ' '], [VENDOR, 'Microsoft'], [TYPE, MOBILE]], [

	                                                                                // Motorola
	            /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,
	            /mot[\s-]?(\w+)*/i,
	            /(XT\d{3,4}) build\//i,
	            /(nexus\s6)/i
	            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, MOBILE]], [
	            /android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i
	            ], [MODEL, [VENDOR, 'Motorola'], [TYPE, TABLET]], [

	            /hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i            // HbbTV devices
	            ], [[VENDOR, util.trim], [MODEL, util.trim], [TYPE, SMARTTV]], [

	            /hbbtv.+maple;(\d+)/i
	            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, 'Samsung'], [TYPE, SMARTTV]], [

	            /\(dtv[\);].+(aquos)/i                                              // Sharp
	            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [

	            /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
	            /((SM-T\w+))/i
	            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, TABLET]], [                  // Samsung
	            /smart-tv.+(samsung)/i
	            ], [VENDOR, [TYPE, SMARTTV], MODEL], [
	            /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
	            /(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,
	            /sec-((sgh\w+))/i
	            ], [[VENDOR, 'Samsung'], MODEL, [TYPE, MOBILE]], [

	            /sie-(\w+)*/i                                                       // Siemens
	            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [

	            /(maemo|nokia).*(n900|lumia\s\d+)/i,                                // Nokia
	            /(nokia)[\s_-]?([\w-]+)*/i
	            ], [[VENDOR, 'Nokia'], MODEL, [TYPE, MOBILE]], [

	            /android\s3\.[\s\w;-]{10}(a\d{3})/i                                 // Acer
	            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

	            /android.+([vl]k\-?\d{3})\s+build/i                                 // LG Tablet
	            ], [MODEL, [VENDOR, 'LG'], [TYPE, TABLET]], [
	            /android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i                     // LG Tablet
	            ], [[VENDOR, 'LG'], MODEL, [TYPE, TABLET]], [
	            /(lg) netcast\.tv/i                                                 // LG SmartTV
	            ], [VENDOR, MODEL, [TYPE, SMARTTV]], [
	            /(nexus\s[45])/i,                                                   // LG
	            /lg[e;\s\/-]+(\w+)*/i,
	            /android.+lg(\-?[\d\w]+)\s+build/i
	            ], [MODEL, [VENDOR, 'LG'], [TYPE, MOBILE]], [

	            /android.+(ideatab[a-z0-9\-\s]+)/i                                  // Lenovo
	            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

	            /linux;.+((jolla));/i                                               // Jolla
	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

	            /((pebble))app\/[\d\.]+\s/i                                         // Pebble
	            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [

	            /android.+;\s(oppo)\s?([\w\s]+)\sbuild/i                            // OPPO
	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

	            /crkey/i                                                            // Google Chromecast
	            ], [[MODEL, 'Chromecast'], [VENDOR, 'Google']], [

	            /android.+;\s(glass)\s\d/i                                          // Google Glass
	            ], [MODEL, [VENDOR, 'Google'], [TYPE, WEARABLE]], [

	            /android.+;\s(pixel c)\s/i                                          // Google Pixel C
	            ], [MODEL, [VENDOR, 'Google'], [TYPE, TABLET]], [

	            /android.+;\s(pixel xl|pixel)\s/i                                   // Google Pixel
	            ], [MODEL, [VENDOR, 'Google'], [TYPE, MOBILE]], [

	            /android.+(\w+)\s+build\/hm\1/i,                                    // Xiaomi Hongmi 'numeric' models
	            /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,               // Xiaomi Hongmi
	            /android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d\w)?)\s+build/i,    // Xiaomi Mi
	            /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+)?)\s+build/i      // Redmi Phones
	            ], [[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, MOBILE]], [
	            /android.+(mi[\s\-_]*(?:pad)?(?:[\s_]*[\w\s]+)?)\s+build/i          // Mi Pad tablets
	            ],[[MODEL, /_/g, ' '], [VENDOR, 'Xiaomi'], [TYPE, TABLET]], [
	            /android.+;\s(m[1-5]\snote)\sbuild/i                                // Meizu Tablet
	            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, TABLET]], [

	            /android.+a000(1)\s+build/i                                         // OnePlus
	            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

	            /android.+[;\/]\s*(RCT[\d\w]+)\s+build/i                            // RCA Tablets
	            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*(Venue[\d\s]*)\s+build/i                          // Dell Venue Tablets
	            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i                         // Verizon Tablet
	            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [

	            /android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i     // Barnes & Noble Tablet
	            ], [[VENDOR, 'Barnes & Noble'], MODEL, [TYPE, TABLET]], [

	            /android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i                           // Barnes & Noble Tablet
	            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*(zte)?.+(k\d{2})\s+build/i                        // ZTE K Series Tablet
	            ], [[VENDOR, 'ZTE'], MODEL, [TYPE, TABLET]], [

	            /android.+[;\/]\s*(gen\d{3})\s+build.*49h/i                         // Swiss GEN Mobile
	            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [

	            /android.+[;\/]\s*(zur\d{3})\s+build/i                              // Swiss ZUR Tablet
	            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i                         // Zeki Tablets
	            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [

	            /(android).+[;\/]\s+([YR]\d{2}x?.*)\s+build/i,
	            /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(.+)\s+build/i          // Dragon Touch Tablet
	            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [

	            /android.+[;\/]\s*(NS-?.+)\s+build/i                                // Insignia Tablets
	            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*((NX|Next)-?.+)\s+build/i                         // NextBook Tablets
	            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*(Xtreme\_?)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i
	            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [                    // Voice Xtreme Phones

	            /android.+[;\/]\s*(LVTEL\-?)?(V1[12])\s+build/i                     // LvTel Phones
	            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [

	            /android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i          // Envizen Tablets
	            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(.*\b)\s+build/i             // Le Pan Tablets
	            ], [VENDOR, MODEL, [TYPE, TABLET]], [

	            /android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i                         // MachSpeed Tablets
	            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [

	            /android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i                // Trinity Tablets
	            ], [VENDOR, MODEL, [TYPE, TABLET]], [

	            /android.+[;\/]\s*TU_(1491)\s+build/i                               // Rotor Tablets
	            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [

	            /android.+(KS(.+))\s+build/i                                        // Amazon Kindle Tablets
	            ], [MODEL, [VENDOR, 'Amazon'], [TYPE, TABLET]], [

	            /android.+(Gigaset)[\s\-]+(Q.+)\s+build/i                           // Gigaset Tablets
	            ], [VENDOR, MODEL, [TYPE, TABLET]], [

	            /\s(tablet|tab)[;\/]/i,                                             // Unidentifiable Tablet
	            /\s(mobile)(?:[;\/]|\ssafari)/i                                     // Unidentifiable Mobile
	            ], [[TYPE, util.lowerize], VENDOR, MODEL], [

	            /(android.+)[;\/].+build/i                                          // Generic Android Device
	            ], [MODEL, [VENDOR, 'Generic']]


	        /*//////////////////////////
	            // TODO: move to string map
	            ////////////////////////////

	            /(C6603)/i                                                          // Sony Xperia Z C6603
	            ], [[MODEL, 'Xperia Z C6603'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [
	            /(C6903)/i                                                          // Sony Xperia Z 1
	            ], [[MODEL, 'Xperia Z 1'], [VENDOR, 'Sony'], [TYPE, MOBILE]], [

	            /(SM-G900[F|H])/i                                                   // Samsung Galaxy S5
	            ], [[MODEL, 'Galaxy S5'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	            /(SM-G7102)/i                                                       // Samsung Galaxy Grand 2
	            ], [[MODEL, 'Galaxy Grand 2'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	            /(SM-G530H)/i                                                       // Samsung Galaxy Grand Prime
	            ], [[MODEL, 'Galaxy Grand Prime'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	            /(SM-G313HZ)/i                                                      // Samsung Galaxy V
	            ], [[MODEL, 'Galaxy V'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	            /(SM-T805)/i                                                        // Samsung Galaxy Tab S 10.5
	            ], [[MODEL, 'Galaxy Tab S 10.5'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [
	            /(SM-G800F)/i                                                       // Samsung Galaxy S5 Mini
	            ], [[MODEL, 'Galaxy S5 Mini'], [VENDOR, 'Samsung'], [TYPE, MOBILE]], [
	            /(SM-T311)/i                                                        // Samsung Galaxy Tab 3 8.0
	            ], [[MODEL, 'Galaxy Tab 3 8.0'], [VENDOR, 'Samsung'], [TYPE, TABLET]], [

	            /(T3C)/i                                                            // Advan Vandroid T3C
	            ], [MODEL, [VENDOR, 'Advan'], [TYPE, TABLET]], [
	            /(ADVAN T1J\+)/i                                                    // Advan Vandroid T1J+
	            ], [[MODEL, 'Vandroid T1J+'], [VENDOR, 'Advan'], [TYPE, TABLET]], [
	            /(ADVAN S4A)/i                                                      // Advan Vandroid S4A
	            ], [[MODEL, 'Vandroid S4A'], [VENDOR, 'Advan'], [TYPE, MOBILE]], [

	            /(V972M)/i                                                          // ZTE V972M
	            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [

	            /(i-mobile)\s(IQ\s[\d\.]+)/i                                        // i-mobile IQ
	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	            /(IQ6.3)/i                                                          // i-mobile IQ IQ 6.3
	            ], [[MODEL, 'IQ 6.3'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [
	            /(i-mobile)\s(i-style\s[\d\.]+)/i                                   // i-mobile i-STYLE
	            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
	            /(i-STYLE2.1)/i                                                     // i-mobile i-STYLE 2.1
	            ], [[MODEL, 'i-STYLE 2.1'], [VENDOR, 'i-mobile'], [TYPE, MOBILE]], [

	            /(mobiistar touch LAI 512)/i                                        // mobiistar touch LAI 512
	            ], [[MODEL, 'Touch LAI 512'], [VENDOR, 'mobiistar'], [TYPE, MOBILE]], [

	            /////////////
	            // END TODO
	            ///////////*/

	        ],

	        engine : [[

	            /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
	            ], [VERSION, [NAME, 'EdgeHTML']], [

	            /(presto)\/([\w\.]+)/i,                                             // Presto
	            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,     // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
	            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
	            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
	            ], [NAME, VERSION], [

	            /rv\:([\w\.]+).*(gecko)/i                                           // Gecko
	            ], [VERSION, NAME]
	        ],

	        os : [[

	            // Windows based
	            /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
	            ], [NAME, VERSION], [
	            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
	            /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s]+\w)*/i,                  // Windows Phone
	            /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
	            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
	            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
	            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

	            // Mobile/Embedded OS
	            /\((bb)(10);/i                                                      // BlackBerry 10
	            ], [[NAME, 'BlackBerry'], VERSION], [
	            /(blackberry)\w*\/?([\w\.]+)*/i,                                    // Blackberry
	            /(tizen)[\/\s]([\w\.]+)/i,                                          // Tizen
	            /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
	                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
	            /linux;.+(sailfish);/i                                              // Sailfish OS
	            ], [NAME, VERSION], [
	            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i                 // Symbian
	            ], [[NAME, 'Symbian'], VERSION], [
	            /\((series40);/i                                                    // Series 40
	            ], [NAME], [
	            /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
	            ], [[NAME, 'Firefox OS'], VERSION], [

	            // Console
	            /(nintendo|playstation)\s([wids34portablevu]+)/i,                   // Nintendo/Playstation

	            // GNU/Linux based
	            /(mint)[\/\s\(]?(\w+)*/i,                                           // Mint
	            /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
	            /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]+)*/i,
	                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
	                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
	            /(hurd|linux)\s?([\w\.]+)*/i,                                       // Hurd/Linux
	            /(gnu)\s?([\w\.]+)*/i                                               // GNU
	            ], [NAME, VERSION], [

	            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
	            ], [[NAME, 'Chromium OS'], VERSION],[

	            // Solaris
	            /(sunos)\s?([\w\.]+\d)*/i                                           // Solaris
	            ], [[NAME, 'Solaris'], VERSION], [

	            // BSD based
	            /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i                   // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
	            ], [NAME, VERSION],[

	            /(haiku)\s(\w+)/i                                                  // Haiku
	            ], [NAME, VERSION],[

	            /cfnetwork\/.+darwin/i,
	            /ip[honead]+(?:.*os\s([\w]+)\slike\smac|;\sopera)/i                 // iOS
	            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [

	            /(mac\sos\sx)\s?([\w\s\.]+\w)*/i,
	            /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
	            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

	            // Other
	            /((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,                            // Solaris
	            /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,                               // AIX
	            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
	                                                                                // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS
	            /(unix)\s?([\w\.]+)*/i                                              // UNIX
	            ], [NAME, VERSION]
	        ]
	    };


	    /////////////////
	    // Constructor
	    ////////////////
	    /*
	    var Browser = function (name, version) {
	        this[NAME] = name;
	        this[VERSION] = version;
	    };
	    var CPU = function (arch) {
	        this[ARCHITECTURE] = arch;
	    };
	    var Device = function (vendor, model, type) {
	        this[VENDOR] = vendor;
	        this[MODEL] = model;
	        this[TYPE] = type;
	    };
	    var Engine = Browser;
	    var OS = Browser;
	    */
	    var UAParser = function (uastring, extensions) {

	        if (typeof uastring === 'object') {
	            extensions = uastring;
	            uastring = undefined;
	        }

	        if (!(this instanceof UAParser)) {
	            return new UAParser(uastring, extensions).getResult();
	        }

	        var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
	        var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;
	        //var browser = new Browser();
	        //var cpu = new CPU();
	        //var device = new Device();
	        //var engine = new Engine();
	        //var os = new OS();

	        this.getBrowser = function () {
	            var browser = { name: undefined, version: undefined };
	            mapper.rgx.call(browser, ua, rgxmap.browser);
	            browser.major = util.major(browser.version); // deprecated
	            return browser;
	        };
	        this.getCPU = function () {
	            var cpu = { architecture: undefined };
	            mapper.rgx.call(cpu, ua, rgxmap.cpu);
	            return cpu;
	        };
	        this.getDevice = function () {
	            var device = { vendor: undefined, model: undefined, type: undefined };
	            mapper.rgx.call(device, ua, rgxmap.device);
	            return device;
	        };
	        this.getEngine = function () {
	            var engine = { name: undefined, version: undefined };
	            mapper.rgx.call(engine, ua, rgxmap.engine);
	            return engine;
	        };
	        this.getOS = function () {
	            var os = { name: undefined, version: undefined };
	            mapper.rgx.call(os, ua, rgxmap.os);
	            return os;
	        };
	        this.getResult = function () {
	            return {
	                ua      : this.getUA(),
	                browser : this.getBrowser(),
	                engine  : this.getEngine(),
	                os      : this.getOS(),
	                device  : this.getDevice(),
	                cpu     : this.getCPU()
	            };
	        };
	        this.getUA = function () {
	            return ua;
	        };
	        this.setUA = function (uastring) {
	            ua = uastring;
	            //browser = new Browser();
	            //cpu = new CPU();
	            //device = new Device();
	            //engine = new Engine();
	            //os = new OS();
	            return this;
	        };
	        return this;
	    };

	    UAParser.VERSION = LIBVERSION;
	    UAParser.BROWSER = {
	        NAME    : NAME,
	        MAJOR   : MAJOR, // deprecated
	        VERSION : VERSION
	    };
	    UAParser.CPU = {
	        ARCHITECTURE : ARCHITECTURE
	    };
	    UAParser.DEVICE = {
	        MODEL   : MODEL,
	        VENDOR  : VENDOR,
	        TYPE    : TYPE,
	        CONSOLE : CONSOLE,
	        MOBILE  : MOBILE,
	        SMARTTV : SMARTTV,
	        TABLET  : TABLET,
	        WEARABLE: WEARABLE,
	        EMBEDDED: EMBEDDED
	    };
	    UAParser.ENGINE = {
	        NAME    : NAME,
	        VERSION : VERSION
	    };
	    UAParser.OS = {
	        NAME    : NAME,
	        VERSION : VERSION
	    };
	    //UAParser.Utils = util;

	    ///////////
	    // Export
	    //////////


	    // check js environment
	    if ('object' !== UNDEF_TYPE) {
	        // nodejs env
	        if ('object' !== UNDEF_TYPE && module.exports) {
	            exports = module.exports = UAParser;
	        }
	        // TODO: test!!!!!!!!
	        /*
	        if (require && require.main === module && process) {
	            // cli
	            var jsonize = function (arr) {
	                var res = [];
	                for (var i in arr) {
	                    res.push(new UAParser(arr[i]).getResult());
	                }
	                process.stdout.write(JSON.stringify(res, null, 2) + '\n');
	            };
	            if (process.stdin.isTTY) {
	                // via args
	                jsonize(process.argv.slice(2));
	            } else {
	                // via pipe
	                var str = '';
	                process.stdin.on('readable', function() {
	                    var read = process.stdin.read();
	                    if (read !== null) {
	                        str += read;
	                    }
	                });
	                process.stdin.on('end', function () {
	                    jsonize(str.replace(/\n$/, '').split('\n'));
	                });
	            }
	        }
	        */
	        exports.UAParser = UAParser;
	    } else {
	        // requirejs env (optional)
	        if (typeof(undefined) === FUNC_TYPE && undefined.amd) {
	            undefined(function () {
	                return UAParser;
	            });
	        } else if (window) {
	            // browser env
	            window.UAParser = UAParser;
	        }
	    }

	    // jQuery/Zepto specific (optional)
	    // Note:
	    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
	    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
	    //   and we should catch that.
	    var $ = window && (window.jQuery || window.Zepto);
	    if (typeof $ !== UNDEF_TYPE) {
	        var parser = new UAParser();
	        $.ua = parser.getResult();
	        $.ua.get = function () {
	            return parser.getUA();
	        };
	        $.ua.set = function (uastring) {
	            parser.setUA(uastring);
	            var result = parser.getResult();
	            for (var prop in result) {
	                $.ua[prop] = result[prop];
	            }
	        };
	    }

	})(typeof window === 'object' ? window : commonjsGlobal);
	});
	var uaParser_1 = uaParser.UAParser;

	var _createProperty = function (object, index, value) {
	  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

	var _createProperty$1 = /*#__PURE__*/Object.freeze({
		default: _createProperty,
		__moduleExports: _createProperty
	});

	var createProperty = ( _createProperty$1 && _createProperty ) || _createProperty$1;

	$export$1($export$1.S + $export$1.F * !require$$0$23(function (iter) { }), 'Array', {
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

	var from = require$$1.Array.from;

	var from$1 = /*#__PURE__*/Object.freeze({
		default: from,
		__moduleExports: from
	});

	var require$$0$28 = ( from$1 && from ) || from$1;

	var from$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$28, __esModule: true };
	});

	var _Array$from = unwrapExports(from$2);

	var from$3 = /*#__PURE__*/Object.freeze({
		default: _Array$from,
		__moduleExports: from$2
	});

	var _from = ( from$3 && _Array$from ) || from$3;

	var toConsumableArray = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



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
	});

	var _toConsumableArray = unwrapExports(toConsumableArray);

	/**
	 * the handler to generate an deep traversal handler
	 * @param  {Function} fn the function you wanna run when you reach in the deep property
	 * @return {Function}    the handler
	 */
	function genTraversalHandler(fn) {
	  var setter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (target, key, value) {
	    target[key] = value;
	  };

	  // use recursive to move what in source to the target
	  // if you do not provide a target, we will create a new target
	  function recursiveFn(source, target, key) {
	    if (isArray$1(source) || isObject$1(source)) {
	      target = isPrimitive(target) ? isObject$1(source) ? {} : [] : target;
	      for (var _key in source) {
	        // $FlowFixMe: support computed key here
	        setter(target, _key, recursiveFn(source[_key], target[_key], _key));
	        // target[key] = recursiveFn(source[key], target[key], key);
	      }
	      return target;
	    }
	    return fn(source, target, key);
	  }
	  return recursiveFn;
	}
	var _deepAssign = genTraversalHandler(function (val) {
	  return val;
	});
	/**
	 * deeply clone an object
	 * @param  {Array|Object} source if you pass in other type, it will throw an error
	 * @return {clone-target}        the new Object
	 */
	function deepClone(source) {
	  if (isPrimitive(source)) {
	    throw new TypeError('deepClone only accept non primitive type');
	  }
	  return _deepAssign(source);
	}
	/**
	 * merge multiple objects
	 * @param  {...Object} args [description]
	 * @return {merge-object}         [description]
	 */
	function deepAssign() {
	  for (var _len = arguments.length, args = Array(_len), _key2 = 0; _key2 < _len; _key2++) {
	    args[_key2] = arguments[_key2];
	  }

	  if (args.length < 2) {
	    throw new Error('deepAssign accept two and more argument');
	  }
	  for (var i = args.length - 1; i > -1; i--) {
	    if (isPrimitive(args[i])) {
	      throw new TypeError('deepAssign only accept non primitive type');
	    }
	  }
	  var target = args.shift();
	  args.forEach(function (source) {
	    return _deepAssign(source, target);
	  });
	  return target;
	}

	/**
	 * camelize any string, e.g hello world -> helloWorld
	 * @param  {string} str only accept string!
	 * @return {string}     camelize string
	 */
	function camelize(str, isBig) {
	  return str.replace(/(^|[^a-zA-Z]+)([a-zA-Z])/g, function (match, spilt, initials, index) {
	    return !isBig && index === 0 ? initials.toLowerCase() : initials.toUpperCase();
	  });
	}
	/**
	 * hypenate any string e.g hello world -> hello-world
	 * @param  {string} str only accept string
	 * @return {string}
	 */
	function hypenate(str) {
	  return camelize(str).replace(/([A-Z])/g, function (match) {
	    return '-' + match.toLowerCase();
	  });
	}

	/**
	 * bind the function with some context. we have some fallback strategy here
	 * @param {function} fn the function which we need to bind the context on
	 * @param {any} context the context object
	 */
	function bind(fn, context) {
	  if (fn.bind) {
	    return fn.bind(context);
	  } else if (fn.apply) {
	    return function __autobind__() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      return fn.apply(context, args);
	    };
	  } else {
	    return function __autobind__() {
	      for (var _len3 = arguments.length, args = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
	        args[_key4] = arguments[_key4];
	      }

	      return fn.call.apply(fn, [context].concat(_toConsumableArray(args)));
	    };
	  }
	}

	/**
	 * get an deep property
	 */
	function getDeepProperty(obj, keys) {
	  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      _ref$throwError = _ref.throwError,
	      throwError = _ref$throwError === undefined ? false : _ref$throwError,
	      backup = _ref.backup;

	  if (isString(keys)) {
	    keys = keys.split('.');
	  }
	  if (!isArray$1(keys)) {
	    throw new TypeError('keys of getDeepProperty must be string or Array<string>');
	  }
	  var read = [];
	  var target = obj;
	  for (var i = 0, len = keys.length; i < len; i++) {
	    var key = keys[i];
	    if (isVoid(target)) {
	      if (throwError) {
	        throw new Error('obj' + (read.length > 0 ? '.' + read.join('.') : ' itself') + ' is ' + target);
	      } else {
	        return backup;
	      }
	    }
	    target = target[key];
	    read.push(key);
	  }
	  return target;
	}

	// **********************  judgement   ************************
	/**
	 * check if the code running in browser environment (not include worker env)
	 * @returns {Boolean}
	 */
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';

	// **********************  对象操作  ************************
	/**
	 * 转变一个类数组对象为数组
	 */
	function makeArray(obj) {
	  return _Array$from(obj);
	}

	/**
	 * sort Object attributes by function
	 * and transfer them into array
	 * @param  {Object} obj Object form from numric
	 * @param  {Function} fn sort function
	 * @return {Array} the sorted attirbutes array
	 */
	function transObjectAttrIntoArray(obj) {
	  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (a, b) {
	    return +a - +b;
	  };

	  return _Object$keys(obj).sort(fn).reduce(function (order, key) {
	    return order.concat(obj[key]);
	  }, []);
	}
	/**
	 * run a queue one by one.If include function reject or return false it will stop
	 * @param  {Array} queue the queue which we want to run one by one
	 * @return {Promise}    tell us whether a queue run finished
	 */
	function runRejectableQueue(queue) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return new _Promise(function (resolve, reject) {
	    var step = function step(index) {
	      if (index >= queue.length) {
	        resolve();
	        return;
	      }
	      var result = isFunction(queue[index]) ? queue[index].apply(queue, _toConsumableArray(args)) : queue[index];
	      if (result === false) return reject('stop');
	      return _Promise.resolve(result).then(function () {
	        return step(index + 1);
	      }).catch(function (err) {
	        return reject(err || 'stop');
	      });
	    };
	    step(0);
	  });
	}
	/**
	 * run a queue one by one.If include function return false it will stop
	 * @param  {Array} queue the queue which we want to run one by one
	 * @return {boolean} tell the user if the queue run finished
	 */
	function runStoppableQueue(queue) {
	  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    args[_key2 - 1] = arguments[_key2];
	  }

	  var step = function step(index) {
	    if (index >= queue.length) {
	      return true;
	    }
	    var result = isFunction(queue[index]) ? queue[index].apply(queue, _toConsumableArray(args)) : queue[index];
	    if (result === false) return false;
	    return step(++index);
	  };
	  return step(0);
	}

	// requestAnimationFrame
	var raf = inBrowser && (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame) || function (cb) {
	  return setTimeout(cb, 17);
	};

	// cancelAnimationFrame
	var caf = inBrowser && (window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame) || function (id) {
	  clearTimeout(id);
	};

	/**
	* @module event
	* @author huzunjie
	* @description 自定义事件基础类
	*/

	/* 缓存事件监听方法及包装，内部数据格式：
	 * targetIndex_<type:'click|mouseup|done'>: [ [
	 *   function(){ ... handler ... },
	 *   function(){ ... handlerWrap ... handler.apply(target, arguments) ... },
	 *   isOnce
	 * ]]
	 */
	var _evtListenerCache = _Object$create(null);
	_evtListenerCache.count = 0;

	/**
	 * 得到某对象的某事件类型对应的监听队列数组
	 * @param  {Object}  target 发生事件的对象
	 * @param {String} type 事件类型(这里的时间类型不只是名称，还是缓存标识，可以通过添加后缀来区分)
	 * @return {Array}
	 */
	function getEvtTypeCache(target, type) {

	  var evtId = target.__evt_id;
	  if (!evtId) {

	    /* 设置__evt_id不可枚举 */
	    Object.defineProperty(target, '__evt_id', {
	      writable: true,
	      enumerable: false,
	      configurable: true
	    });

	    /* 空对象初始化绑定索引 */
	    evtId = target.__evt_id = ++_evtListenerCache.count;
	  }

	  var typeCacheKey = evtId + '_' + type;
	  var evtTypeCache = _evtListenerCache[typeCacheKey];
	  if (!evtTypeCache) {
	    evtTypeCache = _evtListenerCache[typeCacheKey] = [];
	  }

	  return evtTypeCache;
	}

	/**
	 * 触发事件监听方法
	 * @param  {Object}  target 发生事件的对象
	 * @param {String} type 事件类型
	 * @param {Object} eventObj 触发事件时要传回的event对象
	 * @return {undefined}
	 */
	function emitEventCache(target, type, eventObj) {
	  var evt = _Object$create(null);
	  evt.type = type;
	  evt.target = target;
	  if (eventObj) {
	    _Object$assign(evt, isObject$1(eventObj) ? eventObj : { data: eventObj });
	  }
	  getEvtTypeCache(target, type).forEach(function (item) {
	    (item[1] || item[0]).apply(target, [evt]);
	  });
	}

	/**
	 * 添加事件监听到缓存
	 * @param  {Object}  target 发生事件的对象
	 * @param {String} type 事件类型
	 * @param {Function} handler 监听函数
	 * @param {Boolean} isOnce 是否单次执行
	 * @param {Function} handlerWrap
	 * @return {undefined}
	 */
	function addEventCache(target, type, handler) {
	  var isOnce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	  var handlerWrap = arguments[4];

	  if (isFunction(isOnce) && !handlerWrap) {
	    handlerWrap = isOnce;
	    isOnce = undefined;
	  }
	  var handlers = [handler, undefined, isOnce];
	  if (isOnce && !handlerWrap) {
	    handlerWrap = function handlerWrap() {
	      removeEventCache(target, type, handler, isOnce);

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      handler.apply(target, args);
	    };
	  }
	  if (handlerWrap) {
	    handlers[1] = handlerWrap;
	  }
	  getEvtTypeCache(target, type).push(handlers);
	}

	/**
	 * 移除事件监听
	 * @param  {Object}  target 发生事件的对象
	 * @param {String} type 事件类型
	 * @param {Function} handler 监听函数
	 * @return {undefined}
	 */
	function removeEventCache(target, type, handler) {
	  var isOnce = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	  var typeCache = getEvtTypeCache(target, type);

	  if (handler || isOnce) {
	    /* 有指定 handler 则清除对应监听 */
	    var handlerId = -1;
	    var handlerWrap = void 0;
	    typeCache.find(function (item, i) {
	      if ((!handler || item[0] === handler) && (!isOnce || item[2])) {
	        handlerId = i;
	        handlerWrap = item[1];
	        return true;
	      }
	    });
	    if (handlerId !== -1) {
	      typeCache.splice(handlerId, 1);
	    }
	    return handlerWrap;
	  } else {
	    /* 未指定 handler 则清除type对应的所有监听 */
	    typeCache.length = 0;
	  }
	}

	/**
	 * @class CustEvent
	 * @description
	 * Event 自定义事件类
	 * 1. 可以使用不传参得到的实例作为eventBus使用
	 * 2. 可以通过指定target，用多个实例操作同一target对象的事件管理
	 * 3. 当设定target时，可以通过设置assign为true，来给target实现"on\once\off\emit"方法
	 * @param  {Object}  target 发生事件的对象（空则默认为event实例）
	 * @param  {Boolean}  assign 是否将"on\once\off\emit"方法实现到target对象上
	 * @return {event}
	 */
	var CustEvent = function () {
	  function CustEvent(target, assign) {
	    var _this = this;

	    _classCallCheck(this, CustEvent);

	    /* 设置__target不可枚举 */
	    Object.defineProperty(this, '__target', {
	      writable: true,
	      enumerable: false,
	      configurable: true
	    });
	    this.__target = this;

	    if (target) {

	      if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object') {
	        throw new Error('CusEvent target are not object');
	      }
	      this.__target = target;

	      /* 为target实现on\once\off\emit */
	      if (assign) {
	        ['on', 'once', 'off', 'emit'].forEach(function (mth) {
	          target[mth] = _this[mth];
	        });
	      }
	    }
	  }

	  /**
	   * 添加事件监听
	   * @param {String} type 事件类型
	   * @param {Function} handler 监听函数
	   * @param {Boolean} isOnce 单次监听类型
	   * @return {event}
	   */


	  _createClass(CustEvent, [{
	    key: 'on',
	    value: function on(type, handler) {
	      var isOnce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      addEventCache(this.__target, type, handler, isOnce);
	      return this;
	    }

	    /**
	     * 添加事件监听,并且只执行一次
	     * @param {String} type 事件类型
	     * @param {Function} handler 监听函数
	     * @return {event}
	     */

	  }, {
	    key: 'once',
	    value: function once(type, handler) {
	      return this.on(type, handler, true);
	    }

	    /**
	     * 移除事件监听
	     * @param {String} type 事件类型
	     * @param {Function} handler 监听函数(不指定handler则清除type对应的所有事件监听)
	     * @param {Boolean} isOnce 单次监听类型
	     * @return {event}
	     */

	  }, {
	    key: 'off',
	    value: function off(type, handler) {
	      var isOnce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      removeEventCache(this.__target, type, handler, isOnce);
	      return this;
	    }

	    /**
	     * 触发事件监听函数
	     * @param {String} type 事件类型
	     * @return {event}
	     */

	  }, {
	    key: 'emit',
	    value: function emit(type, data) {
	      emitEventCache(this.__target, type, { data: data });
	      return this;
	    }
	  }]);

	  return CustEvent;
	}();

	/**
	 * @module dom
	 * @author huzunjie
	 * @description 一些常用的DOM判断及操作方法，可以使用dom.$('*')包装DOM，实现类jQuery的链式操作；当然这里的静态方法也可以直接使用。
	 */

	var _divEl = inBrowser ? document.createElement('div') : {};
	var _textAttrName = 'innerText';
	'textContent' in _divEl && (_textAttrName = 'textContent');
	var _arrPrototype = Array.prototype;

	/**
	 * 读取HTML元素属性值
	 * @param {HTMLElement} el 目标元素
	 * @param {String} attrName 目标属性名称
	 * @return {String}
	 */
	function getAttr(el, attrName) {
	  return el.getAttribute(attrName);
	}

	/**
	 * 设置HTML元素属性值
	 * @param {HTMLElement} el 目标元素
	 * @param {String} attrName 目标属性名称
	 * @param {String} attrVal 目标属性值
	 */
	function setAttr(el, attrName, attrVal) {
	  if (attrVal === undefined) {
	    el.removeAttribute(attrName);
	  } else {
	    el.setAttribute(attrName, attrVal);
	  }
	}

	/**
	 * 为HTML元素添加className
	 * @param {HTMLElement} el 目标元素
	 * @param {String} cls 要添加的className（多个以空格分割）
	 */
	function addClassName(el, cls) {
	  if (!cls || !(cls = cls.trim())) {
	    return;
	  }
	  var clsArr = cls.split(/\s+/);
	  if (el.classList) {
	    clsArr.forEach(function (c) {
	      return el.classList.add(c);
	    });
	  } else {
	    var curCls = ' ' + (el.className || '') + ' ';
	    clsArr.forEach(function (c) {
	      curCls.indexOf(' ' + c + ' ') === -1 && (curCls += ' ' + c);
	    });
	    el.className = curCls.trim();
	  }
	}

	/**
	 * 为HTML元素移除className
	 * @param {HTMLElement} el 目标元素
	 * @param {String} cls 要移除的className（多个以空格分割）
	 */
	function removeClassName(el, cls) {
	  if (!cls || !(cls = cls.trim())) {
	    return;
	  }

	  var clsArr = cls.split(/\s+/);
	  if (el.classList) {
	    clsArr.forEach(function (c) {
	      return el.classList.remove(c);
	    });
	  } else {
	    var curCls = ' ' + el.className + ' ';
	    clsArr.forEach(function (c) {
	      var tar = ' ' + c + ' ';
	      while (curCls.indexOf(tar) !== -1) {
	        curCls = curCls.replace(tar, ' ');
	      }
	    });
	    el.className = curCls.trim();
	  }
	}

	/**
	 * 检查HTML元素是否已设置className
	 * @param {HTMLElement} el 目标元素
	 * @param {String} className 要检查的className
	 * @return {Boolean}
	 */
	function hasClassName(el, className) {
	  return new RegExp('(?:^|\\s)' + className + '(?=\\s|$)').test(el.className);
	}

	/**
	 * addEventListener 是否已支持 passive
	 * @return {Boolean}
	 */
	var supportsPassive = false;
	try {
	  var opts = Object.defineProperty({}, 'passive', {
	    get: function get() {
	      supportsPassive = true;
	    }
	  });
	  if (inBrowser) window.addEventListener('test', null, opts);
	} catch (e) {
	  console.error(e);
	}

	/**
	 * 为HTML元素移除事件监听
	 * @param {HTMLElement} el 目标元素
	 * @param {String} type 事件名称
	 * @param {Function} handler 处理函数
	 * @param {Boolean} once 是否只监听一次
	 * @param {Boolean} capture 是否在捕获阶段的监听
	 */
	function removeEvent(el, type, handler) {
	  var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	  var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	  if (capture !== undefined && !isBoolean(capture) && supportsPassive) {
	    capture = { passive: true };
	  }
	  if (once) {
	    /* 尝试从缓存中读取包装后的方法 */
	    var handlerWrap = removeEventCache(el, type + '_once', handler);
	    if (handlerWrap) {
	      handler = handlerWrap;
	    }
	  }
	  el.removeEventListener(type, handler, capture);
	}

	/**
	 * 为HTML元素添加事件监听
	 * @param {HTMLElement} el 目标元素
	 * @param {String} type 事件名称
	 * @param {Function} handler 处理函数
	 * @param {Boolean} once 是否只监听一次
	 * @param {Boolean|Object} capture 是否在捕获阶段监听，这里也可以传入 { passive: true } 表示被动模式
	 */
	function addEvent(el, type, handler) {
	  var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	  var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	  if (capture !== undefined && !isBoolean(capture) && supportsPassive) {
	    capture = { passive: true };
	  }
	  if (once) {
	    var oldHandler = handler;
	    handler = function () {
	      return function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        oldHandler.apply(this, args);
	        removeEvent(el, type, handler, once, capture);
	      };
	    }();
	    /* 将包装后的方法记录到缓存中 */
	    addEventCache(el, type + '_once', oldHandler, handler);
	  }

	  el.addEventListener(type, handler, capture);
	}

	/**
	 * 为HTML元素添加事件代理
	 * @param {HTMLElement} el 目标元素
	 * @param {String} selector 要被代理的元素
	 * @param {String} type 事件名称
	 * @param {Function} handler 处理函数
	 * @param {Boolean} capture 是否在捕获阶段监听
	 */
	function addDelegate(el, selector, type, handler) {
	  var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	  if (capture !== undefined && !isBoolean(capture) && supportsPassive) {
	    capture = { passive: true };
	  }
	  var handlerWrap = function handlerWrap(e) {
	    var targetElsArr = findParents(e.target || e.srcElement, el, true);
	    var targetElArr = query(selector, el, true);
	    var retEl = void 0;
	    if (targetElArr.find) {
	      retEl = targetElArr.find(function (seEl) {
	        return targetElsArr.find(function (tgEl) {
	          return seEl === tgEl;
	        });
	      });
	    } else {
	      // Fixed IE11 Array.find not defined bug
	      targetElArr.forEach(function (seEl) {
	        return !retEl && targetElsArr.forEach(function (tgEl) {
	          if (!retEl && seEl === tgEl) {
	            retEl = tgEl;
	          }
	        });
	      });
	    }
	    retEl && handler.apply(retEl, arguments);
	  };
	  /* 将包装后的方法记录到缓存中 */
	  addEventCache(el, type + '_delegate_' + selector, handler, handlerWrap);
	  el.addEventListener(type, handlerWrap, capture);
	}

	/**
	 * 为HTML元素移除事件代理
	 * @param {HTMLElement} el 目标元素
	 * @param {String} selector 要被代理的元素
	 * @param {String} type 事件名称
	 * @param {Function} handler 处理函数
	 * @param {Boolean} capture 是否在捕获阶段监听
	 */
	function removeDelegate(el, selector, type, handler) {
	  var capture = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	  if (capture !== undefined && !isBoolean(capture) && supportsPassive) {
	    capture = { passive: true };
	  }
	  /* 尝试从缓存中读取包装后的方法 */
	  var handlerWrap = removeEventCache(el, type + '_delegate_' + selector, handler);
	  handlerWrap && el.removeEventListener(type, handlerWrap, capture);
	}

	/**
	 * 读取HTML元素样式值
	 * @param {HTMLElement} el 目标元素
	 * @param {String} key 样式key
	 * @return {String}
	 */
	function getStyle(el, key) {
	  return (el.currentStyle || document.defaultView.getComputedStyle(el, null))[key] || el.style[key];
	}

	/**
	 * 设置HTML元素样式值
	 * @param {HTMLElement} el 目标元素
	 * @param {String} key 样式key
	 * @param {String} val 样式值
	 */
	function setStyle(el, key, val) {
	  if (isObject$1(key)) {
	    for (var k in key) {
	      setStyle(el, k, key[k]);
	    }
	  } else {
	    el.style[key] = val;
	  }
	}

	/**
	 * 根据选择器查询目标元素
	 * @param {String} selector 选择器,用于 querySelectorAll
	 * @param {HTMLElement} container 父容器
	 * @param {Boolean} toArray 强制输出为数组
	 * @return {NodeList|Array}
	 */
	function query(selector) {
	  var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	  var toArray = arguments[2];

	  var retNodeList = container.querySelectorAll(selector);
	  return toArray ? _Array$from(retNodeList) : retNodeList;
	}

	/**
	 * 从DOM树中移除el
	 * @param {HTMLElement} el 目标元素
	 */
	function removeEl(el) {
	  el.parentNode.removeChild(el);
	}

	/**
	 * 查找元素的父节点们
	 * @param {HTMLElement} el 目标元素
	 * @param {HTMLElement} endEl 最大父容器（不指定则找到html）
	 * @param {Boolean} haveEl 包含当前元素
	 * @param {Boolean} haveEndEl 包含设定的最大父容器
	 */
	function findParents(el) {
	  var endEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	  var haveEl = arguments[2];
	  var haveEndEl = arguments[3];

	  var retEls = [];
	  if (haveEl) {
	    retEls.push(el);
	  }
	  while (el && el.parentNode !== endEl) {
	    el = el.parentNode;
	    el && retEls.push(el);
	  }
	  if (haveEndEl) {
	    retEls.push(endEl);
	  }
	  return retEls;
	}

	/**
	 * @class NodeWrap
	 * @description
	 * NodeWrap DOM包装器，用以实现基本的链式操作
	 * new dom.NodeWrap('*') 相当于 dom.$('*')
	 * 这里面用于DOM操作的属性方法都是基于上面静态方法实现，有需要可以随时修改补充
	 * @param {String} selector 选择器(兼容 String||HTMLString||NodeList||NodeArray||HTMLElement)
	 * @param {HTMLElement} container 父容器（默认为document）
	 */

	var NodeWrap = function () {
	  function NodeWrap(selector) {
	    var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

	    _classCallCheck(this, NodeWrap);

	    var _this = this;
	    _this.selector = selector;

	    /* String||NodeList||HTMLElement 识别处理 */
	    var elsArr = void 0;
	    if (selector && selector.constructor === NodeList) {
	      /* 支持直接传入NodeList来构建包装器 */
	      elsArr = makeArray(selector);
	    } else if (isArray$1(selector)) {
	      /* 支持直接传入Node数组来构建包装器 */
	      elsArr = selector;
	    } else if (isString(selector)) {
	      if (selector.indexOf('<') === 0) {
	        /* 支持直接传入HTML字符串来新建DOM并构建包装器 */
	        _divEl.innerHTML = selector;
	        elsArr = query('*', _divEl, true);
	      } else {
	        /* 支持直接传入字符串选择器来查找DOM并构建包装器 */
	        elsArr = query(selector, container, true);
	      }
	    } else {
	      /* 其他任意对象直接构建包装器 */
	      elsArr = [selector];
	    }
	    _Object$assign(_this, elsArr);

	    /* NodeWrap本意可以 extends Array省略构造方法中下面这部分代码，但目前编译不支持 */
	    _this.length = elsArr.length;
	  }

	  /**
	   * 循环遍历DOM集合
	   * @param {Function} fn 遍历函数 fn(item, i)
	   * @return {Object}
	   */


	  _createClass(NodeWrap, [{
	    key: 'each',
	    value: function each() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      _arrPrototype.forEach.apply(this, args);
	      return this;
	    }

	    /**
	     * 添加元素到DOM集合
	     * @param {HTMLElement} el 要加入的元素
	     * @return {this}
	     */

	  }, {
	    key: 'push',
	    value: function push() {
	      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      _arrPrototype.push.apply(this, args);
	      return this;
	    }

	    /**
	     * 截取DOM集合片段，并得到新的包装器splice
	     * @param {Nubmer} start
	     * @param {Nubmer} count
	     * @return {NodeWrap} 新的DOM集合包装器
	     */

	  }, {
	    key: 'splice',
	    value: function splice() {
	      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }

	      return $(_arrPrototype.splice.apply(this, args));
	    }

	    /**
	     * 查找子元素
	     * @param {String} selector 选择器
	     * @return {NodeWrap} 新的DOM集合包装器
	     */

	  }, {
	    key: 'find',
	    value: function find(selector) {
	      var childs = [];
	      this.each(function (el) {
	        childs = childs.concat(query(selector, el, true));
	      });
	      var childsWrap = $(childs);
	      childsWrap.parent = this;
	      childsWrap.selector = selector;
	      return childsWrap;
	    }

	    /**
	     * 添加子元素
	     * @param {HTMLElement} childEls 要添加的HTML元素
	     * @return {this}
	     */

	  }, {
	    key: 'append',
	    value: function append(childEls) {
	      var childsWrap = $(childEls);
	      var firstEl = this[0];
	      childsWrap.each(function (newEl) {
	        return firstEl.appendChild(newEl);
	      });
	      return this;
	    }

	    /**
	     * 将元素集合添加到指定容器
	     * @param {HTMLElement} parentEl 要添加到父容器
	     * @return {this}
	     */

	  }, {
	    key: 'appendTo',
	    value: function appendTo(parentEl) {
	      $(parentEl).append(this);
	      return this;
	    }

	    /**
	     * DOM集合text内容读写操作
	     * @param {String} val 文本内容（如果有设置该参数则执行写操作，否则执行读操作）
	     * @return {this}
	     */

	  }, {
	    key: 'text',
	    value: function text(val) {
	      if (arguments.length === 0) {
	        return this[0][_textAttrName];
	      }
	      return this.each(function (el) {
	        el[_textAttrName] = val;
	      });
	    }

	    /**
	     * DOM集合HTML内容读写操作
	     * @param {String} html html内容（如果有设置该参数则执行写操作，否则执行读操作）
	     * @return {this}
	     */

	  }, {
	    key: 'html',
	    value: function html(_html) {
	      if (arguments.length === 0) {
	        return this[0].innerHTML;
	      }
	      return this.each(function (el) {
	        el.innerHTML = _html;
	      });
	    }

	    /**
	     * DOM集合属性读写操作
	     * @param {String} name 属性名称
	     * @param {String} val 属性值（如果有设置该参数则执行写操作，否则执行读操作）
	     * @return {this}
	     */

	  }, {
	    key: 'attr',
	    value: function attr(name, val) {
	      if (arguments.length === 1) {
	        return getAttr(this[0], name);
	      }
	      return this.each(function (el) {
	        return setAttr(el, name, val);
	      });
	    }

	    /**
	     * DOM集合dataset读写操作
	     * @param {String} key 键名
	     * @param {Any} val 键值（如果有设置该参数则执行写操作，否则执行读操作）
	     * @return {this}
	     */

	  }, {
	    key: 'data',
	    value: function data(key, val) {
	      if (arguments.length === 0) {
	        return this[0].dataset || {};
	      }
	      if (arguments.length === 1) {
	        return (this[0].dataset || {})[key];
	      }
	      return this.each(function (el) {
	        (el.dataset || (el.dataset = {}))[key] = val;
	      });
	    }

	    /**
	     * DOM集合样式读写操作
	     * @param {String} key 样式key
	     * @param {String} val 样式值（如果有设置该参数则执行写操作，否则执行读操作）
	     * @return {this}
	     */

	  }, {
	    key: 'css',
	    value: function css(key, val) {
	      if (arguments.length === 1 && !isObject$1(key)) {
	        return getStyle(this[0], key);
	      }
	      return this.each(function (el) {
	        return setStyle(el, key, val);
	      });
	    }

	    /**
	     * 为DOM集合增加className
	     * @param {String} cls 要增加的className
	     * @return {this}
	     */

	  }, {
	    key: 'addClass',
	    value: function addClass(cls) {
	      return this.each(function (el) {
	        return addClassName(el, cls);
	      });
	    }

	    /**
	     * 移除当前DOM集合的className
	     * @param {String} cls 要移除的className
	     * @return {this}
	     */

	  }, {
	    key: 'removeClass',
	    value: function removeClass(cls) {
	      return this.each(function (el) {
	        return removeClassName(el, cls);
	      });
	    }

	    /**
	     * 检查索引0的DOM是否有className
	     * @param {String} cls 要检查的className
	     * @return {this}
	     */

	  }, {
	    key: 'hasClass',
	    value: function hasClass(cls) {
	      return hasClassName(this[0], cls);
	    }

	    /**
	     * 为DOM集合添加事件监听
	     * @param {String} type 事件名称
	     * @param {Function} handler 处理函数
	     * @param {Boolean} once 是否只监听一次
	     * @param {Boolean} capture 是否在捕获阶段监听
	     * @return {this}
	     */

	  }, {
	    key: 'on',
	    value: function on(type, handler) {
	      var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	      return this.each(function (el) {
	        return addEvent(el, type, handler, once, capture);
	      });
	    }

	    /**
	     * 为DOM集合解除事件监听
	     * @param {String} type 事件名称
	     * @param {Function} handler 处理函数
	     * @param {Boolean} once 是否只监听一次
	     * @param {Boolean} capture 是否在捕获阶段监听
	     * @return {this}
	     */

	  }, {
	    key: 'off',
	    value: function off(type, handler) {
	      var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	      return this.each(function (el) {
	        return removeEvent(el, type, handler, once, capture);
	      });
	    }

	    /**
	     * 为DOM集合绑定事件代理
	     * @param {String} selector 目标子元素选择器
	     * @param {String} type 事件名称
	     * @param {Function} handler 处理函数
	     * @param {Boolean} capture 是否在捕获阶段监听
	     * @return {this}
	     */

	  }, {
	    key: 'delegate',
	    value: function delegate(selector, type, handler) {
	      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	      return this.each(function (el) {
	        return addDelegate(el, selector, type, handler, capture);
	      });
	    }

	    /**
	     * 为DOM集合解绑事件代理
	     * @param {String} selector 目标子元素选择器
	     * @param {String} type 事件名称
	     * @param {Function} handler 处理函数
	     * @param {Boolean} capture 是否在捕获阶段监听
	     * @return {this}
	     */

	  }, {
	    key: 'undelegate',
	    value: function undelegate(selector, type, handler) {
	      var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

	      return this.each(function (el) {
	        return removeDelegate(el, selector, type, handler, capture);
	      });
	    }

	    /**
	     * 从DOM树中移除
	     * @return {this}
	     */

	  }, {
	    key: 'remove',
	    value: function remove() {
	      return this.each(function (el) {
	        return removeEl(el);
	      });
	    }
	  }]);

	  return NodeWrap;
	}();

	function $(selector, container) {
	  return selector.constructor === NodeWrap ? selector : new NodeWrap(selector, container);
	}

	var tempCurrentTime = 0;

	var NativeVideoKernel = function (_CustEvent) {
	  _inherits(NativeVideoKernel, _CustEvent);

	  _createClass(NativeVideoKernel, null, [{
	    key: 'isSupport',

	    /* istanbul ignore next  */
	    value: function isSupport() {
	      return true;
	    }
	  }]);

	  function NativeVideoKernel(videoElement, config, customConfig) {
	    _classCallCheck(this, NativeVideoKernel);

	    var _this = _possibleConstructorReturn(this, (NativeVideoKernel.__proto__ || _Object$getPrototypeOf(NativeVideoKernel)).call(this));

	    if (!isElement(videoElement)) throw new Error('You must pass in an legal video element but not ' + (typeof videoElement === 'undefined' ? 'undefined' : _typeof(videoElement)));
	    _this.video = videoElement;
	    _this.config = config;
	    _this.customConfig = customConfig;
	    return _this;
	  }

	  _createClass(NativeVideoKernel, [{
	    key: 'load',
	    value: function load(src) {
	      this.video.setAttribute('src', src);
	      this.video.src = src;
	    }
	  }, {
	    key: 'startLoad',
	    value: function startLoad(src) {
	      /* istanbul ignore next */
	      var currentTime = this.video.currentTime || tempCurrentTime;
	      this.load(src);
	      this.seek(currentTime);
	    }

	    // https://developer.mozilla.org/de/docs/Web/HTML/Using_HTML5_audio_and_video#Stopping_the_download_of_media

	  }, {
	    key: 'stopLoad',
	    value: function stopLoad() {
	      tempCurrentTime = this.video.currentTime;
	      this.video.src = '';
	      this.video.removeAttribute('src');
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      /* istanbul ignore next  */
	      if (isElement(this.video)) this.stopLoad();
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      return this.video.play();
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      return this.video.pause();
	    }
	  }, {
	    key: 'refresh',
	    value: function refresh() {
	      this.video.src = this.config.src;
	    }
	  }, {
	    key: 'attachMedia',
	    value: function attachMedia() {}
	  }, {
	    key: 'seek',
	    value: function seek(seconds) {
	      this.video.currentTime = seconds;
	    }
	  }]);

	  return NativeVideoKernel;
	}(CustEvent);

	var LOG_TAG = 'chimee';
	var boxSuffixMap = {
	  flv: '.flv',
	  hls: '.m3u8',
	  mp4: '.mp4'
	};

	var ChimeeKernel = function () {
	  /**
	  * kernelWrapper
	  * @param {any} wrap videoElement
	  * @param {any} option
	  * @class kernel
	  */
	  function ChimeeKernel(videoElement, config) {
	    _classCallCheck(this, ChimeeKernel);

	    if (!isElement(videoElement)) throw new Error('You must pass in an video element to the chimee-kernel');
	    this.config = config;
	    this.videoElement = videoElement;
	    this.initVideoKernel();
	  }

	  _createClass(ChimeeKernel, [{
	    key: 'destroy',
	    value: function destroy() {
	      this.videoKernel.destroy();
	    }
	  }, {
	    key: 'initVideoKernel',
	    value: function initVideoKernel() {
	      var config = this.config;
	      var box = this.chooseBox(config);
	      this.box = box;
	      var VideoKernel = this.chooseVideoKernel(this.box, config.preset);

	      if (!isFunction(VideoKernel)) throw new Error('We can\'t find video kernel for ' + box + '. Please check your config and make sure it\'s installed or provided');

	      var customConfig = config.presetConfig[this.box];

	      // TODO: nowaday, kernels all get config from one config
	      // it's not a good way, because custom config may override kernel config
	      // so we may remove this code when we check all the chimee-kernel-* setting
	      if (customConfig) deepAssign(config, customConfig);

	      this.videoKernel = new VideoKernel(this.videoElement, config, customConfig);
	    }

	    // return the config box
	    // or choose the right one according to the src

	  }, {
	    key: 'chooseBox',
	    value: function chooseBox(_ref) {
	      var src = _ref.src,
	          box = _ref.box;

	      if (isString(box) && box) return box;
	      src = src.toLowerCase();
	      for (var key in boxSuffixMap) {
	        var suffix = boxSuffixMap[key];
	        if (src.indexOf(suffix) > -1) return key;
	      }
	      return 'native';
	    }

	    // choose the right video kernel according to the box setting

	  }, {
	    key: 'chooseVideoKernel',
	    value: function chooseVideoKernel(box, preset) {
	      switch (box) {
	        case 'native':
	          // $FlowFixMe: it's the same as videoKernel
	          return NativeVideoKernel;
	        case 'mp4':
	          return this.getMp4Kernel(preset.mp4);
	        case 'flv':
	        case 'hls':
	          return preset[box];
	        default:
	          throw new Error('We currently do not support box ' + box + ', please contact us through https://github.com/Chimeejs/chimee/issues.');
	      }
	    }

	    // fetch the legal mp4 kernel
	    // if it's not exist or not support
	    // we will fall back to the native video kernel

	  }, {
	    key: 'getMp4Kernel',
	    value: function getMp4Kernel(Mp4Kernel) {
	      var hasLegalMp4Kernel = Mp4Kernel && isFunction(Mp4Kernel.isSupport);
	      // $FlowFixMe: we have make sure it's an kernel now
	      var supportMp4Kernel = hasLegalMp4Kernel && Mp4Kernel.isSupport();
	      // $FlowFixMe: we have make sure it's an kernel now
	      if (supportMp4Kernel) return Mp4Kernel;
	      if (hasLegalMp4Kernel) Log.warn(LOG_TAG, 'mp4 decode is not support in this browser, we will switch to the native video kernel');
	      this.box = 'native';
	      // $FlowFixMe: it's the same as videoKernel
	      return NativeVideoKernel;
	    }
	  }, {
	    key: 'attachMedia',
	    value: function attachMedia() {
	      this.videoKernel.attachMedia();
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.config.src;

	      this.config.src = src;
	      this.videoKernel.load(src);
	    }
	  }, {
	    key: 'startLoad',
	    value: function startLoad() {
	      /* istanbul ignore if */
	      if (!isFunction(this.videoKernel.startLoad)) throw new Error('This video kernel do not support startLoad, please contact us on https://github.com/Chimeejs/chimee/issues');
	      this.videoKernel.startLoad(this.config.src);
	    }
	  }, {
	    key: 'stopLoad',
	    value: function stopLoad() {
	      /* istanbul ignore else */
	      if (isFunction(this.videoKernel.stopLoad)) this.videoKernel.stopLoad();
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      this.videoKernel.play();
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.videoKernel.pause();
	    }
	  }, {
	    key: 'seek',
	    value: function seek(seconds) {
	      if (!isNumber(seconds)) {
	        Log.error(LOG_TAG, 'When you try to seek, you must offer us a number, but not ' + (typeof seconds === 'undefined' ? 'undefined' : _typeof(seconds)));
	        return;
	      }
	      this.videoKernel.seek(seconds);
	    }
	  }, {
	    key: 'refresh',
	    value: function refresh() {
	      this.videoKernel.refresh();
	    }
	  }, {
	    key: 'on',
	    value: function on(key, fn) {
	      this.videoKernel.on(key, fn);
	    }
	  }, {
	    key: 'off',
	    value: function off(key, fn) {
	      this.videoKernel.off(key, fn);
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.videoElement.currentTime || 0;
	    }
	  }]);

	  return ChimeeKernel;
	}();

	// all object keys, includes non-enumerable and symbols



	var Reflect = require$$0.Reflect;
	var _ownKeys = Reflect && Reflect.ownKeys || function ownKeys(it) {
	  var keys = gOPN.f(anObject(it));
	  var getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	var _ownKeys$1 = /*#__PURE__*/Object.freeze({
		default: _ownKeys,
		__moduleExports: _ownKeys
	});

	var ownKeys = ( _ownKeys$1 && _ownKeys ) || _ownKeys$1;

	// https://github.com/tc39/proposal-object-getownpropertydescriptors






	$export$1($export$1.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIObject(object);
	    var getDesc = gOPD$1.f;
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

	var getOwnPropertyDescriptors = require$$1.Object.getOwnPropertyDescriptors;

	var getOwnPropertyDescriptors$1 = /*#__PURE__*/Object.freeze({
		default: getOwnPropertyDescriptors,
		__moduleExports: getOwnPropertyDescriptors
	});

	var require$$0$29 = ( getOwnPropertyDescriptors$1 && getOwnPropertyDescriptors ) || getOwnPropertyDescriptors$1;

	var getOwnPropertyDescriptors$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$29, __esModule: true };
	});

	var _Object$getOwnPropertyDescriptors = unwrapExports(getOwnPropertyDescriptors$2);

	var getOwnPropertySymbols = require$$1.Object.getOwnPropertySymbols;

	var getOwnPropertySymbols$1 = /*#__PURE__*/Object.freeze({
		default: getOwnPropertySymbols,
		__moduleExports: getOwnPropertySymbols
	});

	var require$$0$30 = ( getOwnPropertySymbols$1 && getOwnPropertySymbols ) || getOwnPropertySymbols$1;

	var getOwnPropertySymbols$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$30, __esModule: true };
	});

	var _Object$getOwnPropertySymbols = unwrapExports(getOwnPropertySymbols$2);

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	require$$1$1('getOwnPropertyNames', function () {
	  return require$$1$3.f;
	});

	var $Object$3 = require$$1.Object;
	var getOwnPropertyNames = function getOwnPropertyNames(it) {
	  return $Object$3.getOwnPropertyNames(it);
	};

	var getOwnPropertyNames$1 = /*#__PURE__*/Object.freeze({
		default: getOwnPropertyNames,
		__moduleExports: getOwnPropertyNames
	});

	var require$$0$31 = ( getOwnPropertyNames$1 && getOwnPropertyNames ) || getOwnPropertyNames$1;

	var getOwnPropertyNames$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$31, __esModule: true };
	});

	var _Object$getOwnPropertyNames = unwrapExports(getOwnPropertyNames$2);

	/**
	 * bind the function with some context. we have some fallback strategy here
	 * @param {function} fn the function which we need to bind the context on
	 * @param {any} context the context object
	 */
	function bind$1(fn, context) {
	  if (fn.bind) {
	    return fn.bind(context);
	  } else if (fn.apply) {
	    return function __autobind__() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      return fn.apply(context, args);
	    };
	  } else {
	    return function __autobind__() {
	      for (var _len3 = arguments.length, args = Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
	        args[_key4] = arguments[_key4];
	      }

	      return fn.call.apply(fn, [context].concat(_toConsumableArray(args)));
	    };
	  }
	}

	/**
	 * get an deep property
	 */
	function getDeepProperty$1(obj, keys) {
	  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      _ref$throwError = _ref.throwError,
	      throwError = _ref$throwError === undefined ? false : _ref$throwError,
	      backup = _ref.backup;

	  if (isString(keys)) {
	    keys = keys.split('.');
	  }
	  if (!isArray$1(keys)) {
	    throw new TypeError('keys of getDeepProperty must be string or Array<string>');
	  }
	  var read = [];
	  var target = obj;
	  for (var i = 0, len = keys.length; i < len; i++) {
	    var key = keys[i];
	    if (isVoid(target)) {
	      if (throwError) {
	        throw new Error('obj' + (read.length > 0 ? '.' + read.join('.') : ' itself') + ' is ' + target);
	      } else {
	        return backup;
	      }
	    }
	    target = target[key];
	    read.push(key);
	  }
	  return target;
	}

	var SPECIES$2 = wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    if (isObject(C)) {
	      C = C[SPECIES$2];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	var _arraySpeciesConstructor$1 = /*#__PURE__*/Object.freeze({
		default: _arraySpeciesConstructor,
		__moduleExports: _arraySpeciesConstructor
	});

	var speciesConstructor$1 = ( _arraySpeciesConstructor$1 && _arraySpeciesConstructor ) || _arraySpeciesConstructor$1;

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (speciesConstructor$1(original))(length);
	};

	var _arraySpeciesCreate$1 = /*#__PURE__*/Object.freeze({
		default: _arraySpeciesCreate,
		__moduleExports: _arraySpeciesCreate
	});

	var asc = ( _arraySpeciesCreate$1 && _arraySpeciesCreate ) || _arraySpeciesCreate$1;

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
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

	var _arrayMethods$1 = /*#__PURE__*/Object.freeze({
		default: _arrayMethods,
		__moduleExports: _arrayMethods
	});

	var _validateCollection = function (it, TYPE) {
	  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var _validateCollection$1 = /*#__PURE__*/Object.freeze({
		default: _validateCollection,
		__moduleExports: _validateCollection
	});

	var createArrayMethod = ( _arrayMethods$1 && _arrayMethods ) || _arrayMethods$1;

	var validate = ( _validateCollection$1 && _validateCollection ) || _validateCollection$1;

	var getWeak = require$$0$10.getWeak;







	var arrayFind = createArrayMethod(5);
	var arrayFindIndex = createArrayMethod(6);
	var id$1 = 0;

	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function (that) {
	  return that._l || (that._l = new UncaughtFrozenStore());
	};
	var UncaughtFrozenStore = function () {
	  this.a = [];
	};
	var findUncaughtFrozen = function (store, key) {
	  return arrayFind(store.a, function (it) {
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function (key) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) return entry[1];
	  },
	  has: function (key) {
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function (key, value) {
	    var entry = findUncaughtFrozen(this, key);
	    if (entry) entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function (key) {
	    var index = arrayFindIndex(this.a, function (it) {
	      return it[0] === key;
	    });
	    if (~index) this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	var _collectionWeak = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._t = NAME;      // collection type
	      that._i = id$1++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function (key) {
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
	  def: function (that, key, value) {
	    var data = getWeak(anObject(key), true);
	    if (data === true) uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};
	var _collectionWeak_1 = _collectionWeak.getConstructor;
	var _collectionWeak_2 = _collectionWeak.def;
	var _collectionWeak_3 = _collectionWeak.ufstore;

	var _collectionWeak$1 = /*#__PURE__*/Object.freeze({
		default: _collectionWeak,
		__moduleExports: _collectionWeak,
		getConstructor: _collectionWeak_1,
		def: _collectionWeak_2,
		ufstore: _collectionWeak_3
	});

	var dP$2 = $defineProperty.f;
	var each = createArrayMethod(0);


	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = require$$0[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  if (!require$$0$1 || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    require$$0$10.NEED = true;
	  } else {
	    C = wrapper(function (target, iterable) {
	      anInstance(target, C, NAME, '_c');
	      target._c = new Base();
	      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) require$$5(C.prototype, KEY, function (a, b) {
	        anInstance(this, C, KEY);
	        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    IS_WEAK || dP$2(C.prototype, 'size', {
	      get: function () {
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export$1($export$1.G + $export$1.W + $export$1.F, O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var _collection$1 = /*#__PURE__*/Object.freeze({
		default: _collection,
		__moduleExports: _collection
	});

	var weak = ( _collectionWeak$1 && _collectionWeak ) || _collectionWeak$1;

	var require$$1$6 = ( _collection$1 && _collection ) || _collection$1;

	var es6_weakMap = createCommonjsModule(function (module) {
	var each = createArrayMethod(0);







	var WEAK_MAP = 'WeakMap';
	var getWeak = require$$0$10.getWeak;
	var isExtensible = Object.isExtensible;
	var uncaughtFrozenStore = weak.ufstore;
	var tmp = {};
	var InternalMap;

	var wrapper = function (get) {
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
	var $WeakMap = module.exports = require$$1$6(WEAK_MAP, wrapper, methods, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
	  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
	  assign(InternalMap.prototype, methods);
	  require$$0$10.NEED = true;
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
	      } return method.call(this, a, b);
	    });
	  });
	}
	});

	// https://tc39.github.io/proposal-setmap-offrom/


	var _setCollectionOf = function (COLLECTION) {
	  $export$1($export$1.S, COLLECTION, { of: function of() {
	    var length = arguments.length;
	    var A = new Array(length);
	    while (length--) A[length] = arguments[length];
	    return new this(A);
	  } });
	};

	var _setCollectionOf$1 = /*#__PURE__*/Object.freeze({
		default: _setCollectionOf,
		__moduleExports: _setCollectionOf
	});

	var require$$0$32 = ( _setCollectionOf$1 && _setCollectionOf ) || _setCollectionOf$1;

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
	require$$0$32('WeakMap');

	// https://tc39.github.io/proposal-setmap-offrom/





	var _setCollectionFrom = function (COLLECTION) {
	  $export$1($export$1.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
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

	var _setCollectionFrom$1 = /*#__PURE__*/Object.freeze({
		default: _setCollectionFrom,
		__moduleExports: _setCollectionFrom
	});

	var require$$0$33 = ( _setCollectionFrom$1 && _setCollectionFrom ) || _setCollectionFrom$1;

	// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
	require$$0$33('WeakMap');

	var weakMap = require$$1.WeakMap;

	var weakMap$1 = /*#__PURE__*/Object.freeze({
		default: weakMap,
		__moduleExports: weakMap
	});

	var require$$0$34 = ( weakMap$1 && weakMap ) || weakMap$1;

	var weakMap$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$34, __esModule: true };
	});

	var _WeakMap = unwrapExports(weakMap$2);

	var defineProperty$5 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;



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
	});

	var _defineProperty$1 = unwrapExports(defineProperty$5);

	// 19.1.2.15 Object.preventExtensions(O)

	var meta = require$$0$10.onFreeze;

	require$$1$1('preventExtensions', function ($preventExtensions) {
	  return function preventExtensions(it) {
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});

	var preventExtensions = require$$1.Object.preventExtensions;

	var preventExtensions$1 = /*#__PURE__*/Object.freeze({
		default: preventExtensions,
		__moduleExports: preventExtensions
	});

	var require$$0$35 = ( preventExtensions$1 && preventExtensions ) || preventExtensions$1;

	var preventExtensions$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$35, __esModule: true };
	});

	unwrapExports(preventExtensions$2);

	var getOwnPropertyDescriptor$4 = _Object$getOwnPropertyDescriptor;
	// **********************  对象操作  ************************
	/**
	 * sort Object attributes by function
	 * and transfer them into array
	 * @param  {Object} obj Object form from numric
	 * @param  {Function} fn sort function
	 * @return {Array} the sorted attirbutes array
	 */


	/**
	 * to check if an descriptor
	 * @param {anything} desc
	 */
	function isDescriptor(desc) {
	  if (!desc || !desc.hasOwnProperty) {
	    return false;
	  }

	  var keys = ['value', 'initializer', 'get', 'set'];

	  for (var i = 0, l = keys.length; i < l; i++) {
	    if (desc.hasOwnProperty(keys[i])) {
	      return true;
	    }
	  }
	  return false;
	}
	/**
	 * to check if the descirptor is an accessor descriptor
	 * @param {descriptor} desc it should be a descriptor better
	 */
	function isAccessorDescriptor(desc) {
	  return !!desc && (isFunction(desc.get) || isFunction(desc.set)) && isBoolean(desc.configurable) && isBoolean(desc.enumerable) && desc.writable === undefined;
	}
	/**
	 * to check if the descirptor is an data descriptor
	 * @param {descriptor} desc it should be a descriptor better
	 */
	function isDataDescriptor(desc) {
	  return !!desc && desc.hasOwnProperty('value') && isBoolean(desc.configurable) && isBoolean(desc.enumerable) && isBoolean(desc.writable);
	}
	/**
	 * to check if the descirptor is an initiallizer descriptor
	 * @param {descriptor} desc it should be a descriptor better
	 */
	function isInitializerDescriptor(desc) {
	  return !!desc && isFunction(desc.initializer) && isBoolean(desc.configurable) && isBoolean(desc.enumerable) && isBoolean(desc.writable);
	}
	/**
	 * set one value on the object
	 * @param {string} key
	 */
	function createDefaultSetter(key) {
	  return function set(newValue) {
	    _Object$defineProperty(this, key, {
	      configurable: true,
	      writable: true,
	      // IS enumerable when reassigned by the outside word
	      enumerable: true,
	      value: newValue
	    });
	    return newValue;
	  };
	}

	/**
	 * Compress many function into one function, but this function only accept one arguments;
	 * @param {Array<Function>} fns the array of function we need to compress into one function
	 * @param {string} errmsg When we check that there is something is not function, we will throw an error, you can set your own error message
	 */
	function compressOneArgFnArray(fns) {
	  var errmsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'You must pass me an array of function';

	  if (!isArray$1(fns) || fns.length < 1) {
	    throw new TypeError(errmsg);
	  }
	  if (fns.length === 1) {
	    if (!isFunction(fns[0])) {
	      throw new TypeError(errmsg);
	    }
	    return fns[0];
	  }
	  return fns.reduce(function (prev, curr) {
	    if (!isFunction(curr) || !isFunction(prev)) throw new TypeError(errmsg);
	    return function (value) {
	      return bind$1(curr, this)(bind$1(prev, this)(value));
	    };
	  });
	}
	/**
	 * just a method to call console.warn, maybe i will add some handler on it someday
	 * @param {anything} args
	 */
	function warn(message) {
	  if (isFunction(console.warn)) return console.warn(message);
	  console.log(message);
	}

	function getOwnKeysFn() {
	  var getOwnPropertyNames = _Object$getOwnPropertyNames,
	      getOwnPropertySymbols = _Object$getOwnPropertySymbols;

	  return isFunction(getOwnPropertySymbols) ? function (obj) {
	    // $FlowFixMe: do not support symwbol yet
	    return _Array$from(getOwnPropertyNames(obj).concat(getOwnPropertySymbols(obj)));
	  } : getOwnPropertyNames;
	}

	var getOwnKeys = getOwnKeysFn();

	function getOwnPropertyDescriptorsFn() {
	  // $FlowFixMe: In some environment, Object.getOwnPropertyDescriptors has been implemented;
	  return isFunction(_Object$getOwnPropertyDescriptors) ? _Object$getOwnPropertyDescriptors : function (obj) {
	    return getOwnKeys(obj).reduce(function (descs, key) {
	      descs[key] = getOwnPropertyDescriptor$4(obj, key);
	      return descs;
	    }, {});
	  };
	}

	var getOwnPropertyDescriptors$3 = getOwnPropertyDescriptorsFn();

	function compressMultipleDecorators() {
	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }

	  if (!fns.length) throw new TypeError('You must pass in decorators in compressMultipleDecorators');
	  fns.forEach(function (fn) {
	    if (!isFunction(fn)) throw new TypeError('Decorators must be a function, but not "' + fn + '" in ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
	  });
	  if (fns.length === 1) return fns[0];
	  return function (obj, prop, descirptor) {
	    // $FlowFixMe: the reduce will return a descriptor
	    return fns.reduce(function (descirptor, fn) {
	      return fn(obj, prop, descirptor);
	    }, descirptor);
	  };
	}

	function accessor() {
	  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	      get = _ref.get,
	      set = _ref.set;

	  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref2$preGet = _ref2.preGet,
	      preGet = _ref2$preGet === undefined ? false : _ref2$preGet,
	      _ref2$preSet = _ref2.preSet,
	      preSet = _ref2$preSet === undefined ? true : _ref2$preSet;

	  if (!isFunction(get) && !isFunction(set) && !(isArray$1(get) && get.length > 0) && !(isArray$1(set) && set.length > 0)) throw new TypeError("@accessor need a getter or setter. If you don't need to add setter/getter. You should remove @accessor");
	  var errmsg = '@accessor only accept function or array of function as getter/setter';
	  get = isArray$1(get) ? compressOneArgFnArray(get, errmsg) : get;
	  set = isArray$1(set) ? compressOneArgFnArray(set, errmsg) : set;
	  return function (obj, prop, descriptor) {
	    var _ref3 = descriptor || {},
	        _ref3$configurable = _ref3.configurable,
	        configurable = _ref3$configurable === undefined ? true : _ref3$configurable,
	        _ref3$enumerable = _ref3.enumerable,
	        enumerable = _ref3$enumerable === undefined ? true : _ref3$enumerable;

	    var hasGet = isFunction(get);
	    var hasSet = isFunction(set);
	    var handleGet = function handleGet(value) {
	      // $FlowFixMe: it's really function here
	      return hasGet ? bind$1(get, this)(value) : value;
	    };
	    var handleSet = function handleSet(value) {
	      // $FlowFixMe: it's really function here
	      return hasSet ? bind$1(set, this)(value) : value;
	    };
	    if (isAccessorDescriptor(descriptor)) {
	      var originGet = descriptor.get,
	          originSet = descriptor.set;

	      var hasOriginGet = isFunction(originGet);
	      var hasOriginSet = isFunction(originSet);
	      if (!hasOriginGet && hasGet) {
	        warn('You are trying to set getter via @accessor on ' + prop + ' without getter. That\'s not a good idea.');
	      }
	      if (!hasOriginSet && hasSet) {
	        warn('You are trying to set setter via @accessor on  ' + prop + ' without setter. That\'s not a good idea.');
	      }
	      var getter = hasOriginGet || hasGet ? function () {
	        var _this = this;

	        var boundGetter = bind$1(handleGet, this);
	        var originBoundGetter = function originBoundGetter() {
	          return hasOriginGet
	          // $FlowFixMe: we have do a check here
	          ? bind$1(originGet, _this)() : undefined;
	        };
	        var order = preGet ? [boundGetter, originBoundGetter] : [originBoundGetter, boundGetter];
	        // $FlowFixMe: it's all function here
	        return order.reduce(function (value, fn) {
	          return fn(value);
	        }, undefined);
	      } : undefined;
	      var setter = hasOriginSet || hasSet ? function (val) {
	        var _this2 = this;

	        var boundSetter = bind$1(handleSet, this);
	        var originBoundSetter = function originBoundSetter(value) {
	          return hasOriginSet
	          // $FlowFixMe: flow act like a retarded child on optional property
	          ? bind$1(originSet, _this2)(value) : value;
	        };
	        var order = preSet ? [boundSetter, originBoundSetter] : [originBoundSetter, boundSetter];
	        return order.reduce(function (value, fn) {
	          return fn(value);
	        }, val);
	      } : undefined;
	      return {
	        get: getter,
	        set: setter,
	        configurable: configurable,
	        enumerable: enumerable
	      };
	    } else if (isInitializerDescriptor(descriptor)) {
	      // $FlowFixMe: disjoint union is horrible, descriptor is initializerDescriptor now
	      var initializer = descriptor.initializer;

	      var value = void 0;
	      var inited = false;
	      return {
	        get: function get() {
	          var boundFn = bind$1(handleGet, this);
	          if (inited) return boundFn(value);
	          value = bind$1(initializer, this)();
	          inited = true;
	          return boundFn(value);
	        },
	        set: function set(val) {
	          var boundFn = bind$1(handleSet, this);
	          value = preSet ? boundFn(val) : val;
	          inited = true;
	          if (!preSet) {
	            boundFn(value);
	          }
	          return value;
	        },

	        configurable: configurable,
	        enumerable: enumerable
	      };
	    } else {
	      // $FlowFixMe: disjoint union is horrible, descriptor is DataDescriptor now
	      var _ref4 = descriptor || {},
	          _value = _ref4.value;

	      return {
	        get: function get() {
	          return bind$1(handleGet, this)(_value);
	        },
	        set: function set(val) {
	          var boundFn = bind$1(handleSet, this);
	          _value = preSet ? boundFn(val) : val;
	          if (!preSet) {
	            boundFn(_value);
	          }
	          return _value;
	        },

	        configurable: configurable,
	        enumerable: enumerable
	      };
	    }
	  };
	}

	function before() {
	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }

	  if (fns.length === 0) throw new Error("@before accept at least one parameter. If you don't need to preprocess before your function, do not add @before decorators");
	  if (fns.length > 2 && isDescriptor(fns[2])) {
	    throw new Error('You may use @before straightly, @before return decorators, you should call it before you set it as decorator.');
	  }
	  for (var i = fns.length - 1; i > -1; i--) {
	    if (!isFunction(fns[i])) throw new TypeError('@before only accept function parameter');
	  }
	  return function (obj, prop, descriptor) {
	    var _ref = descriptor || {},
	        fn = _ref.value,
	        configurable = _ref.configurable,
	        enumerable = _ref.enumerable,
	        writable = _ref.writable;

	    if (!isFunction(fn)) throw new TypeError('@before can only be used on function, please check the property "' + prop + '" is a method or not.');
	    var handler = function handler() {
	      var _this = this;

	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      var paras = fns.reduce(function (paras, fn) {
	        var result = bind$1(fn, _this).apply(undefined, _toConsumableArray(paras));
	        return result === undefined ? paras : isArray$1(result) ? result
	        // $FlowFixMe: what the hell, it can be anything
	        : [result];
	      }, args);
	      return bind$1(fn, this).apply(undefined, _toConsumableArray(paras));
	    };
	    return {
	      value: handler,
	      configurable: configurable,
	      enumerable: enumerable,
	      writable: writable
	    };
	  };
	}

	function after() {
	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }

	  if (fns.length === 0) throw new Error("@after accept at least one parameter. If you don't need to preprocess after your function, do not add @after decorators");
	  if (fns.length > 2 && isDescriptor(fns[2])) {
	    throw new Error('You may have used @after straightly. @after return decorators. You should call it before you use it as decorators');
	  }
	  var fn = compressOneArgFnArray(fns, '@after only accept function parameter');
	  return function (obj, prop, descriptor) {
	    var _ref = descriptor || {},
	        value = _ref.value,
	        configurable = _ref.configurable,
	        enumerable = _ref.enumerable,
	        writable = _ref.writable;

	    if (!isFunction(value)) throw new TypeError('@after can only be used on function, please checkout your property "' + prop + '" is a method or not.');
	    var handler = function handler() {
	      var ret = bind$1(value, this).apply(undefined, arguments);
	      return bind$1(fn, this)(ret);
	    };
	    return {
	      value: handler,
	      configurable: configurable,
	      enumerable: enumerable,
	      writable: writable
	    };
	  };
	}

	function initialize() {
	  for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
	    fns[_key] = arguments[_key];
	  }

	  if (fns.length === 0) throw new Error("@initialize accept at least one parameter. If you don't need to initialize your value, do not add @initialize.");
	  if (fns.length > 2 && isDescriptor(fns[2])) {
	    throw new Error('You may use @initialize straightly, @initialize return decorators, you need to call it');
	  }
	  var fn = compressOneArgFnArray(fns, '@initialize only accept function parameter');
	  return function (obj, prop, descriptor) {
	    if (descriptor === undefined) {
	      return {
	        value: bind$1(fn, obj)(),
	        configurable: true,
	        writable: true,
	        enumerable: true
	      };
	    }
	    if (isAccessorDescriptor(descriptor)) {
	      var hasBeenReset = false;
	      var originSet = descriptor.set;

	      return accessor({
	        get: function get(value) {
	          if (hasBeenReset) return value;
	          return bind$1(fn, this)(value);
	        },

	        set: originSet ? function (value) {
	          hasBeenReset = true;
	          return value;
	        } : undefined
	      })(obj, prop, descriptor);
	    }
	    /**
	     * when we set decorator on propery
	     * we will get a descriptor with initializer
	     * as they will be attach on the instance later
	     * so, we need to substitute the initializer function
	     */
	    if (isInitializerDescriptor(descriptor)) {
	      // $FlowFixMe: useless disjoint union
	      var initializer = descriptor.initializer;

	      var handler = function handler() {
	        return bind$1(fn, this)(bind$1(initializer, this)());
	      };
	      return {
	        initializer: handler,
	        configurable: descriptor.configurable,
	        // $FlowFixMe: useless disjoint union
	        writable: descriptor.writable,
	        enumerable: descriptor.enumerable
	      };
	    }
	    // $FlowFixMe: useless disjoint union
	    var value = bind$1(fn, this)(descriptor.value);
	    return {
	      value: value,
	      // $FlowFixMe: useless disjoint union
	      writable: descriptor.writable,
	      configurable: descriptor.configurable,
	      enumerable: descriptor.enumerable
	    };
	  };
	}

	var getOwnPropertyDescriptor$1$1 = _Object$getOwnPropertyDescriptor;
	var defineProperty$6 = _Object$defineProperty;

	function setAlias(root, prop, _ref, obj, key, _ref2) {
	  var configurable = _ref.configurable,
	      enumerable = _ref.enumerable;
	  var force = _ref2.force,
	      omit = _ref2.omit;

	  var originDesc = getOwnPropertyDescriptor$1$1(obj, key);
	  if (originDesc !== undefined) {
	    if (omit) return;
	    // TODO: we should add an github link here
	    if (!force) throw new Error('"' + prop + '" is an existing property, if you want to override it, please set "force" true in @alias option.');
	    if (!originDesc.configurable) {
	      throw new Error('property "' + prop + '" is unconfigurable.');
	    }
	  }
	  defineProperty$6(obj, key, {
	    get: function get() {
	      return root[prop];
	    },
	    set: function set(value) {
	      root[prop] = value;
	      return prop;
	    },

	    configurable: configurable,
	    enumerable: enumerable
	  });
	}
	function alias(other, key, option) {
	  // set argument into right position
	  if (arguments.length === 2) {
	    if (isString(other)) {
	      // $FlowFixMe: i will check this later
	      option = key;
	      key = other;
	      other = undefined;
	    }
	  } else if (arguments.length === 1) {
	    // $FlowFixMe: i will check this later
	    key = other;
	    other = undefined;
	  }
	  // argument validate
	  if (!isString(key)) throw new TypeError('@alias need a string as a key to find the porperty to set alias on');
	  var illegalObjErrorMsg = 'If you want to use @alias to set alias on other instance, you must pass in a legal instance';
	  if (other !== undefined && isPrimitive(other)) throw new TypeError(illegalObjErrorMsg);

	  var _ref3 = isObject$1(option) ? option : { force: false, omit: false },
	      force = _ref3.force,
	      omit = _ref3.omit;

	  return function (obj, prop, descriptor) {
	    descriptor = descriptor || {
	      value: undefined,
	      configurable: true,
	      writable: true,
	      enumerable: true
	    };
	    function getTargetAndName(other, obj, key) {
	      var target = isPrimitive(other) ? obj : other;
	      var keys = key.split('.');

	      var _keys$slice = keys.slice(-1),
	          _keys$slice2 = _slicedToArray(_keys$slice, 1),
	          name = _keys$slice2[0];

	      target = getDeepProperty$1(target, keys.slice(0, -1), { throwError: true });
	      if (isPrimitive(target)) {
	        throw new TypeError(illegalObjErrorMsg);
	      }
	      return {
	        target: target,
	        name: name
	      };
	    }
	    if (isInitializerDescriptor(descriptor)) {
	      return initialize(function (value) {
	        var _getTargetAndName = getTargetAndName(other, this, key),
	            target = _getTargetAndName.target,
	            name = _getTargetAndName.name;

	        setAlias(this, prop, descriptor, target, name, { force: force, omit: omit });
	        return value;
	      })(obj, prop, descriptor);
	    }
	    if (isAccessorDescriptor(descriptor)) {
	      var inited = void 0;
	      var handler = function handler(value) {
	        if (inited) return value;

	        var _getTargetAndName2 = getTargetAndName(other, this, key),
	            target = _getTargetAndName2.target,
	            name = _getTargetAndName2.name;

	        setAlias(this, prop, descriptor, target, name, { force: force, omit: omit });
	        inited = true;
	        return value;
	      };
	      return accessor({ get: handler, set: handler })(obj, prop, descriptor);
	    }

	    var _getTargetAndName3 = getTargetAndName(other, obj, key),
	        target = _getTargetAndName3.target,
	        name = _getTargetAndName3.name;

	    setAlias(obj, prop, descriptor, target, name, { force: force, omit: omit });
	    return descriptor;
	  };
	}

	var defineProperty$1$1 = _Object$defineProperty;

	function classify(decorator) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      requirement = _ref.requirement,
	      _ref$customArgs = _ref.customArgs,
	      customArgs = _ref$customArgs === undefined ? false : _ref$customArgs;

	  return function () {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        _ref2$exclude = _ref2.exclude,
	        exclude = _ref2$exclude === undefined ? [] : _ref2$exclude,
	        _ref2$include = _ref2.include,
	        include = _ref2$include === undefined ? [] : _ref2$include,
	        _ref2$construct = _ref2.construct,
	        construct = _ref2$construct === undefined ? false : _ref2$construct,
	        _ref2$self = _ref2.self,
	        self = _ref2$self === undefined ? false : _ref2$self;

	    if (!isArray$1(exclude)) throw new TypeError('options.exclude must be an array');
	    if (!isArray$1(include)) throw new TypeError('options.include must be an array');
	    return function (Klass) {
	      var isClass = isFunction(Klass);
	      if (!self && !isClass) throw new TypeError('@' + decorator.name + 'Class can only be used on class');
	      if (self && isPrimitive(Klass)) throw new TypeError('@' + decorator.name + 'Class must be used on non-primitive type value in \'self\' mode');
	      var prototype = self ? Klass : Klass.prototype;
	      if (isVoid(prototype)) throw new Error('The prototype of the ' + Klass.name + ' is empty, please check it');
	      var descs = getOwnPropertyDescriptors$3(prototype);
	      getOwnKeys(prototype).concat(include).forEach(function (key) {
	        var desc = descs[key];
	        if (key === 'constructor' && !construct || self && isClass && ['name', 'length', 'prototype'].indexOf(key) > -1 || exclude.indexOf(key) > -1 || isFunction(requirement) && requirement(prototype, key, desc, { self: self }) === false) return;
	        defineProperty$1$1(prototype, key, (customArgs ? decorator.apply(undefined, _toConsumableArray(args)) : decorator)(prototype, key, desc));
	      });
	    };
	  };
	}

	var autobindClass = classify(autobind, {
	  requirement: function requirement(obj, prop, desc) {
	    // $FlowFixMe: it's data descriptor now
	    return isDataDescriptor(desc) && isFunction(desc.value);
	  }
	});

	var mapStore = void 0;
	// save bound function for super
	function getBoundSuper(obj, fn) {
	  if (typeof _WeakMap === 'undefined') {
	    throw new Error('Using @autobind on ' + fn.name + '() requires WeakMap support due to its use of super.' + fn.name + '()');
	  }

	  if (!mapStore) {
	    mapStore = new _WeakMap();
	  }

	  if (mapStore.has(obj) === false) {
	    mapStore.set(obj, new _WeakMap());
	  }

	  var superStore = mapStore.get(obj);
	  // $FlowFixMe: already insure superStore is not undefined
	  if (superStore.has(fn) === false) {
	    // $FlowFixMe: already insure superStore is not undefined
	    superStore.set(fn, bind$1(fn, obj));
	  }
	  // $FlowFixMe: already insure superStore is not undefined
	  return superStore.get(fn);
	}
	/**
	 * auto bind the function on the class, just support function
	 * @param {Object} obj Target Object
	 * @param {string} prop prop strong
	 * @param {Object} descriptor
	 */
	function autobind(obj, prop, descriptor) {
	  if (arguments.length === 1) return autobindClass()(obj);

	  var _ref = descriptor || {},
	      fn = _ref.value,
	      configurable = _ref.configurable;

	  if (!isFunction(fn)) {
	    throw new TypeError('@autobind can only be used on functions, not "' + fn + '" in ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) + ' on property "' + prop + '"');
	  }
	  var constructor = obj.constructor;

	  return {
	    configurable: configurable,
	    enumerable: false,
	    get: function get() {
	      var _this = this;

	      var boundFn = function boundFn() {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        return fn.call.apply(fn, [_this].concat(_toConsumableArray(args)));
	      };
	      // Someone accesses the property directly on the prototype on which it is
	      // actually defined on, i.e. Class.prototype.hasOwnProperty(key)
	      if (this === obj) {
	        return fn;
	      }
	      // Someone accesses the property directly on a prototype,
	      // but it was found up the chain, not defined directly on it
	      // i.e. Class.prototype.hasOwnProperty(key) == false && key in Class.prototype
	      if (this.constructor !== constructor && _Object$getPrototypeOf(this).constructor === constructor) {
	        return fn;
	      }

	      // Autobound method calling super.sameMethod() which is also autobound and so on.
	      if (this.constructor !== constructor && prop in this.constructor.prototype) {
	        return getBoundSuper(this, fn);
	      }
	      _Object$defineProperty(this, prop, {
	        configurable: true,
	        writable: true,
	        // NOT enumerable when it's a bound method
	        enumerable: false,
	        value: boundFn
	      });

	      return boundFn;
	    },

	    set: createDefaultSetter(prop)
	  };
	}

	var defineProperty$2$1 = _Object$defineProperty;
	/**
	 * make one attr only can be read, but could not be rewrited/ deleted
	 * @param {Object} obj
	 * @param {string} prop
	 * @param {Object} descriptor
	 * @return {descriptor}
	 */

	function frozen(obj, prop, descriptor) {
	  if (descriptor === undefined) {
	    /* istanbul ignore else  */
	    warn('You are using @frozen on an undefined property. This property will become a frozen undefined forever, which is meaningless');
	    return {
	      value: undefined,
	      writable: false,
	      enumerable: false,
	      configurable: false
	    };
	  }
	  descriptor.enumerable = false;
	  descriptor.configurable = false;
	  if (isAccessorDescriptor(descriptor)) {
	    var _get = descriptor.get;

	    descriptor.set = undefined;
	    if (!isFunction(_get)) {
	      /* istanbul ignore else  */
	      warn('You are using @frozen on one accessor descriptor without getter. This property will become a frozen undefined finally.Which maybe meaningless.');
	      return;
	    }
	    return {
	      get: function get() {
	        var value = bind$1(_get, this)();
	        defineProperty$2$1(this, prop, {
	          value: value,
	          writable: false,
	          configurable: false,
	          enumerable: false
	        });
	        return value;
	      },

	      set: undefined,
	      configurable: false,
	      enumerable: false
	    };
	  }
	  // $FlowFixMe: comeon, can disjoint union be reliable?
	  descriptor.writable = false;
	  return descriptor;
	}

	var getOwnPropertyDescriptor$2$1 = _Object$getOwnPropertyDescriptor;
	var defineProperty$3$1 = _Object$defineProperty;

	function waituntil(key) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      other = _ref.other;

	  if (!isFunction(key) && !isPromise(key) && !isString(key)) throw new TypeError('@waitUntil only accept Function, Promise or String');
	  return function (obj, prop, descriptor) {
	    var _ref2 = descriptor || {},
	        _value = _ref2.value,
	        configurable = _ref2.configurable;

	    if (!isFunction(_value)) throw new TypeError('@waituntil can only be used on function, but not ' + _value + ' on property "' + prop + '"');
	    var binded = false;
	    var waitingQueue = [];
	    var canIRun = isPromise(key) ? function () {
	      return key;
	    } : isFunction(key) ? key : function () {
	      // $FlowFixMe: We have use isPromise to exclude
	      var keys = key.split('.');
	      var prop = keys.slice(-1);
	      var originTarget = isPrimitive(other) ? this : other;
	      if (!binded) {
	        var target = getDeepProperty$1(originTarget, keys.slice(0, -1));
	        if (isVoid(target)) return target;
	        var _descriptor = getOwnPropertyDescriptor$2$1(target, prop);
	        /**
	         * create a setter hook here
	         * when it get ture, it will run all function in waiting queue immediately
	         */
	        var set = function set(value) {
	          if (value === true) {
	            while (waitingQueue.length > 0) {
	              waitingQueue[0]();
	              waitingQueue.shift();
	            }
	          }
	          return value;
	        };
	        var desc = isDescriptor(_descriptor) ? accessor({ set: set })(target, prop, _descriptor) : accessor({ set: set })(target, prop, {
	          value: undefined,
	          configurable: true,
	          enumerable: true,
	          writable: true
	        });
	        defineProperty$3$1(target, prop, desc);
	        binded = true;
	      }
	      return getDeepProperty$1(originTarget, keys);
	    };
	    return {
	      value: function value() {
	        var _this = this;

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        var boundFn = bind$1(_value, this);
	        var runnable = bind$1(canIRun, this).apply(undefined, args);
	        if (isPromise(runnable)) {
	          return _Promise.resolve(runnable).then(function () {
	            return bind$1(_value, _this).apply(undefined, args);
	          });
	        } else if (runnable === true) {
	          return bind$1(_value, this).apply(undefined, args);
	        } else {
	          return new _Promise(function (resolve) {
	            var cb = function cb() {
	              boundFn.apply(undefined, args);
	              resolve();
	            };
	            waitingQueue.push(cb);
	          });
	        }
	      },

	      // function should not be enmuerable
	      enumerable: false,
	      configurable: configurable,
	      // as we have delay this function
	      // it's not a good idea to change it
	      writable: false
	    };
	  };
	}

	function nonenumerable(obj, prop, descriptor) {
	  if (descriptor === undefined) {
	    return {
	      value: undefined,
	      enumerable: false,
	      configurable: true,
	      writable: true
	    };
	  }
	  descriptor.enumerable = false;
	  return descriptor;
	}

	var defineProperty$6$1 = _Object$defineProperty;
	var getOwnPropertyDescriptor$3$1 = _Object$getOwnPropertyDescriptor;


	function applyDecorators(Class, props) {
	  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      _ref$self = _ref.self,
	      self = _ref$self === undefined ? false : _ref$self,
	      _ref$omit = _ref.omit,
	      omit = _ref$omit === undefined ? false : _ref$omit;

	  var isPropsFunction = isFunction(props);
	  if (isPropsFunction || isArray$1(props)) {
	    // apply decorators on class
	    if (!isFunction(Class)) throw new TypeError('If you want to decorator class, you must pass it a legal class');
	    // $FlowFixMe: Terrible union, it's function now
	    if (isPropsFunction) props(Class);else {
	      // $FlowFixMe: Terrible union, it's array now
	      for (var i = 0, len = props.length; i < len; i++) {
	        // $FlowFixMe: Terrible union, it's array now
	        var fn = props[i];
	        if (!isFunction(fn)) throw new TypeError('If you want to decorate an class, you must pass it function or array of function');
	        fn(Class);
	      }
	    }
	    return Class;
	  }
	  if (!self && !isFunction(Class)) throw new TypeError('applyDecorators only accept class as first arguments. If you want to modify instance, you should set options.self true.');
	  if (self && isPrimitive(Class)) throw new TypeError("We can't apply docorators on a primitive value, even in self mode");
	  if (!isObject$1(props)) throw new TypeError('applyDecorators only accept object as second arguments');
	  var prototype = self ? Class : Class.prototype;
	  if (isVoid(prototype)) throw new Error('The class muse have a prototype, please take a check');
	  for (var key in props) {
	    var value = props[key];
	    var decorators = isArray$1(value) ? value : [value];
	    var handler = void 0;
	    try {
	      handler = compressMultipleDecorators.apply(undefined, _toConsumableArray(decorators));
	    } catch (err) {
	      /* istanbul ignore else  */
	      warn(err && err.message);
	      throw new Error('The decorators set on props must be Function or Array of Function');
	    }
	    var descriptor = getOwnPropertyDescriptor$3$1(prototype, key);
	    if (descriptor && !descriptor.configurable) {
	      if (!omit) throw new Error(key + ' of ' + prototype + ' is unconfigurable');
	      continue;
	    }
	    defineProperty$6$1(prototype, key, handler(prototype, key, descriptor));
	  }
	  return Class;
	}

	var arrayChangeMethod = ['push', 'pop', 'unshift', 'shift', 'splice', 'sort', 'reverse'];

	function deepProxy(value, hook, _ref) {
	  var _operateProps;

	  var diff = _ref.diff,
	      operationPrefix = _ref.operationPrefix;

	  var mapStore = {};
	  var arrayChanging = false;
	  var proxyValue = new Proxy(value, {
	    get: function get(target, property, receiver) {
	      var value = target[property];
	      if (isArray$1(target) && arrayChangeMethod.indexOf(property) > -1) {
	        return function () {
	          arrayChanging = true;
	          bind$1(value, receiver).apply(undefined, arguments);
	          arrayChanging = false;
	          hook();
	        };
	      }
	      if (mapStore[property] === true) return value;
	      if (isObject$1(value) || isArray$1(value)) {
	        var _proxyValue = mapStore[property] || deepProxy(value, hook, { diff: diff, operationPrefix: operationPrefix });
	        mapStore[property] = _proxyValue;
	        return _proxyValue;
	      }
	      mapStore[property] = true;
	      return value;
	    },
	    set: function set(target, property, value) {
	      var oldVal = target[property];
	      var newVal = isObject$1(value) || isArray$1(value) ? deepProxy(value, hook, { diff: diff, operationPrefix: operationPrefix }) : value;
	      target[property] = newVal;
	      mapStore[property] = true;
	      if (arrayChanging || diff && oldVal === newVal) return true;
	      hook();
	      return true;
	    },
	    deleteProperty: function deleteProperty(target, property) {
	      delete target[property];
	      delete mapStore[property];
	      if (arrayChanging) return true;
	      hook();
	      return true;
	    }
	  });
	  var operateProps = (_operateProps = {}, _defineProperty$1(_operateProps, operationPrefix + 'set', [initialize(function (method) {
	    return function (property, val) {
	      // $FlowFixMe: we have check the computed value
	      proxyValue[property] = val;
	    };
	  }), nonenumerable]), _defineProperty$1(_operateProps, operationPrefix + 'del', [initialize(function (method) {
	    return function (property) {
	      // $FlowFixMe: we have check the computed value
	      delete proxyValue[property];
	    };
	  }), nonenumerable]), _operateProps);
	  applyDecorators(proxyValue, operateProps, { self: true });
	  return proxyValue;
	}

	function deepObserve(value, hook, _ref2) {
	  var _this = this,
	      _operateProps2;

	  var operationPrefix = _ref2.operationPrefix,
	      diff = _ref2.diff;

	  var mapStore = {};
	  var arrayChanging = false;
	  function getPropertyDecorators(keys) {
	    var oldVal = void 0;
	    return keys.reduce(function (props, key) {
	      props[key] = [accessor({
	        set: function set(value) {
	          oldVal = this[key];
	          return value;
	        }
	      }), accessor({
	        get: function get(val) {
	          if (mapStore[key]) return val;
	          if (isObject$1(val) || isArray$1(val)) {
	            deepObserve(val, hook, { operationPrefix: operationPrefix, diff: diff });
	          }
	          mapStore[key] = true;
	          return val;
	        },
	        set: function set(val) {
	          if (isObject$1(val) || isArray$1(val)) deepObserve(val, hook, { operationPrefix: operationPrefix, diff: diff });
	          mapStore[key] = true;
	          if (!arrayChanging && (!diff || oldVal !== val)) hook();
	          return val;
	        }
	      }, { preSet: false })];
	      return props;
	    }, {});
	  }
	  var props = getPropertyDecorators(getOwnKeys(value));
	  applyDecorators(value, props, { self: true, omit: true });
	  if (isArray$1(value)) {
	    var methodProps = arrayChangeMethod.reduce(function (props, key) {
	      props[key] = [initialize(function (method) {
	        method = isFunction(method) ? method
	        // $FlowFixMe: we have check the key
	        : Array.prototype[key];
	        return function () {
	          var originLength = value.length;
	          arrayChanging = true;
	          bind$1(method, value).apply(undefined, arguments);
	          arrayChanging = false;
	          if (originLength < value.length) {
	            var keys = new Array(value.length - originLength).fill(1).map(function (value, index) {
	              return (index + originLength).toString();
	            });
	            var _props = getPropertyDecorators(keys);
	            applyDecorators(value, _props, { self: true, omit: true });
	          }
	          hook();
	        };
	      }), nonenumerable];
	      return props;
	    }, {});
	    applyDecorators(value, methodProps, { self: true });
	  }
	  var operateProps = (_operateProps2 = {}, _defineProperty$1(_operateProps2, operationPrefix + 'set', [initialize(function (method) {
	    return function (property, val) {
	      var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	          disable = _ref3.disable,
	          isNewVal = _ref3.isNewVal;

	      isNewVal = isNewVal || getOwnKeys(value).indexOf(property) === -1;
	      if (isFunction(method)) {
	        bind$1(method, _this)(property, val, { disable: true, isNewVal: isNewVal });
	      }
	      if (isNewVal) {
	        var _props2 = getPropertyDecorators([property]);
	        applyDecorators(value, _props2, { self: true, omit: true });
	      }
	      if (!disable) {
	        value[property] = val;
	      }
	    };
	  }), nonenumerable]), _defineProperty$1(_operateProps2, operationPrefix + 'del', [initialize(function (method) {
	    return function (property) {
	      if (isFunction(method)) {
	        bind$1(method, _this)(property);
	      } else {
	        delete value[property];
	      }
	      hook();
	    };
	  }), nonenumerable]), _operateProps2);
	  applyDecorators(value, operateProps, { self: true });
	  return value;
	}

	function watch() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var option = isObject$1(args[args.length - 1]) ? args[args.length - 1] : {};
	  // $FlowFixMe: we have check if it's an object
	  var deep = option.deep,
	      omit = option.omit,
	      other = option.other,
	      _option$operationPref = option.operationPrefix,
	      operationPrefix = _option$operationPref === undefined ? '__' : _option$operationPref,
	      _option$diff = option.diff,
	      diff = _option$diff === undefined ? true : _option$diff;
	  // $FlowFixMe: we have check if it's an object

	  var proxy = option.proxy;

	  if (typeof Proxy !== 'function') {
	    proxy = false;
	    /* istanbul ignore else  */
	    warn('You browser do not support Proxy, we will fall back into observe mode.');
	  }
	  if (!args.length) throw new TypeError('You must pass a function or a string to find the hanlder function.');
	  if (other !== undefined && isPrimitive(other)) throw new TypeError('If you want us to trigger function on the other instance, you must pass in a legal instance');
	  if (!isString(operationPrefix)) throw new TypeError('operationPrefix must be an string');
	  return function (obj, prop, descriptor) {
	    var fns = args.reduce(function (fns, keyOrFn, index) {
	      if (!isString(keyOrFn) && !isFunction(keyOrFn)) {
	        if (!index || index !== args.length - 1) throw new TypeError('You can only pass function or string as handler');
	        return fns;
	      }
	      fns.push(isString(keyOrFn) ? function (newVal, oldVal) {
	        var target = other || obj;
	        // $FlowFixMe: we have ensure it must be a string
	        var fn = getDeepProperty$1(target, keyOrFn);
	        if (!isFunction(fn)) {
	          if (!omit) throw new Error('You pass in a function for us to trigger, please ensure the property to be a function or set omit flag true');
	          return;
	        }
	        return bind$1(fn, this)(newVal, oldVal);
	      } : keyOrFn);
	      return fns;
	    }, []);
	    var handler = function handler(newVal, oldVal) {
	      var _this2 = this;

	      fns.forEach(function (fn) {
	        return bind$1(fn, _this2)(newVal, oldVal);
	      });
	    };
	    var inited = false;
	    var oldVal = void 0;
	    var newVal = void 0;
	    var proxyValue = void 0;
	    return compressMultipleDecorators(accessor({
	      set: function set(value) {
	        var _this3 = this;

	        oldVal = this[prop];
	        proxyValue = undefined;
	        var hook = function hook() {
	          return bind$1(handler, _this3)(newVal, oldVal);
	        };
	        return deep && (isObject$1(value) || isArray$1(value)) ? proxy ? deepProxy(value, hook, { diff: diff, operationPrefix: operationPrefix }) : deepObserve(value, hook, { operationPrefix: operationPrefix, diff: diff }) : value;
	      },
	      get: function get(value) {
	        var _this4 = this;

	        if (proxyValue) return proxyValue;
	        if (!inited) {
	          inited = true;
	          var hook = function hook() {
	            return bind$1(handler, _this4)(newVal, oldVal);
	          };
	          if (deep && (isObject$1(value) || isArray$1(value))) {
	            if (proxy) {
	              proxyValue = deepProxy(value, hook, { diff: diff, operationPrefix: operationPrefix });
	              oldVal = proxyValue;
	              newVal = proxyValue;
	              return proxyValue;
	            }
	            deepObserve(value, hook, { operationPrefix: operationPrefix, diff: diff });
	          }
	          oldVal = value;
	          newVal = value;
	        }
	        return value;
	      }
	    }, { preSet: true }), accessor({
	      set: function set(value) {
	        newVal = value;
	        if (!diff || oldVal !== value) bind$1(handler, this)(newVal, oldVal);
	        oldVal = value;
	        return value;
	      }
	    }, { preSet: false }))(obj, prop, descriptor);
	  };
	}

	function runnable(key) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      other = _ref.other,
	      backup = _ref.backup;

	  if (!isFunction(key) && !isString(key)) throw new TypeError('@runnable only accept Function or String');
	  return function (obj, prop, descriptor) {
	    var _ref2 = descriptor || {},
	        _value = _ref2.value,
	        configurable = _ref2.configurable;

	    if (!isFunction(_value)) throw new TypeError('@runnable can only be used on method, but not ' + _value + ' on property "' + prop + '".');
	    var canIRun = isFunction(key) ? key : function () {
	      var keys = key.split('.');
	      var originTarget = isPrimitive(other) ? this : other;
	      return getDeepProperty$1(originTarget, keys);
	    };
	    backup = isFunction(backup) ? backup : function () {};
	    return {
	      value: function value() {
	        if (bind$1(canIRun, this).apply(undefined, arguments) === true) {
	          return bind$1(_value, this).apply(undefined, arguments);
	        } else {
	          // $FlowFixMe: I have reassign it when it's not a function
	          return bind$1(backup, this).apply(undefined, arguments);
	        }
	      },

	      // function should not be enmuerable
	      enumerable: false,
	      configurable: configurable,
	      // as we have delay this function
	      // it's not a good idea to change it
	      writable: false
	    };
	  };
	}

	function nonconfigurable(obj, prop, descriptor) {
	  if (descriptor === undefined) {
	    return {
	      value: undefined,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    };
	  }
	  descriptor.configurable = true;
	  return descriptor;
	}

	function string() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var defaultValue = isString(args[0]) ? args.shift() : '';
	  args.unshift(function (value) {
	    return isString(value) ? value : defaultValue;
	  });
	  return initialize.apply(undefined, args);
	}

	function boolean() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var defaultValue = isBoolean(args[0]) ? args.shift() : false;
	  args.unshift(function (value) {
	    return isBoolean(value) ? value : defaultValue;
	  });
	  return initialize.apply(undefined, args);
	}

	function string$1() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var defaultValue = isString(args[0]) ? args.shift() : '';
	  args.unshift(function (value) {
	    return isString(value) ? value : defaultValue;
	  });
	  return accessor({ set: args, get: args });
	}

	function boolean$1() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var defaultValue = isBoolean(args[0]) ? args.shift() : false;
	  args.unshift(function (value) {
	    return isBoolean(value) ? value : defaultValue;
	  });
	  return accessor({ set: args, get: args });
	}

	function number$1() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  var defaultValue = isNumber(args[0]) ? args.shift() : 0;
	  args.unshift(function (value) {
	    return isNumber(value) ? value : defaultValue;
	  });
	  return accessor({ set: args, get: args });
	}

	var before$1 = classify(before, {
	  requirement: function requirement(obj, prop, desc) {
	    // $FlowFixMe: it's data descriptor now
	    return isDataDescriptor(desc) && isFunction(desc.value);
	  },

	  customArgs: true
	});

	var after$1 = classify(after, {
	  requirement: function requirement(obj, prop, desc) {
	    // $FlowFixMe: it's data descriptor now
	    return isDataDescriptor(desc) && isFunction(desc.value);
	  },

	  customArgs: true
	});

	var runnable$1 = classify(runnable, {
	  requirement: function requirement(obj, prop, desc) {
	    // $FlowFixMe: it's data descriptor now
	    return isDataDescriptor(desc) && isFunction(desc.value);
	  },

	  customArgs: true
	});

	var waituntil$1 = classify(waituntil, {
	  requirement: function requirement(obj, prop, desc) {
	    // $FlowFixMe: it's data descriptor now
	    return isDataDescriptor(desc) && isFunction(desc.value);
	  },

	  customArgs: true
	});

	var $JSON$1 = require$$1.JSON || (require$$1.JSON = { stringify: JSON.stringify });
	var stringify = function stringify(it) { // eslint-disable-line no-unused-vars
	  return $JSON$1.stringify.apply($JSON$1, arguments);
	};

	var stringify$1 = /*#__PURE__*/Object.freeze({
		default: stringify,
		__moduleExports: stringify
	});

	var require$$0$36 = ( stringify$1 && stringify ) || stringify$1;

	var stringify$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$36, __esModule: true };
	});

	var _JSON$stringify = unwrapExports(stringify$2);

	var videoEvents = ['abort', 'canplay', 'canplaythrough', 'durationchange', 'emptied', 'encrypted', 'ended', 'error', 'interruptbegin', 'interruptend', 'loadeddata', 'loadedmetadata', 'loadstart', 'mozaudioavailable', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting'];
	var videoReadOnlyProperties = ['buffered', 'currentSrc', 'duration', 'error', 'ended', 'networkState', 'paused', 'readyState', 'seekable', 'sinkId', 'controlsList', 'tabIndex', 'dataset', 'offsetHeight', 'offsetLeft', 'offsetParent', 'offsetTop', 'offsetWidth'];
	var domEvents = ['beforeinput', 'blur', 'click', 'compositionend', 'compositionstart', 'compositionupdate', 'dblclick', 'focus', 'focusin', 'focusout', 'input', 'keydown', 'keypress', 'keyup', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll', 'select', 'wheel', 'mousewheel', 'contextmenu', 'touchstart', 'touchmove', 'touchend', 'fullscreen'];
	var esFullscreenEvents = ['fullscreenchange'];
	var passiveEvents = ['wheel', 'mousewheel', 'touchstart', 'touchmove'];
	var selfProcessorEvents = ['silentLoad', 'fullscreen'];
	var mustListenVideoDomEvents = ['mouseenter', 'mouseleave'];
	var kernelMethods = ['play', 'pause', 'seek', 'startLoad', 'stopLoad'];
	var dispatcherMethods = ['load'];
	var kernelEvents = ['mediaInfo', 'heartbeat', 'error'];
	var domMethods = ['focus', 'fullscreen', 'requestFullscreen', 'exitFullscreen'];
	var videoMethods = ['canPlayType', 'captureStream', 'setSinkId'];

	/**
	 * checker for on, off, once function
	 * @param {string} key
	 * @param {Function} fn
	 */
	function eventBinderCheck(key, fn) {
	  if (!isString(key)) throw new TypeError('key parameter must be String');
	  if (!isFunction(fn)) throw new TypeError('fn parameter must be Function');
	}
	/**
	 * checker for attr or css function
	 */
	function attrAndStyleCheck() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if (args.length > 2) {
	    return ['set'].concat(args);
	  }
	  if (args.length === 2) {
	    if (['video', 'container', 'wrapper', 'videoElement'].indexOf(args[0]) > -1) {
	      return ['get'].concat(args);
	    }
	    return ['set', 'container'].concat(args);
	  }
	  return ['get', 'container'].concat(args);
	}

	// 20.1.2.4 Number.isNaN(number)


	$export$1($export$1.S, 'Number', {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});

	var isNan = require$$1.Number.isNaN;

	var isNan$1 = /*#__PURE__*/Object.freeze({
		default: isNan,
		__moduleExports: isNan
	});

	var require$$0$37 = ( isNan$1 && isNan ) || isNan$1;

	var isNan$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$37, __esModule: true };
	});

	var _Number$isNaN = unwrapExports(isNan$2);

	var _dec, _dec2, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

	function _initDefineProp(target, property, descriptor, context) {
	  if (!descriptor) return;

	  _Object$defineProperty(target, property, {
	    enumerable: descriptor.enumerable,
	    configurable: descriptor.configurable,
	    writable: descriptor.writable,
	    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	  });
	}

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

	function stringOrVoid(value) {
	  return isString(value) ? value : undefined;
	}

	function accessorVideoProperty(property) {
	  return accessor({
	    get: function get(value) {
	      return this.dispatcher.videoConfigReady && this.inited ? this.dom.videoElement[property] : value;
	    },
	    set: function set(value) {
	      if (!this.dispatcher.videoConfigReady) return value;
	      this.dom.videoElement[property] = value;
	      return value;
	    }
	  });
	}

	function accessorVideoAttribute(attribute) {
	  var _ref = isObject$1(attribute) ? attribute : {
	    set: attribute,
	    get: attribute,
	    isBoolean: false
	  },
	      _set = _ref.set,
	      _get = _ref.get,
	      isBoolean$$1 = _ref.isBoolean;

	  return accessor({
	    get: function get(value) {
	      return this.dispatcher.videoConfigReady && this.inited ? this.dom.videoElement[_get] : value;
	    },
	    set: function set(value) {
	      if (!this.dispatcher.videoConfigReady) return value;
	      var val = isBoolean$$1 ? value ? '' : undefined
	      /* istanbul ignore next */
	      : value === null ? undefined : value;
	      this.dom.setAttr('video', _set, val);
	      return value;
	    }
	  }, {
	    preSet: false
	  });
	}

	function accessorCustomAttribute(attribute, isBoolean$$1) {
	  return accessor({
	    get: function get(value) {
	      var attrValue = this.dom.getAttr('video', attribute);
	      return this.dispatcher.videoConfigReady && this.inited ? isBoolean$$1 ? !!attrValue : attrValue : value;
	    },
	    set: function set(value) {
	      if (!this.dispatcher.videoConfigReady) return value;
	      var val = isBoolean$$1 ? value || undefined : value === null ? undefined : value;
	      this.dom.setAttr('video', attribute, val);
	      return value;
	    }
	  });
	}

	function accessorWidthAndHeight(property) {
	  return accessor({
	    get: function get(value) {
	      if (!this.dispatcher.videoConfigReady || !this.inited) return value;
	      var attr = this.dom.getAttr('video', property);
	      var prop = this.dom.videoElement[property];
	      if (isNumeric(attr) && isNumber(prop)) return prop;
	      return attr || undefined;
	    },
	    set: function set(value) {
	      if (!this.dispatcher.videoConfigReady) return value;
	      var val = void 0;
	      if (value === undefined || isNumber(value)) {
	        val = value;
	      } else if (isString(value) && !_Number$isNaN(parseFloat(value))) {
	        val = value;
	      }
	      this.dom.setAttr('video', property, val);
	      return val;
	    }
	  });
	}

	var accessorMap = {
	  src: [string$1(), accessor({
	    set: function set(val) {
	      // must check val !== this.src here
	      // as we will set config.src in the video
	      // the may cause dead lock
	      if (this.dispatcher.readySync && this.autoload && val !== this.src) this.needToLoadSrc = true;
	      return val;
	    }
	  }), accessor({
	    set: function set(val) {
	      if (this.needToLoadSrc) {
	        // unlock it at first, to avoid deadlock
	        this.needToLoadSrc = false;
	        this.dispatcher.binder.emit({
	          name: 'load',
	          target: 'plugin',
	          id: 'dispatcher'
	        }, val);
	      }
	      return val;
	    }
	  }, { preSet: false })],
	  autoload: boolean$1(),
	  autoplay: [boolean$1(), accessorVideoProperty('autoplay')],
	  controls: [boolean$1(), accessorVideoProperty('controls')],
	  width: [accessorWidthAndHeight('width')],
	  height: [accessorWidthAndHeight('height')],
	  crossOrigin: [accessor({ set: stringOrVoid }), accessorVideoAttribute({ set: 'crossorigin', get: 'crossOrigin' })],
	  loop: [boolean$1(), accessorVideoProperty('loop')],
	  defaultMuted: [boolean$1(), accessorVideoAttribute({ get: 'defaultMuted', set: 'muted', isBoolean: true })],
	  muted: [boolean$1(), accessorVideoProperty('muted')],
	  preload: [accessor({
	    set: function set(value) {
	      var options = ['none', 'auto', 'metadata', ''];
	      return options.indexOf(value) > -1 ? value : 'none';
	    }
	  }, {
	    preSet: true
	  }), accessorVideoAttribute('preload')],
	  poster: [
	  // 因为如果在 video 上随便加一个字符串，他会将其拼接到地址上，所以这里要避免
	  // 单元测试无法检测
	  string$1(), accessor({
	    get: function get(value) {
	      return this.dispatcher.videoConfigReady && this.inited ? this.dom.videoElement.poster : value;
	    },
	    set: function set(value) {
	      if (!this.dispatcher.videoConfigReady) return value;
	      if (value.length) this.dom.setAttr('video', 'poster', value);
	      return value;
	    }
	  })],
	  playsInline: [accessor({
	    get: function get(value) {
	      var playsInline = this.dom.videoElement.playsInline;
	      return this.dispatcher.videoConfigReady && this.inited ? playsInline === undefined ? value : playsInline : value;
	    },
	    set: function set(value) {
	      if (!this.dispatcher.videoConfigReady) return value;
	      this.dom.videoElement.playsInline = value;
	      var val = value ? '' : undefined;
	      this.dom.setAttr('video', 'playsinline', val);
	      this.dom.setAttr('video', 'webkit-playsinline', val);
	      this.dom.setAttr('video', 'x5-playsinline', val);
	      return value;
	    }
	  }), boolean$1()],
	  x5VideoPlayerFullscreen: [accessor({
	    set: function set(value) {
	      return !!value;
	    },
	    get: function get(value) {
	      return !!value;
	    }
	  }), accessorCustomAttribute('x5-video-player-fullscreen', true)],
	  x5VideoOrientation: [accessor({ set: stringOrVoid }), accessorCustomAttribute('x5-video-orientation')],
	  x5VideoPlayerType: [accessor({
	    set: function set(value) {
	      if (!this.dispatcher.videoConfigReady) return value;
	      var val = value === 'h5' ? 'h5' : undefined;
	      this.dom.setAttr('video', 'x5-video-player-type', val);
	      return value;
	    },
	    get: function get() {
	      return this.dom.getAttr('video', 'x5-video-player-type') ? 'h5' : undefined;
	    }
	  })],
	  xWebkitAirplay: [accessor({
	    set: function set(value) {
	      return !!value;
	    },
	    get: function get(value) {
	      return !!value;
	    }
	  }), accessorCustomAttribute('x-webkit-airplay', true)],
	  playbackRate: [number$1(1), accessorVideoProperty('playbackRate')],
	  defaultPlaybackRate: [accessorVideoProperty('defaultPlaybackRate'), number$1(1)],
	  disableRemotePlayback: [boolean$1(), accessorVideoProperty('disableRemotePlayback')],
	  volume: [number$1(1), accessorVideoProperty('volume')]
	};

	var VideoConfig = (_dec = boolean(), _dec2 = string(function (str) {
	  return str.toLocaleLowerCase();
	}), (_class = function () {

	  // 转为供 kernel 使用的内部参数
	  function VideoConfig(dispatcher, config) {
	    _classCallCheck(this, VideoConfig);

	    _initDefineProp(this, 'needToLoadSrc', _descriptor, this);

	    _initDefineProp(this, 'changeWatchable', _descriptor2, this);

	    _initDefineProp(this, 'inited', _descriptor3, this);

	    this.src = '';

	    _initDefineProp(this, 'isLive', _descriptor4, this);

	    _initDefineProp(this, 'box', _descriptor5, this);

	    this.preset = {};
	    this.presetConfig = {};
	    this.autoload = true;
	    this.autoplay = false;
	    this.controls = false;
	    this.width = '100%';
	    this.height = '100%';
	    this.crossOrigin = undefined;
	    this.loop = false;
	    this.defaultMuted = false;
	    this.muted = false;
	    this.preload = 'auto';
	    this.poster = undefined;
	    this.playsInline = false;
	    this.x5VideoPlayerFullscreen = false;
	    this.x5VideoOrientation = undefined;
	    this.x5VideoPlayerType = undefined;
	    this.xWebkitAirplay = false;
	    this.playbackRate = 1;
	    this.defaultPlaybackRate = 1;
	    this.disableRemotePlayback = false;
	    this.volume = 1;

	    _initDefineProp(this, '_kernelProperty', _descriptor6, this);

	    _initDefineProp(this, '_realDomAttr', _descriptor7, this);

	    applyDecorators(this, accessorMap, { self: true });
	    Object.defineProperty(this, 'dispatcher', {
	      value: dispatcher,
	      enumerable: false,
	      writable: false,
	      configurable: false
	    });
	    Object.defineProperty(this, 'dom', {
	      value: dispatcher.dom,
	      enumerable: false,
	      writable: false,
	      configurable: false
	    });
	    deepAssign(this, config);
	  }

	  // 此处 box 只能置空，因为 kernel 会自动根据你的安装 kernel 和相关地址作智能判断。
	  // 曾经 bug 详见 https://github.com/Chimeejs/chimee-kernel/issues/1

	  // kernels 不在 videoConfig 上设置默认值，防止判断出错


	  _createClass(VideoConfig, [{
	    key: 'init',
	    value: function init() {
	      var _this = this;

	      this._realDomAttr.forEach(function (key) {
	        // $FlowFixMe: we have check the computed here
	        _this[key] = _this[key];
	      });
	      this.inited = true;
	    }
	  }]);

	  return VideoConfig;
	}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'needToLoadSrc', [nonenumerable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return false;
	  }
	}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'changeWatchable', [nonenumerable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return true;
	  }
	}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'inited', [nonenumerable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return false;
	  }
	}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'isLive', [_dec, nonconfigurable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return false;
	  }
	}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'box', [_dec2, nonconfigurable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return '';
	  }
	}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, '_kernelProperty', [frozen], {
	  enumerable: true,
	  initializer: function initializer() {
	    return ['isLive', 'box', 'preset', 'kernels', 'presetConfig'];
	  }
	}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, '_realDomAttr', [frozen], {
	  enumerable: true,
	  initializer: function initializer() {
	    return ['src', 'controls', 'width', 'height', 'crossOrigin', 'loop', 'muted', 'preload', 'poster', 'autoplay', 'playsInline', 'x5VideoPlayerFullscreen', 'x5VideoOrientation', 'xWebkitAirplay', 'playbackRate', 'defaultPlaybackRate', 'autoload', 'disableRemotePlayback', 'defaultMuted', 'volume', 'x5VideoPlayerType'];
	  }
	})), _class));

	var _dec$1, _dec2$1, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _class$1, _class2;

	function _applyDecoratedDescriptor$1(target, property, decorators, descriptor, context) {
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
	function propertyAccessibilityWarn(property) {
	  /* istanbul ignore else  */
	  Log.warn('chimee', 'You are trying to obtain ' + property + ', we will return you the DOM node. It\'s not a good idea to handle this by yourself. If you have some requirement, you can tell use by https://github.com/Chimeejs/chimee/issues');
	}
	var VideoWrapper = (_dec$1 = autobindClass(), _dec2$1 = alias('silentLoad'), _dec3 = alias('fullScreen'), _dec4 = alias('$fullScreen'), _dec5 = alias('fullscreen'), _dec6 = alias('emit'), _dec7 = alias('emitSync'), _dec8 = alias('on'), _dec9 = alias('addEventListener'), _dec10 = before(eventBinderCheck), _dec11 = alias('off'), _dec12 = alias('removeEventListener'), _dec13 = before(eventBinderCheck), _dec14 = alias('once'), _dec15 = before(eventBinderCheck), _dec16 = alias('css'), _dec17 = before(attrAndStyleCheck), _dec18 = alias('attr'), _dec19 = before(attrAndStyleCheck), _dec$1(_class$1 = (_class2 = function () {
	  function VideoWrapper() {
	    _classCallCheck(this, VideoWrapper);

	    this.__events = {};
	    this.__unwatchHandlers = [];
	  }

	  _createClass(VideoWrapper, [{
	    key: '__wrapAsVideo',
	    value: function __wrapAsVideo(videoConfig) {
	      var _this = this;

	      // bind video read only properties on instance, so that you can get info like buffered
	      videoReadOnlyProperties.forEach(function (key) {
	        _Object$defineProperty(_this, key, {
	          get: function get() {
	            return this.__dispatcher.dom.videoElement[key];
	          },

	          set: undefined,
	          configurable: false,
	          enumerable: false
	        });
	      });
	      // bind videoMethods like canplaytype on instance
	      videoMethods.forEach(function (key) {
	        _Object$defineProperty(_this, key, {
	          get: function get() {
	            var video = this.__dispatcher.dom.videoElement;
	            return bind(video[key], video);
	          },

	          set: undefined,
	          configurable: false,
	          enumerable: false
	        });
	      });
	      // bind video config properties on instance, so that you can just set src by this
	      var props = videoConfig._realDomAttr.concat(videoConfig._kernelProperty).reduce(function (props, key) {
	        props[key] = [accessor({
	          get: function get() {
	            // $FlowFixMe: support computed key here
	            return videoConfig[key];
	          },
	          set: function set(value) {
	            // $FlowFixMe: support computed key here
	            videoConfig[key] = value;
	            return value;
	          }
	        }), nonenumerable];
	        return props;
	      }, {});
	      applyDecorators(this, props, { self: true });
	      kernelMethods.forEach(function (key) {
	        _Object$defineProperty(_this, key, {
	          value: function value() {
	            var _this2 = this;

	            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	              args[_key] = arguments[_key];
	            }

	            return new _Promise(function (resolve) {
	              var _dispatcher$binder;

	              var id = _this2.__id;
	              _this2.__dispatcher.binder.once({
	                id: id,
	                name: '_' + key,
	                fn: resolve
	              });
	              (_dispatcher$binder = _this2.__dispatcher.binder)[/^(seek)$/.test(key) ? 'emitSync' : 'emit'].apply(_dispatcher$binder, [{
	                target: 'video',
	                name: key,
	                id: id
	              }].concat(_toConsumableArray(args)));
	            });
	          },

	          configurable: true,
	          enumerable: false,
	          writable: true
	        });
	      });
	      domMethods.forEach(function (key) {
	        if (key === 'fullscreen') return;
	        _Object$defineProperty(_this, key, {
	          value: function value() {
	            var _dispatcher$dom;

	            return (_dispatcher$dom = this.__dispatcher.dom)[key].apply(_dispatcher$dom, arguments);
	          },

	          configurable: true,
	          enumerable: false,
	          writable: true
	        });
	      });
	    }
	  }, {
	    key: '$watch',
	    value: function $watch(key, handler) {
	      var _this3 = this;

	      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	          deep = _ref.deep,
	          _ref$diff = _ref.diff,
	          diff = _ref$diff === undefined ? true : _ref$diff,
	          other = _ref.other,
	          _ref$proxy = _ref.proxy,
	          proxy = _ref$proxy === undefined ? false : _ref$proxy;

	      if (!isString(key) && !isArray$1(key)) throw new TypeError('$watch only accept string and Array<string> as key to find the target to spy on, but not ' + key + ', whose type is ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)));
	      var watching = true;
	      var watcher = function watcher() {
	        if (watching && (!(this instanceof VideoConfig) || this.dispatcher.changeWatchable)) bind(handler, this).apply(undefined, arguments);
	      };
	      var unwatcher = function unwatcher() {
	        watching = false;
	        var index = _this3.__unwatchHandlers.indexOf(unwatcher);
	        if (index > -1) _this3.__unwatchHandlers.splice(index, 1);
	      };
	      var keys = isString(key) ? key.split('.') : key;
	      var property = keys.pop();
	      var videoConfig = this.__dispatcher.videoConfig;
	      var target = keys.length === 0 && !other && videoConfig._realDomAttr.indexOf(property) > -1 ? videoConfig : ['isFullscreen', 'fullscreenElement'].indexOf(property) > -1 ? this.__dispatcher.dom : getDeepProperty(other || this, keys, { throwError: true });
	      applyDecorators(target, _defineProperty$1({}, property, watch(watcher, { deep: deep, diff: diff, proxy: proxy })), { self: true });
	      this.__unwatchHandlers.push(unwatcher);
	      return unwatcher;
	    }
	  }, {
	    key: '$set',
	    value: function $set(obj, property, value) {
	      if (!isObject$1(obj) && !isArray$1(obj)) throw new TypeError('$set only support Array or Object, but not ' + obj + ', whose type is ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
	      // $FlowFixMe: we have custom this function
	      if (!isFunction(obj.__set)) {
	        /* istanbul ignore else  */
	        Log.warn('chimee', _JSON$stringify(obj) + ' has not been deep watch. There is no need to use $set.');
	        // $FlowFixMe: we support computed string on array here
	        obj[property] = value;
	        return;
	      }
	      obj.__set(property, value);
	    }
	  }, {
	    key: '$del',
	    value: function $del(obj, property) {
	      if (!isObject$1(obj) && !isArray$1(obj)) throw new TypeError('$del only support Array or Object, but not ' + obj + ', whose type is ' + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)));
	      // $FlowFixMe: we have custom this function
	      if (!isFunction(obj.__del)) {
	        /* istanbul ignore else  */
	        Log.warn('chimee', _JSON$stringify(obj) + ' has not been deep watch. There is no need to use $del.');
	        // $FlowFixMe: we support computed string on array here
	        delete obj[property];
	        return;
	      }
	      obj.__del(property);
	    }
	  }, {
	    key: 'load',
	    value: function load() {
	      var _this4 = this;

	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      return new _Promise(function (resolve) {
	        var _dispatcher$binder2;

	        _this4.__dispatcher.binder.once({
	          id: _this4.__id,
	          name: '_load',
	          target: 'plugin',
	          fn: resolve
	        });
	        (_dispatcher$binder2 = _this4.__dispatcher.binder).emit.apply(_dispatcher$binder2, [{
	          name: 'load',
	          target: 'plugin',
	          id: _this4.__id
	        }].concat(args));
	      });
	    }
	  }, {
	    key: '$silentLoad',
	    value: function $silentLoad() {
	      var _this5 = this;

	      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      return this.__dispatcher.binder.emit({
	        name: 'silentLoad',
	        target: 'video',
	        id: this.__id
	      }).then(function () {
	        var _dispatcher;

	        return (_dispatcher = _this5.__dispatcher).silentLoad.apply(_dispatcher, args);
	      }).then(function (result) {
	        _this5.__dispatcher.binder.trigger({
	          name: 'silentLoad',
	          target: 'video',
	          id: _this5.__id
	        }, result);
	      });
	    }

	    /**
	     * call fullscreen api on some specific element
	     * @param {boolean} flag true means fullscreen and means exit fullscreen
	     * @param {string} element the element you want to fullscreen, default it's container, you can choose from video | container | wrapper
	     */

	  }, {
	    key: '$fullscreen',
	    value: function $fullscreen() {
	      var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'container';

	      if (!this.__dispatcher.binder.emitSync({
	        name: 'fullscreen',
	        id: this.__id,
	        target: 'video-dom'
	      }, flag, element)) return false;
	      var result = this.__dispatcher.dom.fullscreen(flag, element);
	      this.__dispatcher.binder.triggerSync({
	        name: 'fullscreen',
	        id: this.__id,
	        target: 'video-dom'
	      }, flag, element);
	      return result;
	    }

	    /**
	     * emit an event
	     * @param  {string}    key event's name
	     * @param  {...args} args
	     */

	  }, {
	    key: '$emit',
	    value: function $emit(key) {
	      var _dispatcher$binder3;

	      var target = void 0;
	      if (isObject$1(key) && isString(key.name) && isString(key.target)) {
	        target = key.target;
	        key = key.name;
	      }
	      if (!isString(key)) throw new TypeError('emit key parameter must be String');
	      /* istanbul ignore else  */
	      if (domEvents.indexOf(key.replace(/^\w_/, '')) > -1) {
	        Log.warn('plugin', 'You are try to emit ' + key + ' event. As emit is wrapped in Promise. It make you can\'t use event.preventDefault and event.stopPropagation. So we advice you to use emitSync');
	      }

	      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	        args[_key4 - 1] = arguments[_key4];
	      }

	      (_dispatcher$binder3 = this.__dispatcher.binder).emit.apply(_dispatcher$binder3, [{
	        name: key,
	        id: this.__id,
	        target: target
	      }].concat(_toConsumableArray(args)));
	    }

	    /**
	     * emit a sync event
	     * @param  {string}    key event's name
	     * @param  {...args} args
	     */

	  }, {
	    key: '$emitSync',
	    value: function $emitSync(key) {
	      var _dispatcher$binder4;

	      var target = void 0;
	      if (isObject$1(key) && isString(key.name) && isString(key.target)) {
	        target = key.target;
	        key = key.name;
	      }
	      if (!isString(key)) throw new TypeError('emitSync key parameter must be String');

	      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	        args[_key5 - 1] = arguments[_key5];
	      }

	      return (_dispatcher$binder4 = this.__dispatcher.binder).emitSync.apply(_dispatcher$binder4, [{
	        name: key,
	        id: this.__id,
	        target: target
	      }].concat(_toConsumableArray(args)));
	    }

	    /**
	     * bind event handler through this function
	     * @param  {string} key event's name
	     * @param  {Function} fn event's handler
	     */

	  }, {
	    key: '$on',
	    value: function $on(key, fn) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var eventInfo = _Object$assign({}, options, {
	        name: key,
	        id: this.__id,
	        fn: fn
	      });
	      this.__dispatcher.binder.on(eventInfo);
	      // set on __events as mark so that i can destroy it when i destroy
	      this.__addEvents(key, fn);
	    }
	    /**
	     * remove event handler through this function
	     * @param  {string} key event's name
	     * @param  {Function} fn event's handler
	     */

	  }, {
	    key: '$off',
	    value: function $off(key, fn) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var eventInfo = _Object$assign({}, options, {
	        name: key,
	        id: this.__id,
	        fn: fn
	      });
	      this.__dispatcher.binder.off(eventInfo);
	      this.__removeEvents(key, fn);
	    }
	    /**
	     * bind one time event handler
	     * @param {string} key event's name
	     * @param {Function} fn event's handler
	     */

	  }, {
	    key: '$once',
	    value: function $once(key, fn) {
	      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      var self = this;
	      var boundFn = function boundFn() {
	        bind(fn, this).apply(undefined, arguments);
	        self.__removeEvents(key, boundFn);
	      };
	      self.__addEvents(key, boundFn);
	      var eventInfo = _Object$assign({}, options, {
	        name: key,
	        id: this.__id,
	        fn: boundFn
	      });
	      this.__dispatcher.binder.once(eventInfo);
	    }

	    /**
	     * set style
	     * @param {string} element optional, default to be video, you can choose from video | container | wrapper
	     * @param {string} attribute the atrribue name
	     * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
	     */

	  }, {
	    key: '$css',
	    value: function $css(method) {
	      var _dispatcher$dom2;

	      for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
	        args[_key6 - 1] = arguments[_key6];
	      }

	      return (_dispatcher$dom2 = this.__dispatcher.dom)[method + 'Style'].apply(_dispatcher$dom2, args);
	    }

	    /**
	     * set attr
	     * @param {string} element optional, default to be video, you can choose from video | container | wrapper
	     * @param {string} attribute the atrribue nameß
	     * @param {any} value optional, when it's no offer, we consider you want to get the attribute's value. When it's offered, we consider you to set the attribute's value, if the value you passed is undefined, that means you want to remove the value;
	     */

	  }, {
	    key: '$attr',
	    value: function $attr(method) {
	      var _dispatcher$dom3;

	      for (var _len7 = arguments.length, args = Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
	        args[_key7 - 1] = arguments[_key7];
	      }

	      if (method === 'set' && /video/.test(args[0])) {
	        if (!this.__dispatcher.videoConfigReady) {
	          /* istanbul ignore else  */
	          Log.warn('chimee', this.__id + ' is tring to set attribute on video before video inited. Please wait until the inited event has benn trigger');
	          return args[2];
	        }
	        if (this.__dispatcher.videoConfig._realDomAttr.indexOf(args[1]) > -1) {
	          var key = args[1],
	              val = args[2];

	          this.__dispatcher.videoConfig[key] = val;
	          return val;
	        }
	      }
	      return (_dispatcher$dom3 = this.__dispatcher.dom)[method + 'Attr'].apply(_dispatcher$dom3, args);
	    }
	  }, {
	    key: '__addEvents',
	    value: function __addEvents(key, fn) {
	      this.__events[key] = this.__events[key] || [];
	      this.__events[key].push(fn);
	    }
	  }, {
	    key: '__removeEvents',
	    value: function __removeEvents(key, fn) {
	      if (isEmpty(this.__events[key])) return;
	      var index = this.__events[key].indexOf(fn);
	      if (index < 0) return;
	      this.__events[key].splice(index, 1);
	      if (isEmpty(this.__events[key])) delete this.__events[key];
	    }
	  }, {
	    key: '__destroy',
	    value: function __destroy() {
	      var _this6 = this;

	      this.__unwatchHandlers.forEach(function (unwatcher) {
	        return unwatcher();
	      });
	      _Object$keys(this.__events).forEach(function (key) {
	        if (!isArray$1(_this6.__events[key])) return;
	        _this6.__events[key].forEach(function (fn) {
	          return _this6.$off(key, fn);
	        });
	      });
	      delete this.__events;
	    }
	  }, {
	    key: 'currentTime',
	    get: function get() {
	      return this.__dispatcher.kernel.currentTime;
	    },
	    set: function set(second) {
	      this.__dispatcher.binder.emitSync({
	        name: 'seek',
	        target: 'video',
	        id: this.__id
	      }, second);
	    }
	  }, {
	    key: '$plugins',
	    get: function get() {
	      return this.__dispatcher.plugins;
	    }
	  }, {
	    key: '$pluginOrder',
	    get: function get() {
	      return this.__dispatcher.order;
	    }
	  }, {
	    key: '$wrapper',
	    get: function get() {
	      propertyAccessibilityWarn('wrapper');
	      return this.__dispatcher.dom.wrapper;
	    }
	  }, {
	    key: '$container',
	    get: function get() {
	      propertyAccessibilityWarn('container');
	      return this.__dispatcher.dom.container;
	    }
	  }, {
	    key: '$video',
	    get: function get() {
	      propertyAccessibilityWarn('video');
	      return this.__dispatcher.dom.videoElement;
	    }
	  }, {
	    key: 'isFullscreen',
	    get: function get() {
	      return this.__dispatcher.dom.isFullscreen;
	    }
	  }, {
	    key: 'fullscreenElement',
	    get: function get() {
	      return this.__dispatcher.dom.fullscreenElement;
	    }
	  }, {
	    key: 'container',
	    get: function get() {
	      return this.__dispatcher.containerConfig;
	    },
	    set: function set(config) {
	      if (!isObject$1(config)) {
	        throw new Error('The config of container must be Object, but not ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)) + '.');
	      }
	      deepAssign(this.__dispatcher.containerConfig, config);
	      return this.__dispatcher.container;
	    }
	  }]);

	  return VideoWrapper;
	}(), (_applyDecoratedDescriptor$1(_class2.prototype, '$silentLoad', [_dec2$1], _Object$getOwnPropertyDescriptor(_class2.prototype, '$silentLoad'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$fullscreen', [_dec3, _dec4, _dec5], _Object$getOwnPropertyDescriptor(_class2.prototype, '$fullscreen'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$emit', [_dec6], _Object$getOwnPropertyDescriptor(_class2.prototype, '$emit'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$emitSync', [_dec7], _Object$getOwnPropertyDescriptor(_class2.prototype, '$emitSync'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$on', [_dec8, _dec9, _dec10], _Object$getOwnPropertyDescriptor(_class2.prototype, '$on'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$off', [_dec11, _dec12, _dec13], _Object$getOwnPropertyDescriptor(_class2.prototype, '$off'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$once', [_dec14, _dec15], _Object$getOwnPropertyDescriptor(_class2.prototype, '$once'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$css', [_dec16, _dec17], _Object$getOwnPropertyDescriptor(_class2.prototype, '$css'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$attr', [_dec18, _dec19], _Object$getOwnPropertyDescriptor(_class2.prototype, '$attr'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$plugins', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2.prototype, '$plugins'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$pluginOrder', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2.prototype, '$pluginOrder'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$wrapper', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2.prototype, '$wrapper'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$container', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2.prototype, '$container'), _class2.prototype), _applyDecoratedDescriptor$1(_class2.prototype, '$video', [nonenumerable], _Object$getOwnPropertyDescriptor(_class2.prototype, '$video'), _class2.prototype)), _class2)) || _class$1);

	var _dec$2, _class$2;

	/**
	 * <pre>
	 * Plugin is the class for plugin developer.
	 * When we use a plugin, we will generate an instance of plugin.
	 * Developer can do most of things base on this plugin
	 * </pre>
	 */
	var Plugin = (_dec$2 = autobindClass(), _dec$2(_class$2 = function (_VideoWrapper) {
	  _inherits(Plugin, _VideoWrapper);

	  /**
	   * <pre>
	   * to create a plugin, we need three parameter
	   * 1. the config of a plugin
	   * 2. the dispatcher
	   * 3. this option for plugin to read
	   * this is the plugin base class, which you can get on Chimee
	   * You can just extends it and then install
	   * But in that way you must remember to pass the arguments to super()
	   * </pre>
	   * @param  {string}  PluginConfig.id        camelize from plugin's name or class name.
	   * @param  {string}  PluginConfig.name      plugin's name or class name
	   * @param  {Number}  PluginConfig.level     the level of z-index
	   * @param  {Boolean} PluginConfig.operable  to tell if the plugin can be operable, if not, we will add pointer-events: none on it.
	   * @param  {Function}  PluginConfig.create  the create function which we will called when plugin is used. sth like constructor in object style.
	   * @param  {Function}  PluginConfig.destroy   function to be called when we destroy a plugin
	   * @param  {Object}  PluginConfig.events    You can set some events handler in this object, we will bind it once you use the plugin.
	   * @param  {Object}  PluginConfig.data      dataset we will bind on data in object style
	   * @param  {Object<{get: Function, set: Function}}  PluginConfig.computed  dataset we will handle by getter and setter
	   * @param  {Object<Function>}  PluginConfig.methods   some function we will bind on plugin
	   * @param  {string|HTMLElment}  PluginConfig.el  can be string or HTMLElement, we will use this to create the dom for plugin
	   * @param  {boolean} PluginConfig.penetrate boolean to let us do we need to forward the dom events for this plugin.
	   * @param  {Dispatcher}  dispatcher referrence of dispatcher
	   * @param  {Object}  option  PluginOption that will pass to the plugin
	   * @return {Plugin}  plugin instance
	   */
	  function Plugin() {
	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        id = _ref.id,
	        name = _ref.name,
	        _ref$level = _ref.level,
	        level = _ref$level === undefined ? 0 : _ref$level,
	        _ref$operable = _ref.operable,
	        operable = _ref$operable === undefined ? true : _ref$operable,
	        beforeCreate = _ref.beforeCreate,
	        create = _ref.create,
	        init = _ref.init,
	        inited = _ref.inited,
	        destroy = _ref.destroy,
	        _ref$events = _ref.events,
	        events = _ref$events === undefined ? {} : _ref$events,
	        _ref$data = _ref.data,
	        data = _ref$data === undefined ? {} : _ref$data,
	        _ref$computed = _ref.computed,
	        computed = _ref$computed === undefined ? {} : _ref$computed,
	        _ref$methods = _ref.methods,
	        methods = _ref$methods === undefined ? {} : _ref$methods,
	        el = _ref.el,
	        _ref$penetrate = _ref.penetrate,
	        penetrate = _ref$penetrate === undefined ? false : _ref$penetrate,
	        _ref$inner = _ref.inner,
	        inner = _ref$inner === undefined ? true : _ref$inner,
	        autoFocus = _ref.autoFocus,
	        className = _ref.className;

	    var dispatcher = arguments[1];
	    var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { name: name };

	    _classCallCheck(this, Plugin);

	    var _this = _possibleConstructorReturn(this, (Plugin.__proto__ || _Object$getPrototypeOf(Plugin)).call(this));

	    _this.destroyed = false;
	    _this.VERSION = '0.10.0-alpha.3';
	    _this.__operable = true;
	    _this.__level = 0;

	    if (isEmpty(dispatcher)) {
	      /* istanbul ignore else  */
	      Log.error('Dispatcher.plugin', 'lack of dispatcher. Do you forget to pass arguments to super in plugin?');
	      throw new TypeError('lack of dispatcher');
	    }
	    if (!isString(id)) {
	      throw new TypeError('id of PluginConfig must be string');
	    }
	    _this.__id = id;
	    _this.__dispatcher = dispatcher;
	    _this.$videoConfig = _this.__dispatcher.videoConfig;
	    _this.__wrapAsVideo(_this.$videoConfig);
	    _this.beforeCreate = _this.beforeCreate || beforeCreate;
	    try {
	      isFunction(_this.beforeCreate) && _this.beforeCreate({
	        events: events,
	        data: data,
	        computed: computed,
	        methods: methods
	      }, option);
	    } catch (error) {
	      _this.$throwError(error);
	    }
	    // bind plugin methods into instance
	    if (!isEmpty(methods) && isObject$1(methods)) {
	      _Object$keys(methods).forEach(function (key) {
	        var fn = methods[key];
	        if (!isFunction(fn)) throw new TypeError('plugins methods must be Function');
	        _Object$defineProperty(_this, key, {
	          value: bind(fn, _this),
	          writable: true,
	          enumerable: false,
	          configurable: true
	        });
	      });
	    }
	    // hook plugin events on bus
	    if (!isEmpty(events) && isObject$1(events)) {
	      _Object$keys(events).forEach(function (key) {
	        if (!isFunction(events[key])) throw new TypeError('plugins events hook must bind with Function');
	        _this.$on(key, events[key]);
	      });
	    }
	    // bind data into plugin instance
	    if (!isEmpty(data) && isObject$1(data)) {
	      deepAssign(_this, data);
	    }
	    // set the computed member by getter and setter
	    if (!isEmpty(computed) && isObject$1(computed)) {
	      var props = _Object$keys(computed).reduce(function (props, key) {
	        var val = computed[key];
	        if (isFunction(val)) {
	          props[key] = accessor({ get: val });
	          return props;
	        }
	        if (isObject$1(val) && (isFunction(val.get) || isFunction(val.set))) {
	          props[key] = accessor(val);
	          return props;
	        }
	        /* istanbul ignore else  */
	        Log.warn('Dispatcher.plugin', 'Wrong computed member \'' + key + '\' defination in Plugin ' + name);
	        return props;
	      }, {});
	      applyDecorators(_this, props, { self: true });
	    }
	    /**
	     * the create Function of plugin
	     * @type {Function}
	     */
	    _this.create = _this.create || create;
	    /**
	     * this init Function of plugin
	     * which will be called when we start to create the video player
	     * the plugin can handle some config here
	     * @type {Function}
	     */
	    _this.init = _this.init || init;
	    /**
	     * this inited Function of plugin
	     * which will be called when we have created the video player
	     * @type {Function}
	     */
	    _this.inited = _this.inited || inited;
	    /**
	     * the destroy Function of plugin
	     * @type {Function}
	     */
	    _this.destroy = _this.destroy || destroy;
	    /**
	     * the dom node of whole plugin
	     * @type {HTMLElement}
	     */
	    _this.$dom = _this.__dispatcher.dom.insertPlugin(_this.__id, el, { penetrate: penetrate, inner: inner, autoFocus: autoFocus, className: className });
	    // now we can frozen inner, autoFocus and penetrate
	    _this.$inner = inner;
	    _this.$autoFocus = autoFocus;
	    _this.$penetrate = penetrate;
	    applyDecorators(_this, {
	      $inner: frozen,
	      $autoFocus: frozen,
	      $penetrate: frozen
	    }, { self: true });
	    /**
	     * to tell us if the plugin can be operable, can be dynamic change
	     * @type {boolean}
	     */
	    _this.$operable = isBoolean(option.operable) ? option.operable : operable;
	    _this.__level = isInteger$3(option.level) ? option.level : level;
	    /**
	     * pluginOption, so it's easy for plugin developer to check the config
	     * @type {Object}
	     */
	    _this.$config = option;
	    try {
	      isFunction(_this.create) && _this.create();
	    } catch (error) {
	      _this.$throwError(error);
	    }
	    return _this;
	  }
	  /**
	   * call for init lifecycle hook, which mainly handle the original config of video and kernel.
	   * @param {VideoConfig} videoConfig the original config of the videoElement or Kernel
	   */


	  _createClass(Plugin, [{
	    key: '__init',
	    value: function __init(videoConfig) {
	      try {
	        isFunction(this.init) && this.init(videoConfig);
	      } catch (error) {
	        this.$throwError(error);
	      }
	    }
	    /**
	     * call for inited lifecycle hook, which just to tell the plugin we have inited.
	     */

	  }, {
	    key: '__inited',
	    value: function __inited() {
	      var _this2 = this;

	      var result = void 0;
	      try {
	        result = isFunction(this.inited) && this.inited();
	      } catch (error) {
	        this.$throwError(error);
	      }
	      this.readySync = !isPromise(result);
	      this.ready = this.readySync ? _Promise.resolve(this)
	      // $FlowFixMe: it's promise now
	      : result.then(function () {
	        _this2.readySync = true;
	        return _this2;
	      }).catch(function (error) {
	        if (isError(error)) return _this2.$throwError(error);
	        return _Promise.reject(error);
	      });
	      return this.readySync ? this : this.ready;
	    }

	    /**
	     * set the plugin to be the top of all plugins
	     */

	  }, {
	    key: '$bumpToTop',
	    value: function $bumpToTop() {
	      var topLevel = this.__dispatcher._getTopLevel(this.$inner);
	      this.$level = topLevel + 1;
	    }
	  }, {
	    key: '$throwError',
	    value: function $throwError(error) {
	      this.__dispatcher.throwError(error);
	    }
	    /**
	     * officail destroy function for plugin
	     * we will call user destory function in this method
	     */

	  }, {
	    key: '$destroy',
	    value: function $destroy() {
	      if (this.destroyed) return;
	      isFunction(this.destroy) && this.destroy();
	      _get(Plugin.prototype.__proto__ || _Object$getPrototypeOf(Plugin.prototype), '__destroy', this).call(this);
	      this.__dispatcher.dom.removePlugin(this.__id);
	      delete this.__dispatcher;
	      delete this.$dom;
	      this.destroyed = true;
	    }
	    /**
	     * to tell us if the plugin can be operable, can be dynamic change
	     * @type {boolean}
	     */

	  }, {
	    key: '$operable',
	    set: function set(val) {
	      if (!isBoolean(val)) return;
	      this.$dom.style.pointerEvents = val ? 'auto' : 'none';
	      this.__operable = val;
	    },
	    get: function get$$1() {
	      return this.__operable;
	    }
	    /**
	     * the z-index level, higher when you set higher
	     * @type {boolean}
	     */

	  }, {
	    key: '$level',
	    set: function set(val) {
	      if (!isInteger$3(val)) return;
	      this.__level = val;
	      this.__dispatcher._sortZIndex();
	    },
	    get: function get$$1() {
	      return this.__level;
	    }
	  }]);

	  return Plugin;
	}(VideoWrapper)) || _class$2);

	var VENDOR_PREFIXES = ['', 'o', 'ms', 'moz', 'webkit', 'webkitCurrent'];

	var SYNONYMS = [['', ''], // empty
	['exit', 'cancel'], // firefox & old webkits expect cancelFullScreen instead of exitFullscreen
	['screen', 'Screen']];

	var DESKTOP_FULLSCREEN_STYLE = {
	  position: 'fixed',
	  zIndex: '2147483647',
	  left: 0,
	  top: 0,
	  right: 0,
	  bottom: 0,
	  overflow: 'hidden',
	  width: '100%',
	  height: '100%'
	};

	var FULLSCREEN_CHANGE = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'];

	var FULLSCREEN_ERROR = ['fullscreenerror', 'webkitfullscreenerror', 'mozfullscreenerror', 'MSFullscreenError'];

	var supportDocument = typeof document !== 'undefined';

	function setStyle$1(el, key, val) {
	  if (isObject$1(key)) {
	    for (var k in key) {
	      setStyle$1(el, k, key[k]);
	    }
	  } else {
	    // $FlowFixMe: we found it
	    el.style[key] = val;
	  }
	}

	function native(target, name) {
	  var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  if (isObject$1(name)) {
	    option = name;
	  }
	  if (isString(target)) {
	    name = target;
	  }
	  var _option = option,
	      _option$keyOnly = _option.keyOnly,
	      keyOnly = _option$keyOnly === undefined ? false : _option$keyOnly;
	  /* istanbul ignore if */

	  if (!supportDocument) {
	    return keyOnly ? '' : undefined;
	  }
	  if (!isElement(target)) {
	    target = document;
	  }
	  if (!isString(name)) throw new Error('You must pass in a string as name, but not ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)) + '.');
	  for (var i = 0; i < SYNONYMS.length; i++) {
	    name = name.replace(SYNONYMS[i][0], SYNONYMS[i][1]);
	    for (var j = 0; j < VENDOR_PREFIXES.length; j++) {
	      var prefixed = j === 0 ? name : VENDOR_PREFIXES[j] + name.charAt(0).toUpperCase() + name.substr(1);
	      // $FlowFixMe: we support document computed property here
	      if (target[prefixed] !== undefined) return keyOnly ? prefixed : target[prefixed];
	    }
	  }
	  return keyOnly ? '' : undefined;
	}

	function dispatchEvent(element, name) {
	  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
	      _ref$bubbles = _ref.bubbles,
	      bubbles = _ref$bubbles === undefined ? true : _ref$bubbles,
	      _ref$cancelable = _ref.cancelable,
	      cancelable = _ref$cancelable === undefined ? true : _ref$cancelable;

	  var event = void 0;
	  /* istanbul ignore else  */
	  if (isFunction(Event)) {
	    event = new Event(name, {
	      bubbles: bubbles,
	      cancelable: cancelable
	    });
	  } else if (supportDocument && document.createEvent) {
	    event = document.createEvent('HTMLEvents');
	    event.initEvent(name, true, true);
	  } else if (supportDocument && document.createEventObject) {
	    // $FlowFixMe: IE < 9
	    event = document.createEventObject();
	    event.eventType = name;
	    event.eventName = name;
	  }
	  /* istanbul ignore next  */
	  if (!isObject$1(event) && !isEvent(event)) throw new Error("We can't create an object on this browser, please report to author");
	  /* istanbul ignore else  */
	  if (element.dispatchEvent) {
	    element.dispatchEvent(event);
	    // $FlowFixMe: IE < 9
	  } else if (element.fireEvent) {
	    // $FlowFixMe: IE < 9
	    element.fireEvent('on' + event.eventType, event); // can trigger only real event (e.g. 'click')
	    // $FlowFixMe: support computed key
	  } else if (element[name]) {
	    // $FlowFixMe: support computed key
	    element[name]();
	    // $FlowFixMe: support computed key
	  } else if (element['on' + name]) {
	    // $FlowFixMe: support computed key
	    element['on' + name]();
	  }
	}

	var _dec$3, _dec2$2, _dec3$1, _dec4$1, _dec5$1, _class$3, _class2$1;

	function _applyDecoratedDescriptor$2(target, property, decorators, descriptor, context) {
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
	var fullscreenEnabled = native('fullscreenEnabled');
	var useStyleFirst = false;

	var ESFullScreen = (_dec$3 = autobindClass(), _dec2$2 = alias('requestFullscreen'), _dec3$1 = alias('exitFullscreen'), _dec4$1 = alias('addEventListener'), _dec5$1 = alias('removeEventListener'), _dec$3(_class$3 = (_class2$1 = function () {
	  function ESFullScreen() {
	    _classCallCheck(this, ESFullScreen);

	    this._fullscreenElement = null;
	    this.isNativelySupport = defined$1(native('fullscreenElement')) && (!defined$1(fullscreenEnabled) || fullscreenEnabled === true);
	    this._openKey = supportDocument ? native(document.body || document.documentElement, 'requestFullscreen', { keyOnly: true }) : '';
	    this._exitKey = native('exitFullscreen', { keyOnly: true });
	    this._useStyleFirst = false;
	    this.hasUsedStyle = false;
	  }

	  _createClass(ESFullScreen, [{
	    key: 'open',
	    value: function open(element) {
	      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	          _ref$force = _ref.force,
	          force = _ref$force === undefined ? false : _ref$force;

	      /* istanbul ignore else  */
	      {
	        if (!isElement(element)) throw new Error('You should passed in a legal element to requestFullScreen, but not ' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + '.');
	        if (!isPosterityNode(document, element)) throw new Error('You must pass in a HTML element in document.');
	      }
	      var originElement = this.fullscreenElement;
	      if (originElement && originElement !== element) {
	        if (!force) {
	          dispatchEvent(document, 'fullscreenerror');
	          return false;
	        }
	        this.exit();
	      }

	      if (!this.useStyleFirst) {
	        if (this.isNativelySupport) {
	          // $FlowFixMe: support computed key on HTMLElment here
	          isFunction(element[this._openKey]) && element[this._openKey]();
	          return true;
	        }

	        // add wekitEnterFullscreen support as required in https://github.com/toxic-johann/es-fullscreen/issues/4
	        /* istanbul ignore if  */
	        if (element instanceof HTMLVideoElement && element.webkitSupportsFullscreen &&
	        // $FlowFixMe: support webkitEnterFullscreen on some werid safari
	        isFunction(element.webkitEnterFullscreen)) {
	          element.webkitEnterFullscreen();
	          this._fullscreenElement = element;
	          return true;
	        }
	      }

	      this._savedStyles = _Object$keys(DESKTOP_FULLSCREEN_STYLE).reduce(function (styles, key) {
	        // $FlowFixMe: support string here
	        styles[key] = element.style[key];
	        return styles;
	      }, {});
	      setStyle$1(element, DESKTOP_FULLSCREEN_STYLE);

	      /* istanbul ignore else  */
	      if (document.body) {
	        this._bodyOverflow = document.body.style.overflow;
	        document.body.style.overflow = 'hidden';
	      }
	      /* istanbul ignore else  */
	      if (document.documentElement) {
	        this._htmlOverflow = document.documentElement.style.overflow;
	        document.documentElement.style.overflow = 'hidden';
	      }
	      this._fullscreenElement = element;
	      this.hasUsedStyle = true;
	      dispatchEvent(element, 'fullscreenchange');
	      return true;
	    }
	  }, {
	    key: 'exit',
	    value: function exit() {
	      if (!this.isFullscreen) return false;
	      if (this.isNativelySupport && !this.useStyleFirst && !this.hasUsedStyle) {
	        // $FlowFixMe: support document computed key here
	        document[this._exitKey]();
	        return true;
	      }
	      // $FlowFixMe: element is an Elment here
	      var element = this._fullscreenElement;
	      setStyle$1(element, this._savedStyles);
	      /* istanbul ignore else  */
	      if (document.body) document.body.style.overflow = this._bodyOverflow;
	      /* istanbul ignore else  */
	      if (document.documentElement) document.documentElement.style.overflow = this._htmlOverflow;

	      this._fullscreenElement = null;
	      this._savedStyles = {};
	      dispatchEvent(element, 'fullscreenchange');
	      return true;
	    }
	  }, {
	    key: 'on',
	    value: function on(name, fn) {
	      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

	      this._handleEvent(element, 'addEventListener', name, fn);
	    }
	  }, {
	    key: 'off',
	    value: function off(name, fn) {
	      var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;

	      this._handleEvent(element, 'removeEventListener', name, fn);
	    }
	  }, {
	    key: '_handleEvent',
	    value: function _handleEvent(element, behavior, name, fn) {
	      /* istanbul ignore else  */
	      {
	        if (name !== 'fullscreenchange' && name !== 'fullscreenerror' && name !== 'esfullscreenmethodchange') throw new Error(this.constructor.name + ' only handle "fullscreenchange", "fullscreenerror" and "esfullscreenmethodchange" event, but not ' + name + '. Pleas pass in an right event name.');
	        if (!isFunction(fn)) throw new Error('You must pass in an legal function, but not ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)) + '.');
	        if (!isElement(element) && element !== document) throw new Error('You should passed in a legal element, but not ' + (typeof element === 'undefined' ? 'undefined' : _typeof(element)) + '.');
	      }
	      var names = name === 'fullscreenchange' ? FULLSCREEN_CHANGE : name === 'fullscreenerror' ? FULLSCREEN_ERROR : [name];
	      names.forEach(function (name) {
	        // $FlowFixMe: support computed attribute here
	        element[behavior](name, fn);
	      });
	    }
	  }, {
	    key: 'useStyleFirst',
	    get: function get() {
	      return useStyleFirst;
	    },
	    set: function set(value) {
	      value = !!value;
	      if (value === useStyleFirst) return value;
	      useStyleFirst = value;
	      dispatchEvent(document, 'esfullscreenmethodchange');
	      return value;
	    }
	  }, {
	    key: 'fullscreenElement',
	    get: function get() {
	      var element = ['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement'].reduce(function (element, key) {
	        // $FlowFixMe: support computed element on document
	        return element || document[key];
	      }, null);
	      return element || this._fullscreenElement;
	    }
	  }, {
	    key: 'isFullscreen',
	    get: function get() {
	      return isElement(this.fullscreenElement);
	    }
	  }]);

	  return ESFullScreen;
	}(), _applyDecoratedDescriptor$2(_class2$1.prototype, 'open', [_dec2$2], _Object$getOwnPropertyDescriptor(_class2$1.prototype, 'open'), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, 'exit', [_dec3$1], _Object$getOwnPropertyDescriptor(_class2$1.prototype, 'exit'), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, 'on', [_dec4$1], _Object$getOwnPropertyDescriptor(_class2$1.prototype, 'on'), _class2$1.prototype), _applyDecoratedDescriptor$2(_class2$1.prototype, 'off', [_dec5$1], _Object$getOwnPropertyDescriptor(_class2$1.prototype, 'off'), _class2$1.prototype), _class2$1)) || _class$3);

	var index = new ESFullScreen();

	var _dec$4, _dec2$3, _dec3$2, _dec4$2, _dec5$2, _dec6$1, _class$4;

	function _applyDecoratedDescriptor$3(target, property, decorators, descriptor, context) {
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
	function targetCheck(target) {
	  if (target === 'video') target = 'videoElement';
	  if (!isElement(this[target])) throw new TypeError('Your target "' + target + '" is not a legal HTMLElement');

	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return [target].concat(args);
	}
	function attrOperationCheck(target, attr, val) {
	  if (!isString(attr)) throw new TypeError('to handle dom\'s attribute or style, your attr parameter must be string, but not ' + attr + ' in ' + (typeof attr === 'undefined' ? 'undefined' : _typeof(attr)));
	  if (!isString(target)) throw new TypeError('to handle dom\'s attribute or style, your target parameter must be string, , but not ' + target + ' in ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)));
	  return [target, attr, val];
	}
	/**
	 * <pre>
	 * Dom work for Dispatcher.
	 * It take charge of dom management of Dispatcher.
	 * </pre>
	 */
	var Dom = (_dec$4 = waituntil('__dispatcher.videoConfigReady'), _dec2$3 = before(attrOperationCheck, targetCheck), _dec3$2 = before(attrOperationCheck, targetCheck), _dec4$2 = before(attrOperationCheck, targetCheck), _dec5$2 = before(attrOperationCheck, targetCheck), _dec6$1 = before(targetCheck), (_class$4 = function () {
	  _createClass(Dom, [{
	    key: 'mouseInVideo',

	    /**
	     * to mark is the mouse in the video area
	     */

	    /**
	     * all plugin's dom element set
	     */
	    get: function get() {
	      return this.__mouseInVideo;
	    }
	    /**
	     * the html to restore when we are destroyed
	     */
	    ,
	    set: function set(val) {
	      this.__mouseInVideo = !!val;
	    }
	    /**
	     * collection of video extension nodes
	     * some nodes can be regarded as part of video (such as penetrate element)
	     * so we store them here
	     */

	  }, {
	    key: 'videoExtendedNodes',
	    get: function get() {
	      return this.__videoExtendedNodes;
	    }
	  }]);

	  function Dom(wrapper, dispatcher) {
	    _classCallCheck(this, Dom);

	    this.plugins = {};
	    this.originHTML = '';
	    this.__mouseInVideo = false;
	    this.destroyed = false;
	    this.__videoExtendedNodes = [];
	    this.isFullscreen = false;
	    this.fullscreenElement = undefined;

	    this.__dispatcher = dispatcher;
	    if (!isElement(wrapper) && !isString(wrapper)) throw new TypeError('Wrapper can only be string or HTMLElement, but not ' + (typeof wrapper === 'undefined' ? 'undefined' : _typeof(wrapper)));
	    var $wrapper = $(wrapper);
	    // TODO: we have to decalre length for wrapper
	    // $FlowFixMe: we have to decalre length here
	    if ($wrapper.length === 0) {
	      throw new TypeError('Can not get dom node accroding wrapper. Please check your wrapper');
	    }
	    /**
	     * the referrence of the dom wrapper of whole Chimee
	     */
	    // $FlowFixMe: support computed key on nodewrap
	    this.wrapper = $wrapper[0];
	    this.originHTML = this.wrapper.innerHTML;
	    // if we find video element inside wrapper
	    // we use it
	    // or we create a video element by ourself.
	    // $FlowFixMe: support computed key on nodewrap
	    var videoElement = $wrapper.find('video')[0];
	    if (!videoElement) {
	      videoElement = document.createElement('video');
	    }
	    /**
	     * referrence of video's dom element
	     */
	    this.installVideo(videoElement);
	    this._fullscreenMonitor();
	    index.on('fullscreenchange', this._fullscreenMonitor);
	  }

	  _createClass(Dom, [{
	    key: 'installVideo',
	    value: function installVideo(videoElement) {
	      this.__videoExtendedNodes.push(videoElement);
	      setAttr(videoElement, 'tabindex', -1);
	      this._autoFocusToVideo(videoElement);
	      if (!isElement(this.container)) {
	        // create container
	        if (videoElement.parentElement && isElement(videoElement.parentElement) && videoElement.parentElement !== this.wrapper) {
	          this.container = videoElement.parentElement;
	        } else {
	          this.container = document.createElement('container');
	          $(this.container).append(videoElement);
	        }
	      } else {
	        var container = this.container;
	        if (container.childNodes.length === 0) {
	          container.appendChild(videoElement);
	        } else {
	          container.insertBefore(videoElement, container.childNodes[0]);
	        }
	      }
	      // check container.position
	      if (this.container.parentElement !== this.wrapper) {
	        $(this.wrapper).append(this.container);
	      }
	      this.videoElement = videoElement;
	      return videoElement;
	    }
	  }, {
	    key: 'removeVideo',
	    value: function removeVideo() {
	      var videoElement = this.videoElement;
	      this._autoFocusToVideo(this.videoElement, false);
	      // when we destroy the chimee
	      // binder is destroyed before dom
	      // so we need to make a check here
	      this.__dispatcher.binder && this.__dispatcher.binder.bindEventOnVideo(videoElement, true);
	      $(videoElement).remove();
	      delete this.videoElement;
	      return videoElement;
	    }

	    /**
	     * each plugin has its own dom node, this function will create one or them.
	     * we support multiple kind of el
	     * 1. Element, we will append this dom node on wrapper straight
	     * 2. HTMLString, we will create dom based on this HTMLString and append it on wrapper
	     * 3. string, we will transfer this string into hypen string, then we create a custom elment called by this and bind it on wrapper
	     * 4. nothing, we will create a div and bind it on the wrapper
	     */

	  }, {
	    key: 'insertPlugin',
	    value: function insertPlugin(id, el) {
	      var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	      if (!isString(id)) throw new TypeError('insertPlugin id parameter must be string');
	      if (isElement(this.plugins[id])) {
	        /* istanbul ignore else  */
	        Log.warn('Dispatcher.dom', 'Plugin ' + id + ' have already had a dom node. Now it will be replaced');
	        this.removePlugin(id);
	      }
	      if (isString(el)) {
	        if (isHTMLString(el)) {
	          var outer = document.createElement('div');
	          outer.innerHTML = el;
	          el = outer.children[0];
	        } else {
	          el = document.createElement(hypenate(el));
	        }
	      } else if (isObject$1(el)) {
	        // $FlowFixMe: we have check el's type here and make sure it's an object
	        option = el;
	      }
	      var _option = option,
	          inner = _option.inner,
	          penetrate = _option.penetrate,
	          autoFocus = _option.autoFocus;
	      var _option2 = option,
	          className = _option2.className;

	      var node = el && isElement(el) ? el : document.createElement('div');
	      if (isArray$1(className)) {
	        className = className.join(' ');
	      }
	      if (isString(className)) {
	        addClassName(node, className);
	      }
	      this.plugins[id] = node;
	      var outerElement = inner ? this.container : this.wrapper;
	      var originElement = inner ? this.videoElement : this.container;
	      if (isBoolean(autoFocus) ? autoFocus : inner) this._autoFocusToVideo(node);
	      // auto forward the event if this plugin can be penetrate
	      if (penetrate) {
	        this.__dispatcher.binder.bindEventOnPenetrateNode(node);
	        this.__videoExtendedNodes.push(node);
	      }
	      if (outerElement.lastChild === originElement) {
	        outerElement.appendChild(node);
	        return node;
	      }
	      outerElement.insertBefore(node, originElement.nextSibling);
	      return node;
	    }

	    /**
	     * remove plugin's dom
	     */

	  }, {
	    key: 'removePlugin',
	    value: function removePlugin(id) {
	      if (!isString(id)) return;
	      var dom = this.plugins[id];
	      if (isElement(dom)) {
	        dom.parentNode && dom.parentNode.removeChild(dom);
	        this._autoFocusToVideo(dom, true);
	      }

	      var _ref = Dispatcher.getPluginConfig(id) || {},
	          _ref$penetrate = _ref.penetrate,
	          penetrate = _ref$penetrate === undefined ? false : _ref$penetrate;

	      if (penetrate) this.__dispatcher.binder.bindEventOnPenetrateNode(dom, true);
	      delete this.plugins[id];
	    }

	    /**
	     * Set zIndex for a plugins list
	     */

	  }, {
	    key: 'setPluginsZIndex',
	    value: function setPluginsZIndex(plugins) {
	      var _this = this;

	      // $FlowFixMe: there are videoElment and container here
	      plugins.forEach(function (key, index$$1) {
	        return setStyle(key.match(/^(videoElement|container)$/) ? _this[key] : _this.plugins[key], 'z-index', ++index$$1);
	      });
	    }

	    /**
	     * set attribute on our dom
	     * @param {string} attr attribute's name
	     * @param {anything} val attribute's value
	     * @param {string} target the HTMLElemnt string name, only support video/wrapper/container now
	     */

	  }, {
	    key: 'setAttr',
	    value: function setAttr$$1(target, attr, val) {
	      // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
	      setAttr(this[target], attr, val);
	    }
	  }, {
	    key: 'getAttr',
	    value: function getAttr$$1(target, attr) {
	      // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
	      return getAttr(this[target], attr);
	    }
	  }, {
	    key: 'setStyle',
	    value: function setStyle$$1(target, attr, val) {
	      // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
	      setStyle(this[target], attr, val);
	    }
	  }, {
	    key: 'getStyle',
	    value: function getStyle$$1(target, attr) {
	      // $FlowFixMe: flow do not support computed property/element on class, which is silly here.
	      return getStyle(this[target], attr);
	    }
	  }, {
	    key: 'requestFullscreen',
	    value: function requestFullscreen(target) {
	      // $FlowFixMe: flow do not support computed property/element on document, which is silly here.
	      return index.open(this[target]);
	    }
	  }, {
	    key: 'exitFullscreen',
	    value: function exitFullscreen() {
	      return index.exit();
	    }
	  }, {
	    key: 'fullscreen',
	    value: function fullscreen() {
	      var request = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	      var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'container';

	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      return request ? this.requestFullscreen.apply(this, [target].concat(_toConsumableArray(args))) : this.exitFullscreen.apply(this, _toConsumableArray(args));
	    }
	  }, {
	    key: 'focus',
	    value: function focus() {
	      this.videoElement.focus();
	    }
	  }, {
	    key: 'isNodeInsideVideo',
	    value: function isNodeInsideVideo(node) {
	      return this.__videoExtendedNodes.indexOf(node) > -1 || this.__videoExtendedNodes.reduce(function (flag, video) {
	        if (flag) return flag;
	        return isPosterityNode(video, node);
	      }, false);
	    }

	    /**
	     * function called when we distory
	     */

	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.removeVideo();
	      index.off('fullscreenchange', this._fullscreenMonitor);
	      this.wrapper.innerHTML = this.originHTML;
	      delete this.wrapper;
	      delete this.plugins;
	      this.destroyed = true;
	    }
	  }, {
	    key: '_autoFocusToVideo',
	    value: function _autoFocusToVideo(element) {
	      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	      /* istanbule ignore next */
	      if (!isElement(element)) return;
	      (remove ? removeEvent : addEvent)(element, 'mouseup', this._focusToVideo, false, true);
	      (remove ? removeEvent : addEvent)(element, 'touchend', this._focusToVideo, false, true);
	    }
	  }, {
	    key: '_focusToVideo',
	    value: function _focusToVideo() {
	      var x = window.scrollX;
	      var y = window.scrollY;
	      isFunction(this.videoElement.focus) && this.videoElement.focus();
	      window.scrollTo(x, y);
	    }
	  }, {
	    key: '_fullscreenMonitor',
	    value: function _fullscreenMonitor(evt) {
	      var element = index.fullscreenElement;
	      var original = this.isFullscreen;
	      if (!element || !isPosterityNode(this.wrapper, element) && element !== this.wrapper) {
	        this.isFullscreen = false;
	        this.fullscreenElement = undefined;
	      } else {
	        this.isFullscreen = true;
	        this.fullscreenElement = this.wrapper === element ? 'wrapper' : this.container === element ? 'container' : this.videoElement === element ? 'video' : element;
	      }
	      if (isEvent(evt) && original !== this.isFullscreen) {
	        this.__dispatcher.binder.triggerSync({
	          name: 'fullscreenchange',
	          target: 'esFullscreen',
	          id: 'dispatcher'
	        }, evt);
	      }
	    }
	  }]);

	  return Dom;
	}(), (_applyDecoratedDescriptor$3(_class$4.prototype, 'setAttr', [_dec$4, _dec2$3], _Object$getOwnPropertyDescriptor(_class$4.prototype, 'setAttr'), _class$4.prototype), _applyDecoratedDescriptor$3(_class$4.prototype, 'getAttr', [_dec3$2], _Object$getOwnPropertyDescriptor(_class$4.prototype, 'getAttr'), _class$4.prototype), _applyDecoratedDescriptor$3(_class$4.prototype, 'setStyle', [_dec4$2], _Object$getOwnPropertyDescriptor(_class$4.prototype, 'setStyle'), _class$4.prototype), _applyDecoratedDescriptor$3(_class$4.prototype, 'getStyle', [_dec5$2], _Object$getOwnPropertyDescriptor(_class$4.prototype, 'getStyle'), _class$4.prototype), _applyDecoratedDescriptor$3(_class$4.prototype, 'requestFullscreen', [_dec6$1], _Object$getOwnPropertyDescriptor(_class$4.prototype, 'requestFullscreen'), _class$4.prototype), _applyDecoratedDescriptor$3(_class$4.prototype, '_focusToVideo', [autobind], _Object$getOwnPropertyDescriptor(_class$4.prototype, '_focusToVideo'), _class$4.prototype), _applyDecoratedDescriptor$3(_class$4.prototype, '_fullscreenMonitor', [autobind], _Object$getOwnPropertyDescriptor(_class$4.prototype, '_fullscreenMonitor'), _class$4.prototype)), _class$4));

	var defaultContainerConfig = {
	  width: '100%',
	  height: '100%',
	  position: 'relative',
	  display: 'block'
	};

	// base css controller for container and wrapper

	var Vessel = function Vessel(dispatcher, target, config) {
	  var _this = this;

	  _classCallCheck(this, Vessel);

	  this.__dispatcher = dispatcher;
	  this.__target = target;
	  ['width', 'height', 'position', 'display'].forEach(function (key) {
	    _Object$defineProperty(_this, key, {
	      get: function get() {
	        return this.__dispatcher.dom.getStyle(this.__target, key);
	      },
	      set: function set(value) {
	        if (isNumber(value)) {
	          value = value + 'px';
	        }
	        if (!isString(value)) {
	          throw new Error('The value of ' + key + ' in ' + this.__target + 'Config must be string, but not ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)) + '.');
	        }
	        this.__dispatcher.dom.setStyle(this.__target, key, value);
	        // return value;
	      },

	      configurable: true,
	      enumerable: true
	    });
	  });
	  deepAssign(this, config);
	};

	var dP$3 = $defineProperty.f;









	var fastKey = require$$0$10.fastKey;

	var SIZE = require$$0$1 ? '_s' : 'size';

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

	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = require$$0$7(null); // index
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
	    if (require$$0$1) dP$3(C.prototype, 'size', {
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
	var _collectionStrong_1 = _collectionStrong.getConstructor;
	var _collectionStrong_2 = _collectionStrong.def;
	var _collectionStrong_3 = _collectionStrong.getEntry;
	var _collectionStrong_4 = _collectionStrong.setStrong;

	var _collectionStrong$1 = /*#__PURE__*/Object.freeze({
		default: _collectionStrong,
		__moduleExports: _collectionStrong,
		getConstructor: _collectionStrong_1,
		def: _collectionStrong_2,
		getEntry: _collectionStrong_3,
		setStrong: _collectionStrong_4
	});

	var strong = ( _collectionStrong$1 && _collectionStrong ) || _collectionStrong$1;

	var MAP = 'Map';

	// 23.1 Map Objects
	var es6_map = require$$1$6(MAP, function (get) {
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

	var _arrayFromIterable = function (iter, ITERATOR) {
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};

	var _arrayFromIterable$1 = /*#__PURE__*/Object.freeze({
		default: _arrayFromIterable,
		__moduleExports: _arrayFromIterable
	});

	var from$4 = ( _arrayFromIterable$1 && _arrayFromIterable ) || _arrayFromIterable$1;

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON


	var _collectionToJson = function (NAME) {
	  return function toJSON() {
	    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
	    return from$4(this);
	  };
	};

	var _collectionToJson$1 = /*#__PURE__*/Object.freeze({
		default: _collectionToJson,
		__moduleExports: _collectionToJson
	});

	var require$$0$38 = ( _collectionToJson$1 && _collectionToJson ) || _collectionToJson$1;

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON


	$export$1($export$1.P + $export$1.R, 'Map', { toJSON: require$$0$38('Map') });

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
	require$$0$32('Map');

	// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
	require$$0$33('Map');

	var map = require$$1.Map;

	var map$1 = /*#__PURE__*/Object.freeze({
		default: map,
		__moduleExports: map
	});

	var require$$0$39 = ( map$1 && map ) || map$1;

	var map$2 = createCommonjsModule(function (module) {
	module.exports = { "default": require$$0$39, __esModule: true };
	});

	var _Map = unwrapExports(map$2);

	var _dec$5, _dec2$4, _dec3$3, _dec4$3, _class$5;

	function _applyDecoratedDescriptor$4(target, property, decorators, descriptor, context) {
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
	var secondaryReg = /^(before|after|_)/;
	function secondaryChecker(key) {
	  if (key.match(secondaryReg)) {
	    /* istanbul ignore else  */
	    Log.warn('bus', 'Secondary Event "' + key + '" could not be call straightly by API.');
	    return false;
	  }
	  return true;
	}
	/**
	 * <pre>
	 * event Bus class. Bus take charge of commuication between plugins and user.
	 * Some of the event may trigger the kernel to do some task.
	 * An event will run in four lifecycle
	 * before -> processor -> main -> after -> side effect(_)
	 * -------------------- emit period ----------------
	 * before: once an event emit, it will run through plugins in bubble to know is it possible to run.
	 * processor: if sth need to be done on kernel. It will tell kernel. If kernel will trigger event later, it will break down here. Else will run into trigger period
	 * -------------------- trigger period -----------------
	 * main: this procedure will trigger the main event in bubble, which means it can be stop in one plugin.
	 * after: once event run through all events. It will trigger after event. This event will be trigger in broadcast way.
	 * side effect(_): This events will always trigger once we bump into trigger period. So that you can know if the events been blocked. But it's not advice to listen on this effect.
	 * </pre>
	 */
	var Bus = (_dec$5 = runnable(secondaryChecker), _dec2$4 = runnable(secondaryChecker, {
	  backup: function backup() {
	    return false;
	  }
	}), _dec3$3 = runnable(secondaryChecker), _dec4$3 = runnable(secondaryChecker, {
	  backup: function backup() {
	    return false;
	  }
	}), (_class$5 = function () {
	  /**
	   * @param {Dispatcheer} dispatcher bus rely on dispatcher, so you mush pass dispatcher at first when you generate Bus.
	   * @return {Bus}
	   */

	  /**
	   * the handler set of all events
	   * @type {Object}
	   * @member events
	   */
	  function Bus(dispatcher) {
	    _classCallCheck(this, Bus);

	    this.events = {};
	    this.onceMap = {};

	    /**
	     * the referrence to dispatcher
	     * @type {Dispatcher}
	     */
	    this.__dispatcher = dispatcher;
	  }
	  /**
	   * [Can only be called in dispatcher]bind event on bus.
	   */


	  _createClass(Bus, [{
	    key: 'on',
	    value: function on(id, eventName, fn, stage) {
	      this._addEvent([eventName, stage, id], fn);
	    }
	    /**
	     * [Can only be called in dispatcher]remove event off bus. Only suggest one by one.
	     */

	  }, {
	    key: 'off',
	    value: function off(id, eventName, fn, stage) {
	      var keys = [eventName, stage, id];
	      var deleted = this._removeEvent(keys, fn);
	      if (deleted) return;
	      var handler = this._getHandlerFromOnceMap(keys, fn);
	      if (isFunction(handler)) {
	        this._removeEvent(keys, handler) && this._removeFromOnceMap(keys, fn, handler);
	      }
	    }
	    /**
	     * [Can only be called in dispatcher]bind event on bus and remove it once event is triggered.
	     */

	  }, {
	    key: 'once',
	    value: function once(id, eventName, fn, stage) {
	      var bus = this;
	      var keys = [eventName, stage, id];
	      var handler = function handler() {
	        // keep the this so that it can run
	        bind(fn, this).apply(undefined, arguments);
	        bus._removeEvent(keys, handler);
	        bus._removeFromOnceMap(keys, fn, handler);
	      };
	      this._addEvent(keys, handler);
	      this._addToOnceMap(keys, fn, handler);
	    }
	    /**
	     * [Can only be called in dispatcher]emit an event, which will run before -> processor period.
	     * It may stop in before period.
	     * @param  {string}    key event's name
	     * @param  {anything} args other argument will be passed into handler
	     * @return {Promise}  this promise maybe useful if the event would not trigger kernel event. In that will you can know if it runs successful. But you can know if the event been stopped by the promise.
	     */

	  }, {
	    key: 'emit',
	    value: function emit(key) {
	      var _this = this;

	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      var event = this.events[key];
	      if (isEmpty(event)) {
	        if (selfProcessorEvents.indexOf(key) > -1) return _Promise.resolve();
	        // $FlowFixMe: conditional return here
	        return this._eventProcessor.apply(this, [key, { sync: false }].concat(_toConsumableArray(args)));
	      }
	      var beforeQueue = this._getEventQueue(event.before, this.__dispatcher.order);
	      return runRejectableQueue.apply(undefined, [beforeQueue].concat(_toConsumableArray(args))).then(function () {
	        if (selfProcessorEvents.indexOf(key) > -1) return;
	        return _this._eventProcessor.apply(_this, [key, { sync: false }].concat(_toConsumableArray(args)));
	      }).catch(function (error) {
	        if (isError(error)) _this.__dispatcher.throwError(error);
	        return _Promise.reject(error);
	      });
	    }
	    /**
	     * [Can only be called in dispatcher]emit an event, which will run before -> processor period synchronize.
	     * It may stop in before period.
	     * @param  {string}    key event's name
	     * @param  {anything} args other argument will be passed into handler
	     * @return {Promise}  this promise maybe useful if the event would not trigger kernel event. In that will you can know if it runs successful. But you can know if the event been stopped by the promise.
	     */

	  }, {
	    key: 'emitSync',
	    value: function emitSync(key) {
	      var event = this.events[key];

	      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      if (isEmpty(event)) {
	        if (selfProcessorEvents.indexOf(key) > -1) return true;
	        // $FlowFixMe: conditional return here
	        return this._eventProcessor.apply(this, [key, { sync: true }].concat(_toConsumableArray(args)));
	      }
	      var beforeQueue = this._getEventQueue(event.before, this.__dispatcher.order);
	      return runStoppableQueue.apply(undefined, [beforeQueue].concat(_toConsumableArray(args))) && (selfProcessorEvents.indexOf(key) > -1 ||
	      // $FlowFixMe: conditional return here
	      this._eventProcessor.apply(this, [key, { sync: true }].concat(_toConsumableArray(args))));
	    }
	    /**
	     * [Can only be called in dispatcher]trigger an event, which will run main -> after -> side effect period
	     * @param  {string}    key event's name
	     * @param  {anything} args
	     * @return {Promise|undefined}    you can know if event trigger finished~ However, if it's unlegal
	     */

	  }, {
	    key: 'trigger',
	    value: function trigger(key) {
	      var _this2 = this;

	      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        args[_key3 - 1] = arguments[_key3];
	      }

	      var event = this.events[key];
	      if (isEmpty(event)) {
	        return _Promise.resolve(true);
	      }
	      var mainQueue = this._getEventQueue(event.main, this.__dispatcher.order);
	      return runRejectableQueue.apply(undefined, [mainQueue].concat(_toConsumableArray(args))).then(function () {
	        var afterQueue = _this2._getEventQueue(event.after, _this2.__dispatcher.order);
	        return runRejectableQueue.apply(undefined, [afterQueue].concat(_toConsumableArray(args)));
	      }).then(function () {
	        return _this2._runSideEffectEvent.apply(_this2, [key, _this2.__dispatcher.order].concat(_toConsumableArray(args)));
	      }).catch(function (error) {
	        if (isError(error)) _this2.__dispatcher.throwError(error);
	        return _this2._runSideEffectEvent.apply(_this2, [key, _this2.__dispatcher.order].concat(_toConsumableArray(args)));
	      });
	    }
	    /**
	     * [Can only be called in dispatcher]trigger an event, which will run main -> after -> side effect period in synchronize
	     * @param  {string}    key event's name
	     * @param  {anything} args
	     * @return {boolean}    you can know if event trigger finished~ However, if it's unlegal
	     */

	  }, {
	    key: 'triggerSync',
	    value: function triggerSync(key) {
	      var event = this.events[key];
	      if (isEmpty(event)) {
	        return true;
	      }
	      var mainQueue = this._getEventQueue(event.main, this.__dispatcher.order);
	      var afterQueue = this._getEventQueue(event.after, this.__dispatcher.order);

	      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	        args[_key4 - 1] = arguments[_key4];
	      }

	      var result = runStoppableQueue.apply(undefined, [mainQueue].concat(_toConsumableArray(args))) && runStoppableQueue.apply(undefined, [afterQueue].concat(_toConsumableArray(args)));
	      this._runSideEffectEvent.apply(this, [key, this.__dispatcher.order].concat(_toConsumableArray(args)));
	      return result;
	    }
	    /**
	     * destroy hook which will be called when object destroy
	     */

	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      delete this.events;
	      delete this.__dispatcher;
	    }
	    /**
	     * add event into bus
	     * @private
	     * @param {Array} keys keys map pointing to position to put event handler
	     * @param {function} fn handler to put
	     */

	  }, {
	    key: '_addEvent',
	    value: function _addEvent(keys, fn) {
	      keys = deepClone(keys);
	      var id = keys.pop();
	      var target = keys.reduce(function (target, key) {
	        target[key] = target[key] || {};
	        return target[key];
	      }, this.events);
	      // events will store like {play: {main: {plugin: []}}}
	      target[id] = target[id] || [];
	      target[id].push(fn);
	    }
	    /**
	     * remove event from bus
	     * @private
	     * @param {Array} keys keys map pointing to position to get event handler
	     * @param {function} fn handler to put
	     */

	  }, {
	    key: '_removeEvent',
	    value: function _removeEvent(keys, fn) {
	      keys = deepClone(keys);
	      var id = keys.pop();
	      var target = this.events;
	      var backtrackList = [];
	      for (var i = 0, len = keys.length; i < len; i++) {
	        var son = target[keys[i]];
	        // if we can't find the event binder, just return
	        if (isEmpty(son)) return;
	        backtrackList.push([target, keys[i]]);
	        target = son;
	      }
	      var queue = target[id] || [];
	      var index = queue.indexOf(fn);
	      var hasFn = index > -1;
	      // if we found handler remove it
	      if (hasFn) {
	        queue.splice(index, 1);
	      }
	      // if this plugin has no event binding, we remove this event session, which make us perform faster in emit & trigger period.
	      if (queue.length < 1) {
	        delete target[id];
	        // backtrack to remove the redudant object
	        for (var _i = backtrackList.length - 1; _i > -1; _i--) {
	          var _backtrackList$_i = _slicedToArray(backtrackList[_i], 2),
	              parent = _backtrackList$_i[0],
	              key = _backtrackList$_i[1];

	          if (!isEmpty(parent[key])) break;
	          delete parent[key];
	        }
	      }
	      return hasFn;
	    }
	  }, {
	    key: '_addToOnceMap',
	    value: function _addToOnceMap(keys, fn, handler) {
	      var key = keys.join('-');
	      var map = this.onceMap[key] = this.onceMap[key] || new _Map();
	      if (!map.has(fn)) map.set(fn, []);
	      var handlers = map.get(fn);
	      // $FlowFixMe: flow do not understand map yet
	      handlers.push(handler);
	    }
	  }, {
	    key: '_removeFromOnceMap',
	    value: function _removeFromOnceMap(keys, fn, handler) {
	      var key = keys.join('-');
	      var map = this.onceMap[key];
	      // do not need to check now
	      // if(isVoid(map) || !map.has(fn)) return;
	      var handlers = map.get(fn);
	      var index = handlers.indexOf(handler);
	      handlers.splice(index, 1);
	      if (isEmpty(handlers)) map.delete(fn);
	    }
	  }, {
	    key: '_getHandlerFromOnceMap',
	    value: function _getHandlerFromOnceMap(keys, fn) {
	      var key = keys.join('-');
	      var map = this.onceMap[key];
	      if (isVoid(map) || !map.has(fn)) return;
	      var handlers = map.get(fn);
	      return handlers[0];
	    }
	    /**
	     * get event stage by evnet key name
	     * @private
	     * @param  {key} key event's name
	     * @return {stage}  event stage
	     */

	  }, {
	    key: '_getEventStage',
	    value: function _getEventStage(key) {
	      var secondaryCheck = key.match(secondaryReg);
	      // $FlowFixMe: make sure it's event stage here
	      var stage = secondaryCheck && secondaryCheck[0] || 'main';
	      if (secondaryCheck) {
	        key = camelize(key.replace(secondaryReg, ''));
	      }
	      return { stage: stage, key: key };
	    }
	    /**
	     * get event handlers queue to run
	     * @private
	     * @param  {Object} handlerSet the object include all handler
	     * @param  {Array} Array form of plugin id
	     * @return {Array<Function>} event handler in queue to run
	     */

	  }, {
	    key: '_getEventQueue',
	    value: function _getEventQueue(handlerSet, order) {
	      var _this3 = this;

	      order = isArray$1(order) ? order.concat(['_vm']) : ['_vm'];
	      return isEmpty(handlerSet) ? [] : order.reduce(function (queue, id) {
	        if (isEmpty(handlerSet[id]) || !isArray$1(handlerSet[id]) ||
	        // in case plugins is missed
	        // _vm indicate the user. This is the function for user
	        !_this3.__dispatcher.plugins[id] && id !== '_vm') {
	          return queue;
	        }
	        return queue.concat(handlerSet[id].map(function (fn) {
	          // bind context for plugin instance
	          return bind(fn, _this3.__dispatcher.plugins[id] || _this3.__dispatcher.vm);
	        }));
	      }, []);
	    }
	    /**
	     * event processor period. If event needs call kernel function.
	     * I will called here.
	     * If kernel will reponse. I will stop here.
	     * Else I will trigger next period.
	     * @param  {string}    key event's name
	     * @param  {boolean}  options.sync we will take triggerSync if true, otherwise we will run trigger. default is false
	     * @param  {anything} args
	     * @return {Promise|undefined}
	     */

	  }, {
	    key: '_eventProcessor',
	    value: function _eventProcessor(key, _ref) {
	      var sync = _ref.sync;

	      var isKernelMethod = kernelMethods.indexOf(key) > -1;
	      var isDomMethod = domMethods.indexOf(key) > -1;
	      var isDispatcherMethod = dispatcherMethods.indexOf(key) > -1;

	      for (var _len5 = arguments.length, args = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
	        args[_key5 - 2] = arguments[_key5];
	      }

	      if (isKernelMethod || isDomMethod || isDispatcherMethod) {
	        if (isDispatcherMethod) {
	          var _dispatcher;

	          (_dispatcher = this.__dispatcher)[key].apply(_dispatcher, _toConsumableArray(args));
	        } else {
	          var _dispatcher2;

	          (_dispatcher2 = this.__dispatcher[isKernelMethod ? 'kernel' : 'dom'])[key].apply(_dispatcher2, _toConsumableArray(args));
	        }
	        if (videoEvents.indexOf(key) > -1 || domEvents.indexOf(key) > -1) return true;
	      }
	      // $FlowFixMe: flow do not support computed sytax on classs, but it's ok here
	      return this[sync ? 'triggerSync' : 'trigger'].apply(this, [key].concat(_toConsumableArray(args)));
	    }
	    /**
	     * run side effect period
	     * @param  {string}    key event's name
	     * @param  {args} args
	     */

	  }, {
	    key: '_runSideEffectEvent',
	    value: function _runSideEffectEvent(key, order) {
	      for (var _len6 = arguments.length, args = Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
	        args[_key6 - 2] = arguments[_key6];
	      }

	      var event = this.events[key];
	      if (isEmpty(event)) {
	        return false;
	      }
	      var queue = this._getEventQueue(event._, order);
	      queue.forEach(function (run) {
	        return run.apply(undefined, _toConsumableArray(args));
	      });
	      return true;
	    }
	  }]);

	  return Bus;
	}(), (_applyDecoratedDescriptor$4(_class$5.prototype, 'emit', [_dec$5], _Object$getOwnPropertyDescriptor(_class$5.prototype, 'emit'), _class$5.prototype), _applyDecoratedDescriptor$4(_class$5.prototype, 'emitSync', [_dec2$4], _Object$getOwnPropertyDescriptor(_class$5.prototype, 'emitSync'), _class$5.prototype), _applyDecoratedDescriptor$4(_class$5.prototype, 'trigger', [_dec3$3], _Object$getOwnPropertyDescriptor(_class$5.prototype, 'trigger'), _class$5.prototype), _applyDecoratedDescriptor$4(_class$5.prototype, 'triggerSync', [_dec4$3], _Object$getOwnPropertyDescriptor(_class$5.prototype, 'triggerSync'), _class$5.prototype)), _class$5));

	var _dec$6, _dec2$5, _dec3$4, _dec4$4, _dec5$3, _dec6$2, _dec7$1, _dec8$1, _dec9$1, _dec10$1, _dec11$1, _class$6;

	function _applyDecoratedDescriptor$5(target, property, decorators, descriptor, context) {
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

	var secondaryReg$1 = /^(before|after|_)/;

	/**
	 * In logic before 0.10.0, we use 'c_' and 'w_' to mark event of container and wrapper
	 * we need to keep that logic work until next major version.
	 * @param {string} name 事件名字
	 */
	function getEventTargetByOldLogic(oldName) {
	  var targetKeyReg = new RegExp('^(c|w)_');
	  var matches = oldName.match(targetKeyReg);
	  if (matches) {
	    var _name = oldName.replace(targetKeyReg, '');
	    var _target = oldName.indexOf('c') === 0 ? 'container' : 'wrapper';
	    /* istanbul ignore else  */
	    {
	      Log.warn('We no longer support event names like ' + oldName + '. Please use ' + _name + ' and options like { target: \'' + _target + '\' } instead');
	    }
	    return { name: _name, target: _target };
	  } else if (oldName === 'error') {
	    return { name: 'error', target: 'kernel' };
	  }
	  return false;
	}

	function getEventStage(name) {
	  var matches = name.match(secondaryReg$1);
	  // $FlowFixMe: We make sure it's event stage here
	  var stage = matches && matches[0] || 'main';
	  if (matches) {
	    name = camelize(name.replace(secondaryReg$1, ''));
	  }
	  return { name: name, stage: stage };
	}

	function getEventTargetByEventName(name) {
	  if (videoEvents.indexOf(name) > -1) return 'video';
	  if (kernelEvents.indexOf(name) > -1) return 'kernel';
	  if (domEvents.indexOf(name) > -1) return 'video-dom';
	  if (esFullscreenEvents.indexOf(name) > -1) return 'esFullscreen';
	  return 'plugin';
	}

	function getEventInfo(_ref) {
	  var name = _ref.name,
	      target = _ref.target,
	      stage = _ref.stage;

	  var oldInfo = getEventTargetByOldLogic(name);
	  if (oldInfo) {
	    name = oldInfo.name;
	    target = oldInfo.target;
	  }

	  var _getEventStage = getEventStage(name),
	      newStage = _getEventStage.stage,
	      newName = _getEventStage.name;

	  name = newName;

	  if (!target) {
	    target = getEventTargetByEventName(name);
	  }

	  return {
	    name: name,
	    stage: stage || newStage,
	    target: target
	  };
	}

	function prettifyEventParameter(info) {
	  var id = info.id,
	      fn = info.fn;

	  var _getEventInfo = getEventInfo(info),
	      name = _getEventInfo.name,
	      target = _getEventInfo.target,
	      stage = _getEventInfo.stage;

	  if (!isFunction(fn)) {
	    throw new Error('You must provide a function to handle with event ' + name + ', but not ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
	  }
	  return {
	    id: id,
	    fn: fn,
	    name: name,
	    target: target,
	    stage: stage
	  };
	}

	function isEventEmitalbe(_ref2) {
	  var id = _ref2.id,
	      name = _ref2.name;

	  if (!name || !isString(name) || secondaryReg$1.test(name)) {
	    Log.error('You must provide a legal event name, which is string and could not started with before/after/_');
	    return false;
	  }
	  if (!id || !isString(id)) {
	    Log.error('You must provide the id of emitter');
	    return false;
	  }
	  return true;
	}

	function checkEventEmitParameter(info) {
	  // $FlowFixMe: the info match requirement here
	  info.target = getEventInfo(info).target;

	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return [info].concat(_toConsumableArray(args));
	}

	var Binder = (_dec$6 = before(prettifyEventParameter), _dec2$5 = before(prettifyEventParameter), _dec3$4 = before(prettifyEventParameter), _dec4$4 = runnable(isEventEmitalbe), _dec5$3 = before(checkEventEmitParameter), _dec6$2 = runnable(isEventEmitalbe, {
	  backup: function backup() {
	    return false;
	  }
	}), _dec7$1 = before(checkEventEmitParameter), _dec8$1 = runnable(isEventEmitalbe), _dec9$1 = before(checkEventEmitParameter), _dec10$1 = runnable(isEventEmitalbe, {
	  backup: function backup() {
	    return false;
	  }
	}), _dec11$1 = before(checkEventEmitParameter), (_class$6 = function () {
	  function Binder(dispatcher) {
	    _classCallCheck(this, Binder);

	    this.__dispatcher = dispatcher;
	    this.kinds = ['kernel', 'container', 'wrapper', 'video', 'video-dom', 'plugin', 'esFullscreen'];
	    this.buses = {};
	    this.bindedEventNames = {};
	    this.bindedEventInfo = {};
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = _getIterator(this.kinds), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var kind = _step.value;

	        this.bindedEventNames[kind] = [];
	        this.bindedEventInfo[kind] = [];
	        this.buses[kind] = new Bus(dispatcher);
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

	  _createClass(Binder, [{
	    key: 'on',
	    value: function on(_ref3) {
	      var target = _ref3.target,
	          id = _ref3.id,
	          name = _ref3.name,
	          fn = _ref3.fn,
	          stage = _ref3.stage;

	      this._addEventListenerOnTarget({
	        name: name,
	        target: target,
	        id: id
	      });
	      return this.buses[target].on(id, name, fn, stage);
	    }
	  }, {
	    key: 'off',
	    value: function off(_ref4) {
	      var target = _ref4.target,
	          id = _ref4.id,
	          name = _ref4.name,
	          fn = _ref4.fn,
	          stage = _ref4.stage;

	      var ret = this.buses[target].off(id, name, fn, stage);
	      this._removeEventListenerOnTargetWhenIsUseless({ name: name, target: target });
	      return ret;
	    }
	  }, {
	    key: 'once',
	    value: function once(_ref5) {
	      var target = _ref5.target,
	          id = _ref5.id,
	          name = _ref5.name,
	          fn = _ref5.fn,
	          stage = _ref5.stage;

	      return this.buses[target].once(id, name, fn, stage);
	    }
	  }, {
	    key: 'emit',
	    value: function emit(_ref6) {
	      var _buses$target;

	      var target = _ref6.target,
	          name = _ref6.name;

	      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	        args[_key2 - 1] = arguments[_key2];
	      }

	      return (_buses$target = this.buses[target]).emit.apply(_buses$target, [name].concat(_toConsumableArray(args)));
	    }
	  }, {
	    key: 'emitSync',
	    value: function emitSync(_ref7) {
	      var _buses$target2;

	      var target = _ref7.target,
	          name = _ref7.name;

	      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	        args[_key3 - 1] = arguments[_key3];
	      }

	      return (_buses$target2 = this.buses[target]).emitSync.apply(_buses$target2, [name].concat(_toConsumableArray(args)));
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(_ref8) {
	      var _buses$target3;

	      var target = _ref8.target,
	          name = _ref8.name;

	      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	        args[_key4 - 1] = arguments[_key4];
	      }

	      return (_buses$target3 = this.buses[target]).trigger.apply(_buses$target3, [name].concat(_toConsumableArray(args)));
	    }
	  }, {
	    key: 'triggerSync',
	    value: function triggerSync(_ref9) {
	      var _buses$target4;

	      var target = _ref9.target,
	          name = _ref9.name;

	      for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
	        args[_key5 - 1] = arguments[_key5];
	      }

	      return (_buses$target4 = this.buses[target]).triggerSync.apply(_buses$target4, [name].concat(_toConsumableArray(args)));
	    }

	    // when we create a penetrate plugin, we need to rebind video events on it

	  }, {
	    key: 'bindEventOnPenetrateNode',
	    value: function bindEventOnPenetrateNode(node) {
	      var _this = this;

	      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	      this.bindedEventInfo['video-dom'].forEach(function (_ref10) {
	        var _ref11 = _slicedToArray(_ref10, 2),
	            name = _ref11[0],
	            fn = _ref11[1];

	        remove ? removeEvent(node, name, fn) : _this._addEventOnDom(node, name, fn);
	      });
	    }

	    // when we switch kernel, we will create a new video.
	    // we need to transfer the event from the oldvideo to it.

	  }, {
	    key: 'bindEventOnVideo',
	    value: function bindEventOnVideo(node) {
	      var _this2 = this;

	      var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	      this.bindedEventInfo['video-dom'].concat(this.bindedEventInfo.video).forEach(function (_ref12) {
	        var _ref13 = _slicedToArray(_ref12, 2),
	            name = _ref13[0],
	            fn = _ref13[1];

	        remove ? removeEvent(node, name, fn) : _this2._addEventOnDom(node, name, fn);
	      });
	    }

	    // As penetrate plugin is considered to be part of video
	    // we need to transfer event for it
	    // so we need some specail event handler

	  }, {
	    key: 'listenOnMouseMoveEvent',
	    value: function listenOnMouseMoveEvent(node) {
	      var _this3 = this;

	      var dom = this.__dispatcher.dom;
	      var target = 'video-dom';
	      var id = '_vm';
	      mustListenVideoDomEvents.forEach(function (name) {
	        var fn = function fn() {
	          for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	            args[_key6] = arguments[_key6];
	          }

	          var _args$ = args[0],
	              toElement = _args$.toElement,
	              currentTarget = _args$.currentTarget,
	              relatedTarget = _args$.relatedTarget,
	              type = _args$.type;

	          var to = toElement || relatedTarget;
	          // As we support penetrate plugin, the video dom event may be differnet.
	          if (dom.mouseInVideo && type === 'mouseleave' && !dom.isNodeInsideVideo(to)) {
	            dom.mouseInVideo = false;
	            return _this3.triggerSync.apply(_this3, [{
	              target: target,
	              name: name,
	              id: id
	            }].concat(args));
	          }
	          if (!dom.mouseInVideo && type === 'mouseenter' && dom.isNodeInsideVideo(currentTarget)) {
	            dom.mouseInVideo = true;
	            return _this3.triggerSync.apply(_this3, [{
	              target: target,
	              name: name,
	              id: id
	            }].concat(args));
	          }
	        };
	        _this3._addEventOnDom(node, name, fn);
	        // this function is only used once now
	        // so we do not cover this branch
	        // but we still keep this judegement
	        /* istanbul ignore else  */
	        if (_this3.bindedEventNames[target].indexOf(name) < 0) {
	          _this3.bindedEventNames[target].push(name);
	          // $FlowFixMe: fn must be function now
	          _this3.bindedEventInfo[target].push([name, fn]);
	        }
	      });
	    }

	    // When we switch kernel, we need to rebind the events

	  }, {
	    key: 'migrateKernelEvent',
	    value: function migrateKernelEvent(oldKernel, newKernel) {
	      var bindedEventInfoList = this.bindedEventInfo.kernel;
	      bindedEventInfoList.forEach(function (_ref14) {
	        var _ref15 = _slicedToArray(_ref14, 2),
	            name = _ref15[0],
	            fn = _ref15[1];

	        oldKernel.off(name, fn);
	        newKernel.on(name, fn);
	      });
	    }

	    // when we destroy, we remove all binder

	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this4 = this;

	      this.kinds.forEach(function (target) {
	        if (target === 'kernel') {
	          _this4.bindedEventInfo.kernel.forEach(function (_ref16) {
	            var _ref17 = _slicedToArray(_ref16, 2),
	                name = _ref17[0],
	                fn = _ref17[1];

	            _this4.__dispatcher.kernel.off(name, fn);
	          });
	        } else {
	          var targetDom = _this4._getTargetDom(target);
	          _this4.bindedEventInfo[target].forEach(function (_ref18) {
	            var _ref19 = _slicedToArray(_ref18, 2),
	                name = _ref19[0],
	                fn = _ref19[1];

	            removeEvent(targetDom, name, fn);

	            if (target === 'video-dom') {
	              _this4.__dispatcher.dom.videoExtendedNodes.forEach(function (node) {
	                return removeEvent(node, name, fn);
	              });
	            }
	          });
	        }
	        _this4.bindedEventInfo.kernel = [];
	        _this4.bindedEventNames.kernel = [];
	      });
	    }
	  }, {
	    key: '_addEventOnDom',
	    value: function _addEventOnDom(element, key, fn) {
	      if (passiveEvents.indexOf(key) > -1) {
	        return addEvent(element, key, fn, false, { passive: true });
	      }
	      addEvent(element, key, fn);
	    }

	    // Some event needs us to transfer it from the real target
	    // such as dom event

	  }, {
	    key: '_addEventListenerOnTarget',
	    value: function _addEventListenerOnTarget(_ref20) {
	      var _this5 = this;

	      var name = _ref20.name,
	          target = _ref20.target,
	          id = _ref20.id;

	      if (!this._isEventNeedToBeHandled(target, name)) return;
	      var fn = void 0;
	      // if this event has been binded, return;
	      if (this.bindedEventNames[target].indexOf(name) > -1) return;
	      var targetDom = this._getTargetDom(target);
	      // choose the correspond method to bind
	      if (target === 'kernel') {
	        fn = function fn() {
	          for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	            args[_key7] = arguments[_key7];
	          }

	          return _this5.triggerSync.apply(_this5, [{ target: target, name: name, id: 'kernel' }].concat(args));
	        };
	        this.__dispatcher.kernel.on(name, fn);
	      } else if (target === 'container' || target === 'wrapper') {
	        fn = function fn() {
	          for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
	            args[_key8] = arguments[_key8];
	          }

	          return _this5.triggerSync.apply(_this5, [{ target: target, name: name, id: target }].concat(args));
	        };
	        this._addEventOnDom(targetDom, name, fn);
	      } else if (target === 'video') {
	        fn = function fn() {
	          for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
	            args[_key9] = arguments[_key9];
	          }

	          return _this5.trigger.apply(_this5, [{ target: target, name: name, id: target }].concat(args));
	        };
	        this._addEventOnDom(targetDom, name, fn);
	      } else if (target === 'video-dom') {
	        var _ref21 = Dispatcher.getPluginConfig(id) || {},
	            _ref21$penetrate = _ref21.penetrate,
	            penetrate = _ref21$penetrate === undefined ? false : _ref21$penetrate;

	        fn = function fn() {
	          for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
	            args[_key10] = arguments[_key10];
	          }

	          return _this5.triggerSync.apply(_this5, [{ target: target, name: name, id: target }].concat(args));
	        };
	        if (penetrate) this.__dispatcher.dom.videoExtendedNodes.forEach(function (node) {
	          return _this5._addEventOnDom(node, name, fn);
	        });
	        this._addEventOnDom(targetDom, name, fn);
	      }
	      this.bindedEventNames[target].push(name);
	      // $FlowFixMe: fn must be function now
	      this.bindedEventInfo[target].push([name, fn]);
	    }

	    // when we off one event, we can remove the useless binder
	    // actually we should remove on once event too
	    // but it seems ugliy
	    // TODO: add this function on once event too

	  }, {
	    key: '_removeEventListenerOnTargetWhenIsUseless',
	    value: function _removeEventListenerOnTargetWhenIsUseless(_ref22) {
	      var name = _ref22.name,
	          target = _ref22.target;

	      if (!this._isEventNeedToBeHandled(target, name)) return;
	      var eventNamesList = this.bindedEventNames[target];
	      var nameIndex = eventNamesList.indexOf(name);
	      // if we have not bind this event before, we omit it
	      if (nameIndex < 0) return;
	      // if the buses still have another function on bind, we do not need to remove the binder
	      if (!isEmpty(this.buses[target].events[name])) return;

	      // we fetch the binded function from bindedEventInfo
	      var bindedEventInfoList = this.bindedEventInfo[target];
	      var fn = void 0;
	      var index = void 0;
	      for (index = 0; index < bindedEventInfoList.length; index++) {
	        if (bindedEventInfoList[index][0] === name) {
	          fn = bindedEventInfoList[index][1];
	          break;
	        }
	      }
	      if (!isFunction(fn)) return;

	      if (target === 'kernel') {
	        this.__dispatcher.kernel.off(name, fn);
	      } else {
	        var targetDom = this._getTargetDom(target);

	        removeEvent(targetDom, name, fn);

	        // When we remove something on video dom, we also need to remove event on penetrate plugin
	        if (target === 'video-dom') {
	          this.__dispatcher.dom.videoExtendedNodes.forEach(function (node) {
	            // $FlowFixMe: fn is function now
	            removeEvent(node, name, fn);
	          });
	        }
	      }

	      bindedEventInfoList.splice(index, 1);
	      eventNamesList.splice(nameIndex, 1);
	    }
	  }, {
	    key: '_getTargetDom',
	    value: function _getTargetDom(target) {
	      var targetDom = void 0;
	      switch (target) {
	        case 'container':
	        case 'wrapper':
	          // $FlowFixMe: fix dom index bug
	          targetDom = this.__dispatcher.dom[target];
	          break;
	        default:
	          targetDom = this.__dispatcher.dom.videoElement;
	          break;
	      }
	      return targetDom;
	    }
	  }, {
	    key: '_isEventNeedToBeHandled',
	    value: function _isEventNeedToBeHandled(target, name) {
	      // the plugin target do not need us to transfer
	      // we have listened on esFullscreen in dom
	      // we have listened mustListenVideoDomEvents
	      // so the events above do not need to rebind
	      return target !== 'plugin' && target !== 'esFullscreen' && mustListenVideoDomEvents.indexOf(name) < 0;
	    }
	  }]);

	  return Binder;
	}(), (_applyDecoratedDescriptor$5(_class$6.prototype, 'on', [_dec$6], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'on'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'off', [_dec2$5], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'off'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'once', [_dec3$4], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'once'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'emit', [_dec4$4, _dec5$3], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'emit'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'emitSync', [_dec6$2, _dec7$1], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'emitSync'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'trigger', [_dec8$1, _dec9$1], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'trigger'), _class$6.prototype), _applyDecoratedDescriptor$5(_class$6.prototype, 'triggerSync', [_dec10$1, _dec11$1], _Object$getOwnPropertyDescriptor(_class$6.prototype, 'triggerSync'), _class$6.prototype)), _class$6));

	var _dec$7, _dec2$6, _dec3$5, _dec4$5, _dec5$4, _class$7;

	function _applyDecoratedDescriptor$6(target, property, decorators, descriptor, context) {
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
	var pluginConfigSet = {};
	var kernelsSet = {};
	function convertNameIntoId(name) {
	  if (!isString(name)) throw new Error('Plugin\'s name must be a string, but not "' + name + '" in ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));
	  return camelize(name);
	}
	function checkPluginConfig(config) {
	  if (isFunction(config)) {
	    if (!(config.prototype instanceof Plugin)) {
	      throw new TypeError('Your are trying to install plugin ' + config.name + ', but it\'s not extends from Chimee.plugin.');
	    }
	    return;
	  }
	  if (!isObject$1(config) || isEmpty(config)) throw new TypeError('plugin\'s config must be an Object, but not "' + config + '" in ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)));
	  var name = config.name;

	  if (!isString(name) || name.length < 1) throw new TypeError('plugin must have a legal namea, but not "' + name + '" in ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));
	}
	/**
	 * <pre>
	 * Dispatcher is the hub of plugins, user, and video kernel.
	 * It take charge of plugins install, use and remove
	 * It also offer a bridge to let user handle video kernel.
	 * </pre>
	 */
	var Dispatcher = (_dec$7 = before(convertNameIntoId), _dec2$6 = before(checkPluginConfig), _dec3$5 = before(convertNameIntoId), _dec4$5 = before(convertNameIntoId), _dec5$4 = before(convertNameIntoId), (_class$7 = function () {
	  /**
	   * @param  {UserConfig} config UserConfig for whole Chimee player
	   * @param  {Chimee} vm referrence of outer class
	   * @return {Dispatcher}
	   */

	  /**
	   * the synchronous ready flag
	   * @type {boolean}
	   * @member readySync
	   */

	  /**
	   * all plugins instance set
	   * @type {Object}
	   * @member plugins
	   */
	  function Dispatcher(config, vm) {
	    var _this = this;

	    _classCallCheck(this, Dispatcher);

	    this.plugins = {};
	    this.order = [];
	    this.readySync = false;
	    this.zIndexMap = {
	      inner: [],
	      outer: []
	    };
	    this.changeWatchable = true;
	    this.kernelEventHandlerList = [];

	    if (!isObject$1(config)) throw new TypeError('UserConfig must be an Object, but not "' + config + '" in ' + (typeof config === 'undefined' ? 'undefined' : _typeof(config)));
	    /**
	     * dom Manager
	     * @type {Dom}
	     */
	    this.dom = new Dom(config.wrapper, this);
	    /**
	     * Chimee's referrence
	     * @type {[type]}
	     */
	    this.vm = vm;
	    /**
	     * tell user have Chimee installed finished
	     * @type {Promises}
	     */
	    this.videoConfigReady = false;
	    // create the videoconfig
	    this.videoConfig = new VideoConfig(this, config);
	    // support both plugin and plugins here as people often cofuse both
	    // $FlowFixMe: we support plugins here, which should be illegal
	    if (isArray$1(config.plugins) && !isArray$1(config.plugin)) {
	      config.plugin = config.plugins;
	      delete config.plugins;
	    }
	    this.binder = new Binder(this);
	    this.binder.listenOnMouseMoveEvent(this.dom.videoElement);
	    // use the plugin user want to use
	    this._initUserPlugin(config.plugin);
	    // add default config for container
	    var containerConfig = deepAssign({}, defaultContainerConfig, config.container || {});
	    // trigger the init life hook of plugin
	    this.order.forEach(function (key) {
	      return _this.plugins[key].__init(_this.videoConfig, containerConfig);
	    });
	    this.videoConfigReady = true;
	    this.videoConfig.init();
	    this.containerConfig = new Vessel(this, 'container', containerConfig);
	    /**
	     * video kernel
	     * @type {Kernel}
	     */
	    this.kernel = this._createKernel(this.dom.videoElement, this.videoConfig);
	    // trigger auto load event
	    var asyncInitedTasks = [];
	    this.order.forEach(function (key) {
	      var ready = _this.plugins[key].__inited();
	      if (isPromise(ready)) {
	        asyncInitedTasks.push(ready);
	      }
	    });
	    this.readySync = asyncInitedTasks.length === 0;
	    // tell them we have inited the whold player
	    this.ready = this.readySync ? _Promise.resolve() : _Promise.all(asyncInitedTasks).then(function () {
	      _this.readySync = true;
	      _this.binder.trigger({
	        target: 'plugin',
	        name: 'ready',
	        id: 'dispatcher'
	      });
	      _this._autoloadVideoSrcAtFirst();
	    });
	    if (this.readySync) this._autoloadVideoSrcAtFirst();
	  }
	  /**
	   * use a plugin, which means we will new a plugin instance and include int this Chimee instance
	   * @param  {Object|string} option you can just set a plugin name or plugin config
	   * @return {Promise}
	   */

	  // to save the kernel event handler, so that we can remove it when we destroy the kernel

	  /**
	   * the z-index map of the dom, it contain some important infomation
	   * @type {Object}
	   * @member zIndexMap
	   */

	  /**
	   * plugin's order
	   * @type {Array<string>}
	   * @member order
	   */


	  _createClass(Dispatcher, [{
	    key: 'use',
	    value: function use(option) {
	      if (isString(option)) option = { name: option, alias: undefined };
	      if (!isObject$1(option) || isObject$1(option) && !isString(option.name)) {
	        throw new TypeError('pluginConfig do not match requirement');
	      }
	      if (!isString(option.alias)) option.alias = undefined;
	      var _option = option,
	          name = _option.name,
	          alias$$1 = _option.alias;

	      option.name = alias$$1 || name;
	      delete option.alias;
	      var key = camelize(name);
	      var id = camelize(alias$$1 || name);
	      var pluginOption = option;
	      var pluginConfig = Dispatcher.getPluginConfig(key);
	      if (isEmpty(pluginConfig)) throw new TypeError('You have not installed plugin ' + key);
	      if (isObject$1(pluginConfig)) {
	        pluginConfig.id = id;
	      }
	      var plugin = isFunction(pluginConfig) ? new pluginConfig({ id: id }, this, pluginOption) // eslint-disable-line 
	      : new Plugin(pluginConfig, this, pluginOption);
	      this.plugins[id] = plugin;
	      _Object$defineProperty(this.vm, id, {
	        value: plugin,
	        configurable: true,
	        enumerable: false,
	        writable: false
	      });
	      this.order.push(id);
	      this._sortZIndex();
	      if (this.videoConfigReady) plugin.__inited();
	      return plugin.ready;
	    }
	    /**
	     * unuse an plugin, we will destroy the plugin instance and exlude it
	     * @param  {string} name plugin's name
	     */

	  }, {
	    key: 'unuse',
	    value: function unuse(id) {
	      var plugin = this.plugins[id];
	      if (!isObject$1(plugin) || !isFunction(plugin.$destroy)) {
	        delete this.plugins[id];
	        return;
	      }
	      plugin.$destroy();
	      var orderIndex = this.order.indexOf(id);
	      if (orderIndex > -1) {
	        this.order.splice(orderIndex, 1);
	      }
	      delete this.plugins[id];
	      delete this.vm[id];
	    }
	  }, {
	    key: 'throwError',
	    value: function throwError(error) {
	      this.vm.__throwError(error);
	    }
	  }, {
	    key: 'silentLoad',
	    value: function silentLoad(src) {
	      var _this2 = this;

	      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var _option$duration = option.duration,
	          duration = _option$duration === undefined ? 3 : _option$duration,
	          _option$bias = option.bias,
	          bias = _option$bias === undefined ? 0 : _option$bias,
	          _option$repeatTimes = option.repeatTimes,
	          repeatTimes = _option$repeatTimes === undefined ? 0 : _option$repeatTimes,
	          _option$increment = option.increment,
	          increment = _option$increment === undefined ? 0 : _option$increment,
	          _option$isLive = option.isLive,
	          isLive = _option$isLive === undefined ? this.videoConfig.isLive : _option$isLive,
	          _option$box = option.box,
	          box = _option$box === undefined ? this.videoConfig.box : _option$box,
	          _option$kernels = option.kernels,
	          kernels = _option$kernels === undefined ? this.videoConfig.kernels : _option$kernels,
	          _option$preset = option.preset,
	          preset = _option$preset === undefined ? this.videoConfig.preset : _option$preset;
	      // all live stream seem as immediate mode
	      // it's impossible to seek on live stream

	      var immediate = option.immediate || isLive;
	      // form the base config for kernel
	      // it should be the same as the config now
	      var config = { isLive: isLive, box: box, src: src, kernels: kernels, preset: preset };
	      // build tasks accroding repeat times
	      var tasks = new Array(repeatTimes + 1).fill(1).map(function (value, index) {
	        return function () {
	          return new _Promise(function (resolve, reject) {
	            // if abort, give up and reject
	            if (option.abort) reject({ error: true, message: 'user abort the mission' });
	            var video = document.createElement('video');
	            var idealTime = _this2.kernel.currentTime + duration + increment * index;
	            video.muted = true;
	            var newVideoReady = false;
	            var kernel = void 0;
	            var _videoError = void 0;
	            var videoCanplay = void 0;
	            var videoLoadedmetadata = void 0;
	            // bind time update on old video
	            // when we bump into the switch point and ready
	            // we switch
	            var oldVideoTimeupdate = function oldVideoTimeupdate() {
	              var currentTime = _this2.kernel.currentTime;
	              if (bias <= 0 && currentTime >= idealTime || bias > 0 && (Math.abs(idealTime - currentTime) <= bias && newVideoReady || currentTime - idealTime > bias)) {
	                removeEvent(_this2.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
	                removeEvent(video, 'error', _videoError, true);
	                if (!newVideoReady) {
	                  removeEvent(video, 'canplay', videoCanplay, true);
	                  removeEvent(video, 'loadedmetadata', videoLoadedmetadata, true);
	                  kernel.destroy();
	                  return resolve();
	                }
	                return reject({
	                  error: false,
	                  video: video,
	                  kernel: kernel
	                });
	              }
	            };
	            videoCanplay = function videoCanplay() {
	              newVideoReady = true;
	              // you can set it immediately run by yourself
	              if (immediate) {
	                removeEvent(_this2.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
	                removeEvent(video, 'error', _videoError, true);
	                return reject({
	                  error: false,
	                  video: video,
	                  kernel: kernel
	                });
	              }
	            };
	            videoLoadedmetadata = function videoLoadedmetadata() {
	              if (!isLive) kernel.seek(idealTime);
	            };
	            _videoError = function videoError(evt) {
	              removeEvent(video, 'canplay', videoCanplay, true);
	              removeEvent(video, 'loadedmetadata', videoLoadedmetadata, true);
	              removeEvent(_this2.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
	              kernel.off('error', _videoError);
	              var error = void 0;
	              if (!isEmpty(evt.data) && evt.data.errmsg) {
	                var errmsg = evt.data.errmsg;

	                Log.error("chimee's silentload bump into a kernel error", errmsg);
	                error = new Error(errmsg);
	              } else {
	                error = !isEmpty(video.error) ? new Error(video.error.message) : new Error('unknow video error');
	                Log.error("chimee's silentload", error.message);
	              }
	              kernel.destroy();
	              _this2._silentLoadTempKernel = undefined;
	              return index === repeatTimes ? reject(error) : resolve(error);
	            };
	            addEvent(video, 'canplay', videoCanplay, true);
	            addEvent(video, 'loadedmetadata', videoLoadedmetadata, true);
	            addEvent(video, 'error', _videoError, true);
	            kernel = _this2._createKernel(video, config);
	            _this2._silentLoadTempKernel = kernel;
	            kernel.on('error', _videoError);
	            addEvent(_this2.dom.videoElement, 'timeupdate', oldVideoTimeupdate);
	            kernel.load();
	          });
	        };
	      });
	      return runRejectableQueue(tasks).then(function () {
	        var message = 'The silentLoad for ' + src + ' timed out. Please set a longer duration or check your network';
	        /* istanbul ignore else  */
	        {
	          Log.warn("chimee's silentLoad", message);
	        }
	        return _Promise.reject(new Error(message));
	      }).catch(function (data) {
	        if (isError(data)) {
	          return _Promise.reject(data);
	        }
	        if (data.error) {
	          /* istanbul ignore else  */
	          {
	            Log.warn("chimee's silentLoad", data.message);
	          }
	          return _Promise.reject(new Error(data.message));
	        }
	        var video = data.video,
	            kernel = data.kernel;

	        if (option.abort) {
	          kernel.destroy();
	          return _Promise.reject(new Error('user abort the mission'));
	        }
	        var paused = _this2.dom.videoElement.paused;
	        if (paused) {
	          _this2.switchKernel({ video: video, kernel: kernel, config: config });
	          return _Promise.resolve();
	        }
	        return new _Promise(function (resolve) {
	          addEvent(video, 'play', function () {
	            _this2.switchKernel({ video: video, kernel: kernel, config: config });
	            resolve();
	          }, true);
	          video.play();
	        });
	      });
	    }
	  }, {
	    key: 'load',
	    value: function load(srcOrOption) {
	      var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	      var src = isString(srcOrOption) ? srcOrOption : isObject$1(srcOrOption) && isString(srcOrOption.src) ? srcOrOption.src : '';
	      if (isObject$1(srcOrOption)) {
	        delete srcOrOption.src;
	        option = srcOrOption;
	      }
	      var oldBox = this.kernel.box;
	      var videoConfig = this.videoConfig;
	      var _option2 = option,
	          _option2$isLive = _option2.isLive,
	          isLive = _option2$isLive === undefined ? videoConfig.isLive : _option2$isLive,
	          _option2$box = _option2.box,
	          box = _option2$box === undefined ? videoConfig.box : _option2$box,
	          _option2$preset = _option2.preset,
	          preset = _option2$preset === undefined ? videoConfig.preset : _option2$preset,
	          _option2$kernels = _option2.kernels,
	          kernels = _option2$kernels === undefined ? videoConfig.kernels : _option2$kernels;

	      if (box !== 'native' || box !== oldBox || !isEmpty(option)) {
	        var video = document.createElement('video');
	        var config = { isLive: isLive, box: box, preset: preset, src: src, kernels: kernels };
	        var kernel = this._createKernel(video, config);
	        this.switchKernel({ video: video, kernel: kernel, config: config });
	      }
	      var originAutoLoad = this.videoConfig.autoload;
	      this._changeUnwatchable(this.videoConfig, 'autoload', false);
	      this.videoConfig.src = src || this.videoConfig.src;
	      this.kernel.load(this.videoConfig.src);
	      this._changeUnwatchable(this.videoConfig, 'autoload', originAutoLoad);
	    }
	  }, {
	    key: 'switchKernel',
	    value: function switchKernel(_ref) {
	      var _this3 = this;

	      var video = _ref.video,
	          kernel = _ref.kernel,
	          config = _ref.config;

	      var oldKernel = this.kernel;
	      var originVideoConfig = deepClone(this.videoConfig);
	      this.dom.removeVideo();
	      this.dom.installVideo(video);
	      // as we will reset the currentVideoConfig on the new video
	      // it will trigger the watch function as they maybe differnet
	      // because video config will return the real situation
	      // so we need to stop them
	      this.videoConfig.changeWatchable = false;
	      this.videoConfig.autoload = false;
	      this.videoConfig.src = config.src;
	      this.videoConfig._realDomAttr.forEach(function (key) {
	        // $FlowFixMe: support computed key here
	        if (key !== 'src') _this3.videoConfig[key] = originVideoConfig[key];
	      });
	      this.videoConfig.changeWatchable = true;
	      this.binder.migrateKernelEvent(oldKernel, kernel);
	      this.kernel = kernel;
	      this._silentLoadTempKernel = undefined;
	      var isLive = config.isLive,
	          box = config.box,
	          preset = config.preset,
	          kernels = config.kernels;

	      _Object$assign(this.videoConfig, { isLive: isLive, box: box, preset: preset, kernels: kernels });
	      oldKernel.destroy();
	      // delay video event binding
	      // so that people can't feel the default value change
	      setTimeout(function () {
	        return _this3.binder.bindEventOnVideo(video);
	      });
	    }
	    /**
	     * destroy function called when dispatcher destroyed
	     */

	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      for (var _key in this.plugins) {
	        this.unuse(_key);
	      }
	      this.binder.destroy();
	      delete this.binder;
	      this.dom.destroy();
	      delete this.dom;
	      this.kernel.destroy();
	      delete this.kernel;
	      delete this.vm;
	      delete this.plugins;
	      delete this.order;
	    }
	    /**
	     * use a set of plugin
	     * @param  {Array<UserPluginConfig>}  configs  a set of plugin config
	     * @return {Array<Promise>}   a set of Promise indicate the plugin install stage
	     */

	  }, {
	    key: '_initUserPlugin',
	    value: function _initUserPlugin() {
	      var _this4 = this;

	      var configs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      if (!isArray$1(configs)) {
	        /* istanbul ignore else  */
	        Log.warn('Dispatcher', 'UserConfig.plugin can only by an Array, but not "' + configs + '" in ' + (typeof configs === 'undefined' ? 'undefined' : _typeof(configs)));
	        configs = [];
	      }
	      return configs.map(function (config) {
	        return _this4.use(config);
	      });
	    }
	    /**
	     * sort zIndex of plugins to make plugin display in order
	     */

	  }, {
	    key: '_sortZIndex',
	    value: function _sortZIndex() {
	      var _this5 = this;

	      var _order$reduce = this.order.reduce(function (levelSet, key) {
	        var plugin = _this5.plugins[key];
	        if (isEmpty(plugin)) return levelSet;
	        var set = levelSet[plugin.$inner ? 'inner' : 'outer'];
	        var level = plugin.$level;
	        set[level] = set[level] || [];
	        set[level].push(key);
	        return levelSet;
	      }, { inner: {}, outer: {} }),
	          inner = _order$reduce.inner,
	          outer = _order$reduce.outer;

	      inner[0] = inner[0] || [];
	      inner[0].unshift('videoElement');
	      outer[0] = outer[0] || [];
	      outer[0].unshift('container');
	      var innerOrderArr = transObjectAttrIntoArray(inner);
	      var outerOrderArr = transObjectAttrIntoArray(outer);
	      this.dom.setPluginsZIndex(innerOrderArr);
	      this.dom.setPluginsZIndex(outerOrderArr);
	      this.zIndexMap.inner = innerOrderArr;
	      this.zIndexMap.outer = outerOrderArr;
	    }
	    /**
	     * get the top element's level
	     * @param {boolean} inner get the inner array or the outer array
	     */

	  }, {
	    key: '_getTopLevel',
	    value: function _getTopLevel(inner) {
	      var arr = this.zIndexMap[inner ? 'inner' : 'outer'];
	      var plugin = this.plugins[arr[arr.length - 1]];
	      return isEmpty(plugin) ? 0 : plugin.$level;
	    }
	  }, {
	    key: '_autoloadVideoSrcAtFirst',
	    value: function _autoloadVideoSrcAtFirst() {
	      if (this.videoConfig.autoload) {
	        if (!this.videoConfig.src) {
	          Log.warn('You have not set the src, so you better set autoload to be false. Accroding to https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/chimee-api.md#src.');
	          return;
	        }
	        this.binder.emit({
	          name: 'load',
	          target: 'plugin',
	          id: 'dispatcher'
	        }, this.videoConfig.src);
	      }
	    }
	  }, {
	    key: '_changeUnwatchable',
	    value: function _changeUnwatchable(object, property, value) {
	      this.changeWatchable = false;
	      object[property] = value;
	      this.changeWatchable = true;
	    }
	  }, {
	    key: '_createKernel',
	    value: function _createKernel(video, config) {
	      var kernels = config.kernels,
	          preset = config.preset;
	      /* istanbul ignore else  */

	      if (isEmpty(kernels) && !isEmpty(preset)) Log.warn('preset will be deprecated in next major version, please use kernels instead.');
	      var presetConfig = {};
	      var newPreset = {};
	      if (isArray$1(kernels)) {
	        // SKC means SingleKernelConfig
	        newPreset = kernels.reduce(function (kernels, keyOrSKC) {
	          // if it is a string key, it means the kernel has been pre installed.
	          if (isString(keyOrSKC)) {
	            var kernelFn = kernelsSet[keyOrSKC];
	            if (!isFunction(kernelFn)) {
	              Log.warn('You have not installed kernel for ' + keyOrSKC + '.');
	              return kernels;
	            }
	            kernels[keyOrSKC] = kernelFn;
	            return kernels;
	          }
	          // if it is a SingleKernelConfig, it means user may pass in some config here
	          // so we need to extract the handler
	          // get the name of the handler
	          // and collect the config for the handler
	          if (isObject$1(keyOrSKC)) {
	            var name = keyOrSKC.name,
	                handler = keyOrSKC.handler;
	            // if the handler is a pure string, it means the kernel has been pre installed

	            if (isString(handler)) {
	              var _kernelFn = kernelsSet[handler];
	              if (!isFunction(_kernelFn)) {
	                Log.warn('You have not installed kernel for ' + handler + '.');
	                return kernels;
	              }
	              kernels[handler] = _kernelFn;
	              presetConfig[handler] = keyOrSKC;
	              return kernels;
	            }
	            // if the handler is a function, it means that the user pass in the kernel directly
	            // if the provide name, we use it as kernel name
	            // if they do not provide name, we just use the function's name
	            if (isFunction(handler)) {
	              var kernelName = name || handler.name;
	              kernels[kernelName] = handler;
	              presetConfig[kernelName] = keyOrSKC;
	              return kernels;
	            }
	            Log.warn('When you pass in an SingleKernelConfig in Array, you must clarify it\'s handler, we only support handler in string or function but not ' + (typeof handler === 'undefined' ? 'undefined' : _typeof(handler)));
	            return kernels;
	          }
	          Log.warn('If you pass in kernels as array, you must pass in kernels in string or function, but not ' + (typeof keyOrSKC === 'undefined' ? 'undefined' : _typeof(keyOrSKC)));
	          return kernels;
	        }, {});
	      }

	      if (isObject$1(kernels)) {
	        // SKC means SingleKernelConfig
	        _Object$keys(kernels).forEach(function (key) {
	          var fnOrSKC = kernels[key];
	          // if it's a function, means we need to do nothing
	          if (isFunction(fnOrSKC)) {
	            newPreset[key] = fnOrSKC;
	            return;
	          }
	          if (isObject$1(fnOrSKC)) {
	            var handler = fnOrSKC.handler;
	            // if handler is an string, it means user has pre install it

	            if (isString(handler)) {
	              var kernelFn = kernelsSet[handler];
	              if (!isFunction(kernelFn)) {
	                Log.warn('You have not installed kernel for ' + handler + '.');
	                return;
	              }
	              newPreset[key] = kernelFn;
	              presetConfig[key] = fnOrSKC;
	              return;
	            }
	            if (isFunction(handler)) {
	              newPreset[key] = handler;
	              presetConfig[key] = fnOrSKC;
	              return;
	            }
	            Log.warn('When you pass in an SingleKernelConfig in Object, you must clarify it\'s handler, we only support handler in string or function but not ' + (typeof handler === 'undefined' ? 'undefined' : _typeof(handler)));
	            return;
	          }
	          Log.warn('If you pass in kernels as object, you must pass in kernels in string or function, but not ' + (typeof fnOrSKC === 'undefined' ? 'undefined' : _typeof(fnOrSKC)));
	          return kernels;
	        });
	      }
	      config.preset = _Object$assign(newPreset, preset);
	      config.presetConfig = presetConfig;
	      var kernel = new ChimeeKernel(video, config);
	      return kernel;
	    }
	    /**
	     * static method to install plugin
	     * we will store the plugin config
	     * @type {string} plugin's id
	     */

	  }], [{
	    key: 'install',
	    value: function install(config) {
	      var name = config.name;

	      var id = camelize(name);
	      if (!isEmpty(pluginConfigSet[id])) {
	        /* istanbul ignore else  */
	        Log.warn('Dispatcher', 'You have installed ' + name + ' again. And the older one will be replaced');
	      }
	      var pluginConfig = isFunction(config) ? config : deepAssign({ id: id }, config);
	      pluginConfigSet[id] = pluginConfig;
	      return id;
	    }
	  }, {
	    key: 'hasInstalled',
	    value: function hasInstalled(id) {
	      return !isEmpty(pluginConfigSet[id]);
	    }
	  }, {
	    key: 'uninstall',
	    value: function uninstall(id) {
	      delete pluginConfigSet[id];
	    }
	    /**
	     * get Plugin config based on plugin's id
	     * @type {[type]}
	     */

	  }, {
	    key: 'getPluginConfig',
	    value: function getPluginConfig(id) {
	      return pluginConfigSet[id];
	    }
	  }, {
	    key: 'installKernel',
	    value: function installKernel(key, value) {
	      var tasks = isObject$1(key) ? _Object$entries(key) : [[key, value]];
	      tasks.forEach(function (_ref2) {
	        var _ref3 = _slicedToArray(_ref2, 2),
	            key = _ref3[0],
	            value = _ref3[1];

	        if (!isFunction(value)) throw new Error('The kernel you install on ' + key + ' must be a Function, but not ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)));
	        if (isFunction(kernelsSet[key])) Log.warn('You have alrady install a kernel on ' + key + ', and now we will replace it');
	        kernelsSet[key] = value;
	      });
	    }

	    // only use for debug in internal

	  }, {
	    key: 'uninstallKernel',
	    value: function uninstallKernel(key) {
	      delete kernelsSet[key];
	    }
	  }, {
	    key: 'hasInstalledKernel',
	    value: function hasInstalledKernel(key) {
	      return isFunction(kernelsSet[key]);
	    }
	  }]);

	  return Dispatcher;
	}(), (_applyDecoratedDescriptor$6(_class$7.prototype, 'unuse', [_dec$7], _Object$getOwnPropertyDescriptor(_class$7.prototype, 'unuse'), _class$7.prototype), _applyDecoratedDescriptor$6(_class$7.prototype, 'throwError', [autobind], _Object$getOwnPropertyDescriptor(_class$7.prototype, 'throwError'), _class$7.prototype), _applyDecoratedDescriptor$6(_class$7, 'install', [_dec2$6], _Object$getOwnPropertyDescriptor(_class$7, 'install'), _class$7), _applyDecoratedDescriptor$6(_class$7, 'hasInstalled', [_dec3$5], _Object$getOwnPropertyDescriptor(_class$7, 'hasInstalled'), _class$7), _applyDecoratedDescriptor$6(_class$7, 'uninstall', [_dec4$5], _Object$getOwnPropertyDescriptor(_class$7, 'uninstall'), _class$7), _applyDecoratedDescriptor$6(_class$7, 'getPluginConfig', [_dec5$4], _Object$getOwnPropertyDescriptor(_class$7, 'getPluginConfig'), _class$7)), _class$7));

	var _class$8, _descriptor$1;

	function _initDefineProp$1(target, property, descriptor, context) {
	  if (!descriptor) return;

	  _Object$defineProperty(target, property, {
	    enumerable: descriptor.enumerable,
	    configurable: descriptor.configurable,
	    writable: descriptor.writable,
	    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	  });
	}

	function _applyDecoratedDescriptor$7(target, property, decorators, descriptor, context) {
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
	var GlobalConfig = (_class$8 = function () {
	  _createClass(GlobalConfig, [{
	    key: 'silent',
	    get: function get() {
	      return this._silent;
	    },
	    set: function set(val) {
	      var _this = this;

	      val = !!val;
	      this._silent = val;
	      _Object$keys(this.log).forEach(function (key) {
	        _this.log[key] = !val;
	      });
	    }
	  }]);

	  function GlobalConfig() {
	    _classCallCheck(this, GlobalConfig);

	    this.log = {
	      error: true,
	      info: true,
	      warn: true,
	      debug: true,
	      verbose: true
	    };

	    _initDefineProp$1(this, '_silent', _descriptor$1, this);

	    this.errorHandler = undefined;

	    var props = _Object$keys(this.log).reduce(function (props, key) {
	      props[key] = accessor({
	        get: function get() {
	          // $FlowFixMe: we have check the keys
	          return Log['ENABLE_' + key.toUpperCase()];
	        },
	        set: function set(val) {
	          // $FlowFixMe: we have check the keys
	          Log['ENABLE_' + key.toUpperCase()] = val;
	          if (val === true) this.silent = false;
	          return val;
	        }
	      });
	      return props;
	    }, {});
	    applyDecorators(this.log, props, { self: true });
	  }

	  return GlobalConfig;
	}(), (_descriptor$1 = _applyDecoratedDescriptor$7(_class$8.prototype, '_silent', [nonenumerable], {
	  enumerable: true,
	  initializer: function initializer() {
	    return false;
	  }
	})), _class$8);

	var _global$2 = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _global$3 = /*#__PURE__*/Object.freeze({
		default: _global$2,
		__moduleExports: _global$2
	});

	var _core$2 = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1$1 = _core$2.version;

	var _core$3 = /*#__PURE__*/Object.freeze({
		default: _core$2,
		__moduleExports: _core$2,
		version: _core_1$1
	});

	var _isObject$2 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _isObject$3 = /*#__PURE__*/Object.freeze({
		default: _isObject$2,
		__moduleExports: _isObject$2
	});

	var isObject$2 = ( _isObject$3 && _isObject$2 ) || _isObject$3;

	var _anObject$2 = function (it) {
	  if (!isObject$2(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _anObject$3 = /*#__PURE__*/Object.freeze({
		default: _anObject$2,
		__moduleExports: _anObject$2
	});

	var _fails$2 = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	var _fails$3 = /*#__PURE__*/Object.freeze({
		default: _fails$2,
		__moduleExports: _fails$2
	});

	var require$$1$7 = ( _fails$3 && _fails$2 ) || _fails$3;

	// Thank's IE8 for his funny defineProperty
	var _descriptors$2 = !require$$1$7(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var _descriptors$3 = /*#__PURE__*/Object.freeze({
		default: _descriptors$2,
		__moduleExports: _descriptors$2
	});

	var require$$0$40 = ( _global$3 && _global$2 ) || _global$3;

	var document$3 = require$$0$40.document;
	// typeof document.createElement is 'object' in old IE
	var is$1 = isObject$2(document$3) && isObject$2(document$3.createElement);
	var _domCreate$2 = function (it) {
	  return is$1 ? document$3.createElement(it) : {};
	};

	var _domCreate$3 = /*#__PURE__*/Object.freeze({
		default: _domCreate$2,
		__moduleExports: _domCreate$2
	});

	var require$$0$41 = ( _descriptors$3 && _descriptors$2 ) || _descriptors$3;

	var require$$2$2 = ( _domCreate$3 && _domCreate$2 ) || _domCreate$3;

	var _ie8DomDefine$2 = !require$$0$41 && !require$$1$7(function () {
	  return Object.defineProperty(require$$2$2('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	var _ie8DomDefine$3 = /*#__PURE__*/Object.freeze({
		default: _ie8DomDefine$2,
		__moduleExports: _ie8DomDefine$2
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive$2 = function (it, S) {
	  if (!isObject$2(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject$2(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var _toPrimitive$3 = /*#__PURE__*/Object.freeze({
		default: _toPrimitive$2,
		__moduleExports: _toPrimitive$2
	});

	var anObject$1 = ( _anObject$3 && _anObject$2 ) || _anObject$3;

	var IE8_DOM_DEFINE$1 = ( _ie8DomDefine$3 && _ie8DomDefine$2 ) || _ie8DomDefine$3;

	var toPrimitive$1 = ( _toPrimitive$3 && _toPrimitive$2 ) || _toPrimitive$3;

	var dP$4 = Object.defineProperty;

	var f$8 = require$$0$41 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$1(O);
	  P = toPrimitive$1(P, true);
	  anObject$1(Attributes);
	  if (IE8_DOM_DEFINE$1) try {
	    return dP$4(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp$2 = {
		f: f$8
	};

	var _objectDp$3 = /*#__PURE__*/Object.freeze({
		default: _objectDp$2,
		__moduleExports: _objectDp$2,
		f: f$8
	});

	var _propertyDesc$2 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _propertyDesc$3 = /*#__PURE__*/Object.freeze({
		default: _propertyDesc$2,
		__moduleExports: _propertyDesc$2
	});

	var dP$5 = ( _objectDp$3 && _objectDp$2 ) || _objectDp$3;

	var createDesc$1 = ( _propertyDesc$3 && _propertyDesc$2 ) || _propertyDesc$3;

	var _hide$2 = require$$0$41 ? function (object, key, value) {
	  return dP$5.f(object, key, createDesc$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var _hide$3 = /*#__PURE__*/Object.freeze({
		default: _hide$2,
		__moduleExports: _hide$2
	});

	var hasOwnProperty$1 = {}.hasOwnProperty;
	var _has$2 = function (it, key) {
	  return hasOwnProperty$1.call(it, key);
	};

	var _has$3 = /*#__PURE__*/Object.freeze({
		default: _has$2,
		__moduleExports: _has$2
	});

	var id$2 = 0;
	var px$1 = Math.random();
	var _uid$2 = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$2 + px$1).toString(36));
	};

	var _uid$3 = /*#__PURE__*/Object.freeze({
		default: _uid$2,
		__moduleExports: _uid$2
	});

	var hide = ( _hide$3 && _hide$2 ) || _hide$3;

	var has = ( _has$3 && _has$2 ) || _has$3;

	var require$$0$42 = ( _uid$3 && _uid$2 ) || _uid$3;

	var require$$1$8 = ( _core$3 && _core$2 ) || _core$3;

	var _redefine$2 = createCommonjsModule(function (module) {
	var SRC = require$$0$42('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	require$$1$8.inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) has(val, 'name') || hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === require$$0$40) {
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
	});

	var _redefine$3 = /*#__PURE__*/Object.freeze({
		default: _redefine$2,
		__moduleExports: _redefine$2
	});

	var _aFunction$2 = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	var _aFunction$3 = /*#__PURE__*/Object.freeze({
		default: _aFunction$2,
		__moduleExports: _aFunction$2
	});

	var aFunction$1 = ( _aFunction$3 && _aFunction$2 ) || _aFunction$3;

	// optional / simple context binding

	var _ctx$2 = function (fn, that, length) {
	  aFunction$1(fn);
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

	var _ctx$3 = /*#__PURE__*/Object.freeze({
		default: _ctx$2,
		__moduleExports: _ctx$2
	});

	var redefine$1 = ( _redefine$3 && _redefine$2 ) || _redefine$3;

	var ctx$1 = ( _ctx$3 && _ctx$2 ) || _ctx$3;

	var PROTOTYPE$3 = 'prototype';

	var $export$2 = function (type, name, source) {
	  var IS_FORCED = type & $export$2.F;
	  var IS_GLOBAL = type & $export$2.G;
	  var IS_STATIC = type & $export$2.S;
	  var IS_PROTO = type & $export$2.P;
	  var IS_BIND = type & $export$2.B;
	  var target = IS_GLOBAL ? require$$0$40 : IS_STATIC ? require$$0$40[name] || (require$$0$40[name] = {}) : (require$$0$40[name] || {})[PROTOTYPE$3];
	  var exports = IS_GLOBAL ? require$$1$8 : require$$1$8[name] || (require$$1$8[name] = {});
	  var expProto = exports[PROTOTYPE$3] || (exports[PROTOTYPE$3] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx$1(out, require$$0$40) : IS_PROTO && typeof out == 'function' ? ctx$1(Function.call, out) : out;
	    // extend global
	    if (target) redefine$1(target, key, out, type & $export$2.U);
	    // export
	    if (exports[key] != out) hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	require$$0$40.core = require$$1$8;
	// type bitmap
	$export$2.F = 1;   // forced
	$export$2.G = 2;   // global
	$export$2.S = 4;   // static
	$export$2.P = 8;   // proto
	$export$2.B = 16;  // bind
	$export$2.W = 32;  // wrap
	$export$2.U = 64;  // safe
	$export$2.R = 128; // real proto method for `library`
	var _export$2 = $export$2;

	var _export$3 = /*#__PURE__*/Object.freeze({
		default: _export$2,
		__moduleExports: _export$2
	});

	var $export$3 = ( _export$3 && _export$2 ) || _export$3;

	// https://github.com/tc39/proposal-global


	$export$3($export$3.G, { global: require$$0$40 });

	var global$1 = require$$1$8.global;

	var _dec$8, _class$9, _class2$2, _descriptor$2, _descriptor2$1, _descriptor3$1, _init, _init2, _init3, _init4, _init5, _init6, _init7, _init8, _init9, _class3, _temp;

	function _initDefineProp$2(target, property, descriptor, context) {
	  if (!descriptor) return;

	  _Object$defineProperty(target, property, {
	    enumerable: descriptor.enumerable,
	    configurable: descriptor.configurable,
	    writable: descriptor.writable,
	    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
	  });
	}

	function _applyDecoratedDescriptor$8(target, property, decorators, descriptor, context) {
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

	var Chimee = (_dec$8 = autobindClass(), _dec$8(_class$9 = (_class2$2 = (_temp = _class3 = function (_VideoWrapper) {
	  _inherits(Chimee, _VideoWrapper);

	  _createClass(Chimee, null, [{
	    key: 'registerEvents',


	    // In some situation, we may have custom events
	    // For example, we may have a custom kernel event
	    // We can register the event through this method
	    value: function registerEvents() {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	          name = _ref.name,
	          target = _ref.target;

	      if (!name || !isString(name)) throw new Error('The event name must be a string, but not ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));
	      if (!target || !isString(target)) throw new Error('The event target must be a string, but not ' + (typeof target === 'undefined' ? 'undefined' : _typeof(target)));
	      if (target === 'kernel') {
	        kernelEvents.push(name);
	      }
	    }
	  }]);

	  function Chimee(config) {
	    _classCallCheck(this, Chimee);

	    /* istanbul ignore if */
	    var _this = _possibleConstructorReturn(this, (Chimee.__proto__ || _Object$getPrototypeOf(Chimee)).call(this));

	    _this.destroyed = false;

	    _initDefineProp$2(_this, '__id', _descriptor$2, _this);

	    _initDefineProp$2(_this, 'version', _descriptor2$1, _this);

	    _initDefineProp$2(_this, 'config', _descriptor3$1, _this);

	    if (!global$1.Object.defineProperty) {
	      /* istanbul ignore next */
	      Log.error('Chimee', "We detect that this browser lack of Object.defineProperty. Chimee can't run on this browser");
	    }
	    /* istanbul ignore if */
	    if (!global$1.Promise) {
	      /* istanbul ignore next */
	      Log.error('Chimee', 'We detect that this browser lack of Promise. If you are running Chimee in old browser. Please make sure you have import polyfill such as babel-polyfill.');
	    }
	    if (isString(config) || isElement(config)) {
	      config = {
	        wrapper: config,
	        controls: true
	      };
	    } else if (isObject$1(config)) {
	      if (!config.wrapper) throw new Error('You must pass in an legal object');
	    } else {
	      throw new Error('You must pass in an Object containing wrapper or string or element to new a Chimee');
	    }
	    // $FlowFixMe: we have check wrapper here
	    _this.__dispatcher = new Dispatcher(config, _this);
	    _this.ready = _this.__dispatcher.ready;
	    _this.readySync = _this.__dispatcher.readySync;
	    _this.__wrapAsVideo(_this.__dispatcher.videoConfig);
	    return _this;
	  }

	  _createClass(Chimee, [{
	    key: 'destroy',
	    value: function destroy() {
	      if (this.destroyed) return;
	      _get(Chimee.prototype.__proto__ || _Object$getPrototypeOf(Chimee.prototype), '__destroy', this).call(this);
	      this.__dispatcher.destroy();
	      // $FlowFixMe: normal obejct define
	      Object.defineProperty(this, '__dispatcher', {
	        get: function get$$1() {
	          throw new Error('This instance has been destroyed.');
	        },

	        enumerable: true,
	        configurable: true
	      });
	      this.destroyed = true;
	    }
	  }, {
	    key: 'use',
	    value: function use(option) {
	      return this.__dispatcher.use(option);
	    }
	  }, {
	    key: 'unuse',
	    value: function unuse(name) {
	      return this.__dispatcher.unuse(name);
	    }
	  }, {
	    key: '__throwError',
	    value: function __throwError(error) {
	      if (isString(error)) error = new Error(error);
	      var errorHandler = this.config.errorHandler || Chimee.config.errorHandler;
	      if (isFunction(errorHandler)) return errorHandler(error);
	      if (Chimee.config.silent) return;
	      /* istanbul ignore else */
	      if (isError(error)) throw error;else console.error(error);
	    }
	  }]);

	  return Chimee;
	}(VideoWrapper), _class3.plugin = Plugin, _class3.config = new GlobalConfig(), _class3.install = Dispatcher.install, _class3.uninstall = Dispatcher.uninstall, _class3.hasInstalled = Dispatcher.hasInstalled, _class3.installKernel = Dispatcher.installKernel, _class3.uninstallKernel = Dispatcher.uninstallKernel, _class3.hasInstalledKernel = Dispatcher.hasInstalledKernel, _class3.getPluginConfig = Dispatcher.getPluginConfig, _temp), (_descriptor$2 = _applyDecoratedDescriptor$8(_class2$2.prototype, '__id', [frozen], {
	  enumerable: true,
	  initializer: function initializer() {
	    return '_vm';
	  }
	}), _descriptor2$1 = _applyDecoratedDescriptor$8(_class2$2.prototype, 'version', [frozen], {
	  enumerable: true,
	  initializer: function initializer() {
	    return '0.10.0-alpha.3';
	  }
	}), _descriptor3$1 = _applyDecoratedDescriptor$8(_class2$2.prototype, 'config', [frozen], {
	  enumerable: true,
	  initializer: function initializer() {
	    return {
	      errorHandler: undefined
	    };
	  }
	}), _applyDecoratedDescriptor$8(_class2$2, 'plugin', [frozen], (_init = _Object$getOwnPropertyDescriptor(_class2$2, 'plugin'), _init = _init ? _init.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'config', [frozen], (_init2 = _Object$getOwnPropertyDescriptor(_class2$2, 'config'), _init2 = _init2 ? _init2.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init2;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'install', [frozen], (_init3 = _Object$getOwnPropertyDescriptor(_class2$2, 'install'), _init3 = _init3 ? _init3.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init3;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'uninstall', [frozen], (_init4 = _Object$getOwnPropertyDescriptor(_class2$2, 'uninstall'), _init4 = _init4 ? _init4.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init4;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'hasInstalled', [frozen], (_init5 = _Object$getOwnPropertyDescriptor(_class2$2, 'hasInstalled'), _init5 = _init5 ? _init5.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init5;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'installKernel', [frozen], (_init6 = _Object$getOwnPropertyDescriptor(_class2$2, 'installKernel'), _init6 = _init6 ? _init6.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init6;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'uninstallKernel', [frozen], (_init7 = _Object$getOwnPropertyDescriptor(_class2$2, 'uninstallKernel'), _init7 = _init7 ? _init7.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init7;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'hasInstalledKernel', [frozen], (_init8 = _Object$getOwnPropertyDescriptor(_class2$2, 'hasInstalledKernel'), _init8 = _init8 ? _init8.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init8;
	  }
	}), _class2$2), _applyDecoratedDescriptor$8(_class2$2, 'getPluginConfig', [frozen], (_init9 = _Object$getOwnPropertyDescriptor(_class2$2, 'getPluginConfig'), _init9 = _init9 ? _init9.value : undefined, {
	  enumerable: true,
	  configurable: true,
	  writable: true,
	  initializer: function initializer() {
	    return _init9;
	  }
	}), _class2$2)), _class2$2)) || _class$9);

	return Chimee;

})));
