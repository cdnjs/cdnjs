(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.IMask = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global$f =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || commonjsGlobal || Function('return this')();

	var fails$l = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	var fails$k = fails$l;

	var functionBindNative = !fails$k(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});

	var NATIVE_BIND$4 = functionBindNative;

	var FunctionPrototype$4 = Function.prototype;
	var apply$2 = FunctionPrototype$4.apply;
	var call$a = FunctionPrototype$4.call;

	// eslint-disable-next-line es/no-reflect -- safe
	var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$4 ? call$a.bind(apply$2) : function () {
	  return call$a.apply(apply$2, arguments);
	});

	var NATIVE_BIND$3 = functionBindNative;

	var FunctionPrototype$3 = Function.prototype;
	var call$9 = FunctionPrototype$3.call;
	var uncurryThisWithBind = NATIVE_BIND$3 && FunctionPrototype$3.bind.bind(call$9, call$9);

	var functionUncurryThis = NATIVE_BIND$3 ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call$9.apply(fn, arguments);
	  };
	};

	var uncurryThis$r = functionUncurryThis;

	var toString$c = uncurryThis$r({}.toString);
	var stringSlice$3 = uncurryThis$r(''.slice);

	var classofRaw$2 = function (it) {
	  return stringSlice$3(toString$c(it), 8, -1);
	};

	var classofRaw$1 = classofRaw$2;
	var uncurryThis$q = functionUncurryThis;

	var functionUncurryThisClause = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw$1(fn) === 'Function') return uncurryThis$q(fn);
	};

	var documentAll$2 = typeof document == 'object' && document.all;

	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
	var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

	var documentAll_1 = {
	  all: documentAll$2,
	  IS_HTMLDDA: IS_HTMLDDA
	};

	var $documentAll$1 = documentAll_1;

	var documentAll$1 = $documentAll$1.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	var isCallable$g = $documentAll$1.IS_HTMLDDA ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll$1;
	} : function (argument) {
	  return typeof argument == 'function';
	};

	var objectGetOwnPropertyDescriptor = {};

	var fails$j = fails$l;

	// Detect IE8's incomplete defineProperty implementation
	var descriptors = !fails$j(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var NATIVE_BIND$2 = functionBindNative;

	var call$8 = Function.prototype.call;

	var functionCall = NATIVE_BIND$2 ? call$8.bind(call$8) : function () {
	  return call$8.apply(call$8, arguments);
	};

	var objectPropertyIsEnumerable = {};

	var $propertyIsEnumerable$2 = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable$2.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor$2(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable$2;

	var createPropertyDescriptor$5 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var uncurryThis$p = functionUncurryThis;
	var fails$i = fails$l;
	var classof$a = classofRaw$2;

	var $Object$4 = Object;
	var split = uncurryThis$p(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails$i(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object$4('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof$a(it) == 'String' ? split(it, '') : $Object$4(it);
	} : $Object$4;

	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	var isNullOrUndefined$2 = function (it) {
	  return it === null || it === undefined;
	};

	var isNullOrUndefined$1 = isNullOrUndefined$2;

	var $TypeError$b = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible$7 = function (it) {
	  if (isNullOrUndefined$1(it)) throw $TypeError$b("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject$3 = indexedObject;
	var requireObjectCoercible$6 = requireObjectCoercible$7;

	var toIndexedObject$9 = function (it) {
	  return IndexedObject$3(requireObjectCoercible$6(it));
	};

	var isCallable$f = isCallable$g;
	var $documentAll = documentAll_1;

	var documentAll = $documentAll.all;

	var isObject$c = $documentAll.IS_HTMLDDA ? function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$f(it) || it === documentAll;
	} : function (it) {
	  return typeof it == 'object' ? it !== null : isCallable$f(it);
	};

	var path$b = {};

	var path$a = path$b;
	var global$e = global$f;
	var isCallable$e = isCallable$g;

	var aFunction = function (variable) {
	  return isCallable$e(variable) ? variable : undefined;
	};

	var getBuiltIn$9 = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path$a[namespace]) || aFunction(global$e[namespace])
	    : path$a[namespace] && path$a[namespace][method] || global$e[namespace] && global$e[namespace][method];
	};

	var uncurryThis$o = functionUncurryThis;

	var objectIsPrototypeOf = uncurryThis$o({}.isPrototypeOf);

	var engineUserAgent = typeof navigator != 'undefined' && String(navigator.userAgent) || '';

	var global$d = global$f;
	var userAgent$3 = engineUserAgent;

	var process$1 = global$d.process;
	var Deno = global$d.Deno;
	var versions = process$1 && process$1.versions || Deno && Deno.version;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
	  // but their correct versions are not interesting for us
	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
	}

	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
	// so check `userAgent` even if `.v8` exists, but 0
	if (!version && userAgent$3) {
	  match = userAgent$3.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent$3.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	var engineV8Version = version;

	/* eslint-disable es/no-symbol -- required for testing */

	var V8_VERSION$2 = engineV8Version;
	var fails$h = fails$l;
	var global$c = global$f;

	var $String$5 = global$c.String;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$h(function () {
	  var symbol = Symbol();
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
	  // of course, fail.
	  return !$String$5(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
	});

	/* eslint-disable es/no-symbol -- required for testing */

	var NATIVE_SYMBOL$5 = symbolConstructorDetection;

	var useSymbolAsUid = NATIVE_SYMBOL$5
	  && !Symbol.sham
	  && typeof Symbol.iterator == 'symbol';

	var getBuiltIn$8 = getBuiltIn$9;
	var isCallable$d = isCallable$g;
	var isPrototypeOf$f = objectIsPrototypeOf;
	var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

	var $Object$3 = Object;

	var isSymbol$5 = USE_SYMBOL_AS_UID$1 ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn$8('Symbol');
	  return isCallable$d($Symbol) && isPrototypeOf$f($Symbol.prototype, $Object$3(it));
	};

	var $String$4 = String;

	var tryToString$3 = function (argument) {
	  try {
	    return $String$4(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};

	var isCallable$c = isCallable$g;
	var tryToString$2 = tryToString$3;

	var $TypeError$a = TypeError;

	// `Assert: IsCallable(argument) is true`
	var aCallable$6 = function (argument) {
	  if (isCallable$c(argument)) return argument;
	  throw $TypeError$a(tryToString$2(argument) + ' is not a function');
	};

	var aCallable$5 = aCallable$6;
	var isNullOrUndefined = isNullOrUndefined$2;

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	var getMethod$1 = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined(func) ? undefined : aCallable$5(func);
	};

	var call$7 = functionCall;
	var isCallable$b = isCallable$g;
	var isObject$b = isObject$c;

	var $TypeError$9 = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	var ordinaryToPrimitive$1 = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable$b(fn = input.toString) && !isObject$b(val = call$7(fn, input))) return val;
	  if (isCallable$b(fn = input.valueOf) && !isObject$b(val = call$7(fn, input))) return val;
	  if (pref !== 'string' && isCallable$b(fn = input.toString) && !isObject$b(val = call$7(fn, input))) return val;
	  throw $TypeError$9("Can't convert object to primitive value");
	};

	var shared$7 = {exports: {}};

	var global$b = global$f;

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty$c = Object.defineProperty;

	var defineGlobalProperty$1 = function (key, value) {
	  try {
	    defineProperty$c(global$b, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    global$b[key] = value;
	  } return value;
	};

	var global$a = global$f;
	var defineGlobalProperty = defineGlobalProperty$1;

	var SHARED = '__core-js_shared__';
	var store$3 = global$a[SHARED] || defineGlobalProperty(SHARED, {});

	var sharedStore = store$3;

	var store$2 = sharedStore;

	(shared$7.exports = function (key, value) {
	  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.31.1',
	  mode: 'pure' ,
	  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.31.1/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});

	var sharedExports = shared$7.exports;

	var requireObjectCoercible$5 = requireObjectCoercible$7;

	var $Object$2 = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	var toObject$a = function (argument) {
	  return $Object$2(requireObjectCoercible$5(argument));
	};

	var uncurryThis$n = functionUncurryThis;
	var toObject$9 = toObject$a;

	var hasOwnProperty = uncurryThis$n({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject$9(it), key);
	};

	var uncurryThis$m = functionUncurryThis;

	var id = 0;
	var postfix = Math.random();
	var toString$b = uncurryThis$m(1.0.toString);

	var uid$3 = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$b(++id + postfix, 36);
	};

	var global$9 = global$f;
	var shared$6 = sharedExports;
	var hasOwn$c = hasOwnProperty_1;
	var uid$2 = uid$3;
	var NATIVE_SYMBOL$4 = symbolConstructorDetection;
	var USE_SYMBOL_AS_UID = useSymbolAsUid;

	var Symbol$3 = global$9.Symbol;
	var WellKnownSymbolsStore$2 = shared$6('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$3['for'] || Symbol$3 : Symbol$3 && Symbol$3.withoutSetter || uid$2;

	var wellKnownSymbol$i = function (name) {
	  if (!hasOwn$c(WellKnownSymbolsStore$2, name)) {
	    WellKnownSymbolsStore$2[name] = NATIVE_SYMBOL$4 && hasOwn$c(Symbol$3, name)
	      ? Symbol$3[name]
	      : createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore$2[name];
	};

	var call$6 = functionCall;
	var isObject$a = isObject$c;
	var isSymbol$4 = isSymbol$5;
	var getMethod = getMethod$1;
	var ordinaryToPrimitive = ordinaryToPrimitive$1;
	var wellKnownSymbol$h = wellKnownSymbol$i;

	var $TypeError$8 = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol$h('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	var toPrimitive$6 = function (input, pref) {
	  if (!isObject$a(input) || isSymbol$4(input)) return input;
	  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call$6(exoticToPrim, input, pref);
	    if (!isObject$a(result) || isSymbol$4(result)) return result;
	    throw $TypeError$8("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};

	var toPrimitive$5 = toPrimitive$6;
	var isSymbol$3 = isSymbol$5;

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	var toPropertyKey$4 = function (argument) {
	  var key = toPrimitive$5(argument, 'string');
	  return isSymbol$3(key) ? key : key + '';
	};

	var global$8 = global$f;
	var isObject$9 = isObject$c;

	var document$1 = global$8.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS$1 = isObject$9(document$1) && isObject$9(document$1.createElement);

	var documentCreateElement$1 = function (it) {
	  return EXISTS$1 ? document$1.createElement(it) : {};
	};

	var DESCRIPTORS$c = descriptors;
	var fails$g = fails$l;
	var createElement = documentCreateElement$1;

	// Thanks to IE8 for its funny defineProperty
	var ie8DomDefine = !DESCRIPTORS$c && !fails$g(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var DESCRIPTORS$b = descriptors;
	var call$5 = functionCall;
	var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
	var createPropertyDescriptor$4 = createPropertyDescriptor$5;
	var toIndexedObject$8 = toIndexedObject$9;
	var toPropertyKey$3 = toPropertyKey$4;
	var hasOwn$b = hasOwnProperty_1;
	var IE8_DOM_DEFINE$1 = ie8DomDefine;

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS$b ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject$8(O);
	  P = toPropertyKey$3(P);
	  if (IE8_DOM_DEFINE$1) try {
	    return $getOwnPropertyDescriptor$2(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn$b(O, P)) return createPropertyDescriptor$4(!call$5(propertyIsEnumerableModule$2.f, O, P), O[P]);
	};

	var fails$f = fails$l;
	var isCallable$a = isCallable$g;

	var replacement = /#|\.prototype\./;

	var isForced$1 = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : isCallable$a(detection) ? fails$f(detection)
	    : !!detection;
	};

	var normalize = isForced$1.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced$1.data = {};
	var NATIVE = isForced$1.NATIVE = 'N';
	var POLYFILL = isForced$1.POLYFILL = 'P';

	var isForced_1 = isForced$1;

	var uncurryThis$l = functionUncurryThisClause;
	var aCallable$4 = aCallable$6;
	var NATIVE_BIND$1 = functionBindNative;

	var bind$9 = uncurryThis$l(uncurryThis$l.bind);

	// optional / simple context binding
	var functionBindContext = function (fn, that) {
	  aCallable$4(fn);
	  return that === undefined ? fn : NATIVE_BIND$1 ? bind$9(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var objectDefineProperty = {};

	var DESCRIPTORS$a = descriptors;
	var fails$e = fails$l;

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	var v8PrototypeDefineBug = DESCRIPTORS$a && fails$e(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype != 42;
	});

	var isObject$8 = isObject$c;

	var $String$3 = String;
	var $TypeError$7 = TypeError;

	// `Assert: Type(argument) is Object`
	var anObject$5 = function (argument) {
	  if (isObject$8(argument)) return argument;
	  throw $TypeError$7($String$3(argument) + ' is not an object');
	};

	var DESCRIPTORS$9 = descriptors;
	var IE8_DOM_DEFINE = ie8DomDefine;
	var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
	var anObject$4 = anObject$5;
	var toPropertyKey$2 = toPropertyKey$4;

	var $TypeError$6 = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty$1 = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE$1 = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS$9 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
	  anObject$4(O);
	  P = toPropertyKey$2(P);
	  anObject$4(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor$1(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty$1(O, P, Attributes);
	} : $defineProperty$1 : function defineProperty(O, P, Attributes) {
	  anObject$4(O);
	  P = toPropertyKey$2(P);
	  anObject$4(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty$1(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$6('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var DESCRIPTORS$8 = descriptors;
	var definePropertyModule$3 = objectDefineProperty;
	var createPropertyDescriptor$3 = createPropertyDescriptor$5;

	var createNonEnumerableProperty$5 = DESCRIPTORS$8 ? function (object, key, value) {
	  return definePropertyModule$3.f(object, key, createPropertyDescriptor$3(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var global$7 = global$f;
	var apply$1 = functionApply;
	var uncurryThis$k = functionUncurryThisClause;
	var isCallable$9 = isCallable$g;
	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var isForced = isForced_1;
	var path$9 = path$b;
	var bind$8 = functionBindContext;
	var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
	var hasOwn$a = hasOwnProperty_1;

	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof Wrapper) {
	      switch (arguments.length) {
	        case 0: return new NativeConstructor();
	        case 1: return new NativeConstructor(a);
	        case 2: return new NativeConstructor(a, b);
	      } return new NativeConstructor(a, b, c);
	    } return apply$1(NativeConstructor, this, arguments);
	  };
	  Wrapper.prototype = NativeConstructor.prototype;
	  return Wrapper;
	};

	/*
	  options.target         - name of the target object
	  options.global         - target is the global object
	  options.stat           - export as static methods of target
	  options.proto          - export as prototype methods of target
	  options.real           - real prototype method for the `pure` version
	  options.forced         - export even if the native feature is available
	  options.bind           - bind methods to the target, required for the `pure` version
	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
	  options.sham           - add a flag to not completely full polyfills
	  options.enumerable     - export as enumerable property
	  options.dontCallGetSet - prevent calling a getter on target
	  options.name           - the .name of the function if it does not match the key
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var PROTO = options.proto;

	  var nativeSource = GLOBAL ? global$7 : STATIC ? global$7[TARGET] : (global$7[TARGET] || {}).prototype;

	  var target = GLOBAL ? path$9 : path$9[TARGET] || createNonEnumerableProperty$4(path$9, TARGET, {})[TARGET];
	  var targetPrototype = target.prototype;

	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contains in native
	    USE_NATIVE = !FORCED && nativeSource && hasOwn$a(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor$1(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

	    // bind methods to global for calling from export context
	    if (options.bind && USE_NATIVE) resultProperty = bind$8(sourceProperty, global$7);
	    // wrap global constructors for prevent changes in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && isCallable$9(sourceProperty)) resultProperty = uncurryThis$k(sourceProperty);
	    // default case
	    else resultProperty = sourceProperty;

	    // add a flag to not completely full polyfills
	    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty$4(resultProperty, 'sham', true);
	    }

	    createNonEnumerableProperty$4(target, key, resultProperty);

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
	      if (!hasOwn$a(path$9, VIRTUAL_PROTOTYPE)) {
	        createNonEnumerableProperty$4(path$9, VIRTUAL_PROTOTYPE, {});
	      }
	      // export virtual prototype methods
	      createNonEnumerableProperty$4(path$9[VIRTUAL_PROTOTYPE], key, sourceProperty);
	      // export real prototype methods
	      if (options.real && targetPrototype && (FORCED || !targetPrototype[key])) {
	        createNonEnumerableProperty$4(targetPrototype, key, sourceProperty);
	      }
	    }
	  }
	};

	var $$x = _export;
	var global$6 = global$f;

	// `globalThis` object
	// https://tc39.es/ecma262/#sec-globalthis
	$$x({ global: true, forced: global$6.globalThis !== global$6 }, {
	  globalThis: global$6
	});

	var globalThis$5 = global$f;

	var parent$L = globalThis$5;

	var globalThis$4 = parent$L;

	var parent$K = globalThis$4;

	var globalThis$3 = parent$K;

	// TODO: remove from `core-js@4`


	var parent$J = globalThis$3;

	var globalThis$2 = parent$J;

	var globalThis$1 = globalThis$2;

	var _globalThis = /*@__PURE__*/getDefaultExportFromCjs(globalThis$1);

	var ceil$1 = Math.ceil;
	var floor$1 = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	var mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor$1 : ceil$1)(n);
	};

	var trunc = mathTrunc;

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	var toIntegerOrInfinity$5 = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};

	var toIntegerOrInfinity$4 = toIntegerOrInfinity$5;

	var max$3 = Math.max;
	var min$3 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex$4 = function (index, length) {
	  var integer = toIntegerOrInfinity$4(index);
	  return integer < 0 ? max$3(integer + length, 0) : min$3(integer, length);
	};

	var toIntegerOrInfinity$3 = toIntegerOrInfinity$5;

	var min$2 = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	var toLength$3 = function (argument) {
	  return argument > 0 ? min$2(toIntegerOrInfinity$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var toLength$2 = toLength$3;

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	var lengthOfArrayLike$8 = function (obj) {
	  return toLength$2(obj.length);
	};

	var toIndexedObject$7 = toIndexedObject$9;
	var toAbsoluteIndex$3 = toAbsoluteIndex$4;
	var lengthOfArrayLike$7 = lengthOfArrayLike$8;

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod$5 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject$7($this);
	    var length = lengthOfArrayLike$7(O);
	    var index = toAbsoluteIndex$3(fromIndex, length);
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
	  includes: createMethod$5(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$5(false)
	};

	var hiddenKeys$5 = {};

	var uncurryThis$j = functionUncurryThis;
	var hasOwn$9 = hasOwnProperty_1;
	var toIndexedObject$6 = toIndexedObject$9;
	var indexOf$6 = arrayIncludes.indexOf;
	var hiddenKeys$4 = hiddenKeys$5;

	var push$5 = uncurryThis$j([].push);

	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject$6(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn$9(hiddenKeys$4, key) && hasOwn$9(O, key) && push$5(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn$9(O, key = names[i++])) {
	    ~indexOf$6(result, key) || push$5(result, key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
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

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	var objectKeys$4 = Object.keys || function keys(O) {
	  return internalObjectKeys$1(O, enumBugKeys$2);
	};

	var $$w = _export;
	var toObject$8 = toObject$a;
	var nativeKeys = objectKeys$4;
	var fails$d = fails$l;

	var FAILS_ON_PRIMITIVES = fails$d(function () { nativeKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	$$w({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return nativeKeys(toObject$8(it));
	  }
	});

	var path$8 = path$b;

	var keys$5 = path$8.Object.keys;

	var parent$I = keys$5;

	var keys$4 = parent$I;

	var _Object$keys$1 = /*@__PURE__*/getDefaultExportFromCjs(keys$4);

	var parent$H = keys$4;

	var keys$3 = parent$H;

	var parent$G = keys$3;

	var keys$2 = parent$G;

	var keys$1 = keys$2;

	var _Object$keys = /*@__PURE__*/getDefaultExportFromCjs(keys$1);

	var fails$c = fails$l;

	var arrayMethodIsStrict$3 = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails$c(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};

	/* eslint-disable es/no-array-prototype-indexof -- required for testing */
	var $$v = _export;
	var uncurryThis$i = functionUncurryThisClause;
	var $indexOf = arrayIncludes.indexOf;
	var arrayMethodIsStrict$2 = arrayMethodIsStrict$3;

	var nativeIndexOf = uncurryThis$i([].indexOf);

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
	var FORCED$4 = NEGATIVE_ZERO || !arrayMethodIsStrict$2('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.es/ecma262/#sec-array.prototype.indexof
	$$v({ target: 'Array', proto: true, forced: FORCED$4 }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf(this, searchElement, fromIndex) || 0
	      : $indexOf(this, searchElement, fromIndex);
	  }
	});

	var path$7 = path$b;

	var entryVirtual$f = function (CONSTRUCTOR) {
	  return path$7[CONSTRUCTOR + 'Prototype'];
	};

	var entryVirtual$e = entryVirtual$f;

	var indexOf$5 = entryVirtual$e('Array').indexOf;

	var isPrototypeOf$e = objectIsPrototypeOf;
	var method$c = indexOf$5;

	var ArrayPrototype$8 = Array.prototype;

	var indexOf$4 = function (it) {
	  var own = it.indexOf;
	  return it === ArrayPrototype$8 || (isPrototypeOf$e(ArrayPrototype$8, it) && own === ArrayPrototype$8.indexOf) ? method$c : own;
	};

	var parent$F = indexOf$4;

	var indexOf$3 = parent$F;

	var _indexOfInstanceProperty$1 = /*@__PURE__*/getDefaultExportFromCjs(indexOf$3);

	var parent$E = indexOf$3;

	var indexOf$2 = parent$E;

	var parent$D = indexOf$2;

	var indexOf$1 = parent$D;

	var indexOf = indexOf$1;

	var _indexOfInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(indexOf);

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = _Object$keys(source);
	  var key, i;
	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (_indexOfInstanceProperty(excluded).call(excluded, key) >= 0) continue;
	    target[key] = source[key];
	  }
	  return target;
	}

	var defineProperty$b = {exports: {}};

	var $$u = _export;
	var DESCRIPTORS$7 = descriptors;
	var defineProperty$a = objectDefineProperty.f;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	$$u({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty$a, sham: !DESCRIPTORS$7 }, {
	  defineProperty: defineProperty$a
	});

	var path$6 = path$b;

	var Object$2 = path$6.Object;

	var defineProperty$9 = defineProperty$b.exports = function defineProperty(it, key, desc) {
	  return Object$2.defineProperty(it, key, desc);
	};

	if (Object$2.defineProperty.sham) defineProperty$9.sham = true;

	var definePropertyExports = defineProperty$b.exports;

	var parent$C = definePropertyExports;

	var defineProperty$8 = parent$C;

	var parent$B = defineProperty$8;

	var defineProperty$7 = parent$B;

	var parent$A = defineProperty$7;

	var defineProperty$6 = parent$A;

	var defineProperty$5 = defineProperty$6;

	var _Object$defineProperty = /*@__PURE__*/getDefaultExportFromCjs(defineProperty$5);

	var classof$9 = classofRaw$2;

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	var isArray$5 = Array.isArray || function isArray(argument) {
	  return classof$9(argument) == 'Array';
	};

	var $TypeError$5 = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	var doesNotExceedSafeInteger$2 = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw $TypeError$5('Maximum allowed index exceeded');
	  return it;
	};

	var toPropertyKey$1 = toPropertyKey$4;
	var definePropertyModule$2 = objectDefineProperty;
	var createPropertyDescriptor$2 = createPropertyDescriptor$5;

	var createProperty$4 = function (object, key, value) {
	  var propertyKey = toPropertyKey$1(key);
	  if (propertyKey in object) definePropertyModule$2.f(object, propertyKey, createPropertyDescriptor$2(0, value));
	  else object[propertyKey] = value;
	};

	var wellKnownSymbol$g = wellKnownSymbol$i;

	var TO_STRING_TAG$3 = wellKnownSymbol$g('toStringTag');
	var test$1 = {};

	test$1[TO_STRING_TAG$3] = 'z';

	var toStringTagSupport = String(test$1) === '[object z]';

	var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
	var isCallable$8 = isCallable$g;
	var classofRaw = classofRaw$2;
	var wellKnownSymbol$f = wellKnownSymbol$i;

	var TO_STRING_TAG$2 = wellKnownSymbol$f('toStringTag');
	var $Object$1 = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof$8 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object$1(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && isCallable$8(O.callee) ? 'Arguments' : result;
	};

	var uncurryThis$h = functionUncurryThis;
	var isCallable$7 = isCallable$g;
	var store$1 = sharedStore;

	var functionToString = uncurryThis$h(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable$7(store$1.inspectSource)) {
	  store$1.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	var inspectSource$1 = store$1.inspectSource;

	var uncurryThis$g = functionUncurryThis;
	var fails$b = fails$l;
	var isCallable$6 = isCallable$g;
	var classof$7 = classof$8;
	var getBuiltIn$7 = getBuiltIn$9;
	var inspectSource = inspectSource$1;

	var noop = function () { /* empty */ };
	var empty = [];
	var construct$1 = getBuiltIn$7('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec$1 = uncurryThis$g(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable$6(argument)) return false;
	  try {
	    construct$1(noop, empty, argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable$6(argument)) return false;
	  switch (classof$7(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	var isConstructor$2 = !construct$1 || fails$b(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;

	var isArray$4 = isArray$5;
	var isConstructor$1 = isConstructor$2;
	var isObject$7 = isObject$c;
	var wellKnownSymbol$e = wellKnownSymbol$i;

	var SPECIES$2 = wellKnownSymbol$e('species');
	var $Array$2 = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesConstructor$1 = function (originalArray) {
	  var C;
	  if (isArray$4(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor$1(C) && (C === $Array$2 || isArray$4(C.prototype))) C = undefined;
	    else if (isObject$7(C)) {
	      C = C[SPECIES$2];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array$2 : C;
	};

	var arraySpeciesConstructor = arraySpeciesConstructor$1;

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate$3 = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};

	var fails$a = fails$l;
	var wellKnownSymbol$d = wellKnownSymbol$i;
	var V8_VERSION$1 = engineV8Version;

	var SPECIES$1 = wellKnownSymbol$d('species');

	var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION$1 >= 51 || !fails$a(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var $$t = _export;
	var fails$9 = fails$l;
	var isArray$3 = isArray$5;
	var isObject$6 = isObject$c;
	var toObject$7 = toObject$a;
	var lengthOfArrayLike$6 = lengthOfArrayLike$8;
	var doesNotExceedSafeInteger$1 = doesNotExceedSafeInteger$2;
	var createProperty$3 = createProperty$4;
	var arraySpeciesCreate$2 = arraySpeciesCreate$3;
	var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;
	var wellKnownSymbol$c = wellKnownSymbol$i;
	var V8_VERSION = engineV8Version;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol$c('isConcatSpreadable');

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$9(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var isConcatSpreadable = function (O) {
	  if (!isObject$6(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray$3(O);
	};

	var FORCED$3 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport$4('concat');

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$$t({ target: 'Array', proto: true, arity: 1, forced: FORCED$3 }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject$7(this);
	    var A = arraySpeciesCreate$2(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike$6(E);
	        doesNotExceedSafeInteger$1(n + len);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty$3(A, n, E[k]);
	      } else {
	        doesNotExceedSafeInteger$1(n + 1);
	        createProperty$3(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var classof$6 = classof$8;

	var $String$2 = String;

	var toString$a = function (argument) {
	  if (classof$6(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
	  return $String$2(argument);
	};

	var objectDefineProperties = {};

	var DESCRIPTORS$6 = descriptors;
	var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
	var definePropertyModule$1 = objectDefineProperty;
	var anObject$3 = anObject$5;
	var toIndexedObject$5 = toIndexedObject$9;
	var objectKeys$3 = objectKeys$4;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS$6 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject$3(O);
	  var props = toIndexedObject$5(Properties);
	  var keys = objectKeys$3(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule$1.f(O, key = keys[index++], props[key]);
	  return O;
	};

	var getBuiltIn$6 = getBuiltIn$9;

	var html$1 = getBuiltIn$6('document', 'documentElement');

	var shared$5 = sharedExports;
	var uid$1 = uid$3;

	var keys = shared$5('keys');

	var sharedKey$4 = function (key) {
	  return keys[key] || (keys[key] = uid$1(key));
	};

	/* global ActiveXObject -- old IE, WSH */

	var anObject$2 = anObject$5;
	var definePropertiesModule$1 = objectDefineProperties;
	var enumBugKeys$1 = enumBugKeys$3;
	var hiddenKeys$3 = hiddenKeys$5;
	var html = html$1;
	var documentCreateElement = documentCreateElement$1;
	var sharedKey$3 = sharedKey$4;

	var GT = '>';
	var LT = '<';
	var PROTOTYPE$1 = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO$1 = sharedKey$3('IE_PROTO');

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
	    activeXDocument = new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = typeof document != 'undefined'
	    ? document.domain && activeXDocument
	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	      : NullProtoObjectViaIFrame()
	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
	  var length = enumBugKeys$1.length;
	  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys$1[length]];
	  return NullProtoObject();
	};

	hiddenKeys$3[IE_PROTO$1] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE$1] = anObject$2(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule$1.f(result, Properties);
	};

	var objectGetOwnPropertyNames = {};

	var internalObjectKeys = objectKeysInternal;
	var enumBugKeys = enumBugKeys$3;

	var hiddenKeys$2 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys(O, hiddenKeys$2);
	};

	var objectGetOwnPropertyNamesExternal = {};

	var toAbsoluteIndex$2 = toAbsoluteIndex$4;
	var lengthOfArrayLike$5 = lengthOfArrayLike$8;
	var createProperty$2 = createProperty$4;

	var $Array$1 = Array;
	var max$2 = Math.max;

	var arraySliceSimple = function (O, start, end) {
	  var length = lengthOfArrayLike$5(O);
	  var k = toAbsoluteIndex$2(start, length);
	  var fin = toAbsoluteIndex$2(end === undefined ? length : end, length);
	  var result = $Array$1(max$2(fin - k, 0));
	  for (var n = 0; k < fin; k++, n++) createProperty$2(result, n, O[k]);
	  result.length = n;
	  return result;
	};

	/* eslint-disable es/no-object-getownpropertynames -- safe */

	var classof$5 = classofRaw$2;
	var toIndexedObject$4 = toIndexedObject$9;
	var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var arraySlice$4 = arraySliceSimple;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return $getOwnPropertyNames$1(it);
	  } catch (error) {
	    return arraySlice$4(windowNames);
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
	  return windowNames && classof$5(it) == 'Window'
	    ? getWindowNames(it)
	    : $getOwnPropertyNames$1(toIndexedObject$4(it));
	};

	var objectGetOwnPropertySymbols = {};

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

	var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;

	var defineBuiltIn$4 = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else createNonEnumerableProperty$3(target, key, value);
	  return target;
	};

	var defineProperty$4 = objectDefineProperty;

	var defineBuiltInAccessor$1 = function (target, name, descriptor) {
	  return defineProperty$4.f(target, name, descriptor);
	};

	var wellKnownSymbolWrapped = {};

	var wellKnownSymbol$b = wellKnownSymbol$i;

	wellKnownSymbolWrapped.f = wellKnownSymbol$b;

	var path$5 = path$b;
	var hasOwn$8 = hasOwnProperty_1;
	var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
	var defineProperty$3 = objectDefineProperty.f;

	var wellKnownSymbolDefine = function (NAME) {
	  var Symbol = path$5.Symbol || (path$5.Symbol = {});
	  if (!hasOwn$8(Symbol, NAME)) defineProperty$3(Symbol, NAME, {
	    value: wrappedWellKnownSymbolModule$1.f(NAME)
	  });
	};

	var call$4 = functionCall;
	var getBuiltIn$5 = getBuiltIn$9;
	var wellKnownSymbol$a = wellKnownSymbol$i;
	var defineBuiltIn$3 = defineBuiltIn$4;

	var symbolDefineToPrimitive = function () {
	  var Symbol = getBuiltIn$5('Symbol');
	  var SymbolPrototype = Symbol && Symbol.prototype;
	  var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
	  var TO_PRIMITIVE = wellKnownSymbol$a('toPrimitive');

	  if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
	    // `Symbol.prototype[@@toPrimitive]` method
	    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	    // eslint-disable-next-line no-unused-vars -- required for .length
	    defineBuiltIn$3(SymbolPrototype, TO_PRIMITIVE, function (hint) {
	      return call$4(valueOf, this);
	    }, { arity: 1 });
	  }
	};

	var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
	var classof$4 = classof$8;

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString() {
	  return '[object ' + classof$4(this) + ']';
	};

	var TO_STRING_TAG_SUPPORT = toStringTagSupport;
	var defineProperty$2 = objectDefineProperty.f;
	var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
	var hasOwn$7 = hasOwnProperty_1;
	var toString$9 = objectToString;
	var wellKnownSymbol$9 = wellKnownSymbol$i;

	var TO_STRING_TAG$1 = wellKnownSymbol$9('toStringTag');

	var setToStringTag$5 = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;
	    if (!hasOwn$7(target, TO_STRING_TAG$1)) {
	      defineProperty$2(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
	      createNonEnumerableProperty$2(target, 'toString', toString$9);
	    }
	  }
	};

	var global$5 = global$f;
	var isCallable$5 = isCallable$g;

	var WeakMap$1 = global$5.WeakMap;

	var weakMapBasicDetection = isCallable$5(WeakMap$1) && /native code/.test(String(WeakMap$1));

	var NATIVE_WEAK_MAP = weakMapBasicDetection;
	var global$4 = global$f;
	var isObject$5 = isObject$c;
	var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
	var hasOwn$6 = hasOwnProperty_1;
	var shared$4 = sharedStore;
	var sharedKey$2 = sharedKey$4;
	var hiddenKeys$1 = hiddenKeys$5;

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError$2 = global$4.TypeError;
	var WeakMap = global$4.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject$5(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError$2('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared$4.state) {
	  var store = shared$4.state || (shared$4.state = new WeakMap());
	  /* eslint-disable no-self-assign -- prototype methods protection */
	  store.get = store.get;
	  store.has = store.has;
	  store.set = store.set;
	  /* eslint-enable no-self-assign -- prototype methods protection */
	  set = function (it, metadata) {
	    if (store.has(it)) throw TypeError$2(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    store.set(it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return store.get(it) || {};
	  };
	  has = function (it) {
	    return store.has(it);
	  };
	} else {
	  var STATE = sharedKey$2('state');
	  hiddenKeys$1[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn$6(it, STATE)) throw TypeError$2(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty$1(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn$6(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn$6(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var bind$7 = functionBindContext;
	var uncurryThis$f = functionUncurryThis;
	var IndexedObject$2 = indexedObject;
	var toObject$6 = toObject$a;
	var lengthOfArrayLike$4 = lengthOfArrayLike$8;
	var arraySpeciesCreate$1 = arraySpeciesCreate$3;

	var push$4 = uncurryThis$f([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod$4 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var IS_FILTER_REJECT = TYPE == 7;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject$6($this);
	    var self = IndexedObject$2(O);
	    var boundFunction = bind$7(callbackfn, that);
	    var length = lengthOfArrayLike$4(self);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate$1;
	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
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
	          case 2: push$4(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push$4(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$4(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod$4(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod$4(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod$4(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod$4(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod$4(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$4(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod$4(7)
	};

	var $$s = _export;
	var global$3 = global$f;
	var call$3 = functionCall;
	var uncurryThis$e = functionUncurryThis;
	var DESCRIPTORS$5 = descriptors;
	var NATIVE_SYMBOL$3 = symbolConstructorDetection;
	var fails$8 = fails$l;
	var hasOwn$5 = hasOwnProperty_1;
	var isPrototypeOf$d = objectIsPrototypeOf;
	var anObject$1 = anObject$5;
	var toIndexedObject$3 = toIndexedObject$9;
	var toPropertyKey = toPropertyKey$4;
	var $toString = toString$a;
	var createPropertyDescriptor$1 = createPropertyDescriptor$5;
	var nativeObjectCreate = objectCreate;
	var objectKeys$2 = objectKeys$4;
	var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
	var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
	var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
	var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
	var definePropertyModule = objectDefineProperty;
	var definePropertiesModule = objectDefineProperties;
	var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
	var defineBuiltIn$2 = defineBuiltIn$4;
	var defineBuiltInAccessor = defineBuiltInAccessor$1;
	var shared$3 = sharedExports;
	var sharedKey$1 = sharedKey$4;
	var hiddenKeys = hiddenKeys$5;
	var uid = uid$3;
	var wellKnownSymbol$8 = wellKnownSymbol$i;
	var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
	var defineWellKnownSymbol$l = wellKnownSymbolDefine;
	var defineSymbolToPrimitive$1 = symbolDefineToPrimitive;
	var setToStringTag$4 = setToStringTag$5;
	var InternalStateModule$2 = internalState;
	var $forEach = arrayIteration.forEach;

	var HIDDEN = sharedKey$1('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';

	var setInternalState$2 = InternalStateModule$2.set;
	var getInternalState$2 = InternalStateModule$2.getterFor(SYMBOL);

	var ObjectPrototype$1 = Object[PROTOTYPE];
	var $Symbol = global$3.Symbol;
	var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
	var TypeError$1 = global$3.TypeError;
	var QObject = global$3.QObject;
	var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	var nativeDefineProperty = definePropertyModule.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule$1.f;
	var push$3 = uncurryThis$e([].push);

	var AllSymbols = shared$3('symbols');
	var ObjectPrototypeSymbols = shared$3('op-symbols');
	var WellKnownSymbolsStore$1 = shared$3('wks');

	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = DESCRIPTORS$5 && fails$8(function () {
	  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype$1, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
	    nativeDefineProperty(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
	  setInternalState$2(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!DESCRIPTORS$5) symbol.description = description;
	  return symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject$1(O);
	  var key = toPropertyKey(P);
	  anObject$1(Attributes);
	  if (hasOwn$5(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!hasOwn$5(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor$1(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (hasOwn$5(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$1(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject$1(O);
	  var properties = toIndexedObject$3(Properties);
	  var keys = objectKeys$2(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!DESCRIPTORS$5 || call$3($propertyIsEnumerable$1, properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};

	var $propertyIsEnumerable$1 = function propertyIsEnumerable(V) {
	  var P = toPropertyKey(V);
	  var enumerable = call$3(nativePropertyIsEnumerable, this, P);
	  if (this === ObjectPrototype$1 && hasOwn$5(AllSymbols, P) && !hasOwn$5(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !hasOwn$5(this, P) || !hasOwn$5(AllSymbols, P) || hasOwn$5(this, HIDDEN) && this[HIDDEN][P]
	    ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject$3(O);
	  var key = toPropertyKey(P);
	  if (it === ObjectPrototype$1 && hasOwn$5(AllSymbols, key) && !hasOwn$5(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
	  if (descriptor && hasOwn$5(AllSymbols, key) && !(hasOwn$5(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject$3(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!hasOwn$5(AllSymbols, key) && !hasOwn$5(hiddenKeys, key)) push$3(result, key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function (O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$3(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (hasOwn$5(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$5(ObjectPrototype$1, key))) {
	      push$3(result, AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor
	if (!NATIVE_SYMBOL$3) {
	  $Symbol = function Symbol() {
	    if (isPrototypeOf$d(SymbolPrototype, this)) throw TypeError$1('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype$1) call$3(setter, ObjectPrototypeSymbols, value);
	      if (hasOwn$5(this, HIDDEN) && hasOwn$5(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor$1(1, value));
	    };
	    if (DESCRIPTORS$5 && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  SymbolPrototype = $Symbol[PROTOTYPE];

	  defineBuiltIn$2(SymbolPrototype, 'toString', function toString() {
	    return getInternalState$2(this).tag;
	  });

	  defineBuiltIn$2($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  propertyIsEnumerableModule$1.f = $propertyIsEnumerable$1;
	  definePropertyModule.f = $defineProperty;
	  definePropertiesModule.f = $defineProperties;
	  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
	  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  getOwnPropertySymbolsModule$2.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbolModule.f = function (name) {
	    return wrap(wellKnownSymbol$8(name), name);
	  };

	  if (DESCRIPTORS$5) {
	    // https://github.com/tc39/proposal-Symbol-description
	    defineBuiltInAccessor(SymbolPrototype, 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$2(this).description;
	      }
	    });
	  }
	}

	$$s({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL$3, sham: !NATIVE_SYMBOL$3 }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys$2(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol$l(name);
	});

	$$s({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL$3 }, {
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	$$s({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$3, sham: !DESCRIPTORS$5 }, {
	  // `Object.create` method
	  // https://tc39.es/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.es/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.es/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	$$s({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL$3 }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames
	});

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	defineSymbolToPrimitive$1();

	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag$4($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var NATIVE_SYMBOL$2 = symbolConstructorDetection;

	/* eslint-disable es/no-symbol -- safe */
	var symbolRegistryDetection = NATIVE_SYMBOL$2 && !!Symbol['for'] && !!Symbol.keyFor;

	var $$r = _export;
	var getBuiltIn$4 = getBuiltIn$9;
	var hasOwn$4 = hasOwnProperty_1;
	var toString$8 = toString$a;
	var shared$2 = sharedExports;
	var NATIVE_SYMBOL_REGISTRY$1 = symbolRegistryDetection;

	var StringToSymbolRegistry = shared$2('string-to-symbol-registry');
	var SymbolToStringRegistry$1 = shared$2('symbol-to-string-registry');

	// `Symbol.for` method
	// https://tc39.es/ecma262/#sec-symbol.for
	$$r({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY$1 }, {
	  'for': function (key) {
	    var string = toString$8(key);
	    if (hasOwn$4(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = getBuiltIn$4('Symbol')(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry$1[symbol] = string;
	    return symbol;
	  }
	});

	var $$q = _export;
	var hasOwn$3 = hasOwnProperty_1;
	var isSymbol$2 = isSymbol$5;
	var tryToString$1 = tryToString$3;
	var shared$1 = sharedExports;
	var NATIVE_SYMBOL_REGISTRY = symbolRegistryDetection;

	var SymbolToStringRegistry = shared$1('symbol-to-string-registry');

	// `Symbol.keyFor` method
	// https://tc39.es/ecma262/#sec-symbol.keyfor
	$$q({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
	  keyFor: function keyFor(sym) {
	    if (!isSymbol$2(sym)) throw TypeError(tryToString$1(sym) + ' is not a symbol');
	    if (hasOwn$3(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  }
	});

	var uncurryThis$d = functionUncurryThis;

	var arraySlice$3 = uncurryThis$d([].slice);

	var uncurryThis$c = functionUncurryThis;
	var isArray$2 = isArray$5;
	var isCallable$4 = isCallable$g;
	var classof$3 = classofRaw$2;
	var toString$7 = toString$a;

	var push$2 = uncurryThis$c([].push);

	var getJsonReplacerFunction = function (replacer) {
	  if (isCallable$4(replacer)) return replacer;
	  if (!isArray$2(replacer)) return;
	  var rawLength = replacer.length;
	  var keys = [];
	  for (var i = 0; i < rawLength; i++) {
	    var element = replacer[i];
	    if (typeof element == 'string') push$2(keys, element);
	    else if (typeof element == 'number' || classof$3(element) == 'Number' || classof$3(element) == 'String') push$2(keys, toString$7(element));
	  }
	  var keysLength = keys.length;
	  var root = true;
	  return function (key, value) {
	    if (root) {
	      root = false;
	      return value;
	    }
	    if (isArray$2(this)) return value;
	    for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
	  };
	};

	var $$p = _export;
	var getBuiltIn$3 = getBuiltIn$9;
	var apply = functionApply;
	var call$2 = functionCall;
	var uncurryThis$b = functionUncurryThis;
	var fails$7 = fails$l;
	var isCallable$3 = isCallable$g;
	var isSymbol$1 = isSymbol$5;
	var arraySlice$2 = arraySlice$3;
	var getReplacerFunction = getJsonReplacerFunction;
	var NATIVE_SYMBOL$1 = symbolConstructorDetection;

	var $String$1 = String;
	var $stringify = getBuiltIn$3('JSON', 'stringify');
	var exec = uncurryThis$b(/./.exec);
	var charAt$2 = uncurryThis$b(''.charAt);
	var charCodeAt$1 = uncurryThis$b(''.charCodeAt);
	var replace = uncurryThis$b(''.replace);
	var numberToString = uncurryThis$b(1.0.toString);

	var tester = /[\uD800-\uDFFF]/g;
	var low = /^[\uD800-\uDBFF]$/;
	var hi = /^[\uDC00-\uDFFF]$/;

	var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL$1 || fails$7(function () {
	  var symbol = getBuiltIn$3('Symbol')();
	  // MS Edge converts symbol values to JSON as {}
	  return $stringify([symbol]) != '[null]'
	    // WebKit converts symbol values to JSON as null
	    || $stringify({ a: symbol }) != '{}'
	    // V8 throws on boxed symbols
	    || $stringify(Object(symbol)) != '{}';
	});

	// https://github.com/tc39/proposal-well-formed-stringify
	var ILL_FORMED_UNICODE = fails$7(function () {
	  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
	    || $stringify('\uDEAD') !== '"\\udead"';
	});

	var stringifyWithSymbolsFix = function (it, replacer) {
	  var args = arraySlice$2(arguments);
	  var $replacer = getReplacerFunction(replacer);
	  if (!isCallable$3($replacer) && (it === undefined || isSymbol$1(it))) return; // IE8 returns string on undefined
	  args[1] = function (key, value) {
	    // some old implementations (like WebKit) could pass numbers as keys
	    if (isCallable$3($replacer)) value = call$2($replacer, this, $String$1(key), value);
	    if (!isSymbol$1(value)) return value;
	  };
	  return apply($stringify, null, args);
	};

	var fixIllFormed = function (match, offset, string) {
	  var prev = charAt$2(string, offset - 1);
	  var next = charAt$2(string, offset + 1);
	  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
	    return '\\u' + numberToString(charCodeAt$1(match, 0), 16);
	  } return match;
	};

	if ($stringify) {
	  // `JSON.stringify` method
	  // https://tc39.es/ecma262/#sec-json.stringify
	  $$p({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = arraySlice$2(arguments);
	      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
	      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;
	    }
	  });
	}

	var $$o = _export;
	var NATIVE_SYMBOL = symbolConstructorDetection;
	var fails$6 = fails$l;
	var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
	var toObject$5 = toObject$a;

	// V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FORCED$2 = !NATIVE_SYMBOL || fails$6(function () { getOwnPropertySymbolsModule$1.f(1); });

	// `Object.getOwnPropertySymbols` method
	// https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	$$o({ target: 'Object', stat: true, forced: FORCED$2 }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    var $getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
	    return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject$5(it)) : [];
	  }
	});

	var defineWellKnownSymbol$k = wellKnownSymbolDefine;

	// `Symbol.asyncIterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.asynciterator
	defineWellKnownSymbol$k('asyncIterator');

	var defineWellKnownSymbol$j = wellKnownSymbolDefine;

	// `Symbol.hasInstance` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.hasinstance
	defineWellKnownSymbol$j('hasInstance');

	var defineWellKnownSymbol$i = wellKnownSymbolDefine;

	// `Symbol.isConcatSpreadable` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
	defineWellKnownSymbol$i('isConcatSpreadable');

	var defineWellKnownSymbol$h = wellKnownSymbolDefine;

	// `Symbol.iterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol$h('iterator');

	var defineWellKnownSymbol$g = wellKnownSymbolDefine;

	// `Symbol.match` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.match
	defineWellKnownSymbol$g('match');

	var defineWellKnownSymbol$f = wellKnownSymbolDefine;

	// `Symbol.matchAll` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.matchall
	defineWellKnownSymbol$f('matchAll');

	var defineWellKnownSymbol$e = wellKnownSymbolDefine;

	// `Symbol.replace` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.replace
	defineWellKnownSymbol$e('replace');

	var defineWellKnownSymbol$d = wellKnownSymbolDefine;

	// `Symbol.search` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.search
	defineWellKnownSymbol$d('search');

	var defineWellKnownSymbol$c = wellKnownSymbolDefine;

	// `Symbol.species` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.species
	defineWellKnownSymbol$c('species');

	var defineWellKnownSymbol$b = wellKnownSymbolDefine;

	// `Symbol.split` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.split
	defineWellKnownSymbol$b('split');

	var defineWellKnownSymbol$a = wellKnownSymbolDefine;
	var defineSymbolToPrimitive = symbolDefineToPrimitive;

	// `Symbol.toPrimitive` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.toprimitive
	defineWellKnownSymbol$a('toPrimitive');

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	defineSymbolToPrimitive();

	var getBuiltIn$2 = getBuiltIn$9;
	var defineWellKnownSymbol$9 = wellKnownSymbolDefine;
	var setToStringTag$3 = setToStringTag$5;

	// `Symbol.toStringTag` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.tostringtag
	defineWellKnownSymbol$9('toStringTag');

	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag$3(getBuiltIn$2('Symbol'), 'Symbol');

	var defineWellKnownSymbol$8 = wellKnownSymbolDefine;

	// `Symbol.unscopables` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.unscopables
	defineWellKnownSymbol$8('unscopables');

	var global$2 = global$f;
	var setToStringTag$2 = setToStringTag$5;

	// JSON[@@toStringTag] property
	// https://tc39.es/ecma262/#sec-json-@@tostringtag
	setToStringTag$2(global$2.JSON, 'JSON', true);

	var path$4 = path$b;

	var symbol$4 = path$4.Symbol;

	var iterators = {};

	var DESCRIPTORS$4 = descriptors;
	var hasOwn$2 = hasOwnProperty_1;

	var FunctionPrototype$2 = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS$4 && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn$2(FunctionPrototype$2, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS$4 || (DESCRIPTORS$4 && getDescriptor(FunctionPrototype$2, 'name').configurable));

	var functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};

	var fails$5 = fails$l;

	var correctPrototypeGetter = !fails$5(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var hasOwn$1 = hasOwnProperty_1;
	var isCallable$2 = isCallable$g;
	var toObject$4 = toObject$a;
	var sharedKey = sharedKey$4;
	var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

	var IE_PROTO = sharedKey('IE_PROTO');
	var $Object = Object;
	var ObjectPrototype = $Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	var objectGetPrototypeOf$1 = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
	  var object = toObject$4(O);
	  if (hasOwn$1(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable$2(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof $Object ? ObjectPrototype : null;
	};

	var fails$4 = fails$l;
	var isCallable$1 = isCallable$g;
	var isObject$4 = isObject$c;
	var create$7 = objectCreate;
	var getPrototypeOf$1 = objectGetPrototypeOf$1;
	var defineBuiltIn$1 = defineBuiltIn$4;
	var wellKnownSymbol$7 = wellKnownSymbol$i;

	var ITERATOR$1 = wellKnownSymbol$7('iterator');
	var BUGGY_SAFARI_ITERATORS$1 = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype$1, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$1 = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = !isObject$4(IteratorPrototype$1) || fails$4(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype$1[ITERATOR$1].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$1 = {};
	else IteratorPrototype$1 = create$7(IteratorPrototype$1);

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable$1(IteratorPrototype$1[ITERATOR$1])) {
	  defineBuiltIn$1(IteratorPrototype$1, ITERATOR$1, function () {
	    return this;
	  });
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype$1,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
	};

	var IteratorPrototype = iteratorsCore.IteratorPrototype;
	var create$6 = objectCreate;
	var createPropertyDescriptor = createPropertyDescriptor$5;
	var setToStringTag$1 = setToStringTag$5;
	var Iterators$3 = iterators;

	var returnThis$1 = function () { return this; };

	var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create$6(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
	  setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false, true);
	  Iterators$3[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var uncurryThis$a = functionUncurryThis;
	var aCallable$3 = aCallable$6;

	var functionUncurryThisAccessor = function (object, key, method) {
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    return uncurryThis$a(aCallable$3(Object.getOwnPropertyDescriptor(object, key)[method]));
	  } catch (error) { /* empty */ }
	};

	var isCallable = isCallable$g;

	var $String = String;
	var $TypeError$4 = TypeError;

	var aPossiblePrototype$1 = function (argument) {
	  if (typeof argument == 'object' || isCallable(argument)) return argument;
	  throw $TypeError$4("Can't set " + $String(argument) + ' as a prototype');
	};

	/* eslint-disable no-proto -- safe */

	var uncurryThisAccessor = functionUncurryThisAccessor;
	var anObject = anObject$5;
	var aPossiblePrototype = aPossiblePrototype$1;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var $$n = _export;
	var call$1 = functionCall;
	var FunctionName = functionName;
	var createIteratorConstructor = iteratorCreateConstructor;
	var getPrototypeOf = objectGetPrototypeOf$1;
	var setToStringTag = setToStringTag$5;
	var defineBuiltIn = defineBuiltIn$4;
	var wellKnownSymbol$6 = wellKnownSymbol$i;
	var Iterators$2 = iterators;
	var IteratorsCore = iteratorsCore;

	var PROPER_FUNCTION_NAME = FunctionName.PROPER;
	FunctionName.CONFIGURABLE;
	IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR = wellKnownSymbol$6('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
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
	  var nativeIterator = IterablePrototype[ITERATOR]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      Iterators$2[TO_STRING_TAG] = returnThis;
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call$1(nativeIterator, this); };
	    }
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
	        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else $$n({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if ((FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
	    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
	  }
	  Iterators$2[NAME] = defaultIterator;

	  return methods;
	};

	// `CreateIterResultObject` abstract operation
	// https://tc39.es/ecma262/#sec-createiterresultobject
	var createIterResultObject$2 = function (value, done) {
	  return { value: value, done: done };
	};

	var toIndexedObject$2 = toIndexedObject$9;
	var Iterators$1 = iterators;
	var InternalStateModule$1 = internalState;
	objectDefineProperty.f;
	var defineIterator$1 = iteratorDefine;
	var createIterResultObject$1 = createIterResultObject$2;

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState$1 = InternalStateModule$1.set;
	var getInternalState$1 = InternalStateModule$1.getterFor(ARRAY_ITERATOR);

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
	defineIterator$1(Array, 'Array', function (iterated, kind) {
	  setInternalState$1(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject$2(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState$1(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return createIterResultObject$1(undefined, true);
	  }
	  if (kind == 'keys') return createIterResultObject$1(index, false);
	  if (kind == 'values') return createIterResultObject$1(target[index], false);
	  return createIterResultObject$1([index, target[index]], false);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	Iterators$1.Arguments = Iterators$1.Array;

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

	var DOMIterables = domIterables;
	var global$1 = global$f;
	var classof$2 = classof$8;
	var createNonEnumerableProperty = createNonEnumerableProperty$5;
	var Iterators = iterators;
	var wellKnownSymbol$5 = wellKnownSymbol$i;

	var TO_STRING_TAG = wellKnownSymbol$5('toStringTag');

	for (var COLLECTION_NAME in DOMIterables) {
	  var Collection = global$1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype && classof$2(CollectionPrototype) !== TO_STRING_TAG) {
	    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
	  }
	  Iterators[COLLECTION_NAME] = Iterators.Array;
	}

	var parent$z = symbol$4;


	var symbol$3 = parent$z;

	var wellKnownSymbol$4 = wellKnownSymbol$i;
	var defineProperty$1 = objectDefineProperty.f;

	var METADATA = wellKnownSymbol$4('metadata');
	var FunctionPrototype$1 = Function.prototype;

	// Function.prototype[@@metadata]
	// https://github.com/tc39/proposal-decorator-metadata
	if (FunctionPrototype$1[METADATA] === undefined) {
	  defineProperty$1(FunctionPrototype$1, METADATA, {
	    value: null
	  });
	}

	var defineWellKnownSymbol$7 = wellKnownSymbolDefine;

	// `Symbol.dispose` well-known symbol
	// https://github.com/tc39/proposal-explicit-resource-management
	defineWellKnownSymbol$7('dispose');

	// TODO: Remove from `core-js@4`
	var defineWellKnownSymbol$6 = wellKnownSymbolDefine;

	// `Symbol.metadata` well-known symbol
	// https://github.com/tc39/proposal-decorators
	defineWellKnownSymbol$6('metadata');

	var parent$y = symbol$3;





	var symbol$2 = parent$y;

	var defineWellKnownSymbol$5 = wellKnownSymbolDefine;

	// `Symbol.asyncDispose` well-known symbol
	// https://github.com/tc39/proposal-async-explicit-resource-management
	defineWellKnownSymbol$5('asyncDispose');

	var getBuiltIn$1 = getBuiltIn$9;
	var uncurryThis$9 = functionUncurryThis;

	var Symbol$2 = getBuiltIn$1('Symbol');
	var keyFor = Symbol$2.keyFor;
	var thisSymbolValue$1 = uncurryThis$9(Symbol$2.prototype.valueOf);

	// `Symbol.isRegisteredSymbol` method
	// https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol
	var symbolIsRegistered = Symbol$2.isRegisteredSymbol || function isRegisteredSymbol(value) {
	  try {
	    return keyFor(thisSymbolValue$1(value)) !== undefined;
	  } catch (error) {
	    return false;
	  }
	};

	var $$m = _export;
	var isRegisteredSymbol$1 = symbolIsRegistered;

	// `Symbol.isRegisteredSymbol` method
	// https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol
	$$m({ target: 'Symbol', stat: true }, {
	  isRegisteredSymbol: isRegisteredSymbol$1
	});

	var shared = sharedExports;
	var getBuiltIn = getBuiltIn$9;
	var uncurryThis$8 = functionUncurryThis;
	var isSymbol = isSymbol$5;
	var wellKnownSymbol$3 = wellKnownSymbol$i;

	var Symbol$1 = getBuiltIn('Symbol');
	var $isWellKnownSymbol = Symbol$1.isWellKnownSymbol;
	var getOwnPropertyNames = getBuiltIn('Object', 'getOwnPropertyNames');
	var thisSymbolValue = uncurryThis$8(Symbol$1.prototype.valueOf);
	var WellKnownSymbolsStore = shared('wks');

	for (var i = 0, symbolKeys = getOwnPropertyNames(Symbol$1), symbolKeysLength = symbolKeys.length; i < symbolKeysLength; i++) {
	  // some old engines throws on access to some keys like `arguments` or `caller`
	  try {
	    var symbolKey = symbolKeys[i];
	    if (isSymbol(Symbol$1[symbolKey])) wellKnownSymbol$3(symbolKey);
	  } catch (error) { /* empty */ }
	}

	// `Symbol.isWellKnownSymbol` method
	// https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol
	// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected
	var symbolIsWellKnown = function isWellKnownSymbol(value) {
	  if ($isWellKnownSymbol && $isWellKnownSymbol(value)) return true;
	  try {
	    var symbol = thisSymbolValue(value);
	    for (var j = 0, keys = getOwnPropertyNames(WellKnownSymbolsStore), keysLength = keys.length; j < keysLength; j++) {
	      if (WellKnownSymbolsStore[keys[j]] == symbol) return true;
	    }
	  } catch (error) { /* empty */ }
	  return false;
	};

	var $$l = _export;
	var isWellKnownSymbol$1 = symbolIsWellKnown;

	// `Symbol.isWellKnownSymbol` method
	// https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol
	// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected
	$$l({ target: 'Symbol', stat: true, forced: true }, {
	  isWellKnownSymbol: isWellKnownSymbol$1
	});

	var defineWellKnownSymbol$4 = wellKnownSymbolDefine;

	// `Symbol.matcher` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol$4('matcher');

	var defineWellKnownSymbol$3 = wellKnownSymbolDefine;

	// `Symbol.observable` well-known symbol
	// https://github.com/tc39/proposal-observable
	defineWellKnownSymbol$3('observable');

	var $$k = _export;
	var isRegisteredSymbol = symbolIsRegistered;

	// `Symbol.isRegistered` method
	// obsolete version of https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol
	$$k({ target: 'Symbol', stat: true, name: 'isRegisteredSymbol' }, {
	  isRegistered: isRegisteredSymbol
	});

	var $$j = _export;
	var isWellKnownSymbol = symbolIsWellKnown;

	// `Symbol.isWellKnown` method
	// obsolete version of https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol
	// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected
	$$j({ target: 'Symbol', stat: true, name: 'isWellKnownSymbol', forced: true }, {
	  isWellKnown: isWellKnownSymbol
	});

	var defineWellKnownSymbol$2 = wellKnownSymbolDefine;

	// `Symbol.metadataKey` well-known symbol
	// https://github.com/tc39/proposal-decorator-metadata
	defineWellKnownSymbol$2('metadataKey');

	// TODO: remove from `core-js@4`
	var defineWellKnownSymbol$1 = wellKnownSymbolDefine;

	// `Symbol.patternMatch` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol$1('patternMatch');

	// TODO: remove from `core-js@4`
	var defineWellKnownSymbol = wellKnownSymbolDefine;

	defineWellKnownSymbol('replaceAll');

	var parent$x = symbol$2;





	// TODO: Remove from `core-js@4`






	var symbol$1 = parent$x;

	var symbol = symbol$1;

	var _Symbol = /*@__PURE__*/getDefaultExportFromCjs(symbol);

	var uncurryThis$7 = functionUncurryThis;
	var toIntegerOrInfinity$2 = toIntegerOrInfinity$5;
	var toString$6 = toString$a;
	var requireObjectCoercible$4 = requireObjectCoercible$7;

	var charAt$1 = uncurryThis$7(''.charAt);
	var charCodeAt = uncurryThis$7(''.charCodeAt);
	var stringSlice$2 = uncurryThis$7(''.slice);

	var createMethod$3 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString$6(requireObjectCoercible$4($this));
	    var position = toIntegerOrInfinity$2(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt$1(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice$2(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$3(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$3(true)
	};

	var charAt = stringMultibyte.charAt;
	var toString$5 = toString$a;
	var InternalStateModule = internalState;
	var defineIterator = iteratorDefine;
	var createIterResultObject = createIterResultObject$2;

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState(this, {
	    type: STRING_ITERATOR,
	    string: toString$5(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return createIterResultObject(undefined, true);
	  point = charAt(string, index);
	  state.index += point.length;
	  return createIterResultObject(point, false);
	});

	var WrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;

	var iterator$4 = WrappedWellKnownSymbolModule$1.f('iterator');

	var parent$w = iterator$4;


	var iterator$3 = parent$w;

	var parent$v = iterator$3;

	var iterator$2 = parent$v;

	var parent$u = iterator$2;

	var iterator$1 = parent$u;

	var iterator = iterator$1;

	var _Symbol$iterator = /*@__PURE__*/getDefaultExportFromCjs(iterator);

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof _Symbol && "symbol" == typeof _Symbol$iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof _Symbol && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj;
	  }, _typeof(obj);
	}

	var WrappedWellKnownSymbolModule = wellKnownSymbolWrapped;

	var toPrimitive$4 = WrappedWellKnownSymbolModule.f('toPrimitive');

	var parent$t = toPrimitive$4;

	var toPrimitive$3 = parent$t;

	var parent$s = toPrimitive$3;

	var toPrimitive$2 = parent$s;

	var parent$r = toPrimitive$2;

	var toPrimitive$1 = parent$r;

	var toPrimitive = toPrimitive$1;

	var _Symbol$toPrimitive = /*@__PURE__*/getDefaultExportFromCjs(toPrimitive);

	function _toPrimitive(input, hint) {
	  if (_typeof(input) !== "object" || input === null) return input;
	  var prim = input[_Symbol$toPrimitive];
	  if (prim !== undefined) {
	    var res = prim.call(input, hint || "default");
	    if (_typeof(res) !== "object") return res;
	    throw new TypeError("@@toPrimitive must return a primitive value.");
	  }
	  return (hint === "string" ? String : Number)(input);
	}

	function _toPropertyKey(arg) {
	  var key = _toPrimitive(arg, "string");
	  return _typeof(key) === "symbol" ? key : String(key);
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    _Object$defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
	  }
	}
	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  _Object$defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
	}

	var DESCRIPTORS$3 = descriptors;
	var isArray$1 = isArray$5;

	var $TypeError$3 = TypeError;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Safari < 13 does not throw an error in this case
	var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS$3 && !function () {
	  // makes no sense without proper strict mode support
	  if (this !== undefined) return true;
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).length = 1;
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	}();

	var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
	  if (isArray$1(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
	    throw $TypeError$3('Cannot set read only .length');
	  } return O.length = length;
	} : function (O, length) {
	  return O.length = length;
	};

	var tryToString = tryToString$3;

	var $TypeError$2 = TypeError;

	var deletePropertyOrThrow$2 = function (O, P) {
	  if (!delete O[P]) throw $TypeError$2('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
	};

	var $$i = _export;
	var toObject$3 = toObject$a;
	var toAbsoluteIndex$1 = toAbsoluteIndex$4;
	var toIntegerOrInfinity$1 = toIntegerOrInfinity$5;
	var lengthOfArrayLike$3 = lengthOfArrayLike$8;
	var setArrayLength = arraySetLength;
	var doesNotExceedSafeInteger = doesNotExceedSafeInteger$2;
	var arraySpeciesCreate = arraySpeciesCreate$3;
	var createProperty$1 = createProperty$4;
	var deletePropertyOrThrow$1 = deletePropertyOrThrow$2;
	var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$3('splice');

	var max$1 = Math.max;
	var min$1 = Math.min;

	// `Array.prototype.splice` method
	// https://tc39.es/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	$$i({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject$3(this);
	    var len = lengthOfArrayLike$3(O);
	    var actualStart = toAbsoluteIndex$1(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$1(max$1(toIntegerOrInfinity$1(deleteCount), 0), len - actualStart);
	    }
	    doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
	    A = arraySpeciesCreate(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty$1(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else deletePropertyOrThrow$1(O, to);
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow$1(O, k - 1);
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else deletePropertyOrThrow$1(O, to);
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    setArrayLength(O, len - actualDeleteCount + insertCount);
	    return A;
	  }
	});

	var entryVirtual$d = entryVirtual$f;

	var splice$2 = entryVirtual$d('Array').splice;

	var isPrototypeOf$c = objectIsPrototypeOf;
	var method$b = splice$2;

	var ArrayPrototype$7 = Array.prototype;

	var splice$1 = function (it) {
	  var own = it.splice;
	  return it === ArrayPrototype$7 || (isPrototypeOf$c(ArrayPrototype$7, it) && own === ArrayPrototype$7.splice) ? method$b : own;
	};

	var parent$q = splice$1;

	var splice = parent$q;

	var _spliceInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(splice);

	var $$h = _export;
	var $includes = arrayIncludes.includes;
	var fails$3 = fails$l;

	// FF99+ bug
	var BROKEN_ON_SPARSE = fails$3(function () {
	  // eslint-disable-next-line es/no-array-prototype-includes -- detection
	  return !Array(1).includes();
	});

	// `Array.prototype.includes` method
	// https://tc39.es/ecma262/#sec-array.prototype.includes
	$$h({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$c = entryVirtual$f;

	var includes$3 = entryVirtual$c('Array').includes;

	var isObject$3 = isObject$c;
	var classof$1 = classofRaw$2;
	var wellKnownSymbol$2 = wellKnownSymbol$i;

	var MATCH$1 = wellKnownSymbol$2('match');

	// `IsRegExp` abstract operation
	// https://tc39.es/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject$3(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$1(it) == 'RegExp');
	};

	var isRegExp = isRegexp;

	var $TypeError$1 = TypeError;

	var notARegexp = function (it) {
	  if (isRegExp(it)) {
	    throw $TypeError$1("The method doesn't accept regular expressions");
	  } return it;
	};

	var wellKnownSymbol$1 = wellKnownSymbol$i;

	var MATCH = wellKnownSymbol$1('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (error1) {
	    try {
	      regexp[MATCH] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (error2) { /* empty */ }
	  } return false;
	};

	var $$g = _export;
	var uncurryThis$6 = functionUncurryThis;
	var notARegExp$1 = notARegexp;
	var requireObjectCoercible$3 = requireObjectCoercible$7;
	var toString$4 = toString$a;
	var correctIsRegExpLogic$1 = correctIsRegexpLogic;

	var stringIndexOf = uncurryThis$6(''.indexOf);

	// `String.prototype.includes` method
	// https://tc39.es/ecma262/#sec-string.prototype.includes
	$$g({ target: 'String', proto: true, forced: !correctIsRegExpLogic$1('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~stringIndexOf(
	      toString$4(requireObjectCoercible$3(this)),
	      toString$4(notARegExp$1(searchString)),
	      arguments.length > 1 ? arguments[1] : undefined
	    );
	  }
	});

	var entryVirtual$b = entryVirtual$f;

	var includes$2 = entryVirtual$b('String').includes;

	var isPrototypeOf$b = objectIsPrototypeOf;
	var arrayMethod = includes$3;
	var stringMethod = includes$2;

	var ArrayPrototype$6 = Array.prototype;
	var StringPrototype$4 = String.prototype;

	var includes$1 = function (it) {
	  var own = it.includes;
	  if (it === ArrayPrototype$6 || (isPrototypeOf$b(ArrayPrototype$6, it) && own === ArrayPrototype$6.includes)) return arrayMethod;
	  if (typeof it == 'string' || it === StringPrototype$4 || (isPrototypeOf$b(StringPrototype$4, it) && own === StringPrototype$4.includes)) {
	    return stringMethod;
	  } return own;
	};

	var parent$p = includes$1;

	var includes = parent$p;

	var _includesInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(includes);

	var aCallable$2 = aCallable$6;
	var toObject$2 = toObject$a;
	var IndexedObject$1 = indexedObject;
	var lengthOfArrayLike$2 = lengthOfArrayLike$8;

	var $TypeError = TypeError;

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod$2 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aCallable$2(callbackfn);
	    var O = toObject$2(that);
	    var self = IndexedObject$1(O);
	    var length = lengthOfArrayLike$2(O);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw $TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod$2(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$2(true)
	};

	var classof = classofRaw$2;

	var engineIsNode = typeof process != 'undefined' && classof(process) == 'process';

	var $$f = _export;
	var $reduce = arrayReduce.left;
	var arrayMethodIsStrict$1 = arrayMethodIsStrict$3;
	var CHROME_VERSION = engineV8Version;
	var IS_NODE = engineIsNode;

	// Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
	var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
	var FORCED$1 = CHROME_BUG || !arrayMethodIsStrict$1('reduce');

	// `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce
	$$f({ target: 'Array', proto: true, forced: FORCED$1 }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    var length = arguments.length;
	    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$a = entryVirtual$f;

	var reduce$2 = entryVirtual$a('Array').reduce;

	var isPrototypeOf$a = objectIsPrototypeOf;
	var method$a = reduce$2;

	var ArrayPrototype$5 = Array.prototype;

	var reduce$1 = function (it) {
	  var own = it.reduce;
	  return it === ArrayPrototype$5 || (isPrototypeOf$a(ArrayPrototype$5, it) && own === ArrayPrototype$5.reduce) ? method$a : own;
	};

	var parent$o = reduce$1;

	var reduce = parent$o;

	var _reduceInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(reduce);

	var DESCRIPTORS$2 = descriptors;
	var fails$2 = fails$l;
	var uncurryThis$5 = functionUncurryThis;
	var objectGetPrototypeOf = objectGetPrototypeOf$1;
	var objectKeys$1 = objectKeys$4;
	var toIndexedObject$1 = toIndexedObject$9;
	var $propertyIsEnumerable = objectPropertyIsEnumerable.f;

	var propertyIsEnumerable = uncurryThis$5($propertyIsEnumerable);
	var push$1 = uncurryThis$5([].push);

	// in some IE versions, `propertyIsEnumerable` returns incorrect result on integer keys
	// of `null` prototype objects
	var IE_BUG = DESCRIPTORS$2 && fails$2(function () {
	  // eslint-disable-next-line es/no-object-create -- safe
	  var O = Object.create(null);
	  O[2] = 2;
	  return !propertyIsEnumerable(O, 2);
	});

	// `Object.{ entries, values }` methods implementation
	var createMethod$1 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject$1(it);
	    var keys = objectKeys$1(O);
	    var IE_WORKAROUND = IE_BUG && objectGetPrototypeOf(O) === null;
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!DESCRIPTORS$2 || (IE_WORKAROUND ? key in O : propertyIsEnumerable(O, key))) {
	        push$1(result, TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.es/ecma262/#sec-object.entries
	  entries: createMethod$1(true),
	  // `Object.values` method
	  // https://tc39.es/ecma262/#sec-object.values
	  values: createMethod$1(false)
	};

	var $$e = _export;
	var $entries = objectToArray.entries;

	// `Object.entries` method
	// https://tc39.es/ecma262/#sec-object.entries
	$$e({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});

	var path$3 = path$b;

	var entries$1 = path$3.Object.entries;

	var parent$n = entries$1;

	var entries = parent$n;

	var _Object$entries = /*@__PURE__*/getDefaultExportFromCjs(entries);

	/** Checks if value is string */
	function isString(str) {
	  return typeof str === 'string' || str instanceof String;
	}

	/** Checks if value is object */
	function isObject$2(obj) {
	  var _obj$constructor;
	  return typeof obj === 'object' && obj != null && (obj == null || (_obj$constructor = obj.constructor) == null ? void 0 : _obj$constructor.name) === 'Object';
	}
	function pick(obj, keys) {
	  var _context;
	  if (Array.isArray(keys)) return pick(obj, function (_, k) {
	    return _includesInstanceProperty(keys).call(keys, k);
	  });
	  return _reduceInstanceProperty(_context = _Object$entries(obj)).call(_context, function (acc, _ref) {
	    var k = _ref[0],
	      v = _ref[1];
	    if (keys(v, k)) acc[k] = v;
	    return acc;
	  }, {});
	}

	/** Direction */
	var DIRECTION = {
	  NONE: 'NONE',
	  LEFT: 'LEFT',
	  FORCE_LEFT: 'FORCE_LEFT',
	  RIGHT: 'RIGHT',
	  FORCE_RIGHT: 'FORCE_RIGHT'
	};

	/** Direction */

	function forceDirection(direction) {
	  switch (direction) {
	    case DIRECTION.LEFT:
	      return DIRECTION.FORCE_LEFT;
	    case DIRECTION.RIGHT:
	      return DIRECTION.FORCE_RIGHT;
	    default:
	      return direction;
	  }
	}

	/** Escapes regular expression control chars */
	function escapeRegExp(str) {
	  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
	}

	// cloned from https://github.com/epoberezkin/fast-deep-equal with small changes
	function objectIncludes(b, a) {
	  if (a === b) return true;
	  var arrA = Array.isArray(a),
	    arrB = Array.isArray(b);
	  var i;
	  if (arrA && arrB) {
	    if (a.length != b.length) return false;
	    for (i = 0; i < a.length; i++) if (!objectIncludes(a[i], b[i])) return false;
	    return true;
	  }
	  if (arrA != arrB) return false;
	  if (a && b && typeof a === 'object' && typeof b === 'object') {
	    var dateA = a instanceof Date,
	      dateB = b instanceof Date;
	    if (dateA && dateB) return a.getTime() == b.getTime();
	    if (dateA != dateB) return false;
	    var regexpA = a instanceof RegExp,
	      regexpB = b instanceof RegExp;
	    if (regexpA && regexpB) return a.toString() == b.toString();
	    if (regexpA != regexpB) return false;
	    var keys = _Object$keys$1(a);
	    // if (keys.length !== Object.keys(b).length) return false;

	    for (i = 0; i < keys.length; i++) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
	    for (i = 0; i < keys.length; i++) if (!objectIncludes(b[keys[i]], a[keys[i]])) return false;
	    return true;
	  } else if (a && b && typeof a === 'function' && typeof b === 'function') {
	    return a.toString() === b.toString();
	  }
	  return false;
	}

	/** Selection range */

	var DESCRIPTORS$1 = descriptors;
	var uncurryThis$4 = functionUncurryThis;
	var call = functionCall;
	var fails$1 = fails$l;
	var objectKeys = objectKeys$4;
	var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
	var propertyIsEnumerableModule = objectPropertyIsEnumerable;
	var toObject$1 = toObject$a;
	var IndexedObject = indexedObject;

	// eslint-disable-next-line es/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
	var defineProperty = Object.defineProperty;
	var concat$4 = uncurryThis$4([].concat);

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	var objectAssign = !$assign || fails$1(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS$1 && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line es/no-symbol -- safe
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject$1(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? concat$4(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS$1 || call(propertyIsEnumerable, S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	var $$d = _export;
	var assign$5 = objectAssign;

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	// eslint-disable-next-line es/no-object-assign -- required for testing
	$$d({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign$5 }, {
	  assign: assign$5
	});

	var path$2 = path$b;

	var assign$4 = path$2.Object.assign;

	var parent$m = assign$4;

	var assign$3 = parent$m;

	var _Object$assign$1 = /*@__PURE__*/getDefaultExportFromCjs(assign$3);

	var $$c = _export;
	var isArray = isArray$5;
	var isConstructor = isConstructor$2;
	var isObject$1 = isObject$c;
	var toAbsoluteIndex = toAbsoluteIndex$4;
	var lengthOfArrayLike$1 = lengthOfArrayLike$8;
	var toIndexedObject = toIndexedObject$9;
	var createProperty = createProperty$4;
	var wellKnownSymbol = wellKnownSymbol$i;
	var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;
	var nativeSlice = arraySlice$3;

	var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2('slice');

	var SPECIES = wellKnownSymbol('species');
	var $Array = Array;
	var max = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.es/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	$$c({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = lengthOfArrayLike$1(O);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject$1(Constructor)) {
	        Constructor = Constructor[SPECIES];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === $Array || Constructor === undefined) {
	        return nativeSlice(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? $Array : Constructor)(max(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var entryVirtual$9 = entryVirtual$f;

	var slice$2 = entryVirtual$9('Array').slice;

	var isPrototypeOf$9 = objectIsPrototypeOf;
	var method$9 = slice$2;

	var ArrayPrototype$4 = Array.prototype;

	var slice$1 = function (it) {
	  var own = it.slice;
	  return it === ArrayPrototype$4 || (isPrototypeOf$9(ArrayPrototype$4, it) && own === ArrayPrototype$4.slice) ? method$9 : own;
	};

	var parent$l = slice$1;

	var slice = parent$l;

	var _sliceInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(slice);

	/** Provides details of changing input */
	var ActionDetails = /*#__PURE__*/function () {
	  /** Current input value */

	  /** Current cursor position */

	  /** Old input value */

	  /** Old selection */

	  function ActionDetails(opts) {
	    _Object$assign$1(this, opts);

	    // double check if left part was changed (autofilling, other non-standard input triggers)
	    while (_sliceInstanceProperty(_context = this.value).call(_context, 0, this.startChangePos) !== _sliceInstanceProperty(_context2 = this.oldValue).call(_context2, 0, this.startChangePos)) {
	      var _context, _context2;
	      --this.oldSelection.start;
	    }
	  }

	  /** Start changing position */
	  _createClass(ActionDetails, [{
	    key: "startChangePos",
	    get: function get() {
	      return Math.min(this.cursorPos, this.oldSelection.start);
	    }

	    /** Inserted symbols count */
	  }, {
	    key: "insertedCount",
	    get: function get() {
	      return this.cursorPos - this.startChangePos;
	    }

	    /** Inserted symbols */
	  }, {
	    key: "inserted",
	    get: function get() {
	      return this.value.substr(this.startChangePos, this.insertedCount);
	    }

	    /** Removed symbols count */
	  }, {
	    key: "removedCount",
	    get: function get() {
	      // Math.max for opposite operation
	      return Math.max(this.oldSelection.end - this.startChangePos ||
	      // for Delete
	      this.oldValue.length - this.value.length, 0);
	    }

	    /** Removed symbols */
	  }, {
	    key: "removed",
	    get: function get() {
	      return this.oldValue.substr(this.startChangePos, this.removedCount);
	    }

	    /** Unchanged head symbols */
	  }, {
	    key: "head",
	    get: function get() {
	      return this.value.substring(0, this.startChangePos);
	    }

	    /** Unchanged tail symbols */
	  }, {
	    key: "tail",
	    get: function get() {
	      return this.value.substring(this.startChangePos + this.insertedCount);
	    }

	    /** Remove direction */
	  }, {
	    key: "removeDirection",
	    get: function get() {
	      if (!this.removedCount || this.insertedCount) return DIRECTION.NONE;

	      // align right if delete at right
	      return (this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos) &&
	      // if not range removed (event with backspace)
	      this.oldSelection.end === this.oldSelection.start ? DIRECTION.RIGHT : DIRECTION.LEFT;
	    }
	  }]);
	  return ActionDetails;
	}();

	var parent$k = assign$3;

	var assign$2 = parent$k;

	var parent$j = assign$2;

	var assign$1 = parent$j;

	var assign = assign$1;

	var _Object$assign = /*@__PURE__*/getDefaultExportFromCjs(assign);

	var uncurryThis$3 = functionUncurryThis;
	var aCallable$1 = aCallable$6;
	var isObject = isObject$c;
	var hasOwn = hasOwnProperty_1;
	var arraySlice$1 = arraySlice$3;
	var NATIVE_BIND = functionBindNative;

	var $Function = Function;
	var concat$3 = uncurryThis$3([].concat);
	var join = uncurryThis$3([].join);
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!hasOwn(factories, argsLength)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	// eslint-disable-next-line es/no-function-prototype-bind -- detection
	var functionBind = NATIVE_BIND ? $Function.bind : function bind(that /* , ...args */) {
	  var F = aCallable$1(this);
	  var Prototype = F.prototype;
	  var partArgs = arraySlice$1(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = concat$3(partArgs, arraySlice$1(arguments));
	    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
	  };
	  if (isObject(Prototype)) boundFunction.prototype = Prototype;
	  return boundFunction;
	};

	// TODO: Remove from `core-js@4`
	var $$b = _export;
	var bind$6 = functionBind;

	// `Function.prototype.bind` method
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	// eslint-disable-next-line es/no-function-prototype-bind -- detection
	$$b({ target: 'Function', proto: true, forced: Function.bind !== bind$6 }, {
	  bind: bind$6
	});

	var entryVirtual$8 = entryVirtual$f;

	var bind$5 = entryVirtual$8('Function').bind;

	var isPrototypeOf$8 = objectIsPrototypeOf;
	var method$8 = bind$5;

	var FunctionPrototype = Function.prototype;

	var bind$4 = function (it) {
	  var own = it.bind;
	  return it === FunctionPrototype || (isPrototypeOf$8(FunctionPrototype, it) && own === FunctionPrototype.bind) ? method$8 : own;
	};

	var parent$i = bind$4;

	var bind$3 = parent$i;

	var parent$h = bind$3;

	var bind$2 = parent$h;

	var parent$g = bind$2;

	var bind$1 = parent$g;

	var bind = bind$1;

	var _bindInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(bind);

	function _extends() {
	  var _context;
	  _extends = _Object$assign ? _bindInstanceProperty(_context = _Object$assign).call(_context) : function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];
	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }
	    return target;
	  };
	  return _extends.apply(this, arguments);
	}

	var $$a = _export;
	var uncurryThis$2 = functionUncurryThisClause;
	var toLength$1 = toLength$3;
	var toString$3 = toString$a;
	var notARegExp = notARegexp;
	var requireObjectCoercible$2 = requireObjectCoercible$7;
	var correctIsRegExpLogic = correctIsRegexpLogic;

	// eslint-disable-next-line es/no-string-prototype-startswith -- safe
	var nativeStartsWith = uncurryThis$2(''.startsWith);
	var stringSlice$1 = uncurryThis$2(''.slice);
	var min = Math.min;

	var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith');

	// `String.prototype.startsWith` method
	// https://tc39.es/ecma262/#sec-string.prototype.startswith
	$$a({ target: 'String', proto: true, forced: !CORRECT_IS_REGEXP_LOGIC }, {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = toString$3(requireObjectCoercible$2(this));
	    notARegExp(searchString);
	    var index = toLength$1(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = toString$3(searchString);
	    return nativeStartsWith
	      ? nativeStartsWith(that, search, index)
	      : stringSlice$1(that, index, index + search.length) === search;
	  }
	});

	var entryVirtual$7 = entryVirtual$f;

	var startsWith$2 = entryVirtual$7('String').startsWith;

	var isPrototypeOf$7 = objectIsPrototypeOf;
	var method$7 = startsWith$2;

	var StringPrototype$3 = String.prototype;

	var startsWith$1 = function (it) {
	  var own = it.startsWith;
	  return typeof it == 'string' || it === StringPrototype$3
	    || (isPrototypeOf$7(StringPrototype$3, it) && own === StringPrototype$3.startsWith) ? method$7 : own;
	};

	var parent$f = startsWith$1;

	var startsWith = parent$f;

	var _startsWithInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(startsWith);

	/** Applies mask on element */
	function IMask(el, opts) {
	  // currently available only for input-like elements
	  return new IMask.InputMask(el, opts);
	}

	var _excluded$8 = ["mask"];
	// TODO can't use overloads here because of https://github.com/microsoft/TypeScript/issues/50754
	// export function maskedClass(mask: string): typeof MaskedPattern;
	// export function maskedClass(mask: DateConstructor): typeof MaskedDate;
	// export function maskedClass(mask: NumberConstructor): typeof MaskedNumber;
	// export function maskedClass(mask: Array<any> | ArrayConstructor): typeof MaskedDynamic;
	// export function maskedClass(mask: MaskedDate): typeof MaskedDate;
	// export function maskedClass(mask: MaskedNumber): typeof MaskedNumber;
	// export function maskedClass(mask: MaskedEnum): typeof MaskedEnum;
	// export function maskedClass(mask: MaskedRange): typeof MaskedRange;
	// export function maskedClass(mask: MaskedRegExp): typeof MaskedRegExp;
	// export function maskedClass(mask: MaskedFunction): typeof MaskedFunction;
	// export function maskedClass(mask: MaskedPattern): typeof MaskedPattern;
	// export function maskedClass(mask: MaskedDynamic): typeof MaskedDynamic;
	// export function maskedClass(mask: Masked): typeof Masked;
	// export function maskedClass(mask: typeof Masked): typeof Masked;
	// export function maskedClass(mask: typeof MaskedDate): typeof MaskedDate;
	// export function maskedClass(mask: typeof MaskedNumber): typeof MaskedNumber;
	// export function maskedClass(mask: typeof MaskedEnum): typeof MaskedEnum;
	// export function maskedClass(mask: typeof MaskedRange): typeof MaskedRange;
	// export function maskedClass(mask: typeof MaskedRegExp): typeof MaskedRegExp;
	// export function maskedClass(mask: typeof MaskedFunction): typeof MaskedFunction;
	// export function maskedClass(mask: typeof MaskedPattern): typeof MaskedPattern;
	// export function maskedClass(mask: typeof MaskedDynamic): typeof MaskedDynamic;
	// export function maskedClass<Mask extends typeof Masked> (mask: Mask): Mask;
	// export function maskedClass(mask: RegExp): typeof MaskedRegExp;
	// export function maskedClass(mask: (value: string, ...args: any[]) => boolean): typeof MaskedFunction;
	/** Get Masked class by mask type */
	function maskedClass(mask) /* TODO */{
	  if (mask == null) throw new Error('mask property should be defined');
	  if (mask instanceof RegExp) return IMask.MaskedRegExp;
	  if (isString(mask)) return IMask.MaskedPattern;
	  if (mask === Date) return IMask.MaskedDate;
	  if (mask === Number) return IMask.MaskedNumber;
	  if (Array.isArray(mask) || mask === Array) return IMask.MaskedDynamic;
	  if (IMask.Masked && mask.prototype instanceof IMask.Masked) return mask;
	  if (IMask.Masked && mask instanceof IMask.Masked) return mask.constructor;
	  if (mask instanceof Function) return IMask.MaskedFunction;
	  console.warn('Mask not found for mask', mask); // eslint-disable-line no-console
	  return IMask.Masked;
	}
	function normalizeOpts(opts) {
	  if (!opts) throw new Error('Options in not defined');
	  if (IMask.Masked) {
	    if (opts.prototype instanceof IMask.Masked) return {
	      mask: opts
	    };

	    /*
	      handle cases like:
	      1) opts = Masked
	      2) opts = { mask: Masked, ...instanceOpts }
	    */
	    var _ref = opts instanceof IMask.Masked ? {
	        mask: opts
	      } : isObject$2(opts) && opts.mask instanceof IMask.Masked ? opts : {},
	      _ref$mask = _ref.mask,
	      mask = _ref$mask === void 0 ? undefined : _ref$mask,
	      instanceOpts = _objectWithoutPropertiesLoose(_ref, _excluded$8);
	    if (mask) {
	      var _mask = mask.mask;
	      return _extends({}, pick(mask, function (_, k) {
	        return !_startsWithInstanceProperty(k).call(k, '_');
	      }), {
	        mask: mask.constructor,
	        _mask: _mask
	      }, instanceOpts);
	    }
	  }
	  if (!isObject$2(opts)) return {
	    mask: opts
	  };
	  return _extends({}, opts);
	}

	// TODO can't use overloads here because of https://github.com/microsoft/TypeScript/issues/50754

	// From masked
	// export default function createMask<Opts extends Masked, ReturnMasked=Opts> (opts: Opts): ReturnMasked;
	// // From masked class
	// export default function createMask<Opts extends MaskedOptions<typeof Masked>, ReturnMasked extends Masked=InstanceType<Opts['mask']>> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedOptions<typeof MaskedDate>, ReturnMasked extends MaskedDate=MaskedDate<Opts['parent']>> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedOptions<typeof MaskedNumber>, ReturnMasked extends MaskedNumber=MaskedNumber<Opts['parent']>> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedOptions<typeof MaskedEnum>, ReturnMasked extends MaskedEnum=MaskedEnum<Opts['parent']>> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedOptions<typeof MaskedRange>, ReturnMasked extends MaskedRange=MaskedRange<Opts['parent']>> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedOptions<typeof MaskedRegExp>, ReturnMasked extends MaskedRegExp=MaskedRegExp<Opts['parent']>> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedOptions<typeof MaskedFunction>, ReturnMasked extends MaskedFunction=MaskedFunction<Opts['parent']>> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedOptions<typeof MaskedPattern>, ReturnMasked extends MaskedPattern=MaskedPattern<Opts['parent']>> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedOptions<typeof MaskedDynamic>, ReturnMasked extends MaskedDynamic=MaskedDynamic<Opts['parent']>> (opts: Opts): ReturnMasked;
	// // From mask opts
	// export default function createMask<Opts extends MaskedOptions<Masked>, ReturnMasked=Opts extends MaskedOptions<infer M> ? M : never> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedNumberOptions, ReturnMasked extends MaskedNumber=MaskedNumber<Opts['parent']>> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedDateFactoryOptions, ReturnMasked extends MaskedDate=MaskedDate<Opts['parent']>> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedEnumOptions, ReturnMasked extends MaskedEnum=MaskedEnum<Opts['parent']>> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedRangeOptions, ReturnMasked extends MaskedRange=MaskedRange<Opts['parent']>> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedPatternOptions, ReturnMasked extends MaskedPattern=MaskedPattern<Opts['parent']>> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedDynamicOptions, ReturnMasked extends MaskedDynamic=MaskedDynamic<Opts['parent']>> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedOptions<RegExp>, ReturnMasked extends MaskedRegExp=MaskedRegExp<Opts['parent']>> (opts: Opts): ReturnMasked;
	// export default function createMask<Opts extends MaskedOptions<Function>, ReturnMasked extends MaskedFunction=MaskedFunction<Opts['parent']>> (opts: Opts): ReturnMasked;

	/** Creates new {@link Masked} depending on mask type */
	function createMask(opts) {
	  if (IMask.Masked && opts instanceof IMask.Masked) return opts;
	  var nOpts = normalizeOpts(opts);
	  var MaskedClass = maskedClass(nOpts.mask);
	  if (!MaskedClass) throw new Error('Masked class is not found for provided mask, appropriate module needs to be imported manually before creating mask.');
	  if (nOpts.mask === MaskedClass) delete nOpts.mask;
	  if (nOpts._mask) {
	    nOpts.mask = nOpts._mask;
	    delete nOpts._mask;
	  }
	  return new MaskedClass(nOpts);
	}
	IMask.createMask = createMask;

	/**  Generic element API to use with mask */
	var MaskElement = /*#__PURE__*/function () {
	  function MaskElement() {}
	  var _proto = MaskElement.prototype;
	  /** Safely sets element selection */
	  _proto.select = function select(start, end) {
	    if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd) return;
	    try {
	      this._unsafeSelect(start, end);
	    } catch (_unused) {}
	  }

	  /** */;
	  _createClass(MaskElement, [{
	    key: "selectionStart",
	    get: /** */

	    /** */

	    /** */

	    /** Safely returns selection start */
	    function get() {
	      var start;
	      try {
	        start = this._unsafeSelectionStart;
	      } catch (_unused2) {}
	      return start != null ? start : this.value.length;
	    }

	    /** Safely returns selection end */
	  }, {
	    key: "selectionEnd",
	    get: function get() {
	      var end;
	      try {
	        end = this._unsafeSelectionEnd;
	      } catch (_unused3) {}
	      return end != null ? end : this.value.length;
	    }
	  }, {
	    key: "isActive",
	    get: function get() {
	      return false;
	    }
	    /** */
	  }]);
	  return MaskElement;
	}();
	IMask.MaskElement = MaskElement;

	// TODO: Remove from `core-js@4`
	var $$9 = _export;
	var DESCRIPTORS = descriptors;
	var create$5 = objectCreate;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	$$9({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
	  create: create$5
	});

	var path$1 = path$b;

	var Object$1 = path$1.Object;

	var create$4 = function create(P, D) {
	  return Object$1.create(P, D);
	};

	var parent$e = create$4;

	var create$3 = parent$e;

	var parent$d = create$3;

	var create$2 = parent$d;

	var parent$c = create$2;

	var create$1 = parent$c;

	var create = create$1;

	var _Object$create = /*@__PURE__*/getDefaultExportFromCjs(create);

	var $$8 = _export;
	var setPrototypeOf$5 = objectSetPrototypeOf;

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	$$8({ target: 'Object', stat: true }, {
	  setPrototypeOf: setPrototypeOf$5
	});

	var path = path$b;

	var setPrototypeOf$4 = path.Object.setPrototypeOf;

	var parent$b = setPrototypeOf$4;

	var setPrototypeOf$3 = parent$b;

	var parent$a = setPrototypeOf$3;

	var setPrototypeOf$2 = parent$a;

	var parent$9 = setPrototypeOf$2;

	var setPrototypeOf$1 = parent$9;

	var setPrototypeOf = setPrototypeOf$1;

	var _Object$setPrototypeOf = /*@__PURE__*/getDefaultExportFromCjs(setPrototypeOf);

	function _setPrototypeOf(o, p) {
	  var _context;
	  _setPrototypeOf = _Object$setPrototypeOf ? _bindInstanceProperty(_context = _Object$setPrototypeOf).call(_context) : function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };
	  return _setPrototypeOf(o, p);
	}

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = _Object$create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  _setPrototypeOf(subClass, superClass);
	}

	/** Bridge between HTMLElement and {@link Masked} */
	var HTMLMaskElement = /*#__PURE__*/function (_MaskElement) {
	  _inheritsLoose(HTMLMaskElement, _MaskElement);
	  /** HTMLElement to use mask on */

	  function HTMLMaskElement(input) {
	    var _this;
	    _this = _MaskElement.call(this) || this;
	    _this.input = input;
	    _this._handlers = {};
	    return _this;
	  }
	  var _proto = HTMLMaskElement.prototype;
	  /**
	    Binds HTMLElement events to mask internal events
	  */
	  _proto.bindEvents = function bindEvents(handlers) {
	    var _this2 = this;
	    _Object$keys$1(handlers).forEach(function (event) {
	      return _this2._toggleEventHandler(HTMLMaskElement.EVENTS_MAP[event], handlers[event]);
	    });
	  }

	  /**
	    Unbinds HTMLElement events to mask internal events
	  */;
	  _proto.unbindEvents = function unbindEvents() {
	    var _this3 = this;
	    _Object$keys$1(this._handlers).forEach(function (event) {
	      return _this3._toggleEventHandler(event);
	    });
	  };
	  _proto._toggleEventHandler = function _toggleEventHandler(event, handler) {
	    if (this._handlers[event]) {
	      this.input.removeEventListener(event, this._handlers[event]);
	      delete this._handlers[event];
	    }
	    if (handler) {
	      this.input.addEventListener(event, handler);
	      this._handlers[event] = handler;
	    }
	  };
	  _createClass(HTMLMaskElement, [{
	    key: "rootElement",
	    get: function get() {
	      var _this$input$getRootNo, _this$input$getRootNo2, _this$input;
	      return (_this$input$getRootNo = (_this$input$getRootNo2 = (_this$input = this.input).getRootNode) == null ? void 0 : _this$input$getRootNo2.call(_this$input)) != null ? _this$input$getRootNo : document;
	    }

	    /**
	      Is element in focus
	    */
	  }, {
	    key: "isActive",
	    get: function get() {
	      return this.input === this.rootElement.activeElement;
	    }
	  }]);
	  return HTMLMaskElement;
	}(MaskElement);
	/** Mapping between HTMLElement events and mask internal events */
	HTMLMaskElement.EVENTS_MAP = {
	  selectionChange: 'keydown',
	  input: 'input',
	  drop: 'drop',
	  click: 'click',
	  focus: 'focus',
	  commit: 'blur'
	};
	IMask.HTMLMaskElement = HTMLMaskElement;

	/** Bridge between InputElement and {@link Masked} */
	var HTMLInputMaskElement = /*#__PURE__*/function (_HTMLMaskElement) {
	  _inheritsLoose(HTMLInputMaskElement, _HTMLMaskElement);
	  /** InputElement to use mask on */

	  function HTMLInputMaskElement(input) {
	    var _this;
	    _this = _HTMLMaskElement.call(this, input) || this;
	    _this.input = input;
	    _this._handlers = {};
	    return _this;
	  }

	  /** Returns InputElement selection start */
	  var _proto = HTMLInputMaskElement.prototype;
	  /** Sets InputElement selection */
	  _proto._unsafeSelect = function _unsafeSelect(start, end) {
	    this.input.setSelectionRange(start, end);
	  };
	  _createClass(HTMLInputMaskElement, [{
	    key: "_unsafeSelectionStart",
	    get: function get() {
	      return this.input.selectionStart != null ? this.input.selectionStart : this.value.length;
	    }

	    /** Returns InputElement selection end */
	  }, {
	    key: "_unsafeSelectionEnd",
	    get: function get() {
	      return this.input.selectionEnd;
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.input.value;
	    },
	    set: function set(value) {
	      this.input.value = value;
	    }
	  }]);
	  return HTMLInputMaskElement;
	}(HTMLMaskElement);
	IMask.HTMLMaskElement = HTMLMaskElement;

	var HTMLContenteditableMaskElement = /*#__PURE__*/function (_HTMLMaskElement) {
	  _inheritsLoose(HTMLContenteditableMaskElement, _HTMLMaskElement);
	  function HTMLContenteditableMaskElement() {
	    return _HTMLMaskElement.apply(this, arguments) || this;
	  }
	  var _proto = HTMLContenteditableMaskElement.prototype;
	  /** Sets HTMLElement selection */
	  _proto._unsafeSelect = function _unsafeSelect(start, end) {
	    if (!this.rootElement.createRange) return;
	    var range = this.rootElement.createRange();
	    range.setStart(this.input.firstChild || this.input, start);
	    range.setEnd(this.input.lastChild || this.input, end);
	    var root = this.rootElement;
	    var selection = root.getSelection && root.getSelection();
	    if (selection) {
	      selection.removeAllRanges();
	      selection.addRange(range);
	    }
	  }

	  /** HTMLElement value */;
	  _createClass(HTMLContenteditableMaskElement, [{
	    key: "_unsafeSelectionStart",
	    get: /** Returns HTMLElement selection start */
	    function get() {
	      var root = this.rootElement;
	      var selection = root.getSelection && root.getSelection();
	      var anchorOffset = selection && selection.anchorOffset;
	      var focusOffset = selection && selection.focusOffset;
	      if (focusOffset == null || anchorOffset == null || anchorOffset < focusOffset) {
	        return anchorOffset;
	      }
	      return focusOffset;
	    }

	    /** Returns HTMLElement selection end */
	  }, {
	    key: "_unsafeSelectionEnd",
	    get: function get() {
	      var root = this.rootElement;
	      var selection = root.getSelection && root.getSelection();
	      var anchorOffset = selection && selection.anchorOffset;
	      var focusOffset = selection && selection.focusOffset;
	      if (focusOffset == null || anchorOffset == null || anchorOffset > focusOffset) {
	        return anchorOffset;
	      }
	      return focusOffset;
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this.input.textContent || '';
	    },
	    set: function set(value) {
	      this.input.textContent = value;
	    }
	  }]);
	  return HTMLContenteditableMaskElement;
	}(HTMLMaskElement);
	IMask.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;

	var _excluded$7 = ["mask"];
	/** Listens to element events and controls changes between element and {@link Masked} */
	var InputMask = /*#__PURE__*/function () {
	  /**
	    View element
	  */

	  /** Internal {@link Masked} model */

	  function InputMask(el, opts) {
	    this.el = el instanceof MaskElement ? el : el.isContentEditable && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' ? new HTMLContenteditableMaskElement(el) : new HTMLInputMaskElement(el);
	    this.masked = createMask(opts);
	    this._listeners = {};
	    this._value = '';
	    this._unmaskedValue = '';
	    this._saveSelection = this._saveSelection.bind(this);
	    this._onInput = this._onInput.bind(this);
	    this._onChange = this._onChange.bind(this);
	    this._onDrop = this._onDrop.bind(this);
	    this._onFocus = this._onFocus.bind(this);
	    this._onClick = this._onClick.bind(this);
	    this.alignCursor = this.alignCursor.bind(this);
	    this.alignCursorFriendly = this.alignCursorFriendly.bind(this);
	    this._bindEvents();

	    // refresh
	    this.updateValue();
	    this._onChange();
	  }
	  var _proto = InputMask.prototype;
	  _proto.maskEquals = function maskEquals(mask) {
	    var _this$masked;
	    return mask == null || ((_this$masked = this.masked) == null ? void 0 : _this$masked.maskEquals(mask));
	  }

	  /** Masked */;
	  /** Starts listening to element events */
	  _proto._bindEvents = function _bindEvents() {
	    this.el.bindEvents({
	      selectionChange: this._saveSelection,
	      input: this._onInput,
	      drop: this._onDrop,
	      click: this._onClick,
	      focus: this._onFocus,
	      commit: this._onChange
	    });
	  }

	  /** Stops listening to element events */;
	  _proto._unbindEvents = function _unbindEvents() {
	    if (this.el) this.el.unbindEvents();
	  }

	  /** Fires custom event */;
	  _proto._fireEvent = function _fireEvent(ev, e) {
	    var listeners = this._listeners[ev];
	    if (!listeners) return;
	    listeners.forEach(function (l) {
	      return l(e);
	    });
	  }

	  /** Current selection start */;
	  /** Stores current selection */
	  _proto._saveSelection = function _saveSelection( /* ev */
	  ) {
	    if (this.displayValue !== this.el.value) {
	      console.warn('Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.'); // eslint-disable-line no-console
	    }

	    this._selection = {
	      start: this.selectionStart,
	      end: this.cursorPos
	    };
	  }

	  /** Syncronizes model value from view */;
	  _proto.updateValue = function updateValue() {
	    this.masked.value = this.el.value;
	    this._value = this.masked.value;
	  }

	  /** Syncronizes view from model value, fires change events */;
	  _proto.updateControl = function updateControl() {
	    var newUnmaskedValue = this.masked.unmaskedValue;
	    var newValue = this.masked.value;
	    var newDisplayValue = this.displayValue;
	    var isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue;
	    this._unmaskedValue = newUnmaskedValue;
	    this._value = newValue;
	    if (this.el.value !== newDisplayValue) this.el.value = newDisplayValue;
	    if (isChanged) this._fireChangeEvents();
	  }

	  /** Updates options with deep equal check, recreates {@link Masked} model if mask type changes */;
	  _proto.updateOptions = function updateOptions(opts) {
	    var mask = opts.mask,
	      restOpts = _objectWithoutPropertiesLoose(opts, _excluded$7);
	    var updateMask = !this.maskEquals(mask);
	    var updateOpts = !objectIncludes(this.masked, restOpts);
	    if (updateMask) this.mask = mask;
	    if (updateOpts) this.masked.updateOptions(restOpts); // TODO

	    if (updateMask || updateOpts) this.updateControl();
	  }

	  /** Updates cursor */;
	  _proto.updateCursor = function updateCursor(cursorPos) {
	    if (cursorPos == null) return;
	    this.cursorPos = cursorPos;

	    // also queue change cursor for mobile browsers
	    this._delayUpdateCursor(cursorPos);
	  }

	  /** Delays cursor update to support mobile browsers */;
	  _proto._delayUpdateCursor = function _delayUpdateCursor(cursorPos) {
	    var _this = this;
	    this._abortUpdateCursor();
	    this._changingCursorPos = cursorPos;
	    this._cursorChanging = setTimeout(function () {
	      if (!_this.el) return; // if was destroyed
	      _this.cursorPos = _this._changingCursorPos;
	      _this._abortUpdateCursor();
	    }, 10);
	  }

	  /** Fires custom events */;
	  _proto._fireChangeEvents = function _fireChangeEvents() {
	    this._fireEvent('accept', this._inputEvent);
	    if (this.masked.isComplete) this._fireEvent('complete', this._inputEvent);
	  }

	  /** Aborts delayed cursor update */;
	  _proto._abortUpdateCursor = function _abortUpdateCursor() {
	    if (this._cursorChanging) {
	      clearTimeout(this._cursorChanging);
	      delete this._cursorChanging;
	    }
	  }

	  /** Aligns cursor to nearest available position */;
	  _proto.alignCursor = function alignCursor() {
	    this.cursorPos = this.masked.nearestInputPos(this.masked.nearestInputPos(this.cursorPos, DIRECTION.LEFT));
	  }

	  /** Aligns cursor only if selection is empty */;
	  _proto.alignCursorFriendly = function alignCursorFriendly() {
	    if (this.selectionStart !== this.cursorPos) return; // skip if range is selected
	    this.alignCursor();
	  }

	  /** Adds listener on custom event */;
	  _proto.on = function on(ev, handler) {
	    if (!this._listeners[ev]) this._listeners[ev] = [];
	    this._listeners[ev].push(handler);
	    return this;
	  }

	  /** Removes custom event listener */;
	  _proto.off = function off(ev, handler) {
	    var _context, _context2;
	    if (!this._listeners[ev]) return this;
	    if (!handler) {
	      delete this._listeners[ev];
	      return this;
	    }
	    var hIndex = _indexOfInstanceProperty$1(_context = this._listeners[ev]).call(_context, handler);
	    if (hIndex >= 0) _spliceInstanceProperty(_context2 = this._listeners[ev]).call(_context2, hIndex, 1);
	    return this;
	  }

	  /** Handles view input event */;
	  _proto._onInput = function _onInput(e) {
	    var _context3;
	    this._inputEvent = e;
	    this._abortUpdateCursor();

	    // fix strange IE behavior
	    if (!this._selection) return this.updateValue();
	    var details = new ActionDetails({
	      // new state
	      value: this.el.value,
	      cursorPos: this.cursorPos,
	      // old state
	      oldValue: this.displayValue,
	      oldSelection: this._selection
	    });
	    var oldRawValue = this.masked.rawInputValue;
	    var offset = _spliceInstanceProperty(_context3 = this.masked).call(_context3, details.startChangePos, details.removed.length, details.inserted, details.removeDirection, {
	      input: true,
	      raw: true
	    }).offset;

	    // force align in remove direction only if no input chars were removed
	    // otherwise we still need to align with NONE (to get out from fixed symbols for instance)
	    var removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : DIRECTION.NONE;
	    var cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
	    if (removeDirection !== DIRECTION.NONE) cursorPos = this.masked.nearestInputPos(cursorPos, DIRECTION.NONE);
	    this.updateControl();
	    this.updateCursor(cursorPos);
	    delete this._inputEvent;
	  }

	  /** Handles view change event and commits model value */;
	  _proto._onChange = function _onChange() {
	    if (this.displayValue !== this.el.value) {
	      this.updateValue();
	    }
	    this.masked.doCommit();
	    this.updateControl();
	    this._saveSelection();
	  }

	  /** Handles view drop event, prevents by default */;
	  _proto._onDrop = function _onDrop(ev) {
	    ev.preventDefault();
	    ev.stopPropagation();
	  }

	  /** Restore last selection on focus */;
	  _proto._onFocus = function _onFocus(ev) {
	    this.alignCursorFriendly();
	  }

	  /** Restore last selection on focus */;
	  _proto._onClick = function _onClick(ev) {
	    this.alignCursorFriendly();
	  }

	  /** Unbind view events and removes element reference */;
	  _proto.destroy = function destroy() {
	    this._unbindEvents();
	    this._listeners.length = 0;
	    delete this.el;
	  };
	  _createClass(InputMask, [{
	    key: "mask",
	    get: function get() {
	      return this.masked.mask;
	    },
	    set: function set(mask) {
	      if (this.maskEquals(mask)) return;
	      if (!(mask instanceof IMask.Masked) && this.masked.constructor === maskedClass(mask)) {
	        // TODO "any" no idea
	        this.masked.updateOptions({
	          mask: mask
	        });
	        return;
	      }
	      var masked = mask instanceof IMask.Masked ? mask : createMask({
	        mask: mask
	      });
	      masked.unmaskedValue = this.masked.unmaskedValue;
	      this.masked = masked;
	    }

	    /** Raw value */
	  }, {
	    key: "value",
	    get: function get() {
	      return this._value;
	    },
	    set: function set(str) {
	      if (this.value === str) return;
	      this.masked.value = str;
	      this.updateControl();
	      this.alignCursor();
	    }

	    /** Unmasked value */
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this._unmaskedValue;
	    },
	    set: function set(str) {
	      if (this.unmaskedValue === str) return;
	      this.masked.unmaskedValue = str;
	      this.updateControl();
	      this.alignCursor();
	    }

	    /** Typed unmasked value */
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.masked.typedValue;
	    },
	    set: function set(val) {
	      if (this.masked.typedValueEquals(val)) return;
	      this.masked.typedValue = val;
	      this.updateControl();
	      this.alignCursor();
	    }

	    /** Display value */
	  }, {
	    key: "displayValue",
	    get: function get() {
	      return this.masked.displayValue;
	    }
	  }, {
	    key: "selectionStart",
	    get: function get() {
	      return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
	    }

	    /** Current cursor position */
	  }, {
	    key: "cursorPos",
	    get: function get() {
	      return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
	    },
	    set: function set(pos) {
	      if (!this.el || !this.el.isActive) return;
	      this.el.select(pos, pos);
	      this._saveSelection();
	    }
	  }]);
	  return InputMask;
	}();
	IMask.InputMask = InputMask;

	/** Provides details of changing model value */
	var ChangeDetails = /*#__PURE__*/function () {
	  /** Inserted symbols */
	  /** Can skip chars */
	  /** Additional offset if any changes occurred before tail */
	  /** Raw inserted is used by dynamic mask */
	  ChangeDetails.normalize = function normalize(prep) {
	    return Array.isArray(prep) ? prep : [prep, new ChangeDetails()];
	  };
	  function ChangeDetails(details) {
	    _Object$assign$1(this, {
	      inserted: '',
	      rawInserted: '',
	      skip: false,
	      tailShift: 0
	    }, details);
	  }

	  /** Aggregate changes */
	  var _proto = ChangeDetails.prototype;
	  _proto.aggregate = function aggregate(details) {
	    this.rawInserted += details.rawInserted;
	    this.skip = this.skip || details.skip;
	    this.inserted += details.inserted;
	    this.tailShift += details.tailShift;
	    return this;
	  }

	  /** Total offset considering all changes */;
	  _createClass(ChangeDetails, [{
	    key: "offset",
	    get: function get() {
	      return this.tailShift + this.inserted.length;
	    }
	  }]);
	  return ChangeDetails;
	}();
	IMask.ChangeDetails = ChangeDetails;

	/** Provides details of continuous extracted tail */
	var ContinuousTailDetails = /*#__PURE__*/function () {
	  /** Tail value as string */

	  /** Tail start position */

	  /** Start position */

	  function ContinuousTailDetails(value, from, stop) {
	    if (value === void 0) {
	      value = '';
	    }
	    if (from === void 0) {
	      from = 0;
	    }
	    this.value = value;
	    this.from = from;
	    this.stop = stop;
	  }
	  var _proto = ContinuousTailDetails.prototype;
	  _proto.toString = function toString() {
	    return this.value;
	  };
	  _proto.extend = function extend(tail) {
	    this.value += String(tail);
	  };
	  _proto.appendTo = function appendTo(masked) {
	    return masked.append(this.toString(), {
	      tail: true
	    }).aggregate(masked._appendPlaceholder());
	  };
	  _proto.unshift = function unshift(beforePos) {
	    var _context;
	    if (!this.value.length || beforePos != null && this.from >= beforePos) return '';
	    var shiftChar = this.value[0];
	    this.value = _sliceInstanceProperty(_context = this.value).call(_context, 1);
	    return shiftChar;
	  };
	  _proto.shift = function shift() {
	    var _context2;
	    if (!this.value.length) return '';
	    var shiftChar = this.value[this.value.length - 1];
	    this.value = _sliceInstanceProperty(_context2 = this.value).call(_context2, 0, -1);
	    return shiftChar;
	  };
	  _createClass(ContinuousTailDetails, [{
	    key: "state",
	    get: function get() {
	      return {
	        value: this.value,
	        from: this.from,
	        stop: this.stop
	      };
	    },
	    set: function set(state) {
	      _Object$assign$1(this, state);
	    }
	  }]);
	  return ContinuousTailDetails;
	}();

	/** Append flags */

	/** Extract flags */

	// see https://github.com/microsoft/TypeScript/issues/6223
	/** Provides common masking stuff */
	var Masked = /*#__PURE__*/function () {
	  /** */

	  /** */

	  /** Transforms value before mask processing */

	  /** Transforms each char before mask processing */

	  /** Validates if value is acceptable */

	  /** Does additional processing at the end of editing */

	  /** Format typed value to string */

	  /** Parse string to get typed value */

	  /** Enable characters overwriting */

	  /** */

	  /** */

	  /** */

	  function Masked(opts) {
	    this._value = '';
	    this._update(_extends({}, Masked.DEFAULTS, opts));
	    this._initialized = true;
	  }

	  /** Sets and applies new options */
	  var _proto = Masked.prototype;
	  _proto.updateOptions = function updateOptions(opts) {
	    if (!_Object$keys$1(opts).length) return;
	    this.withValueRefresh(this._update.bind(this, opts));
	  }

	  /** Sets new options */;
	  _proto._update = function _update(opts) {
	    _Object$assign$1(this, opts);
	  }

	  /** Mask state */;
	  /** Resets value */
	  _proto.reset = function reset() {
	    this._value = '';
	  };
	  /** Resolve new value */
	  _proto.resolve = function resolve(value, flags) {
	    if (flags === void 0) {
	      flags = {
	        input: true
	      };
	    }
	    this.reset();
	    this.append(value, flags, '');
	    this.doCommit();
	  };
	  /** Finds nearest input position in direction */
	  _proto.nearestInputPos = function nearestInputPos(cursorPos, direction) {
	    return cursorPos;
	  };
	  _proto.totalInputPositions = function totalInputPositions(fromPos, toPos) {
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this.displayValue.length;
	    }
	    return Math.min(this.displayValue.length, toPos - fromPos);
	  }

	  /** Extracts value in range considering flags */;
	  _proto.extractInput = function extractInput(fromPos, toPos, flags) {
	    var _context;
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this.displayValue.length;
	    }
	    return _sliceInstanceProperty(_context = this.displayValue).call(_context, fromPos, toPos);
	  }

	  /** Extracts tail in range */;
	  _proto.extractTail = function extractTail(fromPos, toPos) {
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this.displayValue.length;
	    }
	    return new ContinuousTailDetails(this.extractInput(fromPos, toPos), fromPos);
	  }

	  /** Appends tail */;
	  _proto.appendTail = function appendTail(tail) {
	    if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
	    return tail.appendTo(this);
	  }

	  /** Appends char */;
	  _proto._appendCharRaw = function _appendCharRaw(ch, flags) {
	    if (!ch) return new ChangeDetails();
	    this._value += ch;
	    return new ChangeDetails({
	      inserted: ch,
	      rawInserted: ch
	    });
	  }

	  /** Appends char */;
	  _proto._appendChar = function _appendChar(ch, flags, checkTail) {
	    if (flags === void 0) {
	      flags = {};
	    }
	    var consistentState = this.state;
	    var details;
	    var _this$doPrepareChar = this.doPrepareChar(ch, flags);
	    ch = _this$doPrepareChar[0];
	    details = _this$doPrepareChar[1];
	    details = details.aggregate(this._appendCharRaw(ch, flags));
	    if (details.inserted) {
	      var consistentTail;
	      var appended = this.doValidate(flags) !== false;
	      if (appended && checkTail != null) {
	        // validation ok, check tail
	        var beforeTailState = this.state;
	        if (this.overwrite === true) {
	          consistentTail = checkTail.state;
	          checkTail.unshift(this.displayValue.length - details.tailShift);
	        }
	        var tailDetails = this.appendTail(checkTail);
	        appended = tailDetails.rawInserted === checkTail.toString();

	        // not ok, try shift
	        if (!(appended && tailDetails.inserted) && this.overwrite === 'shift') {
	          this.state = beforeTailState;
	          consistentTail = checkTail.state;
	          checkTail.shift();
	          tailDetails = this.appendTail(checkTail);
	          appended = tailDetails.rawInserted === checkTail.toString();
	        }

	        // if ok, rollback state after tail
	        if (appended && tailDetails.inserted) this.state = beforeTailState;
	      }

	      // revert all if something went wrong
	      if (!appended) {
	        details = new ChangeDetails();
	        this.state = consistentState;
	        if (checkTail && consistentTail) checkTail.state = consistentTail;
	      }
	    }
	    return details;
	  }

	  /** Appends optional placeholder at the end */;
	  _proto._appendPlaceholder = function _appendPlaceholder() {
	    return new ChangeDetails();
	  }

	  /** Appends optional eager placeholder at the end */;
	  _proto._appendEager = function _appendEager() {
	    return new ChangeDetails();
	  }

	  /** Appends symbols considering flags */;
	  _proto.append = function append(str, flags, tail) {
	    if (!isString(str)) throw new Error('value should be string');
	    var checkTail = isString(tail) ? new ContinuousTailDetails(String(tail)) : tail;
	    if (flags != null && flags.tail) flags._beforeTailState = this.state;
	    var details;
	    var _this$doPrepare = this.doPrepare(str, flags);
	    str = _this$doPrepare[0];
	    details = _this$doPrepare[1];
	    for (var ci = 0; ci < str.length; ++ci) {
	      var d = this._appendChar(str[ci], flags, checkTail);
	      if (!d.rawInserted && !this.doSkipInvalid(str[ci], flags, checkTail)) break;
	      details.aggregate(d);
	    }
	    if ((this.eager === true || this.eager === 'append') && flags != null && flags.input && str) {
	      details.aggregate(this._appendEager());
	    }

	    // append tail but aggregate only tailShift
	    if (checkTail != null) {
	      details.tailShift += this.appendTail(checkTail).tailShift;
	      // TODO it's a good idea to clear state after appending ends
	      // but it causes bugs when one append calls another (when dynamic dispatch set rawInputValue)
	      // this._resetBeforeTailState();
	    }

	    return details;
	  };
	  _proto.remove = function remove(fromPos, toPos) {
	    var _context2, _context3;
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this.displayValue.length;
	    }
	    this._value = _sliceInstanceProperty(_context2 = this.displayValue).call(_context2, 0, fromPos) + _sliceInstanceProperty(_context3 = this.displayValue).call(_context3, toPos);
	    return new ChangeDetails();
	  }

	  /** Calls function and reapplies current value */;
	  _proto.withValueRefresh = function withValueRefresh(fn) {
	    if (this._refreshing || !this._initialized) return fn();
	    this._refreshing = true;
	    var rawInput = this.rawInputValue;
	    var value = this.value;
	    var ret = fn();
	    this.rawInputValue = rawInput;
	    // append lost trailing chars at the end
	    if (this.value && this.value !== value && _indexOfInstanceProperty$1(value).call(value, this.value) === 0) {
	      this.append(_sliceInstanceProperty(value).call(value, this.displayValue.length), {}, '');
	    }
	    delete this._refreshing;
	    return ret;
	  };
	  _proto.runIsolated = function runIsolated(fn) {
	    if (this._isolated || !this._initialized) return fn(this);
	    this._isolated = true;
	    var state = this.state;
	    var ret = fn(this);
	    this.state = state;
	    delete this._isolated;
	    return ret;
	  };
	  _proto.doSkipInvalid = function doSkipInvalid(ch, flags, checkTail) {
	    return Boolean(this.skipInvalid);
	  }

	  /** Prepares string before mask processing */;
	  _proto.doPrepare = function doPrepare(str, flags) {
	    if (flags === void 0) {
	      flags = {};
	    }
	    return ChangeDetails.normalize(this.prepare ? this.prepare(str, this, flags) : str);
	  }

	  /** Prepares each char before mask processing */;
	  _proto.doPrepareChar = function doPrepareChar(str, flags) {
	    if (flags === void 0) {
	      flags = {};
	    }
	    return ChangeDetails.normalize(this.prepareChar ? this.prepareChar(str, this, flags) : str);
	  }

	  /** Validates if value is acceptable */;
	  _proto.doValidate = function doValidate(flags) {
	    return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
	  }

	  /** Does additional processing at the end of editing */;
	  _proto.doCommit = function doCommit() {
	    if (this.commit) this.commit(this.value, this);
	  };
	  _proto.splice = function splice(start, deleteCount, inserted, removeDirection, flags) {
	    if (removeDirection === void 0) {
	      removeDirection = DIRECTION.NONE;
	    }
	    if (flags === void 0) {
	      flags = {
	        input: true
	      };
	    }
	    var tailPos = start + deleteCount;
	    var tail = this.extractTail(tailPos);
	    var eagerRemove = this.eager === true || this.eager === 'remove';
	    var oldRawValue;
	    if (eagerRemove) {
	      removeDirection = forceDirection(removeDirection);
	      oldRawValue = this.extractInput(0, tailPos, {
	        raw: true
	      });
	    }
	    var startChangePos = start;
	    var details = new ChangeDetails();

	    // if it is just deletion without insertion
	    if (removeDirection !== DIRECTION.NONE) {
	      startChangePos = this.nearestInputPos(start, deleteCount > 1 && start !== 0 && !eagerRemove ? DIRECTION.NONE : removeDirection);

	      // adjust tailShift if start was aligned
	      details.tailShift = startChangePos - start;
	    }
	    details.aggregate(this.remove(startChangePos));
	    if (eagerRemove && removeDirection !== DIRECTION.NONE && oldRawValue === this.rawInputValue) {
	      if (removeDirection === DIRECTION.FORCE_LEFT) {
	        var valLength;
	        while (oldRawValue === this.rawInputValue && (valLength = this.displayValue.length)) {
	          details.aggregate(new ChangeDetails({
	            tailShift: -1
	          })).aggregate(this.remove(valLength - 1));
	        }
	      } else if (removeDirection === DIRECTION.FORCE_RIGHT) {
	        tail.unshift();
	      }
	    }
	    return details.aggregate(this.append(inserted, flags, tail));
	  };
	  _proto.maskEquals = function maskEquals(mask) {
	    return this.mask === mask;
	  };
	  _proto.typedValueEquals = function typedValueEquals(value) {
	    var _context4, _context5;
	    var tval = this.typedValue;
	    return value === tval || _includesInstanceProperty(_context4 = Masked.EMPTY_VALUES).call(_context4, value) && _includesInstanceProperty(_context5 = Masked.EMPTY_VALUES).call(_context5, tval) || (this.format ? this.format(value, this) === this.format(this.typedValue, this) : false);
	  };
	  _createClass(Masked, [{
	    key: "state",
	    get: function get() {
	      return {
	        _value: this.value,
	        _rawInputValue: this.rawInputValue
	      };
	    },
	    set: function set(state) {
	      this._value = state._value;
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      return this._value;
	    },
	    set: function set(value) {
	      this.resolve(value, {
	        input: true
	      });
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.value;
	    },
	    set: function set(value) {
	      this.resolve(value, {});
	    }
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.parse ? this.parse(this.value, this) : this.unmaskedValue;
	    },
	    set: function set(value) {
	      if (this.format) {
	        this.value = this.format(value, this);
	      } else {
	        this.unmaskedValue = String(value);
	      }
	    }

	    /** Value that includes raw user input */
	  }, {
	    key: "rawInputValue",
	    get: function get() {
	      return this.extractInput(0, this.displayValue.length, {
	        raw: true
	      });
	    },
	    set: function set(value) {
	      this.resolve(value, {
	        raw: true
	      });
	    }
	  }, {
	    key: "displayValue",
	    get: function get() {
	      return this.value;
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return true;
	    }
	  }, {
	    key: "isFilled",
	    get: function get() {
	      return this.isComplete;
	    }
	  }]);
	  return Masked;
	}();
	Masked.DEFAULTS = {
	  skipInvalid: true
	};
	Masked.EMPTY_VALUES = [undefined, null, ''];
	IMask.Masked = Masked;

	var toIntegerOrInfinity = toIntegerOrInfinity$5;
	var toString$2 = toString$a;
	var requireObjectCoercible$1 = requireObjectCoercible$7;

	var $RangeError = RangeError;

	// `String.prototype.repeat` method implementation
	// https://tc39.es/ecma262/#sec-string.prototype.repeat
	var stringRepeat = function repeat(count) {
	  var str = toString$2(requireObjectCoercible$1(this));
	  var result = '';
	  var n = toIntegerOrInfinity(count);
	  if (n < 0 || n == Infinity) throw $RangeError('Wrong number of repetitions');
	  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
	  return result;
	};

	// https://github.com/tc39/proposal-string-pad-start-end
	var uncurryThis$1 = functionUncurryThis;
	var toLength = toLength$3;
	var toString$1 = toString$a;
	var $repeat = stringRepeat;
	var requireObjectCoercible = requireObjectCoercible$7;

	var repeat$4 = uncurryThis$1($repeat);
	var stringSlice = uncurryThis$1(''.slice);
	var ceil = Math.ceil;

	// `String.prototype.{ padStart, padEnd }` methods implementation
	var createMethod = function (IS_END) {
	  return function ($this, maxLength, fillString) {
	    var S = toString$1(requireObjectCoercible($this));
	    var intMaxLength = toLength(maxLength);
	    var stringLength = S.length;
	    var fillStr = fillString === undefined ? ' ' : toString$1(fillString);
	    var fillLen, stringFiller;
	    if (intMaxLength <= stringLength || fillStr == '') return S;
	    fillLen = intMaxLength - stringLength;
	    stringFiller = repeat$4(fillStr, ceil(fillLen / fillStr.length));
	    if (stringFiller.length > fillLen) stringFiller = stringSlice(stringFiller, 0, fillLen);
	    return IS_END ? S + stringFiller : stringFiller + S;
	  };
	};

	var stringPad = {
	  // `String.prototype.padStart` method
	  // https://tc39.es/ecma262/#sec-string.prototype.padstart
	  start: createMethod(false),
	  // `String.prototype.padEnd` method
	  // https://tc39.es/ecma262/#sec-string.prototype.padend
	  end: createMethod(true)
	};

	// https://github.com/zloirock/core-js/issues/280
	var userAgent$2 = engineUserAgent;

	var stringPadWebkitBug = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(userAgent$2);

	var $$7 = _export;
	var $padStart = stringPad.start;
	var WEBKIT_BUG$1 = stringPadWebkitBug;

	// `String.prototype.padStart` method
	// https://tc39.es/ecma262/#sec-string.prototype.padstart
	$$7({ target: 'String', proto: true, forced: WEBKIT_BUG$1 }, {
	  padStart: function padStart(maxLength /* , fillString = ' ' */) {
	    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$6 = entryVirtual$f;

	var padStart$2 = entryVirtual$6('String').padStart;

	var isPrototypeOf$6 = objectIsPrototypeOf;
	var method$6 = padStart$2;

	var StringPrototype$2 = String.prototype;

	var padStart$1 = function (it) {
	  var own = it.padStart;
	  return typeof it == 'string' || it === StringPrototype$2
	    || (isPrototypeOf$6(StringPrototype$2, it) && own === StringPrototype$2.padStart) ? method$6 : own;
	};

	var parent$8 = padStart$1;

	var padStart = parent$8;

	var _padStartInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(padStart);

	var $$6 = _export;
	var $map = arrayIteration.map;
	var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$$6({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$5 = entryVirtual$f;

	var map$2 = entryVirtual$5('Array').map;

	var isPrototypeOf$5 = objectIsPrototypeOf;
	var method$5 = map$2;

	var ArrayPrototype$3 = Array.prototype;

	var map$1 = function (it) {
	  var own = it.map;
	  return it === ArrayPrototype$3 || (isPrototypeOf$5(ArrayPrototype$3, it) && own === ArrayPrototype$3.map) ? method$5 : own;
	};

	var parent$7 = map$1;

	var map = parent$7;

	var _mapInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(map);

	var $$5 = _export;
	var $filter = arrayIteration.filter;
	var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$$5({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$4 = entryVirtual$f;

	var filter$2 = entryVirtual$4('Array').filter;

	var isPrototypeOf$4 = objectIsPrototypeOf;
	var method$4 = filter$2;

	var ArrayPrototype$2 = Array.prototype;

	var filter$1 = function (it) {
	  var own = it.filter;
	  return it === ArrayPrototype$2 || (isPrototypeOf$4(ArrayPrototype$2, it) && own === ArrayPrototype$2.filter) ? method$4 : own;
	};

	var parent$6 = filter$1;

	var filter = parent$6;

	var _filterInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(filter);

	var arraySlice = arraySliceSimple;

	var floor = Math.floor;

	var mergeSort = function (array, comparefn) {
	  var length = array.length;
	  var middle = floor(length / 2);
	  return length < 8 ? insertionSort(array, comparefn) : merge(
	    array,
	    mergeSort(arraySlice(array, 0, middle), comparefn),
	    mergeSort(arraySlice(array, middle), comparefn),
	    comparefn
	  );
	};

	var insertionSort = function (array, comparefn) {
	  var length = array.length;
	  var i = 1;
	  var element, j;

	  while (i < length) {
	    j = i;
	    element = array[i];
	    while (j && comparefn(array[j - 1], element) > 0) {
	      array[j] = array[--j];
	    }
	    if (j !== i++) array[j] = element;
	  } return array;
	};

	var merge = function (array, left, right, comparefn) {
	  var llength = left.length;
	  var rlength = right.length;
	  var lindex = 0;
	  var rindex = 0;

	  while (lindex < llength || rindex < rlength) {
	    array[lindex + rindex] = (lindex < llength && rindex < rlength)
	      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
	      : lindex < llength ? left[lindex++] : right[rindex++];
	  } return array;
	};

	var arraySort = mergeSort;

	var userAgent$1 = engineUserAgent;

	var firefox = userAgent$1.match(/firefox\/(\d+)/i);

	var engineFfVersion = !!firefox && +firefox[1];

	var UA = engineUserAgent;

	var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

	var userAgent = engineUserAgent;

	var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

	var engineWebkitVersion = !!webkit && +webkit[1];

	var $$4 = _export;
	var uncurryThis = functionUncurryThis;
	var aCallable = aCallable$6;
	var toObject = toObject$a;
	var lengthOfArrayLike = lengthOfArrayLike$8;
	var deletePropertyOrThrow = deletePropertyOrThrow$2;
	var toString = toString$a;
	var fails = fails$l;
	var internalSort = arraySort;
	var arrayMethodIsStrict = arrayMethodIsStrict$3;
	var FF = engineFfVersion;
	var IE_OR_EDGE = engineIsIeOrEdge;
	var V8 = engineV8Version;
	var WEBKIT = engineWebkitVersion;

	var test = [];
	var nativeSort = uncurryThis(test.sort);
	var push = uncurryThis(test.push);

	// IE8-
	var FAILS_ON_UNDEFINED = fails(function () {
	  test.sort(undefined);
	});
	// V8 bug
	var FAILS_ON_NULL = fails(function () {
	  test.sort(null);
	});
	// Old WebKit
	var STRICT_METHOD = arrayMethodIsStrict('sort');

	var STABLE_SORT = !fails(function () {
	  // feature detection can be too slow, so check engines versions
	  if (V8) return V8 < 70;
	  if (FF && FF > 3) return;
	  if (IE_OR_EDGE) return true;
	  if (WEBKIT) return WEBKIT < 603;

	  var result = '';
	  var code, chr, value, index;

	  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
	  for (code = 65; code < 76; code++) {
	    chr = String.fromCharCode(code);

	    switch (code) {
	      case 66: case 69: case 70: case 72: value = 3; break;
	      case 68: case 71: value = 4; break;
	      default: value = 2;
	    }

	    for (index = 0; index < 47; index++) {
	      test.push({ k: chr + index, v: value });
	    }
	  }

	  test.sort(function (a, b) { return b.v - a.v; });

	  for (index = 0; index < test.length; index++) {
	    chr = test[index].k.charAt(0);
	    if (result.charAt(result.length - 1) !== chr) result += chr;
	  }

	  return result !== 'DGBEFHACIJK';
	});

	var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

	var getSortCompare = function (comparefn) {
	  return function (x, y) {
	    if (y === undefined) return -1;
	    if (x === undefined) return 1;
	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
	    return toString(x) > toString(y) ? 1 : -1;
	  };
	};

	// `Array.prototype.sort` method
	// https://tc39.es/ecma262/#sec-array.prototype.sort
	$$4({ target: 'Array', proto: true, forced: FORCED }, {
	  sort: function sort(comparefn) {
	    if (comparefn !== undefined) aCallable(comparefn);

	    var array = toObject(this);

	    if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

	    var items = [];
	    var arrayLength = lengthOfArrayLike(array);
	    var itemsLength, index;

	    for (index = 0; index < arrayLength; index++) {
	      if (index in array) push(items, array[index]);
	    }

	    internalSort(items, getSortCompare(comparefn));

	    itemsLength = lengthOfArrayLike(items);
	    index = 0;

	    while (index < itemsLength) array[index] = items[index++];
	    while (index < arrayLength) deletePropertyOrThrow(array, index++);

	    return array;
	  }
	});

	var entryVirtual$3 = entryVirtual$f;

	var sort$2 = entryVirtual$3('Array').sort;

	var isPrototypeOf$3 = objectIsPrototypeOf;
	var method$3 = sort$2;

	var ArrayPrototype$1 = Array.prototype;

	var sort$1 = function (it) {
	  var own = it.sort;
	  return it === ArrayPrototype$1 || (isPrototypeOf$3(ArrayPrototype$1, it) && own === ArrayPrototype$1.sort) ? method$3 : own;
	};

	var parent$5 = sort$1;

	var sort = parent$5;

	var _sortInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(sort);

	var _excluded$6 = ["chunks"];
	var ChunksTailDetails = /*#__PURE__*/function () {
	  /** */

	  function ChunksTailDetails(chunks, from) {
	    if (chunks === void 0) {
	      chunks = [];
	    }
	    if (from === void 0) {
	      from = 0;
	    }
	    this.chunks = chunks;
	    this.from = from;
	  }
	  var _proto = ChunksTailDetails.prototype;
	  _proto.toString = function toString() {
	    var _context;
	    return _mapInstanceProperty(_context = this.chunks).call(_context, String).join('');
	  };
	  _proto.extend = function extend(tailChunk) {
	    if (!String(tailChunk)) return;
	    tailChunk = isString(tailChunk) ? new ContinuousTailDetails(String(tailChunk)) : tailChunk;
	    var lastChunk = this.chunks[this.chunks.length - 1];
	    var extendLast = lastChunk && (
	    // if stops are same or tail has no stop
	    lastChunk.stop === tailChunk.stop || tailChunk.stop == null) &&
	    // if tail chunk goes just after last chunk
	    tailChunk.from === lastChunk.from + lastChunk.toString().length;
	    if (tailChunk instanceof ContinuousTailDetails) {
	      // check the ability to extend previous chunk
	      if (extendLast) {
	        // extend previous chunk
	        lastChunk.extend(tailChunk.toString());
	      } else {
	        // append new chunk
	        this.chunks.push(tailChunk);
	      }
	    } else if (tailChunk instanceof ChunksTailDetails) {
	      if (tailChunk.stop == null) {
	        // unwrap floating chunks to parent, keeping `from` pos
	        var firstTailChunk;
	        while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
	          firstTailChunk = tailChunk.chunks.shift(); // not possible to be `undefined` because length was checked above
	          firstTailChunk.from += tailChunk.from;
	          this.extend(firstTailChunk);
	        }
	      }

	      // if tail chunk still has value
	      if (tailChunk.toString()) {
	        // if chunks contains stops, then popup stop to container
	        tailChunk.stop = tailChunk.blockIndex;
	        this.chunks.push(tailChunk);
	      }
	    }
	  };
	  _proto.appendTo = function appendTo(masked) {
	    if (!(masked instanceof IMask.MaskedPattern)) {
	      var tail = new ContinuousTailDetails(this.toString());
	      return tail.appendTo(masked);
	    }
	    var details = new ChangeDetails();
	    for (var ci = 0; ci < this.chunks.length && !details.skip; ++ci) {
	      var chunk = this.chunks[ci];
	      var lastBlockIter = masked._mapPosToBlock(masked.displayValue.length);
	      var stop = chunk.stop;
	      var chunkBlock = void 0;
	      if (stop != null && (
	      // if block not found or stop is behind lastBlock
	      !lastBlockIter || lastBlockIter.index <= stop)) {
	        var _context2;
	        if (chunk instanceof ChunksTailDetails ||
	        // for continuous block also check if stop is exist
	        _indexOfInstanceProperty$1(_context2 = masked._stops).call(_context2, stop) >= 0) {
	          var phDetails = masked._appendPlaceholder(stop);
	          details.aggregate(phDetails);
	        }
	        chunkBlock = chunk instanceof ChunksTailDetails && masked._blocks[stop];
	      }
	      if (chunkBlock) {
	        var _context3;
	        var tailDetails = chunkBlock.appendTail(chunk);
	        tailDetails.skip = false; // always ignore skip, it will be set on last
	        details.aggregate(tailDetails);
	        masked._value += tailDetails.inserted;

	        // get not inserted chars
	        var remainChars = _sliceInstanceProperty(_context3 = chunk.toString()).call(_context3, tailDetails.rawInserted.length);
	        if (remainChars) details.aggregate(masked.append(remainChars, {
	          tail: true
	        }));
	      } else {
	        details.aggregate(masked.append(chunk.toString(), {
	          tail: true
	        }));
	      }
	    }
	    return details;
	  };
	  _proto.unshift = function unshift(beforePos) {
	    if (!this.chunks.length || beforePos != null && this.from >= beforePos) return '';
	    var chunkShiftPos = beforePos != null ? beforePos - this.from : beforePos;
	    var ci = 0;
	    while (ci < this.chunks.length) {
	      var chunk = this.chunks[ci];
	      var shiftChar = chunk.unshift(chunkShiftPos);
	      if (chunk.toString()) {
	        // chunk still contains value
	        // but not shifted - means no more available chars to shift
	        if (!shiftChar) break;
	        ++ci;
	      } else {
	        var _context4;
	        // clean if chunk has no value
	        _spliceInstanceProperty(_context4 = this.chunks).call(_context4, ci, 1);
	      }
	      if (shiftChar) return shiftChar;
	    }
	    return '';
	  };
	  _proto.shift = function shift() {
	    if (!this.chunks.length) return '';
	    var ci = this.chunks.length - 1;
	    while (0 <= ci) {
	      var chunk = this.chunks[ci];
	      var shiftChar = chunk.shift();
	      if (chunk.toString()) {
	        // chunk still contains value
	        // but not shifted - means no more available chars to shift
	        if (!shiftChar) break;
	        --ci;
	      } else {
	        var _context5;
	        // clean if chunk has no value
	        _spliceInstanceProperty(_context5 = this.chunks).call(_context5, ci, 1);
	      }
	      if (shiftChar) return shiftChar;
	    }
	    return '';
	  };
	  _createClass(ChunksTailDetails, [{
	    key: "state",
	    get: function get() {
	      var _context6;
	      return {
	        chunks: _mapInstanceProperty(_context6 = this.chunks).call(_context6, function (c) {
	          return c.state;
	        }),
	        from: this.from,
	        stop: this.stop,
	        blockIndex: this.blockIndex
	      };
	    },
	    set: function set(state) {
	      var chunks = state.chunks,
	        props = _objectWithoutPropertiesLoose(state, _excluded$6);
	      _Object$assign$1(this, props);
	      this.chunks = _mapInstanceProperty(chunks).call(chunks, function (cstate) {
	        var chunk = "chunks" in cstate ? new ChunksTailDetails() : new ContinuousTailDetails();
	        chunk.state = cstate;
	        return chunk;
	      });
	    }
	  }]);
	  return ChunksTailDetails;
	}();

	var PatternCursor = /*#__PURE__*/function () {
	  function PatternCursor(masked, pos) {
	    this.masked = masked;
	    this._log = [];
	    var _ref = masked._mapPosToBlock(pos) || (pos < 0 ?
	      // first
	      {
	        index: 0,
	        offset: 0
	      } :
	      // last
	      {
	        index: this.masked._blocks.length,
	        offset: 0
	      }),
	      offset = _ref.offset,
	      index = _ref.index;
	    this.offset = offset;
	    this.index = index;
	    this.ok = false;
	  }
	  var _proto = PatternCursor.prototype;
	  _proto.pushState = function pushState() {
	    this._log.push(this.state);
	  };
	  _proto.popState = function popState() {
	    var s = this._log.pop();
	    if (s) this.state = s;
	    return s;
	  };
	  _proto.bindBlock = function bindBlock() {
	    if (this.block) return;
	    if (this.index < 0) {
	      this.index = 0;
	      this.offset = 0;
	    }
	    if (this.index >= this.masked._blocks.length) {
	      this.index = this.masked._blocks.length - 1;
	      this.offset = this.block.displayValue.length; // TODO this is stupid type error, `block` depends on index that was changed above
	    }
	  };
	  _proto._pushLeft = function _pushLeft(fn) {
	    this.pushState();
	    for (this.bindBlock(); 0 <= this.index; --this.index, this.offset = ((_this$block = this.block) == null ? void 0 : _this$block.displayValue.length) || 0) {
	      var _this$block;
	      if (fn()) return this.ok = true;
	    }
	    return this.ok = false;
	  };
	  _proto._pushRight = function _pushRight(fn) {
	    this.pushState();
	    for (this.bindBlock(); this.index < this.masked._blocks.length; ++this.index, this.offset = 0) {
	      if (fn()) return this.ok = true;
	    }
	    return this.ok = false;
	  };
	  _proto.pushLeftBeforeFilled = function pushLeftBeforeFilled() {
	    var _this = this;
	    return this._pushLeft(function () {
	      if (_this.block.isFixed || !_this.block.value) return;
	      _this.offset = _this.block.nearestInputPos(_this.offset, DIRECTION.FORCE_LEFT);
	      if (_this.offset !== 0) return true;
	    });
	  };
	  _proto.pushLeftBeforeInput = function pushLeftBeforeInput() {
	    var _this2 = this;
	    // cases:
	    // filled input: 00|
	    // optional empty input: 00[]|
	    // nested block: XX<[]>|
	    return this._pushLeft(function () {
	      if (_this2.block.isFixed) return;
	      _this2.offset = _this2.block.nearestInputPos(_this2.offset, DIRECTION.LEFT);
	      return true;
	    });
	  };
	  _proto.pushLeftBeforeRequired = function pushLeftBeforeRequired() {
	    var _this3 = this;
	    return this._pushLeft(function () {
	      if (_this3.block.isFixed || _this3.block.isOptional && !_this3.block.value) return;
	      _this3.offset = _this3.block.nearestInputPos(_this3.offset, DIRECTION.LEFT);
	      return true;
	    });
	  };
	  _proto.pushRightBeforeFilled = function pushRightBeforeFilled() {
	    var _this4 = this;
	    return this._pushRight(function () {
	      if (_this4.block.isFixed || !_this4.block.value) return;
	      _this4.offset = _this4.block.nearestInputPos(_this4.offset, DIRECTION.FORCE_RIGHT);
	      if (_this4.offset !== _this4.block.value.length) return true;
	    });
	  };
	  _proto.pushRightBeforeInput = function pushRightBeforeInput() {
	    var _this5 = this;
	    return this._pushRight(function () {
	      if (_this5.block.isFixed) return;

	      // const o = this.offset;
	      _this5.offset = _this5.block.nearestInputPos(_this5.offset, DIRECTION.NONE);
	      // HACK cases like (STILL DOES NOT WORK FOR NESTED)
	      // aa|X
	      // aa<X|[]>X_    - this will not work
	      // if (o && o === this.offset && this.block instanceof PatternInputDefinition) continue;
	      return true;
	    });
	  };
	  _proto.pushRightBeforeRequired = function pushRightBeforeRequired() {
	    var _this6 = this;
	    return this._pushRight(function () {
	      if (_this6.block.isFixed || _this6.block.isOptional && !_this6.block.value) return;

	      // TODO check |[*]XX_
	      _this6.offset = _this6.block.nearestInputPos(_this6.offset, DIRECTION.NONE);
	      return true;
	    });
	  };
	  _createClass(PatternCursor, [{
	    key: "block",
	    get: function get() {
	      return this.masked._blocks[this.index];
	    }
	  }, {
	    key: "pos",
	    get: function get() {
	      return this.masked._blockStartPos(this.index) + this.offset;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        index: this.index,
	        offset: this.offset,
	        ok: this.ok
	      };
	    },
	    set: function set(s) {
	      _Object$assign$1(this, s);
	    }
	  }]);
	  return PatternCursor;
	}();

	var PatternFixedDefinition = /*#__PURE__*/function () {
	  /** */

	  /** */

	  /** */

	  /** */

	  /** */

	  /** */

	  function PatternFixedDefinition(opts) {
	    _Object$assign$1(this, opts);
	    this._value = '';
	    this.isFixed = true;
	  }
	  var _proto = PatternFixedDefinition.prototype;
	  _proto.reset = function reset() {
	    this._isRawInput = false;
	    this._value = '';
	  };
	  _proto.remove = function remove(fromPos, toPos) {
	    var _context, _context2;
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this._value.length;
	    }
	    this._value = _sliceInstanceProperty(_context = this._value).call(_context, 0, fromPos) + _sliceInstanceProperty(_context2 = this._value).call(_context2, toPos);
	    if (!this._value) this._isRawInput = false;
	    return new ChangeDetails();
	  };
	  _proto.nearestInputPos = function nearestInputPos(cursorPos, direction) {
	    if (direction === void 0) {
	      direction = DIRECTION.NONE;
	    }
	    var minPos = 0;
	    var maxPos = this._value.length;
	    switch (direction) {
	      case DIRECTION.LEFT:
	      case DIRECTION.FORCE_LEFT:
	        return minPos;
	      case DIRECTION.NONE:
	      case DIRECTION.RIGHT:
	      case DIRECTION.FORCE_RIGHT:
	      default:
	        return maxPos;
	    }
	  };
	  _proto.totalInputPositions = function totalInputPositions(fromPos, toPos) {
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this._value.length;
	    }
	    return this._isRawInput ? toPos - fromPos : 0;
	  };
	  _proto.extractInput = function extractInput(fromPos, toPos, flags) {
	    var _context3;
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this._value.length;
	    }
	    if (flags === void 0) {
	      flags = {};
	    }
	    return flags.raw && this._isRawInput && _sliceInstanceProperty(_context3 = this._value).call(_context3, fromPos, toPos) || '';
	  };
	  _proto._appendChar = function _appendChar(ch, flags) {
	    if (flags === void 0) {
	      flags = {};
	    }
	    var details = new ChangeDetails();
	    if (this.isFilled) return details;
	    var appendEager = this.eager === true || this.eager === 'append';
	    var appended = this.char === ch;
	    var isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && (!flags.raw || !appendEager) && !flags.tail;
	    if (isResolved) details.rawInserted = this.char;
	    this._value = details.inserted = this.char;
	    this._isRawInput = isResolved && (flags.raw || flags.input);
	    return details;
	  };
	  _proto._appendEager = function _appendEager() {
	    return this._appendChar(this.char, {
	      tail: true
	    });
	  };
	  _proto._appendPlaceholder = function _appendPlaceholder() {
	    var details = new ChangeDetails();
	    if (this.isFilled) return details;
	    this._value = details.inserted = this.char;
	    return details;
	  };
	  _proto.extractTail = function extractTail() {
	    return new ContinuousTailDetails('');
	  };
	  _proto.appendTail = function appendTail(tail) {
	    if (isString(tail)) tail = new ContinuousTailDetails(String(tail));
	    return tail.appendTo(this);
	  };
	  _proto.append = function append(str, flags, tail) {
	    var details = this._appendChar(str[0], flags);
	    if (tail != null) {
	      details.tailShift += this.appendTail(tail).tailShift;
	    }
	    return details;
	  };
	  _proto.doCommit = function doCommit() {};
	  _createClass(PatternFixedDefinition, [{
	    key: "value",
	    get: function get() {
	      return this._value;
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.isUnmasking ? this.value : '';
	    }
	  }, {
	    key: "rawInputValue",
	    get: function get() {
	      return this._isRawInput ? this.value : '';
	    }
	  }, {
	    key: "displayValue",
	    get: function get() {
	      return this.value;
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return true;
	    }
	  }, {
	    key: "isFilled",
	    get: function get() {
	      return Boolean(this._value);
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        _value: this._value,
	        _rawInputValue: this.rawInputValue
	      };
	    },
	    set: function set(state) {
	      this._value = state._value;
	      this._isRawInput = Boolean(state._rawInputValue);
	    }
	  }]);
	  return PatternFixedDefinition;
	}();

	var _excluded$5 = ["parent", "isOptional", "placeholderChar", "displayChar", "lazy", "eager"];
	var PatternInputDefinition = /*#__PURE__*/function () {
	  /** */

	  /** */

	  /** */

	  /** */

	  /** */

	  /** */

	  /** */

	  /** */

	  function PatternInputDefinition(opts) {
	    var parent = opts.parent,
	      isOptional = opts.isOptional,
	      placeholderChar = opts.placeholderChar,
	      displayChar = opts.displayChar,
	      lazy = opts.lazy,
	      eager = opts.eager,
	      maskOpts = _objectWithoutPropertiesLoose(opts, _excluded$5);
	    this.masked = createMask(maskOpts);
	    _Object$assign$1(this, {
	      parent: parent,
	      isOptional: isOptional,
	      placeholderChar: placeholderChar,
	      displayChar: displayChar,
	      lazy: lazy,
	      eager: eager
	    });
	  }
	  var _proto = PatternInputDefinition.prototype;
	  _proto.reset = function reset() {
	    this.isFilled = false;
	    this.masked.reset();
	  };
	  _proto.remove = function remove(fromPos, toPos) {
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this.value.length;
	    }
	    if (fromPos === 0 && toPos >= 1) {
	      this.isFilled = false;
	      return this.masked.remove(fromPos, toPos);
	    }
	    return new ChangeDetails();
	  };
	  _proto._appendChar = function _appendChar(ch, flags) {
	    if (flags === void 0) {
	      flags = {};
	    }
	    if (this.isFilled) return new ChangeDetails();
	    var state = this.masked.state;
	    // simulate input
	    var details = this.masked._appendChar(ch, this.currentMaskFlags(flags));
	    if (details.inserted && this.doValidate(flags) === false) {
	      details.inserted = details.rawInserted = '';
	      this.masked.state = state;
	    }
	    if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) {
	      details.inserted = this.placeholderChar;
	    }
	    details.skip = !details.inserted && !this.isOptional;
	    this.isFilled = Boolean(details.inserted);
	    return details;
	  };
	  _proto.append = function append(str, flags, tail) {
	    // TODO probably should be done via _appendChar
	    return this.masked.append(str, this.currentMaskFlags(flags), tail);
	  };
	  _proto._appendPlaceholder = function _appendPlaceholder() {
	    var details = new ChangeDetails();
	    if (this.isFilled || this.isOptional) return details;
	    this.isFilled = true;
	    details.inserted = this.placeholderChar;
	    return details;
	  };
	  _proto._appendEager = function _appendEager() {
	    return new ChangeDetails();
	  };
	  _proto.extractTail = function extractTail(fromPos, toPos) {
	    return this.masked.extractTail(fromPos, toPos);
	  };
	  _proto.appendTail = function appendTail(tail) {
	    return this.masked.appendTail(tail);
	  };
	  _proto.extractInput = function extractInput(fromPos, toPos, flags) {
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this.value.length;
	    }
	    return this.masked.extractInput(fromPos, toPos, flags);
	  };
	  _proto.nearestInputPos = function nearestInputPos(cursorPos, direction) {
	    if (direction === void 0) {
	      direction = DIRECTION.NONE;
	    }
	    var minPos = 0;
	    var maxPos = this.value.length;
	    var boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);
	    switch (direction) {
	      case DIRECTION.LEFT:
	      case DIRECTION.FORCE_LEFT:
	        return this.isComplete ? boundPos : minPos;
	      case DIRECTION.RIGHT:
	      case DIRECTION.FORCE_RIGHT:
	        return this.isComplete ? boundPos : maxPos;
	      case DIRECTION.NONE:
	      default:
	        return boundPos;
	    }
	  };
	  _proto.totalInputPositions = function totalInputPositions(fromPos, toPos) {
	    var _context;
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this.value.length;
	    }
	    return _sliceInstanceProperty(_context = this.value).call(_context, fromPos, toPos).length;
	  };
	  _proto.doValidate = function doValidate(flags) {
	    return this.masked.doValidate(this.currentMaskFlags(flags)) && (!this.parent || this.parent.doValidate(this.currentMaskFlags(flags)));
	  };
	  _proto.doCommit = function doCommit() {
	    this.masked.doCommit();
	  };
	  _proto.currentMaskFlags = function currentMaskFlags(flags) {
	    var _flags$_beforeTailSta;
	    return _extends({}, flags, {
	      _beforeTailState: (flags == null || (_flags$_beforeTailSta = flags._beforeTailState) == null ? void 0 : _flags$_beforeTailSta.masked) || (flags == null ? void 0 : flags._beforeTailState)
	    });
	  };
	  _createClass(PatternInputDefinition, [{
	    key: "value",
	    get: function get() {
	      return this.masked.value || (this.isFilled && !this.isOptional ? this.placeholderChar : '');
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.masked.unmaskedValue;
	    }
	  }, {
	    key: "rawInputValue",
	    get: function get() {
	      return this.masked.rawInputValue;
	    }
	  }, {
	    key: "displayValue",
	    get: function get() {
	      return this.masked.value && this.displayChar || this.value;
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return Boolean(this.masked.value) || this.isOptional;
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      return {
	        _value: this.value,
	        _rawInputValue: this.rawInputValue,
	        masked: this.masked.state,
	        isFilled: this.isFilled
	      };
	    },
	    set: function set(state) {
	      this.masked.state = state.masked;
	      this.isFilled = state.isFilled;
	    }
	  }]);
	  return PatternInputDefinition;
	}();
	PatternInputDefinition.DEFAULT_DEFINITIONS = {
	  '0': /\d/,
	  'a': /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
	  // http://stackoverflow.com/a/22075070
	  '*': /./
	};

	/** Masking by RegExp */
	var MaskedRegExp = /*#__PURE__*/function (_Masked) {
	  _inheritsLoose(MaskedRegExp, _Masked);
	  function MaskedRegExp() {
	    return _Masked.apply(this, arguments) || this;
	  }
	  var _proto = MaskedRegExp.prototype;
	  /** */
	  /** Enable characters overwriting */
	  /** */
	  /** */
	  _proto.updateOptions = function updateOptions(opts) {
	    _Masked.prototype.updateOptions.call(this, opts);
	  };
	  _proto._update = function _update(opts) {
	    var mask = opts.mask;
	    if (mask) opts.validate = function (value) {
	      return value.search(mask) >= 0;
	    };
	    _Masked.prototype._update.call(this, opts);
	  };
	  return MaskedRegExp;
	}(Masked);
	IMask.MaskedRegExp = MaskedRegExp;

	var _excluded$4 = ["expose"],
	  _excluded2$2 = ["_blocks"];
	/** Pattern mask */
	var MaskedPattern = /*#__PURE__*/function (_Masked) {
	  _inheritsLoose(MaskedPattern, _Masked);
	  /** */

	  /** */

	  /** Single char for empty input */

	  /** Single char for filled input */

	  /** Show placeholder only when needed */

	  /** Enable characters overwriting */

	  /** */

	  /** */

	  function MaskedPattern(opts) {
	    return _Masked.call(this, _extends({}, MaskedPattern.DEFAULTS, opts, {
	      definitions: _Object$assign$1({}, PatternInputDefinition.DEFAULT_DEFINITIONS, opts == null ? void 0 : opts.definitions)
	    })) || this;
	  }
	  var _proto = MaskedPattern.prototype;
	  _proto.updateOptions = function updateOptions(opts) {
	    _Masked.prototype.updateOptions.call(this, opts);
	  };
	  _proto._update = function _update(opts) {
	    opts.definitions = _Object$assign$1({}, this.definitions, opts.definitions);
	    _Masked.prototype._update.call(this, opts);
	    this._rebuildMask();
	  };
	  _proto._rebuildMask = function _rebuildMask() {
	    var _this = this;
	    var defs = this.definitions;
	    this._blocks = [];
	    this.exposeBlock = undefined;
	    this._stops = [];
	    this._maskedBlocks = {};
	    var pattern = this.mask;
	    if (!pattern || !defs) return;
	    var unmaskingBlock = false;
	    var optionalBlock = false;
	    var _loop = function _loop(_i) {
	      if (_this.blocks) {
	        var _context;
	        var p = _sliceInstanceProperty(pattern).call(pattern, _i);
	        var bNames = _filterInstanceProperty(_context = _Object$keys$1(_this.blocks)).call(_context, function (bName) {
	          return _indexOfInstanceProperty$1(p).call(p, bName) === 0;
	        });
	        // order by key length
	        _sortInstanceProperty(bNames).call(bNames, function (a, b) {
	          return b.length - a.length;
	        });
	        // use block name with max length
	        var bName = bNames[0];
	        if (bName) {
	          var _ref = normalizeOpts(_this.blocks[bName]),
	            expose = _ref.expose,
	            blockOpts = _objectWithoutPropertiesLoose(_ref, _excluded$4);
	          var maskedBlock = createMask(_extends({
	            lazy: _this.lazy,
	            eager: _this.eager,
	            placeholderChar: _this.placeholderChar,
	            displayChar: _this.displayChar,
	            overwrite: _this.overwrite
	          }, blockOpts, {
	            parent: _this
	          }));
	          if (maskedBlock) {
	            _this._blocks.push(maskedBlock);
	            if (expose) _this.exposeBlock = maskedBlock;

	            // store block index
	            if (!_this._maskedBlocks[bName]) _this._maskedBlocks[bName] = [];
	            _this._maskedBlocks[bName].push(_this._blocks.length - 1);
	          }
	          _i += bName.length - 1;
	          i = _i;
	          return "continue";
	        }
	      }
	      var char = pattern[_i];
	      var isInput = (char in defs);
	      if (char === MaskedPattern.STOP_CHAR) {
	        _this._stops.push(_this._blocks.length);
	        i = _i;
	        return "continue";
	      }
	      if (char === '{' || char === '}') {
	        unmaskingBlock = !unmaskingBlock;
	        i = _i;
	        return "continue";
	      }
	      if (char === '[' || char === ']') {
	        optionalBlock = !optionalBlock;
	        i = _i;
	        return "continue";
	      }
	      if (char === MaskedPattern.ESCAPE_CHAR) {
	        ++_i;
	        char = pattern[_i];
	        if (!char) {
	          i = _i;
	          return "break";
	        }
	        isInput = false;
	      }
	      var def = isInput ? new PatternInputDefinition(_extends({
	        isOptional: optionalBlock,
	        lazy: _this.lazy,
	        eager: _this.eager,
	        placeholderChar: _this.placeholderChar,
	        displayChar: _this.displayChar
	      }, normalizeOpts(defs[char]), {
	        parent: _this
	      })) : new PatternFixedDefinition({
	        char: char,
	        eager: _this.eager,
	        isUnmasking: unmaskingBlock
	      });
	      _this._blocks.push(def);
	      i = _i;
	    };
	    for (var i = 0; i < pattern.length; ++i) {
	      var _ret = _loop(i);
	      if (_ret === "continue") continue;
	      if (_ret === "break") break;
	    }
	  };
	  _proto.reset = function reset() {
	    _Masked.prototype.reset.call(this);
	    this._blocks.forEach(function (b) {
	      return b.reset();
	    });
	  };
	  _proto.doCommit = function doCommit() {
	    this._blocks.forEach(function (b) {
	      return b.doCommit();
	    });
	    _Masked.prototype.doCommit.call(this);
	  };
	  _proto.appendTail = function appendTail(tail) {
	    return _Masked.prototype.appendTail.call(this, tail).aggregate(this._appendPlaceholder());
	  };
	  _proto._appendEager = function _appendEager() {
	    var _this$_mapPosToBlock;
	    var details = new ChangeDetails();
	    var startBlockIndex = (_this$_mapPosToBlock = this._mapPosToBlock(this.displayValue.length)) == null ? void 0 : _this$_mapPosToBlock.index;
	    if (startBlockIndex == null) return details;

	    // TODO test if it works for nested pattern masks
	    if (this._blocks[startBlockIndex].isFilled) ++startBlockIndex;
	    for (var bi = startBlockIndex; bi < this._blocks.length; ++bi) {
	      var d = this._blocks[bi]._appendEager();
	      if (!d.inserted) break;
	      details.aggregate(d);
	    }
	    return details;
	  };
	  _proto._appendCharRaw = function _appendCharRaw(ch, flags) {
	    if (flags === void 0) {
	      flags = {};
	    }
	    var blockIter = this._mapPosToBlock(this.displayValue.length);
	    var details = new ChangeDetails();
	    if (!blockIter) return details;
	    for (var bi = blockIter.index;; ++bi) {
	      var _flags$_beforeTailSta;
	      var _block = this._blocks[bi];
	      if (!_block) break;
	      var blockDetails = _block._appendChar(ch, _extends({}, flags, {
	        _beforeTailState: (_flags$_beforeTailSta = flags._beforeTailState) == null || (_flags$_beforeTailSta = _flags$_beforeTailSta._blocks) == null ? void 0 : _flags$_beforeTailSta[bi]
	      }));
	      var skip = blockDetails.skip;
	      details.aggregate(blockDetails);
	      if (skip || blockDetails.rawInserted) break; // go next char
	    }

	    return details;
	  };
	  _proto.extractTail = function extractTail(fromPos, toPos) {
	    var _this2 = this;
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this.displayValue.length;
	    }
	    var chunkTail = new ChunksTailDetails();
	    if (fromPos === toPos) return chunkTail;
	    this._forEachBlocksInRange(fromPos, toPos, function (b, bi, bFromPos, bToPos) {
	      var blockChunk = b.extractTail(bFromPos, bToPos);
	      blockChunk.stop = _this2._findStopBefore(bi);
	      blockChunk.from = _this2._blockStartPos(bi);
	      if (blockChunk instanceof ChunksTailDetails) blockChunk.blockIndex = bi;
	      chunkTail.extend(blockChunk);
	    });
	    return chunkTail;
	  };
	  _proto.extractInput = function extractInput(fromPos, toPos, flags) {
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this.displayValue.length;
	    }
	    if (flags === void 0) {
	      flags = {};
	    }
	    if (fromPos === toPos) return '';
	    var input = '';
	    this._forEachBlocksInRange(fromPos, toPos, function (b, _, fromPos, toPos) {
	      input += b.extractInput(fromPos, toPos, flags);
	    });
	    return input;
	  };
	  _proto._findStopBefore = function _findStopBefore(blockIndex) {
	    var stopBefore;
	    for (var si = 0; si < this._stops.length; ++si) {
	      var stop = this._stops[si];
	      if (stop <= blockIndex) stopBefore = stop;else break;
	    }
	    return stopBefore;
	  }

	  /** Appends placeholder depending on laziness */;
	  _proto._appendPlaceholder = function _appendPlaceholder(toBlockIndex) {
	    var _context2,
	      _this3 = this;
	    var details = new ChangeDetails();
	    if (this.lazy && toBlockIndex == null) return details;
	    var startBlockIter = this._mapPosToBlock(this.displayValue.length);
	    if (!startBlockIter) return details;
	    var startBlockIndex = startBlockIter.index;
	    var endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;
	    _sliceInstanceProperty(_context2 = this._blocks).call(_context2, startBlockIndex, endBlockIndex).forEach(function (b) {
	      if (!b.lazy || toBlockIndex != null) {
	        var _blocks2;
	        var bDetails = b._appendPlaceholder((_blocks2 = b._blocks) == null ? void 0 : _blocks2.length);
	        _this3._value += bDetails.inserted;
	        details.aggregate(bDetails);
	      }
	    });
	    return details;
	  }

	  /** Finds block in pos */;
	  _proto._mapPosToBlock = function _mapPosToBlock(pos) {
	    var accVal = '';
	    for (var bi = 0; bi < this._blocks.length; ++bi) {
	      var _block2 = this._blocks[bi];
	      var blockStartPos = accVal.length;
	      accVal += _block2.displayValue;
	      if (pos <= accVal.length) {
	        return {
	          index: bi,
	          offset: pos - blockStartPos
	        };
	      }
	    }
	  };
	  _proto._blockStartPos = function _blockStartPos(blockIndex) {
	    var _context3, _context4;
	    return _reduceInstanceProperty(_context3 = _sliceInstanceProperty(_context4 = this._blocks).call(_context4, 0, blockIndex)).call(_context3, function (pos, b) {
	      return pos += b.displayValue.length;
	    }, 0);
	  };
	  _proto._forEachBlocksInRange = function _forEachBlocksInRange(fromPos, toPos, fn) {
	    if (toPos === void 0) {
	      toPos = this.displayValue.length;
	    }
	    var fromBlockIter = this._mapPosToBlock(fromPos);
	    if (fromBlockIter) {
	      var toBlockIter = this._mapPosToBlock(toPos);
	      // process first block
	      var isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
	      var fromBlockStartPos = fromBlockIter.offset;
	      var fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].displayValue.length;
	      fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);
	      if (toBlockIter && !isSameBlock) {
	        // process intermediate blocks
	        for (var bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
	          fn(this._blocks[bi], bi, 0, this._blocks[bi].displayValue.length);
	        }

	        // process last block
	        fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
	      }
	    }
	  };
	  _proto.remove = function remove(fromPos, toPos) {
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this.displayValue.length;
	    }
	    var removeDetails = _Masked.prototype.remove.call(this, fromPos, toPos);
	    this._forEachBlocksInRange(fromPos, toPos, function (b, _, bFromPos, bToPos) {
	      removeDetails.aggregate(b.remove(bFromPos, bToPos));
	    });
	    return removeDetails;
	  };
	  _proto.nearestInputPos = function nearestInputPos(cursorPos, direction) {
	    if (direction === void 0) {
	      direction = DIRECTION.NONE;
	    }
	    if (!this._blocks.length) return 0;
	    var cursor = new PatternCursor(this, cursorPos);
	    if (direction === DIRECTION.NONE) {
	      // -------------------------------------------------
	      // NONE should only go out from fixed to the right!
	      // -------------------------------------------------
	      if (cursor.pushRightBeforeInput()) return cursor.pos;
	      cursor.popState();
	      if (cursor.pushLeftBeforeInput()) return cursor.pos;
	      return this.displayValue.length;
	    }

	    // FORCE is only about a|* otherwise is 0
	    if (direction === DIRECTION.LEFT || direction === DIRECTION.FORCE_LEFT) {
	      // try to break fast when *|a
	      if (direction === DIRECTION.LEFT) {
	        cursor.pushRightBeforeFilled();
	        if (cursor.ok && cursor.pos === cursorPos) return cursorPos;
	        cursor.popState();
	      }

	      // forward flow
	      cursor.pushLeftBeforeInput();
	      cursor.pushLeftBeforeRequired();
	      cursor.pushLeftBeforeFilled();

	      // backward flow
	      if (direction === DIRECTION.LEFT) {
	        cursor.pushRightBeforeInput();
	        cursor.pushRightBeforeRequired();
	        if (cursor.ok && cursor.pos <= cursorPos) return cursor.pos;
	        cursor.popState();
	        if (cursor.ok && cursor.pos <= cursorPos) return cursor.pos;
	        cursor.popState();
	      }
	      if (cursor.ok) return cursor.pos;
	      if (direction === DIRECTION.FORCE_LEFT) return 0;
	      cursor.popState();
	      if (cursor.ok) return cursor.pos;
	      cursor.popState();
	      if (cursor.ok) return cursor.pos;
	      return 0;
	    }
	    if (direction === DIRECTION.RIGHT || direction === DIRECTION.FORCE_RIGHT) {
	      // forward flow
	      cursor.pushRightBeforeInput();
	      cursor.pushRightBeforeRequired();
	      if (cursor.pushRightBeforeFilled()) return cursor.pos;
	      if (direction === DIRECTION.FORCE_RIGHT) return this.displayValue.length;

	      // backward flow
	      cursor.popState();
	      if (cursor.ok) return cursor.pos;
	      cursor.popState();
	      if (cursor.ok) return cursor.pos;
	      return this.nearestInputPos(cursorPos, DIRECTION.LEFT);
	    }
	    return cursorPos;
	  };
	  _proto.totalInputPositions = function totalInputPositions(fromPos, toPos) {
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this.displayValue.length;
	    }
	    var total = 0;
	    this._forEachBlocksInRange(fromPos, toPos, function (b, _, bFromPos, bToPos) {
	      total += b.totalInputPositions(bFromPos, bToPos);
	    });
	    return total;
	  }

	  /** Get block by name */;
	  _proto.maskedBlock = function maskedBlock(name) {
	    return this.maskedBlocks(name)[0];
	  }

	  /** Get all blocks by name */;
	  _proto.maskedBlocks = function maskedBlocks(name) {
	    var _this4 = this;
	    var indices = this._maskedBlocks[name];
	    if (!indices) return [];
	    return _mapInstanceProperty(indices).call(indices, function (gi) {
	      return _this4._blocks[gi];
	    });
	  };
	  _createClass(MaskedPattern, [{
	    key: "state",
	    get: function get() {
	      var _context5;
	      return _extends({}, _Masked.prototype.state, {
	        _blocks: _mapInstanceProperty(_context5 = this._blocks).call(_context5, function (b) {
	          return b.state;
	        })
	      });
	    },
	    set: function set(state) {
	      var _blocks = state._blocks,
	        maskedState = _objectWithoutPropertiesLoose(state, _excluded2$2);
	      this._blocks.forEach(function (b, bi) {
	        return b.state = _blocks[bi];
	      });
	      this.state = maskedState;
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return this.exposeBlock ? this.exposeBlock.isComplete : this._blocks.every(function (b) {
	        return b.isComplete;
	      });
	    }
	  }, {
	    key: "isFilled",
	    get: function get() {
	      return this._blocks.every(function (b) {
	        return b.isFilled;
	      });
	    }
	  }, {
	    key: "isFixed",
	    get: function get() {
	      return this._blocks.every(function (b) {
	        return b.isFixed;
	      });
	    }
	  }, {
	    key: "isOptional",
	    get: function get() {
	      return this._blocks.every(function (b) {
	        return b.isOptional;
	      });
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      var _context6;
	      return this.exposeBlock ? this.exposeBlock.unmaskedValue : _reduceInstanceProperty(_context6 = this._blocks).call(_context6, function (str, b) {
	        return str += b.unmaskedValue;
	      }, '');
	    },
	    set: function set(unmaskedValue) {
	      if (this.exposeBlock) {
	        var _context7;
	        var tail = this.extractTail(this._blockStartPos(_indexOfInstanceProperty$1(_context7 = this._blocks).call(_context7, this.exposeBlock)) + this.exposeBlock.displayValue.length);
	        this.exposeBlock.unmaskedValue = unmaskedValue;
	        this.appendTail(tail);
	        this.doCommit();
	      } else this.unmaskedValue = unmaskedValue;
	    }
	  }, {
	    key: "value",
	    get: function get() {
	      var _context8;
	      return this.exposeBlock ? this.exposeBlock.value :
	      // TODO return _value when not in change?
	      _reduceInstanceProperty(_context8 = this._blocks).call(_context8, function (str, b) {
	        return str += b.value;
	      }, '');
	    },
	    set: function set(value) {
	      if (this.exposeBlock) {
	        var _context9;
	        var tail = this.extractTail(this._blockStartPos(_indexOfInstanceProperty$1(_context9 = this._blocks).call(_context9, this.exposeBlock)) + this.exposeBlock.displayValue.length);
	        this.exposeBlock.value = value;
	        this.appendTail(tail);
	        this.doCommit();
	      } else this.value = value;
	    }
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.exposeBlock ? this.exposeBlock.typedValue : _Masked.prototype.typedValue;
	    },
	    set: function set(value) {
	      if (this.exposeBlock) {
	        var _context10;
	        var tail = this.extractTail(this._blockStartPos(_indexOfInstanceProperty$1(_context10 = this._blocks).call(_context10, this.exposeBlock)) + this.exposeBlock.displayValue.length);
	        this.exposeBlock.typedValue = value;
	        this.appendTail(tail);
	        this.doCommit();
	      } else this.typedValue = value;
	    }
	  }, {
	    key: "displayValue",
	    get: function get() {
	      var _context11;
	      return _reduceInstanceProperty(_context11 = this._blocks).call(_context11, function (str, b) {
	        return str += b.displayValue;
	      }, '');
	    }
	  }]);
	  return MaskedPattern;
	}(Masked);
	MaskedPattern.DEFAULTS = {
	  lazy: true,
	  placeholderChar: '_'
	};
	MaskedPattern.STOP_CHAR = '`';
	MaskedPattern.ESCAPE_CHAR = '\\';
	MaskedPattern.InputDefinition = PatternInputDefinition;
	MaskedPattern.FixedDefinition = PatternFixedDefinition;
	IMask.MaskedPattern = MaskedPattern;

	var $$3 = _export;
	var repeat$3 = stringRepeat;

	// `String.prototype.repeat` method
	// https://tc39.es/ecma262/#sec-string.prototype.repeat
	$$3({ target: 'String', proto: true }, {
	  repeat: repeat$3
	});

	var entryVirtual$2 = entryVirtual$f;

	var repeat$2 = entryVirtual$2('String').repeat;

	var isPrototypeOf$2 = objectIsPrototypeOf;
	var method$2 = repeat$2;

	var StringPrototype$1 = String.prototype;

	var repeat$1 = function (it) {
	  var own = it.repeat;
	  return typeof it == 'string' || it === StringPrototype$1
	    || (isPrototypeOf$2(StringPrototype$1, it) && own === StringPrototype$1.repeat) ? method$2 : own;
	};

	var parent$4 = repeat$1;

	var repeat = parent$4;

	var _repeatInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(repeat);

	var $$2 = _export;
	var $padEnd = stringPad.end;
	var WEBKIT_BUG = stringPadWebkitBug;

	// `String.prototype.padEnd` method
	// https://tc39.es/ecma262/#sec-string.prototype.padend
	$$2({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
	  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
	    return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var entryVirtual$1 = entryVirtual$f;

	var padEnd$2 = entryVirtual$1('String').padEnd;

	var isPrototypeOf$1 = objectIsPrototypeOf;
	var method$1 = padEnd$2;

	var StringPrototype = String.prototype;

	var padEnd$1 = function (it) {
	  var own = it.padEnd;
	  return typeof it == 'string' || it === StringPrototype
	    || (isPrototypeOf$1(StringPrototype, it) && own === StringPrototype.padEnd) ? method$1 : own;
	};

	var parent$3 = padEnd$1;

	var padEnd = parent$3;

	var _padEndInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(padEnd);

	var _excluded$3 = ["to", "from", "maxLength", "autofix"];
	/** Pattern which accepts ranges */
	var MaskedRange = /*#__PURE__*/function (_MaskedPattern) {
	  _inheritsLoose(MaskedRange, _MaskedPattern);
	  function MaskedRange(opts) {
	    return _MaskedPattern.call(this, opts) || this; // mask will be created in _update
	  }
	  var _proto = MaskedRange.prototype;
	  _proto.updateOptions = function updateOptions(opts) {
	    _MaskedPattern.prototype.updateOptions.call(this, opts);
	  };
	  _proto._update = function _update(opts) {
	    var _context, _context2, _context3;
	    var _opts$to = opts.to,
	      to = _opts$to === void 0 ? this.to || 0 : _opts$to,
	      _opts$from = opts.from,
	      from = _opts$from === void 0 ? this.from || 0 : _opts$from,
	      _opts$maxLength = opts.maxLength,
	      maxLength = _opts$maxLength === void 0 ? this.maxLength || 0 : _opts$maxLength,
	      _opts$autofix = opts.autofix,
	      autofix = _opts$autofix === void 0 ? this.autofix : _opts$autofix,
	      patternOpts = _objectWithoutPropertiesLoose(opts, _excluded$3);
	    this.to = to;
	    this.from = from;
	    this.maxLength = Math.max(String(to).length, maxLength);
	    this.autofix = autofix;
	    var fromStr = _padStartInstanceProperty(_context = String(this.from)).call(_context, this.maxLength, '0');
	    var toStr = _padStartInstanceProperty(_context2 = String(this.to)).call(_context2, this.maxLength, '0');
	    var sameCharsCount = 0;
	    while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) ++sameCharsCount;
	    patternOpts.mask = _sliceInstanceProperty(toStr).call(toStr, 0, sameCharsCount).replace(/0/g, '\\0') + _repeatInstanceProperty(_context3 = '0').call(_context3, this.maxLength - sameCharsCount);
	    _MaskedPattern.prototype._update.call(this, patternOpts);
	  };
	  _proto.boundaries = function boundaries(str) {
	    var minstr = '';
	    var maxstr = '';
	    var _ref = str.match(/^(\D*)(\d*)(\D*)/) || [],
	      placeholder = _ref[1],
	      num = _ref[2];
	    if (num) {
	      var _context4, _context5;
	      minstr = _repeatInstanceProperty(_context4 = '0').call(_context4, placeholder.length) + num;
	      maxstr = _repeatInstanceProperty(_context5 = '9').call(_context5, placeholder.length) + num;
	    }
	    minstr = _padEndInstanceProperty(minstr).call(minstr, this.maxLength, '0');
	    maxstr = _padEndInstanceProperty(maxstr).call(maxstr, this.maxLength, '9');
	    return [minstr, maxstr];
	  };
	  _proto.doPrepareChar = function doPrepareChar(ch, flags) {
	    var _context6, _context7;
	    if (flags === void 0) {
	      flags = {};
	    }
	    var details;
	    var _MaskedPattern$protot = _MaskedPattern.prototype.doPrepareChar.call(this, ch.replace(/\D/g, ''), flags);
	    ch = _MaskedPattern$protot[0];
	    details = _MaskedPattern$protot[1];
	    if (!this.autofix || !ch) return [ch, details];
	    var fromStr = _padStartInstanceProperty(_context6 = String(this.from)).call(_context6, this.maxLength, '0');
	    var toStr = _padStartInstanceProperty(_context7 = String(this.to)).call(_context7, this.maxLength, '0');
	    var nextVal = this.value + ch;
	    if (nextVal.length > this.maxLength) return ['', details];
	    var _this$boundaries = this.boundaries(nextVal),
	      minstr = _this$boundaries[0],
	      maxstr = _this$boundaries[1];
	    if (Number(maxstr) < this.from) return [fromStr[nextVal.length - 1], details];
	    if (Number(minstr) > this.to) {
	      if (this.autofix === 'pad' && nextVal.length < this.maxLength) {
	        return ['', details.aggregate(this.append(fromStr[nextVal.length - 1] + ch, flags))];
	      }
	      return [toStr[nextVal.length - 1], details];
	    }
	    return [ch, details];
	  };
	  _proto.doValidate = function doValidate(flags) {
	    var str = this.value;
	    var firstNonZero = str.search(/[^0]/);
	    if (firstNonZero === -1 && str.length <= this._matchFrom) return true;
	    var _this$boundaries2 = this.boundaries(str),
	      minstr = _this$boundaries2[0],
	      maxstr = _this$boundaries2[1];
	    return this.from <= Number(maxstr) && Number(minstr) <= this.to && _MaskedPattern.prototype.doValidate.call(this, flags);
	  };
	  _createClass(MaskedRange, [{
	    key: "_matchFrom",
	    get:
	    /**
	      Optionally sets max length of pattern.
	      Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
	    */

	    /** Min bound */

	    /** Max bound */

	    /** */

	    function get() {
	      return this.maxLength - String(this.from).length;
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      return _MaskedPattern.prototype.isComplete && Boolean(this.value);
	    }
	  }]);
	  return MaskedRange;
	}(MaskedPattern);
	IMask.MaskedRange = MaskedRange;

	var _excluded$2 = ["mask", "pattern"],
	  _excluded2$1 = ["mask", "pattern", "blocks"];
	/** Date mask */
	var MaskedDate = /*#__PURE__*/function (_MaskedPattern) {
	  _inheritsLoose(MaskedDate, _MaskedPattern);
	  /** Pattern mask for date according to {@link MaskedDate#format} */

	  /** Start date */

	  /** End date */

	  /** */

	  /** Format typed value to string */

	  /** Parse string to get typed value */

	  function MaskedDate(opts) {
	    var _opts = _extends({}, MaskedDate.DEFAULTS, opts),
	      mask = _opts.mask,
	      pattern = _opts.pattern,
	      patternOpts = _objectWithoutPropertiesLoose(_opts, _excluded$2);
	    return _MaskedPattern.call(this, _extends({}, patternOpts, {
	      mask: isString(mask) ? mask : pattern
	    })) || this;
	  }
	  var _proto = MaskedDate.prototype;
	  _proto.updateOptions = function updateOptions(opts) {
	    _MaskedPattern.prototype.updateOptions.call(this, opts);
	  };
	  _proto._update = function _update(opts) {
	    var _MaskedDate$DEFAULTS$ = _extends({}, MaskedDate.DEFAULTS, opts),
	      mask = _MaskedDate$DEFAULTS$.mask,
	      pattern = _MaskedDate$DEFAULTS$.pattern,
	      blocks = _MaskedDate$DEFAULTS$.blocks,
	      patternOpts = _objectWithoutPropertiesLoose(_MaskedDate$DEFAULTS$, _excluded2$1);
	    var patternBlocks = _Object$assign$1({}, MaskedDate.GET_DEFAULT_BLOCKS());
	    // adjust year block
	    if (opts.min) patternBlocks.Y.from = opts.min.getFullYear();
	    if (opts.max) patternBlocks.Y.to = opts.max.getFullYear();
	    if (opts.min && opts.max && patternBlocks.Y.from === patternBlocks.Y.to) {
	      patternBlocks.m.from = opts.min.getMonth() + 1;
	      patternBlocks.m.to = opts.max.getMonth() + 1;
	      if (patternBlocks.m.from === patternBlocks.m.to) {
	        patternBlocks.d.from = opts.min.getDate();
	        patternBlocks.d.to = opts.max.getDate();
	      }
	    }
	    _Object$assign$1(patternBlocks, this.blocks, blocks);

	    // add autofix
	    _Object$keys$1(patternBlocks).forEach(function (bk) {
	      var b = patternBlocks[bk];
	      if (!('autofix' in b) && 'autofix' in opts) b.autofix = opts.autofix;
	    });
	    _MaskedPattern.prototype._update.call(this, _extends({}, patternOpts, {
	      mask: isString(mask) ? mask : pattern,
	      blocks: patternBlocks
	    }));
	  };
	  _proto.doValidate = function doValidate(flags) {
	    var date = this.date;
	    return _MaskedPattern.prototype.doValidate.call(this, flags) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
	  }

	  /** Checks if date is exists */;
	  _proto.isDateExist = function isDateExist(str) {
	    var _context;
	    return _indexOfInstanceProperty$1(_context = this.format(this.parse(str, this), this)).call(_context, str) >= 0;
	  }

	  /** Parsed Date */;
	  _proto.maskEquals = function maskEquals(mask) {
	    return mask === Date || _MaskedPattern.prototype.maskEquals.call(this, mask);
	  };
	  _createClass(MaskedDate, [{
	    key: "date",
	    get: function get() {
	      return this.typedValue;
	    },
	    set: function set(date) {
	      this.typedValue = date;
	    }
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.isComplete ? _MaskedPattern.prototype.typedValue : null;
	    },
	    set: function set(value) {
	      this.typedValue = value;
	    }
	  }]);
	  return MaskedDate;
	}(MaskedPattern);
	MaskedDate.GET_DEFAULT_BLOCKS = function () {
	  return {
	    d: {
	      mask: MaskedRange,
	      from: 1,
	      to: 31,
	      maxLength: 2
	    },
	    m: {
	      mask: MaskedRange,
	      from: 1,
	      to: 12,
	      maxLength: 2
	    },
	    Y: {
	      mask: MaskedRange,
	      from: 1900,
	      to: 9999
	    }
	  };
	};
	MaskedDate.DEFAULTS = {
	  mask: Date,
	  pattern: 'd{.}`m{.}`Y',
	  format: function format(date, masked) {
	    var _context2, _context3;
	    if (!date) return '';
	    var day = _padStartInstanceProperty(_context2 = String(date.getDate())).call(_context2, 2, '0');
	    var month = _padStartInstanceProperty(_context3 = String(date.getMonth() + 1)).call(_context3, 2, '0');
	    var year = date.getFullYear();
	    return [day, month, year].join('.');
	  },
	  parse: function parse(str, masked) {
	    var _context4;
	    var _str$split$map = _mapInstanceProperty(_context4 = str.split('.')).call(_context4, Number),
	      day = _str$split$map[0],
	      month = _str$split$map[1],
	      year = _str$split$map[2];
	    return new Date(year, month - 1, day);
	  }
	};
	IMask.MaskedDate = MaskedDate;

	var _excluded$1 = ["expose"],
	  _excluded2 = ["mask"],
	  _excluded3 = ["compiledMasks", "currentMaskRef", "currentMask"];
	/** Dynamic mask for choosing appropriate mask in run-time */
	var MaskedDynamic = /*#__PURE__*/function (_Masked) {
	  _inheritsLoose(MaskedDynamic, _Masked);
	  /** Currently chosen mask */

	  /** Currently chosen mask */

	  /** Compliled {@link Masked} options */

	  /** Chooses {@link Masked} depending on input value */

	  function MaskedDynamic(opts) {
	    var _this;
	    _this = _Masked.call(this, _extends({}, MaskedDynamic.DEFAULTS, opts)) || this;
	    _this.currentMask = undefined;
	    return _this;
	  }
	  var _proto = MaskedDynamic.prototype;
	  _proto.updateOptions = function updateOptions(opts) {
	    _Masked.prototype.updateOptions.call(this, opts);
	  };
	  _proto._update = function _update(opts) {
	    var _this2 = this;
	    _Masked.prototype._update.call(this, opts);
	    if ('mask' in opts) {
	      var _context;
	      this.exposeMask = undefined;
	      // mask could be totally dynamic with only `dispatch` option
	      this.compiledMasks = Array.isArray(opts.mask) ? _mapInstanceProperty(_context = opts.mask).call(_context, function (m) {
	        var _ref = normalizeOpts(m),
	          expose = _ref.expose,
	          maskOpts = _objectWithoutPropertiesLoose(_ref, _excluded$1);
	        var masked = createMask(_extends({
	          overwrite: _this2._overwrite,
	          eager: _this2._eager,
	          skipInvalid: _this2._skipInvalid
	        }, maskOpts));
	        if (expose) _this2.exposeMask = masked;
	        return masked;
	      }) : [];

	      // this.currentMask = this.doDispatch(''); // probably not needed but lets see
	    }
	  };
	  _proto._appendCharRaw = function _appendCharRaw(ch, flags) {
	    if (flags === void 0) {
	      flags = {};
	    }
	    var details = this._applyDispatch(ch, flags);
	    if (this.currentMask) {
	      details.aggregate(this.currentMask._appendChar(ch, this.currentMaskFlags(flags)));
	    }
	    return details;
	  };
	  _proto._applyDispatch = function _applyDispatch(appended, flags, tail) {
	    if (appended === void 0) {
	      appended = '';
	    }
	    if (flags === void 0) {
	      flags = {};
	    }
	    if (tail === void 0) {
	      tail = '';
	    }
	    var prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
	    var inputValue = this.rawInputValue;
	    var insertValue = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._rawInputValue : inputValue;
	    var tailValue = _sliceInstanceProperty(inputValue).call(inputValue, insertValue.length);
	    var prevMask = this.currentMask;
	    var details = new ChangeDetails();
	    var prevMaskState = prevMask == null ? void 0 : prevMask.state;

	    // clone flags to prevent overwriting `_beforeTailState`
	    this.currentMask = this.doDispatch(appended, _extends({}, flags), tail);

	    // restore state after dispatch
	    if (this.currentMask) {
	      if (this.currentMask !== prevMask) {
	        // if mask changed reapply input
	        this.currentMask.reset();
	        if (insertValue) {
	          var d = this.currentMask.append(insertValue, {
	            raw: true
	          });
	          details.tailShift = d.inserted.length - prevValueBeforeTail.length;
	        }
	        if (tailValue) {
	          details.tailShift += this.currentMask.append(tailValue, {
	            raw: true,
	            tail: true
	          }).tailShift;
	        }
	      } else if (prevMaskState) {
	        // Dispatch can do something bad with state, so
	        // restore prev mask state
	        this.currentMask.state = prevMaskState;
	      }
	    }
	    return details;
	  };
	  _proto._appendPlaceholder = function _appendPlaceholder() {
	    var details = this._applyDispatch();
	    if (this.currentMask) {
	      details.aggregate(this.currentMask._appendPlaceholder());
	    }
	    return details;
	  };
	  _proto._appendEager = function _appendEager() {
	    var details = this._applyDispatch();
	    if (this.currentMask) {
	      details.aggregate(this.currentMask._appendEager());
	    }
	    return details;
	  };
	  _proto.appendTail = function appendTail(tail) {
	    var details = new ChangeDetails();
	    if (tail) details.aggregate(this._applyDispatch('', {}, tail));
	    return details.aggregate(this.currentMask ? this.currentMask.appendTail(tail) : _Masked.prototype.appendTail.call(this, tail));
	  };
	  _proto.currentMaskFlags = function currentMaskFlags(flags) {
	    var _flags$_beforeTailSta, _flags$_beforeTailSta2;
	    return _extends({}, flags, {
	      _beforeTailState: ((_flags$_beforeTailSta = flags._beforeTailState) == null ? void 0 : _flags$_beforeTailSta.currentMaskRef) === this.currentMask && ((_flags$_beforeTailSta2 = flags._beforeTailState) == null ? void 0 : _flags$_beforeTailSta2.currentMask) || flags._beforeTailState
	    });
	  };
	  _proto.doDispatch = function doDispatch(appended, flags, tail) {
	    if (flags === void 0) {
	      flags = {};
	    }
	    if (tail === void 0) {
	      tail = '';
	    }
	    return this.dispatch(appended, this, flags, tail);
	  };
	  _proto.doValidate = function doValidate(flags) {
	    return _Masked.prototype.doValidate.call(this, flags) && (!this.currentMask || this.currentMask.doValidate(this.currentMaskFlags(flags)));
	  };
	  _proto.doPrepare = function doPrepare(str, flags) {
	    if (flags === void 0) {
	      flags = {};
	    }
	    var _Masked$prototype$doP = _Masked.prototype.doPrepare.call(this, str, flags),
	      s = _Masked$prototype$doP[0],
	      details = _Masked$prototype$doP[1];
	    if (this.currentMask) {
	      var currentDetails;
	      var _Masked$prototype$doP2 = _Masked.prototype.doPrepare.call(this, s, this.currentMaskFlags(flags));
	      s = _Masked$prototype$doP2[0];
	      currentDetails = _Masked$prototype$doP2[1];
	      details = details.aggregate(currentDetails);
	    }
	    return [s, details];
	  };
	  _proto.doPrepareChar = function doPrepareChar(str, flags) {
	    if (flags === void 0) {
	      flags = {};
	    }
	    var _Masked$prototype$doP3 = _Masked.prototype.doPrepareChar.call(this, str, flags),
	      s = _Masked$prototype$doP3[0],
	      details = _Masked$prototype$doP3[1];
	    if (this.currentMask) {
	      var currentDetails;
	      var _Masked$prototype$doP4 = _Masked.prototype.doPrepareChar.call(this, s, this.currentMaskFlags(flags));
	      s = _Masked$prototype$doP4[0];
	      currentDetails = _Masked$prototype$doP4[1];
	      details = details.aggregate(currentDetails);
	    }
	    return [s, details];
	  };
	  _proto.reset = function reset() {
	    var _this$currentMask;
	    (_this$currentMask = this.currentMask) == null ? void 0 : _this$currentMask.reset();
	    this.compiledMasks.forEach(function (m) {
	      return m.reset();
	    });
	  };
	  _proto.remove = function remove(fromPos, toPos) {
	    var details = new ChangeDetails();
	    if (this.currentMask) {
	      details.aggregate(this.currentMask.remove(fromPos, toPos))
	      // update with dispatch
	      .aggregate(this._applyDispatch());
	    }
	    return details;
	  };
	  _proto.extractInput = function extractInput(fromPos, toPos, flags) {
	    return this.currentMask ? this.currentMask.extractInput(fromPos, toPos, flags) : '';
	  };
	  _proto.extractTail = function extractTail(fromPos, toPos) {
	    return this.currentMask ? this.currentMask.extractTail(fromPos, toPos) : _Masked.prototype.extractTail.call(this, fromPos, toPos);
	  };
	  _proto.doCommit = function doCommit() {
	    if (this.currentMask) this.currentMask.doCommit();
	    _Masked.prototype.doCommit.call(this);
	  };
	  _proto.nearestInputPos = function nearestInputPos(cursorPos, direction) {
	    return this.currentMask ? this.currentMask.nearestInputPos(cursorPos, direction) : _Masked.prototype.nearestInputPos.call(this, cursorPos, direction);
	  };
	  _proto.maskEquals = function maskEquals(mask) {
	    return Array.isArray(mask) ? this.compiledMasks.every(function (m, mi) {
	      if (!mask[mi]) return;
	      var _mask$mi = mask[mi],
	        oldMask = _mask$mi.mask,
	        restOpts = _objectWithoutPropertiesLoose(_mask$mi, _excluded2);
	      return objectIncludes(m, restOpts) && m.maskEquals(oldMask);
	    }) : _Masked.prototype.maskEquals.call(this, mask);
	  };
	  _proto.typedValueEquals = function typedValueEquals(value) {
	    var _this$currentMask2;
	    return Boolean((_this$currentMask2 = this.currentMask) == null ? void 0 : _this$currentMask2.typedValueEquals(value));
	  };
	  _createClass(MaskedDynamic, [{
	    key: "value",
	    get: function get() {
	      return this.exposeMask ? this.exposeMask.value : this.currentMask ? this.currentMask.value : '';
	    },
	    set: function set(value) {
	      if (this.exposeMask) {
	        this.exposeMask.value = value;
	        this.currentMask = this.exposeMask;
	        this._applyDispatch();
	      } else this.value = value;
	    }
	  }, {
	    key: "unmaskedValue",
	    get: function get() {
	      return this.exposeMask ? this.exposeMask.unmaskedValue : this.currentMask ? this.currentMask.unmaskedValue : '';
	    },
	    set: function set(unmaskedValue) {
	      if (this.exposeMask) {
	        this.exposeMask.unmaskedValue = unmaskedValue;
	        this.currentMask = this.exposeMask;
	        this._applyDispatch();
	      } else this.unmaskedValue = unmaskedValue;
	    }
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.exposeMask ? this.exposeMask.typedValue : this.currentMask ? this.currentMask.typedValue : '';
	    },
	    set: function set(typedValue) {
	      if (this.exposeMask) {
	        this.exposeMask.typedValue = typedValue;
	        this.currentMask = this.exposeMask;
	        this._applyDispatch();
	        return;
	      }
	      var unmaskedValue = String(typedValue);

	      // double check it
	      if (this.currentMask) {
	        this.currentMask.typedValue = typedValue;
	        unmaskedValue = this.currentMask.unmaskedValue;
	      }
	      this.unmaskedValue = unmaskedValue;
	    }
	  }, {
	    key: "displayValue",
	    get: function get() {
	      return this.currentMask ? this.currentMask.displayValue : '';
	    }
	  }, {
	    key: "isComplete",
	    get: function get() {
	      var _this$currentMask3;
	      return Boolean((_this$currentMask3 = this.currentMask) == null ? void 0 : _this$currentMask3.isComplete);
	    }
	  }, {
	    key: "isFilled",
	    get: function get() {
	      var _this$currentMask4;
	      return Boolean((_this$currentMask4 = this.currentMask) == null ? void 0 : _this$currentMask4.isFilled);
	    }
	  }, {
	    key: "state",
	    get: function get() {
	      var _context2, _this$currentMask5;
	      return _extends({}, _Masked.prototype.state, {
	        _rawInputValue: this.rawInputValue,
	        compiledMasks: _mapInstanceProperty(_context2 = this.compiledMasks).call(_context2, function (m) {
	          return m.state;
	        }),
	        currentMaskRef: this.currentMask,
	        currentMask: (_this$currentMask5 = this.currentMask) == null ? void 0 : _this$currentMask5.state
	      });
	    },
	    set: function set(state) {
	      var _ref2 = state,
	        compiledMasks = _ref2.compiledMasks,
	        currentMaskRef = _ref2.currentMaskRef,
	        currentMask = _ref2.currentMask,
	        maskedState = _objectWithoutPropertiesLoose(_ref2, _excluded3);
	      if (compiledMasks) this.compiledMasks.forEach(function (m, mi) {
	        return m.state = compiledMasks[mi];
	      });
	      if (currentMaskRef != null) {
	        this.currentMask = currentMaskRef;
	        this.currentMask.state = currentMask;
	      }
	      this.state = maskedState;
	    }
	  }, {
	    key: "overwrite",
	    get: function get() {
	      return this.currentMask ? this.currentMask.overwrite : this._overwrite;
	    },
	    set: function set(overwrite) {
	      this._overwrite = overwrite;
	    }
	  }, {
	    key: "eager",
	    get: function get() {
	      return this.currentMask ? this.currentMask.eager : this._eager;
	    },
	    set: function set(eager) {
	      this._eager = eager;
	    }
	  }, {
	    key: "skipInvalid",
	    get: function get() {
	      return this.currentMask ? this.currentMask.skipInvalid : this._skipInvalid;
	    },
	    set: function set(skipInvalid) {
	      this._skipInvalid = skipInvalid;
	    }
	  }]);
	  return MaskedDynamic;
	}(Masked);
	MaskedDynamic.DEFAULTS = void 0;
	MaskedDynamic.DEFAULTS = {
	  dispatch: function dispatch(appended, masked, flags, tail) {
	    var _context3;
	    if (!masked.compiledMasks.length) return;
	    var inputValue = masked.rawInputValue;

	    // simulate input
	    var inputs = _mapInstanceProperty(_context3 = masked.compiledMasks).call(_context3, function (m, index) {
	      var isCurrent = masked.currentMask === m;
	      var startInputPos = isCurrent ? m.displayValue.length : m.nearestInputPos(m.displayValue.length, DIRECTION.FORCE_LEFT);
	      if (m.rawInputValue !== inputValue) {
	        m.reset();
	        m.append(inputValue, {
	          raw: true
	        });
	      } else if (!isCurrent) {
	        m.remove(startInputPos);
	      }
	      m.append(appended, masked.currentMaskFlags(flags));
	      m.appendTail(tail);
	      return {
	        index: index,
	        weight: m.rawInputValue.length,
	        totalInputPositions: m.totalInputPositions(0, Math.max(startInputPos, m.nearestInputPos(m.displayValue.length, DIRECTION.FORCE_LEFT)))
	      };
	    });

	    // pop masks with longer values first
	    _sortInstanceProperty(inputs).call(inputs, function (i1, i2) {
	      return i2.weight - i1.weight || i2.totalInputPositions - i1.totalInputPositions;
	    });
	    return masked.compiledMasks[inputs[0].index];
	  }
	};
	IMask.MaskedDynamic = MaskedDynamic;

	var _excluded = ["enum"];
	/** Pattern which validates enum values */
	var MaskedEnum = /*#__PURE__*/function (_MaskedPattern) {
	  _inheritsLoose(MaskedEnum, _MaskedPattern);
	  function MaskedEnum() {
	    return _MaskedPattern.apply(this, arguments) || this;
	  }
	  var _proto = MaskedEnum.prototype;
	  _proto.updateOptions = function updateOptions(opts) {
	    _MaskedPattern.prototype.updateOptions.call(this, opts);
	  };
	  _proto._update = function _update(opts) {
	    var _enum = opts.enum,
	      eopts = _objectWithoutPropertiesLoose(opts, _excluded);
	    if (_enum) {
	      var _context;
	      eopts.mask = _repeatInstanceProperty(_context = '*').call(_context, _enum[0].length);
	      this.enum = _enum;
	    }
	    _MaskedPattern.prototype._update.call(this, eopts);
	  };
	  _proto.doValidate = function doValidate(flags) {
	    var _this = this;
	    return this.enum.some(function (e) {
	      return _indexOfInstanceProperty$1(e).call(e, _this.unmaskedValue) >= 0;
	    }) && _MaskedPattern.prototype.doValidate.call(this, flags);
	  };
	  return MaskedEnum;
	}(MaskedPattern);
	IMask.MaskedEnum = MaskedEnum;

	/** Masking by custom Function */
	var MaskedFunction = /*#__PURE__*/function (_Masked) {
	  _inheritsLoose(MaskedFunction, _Masked);
	  function MaskedFunction() {
	    return _Masked.apply(this, arguments) || this;
	  }
	  var _proto = MaskedFunction.prototype;
	  /** */
	  /** Enable characters overwriting */
	  /** */
	  /** */
	  _proto.updateOptions = function updateOptions(opts) {
	    _Masked.prototype.updateOptions.call(this, opts);
	  };
	  _proto._update = function _update(opts) {
	    _Masked.prototype._update.call(this, _extends({}, opts, {
	      validate: opts.mask
	    }));
	  };
	  return MaskedFunction;
	}(Masked);
	IMask.MaskedFunction = MaskedFunction;

	var entryVirtual = entryVirtual$f;

	var concat$2 = entryVirtual('Array').concat;

	var isPrototypeOf = objectIsPrototypeOf;
	var method = concat$2;

	var ArrayPrototype = Array.prototype;

	var concat$1 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.concat) ? method : own;
	};

	var parent$2 = concat$1;

	var concat = parent$2;

	var _concatInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(concat);

	var $$1 = _export;

	// `Number.MIN_SAFE_INTEGER` constant
	// https://tc39.es/ecma262/#sec-number.min_safe_integer
	$$1({ target: 'Number', stat: true, nonConfigurable: true, nonWritable: true }, {
	  MIN_SAFE_INTEGER: -0x1FFFFFFFFFFFFF
	});

	var minSafeInteger$1 = -0x1FFFFFFFFFFFFF;

	var parent$1 = minSafeInteger$1;

	var minSafeInteger = parent$1;

	var _Number$MIN_SAFE_INTEGER = /*@__PURE__*/getDefaultExportFromCjs(minSafeInteger);

	var $ = _export;

	// `Number.MAX_SAFE_INTEGER` constant
	// https://tc39.es/ecma262/#sec-number.max_safe_integer
	$({ target: 'Number', stat: true, nonConfigurable: true, nonWritable: true }, {
	  MAX_SAFE_INTEGER: 0x1FFFFFFFFFFFFF
	});

	var maxSafeInteger$1 = 0x1FFFFFFFFFFFFF;

	var parent = maxSafeInteger$1;

	var maxSafeInteger = parent;

	var _Number$MAX_SAFE_INTEGER = /*@__PURE__*/getDefaultExportFromCjs(maxSafeInteger);

	var _context10;
	/**
	  Number mask
	*/
	var MaskedNumber = /*#__PURE__*/function (_Masked) {
	  _inheritsLoose(MaskedNumber, _Masked);
	  /** Single char */

	  /** Single char */

	  /** Array of single chars */

	  /** */

	  /** */

	  /** Digits after point */

	  /** Flag to remove leading and trailing zeros in the end of editing */

	  /** Flag to pad trailing zeros after point in the end of editing */

	  /** Enable characters overwriting */

	  /** */

	  /** */

	  /** Format typed value to string */

	  /** Parse string to get typed value */

	  function MaskedNumber(opts) {
	    return _Masked.call(this, _extends({}, MaskedNumber.DEFAULTS, opts)) || this;
	  }
	  var _proto = MaskedNumber.prototype;
	  _proto.updateOptions = function updateOptions(opts) {
	    _Masked.prototype.updateOptions.call(this, opts);
	  };
	  _proto._update = function _update(opts) {
	    _Masked.prototype._update.call(this, opts);
	    this._updateRegExps();
	  };
	  _proto._updateRegExps = function _updateRegExps() {
	    var _context;
	    var start = '^' + (this.allowNegative ? '[+|\\-]?' : '');
	    var mid = '\\d*';
	    var end = (this.scale ? "(" + escapeRegExp(this.radix) + "\\d{0," + this.scale + "})?" : '') + '$';
	    this._numberRegExp = new RegExp(start + mid + end);
	    this._mapToRadixRegExp = new RegExp("[" + _mapInstanceProperty(_context = this.mapToRadix).call(_context, escapeRegExp).join('') + "]", 'g');
	    this._thousandsSeparatorRegExp = new RegExp(escapeRegExp(this.thousandsSeparator), 'g');
	  };
	  _proto._removeThousandsSeparators = function _removeThousandsSeparators(value) {
	    return value.replace(this._thousandsSeparatorRegExp, '');
	  };
	  _proto._insertThousandsSeparators = function _insertThousandsSeparators(value) {
	    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
	    var parts = value.split(this.radix);
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
	    return parts.join(this.radix);
	  };
	  _proto.doPrepareChar = function doPrepareChar(ch, flags) {
	    if (flags === void 0) {
	      flags = {};
	    }
	    ch = this._removeThousandsSeparators(this.scale && this.mapToRadix.length && (
	    /*
	      radix should be mapped when
	      1) input is done from keyboard = flags.input && flags.raw
	      2) unmasked value is set = !flags.input && !flags.raw
	      and should not be mapped when
	      1) value is set = flags.input && !flags.raw
	      2) raw value is set = !flags.input && flags.raw
	    */
	    flags.input && flags.raw || !flags.input && !flags.raw) ? ch.replace(this._mapToRadixRegExp, this.radix) : ch);
	    var _Masked$prototype$doP = _Masked.prototype.doPrepareChar.call(this, ch, flags),
	      prepCh = _Masked$prototype$doP[0],
	      details = _Masked$prototype$doP[1];
	    if (ch && !prepCh) details.skip = true;
	    if (prepCh && !this.allowPositive && !this.value && prepCh !== '-') details.aggregate(this._appendChar('-'));
	    return [prepCh, details];
	  };
	  _proto._separatorsCount = function _separatorsCount(to, extendOnSeparators) {
	    if (extendOnSeparators === void 0) {
	      extendOnSeparators = false;
	    }
	    var count = 0;
	    for (var pos = 0; pos < to; ++pos) {
	      var _context2;
	      if (_indexOfInstanceProperty$1(_context2 = this._value).call(_context2, this.thousandsSeparator, pos) === pos) {
	        ++count;
	        if (extendOnSeparators) to += this.thousandsSeparator.length;
	      }
	    }
	    return count;
	  };
	  _proto._separatorsCountFromSlice = function _separatorsCountFromSlice(slice) {
	    if (slice === void 0) {
	      slice = this._value;
	    }
	    return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
	  };
	  _proto.extractInput = function extractInput(fromPos, toPos, flags) {
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this.displayValue.length;
	    }
	    var _this$_adjustRangeWit = this._adjustRangeWithSeparators(fromPos, toPos);
	    fromPos = _this$_adjustRangeWit[0];
	    toPos = _this$_adjustRangeWit[1];
	    return this._removeThousandsSeparators(_Masked.prototype.extractInput.call(this, fromPos, toPos, flags));
	  };
	  _proto._appendCharRaw = function _appendCharRaw(ch, flags) {
	    if (flags === void 0) {
	      flags = {};
	    }
	    if (!this.thousandsSeparator) return _Masked.prototype._appendCharRaw.call(this, ch, flags);
	    var prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
	    var prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);
	    this._value = this._removeThousandsSeparators(this.value);
	    var appendDetails = _Masked.prototype._appendCharRaw.call(this, ch, flags);
	    this._value = this._insertThousandsSeparators(this._value);
	    var beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
	    var beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);
	    appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
	    appendDetails.skip = !appendDetails.rawInserted && ch === this.thousandsSeparator;
	    return appendDetails;
	  };
	  _proto._findSeparatorAround = function _findSeparatorAround(pos) {
	    if (this.thousandsSeparator) {
	      var _context3;
	      var searchFrom = pos - this.thousandsSeparator.length + 1;
	      var separatorPos = _indexOfInstanceProperty$1(_context3 = this.value).call(_context3, this.thousandsSeparator, searchFrom);
	      if (separatorPos <= pos) return separatorPos;
	    }
	    return -1;
	  };
	  _proto._adjustRangeWithSeparators = function _adjustRangeWithSeparators(from, to) {
	    var separatorAroundFromPos = this._findSeparatorAround(from);
	    if (separatorAroundFromPos >= 0) from = separatorAroundFromPos;
	    var separatorAroundToPos = this._findSeparatorAround(to);
	    if (separatorAroundToPos >= 0) to = separatorAroundToPos + this.thousandsSeparator.length;
	    return [from, to];
	  };
	  _proto.remove = function remove(fromPos, toPos) {
	    var _context4, _context5;
	    if (fromPos === void 0) {
	      fromPos = 0;
	    }
	    if (toPos === void 0) {
	      toPos = this.displayValue.length;
	    }
	    var _this$_adjustRangeWit2 = this._adjustRangeWithSeparators(fromPos, toPos);
	    fromPos = _this$_adjustRangeWit2[0];
	    toPos = _this$_adjustRangeWit2[1];
	    var valueBeforePos = _sliceInstanceProperty(_context4 = this.value).call(_context4, 0, fromPos);
	    var valueAfterPos = _sliceInstanceProperty(_context5 = this.value).call(_context5, toPos);
	    var prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);
	    this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));
	    var beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);
	    return new ChangeDetails({
	      tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
	    });
	  };
	  _proto.nearestInputPos = function nearestInputPos(cursorPos, direction) {
	    if (!this.thousandsSeparator) return cursorPos;
	    switch (direction) {
	      case DIRECTION.NONE:
	      case DIRECTION.LEFT:
	      case DIRECTION.FORCE_LEFT:
	        {
	          var separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);
	          if (separatorAtLeftPos >= 0) {
	            var separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;
	            if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === DIRECTION.FORCE_LEFT) {
	              return separatorAtLeftPos;
	            }
	          }
	          break;
	        }
	      case DIRECTION.RIGHT:
	      case DIRECTION.FORCE_RIGHT:
	        {
	          var separatorAtRightPos = this._findSeparatorAround(cursorPos);
	          if (separatorAtRightPos >= 0) {
	            return separatorAtRightPos + this.thousandsSeparator.length;
	          }
	        }
	    }
	    return cursorPos;
	  };
	  _proto.doValidate = function doValidate(flags) {
	    // validate as string
	    var valid = Boolean(this._removeThousandsSeparators(this.value).match(this._numberRegExp));
	    if (valid) {
	      // validate as number
	      var number = this.number;
	      valid = valid && !isNaN(number) && (
	      // check min bound for negative values
	      this.min == null || this.min >= 0 || this.min <= this.number) && (
	      // check max bound for positive values
	      this.max == null || this.max <= 0 || this.number <= this.max);
	    }
	    return valid && _Masked.prototype.doValidate.call(this, flags);
	  };
	  _proto.doCommit = function doCommit() {
	    if (this.value) {
	      var number = this.number;
	      var validnum = number;

	      // check bounds
	      if (this.min != null) validnum = Math.max(validnum, this.min);
	      if (this.max != null) validnum = Math.min(validnum, this.max);
	      if (validnum !== number) this.unmaskedValue = this.format(validnum, this);
	      var formatted = this.value;
	      if (this.normalizeZeros) formatted = this._normalizeZeros(formatted);
	      if (this.padFractionalZeros && this.scale > 0) formatted = this._padFractionalZeros(formatted);
	      this._value = formatted;
	    }
	    _Masked.prototype.doCommit.call(this);
	  };
	  _proto._normalizeZeros = function _normalizeZeros(value) {
	    var parts = this._removeThousandsSeparators(value).split(this.radix);

	    // remove leading zeros
	    parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, function (match, sign, zeros, num) {
	      return sign + num;
	    });
	    // add leading zero
	    if (value.length && !/\d$/.test(parts[0])) parts[0] = parts[0] + '0';
	    if (parts.length > 1) {
	      parts[1] = parts[1].replace(/0*$/, ''); // remove trailing zeros
	      if (!parts[1].length) parts.length = 1; // remove fractional
	    }

	    return this._insertThousandsSeparators(parts.join(this.radix));
	  };
	  _proto._padFractionalZeros = function _padFractionalZeros(value) {
	    var _context6;
	    if (!value) return value;
	    var parts = value.split(this.radix);
	    if (parts.length < 2) parts.push('');
	    parts[1] = _padEndInstanceProperty(_context6 = parts[1]).call(_context6, this.scale, '0');
	    return parts.join(this.radix);
	  };
	  _proto.doSkipInvalid = function doSkipInvalid(ch, flags, checkTail) {
	    var _context7;
	    if (flags === void 0) {
	      flags = {};
	    }
	    var dropFractional = this.scale === 0 && ch !== this.thousandsSeparator && (ch === this.radix || ch === MaskedNumber.UNMASKED_RADIX || _includesInstanceProperty(_context7 = this.mapToRadix).call(_context7, ch));
	    return _Masked.prototype.doSkipInvalid.call(this, ch, flags, checkTail) && !dropFractional;
	  };
	  _proto.typedValueEquals = function typedValueEquals(value) {
	    var _context8, _context9;
	    // handle  0 -> '' case (typed = 0 even if value = '')
	    // for details see https://github.com/uNmAnNeR/imaskjs/issues/134
	    return (_Masked.prototype.typedValueEquals.call(this, value) || _includesInstanceProperty(_context8 = MaskedNumber.EMPTY_VALUES).call(_context8, value) && _includesInstanceProperty(_context9 = MaskedNumber.EMPTY_VALUES).call(_context9, this.typedValue)) && !(value === 0 && this.value === '');
	  };
	  _createClass(MaskedNumber, [{
	    key: "unmaskedValue",
	    get: function get() {
	      return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, MaskedNumber.UNMASKED_RADIX);
	    },
	    set: function set(unmaskedValue) {
	      this.unmaskedValue = unmaskedValue;
	    }
	  }, {
	    key: "typedValue",
	    get: function get() {
	      return this.parse(this.unmaskedValue, this);
	    },
	    set: function set(n) {
	      this.rawInputValue = this.format(n, this).replace(MaskedNumber.UNMASKED_RADIX, this.radix);
	    }

	    /** Parsed Number */
	  }, {
	    key: "number",
	    get: function get() {
	      return this.typedValue;
	    },
	    set: function set(number) {
	      this.typedValue = number;
	    }

	    /**
	      Is negative allowed
	    */
	  }, {
	    key: "allowNegative",
	    get: function get() {
	      return this.min != null && this.min < 0 || this.max != null && this.max < 0;
	    }

	    /**
	      Is positive allowed
	    */
	  }, {
	    key: "allowPositive",
	    get: function get() {
	      return this.min != null && this.min > 0 || this.max != null && this.max > 0;
	    }
	  }]);
	  return MaskedNumber;
	}(Masked);
	MaskedNumber.UNMASKED_RADIX = '.';
	MaskedNumber.EMPTY_VALUES = _concatInstanceProperty(_context10 = []).call(_context10, Masked.EMPTY_VALUES, [0]);
	MaskedNumber.DEFAULTS = {
	  mask: Number,
	  radix: ',',
	  thousandsSeparator: '',
	  mapToRadix: [MaskedNumber.UNMASKED_RADIX],
	  min: _Number$MIN_SAFE_INTEGER,
	  max: _Number$MAX_SAFE_INTEGER,
	  scale: 2,
	  normalizeZeros: true,
	  padFractionalZeros: false,
	  parse: Number,
	  format: function format(n) {
	    return n.toLocaleString('en-US', {
	      useGrouping: false,
	      maximumFractionDigits: 20
	    });
	  }
	};
	IMask.MaskedNumber = MaskedNumber;

	/** Mask pipe source and destination types */
	var PIPE_TYPE = {
	  MASKED: 'value',
	  UNMASKED: 'unmaskedValue',
	  TYPED: 'typedValue'
	};
	/** Creates new pipe function depending on mask type, source and destination options */
	function createPipe(arg, from, to) {
	  if (from === void 0) {
	    from = PIPE_TYPE.MASKED;
	  }
	  if (to === void 0) {
	    to = PIPE_TYPE.MASKED;
	  }
	  var masked = createMask(arg);
	  return function (value) {
	    return masked.runIsolated(function (m) {
	      m[from] = value;
	      return m[to];
	    });
	  };
	}

	/** Pipes value through mask depending on mask type, source and destination options */
	function pipe(value, mask, from, to) {
	  return createPipe(mask, from, to)(value);
	}
	IMask.PIPE_TYPE = PIPE_TYPE;
	IMask.createPipe = createPipe;
	IMask.pipe = pipe;

	try {
	  _globalThis.IMask = IMask;
	} catch (_unused) {}

	exports.ChangeDetails = ChangeDetails;
	exports.ChunksTailDetails = ChunksTailDetails;
	exports.DIRECTION = DIRECTION;
	exports.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;
	exports.HTMLInputMaskElement = HTMLInputMaskElement;
	exports.HTMLMaskElement = HTMLMaskElement;
	exports.InputMask = InputMask;
	exports.MaskElement = MaskElement;
	exports.Masked = Masked;
	exports.MaskedDate = MaskedDate;
	exports.MaskedDynamic = MaskedDynamic;
	exports.MaskedEnum = MaskedEnum;
	exports.MaskedFunction = MaskedFunction;
	exports.MaskedNumber = MaskedNumber;
	exports.MaskedPattern = MaskedPattern;
	exports.MaskedRange = MaskedRange;
	exports.MaskedRegExp = MaskedRegExp;
	exports.PIPE_TYPE = PIPE_TYPE;
	exports.PatternFixedDefinition = PatternFixedDefinition;
	exports.PatternInputDefinition = PatternInputDefinition;
	exports.createMask = createMask;
	exports.createPipe = createPipe;
	exports.default = IMask;
	exports.forceDirection = forceDirection;
	exports.normalizeOpts = normalizeOpts;
	exports.pipe = pipe;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=imask.js.map
