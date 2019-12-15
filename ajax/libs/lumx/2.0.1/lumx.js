(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("official-lumx", [], factory);
	else if(typeof exports === 'object')
		exports["official-lumx"] = factory();
	else
		root["LumX"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 82);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var O = 'object';
var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == O && globalThis) ||
  check(typeof window == O && window) ||
  check(typeof self == O && self) ||
  check(typeof global == O && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(88)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var getOwnPropertyDescriptor = __webpack_require__(34).f;
var hide = __webpack_require__(13);
var redefine = __webpack_require__(7);
var setGlobal = __webpack_require__(39);
var copyConstructorProperties = __webpack_require__(91);
var isForced = __webpack_require__(44);

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
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      hide(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var shared = __webpack_require__(25);
var uid = __webpack_require__(61);
var NATIVE_SYMBOL = __webpack_require__(94);

var Symbol = global.Symbol;
var store = shared('wks');

module.exports = function (name) {
  return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name]
    || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var $find = __webpack_require__(27).find;
var addToUnscopables = __webpack_require__(97);

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var shared = __webpack_require__(25);
var hide = __webpack_require__(13);
var has = __webpack_require__(14);
var setGlobal = __webpack_require__(39);
var nativeFunctionToString = __webpack_require__(58);
var InternalStateModule = __webpack_require__(59);

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(nativeFunctionToString).split('toString');

shared('inspectSource', function (it) {
  return nativeFunctionToString.call(it);
});

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else hide(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(20);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 10 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(57);
var anObject = __webpack_require__(4);
var toPrimitive = __webpack_require__(37);

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9);
var definePropertyModule = __webpack_require__(11);
var createPropertyDescriptor = __webpack_require__(35);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(12);

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var exec = __webpack_require__(28);

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var $indexOf = __webpack_require__(65).indexOf;
var sloppyArrayMethod = __webpack_require__(21);

var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || SLOPPY_METHOD }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(36);
var requireObjectCoercible = __webpack_require__(12);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(62);
var global = __webpack_require__(0);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !method || !fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(42);
var toInteger = __webpack_require__(20);
var toLength = __webpack_require__(8);
var toObject = __webpack_require__(15);
var arraySpeciesCreate = __webpack_require__(45);
var createProperty = __webpack_require__(47);
var arrayMethodHasSpeciesSupport = __webpack_require__(26);

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('splice') }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
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
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
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
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var parseIntImplementation = __webpack_require__(129);

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
$({ global: true, forced: parseInt != parseIntImplementation }, {
  parseInt: parseIntImplementation
});


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var setGlobal = __webpack_require__(39);
var IS_PURE = __webpack_require__(40);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.2.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);
var wellKnownSymbol = __webpack_require__(2);

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  return !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(48);
var IndexedObject = __webpack_require__(36);
var toObject = __webpack_require__(15);
var toLength = __webpack_require__(8);
var arraySpeciesCreate = __webpack_require__(45);

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
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

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__(49);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(51);
var anObject = __webpack_require__(4);
var toObject = __webpack_require__(15);
var toLength = __webpack_require__(8);
var toInteger = __webpack_require__(20);
var requireObjectCoercible = __webpack_require__(12);
var advanceStringIndex = __webpack_require__(52);
var regExpExec = __webpack_require__(53);

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var forEach = __webpack_require__(71);

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var DOMIterables = __webpack_require__(120);
var forEach = __webpack_require__(71);
var hide = __webpack_require__(13);

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    hide(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CSS_PREFIX */
/* unused harmony export DOWN_KEY_CODE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ENTER_KEY_CODE; });
/* unused harmony export ESCAPE_KEY_CODE */
/* unused harmony export LEFT_KEY_CODE */
/* unused harmony export RIGHT_KEY_CODE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TAB_KEY_CODE; });
/* unused harmony export UP_KEY_CODE */
/////////////////////////////
//                         //
//    Public attributes    //
//                         //
/////////////////////////////

/**
 * The prefix to use for the CSS classes.
 *
 * @type {string}
 * @constant
 * @readonly
 */
const CSS_PREFIX = 'lumx';

/**
 * The down key code.
 *
 * @type {number}
 * @constant
 */
const DOWN_KEY_CODE = 40;

/**
 * The enter/return key code.
 *
 * @type {number}
 * @constant
 */
const ENTER_KEY_CODE = 13;

/**
 * The escape key code.
 *
 * @type {number}
 * @constant
 */
const ESCAPE_KEY_CODE = 27;

/**
 * The left key code.
 *
 * @type {number}
 * @constant
 */
const LEFT_KEY_CODE = 37;

/**
 * The right key code.
 *
 * @type {number}
 * @constant
 */
const RIGHT_KEY_CODE = 39;

/**
 * The tab key code.
 *
 * @type {number}
 * @constant
 */
const TAB_KEY_CODE = 9;

/**
 * The up key code.
 *
 * @type {number}
 * @constant
 */
const UP_KEY_CODE = 38;

/////////////////////////////




/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9);
var propertyIsEnumerableModule = __webpack_require__(89);
var createPropertyDescriptor = __webpack_require__(35);
var toIndexedObject = __webpack_require__(18);
var toPrimitive = __webpack_require__(37);
var has = __webpack_require__(14);
var IE8_DOM_DEFINE = __webpack_require__(57);

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);
var classof = __webpack_require__(10);

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var isObject = __webpack_require__(5);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var hide = __webpack_require__(13);

module.exports = function (key, value) {
  try {
    hide(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(20);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);

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

module.exports = isForced;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var isArray = __webpack_require__(46);
var wellKnownSymbol = __webpack_require__(2);

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
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


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(10);

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__(37);
var definePropertyModule = __webpack_require__(11);
var createPropertyDescriptor = __webpack_require__(35);

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(23);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
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


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(4);

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__(7);
var anObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var flags = __webpack_require__(49);

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(13);
var redefine = __webpack_require__(7);
var fails = __webpack_require__(3);
var wellKnownSymbol = __webpack_require__(2);
var regexpExec = __webpack_require__(28);

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };

    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
    if (sham) hide(RegExp.prototype[SYMBOL], 'sham', true);
  }
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(104).charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(10);
var regexpExec = __webpack_require__(28);

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var isObject = __webpack_require__(5);
var isArray = __webpack_require__(46);
var toAbsoluteIndex = __webpack_require__(42);
var toLength = __webpack_require__(8);
var toIndexedObject = __webpack_require__(18);
var createProperty = __webpack_require__(47);
var arrayMethodHasSpeciesSupport = __webpack_require__(26);
var wellKnownSymbol = __webpack_require__(2);

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('slice') }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(12);
var whitespaces = __webpack_require__(30);

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var aFunction = __webpack_require__(23);
var wellKnownSymbol = __webpack_require__(2);

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9);
var fails = __webpack_require__(3);
var createElement = __webpack_require__(38);

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(25);

module.exports = shared('native-function-to-string', Function.toString);


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(90);
var global = __webpack_require__(0);
var isObject = __webpack_require__(5);
var hide = __webpack_require__(13);
var objectHas = __webpack_require__(14);
var sharedKey = __webpack_require__(60);
var hiddenKeys = __webpack_require__(41);

var WeakMap = global.WeakMap;
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

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
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
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(25);
var uid = __webpack_require__(61);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),
/* 61 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(64);
var enumBugKeys = __webpack_require__(43);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(14);
var toIndexedObject = __webpack_require__(18);
var indexOf = __webpack_require__(65).indexOf;
var hiddenKeys = __webpack_require__(41);

module.exports = function (object, names) {
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


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(18);
var toLength = __webpack_require__(8);
var toAbsoluteIndex = __webpack_require__(42);

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

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(64);
var enumBugKeys = __webpack_require__(43);

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(19);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(7);

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(7);
var toString = __webpack_require__(103);

var ObjectPrototype = Object.prototype;

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (toString !== ObjectPrototype.toString) {
  redefine(ObjectPrototype, 'toString', toString, { unsafe: true });
}


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var classofRaw = __webpack_require__(10);
var wellKnownSymbol = __webpack_require__(2);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__(27).forEach;
var sloppyArrayMethod = __webpack_require__(21);

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var $filter = __webpack_require__(27).filter;
var arrayMethodHasSpeciesSupport = __webpack_require__(26);

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('filter') }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9);
var global = __webpack_require__(0);
var isForced = __webpack_require__(44);
var inheritIfRequired = __webpack_require__(133);
var defineProperty = __webpack_require__(11).f;
var getOwnPropertyNames = __webpack_require__(63).f;
var isRegExp = __webpack_require__(74);
var getFlags = __webpack_require__(49);
var redefine = __webpack_require__(7);
var fails = __webpack_require__(3);
var setSpecies = __webpack_require__(75);
var wellKnownSymbol = __webpack_require__(2);

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var FORCED = DESCRIPTORS && isForced('RegExp', (!CORRECT_NEW || fails(function () {
  re2[MATCH] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor
if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    return !thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined ? pattern
      : inheritIfRequired(CORRECT_NEW
        ? new NativeRegExp(patternIsRegExp && !flagsAreUndefined ? pattern.source : pattern, flags)
        : NativeRegExp((patternIsRegExp = pattern instanceof RegExpWrapper)
          ? pattern.source
          : pattern, patternIsRegExp && flagsAreUndefined ? getFlags.call(pattern) : flags)
      , thisIsRegExp ? this : RegExpPrototype, RegExpWrapper);
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;
  while (keys.length > index) proxy(keys[index++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var classof = __webpack_require__(10);
var wellKnownSymbol = __webpack_require__(2);

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(19);
var definePropertyModule = __webpack_require__(11);
var wellKnownSymbol = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(9);

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

module.exports = global.Promise;


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var fails = __webpack_require__(3);
var classof = __webpack_require__(10);
var bind = __webpack_require__(48);
var html = __webpack_require__(67);
var createElement = __webpack_require__(38);

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
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
  global.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
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
  if (classof(process) == 'process') {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
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

module.exports = {
  set: set,
  clear: clear
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(19);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var isObject = __webpack_require__(5);
var newPromiseCapability = __webpack_require__(81);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(23);

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(83);
__webpack_require__(84);
__webpack_require__(85);
__webpack_require__(86);
__webpack_require__(87);
__webpack_require__(95);
__webpack_require__(96);
__webpack_require__(100);
__webpack_require__(101);
__webpack_require__(102);
__webpack_require__(105);
__webpack_require__(108);
__webpack_require__(109);
__webpack_require__(112);
__webpack_require__(113);
__webpack_require__(116);
__webpack_require__(117);
__webpack_require__(118);
__webpack_require__(119);
__webpack_require__(121);
__webpack_require__(122);
__webpack_require__(123);
__webpack_require__(124);
__webpack_require__(125);
__webpack_require__(128);
__webpack_require__(130);
__webpack_require__(131);
__webpack_require__(132);
__webpack_require__(136);
__webpack_require__(141);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
module.exports = __webpack_require__(195);


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by extract-css-chunks-webpack-plugin

/***/ }),
/* 84 */
/***/ (function(module, exports) {

angular.module('lumx.utils.depth', []);
angular.module('lumx.utils.enter-keypress', []);
angular.module('lumx.utils.event-scheduler', []);
angular.module('lumx.utils.focus-on-init', []);
angular.module('lumx.utils.focus-trap', []);
angular.module('lumx.utils.stop-propagation', []);
angular.module('lumx.utils.transclude-replace', []);
angular.module('lumx.utils.utils', []);
angular.module('lumx.utils', ['lumx.utils.depth', 'lumx.utils.enter-keypress', 'lumx.utils.event-scheduler', 'lumx.utils.focus-on-init', 'lumx.utils.focus-trap', 'lumx.utils.stop-propagation', 'lumx.utils.transclude-replace', 'lumx.utils.utils']);
angular.module('lumx.button', []);
angular.module('lumx.checkbox', []);
angular.module('lumx.data-table', []);
angular.module('lumx.date-picker', []);
angular.module('lumx.dialog', ['lumx.utils.event-scheduler']);
angular.module('lumx.dropdown', ['lumx.utils.event-scheduler']);
angular.module('lumx.fab', []);
angular.module('lumx.file-input', []);
angular.module('lumx.icon', []);
angular.module('lumx.notification', ['lumx.utils.event-scheduler']);
angular.module('lumx.progress', []);
angular.module('lumx.radio-button', []);
angular.module('lumx.ripple', []);
angular.module('lumx.search-filter', []);
angular.module('lumx.select', []);
angular.module('lumx.stepper', []);
angular.module('lumx.switch', []);
angular.module('lumx.tabs', []);
angular.module('lumx.text-field', []);
angular.module('lumx.tooltip', []);
angular.module('lumx', ['lumx.button', 'lumx.checkbox', 'lumx.data-table', 'lumx.date-picker', 'lumx.dialog', 'lumx.dropdown', 'lumx.fab', 'lumx.file-input', 'lumx.icon', 'lumx.notification', 'lumx.progress', 'lumx.radio-button', 'lumx.ripple', 'lumx.search-filter', 'lumx.select', 'lumx.stepper', 'lumx.switch', 'lumx.tabs', 'lumx.text-field', 'lumx.tooltip', 'lumx.utils']);

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DepthService", function() { return DepthService; });
function DepthService() {
  'ngInject';

  var service = this;
  var _depth = 1000;

  function get() {
    return _depth;
  }

  function increase() {
    _depth++;
  }

  service.get = get;
  service.increase = increase;
  service.getDepth = get;
  service.register = increase;
}

angular.module('lumx.utils.depth').service('LxDepthService', DepthService);


/***/ }),
/* 86 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EnterKeypressDirective", function() { return EnterKeypressDirective; });
/* harmony import */ var _lumx_core_js_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);


function EnterKeypressDirective() {
  'ngInject';

  function link(scope, el, attrs) {
    el.on('keydown keypress', function (evt) {
      if (evt.which === _lumx_core_js_constants__WEBPACK_IMPORTED_MODULE_0__[/* ENTER_KEY_CODE */ "a"]) {
        scope.$apply(function evalExpression() {
          scope.$eval(attrs.lxEnterKeypress, {
            $event: evt
          });
        });
        evt.preventDefault();
      }
    });
  }

  return {
    link: link
  };
}

angular.module('lumx.utils.enter-keypress').directive('lxEnterKeypress', EnterKeypressDirective);


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventSchedulerService", function() { return EventSchedulerService; });
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_1__);


EventSchedulerService.$inject = ["$document", "LxUtilsService"];

function EventSchedulerService($document, LxUtilsService) {
  'ngInject';

  var service = this;
  var _handlers = {};
  var _schedule = {};

  function _handle(evt) {
    var scheduler = _schedule[evt.type];

    if (angular.isDefined(scheduler)) {
      for (var i = 0, len = scheduler.length; i < len; i++) {
        var handler = scheduler[i];

        if (angular.isDefined(handler) && angular.isDefined(handler.cb) && angular.isFunction(handler.cb)) {
          handler.cb(evt);

          if (evt.isPropagationStopped()) {
            break;
          }
        }
      }
    }
  }

  function register(eventName, cb) {
    var handler = {
      cb: cb,
      eventName: eventName
    };
    var id = LxUtilsService.generateUUID();
    _handlers[id] = handler;

    if (angular.isUndefined(_schedule[eventName])) {
      _schedule[eventName] = [];
      $document.on(eventName, _handle);
    }

    _schedule[eventName].unshift(_handlers[id]);

    return id;
  }

  function unregister(id) {
    var found = false;
    var handler = _handlers[id];

    if (angular.isDefined(handler) && angular.isDefined(_schedule[handler.eventName])) {
      var index = _schedule[handler.eventName].indexOf(handler);

      if (angular.isDefined(index) && index > -1) {
        _schedule[handler.eventName].splice(index, 1);

        delete _handlers[id];
        found = true;
      }

      if (_schedule[handler.eventName].length === 0) {
        delete _schedule[handler.eventName];
        $document.off(handler.eventName, _handle);
      }
    }

    return found;
  }

  service.register = register;
  service.unregister = unregister;
}

angular.module('lumx.utils.event-scheduler').service('LxEventSchedulerService', EventSchedulerService);


/***/ }),
/* 88 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var nativeFunctionToString = __webpack_require__(58);

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(14);
var ownKeys = __webpack_require__(92);
var getOwnPropertyDescriptorModule = __webpack_require__(34);
var definePropertyModule = __webpack_require__(11);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(19);
var getOwnPropertyNamesModule = __webpack_require__(63);
var getOwnPropertySymbolsModule = __webpack_require__(93);
var anObject = __webpack_require__(4);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),
/* 93 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FocusOnInitDirective", function() { return FocusOnInitDirective; });
FocusOnInitDirective.$inject = ["$timeout"];

function FocusOnInitDirective($timeout) {
  'ngInject';

  function link(scope, el, attrs) {
    if (angular.isDefined(attrs.lxFocusOnInit) && attrs.lxFocusOnInit && !scope.$eval(attrs.lxFocusOnInit)) {
      return;
    }

    $timeout(function () {
      el.focus();
    });
  }

  return {
    link: link
  };
}

angular.module('lumx.utils.focus-on-init').directive('lxFocusOnInit', FocusOnInitDirective);


/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FocusTrapService", function() { return FocusTrapService; });
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumx_core_js_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);



function FocusTrapService() {
  'ngInject';

  var service = this;

  var _activeElement;

  function _onKeyPress(evt) {
    if (evt.keyCode !== _lumx_core_js_constants__WEBPACK_IMPORTED_MODULE_1__[/* TAB_KEY_CODE */ "b"]) {
      return;
    }

    var focusableEls = _activeElement.find('a[href]:not([tabindex="-1"]), button:not([tabindex="-1"]), textarea:not([tabindex="-1"]), input[type="text"]:not([tabindex="-1"]), input[type="radio"]:not([tabindex="-1"]), input[type="checkbox"]:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])');

    var firstFocusableEl = focusableEls[0];
    var lastFocusableEl = focusableEls[focusableEls.length - 1];

    if (evt.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        evt.preventDefault();
      }
    } else if (document.activeElement === lastFocusableEl) {
      firstFocusableEl.focus();
      evt.preventDefault();
    }
  }

  function activate(el) {
    _activeElement = el;

    _activeElement.on('keydown keypress', _onKeyPress);
  }

  function disable() {
    _activeElement.off('keydown keypress', _onKeyPress);

    _activeElement = undefined;
  }

  service.activate = activate;
  service.disable = disable;
}

angular.module('lumx.utils.focus-trap').service('LxFocusTrapService', FocusTrapService);


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(2);
var create = __webpack_require__(98);
var hide = __webpack_require__(13);

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  hide(ArrayPrototype, UNSCOPABLES, create(null));
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var defineProperties = __webpack_require__(99);
var enumBugKeys = __webpack_require__(43);
var hiddenKeys = __webpack_require__(41);
var html = __webpack_require__(67);
var documentCreateElement = __webpack_require__(38);
var sharedKey = __webpack_require__(60);
var IE_PROTO = sharedKey('IE_PROTO');

var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

hiddenKeys[IE_PROTO] = true;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9);
var definePropertyModule = __webpack_require__(11);
var anObject = __webpack_require__(4);
var objectKeys = __webpack_require__(66);

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StopPropagationDirective", function() { return StopPropagationDirective; });
function StopPropagationDirective() {
  'ngInject';

  function link(scope, el, attrs) {
    el.on(attrs.lxStopPropagation, function (evt) {
      evt.stopPropagation();
    });
  }

  return {
    link: link
  };
}

angular.module('lumx.utils.stop-propagation').directive('lxStopPropagation', StopPropagationDirective);


/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranscludeReplaceDirective", function() { return TranscludeReplaceDirective; });
function TranscludeReplaceDirective() {
  'ngInject';

  function link(scope, el, attrs, ctrl, transclude) {
    if (!transclude) {
      return;
    }

    transclude(function (clone) {
      if (clone.length > 0) {
        el.replaceWith(clone);
      } else {
        el.remove();
      }
    });
  }

  return {
    link: link,
    restrict: 'EA',
    terminal: true
  };
}

angular.module('lumx.utils.transclude-replace').directive('ngTranscludeReplace', TranscludeReplaceDirective);


/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilsService", function() { return UtilsService; });
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(68);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(69);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(50);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(29);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_4__);





UtilsService.$inject = ["$rootScope"];

function UtilsService($rootScope) {
  'ngInject';

  var service = this;

  function debounce(func, wait, immediate) {
    var _this = this,
        _arguments = arguments;

    var timeout;
    return function () {
      var context = _this;
      var args = _arguments;

      var later = function later() {
        timeout = null;

        if (!immediate) {
          func.apply(context, args);
        }
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  function disableBodyScroll() {
    $rootScope.$broadcast('lx-scroll__disable');
  }

  function escapeRegexp(strToEscape) {
    return strToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
  }

  function generateUUID() {
    var time = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
      var random = (time + Math.random() * 16) % 16 | 0;
      time = Math.floor(time / 16);
      return (char === 'x' ? random : random & 0x3 | 0x8).toString(16);
    });
  }

  function restoreBodyScroll() {
    $rootScope.$broadcast('lx-scroll__restore');
  }

  service.debounce = debounce;
  service.disableBodyScroll = disableBodyScroll;
  service.escapeRegexp = escapeRegexp;
  service.generateUUID = generateUUID;
  service.restoreBodyScroll = restoreBodyScroll;
}

angular.module('lumx.utils.utils').service('LxUtilsService', UtilsService);


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var classof = __webpack_require__(70);
var wellKnownSymbol = __webpack_require__(2);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = String(test) !== '[object z]' ? function toString() {
  return '[object ' + classof(this) + ']';
} : test.toString;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(20);
var requireObjectCoercible = __webpack_require__(12);

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
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

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(106);
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(107);
/* harmony import */ var core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_match__WEBPACK_IMPORTED_MODULE_2__);




