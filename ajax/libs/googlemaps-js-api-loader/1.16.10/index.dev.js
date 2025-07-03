this.google = this.google || {};
this.google.maps = this.google.maps || {};
this.google.maps.plugins = this.google.maps.plugins || {};
this.google.maps.plugins.loader = (function (exports) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var esnext_iterator_constructor = {};

	var es_iterator_constructor = {};

	var globalThis_1;
	var hasRequiredGlobalThis;
	function requireGlobalThis() {
	  if (hasRequiredGlobalThis) return globalThis_1;
	  hasRequiredGlobalThis = 1;
	  var check = function (it) {
	    return it && it.Math === Math && it;
	  };

	  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	  globalThis_1 =
	  // eslint-disable-next-line es/no-global-this -- safe
	  check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) ||
	  // eslint-disable-next-line no-restricted-globals -- safe
	  check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || check(typeof globalThis_1 == 'object' && globalThis_1) ||
	  // eslint-disable-next-line no-new-func -- fallback
	  function () {
	    return this;
	  }() || Function('return this')();
	  return globalThis_1;
	}

	var objectGetOwnPropertyDescriptor = {};

	var fails;
	var hasRequiredFails;
	function requireFails() {
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

	var descriptors;
	var hasRequiredDescriptors;
	function requireDescriptors() {
	  if (hasRequiredDescriptors) return descriptors;
	  hasRequiredDescriptors = 1;
	  var fails = requireFails();

	  // Detect IE8's incomplete defineProperty implementation
	  descriptors = !fails(function () {
	    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	    return Object.defineProperty({}, 1, {
	      get: function () {
	        return 7;
	      }
	    })[1] !== 7;
	  });
	  return descriptors;
	}

	var functionBindNative;
	var hasRequiredFunctionBindNative;
	function requireFunctionBindNative() {
	  if (hasRequiredFunctionBindNative) return functionBindNative;
	  hasRequiredFunctionBindNative = 1;
	  var fails = requireFails();
	  functionBindNative = !fails(function () {
	    // eslint-disable-next-line es/no-function-prototype-bind -- safe
	    var test = function () {/* empty */}.bind();
	    // eslint-disable-next-line no-prototype-builtins -- safe
	    return typeof test != 'function' || test.hasOwnProperty('prototype');
	  });
	  return functionBindNative;
	}

	var functionCall;
	var hasRequiredFunctionCall;
	function requireFunctionCall() {
	  if (hasRequiredFunctionCall) return functionCall;
	  hasRequiredFunctionCall = 1;
	  var NATIVE_BIND = requireFunctionBindNative();
	  var call = Function.prototype.call;
	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
	  functionCall = NATIVE_BIND ? call.bind(call) : function () {
	    return call.apply(call, arguments);
	  };
	  return functionCall;
	}

	var objectPropertyIsEnumerable = {};

	var hasRequiredObjectPropertyIsEnumerable;
	function requireObjectPropertyIsEnumerable() {
	  if (hasRequiredObjectPropertyIsEnumerable) return objectPropertyIsEnumerable;
	  hasRequiredObjectPropertyIsEnumerable = 1;
	  var $propertyIsEnumerable = {}.propertyIsEnumerable;
	  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	  // Nashorn ~ JDK8 bug
	  var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
	    1: 2
	  }, 1);

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
	function requireCreatePropertyDescriptor() {
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

	var functionUncurryThis;
	var hasRequiredFunctionUncurryThis;
	function requireFunctionUncurryThis() {
	  if (hasRequiredFunctionUncurryThis) return functionUncurryThis;
	  hasRequiredFunctionUncurryThis = 1;
	  var NATIVE_BIND = requireFunctionBindNative();
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
	function requireClassofRaw() {
	  if (hasRequiredClassofRaw) return classofRaw;
	  hasRequiredClassofRaw = 1;
	  var uncurryThis = requireFunctionUncurryThis();
	  var toString = uncurryThis({}.toString);
	  var stringSlice = uncurryThis(''.slice);
	  classofRaw = function (it) {
	    return stringSlice(toString(it), 8, -1);
	  };
	  return classofRaw;
	}

	var indexedObject;
	var hasRequiredIndexedObject;
	function requireIndexedObject() {
	  if (hasRequiredIndexedObject) return indexedObject;
	  hasRequiredIndexedObject = 1;
	  var uncurryThis = requireFunctionUncurryThis();
	  var fails = requireFails();
	  var classof = requireClassofRaw();
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
	function requireIsNullOrUndefined() {
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
	function requireRequireObjectCoercible() {
	  if (hasRequiredRequireObjectCoercible) return requireObjectCoercible;
	  hasRequiredRequireObjectCoercible = 1;
	  var isNullOrUndefined = requireIsNullOrUndefined();
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
	function requireToIndexedObject() {
	  if (hasRequiredToIndexedObject) return toIndexedObject;
	  hasRequiredToIndexedObject = 1;
	  // toObject with fallback for non-array-like ES3 strings
	  var IndexedObject = requireIndexedObject();
	  var requireObjectCoercible = requireRequireObjectCoercible();
	  toIndexedObject = function (it) {
	    return IndexedObject(requireObjectCoercible(it));
	  };
	  return toIndexedObject;
	}

	var isCallable;
	var hasRequiredIsCallable;
	function requireIsCallable() {
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

	var isObject;
	var hasRequiredIsObject;
	function requireIsObject() {
	  if (hasRequiredIsObject) return isObject;
	  hasRequiredIsObject = 1;
	  var isCallable = requireIsCallable();
	  isObject = function (it) {
	    return typeof it == 'object' ? it !== null : isCallable(it);
	  };
	  return isObject;
	}

	var getBuiltIn;
	var hasRequiredGetBuiltIn;
	function requireGetBuiltIn() {
	  if (hasRequiredGetBuiltIn) return getBuiltIn;
	  hasRequiredGetBuiltIn = 1;
	  var globalThis = requireGlobalThis();
	  var isCallable = requireIsCallable();
	  var aFunction = function (argument) {
	    return isCallable(argument) ? argument : undefined;
	  };
	  getBuiltIn = function (namespace, method) {
	    return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
	  };
	  return getBuiltIn;
	}

	var objectIsPrototypeOf;
	var hasRequiredObjectIsPrototypeOf;
	function requireObjectIsPrototypeOf() {
	  if (hasRequiredObjectIsPrototypeOf) return objectIsPrototypeOf;
	  hasRequiredObjectIsPrototypeOf = 1;
	  var uncurryThis = requireFunctionUncurryThis();
	  objectIsPrototypeOf = uncurryThis({}.isPrototypeOf);
	  return objectIsPrototypeOf;
	}

	var environmentUserAgent;
	var hasRequiredEnvironmentUserAgent;
	function requireEnvironmentUserAgent() {
	  if (hasRequiredEnvironmentUserAgent) return environmentUserAgent;
	  hasRequiredEnvironmentUserAgent = 1;
	  var globalThis = requireGlobalThis();
	  var navigator = globalThis.navigator;
	  var userAgent = navigator && navigator.userAgent;
	  environmentUserAgent = userAgent ? String(userAgent) : '';
	  return environmentUserAgent;
	}

	var environmentV8Version;
	var hasRequiredEnvironmentV8Version;
	function requireEnvironmentV8Version() {
	  if (hasRequiredEnvironmentV8Version) return environmentV8Version;
	  hasRequiredEnvironmentV8Version = 1;
	  var globalThis = requireGlobalThis();
	  var userAgent = requireEnvironmentUserAgent();
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
	function requireSymbolConstructorDetection() {
	  if (hasRequiredSymbolConstructorDetection) return symbolConstructorDetection;
	  hasRequiredSymbolConstructorDetection = 1;
	  /* eslint-disable es/no-symbol -- required for testing */
	  var V8_VERSION = requireEnvironmentV8Version();
	  var fails = requireFails();
	  var globalThis = requireGlobalThis();
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
	function requireUseSymbolAsUid() {
	  if (hasRequiredUseSymbolAsUid) return useSymbolAsUid;
	  hasRequiredUseSymbolAsUid = 1;
	  /* eslint-disable es/no-symbol -- required for testing */
	  var NATIVE_SYMBOL = requireSymbolConstructorDetection();
	  useSymbolAsUid = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';
	  return useSymbolAsUid;
	}

	var isSymbol;
	var hasRequiredIsSymbol;
	function requireIsSymbol() {
	  if (hasRequiredIsSymbol) return isSymbol;
	  hasRequiredIsSymbol = 1;
	  var getBuiltIn = requireGetBuiltIn();
	  var isCallable = requireIsCallable();
	  var isPrototypeOf = requireObjectIsPrototypeOf();
	  var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();
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
	function requireTryToString() {
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
	function requireACallable() {
	  if (hasRequiredACallable) return aCallable;
	  hasRequiredACallable = 1;
	  var isCallable = requireIsCallable();
	  var tryToString = requireTryToString();
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
	function requireGetMethod() {
	  if (hasRequiredGetMethod) return getMethod;
	  hasRequiredGetMethod = 1;
	  var aCallable = requireACallable();
	  var isNullOrUndefined = requireIsNullOrUndefined();

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
	function requireOrdinaryToPrimitive() {
	  if (hasRequiredOrdinaryToPrimitive) return ordinaryToPrimitive;
	  hasRequiredOrdinaryToPrimitive = 1;
	  var call = requireFunctionCall();
	  var isCallable = requireIsCallable();
	  var isObject = requireIsObject();
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
	function requireIsPure() {
	  if (hasRequiredIsPure) return isPure;
	  hasRequiredIsPure = 1;
	  isPure = false;
	  return isPure;
	}

	var defineGlobalProperty;
	var hasRequiredDefineGlobalProperty;
	function requireDefineGlobalProperty() {
	  if (hasRequiredDefineGlobalProperty) return defineGlobalProperty;
	  hasRequiredDefineGlobalProperty = 1;
	  var globalThis = requireGlobalThis();

	  // eslint-disable-next-line es/no-object-defineproperty -- safe
	  var defineProperty = Object.defineProperty;
	  defineGlobalProperty = function (key, value) {
	    try {
	      defineProperty(globalThis, key, {
	        value: value,
	        configurable: true,
	        writable: true
	      });
	    } catch (error) {
	      globalThis[key] = value;
	    }
	    return value;
	  };
	  return defineGlobalProperty;
	}

	var hasRequiredSharedStore;
	function requireSharedStore() {
	  if (hasRequiredSharedStore) return sharedStore.exports;
	  hasRequiredSharedStore = 1;
	  var IS_PURE = requireIsPure();
	  var globalThis = requireGlobalThis();
	  var defineGlobalProperty = requireDefineGlobalProperty();
	  var SHARED = '__core-js_shared__';
	  var store = sharedStore.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});
	  (store.versions || (store.versions = [])).push({
	    version: '3.43.0',
	    mode: IS_PURE ? 'pure' : 'global',
	    copyright: '© 2014-2025 Denis Pushkarev (zloirock.ru)',
	    license: 'https://github.com/zloirock/core-js/blob/v3.43.0/LICENSE',
	    source: 'https://github.com/zloirock/core-js'
	  });
	  return sharedStore.exports;
	}

	var shared;
	var hasRequiredShared;
	function requireShared() {
	  if (hasRequiredShared) return shared;
	  hasRequiredShared = 1;
	  var store = requireSharedStore();
	  shared = function (key, value) {
	    return store[key] || (store[key] = value || {});
	  };
	  return shared;
	}

	var toObject;
	var hasRequiredToObject;
	function requireToObject() {
	  if (hasRequiredToObject) return toObject;
	  hasRequiredToObject = 1;
	  var requireObjectCoercible = requireRequireObjectCoercible();
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
	function requireHasOwnProperty() {
	  if (hasRequiredHasOwnProperty) return hasOwnProperty_1;
	  hasRequiredHasOwnProperty = 1;
	  var uncurryThis = requireFunctionUncurryThis();
	  var toObject = requireToObject();
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
	function requireUid() {
	  if (hasRequiredUid) return uid;
	  hasRequiredUid = 1;
	  var uncurryThis = requireFunctionUncurryThis();
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
	function requireWellKnownSymbol() {
	  if (hasRequiredWellKnownSymbol) return wellKnownSymbol;
	  hasRequiredWellKnownSymbol = 1;
	  var globalThis = requireGlobalThis();
	  var shared = requireShared();
	  var hasOwn = requireHasOwnProperty();
	  var uid = requireUid();
	  var NATIVE_SYMBOL = requireSymbolConstructorDetection();
	  var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();
	  var Symbol = globalThis.Symbol;
	  var WellKnownSymbolsStore = shared('wks');
	  var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;
	  wellKnownSymbol = function (name) {
	    if (!hasOwn(WellKnownSymbolsStore, name)) {
	      WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name) ? Symbol[name] : createWellKnownSymbol('Symbol.' + name);
	    }
	    return WellKnownSymbolsStore[name];
	  };
	  return wellKnownSymbol;
	}

	var toPrimitive;
	var hasRequiredToPrimitive;
	function requireToPrimitive() {
	  if (hasRequiredToPrimitive) return toPrimitive;
	  hasRequiredToPrimitive = 1;
	  var call = requireFunctionCall();
	  var isObject = requireIsObject();
	  var isSymbol = requireIsSymbol();
	  var getMethod = requireGetMethod();
	  var ordinaryToPrimitive = requireOrdinaryToPrimitive();
	  var wellKnownSymbol = requireWellKnownSymbol();
	  var $TypeError = TypeError;
	  var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

	  // `ToPrimitive` abstract operation
	  // https://tc39.es/ecma262/#sec-toprimitive
	  toPrimitive = function (input, pref) {
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
	  return toPrimitive;
	}

	var toPropertyKey;
	var hasRequiredToPropertyKey;
	function requireToPropertyKey() {
	  if (hasRequiredToPropertyKey) return toPropertyKey;
	  hasRequiredToPropertyKey = 1;
	  var toPrimitive = requireToPrimitive();
	  var isSymbol = requireIsSymbol();

	  // `ToPropertyKey` abstract operation
	  // https://tc39.es/ecma262/#sec-topropertykey
	  toPropertyKey = function (argument) {
	    var key = toPrimitive(argument, 'string');
	    return isSymbol(key) ? key : key + '';
	  };
	  return toPropertyKey;
	}

	var documentCreateElement;
	var hasRequiredDocumentCreateElement;
	function requireDocumentCreateElement() {
	  if (hasRequiredDocumentCreateElement) return documentCreateElement;
	  hasRequiredDocumentCreateElement = 1;
	  var globalThis = requireGlobalThis();
	  var isObject = requireIsObject();
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
	function requireIe8DomDefine() {
	  if (hasRequiredIe8DomDefine) return ie8DomDefine;
	  hasRequiredIe8DomDefine = 1;
	  var DESCRIPTORS = requireDescriptors();
	  var fails = requireFails();
	  var createElement = requireDocumentCreateElement();

	  // Thanks to IE8 for its funny defineProperty
	  ie8DomDefine = !DESCRIPTORS && !fails(function () {
	    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	    return Object.defineProperty(createElement('div'), 'a', {
	      get: function () {
	        return 7;
	      }
	    }).a !== 7;
	  });
	  return ie8DomDefine;
	}

	var hasRequiredObjectGetOwnPropertyDescriptor;
	function requireObjectGetOwnPropertyDescriptor() {
	  if (hasRequiredObjectGetOwnPropertyDescriptor) return objectGetOwnPropertyDescriptor;
	  hasRequiredObjectGetOwnPropertyDescriptor = 1;
	  var DESCRIPTORS = requireDescriptors();
	  var call = requireFunctionCall();
	  var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
	  var createPropertyDescriptor = requireCreatePropertyDescriptor();
	  var toIndexedObject = requireToIndexedObject();
	  var toPropertyKey = requireToPropertyKey();
	  var hasOwn = requireHasOwnProperty();
	  var IE8_DOM_DEFINE = requireIe8DomDefine();

	  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	  var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
	  objectGetOwnPropertyDescriptor.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	    O = toIndexedObject(O);
	    P = toPropertyKey(P);
	    if (IE8_DOM_DEFINE) try {
	      return $getOwnPropertyDescriptor(O, P);
	    } catch (error) {/* empty */}
	    if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
	  };
	  return objectGetOwnPropertyDescriptor;
	}

	var objectDefineProperty = {};

	var v8PrototypeDefineBug;
	var hasRequiredV8PrototypeDefineBug;
	function requireV8PrototypeDefineBug() {
	  if (hasRequiredV8PrototypeDefineBug) return v8PrototypeDefineBug;
	  hasRequiredV8PrototypeDefineBug = 1;
	  var DESCRIPTORS = requireDescriptors();
	  var fails = requireFails();

	  // V8 ~ Chrome 36-
	  // https://bugs.chromium.org/p/v8/issues/detail?id=3334
	  v8PrototypeDefineBug = DESCRIPTORS && fails(function () {
	    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
	    return Object.defineProperty(function () {/* empty */}, 'prototype', {
	      value: 42,
	      writable: false
	    }).prototype !== 42;
	  });
	  return v8PrototypeDefineBug;
	}

	var anObject;
	var hasRequiredAnObject;
	function requireAnObject() {
	  if (hasRequiredAnObject) return anObject;
	  hasRequiredAnObject = 1;
	  var isObject = requireIsObject();
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
	function requireObjectDefineProperty() {
	  if (hasRequiredObjectDefineProperty) return objectDefineProperty;
	  hasRequiredObjectDefineProperty = 1;
	  var DESCRIPTORS = requireDescriptors();
	  var IE8_DOM_DEFINE = requireIe8DomDefine();
	  var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
	  var anObject = requireAnObject();
	  var toPropertyKey = requireToPropertyKey();
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
	    }
	    return $defineProperty(O, P, Attributes);
	  } : $defineProperty : function defineProperty(O, P, Attributes) {
	    anObject(O);
	    P = toPropertyKey(P);
	    anObject(Attributes);
	    if (IE8_DOM_DEFINE) try {
	      return $defineProperty(O, P, Attributes);
	    } catch (error) {/* empty */}
	    if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
	    if ('value' in Attributes) O[P] = Attributes.value;
	    return O;
	  };
	  return objectDefineProperty;
	}

	var createNonEnumerableProperty;
	var hasRequiredCreateNonEnumerableProperty;
	function requireCreateNonEnumerableProperty() {
	  if (hasRequiredCreateNonEnumerableProperty) return createNonEnumerableProperty;
	  hasRequiredCreateNonEnumerableProperty = 1;
	  var DESCRIPTORS = requireDescriptors();
	  var definePropertyModule = requireObjectDefineProperty();
	  var createPropertyDescriptor = requireCreatePropertyDescriptor();
	  createNonEnumerableProperty = DESCRIPTORS ? function (object, key, value) {
	    return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
	  } : function (object, key, value) {
	    object[key] = value;
	    return object;
	  };
	  return createNonEnumerableProperty;
	}

	var makeBuiltIn = {exports: {}};

	var functionName;
	var hasRequiredFunctionName;
	function requireFunctionName() {
	  if (hasRequiredFunctionName) return functionName;
	  hasRequiredFunctionName = 1;
	  var DESCRIPTORS = requireDescriptors();
	  var hasOwn = requireHasOwnProperty();
	  var FunctionPrototype = Function.prototype;
	  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	  var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
	  var EXISTS = hasOwn(FunctionPrototype, 'name');
	  // additional protection from minified / mangled / dropped function names
	  var PROPER = EXISTS && function something() {/* empty */}.name === 'something';
	  var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
	  functionName = {
	    EXISTS: EXISTS,
	    PROPER: PROPER,
	    CONFIGURABLE: CONFIGURABLE
	  };
	  return functionName;
	}

	var inspectSource;
	var hasRequiredInspectSource;
	function requireInspectSource() {
	  if (hasRequiredInspectSource) return inspectSource;
	  hasRequiredInspectSource = 1;
	  var uncurryThis = requireFunctionUncurryThis();
	  var isCallable = requireIsCallable();
	  var store = requireSharedStore();
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

	var weakMapBasicDetection;
	var hasRequiredWeakMapBasicDetection;
	function requireWeakMapBasicDetection() {
	  if (hasRequiredWeakMapBasicDetection) return weakMapBasicDetection;
	  hasRequiredWeakMapBasicDetection = 1;
	  var globalThis = requireGlobalThis();
	  var isCallable = requireIsCallable();
	  var WeakMap = globalThis.WeakMap;
	  weakMapBasicDetection = isCallable(WeakMap) && /native code/.test(String(WeakMap));
	  return weakMapBasicDetection;
	}

	var sharedKey;
	var hasRequiredSharedKey;
	function requireSharedKey() {
	  if (hasRequiredSharedKey) return sharedKey;
	  hasRequiredSharedKey = 1;
	  var shared = requireShared();
	  var uid = requireUid();
	  var keys = shared('keys');
	  sharedKey = function (key) {
	    return keys[key] || (keys[key] = uid(key));
	  };
	  return sharedKey;
	}

	var hiddenKeys;
	var hasRequiredHiddenKeys;
	function requireHiddenKeys() {
	  if (hasRequiredHiddenKeys) return hiddenKeys;
	  hasRequiredHiddenKeys = 1;
	  hiddenKeys = {};
	  return hiddenKeys;
	}

	var internalState;
	var hasRequiredInternalState;
	function requireInternalState() {
	  if (hasRequiredInternalState) return internalState;
	  hasRequiredInternalState = 1;
	  var NATIVE_WEAK_MAP = requireWeakMapBasicDetection();
	  var globalThis = requireGlobalThis();
	  var isObject = requireIsObject();
	  var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
	  var hasOwn = requireHasOwnProperty();
	  var shared = requireSharedStore();
	  var sharedKey = requireSharedKey();
	  var hiddenKeys = requireHiddenKeys();
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
	      }
	      return state;
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

	var hasRequiredMakeBuiltIn;
	function requireMakeBuiltIn() {
	  if (hasRequiredMakeBuiltIn) return makeBuiltIn.exports;
	  hasRequiredMakeBuiltIn = 1;
	  var uncurryThis = requireFunctionUncurryThis();
	  var fails = requireFails();
	  var isCallable = requireIsCallable();
	  var hasOwn = requireHasOwnProperty();
	  var DESCRIPTORS = requireDescriptors();
	  var CONFIGURABLE_FUNCTION_NAME = requireFunctionName().CONFIGURABLE;
	  var inspectSource = requireInspectSource();
	  var InternalStateModule = requireInternalState();
	  var enforceInternalState = InternalStateModule.enforce;
	  var getInternalState = InternalStateModule.get;
	  var $String = String;
	  // eslint-disable-next-line es/no-object-defineproperty -- safe
	  var defineProperty = Object.defineProperty;
	  var stringSlice = uncurryThis(''.slice);
	  var replace = uncurryThis(''.replace);
	  var join = uncurryThis([].join);
	  var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
	    return defineProperty(function () {/* empty */}, 'length', {
	      value: 8
	    }).length !== 8;
	  });
	  var TEMPLATE = String(String).split('String');
	  var makeBuiltIn$1 = makeBuiltIn.exports = function (value, name, options) {
	    if (stringSlice($String(name), 0, 7) === 'Symbol(') {
	      name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
	    }
	    if (options && options.getter) name = 'get ' + name;
	    if (options && options.setter) name = 'set ' + name;
	    if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
	      if (DESCRIPTORS) defineProperty(value, 'name', {
	        value: name,
	        configurable: true
	      });else value.name = name;
	    }
	    if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
	      defineProperty(value, 'length', {
	        value: options.arity
	      });
	    }
	    try {
	      if (options && hasOwn(options, 'constructor') && options.constructor) {
	        if (DESCRIPTORS) defineProperty(value, 'prototype', {
	          writable: false
	        });
	        // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
	      } else if (value.prototype) value.prototype = undefined;
	    } catch (error) {/* empty */}
	    var state = enforceInternalState(value);
	    if (!hasOwn(state, 'source')) {
	      state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
	    }
	    return value;
	  };

	  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	  // eslint-disable-next-line no-extend-native -- required
	  Function.prototype.toString = makeBuiltIn$1(function toString() {
	    return isCallable(this) && getInternalState(this).source || inspectSource(this);
	  }, 'toString');
	  return makeBuiltIn.exports;
	}

	var defineBuiltIn;
	var hasRequiredDefineBuiltIn;
	function requireDefineBuiltIn() {
	  if (hasRequiredDefineBuiltIn) return defineBuiltIn;
	  hasRequiredDefineBuiltIn = 1;
	  var isCallable = requireIsCallable();
	  var definePropertyModule = requireObjectDefineProperty();
	  var makeBuiltIn = requireMakeBuiltIn();
	  var defineGlobalProperty = requireDefineGlobalProperty();
	  defineBuiltIn = function (O, key, value, options) {
	    if (!options) options = {};
	    var simple = options.enumerable;
	    var name = options.name !== undefined ? options.name : key;
	    if (isCallable(value)) makeBuiltIn(value, name, options);
	    if (options.global) {
	      if (simple) O[key] = value;else defineGlobalProperty(key, value);
	    } else {
	      try {
	        if (!options.unsafe) delete O[key];else if (O[key]) simple = true;
	      } catch (error) {/* empty */}
	      if (simple) O[key] = value;else definePropertyModule.f(O, key, {
	        value: value,
	        enumerable: false,
	        configurable: !options.nonConfigurable,
	        writable: !options.nonWritable
	      });
	    }
	    return O;
	  };
	  return defineBuiltIn;
	}

	var objectGetOwnPropertyNames = {};

	var mathTrunc;
	var hasRequiredMathTrunc;
	function requireMathTrunc() {
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
	function requireToIntegerOrInfinity() {
	  if (hasRequiredToIntegerOrInfinity) return toIntegerOrInfinity;
	  hasRequiredToIntegerOrInfinity = 1;
	  var trunc = requireMathTrunc();

	  // `ToIntegerOrInfinity` abstract operation
	  // https://tc39.es/ecma262/#sec-tointegerorinfinity
	  toIntegerOrInfinity = function (argument) {
	    var number = +argument;
	    // eslint-disable-next-line no-self-compare -- NaN check
	    return number !== number || number === 0 ? 0 : trunc(number);
	  };
	  return toIntegerOrInfinity;
	}

	var toAbsoluteIndex;
	var hasRequiredToAbsoluteIndex;
	function requireToAbsoluteIndex() {
	  if (hasRequiredToAbsoluteIndex) return toAbsoluteIndex;
	  hasRequiredToAbsoluteIndex = 1;
	  var toIntegerOrInfinity = requireToIntegerOrInfinity();
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

	var toLength;
	var hasRequiredToLength;
	function requireToLength() {
	  if (hasRequiredToLength) return toLength;
	  hasRequiredToLength = 1;
	  var toIntegerOrInfinity = requireToIntegerOrInfinity();
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
	function requireLengthOfArrayLike() {
	  if (hasRequiredLengthOfArrayLike) return lengthOfArrayLike;
	  hasRequiredLengthOfArrayLike = 1;
	  var toLength = requireToLength();

	  // `LengthOfArrayLike` abstract operation
	  // https://tc39.es/ecma262/#sec-lengthofarraylike
	  lengthOfArrayLike = function (obj) {
	    return toLength(obj.length);
	  };
	  return lengthOfArrayLike;
	}

	var arrayIncludes;
	var hasRequiredArrayIncludes;
	function requireArrayIncludes() {
	  if (hasRequiredArrayIncludes) return arrayIncludes;
	  hasRequiredArrayIncludes = 1;
	  var toIndexedObject = requireToIndexedObject();
	  var toAbsoluteIndex = requireToAbsoluteIndex();
	  var lengthOfArrayLike = requireLengthOfArrayLike();

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
	      } else for (; length > index; index++) {
	        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	      }
	      return !IS_INCLUDES && -1;
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

	var objectKeysInternal;
	var hasRequiredObjectKeysInternal;
	function requireObjectKeysInternal() {
	  if (hasRequiredObjectKeysInternal) return objectKeysInternal;
	  hasRequiredObjectKeysInternal = 1;
	  var uncurryThis = requireFunctionUncurryThis();
	  var hasOwn = requireHasOwnProperty();
	  var toIndexedObject = requireToIndexedObject();
	  var indexOf = requireArrayIncludes().indexOf;
	  var hiddenKeys = requireHiddenKeys();
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
	function requireEnumBugKeys() {
	  if (hasRequiredEnumBugKeys) return enumBugKeys;
	  hasRequiredEnumBugKeys = 1;
	  // IE8- don't enum bug keys
	  enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
	  return enumBugKeys;
	}

	var hasRequiredObjectGetOwnPropertyNames;
	function requireObjectGetOwnPropertyNames() {
	  if (hasRequiredObjectGetOwnPropertyNames) return objectGetOwnPropertyNames;
	  hasRequiredObjectGetOwnPropertyNames = 1;
	  var internalObjectKeys = requireObjectKeysInternal();
	  var enumBugKeys = requireEnumBugKeys();
	  var hiddenKeys = enumBugKeys.concat('length', 'prototype');

	  // `Object.getOwnPropertyNames` method
	  // https://tc39.es/ecma262/#sec-object.getownpropertynames
	  // eslint-disable-next-line es/no-object-getownpropertynames -- safe
	  objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	    return internalObjectKeys(O, hiddenKeys);
	  };
	  return objectGetOwnPropertyNames;
	}

	var objectGetOwnPropertySymbols = {};

	var hasRequiredObjectGetOwnPropertySymbols;
	function requireObjectGetOwnPropertySymbols() {
	  if (hasRequiredObjectGetOwnPropertySymbols) return objectGetOwnPropertySymbols;
	  hasRequiredObjectGetOwnPropertySymbols = 1;
	  // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
	  objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
	  return objectGetOwnPropertySymbols;
	}

	var ownKeys;
	var hasRequiredOwnKeys;
	function requireOwnKeys() {
	  if (hasRequiredOwnKeys) return ownKeys;
	  hasRequiredOwnKeys = 1;
	  var getBuiltIn = requireGetBuiltIn();
	  var uncurryThis = requireFunctionUncurryThis();
	  var getOwnPropertyNamesModule = requireObjectGetOwnPropertyNames();
	  var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
	  var anObject = requireAnObject();
	  var concat = uncurryThis([].concat);

	  // all object keys, includes non-enumerable and symbols
	  ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	    var keys = getOwnPropertyNamesModule.f(anObject(it));
	    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
	    return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
	  };
	  return ownKeys;
	}

	var copyConstructorProperties;
	var hasRequiredCopyConstructorProperties;
	function requireCopyConstructorProperties() {
	  if (hasRequiredCopyConstructorProperties) return copyConstructorProperties;
	  hasRequiredCopyConstructorProperties = 1;
	  var hasOwn = requireHasOwnProperty();
	  var ownKeys = requireOwnKeys();
	  var getOwnPropertyDescriptorModule = requireObjectGetOwnPropertyDescriptor();
	  var definePropertyModule = requireObjectDefineProperty();
	  copyConstructorProperties = function (target, source, exceptions) {
	    var keys = ownKeys(source);
	    var defineProperty = definePropertyModule.f;
	    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];
	      if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
	        defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	      }
	    }
	  };
	  return copyConstructorProperties;
	}

	var isForced_1;
	var hasRequiredIsForced;
	function requireIsForced() {
	  if (hasRequiredIsForced) return isForced_1;
	  hasRequiredIsForced = 1;
	  var fails = requireFails();
	  var isCallable = requireIsCallable();
	  var replacement = /#|\.prototype\./;
	  var isForced = function (feature, detection) {
	    var value = data[normalize(feature)];
	    return value === POLYFILL ? true : value === NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
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

	var _export;
	var hasRequired_export;
	function require_export() {
	  if (hasRequired_export) return _export;
	  hasRequired_export = 1;
	  var globalThis = requireGlobalThis();
	  var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;
	  var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
	  var defineBuiltIn = requireDefineBuiltIn();
	  var defineGlobalProperty = requireDefineGlobalProperty();
	  var copyConstructorProperties = requireCopyConstructorProperties();
	  var isForced = requireIsForced();

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
	    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	    if (GLOBAL) {
	      target = globalThis;
	    } else if (STATIC) {
	      target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
	    } else {
	      target = globalThis[TARGET] && globalThis[TARGET].prototype;
	    }
	    if (target) for (key in source) {
	      sourceProperty = source[key];
	      if (options.dontCallGetSet) {
	        descriptor = getOwnPropertyDescriptor(target, key);
	        targetProperty = descriptor && descriptor.value;
	      } else targetProperty = target[key];
	      FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	      // contained in target
	      if (!FORCED && targetProperty !== undefined) {
	        if (typeof sourceProperty == typeof targetProperty) continue;
	        copyConstructorProperties(sourceProperty, targetProperty);
	      }
	      // add a flag to not completely full polyfills
	      if (options.sham || targetProperty && targetProperty.sham) {
	        createNonEnumerableProperty(sourceProperty, 'sham', true);
	      }
	      defineBuiltIn(target, key, sourceProperty, options);
	    }
	  };
	  return _export;
	}

	var anInstance;
	var hasRequiredAnInstance;
	function requireAnInstance() {
	  if (hasRequiredAnInstance) return anInstance;
	  hasRequiredAnInstance = 1;
	  var isPrototypeOf = requireObjectIsPrototypeOf();
	  var $TypeError = TypeError;
	  anInstance = function (it, Prototype) {
	    if (isPrototypeOf(Prototype, it)) return it;
	    throw new $TypeError('Incorrect invocation');
	  };
	  return anInstance;
	}

	var correctPrototypeGetter;
	var hasRequiredCorrectPrototypeGetter;
	function requireCorrectPrototypeGetter() {
	  if (hasRequiredCorrectPrototypeGetter) return correctPrototypeGetter;
	  hasRequiredCorrectPrototypeGetter = 1;
	  var fails = requireFails();
	  correctPrototypeGetter = !fails(function () {
	    function F() {/* empty */}
	    F.prototype.constructor = null;
	    // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
	    return Object.getPrototypeOf(new F()) !== F.prototype;
	  });
	  return correctPrototypeGetter;
	}

	var objectGetPrototypeOf;
	var hasRequiredObjectGetPrototypeOf;
	function requireObjectGetPrototypeOf() {
	  if (hasRequiredObjectGetPrototypeOf) return objectGetPrototypeOf;
	  hasRequiredObjectGetPrototypeOf = 1;
	  var hasOwn = requireHasOwnProperty();
	  var isCallable = requireIsCallable();
	  var toObject = requireToObject();
	  var sharedKey = requireSharedKey();
	  var CORRECT_PROTOTYPE_GETTER = requireCorrectPrototypeGetter();
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
	    }
	    return object instanceof $Object ? ObjectPrototype : null;
	  };
	  return objectGetPrototypeOf;
	}

	var defineBuiltInAccessor;
	var hasRequiredDefineBuiltInAccessor;
	function requireDefineBuiltInAccessor() {
	  if (hasRequiredDefineBuiltInAccessor) return defineBuiltInAccessor;
	  hasRequiredDefineBuiltInAccessor = 1;
	  var makeBuiltIn = requireMakeBuiltIn();
	  var defineProperty = requireObjectDefineProperty();
	  defineBuiltInAccessor = function (target, name, descriptor) {
	    if (descriptor.get) makeBuiltIn(descriptor.get, name, {
	      getter: true
	    });
	    if (descriptor.set) makeBuiltIn(descriptor.set, name, {
	      setter: true
	    });
	    return defineProperty.f(target, name, descriptor);
	  };
	  return defineBuiltInAccessor;
	}

	var createProperty;
	var hasRequiredCreateProperty;
	function requireCreateProperty() {
	  if (hasRequiredCreateProperty) return createProperty;
	  hasRequiredCreateProperty = 1;
	  var DESCRIPTORS = requireDescriptors();
	  var definePropertyModule = requireObjectDefineProperty();
	  var createPropertyDescriptor = requireCreatePropertyDescriptor();
	  createProperty = function (object, key, value) {
	    if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));else object[key] = value;
	  };
	  return createProperty;
	}

	var objectDefineProperties = {};

	var objectKeys;
	var hasRequiredObjectKeys;
	function requireObjectKeys() {
	  if (hasRequiredObjectKeys) return objectKeys;
	  hasRequiredObjectKeys = 1;
	  var internalObjectKeys = requireObjectKeysInternal();
	  var enumBugKeys = requireEnumBugKeys();

	  // `Object.keys` method
	  // https://tc39.es/ecma262/#sec-object.keys
	  // eslint-disable-next-line es/no-object-keys -- safe
	  objectKeys = Object.keys || function keys(O) {
	    return internalObjectKeys(O, enumBugKeys);
	  };
	  return objectKeys;
	}

	var hasRequiredObjectDefineProperties;
	function requireObjectDefineProperties() {
	  if (hasRequiredObjectDefineProperties) return objectDefineProperties;
	  hasRequiredObjectDefineProperties = 1;
	  var DESCRIPTORS = requireDescriptors();
	  var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
	  var definePropertyModule = requireObjectDefineProperty();
	  var anObject = requireAnObject();
	  var toIndexedObject = requireToIndexedObject();
	  var objectKeys = requireObjectKeys();

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
	function requireHtml() {
	  if (hasRequiredHtml) return html;
	  hasRequiredHtml = 1;
	  var getBuiltIn = requireGetBuiltIn();
	  html = getBuiltIn('document', 'documentElement');
	  return html;
	}

	var objectCreate;
	var hasRequiredObjectCreate;
	function requireObjectCreate() {
	  if (hasRequiredObjectCreate) return objectCreate;
	  hasRequiredObjectCreate = 1;
	  /* global ActiveXObject -- old IE, WSH */
	  var anObject = requireAnObject();
	  var definePropertiesModule = requireObjectDefineProperties();
	  var enumBugKeys = requireEnumBugKeys();
	  var hiddenKeys = requireHiddenKeys();
	  var html = requireHtml();
	  var documentCreateElement = requireDocumentCreateElement();
	  var sharedKey = requireSharedKey();
	  var GT = '>';
	  var LT = '<';
	  var PROTOTYPE = 'prototype';
	  var SCRIPT = 'script';
	  var IE_PROTO = sharedKey('IE_PROTO');
	  var EmptyConstructor = function () {/* empty */};
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
	    } catch (error) {/* ignore */}
	    NullProtoObject = typeof document != 'undefined' ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) // old IE
	    : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument); // WSH
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

	var iteratorsCore;
	var hasRequiredIteratorsCore;
	function requireIteratorsCore() {
	  if (hasRequiredIteratorsCore) return iteratorsCore;
	  hasRequiredIteratorsCore = 1;
	  var fails = requireFails();
	  var isCallable = requireIsCallable();
	  var isObject = requireIsObject();
	  var create = requireObjectCreate();
	  var getPrototypeOf = requireObjectGetPrototypeOf();
	  var defineBuiltIn = requireDefineBuiltIn();
	  var wellKnownSymbol = requireWellKnownSymbol();
	  var IS_PURE = requireIsPure();
	  var ITERATOR = wellKnownSymbol('iterator');
	  var BUGGY_SAFARI_ITERATORS = false;

	  // `%IteratorPrototype%` object
	  // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
	  var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	  /* eslint-disable es/no-array-prototype-keys -- safe */
	  if ([].keys) {
	    arrayIterator = [].keys();
	    // Safari 8 has buggy iterators w/o `next`
	    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
	      PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
	      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	    }
	  }
	  var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
	    var test = {};
	    // FF44- legacy iterators case
	    return IteratorPrototype[ITERATOR].call(test) !== test;
	  });
	  if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

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

	var hasRequiredEs_iterator_constructor;
	function requireEs_iterator_constructor() {
	  if (hasRequiredEs_iterator_constructor) return es_iterator_constructor;
	  hasRequiredEs_iterator_constructor = 1;
	  var $ = require_export();
	  var globalThis = requireGlobalThis();
	  var anInstance = requireAnInstance();
	  var anObject = requireAnObject();
	  var isCallable = requireIsCallable();
	  var getPrototypeOf = requireObjectGetPrototypeOf();
	  var defineBuiltInAccessor = requireDefineBuiltInAccessor();
	  var createProperty = requireCreateProperty();
	  var fails = requireFails();
	  var hasOwn = requireHasOwnProperty();
	  var wellKnownSymbol = requireWellKnownSymbol();
	  var IteratorPrototype = requireIteratorsCore().IteratorPrototype;
	  var DESCRIPTORS = requireDescriptors();
	  var IS_PURE = requireIsPure();
	  var CONSTRUCTOR = 'constructor';
	  var ITERATOR = 'Iterator';
	  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	  var $TypeError = TypeError;
	  var NativeIterator = globalThis[ITERATOR];

	  // FF56- have non-standard global helper `Iterator`
	  var FORCED = IS_PURE || !isCallable(NativeIterator) || NativeIterator.prototype !== IteratorPrototype
	  // FF44- non-standard `Iterator` passes previous tests
	  || !fails(function () {
	    NativeIterator({});
	  });
	  var IteratorConstructor = function Iterator() {
	    anInstance(this, IteratorPrototype);
	    if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError('Abstract class Iterator not directly constructable');
	  };
	  var defineIteratorPrototypeAccessor = function (key, value) {
	    if (DESCRIPTORS) {
	      defineBuiltInAccessor(IteratorPrototype, key, {
	        configurable: true,
	        get: function () {
	          return value;
	        },
	        set: function (replacement) {
	          anObject(this);
	          if (this === IteratorPrototype) throw new $TypeError("You can't redefine this property");
	          if (hasOwn(this, key)) this[key] = replacement;else createProperty(this, key, replacement);
	        }
	      });
	    } else IteratorPrototype[key] = value;
	  };
	  if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) defineIteratorPrototypeAccessor(TO_STRING_TAG, ITERATOR);
	  if (FORCED || !hasOwn(IteratorPrototype, CONSTRUCTOR) || IteratorPrototype[CONSTRUCTOR] === Object) {
	    defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
	  }
	  IteratorConstructor.prototype = IteratorPrototype;

	  // `Iterator` constructor
	  // https://tc39.es/ecma262/#sec-iterator
	  $({
	    global: true,
	    constructor: true,
	    forced: FORCED
	  }, {
	    Iterator: IteratorConstructor
	  });
	  return es_iterator_constructor;
	}

	var hasRequiredEsnext_iterator_constructor;
	function requireEsnext_iterator_constructor() {
	  if (hasRequiredEsnext_iterator_constructor) return esnext_iterator_constructor;
	  hasRequiredEsnext_iterator_constructor = 1;
	  // TODO: Remove from `core-js@4`
	  requireEs_iterator_constructor();
	  return esnext_iterator_constructor;
	}

	requireEsnext_iterator_constructor();

	var esnext_iterator_forEach = {};

	var es_iterator_forEach = {};

	var functionUncurryThisClause;
	var hasRequiredFunctionUncurryThisClause;
	function requireFunctionUncurryThisClause() {
	  if (hasRequiredFunctionUncurryThisClause) return functionUncurryThisClause;
	  hasRequiredFunctionUncurryThisClause = 1;
	  var classofRaw = requireClassofRaw();
	  var uncurryThis = requireFunctionUncurryThis();
	  functionUncurryThisClause = function (fn) {
	    // Nashorn bug:
	    //   https://github.com/zloirock/core-js/issues/1128
	    //   https://github.com/zloirock/core-js/issues/1130
	    if (classofRaw(fn) === 'Function') return uncurryThis(fn);
	  };
	  return functionUncurryThisClause;
	}

	var functionBindContext;
	var hasRequiredFunctionBindContext;
	function requireFunctionBindContext() {
	  if (hasRequiredFunctionBindContext) return functionBindContext;
	  hasRequiredFunctionBindContext = 1;
	  var uncurryThis = requireFunctionUncurryThisClause();
	  var aCallable = requireACallable();
	  var NATIVE_BIND = requireFunctionBindNative();
	  var bind = uncurryThis(uncurryThis.bind);

	  // optional / simple context binding
	  functionBindContext = function (fn, that) {
	    aCallable(fn);
	    return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function /* ...args */
	    () {
	      return fn.apply(that, arguments);
	    };
	  };
	  return functionBindContext;
	}

	var iterators;
	var hasRequiredIterators;
	function requireIterators() {
	  if (hasRequiredIterators) return iterators;
	  hasRequiredIterators = 1;
	  iterators = {};
	  return iterators;
	}

	var isArrayIteratorMethod;
	var hasRequiredIsArrayIteratorMethod;
	function requireIsArrayIteratorMethod() {
	  if (hasRequiredIsArrayIteratorMethod) return isArrayIteratorMethod;
	  hasRequiredIsArrayIteratorMethod = 1;
	  var wellKnownSymbol = requireWellKnownSymbol();
	  var Iterators = requireIterators();
	  var ITERATOR = wellKnownSymbol('iterator');
	  var ArrayPrototype = Array.prototype;

	  // check on default Array iterator
	  isArrayIteratorMethod = function (it) {
	    return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
	  };
	  return isArrayIteratorMethod;
	}

	var toStringTagSupport;
	var hasRequiredToStringTagSupport;
	function requireToStringTagSupport() {
	  if (hasRequiredToStringTagSupport) return toStringTagSupport;
	  hasRequiredToStringTagSupport = 1;
	  var wellKnownSymbol = requireWellKnownSymbol();
	  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	  var test = {};
	  test[TO_STRING_TAG] = 'z';
	  toStringTagSupport = String(test) === '[object z]';
	  return toStringTagSupport;
	}

	var classof;
	var hasRequiredClassof;
	function requireClassof() {
	  if (hasRequiredClassof) return classof;
	  hasRequiredClassof = 1;
	  var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
	  var isCallable = requireIsCallable();
	  var classofRaw = requireClassofRaw();
	  var wellKnownSymbol = requireWellKnownSymbol();
	  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	  var $Object = Object;

	  // ES3 wrong here
	  var CORRECT_ARGUMENTS = classofRaw(function () {
	    return arguments;
	  }()) === 'Arguments';

	  // fallback for IE11 Script Access Denied error
	  var tryGet = function (it, key) {
	    try {
	      return it[key];
	    } catch (error) {/* empty */}
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

	var getIteratorMethod;
	var hasRequiredGetIteratorMethod;
	function requireGetIteratorMethod() {
	  if (hasRequiredGetIteratorMethod) return getIteratorMethod;
	  hasRequiredGetIteratorMethod = 1;
	  var classof = requireClassof();
	  var getMethod = requireGetMethod();
	  var isNullOrUndefined = requireIsNullOrUndefined();
	  var Iterators = requireIterators();
	  var wellKnownSymbol = requireWellKnownSymbol();
	  var ITERATOR = wellKnownSymbol('iterator');
	  getIteratorMethod = function (it) {
	    if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR) || getMethod(it, '@@iterator') || Iterators[classof(it)];
	  };
	  return getIteratorMethod;
	}

	var getIterator;
	var hasRequiredGetIterator;
	function requireGetIterator() {
	  if (hasRequiredGetIterator) return getIterator;
	  hasRequiredGetIterator = 1;
	  var call = requireFunctionCall();
	  var aCallable = requireACallable();
	  var anObject = requireAnObject();
	  var tryToString = requireTryToString();
	  var getIteratorMethod = requireGetIteratorMethod();
	  var $TypeError = TypeError;
	  getIterator = function (argument, usingIterator) {
	    var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
	    if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
	    throw new $TypeError(tryToString(argument) + ' is not iterable');
	  };
	  return getIterator;
	}

	var iteratorClose;
	var hasRequiredIteratorClose;
	function requireIteratorClose() {
	  if (hasRequiredIteratorClose) return iteratorClose;
	  hasRequiredIteratorClose = 1;
	  var call = requireFunctionCall();
	  var anObject = requireAnObject();
	  var getMethod = requireGetMethod();
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
	function requireIterate() {
	  if (hasRequiredIterate) return iterate;
	  hasRequiredIterate = 1;
	  var bind = requireFunctionBindContext();
	  var call = requireFunctionCall();
	  var anObject = requireAnObject();
	  var tryToString = requireTryToString();
	  var isArrayIteratorMethod = requireIsArrayIteratorMethod();
	  var lengthOfArrayLike = requireLengthOfArrayLike();
	  var isPrototypeOf = requireObjectIsPrototypeOf();
	  var getIterator = requireGetIterator();
	  var getIteratorMethod = requireGetIteratorMethod();
	  var iteratorClose = requireIteratorClose();
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
	      }
	      return INTERRUPTED ? fn(value, stop) : fn(value);
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
	        }
	        return new Result(false);
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
	    }
	    return new Result(false);
	  };
	  return iterate;
	}

	var getIteratorDirect;
	var hasRequiredGetIteratorDirect;
	function requireGetIteratorDirect() {
	  if (hasRequiredGetIteratorDirect) return getIteratorDirect;
	  hasRequiredGetIteratorDirect = 1;
	  // `GetIteratorDirect(obj)` abstract operation
	  // https://tc39.es/proposal-iterator-helpers/#sec-getiteratordirect
	  getIteratorDirect = function (obj) {
	    return {
	      iterator: obj,
	      next: obj.next,
	      done: false
	    };
	  };
	  return getIteratorDirect;
	}

	var iteratorHelperWithoutClosingOnEarlyError;
	var hasRequiredIteratorHelperWithoutClosingOnEarlyError;
	function requireIteratorHelperWithoutClosingOnEarlyError() {
	  if (hasRequiredIteratorHelperWithoutClosingOnEarlyError) return iteratorHelperWithoutClosingOnEarlyError;
	  hasRequiredIteratorHelperWithoutClosingOnEarlyError = 1;
	  var globalThis = requireGlobalThis();

	  // https://github.com/tc39/ecma262/pull/3467
	  iteratorHelperWithoutClosingOnEarlyError = function (METHOD_NAME, ExpectedError) {
	    var Iterator = globalThis.Iterator;
	    var IteratorPrototype = Iterator && Iterator.prototype;
	    var method = IteratorPrototype && IteratorPrototype[METHOD_NAME];
	    var CLOSED = false;
	    if (method) try {
	      method.call({
	        next: function () {
	          return {
	            done: true
	          };
	        },
	        'return': function () {
	          CLOSED = true;
	        }
	      }, -1);
	    } catch (error) {
	      // https://bugs.webkit.org/show_bug.cgi?id=291195
	      if (!(error instanceof ExpectedError)) CLOSED = false;
	    }
	    if (!CLOSED) return method;
	  };
	  return iteratorHelperWithoutClosingOnEarlyError;
	}

	var hasRequiredEs_iterator_forEach;
	function requireEs_iterator_forEach() {
	  if (hasRequiredEs_iterator_forEach) return es_iterator_forEach;
	  hasRequiredEs_iterator_forEach = 1;
	  var $ = require_export();
	  var call = requireFunctionCall();
	  var iterate = requireIterate();
	  var aCallable = requireACallable();
	  var anObject = requireAnObject();
	  var getIteratorDirect = requireGetIteratorDirect();
	  var iteratorClose = requireIteratorClose();
	  var iteratorHelperWithoutClosingOnEarlyError = requireIteratorHelperWithoutClosingOnEarlyError();
	  var forEachWithoutClosingOnEarlyError = iteratorHelperWithoutClosingOnEarlyError('forEach', TypeError);

	  // `Iterator.prototype.forEach` method
	  // https://tc39.es/ecma262/#sec-iterator.prototype.foreach
	  $({
	    target: 'Iterator',
	    proto: true,
	    real: true,
	    forced: forEachWithoutClosingOnEarlyError
	  }, {
	    forEach: function forEach(fn) {
	      anObject(this);
	      try {
	        aCallable(fn);
	      } catch (error) {
	        iteratorClose(this, 'throw', error);
	      }
	      if (forEachWithoutClosingOnEarlyError) return call(forEachWithoutClosingOnEarlyError, this, fn);
	      var record = getIteratorDirect(this);
	      var counter = 0;
	      iterate(record, function (value) {
	        fn(value, counter++);
	      }, {
	        IS_RECORD: true
	      });
	    }
	  });
	  return es_iterator_forEach;
	}

	var hasRequiredEsnext_iterator_forEach;
	function requireEsnext_iterator_forEach() {
	  if (hasRequiredEsnext_iterator_forEach) return esnext_iterator_forEach;
	  hasRequiredEsnext_iterator_forEach = 1;
	  // TODO: Remove from `core-js@4`
	  requireEs_iterator_forEach();
	  return esnext_iterator_forEach;
	}

	requireEsnext_iterator_forEach();

	var esnext_iterator_map = {};

	var es_iterator_map = {};

	var defineBuiltIns;
	var hasRequiredDefineBuiltIns;
	function requireDefineBuiltIns() {
	  if (hasRequiredDefineBuiltIns) return defineBuiltIns;
	  hasRequiredDefineBuiltIns = 1;
	  var defineBuiltIn = requireDefineBuiltIn();
	  defineBuiltIns = function (target, src, options) {
	    for (var key in src) defineBuiltIn(target, key, src[key], options);
	    return target;
	  };
	  return defineBuiltIns;
	}

	var createIterResultObject;
	var hasRequiredCreateIterResultObject;
	function requireCreateIterResultObject() {
	  if (hasRequiredCreateIterResultObject) return createIterResultObject;
	  hasRequiredCreateIterResultObject = 1;
	  // `CreateIterResultObject` abstract operation
	  // https://tc39.es/ecma262/#sec-createiterresultobject
	  createIterResultObject = function (value, done) {
	    return {
	      value: value,
	      done: done
	    };
	  };
	  return createIterResultObject;
	}

	var iteratorCloseAll;
	var hasRequiredIteratorCloseAll;
	function requireIteratorCloseAll() {
	  if (hasRequiredIteratorCloseAll) return iteratorCloseAll;
	  hasRequiredIteratorCloseAll = 1;
	  var iteratorClose = requireIteratorClose();
	  iteratorCloseAll = function (iters, kind, value) {
	    for (var i = iters.length - 1; i >= 0; i--) {
	      if (iters[i] === undefined) continue;
	      try {
	        value = iteratorClose(iters[i].iterator, kind, value);
	      } catch (error) {
	        kind = 'throw';
	        value = error;
	      }
	    }
	    if (kind === 'throw') throw value;
	    return value;
	  };
	  return iteratorCloseAll;
	}

	var iteratorCreateProxy;
	var hasRequiredIteratorCreateProxy;
	function requireIteratorCreateProxy() {
	  if (hasRequiredIteratorCreateProxy) return iteratorCreateProxy;
	  hasRequiredIteratorCreateProxy = 1;
	  var call = requireFunctionCall();
	  var create = requireObjectCreate();
	  var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
	  var defineBuiltIns = requireDefineBuiltIns();
	  var wellKnownSymbol = requireWellKnownSymbol();
	  var InternalStateModule = requireInternalState();
	  var getMethod = requireGetMethod();
	  var IteratorPrototype = requireIteratorsCore().IteratorPrototype;
	  var createIterResultObject = requireCreateIterResultObject();
	  var iteratorClose = requireIteratorClose();
	  var iteratorCloseAll = requireIteratorCloseAll();
	  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	  var ITERATOR_HELPER = 'IteratorHelper';
	  var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
	  var NORMAL = 'normal';
	  var THROW = 'throw';
	  var setInternalState = InternalStateModule.set;
	  var createIteratorProxyPrototype = function (IS_ITERATOR) {
	    var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);
	    return defineBuiltIns(create(IteratorPrototype), {
	      next: function next() {
	        var state = getInternalState(this);
	        // for simplification:
	        //   for `%WrapForValidIteratorPrototype%.next` or with `state.returnHandlerResult` our `nextHandler` returns `IterResultObject`
	        //   for `%IteratorHelperPrototype%.next` - just a value
	        if (IS_ITERATOR) return state.nextHandler();
	        if (state.done) return createIterResultObject(undefined, true);
	        try {
	          var result = state.nextHandler();
	          return state.returnHandlerResult ? result : createIterResultObject(result, state.done);
	        } catch (error) {
	          state.done = true;
	          throw error;
	        }
	      },
	      'return': function () {
	        var state = getInternalState(this);
	        var iterator = state.iterator;
	        state.done = true;
	        if (IS_ITERATOR) {
	          var returnMethod = getMethod(iterator, 'return');
	          return returnMethod ? call(returnMethod, iterator) : createIterResultObject(undefined, true);
	        }
	        if (state.inner) try {
	          iteratorClose(state.inner.iterator, NORMAL);
	        } catch (error) {
	          return iteratorClose(iterator, THROW, error);
	        }
	        if (state.openIters) try {
	          iteratorCloseAll(state.openIters, NORMAL);
	        } catch (error) {
	          return iteratorClose(iterator, THROW, error);
	        }
	        if (iterator) iteratorClose(iterator, NORMAL);
	        return createIterResultObject(undefined, true);
	      }
	    });
	  };
	  var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
	  var IteratorHelperPrototype = createIteratorProxyPrototype(false);
	  createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');
	  iteratorCreateProxy = function (nextHandler, IS_ITERATOR, RETURN_HANDLER_RESULT) {
	    var IteratorProxy = function Iterator(record, state) {
	      if (state) {
	        state.iterator = record.iterator;
	        state.next = record.next;
	      } else state = record;
	      state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
	      state.returnHandlerResult = !!RETURN_HANDLER_RESULT;
	      state.nextHandler = nextHandler;
	      state.counter = 0;
	      state.done = false;
	      setInternalState(this, state);
	    };
	    IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;
	    return IteratorProxy;
	  };
	  return iteratorCreateProxy;
	}

	var callWithSafeIterationClosing;
	var hasRequiredCallWithSafeIterationClosing;
	function requireCallWithSafeIterationClosing() {
	  if (hasRequiredCallWithSafeIterationClosing) return callWithSafeIterationClosing;
	  hasRequiredCallWithSafeIterationClosing = 1;
	  var anObject = requireAnObject();
	  var iteratorClose = requireIteratorClose();

	  // call something on iterator step with safe closing on error
	  callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	    try {
	      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	    } catch (error) {
	      iteratorClose(iterator, 'throw', error);
	    }
	  };
	  return callWithSafeIterationClosing;
	}

	var iteratorHelperThrowsOnInvalidIterator;
	var hasRequiredIteratorHelperThrowsOnInvalidIterator;
	function requireIteratorHelperThrowsOnInvalidIterator() {
	  if (hasRequiredIteratorHelperThrowsOnInvalidIterator) return iteratorHelperThrowsOnInvalidIterator;
	  hasRequiredIteratorHelperThrowsOnInvalidIterator = 1;
	  // Should throw an error on invalid iterator
	  // https://issues.chromium.org/issues/336839115
	  iteratorHelperThrowsOnInvalidIterator = function (methodName, argument) {
	    // eslint-disable-next-line es/no-iterator -- required for testing
	    var method = typeof Iterator == 'function' && Iterator.prototype[methodName];
	    if (method) try {
	      method.call({
	        next: null
	      }, argument).next();
	    } catch (error) {
	      return true;
	    }
	  };
	  return iteratorHelperThrowsOnInvalidIterator;
	}

	var hasRequiredEs_iterator_map;
	function requireEs_iterator_map() {
	  if (hasRequiredEs_iterator_map) return es_iterator_map;
	  hasRequiredEs_iterator_map = 1;
	  var $ = require_export();
	  var call = requireFunctionCall();
	  var aCallable = requireACallable();
	  var anObject = requireAnObject();
	  var getIteratorDirect = requireGetIteratorDirect();
	  var createIteratorProxy = requireIteratorCreateProxy();
	  var callWithSafeIterationClosing = requireCallWithSafeIterationClosing();
	  var iteratorClose = requireIteratorClose();
	  var iteratorHelperThrowsOnInvalidIterator = requireIteratorHelperThrowsOnInvalidIterator();
	  var iteratorHelperWithoutClosingOnEarlyError = requireIteratorHelperWithoutClosingOnEarlyError();
	  var IS_PURE = requireIsPure();
	  var MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR = !IS_PURE && !iteratorHelperThrowsOnInvalidIterator('map', function () {/* empty */});
	  var mapWithoutClosingOnEarlyError = !IS_PURE && !MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR && iteratorHelperWithoutClosingOnEarlyError('map', TypeError);
	  var FORCED = IS_PURE || MAP_WITHOUT_THROWING_ON_INVALID_ITERATOR || mapWithoutClosingOnEarlyError;
	  var IteratorProxy = createIteratorProxy(function () {
	    var iterator = this.iterator;
	    var result = anObject(call(this.next, iterator));
	    var done = this.done = !!result.done;
	    if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
	  });

	  // `Iterator.prototype.map` method
	  // https://tc39.es/ecma262/#sec-iterator.prototype.map
	  $({
	    target: 'Iterator',
	    proto: true,
	    real: true,
	    forced: FORCED
	  }, {
	    map: function map(mapper) {
	      anObject(this);
	      try {
	        aCallable(mapper);
	      } catch (error) {
	        iteratorClose(this, 'throw', error);
	      }
	      if (mapWithoutClosingOnEarlyError) return call(mapWithoutClosingOnEarlyError, this, mapper);
	      return new IteratorProxy(getIteratorDirect(this), {
	        mapper: mapper
	      });
	    }
	  });
	  return es_iterator_map;
	}

	var hasRequiredEsnext_iterator_map;
	function requireEsnext_iterator_map() {
	  if (hasRequiredEsnext_iterator_map) return esnext_iterator_map;
	  hasRequiredEsnext_iterator_map = 1;
	  // TODO: Remove from `core-js@4`
	  requireEs_iterator_map();
	  return esnext_iterator_map;
	}

	requireEsnext_iterator_map();

	/******************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */
	/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

	function __awaiter(thisArg, _arguments, P, generator) {
	  function adopt(value) {
	    return value instanceof P ? value : new P(function (resolve) {
	      resolve(value);
	    });
	  }
	  return new (P || (P = Promise))(function (resolve, reject) {
	    function fulfilled(value) {
	      try {
	        step(generator.next(value));
	      } catch (e) {
	        reject(e);
	      }
	    }
	    function rejected(value) {
	      try {
	        step(generator["throw"](value));
	      } catch (e) {
	        reject(e);
	      }
	    }
	    function step(result) {
	      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
	    }
	    step((generator = generator.apply(thisArg, _arguments || [])).next());
	  });
	}
	typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
	  var e = new Error(message);
	  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
	};

	var fastDeepEqual;
	var hasRequiredFastDeepEqual;
	function requireFastDeepEqual() {
	  if (hasRequiredFastDeepEqual) return fastDeepEqual;
	  hasRequiredFastDeepEqual = 1;

	  // do not edit .js files directly - edit src/index.jst

	  fastDeepEqual = function equal(a, b) {
	    if (a === b) return true;
	    if (a && b && typeof a == 'object' && typeof b == 'object') {
	      if (a.constructor !== b.constructor) return false;
	      var length, i, keys;
	      if (Array.isArray(a)) {
	        length = a.length;
	        if (length != b.length) return false;
	        for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;
	        return true;
	      }
	      if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
	      if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
	      if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
	      keys = Object.keys(a);
	      length = keys.length;
	      if (length !== Object.keys(b).length) return false;
	      for (i = length; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
	      for (i = length; i-- !== 0;) {
	        var key = keys[i];
	        if (!equal(a[key], b[key])) return false;
	      }
	      return true;
	    }

	    // true if both NaN, false otherwise
	    return a !== a && b !== b;
	  };
	  return fastDeepEqual;
	}

	var fastDeepEqualExports = requireFastDeepEqual();
	var isEqual = /*@__PURE__*/getDefaultExportFromCjs(fastDeepEqualExports);

	const DEFAULT_ID = "__googleMapsScriptId";
	/**
	 * The status of the [[Loader]].
	 */
	exports.LoaderStatus = void 0;
	(function (LoaderStatus) {
	  LoaderStatus[LoaderStatus["INITIALIZED"] = 0] = "INITIALIZED";
	  LoaderStatus[LoaderStatus["LOADING"] = 1] = "LOADING";
	  LoaderStatus[LoaderStatus["SUCCESS"] = 2] = "SUCCESS";
	  LoaderStatus[LoaderStatus["FAILURE"] = 3] = "FAILURE";
	})(exports.LoaderStatus || (exports.LoaderStatus = {}));
	/**
	 * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
	 * dynamically using
	 * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
	 * It works by dynamically creating and appending a script node to the the
	 * document head and wrapping the callback function so as to return a promise.
	 *
	 * ```
	 * const loader = new Loader({
	 *   apiKey: "",
	 *   version: "weekly",
	 *   libraries: ["places"]
	 * });
	 *
	 * loader.load().then((google) => {
	 *   const map = new google.maps.Map(...)
	 * })
	 * ```
	 */
	class Loader {
	  /**
	   * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
	   * using this library, instead the defaults are set by the Google Maps
	   * JavaScript API server.
	   *
	   * ```
	   * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
	   * ```
	   */
	  constructor(_ref) {
	    let {
	      apiKey,
	      authReferrerPolicy,
	      channel,
	      client,
	      id = DEFAULT_ID,
	      language,
	      libraries = [],
	      mapIds,
	      nonce,
	      region,
	      retries = 3,
	      url = "https://maps.googleapis.com/maps/api/js",
	      version
	    } = _ref;
	    this.callbacks = [];
	    this.done = false;
	    this.loading = false;
	    this.errors = [];
	    this.apiKey = apiKey;
	    this.authReferrerPolicy = authReferrerPolicy;
	    this.channel = channel;
	    this.client = client;
	    this.id = id || DEFAULT_ID; // Do not allow empty string
	    this.language = language;
	    this.libraries = libraries;
	    this.mapIds = mapIds;
	    this.nonce = nonce;
	    this.region = region;
	    this.retries = retries;
	    this.url = url;
	    this.version = version;
	    if (Loader.instance) {
	      if (!isEqual(this.options, Loader.instance.options)) {
	        throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);
	      }
	      return Loader.instance;
	    }
	    Loader.instance = this;
	  }
	  get options() {
	    return {
	      version: this.version,
	      apiKey: this.apiKey,
	      channel: this.channel,
	      client: this.client,
	      id: this.id,
	      libraries: this.libraries,
	      language: this.language,
	      region: this.region,
	      mapIds: this.mapIds,
	      nonce: this.nonce,
	      url: this.url,
	      authReferrerPolicy: this.authReferrerPolicy
	    };
	  }
	  get status() {
	    if (this.errors.length) {
	      return exports.LoaderStatus.FAILURE;
	    }
	    if (this.done) {
	      return exports.LoaderStatus.SUCCESS;
	    }
	    if (this.loading) {
	      return exports.LoaderStatus.LOADING;
	    }
	    return exports.LoaderStatus.INITIALIZED;
	  }
	  get failed() {
	    return this.done && !this.loading && this.errors.length >= this.retries + 1;
	  }
	  /**
	   * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
	   *
	   * @ignore
	   * @deprecated
	   */
	  createUrl() {
	    let url = this.url;
	    url += `?callback=__googleMapsCallback&loading=async`;
	    if (this.apiKey) {
	      url += `&key=${this.apiKey}`;
	    }
	    if (this.channel) {
	      url += `&channel=${this.channel}`;
	    }
	    if (this.client) {
	      url += `&client=${this.client}`;
	    }
	    if (this.libraries.length > 0) {
	      url += `&libraries=${this.libraries.join(",")}`;
	    }
	    if (this.language) {
	      url += `&language=${this.language}`;
	    }
	    if (this.region) {
	      url += `&region=${this.region}`;
	    }
	    if (this.version) {
	      url += `&v=${this.version}`;
	    }
	    if (this.mapIds) {
	      url += `&map_ids=${this.mapIds.join(",")}`;
	    }
	    if (this.authReferrerPolicy) {
	      url += `&auth_referrer_policy=${this.authReferrerPolicy}`;
	    }
	    return url;
	  }
	  deleteScript() {
	    const script = document.getElementById(this.id);
	    if (script) {
	      script.remove();
	    }
	  }
	  /**
	   * Load the Google Maps JavaScript API script and return a Promise.
	   * @deprecated, use importLibrary() instead.
	   */
	  load() {
	    return this.loadPromise();
	  }
	  /**
	   * Load the Google Maps JavaScript API script and return a Promise.
	   *
	   * @ignore
	   * @deprecated, use importLibrary() instead.
	   */
	  loadPromise() {
	    return new Promise((resolve, reject) => {
	      this.loadCallback(err => {
	        if (!err) {
	          resolve(window.google);
	        } else {
	          reject(err.error);
	        }
	      });
	    });
	  }
	  importLibrary(name) {
	    this.execute();
	    return google.maps.importLibrary(name);
	  }
	  /**
	   * Load the Google Maps JavaScript API script with a callback.
	   * @deprecated, use importLibrary() instead.
	   */
	  loadCallback(fn) {
	    this.callbacks.push(fn);
	    this.execute();
	  }
	  /**
	   * Set the script on document.
	   */
	  setScript() {
	    var _a, _b;
	    if (document.getElementById(this.id)) {
	      // TODO wrap onerror callback for cases where the script was loaded elsewhere
	      this.callback();
	      return;
	    }
	    const params = {
	      key: this.apiKey,
	      channel: this.channel,
	      client: this.client,
	      libraries: this.libraries.length && this.libraries,
	      v: this.version,
	      mapIds: this.mapIds,
	      language: this.language,
	      region: this.region,
	      authReferrerPolicy: this.authReferrerPolicy
	    };
	    // keep the URL minimal:
	    Object.keys(params).forEach(
	    // eslint-disable-next-line @typescript-eslint/no-explicit-any
	    key => !params[key] && delete params[key]);
	    if (!((_b = (_a = window === null || window === void 0 ? void 0 : window.google) === null || _a === void 0 ? void 0 : _a.maps) === null || _b === void 0 ? void 0 : _b.importLibrary)) {
	      // tweaked copy of https://developers.google.com/maps/documentation/javascript/load-maps-js-api#dynamic-library-import
	      // which also sets the base url, the id, and the nonce
	      /* eslint-disable */
	      (g => {
	        // @ts-ignore
	        let h,
	          a,
	          k,
	          p = "The Google Maps JavaScript API",
	          c = "google",
	          l = "importLibrary",
	          q = "__ib__",
	          m = document,
	          b = window;
	        // @ts-ignore
	        b = b[c] || (b[c] = {});
	        // @ts-ignore
	        const d = b.maps || (b.maps = {}),
	          r = new Set(),
	          e = new URLSearchParams(),
	          u = () =>
	          // @ts-ignore
	          h || (h = new Promise((f, n) => __awaiter(this, void 0, void 0, function* () {
	            var _a;
	            yield a = m.createElement("script");
	            a.id = this.id;
	            e.set("libraries", [...r] + "");
	            // @ts-ignore
	            for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
	            e.set("callback", c + ".maps." + q);
	            a.src = this.url + `?` + e;
	            d[q] = f;
	            a.onerror = () => h = n(Error(p + " could not load."));
	            // @ts-ignore
	            a.nonce = this.nonce || ((_a = m.querySelector("script[nonce]")) === null || _a === void 0 ? void 0 : _a.nonce) || "";
	            m.head.append(a);
	          })));
	        // @ts-ignore
	        d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = function (f) {
	          for (var _len = arguments.length, n = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            n[_key - 1] = arguments[_key];
	          }
	          return r.add(f) && u().then(() => d[l](f, ...n));
	        };
	      })(params);
	      /* eslint-enable */
	    }
	    // While most libraries populate the global namespace when loaded via bootstrap params,
	    // this is not the case for "marker" when used with the inline bootstrap loader
	    // (and maybe others in the future). So ensure there is an importLibrary for each:
	    const libraryPromises = this.libraries.map(library => this.importLibrary(library));
	    // ensure at least one library, to kick off loading...
	    if (!libraryPromises.length) {
	      libraryPromises.push(this.importLibrary("core"));
	    }
	    Promise.all(libraryPromises).then(() => this.callback(), error => {
	      const event = new ErrorEvent("error", {
	        error
	      }); // for backwards compat
	      this.loadErrorCallback(event);
	    });
	  }
	  /**
	   * Reset the loader state.
	   */
	  reset() {
	    this.deleteScript();
	    this.done = false;
	    this.loading = false;
	    this.errors = [];
	    this.onerrorEvent = null;
	  }
	  resetIfRetryingFailed() {
	    if (this.failed) {
	      this.reset();
	    }
	  }
	  loadErrorCallback(e) {
	    this.errors.push(e);
	    if (this.errors.length <= this.retries) {
	      const delay = this.errors.length * Math.pow(2, this.errors.length);
	      console.error(`Failed to load Google Maps script, retrying in ${delay} ms.`);
	      setTimeout(() => {
	        this.deleteScript();
	        this.setScript();
	      }, delay);
	    } else {
	      this.onerrorEvent = e;
	      this.callback();
	    }
	  }
	  callback() {
	    this.done = true;
	    this.loading = false;
	    this.callbacks.forEach(cb => {
	      cb(this.onerrorEvent);
	    });
	    this.callbacks = [];
	  }
	  execute() {
	    this.resetIfRetryingFailed();
	    if (this.loading) {
	      // do nothing but wait
	      return;
	    }
	    if (this.done) {
	      this.callback();
	    } else {
	      // short circuit and warn if google.maps is already loaded
	      if (window.google && window.google.maps && window.google.maps.version) {
	        console.warn("Google Maps already loaded outside @googlemaps/js-api-loader. " + "This may result in undesirable behavior as options and script parameters may not match.");
	        this.callback();
	        return;
	      }
	      this.loading = true;
	      this.setScript();
	    }
	  }
	}

	exports.DEFAULT_ID = DEFAULT_ID;
	exports.Loader = Loader;

	return exports;

})({});
//# sourceMappingURL=index.dev.js.map
