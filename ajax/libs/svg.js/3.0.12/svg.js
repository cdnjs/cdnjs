/*!
* @svgdotjs/svg.js - A lightweight library for manipulating and animating SVG.
* @version 3.0.12
* https://svgdotjs.github.io/
*
* @copyright Wout Fierens <wout@mick-wout.com>
* @license MIT
*
* BUILT: Tue Feb 19 2019 17:25:37 GMT+0100 (GMT+01:00)
*/;
var SVG = (function () {
	'use strict';

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

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.7' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
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

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
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

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
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

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: _library ? 'pure' : 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var dP$1 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// 19.2.4.2 name
	NAME in FProto || _descriptors && dP$1(FProto, NAME, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

	function _typeof(obj) {
	  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
	    _typeof = function _typeof(obj) {
	      return _typeof2(obj);
	    };
	  } else {
	    _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
	    };
	  }

	  return _typeof(obj);
	}

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var _iterators = {};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
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
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
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

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) _redefine(target, key, src[key], safe);
	  return target;
	};

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator

	var ITERATOR$1 = _wks('iterator');
	var ArrayProto$1 = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto$1[ITERATOR$1] === it);
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

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
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var ITERATOR$2 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
	  var f = _ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	var SPECIES = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = _global[KEY];
	  if (_descriptors && C && !C[SPECIES]) _objectDp.f(C, SPECIES, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
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
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
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
	  if (!_has(it, META)) {
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
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
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

	var _validateCollection = function (it, TYPE) {
	  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var dP$2 = _objectDp.f;









	var fastKey = _meta.fastKey;

	var SIZE = _descriptors ? '_s' : 'size';

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
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = _objectCreate(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
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
	        var that = _validateCollection(this, NAME);
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
	        _validateCollection(this, NAME);
	        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
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
	        return !!getEntry(_validateCollection(this, NAME), key);
	      }
	    });
	    if (_descriptors) dP$2(C.prototype, 'size', {
	      get: function () {
	        return _validateCollection(this, NAME)[SIZE];
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
	    _iterDefine(C, NAME, function (iterated, kind) {
	      this._t = _validateCollection(iterated, NAME); // target
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
	        return _iterStep(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return _iterStep(0, entry.k);
	      if (kind == 'values') return _iterStep(0, entry.v);
	      return _iterStep(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    _setSpecies(NAME);
	  }
	};

	var ITERATOR$3 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$3]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$3] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$3 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$3
	};

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
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

	var setPrototypeOf = _setProto.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = _global[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  var fixMethod = function (KEY) {
	    var fn = proto[KEY];
	    _redefine(proto, KEY,
	      KEY == 'delete' ? function (a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    _redefineAll(C.prototype, methods);
	    _meta.NEED = true;
	  } else {
	    var instance = new C();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = _fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    var ACCEPT_ITERABLES = _iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        _anInstance(target, C, NAME);
	        var that = _inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
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

	  _setToStringTag(C, NAME);

	  O[NAME] = C;
	  _export(_export.G + _export.W + _export.F * (C != Base), O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var SET = 'Set';

	// 23.2 Set Objects
	var es6_set = _collection(SET, function (get) {
	  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, _collectionStrong);

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  }
	}

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	}

	var f$4 = _wks;

	var _wksExt = {
		f: f$4
	};

	var defineProperty = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
	};

	_wksDefine('asyncIterator');

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$5
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$6 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$6
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;



















	var gOPD$1 = _objectGopd.f;
	var dP$3 = _objectDp.f;
	var gOPN$1 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$3({}, 'a', {
	    get: function () { return dP$3(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$1(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$3(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$3(ObjectProto$1, key, protoDesc);
	} : dP$3;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$3(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$3(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$1(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$1(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)_wks(es6Symbols[j++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
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

	_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
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
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
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
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	var ITERATOR$4 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;

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

	for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
	  var NAME$1 = collections[i];
	  var explicit = DOMIterables[NAME$1];
	  var Collection = _global[NAME$1];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR$4]) _hide(proto, ITERATOR$4, ArrayValues);
	    if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME$1);
	    _iterators[NAME$1] = ArrayValues;
	    if (explicit) for (key in es6_array_iterator) if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
	  }
	}

	var methods = {};
	var names = [];
	function registerMethods(name, m) {
	  if (Array.isArray(name)) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = name[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var _name = _step.value;
	        registerMethods(_name, m);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return != null) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    return;
	  }

	  if (_typeof(name) === 'object') {
	    for (var _name2 in name) {
	      registerMethods(_name2, name[_name2]);
	    }

	    return;
	  }

	  addMethodNames(Object.getOwnPropertyNames(m));
	  methods[name] = Object.assign(methods[name] || {}, m);
	}
	function getMethodsFor(name) {
	  return methods[name] || {};
	}
	function getMethodNames() {
	  return _toConsumableArray(new Set(names));
	}
	function addMethodNames(_names) {
	  names.push.apply(names, _toConsumableArray(_names));
	}

	// https://github.com/tc39/Array.prototype.includes

	var $includes = _arrayIncludes(true);

	_export(_export.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(_defined(that));
	};

	var MATCH$1 = _wks('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var INCLUDES = 'includes';

	_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~_stringContext(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks(KEY);
	  var fns = exec(_defined, SYMBOL, ''[KEY]);
	  var strfn = fns[0];
	  var rxfn = fns[1];
	  if (_fails(function () {
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  })) {
	    _redefine(String.prototype, KEY, strfn);
	    _hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	// @@replace logic
	_fixReWks('replace', 2, function (defined, REPLACE, $replace) {
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue) {
	    var O = defined(this);
	    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});

	// Map function
	function map(array, block) {
	  var i;
	  var il = array.length;
	  var result = [];

	  for (i = 0; i < il; i++) {
	    result.push(block(array[i]));
	  }

	  return result;
	} // Filter function

	function filter(array, block) {
	  var i;
	  var il = array.length;
	  var result = [];

	  for (i = 0; i < il; i++) {
	    if (block(array[i])) {
	      result.push(array[i]);
	    }
	  }

	  return result;
	} // Degrees to radians

	function radians(d) {
	  return d % 360 * Math.PI / 180;
	} // Radians to degrees

	function degrees(r) {
	  return r * 180 / Math.PI % 360;
	} // Convert dash-separated-string to camelCase

	function camelCase(s) {
	  return s.toLowerCase().replace(/-(.)/g, function (m, g) {
	    return g.toUpperCase();
	  });
	} // Convert camel cased string to string seperated

	function unCamelCase(s) {
	  return s.replace(/([A-Z])/g, function (m, g) {
	    return '-' + g.toLowerCase();
	  });
	} // Capitalize first letter of a string

	function capitalize(s) {
	  return s.charAt(0).toUpperCase() + s.slice(1);
	} // Calculate proportional width and height values when necessary

	function proportionalSize(element, width, height, box) {
	  if (width == null || height == null) {
	    box = box || element.bbox();

	    if (width == null) {
	      width = box.width / box.height * height;
	    } else if (height == null) {
	      height = box.height / box.width * width;
	    }
	  }

	  return {
	    width: width,
	    height: height
	  };
	}
	function getOrigin(o, element) {
	  // Allow origin or around as the names
	  var origin = o.origin; // o.around == null ? o.origin : o.around

	  var ox, oy; // Allow the user to pass a string to rotate around a given point

	  if (typeof origin === 'string' || origin == null) {
	    // Get the bounding box of the element with no transformations applied
	    var string = (origin || 'center').toLowerCase().trim();

	    var _element$bbox = element.bbox(),
	        height = _element$bbox.height,
	        width = _element$bbox.width,
	        x = _element$bbox.x,
	        y = _element$bbox.y; // Calculate the transformed x and y coordinates


	    var bx = string.includes('left') ? x : string.includes('right') ? x + width : x + width / 2;
	    var by = string.includes('top') ? y : string.includes('bottom') ? y + height : y + height / 2; // Set the bounds eg : "bottom-left", "Top right", "middle" etc...

	    ox = o.ox != null ? o.ox : bx;
	    oy = o.oy != null ? o.oy : by;
	  } else {
	    ox = origin[0];
	    oy = origin[1];
	  } // Return the origin as it is if it wasn't a string


	  return [ox, oy];
	}

	var utils = ({
		map: map,
		filter: filter,
		radians: radians,
		degrees: degrees,
		camelCase: camelCase,
		unCamelCase: unCamelCase,
		capitalize: capitalize,
		proportionalSize: proportionalSize,
		getOrigin: getOrigin
	});

	// Default namespaces
	var ns = 'http://www.w3.org/2000/svg';
	var xmlns = 'http://www.w3.org/2000/xmlns/';
	var xlink = 'http://www.w3.org/1999/xlink';
	var svgjs = 'http://svgjs.com/svgjs';

	var namespaces = ({
		ns: ns,
		xmlns: xmlns,
		xlink: xlink,
		svgjs: svgjs
	});

	var globals = {
	  window: typeof window === 'undefined' ? null : window,
	  document: typeof document === 'undefined' ? null : document
	};
	function registerWindow() {
	  var win = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	  var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	  globals.window = win;
	  globals.document = doc;
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var Base = function Base() {
	  _classCallCheck(this, Base);
	};

	var elements = {};
	var root = '___SYMBOL___ROOT___'; // Method for element creation

	function create(name) {
	  // create element
	  return globals.document.createElementNS(ns, name);
	}
	function makeInstance(element) {
	  if (element instanceof Base) return element;

	  if (_typeof(element) === 'object') {
	    return adopter(element);
	  }

	  if (element == null) {
	    return new elements[root]();
	  }

	  if (typeof element === 'string' && element.charAt(0) !== '<') {
	    return adopter(globals.document.querySelector(element));
	  }

	  var node = create('svg');
	  node.innerHTML = element; // We can use firstChild here because we know,
	  // that the first char is < and thus an element

	  element = adopter(node.firstChild);
	  return element;
	}
	function nodeOrNew(name, node) {
	  return node instanceof globals.window.Node ? node : create(name);
	} // Adopt existing svg elements

	function adopt(node) {
	  // check for presence of node
	  if (!node) return null; // make sure a node isn't already adopted

	  if (node.instance instanceof Base) return node.instance; // initialize variables

	  var className = capitalize(node.nodeName || 'Dom'); // Make sure that gradients are adopted correctly

	  if (className === 'LinearGradient' || className === 'RadialGradient') {
	    className = 'Gradient'; // Fallback to Dom if element is not known
	  } else if (!elements[className]) {
	    className = 'Dom';
	  }

	  return new elements[className](node);
	}
	var adopter = adopt;
	function mockAdopt() {
	  var mock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : adopt;
	  adopter = mock;
	}
	function register(element) {
	  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : element.name;
	  var asRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	  elements[name] = element;
	  if (asRoot) elements[root] = element;
	  addMethodNames(Object.getOwnPropertyNames(element.prototype));
	  return element;
	}
	function getClass(name) {
	  return elements[name];
	} // Element id sequence

	var did = 1000; // Get next named element id

	function eid(name) {
	  return 'Svgjs' + capitalize(name) + did++;
	} // Deep new id assignment

	function assignNewId(node) {
	  // do the same for SVG child nodes as well
	  for (var i = node.children.length - 1; i >= 0; i--) {
	    assignNewId(node.children[i]);
	  }

	  if (node.id) {
	    return adopt(node).id(eid(node.nodeName));
	  }

	  return adopt(node);
	} // Method for extending objects

	function extend(modules, methods, attrCheck) {
	  var key, i;
	  modules = Array.isArray(modules) ? modules : [modules];

	  for (i = modules.length - 1; i >= 0; i--) {
	    for (key in methods) {
	      var method = methods[key];

	      if (attrCheck) {
	        method = wrapWithAttrCheck(methods[key]);
	      }

	      modules[i].prototype[key] = method;
	    }
	  }
	} // export function extendWithAttrCheck (...args) {
	//   extend(...args, true)
	// }

	function wrapWithAttrCheck(fn) {
	  return function () {
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var o = args[args.length - 1];

	    if (o && o.constructor === Object && !(o instanceof Array)) {
	      return fn.apply(this, args.slice(0, -1)).attr(o);
	    } else {
	      return fn.apply(this, args);
	    }
	  };
	}
	function invent(config) {
	  // Create element initializer
	  var initializer = typeof config.create === 'function' ? config.create : function (node) {
	    this.constructor(node || create(config.create));
	  }; // Inherit prototype

	  if (config.inherit) {
	    /* eslint new-cap: off */
	    initializer.prototype = new config.inherit();
	    initializer.prototype.constructor = initializer;
	  } // Extend with methods


	  if (config.extend) {
	    extend(initializer, config.extend);
	  } // Attach construct method to parent


	  if (config.construct) {
	    extend(config.parent || elements['Container'], config.construct);
	  }

	  return initializer;
	}

	function siblings() {
	  return this.parent().children();
	} // Get the curent position siblings

	function position() {
	  return this.parent().index(this);
	} // Get the next element (will return null if there is none)

	function next() {
	  return this.siblings()[this.position() + 1];
	} // Get the next element (will return null if there is none)

	function prev() {
	  return this.siblings()[this.position() - 1];
	} // Send given element one step forward

	function forward() {
	  var i = this.position() + 1;
	  var p = this.parent(); // move node one step forward

	  p.removeElement(this).add(this, i); // make sure defs node is always at the top

	  if (typeof p.isRoot === 'function' && p.isRoot()) {
	    p.node.appendChild(p.defs().node);
	  }

	  return this;
	} // Send given element one step backward

	function backward() {
	  var i = this.position();

	  if (i > 0) {
	    this.parent().removeElement(this).add(this, i - 1);
	  }

	  return this;
	} // Send given element all the way to the front

	function front() {
	  var p = this.parent(); // Move node forward

	  p.node.appendChild(this.node); // Make sure defs node is always at the top

	  if (typeof p.isRoot === 'function' && p.isRoot()) {
	    p.node.appendChild(p.defs().node);
	  }

	  return this;
	} // Send given element all the way to the back

	function back() {
	  if (this.position() > 0) {
	    this.parent().removeElement(this).add(this, 0);
	  }

	  return this;
	} // Inserts a given element before the targeted element

	function before(element) {
	  element = makeInstance(element);
	  element.remove();
	  var i = this.position();
	  this.parent().add(element, i);
	  return this;
	} // Inserts a given element after the targeted element

	function after(element) {
	  element = makeInstance(element);
	  element.remove();
	  var i = this.position();
	  this.parent().add(element, i + 1);
	  return this;
	}
	function insertBefore(element) {
	  element = makeInstance(element);
	  element.before(this);
	  return this;
	}
	function insertAfter(element) {
	  element = makeInstance(element);
	  element.after(this);
	  return this;
	}
	registerMethods('Dom', {
	  siblings: siblings,
	  position: position,
	  next: next,
	  prev: prev,
	  forward: forward,
	  backward: backward,
	  front: front,
	  back: back,
	  before: before,
	  after: after,
	  insertBefore: insertBefore,
	  insertAfter: insertAfter
	});

	// @@split logic
	_fixReWks('split', 2, function (defined, SPLIT, $split) {
	  var isRegExp = _isRegexp;
	  var _split = $split;
	  var $push = [].push;
	  var $SPLIT = 'split';
	  var LENGTH = 'length';
	  var LAST_INDEX = 'lastIndex';
	  if (
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ) {
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!isRegExp(separator)) return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
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
	            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
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
	    $split = function (separator, limit) {
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

	// Parse unit value
	var numberAndUnit = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i; // Parse hex value

	var hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i; // Parse rgb value

	var rgb = /rgb\((\d+),(\d+),(\d+)\)/; // Parse reference id

	var reference = /(#[a-z0-9\-_]+)/i; // splits a transformation chain

	var transforms = /\)\s*,?\s*/; // Whitespace

	var whitespace = /\s/g; // Test hex value

	var isHex = /^#[a-f0-9]{3,6}$/i; // Test rgb value

	var isRgb = /^rgb\(/; // Test css declaration

	var isCss = /[^:]+:[^;]+;?/; // Test for blank string

	var isBlank = /^(\s+)?$/; // Test for numeric string

	var isNumber = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i; // Test for percent value

	var isPercent = /^-?[\d.]+%$/; // Test for image url

	var isImage = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i; // split at whitespace and comma

	var delimiter = /[\s,]+/; // The following regex are used to parse the d attribute of a path
	// Matches all hyphens which are not after an exponent

	var hyphen = /([^e])-/gi; // Replaces and tests for all path letters

	var pathLetters = /[MLHVCSQTAZ]/gi; // yes we need this one, too

	var isPathLetter = /[MLHVCSQTAZ]/i; // matches 0.154.23.45

	var numbersWithDots = /((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi; // matches .

	var dots = /\./g;

	var regex = ({
		numberAndUnit: numberAndUnit,
		hex: hex,
		rgb: rgb,
		reference: reference,
		transforms: transforms,
		whitespace: whitespace,
		isHex: isHex,
		isRgb: isRgb,
		isCss: isCss,
		isBlank: isBlank,
		isNumber: isNumber,
		isPercent: isPercent,
		isImage: isImage,
		delimiter: delimiter,
		hyphen: hyphen,
		pathLetters: pathLetters,
		isPathLetter: isPathLetter,
		numbersWithDots: numbersWithDots,
		dots: dots
	});

	function classes() {
	  var attr = this.attr('class');
	  return attr == null ? [] : attr.trim().split(delimiter);
	} // Return true if class exists on the node, false otherwise

	function hasClass(name) {
	  return this.classes().indexOf(name) !== -1;
	} // Add class to the node

	function addClass(name) {
	  if (!this.hasClass(name)) {
	    var array = this.classes();
	    array.push(name);
	    this.attr('class', array.join(' '));
	  }

	  return this;
	} // Remove class from the node

	function removeClass(name) {
	  if (this.hasClass(name)) {
	    this.attr('class', this.classes().filter(function (c) {
	      return c !== name;
	    }).join(' '));
	  }

	  return this;
	} // Toggle the presence of a class on the node

	function toggleClass(name) {
	  return this.hasClass(name) ? this.removeClass(name) : this.addClass(name);
	}
	registerMethods('Dom', {
	  classes: classes,
	  hasClass: hasClass,
	  addClass: addClass,
	  removeClass: removeClass,
	  toggleClass: toggleClass
	});

	function css(style, val) {
	  var ret = {};

	  if (arguments.length === 0) {
	    // get full style as object
	    this.node.style.cssText.split(/\s*;\s*/).filter(function (el) {
	      return !!el.length;
	    }).forEach(function (el) {
	      var t = el.split(/\s*:\s*/);
	      ret[t[0]] = t[1];
	    });
	    return ret;
	  }

	  if (arguments.length < 2) {
	    // get style properties in the array
	    if (Array.isArray(style)) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = style[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var name = _step.value;
	          var cased = camelCase(name);
	          ret[cased] = this.node.style[cased];
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return != null) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      return ret;
	    } // get style for property


	    if (typeof style === 'string') {
	      return this.node.style[camelCase(style)];
	    } // set styles in object


	    if (_typeof(style) === 'object') {
	      for (var _name in style) {
	        // set empty string if null/undefined/'' was given
	        this.node.style[camelCase(_name)] = style[_name] == null || isBlank.test(style[_name]) ? '' : style[_name];
	      }
	    }
	  } // set style for property


	  if (arguments.length === 2) {
	    this.node.style[camelCase(style)] = val == null || isBlank.test(val) ? '' : val;
	  }

	  return this;
	} // Show element

	function show() {
	  return this.css('display', '');
	} // Hide element

	function hide() {
	  return this.css('display', 'none');
	} // Is element visible?

	function visible() {
	  return this.css('display') !== 'none';
	}
	registerMethods('Dom', {
	  css: css,
	  show: show,
	  hide: hide,
	  visible: visible
	});

	function data(a, v, r) {
	  if (_typeof(a) === 'object') {
	    for (v in a) {
	      this.data(v, a[v]);
	    }
	  } else if (arguments.length < 2) {
	    try {
	      return JSON.parse(this.attr('data-' + a));
	    } catch (e) {
	      return this.attr('data-' + a);
	    }
	  } else {
	    this.attr('data-' + a, v === null ? null : r === true || typeof v === 'string' || typeof v === 'number' ? v : JSON.stringify(v));
	  }

	  return this;
	}
	registerMethods('Dom', {
	  data: data
	});

	function remember(k, v) {
	  // remember every item in an object individually
	  if (_typeof(arguments[0]) === 'object') {
	    for (var key in k) {
	      this.remember(key, k[key]);
	    }
	  } else if (arguments.length === 1) {
	    // retrieve memory
	    return this.memory()[k];
	  } else {
	    // store memory
	    this.memory()[k] = v;
	  }

	  return this;
	} // Erase a given memory

	function forget() {
	  if (arguments.length === 0) {
	    this._memory = {};
	  } else {
	    for (var i = arguments.length - 1; i >= 0; i--) {
	      delete this.memory()[arguments[i]];
	    }
	  }

	  return this;
	} // This triggers creation of a new hidden class which is not performant
	// However, this function is not rarely used so it will not happen frequently
	// Return local memory object

	function memory() {
	  return this._memory = this._memory || {};
	}
	registerMethods('Dom', {
	  remember: remember,
	  forget: forget,
	  memory: memory
	});

	var listenerId = 0;
	var windowEvents = {};

	function getEvents(instance) {
	  var n = instance.getEventHolder(); // We dont want to save events in global space

	  if (n === globals.window) n = windowEvents;
	  if (!n.events) n.events = {};
	  return n.events;
	}

	function getEventTarget(instance) {
	  return instance.getEventTarget();
	}

	function clearEvents(instance) {
	  var n = instance.getEventHolder();
	  if (n.events) n.events = {};
	} // Add event binder in the SVG namespace


	function on(node, events, listener, binding, options) {
	  var l = listener.bind(binding || node);
	  var instance = makeInstance(node);
	  var bag = getEvents(instance);
	  var n = getEventTarget(instance); // events can be an array of events or a string of events

	  events = Array.isArray(events) ? events : events.split(delimiter); // add id to listener

	  if (!listener._svgjsListenerId) {
	    listener._svgjsListenerId = ++listenerId;
	  }

	  events.forEach(function (event) {
	    var ev = event.split('.')[0];
	    var ns = event.split('.')[1] || '*'; // ensure valid object

	    bag[ev] = bag[ev] || {};
	    bag[ev][ns] = bag[ev][ns] || {}; // reference listener

	    bag[ev][ns][listener._svgjsListenerId] = l; // add listener

	    n.addEventListener(ev, l, options || false);
	  });
	} // Add event unbinder in the SVG namespace

	function off(node, events, listener, options) {
	  var instance = makeInstance(node);
	  var bag = getEvents(instance);
	  var n = getEventTarget(instance); // listener can be a function or a number

	  if (typeof listener === 'function') {
	    listener = listener._svgjsListenerId;
	    if (!listener) return;
	  } // events can be an array of events or a string or undefined


	  events = Array.isArray(events) ? events : (events || '').split(delimiter);
	  events.forEach(function (event) {
	    var ev = event && event.split('.')[0];
	    var ns = event && event.split('.')[1];
	    var namespace, l;

	    if (listener) {
	      // remove listener reference
	      if (bag[ev] && bag[ev][ns || '*']) {
	        // removeListener
	        n.removeEventListener(ev, bag[ev][ns || '*'][listener], options || false);
	        delete bag[ev][ns || '*'][listener];
	      }
	    } else if (ev && ns) {
	      // remove all listeners for a namespaced event
	      if (bag[ev] && bag[ev][ns]) {
	        for (l in bag[ev][ns]) {
	          off(n, [ev, ns].join('.'), l);
	        }

	        delete bag[ev][ns];
	      }
	    } else if (ns) {
	      // remove all listeners for a specific namespace
	      for (event in bag) {
	        for (namespace in bag[event]) {
	          if (ns === namespace) {
	            off(n, [event, ns].join('.'));
	          }
	        }
	      }
	    } else if (ev) {
	      // remove all listeners for the event
	      if (bag[ev]) {
	        for (namespace in bag[ev]) {
	          off(n, [ev, namespace].join('.'));
	        }

	        delete bag[ev];
	      }
	    } else {
	      // remove all listeners on a given node
	      for (event in bag) {
	        off(n, event);
	      }

	      clearEvents(instance);
	    }
	  });
	}
	function dispatch(node, event, data) {
	  var n = getEventTarget(node); // Dispatch event

	  if (event instanceof globals.window.Event) {
	    n.dispatchEvent(event);
	  } else {
	    event = new globals.window.CustomEvent(event, {
	      detail: data,
	      cancelable: true
	    });
	    n.dispatchEvent(event);
	  }

	  return event;
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArrayLimit(arr, i) {
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = _anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	// 21.2.5.3 get RegExp.prototype.flags()
	if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: _flags
	});

	var TO_STRING = 'toString';
	var $toString = /./[TO_STRING];

	var define = function (fn) {
	  _redefine(RegExp.prototype, TO_STRING, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (_fails(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
	  define(function toString() {
	    var R = _anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
	  define(function toString() {
	    return $toString.call(this);
	  });
	}

	function sixDigitHex(hex$$1) {
	  return hex$$1.length === 4 ? ['#', hex$$1.substring(1, 2), hex$$1.substring(1, 2), hex$$1.substring(2, 3), hex$$1.substring(2, 3), hex$$1.substring(3, 4), hex$$1.substring(3, 4)].join('') : hex$$1;
	}

	function componentHex(component) {
	  var integer = Math.round(component);
	  var bounded = Math.max(0, Math.min(255, integer));
	  var hex$$1 = bounded.toString(16);
	  return hex$$1.length === 1 ? '0' + hex$$1 : hex$$1;
	}

	function is$1(object, space) {
	  for (var i = space.length; i--;) {
	    if (object[space[i]] == null) {
	      return false;
	    }
	  }

	  return true;
	}

	function getParameters(a, b) {
	  var params = is$1(a, 'rgb') ? {
	    _a: a.r,
	    _b: a.g,
	    _c: a.b,
	    space: 'rgb'
	  } : is$1(a, 'xyz') ? {
	    _a: a.x,
	    _b: a.y,
	    _c: a.z,
	    _d: 0,
	    space: 'xyz'
	  } : is$1(a, 'hsl') ? {
	    _a: a.h,
	    _b: a.s,
	    _c: a.l,
	    _d: 0,
	    space: 'hsl'
	  } : is$1(a, 'lab') ? {
	    _a: a.l,
	    _b: a.a,
	    _c: a.b,
	    _d: 0,
	    space: 'lab'
	  } : is$1(a, 'lch') ? {
	    _a: a.l,
	    _b: a.c,
	    _c: a.h,
	    _d: 0,
	    space: 'lch'
	  } : is$1(a, 'cmyk') ? {
	    _a: a.c,
	    _b: a.m,
	    _c: a.y,
	    _d: a.k,
	    space: 'cmyk'
	  } : {
	    _a: 0,
	    _b: 0,
	    _c: 0,
	    space: 'rgb'
	  };
	  params.space = b || params.space;
	  return params;
	}

	function cieSpace(space) {
	  if (space === 'lab' || space === 'xyz' || space === 'lch') {
	    return true;
	  } else {
	    return false;
	  }
	}

	function hueToRgb(p, q, t) {
	  if (t < 0) t += 1;
	  if (t > 1) t -= 1;
	  if (t < 1 / 6) return p + (q - p) * 6 * t;
	  if (t < 1 / 2) return q;
	  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	  return p;
	}

	var Color =
	/*#__PURE__*/
	function () {
	  function Color() {
	    _classCallCheck(this, Color);

	    this.init.apply(this, arguments);
	  }

	  _createClass(Color, [{
	    key: "init",
	    value: function init() {
	      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	      var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	      var space = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'rgb';
	      // This catches the case when a falsy value is passed like ''
	      a = !a ? 0 : a; // Reset all values in case the init function is rerun with new color space

	      if (this.space) {
	        for (var component in this.space) {
	          delete this[this.space[component]];
	        }
	      }

	      if (typeof a === 'number') {
	        // Allow for the case that we don't need d...
	        space = typeof d === 'string' ? d : space;
	        d = typeof d === 'string' ? 0 : d; // Assign the values straight to the color

	        Object.assign(this, {
	          _a: a,
	          _b: b,
	          _c: c,
	          _d: d,
	          space: space
	        }); // If the user gave us an array, make the color from it
	      } else if (a instanceof Array) {
	        this.space = b || (typeof a[3] === 'string' ? a[3] : a[4]) || 'rgb';
	        Object.assign(this, {
	          _a: a[0],
	          _b: a[1],
	          _c: a[2],
	          _d: a[3] || 0
	        });
	      } else if (a instanceof Object) {
	        // Set the object up and assign its values directly
	        var values = getParameters(a, b);
	        Object.assign(this, values);
	      } else if (typeof a === 'string') {
	        if (isRgb.test(a)) {
	          var noWhitespace = a.replace(whitespace, '');

	          var _rgb$exec$slice$map = rgb.exec(noWhitespace).slice(1, 4).map(function (v) {
	            return parseInt(v);
	          }),
	              _rgb$exec$slice$map2 = _slicedToArray(_rgb$exec$slice$map, 3),
	              _a2 = _rgb$exec$slice$map2[0],
	              _b2 = _rgb$exec$slice$map2[1],
	              _c2 = _rgb$exec$slice$map2[2];

	          Object.assign(this, {
	            _a: _a2,
	            _b: _b2,
	            _c: _c2,
	            _d: 0,
	            space: 'rgb'
	          });
	        } else if (isHex.test(a)) {
	          var hexParse = function hexParse(v) {
	            return parseInt(v, 16);
	          };

	          var _hex$exec$map = hex.exec(sixDigitHex(a)).map(hexParse),
	              _hex$exec$map2 = _slicedToArray(_hex$exec$map, 4),
	              _a3 = _hex$exec$map2[1],
	              _b3 = _hex$exec$map2[2],
	              _c3 = _hex$exec$map2[3];

	          Object.assign(this, {
	            _a: _a3,
	            _b: _b3,
	            _c: _c3,
	            _d: 0,
	            space: 'rgb'
	          });
	        } else throw Error("Unsupported string format, can't construct Color");
	      } // Now add the components as a convenience


	      var _a = this._a,
	          _b = this._b,
	          _c = this._c,
	          _d = this._d;
	      var components = this.space === 'rgb' ? {
	        r: _a,
	        g: _b,
	        b: _c
	      } : this.space === 'xyz' ? {
	        x: _a,
	        y: _b,
	        z: _c
	      } : this.space === 'hsl' ? {
	        h: _a,
	        s: _b,
	        l: _c
	      } : this.space === 'lab' ? {
	        l: _a,
	        a: _b,
	        b: _c
	      } : this.space === 'lch' ? {
	        l: _a,
	        c: _b,
	        h: _c
	      } : this.space === 'cmyk' ? {
	        c: _a,
	        m: _b,
	        y: _c,
	        k: _d
	      } : {};
	      Object.assign(this, components);
	    }
	    /*
	    Conversion Methods
	    */

	  }, {
	    key: "rgb",
	    value: function rgb$$1() {
	      if (this.space === 'rgb') {
	        return this;
	      } else if (cieSpace(this.space)) {
	        // Convert to the xyz color space
	        var x = this.x,
	            y = this.y,
	            z = this.z;

	        if (this.space === 'lab' || this.space === 'lch') {
	          // Get the values in the lab space
	          var l = this.l,
	              a = this.a,
	              _b4 = this.b;

	          if (this.space === 'lch') {
	            var c = this.c,
	                h = this.h;
	            var dToR = Math.PI / 180;
	            a = c * Math.cos(dToR * h);
	            _b4 = c * Math.sin(dToR * h);
	          } // Undo the nonlinear function


	          var yL = (l + 16) / 116;
	          var xL = a / 500 + yL;
	          var zL = yL - _b4 / 200; // Get the xyz values

	          var ct = 16 / 116;
	          var mx = 0.008856;
	          var nm = 7.787;
	          x = 0.95047 * (Math.pow(xL, 3) > mx ? Math.pow(xL, 3) : (xL - ct) / nm);
	          y = 1.00000 * (Math.pow(yL, 3) > mx ? Math.pow(yL, 3) : (yL - ct) / nm);
	          z = 1.08883 * (Math.pow(zL, 3) > mx ? Math.pow(zL, 3) : (zL - ct) / nm);
	        } // Convert xyz to unbounded rgb values


	        var rU = x * 3.2406 + y * -1.5372 + z * -0.4986;
	        var gU = x * -0.9689 + y * 1.8758 + z * 0.0415;
	        var bU = x * 0.0557 + y * -0.2040 + z * 1.0570; // Convert the values to true rgb values

	        var pow = Math.pow;
	        var bd = 0.0031308;
	        var r = rU > bd ? 1.055 * pow(rU, 1 / 2.4) - 0.055 : 12.92 * rU;
	        var g = gU > bd ? 1.055 * pow(gU, 1 / 2.4) - 0.055 : 12.92 * gU;
	        var b = bU > bd ? 1.055 * pow(bU, 1 / 2.4) - 0.055 : 12.92 * bU; // Make and return the color

	        var color = new Color(255 * r, 255 * g, 255 * b);
	        return color;
	      } else if (this.space === 'hsl') {
	        // https://bgrins.github.io/TinyColor/docs/tinycolor.html
	        // Get the current hsl values
	        var _h = this.h,
	            s = this.s,
	            _l = this.l;
	        _h /= 360;
	        s /= 100;
	        _l /= 100; // If we are grey, then just make the color directly

	        if (s === 0) {
	          _l *= 255;

	          var _color2 = new Color(_l, _l, _l);

	          return _color2;
	        } // TODO I have no idea what this does :D If you figure it out, tell me!


	        var q = _l < 0.5 ? _l * (1 + s) : _l + s - _l * s;
	        var p = 2 * _l - q; // Get the rgb values

	        var _r = 255 * hueToRgb(p, q, _h + 1 / 3);

	        var _g = 255 * hueToRgb(p, q, _h);

	        var _b5 = 255 * hueToRgb(p, q, _h - 1 / 3); // Make a new color


	        var _color = new Color(_r, _g, _b5);

	        return _color;
	      } else if (this.space === 'cmyk') {
	        // https://gist.github.com/felipesabino/5066336
	        // Get the normalised cmyk values
	        var _c4 = this.c,
	            m = this.m,
	            _y = this.y,
	            k = this.k; // Get the rgb values

	        var _r2 = 255 * (1 - Math.min(1, _c4 * (1 - k) + k));

	        var _g2 = 255 * (1 - Math.min(1, m * (1 - k) + k));

	        var _b6 = 255 * (1 - Math.min(1, _y * (1 - k) + k)); // Form the color and return it


	        var _color3 = new Color(_r2, _g2, _b6);

	        return _color3;
	      } else {
	        return this;
	      }
	    }
	  }, {
	    key: "lab",
	    value: function lab() {
	      // Get the xyz color
	      var _this$xyz = this.xyz(),
	          x = _this$xyz.x,
	          y = _this$xyz.y,
	          z = _this$xyz.z; // Get the lab components


	      var l = 116 * y - 16;
	      var a = 500 * (x - y);
	      var b = 200 * (y - z); // Construct and return a new color

	      var color = new Color(l, a, b, 'lab');
	      return color;
	    }
	  }, {
	    key: "xyz",
	    value: function xyz() {
	      // Normalise the red, green and blue values
	      var _this$rgb = this.rgb(),
	          r255 = _this$rgb._a,
	          g255 = _this$rgb._b,
	          b255 = _this$rgb._c;

	      var _map = [r255, g255, b255].map(function (v) {
	        return v / 255;
	      }),
	          _map2 = _slicedToArray(_map, 3),
	          r = _map2[0],
	          g = _map2[1],
	          b = _map2[2]; // Convert to the lab rgb space


	      var rL = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
	      var gL = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
	      var bL = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92; // Convert to the xyz color space without bounding the values

	      var xU = (rL * 0.4124 + gL * 0.3576 + bL * 0.1805) / 0.95047;
	      var yU = (rL * 0.2126 + gL * 0.7152 + bL * 0.0722) / 1.00000;
	      var zU = (rL * 0.0193 + gL * 0.1192 + bL * 0.9505) / 1.08883; // Get the proper xyz values by applying the bounding

	      var x = xU > 0.008856 ? Math.pow(xU, 1 / 3) : 7.787 * xU + 16 / 116;
	      var y = yU > 0.008856 ? Math.pow(yU, 1 / 3) : 7.787 * yU + 16 / 116;
	      var z = zU > 0.008856 ? Math.pow(zU, 1 / 3) : 7.787 * zU + 16 / 116; // Make and return the color

	      var color = new Color(x, y, z, 'xyz');
	      return color;
	    }
	  }, {
	    key: "lch",
	    value: function lch() {
	      // Get the lab color directly
	      var _this$lab = this.lab(),
	          l = _this$lab.l,
	          a = _this$lab.a,
	          b = _this$lab.b; // Get the chromaticity and the hue using polar coordinates


	      var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
	      var h = 180 * Math.atan2(b, a) / Math.PI;

	      if (h < 0) {
	        h *= -1;
	        h = 360 - h;
	      } // Make a new color and return it


	      var color = new Color(l, c, h, 'lch');
	      return color;
	    }
	  }, {
	    key: "hsl",
	    value: function hsl() {
	      // Get the rgb values
	      var _this$rgb2 = this.rgb(),
	          _a = _this$rgb2._a,
	          _b = _this$rgb2._b,
	          _c = _this$rgb2._c;

	      var _map3 = [_a, _b, _c].map(function (v) {
	        return v / 255;
	      }),
	          _map4 = _slicedToArray(_map3, 3),
	          r = _map4[0],
	          g = _map4[1],
	          b = _map4[2]; // Find the maximum and minimum values to get the lightness


	      var max = Math.max(r, g, b);
	      var min = Math.min(r, g, b);
	      var l = (max + min) / 2; // If the r, g, v values are identical then we are grey

	      var isGrey = max === min; // Calculate the hue and saturation

	      var delta = max - min;
	      var s = isGrey ? 0 : l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
	      var h = isGrey ? 0 : max === r ? ((g - b) / delta + (g < b ? 6 : 0)) / 6 : max === g ? ((b - r) / delta + 2) / 6 : max === b ? ((r - g) / delta + 4) / 6 : 0; // Construct and return the new color

	      var color = new Color(360 * h, 100 * s, 100 * l, 'hsl');
	      return color;
	    }
	  }, {
	    key: "cmyk",
	    value: function cmyk() {
	      // Get the rgb values for the current color
	      var _this$rgb3 = this.rgb(),
	          _a = _this$rgb3._a,
	          _b = _this$rgb3._b,
	          _c = _this$rgb3._c;

	      var _map5 = [_a, _b, _c].map(function (v) {
	        return v / 255;
	      }),
	          _map6 = _slicedToArray(_map5, 3),
	          r = _map6[0],
	          g = _map6[1],
	          b = _map6[2]; // Get the cmyk values in an unbounded format


	      var k = Math.min(1 - r, 1 - g, 1 - b);

	      if (k === 1) {
	        // Catch the black case
	        return new Color(0, 0, 0, 1, 'cmyk');
	      }

	      var c = (1 - r - k) / (1 - k);
	      var m = (1 - g - k) / (1 - k);
	      var y = (1 - b - k) / (1 - k); // Construct the new color

	      var color = new Color(c, m, y, k, 'cmyk');
	      return color;
	    }
	    /*
	    Input and Output methods
	    */

	  }, {
	    key: "_clamped",
	    value: function _clamped() {
	      var _this$rgb4 = this.rgb(),
	          _a = _this$rgb4._a,
	          _b = _this$rgb4._b,
	          _c = _this$rgb4._c;

	      var max = Math.max,
	          min = Math.min,
	          round = Math.round;

	      var format = function format(v) {
	        return max(0, min(round(v), 255));
	      };

	      return [_a, _b, _c].map(format);
	    }
	  }, {
	    key: "toHex",
	    value: function toHex() {
	      var _this$_clamped$map = this._clamped().map(componentHex),
	          _this$_clamped$map2 = _slicedToArray(_this$_clamped$map, 3),
	          r = _this$_clamped$map2[0],
	          g = _this$_clamped$map2[1],
	          b = _this$_clamped$map2[2];

	      return "#".concat(r).concat(g).concat(b);
	    }
	  }, {
	    key: "toString",
	    value: function toString() {
	      return this.toHex();
	    }
	  }, {
	    key: "toRgb",
	    value: function toRgb() {
	      var _this$_clamped = this._clamped(),
	          _this$_clamped2 = _slicedToArray(_this$_clamped, 3),
	          rV = _this$_clamped2[0],
	          gV = _this$_clamped2[1],
	          bV = _this$_clamped2[2];

	      var string = "rgb(".concat(rV, ",").concat(gV, ",").concat(bV, ")");
	      return string;
	    }
	  }, {
	    key: "toArray",
	    value: function toArray() {
	      var _a = this._a,
	          _b = this._b,
	          _c = this._c,
	          _d = this._d,
	          space = this.space;
	      return [_a, _b, _c, _d, space];
	    }
	    /*
	    Generating random colors
	    */

	  }], [{
	    key: "random",
	    value: function random() {
	      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'vibrant';
	      var t = arguments.length > 1 ? arguments[1] : undefined;
	      // Get the math modules
	      var random = Math.random,
	          round = Math.round,
	          sin = Math.sin,
	          pi = Math.PI; // Run the correct generator

	      if (mode === 'vibrant') {
	        var l = (81 - 57) * random() + 57;
	        var c = (83 - 45) * random() + 45;
	        var h = 360 * random();
	        var color = new Color(l, c, h, 'lch');
	        return color;
	      } else if (mode === 'sine') {
	        t = t == null ? random() : t;
	        var r = round(80 * sin(2 * pi * t / 0.5 + 0.01) + 150);
	        var g = round(50 * sin(2 * pi * t / 0.5 + 4.6) + 200);
	        var b = round(100 * sin(2 * pi * t / 0.5 + 2.3) + 150);

	        var _color4 = new Color(r, g, b);

	        return _color4;
	      } else if (mode === 'pastel') {
	        var _l2 = (94 - 86) * random() + 86;

	        var _c5 = (26 - 9) * random() + 9;

	        var _h2 = 360 * random();

	        var _color5 = new Color(_l2, _c5, _h2, 'lch');

	        return _color5;
	      } else if (mode === 'dark') {
	        var _l3 = 10 + 10 * random();

	        var _c6 = (125 - 75) * random() + 86;

	        var _h3 = 360 * random();

	        var _color6 = new Color(_l3, _c6, _h3, 'lch');

	        return _color6;
	      } else if (mode === 'rgb') {
	        var _r3 = 255 * random();

	        var _g3 = 255 * random();

	        var _b7 = 255 * random();

	        var _color7 = new Color(_r3, _g3, _b7);

	        return _color7;
	      } else if (mode === 'lab') {
	        var _l4 = 100 * random();

	        var a = 256 * random() - 128;

	        var _b8 = 256 * random() - 128;

	        var _color8 = new Color(_l4, a, _b8, 'lab');

	        return _color8;
	      } else if (mode === 'grey') {
	        var grey = 255 * random();

	        var _color9 = new Color(grey, grey, grey);

	        return _color9;
	      }
	    }
	    /*
	    Constructing colors
	    */
	    // Test if given value is a color string

	  }, {
	    key: "test",
	    value: function test(color) {
	      return typeof color === 'string' && (isHex.test(color) || isRgb.test(color));
	    } // Test if given value is an rgb object

	  }, {
	    key: "isRgb",
	    value: function isRgb$$1(color) {
	      return color && typeof color.r === 'number' && typeof color.g === 'number' && typeof color.b === 'number';
	    } // Test if given value is a color

	  }, {
	    key: "isColor",
	    value: function isColor(color) {
	      return color && (color instanceof Color || this.isRgb(color) || this.test(color));
	    }
	  }]);

	  return Color;
	}();

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	// @@match logic
	_fixReWks('match', 1, function (defined, MATCH, $match) {
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp) {
	    var O = defined(this);
	    var fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = _getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    _get = Reflect.get;
	  } else {
	    _get = function _get(target, property, receiver) {
	      var base = _superPropBase(target, property);
	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var gOPN$2 = _objectGopn.f;
	var gOPD$2 = _objectGopd.f;
	var dP$4 = _objectDp.f;
	var $trim = _stringTrim.trim;
	var NUMBER = 'Number';
	var $Number = _global[NUMBER];
	var Base$1 = $Number;
	var proto$1 = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = _cof(_objectCreate(proto$1)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = _toPrimitive(argument, false);
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
	      && (BROKEN_COF ? _fails(function () { proto$1.valueOf.call(that); }) : _cof(that) != NUMBER)
	        ? _inheritIfRequired(new Base$1(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys = _descriptors ? gOPN$2(Base$1) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j$1 = 0, key$1; keys.length > j$1; j$1++) {
	    if (_has(Base$1, key$1 = keys[j$1]) && !_has($Number, key$1)) {
	      dP$4($Number, key$1, gOPD$2(Base$1, key$1));
	    }
	  }
	  $Number.prototype = proto$1;
	  proto$1.constructor = $Number;
	  _redefine(_global, NUMBER, $Number);
	}

	var Point =
	/*#__PURE__*/
	function () {
	  // Initialize
	  function Point() {
	    _classCallCheck(this, Point);

	    this.init.apply(this, arguments);
	  }

	  _createClass(Point, [{
	    key: "init",
	    value: function init(x, y) {
	      var source;
	      var base = {
	        x: 0,
	        y: 0 // ensure source as object

	      };
	      source = Array.isArray(x) ? {
	        x: x[0],
	        y: x[1]
	      } : _typeof(x) === 'object' ? {
	        x: x.x,
	        y: x.y
	      } : {
	        x: x,
	        y: y // merge source

	      };
	      this.x = source.x == null ? base.x : source.x;
	      this.y = source.y == null ? base.y : source.y;
	      return this;
	    } // Clone point

	  }, {
	    key: "clone",
	    value: function clone() {
	      return new Point(this);
	    }
	  }, {
	    key: "transform",
	    value: function transform(m) {
	      return this.clone().transformO(m);
	    } // Transform point with matrix

	  }, {
	    key: "transformO",
	    value: function transformO(m) {
	      if (!Matrix.isMatrixLike(m)) {
	        m = new Matrix(m);
	      }

	      var x = this.x,
	          y = this.y; // Perform the matrix multiplication

	      this.x = m.a * x + m.c * y + m.e;
	      this.y = m.b * x + m.d * y + m.f;
	      return this;
	    }
	  }, {
	    key: "toArray",
	    value: function toArray() {
	      return [this.x, this.y];
	    }
	  }]);

	  return Point;
	}();
	function point(x, y) {
	  return new Point(x, y).transform(this.screenCTM().inverse());
	}

	function closeEnough(a, b, threshold) {
	  return Math.abs(b - a) < (threshold || 1e-6);
	}

	var Matrix =
	/*#__PURE__*/
	function () {
	  function Matrix() {
	    _classCallCheck(this, Matrix);

	    this.init.apply(this, arguments);
	  } // Initialize


	  _createClass(Matrix, [{
	    key: "init",
	    value: function init(source) {
	      var base = Matrix.fromArray([1, 0, 0, 1, 0, 0]); // ensure source as object

	      source = source instanceof Element ? source.matrixify() : typeof source === 'string' ? Matrix.fromArray(source.split(delimiter).map(parseFloat)) : Array.isArray(source) ? Matrix.fromArray(source) : _typeof(source) === 'object' && Matrix.isMatrixLike(source) ? source : _typeof(source) === 'object' ? new Matrix().transform(source) : arguments.length === 6 ? Matrix.fromArray([].slice.call(arguments)) : base; // Merge the source matrix with the base matrix

	      this.a = source.a != null ? source.a : base.a;
	      this.b = source.b != null ? source.b : base.b;
	      this.c = source.c != null ? source.c : base.c;
	      this.d = source.d != null ? source.d : base.d;
	      this.e = source.e != null ? source.e : base.e;
	      this.f = source.f != null ? source.f : base.f;
	      return this;
	    } // Clones this matrix

	  }, {
	    key: "clone",
	    value: function clone() {
	      return new Matrix(this);
	    } // Transform a matrix into another matrix by manipulating the space

	  }, {
	    key: "transform",
	    value: function transform(o) {
	      // Check if o is a matrix and then left multiply it directly
	      if (Matrix.isMatrixLike(o)) {
	        var matrix = new Matrix(o);
	        return matrix.multiplyO(this);
	      } // Get the proposed transformations and the current transformations


	      var t = Matrix.formatTransforms(o);
	      var current = this;

	      var _transform = new Point(t.ox, t.oy).transform(current),
	          ox = _transform.x,
	          oy = _transform.y; // Construct the resulting matrix


	      var transformer = new Matrix().translateO(t.rx, t.ry).lmultiplyO(current).translateO(-ox, -oy).scaleO(t.scaleX, t.scaleY).skewO(t.skewX, t.skewY).shearO(t.shear).rotateO(t.theta).translateO(ox, oy); // If we want the origin at a particular place, we force it there

	      if (isFinite(t.px) || isFinite(t.py)) {
	        var origin = new Point(ox, oy).transform(transformer); // TODO: Replace t.px with isFinite(t.px)

	        var dx = t.px ? t.px - origin.x : 0;
	        var dy = t.py ? t.py - origin.y : 0;
	        transformer.translateO(dx, dy);
	      } // Translate now after positioning


	      transformer.translateO(t.tx, t.ty);
	      return transformer;
	    } // Applies a matrix defined by its affine parameters

	  }, {
	    key: "compose",
	    value: function compose(o) {
	      if (o.origin) {
	        o.originX = o.origin[0];
	        o.originY = o.origin[1];
	      } // Get the parameters


	      var ox = o.originX || 0;
	      var oy = o.originY || 0;
	      var sx = o.scaleX || 1;
	      var sy = o.scaleY || 1;
	      var lam = o.shear || 0;
	      var theta = o.rotate || 0;
	      var tx = o.translateX || 0;
	      var ty = o.translateY || 0; // Apply the standard matrix

	      var result = new Matrix().translateO(-ox, -oy).scaleO(sx, sy).shearO(lam).rotateO(theta).translateO(tx, ty).lmultiplyO(this).translateO(ox, oy);
	      return result;
	    } // Decomposes this matrix into its affine parameters

	  }, {
	    key: "decompose",
	    value: function decompose() {
	      var cx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var cy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      // Get the parameters from the matrix
	      var a = this.a;
	      var b = this.b;
	      var c = this.c;
	      var d = this.d;
	      var e = this.e;
	      var f = this.f; // Figure out if the winding direction is clockwise or counterclockwise

	      var determinant = a * d - b * c;
	      var ccw = determinant > 0 ? 1 : -1; // Since we only shear in x, we can use the x basis to get the x scale
	      // and the rotation of the resulting matrix

	      var sx = ccw * Math.sqrt(a * a + b * b);
	      var thetaRad = Math.atan2(ccw * b, ccw * a);
	      var theta = 180 / Math.PI * thetaRad;
	      var ct = Math.cos(thetaRad);
	      var st = Math.sin(thetaRad); // We can then solve the y basis vector simultaneously to get the other
	      // two affine parameters directly from these parameters

	      var lam = (a * c + b * d) / determinant;
	      var sy = c * sx / (lam * a - b) || d * sx / (lam * b + a); // Use the translations

	      var tx = e - cx + cx * ct * sx + cy * (lam * ct * sx - st * sy);
	      var ty = f - cy + cx * st * sx + cy * (lam * st * sx + ct * sy); // Construct the decomposition and return it

	      return {
	        // Return the affine parameters
	        scaleX: sx,
	        scaleY: sy,
	        shear: lam,
	        rotate: theta,
	        translateX: tx,
	        translateY: ty,
	        originX: cx,
	        originY: cy,
	        // Return the matrix parameters
	        a: this.a,
	        b: this.b,
	        c: this.c,
	        d: this.d,
	        e: this.e,
	        f: this.f
	      };
	    } // Left multiplies by the given matrix

	  }, {
	    key: "multiply",
	    value: function multiply(matrix) {
	      return this.clone().multiplyO(matrix);
	    }
	  }, {
	    key: "multiplyO",
	    value: function multiplyO(matrix) {
	      // Get the matrices
	      var l = this;
	      var r = matrix instanceof Matrix ? matrix : new Matrix(matrix);
	      return Matrix.matrixMultiply(l, r, this);
	    }
	  }, {
	    key: "lmultiply",
	    value: function lmultiply(matrix) {
	      return this.clone().lmultiplyO(matrix);
	    }
	  }, {
	    key: "lmultiplyO",
	    value: function lmultiplyO(matrix) {
	      var r = this;
	      var l = matrix instanceof Matrix ? matrix : new Matrix(matrix);
	      return Matrix.matrixMultiply(l, r, this);
	    } // Inverses matrix

	  }, {
	    key: "inverseO",
	    value: function inverseO() {
	      // Get the current parameters out of the matrix
	      var a = this.a;
	      var b = this.b;
	      var c = this.c;
	      var d = this.d;
	      var e = this.e;
	      var f = this.f; // Invert the 2x2 matrix in the top left

	      var det = a * d - b * c;
	      if (!det) throw new Error('Cannot invert ' + this); // Calculate the top 2x2 matrix

	      var na = d / det;
	      var nb = -b / det;
	      var nc = -c / det;
	      var nd = a / det; // Apply the inverted matrix to the top right

	      var ne = -(na * e + nc * f);
	      var nf = -(nb * e + nd * f); // Construct the inverted matrix

	      this.a = na;
	      this.b = nb;
	      this.c = nc;
	      this.d = nd;
	      this.e = ne;
	      this.f = nf;
	      return this;
	    }
	  }, {
	    key: "inverse",
	    value: function inverse() {
	      return this.clone().inverseO();
	    } // Translate matrix

	  }, {
	    key: "translate",
	    value: function translate(x, y) {
	      return this.clone().translateO(x, y);
	    }
	  }, {
	    key: "translateO",
	    value: function translateO(x, y) {
	      this.e += x || 0;
	      this.f += y || 0;
	      return this;
	    } // Scale matrix

	  }, {
	    key: "scale",
	    value: function scale(x, y, cx, cy) {
	      var _this$clone;

	      return (_this$clone = this.clone()).scaleO.apply(_this$clone, arguments);
	    }
	  }, {
	    key: "scaleO",
	    value: function scaleO(x) {
	      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
	      var cx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	      var cy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	      // Support uniform scaling
	      if (arguments.length === 3) {
	        cy = cx;
	        cx = y;
	        y = x;
	      }

	      var a = this.a,
	          b = this.b,
	          c = this.c,
	          d = this.d,
	          e = this.e,
	          f = this.f;
	      this.a = a * x;
	      this.b = b * y;
	      this.c = c * x;
	      this.d = d * y;
	      this.e = e * x - cx * x + cx;
	      this.f = f * y - cy * y + cy;
	      return this;
	    } // Rotate matrix

	  }, {
	    key: "rotate",
	    value: function rotate(r, cx, cy) {
	      return this.clone().rotateO(r, cx, cy);
	    }
	  }, {
	    key: "rotateO",
	    value: function rotateO(r) {
	      var cx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var cy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	      // Convert degrees to radians
	      r = radians(r);
	      var cos = Math.cos(r);
	      var sin = Math.sin(r);
	      var a = this.a,
	          b = this.b,
	          c = this.c,
	          d = this.d,
	          e = this.e,
	          f = this.f;
	      this.a = a * cos - b * sin;
	      this.b = b * cos + a * sin;
	      this.c = c * cos - d * sin;
	      this.d = d * cos + c * sin;
	      this.e = e * cos - f * sin + cy * sin - cx * cos + cx;
	      this.f = f * cos + e * sin - cx * sin - cy * cos + cy;
	      return this;
	    } // Flip matrix on x or y, at a given offset

	  }, {
	    key: "flip",
	    value: function flip(axis, around) {
	      return this.clone().flipO(axis, around);
	    }
	  }, {
	    key: "flipO",
	    value: function flipO(axis, around) {
	      return axis === 'x' ? this.scaleO(-1, 1, around, 0) : axis === 'y' ? this.scaleO(1, -1, 0, around) : this.scaleO(-1, -1, axis, around || axis); // Define an x, y flip point
	    } // Shear matrix

	  }, {
	    key: "shear",
	    value: function shear(a, cx, cy) {
	      return this.clone().shearO(a, cx, cy);
	    }
	  }, {
	    key: "shearO",
	    value: function shearO(lx) {
	      var cy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	      var a = this.a,
	          b = this.b,
	          c = this.c,
	          d = this.d,
	          e = this.e,
	          f = this.f;
	      this.a = a + b * lx;
	      this.c = c + d * lx;
	      this.e = e + f * lx - cy * lx;
	      return this;
	    } // Skew Matrix

	  }, {
	    key: "skew",
	    value: function skew(x, y, cx, cy) {
	      var _this$clone2;

	      return (_this$clone2 = this.clone()).skewO.apply(_this$clone2, arguments);
	    }
	  }, {
	    key: "skewO",
	    value: function skewO(x) {
	      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
	      var cx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	      var cy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	      // support uniformal skew
	      if (arguments.length === 3) {
	        cy = cx;
	        cx = y;
	        y = x;
	      } // Convert degrees to radians


	      x = radians(x);
	      y = radians(y);
	      var lx = Math.tan(x);
	      var ly = Math.tan(y);
	      var a = this.a,
	          b = this.b,
	          c = this.c,
	          d = this.d,
	          e = this.e,
	          f = this.f;
	      this.a = a + b * lx;
	      this.b = b + a * ly;
	      this.c = c + d * lx;
	      this.d = d + c * ly;
	      this.e = e + f * lx - cy * lx;
	      this.f = f + e * ly - cx * ly;
	      return this;
	    } // SkewX

	  }, {
	    key: "skewX",
	    value: function skewX(x, cx, cy) {
	      return this.skew(x, 0, cx, cy);
	    }
	  }, {
	    key: "skewXO",
	    value: function skewXO(x, cx, cy) {
	      return this.skewO(x, 0, cx, cy);
	    } // SkewY

	  }, {
	    key: "skewY",
	    value: function skewY(y, cx, cy) {
	      return this.skew(0, y, cx, cy);
	    }
	  }, {
	    key: "skewYO",
	    value: function skewYO(y, cx, cy) {
	      return this.skewO(0, y, cx, cy);
	    } // Transform around a center point

	  }, {
	    key: "aroundO",
	    value: function aroundO(cx, cy, matrix) {
	      var dx = cx || 0;
	      var dy = cy || 0;
	      return this.translateO(-dx, -dy).lmultiplyO(matrix).translateO(dx, dy);
	    }
	  }, {
	    key: "around",
	    value: function around(cx, cy, matrix) {
	      return this.clone().aroundO(cx, cy, matrix);
	    } // Check if two matrices are equal

	  }, {
	    key: "equals",
	    value: function equals(other) {
	      var comp = new Matrix(other);
	      return closeEnough(this.a, comp.a) && closeEnough(this.b, comp.b) && closeEnough(this.c, comp.c) && closeEnough(this.d, comp.d) && closeEnough(this.e, comp.e) && closeEnough(this.f, comp.f);
	    } // Convert matrix to string

	  }, {
	    key: "toString",
	    value: function toString() {
	      return 'matrix(' + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ',' + this.e + ',' + this.f + ')';
	    }
	  }, {
	    key: "toArray",
	    value: function toArray() {
	      return [this.a, this.b, this.c, this.d, this.e, this.f];
	    }
	  }, {
	    key: "valueOf",
	    value: function valueOf() {
	      return {
	        a: this.a,
	        b: this.b,
	        c: this.c,
	        d: this.d,
	        e: this.e,
	        f: this.f
	      };
	    }
	  }], [{
	    key: "fromArray",
	    value: function fromArray(a) {
	      return {
	        a: a[0],
	        b: a[1],
	        c: a[2],
	        d: a[3],
	        e: a[4],
	        f: a[5]
	      };
	    }
	  }, {
	    key: "isMatrixLike",
	    value: function isMatrixLike(o) {
	      return o.a != null || o.b != null || o.c != null || o.d != null || o.e != null || o.f != null;
	    }
	  }, {
	    key: "formatTransforms",
	    value: function formatTransforms(o) {
	      // Get all of the parameters required to form the matrix
	      var flipBoth = o.flip === 'both' || o.flip === true;
	      var flipX = o.flip && (flipBoth || o.flip === 'x') ? -1 : 1;
	      var flipY = o.flip && (flipBoth || o.flip === 'y') ? -1 : 1;
	      var skewX = o.skew && o.skew.length ? o.skew[0] : isFinite(o.skew) ? o.skew : isFinite(o.skewX) ? o.skewX : 0;
	      var skewY = o.skew && o.skew.length ? o.skew[1] : isFinite(o.skew) ? o.skew : isFinite(o.skewY) ? o.skewY : 0;
	      var scaleX = o.scale && o.scale.length ? o.scale[0] * flipX : isFinite(o.scale) ? o.scale * flipX : isFinite(o.scaleX) ? o.scaleX * flipX : flipX;
	      var scaleY = o.scale && o.scale.length ? o.scale[1] * flipY : isFinite(o.scale) ? o.scale * flipY : isFinite(o.scaleY) ? o.scaleY * flipY : flipY;
	      var shear = o.shear || 0;
	      var theta = o.rotate || o.theta || 0;
	      var origin = new Point(o.origin || o.around || o.ox || o.originX, o.oy || o.originY);
	      var ox = origin.x;
	      var oy = origin.y;
	      var position = new Point(o.position || o.px || o.positionX, o.py || o.positionY);
	      var px = position.x;
	      var py = position.y;
	      var translate = new Point(o.translate || o.tx || o.translateX, o.ty || o.translateY);
	      var tx = translate.x;
	      var ty = translate.y;
	      var relative = new Point(o.relative || o.rx || o.relativeX, o.ry || o.relativeY);
	      var rx = relative.x;
	      var ry = relative.y; // Populate all of the values

	      return {
	        scaleX: scaleX,
	        scaleY: scaleY,
	        skewX: skewX,
	        skewY: skewY,
	        shear: shear,
	        theta: theta,
	        rx: rx,
	        ry: ry,
	        tx: tx,
	        ty: ty,
	        ox: ox,
	        oy: oy,
	        px: px,
	        py: py
	      };
	    } // left matrix, right matrix, target matrix which is overwritten

	  }, {
	    key: "matrixMultiply",
	    value: function matrixMultiply(l, r, o) {
	      // Work out the product directly
	      var a = l.a * r.a + l.c * r.b;
	      var b = l.b * r.a + l.d * r.b;
	      var c = l.a * r.c + l.c * r.d;
	      var d = l.b * r.c + l.d * r.d;
	      var e = l.e + l.a * r.e + l.c * r.f;
	      var f = l.f + l.b * r.e + l.d * r.f; // make sure to use local variables because l/r and o could be the same

	      o.a = a;
	      o.b = b;
	      o.c = c;
	      o.d = d;
	      o.e = e;
	      o.f = f;
	      return o;
	    }
	  }]);

	  return Matrix;
	}();
	function ctm() {
	  return new Matrix(this.node.getCTM());
	}
	function screenCTM() {
	  /* https://bugzilla.mozilla.org/show_bug.cgi?id=1344537
	     This is needed because FF does not return the transformation matrix
	     for the inner coordinate system when getScreenCTM() is called on nested svgs.
	     However all other Browsers do that */
	  if (typeof this.isRoot === 'function' && !this.isRoot()) {
	    var rect = this.rect(1, 1);
	    var m = rect.node.getScreenCTM();
	    rect.remove();
	    return new Matrix(m);
	  }

	  return new Matrix(this.node.getScreenCTM());
	}
	register(Matrix);

	function parser() {
	  // Reuse cached element if possible
	  if (!parser.nodes) {
	    var svg = makeInstance().size(2, 0);
	    svg.node.style.cssText = ['opacity: 0', 'position: absolute', 'left: -100%', 'top: -100%', 'overflow: hidden'].join(';');
	    svg.attr('focusable', 'false');
	    var path = svg.path().node;
	    parser.nodes = {
	      svg: svg,
	      path: path
	    };
	  }

	  if (!parser.nodes.svg.node.parentNode) {
	    var b = globals.document.body || globals.document.documentElement;
	    parser.nodes.svg.addTo(b);
	  }

	  return parser.nodes;
	}

	function isNulledBox(box) {
	  return !box.width && !box.height && !box.x && !box.y;
	}

	function domContains(node) {
	  return node === globals.document || (globals.document.documentElement.contains || function (node) {
	    // This is IE - it does not support contains() for top-level SVGs
	    while (node.parentNode) {
	      node = node.parentNode;
	    }

	    return node === globals.document;
	  }).call(globals.document.documentElement, node);
	}

	var Box =
	/*#__PURE__*/
	function () {
	  function Box() {
	    _classCallCheck(this, Box);

	    this.init.apply(this, arguments);
	  }

	  _createClass(Box, [{
	    key: "init",
	    value: function init(source) {
	      var base = [0, 0, 0, 0];
	      source = typeof source === 'string' ? source.split(delimiter).map(parseFloat) : Array.isArray(source) ? source : _typeof(source) === 'object' ? [source.left != null ? source.left : source.x, source.top != null ? source.top : source.y, source.width, source.height] : arguments.length === 4 ? [].slice.call(arguments) : base;
	      this.x = source[0] || 0;
	      this.y = source[1] || 0;
	      this.width = this.w = source[2] || 0;
	      this.height = this.h = source[3] || 0; // Add more bounding box properties

	      this.x2 = this.x + this.w;
	      this.y2 = this.y + this.h;
	      this.cx = this.x + this.w / 2;
	      this.cy = this.y + this.h / 2;
	      return this;
	    } // Merge rect box with another, return a new instance

	  }, {
	    key: "merge",
	    value: function merge(box) {
	      var x = Math.min(this.x, box.x);
	      var y = Math.min(this.y, box.y);
	      var width = Math.max(this.x + this.width, box.x + box.width) - x;
	      var height = Math.max(this.y + this.height, box.y + box.height) - y;
	      return new Box(x, y, width, height);
	    }
	  }, {
	    key: "transform",
	    value: function transform(m) {
	      if (!(m instanceof Matrix)) {
	        m = new Matrix(m);
	      }

	      var xMin = Infinity;
	      var xMax = -Infinity;
	      var yMin = Infinity;
	      var yMax = -Infinity;
	      var pts = [new Point(this.x, this.y), new Point(this.x2, this.y), new Point(this.x, this.y2), new Point(this.x2, this.y2)];
	      pts.forEach(function (p) {
	        p = p.transform(m);
	        xMin = Math.min(xMin, p.x);
	        xMax = Math.max(xMax, p.x);
	        yMin = Math.min(yMin, p.y);
	        yMax = Math.max(yMax, p.y);
	      });
	      return new Box(xMin, yMin, xMax - xMin, yMax - yMin);
	    }
	  }, {
	    key: "addOffset",
	    value: function addOffset() {
	      // offset by window scroll position, because getBoundingClientRect changes when window is scrolled
	      this.x += globals.window.pageXOffset;
	      this.y += globals.window.pageYOffset;
	      return this;
	    }
	  }, {
	    key: "toString",
	    value: function toString() {
	      return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height;
	    }
	  }, {
	    key: "toArray",
	    value: function toArray() {
	      return [this.x, this.y, this.width, this.height];
	    }
	  }, {
	    key: "isNulled",
	    value: function isNulled() {
	      return isNulledBox(this);
	    }
	  }]);

	  return Box;
	}();

	function getBox(cb, retry) {
	  var box;

	  try {
	    box = cb(this.node);

	    if (isNulledBox(box) && !domContains(this.node)) {
	      throw new Error('Element not in the dom');
	    }
	  } catch (e) {
	    box = retry(this);
	  }

	  return box;
	}

	function bbox() {
	  return new Box(getBox.call(this, function (node) {
	    return node.getBBox();
	  }, function (el) {
	    try {
	      var clone = el.clone().addTo(parser().svg).show();
	      var box = clone.node.getBBox();
	      clone.remove();
	      return box;
	    } catch (e) {
	      throw new Error('Getting bbox of element "' + el.node.nodeName + '" is not possible. ' + e.toString());
	    }
	  }));
	}
	function rbox(el) {
	  var box = new Box(getBox.call(this, function (node) {
	    return node.getBoundingClientRect();
	  }, function (el) {
	    throw new Error('Getting rbox of element "' + el.node.nodeName + '" is not possible');
	  }));
	  if (el) return box.transform(el.screenCTM().inverse());
	  return box.addOffset();
	}
	registerMethods({
	  viewbox: {
	    viewbox: function viewbox(x, y, width, height) {
	      // act as getter
	      if (x == null) return new Box(this.attr('viewBox')); // act as setter

	      return this.attr('viewBox', new Box(x, y, width, height));
	    },
	    zoom: function zoom(level, point$$1) {
	      var width = this.node.clientWidth;
	      var height = this.node.clientHeight;
	      var v = this.viewbox(); // Firefox does not support clientHeight and returns 0
	      // https://bugzilla.mozilla.org/show_bug.cgi?id=874811

	      if (!width && !height) {
	        var style = window.getComputedStyle(this.node);
	        width = parseFloat(style.getPropertyValue('width'));
	        height = parseFloat(style.getPropertyValue('height'));
	      }

	      var zoomX = width / v.width;
	      var zoomY = height / v.height;
	      var zoom = Math.min(zoomX, zoomY);

	      if (level == null) {
	        return zoom;
	      }

	      var zoomAmount = zoom / level;
	      if (zoomAmount === Infinity) zoomAmount = Number.MIN_VALUE;
	      point$$1 = point$$1 || new Point(width / 2 / zoomX + v.x, height / 2 / zoomY + v.y);
	      var box = new Box(v).transform(new Matrix({
	        scale: zoomAmount,
	        origin: point$$1
	      }));
	      return this.viewbox(box);
	    }
	  }
	});
	register(Box);

	/* eslint no-new-func: "off" */
	var subClassArray = function () {
	  try {
	    // try es6 subclassing
	    return Function('name', 'baseClass', '_constructor', ['baseClass = baseClass || Array', 'return {', '  [name]: class extends baseClass {', '    constructor (...args) {', '      super(...args)', '      _constructor && _constructor.apply(this, args)', '    }', '  }', '}[name]'].join('\n'));
	  } catch (e) {
	    // Use es5 approach
	    return function (name) {
	      var baseClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Array;

	      var _constructor = arguments.length > 2 ? arguments[2] : undefined;

	      var Arr = function Arr() {
	        baseClass.apply(this, arguments);
	        _constructor && _constructor.apply(this, arguments);
	      };

	      Arr.prototype = Object.create(baseClass.prototype);
	      Arr.prototype.constructor = Arr;

	      Arr.prototype.map = function (fn) {
	        var arr = new Arr();
	        arr.push.apply(arr, Array.prototype.map.call(this, fn));
	        return arr;
	      };

	      return Arr;
	    };
	  }
	}();

	var List = subClassArray('List', Array, function () {
	  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  // This catches the case, that native map tries to create an array with new Array(1)
	  if (typeof arr === 'number') return this;
	  this.length = 0;
	  this.push.apply(this, _toConsumableArray(arr));
	});
	extend(List, {
	  each: function each(fnOrMethodName) {
	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    if (typeof fnOrMethodName === 'function') {
	      return this.map(function (el) {
	        return fnOrMethodName.call(el, el);
	      });
	    } else {
	      return this.map(function (el) {
	        return el[fnOrMethodName].apply(el, args);
	      });
	    }
	  },
	  toArray: function toArray() {
	    return Array.prototype.concat.apply([], this);
	  }
	});
	var reserved = ['toArray', 'constructor', 'each'];

	List.extend = function (methods) {
	  methods = methods.reduce(function (obj, name) {
	    // Don't overwrite own methods
	    if (reserved.includes(name)) return obj; // Don't add private methods

	    if (name[0] === '_') return obj; // Relay every call to each()

	    obj[name] = function () {
	      for (var _len2 = arguments.length, attrs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        attrs[_key2] = arguments[_key2];
	      }

	      return this.each.apply(this, [name].concat(attrs));
	    };

	    return obj;
	  }, {});
	  extend(List, methods);
	};

	function baseFind(query, parent) {
	  return new List(map((parent || globals.document).querySelectorAll(query), function (node) {
	    return adopt(node);
	  }));
	} // Scoped find method

	function find(query) {
	  return baseFind(query, this.node);
	}
	function findOne(query) {
	  return adopt(this.node.querySelector(query));
	}

	var EventTarget =
	/*#__PURE__*/
	function (_Base) {
	  _inherits(EventTarget, _Base);

	  function EventTarget() {
	    var _this;

	    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	        _ref$events = _ref.events,
	        events = _ref$events === void 0 ? {} : _ref$events;

	    _classCallCheck(this, EventTarget);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(EventTarget).call(this));
	    _this.events = events;
	    return _this;
	  }

	  _createClass(EventTarget, [{
	    key: "addEventListener",
	    value: function addEventListener() {}
	  }, {
	    key: "dispatch",
	    value: function dispatch$$1(event, data) {
	      return dispatch(this, event, data);
	    }
	  }, {
	    key: "dispatchEvent",
	    value: function dispatchEvent(event) {
	      var bag = this.getEventHolder().events;
	      if (!bag) return true;
	      var events = bag[event.type];

	      for (var i in events) {
	        for (var j in events[i]) {
	          events[i][j](event);
	        }
	      }

	      return !event.defaultPrevented;
	    } // Fire given event

	  }, {
	    key: "fire",
	    value: function fire(event, data) {
	      this.dispatch(event, data);
	      return this;
	    }
	  }, {
	    key: "getEventHolder",
	    value: function getEventHolder() {
	      return this;
	    }
	  }, {
	    key: "getEventTarget",
	    value: function getEventTarget() {
	      return this;
	    } // Unbind event from listener

	  }, {
	    key: "off",
	    value: function off$$1(event, listener) {
	      off(this, event, listener);

	      return this;
	    } // Bind given event to listener

	  }, {
	    key: "on",
	    value: function on$$1(event, listener, binding, options) {
	      on(this, event, listener, binding, options);

	      return this;
	    }
	  }, {
	    key: "removeEventListener",
	    value: function removeEventListener() {}
	  }]);

	  return EventTarget;
	}(Base);
	register(EventTarget);

	function noop() {} // Default animation values

	var timeline = {
	  duration: 400,
	  ease: '>',
	  delay: 0 // Default attribute values

	};
	var attrs = {
	  // fill and stroke
	  'fill-opacity': 1,
	  'stroke-opacity': 1,
	  'stroke-width': 0,
	  'stroke-linejoin': 'miter',
	  'stroke-linecap': 'butt',
	  fill: '#000000',
	  stroke: '#000000',
	  opacity: 1,
	  // position
	  x: 0,
	  y: 0,
	  cx: 0,
	  cy: 0,
	  // size
	  width: 0,
	  height: 0,
	  // radius
	  r: 0,
	  rx: 0,
	  ry: 0,
	  // gradient
	  offset: 0,
	  'stop-opacity': 1,
	  'stop-color': '#000000',
	  // text
	  'text-anchor': 'start'
	};

	var defaults = ({
		noop: noop,
		timeline: timeline,
		attrs: attrs
	});

	var SVGArray = subClassArray('SVGArray', Array, function (arr) {
	  this.init(arr);
	});
	extend(SVGArray, {
	  init: function init(arr) {
	    // This catches the case, that native map tries to create an array with new Array(1)
	    if (typeof arr === 'number') return this;
	    this.length = 0;
	    this.push.apply(this, _toConsumableArray(this.parse(arr)));
	    return this;
	  },
	  toArray: function toArray() {
	    return Array.prototype.concat.apply([], this);
	  },
	  toString: function toString() {
	    return this.join(' ');
	  },
	  // Flattens the array if needed
	  valueOf: function valueOf() {
	    var ret = [];
	    ret.push.apply(ret, _toConsumableArray(this));
	    return ret;
	  },
	  // Parse whitespace separated string
	  parse: function parse() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	    // If already is an array, no need to parse it
	    if (array instanceof Array) return array;
	    return array.trim().split(delimiter).map(parseFloat);
	  },
	  clone: function clone() {
	    return new this.constructor(this);
	  },
	  toSet: function toSet() {
	    return new Set(this);
	  }
	});

	var SVGNumber =
	/*#__PURE__*/
	function () {
	  // Initialize
	  function SVGNumber() {
	    _classCallCheck(this, SVGNumber);

	    this.init.apply(this, arguments);
	  }

	  _createClass(SVGNumber, [{
	    key: "init",
	    value: function init(value, unit) {
	      unit = Array.isArray(value) ? value[1] : unit;
	      value = Array.isArray(value) ? value[0] : value; // initialize defaults

	      this.value = 0;
	      this.unit = unit || ''; // parse value

	      if (typeof value === 'number') {
	        // ensure a valid numeric value
	        this.value = isNaN(value) ? 0 : !isFinite(value) ? value < 0 ? -3.4e+38 : +3.4e+38 : value;
	      } else if (typeof value === 'string') {
	        unit = value.match(numberAndUnit);

	        if (unit) {
	          // make value numeric
	          this.value = parseFloat(unit[1]); // normalize

	          if (unit[5] === '%') {
	            this.value /= 100;
	          } else if (unit[5] === 's') {
	            this.value *= 1000;
	          } // store unit


	          this.unit = unit[5];
	        }
	      } else {
	        if (value instanceof SVGNumber) {
	          this.value = value.valueOf();
	          this.unit = value.unit;
	        }
	      }

	      return this;
	    }
	  }, {
	    key: "toString",
	    value: function toString() {
	      return (this.unit === '%' ? ~~(this.value * 1e8) / 1e6 : this.unit === 's' ? this.value / 1e3 : this.value) + this.unit;
	    }
	  }, {
	    key: "toJSON",
	    value: function toJSON() {
	      return this.toString();
	    }
	  }, {
	    key: "toArray",
	    value: function toArray() {
	      return [this.value, this.unit];
	    }
	  }, {
	    key: "valueOf",
	    value: function valueOf() {
	      return this.value;
	    } // Add number

	  }, {
	    key: "plus",
	    value: function plus(number) {
	      number = new SVGNumber(number);
	      return new SVGNumber(this + number, this.unit || number.unit);
	    } // Subtract number

	  }, {
	    key: "minus",
	    value: function minus(number) {
	      number = new SVGNumber(number);
	      return new SVGNumber(this - number, this.unit || number.unit);
	    } // Multiply number

	  }, {
	    key: "times",
	    value: function times(number) {
	      number = new SVGNumber(number);
	      return new SVGNumber(this * number, this.unit || number.unit);
	    } // Divide number

	  }, {
	    key: "divide",
	    value: function divide(number) {
	      number = new SVGNumber(number);
	      return new SVGNumber(this / number, this.unit || number.unit);
	    }
	  }, {
	    key: "convert",
	    value: function convert(unit) {
	      return new SVGNumber(this.value, unit);
	    }
	  }]);

	  return SVGNumber;
	}();

	var hooks = [];
	function registerAttrHook(fn) {
	  hooks.push(fn);
	} // Set svg element attribute

	function attr(attr, val, ns) {
	  var _this = this;

	  // act as full getter
	  if (attr == null) {
	    // get an object of attributes
	    attr = {};
	    val = this.node.attributes;
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = val[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var node = _step.value;
	        attr[node.nodeName] = isNumber.test(node.nodeValue) ? parseFloat(node.nodeValue) : node.nodeValue;
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return != null) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }

	    return attr;
	  } else if (attr instanceof Array) {
	    // loop through array and get all values
	    return attr.reduce(function (last, curr) {
	      last[curr] = _this.attr(curr);
	      return last;
	    }, {});
	  } else if (_typeof(attr) === 'object' && attr.constructor === Object) {
	    // apply every attribute individually if an object is passed
	    for (val in attr) {
	      this.attr(val, attr[val]);
	    }
	  } else if (val === null) {
	    // remove value
	    this.node.removeAttribute(attr);
	  } else if (val == null) {
	    // act as a getter if the first and only argument is not an object
	    val = this.node.getAttribute(attr);
	    return val == null ? attrs[attr] : isNumber.test(val) ? parseFloat(val) : val;
	  } else {
	    // Loop through hooks and execute them to convert value
	    val = hooks.reduce(function (_val, hook) {
	      return hook(attr, _val, _this);
	    }, val); // ensure correct numeric values (also accepts NaN and Infinity)

	    if (typeof val === 'number') {
	      val = new SVGNumber(val);
	    } else if (Color.isColor(val)) {
	      // ensure full hex color
	      val = new Color(val);
	    } else if (val.constructor === Array) {
	      // Check for plain arrays and parse array values
	      val = new SVGArray(val);
	    } // if the passed attribute is leading...


	    if (attr === 'leading') {
	      // ... call the leading method instead
	      if (this.leading) {
	        this.leading(val);
	      }
	    } else {
	      // set given attribute on node
	      typeof ns === 'string' ? this.node.setAttributeNS(ns, attr, val.toString()) : this.node.setAttribute(attr, val.toString());
	    } // rebuild if required


	    if (this.rebuild && (attr === 'font-size' || attr === 'x')) {
	      this.rebuild();
	    }
	  }

	  return this;
	}

	var Dom =
	/*#__PURE__*/
	function (_EventTarget) {
	  _inherits(Dom, _EventTarget);

	  function Dom(node, attrs) {
	    var _this2;

	    _classCallCheck(this, Dom);

	    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Dom).call(this, node));
	    _this2.node = node;
	    _this2.type = node.nodeName;

	    if (attrs && node !== attrs) {
	      _this2.attr(attrs);
	    }

	    return _this2;
	  } // Add given element at a position


	  _createClass(Dom, [{
	    key: "add",
	    value: function add(element, i) {
	      element = makeInstance(element);

	      if (i == null) {
	        this.node.appendChild(element.node);
	      } else if (element.node !== this.node.childNodes[i]) {
	        this.node.insertBefore(element.node, this.node.childNodes[i]);
	      }

	      return this;
	    } // Add element to given container and return self

	  }, {
	    key: "addTo",
	    value: function addTo(parent) {
	      return makeInstance(parent).put(this);
	    } // Returns all child elements

	  }, {
	    key: "children",
	    value: function children() {
	      return new List(map(this.node.children, function (node) {
	        return adopt(node);
	      }));
	    } // Remove all elements in this container

	  }, {
	    key: "clear",
	    value: function clear() {
	      // remove children
	      while (this.node.hasChildNodes()) {
	        this.node.removeChild(this.node.lastChild);
	      }

	      return this;
	    } // Clone element

	  }, {
	    key: "clone",
	    value: function clone() {
	      // write dom data to the dom so the clone can pickup the data
	      this.writeDataToDom(); // clone element and assign new id

	      return assignNewId(this.node.cloneNode(true));
	    } // Iterates over all children and invokes a given block

	  }, {
	    key: "each",
	    value: function each(block, deep) {
	      var children = this.children();
	      var i, il;

	      for (i = 0, il = children.length; i < il; i++) {
	        block.apply(children[i], [i, children]);

	        if (deep) {
	          children[i].each(block, deep);
	        }
	      }

	      return this;
	    }
	  }, {
	    key: "element",
	    value: function element(nodeName) {
	      return this.put(new Dom(create(nodeName)));
	    } // Get first child

	  }, {
	    key: "first",
	    value: function first() {
	      return adopt(this.node.firstChild);
	    } // Get a element at the given index

	  }, {
	    key: "get",
	    value: function get(i) {
	      return adopt(this.node.childNodes[i]);
	    }
	  }, {
	    key: "getEventHolder",
	    value: function getEventHolder() {
	      return this.node;
	    }
	  }, {
	    key: "getEventTarget",
	    value: function getEventTarget() {
	      return this.node;
	    } // Checks if the given element is a child

	  }, {
	    key: "has",
	    value: function has(element) {
	      return this.index(element) >= 0;
	    } // Get / set id

	  }, {
	    key: "id",
	    value: function id(_id) {
	      // generate new id if no id set
	      if (typeof _id === 'undefined' && !this.node.id) {
	        this.node.id = eid(this.type);
	      } // dont't set directly width this.node.id to make `null` work correctly


	      return this.attr('id', _id);
	    } // Gets index of given element

	  }, {
	    key: "index",
	    value: function index(element) {
	      return [].slice.call(this.node.childNodes).indexOf(element.node);
	    } // Get the last child

	  }, {
	    key: "last",
	    value: function last() {
	      return adopt(this.node.lastChild);
	    } // matches the element vs a css selector

	  }, {
	    key: "matches",
	    value: function matches(selector) {
	      var el = this.node;
	      return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
	    } // Returns the parent element instance

	  }, {
	    key: "parent",
	    value: function parent(type) {
	      var parent = this; // check for parent

	      if (!parent.node.parentNode) return null; // get parent element

	      parent = adopt(parent.node.parentNode);
	      if (!type) return parent; // loop trough ancestors if type is given

	      while (parent) {
	        if (typeof type === 'string' ? parent.matches(type) : parent instanceof type) return parent;
	        if (!parent.node.parentNode || parent.node.parentNode.nodeName === '#document' || parent.node.parentNode.nodeName === '#document-fragment') return null; // #759, #720

	        parent = adopt(parent.node.parentNode);
	      }
	    } // Basically does the same as `add()` but returns the added element instead

	  }, {
	    key: "put",
	    value: function put(element, i) {
	      this.add(element, i);
	      return element;
	    } // Add element to given container and return container

	  }, {
	    key: "putIn",
	    value: function putIn(parent) {
	      return makeInstance(parent).add(this);
	    } // Remove element

	  }, {
	    key: "remove",
	    value: function remove() {
	      if (this.parent()) {
	        this.parent().removeElement(this);
	      }

	      return this;
	    } // Remove a given child

	  }, {
	    key: "removeElement",
	    value: function removeElement(element) {
	      this.node.removeChild(element.node);
	      return this;
	    } // Replace this with element

	  }, {
	    key: "replace",
	    value: function replace(element) {
	      element = makeInstance(element);
	      this.node.parentNode.replaceChild(element.node, this.node);
	      return element;
	    }
	  }, {
	    key: "round",
	    value: function round() {
	      var precision = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
	      var map$$1 = arguments.length > 1 ? arguments[1] : undefined;
	      var factor = Math.pow(10, precision);
	      var attrs = this.attr(); // If we have no map, build one from attrs

	      if (!map$$1) {
	        map$$1 = Object.keys(attrs);
	      } // Holds rounded attributes


	      var newAttrs = {};
	      map$$1.forEach(function (key) {
	        newAttrs[key] = Math.round(attrs[key] * factor) / factor;
	      });
	      this.attr(newAttrs);
	      return this;
	    } // Return id on string conversion

	  }, {
	    key: "toString",
	    value: function toString() {
	      return this.id();
	    } // Import raw svg

	  }, {
	    key: "svg",
	    value: function svg(svgOrFn, outerHTML) {
	      var well, len, fragment;

	      if (svgOrFn === false) {
	        outerHTML = false;
	        svgOrFn = null;
	      } // act as getter if no svg string is given


	      if (svgOrFn == null || typeof svgOrFn === 'function') {
	        // The default for exports is, that the outerNode is included
	        outerHTML = outerHTML == null ? true : outerHTML; // write svgjs data to the dom

	        this.writeDataToDom();
	        var current = this; // An export modifier was passed

	        if (svgOrFn != null) {
	          current = adopt(current.node.cloneNode(true)); // If the user wants outerHTML we need to process this node, too

	          if (outerHTML) {
	            var result = svgOrFn(current);
	            current = result || current; // The user does not want this node? Well, then he gets nothing

	            if (result === false) return '';
	          } // Deep loop through all children and apply modifier


	          current.each(function () {
	            var result = svgOrFn(this);

	            var _this = result || this; // If modifier returns false, discard node


	            if (result === false) {
	              this.remove(); // If modifier returns new node, use it
	            } else if (result && this !== _this) {
	              this.replace(_this);
	            }
	          }, true);
	        } // Return outer or inner content


	        return outerHTML ? current.node.outerHTML : current.node.innerHTML;
	      } // Act as setter if we got a string
	      // The default for import is, that the current node is not replaced


	      outerHTML = outerHTML == null ? false : outerHTML; // Create temporary holder

	      well = globals.document.createElementNS(ns, 'svg');
	      fragment = globals.document.createDocumentFragment(); // Dump raw svg

	      well.innerHTML = svgOrFn; // Transplant nodes into the fragment

	      for (len = well.children.length; len--;) {
	        fragment.appendChild(well.firstElementChild);
	      }

	      var parent = this.parent(); // Add the whole fragment at once

	      return outerHTML ? this.replace(fragment) && parent : this.add(fragment);
	    }
	  }, {
	    key: "words",
	    value: function words(text) {
	      // This is faster than removing all children and adding a new one
	      this.node.textContent = text;
	      return this;
	    } // write svgjs data to the dom

	  }, {
	    key: "writeDataToDom",
	    value: function writeDataToDom() {
	      // dump variables recursively
	      this.each(function () {
	        this.writeDataToDom();
	      });
	      return this;
	    }
	  }]);

	  return Dom;
	}(EventTarget);
	extend(Dom, {
	  attr: attr,
	  find: find,
	  findOne: findOne
	});
	register(Dom);

	var Element =
	/*#__PURE__*/
	function (_Dom) {
	  _inherits(Element, _Dom);

	  function Element(node, attrs) {
	    var _this;

	    _classCallCheck(this, Element);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Element).call(this, node, attrs)); // initialize data object

	    _this.dom = {}; // create circular reference

	    _this.node.instance = _assertThisInitialized(_assertThisInitialized(_this));

	    if (node.hasAttribute('svgjs:data')) {
	      // pull svgjs data from the dom (getAttributeNS doesn't work in html5)
	      _this.setData(JSON.parse(node.getAttribute('svgjs:data')) || {});
	    }

	    return _this;
	  } // Move element by its center


	  _createClass(Element, [{
	    key: "center",
	    value: function center(x, y) {
	      return this.cx(x).cy(y);
	    } // Move by center over x-axis

	  }, {
	    key: "cx",
	    value: function cx(x) {
	      return x == null ? this.x() + this.width() / 2 : this.x(x - this.width() / 2);
	    } // Move by center over y-axis

	  }, {
	    key: "cy",
	    value: function cy(y) {
	      return y == null ? this.y() + this.height() / 2 : this.y(y - this.height() / 2);
	    } // Get defs

	  }, {
	    key: "defs",
	    value: function defs() {
	      return this.root().defs();
	    } // Relative move over x and y axes

	  }, {
	    key: "dmove",
	    value: function dmove(x, y) {
	      return this.dx(x).dy(y);
	    } // Relative move over x axis

	  }, {
	    key: "dx",
	    value: function dx(x) {
	      return this.x(new SVGNumber(x).plus(this.x()));
	    } // Relative move over y axis

	  }, {
	    key: "dy",
	    value: function dy(y) {
	      return this.y(new SVGNumber(y).plus(this.y()));
	    } // Get parent document

	  }, {
	    key: "root",
	    value: function root$$1() {
	      var p = this.parent(getClass(root));
	      return p && p.root();
	    }
	  }, {
	    key: "getEventHolder",
	    value: function getEventHolder() {
	      return this;
	    } // Set height of element

	  }, {
	    key: "height",
	    value: function height(_height) {
	      return this.attr('height', _height);
	    } // Checks whether the given point inside the bounding box of the element

	  }, {
	    key: "inside",
	    value: function inside(x, y) {
	      var box = this.bbox();
	      return x > box.x && y > box.y && x < box.x + box.width && y < box.y + box.height;
	    } // Move element to given x and y values

	  }, {
	    key: "move",
	    value: function move(x, y) {
	      return this.x(x).y(y);
	    } // return array of all ancestors of given type up to the root svg

	  }, {
	    key: "parents",
	    value: function parents() {
	      var until = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : globals.document;
	      until = makeInstance(until);
	      var parents = new List();
	      var parent = this;

	      while ((parent = parent.parent()) && parent.node !== until.node && parent.node !== globals.document) {
	        parents.push(parent);
	      }

	      return parents;
	    } // Get referenced element form attribute value

	  }, {
	    key: "reference",
	    value: function reference$$1(attr) {
	      attr = this.attr(attr);
	      if (!attr) return null;
	      var m = attr.match(reference);
	      return m ? makeInstance(m[1]) : null;
	    } // set given data to the elements data property

	  }, {
	    key: "setData",
	    value: function setData(o) {
	      this.dom = o;
	      return this;
	    } // Set element size to given width and height

	  }, {
	    key: "size",
	    value: function size(width, height) {
	      var p = proportionalSize(this, width, height);
	      return this.width(new SVGNumber(p.width)).height(new SVGNumber(p.height));
	    } // Set width of element

	  }, {
	    key: "width",
	    value: function width(_width) {
	      return this.attr('width', _width);
	    } // write svgjs data to the dom

	  }, {
	    key: "writeDataToDom",
	    value: function writeDataToDom() {
	      // remove previously set data
	      this.node.removeAttribute('svgjs:data');

	      if (Object.keys(this.dom).length) {
	        this.node.setAttribute('svgjs:data', JSON.stringify(this.dom)); // see #428
	      }

	      return _get(_getPrototypeOf(Element.prototype), "writeDataToDom", this).call(this);
	    } // Move over x-axis

	  }, {
	    key: "x",
	    value: function x(_x) {
	      return this.attr('x', _x);
	    } // Move over y-axis

	  }, {
	    key: "y",
	    value: function y(_y) {
	      return this.attr('y', _y);
	    }
	  }]);

	  return Element;
	}(Dom);
	extend(Element, {
	  bbox: bbox,
	  rbox: rbox,
	  point: point,
	  ctm: ctm,
	  screenCTM: screenCTM
	});
	register(Element);

	var sugar = {
	  stroke: ['color', 'width', 'opacity', 'linecap', 'linejoin', 'miterlimit', 'dasharray', 'dashoffset'],
	  fill: ['color', 'opacity', 'rule'],
	  prefix: function prefix(t, a) {
	    return a === 'color' ? t : t + '-' + a;
	  } // Add sugar for fill and stroke

	};
	['fill', 'stroke'].forEach(function (m) {
	  var extension = {};
	  var i;

	  extension[m] = function (o) {
	    if (typeof o === 'undefined') {
	      return this.attr(m);
	    }

	    if (typeof o === 'string' || o instanceof Color || Color.isRgb(o) || o instanceof Element) {
	      this.attr(m, o);
	    } else {
	      // set all attributes from sugar.fill and sugar.stroke list
	      for (i = sugar[m].length - 1; i >= 0; i--) {
	        if (o[sugar[m][i]] != null) {
	          this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]]);
	        }
	      }
	    }

	    return this;
	  };

	  registerMethods(['Element', 'Runner'], extension);
	});
	registerMethods(['Element', 'Runner'], {
	  // Let the user set the matrix directly
	  matrix: function matrix(mat, b, c, d, e, f) {
	    // Act as a getter
	    if (mat == null) {
	      return new Matrix(this);
	    } // Act as a setter, the user can pass a matrix or a set of numbers


	    return this.attr('transform', new Matrix(mat, b, c, d, e, f));
	  },
	  // Map rotation to transform
	  rotate: function rotate(angle, cx, cy) {
	    return this.transform({
	      rotate: angle,
	      ox: cx,
	      oy: cy
	    }, true);
	  },
	  // Map skew to transform
	  skew: function skew(x, y, cx, cy) {
	    return arguments.length === 1 || arguments.length === 3 ? this.transform({
	      skew: x,
	      ox: y,
	      oy: cx
	    }, true) : this.transform({
	      skew: [x, y],
	      ox: cx,
	      oy: cy
	    }, true);
	  },
	  shear: function shear(lam, cx, cy) {
	    return this.transform({
	      shear: lam,
	      ox: cx,
	      oy: cy
	    }, true);
	  },
	  // Map scale to transform
	  scale: function scale(x, y, cx, cy) {
	    return arguments.length === 1 || arguments.length === 3 ? this.transform({
	      scale: x,
	      ox: y,
	      oy: cx
	    }, true) : this.transform({
	      scale: [x, y],
	      ox: cx,
	      oy: cy
	    }, true);
	  },
	  // Map translate to transform
	  translate: function translate(x, y) {
	    return this.transform({
	      translate: [x, y]
	    }, true);
	  },
	  // Map relative translations to transform
	  relative: function relative(x, y) {
	    return this.transform({
	      relative: [x, y]
	    }, true);
	  },
	  // Map flip to transform
	  flip: function flip(direction, around) {
	    var directionString = typeof direction === 'string' ? direction : isFinite(direction) ? 'both' : 'both';
	    var origin = direction === 'both' && isFinite(around) ? [around, around] : direction === 'x' ? [around, 0] : direction === 'y' ? [0, around] : isFinite(direction) ? [direction, direction] : [0, 0];
	    return this.transform({
	      flip: directionString,
	      origin: origin
	    }, true);
	  },
	  // Opacity
	  opacity: function opacity(value) {
	    return this.attr('opacity', value);
	  }
	});
	registerMethods('radius', {
	  // Add x and y radius
	  radius: function radius(x, y) {
	    var type = (this._element || this).type;
	    return type === 'radialGradient' || type === 'radialGradient' ? this.attr('r', new SVGNumber(x)) : this.rx(x).ry(y == null ? x : y);
	  }
	});
	registerMethods('Path', {
	  // Get path length
	  length: function length() {
	    return this.node.getTotalLength();
	  },
	  // Get point at length
	  pointAt: function pointAt(length) {
	    return new Point(this.node.getPointAtLength(length));
	  }
	});
	registerMethods(['Element', 'Runner'], {
	  // Set font
	  font: function font(a, v) {
	    if (_typeof(a) === 'object') {
	      for (v in a) {
	        this.font(v, a[v]);
	      }

	      return this;
	    }

	    return a === 'leading' ? this.leading(v) : a === 'anchor' ? this.attr('text-anchor', v) : a === 'size' || a === 'family' || a === 'weight' || a === 'stretch' || a === 'variant' || a === 'style' ? this.attr('font-' + a, v) : this.attr(a, v);
	  }
	});
	registerMethods('Text', {
	  ax: function ax(x) {
	    return this.attr('x', x);
	  },
	  ay: function ay(y) {
	    return this.attr('y', y);
	  },
	  amove: function amove(x, y) {
	    return this.ax(x).ay(y);
	  }
	}); // Add events to elements

	var methods$1 = ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'mouseenter', 'mouseleave', 'touchstart', 'touchmove', 'touchleave', 'touchend', 'touchcancel'].reduce(function (last, event) {
	  // add event to Element
	  var fn = function fn(f) {
	    if (f === null) {
	      off(this, event);
	    } else {
	      on(this, event, f);
	    }

	    return this;
	  };

	  last[event] = fn;
	  return last;
	}, {});
	registerMethods('Element', methods$1);

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
	  }

	  return target;
	}

	function untransform() {
	  return this.attr('transform', null);
	} // merge the whole transformation chain into one matrix and returns it

	function matrixify() {
	  var matrix = (this.attr('transform') || ''). // split transformations
	  split(transforms).slice(0, -1).map(function (str) {
	    // generate key => value pairs
	    var kv = str.trim().split('(');
	    return [kv[0], kv[1].split(delimiter).map(function (str) {
	      return parseFloat(str);
	    })];
	  }).reverse() // merge every transformation into one matrix
	  .reduce(function (matrix, transform) {
	    if (transform[0] === 'matrix') {
	      return matrix.lmultiply(Matrix.fromArray(transform[1]));
	    }

	    return matrix[transform[0]].apply(matrix, transform[1]);
	  }, new Matrix());
	  return matrix;
	} // add an element to another parent without changing the visual representation on the screen

	function toParent(parent) {
	  if (this === parent) return this;
	  var ctm$$1 = this.screenCTM();
	  var pCtm = parent.screenCTM().inverse();
	  this.addTo(parent).untransform().transform(pCtm.multiply(ctm$$1));
	  return this;
	} // same as above with parent equals root-svg

	function toRoot() {
	  return this.toParent(this.root());
	} // Add transformations

	function transform(o, relative) {
	  // Act as a getter if no object was passed
	  if (o == null || typeof o === 'string') {
	    var decomposed = new Matrix(this).decompose();
	    return decomposed[o] || decomposed;
	  }

	  if (!Matrix.isMatrixLike(o)) {
	    // Set the origin according to the defined transform
	    o = _objectSpread({}, o, {
	      origin: getOrigin(o, this)
	    });
	  } // The user can pass a boolean, an Element or an Matrix or nothing


	  var cleanRelative = relative === true ? this : relative || false;
	  var result = new Matrix(cleanRelative).transform(o);
	  return this.attr('transform', result);
	}
	registerMethods('Element', {
	  untransform: untransform,
	  matrixify: matrixify,
	  toParent: toParent,
	  toRoot: toRoot,
	  transform: transform
	});

	function rx(rx) {
	  return this.attr('rx', rx);
	} // Radius y value

	function ry(ry) {
	  return this.attr('ry', ry);
	} // Move over x-axis

	function x(x) {
	  return x == null ? this.cx() - this.rx() : this.cx(x + this.rx());
	} // Move over y-axis

	function y(y) {
	  return y == null ? this.cy() - this.ry() : this.cy(y + this.ry());
	} // Move by center over x-axis

	function cx(x) {
	  return x == null ? this.attr('cx') : this.attr('cx', x);
	} // Move by center over y-axis

	function cy(y) {
	  return y == null ? this.attr('cy') : this.attr('cy', y);
	} // Set width of element

	function width(width) {
	  return width == null ? this.rx() * 2 : this.rx(new SVGNumber(width).divide(2));
	} // Set height of element

	function height(height) {
	  return height == null ? this.ry() * 2 : this.ry(new SVGNumber(height).divide(2));
	}

	var circled = ({
		rx: rx,
		ry: ry,
		x: x,
		y: y,
		cx: cx,
		cy: cy,
		width: width,
		height: height
	});

	var Shape =
	/*#__PURE__*/
	function (_Element) {
	  _inherits(Shape, _Element);

	  function Shape() {
	    _classCallCheck(this, Shape);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Shape).apply(this, arguments));
	  }

	  return Shape;
	}(Element);
	register(Shape);

	var Circle =
	/*#__PURE__*/
	function (_Shape) {
	  _inherits(Circle, _Shape);

	  function Circle(node) {
	    _classCallCheck(this, Circle);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Circle).call(this, nodeOrNew('circle', node), node));
	  }

	  _createClass(Circle, [{
	    key: "radius",
	    value: function radius(r) {
	      return this.attr('r', r);
	    } // Radius x value

	  }, {
	    key: "rx",
	    value: function rx$$1(_rx) {
	      return this.attr('r', _rx);
	    } // Alias radius x value

	  }, {
	    key: "ry",
	    value: function ry$$1(_ry) {
	      return this.rx(_ry);
	    }
	  }, {
	    key: "size",
	    value: function size(_size) {
	      return this.radius(new SVGNumber(_size).divide(2));
	    }
	  }]);

	  return Circle;
	}(Shape);
	extend(Circle, {
	  x: x,
	  y: y,
	  cx: cx,
	  cy: cy,
	  width: width,
	  height: height
	});
	registerMethods({
	  Container: {
	    // Create circle element
	    circle: wrapWithAttrCheck(function (size) {
	      return this.put(new Circle()).size(size).move(0, 0);
	    })
	  }
	});
	register(Circle);

	var Container =
	/*#__PURE__*/
	function (_Element) {
	  _inherits(Container, _Element);

	  function Container() {
	    _classCallCheck(this, Container);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Container).apply(this, arguments));
	  }

	  _createClass(Container, [{
	    key: "flatten",
	    value: function flatten(parent) {
	      this.each(function () {
	        if (this instanceof Container) return this.flatten(parent).ungroup(parent);
	        return this.toParent(parent);
	      }); // we need this so that the root does not get removed

	      this.node.firstElementChild || this.remove();
	      return this;
	    }
	  }, {
	    key: "ungroup",
	    value: function ungroup(parent) {
	      parent = parent || this.parent();
	      this.each(function () {
	        return this.toParent(parent);
	      });
	      this.remove();
	      return this;
	    }
	  }]);

	  return Container;
	}(Element);
	register(Container);

	var Defs =
	/*#__PURE__*/
	function (_Container) {
	  _inherits(Defs, _Container);

	  function Defs(node) {
	    _classCallCheck(this, Defs);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Defs).call(this, nodeOrNew('defs', node), node));
	  }

	  _createClass(Defs, [{
	    key: "flatten",
	    value: function flatten() {
	      return this;
	    }
	  }, {
	    key: "ungroup",
	    value: function ungroup() {
	      return this;
	    }
	  }]);

	  return Defs;
	}(Container);
	register(Defs);

	var Ellipse =
	/*#__PURE__*/
	function (_Shape) {
	  _inherits(Ellipse, _Shape);

	  function Ellipse(node) {
	    _classCallCheck(this, Ellipse);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Ellipse).call(this, nodeOrNew('ellipse', node), node));
	  }

	  _createClass(Ellipse, [{
	    key: "size",
	    value: function size(width$$1, height$$1) {
	      var p = proportionalSize(this, width$$1, height$$1);
	      return this.rx(new SVGNumber(p.width).divide(2)).ry(new SVGNumber(p.height).divide(2));
	    }
	  }]);

	  return Ellipse;
	}(Shape);
	extend(Ellipse, circled);
	registerMethods('Container', {
	  // Create an ellipse
	  ellipse: wrapWithAttrCheck(function () {
	    var width$$1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var height$$1 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : width$$1;
	    return this.put(new Ellipse()).size(width$$1, height$$1).move(0, 0);
	  })
	});
	register(Ellipse);

	var Stop =
	/*#__PURE__*/
	function (_Element) {
	  _inherits(Stop, _Element);

	  function Stop(node) {
	    _classCallCheck(this, Stop);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Stop).call(this, nodeOrNew('stop', node), node));
	  } // add color stops


	  _createClass(Stop, [{
	    key: "update",
	    value: function update(o) {
	      if (typeof o === 'number' || o instanceof SVGNumber) {
	        o = {
	          offset: arguments[0],
	          color: arguments[1],
	          opacity: arguments[2]
	        };
	      } // set attributes


	      if (o.opacity != null) this.attr('stop-opacity', o.opacity);
	      if (o.color != null) this.attr('stop-color', o.color);
	      if (o.offset != null) this.attr('offset', new SVGNumber(o.offset));
	      return this;
	    }
	  }]);

	  return Stop;
	}(Element);
	register(Stop);

	function from(x, y) {
	  return (this._element || this).type === 'radialGradient' ? this.attr({
	    fx: new SVGNumber(x),
	    fy: new SVGNumber(y)
	  }) : this.attr({
	    x1: new SVGNumber(x),
	    y1: new SVGNumber(y)
	  });
	}
	function to(x, y) {
	  return (this._element || this).type === 'radialGradient' ? this.attr({
	    cx: new SVGNumber(x),
	    cy: new SVGNumber(y)
	  }) : this.attr({
	    x2: new SVGNumber(x),
	    y2: new SVGNumber(y)
	  });
	}

	var gradiented = ({
		from: from,
		to: to
	});

	var Gradient =
	/*#__PURE__*/
	function (_Container) {
	  _inherits(Gradient, _Container);

	  function Gradient(type, attrs) {
	    _classCallCheck(this, Gradient);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Gradient).call(this, nodeOrNew(type + 'Gradient', typeof type === 'string' ? null : type), attrs));
	  } // Add a color stop


	  _createClass(Gradient, [{
	    key: "stop",
	    value: function stop(offset, color, opacity) {
	      return this.put(new Stop()).update(offset, color, opacity);
	    } // Update gradient

	  }, {
	    key: "update",
	    value: function update(block) {
	      // remove all stops
	      this.clear(); // invoke passed block

	      if (typeof block === 'function') {
	        block.call(this, this);
	      }

	      return this;
	    } // Return the fill id

	  }, {
	    key: "url",
	    value: function url() {
	      return 'url(#' + this.id() + ')';
	    } // Alias string convertion to fill

	  }, {
	    key: "toString",
	    value: function toString() {
	      return this.url();
	    } // custom attr to handle transform

	  }, {
	    key: "attr",
	    value: function attr(a, b, c) {
	      if (a === 'transform') a = 'gradientTransform';
	      return _get(_getPrototypeOf(Gradient.prototype), "attr", this).call(this, a, b, c);
	    }
	  }, {
	    key: "targets",
	    value: function targets() {
	      return baseFind('svg [fill*="' + this.id() + '"]');
	    }
	  }, {
	    key: "bbox",
	    value: function bbox$$1() {
	      return new Box();
	    }
	  }]);

	  return Gradient;
	}(Container);
	extend(Gradient, gradiented);
	registerMethods({
	  Container: {
	    // Create gradient element in defs
	    gradient: wrapWithAttrCheck(function (type, block) {
	      return this.defs().gradient(type, block);
	    })
	  },
	  // define gradient
	  Defs: {
	    gradient: wrapWithAttrCheck(function (type, block) {
	      return this.put(new Gradient(type)).update(block);
	    })
	  }
	});
	register(Gradient);

	var Pattern =
	/*#__PURE__*/
	function (_Container) {
	  _inherits(Pattern, _Container);

	  // Initialize node
	  function Pattern(node) {
	    _classCallCheck(this, Pattern);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Pattern).call(this, nodeOrNew('pattern', node), node));
	  } // Return the fill id


	  _createClass(Pattern, [{
	    key: "url",
	    value: function url() {
	      return 'url(#' + this.id() + ')';
	    } // Update pattern by rebuilding

	  }, {
	    key: "update",
	    value: function update(block) {
	      // remove content
	      this.clear(); // invoke passed block

	      if (typeof block === 'function') {
	        block.call(this, this);
	      }

	      return this;
	    } // Alias string convertion to fill

	  }, {
	    key: "toString",
	    value: function toString() {
	      return this.url();
	    } // custom attr to handle transform

	  }, {
	    key: "attr",
	    value: function attr(a, b, c) {
	      if (a === 'transform') a = 'patternTransform';
	      return _get(_getPrototypeOf(Pattern.prototype), "attr", this).call(this, a, b, c);
	    }
	  }, {
	    key: "targets",
	    value: function targets() {
	      return baseFind('svg [fill*="' + this.id() + '"]');
	    }
	  }, {
	    key: "bbox",
	    value: function bbox$$1() {
	      return new Box();
	    }
	  }]);

	  return Pattern;
	}(Container);
	registerMethods({
	  Container: {
	    // Create pattern element in defs
	    pattern: function pattern() {
	      var _this$defs;

	      return (_this$defs = this.defs()).pattern.apply(_this$defs, arguments);
	    }
	  },
	  Defs: {
	    pattern: wrapWithAttrCheck(function (width, height, block) {
	      return this.put(new Pattern()).update(block).attr({
	        x: 0,
	        y: 0,
	        width: width,
	        height: height,
	        patternUnits: 'userSpaceOnUse'
	      });
	    })
	  }
	});
	register(Pattern);

	var Image =
	/*#__PURE__*/
	function (_Shape) {
	  _inherits(Image, _Shape);

	  function Image(node) {
	    _classCallCheck(this, Image);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Image).call(this, nodeOrNew('image', node), node));
	  } // (re)load image


	  _createClass(Image, [{
	    key: "load",
	    value: function load(url, callback) {
	      if (!url) return this;
	      var img = new globals.window.Image();
	      on(img, 'load', function (e) {
	        var p = this.parent(Pattern); // ensure image size

	        if (this.width() === 0 && this.height() === 0) {
	          this.size(img.width, img.height);
	        }

	        if (p instanceof Pattern) {
	          // ensure pattern size if not set
	          if (p.width() === 0 && p.height() === 0) {
	            p.size(this.width(), this.height());
	          }
	        }

	        if (typeof callback === 'function') {
	          callback.call(this, e);
	        }
	      }, this);
	      on(img, 'load error', function () {
	        // dont forget to unbind memory leaking events
	        off(img);
	      });
	      return this.attr('href', img.src = url, xlink);
	    }
	  }]);

	  return Image;
	}(Shape);
	registerAttrHook(function (attr$$1, val, _this) {
	  // convert image fill and stroke to patterns
	  if (attr$$1 === 'fill' || attr$$1 === 'stroke') {
	    if (isImage.test(val)) {
	      val = _this.root().defs().image(val);
	    }
	  }

	  if (val instanceof Image) {
	    val = _this.root().defs().pattern(0, 0, function (pattern) {
	      pattern.add(val);
	    });
	  }

	  return val;
	});
	registerMethods({
	  Container: {
	    // create image element, load image and set its size
	    image: wrapWithAttrCheck(function (source, callback) {
	      return this.put(new Image()).size(0, 0).load(source, callback);
	    })
	  }
	});
	register(Image);

	var PointArray = subClassArray('PointArray', SVGArray);
	extend(PointArray, {
	  // Convert array to string
	  toString: function toString() {
	    // convert to a poly point string
	    for (var i = 0, il = this.length, array = []; i < il; i++) {
	      array.push(this[i].join(','));
	    }

	    return array.join(' ');
	  },
	  // Convert array to line object
	  toLine: function toLine() {
	    return {
	      x1: this[0][0],
	      y1: this[0][1],
	      x2: this[1][0],
	      y2: this[1][1]
	    };
	  },
	  // Get morphed array at given position
	  at: function at(pos) {
	    // make sure a destination is defined
	    if (!this.destination) return this; // generate morphed point string

	    for (var i = 0, il = this.length, array = []; i < il; i++) {
	      array.push([this[i][0] + (this.destination[i][0] - this[i][0]) * pos, this[i][1] + (this.destination[i][1] - this[i][1]) * pos]);
	    }

	    return new PointArray(array);
	  },
	  // Parse point string and flat array
	  parse: function parse() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [[0, 0]];
	    var points = []; // if it is an array

	    if (array instanceof Array) {
	      // and it is not flat, there is no need to parse it
	      if (array[0] instanceof Array) {
	        return array;
	      }
	    } else {
	      // Else, it is considered as a string
	      // parse points
	      array = array.trim().split(delimiter).map(parseFloat);
	    } // validate points - https://svgwg.org/svg2-draft/shapes.html#DataTypePoints
	    // Odd number of coordinates is an error. In such cases, drop the last odd coordinate.


	    if (array.length % 2 !== 0) array.pop(); // wrap points in two-tuples

	    for (var i = 0, len = array.length; i < len; i = i + 2) {
	      points.push([array[i], array[i + 1]]);
	    }

	    return points;
	  },
	  // transform points with matrix (similar to Point.transform)
	  transform: function transform(m) {
	    var points = [];

	    for (var i = 0; i < this.length; i++) {
	      var point = this[i]; // Perform the matrix multiplication

	      points.push([m.a * point[0] + m.c * point[1] + m.e, m.b * point[0] + m.d * point[1] + m.f]);
	    } // Return the required point


	    return new PointArray(points);
	  },
	  // Move point string
	  move: function move(x, y) {
	    var box = this.bbox(); // get relative offset

	    x -= box.x;
	    y -= box.y; // move every point

	    if (!isNaN(x) && !isNaN(y)) {
	      for (var i = this.length - 1; i >= 0; i--) {
	        this[i] = [this[i][0] + x, this[i][1] + y];
	      }
	    }

	    return this;
	  },
	  // Resize poly string
	  size: function size(width, height) {
	    var i;
	    var box = this.bbox(); // recalculate position of all points according to new size

	    for (i = this.length - 1; i >= 0; i--) {
	      if (box.width) this[i][0] = (this[i][0] - box.x) * width / box.width + box.x;
	      if (box.height) this[i][1] = (this[i][1] - box.y) * height / box.height + box.y;
	    }

	    return this;
	  },
	  // Get bounding box of points
	  bbox: function bbox() {
	    var maxX = -Infinity;
	    var maxY = -Infinity;
	    var minX = Infinity;
	    var minY = Infinity;
	    this.forEach(function (el) {
	      maxX = Math.max(el[0], maxX);
	      maxY = Math.max(el[1], maxY);
	      minX = Math.min(el[0], minX);
	      minY = Math.min(el[1], minY);
	    });
	    return {
	      x: minX,
	      y: minY,
	      width: maxX - minX,
	      height: maxY - minY
	    };
	  }
	});

	var MorphArray = PointArray; // Move by left top corner over x-axis

	function x$1(x) {
	  return x == null ? this.bbox().x : this.move(x, this.bbox().y);
	} // Move by left top corner over y-axis

	function y$1(y) {
	  return y == null ? this.bbox().y : this.move(this.bbox().x, y);
	} // Set width of element

	function width$1(width) {
	  var b = this.bbox();
	  return width == null ? b.width : this.size(width, b.height);
	} // Set height of element

	function height$1(height) {
	  var b = this.bbox();
	  return height == null ? b.height : this.size(b.width, height);
	}

	var pointed = ({
		MorphArray: MorphArray,
		x: x$1,
		y: y$1,
		width: width$1,
		height: height$1
	});

	var Line =
	/*#__PURE__*/
	function (_Shape) {
	  _inherits(Line, _Shape);

	  // Initialize node
	  function Line(node) {
	    _classCallCheck(this, Line);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Line).call(this, nodeOrNew('line', node), node));
	  } // Get array


	  _createClass(Line, [{
	    key: "array",
	    value: function array() {
	      return new PointArray([[this.attr('x1'), this.attr('y1')], [this.attr('x2'), this.attr('y2')]]);
	    } // Overwrite native plot() method

	  }, {
	    key: "plot",
	    value: function plot(x1, y1, x2, y2) {
	      if (x1 == null) {
	        return this.array();
	      } else if (typeof y1 !== 'undefined') {
	        x1 = {
	          x1: x1,
	          y1: y1,
	          x2: x2,
	          y2: y2
	        };
	      } else {
	        x1 = new PointArray(x1).toLine();
	      }

	      return this.attr(x1);
	    } // Move by left top corner

	  }, {
	    key: "move",
	    value: function move(x, y) {
	      return this.attr(this.array().move(x, y).toLine());
	    } // Set element size to given width and height

	  }, {
	    key: "size",
	    value: function size(width, height) {
	      var p = proportionalSize(this, width, height);
	      return this.attr(this.array().size(p.width, p.height).toLine());
	    }
	  }]);

	  return Line;
	}(Shape);
	extend(Line, pointed);
	registerMethods({
	  Container: {
	    // Create a line element
	    line: wrapWithAttrCheck(function () {
	      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      // make sure plot is called as a setter
	      // x1 is not necessarily a number, it can also be an array, a string and a PointArray
	      return Line.prototype.plot.apply(this.put(new Line()), args[0] != null ? args : [0, 0, 0, 0]);
	    })
	  }
	});
	register(Line);

	var Marker =
	/*#__PURE__*/
	function (_Container) {
	  _inherits(Marker, _Container);

	  // Initialize node
	  function Marker(node) {
	    _classCallCheck(this, Marker);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Marker).call(this, nodeOrNew('marker', node), node));
	  } // Set width of element


	  _createClass(Marker, [{
	    key: "width",
	    value: function width(_width) {
	      return this.attr('markerWidth', _width);
	    } // Set height of element

	  }, {
	    key: "height",
	    value: function height(_height) {
	      return this.attr('markerHeight', _height);
	    } // Set marker refX and refY

	  }, {
	    key: "ref",
	    value: function ref(x, y) {
	      return this.attr('refX', x).attr('refY', y);
	    } // Update marker

	  }, {
	    key: "update",
	    value: function update(block) {
	      // remove all content
	      this.clear(); // invoke passed block

	      if (typeof block === 'function') {
	        block.call(this, this);
	      }

	      return this;
	    } // Return the fill id

	  }, {
	    key: "toString",
	    value: function toString() {
	      return 'url(#' + this.id() + ')';
	    }
	  }]);

	  return Marker;
	}(Container);
	registerMethods({
	  Container: {
	    marker: function marker() {
	      var _this$defs;

	      // Create marker element in defs
	      return (_this$defs = this.defs()).marker.apply(_this$defs, arguments);
	    }
	  },
	  Defs: {
	    // Create marker
	    marker: wrapWithAttrCheck(function (width, height, block) {
	      // Set default viewbox to match the width and height, set ref to cx and cy and set orient to auto
	      return this.put(new Marker()).size(width, height).ref(width / 2, height / 2).viewbox(0, 0, width, height).attr('orient', 'auto').update(block);
	    })
	  },
	  marker: {
	    // Create and attach markers
	    marker: function marker(_marker, width, height, block) {
	      var attr = ['marker']; // Build attribute name

	      if (_marker !== 'all') attr.push(_marker);
	      attr = attr.join('-'); // Set marker attribute

	      _marker = arguments[1] instanceof Marker ? arguments[1] : this.defs().marker(width, height, block);
	      return this.attr(attr, _marker);
	    }
	  }
	});
	register(Marker);

	var _strictMethod = function (method, arg) {
	  return !!method && _fails(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};

	var $sort = [].sort;
	var test = [1, 2, 3];

	_export(_export.P + _export.F * (_fails(function () {
	  // IE8-
	  test.sort(undefined);
	}) || !_fails(function () {
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !_strictMethod($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn) {
	    return comparefn === undefined
	      ? $sort.call(_toObject(this))
	      : $sort.call(_toObject(this), _aFunction(comparefn));
	  }
	});

	/***
	Base Class
	==========
	The base stepper class that will be
	***/

	function makeSetterGetter(k, f) {
	  return function (v) {
	    if (v == null) return this[v];
	    this[k] = v;
	    if (f) f.call(this);
	    return this;
	  };
	}

	var easing = {
	  '-': function _(pos) {
	    return pos;
	  },
	  '<>': function _(pos) {
	    return -Math.cos(pos * Math.PI) / 2 + 0.5;
	  },
	  '>': function _(pos) {
	    return Math.sin(pos * Math.PI / 2);
	  },
	  '<': function _(pos) {
	    return -Math.cos(pos * Math.PI / 2) + 1;
	  },
	  bezier: function bezier(x1, y1, x2, y2) {
	    // see https://www.w3.org/TR/css-easing-1/#cubic-bezier-algo
	    return function (t) {
	      if (t < 0) {
	        if (x1 > 0) {
	          return y1 / x1 * t;
	        } else if (x2 > 0) {
	          return y2 / x2 * t;
	        } else {
	          return 0;
	        }
	      } else if (t > 1) {
	        if (x2 < 1) {
	          return (1 - y2) / (1 - x2) * t + (y2 - x2) / (1 - x2);
	        } else if (x1 < 1) {
	          return (1 - y1) / (1 - x1) * t + (y1 - x1) / (1 - x1);
	        } else {
	          return 1;
	        }
	      } else {
	        return 3 * t * Math.pow(1 - t, 2) * y1 + 3 * Math.pow(t, 2) * (1 - t) * y2 + Math.pow(t, 3);
	      }
	    };
	  },
	  // see https://www.w3.org/TR/css-easing-1/#step-timing-function-algo
	  steps: function steps(_steps) {
	    var stepPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'end';
	    // deal with "jump-" prefix
	    stepPosition = stepPosition.split('-').reverse()[0];
	    var jumps = _steps;

	    if (stepPosition === 'none') {
	      --jumps;
	    } else if (stepPosition === 'both') {
	      ++jumps;
	    } // The beforeFlag is essentially useless


	    return function (t) {
	      var beforeFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	      // Step is called currentStep in referenced url
	      var step = Math.floor(t * _steps);
	      var jumping = t * step % 1 === 0;

	      if (stepPosition === 'start' || stepPosition === 'both') {
	        ++step;
	      }

	      if (beforeFlag && jumping) {
	        --step;
	      }

	      if (t >= 0 && step < 0) {
	        step = 0;
	      }

	      if (t <= 1 && step > jumps) {
	        step = jumps;
	      }

	      return step / jumps;
	    };
	  }
	};
	var Stepper =
	/*#__PURE__*/
	function () {
	  function Stepper() {
	    _classCallCheck(this, Stepper);
	  }

	  _createClass(Stepper, [{
	    key: "done",
	    value: function done() {
	      return false;
	    }
	  }]);

	  return Stepper;
	}();
	/***
	Easing Functions
	================
	***/

	var Ease =
	/*#__PURE__*/
	function (_Stepper) {
	  _inherits(Ease, _Stepper);

	  function Ease(fn) {
	    var _this;

	    _classCallCheck(this, Ease);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Ease).call(this));
	    _this.ease = easing[fn || timeline.ease] || fn;
	    return _this;
	  }

	  _createClass(Ease, [{
	    key: "step",
	    value: function step(from, to, pos) {
	      if (typeof from !== 'number') {
	        return pos < 1 ? from : to;
	      }

	      return from + (to - from) * this.ease(pos);
	    }
	  }]);

	  return Ease;
	}(Stepper);
	/***
	Controller Types
	================
	***/

	var Controller =
	/*#__PURE__*/
	function (_Stepper2) {
	  _inherits(Controller, _Stepper2);

	  function Controller(fn) {
	    var _this2;

	    _classCallCheck(this, Controller);

	    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Controller).call(this));
	    _this2.stepper = fn;
	    return _this2;
	  }

	  _createClass(Controller, [{
	    key: "step",
	    value: function step(current, target, dt, c) {
	      return this.stepper(current, target, dt, c);
	    }
	  }, {
	    key: "done",
	    value: function done(c) {
	      return c.done;
	    }
	  }]);

	  return Controller;
	}(Stepper);

	function recalculate() {
	  // Apply the default parameters
	  var duration = (this._duration || 500) / 1000;
	  var overshoot = this._overshoot || 0; // Calculate the PID natural response

	  var eps = 1e-10;
	  var pi = Math.PI;
	  var os = Math.log(overshoot / 100 + eps);
	  var zeta = -os / Math.sqrt(pi * pi + os * os);
	  var wn = 3.9 / (zeta * duration); // Calculate the Spring values

	  this.d = 2 * zeta * wn;
	  this.k = wn * wn;
	}

	var Spring =
	/*#__PURE__*/
	function (_Controller) {
	  _inherits(Spring, _Controller);

	  function Spring(duration, overshoot) {
	    var _this3;

	    _classCallCheck(this, Spring);

	    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Spring).call(this));

	    _this3.duration(duration || 500).overshoot(overshoot || 0);

	    return _this3;
	  }

	  _createClass(Spring, [{
	    key: "step",
	    value: function step(current, target, dt, c) {
	      if (typeof current === 'string') return current;
	      c.done = dt === Infinity;
	      if (dt === Infinity) return target;
	      if (dt === 0) return current;
	      if (dt > 100) dt = 16;
	      dt /= 1000; // Get the previous velocity

	      var velocity = c.velocity || 0; // Apply the control to get the new position and store it

	      var acceleration = -this.d * velocity - this.k * (current - target);
	      var newPosition = current + velocity * dt + acceleration * dt * dt / 2; // Store the velocity

	      c.velocity = velocity + acceleration * dt; // Figure out if we have converged, and if so, pass the value

	      c.done = Math.abs(target - newPosition) + Math.abs(velocity) < 0.002;
	      return c.done ? target : newPosition;
	    }
	  }]);

	  return Spring;
	}(Controller);
	extend(Spring, {
	  duration: makeSetterGetter('_duration', recalculate),
	  overshoot: makeSetterGetter('_overshoot', recalculate)
	});
	var PID =
	/*#__PURE__*/
	function (_Controller2) {
	  _inherits(PID, _Controller2);

	  function PID(p, i, d, windup) {
	    var _this4;

	    _classCallCheck(this, PID);

	    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(PID).call(this));
	    p = p == null ? 0.1 : p;
	    i = i == null ? 0.01 : i;
	    d = d == null ? 0 : d;
	    windup = windup == null ? 1000 : windup;

	    _this4.p(p).i(i).d(d).windup(windup);

	    return _this4;
	  }

	  _createClass(PID, [{
	    key: "step",
	    value: function step(current, target, dt, c) {
	      if (typeof current === 'string') return current;
	      c.done = dt === Infinity;
	      if (dt === Infinity) return target;
	      if (dt === 0) return current;
	      var p = target - current;
	      var i = (c.integral || 0) + p * dt;
	      var d = (p - (c.error || 0)) / dt;
	      var windup = this.windup; // antiwindup

	      if (windup !== false) {
	        i = Math.max(-windup, Math.min(i, windup));
	      }

	      c.error = p;
	      c.integral = i;
	      c.done = Math.abs(p) < 0.001;
	      return c.done ? target : current + (this.P * p + this.I * i + this.D * d);
	    }
	  }]);

	  return PID;
	}(Controller);
	extend(PID, {
	  windup: makeSetterGetter('windup'),
	  p: makeSetterGetter('P'),
	  i: makeSetterGetter('I'),
	  d: makeSetterGetter('D')
	});

	var PathArray = subClassArray('PathArray', SVGArray);
	function pathRegReplace(a, b, c, d) {
	  return c + d.replace(dots, ' .');
	}

	function arrayToString(a) {
	  for (var i = 0, il = a.length, s = ''; i < il; i++) {
	    s += a[i][0];

	    if (a[i][1] != null) {
	      s += a[i][1];

	      if (a[i][2] != null) {
	        s += ' ';
	        s += a[i][2];

	        if (a[i][3] != null) {
	          s += ' ';
	          s += a[i][3];
	          s += ' ';
	          s += a[i][4];

	          if (a[i][5] != null) {
	            s += ' ';
	            s += a[i][5];
	            s += ' ';
	            s += a[i][6];

	            if (a[i][7] != null) {
	              s += ' ';
	              s += a[i][7];
	            }
	          }
	        }
	      }
	    }
	  }

	  return s + ' ';
	}

	var pathHandlers = {
	  M: function M(c, p, p0) {
	    p.x = p0.x = c[0];
	    p.y = p0.y = c[1];
	    return ['M', p.x, p.y];
	  },
	  L: function L(c, p) {
	    p.x = c[0];
	    p.y = c[1];
	    return ['L', c[0], c[1]];
	  },
	  H: function H(c, p) {
	    p.x = c[0];
	    return ['H', c[0]];
	  },
	  V: function V(c, p) {
	    p.y = c[0];
	    return ['V', c[0]];
	  },
	  C: function C(c, p) {
	    p.x = c[4];
	    p.y = c[5];
	    return ['C', c[0], c[1], c[2], c[3], c[4], c[5]];
	  },
	  S: function S(c, p) {
	    p.x = c[2];
	    p.y = c[3];
	    return ['S', c[0], c[1], c[2], c[3]];
	  },
	  Q: function Q(c, p) {
	    p.x = c[2];
	    p.y = c[3];
	    return ['Q', c[0], c[1], c[2], c[3]];
	  },
	  T: function T(c, p) {
	    p.x = c[0];
	    p.y = c[1];
	    return ['T', c[0], c[1]];
	  },
	  Z: function Z(c, p, p0) {
	    p.x = p0.x;
	    p.y = p0.y;
	    return ['Z'];
	  },
	  A: function A(c, p) {
	    p.x = c[5];
	    p.y = c[6];
	    return ['A', c[0], c[1], c[2], c[3], c[4], c[5], c[6]];
	  }
	};
	var mlhvqtcsaz = 'mlhvqtcsaz'.split('');

	for (var i$1 = 0, il = mlhvqtcsaz.length; i$1 < il; ++i$1) {
	  pathHandlers[mlhvqtcsaz[i$1]] = function (i) {
	    return function (c, p, p0) {
	      if (i === 'H') c[0] = c[0] + p.x;else if (i === 'V') c[0] = c[0] + p.y;else if (i === 'A') {
	        c[5] = c[5] + p.x;
	        c[6] = c[6] + p.y;
	      } else {
	        for (var j = 0, jl = c.length; j < jl; ++j) {
	          c[j] = c[j] + (j % 2 ? p.y : p.x);
	        }
	      }
	      return pathHandlers[i](c, p, p0);
	    };
	  }(mlhvqtcsaz[i$1].toUpperCase());
	}

	extend(PathArray, {
	  // Convert array to string
	  toString: function toString() {
	    return arrayToString(this);
	  },
	  // Move path string
	  move: function move(x, y) {
	    // get bounding box of current situation
	    var box = this.bbox(); // get relative offset

	    x -= box.x;
	    y -= box.y;

	    if (!isNaN(x) && !isNaN(y)) {
	      // move every point
	      for (var l, i = this.length - 1; i >= 0; i--) {
	        l = this[i][0];

	        if (l === 'M' || l === 'L' || l === 'T') {
	          this[i][1] += x;
	          this[i][2] += y;
	        } else if (l === 'H') {
	          this[i][1] += x;
	        } else if (l === 'V') {
	          this[i][1] += y;
	        } else if (l === 'C' || l === 'S' || l === 'Q') {
	          this[i][1] += x;
	          this[i][2] += y;
	          this[i][3] += x;
	          this[i][4] += y;

	          if (l === 'C') {
	            this[i][5] += x;
	            this[i][6] += y;
	          }
	        } else if (l === 'A') {
	          this[i][6] += x;
	          this[i][7] += y;
	        }
	      }
	    }

	    return this;
	  },
	  // Resize path string
	  size: function size(width, height) {
	    // get bounding box of current situation
	    var box = this.bbox();
	    var i, l; // recalculate position of all points according to new size

	    for (i = this.length - 1; i >= 0; i--) {
	      l = this[i][0];

	      if (l === 'M' || l === 'L' || l === 'T') {
	        this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
	        this[i][2] = (this[i][2] - box.y) * height / box.height + box.y;
	      } else if (l === 'H') {
	        this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
	      } else if (l === 'V') {
	        this[i][1] = (this[i][1] - box.y) * height / box.height + box.y;
	      } else if (l === 'C' || l === 'S' || l === 'Q') {
	        this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
	        this[i][2] = (this[i][2] - box.y) * height / box.height + box.y;
	        this[i][3] = (this[i][3] - box.x) * width / box.width + box.x;
	        this[i][4] = (this[i][4] - box.y) * height / box.height + box.y;

	        if (l === 'C') {
	          this[i][5] = (this[i][5] - box.x) * width / box.width + box.x;
	          this[i][6] = (this[i][6] - box.y) * height / box.height + box.y;
	        }
	      } else if (l === 'A') {
	        // resize radii
	        this[i][1] = this[i][1] * width / box.width;
	        this[i][2] = this[i][2] * height / box.height; // move position values

	        this[i][6] = (this[i][6] - box.x) * width / box.width + box.x;
	        this[i][7] = (this[i][7] - box.y) * height / box.height + box.y;
	      }
	    }

	    return this;
	  },
	  // Test if the passed path array use the same path data commands as this path array
	  equalCommands: function equalCommands(pathArray) {
	    var i, il, equalCommands;
	    pathArray = new PathArray(pathArray);
	    equalCommands = this.length === pathArray.length;

	    for (i = 0, il = this.length; equalCommands && i < il; i++) {
	      equalCommands = this[i][0] === pathArray[i][0];
	    }

	    return equalCommands;
	  },
	  // Make path array morphable
	  morph: function morph(pathArray) {
	    pathArray = new PathArray(pathArray);

	    if (this.equalCommands(pathArray)) {
	      this.destination = pathArray;
	    } else {
	      this.destination = null;
	    }

	    return this;
	  },
	  // Get morphed path array at given position
	  at: function at(pos) {
	    // make sure a destination is defined
	    if (!this.destination) return this;
	    var sourceArray = this;
	    var destinationArray = this.destination.value;
	    var array = [];
	    var pathArray = new PathArray();
	    var i, il, j, jl; // Animate has specified in the SVG spec
	    // See: https://www.w3.org/TR/SVG11/paths.html#PathElement

	    for (i = 0, il = sourceArray.length; i < il; i++) {
	      array[i] = [sourceArray[i][0]];

	      for (j = 1, jl = sourceArray[i].length; j < jl; j++) {
	        array[i][j] = sourceArray[i][j] + (destinationArray[i][j] - sourceArray[i][j]) * pos;
	      } // For the two flags of the elliptical arc command, the SVG spec say:
	      // Flags and booleans are interpolated as fractions between zero and one, with any non-zero value considered to be a value of one/true
	      // Elliptical arc command as an array followed by corresponding indexes:
	      // ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
	      //   0    1   2        3                 4             5      6  7


	      if (array[i][0] === 'A') {
	        array[i][4] = +(array[i][4] !== 0);
	        array[i][5] = +(array[i][5] !== 0);
	      }
	    } // Directly modify the value of a path array, this is done this way for performance


	    pathArray.value = array;
	    return pathArray;
	  },
	  // Absolutize and parse path to array
	  parse: function parse() {
	    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [['M', 0, 0]];
	    // if it's already a patharray, no need to parse it
	    if (array instanceof PathArray) return array; // prepare for parsing

	    var s;
	    var paramCnt = {
	      'M': 2,
	      'L': 2,
	      'H': 1,
	      'V': 1,
	      'C': 6,
	      'S': 4,
	      'Q': 4,
	      'T': 2,
	      'A': 7,
	      'Z': 0
	    };

	    if (typeof array === 'string') {
	      array = array.replace(numbersWithDots, pathRegReplace) // convert 45.123.123 to 45.123 .123
	      .replace(pathLetters, ' $& ') // put some room between letters and numbers
	      .replace(hyphen, '$1 -') // add space before hyphen
	      .trim() // trim
	      .split(delimiter); // split into array
	    } else {
	      array = array.reduce(function (prev, curr) {
	        return [].concat.call(prev, curr);
	      }, []);
	    } // array now is an array containing all parts of a path e.g. ['M', '0', '0', 'L', '30', '30' ...]


	    var result = [];
	    var p = new Point();
	    var p0 = new Point();
	    var index = 0;
	    var len = array.length;

	    do {
	      // Test if we have a path letter
	      if (isPathLetter.test(array[index])) {
	        s = array[index];
	        ++index; // If last letter was a move command and we got no new, it defaults to [L]ine
	      } else if (s === 'M') {
	        s = 'L';
	      } else if (s === 'm') {
	        s = 'l';
	      }

	      result.push(pathHandlers[s].call(null, array.slice(index, index = index + paramCnt[s.toUpperCase()]).map(parseFloat), p, p0));
	    } while (len > index);

	    return result;
	  },
	  // Get bounding box of path
	  bbox: function bbox() {
	    parser().path.setAttribute('d', this.toString());
	    return parser.nodes.path.getBBox();
	  }
	});

	var Morphable =
	/*#__PURE__*/
	function () {
	  function Morphable(stepper) {
	    _classCallCheck(this, Morphable);

	    this._stepper = stepper || new Ease('-');
	    this._from = null;
	    this._to = null;
	    this._type = null;
	    this._context = null;
	    this._morphObj = null;
	  }

	  _createClass(Morphable, [{
	    key: "from",
	    value: function from(val) {
	      if (val == null) {
	        return this._from;
	      }

	      this._from = this._set(val);
	      return this;
	    }
	  }, {
	    key: "to",
	    value: function to(val) {
	      if (val == null) {
	        return this._to;
	      }

	      this._to = this._set(val);
	      return this;
	    }
	  }, {
	    key: "type",
	    value: function type(_type) {
	      // getter
	      if (_type == null) {
	        return this._type;
	      } // setter


	      this._type = _type;
	      return this;
	    }
	  }, {
	    key: "_set",
	    value: function _set(value) {
	      if (!this._type) {
	        var type = _typeof(value);

	        if (type === 'number') {
	          this.type(SVGNumber);
	        } else if (type === 'string') {
	          if (Color.isColor(value)) {
	            this.type(Color);
	          } else if (delimiter.test(value)) {
	            this.type(pathLetters.test(value) ? PathArray : SVGArray);
	          } else if (numberAndUnit.test(value)) {
	            this.type(SVGNumber);
	          } else {
	            this.type(NonMorphable);
	          }
	        } else if (morphableTypes.indexOf(value.constructor) > -1) {
	          this.type(value.constructor);
	        } else if (Array.isArray(value)) {
	          this.type(SVGArray);
	        } else if (type === 'object') {
	          this.type(ObjectBag);
	        } else {
	          this.type(NonMorphable);
	        }
	      }

	      var result = new this._type(value);

	      if (this._type === Color) {
	        result = this._to ? result[this._to[4]]() : this._from ? result[this._from[4]]() : result;
	      }

	      result = result.toArray();
	      this._morphObj = this._morphObj || new this._type();
	      this._context = this._context || Array.apply(null, Array(result.length)).map(Object).map(function (o) {
	        o.done = true;
	        return o;
	      });
	      return result;
	    }
	  }, {
	    key: "stepper",
	    value: function stepper(_stepper) {
	      if (_stepper == null) return this._stepper;
	      this._stepper = _stepper;
	      return this;
	    }
	  }, {
	    key: "done",
	    value: function done() {
	      var complete = this._context.map(this._stepper.done).reduce(function (last, curr) {
	        return last && curr;
	      }, true);

	      return complete;
	    }
	  }, {
	    key: "at",
	    value: function at(pos) {
	      var _this = this;

	      return this._morphObj.fromArray(this._from.map(function (i, index) {
	        return _this._stepper.step(i, _this._to[index], pos, _this._context[index], _this._context);
	      }));
	    }
	  }]);

	  return Morphable;
	}();
	var NonMorphable =
	/*#__PURE__*/
	function () {
	  function NonMorphable() {
	    _classCallCheck(this, NonMorphable);

	    this.init.apply(this, arguments);
	  }

	  _createClass(NonMorphable, [{
	    key: "init",
	    value: function init(val) {
	      val = Array.isArray(val) ? val[0] : val;
	      this.value = val;
	      return this;
	    }
	  }, {
	    key: "valueOf",
	    value: function valueOf() {
	      return this.value;
	    }
	  }, {
	    key: "toArray",
	    value: function toArray() {
	      return [this.value];
	    }
	  }]);

	  return NonMorphable;
	}();
	var TransformBag =
	/*#__PURE__*/
	function () {
	  function TransformBag() {
	    _classCallCheck(this, TransformBag);

	    this.init.apply(this, arguments);
	  }

	  _createClass(TransformBag, [{
	    key: "init",
	    value: function init(obj) {
	      if (Array.isArray(obj)) {
	        obj = {
	          scaleX: obj[0],
	          scaleY: obj[1],
	          shear: obj[2],
	          rotate: obj[3],
	          translateX: obj[4],
	          translateY: obj[5],
	          originX: obj[6],
	          originY: obj[7]
	        };
	      }

	      Object.assign(this, TransformBag.defaults, obj);
	      return this;
	    }
	  }, {
	    key: "toArray",
	    value: function toArray() {
	      var v = this;
	      return [v.scaleX, v.scaleY, v.shear, v.rotate, v.translateX, v.translateY, v.originX, v.originY];
	    }
	  }]);

	  return TransformBag;
	}();
	TransformBag.defaults = {
	  scaleX: 1,
	  scaleY: 1,
	  shear: 0,
	  rotate: 0,
	  translateX: 0,
	  translateY: 0,
	  originX: 0,
	  originY: 0
	};
	var ObjectBag =
	/*#__PURE__*/
	function () {
	  function ObjectBag() {
	    _classCallCheck(this, ObjectBag);

	    this.init.apply(this, arguments);
	  }

	  _createClass(ObjectBag, [{
	    key: "init",
	    value: function init(objOrArr) {
	      this.values = [];

	      if (Array.isArray(objOrArr)) {
	        this.values = objOrArr;
	        return;
	      }

	      objOrArr = objOrArr || {};
	      var entries = [];

	      for (var i in objOrArr) {
	        entries.push([i, objOrArr[i]]);
	      }

	      entries.sort(function (a, b) {
	        return a[0] - b[0];
	      });
	      this.values = entries.reduce(function (last, curr) {
	        return last.concat(curr);
	      }, []);
	      return this;
	    }
	  }, {
	    key: "valueOf",
	    value: function valueOf() {
	      var obj = {};
	      var arr = this.values;

	      for (var i = 0, len = arr.length; i < len; i += 2) {
	        obj[arr[i]] = arr[i + 1];
	      }

	      return obj;
	    }
	  }, {
	    key: "toArray",
	    value: function toArray() {
	      return this.values;
	    }
	  }]);

	  return ObjectBag;
	}();
	var morphableTypes = [NonMorphable, TransformBag, ObjectBag];
	function registerMorphableType() {
	  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  morphableTypes.push.apply(morphableTypes, _toConsumableArray([].concat(type)));
	}
	function makeMorphable() {
	  extend(morphableTypes, {
	    to: function to(val) {
	      return new Morphable().type(this.constructor).from(this.valueOf()).to(val);
	    },
	    fromArray: function fromArray(arr) {
	      this.init(arr);
	      return this;
	    }
	  });
	}

	var Path =
	/*#__PURE__*/
	function (_Shape) {
	  _inherits(Path, _Shape);

	  // Initialize node
	  function Path(node) {
	    _classCallCheck(this, Path);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Path).call(this, nodeOrNew('path', node), node));
	  } // Get array


	  _createClass(Path, [{
	    key: "array",
	    value: function array() {
	      return this._array || (this._array = new PathArray(this.attr('d')));
	    } // Plot new path

	  }, {
	    key: "plot",
	    value: function plot(d) {
	      return d == null ? this.array() : this.clear().attr('d', typeof d === 'string' ? d : this._array = new PathArray(d));
	    } // Clear array cache

	  }, {
	    key: "clear",
	    value: function clear() {
	      delete this._array;
	      return this;
	    } // Move by left top corner

	  }, {
	    key: "move",
	    value: function move(x, y) {
	      return this.attr('d', this.array().move(x, y));
	    } // Move by left top corner over x-axis

	  }, {
	    key: "x",
	    value: function x(_x) {
	      return _x == null ? this.bbox().x : this.move(_x, this.bbox().y);
	    } // Move by left top corner over y-axis

	  }, {
	    key: "y",
	    value: function y(_y) {
	      return _y == null ? this.bbox().y : this.move(this.bbox().x, _y);
	    } // Set element size to given width and height

	  }, {
	    key: "size",
	    value: function size(width, height) {
	      var p = proportionalSize(this, width, height);
	      return this.attr('d', this.array().size(p.width, p.height));
	    } // Set width of element

	  }, {
	    key: "width",
	    value: function width(_width) {
	      return _width == null ? this.bbox().width : this.size(_width, this.bbox().height);
	    } // Set height of element

	  }, {
	    key: "height",
	    value: function height(_height) {
	      return _height == null ? this.bbox().height : this.size(this.bbox().width, _height);
	    }
	  }, {
	    key: "targets",
	    value: function targets() {
	      return baseFind('svg textpath [href*="' + this.id() + '"]');
	    }
	  }]);

	  return Path;
	}(Shape); // Define morphable array
	Path.prototype.MorphArray = PathArray; // Add parent method

	registerMethods({
	  Container: {
	    // Create a wrapped path element
	    path: wrapWithAttrCheck(function (d) {
	      // make sure plot is called as a setter
	      return this.put(new Path()).plot(d || new PathArray());
	    })
	  }
	});
	register(Path);

	function array() {
	  return this._array || (this._array = new PointArray(this.attr('points')));
	} // Plot new path

	function plot(p) {
	  return p == null ? this.array() : this.clear().attr('points', typeof p === 'string' ? p : this._array = new PointArray(p));
	} // Clear array cache

	function clear() {
	  delete this._array;
	  return this;
	} // Move by left top corner

	function move(x, y) {
	  return this.attr('points', this.array().move(x, y));
	} // Set element size to given width and height

	function size(width, height) {
	  var p = proportionalSize(this, width, height);
	  return this.attr('points', this.array().size(p.width, p.height));
	}

	var poly = ({
		array: array,
		plot: plot,
		clear: clear,
		move: move,
		size: size
	});

	var Polygon =
	/*#__PURE__*/
	function (_Shape) {
	  _inherits(Polygon, _Shape);

	  // Initialize node
	  function Polygon(node) {
	    _classCallCheck(this, Polygon);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Polygon).call(this, nodeOrNew('polygon', node), node));
	  }

	  return Polygon;
	}(Shape);
	registerMethods({
	  Container: {
	    // Create a wrapped polygon element
	    polygon: wrapWithAttrCheck(function (p) {
	      // make sure plot is called as a setter
	      return this.put(new Polygon()).plot(p || new PointArray());
	    })
	  }
	});
	extend(Polygon, pointed);
	extend(Polygon, poly);
	register(Polygon);

	var Polyline =
	/*#__PURE__*/
	function (_Shape) {
	  _inherits(Polyline, _Shape);

	  // Initialize node
	  function Polyline(node) {
	    _classCallCheck(this, Polyline);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Polyline).call(this, nodeOrNew('polyline', node), node));
	  }

	  return Polyline;
	}(Shape);
	registerMethods({
	  Container: {
	    // Create a wrapped polygon element
	    polyline: wrapWithAttrCheck(function (p) {
	      // make sure plot is called as a setter
	      return this.put(new Polyline()).plot(p || new PointArray());
	    })
	  }
	});
	extend(Polyline, pointed);
	extend(Polyline, poly);
	register(Polyline);

	var Rect =
	/*#__PURE__*/
	function (_Shape) {
	  _inherits(Rect, _Shape);

	  // Initialize node
	  function Rect(node) {
	    _classCallCheck(this, Rect);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Rect).call(this, nodeOrNew('rect', node), node));
	  }

	  return Rect;
	}(Shape);
	extend(Rect, {
	  rx: rx,
	  ry: ry
	});
	registerMethods({
	  Container: {
	    // Create a rect element
	    rect: wrapWithAttrCheck(function (width$$1, height$$1) {
	      return this.put(new Rect()).size(width$$1, height$$1);
	    })
	  }
	});
	register(Rect);

	var Queue =
	/*#__PURE__*/
	function () {
	  function Queue() {
	    _classCallCheck(this, Queue);

	    this._first = null;
	    this._last = null;
	  }

	  _createClass(Queue, [{
	    key: "push",
	    value: function push(value) {
	      // An item stores an id and the provided value
	      var item = value.next ? value : {
	        value: value,
	        next: null,
	        prev: null // Deal with the queue being empty or populated

	      };

	      if (this._last) {
	        item.prev = this._last;
	        this._last.next = item;
	        this._last = item;
	      } else {
	        this._last = item;
	        this._first = item;
	      } // Return the current item


	      return item;
	    }
	  }, {
	    key: "shift",
	    value: function shift() {
	      // Check if we have a value
	      var remove = this._first;
	      if (!remove) return null; // If we do, remove it and relink things

	      this._first = remove.next;
	      if (this._first) this._first.prev = null;
	      this._last = this._first ? this._last : null;
	      return remove.value;
	    } // Shows us the first item in the list

	  }, {
	    key: "first",
	    value: function first() {
	      return this._first && this._first.value;
	    } // Shows us the last item in the list

	  }, {
	    key: "last",
	    value: function last() {
	      return this._last && this._last.value;
	    } // Removes the item that was returned from the push

	  }, {
	    key: "remove",
	    value: function remove(item) {
	      // Relink the previous item
	      if (item.prev) item.prev.next = item.next;
	      if (item.next) item.next.prev = item.prev;
	      if (item === this._last) this._last = item.prev;
	      if (item === this._first) this._first = item.next; // Invalidate item

	      item.prev = null;
	      item.next = null;
	    }
	  }]);

	  return Queue;
	}();

	var Animator = {
	  nextDraw: null,
	  frames: new Queue(),
	  timeouts: new Queue(),
	  immediates: new Queue(),
	  timer: function timer() {
	    return globals.window.performance || globals.window.Date;
	  },
	  transforms: [],
	  frame: function frame(fn) {
	    // Store the node
	    var node = Animator.frames.push({
	      run: fn
	    }); // Request an animation frame if we don't have one

	    if (Animator.nextDraw === null) {
	      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
	    } // Return the node so we can remove it easily


	    return node;
	  },
	  timeout: function timeout(fn, delay) {
	    delay = delay || 0; // Work out when the event should fire

	    var time = Animator.timer().now() + delay; // Add the timeout to the end of the queue

	    var node = Animator.timeouts.push({
	      run: fn,
	      time: time
	    }); // Request another animation frame if we need one

	    if (Animator.nextDraw === null) {
	      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
	    }

	    return node;
	  },
	  immediate: function immediate(fn) {
	    // Add the immediate fn to the end of the queue
	    var node = Animator.immediates.push(fn); // Request another animation frame if we need one

	    if (Animator.nextDraw === null) {
	      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
	    }

	    return node;
	  },
	  cancelFrame: function cancelFrame(node) {
	    node != null && Animator.frames.remove(node);
	  },
	  clearTimeout: function clearTimeout(node) {
	    node != null && Animator.timeouts.remove(node);
	  },
	  cancelImmediate: function cancelImmediate(node) {
	    node != null && Animator.immediates.remove(node);
	  },
	  _draw: function _draw(now) {
	    // Run all the timeouts we can run, if they are not ready yet, add them
	    // to the end of the queue immediately! (bad timeouts!!! [sarcasm])
	    var nextTimeout = null;
	    var lastTimeout = Animator.timeouts.last();

	    while (nextTimeout = Animator.timeouts.shift()) {
	      // Run the timeout if its time, or push it to the end
	      if (now >= nextTimeout.time) {
	        nextTimeout.run();
	      } else {
	        Animator.timeouts.push(nextTimeout);
	      } // If we hit the last item, we should stop shifting out more items


	      if (nextTimeout === lastTimeout) break;
	    } // Run all of the animation frames


	    var nextFrame = null;
	    var lastFrame = Animator.frames.last();

	    while (nextFrame !== lastFrame && (nextFrame = Animator.frames.shift())) {
	      nextFrame.run(now);
	    }

	    var nextImmediate = null;

	    while (nextImmediate = Animator.immediates.shift()) {
	      nextImmediate();
	    } // If we have remaining timeouts or frames, draw until we don't anymore


	    Animator.nextDraw = Animator.timeouts.first() || Animator.frames.first() ? globals.window.requestAnimationFrame(Animator._draw) : null;
	  }
	};

	var makeSchedule = function makeSchedule(runnerInfo) {
	  var start = runnerInfo.start;
	  var duration = runnerInfo.runner.duration();
	  var end = start + duration;
	  return {
	    start: start,
	    duration: duration,
	    end: end,
	    runner: runnerInfo.runner
	  };
	};

	var defaultSource = function defaultSource() {
	  var w = globals.window;
	  return (w.performance || w.Date).now();
	};

	var Timeline =
	/*#__PURE__*/
	function (_EventTarget) {
	  _inherits(Timeline, _EventTarget);

	  // Construct a new timeline on the given element
	  function Timeline() {
	    var _this;

	    var timeSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSource;

	    _classCallCheck(this, Timeline);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Timeline).call(this));
	    _this._timeSource = timeSource; // Store the timing variables

	    _this._startTime = 0;
	    _this._speed = 1.0; // Determines how long a runner is hold in memory. Can be a dt or true/false

	    _this._persist = 0; // Keep track of the running animations and their starting parameters

	    _this._nextFrame = null;
	    _this._paused = true;
	    _this._runners = [];
	    _this._runnerIds = [];
	    _this._lastRunnerId = -1;
	    _this._time = 0;
	    _this._lastSourceTime = 0;
	    _this._lastStepTime = 0; // Make sure that step is always called in class context

	    _this._step = _this._stepFn.bind(_assertThisInitialized(_assertThisInitialized(_this)), false);
	    _this._stepImmediate = _this._stepFn.bind(_assertThisInitialized(_assertThisInitialized(_this)), true);
	    return _this;
	  } // schedules a runner on the timeline


	  _createClass(Timeline, [{
	    key: "schedule",
	    value: function schedule(runner, delay, when) {
	      if (runner == null) {
	        return this._runners.map(makeSchedule);
	      } // The start time for the next animation can either be given explicitly,
	      // derived from the current timeline time or it can be relative to the
	      // last start time to chain animations direclty


	      var absoluteStartTime = 0;
	      var endTime = this.getEndTime();
	      delay = delay || 0; // Work out when to start the animation

	      if (when == null || when === 'last' || when === 'after') {
	        // Take the last time and increment
	        absoluteStartTime = endTime;
	      } else if (when === 'absolute' || when === 'start') {
	        absoluteStartTime = delay;
	        delay = 0;
	      } else if (when === 'now') {
	        absoluteStartTime = this._time;
	      } else if (when === 'relative') {
	        var _runnerInfo = this._runners[runner.id];

	        if (_runnerInfo) {
	          absoluteStartTime = _runnerInfo.start + delay;
	          delay = 0;
	        }
	      } else {
	        throw new Error('Invalid value for the "when" parameter');
	      } // Manage runner


	      runner.unschedule();
	      runner.timeline(this);
	      var persist = runner.persist();
	      var runnerInfo = {
	        persist: persist === null ? this._persist : persist,
	        start: absoluteStartTime + delay,
	        runner: runner
	      };
	      this._lastRunnerId = runner.id;

	      this._runners.push(runnerInfo);

	      this._runners.sort(function (a, b) {
	        return a.start - b.start;
	      });

	      this._runnerIds = this._runners.map(function (info) {
	        return info.runner.id;
	      });

	      this.updateTime()._continue();

	      return this;
	    } // Remove the runner from this timeline

	  }, {
	    key: "unschedule",
	    value: function unschedule(runner) {
	      var index = this._runnerIds.indexOf(runner.id);

	      if (index < 0) return this;

	      this._runners.splice(index, 1);

	      this._runnerIds.splice(index, 1);

	      runner.timeline(null);
	      return this;
	    } // Calculates the end of the timeline

	  }, {
	    key: "getEndTime",
	    value: function getEndTime() {
	      var lastRunnerInfo = this._runners[this._runnerIds.indexOf(this._lastRunnerId)];

	      var lastDuration = lastRunnerInfo ? lastRunnerInfo.runner.duration() : 0;
	      var lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : 0;
	      return lastStartTime + lastDuration;
	    } // Makes sure, that after pausing the time doesn't jump

	  }, {
	    key: "updateTime",
	    value: function updateTime() {
	      if (!this.active()) {
	        this._lastSourceTime = this._timeSource();
	      }

	      return this;
	    }
	  }, {
	    key: "play",
	    value: function play() {
	      // Now make sure we are not paused and continue the animation
	      this._paused = false;
	      return this.updateTime()._continue();
	    }
	  }, {
	    key: "pause",
	    value: function pause() {
	      this._paused = true;
	      return this._continue();
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      // Go to start and pause
	      this.time(0);
	      return this.pause();
	    }
	  }, {
	    key: "finish",
	    value: function finish() {
	      // Go to end and pause
	      this.time(this.getEndTime() + 1);
	      return this.pause();
	    }
	  }, {
	    key: "speed",
	    value: function speed(_speed) {
	      if (_speed == null) return this._speed;
	      this._speed = _speed;
	      return this;
	    }
	  }, {
	    key: "reverse",
	    value: function reverse(yes) {
	      var currentSpeed = this.speed();
	      if (yes == null) return this.speed(-currentSpeed);
	      var positive = Math.abs(currentSpeed);
	      return this.speed(yes ? positive : -positive);
	    }
	  }, {
	    key: "seek",
	    value: function seek(dt) {
	      return this.time(this._time + dt);
	    }
	  }, {
	    key: "time",
	    value: function time(_time) {
	      if (_time == null) return this._time;
	      this._time = _time;
	      return this._continue(true);
	    }
	  }, {
	    key: "persist",
	    value: function persist(dtOrForever) {
	      if (dtOrForever == null) return this._persist;
	      this._persist = dtOrForever;
	      return this;
	    }
	  }, {
	    key: "source",
	    value: function source(fn) {
	      if (fn == null) return this._timeSource;
	      this._timeSource = fn;
	      return this;
	    }
	  }, {
	    key: "_stepFn",
	    value: function _stepFn() {
	      var immediateStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	      // Get the time delta from the last time and update the time
	      var time = this._timeSource();

	      var dtSource = time - this._lastSourceTime;
	      if (immediateStep) dtSource = 0;
	      var dtTime = this._speed * dtSource + (this._time - this._lastStepTime);
	      this._lastSourceTime = time; // Only update the time if we use the timeSource.
	      // Otherwise use the current time

	      if (!immediateStep) {
	        // Update the time
	        this._time += dtTime;
	        this._time = this._time < 0 ? 0 : this._time;
	      }

	      this._lastStepTime = this._time;
	      this.fire('time', this._time); // This is for the case that the timeline was seeked so that the time
	      // is now before the startTime of the runner. Thats why we need to set
	      // the runner to position 0
	      // FIXME:
	      // However, reseting in insertion order leads to bugs. Considering the case,
	      // where 2 runners change the same attriute but in different times,
	      // reseting both of them will lead to the case where the later defined
	      // runner always wins the reset even if the other runner started earlier
	      // and therefore should win the attribute battle
	      // this can be solved by reseting them backwards

	      for (var k = this._runners.length; k--;) {
	        // Get and run the current runner and ignore it if its inactive
	        var runnerInfo = this._runners[k];
	        var runner = runnerInfo.runner; // Make sure that we give the actual difference
	        // between runner start time and now

	        var dtToStart = this._time - runnerInfo.start; // Dont run runner if not started yet
	        // and try to reset it

	        if (dtToStart <= 0) {
	          runner.reset();
	        }
	      } // Run all of the runners directly


	      var runnersLeft = false;

	      for (var i = 0, len = this._runners.length; i < len; i++) {
	        // Get and run the current runner and ignore it if its inactive
	        var _runnerInfo2 = this._runners[i];
	        var _runner = _runnerInfo2.runner;
	        var dt = dtTime; // Make sure that we give the actual difference
	        // between runner start time and now

	        var _dtToStart = this._time - _runnerInfo2.start; // Dont run runner if not started yet


	        if (_dtToStart <= 0) {
	          runnersLeft = true;
	          continue;
	        } else if (_dtToStart < dt) {
	          // Adjust dt to make sure that animation is on point
	          dt = _dtToStart;
	        }

	        if (!_runner.active()) continue; // If this runner is still going, signal that we need another animation
	        // frame, otherwise, remove the completed runner

	        var finished = _runner.step(dt).done;

	        if (!finished) {
	          runnersLeft = true; // continue
	        } else if (_runnerInfo2.persist !== true) {
	          // runner is finished. And runner might get removed
	          var endTime = _runner.duration() - _runner.time() + this._time;

	          if (endTime + _runnerInfo2.persist < this._time) {
	            // Delete runner and correct index
	            _runner.unschedule();

	            --i;
	            --len;
	          }
	        }
	      } // Basically: we continue when there are runners right from us in time
	      // when -->, and when runners are left from us when <--


	      if (runnersLeft && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0) {
	        this._continue();
	      } else {
	        this.pause();
	        this.fire('finished');
	      }

	      return this;
	    } // Checks if we are running and continues the animation

	  }, {
	    key: "_continue",
	    value: function _continue() {
	      var immediateStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	      Animator.cancelFrame(this._nextFrame);
	      this._nextFrame = null;
	      if (immediateStep) return this._stepImmediate();
	      if (this._paused) return this;
	      this._nextFrame = Animator.frame(this._step);
	      return this;
	    }
	  }, {
	    key: "active",
	    value: function active() {
	      return !!this._nextFrame;
	    }
	  }]);

	  return Timeline;
	}(EventTarget);
	registerMethods({
	  Element: {
	    timeline: function timeline(_timeline) {
	      if (_timeline == null) {
	        this._timeline = this._timeline || new Timeline();
	        return this._timeline;
	      } else {
	        this._timeline = _timeline;
	        return this;
	      }
	    }
	  }
	});

	var Runner =
	/*#__PURE__*/
	function (_EventTarget) {
	  _inherits(Runner, _EventTarget);

	  function Runner(options) {
	    var _this;

	    _classCallCheck(this, Runner);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Runner).call(this)); // Store a unique id on the runner, so that we can identify it later

	    _this.id = Runner.id++; // Ensure a default value

	    options = options == null ? timeline.duration : options; // Ensure that we get a controller

	    options = typeof options === 'function' ? new Controller(options) : options; // Declare all of the variables

	    _this._element = null;
	    _this._timeline = null;
	    _this.done = false;
	    _this._queue = []; // Work out the stepper and the duration

	    _this._duration = typeof options === 'number' && options;
	    _this._isDeclarative = options instanceof Controller;
	    _this._stepper = _this._isDeclarative ? options : new Ease(); // We copy the current values from the timeline because they can change

	    _this._history = {}; // Store the state of the runner

	    _this.enabled = true;
	    _this._time = 0;
	    _this._lastTime = 0; // At creation, the runner is in reseted state

	    _this._reseted = true; // Save transforms applied to this runner

	    _this.transforms = new Matrix();
	    _this.transformId = 1; // Looping variables

	    _this._haveReversed = false;
	    _this._reverse = false;
	    _this._loopsDone = 0;
	    _this._swing = false;
	    _this._wait = 0;
	    _this._times = 1;
	    _this._frameId = null; // Stores how long a runner is stored after beeing done

	    _this._persist = _this._isDeclarative ? true : null;
	    return _this;
	  }
	  /*
	  Runner Definitions
	  ==================
	  These methods help us define the runtime behaviour of the Runner or they
	  help us make new runners from the current runner
	  */


	  _createClass(Runner, [{
	    key: "element",
	    value: function element(_element) {
	      if (_element == null) return this._element;
	      this._element = _element;

	      _element._prepareRunner();

	      return this;
	    }
	  }, {
	    key: "timeline",
	    value: function timeline$$1(_timeline) {
	      // check explicitly for undefined so we can set the timeline to null
	      if (typeof _timeline === 'undefined') return this._timeline;
	      this._timeline = _timeline;
	      return this;
	    }
	  }, {
	    key: "animate",
	    value: function animate(duration, delay, when) {
	      var o = Runner.sanitise(duration, delay, when);
	      var runner = new Runner(o.duration);
	      if (this._timeline) runner.timeline(this._timeline);
	      if (this._element) runner.element(this._element);
	      return runner.loop(o).schedule(delay, when);
	    }
	  }, {
	    key: "schedule",
	    value: function schedule(timeline$$1, delay, when) {
	      // The user doesn't need to pass a timeline if we already have one
	      if (!(timeline$$1 instanceof Timeline)) {
	        when = delay;
	        delay = timeline$$1;
	        timeline$$1 = this.timeline();
	      } // If there is no timeline, yell at the user...


	      if (!timeline$$1) {
	        throw Error('Runner cannot be scheduled without timeline');
	      } // Schedule the runner on the timeline provided


	      timeline$$1.schedule(this, delay, when);
	      return this;
	    }
	  }, {
	    key: "unschedule",
	    value: function unschedule() {
	      var timeline$$1 = this.timeline();
	      timeline$$1 && timeline$$1.unschedule(this);
	      return this;
	    }
	  }, {
	    key: "loop",
	    value: function loop(times, swing, wait) {
	      // Deal with the user passing in an object
	      if (_typeof(times) === 'object') {
	        swing = times.swing;
	        wait = times.wait;
	        times = times.times;
	      } // Sanitise the values and store them


	      this._times = times || Infinity;
	      this._swing = swing || false;
	      this._wait = wait || 0; // Allow true to be passed

	      if (this._times === true) {
	        this._times = Infinity;
	      }

	      return this;
	    }
	  }, {
	    key: "delay",
	    value: function delay(_delay) {
	      return this.animate(0, _delay);
	    }
	    /*
	    Basic Functionality
	    ===================
	    These methods allow us to attach basic functions to the runner directly
	    */

	  }, {
	    key: "queue",
	    value: function queue(initFn, runFn, retargetFn, isTransform) {
	      this._queue.push({
	        initialiser: initFn || noop,
	        runner: runFn || noop,
	        retarget: retargetFn,
	        isTransform: isTransform,
	        initialised: false,
	        finished: false
	      });

	      var timeline$$1 = this.timeline();
	      timeline$$1 && this.timeline()._continue();
	      return this;
	    }
	  }, {
	    key: "during",
	    value: function during(fn) {
	      return this.queue(null, fn);
	    }
	  }, {
	    key: "after",
	    value: function after(fn) {
	      return this.on('finished', fn);
	    }
	    /*
	    Runner animation methods
	    ========================
	    Control how the animation plays
	    */

	  }, {
	    key: "time",
	    value: function time(_time) {
	      if (_time == null) {
	        return this._time;
	      }

	      var dt = _time - this._time;
	      this.step(dt);
	      return this;
	    }
	  }, {
	    key: "duration",
	    value: function duration() {
	      return this._times * (this._wait + this._duration) - this._wait;
	    }
	  }, {
	    key: "loops",
	    value: function loops(p) {
	      var loopDuration = this._duration + this._wait;

	      if (p == null) {
	        var loopsDone = Math.floor(this._time / loopDuration);
	        var relativeTime = this._time - loopsDone * loopDuration;
	        var position = relativeTime / this._duration;
	        return Math.min(loopsDone + position, this._times);
	      }

	      var whole = Math.floor(p);
	      var partial = p % 1;
	      var time = loopDuration * whole + this._duration * partial;
	      return this.time(time);
	    }
	  }, {
	    key: "persist",
	    value: function persist(dtOrForever) {
	      if (dtOrForever == null) return this._persist;
	      this._persist = dtOrForever;
	      return this;
	    }
	  }, {
	    key: "position",
	    value: function position(p) {
	      // Get all of the variables we need
	      var x$$1 = this._time;
	      var d = this._duration;
	      var w = this._wait;
	      var t = this._times;
	      var s = this._swing;
	      var r = this._reverse;
	      var position;

	      if (p == null) {
	        /*
	        This function converts a time to a position in the range [0, 1]
	        The full explanation can be found in this desmos demonstration
	          https://www.desmos.com/calculator/u4fbavgche
	        The logic is slightly simplified here because we can use booleans
	        */
	        // Figure out the value without thinking about the start or end time
	        var f = function f(x$$1) {
	          var swinging = s * Math.floor(x$$1 % (2 * (w + d)) / (w + d));
	          var backwards = swinging && !r || !swinging && r;
	          var uncliped = Math.pow(-1, backwards) * (x$$1 % (w + d)) / d + backwards;
	          var clipped = Math.max(Math.min(uncliped, 1), 0);
	          return clipped;
	        }; // Figure out the value by incorporating the start time


	        var endTime = t * (w + d) - w;
	        position = x$$1 <= 0 ? Math.round(f(1e-5)) : x$$1 < endTime ? f(x$$1) : Math.round(f(endTime - 1e-5));
	        return position;
	      } // Work out the loops done and add the position to the loops done


	      var loopsDone = Math.floor(this.loops());
	      var swingForward = s && loopsDone % 2 === 0;
	      var forwards = swingForward && !r || r && swingForward;
	      position = loopsDone + (forwards ? p : 1 - p);
	      return this.loops(position);
	    }
	  }, {
	    key: "progress",
	    value: function progress(p) {
	      if (p == null) {
	        return Math.min(1, this._time / this.duration());
	      }

	      return this.time(p * this.duration());
	    }
	  }, {
	    key: "step",
	    value: function step(dt) {
	      // If we are inactive, this stepper just gets skipped
	      if (!this.enabled) return this; // Update the time and get the new position

	      dt = dt == null ? 16 : dt;
	      this._time += dt;
	      var position = this.position(); // Figure out if we need to run the stepper in this frame

	      var running = this._lastPosition !== position && this._time >= 0;
	      this._lastPosition = position; // Figure out if we just started

	      var duration = this.duration();
	      var justStarted = this._lastTime <= 0 && this._time > 0;
	      var justFinished = this._lastTime < duration && this._time >= duration;
	      this._lastTime = this._time;

	      if (justStarted) {
	        this.fire('start', this);
	      } // Work out if the runner is finished set the done flag here so animations
	      // know, that they are running in the last step (this is good for
	      // transformations which can be merged)


	      var declarative = this._isDeclarative;
	      this.done = !declarative && !justFinished && this._time >= duration; // Runner is running. So its not in reseted state anymore

	      this._reseted = false; // Call initialise and the run function

	      if (running || declarative) {
	        this._initialise(running); // clear the transforms on this runner so they dont get added again and again


	        this.transforms = new Matrix();

	        var converged = this._run(declarative ? dt : position);

	        this.fire('step', this);
	      } // correct the done flag here
	      // declaritive animations itself know when they converged


	      this.done = this.done || converged && declarative;

	      if (justFinished) {
	        this.fire('finished', this);
	      }

	      return this;
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      if (this._reseted) return this;
	      this.time(0);
	      this._reseted = true;
	      return this;
	    }
	  }, {
	    key: "finish",
	    value: function finish() {
	      return this.step(Infinity);
	    }
	  }, {
	    key: "reverse",
	    value: function reverse(_reverse) {
	      this._reverse = _reverse == null ? !this._reverse : _reverse;
	      return this;
	    }
	  }, {
	    key: "ease",
	    value: function ease(fn) {
	      this._stepper = new Ease(fn);
	      return this;
	    }
	  }, {
	    key: "active",
	    value: function active(enabled) {
	      if (enabled == null) return this.enabled;
	      this.enabled = enabled;
	      return this;
	    }
	    /*
	    Private Methods
	    ===============
	    Methods that shouldn't be used externally
	    */
	    // Save a morpher to the morpher list so that we can retarget it later

	  }, {
	    key: "_rememberMorpher",
	    value: function _rememberMorpher(method, morpher) {
	      this._history[method] = {
	        morpher: morpher,
	        caller: this._queue[this._queue.length - 1] // We have to resume the timeline in case a controller
	        // is already done without beeing ever run
	        // This can happen when e.g. this is done:
	        //    anim = el.animate(new SVG.Spring)
	        // and later
	        //    anim.move(...)

	      };

	      if (this._isDeclarative) {
	        var timeline$$1 = this.timeline();
	        timeline$$1 && timeline$$1.play();
	      }
	    } // Try to set the target for a morpher if the morpher exists, otherwise
	    // do nothing and return false

	  }, {
	    key: "_tryRetarget",
	    value: function _tryRetarget(method, target, extra) {
	      if (this._history[method]) {
	        // if the last method wasnt even initialised, throw it away
	        if (!this._history[method].caller.initialised) {
	          var index = this._queue.indexOf(this._history[method].caller);

	          this._queue.splice(index, 1);

	          return false;
	        } // for the case of transformations, we use the special retarget function
	        // which has access to the outer scope


	        if (this._history[method].caller.retarget) {
	          this._history[method].caller.retarget(target, extra); // for everything else a simple morpher change is sufficient

	        } else {
	          this._history[method].morpher.to(target);
	        }

	        this._history[method].caller.finished = false;
	        var timeline$$1 = this.timeline();
	        timeline$$1 && timeline$$1.play();
	        return true;
	      }

	      return false;
	    } // Run each initialise function in the runner if required

	  }, {
	    key: "_initialise",
	    value: function _initialise(running) {
	      // If we aren't running, we shouldn't initialise when not declarative
	      if (!running && !this._isDeclarative) return; // Loop through all of the initialisers

	      for (var i = 0, len = this._queue.length; i < len; ++i) {
	        // Get the current initialiser
	        var current = this._queue[i]; // Determine whether we need to initialise

	        var needsIt = this._isDeclarative || !current.initialised && running;
	        running = !current.finished; // Call the initialiser if we need to

	        if (needsIt && running) {
	          current.initialiser.call(this);
	          current.initialised = true;
	        }
	      }
	    } // Run each run function for the position or dt given

	  }, {
	    key: "_run",
	    value: function _run(positionOrDt) {
	      // Run all of the _queue directly
	      var allfinished = true;

	      for (var i = 0, len = this._queue.length; i < len; ++i) {
	        // Get the current function to run
	        var current = this._queue[i]; // Run the function if its not finished, we keep track of the finished
	        // flag for the sake of declarative _queue

	        var converged = current.runner.call(this, positionOrDt);
	        current.finished = current.finished || converged === true;
	        allfinished = allfinished && current.finished;
	      } // We report when all of the constructors are finished


	      return allfinished;
	    }
	  }, {
	    key: "addTransform",
	    value: function addTransform(transform, index) {
	      this.transforms.lmultiplyO(transform);
	      return this;
	    }
	  }, {
	    key: "clearTransform",
	    value: function clearTransform() {
	      this.transforms = new Matrix();
	      return this;
	    } // TODO: Keep track of all transformations so that deletion is faster

	  }, {
	    key: "clearTransformsFromQueue",
	    value: function clearTransformsFromQueue() {
	      if (!this.done || !this._timeline || !this._timeline._runnerIds.includes(this.id)) {
	        this._queue = this._queue.filter(function (item) {
	          return !item.isTransform;
	        });
	      }
	    }
	  }], [{
	    key: "sanitise",
	    value: function sanitise(duration, delay, when) {
	      // Initialise the default parameters
	      var times = 1;
	      var swing = false;
	      var wait = 0;
	      duration = duration || timeline.duration;
	      delay = delay || timeline.delay;
	      when = when || 'last'; // If we have an object, unpack the values

	      if (_typeof(duration) === 'object' && !(duration instanceof Stepper)) {
	        delay = duration.delay || delay;
	        when = duration.when || when;
	        swing = duration.swing || swing;
	        times = duration.times || times;
	        wait = duration.wait || wait;
	        duration = duration.duration || timeline.duration;
	      }

	      return {
	        duration: duration,
	        delay: delay,
	        swing: swing,
	        times: times,
	        wait: wait,
	        when: when
	      };
	    }
	  }]);

	  return Runner;
	}(EventTarget);
	Runner.id = 0;

	var FakeRunner =
	/*#__PURE__*/
	function () {
	  function FakeRunner() {
	    var transforms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Matrix();
	    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
	    var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	    _classCallCheck(this, FakeRunner);

	    this.transforms = transforms;
	    this.id = id;
	    this.done = done;
	  }

	  _createClass(FakeRunner, [{
	    key: "clearTransformsFromQueue",
	    value: function clearTransformsFromQueue() {}
	  }]);

	  return FakeRunner;
	}();

	extend([Runner, FakeRunner], {
	  mergeWith: function mergeWith(runner) {
	    return new FakeRunner(runner.transforms.lmultiply(this.transforms), runner.id);
	  }
	}); // FakeRunner.emptyRunner = new FakeRunner()

	var lmultiply = function lmultiply(last, curr) {
	  return last.lmultiplyO(curr);
	};

	var getRunnerTransform = function getRunnerTransform(runner) {
	  return runner.transforms;
	};

	function mergeTransforms() {
	  // Find the matrix to apply to the element and apply it
	  var runners = this._transformationRunners.runners;
	  var netTransform = runners.map(getRunnerTransform).reduce(lmultiply, new Matrix());
	  this.transform(netTransform);

	  this._transformationRunners.merge();

	  if (this._transformationRunners.length() === 1) {
	    this._frameId = null;
	  }
	}

	var RunnerArray =
	/*#__PURE__*/
	function () {
	  function RunnerArray() {
	    _classCallCheck(this, RunnerArray);

	    this.runners = [];
	    this.ids = [];
	  }

	  _createClass(RunnerArray, [{
	    key: "add",
	    value: function add(runner) {
	      if (this.runners.includes(runner)) return;
	      var id = runner.id + 1;
	      this.runners.push(runner);
	      this.ids.push(id);
	      return this;
	    }
	  }, {
	    key: "getByID",
	    value: function getByID(id) {
	      return this.runners[this.ids.indexOf(id + 1)];
	    }
	  }, {
	    key: "remove",
	    value: function remove(id) {
	      var index = this.ids.indexOf(id + 1);
	      this.ids.splice(index, 1);
	      this.runners.splice(index, 1);
	      return this;
	    }
	  }, {
	    key: "merge",
	    value: function merge() {
	      var _this2 = this;

	      var lastRunner = null;
	      this.runners.forEach(function (runner, i) {
	        var condition = lastRunner && runner.done && lastRunner.done // don't merge runner when persisted on timeline
	        && (!runner._timeline || !runner._timeline._runnerIds.includes(runner.id)) && (!lastRunner._timeline || !lastRunner._timeline._runnerIds.includes(lastRunner.id));

	        if (condition) {
	          // the +1 happens in the function
	          _this2.remove(runner.id);

	          _this2.edit(lastRunner.id, runner.mergeWith(lastRunner));
	        }

	        lastRunner = runner;
	      });
	      return this;
	    }
	  }, {
	    key: "edit",
	    value: function edit(id, newRunner) {
	      var index = this.ids.indexOf(id + 1);
	      this.ids.splice(index, 1, id + 1);
	      this.runners.splice(index, 1, newRunner);
	      return this;
	    }
	  }, {
	    key: "length",
	    value: function length() {
	      return this.ids.length;
	    }
	  }, {
	    key: "clearBefore",
	    value: function clearBefore(id) {
	      var deleteCnt = this.ids.indexOf(id + 1) || 1;
	      this.ids.splice(0, deleteCnt, 0);
	      this.runners.splice(0, deleteCnt, new FakeRunner()).forEach(function (r) {
	        return r.clearTransformsFromQueue();
	      });
	      return this;
	    }
	  }]);

	  return RunnerArray;
	}();

	registerMethods({
	  Element: {
	    animate: function animate(duration, delay, when) {
	      var o = Runner.sanitise(duration, delay, when);
	      var timeline$$1 = this.timeline();
	      return new Runner(o.duration).loop(o).element(this).timeline(timeline$$1.play()).schedule(delay, when);
	    },
	    delay: function delay(by, when) {
	      return this.animate(0, by, when);
	    },
	    // this function searches for all runners on the element and deletes the ones
	    // which run before the current one. This is because absolute transformations
	    // overwfrite anything anyway so there is no need to waste time computing
	    // other runners
	    _clearTransformRunnersBefore: function _clearTransformRunnersBefore(currentRunner) {
	      this._transformationRunners.clearBefore(currentRunner.id);
	    },
	    _currentTransform: function _currentTransform(current) {
	      return this._transformationRunners.runners // we need the equal sign here to make sure, that also transformations
	      // on the same runner which execute before the current transformation are
	      // taken into account
	      .filter(function (runner) {
	        return runner.id <= current.id;
	      }).map(getRunnerTransform).reduce(lmultiply, new Matrix());
	    },
	    _addRunner: function _addRunner(runner) {
	      this._transformationRunners.add(runner); // Make sure that the runner merge is executed at the very end of
	      // all Animator functions. Thats why we use immediate here to execute
	      // the merge right after all frames are run


	      Animator.cancelImmediate(this._frameId);
	      this._frameId = Animator.immediate(mergeTransforms.bind(this));
	    },
	    _prepareRunner: function _prepareRunner() {
	      if (this._frameId == null) {
	        this._transformationRunners = new RunnerArray().add(new FakeRunner(new Matrix(this)));
	      }
	    }
	  }
	});
	extend(Runner, {
	  attr: function attr(a, v) {
	    return this.styleAttr('attr', a, v);
	  },
	  // Add animatable styles
	  css: function css(s, v) {
	    return this.styleAttr('css', s, v);
	  },
	  styleAttr: function styleAttr(type, name, val) {
	    // apply attributes individually
	    if (_typeof(name) === 'object') {
	      for (var key in name) {
	        this.styleAttr(type, key, name[key]);
	      }

	      return this;
	    }

	    var morpher = new Morphable(this._stepper).to(val);
	    this.queue(function () {
	      morpher = morpher.from(this.element()[type](name));
	    }, function (pos) {
	      this.element()[type](name, morpher.at(pos));
	      return morpher.done();
	    });
	    return this;
	  },
	  zoom: function zoom(level, point$$1) {
	    if (this._tryRetarget('zoom', to, point$$1)) return this;
	    var morpher = new Morphable(this._stepper).to(new SVGNumber(level));
	    this.queue(function () {
	      morpher = morpher.from(this.element().zoom());
	    }, function (pos) {
	      this.element().zoom(morpher.at(pos), point$$1);
	      return morpher.done();
	    }, function (newLevel, newPoint) {
	      point$$1 = newPoint;
	      morpher.to(newLevel);
	    });

	    this._rememberMorpher('zoom', morpher);

	    return this;
	  },

	  /**
	   ** absolute transformations
	   **/
	  //
	  // M v -----|-----(D M v = F v)------|----->  T v
	  //
	  // 1. define the final state (T) and decompose it (once)
	  //    t = [tx, ty, the, lam, sy, sx]
	  // 2. on every frame: pull the current state of all previous transforms
	  //    (M - m can change)
	  //   and then write this as m = [tx0, ty0, the0, lam0, sy0, sx0]
	  // 3. Find the interpolated matrix F(pos) = m + pos * (t - m)
	  //   - Note F(0) = M
	  //   - Note F(1) = T
	  // 4. Now you get the delta matrix as a result: D = F * inv(M)
	  transform: function transform(transforms, relative, affine) {
	    // If we have a declarative function, we should retarget it if possible
	    relative = transforms.relative || relative;

	    if (this._isDeclarative && !relative && this._tryRetarget('transform', transforms)) {
	      return this;
	    } // Parse the parameters


	    var isMatrix = Matrix.isMatrixLike(transforms);
	    affine = transforms.affine != null ? transforms.affine : affine != null ? affine : !isMatrix; // Create a morepher and set its type

	    var morpher = new Morphable(this._stepper).type(affine ? TransformBag : Matrix);
	    var origin;
	    var element;
	    var current;
	    var currentAngle;
	    var startTransform;

	    function setup() {
	      // make sure element and origin is defined
	      element = element || this.element();
	      origin = origin || getOrigin(transforms, element);
	      startTransform = new Matrix(relative ? undefined : element); // add the runner to the element so it can merge transformations

	      element._addRunner(this); // Deactivate all transforms that have run so far if we are absolute


	      if (!relative) {
	        element._clearTransformRunnersBefore(this);
	      }
	    }

	    function run(pos) {
	      // clear all other transforms before this in case something is saved
	      // on this runner. We are absolute. We dont need these!
	      if (!relative) this.clearTransform();

	      var _transform = new Point(origin).transform(element._currentTransform(this)),
	          x$$1 = _transform.x,
	          y$$1 = _transform.y;

	      var target = new Matrix(_objectSpread({}, transforms, {
	        origin: [x$$1, y$$1]
	      }));
	      var start = this._isDeclarative && current ? current : startTransform;

	      if (affine) {
	        target = target.decompose(x$$1, y$$1);
	        start = start.decompose(x$$1, y$$1); // Get the current and target angle as it was set

	        var rTarget = target.rotate;
	        var rCurrent = start.rotate; // Figure out the shortest path to rotate directly

	        var possibilities = [rTarget - 360, rTarget, rTarget + 360];
	        var distances = possibilities.map(function (a) {
	          return Math.abs(a - rCurrent);
	        });
	        var shortest = Math.min.apply(Math, _toConsumableArray(distances));
	        var index = distances.indexOf(shortest);
	        target.rotate = possibilities[index];
	      }

	      if (relative) {
	        // we have to be careful here not to overwrite the rotation
	        // with the rotate method of Matrix
	        if (!isMatrix) {
	          target.rotate = transforms.rotate || 0;
	        }

	        if (this._isDeclarative && currentAngle) {
	          start.rotate = currentAngle;
	        }
	      }

	      morpher.from(start);
	      morpher.to(target);
	      var affineParameters = morpher.at(pos);
	      currentAngle = affineParameters.rotate;
	      current = new Matrix(affineParameters);
	      this.addTransform(current);

	      element._addRunner(this);

	      return morpher.done();
	    }

	    function retarget(newTransforms) {
	      // only get a new origin if it changed since the last call
	      if ((newTransforms.origin || 'center').toString() !== (transforms.origin || 'center').toString()) {
	        origin = getOrigin(transforms, element);
	      } // overwrite the old transformations with the new ones


	      transforms = _objectSpread({}, newTransforms, {
	        origin: origin
	      });
	    }

	    this.queue(setup, run, retarget, true);
	    this._isDeclarative && this._rememberMorpher('transform', morpher);
	    return this;
	  },
	  // Animatable x-axis
	  x: function x$$1(_x, relative) {
	    return this._queueNumber('x', _x);
	  },
	  // Animatable y-axis
	  y: function y$$1(_y) {
	    return this._queueNumber('y', _y);
	  },
	  dx: function dx(x$$1) {
	    return this._queueNumberDelta('x', x$$1);
	  },
	  dy: function dy(y$$1) {
	    return this._queueNumberDelta('y', y$$1);
	  },
	  _queueNumberDelta: function _queueNumberDelta(method, to$$1) {
	    to$$1 = new SVGNumber(to$$1); // Try to change the target if we have this method already registerd

	    if (this._tryRetarget(method, to$$1)) return this; // Make a morpher and queue the animation

	    var morpher = new Morphable(this._stepper).to(to$$1);
	    var from$$1 = null;
	    this.queue(function () {
	      from$$1 = this.element()[method]();
	      morpher.from(from$$1);
	      morpher.to(from$$1 + to$$1);
	    }, function (pos) {
	      this.element()[method](morpher.at(pos));
	      return morpher.done();
	    }, function (newTo) {
	      morpher.to(from$$1 + new SVGNumber(newTo));
	    }); // Register the morpher so that if it is changed again, we can retarget it

	    this._rememberMorpher(method, morpher);

	    return this;
	  },
	  _queueObject: function _queueObject(method, to$$1) {
	    // Try to change the target if we have this method already registerd
	    if (this._tryRetarget(method, to$$1)) return this; // Make a morpher and queue the animation

	    var morpher = new Morphable(this._stepper).to(to$$1);
	    this.queue(function () {
	      morpher.from(this.element()[method]());
	    }, function (pos) {
	      this.element()[method](morpher.at(pos));
	      return morpher.done();
	    }); // Register the morpher so that if it is changed again, we can retarget it

	    this._rememberMorpher(method, morpher);

	    return this;
	  },
	  _queueNumber: function _queueNumber(method, value) {
	    return this._queueObject(method, new SVGNumber(value));
	  },
	  // Animatable center x-axis
	  cx: function cx$$1(x$$1) {
	    return this._queueNumber('cx', x$$1);
	  },
	  // Animatable center y-axis
	  cy: function cy$$1(y$$1) {
	    return this._queueNumber('cy', y$$1);
	  },
	  // Add animatable move
	  move: function move(x$$1, y$$1) {
	    return this.x(x$$1).y(y$$1);
	  },
	  // Add animatable center
	  center: function center(x$$1, y$$1) {
	    return this.cx(x$$1).cy(y$$1);
	  },
	  // Add animatable size
	  size: function size(width$$1, height$$1) {
	    // animate bbox based size for all other elements
	    var box;

	    if (!width$$1 || !height$$1) {
	      box = this._element.bbox();
	    }

	    if (!width$$1) {
	      width$$1 = box.width / box.height * height$$1;
	    }

	    if (!height$$1) {
	      height$$1 = box.height / box.width * width$$1;
	    }

	    return this.width(width$$1).height(height$$1);
	  },
	  // Add animatable width
	  width: function width$$1(_width) {
	    return this._queueNumber('width', _width);
	  },
	  // Add animatable height
	  height: function height$$1(_height) {
	    return this._queueNumber('height', _height);
	  },
	  // Add animatable plot
	  plot: function plot(a, b, c, d) {
	    // Lines can be plotted with 4 arguments
	    if (arguments.length === 4) {
	      return this.plot([a, b, c, d]);
	    }

	    if (this._tryRetarget('plot', a)) return this;
	    var morpher = new Morphable(this._stepper).type(this._element.MorphArray).to(a);
	    this.queue(function () {
	      morpher.from(this._element.array());
	    }, function (pos) {
	      this._element.plot(morpher.at(pos));

	      return morpher.done();
	    });

	    this._rememberMorpher('plot', morpher);

	    return this;
	  },
	  // Add leading method
	  leading: function leading(value) {
	    return this._queueNumber('leading', value);
	  },
	  // Add animatable viewbox
	  viewbox: function viewbox(x$$1, y$$1, width$$1, height$$1) {
	    return this._queueObject('viewbox', new Box(x$$1, y$$1, width$$1, height$$1));
	  },
	  update: function update(o) {
	    if (_typeof(o) !== 'object') {
	      return this.update({
	        offset: arguments[0],
	        color: arguments[1],
	        opacity: arguments[2]
	      });
	    }

	    if (o.opacity != null) this.attr('stop-opacity', o.opacity);
	    if (o.color != null) this.attr('stop-color', o.color);
	    if (o.offset != null) this.attr('offset', o.offset);
	    return this;
	  }
	});
	extend(Runner, {
	  rx: rx,
	  ry: ry,
	  from: from,
	  to: to
	});
	register(Runner);

	var Svg =
	/*#__PURE__*/
	function (_Container) {
	  _inherits(Svg, _Container);

	  function Svg(node) {
	    var _this;

	    _classCallCheck(this, Svg);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Svg).call(this, nodeOrNew('svg', node), node));

	    _this.namespace();

	    return _this;
	  }

	  _createClass(Svg, [{
	    key: "isRoot",
	    value: function isRoot() {
	      return !this.node.parentNode || !(this.node.parentNode instanceof globals.window.SVGElement) || this.node.parentNode.nodeName === '#document';
	    } // Check if this is a root svg
	    // If not, call docs from this element

	  }, {
	    key: "root",
	    value: function root$$1() {
	      if (this.isRoot()) return this;
	      return _get(_getPrototypeOf(Svg.prototype), "root", this).call(this);
	    } // Add namespaces

	  }, {
	    key: "namespace",
	    value: function namespace() {
	      if (!this.isRoot()) return this.root().namespace();
	      return this.attr({
	        xmlns: ns,
	        version: '1.1'
	      }).attr('xmlns:xlink', xlink, xmlns).attr('xmlns:svgjs', svgjs, xmlns);
	    } // Creates and returns defs element

	  }, {
	    key: "defs",
	    value: function defs() {
	      if (!this.isRoot()) return this.root().defs();
	      return adopt(this.node.querySelector('defs')) || this.put(new Defs());
	    } // custom parent method

	  }, {
	    key: "parent",
	    value: function parent(type) {
	      if (this.isRoot()) {
	        return this.node.parentNode.nodeName === '#document' ? null : adopt(this.node.parentNode);
	      }

	      return _get(_getPrototypeOf(Svg.prototype), "parent", this).call(this, type);
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      // remove children
	      while (this.node.hasChildNodes()) {
	        this.node.removeChild(this.node.lastChild);
	      } // remove defs reference


	      delete this._defs;
	      return this;
	    }
	  }]);

	  return Svg;
	}(Container);
	registerMethods({
	  Container: {
	    // Create nested svg document
	    nested: wrapWithAttrCheck(function () {
	      return this.put(new Svg());
	    })
	  }
	});
	register(Svg, 'Svg', true);

	var _Symbol =
	/*#__PURE__*/
	function (_Container) {
	  _inherits(_Symbol, _Container);

	  // Initialize node
	  function _Symbol(node) {
	    _classCallCheck(this, _Symbol);

	    return _possibleConstructorReturn(this, _getPrototypeOf(_Symbol).call(this, nodeOrNew('symbol', node), node));
	  }

	  return _Symbol;
	}(Container);
	registerMethods({
	  Container: {
	    symbol: wrapWithAttrCheck(function () {
	      return this.put(new _Symbol());
	    })
	  }
	});
	register(_Symbol);

	function plain(text) {
	  // clear if build mode is disabled
	  if (this._build === false) {
	    this.clear();
	  } // create text node


	  this.node.appendChild(globals.document.createTextNode(text));
	  return this;
	} // Get length of text element

	function length() {
	  return this.node.getComputedTextLength();
	}

	var textable = ({
		plain: plain,
		length: length
	});

	var Text =
	/*#__PURE__*/
	function (_Shape) {
	  _inherits(Text, _Shape);

	  // Initialize node
	  function Text(node) {
	    var _this;

	    _classCallCheck(this, Text);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this, nodeOrNew('text', node), node));
	    _this.dom.leading = new SVGNumber(1.3); // store leading value for rebuilding

	    _this._rebuild = true; // enable automatic updating of dy values

	    _this._build = false; // disable build mode for adding multiple lines

	    return _this;
	  } // Move over x-axis
	  // Text is moved its bounding box
	  // text-anchor does NOT matter


	  _createClass(Text, [{
	    key: "x",
	    value: function x(_x) {
	      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

	      if (_x == null) {
	        return box.x;
	      }

	      return this.attr('x', this.attr('x') + _x - box.x);
	    } // Move over y-axis

	  }, {
	    key: "y",
	    value: function y(_y) {
	      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

	      if (_y == null) {
	        return box.y;
	      }

	      return this.attr('y', this.attr('y') + _y - box.y);
	    }
	  }, {
	    key: "move",
	    value: function move(x, y) {
	      var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
	      return this.x(x, box).y(y, box);
	    } // Move center over x-axis

	  }, {
	    key: "cx",
	    value: function cx(x) {
	      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

	      if (x == null) {
	        return box.cx;
	      }

	      return this.attr('x', this.attr('x') + x - box.cx);
	    } // Move center over y-axis

	  }, {
	    key: "cy",
	    value: function cy(y) {
	      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

	      if (y == null) {
	        return box.cy;
	      }

	      return this.attr('y', this.attr('y') + y - box.cy);
	    }
	  }, {
	    key: "center",
	    value: function center(x, y) {
	      var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
	      return this.cx(x, box).cy(y, box);
	    } // Set the text content

	  }, {
	    key: "text",
	    value: function text(_text) {
	      // act as getter
	      if (_text === undefined) {
	        var children = this.node.childNodes;
	        var firstLine = 0;
	        _text = '';

	        for (var i = 0, len = children.length; i < len; ++i) {
	          // skip textPaths - they are no lines
	          if (children[i].nodeName === 'textPath') {
	            if (i === 0) firstLine = 1;
	            continue;
	          } // add newline if its not the first child and newLined is set to true


	          if (i !== firstLine && children[i].nodeType !== 3 && adopt(children[i]).dom.newLined === true) {
	            _text += '\n';
	          } // add content of this node


	          _text += children[i].textContent;
	        }

	        return _text;
	      } // remove existing content


	      this.clear().build(true);

	      if (typeof _text === 'function') {
	        // call block
	        _text.call(this, this);
	      } else {
	        // store text and make sure text is not blank
	        _text = _text.split('\n'); // build new lines

	        for (var j = 0, jl = _text.length; j < jl; j++) {
	          this.tspan(_text[j]).newLine();
	        }
	      } // disable build mode and rebuild lines


	      return this.build(false).rebuild();
	    } // Set / get leading

	  }, {
	    key: "leading",
	    value: function leading(value) {
	      // act as getter
	      if (value == null) {
	        return this.dom.leading;
	      } // act as setter


	      this.dom.leading = new SVGNumber(value);
	      return this.rebuild();
	    } // Rebuild appearance type

	  }, {
	    key: "rebuild",
	    value: function rebuild(_rebuild) {
	      // store new rebuild flag if given
	      if (typeof _rebuild === 'boolean') {
	        this._rebuild = _rebuild;
	      } // define position of all lines


	      if (this._rebuild) {
	        var self = this;
	        var blankLineOffset = 0;
	        var leading = this.dom.leading;
	        this.each(function () {
	          var fontSize = globals.window.getComputedStyle(this.node).getPropertyValue('font-size');
	          var dy = leading * new SVGNumber(fontSize);

	          if (this.dom.newLined) {
	            this.attr('x', self.attr('x'));

	            if (this.text() === '\n') {
	              blankLineOffset += dy;
	            } else {
	              this.attr('dy', dy + blankLineOffset);
	              blankLineOffset = 0;
	            }
	          }
	        });
	        this.fire('rebuild');
	      }

	      return this;
	    } // Enable / disable build mode

	  }, {
	    key: "build",
	    value: function build(_build) {
	      this._build = !!_build;
	      return this;
	    } // overwrite method from parent to set data properly

	  }, {
	    key: "setData",
	    value: function setData(o) {
	      this.dom = o;
	      this.dom.leading = new SVGNumber(o.leading || 1.3);
	      return this;
	    }
	  }]);

	  return Text;
	}(Shape);
	extend(Text, textable);
	registerMethods({
	  Container: {
	    // Create text element
	    text: wrapWithAttrCheck(function (text) {
	      return this.put(new Text()).text(text);
	    }),
	    // Create plain text element
	    plain: wrapWithAttrCheck(function (text) {
	      return this.put(new Text()).plain(text);
	    })
	  }
	});
	register(Text);

	var Tspan =
	/*#__PURE__*/
	function (_Text) {
	  _inherits(Tspan, _Text);

	  // Initialize node
	  function Tspan(node) {
	    _classCallCheck(this, Tspan);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Tspan).call(this, nodeOrNew('tspan', node), node));
	  } // Set text content


	  _createClass(Tspan, [{
	    key: "text",
	    value: function text(_text) {
	      if (_text == null) return this.node.textContent + (this.dom.newLined ? '\n' : '');
	      typeof _text === 'function' ? _text.call(this, this) : this.plain(_text);
	      return this;
	    } // Shortcut dx

	  }, {
	    key: "dx",
	    value: function dx(_dx) {
	      return this.attr('dx', _dx);
	    } // Shortcut dy

	  }, {
	    key: "dy",
	    value: function dy(_dy) {
	      return this.attr('dy', _dy);
	    }
	  }, {
	    key: "x",
	    value: function x(_x) {
	      return this.attr('x', _x);
	    }
	  }, {
	    key: "y",
	    value: function y(_y) {
	      return this.attr('x', _y);
	    }
	  }, {
	    key: "move",
	    value: function move(x, y) {
	      return this.x(x).y(y);
	    } // Create new line

	  }, {
	    key: "newLine",
	    value: function newLine() {
	      // fetch text parent
	      var t = this.parent(Text); // mark new line

	      this.dom.newLined = true;
	      var fontSize = globals.window.getComputedStyle(this.node).getPropertyValue('font-size');
	      var dy = t.dom.leading * new SVGNumber(fontSize); // apply new position

	      return this.dy(dy).attr('x', t.x());
	    }
	  }]);

	  return Tspan;
	}(Text);
	extend(Tspan, textable);
	registerMethods({
	  Tspan: {
	    tspan: wrapWithAttrCheck(function (text) {
	      var tspan = new Tspan(); // clear if build mode is disabled

	      if (!this._build) {
	        this.clear();
	      } // add new tspan


	      this.node.appendChild(tspan.node);
	      return tspan.text(text);
	    })
	  }
	});
	register(Tspan);

	var ClipPath =
	/*#__PURE__*/
	function (_Container) {
	  _inherits(ClipPath, _Container);

	  function ClipPath(node) {
	    _classCallCheck(this, ClipPath);

	    return _possibleConstructorReturn(this, _getPrototypeOf(ClipPath).call(this, nodeOrNew('clipPath', node), node));
	  } // Unclip all clipped elements and remove itself


	  _createClass(ClipPath, [{
	    key: "remove",
	    value: function remove() {
	      // unclip all targets
	      this.targets().forEach(function (el) {
	        el.unclip();
	      }); // remove clipPath from parent

	      return _get(_getPrototypeOf(ClipPath.prototype), "remove", this).call(this);
	    }
	  }, {
	    key: "targets",
	    value: function targets() {
	      return baseFind('svg [clip-path*="' + this.id() + '"]');
	    }
	  }]);

	  return ClipPath;
	}(Container);
	registerMethods({
	  Container: {
	    // Create clipping element
	    clip: wrapWithAttrCheck(function () {
	      return this.defs().put(new ClipPath());
	    })
	  },
	  Element: {
	    // Distribute clipPath to svg element
	    clipWith: function clipWith(element) {
	      // use given clip or create a new one
	      var clipper = element instanceof ClipPath ? element : this.parent().clip().add(element); // apply mask

	      return this.attr('clip-path', 'url("#' + clipper.id() + '")');
	    },
	    // Unclip element
	    unclip: function unclip() {
	      return this.attr('clip-path', null);
	    },
	    clipper: function clipper() {
	      return this.reference('clip-path');
	    }
	  }
	});
	register(ClipPath);

	var ForeignObject =
	/*#__PURE__*/
	function (_Element) {
	  _inherits(ForeignObject, _Element);

	  function ForeignObject(node) {
	    _classCallCheck(this, ForeignObject);

	    return _possibleConstructorReturn(this, _getPrototypeOf(ForeignObject).call(this, nodeOrNew('foreignObject', node), node));
	  }

	  return ForeignObject;
	}(Element);
	registerMethods({
	  Container: {
	    foreignObject: wrapWithAttrCheck(function (width, height) {
	      return this.put(new ForeignObject()).size(width, height);
	    })
	  }
	});
	register(ForeignObject);

	var G =
	/*#__PURE__*/
	function (_Container) {
	  _inherits(G, _Container);

	  function G(node) {
	    _classCallCheck(this, G);

	    return _possibleConstructorReturn(this, _getPrototypeOf(G).call(this, nodeOrNew('g', node), node));
	  }

	  _createClass(G, [{
	    key: "x",
	    value: function x(_x) {
	      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
	      if (_x == null) return box.x;
	      return this.move(_x, box.y, box);
	    }
	  }, {
	    key: "y",
	    value: function y(_y) {
	      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
	      if (_y == null) return box.y;
	      return this.move(box.x, _y, box);
	    }
	  }, {
	    key: "move",
	    value: function move() {
	      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
	      var dx = x - box.x;
	      var dy = y - box.y;
	      return this.dmove(dx, dy);
	    }
	  }, {
	    key: "dx",
	    value: function dx(_dx) {
	      return this.dmove(_dx, 0);
	    }
	  }, {
	    key: "dy",
	    value: function dy(_dy) {
	      return this.dmove(0, _dy);
	    }
	  }, {
	    key: "dmove",
	    value: function dmove(dx, dy) {
	      this.children().forEach(function (child, i) {
	        // Get the childs bbox
	        var bbox = child.bbox(); // Get childs matrix

	        var m = new Matrix(child); // Translate childs matrix by amount and
	        // transform it back into parents space

	        var matrix = m.translate(dx, dy).transform(m.inverse()); // Calculate new x and y from old box

	        var p = new Point(bbox.x, bbox.y).transform(matrix); // Move element

	        child.move(p.x, p.y);
	      });
	      return this;
	    }
	  }, {
	    key: "width",
	    value: function width(_width) {
	      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
	      if (_width == null) return box.width;
	      return this.size(_width, box.height, box);
	    }
	  }, {
	    key: "height",
	    value: function height(_height) {
	      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
	      if (_height == null) return box.height;
	      return this.size(box.width, _height, box);
	    }
	  }, {
	    key: "size",
	    value: function size(width, height) {
	      var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
	      var p = proportionalSize(this, width, height, box);
	      var scaleX = p.width / box.width;
	      var scaleY = p.height / box.height;
	      this.children().forEach(function (child, i) {
	        var o = new Point(box).transform(new Matrix(child).inverse());
	        child.scale(scaleX, scaleY, o.x, o.y);
	      });
	      return this;
	    }
	  }]);

	  return G;
	}(Container);
	registerMethods({
	  Container: {
	    // Create a group element
	    group: wrapWithAttrCheck(function () {
	      return this.put(new G());
	    })
	  }
	});
	register(G);

	var A =
	/*#__PURE__*/
	function (_Container) {
	  _inherits(A, _Container);

	  function A(node) {
	    _classCallCheck(this, A);

	    return _possibleConstructorReturn(this, _getPrototypeOf(A).call(this, nodeOrNew('a', node), node));
	  } // Link url


	  _createClass(A, [{
	    key: "to",
	    value: function to(url) {
	      return this.attr('href', url, xlink);
	    } // Link target attribute

	  }, {
	    key: "target",
	    value: function target(_target) {
	      return this.attr('target', _target);
	    }
	  }]);

	  return A;
	}(Container);
	registerMethods({
	  Container: {
	    // Create a hyperlink element
	    link: wrapWithAttrCheck(function (url) {
	      return this.put(new A()).to(url);
	    })
	  },
	  Element: {
	    // Create a hyperlink element
	    linkTo: function linkTo(url) {
	      var link = new A();

	      if (typeof url === 'function') {
	        url.call(link, link);
	      } else {
	        link.to(url);
	      }

	      return this.parent().put(link).put(this);
	    }
	  }
	});
	register(A);

	var Mask =
	/*#__PURE__*/
	function (_Container) {
	  _inherits(Mask, _Container);

	  // Initialize node
	  function Mask(node) {
	    _classCallCheck(this, Mask);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Mask).call(this, nodeOrNew('mask', node), node));
	  } // Unmask all masked elements and remove itself


	  _createClass(Mask, [{
	    key: "remove",
	    value: function remove() {
	      // unmask all targets
	      this.targets().forEach(function (el) {
	        el.unmask();
	      }); // remove mask from parent

	      return _get(_getPrototypeOf(Mask.prototype), "remove", this).call(this);
	    }
	  }, {
	    key: "targets",
	    value: function targets() {
	      return baseFind('svg [mask*="' + this.id() + '"]');
	    }
	  }]);

	  return Mask;
	}(Container);
	registerMethods({
	  Container: {
	    mask: wrapWithAttrCheck(function () {
	      return this.defs().put(new Mask());
	    })
	  },
	  Element: {
	    // Distribute mask to svg element
	    maskWith: function maskWith(element) {
	      // use given mask or create a new one
	      var masker = element instanceof Mask ? element : this.parent().mask().add(element); // apply mask

	      return this.attr('mask', 'url("#' + masker.id() + '")');
	    },
	    // Unmask element
	    unmask: function unmask() {
	      return this.attr('mask', null);
	    },
	    masker: function masker() {
	      return this.reference('mask');
	    }
	  }
	});
	register(Mask);

	function cssRule(selector, rule) {
	  if (!selector) return '';
	  if (!rule) return selector;
	  var ret = selector + '{';

	  for (var i in rule) {
	    ret += unCamelCase(i) + ':' + rule[i] + ';';
	  }

	  ret += '}';
	  return ret;
	}

	var Style =
	/*#__PURE__*/
	function (_Element) {
	  _inherits(Style, _Element);

	  function Style(node) {
	    _classCallCheck(this, Style);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Style).call(this, nodeOrNew('style', node), node));
	  }

	  _createClass(Style, [{
	    key: "addText",
	    value: function addText() {
	      var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	      this.node.textContent += w;
	      return this;
	    }
	  }, {
	    key: "font",
	    value: function font(name, src) {
	      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	      return this.rule('@font-face', _objectSpread({
	        fontFamily: name,
	        src: src
	      }, params));
	    }
	  }, {
	    key: "rule",
	    value: function rule(selector, obj) {
	      return this.addText(cssRule(selector, obj));
	    }
	  }]);

	  return Style;
	}(Element);
	registerMethods('Dom', {
	  style: wrapWithAttrCheck(function (selector, obj) {
	    return this.put(new Style()).rule(selector, obj);
	  }),
	  fontface: wrapWithAttrCheck(function (name, src, params) {
	    return this.put(new Style()).font(name, src, params);
	  })
	});
	register(Style);

	var TextPath =
	/*#__PURE__*/
	function (_Text) {
	  _inherits(TextPath, _Text);

	  // Initialize node
	  function TextPath(node) {
	    _classCallCheck(this, TextPath);

	    return _possibleConstructorReturn(this, _getPrototypeOf(TextPath).call(this, nodeOrNew('textPath', node), node));
	  } // return the array of the path track element


	  _createClass(TextPath, [{
	    key: "array",
	    value: function array() {
	      var track = this.track();
	      return track ? track.array() : null;
	    } // Plot path if any

	  }, {
	    key: "plot",
	    value: function plot(d) {
	      var track = this.track();
	      var pathArray = null;

	      if (track) {
	        pathArray = track.plot(d);
	      }

	      return d == null ? pathArray : this;
	    } // Get the path element

	  }, {
	    key: "track",
	    value: function track() {
	      return this.reference('href');
	    }
	  }]);

	  return TextPath;
	}(Text);
	registerMethods({
	  Container: {
	    textPath: wrapWithAttrCheck(function (text, path) {
	      // Convert text to instance if needed
	      if (!(text instanceof Text)) {
	        text = this.text(text);
	      }

	      return text.path(path);
	    })
	  },
	  Text: {
	    // Create path for text to run on
	    path: wrapWithAttrCheck(function (track) {
	      var importNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	      var textPath = new TextPath(); // if track is a path, reuse it

	      if (!(track instanceof Path)) {
	        // create path element
	        track = this.defs().path(track);
	      } // link textPath to path and add content


	      textPath.attr('href', '#' + track, xlink); // Transplant all nodes from text to textPath

	      var node;

	      if (importNodes) {
	        while (node = this.node.firstChild) {
	          textPath.node.appendChild(node);
	        }
	      } // add textPath element as child node and return textPath


	      return this.put(textPath);
	    }),
	    // Get the textPath children
	    textPath: function textPath() {
	      return this.findOne('textPath');
	    }
	  },
	  Path: {
	    // creates a textPath from this path
	    text: wrapWithAttrCheck(function (text) {
	      // Convert text to instance if needed
	      if (!(text instanceof Text)) {
	        text = new Text().addTo(this.parent()).text(text);
	      } // Create textPath from text and path and return


	      return text.path(this);
	    }),
	    targets: function targets() {
	      return baseFind('svg [href*="' + this.id() + '"]');
	    }
	  }
	});
	TextPath.prototype.MorphArray = PathArray;
	register(TextPath);

	var Use =
	/*#__PURE__*/
	function (_Shape) {
	  _inherits(Use, _Shape);

	  function Use(node) {
	    _classCallCheck(this, Use);

	    return _possibleConstructorReturn(this, _getPrototypeOf(Use).call(this, nodeOrNew('use', node), node));
	  } // Use element as a reference


	  _createClass(Use, [{
	    key: "element",
	    value: function element(_element, file) {
	      // Set lined element
	      return this.attr('href', (file || '') + '#' + _element, xlink);
	    }
	  }]);

	  return Use;
	}(Shape);
	registerMethods({
	  Container: {
	    // Create a use element
	    use: wrapWithAttrCheck(function (element, file) {
	      return this.put(new Use()).element(element, file);
	    })
	  }
	});
	register(Use);

	/* Optional Modules */
	var SVG = makeInstance;
	extend([Svg, _Symbol, Image, Pattern, Marker], getMethodsFor('viewbox'));
	extend([Line, Polyline, Polygon, Path], getMethodsFor('marker'));
	extend(Text, getMethodsFor('Text'));
	extend(Path, getMethodsFor('Path'));
	extend(Defs, getMethodsFor('Defs'));
	extend([Text, Tspan], getMethodsFor('Tspan'));
	extend([Rect, Ellipse, Circle, Gradient], getMethodsFor('radius'));
	extend(EventTarget, getMethodsFor('EventTarget'));
	extend(Dom, getMethodsFor('Dom'));
	extend(Element, getMethodsFor('Element'));
	extend(Shape, getMethodsFor('Shape')); // extend(Element, getConstructor('Memory'))

	extend(Container, getMethodsFor('Container'));
	extend(Runner, getMethodsFor('Runner'));
	List.extend(getMethodNames());
	registerMorphableType([SVGNumber, Color, Box, Matrix, SVGArray, PointArray, PathArray]);
	makeMorphable();

	var svgMembers = ({
		Morphable: Morphable,
		registerMorphableType: registerMorphableType,
		makeMorphable: makeMorphable,
		TransformBag: TransformBag,
		ObjectBag: ObjectBag,
		NonMorphable: NonMorphable,
		defaults: defaults,
		utils: utils,
		namespaces: namespaces,
		regex: regex,
		SVG: SVG,
		parser: parser,
		find: baseFind,
		registerWindow: registerWindow,
		Animator: Animator,
		Controller: Controller,
		Ease: Ease,
		PID: PID,
		Spring: Spring,
		easing: easing,
		Queue: Queue,
		Runner: Runner,
		Timeline: Timeline,
		Array: SVGArray,
		Box: Box,
		Color: Color,
		EventTarget: EventTarget,
		Matrix: Matrix,
		Number: SVGNumber,
		PathArray: PathArray,
		Point: Point,
		PointArray: PointArray,
		List: List,
		Circle: Circle,
		ClipPath: ClipPath,
		Container: Container,
		Defs: Defs,
		Dom: Dom,
		Element: Element,
		Ellipse: Ellipse,
		ForeignObject: ForeignObject,
		Gradient: Gradient,
		G: G,
		A: A,
		Image: Image,
		Line: Line,
		Marker: Marker,
		Mask: Mask,
		Path: Path,
		Pattern: Pattern,
		Polygon: Polygon,
		Polyline: Polyline,
		Rect: Rect,
		Shape: Shape,
		Stop: Stop,
		Style: Style,
		Svg: Svg,
		Symbol: _Symbol,
		Text: Text,
		TextPath: TextPath,
		Tspan: Tspan,
		Use: Use,
		on: on,
		off: off,
		dispatch: dispatch,
		root: root,
		create: create,
		makeInstance: makeInstance,
		nodeOrNew: nodeOrNew,
		adopt: adopt,
		mockAdopt: mockAdopt,
		register: register,
		getClass: getClass,
		eid: eid,
		assignNewId: assignNewId,
		extend: extend,
		wrapWithAttrCheck: wrapWithAttrCheck,
		invent: invent
	});

	function SVG$1(element) {
	  return makeInstance(element);
	}
	Object.assign(SVG$1, svgMembers);

	return SVG$1;

}());
//# sourceMappingURL=svg.js.map