(function () {
  'use strict';

  angular.module('lumx.button').directive('lxButton', lxButton);

  function lxButton() {
    return {
      restrict: 'E',
      templateUrl: getTemplateUrl,
      link: link,
      replace: true,
      transclude: true
    };

    function link(scope, element, attrs) {
      setButtonStyle(element, attrs.lxSize, attrs.lxColor, attrs.lxType);
      attrs.$observe('lxSize', function (lxSize) {
        setButtonStyle(element, lxSize, attrs.lxColor, attrs.lxType);
      });
      attrs.$observe('lxColor', function (lxColor) {
        setButtonStyle(element, attrs.lxSize, lxColor, attrs.lxType);
      });
      attrs.$observe('lxType', function (lxType) {
        setButtonStyle(element, attrs.lxSize, attrs.lxColor, lxType);
      });
      element.on('click', function (event) {
        if (attrs.disabled === true) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      });
    }

    function getTemplateUrl(element, attrs) {
      return isAnchor(attrs) ? 'link.html' : 'button.html';
    }

    function isAnchor(attrs) {
      return angular.isDefined(attrs.href) || angular.isDefined(attrs.ngHref) || angular.isDefined(attrs.ngLink) || angular.isDefined(attrs.uiSref);
    }

    function setButtonStyle(element, size, color, type) {
      element.removeClass('btn');
      element.removeClass(function (index, className) {
        return (className.match(/(^|\s)btn--\S+/g) || []).join(' ');
      });
      var buttonSize = angular.isDefined(size) ? 'btn--' + size : 'btn--m';
      var buttonColor = angular.isDefined(color) ? 'btn--' + color : 'btn--primary';
      var buttonType = angular.isDefined(type) ? 'btn--' + type : 'btn--raised';
      element.addClass('btn');
      element.addClass(buttonSize);
      element.addClass(buttonColor);
      element.addClass(buttonType);
    }
  }
})();

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var IndexedObject = __webpack_require__(36);
var toIndexedObject = __webpack_require__(18);
var sloppyArrayMethod = __webpack_require__(21);

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var SLOPPY_METHOD = sloppyArrayMethod('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || SLOPPY_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(51);
var anObject = __webpack_require__(4);
var toLength = __webpack_require__(8);
var requireObjectCoercible = __webpack_require__(12);
var advanceStringIndex = __webpack_require__(52);
var regExpExec = __webpack_require__(53);

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),
/* 108 */
/***/ (function(module, exports) {

(function () {
  'use strict';

  angular.module('lumx.checkbox').directive('lxCheckbox', lxCheckbox).directive('lxCheckboxLabel', lxCheckboxLabel).directive('lxCheckboxHelp', lxCheckboxHelp);

  function lxCheckbox() {
    return {
      restrict: 'E',
      templateUrl: 'checkbox.html',
      scope: {
        lxColor: '@?',
        name: '@?',
        ngChange: '&?',
        ngDisabled: '=?',
        ngFalseValue: '@?',
        ngModel: '=',
        ngTrueValue: '@?',
        lxTheme: '@?'
      },
      controller: LxCheckboxController,
      controllerAs: 'lxCheckbox',
      bindToController: true,
      transclude: true,
      replace: true
    };
  }

  LxCheckboxController.$inject = ['$scope', '$timeout', 'LxUtilsService'];

  function LxCheckboxController($scope, $timeout, LxUtilsService) {
    var lxCheckbox = this;
    var checkboxId;
    var checkboxHasChildren;
    var timer;
    lxCheckbox.getCheckboxId = getCheckboxId;
    lxCheckbox.getCheckboxHasChildren = getCheckboxHasChildren;
    lxCheckbox.setCheckboxId = setCheckboxId;
    lxCheckbox.setCheckboxHasChildren = setCheckboxHasChildren;
    lxCheckbox.triggerNgChange = triggerNgChange;
    $scope.$on('$destroy', function () {
      $timeout.cancel(timer);
    });
    init();

    function getCheckboxId() {
      return checkboxId;
    }

    function getCheckboxHasChildren() {
      return checkboxHasChildren;
    }

    function init() {
      setCheckboxId(LxUtilsService.generateUUID());
      setCheckboxHasChildren(false);
      lxCheckbox.ngTrueValue = angular.isUndefined(lxCheckbox.ngTrueValue) ? true : lxCheckbox.ngTrueValue;
      lxCheckbox.ngFalseValue = angular.isUndefined(lxCheckbox.ngFalseValue) ? false : lxCheckbox.ngFalseValue;
      lxCheckbox.lxColor = angular.isUndefined(lxCheckbox.lxColor) ? 'accent' : lxCheckbox.lxColor;
    }

    function setCheckboxId(_checkboxId) {
      checkboxId = _checkboxId;
    }

    function setCheckboxHasChildren(_checkboxHasChildren) {
      checkboxHasChildren = _checkboxHasChildren;
    }

    function triggerNgChange() {
      timer = $timeout(lxCheckbox.ngChange);
    }
  }

  function lxCheckboxLabel() {
    return {
      restrict: 'AE',
      require: ['^lxCheckbox', '^lxCheckboxLabel'],
      templateUrl: 'checkbox-label.html',
      link: link,
      controller: LxCheckboxLabelController,
      controllerAs: 'lxCheckboxLabel',
      bindToController: true,
      transclude: true,
      replace: true
    };

    function link(scope, element, attrs, ctrls) {
      ctrls[0].setCheckboxHasChildren(true);
      ctrls[1].setCheckboxId(ctrls[0].getCheckboxId());
    }
  }

  function LxCheckboxLabelController() {
    var lxCheckboxLabel = this;
    var checkboxId;
    lxCheckboxLabel.getCheckboxId = getCheckboxId;
    lxCheckboxLabel.setCheckboxId = setCheckboxId;

    function getCheckboxId() {
      return checkboxId;
    }

    function setCheckboxId(_checkboxId) {
      checkboxId = _checkboxId;
    }
  }

  function lxCheckboxHelp() {
    return {
      restrict: 'AE',
      require: '^lxCheckbox',
      templateUrl: 'checkbox-help.html',
      transclude: true,
      replace: true
    };
  }
})();

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(110);
/* harmony import */ var core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_sort__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(111);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_3__);





(function () {
  'use strict';

  angular.module('lumx.data-table').directive('lxDataTable', lxDataTable);

  function lxDataTable() {
    return {
      restrict: 'E',
      templateUrl: 'data-table.html',
      scope: {
        activable: '=?lxActivable',
        border: '=?lxBorder',
        bulk: '=?lxBulk',
        selectable: '=?lxSelectable',
        thumbnail: '=?lxThumbnail',
        tbody: '=lxTbody',
        thead: '=lxThead'
      },
      link: link,
      controller: LxDataTableController,
      controllerAs: 'lxDataTable',
      bindToController: true,
      transclude: true,
      replace: true
    };

    function link(scope, element, attrs, ctrl) {
      attrs.$observe('id', function (_newId) {
        ctrl.id = _newId;
      });
    }
  }

  LxDataTableController.$inject = ['$rootScope', '$sce', '$scope'];

  function LxDataTableController($rootScope, $sce, $scope) {
    var lxDataTable = this;
    lxDataTable.areAllRowsSelected = areAllRowsSelected;
    lxDataTable.border = angular.isUndefined(lxDataTable.border) ? true : lxDataTable.border;
    lxDataTable.bulk = angular.isUndefined(lxDataTable.bulk) ? true : lxDataTable.bulk;
    lxDataTable.sort = sort;
    lxDataTable.toggleActivation = toggleActivation;
    lxDataTable.toggleAllSelected = toggleAllSelected;
    lxDataTable.toggleSelection = toggleSelection;
    lxDataTable.$sce = $sce;
    lxDataTable.allRowsSelected = false;
    lxDataTable.selectedRows = [];
    $scope.$on('lx-data-table__select', function (event, id, row) {
      if (id === lxDataTable.id && angular.isDefined(row)) {
        _select(angular.isArray(row) && row.length > 0 ? row[0] : row);
      }
    });
    $scope.$on('lx-data-table__select-all', function (event, id) {
      if (id === lxDataTable.id) {
        _selectAll();
      }
    });
    $scope.$on('lx-data-table__unselect', function (event, id, row) {
      if (id === lxDataTable.id && angular.isDefined(row)) {
        _unselect(angular.isArray(row) && row.length > 0 ? row[0] : row);
      }
    });
    $scope.$on('lx-data-table__unselect-all', function (event, id) {
      if (id === lxDataTable.id) {
        _unselectAll();
      }
    });
    $scope.$on('lx-data-table__activate', function (event, id, row) {
      if (id === lxDataTable.id && angular.isDefined(row)) {
        _activate(angular.isArray(row) && row.length > 0 ? row[0] : row);
      }
    });
    $scope.$on('lx-data-table__deactivate', function (event, id, row) {
      if (id === lxDataTable.id && angular.isDefined(row)) {
        _deactivate(angular.isArray(row) && row.length > 0 ? row[0] : row);
      }
    });

    function _activate(row) {
      toggleActivation(row, true);
    }

    function _deactivate(row) {
      toggleActivation(row, false);
    }

    function _select(row) {
      toggleSelection(row, true);
    }

    function _selectAll() {
      lxDataTable.selectedRows.length = 0;

      for (var i = 0, len = lxDataTable.tbody.length; i < len; i++) {
        if (!lxDataTable.tbody[i].lxDataTableDisabled) {
          lxDataTable.tbody[i].lxDataTableSelected = true;
          lxDataTable.selectedRows.push(lxDataTable.tbody[i]);
        }
      }

      lxDataTable.allRowsSelected = true;
      $rootScope.$broadcast('lx-data-table__unselected', lxDataTable.id, lxDataTable.selectedRows);
    }

    function _unselect(row) {
      toggleSelection(row, false);
    }

    function _unselectAll() {
      for (var i = 0, len = lxDataTable.tbody.length; i < len; i++) {
        if (!lxDataTable.tbody[i].lxDataTableDisabled) {
          lxDataTable.tbody[i].lxDataTableSelected = false;
        }
      }

      lxDataTable.allRowsSelected = false;
      lxDataTable.selectedRows.length = 0;
      $rootScope.$broadcast('lx-data-table__selected', lxDataTable.id, lxDataTable.selectedRows);
    }

    function areAllRowsSelected() {
      var displayedRows = 0;

      for (var i = 0, len = lxDataTable.tbody.length; i < len; i++) {
        if (!lxDataTable.tbody[i].lxDataTableDisabled) {
          displayedRows++;
        }
      }

      if (displayedRows === lxDataTable.selectedRows.length) {
        lxDataTable.allRowsSelected = true;
      } else {
        lxDataTable.allRowsSelected = false;
      }
    }

    function sort(_column) {
      if (!_column.sortable) {
        return;
      }

      for (var i = 0, len = lxDataTable.thead.length; i < len; i++) {
        if (lxDataTable.thead[i].sortable && lxDataTable.thead[i].name !== _column.name) {
          lxDataTable.thead[i].sort = undefined;
        }
      }

      if (!_column.sort || _column.sort === 'desc') {
        _column.sort = 'asc';
      } else {
        _column.sort = 'desc';
      }

      $rootScope.$broadcast('lx-data-table__sorted', lxDataTable.id, _column);
    }

    function toggleActivation(_row, _newActivatedStatus) {
      if (_row.lxDataTableDisabled || !lxDataTable.activable) {
        return;
      }

      for (var i = 0, len = lxDataTable.tbody.length; i < len; i++) {
        if (lxDataTable.tbody.indexOf(_row) !== i) {
          lxDataTable.tbody[i].lxDataTableActivated = false;
        }
      }

      _row.lxDataTableActivated = !_row.lxDataTableActivated;

      if (_row.lxDataTableActivated) {
        $rootScope.$broadcast('lx-data-table__activated', lxDataTable.id, _row);
      } else {
        $rootScope.$broadcast('lx-data-table__deactivated', lxDataTable.id, _row);
      }
    }

    function toggleAllSelected() {
      if (!lxDataTable.bulk) {
        return;
      }

      if (lxDataTable.allRowsSelected) {
        _unselectAll();
      } else {
        _selectAll();
      }
    }

    function toggleSelection(_row, _newSelectedStatus, _event) {
      if (_row.lxDataTableDisabled || !lxDataTable.selectable) {
        return;
      }

      if (angular.isDefined(_event)) {
        _event.stopPropagation();
      }

      _row.lxDataTableSelected = angular.isDefined(_newSelectedStatus) ? _newSelectedStatus : !_row.lxDataTableSelected;

      if (_row.lxDataTableSelected) {
        if (lxDataTable.selectedRows.length === 0 || lxDataTable.selectedRows.length && lxDataTable.selectedRows.indexOf(_row) === -1) {
          lxDataTable.selectedRows.push(_row);
          lxDataTable.areAllRowsSelected();
          $rootScope.$broadcast('lx-data-table__selected', lxDataTable.id, lxDataTable.selectedRows, _row);
        }
      } else {
        if (lxDataTable.selectedRows.length && lxDataTable.selectedRows.indexOf(_row) > -1) {
          lxDataTable.selectedRows.splice(lxDataTable.selectedRows.indexOf(_row), 1);
          lxDataTable.allRowsSelected = false;
          $rootScope.$broadcast('lx-data-table__unselected', lxDataTable.id, lxDataTable.selectedRows, _row);
        }
      }
    }
  }
})();

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var aFunction = __webpack_require__(23);
var toObject = __webpack_require__(15);
var fails = __webpack_require__(3);
var sloppyArrayMethod = __webpack_require__(21);

var nativeSort = [].sort;
var test = [1, 2, 3];

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var SLOPPY_METHOD = sloppyArrayMethod('sort');

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD;

// `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort
$({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? nativeSort.call(toObject(this))
      : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9);
var defineProperty = __webpack_require__(11).f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),
/* 112 */
/***/ (function(module, exports) {

(function () {
  'use strict';

  angular.module('lumx.data-table').service('LxDataTableService', LxDataTableService);
  LxDataTableService.$inject = ['$rootScope'];

  function LxDataTableService($rootScope) {
    var service = this;
    service.select = select;
    service.selectAll = selectAll;
    service.unselect = unselect;
    service.unselectAll = unselectAll;
    service.activate = activate;
    service.deactivate = deactivate;

    function select(_dataTableId, row) {
      $rootScope.$broadcast('lx-data-table__select', _dataTableId, row);
    }

    function selectAll(_dataTableId) {
      $rootScope.$broadcast('lx-data-table__select-all', _dataTableId);
    }

    function unselect(_dataTableId, row) {
      $rootScope.$broadcast('lx-data-table__unselect', _dataTableId, row);
    }

    function unselectAll(_dataTableId) {
      $rootScope.$broadcast('lx-data-table__unselect-all', _dataTableId);
    }

    function activate(_dataTableId, row) {
      $rootScope.$broadcast('lx-data-table__activate', _dataTableId, row);
    }

    function deactivate(_dataTableId, row) {
      $rootScope.$broadcast('lx-data-table__deactivate', _dataTableId, row);
    }
  }
})();

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68);
/* harmony import */ var core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_date_to_string__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(29);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_trim__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(114);
/* harmony import */ var core_js_modules_es_string_trim__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim__WEBPACK_IMPORTED_MODULE_5__);







(function () {
  'use strict';

  angular.module('lumx.date-picker').directive('lxDatePicker', lxDatePicker);
  lxDatePicker.$inject = ['LxDatePickerService', 'LxUtilsService'];

  function lxDatePicker(LxDatePickerService, LxUtilsService) {
    return {
      restrict: 'AE',
      templateUrl: 'date-picker.html',
      scope: {
        autoClose: '=?lxAutoClose',
        callback: '&?lxCallback',
        color: '@?lxColor',
        escapeClose: '=?lxEscapeClose',
        inputFormat: '@?lxInputFormat',
        maxDate: '=?lxMaxDate',
        ngModel: '=',
        minDate: '=?lxMinDate',
        locale: '@lxLocale'
      },
      link: link,
      controller: LxDatePickerController,
      controllerAs: 'lxDatePicker',
      bindToController: true,
      replace: true,
      transclude: true
    };

    function link(scope, element, attrs) {
      if (angular.isDefined(attrs.id)) {
        attrs.$observe('id', function (_newId) {
          scope.lxDatePicker.pickerId = _newId;
          LxDatePickerService.registerScope(scope.lxDatePicker.pickerId, scope);
        });
      } else {
        scope.lxDatePicker.pickerId = LxUtilsService.generateUUID();
        LxDatePickerService.registerScope(scope.lxDatePicker.pickerId, scope);
      }
    }
  }

  LxDatePickerController.$inject = ['$element', '$scope', '$timeout', '$transclude', 'LxDatePickerService', 'LxUtilsService'];

  function LxDatePickerController($element, $scope, $timeout, $transclude, LxDatePickerService, LxUtilsService) {
    var lxDatePicker = this;
    var input;
    var modelController;
    var timer1;
    var timer2;
    var watcher1;
    var watcher2;
    lxDatePicker.closeDatePicker = closeDatePicker;
    lxDatePicker.displayYearSelection = displayYearSelection;
    lxDatePicker.hideYearSelection = hideYearSelection;
    lxDatePicker.getDateFormatted = getDateFormatted;
    lxDatePicker.nextMonth = nextMonth;
    lxDatePicker.openDatePicker = openDatePicker;
    lxDatePicker.previousMonth = previousMonth;
    lxDatePicker.select = select;
    lxDatePicker.selectYear = selectYear;
    lxDatePicker.autoClose = angular.isDefined(lxDatePicker.autoClose) ? lxDatePicker.autoClose : true;
    lxDatePicker.color = angular.isDefined(lxDatePicker.color) ? lxDatePicker.color : 'primary';
    lxDatePicker.element = $element.find('.lx-date-picker');
    lxDatePicker.escapeClose = angular.isDefined(lxDatePicker.escapeClose) ? lxDatePicker.escapeClose : true;
    lxDatePicker.isOpen = false;
    lxDatePicker.moment = moment;
    lxDatePicker.yearSelection = false;
    lxDatePicker.uuid = LxUtilsService.generateUUID();
    $transclude(function (clone) {
      if (clone.length) {
        lxDatePicker.hasInput = true;
        timer1 = $timeout(function () {
          input = $element.find('.lx-date-input input');
          modelController = input.data('$ngModelController');
          watcher2 = $scope.$watch(function () {
            return modelController.$viewValue;
          }, function (newValue, oldValue) {
            if (angular.isUndefined(newValue)) {
              lxDatePicker.ngModel = undefined;
            }
          });
        });
      }
    });
    watcher1 = $scope.$watch(function () {
      return lxDatePicker.ngModel;
    }, init);
    $scope.$on('$destroy', function () {
      $timeout.cancel(timer1);
      $timeout.cancel(timer2);

      if (angular.isFunction(watcher1)) {
        watcher1();
      }

      if (angular.isFunction(watcher2)) {
        watcher2();
      }
    });

    function closeDatePicker() {
      LxDatePickerService.close(lxDatePicker.pickerId);
    }

    function displayYearSelection() {
      lxDatePicker.yearSelection = true;
      timer2 = $timeout(function () {
        var yearSelector = angular.element('.lx-date-picker__year-selector');
        var activeYear = yearSelector.find('.lx-date-picker__year--is-active');
        yearSelector.scrollTop(yearSelector.scrollTop() + activeYear.position().top - yearSelector.height() / 2 + activeYear.height() / 2);
      });
    }

    function hideYearSelection() {
      lxDatePicker.yearSelection = false;
    }

    function generateCalendar() {
      lxDatePicker.days = [];
      var previousDay = angular.copy(lxDatePicker.ngModelMoment).date(0);
      var firstDayOfMonth = angular.copy(lxDatePicker.ngModelMoment).date(1);
      var lastDayOfMonth = firstDayOfMonth.clone().endOf('month');
      var maxDays = lastDayOfMonth.date();
      lxDatePicker.emptyFirstDays = [];

      for (var i = firstDayOfMonth.day() === 0 ? 6 : firstDayOfMonth.day() - 1; i > 0; i--) {
        lxDatePicker.emptyFirstDays.push({});
      }

      for (var j = 0; j < maxDays; j++) {
        var date = angular.copy(previousDay.add(1, 'days'));
        date.selected = angular.isDefined(lxDatePicker.ngModel) && date.isSame(lxDatePicker.ngModel, 'day');
        date.today = date.isSame(moment(), 'day');

        if (angular.isDefined(lxDatePicker.minDate)) {
          var minDate = angular.isString(lxDatePicker.minDate) ? new Date(lxDatePicker.minDate) : lxDatePicker.minDate;

          if (date.toDate() < minDate) {
            date.disabled = true;
          }
        }

        if (angular.isDefined(lxDatePicker.maxDate)) {
          var maxDate = angular.isString(lxDatePicker.maxDate) ? new Date(lxDatePicker.maxDate) : lxDatePicker.maxDate;

          if (date.toDate() > maxDate) {
            date.disabled = true;
          }
        }

        lxDatePicker.days.push(date);
      }

      lxDatePicker.emptyLastDays = [];

      for (var k = 7 - (lastDayOfMonth.day() === 0 ? 7 : lastDayOfMonth.day()); k > 0; k--) {
        lxDatePicker.emptyLastDays.push({});
      }
    }

    function getDateFormatted() {
      var dateFormatted = lxDatePicker.ngModelMoment.format('llll').replace(lxDatePicker.ngModelMoment.format('LT'), '').trim().replace(lxDatePicker.ngModelMoment.format('YYYY'), '').trim();
      var dateFormattedLastChar = dateFormatted.slice(-1);

      if (dateFormattedLastChar === ',') {
        dateFormatted = dateFormatted.slice(0, -1);
      }

      return dateFormatted;
    }

    function init() {
      moment.locale(lxDatePicker.locale);
      lxDatePicker.ngModelMoment = angular.isDefined(lxDatePicker.ngModel) ? moment(angular.copy(lxDatePicker.ngModel)) : moment();
      lxDatePicker.days = [];
      lxDatePicker.daysOfWeek = [moment.weekdaysMin(1), moment.weekdaysMin(2), moment.weekdaysMin(3), moment.weekdaysMin(4), moment.weekdaysMin(5), moment.weekdaysMin(6), moment.weekdaysMin(0)];
      lxDatePicker.years = [];

      for (var y = moment().year() - 100; y <= moment().year() + 100; y++) {
        lxDatePicker.years.push(y);
      }

      generateCalendar();
    }

    function nextMonth() {
      lxDatePicker.ngModelMoment = lxDatePicker.ngModelMoment.add(1, 'month');
      generateCalendar();
    }

    function openDatePicker() {
      LxDatePickerService.open(lxDatePicker.pickerId);
      generateCalendar();
    }

    function previousMonth() {
      lxDatePicker.ngModelMoment = lxDatePicker.ngModelMoment.subtract(1, 'month');
      generateCalendar();
    }

    function select(_day) {
      if (!_day.disabled) {
        lxDatePicker.ngModel = _day.toDate();
        lxDatePicker.ngModelMoment = angular.copy(_day);

        if (angular.isDefined(lxDatePicker.callback)) {
          lxDatePicker.callback({
            newDate: lxDatePicker.ngModel
          });
        }

        if (angular.isDefined(modelController) && lxDatePicker.inputFormat) {
          modelController.$setViewValue(angular.copy(_day).format(lxDatePicker.inputFormat));
          modelController.$render();
        }

        generateCalendar();
      }
    }

    function selectYear(_year) {
      lxDatePicker.yearSelection = false;
      lxDatePicker.ngModelMoment = lxDatePicker.ngModelMoment.year(_year);
      generateCalendar();
    }
  }
})();

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var $trim = __webpack_require__(55).trim;
var forcedStringTrimMethod = __webpack_require__(115);

// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);
var whitespaces = __webpack_require__(30);

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),
/* 116 */
/***/ (function(module, exports) {

(function () {
  'use strict';

  angular.module('lumx.date-picker').service('LxDatePickerService', LxDatePickerService);
  LxDatePickerService.$inject = ['$rootScope', '$timeout', 'LxDepthService', 'LxEventSchedulerService'];

  function LxDatePickerService($rootScope, $timeout, LxDepthService, LxEventSchedulerService) {
    var service = this;
    var activeDatePickerId;
    var datePickerFilter;
    var idEventScheduler;
    var scopeMap = {};
    service.close = closeDatePicker;
    service.open = openDatePicker;
    service.registerScope = registerScope;

    function closeDatePicker(_datePickerId) {
      if (angular.isDefined(idEventScheduler)) {
        LxEventSchedulerService.unregister(idEventScheduler);
        idEventScheduler = undefined;
      }

      activeDatePickerId = undefined;
      $rootScope.$broadcast('lx-date-picker__close-start', _datePickerId);
      datePickerFilter.removeClass('lx-date-picker-filter--is-shown');

      scopeMap[_datePickerId].element.removeClass('lx-date-picker--is-shown');

      $timeout(function () {
        angular.element('body').removeClass('no-scroll-date-picker-' + scopeMap[_datePickerId].uuid);
        datePickerFilter.remove();

        scopeMap[_datePickerId].element.hide().appendTo(scopeMap[_datePickerId].elementParent);

        scopeMap[_datePickerId].isOpen = false;
        $rootScope.$broadcast('lx-date-picker__close-end', _datePickerId);
      }, 600);
    }

    function onKeyUp(_event) {
      if (_event.keyCode == 27 && angular.isDefined(activeDatePickerId)) {
        closeDatePicker(activeDatePickerId);
      }

      _event.stopPropagation();
    }

    function openDatePicker(_datePickerId) {
      LxDepthService.register();
      activeDatePickerId = _datePickerId;
      angular.element('body').addClass('no-scroll-date-picker-' + scopeMap[_datePickerId].uuid);
      datePickerFilter = angular.element('<div/>', {
        class: 'lx-date-picker-filter'
      });
      datePickerFilter.css('z-index', LxDepthService.getDepth()).appendTo('body');

      if (scopeMap[activeDatePickerId].autoClose) {
        datePickerFilter.on('click', function () {
          closeDatePicker(activeDatePickerId);
        });
      }

      if (scopeMap[activeDatePickerId].escapeClose) {
        idEventScheduler = LxEventSchedulerService.register('keyup', onKeyUp);
      }

      scopeMap[activeDatePickerId].element.css('z-index', LxDepthService.getDepth() + 1).appendTo('body').show();
      $timeout(function () {
        $rootScope.$broadcast('lx-date-picker__open-start', activeDatePickerId);
        scopeMap[activeDatePickerId].isOpen = true;
        datePickerFilter.addClass('lx-date-picker-filter--is-shown');
        scopeMap[activeDatePickerId].element.addClass('lx-date-picker--is-shown');
      }, 100);
      $timeout(function () {
        $rootScope.$broadcast('lx-date-picker__open-end', activeDatePickerId);
      }, 700);
    }

    function registerScope(_datePickerId, _datePickerScope) {
      scopeMap[_datePickerId] = _datePickerScope.lxDatePicker;
    }
  }
})();

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);


(function () {
  'use strict';

  angular.module('lumx.dialog').directive('lxDialog', lxDialog).directive('lxDialogHeader', lxDialogHeader).directive('lxDialogContent', lxDialogContent).directive('lxDialogFooter', lxDialogFooter).directive('lxDialogClose', lxDialogClose);

  function lxDialog() {
    return {
      restrict: 'E',
      template: '<div class="dialog" ng-class="{ \'dialog--l\': !lxDialog.size || lxDialog.size === \'l\', \'dialog--s\': lxDialog.size === \'s\', \'dialog--m\': lxDialog.size === \'m\' }"><div ng-if="lxDialog.isOpen" ng-transclude></div></div>',
      scope: {
        autoClose: '=?lxAutoClose',
        escapeClose: '=?lxEscapeClose',
        size: '@?lxSize'
      },
      link: link,
      controller: LxDialogController,
      controllerAs: 'lxDialog',
      bindToController: true,
      replace: true,
      transclude: true
    };

    function link(scope, element, attrs, ctrl) {
      attrs.$observe('id', function (_newId) {
        ctrl.id = _newId;
      });
    }
  }

  LxDialogController.$inject = ['$element', '$interval', '$rootScope', '$scope', '$timeout', '$window', 'LxDepthService', 'LxEventSchedulerService', 'LxUtilsService'];

  function LxDialogController($element, $interval, $rootScope, $scope, $timeout, $window, LxDepthService, LxEventSchedulerService, LxUtilsService) {
    var lxDialog = this;
    var dialogFilter = angular.element('<div/>', {
      class: 'dialog-filter'
    });
    var dialogHeight;
    var dialogInterval;
    var dialogScrollable;
    var elementParent = $element.parent();
    var idEventScheduler;
    var resizeDebounce;
    var windowHeight;
    lxDialog.autoClose = angular.isDefined(lxDialog.autoClose) ? lxDialog.autoClose : true;
    lxDialog.escapeClose = angular.isDefined(lxDialog.escapeClose) ? lxDialog.escapeClose : true;
    lxDialog.isOpen = false;
    lxDialog.uuid = LxUtilsService.generateUUID();
    $scope.$on('lx-dialog__open', function (event, id, params) {
      if (id === lxDialog.id) {
        open(params);
      }
    });
    $scope.$on('lx-dialog__close', function (event, id, canceled, params) {
      if (id === lxDialog.id || id === undefined) {
        close(canceled, params);
      }
    });
    $scope.$on('$destroy', function () {
      close(true);
    });

    function checkDialogHeight() {
      var dialog = $element;
      var dialogHeader = dialog.find('.dialog__header');
      var dialogContent = dialog.find('.dialog__content');
      var dialogFooter = dialog.find('.dialog__footer');

      if (!dialogFooter.length) {
        dialogFooter = dialog.find('.dialog__actions');
      }

      if (angular.isUndefined(dialogHeader)) {
        return;
      }

      var heightToCheck = 60 + dialogHeader.outerHeight() + dialogContent.outerHeight() + dialogFooter.outerHeight();

      if (dialogHeight === heightToCheck && windowHeight === $window.innerHeight) {
        return;
      }

      dialogHeight = heightToCheck;
      windowHeight = $window.innerHeight;

      if (heightToCheck >= $window.innerHeight) {
        dialog.addClass('dialog--is-fixed');
        dialogScrollable.css({
          top: dialogHeader.outerHeight(),
          bottom: dialogFooter.outerHeight()
        }).off('scroll', checkScrollEnd).on('scroll', checkScrollEnd);
      } else {
        dialog.removeClass('dialog--is-fixed');
        dialogScrollable.removeAttr('style').off('scroll', checkScrollEnd);
      }
    }

    function checkDialogHeightOnResize() {
      if (resizeDebounce) {
        $timeout.cancel(resizeDebounce);
      }

      resizeDebounce = $timeout(function () {
        checkDialogHeight();
      }, 200);
    }

    function checkScrollEnd() {
      if (dialogScrollable.scrollTop() + dialogScrollable.innerHeight() >= dialogScrollable[0].scrollHeight) {
        $rootScope.$broadcast('lx-dialog__scroll-end', lxDialog.id);
        dialogScrollable.off('scroll', checkScrollEnd);
        $timeout(function () {
          dialogScrollable.on('scroll', checkScrollEnd);
        }, 500);
      }
    }

    function onKeyUp(_event) {
      if (_event.keyCode == 27) {
        close(true);
      }

      _event.stopPropagation();
    }

    function open(_params) {
      if (lxDialog.isOpen) {
        return;
      }

      LxDepthService.register();
      angular.element('body').addClass('no-scroll-dialog-' + lxDialog.uuid);
      dialogFilter.css('z-index', LxDepthService.getDepth()).appendTo('body');

      if (lxDialog.autoClose) {
        dialogFilter.on('click', function () {
          close(true);
        });
      }

      if (lxDialog.escapeClose) {
        idEventScheduler = LxEventSchedulerService.register('keyup', onKeyUp);
      }

      $element.css('z-index', LxDepthService.getDepth() + 1).appendTo('body').show();
      $timeout(function () {
        $rootScope.$broadcast('lx-dialog__open-start', lxDialog.id, _params);
        lxDialog.isOpen = true;
        dialogFilter.addClass('dialog-filter--is-shown');
        $element.addClass('dialog--is-shown');
      }, 100);
      $timeout(function () {
        if ($element.find('.dialog__scrollable').length === 0) {
          $element.find('.dialog__content').wrap(angular.element('<div/>', {
            class: 'dialog__scrollable'
          }));
        }

        dialogScrollable = $element.find('.dialog__scrollable');
      }, 200);
      $timeout(function () {
        $rootScope.$broadcast('lx-dialog__open-end', lxDialog.id, _params);
      }, 700);
      dialogInterval = $interval(function () {
        checkDialogHeight();
      }, 500);
      angular.element($window).on('resize', checkDialogHeightOnResize);
    }

    function close(_canceled, _params) {
      if (!lxDialog.isOpen) {
        return;
      }

      _params = _params || {};

      if (angular.isDefined(idEventScheduler)) {
        LxEventSchedulerService.unregister(idEventScheduler);
        idEventScheduler = undefined;
      }

      angular.element($window).off('resize', checkDialogHeightOnResize);
      $element.find('.dialog__scrollable').off('scroll', checkScrollEnd);
      $rootScope.$broadcast('lx-dialog__close-start', lxDialog.id, _canceled, _params);

      if (resizeDebounce) {
        $timeout.cancel(resizeDebounce);
      }

      $interval.cancel(dialogInterval);
      dialogFilter.removeClass('dialog-filter--is-shown');
      $element.removeClass('dialog--is-shown');
      $timeout(function () {
        angular.element('body').removeClass('no-scroll-dialog-' + lxDialog.uuid);
        dialogFilter.remove();
        $element.hide().removeClass('dialog--is-fixed').appendTo(elementParent);
        lxDialog.isOpen = false;
        dialogHeight = undefined;
        $rootScope.$broadcast('lx-dialog__close-end', lxDialog.id, _canceled, _params);
      }, 600);
    }
  }

  function lxDialogHeader() {
    return {
      restrict: 'E',
      template: '<div class="dialog__header" ng-transclude></div>',
      replace: true,
      transclude: true
    };
  }

  function lxDialogContent() {
    return {
      restrict: 'E',
      template: '<div class="dialog__scrollable"><div class="dialog__content" ng-transclude></div></div>',
      replace: true,
      transclude: true
    };
  }

  function lxDialogFooter() {
    return {
      restrict: 'E',
      template: '<div class="dialog__footer" ng-transclude></div>',
      replace: true,
      transclude: true
    };
  }

  lxDialogClose.$inject = ['LxDialogService'];

  function lxDialogClose(LxDialogService) {
    return {
      restrict: 'A',
      link: function link(scope, element) {
        element.on('click', function () {
          LxDialogService.close(element.parents('.dialog').attr('id'), true);
        });
        scope.$on('$destroy', function () {
          element.off();
        });
      }
    };
  }
})();

/***/ }),
/* 118 */
/***/ (function(module, exports) {

(function () {
  'use strict';

  angular.module('lumx.dialog').service('LxDialogService', LxDialogService);
  LxDialogService.$inject = ['$rootScope'];

  function LxDialogService($rootScope) {
    var service = this;
    service.open = open;
    service.close = close;

    function open(_dialogId, _params) {
      $rootScope.$broadcast('lx-dialog__open', _dialogId, _params);
    }

    function close(_dialogId, _canceled, _params) {
      $rootScope.$broadcast('lx-dialog__close', _dialogId, _canceled, _params);
    }
  }
})();

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(54);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(32);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_4__);






(function () {
  'use strict';

  angular.module('lumx.dropdown').directive('lxDropdown', lxDropdown).directive('lxDropdownToggle', lxDropdownToggle).directive('lxDropdownMenu', lxDropdownMenu).directive('lxDropdownFilter', lxDropdownFilter);

  function lxDropdown() {
    return {
      restrict: 'E',
      templateUrl: 'dropdown.html',
      scope: {
        closeOnClick: '=?lxCloseOnClick',
        effect: '@?lxEffect',
        escapeClose: '=?lxEscapeClose',
        hover: '=?lxHover',
        hoverDelay: '=?lxHoverDelay',
        minOffset: '=?lxMinOffset',
        offset: '@?lxOffset',
        overToggle: '=?lxOverToggle',
        position: '@?lxPosition',
        width: '@?lxWidth'
      },
      link: link,
      controller: LxDropdownController,
      controllerAs: 'lxDropdown',
      bindToController: true,
      transclude: true
    };

    function link(scope, element, attrs, ctrl) {
      var backwardOneWay = ['position', 'width'];
      var backwardTwoWay = ['escapeClose', 'overToggle'];
      angular.forEach(backwardOneWay, function (attribute) {
        if (angular.isDefined(attrs[attribute])) {
          attrs.$observe(attribute, function (newValue) {
            scope.lxDropdown[attribute] = newValue;
          });
        }
      });
      angular.forEach(backwardTwoWay, function (attribute) {
        if (angular.isDefined(attrs[attribute])) {
          scope.$watch(function () {
            return scope.$parent.$eval(attrs[attribute]);
          }, function (newValue) {
            scope.lxDropdown[attribute] = newValue;
          });
        }
      });
      attrs.$observe('id', function (_newId) {
        ctrl.uuid = _newId;
      });
      scope.$on('$destroy', function () {
        if (ctrl.isOpen) {
          ctrl.closeDropdownMenu();
        }
      });
    }
  }

  LxDropdownController.$inject = ['$document', '$element', '$interval', '$rootScope', '$scope', '$timeout', '$window', 'LxDepthService', 'LxDropdownService', 'LxEventSchedulerService', 'LxUtilsService'];

  function LxDropdownController($document, $element, $interval, $rootScope, $scope, $timeout, $window, LxDepthService, LxDropdownService, LxEventSchedulerService, LxUtilsService) {
    var lxDropdown = this;
    var dropdownContentWatcher;
    var dropdownMenu;
    var dropdownToggle;
    var idEventScheduler;
    var openTimeout;
    var positionTarget;
    var scrollMask = angular.element('<div/>', {
      class: 'scroll-mask'
    });
    var enableBodyScroll;
    lxDropdown.closeDropdownMenu = closeDropdownMenu;
    lxDropdown.openDropdownMenu = openDropdownMenu;
    lxDropdown.registerDropdownMenu = registerDropdownMenu;
    lxDropdown.registerDropdownToggle = registerDropdownToggle;
    lxDropdown.toggle = toggle;
    lxDropdown.uuid = LxUtilsService.generateUUID();
    lxDropdown.closeOnClick = angular.isDefined(lxDropdown.closeOnClick) ? lxDropdown.closeOnClick : true;
    lxDropdown.effect = angular.isDefined(lxDropdown.effect) ? lxDropdown.effect : 'expand';
    lxDropdown.escapeClose = angular.isDefined(lxDropdown.escapeClose) ? lxDropdown.escapeClose : true;
    lxDropdown.hasToggle = false;
    lxDropdown.isOpen = false;
    lxDropdown.overToggle = angular.isDefined(lxDropdown.overToggle) ? lxDropdown.overToggle : false;
    lxDropdown.position = angular.isDefined(lxDropdown.position) ? lxDropdown.position : 'left';
    lxDropdown.minOffset = angular.isUndefined(lxDropdown.minOffset) || lxDropdown.minOffset < 0 ? 8 : lxDropdown.minOffset;
    $scope.$on('lx-dropdown__open', function (_event, _params) {
      if (_params.uuid === lxDropdown.uuid && !lxDropdown.isOpen) {
        LxDropdownService.closeActiveDropdown();
        LxDropdownService.registerActiveDropdownUuid(lxDropdown.uuid);
        positionTarget = _params.target;
        registerDropdownToggle(positionTarget);
        openDropdownMenu();
      }
    });
    $scope.$on('lx-dropdown__close', function (_event, _params) {
      if (_params.uuid === lxDropdown.uuid && lxDropdown.isOpen && (!_params.documentClick || _params.documentClick && lxDropdown.closeOnClick)) {
        closeDropdownMenu();
      }
    });
    $scope.$on('$destroy', function () {
      $timeout.cancel(openTimeout);
    });

    function closeDropdownMenu() {
      $document.off('click touchend', onDocumentClick);
      $rootScope.$broadcast('lx-dropdown__close-start', $element.attr('id'));
      angular.element(window).off('resize', initDropdownPosition);

      if (angular.isFunction(dropdownContentWatcher)) {
        dropdownContentWatcher();
        dropdownContentWatcher = undefined;
      }

      LxDropdownService.resetActiveDropdownUuid();
      var velocityProperties;
      var velocityEasing;

      if (!lxDropdown.hover && angular.isDefined(scrollMask)) {
        scrollMask.remove();
      }

      if (angular.isFunction(enableBodyScroll)) {
        enableBodyScroll();
      }

      enableBodyScroll = undefined;
      var dropdownToggleElement;

      if (lxDropdown.hasToggle) {
        dropdownToggleElement = angular.isString(dropdownToggle) ? angular.element(dropdownToggle) : dropdownToggle;
        dropdownToggleElement.off('wheel').css('z-index', '');
      }

      dropdownMenu.css({
        overflow: 'hidden'
      });

      if (lxDropdown.effect === 'expand') {
        velocityProperties = {
          width: 0,
          height: 0
        };
        velocityEasing = 'easeOutQuint';
      } else if (lxDropdown.effect === 'fade') {
        velocityProperties = {
          opacity: 0
        };
        velocityEasing = 'linear';
      }

      if (lxDropdown.effect === 'expand' || lxDropdown.effect === 'fade') {
        dropdownMenu.velocity(velocityProperties, {
          duration: 200,
          easing: velocityEasing,
          complete: function complete() {
            dropdownMenu.removeAttr('style').removeClass('dropdown-menu--is-open').appendTo($element.find('.dropdown'));
            $scope.$apply(function () {
              lxDropdown.isOpen = false;

              if (lxDropdown.escapeClose) {
                LxEventSchedulerService.unregister(idEventScheduler);
                idEventScheduler = undefined;
              }
            });
          }
        });
      } else if (lxDropdown.effect === 'none') {
        dropdownMenu.removeAttr('style').removeClass('dropdown-menu--is-open').appendTo($element.find('.dropdown'));
        $scope.$apply(function () {
          lxDropdown.isOpen = false;

          if (lxDropdown.escapeClose) {
            LxEventSchedulerService.unregister(idEventScheduler);
            idEventScheduler = undefined;
          }
        });
      }

      dropdownMenu.off('scroll', checkScrollEnd);
      $rootScope.$broadcast('lx-dropdown__close-end', $element.attr('id'));
    }

    function getAvailableHeight() {
      var availableHeightOnTop;
      var availableHeightOnBottom;
      var direction;
      var dropdownToggleElement = angular.isString(dropdownToggle) ? angular.element(dropdownToggle) : dropdownToggle;
      var dropdownToggleHeight = dropdownToggleElement.outerHeight();
      var dropdownToggleTop = dropdownToggleElement.offset().top - angular.element($window).scrollTop();
      var windowHeight = $window.innerHeight;

      if (lxDropdown.overToggle) {
        availableHeightOnTop = dropdownToggleTop + dropdownToggleHeight;
        availableHeightOnBottom = windowHeight - dropdownToggleTop;
      } else {
        availableHeightOnTop = dropdownToggleTop;
        availableHeightOnBottom = windowHeight - (dropdownToggleTop + dropdownToggleHeight);
      }

      if (availableHeightOnTop > availableHeightOnBottom) {
        direction = 'top';
      } else {
        direction = 'bottom';
      }

      return {
        top: availableHeightOnTop,
        bottom: availableHeightOnBottom,
        direction: direction
      };
    }

    function initDropdownPosition() {
      var availableHeight = getAvailableHeight();
      var dropdownMenuWidth;
      var dropdownMenuLeft;
      var dropdownMenuRight;
      var dropdownToggleElement = angular.isString(dropdownToggle) ? angular.element(dropdownToggle) : dropdownToggle;
      var dropdownToggleWidth = dropdownToggleElement.outerWidth();
      var dropdownToggleHeight = dropdownToggleElement.outerHeight();
      var dropdownToggleTop = dropdownToggleElement.offset().top - angular.element($window).scrollTop();
      var windowWidth = $window.innerWidth;
      var windowHeight = $window.innerHeight;
      var cssProperties = {};

      if (angular.isDefined(lxDropdown.width)) {
        if (lxDropdown.width.indexOf('%') > -1) {
          dropdownMenuWidth = dropdownToggleWidth * (lxDropdown.width.slice(0, -1) / 100);
          angular.extend(cssProperties, {
            minWidth: dropdownMenuWidth
          });
        } else {
          dropdownMenuWidth = lxDropdown.width;
          angular.extend(cssProperties, {
            width: dropdownMenuWidth
          });
        }
      } else {
        dropdownMenuWidth = 'auto';
        angular.extend(cssProperties, {
          width: dropdownMenuWidth
        });
      }

      if (lxDropdown.position === 'left') {
        dropdownMenuLeft = dropdownToggleElement.offset().left;
        dropdownMenuLeft = dropdownMenuLeft <= lxDropdown.minOffset ? lxDropdown.minOffset : dropdownMenuLeft;
        dropdownMenuRight = 'auto';
      } else if (lxDropdown.position === 'right') {
        dropdownMenuLeft = 'auto';
        dropdownMenuRight = windowWidth - dropdownToggleElement.offset().left - dropdownToggleWidth;
        dropdownMenuRight = dropdownMenuRight > windowWidth - lxDropdown.minOffset ? windowWidth - lxDropdown.minOffset : dropdownMenuRight;
      } else if (lxDropdown.position === 'center') {
        dropdownMenuLeft = dropdownToggleElement.offset().left + dropdownToggleWidth / 2 - dropdownMenuWidth / 2;
        dropdownMenuLeft = dropdownMenuLeft <= lxDropdown.minOffset ? lxDropdown.minOffset : dropdownMenuLeft;
        dropdownMenuRight = 'auto';
      }

      angular.extend(cssProperties, {
        left: dropdownMenuLeft,
        right: dropdownMenuRight
      });
      dropdownMenu.css(cssProperties);

      if (availableHeight.direction === 'top') {
        dropdownMenu.css({
          bottom: lxDropdown.overToggle ? windowHeight - dropdownToggleTop - dropdownToggleHeight : windowHeight - dropdownToggleTop + ~~lxDropdown.offset
        });
        return availableHeight.top;
      } else if (availableHeight.direction === 'bottom') {
        dropdownMenu.css({
          top: lxDropdown.overToggle ? dropdownToggleTop : dropdownToggleTop + dropdownToggleHeight + ~~lxDropdown.offset
        });
        return availableHeight.bottom;
      }
    }

    function onDocumentClick() {
      $timeout(function nextDigest() {
        LxDropdownService.close(lxDropdown.uuid, true);
      });
    }

    function openDropdownMenu() {
      $document.on('click touchend', onDocumentClick);
      $document.on('touchmove', function onTouchMove(evt) {
        $document.off('touchend', onDocumentClick);
      });
      $rootScope.$broadcast('lx-dropdown__open-start', $element.attr('id'));
      lxDropdown.isOpen = true;
      LxDepthService.register();

      if (!lxDropdown.hover) {
        scrollMask.css('z-index', LxDepthService.getDepth()).appendTo('body');
        scrollMask.on('click wheel touchmove ontouchstart', closeDropdownMenu);
      }

      angular.element(window).on('resize', initDropdownPosition);
      enableBodyScroll = LxUtilsService.disableBodyScroll();
      var dropdownToggleElement;

      if (lxDropdown.hasToggle) {
        dropdownToggleElement = angular.isString(dropdownToggle) ? angular.element(dropdownToggle) : dropdownToggle;
        dropdownToggleElement.css('z-index', LxDepthService.getDepth() + 1).on('wheel', function preventDefault(e) {
          e.preventDefault();
        });
      }

      dropdownMenu.addClass('dropdown-menu--is-open').css('z-index', LxDepthService.getDepth() + 1).appendTo('body');

      if (lxDropdown.escapeClose) {
        idEventScheduler = LxEventSchedulerService.register('keyup', onKeyUp);
      }

      openTimeout = $timeout(function () {
        var availableHeight = initDropdownPosition() - ~~lxDropdown.offset;
        var dropdownMenuHeight = dropdownMenu.outerHeight();
        var dropdownMenuWidth = dropdownMenu.outerWidth();
        var enoughHeight = true;

        if (availableHeight < dropdownMenuHeight) {
          enoughHeight = false;
          dropdownMenuHeight = availableHeight;
        }

        dropdownContentWatcher = $scope.$watch(function watcherDropdownContent() {
          return dropdownMenu.find('.dropdown-menu__content').html();
        }, function watchDropdownContent(newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }

          updateDropdownMenuHeight();
        });

        if (lxDropdown.effect === 'expand') {
          dropdownMenu.css({
            width: 0,
            height: 0,
            opacity: 1,
            overflow: 'hidden'
          });
          dropdownMenu.find('.dropdown-menu__content').css({
            width: dropdownMenuWidth,
            height: dropdownMenuHeight
          });
          dropdownMenu.velocity({
            width: dropdownMenuWidth
          }, {
            duration: 200,
            easing: 'easeOutQuint',
            queue: false
          });
          dropdownMenu.velocity({
            height: dropdownMenuHeight
          }, {
            duration: 500,
            easing: 'easeOutQuint',
            queue: false,
            complete: function complete() {
              dropdownMenu.css({
                overflow: 'auto'
              });

              if (angular.isUndefined(lxDropdown.width)) {
                dropdownMenu.css({
                  width: 'auto'
                });
              }

              $timeout(updateDropdownMenuHeight);
              dropdownMenu.find('.dropdown-menu__content').removeAttr('style');
            }
          });
        } else if (lxDropdown.effect === 'fade') {
          dropdownMenu.css({
            height: dropdownMenuHeight
          });
          dropdownMenu.velocity({
            opacity: 1
          }, {
            duration: 200,
            easing: 'linear',
            queue: false,
            complete: function complete() {
              $timeout(updateDropdownMenuHeight);
            }
          });
        } else if (lxDropdown.effect === 'none') {
          dropdownMenu.css({
            opacity: 1
          });
          $timeout(updateDropdownMenuHeight);
        }

        dropdownMenu.on('scroll', checkScrollEnd);
        $rootScope.$broadcast('lx-dropdown__open-end', $element.attr('id'));
      });
    }

    function onKeyUp(_event) {
      if (_event.keyCode == 27) {
        closeDropdownMenu();
      }

      _event.stopPropagation();
    }

    function registerDropdownMenu(_dropdownMenu) {
      dropdownMenu = _dropdownMenu;
    }

    function registerDropdownToggle(_dropdownToggle) {
      if (!positionTarget) {
        lxDropdown.hasToggle = true;
      }

      dropdownToggle = _dropdownToggle;
    }

    function toggle() {
      if (!lxDropdown.isOpen) {
        openDropdownMenu();
      } else {
        closeDropdownMenu();
      }
    }

    function updateDropdownMenuHeight() {
      if (positionTarget) {
        registerDropdownToggle(angular.element(positionTarget));
      }

      if (!angular.element(dropdownToggle).is(':visible')) {
        return;
      }

      var availableHeight = getAvailableHeight();
      var scrollPosition = dropdownMenu.scrollTop();
      dropdownMenu.css({
        height: 'auto'
      });
      dropdownMenu.css(availableHeight.direction, 'auto');
      var dropdownMenuHeight = dropdownMenu.find('.dropdown-menu__content').outerHeight();

      if (availableHeight[availableHeight.direction] - ~~lxDropdown.offset <= dropdownMenuHeight) {
        if (availableHeight.direction === 'top') {
          dropdownMenu.css({
            top: 0
          });
        } else if (availableHeight.direction === 'bottom') {
          dropdownMenu.css({
            bottom: 0
          });
        }
      } else {
        if (availableHeight.direction === 'top') {
          dropdownMenu.css({
            top: 'auto'
          });
        } else if (availableHeight.direction === 'bottom') {
          dropdownMenu.css({
            bottom: 'auto'
          });
        }
      }

      dropdownMenu.scrollTop(scrollPosition);
    }

    function checkScrollEnd() {
      if (dropdownMenu.scrollTop() + dropdownMenu.innerHeight() >= dropdownMenu[0].scrollHeight) {
        $rootScope.$broadcast('lx-dropdown__scroll-end', $element.attr('id'));
      }
    }
  }

  lxDropdownToggle.$inject = ['$timeout', '$window', 'LxDropdownService'];

  function lxDropdownToggle($timeout, $window, LxDropdownService) {
    return {
      restrict: 'AE',
      templateUrl: 'dropdown-toggle.html',
      require: '^lxDropdown',
      scope: true,
      link: link,
      replace: true,
      transclude: true
    };

    function link(scope, element, attrs, ctrl) {
      var hoverTimeout = [];
      var mouseEvent = ctrl.hover ? 'mouseenter' : 'click';
      ctrl.registerDropdownToggle(element);
      element.on(mouseEvent, function (_event) {
        if (mouseEvent === 'mouseenter' && 'ontouchstart' in window && angular.element($window).outerWidth() <= 480) {
          return;
        }

        if (!ctrl.hover) {
          _event.stopPropagation();
        }

        LxDropdownService.closeActiveDropdown();
        LxDropdownService.registerActiveDropdownUuid(ctrl.uuid);

        if (ctrl.hover) {
          ctrl.mouseOnToggle = true;

          if (!ctrl.isOpen) {
            hoverTimeout[0] = $timeout(function () {
              scope.$apply(function () {
                ctrl.openDropdownMenu();
              });
            }, ctrl.hoverDelay);
          }
        } else {
          scope.$apply(function () {
            ctrl.toggle();
          });
        }
      });

      if (ctrl.hover) {
        element.on('mouseleave', function () {
          ctrl.mouseOnToggle = false;
          $timeout.cancel(hoverTimeout[0]);
          hoverTimeout[1] = $timeout(function () {
            if (!ctrl.mouseOnMenu) {
              scope.$apply(function () {
                ctrl.closeDropdownMenu();
              });
            }
          }, ctrl.hoverDelay);
        });
      }

      scope.$on('$destroy', function () {
        element.off();

        if (ctrl.hover) {
          $timeout.cancel(hoverTimeout[0]);
          $timeout.cancel(hoverTimeout[1]);
        }
      });
    }
  }

  lxDropdownMenu.$inject = ['$timeout'];

  function lxDropdownMenu($timeout) {
    return {
      restrict: 'E',
      templateUrl: 'dropdown-menu.html',
      require: ['lxDropdownMenu', '^lxDropdown'],
      scope: true,
      link: link,
      controller: LxDropdownMenuController,
      controllerAs: 'lxDropdownMenu',
      bindToController: true,
      replace: true,
      transclude: true
    };

    function link(scope, element, attrs, ctrls) {
      var hoverTimeout;
      ctrls[1].registerDropdownMenu(element);
      ctrls[0].setParentController(ctrls[1]);

      if (ctrls[1].hover) {
        element.on('mouseenter', function () {
          ctrls[1].mouseOnMenu = true;
        });
        element.on('mouseleave', function () {
          ctrls[1].mouseOnMenu = false;
          hoverTimeout = $timeout(function () {
            if (!ctrls[1].mouseOnToggle) {
              scope.$apply(function () {
                ctrls[1].closeDropdownMenu();
              });
            }
          }, ctrls[1].hoverDelay);
        });
      }

      scope.$on('$destroy', function () {
        if (ctrls[1].hover) {
          element.off();
          $timeout.cancel(hoverTimeout);
        }
      });
    }
  }

  LxDropdownMenuController.$inject = ['$element'];

  function LxDropdownMenuController($element) {
    var lxDropdownMenu = this;
    lxDropdownMenu.setParentController = setParentController;

    function setParentController(_parentCtrl) {
      lxDropdownMenu.parentCtrl = _parentCtrl;
    }
  }

  lxDropdownFilter.$inject = ['$timeout'];

  function lxDropdownFilter($timeout) {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element) {
      var focusTimeout;
      element.on('click', function (_event) {
        _event.stopPropagation();
      });
      focusTimeout = $timeout(function () {
        element.find('input').focus();
      }, 200);
      scope.$on('$destroy', function () {
        $timeout.cancel(focusTimeout);
        element.off();
      });
    }
  }
})();

