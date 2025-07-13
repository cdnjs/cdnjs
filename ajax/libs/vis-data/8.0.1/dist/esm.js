/**
 * vis-data
 * http://visjs.org/
 *
 * Manage unstructured data using DataSet. Add, update, and remove data, and listen for changes in the data.
 *
 * @version 8.0.1
 * @date    2025-07-13T02:53:07.551Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var defineProperty$5 = {exports: {}};

var es_object_defineProperty = {};

var globalThis_1;
var hasRequiredGlobalThis;

function requireGlobalThis () {
	if (hasRequiredGlobalThis) return globalThis_1;
	hasRequiredGlobalThis = 1;
	var check = function (it) {
	  return it && it.Math === Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	globalThis_1 =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  check(typeof globalThis_1 == 'object' && globalThis_1) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  (function () { return this; })() || Function('return this')();
	return globalThis_1;
}

var fails;
var hasRequiredFails;

function requireFails () {
	if (hasRequiredFails) return fails;
	hasRequiredFails = 1;
	fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};
	return fails;
}

var functionBindNative;
var hasRequiredFunctionBindNative;

function requireFunctionBindNative () {
	if (hasRequiredFunctionBindNative) return functionBindNative;
	hasRequiredFunctionBindNative = 1;
	var fails = /*@__PURE__*/ requireFails();

	functionBindNative = !fails(function () {
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  var test = (function () { /* empty */ }).bind();
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return typeof test != 'function' || test.hasOwnProperty('prototype');
	});
	return functionBindNative;
}

var functionApply;
var hasRequiredFunctionApply;

function requireFunctionApply () {
	if (hasRequiredFunctionApply) return functionApply;
	hasRequiredFunctionApply = 1;
	var NATIVE_BIND = /*@__PURE__*/ requireFunctionBindNative();

	var FunctionPrototype = Function.prototype;
	var apply = FunctionPrototype.apply;
	var call = FunctionPrototype.call;

	// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
	functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
	  return call.apply(apply, arguments);
	});
	return functionApply;
}

var functionUncurryThis;
var hasRequiredFunctionUncurryThis;

function requireFunctionUncurryThis () {
	if (hasRequiredFunctionUncurryThis) return functionUncurryThis;
	hasRequiredFunctionUncurryThis = 1;
	var NATIVE_BIND = /*@__PURE__*/ requireFunctionBindNative();

	var FunctionPrototype = Function.prototype;
	var call = FunctionPrototype.call;
	// eslint-disable-next-line es/no-function-prototype-bind -- safe
	var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

	functionUncurryThis = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
	  return function () {
	    return call.apply(fn, arguments);
	  };
	};
	return functionUncurryThis;
}

var classofRaw;
var hasRequiredClassofRaw;

function requireClassofRaw () {
	if (hasRequiredClassofRaw) return classofRaw;
	hasRequiredClassofRaw = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();

	var toString = uncurryThis({}.toString);
	var stringSlice = uncurryThis(''.slice);

	classofRaw = function (it) {
	  return stringSlice(toString(it), 8, -1);
	};
	return classofRaw;
}

var functionUncurryThisClause;
var hasRequiredFunctionUncurryThisClause;

function requireFunctionUncurryThisClause () {
	if (hasRequiredFunctionUncurryThisClause) return functionUncurryThisClause;
	hasRequiredFunctionUncurryThisClause = 1;
	var classofRaw = /*@__PURE__*/ requireClassofRaw();
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();

	functionUncurryThisClause = function (fn) {
	  // Nashorn bug:
	  //   https://github.com/zloirock/core-js/issues/1128
	  //   https://github.com/zloirock/core-js/issues/1130
	  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
	};
	return functionUncurryThisClause;
}

var isCallable;
var hasRequiredIsCallable;

function requireIsCallable () {
	if (hasRequiredIsCallable) return isCallable;
	hasRequiredIsCallable = 1;
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
	var documentAll = typeof document == 'object' && document.all;

	// `IsCallable` abstract operation
	// https://tc39.es/ecma262/#sec-iscallable
	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
	isCallable = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
	  return typeof argument == 'function' || argument === documentAll;
	} : function (argument) {
	  return typeof argument == 'function';
	};
	return isCallable;
}

var objectGetOwnPropertyDescriptor = {};

var descriptors;
var hasRequiredDescriptors;

function requireDescriptors () {
	if (hasRequiredDescriptors) return descriptors;
	hasRequiredDescriptors = 1;
	var fails = /*@__PURE__*/ requireFails();

	// Detect IE8's incomplete defineProperty implementation
	descriptors = !fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
	});
	return descriptors;
}

var functionCall;
var hasRequiredFunctionCall;

function requireFunctionCall () {
	if (hasRequiredFunctionCall) return functionCall;
	hasRequiredFunctionCall = 1;
	var NATIVE_BIND = /*@__PURE__*/ requireFunctionBindNative();

	var call = Function.prototype.call;
	// eslint-disable-next-line es/no-function-prototype-bind -- safe
	functionCall = NATIVE_BIND ? call.bind(call) : function () {
	  return call.apply(call, arguments);
	};
	return functionCall;
}

var objectPropertyIsEnumerable = {};

var hasRequiredObjectPropertyIsEnumerable;

function requireObjectPropertyIsEnumerable () {
	if (hasRequiredObjectPropertyIsEnumerable) return objectPropertyIsEnumerable;
	hasRequiredObjectPropertyIsEnumerable = 1;
	var $propertyIsEnumerable = {}.propertyIsEnumerable;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : $propertyIsEnumerable;
	return objectPropertyIsEnumerable;
}

var createPropertyDescriptor;
var hasRequiredCreatePropertyDescriptor;

function requireCreatePropertyDescriptor () {
	if (hasRequiredCreatePropertyDescriptor) return createPropertyDescriptor;
	hasRequiredCreatePropertyDescriptor = 1;
	createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};
	return createPropertyDescriptor;
}

var indexedObject;
var hasRequiredIndexedObject;

function requireIndexedObject () {
	if (hasRequiredIndexedObject) return indexedObject;
	hasRequiredIndexedObject = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var fails = /*@__PURE__*/ requireFails();
	var classof = /*@__PURE__*/ requireClassofRaw();

	var $Object = Object;
	var split = uncurryThis(''.split);

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins -- safe
	  return !$Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classof(it) === 'String' ? split(it, '') : $Object(it);
	} : $Object;
	return indexedObject;
}

var isNullOrUndefined;
var hasRequiredIsNullOrUndefined;

function requireIsNullOrUndefined () {
	if (hasRequiredIsNullOrUndefined) return isNullOrUndefined;
	hasRequiredIsNullOrUndefined = 1;
	// we can't use just `it == null` since of `document.all` special case
	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
	isNullOrUndefined = function (it) {
	  return it === null || it === undefined;
	};
	return isNullOrUndefined;
}

var requireObjectCoercible;
var hasRequiredRequireObjectCoercible;

function requireRequireObjectCoercible () {
	if (hasRequiredRequireObjectCoercible) return requireObjectCoercible;
	hasRequiredRequireObjectCoercible = 1;
	var isNullOrUndefined = /*@__PURE__*/ requireIsNullOrUndefined();

	var $TypeError = TypeError;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.es/ecma262/#sec-requireobjectcoercible
	requireObjectCoercible = function (it) {
	  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
	  return it;
	};
	return requireObjectCoercible;
}

var toIndexedObject;
var hasRequiredToIndexedObject;

function requireToIndexedObject () {
	if (hasRequiredToIndexedObject) return toIndexedObject;
	hasRequiredToIndexedObject = 1;
	// toObject with fallback for non-array-like ES3 strings
	var IndexedObject = /*@__PURE__*/ requireIndexedObject();
	var requireObjectCoercible = /*@__PURE__*/ requireRequireObjectCoercible();

	toIndexedObject = function (it) {
	  return IndexedObject(requireObjectCoercible(it));
	};
	return toIndexedObject;
}

var isObject;
var hasRequiredIsObject;

function requireIsObject () {
	if (hasRequiredIsObject) return isObject;
	hasRequiredIsObject = 1;
	var isCallable = /*@__PURE__*/ requireIsCallable();

	isObject = function (it) {
	  return typeof it == 'object' ? it !== null : isCallable(it);
	};
	return isObject;
}

var path;
var hasRequiredPath;

function requirePath () {
	if (hasRequiredPath) return path;
	hasRequiredPath = 1;
	path = {};
	return path;
}

var getBuiltIn;
var hasRequiredGetBuiltIn;

function requireGetBuiltIn () {
	if (hasRequiredGetBuiltIn) return getBuiltIn;
	hasRequiredGetBuiltIn = 1;
	var path = /*@__PURE__*/ requirePath();
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var isCallable = /*@__PURE__*/ requireIsCallable();

	var aFunction = function (variable) {
	  return isCallable(variable) ? variable : undefined;
	};

	getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(globalThis[namespace])
	    : path[namespace] && path[namespace][method] || globalThis[namespace] && globalThis[namespace][method];
	};
	return getBuiltIn;
}

var objectIsPrototypeOf;
var hasRequiredObjectIsPrototypeOf;

function requireObjectIsPrototypeOf () {
	if (hasRequiredObjectIsPrototypeOf) return objectIsPrototypeOf;
	hasRequiredObjectIsPrototypeOf = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();

	objectIsPrototypeOf = uncurryThis({}.isPrototypeOf);
	return objectIsPrototypeOf;
}

var environmentUserAgent;
var hasRequiredEnvironmentUserAgent;

function requireEnvironmentUserAgent () {
	if (hasRequiredEnvironmentUserAgent) return environmentUserAgent;
	hasRequiredEnvironmentUserAgent = 1;
	var globalThis = /*@__PURE__*/ requireGlobalThis();

	var navigator = globalThis.navigator;
	var userAgent = navigator && navigator.userAgent;

	environmentUserAgent = userAgent ? String(userAgent) : '';
	return environmentUserAgent;
}

var environmentV8Version;
var hasRequiredEnvironmentV8Version;

function requireEnvironmentV8Version () {
	if (hasRequiredEnvironmentV8Version) return environmentV8Version;
	hasRequiredEnvironmentV8Version = 1;
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var userAgent = /*@__PURE__*/ requireEnvironmentUserAgent();

	var process = globalThis.process;
	var Deno = globalThis.Deno;
	var versions = process && process.versions || Deno && Deno.version;
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
	if (!version && userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = +match[1];
	  }
	}

	environmentV8Version = version;
	return environmentV8Version;
}

var symbolConstructorDetection;
var hasRequiredSymbolConstructorDetection;

function requireSymbolConstructorDetection () {
	if (hasRequiredSymbolConstructorDetection) return symbolConstructorDetection;
	hasRequiredSymbolConstructorDetection = 1;
	/* eslint-disable es/no-symbol -- required for testing */
	var V8_VERSION = /*@__PURE__*/ requireEnvironmentV8Version();
	var fails = /*@__PURE__*/ requireFails();
	var globalThis = /*@__PURE__*/ requireGlobalThis();

	var $String = globalThis.String;

	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
	symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails(function () {
	  var symbol = Symbol('symbol detection');
	  // Chrome 38 Symbol has incorrect toString conversion
	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
	  // of course, fail.
	  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
	    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
	});
	return symbolConstructorDetection;
}

var useSymbolAsUid;
var hasRequiredUseSymbolAsUid;

function requireUseSymbolAsUid () {
	if (hasRequiredUseSymbolAsUid) return useSymbolAsUid;
	hasRequiredUseSymbolAsUid = 1;
	/* eslint-disable es/no-symbol -- required for testing */
	var NATIVE_SYMBOL = /*@__PURE__*/ requireSymbolConstructorDetection();

	useSymbolAsUid = NATIVE_SYMBOL &&
	  !Symbol.sham &&
	  typeof Symbol.iterator == 'symbol';
	return useSymbolAsUid;
}

var isSymbol;
var hasRequiredIsSymbol;

function requireIsSymbol () {
	if (hasRequiredIsSymbol) return isSymbol;
	hasRequiredIsSymbol = 1;
	var getBuiltIn = /*@__PURE__*/ requireGetBuiltIn();
	var isCallable = /*@__PURE__*/ requireIsCallable();
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var USE_SYMBOL_AS_UID = /*@__PURE__*/ requireUseSymbolAsUid();

	var $Object = Object;

	isSymbol = USE_SYMBOL_AS_UID ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  var $Symbol = getBuiltIn('Symbol');
	  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
	};
	return isSymbol;
}

var tryToString;
var hasRequiredTryToString;

function requireTryToString () {
	if (hasRequiredTryToString) return tryToString;
	hasRequiredTryToString = 1;
	var $String = String;

	tryToString = function (argument) {
	  try {
	    return $String(argument);
	  } catch (error) {
	    return 'Object';
	  }
	};
	return tryToString;
}

var aCallable;
var hasRequiredACallable;

function requireACallable () {
	if (hasRequiredACallable) return aCallable;
	hasRequiredACallable = 1;
	var isCallable = /*@__PURE__*/ requireIsCallable();
	var tryToString = /*@__PURE__*/ requireTryToString();

	var $TypeError = TypeError;

	// `Assert: IsCallable(argument) is true`
	aCallable = function (argument) {
	  if (isCallable(argument)) return argument;
	  throw new $TypeError(tryToString(argument) + ' is not a function');
	};
	return aCallable;
}

var getMethod;
var hasRequiredGetMethod;

function requireGetMethod () {
	if (hasRequiredGetMethod) return getMethod;
	hasRequiredGetMethod = 1;
	var aCallable = /*@__PURE__*/ requireACallable();
	var isNullOrUndefined = /*@__PURE__*/ requireIsNullOrUndefined();

	// `GetMethod` abstract operation
	// https://tc39.es/ecma262/#sec-getmethod
	getMethod = function (V, P) {
	  var func = V[P];
	  return isNullOrUndefined(func) ? undefined : aCallable(func);
	};
	return getMethod;
}

var ordinaryToPrimitive;
var hasRequiredOrdinaryToPrimitive;

function requireOrdinaryToPrimitive () {
	if (hasRequiredOrdinaryToPrimitive) return ordinaryToPrimitive;
	hasRequiredOrdinaryToPrimitive = 1;
	var call = /*@__PURE__*/ requireFunctionCall();
	var isCallable = /*@__PURE__*/ requireIsCallable();
	var isObject = /*@__PURE__*/ requireIsObject();

	var $TypeError = TypeError;

	// `OrdinaryToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
	ordinaryToPrimitive = function (input, pref) {
	  var fn, val;
	  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
	  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
	  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
	  throw new $TypeError("Can't convert object to primitive value");
	};
	return ordinaryToPrimitive;
}

var sharedStore = {exports: {}};

var isPure;
var hasRequiredIsPure;

function requireIsPure () {
	if (hasRequiredIsPure) return isPure;
	hasRequiredIsPure = 1;
	isPure = true;
	return isPure;
}

var defineGlobalProperty;
var hasRequiredDefineGlobalProperty;

function requireDefineGlobalProperty () {
	if (hasRequiredDefineGlobalProperty) return defineGlobalProperty;
	hasRequiredDefineGlobalProperty = 1;
	var globalThis = /*@__PURE__*/ requireGlobalThis();

	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var defineProperty = Object.defineProperty;

	defineGlobalProperty = function (key, value) {
	  try {
	    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
	  } catch (error) {
	    globalThis[key] = value;
	  } return value;
	};
	return defineGlobalProperty;
}

var hasRequiredSharedStore;

function requireSharedStore () {
	if (hasRequiredSharedStore) return sharedStore.exports;
	hasRequiredSharedStore = 1;
	var IS_PURE = /*@__PURE__*/ requireIsPure();
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var defineGlobalProperty = /*@__PURE__*/ requireDefineGlobalProperty();

	var SHARED = '__core-js_shared__';
	var store = sharedStore.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

	(store.versions || (store.versions = [])).push({
	  version: '3.44.0',
	  mode: IS_PURE ? 'pure' : 'global',
	  copyright: '© 2014-2025 Denis Pushkarev (zloirock.ru)',
	  license: 'https://github.com/zloirock/core-js/blob/v3.44.0/LICENSE',
	  source: 'https://github.com/zloirock/core-js'
	});
	return sharedStore.exports;
}

var shared;
var hasRequiredShared;

function requireShared () {
	if (hasRequiredShared) return shared;
	hasRequiredShared = 1;
	var store = /*@__PURE__*/ requireSharedStore();

	shared = function (key, value) {
	  return store[key] || (store[key] = value || {});
	};
	return shared;
}

var toObject;
var hasRequiredToObject;

function requireToObject () {
	if (hasRequiredToObject) return toObject;
	hasRequiredToObject = 1;
	var requireObjectCoercible = /*@__PURE__*/ requireRequireObjectCoercible();

	var $Object = Object;

	// `ToObject` abstract operation
	// https://tc39.es/ecma262/#sec-toobject
	toObject = function (argument) {
	  return $Object(requireObjectCoercible(argument));
	};
	return toObject;
}

var hasOwnProperty_1;
var hasRequiredHasOwnProperty;

function requireHasOwnProperty () {
	if (hasRequiredHasOwnProperty) return hasOwnProperty_1;
	hasRequiredHasOwnProperty = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var toObject = /*@__PURE__*/ requireToObject();

	var hasOwnProperty = uncurryThis({}.hasOwnProperty);

	// `HasOwnProperty` abstract operation
	// https://tc39.es/ecma262/#sec-hasownproperty
	// eslint-disable-next-line es/no-object-hasown -- safe
	hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
	  return hasOwnProperty(toObject(it), key);
	};
	return hasOwnProperty_1;
}

var uid;
var hasRequiredUid;

function requireUid () {
	if (hasRequiredUid) return uid;
	hasRequiredUid = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();

	var id = 0;
	var postfix = Math.random();
	var toString = uncurryThis(1.1.toString);

	uid = function (key) {
	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
	};
	return uid;
}

var wellKnownSymbol;
var hasRequiredWellKnownSymbol;

function requireWellKnownSymbol () {
	if (hasRequiredWellKnownSymbol) return wellKnownSymbol;
	hasRequiredWellKnownSymbol = 1;
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var shared = /*@__PURE__*/ requireShared();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var uid = /*@__PURE__*/ requireUid();
	var NATIVE_SYMBOL = /*@__PURE__*/ requireSymbolConstructorDetection();
	var USE_SYMBOL_AS_UID = /*@__PURE__*/ requireUseSymbolAsUid();

	var Symbol = globalThis.Symbol;
	var WellKnownSymbolsStore = shared('wks');
	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

	wellKnownSymbol = function (name) {
	  if (!hasOwn(WellKnownSymbolsStore, name)) {
	    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
	      ? Symbol[name]
	      : createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};
	return wellKnownSymbol;
}

var toPrimitive$6;
var hasRequiredToPrimitive$5;

function requireToPrimitive$5 () {
	if (hasRequiredToPrimitive$5) return toPrimitive$6;
	hasRequiredToPrimitive$5 = 1;
	var call = /*@__PURE__*/ requireFunctionCall();
	var isObject = /*@__PURE__*/ requireIsObject();
	var isSymbol = /*@__PURE__*/ requireIsSymbol();
	var getMethod = /*@__PURE__*/ requireGetMethod();
	var ordinaryToPrimitive = /*@__PURE__*/ requireOrdinaryToPrimitive();
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();

	var $TypeError = TypeError;
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

	// `ToPrimitive` abstract operation
	// https://tc39.es/ecma262/#sec-toprimitive
	toPrimitive$6 = function (input, pref) {
	  if (!isObject(input) || isSymbol(input)) return input;
	  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
	  var result;
	  if (exoticToPrim) {
	    if (pref === undefined) pref = 'default';
	    result = call(exoticToPrim, input, pref);
	    if (!isObject(result) || isSymbol(result)) return result;
	    throw new $TypeError("Can't convert object to primitive value");
	  }
	  if (pref === undefined) pref = 'number';
	  return ordinaryToPrimitive(input, pref);
	};
	return toPrimitive$6;
}

var toPropertyKey$1;
var hasRequiredToPropertyKey;

function requireToPropertyKey () {
	if (hasRequiredToPropertyKey) return toPropertyKey$1;
	hasRequiredToPropertyKey = 1;
	var toPrimitive = /*@__PURE__*/ requireToPrimitive$5();
	var isSymbol = /*@__PURE__*/ requireIsSymbol();

	// `ToPropertyKey` abstract operation
	// https://tc39.es/ecma262/#sec-topropertykey
	toPropertyKey$1 = function (argument) {
	  var key = toPrimitive(argument, 'string');
	  return isSymbol(key) ? key : key + '';
	};
	return toPropertyKey$1;
}

var documentCreateElement;
var hasRequiredDocumentCreateElement;

function requireDocumentCreateElement () {
	if (hasRequiredDocumentCreateElement) return documentCreateElement;
	hasRequiredDocumentCreateElement = 1;
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var isObject = /*@__PURE__*/ requireIsObject();

	var document = globalThis.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document) && isObject(document.createElement);

	documentCreateElement = function (it) {
	  return EXISTS ? document.createElement(it) : {};
	};
	return documentCreateElement;
}

var ie8DomDefine;
var hasRequiredIe8DomDefine;

function requireIe8DomDefine () {
	if (hasRequiredIe8DomDefine) return ie8DomDefine;
	hasRequiredIe8DomDefine = 1;
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var fails = /*@__PURE__*/ requireFails();
	var createElement = /*@__PURE__*/ requireDocumentCreateElement();

	// Thanks to IE8 for its funny defineProperty
	ie8DomDefine = !DESCRIPTORS && !fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(createElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a !== 7;
	});
	return ie8DomDefine;
}

var hasRequiredObjectGetOwnPropertyDescriptor;

function requireObjectGetOwnPropertyDescriptor () {
	if (hasRequiredObjectGetOwnPropertyDescriptor) return objectGetOwnPropertyDescriptor;
	hasRequiredObjectGetOwnPropertyDescriptor = 1;
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var call = /*@__PURE__*/ requireFunctionCall();
	var propertyIsEnumerableModule = /*@__PURE__*/ requireObjectPropertyIsEnumerable();
	var createPropertyDescriptor = /*@__PURE__*/ requireCreatePropertyDescriptor();
	var toIndexedObject = /*@__PURE__*/ requireToIndexedObject();
	var toPropertyKey = /*@__PURE__*/ requireToPropertyKey();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var IE8_DOM_DEFINE = /*@__PURE__*/ requireIe8DomDefine();

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	objectGetOwnPropertyDescriptor.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPropertyKey(P);
	  if (IE8_DOM_DEFINE) try {
	    return $getOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
	};
	return objectGetOwnPropertyDescriptor;
}

var isForced_1;
var hasRequiredIsForced;

function requireIsForced () {
	if (hasRequiredIsForced) return isForced_1;
	hasRequiredIsForced = 1;
	var fails = /*@__PURE__*/ requireFails();
	var isCallable = /*@__PURE__*/ requireIsCallable();

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value === POLYFILL ? true
	    : value === NATIVE ? false
	    : isCallable(detection) ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	isForced_1 = isForced;
	return isForced_1;
}

var functionBindContext;
var hasRequiredFunctionBindContext;

function requireFunctionBindContext () {
	if (hasRequiredFunctionBindContext) return functionBindContext;
	hasRequiredFunctionBindContext = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThisClause();
	var aCallable = /*@__PURE__*/ requireACallable();
	var NATIVE_BIND = /*@__PURE__*/ requireFunctionBindNative();

	var bind = uncurryThis(uncurryThis.bind);

	// optional / simple context binding
	functionBindContext = function (fn, that) {
	  aCallable(fn);
	  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};
	return functionBindContext;
}

var objectDefineProperty = {};

var v8PrototypeDefineBug;
var hasRequiredV8PrototypeDefineBug;

function requireV8PrototypeDefineBug () {
	if (hasRequiredV8PrototypeDefineBug) return v8PrototypeDefineBug;
	hasRequiredV8PrototypeDefineBug = 1;
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var fails = /*@__PURE__*/ requireFails();

	// V8 ~ Chrome 36-
	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
	v8PrototypeDefineBug = DESCRIPTORS && fails(function () {
	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
	    value: 42,
	    writable: false
	  }).prototype !== 42;
	});
	return v8PrototypeDefineBug;
}

var anObject;
var hasRequiredAnObject;

function requireAnObject () {
	if (hasRequiredAnObject) return anObject;
	hasRequiredAnObject = 1;
	var isObject = /*@__PURE__*/ requireIsObject();

	var $String = String;
	var $TypeError = TypeError;

	// `Assert: Type(argument) is Object`
	anObject = function (argument) {
	  if (isObject(argument)) return argument;
	  throw new $TypeError($String(argument) + ' is not an object');
	};
	return anObject;
}

var hasRequiredObjectDefineProperty;

function requireObjectDefineProperty () {
	if (hasRequiredObjectDefineProperty) return objectDefineProperty;
	hasRequiredObjectDefineProperty = 1;
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var IE8_DOM_DEFINE = /*@__PURE__*/ requireIe8DomDefine();
	var V8_PROTOTYPE_DEFINE_BUG = /*@__PURE__*/ requireV8PrototypeDefineBug();
	var anObject = /*@__PURE__*/ requireAnObject();
	var toPropertyKey = /*@__PURE__*/ requireToPropertyKey();

	var $TypeError = TypeError;
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	var $defineProperty = Object.defineProperty;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var ENUMERABLE = 'enumerable';
	var CONFIGURABLE = 'configurable';
	var WRITABLE = 'writable';

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	objectDefineProperty.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPropertyKey(P);
	  anObject(Attributes);
	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
	    var current = $getOwnPropertyDescriptor(O, P);
	    if (current && current[WRITABLE]) {
	      O[P] = Attributes.value;
	      Attributes = {
	        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
	        writable: false
	      };
	    }
	  } return $defineProperty(O, P, Attributes);
	} : $defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPropertyKey(P);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return $defineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};
	return objectDefineProperty;
}

var createNonEnumerableProperty;
var hasRequiredCreateNonEnumerableProperty;

function requireCreateNonEnumerableProperty () {
	if (hasRequiredCreateNonEnumerableProperty) return createNonEnumerableProperty;
	hasRequiredCreateNonEnumerableProperty = 1;
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var definePropertyModule = /*@__PURE__*/ requireObjectDefineProperty();
	var createPropertyDescriptor = /*@__PURE__*/ requireCreatePropertyDescriptor();

	createNonEnumerableProperty = DESCRIPTORS ? function (object, key, value) {
	  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};
	return createNonEnumerableProperty;
}

var _export;
var hasRequired_export;

function require_export () {
	if (hasRequired_export) return _export;
	hasRequired_export = 1;
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var apply = /*@__PURE__*/ requireFunctionApply();
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThisClause();
	var isCallable = /*@__PURE__*/ requireIsCallable();
	var getOwnPropertyDescriptor = /*@__PURE__*/ requireObjectGetOwnPropertyDescriptor().f;
	var isForced = /*@__PURE__*/ requireIsForced();
	var path = /*@__PURE__*/ requirePath();
	var bind = /*@__PURE__*/ requireFunctionBindContext();
	var createNonEnumerableProperty = /*@__PURE__*/ requireCreateNonEnumerableProperty();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();

	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof Wrapper) {
	      switch (arguments.length) {
	        case 0: return new NativeConstructor();
	        case 1: return new NativeConstructor(a);
	        case 2: return new NativeConstructor(a, b);
	      } return new NativeConstructor(a, b, c);
	    } return apply(NativeConstructor, this, arguments);
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
	_export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var PROTO = options.proto;

	  var nativeSource = GLOBAL ? globalThis : STATIC ? globalThis[TARGET] : globalThis[TARGET] && globalThis[TARGET].prototype;

	  var target = GLOBAL ? path : path[TARGET] || createNonEnumerableProperty(path, TARGET, {})[TARGET];
	  var targetPrototype = target.prototype;

	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contains in native
	    USE_NATIVE = !FORCED && nativeSource && hasOwn(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.dontCallGetSet) {
	      descriptor = getOwnPropertyDescriptor(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (!FORCED && !PROTO && typeof targetProperty == typeof sourceProperty) continue;

	    // bind methods to global for calling from export context
	    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, globalThis);
	    // wrap global constructors for prevent changes in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && isCallable(sourceProperty)) resultProperty = uncurryThis(sourceProperty);
	    // default case
	    else resultProperty = sourceProperty;

	    // add a flag to not completely full polyfills
	    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(resultProperty, 'sham', true);
	    }

	    createNonEnumerableProperty(target, key, resultProperty);

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
	      if (!hasOwn(path, VIRTUAL_PROTOTYPE)) {
	        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
	      }
	      // export virtual prototype methods
	      createNonEnumerableProperty(path[VIRTUAL_PROTOTYPE], key, sourceProperty);
	      // export real prototype methods
	      if (options.real && targetPrototype && (FORCED || !targetPrototype[key])) {
	        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
	      }
	    }
	  }
	};
	return _export;
}

var hasRequiredEs_object_defineProperty;

function requireEs_object_defineProperty () {
	if (hasRequiredEs_object_defineProperty) return es_object_defineProperty;
	hasRequiredEs_object_defineProperty = 1;
	var $ = /*@__PURE__*/ require_export();
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var defineProperty = /*@__PURE__*/ requireObjectDefineProperty().f;

	// `Object.defineProperty` method
	// https://tc39.es/ecma262/#sec-object.defineproperty
	// eslint-disable-next-line es/no-object-defineproperty -- safe
	$({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty, sham: !DESCRIPTORS }, {
	  defineProperty: defineProperty
	});
	return es_object_defineProperty;
}

var hasRequiredDefineProperty$5;

function requireDefineProperty$5 () {
	if (hasRequiredDefineProperty$5) return defineProperty$5.exports;
	hasRequiredDefineProperty$5 = 1;
	requireEs_object_defineProperty();
	var path = /*@__PURE__*/ requirePath();

	var Object = path.Object;

	var defineProperty = defineProperty$5.exports = function defineProperty(it, key, desc) {
	  return Object.defineProperty(it, key, desc);
	};

	if (Object.defineProperty.sham) defineProperty.sham = true;
	return defineProperty$5.exports;
}

var defineProperty$4;
var hasRequiredDefineProperty$4;

function requireDefineProperty$4 () {
	if (hasRequiredDefineProperty$4) return defineProperty$4;
	hasRequiredDefineProperty$4 = 1;
	var parent = /*@__PURE__*/ requireDefineProperty$5();

	defineProperty$4 = parent;
	return defineProperty$4;
}

var defineProperty$3;
var hasRequiredDefineProperty$3;

function requireDefineProperty$3 () {
	if (hasRequiredDefineProperty$3) return defineProperty$3;
	hasRequiredDefineProperty$3 = 1;
	var parent = /*@__PURE__*/ requireDefineProperty$4();

	defineProperty$3 = parent;
	return defineProperty$3;
}

var defineProperty$2;
var hasRequiredDefineProperty$2;

function requireDefineProperty$2 () {
	if (hasRequiredDefineProperty$2) return defineProperty$2;
	hasRequiredDefineProperty$2 = 1;
	var parent = /*@__PURE__*/ requireDefineProperty$3();

	defineProperty$2 = parent;
	return defineProperty$2;
}

var defineProperty$1;
var hasRequiredDefineProperty$1;

function requireDefineProperty$1 () {
	if (hasRequiredDefineProperty$1) return defineProperty$1;
	hasRequiredDefineProperty$1 = 1;
	defineProperty$1 = /*@__PURE__*/ requireDefineProperty$2();
	return defineProperty$1;
}

var definePropertyExports$1 = /*@__PURE__*/ requireDefineProperty$1();
var _Object$defineProperty$1 = /*@__PURE__*/getDefaultExportFromCjs(definePropertyExports$1);

var es_array_concat = {};

var isArray$3;
var hasRequiredIsArray$3;

function requireIsArray$3 () {
	if (hasRequiredIsArray$3) return isArray$3;
	hasRequiredIsArray$3 = 1;
	var classof = /*@__PURE__*/ requireClassofRaw();

	// `IsArray` abstract operation
	// https://tc39.es/ecma262/#sec-isarray
	// eslint-disable-next-line es/no-array-isarray -- safe
	isArray$3 = Array.isArray || function isArray(argument) {
	  return classof(argument) === 'Array';
	};
	return isArray$3;
}

var mathTrunc;
var hasRequiredMathTrunc;

function requireMathTrunc () {
	if (hasRequiredMathTrunc) return mathTrunc;
	hasRequiredMathTrunc = 1;
	var ceil = Math.ceil;
	var floor = Math.floor;

	// `Math.trunc` method
	// https://tc39.es/ecma262/#sec-math.trunc
	// eslint-disable-next-line es/no-math-trunc -- safe
	mathTrunc = Math.trunc || function trunc(x) {
	  var n = +x;
	  return (n > 0 ? floor : ceil)(n);
	};
	return mathTrunc;
}

var toIntegerOrInfinity;
var hasRequiredToIntegerOrInfinity;

function requireToIntegerOrInfinity () {
	if (hasRequiredToIntegerOrInfinity) return toIntegerOrInfinity;
	hasRequiredToIntegerOrInfinity = 1;
	var trunc = /*@__PURE__*/ requireMathTrunc();

	// `ToIntegerOrInfinity` abstract operation
	// https://tc39.es/ecma262/#sec-tointegerorinfinity
	toIntegerOrInfinity = function (argument) {
	  var number = +argument;
	  // eslint-disable-next-line no-self-compare -- NaN check
	  return number !== number || number === 0 ? 0 : trunc(number);
	};
	return toIntegerOrInfinity;
}

var toLength;
var hasRequiredToLength;

function requireToLength () {
	if (hasRequiredToLength) return toLength;
	hasRequiredToLength = 1;
	var toIntegerOrInfinity = /*@__PURE__*/ requireToIntegerOrInfinity();

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.es/ecma262/#sec-tolength
	toLength = function (argument) {
	  var len = toIntegerOrInfinity(argument);
	  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};
	return toLength;
}

var lengthOfArrayLike;
var hasRequiredLengthOfArrayLike;

function requireLengthOfArrayLike () {
	if (hasRequiredLengthOfArrayLike) return lengthOfArrayLike;
	hasRequiredLengthOfArrayLike = 1;
	var toLength = /*@__PURE__*/ requireToLength();

	// `LengthOfArrayLike` abstract operation
	// https://tc39.es/ecma262/#sec-lengthofarraylike
	lengthOfArrayLike = function (obj) {
	  return toLength(obj.length);
	};
	return lengthOfArrayLike;
}

var doesNotExceedSafeInteger;
var hasRequiredDoesNotExceedSafeInteger;

function requireDoesNotExceedSafeInteger () {
	if (hasRequiredDoesNotExceedSafeInteger) return doesNotExceedSafeInteger;
	hasRequiredDoesNotExceedSafeInteger = 1;
	var $TypeError = TypeError;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

	doesNotExceedSafeInteger = function (it) {
	  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
	  return it;
	};
	return doesNotExceedSafeInteger;
}

var createProperty;
var hasRequiredCreateProperty;

function requireCreateProperty () {
	if (hasRequiredCreateProperty) return createProperty;
	hasRequiredCreateProperty = 1;
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var definePropertyModule = /*@__PURE__*/ requireObjectDefineProperty();
	var createPropertyDescriptor = /*@__PURE__*/ requireCreatePropertyDescriptor();

	createProperty = function (object, key, value) {
	  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
	  else object[key] = value;
	};
	return createProperty;
}

var toStringTagSupport;
var hasRequiredToStringTagSupport;

function requireToStringTagSupport () {
	if (hasRequiredToStringTagSupport) return toStringTagSupport;
	hasRequiredToStringTagSupport = 1;
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG] = 'z';

	toStringTagSupport = String(test) === '[object z]';
	return toStringTagSupport;
}

var classof;
var hasRequiredClassof;

function requireClassof () {
	if (hasRequiredClassof) return classof;
	hasRequiredClassof = 1;
	var TO_STRING_TAG_SUPPORT = /*@__PURE__*/ requireToStringTagSupport();
	var isCallable = /*@__PURE__*/ requireIsCallable();
	var classofRaw = /*@__PURE__*/ requireClassofRaw();
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	var $Object = Object;

	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	classof = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
	};
	return classof;
}

var inspectSource;
var hasRequiredInspectSource;

function requireInspectSource () {
	if (hasRequiredInspectSource) return inspectSource;
	hasRequiredInspectSource = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var isCallable = /*@__PURE__*/ requireIsCallable();
	var store = /*@__PURE__*/ requireSharedStore();

	var functionToString = uncurryThis(Function.toString);

	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
	if (!isCallable(store.inspectSource)) {
	  store.inspectSource = function (it) {
	    return functionToString(it);
	  };
	}

	inspectSource = store.inspectSource;
	return inspectSource;
}

var isConstructor;
var hasRequiredIsConstructor;

function requireIsConstructor () {
	if (hasRequiredIsConstructor) return isConstructor;
	hasRequiredIsConstructor = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var fails = /*@__PURE__*/ requireFails();
	var isCallable = /*@__PURE__*/ requireIsCallable();
	var classof = /*@__PURE__*/ requireClassof();
	var getBuiltIn = /*@__PURE__*/ requireGetBuiltIn();
	var inspectSource = /*@__PURE__*/ requireInspectSource();

	var noop = function () { /* empty */ };
	var construct = getBuiltIn('Reflect', 'construct');
	var constructorRegExp = /^\s*(?:class|function)\b/;
	var exec = uncurryThis(constructorRegExp.exec);
	var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

	var isConstructorModern = function isConstructor(argument) {
	  if (!isCallable(argument)) return false;
	  try {
	    construct(noop, [], argument);
	    return true;
	  } catch (error) {
	    return false;
	  }
	};

	var isConstructorLegacy = function isConstructor(argument) {
	  if (!isCallable(argument)) return false;
	  switch (classof(argument)) {
	    case 'AsyncFunction':
	    case 'GeneratorFunction':
	    case 'AsyncGeneratorFunction': return false;
	  }
	  try {
	    // we can't check .prototype since constructors produced by .bind haven't it
	    // `Function#toString` throws on some built-it function in some legacy engines
	    // (for example, `DOMQuad` and similar in FF41-)
	    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
	  } catch (error) {
	    return true;
	  }
	};

	isConstructorLegacy.sham = true;

	// `IsConstructor` abstract operation
	// https://tc39.es/ecma262/#sec-isconstructor
	isConstructor = !construct || fails(function () {
	  var called;
	  return isConstructorModern(isConstructorModern.call)
	    || !isConstructorModern(Object)
	    || !isConstructorModern(function () { called = true; })
	    || called;
	}) ? isConstructorLegacy : isConstructorModern;
	return isConstructor;
}

var arraySpeciesConstructor;
var hasRequiredArraySpeciesConstructor;

function requireArraySpeciesConstructor () {
	if (hasRequiredArraySpeciesConstructor) return arraySpeciesConstructor;
	hasRequiredArraySpeciesConstructor = 1;
	var isArray = /*@__PURE__*/ requireIsArray$3();
	var isConstructor = /*@__PURE__*/ requireIsConstructor();
	var isObject = /*@__PURE__*/ requireIsObject();
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();

	var SPECIES = wellKnownSymbol('species');
	var $Array = Array;

	// a part of `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	arraySpeciesConstructor = function (originalArray) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? $Array : C;
	};
	return arraySpeciesConstructor;
}

var arraySpeciesCreate;
var hasRequiredArraySpeciesCreate;

function requireArraySpeciesCreate () {
	if (hasRequiredArraySpeciesCreate) return arraySpeciesCreate;
	hasRequiredArraySpeciesCreate = 1;
	var arraySpeciesConstructor = /*@__PURE__*/ requireArraySpeciesConstructor();

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.es/ecma262/#sec-arrayspeciescreate
	arraySpeciesCreate = function (originalArray, length) {
	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
	};
	return arraySpeciesCreate;
}

var arrayMethodHasSpeciesSupport;
var hasRequiredArrayMethodHasSpeciesSupport;

function requireArrayMethodHasSpeciesSupport () {
	if (hasRequiredArrayMethodHasSpeciesSupport) return arrayMethodHasSpeciesSupport;
	hasRequiredArrayMethodHasSpeciesSupport = 1;
	var fails = /*@__PURE__*/ requireFails();
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();
	var V8_VERSION = /*@__PURE__*/ requireEnvironmentV8Version();

	var SPECIES = wellKnownSymbol('species');

	arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return V8_VERSION >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};
	return arrayMethodHasSpeciesSupport;
}

var hasRequiredEs_array_concat;

function requireEs_array_concat () {
	if (hasRequiredEs_array_concat) return es_array_concat;
	hasRequiredEs_array_concat = 1;
	var $ = /*@__PURE__*/ require_export();
	var fails = /*@__PURE__*/ requireFails();
	var isArray = /*@__PURE__*/ requireIsArray$3();
	var isObject = /*@__PURE__*/ requireIsObject();
	var toObject = /*@__PURE__*/ requireToObject();
	var lengthOfArrayLike = /*@__PURE__*/ requireLengthOfArrayLike();
	var doesNotExceedSafeInteger = /*@__PURE__*/ requireDoesNotExceedSafeInteger();
	var createProperty = /*@__PURE__*/ requireCreateProperty();
	var arraySpeciesCreate = /*@__PURE__*/ requireArraySpeciesCreate();
	var arrayMethodHasSpeciesSupport = /*@__PURE__*/ requireArrayMethodHasSpeciesSupport();
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();
	var V8_VERSION = /*@__PURE__*/ requireEnvironmentV8Version();

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');

	// `Array.prototype.concat` method
	// https://tc39.es/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  concat: function concat(arg) {
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = lengthOfArrayLike(E);
	        doesNotExceedSafeInteger(n + len);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        doesNotExceedSafeInteger(n + 1);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});
	return es_array_concat;
}

var es_symbol = {};

var es_symbol_constructor = {};

var toString;
var hasRequiredToString;

function requireToString () {
	if (hasRequiredToString) return toString;
	hasRequiredToString = 1;
	var classof = /*@__PURE__*/ requireClassof();

	var $String = String;

	toString = function (argument) {
	  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
	  return $String(argument);
	};
	return toString;
}

var objectDefineProperties = {};

var toAbsoluteIndex;
var hasRequiredToAbsoluteIndex;

function requireToAbsoluteIndex () {
	if (hasRequiredToAbsoluteIndex) return toAbsoluteIndex;
	hasRequiredToAbsoluteIndex = 1;
	var toIntegerOrInfinity = /*@__PURE__*/ requireToIntegerOrInfinity();

	var max = Math.max;
	var min = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	toAbsoluteIndex = function (index, length) {
	  var integer = toIntegerOrInfinity(index);
	  return integer < 0 ? max(integer + length, 0) : min(integer, length);
	};
	return toAbsoluteIndex;
}

var arrayIncludes;
var hasRequiredArrayIncludes;

function requireArrayIncludes () {
	if (hasRequiredArrayIncludes) return arrayIncludes;
	hasRequiredArrayIncludes = 1;
	var toIndexedObject = /*@__PURE__*/ requireToIndexedObject();
	var toAbsoluteIndex = /*@__PURE__*/ requireToAbsoluteIndex();
	var lengthOfArrayLike = /*@__PURE__*/ requireLengthOfArrayLike();

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = lengthOfArrayLike(O);
	    if (length === 0) return !IS_INCLUDES && -1;
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare -- NaN check
	    if (IS_INCLUDES && el !== el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare -- NaN check
	      if (value !== value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.es/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};
	return arrayIncludes;
}

var hiddenKeys;
var hasRequiredHiddenKeys;

function requireHiddenKeys () {
	if (hasRequiredHiddenKeys) return hiddenKeys;
	hasRequiredHiddenKeys = 1;
	hiddenKeys = {};
	return hiddenKeys;
}

var objectKeysInternal;
var hasRequiredObjectKeysInternal;

function requireObjectKeysInternal () {
	if (hasRequiredObjectKeysInternal) return objectKeysInternal;
	hasRequiredObjectKeysInternal = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var toIndexedObject = /*@__PURE__*/ requireToIndexedObject();
	var indexOf = /*@__PURE__*/ requireArrayIncludes().indexOf;
	var hiddenKeys = /*@__PURE__*/ requireHiddenKeys();

	var push = uncurryThis([].push);

	objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (hasOwn(O, key = names[i++])) {
	    ~indexOf(result, key) || push(result, key);
	  }
	  return result;
	};
	return objectKeysInternal;
}

var enumBugKeys;
var hasRequiredEnumBugKeys;

function requireEnumBugKeys () {
	if (hasRequiredEnumBugKeys) return enumBugKeys;
	hasRequiredEnumBugKeys = 1;
	// IE8- don't enum bug keys
	enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];
	return enumBugKeys;
}

var objectKeys;
var hasRequiredObjectKeys;

function requireObjectKeys () {
	if (hasRequiredObjectKeys) return objectKeys;
	hasRequiredObjectKeys = 1;
	var internalObjectKeys = /*@__PURE__*/ requireObjectKeysInternal();
	var enumBugKeys = /*@__PURE__*/ requireEnumBugKeys();

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	// eslint-disable-next-line es/no-object-keys -- safe
	objectKeys = Object.keys || function keys(O) {
	  return internalObjectKeys(O, enumBugKeys);
	};
	return objectKeys;
}

var hasRequiredObjectDefineProperties;

function requireObjectDefineProperties () {
	if (hasRequiredObjectDefineProperties) return objectDefineProperties;
	hasRequiredObjectDefineProperties = 1;
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var V8_PROTOTYPE_DEFINE_BUG = /*@__PURE__*/ requireV8PrototypeDefineBug();
	var definePropertyModule = /*@__PURE__*/ requireObjectDefineProperty();
	var anObject = /*@__PURE__*/ requireAnObject();
	var toIndexedObject = /*@__PURE__*/ requireToIndexedObject();
	var objectKeys = /*@__PURE__*/ requireObjectKeys();

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var props = toIndexedObject(Properties);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
	  return O;
	};
	return objectDefineProperties;
}

var html;
var hasRequiredHtml;

function requireHtml () {
	if (hasRequiredHtml) return html;
	hasRequiredHtml = 1;
	var getBuiltIn = /*@__PURE__*/ requireGetBuiltIn();

	html = getBuiltIn('document', 'documentElement');
	return html;
}

var sharedKey;
var hasRequiredSharedKey;

function requireSharedKey () {
	if (hasRequiredSharedKey) return sharedKey;
	hasRequiredSharedKey = 1;
	var shared = /*@__PURE__*/ requireShared();
	var uid = /*@__PURE__*/ requireUid();

	var keys = shared('keys');

	sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};
	return sharedKey;
}

var objectCreate;
var hasRequiredObjectCreate;

function requireObjectCreate () {
	if (hasRequiredObjectCreate) return objectCreate;
	hasRequiredObjectCreate = 1;
	/* global ActiveXObject -- old IE, WSH */
	var anObject = /*@__PURE__*/ requireAnObject();
	var definePropertiesModule = /*@__PURE__*/ requireObjectDefineProperties();
	var enumBugKeys = /*@__PURE__*/ requireEnumBugKeys();
	var hiddenKeys = /*@__PURE__*/ requireHiddenKeys();
	var html = /*@__PURE__*/ requireHtml();
	var documentCreateElement = /*@__PURE__*/ requireDocumentCreateElement();
	var sharedKey = /*@__PURE__*/ requireSharedKey();

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
	  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
	  activeXDocument = null;
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
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	// eslint-disable-next-line es/no-object-create -- safe
	objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
	};
	return objectCreate;
}

var objectGetOwnPropertyNames = {};

var hasRequiredObjectGetOwnPropertyNames;

function requireObjectGetOwnPropertyNames () {
	if (hasRequiredObjectGetOwnPropertyNames) return objectGetOwnPropertyNames;
	hasRequiredObjectGetOwnPropertyNames = 1;
	var internalObjectKeys = /*@__PURE__*/ requireObjectKeysInternal();
	var enumBugKeys = /*@__PURE__*/ requireEnumBugKeys();

	var hiddenKeys = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.es/ecma262/#sec-object.getownpropertynames
	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return internalObjectKeys(O, hiddenKeys);
	};
	return objectGetOwnPropertyNames;
}

var objectGetOwnPropertyNamesExternal = {};

var arraySlice;
var hasRequiredArraySlice;

function requireArraySlice () {
	if (hasRequiredArraySlice) return arraySlice;
	hasRequiredArraySlice = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();

	arraySlice = uncurryThis([].slice);
	return arraySlice;
}

var hasRequiredObjectGetOwnPropertyNamesExternal;

function requireObjectGetOwnPropertyNamesExternal () {
	if (hasRequiredObjectGetOwnPropertyNamesExternal) return objectGetOwnPropertyNamesExternal;
	hasRequiredObjectGetOwnPropertyNamesExternal = 1;
	/* eslint-disable es/no-object-getownpropertynames -- safe */
	var classof = /*@__PURE__*/ requireClassofRaw();
	var toIndexedObject = /*@__PURE__*/ requireToIndexedObject();
	var $getOwnPropertyNames = /*@__PURE__*/ requireObjectGetOwnPropertyNames().f;
	var arraySlice = /*@__PURE__*/ requireArraySlice();

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return $getOwnPropertyNames(it);
	  } catch (error) {
	    return arraySlice(windowNames);
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
	  return windowNames && classof(it) === 'Window'
	    ? getWindowNames(it)
	    : $getOwnPropertyNames(toIndexedObject(it));
	};
	return objectGetOwnPropertyNamesExternal;
}

var objectGetOwnPropertySymbols = {};

var hasRequiredObjectGetOwnPropertySymbols;

function requireObjectGetOwnPropertySymbols () {
	if (hasRequiredObjectGetOwnPropertySymbols) return objectGetOwnPropertySymbols;
	hasRequiredObjectGetOwnPropertySymbols = 1;
	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
	return objectGetOwnPropertySymbols;
}

var defineBuiltIn;
var hasRequiredDefineBuiltIn;

function requireDefineBuiltIn () {
	if (hasRequiredDefineBuiltIn) return defineBuiltIn;
	hasRequiredDefineBuiltIn = 1;
	var createNonEnumerableProperty = /*@__PURE__*/ requireCreateNonEnumerableProperty();

	defineBuiltIn = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else createNonEnumerableProperty(target, key, value);
	  return target;
	};
	return defineBuiltIn;
}

var defineBuiltInAccessor;
var hasRequiredDefineBuiltInAccessor;

function requireDefineBuiltInAccessor () {
	if (hasRequiredDefineBuiltInAccessor) return defineBuiltInAccessor;
	hasRequiredDefineBuiltInAccessor = 1;
	var defineProperty = /*@__PURE__*/ requireObjectDefineProperty();

	defineBuiltInAccessor = function (target, name, descriptor) {
	  return defineProperty.f(target, name, descriptor);
	};
	return defineBuiltInAccessor;
}

var wellKnownSymbolWrapped = {};

var hasRequiredWellKnownSymbolWrapped;

function requireWellKnownSymbolWrapped () {
	if (hasRequiredWellKnownSymbolWrapped) return wellKnownSymbolWrapped;
	hasRequiredWellKnownSymbolWrapped = 1;
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();

	wellKnownSymbolWrapped.f = wellKnownSymbol;
	return wellKnownSymbolWrapped;
}

var wellKnownSymbolDefine;
var hasRequiredWellKnownSymbolDefine;

function requireWellKnownSymbolDefine () {
	if (hasRequiredWellKnownSymbolDefine) return wellKnownSymbolDefine;
	hasRequiredWellKnownSymbolDefine = 1;
	var path = /*@__PURE__*/ requirePath();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var wrappedWellKnownSymbolModule = /*@__PURE__*/ requireWellKnownSymbolWrapped();
	var defineProperty = /*@__PURE__*/ requireObjectDefineProperty().f;

	wellKnownSymbolDefine = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!hasOwn(Symbol, NAME)) defineProperty(Symbol, NAME, {
	    value: wrappedWellKnownSymbolModule.f(NAME)
	  });
	};
	return wellKnownSymbolDefine;
}

var symbolDefineToPrimitive;
var hasRequiredSymbolDefineToPrimitive;

function requireSymbolDefineToPrimitive () {
	if (hasRequiredSymbolDefineToPrimitive) return symbolDefineToPrimitive;
	hasRequiredSymbolDefineToPrimitive = 1;
	var call = /*@__PURE__*/ requireFunctionCall();
	var getBuiltIn = /*@__PURE__*/ requireGetBuiltIn();
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();
	var defineBuiltIn = /*@__PURE__*/ requireDefineBuiltIn();

	symbolDefineToPrimitive = function () {
	  var Symbol = getBuiltIn('Symbol');
	  var SymbolPrototype = Symbol && Symbol.prototype;
	  var valueOf = SymbolPrototype && SymbolPrototype.valueOf;
	  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

	  if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
	    // `Symbol.prototype[@@toPrimitive]` method
	    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	    // eslint-disable-next-line no-unused-vars -- required for .length
	    defineBuiltIn(SymbolPrototype, TO_PRIMITIVE, function (hint) {
	      return call(valueOf, this);
	    }, { arity: 1 });
	  }
	};
	return symbolDefineToPrimitive;
}

var objectToString;
var hasRequiredObjectToString;

function requireObjectToString () {
	if (hasRequiredObjectToString) return objectToString;
	hasRequiredObjectToString = 1;
	var TO_STRING_TAG_SUPPORT = /*@__PURE__*/ requireToStringTagSupport();
	var classof = /*@__PURE__*/ requireClassof();

	// `Object.prototype.toString` method implementation
	// https://tc39.es/ecma262/#sec-object.prototype.tostring
	objectToString = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};
	return objectToString;
}

var setToStringTag;
var hasRequiredSetToStringTag;

function requireSetToStringTag () {
	if (hasRequiredSetToStringTag) return setToStringTag;
	hasRequiredSetToStringTag = 1;
	var TO_STRING_TAG_SUPPORT = /*@__PURE__*/ requireToStringTagSupport();
	var defineProperty = /*@__PURE__*/ requireObjectDefineProperty().f;
	var createNonEnumerableProperty = /*@__PURE__*/ requireCreateNonEnumerableProperty();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var toString = /*@__PURE__*/ requireObjectToString();
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
	  var target = STATIC ? it : it && it.prototype;
	  if (target) {
	    if (!hasOwn(target, TO_STRING_TAG)) {
	      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
	      createNonEnumerableProperty(target, 'toString', toString);
	    }
	  }
	};
	return setToStringTag;
}

var weakMapBasicDetection;
var hasRequiredWeakMapBasicDetection;

function requireWeakMapBasicDetection () {
	if (hasRequiredWeakMapBasicDetection) return weakMapBasicDetection;
	hasRequiredWeakMapBasicDetection = 1;
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var isCallable = /*@__PURE__*/ requireIsCallable();

	var WeakMap = globalThis.WeakMap;

	weakMapBasicDetection = isCallable(WeakMap) && /native code/.test(String(WeakMap));
	return weakMapBasicDetection;
}

var internalState;
var hasRequiredInternalState;

function requireInternalState () {
	if (hasRequiredInternalState) return internalState;
	hasRequiredInternalState = 1;
	var NATIVE_WEAK_MAP = /*@__PURE__*/ requireWeakMapBasicDetection();
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var isObject = /*@__PURE__*/ requireIsObject();
	var createNonEnumerableProperty = /*@__PURE__*/ requireCreateNonEnumerableProperty();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var shared = /*@__PURE__*/ requireSharedStore();
	var sharedKey = /*@__PURE__*/ requireSharedKey();
	var hiddenKeys = /*@__PURE__*/ requireHiddenKeys();

	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
	var TypeError = globalThis.TypeError;
	var WeakMap = globalThis.WeakMap;
	var set, get, has;

	var enforce = function (it) {
	  return has(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (NATIVE_WEAK_MAP || shared.state) {
	  var store = shared.state || (shared.state = new WeakMap());
	  /* eslint-disable no-self-assign -- prototype methods protection */
	  store.get = store.get;
	  store.has = store.has;
	  store.set = store.set;
	  /* eslint-enable no-self-assign -- prototype methods protection */
	  set = function (it, metadata) {
	    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
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
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
	    metadata.facade = it;
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return hasOwn(it, STATE) ? it[STATE] : {};
	  };
	  has = function (it) {
	    return hasOwn(it, STATE);
	  };
	}

	internalState = {
	  set: set,
	  get: get,
	  has: has,
	  enforce: enforce,
	  getterFor: getterFor
	};
	return internalState;
}

var arrayIteration;
var hasRequiredArrayIteration;

function requireArrayIteration () {
	if (hasRequiredArrayIteration) return arrayIteration;
	hasRequiredArrayIteration = 1;
	var bind = /*@__PURE__*/ requireFunctionBindContext();
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var IndexedObject = /*@__PURE__*/ requireIndexedObject();
	var toObject = /*@__PURE__*/ requireToObject();
	var lengthOfArrayLike = /*@__PURE__*/ requireLengthOfArrayLike();
	var arraySpeciesCreate = /*@__PURE__*/ requireArraySpeciesCreate();

	var push = uncurryThis([].push);

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
	var createMethod = function (TYPE) {
	  var IS_MAP = TYPE === 1;
	  var IS_FILTER = TYPE === 2;
	  var IS_SOME = TYPE === 3;
	  var IS_EVERY = TYPE === 4;
	  var IS_FIND_INDEX = TYPE === 6;
	  var IS_FILTER_REJECT = TYPE === 7;
	  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = IndexedObject(O);
	    var length = lengthOfArrayLike(self);
	    var boundFunction = bind(callbackfn, that);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
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
	          case 2: push(target, value);      // filter
	        } else switch (TYPE) {
	          case 4: return false;             // every
	          case 7: push(target, value);      // filterReject
	        }
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod(0),
	  // `Array.prototype.map` method
	  // https://tc39.es/ecma262/#sec-array.prototype.map
	  map: createMethod(1),
	  // `Array.prototype.filter` method
	  // https://tc39.es/ecma262/#sec-array.prototype.filter
	  filter: createMethod(2),
	  // `Array.prototype.some` method
	  // https://tc39.es/ecma262/#sec-array.prototype.some
	  some: createMethod(3),
	  // `Array.prototype.every` method
	  // https://tc39.es/ecma262/#sec-array.prototype.every
	  every: createMethod(4),
	  // `Array.prototype.find` method
	  // https://tc39.es/ecma262/#sec-array.prototype.find
	  find: createMethod(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod(6),
	  // `Array.prototype.filterReject` method
	  // https://github.com/tc39/proposal-array-filtering
	  filterReject: createMethod(7)
	};
	return arrayIteration;
}

var hasRequiredEs_symbol_constructor;

function requireEs_symbol_constructor () {
	if (hasRequiredEs_symbol_constructor) return es_symbol_constructor;
	hasRequiredEs_symbol_constructor = 1;
	var $ = /*@__PURE__*/ require_export();
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var call = /*@__PURE__*/ requireFunctionCall();
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var IS_PURE = /*@__PURE__*/ requireIsPure();
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var NATIVE_SYMBOL = /*@__PURE__*/ requireSymbolConstructorDetection();
	var fails = /*@__PURE__*/ requireFails();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var anObject = /*@__PURE__*/ requireAnObject();
	var toIndexedObject = /*@__PURE__*/ requireToIndexedObject();
	var toPropertyKey = /*@__PURE__*/ requireToPropertyKey();
	var $toString = /*@__PURE__*/ requireToString();
	var createPropertyDescriptor = /*@__PURE__*/ requireCreatePropertyDescriptor();
	var nativeObjectCreate = /*@__PURE__*/ requireObjectCreate();
	var objectKeys = /*@__PURE__*/ requireObjectKeys();
	var getOwnPropertyNamesModule = /*@__PURE__*/ requireObjectGetOwnPropertyNames();
	var getOwnPropertyNamesExternal = /*@__PURE__*/ requireObjectGetOwnPropertyNamesExternal();
	var getOwnPropertySymbolsModule = /*@__PURE__*/ requireObjectGetOwnPropertySymbols();
	var getOwnPropertyDescriptorModule = /*@__PURE__*/ requireObjectGetOwnPropertyDescriptor();
	var definePropertyModule = /*@__PURE__*/ requireObjectDefineProperty();
	var definePropertiesModule = /*@__PURE__*/ requireObjectDefineProperties();
	var propertyIsEnumerableModule = /*@__PURE__*/ requireObjectPropertyIsEnumerable();
	var defineBuiltIn = /*@__PURE__*/ requireDefineBuiltIn();
	var defineBuiltInAccessor = /*@__PURE__*/ requireDefineBuiltInAccessor();
	var shared = /*@__PURE__*/ requireShared();
	var sharedKey = /*@__PURE__*/ requireSharedKey();
	var hiddenKeys = /*@__PURE__*/ requireHiddenKeys();
	var uid = /*@__PURE__*/ requireUid();
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();
	var wrappedWellKnownSymbolModule = /*@__PURE__*/ requireWellKnownSymbolWrapped();
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();
	var defineSymbolToPrimitive = /*@__PURE__*/ requireSymbolDefineToPrimitive();
	var setToStringTag = /*@__PURE__*/ requireSetToStringTag();
	var InternalStateModule = /*@__PURE__*/ requireInternalState();
	var $forEach = /*@__PURE__*/ requireArrayIteration().forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE = 'prototype';

	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(SYMBOL);

	var ObjectPrototype = Object[PROTOTYPE];
	var $Symbol = globalThis.Symbol;
	var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE];
	var RangeError = globalThis.RangeError;
	var TypeError = globalThis.TypeError;
	var QObject = globalThis.QObject;
	var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	var nativeDefineProperty = definePropertyModule.f;
	var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
	var push = uncurryThis([].push);

	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var WellKnownSymbolsStore = shared('wks');

	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var fallbackDefineProperty = function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
	  nativeDefineProperty(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
	    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
	  }
	};

	var setSymbolDescriptor = DESCRIPTORS && fails(function () {
	  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
	    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
	  })).a !== 7;
	}) ? fallbackDefineProperty : nativeDefineProperty;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype);
	  setInternalState(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!DESCRIPTORS) symbol.description = description;
	  return symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPropertyKey(P);
	  anObject(Attributes);
	  if (hasOwn(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, nativeObjectCreate(null)));
	      O[HIDDEN][key] = true;
	    } else {
	      if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach(keys, function (key) {
	    if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPropertyKey(V);
	  var enumerable = call(nativePropertyIsEnumerable, this, P);
	  if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
	    ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPropertyKey(P);
	  if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
	  if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function (O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
	  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach(names, function (key) {
	    if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
	      push(result, AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.es/ecma262/#sec-symbol-constructor
	if (!NATIVE_SYMBOL) {
	  $Symbol = function Symbol() {
	    if (isPrototypeOf(SymbolPrototype, this)) throw new TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      var $this = this === undefined ? globalThis : this;
	      if ($this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value);
	      if (hasOwn($this, HIDDEN) && hasOwn($this[HIDDEN], tag)) $this[HIDDEN][tag] = false;
	      var descriptor = createPropertyDescriptor(1, value);
	      try {
	        setSymbolDescriptor($this, tag, descriptor);
	      } catch (error) {
	        if (!(error instanceof RangeError)) throw error;
	        fallbackDefineProperty($this, tag, descriptor);
	      }
	    };
	    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  SymbolPrototype = $Symbol[PROTOTYPE];

	  defineBuiltIn(SymbolPrototype, 'toString', function toString() {
	    return getInternalState(this).tag;
	  });

	  defineBuiltIn($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  propertyIsEnumerableModule.f = $propertyIsEnumerable;
	  definePropertyModule.f = $defineProperty;
	  definePropertiesModule.f = $defineProperties;
	  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
	  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbolModule.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };

	  if (DESCRIPTORS) {
	    // https://tc39.es/ecma262/#sec-symbol.prototype.description
	    defineBuiltInAccessor(SymbolPrototype, 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState(this).description;
	      }
	    });
	    if (!IS_PURE) {
	      defineBuiltIn(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	$({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
	  Symbol: $Symbol
	});

	$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol(name);
	});

	$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
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

	$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames
	});

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	defineSymbolToPrimitive();

	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;
	return es_symbol_constructor;
}

var es_symbol_for = {};

var symbolRegistryDetection;
var hasRequiredSymbolRegistryDetection;

function requireSymbolRegistryDetection () {
	if (hasRequiredSymbolRegistryDetection) return symbolRegistryDetection;
	hasRequiredSymbolRegistryDetection = 1;
	var NATIVE_SYMBOL = /*@__PURE__*/ requireSymbolConstructorDetection();

	/* eslint-disable es/no-symbol -- safe */
	symbolRegistryDetection = NATIVE_SYMBOL && !!Symbol['for'] && !!Symbol.keyFor;
	return symbolRegistryDetection;
}

var hasRequiredEs_symbol_for;

function requireEs_symbol_for () {
	if (hasRequiredEs_symbol_for) return es_symbol_for;
	hasRequiredEs_symbol_for = 1;
	var $ = /*@__PURE__*/ require_export();
	var getBuiltIn = /*@__PURE__*/ requireGetBuiltIn();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var toString = /*@__PURE__*/ requireToString();
	var shared = /*@__PURE__*/ requireShared();
	var NATIVE_SYMBOL_REGISTRY = /*@__PURE__*/ requireSymbolRegistryDetection();

	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');

	// `Symbol.for` method
	// https://tc39.es/ecma262/#sec-symbol.for
	$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
	  'for': function (key) {
	    var string = toString(key);
	    if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = getBuiltIn('Symbol')(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  }
	});
	return es_symbol_for;
}

var es_symbol_keyFor = {};

var hasRequiredEs_symbol_keyFor;

function requireEs_symbol_keyFor () {
	if (hasRequiredEs_symbol_keyFor) return es_symbol_keyFor;
	hasRequiredEs_symbol_keyFor = 1;
	var $ = /*@__PURE__*/ require_export();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var isSymbol = /*@__PURE__*/ requireIsSymbol();
	var tryToString = /*@__PURE__*/ requireTryToString();
	var shared = /*@__PURE__*/ requireShared();
	var NATIVE_SYMBOL_REGISTRY = /*@__PURE__*/ requireSymbolRegistryDetection();

	var SymbolToStringRegistry = shared('symbol-to-string-registry');

	// `Symbol.keyFor` method
	// https://tc39.es/ecma262/#sec-symbol.keyfor
	$({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw new TypeError(tryToString(sym) + ' is not a symbol');
	    if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  }
	});
	return es_symbol_keyFor;
}

var es_json_stringify = {};

var getJsonReplacerFunction;
var hasRequiredGetJsonReplacerFunction;

function requireGetJsonReplacerFunction () {
	if (hasRequiredGetJsonReplacerFunction) return getJsonReplacerFunction;
	hasRequiredGetJsonReplacerFunction = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var isArray = /*@__PURE__*/ requireIsArray$3();
	var isCallable = /*@__PURE__*/ requireIsCallable();
	var classof = /*@__PURE__*/ requireClassofRaw();
	var toString = /*@__PURE__*/ requireToString();

	var push = uncurryThis([].push);

	getJsonReplacerFunction = function (replacer) {
	  if (isCallable(replacer)) return replacer;
	  if (!isArray(replacer)) return;
	  var rawLength = replacer.length;
	  var keys = [];
	  for (var i = 0; i < rawLength; i++) {
	    var element = replacer[i];
	    if (typeof element == 'string') push(keys, element);
	    else if (typeof element == 'number' || classof(element) === 'Number' || classof(element) === 'String') push(keys, toString(element));
	  }
	  var keysLength = keys.length;
	  var root = true;
	  return function (key, value) {
	    if (root) {
	      root = false;
	      return value;
	    }
	    if (isArray(this)) return value;
	    for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value;
	  };
	};
	return getJsonReplacerFunction;
}

var hasRequiredEs_json_stringify;

function requireEs_json_stringify () {
	if (hasRequiredEs_json_stringify) return es_json_stringify;
	hasRequiredEs_json_stringify = 1;
	var $ = /*@__PURE__*/ require_export();
	var getBuiltIn = /*@__PURE__*/ requireGetBuiltIn();
	var apply = /*@__PURE__*/ requireFunctionApply();
	var call = /*@__PURE__*/ requireFunctionCall();
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var fails = /*@__PURE__*/ requireFails();
	var isCallable = /*@__PURE__*/ requireIsCallable();
	var isSymbol = /*@__PURE__*/ requireIsSymbol();
	var arraySlice = /*@__PURE__*/ requireArraySlice();
	var getReplacerFunction = /*@__PURE__*/ requireGetJsonReplacerFunction();
	var NATIVE_SYMBOL = /*@__PURE__*/ requireSymbolConstructorDetection();

	var $String = String;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var exec = uncurryThis(/./.exec);
	var charAt = uncurryThis(''.charAt);
	var charCodeAt = uncurryThis(''.charCodeAt);
	var replace = uncurryThis(''.replace);
	var numberToString = uncurryThis(1.1.toString);

	var tester = /[\uD800-\uDFFF]/g;
	var low = /^[\uD800-\uDBFF]$/;
	var hi = /^[\uDC00-\uDFFF]$/;

	var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {
	  var symbol = getBuiltIn('Symbol')('stringify detection');
	  // MS Edge converts symbol values to JSON as {}
	  return $stringify([symbol]) !== '[null]'
	    // WebKit converts symbol values to JSON as null
	    || $stringify({ a: symbol }) !== '{}'
	    // V8 throws on boxed symbols
	    || $stringify(Object(symbol)) !== '{}';
	});

	// https://github.com/tc39/proposal-well-formed-stringify
	var ILL_FORMED_UNICODE = fails(function () {
	  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
	    || $stringify('\uDEAD') !== '"\\udead"';
	});

	var stringifyWithSymbolsFix = function (it, replacer) {
	  var args = arraySlice(arguments);
	  var $replacer = getReplacerFunction(replacer);
	  if (!isCallable($replacer) && (it === undefined || isSymbol(it))) return; // IE8 returns string on undefined
	  args[1] = function (key, value) {
	    // some old implementations (like WebKit) could pass numbers as keys
	    if (isCallable($replacer)) value = call($replacer, this, $String(key), value);
	    if (!isSymbol(value)) return value;
	  };
	  return apply($stringify, null, args);
	};

	var fixIllFormed = function (match, offset, string) {
	  var prev = charAt(string, offset - 1);
	  var next = charAt(string, offset + 1);
	  if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
	    return '\\u' + numberToString(charCodeAt(match, 0), 16);
	  } return match;
	};

	if ($stringify) {
	  // `JSON.stringify` method
	  // https://tc39.es/ecma262/#sec-json.stringify
	  $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
	    // eslint-disable-next-line no-unused-vars -- required for `.length`
	    stringify: function stringify(it, replacer, space) {
	      var args = arraySlice(arguments);
	      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
	      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;
	    }
	  });
	}
	return es_json_stringify;
}

var es_object_getOwnPropertySymbols = {};

var hasRequiredEs_object_getOwnPropertySymbols;

function requireEs_object_getOwnPropertySymbols () {
	if (hasRequiredEs_object_getOwnPropertySymbols) return es_object_getOwnPropertySymbols;
	hasRequiredEs_object_getOwnPropertySymbols = 1;
	var $ = /*@__PURE__*/ require_export();
	var NATIVE_SYMBOL = /*@__PURE__*/ requireSymbolConstructorDetection();
	var fails = /*@__PURE__*/ requireFails();
	var getOwnPropertySymbolsModule = /*@__PURE__*/ requireObjectGetOwnPropertySymbols();
	var toObject = /*@__PURE__*/ requireToObject();

	// V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FORCED = !NATIVE_SYMBOL || fails(function () { getOwnPropertySymbolsModule.f(1); });

	// `Object.getOwnPropertySymbols` method
	// https://tc39.es/ecma262/#sec-object.getownpropertysymbols
	$({ target: 'Object', stat: true, forced: FORCED }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	    return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject(it)) : [];
	  }
	});
	return es_object_getOwnPropertySymbols;
}

var hasRequiredEs_symbol;

function requireEs_symbol () {
	if (hasRequiredEs_symbol) return es_symbol;
	hasRequiredEs_symbol = 1;
	// TODO: Remove this module from `core-js@4` since it's split to modules listed below
	requireEs_symbol_constructor();
	requireEs_symbol_for();
	requireEs_symbol_keyFor();
	requireEs_json_stringify();
	requireEs_object_getOwnPropertySymbols();
	return es_symbol;
}

var es_symbol_asyncDispose = {};

var hasRequiredEs_symbol_asyncDispose;

function requireEs_symbol_asyncDispose () {
	if (hasRequiredEs_symbol_asyncDispose) return es_symbol_asyncDispose;
	hasRequiredEs_symbol_asyncDispose = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.asyncDispose` well-known symbol
	// https://github.com/tc39/proposal-async-explicit-resource-management
	defineWellKnownSymbol('asyncDispose');
	return es_symbol_asyncDispose;
}

var es_symbol_asyncIterator = {};

var hasRequiredEs_symbol_asyncIterator;

function requireEs_symbol_asyncIterator () {
	if (hasRequiredEs_symbol_asyncIterator) return es_symbol_asyncIterator;
	hasRequiredEs_symbol_asyncIterator = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.asyncIterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.asynciterator
	defineWellKnownSymbol('asyncIterator');
	return es_symbol_asyncIterator;
}

var es_symbol_dispose = {};

var hasRequiredEs_symbol_dispose;

function requireEs_symbol_dispose () {
	if (hasRequiredEs_symbol_dispose) return es_symbol_dispose;
	hasRequiredEs_symbol_dispose = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.dispose` well-known symbol
	// https://github.com/tc39/proposal-explicit-resource-management
	defineWellKnownSymbol('dispose');
	return es_symbol_dispose;
}

var es_symbol_hasInstance = {};

var hasRequiredEs_symbol_hasInstance;

function requireEs_symbol_hasInstance () {
	if (hasRequiredEs_symbol_hasInstance) return es_symbol_hasInstance;
	hasRequiredEs_symbol_hasInstance = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.hasInstance` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.hasinstance
	defineWellKnownSymbol('hasInstance');
	return es_symbol_hasInstance;
}

var es_symbol_isConcatSpreadable = {};

var hasRequiredEs_symbol_isConcatSpreadable;

function requireEs_symbol_isConcatSpreadable () {
	if (hasRequiredEs_symbol_isConcatSpreadable) return es_symbol_isConcatSpreadable;
	hasRequiredEs_symbol_isConcatSpreadable = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.isConcatSpreadable` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
	defineWellKnownSymbol('isConcatSpreadable');
	return es_symbol_isConcatSpreadable;
}

var es_symbol_iterator = {};

var hasRequiredEs_symbol_iterator;

function requireEs_symbol_iterator () {
	if (hasRequiredEs_symbol_iterator) return es_symbol_iterator;
	hasRequiredEs_symbol_iterator = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.iterator` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');
	return es_symbol_iterator;
}

var es_symbol_match = {};

var hasRequiredEs_symbol_match;

function requireEs_symbol_match () {
	if (hasRequiredEs_symbol_match) return es_symbol_match;
	hasRequiredEs_symbol_match = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.match` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.match
	defineWellKnownSymbol('match');
	return es_symbol_match;
}

var es_symbol_matchAll = {};

var hasRequiredEs_symbol_matchAll;

function requireEs_symbol_matchAll () {
	if (hasRequiredEs_symbol_matchAll) return es_symbol_matchAll;
	hasRequiredEs_symbol_matchAll = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.matchAll` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.matchall
	defineWellKnownSymbol('matchAll');
	return es_symbol_matchAll;
}

var es_symbol_replace = {};

var hasRequiredEs_symbol_replace;

function requireEs_symbol_replace () {
	if (hasRequiredEs_symbol_replace) return es_symbol_replace;
	hasRequiredEs_symbol_replace = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.replace` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.replace
	defineWellKnownSymbol('replace');
	return es_symbol_replace;
}

var es_symbol_search = {};

var hasRequiredEs_symbol_search;

function requireEs_symbol_search () {
	if (hasRequiredEs_symbol_search) return es_symbol_search;
	hasRequiredEs_symbol_search = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.search` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.search
	defineWellKnownSymbol('search');
	return es_symbol_search;
}

var es_symbol_species = {};

var hasRequiredEs_symbol_species;

function requireEs_symbol_species () {
	if (hasRequiredEs_symbol_species) return es_symbol_species;
	hasRequiredEs_symbol_species = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.species` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.species
	defineWellKnownSymbol('species');
	return es_symbol_species;
}

var es_symbol_split = {};

var hasRequiredEs_symbol_split;

function requireEs_symbol_split () {
	if (hasRequiredEs_symbol_split) return es_symbol_split;
	hasRequiredEs_symbol_split = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.split` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.split
	defineWellKnownSymbol('split');
	return es_symbol_split;
}

var es_symbol_toPrimitive = {};

var hasRequiredEs_symbol_toPrimitive;

function requireEs_symbol_toPrimitive () {
	if (hasRequiredEs_symbol_toPrimitive) return es_symbol_toPrimitive;
	hasRequiredEs_symbol_toPrimitive = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();
	var defineSymbolToPrimitive = /*@__PURE__*/ requireSymbolDefineToPrimitive();

	// `Symbol.toPrimitive` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.toprimitive
	defineWellKnownSymbol('toPrimitive');

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
	defineSymbolToPrimitive();
	return es_symbol_toPrimitive;
}

var es_symbol_toStringTag = {};

var hasRequiredEs_symbol_toStringTag;

function requireEs_symbol_toStringTag () {
	if (hasRequiredEs_symbol_toStringTag) return es_symbol_toStringTag;
	hasRequiredEs_symbol_toStringTag = 1;
	var getBuiltIn = /*@__PURE__*/ requireGetBuiltIn();
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();
	var setToStringTag = /*@__PURE__*/ requireSetToStringTag();

	// `Symbol.toStringTag` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.tostringtag
	defineWellKnownSymbol('toStringTag');

	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag(getBuiltIn('Symbol'), 'Symbol');
	return es_symbol_toStringTag;
}

var es_symbol_unscopables = {};

var hasRequiredEs_symbol_unscopables;

function requireEs_symbol_unscopables () {
	if (hasRequiredEs_symbol_unscopables) return es_symbol_unscopables;
	hasRequiredEs_symbol_unscopables = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.unscopables` well-known symbol
	// https://tc39.es/ecma262/#sec-symbol.unscopables
	defineWellKnownSymbol('unscopables');
	return es_symbol_unscopables;
}

var es_json_toStringTag = {};

var hasRequiredEs_json_toStringTag;

function requireEs_json_toStringTag () {
	if (hasRequiredEs_json_toStringTag) return es_json_toStringTag;
	hasRequiredEs_json_toStringTag = 1;
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var setToStringTag = /*@__PURE__*/ requireSetToStringTag();

	// JSON[@@toStringTag] property
	// https://tc39.es/ecma262/#sec-json-@@tostringtag
	setToStringTag(globalThis.JSON, 'JSON', true);
	return es_json_toStringTag;
}

var symbol$4;
var hasRequiredSymbol$4;

function requireSymbol$4 () {
	if (hasRequiredSymbol$4) return symbol$4;
	hasRequiredSymbol$4 = 1;
	requireEs_array_concat();
	requireEs_symbol();
	requireEs_symbol_asyncDispose();
	requireEs_symbol_asyncIterator();
	requireEs_symbol_dispose();
	requireEs_symbol_hasInstance();
	requireEs_symbol_isConcatSpreadable();
	requireEs_symbol_iterator();
	requireEs_symbol_match();
	requireEs_symbol_matchAll();
	requireEs_symbol_replace();
	requireEs_symbol_search();
	requireEs_symbol_species();
	requireEs_symbol_split();
	requireEs_symbol_toPrimitive();
	requireEs_symbol_toStringTag();
	requireEs_symbol_unscopables();
	requireEs_json_toStringTag();
	var path = /*@__PURE__*/ requirePath();

	symbol$4 = path.Symbol;
	return symbol$4;
}

var web_domCollections_iterator = {};

var addToUnscopables;
var hasRequiredAddToUnscopables;

function requireAddToUnscopables () {
	if (hasRequiredAddToUnscopables) return addToUnscopables;
	hasRequiredAddToUnscopables = 1;
	addToUnscopables = function () { /* empty */ };
	return addToUnscopables;
}

var iterators;
var hasRequiredIterators;

function requireIterators () {
	if (hasRequiredIterators) return iterators;
	hasRequiredIterators = 1;
	iterators = {};
	return iterators;
}

var functionName;
var hasRequiredFunctionName;

function requireFunctionName () {
	if (hasRequiredFunctionName) return functionName;
	hasRequiredFunctionName = 1;
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();

	var FunctionPrototype = Function.prototype;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

	var EXISTS = hasOwn(FunctionPrototype, 'name');
	// additional protection from minified / mangled / dropped function names
	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
	var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

	functionName = {
	  EXISTS: EXISTS,
	  PROPER: PROPER,
	  CONFIGURABLE: CONFIGURABLE
	};
	return functionName;
}

var correctPrototypeGetter;
var hasRequiredCorrectPrototypeGetter;

function requireCorrectPrototypeGetter () {
	if (hasRequiredCorrectPrototypeGetter) return correctPrototypeGetter;
	hasRequiredCorrectPrototypeGetter = 1;
	var fails = /*@__PURE__*/ requireFails();

	correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});
	return correctPrototypeGetter;
}

var objectGetPrototypeOf;
var hasRequiredObjectGetPrototypeOf;

function requireObjectGetPrototypeOf () {
	if (hasRequiredObjectGetPrototypeOf) return objectGetPrototypeOf;
	hasRequiredObjectGetPrototypeOf = 1;
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var isCallable = /*@__PURE__*/ requireIsCallable();
	var toObject = /*@__PURE__*/ requireToObject();
	var sharedKey = /*@__PURE__*/ requireSharedKey();
	var CORRECT_PROTOTYPE_GETTER = /*@__PURE__*/ requireCorrectPrototypeGetter();

	var IE_PROTO = sharedKey('IE_PROTO');
	var $Object = Object;
	var ObjectPrototype = $Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.getprototypeof
	// eslint-disable-next-line es/no-object-getprototypeof -- safe
	objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
	  var object = toObject(O);
	  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
	  var constructor = object.constructor;
	  if (isCallable(constructor) && object instanceof constructor) {
	    return constructor.prototype;
	  } return object instanceof $Object ? ObjectPrototype : null;
	};
	return objectGetPrototypeOf;
}

var iteratorsCore;
var hasRequiredIteratorsCore;

function requireIteratorsCore () {
	if (hasRequiredIteratorsCore) return iteratorsCore;
	hasRequiredIteratorsCore = 1;
	var fails = /*@__PURE__*/ requireFails();
	var isCallable = /*@__PURE__*/ requireIsCallable();
	var isObject = /*@__PURE__*/ requireIsObject();
	var create = /*@__PURE__*/ requireObjectCreate();
	var getPrototypeOf = /*@__PURE__*/ requireObjectGetPrototypeOf();
	var defineBuiltIn = /*@__PURE__*/ requireDefineBuiltIn();
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();
	var IS_PURE = /*@__PURE__*/ requireIsPure();

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	// `%IteratorPrototype%` object
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	/* eslint-disable es/no-array-prototype-keys -- safe */
	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
	  var test = {};
	  // FF44- legacy iterators case
	  return IteratorPrototype[ITERATOR].call(test) !== test;
	});

	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
	else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

	// `%IteratorPrototype%[@@iterator]()` method
	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
	if (!isCallable(IteratorPrototype[ITERATOR])) {
	  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
	    return this;
	  });
	}

	iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};
	return iteratorsCore;
}

var iteratorCreateConstructor;
var hasRequiredIteratorCreateConstructor;

function requireIteratorCreateConstructor () {
	if (hasRequiredIteratorCreateConstructor) return iteratorCreateConstructor;
	hasRequiredIteratorCreateConstructor = 1;
	var IteratorPrototype = /*@__PURE__*/ requireIteratorsCore().IteratorPrototype;
	var create = /*@__PURE__*/ requireObjectCreate();
	var createPropertyDescriptor = /*@__PURE__*/ requireCreatePropertyDescriptor();
	var setToStringTag = /*@__PURE__*/ requireSetToStringTag();
	var Iterators = /*@__PURE__*/ requireIterators();

	var returnThis = function () { return this; };

	iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  Iterators[TO_STRING_TAG] = returnThis;
	  return IteratorConstructor;
	};
	return iteratorCreateConstructor;
}

var functionUncurryThisAccessor;
var hasRequiredFunctionUncurryThisAccessor;

function requireFunctionUncurryThisAccessor () {
	if (hasRequiredFunctionUncurryThisAccessor) return functionUncurryThisAccessor;
	hasRequiredFunctionUncurryThisAccessor = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var aCallable = /*@__PURE__*/ requireACallable();

	functionUncurryThisAccessor = function (object, key, method) {
	  try {
	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
	  } catch (error) { /* empty */ }
	};
	return functionUncurryThisAccessor;
}

var isPossiblePrototype;
var hasRequiredIsPossiblePrototype;

function requireIsPossiblePrototype () {
	if (hasRequiredIsPossiblePrototype) return isPossiblePrototype;
	hasRequiredIsPossiblePrototype = 1;
	var isObject = /*@__PURE__*/ requireIsObject();

	isPossiblePrototype = function (argument) {
	  return isObject(argument) || argument === null;
	};
	return isPossiblePrototype;
}

var aPossiblePrototype;
var hasRequiredAPossiblePrototype;

function requireAPossiblePrototype () {
	if (hasRequiredAPossiblePrototype) return aPossiblePrototype;
	hasRequiredAPossiblePrototype = 1;
	var isPossiblePrototype = /*@__PURE__*/ requireIsPossiblePrototype();

	var $String = String;
	var $TypeError = TypeError;

	aPossiblePrototype = function (argument) {
	  if (isPossiblePrototype(argument)) return argument;
	  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
	};
	return aPossiblePrototype;
}

var objectSetPrototypeOf;
var hasRequiredObjectSetPrototypeOf;

function requireObjectSetPrototypeOf () {
	if (hasRequiredObjectSetPrototypeOf) return objectSetPrototypeOf;
	hasRequiredObjectSetPrototypeOf = 1;
	/* eslint-disable no-proto -- safe */
	var uncurryThisAccessor = /*@__PURE__*/ requireFunctionUncurryThisAccessor();
	var isObject = /*@__PURE__*/ requireIsObject();
	var requireObjectCoercible = /*@__PURE__*/ requireRequireObjectCoercible();
	var aPossiblePrototype = /*@__PURE__*/ requireAPossiblePrototype();

	// `Object.setPrototypeOf` method
	// https://tc39.es/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	// eslint-disable-next-line es/no-object-setprototypeof -- safe
	objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
	    setter(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    requireObjectCoercible(O);
	    aPossiblePrototype(proto);
	    if (!isObject(O)) return O;
	    if (CORRECT_SETTER) setter(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);
	return objectSetPrototypeOf;
}

var iteratorDefine;
var hasRequiredIteratorDefine;

function requireIteratorDefine () {
	if (hasRequiredIteratorDefine) return iteratorDefine;
	hasRequiredIteratorDefine = 1;
	var $ = /*@__PURE__*/ require_export();
	var call = /*@__PURE__*/ requireFunctionCall();
	var IS_PURE = /*@__PURE__*/ requireIsPure();
	var FunctionName = /*@__PURE__*/ requireFunctionName();
	var isCallable = /*@__PURE__*/ requireIsCallable();
	var createIteratorConstructor = /*@__PURE__*/ requireIteratorCreateConstructor();
	var getPrototypeOf = /*@__PURE__*/ requireObjectGetPrototypeOf();
	var setPrototypeOf = /*@__PURE__*/ requireObjectSetPrototypeOf();
	var setToStringTag = /*@__PURE__*/ requireSetToStringTag();
	var createNonEnumerableProperty = /*@__PURE__*/ requireCreateNonEnumerableProperty();
	var defineBuiltIn = /*@__PURE__*/ requireDefineBuiltIn();
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();
	var Iterators = /*@__PURE__*/ requireIterators();
	var IteratorsCore = /*@__PURE__*/ requireIteratorsCore();

	var PROPER_FUNCTION_NAME = FunctionName.PROPER;
	var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
	var IteratorPrototype = IteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis = function () { return this; };

	iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    }

	    return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
	      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
	        if (setPrototypeOf) {
	          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
	        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
	          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
	    }
	  }

	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
	  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
	      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
	    } else {
	      INCORRECT_VALUES_NAME = true;
	      defaultIterator = function values() { return call(nativeIterator, this); };
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
	    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
	  }

	  // define iterator
	  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
	    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
	  }
	  Iterators[NAME] = defaultIterator;

	  return methods;
	};
	return iteratorDefine;
}

var createIterResultObject;
var hasRequiredCreateIterResultObject;

function requireCreateIterResultObject () {
	if (hasRequiredCreateIterResultObject) return createIterResultObject;
	hasRequiredCreateIterResultObject = 1;
	// `CreateIterResultObject` abstract operation
	// https://tc39.es/ecma262/#sec-createiterresultobject
	createIterResultObject = function (value, done) {
	  return { value: value, done: done };
	};
	return createIterResultObject;
}

var es_array_iterator;
var hasRequiredEs_array_iterator;

function requireEs_array_iterator () {
	if (hasRequiredEs_array_iterator) return es_array_iterator;
	hasRequiredEs_array_iterator = 1;
	var toIndexedObject = /*@__PURE__*/ requireToIndexedObject();
	var addToUnscopables = /*@__PURE__*/ requireAddToUnscopables();
	var Iterators = /*@__PURE__*/ requireIterators();
	var InternalStateModule = /*@__PURE__*/ requireInternalState();
	var defineProperty = /*@__PURE__*/ requireObjectDefineProperty().f;
	var defineIterator = /*@__PURE__*/ requireIteratorDefine();
	var createIterResultObject = /*@__PURE__*/ requireCreateIterResultObject();
	var IS_PURE = /*@__PURE__*/ requireIsPure();
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

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
	es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
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
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = null;
	    return createIterResultObject(undefined, true);
	  }
	  switch (state.kind) {
	    case 'keys': return createIterResultObject(index, false);
	    case 'values': return createIterResultObject(target[index], false);
	  } return createIterResultObject([index, target[index]], false);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
	var values = Iterators.Arguments = Iterators.Array;

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	// V8 ~ Chrome 45- bug
	if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
	  defineProperty(values, 'name', { value: 'values' });
	} catch (error) { /* empty */ }
	return es_array_iterator;
}

var domIterables;
var hasRequiredDomIterables;

function requireDomIterables () {
	if (hasRequiredDomIterables) return domIterables;
	hasRequiredDomIterables = 1;
	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	domIterables = {
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
	return domIterables;
}

var hasRequiredWeb_domCollections_iterator;

function requireWeb_domCollections_iterator () {
	if (hasRequiredWeb_domCollections_iterator) return web_domCollections_iterator;
	hasRequiredWeb_domCollections_iterator = 1;
	requireEs_array_iterator();
	var DOMIterables = /*@__PURE__*/ requireDomIterables();
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var setToStringTag = /*@__PURE__*/ requireSetToStringTag();
	var Iterators = /*@__PURE__*/ requireIterators();

	for (var COLLECTION_NAME in DOMIterables) {
	  setToStringTag(globalThis[COLLECTION_NAME], COLLECTION_NAME);
	  Iterators[COLLECTION_NAME] = Iterators.Array;
	}
	return web_domCollections_iterator;
}

var symbol$3;
var hasRequiredSymbol$3;

function requireSymbol$3 () {
	if (hasRequiredSymbol$3) return symbol$3;
	hasRequiredSymbol$3 = 1;
	var parent = /*@__PURE__*/ requireSymbol$4();
	requireWeb_domCollections_iterator();

	symbol$3 = parent;
	return symbol$3;
}

var esnext_function_metadata = {};

var hasRequiredEsnext_function_metadata;

function requireEsnext_function_metadata () {
	if (hasRequiredEsnext_function_metadata) return esnext_function_metadata;
	hasRequiredEsnext_function_metadata = 1;
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();
	var defineProperty = /*@__PURE__*/ requireObjectDefineProperty().f;

	var METADATA = wellKnownSymbol('metadata');
	var FunctionPrototype = Function.prototype;

	// Function.prototype[@@metadata]
	// https://github.com/tc39/proposal-decorator-metadata
	if (FunctionPrototype[METADATA] === undefined) {
	  defineProperty(FunctionPrototype, METADATA, {
	    value: null
	  });
	}
	return esnext_function_metadata;
}

var esnext_symbol_asyncDispose = {};

var hasRequiredEsnext_symbol_asyncDispose;

function requireEsnext_symbol_asyncDispose () {
	if (hasRequiredEsnext_symbol_asyncDispose) return esnext_symbol_asyncDispose;
	hasRequiredEsnext_symbol_asyncDispose = 1;
	// TODO: Remove from `core-js@4`
	requireEs_symbol_asyncDispose();
	return esnext_symbol_asyncDispose;
}

var esnext_symbol_dispose = {};

var hasRequiredEsnext_symbol_dispose;

function requireEsnext_symbol_dispose () {
	if (hasRequiredEsnext_symbol_dispose) return esnext_symbol_dispose;
	hasRequiredEsnext_symbol_dispose = 1;
	// TODO: Remove from `core-js@4`
	requireEs_symbol_dispose();
	return esnext_symbol_dispose;
}

var esnext_symbol_metadata = {};

var hasRequiredEsnext_symbol_metadata;

function requireEsnext_symbol_metadata () {
	if (hasRequiredEsnext_symbol_metadata) return esnext_symbol_metadata;
	hasRequiredEsnext_symbol_metadata = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.metadata` well-known symbol
	// https://github.com/tc39/proposal-decorators
	defineWellKnownSymbol('metadata');
	return esnext_symbol_metadata;
}

var symbol$2;
var hasRequiredSymbol$2;

function requireSymbol$2 () {
	if (hasRequiredSymbol$2) return symbol$2;
	hasRequiredSymbol$2 = 1;
	var parent = /*@__PURE__*/ requireSymbol$3();

	requireEsnext_function_metadata();
	requireEsnext_symbol_asyncDispose();
	requireEsnext_symbol_dispose();
	requireEsnext_symbol_metadata();

	symbol$2 = parent;
	return symbol$2;
}

var esnext_symbol_isRegisteredSymbol = {};

var symbolIsRegistered;
var hasRequiredSymbolIsRegistered;

function requireSymbolIsRegistered () {
	if (hasRequiredSymbolIsRegistered) return symbolIsRegistered;
	hasRequiredSymbolIsRegistered = 1;
	var getBuiltIn = /*@__PURE__*/ requireGetBuiltIn();
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();

	var Symbol = getBuiltIn('Symbol');
	var keyFor = Symbol.keyFor;
	var thisSymbolValue = uncurryThis(Symbol.prototype.valueOf);

	// `Symbol.isRegisteredSymbol` method
	// https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol
	symbolIsRegistered = Symbol.isRegisteredSymbol || function isRegisteredSymbol(value) {
	  try {
	    return keyFor(thisSymbolValue(value)) !== undefined;
	  } catch (error) {
	    return false;
	  }
	};
	return symbolIsRegistered;
}

var hasRequiredEsnext_symbol_isRegisteredSymbol;

function requireEsnext_symbol_isRegisteredSymbol () {
	if (hasRequiredEsnext_symbol_isRegisteredSymbol) return esnext_symbol_isRegisteredSymbol;
	hasRequiredEsnext_symbol_isRegisteredSymbol = 1;
	var $ = /*@__PURE__*/ require_export();
	var isRegisteredSymbol = /*@__PURE__*/ requireSymbolIsRegistered();

	// `Symbol.isRegisteredSymbol` method
	// https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol
	$({ target: 'Symbol', stat: true }, {
	  isRegisteredSymbol: isRegisteredSymbol
	});
	return esnext_symbol_isRegisteredSymbol;
}

var esnext_symbol_isWellKnownSymbol = {};

var symbolIsWellKnown;
var hasRequiredSymbolIsWellKnown;

function requireSymbolIsWellKnown () {
	if (hasRequiredSymbolIsWellKnown) return symbolIsWellKnown;
	hasRequiredSymbolIsWellKnown = 1;
	var shared = /*@__PURE__*/ requireShared();
	var getBuiltIn = /*@__PURE__*/ requireGetBuiltIn();
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var isSymbol = /*@__PURE__*/ requireIsSymbol();
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();

	var Symbol = getBuiltIn('Symbol');
	var $isWellKnownSymbol = Symbol.isWellKnownSymbol;
	var getOwnPropertyNames = getBuiltIn('Object', 'getOwnPropertyNames');
	var thisSymbolValue = uncurryThis(Symbol.prototype.valueOf);
	var WellKnownSymbolsStore = shared('wks');

	for (var i = 0, symbolKeys = getOwnPropertyNames(Symbol), symbolKeysLength = symbolKeys.length; i < symbolKeysLength; i++) {
	  // some old engines throws on access to some keys like `arguments` or `caller`
	  try {
	    var symbolKey = symbolKeys[i];
	    if (isSymbol(Symbol[symbolKey])) wellKnownSymbol(symbolKey);
	  } catch (error) { /* empty */ }
	}

	// `Symbol.isWellKnownSymbol` method
	// https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol
	// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected
	symbolIsWellKnown = function isWellKnownSymbol(value) {
	  if ($isWellKnownSymbol && $isWellKnownSymbol(value)) return true;
	  try {
	    var symbol = thisSymbolValue(value);
	    for (var j = 0, keys = getOwnPropertyNames(WellKnownSymbolsStore), keysLength = keys.length; j < keysLength; j++) {
	      // eslint-disable-next-line eqeqeq -- polyfilled symbols case
	      if (WellKnownSymbolsStore[keys[j]] == symbol) return true;
	    }
	  } catch (error) { /* empty */ }
	  return false;
	};
	return symbolIsWellKnown;
}

var hasRequiredEsnext_symbol_isWellKnownSymbol;

function requireEsnext_symbol_isWellKnownSymbol () {
	if (hasRequiredEsnext_symbol_isWellKnownSymbol) return esnext_symbol_isWellKnownSymbol;
	hasRequiredEsnext_symbol_isWellKnownSymbol = 1;
	var $ = /*@__PURE__*/ require_export();
	var isWellKnownSymbol = /*@__PURE__*/ requireSymbolIsWellKnown();

	// `Symbol.isWellKnownSymbol` method
	// https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol
	// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected
	$({ target: 'Symbol', stat: true, forced: true }, {
	  isWellKnownSymbol: isWellKnownSymbol
	});
	return esnext_symbol_isWellKnownSymbol;
}

var esnext_symbol_customMatcher = {};

var hasRequiredEsnext_symbol_customMatcher;

function requireEsnext_symbol_customMatcher () {
	if (hasRequiredEsnext_symbol_customMatcher) return esnext_symbol_customMatcher;
	hasRequiredEsnext_symbol_customMatcher = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.customMatcher` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol('customMatcher');
	return esnext_symbol_customMatcher;
}

var esnext_symbol_observable = {};

var hasRequiredEsnext_symbol_observable;

function requireEsnext_symbol_observable () {
	if (hasRequiredEsnext_symbol_observable) return esnext_symbol_observable;
	hasRequiredEsnext_symbol_observable = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.observable` well-known symbol
	// https://github.com/tc39/proposal-observable
	defineWellKnownSymbol('observable');
	return esnext_symbol_observable;
}

var esnext_symbol_isRegistered = {};

var hasRequiredEsnext_symbol_isRegistered;

function requireEsnext_symbol_isRegistered () {
	if (hasRequiredEsnext_symbol_isRegistered) return esnext_symbol_isRegistered;
	hasRequiredEsnext_symbol_isRegistered = 1;
	var $ = /*@__PURE__*/ require_export();
	var isRegisteredSymbol = /*@__PURE__*/ requireSymbolIsRegistered();

	// `Symbol.isRegistered` method
	// obsolete version of https://tc39.es/proposal-symbol-predicates/#sec-symbol-isregisteredsymbol
	$({ target: 'Symbol', stat: true, name: 'isRegisteredSymbol' }, {
	  isRegistered: isRegisteredSymbol
	});
	return esnext_symbol_isRegistered;
}

var esnext_symbol_isWellKnown = {};

var hasRequiredEsnext_symbol_isWellKnown;

function requireEsnext_symbol_isWellKnown () {
	if (hasRequiredEsnext_symbol_isWellKnown) return esnext_symbol_isWellKnown;
	hasRequiredEsnext_symbol_isWellKnown = 1;
	var $ = /*@__PURE__*/ require_export();
	var isWellKnownSymbol = /*@__PURE__*/ requireSymbolIsWellKnown();

	// `Symbol.isWellKnown` method
	// obsolete version of https://tc39.es/proposal-symbol-predicates/#sec-symbol-iswellknownsymbol
	// We should patch it for newly added well-known symbols. If it's not required, this module just will not be injected
	$({ target: 'Symbol', stat: true, name: 'isWellKnownSymbol', forced: true }, {
	  isWellKnown: isWellKnownSymbol
	});
	return esnext_symbol_isWellKnown;
}

var esnext_symbol_matcher = {};

var hasRequiredEsnext_symbol_matcher;

function requireEsnext_symbol_matcher () {
	if (hasRequiredEsnext_symbol_matcher) return esnext_symbol_matcher;
	hasRequiredEsnext_symbol_matcher = 1;
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.matcher` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol('matcher');
	return esnext_symbol_matcher;
}

var esnext_symbol_metadataKey = {};

var hasRequiredEsnext_symbol_metadataKey;

function requireEsnext_symbol_metadataKey () {
	if (hasRequiredEsnext_symbol_metadataKey) return esnext_symbol_metadataKey;
	hasRequiredEsnext_symbol_metadataKey = 1;
	// TODO: Remove from `core-js@4`
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.metadataKey` well-known symbol
	// https://github.com/tc39/proposal-decorator-metadata
	defineWellKnownSymbol('metadataKey');
	return esnext_symbol_metadataKey;
}

var esnext_symbol_patternMatch = {};

var hasRequiredEsnext_symbol_patternMatch;

function requireEsnext_symbol_patternMatch () {
	if (hasRequiredEsnext_symbol_patternMatch) return esnext_symbol_patternMatch;
	hasRequiredEsnext_symbol_patternMatch = 1;
	// TODO: remove from `core-js@4`
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	// `Symbol.patternMatch` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol('patternMatch');
	return esnext_symbol_patternMatch;
}

var esnext_symbol_replaceAll = {};

var hasRequiredEsnext_symbol_replaceAll;

function requireEsnext_symbol_replaceAll () {
	if (hasRequiredEsnext_symbol_replaceAll) return esnext_symbol_replaceAll;
	hasRequiredEsnext_symbol_replaceAll = 1;
	// TODO: remove from `core-js@4`
	var defineWellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbolDefine();

	defineWellKnownSymbol('replaceAll');
	return esnext_symbol_replaceAll;
}

var symbol$1;
var hasRequiredSymbol$1;

function requireSymbol$1 () {
	if (hasRequiredSymbol$1) return symbol$1;
	hasRequiredSymbol$1 = 1;
	var parent = /*@__PURE__*/ requireSymbol$2();
	requireEsnext_symbol_isRegisteredSymbol();
	requireEsnext_symbol_isWellKnownSymbol();
	requireEsnext_symbol_customMatcher();
	requireEsnext_symbol_observable();
	// TODO: Remove from `core-js@4`
	requireEsnext_symbol_isRegistered();
	requireEsnext_symbol_isWellKnown();
	requireEsnext_symbol_matcher();
	requireEsnext_symbol_metadataKey();
	requireEsnext_symbol_patternMatch();
	requireEsnext_symbol_replaceAll();

	symbol$1 = parent;
	return symbol$1;
}

var symbol;
var hasRequiredSymbol;

function requireSymbol () {
	if (hasRequiredSymbol) return symbol;
	hasRequiredSymbol = 1;
	symbol = /*@__PURE__*/ requireSymbol$1();
	return symbol;
}

var symbolExports = /*@__PURE__*/ requireSymbol();
var _Symbol = /*@__PURE__*/getDefaultExportFromCjs(symbolExports);

var es_string_iterator = {};

var stringMultibyte;
var hasRequiredStringMultibyte;

function requireStringMultibyte () {
	if (hasRequiredStringMultibyte) return stringMultibyte;
	hasRequiredStringMultibyte = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var toIntegerOrInfinity = /*@__PURE__*/ requireToIntegerOrInfinity();
	var toString = /*@__PURE__*/ requireToString();
	var requireObjectCoercible = /*@__PURE__*/ requireRequireObjectCoercible();

	var charAt = uncurryThis(''.charAt);
	var charCodeAt = uncurryThis(''.charCodeAt);
	var stringSlice = uncurryThis(''.slice);

	var createMethod = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = toString(requireObjectCoercible($this));
	    var position = toIntegerOrInfinity(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = charCodeAt(S, position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING
	          ? charAt(S, position)
	          : first
	        : CONVERT_TO_STRING
	          ? stringSlice(S, position, position + 2)
	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod(true)
	};
	return stringMultibyte;
}

var hasRequiredEs_string_iterator;

function requireEs_string_iterator () {
	if (hasRequiredEs_string_iterator) return es_string_iterator;
	hasRequiredEs_string_iterator = 1;
	var charAt = /*@__PURE__*/ requireStringMultibyte().charAt;
	var toString = /*@__PURE__*/ requireToString();
	var InternalStateModule = /*@__PURE__*/ requireInternalState();
	var defineIterator = /*@__PURE__*/ requireIteratorDefine();
	var createIterResultObject = /*@__PURE__*/ requireCreateIterResultObject();

	var STRING_ITERATOR = 'String Iterator';
	var setInternalState = InternalStateModule.set;
	var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState(this, {
	    type: STRING_ITERATOR,
	    string: toString(iterated),
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
	return es_string_iterator;
}

var iterator$5;
var hasRequiredIterator$5;

function requireIterator$5 () {
	if (hasRequiredIterator$5) return iterator$5;
	hasRequiredIterator$5 = 1;
	requireEs_array_iterator();
	requireEs_string_iterator();
	requireEs_symbol_iterator();
	var WrappedWellKnownSymbolModule = /*@__PURE__*/ requireWellKnownSymbolWrapped();

	iterator$5 = WrappedWellKnownSymbolModule.f('iterator');
	return iterator$5;
}

var iterator$4;
var hasRequiredIterator$4;

function requireIterator$4 () {
	if (hasRequiredIterator$4) return iterator$4;
	hasRequiredIterator$4 = 1;
	var parent = /*@__PURE__*/ requireIterator$5();
	requireWeb_domCollections_iterator();

	iterator$4 = parent;
	return iterator$4;
}

var iterator$3;
var hasRequiredIterator$3;

function requireIterator$3 () {
	if (hasRequiredIterator$3) return iterator$3;
	hasRequiredIterator$3 = 1;
	var parent = /*@__PURE__*/ requireIterator$4();

	iterator$3 = parent;
	return iterator$3;
}

var iterator$2;
var hasRequiredIterator$2;

function requireIterator$2 () {
	if (hasRequiredIterator$2) return iterator$2;
	hasRequiredIterator$2 = 1;
	var parent = /*@__PURE__*/ requireIterator$3();

	iterator$2 = parent;
	return iterator$2;
}

var iterator$1;
var hasRequiredIterator$1;

function requireIterator$1 () {
	if (hasRequiredIterator$1) return iterator$1;
	hasRequiredIterator$1 = 1;
	iterator$1 = /*@__PURE__*/ requireIterator$2();
	return iterator$1;
}

var iteratorExports$1 = /*@__PURE__*/ requireIterator$1();
var _Symbol$iterator$1 = /*@__PURE__*/getDefaultExportFromCjs(iteratorExports$1);

function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof _Symbol && "symbol" == typeof _Symbol$iterator$1 ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof _Symbol && o.constructor === _Symbol && o !== _Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

var toPrimitive$5;
var hasRequiredToPrimitive$4;

function requireToPrimitive$4 () {
	if (hasRequiredToPrimitive$4) return toPrimitive$5;
	hasRequiredToPrimitive$4 = 1;
	requireEs_symbol_toPrimitive();
	var WrappedWellKnownSymbolModule = /*@__PURE__*/ requireWellKnownSymbolWrapped();

	toPrimitive$5 = WrappedWellKnownSymbolModule.f('toPrimitive');
	return toPrimitive$5;
}

var toPrimitive$4;
var hasRequiredToPrimitive$3;

function requireToPrimitive$3 () {
	if (hasRequiredToPrimitive$3) return toPrimitive$4;
	hasRequiredToPrimitive$3 = 1;
	var parent = /*@__PURE__*/ requireToPrimitive$4();

	toPrimitive$4 = parent;
	return toPrimitive$4;
}

var toPrimitive$3;
var hasRequiredToPrimitive$2;

function requireToPrimitive$2 () {
	if (hasRequiredToPrimitive$2) return toPrimitive$3;
	hasRequiredToPrimitive$2 = 1;
	var parent = /*@__PURE__*/ requireToPrimitive$3();

	toPrimitive$3 = parent;
	return toPrimitive$3;
}

var toPrimitive$2;
var hasRequiredToPrimitive$1;

function requireToPrimitive$1 () {
	if (hasRequiredToPrimitive$1) return toPrimitive$2;
	hasRequiredToPrimitive$1 = 1;
	var parent = /*@__PURE__*/ requireToPrimitive$2();

	toPrimitive$2 = parent;
	return toPrimitive$2;
}

var toPrimitive$1;
var hasRequiredToPrimitive;

function requireToPrimitive () {
	if (hasRequiredToPrimitive) return toPrimitive$1;
	hasRequiredToPrimitive = 1;
	toPrimitive$1 = /*@__PURE__*/ requireToPrimitive$1();
	return toPrimitive$1;
}

var toPrimitiveExports = /*@__PURE__*/ requireToPrimitive();
var _Symbol$toPrimitive = /*@__PURE__*/getDefaultExportFromCjs(toPrimitiveExports);

function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[_Symbol$toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}

function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? _Object$defineProperty$1(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}

var es_function_bind = {};

var functionBind;
var hasRequiredFunctionBind;

function requireFunctionBind () {
	if (hasRequiredFunctionBind) return functionBind;
	hasRequiredFunctionBind = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var aCallable = /*@__PURE__*/ requireACallable();
	var isObject = /*@__PURE__*/ requireIsObject();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var arraySlice = /*@__PURE__*/ requireArraySlice();
	var NATIVE_BIND = /*@__PURE__*/ requireFunctionBindNative();

	var $Function = Function;
	var concat = uncurryThis([].concat);
	var join = uncurryThis([].join);
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!hasOwn(factories, argsLength)) {
	    var list = [];
	    var i = 0;
	    for (; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	// eslint-disable-next-line es/no-function-prototype-bind -- detection
	functionBind = NATIVE_BIND ? $Function.bind : function bind(that /* , ...args */) {
	  var F = aCallable(this);
	  var Prototype = F.prototype;
	  var partArgs = arraySlice(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = concat(partArgs, arraySlice(arguments));
	    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
	  };
	  if (isObject(Prototype)) boundFunction.prototype = Prototype;
	  return boundFunction;
	};
	return functionBind;
}

var hasRequiredEs_function_bind;

function requireEs_function_bind () {
	if (hasRequiredEs_function_bind) return es_function_bind;
	hasRequiredEs_function_bind = 1;
	// TODO: Remove from `core-js@4`
	var $ = /*@__PURE__*/ require_export();
	var bind = /*@__PURE__*/ requireFunctionBind();

	// `Function.prototype.bind` method
	// https://tc39.es/ecma262/#sec-function.prototype.bind
	// eslint-disable-next-line es/no-function-prototype-bind -- detection
	$({ target: 'Function', proto: true, forced: Function.bind !== bind }, {
	  bind: bind
	});
	return es_function_bind;
}

var getBuiltInPrototypeMethod;
var hasRequiredGetBuiltInPrototypeMethod;

function requireGetBuiltInPrototypeMethod () {
	if (hasRequiredGetBuiltInPrototypeMethod) return getBuiltInPrototypeMethod;
	hasRequiredGetBuiltInPrototypeMethod = 1;
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var path = /*@__PURE__*/ requirePath();

	getBuiltInPrototypeMethod = function (CONSTRUCTOR, METHOD) {
	  var Namespace = path[CONSTRUCTOR + 'Prototype'];
	  var pureMethod = Namespace && Namespace[METHOD];
	  if (pureMethod) return pureMethod;
	  var NativeConstructor = globalThis[CONSTRUCTOR];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  return NativePrototype && NativePrototype[METHOD];
	};
	return getBuiltInPrototypeMethod;
}

var bind$3;
var hasRequiredBind$3;

function requireBind$3 () {
	if (hasRequiredBind$3) return bind$3;
	hasRequiredBind$3 = 1;
	requireEs_function_bind();
	var getBuiltInPrototypeMethod = /*@__PURE__*/ requireGetBuiltInPrototypeMethod();

	bind$3 = getBuiltInPrototypeMethod('Function', 'bind');
	return bind$3;
}

var bind$2;
var hasRequiredBind$2;

function requireBind$2 () {
	if (hasRequiredBind$2) return bind$2;
	hasRequiredBind$2 = 1;
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var method = /*@__PURE__*/ requireBind$3();

	var FunctionPrototype = Function.prototype;

	bind$2 = function (it) {
	  var own = it.bind;
	  return it === FunctionPrototype || (isPrototypeOf(FunctionPrototype, it) && own === FunctionPrototype.bind) ? method : own;
	};
	return bind$2;
}

var bind$1;
var hasRequiredBind$1;

function requireBind$1 () {
	if (hasRequiredBind$1) return bind$1;
	hasRequiredBind$1 = 1;
	var parent = /*@__PURE__*/ requireBind$2();

	bind$1 = parent;
	return bind$1;
}

var bind;
var hasRequiredBind;

function requireBind () {
	if (hasRequiredBind) return bind;
	hasRequiredBind = 1;
	bind = /*@__PURE__*/ requireBind$1();
	return bind;
}

var bindExports = requireBind();
var _bindInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(bindExports);

var es_array_reduce = {};

var arrayReduce;
var hasRequiredArrayReduce;

function requireArrayReduce () {
	if (hasRequiredArrayReduce) return arrayReduce;
	hasRequiredArrayReduce = 1;
	var aCallable = /*@__PURE__*/ requireACallable();
	var toObject = /*@__PURE__*/ requireToObject();
	var IndexedObject = /*@__PURE__*/ requireIndexedObject();
	var lengthOfArrayLike = /*@__PURE__*/ requireLengthOfArrayLike();

	var $TypeError = TypeError;

	var REDUCE_EMPTY = 'Reduce of empty array with no initial value';

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    var O = toObject(that);
	    var self = IndexedObject(O);
	    var length = lengthOfArrayLike(O);
	    aCallable(callbackfn);
	    if (length === 0 && argumentsLength < 2) throw new $TypeError(REDUCE_EMPTY);
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
	        throw new $TypeError(REDUCE_EMPTY);
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduce
	  left: createMethod(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
	  right: createMethod(true)
	};
	return arrayReduce;
}

var arrayMethodIsStrict;
var hasRequiredArrayMethodIsStrict;

function requireArrayMethodIsStrict () {
	if (hasRequiredArrayMethodIsStrict) return arrayMethodIsStrict;
	hasRequiredArrayMethodIsStrict = 1;
	var fails = /*@__PURE__*/ requireFails();

	arrayMethodIsStrict = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !!method && fails(function () {
	    // eslint-disable-next-line no-useless-call -- required for testing
	    method.call(null, argument || function () { return 1; }, 1);
	  });
	};
	return arrayMethodIsStrict;
}

var environment;
var hasRequiredEnvironment;

function requireEnvironment () {
	if (hasRequiredEnvironment) return environment;
	hasRequiredEnvironment = 1;
	/* global Bun, Deno -- detection */
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var userAgent = /*@__PURE__*/ requireEnvironmentUserAgent();
	var classof = /*@__PURE__*/ requireClassofRaw();

	var userAgentStartsWith = function (string) {
	  return userAgent.slice(0, string.length) === string;
	};

	environment = (function () {
	  if (userAgentStartsWith('Bun/')) return 'BUN';
	  if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
	  if (userAgentStartsWith('Deno/')) return 'DENO';
	  if (userAgentStartsWith('Node.js/')) return 'NODE';
	  if (globalThis.Bun && typeof Bun.version == 'string') return 'BUN';
	  if (globalThis.Deno && typeof Deno.version == 'object') return 'DENO';
	  if (classof(globalThis.process) === 'process') return 'NODE';
	  if (globalThis.window && globalThis.document) return 'BROWSER';
	  return 'REST';
	})();
	return environment;
}

var environmentIsNode;
var hasRequiredEnvironmentIsNode;

function requireEnvironmentIsNode () {
	if (hasRequiredEnvironmentIsNode) return environmentIsNode;
	hasRequiredEnvironmentIsNode = 1;
	var ENVIRONMENT = /*@__PURE__*/ requireEnvironment();

	environmentIsNode = ENVIRONMENT === 'NODE';
	return environmentIsNode;
}

var hasRequiredEs_array_reduce;

function requireEs_array_reduce () {
	if (hasRequiredEs_array_reduce) return es_array_reduce;
	hasRequiredEs_array_reduce = 1;
	var $ = /*@__PURE__*/ require_export();
	var $reduce = /*@__PURE__*/ requireArrayReduce().left;
	var arrayMethodIsStrict = /*@__PURE__*/ requireArrayMethodIsStrict();
	var CHROME_VERSION = /*@__PURE__*/ requireEnvironmentV8Version();
	var IS_NODE = /*@__PURE__*/ requireEnvironmentIsNode();

	// Chrome 80-82 has a critical bug
	// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
	var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
	var FORCED = CHROME_BUG || !arrayMethodIsStrict('reduce');

	// `Array.prototype.reduce` method
	// https://tc39.es/ecma262/#sec-array.prototype.reduce
	$({ target: 'Array', proto: true, forced: FORCED }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    var length = arguments.length;
	    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
	  }
	});
	return es_array_reduce;
}

var reduce$3;
var hasRequiredReduce$3;

function requireReduce$3 () {
	if (hasRequiredReduce$3) return reduce$3;
	hasRequiredReduce$3 = 1;
	requireEs_array_reduce();
	var getBuiltInPrototypeMethod = /*@__PURE__*/ requireGetBuiltInPrototypeMethod();

	reduce$3 = getBuiltInPrototypeMethod('Array', 'reduce');
	return reduce$3;
}

var reduce$2;
var hasRequiredReduce$2;

function requireReduce$2 () {
	if (hasRequiredReduce$2) return reduce$2;
	hasRequiredReduce$2 = 1;
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var method = /*@__PURE__*/ requireReduce$3();

	var ArrayPrototype = Array.prototype;

	reduce$2 = function (it) {
	  var own = it.reduce;
	  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.reduce) ? method : own;
	};
	return reduce$2;
}

var reduce$1;
var hasRequiredReduce$1;

function requireReduce$1 () {
	if (hasRequiredReduce$1) return reduce$1;
	hasRequiredReduce$1 = 1;
	var parent = /*@__PURE__*/ requireReduce$2();

	reduce$1 = parent;
	return reduce$1;
}

var reduce;
var hasRequiredReduce;

function requireReduce () {
	if (hasRequiredReduce) return reduce;
	hasRequiredReduce = 1;
	reduce = /*@__PURE__*/ requireReduce$1();
	return reduce;
}

var reduceExports = requireReduce();
var _reduceInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(reduceExports);

var es_array_filter = {};

var hasRequiredEs_array_filter;

function requireEs_array_filter () {
	if (hasRequiredEs_array_filter) return es_array_filter;
	hasRequiredEs_array_filter = 1;
	var $ = /*@__PURE__*/ require_export();
	var $filter = /*@__PURE__*/ requireArrayIteration().filter;
	var arrayMethodHasSpeciesSupport = /*@__PURE__*/ requireArrayMethodHasSpeciesSupport();

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

	// `Array.prototype.filter` method
	// https://tc39.es/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	return es_array_filter;
}

var filter$3;
var hasRequiredFilter$3;

function requireFilter$3 () {
	if (hasRequiredFilter$3) return filter$3;
	hasRequiredFilter$3 = 1;
	requireEs_array_filter();
	var getBuiltInPrototypeMethod = /*@__PURE__*/ requireGetBuiltInPrototypeMethod();

	filter$3 = getBuiltInPrototypeMethod('Array', 'filter');
	return filter$3;
}

var filter$2;
var hasRequiredFilter$2;

function requireFilter$2 () {
	if (hasRequiredFilter$2) return filter$2;
	hasRequiredFilter$2 = 1;
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var method = /*@__PURE__*/ requireFilter$3();

	var ArrayPrototype = Array.prototype;

	filter$2 = function (it) {
	  var own = it.filter;
	  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.filter) ? method : own;
	};
	return filter$2;
}

var filter$1;
var hasRequiredFilter$1;

function requireFilter$1 () {
	if (hasRequiredFilter$1) return filter$1;
	hasRequiredFilter$1 = 1;
	var parent = /*@__PURE__*/ requireFilter$2();

	filter$1 = parent;
	return filter$1;
}

var filter;
var hasRequiredFilter;

function requireFilter () {
	if (hasRequiredFilter) return filter;
	hasRequiredFilter = 1;
	filter = /*@__PURE__*/ requireFilter$1();
	return filter;
}

var filterExports = requireFilter();
var _filterInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(filterExports);

var es_array_map = {};

var hasRequiredEs_array_map;

function requireEs_array_map () {
	if (hasRequiredEs_array_map) return es_array_map;
	hasRequiredEs_array_map = 1;
	var $ = /*@__PURE__*/ require_export();
	var $map = /*@__PURE__*/ requireArrayIteration().map;
	var arrayMethodHasSpeciesSupport = /*@__PURE__*/ requireArrayMethodHasSpeciesSupport();

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

	// `Array.prototype.map` method
	// https://tc39.es/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	return es_array_map;
}

var map$6;
var hasRequiredMap$6;

function requireMap$6 () {
	if (hasRequiredMap$6) return map$6;
	hasRequiredMap$6 = 1;
	requireEs_array_map();
	var getBuiltInPrototypeMethod = /*@__PURE__*/ requireGetBuiltInPrototypeMethod();

	map$6 = getBuiltInPrototypeMethod('Array', 'map');
	return map$6;
}

var map$5;
var hasRequiredMap$5;

function requireMap$5 () {
	if (hasRequiredMap$5) return map$5;
	hasRequiredMap$5 = 1;
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var method = /*@__PURE__*/ requireMap$6();

	var ArrayPrototype = Array.prototype;

	map$5 = function (it) {
	  var own = it.map;
	  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.map) ? method : own;
	};
	return map$5;
}

var map$4;
var hasRequiredMap$4;

function requireMap$4 () {
	if (hasRequiredMap$4) return map$4;
	hasRequiredMap$4 = 1;
	var parent = /*@__PURE__*/ requireMap$5();

	map$4 = parent;
	return map$4;
}

var map$3;
var hasRequiredMap$3;

function requireMap$3 () {
	if (hasRequiredMap$3) return map$3;
	hasRequiredMap$3 = 1;
	map$3 = /*@__PURE__*/ requireMap$4();
	return map$3;
}

var mapExports$1 = requireMap$3();
var _mapInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(mapExports$1);

var es_array_flatMap = {};

var flattenIntoArray_1;
var hasRequiredFlattenIntoArray;

function requireFlattenIntoArray () {
	if (hasRequiredFlattenIntoArray) return flattenIntoArray_1;
	hasRequiredFlattenIntoArray = 1;
	var isArray = /*@__PURE__*/ requireIsArray$3();
	var lengthOfArrayLike = /*@__PURE__*/ requireLengthOfArrayLike();
	var doesNotExceedSafeInteger = /*@__PURE__*/ requireDoesNotExceedSafeInteger();
	var bind = /*@__PURE__*/ requireFunctionBindContext();

	// `FlattenIntoArray` abstract operation
	// https://tc39.es/ecma262/#sec-flattenintoarray
	var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
	  var targetIndex = start;
	  var sourceIndex = 0;
	  var mapFn = mapper ? bind(mapper, thisArg) : false;
	  var element, elementLen;

	  while (sourceIndex < sourceLen) {
	    if (sourceIndex in source) {
	      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

	      if (depth > 0 && isArray(element)) {
	        elementLen = lengthOfArrayLike(element);
	        targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
	      } else {
	        doesNotExceedSafeInteger(targetIndex + 1);
	        target[targetIndex] = element;
	      }

	      targetIndex++;
	    }
	    sourceIndex++;
	  }
	  return targetIndex;
	};

	flattenIntoArray_1 = flattenIntoArray;
	return flattenIntoArray_1;
}

var hasRequiredEs_array_flatMap;

function requireEs_array_flatMap () {
	if (hasRequiredEs_array_flatMap) return es_array_flatMap;
	hasRequiredEs_array_flatMap = 1;
	var $ = /*@__PURE__*/ require_export();
	var flattenIntoArray = /*@__PURE__*/ requireFlattenIntoArray();
	var aCallable = /*@__PURE__*/ requireACallable();
	var toObject = /*@__PURE__*/ requireToObject();
	var lengthOfArrayLike = /*@__PURE__*/ requireLengthOfArrayLike();
	var arraySpeciesCreate = /*@__PURE__*/ requireArraySpeciesCreate();

	// `Array.prototype.flatMap` method
	// https://tc39.es/ecma262/#sec-array.prototype.flatmap
	$({ target: 'Array', proto: true }, {
	  flatMap: function flatMap(callbackfn /* , thisArg */) {
	    var O = toObject(this);
	    var sourceLen = lengthOfArrayLike(O);
	    var A;
	    aCallable(callbackfn);
	    A = arraySpeciesCreate(O, 0);
	    A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    return A;
	  }
	});
	return es_array_flatMap;
}

var es_array_unscopables_flatMap = {};

var hasRequiredEs_array_unscopables_flatMap;

function requireEs_array_unscopables_flatMap () {
	if (hasRequiredEs_array_unscopables_flatMap) return es_array_unscopables_flatMap;
	hasRequiredEs_array_unscopables_flatMap = 1;
	// this method was added to unscopables after implementation
	// in popular engines, so it's moved to a separate module
	var addToUnscopables = /*@__PURE__*/ requireAddToUnscopables();

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('flatMap');
	return es_array_unscopables_flatMap;
}

var flatMap$3;
var hasRequiredFlatMap$3;

function requireFlatMap$3 () {
	if (hasRequiredFlatMap$3) return flatMap$3;
	hasRequiredFlatMap$3 = 1;
	requireEs_array_flatMap();
	requireEs_array_unscopables_flatMap();
	var getBuiltInPrototypeMethod = /*@__PURE__*/ requireGetBuiltInPrototypeMethod();

	flatMap$3 = getBuiltInPrototypeMethod('Array', 'flatMap');
	return flatMap$3;
}

var flatMap$2;
var hasRequiredFlatMap$2;

function requireFlatMap$2 () {
	if (hasRequiredFlatMap$2) return flatMap$2;
	hasRequiredFlatMap$2 = 1;
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var method = /*@__PURE__*/ requireFlatMap$3();

	var ArrayPrototype = Array.prototype;

	flatMap$2 = function (it) {
	  var own = it.flatMap;
	  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.flatMap) ? method : own;
	};
	return flatMap$2;
}

var flatMap$1;
var hasRequiredFlatMap$1;

function requireFlatMap$1 () {
	if (hasRequiredFlatMap$1) return flatMap$1;
	hasRequiredFlatMap$1 = 1;
	var parent = /*@__PURE__*/ requireFlatMap$2();

	flatMap$1 = parent;
	return flatMap$1;
}

var flatMap;
var hasRequiredFlatMap;

function requireFlatMap () {
	if (hasRequiredFlatMap) return flatMap;
	hasRequiredFlatMap = 1;
	flatMap = /*@__PURE__*/ requireFlatMap$1();
	return flatMap;
}

var flatMapExports = requireFlatMap();
var _flatMapInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(flatMapExports);

/**
 * Create new data pipe.
 * @param from - The source data set or data view.
 * @remarks
 * Example usage:
 * ```typescript
 * interface AppItem {
 *   whoami: string;
 *   appData: unknown;
 *   visData: VisItem;
 * }
 * interface VisItem {
 *   id: number;
 *   label: string;
 *   color: string;
 *   x: number;
 *   y: number;
 * }
 *
 * const ds1 = new DataSet<AppItem, "whoami">([], { fieldId: "whoami" });
 * const ds2 = new DataSet<VisItem, "id">();
 *
 * const pipe = createNewDataPipeFrom(ds1)
 *   .filter((item): boolean => item.enabled === true)
 *   .map<VisItem, "id">((item): VisItem => item.visData)
 *   .to(ds2);
 *
 * pipe.start();
 * ```
 * @returns A factory whose methods can be used to configure the pipe.
 */
function createNewDataPipeFrom(from) {
  return new DataPipeUnderConstruction(from);
}
/**
 * Internal implementation of the pipe. This should be accessible only through
 * `createNewDataPipeFrom` from the outside.
 * @typeParam SI - Source item type.
 * @typeParam SP - Source item type's id property name.
 * @typeParam TI - Target item type.
 * @typeParam TP - Target item type's id property name.
 */
class SimpleDataPipe {
  /**
   * Create a new data pipe.
   * @param source - The data set or data view that will be observed.
   * @param transformers - An array of transforming functions to be used to
   * filter or transform the items in the pipe.
   * @param target - The data set or data view that will receive the items.
   */
  constructor(source, transformers, target) {
    var _context, _context2, _context3;
    /**
     * Bound listeners for use with `DataInterface['on' | 'off']`.
     */
    _defineProperty(this, "_listeners", {
      add: _bindInstanceProperty(_context = this._add).call(_context, this),
      remove: _bindInstanceProperty(_context2 = this._remove).call(_context2, this),
      update: _bindInstanceProperty(_context3 = this._update).call(_context3, this)
    });
    this._source = source;
    this._transformers = transformers;
    this._target = target;
  }
  /** @inheritDoc */
  all() {
    this._target.update(this._transformItems(this._source.get()));
    return this;
  }
  /** @inheritDoc */
  start() {
    this._source.on("add", this._listeners.add);
    this._source.on("remove", this._listeners.remove);
    this._source.on("update", this._listeners.update);
    return this;
  }
  /** @inheritDoc */
  stop() {
    this._source.off("add", this._listeners.add);
    this._source.off("remove", this._listeners.remove);
    this._source.off("update", this._listeners.update);
    return this;
  }
  /**
   * Apply the transformers to the items.
   * @param items - The items to be transformed.
   * @returns The transformed items.
   */
  _transformItems(items) {
    var _context4;
    return _reduceInstanceProperty(_context4 = this._transformers).call(_context4, (items, transform) => {
      return transform(items);
    }, items);
  }
  /**
   * Handle an add event.
   * @param _name - Ignored.
   * @param payload - The payload containing the ids of the added items.
   */
  _add(_name, payload) {
    if (payload == null) {
      return;
    }
    this._target.add(this._transformItems(this._source.get(payload.items)));
  }
  /**
   * Handle an update event.
   * @param _name - Ignored.
   * @param payload - The payload containing the ids of the updated items.
   */
  _update(_name, payload) {
    if (payload == null) {
      return;
    }
    this._target.update(this._transformItems(this._source.get(payload.items)));
  }
  /**
   * Handle a remove event.
   * @param _name - Ignored.
   * @param payload - The payload containing the data of the removed items.
   */
  _remove(_name, payload) {
    if (payload == null) {
      return;
    }
    this._target.remove(this._transformItems(payload.oldData));
  }
}
/**
 * Internal implementation of the pipe factory. This should be accessible
 * only through `createNewDataPipeFrom` from the outside.
 * @typeParam TI - Target item type.
 * @typeParam TP - Target item type's id property name.
 */
class DataPipeUnderConstruction {
  /**
   * Create a new data pipe factory. This is an internal constructor that
   * should never be called from outside of this file.
   * @param source - The source data set or data view for this pipe.
   */
  constructor(source) {
    /**
     * Array transformers used to transform items within the pipe. This is typed
     * as any for the sake of simplicity.
     */
    _defineProperty(this, "_transformers", []);
    this._source = source;
  }
  /**
   * Filter the items.
   * @param callback - A filtering function that returns true if given item
   * should be piped and false if not.
   * @returns This factory for further configuration.
   */
  filter(callback) {
    this._transformers.push(input => _filterInstanceProperty(input).call(input, callback));
    return this;
  }
  /**
   * Map each source item to a new type.
   * @param callback - A mapping function that takes a source item and returns
   * corresponding mapped item.
   * @typeParam TI - Target item type.
   * @typeParam TP - Target item type's id property name.
   * @returns This factory for further configuration.
   */
  map(callback) {
    this._transformers.push(input => _mapInstanceProperty(input).call(input, callback));
    return this;
  }
  /**
   * Map each source item to zero or more items of a new type.
   * @param callback - A mapping function that takes a source item and returns
   * an array of corresponding mapped items.
   * @typeParam TI - Target item type.
   * @typeParam TP - Target item type's id property name.
   * @returns This factory for further configuration.
   */
  flatMap(callback) {
    this._transformers.push(input => _flatMapInstanceProperty(input).call(input, callback));
    return this;
  }
  /**
   * Connect this pipe to given data set.
   * @param target - The data set that will receive the items from this pipe.
   * @returns The pipe connected between given data sets and performing
   * configured transformation on the processed items.
   */
  to(target) {
    return new SimpleDataPipe(this._source, this._transformers, target);
  }
}

var componentEmitter = {exports: {}};

var hasRequiredComponentEmitter;

function requireComponentEmitter () {
	if (hasRequiredComponentEmitter) return componentEmitter.exports;
	hasRequiredComponentEmitter = 1;
	(function (module) {
		function Emitter(object) {
			if (object) {
				return mixin(object);
			}

			this._callbacks = new Map();
		}

		function mixin(object) {
			Object.assign(object, Emitter.prototype);
			object._callbacks = new Map();
			return object;
		}

		Emitter.prototype.on = function (event, listener) {
			const callbacks = this._callbacks.get(event) ?? [];
			callbacks.push(listener);
			this._callbacks.set(event, callbacks);
			return this;
		};

		Emitter.prototype.once = function (event, listener) {
			const on = (...arguments_) => {
				this.off(event, on);
				listener.apply(this, arguments_);
			};

			on.fn = listener;
			this.on(event, on);
			return this;
		};

		Emitter.prototype.off = function (event, listener) {
			if (event === undefined && listener === undefined) {
				this._callbacks.clear();
				return this;
			}

			if (listener === undefined) {
				this._callbacks.delete(event);
				return this;
			}

			const callbacks = this._callbacks.get(event);
			if (callbacks) {
				for (const [index, callback] of callbacks.entries()) {
					if (callback === listener || callback.fn === listener) {
						callbacks.splice(index, 1);
						break;
					}
				}

				if (callbacks.length === 0) {
					this._callbacks.delete(event);
				} else {
					this._callbacks.set(event, callbacks);
				}
			}

			return this;
		};

		Emitter.prototype.emit = function (event, ...arguments_) {
			const callbacks = this._callbacks.get(event);
			if (callbacks) {
				// Create a copy of the callbacks array to avoid issues if it's modified during iteration
				const callbacksCopy = [...callbacks];

				for (const callback of callbacksCopy) {
					callback.apply(this, arguments_);
				}
			}

			return this;
		};

		Emitter.prototype.listeners = function (event) {
			return this._callbacks.get(event) ?? [];
		};

		Emitter.prototype.listenerCount = function (event) {
			if (event) {
				return this.listeners(event).length;
			}

			let totalCount = 0;
			for (const callbacks of this._callbacks.values()) {
				totalCount += callbacks.length;
			}

			return totalCount;
		};

		Emitter.prototype.hasListeners = function (event) {
			return this.listenerCount(event) > 0;
		};

		// Aliases
		Emitter.prototype.addEventListener = Emitter.prototype.on;
		Emitter.prototype.removeListener = Emitter.prototype.off;
		Emitter.prototype.removeEventListener = Emitter.prototype.off;
		Emitter.prototype.removeAllListeners = Emitter.prototype.off;

		{
			module.exports = Emitter;
		} 
	} (componentEmitter));
	return componentEmitter.exports;
}

var componentEmitterExports = /*@__PURE__*/ requireComponentEmitter();
var Emitter = /*@__PURE__*/getDefaultExportFromCjs(componentEmitterExports);

/*! Hammer.JS - v2.0.17-rc - 2019-12-16
 * http://naver.github.io/egjs
 *
 * Forked By Naver egjs
 * Copyright (c) hammerjs
 * Licensed under the MIT license */
function _extends() {
  _extends = Object.assign || function (target) {
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

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/**
 * @private
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign$3;

if (typeof Object.assign !== 'function') {
  assign$3 = function assign(target) {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var output = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];

      if (source !== undefined && source !== null) {
        for (var nextKey in source) {
          if (source.hasOwnProperty(nextKey)) {
            output[nextKey] = source[nextKey];
          }
        }
      }
    }

    return output;
  };
} else {
  assign$3 = Object.assign;
}

var assign$1$1 = assign$3;

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = typeof document === "undefined" ? {
  style: {}
} : document.createElement('div');
var TYPE_FUNCTION = 'function';
var round = Math.round,
    abs = Math.abs;
var now = Date.now;

/**
 * @private
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */

function prefixed(obj, property) {
  var prefix;
  var prop;
  var camelProp = property[0].toUpperCase() + property.slice(1);
  var i = 0;

  while (i < VENDOR_PREFIXES.length) {
    prefix = VENDOR_PREFIXES[i];
    prop = prefix ? prefix + camelProp : property;

    if (prop in obj) {
      return prop;
    }

    i++;
  }

  return undefined;
}

/* eslint-disable no-new-func, no-nested-ternary */
var win;

if (typeof window === "undefined") {
  // window is undefined in node.js
  win = {};
} else {
  win = window;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;
function getTouchActionProps() {
  if (!NATIVE_TOUCH_ACTION) {
    return false;
  }

  var touchMap = {};
  var cssSupports = win.CSS && win.CSS.supports;
  ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function (val) {
    // If css.supports is not supported but there is native touch-action assume it supports
    // all values. This is the case for IE 10 and 11.
    return touchMap[val] = cssSupports ? win.CSS.supports('touch-action', val) : true;
  });
  return touchMap;
}

var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented

var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
var SUPPORT_TOUCH = 'ontouchstart' in win;
var SUPPORT_POINTER_EVENTS = prefixed(win, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';
var COMPUTE_INTERVAL = 25;
var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;
var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;
var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * @private
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
  var i;

  if (!obj) {
    return;
  }

  if (obj.forEach) {
    obj.forEach(iterator, context);
  } else if (obj.length !== undefined) {
    i = 0;

    while (i < obj.length) {
      iterator.call(context, obj[i], i, obj);
      i++;
    }
  } else {
    for (i in obj) {
      obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
    }
  }
}

/**
 * @private
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */

function boolOrFn(val, args) {
  if (typeof val === TYPE_FUNCTION) {
    return val.apply(args ? args[0] || undefined : undefined, args);
  }

  return val;
}

/**
 * @private
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
  return str.indexOf(find) > -1;
}

/**
 * @private
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */

function cleanTouchActions(actions) {
  // none
  if (inStr(actions, TOUCH_ACTION_NONE)) {
    return TOUCH_ACTION_NONE;
  }

  var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
  var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y); // if both pan-x and pan-y are set (different recognizers
  // for different directions, e.g. horizontal pan but vertical swipe?)
  // we need none (as otherwise with pan-x pan-y combined none of these
  // recognizers will work, since the browser would handle all panning

  if (hasPanX && hasPanY) {
    return TOUCH_ACTION_NONE;
  } // pan-x OR pan-y


  if (hasPanX || hasPanY) {
    return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
  } // manipulation


  if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
    return TOUCH_ACTION_MANIPULATION;
  }

  return TOUCH_ACTION_AUTO;
}

/**
 * @private
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */

var TouchAction =
/*#__PURE__*/
function () {
  function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
  }
  /**
   * @private
   * set the touchAction value on the element or enable the polyfill
   * @param {String} value
   */


  var _proto = TouchAction.prototype;

  _proto.set = function set(value) {
    // find out the touch-action by the event handlers
    if (value === TOUCH_ACTION_COMPUTE) {
      value = this.compute();
    }

    if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
      this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
    }

    this.actions = value.toLowerCase().trim();
  };
  /**
   * @private
   * just re-set the touchAction value
   */


  _proto.update = function update() {
    this.set(this.manager.options.touchAction);
  };
  /**
   * @private
   * compute the value for the touchAction property based on the recognizer's settings
   * @returns {String} value
   */


  _proto.compute = function compute() {
    var actions = [];
    each(this.manager.recognizers, function (recognizer) {
      if (boolOrFn(recognizer.options.enable, [recognizer])) {
        actions = actions.concat(recognizer.getTouchAction());
      }
    });
    return cleanTouchActions(actions.join(' '));
  };
  /**
   * @private
   * this method is called on each input cycle and provides the preventing of the browser behavior
   * @param {Object} input
   */


  _proto.preventDefaults = function preventDefaults(input) {
    var srcEvent = input.srcEvent;
    var direction = input.offsetDirection; // if the touch action did prevented once this session

    if (this.manager.session.prevented) {
      srcEvent.preventDefault();
      return;
    }

    var actions = this.actions;
    var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

    if (hasNone) {
      // do not prevent defaults if this is a tap gesture
      var isTapPointer = input.pointers.length === 1;
      var isTapMovement = input.distance < 2;
      var isTapTouchTime = input.deltaTime < 250;

      if (isTapPointer && isTapMovement && isTapTouchTime) {
        return;
      }
    }

    if (hasPanX && hasPanY) {
      // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
      return;
    }

    if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
      return this.preventSrc(srcEvent);
    }
  };
  /**
   * @private
   * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
   * @param {Object} srcEvent
   */


  _proto.preventSrc = function preventSrc(srcEvent) {
    this.manager.session.prevented = true;
    srcEvent.preventDefault();
  };

  return TouchAction;
}();

/**
 * @private
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
  while (node) {
    if (node === parent) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

/**
 * @private
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */

function getCenter(pointers) {
  var pointersLength = pointers.length; // no need to loop when only one touch

  if (pointersLength === 1) {
    return {
      x: round(pointers[0].clientX),
      y: round(pointers[0].clientY)
    };
  }

  var x = 0;
  var y = 0;
  var i = 0;

  while (i < pointersLength) {
    x += pointers[i].clientX;
    y += pointers[i].clientY;
    i++;
  }

  return {
    x: round(x / pointersLength),
    y: round(y / pointersLength)
  };
}

/**
 * @private
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */

function simpleCloneInputData(input) {
  // make a simple copy of the pointers because we will get a reference if we don't
  // we only need clientXY for the calculations
  var pointers = [];
  var i = 0;

  while (i < input.pointers.length) {
    pointers[i] = {
      clientX: round(input.pointers[i].clientX),
      clientY: round(input.pointers[i].clientY)
    };
    i++;
  }

  return {
    timeStamp: now(),
    pointers: pointers,
    center: getCenter(pointers),
    deltaX: input.deltaX,
    deltaY: input.deltaY
  };
}

/**
 * @private
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */

function getDistance(p1, p2, props) {
  if (!props) {
    props = PROPS_XY;
  }

  var x = p2[props[0]] - p1[props[0]];
  var y = p2[props[1]] - p1[props[1]];
  return Math.sqrt(x * x + y * y);
}

/**
 * @private
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */

function getAngle(p1, p2, props) {
  if (!props) {
    props = PROPS_XY;
  }

  var x = p2[props[0]] - p1[props[0]];
  var y = p2[props[1]] - p1[props[1]];
  return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * @private
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */

function getDirection(x, y) {
  if (x === y) {
    return DIRECTION_NONE;
  }

  if (abs(x) >= abs(y)) {
    return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
  }

  return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

function computeDeltaXY(session, input) {
  var center = input.center; // let { offsetDelta:offset = {}, prevDelta = {}, prevInput = {} } = session;
  // jscs throwing error on defalut destructured values and without defaults tests fail

  var offset = session.offsetDelta || {};
  var prevDelta = session.prevDelta || {};
  var prevInput = session.prevInput || {};

  if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
    prevDelta = session.prevDelta = {
      x: prevInput.deltaX || 0,
      y: prevInput.deltaY || 0
    };
    offset = session.offsetDelta = {
      x: center.x,
      y: center.y
    };
  }

  input.deltaX = prevDelta.x + (center.x - offset.x);
  input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * @private
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
  return {
    x: x / deltaTime || 0,
    y: y / deltaTime || 0
  };
}

/**
 * @private
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */

function getScale(start, end) {
  return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

/**
 * @private
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */

function getRotation(start, end) {
  return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * @private
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */

function computeIntervalInputData(session, input) {
  var last = session.lastInterval || input;
  var deltaTime = input.timeStamp - last.timeStamp;
  var velocity;
  var velocityX;
  var velocityY;
  var direction;

  if (input.eventType !== INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
    var deltaX = input.deltaX - last.deltaX;
    var deltaY = input.deltaY - last.deltaY;
    var v = getVelocity(deltaTime, deltaX, deltaY);
    velocityX = v.x;
    velocityY = v.y;
    velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
    direction = getDirection(deltaX, deltaY);
    session.lastInterval = input;
  } else {
    // use latest velocity info if it doesn't overtake a minimum period
    velocity = last.velocity;
    velocityX = last.velocityX;
    velocityY = last.velocityY;
    direction = last.direction;
  }

  input.velocity = velocity;
  input.velocityX = velocityX;
  input.velocityY = velocityY;
  input.direction = direction;
}

/**
* @private
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */

function computeInputData(manager, input) {
  var session = manager.session;
  var pointers = input.pointers;
  var pointersLength = pointers.length; // store the first input to calculate the distance and direction

  if (!session.firstInput) {
    session.firstInput = simpleCloneInputData(input);
  } // to compute scale and rotation we need to store the multiple touches


  if (pointersLength > 1 && !session.firstMultiple) {
    session.firstMultiple = simpleCloneInputData(input);
  } else if (pointersLength === 1) {
    session.firstMultiple = false;
  }

  var firstInput = session.firstInput,
      firstMultiple = session.firstMultiple;
  var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
  var center = input.center = getCenter(pointers);
  input.timeStamp = now();
  input.deltaTime = input.timeStamp - firstInput.timeStamp;
  input.angle = getAngle(offsetCenter, center);
  input.distance = getDistance(offsetCenter, center);
  computeDeltaXY(session, input);
  input.offsetDirection = getDirection(input.deltaX, input.deltaY);
  var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
  input.overallVelocityX = overallVelocity.x;
  input.overallVelocityY = overallVelocity.y;
  input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
  input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
  input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
  input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
  computeIntervalInputData(session, input); // find the correct target

  var target = manager.element;
  var srcEvent = input.srcEvent;
  var srcEventTarget;

  if (srcEvent.composedPath) {
    srcEventTarget = srcEvent.composedPath()[0];
  } else if (srcEvent.path) {
    srcEventTarget = srcEvent.path[0];
  } else {
    srcEventTarget = srcEvent.target;
  }

  if (hasParent(srcEventTarget, target)) {
    target = srcEventTarget;
  }

  input.target = target;
}

/**
 * @private
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */

function inputHandler(manager, eventType, input) {
  var pointersLen = input.pointers.length;
  var changedPointersLen = input.changedPointers.length;
  var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
  var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
  input.isFirst = !!isFirst;
  input.isFinal = !!isFinal;

  if (isFirst) {
    manager.session = {};
  } // source event is the normalized value of the domEvents
  // like 'touchstart, mouseup, pointerdown'


  input.eventType = eventType; // compute scale, rotation etc

  computeInputData(manager, input); // emit secret event

  manager.emit('hammer.input', input);
  manager.recognize(input);
  manager.session.prevInput = input;
}

/**
 * @private
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
  return str.trim().split(/\s+/g);
}

/**
 * @private
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */

function addEventListeners(target, types, handler) {
  each(splitStr(types), function (type) {
    target.addEventListener(type, handler, false);
  });
}

/**
 * @private
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */

function removeEventListeners(target, types, handler) {
  each(splitStr(types), function (type) {
    target.removeEventListener(type, handler, false);
  });
}

/**
 * @private
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
  var doc = element.ownerDocument || element;
  return doc.defaultView || doc.parentWindow || window;
}

/**
 * @private
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */

var Input =
/*#__PURE__*/
function () {
  function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget; // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.

    this.domHandler = function (ev) {
      if (boolOrFn(manager.options.enable, [manager])) {
        self.handler(ev);
      }
    };

    this.init();
  }
  /**
   * @private
   * should handle the inputEvent data and trigger the callback
   * @virtual
   */


  var _proto = Input.prototype;

  _proto.handler = function handler() {};
  /**
   * @private
   * bind the events
   */


  _proto.init = function init() {
    this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
    this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
    this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  };
  /**
   * @private
   * unbind the events
   */


  _proto.destroy = function destroy() {
    this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
    this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
    this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  };

  return Input;
}();

/**
 * @private
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
  if (src.indexOf && !findByKey) {
    return src.indexOf(find);
  } else {
    var i = 0;

    while (i < src.length) {
      if (findByKey && src[i][findByKey] == find || !findByKey && src[i] === find) {
        // do not use === here, test fails
        return i;
      }

      i++;
    }

    return -1;
  }
}

var POINTER_INPUT_MAP = {
  pointerdown: INPUT_START,
  pointermove: INPUT_MOVE,
  pointerup: INPUT_END,
  pointercancel: INPUT_CANCEL,
  pointerout: INPUT_CANCEL
}; // in IE10 the pointer types is defined as an enum

var IE10_POINTER_TYPE_ENUM = {
  2: INPUT_TYPE_TOUCH,
  3: INPUT_TYPE_PEN,
  4: INPUT_TYPE_MOUSE,
  5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816

};
var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel'; // IE10 has prefixed support, and case-sensitive

if (win.MSPointerEvent && !win.PointerEvent) {
  POINTER_ELEMENT_EVENTS = 'MSPointerDown';
  POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}
/**
 * @private
 * Pointer events input
 * @constructor
 * @extends Input
 */


var PointerEventInput =
/*#__PURE__*/
function (_Input) {
  _inheritsLoose(PointerEventInput, _Input);

  function PointerEventInput() {
    var _this;

    var proto = PointerEventInput.prototype;
    proto.evEl = POINTER_ELEMENT_EVENTS;
    proto.evWin = POINTER_WINDOW_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.store = _this.manager.session.pointerEvents = [];
    return _this;
  }
  /**
   * @private
   * handle mouse events
   * @param {Object} ev
   */


  var _proto = PointerEventInput.prototype;

  _proto.handler = function handler(ev) {
    var store = this.store;
    var removePointer = false;
    var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
    var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
    var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
    var isTouch = pointerType === INPUT_TYPE_TOUCH; // get index of the event in the store

    var storeIndex = inArray(store, ev.pointerId, 'pointerId'); // start and mouse must be down

    if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
      if (storeIndex < 0) {
        store.push(ev);
        storeIndex = store.length - 1;
      }
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
      removePointer = true;
    } // it not found, so the pointer hasn't been down (so it's probably a hover)


    if (storeIndex < 0) {
      return;
    } // update the event in the store


    store[storeIndex] = ev;
    this.callback(this.manager, eventType, {
      pointers: store,
      changedPointers: [ev],
      pointerType: pointerType,
      srcEvent: ev
    });

    if (removePointer) {
      // remove from the store
      store.splice(storeIndex, 1);
    }
  };

  return PointerEventInput;
}(Input);

/**
 * @private
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
  return Array.prototype.slice.call(obj, 0);
}

/**
 * @private
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */

function uniqueArray(src, key, sort) {
  var results = [];
  var values = [];
  var i = 0;

  while (i < src.length) {
    var val = key ? src[i][key] : src[i];

    if (inArray(values, val) < 0) {
      results.push(src[i]);
    }

    values[i] = val;
    i++;
  }

  if (sort) {
    if (!key) {
      results = results.sort();
    } else {
      results = results.sort(function (a, b) {
        return a[key] > b[key];
      });
    }
  }

  return results;
}

var TOUCH_INPUT_MAP = {
  touchstart: INPUT_START,
  touchmove: INPUT_MOVE,
  touchend: INPUT_END,
  touchcancel: INPUT_CANCEL
};
var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';
/**
 * @private
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */

var TouchInput =
/*#__PURE__*/
function (_Input) {
  _inheritsLoose(TouchInput, _Input);

  function TouchInput() {
    var _this;

    TouchInput.prototype.evTarget = TOUCH_TARGET_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.targetIds = {}; // this.evTarget = TOUCH_TARGET_EVENTS;

    return _this;
  }

  var _proto = TouchInput.prototype;

  _proto.handler = function handler(ev) {
    var type = TOUCH_INPUT_MAP[ev.type];
    var touches = getTouches.call(this, ev, type);

    if (!touches) {
      return;
    }

    this.callback(this.manager, type, {
      pointers: touches[0],
      changedPointers: touches[1],
      pointerType: INPUT_TYPE_TOUCH,
      srcEvent: ev
    });
  };

  return TouchInput;
}(Input);

function getTouches(ev, type) {
  var allTouches = toArray(ev.touches);
  var targetIds = this.targetIds; // when there is only one touch, the process can be simplified

  if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
    targetIds[allTouches[0].identifier] = true;
    return [allTouches, allTouches];
  }

  var i;
  var targetTouches;
  var changedTouches = toArray(ev.changedTouches);
  var changedTargetTouches = [];
  var target = this.target; // get target touches from touches

  targetTouches = allTouches.filter(function (touch) {
    return hasParent(touch.target, target);
  }); // collect touches

  if (type === INPUT_START) {
    i = 0;

    while (i < targetTouches.length) {
      targetIds[targetTouches[i].identifier] = true;
      i++;
    }
  } // filter changed touches to only contain touches that exist in the collected target ids


  i = 0;

  while (i < changedTouches.length) {
    if (targetIds[changedTouches[i].identifier]) {
      changedTargetTouches.push(changedTouches[i]);
    } // cleanup removed touches


    if (type & (INPUT_END | INPUT_CANCEL)) {
      delete targetIds[changedTouches[i].identifier];
    }

    i++;
  }

  if (!changedTargetTouches.length) {
    return;
  }

  return [// merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
  uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true), changedTargetTouches];
}

var MOUSE_INPUT_MAP = {
  mousedown: INPUT_START,
  mousemove: INPUT_MOVE,
  mouseup: INPUT_END
};
var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';
/**
 * @private
 * Mouse events input
 * @constructor
 * @extends Input
 */

var MouseInput =
/*#__PURE__*/
function (_Input) {
  _inheritsLoose(MouseInput, _Input);

  function MouseInput() {
    var _this;

    var proto = MouseInput.prototype;
    proto.evEl = MOUSE_ELEMENT_EVENTS;
    proto.evWin = MOUSE_WINDOW_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.pressed = false; // mousedown state

    return _this;
  }
  /**
   * @private
   * handle mouse events
   * @param {Object} ev
   */


  var _proto = MouseInput.prototype;

  _proto.handler = function handler(ev) {
    var eventType = MOUSE_INPUT_MAP[ev.type]; // on start we want to have the left mouse button down

    if (eventType & INPUT_START && ev.button === 0) {
      this.pressed = true;
    }

    if (eventType & INPUT_MOVE && ev.which !== 1) {
      eventType = INPUT_END;
    } // mouse must be down


    if (!this.pressed) {
      return;
    }

    if (eventType & INPUT_END) {
      this.pressed = false;
    }

    this.callback(this.manager, eventType, {
      pointers: [ev],
      changedPointers: [ev],
      pointerType: INPUT_TYPE_MOUSE,
      srcEvent: ev
    });
  };

  return MouseInput;
}(Input);

/**
 * @private
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function setLastTouch(eventData) {
  var _eventData$changedPoi = eventData.changedPointers,
      touch = _eventData$changedPoi[0];

  if (touch.identifier === this.primaryTouch) {
    var lastTouch = {
      x: touch.clientX,
      y: touch.clientY
    };
    var lts = this.lastTouches;
    this.lastTouches.push(lastTouch);

    var removeLastTouch = function removeLastTouch() {
      var i = lts.indexOf(lastTouch);

      if (i > -1) {
        lts.splice(i, 1);
      }
    };

    setTimeout(removeLastTouch, DEDUP_TIMEOUT);
  }
}

function recordTouches(eventType, eventData) {
  if (eventType & INPUT_START) {
    this.primaryTouch = eventData.changedPointers[0].identifier;
    setLastTouch.call(this, eventData);
  } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
    setLastTouch.call(this, eventData);
  }
}

function isSyntheticEvent(eventData) {
  var x = eventData.srcEvent.clientX;
  var y = eventData.srcEvent.clientY;

  for (var i = 0; i < this.lastTouches.length; i++) {
    var t = this.lastTouches[i];
    var dx = Math.abs(x - t.x);
    var dy = Math.abs(y - t.y);

    if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
      return true;
    }
  }

  return false;
}

var TouchMouseInput =
/*#__PURE__*/
function () {
  var TouchMouseInput =
  /*#__PURE__*/
  function (_Input) {
    _inheritsLoose(TouchMouseInput, _Input);

    function TouchMouseInput(_manager, callback) {
      var _this;

      _this = _Input.call(this, _manager, callback) || this;

      _this.handler = function (manager, inputEvent, inputData) {
        var isTouch = inputData.pointerType === INPUT_TYPE_TOUCH;
        var isMouse = inputData.pointerType === INPUT_TYPE_MOUSE;

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
          return;
        } // when we're in a touch event, record touches to  de-dupe synthetic mouse event


        if (isTouch) {
          recordTouches.call(_assertThisInitialized(_assertThisInitialized(_this)), inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(_assertThisInitialized(_assertThisInitialized(_this)), inputData)) {
          return;
        }

        _this.callback(manager, inputEvent, inputData);
      };

      _this.touch = new TouchInput(_this.manager, _this.handler);
      _this.mouse = new MouseInput(_this.manager, _this.handler);
      _this.primaryTouch = null;
      _this.lastTouches = [];
      return _this;
    }
    /**
     * @private
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */


    var _proto = TouchMouseInput.prototype;

    /**
     * @private
     * remove the event listeners
     */
    _proto.destroy = function destroy() {
      this.touch.destroy();
      this.mouse.destroy();
    };

    return TouchMouseInput;
  }(Input);

  return TouchMouseInput;
}();

/**
 * @private
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */

function createInputInstance(manager) {
  var Type; // let inputClass = manager.options.inputClass;

  var inputClass = manager.options.inputClass;

  if (inputClass) {
    Type = inputClass;
  } else if (SUPPORT_POINTER_EVENTS) {
    Type = PointerEventInput;
  } else if (SUPPORT_ONLY_TOUCH) {
    Type = TouchInput;
  } else if (!SUPPORT_TOUCH) {
    Type = MouseInput;
  } else {
    Type = TouchMouseInput;
  }

  return new Type(manager, inputHandler);
}

/**
 * @private
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */

function invokeArrayArg(arg, fn, context) {
  if (Array.isArray(arg)) {
    each(arg, context[fn], context);
    return true;
  }

  return false;
}

var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * @private
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
  return _uniqueId++;
}

/**
 * @private
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
  var manager = recognizer.manager;

  if (manager) {
    return manager.get(otherRecognizer);
  }

  return otherRecognizer;
}

/**
 * @private
 * get a usable string, used as event postfix
 * @param {constant} state
 * @returns {String} state
 */

function stateStr(state) {
  if (state & STATE_CANCELLED) {
    return 'cancel';
  } else if (state & STATE_ENDED) {
    return 'end';
  } else if (state & STATE_CHANGED) {
    return 'move';
  } else if (state & STATE_BEGAN) {
    return 'start';
  }

  return '';
}

/**
 * @private
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */

/**
 * @private
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */

var Recognizer =
/*#__PURE__*/
function () {
  function Recognizer(options) {
    if (options === void 0) {
      options = {};
    }

    this.options = _extends({
      enable: true
    }, options);
    this.id = uniqueId();
    this.manager = null; // default is enable true

    this.state = STATE_POSSIBLE;
    this.simultaneous = {};
    this.requireFail = [];
  }
  /**
   * @private
   * set options
   * @param {Object} options
   * @return {Recognizer}
   */


  var _proto = Recognizer.prototype;

  _proto.set = function set(options) {
    assign$1$1(this.options, options); // also update the touchAction, in case something changed about the directions/enabled state

    this.manager && this.manager.touchAction.update();
    return this;
  };
  /**
   * @private
   * recognize simultaneous with an other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.recognizeWith = function recognizeWith(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
      return this;
    }

    var simultaneous = this.simultaneous;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

    if (!simultaneous[otherRecognizer.id]) {
      simultaneous[otherRecognizer.id] = otherRecognizer;
      otherRecognizer.recognizeWith(this);
    }

    return this;
  };
  /**
   * @private
   * drop the simultaneous link. it doesnt remove the link on the other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.dropRecognizeWith = function dropRecognizeWith(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
      return this;
    }

    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
    delete this.simultaneous[otherRecognizer.id];
    return this;
  };
  /**
   * @private
   * recognizer can only run when an other is failing
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.requireFailure = function requireFailure(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
      return this;
    }

    var requireFail = this.requireFail;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);

    if (inArray(requireFail, otherRecognizer) === -1) {
      requireFail.push(otherRecognizer);
      otherRecognizer.requireFailure(this);
    }

    return this;
  };
  /**
   * @private
   * drop the requireFailure link. it does not remove the link on the other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */


  _proto.dropRequireFailure = function dropRequireFailure(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
      return this;
    }

    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
    var index = inArray(this.requireFail, otherRecognizer);

    if (index > -1) {
      this.requireFail.splice(index, 1);
    }

    return this;
  };
  /**
   * @private
   * has require failures boolean
   * @returns {boolean}
   */


  _proto.hasRequireFailures = function hasRequireFailures() {
    return this.requireFail.length > 0;
  };
  /**
   * @private
   * if the recognizer can recognize simultaneous with an other recognizer
   * @param {Recognizer} otherRecognizer
   * @returns {Boolean}
   */


  _proto.canRecognizeWith = function canRecognizeWith(otherRecognizer) {
    return !!this.simultaneous[otherRecognizer.id];
  };
  /**
   * @private
   * You should use `tryEmit` instead of `emit` directly to check
   * that all the needed recognizers has failed before emitting.
   * @param {Object} input
   */


  _proto.emit = function emit(input) {
    var self = this;
    var state = this.state;

    function emit(event) {
      self.manager.emit(event, input);
    } // 'panstart' and 'panmove'


    if (state < STATE_ENDED) {
      emit(self.options.event + stateStr(state));
    }

    emit(self.options.event); // simple 'eventName' events

    if (input.additionalEvent) {
      // additional event(panleft, panright, pinchin, pinchout...)
      emit(input.additionalEvent);
    } // panend and pancancel


    if (state >= STATE_ENDED) {
      emit(self.options.event + stateStr(state));
    }
  };
  /**
   * @private
   * Check that all the require failure recognizers has failed,
   * if true, it emits a gesture event,
   * otherwise, setup the state to FAILED.
   * @param {Object} input
   */


  _proto.tryEmit = function tryEmit(input) {
    if (this.canEmit()) {
      return this.emit(input);
    } // it's failing anyway


    this.state = STATE_FAILED;
  };
  /**
   * @private
   * can we emit?
   * @returns {boolean}
   */


  _proto.canEmit = function canEmit() {
    var i = 0;

    while (i < this.requireFail.length) {
      if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
        return false;
      }

      i++;
    }

    return true;
  };
  /**
   * @private
   * update the recognizer
   * @param {Object} inputData
   */


  _proto.recognize = function recognize(inputData) {
    // make a new copy of the inputData
    // so we can change the inputData without messing up the other recognizers
    var inputDataClone = assign$1$1({}, inputData); // is is enabled and allow recognizing?

    if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
      this.reset();
      this.state = STATE_FAILED;
      return;
    } // reset when we've reached the end


    if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
      this.state = STATE_POSSIBLE;
    }

    this.state = this.process(inputDataClone); // the recognizer has recognized a gesture
    // so trigger an event

    if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
      this.tryEmit(inputDataClone);
    }
  };
  /**
   * @private
   * return the state of the recognizer
   * the actual recognizing happens in this method
   * @virtual
   * @param {Object} inputData
   * @returns {constant} STATE
   */

  /* jshint ignore:start */


  _proto.process = function process(inputData) {};
  /* jshint ignore:end */

  /**
   * @private
   * return the preferred touch-action
   * @virtual
   * @returns {Array}
   */


  _proto.getTouchAction = function getTouchAction() {};
  /**
   * @private
   * called when the gesture isn't allowed to recognize
   * like when another is being recognized or it is disabled
   * @virtual
   */


  _proto.reset = function reset() {};

  return Recognizer;
}();

/**
 * @private
 * A tap is recognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */

var TapRecognizer =
/*#__PURE__*/
function (_Recognizer) {
  _inheritsLoose(TapRecognizer, _Recognizer);

  function TapRecognizer(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _Recognizer.call(this, _extends({
      event: 'tap',
      pointers: 1,
      taps: 1,
      interval: 300,
      // max time between the multi-tap taps
      time: 250,
      // max time of the pointer to be down (like finger on the screen)
      threshold: 9,
      // a minimal movement is ok, but keep it low
      posThreshold: 10
    }, options)) || this; // previous time and center,
    // used for tap counting

    _this.pTime = false;
    _this.pCenter = false;
    _this._timer = null;
    _this._input = null;
    _this.count = 0;
    return _this;
  }

  var _proto = TapRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_MANIPULATION];
  };

  _proto.process = function process(input) {
    var _this2 = this;

    var options = this.options;
    var validPointers = input.pointers.length === options.pointers;
    var validMovement = input.distance < options.threshold;
    var validTouchTime = input.deltaTime < options.time;
    this.reset();

    if (input.eventType & INPUT_START && this.count === 0) {
      return this.failTimeout();
    } // we only allow little movement
    // and we've reached an end event, so a tap is possible


    if (validMovement && validTouchTime && validPointers) {
      if (input.eventType !== INPUT_END) {
        return this.failTimeout();
      }

      var validInterval = this.pTime ? input.timeStamp - this.pTime < options.interval : true;
      var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;
      this.pTime = input.timeStamp;
      this.pCenter = input.center;

      if (!validMultiTap || !validInterval) {
        this.count = 1;
      } else {
        this.count += 1;
      }

      this._input = input; // if tap count matches we have recognized it,
      // else it has began recognizing...

      var tapCount = this.count % options.taps;

      if (tapCount === 0) {
        // no failing requirements, immediately trigger the tap event
        // or wait as long as the multitap interval to trigger
        if (!this.hasRequireFailures()) {
          return STATE_RECOGNIZED;
        } else {
          this._timer = setTimeout(function () {
            _this2.state = STATE_RECOGNIZED;

            _this2.tryEmit();
          }, options.interval);
          return STATE_BEGAN;
        }
      }
    }

    return STATE_FAILED;
  };

  _proto.failTimeout = function failTimeout() {
    var _this3 = this;

    this._timer = setTimeout(function () {
      _this3.state = STATE_FAILED;
    }, this.options.interval);
    return STATE_FAILED;
  };

  _proto.reset = function reset() {
    clearTimeout(this._timer);
  };

  _proto.emit = function emit() {
    if (this.state === STATE_RECOGNIZED) {
      this._input.tapCount = this.count;
      this.manager.emit(this.options.event, this._input);
    }
  };

  return TapRecognizer;
}(Recognizer);

/**
 * @private
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */

var AttrRecognizer =
/*#__PURE__*/
function (_Recognizer) {
  _inheritsLoose(AttrRecognizer, _Recognizer);

  function AttrRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _Recognizer.call(this, _extends({
      pointers: 1
    }, options)) || this;
  }
  /**
   * @private
   * Used to check if it the recognizer receives valid input, like input.distance > 10.
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {Boolean} recognized
   */


  var _proto = AttrRecognizer.prototype;

  _proto.attrTest = function attrTest(input) {
    var optionPointers = this.options.pointers;
    return optionPointers === 0 || input.pointers.length === optionPointers;
  };
  /**
   * @private
   * Process the input and return the state for the recognizer
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {*} State
   */


  _proto.process = function process(input) {
    var state = this.state;
    var eventType = input.eventType;
    var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
    var isValid = this.attrTest(input); // on cancel input and we've recognized before, return STATE_CANCELLED

    if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
      return state | STATE_CANCELLED;
    } else if (isRecognized || isValid) {
      if (eventType & INPUT_END) {
        return state | STATE_ENDED;
      } else if (!(state & STATE_BEGAN)) {
        return STATE_BEGAN;
      }

      return state | STATE_CHANGED;
    }

    return STATE_FAILED;
  };

  return AttrRecognizer;
}(Recognizer);

/**
 * @private
 * direction cons to string
 * @param {constant} direction
 * @returns {String}
 */

function directionStr(direction) {
  if (direction === DIRECTION_DOWN) {
    return 'down';
  } else if (direction === DIRECTION_UP) {
    return 'up';
  } else if (direction === DIRECTION_LEFT) {
    return 'left';
  } else if (direction === DIRECTION_RIGHT) {
    return 'right';
  }

  return '';
}

/**
 * @private
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */

var PanRecognizer =
/*#__PURE__*/
function (_AttrRecognizer) {
  _inheritsLoose(PanRecognizer, _AttrRecognizer);

  function PanRecognizer(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _AttrRecognizer.call(this, _extends({
      event: 'pan',
      threshold: 10,
      pointers: 1,
      direction: DIRECTION_ALL
    }, options)) || this;
    _this.pX = null;
    _this.pY = null;
    return _this;
  }

  var _proto = PanRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    var direction = this.options.direction;
    var actions = [];

    if (direction & DIRECTION_HORIZONTAL) {
      actions.push(TOUCH_ACTION_PAN_Y);
    }

    if (direction & DIRECTION_VERTICAL) {
      actions.push(TOUCH_ACTION_PAN_X);
    }

    return actions;
  };

  _proto.directionTest = function directionTest(input) {
    var options = this.options;
    var hasMoved = true;
    var distance = input.distance;
    var direction = input.direction;
    var x = input.deltaX;
    var y = input.deltaY; // lock to axis?

    if (!(direction & options.direction)) {
      if (options.direction & DIRECTION_HORIZONTAL) {
        direction = x === 0 ? DIRECTION_NONE : x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
        hasMoved = x !== this.pX;
        distance = Math.abs(input.deltaX);
      } else {
        direction = y === 0 ? DIRECTION_NONE : y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
        hasMoved = y !== this.pY;
        distance = Math.abs(input.deltaY);
      }
    }

    input.direction = direction;
    return hasMoved && distance > options.threshold && direction & options.direction;
  };

  _proto.attrTest = function attrTest(input) {
    return AttrRecognizer.prototype.attrTest.call(this, input) && ( // replace with a super call
    this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
  };

  _proto.emit = function emit(input) {
    this.pX = input.deltaX;
    this.pY = input.deltaY;
    var direction = directionStr(input.direction);

    if (direction) {
      input.additionalEvent = this.options.event + direction;
    }

    _AttrRecognizer.prototype.emit.call(this, input);
  };

  return PanRecognizer;
}(AttrRecognizer);

/**
 * @private
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */

var SwipeRecognizer =
/*#__PURE__*/
function (_AttrRecognizer) {
  _inheritsLoose(SwipeRecognizer, _AttrRecognizer);

  function SwipeRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _AttrRecognizer.call(this, _extends({
      event: 'swipe',
      threshold: 10,
      velocity: 0.3,
      direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
      pointers: 1
    }, options)) || this;
  }

  var _proto = SwipeRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return PanRecognizer.prototype.getTouchAction.call(this);
  };

  _proto.attrTest = function attrTest(input) {
    var direction = this.options.direction;
    var velocity;

    if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
      velocity = input.overallVelocity;
    } else if (direction & DIRECTION_HORIZONTAL) {
      velocity = input.overallVelocityX;
    } else if (direction & DIRECTION_VERTICAL) {
      velocity = input.overallVelocityY;
    }

    return _AttrRecognizer.prototype.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers === this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
  };

  _proto.emit = function emit(input) {
    var direction = directionStr(input.offsetDirection);

    if (direction) {
      this.manager.emit(this.options.event + direction, input);
    }

    this.manager.emit(this.options.event, input);
  };

  return SwipeRecognizer;
}(AttrRecognizer);

/**
 * @private
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */

var PinchRecognizer =
/*#__PURE__*/
function (_AttrRecognizer) {
  _inheritsLoose(PinchRecognizer, _AttrRecognizer);

  function PinchRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _AttrRecognizer.call(this, _extends({
      event: 'pinch',
      threshold: 0,
      pointers: 2
    }, options)) || this;
  }

  var _proto = PinchRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_NONE];
  };

  _proto.attrTest = function attrTest(input) {
    return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
  };

  _proto.emit = function emit(input) {
    if (input.scale !== 1) {
      var inOut = input.scale < 1 ? 'in' : 'out';
      input.additionalEvent = this.options.event + inOut;
    }

    _AttrRecognizer.prototype.emit.call(this, input);
  };

  return PinchRecognizer;
}(AttrRecognizer);

/**
 * @private
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */

var RotateRecognizer =
/*#__PURE__*/
function (_AttrRecognizer) {
  _inheritsLoose(RotateRecognizer, _AttrRecognizer);

  function RotateRecognizer(options) {
    if (options === void 0) {
      options = {};
    }

    return _AttrRecognizer.call(this, _extends({
      event: 'rotate',
      threshold: 0,
      pointers: 2
    }, options)) || this;
  }

  var _proto = RotateRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_NONE];
  };

  _proto.attrTest = function attrTest(input) {
    return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
  };

  return RotateRecognizer;
}(AttrRecognizer);

/**
 * @private
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */

var PressRecognizer =
/*#__PURE__*/
function (_Recognizer) {
  _inheritsLoose(PressRecognizer, _Recognizer);

  function PressRecognizer(options) {
    var _this;

    if (options === void 0) {
      options = {};
    }

    _this = _Recognizer.call(this, _extends({
      event: 'press',
      pointers: 1,
      time: 251,
      // minimal time of the pointer to be pressed
      threshold: 9
    }, options)) || this;
    _this._timer = null;
    _this._input = null;
    return _this;
  }

  var _proto = PressRecognizer.prototype;

  _proto.getTouchAction = function getTouchAction() {
    return [TOUCH_ACTION_AUTO];
  };

  _proto.process = function process(input) {
    var _this2 = this;

    var options = this.options;
    var validPointers = input.pointers.length === options.pointers;
    var validMovement = input.distance < options.threshold;
    var validTime = input.deltaTime > options.time;
    this._input = input; // we only allow little movement
    // and we've reached an end event, so a tap is possible

    if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
      this.reset();
    } else if (input.eventType & INPUT_START) {
      this.reset();
      this._timer = setTimeout(function () {
        _this2.state = STATE_RECOGNIZED;

        _this2.tryEmit();
      }, options.time);
    } else if (input.eventType & INPUT_END) {
      return STATE_RECOGNIZED;
    }

    return STATE_FAILED;
  };

  _proto.reset = function reset() {
    clearTimeout(this._timer);
  };

  _proto.emit = function emit(input) {
    if (this.state !== STATE_RECOGNIZED) {
      return;
    }

    if (input && input.eventType & INPUT_END) {
      this.manager.emit(this.options.event + "up", input);
    } else {
      this._input.timeStamp = now();
      this.manager.emit(this.options.event, this._input);
    }
  };

  return PressRecognizer;
}(Recognizer);

var defaults = {
  /**
   * @private
   * set if DOM events are being triggered.
   * But this is slower and unused by simple implementations, so disabled by default.
   * @type {Boolean}
   * @default false
   */
  domEvents: false,

  /**
   * @private
   * The value for the touchAction property/fallback.
   * When set to `compute` it will magically set the correct value based on the added recognizers.
   * @type {String}
   * @default compute
   */
  touchAction: TOUCH_ACTION_COMPUTE,

  /**
   * @private
   * @type {Boolean}
   * @default true
   */
  enable: true,

  /**
   * @private
   * EXPERIMENTAL FEATURE -- can be removed/changed
   * Change the parent input target element.
   * If Null, then it is being set the to main element.
   * @type {Null|EventTarget}
   * @default null
   */
  inputTarget: null,

  /**
   * @private
   * force an input class
   * @type {Null|Function}
   * @default null
   */
  inputClass: null,

  /**
   * @private
   * Some CSS properties can be used to improve the working of Hammer.
   * Add them to this method and they will be set when creating a new Manager.
   * @namespace
   */
  cssProps: {
    /**
     * @private
     * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
     * @type {String}
     * @default 'none'
     */
    userSelect: "none",

    /**
     * @private
     * Disable the Windows Phone grippers when pressing an element.
     * @type {String}
     * @default 'none'
     */
    touchSelect: "none",

    /**
     * @private
     * Disables the default callout shown when you touch and hold a touch target.
     * On iOS, when you touch and hold a touch target such as a link, Safari displays
     * a callout containing information about the link. This property allows you to disable that callout.
     * @type {String}
     * @default 'none'
     */
    touchCallout: "none",

    /**
     * @private
     * Specifies whether zooming is enabled. Used by IE10>
     * @type {String}
     * @default 'none'
     */
    contentZooming: "none",

    /**
     * @private
     * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
     * @type {String}
     * @default 'none'
     */
    userDrag: "none",

    /**
     * @private
     * Overrides the highlight color shown when the user taps a link or a JavaScript
     * clickable element in iOS. This property obeys the alpha value, if specified.
     * @type {String}
     * @default 'rgba(0,0,0,0)'
     */
    tapHighlightColor: "rgba(0,0,0,0)"
  }
};
/**
 * @private
 * Default recognizer setup when calling `Hammer()`
 * When creating a new Manager these will be skipped.
 * This is separated with other defaults because of tree-shaking.
 * @type {Array}
 */

var preset = [[RotateRecognizer, {
  enable: false
}], [PinchRecognizer, {
  enable: false
}, ['rotate']], [SwipeRecognizer, {
  direction: DIRECTION_HORIZONTAL
}], [PanRecognizer, {
  direction: DIRECTION_HORIZONTAL
}, ['swipe']], [TapRecognizer], [TapRecognizer, {
  event: 'doubletap',
  taps: 2
}, ['tap']], [PressRecognizer]];

var STOP = 1;
var FORCED_STOP = 2;
/**
 * @private
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */

function toggleCssProps(manager, add) {
  var element = manager.element;

  if (!element.style) {
    return;
  }

  var prop;
  each(manager.options.cssProps, function (value, name) {
    prop = prefixed(element.style, name);

    if (add) {
      manager.oldCssProps[prop] = element.style[prop];
      element.style[prop] = value;
    } else {
      element.style[prop] = manager.oldCssProps[prop] || "";
    }
  });

  if (!add) {
    manager.oldCssProps = {};
  }
}
/**
 * @private
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */


function triggerDomEvent(event, data) {
  var gestureEvent = document.createEvent("Event");
  gestureEvent.initEvent(event, true, true);
  gestureEvent.gesture = data;
  data.target.dispatchEvent(gestureEvent);
}
/**
* @private
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */


var Manager =
/*#__PURE__*/
function () {
  function Manager(element, options) {
    var _this = this;

    this.options = assign$1$1({}, defaults, options || {});
    this.options.inputTarget = this.options.inputTarget || element;
    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};
    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);
    toggleCssProps(this, true);
    each(this.options.recognizers, function (item) {
      var recognizer = _this.add(new item[0](item[1]));

      item[2] && recognizer.recognizeWith(item[2]);
      item[3] && recognizer.requireFailure(item[3]);
    }, this);
  }
  /**
   * @private
   * set options
   * @param {Object} options
   * @returns {Manager}
   */


  var _proto = Manager.prototype;

  _proto.set = function set(options) {
    assign$1$1(this.options, options); // Options that need a little more setup

    if (options.touchAction) {
      this.touchAction.update();
    }

    if (options.inputTarget) {
      // Clean up existing event listeners and reinitialize
      this.input.destroy();
      this.input.target = options.inputTarget;
      this.input.init();
    }

    return this;
  };
  /**
   * @private
   * stop recognizing for this session.
   * This session will be discarded, when a new [input]start event is fired.
   * When forced, the recognizer cycle is stopped immediately.
   * @param {Boolean} [force]
   */


  _proto.stop = function stop(force) {
    this.session.stopped = force ? FORCED_STOP : STOP;
  };
  /**
   * @private
   * run the recognizers!
   * called by the inputHandler function on every movement of the pointers (touches)
   * it walks through all the recognizers and tries to detect the gesture that is being made
   * @param {Object} inputData
   */


  _proto.recognize = function recognize(inputData) {
    var session = this.session;

    if (session.stopped) {
      return;
    } // run the touch-action polyfill


    this.touchAction.preventDefaults(inputData);
    var recognizer;
    var recognizers = this.recognizers; // this holds the recognizer that is being recognized.
    // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
    // if no recognizer is detecting a thing, it is set to `null`

    var curRecognizer = session.curRecognizer; // reset when the last recognizer is recognized
    // or when we're in a new session

    if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
      session.curRecognizer = null;
      curRecognizer = null;
    }

    var i = 0;

    while (i < recognizers.length) {
      recognizer = recognizers[i]; // find out if we are allowed try to recognize the input for this one.
      // 1.   allow if the session is NOT forced stopped (see the .stop() method)
      // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
      //      that is being recognized.
      // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
      //      this can be setup with the `recognizeWith()` method on the recognizer.

      if (session.stopped !== FORCED_STOP && ( // 1
      !curRecognizer || recognizer === curRecognizer || // 2
      recognizer.canRecognizeWith(curRecognizer))) {
        // 3
        recognizer.recognize(inputData);
      } else {
        recognizer.reset();
      } // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
      // current active recognizer. but only if we don't already have an active recognizer


      if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
        session.curRecognizer = recognizer;
        curRecognizer = recognizer;
      }

      i++;
    }
  };
  /**
   * @private
   * get a recognizer by its event name.
   * @param {Recognizer|String} recognizer
   * @returns {Recognizer|Null}
   */


  _proto.get = function get(recognizer) {
    if (recognizer instanceof Recognizer) {
      return recognizer;
    }

    var recognizers = this.recognizers;

    for (var i = 0; i < recognizers.length; i++) {
      if (recognizers[i].options.event === recognizer) {
        return recognizers[i];
      }
    }

    return null;
  };
  /**
   * @private add a recognizer to the manager
   * existing recognizers with the same event name will be removed
   * @param {Recognizer} recognizer
   * @returns {Recognizer|Manager}
   */


  _proto.add = function add(recognizer) {
    if (invokeArrayArg(recognizer, "add", this)) {
      return this;
    } // remove existing


    var existing = this.get(recognizer.options.event);

    if (existing) {
      this.remove(existing);
    }

    this.recognizers.push(recognizer);
    recognizer.manager = this;
    this.touchAction.update();
    return recognizer;
  };
  /**
   * @private
   * remove a recognizer by name or instance
   * @param {Recognizer|String} recognizer
   * @returns {Manager}
   */


  _proto.remove = function remove(recognizer) {
    if (invokeArrayArg(recognizer, "remove", this)) {
      return this;
    }

    var targetRecognizer = this.get(recognizer); // let's make sure this recognizer exists

    if (recognizer) {
      var recognizers = this.recognizers;
      var index = inArray(recognizers, targetRecognizer);

      if (index !== -1) {
        recognizers.splice(index, 1);
        this.touchAction.update();
      }
    }

    return this;
  };
  /**
   * @private
   * bind event
   * @param {String} events
   * @param {Function} handler
   * @returns {EventEmitter} this
   */


  _proto.on = function on(events, handler) {
    if (events === undefined || handler === undefined) {
      return this;
    }

    var handlers = this.handlers;
    each(splitStr(events), function (event) {
      handlers[event] = handlers[event] || [];
      handlers[event].push(handler);
    });
    return this;
  };
  /**
   * @private unbind event, leave emit blank to remove all handlers
   * @param {String} events
   * @param {Function} [handler]
   * @returns {EventEmitter} this
   */


  _proto.off = function off(events, handler) {
    if (events === undefined) {
      return this;
    }

    var handlers = this.handlers;
    each(splitStr(events), function (event) {
      if (!handler) {
        delete handlers[event];
      } else {
        handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
      }
    });
    return this;
  };
  /**
   * @private emit event to the listeners
   * @param {String} event
   * @param {Object} data
   */


  _proto.emit = function emit(event, data) {
    // we also want to trigger dom events
    if (this.options.domEvents) {
      triggerDomEvent(event, data);
    } // no handlers, so skip it all


    var handlers = this.handlers[event] && this.handlers[event].slice();

    if (!handlers || !handlers.length) {
      return;
    }

    data.type = event;

    data.preventDefault = function () {
      data.srcEvent.preventDefault();
    };

    var i = 0;

    while (i < handlers.length) {
      handlers[i](data);
      i++;
    }
  };
  /**
   * @private
   * destroy the manager and unbinds all events
   * it doesn't unbind dom events, that is the user own responsibility
   */


  _proto.destroy = function destroy() {
    this.element && toggleCssProps(this, false);
    this.handlers = {};
    this.session = {};
    this.input.destroy();
    this.element = null;
  };

  return Manager;
}();

var SINGLE_TOUCH_INPUT_MAP = {
  touchstart: INPUT_START,
  touchmove: INPUT_MOVE,
  touchend: INPUT_END,
  touchcancel: INPUT_CANCEL
};
var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';
/**
 * @private
 * Touch events input
 * @constructor
 * @extends Input
 */

var SingleTouchInput =
/*#__PURE__*/
function (_Input) {
  _inheritsLoose(SingleTouchInput, _Input);

  function SingleTouchInput() {
    var _this;

    var proto = SingleTouchInput.prototype;
    proto.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    proto.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    _this = _Input.apply(this, arguments) || this;
    _this.started = false;
    return _this;
  }

  var _proto = SingleTouchInput.prototype;

  _proto.handler = function handler(ev) {
    var type = SINGLE_TOUCH_INPUT_MAP[ev.type]; // should we handle the touch events?

    if (type === INPUT_START) {
      this.started = true;
    }

    if (!this.started) {
      return;
    }

    var touches = normalizeSingleTouches.call(this, ev, type); // when done, reset the started state

    if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
      this.started = false;
    }

    this.callback(this.manager, type, {
      pointers: touches[0],
      changedPointers: touches[1],
      pointerType: INPUT_TYPE_TOUCH,
      srcEvent: ev
    });
  };

  return SingleTouchInput;
}(Input);

function normalizeSingleTouches(ev, type) {
  var all = toArray(ev.touches);
  var changed = toArray(ev.changedTouches);

  if (type & (INPUT_END | INPUT_CANCEL)) {
    all = uniqueArray(all.concat(changed), 'identifier', true);
  }

  return [all, changed];
}

/**
 * @private
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
  var deprecationMessage = "DEPRECATED METHOD: " + name + "\n" + message + " AT \n";
  return function () {
    var e = new Error('get-stack-trace');
    var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '').replace(/^\s+at\s+/gm, '').replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';
    var log = window.console && (window.console.warn || window.console.log);

    if (log) {
      log.call(window.console, deprecationMessage, stack);
    }

    return method.apply(this, arguments);
  };
}

/**
 * @private
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */

var extend = deprecate(function (dest, src, merge) {
  var keys = Object.keys(src);
  var i = 0;

  while (i < keys.length) {
    if (!merge || merge && dest[keys[i]] === undefined) {
      dest[keys[i]] = src[keys[i]];
    }

    i++;
  }

  return dest;
}, 'extend', 'Use `assign`.');

/**
 * @private
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */

var merge = deprecate(function (dest, src) {
  return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * @private
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */

function inherit(child, base, properties) {
  var baseP = base.prototype;
  var childP;
  childP = child.prototype = Object.create(baseP);
  childP.constructor = child;
  childP._super = baseP;

  if (properties) {
    assign$1$1(childP, properties);
  }
}

/**
 * @private
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
  return function boundFn() {
    return fn.apply(context, arguments);
  };
}

/**
 * @private
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */

var Hammer =
/*#__PURE__*/
function () {
  var Hammer =
  /**
    * @private
    * @const {string}
    */
  function Hammer(element, options) {
    if (options === void 0) {
      options = {};
    }

    return new Manager(element, _extends({
      recognizers: preset.concat()
    }, options));
  };

  Hammer.VERSION = "2.0.17-rc";
  Hammer.DIRECTION_ALL = DIRECTION_ALL;
  Hammer.DIRECTION_DOWN = DIRECTION_DOWN;
  Hammer.DIRECTION_LEFT = DIRECTION_LEFT;
  Hammer.DIRECTION_RIGHT = DIRECTION_RIGHT;
  Hammer.DIRECTION_UP = DIRECTION_UP;
  Hammer.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
  Hammer.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
  Hammer.DIRECTION_NONE = DIRECTION_NONE;
  Hammer.DIRECTION_DOWN = DIRECTION_DOWN;
  Hammer.INPUT_START = INPUT_START;
  Hammer.INPUT_MOVE = INPUT_MOVE;
  Hammer.INPUT_END = INPUT_END;
  Hammer.INPUT_CANCEL = INPUT_CANCEL;
  Hammer.STATE_POSSIBLE = STATE_POSSIBLE;
  Hammer.STATE_BEGAN = STATE_BEGAN;
  Hammer.STATE_CHANGED = STATE_CHANGED;
  Hammer.STATE_ENDED = STATE_ENDED;
  Hammer.STATE_RECOGNIZED = STATE_RECOGNIZED;
  Hammer.STATE_CANCELLED = STATE_CANCELLED;
  Hammer.STATE_FAILED = STATE_FAILED;
  Hammer.Manager = Manager;
  Hammer.Input = Input;
  Hammer.TouchAction = TouchAction;
  Hammer.TouchInput = TouchInput;
  Hammer.MouseInput = MouseInput;
  Hammer.PointerEventInput = PointerEventInput;
  Hammer.TouchMouseInput = TouchMouseInput;
  Hammer.SingleTouchInput = SingleTouchInput;
  Hammer.Recognizer = Recognizer;
  Hammer.AttrRecognizer = AttrRecognizer;
  Hammer.Tap = TapRecognizer;
  Hammer.Pan = PanRecognizer;
  Hammer.Swipe = SwipeRecognizer;
  Hammer.Pinch = PinchRecognizer;
  Hammer.Rotate = RotateRecognizer;
  Hammer.Press = PressRecognizer;
  Hammer.on = addEventListeners;
  Hammer.off = removeEventListeners;
  Hammer.each = each;
  Hammer.merge = merge;
  Hammer.extend = extend;
  Hammer.bindFn = bindFn;
  Hammer.assign = assign$1$1;
  Hammer.inherit = inherit;
  Hammer.bindFn = bindFn;
  Hammer.prefixed = prefixed;
  Hammer.toArray = toArray;
  Hammer.inArray = inArray;
  Hammer.uniqueArray = uniqueArray;
  Hammer.splitStr = splitStr;
  Hammer.boolOrFn = boolOrFn;
  Hammer.hasParent = hasParent;
  Hammer.addEventListeners = addEventListeners;
  Hammer.removeEventListeners = removeEventListeners;
  Hammer.defaults = assign$1$1({}, defaults, {
    preset: preset
  });
  return Hammer;
}();

/**
 * vis-util
 * https://github.com/visjs/vis-util
 *
 * utilitie collection for visjs
 *
 * @version 6.0.0
 * @date    2025-07-12T18:02:43.836Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */


/**
 * Use this symbol to delete properies in deepObjectAssign.
 */
const DELETE = Symbol("DELETE");
/**
 * Pure version of deepObjectAssign, it doesn't modify any of it's arguments.
 * @param base - The base object that fullfils the whole interface T.
 * @param updates - Updates that may change or delete props.
 * @returns A brand new instance with all the supplied objects deeply merged.
 */
function pureDeepObjectAssign(base, ...updates) {
    return deepObjectAssign({}, base, ...updates);
}
/**
 * Deep version of object assign with additional deleting by the DELETE symbol.
 * @param values - Objects to be deeply merged.
 * @returns The first object from values.
 */
function deepObjectAssign(...values) {
    const merged = deepObjectAssignNonentry(...values);
    stripDelete(merged);
    return merged;
}
/**
 * Deep version of object assign with additional deleting by the DELETE symbol.
 * @remarks
 * This doesn't strip the DELETE symbols so they may end up in the final object.
 * @param values - Objects to be deeply merged.
 * @returns The first object from values.
 */
function deepObjectAssignNonentry(...values) {
    if (values.length < 2) {
        return values[0];
    }
    else if (values.length > 2) {
        return deepObjectAssignNonentry(deepObjectAssign(values[0], values[1]), ...values.slice(2));
    }
    const a = values[0];
    const b = values[1];
    if (a instanceof Date && b instanceof Date) {
        a.setTime(b.getTime());
        return a;
    }
    for (const prop of Reflect.ownKeys(b)) {
        if (!Object.prototype.propertyIsEnumerable.call(b, prop)) ;
        else if (b[prop] === DELETE) {
            delete a[prop];
        }
        else if (a[prop] !== null &&
            b[prop] !== null &&
            typeof a[prop] === "object" &&
            typeof b[prop] === "object" &&
            !Array.isArray(a[prop]) &&
            !Array.isArray(b[prop])) {
            a[prop] = deepObjectAssignNonentry(a[prop], b[prop]);
        }
        else {
            a[prop] = clone(b[prop]);
        }
    }
    return a;
}
/**
 * Deep clone given object or array. In case of primitive simply return.
 * @param a - Anything.
 * @returns Deep cloned object/array or unchanged a.
 */
function clone(a) {
    if (Array.isArray(a)) {
        return a.map((value) => clone(value));
    }
    else if (typeof a === "object" && a !== null) {
        if (a instanceof Date) {
            return new Date(a.getTime());
        }
        return deepObjectAssignNonentry({}, a);
    }
    else {
        return a;
    }
}
/**
 * Strip DELETE from given object.
 * @param a - Object which may contain DELETE but won't after this is executed.
 */
function stripDelete(a) {
    for (const prop of Object.keys(a)) {
        if (a[prop] === DELETE) {
            delete a[prop];
        }
        else if (typeof a[prop] === "object" && a[prop] !== null) {
            stripDelete(a[prop]);
        }
    }
}

/**
 * Setup a mock hammer.js object, for unit testing.
 *
 * Inspiration: https://github.com/uber/deck.gl/pull/658
 * @returns {{on: noop, off: noop, destroy: noop, emit: noop, get: get}}
 */
function hammerMock() {
  const noop = () => {};

  return {
    on: noop,
    off: noop,
    destroy: noop,
    emit: noop,

    get() {
      return {
        set: noop,
      };
    },
  };
}

const Hammer$1 =
  typeof window !== "undefined"
    ? window.Hammer || Hammer
    : function () {
        // hammer.js is only available in a browser, not in node.js. Replacing it with a mock object.
        return hammerMock();
      };

/**
 * Turn an element into an clickToUse element.
 * When not active, the element has a transparent overlay. When the overlay is
 * clicked, the mode is changed to active.
 * When active, the element is displayed with a blue border around it, and
 * the interactive contents of the element can be used. When clicked outside
 * the element, the elements mode is changed to inactive.
 * @param {Element} container
 * @class Activator
 */
function Activator$1(container) {
  this._cleanupQueue = [];

  this.active = false;

  this._dom = {
    container,
    overlay: document.createElement("div"),
  };

  this._dom.overlay.classList.add("vis-overlay");

  this._dom.container.appendChild(this._dom.overlay);
  this._cleanupQueue.push(() => {
    this._dom.overlay.parentNode.removeChild(this._dom.overlay);
  });

  const hammer = Hammer$1(this._dom.overlay);
  hammer.on("tap", this._onTapOverlay.bind(this));
  this._cleanupQueue.push(() => {
    hammer.destroy();
    // FIXME: cleaning up hammer instances doesn't work (Timeline not removed
    // from memory)
  });

  // block all touch events (except tap)
  const events = [
    "tap",
    "doubletap",
    "press",
    "pinch",
    "pan",
    "panstart",
    "panmove",
    "panend",
  ];
  events.forEach((event) => {
    hammer.on(event, (event) => {
      event.srcEvent.stopPropagation();
    });
  });

  // attach a click event to the window, in order to deactivate when clicking outside the timeline
  if (document && document.body) {
    this._onClick = (event) => {
      if (!_hasParent(event.target, container)) {
        this.deactivate();
      }
    };
    document.body.addEventListener("click", this._onClick);
    this._cleanupQueue.push(() => {
      document.body.removeEventListener("click", this._onClick);
    });
  }

  // prepare escape key listener for deactivating when active
  this._escListener = (event) => {
    if (
      "key" in event
        ? event.key === "Escape"
        : event.keyCode === 27 /* the keyCode is for IE11 */
    ) {
      this.deactivate();
    }
  };
}

// turn into an event emitter
Emitter(Activator$1.prototype);

// The currently active activator
Activator$1.current = null;

/**
 * Destroy the activator. Cleans up all created DOM and event listeners
 */
Activator$1.prototype.destroy = function () {
  this.deactivate();

  for (const callback of this._cleanupQueue.splice(0).reverse()) {
    callback();
  }
};

/**
 * Activate the element
 * Overlay is hidden, element is decorated with a blue shadow border
 */
Activator$1.prototype.activate = function () {
  // we allow only one active activator at a time
  if (Activator$1.current) {
    Activator$1.current.deactivate();
  }
  Activator$1.current = this;

  this.active = true;
  this._dom.overlay.style.display = "none";
  this._dom.container.classList.add("vis-active");

  this.emit("change");
  this.emit("activate");

  // ugly hack: bind ESC after emitting the events, as the Network rebinds all
  // keyboard events on a 'change' event
  document.body.addEventListener("keydown", this._escListener);
};

/**
 * Deactivate the element
 * Overlay is displayed on top of the element
 */
Activator$1.prototype.deactivate = function () {
  this.active = false;
  this._dom.overlay.style.display = "block";
  this._dom.container.classList.remove("vis-active");
  document.body.removeEventListener("keydown", this._escListener);

  this.emit("change");
  this.emit("deactivate");
};

/**
 * Handle a tap event: activate the container
 * @param {Event}  event   The event
 * @private
 */
Activator$1.prototype._onTapOverlay = function (event) {
  // activate the container
  this.activate();
  event.srcEvent.stopPropagation();
};

/**
 * Test whether the element has the requested parent element somewhere in
 * its chain of parent nodes.
 * @param {HTMLElement} element
 * @param {HTMLElement} parent
 * @returns {boolean} Returns true when the parent is found somewhere in the
 *                    chain of parent nodes.
 * @private
 */
function _hasParent(element, parent) {
  while (element) {
    if (element === parent) {
      return true;
    }
    element = element.parentNode;
  }
  return false;
}

var getOwnPropertySymbols$2;
var hasRequiredGetOwnPropertySymbols$2;

function requireGetOwnPropertySymbols$2 () {
	if (hasRequiredGetOwnPropertySymbols$2) return getOwnPropertySymbols$2;
	hasRequiredGetOwnPropertySymbols$2 = 1;
	requireEs_symbol();
	var path = /*@__PURE__*/ requirePath();

	getOwnPropertySymbols$2 = path.Object.getOwnPropertySymbols;
	return getOwnPropertySymbols$2;
}

var getOwnPropertySymbols$1;
var hasRequiredGetOwnPropertySymbols$1;

function requireGetOwnPropertySymbols$1 () {
	if (hasRequiredGetOwnPropertySymbols$1) return getOwnPropertySymbols$1;
	hasRequiredGetOwnPropertySymbols$1 = 1;
	var parent = /*@__PURE__*/ requireGetOwnPropertySymbols$2();

	getOwnPropertySymbols$1 = parent;
	return getOwnPropertySymbols$1;
}

var getOwnPropertySymbols;
var hasRequiredGetOwnPropertySymbols;

function requireGetOwnPropertySymbols () {
	if (hasRequiredGetOwnPropertySymbols) return getOwnPropertySymbols;
	hasRequiredGetOwnPropertySymbols = 1;
	getOwnPropertySymbols = /*@__PURE__*/ requireGetOwnPropertySymbols$1();
	return getOwnPropertySymbols;
}

var getOwnPropertySymbolsExports = requireGetOwnPropertySymbols();
var _Object$getOwnPropertySymbols = /*@__PURE__*/getDefaultExportFromCjs(getOwnPropertySymbolsExports);

var getOwnPropertyDescriptor$2 = {exports: {}};

var es_object_getOwnPropertyDescriptor = {};

var hasRequiredEs_object_getOwnPropertyDescriptor;

function requireEs_object_getOwnPropertyDescriptor () {
	if (hasRequiredEs_object_getOwnPropertyDescriptor) return es_object_getOwnPropertyDescriptor;
	hasRequiredEs_object_getOwnPropertyDescriptor = 1;
	var $ = /*@__PURE__*/ require_export();
	var fails = /*@__PURE__*/ requireFails();
	var toIndexedObject = /*@__PURE__*/ requireToIndexedObject();
	var nativeGetOwnPropertyDescriptor = /*@__PURE__*/ requireObjectGetOwnPropertyDescriptor().f;
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();

	var FORCED = !DESCRIPTORS || fails(function () { nativeGetOwnPropertyDescriptor(1); });

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
	  }
	});
	return es_object_getOwnPropertyDescriptor;
}

var hasRequiredGetOwnPropertyDescriptor$2;

function requireGetOwnPropertyDescriptor$2 () {
	if (hasRequiredGetOwnPropertyDescriptor$2) return getOwnPropertyDescriptor$2.exports;
	hasRequiredGetOwnPropertyDescriptor$2 = 1;
	requireEs_object_getOwnPropertyDescriptor();
	var path = /*@__PURE__*/ requirePath();

	var Object = path.Object;

	var getOwnPropertyDescriptor = getOwnPropertyDescriptor$2.exports = function getOwnPropertyDescriptor(it, key) {
	  return Object.getOwnPropertyDescriptor(it, key);
	};

	if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;
	return getOwnPropertyDescriptor$2.exports;
}

var getOwnPropertyDescriptor$1;
var hasRequiredGetOwnPropertyDescriptor$1;

function requireGetOwnPropertyDescriptor$1 () {
	if (hasRequiredGetOwnPropertyDescriptor$1) return getOwnPropertyDescriptor$1;
	hasRequiredGetOwnPropertyDescriptor$1 = 1;
	var parent = /*@__PURE__*/ requireGetOwnPropertyDescriptor$2();

	getOwnPropertyDescriptor$1 = parent;
	return getOwnPropertyDescriptor$1;
}

var getOwnPropertyDescriptor;
var hasRequiredGetOwnPropertyDescriptor;

function requireGetOwnPropertyDescriptor () {
	if (hasRequiredGetOwnPropertyDescriptor) return getOwnPropertyDescriptor;
	hasRequiredGetOwnPropertyDescriptor = 1;
	getOwnPropertyDescriptor = /*@__PURE__*/ requireGetOwnPropertyDescriptor$1();
	return getOwnPropertyDescriptor;
}

var getOwnPropertyDescriptorExports = requireGetOwnPropertyDescriptor();
var _Object$getOwnPropertyDescriptor = /*@__PURE__*/getDefaultExportFromCjs(getOwnPropertyDescriptorExports);

var es_array_forEach = {};

var arrayForEach;
var hasRequiredArrayForEach;

function requireArrayForEach () {
	if (hasRequiredArrayForEach) return arrayForEach;
	hasRequiredArrayForEach = 1;
	var $forEach = /*@__PURE__*/ requireArrayIteration().forEach;
	var arrayMethodIsStrict = /*@__PURE__*/ requireArrayMethodIsStrict();

	var STRICT_METHOD = arrayMethodIsStrict('forEach');

	// `Array.prototype.forEach` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	} : [].forEach;
	return arrayForEach;
}

var hasRequiredEs_array_forEach;

function requireEs_array_forEach () {
	if (hasRequiredEs_array_forEach) return es_array_forEach;
	hasRequiredEs_array_forEach = 1;
	var $ = /*@__PURE__*/ require_export();
	var forEach = /*@__PURE__*/ requireArrayForEach();

	// `Array.prototype.forEach` method
	// https://tc39.es/ecma262/#sec-array.prototype.foreach
	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
	$({ target: 'Array', proto: true, forced: [].forEach !== forEach }, {
	  forEach: forEach
	});
	return es_array_forEach;
}

var forEach$3;
var hasRequiredForEach$3;

function requireForEach$3 () {
	if (hasRequiredForEach$3) return forEach$3;
	hasRequiredForEach$3 = 1;
	requireEs_array_forEach();
	var getBuiltInPrototypeMethod = /*@__PURE__*/ requireGetBuiltInPrototypeMethod();

	forEach$3 = getBuiltInPrototypeMethod('Array', 'forEach');
	return forEach$3;
}

var forEach$2;
var hasRequiredForEach$2;

function requireForEach$2 () {
	if (hasRequiredForEach$2) return forEach$2;
	hasRequiredForEach$2 = 1;
	var parent = /*@__PURE__*/ requireForEach$3();

	forEach$2 = parent;
	return forEach$2;
}

var forEach$1;
var hasRequiredForEach$1;

function requireForEach$1 () {
	if (hasRequiredForEach$1) return forEach$1;
	hasRequiredForEach$1 = 1;
	var classof = /*@__PURE__*/ requireClassof();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var method = /*@__PURE__*/ requireForEach$2();

	var ArrayPrototype = Array.prototype;

	var DOMIterables = {
	  DOMTokenList: true,
	  NodeList: true
	};

	forEach$1 = function (it) {
	  var own = it.forEach;
	  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.forEach)
	    || hasOwn(DOMIterables, classof(it)) ? method : own;
	};
	return forEach$1;
}

var forEach;
var hasRequiredForEach;

function requireForEach () {
	if (hasRequiredForEach) return forEach;
	hasRequiredForEach = 1;
	forEach = /*@__PURE__*/ requireForEach$1();
	return forEach;
}

var forEachExports = requireForEach();
var _forEachInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(forEachExports);

var es_object_getOwnPropertyDescriptors = {};

var ownKeys$4;
var hasRequiredOwnKeys$3;

function requireOwnKeys$3 () {
	if (hasRequiredOwnKeys$3) return ownKeys$4;
	hasRequiredOwnKeys$3 = 1;
	var getBuiltIn = /*@__PURE__*/ requireGetBuiltIn();
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var getOwnPropertyNamesModule = /*@__PURE__*/ requireObjectGetOwnPropertyNames();
	var getOwnPropertySymbolsModule = /*@__PURE__*/ requireObjectGetOwnPropertySymbols();
	var anObject = /*@__PURE__*/ requireAnObject();

	var concat = uncurryThis([].concat);

	// all object keys, includes non-enumerable and symbols
	ownKeys$4 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = getOwnPropertyNamesModule.f(anObject(it));
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
	};
	return ownKeys$4;
}

var hasRequiredEs_object_getOwnPropertyDescriptors;

function requireEs_object_getOwnPropertyDescriptors () {
	if (hasRequiredEs_object_getOwnPropertyDescriptors) return es_object_getOwnPropertyDescriptors;
	hasRequiredEs_object_getOwnPropertyDescriptors = 1;
	var $ = /*@__PURE__*/ require_export();
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var ownKeys = /*@__PURE__*/ requireOwnKeys$3();
	var toIndexedObject = /*@__PURE__*/ requireToIndexedObject();
	var getOwnPropertyDescriptorModule = /*@__PURE__*/ requireObjectGetOwnPropertyDescriptor();
	var createProperty = /*@__PURE__*/ requireCreateProperty();

	// `Object.getOwnPropertyDescriptors` method
	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
	$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject(object);
	    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	    var keys = ownKeys(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;
	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty(result, key, descriptor);
	    }
	    return result;
	  }
	});
	return es_object_getOwnPropertyDescriptors;
}

var getOwnPropertyDescriptors$2;
var hasRequiredGetOwnPropertyDescriptors$2;

function requireGetOwnPropertyDescriptors$2 () {
	if (hasRequiredGetOwnPropertyDescriptors$2) return getOwnPropertyDescriptors$2;
	hasRequiredGetOwnPropertyDescriptors$2 = 1;
	requireEs_object_getOwnPropertyDescriptors();
	var path = /*@__PURE__*/ requirePath();

	getOwnPropertyDescriptors$2 = path.Object.getOwnPropertyDescriptors;
	return getOwnPropertyDescriptors$2;
}

var getOwnPropertyDescriptors$1;
var hasRequiredGetOwnPropertyDescriptors$1;

function requireGetOwnPropertyDescriptors$1 () {
	if (hasRequiredGetOwnPropertyDescriptors$1) return getOwnPropertyDescriptors$1;
	hasRequiredGetOwnPropertyDescriptors$1 = 1;
	var parent = /*@__PURE__*/ requireGetOwnPropertyDescriptors$2();

	getOwnPropertyDescriptors$1 = parent;
	return getOwnPropertyDescriptors$1;
}

var getOwnPropertyDescriptors;
var hasRequiredGetOwnPropertyDescriptors;

function requireGetOwnPropertyDescriptors () {
	if (hasRequiredGetOwnPropertyDescriptors) return getOwnPropertyDescriptors;
	hasRequiredGetOwnPropertyDescriptors = 1;
	getOwnPropertyDescriptors = /*@__PURE__*/ requireGetOwnPropertyDescriptors$1();
	return getOwnPropertyDescriptors;
}

var getOwnPropertyDescriptorsExports = requireGetOwnPropertyDescriptors();
var _Object$getOwnPropertyDescriptors = /*@__PURE__*/getDefaultExportFromCjs(getOwnPropertyDescriptorsExports);

var defineProperties$2 = {exports: {}};

var es_object_defineProperties = {};

var hasRequiredEs_object_defineProperties;

function requireEs_object_defineProperties () {
	if (hasRequiredEs_object_defineProperties) return es_object_defineProperties;
	hasRequiredEs_object_defineProperties = 1;
	var $ = /*@__PURE__*/ require_export();
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var defineProperties = /*@__PURE__*/ requireObjectDefineProperties().f;

	// `Object.defineProperties` method
	// https://tc39.es/ecma262/#sec-object.defineproperties
	// eslint-disable-next-line es/no-object-defineproperties -- safe
	$({ target: 'Object', stat: true, forced: Object.defineProperties !== defineProperties, sham: !DESCRIPTORS }, {
	  defineProperties: defineProperties
	});
	return es_object_defineProperties;
}

var hasRequiredDefineProperties$2;

function requireDefineProperties$2 () {
	if (hasRequiredDefineProperties$2) return defineProperties$2.exports;
	hasRequiredDefineProperties$2 = 1;
	requireEs_object_defineProperties();
	var path = /*@__PURE__*/ requirePath();

	var Object = path.Object;

	var defineProperties = defineProperties$2.exports = function defineProperties(T, D) {
	  return Object.defineProperties(T, D);
	};

	if (Object.defineProperties.sham) defineProperties.sham = true;
	return defineProperties$2.exports;
}

var defineProperties$1;
var hasRequiredDefineProperties$1;

function requireDefineProperties$1 () {
	if (hasRequiredDefineProperties$1) return defineProperties$1;
	hasRequiredDefineProperties$1 = 1;
	var parent = /*@__PURE__*/ requireDefineProperties$2();

	defineProperties$1 = parent;
	return defineProperties$1;
}

var defineProperties;
var hasRequiredDefineProperties;

function requireDefineProperties () {
	if (hasRequiredDefineProperties) return defineProperties;
	hasRequiredDefineProperties = 1;
	defineProperties = /*@__PURE__*/ requireDefineProperties$1();
	return defineProperties;
}

var definePropertiesExports = requireDefineProperties();
var _Object$defineProperties = /*@__PURE__*/getDefaultExportFromCjs(definePropertiesExports);

var defineProperty;
var hasRequiredDefineProperty;

function requireDefineProperty () {
	if (hasRequiredDefineProperty) return defineProperty;
	hasRequiredDefineProperty = 1;
	defineProperty = /*@__PURE__*/ requireDefineProperty$4();
	return defineProperty;
}

var definePropertyExports = requireDefineProperty();
var _Object$defineProperty = /*@__PURE__*/getDefaultExportFromCjs(definePropertyExports);

var es_array_isArray = {};

var hasRequiredEs_array_isArray;

function requireEs_array_isArray () {
	if (hasRequiredEs_array_isArray) return es_array_isArray;
	hasRequiredEs_array_isArray = 1;
	var $ = /*@__PURE__*/ require_export();
	var isArray = /*@__PURE__*/ requireIsArray$3();

	// `Array.isArray` method
	// https://tc39.es/ecma262/#sec-array.isarray
	$({ target: 'Array', stat: true }, {
	  isArray: isArray
	});
	return es_array_isArray;
}

var isArray$2;
var hasRequiredIsArray$2;

function requireIsArray$2 () {
	if (hasRequiredIsArray$2) return isArray$2;
	hasRequiredIsArray$2 = 1;
	requireEs_array_isArray();
	var path = /*@__PURE__*/ requirePath();

	isArray$2 = path.Array.isArray;
	return isArray$2;
}

var isArray$1;
var hasRequiredIsArray$1;

function requireIsArray$1 () {
	if (hasRequiredIsArray$1) return isArray$1;
	hasRequiredIsArray$1 = 1;
	var parent = /*@__PURE__*/ requireIsArray$2();

	isArray$1 = parent;
	return isArray$1;
}

var isArray;
var hasRequiredIsArray;

function requireIsArray () {
	if (hasRequiredIsArray) return isArray;
	hasRequiredIsArray = 1;
	isArray = /*@__PURE__*/ requireIsArray$1();
	return isArray;
}

var isArrayExports = requireIsArray();
var _Array$isArray = /*@__PURE__*/getDefaultExportFromCjs(isArrayExports);

var es_map = {};

var es_map_constructor = {};

var internalMetadata = {exports: {}};

var arrayBufferNonExtensible;
var hasRequiredArrayBufferNonExtensible;

function requireArrayBufferNonExtensible () {
	if (hasRequiredArrayBufferNonExtensible) return arrayBufferNonExtensible;
	hasRequiredArrayBufferNonExtensible = 1;
	// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
	var fails = /*@__PURE__*/ requireFails();

	arrayBufferNonExtensible = fails(function () {
	  if (typeof ArrayBuffer == 'function') {
	    var buffer = new ArrayBuffer(8);
	    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
	    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
	  }
	});
	return arrayBufferNonExtensible;
}

var objectIsExtensible;
var hasRequiredObjectIsExtensible;

function requireObjectIsExtensible () {
	if (hasRequiredObjectIsExtensible) return objectIsExtensible;
	hasRequiredObjectIsExtensible = 1;
	var fails = /*@__PURE__*/ requireFails();
	var isObject = /*@__PURE__*/ requireIsObject();
	var classof = /*@__PURE__*/ requireClassofRaw();
	var ARRAY_BUFFER_NON_EXTENSIBLE = /*@__PURE__*/ requireArrayBufferNonExtensible();

	// eslint-disable-next-line es/no-object-isextensible -- safe
	var $isExtensible = Object.isExtensible;
	var FAILS_ON_PRIMITIVES = fails(function () { });

	// `Object.isExtensible` method
	// https://tc39.es/ecma262/#sec-object.isextensible
	objectIsExtensible = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
	  if (!isObject(it)) return false;
	  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === 'ArrayBuffer') return false;
	  return $isExtensible ? $isExtensible(it) : true;
	} : $isExtensible;
	return objectIsExtensible;
}

var freezing;
var hasRequiredFreezing;

function requireFreezing () {
	if (hasRequiredFreezing) return freezing;
	hasRequiredFreezing = 1;
	var fails = /*@__PURE__*/ requireFails();

	freezing = !fails(function () {
	  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
	  return Object.isExtensible(Object.preventExtensions({}));
	});
	return freezing;
}

var hasRequiredInternalMetadata;

function requireInternalMetadata () {
	if (hasRequiredInternalMetadata) return internalMetadata.exports;
	hasRequiredInternalMetadata = 1;
	var $ = /*@__PURE__*/ require_export();
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var hiddenKeys = /*@__PURE__*/ requireHiddenKeys();
	var isObject = /*@__PURE__*/ requireIsObject();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var defineProperty = /*@__PURE__*/ requireObjectDefineProperty().f;
	var getOwnPropertyNamesModule = /*@__PURE__*/ requireObjectGetOwnPropertyNames();
	var getOwnPropertyNamesExternalModule = /*@__PURE__*/ requireObjectGetOwnPropertyNamesExternal();
	var isExtensible = /*@__PURE__*/ requireObjectIsExtensible();
	var uid = /*@__PURE__*/ requireUid();
	var FREEZING = /*@__PURE__*/ requireFreezing();

	var REQUIRED = false;
	var METADATA = uid('meta');
	var id = 0;

	var setMetadata = function (it) {
	  defineProperty(it, METADATA, { value: {
	    objectID: 'O' + id++, // object ID
	    weakData: {}          // weak collections IDs
	  } });
	};

	var fastKey = function (it, create) {
	  // return a primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!hasOwn(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMetadata(it);
	  // return object ID
	  } return it[METADATA].objectID;
	};

	var getWeakData = function (it, create) {
	  if (!hasOwn(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMetadata(it);
	  // return the store of weak collections IDs
	  } return it[METADATA].weakData;
	};

	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
	  return it;
	};

	var enable = function () {
	  meta.enable = function () { /* empty */ };
	  REQUIRED = true;
	  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
	  var splice = uncurryThis([].splice);
	  var test = {};
	  test[METADATA] = 1;

	  // prevent exposing of metadata key
	  if (getOwnPropertyNames(test).length) {
	    getOwnPropertyNamesModule.f = function (it) {
	      var result = getOwnPropertyNames(it);
	      for (var i = 0, length = result.length; i < length; i++) {
	        if (result[i] === METADATA) {
	          splice(result, i, 1);
	          break;
	        }
	      } return result;
	    };

	    $({ target: 'Object', stat: true, forced: true }, {
	      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
	    });
	  }
	};

	var meta = internalMetadata.exports = {
	  enable: enable,
	  fastKey: fastKey,
	  getWeakData: getWeakData,
	  onFreeze: onFreeze
	};

	hiddenKeys[METADATA] = true;
	return internalMetadata.exports;
}

var isArrayIteratorMethod;
var hasRequiredIsArrayIteratorMethod;

function requireIsArrayIteratorMethod () {
	if (hasRequiredIsArrayIteratorMethod) return isArrayIteratorMethod;
	hasRequiredIsArrayIteratorMethod = 1;
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();
	var Iterators = /*@__PURE__*/ requireIterators();

	var ITERATOR = wellKnownSymbol('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	isArrayIteratorMethod = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
	};
	return isArrayIteratorMethod;
}

var getIteratorMethod;
var hasRequiredGetIteratorMethod;

function requireGetIteratorMethod () {
	if (hasRequiredGetIteratorMethod) return getIteratorMethod;
	hasRequiredGetIteratorMethod = 1;
	var classof = /*@__PURE__*/ requireClassof();
	var getMethod = /*@__PURE__*/ requireGetMethod();
	var isNullOrUndefined = /*@__PURE__*/ requireIsNullOrUndefined();
	var Iterators = /*@__PURE__*/ requireIterators();
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();

	var ITERATOR = wellKnownSymbol('iterator');

	getIteratorMethod = function (it) {
	  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
	    || getMethod(it, '@@iterator')
	    || Iterators[classof(it)];
	};
	return getIteratorMethod;
}

var getIterator$5;
var hasRequiredGetIterator$6;

function requireGetIterator$6 () {
	if (hasRequiredGetIterator$6) return getIterator$5;
	hasRequiredGetIterator$6 = 1;
	var call = /*@__PURE__*/ requireFunctionCall();
	var aCallable = /*@__PURE__*/ requireACallable();
	var anObject = /*@__PURE__*/ requireAnObject();
	var tryToString = /*@__PURE__*/ requireTryToString();
	var getIteratorMethod = /*@__PURE__*/ requireGetIteratorMethod();

	var $TypeError = TypeError;

	getIterator$5 = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
	  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
	  throw new $TypeError(tryToString(argument) + ' is not iterable');
	};
	return getIterator$5;
}

var iteratorClose;
var hasRequiredIteratorClose;

function requireIteratorClose () {
	if (hasRequiredIteratorClose) return iteratorClose;
	hasRequiredIteratorClose = 1;
	var call = /*@__PURE__*/ requireFunctionCall();
	var anObject = /*@__PURE__*/ requireAnObject();
	var getMethod = /*@__PURE__*/ requireGetMethod();

	iteratorClose = function (iterator, kind, value) {
	  var innerResult, innerError;
	  anObject(iterator);
	  try {
	    innerResult = getMethod(iterator, 'return');
	    if (!innerResult) {
	      if (kind === 'throw') throw value;
	      return value;
	    }
	    innerResult = call(innerResult, iterator);
	  } catch (error) {
	    innerError = true;
	    innerResult = error;
	  }
	  if (kind === 'throw') throw value;
	  if (innerError) throw innerResult;
	  anObject(innerResult);
	  return value;
	};
	return iteratorClose;
}

var iterate;
var hasRequiredIterate;

function requireIterate () {
	if (hasRequiredIterate) return iterate;
	hasRequiredIterate = 1;
	var bind = /*@__PURE__*/ requireFunctionBindContext();
	var call = /*@__PURE__*/ requireFunctionCall();
	var anObject = /*@__PURE__*/ requireAnObject();
	var tryToString = /*@__PURE__*/ requireTryToString();
	var isArrayIteratorMethod = /*@__PURE__*/ requireIsArrayIteratorMethod();
	var lengthOfArrayLike = /*@__PURE__*/ requireLengthOfArrayLike();
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var getIterator = /*@__PURE__*/ requireGetIterator$6();
	var getIteratorMethod = /*@__PURE__*/ requireGetIteratorMethod();
	var iteratorClose = /*@__PURE__*/ requireIteratorClose();

	var $TypeError = TypeError;

	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var ResultPrototype = Result.prototype;

	iterate = function (iterable, unboundFunction, options) {
	  var that = options && options.that;
	  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
	  var IS_RECORD = !!(options && options.IS_RECORD);
	  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
	  var INTERRUPTED = !!(options && options.INTERRUPTED);
	  var fn = bind(unboundFunction, that);
	  var iterator, iterFn, index, length, result, next, step;

	  var stop = function (condition) {
	    if (iterator) iteratorClose(iterator, 'normal');
	    return new Result(true, condition);
	  };

	  var callFn = function (value) {
	    if (AS_ENTRIES) {
	      anObject(value);
	      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
	    } return INTERRUPTED ? fn(value, stop) : fn(value);
	  };

	  if (IS_RECORD) {
	    iterator = iterable.iterator;
	  } else if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
	        result = callFn(iterable[index]);
	        if (result && isPrototypeOf(ResultPrototype, result)) return result;
	      } return new Result(false);
	    }
	    iterator = getIterator(iterable, iterFn);
	  }

	  next = IS_RECORD ? iterable.next : iterator.next;
	  while (!(step = call(next, iterator)).done) {
	    try {
	      result = callFn(step.value);
	    } catch (error) {
	      iteratorClose(iterator, 'throw', error);
	    }
	    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
	  } return new Result(false);
	};
	return iterate;
}

var anInstance;
var hasRequiredAnInstance;

function requireAnInstance () {
	if (hasRequiredAnInstance) return anInstance;
	hasRequiredAnInstance = 1;
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();

	var $TypeError = TypeError;

	anInstance = function (it, Prototype) {
	  if (isPrototypeOf(Prototype, it)) return it;
	  throw new $TypeError('Incorrect invocation');
	};
	return anInstance;
}

var collection;
var hasRequiredCollection;

function requireCollection () {
	if (hasRequiredCollection) return collection;
	hasRequiredCollection = 1;
	var $ = /*@__PURE__*/ require_export();
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var InternalMetadataModule = /*@__PURE__*/ requireInternalMetadata();
	var fails = /*@__PURE__*/ requireFails();
	var createNonEnumerableProperty = /*@__PURE__*/ requireCreateNonEnumerableProperty();
	var iterate = /*@__PURE__*/ requireIterate();
	var anInstance = /*@__PURE__*/ requireAnInstance();
	var isCallable = /*@__PURE__*/ requireIsCallable();
	var isObject = /*@__PURE__*/ requireIsObject();
	var isNullOrUndefined = /*@__PURE__*/ requireIsNullOrUndefined();
	var setToStringTag = /*@__PURE__*/ requireSetToStringTag();
	var defineProperty = /*@__PURE__*/ requireObjectDefineProperty().f;
	var forEach = /*@__PURE__*/ requireArrayIteration().forEach;
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var InternalStateModule = /*@__PURE__*/ requireInternalState();

	var setInternalState = InternalStateModule.set;
	var internalStateGetterFor = InternalStateModule.getterFor;

	collection = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = globalThis[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var exported = {};
	  var Constructor;

	  if (!DESCRIPTORS || !isCallable(NativeConstructor)
	    || !(IS_WEAK || NativePrototype.forEach && !fails(function () { new NativeConstructor().entries().next(); }))
	  ) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    InternalMetadataModule.enable();
	  } else {
	    Constructor = wrapper(function (target, iterable) {
	      setInternalState(anInstance(target, Prototype), {
	        type: CONSTRUCTOR_NAME,
	        collection: new NativeConstructor()
	      });
	      if (!isNullOrUndefined(iterable)) iterate(iterable, target[ADDER], { that: target, AS_ENTRIES: IS_MAP });
	    });

	    var Prototype = Constructor.prototype;

	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    forEach(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
	      var IS_ADDER = KEY === 'add' || KEY === 'set';
	      if (KEY in NativePrototype && !(IS_WEAK && KEY === 'clear')) {
	        createNonEnumerableProperty(Prototype, KEY, function (a, b) {
	          var collection = getInternalState(this).collection;
	          if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY === 'get' ? undefined : false;
	          var result = collection[KEY](a === 0 ? 0 : a, b);
	          return IS_ADDER ? this : result;
	        });
	      }
	    });

	    IS_WEAK || defineProperty(Prototype, 'size', {
	      configurable: true,
	      get: function () {
	        return getInternalState(this).collection.size;
	      }
	    });
	  }

	  setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);

	  exported[CONSTRUCTOR_NAME] = Constructor;
	  $({ global: true, forced: true }, exported);

	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

	  return Constructor;
	};
	return collection;
}

var defineBuiltIns;
var hasRequiredDefineBuiltIns;

function requireDefineBuiltIns () {
	if (hasRequiredDefineBuiltIns) return defineBuiltIns;
	hasRequiredDefineBuiltIns = 1;
	var defineBuiltIn = /*@__PURE__*/ requireDefineBuiltIn();

	defineBuiltIns = function (target, src, options) {
	  for (var key in src) {
	    if (options && options.unsafe && target[key]) target[key] = src[key];
	    else defineBuiltIn(target, key, src[key], options);
	  } return target;
	};
	return defineBuiltIns;
}

var setSpecies;
var hasRequiredSetSpecies;

function requireSetSpecies () {
	if (hasRequiredSetSpecies) return setSpecies;
	hasRequiredSetSpecies = 1;
	var getBuiltIn = /*@__PURE__*/ requireGetBuiltIn();
	var defineBuiltInAccessor = /*@__PURE__*/ requireDefineBuiltInAccessor();
	var wellKnownSymbol = /*@__PURE__*/ requireWellKnownSymbol();
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();

	var SPECIES = wellKnownSymbol('species');

	setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);

	  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
	    defineBuiltInAccessor(Constructor, SPECIES, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};
	return setSpecies;
}

var collectionStrong;
var hasRequiredCollectionStrong;

function requireCollectionStrong () {
	if (hasRequiredCollectionStrong) return collectionStrong;
	hasRequiredCollectionStrong = 1;
	var create = /*@__PURE__*/ requireObjectCreate();
	var defineBuiltInAccessor = /*@__PURE__*/ requireDefineBuiltInAccessor();
	var defineBuiltIns = /*@__PURE__*/ requireDefineBuiltIns();
	var bind = /*@__PURE__*/ requireFunctionBindContext();
	var anInstance = /*@__PURE__*/ requireAnInstance();
	var isNullOrUndefined = /*@__PURE__*/ requireIsNullOrUndefined();
	var iterate = /*@__PURE__*/ requireIterate();
	var defineIterator = /*@__PURE__*/ requireIteratorDefine();
	var createIterResultObject = /*@__PURE__*/ requireCreateIterResultObject();
	var setSpecies = /*@__PURE__*/ requireSetSpecies();
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var fastKey = /*@__PURE__*/ requireInternalMetadata().fastKey;
	var InternalStateModule = /*@__PURE__*/ requireInternalState();

	var setInternalState = InternalStateModule.set;
	var internalStateGetterFor = InternalStateModule.getterFor;

	collectionStrong = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var Constructor = wrapper(function (that, iterable) {
	      anInstance(that, Prototype);
	      setInternalState(that, {
	        type: CONSTRUCTOR_NAME,
	        index: create(null),
	        first: null,
	        last: null,
	        size: 0
	      });
	      if (!DESCRIPTORS) that.size = 0;
	      if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
	    });

	    var Prototype = Constructor.prototype;

	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index;
	      // change existing entry
	      if (entry) {
	        entry.value = value;
	      // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: null,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (DESCRIPTORS) state.size++;
	        else that.size++;
	        // add to index
	        if (index !== 'F') state.index[index] = entry;
	      } return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that);
	      // fast case
	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index];
	      // frozen object case
	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key === key) return entry;
	      }
	    };

	    defineBuiltIns(Prototype, {
	      // `{ Map, Set }.prototype.clear()` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.clear
	      // https://tc39.es/ecma262/#sec-set.prototype.clear
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = state.first;
	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = null;
	          entry = entry.next;
	        }
	        state.first = state.last = null;
	        state.index = create(null);
	        if (DESCRIPTORS) state.size = 0;
	        else that.size = 0;
	      },
	      // `{ Map, Set }.prototype.delete(key)` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.delete
	      // https://tc39.es/ecma262/#sec-set.prototype.delete
	      'delete': function (key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first === entry) state.first = next;
	          if (state.last === entry) state.last = prev;
	          if (DESCRIPTORS) state.size--;
	          else that.size--;
	        } return !!entry;
	      },
	      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.foreach
	      // https://tc39.es/ecma262/#sec-set.prototype.foreach
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        var state = getInternalState(this);
	        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	        var entry;
	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this);
	          // revert to the last existing entry
	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // `{ Map, Set}.prototype.has(key)` methods
	      // https://tc39.es/ecma262/#sec-map.prototype.has
	      // https://tc39.es/ecma262/#sec-set.prototype.has
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });

	    defineBuiltIns(Prototype, IS_MAP ? {
	      // `Map.prototype.get(key)` method
	      // https://tc39.es/ecma262/#sec-map.prototype.get
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // `Map.prototype.set(key, value)` method
	      // https://tc39.es/ecma262/#sec-map.prototype.set
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // `Set.prototype.add(value)` method
	      // https://tc39.es/ecma262/#sec-set.prototype.add
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (DESCRIPTORS) defineBuiltInAccessor(Prototype, 'size', {
	      configurable: true,
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return Constructor;
	  },
	  setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
	    // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
	    // https://tc39.es/ecma262/#sec-map.prototype.entries
	    // https://tc39.es/ecma262/#sec-map.prototype.keys
	    // https://tc39.es/ecma262/#sec-map.prototype.values
	    // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
	    // https://tc39.es/ecma262/#sec-set.prototype.entries
	    // https://tc39.es/ecma262/#sec-set.prototype.keys
	    // https://tc39.es/ecma262/#sec-set.prototype.values
	    // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
	    defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: null
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last;
	      // revert to the last existing entry
	      while (entry && entry.removed) entry = entry.previous;
	      // get next entry
	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = null;
	        return createIterResultObject(undefined, true);
	      }
	      // return step by kind
	      if (kind === 'keys') return createIterResultObject(entry.key, false);
	      if (kind === 'values') return createIterResultObject(entry.value, false);
	      return createIterResultObject([entry.key, entry.value], false);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // `{ Map, Set }.prototype[@@species]` accessors
	    // https://tc39.es/ecma262/#sec-get-map-@@species
	    // https://tc39.es/ecma262/#sec-get-set-@@species
	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};
	return collectionStrong;
}

var hasRequiredEs_map_constructor;

function requireEs_map_constructor () {
	if (hasRequiredEs_map_constructor) return es_map_constructor;
	hasRequiredEs_map_constructor = 1;
	var collection = /*@__PURE__*/ requireCollection();
	var collectionStrong = /*@__PURE__*/ requireCollectionStrong();

	// `Map` constructor
	// https://tc39.es/ecma262/#sec-map-objects
	collection('Map', function (init) {
	  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);
	return es_map_constructor;
}

var hasRequiredEs_map;

function requireEs_map () {
	if (hasRequiredEs_map) return es_map;
	hasRequiredEs_map = 1;
	// TODO: Remove this module from `core-js@4` since it's replaced to module below
	requireEs_map_constructor();
	return es_map;
}

var es_map_groupBy = {};

var caller;
var hasRequiredCaller;

function requireCaller () {
	if (hasRequiredCaller) return caller;
	hasRequiredCaller = 1;
	caller = function (methodName, numArgs) {
	  return numArgs === 1 ? function (object, arg) {
	    return object[methodName](arg);
	  } : function (object, arg1, arg2) {
	    return object[methodName](arg1, arg2);
	  };
	};
	return caller;
}

var mapHelpers;
var hasRequiredMapHelpers;

function requireMapHelpers () {
	if (hasRequiredMapHelpers) return mapHelpers;
	hasRequiredMapHelpers = 1;
	var getBuiltIn = /*@__PURE__*/ requireGetBuiltIn();
	var caller = /*@__PURE__*/ requireCaller();

	var Map = getBuiltIn('Map');

	mapHelpers = {
	  Map: Map,
	  set: caller('set', 2),
	  get: caller('get', 1),
	  has: caller('has', 1),
	  remove: caller('delete', 1),
	  proto: Map.prototype
	};
	return mapHelpers;
}

var hasRequiredEs_map_groupBy;

function requireEs_map_groupBy () {
	if (hasRequiredEs_map_groupBy) return es_map_groupBy;
	hasRequiredEs_map_groupBy = 1;
	var $ = /*@__PURE__*/ require_export();
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var aCallable = /*@__PURE__*/ requireACallable();
	var requireObjectCoercible = /*@__PURE__*/ requireRequireObjectCoercible();
	var iterate = /*@__PURE__*/ requireIterate();
	var MapHelpers = /*@__PURE__*/ requireMapHelpers();
	var IS_PURE = /*@__PURE__*/ requireIsPure();
	var fails = /*@__PURE__*/ requireFails();

	var Map = MapHelpers.Map;
	var has = MapHelpers.has;
	var get = MapHelpers.get;
	var set = MapHelpers.set;
	var push = uncurryThis([].push);

	// https://bugs.webkit.org/show_bug.cgi?id=271524
	var DOES_NOT_WORK_WITH_PRIMITIVES = IS_PURE || fails(function () {
	  return Map.groupBy('ab', function (it) {
	    return it;
	  }).get('a').length !== 1;
	});

	// `Map.groupBy` method
	// https://tc39.es/ecma262/#sec-map.groupby
	$({ target: 'Map', stat: true, forced: IS_PURE || DOES_NOT_WORK_WITH_PRIMITIVES }, {
	  groupBy: function groupBy(items, callbackfn) {
	    requireObjectCoercible(items);
	    aCallable(callbackfn);
	    var map = new Map();
	    var k = 0;
	    iterate(items, function (value) {
	      var key = callbackfn(value, k++);
	      if (!has(map, key)) set(map, key, [value]);
	      else push(get(map, key), value);
	    });
	    return map;
	  }
	});
	return es_map_groupBy;
}

var map$2;
var hasRequiredMap$2;

function requireMap$2 () {
	if (hasRequiredMap$2) return map$2;
	hasRequiredMap$2 = 1;
	requireEs_array_iterator();
	requireEs_map();
	requireEs_map_groupBy();
	requireEs_string_iterator();
	var path = /*@__PURE__*/ requirePath();

	map$2 = path.Map;
	return map$2;
}

var map$1;
var hasRequiredMap$1;

function requireMap$1 () {
	if (hasRequiredMap$1) return map$1;
	hasRequiredMap$1 = 1;
	var parent = /*@__PURE__*/ requireMap$2();
	requireWeb_domCollections_iterator();

	map$1 = parent;
	return map$1;
}

var map;
var hasRequiredMap;

function requireMap () {
	if (hasRequiredMap) return map;
	hasRequiredMap = 1;
	map = /*@__PURE__*/ requireMap$1();
	return map;
}

var mapExports = requireMap();
var _Map = /*@__PURE__*/getDefaultExportFromCjs(mapExports);

var es_array_some = {};

var hasRequiredEs_array_some;

function requireEs_array_some () {
	if (hasRequiredEs_array_some) return es_array_some;
	hasRequiredEs_array_some = 1;
	var $ = /*@__PURE__*/ require_export();
	var $some = /*@__PURE__*/ requireArrayIteration().some;
	var arrayMethodIsStrict = /*@__PURE__*/ requireArrayMethodIsStrict();

	var STRICT_METHOD = arrayMethodIsStrict('some');

	// `Array.prototype.some` method
	// https://tc39.es/ecma262/#sec-array.prototype.some
	$({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	return es_array_some;
}

var some$3;
var hasRequiredSome$3;

function requireSome$3 () {
	if (hasRequiredSome$3) return some$3;
	hasRequiredSome$3 = 1;
	requireEs_array_some();
	var getBuiltInPrototypeMethod = /*@__PURE__*/ requireGetBuiltInPrototypeMethod();

	some$3 = getBuiltInPrototypeMethod('Array', 'some');
	return some$3;
}

var some$2;
var hasRequiredSome$2;

function requireSome$2 () {
	if (hasRequiredSome$2) return some$2;
	hasRequiredSome$2 = 1;
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var method = /*@__PURE__*/ requireSome$3();

	var ArrayPrototype = Array.prototype;

	some$2 = function (it) {
	  var own = it.some;
	  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.some) ? method : own;
	};
	return some$2;
}

var some$1;
var hasRequiredSome$1;

function requireSome$1 () {
	if (hasRequiredSome$1) return some$1;
	hasRequiredSome$1 = 1;
	var parent = /*@__PURE__*/ requireSome$2();

	some$1 = parent;
	return some$1;
}

var some;
var hasRequiredSome;

function requireSome () {
	if (hasRequiredSome) return some;
	hasRequiredSome = 1;
	some = /*@__PURE__*/ requireSome$1();
	return some;
}

var someExports = requireSome();
var _someInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(someExports);

var es_object_assign = {};

var objectAssign;
var hasRequiredObjectAssign;

function requireObjectAssign () {
	if (hasRequiredObjectAssign) return objectAssign;
	hasRequiredObjectAssign = 1;
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var call = /*@__PURE__*/ requireFunctionCall();
	var fails = /*@__PURE__*/ requireFails();
	var objectKeys = /*@__PURE__*/ requireObjectKeys();
	var getOwnPropertySymbolsModule = /*@__PURE__*/ requireObjectGetOwnPropertySymbols();
	var propertyIsEnumerableModule = /*@__PURE__*/ requireObjectPropertyIsEnumerable();
	var toObject = /*@__PURE__*/ requireToObject();
	var IndexedObject = /*@__PURE__*/ requireIndexedObject();

	// eslint-disable-next-line es/no-object-assign -- safe
	var $assign = Object.assign;
	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
	var defineProperty = Object.defineProperty;
	var concat = uncurryThis([].concat);

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	objectAssign = !$assign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
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
	  var symbol = Symbol('assign detection');
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	  var propertyIsEnumerable = propertyIsEnumerableModule.f;
	  while (argumentsLength > index) {
	    var S = IndexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;
	return objectAssign;
}

var hasRequiredEs_object_assign;

function requireEs_object_assign () {
	if (hasRequiredEs_object_assign) return es_object_assign;
	hasRequiredEs_object_assign = 1;
	var $ = /*@__PURE__*/ require_export();
	var assign = /*@__PURE__*/ requireObjectAssign();

	// `Object.assign` method
	// https://tc39.es/ecma262/#sec-object.assign
	// eslint-disable-next-line es/no-object-assign -- required for testing
	$({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
	  assign: assign
	});
	return es_object_assign;
}

var assign$2;
var hasRequiredAssign$2;

function requireAssign$2 () {
	if (hasRequiredAssign$2) return assign$2;
	hasRequiredAssign$2 = 1;
	requireEs_object_assign();
	var path = /*@__PURE__*/ requirePath();

	assign$2 = path.Object.assign;
	return assign$2;
}

var assign$1;
var hasRequiredAssign$1;

function requireAssign$1 () {
	if (hasRequiredAssign$1) return assign$1;
	hasRequiredAssign$1 = 1;
	var parent = /*@__PURE__*/ requireAssign$2();

	assign$1 = parent;
	return assign$1;
}

var assign;
var hasRequiredAssign;

function requireAssign () {
	if (hasRequiredAssign) return assign;
	hasRequiredAssign = 1;
	assign = /*@__PURE__*/ requireAssign$1();
	return assign;
}

var assignExports = requireAssign();
var _Object$assign = /*@__PURE__*/getDefaultExportFromCjs(assignExports);

var concat$3;
var hasRequiredConcat$3;

function requireConcat$3 () {
	if (hasRequiredConcat$3) return concat$3;
	hasRequiredConcat$3 = 1;
	requireEs_array_concat();
	var getBuiltInPrototypeMethod = /*@__PURE__*/ requireGetBuiltInPrototypeMethod();

	concat$3 = getBuiltInPrototypeMethod('Array', 'concat');
	return concat$3;
}

var concat$2;
var hasRequiredConcat$2;

function requireConcat$2 () {
	if (hasRequiredConcat$2) return concat$2;
	hasRequiredConcat$2 = 1;
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var method = /*@__PURE__*/ requireConcat$3();

	var ArrayPrototype = Array.prototype;

	concat$2 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.concat) ? method : own;
	};
	return concat$2;
}

var concat$1;
var hasRequiredConcat$1;

function requireConcat$1 () {
	if (hasRequiredConcat$1) return concat$1;
	hasRequiredConcat$1 = 1;
	var parent = /*@__PURE__*/ requireConcat$2();

	concat$1 = parent;
	return concat$1;
}

var concat;
var hasRequiredConcat;

function requireConcat () {
	if (hasRequiredConcat) return concat;
	hasRequiredConcat = 1;
	concat = /*@__PURE__*/ requireConcat$1();
	return concat;
}

var concatExports = requireConcat();
var _concatInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(concatExports);

var keys$6;
var hasRequiredKeys$6;

function requireKeys$6 () {
	if (hasRequiredKeys$6) return keys$6;
	hasRequiredKeys$6 = 1;
	requireEs_array_iterator();
	var getBuiltInPrototypeMethod = /*@__PURE__*/ requireGetBuiltInPrototypeMethod();

	keys$6 = getBuiltInPrototypeMethod('Array', 'keys');
	return keys$6;
}

var keys$5;
var hasRequiredKeys$5;

function requireKeys$5 () {
	if (hasRequiredKeys$5) return keys$5;
	hasRequiredKeys$5 = 1;
	var parent = /*@__PURE__*/ requireKeys$6();

	keys$5 = parent;
	return keys$5;
}

var keys$4;
var hasRequiredKeys$4;

function requireKeys$4 () {
	if (hasRequiredKeys$4) return keys$4;
	hasRequiredKeys$4 = 1;
	requireWeb_domCollections_iterator();
	var classof = /*@__PURE__*/ requireClassof();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var method = /*@__PURE__*/ requireKeys$5();

	var ArrayPrototype = Array.prototype;

	var DOMIterables = {
	  DOMTokenList: true,
	  NodeList: true
	};

	keys$4 = function (it) {
	  var own = it.keys;
	  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.keys)
	    || hasOwn(DOMIterables, classof(it)) ? method : own;
	};
	return keys$4;
}

var keys$3;
var hasRequiredKeys$3;

function requireKeys$3 () {
	if (hasRequiredKeys$3) return keys$3;
	hasRequiredKeys$3 = 1;
	keys$3 = /*@__PURE__*/ requireKeys$4();
	return keys$3;
}

var keysExports$1 = requireKeys$3();
var _keysInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(keysExports$1);

var es_object_keys = {};

var hasRequiredEs_object_keys;

function requireEs_object_keys () {
	if (hasRequiredEs_object_keys) return es_object_keys;
	hasRequiredEs_object_keys = 1;
	var $ = /*@__PURE__*/ require_export();
	var toObject = /*@__PURE__*/ requireToObject();
	var nativeKeys = /*@__PURE__*/ requireObjectKeys();
	var fails = /*@__PURE__*/ requireFails();

	var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

	// `Object.keys` method
	// https://tc39.es/ecma262/#sec-object.keys
	$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return nativeKeys(toObject(it));
	  }
	});
	return es_object_keys;
}

var keys$2;
var hasRequiredKeys$2;

function requireKeys$2 () {
	if (hasRequiredKeys$2) return keys$2;
	hasRequiredKeys$2 = 1;
	requireEs_object_keys();
	var path = /*@__PURE__*/ requirePath();

	keys$2 = path.Object.keys;
	return keys$2;
}

var keys$1;
var hasRequiredKeys$1;

function requireKeys$1 () {
	if (hasRequiredKeys$1) return keys$1;
	hasRequiredKeys$1 = 1;
	var parent = /*@__PURE__*/ requireKeys$2();

	keys$1 = parent;
	return keys$1;
}

var keys;
var hasRequiredKeys;

function requireKeys () {
	if (hasRequiredKeys) return keys;
	hasRequiredKeys = 1;
	keys = /*@__PURE__*/ requireKeys$1();
	return keys;
}

var keysExports = requireKeys();
var _Object$keys = /*@__PURE__*/getDefaultExportFromCjs(keysExports);

var es_array_sort = {};

var deletePropertyOrThrow;
var hasRequiredDeletePropertyOrThrow;

function requireDeletePropertyOrThrow () {
	if (hasRequiredDeletePropertyOrThrow) return deletePropertyOrThrow;
	hasRequiredDeletePropertyOrThrow = 1;
	var tryToString = /*@__PURE__*/ requireTryToString();

	var $TypeError = TypeError;

	deletePropertyOrThrow = function (O, P) {
	  if (!delete O[P]) throw new $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
	};
	return deletePropertyOrThrow;
}

var arraySort;
var hasRequiredArraySort;

function requireArraySort () {
	if (hasRequiredArraySort) return arraySort;
	hasRequiredArraySort = 1;
	var arraySlice = /*@__PURE__*/ requireArraySlice();

	var floor = Math.floor;

	var sort = function (array, comparefn) {
	  var length = array.length;

	  if (length < 8) {
	    // insertion sort
	    var i = 1;
	    var element, j;

	    while (i < length) {
	      j = i;
	      element = array[i];
	      while (j && comparefn(array[j - 1], element) > 0) {
	        array[j] = array[--j];
	      }
	      if (j !== i++) array[j] = element;
	    }
	  } else {
	    // merge sort
	    var middle = floor(length / 2);
	    var left = sort(arraySlice(array, 0, middle), comparefn);
	    var right = sort(arraySlice(array, middle), comparefn);
	    var llength = left.length;
	    var rlength = right.length;
	    var lindex = 0;
	    var rindex = 0;

	    while (lindex < llength || rindex < rlength) {
	      array[lindex + rindex] = (lindex < llength && rindex < rlength)
	        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
	        : lindex < llength ? left[lindex++] : right[rindex++];
	    }
	  }

	  return array;
	};

	arraySort = sort;
	return arraySort;
}

var environmentFfVersion;
var hasRequiredEnvironmentFfVersion;

function requireEnvironmentFfVersion () {
	if (hasRequiredEnvironmentFfVersion) return environmentFfVersion;
	hasRequiredEnvironmentFfVersion = 1;
	var userAgent = /*@__PURE__*/ requireEnvironmentUserAgent();

	var firefox = userAgent.match(/firefox\/(\d+)/i);

	environmentFfVersion = !!firefox && +firefox[1];
	return environmentFfVersion;
}

var environmentIsIeOrEdge;
var hasRequiredEnvironmentIsIeOrEdge;

function requireEnvironmentIsIeOrEdge () {
	if (hasRequiredEnvironmentIsIeOrEdge) return environmentIsIeOrEdge;
	hasRequiredEnvironmentIsIeOrEdge = 1;
	var UA = /*@__PURE__*/ requireEnvironmentUserAgent();

	environmentIsIeOrEdge = /MSIE|Trident/.test(UA);
	return environmentIsIeOrEdge;
}

var environmentWebkitVersion;
var hasRequiredEnvironmentWebkitVersion;

function requireEnvironmentWebkitVersion () {
	if (hasRequiredEnvironmentWebkitVersion) return environmentWebkitVersion;
	hasRequiredEnvironmentWebkitVersion = 1;
	var userAgent = /*@__PURE__*/ requireEnvironmentUserAgent();

	var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

	environmentWebkitVersion = !!webkit && +webkit[1];
	return environmentWebkitVersion;
}

var hasRequiredEs_array_sort;

function requireEs_array_sort () {
	if (hasRequiredEs_array_sort) return es_array_sort;
	hasRequiredEs_array_sort = 1;
	var $ = /*@__PURE__*/ require_export();
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var aCallable = /*@__PURE__*/ requireACallable();
	var toObject = /*@__PURE__*/ requireToObject();
	var lengthOfArrayLike = /*@__PURE__*/ requireLengthOfArrayLike();
	var deletePropertyOrThrow = /*@__PURE__*/ requireDeletePropertyOrThrow();
	var toString = /*@__PURE__*/ requireToString();
	var fails = /*@__PURE__*/ requireFails();
	var internalSort = /*@__PURE__*/ requireArraySort();
	var arrayMethodIsStrict = /*@__PURE__*/ requireArrayMethodIsStrict();
	var FF = /*@__PURE__*/ requireEnvironmentFfVersion();
	var IE_OR_EDGE = /*@__PURE__*/ requireEnvironmentIsIeOrEdge();
	var V8 = /*@__PURE__*/ requireEnvironmentV8Version();
	var WEBKIT = /*@__PURE__*/ requireEnvironmentWebkitVersion();

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
	$({ target: 'Array', proto: true, forced: FORCED }, {
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
	return es_array_sort;
}

var sort$3;
var hasRequiredSort$3;

function requireSort$3 () {
	if (hasRequiredSort$3) return sort$3;
	hasRequiredSort$3 = 1;
	requireEs_array_sort();
	var getBuiltInPrototypeMethod = /*@__PURE__*/ requireGetBuiltInPrototypeMethod();

	sort$3 = getBuiltInPrototypeMethod('Array', 'sort');
	return sort$3;
}

var sort$2;
var hasRequiredSort$2;

function requireSort$2 () {
	if (hasRequiredSort$2) return sort$2;
	hasRequiredSort$2 = 1;
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var method = /*@__PURE__*/ requireSort$3();

	var ArrayPrototype = Array.prototype;

	sort$2 = function (it) {
	  var own = it.sort;
	  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.sort) ? method : own;
	};
	return sort$2;
}

var sort$1;
var hasRequiredSort$1;

function requireSort$1 () {
	if (hasRequiredSort$1) return sort$1;
	hasRequiredSort$1 = 1;
	var parent = /*@__PURE__*/ requireSort$2();

	sort$1 = parent;
	return sort$1;
}

var sort;
var hasRequiredSort;

function requireSort () {
	if (hasRequiredSort) return sort;
	hasRequiredSort = 1;
	sort = /*@__PURE__*/ requireSort$1();
	return sort;
}

var sortExports = requireSort();
var _sortInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(sortExports);

var values$3;
var hasRequiredValues$3;

function requireValues$3 () {
	if (hasRequiredValues$3) return values$3;
	hasRequiredValues$3 = 1;
	requireEs_array_iterator();
	var getBuiltInPrototypeMethod = /*@__PURE__*/ requireGetBuiltInPrototypeMethod();

	values$3 = getBuiltInPrototypeMethod('Array', 'values');
	return values$3;
}

var values$2;
var hasRequiredValues$2;

function requireValues$2 () {
	if (hasRequiredValues$2) return values$2;
	hasRequiredValues$2 = 1;
	var parent = /*@__PURE__*/ requireValues$3();

	values$2 = parent;
	return values$2;
}

var values$1;
var hasRequiredValues$1;

function requireValues$1 () {
	if (hasRequiredValues$1) return values$1;
	hasRequiredValues$1 = 1;
	requireWeb_domCollections_iterator();
	var classof = /*@__PURE__*/ requireClassof();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var method = /*@__PURE__*/ requireValues$2();

	var ArrayPrototype = Array.prototype;

	var DOMIterables = {
	  DOMTokenList: true,
	  NodeList: true
	};

	values$1 = function (it) {
	  var own = it.values;
	  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.values)
	    || hasOwn(DOMIterables, classof(it)) ? method : own;
	};
	return values$1;
}

var values;
var hasRequiredValues;

function requireValues () {
	if (hasRequiredValues) return values;
	hasRequiredValues = 1;
	values = /*@__PURE__*/ requireValues$1();
	return values;
}

var valuesExports = requireValues();
var _valuesInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(valuesExports);

var es_date_toJson = {};

var stringRepeat;
var hasRequiredStringRepeat;

function requireStringRepeat () {
	if (hasRequiredStringRepeat) return stringRepeat;
	hasRequiredStringRepeat = 1;
	var toIntegerOrInfinity = /*@__PURE__*/ requireToIntegerOrInfinity();
	var toString = /*@__PURE__*/ requireToString();
	var requireObjectCoercible = /*@__PURE__*/ requireRequireObjectCoercible();

	var $RangeError = RangeError;

	// `String.prototype.repeat` method implementation
	// https://tc39.es/ecma262/#sec-string.prototype.repeat
	stringRepeat = function repeat(count) {
	  var str = toString(requireObjectCoercible(this));
	  var result = '';
	  var n = toIntegerOrInfinity(count);
	  if (n < 0 || n === Infinity) throw new $RangeError('Wrong number of repetitions');
	  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
	  return result;
	};
	return stringRepeat;
}

var stringPad;
var hasRequiredStringPad;

function requireStringPad () {
	if (hasRequiredStringPad) return stringPad;
	hasRequiredStringPad = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var toLength = /*@__PURE__*/ requireToLength();
	var toString = /*@__PURE__*/ requireToString();
	var $repeat = /*@__PURE__*/ requireStringRepeat();
	var requireObjectCoercible = /*@__PURE__*/ requireRequireObjectCoercible();

	var repeat = uncurryThis($repeat);
	var stringSlice = uncurryThis(''.slice);
	var ceil = Math.ceil;

	// `String.prototype.{ padStart, padEnd }` methods implementation
	var createMethod = function (IS_END) {
	  return function ($this, maxLength, fillString) {
	    var S = toString(requireObjectCoercible($this));
	    var intMaxLength = toLength(maxLength);
	    var stringLength = S.length;
	    var fillStr = fillString === undefined ? ' ' : toString(fillString);
	    var fillLen, stringFiller;
	    if (intMaxLength <= stringLength || fillStr === '') return S;
	    fillLen = intMaxLength - stringLength;
	    stringFiller = repeat(fillStr, ceil(fillLen / fillStr.length));
	    if (stringFiller.length > fillLen) stringFiller = stringSlice(stringFiller, 0, fillLen);
	    return IS_END ? S + stringFiller : stringFiller + S;
	  };
	};

	stringPad = {
	  // `String.prototype.padStart` method
	  // https://tc39.es/ecma262/#sec-string.prototype.padstart
	  start: createMethod(false),
	  // `String.prototype.padEnd` method
	  // https://tc39.es/ecma262/#sec-string.prototype.padend
	  end: createMethod(true)
	};
	return stringPad;
}

var dateToIsoString;
var hasRequiredDateToIsoString;

function requireDateToIsoString () {
	if (hasRequiredDateToIsoString) return dateToIsoString;
	hasRequiredDateToIsoString = 1;
	var uncurryThis = /*@__PURE__*/ requireFunctionUncurryThis();
	var fails = /*@__PURE__*/ requireFails();
	var padStart = /*@__PURE__*/ requireStringPad().start;

	var $RangeError = RangeError;
	var $isFinite = isFinite;
	var abs = Math.abs;
	var DatePrototype = Date.prototype;
	var nativeDateToISOString = DatePrototype.toISOString;
	var thisTimeValue = uncurryThis(DatePrototype.getTime);
	var getUTCDate = uncurryThis(DatePrototype.getUTCDate);
	var getUTCFullYear = uncurryThis(DatePrototype.getUTCFullYear);
	var getUTCHours = uncurryThis(DatePrototype.getUTCHours);
	var getUTCMilliseconds = uncurryThis(DatePrototype.getUTCMilliseconds);
	var getUTCMinutes = uncurryThis(DatePrototype.getUTCMinutes);
	var getUTCMonth = uncurryThis(DatePrototype.getUTCMonth);
	var getUTCSeconds = uncurryThis(DatePrototype.getUTCSeconds);

	// `Date.prototype.toISOString` method implementation
	// https://tc39.es/ecma262/#sec-date.prototype.toisostring
	// PhantomJS / old WebKit fails here:
	dateToIsoString = (fails(function () {
	  return nativeDateToISOString.call(new Date(-5e13 - 1)) !== '0385-07-25T07:06:39.999Z';
	}) || !fails(function () {
	  nativeDateToISOString.call(new Date(NaN));
	})) ? function toISOString() {
	  if (!$isFinite(thisTimeValue(this))) throw new $RangeError('Invalid time value');
	  var date = this;
	  var year = getUTCFullYear(date);
	  var milliseconds = getUTCMilliseconds(date);
	  var sign = year < 0 ? '-' : year > 9999 ? '+' : '';
	  return sign + padStart(abs(year), sign ? 6 : 4, 0) +
	    '-' + padStart(getUTCMonth(date) + 1, 2, 0) +
	    '-' + padStart(getUTCDate(date), 2, 0) +
	    'T' + padStart(getUTCHours(date), 2, 0) +
	    ':' + padStart(getUTCMinutes(date), 2, 0) +
	    ':' + padStart(getUTCSeconds(date), 2, 0) +
	    '.' + padStart(milliseconds, 3, 0) +
	    'Z';
	} : nativeDateToISOString;
	return dateToIsoString;
}

var hasRequiredEs_date_toJson;

function requireEs_date_toJson () {
	if (hasRequiredEs_date_toJson) return es_date_toJson;
	hasRequiredEs_date_toJson = 1;
	var $ = /*@__PURE__*/ require_export();
	var call = /*@__PURE__*/ requireFunctionCall();
	var toObject = /*@__PURE__*/ requireToObject();
	var toPrimitive = /*@__PURE__*/ requireToPrimitive$5();
	var toISOString = /*@__PURE__*/ requireDateToIsoString();
	var classof = /*@__PURE__*/ requireClassofRaw();
	var fails = /*@__PURE__*/ requireFails();

	var FORCED = fails(function () {
	  return new Date(NaN).toJSON() !== null
	    || call(Date.prototype.toJSON, { toISOString: function () { return 1; } }) !== 1;
	});

	// `Date.prototype.toJSON` method
	// https://tc39.es/ecma262/#sec-date.prototype.tojson
	$({ target: 'Date', proto: true, forced: FORCED }, {
	  // eslint-disable-next-line no-unused-vars -- required for `.length`
	  toJSON: function toJSON(key) {
	    var O = toObject(this);
	    var pv = toPrimitive(O, 'number');
	    return typeof pv == 'number' && !isFinite(pv) ? null :
	      (!('toISOString' in O) && classof(O) === 'Date') ? call(toISOString, O) : O.toISOString();
	  }
	});
	return es_date_toJson;
}

var stringify$2;
var hasRequiredStringify$2;

function requireStringify$2 () {
	if (hasRequiredStringify$2) return stringify$2;
	hasRequiredStringify$2 = 1;
	requireEs_date_toJson();
	requireEs_json_stringify();
	var path = /*@__PURE__*/ requirePath();
	var apply = /*@__PURE__*/ requireFunctionApply();

	// eslint-disable-next-line es/no-json -- safe
	if (!path.JSON) path.JSON = { stringify: JSON.stringify };

	// eslint-disable-next-line no-unused-vars -- required for `.length`
	stringify$2 = function stringify(it, replacer, space) {
	  return apply(path.JSON.stringify, null, arguments);
	};
	return stringify$2;
}

var stringify$1;
var hasRequiredStringify$1;

function requireStringify$1 () {
	if (hasRequiredStringify$1) return stringify$1;
	hasRequiredStringify$1 = 1;
	var parent = /*@__PURE__*/ requireStringify$2();

	stringify$1 = parent;
	return stringify$1;
}

var stringify;
var hasRequiredStringify;

function requireStringify () {
	if (hasRequiredStringify) return stringify;
	hasRequiredStringify = 1;
	stringify = /*@__PURE__*/ requireStringify$1();
	return stringify;
}

var stringifyExports = requireStringify();
var _JSON$stringify = /*@__PURE__*/getDefaultExportFromCjs(stringifyExports);

var iterator;
var hasRequiredIterator;

function requireIterator () {
	if (hasRequiredIterator) return iterator;
	hasRequiredIterator = 1;
	iterator = /*@__PURE__*/ requireIterator$4();
	return iterator;
}

var iteratorExports = requireIterator();
var _Symbol$iterator = /*@__PURE__*/getDefaultExportFromCjs(iteratorExports);

var entries$3;
var hasRequiredEntries$3;

function requireEntries$3 () {
	if (hasRequiredEntries$3) return entries$3;
	hasRequiredEntries$3 = 1;
	requireEs_array_iterator();
	var getBuiltInPrototypeMethod = /*@__PURE__*/ requireGetBuiltInPrototypeMethod();

	entries$3 = getBuiltInPrototypeMethod('Array', 'entries');
	return entries$3;
}

var entries$2;
var hasRequiredEntries$2;

function requireEntries$2 () {
	if (hasRequiredEntries$2) return entries$2;
	hasRequiredEntries$2 = 1;
	var parent = /*@__PURE__*/ requireEntries$3();

	entries$2 = parent;
	return entries$2;
}

var entries$1;
var hasRequiredEntries$1;

function requireEntries$1 () {
	if (hasRequiredEntries$1) return entries$1;
	hasRequiredEntries$1 = 1;
	requireWeb_domCollections_iterator();
	var classof = /*@__PURE__*/ requireClassof();
	var hasOwn = /*@__PURE__*/ requireHasOwnProperty();
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var method = /*@__PURE__*/ requireEntries$2();

	var ArrayPrototype = Array.prototype;

	var DOMIterables = {
	  DOMTokenList: true,
	  NodeList: true
	};

	entries$1 = function (it) {
	  var own = it.entries;
	  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.entries)
	    || hasOwn(DOMIterables, classof(it)) ? method : own;
	};
	return entries$1;
}

var entries;
var hasRequiredEntries;

function requireEntries () {
	if (hasRequiredEntries) return entries;
	hasRequiredEntries = 1;
	entries = /*@__PURE__*/ requireEntries$1();
	return entries;
}

var entriesExports = requireEntries();
var _entriesInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(entriesExports);

const byteToHex = [];
for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
    return (byteToHex[arr[offset + 0]] +
        byteToHex[arr[offset + 1]] +
        byteToHex[arr[offset + 2]] +
        byteToHex[arr[offset + 3]] +
        '-' +
        byteToHex[arr[offset + 4]] +
        byteToHex[arr[offset + 5]] +
        '-' +
        byteToHex[arr[offset + 6]] +
        byteToHex[arr[offset + 7]] +
        '-' +
        byteToHex[arr[offset + 8]] +
        byteToHex[arr[offset + 9]] +
        '-' +
        byteToHex[arr[offset + 10]] +
        byteToHex[arr[offset + 11]] +
        byteToHex[arr[offset + 12]] +
        byteToHex[arr[offset + 13]] +
        byteToHex[arr[offset + 14]] +
        byteToHex[arr[offset + 15]]).toLowerCase();
}

let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
    if (!getRandomValues) {
        if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
        getRandomValues = crypto.getRandomValues.bind(crypto);
    }
    return getRandomValues(rnds8);
}

const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native = { randomUUID };

function v4(options, buf, offset) {
    if (native.randomUUID && true && !options) {
        return native.randomUUID();
    }
    options = options || {};
    const rnds = options.random ?? options.rng?.() ?? rng();
    if (rnds.length < 16) {
        throw new Error('Random bytes length must be >= 16');
    }
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;
    return unsafeStringify(rnds);
}

/**
 * Determine whether a value can be used as an id.
 * @param value - Input value of unknown type.
 * @returns True if the value is valid id, false otherwise.
 */
function isId(value) {
  return typeof value === "string" || typeof value === "number";
}

var web_timers = {};

var web_setInterval = {};

var validateArgumentsLength;
var hasRequiredValidateArgumentsLength;

function requireValidateArgumentsLength () {
	if (hasRequiredValidateArgumentsLength) return validateArgumentsLength;
	hasRequiredValidateArgumentsLength = 1;
	var $TypeError = TypeError;

	validateArgumentsLength = function (passed, required) {
	  if (passed < required) throw new $TypeError('Not enough arguments');
	  return passed;
	};
	return validateArgumentsLength;
}

var schedulersFix;
var hasRequiredSchedulersFix;

function requireSchedulersFix () {
	if (hasRequiredSchedulersFix) return schedulersFix;
	hasRequiredSchedulersFix = 1;
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var apply = /*@__PURE__*/ requireFunctionApply();
	var isCallable = /*@__PURE__*/ requireIsCallable();
	var ENVIRONMENT = /*@__PURE__*/ requireEnvironment();
	var USER_AGENT = /*@__PURE__*/ requireEnvironmentUserAgent();
	var arraySlice = /*@__PURE__*/ requireArraySlice();
	var validateArgumentsLength = /*@__PURE__*/ requireValidateArgumentsLength();

	var Function = globalThis.Function;
	// dirty IE9- and Bun 0.3.0- checks
	var WRAP = /MSIE .\./.test(USER_AGENT) || ENVIRONMENT === 'BUN' && (function () {
	  var version = globalThis.Bun.version.split('.');
	  return version.length < 3 || version[0] === '0' && (version[1] < 3 || version[1] === '3' && version[2] === '0');
	})();

	// IE9- / Bun 0.3.0- setTimeout / setInterval / setImmediate additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
	// https://github.com/oven-sh/bun/issues/1633
	schedulersFix = function (scheduler, hasTimeArg) {
	  var firstParamIndex = hasTimeArg ? 2 : 1;
	  return WRAP ? function (handler, timeout /* , ...arguments */) {
	    var boundArgs = validateArgumentsLength(arguments.length, 1) > firstParamIndex;
	    var fn = isCallable(handler) ? handler : Function(handler);
	    var params = boundArgs ? arraySlice(arguments, firstParamIndex) : [];
	    var callback = boundArgs ? function () {
	      apply(fn, this, params);
	    } : fn;
	    return hasTimeArg ? scheduler(callback, timeout) : scheduler(callback);
	  } : scheduler;
	};
	return schedulersFix;
}

var hasRequiredWeb_setInterval;

function requireWeb_setInterval () {
	if (hasRequiredWeb_setInterval) return web_setInterval;
	hasRequiredWeb_setInterval = 1;
	var $ = /*@__PURE__*/ require_export();
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var schedulersFix = /*@__PURE__*/ requireSchedulersFix();

	var setInterval = schedulersFix(globalThis.setInterval, true);

	// Bun / IE9- setInterval additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
	$({ global: true, bind: true, forced: globalThis.setInterval !== setInterval }, {
	  setInterval: setInterval
	});
	return web_setInterval;
}

var web_setTimeout = {};

var hasRequiredWeb_setTimeout;

function requireWeb_setTimeout () {
	if (hasRequiredWeb_setTimeout) return web_setTimeout;
	hasRequiredWeb_setTimeout = 1;
	var $ = /*@__PURE__*/ require_export();
	var globalThis = /*@__PURE__*/ requireGlobalThis();
	var schedulersFix = /*@__PURE__*/ requireSchedulersFix();

	var setTimeout = schedulersFix(globalThis.setTimeout, true);

	// Bun / IE9- setTimeout additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
	$({ global: true, bind: true, forced: globalThis.setTimeout !== setTimeout }, {
	  setTimeout: setTimeout
	});
	return web_setTimeout;
}

var hasRequiredWeb_timers;

function requireWeb_timers () {
	if (hasRequiredWeb_timers) return web_timers;
	hasRequiredWeb_timers = 1;
	// TODO: Remove this module from `core-js@4` since it's split to modules listed below
	requireWeb_setInterval();
	requireWeb_setTimeout();
	return web_timers;
}

var setTimeout$2;
var hasRequiredSetTimeout$1;

function requireSetTimeout$1 () {
	if (hasRequiredSetTimeout$1) return setTimeout$2;
	hasRequiredSetTimeout$1 = 1;
	requireWeb_timers();
	var path = /*@__PURE__*/ requirePath();

	setTimeout$2 = path.setTimeout;
	return setTimeout$2;
}

var setTimeout$1;
var hasRequiredSetTimeout;

function requireSetTimeout () {
	if (hasRequiredSetTimeout) return setTimeout$1;
	hasRequiredSetTimeout = 1;
	setTimeout$1 = /*@__PURE__*/ requireSetTimeout$1();
	return setTimeout$1;
}

var setTimeoutExports = requireSetTimeout();
var _setTimeout = /*@__PURE__*/getDefaultExportFromCjs(setTimeoutExports);

var es_array_splice = {};

var arraySetLength;
var hasRequiredArraySetLength;

function requireArraySetLength () {
	if (hasRequiredArraySetLength) return arraySetLength;
	hasRequiredArraySetLength = 1;
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var isArray = /*@__PURE__*/ requireIsArray$3();

	var $TypeError = TypeError;
	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Safari < 13 does not throw an error in this case
	var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
	  // makes no sense without proper strict mode support
	  if (this !== undefined) return true;
	  try {
	    // eslint-disable-next-line es/no-object-defineproperty -- safe
	    Object.defineProperty([], 'length', { writable: false }).length = 1;
	  } catch (error) {
	    return error instanceof TypeError;
	  }
	}();

	arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
	  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
	    throw new $TypeError('Cannot set read only .length');
	  } return O.length = length;
	} : function (O, length) {
	  return O.length = length;
	};
	return arraySetLength;
}

var hasRequiredEs_array_splice;

function requireEs_array_splice () {
	if (hasRequiredEs_array_splice) return es_array_splice;
	hasRequiredEs_array_splice = 1;
	var $ = /*@__PURE__*/ require_export();
	var toObject = /*@__PURE__*/ requireToObject();
	var toAbsoluteIndex = /*@__PURE__*/ requireToAbsoluteIndex();
	var toIntegerOrInfinity = /*@__PURE__*/ requireToIntegerOrInfinity();
	var lengthOfArrayLike = /*@__PURE__*/ requireLengthOfArrayLike();
	var setArrayLength = /*@__PURE__*/ requireArraySetLength();
	var doesNotExceedSafeInteger = /*@__PURE__*/ requireDoesNotExceedSafeInteger();
	var arraySpeciesCreate = /*@__PURE__*/ requireArraySpeciesCreate();
	var createProperty = /*@__PURE__*/ requireCreateProperty();
	var deletePropertyOrThrow = /*@__PURE__*/ requireDeletePropertyOrThrow();
	var arrayMethodHasSpeciesSupport = /*@__PURE__*/ requireArrayMethodHasSpeciesSupport();

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

	var max = Math.max;
	var min = Math.min;

	// `Array.prototype.splice` method
	// https://tc39.es/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject(this);
	    var len = lengthOfArrayLike(O);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
	    }
	    doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
	    A = arraySpeciesCreate(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else deletePropertyOrThrow(O, to);
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else deletePropertyOrThrow(O, to);
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    setArrayLength(O, len - actualDeleteCount + insertCount);
	    return A;
	  }
	});
	return es_array_splice;
}

var splice$3;
var hasRequiredSplice$3;

function requireSplice$3 () {
	if (hasRequiredSplice$3) return splice$3;
	hasRequiredSplice$3 = 1;
	requireEs_array_splice();
	var getBuiltInPrototypeMethod = /*@__PURE__*/ requireGetBuiltInPrototypeMethod();

	splice$3 = getBuiltInPrototypeMethod('Array', 'splice');
	return splice$3;
}

var splice$2;
var hasRequiredSplice$2;

function requireSplice$2 () {
	if (hasRequiredSplice$2) return splice$2;
	hasRequiredSplice$2 = 1;
	var isPrototypeOf = /*@__PURE__*/ requireObjectIsPrototypeOf();
	var method = /*@__PURE__*/ requireSplice$3();

	var ArrayPrototype = Array.prototype;

	splice$2 = function (it) {
	  var own = it.splice;
	  return it === ArrayPrototype || (isPrototypeOf(ArrayPrototype, it) && own === ArrayPrototype.splice) ? method : own;
	};
	return splice$2;
}

var splice$1;
var hasRequiredSplice$1;

function requireSplice$1 () {
	if (hasRequiredSplice$1) return splice$1;
	hasRequiredSplice$1 = 1;
	var parent = /*@__PURE__*/ requireSplice$2();

	splice$1 = parent;
	return splice$1;
}

var splice;
var hasRequiredSplice;

function requireSplice () {
	if (hasRequiredSplice) return splice;
	hasRequiredSplice = 1;
	splice = /*@__PURE__*/ requireSplice$1();
	return splice;
}

var spliceExports = requireSplice();
var _spliceInstanceProperty = /*@__PURE__*/getDefaultExportFromCjs(spliceExports);

/**
 * A queue.
 * @typeParam T - The type of method names to be replaced by queued versions.
 */
class Queue {
  /**
   * Construct a new Queue.
   * @param options - Queue configuration.
   */
  constructor(options) {
    /** Delay in milliseconds. If defined the queue will be periodically flushed. */
    /** Maximum number of entries in the queue before it will be flushed. */
    _defineProperty(this, "_queue", []);
    _defineProperty(this, "_timeout", null);
    _defineProperty(this, "_extended", null);
    // options
    this.delay = null;
    this.max = Infinity;
    this.setOptions(options);
  }
  /**
   * Update the configuration of the queue.
   * @param options - Queue configuration.
   */
  setOptions(options) {
    if (options && typeof options.delay !== "undefined") {
      this.delay = options.delay;
    }
    if (options && typeof options.max !== "undefined") {
      this.max = options.max;
    }
    this._flushIfNeeded();
  }
  /**
   * Extend an object with queuing functionality.
   * The object will be extended with a function flush, and the methods provided in options.replace will be replaced with queued ones.
   * @param object - The object to be extended.
   * @param options - Additional options.
   * @returns The created queue.
   */
  static extend(object, options) {
    const queue = new Queue(options);
    if (object.flush !== undefined) {
      throw new Error("Target object already has a property flush");
    }
    object.flush = () => {
      queue.flush();
    };
    const methods = [{
      name: "flush",
      original: undefined
    }];
    if (options && options.replace) {
      for (let i = 0; i < options.replace.length; i++) {
        const name = options.replace[i];
        methods.push({
          name: name,
          // @TODO: better solution?
          original: object[name]
        });
        // @TODO: better solution?
        queue.replace(object, name);
      }
    }
    queue._extended = {
      object: object,
      methods: methods
    };
    return queue;
  }
  /**
   * Destroy the queue. The queue will first flush all queued actions, and in case it has extended an object, will restore the original object.
   */
  destroy() {
    this.flush();
    if (this._extended) {
      const object = this._extended.object;
      const methods = this._extended.methods;
      for (let i = 0; i < methods.length; i++) {
        const method = methods[i];
        if (method.original) {
          // @TODO: better solution?
          object[method.name] = method.original;
        } else {
          // @TODO: better solution?
          delete object[method.name];
        }
      }
      this._extended = null;
    }
  }
  /**
   * Replace a method on an object with a queued version.
   * @param object - Object having the method.
   * @param method - The method name.
   */
  replace(object, method) {
    /* eslint-disable-next-line @typescript-eslint/no-this-alias -- Function this is necessary in the function bellow, so class this has to be saved into a variable here. */
    const me = this;
    const original = object[method];
    if (!original) {
      throw new Error("Method " + method + " undefined");
    }
    object[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      // add this call to the queue
      me.queue({
        args: args,
        fn: original,
        context: this
      });
    };
  }
  /**
   * Queue a call.
   * @param entry - The function or entry to be queued.
   */
  queue(entry) {
    if (typeof entry === "function") {
      this._queue.push({
        fn: entry
      });
    } else {
      this._queue.push(entry);
    }
    this._flushIfNeeded();
  }
  /**
   * Check whether the queue needs to be flushed.
   */
  _flushIfNeeded() {
    // flush when the maximum is exceeded.
    if (this._queue.length > this.max) {
      this.flush();
    }
    // flush after a period of inactivity when a delay is configured
    if (this._timeout != null) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
    if (this.queue.length > 0 && typeof this.delay === "number") {
      this._timeout = _setTimeout(() => {
        this.flush();
      }, this.delay);
    }
  }
  /**
   * Flush all queued calls
   */
  flush() {
    var _context, _context2;
    _forEachInstanceProperty(_context = _spliceInstanceProperty(_context2 = this._queue).call(_context2, 0)).call(_context, entry => {
      entry.fn.apply(entry.context || entry.fn, entry.args || []);
    });
  }
}

/**
 * {@link DataSet} code that can be reused in {@link DataView} or other similar implementations of {@link DataInterface}.
 * @typeParam Item - Item type that may or may not have an id.
 * @typeParam IdProp - Name of the property that contains the id.
 */
class DataSetPart {
  constructor() {
    _defineProperty(this, "_subscribers", {
      "*": [],
      add: [],
      remove: [],
      update: []
    });
    /**
     * @deprecated Use on instead (PS: DataView.subscribe === DataView.on).
     */
    _defineProperty(this, "subscribe", DataSetPart.prototype.on);
    /**
     * @deprecated Use off instead (PS: DataView.unsubscribe === DataView.off).
     */
    _defineProperty(this, "unsubscribe", DataSetPart.prototype.off);
  }
  /**
   * Trigger an event
   * @param event - Event name.
   * @param payload - Event payload.
   * @param senderId - Id of the sender.
   */
  _trigger(event, payload, senderId) {
    var _context;
    if (event === "*") {
      throw new Error("Cannot trigger event *");
    }
    _forEachInstanceProperty(_context = [...this._subscribers[event], ...this._subscribers["*"]]).call(_context, subscriber => {
      subscriber(event, payload, senderId != null ? senderId : null);
    });
  }
  /**
   * Subscribe to an event, add an event listener.
   * @remarks Non-function callbacks are ignored.
   * @param event - Event name.
   * @param callback - Callback method.
   */
  on(event, callback) {
    if (typeof callback === "function") {
      this._subscribers[event].push(callback);
    }
    // @TODO: Maybe throw for invalid callbacks?
  }
  /**
   * Unsubscribe from an event, remove an event listener.
   * @remarks If the same callback was subscribed more than once **all** occurences will be removed.
   * @param event - Event name.
   * @param callback - Callback method.
   */
  off(event, callback) {
    var _context2;
    this._subscribers[event] = _filterInstanceProperty(_context2 = this._subscribers[event]).call(_context2, subscriber => subscriber !== callback);
  }
  /* develblock:start */
  get testLeakSubscribers() {
    return this._subscribers;
  }
}

var es_object_create = {};

var hasRequiredEs_object_create;

function requireEs_object_create () {
	if (hasRequiredEs_object_create) return es_object_create;
	hasRequiredEs_object_create = 1;
	// TODO: Remove from `core-js@4`
	var $ = /*@__PURE__*/ require_export();
	var DESCRIPTORS = /*@__PURE__*/ requireDescriptors();
	var create = /*@__PURE__*/ requireObjectCreate();

	// `Object.create` method
	// https://tc39.es/ecma262/#sec-object.create
	$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
	  create: create
	});
	return es_object_create;
}

var create$2;
var hasRequiredCreate$2;

function requireCreate$2 () {
	if (hasRequiredCreate$2) return create$2;
	hasRequiredCreate$2 = 1;
	requireEs_object_create();
	var path = /*@__PURE__*/ requirePath();

	var Object = path.Object;

	create$2 = function create(P, D) {
	  return Object.create(P, D);
	};
	return create$2;
}

var create$1;
var hasRequiredCreate$1;

function requireCreate$1 () {
	if (hasRequiredCreate$1) return create$1;
	hasRequiredCreate$1 = 1;
	var parent = /*@__PURE__*/ requireCreate$2();

	create$1 = parent;
	return create$1;
}

var create;
var hasRequiredCreate;

function requireCreate () {
	if (hasRequiredCreate) return create;
	hasRequiredCreate = 1;
	create = /*@__PURE__*/ requireCreate$1();
	return create;
}

var createExports = requireCreate();
var _Object$create = /*@__PURE__*/getDefaultExportFromCjs(createExports);

var es_set = {};

var es_set_constructor = {};

var hasRequiredEs_set_constructor;

function requireEs_set_constructor () {
	if (hasRequiredEs_set_constructor) return es_set_constructor;
	hasRequiredEs_set_constructor = 1;
	var collection = /*@__PURE__*/ requireCollection();
	var collectionStrong = /*@__PURE__*/ requireCollectionStrong();

	// `Set` constructor
	// https://tc39.es/ecma262/#sec-set-objects
	collection('Set', function (init) {
	  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);
	return es_set_constructor;
}

var hasRequiredEs_set;

function requireEs_set () {
	if (hasRequiredEs_set) return es_set;
	hasRequiredEs_set = 1;
	// TODO: Remove this module from `core-js@4` since it's replaced to module below
	requireEs_set_constructor();
	return es_set;
}

var es_set_difference_v2 = {};

var aSet;
var hasRequiredASet;

function requireASet () {
	if (hasRequiredASet) return aSet;
	hasRequiredASet = 1;
	var tryToString = /*@__PURE__*/ requireTryToString();

	var $TypeError = TypeError;

	// Perform ? RequireInternalSlot(M, [[SetData]])
	aSet = function (it) {
	  if (typeof it == 'object' && 'size' in it && 'has' in it && 'add' in it && 'delete' in it && 'keys' in it) return it;
	  throw new $TypeError(tryToString(it) + ' is not a set');
	};
	return aSet;
}

var setHelpers;
var hasRequiredSetHelpers;

function requireSetHelpers () {
	if (hasRequiredSetHelpers) return setHelpers;
	hasRequiredSetHelpers = 1;
	var getBuiltIn = /*@__PURE__*/ requireGetBuiltIn();
	var caller = /*@__PURE__*/ requireCaller();

	var Set = getBuiltIn('Set');
	var SetPrototype = Set.prototype;

	setHelpers = {
	  Set: Set,
	  add: caller('add', 1),
	  has: caller('has', 1),
	  remove: caller('delete', 1),
	  proto: SetPrototype
	};
	return setHelpers;
}

var iterateSimple;
var hasRequiredIterateSimple;

function requireIterateSimple () {
	if (hasRequiredIterateSimple) return iterateSimple;
	hasRequiredIterateSimple = 1;
	var call = /*@__PURE__*/ requireFunctionCall();

	iterateSimple = function (record, fn, ITERATOR_INSTEAD_OF_RECORD) {
	  var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator;
	  var next = record.next;
	  var step, result;
	  while (!(step = call(next, iterator)).done) {
	    result = fn(step.value);
	    if (result !== undefined) return result;
	  }
	};
	return iterateSimple;
}

var setIterate;
var hasRequiredSetIterate;

function requireSetIterate () {
	if (hasRequiredSetIterate) return setIterate;
	hasRequiredSetIterate = 1;
	var iterateSimple = /*@__PURE__*/ requireIterateSimple();

	setIterate = function (set, fn, interruptible) {
	  return interruptible ? iterateSimple(set.keys(), fn, true) : set.forEach(fn);
	};
	return setIterate;
}

var setClone;
var hasRequiredSetClone;

function requireSetClone () {
	if (hasRequiredSetClone) return setClone;
	hasRequiredSetClone = 1;
	var SetHelpers = /*@__PURE__*/ requireSetHelpers();
	var iterate = /*@__PURE__*/ requireSetIterate();

	var Set = SetHelpers.Set;
	var add = SetHelpers.add;

	setClone = function (set) {
	  var result = new Set();
	  iterate(set, function (it) {
	    add(result, it);
	  });
	  return result;
	};
	return setClone;
}

var setSize;
var hasRequiredSetSize;

function requireSetSize () {
	if (hasRequiredSetSize) return setSize;
	hasRequiredSetSize = 1;
	setSize = function (set) {
	  return set.size;
	};
	return setSize;
}

var getIteratorDirect;
var hasRequiredGetIteratorDirect;

function requireGetIteratorDirect () {
	if (hasRequiredGetIteratorDirect) return getIteratorDirect;
	hasRequiredGetIteratorDirect = 1;
	// `GetIteratorDirect(obj)` abstract operation
	// https://tc39.es/ecma262/#sec-getiteratordirect
	getIteratorDirect = function (obj) {
	  return {
	    iterator: obj,
	    next: obj.next,
	    done: false
	  };
	};
	return getIteratorDirect;
}

var getSetRecord;
var hasRequiredGetSetRecord;

function requireGetSetRecord () {
	if (hasRequiredGetSetRecord) return getSetRecord;
	hasRequiredGetSetRecord = 1;
	var aCallable = /*@__PURE__*/ requireACallable();
	var anObject = /*@__PURE__*/ requireAnObject();
	var call = /*@__PURE__*/ requireFunctionCall();
	var toIntegerOrInfinity = /*@__PURE__*/ requireToIntegerOrInfinity();
	var getIteratorDirect = /*@__PURE__*/ requireGetIteratorDirect();

	var INVALID_SIZE = 'Invalid size';
	var $RangeError = RangeError;
	var $TypeError = TypeError;
	var max = Math.max;

	var SetRecord = function (set, intSize) {
	  this.set = set;
	  this.size = max(intSize, 0);
	  this.has = aCallable(set.has);
	  this.keys = aCallable(set.keys);
	};

	SetRecord.prototype = {
	  getIterator: function () {
	    return getIteratorDirect(anObject(call(this.keys, this.set)));
	  },
	  includes: function (it) {
	    return call(this.has, this.set, it);
	  }
	};

	// `GetSetRecord` abstract operation
	// https://tc39.es/proposal-set-methods/#sec-getsetrecord
	getSetRecord = function (obj) {
	  anObject(obj);
	  var numSize = +obj.size;
	  // NOTE: If size is undefined, then numSize will be NaN
	  // eslint-disable-next-line no-self-compare -- NaN check
	  if (numSize !== numSize) throw new $TypeError(INVALID_SIZE);
	  var intSize = toIntegerOrInfinity(numSize);
	  if (intSize < 0) throw new $RangeError(INVALID_SIZE);
	  return new SetRecord(obj, intSize);
	};
	return getSetRecord;
}

var setDifference;
var hasRequiredSetDifference;

function requireSetDifference () {
	if (hasRequiredSetDifference) return setDifference;
	hasRequiredSetDifference = 1;
	var aSet = /*@__PURE__*/ requireASet();
	var SetHelpers = /*@__PURE__*/ requireSetHelpers();
	var clone = /*@__PURE__*/ requireSetClone();
	var size = /*@__PURE__*/ requireSetSize();
	var getSetRecord = /*@__PURE__*/ requireGetSetRecord();
	var iterateSet = /*@__PURE__*/ requireSetIterate();
	var iterateSimple = /*@__PURE__*/ requireIterateSimple();

	var has = SetHelpers.has;
	var remove = SetHelpers.remove;

	// `Set.prototype.difference` method
	// https://tc39.es/ecma262/#sec-set.prototype.difference
	setDifference = function difference(other) {
	  var O = aSet(this);
	  var otherRec = getSetRecord(other);
	  var result = clone(O);
	  if (size(O) <= otherRec.size) iterateSet(O, function (e) {
	    if (otherRec.includes(e)) remove(result, e);
	  });
	  else iterateSimple(otherRec.getIterator(), function (e) {
	    if (has(result, e)) remove(result, e);
	  });
	  return result;
	};
	return setDifference;
}

var setMethodAcceptSetLike;
var hasRequiredSetMethodAcceptSetLike;

function requireSetMethodAcceptSetLike () {
	if (hasRequiredSetMethodAcceptSetLike) return setMethodAcceptSetLike;
	hasRequiredSetMethodAcceptSetLike = 1;
	setMethodAcceptSetLike = function () {
	  return false;
	};
	return setMethodAcceptSetLike;
}

var hasRequiredEs_set_difference_v2;

function requireEs_set_difference_v2 () {
	if (hasRequiredEs_set_difference_v2) return es_set_difference_v2;
	hasRequiredEs_set_difference_v2 = 1;
	var $ = /*@__PURE__*/ require_export();
	var difference = /*@__PURE__*/ requireSetDifference();
	var fails = /*@__PURE__*/ requireFails();
	var setMethodAcceptSetLike = /*@__PURE__*/ requireSetMethodAcceptSetLike();

	var SET_LIKE_INCORRECT_BEHAVIOR = !setMethodAcceptSetLike('difference', function (result) {
	  return result.size === 0;
	});

	var FORCED = SET_LIKE_INCORRECT_BEHAVIOR || fails(function () {
	  // https://bugs.webkit.org/show_bug.cgi?id=288595
	  var setLike = {
	    size: 1,
	    has: function () { return true; },
	    keys: function () {
	      var index = 0;
	      return {
	        next: function () {
	          var done = index++ > 1;
	          if (baseSet.has(1)) baseSet.clear();
	          return { done: done, value: 2 };
	        }
	      };
	    }
	  };
	  // eslint-disable-next-line es/no-set -- testing
	  var baseSet = new Set([1, 2, 3, 4]);
	  // eslint-disable-next-line es/no-set-prototype-difference -- testing
	  return baseSet.difference(setLike).size !== 3;
	});

	// `Set.prototype.difference` method
	// https://tc39.es/ecma262/#sec-set.prototype.difference
	$({ target: 'Set', proto: true, real: true, forced: FORCED }, {
	  difference: difference
	});
	return es_set_difference_v2;
}

var es_set_intersection_v2 = {};

var setIntersection;
var hasRequiredSetIntersection;

function requireSetIntersection () {
	if (hasRequiredSetIntersection) return setIntersection;
	hasRequiredSetIntersection = 1;
	var aSet = /*@__PURE__*/ requireASet();
	var SetHelpers = /*@__PURE__*/ requireSetHelpers();
	var size = /*@__PURE__*/ requireSetSize();
	var getSetRecord = /*@__PURE__*/ requireGetSetRecord();
	var iterateSet = /*@__PURE__*/ requireSetIterate();
	var iterateSimple = /*@__PURE__*/ requireIterateSimple();

	var Set = SetHelpers.Set;
	var add = SetHelpers.add;
	var has = SetHelpers.has;

	// `Set.prototype.intersection` method
	// https://tc39.es/ecma262/#sec-set.prototype.intersection
	setIntersection = function intersection(other) {
	  var O = aSet(this);
	  var otherRec = getSetRecord(other);
	  var result = new Set();

	  if (size(O) > otherRec.size) {
	    iterateSimple(otherRec.getIterator(), function (e) {
	      if (has(O, e)) add(result, e);
	    });
	  } else {
	    iterateSet(O, function (e) {
	      if (otherRec.includes(e)) add(result, e);
	    });
	  }

	  return result;
	};
	return setIntersection;
}

var hasRequiredEs_set_intersection_v2;

function requireEs_set_intersection_v2 () {
	if (hasRequiredEs_set_intersection_v2) return es_set_intersection_v2;
	hasRequiredEs_set_intersection_v2 = 1;
	var $ = /*@__PURE__*/ require_export();
	var fails = /*@__PURE__*/ requireFails();
	var intersection = /*@__PURE__*/ requireSetIntersection();
	var setMethodAcceptSetLike = /*@__PURE__*/ requireSetMethodAcceptSetLike();

	var INCORRECT = !setMethodAcceptSetLike('intersection', function (result) {
	  return result.size === 2 && result.has(1) && result.has(2);
	}) || fails(function () {
	  // eslint-disable-next-line es/no-array-from, es/no-set, es/no-set-prototype-intersection -- testing
	  return String(Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2])))) !== '3,2';
	});

	// `Set.prototype.intersection` method
	// https://tc39.es/ecma262/#sec-set.prototype.intersection
	$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
	  intersection: intersection
	});
	return es_set_intersection_v2;
}

var es_set_isDisjointFrom_v2 = {};

var setIsDisjointFrom;
var hasRequiredSetIsDisjointFrom;

function requireSetIsDisjointFrom () {
	if (hasRequiredSetIsDisjointFrom) return setIsDisjointFrom;
	hasRequiredSetIsDisjointFrom = 1;
	var aSet = /*@__PURE__*/ requireASet();
	var has = /*@__PURE__*/ requireSetHelpers().has;
	var size = /*@__PURE__*/ requireSetSize();
	var getSetRecord = /*@__PURE__*/ requireGetSetRecord();
	var iterateSet = /*@__PURE__*/ requireSetIterate();
	var iterateSimple = /*@__PURE__*/ requireIterateSimple();
	var iteratorClose = /*@__PURE__*/ requireIteratorClose();

	// `Set.prototype.isDisjointFrom` method
	// https://tc39.es/ecma262/#sec-set.prototype.isdisjointfrom
	setIsDisjointFrom = function isDisjointFrom(other) {
	  var O = aSet(this);
	  var otherRec = getSetRecord(other);
	  if (size(O) <= otherRec.size) return iterateSet(O, function (e) {
	    if (otherRec.includes(e)) return false;
	  }, true) !== false;
	  var iterator = otherRec.getIterator();
	  return iterateSimple(iterator, function (e) {
	    if (has(O, e)) return iteratorClose(iterator, 'normal', false);
	  }) !== false;
	};
	return setIsDisjointFrom;
}

var hasRequiredEs_set_isDisjointFrom_v2;

function requireEs_set_isDisjointFrom_v2 () {
	if (hasRequiredEs_set_isDisjointFrom_v2) return es_set_isDisjointFrom_v2;
	hasRequiredEs_set_isDisjointFrom_v2 = 1;
	var $ = /*@__PURE__*/ require_export();
	var isDisjointFrom = /*@__PURE__*/ requireSetIsDisjointFrom();
	var setMethodAcceptSetLike = /*@__PURE__*/ requireSetMethodAcceptSetLike();

	var INCORRECT = !setMethodAcceptSetLike('isDisjointFrom', function (result) {
	  return !result;
	});

	// `Set.prototype.isDisjointFrom` method
	// https://tc39.es/ecma262/#sec-set.prototype.isdisjointfrom
	$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
	  isDisjointFrom: isDisjointFrom
	});
	return es_set_isDisjointFrom_v2;
}

var es_set_isSubsetOf_v2 = {};

var setIsSubsetOf;
var hasRequiredSetIsSubsetOf;

function requireSetIsSubsetOf () {
	if (hasRequiredSetIsSubsetOf) return setIsSubsetOf;
	hasRequiredSetIsSubsetOf = 1;
	var aSet = /*@__PURE__*/ requireASet();
	var size = /*@__PURE__*/ requireSetSize();
	var iterate = /*@__PURE__*/ requireSetIterate();
	var getSetRecord = /*@__PURE__*/ requireGetSetRecord();

	// `Set.prototype.isSubsetOf` method
	// https://tc39.es/ecma262/#sec-set.prototype.issubsetof
	setIsSubsetOf = function isSubsetOf(other) {
	  var O = aSet(this);
	  var otherRec = getSetRecord(other);
	  if (size(O) > otherRec.size) return false;
	  return iterate(O, function (e) {
	    if (!otherRec.includes(e)) return false;
	  }, true) !== false;
	};
	return setIsSubsetOf;
}

var hasRequiredEs_set_isSubsetOf_v2;

function requireEs_set_isSubsetOf_v2 () {
	if (hasRequiredEs_set_isSubsetOf_v2) return es_set_isSubsetOf_v2;
	hasRequiredEs_set_isSubsetOf_v2 = 1;
	var $ = /*@__PURE__*/ require_export();
	var isSubsetOf = /*@__PURE__*/ requireSetIsSubsetOf();
	var setMethodAcceptSetLike = /*@__PURE__*/ requireSetMethodAcceptSetLike();

	var INCORRECT = !setMethodAcceptSetLike('isSubsetOf', function (result) {
	  return result;
	});

	// `Set.prototype.isSubsetOf` method
	// https://tc39.es/ecma262/#sec-set.prototype.issubsetof
	$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
	  isSubsetOf: isSubsetOf
	});
	return es_set_isSubsetOf_v2;
}

var es_set_isSupersetOf_v2 = {};

var setIsSupersetOf;
var hasRequiredSetIsSupersetOf;

function requireSetIsSupersetOf () {
	if (hasRequiredSetIsSupersetOf) return setIsSupersetOf;
	hasRequiredSetIsSupersetOf = 1;
	var aSet = /*@__PURE__*/ requireASet();
	var has = /*@__PURE__*/ requireSetHelpers().has;
	var size = /*@__PURE__*/ requireSetSize();
	var getSetRecord = /*@__PURE__*/ requireGetSetRecord();
	var iterateSimple = /*@__PURE__*/ requireIterateSimple();
	var iteratorClose = /*@__PURE__*/ requireIteratorClose();

	// `Set.prototype.isSupersetOf` method
	// https://tc39.es/ecma262/#sec-set.prototype.issupersetof
	setIsSupersetOf = function isSupersetOf(other) {
	  var O = aSet(this);
	  var otherRec = getSetRecord(other);
	  if (size(O) < otherRec.size) return false;
	  var iterator = otherRec.getIterator();
	  return iterateSimple(iterator, function (e) {
	    if (!has(O, e)) return iteratorClose(iterator, 'normal', false);
	  }) !== false;
	};
	return setIsSupersetOf;
}

var hasRequiredEs_set_isSupersetOf_v2;

function requireEs_set_isSupersetOf_v2 () {
	if (hasRequiredEs_set_isSupersetOf_v2) return es_set_isSupersetOf_v2;
	hasRequiredEs_set_isSupersetOf_v2 = 1;
	var $ = /*@__PURE__*/ require_export();
	var isSupersetOf = /*@__PURE__*/ requireSetIsSupersetOf();
	var setMethodAcceptSetLike = /*@__PURE__*/ requireSetMethodAcceptSetLike();

	var INCORRECT = !setMethodAcceptSetLike('isSupersetOf', function (result) {
	  return !result;
	});

	// `Set.prototype.isSupersetOf` method
	// https://tc39.es/ecma262/#sec-set.prototype.issupersetof
	$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
	  isSupersetOf: isSupersetOf
	});
	return es_set_isSupersetOf_v2;
}

var es_set_symmetricDifference_v2 = {};

var setSymmetricDifference;
var hasRequiredSetSymmetricDifference;

function requireSetSymmetricDifference () {
	if (hasRequiredSetSymmetricDifference) return setSymmetricDifference;
	hasRequiredSetSymmetricDifference = 1;
	var aSet = /*@__PURE__*/ requireASet();
	var SetHelpers = /*@__PURE__*/ requireSetHelpers();
	var clone = /*@__PURE__*/ requireSetClone();
	var getSetRecord = /*@__PURE__*/ requireGetSetRecord();
	var iterateSimple = /*@__PURE__*/ requireIterateSimple();

	var add = SetHelpers.add;
	var has = SetHelpers.has;
	var remove = SetHelpers.remove;

	// `Set.prototype.symmetricDifference` method
	// https://tc39.es/ecma262/#sec-set.prototype.symmetricdifference
	setSymmetricDifference = function symmetricDifference(other) {
	  var O = aSet(this);
	  var keysIter = getSetRecord(other).getIterator();
	  var result = clone(O);
	  iterateSimple(keysIter, function (e) {
	    if (has(O, e)) remove(result, e);
	    else add(result, e);
	  });
	  return result;
	};
	return setSymmetricDifference;
}

var setMethodGetKeysBeforeCloningDetection;
var hasRequiredSetMethodGetKeysBeforeCloningDetection;

function requireSetMethodGetKeysBeforeCloningDetection () {
	if (hasRequiredSetMethodGetKeysBeforeCloningDetection) return setMethodGetKeysBeforeCloningDetection;
	hasRequiredSetMethodGetKeysBeforeCloningDetection = 1;
	// Should get iterator record of a set-like object before cloning this
	// https://bugs.webkit.org/show_bug.cgi?id=289430
	setMethodGetKeysBeforeCloningDetection = function (METHOD_NAME) {
	  try {
	    // eslint-disable-next-line es/no-set -- needed for test
	    var baseSet = new Set();
	    var setLike = {
	      size: 0,
	      has: function () { return true; },
	      keys: function () {
	        // eslint-disable-next-line es/no-object-defineproperty -- needed for test
	        return Object.defineProperty({}, 'next', {
	          get: function () {
	            baseSet.clear();
	            baseSet.add(4);
	            return function () {
	              return { done: true };
	            };
	          }
	        });
	      }
	    };
	    var result = baseSet[METHOD_NAME](setLike);

	    return result.size === 1 && result.values().next().value === 4;
	  } catch (error) {
	    return false;
	  }
	};
	return setMethodGetKeysBeforeCloningDetection;
}

var hasRequiredEs_set_symmetricDifference_v2;

function requireEs_set_symmetricDifference_v2 () {
	if (hasRequiredEs_set_symmetricDifference_v2) return es_set_symmetricDifference_v2;
	hasRequiredEs_set_symmetricDifference_v2 = 1;
	var $ = /*@__PURE__*/ require_export();
	var symmetricDifference = /*@__PURE__*/ requireSetSymmetricDifference();
	var setMethodGetKeysBeforeCloning = /*@__PURE__*/ requireSetMethodGetKeysBeforeCloningDetection();
	var setMethodAcceptSetLike = /*@__PURE__*/ requireSetMethodAcceptSetLike();

	var FORCED = !setMethodAcceptSetLike('symmetricDifference') || !setMethodGetKeysBeforeCloning('symmetricDifference');

	// `Set.prototype.symmetricDifference` method
	// https://tc39.es/ecma262/#sec-set.prototype.symmetricdifference
	$({ target: 'Set', proto: true, real: true, forced: FORCED }, {
	  symmetricDifference: symmetricDifference
	});
	return es_set_symmetricDifference_v2;
}

var es_set_union_v2 = {};

var setUnion;
var hasRequiredSetUnion;

function requireSetUnion () {
	if (hasRequiredSetUnion) return setUnion;
	hasRequiredSetUnion = 1;
	var aSet = /*@__PURE__*/ requireASet();
	var add = /*@__PURE__*/ requireSetHelpers().add;
	var clone = /*@__PURE__*/ requireSetClone();
	var getSetRecord = /*@__PURE__*/ requireGetSetRecord();
	var iterateSimple = /*@__PURE__*/ requireIterateSimple();

	// `Set.prototype.union` method
	// https://tc39.es/ecma262/#sec-set.prototype.union
	setUnion = function union(other) {
	  var O = aSet(this);
	  var keysIter = getSetRecord(other).getIterator();
	  var result = clone(O);
	  iterateSimple(keysIter, function (it) {
	    add(result, it);
	  });
	  return result;
	};
	return setUnion;
}

var hasRequiredEs_set_union_v2;

function requireEs_set_union_v2 () {
	if (hasRequiredEs_set_union_v2) return es_set_union_v2;
	hasRequiredEs_set_union_v2 = 1;
	var $ = /*@__PURE__*/ require_export();
	var union = /*@__PURE__*/ requireSetUnion();
	var setMethodGetKeysBeforeCloning = /*@__PURE__*/ requireSetMethodGetKeysBeforeCloningDetection();
	var setMethodAcceptSetLike = /*@__PURE__*/ requireSetMethodAcceptSetLike();

	var FORCED = !setMethodAcceptSetLike('union') || !setMethodGetKeysBeforeCloning('union');

	// `Set.prototype.union` method
	// https://tc39.es/ecma262/#sec-set.prototype.union
	$({ target: 'Set', proto: true, real: true, forced: FORCED }, {
	  union: union
	});
	return es_set_union_v2;
}

var set$2;
var hasRequiredSet$2;

function requireSet$2 () {
	if (hasRequiredSet$2) return set$2;
	hasRequiredSet$2 = 1;
	requireEs_array_iterator();
	requireEs_set();
	requireEs_set_difference_v2();
	requireEs_set_intersection_v2();
	requireEs_set_isDisjointFrom_v2();
	requireEs_set_isSubsetOf_v2();
	requireEs_set_isSupersetOf_v2();
	requireEs_set_symmetricDifference_v2();
	requireEs_set_union_v2();
	requireEs_string_iterator();
	var path = /*@__PURE__*/ requirePath();

	set$2 = path.Set;
	return set$2;
}

var set$1;
var hasRequiredSet$1;

function requireSet$1 () {
	if (hasRequiredSet$1) return set$1;
	hasRequiredSet$1 = 1;
	var parent = /*@__PURE__*/ requireSet$2();
	requireWeb_domCollections_iterator();

	set$1 = parent;
	return set$1;
}

var set;
var hasRequiredSet;

function requireSet () {
	if (hasRequiredSet) return set;
	hasRequiredSet = 1;
	set = /*@__PURE__*/ requireSet$1();
	return set;
}

var setExports = requireSet();
var _Set = /*@__PURE__*/getDefaultExportFromCjs(setExports);

var getIterator_1;
var hasRequiredGetIterator$5;

function requireGetIterator$5 () {
	if (hasRequiredGetIterator$5) return getIterator_1;
	hasRequiredGetIterator$5 = 1;
	requireEs_array_iterator();
	requireEs_string_iterator();
	var getIterator = /*@__PURE__*/ requireGetIterator$6();

	getIterator_1 = getIterator;
	return getIterator_1;
}

var getIterator$4;
var hasRequiredGetIterator$4;

function requireGetIterator$4 () {
	if (hasRequiredGetIterator$4) return getIterator$4;
	hasRequiredGetIterator$4 = 1;
	var parent = /*@__PURE__*/ requireGetIterator$5();
	requireWeb_domCollections_iterator();

	getIterator$4 = parent;
	return getIterator$4;
}

var getIterator$3;
var hasRequiredGetIterator$3;

function requireGetIterator$3 () {
	if (hasRequiredGetIterator$3) return getIterator$3;
	hasRequiredGetIterator$3 = 1;
	var parent = /*@__PURE__*/ requireGetIterator$4();

	getIterator$3 = parent;
	return getIterator$3;
}

var getIterator$2;
var hasRequiredGetIterator$2;

function requireGetIterator$2 () {
	if (hasRequiredGetIterator$2) return getIterator$2;
	hasRequiredGetIterator$2 = 1;
	var parent = /*@__PURE__*/ requireGetIterator$3();

	getIterator$2 = parent;
	return getIterator$2;
}

var getIterator$1;
var hasRequiredGetIterator$1;

function requireGetIterator$1 () {
	if (hasRequiredGetIterator$1) return getIterator$1;
	hasRequiredGetIterator$1 = 1;
	getIterator$1 = /*@__PURE__*/ requireGetIterator$2();
	return getIterator$1;
}

var getIterator;
var hasRequiredGetIterator;

function requireGetIterator () {
	if (hasRequiredGetIterator) return getIterator;
	hasRequiredGetIterator = 1;
	getIterator = /*@__PURE__*/ requireGetIterator$1();
	return getIterator;
}

var getIteratorExports = requireGetIterator();
var _getIterator = /*@__PURE__*/getDefaultExportFromCjs(getIteratorExports);

/**
 * Data stream
 * @remarks
 * {@link DataStream} offers an always up to date stream of items from a {@link DataSet} or {@link DataView}.
 * That means that the stream is evaluated at the time of iteration, conversion to another data type or when {@link cache} is called, not when the {@link DataStream} was created.
 * Multiple invocations of for example {@link toItemArray} may yield different results (if the data source like for example {@link DataSet} gets modified).
 * @typeParam Item - The item type this stream is going to work with.
 */
class DataStream {
  /**
   * Create a new data stream.
   * @param pairs - The id, item pairs.
   */
  constructor(pairs) {
    this._pairs = pairs;
  }
  /**
   * Return an iterable of key, value pairs for every entry in the stream.
   */
  *[_Symbol$iterator]() {
    for (const [id, item] of this._pairs) {
      yield [id, item];
    }
  }
  /**
   * Return an iterable of key, value pairs for every entry in the stream.
   */
  *entries() {
    for (const [id, item] of this._pairs) {
      yield [id, item];
    }
  }
  /**
   * Return an iterable of keys in the stream.
   */
  *keys() {
    for (const [id] of this._pairs) {
      yield id;
    }
  }
  /**
   * Return an iterable of values in the stream.
   */
  *values() {
    for (const [, item] of this._pairs) {
      yield item;
    }
  }
  /**
   * Return an array containing all the ids in this stream.
   * @remarks
   * The array may contain duplicities.
   * @returns The array with all ids from this stream.
   */
  toIdArray() {
    var _context;
    return _mapInstanceProperty(_context = [...this._pairs]).call(_context, pair => pair[0]);
  }
  /**
   * Return an array containing all the items in this stream.
   * @remarks
   * The array may contain duplicities.
   * @returns The array with all items from this stream.
   */
  toItemArray() {
    var _context2;
    return _mapInstanceProperty(_context2 = [...this._pairs]).call(_context2, pair => pair[1]);
  }
  /**
   * Return an array containing all the entries in this stream.
   * @remarks
   * The array may contain duplicities.
   * @returns The array with all entries from this stream.
   */
  toEntryArray() {
    return [...this._pairs];
  }
  /**
   * Return an object map containing all the items in this stream accessible by ids.
   * @remarks
   * In case of duplicate ids (coerced to string so `7 == '7'`) the last encoutered appears in the returned object.
   * @returns The object map of all id → item pairs from this stream.
   */
  toObjectMap() {
    const map = _Object$create(null);
    for (const [id, item] of this._pairs) {
      map[id] = item;
    }
    return map;
  }
  /**
   * Return a map containing all the items in this stream accessible by ids.
   * @returns The map of all id → item pairs from this stream.
   */
  toMap() {
    return new _Map(this._pairs);
  }
  /**
   * Return a set containing all the (unique) ids in this stream.
   * @returns The set of all ids from this stream.
   */
  toIdSet() {
    return new _Set(this.toIdArray());
  }
  /**
   * Return a set containing all the (unique) items in this stream.
   * @returns The set of all items from this stream.
   */
  toItemSet() {
    return new _Set(this.toItemArray());
  }
  /**
   * Cache the items from this stream.
   * @remarks
   * This method allows for items to be fetched immediatelly and used (possibly multiple times) later.
   * It can also be used to optimize performance as {@link DataStream} would otherwise reevaluate everything upon each iteration.
   *
   * ## Example
   * ```javascript
   * const ds = new DataSet([…])
   *
   * const cachedStream = ds.stream()
   *   .filter(…)
   *   .sort(…)
   *   .map(…)
   *   .cached(…) // Data are fetched, processed and cached here.
   *
   * ds.clear()
   * chachedStream // Still has all the items.
   * ```
   * @returns A new {@link DataStream} with cached items (detached from the original {@link DataSet}).
   */
  cache() {
    return new DataStream([...this._pairs]);
  }
  /**
   * Get the distinct values of given property.
   * @param callback - The function that picks and possibly converts the property.
   * @typeParam T - The type of the distinct value.
   * @returns A set of all distinct properties.
   */
  distinct(callback) {
    const set = new _Set();
    for (const [id, item] of this._pairs) {
      set.add(callback(item, id));
    }
    return set;
  }
  /**
   * Filter the items of the stream.
   * @param callback - The function that decides whether an item will be included.
   * @returns A new data stream with the filtered items.
   */
  filter(callback) {
    const pairs = this._pairs;
    return new DataStream({
      *[_Symbol$iterator]() {
        for (const [id, item] of pairs) {
          if (callback(item, id)) {
            yield [id, item];
          }
        }
      }
    });
  }
  /**
   * Execute a callback for each item of the stream.
   * @param callback - The function that will be invoked for each item.
   */
  forEach(callback) {
    for (const [id, item] of this._pairs) {
      callback(item, id);
    }
  }
  /**
   * Map the items into a different type.
   * @param callback - The function that does the conversion.
   * @typeParam Mapped - The type of the item after mapping.
   * @returns A new data stream with the mapped items.
   */
  map(callback) {
    const pairs = this._pairs;
    return new DataStream({
      *[_Symbol$iterator]() {
        for (const [id, item] of pairs) {
          yield [id, callback(item, id)];
        }
      }
    });
  }
  /**
   * Get the item with the maximum value of given property.
   * @param callback - The function that picks and possibly converts the property.
   * @returns The item with the maximum if found otherwise null.
   */
  max(callback) {
    const iter = _getIterator(this._pairs);
    let curr = iter.next();
    if (curr.done) {
      return null;
    }
    let maxItem = curr.value[1];
    let maxValue = callback(curr.value[1], curr.value[0]);
    while (!(curr = iter.next()).done) {
      const [id, item] = curr.value;
      const value = callback(item, id);
      if (value > maxValue) {
        maxValue = value;
        maxItem = item;
      }
    }
    return maxItem;
  }
  /**
   * Get the item with the minimum value of given property.
   * @param callback - The function that picks and possibly converts the property.
   * @returns The item with the minimum if found otherwise null.
   */
  min(callback) {
    const iter = _getIterator(this._pairs);
    let curr = iter.next();
    if (curr.done) {
      return null;
    }
    let minItem = curr.value[1];
    let minValue = callback(curr.value[1], curr.value[0]);
    while (!(curr = iter.next()).done) {
      const [id, item] = curr.value;
      const value = callback(item, id);
      if (value < minValue) {
        minValue = value;
        minItem = item;
      }
    }
    return minItem;
  }
  /**
   * Reduce the items into a single value.
   * @param callback - The function that does the reduction.
   * @param accumulator - The initial value of the accumulator.
   * @typeParam T - The type of the accumulated value.
   * @returns The reduced value.
   */
  reduce(callback, accumulator) {
    for (const [id, item] of this._pairs) {
      accumulator = callback(accumulator, item, id);
    }
    return accumulator;
  }
  /**
   * Sort the items.
   * @param callback - Item comparator.
   * @returns A new stream with sorted items.
   */
  sort(callback) {
    return new DataStream({
      [_Symbol$iterator]: () => {
        var _context3;
        return _getIterator(_sortInstanceProperty(_context3 = [...this._pairs]).call(_context3, (_ref, _ref2) => {
          let [idA, itemA] = _ref;
          let [idB, itemB] = _ref2;
          return callback(itemA, itemB, idA, idB);
        }));
      }
    });
  }
}

function ownKeys$3(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context8, _context9; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context8 = ownKeys$3(Object(t), true)).call(_context8, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context9 = ownKeys$3(Object(t))).call(_context9, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
/**
 * Add an id to given item if it doesn't have one already.
 * @remarks
 * The item will be modified.
 * @param item - The item that will have an id after a call to this function.
 * @param idProp - The key of the id property.
 * @typeParam Item - Item type that may or may not have an id.
 * @typeParam IdProp - Name of the property that contains the id.
 * @returns true
 */
function ensureFullItem(item, idProp) {
  if (item[idProp] == null) {
    // generate an id
    item[idProp] = v4();
  }
  return item;
}
/**
 * # DataSet
 *
 * Vis.js comes with a flexible DataSet, which can be used to hold and
 * manipulate unstructured data and listen for changes in the data. The DataSet
 * is key/value based. Data items can be added, updated and removed from the
 * DataSet, and one can subscribe to changes in the DataSet. The data in the
 * DataSet can be filtered and ordered. Data can be normalized when appending it
 * to the DataSet as well.
 *
 * ## Example
 *
 * The following example shows how to use a DataSet.
 *
 * ```javascript
 * // create a DataSet
 * var options = {};
 * var data = new vis.DataSet(options);
 *
 * // add items
 * // note that the data items can contain different properties and data formats
 * data.add([
 * {id: 1, text: 'item 1', date: new Date(2013, 6, 20), group: 1, first: true},
 * {id: 2, text: 'item 2', date: '2013-06-23', group: 2},
 * {id: 3, text: 'item 3', date: '2013-06-25', group: 2},
 * {id: 4, text: 'item 4'}
 * ]);
 *
 * // subscribe to any change in the DataSet
 * data.on('*', function (event, properties, senderId) {
 * console.log('event', event, properties);
 * });
 *
 * // update an existing item
 * data.update({id: 2, group: 1});
 *
 * // remove an item
 * data.remove(4);
 *
 * // get all ids
 * var ids = data.getIds();
 * console.log('ids', ids);
 *
 * // get a specific item
 * var item1 = data.get(1);
 * console.log('item1', item1);
 *
 * // retrieve a filtered subset of the data
 * var items = data.get({
 * filter: function (item) {
 * return item.group == 1;
 * }
 * });
 * console.log('filtered items', items);
 * ```
 * @typeParam Item - Item type that may or may not have an id.
 * @typeParam IdProp - Name of the property that contains the id.
 */
class DataSet extends DataSetPart {
  /** Flush all queued calls. */

  /** @inheritDoc */

  /** @inheritDoc */
  get idProp() {
    return this._idProp;
  }
  /**
   * Construct a new DataSet.
   * @param data - Initial data or options.
   * @param options - Options (type error if data is also options).
   */
  constructor(data, options) {
    super();
    // correctly read optional arguments
    _defineProperty(this, "_queue", null);
    if (data && !_Array$isArray(data)) {
      options = data;
      data = [];
    }
    this._options = options || {};
    this._data = new _Map(); // map with data indexed by id
    this.length = 0; // number of items in the DataSet
    this._idProp = this._options.fieldId || "id"; // name of the field containing id
    // add initial data when provided
    if (data && data.length) {
      this.add(data);
    }
    this.setOptions(options);
  }
  /**
   * Set new options.
   * @param options - The new options.
   */
  setOptions(options) {
    if (options && options.queue !== undefined) {
      if (options.queue === false) {
        // delete queue if loaded
        if (this._queue) {
          this._queue.destroy();
          this._queue = null;
        }
      } else {
        // create queue and update its options
        if (!this._queue) {
          this._queue = Queue.extend(this, {
            replace: ["add", "update", "remove"]
          });
        }
        if (options.queue && typeof options.queue === "object") {
          this._queue.setOptions(options.queue);
        }
      }
    }
  }
  /**
   * Add a data item or an array with items.
   *
   * After the items are added to the DataSet, the DataSet will trigger an event `add`. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
   *
   * ## Example
   *
   * ```javascript
   * // create a DataSet
   * const data = new vis.DataSet()
   *
   * // add items
   * const ids = data.add([
   * { id: 1, text: 'item 1' },
   * { id: 2, text: 'item 2' },
   * { text: 'item without an id' }
   * ])
   *
   * console.log(ids) // [1, 2, '<UUIDv4>']
   * ```
   * @param data - Items to be added (ids will be generated if missing).
   * @param senderId - Sender id.
   * @returns addedIds - Array with the ids (generated if not present) of the added items.
   * @throws When an item with the same id as any of the added items already exists.
   */
  add(data, senderId) {
    const addedIds = [];
    let id;
    if (_Array$isArray(data)) {
      // Array
      const idsToAdd = _mapInstanceProperty(data).call(data, d => d[this._idProp]);
      if (_someInstanceProperty(idsToAdd).call(idsToAdd, id => this._data.has(id))) {
        throw new Error("A duplicate id was found in the parameter array.");
      }
      for (let i = 0, len = data.length; i < len; i++) {
        id = this._addItem(data[i]);
        addedIds.push(id);
      }
    } else if (data && typeof data === "object") {
      // Single item
      id = this._addItem(data);
      addedIds.push(id);
    } else {
      throw new Error("Unknown dataType");
    }
    if (addedIds.length) {
      this._trigger("add", {
        items: addedIds
      }, senderId);
    }
    return addedIds;
  }
  /**
   * Update existing items. When an item does not exist, it will be created.
   * @remarks
   * The provided properties will be merged in the existing item. When an item does not exist, it will be created.
   *
   * After the items are updated, the DataSet will trigger an event `add` for the added items, and an event `update`. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
   *
   * ## Example
   *
   * ```javascript
   * // create a DataSet
   * const data = new vis.DataSet([
   *   { id: 1, text: 'item 1' },
   *   { id: 2, text: 'item 2' },
   *   { id: 3, text: 'item 3' }
   * ])
   *
   * // update items
   * const ids = data.update([
   *   { id: 2, text: 'item 2 (updated)' },
   *   { id: 4, text: 'item 4 (new)' }
   * ])
   *
   * console.log(ids) // [2, 4]
   * ```
   *
   * ## Warning for TypeScript users
   * This method may introduce partial items into the data set. Use add or updateOnly instead for better type safety.
   * @param data - Items to be updated (if the id is already present) or added (if the id is missing).
   * @param senderId - Sender id.
   * @returns updatedIds - The ids of the added (these may be newly generated if there was no id in the item from the data) or updated items.
   * @throws When the supplied data is neither an item nor an array of items.
   */
  update(data, senderId) {
    const addedIds = [];
    const updatedIds = [];
    const oldData = [];
    const updatedData = [];
    const idProp = this._idProp;
    const addOrUpdate = item => {
      const origId = item[idProp];
      if (origId != null && this._data.has(origId)) {
        const fullItem = item; // it has an id, therefore it is a fullitem
        const oldItem = _Object$assign({}, this._data.get(origId));
        // update item
        const id = this._updateItem(fullItem);
        updatedIds.push(id);
        updatedData.push(fullItem);
        oldData.push(oldItem);
      } else {
        // add new item
        const id = this._addItem(item);
        addedIds.push(id);
      }
    };
    if (_Array$isArray(data)) {
      // Array
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i] && typeof data[i] === "object") {
          addOrUpdate(data[i]);
        } else {
          console.warn("Ignoring input item, which is not an object at index " + i);
        }
      }
    } else if (data && typeof data === "object") {
      // Single item
      addOrUpdate(data);
    } else {
      throw new Error("Unknown dataType");
    }
    if (addedIds.length) {
      this._trigger("add", {
        items: addedIds
      }, senderId);
    }
    if (updatedIds.length) {
      const props = {
        items: updatedIds,
        oldData: oldData,
        data: updatedData
      };
      // TODO: remove deprecated property 'data' some day
      //Object.defineProperty(props, 'data', {
      //  'get': (function() {
      //    console.warn('Property data is deprecated. Use DataSet.get(ids) to retrieve the new data, use the oldData property on this object to get the old data');
      //    return updatedData;
      //  }).bind(this)
      //});
      this._trigger("update", props, senderId);
    }
    return _concatInstanceProperty(addedIds).call(addedIds, updatedIds);
  }
  /**
   * Update existing items. When an item does not exist, an error will be thrown.
   * @remarks
   * The provided properties will be deeply merged into the existing item.
   * When an item does not exist (id not present in the data set or absent), an error will be thrown and nothing will be changed.
   *
   * After the items are updated, the DataSet will trigger an event `update`.
   * When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
   *
   * ## Example
   *
   * ```javascript
   * // create a DataSet
   * const data = new vis.DataSet([
   *   { id: 1, text: 'item 1' },
   *   { id: 2, text: 'item 2' },
   *   { id: 3, text: 'item 3' },
   * ])
   *
   * // update items
   * const ids = data.update([
   *   { id: 2, text: 'item 2 (updated)' }, // works
   *   // { id: 4, text: 'item 4 (new)' }, // would throw
   *   // { text: 'item 4 (new)' }, // would also throw
   * ])
   *
   * console.log(ids) // [2]
   * ```
   * @param data - Updates (the id and optionally other props) to the items in this data set.
   * @param senderId - Sender id.
   * @returns updatedIds - The ids of the updated items.
   * @throws When the supplied data is neither an item nor an array of items, when the ids are missing.
   */
  updateOnly(data, senderId) {
    var _context;
    if (!_Array$isArray(data)) {
      data = [data];
    }
    const updateEventData = _mapInstanceProperty(_context = _mapInstanceProperty(data).call(data, update => {
      const oldData = this._data.get(update[this._idProp]);
      if (oldData == null) {
        throw new Error("Updating non-existent items is not allowed.");
      }
      return {
        oldData,
        update
      };
    })).call(_context, _ref => {
      let {
        oldData,
        update
      } = _ref;
      const id = oldData[this._idProp];
      const updatedData = pureDeepObjectAssign(oldData, update);
      this._data.set(id, updatedData);
      return {
        id,
        oldData: oldData,
        updatedData
      };
    });
    if (updateEventData.length) {
      const props = {
        items: _mapInstanceProperty(updateEventData).call(updateEventData, value => value.id),
        oldData: _mapInstanceProperty(updateEventData).call(updateEventData, value => value.oldData),
        data: _mapInstanceProperty(updateEventData).call(updateEventData, value => value.updatedData)
      };
      // TODO: remove deprecated property 'data' some day
      //Object.defineProperty(props, 'data', {
      //  'get': (function() {
      //    console.warn('Property data is deprecated. Use DataSet.get(ids) to retrieve the new data, use the oldData property on this object to get the old data');
      //    return updatedData;
      //  }).bind(this)
      //});
      this._trigger("update", props, senderId);
      return props.items;
    } else {
      return [];
    }
  }
  /** @inheritDoc */
  get(first, second) {
    // @TODO: Woudn't it be better to split this into multiple methods?
    // parse the arguments
    let id = undefined;
    let ids = undefined;
    let options = undefined;
    if (isId(first)) {
      // get(id [, options])
      id = first;
      options = second;
    } else if (_Array$isArray(first)) {
      // get(ids [, options])
      ids = first;
      options = second;
    } else {
      // get([, options])
      options = first;
    }
    // determine the return type
    const returnType = options && options.returnType === "Object" ? "Object" : "Array";
    // @TODO: WTF is this? Or am I missing something?
    // var returnType
    // if (options && options.returnType) {
    //   var allowedValues = ['Array', 'Object']
    //   returnType =
    //     allowedValues.indexOf(options.returnType) == -1
    //       ? 'Array'
    //       : options.returnType
    // } else {
    //   returnType = 'Array'
    // }
    // build options
    const filter = options && _filterInstanceProperty(options);
    const items = [];
    let item = undefined;
    let itemIds = undefined;
    let itemId = undefined;
    // convert items
    if (id != null) {
      // return a single item
      item = this._data.get(id);
      if (item && filter && !filter(item)) {
        item = undefined;
      }
    } else if (ids != null) {
      // return a subset of items
      for (let i = 0, len = ids.length; i < len; i++) {
        item = this._data.get(ids[i]);
        if (item != null && (!filter || filter(item))) {
          items.push(item);
        }
      }
    } else {
      var _context2;
      // return all items
      itemIds = [..._keysInstanceProperty(_context2 = this._data).call(_context2)];
      for (let i = 0, len = itemIds.length; i < len; i++) {
        itemId = itemIds[i];
        item = this._data.get(itemId);
        if (item != null && (!filter || filter(item))) {
          items.push(item);
        }
      }
    }
    // order the results
    if (options && options.order && id == undefined) {
      this._sort(items, options.order);
    }
    // filter fields of the items
    if (options && options.fields) {
      const fields = options.fields;
      if (id != undefined && item != null) {
        item = this._filterFields(item, fields);
      } else {
        for (let i = 0, len = items.length; i < len; i++) {
          items[i] = this._filterFields(items[i], fields);
        }
      }
    }
    // return the results
    if (returnType == "Object") {
      const result = {};
      for (let i = 0, len = items.length; i < len; i++) {
        const resultant = items[i];
        // @TODO: Shoudn't this be this._fieldId?
        // result[resultant.id] = resultant
        const id = resultant[this._idProp];
        result[id] = resultant;
      }
      return result;
    } else {
      if (id != null) {
        // a single item
        return item !== null && item !== void 0 ? item : null;
      } else {
        // just return our array
        return items;
      }
    }
  }
  /** @inheritDoc */
  getIds(options) {
    const data = this._data;
    const filter = options && _filterInstanceProperty(options);
    const order = options && options.order;
    const itemIds = [..._keysInstanceProperty(data).call(data)];
    const ids = [];
    if (filter) {
      // get filtered items
      if (order) {
        // create ordered list
        const items = [];
        for (let i = 0, len = itemIds.length; i < len; i++) {
          const id = itemIds[i];
          const item = this._data.get(id);
          if (item != null && filter(item)) {
            items.push(item);
          }
        }
        this._sort(items, order);
        for (let i = 0, len = items.length; i < len; i++) {
          ids.push(items[i][this._idProp]);
        }
      } else {
        // create unordered list
        for (let i = 0, len = itemIds.length; i < len; i++) {
          const id = itemIds[i];
          const item = this._data.get(id);
          if (item != null && filter(item)) {
            ids.push(item[this._idProp]);
          }
        }
      }
    } else {
      // get all items
      if (order) {
        // create an ordered list
        const items = [];
        for (let i = 0, len = itemIds.length; i < len; i++) {
          const id = itemIds[i];
          items.push(data.get(id));
        }
        this._sort(items, order);
        for (let i = 0, len = items.length; i < len; i++) {
          ids.push(items[i][this._idProp]);
        }
      } else {
        // create unordered list
        for (let i = 0, len = itemIds.length; i < len; i++) {
          const id = itemIds[i];
          const item = data.get(id);
          if (item != null) {
            ids.push(item[this._idProp]);
          }
        }
      }
    }
    return ids;
  }
  /** @inheritDoc */
  getDataSet() {
    return this;
  }
  /** @inheritDoc */
  forEach(callback, options) {
    const filter = options && _filterInstanceProperty(options);
    const data = this._data;
    const itemIds = [..._keysInstanceProperty(data).call(data)];
    if (options && options.order) {
      // execute forEach on ordered list
      const items = this.get(options);
      for (let i = 0, len = items.length; i < len; i++) {
        const item = items[i];
        const id = item[this._idProp];
        callback(item, id);
      }
    } else {
      // unordered
      for (let i = 0, len = itemIds.length; i < len; i++) {
        const id = itemIds[i];
        const item = this._data.get(id);
        if (item != null && (!filter || filter(item))) {
          callback(item, id);
        }
      }
    }
  }
  /** @inheritDoc */
  map(callback, options) {
    const filter = options && _filterInstanceProperty(options);
    const mappedItems = [];
    const data = this._data;
    const itemIds = [..._keysInstanceProperty(data).call(data)];
    // convert and filter items
    for (let i = 0, len = itemIds.length; i < len; i++) {
      const id = itemIds[i];
      const item = this._data.get(id);
      if (item != null && (!filter || filter(item))) {
        mappedItems.push(callback(item, id));
      }
    }
    // order items
    if (options && options.order) {
      this._sort(mappedItems, options.order);
    }
    return mappedItems;
  }
  /**
   * Filter the fields of an item.
   * @param item - The item whose fields should be filtered.
   * @param fields - The names of the fields that will be kept.
   * @typeParam K - Field name type.
   * @returns The item without any additional fields.
   */
  _filterFields(item, fields) {
    var _context3;
    if (!item) {
      // item is null
      return item;
    }
    return _reduceInstanceProperty(_context3 = _Array$isArray(fields) ?
    // Use the supplied array
    fields :
    // Use the keys of the supplied object
    _Object$keys(fields)).call(_context3, (filteredItem, field) => {
      filteredItem[field] = item[field];
      return filteredItem;
    }, {});
  }
  /**
   * Sort the provided array with items.
   * @param items - Items to be sorted in place.
   * @param order - A field name or custom sort function.
   * @typeParam T - The type of the items in the items array.
   */
  _sort(items, order) {
    if (typeof order === "string") {
      // order by provided field name
      const name = order; // field name
      _sortInstanceProperty(items).call(items, (a, b) => {
        // @TODO: How to treat missing properties?
        const av = a[name];
        const bv = b[name];
        return av > bv ? 1 : av < bv ? -1 : 0;
      });
    } else if (typeof order === "function") {
      // order by sort function
      _sortInstanceProperty(items).call(items, order);
    } else {
      // TODO: extend order by an Object {field:string, direction:string}
      //       where direction can be 'asc' or 'desc'
      throw new TypeError("Order must be a function or a string");
    }
  }
  /**
   * Remove an item or multiple items by “reference” (only the id is used) or by id.
   *
   * The method ignores removal of non-existing items, and returns an array containing the ids of the items which are actually removed from the DataSet.
   *
   * After the items are removed, the DataSet will trigger an event `remove` for the removed items. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
   *
   * ## Example
   * ```javascript
   * // create a DataSet
   * const data = new vis.DataSet([
   * { id: 1, text: 'item 1' },
   * { id: 2, text: 'item 2' },
   * { id: 3, text: 'item 3' }
   * ])
   *
   * // remove items
   * const ids = data.remove([2, { id: 3 }, 4])
   *
   * console.log(ids) // [2, 3]
   * ```
   * @param id - One or more items or ids of items to be removed.
   * @param senderId - Sender id.
   * @returns The ids of the removed items.
   */
  remove(id, senderId) {
    const removedIds = [];
    const removedItems = [];
    // force everything to be an array for simplicity
    const ids = _Array$isArray(id) ? id : [id];
    for (let i = 0, len = ids.length; i < len; i++) {
      const item = this._remove(ids[i]);
      if (item) {
        const itemId = item[this._idProp];
        if (itemId != null) {
          removedIds.push(itemId);
          removedItems.push(item);
        }
      }
    }
    if (removedIds.length) {
      this._trigger("remove", {
        items: removedIds,
        oldData: removedItems
      }, senderId);
    }
    return removedIds;
  }
  /**
   * Remove an item by its id or reference.
   * @param id - Id of an item or the item itself.
   * @returns The removed item if removed, null otherwise.
   */
  _remove(id) {
    // @TODO: It origianlly returned the item although the docs say id.
    // The code expects the item, so probably an error in the docs.
    let ident;
    // confirm the id to use based on the args type
    if (isId(id)) {
      ident = id;
    } else if (id && typeof id === "object") {
      ident = id[this._idProp]; // look for the identifier field using ._idProp
    }
    // do the removing if the item is found
    if (ident != null && this._data.has(ident)) {
      const item = this._data.get(ident) || null;
      this._data.delete(ident);
      --this.length;
      return item;
    }
    return null;
  }
  /**
   * Clear the entire data set.
   *
   * After the items are removed, the {@link DataSet} will trigger an event `remove` for all removed items. When a `senderId` is provided, this id will be passed with the triggered event to all subscribers.
   * @param senderId - Sender id.
   * @returns removedIds - The ids of all removed items.
   */
  clear(senderId) {
    var _context4;
    const ids = [..._keysInstanceProperty(_context4 = this._data).call(_context4)];
    const items = [];
    for (let i = 0, len = ids.length; i < len; i++) {
      items.push(this._data.get(ids[i]));
    }
    this._data.clear();
    this.length = 0;
    this._trigger("remove", {
      items: ids,
      oldData: items
    }, senderId);
    return ids;
  }
  /**
   * Find the item with maximum value of a specified field.
   * @param field - Name of the property that should be searched for max value.
   * @returns Item containing max value, or null if no items.
   */
  max(field) {
    let max = null;
    let maxField = null;
    for (const item of _valuesInstanceProperty(_context5 = this._data).call(_context5)) {
      var _context5;
      const itemField = item[field];
      if (typeof itemField === "number" && (maxField == null || itemField > maxField)) {
        max = item;
        maxField = itemField;
      }
    }
    return max || null;
  }
  /**
   * Find the item with minimum value of a specified field.
   * @param field - Name of the property that should be searched for min value.
   * @returns Item containing min value, or null if no items.
   */
  min(field) {
    let min = null;
    let minField = null;
    for (const item of _valuesInstanceProperty(_context6 = this._data).call(_context6)) {
      var _context6;
      const itemField = item[field];
      if (typeof itemField === "number" && (minField == null || itemField < minField)) {
        min = item;
        minField = itemField;
      }
    }
    return min || null;
  }
  /**
   * Find all distinct values of a specified field
   * @param prop - The property name whose distinct values should be returned.
   * @returns Unordered array containing all distinct values. Items without specified property are ignored.
   */
  distinct(prop) {
    const data = this._data;
    const itemIds = [..._keysInstanceProperty(data).call(data)];
    const values = [];
    let count = 0;
    for (let i = 0, len = itemIds.length; i < len; i++) {
      const id = itemIds[i];
      const item = data.get(id);
      const value = item[prop];
      let exists = false;
      for (let j = 0; j < count; j++) {
        if (values[j] == value) {
          exists = true;
          break;
        }
      }
      if (!exists && value !== undefined) {
        values[count] = value;
        count++;
      }
    }
    return values;
  }
  /**
   * Add a single item. Will fail when an item with the same id already exists.
   * @param item - A new item to be added.
   * @returns Added item's id. An id is generated when it is not present in the item.
   */
  _addItem(item) {
    const fullItem = ensureFullItem(item, this._idProp);
    const id = fullItem[this._idProp];
    // check whether this id is already taken
    if (this._data.has(id)) {
      // item already exists
      throw new Error("Cannot add item: item with id " + id + " already exists");
    }
    this._data.set(id, fullItem);
    ++this.length;
    return id;
  }
  /**
   * Update a single item: merge with existing item.
   * Will fail when the item has no id, or when there does not exist an item with the same id.
   * @param update - The new item
   * @returns The id of the updated item.
   */
  _updateItem(update) {
    const id = update[this._idProp];
    if (id == null) {
      throw new Error("Cannot update item: item has no id (item: " + _JSON$stringify(update) + ")");
    }
    const item = this._data.get(id);
    if (!item) {
      // item doesn't exist
      throw new Error("Cannot update item: no item with id " + id + " found");
    }
    this._data.set(id, _objectSpread(_objectSpread({}, item), update));
    return id;
  }
  /** @inheritDoc */
  stream(ids) {
    if (ids) {
      const data = this._data;
      return new DataStream({
        *[_Symbol$iterator]() {
          for (const id of ids) {
            const item = data.get(id);
            if (item != null) {
              yield [id, item];
            }
          }
        }
      });
    } else {
      var _context7;
      return new DataStream({
        [_Symbol$iterator]: _bindInstanceProperty(_context7 = _entriesInstanceProperty(this._data)).call(_context7, this._data)
      });
    }
  }
  /* develblock:start */
  get testLeakData() {
    return this._data;
  }
  get testLeakIdProp() {
    return this._idProp;
  }
  get testLeakOptions() {
    return this._options;
  }
  get testLeakQueue() {
    return this._queue;
  }
  set testLeakQueue(v) {
    this._queue = v;
  }
}

var es_reflect_ownKeys = {};

var hasRequiredEs_reflect_ownKeys;

function requireEs_reflect_ownKeys () {
	if (hasRequiredEs_reflect_ownKeys) return es_reflect_ownKeys;
	hasRequiredEs_reflect_ownKeys = 1;
	var $ = /*@__PURE__*/ require_export();
	var ownKeys = /*@__PURE__*/ requireOwnKeys$3();

	// `Reflect.ownKeys` method
	// https://tc39.es/ecma262/#sec-reflect.ownkeys
	$({ target: 'Reflect', stat: true }, {
	  ownKeys: ownKeys
	});
	return es_reflect_ownKeys;
}

var ownKeys$2;
var hasRequiredOwnKeys$2;

function requireOwnKeys$2 () {
	if (hasRequiredOwnKeys$2) return ownKeys$2;
	hasRequiredOwnKeys$2 = 1;
	requireEs_reflect_ownKeys();
	var path = /*@__PURE__*/ requirePath();

	ownKeys$2 = path.Reflect.ownKeys;
	return ownKeys$2;
}

var ownKeys$1;
var hasRequiredOwnKeys$1;

function requireOwnKeys$1 () {
	if (hasRequiredOwnKeys$1) return ownKeys$1;
	hasRequiredOwnKeys$1 = 1;
	var parent = /*@__PURE__*/ requireOwnKeys$2();

	ownKeys$1 = parent;
	return ownKeys$1;
}

var ownKeys;
var hasRequiredOwnKeys;

function requireOwnKeys () {
	if (hasRequiredOwnKeys) return ownKeys;
	hasRequiredOwnKeys = 1;
	ownKeys = /*@__PURE__*/ requireOwnKeys$1();
	return ownKeys;
}

var ownKeysExports = requireOwnKeys();
var _Reflect$ownKeys = /*@__PURE__*/getDefaultExportFromCjs(ownKeysExports);

/**
 * DataView
 *
 * A DataView offers a filtered and/or formatted view on a DataSet. One can subscribe to changes in a DataView, and easily get filtered or formatted data without having to specify filters and field types all the time.
 *
 * ## Example
 * ```javascript
 * // create a DataSet
 * var data = new vis.DataSet();
 * data.add([
 * {id: 1, text: 'item 1', date: new Date(2013, 6, 20), group: 1, first: true},
 * {id: 2, text: 'item 2', date: '2013-06-23', group: 2},
 * {id: 3, text: 'item 3', date: '2013-06-25', group: 2},
 * {id: 4, text: 'item 4'}
 * ]);
 *
 * // create a DataView
 * // the view will only contain items having a property group with value 1,
 * // and will only output fields id, text, and date.
 * var view = new vis.DataView(data, {
 * filter: function (item) {
 * return (item.group == 1);
 * },
 * fields: ['id', 'text', 'date']
 * });
 *
 * // subscribe to any change in the DataView
 * view.on('*', function (event, properties, senderId) {
 * console.log('event', event, properties);
 * });
 *
 * // update an item in the data set
 * data.update({id: 2, group: 1});
 *
 * // get all ids in the view
 * var ids = view.getIds();
 * console.log('ids', ids); // will output [1, 2]
 *
 * // get all items in the view
 * var items = view.get();
 * ```
 * @typeParam Item - Item type that may or may not have an id.
 * @typeParam IdProp - Name of the property that contains the id.
 */
class DataView extends DataSetPart {
  /** @inheritDoc */
  get idProp() {
    return this.getDataSet().idProp;
  }
  // ids of the items currently in memory (just contains a boolean true)

  /**
   * Create a DataView.
   * @param data - The instance containing data (directly or indirectly).
   * @param options - Options to configure this data view.
   */
  constructor(data, options) {
    var _context;
    super();
    /** @inheritDoc */
    _defineProperty(this, "length", 0);
    // constructor → setData
    _defineProperty(this, "_ids", new _Set());
    this._options = options || {};
    this._listener = _bindInstanceProperty(_context = this._onEvent).call(_context, this);
    this.setData(data);
  }
  // TODO: implement a function .config() to dynamically update things like configured filter
  // and trigger changes accordingly
  /**
   * Set a data source for the view.
   * @param data - The instance containing data (directly or indirectly).
   * @remarks
   * Note that when the data view is bound to a data set it won't be garbage
   * collected unless the data set is too. Use `dataView.setData(null)` or
   * `dataView.dispose()` to enable garbage collection before you lose the last
   * reference.
   */
  setData(data) {
    if (this._data) {
      // unsubscribe from current dataset
      if (this._data.off) {
        this._data.off("*", this._listener);
      }
      // trigger a remove of all items in memory
      const ids = this._data.getIds({
        filter: _filterInstanceProperty(this._options)
      });
      const items = this._data.get(ids);
      this._ids.clear();
      this.length = 0;
      this._trigger("remove", {
        items: ids,
        oldData: items
      });
    }
    if (data != null) {
      this._data = data;
      // trigger an add of all added items
      const ids = this._data.getIds({
        filter: _filterInstanceProperty(this._options)
      });
      for (let i = 0, len = ids.length; i < len; i++) {
        const id = ids[i];
        this._ids.add(id);
      }
      this.length = ids.length;
      this._trigger("add", {
        items: ids
      });
    } else {
      this._data = new DataSet();
    }
    // subscribe to new dataset
    if (this._data.on) {
      this._data.on("*", this._listener);
    }
  }
  /**
   * Refresh the DataView.
   * Useful when the DataView has a filter function containing a variable parameter.
   */
  refresh() {
    const ids = this._data.getIds({
      filter: _filterInstanceProperty(this._options)
    });
    const oldIds = [...this._ids];
    const newIds = {};
    const addedIds = [];
    const removedIds = [];
    const removedItems = [];
    // check for additions
    for (let i = 0, len = ids.length; i < len; i++) {
      const id = ids[i];
      newIds[id] = true;
      if (!this._ids.has(id)) {
        addedIds.push(id);
        this._ids.add(id);
      }
    }
    // check for removals
    for (let i = 0, len = oldIds.length; i < len; i++) {
      const id = oldIds[i];
      const item = this._data.get(id);
      if (item == null) {
        // @TODO: Investigate.
        // Doesn't happen during tests or examples.
        // Is it really impossible or could it eventually happen?
        // How to handle it if it does? The types guarantee non-nullable items.
        console.error("If you see this, report it please.");
      } else if (!newIds[id]) {
        removedIds.push(id);
        removedItems.push(item);
        this._ids.delete(id);
      }
    }
    this.length += addedIds.length - removedIds.length;
    // trigger events
    if (addedIds.length) {
      this._trigger("add", {
        items: addedIds
      });
    }
    if (removedIds.length) {
      this._trigger("remove", {
        items: removedIds,
        oldData: removedItems
      });
    }
  }
  /** @inheritDoc */
  get(first, second) {
    if (this._data == null) {
      return null;
    }
    // parse the arguments
    let ids = null;
    let options;
    if (isId(first) || _Array$isArray(first)) {
      ids = first;
      options = second;
    } else {
      options = first;
    }
    // extend the options with the default options and provided options
    const viewOptions = _Object$assign({}, this._options, options);
    // create a combined filter method when needed
    const thisFilter = _filterInstanceProperty(this._options);
    const optionsFilter = options && _filterInstanceProperty(options);
    if (thisFilter && optionsFilter) {
      viewOptions.filter = item => {
        return thisFilter(item) && optionsFilter(item);
      };
    }
    if (ids == null) {
      return this._data.get(viewOptions);
    } else {
      return this._data.get(ids, viewOptions);
    }
  }
  /** @inheritDoc */
  getIds(options) {
    if (this._data.length) {
      const defaultFilter = _filterInstanceProperty(this._options);
      const optionsFilter = options != null ? _filterInstanceProperty(options) : null;
      let filter;
      if (optionsFilter) {
        if (defaultFilter) {
          filter = item => {
            return defaultFilter(item) && optionsFilter(item);
          };
        } else {
          filter = optionsFilter;
        }
      } else {
        filter = defaultFilter;
      }
      return this._data.getIds({
        filter: filter,
        order: options && options.order
      });
    } else {
      return [];
    }
  }
  /** @inheritDoc */
  forEach(callback, options) {
    if (this._data) {
      var _context2;
      const defaultFilter = _filterInstanceProperty(this._options);
      const optionsFilter = options && _filterInstanceProperty(options);
      let filter;
      if (optionsFilter) {
        if (defaultFilter) {
          filter = function (item) {
            return defaultFilter(item) && optionsFilter(item);
          };
        } else {
          filter = optionsFilter;
        }
      } else {
        filter = defaultFilter;
      }
      _forEachInstanceProperty(_context2 = this._data).call(_context2, callback, {
        filter: filter,
        order: options && options.order
      });
    }
  }
  /** @inheritDoc */
  map(callback, options) {
    if (this._data) {
      var _context3;
      const defaultFilter = _filterInstanceProperty(this._options);
      const optionsFilter = options && _filterInstanceProperty(options);
      let filter;
      if (optionsFilter) {
        if (defaultFilter) {
          filter = item => {
            return defaultFilter(item) && optionsFilter(item);
          };
        } else {
          filter = optionsFilter;
        }
      } else {
        filter = defaultFilter;
      }
      return _mapInstanceProperty(_context3 = this._data).call(_context3, callback, {
        filter: filter,
        order: options && options.order
      });
    } else {
      return [];
    }
  }
  /** @inheritDoc */
  getDataSet() {
    return this._data.getDataSet();
  }
  /** @inheritDoc */
  stream(ids) {
    var _context4;
    return this._data.stream(ids || {
      [_Symbol$iterator]: _bindInstanceProperty(_context4 = _keysInstanceProperty(this._ids)).call(_context4, this._ids)
    });
  }
  /**
   * Render the instance unusable prior to garbage collection.
   * @remarks
   * The intention of this method is to help discover scenarios where the data
   * view is being used when the programmer thinks it has been garbage collected
   * already. It's stricter version of `dataView.setData(null)`.
   */
  dispose() {
    var _this$_data;
    if ((_this$_data = this._data) !== null && _this$_data !== void 0 && _this$_data.off) {
      this._data.off("*", this._listener);
    }
    const message = "This data view has already been disposed of.";
    const replacement = {
      get: () => {
        throw new Error(message);
      },
      set: () => {
        throw new Error(message);
      },
      configurable: false
    };
    for (const key of _Reflect$ownKeys(DataView.prototype)) {
      _Object$defineProperty(this, key, replacement);
    }
  }
  /**
   * Event listener. Will propagate all events from the connected data set to the subscribers of the DataView, but will filter the items and only trigger when there are changes in the filtered data set.
   * @param event - The name of the event.
   * @param params - Parameters of the event.
   * @param senderId - Id supplied by the sender.
   */
  _onEvent(event, params, senderId) {
    if (!params || !params.items || !this._data) {
      return;
    }
    const ids = params.items;
    const addedIds = [];
    const updatedIds = [];
    const removedIds = [];
    const oldItems = [];
    const updatedItems = [];
    const removedItems = [];
    switch (event) {
      case "add":
        // filter the ids of the added items
        for (let i = 0, len = ids.length; i < len; i++) {
          const id = ids[i];
          const item = this.get(id);
          if (item) {
            this._ids.add(id);
            addedIds.push(id);
          }
        }
        break;
      case "update":
        // determine the event from the views viewpoint: an updated
        // item can be added, updated, or removed from this view.
        for (let i = 0, len = ids.length; i < len; i++) {
          const id = ids[i];
          const item = this.get(id);
          if (item) {
            if (this._ids.has(id)) {
              updatedIds.push(id);
              updatedItems.push(params.data[i]);
              oldItems.push(params.oldData[i]);
            } else {
              this._ids.add(id);
              addedIds.push(id);
            }
          } else {
            if (this._ids.has(id)) {
              this._ids.delete(id);
              removedIds.push(id);
              removedItems.push(params.oldData[i]);
            }
          }
        }
        break;
      case "remove":
        // filter the ids of the removed items
        for (let i = 0, len = ids.length; i < len; i++) {
          const id = ids[i];
          if (this._ids.has(id)) {
            this._ids.delete(id);
            removedIds.push(id);
            removedItems.push(params.oldData[i]);
          }
        }
        break;
    }
    this.length += addedIds.length - removedIds.length;
    if (addedIds.length) {
      this._trigger("add", {
        items: addedIds
      }, senderId);
    }
    if (updatedIds.length) {
      this._trigger("update", {
        items: updatedIds,
        oldData: oldItems,
        data: updatedItems
      }, senderId);
    }
    if (removedIds.length) {
      this._trigger("remove", {
        items: removedIds,
        oldData: removedItems
      }, senderId);
    }
  }
}

/**
 * Check that given value is compatible with Vis Data Set interface.
 * @param idProp - The expected property to contain item id.
 * @param v - The value to be tested.
 * @returns True if all expected values and methods match, false otherwise.
 */
function isDataSetLike(idProp, v) {
  return typeof v === "object" && v !== null && idProp === v.idProp && typeof v.add === "function" && typeof v.clear === "function" && typeof v.distinct === "function" && typeof _forEachInstanceProperty(v) === "function" && typeof v.get === "function" && typeof v.getDataSet === "function" && typeof v.getIds === "function" && typeof v.length === "number" && typeof _mapInstanceProperty(v) === "function" && typeof v.max === "function" && typeof v.min === "function" && typeof v.off === "function" && typeof v.on === "function" && typeof v.remove === "function" && typeof v.setOptions === "function" && typeof v.stream === "function" && typeof v.update === "function" && typeof v.updateOnly === "function";
}

/**
 * Check that given value is compatible with Vis Data View interface.
 * @param idProp - The expected property to contain item id.
 * @param v - The value to be tested.
 * @returns True if all expected values and methods match, false otherwise.
 */
function isDataViewLike(idProp, v) {
  return typeof v === "object" && v !== null && idProp === v.idProp && typeof _forEachInstanceProperty(v) === "function" && typeof v.get === "function" && typeof v.getDataSet === "function" && typeof v.getIds === "function" && typeof v.length === "number" && typeof _mapInstanceProperty(v) === "function" && typeof v.off === "function" && typeof v.on === "function" && typeof v.stream === "function" && isDataSetLike(idProp, v.getDataSet());
}

/* develblock:start */
console.warn("You're running a development build.");

// Current API.
var index = {
  DataSet,
  DataView,
  Queue
};

export { DELETE, DataSet, DataStream, DataView, Queue, createNewDataPipeFrom, index as default, isDataSetLike, isDataViewLike };
//# sourceMappingURL=esm.js.map
