(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Mootable = {}));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$1 =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();

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

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var document$1 = global$1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
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

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	var f$4 = descriptors ? $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$4
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global$1, key, value);
	  } catch (error) {
	    global$1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store$1 = global$1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store$1;

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.10.1',
	  mode: 'global',
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});
	});

	var hasOwnProperty = {}.hasOwnProperty;

	var has$1 = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var engineIsNode = classofRaw(global$1.process) == 'process';

	var path = global$1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global$1[namespace])
	    : path[namespace] && path[namespace][method] || global$1[namespace] && global$1[namespace][method];
	};

	var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process = global$1.process;
	var versions = process && process.versions;
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

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // eslint-disable-next-line es/no-symbol -- required for testing
	  return !Symbol.sham &&
	    // Chrome 38 Symbol has incorrect toString conversion
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    (engineIsNode ? engineV8Version === 38 : engineV8Version > 37 && engineV8Version < 41);
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var useSymbolAsUid = nativeSymbol
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global$1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has$1(WellKnownSymbolsStore, name) || !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')) {
	    if (nativeSymbol && has$1(Symbol$1, name)) {
	      WellKnownSymbolsStore[name] = Symbol$1[name];
	    } else {
	      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	    }
	  } return WellKnownSymbolsStore[name];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.es/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min$1 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min$1(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var hiddenKeys$1 = {};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has$1(hiddenKeys$1, key) && has$1(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has$1(O, key = names[i++])) {
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

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
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

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey('IE_PROTO');

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
	    /* global ActiveXObject -- old IE */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys$1[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
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

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap$1 = global$1.WeakMap;

	var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

	var WeakMap = global$1.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
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
	  var store = sharedStore.state || (sharedStore.state = new WeakMap());
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set = function (it, metadata) {
	    metadata.facade = it;
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys$1[STATE] = true;
	  set = function (it, metadata) {
	    metadata.facade = it;
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has$1(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return has$1(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	var f$3 = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$1(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f$3
	};

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	var f$2 = descriptors ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return $getOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has$1(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$2
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var state;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has$1(value, 'name')) {
	      createNonEnumerableProperty(value, 'name', key);
	    }
	    state = enforceInternalState(value);
	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
	    }
	  }
	  if (O === global$1) {
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

	var hiddenKeys = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	var f$1 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys);
	};

	var objectGetOwnPropertyNames = {
		f: f$1
	};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	var f = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f
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
	    if (!has$1(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
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

	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;






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
	    target = global$1;
	  } else if (STATIC) {
	    target = global$1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global$1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor(target, key);
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

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has$1(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	var returnThis$1 = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if (!has$1(IteratorPrototype$2, ITERATOR$2)) {
	  createNonEnumerableProperty(IteratorPrototype$2, ITERATOR$2, returnThis$1);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var defineProperty = objectDefineProperty.f;



	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has$1(it = STATIC ? it : it.prototype, TO_STRING_TAG$1)) {
	    defineProperty(it, TO_STRING_TAG$1, { configurable: true, value: TAG });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	/* eslint-disable no-proto -- safe */

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
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

	var IteratorPrototype = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
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
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis);
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
	  if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
	  }

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.es/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.es/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.es/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.es/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
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

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var ITERATOR = wellKnownSymbol('iterator');
	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global$1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG]) {
	      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
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

	/**
	 * Utils - Utility functions
	 * @namespace Mootable.Utils
	 * @author Jack Moxley <https://github.com/jackmoxley>
	 * @version 0.15.0
	 * Homepage: https://github.com/mootable/hashmap
	 */

	/**
	 * Is the passed value not null and a function
	 * @param func
	 * @returns {boolean}
	 */
	function isFunction(func) {
	  return !!(func && func.constructor && func.call && func.apply);
	}
	/**
	 * Is the passed object iterable
	 * @param iterable
	 * @return {boolean}
	 */

	function isIterable(iterable) {
	  return !!(iterable && isFunction(iterable[Symbol.iterator]));
	}
	/**
	 * Is the passed value not null and a string
	 * @param str
	 * @returns {boolean}
	 */

	function isString(str) {
	  // jshint ignore:line
	  return !!(str && (typeof str === 'string' || str instanceof String));
	}
	/**
	 * sameValueZero is the equality method used by Map, Array, Set etc.
	 * The only difference between === and sameValueZero is that NaN counts as equal on sameValueZero
	 * @see {@link https://262.ecma-international.org/6.0/#sec-samevaluezero saveValueZero}
	 * @param x - the first object to compare
	 * @param y - the second object to compare
	 * @returns {boolean} - if they are equals according to {@link https://262.ecma-international.org/6.0/#sec-samevaluezero ECMA Spec for Same Value Zero}
	 */

	function sameValueZero(x, y) {
	  return x === y || Number.isNaN(x) && Number.isNaN(y);
	}
	/**
	 * The strict Equals method <code>===</code>.
	 * Simply does a strict equality comparison <code>===</code> against 2 values
	 * @see {@link https://262.ecma-international.org/6.0/#sec-strict-equality-comparison strictEquals}
	 * @param x - the first object to compare
	 * @param y - the second object to compare
	 * @returns {boolean} - if they are equals according to {@link https://262.ecma-international.org/6.0/#sec-strict-equality-comparison ECMA Spec for Strict Equality}
	 */

	function strictEquals(x, y) {
	  return x === y;
	}

	/**
	 * Option - a class to get round nullable fields.
	 * @namespace Mootable.Option
	 * @author Jack Moxley <https://github.com/jackmoxley>
	 * @version 0.15.0
	 * Homepage: https://github.com/mootable/hashmap
	 */

	/**
	 * A representation of a value, that might be or might not be null.
	 * - Options are immutable, once set, it can't be changed.
	 * - Options are iterable
	 *   - If using a for loop.
	 *     - If it has a value the loop will execute just once.
	 *     - If it doesn't have a value the loop will not execute
	 * @example <caption>iterating over some</caption>
	 * const opt = Option.some("hello");
	 * for (value of opt) {
	 *    // loops once.
	 *    console.log(opt);
	 * }
	 * console.log("world");
	 * // logs - hello\nworld
	 * @example <caption>iterating over none</caption>
	 * const opt = Option.none;
	 * for (value of opt) {
	 *   // does not loop.
	 *    console.log(opt);
	 * }
	 * console.log("world");
	 * // logs - world
	 */
	class Option {
	  /**
	   * Usage of this constructor should generally be avoided,
	   * - instead use the some or none method on Option,
	   * - or the some or none exported functions provided with this javascript file.
	   * This constructor makes the Option immutable and inextensible.
	   * @see none
	   * @see some
	   * @param has - whether it contains a value or not.
	   * @param value - the value to set
	   */
	  constructor(has, value) {
	    this.has = has;
	    this.value = value;
	    Object.freeze(this);
	  }
	  /**
	   * A constant representation of an Option with nothing in it:
	   * <code>{value:undefined,has:false}</code>
	   * @example <caption>create an option using none</caption>
	   * const option = Option.none;
	   * // option.has === false
	   * // option.value === undefined
	   * // option.size === 0
	   * @type {Option}
	   */


	  static get none() {
	    return none;
	  }
	  /**
	   * Return the size of this option.
	   *  - 1 if it has a value
	   *  - 0 if it doesn't
	   * @return {number}
	   */


	  get size() {
	    return this.has ? 1 : 0;
	  }
	  /**
	   * When called with a value returns an Option object of the form:
	   * <code>{value:value,has:true}</code>
	   * Even if a value is not provided it still counts as existing, this is different from other libraries,
	   * we are effectively saying, null and undefined count as valid values.
	   * @example <caption>create an option using some</caption>
	   * const myValue = 'hello';
	   * const option = Option.some(myValue);
	   * // option.has === true
	   * // option.value === 'hello'
	   * // option.size === 1
	   * @param value - the value
	   * @return {Option} - the option in the form <code>{value:value,has:true}</code>
	   */


	  static some(value) {
	    return some(value);
	  }
	  /**
	   * Provides an iterable for the Option
	   * If using a for loop.
	   * - If it has a value the loop will execute just once.
	   * - If it doesn't have a value the loop will not execute
	   * @example <caption>iterating over some</caption>
	   * const opt = Option.some("hello");
	   * for (value of opt) {
	   *    // loops once.
	   *    console.log(opt);
	   * }
	   * console.log("world");
	   * // logs - hello\nworld
	   * @example <caption>iterating over none</caption>
	   * const opt = Option.none;
	   * for (value of opt) {
	   *   // does not loop.
	   *    console.log(opt);
	   * }
	   * console.log("world");
	   * // logs - world
	   * @return {Generator<*, void, *>}
	   */


	  *[Symbol.iterator]() {
	    if (this.has) {
	      yield this.value;
	    }
	  }

	}
	/**
	 * A function that when called with a value returns an Option object of the form:
	 * <code>{value:value,has:true}</code>
	 * Even if a value is not provided it still counts as existing, this is different from other libraries,
	 * we are effectively saying as null and undefined count as valid values.
	 * @example  <caption>create an option using some</caption>
	 * const myValue = 'hello';
	 * const option = some(myValue);
	 * // option.has === true
	 * // option.value === 'hello'
	 * // option.size === 1
	 * @type {function(*=): Option}
	 */

	const some = value => new Option(true, value);
	/**
	 * A constant representation of an Option with nothing in it:
	 * <code>{value:undefined,has:false}</code>
	 * @example <caption>create an option using none</caption>
	 * const option = none;
	 * // option.has === false
	 * // option.value === undefined
	 * // option.size === 0
	 * @type {Option}
	 */

	const none = new Option(false, undefined);

	/**
	 * Hash - Hash functions
	 * @namespace Mootable.Hash
	 * @author Jack Moxley <https://github.com/jackmoxley>
	 * @version 0.15.0
	 * Homepage: https://github.com/mootable/hashmap
	 */

	/**
	 * Modified Murmur3 hash generator, with capped lengths.
	 * This is NOT a cryptographic hash, this hash is designed to create as even a spread across a 32bit integer as is possible.
	 * @see {@link https://github.com/aappleby/smhasher|MurmurHash specification on Github}
	 * @see {@link https://en.wikipedia.org/wiki/MurmurHash|MurmurHash on Wikipedia}
	 * @param key the string being hashed
	 * @param len the max limit on the number of characters to hash
	 * @param seed an optional random seed, or previous hash value to continue hashing against.
	 * @returns {number} the hash
	 */

	function hash(key, len = 0, seed = 0) {
	  len = len > 0 ? Math.min(len, key.length) : key.length;
	  seed |= 0;
	  const remaining = len & 1;
	  const doubleBytes = len - remaining;
	  let hash = seed,
	      k = 0,
	      i = 0;

	  while (i < doubleBytes) {
	    k = key.charCodeAt(i++) & 0xffff | (key.charCodeAt(i++) & 0xffff) << 16;
	    k *= 0xcc9e2d51;
	    k = k << 15 | k >>> 17;
	    k *= 0x1b873593;
	    hash ^= k;
	    hash = hash << 13 | hash >>> 19;
	    hash *= 5;
	    hash += 0xe6546b64;
	  }

	  if (remaining) {
	    k ^= key.charCodeAt(i) & 0xffff;
	    k *= 0xcc9e2d51;
	    k = k << 15 | k >>> 17;
	    k *= 0x1b873593;
	    hash ^= k;
	  }

	  hash ^= len;
	  hash ^= hash >>> 16;
	  hash *= 0x85ebca6b;
	  hash ^= hash >>> 13;
	  hash *= 0xc2b2ae35;
	  hash ^= hash >>> 16;
	  return hash | 0;
	}
	/**
	 * Given any object return back a hashcode
	 * - If the key is undefined, null, false, NaN, infinite etc then it will be assigned a hash of 0.
	 * - If it is a primitive such as string, number bigint it either take the numeric value, or the string value, and hash that.
	 * - if it is a function, symbol or regex it hashes their string values.
	 * - if it is a date, it uses the time value as the hash.
	 * Otherwise
	 * - If it has a hashCode function it will execute it, passing the key as the first and only argument. It will call this function again on its result.
	 * - If it has a hashCode attribute it will call this function on it.
	 * - If it can't do any of the above, it will assign a randomly generated hashcode, to the key using a hidden property.
	 *
	 * As with all hashmaps, there is a contractual equivalence between hashcode and equals methods,
	 * in that any object that equals another, should produce the same hashcode.
	 *
	 * @param {*} key - the key to get the hash code from
	 * @return {number} - the hash code.
	 */

	function hashCodeFor(key) {
	  const keyType = typeof key;

	  switch (keyType) {
	    case 'undefined':
	      return 0;

	    case 'boolean':
	      return key ? 1 : 0;

	    case 'string':
	      return hash(key);

	    case 'number':
	      if (!Number.isFinite(key)) {
	        return 0;
	      }

	      if (Number.isSafeInteger(key)) {
	        return key | 0;
	      }

	      return hash(key.toString());

	    case 'bigint':
	    case 'symbol':
	    case 'function':
	      return hash(key.toString());

	    case 'object':
	    default:
	      {
	        if (key === null) {
	          return 0;
	        }

	        if (key.hashCode) {
	          if (isFunction(key.hashCode)) {
	            return hashCodeFor(key.hashCode(key));
	          }

	          return hashCodeFor(key.hashCode);
	        } // Regexes and Dates we treat like primitives.


	        if (key instanceof Date) {
	          return key.getTime();
	        }

	        if (key instanceof RegExp) {
	          return hash(key.toString());
	        } // Options we work on the values.


	        if (key instanceof Option) {
	          if (key.has) {
	            return 31 * hashCodeFor(key.value);
	          }

	          return 0;
	        } // Hash of Last Resort, ensure we don't consider any objects on the prototype chain.


	        if (key.hasOwnProperty('_mootable_hashCode')) {
	          // its our special number, but just in case someone has done something a bit weird with it.
	          // Object equality at this point means that only this key instance can be used to fetch the value.
	          return hashCodeFor(key._mootable_hashCode);
	        }

	        const hashCode = HASH_COUNTER++; // unenumerable, unwritable, unconfigurable

	        Object.defineProperty(key, '_mootable_hashCode', {
	          value: hashCode
	        });
	        return hashCode;
	      }
	  }
	}
	/**
	 * an internal counter for managing unhashable objects.
	 * @private
	 * @ignore
	 * @type {number}
	 */

	let HASH_COUNTER = 0;
	/**
	 * Given a key, produce an equals method that fits the hashcode contract.
	 * - In almost all cases it will return with ECMASpec sameValueZero method. As is the case with native map, set and array.
	 * - If it is a regex, it compares the type, and the string values.
	 * - If it is a date, it compares the type, and the time values.
	 * - If it is an option, it compares if they both have values, and then the values.
	 * - If it has an equals function and that equals function when comapring 2 keys, return true. then it will use that.
	 *   - The function can either be in the form <code>key.equals(other)</code>, or <code>key.equals(other,key)</code> in the case of static-like functions.
	 *
	 * The expectation and requirement is this key will always be the first argument to the method, the behaviour maybe unexpected if parameters are reversed.
	 *
	 * As with all hashmaps, there is a contractual equivalence between hashcode and equals methods,
	 * in that any object that equals another, should produce the same hashcode.
	 *
	 * @param {*} key - the key to get the hash code from
	 * @return {(function(*, *): boolean)} - an equals function for 2 keys.
	 */

	function equalsFor(key) {
	  // Regexes and Dates we treat like primitives.
	  switch (typeof key) {
	    case 'object':
	      if (key) {
	        if (key instanceof RegExp) {
	          return (me, them) => {
	            if (them instanceof RegExp) {
	              return me.toString() === them.toString();
	            }

	            return false;
	          };
	        } else if (key instanceof Date) {
	          return (me, them) => {
	            if (them instanceof Date) {
	              return me.getTime() === them.getTime();
	            }

	            return false;
	          };
	        } else if (key instanceof Option) {
	          if (key.has) {
	            const valueEquals = equalsFor(key.value);
	            return (me, them) => {
	              if (them.has) {
	                return valueEquals(me.value, them.value);
	              }

	              return false;
	            };
	          } else {
	            return (me, them) => !them.has;
	          }
	        } else if (isFunction(key.equals)) {
	          return (me, them) => me.equals(them, me);
	        }
	      }

	      return strictEquals;

	    case 'number':
	    case 'bigint':
	      return sameValueZero;

	    default:
	      return strictEquals;
	  }
	}
	/**
	 * Given any object return back a hashcode
	 * - If the key is undefined, null, false, NaN, infinite etc then it will be assigned a hash of 0.
	 * - If it is a primitive such as string, number bigint it either take the numeric value, or the string value, and hash that.
	 * - if it is a function, symbol or regex it hashes their string values.
	 * - if it is a date, it uses the time value as the hash.
	 * Otherwise
	 * - If it has a hashCode function it will execute it, passing the key as the first and only argument. It will call this function again on its result.
	 * - If it has a hashCode attribute it will call this function on it.
	 * - If it can't do any of the above, it will assign a randomly generated hashcode, to the key using a hidden property.
	 *
	 * As with all hashmaps, there is a contractual equivalence between hashcode and equals methods,
	 * in that any object that equals another, should produce the same hashcode.
	 *
	 * @param {*} key - the key to get the hash code from
	 * @return {{hash: number, equals: function}} - the hash code and equals function.
	 */

	function equalsAndHash(key, toSetOn = {}) {
	  if (toSetOn.hash) {
	    if (toSetOn.equals) {
	      return toSetOn;
	    }

	    toSetOn.equals = equalsFor(key);
	    return toSetOn;
	  } else if (toSetOn.equals) {
	    toSetOn.hash = hashCodeFor(key);
	    return toSetOn;
	  }

	  const keyType = typeof key;

	  switch (keyType) {
	    case 'undefined':
	      toSetOn.hash = 0;
	      toSetOn.equals = strictEquals;
	      return toSetOn;

	    case 'boolean':
	      toSetOn.hash = key ? 1 : 0;
	      toSetOn.equals = strictEquals;
	      return toSetOn;

	    case 'string':
	      toSetOn.hash = hash(key);
	      toSetOn.equals = strictEquals;
	      return toSetOn;

	    case 'number':
	      if (!Number.isFinite(key)) {
	        toSetOn.hash = 0;
	        toSetOn.equals = sameValueZero;
	        return toSetOn;
	      }

	      if (Number.isSafeInteger(key)) {
	        toSetOn.hash = key | 0;
	        toSetOn.equals = sameValueZero;
	        return toSetOn;
	      }

	      toSetOn.hash = hash(key.toString());
	      toSetOn.equals = sameValueZero;
	      return toSetOn;

	    case 'bigint':
	      toSetOn.hash = hash(key.toString());
	      toSetOn.equals = sameValueZero;
	      return toSetOn;

	    case 'symbol':
	    case 'function':
	      toSetOn.hash = hash(key.toString());
	      toSetOn.equals = strictEquals;
	      return toSetOn;

	    case 'object':
	    default:
	      {
	        if (key === null) {
	          toSetOn.hash = 0;
	          toSetOn.equals = strictEquals;
	          return toSetOn;
	        }

	        toSetOn.equals = equalsFor(key);

	        if (key.hashCode) {
	          if (isFunction(key.hashCode)) {
	            toSetOn.hash = hashCodeFor(key.hashCode(key));
	            return toSetOn;
	          } else {
	            toSetOn.hash = hashCodeFor(key.hashCode);
	            return toSetOn;
	          }
	        } // Regexes and Dates we treat like primitives.


	        if (key instanceof Date) {
	          toSetOn.hash = key.getTime();
	          return toSetOn;
	        }

	        if (key instanceof RegExp) {
	          toSetOn.hash = hash(key.toString());
	          return toSetOn;
	        } // Options we work on the values.


	        if (key instanceof Option) {
	          if (key.has) {
	            toSetOn.hash = 31 * hashCodeFor(key.value);
	            return toSetOn;
	          }

	          toSetOn.hash = 0;
	          return toSetOn;
	        } // Hash of Last Resort, ensure we don't consider any objects on the prototype chain.


	        if (key.hasOwnProperty('_mootable_hashCode')) {
	          // its our special number, but just in case someone has done something a bit weird with it.
	          // Object equality at this point means that only this key instance can be used to fetch the value.
	          toSetOn.hash = hashCodeFor(key._mootable_hashCode);
	          return toSetOn;
	        }

	        const hashCode = HASH_COUNTER++; // unenumerable, unwritable, unconfigurable

	        Object.defineProperty(key, '_mootable_hashCode', {
	          value: hashCode
	        });
	        toSetOn.hash = hashCode;
	        return toSetOn;
	      }
	  }
	}

	/**
	 * HashMap - HashMap Implementation for JavaScript
	 * @namespace Mootable
	 * @author Jack Moxley <https://github.com/jackmoxley>
	 * @version 0.15.0
	 * Homepage: https://github.com/mootable/hashmap
	 */

	/**
	 * The base class for the Map Implementations, and the Higher Order Functions for Maps
	 * @example <caption>Create a MapIterable from a Map.</caption>
	 * const myMap = new Map();
	 * const mapIterable = MapIterable.from(myMap);
	 * @example <caption>Create a MapIterable from a Set.</caption>
	 * const mySet = new Set();
	 * // sets wrapped in a map iterable must have a value of an Array matching [key,value]
	 * mySet.add(["key", "value"]);
	 * const mapIterable = MapIterable.from(mySet);
	 * @example <caption>Create a MapIterable from an Array.</caption>
	 * // arrays wrapped in a map iterable must have be an array of arrays matching [key,value]
	 * const myArray = [["key", "value"]];
	 * const mapIterable = MapIterable.from(myArray);
	 * @example <caption>Create a MapIterable from an Iterable.</caption>
	 * // iterables wrapped in a map iterable must yield arrays matching [key,value],
	 * // any object that implements *[Symbol.iterator]() or [Symbol.iterator]()
	 * // can be used as long as they follow that contract.
	 * const myIterable = {
	 *     *[Symbol.iterator]() {
	 *         yield ["key1", "value1"];
	 *         yield ["key2", "value2"];
	 *         yield ["key3", "value3"];
	 *     }
	 * }
	 * const mapIterable = MapIterable.from(myIterable);
	 * @example <caption>Create a MapIterable from a Mootable HashMap.</caption>
	 * // all Mootable HashMaps extend MapIterable, no need to wrap with the MapIterable.from() function.
	 * const mapIterable = new HashMap();
	 * @example <caption>Create a MapIterable from a Mootable LinkedHashMap.</caption>
	 * // all Mootable LinkedHashMaps extend MapIterable, no need to wrap with the MapIterable.from() function.
	 * const mapIterable = new LinkedHashMap();
	 * @abstract
	 */

	class MapIterable {
	  /**
	   * Returns the number of elements returned by this Map Iterable. If filter is used in the method chain, it is forced to iterate over all the elements, and will be slower. Otherwise even with concatenation, it just queries the base collection size.
	   * @example <caption>Return the size of this mapIterable.</caption>
	   * const myMap = new Map();
	   * // sets 2 values, and replaces 1 of them
	   * myMap.set("key1","val1").set("key2","val2").set("key2","val2a");
	   * const mapIterable = MapIterable.from(myMap);
	   * // returns 2
	   * const theSize = mapIterable.size;
	   * @returns {number} the total number of elements in this MapIterable
	   */
	  get size() {
	    let accumulator = 0;

	    for (const i of this) // jshint ignore:line
	    {
	      accumulator++;
	    }

	    return accumulator;
	  }
	  /**
	   * Wraps any class that iterates with <code>[key,value]</code> pairs and provides higher order chained functions.
	   *
	   * @example <caption>Create a MapIterable from a Map.</caption>
	   * const myMap = new Map();
	   * const mapIterable = MapIterable.from(myMap);
	   * @example <caption>Create a MapIterable from a Set.</caption>
	   * const mySet = new Set();
	   * // sets wrapped in a map iterable must have a value of an Array matching [key,value]
	   * mySet.add(["key", "value"]);
	   * const mapIterable = MapIterable.from(mySet);
	   * @example <caption>Create a MapIterable from an Array.</caption>
	   * // arrays wrapped in a map iterable must have be an array of arrays matching [key,value]
	   * const myArray = [["key", "value"]];
	   * const mapIterable = MapIterable.from(myArray);
	   * @example <caption>Create a MapIterable from an Iterable.</caption>
	   * // iterables wrapped in a map iterable must yield arrays matching [key,value],
	   * // any object that implements *[Symbol.iterator]() or [Symbol.iterator]()
	   * // can be used as long as they follow that contract.
	   * const myIterable = {
	   *     *[Symbol.iterator]() {
	   *         yield ["key1", "value1"];
	   *         yield ["key2", "value2"];
	   *         yield ["key3", "value3"];
	   *     }
	   * }
	   * const mapIterable = MapIterable.from(myIterable);
	   * @example <caption>Create a MapIterable from a Mootable HashMap.</caption>
	   * // all Mootable HashMaps extend MapIterable, no need to wrap with the MapIterable.from function. If you do it will just return it back.
	   * const mapIterable = new HashMap();
	   * @example <caption>Create a MapIterable from a Mootable LinkedHashMap.</caption>
	   * // all Mootable LinkedHashMaps extend MapIterable, no need to wrap with the MapIterable.from() function.If you do it will just return it back.
	   * const mapIterable = new LinkedHashMap();
	   * @param {(Set.<Array.<key,value>>|Map|Array.<Array.<key,value>>|Iterator.<Array.<key,value>>|SetIterable.<Array.<key,value>>)} mapIterable the map to wrap
	   * @return {MapIterable} the wrapped Map.
	   */


	  static from(mapIterable) {
	    if (mapIterable instanceof MapIterable) {
	      return mapIterable;
	    }

	    return new MapIterableWrapper(mapIterable);
	  }
	  /**
	   * Test each element of the map to see if it matches and return
	   *  - true if the key and value match.
	   *  - false if it doesn't.
	   * @example <caption>Only match keys divisible by 2</caption>
	   * const myMatchPredicate = (value, key) => key % 2 === 0;
	   * @example <caption>Only match values which are equal to another key in the map</caption>
	   * const myMatchPredicate = (value, key, mapIterable) => mapIterable.has(value);
	   * @example <caption>An alternative implementation, (but potentially slower, and assumes no undefined value)</caption>
	   * const myMatchPredicate = (value, key, mapIterable) => mapIterable.indexOf(key) !== undefined;
	   * @callback MapIterable#MatchesPredicate
	   * @param {*} [value] - the entry value.
	   * @param {*} [key] - the entry key
	   * @param {MapIterable} [iterable] - the calling Map Iterable.
	   * @return {boolean} a value that coerces to true if it matches, or to false otherwise.
	   */

	  /**
	   * Test each element of the map and only include entries where the <code>MatchesPredicate</code> returns true.
	   * @example <caption>Only match keys which are odd numbered.</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const filteredIterable = hashmap.filter((value,key) => key % 2 !== 0);
	   * filteredIterable.forEach((value) => console.log(value));
	   * // will log to the console:
	   * // value1
	   * // value3
	   * @param {MapIterable#MatchesPredicate} [filterPredicate=(value, key, iterable) => true] - if the provided function returns <code>false</code>, that entry is excluded.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>filterPredicate</code>
	   * @returns {MapIterable} an iterable that allows you to iterate key value pairs.
	   */


	  filter(filterPredicate = () => true, ctx = this) {
	    return new MapFilter(this, filterPredicate, ctx);
	  }
	  /**
	   * For Each Function
	   * A callback to execute on every <code>[key,value]</code> pair of this map iterable.
	   * @example <caption>log the keys and values</caption>
	   * const forEachFunction = (value, key) => console.log(key,value)
	   * @callback MapIterable#ForEachCallback
	   * @param {*} [value] - the entry value.
	   * @param {*} [key] - the entry key
	   * @param {MapIterable|SetIterable} [iterable] - the calling Map Iterable.
	   */

	  /**
	   * Execute the provided callback on every <code>[key,value]</code> pair of this map iterable.
	   * @example <caption>Log all the keys and values.</caption>
	   * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * mapIterable.forEach((value) => console.log(key, value));
	   * // will log to the console:
	   * // 1 value1
	   * // 2 value2
	   * // 3 value3
	   * @param {MapIterable#ForEachCallback} [forEachCallback=(value, key, iterable) => {}]
	   * @param {*} [ctx=this] Value to use as <code>this</code> when executing <code>forEachCallback</code>
	   * @returns {MapIterable} an iterable that allows you to iterate key value pairs.
	   */


	  forEach(forEachCallback = () => {}, ctx = this) {
	    for (const [key, value] of this) {
	      forEachCallback.call(ctx, value, key, this);
	    }

	    return this;
	  }
	  /**
	   * Fills the provided collector, or an array if none provided, and fills it with the values of this {@link MapIterable}. Then return the collector.
	   * The original collector, with the exception of arrays, will be modified as we call functions directly against it.
	   *
	   * A collector will be resolved in this order:
	   *  - {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array}
	   *    - a new array is created and passed back with the filled values, and the original is not changed.
	   *  - Object with a function <code>.set</code>.
	   *    - such as {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map Map}, {@link HashMap} or {@link LinkedHashMap}
	   *    - it will call <code>set(key,value)</code> for every entry, if the value already exists for that key it is typically overridden. The original is modified.
	   *  - Object with a function <code>.add</code>
	   *    - such as {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set Set}
	   *    - it will call <code>add([key,value])</code> for every entry, so that a <code>[key,value]</code> pair is added to the collection. The original is modified.
	   *  - {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object Object}
	   *    - It will call <code>obj[key] = value</code> for every entry, so that a property of <code>key</code> has a value of <code>value</code> set on it. The original is modified.
	   *
	   * @example <caption>Collect to a new {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array}</caption>
	   * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const myArray = mapIterable.collect();
	   * // myArray === [[1,'value1'],[2,'value2'],[3,'value3']]:
	   * @example <caption>Collect with an empty existing {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array}</caption>
	   * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const oldArray = [];
	   * const newArray = mapIterable.collect(oldArray);
	   * // newArray === [[1,'value1'],[2,'value2'],[3,'value3']]
	   * // oldArray === []
	   * @example <caption>Collect with an existing {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array} with values</caption>
	   * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const oldArray = [[2,'someOtherValue']];
	   * const newArray = mapIterable.collect(oldArray);
	   * // newArray === [[2,'someOtherValue'],[1,'value1'],[2,'value2'],[3,'value3']]
	   * // oldArray === [[2,'someOtherValue']]
	   * @example <caption>Collect to an existing {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array} with values, modifying the old array.</caption>
	   * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const array  = [[2,'someOtherValue']];
	   * array.push(mapIterable.collect())
	   * // array === [[2,'someOtherValue'],[1,'value1'],[2,'value2'],[3,'value3']]
	   * @example <caption>Collect to a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set Set}</caption>
	   * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const oldSet = new Set().add('willRemain');
	   * const newSet = mapIterable.collect(oldSet);
	   * // oldSet === newSet === ['willRemain',[1,'value1'],[2,'value2'],[3,'value3']]
	   * @example <caption>Collect to a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map Map}</caption>
	   * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const oldMap = new Map().set(2,'willBeOverwritten').set(5,'willRemain');
	   * const newMap = mapIterable.collect(oldMap);
	   * // oldMap === newMap === [[2,'value2'],[5,'willRemain'],[1,'value1'],[3,'value3']]
	   * @example <caption>Collect to a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object Object}</caption>
	   * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const oldObject = {'1','willBeOverridden'};
	   * const newObject = mapIterable.collect(oldObject);
	   * // oldObject === newObject === {'1': 'value1', '2': 'value2', '3': 'value3'}
	   * @param {(Array|Set|Map|HashMap|LinkedHashMap|Object)} [collector=[]] the collection to fill
	   * @returns {(Array|Set|Map|HashMap|LinkedHashMap|Object)} The collector that was passed in.
	   */


	  collect(collector = []) {
	    if (Array.isArray(collector)) {
	      if (collector.length) {
	        return collector.concat(Array.from(this));
	      }

	      return Array.from(this);
	    } else if (isFunction(collector.set)) {
	      for (const [key, value] of this) {
	        collector.set(key, value);
	      }
	    } else if (isFunction(collector.add)) {
	      for (const entry of this) {
	        collector.add(entry);
	      }
	    } else {
	      for (const [key, value] of this) {
	        collector[key] = value;
	      }
	    }

	    return collector;
	  }
	  /**
	   * Test to see if ALL elements pass the test implemented by the passed <code>MatchesPredicate</code>.
	   * - if any element does not match, returns false
	   * - if all elements match, returns true.
	   * - if no elements match, returns false.
	   * - if the iterable is empty, returns true. (irrespective of the predicate)
	   * - if no predicate is provided, returns true.
	   *
	   * @example <caption>Do all values start with value. (yes)</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const everyResult = hashmap.every((value) => value.startsWith('value'));
	   * // everyResult === true
	   * @example <caption>Do all values start with value. (no)</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'doesntStart'],[3,'value3']]);
	   * const everyResult = hashmap.every((value) => value.startsWith('value'));
	   * // everyResult === false
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every|Array.every}
	   * @param {MapIterable#MatchesPredicate} [everyPredicate=(value, key, iterable) => true] - if the provided function returns <code>false</code>, at any point the <code>every()</code> function returns false.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>everyPredicate</code>
	   * @returns {boolean} true if all elements match, false if one or more elements fails to match.
	   */


	  every(everyPredicate = () => true, ctx = this) {
	    for (const [key, value] of this) {
	      if (!everyPredicate.call(ctx, value, key, this)) {
	        return false;
	      }
	    }

	    return true;
	  }
	  /**
	   * Test to see if ANY element pass the test implemented by the passed <code>MatchesPredicate</code>.
	   * - if any element matches, returns true.
	   * - if all elements match returns true.
	   * - if no elements match returns false.
	   * - if the iterable is empty, returns true.
	   * - if no predicate is provided, returns true.
	   *
	   * @example <caption>Do any values start with value. (yes all of them)</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const someResult = hashmap.some((value) => value.startsWith('value'));
	   * // someResult === true
	   * @example <caption>Do any values start with value. (yes 2 of them)</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'doesntStart'],[3,'value3']]);
	   * const someResult = hashmap.some((value) => value.startsWith('value'));
	   * // someResult === true
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some|Array.some}
	   * @param {MapIterable#MatchesPredicate} [somePredicate=(value, key, iterable) => true] - the predicate to identify if we have a match.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>somePredicate</code>
	   * @returns {boolean} - true if all elements match, false if one or more elements fails to match.
	   */


	  some(somePredicate = () => true, ctx = this) {
	    for (const [key, value] of this) {
	      if (somePredicate.call(ctx, value, key, this)) {
	        return true;
	      }
	    }

	    return false;
	  }
	  /**
	   * Find the first value in the map which passes the provided <code>MatchesPredicate</code>.
	   * - return the first <code>value</code> from the <code>[key,value]</code> pair that matches
	   * - if no elements match, it returns undefined.
	   * - if no predicate is defined, will return the first value it finds.
	   * @example <caption>Find a value</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const findResult = hashmap.find((value) => value.endsWith('ue2'));
	   * // findResult === 'value2'
	   * @example <caption>Can't find a value</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const findResult = hashmap.find((value) => value.startsWith('something'));
	   * // findResult === undefined
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find|Array.find}
	   * @param {MapIterable#MatchesPredicate} [findPredicate=(value, key, iterable) => value] - the predicate to identify if we have a match.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>findPredicate</code>
	   * @returns {*} - the value of the element that matches.
	   */


	  find(findPredicate = () => true, ctx = this) {
	    for (const [key, value] of this) {
	      if (findPredicate.call(ctx, value, key, this)) {
	        return value;
	      }
	    }

	    return undefined;
	  }
	  /**
	   * Find the first value in the key which passes the provided  <code>MatchesPredicate</code>.
	   * - return the first <code>key</code> from the <code>[key,value]</code> pair that matches
	   * - if no elements match, it returns undefined.
	   * - if no predicate is defined, will return the first key it finds.
	   *
	   * @example <caption>Find a key</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const findIndexResult = hashmap.findIndex((value) => value.endsWith('ue2'));
	   * // findIndexResult === 2
	   * @example <caption>Can't find a key</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const findIndexResult = hashmap.findIndex((value) => value.startsWith('something'));
	   * // findIndexResult === undefined
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex|Array.findIndex}
	   * @param {MapIterable#MatchesPredicate} [findIndexPredicate=(value, key, iterable) => key] - the predicate to identify if we have a match.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>findIndexPredicate</code>
	   * @returns {*} - the key of the element that matches..
	   */


	  findIndex(findIndexPredicate = (value, key) => key, ctx = this) {
	    for (const [key, value] of this) {
	      if (findIndexPredicate.call(ctx, value, key, this)) {
	        return key;
	      }
	    }

	    return undefined;
	  }
	  /**
	   * Find the first key in the map whose value is <code>===</code> to the provided value.
	   * - return the first <code>key</code> from the <code>[key,value]</code> pair that matches
	   * - if no elements match, it returns undefined.
	   * - it is legitimate for values to be null or undefined, and if set, will find a key.
	   *
	   * Values are not indexed, this is potentially an expensive operation.
	   *
	   * @example <caption>Find the key for a value</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const indexOfResult = hashmap.indexOf('value2');
	   * // indexOfResult === 2
	   * @example <caption>what is the key of a non existent value</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const indexOfResult = hashmap.indexOf('something');
	   * // indexOfResult === undefined
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf|Array.indexOf}
	   * @param {*} valueToCheck - the value we use to === against the entries value to identify if we have a match.
	   * @returns {*} - the key of the element that matches..
	   */


	  indexOf(valueToCheck, equals = equalsFor(valueToCheck)) {
	    for (const [key, value] of this) {
	      if (equals(valueToCheck, value)) {
	        return key;
	      }
	    }

	    return undefined;
	  }
	  /**
	   * Does the map have this key.
	   * If backed by a Map or HashMap, or in fact any collection that implements the <code>.has(key)</code> function, then it will utilize that, otherwise it will iterate across the collection.
	   * - return true if the <code>key</code> matches a <code>[key,value]</code> pair.
	   * - if no elements match, it returns false.
	   * - it is legitimate for keys to be null or undefined, and if set, will return true
	   *
	   * Maps typically index keys, and so is generally a fast operation.
	   * @example <caption>>Does this contain a key that is there</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const hasResult = hashmap.has(1);
	   * // hasResult === true
	   * @example <caption>Does this contain a key that isn't there</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const hasResult = hashmap.has(4);
	   * // hasResult === false
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has|Map.has}
	   * @param {*} key - the key we use to === against the entries key to identify if we have a match.
	   * @returns {boolean} - if it holds the key or not.
	   */


	  has(key, equals = equalsFor(key)) {
	    return this.some((_, otherKey) => equals(otherKey, key));
	  }
	  /**
	   * Get a value from the map using this key.
	   * If backed by a Map or HashMap, or in fact any collection that implements the <code>.get(key)</code> function, then it will utilize that, otherwise it will iterate across the collection.
	   * - return the first <code>value</code> from the <code>[key,value]</code> pair that matches
	   * - if no elements match, it returns undefined.
	   * - it is legitimate for keys to be null or undefined, and if set, will find a value.
	   * - if a map is earlier on in the chain, the value, will be mapped along the way.
	   *   - However there is no way to reverse map the key, as we do the fetch, which means the key has to be the same as the one in the original collection.
	   *
	   * Maps typically index keys, and so is generally a fast operation.
	   * @example <caption>>What is the value for a key</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const getResult = hashmap.get(1);
	   * // getResult === 'value1'
	   * @example <caption>What is the value for a key that isn't there</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const getResult = hashmap.get(4);
	   * // getResult === undefined
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get|Map.get}
	   * @param {*} key - the key we use to === against the entries key to identify if we have a match.
	   * @returns {*} - the value of the element that matches.
	   */


	  get(key, equals = equalsFor(key)) {
	    return this.find((value, otherKey) => equals(key, otherKey));
	  }
	  /**
	   * Get a value from the map using this as an optional. This is effectively a combination of calling has and get at the same time.
	   * If backed by a Map or HashMap, or in fact any collection that implements the <code>.optionalGet(key)</code> function, then it will utilize that, otherwise depending on the existence of has and get functions it may iterate across the collection.
	   * - return the first <code>value</code> from the <code>[key,value]</code> pair that matches
	   * - if no elements match, it returns undefined.
	   * - it is legitimate for keys to be null or undefined, and if set, will find a value.
	   * - if a map is earlier on in the chain, the value, will be mapped along the way.
	   *   - However there is no way to reverse map the key, as we do the fetch, which means the key has to be the same as the one in the original collection.
	   *
	   * Maps typically index keys, and so is generally a fast operation.
	   * @example <caption>>What is the value for a key</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const getResult = hashmap.get(1);
	   * // getResult === 'value1'
	   * @example <caption>What is the value for a key that isn't there</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const getResult = hashmap.get(4);
	   * // getResult === undefined
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get|Map.get}
	   * @param {*} key - the key we use to === against the entries key to identify if we have a match.
	   * @returns {{has: boolean, value:*}} - an optional result.
	   */


	  optionalGet(key, equals = equalsFor(key)) {
	    let found = false;
	    const val = this.find((value, otherKey) => {
	      if (equals(key, otherKey)) {
	        found = true;
	        return true;
	      }

	      return false;
	    });

	    if (found) {
	      return some(val);
	    }

	    return none;
	  }
	  /**
	   * Reduce Function
	   * A callback to accumulate values from the Map Iterables <code>[key,value]</code> into a single value.
	   * if initial value is <code>undefined</code> or <code>null</code>, unlike Array.reduce,
	   * no error occurs, and it is imply passed as the accumulator value
	   *
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce|Array.reduce}
	   * @example <caption>add all the keys</caption>
	   * const reduceFunction = (accumulator, value, key) => accumulator+key
	   * @callback MapIterable#ReduceFunction
	   * @param {*} [accumulator] - the value from the last execution of this function.
	   * @param {*} [value] - the entry value.
	   * @param {*} [key] - the entry key
	   * @param {MapIterable} [iterable] - the calling Map Iterable.
	   * @return {*} [accumulator] - the value to pass to the next time this function is called or the final return value.
	   */

	  /**
	   * Iterate through the map iterable reducing it to a single value.
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce|Array.reduce}
	   * @example <caption>add all the keys</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const reduceResult = hashmap.reduce((accumulator, value, key) => accumulator+key, 0);
	   * // reduceResult === 6
	   * @example <caption>add all the values into one string in reverse order</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const reduceResult = hashmap.reduce((accumulator, value) => value+accumulator, '');
	   * // reduceResult === 'value3value2value1'
	   * @param {MapIterable#ReduceFunction} [reduceFunction=(accumulator, value, key, iterable) => true] - the predicate to identify if we have a match.
	   * @param {*} [initialValue] the initial value to start on the reduce.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
	   * @returns {*} - the final accumulated value.
	   */


	  reduce(reduceFunction = (accumulator, value) => value, initialValue = undefined, ctx = this) {
	    let accumulator = initialValue;

	    for (const [key, value] of this) {
	      accumulator = reduceFunction.call(ctx, accumulator, value, key, this);
	    }

	    return accumulator;
	  }
	  /**
	   * Map Function
	   * A callback that takes a <code>[key,value]</code> and the current iterable, and returns a mapped value.
	   * How this mapped value is used depends on the calling function.
	   *  - mapKeys the key is transformed to the returned value
	   *  - mapValues the value is transformed to the returned value
	   *  - mapEntries the value should be of the form [key, value] and transforms each accordingly
	   *  - map the MapIterable is turned into a SetIterable, and this returned value is the resultant entry.
	   *
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map|Array.map}
	   * @example <caption>swap key and value</caption>
	   * const mapEntriesFunction = ( value, key) => [value, key];
	   * // the typical response is [key, value]
	   * @callback MapIterable#MapFunction
	   * @param {*} [value] - the entry value.
	   * @param {*} [key] - the entry key
	   * @param {MapIterable} [iterable] - the calling Map Iterable.
	   * @return {*} [mappedValue] - the mapped value to return.
	   */

	  /**
	   * For every entry, use the mapKeyFunction to transform the existing key.
	   * This does not modify the original collection, and execution is deferred until it is fetched.
	   * @example <caption>add one to all the keys and turn them into strings</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const mappedKeysIterable = hashmap.mapKeys((value, key) => 'k'+(key+1));
	   * const mappedKeysArray = mappedKeysIterable.collect();
	   * // mappedKeysArray === [['k2','value1'],['k3','value2'],['k4','value3']]
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map|Array.map}
	   * @param {MapIterable#MapFunction} [mapKeyFunction=(value, key, iterable) => key] - the function that transforms the key.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
	   * @returns {MapIterable} an iterable that allows you to iterate key value pairs.
	   */


	  mapKeys(mapKeyFunction = (value, key) => key, ctx = this) {
	    return new MapKeyMapper(this, mapKeyFunction, ctx);
	  }
	  /**
	   * For every entry, use the mapValueFunction to transform the existing value.
	   * This does not modify the original collection, and execution is deferred until it is fetched.
	   * @example <caption>prepend the values with the keys</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const mappedValuesIterable = hashmap.mapValues((value, key) => key + value);
	   * const mappedValuesArray = mappedValuesIterable.collect();
	   * // mappedValuesArray === [['1','1value1'],[2,'2value2'],[3,'3value3']]
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map|Array.map}
	   * @param {MapIterable#MapFunction} [mapValueFunction=(value, key, iterable) => value] - the function that transforms the value.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
	   * @returns {MapIterable} an iterable that allows you to iterate key value pairs.
	   */


	  mapValues(mapValueFunction = value => value, ctx = this) {
	    return new MapValueMapper(this, mapValueFunction, ctx);
	  }
	  /**
	   * For every entry, use the mapEntryFunction to transform the existing value and existing key.
	   * This does not modify the original collection, and execution is deferred until it is fetched.
	   * - If one Function is provided
	   *   - The function MUST return an array with at least 2 entries, the first entry is the key, the second is the value.
	   *   - if the parameter is not an array or a function a TypeError is thrown.
	   * - If an array of Functions is provided
	   *   - The first function, (if defined), modifies the key. It needs only return the key. see {@link MapIterable#mapKeys mapKeys}
	   *   - the second function, (if defined), modifies the value. see {@link MapIterable#mapValues mapValues}
	   *   - if both the first and second values in the array are not functions a TypeError is thrown.
	   * - In both cases will return {@link MapIterable}
	   * @example <caption>swap the keys and the values</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const mapEntriesIterable = hashmap.mapEntries((value, key) => [value,key])
	   * const mapEntriesArray = mapEntriesIterable.collect();
	   * // mapEntriesArray === [['value1',1],['value2',2],['value3',3]]
	   * @example <caption>swap the keys and the values with 2 functions</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const mapEntriesIterable = hashmap.mapEntries([(value) => value,(value, key) => key])
	   * const mapEntriesArray = mapEntriesIterable.collect();
	   * // mapEntriesArray === [['value1',1],['value2',2],['value3',3]]
	   * @example <caption>modify just the keys</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * // Notice we are passing an array of one function.
	   * const mapEntriesIterable = hashmap.mapEntries([(value, key) => value])
	   * const mapEntriesArray = mapEntriesIterable.collect();
	   * // mapEntriesArray === [['value1','value1'],['value2','value2'],['value2','value2']]
	   * @example <caption>modify just the values</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * // Notice we are passing an array of two, but have only defined the last as a function.
	   * const mapEntriesIterable = hashmap.mapEntries([undefined,(value, key) => key])
	   * const mapEntriesArray = mapEntriesIterable.collect();
	   * // mapEntriesArray === [[1,1],[2,2],[3,3]]
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map|Array.map}
	   * @param {MapIterable#MapFunction|Array.<MapIterable#MapFunction,MapIterable#MapFunction>} [mapEntryFunction=(value, key, iterable) => [key, value]] - the function that transforms the key and value.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
	   * @returns {MapIterable} an iterable that allows you to iterate key value pairs.
	   * @throws {TypeError} if at least one function is not provided.
	   */


	  mapEntries(mapEntryFunction = (value, key) => [key, value], ctx = this) {
	    if (Array.isArray(mapEntryFunction)) {
	      if (mapEntryFunction.length === 1 && isFunction(mapEntryFunction[0])) {
	        // we are just mapping keys
	        return this.mapKeys(mapEntryFunction[0], ctx);
	      } else if (mapEntryFunction.length > 1) {
	        if (isFunction(mapEntryFunction[0])) {
	          if (isFunction(mapEntryFunction[1])) {
	            // We don't chain, as we don't want the transformed value or key, to appear in either functions as arguments.
	            const joinedFunction = (value, key, iterable) => [mapEntryFunction[0].call(ctx, value, key, iterable), mapEntryFunction[1].call(ctx, value, key, iterable)];

	            return new MapEntryMapper(this, joinedFunction, this);
	          } else {
	            // we are just mapping keys
	            return this.mapKeys(mapEntryFunction[0], ctx);
	          }
	        } else if (isFunction(mapEntryFunction[1])) {
	          // we are just mapping values
	          return this.mapValues(mapEntryFunction[1], ctx);
	        }
	      }
	    } else if (isFunction(mapEntryFunction)) {
	      return new MapEntryMapper(this, mapEntryFunction, ctx);
	    } // we aren't mapping, lets give the developer a hint as to what the problem is


	    throw new TypeError('MapIterable.mapEntries expects a function or an array of functions');
	  }
	  /**
	   * For every entry, use the mapFunction to transform the existing value and existing key.
	   * - If one Function is provided, we are transforming the map into a set.
	   *   - The function can return any value. This is the equivalent of turning the MapIterable into a SetIterable.
	   *   - if the parameter is not an array or a function a TypeError is thrown.
	   *   - Will return a {@link SetIterable}
	   * - If an array of Functions is provided, we are transforming the map into another map. see {@link MapIterable#mapEntries mapEntries}
	   *   - The first function, (if defined), modifies the key. It needs only return the key. see {@link MapIterable#mapKeys mapKeys}
	   *   - the second function, (if defined), modifies the value. see {@link MapIterable#mapKeys mapValues}
	   *   - if both the first and second values in the array are not functions a TypeError is thrown.
	   *   - Will return a {@link MapIterable}.
	   * @example <caption>return just values</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const setIterable = hashmap.map((value, key) => value)
	   * const mapArray = setIterable.collect();
	   * // mapArray === ['value1','value2','value3']
	   * // setIterable instanceof SetIterable
	   * @example <caption>swap the keys and the values</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const setIterable = hashmap.map((value, key) => [value,key])
	   * const mapArray = setIterable.collect();
	   * // mapArray === [['value1',1],['value2',2],['value3',3]]
	   * // setIterable instanceof SetIterable
	   * @example <caption>swap the keys and the values with 2 functions</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const mapIterable = hashmap.map([(value) => value,(value, key) => key])
	   * const mapArray = mapIterable.collect();
	   * // mapArray === [['value1',1],['value2',2],['value3',3]]
	   * // mapIterable instanceof MapIterable
	   * @example <caption>modify just the keys</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * // Notice we are passing an array of one function.
	   * const mapIterable = hashmap.map([(value, key) => value])
	   * const mapArray = mapIterable.collect();
	   * // mapArray === [['value1','value1'],['value2','value2'],['value2','value2']]
	   * // mapIterable instanceof MapIterable
	   * @example <caption>modify just the values</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * // Notice we are passing an array of two, but have only defined the last as a function.
	   * const mapIterable = hashmap.map([undefined,(value, key) => key])
	   * const mapArray = mapIterable.collect();
	   * // mapArray === [[1,1],[2,2],[3,3]]
	   * // mapIterable instanceof MapIterable
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map|Array.map}
	   * @param {MapIterable#MapFunction|Array.<MapIterable#MapFunction,MapIterable#MapFunction>} [mapFunction=(value, key, iterable) => [key, value]] - the function that transforms the key and value.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
	   * @returns {SetIterable|MapIterable} an iterable that allows you to iterate single entries in a set, or an iterable that allows you to iterate a map.
	   * @throws {TypeError} if at least one function is not provided.
	   */


	  map(mapFunction = (value, key) => {
	    return [key, value];
	  }, ctx = this) {
	    if (Array.isArray(mapFunction)) {
	      return this.mapEntries(mapFunction, ctx);
	    }

	    if (isFunction(mapFunction)) {
	      return new MapMapper(this, mapFunction, ctx);
	    }

	    throw new TypeError('MapIterable.map expects a function or an array of functions');
	  }
	  /**
	   * Return a SetIterable or MapIterable which is a concatenation of this and the provided iterable.
	   * - If the provided value is a MapIterable or a Map then the returned iterable is a MapIterable.
	   * - Otherwise since we have no idea if it will return key value pairs we return a SetIterable.
	   *   - If you know the container stores [key,value] pairs and want to return a MapIterable, use {@link MapIterable#concatMap concatMap}
	   * This is based on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat Array.concat} it does not modify the original iterables, and returns a new one.
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat|Array.concat}
	   * @example <caption>concatenate 2 maps</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const hashmap2 = new LinkedHashMap([[1,'value1a'],[2,'value2a'],[3,'value3a']]);
	   * const mapIterable = hashmap.concat(hashmap2);
	   * // Notice how the keys are repeated, any unique constraints are gone.
	   * // mapIterable === [[1,'value1'],[2,'value2'],[3,'value3'],[1,'value1a'],[2,'value2a'],[3,'value3a']]
	   * // mapIterable instanceof MapIterable
	   * @example <caption>concatenate an array</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const array = ['hello','world'];
	   * const setIterable = hashmap.concat(array);
	   * // Notice how we have key value pairs and strings mixed.
	   * // setIterable === [[1,'value1'],[2,'value2'],[3,'value3'],'hello','world']
	   * // setIterable instanceof SetIterable
	   * @param {(Array|Set|Map|HashMap|LinkedHashMap)} otherIterable the iterable to concat to this one.
	   * @return {SetIterable|MapIterable} the new iterable to return
	   */


	  concat(otherIterable) {
	    if (otherIterable) {
	      if (otherIterable instanceof MapIterable || otherIterable instanceof Map) {
	        return this.concatMap(otherIterable);
	      }

	      return new SetConcat(this, SetIterable.from(otherIterable));
	    }

	    return this;
	  }
	  /**
	   * Return a MapIterable which is a concatenation of this and the provided iterable.
	   * - If the provided value is a MapIterable or a Map then the returned iterable is a MapIterable.
	   * - Otherwise the iterable MUST return [key,value] pairs
	   *
	   * @example <caption>concatenate 2 maps</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const hashmap2 = new LinkedHashMap([[1,'value1a'],[2,'value2a'],[3,'value3a']]);
	   * const mapIterable = hashmap.concatMap(hashmap2);
	   * // Notice how the keys are repeated, any unique constraints are gone.
	   * // mapIterable === [[1,'value1'],[2,'value2'],[3,'value3'],[1,'value1a'],[2,'value2a'],[3,'value3a']]
	   * // mapIterable instanceof MapIterable
	   * @example <caption>concatenate an array</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const array = [[1,'hello'],[3,'world']];
	   * const mapIterable = hashmap.concatMap(array);
	   * // Notice how everything is a key value pair.
	   * // mapIterable === [[1,'value1'],[2,'value2'],[3,'value3'],[1,'hello'],[3,'world']]
	   * // mapIterable instanceof MapIterable
	   * @param {(Array.<Array.<key,value>>|Set.<Array.<key,value>>|Map|HashMap|LinkedHashMap)} otherMapIterable the iterable to concat to this one, has to return [key,value] pairs
	   * @return {MapIterable} the new iterable to return
	   */


	  concatMap(otherMapIterable) {
	    if (otherMapIterable) {
	      return new MapConcat(this, MapIterable.from(otherMapIterable));
	    }

	    return this;
	  }
	  /**
	   * Return a SetIterable which is just the keys in this map.
	   * @example <caption>collect all the keys</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const keysIterable = hashmap.keys();
	   * // keysIterable instanceof SetIterable
	   * const keys = keysIterable.collect();
	   * // keys === [1,2,3]
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys keys}
	   * @return {SetIterable} the keys as a set iterable.
	   */


	  keys() {
	    return new EntryToKeyMapper(this);
	  }
	  /**
	   * Return a SetIterable which is just the values in this map.
	   * @example <caption>collect all the values</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const valuesIterable = hashmap.values();
	   * // valuesIterable instanceof SetIterable
	   * const values = valuesIterable.collect();
	   * // values === ['value1','value2','value3']
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values values}
	   * @return {SetIterable} the values as a set iterable.
	   */


	  values() {
	    return new EntryToValueMapper(this);
	  }
	  /**
	   * Return a MapIterable which is the entries in this map, this is just a short hand for the [Symbol.Iterator]() implementation
	   * @example <caption>collect all the entries</caption>
	   * const hashmap = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const entriesIterable = hashmap.entries();
	   * // entriesIterable instanceof MapIterable
	   * const entries = entriesIterable.collect();
	   * // entries === [[1,'value1'],[2,'value2'],[3,'value3']]
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries entries}
	   * @return {MapIterable}
	   */


	  entries() {
	    return this;
	  }

	}
	/**
	 * The base class for the Set Implementations, and the Higher Order Functions for Sets, many Map functions result in SetIterables
	 *
	 * @example <caption>Create a SetIterable from a Map.</caption>
	 * const myMap = new Map();
	 * // iterating over a setIterable backed by a map, will yield [key,value] arrays.
	 * const setIterable = SetIterable.from(myMap);
	 * @example <caption>Create a SetIterable from a Set.</caption>
	 * const mySet = new Set();
	 * const setIterable = SetIterable.from(mySet);
	 * @example <caption>Create a SetIterable from an Array.</caption>
	 * const setIterable = SetIterable.from([]);
	 * @example <caption>Create a SetIterable from an Iterable.</caption>
	 * // any object that implements *[Symbol.iterator]() or [Symbol.iterator]() can be used.
	 * const myIterable = {
	 *     *[Symbol.iterator]() {
	 *         yield "value1";
	 *         yield "value2";
	 *         yield "value3";
	 *     }
	 * }
	 * const setIterable = SetIterable.from(myIterable);
	 * @example <caption>Create a SetIterable from a Mootable HashMap.</caption>
	 * // iterating over a SetIterable backed by a map, will yield [key,value] arrays.
	 * const setIterable =  SetIterable.from(new HashMap());
	 * @example <caption>Create a SetIterable from a Mootable LinkedHashMap.</caption>
	 * // iterating over a SetIterable backed by a map, will yield [key,value] arrays.
	 * const setIterable =  SetIterable.from(new LinkedHashMap());
	 * @abstract
	 */

	class SetIterable {
	  /**
	   * Returns the number of elements returned by this Set Iterable. If filter is used in the method chain, it is forced to iterate over all the elements, and will be slower. Otherwise even with concatenation, it just queries the base collection size.
	   * @returns {number}
	   */
	  get size() {
	    let accumulator = 0;

	    for (const i of this) // jshint ignore:line
	    {
	      accumulator++;
	    }

	    return accumulator;
	  }
	  /**
	   * Wraps any class that iterates any value and provides higher order chained functions.
	     * @example <caption>Create a SetIterable from a Map.</caption>
	   * const myMap = new Map();
	   * // iterating over a set, will yield [key,value] arrays.
	   * const setIterable = SetIterable.from(myMap);
	   * @example <caption>Create a SetIterable from a Set.</caption>
	   * const mySet = new Set();
	   * const setIterable = SetIterable.from(mySet);
	   * @example <caption>Create a SetIterable from an Array.</caption>
	   * const setIterable = SetIterable.from([]);
	   * @example <caption>Create a SetIterable from an Iterable.</caption>
	   * // any object that implements *[Symbol.iterator]() or [Symbol.iterator]() can be used.
	   * const myIterable = {
	   *     *[Symbol.iterator]() {
	   *         yield "value1";
	   *         yield "value2";
	   *         yield "value3";
	   *     }
	   * }
	   * const setIterable = SetIterable.from(myIterable);
	   * @example <caption>Create a SetIterable from a Mootable HashMap.</caption>
	   * // iterating over a SetIterable backed by a map, will yield [key,value] arrays.
	   * const setIterable =  SetIterable.from(new HashMap());
	   * @example <caption>Create a SetIterable from a Mootable LinkedHashMap.</caption>
	   * // iterating over a SetIterable backed by a map, will yield [key,value] arrays.
	   * const setIterable =  SetIterable.from(new LinkedHashMap());
	   * @param {(Set|Map|Array|Iterator)} setIterable the set to wrap
	   * @return {SetIterable} the wrapped Set.
	   */


	  static from(setIterable) {
	    if (setIterable instanceof SetIterable) {
	      return setIterable;
	    }

	    return new SetIterableWrapper(setIterable);
	  }
	  /**
	   * Test each element of the set and only include entries where the <code>MatchesPredicate</code> returns true.
	   * @example <caption>Only match values which are odd numbered.</caption>
	   * const hashmap = SetIterable.from([1,2,3]);
	   * const filteredIterable = hashmap.filter((value) => value % 2 !== 0);
	   * filteredIterable.forEach((value) => console.log(value));
	   * // will log to the console:
	   * // 1
	   * // 3
	   * @param {MapIterable#MatchesPredicate} [filterPredicate=(value, key, setIterable) => true] - if the provided function returns <code>false</code>, that entry is excluded.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>filterPredicate</code>
	   * @returns {SetIterable} - an iterable that allows you to iterate values.
	   */


	  filter(filterPredicate = () => true, ctx = this) {
	    return new SetFilter(this, filterPredicate, ctx);
	  }
	  /**
	   * Execute the provided callback on every <code>value</code> of this set iterable.
	   * @example <caption>Log all the  values.</caption>
	   * const set = new Set().add('value1').add('value2').add('value3');
	   * const setIterable = SetIterable.from(set);
	   * mapIterable.forEach((value) => console.log(value));
	   * // will log to the console:
	   * // value1
	   * // value2
	   * // value3
	   * @param {MapIterable#ForEachCallback} [forEachCallback=(value, key, iterable) => {}]
	   * @param {*} [ctx=this] Value to use as <code>this</code> when executing <code>forEachCallback</code>
	   * @returns {SetIterable} - an iterable that allows you to iterate on values.
	   */


	  forEach(forEachCallback = () => {}, ctx = this) {
	    for (const value of this) {
	      forEachCallback.call(ctx, value, value, this);
	    }
	  }
	  /**
	   * Fills the provided collector, or an array if none provided, and fills it with the values of this {@link MapIterable}. Then return the collector.
	   * The original collector, with the exception of arrays, will be modified as we call functions directly against it.
	   *
	   * A collector will be resolved in this order:
	   *  - {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array}
	   *    - a new array is created and passed back with the filled values, and the original is not changed.
	   *  - Object with a function <code>.set</code>.
	   *    - such as {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map Map}, {@link HashMap} or {@link LinkedHashMap}
	   *    - it will call <code>set(key,value)</code> for every entry, if the value already exists for that key it is typically overridden. The original is modified.
	   *  - Object with a function <code>.add</code>
	   *    - such as {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set Set}
	   *    - it will call <code>add([key,value])</code> for every entry, so that a <code>[key,value]</code> pair is added to the collection. The original is modified.
	   *  - {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object Object}
	   *    - It will call <code>obj[key] = value</code> for every entry, so that a property of <code>key</code> has a value of <code>value</code> set on it. The original is modified.
	   *
	   * @example <caption>Collect to a new {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array}</caption>
	   * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const myArray = mapIterable.collect();
	   * // myArray === [[1,'value1'],[2,'value2'],[3,'value3']]:
	   * @example <caption>Collect with an empty existing {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array}</caption>
	   * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const oldArray = [];
	   * const newArray = mapIterable.collect(oldArray);
	   * // newArray === [[1,'value1'],[2,'value2'],[3,'value3']]
	   * // oldArray === []
	   * @example <caption>Collect with an existing {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array} with values</caption>
	   * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const oldArray = [[2,'someOtherValue']];
	   * const newArray = mapIterable.collect(oldArray);
	   * // newArray === [[2,'someOtherValue'],[1,'value1'],[2,'value2'],[3,'value3']]
	   * // oldArray === [[2,'someOtherValue']]
	   * @example <caption>Collect to an existing {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array Array} with values, modifying the old array.</caption>
	   * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const array  = [[2,'someOtherValue']];
	   * array.push(mapIterable.collect())
	   * // array === [[2,'someOtherValue'],[1,'value1'],[2,'value2'],[3,'value3']]
	   * @example <caption>Collect to a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set Set}</caption>
	   * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const oldSet = new Set().add('willRemain');
	   * const newSet = mapIterable.collect(oldSet);
	   * // oldSet === newSet === ['willRemain',[1,'value1'],[2,'value2'],[3,'value3']]
	   * @example <caption>Collect to a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map Map}</caption>
	   * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const oldMap = new Map().set(2,'willBeOverwritten').set(5,'willRemain');
	   * const newMap = mapIterable.collect(oldMap);
	   * // oldMap === newMap === [[2,'value2'],[5,'willRemain'],[1,'value1'],[3,'value3']]
	   * @example <caption>Collect to a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object Object}</caption>
	   * const mapIterable = new LinkedHashMap([[1,'value1'],[2,'value2'],[3,'value3']]);
	   * const oldObject = {'1','willBeOverridden'};
	   * const newObject = mapIterable.collect(oldObject);
	   * // oldObject === newObject === {'1': 'value1', '2': 'value2', '3': 'value3'}
	   * @param {(Array|Set|Map|HashMap|LinkedHashMap|Object)} [collector=[]] the collection to fill
	   * @returns {(Array|Set|Map|HashMap|LinkedHashMap|Object)} The collector that was passed in.
	   */


	  collect(collector = []) {
	    if (Array.isArray(collector)) {
	      if (collector.length) {
	        return collector.concat(Array.from(this));
	      }

	      return Array.from(this);
	    } else if (isFunction(collector.add)) {
	      for (const entry of this) {
	        collector.add(entry);
	      }
	    } else if (isFunction(collector.set)) {
	      for (const entry of this) {
	        collector.set(entry);
	      }
	    }

	    return collector;
	  }
	  /**
	   * Iterate through the set iterable reducing it to a single value.
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce|Array.reduce}
	   * @example <caption>add all the values</caption>
	   * const set = new Set().add(1).add(2).add(3);
	   * const setIterable = SetIterable.from(set);
	   * const reduceResult = setIterable.reduce((accumulator, value) => accumulator+value, 0);
	   * // reduceResult === 6
	   * @example <caption>add all the values into one string in reverse order</caption>
	   * const set = new Set().add('value1').add('value2').add('value3');
	   * const setIterable = SetIterable.from(set);
	   * const reduceResult = setIterable.reduce((accumulator, value) => value+accumulator, '');
	   * // reduceResult === 'value3value2value1'
	   * @param {MapIterable#ReduceFunction} [reduceFunction=(accumulator, value, key, iterable) => true] - the predicate to identify if we have a match.
	   * @param {*} [initialValue] the initial value to start on the reduce.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
	   * @returns {*} - the final accumulated value.
	   */


	  reduce(reduceFunction = (accumulator, value) => value, initialValue = undefined, ctx = this) {
	    let accumulator = initialValue;

	    for (const value of this) {
	      accumulator = reduceFunction.call(ctx, accumulator, value, value, this);
	    }

	    return accumulator;
	  }
	  /**
	   * Test to see if ALL values pass the test implemented by the passed <code>MatchesPredicate</code>.
	   * - if any value does not match, returns false
	   * - if all values match, returns true.
	   * - if no values match, returns false.
	   * - if the iterable is empty, returns true. (irrespective of the predicate)
	   * - if no predicate is provided, returns true.
	   *
	   * @example <caption>Do all values start with value. (yes)</caption>
	   * const set = new Set().add('value1').add('value2').add('value3');
	   * const setIterable = SetIterable.from(set);
	   * const everyResult = setIterable.every((value) => value.startsWith('value'));
	   * // everyResult === true
	   * @example <caption>Do all values start with value. (no)</caption>
	   * const set = new Set().add('value1').add('doesntStart').add('value3');
	   * const setIterable = SetIterable.from(set);
	   * const everyResult = setIterable.every((value) => value.startsWith('value'));
	   * // everyResult === false
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every|Array.every}
	   * @param {MapIterable#MatchesPredicate} [everyPredicate=(value, key, iterable) => true] - if the provided function returns <code>false</code>, at any point the <code>every()</code> function returns false.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>everyPredicate</code>
	   * @returns {boolean} true if all elements match, false if one or more elements fails to match.
	   */


	  every(everyPredicate = () => true, ctx = this) {
	    for (const value of this) {
	      if (!everyPredicate.call(ctx, value, value, this)) {
	        return false;
	      }
	    }

	    return true;
	  }
	  /**
	   * Test to see if ANY value pass the test implemented by the passed <code>MatchesPredicate</code>.
	   * - if any value matches, returns true.
	   * - if all values match returns true.
	   * - if no values match returns false.
	   * - if the iterable is empty, returns true.
	   * - if no predicate is provided, returns true.
	   *
	   * @example <caption>Do any values start with value. (yes all of them)</caption>
	   * const set = new Set().add('value1').add('value2').add('value3');
	   * const setIterable = SetIterable.from(set);
	   * const someResult = setIterable.some((value) => value.startsWith('value'));
	   * // someResult === true
	   * @example <caption>Do any values start with value. (yes 2 of them)</caption>
	   * const set = new Set().add('value1').add('doesntStart').add('value3');
	   * const setIterable = SetIterable.from(set);
	   * const someResult = setIterable.some((value) => value.startsWith('value'));
	   * // someResult === true
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some|Array.some}
	   * @param {MapIterable#MatchesPredicate} [somePredicate=(value, key, iterable) => true] - the predicate to identify if we have a match.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>somePredicate</code>
	   * @returns {boolean} - true if all values match, false if one or more values fails to match.
	   */


	  some(somePredicate = () => true, ctx = this) {
	    for (const value of this) {
	      if (somePredicate.call(ctx, value, this)) {
	        return true;
	      }
	    }

	    return false;
	  }
	  /**
	   * Does the set have this value.
	   * If backed by a Set, or in fact any collection that implements the <code>.has(key)</code> function, then it will utilize that, otherwise it will iterate across the collection.
	   * If backed by a Map or HashMap, then it will match [key,value] pairs not keys.
	   * - return true if the <code>value</code> matches.
	   * - if no values match, it returns false.
	   * - it is legitimate for values to be null or undefined, and if added, will return true
	   *
	   * Sets typically index values, and so is generally a fast operation. However if it backed by a map, then this will be slow as it will be matching entries not keys.
	   * @example <caption>Does this contain a value that is there</caption>
	   * const set = new Set().add('value1').add('value2').add('value3');
	   * const setIterable = SetIterable.from(set);
	   * const hasResult = setIterable.has('value2');
	   * // hasResult === true
	   * @example <caption>Does this contain a value that isn't there</caption>
	   * const set = new Set().add(1).add(2).add(3);
	   * const setIterable = SetIterable.from(set);
	   * const hasResult = setIterable.has(4);
	   * // hasResult === false
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has|Map.has}
	   * @param {*} value - the value we use to === against the entries key to identify if we have a match.
	   * @param {function} [equals] - if using an array, marks how deep we go through to test equality.
	   * @returns {boolean} - if it holds the key or not.
	   */


	  has(value, equals = equalsFor(value)) {
	    return this.some(otherValue => equals(otherValue, value));
	  }
	  /**
	   * Find the first value in the set which passes the provided <code>MatchesPredicate</code>.
	   * - return the first <code>value</code> that matches
	   * - if no value matches, it returns undefined.
	   * - if no predicate is defined, will return the first value it finds.
	   * @example <caption>Find a value</caption>
	   * const set = new Set().add('value1').add('value2').add('value3');
	   * const setIterable = SetIterable.from(set);
	   * const findResult = setIterable.find((value) => value.endsWith('ue2'));
	   * // findResult === 'value2'
	   * @example <caption>Can't find a value</caption>
	   * const set = new Set().add('value1').add('value2').add('value3');
	   * const setIterable = SetIterable.from(set);
	   * const findResult = setIterable.find((value) => value.startsWith('something'));
	   * // findResult === undefined
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find|Array.find}
	   * @param {MapIterable#MatchesPredicate} [findPredicate=(value, key, iterable) => value] - the predicate to identify if we have a match.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>findPredicate</code>
	   * @returns {*} - the value that matches.
	   */


	  find(findPredicate = () => true, ctx = this) {
	    for (const value of this) {
	      if (findPredicate.call(ctx, value, value, this)) {
	        return value;
	      }
	    }

	    return undefined;
	  }
	  /**
	   * For every entry, use the mapFunction to transform the existing value.
	   *   - Will return a {@link SetIterable}
	   * @example <caption>return just values with 'ish' on the end</caption>
	   * const set = new Set().add('value1').add('value2').add('value3');
	   * const setIterable = SetIterable.from(set);
	   * const mapped = setIterable.map((value, key) => value+'ish');
	   * const mapArray = mapped.collect();
	   * // mapArray === ['value1ish','value2ish','value3ish']
	   * // mapped instanceof SetIterable
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map|Array.map}
	   * @param {MapIterable#MapFunction} [mapFunction=(value, key, iterable) =>value] - the function that transforms the value.
	   * @param {*} [ctx=this] - Value to use as <code>this</code> when executing <code>reduceFunction</code>
	   * @returns {SetIterable} an iterable that allows you to iterate single entries in the mapped set
	   */


	  map(mapFunction = value => value, ctx = this) {
	    return new SetMapper(this, mapFunction, ctx);
	  }
	  /**
	   * Return a SetIterable which is a concatenation of this and the provided iterable.
	   * This is based on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat Array.concat} it does not modify the original iterables, and returns a new one.
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat|Array.concat}
	   * @example <caption>concatenate 2 sets</caption>
	   * const set1 = new Set(['value1','value2','value3']);
	   * const set2 = new Set(['value1a','value2a','value3a']);
	   * const setIterable = SetIterable.from(set1).concat(set2);
	   * // Notice how any unique constraints are gone.
	   * // setIterable === ['value1','value2','value3','value1a','value2a'],'value3a']
	   * // setIterable instanceof SetIterable
	   * @example <caption>concatenate an array</caption>
	   * const set = new Set(['value1','value2','value3']);
	   * const array = ['hello','world'];
	   * const setIterable = SetIterable.from(set).concat(array);
	   * // setIterable === ['value1','value2','value3','hello','world']
	   * // setIterable instanceof SetIterable
	   * @param {(Array|Set|Map|HashMap|LinkedHashMap)} otherIterable the iterable to concat to this one.
	   * @return {SetIterable} the new iterable to return
	   */


	  concat(otherIterable = []) {
	    return new SetConcat(this, SetIterable.from(otherIterable));
	  }
	  /**
	   * Return a SetIterable which is basically this SetIterable.
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values values}
	   * @return {SetIterable} the values as a set iterable.
	   */


	  values() {
	    return this;
	  }
	  /**
	   * Return a SetIterable which is basically this SetIterable.
	   * Behaves the same way as the JS Set Object in that it just returns values
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys keys}
	   * @return {SetIterable} the values as a set iterable.
	   */


	  keys() {
	    return this;
	  }
	  /**
	   * Return a MapIterable which are a value pair, returns [value,value]
	   * @example <caption>collect all the entries</caption>
	   * const set = new Set([1,2,3]);
	   * const entriesIterable = SetIterable.from(set).entries();
	   * // entriesIterable instanceof MapIterable
	   * const entries = entriesIterable.collect();
	   * // entries === [[1,1],[2,'2],[3,3]]
	   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/entries entries}
	   * @return {MapIterable}
	   */


	  entries() {
	    return MapIterable.from(this.map(value => [value, value]));
	  }

	}
	/**
	 * @extends SetIterable
	 * @private
	 */

	class SetIterableWrapper extends SetIterable {
	  constructor(iterable, ctx) {
	    super();
	    this.iterable = iterable;
	    this.ctx = ctx ? ctx : iterable;
	  }

	  get size() {
	    return this.iterable.length ? this.iterable.length : this.iterable.size ? this.iterable.size : super.size;
	  }

	  has(value, equals = equalsFor(value)) {
	    // if is a map iterable then we want to return the entry not the key. otherwise we can shortcut
	    if (this.iterable instanceof Set || this.iterable instanceof SetIterable) {
	      return this.iterable.has(value, equals);
	    }

	    return super.has(value, equals);
	  }

	  *[Symbol.iterator]() {
	    yield* this.iterable;
	  }

	}
	/**
	 * @extends MapIterable
	 * @private
	 */


	class MapIterableWrapper extends MapIterable {
	  constructor(iterable, ctx) {
	    super();
	    this.iterable = iterable;
	    this.ctx = ctx ? ctx : iterable;
	  }

	  get size() {
	    return this.iterable.length ? this.iterable.length : this.iterable.size ? this.iterable.size : super.size;
	  }

	  *[Symbol.iterator]() {
	    yield* this.iterable;
	  }

	  has(key) {
	    return this.optionalGet(key).has;
	  }

	  optionalGet(key) {
	    if (isFunction(this.iterable.optionalGet)) {
	      return this.iterable.optionalGet(key);
	    }

	    if (isFunction(this.iterable.has)) {
	      if (this.iterable.has(key)) {
	        if (isFunction(this.iterable.get)) {
	          some(this.iterable.get(key));
	        }

	        return some(super.get(key));
	      }

	      return none;
	    }

	    return super.optionalGet(key);
	  }

	  get(key) {
	    return this.optionalGet(key).value;
	  }

	}
	/**
	 * @extends MapIterableWrapper
	 * @private
	 */


	class MapFilter extends MapIterableWrapper {
	  constructor(iterable, filterPredicate, ctx) {
	    super(iterable, ctx);
	    this.filterPredicate = filterPredicate;
	  }

	  get size() {
	    let accumulator = 0;

	    for (const i of this) // jshint ignore:line
	    {
	      accumulator++;
	    }

	    return accumulator;
	  }

	  *[Symbol.iterator]() {
	    for (let [key, value] of this.iterable) {
	      if (this.filterPredicate.call(this.ctx, value, key, this)) {
	        yield [key, value];
	      }
	    }
	  }

	  optionalGet(key) {
	    const opt = super.optionalGet(key);

	    if (opt.has && !this.filterPredicate.call(this.ctx, opt.value, key, this)) {
	      return none;
	    }

	    return opt;
	  }

	  has(key) {
	    return this.optionalGet(key).has;
	  }

	  get(key) {
	    return this.optionalGet(key).value;
	  }

	}
	/**
	 * @extends MapIterableWrapper
	 * @private
	 */


	class MapKeyMapper extends MapIterableWrapper {
	  constructor(iterable, mapFunction, ctx) {
	    super(iterable, ctx);
	    this.mapFunction = mapFunction;
	  }

	  *[Symbol.iterator]() {
	    for (let [key, value] of this.iterable) {
	      yield [this.mapFunction.call(this.ctx, value, key, this), value];
	    }
	  }

	}
	/**
	 * @extends MapIterableWrapper
	 * @private
	 */


	class MapValueMapper extends MapIterableWrapper {
	  constructor(iterable, mapFunction, ctx) {
	    super(iterable, ctx);
	    this.mapFunction = mapFunction;
	  }

	  *[Symbol.iterator]() {
	    for (let [key, value] of this.iterable) {
	      yield [key, this.mapFunction.call(this.ctx, value, key, this)];
	    }
	  }

	  optionalGet(key) {
	    const opt = super.optionalGet(key);

	    if (opt.has) {
	      return some(this.mapFunction.call(this.ctx, opt.value, key, this));
	    }

	    return opt;
	  }

	}
	/**
	 * @extends MapIterableWrapper
	 * @private
	 */


	class MapEntryMapper extends MapIterableWrapper {
	  constructor(iterable, mapFunction, ctx) {
	    super(iterable, ctx);
	    this.mapFunction = mapFunction;
	  }

	  *[Symbol.iterator]() {
	    for (let [key, value] of this.iterable) {
	      const [newKey, newValue] = this.mapFunction.call(this.ctx, value, key, this);
	      yield [newKey, newValue];
	    }
	  }

	  get(key) {
	    if (this.iterable.has(key)) {
	      const value = this.iterable.get(key);
	      return this.mapFunction.call(this.ctx, value, key, this)[1];
	    }

	    return undefined;
	  }

	}
	/**
	 * @extends MapIterable
	 * @private
	 */


	class MapConcat extends MapIterable {
	  constructor(iterable, otherIterable) {
	    super();
	    this.iterable = iterable;
	    this.otherIterable = otherIterable;
	  }

	  get size() {
	    return this.iterable.size + this.otherIterable.size;
	  }

	  *[Symbol.iterator]() {
	    yield* this.iterable;
	    yield* this.otherIterable;
	  }

	  optionalGet(key) {
	    const opt = this.iterable.optionalGet(key);
	    return opt.has ? opt : this.otherIterable.optionalGet(key);
	  }

	  has(key) {
	    return this.optionalGet(key).has;
	  }

	  get(key) {
	    return this.optionalGet(key).value;
	  }

	}
	/**
	 * @extends SetIterable
	 * @private
	 */


	class SetConcat extends SetIterable {
	  constructor(iterable, otherIterable) {
	    super();
	    this.iterable = iterable;
	    this.otherIterable = otherIterable;
	  }

	  get size() {
	    return this.iterable.size + this.otherIterable.size;
	  }

	  has(value, equals = equalsFor(value)) {
	    return this.iterable.has(value, equals) || this.otherIterable.has(value, equals);
	  }

	  *[Symbol.iterator]() {
	    yield* this.iterable;
	    yield* this.otherIterable;
	  }

	}
	/**
	 * @extends SetIterableWrapper
	 * @private
	 */


	class EntryToValueMapper extends SetIterableWrapper {
	  constructor(iterable) {
	    super(iterable);
	  }

	  *[Symbol.iterator]() {
	    for (let [, value] of this.iterable) {
	      yield value;
	    }
	  }

	  has(value, equals = equalsFor(value)) {
	    if (Array.isArray(value)) {
	      return this.iterable.some(otherValue => equals(value, otherValue));
	    } else {
	      return this.iterable.some(otherValue => equals(value, otherValue));
	    }
	  }

	}
	/**
	 * @extends SetIterableWrapper
	 * @private
	 */


	class EntryToKeyMapper extends SetIterableWrapper {
	  constructor(iterable) {
	    super(iterable);
	  }

	  *[Symbol.iterator]() {
	    for (let [key] of this.iterable) {
	      yield key;
	    }
	  }

	  has(key) {
	    return this.iterable.optionalGet(key).has;
	  }

	}
	/**
	 * @extends SetIterableWrapper
	 * @private
	 */


	class MapMapper extends SetIterableWrapper {
	  constructor(iterable, mapFunction, ctx) {
	    super(iterable, ctx);
	    this.mapFunction = mapFunction;
	  }

	  *[Symbol.iterator]() {
	    for (let [key, value] of this.iterable) {
	      yield this.mapFunction.call(this.ctx, value, key, this);
	    }
	  }
	  /**
	   * Only ever used for the Map function that produces a SetIterable.
	   * @param value
	   * @param equals
	   * @return {boolean}
	   */


	  has(value, equals = equalsFor(value)) {
	    return this.some(otherValue => equals(value, otherValue));
	  }

	}
	/**
	 * @extends SetIterableWrapper
	 * @private
	 */


	class SetMapper extends SetIterableWrapper {
	  constructor(iterable, mapFunction, ctx) {
	    super(iterable, ctx);
	    this.mapFunction = mapFunction;
	  }

	  *[Symbol.iterator]() {
	    for (let value of this.iterable) {
	      yield this.mapFunction.call(this.ctx, value, value, this);
	    }
	  }

	  has(value, equals = equalsFor(value)) {
	    return this.some(otherValue => equals(value, otherValue));
	  }

	}
	/**
	 * @extends SetIterableWrapper
	 * @private
	 */


	class SetFilter extends SetIterableWrapper {
	  constructor(iterable, filterPredicate, ctx) {
	    super(iterable, ctx);
	    this.filterPredicate = filterPredicate;
	  }

	  get size() {
	    let accumulator = 0;

	    for (const i of this) // jshint ignore:line
	    {
	      accumulator++;
	    }

	    return accumulator;
	  }

	  *[Symbol.iterator]() {
	    for (let value of this.iterable) {
	      if (this.filterPredicate.call(this.ctx, value, value, this)) {
	        yield value;
	      }
	    }
	  }

	  has(value, equals = equalsFor(value)) {
	    if (this.iterable.has(value, equals)) {
	      return this.filterPredicate.call(this.ctx, value, value, this);
	    }

	    return false;
	  }

	}

	const SHIFT = 7;
	const WIDTH = 1 << SHIFT;
	const MASK = WIDTH - 1;
	const DEPTH = 5;
	const SHIFT_HAMT = 5;
	const WIDTH_HAMT = 1 << SHIFT_HAMT;
	const MASK_HAMT = WIDTH_HAMT - 1;
	const DEPTH_HAMT = DEPTH - 1;
	const SHIFT_HAMT_1 = SHIFT_HAMT + SHIFT;
	/**
	 * HashMap - HashMap Implementation for JavaScript
	 * @namespace Mootable
	 * @author Jack Moxley <https://github.com/jackmoxley>
	 * @version 0.15.0
	 * Homepage: https://github.com/mootable/hashmap
	 */

	/**
	 * This HashMap is backed by a hashtrie, and can be tuned to specific use cases.
	 * @extends {MapIterable}
	 */

	class HashMap extends MapIterable {
	  /**
	   * This HashMap is backed by a hashtrie, and can be tuned to specific use cases.
	   * - `new HashMap()` creates an empty hashmap
	   * - `new HashMap(copy:Iterable)` creates a hashmap which is a copy of the provided iterable.
	   *   1) `copy` either
	   *      - an object that provides a forEach function with the same signature as `Map.forEach`, such as `Map` or this `HashMap` and `LinkedHashMap`
	   *      - or a 2 dimensional key-value array, e.g. `[['key1','val1'], ['key2','val2']]`.
	   * @param {(Map|HashMap|LinkedHashMap|Iterable.<Array.<key,value>>)} [copy]
	   */
	  constructor(copy) {
	    super();
	    this.clear();

	    if (copy && (copy[Symbol.iterator] || copy.forEach)) {
	      this.copy(copy);
	    }
	  }

	  get size() {
	    return this.length;
	  }

	  __createContainer(hash) {
	    return new Container(this, hash);
	  }

	  has(key, options = {}) {
	    equalsAndHash(key, options);
	    return this.buckets.has(key, options, 0);
	  }

	  get(key, options = {}) {
	    equalsAndHash(key, options);
	    return this.buckets.get(key, options, 0);
	  } // noinspection JSCheckFunctionSignatures


	  optionalGet(key, options = {}) {
	    equalsAndHash(key, options);
	    return this.buckets.optionalGet(key, options, 0);
	  }
	  /**
	   * Sets a value onto this map, using the key as its reference.
	   *
	   * @param {*} key - the key we want to key our value to
	   * @param {*} value - the value we are setting
	   * @return {HashMap}
	   */


	  set(key, value, options = {}) {
	    equalsAndHash(key, options);
	    this.buckets.set(key, value, options, 0);
	    this.length = this.buckets.size;
	    return this;
	  }
	  /**
	   *
	   * @param {Map|HashMap|LinkedHashMap|MapIterable|SetIterable.<Array.<key,value>>|Iterator.<Array.<key,value>>|Array.<Array.<key,value>>} other - the iterable to copy
	   * @return {HashMap} this hashmap, with the values copied to it.
	   * @throws {TypeError} if the provided object other is null or not iterable.
	   */


	  copy(other) {
	    const map = this;

	    if (isIterable(other)) {
	      for (const [key, value] of other) {
	        map.set(key, value);
	      }

	      return this;
	    } else if (isFunction(other.entries)) {
	      for (const [key, value] of other.entries()) {
	        map.set(key, value);
	      }

	      return this;
	    } else if (isFunction(other.forEach)) {
	      other.forEach(function (value, key) {
	        map.set(key, value);
	      });
	      return this;
	    }

	    throw new TypeError('HashMap.copy expects an object which is iterable or has a forEach function on it');
	  }
	  /**
	   * Makes a copy of this hashmap and returns a new one.
	   * @return {HashMap}
	   */


	  clone() {
	    return new HashMap(this);
	  }
	  /**
	   * Deletes an entry from this hashmap, using the provided key
	   * @param key
	   * @return {HashMap}
	   */


	  delete(key, options = {}) {
	    equalsAndHash(key, options);

	    if (this.buckets.delete(key, options, 0)) {
	      this.length = this.buckets.size;
	    }

	    return this;
	  }
	  /**
	   * clears the data from this hashmap.
	   * @return {HashMap}
	   */


	  clear() {
	    this.buckets = new HashBuckets(this);
	    this.length = 0;
	    return this;
	  }

	  *[Symbol.iterator]() {
	    for (const entry of this.buckets) {
	      yield entry;
	    }
	  }

	  *reverse() {
	    for (const entry of this.buckets.reverse()) {
	      yield entry;
	    }
	  }

	}
	/**
	 * @private
	 */

	class HashBuckets {
	  constructor(map) {
	    this.map = map;
	    this.clear();
	  }

	  hashConflicts() {
	    return false;
	  }

	  clear() {
	    this.buckets = [];
	    this.size = 0;
	  }

	  bucketFor(hash) {
	    const idx = this.indexFor(hash);

	    if (idx < this.buckets.length) {
	      return this.buckets[idx];
	    }

	    return undefined;
	  }

	  indexFor(hash) {
	    return hash >>> SHIFT & MASK;
	  }

	  set(key, value, options) {
	    const hash = options.hash;
	    const idx = this.indexFor(hash);
	    let bucket = this.buckets[idx];

	    if (!bucket) {
	      bucket = this.map.__createContainer(hash);
	      bucket.createEntry(key, value);
	      this.buckets[idx] = bucket;
	      this.size += 1;
	      return true;
	    } else if (bucket.hashConflicts(hash)) {
	      bucket = new HamtBuckets(this.map, DEPTH_HAMT, SHIFT_HAMT_1).replacing(bucket);
	      this.buckets[idx] = bucket;
	    }

	    if (bucket.set(key, value, options)) {
	      this.size += 1;
	      return true;
	    }

	    return false;
	  }

	  emplace(key, handler, options) {
	    const hash = options.hash;
	    const idx = this.indexFor(hash);
	    let bucket = this.buckets[idx];

	    if (!bucket) {
	      bucket = this.map.__createContainer(hash);
	      this.buckets[idx] = bucket;
	    } else if (bucket.hashConflicts(hash)) {
	      bucket = new HamtBuckets(this.map, DEPTH_HAMT, SHIFT_HAMT_1).replacing(bucket);
	      this.buckets[idx] = bucket;
	    }

	    const response = bucket.emplace(key, handler, options);

	    if (response.resized) {
	      this.size += 1;
	    }

	    return response;
	  }

	  delete(key, options) {
	    const hash = options.hash;
	    const idx = this.indexFor(hash);
	    const bucket = this.buckets[idx];

	    if (bucket) {
	      const deleted = bucket.delete(key, options);

	      if (deleted) {
	        // if (bucket.size === 0) {
	        //     this.buckets[idx] = undefined;
	        // }
	        this.size -= 1;
	        return true;
	      }
	    }

	    return false;
	  }

	  get(key, options) {
	    const hash = options.hash;
	    const bucket = this.bucketFor(hash);

	    if (bucket) {
	      return bucket.get(key, options);
	    }

	    return undefined;
	  }

	  optionalGet(key, options) {
	    const hash = options.hash;
	    const bucket = this.bucketFor(hash);

	    if (bucket) {
	      return bucket.optionalGet(key, options);
	    }

	    return none;
	  }

	  has(key, options) {
	    const hash = options.hash;
	    const bucket = this.bucketFor(hash);

	    if (bucket) {
	      return bucket.has(key, options);
	    }

	    return false;
	  }

	  *[Symbol.iterator]() {
	    for (const bucket of this.buckets) {
	      if (bucket) {
	        for (const entry of bucket) {
	          yield entry;
	        }
	      }
	    }
	  }

	  *reverse() {
	    for (let idx = this.buckets.length - 1; idx >= 0; idx--) {
	      const bucket = this.buckets[idx];

	      if (bucket) {
	        for (const entry of bucket.reverse()) {
	          yield entry;
	        }
	      }
	    }
	  }

	}
	/**
	 * @private
	 */

	class HamtBuckets extends HashBuckets {
	  constructor(map, depth, shift) {
	    super(map);
	    this.depth = depth;
	    this.shift = shift;
	  }

	  clear() {
	    this.size = 0;
	    this.buckets = [];
	    this.idxFlags = 0;
	  }

	  indexFor(hash) {
	    const idxFlags = this.idxFlags;
	    const hashIdx = hash >>> this.shift & MASK_HAMT;
	    const flag = 1 << hashIdx;
	    return hammingWeight(idxFlags & flag - 1);
	  }

	  bucketFor(hash) {
	    const idxFlags = this.idxFlags;
	    const hashIdx = hash >>> this.shift & MASK_HAMT;
	    const flag = 1 << hashIdx;
	    const idx = hammingWeight(idxFlags & flag - 1);

	    if (idxFlags & flag) {
	      return this.buckets[idx];
	    }

	    return undefined;
	  }

	  replacing(oldBucket) {
	    const new_flag = 1 << (oldBucket.hash >>> this.shift & MASK_HAMT);
	    this.idxFlags |= new_flag; // shift the old bucket up a level. no need to splice its always going to be the first item.

	    this.buckets[0] = oldBucket;
	    this.size = oldBucket.size;
	    return this;
	  }

	  set(key, value, options) {
	    const hash = options.hash;
	    const idxFlags = this.idxFlags;
	    const hashIdx = hash >>> this.shift & MASK_HAMT;
	    const flag = 1 << hashIdx;
	    const idx = hammingWeight(idxFlags & flag - 1);
	    let bucket;

	    if (idxFlags & flag) {
	      bucket = this.buckets[idx];

	      if (this.depth && bucket.hashConflicts(hash)) {
	        bucket = new HamtBuckets(this.map, this.depth - 1, this.shift + SHIFT_HAMT).replacing(bucket);
	        this.buckets[idx] = bucket;
	      }
	    } else {
	      bucket = this.map.__createContainer(hash);
	      bucket.createEntry(key, value);
	      this.buckets.splice(idx, 0, bucket);
	      this.idxFlags |= flag;
	      this.size += 1;
	      return true;
	    }

	    if (bucket.set(key, value, options)) {
	      this.size += 1;
	      return true;
	    }

	    return false;
	  } // emplace(key, handler, options) {
	  //     const idx = (options.hash >>> this.shift) & this.map.mask;
	  //     let bucket = this.buckets[idx];
	  //     if (!bucket) {
	  //         bucket = this.depth ? new HamtBuckets(this.options, this.depth - 1) : new Container(this.options);
	  //         this.buckets[idx] = bucket;
	  //     }
	  //     options.hash >>>= this.options.widthAs2sExponent;
	  //     const response = bucket.emplace(key, handler, options);
	  //     if (response.resized) {
	  //         this.size += 1;
	  //     }
	  //     return response;
	  // }


	  delete(key, options) {
	    const hash = options.hash;
	    const idxFlags = this.idxFlags;
	    const hashIdx = hash >>> this.shift & MASK_HAMT;
	    const flag = 1 << hashIdx;

	    if (idxFlags & flag) {
	      const idx = hammingWeight(idxFlags & flag - 1);
	      const bucket = this.buckets[idx];
	      const deleted = bucket.delete(key, options);

	      if (deleted) {
	        this.size -= 1;

	        if (bucket.size === 0) {
	          if (idx === 0) {
	            this.buckets.shift();
	          } else if (this.buckets.size === idx) {
	            this.buckets.pop();
	          } else {
	            this.buckets.splice(idx, 1);
	          }

	          this.idxFlags ^= flag;
	        }

	        return true;
	      }
	    }

	    return false;
	  }

	  *[Symbol.iterator]() {
	    for (const bucket of this.buckets) {
	      for (const entry of bucket) {
	        yield entry;
	      }
	    }
	  }

	  *reverse() {
	    for (let idx = this.buckets.length - 1; idx >= 0; idx--) {
	      const bucket = this.buckets[idx];

	      for (const entry of bucket.reverse()) {
	        yield entry;
	      }
	    }
	  }

	}
	/**
	 * Holds multiple entries, but shrinks to a single container if reduced to a size of one.
	 */

	class Container {
	  constructor(map, hash) {
	    this.size = 0;
	    this.contents = [];
	    this.map = map;
	    this.hash = hash;
	  }

	  hashConflicts(hash) {
	    return hash !== this.hash;
	  }

	  get(key, options) {
	    if (this.size !== 0) {
	      const equals = options.equals;

	      for (const entry of this.contents) {
	        if (entry && equals(key, entry[0])) {
	          return entry[1];
	        }
	      }
	    }

	    return undefined;
	  }

	  optionalGet(key, options) {
	    if (this.size !== 0) {
	      const equals = options.equals;
	      const entry = this.contents.find(entry => equals(key, entry[0]));

	      if (entry) {
	        return some(entry[1]);
	      }
	    }

	    return none;
	  }

	  set(key, value, options) {
	    const equals = options.equals;

	    for (const entry of this.contents) {
	      if (equals(key, entry[0])) {
	        entry[1] = value;
	        return false;
	      }
	    }

	    this.createEntry(key, value);
	    return true;
	  }

	  createEntry(key, value) {
	    const entry = [key, value];
	    this.contents.push(entry);
	    this.size += 1;
	    return entry;
	  }

	  deleteEntry(idx) {
	    this.size -= 1;

	    if (idx === 0) {
	      return this.contents.shift();
	    } else if (idx === this.size) {
	      return this.contents.pop();
	    } else {
	      return this.contents.splice(idx, 1)[0];
	    }
	  }

	  emplace(key, handler, options) {
	    const equals = options.equals;

	    for (const entry of this.contents) {
	      if (equals(key, entry[0])) {
	        const value = handler.update(entry[1], key, this.map);
	        entry[1] = value;
	        return {
	          value,
	          resized: false
	        };
	      }
	    }

	    const value = handler.insert(key, this.map);
	    this.createEntry(key, value);
	    return {
	      value,
	      resized: true
	    };
	  }

	  has(key, options) {
	    if (this.size !== 0) {
	      const equals = options.equals;
	      return this.contents.some(entry => equals(key, entry[0]));
	    }

	    return false;
	  }

	  delete(key, options) {
	    const equals = options.equals;
	    const idx = this.contents.findIndex(entry => equals(key, entry[0]));

	    if (idx === -1) {
	      return false;
	    }

	    this.deleteEntry(idx);
	    return true;
	  }

	  *[Symbol.iterator]() {
	    for (const entry of this.contents) {
	      yield entry.slice();
	    }
	  }

	  *reverse() {
	    for (let idx = this.contents.length - 1; idx >= 0; idx--) {
	      const entry = this.contents[idx];
	      yield entry.slice();
	    }
	  }

	}
	/**
	 * Counts the number of ones in a 32 bit integer.
	 *
	 * @param {number} flags 32 bit integet
	 * @return {number} amount of ones.
	 */

	const hammingWeight = flags => {
	  flags -= flags >> 1 & 0x55555555;
	  flags = (flags & 0x33333333) + (flags >> 2 & 0x33333333);
	  return (flags + (flags >> 4) & 0xF0F0F0F) * 0x1010101 >> 24;
	};

	/**
	 * HashMap - LinkedHashMap Implementation for JavaScript
	 * @namespace Mootable
	 * @author Jack Moxley <https://github.com/jackmoxley>
	 * @version 0.15.0
	 * Homepage: https://github.com/mootable/hashmap
	 */

	/**
	 * This LinkedHashMap is is an extension of {@link HashMap} however LinkedHashMap also maintains insertion order of keys, and guarantees to iterate over them in that order.
	 * @extends HashMap
	 */

	class LinkedHashMap extends HashMap {
	  /**
	   * This LinkedHashMap is is an extension of {@link HashMap} however LinkedHashMap also maintains insertion order of keys, and guarantees to iterate over them in that order.
	   * - `new LinkedHashMap()` creates an empty linked hashmap
	   * - `new LinkedHashMap(copy:Iterable)` creates a linked hashmap which is a copy of the provided iterable.
	   *   1) `copy` either
	   *      - an object that provides a forEach function with the same signature as `Map.forEach`, such as `Map` or this `HashMap` and `LinkedHashMap`
	   *      - or a 2 dimensional key-value array, e.g. `[['key1','val1'], ['key2','val2']]`.
	   * @param {(Map|HashMap|LinkedHashMap|Iterable.<Array.<key,value>>)} [copy]
	   */
	  constructor(copy) {
	    super(copy);
	    this.start = undefined;
	    this.end = undefined;
	  }

	  __createContainer(hash) {
	    return new LinkedContainer(this, hash);
	  }
	  /**
	   * Makes a copy of this LinkedHashMap
	   * @return {LinkedHashMap}
	   */


	  clone() {
	    return new LinkedHashMap(this);
	  }

	  *[Symbol.iterator]() {
	    let entry = this.start;

	    while (entry) {
	      yield entry.slice();
	      entry = entry.next;
	    }
	  }

	  *reverse() {
	    let entry = this.end;

	    while (entry) {
	      yield entry.slice();
	      entry = entry.previous;
	    }
	  }

	}
	/**
	 * Holds multiple entries, but shrinks to a single container if reduced to a size of one.
	 */

	class LinkedContainer extends Container {
	  constructor(map, hash) {
	    super(map, hash);
	  }

	  createEntry(key, value) {
	    const entry = super.createEntry(key, value);
	    const map = this.map;

	    if (map.end) {
	      map.end.next = entry;
	      entry.previous = map.end;
	      map.end = entry;
	    } else {
	      map.end = map.start = entry;
	    }

	    return entry;
	  }

	  deleteEntry(idx) {
	    const oldEntry = super.deleteEntry(idx);
	    const map = this.map;

	    if (oldEntry.previous) {
	      oldEntry.previous.next = oldEntry.next;
	    } else if (map.start === oldEntry) {
	      map.start = oldEntry.next;
	    }

	    if (oldEntry.next) {
	      oldEntry.next.previous = oldEntry.previous;
	    } else if (map.end === oldEntry) {
	      map.end = oldEntry.previous;
	    }
	  }

	}

	const Mootable = {
	  HashMap,
	  LinkedHashMap,
	  MapIterable,
	  SetIterable,
	  Utils: {
	    hash,
	    isFunction,
	    isIterable,
	    isString,
	    equalsAndHash,
	    hashCodeFor,
	    equalsFor,
	    some,
	    none,
	    Option
	  }
	};

	exports.HashMap = HashMap;
	exports.LinkedHashMap = LinkedHashMap;
	exports.Mootable = Mootable;
	exports.default = HashMap;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