/***/ }),
/* 120 */
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
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


/***/ }),
/* 121 */
/***/ (function(module, exports) {

(function () {
  'use strict';

  angular.module('lumx.dropdown').service('LxDropdownService', LxDropdownService);
  LxDropdownService.$inject = ['$document', '$rootScope'];

  function LxDropdownService($document, $rootScope) {
    var service = this;
    var activeDropdownUuid;
    service.close = close;
    service.closeActiveDropdown = closeActiveDropdown;
    service.open = open;
    service.isOpen = isOpen;
    service.registerActiveDropdownUuid = registerActiveDropdownUuid;
    service.resetActiveDropdownUuid = resetActiveDropdownUuid;

    function close(_uuid, isDocumentClick) {
      isDocumentClick = isDocumentClick || false;
      $rootScope.$broadcast('lx-dropdown__close', {
        documentClick: isDocumentClick,
        uuid: _uuid
      });
    }

    function closeActiveDropdown() {
      if (angular.isDefined(activeDropdownUuid) && activeDropdownUuid.length > 0) {
        $rootScope.$broadcast('lx-dropdown__close', {
          documentClick: true,
          uuid: activeDropdownUuid
        });
      }
    }

    function open(_uuid, _target) {
      $rootScope.$broadcast('lx-dropdown__open', {
        uuid: _uuid,
        target: _target
      });
    }

    function isOpen(_uuid) {
      return activeDropdownUuid === _uuid;
    }

    function registerActiveDropdownUuid(_uuid) {
      activeDropdownUuid = _uuid;
    }

    function resetActiveDropdownUuid() {
      activeDropdownUuid = undefined;
    }
  }
})();

/***/ }),
/* 122 */
/***/ (function(module, exports) {

(function () {
  'use strict';

  angular.module('lumx.fab').directive('lxFab', lxFab).directive('lxFabTrigger', lxFabTrigger).directive('lxFabActions', lxFabActions);

  function lxFab() {
    return {
      restrict: 'E',
      templateUrl: 'fab.html',
      scope: true,
      link: link,
      controller: LxFabController,
      controllerAs: 'lxFab',
      bindToController: true,
      transclude: true,
      replace: true
    };

    function link(scope, element, attrs, ctrl) {
      attrs.$observe('lxDirection', function (newDirection) {
        ctrl.setFabDirection(newDirection);
      });
      attrs.$observe('lxTriggerOnClick', function (isTriggeredOnClick) {
        ctrl.setFabTriggerMethod(scope.$eval(isTriggeredOnClick));
      });
    }
  }

  function LxFabController() {
    var lxFab = this;
    lxFab.setFabDirection = setFabDirection;
    lxFab.setFabTriggerMethod = setFabTriggerMethod;
    lxFab.toggleState = toggleState;
    lxFab.isOpen = false;

    function setFabDirection(_direction) {
      lxFab.lxDirection = _direction;
    }

    function setFabTriggerMethod(_isTriggeredOnClick) {
      lxFab.lxTriggerOnClick = _isTriggeredOnClick;
    }

    function toggleState() {
      if (lxFab.lxTriggerOnClick) {
        lxFab.isOpen = !lxFab.isOpen;
      }
    }
  }

  function lxFabTrigger() {
    return {
      restrict: 'E',
      require: '^lxFab',
      templateUrl: 'fab-trigger.html',
      transclude: true,
      replace: true
    };
  }

  function lxFabActions() {
    return {
      restrict: 'E',
      require: '^lxFab',
      templateUrl: 'fab-actions.html',
      link: link,
      transclude: true,
      replace: true
    };

    function link(scope, element, attrs, ctrl) {
      scope.parentCtrl = ctrl;
    }
  }
})();

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_2__);




(function () {
  'use strict';

  angular.module('lumx.file-input').directive('lxFileInput', lxFileInput);

  function lxFileInput() {
    return {
      restrict: 'E',
      templateUrl: 'file-input.html',
      scope: {
        label: '@lxLabel',
        accept: '@lxAccept',
        callback: '&?lxCallback'
      },
      link: link,
      controller: LxFileInputController,
      controllerAs: 'lxFileInput',
      bindToController: true,
      replace: true
    };

    function link(scope, element, attrs, ctrl) {
      var input = element.find('input');
      input.on('change', ctrl.updateModel).on('blur', function () {
        element.removeClass('input-file--is-focus');
      });
      scope.$on('$destroy', function () {
        input.off();
      });
    }
  }

  LxFileInputController.$inject = ['$element', '$scope', '$timeout'];

  function LxFileInputController($element, $scope, $timeout) {
    var lxFileInput = this;
    var input = $element.find('input');
    var timer;
    lxFileInput.updateModel = updateModel;
    $scope.$on('$destroy', function () {
      $timeout.cancel(timer);
    });

    function setFileName() {
      if (input.val()) {
        lxFileInput.fileName = input.val().replace(/C:\\fakepath\\/i, '');
        $element.addClass('input-file--is-focus');
        $element.addClass('input-file--is-active');
      } else {
        lxFileInput.fileName = undefined;
        $element.removeClass('input-file--is-active');
      }

      input.val(undefined);
    }

    function updateModel() {
      if (angular.isDefined(lxFileInput.callback)) {
        lxFileInput.callback({
          newFile: input[0].files[0]
        });
      }

      timer = $timeout(setFileName);
    }
  }
})();

/***/ }),
/* 124 */
/***/ (function(module, exports) {

(function () {
  'use strict';

  angular.module('lumx.icon').directive('lxIcon', lxIcon);

  function lxIcon() {
    return {
      restrict: 'E',
      templateUrl: 'icon.html',
      scope: {
        color: '@?lxColor',
        id: '@lxId',
        size: '@?lxSize',
        type: '@?lxType'
      },
      controller: LxIconController,
      controllerAs: 'lxIcon',
      bindToController: true,
      replace: true
    };
  }

  function LxIconController() {
    var lxIcon = this;
    lxIcon.getClass = getClass;

    function getClass() {
      var iconClass = [];
      iconClass.push('mdi-' + lxIcon.id);

      if (angular.isDefined(lxIcon.size)) {
        iconClass.push('icon--' + lxIcon.size);
      }

      if (angular.isDefined(lxIcon.color)) {
        iconClass.push('icon--' + lxIcon.color);
      }

      if (angular.isDefined(lxIcon.type)) {
        iconClass.push('icon--' + lxIcon.type);
      }

      return iconClass;
    }
  }
})();

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54);
/* harmony import */ var core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_slice__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_parse_float__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(126);
/* harmony import */ var core_js_modules_es_parse_float__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_float__WEBPACK_IMPORTED_MODULE_3__);





