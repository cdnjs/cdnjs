(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Dinero = factory());
}(this, (function () { 'use strict';

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
	var core = module.exports = { version: '2.5.5' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

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

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
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

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});
	var _shared = function (key) {
	  return store[key] || (store[key] = {});
	};

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

	var SPECIES = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

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
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
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

	var _strictMethod = function (method, arg) {
	  return !!method && _fails(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};

	var $every = _arrayMethods(4);

	_export(_export.P + _export.F * !_strictMethod([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

	var every = _core.Array.every;

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

	var $find = _arrayMethods(6);
	var KEY = 'findIndex';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	_export(_export.P + _export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	var findIndex = _core.Array.findIndex;

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $find$1 = _arrayMethods(5);
	var KEY$1 = 'find';
	var forced$1 = true;
	// Shouldn't skip holes
	if (KEY$1 in []) Array(1)[KEY$1](function () { forced$1 = false; });
	_export(_export.P + _export.F * forced$1, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY$1);

	var find = _core.Array.find;

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var _iterators = {};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	var _library = false;

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

	var keys = _core.Array.keys;

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
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

	var assign = _core.Object.assign;

	var isEnum = _objectPie.f;
	var _objectToArray = function (isEntries) {
	  return function (it) {
	    var O = _toIobject(it);
	    var keys = _objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) if (isEnum.call(O, key = keys[i++])) {
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

	// https://github.com/tc39/proposal-object-values-entries

	var $entries = _objectToArray(true);

	_export(_export.S, 'Object', {
	  entries: function entries(it) {
	    return $entries(it);
	  }
	});

	var entries = _core.Object.entries;

	// 20.1.2.3 Number.isInteger(number)

	var floor$1 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !_isObject(it) && isFinite(it) && floor$1(it) === it;
	};

	// 20.1.2.3 Number.isInteger(number)


	_export(_export.S, 'Number', { isInteger: _isInteger });

	var isInteger = _core.Number.isInteger;

	// 20.2.2.28 Math.sign(x)
	var _mathSign = Math.sign || function sign(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

	// 20.2.2.28 Math.sign(x)


	_export(_export.S, 'Math', { sign: _mathSign });

	var sign = _core.Math.sign;

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

	// 19.1.3.6 Object.prototype.toString()

	var test = {};
	test[_wks('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  _redefine(Object.prototype, 'toString', function toString() {
	    return '[object ' + _classof(this) + ']';
	  }, true);
	}

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

	var ITERATOR$1 = _wks('iterator');
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
	  var NAME = collections[i];
	  var explicit = DOMIterables[NAME];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR$1]) _hide(proto, ITERATOR$1, ArrayValues);
	    if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	    _iterators[NAME] = ArrayValues;
	    if (explicit) for (key in es6_array_iterator) if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
	  }
	}

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

	var ITERATOR$2 = _wks('iterator');
	var ArrayProto$1 = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto$1[ITERATOR$2] === it);
	};

	var ITERATOR$3 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$3]
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

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES$1 = _wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES$1]) == undefined ? D : _aFunction(S);
	};

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

	var process = _global.process;
	var setTask = _global.setImmediate;
	var clearTask = _global.clearImmediate;
	var MessageChannel = _global.MessageChannel;
	var Dispatch = _global.Dispatch;
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
	      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(_ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(_ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = _ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
	    defer = function (id) {
	      _global.postMessage(id + '', '*');
	    };
	    _global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
	    defer = function (id) {
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
	        _html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(_ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var macrotask = _task.set;
	var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
	var process$1 = _global.process;
	var Promise$1 = _global.Promise;
	var isNode = _cof(process$1) == 'process';

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
	  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    var promise = Promise$1.resolve();
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
	      macrotask.call(_global, flush);
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

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = _aFunction(resolve);
	  this.reject = _aFunction(reject);
	}

	var f$3 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$3
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var _promiseResolve = function (C, x) {
	  _anObject(C);
	  if (_isObject(x) && x.constructor === C) return x;
	  var promiseCapability = _newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) _redefine(target, key, src[key], safe);
	  return target;
	};

	var SPECIES$2 = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = _global[KEY];
	  if (_descriptors && C && !C[SPECIES$2]) _objectDp.f(C, SPECIES$2, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var ITERATOR$4 = _wks('iterator');
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

	var task = _task.set;
	var microtask = _microtask();



	var PROMISE = 'Promise';
	var TypeError$1 = _global.TypeError;
	var process$2 = _global.process;
	var $Promise = _global[PROMISE];
	var isNode$1 = _classof(process$2) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
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
	  task.call(_global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = _perform(function () {
	        if (isNode$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else if (handler = _global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = _global.console) && console.error) {
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
	  task.call(_global, function () {
	    var handler;
	    if (isNode$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else if (handler = _global.onrejectionhandled) {
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
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
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
	    _anInstance(this, $Promise, PROMISE, '_h');
	    _aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
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
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
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
	    this.resolve = _ctx($resolve, promise, 1);
	    this.reject = _ctx($reject, promise, 1);
	  };
	  _newPromiseCapability.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _core[PROMISE];

	// statics
	_export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * (_library || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
	  }
	});
	_export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = _perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      _forOf(iterable, false, function (promise) {
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
	    var result = _perform(function () {
	      _forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	_export(_export.P + _export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = _speciesConstructor(this, _core.Promise || _global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return _promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return _promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });

	// https://github.com/tc39/proposal-promise-try




	_export(_export.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = _newPromiseCapability.f(this);
	  var result = _perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });

	var promise = _core.Promise;

	/**
	 * Default values for all Dinero objects.
	 *
	 * You can override default values for all subsequent Dinero objects by changing them directly on the global `Dinero` object.
	 * Existing instances won't be affected.
	 *
	 * @property {Number} defaultAmount - The default amount for new Dinero objects (see {@link module:Dinero Dinero} for format).
	 * @property {String} defaultCurrency - The default currency for new Dinero objects (see {@link module:Dinero Dinero} for format).
	 * @property {Number} defaultPrecision - The default precision for new Dinero objects (see {@link module:Dinero Dinero} for format).
	 *
	 * @example
	 * // Will set currency to 'EUR' for all Dinero objects.
	 * Dinero.defaultCurrency = 'EUR'
	 *
	 * @type {Object}
	 */
	var Defaults = {
	  defaultAmount: 0,
	  defaultCurrency: 'USD',
	  defaultPrecision: 2

	  /**
	   * Global settings for all Dinero objects.
	   *
	   * You can override global values for all subsequent Dinero objects by changing them directly on the global `Dinero` object.
	   * Existing instances won't be affected.
	   *
	   * @property {String}  globalLocale - The global locale for new Dinero objects (see {@link module:Dinero~setLocale setLocale} for format).
	   * @property {String}  globalFormat - The global format for new Dinero objects (see {@link module:Dinero~toFormat toFormat} for format).
	   * @property {String}  globalRoundingMode - The global rounding mode for new Dinero objects (see {@link module:Dinero~multiply multiply} or {@link module:Dinero~divide divide} for format).
	   * @property {String}  globalFormatRoundingMode - The global rounding mode to format new Dinero objects (see {@link module:Dinero~toFormat toFormat} or {@link module:Dinero~toRoundedUnit toRoundedUnit} for format).
	   * @property {String}  globalExchangeRatesApi.endpoint - The global exchange rate API endpoint for new Dinero objects (see {@link module:Dinero~convert convert} for format).
	   * @property {String}  globalExchangeRatesApi.propertyPath - The global exchange rate API property path for new Dinero objects (see {@link module:Dinero~convert convert} for format).
	   * @property {Object}  globalExchangeRatesApi.headers - The global exchange rate API headers for new Dinero objects (see {@link module:Dinero~convert convert} for format).
	   *
	   * @example
	   * // Will set locale to 'fr-FR' for all Dinero objects.
	   * Dinero.globalLocale = 'fr-FR'
	   * @example
	   * // Will set global exchange rate API parameters for all Dinero objects.
	   * Dinero.globalExchangeRatesApi = {
	   *  endpoint: 'https://yourexchangerates.api/latest?base={{from}}',
	   *  propertyPath: 'data.rates.{{to}}',
	   *  headers: {
	   *    'user-key': 'xxxxxxxxx'
	   *  }
	   * }
	   *
	   * @type {Object}
	   */
	};var Globals = {
	  globalLocale: 'en-US',
	  globalFormat: '$0,0.00',
	  globalRoundingMode: 'HALF_EVEN',
	  globalFormatRoundingMode: 'HALF_AWAY_FROM_ZERO',
	  globalExchangeRatesApi: {
	    endpoint: undefined,
	    headers: undefined,
	    propertyPath: undefined
	  }
	};

	/**
	 * Static methods for Dinero.
	 * @ignore
	 *
	 * @type {Object}
	 */
	var Static = {
	  /**
	   * Returns an array of Dinero objects, normalized to the same precision (the highest).
	   *
	   * @memberof module:Dinero
	   * @method
	   *
	   * @param {Dinero[]} objects - An array of Dinero objects
	   *
	   * @example
	   * // returns an array of Dinero objects
	   * // both with a precision of 3
	   * // and an amount of 1000
	   * Dinero.normalizePrecision([
	   *   Dinero({ amount: 100, precision: 2 }),
	   *   Dinero({ amount: 1000, precision: 3 })
	   * ])
	   *
	   * @return {Dinero[]}
	   */
	  normalizePrecision: function normalizePrecision(objects) {
	    var highestPrecision = objects.reduce(function (a, b) {
	      return Math.max(a.getPrecision(), b.getPrecision());
	    });
	    return objects.map(function (object) {
	      return object.getPrecision() !== highestPrecision ? object.convertPrecision(highestPrecision) : object;
	    });
	  }
	};

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	/**
	 * Returns whether a value is numeric.
	 * @ignore
	 *
	 * @param  {} value - The value to test.
	 *
	 * @return {Boolean}
	 */
	function isNumeric(value) {
	  return !isNaN(parseInt(value)) && isFinite(value);
	}

	/**
	 * Returns whether a value is a percentage.
	 * @ignore
	 *
	 * @param  {}  percentage - The percentage to test.
	 *
	 * @return {Boolean}
	 */
	function isPercentage(percentage) {
	  return isNumeric(percentage) && percentage <= 100 && percentage >= 0;
	}

	/**
	 * Returns whether an array of ratios is valid.
	 * @ignore
	 *
	 * @param  {}  ratios - The ratios to test.
	 *
	 * @return {Boolean}
	 */
	function areValidRatios(ratios) {
	  return ratios.length > 0 && ratios.every(function (ratio) {
	    return ratio > 0;
	  });
	}

	/**
	 * Returns whether a value is even.
	 * @ignore
	 *
	 * @param  {Number} value - The value to test.
	 *
	 * @return {Boolean}
	 */
	function isEven(value) {
	  return value % 2 === 0;
	}

	/**
	 * Returns whether a value is a float.
	 * @ignore
	 *
	 * @param  {}  value - The value to test.
	 *
	 * @return {Boolean}
	 */
	function isFloat(value) {
	  return isNumeric(value) && !Number.isInteger(value);
	}

	/**
	 * Returns how many fraction digits a number has.
	 * @ignore
	 *
	 * @param  {Number} [number=0] - The number to test.
	 *
	 * @return {Number}
	 */
	function countFractionDigits() {
	  var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

	  var fractionDigits = number.toString().split('.')[1];
	  return fractionDigits ? fractionDigits.length : 0;
	}

	/**
	 * Returns whether a number is half.
	 * @ignore
	 *
	 * @param {Number} number - The number to test.
	 *
	 * @return {Number}
	 */
	function isHalf(number) {
	  return Math.abs(number) % 1 === 0.5;
	}

	/**
	 * Fetches a JSON resource.
	 * @ignore
	 *
	 * @param  {String} url - The resource to fetch.
	 * @param  {Object} [options.headers] - The headers to pass.
	 *
	 * @throws {Error} If `request.status` is lesser than 200 or greater or equal to 400.
	 * @throws {Error} If network fails.
	 *
	 * @return {JSON}
	 */
	function getJSON(url) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  return new Promise(function (resolve, reject) {
	    var request = Object.assign(new XMLHttpRequest(), {
	      onreadystatechange: function onreadystatechange() {
	        if (request.readyState === 4) {
	          if (request.status >= 200 && request.status < 400) resolve(JSON.parse(request.responseText));else reject(new Error(request.statusText));
	        }
	      },
	      onerror: function onerror() {
	        reject(new Error('Network error'));
	      }
	    });

	    request.open('GET', url, true);
	    setXHRHeaders(request, options.headers);
	    request.send();
	  });
	}

	/**
	 * Returns an XHR object with attached headers.
	 * @ignore
	 *
	 * @param {XMLHttpRequest} xhr - The XHR request to set headers to.
	 * @param {Object} headers - The headers to set.
	 *
	 * @return {XMLHttpRequest}
	 */
	function setXHRHeaders(xhr) {
	  var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  for (var header in headers) {
	    xhr.setRequestHeader(header, headers[header]);
	  }return xhr;
	}

	/**
	 * Returns whether a value is undefined.
	 * @ignore
	 *
	 * @param {} value - The value to test.
	 *
	 * @return {Boolean}
	 */
	function isUndefined(value) {
	  return typeof value === 'undefined';
	}

	/**
	 * Returns an object flattened to one level deep.
	 * @ignore
	 *
	 * @param {Object} object - The object to flatten.
	 * @param {String} separator - The separator to use between flattened nodes.
	 *
	 * @return {Object}
	 */
	function flattenObject(object) {
	  var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

	  var finalObject = {};
	  Object.entries(object).forEach(function (item) {
	    if (_typeof(item[1]) === 'object') {
	      var flatObject = flattenObject(item[1]);
	      Object.entries(flatObject).forEach(function (node) {
	        finalObject[item[0] + separator + node[0]] = node[1];
	      });
	    } else {
	      finalObject[item[0]] = item[1];
	    }
	  });
	  return finalObject;
	}

	function Calculator() {
	  var floatMultiply = function floatMultiply(a, b) {
	    var getFactor = function getFactor(number) {
	      return Math.pow(10, countFractionDigits(number));
	    };
	    var factor = Math.max(getFactor(a), getFactor(b));
	    return Math.round(a * factor) * Math.round(b * factor) / (factor * factor);
	  };

	  var roundingModes = {
	    HALF_ODD: function HALF_ODD(number) {
	      var rounded = Math.round(number);
	      return isHalf(number) ? isEven(rounded) ? rounded - 1 : rounded : rounded;
	    },
	    HALF_EVEN: function HALF_EVEN(number) {
	      var rounded = Math.round(number);
	      return isHalf(number) ? isEven(rounded) ? rounded : rounded - 1 : rounded;
	    },
	    HALF_UP: function HALF_UP(number) {
	      return Math.round(number);
	    },
	    HALF_DOWN: function HALF_DOWN(number) {
	      return isHalf(number) ? Math.floor(number) : Math.round(number);
	    },
	    HALF_TOWARDS_ZERO: function HALF_TOWARDS_ZERO(number) {
	      return isHalf(number) ? Math.sign(number) * Math.floor(Math.abs(number)) : Math.round(number);
	    },
	    HALF_AWAY_FROM_ZERO: function HALF_AWAY_FROM_ZERO(number) {
	      return isHalf(number) ? Math.sign(number) * Math.ceil(Math.abs(number)) : Math.round(number);
	    }
	  };

	  return {
	    /**
	     * Returns the sum of two numbers.
	     * @ignore
	     *
	     * @param {Number} a - The first number to add.
	     * @param {Number} b - The second number to add.
	     *
	     * @return {Number}
	     */
	    add: function add(a, b) {
	      return a + b;
	    },

	    /**
	     * Returns the difference of two numbers.
	     * @ignore
	     *
	     * @param {Number} a - The first number to subtract.
	     * @param {Number} b - The second number to subtract.
	     *
	     * @return {Number}
	     */
	    subtract: function subtract(a, b) {
	      return a - b;
	    },

	    /**
	     * Returns the product of two numbers.
	     * @ignore
	     *
	     * @param {Number} a - The first number to multiply.
	     * @param {Number} b - The second number to multiply.
	     *
	     * @return {Number}
	     */
	    multiply: function multiply(a, b) {
	      return isFloat(a) || isFloat(b) ? floatMultiply(a, b) : a * b;
	    },

	    /**
	     * Returns the quotient of two numbers.
	     * @ignore
	     *
	     * @param {Number} a - The first number to divide.
	     * @param {Number} b - The second number to divide.
	     *
	     * @return {Number}
	     */
	    divide: function divide(a, b) {
	      return a / b;
	    },

	    /**
	     * Returns the remainder of two numbers.
	     * @ignore
	     *
	     * @param  {Number} a - The first number to divide.
	     * @param  {Number} b - The second number to divide.
	     *
	     * @return {Number}
	     */
	    modulo: function modulo(a, b) {
	      return a % b;
	    },

	    /**
	     * Returns a rounded number based off a specific rounding mode.
	     * @ignore
	     *
	     * @param {Number} number - The number to round.
	     * @param {String} [roundingMode='HALF_EVEN'] - The rounding mode to use.
	     *
	     * @returns {Number}
	     */
	    round: function round(number) {
	      var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'HALF_EVEN';

	      return roundingModes[roundingMode](number);
	    }
	  };
	}

	var calculator = Calculator();

	function Format(format) {
	  var matches = /^(?:(\$|USD)?0(?:(,)0)?(\.)?(0+)?|0(?:(,)0)?(\.)?(0+)?\s?(dollar)?)$/gm.exec(format);

	  return {
	    /**
	     * Returns the matches.
	     * @ignore
	     *
	     * @return {Array}
	     */
	    getMatches: function getMatches() {
	      return matches !== null ? matches.slice(1).filter(function (match) {
	        return !isUndefined(match);
	      }) : [];
	    },

	    /**
	     * Returns the amount of fraction digits to display.
	     * @ignore
	     *
	     * @return {Number}
	     */
	    getMinimumFractionDigits: function getMinimumFractionDigits() {
	      var decimalPosition = function decimalPosition(match) {
	        return match === '.';
	      };
	      return !isUndefined(this.getMatches().find(decimalPosition)) ? this.getMatches()[calculator.add(this.getMatches().findIndex(decimalPosition), 1)].split('').length : 0;
	    },

	    /**
	     * Returns the currency display mode.
	     * @ignore
	     *
	     * @return {String}
	     */
	    getCurrencyDisplay: function getCurrencyDisplay() {
	      var modes = {
	        USD: 'code',
	        dollar: 'name',
	        $: 'symbol'
	      };
	      return modes[this.getMatches().find(function (match) {
	        return match === 'USD' || match === 'dollar' || match === '$';
	      })];
	    },

	    /**
	     * Returns the formatting style.
	     * @ignore
	     *
	     * @return {String}
	     */
	    getStyle: function getStyle() {
	      return !isUndefined(this.getCurrencyDisplay(this.getMatches())) ? 'currency' : 'decimal';
	    },

	    /**
	     * Returns whether grouping should be used or not.
	     * @ignore
	     *
	     * @return {Boolean}
	     */
	    getUseGrouping: function getUseGrouping() {
	      return !isUndefined(this.getMatches().find(function (match) {
	        return match === ',';
	      }));
	    }
	  };
	}

	function CurrencyConverter(options) {
	  /* istanbul ignore next */
	  var mergeTags = function mergeTags() {
	    var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var tags = arguments[1];

	    for (var tag in tags) {
	      string = string.replace('{{' + tag + '}}', tags[tag]);
	    }
	    return string;
	  };

	  return {
	    /**
	     * Returns the exchange rate.
	     * @ignore
	     *
	     * @param  {String} from - The base currency.
	     * @param  {String} to   - The destination currency.
	     *
	     * @return {Promise}
	     */
	    getExchangeRate: function getExchangeRate(from, to) {
	      return getJSON(mergeTags(options.endpoint, { from: from, to: to }), {
	        headers: options.headers
	      }).then(function (data) {
	        return flattenObject(data)[mergeTags(options.propertyPath, { from: from, to: to })];
	      });
	    }
	  };
	}

	/**
	 * Performs an assertion.
	 * @ignore
	 *
	 * @param  {Boolean} condition - The expression to assert.
	 * @param  {Error}   [err=Error] - The error to throw if the assertion fails.
	 *
	 * @throws {Error} If `condition` returns `false`.
	 */
	function assert(condition) {
	  var err = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Error();

	  if (!condition) throw err;
	}

	/**
	 * Asserts a value is a percentage.
	 * @ignore
	 *
	 * @param  {}  percentage - The percentage to test.
	 *
	 * @throws {RangeError} If `percentage` is out of range.
	 */
	function assertPercentage(percentage) {
	  assert(isPercentage(percentage), new RangeError('You must provide a numeric value between 0 and 100.'));
	}

	/**
	 * Asserts an array of ratios is valid.
	 * @ignore
	 *
	 * @param  {}  ratios - The ratios to test.
	 *
	 * @throws {TypeError} If `ratios` are invalid.
	 */
	function assertValidRatios(ratios) {
	  assert(areValidRatios(ratios), new TypeError('You must provide a non-empty array of numeric values greater than 0.'));
	}

	/**
	 * Asserts a value is an integer.
	 * @ignore
	 *
	 * @param  {}  number - The value to test.
	 *
	 * @return {Boolean}
	 */
	function assertInteger(number) {
	  assert(Number.isInteger(number), new TypeError('You must provide an integer.'));
	}

	var calculator$1 = Calculator();

	/**
	 * A Dinero object is an immutable data structure representing a specific monetary value.
	 * It comes with methods for creating, parsing, manipulating, testing, transforming and formatting them.
	 *
	 * A Dinero object has:
	 *
	 * * An `amount`, expressed in minor currency units.
	 * * A `currency`, expressed as an {@link https://en.wikipedia.org/wiki/ISO_4217#Active_codes ISO 4217 currency code}.
	 * * A `precision`, expressed as an integer, to represent the number of decimal places in the `amount`.
	 *   This is helpful when you want to represent fractional minor currency units (e.g.: $10.4545).
	 *   You can also use it to represent a currency with a different [exponent](https://en.wikipedia.org/wiki/ISO_4217#Treatment_of_minor_currency_units_.28the_.22exponent.22.29) than `2` (e.g.: Iraqi dinar with 1000 fils in 1 dinar (exponent of `3`), Japanese yen with no sub-units (exponent of `0`)).
	 * * An optional `locale` property that affects how output strings are formatted.
	 *
	 * Here's an overview of the public API:
	 *
	 * * **Access:** {@link module:Dinero~getAmount getAmount}, {@link module:Dinero~getCurrency getCurrency}, {@link module:Dinero~getLocale getLocale} and {@link module:Dinero~getPrecision getPrecision}.
	 * * **Manipulation:** {@link module:Dinero~add add}, {@link module:Dinero~subtract subtract}, {@link module:Dinero~multiply multiply}, {@link module:Dinero~divide divide}, {@link module:Dinero~percentage percentage}, {@link module:Dinero~allocate allocate} and {@link module:Dinero~convert convert}.
	 * * **Testing:** {@link module:Dinero~equalsTo equalsTo}, {@link module:Dinero~lessThan lessThan}, {@link module:Dinero~lessThanOrEqual lessThanOrEqual}, {@link module:Dinero~greaterThan greaterThan}, {@link module:Dinero~greaterThanOrEqual greaterThanOrEqual}, {@link module:Dinero~isZero isZero}, {@link module:Dinero~isPositive isPositive}, {@link module:Dinero~isNegative isNegative}, {@link module:Dinero~hasSubUnits hasSubUnits}, {@link module:Dinero~hasSameCurrency hasSameCurrency} and {@link module:Dinero~hasSameAmount hasSameAmount}.
	 * * **Configuration:** {@link module:Dinero~setLocale setLocale}.
	 * * **Conversion & formatting:** {@link module:Dinero~toFormat toFormat}, {@link module:Dinero~toUnit toUnit}, {@link module:Dinero~toRoundedUnit toRoundedUnit}, {@link module:Dinero~toObject toObject}, {@link module:Dinero~convertPrecision convertPrecision} and {@link module:Dinero.normalizePrecision normalizePrecision}.
	 *
	 * @module Dinero
	 * @param  {Number} [options.amount=0] - The amount in minor currency units (as an integer).
	 * @param  {String} [options.currency='USD'] - An ISO 4217 currency code.
	 * @param  {String} [options.precision=2] - The number of decimal places to represent.
	 *
	 * @throws {TypeError} If `amount` or `precision` is invalid.
	 *
	 * @return {Object}
	 */
	var Dinero = function Dinero(options) {
	  var _Object$assign = Object.assign({}, {
	    amount: Dinero.defaultAmount,
	    currency: Dinero.defaultCurrency,
	    precision: Dinero.defaultPrecision
	  }, options),
	      amount = _Object$assign.amount,
	      currency = _Object$assign.currency,
	      precision = _Object$assign.precision;

	  assertInteger(amount);
	  assertInteger(precision);

	  var globalLocale = Dinero.globalLocale,
	      globalFormat = Dinero.globalFormat,
	      globalRoundingMode = Dinero.globalRoundingMode,
	      globalFormatRoundingMode = Dinero.globalFormatRoundingMode;


	  var globalExchangeRatesApi = Object.assign({}, Dinero.globalExchangeRatesApi);

	  /**
	   * Uses ES5 function notation so `this` can be passed through call, apply and bind
	   * @ignore
	   */
	  var create = function create(options) {
	    var obj = Object.assign({}, Object.assign({}, { amount: amount, currency: currency, precision: precision }, options), Object.assign({}, { locale: this.locale }, options));
	    return Object.assign(Dinero({
	      amount: obj.amount,
	      currency: obj.currency,
	      precision: obj.precision
	    }), {
	      locale: obj.locale
	    });
	  };

	  /**
	   * Uses ES5 function notation so `this` can be passed through call, apply and bind
	   * @ignore
	   */
	  var assertSameCurrency = function assertSameCurrency(comparator) {
	    assert(this.hasSameCurrency(comparator), new TypeError('You must provide a Dinero instance with the same currency.'));
	  };

	  return {
	    /**
	     * Returns the amount.
	     *
	     * @example
	     * // returns 500
	     * Dinero({ amount: 500 }).getAmount()
	     *
	     * @return {Number}
	     */
	    getAmount: function getAmount() {
	      return amount;
	    },

	    /**
	     * Returns the currency.
	     *
	     * @example
	     * // returns 'EUR'
	     * Dinero({ currency: 'EUR' }).getCurrency()
	     *
	     * @return {String}
	     */
	    getCurrency: function getCurrency() {
	      return currency;
	    },

	    /**
	     * Returns the locale.
	     *
	     * @example
	     * // returns 'fr-FR'
	     * Dinero().setLocale('fr-FR').getLocale()
	     *
	     * @return {String}
	     */
	    getLocale: function getLocale() {
	      return this.locale || globalLocale;
	    },

	    /**
	     * Returns a new Dinero object with an embedded locale.
	     *
	     * @param {String} newLocale - The new locale as an {@link http://tools.ietf.org/html/rfc5646 BCP 47 language tag}.
	     *
	     * @example
	     * // Returns a Dinero object with locale 'ja-JP'
	     * Dinero().setLocale('ja-JP')
	     *
	     * @return {Dinero}
	     */
	    setLocale: function setLocale(newLocale) {
	      return create.call(this, { locale: newLocale });
	    },

	    /**
	     * Returns the precision.
	     *
	     * @example
	     * // returns 3
	     * Dinero({ precision: 3 }).getPrecision()
	     *
	     * @return {Number}
	     */
	    getPrecision: function getPrecision() {
	      return precision;
	    },

	    /**
	     * Returns a new Dinero object with a new precision and a converted amount.
	     *
	     * @param {Number} newPrecision - The new precision.
	     *
	     * @example
	     * // Returns a Dinero object with precision 3 and amount 1000
	     * Dinero({ amount: 100, precision: 2 }).convertPrecision(3)
	     *
	     * @throws {TypeError} If `newPrecision` is invalid.
	     *
	     * @return {Dinero}
	     */
	    convertPrecision: function convertPrecision(newPrecision) {
	      assertInteger(newPrecision);
	      return create.call(this, {
	        amount: calculator$1.multiply(this.getAmount(), Math.pow(10, calculator$1.subtract(newPrecision, this.getPrecision()))),
	        precision: newPrecision
	      });
	    },

	    /**
	     * Returns a new Dinero object that represents the sum of this and an other Dinero object.
	     *
	     * If Dinero objects have a different `precision`, they will be first converted to the highest.
	     *
	     * @param {Dinero} addend - The Dinero object to add.
	     *
	     * @example
	     * // returns a Dinero object with amount 600
	     * Dinero({ amount: 400 }).add(Dinero({ amount: 200 }))
	     * @example
	     * // returns a Dinero object with amount 144545 and precision 4
	     * Dinero({ amount: 400 }).add(Dinero({ amount: 104545, precision: 4 }))
	     *
	     * @throws {TypeError} If `addend` has a different currency.
	     *
	     * @return {Dinero}
	     */
	    add: function add(addend) {
	      assertSameCurrency.call(this, addend);
	      var addends = Dinero.normalizePrecision([this, addend]);
	      return create.call(this, {
	        amount: calculator$1.add(addends[0].getAmount(), addends[1].getAmount()),
	        precision: addends[0].getPrecision()
	      });
	    },

	    /**
	     * Returns a new Dinero object that represents the difference of this and an other Dinero object.
	     *
	     * If Dinero objects have a different `precision`, they will be first converted to the highest.
	     *
	     * @param  {Dinero} subtrahend - The Dinero object to subtract.
	     *
	     * @example
	     * // returns a Dinero object with amount 200
	     * Dinero({ amount: 400 }).subtract(Dinero({ amount: 200 }))
	     * @example
	     * // returns a Dinero object with amount 64545 and precision 4
	     * Dinero({ amount: 104545, precision: 4 }).subtract(Dinero({ amount: 400 }))
	     *
	     * @throws {TypeError} If `subtrahend` has a different currency.
	     *
	     * @return {Dinero}
	     */
	    subtract: function subtract(subtrahend) {
	      assertSameCurrency.call(this, subtrahend);
	      var subtrahends = Dinero.normalizePrecision([this, subtrahend]);
	      return create.call(this, {
	        amount: calculator$1.subtract(subtrahends[0].getAmount(), subtrahends[1].getAmount()),
	        precision: subtrahends[0].getPrecision()
	      });
	    },

	    /**
	     * Returns a new Dinero object that represents the multiplied value by the given factor.
	     *
	     * By default, fractional minor currency units are rounded using the **half to even** rule ([banker's rounding](http://wiki.c2.com/?BankersRounding)).
	     *
	     * Rounding *can* lead to accuracy issues as you chain many times. Consider a minimal amount of subsequent calculations for safer results.
	     * You can also specify a different `roundingMode` to better fit your needs.
	     *
	     * @param  {Number} multiplier - The factor to multiply by.
	     * @param  {String} [roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'` or `'HALF_AWAY_FROM_ZERO'`.
	     *
	     * @example
	     * // returns a Dinero object with amount 1600
	     * Dinero({ amount: 400 }).multiply(4)
	     * @example
	     * // returns a Dinero object with amount 800
	     * Dinero({ amount: 400 }).multiply(2.001)
	     * @example
	     * // returns a Dinero object with amount 801
	     * Dinero({ amount: 400 }).multiply(2.00125, 'HALF_UP')
	     *
	     * @return {Dinero}
	     */
	    multiply: function multiply(multiplier) {
	      var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalRoundingMode;

	      return create.call(this, {
	        amount: calculator$1.round(calculator$1.multiply(this.getAmount(), multiplier), roundingMode)
	      });
	    },

	    /**
	     * Returns a new Dinero object that represents the divided value by the given factor.
	     *
	     * By default, fractional minor currency units are rounded using the **half to even** rule ([banker's rounding](http://wiki.c2.com/?BankersRounding)).
	     *
	     * Rounding *can* lead to accuracy issues as you chain many times. Consider a minimal amount of subsequent calculations for safer results.
	     * You can also specify a different `roundingMode` to better fit your needs.
	     *
	     * As rounding is applied, precision may be lost in the process. If you want to accurately split a Dinero object, use {@link module:Dinero~allocate allocate} instead.
	     *
	     * @param  {Number} divisor - The factor to divide by.
	     * @param  {String} [roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'` or `'HALF_AWAY_FROM_ZERO'`.
	     *
	     * @example
	     * // returns a Dinero object with amount 100
	     * Dinero({ amount: 400 }).divide(4)
	     * @example
	     * // returns a Dinero object with amount 52
	     * Dinero({ amount: 105 }).divide(2)
	     * @example
	     * // returns a Dinero object with amount 53
	     * Dinero({ amount: 105 }).divide(2, 'HALF_UP')
	     *
	     * @return {Dinero}
	     */
	    divide: function divide(divisor) {
	      var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalRoundingMode;

	      return create.call(this, {
	        amount: calculator$1.round(calculator$1.divide(this.getAmount(), divisor), roundingMode)
	      });
	    },

	    /**
	     * Returns a new Dinero object that represents a percentage of this.
	     *
	     * As rounding is applied, precision may be lost in the process. If you want to accurately split a Dinero object, use {@link module:Dinero~allocate allocate} instead.
	     *
	     * @param  {Number} percentage - The percentage to extract (between 0 and 100).
	     *
	     * @example
	     * // returns a Dinero object with amount 5000
	     * Dinero({ amount: 10000 }).percentage(50)
	     *
	     * @throws {RangeError} If `percentage` is out of range.
	     *
	     * @return {Dinero}
	     */
	    percentage: function percentage(_percentage) {
	      assertPercentage(_percentage);
	      return this.multiply(calculator$1.divide(_percentage, 100));
	    },

	    /**
	     * Allocates the amount of a Dinero object according to a list of ratios.
	     *
	     * Sometimes you need to split monetary values but percentages can't cut it without adding or losing pennies.
	     * A good example is invoicing: let's say you need to bill $1,000.03 and you want a 50% downpayment.
	     * If you use {@link module:Dinero~percentage percentage}, you'll get an accurate Dinero object but the amount won't be billable: you can't split a penny.
	     * If you round it, you'll bill a penny extra.
	     * With {@link module:Dinero~allocate allocate}, you can split a monetary amount then distribute the remainder as evenly as possible.
	     *
	     * You can use percentage style or ratio style for `ratios`: `[25, 75]` and `[1, 3]` will do the same thing.
	     *
	     * @param  {Number[]} ratios - The ratios to allocate the money to.
	     *
	     * @example
	     * // returns an array of two Dinero objects
	     * // the first one with an amount of 502
	     * // the second one with an amount of 501
	     * Dinero({ amount: 1003 }).allocate([50, 50])
	     * @example
	     * // returns an array of two Dinero objects
	     * // the first one with an amount of 25
	     * // the second one with an amount of 75
	     * Dinero({ amount: 100 }).allocate([1, 3])
	     *
	     * @throws {TypeError} If ratios are invalid.
	     *
	     * @return {Dinero[]}
	     */
	    allocate: function allocate(ratios) {
	      var _this = this;

	      assertValidRatios(ratios);

	      var total = ratios.reduce(function (a, b) {
	        return calculator$1.add(a, b);
	      });
	      var remainder = this.getAmount();

	      var shares = ratios.map(function (ratio) {
	        var share = Math.floor(calculator$1.divide(calculator$1.multiply(_this.getAmount(), ratio), total));
	        remainder = calculator$1.subtract(remainder, share);
	        return create.call(_this, { amount: share });
	      });

	      for (var i = 0; remainder > 0; i++) {
	        shares[i] = shares[i].add(create.call(this, { amount: 1 }));
	        remainder = calculator$1.subtract(remainder, 1);
	      }

	      return shares;
	    },

	    /**
	     * Returns a Promise containing a new Dinero object converted to another currency.
	     *
	     * You must provide your own API to retrieve exchange rates. This method won't work if you don't set either {@link Globals global API parameters}, or local ones for your instance.
	     *
	     * Here are some exchange rate APIs you can use:
	     *
	     * * [Fixer](https://fixer.io)
	     * * [Open Exchange Rates](https://openexchangerates.org)
	     * * [Coinbase](https://api.coinbase.com/v2/exchange-rates)
	     * * More [foreign](https://github.com/toddmotto/public-apis#currency-exchange) and [crypto](https://github.com/toddmotto/public-apis#cryptocurrency) exchange rate APIs.
	     *
	     * You will need to specify at least:
	     *
	     * * a **destination currency**: the currency in which you want to convert your Dinero object. You can specify it with `currency`.
	     * * an **endpoint**: the API URL to query exchange rates, with parameters. You can specify it with `options.endpoint`.
	     * * a **property path**: the path to access the wanted rate in your API's JSON response. For example, with a response of:
	     * ```json
	     * {
	     *     "data": {
	     *       "base": "USD",
	     *       "destination": "EUR",
	     *       "rate": "0.827728919"
	     *     }
	     * }
	     * ```
	     * Then the property path is `'data.rate'`. You can specify it with `options.propertyPath`.
	     *
	     * The base currency (the currency of your Dinero object) and the destination currency can be used as "merge tags" with the mustache syntax, respectively `{{from}}` and `{{to}}`.
	     * You can use these tags to refer to these values in `options.endpoint` and `options.propertyPath`.
	     *
	     * For example, if you need to specify the base currency as a query parameter, you can do the following:
	     *
	     * ```js
	     * {
	     *   endpoint: 'https://yourexchangerates.api/latest?base={{from}}'
	     * }
	     * ```
	     *
	     * @param  {String} currency - The destination currency, expressed as an {@link https://en.wikipedia.org/wiki/ISO_4217#Active_codes ISO 4217 currency code}.
	     * @param  {String} options.endpoint - The API endpoint to retrieve exchange rates.
	     * @param  {String} options.propertyPath - The property path to the rate.
	     * @param  {Object} [options.headers] - The HTTP headers to provide, if needed.
	     * @param  {String} [options.roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'` or `'HALF_AWAY_FROM_ZERO'`.
	     *
	     * @example
	     * // your global API parameters
	     * Dinero.globalExchangeRatesApi = { ... }
	     *
	     * // returns a Promise containing a Dinero object with the destination currency
	     * // and the initial amount converted to the new currency.
	     * Dinero({ amount: 500 }).convert('EUR')
	     * @example
	     * // returns a Promise containing a Dinero object,
	     * // with specific API parameters and rounding mode for this specific instance.
	     * Dinero({ amount: 500 })
	     *   .convert('XBT', {
	     *     endpoint: 'https://yourexchangerates.api/latest?base={{from}}',
	     *     propertyPath: 'data.rates.{{to}}',
	     *     headers: {
	     *       'user-key': 'xxxxxxxxx'
	     *     },
	     *     roundingMode: 'HALF_UP'
	     *   })
	     * @example
	     * // usage with Promise.prototype.then and Promise.prototype.catch
	     * Dinero({ amount: 500 })
	     *   .convert('EUR')
	     *   .then(dinero => {
	     *     dinero.getCurrency() // returns 'EUR'
	     *   })
	     *   .catch(err => {
	     *     // handle errors
	     *   })
	     * @example
	     * // usage with async/await
	     * (async () => {
	     *   const price = await Dinero({ amount: 500 }).convert('EUR')
	     *   price.getCurrency() // returns 'EUR'
	     * })()
	     *
	     * @return {Promise}
	     */
	    convert: function convert(currency, options) {
	      var _this2 = this;

	      options = Object.assign({}, globalExchangeRatesApi, options);
	      return CurrencyConverter(options).getExchangeRate(this.getCurrency(), currency).then(function (rate) {
	        assert(!isUndefined(rate), new TypeError('No rate was found for the destination currency "' + currency + '".'));
	        return create.call(_this2, {
	          amount: calculator$1.round(calculator$1.multiply(_this2.getAmount(), parseFloat(rate)), options.roundingMode),
	          currency: currency
	        });
	      });
	    },

	    /**
	     * Checks whether the value represented by this object equals to the other.
	     *
	     * @param  {Dinero} comparator - The Dinero object to compare to.
	     *
	     * @example
	     * // returns true
	     * Dinero({ amount: 500, currency: 'EUR' }).equalsTo(Dinero({ amount: 500, currency: 'EUR' }))
	     * @example
	     * // returns false
	     * Dinero({ amount: 500, currency: 'EUR' }).equalsTo(Dinero({ amount: 800, currency: 'EUR' }))
	     * @example
	     * // returns false
	     * Dinero({ amount: 500, currency: 'USD' }).equalsTo(Dinero({ amount: 500, currency: 'EUR' }))
	     * @example
	     * // returns false
	     * Dinero({ amount: 500, currency: 'USD' }).equalsTo(Dinero({ amount: 800, currency: 'EUR' }))
	     * @example
	     * // returns true
	     * Dinero({ amount: 1000, currency: 'EUR', precision: 2 }).equalsTo(Dinero({ amount: 10000, currency: 'EUR', precision: 3 }))
	     * @example
	     * // returns false
	     * Dinero({ amount: 10000, currency: 'EUR', precision: 2 }).equalsTo(Dinero({ amount: 10000, currency: 'EUR', precision: 3 }))
	     *
	     * @return {Boolean}
	     */
	    equalsTo: function equalsTo(comparator) {
	      return this.hasSameAmount(comparator) && this.hasSameCurrency(comparator);
	    },

	    /**
	     * Checks whether the value represented by this object is less than the other.
	     *
	     * @param  {Dinero} comparator - The Dinero object to compare to.
	     *
	     * @example
	     * // returns true
	     * Dinero({ amount: 500 }).lessThan(Dinero({ amount: 800 }))
	     * @example
	     * // returns false
	     * Dinero({ amount: 800 }).lessThan(Dinero({ amount: 500 }))
	     * @example
	     * // returns true
	     * Dinero({ amount: 5000, precision: 3 }).lessThan(Dinero({ amount: 800 }))
	     * @example
	     * // returns false
	     * Dinero({ amount: 800 }).lessThan(Dinero({ amount: 5000, precision: 3 }))
	     *
	     * @throws {TypeError} If `comparator` has a different currency.
	     *
	     * @return {Boolean}
	     */
	    lessThan: function lessThan(comparator) {
	      assertSameCurrency.call(this, comparator);
	      var comparators = Dinero.normalizePrecision([this, comparator]);
	      return comparators[0].getAmount() < comparators[1].getAmount();
	    },

	    /**
	     * Checks whether the value represented by this object is less than or equal to the other.
	     *
	     * @param  {Dinero} comparator - The Dinero object to compare to.
	     *
	     * @example
	     * // returns true
	     * Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 800 }))
	     * @example
	     * // returns true
	     * Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 500 }))
	     * @example
	     * // returns false
	     * Dinero({ amount: 500 }).lessThanOrEqual(Dinero({ amount: 300 }))
	     * @example
	     * // returns true
	     * Dinero({ amount: 5000, precision: 3 }).lessThanOrEqual(Dinero({ amount: 800 }))
	     * @example
	     * // returns true
	     * Dinero({ amount: 5000, precision: 3 }).lessThanOrEqual(Dinero({ amount: 500 }))
	     * @example
	     * // returns false
	     * Dinero({ amount: 800 }).lessThanOrEqual(Dinero({ amount: 5000, precision: 3 }))
	     *
	     * @throws {TypeError} If `comparator` has a different currency.
	     *
	     * @return {Boolean}
	     */
	    lessThanOrEqual: function lessThanOrEqual(comparator) {
	      assertSameCurrency.call(this, comparator);
	      var comparators = Dinero.normalizePrecision([this, comparator]);
	      return comparators[0].getAmount() <= comparators[1].getAmount();
	    },

	    /**
	     * Checks whether the value represented by this object is greater than the other.
	     *
	     * @param  {Dinero} comparator - The Dinero object to compare to.
	     *
	     * @example
	     * // returns false
	     * Dinero({ amount: 500 }).greaterThan(Dinero({ amount: 800 }))
	     * @example
	     * // returns true
	     * Dinero({ amount: 800 }).greaterThan(Dinero({ amount: 500 }))
	     * @example
	     * // returns true
	     * Dinero({ amount: 800 }).greaterThan(Dinero({ amount: 5000, precision: 3 }))
	     * @example
	     * // returns false
	     * Dinero({ amount: 5000, precision: 3 }).greaterThan(Dinero({ amount: 800 }))
	     *
	     * @throws {TypeError} If `comparator` has a different currency.
	     *
	     * @return {Boolean}
	     */
	    greaterThan: function greaterThan(comparator) {
	      assertSameCurrency.call(this, comparator);
	      var comparators = Dinero.normalizePrecision([this, comparator]);
	      return comparators[0].getAmount() > comparators[1].getAmount();
	    },

	    /**
	     * Checks whether the value represented by this object is greater than or equal to the other.
	     *
	     * @param  {Dinero} comparator - The Dinero object to compare to.
	     *
	     * @example
	     * // returns true
	     * Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 300 }))
	     * @example
	     * // returns true
	     * Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 500 }))
	     * @example
	     * // returns false
	     * Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 800 }))
	     * @example
	     * // returns true
	     * Dinero({ amount: 800 }).greaterThanOrEqual(Dinero({ amount: 5000, precision: 3 }))
	     * @example
	     * // returns true
	     * Dinero({ amount: 500 }).greaterThanOrEqual(Dinero({ amount: 5000, precision: 3 }))
	     * @example
	     * // returns false
	     * Dinero({ amount: 5000, precision: 3 }).greaterThanOrEqual(Dinero({ amount: 800 }))
	     *
	     * @throws {TypeError} If `comparator` has a different currency.
	     *
	     * @return {Boolean}
	     */
	    greaterThanOrEqual: function greaterThanOrEqual(comparator) {
	      assertSameCurrency.call(this, comparator);
	      var comparators = Dinero.normalizePrecision([this, comparator]);
	      return comparators[0].getAmount() >= comparators[1].getAmount();
	    },

	    /**
	     * Checks if the value represented by this object is zero.
	     *
	     * @example
	     * // returns true
	     * Dinero({ amount: 0 }).isZero()
	     * @example
	     * // returns false
	     * Dinero({ amount: 100 }).isZero()
	     *
	     * @return {Boolean}
	     */
	    isZero: function isZero() {
	      return this.getAmount() === 0;
	    },

	    /**
	     * Checks if the value represented by this object is positive.
	     *
	     * @example
	     * // returns false
	     * Dinero({ amount: -10 }).isPositive()
	     * @example
	     * // returns true
	     * Dinero({ amount: 10 }).isPositive()
	     * @example
	     * // returns true
	     * Dinero({ amount: 0 }).isPositive()
	     *
	     * @return {Boolean}
	     */
	    isPositive: function isPositive() {
	      return this.getAmount() >= 0;
	    },

	    /**
	     * Checks if the value represented by this object is negative.
	     *
	     * @example
	     * // returns true
	     * Dinero({ amount: -10 }).isNegative()
	     * @example
	     * // returns false
	     * Dinero({ amount: 10 }).isNegative()
	     * @example
	     * // returns false
	     * Dinero({ amount: 0 }).isNegative()
	     *
	     * @return {Boolean}
	     */
	    isNegative: function isNegative() {
	      return this.getAmount() < 0;
	    },

	    /**
	     * Checks if this has minor currency units.
	     * Deprecates {@link module:Dinero~hasCents hasCents}.
	     *
	     * @example
	     * // returns false
	     * Dinero({ amount: 1100 }).hasSubUnits()
	     * @example
	     * // returns true
	     * Dinero({ amount: 1150 }).hasSubUnits()
	     *
	     * @return {Boolean}
	     */
	    hasSubUnits: function hasSubUnits() {
	      return calculator$1.modulo(this.getAmount(), Math.pow(10, precision)) !== 0;
	    },

	    /**
	     * Checks if this has minor currency units.
	     *
	     * @deprecated since version 1.4.0, will be removed in 2.0.0
	     * Use {@link module:Dinero~hasSubUnits hasSubUnits} instead.
	     *
	     * @example
	     * // returns false
	     * Dinero({ amount: 1100 }).hasCents()
	     * @example
	     * // returns true
	     * Dinero({ amount: 1150 }).hasCents()
	     *
	     * @return {Boolean}
	     */
	    hasCents: function hasCents() {
	      return calculator$1.modulo(this.getAmount(), Math.pow(10, precision)) !== 0;
	    },

	    /**
	     * Checks whether the currency represented by this object equals to the other.
	     *
	     * @param  {Dinero}  comparator - The Dinero object to compare to.
	     *
	     * @example
	     * // returns true
	     * Dinero({ amount: 2000, currency: 'EUR' }).hasSameCurrency(Dinero({ amount: 1000, currency: 'EUR' }))
	     * @example
	     * // returns false
	     * Dinero({ amount: 1000, currency: 'EUR' }).hasSameCurrency(Dinero({ amount: 1000, currency: 'USD' }))
	     *
	     * @return {Boolean}
	     */
	    hasSameCurrency: function hasSameCurrency(comparator) {
	      return this.getCurrency() === comparator.getCurrency();
	    },

	    /**
	     * Checks whether the amount represented by this object equals to the other.
	     *
	     * @param  {Dinero}  comparator - The Dinero object to compare to.
	     *
	     * @example
	     * // returns true
	     * Dinero({ amount: 1000, currency: 'EUR' }).hasSameAmount(Dinero({ amount: 1000 }))
	     * @example
	     * // returns false
	     * Dinero({ amount: 2000, currency: 'EUR' }).hasSameAmount(Dinero({ amount: 1000, currency: 'EUR' }))
	     * @example
	     * // returns true
	     * Dinero({ amount: 1000, currency: 'EUR', precision: 2 }).hasSameAmount(Dinero({ amount: 10000, precision: 3 }))
	     * @example
	     * // returns false
	     * Dinero({ amount: 10000, currency: 'EUR', precision: 2 }).hasSameAmount(Dinero({ amount: 10000, precision: 3 }))
	     *
	     * @return {Boolean}
	     */
	    hasSameAmount: function hasSameAmount(comparator) {
	      var comparators = Dinero.normalizePrecision([this, comparator]);
	      return comparators[0].getAmount() === comparators[1].getAmount();
	    },

	    /**
	     * Returns this object formatted as a string.
	     *
	     * The format is a mask which defines how the output string will be formatted.
	     * It defines whether to display a currency, in what format, how many fraction digits to display and whether to use grouping separators.
	     * The output is formatted according to the applying locale.
	     *
	     * Object                       | Format            | String
	     * :--------------------------- | :---------------- | :---
	     * `Dinero({ amount: 500050 })` | `'$0,0.00'`       | $5,000.50
	     * `Dinero({ amount: 500050 })` | `'$0,0'`          | $5,001
	     * `Dinero({ amount: 500050 })` | `'$0'`            | $5001
	     * `Dinero({ amount: 500050 })` | `'$0.0'`          | $5000.5
	     * `Dinero({ amount: 500050 })` | `'USD0,0.0'`      | USD5,000.5
	     * `Dinero({ amount: 500050 })` | `'0,0.0 dollar'`  | 5,000.5 dollars
	     *
	     * Don't try to substitute the `$` sign or the `USD` code with your target currency, nor adapt the format string to the exact format you want.
	     * The format is a mask which defines a pattern and returns a valid, localized currency string.
	     * If you want to display the object in a custom way, either use {@link module:Dinero~getAmount getAmount}, {@link module:Dinero~toUnit toUnit} or {@link module:Dinero~toRoundedUnit toRoundedUnit} and manipulate the output string as you wish.
	     *
	     * {@link module:Dinero~toFormat toFormat} is syntactic sugar over JavaScript's native `Number.prototype.toLocaleString` method, which you can use directly:
	     * `Dinero().toRoundedUnit(digits, roundingMode).toLocaleString(locale, options)`.
	     *
	     * By default, amounts are rounded using the **half away from zero** rule ([commercial rounding](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero)).
	     * You can also specify a different `roundingMode` to better fit your needs.
	     *
	     * @param  {String} [format='$0,0.00'] - The format mask to format to.
	     * @param  {String} [roundingMode='HALF_AWAY_FROM_ZERO'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'` or `'HALF_AWAY_FROM_ZERO'`.
	     *
	     * @example
	     * // returns $2,000
	     * Dinero({ amount: 200000 }).toFormat('$0,0')
	     * @example
	     * // returns €50.5
	     * Dinero({ amount: 5050, currency: 'EUR' }).toFormat('$0,0.0')
	     * @example
	     * // returns 100 euros
	     * Dinero({ amount: 10000, currency: 'EUR' }).setLocale('fr-FR').toFormat('0,0 dollar')
	     * @example
	     * // returns 2000
	     * Dinero({ amount: 200000, currency: 'EUR' }).toFormat()
	     * @example
	     * // returns $10
	     * Dinero({ amount: 1050 }).toFormat('$0', 'HALF_EVEN')
	     *
	     * @return {String}
	     */
	    toFormat: function toFormat() {
	      var format = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : globalFormat;
	      var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalFormatRoundingMode;

	      var formatter = Format(format);

	      return this.toRoundedUnit(formatter.getMinimumFractionDigits(), roundingMode).toLocaleString(this.getLocale(), {
	        currencyDisplay: formatter.getCurrencyDisplay(),
	        useGrouping: formatter.getUseGrouping(),
	        minimumFractionDigits: formatter.getMinimumFractionDigits(),
	        style: formatter.getStyle(),
	        currency: this.getCurrency()
	      });
	    },

	    /**
	     * Returns the amount represented by this object in units.
	     *
	     * @example
	     * // returns 10.5
	     * Dinero({ amount: 1050 }).toUnit()
	     * @example
	     * // returns 10.545
	     * Dinero({ amount: 10545, precision: 3 }).toUnit()
	     *
	     * @return {Number}
	     */
	    toUnit: function toUnit() {
	      return calculator$1.divide(this.getAmount(), Math.pow(10, precision));
	    },

	    /**
	     * Returns the amount represented by this object in rounded units.
	     *
	     * By default, the method uses the **half away from zero** rule ([commercial rounding](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero)).
	     * You can also specify a different `roundingMode` to better fit your needs.
	     *
	     * @example
	     * // returns 10.6
	     * Dinero({ amount: 1055 }).toRoundedUnit(1)
	     * @example
	     * // returns 10
	     * Dinero({ amount: 1050 }).toRoundedUnit(0, 'HALF_EVEN')
	     *
	     * @param  {Number} digits - The number of fraction digits to round to.
	     * @param  {String} [roundingMode='HALF_AWAY_FROM_ZERO'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'` or `'HALF_AWAY_FROM_ZERO'`.
	     *
	     * @return {Number}
	     */
	    toRoundedUnit: function toRoundedUnit(digits) {
	      var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalFormatRoundingMode;

	      var factor = Math.pow(10, digits);
	      return calculator$1.divide(calculator$1.round(calculator$1.multiply(this.toUnit(), factor), roundingMode), factor);
	    },

	    /**
	     * Return the object's data as an object literal.
	     *
	     * @example
	     * // returns { amount: 500, currency: 'EUR', precision: 2 }
	     * Dinero({ amount: 500, currency: 'EUR', precision: 2 }).toObject()
	     *
	     * @return {Object}
	     */
	    toObject: function toObject() {
	      return {
	        amount: amount,
	        currency: currency,
	        precision: precision
	      };
	    }
	  };
	};

	var Dinero$1 = Object.assign(Dinero, Defaults, Globals, Static);

	return Dinero$1;

})));
