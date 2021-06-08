(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Mootable = {}));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var check = function (it) {
	  return it && it.Math == Math && it;
	};
	var global$d =
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  (function () { return this; })() || Function('return this')();

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

	var fails$7 = function (exec) {
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

	var fails$6 = fails$7;
	var classof = classofRaw;
	var split = ''.split;
	var indexedObject = fails$6(function () {
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	var requireObjectCoercible$2 = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	var IndexedObject = indexedObject;
	var requireObjectCoercible$1 = requireObjectCoercible$2;
	var toIndexedObject$4 = function (it) {
	  return IndexedObject(requireObjectCoercible$1(it));
	};

	var shared$3 = {exports: {}};

	var fails$5 = fails$7;
	var descriptors = !fails$5(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var objectDefineProperty = {};

	var isObject$5 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var global$c = global$d;
	var isObject$4 = isObject$5;
	var document$1 = global$c.document;
	var EXISTS = isObject$4(document$1) && isObject$4(document$1.createElement);
	var documentCreateElement$1 = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$4 = descriptors;
	var fails$4 = fails$7;
	var createElement = documentCreateElement$1;
	var ie8DomDefine = !DESCRIPTORS$4 && !fails$4(function () {
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var isObject$3 = isObject$5;
	var anObject$5 = function (it) {
	  if (!isObject$3(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var isObject$2 = isObject$5;
	var toPrimitive$2 = function (input, PREFERRED_STRING) {
	  if (!isObject$2(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$2(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject$2(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$2(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var DESCRIPTORS$3 = descriptors;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;
	var anObject$4 = anObject$5;
	var toPrimitive$1 = toPrimitive$2;
	var $defineProperty = Object.defineProperty;
	objectDefineProperty.f = DESCRIPTORS$3 ? $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject$4(O);
	  P = toPrimitive$1(P, true);
	  anObject$4(Attributes);
	  if (IE8_DOM_DEFINE$1) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) {  }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var createPropertyDescriptor$3 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var DESCRIPTORS$2 = descriptors;
	var definePropertyModule$3 = objectDefineProperty;
	var createPropertyDescriptor$2 = createPropertyDescriptor$3;
	var createNonEnumerableProperty$7 = DESCRIPTORS$2 ? function (object, key, value) {
	  return definePropertyModule$3.f(object, key, createPropertyDescriptor$2(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var global$b = global$d;
	var createNonEnumerableProperty$6 = createNonEnumerableProperty$7;
	var setGlobal$3 = function (key, value) {
	  try {
	    createNonEnumerableProperty$6(global$b, key, value);
	  } catch (error) {
	    global$b[key] = value;
	  } return value;
	};

	var global$a = global$d;
	var setGlobal$2 = setGlobal$3;
	var SHARED = '__core-js_shared__';
	var store$3 = global$a[SHARED] || setGlobal$2(SHARED, {});
	var sharedStore = store$3;

	var store$2 = sharedStore;
	(shared$3.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.12.1',
	  mode: 'global',
	  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
	});

	var requireObjectCoercible = requireObjectCoercible$2;
	var toObject$2 = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var toObject$1 = toObject$2;
	var hasOwnProperty = {}.hasOwnProperty;
	var has$9 = function hasOwn(it, key) {
	  return hasOwnProperty.call(toObject$1(it), key);
	};

	var id = 0;
	var postfix = Math.random();
	var uid$2 = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var global$9 = global$d;
	var path$1 = global$9;

	var path = path$1;
	var global$8 = global$d;
	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};
	var getBuiltIn$3 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global$8[namespace])
	    : path[namespace] && path[namespace][method] || global$8[namespace] && global$8[namespace][method];
	};

	var getBuiltIn$2 = getBuiltIn$3;
	var engineUserAgent = getBuiltIn$2('navigator', 'userAgent') || '';

	var global$7 = global$d;
	var userAgent = engineUserAgent;
	var process = global$7.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8;
	var match, version;
	if (v8) {
	  match = v8.split('.');
	  version = match[0] < 4 ? 1 : match[0] + match[1];
	} else if (userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}
	var engineV8Version = version && +version;

	var V8_VERSION = engineV8Version;
	var fails$3 = fails$7;
	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$3(function () {
	  return !String(Symbol()) ||
	    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
	});

	var NATIVE_SYMBOL$1 = nativeSymbol;
	var useSymbolAsUid = NATIVE_SYMBOL$1
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var global$6 = global$d;
	var shared$2 = shared$3.exports;
	var has$8 = has$9;
	var uid$1 = uid$2;
	var NATIVE_SYMBOL = nativeSymbol;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;
	var WellKnownSymbolsStore = shared$2('wks');
	var Symbol$1 = global$6.Symbol;
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;
	var wellKnownSymbol$5 = function (name) {
	  if (!has$8(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
	    if (NATIVE_SYMBOL && has$8(Symbol$1, name)) {
	      WellKnownSymbolsStore[name] = Symbol$1[name];
	    } else {
	      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	    }
	  } return WellKnownSymbolsStore[name];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;
	var toInteger$2 = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var toInteger$1 = toInteger$2;
	var min$1 = Math.min;
	var toLength$1 = function (argument) {
	  return argument > 0 ? min$1(toInteger$1(argument), 0x1FFFFFFFFFFFFF) : 0;
	};

	var toInteger = toInteger$2;
	var max = Math.max;
	var min = Math.min;
	var toAbsoluteIndex$1 = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min(integer, length);
	};

	var toIndexedObject$3 = toIndexedObject$4;
	var toLength = toLength$1;
	var toAbsoluteIndex = toAbsoluteIndex$1;
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$3($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};
	var arrayIncludes = {
	  includes: createMethod(true),
	  indexOf: createMethod(false)
	};

	var hiddenKeys$4 = {};

	var has$7 = has$9;
	var toIndexedObject$2 = toIndexedObject$4;
	var indexOf = arrayIncludes.indexOf;
	var hiddenKeys$3 = hiddenKeys$4;
	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$2(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has$7(hiddenKeys$3, key) && has$7(O, key) && result.push(key);
	  while (names.length > i) if (has$7(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	var enumBugKeys$3 = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var internalObjectKeys$1 = objectKeysInternal;
	var enumBugKeys$2 = enumBugKeys$3;
	var objectKeys$1 = Object.keys || function keys(O) {
	  return internalObjectKeys$1(O, enumBugKeys$2);
	};

	var DESCRIPTORS$1 = descriptors;
	var definePropertyModule$2 = objectDefineProperty;
	var anObject$3 = anObject$5;
	var objectKeys = objectKeys$1;
	var objectDefineProperties = DESCRIPTORS$1 ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$3(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$2.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var getBuiltIn$1 = getBuiltIn$3;
	var html$1 = getBuiltIn$1('document', 'documentElement');

	var shared$1 = shared$3.exports;
	var uid = uid$2;
	var keys = shared$1('keys');
	var sharedKey$3 = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var anObject$2 = anObject$5;
	var defineProperties = objectDefineProperties;
	var enumBugKeys$1 = enumBugKeys$3;
	var hiddenKeys$2 = hiddenKeys$4;
	var html = html$1;
	var documentCreateElement = documentCreateElement$1;
	var sharedKey$2 = sharedKey$3;
	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey$2('IE_PROTO');
	var EmptyConstructor = function () {  };
	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null;
	  return temp;
	};
	var NullProtoObjectViaIFrame = function () {
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) {  }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys$1.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys$1[length]];
	  return NullProtoObject();
	};
	hiddenKeys$2[IE_PROTO$1] = true;
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject$2(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : defineProperties(result, Properties);
	};

	var wellKnownSymbol$4 = wellKnownSymbol$5;
	var create$1 = objectCreate;
	var definePropertyModule$1 = objectDefineProperty;
	var UNSCOPABLES = wellKnownSymbol$4('unscopables');
	var ArrayPrototype = Array.prototype;
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  definePropertyModule$1.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: create$1(null)
	  });
	}
	var addToUnscopables$1 = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var store$1 = sharedStore;
	var functionToString = Function.toString;
	if (typeof store$1.inspectSource != 'function') {
	  store$1.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}
	var inspectSource$2 = store$1.inspectSource;

	var global$5 = global$d;
	var inspectSource$1 = inspectSource$2;
	var WeakMap$1 = global$5.WeakMap;
	var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource$1(WeakMap$1));

	var NATIVE_WEAK_MAP = nativeWeakMap;
	var global$4 = global$d;
	var isObject$1 = isObject$5;
	var createNonEnumerableProperty$5 = createNonEnumerableProperty$7;
	var objectHas = has$9;
	var shared = sharedStore;
	var sharedKey$1 = sharedKey$3;
	var hiddenKeys$1 = hiddenKeys$4;
	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var WeakMap = global$4.WeakMap;
	var set, get, has$6;
	var enforce = function (it) {
	  return has$6(it) ? get(it) : set(it, {});
	};
	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$1(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};
	if (NATIVE_WEAK_MAP || shared.state) {
	  var store = shared.state || (shared.state = new WeakMap());
	  var wmget = store.get;
	  var wmhas = store.has;
	  var wmset = store.set;
	  set = function (it, metadata) {
	    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    wmset.call(store, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store, it) || {};
	  };
	  has$6 = function (it) {
	    return wmhas.call(store, it);
	  };
	} else {
	  var STATE = sharedKey$1('state');
	  hiddenKeys$1[STATE] = true;
	  set = function (it, metadata) {
	    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$5(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return objectHas(it, STATE) ? it[STATE] : {};
	  };
	  has$6 = function (it) {
	    return objectHas(it, STATE);
	  };
	}
	var internalState = {
	  set: set,
	  get: get,
	  has: has$6,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var objectGetOwnPropertyDescriptor = {};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$1(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;

	var DESCRIPTORS = descriptors;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var createPropertyDescriptor$1 = createPropertyDescriptor$3;
	var toIndexedObject$1 = toIndexedObject$4;
	var toPrimitive = toPrimitive$2;
	var has$5 = has$9;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$1(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return $getOwnPropertyDescriptor(O, P);
	  } catch (error) {  }
	  if (has$5(O, P)) return createPropertyDescriptor$1(!propertyIsEnumerableModule.f.call(O, P), O[P]);
	};

	var redefine$2 = {exports: {}};

	var global$3 = global$d;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$7;
	var has$4 = has$9;
	var setGlobal$1 = setGlobal$3;
	var inspectSource = inspectSource$2;
	var InternalStateModule$1 = internalState;
	var getInternalState$1 = InternalStateModule$1.get;
	var enforceInternalState = InternalStateModule$1.enforce;
	var TEMPLATE = String(String).split('String');
	(redefine$2.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  var state;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has$4(value, 'name')) {
	      createNonEnumerableProperty$4(value, 'name', key);
	    }
	    state = enforceInternalState(value);
	    if (!state.source) {
	      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
	    }
	  }
	  if (O === global$3) {
	    if (simple) O[key] = value;
	    else setGlobal$1(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty$4(O, key, value);
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState$1(this).source || inspectSource(this);
	});

	var objectGetOwnPropertyNames = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys = enumBugKeys$3;
	var hiddenKeys = enumBugKeys.concat('length', 'prototype');
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys(O, hiddenKeys);
	};

	var objectGetOwnPropertySymbols = {};

	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var getBuiltIn = getBuiltIn$3;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var anObject$1 = anObject$5;
	var ownKeys$1 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject$1(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var has$3 = has$9;
	var ownKeys = ownKeys$1;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule = objectDefineProperty;
	var copyConstructorProperties$1 = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = definePropertyModule.f;
	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has$3(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var fails$2 = fails$7;
	var replacement = /#|\.prototype\./;
	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails$2(detection)
	    : !!detection;
	};
	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};
	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';
	var isForced_1 = isForced$1;

	var global$2 = global$d;
	var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var createNonEnumerableProperty$3 = createNonEnumerableProperty$7;
	var redefine$1 = redefine$2.exports;
	var setGlobal = setGlobal$3;
	var copyConstructorProperties = copyConstructorProperties$1;
	var isForced = isForced_1;
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global$2;
	  } else if (STATIC) {
	    target = global$2[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global$2[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$3(sourceProperty, 'sham', true);
	    }
	    redefine$1(target, key, sourceProperty, options);
	  }
	};

	var fails$1 = fails$7;
	var correctPrototypeGetter = !fails$1(function () {
	  function F() {  }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var has$2 = has$9;
	var toObject = toObject$2;
	var sharedKey = sharedKey$3;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;
	var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has$2(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var fails = fails$7;
	var getPrototypeOf$1 = objectGetPrototypeOf;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$7;
	var has$1 = has$9;
	var wellKnownSymbol$3 = wellKnownSymbol$5;
	var ITERATOR$2 = wellKnownSymbol$3('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;
	var returnThis$1 = function () { return this; };
	var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;
	if ([].keys) {
	  arrayIterator = [].keys();
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
	  }
	}
	var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails(function () {
	  var test = {};
	  return IteratorPrototype$2[ITERATOR$2].call(test) !== test;
	});
	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};
	if (!has$1(IteratorPrototype$2, ITERATOR$2)) {
	  createNonEnumerableProperty$2(IteratorPrototype$2, ITERATOR$2, returnThis$1);
	}
	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$2,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var defineProperty = objectDefineProperty.f;
	var has = has$9;
	var wellKnownSymbol$2 = wellKnownSymbol$5;
	var TO_STRING_TAG$1 = wellKnownSymbol$2('toStringTag');
	var setToStringTag$2 = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$1)) {
	    defineProperty(it, TO_STRING_TAG$1, { configurable: true, value: TAG });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
	var create = objectCreate;
	var createPropertyDescriptor = createPropertyDescriptor$3;
	var setToStringTag$1 = setToStringTag$2;
	var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false);
	  return IteratorConstructor;
	};

	var isObject = isObject$5;
	var aPossiblePrototype$1 = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	var anObject = anObject$5;
	var aPossiblePrototype = aPossiblePrototype$1;
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) {  }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var $ = _export;
	var createIteratorConstructor = createIteratorConstructor$1;
	var getPrototypeOf = objectGetPrototypeOf;
	var setPrototypeOf = objectSetPrototypeOf;
	var setToStringTag = setToStringTag$2;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$7;
	var redefine = redefine$2.exports;
	var wellKnownSymbol$1 = wellKnownSymbol$5;
	var IteratorsCore = iteratorsCore;
	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol$1('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';
	var returnThis = function () { return this; };
	var defineIterator$1 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
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
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (setPrototypeOf) {
	          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          createNonEnumerableProperty$1(CurrentIteratorPrototype, ITERATOR$1, returnThis);
	        }
	      }
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }
	  if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty$1(IterablePrototype, ITERATOR$1, defaultIterator);
	  }
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
	    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }
	  return methods;
	};

	var toIndexedObject = toIndexedObject$4;
	var addToUnscopables = addToUnscopables$1;
	var InternalStateModule = internalState;
	var defineIterator = defineIterator$1;
	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated),
	    index: 0,
	    kind: kind
	  });
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
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var global$1 = global$d;
	var DOMIterables = domIterables;
	var ArrayIteratorMethods = es_array_iterator;
	var createNonEnumerableProperty = createNonEnumerableProperty$7;
	var wellKnownSymbol = wellKnownSymbol$5;
	var ITERATOR = wellKnownSymbol('iterator');
	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var ArrayValues = ArrayIteratorMethods.values;
	for (var COLLECTION_NAME in DOMIterables) {
	  var Collection = global$1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype) {
	    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG]) {
	      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
	    }
	    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
	      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
	      }
	    }
	  }
	}

	function isFunction(func) {
	  return !!(func && func.constructor && func.call && func.apply);
	}
	function isIterable(iterable) {
	  return !!(iterable && isFunction(iterable[Symbol.iterator]));
	}
	function isString(str) {
	  return !!(str && (typeof str === 'string' || str instanceof String));
	}
	const sameValue = Object.is;
	function sameValueZero(x, y) {
	  return x === y || Number.isNaN(x) && Number.isNaN(y);
	}
	function abstractEquals(x, y) {
	  return x == y;
	}
	function strictEquals(x, y) {
	  return x === y;
	}
	function hammingWeight(flags) {
	  flags -= flags >>> 1 & 0x55555555;
	  flags = (flags & 0x33333333) + (flags >>> 2 & 0x33333333);
	  return (flags + (flags >> 4) & 0xF0F0F0F) * 0x1010101 >>> 24;
	}

	class Option {
	  constructor(has, value) {
	    this.has = has;
	    this.value = value;
	    Object.freeze(this);
	  }
	  static get none() {
	    return none;
	  }
	  get size() {
	    return this.has ? 1 : 0;
	  }
	  static some(value) {
	    return some(value);
	  }
	  *[Symbol.iterator]() {
	    if (this.has) {
	      yield this.value;
	    }
	  }
	}
	const some = value => new Option(true, value);
	const none = new Option(false, undefined);

	class Container {
	  constructor(map, parent, hash) {
	    this.size = 0;
	    this.contents = [];
	    this.map = map;
	    this.parent = parent;
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
	        this.updateEntry(entry, value, options);
	        return;
	      }
	    }
	    this.createEntry(key, value, options);
	  }
	  emplace(key, handler, options) {
	    const equals = options.equals;
	    for (const entry of this.contents) {
	      if (equals(key, entry[0])) {
	        if ('update' in handler) {
	          const value = handler.update(entry[1], key, this.map);
	          this.updateEntry(entry, value, options);
	          return value;
	        }
	        return entry[1];
	      }
	    }
	    const value = handler.insert(key, this.map);
	    this.createEntry(key, value, options);
	    return value;
	  }
	  createEntry(key, value) {
	    const entry = [key, value];
	    entry.parent = this;
	    this.contents.push(entry);
	    this.size += 1;
	    return entry;
	  }
	  updateEntry(entry, newValue) {
	    entry[1] = newValue;
	  }
	  deleteEntry(entry) {
	    const idx = this.contents.indexOf(entry);
	    if (idx !== -1) {
	      this.deleteIndex(idx);
	      let parent = this.parent;
	      while (parent) {
	        parent.size -= 1;
	        parent = parent.parent;
	      }
	    }
	  }
	  deleteIndex(idx) {
	    this.size -= 1;
	    if (idx === 0) {
	      return this.contents.shift();
	    } else if (idx === this.size) {
	      return this.contents.pop();
	    } else {
	      return this.contents.splice(idx, 1)[0];
	    }
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
	    this.deleteIndex(idx);
	    return true;
	  }
	  *[Symbol.iterator]() {
	    for (const entry of this.contents) {
	      yield entry.slice();
	    }
	  }
	  *entriesRight() {
	    for (let idx = this.contents.length - 1; idx >= 0; idx--) {
	      yield this.contents[idx].slice();
	    }
	  }
	  *keys() {
	    for (const entry of this.contents) {
	      yield entry[0];
	    }
	  }
	  *values() {
	    for (const entry of this.contents) {
	      yield entry[1];
	    }
	  }
	  *keysRight() {
	    for (let idx = this.contents.length - 1; idx >= 0; idx--) {
	      yield this.contents[idx][0];
	    }
	  }
	  *valuesRight() {
	    for (let idx = this.contents.length - 1; idx >= 0; idx--) {
	      yield this.contents[idx][1];
	    }
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
	class HashBuckets {
	  constructor(map) {
	    this.map = map;
	    this.buckets = [];
	    this.size = 0;
	  }
	  clear() {
	    this.buckets = [];
	    this.size = 0;
	  }
	  bucketFor(hash) {
	    const idx = hash & MASK;
	    if (idx < this.buckets.length) {
	      return this.buckets[idx];
	    }
	    return undefined;
	  }
	  set(key, value, options) {
	    const hash = options.hash;
	    const idx = hash & MASK;
	    let bucket = this.buckets[idx];
	    if (!bucket) {
	      bucket = this.map.createContainer(this, hash);
	      bucket.createEntry(key, value, options);
	      this.buckets[idx] = bucket;
	      this.size += 1;
	      return;
	    } else if (bucket.hashConflicts(hash)) {
	      bucket = new HamtBuckets(this.map, this, DEPTH_HAMT, SHIFT).replacing(bucket);
	      this.buckets[idx] = bucket;
	    }
	    this.size -= bucket.size;
	    bucket.set(key, value, options);
	    this.size += bucket.size;
	  }
	  emplace(key, handler, options) {
	    const hash = options.hash;
	    const idx = hash & MASK;
	    let bucket = this.buckets[idx];
	    if (!bucket) {
	      bucket = this.map.createContainer(this, hash);
	      this.buckets[idx] = bucket;
	    } else if (bucket.hashConflicts(hash)) {
	      bucket = new HamtBuckets(this.map, this, DEPTH_HAMT, SHIFT).replacing(bucket);
	      this.buckets[idx] = bucket;
	    }
	    this.size -= bucket.size;
	    const value = bucket.emplace(key, handler, options);
	    this.size += bucket.size;
	    return value;
	  }
	  delete(key, options) {
	    const hash = options.hash;
	    const idx = hash & MASK;
	    const bucket = this.buckets[idx];
	    if (bucket) {
	      const deleted = bucket.delete(key, options);
	      if (deleted) {
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
	        yield* bucket;
	      }
	    }
	  }
	  *entriesRight() {
	    for (let idx = this.buckets.length - 1; idx >= 0; idx--) {
	      const bucket = this.buckets[idx];
	      if (bucket) {
	        yield* bucket.entriesRight();
	      }
	    }
	  }
	  *keys() {
	    for (const bucket of this.buckets) {
	      if (bucket) {
	        yield* bucket.keys();
	      }
	    }
	  }
	  *values() {
	    for (const bucket of this.buckets) {
	      if (bucket) {
	        yield* bucket.values();
	      }
	    }
	  }
	  *keysRight() {
	    for (let idx = this.buckets.length - 1; idx >= 0; idx--) {
	      const bucket = this.buckets[idx];
	      if (bucket) {
	        yield* bucket.keysRight();
	      }
	    }
	  }
	  *valuesRight() {
	    for (let idx = this.buckets.length - 1; idx >= 0; idx--) {
	      const bucket = this.buckets[idx];
	      if (bucket) {
	        yield* bucket.valuesRight();
	      }
	    }
	  }
	}
	class HamtBuckets {
	  constructor(map, parent, depth, shift) {
	    this.map = map;
	    this.parent = parent;
	    this.buckets = [];
	    this.size = 0;
	    this.idxFlags = 0;
	    this.depth = depth;
	    this.shift = shift;
	  }
	  hashConflicts() {
	    return false;
	  }
	  clear() {
	    this.size = 0;
	    this.buckets = [];
	    this.idxFlags = 0;
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
	    this.idxFlags |= new_flag;
	    this.buckets[0] = oldBucket;
	    this.size = oldBucket.size;
	    oldBucket.parent = this;
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
	        bucket = new HamtBuckets(this.map, this, this.depth - 1, this.shift + SHIFT_HAMT).replacing(bucket);
	        this.buckets[idx] = bucket;
	      }
	      this.size -= bucket.size;
	      bucket.set(key, value, options);
	      this.size += bucket.size;
	    } else {
	      bucket = this.map.createContainer(this, hash);
	      bucket.createEntry(key, value, options);
	      this.buckets.splice(idx, 0, bucket);
	      this.idxFlags |= flag;
	      this.size += 1;
	    }
	  }
	  emplace(key, handler, options) {
	    const hash = options.hash;
	    const idxFlags = this.idxFlags;
	    const hashIdx = hash >>> this.shift & MASK_HAMT;
	    const flag = 1 << hashIdx;
	    const idx = hammingWeight(idxFlags & flag - 1);
	    let bucket;
	    if (idxFlags & flag) {
	      bucket = this.buckets[idx];
	      if (this.depth && bucket.hashConflicts(hash)) {
	        bucket = new HamtBuckets(this.map, this, this.depth - 1, this.shift + SHIFT_HAMT).replacing(bucket);
	        this.buckets[idx] = bucket;
	      }
	    } else {
	      bucket = this.map.createContainer(this, hash);
	      this.buckets.splice(idx, 0, bucket);
	      this.idxFlags |= flag;
	    }
	    this.size -= bucket.size;
	    const value = bucket.emplace(key, handler, options);
	    this.size += bucket.size;
	    return value;
	  }
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
	          } else if (this.buckets.length === idx + 1) {
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
	      yield* bucket;
	    }
	  }
	  *entriesRight() {
	    for (let idx = this.buckets.length - 1; idx >= 0; idx--) {
	      yield* this.buckets[idx].entriesRight();
	    }
	  }
	  *keys() {
	    for (const bucket of this.buckets) {
	      yield* bucket.keys();
	    }
	  }
	  *values() {
	    for (const bucket of this.buckets) {
	      yield* bucket.values();
	    }
	  }
	  *keysRight() {
	    for (let idx = this.buckets.length - 1; idx >= 0; idx--) {
	      yield* this.buckets[idx].keysRight();
	    }
	  }
	  *valuesRight() {
	    for (let idx = this.buckets.length - 1; idx >= 0; idx--) {
	      yield* this.buckets[idx].valuesRight();
	    }
	  }
	}

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
	        }
	        if (key instanceof Date) {
	          return key.getTime();
	        }
	        if (key instanceof RegExp) {
	          return hash(key.toString());
	        }
	        if (key instanceof Option) {
	          if (key.has) {
	            return 31 * hashCodeFor(key.value);
	          }
	          return 0;
	        }
	        if (Object.prototype.hasOwnProperty.call(key, '_mootable_hashCode')) {
	          return hashCodeFor(key._mootable_hashCode);
	        }
	        const hashCode = HASH_COUNTER++;
	        Object.defineProperty(key, '_mootable_hashCode', {
	          value: hashCode
	        });
	        return hashCode;
	      }
	  }
	}
	let HASH_COUNTER = 0;
	function equalsFor(key) {
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
	function equalsAndHash(key, options) {
	  if (options) {
	    let hash = options.hash;
	    let equals = options.equals;
	    if (isFunction(hash)) {
	      hash = hash(key);
	    }
	    if (!Number.isSafeInteger(hash)) {
	      hash = hashCodeFor(key);
	    }
	    if (!isFunction(equals)) {
	      equals = equalsFor(key);
	    }
	    return {
	      hash,
	      equals
	    };
	  }
	  const toSetOn = {};
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
	        }
	        if (key instanceof Date) {
	          toSetOn.hash = key.getTime();
	          return toSetOn;
	        }
	        if (key instanceof RegExp) {
	          toSetOn.hash = hash(key.toString());
	          return toSetOn;
	        }
	        if (key instanceof Option) {
	          if (key.has) {
	            toSetOn.hash = 31 * hashCodeFor(key.value);
	            return toSetOn;
	          }
	          toSetOn.hash = 0;
	          return toSetOn;
	        }
	        if (Object.prototype.hasOwnProperty.call(key, '_mootable_hashCode')) {
	          toSetOn.hash = hashCodeFor(key._mootable_hashCode);
	          return toSetOn;
	        }
	        const hashCode = HASH_COUNTER++;
	        Object.defineProperty(key, '_mootable_hashCode', {
	          value: hashCode
	        });
	        toSetOn.hash = hashCode;
	        return toSetOn;
	      }
	  }
	}

	class HashMap {
	  constructor(copy) {
	    this.buckets = new HashBuckets(this);
	    if (copy) {
	      this.copy(copy);
	    }
	  }
	  get size() {
	    return this.buckets.size;
	  }
	  get length() {
	    return this.buckets.size;
	  }
	  has(key, overrides) {
	    const op = this.equalsAndHash(key, overrides);
	    return this.buckets.has(key, op);
	  }
	  get(key, overrides) {
	    const op = this.equalsAndHash(key, overrides);
	    return this.buckets.get(key, op);
	  }
	  keyOf(value, overrides) {
	    const equals = overrides && isFunction(overrides.equals) ? overrides.equals : this.equalsFor(value);
	    for (const entry of this.entries()) {
	      if (equals(value, entry[1])) {
	        return entry[0];
	      }
	    }
	    return undefined;
	  }
	  lastKeyOf(value, overrides) {
	    const equals = overrides && isFunction(overrides.equals) ? overrides.equals : this.equalsFor(value);
	    for (const entry of this.entriesRight()) {
	      if (equals(value, entry[1])) {
	        return entry[0];
	      }
	    }
	    return undefined;
	  }
	  optionalKeyOf(value, overrides) {
	    const equals = overrides && isFunction(overrides.equals) ? overrides.equals : this.equalsFor(value);
	    for (const entry of this.entries()) {
	      if (equals(value, entry[1])) {
	        return some(entry[0]);
	      }
	    }
	    return none;
	  }
	  optionalLastKeyOf(value, overrides) {
	    const equals = overrides && isFunction(overrides.equals) ? overrides.equals : this.equalsFor(value);
	    for (const entry of this.entriesRight()) {
	      if (equals(value, entry[1])) {
	        return some(entry[0]);
	      }
	    }
	    return none;
	  }
	  optionalGet(key, overrides) {
	    const op = this.equalsAndHash(key, overrides);
	    return this.buckets.optionalGet(key, op);
	  }
	  find(findPredicate = () => true, thisArg = undefined) {
	    for (const [key, value] of this.entries()) {
	      if (findPredicate.call(thisArg, value, key, this)) {
	        return value;
	      }
	    }
	    return undefined;
	  }
	  findLast(findPredicate = () => true, thisArg = undefined) {
	    for (const [key, value] of this.entriesRight()) {
	      if (findPredicate.call(thisArg, value, key, this)) {
	        return value;
	      }
	    }
	    return undefined;
	  }
	  optionalFind(findPredicate = () => true, thisArg = undefined) {
	    for (const [key, value] of this.entries()) {
	      if (findPredicate.call(thisArg, value, key, this)) {
	        return some(value);
	      }
	    }
	    return none;
	  }
	  optionalFindLast(findPredicate = () => true, thisArg = undefined) {
	    for (const [key, value] of this.entriesRight()) {
	      if (findPredicate.call(thisArg, value, key, this)) {
	        return some(value);
	      }
	    }
	    return none;
	  }
	  findKey(findKeyPredicate = (value, key) => key, thisArg = undefined) {
	    for (const [key, value] of this.entries()) {
	      if (findKeyPredicate.call(thisArg, value, key, this)) {
	        return key;
	      }
	    }
	    return undefined;
	  }
	  findLastKey(findKeyPredicate = (value, key) => key, thisArg = undefined) {
	    for (const [key, value] of this.entriesRight()) {
	      if (findKeyPredicate.call(thisArg, value, key, this)) {
	        return key;
	      }
	    }
	    return undefined;
	  }
	  optionalFindKey(findKeyPredicate = (value, key) => key, thisArg = undefined) {
	    for (const [key, value] of this.entries()) {
	      if (findKeyPredicate.call(thisArg, value, key, this)) {
	        return some(key);
	      }
	    }
	    return none;
	  }
	  optionalFindLastKey(findKeyPredicate = (value, key) => key, thisArg = undefined) {
	    for (const [key, value] of this.entriesRight()) {
	      if (findKeyPredicate.call(thisArg, value, key, this)) {
	        return some(key);
	      }
	    }
	    return none;
	  }
	  set(key, value, overrides) {
	    const op = this.equalsAndHash(key, overrides);
	    this.buckets.set(key, value, op);
	    return this;
	  }
	  emplace(key, handler, overrides) {
	    const op = this.equalsAndHash(key, overrides);
	    return this.buckets.emplace(key, handler, op);
	  }
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
	    throw new TypeError('HashMap.copy expects an object which is iterable, has an entries iterable function, or has a forEach function on it');
	  }
	  clone() {
	    return new HashMap(this);
	  }
	  delete(key, overrides) {
	    const op = this.equalsAndHash(key, overrides);
	    this.buckets.delete(key, op);
	    return this;
	  }
	  clear() {
	    this.buckets.clear();
	    return this;
	  }
	  forEach(callback, thisArg) {
	    for (const entry of this.entries()) {
	      callback.call(thisArg, entry[1], entry[0], this);
	    }
	    return this;
	  }
	  forEachRight(callback, thisArg) {
	    for (const entry of this.entriesRight()) {
	      callback.call(thisArg, entry[1], entry[0], this);
	    }
	    return this;
	  }
	  every(everyPredicate = () => true, thisArg = undefined, overrides = undefined) {
	    const iterator = overrides && overrides.reverse ? this.entriesRight() : this.entries();
	    for (const [key, value] of iterator) {
	      if (!everyPredicate.call(thisArg, value, key, this)) {
	        return false;
	      }
	    }
	    return true;
	  }
	  some(somePredicate = () => true, thisArg = undefined, overrides = undefined) {
	    const iterator = overrides && overrides.reverse ? this.entriesRight() : this.entries();
	    for (const [key, value] of iterator) {
	      if (somePredicate.call(thisArg, value, key, this)) {
	        return true;
	      }
	    }
	    return false;
	  }
	  reduce(reduceFunction, initialValue, thisArg) {
	    let accumulator = initialValue;
	    if (initialValue === undefined) {
	      let first = true;
	      for (const [key, value] of this.entries()) {
	        if (first) {
	          first = false;
	          accumulator = value;
	        } else {
	          accumulator = reduceFunction.call(thisArg, accumulator, value, key, this);
	        }
	      }
	    } else {
	      for (const [key, value] of this.entries()) {
	        accumulator = reduceFunction.call(thisArg, accumulator, value, key, this);
	      }
	    }
	    return accumulator;
	  }
	  reduceRight(reduceFunction, initialValue, thisArg) {
	    let accumulator = initialValue;
	    if (initialValue === undefined) {
	      let first = true;
	      for (const [key, value] of this.entriesRight()) {
	        if (first) {
	          first = false;
	          accumulator = value;
	        } else {
	          accumulator = reduceFunction.call(thisArg, accumulator, value, key, this);
	        }
	      }
	    } else {
	      for (const [key, value] of this.entriesRight()) {
	        accumulator = reduceFunction.call(thisArg, accumulator, value, key, this);
	      }
	    }
	    return accumulator;
	  }
	  *[Symbol.iterator]() {
	    yield* this.entries();
	  }
	  *entries() {
	    yield* this.buckets;
	  }
	  *entriesRight() {
	    yield* this.buckets.entriesRight();
	  }
	  *keys() {
	    yield* this.buckets.keys();
	  }
	  *values() {
	    yield* this.buckets.values();
	  }
	  *keysRight() {
	    yield* this.buckets.keysRight();
	  }
	  *valuesRight() {
	    yield* this.buckets.valuesRight();
	  }
	}
	Object.defineProperty(HashMap.prototype, 'equalsFor', {
	  value: equalsFor,
	  configurable: true
	});
	Object.defineProperty(HashMap.prototype, 'equalsAndHash', {
	  value: equalsAndHash,
	  configurable: true
	});
	Object.defineProperty(HashMap.prototype, 'createContainer', {
	  value: function createContainer(parent, hash) {
	    return new Container(this, parent, hash);
	  },
	  configurable: true
	});

	class LinkedHashMap extends HashMap {
	  constructor(copy) {
	    super(copy);
	    if (this.size === 0) {
	      this.start = undefined;
	      this.end = undefined;
	    }
	  }
	  clear() {
	    this.start = undefined;
	    this.end = undefined;
	    return super.clear();
	  }
	  setLeft(key, value, overrides) {
	    const op = this.equalsAndHash(key, overrides);
	    op.addToStart = true;
	    this.buckets.set(key, value, op);
	    return this;
	  }
	  emplaceLeft(key, handler, overrides) {
	    const op = this.equalsAndHash(key, overrides);
	    op.addToStart = true;
	    return this.buckets.emplace(key, handler, op);
	  }
	  push(key, value, overrides) {
	    const op = this.equalsAndHash(key, overrides);
	    op.moveOnUpdate = true;
	    this.buckets.set(key, value, op);
	    return this;
	  }
	  pushEmplace(key, handler, overrides) {
	    const op = this.equalsAndHash(key, overrides);
	    op.moveOnUpdate = true;
	    return this.buckets.emplace(key, handler, op);
	  }
	  unshift(key, value, overrides) {
	    const op = this.equalsAndHash(key, overrides);
	    op.moveOnUpdate = true;
	    op.addToStart = true;
	    this.buckets.set(key, value, op);
	    return this;
	  }
	  unshiftEmplace(key, handler, overrides) {
	    const op = this.equalsAndHash(key, overrides);
	    op.moveOnUpdate = true;
	    op.addToStart = true;
	    return this.buckets.emplace(key, handler, op);
	  }
	  shift() {
	    const entry = this.start;
	    if (entry) {
	      entry.parent.deleteEntry(entry);
	      return entry.slice();
	    }
	    return undefined;
	  }
	  pop() {
	    const entry = this.end;
	    if (entry) {
	      entry.parent.deleteEntry(entry);
	      return entry.slice();
	    }
	    return undefined;
	  }
	  head() {
	    const entry = this.start;
	    if (entry) {
	      return entry[1];
	    }
	    return undefined;
	  }
	  tail() {
	    const entry = this.end;
	    if (entry) {
	      return entry[1];
	    }
	    return undefined;
	  }
	  optionalHead() {
	    const entry = this.start;
	    if (entry) {
	      return some(entry[1]);
	    }
	    return none;
	  }
	  optionalTail() {
	    const entry = this.end;
	    if (entry) {
	      return some(entry[1]);
	    }
	    return none;
	  }
	  headKey() {
	    const entry = this.start;
	    if (entry) {
	      return entry[0];
	    }
	    return undefined;
	  }
	  tailKey() {
	    const entry = this.end;
	    if (entry) {
	      return entry[0];
	    }
	    return undefined;
	  }
	  optionalHeadKey() {
	    const entry = this.start;
	    if (entry) {
	      return some(entry[0]);
	    }
	    return none;
	  }
	  optionalTailKey() {
	    const entry = this.end;
	    if (entry) {
	      return some(entry[0]);
	    }
	    return none;
	  }
	  reverse() {
	    if (this.size > 1) {
	      let entry = this.start;
	      do {
	        const previous = entry.previous;
	        const next = entry.next;
	        entry.previous = next;
	        entry.next = previous;
	        entry = next;
	      } while (entry);
	      const start = this.start;
	      this.start = this.end;
	      this.end = start;
	    }
	    return this;
	  }
	  clone() {
	    return new LinkedHashMap(this);
	  }
	  *[Symbol.iterator]() {
	    yield* this.entries();
	  }
	  *entries() {
	    let entry = this.start;
	    while (entry) {
	      yield entry.slice();
	      entry = entry.next;
	    }
	  }
	  *entriesRight() {
	    let entry = this.end;
	    while (entry) {
	      yield entry.slice();
	      entry = entry.previous;
	    }
	  }
	  *keys() {
	    let entry = this.start;
	    while (entry) {
	      yield entry[0];
	      entry = entry.next;
	    }
	  }
	  *values() {
	    let entry = this.start;
	    while (entry) {
	      yield entry[1];
	      entry = entry.next;
	    }
	  }
	  *keysRight() {
	    let entry = this.end;
	    while (entry) {
	      yield entry[0];
	      entry = entry.previous;
	    }
	  }
	  *valuesRight() {
	    let entry = this.end;
	    while (entry) {
	      yield entry[1];
	      entry = entry.previous;
	    }
	  }
	}
	Object.defineProperty(LinkedHashMap.prototype, 'createContainer', {
	  value: function createContainer(parent, hash) {
	    return new LinkedContainer(this, parent, hash);
	  },
	  configurable: true
	});
	class LinkedContainer extends Container {
	  constructor(map, parent, hash) {
	    super(map, parent, hash);
	  }
	  createEntry(key, value, overrides) {
	    const entry = super.createEntry(key, value, overrides);
	    const map = this.map;
	    if (map.start === undefined) {
	      map.end = map.start = entry;
	    } else if (overrides.addToStart) {
	      map.start.previous = entry;
	      entry.next = map.start;
	      map.start = entry;
	    } else {
	      map.end.next = entry;
	      entry.previous = map.end;
	      map.end = entry;
	    }
	    return entry;
	  }
	  updateEntry(entry, newValue, overrides) {
	    super.updateEntry(entry, newValue, overrides);
	    if (overrides.moveOnUpdate) {
	      if (overrides.addToStart) {
	        if (entry.previous) {
	          if (entry.next) {
	            entry.next.previous = entry.previous;
	          }
	          entry.previous.next = entry.next;
	          if (entry === this.map.end) {
	            this.map.end = entry.previous;
	          }
	          entry.previous = undefined;
	          this.map.start.previous = entry;
	          entry.next = this.map.start;
	          this.map.start = entry;
	        }
	      } else if (entry.next) {
	        if (entry.previous) {
	          entry.previous.next = entry.next;
	        }
	        entry.next.previous = entry.previous;
	        if (entry === this.map.start) {
	          this.map.start = entry.next;
	        }
	        entry.next = undefined;
	        this.map.end.next = entry;
	        entry.previous = this.map.end;
	        this.map.end = entry;
	      }
	    }
	  }
	  deleteIndex(idx) {
	    const oldEntry = super.deleteIndex(idx);
	    const map = this.map;
	    if (oldEntry.previous) {
	      oldEntry.previous.next = oldEntry.next;
	    } else {
	      map.start = oldEntry.next;
	    }
	    if (oldEntry.next) {
	      oldEntry.next.previous = oldEntry.previous;
	    } else {
	      map.end = oldEntry.previous;
	    }
	  }
	}

	const Mootable = {
	  HashMap,
	  LinkedHashMap,
	  hash,
	  isFunction,
	  isIterable,
	  isString,
	  equalsAndHash,
	  hashCodeFor,
	  equalsFor,
	  some,
	  none,
	  Option,
	  sameValueZero,
	  strictEquals,
	  abstractEquals,
	  sameValue,
	  hammingWeight
	};

	exports.HashMap = HashMap;
	exports.LinkedHashMap = LinkedHashMap;
	exports.Mootable = Mootable;
	exports.default = LinkedHashMap;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