(function () {
  'use strict';

  angular.module('lumx.notification').service('LxNotificationService', LxNotificationService);
  LxNotificationService.$inject = ['$injector', '$rootScope', '$timeout', 'LxDepthService', 'LxEventSchedulerService'];

  function LxNotificationService($injector, $rootScope, $timeout, LxDepthService, LxEventSchedulerService) {
    var service = this;
    var dialogFilter;
    var dialog;
    var idEventScheduler;
    var notificationList = [];
    var actionClicked = false;
    service.alert = showAlertDialog;
    service.confirm = showConfirmDialog;
    service.error = notifyError;
    service.info = notifyInfo;
    service.notify = notify;
    service.success = notifySuccess;
    service.warning = notifyWarning;
    service.getNotificationList = getNotificationList;
    service.reComputeElementsPosition = reComputeElementsPosition;
    service.deleteNotification = deleteNotification;
    service.buildNotification = buildNotification;

    function getElementHeight(_elem) {
      return parseFloat(window.getComputedStyle(_elem, null).height);
    }

    function moveNotificationUp() {
      var newNotifIndex = notificationList.length - 1;
      notificationList[newNotifIndex].height = getElementHeight(notificationList[newNotifIndex].elem[0]);
      var upOffset = 0;

      for (var idx = newNotifIndex; idx >= 0; idx--) {
        if (notificationList.length > 1 && idx !== newNotifIndex) {
          upOffset = 24 + notificationList[newNotifIndex].height;
          notificationList[idx].margin += upOffset;
          notificationList[idx].elem.css('marginBottom', notificationList[idx].margin + 'px');
        }
      }
    }

    function deleteNotification(_notification, _callback) {
      _callback = !angular.isFunction(_callback) ? angular.noop : _callback;
      var notifIndex = notificationList.indexOf(_notification);
      var dnOffset = angular.isDefined(notificationList[notifIndex]) ? 24 + notificationList[notifIndex].height : 24;

      for (var idx = 0; idx < notifIndex; idx++) {
        if (notificationList.length > 1) {
          notificationList[idx].margin -= dnOffset;
          notificationList[idx].elem.css('marginBottom', notificationList[idx].margin + 'px');
        }
      }

      _notification.elem.removeClass('notification--is-shown');

      $timeout(function () {
        _notification.elem.remove();

        notifIndex = notificationList.indexOf(_notification);

        if (notifIndex != -1) {
          notificationList.splice(notifIndex, 1);
        }

        _callback(actionClicked);

        actionClicked = false;
      }, 400);
    }

    function reComputeElementsPosition() {
      var baseOffset = 0;

      for (var idx = notificationList.length - 1; idx >= 0; idx--) {
        notificationList[idx].height = getElementHeight(notificationList[idx].elem[0]);
        notificationList[idx].margin = baseOffset;
        notificationList[idx].elem.css('marginBottom', notificationList[idx].margin + 'px');
        baseOffset += notificationList[idx].height + 24;
      }
    }

    function buildNotification(_text, _icon, _color, _action) {
      var notification = angular.element('<div/>', {
        class: 'notification'
      });
      var notificationText = angular.element('<span/>', {
        class: 'notification__content',
        html: _text
      });

      if (angular.isDefined(_icon)) {
        var notificationIcon = angular.element('<i/>', {
          class: 'notification__icon mdi mdi-' + _icon
        });
        notification.addClass('notification--has-icon').append(notificationIcon);
      }

      if (angular.isDefined(_color)) {
        notification.addClass('notification--' + _color);
      }

      notification.append(notificationText);

      if (angular.isDefined(_action)) {
        var $compile = $injector.get('$compile');
        var notificationAction = angular.element('<button/>', {
          class: 'notification__action btn btn--m btn--flat',
          html: _action
        });

        if (angular.isDefined(_color)) {
          notificationAction.addClass('btn--' + _color);
        } else {
          notificationAction.addClass('btn--white');
        }

        notificationAction.attr('lx-ripple', '');
        $compile(notificationAction)($rootScope);
        notificationAction.bind('click', function () {
          actionClicked = true;
        });
        notification.addClass('notification--has-action').append(notificationAction);
      }

      return notification;
    }

    function notify(_text, _icon, _sticky, _color, _action, _callback, _delay) {
      var notification = this.buildNotification(_text, _icon, _color, _action);
      var notificationTimeout;
      var notificationDelay = _delay || 6000;
      LxDepthService.register();
      notification.css('z-index', LxDepthService.getDepth()).appendTo('body');
      $timeout(function () {
        notification.addClass('notification--is-shown');
      }, 100);
      var data = {
        elem: notification,
        margin: 0
      };
      notificationList.push(data);
      moveNotificationUp();
      notification.bind('click', function () {
        actionClicked = true;
        deleteNotification(data, _callback);

        if (angular.isDefined(notificationTimeout)) {
          $timeout.cancel(notificationTimeout);
        }
      });

      if (angular.isUndefined(_sticky) || !_sticky) {
        notificationTimeout = $timeout(function () {
          deleteNotification(data, _callback);
        }, notificationDelay);
      }
    }

    function notifyError(_text, _sticky) {
      service.notify(_text, 'alert-circle', _sticky, 'red');
    }

    function notifyInfo(_text, _sticky) {
      service.notify(_text, 'information-outline', _sticky, 'blue');
    }

    function notifySuccess(_text, _sticky) {
      service.notify(_text, 'check', _sticky, 'green');
    }

    function notifyWarning(_text, _sticky) {
      service.notify(_text, 'alert', _sticky, 'orange');
    }

    function buildDialogActions(_buttons, _callback, _unbind) {
      var $compile = $injector.get('$compile');
      var dialogActions = angular.element('<div/>', {
        class: 'dialog__footer'
      });
      var dialogLastBtn = angular.element('<button/>', {
        class: 'btn btn--m btn--blue btn--flat',
        text: _buttons.ok
      });

      if (angular.isDefined(_buttons.cancel)) {
        var dialogFirstBtn = angular.element('<button/>', {
          class: 'btn btn--m btn--red btn--flat',
          text: _buttons.cancel
        });
        dialogFirstBtn.attr('lx-ripple', '');
        $compile(dialogFirstBtn)($rootScope);
        dialogActions.append(dialogFirstBtn);
        dialogFirstBtn.bind('click', function () {
          _callback(false);

          closeDialog();
        });
      }

      dialogLastBtn.attr('lx-ripple', '');
      $compile(dialogLastBtn)($rootScope);
      dialogActions.append(dialogLastBtn);
      dialogLastBtn.bind('click', function () {
        _callback(true);

        closeDialog();
      });

      if (!_unbind) {
        idEventScheduler = LxEventSchedulerService.register('keyup', function (event) {
          if (event.keyCode == 13) {
            _callback(true);

            closeDialog();
          } else if (event.keyCode == 27) {
            _callback(angular.isUndefined(_buttons.cancel));

            closeDialog();
          }

          event.stopPropagation();
        });
      }

      return dialogActions;
    }

    function buildDialogContent(_text) {
      var dialogContent = angular.element('<div/>', {
        class: 'dialog__content p++ pt0 tc-black-2',
        text: _text
      });
      return dialogContent;
    }

    function buildDialogHeader(_title) {
      var dialogHeader = angular.element('<div/>', {
        class: 'dialog__header p++ fs-title',
        text: _title
      });
      return dialogHeader;
    }

    function closeDialog() {
      if (angular.isDefined(idEventScheduler)) {
        $timeout(function () {
          LxEventSchedulerService.unregister(idEventScheduler);
          idEventScheduler = undefined;
        }, 1);
      }

      dialogFilter.removeClass('dialog-filter--is-shown');
      dialog.removeClass('dialog--is-shown');
      $timeout(function () {
        dialogFilter.remove();
        dialog.remove();
      }, 600);
    }

    function showAlertDialog(_title, _text, _button, _callback, _unbind) {
      LxDepthService.register();
      dialogFilter = angular.element('<div/>', {
        class: 'dialog-filter'
      });
      dialog = angular.element('<div/>', {
        class: 'dialog dialog--alert'
      });
      var dialogHeader = buildDialogHeader(_title);
      var dialogContent = buildDialogContent(_text);
      var dialogActions = buildDialogActions({
        ok: _button
      }, _callback, _unbind);
      dialogFilter.css('z-index', LxDepthService.getDepth()).appendTo('body');
      dialog.append(dialogHeader).append(dialogContent).append(dialogActions).css('z-index', LxDepthService.getDepth() + 1).appendTo('body').show().focus();
      $timeout(function () {
        angular.element(document.activeElement).blur();
        dialogFilter.addClass('dialog-filter--is-shown');
        dialog.addClass('dialog--is-shown');
      }, 100);
    }

    function showConfirmDialog(_title, _text, _buttons, _callback, _unbind) {
      LxDepthService.register();
      dialogFilter = angular.element('<div/>', {
        class: 'dialog-filter'
      });
      dialog = angular.element('<div/>', {
        class: 'dialog dialog--alert'
      });
      var dialogHeader = buildDialogHeader(_title);
      var dialogContent = buildDialogContent(_text);
      var dialogActions = buildDialogActions(_buttons, _callback, _unbind);
      dialogFilter.css('z-index', LxDepthService.getDepth()).appendTo('body');
      dialog.append(dialogHeader).append(dialogContent).append(dialogActions).css('z-index', LxDepthService.getDepth() + 1).appendTo('body').show().focus();
      $timeout(function () {
        angular.element(document.activeElement).blur();
        dialogFilter.addClass('dialog-filter--is-shown');
        dialog.addClass('dialog--is-shown');
      }, 100);
    }

    function getNotificationList() {
      return notificationList.slice();
    }
  }
})();

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var parseFloatImplementation = __webpack_require__(127);

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
$({ global: true, forced: parseFloat != parseFloatImplementation }, {
  parseFloat: parseFloatImplementation
});


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var trim = __webpack_require__(55).trim;
var whitespaces = __webpack_require__(30);

var nativeParseFloat = global.parseFloat;
var FORCED = 1 / nativeParseFloat(whitespaces + '-0') !== -Infinity;

// `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string
module.exports = FORCED ? function parseFloat(string) {
  var trimmedString = trim(String(string));
  var result = nativeParseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : nativeParseFloat;


/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_0__);


(function () {
  'use strict';

  angular.module('lumx.progress').directive('lxProgress', lxProgress);

  function lxProgress() {
    return {
      restrict: 'E',
      templateUrl: 'progress.html',
      scope: {
        lxColor: '@?',
        lxDiameter: '@?',
        lxType: '@',
        lxValue: '@'
      },
      controller: LxProgressController,
      controllerAs: 'lxProgress',
      bindToController: true,
      replace: true
    };
  }

  function LxProgressController() {
    var lxProgress = this;
    lxProgress.getCircularProgressValue = getCircularProgressValue;
    lxProgress.getLinearProgressValue = getLinearProgressValue;
    lxProgress.getProgressDiameter = getProgressDiameter;

    function getCircularProgressValue() {
      if (angular.isDefined(lxProgress.lxValue)) {
        return {
          'stroke-dasharray': lxProgress.lxValue * 1.26 + ',200'
        };
      }
    }

    function getLinearProgressValue() {
      if (angular.isDefined(lxProgress.lxValue)) {
        return {
          'transform': 'scale(' + lxProgress.lxValue / 100 + ', 1)'
        };
      }
    }

    function getProgressDiameter() {
      if (lxProgress.lxType === 'circular') {
        return {
          'transform': 'scale(' + parseInt(lxProgress.lxDiameter) / 100 + ')'
        };
      }

      return;
    }

    function init() {
      lxProgress.lxDiameter = angular.isDefined(lxProgress.lxDiameter) ? lxProgress.lxDiameter : 100;
      lxProgress.lxColor = angular.isDefined(lxProgress.lxColor) ? lxProgress.lxColor : 'primary';
      lxProgress.lxClass = angular.isDefined(lxProgress.lxValue) ? 'progress-container--determinate' : 'progress-container--indeterminate';
    }

    this.$onInit = init;
  }
})();

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var trim = __webpack_require__(55).trim;
var whitespaces = __webpack_require__(30);

var nativeParseInt = global.parseInt;
var hex = /^[+-]?0[Xx]/;
var FORCED = nativeParseInt(whitespaces + '08') !== 8 || nativeParseInt(whitespaces + '0x16') !== 22;

// `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix
module.exports = FORCED ? function parseInt(string, radix) {
  var S = trim(String(string));
  return nativeParseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
} : nativeParseInt;


/***/ }),
/* 130 */
/***/ (function(module, exports) {

(function () {
  'use strict';

  angular.module('lumx.radio-button').directive('lxRadioGroup', lxRadioGroup).directive('lxRadioButton', lxRadioButton).directive('lxRadioButtonLabel', lxRadioButtonLabel).directive('lxRadioButtonHelp', lxRadioButtonHelp);

  function lxRadioGroup() {
    return {
      restrict: 'E',
      templateUrl: 'radio-group.html',
      transclude: true,
      replace: true
    };
  }

  function lxRadioButton() {
    return {
      restrict: 'E',
      templateUrl: 'radio-button.html',
      scope: {
        lxColor: '@?',
        name: '@',
        ngChange: '&?',
        ngDisabled: '=?',
        ngModel: '=',
        ngValue: '=?',
        value: '@?',
        lxTheme: '@?'
      },
      controller: LxRadioButtonController,
      controllerAs: 'lxRadioButton',
      bindToController: true,
      transclude: true,
      link: function link(scope, el, attrs, ctrl) {
        ctrl.init();
      },
      replace: true
    };
  }

  LxRadioButtonController.$inject = ['$scope', '$timeout', 'LxUtilsService'];

  function LxRadioButtonController($scope, $timeout, LxUtilsService) {
    var lxRadioButton = this;
    var radioButtonId;
    var radioButtonHasChildren;
    var timer;
    lxRadioButton.getRadioButtonId = getRadioButtonId;
    lxRadioButton.getRadioButtonHasChildren = getRadioButtonHasChildren;
    lxRadioButton.setRadioButtonId = setRadioButtonId;
    lxRadioButton.setRadioButtonHasChildren = setRadioButtonHasChildren;
    lxRadioButton.triggerNgChange = triggerNgChange;
    lxRadioButton.init = init;
    $scope.$on('$destroy', function () {
      $timeout.cancel(timer);
    });

    function getRadioButtonId() {
      return radioButtonId;
    }

    function getRadioButtonHasChildren() {
      return radioButtonHasChildren;
    }

    function init() {
      setRadioButtonId(LxUtilsService.generateUUID());
      setRadioButtonHasChildren(false);

      if (angular.isDefined(lxRadioButton.value) && angular.isUndefined(lxRadioButton.ngValue)) {
        lxRadioButton.ngValue = lxRadioButton.value;
      }

      lxRadioButton.lxColor = angular.isUndefined(lxRadioButton.lxColor) ? 'accent' : lxRadioButton.lxColor;
    }

    function setRadioButtonId(_radioButtonId) {
      radioButtonId = _radioButtonId;
    }

    function setRadioButtonHasChildren(_radioButtonHasChildren) {
      radioButtonHasChildren = _radioButtonHasChildren;
    }

    function triggerNgChange() {
      timer = $timeout(lxRadioButton.ngChange);
    }
  }

  function lxRadioButtonLabel() {
    return {
      restrict: 'AE',
      require: ['^lxRadioButton', '^lxRadioButtonLabel'],
      templateUrl: 'radio-button-label.html',
      link: link,
      controller: LxRadioButtonLabelController,
      controllerAs: 'lxRadioButtonLabel',
      bindToController: true,
      transclude: true,
      replace: true
    };

    function link(scope, element, attrs, ctrls) {
      ctrls[0].setRadioButtonHasChildren(true);
      ctrls[1].setRadioButtonId(ctrls[0].getRadioButtonId());
    }
  }

  function LxRadioButtonLabelController() {
    var lxRadioButtonLabel = this;
    var radioButtonId;
    lxRadioButtonLabel.getRadioButtonId = getRadioButtonId;
    lxRadioButtonLabel.setRadioButtonId = setRadioButtonId;

    function getRadioButtonId() {
      return radioButtonId;
    }

    function setRadioButtonId(_radioButtonId) {
      radioButtonId = _radioButtonId;
    }
  }

  function lxRadioButtonHelp() {
    return {
      restrict: 'AE',
      require: '^lxRadioButton',
      templateUrl: 'radio-button-help.html',
      transclude: true,
      replace: true
    };
  }
})();

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);


(function () {
  'use strict';

  angular.module('lumx.ripple').directive('lxRipple', lxRipple);
  lxRipple.$inject = ['$timeout'];

  function lxRipple($timeout) {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {
      var timer;
      element.css({
        position: 'relative',
        overflow: 'hidden'
      }).on('mousedown', function (e) {
        var ripple;

        if (element.find('.ripple').length === 0) {
          ripple = angular.element('<span/>', {
            class: 'ripple'
          });

          if (attrs.lxRipple) {
            ripple.addClass('bgc-' + attrs.lxRipple);
          }

          element.prepend(ripple);
        } else {
          ripple = element.find('.ripple');
        }

        ripple.removeClass('ripple--is-animated');

        if (!ripple.height() && !ripple.width()) {
          var diameter = Math.max(element.outerWidth(), element.outerHeight());
          ripple.css({
            height: diameter,
            width: diameter
          });
        }

        var x = e.pageX - element.offset().left - ripple.width() / 2;
        var y = e.pageY - element.offset().top - ripple.height() / 2;
        ripple.css({
          top: y + 'px',
          left: x + 'px'
        }).addClass('ripple--is-animated');
        timer = $timeout(function () {
          ripple.removeClass('ripple--is-animated');
        }, 651);
      });
      scope.$on('$destroy', function () {
        $timeout.cancel(timer);
        element.off();
      });
    }
  }
})();

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_constructor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(73);
/* harmony import */ var core_js_modules_es_regexp_constructor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(16);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(50);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(29);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_6__);








(function () {
  'use strict';

  angular.module('lumx.search-filter').filter('lxSearchHighlight', lxSearchHighlight).directive('lxSearchFilter', lxSearchFilter);
  lxSearchHighlight.$inject = ['$sce'];

  function lxSearchHighlight($sce) {
    function escapeRegexp(queryToEscape) {
      return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
    }

    return function (matchItem, query, icon) {
      var string = '';

      if (icon) {
        string += '<i class="mdi mdi-' + icon + '"></i>';
      }

      string += query && matchItem ? matchItem.replace(new RegExp(escapeRegexp(query), 'gi'), '<strong>$&</strong>') : matchItem;
      return $sce.trustAsHtml(string);
    };
  }

  function lxSearchFilter() {
    return {
      restrict: 'E',
      templateUrl: 'search-filter.html',
      scope: {
        autocomplete: '&?lxAutocomplete',
        closed: '=?lxClosed',
        color: '@?lxColor',
        icon: '@?lxIcon',
        onInit: '&?lxOnInit',
        onSelect: '=?lxOnSelect',
        searchOnFocus: '=?lxSearchOnFocus',
        theme: '@?lxTheme',
        width: '@?lxWidth'
      },
      link: link,
      controller: LxSearchFilterController,
      controllerAs: 'lxSearchFilter',
      bindToController: true,
      replace: true,
      transclude: true
    };

    function link(scope, element, attrs, ctrl, transclude) {
      var input;
      attrs.$observe('lxWidth', function (newWidth) {
        if (angular.isDefined(scope.lxSearchFilter.closed) && scope.lxSearchFilter.closed) {
          element.find('.search-filter__container').css('width', newWidth);
        }
      });
      transclude(function () {
        input = element.find('input');
        ctrl.setInput(input);
        ctrl.setModel(input.data('$ngModelController'));
        input.on('focus', ctrl.focusInput);
        input.on('blur', ctrl.blurInput);
        input.on('keydown', ctrl.keyEvent);
      });
      scope.$on('$destroy', function () {
        input.off();
      });

      if (angular.isDefined(scope.lxSearchFilter.onInit)) {
        scope.lxSearchFilter.onInit()(scope.lxSearchFilter.dropdownId);
      }
    }
  }

  LxSearchFilterController.$inject = ['$element', '$scope', '$timeout', 'LxDropdownService', 'LxNotificationService', 'LxUtilsService'];

  function LxSearchFilterController($element, $scope, $timeout, LxDropdownService, LxNotificationService, LxUtilsService) {
    var lxSearchFilter = this;
    var debouncedAutocomplete;
    var input;
    var itemSelected = false;
    lxSearchFilter.blurInput = blurInput;
    lxSearchFilter.clearInput = clearInput;
    lxSearchFilter.focusInput = focusInput;
    lxSearchFilter.getClass = getClass;
    lxSearchFilter.keyEvent = keyEvent;
    lxSearchFilter.openInput = openInput;
    lxSearchFilter.selectItem = selectItem;
    lxSearchFilter.setInput = setInput;
    lxSearchFilter.setModel = setModel;
    lxSearchFilter.activeChoiceIndex = -1;
    lxSearchFilter.color = angular.isDefined(lxSearchFilter.color) ? lxSearchFilter.color : 'black';
    lxSearchFilter.dropdownId = LxUtilsService.generateUUID();
    lxSearchFilter.theme = angular.isDefined(lxSearchFilter.theme) ? lxSearchFilter.theme : 'light';

    function blurInput() {
      if (angular.isDefined(lxSearchFilter.closed) && lxSearchFilter.closed && !input.val()) {
        $element.velocity({
          width: 40
        }, {
          duration: 400,
          easing: 'easeOutQuint',
          queue: false
        });
      }

      if (!input.val()) {
        $timeout(function () {
          lxSearchFilter.modelController.$setViewValue(undefined);
        }, 500);
      }
    }

    function clearInput() {
      lxSearchFilter.modelController.$setViewValue(undefined);
      lxSearchFilter.modelController.$render();
      var searchOnFocus = lxSearchFilter.searchOnFocus;
      lxSearchFilter.searchOnFocus = false;
      input.focus();
      lxSearchFilter.searchOnFocus = searchOnFocus;
    }

    function focusInput() {
      if (!lxSearchFilter.searchOnFocus) {
        return;
      }

      updateAutocomplete(lxSearchFilter.modelController.$viewValue, true);
    }

    function getClass() {
      var searchFilterClass = [];

      if (angular.isUndefined(lxSearchFilter.closed) || !lxSearchFilter.closed) {
        searchFilterClass.push('search-filter--opened-mode');
      }

      if (angular.isDefined(lxSearchFilter.closed) && lxSearchFilter.closed) {
        searchFilterClass.push('search-filter--closed-mode');
      }

      if (input.val()) {
        searchFilterClass.push('search-filter--has-clear-button');
      }

      if (angular.isDefined(lxSearchFilter.color)) {
        searchFilterClass.push('search-filter--' + lxSearchFilter.color);
      }

      if (angular.isDefined(lxSearchFilter.theme)) {
        searchFilterClass.push('search-filter--theme-' + lxSearchFilter.theme);
      }

      if (angular.isFunction(lxSearchFilter.autocomplete)) {
        searchFilterClass.push('search-filter--autocomplete');
      }

      if (LxDropdownService.isOpen(lxSearchFilter.dropdownId)) {
        searchFilterClass.push('search-filter--is-open');
      }

      return searchFilterClass;
    }

    function keyEvent(_event) {
      if (!angular.isFunction(lxSearchFilter.autocomplete)) {
        return;
      }

      if (!LxDropdownService.isOpen(lxSearchFilter.dropdownId)) {
        lxSearchFilter.activeChoiceIndex = -1;
      }

      switch (_event.keyCode) {
        case 13:
          keySelect();

          if (lxSearchFilter.activeChoiceIndex > -1) {
            _event.preventDefault();
          }

          break;

        case 38:
          keyUp();

          _event.preventDefault();

          break;

        case 40:
          keyDown();

          _event.preventDefault();

          break;
      }

      $scope.$apply();
    }

    function keyDown() {
      if (lxSearchFilter.autocompleteList.length) {
        lxSearchFilter.activeChoiceIndex += 1;

        if (lxSearchFilter.activeChoiceIndex >= lxSearchFilter.autocompleteList.length) {
          lxSearchFilter.activeChoiceIndex = 0;
        }
      }
    }

    function keySelect() {
      if (!lxSearchFilter.autocompleteList || lxSearchFilter.activeChoiceIndex === -1) {
        return;
      }

      selectItem(lxSearchFilter.autocompleteList[lxSearchFilter.activeChoiceIndex]);
    }

    function keyUp() {
      if (lxSearchFilter.autocompleteList.length) {
        lxSearchFilter.activeChoiceIndex -= 1;

        if (lxSearchFilter.activeChoiceIndex < 0) {
          lxSearchFilter.activeChoiceIndex = lxSearchFilter.autocompleteList.length - 1;
        }
      }
    }

    function openDropdown() {
      LxDropdownService.open(lxSearchFilter.dropdownId, $element);
    }

    function closeDropdown() {
      LxDropdownService.close(lxSearchFilter.dropdownId);
    }

    function onAutocompleteSuccess(autocompleteList) {
      lxSearchFilter.autocompleteList = autocompleteList;
      lxSearchFilter.autocompleteList.length ? openDropdown() : closeDropdown();
      lxSearchFilter.isLoading = false;
    }

    function onAutocompleteError(error) {
      LxNotificationService.error(error);
      lxSearchFilter.isLoading = false;
    }

    function openInput() {
      if (angular.isDefined(lxSearchFilter.closed) && lxSearchFilter.closed) {
        $element.velocity({
          width: angular.isDefined(lxSearchFilter.width) ? parseInt(lxSearchFilter.width) : 240
        }, {
          duration: 400,
          easing: 'easeOutQuint',
          queue: false,
          complete: function complete() {
            input.focus();
          }
        });
      } else {
        input.focus();
      }
    }

    function selectItem(_item) {
      itemSelected = true;
      closeDropdown();
      lxSearchFilter.modelController.$setViewValue(_item);
      lxSearchFilter.modelController.$render();

      if (angular.isFunction(lxSearchFilter.onSelect)) {
        lxSearchFilter.onSelect(_item);
      }
    }

    function setInput(_input) {
      input = _input;
    }

    function setModel(_modelController) {
      lxSearchFilter.modelController = _modelController;

      if (angular.isFunction(lxSearchFilter.autocomplete) && angular.isFunction(lxSearchFilter.autocomplete())) {
        debouncedAutocomplete = LxUtilsService.debounce(function () {
          lxSearchFilter.isLoading = true;
          lxSearchFilter.autocomplete().apply(this, arguments);
        }, 500);
        lxSearchFilter.modelController.$parsers.push(updateAutocomplete);
      }
    }

    function updateAutocomplete(_newValue, _immediate) {
      if ((_newValue || angular.isUndefined(_newValue) && lxSearchFilter.searchOnFocus) && !itemSelected) {
        if (_immediate) {
          lxSearchFilter.isLoading = true;
          lxSearchFilter.autocomplete()(_newValue, onAutocompleteSuccess, onAutocompleteError);
        } else {
          debouncedAutocomplete(_newValue, onAutocompleteSuccess, onAutocompleteError);
        }
      } else {
        debouncedAutocomplete.clear();
        closeDropdown();
      }

      itemSelected = false;
      return _newValue;
    }
  }
})();

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
var setPrototypeOf = __webpack_require__(134);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var aPossiblePrototype = __webpack_require__(135);

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
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


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(137);
/* harmony import */ var core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_concat__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72);
/* harmony import */ var core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_filter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_array_some__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(138);
/* harmony import */ var core_js_modules_es_array_some__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_some__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(22);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(139);
/* harmony import */ var core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_keys__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(24);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var core_js_modules_es_regexp_constructor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(73);
/* harmony import */ var core_js_modules_es_regexp_constructor__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_constructor__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(16);
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(50);
/* harmony import */ var core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(140);
/* harmony import */ var core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_split__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(32);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_13__);















