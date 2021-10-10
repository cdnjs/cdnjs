(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.Dinero = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.5',
	  mode:  'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
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
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
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

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = functionBindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var defineProperty = Object.defineProperty;
	var cache = {};

	var thrower = function (it) { throw it; };

	var arrayMethodUsesToLength = function (METHOD_NAME, options) {
	  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
	  if (!options) options = {};
	  var method = [][METHOD_NAME];
	  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
	  var argument0 = has(options, 0) ? options[0] : thrower;
	  var argument1 = has(options, 1) ? options[1] : undefined;

	  return cache[METHOD_NAME] = !!method && !fails(function () {
	    if (ACCESSORS && !descriptors) return true;
	    var O = { length: -1 };

	    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;

	    method.call(O, argument0, argument1);
	  });
	};

	var $every = arrayIteration.every;



	var STRICT_METHOD = arrayMethodIsStrict('every');
	var USES_TO_LENGTH = arrayMethodUsesToLength('every');

	// `Array.prototype.every` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.every
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
	  every: function every(callbackfn /* , thisArg */) {
	    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var call = Function.call;

	var entryUnbind = function (CONSTRUCTOR, METHOD, length) {
	  return functionBindContext(call, global_1[CONSTRUCTOR].prototype[METHOD], length);
	};

	var every = entryUnbind('Array', 'every');

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var $findIndex = arrayIteration.findIndex;



	var FIND_INDEX = 'findIndex';
	var SKIPS_HOLES = true;

	var USES_TO_LENGTH$1 = arrayMethodUsesToLength(FIND_INDEX);

	// Shouldn't skip holes
	if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

	// `Array.prototype.findIndex` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.findindex
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH$1 }, {
	  findIndex: function findIndex(callbackfn /* , that = undefined */) {
	    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND_INDEX);

	var findIndex = entryUnbind('Array', 'findIndex');

	var $find = arrayIteration.find;



	var FIND = 'find';
	var SKIPS_HOLES$1 = true;

	var USES_TO_LENGTH$2 = arrayMethodUsesToLength(FIND);

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES$1 = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 || !USES_TO_LENGTH$2 }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables(FIND);

	var find = entryUnbind('Array', 'find');

	var iterators = {};

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ( !has(IteratorPrototype, ITERATOR)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var defineProperty$1 = objectDefineProperty.f;



	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis$1 = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$2 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
	iterators.Arguments = iterators.Array;

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var keys$1 = entryUnbind('Array', 'keys');

	var $some = arrayIteration.some;



	var STRICT_METHOD$1 = arrayMethodIsStrict('some');
	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('some');

	// `Array.prototype.some` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.some
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$1 || !USES_TO_LENGTH$3 }, {
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var some = entryUnbind('Array', 'some');

	var nativeAssign = Object.assign;
	var defineProperty$2 = Object.defineProperty;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$2({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$2(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
	  assign: objectAssign
	});

	var assign = path.Object.assign;

	var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	// `Object.{ entries, values }` methods implementation
	var createMethod$2 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!descriptors || propertyIsEnumerable.call(O, key)) {
	        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.github.io/ecma262/#sec-object.entries
	  entries: createMethod$2(true),
	  // `Object.values` method
	  // https://tc39.github.io/ecma262/#sec-object.values
	  values: createMethod$2(false)
	};

	var $entries = objectToArray.entries;

	// `Object.entries` method
	// https://tc39.github.io/ecma262/#sec-object.entries
	_export({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});

	var entries = path.Object.entries;

	var floor$1 = Math.floor;

	// `Number.isInteger` method implementation
	// https://tc39.github.io/ecma262/#sec-number.isinteger
	var isInteger = function isInteger(it) {
	  return !isObject(it) && isFinite(it) && floor$1(it) === it;
	};

	// `Number.isInteger` method
	// https://tc39.github.io/ecma262/#sec-number.isinteger
	_export({ target: 'Number', stat: true }, {
	  isInteger: isInteger
	});

	var isInteger$1 = path.Number.isInteger;

	// `Math.sign` method implementation
	// https://tc39.github.io/ecma262/#sec-math.sign
	var mathSign = Math.sign || function sign(x) {
	  // eslint-disable-next-line no-self-compare
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

	// `Math.sign` method
	// https://tc39.github.io/ecma262/#sec-math.sign
	_export({ target: 'Math', stat: true }, {
	  sign: mathSign
	});

	var sign = path.Math.sign;

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// `Object.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$3 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$3(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$3(true)
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$1(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$1(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$2] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG$3]) {
	      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
	    }
	    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	var nativePromiseConstructor = global_1.Promise;

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);
	  return target;
	};

	var SPECIES$1 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$1]) {
	    defineProperty(Constructor, SPECIES$1, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');
	var ArrayPrototype$1 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$3] === it);
	};

	var ITERATOR$4 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$4]
	    || it['@@iterator']
	    || iterators[classof(it)];
	};

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};

	var iterate_1 = createCommonjsModule(function (module) {
	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
	  var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
	  var iterator, iterFn, index, length, result, next, step;

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
	        result = AS_ENTRIES
	          ? boundFunction(anObject(step = iterable[index])[0], step[1])
	          : boundFunction(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = iterFn.call(iterable);
	  }

	  next = iterator.next;
	  while (!(step = next.call(iterator)).done) {
	    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  } return new Result(false);
	};

	iterate.stop = function (result) {
	  return new Result(true, result);
	};
	});

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$5] = function () {
	    return this;
	  };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$5] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	var SPECIES$2 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$2]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

	var location = global_1.location;
	var set$1 = global_1.setImmediate;
	var clear = global_1.clearImmediate;
	var process = global_1.process;
	var MessageChannel = global_1.MessageChannel;
	var Dispatch = global_1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;

	var run = function (id) {
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global_1.postMessage(id + '', location.protocol + '//' + location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set$1 || !clear) {
	  set$1 = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (classofRaw(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !engineIsIos) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = functionBindContext(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global_1.addEventListener &&
	    typeof postMessage == 'function' &&
	    !global_1.importScripts &&
	    !fails(post) &&
	    location.protocol !== 'file:'
	  ) {
	    defer = post;
	    global_1.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task = {
	  set: set$1,
	  clear: clear
	};

	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

	var macrotask = task.set;


	var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
	var process$1 = global_1.process;
	var Promise$1 = global_1.Promise;
	var IS_NODE = classofRaw(process$1) == 'process';
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global_1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (IS_NODE && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (IS_NODE) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  } else if (MutationObserver && !engineIsIos) {
	    toggle = true;
	    node = document.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    then = promise.then;
	    notify = function () {
	      then.call(promise, flush);
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
	      macrotask.call(global_1, flush);
	    };
	  }
	}

	var microtask = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify();
	  } last = task;
	};

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$1(resolve);
	  this.reject = aFunction$1(reject);
	};

	// 25.4.1.5 NewPromiseCapability(C)
	var f$5 = function (C) {
	  return new PromiseCapability(C);
	};

	var newPromiseCapability = {
		f: f$5
	};

	var promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors = function (a, b) {
	  var console = global_1.console;
	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var process$2 = global_1.process;
	var versions = process$2 && process$2.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (engineUserAgent) {
	  match = engineUserAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = engineUserAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var engineV8Version = version && +version;

	var task$1 = task.set;










	var SPECIES$3 = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState$2 = internalState.get;
	var setInternalState$2 = internalState.set;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var PromiseConstructor = nativePromiseConstructor;
	var TypeError$1 = global_1.TypeError;
	var document$2 = global_1.document;
	var process$3 = global_1.process;
	var $fetch = getBuiltIn('fetch');
	var newPromiseCapability$1 = newPromiseCapability.f;
	var newGenericPromiseCapability = newPromiseCapability$1;
	var IS_NODE$1 = classofRaw(process$3) == 'process';
	var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	var FORCED = isForced_1(PROMISE, function () {
	  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
	  if (!GLOBAL_CORE_JS_PROMISE) {
	    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	    // We can't detect it synchronously, so just check versions
	    if (engineV8Version === 66) return true;
	    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    if (!IS_NODE$1 && typeof PromiseRejectionEvent != 'function') return true;
	  }
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = PromiseConstructor.resolve(1);
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$3] = FakePromise;
	  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
	});

	var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify$1 = function (promise, state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  var chain = state.reactions;
	  microtask(function () {
	    var value = state.value;
	    var ok = state.state == FULFILLED;
	    var index = 0;
	    // variable length - can't use forEach
	    while (chain.length > index) {
	      var reaction = chain[index++];
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
	            state.rejection = HANDLED;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // can throw
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
	      } catch (error) {
	        if (domain && !exited) domain.exit();
	        reject(error);
	      }
	    }
	    state.reactions = [];
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(promise, state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$2.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global_1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (handler = global_1['on' + name]) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (IS_NODE$1) {
	          process$3.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    if (IS_NODE$1) {
	      process$3.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, promise, state, unwrap) {
	  return function (value) {
	    fn(promise, state, value, unwrap);
	  };
	};

	var internalReject = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify$1(promise, state, true);
	};

	var internalResolve = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          then.call(value,
	            bind(internalResolve, promise, wrapper, state),
	            bind(internalReject, promise, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(promise, wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify$1(promise, state, false);
	    }
	  } catch (error) {
	    internalReject(promise, { done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$1(executor);
	    Internal.call(this);
	    var state = getInternalState$2(this);
	    try {
	      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
	    } catch (error) {
	      internalReject(this, state, error);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    setInternalState$2(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: [],
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };
	  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = IS_NODE$1 ? process$3.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify$1(this, state, false);
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState$2(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, promise, state);
	    this.reject = bind(internalReject, promise, state);
	  };
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if ( typeof nativePromiseConstructor == 'function') {
	    nativeThen = nativePromiseConstructor.prototype.then;

	    // wrap native Promise#then for native async functions
	    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
	      var that = this;
	      return new PromiseConstructor(function (resolve, reject) {
	        nativeThen.call(that, resolve, reject);
	      }).then(onFulfilled, onRejected);
	    // https://github.com/zloirock/core-js/issues/640
	    }, { unsafe: true });

	    // wrap fetch result
	    if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
	      // eslint-disable-next-line no-unused-vars
	      fetch: function fetch(input /* , init */) {
	        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
	      }
	    });
	  }
	}

	_export({ global: true, wrap: true, forced: FORCED }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);

	PromiseWrapper = getBuiltIn(PROMISE);

	// statics
	_export({ target: PROMISE, stat: true, forced: FORCED }, {
	  // `Promise.reject` method
	  // https://tc39.github.io/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	_export({ target: PROMISE, stat: true, forced:  FORCED }, {
	  // `Promise.resolve` method
	  // https://tc39.github.io/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve( this, x);
	  }
	});

	_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
	  // `Promise.all` method
	  // https://tc39.github.io/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate_1(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        $promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  // `Promise.race` method
	  // https://tc39.github.io/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      iterate_1(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	// `Promise.allSettled` method
	// https://github.com/tc39/proposal-promise-allSettled
	_export({ target: 'Promise', stat: true }, {
	  allSettled: function allSettled(iterable) {
	    var C = this;
	    var capability = newPromiseCapability.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate_1(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = { status: 'fulfilled', value: value };
	          --remaining || resolve(values);
	        }, function (e) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = { status: 'rejected', reason: e };
	          --remaining || resolve(values);
	        });
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
	var NON_GENERIC = !!nativePromiseConstructor && fails(function () {
	  nativePromiseConstructor.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
	});

	// `Promise.prototype.finally` method
	// https://tc39.github.io/ecma262/#sec-promise.prototype.finally
	_export({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
	  'finally': function (onFinally) {
	    var C = speciesConstructor(this, getBuiltIn('Promise'));
	    var isFunction = typeof onFinally == 'function';
	    return this.then(
	      isFunction ? function (x) {
	        return promiseResolve(C, onFinally()).then(function () { return x; });
	      } : onFinally,
	      isFunction ? function (e) {
	        return promiseResolve(C, onFinally()).then(function () { throw e; });
	      } : onFinally
	    );
	  }
	});

	// patch native Promise.prototype for native async functions
	if ( typeof nativePromiseConstructor == 'function' && !nativePromiseConstructor.prototype['finally']) {
	  redefine(nativePromiseConstructor.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
	}

	var promise$1 = path.Promise;

	var setInternalState$3 = internalState.set;
	var getInternalAggregateErrorState = internalState.getterFor('AggregateError');

	var $AggregateError = function AggregateError(errors, message) {
	  var that = this;
	  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
	  if (objectSetPrototypeOf) {
	    that = objectSetPrototypeOf(new Error(message), objectGetPrototypeOf(that));
	  }
	  var errorsArray = [];
	  iterate_1(errors, errorsArray.push, errorsArray);
	  if (descriptors) setInternalState$3(that, { errors: errorsArray, type: 'AggregateError' });
	  else that.errors = errorsArray;
	  if (message !== undefined) createNonEnumerableProperty(that, 'message', String(message));
	  return that;
	};

	$AggregateError.prototype = objectCreate(Error.prototype, {
	  constructor: createPropertyDescriptor(5, $AggregateError),
	  message: createPropertyDescriptor(5, ''),
	  name: createPropertyDescriptor(5, 'AggregateError')
	});

	if (descriptors) objectDefineProperty.f($AggregateError.prototype, 'errors', {
	  get: function () {
	    return getInternalAggregateErrorState(this).errors;
	  },
	  configurable: true
	});

	_export({ global: true }, {
	  AggregateError: $AggregateError
	});

	// `Promise.try` method
	// https://github.com/tc39/proposal-promise-try
	_export({ target: 'Promise', stat: true }, {
	  'try': function (callbackfn) {
	    var promiseCapability = newPromiseCapability.f(this);
	    var result = perform(callbackfn);
	    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
	    return promiseCapability.promise;
	  }
	});

	var PROMISE_ANY_ERROR = 'No one promise resolved';

	// `Promise.any` method
	// https://github.com/tc39/proposal-promise-any
	_export({ target: 'Promise', stat: true }, {
	  any: function any(iterable) {
	    var C = this;
	    var capability = newPromiseCapability.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var promiseResolve = aFunction$1(C.resolve);
	      var errors = [];
	      var counter = 0;
	      var remaining = 1;
	      var alreadyResolved = false;
	      iterate_1(iterable, function (promise) {
	        var index = counter++;
	        var alreadyRejected = false;
	        errors.push(undefined);
	        remaining++;
	        promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyRejected || alreadyResolved) return;
	          alreadyResolved = true;
	          resolve(value);
	        }, function (e) {
	          if (alreadyRejected || alreadyResolved) return;
	          alreadyRejected = true;
	          errors[index] = e;
	          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
	        });
	      });
	      --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

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
	};
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
	 * @property {(String|Promise)}  globalExchangeRatesApi.endpoint - The global exchange rate API endpoint for new Dinero objects, or the global promise that resolves to the exchanges rates (see {@link module:Dinero~convert convert} for format).
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

	var Globals = {
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

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _toArray(arr) {
	  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

	  return arr2;
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

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
	  },

	  /**
	   * Returns the smallest Dinero object from an array of Dinero objects
	   *
	   * @memberof module:Dinero
	   * @method
	   *
	   * @param {Dinero[]} objects - An array of Dinero objects
	   *
	   * @example
	   * // returns the smallest Dinero object with amount of 500 from an array of Dinero objects with different precisions
	   * Dinero.minimum([
	   *   Dinero({ amount: 500, precision: 3 }),
	   *   Dinero({ amount: 100, precision: 2 })
	   * ])
	   * @example
	   * // returns the smallest Dinero object with amount of 50 from an array of Dinero objects
	   * Dinero.minimum([
	   *   Dinero({ amount: 50 }),
	   *   Dinero({ amount: 100 })
	   * ])
	   *
	   * @return {Dinero[]}
	   */
	  minimum: function minimum(objects) {
	    var _objects = _toArray(objects),
	        firstObject = _objects[0],
	        tailObjects = _objects.slice(1);

	    var currentMinimum = firstObject;
	    tailObjects.forEach(function (obj) {
	      currentMinimum = currentMinimum.lessThan(obj) ? currentMinimum : obj;
	    });
	    return currentMinimum;
	  },

	  /**
	   * Returns the biggest Dinero object from an array of Dinero objects
	   *
	   * @memberof module:Dinero
	   * @method
	   *
	   * @param {Dinero[]} objects - An array of Dinero objects
	   *
	   * @example
	   * // returns the biggest Dinero object with amount of 20, from an array of Dinero objects with different precisions
	   * Dinero.maximum([
	   *   Dinero({ amount: 20, precision: 2 }),
	   *   Dinero({ amount: 150, precision: 3 })
	   * ])
	   * @example
	   * // returns the biggest Dinero object with amount of 100, from an array of Dinero objects
	   * Dinero.maximum([
	   *   Dinero({ amount: 100 }),
	   *   Dinero({ amount: 50 })
	   * ])
	   *
	   * @return {Dinero[]}
	   */
	  maximum: function maximum(objects) {
	    var _objects2 = _toArray(objects),
	        firstObject = _objects2[0],
	        tailObjects = _objects2.slice(1);

	    var currentMaximum = firstObject;
	    tailObjects.forEach(function (obj) {
	      currentMaximum = currentMaximum.greaterThan(obj) ? currentMaximum : obj;
	    });
	    return currentMaximum;
	  }
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
	    return ratio >= 0;
	  }) && ratios.some(function (ratio) {
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
	  var stringRepresentation = number.toString();

	  if (stringRepresentation.indexOf('e-') > 0) {
	    // It's too small for a normal string representation, e.g. 1e-7 instead of 0.00000001
	    return parseInt(stringRepresentation.split('e-')[1]);
	  } else {
	    var fractionDigits = stringRepresentation.split('.')[1];
	    return fractionDigits ? fractionDigits.length : 0;
	  }
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
	  }

	  return xhr;
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
	/**
	 * Returns whether a value is thenable.
	 * @ignore
	 *
	 * @param {} value - The value to test.
	 *
	 * @return {Boolean}
	 */

	function isThenable$1(value) {
	  return Boolean(value) && (_typeof(value) === 'object' || typeof value === 'function') && typeof value.then === 'function';
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
	    },
	    DOWN: function DOWN(number) {
	      return Math.floor(number);
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
	    var tags = arguments.length > 1 ? arguments[1] : undefined;

	    for (var tag in tags) {
	      string = string.replace("{{".concat(tag, "}}"), tags[tag]);
	    }

	    return string;
	  };
	  /* istanbul ignore next */


	  var getRatesFromRestApi = function getRatesFromRestApi(from, to) {
	    return getJSON(mergeTags(options.endpoint, {
	      from: from,
	      to: to
	    }), {
	      headers: options.headers
	    });
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
	      return (isThenable$1(options.endpoint) ? options.endpoint : getRatesFromRestApi(from, to)).then(function (data) {
	        return flattenObject(data)[mergeTags(options.propertyPath, {
	          from: from,
	          to: to
	        })];
	      });
	    }
	  };
	}

	/**
	 * Performs an assertion.
	 * @ignore
	 *
	 * @param  {Boolean} condition - The expression to assert.
	 * @param  {String}  errorMessage - The message to throw if the assertion fails
	 * @param  {ErrorConstructor}   [ErrorType=Error] - The error to throw if the assertion fails.
	 *
	 * @throws {Error} If `condition` returns `false`.
	 */

	function assert(condition, errorMessage) {
	  var ErrorType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Error;
	  if (!condition) throw new ErrorType(errorMessage);
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
	  assert(isPercentage(percentage), 'You must provide a numeric value between 0 and 100.', RangeError);
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
	  assert(areValidRatios(ratios), 'You must provide a non-empty array of numeric values greater than 0.', TypeError);
	}
	/**
	 * Asserts a value is an integer.
	 * @ignore
	 *
	 * @param  {}  number - The value to test.
	 *
	 * @throws {TypeError}
	 */

	function assertInteger(number) {
	  assert(Number.isInteger(number), 'You must provide an integer.', TypeError);
	}

	var calculator$1 = Calculator();
	/**
	 * A Dinero object is an immutable data structure representing a specific monetary value.
	 * It comes with methods for creating, parsing, manipulating, testing, transforming and formatting them.
	 *
	 * A Dinero object has:
	 *
	 * * An `amount`, expressed in minor currency units, as an integer.
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
	 * * **Conversion & formatting:** {@link module:Dinero~toFormat toFormat}, {@link module:Dinero~toUnit toUnit}, {@link module:Dinero~toRoundedUnit toRoundedUnit}, {@link module:Dinero~toObject toObject}, {@link module:Dinero~toJSON toJSON}, {@link module:Dinero~convertPrecision convertPrecision} and {@link module:Dinero.normalizePrecision normalizePrecision}.
	 *
	 * Dinero.js uses `number`s under the hood, so it's constrained by the [double-precision floating-point format](https://en.wikipedia.org/wiki/Double-precision_floating-point_format). Using values over [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/MAX_SAFE_INTEGER) or below [`Number.MIN_SAFE_INTEGER`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/MIN_SAFE_INTEGER) will yield unpredictable results.
	 * Same goes with performing calculations: once the internal `amount` value exceeds those limits, precision is no longer guaranteed.
	 *
	 * @module Dinero
	 * @param  {Number} [options.amount=0] - The amount in minor currency units (as an integer).
	 * @param  {String} [options.currency='USD'] - An ISO 4217 currency code.
	 * @param  {String} [options.precision=2] - The number of decimal places to represent.
	 *
	 * @throws {TypeError} If `amount` or `precision` is invalid. Integers over [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/MAX_SAFE_INTEGER) or below [`Number.MIN_SAFE_INTEGER`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/MIN_SAFE_INTEGER) are considered valid, even though they can lead to imprecise amounts.
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
	    var obj = Object.assign({}, Object.assign({}, {
	      amount: amount,
	      currency: currency,
	      precision: precision
	    }, options), Object.assign({}, {
	      locale: this.locale
	    }, options));
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
	    assert(this.hasSameCurrency(comparator), 'You must provide a Dinero instance with the same currency.', TypeError);
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
	      return create.call(this, {
	        locale: newLocale
	      });
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
	     * By default, fractional minor currency units are rounded using the **half to even** rule ([banker's rounding](http://wiki.c2.com/?BankersRounding)).
	     * This can be necessary when you need to convert objects to a smaller precision.
	     *
	     * Rounding *can* lead to accuracy issues as you chain many times. Consider a minimal amount of subsequent conversions for safer results.
	     * You can also specify a different `roundingMode` to better fit your needs.
	     *
	     * @param {Number} newPrecision - The new precision.
	     * @param {String} [roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
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
	      var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalFormatRoundingMode;
	      assertInteger(newPrecision);
	      var precision = this.getPrecision();
	      var isNewPrecisionLarger = newPrecision > precision;
	      var operation = isNewPrecisionLarger ? calculator$1.multiply : calculator$1.divide;
	      var terms = isNewPrecisionLarger ? [newPrecision, precision] : [precision, newPrecision];
	      var factor = Math.pow(10, calculator$1.subtract.apply(calculator$1, terms));
	      return create.call(this, {
	        amount: calculator$1.round(operation(this.getAmount(), factor), roundingMode),
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
	     * @param  {String} [roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
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
	     * @param  {String} [roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
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
	     * @param  {String} [roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
	     *
	     * @example
	     * // returns a Dinero object with amount 5000
	     * Dinero({ amount: 10000 }).percentage(50)
	     * @example
	     * // returns a Dinero object with amount 29
	     * Dinero({ amount: 57 }).percentage(50, "HALF_ODD")
	     *
	     * @throws {RangeError} If `percentage` is out of range.
	     *
	     * @return {Dinero}
	     */
	    percentage: function percentage(_percentage) {
	      var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalRoundingMode;
	      assertPercentage(_percentage);
	      return this.multiply(calculator$1.divide(_percentage, 100), roundingMode);
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
	     * Since v1.8.0, you can use zero ratios (such as [0, 50, 50]). If there's a remainder to distribute, zero ratios are skipped and return a Dinero object with amount zero.
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
	     * @example
	     * // since version 1.8.0
	     * // returns an array of three Dinero objects
	     * // the first one with an amount of 0
	     * // the second one with an amount of 502
	     * // the third one with an amount of 501
	     * Dinero({ amount: 1003 }).allocate([0, 50, 50])
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
	        return create.call(_this, {
	          amount: share
	        });
	      });
	      var i = 0;

	      while (remainder > 0) {
	        if (ratios[i] > 0) {
	          shares[i] = shares[i].add(create.call(this, {
	            amount: 1
	          }));
	          remainder = calculator$1.subtract(remainder, 1);
	        }

	        i += 1;
	      }

	      return shares;
	    },

	    /**
	     * Returns a Promise containing a new Dinero object converted to another currency.
	     *
	     * You have two options to provide the exchange rates:
	     *
	     * 1. **Use an exchange rate REST API, and let Dinero handle the fetching and conversion.**
	     *   This is a simple option if you have access to an exchange rate REST API and want Dinero to do the rest.
	     * 2. **Fetch the exchange rates on your own and provide them directly.**
	     *   This is useful if you're fetching your rates from somewhere else (a file, a database), use a different protocol or query language than REST (SOAP, GraphQL) or want to fetch rates once and cache them instead of making new requests every time.
	     *
	     * **If you want to use a REST API**, you must provide a third-party endpoint yourself. Dinero doesn't come bundled with an exchange rates endpoint.
	     *
	     * Here are some exchange rate APIs you can use:
	     *
	     * * [Fixer](https://fixer.io)
	     * * [Open Exchange Rates](https://openexchangerates.org)
	     * * [Coinbase](https://api.coinbase.com/v2/exchange-rates)
	     * * More [foreign](https://github.com/toddmotto/public-apis#currency-exchange) and [crypto](https://github.com/toddmotto/public-apis#cryptocurrency) exchange rate APIs.
	     *
	     * **If you want to fetch your own rates and provide them directly**, you need to pass a promise that resolves to the exchanges rates.
	     *
	     * In both cases, you need to specify at least:
	     *
	     * * a **destination currency**: the currency in which you want to convert your Dinero object. You can specify it with `currency`.
	     * * an **endpoint**: the API URL to query exchange rates, with parameters, or a promise that resolves to the exchange rates. You can specify it with `options.endpoint`.
	     * * a **property path**: the path to access the wanted rate in your API's JSON response (or the custom promise's payload). For example, with a response of:
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
	     * The base currency (the one of your Dinero object) and the destination currency can be used as "merge tags" with the mustache syntax, respectively `{{from}}` and `{{to}}`.
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
	     * @param  {(String|Promise)} options.endpoint - The API endpoint to retrieve exchange rates. You can substitute this with a promise that resolves to the exchanges rates if you already have them.
	     * @param  {String} [options.propertyPath='rates.{{to}}'] - The property path to the rate.
	     * @param  {Object} [options.headers] - The HTTP headers to provide, if needed.
	     * @param  {String} [options.roundingMode='HALF_EVEN'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
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
	     * // usage with exchange rates provided as a custom promise
	     * // using the default `propertyPath` format (so it doesn't have to be specified)
	     * const rates = {
	     *   rates: {
	     *     EUR: 0.81162
	     *   }
	     * }
	     *
	     * Dinero({ amount: 500 })
	     *   .convert('EUR', {
	     *     endpoint: new Promise(resolve => resolve(rates))
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
	    convert: function convert(currency) {
	      var _this2 = this;

	      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	          _ref$endpoint = _ref.endpoint,
	          endpoint = _ref$endpoint === void 0 ? globalExchangeRatesApi.endpoint : _ref$endpoint,
	          _ref$propertyPath = _ref.propertyPath,
	          propertyPath = _ref$propertyPath === void 0 ? globalExchangeRatesApi.propertyPath || 'rates.{{to}}' : _ref$propertyPath,
	          _ref$headers = _ref.headers,
	          headers = _ref$headers === void 0 ? globalExchangeRatesApi.headers : _ref$headers,
	          _ref$roundingMode = _ref.roundingMode,
	          roundingMode = _ref$roundingMode === void 0 ? globalRoundingMode : _ref$roundingMode;

	      var options = Object.assign({}, {
	        endpoint: endpoint,
	        propertyPath: propertyPath,
	        headers: headers,
	        roundingMode: roundingMode
	      });
	      return CurrencyConverter(options).getExchangeRate(this.getCurrency(), currency).then(function (rate) {
	        assert(!isUndefined(rate), "No rate was found for the destination currency \"".concat(currency, "\"."), TypeError);
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
	     * {@link module:Dinero~toFormat toFormat} wraps around `Number.prototype.toLocaleString`. For that reason, **format will vary depending on how it's implemented in the end user's environment**.
	     *
	     * You can also use `toLocaleString` directly:
	     * `Dinero().toRoundedUnit(digits, roundingMode).toLocaleString(locale, options)`.
	     *
	     * By default, amounts are rounded using the **half away from zero** rule ([commercial rounding](https://en.wikipedia.org/wiki/Rounding#Round_half_away_from_zero)).
	     * You can also specify a different `roundingMode` to better fit your needs.
	     *
	     * @param  {String} [format='$0,0.00'] - The format mask to format to.
	     * @param  {String} [roundingMode='HALF_AWAY_FROM_ZERO'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
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
	     * @param  {String} [roundingMode='HALF_AWAY_FROM_ZERO'] - The rounding mode to use: `'HALF_ODD'`, `'HALF_EVEN'`, `'HALF_UP'`, `'HALF_DOWN'`, `'HALF_TOWARDS_ZERO'`, `'HALF_AWAY_FROM_ZERO'` or `'DOWN'`.
	     *
	     * @return {Number}
	     */
	    toRoundedUnit: function toRoundedUnit(digits) {
	      var roundingMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : globalFormatRoundingMode;
	      var factor = Math.pow(10, digits);
	      return calculator$1.divide(calculator$1.round(calculator$1.multiply(this.toUnit(), factor), roundingMode), factor);
	    },

	    /**
	     * Returns the object's data as an object literal.
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
	    },

	    /**
	     * Returns the object's data as an object literal.
	     *
	     * Alias of {@link module:Dinero~toObject toObject}.
	     * It is defined so that calling `JSON.stringify` on a Dinero object will automatically extract the relevant data.
	     *
	     * @example
	     * // returns '{"amount":500,"currency":"EUR","precision":2}'
	     * JSON.stringify(Dinero({ amount: 500, currency: 'EUR', precision: 2 }))
	     *
	     * @return {Object}
	     */
	    toJSON: function toJSON() {
	      return this.toObject();
	    }
	  };
	};

	var Dinero$1 = Object.assign(Dinero, Defaults, Globals, Static);

	return Dinero$1;

})));