(function () {
  'use strict';

  angular.module('lumx.select').filter('filterChoices', filterChoices).directive('lxSelect', lxSelect).directive('lxSelectSelected', lxSelectSelected).directive('lxSelectChoices', lxSelectChoices);
  filterChoices.$inject = ['$filter'];

  function filterChoices($filter) {
    return function (choices, externalFilter, textFilter) {
      if (externalFilter) {
        return choices;
      }

      var toFilter = [];

      if (!angular.isArray(choices)) {
        if (angular.isObject(choices)) {
          for (var idx in choices) {
            if (angular.isArray(choices[idx])) {
              toFilter = toFilter.concat(choices[idx]);
            }
          }
        }
      } else {
        toFilter = choices;
      }

      return $filter('filter')(toFilter, textFilter);
    };
  }

  function lxSelect() {
    return {
      restrict: 'E',
      templateUrl: 'select.html',
      scope: {
        allowClear: '=?lxAllowClear',
        allowNewValue: '=?lxAllowNewValue',
        autocomplete: '=?lxAutocomplete',
        newValueTransform: '=?lxNewValueTransform',
        choices: '=?lxChoices',
        choicesCustomStyle: '=?lxChoicesCustomStyle',
        choicesViewMode: '@?lxChoicesViewMode',
        customStyle: '=?lxCustomStyle',
        displayFilter: '=?lxDisplayFilter',
        error: '=?lxError',
        filter: '&?lxFilter',
        filterFields: '=?lxFilterFields',
        fixedLabel: '=?lxFixedLabel',
        helper: '=?lxHelper',
        helperMessage: '@?lxHelperMessage',
        infiniteScroll: '&?lxInfiniteScroll',
        label: '@?lxLabel',
        loading: '=?lxLoading',
        max: '=?lxMax',
        modelToSelection: '&?lxModelToSelection',
        multiple: '=?lxMultiple',
        ngChange: '&?',
        ngDisabled: '=?',
        ngModel: '=',
        selectionToModel: '&?lxSelectionToModel',
        theme: '@?lxTheme',
        valid: '=?lxValid',
        viewMode: '@?lxViewMode'
      },
      link: link,
      controller: LxSelectController,
      controllerAs: 'lxSelect',
      bindToController: true,
      replace: true,
      transclude: true
    };

    function link(scope, element, attrs) {
      var backwardOneWay = ['customStyle'];
      var backwardTwoWay = ['allowClear', 'choices', 'error', 'loading', 'multiple', 'valid'];
      angular.forEach(backwardOneWay, function (attribute) {
        if (angular.isDefined(attrs[attribute])) {
          attrs.$observe(attribute, function (newValue) {
            scope.lxSelect[attribute] = newValue;
          });
        }
      });
      angular.forEach(backwardTwoWay, function (attribute) {
        if (angular.isDefined(attrs[attribute])) {
          scope.$watch(function () {
            return scope.$parent.$eval(attrs[attribute]);
          }, function (newValue) {
            if (attribute === 'multiple' && angular.isUndefined(newValue)) {
              scope.lxSelect[attribute] = true;
            } else {
              scope.lxSelect[attribute] = newValue;
            }
          });
        }
      });
      attrs.$observe('placeholder', function (newValue) {
        scope.lxSelect.label = newValue;
      });
      attrs.$observe('change', function (newValue) {
        scope.lxSelect.ngChange = function (data) {
          return scope.$parent.$eval(newValue, data);
        };
      });
      attrs.$observe('filter', function (newValue) {
        scope.lxSelect.filter = function (data) {
          return scope.$parent.$eval(newValue, data);
        };

        scope.lxSelect.displayFilter = true;
      });
      attrs.$observe('modelToSelection', function (newValue) {
        scope.lxSelect.modelToSelection = function (data) {
          return scope.$parent.$eval(newValue, data);
        };
      });
      attrs.$observe('selectionToModel', function (newValue) {
        scope.lxSelect.selectionToModel = function (data) {
          return scope.$parent.$eval(newValue, data);
        };
      });
      attrs.$observe('infiniteScroll', function (newValue) {
        scope.lxSelect.infiniteScroll = function (data) {
          return scope.$parent.$eval(newValue, data);
        };
      });
    }
  }

  LxSelectController.$inject = ['$interpolate', '$element', '$filter', '$sce', '$scope', '$timeout', 'LxDepthService', 'LxDropdownService', 'LxUtilsService'];

  function LxSelectController($interpolate, $element, $filter, $sce, $scope, $timeout, LxDepthService, LxDropdownService, LxUtilsService) {
    var lxSelect = this;
    var choiceTemplate;
    var selectedTemplate;
    var toggledPanes = {};
    lxSelect.activeChoiceIndex = -1;
    lxSelect.activeSelectedIndex = -1;
    lxSelect.uuid = LxUtilsService.generateUUID();
    lxSelect.filterModel = undefined;
    lxSelect.ngModel = angular.isUndefined(lxSelect.ngModel) && lxSelect.multiple ? [] : lxSelect.ngModel;
    lxSelect.unconvertedModel = lxSelect.multiple ? [] : undefined;
    lxSelect.viewMode = angular.isUndefined(lxSelect.viewMode) ? 'field' : lxSelect.viewMode;
    lxSelect.choicesViewMode = angular.isUndefined(lxSelect.choicesViewMode) ? 'list' : lxSelect.choicesViewMode;
    lxSelect.panes = [];
    lxSelect.matchingPaths = undefined;

    function _closePane(index) {
      if (index === 0) {
        _closePanes();

        return;
      }

      if (angular.isUndefined(toggledPanes[index])) {
        return;
      }

      _closePane(index + 1);

      if (lxSelect.choicesViewSize === 'large') {
        lxSelect.panes.splice(toggledPanes[index].position, 1);
      } else {
        lxSelect.openedPanes.splice(toggledPanes[index].position, 1);
      }

      delete toggledPanes[index];
    }

    function _closePanes() {
      toggledPanes = {};

      if (lxSelect.choicesViewSize === 'large') {
        if (angular.isDefined(lxSelect.choices) && lxSelect.choices !== null) {
          lxSelect.panes = [lxSelect.choices];
        } else {
          lxSelect.panes = [];
        }
      } else {
        if (angular.isDefined(lxSelect.choices) && lxSelect.choices !== null) {
          lxSelect.openedPanes = [lxSelect.choices];
        } else {
          lxSelect.openedPanes = [];
        }
      }
    }

    function _findIndex(haystack, needle) {
      if (angular.isUndefined(haystack) || haystack.length === 0) {
        return -1;
      }

      for (var i = 0, len = haystack.length; i < len; i++) {
        if (haystack[i] === needle) {
          return i;
        }
      }

      return -1;
    }

    function _getLongestMatchingPath(containing) {
      if (angular.isUndefined(lxSelect.matchingPaths) || lxSelect.matchingPaths.length === 0) {
        return undefined;
      }

      containing = containing || lxSelect.matchingPaths[0];
      var longest = lxSelect.matchingPaths[0];
      var longestSize = longest.split('.').length;

      for (var i = 1, len = lxSelect.matchingPaths.length; i < len; i++) {
        var matchingPath = lxSelect.matchingPaths[i];

        if (!matchingPath) {
          continue;
        }

        if (matchingPath.indexOf(containing) === -1) {
          break;
        }

        var size = matchingPath.split('.').length;

        if (size > longestSize) {
          longest = matchingPath;
          longestSize = size;
        }
      }

      return longest;
    }

    function _keyDown() {
      var filteredChoices;

      if (lxSelect.choicesViewMode === 'panes') {
        filteredChoices = Object.keys(lxSelect.panes[lxSelect.panes.length - 1]);
      } else {
        filteredChoices = $filter('filterChoices')(lxSelect.choices, lxSelect.filter, lxSelect.filterModel);
      }

      if (filteredChoices.length) {
        lxSelect.activeChoiceIndex += 1;

        if (lxSelect.activeChoiceIndex >= filteredChoices.length) {
          lxSelect.activeChoiceIndex = 0;
        }
      }

      if (lxSelect.autocomplete) {
        LxDropdownService.open('dropdown-' + lxSelect.uuid, '#lx-select-selected-wrapper-' + lxSelect.uuid);
      }
    }

    function _keyLeft() {
      if (lxSelect.choicesViewMode !== 'panes' || lxSelect.panes.length < 2) {
        return;
      }

      var previousPaneIndex = lxSelect.panes.length - 2;
      lxSelect.activeChoiceIndex = (Object.keys(lxSelect.panes[previousPaneIndex]) || []).indexOf((toggledPanes[previousPaneIndex] || {}).key);

      _closePane(previousPaneIndex);
    }

    function _keyRemove() {
      if (lxSelect.filterModel || angular.isUndefined(lxSelect.getSelectedModel()) || !lxSelect.getSelectedModel().length) {
        return;
      }

      if (lxSelect.activeSelectedIndex === -1) {
        lxSelect.activeSelectedIndex = lxSelect.getSelectedModel().length - 1;
      } else {
        unselect(lxSelect.getSelectedModel()[lxSelect.activeSelectedIndex]);
      }
    }

    function _keyRight() {
      if (lxSelect.choicesViewMode !== 'panes' || lxSelect.activeChoiceIndex === -1) {
        return;
      }

      var paneOpened = _openPane(lxSelect.panes.length - 1, lxSelect.activeChoiceIndex, true);

      if (paneOpened) {
        lxSelect.activeChoiceIndex = 0;
      } else {
        _keySelect();
      }
    }

    function _keySelect() {
      var filteredChoices;

      if (lxSelect.choicesViewMode === 'panes') {
        filteredChoices = lxSelect.panes[lxSelect.panes.length - 1];

        if (!lxSelect.isLeaf(filteredChoices[lxSelect.activeChoiceIndex])) {
          return;
        }
      } else {
        filteredChoices = $filter('filterChoices')(lxSelect.choices, lxSelect.filter, lxSelect.filterModel);
      }

      if (filteredChoices.length && filteredChoices[lxSelect.activeChoiceIndex]) {
        lxSelect.toggleChoice(filteredChoices[lxSelect.activeChoiceIndex]);
      } else if (lxSelect.filterModel && lxSelect.allowNewValue) {
        if (angular.isArray(getSelectedModel())) {
          var value = angular.isFunction(lxSelect.newValueTransform) ? lxSelect.newValueTransform(lxSelect.filterModel) : lxSelect.filterModel;
          var identical = getSelectedModel().some(function (item) {
            return angular.equals(item, value);
          });

          if (!identical) {
            lxSelect.getSelectedModel().push(value);
          }
        }

        lxSelect.filterModel = undefined;
        LxDropdownService.close('dropdown-' + lxSelect.uuid);
      }
    }

    function _keyUp() {
      var filteredChoices;

      if (lxSelect.choicesViewMode === 'panes') {
        filteredChoices = Object.keys(lxSelect.panes[lxSelect.panes.length - 1]);
      } else {
        filteredChoices = $filter('filterChoices')(lxSelect.choices, lxSelect.filter, lxSelect.filterModel);
      }

      if (filteredChoices.length) {
        lxSelect.activeChoiceIndex -= 1;

        if (lxSelect.activeChoiceIndex < 0) {
          lxSelect.activeChoiceIndex = filteredChoices.length - 1;
        }
      }

      if (lxSelect.autocomplete) {
        LxDropdownService.open('dropdown-' + lxSelect.uuid, '#lx-select-selected-wrapper-' + lxSelect.uuid);
      }
    }

    function _onKeyDown(evt) {
      $scope.$apply(function applyKeyEvent() {
        lxSelect.keyEvent(evt);
      });
    }

    function _openPane(parentIndex, indexOrKey, checkIsLeaf) {
      if (angular.isDefined(toggledPanes[parentIndex])) {
        return false;
      }

      var pane = pane || lxSelect.choicesViewSize === 'large' ? lxSelect.panes[parentIndex] : lxSelect.openedPanes[parentIndex];

      if (angular.isUndefined(pane)) {
        return false;
      }

      var key = indexOrKey;

      if (angular.isObject(pane) && angular.isNumber(key)) {
        key = (Object.keys(pane) || [])[key];
      }

      if (checkIsLeaf && lxSelect.isLeaf(pane[key])) {
        return false;
      }

      if (lxSelect.choicesViewSize === 'large') {
        lxSelect.panes.push(pane[key]);
      } else {
        lxSelect.openedPanes.push(pane[key]);
      }

      toggledPanes[parentIndex] = {
        key: key,
        position: lxSelect.choicesViewSize === 'large' ? lxSelect.panes.length - 1 : lxSelect.openedPanes.length - 1,
        path: parentIndex === 0 ? key : toggledPanes[parentIndex - 1].path + '.' + key
      };
      return true;
    }

    function _searchPath(container, regexp, previousKey, limitToFields) {
      limitToFields = limitToFields || [];
      limitToFields = angular.isArray(limitToFields) ? limitToFields : [limitToFields];
      var results = [];
      angular.forEach(container, function forEachItemsInContainer(items, key) {
        if (limitToFields.length > 0 && limitToFields.indexOf(key) === -1) {
          return;
        }

        var pathToMatching = previousKey ? previousKey + '.' + key : key;
        var previousKeyAdded = false;
        var isLeaf = lxSelect.isLeaf(items);

        if (!isLeaf && angular.isString(key) && regexp.test(key) || angular.isString(items) && regexp.test(items)) {
          if (!previousKeyAdded && previousKey) {
            results.push(previousKey);
          }

          if (!isLeaf) {
            results.push(pathToMatching);
          }
        }

        if (angular.isArray(items) || angular.isObject(items)) {
          var newPaths = _searchPath(items, regexp, pathToMatching, isLeaf ? lxSelect.filterFields : []);

          if (angular.isDefined(newPaths) && newPaths.length > 0) {
            if (previousKey) {
              results.push(previousKey);
              previousKeyAdded = true;
            }

            results = results.concat(newPaths);
          }
        }
      });
      return results;
    }

    function arrayObjectIndexOf(arr, obj) {
      for (var i = 0; i < arr.length; i++) {
        if (angular.equals(arr[i], obj)) {
          return i;
        }
      }

      return -1;
    }

    function areChoicesOpened() {
      return LxDropdownService.isOpen('dropdown-' + lxSelect.uuid);
    }

    function displayChoice(_choice) {
      var choiceScope = {
        $choice: _choice
      };
      var interpolatedChoice = $interpolate(choiceTemplate)(choiceScope);
      interpolatedChoice = '<span>' + interpolatedChoice + '</span>';
      return $sce.trustAsHtml(lxSelect.matchingPaths ? $filter('lxHighlight')(interpolatedChoice, lxSelect.filterModel, true) : interpolatedChoice);
    }

    function displaySelected(_selected) {
      var selectedScope = {};

      if (!angular.isArray(lxSelect.choices)) {
        var found = false;

        for (var header in lxSelect.choices) {
          if (found) {
            break;
          }

          if (lxSelect.choices.hasOwnProperty(header)) {
            for (var idx = 0, len = lxSelect.choices[header].length; idx < len; idx++) {
              if (angular.equals(_selected, lxSelect.choices[header][idx])) {
                selectedScope.$selectedSubheader = header;
                found = true;
                break;
              }
            }
          }
        }
      }

      if (angular.isDefined(_selected)) {
        selectedScope.$selected = _selected;
      } else {
        selectedScope.$selected = getSelectedModel();
      }

      return $sce.trustAsHtml($interpolate(selectedTemplate)(selectedScope));
    }

    function displaySubheader(_subheader) {
      return $sce.trustAsHtml(lxSelect.matchingPaths ? $filter('lxHighlight')(_subheader, lxSelect.filterModel, true) : _subheader);
    }

    function getFilteredChoices() {
      return $filter('filterChoices')(lxSelect.choices, lxSelect.filter, lxSelect.filterModel);
    }

    function getSelectedModel() {
      if (angular.isDefined(lxSelect.modelToSelection) || angular.isDefined(lxSelect.selectionToModel)) {
        return lxSelect.unconvertedModel;
      } else {
        return lxSelect.ngModel;
      }
    }

    function isLeaf(obj) {
      if (angular.isUndefined(obj)) {
        return false;
      }

      if (angular.isArray(obj)) {
        return false;
      }

      if (!angular.isObject(obj)) {
        return true;
      }

      if (obj.isLeaf) {
        return true;
      }

      var isLeaf = false;
      var keys = Object.keys(obj);

      for (var i = 0, len = keys.length; i < len; i++) {
        var property = keys[i];

        if (property.charAt(0) === '$') {
          continue;
        }

        if (!angular.isArray(obj[property]) && !angular.isObject(obj[property])) {
          isLeaf = true;
          break;
        }
      }

      return isLeaf;
    }

    function isPaneToggled(parentIndex, indexOrKey) {
      var pane = lxSelect.choicesViewSize === 'large' ? lxSelect.panes[parentIndex] : lxSelect.openedPanes[parentIndex];

      if (angular.isUndefined(pane)) {
        return false;
      }

      var key = indexOrKey;

      if (angular.isObject(pane) && angular.isNumber(indexOrKey)) {
        key = (Object.keys(pane) || [])[indexOrKey];
      }

      return angular.isDefined(toggledPanes[parentIndex]) && toggledPanes[parentIndex].key === key;
    }

    function isMatchingPath(parentIndex, indexOrKey) {
      var pane = lxSelect.choicesViewSize === 'large' ? lxSelect.panes[parentIndex] : lxSelect.openedPanes[parentIndex];

      if (angular.isUndefined(pane)) {
        return;
      }

      var key = indexOrKey;

      if (angular.isObject(pane) && angular.isNumber(indexOrKey)) {
        key = (Object.keys(pane) || [])[indexOrKey];
      }

      if (parentIndex === 0) {
        return _findIndex(lxSelect.matchingPaths, key) !== -1;
      }

      var previous = toggledPanes[parentIndex - 1];

      if (angular.isUndefined(previous)) {
        return false;
      }

      return _findIndex(lxSelect.matchingPaths, previous.path + '.' + key) !== -1;
    }

    function isSelected(_choice) {
      if (lxSelect.multiple && angular.isDefined(getSelectedModel())) {
        return arrayObjectIndexOf(getSelectedModel(), _choice) !== -1;
      } else if (angular.isDefined(getSelectedModel())) {
        return angular.equals(getSelectedModel(), _choice);
      }
    }

    function isMaxSelected() {
      if (lxSelect.multiple && angular.isDefined(lxSelect.max)) {
        return lxSelect.ngModel.length >= parseInt(lxSelect.max, 10);
      }

      return false;
    }

    function keyEvent(evt) {
      if (evt.keyCode !== 8) {
        lxSelect.activeSelectedIndex = -1;
      }

      if (!LxDropdownService.isOpen('dropdown-' + lxSelect.uuid)) {
        lxSelect.activeChoiceIndex = -1;
      }

      switch (evt.keyCode) {
        case 8:
          _keyRemove();

          break;

        case 13:
          _keySelect();

          evt.preventDefault();
          break;

        case 37:
          if (lxSelect.activeChoiceIndex > -1) {
            _keyLeft();

            evt.preventDefault();
          }

          break;

        case 38:
          _keyUp();

          evt.preventDefault();
          break;

        case 39:
          if (lxSelect.activeChoiceIndex > -1) {
            _keyRight();

            evt.preventDefault();
          }

          break;

        case 40:
          _keyDown();

          evt.preventDefault();
          break;

        default:
          break;
      }
    }

    function registerChoiceTemplate(_choiceTemplate) {
      choiceTemplate = _choiceTemplate;
    }

    function registerSelectedTemplate(_selectedTemplate) {
      selectedTemplate = _selectedTemplate;
    }

    function select(_choice, cb) {
      cb = cb || angular.noop;

      if (lxSelect.multiple) {
        if (angular.isUndefined(lxSelect.ngModel)) {
          lxSelect.ngModel = [];
        }

        if (isMaxSelected()) {
          cb();
          return;
        }
      }

      if (angular.isDefined(lxSelect.selectionToModel)) {
        lxSelect.selectionToModel({
          data: _choice,
          callback: function callback(resp) {
            if (lxSelect.multiple) {
              lxSelect.ngModel.push(resp);
            } else {
              lxSelect.ngModel = resp;
            }

            if (lxSelect.autocomplete) {
              $element.find('.lx-select-selected__filter').focus();
            }

            if (lxSelect.choicesViewMode === 'panes' && lxSelect.displayFilter && lxSelect.multiple) {
              $element.find('.lx-select-selected__filter input').focus();
            }

            if (angular.isFunction(cb)) {
              $timeout(cb);
            }
          }
        });
      } else {
        if (lxSelect.multiple) {
          lxSelect.ngModel.push(_choice);
        } else {
          lxSelect.ngModel = _choice;
        }

        if (lxSelect.autocomplete) {
          $element.find('.lx-select-selected__filter').focus();
        }

        if (lxSelect.choicesViewMode === 'panes' && lxSelect.displayFilter && lxSelect.multiple) {
          $element.find('.lx-select-selected__filter input').focus();
        }

        if (angular.isFunction(cb)) {
          $timeout(cb);
        }
      }
    }

    function toggleChoice(choice, evt) {
      if (lxSelect.multiple && !lxSelect.autocomplete && angular.isDefined(evt)) {
        evt.stopPropagation();
      }

      if (lxSelect.areChoicesOpened() && lxSelect.multiple) {
        var dropdownElement = angular.element(angular.element(evt.target).closest('.dropdown-menu--is-open')[0]);

        if (dropdownElement.scrollTop() > 0) {
          var dropdownContentElement = angular.element(dropdownElement.find('.dropdown-menu__content')[0]);
          var dropdownFilterElement = angular.element(dropdownContentElement.find('.lx-select-choices__filter')[0]);
          var newHeight = dropdownContentElement.height();
          newHeight -= dropdownFilterElement.length ? dropdownFilterElement.outerHeight() : 0;
          var dropdownListElement = angular.element(dropdownContentElement.find('ul > div')[0]);
          dropdownListElement.css('height', newHeight + 'px');

          lxSelect.resetDropdownSize = function () {
            dropdownListElement.css('height', 'auto');
            lxSelect.resetDropdownSize = undefined;
          };
        }
      }

      if (lxSelect.multiple && isSelected(choice)) {
        lxSelect.unselect(choice);
      } else {
        lxSelect.select(choice);
      }

      if (lxSelect.autocomplete) {
        lxSelect.activeChoiceIndex = -1;
        lxSelect.filterModel = undefined;
      }

      if (lxSelect.autocomplete || lxSelect.choicesViewMode === 'panes' && !lxSelect.multiple) {
        LxDropdownService.close('dropdown-' + lxSelect.uuid);
      }
    }

    function togglePane(evt, parentIndex, indexOrKey, selectLeaf) {
      selectLeaf = angular.isUndefined(selectLeaf) ? true : selectLeaf;
      var pane = lxSelect.choicesViewSize === 'large' ? lxSelect.panes[parentIndex] : lxSelect.openedPanes[parentIndex];

      if (angular.isUndefined(pane)) {
        return;
      }

      var key = indexOrKey;

      if (angular.isObject(pane) && angular.isNumber(indexOrKey)) {
        key = (Object.keys(pane) || [])[indexOrKey];
      }

      if (angular.isDefined(toggledPanes[parentIndex])) {
        var previousKey = toggledPanes[parentIndex].key;

        _closePane(parentIndex);

        if (previousKey === key) {
          return;
        }
      }

      var isLeaf = lxSelect.isLeaf(pane[key]);

      if (isLeaf) {
        if (selectLeaf) {
          lxSelect.toggleChoice(pane[key], evt);
        }

        return;
      }

      _openPane(parentIndex, key, false);
    }

    function unselect(_choice, cb) {
      cb = cb || angular.noop;

      if (angular.isDefined(lxSelect.selectionToModel)) {
        lxSelect.selectionToModel({
          data: _choice,
          callback: function callback(resp) {
            removeElement(lxSelect.ngModel, resp);

            if (lxSelect.autocomplete) {
              $element.find('.lx-select-selected__filter').focus();
              lxSelect.activeSelectedIndex = -1;
            }

            if (lxSelect.choicesViewMode === 'panes' && lxSelect.displayFilter && (lxSelect.ngModel.length === 0 || lxSelect.multiple)) {
              $element.find('.lx-select-selected__filter input').focus();
            }

            if (angular.isFunction(cb)) {
              $timeout(cb);
            }
          }
        });
        removeElement(lxSelect.unconvertedModel, _choice);
      } else {
        removeElement(lxSelect.ngModel, _choice);

        if (lxSelect.autocomplete) {
          $element.find('.lx-select-selected__filter').focus();
          lxSelect.activeSelectedIndex = -1;
        }

        if (lxSelect.choicesViewMode === 'panes' && lxSelect.displayFilter && (lxSelect.ngModel.length === 0 || lxSelect.multiple)) {
          $element.find('.lx-select-selected__filter input').focus();
        }

        if (angular.isFunction(cb)) {
          $timeout(cb);
        }
      }
    }

    function updateFilter() {
      if (angular.isFunction(lxSelect.resetDropdownSize)) {
        lxSelect.resetDropdownSize();
      }

      if (angular.isDefined(lxSelect.filter)) {
        lxSelect.matchingPaths = lxSelect.filter({
          newValue: lxSelect.filterModel
        });
      } else if (lxSelect.choicesViewMode === 'panes') {
        lxSelect.matchingPaths = lxSelect.searchPath(lxSelect.filterModel);

        _closePanes();
      }

      if (lxSelect.autocomplete) {
        lxSelect.activeChoiceIndex = -1;

        if (lxSelect.filterModel) {
          LxDropdownService.open('dropdown-' + lxSelect.uuid, '#lx-select-selected-wrapper-' + lxSelect.uuid);
        } else {
          LxDropdownService.close('dropdown-' + lxSelect.uuid);
        }
      }

      if (lxSelect.choicesViewMode === 'panes' && angular.isDefined(lxSelect.matchingPaths) && lxSelect.matchingPaths.length > 0) {
        var longest = _getLongestMatchingPath();

        if (!longest) {
          return;
        }

        var longestPath = longest.split('.');

        if (longestPath.length === 0) {
          return;
        }

        angular.forEach(longestPath, function forEachPartOfTheLongestPath(part, index) {
          _openPane(index, part, index === longestPath.length - 1);
        });
      }
    }

    function helperDisplayable() {
      if (angular.isUndefined(lxSelect.helperMessage)) {
        return false;
      }

      if (angular.isDefined(lxSelect.helper)) {
        return lxSelect.helper;
      }

      var choices = lxSelect.getFilteredChoices();

      if (angular.isArray(choices)) {
        return !choices.length;
      } else if (angular.isObject(choices)) {
        return !(Object.keys(choices) || []).length;
      }

      return true;
    }

    function removeElement(model, element) {
      var index = -1;

      for (var i = 0, len = model.length; i < len; i++) {
        if (angular.equals(element, model[i])) {
          index = i;
          break;
        }
      }

      if (index > -1) {
        model.splice(index, 1);
      }
    }

    function searchPath(newValue) {
      if (!newValue || newValue.length < 2) {
        return undefined;
      }

      var regexp = new RegExp(LxUtilsService.escapeRegexp(newValue), 'ig');
      return _searchPath(lxSelect.choices, regexp);
    }

    lxSelect.areChoicesOpened = areChoicesOpened;
    lxSelect.displayChoice = displayChoice;
    lxSelect.displaySelected = displaySelected;
    lxSelect.displaySubheader = displaySubheader;
    lxSelect.getFilteredChoices = getFilteredChoices;
    lxSelect.getSelectedModel = getSelectedModel;
    lxSelect.helperDisplayable = helperDisplayable;
    lxSelect.isLeaf = isLeaf;
    lxSelect.isMatchingPath = isMatchingPath;
    lxSelect.isPaneToggled = isPaneToggled;
    lxSelect.isSelected = isSelected;
    lxSelect.isMaxSelected = isMaxSelected;
    lxSelect.keyEvent = keyEvent;
    lxSelect.registerChoiceTemplate = registerChoiceTemplate;
    lxSelect.registerSelectedTemplate = registerSelectedTemplate;
    lxSelect.searchPath = searchPath;
    lxSelect.select = select;
    lxSelect.toggleChoice = toggleChoice;
    lxSelect.togglePane = togglePane;
    lxSelect.unselect = unselect;
    lxSelect.updateFilter = updateFilter;
    $scope.$watch(function watcherChoices() {
      return lxSelect.choices;
    }, function watchChoices(newChoices, oldChoices) {
      if (angular.isUndefined(lxSelect.choices) || lxSelect.choices === null) {
        lxSelect.panes = [];
        return;
      }

      lxSelect.panes = [lxSelect.choices];
      lxSelect.openedPanes = [lxSelect.choices];
    }, true);
    $scope.$on('lx-dropdown__close-end', function onDropdownClose(evt, dropdownId) {
      if (lxSelect.choicesViewMode !== 'panes' || dropdownId !== 'dropdown-' + lxSelect.uuid) {
        return;
      }

      angular.element(document).off('keydown', _onKeyDown);
      lxSelect.filterModel = undefined;
      lxSelect.matchingPaths = undefined;
      lxSelect.activeChoiceIndex = -1;

      _closePanes();
    });
    $scope.$on('lx-dropdown__open-start', function onDropdownOpen(evt, dropdownId) {
      if (lxSelect.choicesViewMode !== 'panes' || dropdownId !== 'dropdown-' + lxSelect.uuid) {
        return;
      }

      angular.element(document).on('keydown', _onKeyDown);
      $timeout(function delayFocusSearchFilter() {
        $element.find('.lx-select-selected__filter input').focus();
      });
    });
    $scope.$on('lx-dropdown__scroll-end', function (evt, dropdownId) {
      if (typeof lxSelect.infiniteScroll !== 'function' || dropdownId !== 'dropdown-' + lxSelect.uuid || lxSelect.loading) {
        return;
      }

      lxSelect.infiniteScroll()().then(function fetchNewData(newData) {
        if (newData && newData.length) {
          lxSelect.choices = lxSelect.choices.concat(newData);
        }
      }).catch(function () {});
    });
  }

  function lxSelectSelected() {
    return {
      restrict: 'E',
      require: ['lxSelectSelected', '^lxSelect'],
      templateUrl: 'select-selected.html',
      link: link,
      controller: LxSelectSelectedController,
      controllerAs: 'lxSelectSelected',
      bindToController: true,
      transclude: true
    };

    function link(scope, element, attrs, ctrls, transclude) {
      ctrls[0].setParentController(ctrls[1]);
      transclude(scope, function (clone) {
        var template = '';

        for (var i = 0; i < clone.length; i++) {
          template += clone[i].data || clone[i].outerHTML || '';
        }

        ctrls[1].registerSelectedTemplate(template);
      });
    }
  }

  function LxSelectSelectedController() {
    var lxSelectSelected = this;
    lxSelectSelected.clearModel = clearModel;
    lxSelectSelected.setParentController = setParentController;
    lxSelectSelected.removeSelected = removeSelected;

    function clearModel(_event) {
      _event.stopPropagation();

      lxSelectSelected.parentCtrl.ngModel = undefined;
      lxSelectSelected.parentCtrl.unconvertedModel = undefined;
    }

    function setParentController(_parentCtrl) {
      lxSelectSelected.parentCtrl = _parentCtrl;
    }

    function removeSelected(_selected, _event) {
      _event.stopPropagation();

      lxSelectSelected.parentCtrl.unselect(_selected);
    }
  }

  function lxSelectChoices() {
    return {
      restrict: 'E',
      require: ['lxSelectChoices', '^lxSelect'],
      templateUrl: 'select-choices.html',
      link: link,
      controller: LxSelectChoicesController,
      controllerAs: 'lxSelectChoices',
      bindToController: true,
      transclude: true
    };

    function link(scope, element, attrs, ctrls, transclude) {
      ctrls[0].setParentController(ctrls[1]);
      transclude(scope, function (clone) {
        var template = '';

        for (var i = 0; i < clone.length; i++) {
          template += clone[i].data || clone[i].outerHTML || '';
        }

        ctrls[1].registerChoiceTemplate(template);
      });
    }
  }

  LxSelectChoicesController.$inject = ['$scope', '$timeout', '$window'];

  function LxSelectChoicesController($scope, $timeout, $window) {
    var lxSelectChoices = this;
    var timer;
    lxSelectChoices.isArray = isArray;
    lxSelectChoices.setParentController = setParentController;
    $scope.$on('$destroy', function () {
      $timeout.cancel(timer);
    });

    function isArray(choices) {
      choices = angular.isUndefined(choices) ? lxSelectChoices.parentCtrl.choices : choices;
      return angular.isArray(choices);
    }

    function setParentController(_parentCtrl) {
      lxSelectChoices.parentCtrl = _parentCtrl;
      $scope.$watch(function () {
        return lxSelectChoices.parentCtrl.ngModel;
      }, function (newModel, oldModel) {
        timer = $timeout(function () {
          if (newModel !== oldModel && angular.isDefined(lxSelectChoices.parentCtrl.ngChange)) {
            lxSelectChoices.parentCtrl.ngChange({
              newValue: newModel,
              oldValue: oldModel
            });
          }

          if (angular.isDefined(lxSelectChoices.parentCtrl.modelToSelection) || angular.isDefined(lxSelectChoices.parentCtrl.selectionToModel)) {
            toSelection();
          }
        });
      }, true);
      lxSelectChoices.parentCtrl.choicesViewSize = $window.innerWidth < 980 ? 'small' : 'large';
      angular.element($window).on('resize', function onResize(evt) {
        if (evt.target.innerWidth < 980) {
          lxSelectChoices.parentCtrl.choicesViewSize = 'small';
        } else {
          lxSelectChoices.parentCtrl.choicesViewSize = 'large';
        }
      });
    }

    function toSelection() {
      if (lxSelectChoices.parentCtrl.multiple) {
        lxSelectChoices.parentCtrl.unconvertedModel = [];
        angular.forEach(lxSelectChoices.parentCtrl.ngModel, function (item) {
          lxSelectChoices.parentCtrl.modelToSelection({
            data: item,
            callback: function callback(resp) {
              lxSelectChoices.parentCtrl.unconvertedModel.push(resp);
            }
          });
        });
      } else {
        lxSelectChoices.parentCtrl.modelToSelection({
          data: lxSelectChoices.parentCtrl.ngModel,
          callback: function callback(resp) {
            lxSelectChoices.parentCtrl.unconvertedModel = resp;
          }
        });
      }
    }
  }
})();

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var fails = __webpack_require__(3);
var isArray = __webpack_require__(46);
var isObject = __webpack_require__(5);
var toObject = __webpack_require__(15);
var toLength = __webpack_require__(8);
var createProperty = __webpack_require__(47);
var arraySpeciesCreate = __webpack_require__(45);
var arrayMethodHasSpeciesSupport = __webpack_require__(26);
var wellKnownSymbol = __webpack_require__(2);

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

var IS_CONCAT_SPREADABLE_SUPPORT = !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var $some = __webpack_require__(27).some;
var sloppyArrayMethod = __webpack_require__(21);

// `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some
$({ target: 'Array', proto: true, forced: sloppyArrayMethod('some') }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(1);
var toObject = __webpack_require__(15);
var nativeKeys = __webpack_require__(66);
var fails = __webpack_require__(3);

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__(51);
var isRegExp = __webpack_require__(74);
var anObject = __webpack_require__(4);
var requireObjectCoercible = __webpack_require__(12);
var speciesConstructor = __webpack_require__(56);
var advanceStringIndex = __webpack_require__(52);
var toLength = __webpack_require__(8);
var callRegExpExec = __webpack_require__(53);
var regexpExec = __webpack_require__(28);
var fails = __webpack_require__(3);

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);


/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(69);
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(142);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(154);
/* harmony import */ var core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise_finally__WEBPACK_IMPORTED_MODULE_3__);





(function () {
  'use strict';

  angular.module('lumx.stepper').directive('lxStepper', lxStepper).directive('lxStep', lxStep).directive('lxStepNav', lxStepNav);

  function lxStepper() {
    return {
      restrict: 'E',
      templateUrl: 'stepper.html',
      scope: {
        cancel: '&?lxCancel',
        complete: '&lxComplete',
        controls: '=?lxShowControls',
        id: '@?lxId',
        isLinear: '=?lxIsLinear',
        labels: '=?lxLabels',
        layout: '@?lxLayout'
      },
      controller: LxStepperController,
      controllerAs: 'lxStepper',
      bindToController: true,
      transclude: true
    };
  }

  LxStepperController.$inject = ['$scope'];

  function LxStepperController($scope) {
    var lxStepper = this;
    var _classes = [];
    var _defaultValues = {
      isLinear: true,
      labels: {
        'back': 'Back',
        'cancel': 'Cancel',
        'continue': 'Continue',
        'optional': 'Optional'
      },
      layout: 'horizontal'
    };
    lxStepper.addStep = addStep;
    lxStepper.getClasses = getClasses;
    lxStepper.goToStep = goToStep;
    lxStepper.isComplete = isComplete;
    lxStepper.updateStep = updateStep;
    lxStepper.controls = angular.isDefined(lxStepper.controls) ? lxStepper.controls : true;
    lxStepper.activeIndex = 0;
    lxStepper.isLinear = angular.isDefined(lxStepper.isLinear) ? lxStepper.isLinear : _defaultValues.isLinear;
    lxStepper.labels = angular.isDefined(lxStepper.labels) ? lxStepper.labels : _defaultValues.labels;
    lxStepper.layout = angular.isDefined(lxStepper.layout) ? lxStepper.layout : _defaultValues.layout;
    lxStepper.steps = [];

    function addStep(step) {
      lxStepper.steps.push(step);
    }

    function getClasses() {
      _classes.length = 0;

      _classes.push('lx-stepper--layout-' + lxStepper.layout);

      if (lxStepper.isLinear) {
        _classes.push('lx-stepper--is-linear');
      }

      var step = lxStepper.steps[lxStepper.activeIndex];

      if (angular.isDefined(step)) {
        if (step.feedback) {
          _classes.push('lx-stepper--step-has-feedback');
        }

        if (step.isLoading) {
          _classes.push('lx-stepper--step-is-loading');
        }
      }

      return _classes;
    }

    function goToStep(index, bypass) {
      var stepBeforeLastOptionalStep;

      if (!bypass && lxStepper.isLinear) {
        for (var i = index - 1; i >= 0; i--) {
          if (angular.isDefined(lxStepper.steps[i]) && !lxStepper.steps[i].isOptional) {
            stepBeforeLastOptionalStep = lxStepper.steps[i];
            break;
          }
        }

        if (angular.isDefined(stepBeforeLastOptionalStep)) {
          if (!stepBeforeLastOptionalStep.pristine && angular.isFunction(stepBeforeLastOptionalStep.validator) && stepBeforeLastOptionalStep.isEditable) {
            var validity = stepBeforeLastOptionalStep.validator();

            if (validity === true) {
              stepBeforeLastOptionalStep.isValid = true;
            } else {
              stepBeforeLastOptionalStep.isValid = false;
              stepBeforeLastOptionalStep.errorMessage = validity;
            }
          }

          if (stepBeforeLastOptionalStep.isValid === true) {
            bypass = true;
          }
        }
      }

      if (!bypass && lxStepper.isLinear && angular.isDefined(lxStepper.steps[index - 1]) && (angular.isUndefined(lxStepper.steps[index - 1].isValid) || lxStepper.steps[index - 1].isValid === false)) {
        return;
      }

      if (index < lxStepper.steps.length) {
        lxStepper.activeIndex = parseInt(index);
        lxStepper.steps[lxStepper.activeIndex].pristine = false;
        $scope.$emit('lx-stepper__step', lxStepper.id, index, index === 0, index === lxStepper.steps.length - 1);
      }
    }

    function isComplete() {
      var countMandatory = 0;
      var countValid = 0;

      for (var i = 0, len = lxStepper.steps.length; i < len; i++) {
        if (!lxStepper.steps[i].isOptional) {
          countMandatory++;

          if (lxStepper.steps[i].isValid === true) {
            countValid++;
          }
        }
      }

      if (countValid === countMandatory) {
        lxStepper.complete();
        return true;
      }
    }

    function updateStep(step) {
      for (var i = 0, len = lxStepper.steps.length; i < len; i++) {
        if (lxStepper.steps[i].uuid === step.uuid) {
          lxStepper.steps[i].index = step.index;
          lxStepper.steps[i].label = step.label;
          return;
        }
      }
    }

    $scope.$on('lx-stepper__go-to-step', function (event, id, stepIndex, bypass) {
      if (angular.isDefined(id) && id !== lxStepper.id) {
        return;
      }

      goToStep(stepIndex, bypass);
    });
    $scope.$on('lx-stepper__cancel', function (event, id) {
      if (angular.isDefined(id) && id !== lxStepper.id || !angular.isFunction(lxStepper.cancel)) {
        return;
      }

      lxStepper.cancel();
    });
  }

  function lxStep() {
    return {
      restrict: 'E',
      require: ['lxStep', '^lxStepper'],
      templateUrl: 'step.html',
      scope: {
        feedback: '@?lxFeedback',
        isEditable: '=?lxIsEditable',
        isOptional: '=?lxIsOptional',
        isValid: '=?lxIsValid',
        label: '@lxLabel',
        submit: '&?lxSubmit',
        validate: '&?lxValidate'
      },
      link: link,
      controller: LxStepController,
      controllerAs: 'lxStep',
      bindToController: true,
      replace: true,
      transclude: true
    };

    function link(scope, element, attrs, ctrls) {
      ctrls[0].init(ctrls[1], element.index());
      attrs.$observe('lxFeedback', function (feedback) {
        ctrls[0].setFeedback(feedback);
      });
      attrs.$observe('lxLabel', function (label) {
        ctrls[0].setLabel(label);
      });
      attrs.$observe('lxIsEditable', function (isEditable) {
        ctrls[0].setIsEditable(isEditable);
      });
      attrs.$observe('lxIsOptional', function (isOptional) {
        ctrls[0].setIsOptional(isOptional);
      });
    }
  }

  LxStepController.$inject = ['$q', '$scope', 'LxNotificationService', 'LxUtilsService'];

  function LxStepController($q, $scope, LxNotificationService, LxUtilsService) {
    var lxStep = this;
    var _classes = [];

    var _nextStepIndex;

    lxStep.getClasses = getClasses;
    lxStep.init = init;
    lxStep.previousStep = previousStep;
    lxStep.setFeedback = setFeedback;
    lxStep.setLabel = setLabel;
    lxStep.setIsEditable = setIsEditable;
    lxStep.setIsOptional = setIsOptional;
    lxStep.submitStep = submitStep;
    lxStep.step = {
      errorMessage: undefined,
      feedback: undefined,
      index: undefined,
      isEditable: false,
      isLoading: false,
      isOptional: false,
      isValid: lxStep.isValid,
      label: undefined,
      pristine: true,
      uuid: LxUtilsService.generateUUID(),
      validator: undefined
    };

    function getClasses() {
      _classes.length = 0;

      if (lxStep.step.index === lxStep.parent.activeIndex) {
        _classes.push('lx-step--is-active');
      }

      return _classes;
    }

    function init(parent, index) {
      lxStep.parent = parent;
      lxStep.step.index = index;
      lxStep.step.validator = lxStep.validate;
      lxStep.parent.addStep(lxStep.step);
    }

    function previousStep() {
      if (lxStep.step.index > 0) {
        lxStep.parent.goToStep(lxStep.step.index - 1);
      }
    }

    function setFeedback(feedback) {
      lxStep.step.feedback = feedback;
      updateParentStep();
    }

    function setLabel(label) {
      lxStep.step.label = label;
      updateParentStep();
    }

    function setIsEditable(isEditable) {
      lxStep.step.isEditable = isEditable;
      updateParentStep();
    }

    function setIsOptional(isOptional) {
      lxStep.step.isOptional = isOptional;
      updateParentStep();
    }

    function submitStep() {
      if (lxStep.step.isValid === true && !lxStep.step.isEditable) {
        lxStep.parent.goToStep(_nextStepIndex, true);
        return;
      }

      var validateFunction = lxStep.validate;
      var validity = true;

      if (angular.isFunction(validateFunction)) {
        validity = validateFunction();
      }

      if (validity === true) {
        $scope.$emit('lx-stepper__step-loading', lxStep.parent.id, lxStep.step.index);
        lxStep.step.isLoading = true;
        updateParentStep();
        var submitFunction = lxStep.submit;

        if (!angular.isFunction(submitFunction)) {
          submitFunction = function submitFunction() {
            return $q(function (resolve) {
              resolve();
            });
          };
        }

        var promise = submitFunction();
        promise.then(function (nextStepIndex) {
          lxStep.step.isValid = true;
          updateParentStep();
          var isComplete = lxStep.parent.isComplete();

          if (!isComplete) {
            _nextStepIndex = angular.isDefined(nextStepIndex) && nextStepIndex > lxStep.parent.activeIndex && (!lxStep.parent.isLinear || lxStep.parent.isLinear && lxStep.parent.steps[nextStepIndex - 1].isOptional) ? nextStepIndex : lxStep.step.index + 1;
            lxStep.parent.goToStep(_nextStepIndex, true);
          } else {
            $scope.$emit('lx-stepper__completed', lxStepper.id);
          }
        }).catch(function (error) {
          LxNotificationService.error(error);
        }).finally(function () {
          $scope.$emit('lx-stepper__step-loaded', lxStep.parent.id, lxStep.step.index);
          lxStep.step.isLoading = false;
          updateParentStep();
        });
      } else {
        lxStep.step.isValid = false;
        lxStep.step.errorMessage = validity;
        updateParentStep();
      }
    }

    function updateParentStep() {
      lxStep.parent.updateStep(lxStep.step);
    }

    $scope.$on('lx-stepper__submit-step', function (event, id, index) {
      if (angular.isDefined(id) && id !== lxStep.parent.id || index !== lxStep.step.index) {
        return;
      }

      submitStep();
    });
    $scope.$on('lx-stepper__previous-step', function (event, id, index) {
      if (angular.isDefined(id) && id !== lxStep.parent.id || index !== lxStep.step.index) {
        return;
      }

      previousStep();
    });
  }

  function lxStepNav() {
    return {
      restrict: 'E',
      require: ['lxStepNav', '^lxStepper'],
      templateUrl: 'step-nav.html',
      scope: {
        activeIndex: '@lxActiveIndex',
        step: '=lxStep'
      },
      link: link,
      controller: LxStepNavController,
      controllerAs: 'lxStepNav',
      bindToController: true,
      replace: true,
      transclude: false
    };

    function link(scope, element, attrs, ctrls) {
      ctrls[0].init(ctrls[1]);
    }
  }

  function LxStepNavController() {
    var lxStepNav = this;
    var _classes = [];
    lxStepNav.getClasses = getClasses;
    lxStepNav.init = init;

    function getClasses() {
      _classes.length = 0;

      if (parseInt(lxStepNav.step.index) === parseInt(lxStepNav.activeIndex)) {
        _classes.push('lx-step-nav--is-active');
      }

      if (lxStepNav.step.isValid === true) {
        _classes.push('lx-step-nav--is-valid');
      } else if (lxStepNav.step.isValid === false) {
        _classes.push('lx-step-nav--has-error');
      }

      if (lxStepNav.step.isEditable) {
        _classes.push('lx-step-nav--is-editable');
      }

      if (lxStepNav.step.isOptional) {
        _classes.push('lx-step-nav--is-optional');
      }

      return _classes;
    }

    function init(parent, index) {
      lxStepNav.parent = parent;
    }
  }
})();

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var IS_PURE = __webpack_require__(40);
var global = __webpack_require__(0);
var path = __webpack_require__(62);
var NativePromise = __webpack_require__(76);
var redefine = __webpack_require__(7);
var redefineAll = __webpack_require__(143);
var setToStringTag = __webpack_require__(144);
var setSpecies = __webpack_require__(75);
var isObject = __webpack_require__(5);
var aFunction = __webpack_require__(23);
var anInstance = __webpack_require__(145);
var classof = __webpack_require__(10);
var iterate = __webpack_require__(146);
var checkCorrectnessOfIteration = __webpack_require__(150);
var speciesConstructor = __webpack_require__(56);
var task = __webpack_require__(78).set;
var microtask = __webpack_require__(151);
var promiseResolve = __webpack_require__(80);
var hostReportErrors = __webpack_require__(152);
var newPromiseCapabilityModule = __webpack_require__(81);
var perform = __webpack_require__(153);
var userAgent = __webpack_require__(79);
var InternalStateModule = __webpack_require__(59);
var isForced = __webpack_require__(44);
var wellKnownSymbol = __webpack_require__(2);

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = global.fetch;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  // correct subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var empty = function () { /* empty */ };
  var FakePromise = (promise.constructor = {})[SPECIES] = function (exec) {
    exec(empty, empty);
  };
  // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !((IS_NODE || typeof PromiseRejectionEvent == 'function')
    && (!IS_PURE || promise['finally'])
    && promise.then(empty) instanceof FakePromise
    // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // we can't detect it synchronously, so just check versions
    && v8.indexOf('6.6') !== 0
    && userAgent.indexOf('Chrome/66') === -1);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (promise, state, isReject) {
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
            reject(TypeError('Promise-chain cycle'));
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
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (handler = global['on' + name]) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
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
  notify(promise, state, true);
};

var internalResolve = function (promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
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
      notify(promise, state, false);
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
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    setInternalState(this, {
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
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
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
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function') {
    nativeThen = NativePromise.prototype.then;

    // wrap native Promise#then for native async functions
    redefine(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected);
    });

    // wrap fetch result
    if (typeof $fetch == 'function') $({ global: true, enumerable: true, forced: true }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
      }
    });
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = path[PROMISE];

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
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
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(7);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(11).f;
var has = __webpack_require__(14);
var wellKnownSymbol = __webpack_require__(2);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),
/* 145 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);
var isArrayIteratorMethod = __webpack_require__(147);
var toLength = __webpack_require__(8);
var bind = __webpack_require__(48);
var getIteratorMethod = __webpack_require__(148);
var callWithSafeIterationClosing = __webpack_require__(149);

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, step;

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

  while (!(step = iterator.next()).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(2);
var Iterators = __webpack_require__(77);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(70);
var Iterators = __webpack_require__(77);
var wellKnownSymbol = __webpack_require__(2);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(4);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(2);

var ITERATOR = wellKnownSymbol('iterator');
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
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
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


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);
var getOwnPropertyDescriptor = __webpack_require__(34).f;
var classof = __webpack_require__(10);
var macrotask = __webpack_require__(78).set;
var userAgent = __webpack_require__(79);

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process';
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
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
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  } else if (MutationObserver && !/(iphone|ipod|ipad).*applewebkit/i.test(userAgent)) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
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
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(0);

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),
/* 153 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(1);
var IS_PURE = __webpack_require__(40);
var NativePromise = __webpack_require__(76);
var getBuiltIn = __webpack_require__(19);
var speciesConstructor = __webpack_require__(56);
var promiseResolve = __webpack_require__(80);
var redefine = __webpack_require__(7);

// `Promise.prototype.finally` method
// https://tc39.github.io/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true }, {
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
if (!IS_PURE && typeof NativePromise == 'function' && !NativePromise.prototype['finally']) {
  redefine(NativePromise.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
}


/***/ }),
/* 155 */
/***/ (function(module, exports) {

(function () {
  'use strict';

  angular.module('lumx.switch').directive('lxSwitch', lxSwitch).directive('lxSwitchLabel', lxSwitchLabel).directive('lxSwitchHelp', lxSwitchHelp);

  function lxSwitch() {
    return {
      restrict: 'E',
      templateUrl: 'switch.html',
      scope: {
        ngModel: '=',
        name: '@?',
        ngTrueValue: '@?',
        ngFalseValue: '@?',
        ngChange: '&?',
        ngDisabled: '=?',
        lxColor: '@?',
        lxPosition: '@?',
        lxTheme: '@?'
      },
      controller: LxSwitchController,
      controllerAs: 'lxSwitch',
      bindToController: true,
      transclude: true,
      replace: true
    };
  }

  LxSwitchController.$inject = ['$scope', '$timeout', 'LxUtilsService'];

  function LxSwitchController($scope, $timeout, LxUtilsService) {
    var lxSwitch = this;
    var switchId;
    var switchHasChildren;
    var timer;
    lxSwitch.getSwitchId = getSwitchId;
    lxSwitch.getSwitchHasChildren = getSwitchHasChildren;
    lxSwitch.setSwitchId = setSwitchId;
    lxSwitch.setSwitchHasChildren = setSwitchHasChildren;
    lxSwitch.triggerNgChange = triggerNgChange;
    $scope.$on('$destroy', function () {
      $timeout.cancel(timer);
    });
    init();

    function getSwitchId() {
      return switchId;
    }

    function getSwitchHasChildren() {
      return switchHasChildren;
    }

    function init() {
      setSwitchId(LxUtilsService.generateUUID());
      setSwitchHasChildren(false);
      lxSwitch.ngTrueValue = angular.isUndefined(lxSwitch.ngTrueValue) ? true : lxSwitch.ngTrueValue;
      lxSwitch.ngFalseValue = angular.isUndefined(lxSwitch.ngFalseValue) ? false : lxSwitch.ngFalseValue;
      lxSwitch.lxColor = angular.isUndefined(lxSwitch.lxColor) ? 'accent' : lxSwitch.lxColor;
      lxSwitch.lxPosition = angular.isUndefined(lxSwitch.lxPosition) ? 'left' : lxSwitch.lxPosition;
    }

    function setSwitchId(_switchId) {
      switchId = _switchId;
    }

    function setSwitchHasChildren(_switchHasChildren) {
      switchHasChildren = _switchHasChildren;
    }

    function triggerNgChange() {
      timer = $timeout(lxSwitch.ngChange);
    }
  }

  function lxSwitchLabel() {
    return {
      restrict: 'AE',
      require: ['^lxSwitch', '^lxSwitchLabel'],
      templateUrl: 'switch-label.html',
      link: link,
      controller: LxSwitchLabelController,
      controllerAs: 'lxSwitchLabel',
      bindToController: true,
      transclude: true,
      replace: true
    };

    function link(scope, element, attrs, ctrls) {
      ctrls[0].setSwitchHasChildren(true);
      ctrls[1].setSwitchId(ctrls[0].getSwitchId());
    }
  }

  function LxSwitchLabelController() {
    var lxSwitchLabel = this;
    var switchId;
    lxSwitchLabel.getSwitchId = getSwitchId;
    lxSwitchLabel.setSwitchId = setSwitchId;

    function getSwitchId() {
      return switchId;
    }

    function setSwitchId(_switchId) {
      switchId = _switchId;
    }
  }

  function lxSwitchHelp() {
    return {
      restrict: 'AE',
      require: '^lxSwitch',
      templateUrl: 'switch-help.html',
      transclude: true,
      replace: true
    };
  }
})();

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_splice__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(32);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3__);





(function () {
  'use strict';

  angular.module('lumx.tabs').directive('lxTabs', lxTabs).directive('lxTab', lxTab).directive('lxTabsPanes', lxTabsPanes).directive('lxTabPane', lxTabPane);

  function lxTabs() {
    return {
      restrict: 'E',
      templateUrl: 'tabs.html',
      scope: {
        layout: '@?lxLayout',
        theme: '@?lxTheme',
        color: '@?lxColor',
        indicator: '@?lxIndicator',
        activeTab: '=?lxActiveTab',
        panesId: '@?lxPanesId',
        links: '=?lxLinks',
        position: '@?lxPosition'
      },
      controller: LxTabsController,
      controllerAs: 'lxTabs',
      bindToController: true,
      replace: true,
      transclude: true
    };
  }

  LxTabsController.$inject = ['LxUtilsService', '$element', '$scope', '$timeout'];

  function LxTabsController(LxUtilsService, $element, $scope, $timeout) {
    var lxTabs = this;
    var tabsLength;
    var timer1;
    var timer2;
    var timer3;
    var timer4;
    lxTabs.removeTab = removeTab;
    lxTabs.setActiveTab = setActiveTab;
    lxTabs.setViewMode = setViewMode;
    lxTabs.tabIsActive = tabIsActive;
    lxTabs.updateTabs = updateTabs;
    lxTabs.activeTab = angular.isDefined(lxTabs.activeTab) ? lxTabs.activeTab : 0;
    lxTabs.color = angular.isDefined(lxTabs.color) ? lxTabs.color : 'primary';
    lxTabs.indicator = angular.isDefined(lxTabs.indicator) ? lxTabs.indicator : 'accent';
    lxTabs.layout = angular.isDefined(lxTabs.layout) ? lxTabs.layout : 'full';
    lxTabs.tabs = [];
    lxTabs.theme = angular.isDefined(lxTabs.theme) ? lxTabs.theme : 'light';
    lxTabs.viewMode = angular.isDefined(lxTabs.links) ? 'separate' : 'gather';
    $scope.$watch(function () {
      return lxTabs.activeTab;
    }, function (_newActiveTab, _oldActiveTab) {
      timer1 = $timeout(function () {
        setIndicatorPosition(_oldActiveTab);

        if (lxTabs.viewMode === 'separate') {
          angular.element('#' + lxTabs.panesId).find('.tabs__pane').hide();
          angular.element('#' + lxTabs.panesId).find('.tabs__pane').eq(lxTabs.activeTab).show();
        }
      });
    });
    $scope.$watch(function () {
      return lxTabs.position;
    }, function (_newPosition) {
      lxTabs.bottomPosition = angular.isDefined(_newPosition) && _newPosition === 'bottom';
    });
    $scope.$watch(function () {
      return lxTabs.links;
    }, function (_newLinks) {
      lxTabs.viewMode = angular.isDefined(_newLinks) ? 'separate' : 'gather';
      angular.forEach(_newLinks, function (link, index) {
        var tab = {
          uuid: angular.isUndefined(link.uuid) || link.uuid.length === 0 ? LxUtilsService.generateUUID() : link.uuid,
          index: index,
          label: link.label,
          icon: link.icon,
          disabled: link.disabled
        };
        updateTabs(tab);
      });
    });
    timer2 = $timeout(function () {
      tabsLength = lxTabs.tabs.length;
    });
    $scope.$on('$destroy', function () {
      $timeout.cancel(timer1);
      $timeout.cancel(timer2);
      $timeout.cancel(timer3);
      $timeout.cancel(timer4);
    });

    function removeTab(_tab) {
      lxTabs.tabs.splice(_tab.index, 1);
      angular.forEach(lxTabs.tabs, function (tab, index) {
        tab.index = index;
      });

      if (lxTabs.activeTab === 0) {
        timer3 = $timeout(function () {
          setIndicatorPosition();
        });
      } else {
        setActiveTab(lxTabs.tabs[0]);
      }
    }

    function setActiveTab(_tab) {
      if (!_tab.disabled) {
        lxTabs.activeTab = _tab.index;
      }
    }

    function setIndicatorPosition(_previousActiveTab) {
      var direction = lxTabs.activeTab > _previousActiveTab ? 'right' : 'left';
      var indicator = $element.find('.tabs__indicator');
      var activeTab = $element.find('.tabs__link').eq(lxTabs.activeTab);
      var indicatorLeft = activeTab.position().left;
      var indicatorRight = $element.outerWidth() - (indicatorLeft + activeTab.outerWidth());

      if (angular.isUndefined(_previousActiveTab)) {
        indicator.css({
          left: indicatorLeft,
          right: indicatorRight
        });
      } else {
        var animationProperties = {
          duration: 200,
          easing: 'easeOutQuint'
        };

        if (direction === 'left') {
          indicator.velocity({
            left: indicatorLeft
          }, animationProperties);
          indicator.velocity({
            right: indicatorRight
          }, animationProperties);
        } else {
          indicator.velocity({
            right: indicatorRight
          }, animationProperties);
          indicator.velocity({
            left: indicatorLeft
          }, animationProperties);
        }
      }
    }

    function setViewMode(_viewMode) {
      lxTabs.viewMode = _viewMode;
    }

    function tabIsActive(_index) {
      return lxTabs.activeTab === _index;
    }

    function updateTabs(_tab) {
      var newTab = true;
      angular.forEach(lxTabs.tabs, function (tab) {
        if (tab.index === _tab.index) {
          newTab = false;
          tab.uuid = _tab.uuid;
          tab.icon = _tab.icon;
          tab.label = _tab.label;
        }
      });

      if (newTab) {
        lxTabs.tabs.push(_tab);

        if (angular.isDefined(tabsLength)) {
          timer4 = $timeout(function () {
            setIndicatorPosition();
          });
        }
      }
    }
  }

  function lxTab() {
    return {
      restrict: 'E',
      require: ['lxTab', '^lxTabs'],
      templateUrl: 'tab.html',
      scope: {
        ngDisabled: '=?'
      },
      link: link,
      controller: LxTabController,
      controllerAs: 'lxTab',
      bindToController: true,
      replace: true,
      transclude: true
    };

    function link(scope, element, attrs, ctrls) {
      ctrls[0].init(ctrls[1], element.index());
      attrs.$observe('lxLabel', function (_newLabel) {
        ctrls[0].setLabel(_newLabel);
      });
      attrs.$observe('lxIcon', function (_newIcon) {
        ctrls[0].setIcon(_newIcon);
      });
    }
  }

  LxTabController.$inject = ['$scope', 'LxUtilsService'];

  function LxTabController($scope, LxUtilsService) {
    var lxTab = this;
    var parentCtrl;
    var tab = {
      uuid: LxUtilsService.generateUUID(),
      index: undefined,
      label: undefined,
      icon: undefined,
      disabled: false
    };
    lxTab.init = init;
    lxTab.setIcon = setIcon;
    lxTab.setLabel = setLabel;
    lxTab.tabIsActive = tabIsActive;
    $scope.$watch(function () {
      return lxTab.ngDisabled;
    }, function (_isDisabled) {
      if (_isDisabled) {
        tab.disabled = true;
      } else {
        tab.disabled = false;
      }

      parentCtrl.updateTabs(tab);
    });
    $scope.$on('$destroy', function () {
      parentCtrl.removeTab(tab);
    });

    function init(_parentCtrl, _index) {
      parentCtrl = _parentCtrl;
      tab.index = _index;
      parentCtrl.updateTabs(tab);
    }

    function setIcon(_icon) {
      tab.icon = _icon;
      parentCtrl.updateTabs(tab);
    }

    function setLabel(_label) {
      tab.label = _label;
      parentCtrl.updateTabs(tab);
    }

    function tabIsActive() {
      return parentCtrl.tabIsActive(tab.index);
    }
  }

  function lxTabsPanes() {
    return {
      restrict: 'E',
      templateUrl: 'tabs-panes.html',
      scope: true,
      replace: true,
      transclude: true
    };
  }

  function lxTabPane() {
    return {
      restrict: 'E',
      templateUrl: 'tab-pane.html',
      scope: true,
      replace: true,
      transclude: true
    };
  }
})();

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_2__);




(function () {
  'use strict';

  angular.module('lumx.text-field').directive('lxTextField', lxTextField);
  lxTextField.$inject = ['$timeout'];

  function lxTextField($timeout) {
    return {
      restrict: 'E',
      templateUrl: 'text-field.html',
      scope: {
        allowClear: '=?lxAllowClear',
        error: '=?lxError',
        fixedLabel: '=?lxFixedLabel',
        focus: '<?lxFocus',
        icon: '@?lxIcon',
        label: '@lxLabel',
        ngDisabled: '=?',
        hasPlaceholder: '=?lxHasPlaceholder',
        theme: '@?lxTheme',
        valid: '=?lxValid'
      },
      link: link,
      controller: LxTextFieldController,
      controllerAs: 'lxTextField',
      bindToController: true,
      replace: true,
      transclude: true
    };

    function link(scope, element, attrs, ctrl, transclude) {
      var backwardOneWay = ['icon', 'label', 'theme'];
      var backwardTwoWay = ['error', 'fixedLabel', 'valid'];
      var input;
      var timer;
      angular.forEach(backwardOneWay, function (attribute) {
        if (angular.isDefined(attrs[attribute])) {
          attrs.$observe(attribute, function (newValue) {
            scope.lxTextField[attribute] = newValue;
          });
        }
      });
      angular.forEach(backwardTwoWay, function (attribute) {
        if (angular.isDefined(attrs[attribute])) {
          scope.$watch(function () {
            return scope.$parent.$eval(attrs[attribute]);
          }, function (newValue) {
            scope.lxTextField[attribute] = newValue;
          });
        }
      });
      transclude(function () {
        input = element.find('textarea');

        if (input[0]) {
          input.on('cut paste drop keydown', function () {
            timer = $timeout(ctrl.updateTextareaHeight);
          });
        } else {
          input = element.find('input');
        }

        input.addClass('text-field__input');
        ctrl.setInput(input);
        ctrl.setModel(input.data('$ngModelController'));
        input.on('focus', function () {
          var phase = scope.$root.$$phase;

          if (phase === '$apply' || phase === '$digest') {
            ctrl.focusInput();
          } else {
            scope.$apply(ctrl.focusInput);
          }
        });
        input.on('blur', ctrl.blurInput);
      });
      scope.$on('$destroy', function () {
        $timeout.cancel(timer);
        input.off();
      });
    }
  }

  LxTextFieldController.$inject = ['$scope', '$timeout'];

  function LxTextFieldController($scope, $timeout) {
    var lxTextField = this;
    var input;
    var modelController;
    var timer;
    lxTextField.blurInput = blurInput;
    lxTextField.clearInput = clearInput;
    lxTextField.focusInput = focusInput;
    lxTextField.hasValue = hasValue;
    lxTextField.setInput = setInput;
    lxTextField.setModel = setModel;
    lxTextField.updateTextareaHeight = updateTextareaHeight;
    $scope.$watch(function () {
      return modelController.$viewValue;
    }, function (newValue, oldValue) {
      if (angular.isDefined(newValue) && newValue) {
        lxTextField.isActive = true;
      } else {
        lxTextField.isActive = false;
      }

      if (newValue !== oldValue && newValue) {
        updateTextareaHeight();
      }
    });
    $scope.$watch(function () {
      return lxTextField.focus;
    }, function (newValue, oldValue) {
      if (angular.isDefined(newValue) && newValue) {
        $timeout(function () {
          input.focus();
          lxTextField.focus = false;
        });
      }
    });
    $scope.$on('$destroy', function () {
      $timeout.cancel(timer);
    });

    function blurInput() {
      if (!hasValue()) {
        $scope.$apply(function () {
          lxTextField.isActive = false;
        });
      }

      $scope.$apply(function () {
        lxTextField.isFocus = false;
      });
    }

    function clearInput(_event) {
      _event.stopPropagation();

      modelController.$setViewValue(undefined);
      modelController.$render();
    }

    function focusInput() {
      lxTextField.isActive = true;
      lxTextField.isFocus = true;
    }

    function hasValue() {
      return angular.isDefined(input.val()) && input.val().length > 0;
    }

    function init() {
      lxTextField.isActive = hasValue();
      lxTextField.focus = angular.isDefined(lxTextField.focus) ? lxTextField.focus : false;
      lxTextField.isFocus = lxTextField.focus;
    }

    function setInput(_input) {
      input = _input;
      timer = $timeout(init);
    }

    function setModel(_modelControler) {
      modelController = _modelControler;
    }

    function updateTextareaHeight() {
      if (!input.is('textarea')) {
        return;
      }

      var tmpTextArea = angular.element('<textarea class="text-field__input" style="width: ' + input.width() + 'px;">' + input.val() + '</textarea>');
      tmpTextArea.appendTo('body');
      input.css({
        height: tmpTextArea[0].scrollHeight + 'px'
      });
      tmpTextArea.remove();
    }
  }
})();

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_parse_int__WEBPACK_IMPORTED_MODULE_0__);


(function () {
  'use strict';

  angular.module('lumx.tooltip').directive('lxTooltip', lxTooltip);

  function lxTooltip() {
    return {
      restrict: 'A',
      scope: {
        tooltip: '@lxTooltip',
        position: '@?lxTooltipPosition'
      },
      link: link,
      controller: LxTooltipController,
      controllerAs: 'lxTooltip',
      bindToController: true
    };

    function link(scope, element, attrs, ctrl) {
      if (angular.isDefined(attrs.lxTooltip)) {
        attrs.$observe('lxTooltip', function (newValue) {
          ctrl.updateTooltipText(newValue);
        });
      }

      if (angular.isDefined(attrs.lxTooltipPosition)) {
        attrs.$observe('lxTooltipPosition', function (newValue) {
          scope.lxTooltip.position = newValue;
        });
      }

      if (angular.element(window).outerWidth() > 768) {
        element.on('mouseenter', ctrl.showTooltip);
        element.on('mouseleave', ctrl.hideTooltip);
      }

      scope.$on('$destroy', function () {
        element.off();
      });
    }
  }

  LxTooltipController.$inject = ['$element', '$scope', '$timeout', 'LxDepthService', 'LxUtilsService'];

  function LxTooltipController($element, $scope, $timeout, LxDepthService, LxUtilsService) {
    var lxTooltip = this;
    var timer1;
    var timer2;
    var tooltip;
    var tooltipBackground;
    var tooltipLabel;
    lxTooltip.hideTooltip = hideTooltip;
    lxTooltip.showTooltip = showTooltip;
    lxTooltip.updateTooltipText = updateTooltipText;
    lxTooltip.position = angular.isDefined(lxTooltip.position) ? lxTooltip.position : 'top';
    $scope.$on('$destroy', function () {
      if (angular.isDefined(tooltip)) {
        tooltip.remove();
        tooltip = undefined;
      }

      $timeout.cancel(timer1);
      $timeout.cancel(timer2);
    });

    function hideTooltip() {
      if (angular.isDefined(tooltip)) {
        tooltip.removeClass('tooltip--is-active');
        timer1 = $timeout(function () {
          if (angular.isDefined(tooltip)) {
            angular.element(document).off('scroll', _debouncedSetPosition);
            tooltip.remove();
            tooltip = undefined;
          }
        }, 200);
      }
    }

    function setTooltipPosition() {
      var topOffset = $('.scroll-mask') ? $('body').css('top') : 0;
      topOffset = topOffset ? parseInt(topOffset, 10) : 0;
      topOffset = isNaN(topOffset) ? 0 : topOffset;
      var width = $element.outerWidth(),
          height = $element.outerHeight(),
          top = $element.offset().top - topOffset,
          left = $element.offset().left;
      tooltip.append(tooltipBackground).append(tooltipLabel).appendTo('body');

      if (lxTooltip.position === 'top') {
        tooltip.css({
          left: left - tooltip.outerWidth() / 2 + width / 2,
          top: top - tooltip.outerHeight()
        });
      } else if (lxTooltip.position === 'bottom') {
        tooltip.css({
          left: left - tooltip.outerWidth() / 2 + width / 2,
          top: top + height
        });
      } else if (lxTooltip.position === 'left') {
        tooltip.css({
          left: left - tooltip.outerWidth(),
          top: top + height / 2 - tooltip.outerHeight() / 2
        });
      } else if (lxTooltip.position === 'right') {
        tooltip.css({
          left: left + width,
          top: top + height / 2 - tooltip.outerHeight() / 2
        });
      }
    }

    var _debouncedSetPosition = LxUtilsService.debounce(setTooltipPosition, 250);

    function showTooltip() {
      if (angular.isUndefined(tooltip)) {
        LxDepthService.register();
        tooltip = angular.element('<div/>', {
          class: 'tooltip tooltip--' + lxTooltip.position
        });
        tooltipBackground = angular.element('<div/>', {
          class: 'tooltip__background'
        });
        tooltipLabel = angular.element('<span/>', {
          class: 'tooltip__label',
          text: lxTooltip.tooltip
        });
        setTooltipPosition();
        angular.element(document).on('scroll', _debouncedSetPosition);
        tooltip.append(tooltipBackground).append(tooltipLabel).css('z-index', LxDepthService.getDepth()).appendTo('body');
        timer2 = $timeout(function () {
          tooltip.addClass('tooltip--is-active');
        });
      }
    }

    function updateTooltipText(_newValue) {
      if (angular.isDefined(tooltipLabel)) {
        tooltipLabel.text(_newValue);
      }
    }
  }
})();

/***/ }),
/* 159 */
/***/ (function(module, exports) {

var v1='<div class=dropdown-menu><div class=dropdown-menu__content ng-transclude ng-if=lxDropdownMenu.parentCtrl.isOpen></div></div>';
angular.module('lumx.dropdown').run(['$templateCache', function ($templateCache) {$templateCache.put('dropdown-menu.html', v1);}]);
module.exports=v1

/***/ }),
/* 160 */
/***/ (function(module, exports) {

var v1='<div class=dropdown-toggle ng-transclude></div>';
angular.module('lumx.dropdown').run(['$templateCache', function ($templateCache) {$templateCache.put('dropdown-toggle.html', v1);}]);
module.exports=v1

/***/ }),
/* 161 */
/***/ (function(module, exports) {

var v1='<div class=dropdown ng-class="{ \'dropdown--has-toggle\': lxDropdown.hasToggle,\n                 \'dropdown--is-open\': lxDropdown.isOpen }" ng-transclude></div>';
angular.module('lumx.dropdown').run(['$templateCache', function ($templateCache) {$templateCache.put('dropdown.html', v1);}]);
module.exports=v1

/***/ }),
/* 162 */
/***/ (function(module, exports) {

var v1='<div class=input-file><span class=input-file__label>{{ lxFileInput.label }}</span> <span class=input-file__filename>{{ lxFileInput.fileName }}</span> <input type=file class=input-file__input accept="{{ lxFileInput.accept }}"></div>';
angular.module('lumx.file-input').run(['$templateCache', function ($templateCache) {$templateCache.put('file-input.html', v1);}]);
module.exports=v1

/***/ }),
/* 163 */
/***/ (function(module, exports) {

var v1='<div class=text-field ng-class="{ \'text-field--error\': lxTextField.error,\n                 \'text-field--fixed-label\': lxTextField.fixedLabel && !lxTextField.hasPlaceholder,\n                 \'text-field--has-icon\': lxTextField.icon,\n                 \'text-field--has-value\': lxTextField.hasValue(),\n                 \'text-field--is-active\': lxTextField.isActive || lxTextField.hasPlaceholder,\n                 \'text-field--is-disabled\': lxTextField.ngDisabled,\n                 \'text-field--is-focus\': lxTextField.isFocus,\n                 \'text-field--theme-light\': !lxTextField.theme || lxTextField.theme === \'light\',\n                 \'text-field--theme-dark\': lxTextField.theme === \'dark\',\n                 \'text-field--valid\': lxTextField.valid }"><div class=text-field__icon ng-if=lxTextField.icon><i class="mdi mdi-{{ lxTextField.icon }}"></i></div><label class=text-field__label>{{ lxTextField.label }}</label><div ng-transclude></div><span class=text-field__clear ng-click=lxTextField.clearInput($event) ng-if=lxTextField.allowClear><i class="mdi mdi-close-circle"></i></span></div>';
angular.module('lumx.text-field').run(['$templateCache', function ($templateCache) {$templateCache.put('text-field.html', v1);}]);
module.exports=v1

/***/ }),
/* 164 */
/***/ (function(module, exports) {

var v1='<div class=search-filter ng-class=lxSearchFilter.getClass()><div class=search-filter__container><div class=search-filter__button><lx-button type=submit lx-size=l lx-color="{{ lxSearchFilter.color }}" lx-type=icon ng-click=lxSearchFilter.openInput()><i class="mdi mdi-magnify"></i></lx-button></div><div class=search-filter__input ng-transclude></div><div class=search-filter__clear><lx-button type=button lx-size=l lx-color="{{ lxSearchFilter.color }}" lx-type=icon ng-click=lxSearchFilter.clearInput()><i class="mdi mdi-close"></i></lx-button></div></div><div class=search-filter__loader ng-if=lxSearchFilter.isLoading><lx-progress lx-type=linear></lx-progress></div><lx-dropdown id="{{ lxSearchFilter.dropdownId }}" lx-effect=none lx-width=100% ng-if=lxSearchFilter.autocomplete><lx-dropdown-menu class=search-filter__autocomplete-list><ul><li ng-repeat="item in lxSearchFilter.autocompleteList track by $index"><a class=search-filter__autocomplete-item ng-class="{ \'search-filter__autocomplete-item--is-active\': lxSearchFilter.activeChoiceIndex === $index }" ng-click=lxSearchFilter.selectItem(item) ng-bind-html="item | lxSearchHighlight:lxSearchFilter.modelController.$viewValue:lxSearchFilter.icon"></a></li></ul></lx-dropdown-menu></lx-dropdown></div>';
angular.module('lumx.search-filter').run(['$templateCache', function ($templateCache) {$templateCache.put('search-filter.html', v1);}]);
module.exports=v1

/***/ }),
/* 165 */
/***/ (function(module, exports) {

var v1='<div ng-repeat="(label, items) in pane"><div class="lx-select-choices__pane-choice lx-select-choices__pane-{{ level }}" ng-class="{ \'lx-select-choices__pane-choice--is-selected\': lxSelectChoices.parentCtrl.isPaneToggled(level, label) || lxSelectChoices.parentCtrl.isSelected(items),\n                \'lx-select-choices__pane-choice--is-matching\': lxSelectChoices.parentCtrl.isMatchingPath(level, label),\n                \'lx-select-choices__pane-choice--is-leaf\': lxSelectChoices.isArray(pane) }" ng-bind-html="(lxSelectChoices.isArray(pane)) ? lxSelectChoices.parentCtrl.displayChoice(items) : lxSelectChoices.parentCtrl.displaySubheader(label)" ng-click="lxSelectChoices.parentCtrl.togglePane($event, level, label, true)"></div><div ng-include="\'select-choices-accordion.html\'" ng-if="!lxSelectChoices.isArray(pane) && lxSelectChoices.parentCtrl.isPaneToggled(level,label)" ng-init="pane = items; level = level + 1"></div></div>';
angular.module('lumx.select').run(['$templateCache', function ($templateCache) {$templateCache.put('select-choices-accordion.html', v1);}]);
module.exports=v1

/***/ }),
/* 166 */
/***/ (function(module, exports) {

var v1='<lx-dropdown-menu class=lx-select-choices ng-class="{ \'lx-select-choices--custom-style\': lxSelectChoices.parentCtrl.choicesCustomStyle,\n                              \'lx-select-choices--default-style\': !lxSelectChoices.parentCtrl.choicesCustomStyle,\n                              \'lx-select-choices--is-multiple\': lxSelectChoices.parentCtrl.multiple,\n                              \'lx-select-choices--is-unique\': !lxSelectChoices.parentCtrl.multiple,\n                              \'lx-select-choices--list\': lxSelectChoices.parentCtrl.choicesViewMode === \'list\',\n                              \'lx-select-choices--multi-panes\': lxSelectChoices.parentCtrl.choicesViewMode === \'panes\' }"><ul ng-if="::lxSelectChoices.parentCtrl.choicesViewMode === \'list\'"><li class=lx-select-choices__filter ng-if="::lxSelectChoices.parentCtrl.displayFilter && !lxSelectChoices.parentCtrl.autocomplete"><lx-search-filter lx-dropdown-filter><input type=text ng-model=lxSelectChoices.parentCtrl.filterModel ng-change=lxSelectChoices.parentCtrl.updateFilter()></lx-search-filter></li><div ng-if=::lxSelectChoices.isArray()><li class=lx-select-choices__choice ng-class="{ \'lx-select-choices__choice--is-selected\': lxSelectChoices.parentCtrl.isSelected(choice),\n                            \'lx-select-choices__choice--is-disabled\': !lxSelectChoices.parentCtrl.isSelected(choice) && lxSelectChoices.parentCtrl.isMaxSelected(),\n                            \'lx-select-choices__choice--is-focus\': lxSelectChoices.parentCtrl.activeChoiceIndex === $index }" ng-repeat="choice in lxSelectChoices.parentCtrl.choices | filterChoices:lxSelectChoices.parentCtrl.filter:lxSelectChoices.parentCtrl.filterModel" ng-bind-html=::lxSelectChoices.parentCtrl.displayChoice(choice) ng-click="lxSelectChoices.parentCtrl.toggleChoice(choice, $event)"></li></div><div ng-if=::!lxSelectChoices.isArray()><li class=lx-select-choices__subheader ng-repeat-start="(subheader, children) in lxSelectChoices.parentCtrl.choices" ng-bind-html=::lxSelectChoices.parentCtrl.displaySubheader(subheader)></li><li class=lx-select-choices__choice ng-class="{ \'lx-select-choices__choice--is-selected\': lxSelectChoices.parentCtrl.isSelected(choice),\n                            \'lx-select-choices__choice--is-focus\': lxSelectChoices.parentCtrl.activeChoiceIndex === $index }" ng-repeat-end ng-repeat="choice in children | filterChoices:lxSelectChoices.parentCtrl.filter:lxSelectChoices.parentCtrl.filterModel" ng-bind-html=::lxSelectChoices.parentCtrl.displayChoice(choice) ng-click="lxSelectChoices.parentCtrl.toggleChoice(choice, $event)"></li></div><li class=lx-select-choices__subheader ng-if=lxSelectChoices.parentCtrl.helperDisplayable()>{{ lxSelectChoices.parentCtrl.helperMessage }}</li></ul><div class=lx-select-choices__panes-wrapper ng-if="lxSelectChoices.parentCtrl.choicesViewMode === \'panes\' && lxSelectChoices.parentCtrl.choicesViewSize === \'large\'" lx-stop-propagation=click><div class=lx-select-choices__loader ng-if=lxSelectChoices.parentCtrl.loading><lx-progress lx-type=circular lx-color=white lx-diameter=60></lx-progress></div><div class=lx-select-choices__panes-container ng-if=!lxSelectChoices.parentCtrl.loading><div class="lx-select-choices__pane lx-select-choices__pane-{{ $index }}" ng-class="{ \'lx-select-choices__pane--is-filtering\': lxSelectChoices.parentCtrl.matchingPaths !== undefined,\n                             \'lx-select-choices__pane--first\': $first,\n                             \'lx-select-choices__pane--last\': $last }" ng-repeat="pane in lxSelectChoices.parentCtrl.panes"><div ng-repeat="(label, items) in pane" class=lx-select-choices__pane-choice ng-class="{ \'lx-select-choices__pane-choice--is-selected\': lxSelectChoices.parentCtrl.isPaneToggled($parent.$index, label) || lxSelectChoices.parentCtrl.isSelected(items) || ($parent.$last && lxSelectChoices.parentCtrl.activeChoiceIndex === $index),\n                               \'lx-select-choices__pane-choice--is-matching\': lxSelectChoices.parentCtrl.isMatchingPath($parent.$index, label),\n                               \'lx-select-choices__pane-choice--is-leaf\': lxSelectChoices.isArray(pane) }" ng-bind-html="(lxSelectChoices.isArray(pane)) ? lxSelectChoices.parentCtrl.displayChoice(items) : lxSelectChoices.parentCtrl.displaySubheader(label)" ng-click="lxSelectChoices.parentCtrl.togglePane($event, $parent.$index, label, true)"></div></div></div></div><div class=lx-select-choices__panes-wrapper ng-if="lxSelectChoices.parentCtrl.choicesViewMode === \'panes\' && lxSelectChoices.parentCtrl.choicesViewSize === \'small\'" lx-stop-propagation=click><div class=lx-select-choices__loader ng-if=lxSelectChoices.parentCtrl.loading><lx-progress lx-type=circular lx-color=white lx-diameter=60></lx-progress></div><div class=lx-select-choices__panes-container ng-if=!lxSelectChoices.parentCtrl.loading><div class="lx-select-choices__pane lx-select-choices__pane" ng-class="{ \'lx-select-choices__pane--is-filtering\': lxSelectChoices.parentCtrl.matchingPaths !== undefined,\n                            \'lx-select-choices__pane--first\': $first,\n                            \'lx-select-choices__pane--last\': $last }" ng-repeat="pane in lxSelectChoices.parentCtrl.panes"><div ng-include="\'select-choices-accordion.html\'" ng-init="level = 0"></div></div></div></div><lx-progress lx-type=linear lx-color=primary ng-if=lxSelectChoices.parentCtrl.loading></lx-progress></lx-dropdown-menu>';
angular.module('lumx.select').run(['$templateCache', function ($templateCache) {$templateCache.put('select-choices.html', v1);}]);
module.exports=v1

/***/ }),
/* 167 */
/***/ (function(module, exports) {

var v1='<div class=lx-select-selected-wrapper ng-class="{ \'lx-select-selected-wrapper--with-filter\': !lxSelectSelected.parentCtrl.ngDisabled && lxSelectSelected.parentCtrl.areChoicesOpened() && (lxSelectSelected.parentCtrl.multiple || !lxSelectSelected.parentCtrl.getSelectedModel()) }" id="lx-select-selected-wrapper-{{ lxSelectSelected.parentCtrl.uuid }}"><div class=lx-select-selected ng-if=!lxSelectSelected.parentCtrl.multiple><span class=lx-select-selected__value ng-bind-html=lxSelectSelected.parentCtrl.displaySelected() ng-if=lxSelectSelected.parentCtrl.getSelectedModel()></span> <a class=lx-select-selected__clear ng-click=lxSelectSelected.clearModel($event) ng-if="lxSelectSelected.parentCtrl.allowClear && lxSelectSelected.parentCtrl.getSelectedModel()"><i class="mdi mdi-close-circle"></i></a></div><div class=lx-select-selected ng-if=lxSelectSelected.parentCtrl.multiple><span class=lx-select-selected__tag ng-class="{ \'lx-select-selected__tag--is-active\': lxSelectSelected.parentCtrl.activeSelectedIndex === $index }" ng-click="lxSelectSelected.removeSelected(selected, $event)" ng-repeat="selected in lxSelectSelected.parentCtrl.getSelectedModel()" ng-bind-html=lxSelectSelected.parentCtrl.displaySelected(selected)></span> <input type=text placeholder="{{ ::lxSelectSelected.parentCtrl.label }}" class=lx-select-selected__filter ng-model=lxSelectSelected.parentCtrl.filterModel ng-change=lxSelectSelected.parentCtrl.updateFilter() ng-keydown=lxSelectSelected.parentCtrl.keyEvent($event) ng-if="lxSelectSelected.parentCtrl.autocomplete && !lxSelectSelected.parentCtrl.ngDisabled"></div><lx-search-filter lx-dropdown-filter class=lx-select-selected__filter ng-if="lxSelectSelected.parentCtrl.choicesViewMode === \'panes\' && !lxSelectSelected.parentCtrl.ngDisabled && lxSelectSelected.parentCtrl.areChoicesOpened() && (lxSelectSelected.parentCtrl.multiple || !lxSelectSelected.parentCtrl.getSelectedModel())"><input type=text ng-model=lxSelectSelected.parentCtrl.filterModel ng-change=lxSelectSelected.parentCtrl.updateFilter() lx-stop-propagation=click></lx-search-filter></div>';
angular.module('lumx.select').run(['$templateCache', function ($templateCache) {$templateCache.put('select-selected-content.html', v1);}]);
module.exports=v1

/***/ }),
/* 168 */
/***/ (function(module, exports) {

var v1='<div><lx-dropdown-toggle ng-if=::!lxSelectSelected.parentCtrl.autocomplete><ng-include src="\'select-selected-content.html\'"></ng-include></lx-dropdown-toggle><ng-include src="\'select-selected-content.html\'" ng-if=::lxSelectSelected.parentCtrl.autocomplete></ng-include></div>';
angular.module('lumx.select').run(['$templateCache', function ($templateCache) {$templateCache.put('select-selected.html', v1);}]);
module.exports=v1

/***/ }),
/* 169 */
/***/ (function(module, exports) {

var v1='<div class=lx-select ng-class="{ \'lx-select--error\': lxSelect.error,\n                 \'lx-select--fixed-label\': lxSelect.fixedLabel && lxSelect.viewMode === \'field\',\n                 \'lx-select--is-active\': (!lxSelect.multiple && lxSelect.getSelectedModel()) || (lxSelect.multiple && lxSelect.getSelectedModel().length) || (lxSelect.choicesViewMode === \'panes\' && lxSelect.areChoicesOpened()),\n                 \'lx-select--is-disabled\': lxSelect.ngDisabled,\n                 \'lx-select--is-multiple\': lxSelect.multiple,\n                 \'lx-select--is-unique\': !lxSelect.multiple,\n                 \'lx-select--theme-light\': !lxSelect.theme || lxSelect.theme === \'light\',\n                 \'lx-select--theme-dark\': lxSelect.theme === \'dark\',\n                 \'lx-select--valid\': lxSelect.valid,\n                 \'lx-select--custom-style\': lxSelect.customStyle,\n                 \'lx-select--default-style\': !lxSelect.customStyle,\n                 \'lx-select--view-mode-field\': !lxSelect.multiple || (lxSelect.multiple && lxSelect.viewMode === \'field\'),\n                 \'lx-select--view-mode-chips\': lxSelect.multiple && lxSelect.viewMode === \'chips\',\n                 \'lx-select--panes\': lxSelect.choicesViewMode === \'panes\',\n                 \'lx-select--with-filter\': lxSelect.displayFilter,\n                 \'lx-select--autocomplete\': lxSelect.autocomplete }"><span class=lx-select-label ng-if=!lxSelect.autocomplete>{{ lxSelect.label }}</span><lx-dropdown id="dropdown-{{ lxSelect.uuid }}" lx-width="{{ (lxSelect.choicesViewMode === \'panes\') ? \'\' : \'100%\' }}" lx-effect="{{ lxSelect.autocomplete ? \'none\' : \'expand\' }}"><ng-transclude></ng-transclude></lx-dropdown></div>';
angular.module('lumx.select').run(['$templateCache', function ($templateCache) {$templateCache.put('select.html', v1);}]);
module.exports=v1

/***/ }),
/* 170 */
/***/ (function(module, exports) {

var v1='<div class=tabs__pane ng-transclude></div>';
angular.module('lumx.tabs').run(['$templateCache', function ($templateCache) {$templateCache.put('tab-pane.html', v1);}]);
module.exports=v1

/***/ }),
/* 171 */
/***/ (function(module, exports) {

var v1='<div class=tabs__pane ng-class="{ \'tabs__pane--is-disabled\': lxTab.ngDisabled }"><div ng-if=lxTab.tabIsActive() ng-transclude></div></div>';
angular.module('lumx.tabs').run(['$templateCache', function ($templateCache) {$templateCache.put('tab.html', v1);}]);
module.exports=v1

/***/ }),
/* 172 */
/***/ (function(module, exports) {

var v1='<div class="tabs tabs--separate"><div class=tabs__panes ng-transclude></div></div>';
angular.module('lumx.tabs').run(['$templateCache', function ($templateCache) {$templateCache.put('tabs-panes.html', v1);}]);
module.exports=v1

/***/ }),
/* 173 */
/***/ (function(module, exports) {

var v1='<div class="tabs tabs--layout-{{ lxTabs.layout }} tabs--theme-{{ lxTabs.theme }} tabs--color-{{ lxTabs.color }} tabs--indicator-{{ lxTabs.indicator }}"><div class=tabs__panes ng-if="lxTabs.viewMode === \'gather\' && lxTabs.bottomPosition" ng-transclude></div><div class=tabs__links><a class=tabs__link ng-class="{ \'tabs__link--is-active\': lxTabs.tabIsActive(tab.index),\n                       \'tabs__link--is-disabled\': tab.disabled }" ng-repeat="tab in lxTabs.tabs" ng-click=lxTabs.setActiveTab(tab) lx-ripple><i class="mdi mdi-{{ tab.icon }}" ng-if=tab.icon></i> <span ng-if=tab.label>{{ tab.label }}</span></a></div><div class=tabs__panes ng-if="lxTabs.viewMode === \'gather\' && !lxTabs.bottomPosition" ng-transclude></div><div class=tabs__indicator ng-class="{\'tabs__indicator--top\': !lxTabs.bottomPosition, \'tabs__indicator--bottom\': lxTabs.bottomPosition}"></div></div>';
angular.module('lumx.tabs').run(['$templateCache', function ($templateCache) {$templateCache.put('tabs.html', v1);}]);
module.exports=v1

/***/ }),
/* 174 */
/***/ (function(module, exports) {

var v1='<div class=lx-date><div class=lx-date-input ng-click=lxDatePicker.openDatePicker() ng-if=lxDatePicker.hasInput><ng-transclude></ng-transclude></div><div class="lx-date-picker lx-date-picker--{{ lxDatePicker.color }}"><div ng-if=lxDatePicker.isOpen><div class=lx-date-picker__header><a class=lx-date-picker__current-year ng-class="{ \'lx-date-picker__current-year--is-active\': lxDatePicker.yearSelection }" ng-click=lxDatePicker.displayYearSelection()>{{ lxDatePicker.moment(lxDatePicker.ngModel).format(\'YYYY\') }}</a> <a class=lx-date-picker__current-date ng-class="{ \'lx-date-picker__current-date--is-active\': !lxDatePicker.yearSelection }" ng-click=lxDatePicker.hideYearSelection()>{{ lxDatePicker.getDateFormatted() }}</a></div><div class=lx-date-picker__content><div class=lx-date-picker__calendar ng-if=!lxDatePicker.yearSelection><div class=lx-date-picker__nav><lx-button lx-size=l lx-color=black lx-type=icon ng-click=lxDatePicker.previousMonth()><i class="mdi mdi-chevron-left"></i></lx-button><span>{{ lxDatePicker.ngModelMoment.format(\'MMMM YYYY\') }}</span><lx-button lx-size=l lx-color=black lx-type=icon ng-click=lxDatePicker.nextMonth()><i class="mdi mdi-chevron-right"></i></lx-button></div><div class=lx-date-picker__days-of-week><span ng-repeat="day in lxDatePicker.daysOfWeek">{{ day }}</span></div><div class=lx-date-picker__days><span class="lx-date-picker__day lx-date-picker__day--is-empty" ng-repeat="x in lxDatePicker.emptyFirstDays">&nbsp;</span><div class=lx-date-picker__day ng-class="{ \'lx-date-picker__day--is-selected\': day.selected,\n                                         \'lx-date-picker__day--is-today\': day.today && !day.selected,\n                                         \'lx-date-picker__day--is-disabled\': day.disabled }" ng-repeat="day in lxDatePicker.days"><a ng-click=lxDatePicker.select(day)>{{ day ? day.format(\'D\') : \'\' }}</a></div><span class="lx-date-picker__day lx-date-picker__day--is-empty" ng-repeat="x in lxDatePicker.emptyLastDays">&nbsp;</span></div></div><div class=lx-date-picker__year-selector ng-if=lxDatePicker.yearSelection><a class=lx-date-picker__year ng-class="{ \'lx-date-picker__year--is-active\': year == lxDatePicker.moment(lxDatePicker.ngModel).format(\'YYYY\') }" ng-repeat="year in lxDatePicker.years" ng-click=lxDatePicker.selectYear(year) ng-if=lxDatePicker.yearSelection>{{ year }}</a></div></div><div class=lx-date-picker__actions><lx-button lx-color="{{ lxDatePicker.color }}" lx-type=flat ng-click=lxDatePicker.closeDatePicker()>Ok</lx-button></div></div></div></div>';
angular.module('lumx.date-picker').run(['$templateCache', function ($templateCache) {$templateCache.put('date-picker.html', v1);}]);
module.exports=v1

/***/ }),
/* 175 */
/***/ (function(module, exports) {

var v1='<button ng-transclude lx-ripple></button>';
angular.module('lumx.button').run(['$templateCache', function ($templateCache) {$templateCache.put('button.html', v1);}]);
module.exports=v1

/***/ }),
/* 176 */
/***/ (function(module, exports) {

var v1='<a ng-transclude lx-ripple></a>';
angular.module('lumx.button').run(['$templateCache', function ($templateCache) {$templateCache.put('link.html', v1);}]);
module.exports=v1

/***/ }),
/* 177 */
/***/ (function(module, exports) {

var v1='<span class=checkbox__help ng-transclude></span>';
angular.module('lumx.checkbox').run(['$templateCache', function ($templateCache) {$templateCache.put('checkbox-help.html', v1);}]);
module.exports=v1

/***/ }),
/* 178 */
/***/ (function(module, exports) {

var v1='<label for="{{ lxCheckboxLabel.getCheckboxId() }}" class=checkbox__label ng-transclude></label>';
angular.module('lumx.checkbox').run(['$templateCache', function ($templateCache) {$templateCache.put('checkbox-label.html', v1);}]);
module.exports=v1

/***/ }),
/* 179 */
/***/ (function(module, exports) {

var v1='<div class="checkbox checkbox--{{ lxCheckbox.lxColor }}" ng-class="{ \'checkbox--theme-light\': !lxCheckbox.lxTheme || lxCheckbox.lxTheme === \'light\',\n                 \'checkbox--theme-dark\': lxCheckbox.lxTheme === \'dark\' }"><input id="{{ lxCheckbox.getCheckboxId() }}" type=checkbox class=checkbox__input name="{{ lxCheckbox.name }}" ng-model=lxCheckbox.ngModel ng-true-value="{{ lxCheckbox.ngTrueValue }}" ng-false-value="{{ lxCheckbox.ngFalseValue }}" ng-change=lxCheckbox.triggerNgChange() ng-disabled=lxCheckbox.ngDisabled><label for="{{ lxCheckbox.getCheckboxId() }}" class=checkbox__label ng-transclude ng-if=!lxCheckbox.getCheckboxHasChildren()></label><ng-transclude-replace ng-if=lxCheckbox.getCheckboxHasChildren()></ng-transclude-replace></div>';
angular.module('lumx.checkbox').run(['$templateCache', function ($templateCache) {$templateCache.put('checkbox.html', v1);}]);
module.exports=v1

/***/ }),
/* 180 */
/***/ (function(module, exports) {

var v1='<span class=radio-button__help ng-transclude></span>';
angular.module('lumx.radio-button').run(['$templateCache', function ($templateCache) {$templateCache.put('radio-button-help.html', v1);}]);
module.exports=v1

/***/ }),
/* 181 */
/***/ (function(module, exports) {

var v1='<label for="{{ lxRadioButtonLabel.getRadioButtonId() }}" class=radio-button__label ng-transclude></label>';
angular.module('lumx.radio-button').run(['$templateCache', function ($templateCache) {$templateCache.put('radio-button-label.html', v1);}]);
module.exports=v1

/***/ }),
/* 182 */
/***/ (function(module, exports) {

var v1='<div class="radio-button radio-button--{{ lxRadioButton.lxColor }}" ng-class="{ \'radio-button--theme-light\': !lxRadioButton.lxTheme || lxRadioButton.lxTheme === \'light\',\n                 \'radio-button--theme-dark\': lxRadioButton.lxTheme === \'dark\' }"><input id="{{ lxRadioButton.getRadioButtonId() }}" type=radio class=radio-button__input name="{{ lxRadioButton.name }}" ng-model=lxRadioButton.ngModel ng-value=lxRadioButton.ngValue ng-change=lxRadioButton.triggerNgChange() ng-disabled=lxRadioButton.ngDisabled><label for="{{ lxRadioButton.getRadioButtonId() }}" class=radio-button__label ng-transclude ng-if=!lxRadioButton.getRadioButtonHasChildren()></label><ng-transclude-replace ng-if=lxRadioButton.getRadioButtonHasChildren()></ng-transclude-replace></div>';
angular.module('lumx.radio-button').run(['$templateCache', function ($templateCache) {$templateCache.put('radio-button.html', v1);}]);
module.exports=v1

/***/ }),
/* 183 */
/***/ (function(module, exports) {

var v1='<div class=radio-group ng-transclude></div>';
angular.module('lumx.radio-button').run(['$templateCache', function ($templateCache) {$templateCache.put('radio-group.html', v1);}]);
module.exports=v1

/***/ }),
/* 184 */
/***/ (function(module, exports) {

var v1='<div class=lx-step-nav ng-click=lxStepNav.parent.goToStep(lxStepNav.step.index) ng-class=lxStepNav.getClasses() lx-ripple><div class="lx-step-nav__indicator lx-step-nav__indicator--index" ng-if="lxStepNav.step.isValid === undefined"><span>{{ lxStepNav.step.index + 1 }}</span></div><div class="lx-step-nav__indicator lx-step-nav__indicator--icon" ng-if="lxStepNav.step.isValid === true"><lx-icon lx-id=check ng-if=!lxStepNav.step.isEditable></lx-icon><lx-icon lx-id=pencil ng-if=lxStepNav.step.isEditable></lx-icon></div><div class="lx-step-nav__indicator lx-step-nav__indicator--error" ng-if="lxStepNav.step.isValid === false"><lx-icon lx-id=alert></lx-icon></div><div class=lx-step-nav__wrapper><div class=lx-step-nav__label><span>{{ lxStepNav.step.label }}</span></div><div class=lx-step-nav__state><span ng-if="(lxStepNav.step.isValid === undefined || lxStepNav.step.isValid === true) && lxStepNav.step.isOptional">{{ lxStepNav.parent.labels.optional }}</span> <span ng-if="lxStepNav.step.isValid === false">{{ lxStepNav.step.errorMessage }}</span></div></div></div>';
angular.module('lumx.stepper').run(['$templateCache', function ($templateCache) {$templateCache.put('step-nav.html', v1);}]);
module.exports=v1

/***/ }),
/* 185 */
/***/ (function(module, exports) {

var v1='<div class=lx-step ng-class=lxStep.getClasses()><div class=lx-step__nav ng-if="lxStep.parent.layout === \'vertical\'"><lx-step-nav lx-active-index="{{ lxStep.parent.activeIndex }}" lx-step=lxStep.step></lx-step-nav></div><div class=lx-step__wrapper ng-if="lxStep.parent.activeIndex === lxStep.step.index"><div class=lx-step__content><ng-transclude></ng-transclude><div class=lx-step__progress ng-if=lxStep.step.isLoading><lx-progress lx-type=circular></lx-progress></div></div><div class=lx-step__actions ng-if="lxStep.parent.activeIndex === lxStep.step.index && lxStep.parent.controls"><div class="lx-step__action lx-step__action--continue"><lx-button ng-click=lxStep.submitStep() ng-disabled=lxStep.isLoading>{{ lxStep.parent.labels.continue }}</lx-button></div><div class="lx-step__action lx-step__action--cancel" ng-if=lxStep.parent.cancel><lx-button lx-color=black lx-type=flat ng-click=lxStep.parent.cancel() ng-disabled=lxStep.isLoading>{{ lxStep.parent.labels.cancel }}</lx-button></div><div class="lx-step__action lx-step__action--back" ng-if=lxStep.parent.isLinear><lx-button lx-color=black lx-type=flat ng-click=lxStep.previousStep() ng-disabled="lxStep.isLoading || lxStep.step.index === 0">{{ lxStep.parent.labels.back }}</lx-button></div></div></div></div>';
angular.module('lumx.stepper').run(['$templateCache', function ($templateCache) {$templateCache.put('step.html', v1);}]);
module.exports=v1

/***/ }),
/* 186 */
/***/ (function(module, exports) {

var v1='<div class=lx-stepper ng-class=lxStepper.getClasses()><div class=lx-stepper__header ng-if="lxStepper.layout === \'horizontal\'"><div class=lx-stepper__nav><lx-step-nav lx-active-index="{{ lxStepper.activeIndex }}" lx-step=step ng-repeat="step in lxStepper.steps"></lx-step-nav></div><div class=lx-stepper__feedback ng-if=lxStepper.steps[lxStepper.activeIndex].feedback><span>{{ lxStepper.steps[lxStepper.activeIndex].feedback }}</span></div></div><div class=lx-stepper__steps ng-transclude></div></div>';
angular.module('lumx.stepper').run(['$templateCache', function ($templateCache) {$templateCache.put('stepper.html', v1);}]);
module.exports=v1

/***/ }),
/* 187 */
/***/ (function(module, exports) {

var v1='<span class=switch__help ng-transclude></span>';
angular.module('lumx.switch').run(['$templateCache', function ($templateCache) {$templateCache.put('switch-help.html', v1);}]);
module.exports=v1

/***/ }),
/* 188 */
/***/ (function(module, exports) {

var v1='<label for="{{ lxSwitchLabel.getSwitchId() }}" class=switch__label ng-transclude></label>';
angular.module('lumx.switch').run(['$templateCache', function ($templateCache) {$templateCache.put('switch-label.html', v1);}]);
module.exports=v1

/***/ }),
/* 189 */
/***/ (function(module, exports) {

var v1='<div class="switch switch--{{ lxSwitch.lxColor }} switch--{{ lxSwitch.lxPosition }}" ng-class="{ \'switch--theme-light\': !lxSwitch.lxTheme || lxSwitch.lxTheme === \'light\',\n                 \'switch--theme-dark\': lxSwitch.lxTheme === \'dark\' }"><input id="{{ lxSwitch.getSwitchId() }}" type=checkbox class=switch__input name="{{ lxSwitch.name }}" ng-model=lxSwitch.ngModel ng-true-value="{{ lxSwitch.ngTrueValue }}" ng-false-value="{{ lxSwitch.ngFalseValue }}" ng-change=lxSwitch.triggerNgChange() ng-disabled=lxSwitch.ngDisabled><label for="{{ lxSwitch.getSwitchId() }}" class=switch__label ng-transclude ng-if=!lxSwitch.getSwitchHasChildren()></label><ng-transclude-replace ng-if=lxSwitch.getSwitchHasChildren()></ng-transclude-replace></div>';
angular.module('lumx.switch').run(['$templateCache', function ($templateCache) {$templateCache.put('switch.html', v1);}]);
module.exports=v1

/***/ }),
/* 190 */
/***/ (function(module, exports) {

var v1='<div class="fab__actions fab__actions--{{ parentCtrl.lxDirection }}" ng-transclude></div>';
angular.module('lumx.fab').run(['$templateCache', function ($templateCache) {$templateCache.put('fab-actions.html', v1);}]);
module.exports=v1

/***/ }),
/* 191 */
/***/ (function(module, exports) {

var v1='<div class=fab__primary ng-transclude></div>';
angular.module('lumx.fab').run(['$templateCache', function ($templateCache) {$templateCache.put('fab-trigger.html', v1);}]);
module.exports=v1

/***/ }),
/* 192 */
/***/ (function(module, exports) {

var v1='<div class=fab ng-class="{ \'lx-fab--trigger-on-hover\': !lxFab.lxTriggerOnClick,\n                 \'lx-fab--trigger-on-click\': lxFab.lxTriggerOnClick,\n                 \'lx-fab--is-open\': lxFab.lxTriggerOnClick && lxFab.isOpen,\n                 \'lx-fab--is-close\': lxFab.lxTriggerOnClick && !lxFab.isOpen }" ng-click=lxFab.toggleState()><ng-transclude-replace></ng-transclude-replace></div>';
angular.module('lumx.fab').run(['$templateCache', function ($templateCache) {$templateCache.put('fab.html', v1);}]);
module.exports=v1

/***/ }),
/* 193 */
/***/ (function(module, exports) {

var v1='<i class="icon mdi" ng-class=lxIcon.getClass()></i>';
angular.module('lumx.icon').run(['$templateCache', function ($templateCache) {$templateCache.put('icon.html', v1);}]);
module.exports=v1

/***/ }),
/* 194 */
/***/ (function(module, exports) {

var v1='<div class=data-table-container><table class=data-table ng-class="{ \'data-table--bulk\': lxDataTable.bulk,\n                       \'data-table--border\': lxDataTable.border,\n                       \'data-table--thumbnail\': lxDataTable.thumbnail }"><thead><tr ng-class="{ \'data-table__selectable-row\': lxDataTable.selectable,\n                            \'data-table__selectable-row--is-selected\': lxDataTable.selectable && lxDataTable.allRowsSelected, }"><th align=center ng-if=lxDataTable.thumbnail><lx-button class=data-table__checkbox lx-type=icon lx-color="{{ lxDataTable.allRowsSelected ? \'accent\' : \'grey\' }}" ng-click=lxDataTable.toggleAllSelected() ng-if=lxDataTable.selectable><lx-icon lx-id=checkbox-blank-outline ng-if=!lxDataTable.allRowsSelected></lx-icon><lx-icon lx-id=checkbox-marked ng-if=lxDataTable.allRowsSelected></lx-icon></lx-button><th align=center ng-if="lxDataTable.selectable && !lxDataTable.thumbnail"><lx-button class=data-table__checkbox lx-type=icon lx-color="{{ lxDataTable.allRowsSelected ? \'accent\' : \'grey\' }}" ng-click=lxDataTable.toggleAllSelected()><lx-icon lx-id=checkbox-blank-outline ng-if=!lxDataTable.allRowsSelected></lx-icon><lx-icon lx-id=checkbox-marked ng-if=lxDataTable.allRowsSelected></lx-icon></lx-button><th align=left ng-class=" { \'data-table__sortable-cell\': th.sortable,\n                                 \'data-table__sortable-cell--asc\': th.sortable && th.sort === \'asc\',\n                                 \'data-table__sortable-cell--desc\': th.sortable && th.sort === \'desc\' }" ng-click=lxDataTable.sort(th) ng-repeat="th in lxDataTable.thead track by $index" ng-if="!lxDataTable.thumbnail || (lxDataTable.thumbnail && $index != 0)"><lx-icon lx-id="{{ th.icon }}" ng-if=th.icon></lx-icon><span>{{ th.label }}</span><tbody><tr ng-class="{ \'data-table__selectable-row\': lxDataTable.selectable,\n                            \'data-table__selectable-row--is-disabled\': lxDataTable.selectable && tr.lxDataTableDisabled,\n                            \'data-table__selectable-row--is-selected\': lxDataTable.selectable && tr.lxDataTableSelected,\n                            \'data-table__activable-row\': lxDataTable.activable,\n                            \'data-table__activable-row--is-activated\': lxDataTable.activable && tr.lxDataTableActivated }" ng-repeat="tr in lxDataTable.tbody" ng-click=lxDataTable.toggleActivation(tr)><td align=center ng-if=lxDataTable.thumbnail><div class=data-table__thumbnail ng-if=lxDataTable.thead[0].format ng-bind-html=lxDataTable.$sce.trustAsHtml(lxDataTable.thead[0].format(tr))></div><lx-button class=data-table__checkbox lx-type=icon lx-color="{{ tr.lxDataTableSelected ? \'accent\' : \'black\' }}" ng-click="lxDataTable.toggleSelection(tr, undefined, $event)" ng-if="lxDataTable.selectable && !tr.lxDataTableDisabled"><lx-icon lx-id=checkbox-blank-outline ng-if=!tr.lxDataTableSelected></lx-icon><lx-icon lx-id=checkbox-marked ng-if=tr.lxDataTableSelected></lx-icon></lx-button><td align=center ng-if="lxDataTable.selectable && !lxDataTable.thumbnail"><lx-button class=data-table__checkbox lx-type=icon lx-color="{{ tr.lxDataTableSelected ? \'accent\' : \'black\' }}" ng-click="lxDataTable.toggleSelection(tr, undefined, $event)" ng-disabled=tr.lxDataTableDisabled><lx-icon lx-id=checkbox-blank-outline ng-if=!tr.lxDataTableSelected></lx-icon><lx-icon lx-id=checkbox-marked ng-if=tr.lxDataTableSelected></lx-icon></lx-button><td align=left ng-repeat="th in lxDataTable.thead track by $index" ng-if="!lxDataTable.thumbnail || (lxDataTable.thumbnail && $index != 0)"><span ng-if=!th.format>{{ tr[th.name] }}</span><div ng-if=th.format ng-bind-html=lxDataTable.$sce.trustAsHtml(th.format(tr))></div></table></div>';
angular.module('lumx.data-table').run(['$templateCache', function ($templateCache) {$templateCache.put('data-table.html', v1);}]);
module.exports=v1

/***/ }),
/* 195 */
/***/ (function(module, exports) {

var v1='<div class="progress-container progress-container--{{ lxProgress.lxType }} progress-container--{{ lxProgress.lxColor }} {{ lxProgress.lxClass }}"><div class=progress-circular ng-if="lxProgress.lxType === \'circular\'" ng-style=lxProgress.getProgressDiameter()><svg class=progress-circular__svg><g transform="translate(50 50)"><g class=progress-circular__g><circle class=progress-circular__path cx=0 cy=0 r=20 fill=none stroke-width=4 stroke-miterlimit=10 ng-style=lxProgress.getCircularProgressValue()></circle></g></g></svg></div><div class=progress-linear ng-if="lxProgress.lxType === \'linear\'"><div class=progress-linear__background></div><div class="progress-linear__bar progress-linear__bar--first" ng-style=lxProgress.getLinearProgressValue()></div><div class="progress-linear__bar progress-linear__bar--second"></div></div></div>';
angular.module('lumx.progress').run(['$templateCache', function ($templateCache) {$templateCache.put('progress.html', v1);}]);
module.exports=v1

/***/ })
/******/ ]);
});