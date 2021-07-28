/*!
 * tui-image-editor.js
 * @version 3.14.3
 * @author NHN. FE Development Lab <dl_javascript@nhn.com>
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fabric")["fabric"], require("tui-code-snippet"), require("tui-color-picker"));
	else if(typeof define === 'function' && define.amd)
		define(["fabric", "tui-code-snippet", "tui-color-picker"], factory);
	else if(typeof exports === 'object')
		exports["ImageEditor"] = factory(require("fabric")["fabric"], require("tui-code-snippet"), require("tui-color-picker"));
	else
		root["tui"] = root["tui"] || {}, root["tui"]["ImageEditor"] = factory(root["fabric"], root["tui"]["util"], root["tui"]["colorPicker"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_fabric__, __WEBPACK_EXTERNAL_MODULE_tui_code_snippet__, __WEBPACK_EXTERNAL_MODULE_tui_color_picker__) {
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
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/core-js-pure/es/promise/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/es/promise/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es.aggregate-error */ "./node_modules/core-js-pure/modules/es.aggregate-error.js");
__webpack_require__(/*! ../../modules/es.object.to-string */ "./node_modules/core-js-pure/modules/es.object.to-string.js");
__webpack_require__(/*! ../../modules/es.promise */ "./node_modules/core-js-pure/modules/es.promise.js");
__webpack_require__(/*! ../../modules/es.promise.all-settled */ "./node_modules/core-js-pure/modules/es.promise.all-settled.js");
__webpack_require__(/*! ../../modules/es.promise.any */ "./node_modules/core-js-pure/modules/es.promise.any.js");
__webpack_require__(/*! ../../modules/es.promise.finally */ "./node_modules/core-js-pure/modules/es.promise.finally.js");
__webpack_require__(/*! ../../modules/es.string.iterator */ "./node_modules/core-js-pure/modules/es.string.iterator.js");
__webpack_require__(/*! ../../modules/web.dom-collections.iterator */ "./node_modules/core-js-pure/modules/web.dom-collections.iterator.js");
var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js-pure/internals/path.js");

module.exports = path.Promise;


/***/ }),

/***/ "./node_modules/core-js-pure/features/promise/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/features/promise/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(/*! ../../es/promise */ "./node_modules/core-js-pure/es/promise/index.js");
__webpack_require__(/*! ../../modules/esnext.aggregate-error */ "./node_modules/core-js-pure/modules/esnext.aggregate-error.js");
// TODO: Remove from `core-js@4`
__webpack_require__(/*! ../../modules/esnext.promise.all-settled */ "./node_modules/core-js-pure/modules/esnext.promise.all-settled.js");
__webpack_require__(/*! ../../modules/esnext.promise.try */ "./node_modules/core-js-pure/modules/esnext.promise.try.js");
__webpack_require__(/*! ../../modules/esnext.promise.any */ "./node_modules/core-js-pure/modules/esnext.promise.any.js");

module.exports = parent;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/a-function.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/a-function.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/a-possible-prototype.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/a-possible-prototype.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/add-to-unscopables.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/add-to-unscopables.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "./node_modules/core-js-pure/internals/an-instance.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/an-instance.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/an-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/an-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/array-includes.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/array-includes.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js-pure/internals/to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js-pure/internals/to-absolute-index.js");

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

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/check-correctness-of-iteration.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/check-correctness-of-iteration.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

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
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
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

/***/ "./node_modules/core-js-pure/internals/classof-raw.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/classof-raw.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/classof.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/classof.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js-pure/internals/to-string-tag-support.js");
var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js-pure/internals/classof-raw.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

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
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
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

/***/ "./node_modules/core-js-pure/internals/correct-prototype-getter.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/correct-prototype-getter.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/create-iterator-constructor.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/create-iterator-constructor.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js-pure/internals/iterators-core.js").IteratorPrototype;
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js-pure/internals/object-create.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js-pure/internals/create-property-descriptor.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js-pure/internals/set-to-string-tag.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js-pure/internals/iterators.js");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/create-non-enumerable-property.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js-pure/internals/object-define-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js-pure/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/create-property-descriptor.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/create-property-descriptor.js ***!
  \***************************************************************************/
/*! no static exports found */
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

/***/ "./node_modules/core-js-pure/internals/define-iterator.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/define-iterator.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js-pure/internals/create-iterator-constructor.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js-pure/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js-pure/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js-pure/internals/set-to-string-tag.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js-pure/internals/redefine.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js-pure/internals/is-pure.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js-pure/internals/iterators.js");
var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js-pure/internals/iterators-core.js");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
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
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

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
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/descriptors.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/descriptors.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/document-create-element.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/document-create-element.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/dom-iterables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/dom-iterables.js ***!
  \**************************************************************/
/*! no static exports found */
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

/***/ "./node_modules/core-js-pure/internals/engine-is-browser.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-is-browser.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = typeof window == 'object';


/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-is-ios.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-is-ios.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js-pure/internals/engine-user-agent.js");

module.exports = /(?:iphone|ipod|ipad).*applewebkit/i.test(userAgent);


/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-is-node.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-is-node.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js-pure/internals/classof-raw.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-is-webos-webkit.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-is-webos-webkit.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js-pure/internals/engine-user-agent.js");

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-user-agent.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-user-agent.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "./node_modules/core-js-pure/internals/engine-v8-version.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/engine-v8-version.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js-pure/internals/engine-user-agent.js");

var process = global.process;
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

module.exports = version && +version;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/enum-bug-keys.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/enum-bug-keys.js ***!
  \**************************************************************/
/*! no static exports found */
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

/***/ "./node_modules/core-js-pure/internals/export.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/export.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js").f;
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js-pure/internals/is-forced.js");
var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js-pure/internals/path.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js-pure/internals/function-bind-context.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js-pure/internals/has.js");

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return NativeConstructor.apply(this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

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
  var PROTO = options.proto;

  var nativeSource = GLOBAL ? global : STATIC ? global[TARGET] : (global[TARGET] || {}).prototype;

  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

    // bind timers to global for call from export context
    if (options.bind && USE_NATIVE) resultProperty = bind(sourceProperty, global);
    // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && typeof sourceProperty == 'function') resultProperty = bind(Function.call, sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    target[key] = resultProperty;

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!has(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
      // export real prototype methods
      if (options.real && targetPrototype && !targetPrototype[key]) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/fails.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/fails.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/function-bind-context.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/function-bind-context.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js-pure/internals/a-function.js");

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

/***/ "./node_modules/core-js-pure/internals/get-built-in.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/get-built-in.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js-pure/internals/path.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/get-iterator-method.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/get-iterator-method.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js-pure/internals/classof.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js-pure/internals/iterators.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/global.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/global.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/core-js-pure/internals/has.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js-pure/internals/has.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js-pure/internals/to-object.js");

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/hidden-keys.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/hidden-keys.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/host-report-errors.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/host-report-errors.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/html.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js-pure/internals/html.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "./node_modules/core-js-pure/internals/ie8-dom-define.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/ie8-dom-define.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js-pure/internals/document-create-element.js");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/indexed-object.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/indexed-object.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js-pure/internals/classof-raw.js");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/inspect-source.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/inspect-source.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js-pure/internals/shared-store.js");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/internal-state.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/internal-state.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js-pure/internals/native-weak-map.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var objectHas = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js-pure/internals/has.js");
var shared = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js-pure/internals/shared-store.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js-pure/internals/shared-key.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js-pure/internals/hidden-keys.js");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
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
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
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

/***/ "./node_modules/core-js-pure/internals/is-array-iterator-method.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-array-iterator-method.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js-pure/internals/iterators.js");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-forced.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-forced.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");

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

/***/ "./node_modules/core-js-pure/internals/is-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/is-pure.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/is-pure.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/iterate.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/iterate.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js-pure/internals/an-object.js");
var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js-pure/internals/is-array-iterator-method.js");
var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js-pure/internals/to-length.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js-pure/internals/function-bind-context.js");
var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js-pure/internals/get-iterator-method.js");
var iteratorClose = __webpack_require__(/*! ../internals/iterator-close */ "./node_modules/core-js-pure/internals/iterator-close.js");

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/iterator-close.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/iterator-close.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js-pure/internals/an-object.js");

module.exports = function (iterator) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined) {
    return anObject(returnMethod.call(iterator)).value;
  }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/iterators-core.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/iterators-core.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js-pure/internals/object-get-prototype-of.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js-pure/internals/has.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js-pure/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

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

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ((!IS_PURE || NEW_ITERATOR_PROTOTYPE) && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/iterators.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/iterators.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/microtask.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/microtask.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js").f;
var macrotask = __webpack_require__(/*! ../internals/task */ "./node_modules/core-js-pure/internals/task.js").set;
var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ "./node_modules/core-js-pure/internals/engine-is-ios.js");
var IS_WEBOS_WEBKIT = __webpack_require__(/*! ../internals/engine-is-webos-webkit */ "./node_modules/core-js-pure/internals/engine-is-webos-webkit.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js-pure/internals/engine-is-node.js");

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
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

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = promise.then;
    notify = function () {
      then.call(promise, flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
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

/***/ "./node_modules/core-js-pure/internals/native-promise-constructor.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/native-promise-constructor.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");

module.exports = global.Promise;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/native-symbol.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/native-symbol.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js-pure/internals/engine-v8-version.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  return !String(Symbol()) ||
    // Chrome 38 Symbol has incorrect toString conversion
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/native-weak-map.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/native-weak-map.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js-pure/internals/inspect-source.js");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "./node_modules/core-js-pure/internals/new-promise-capability.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/new-promise-capability.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js-pure/internals/a-function.js");

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

/***/ "./node_modules/core-js-pure/internals/object-create.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-create.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js-pure/internals/an-object.js");
var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js-pure/internals/object-define-properties.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js-pure/internals/enum-bug-keys.js");
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js-pure/internals/hidden-keys.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js-pure/internals/html.js");
var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js-pure/internals/document-create-element.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js-pure/internals/shared-key.js");

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
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-define-properties.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-define-properties.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js-pure/internals/object-define-property.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js-pure/internals/an-object.js");
var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js-pure/internals/object-keys.js");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
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

/***/ "./node_modules/core-js-pure/internals/object-define-property.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-define-property.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js-pure/internals/ie8-dom-define.js");
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js-pure/internals/an-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js-pure/internals/to-primitive.js");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-get-own-property-descriptor.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");
var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js-pure/internals/object-property-is-enumerable.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js-pure/internals/create-property-descriptor.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js-pure/internals/to-primitive.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js-pure/internals/has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js-pure/internals/ie8-dom-define.js");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-get-prototype-of.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-get-prototype-of.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js-pure/internals/has.js");
var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js-pure/internals/to-object.js");
var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js-pure/internals/shared-key.js");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js-pure/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-keys-internal.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-keys-internal.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js-pure/internals/has.js");
var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var indexOf = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js-pure/internals/array-includes.js").indexOf;
var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js-pure/internals/hidden-keys.js");

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

/***/ "./node_modules/core-js-pure/internals/object-keys.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-keys.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js-pure/internals/object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js-pure/internals/enum-bug-keys.js");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-property-is-enumerable.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-property-is-enumerable.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-set-prototype-of.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-set-prototype-of.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js-pure/internals/an-object.js");
var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "./node_modules/core-js-pure/internals/a-possible-prototype.js");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
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


/***/ }),

/***/ "./node_modules/core-js-pure/internals/object-to-string.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/object-to-string.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js-pure/internals/to-string-tag-support.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js-pure/internals/classof.js");

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/path.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js-pure/internals/path.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/perform.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/perform.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/promise-resolve.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/promise-resolve.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js-pure/internals/an-object.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");
var newPromiseCapability = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js-pure/internals/new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/redefine-all.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/redefine-all.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js-pure/internals/redefine.js");

module.exports = function (target, src, options) {
  for (var key in src) {
    if (options && options.unsafe && target[key]) target[key] = src[key];
    else redefine(target, key, src[key], options);
  } return target;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/redefine.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/redefine.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");

module.exports = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;
  else createNonEnumerableProperty(target, key, value);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/require-object-coercible.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/require-object-coercible.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/set-global.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/set-global.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/set-species.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/set-species.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");
var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js-pure/internals/object-define-property.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");
var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js-pure/internals/descriptors.js");

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

/***/ "./node_modules/core-js-pure/internals/set-to-string-tag.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/set-to-string-tag.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js-pure/internals/to-string-tag-support.js");
var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js-pure/internals/object-define-property.js").f;
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js-pure/internals/has.js");
var toString = __webpack_require__(/*! ../internals/object-to-string */ "./node_modules/core-js-pure/internals/object-to-string.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;
    if (!has(target, TO_STRING_TAG)) {
      defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
    }
    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
      createNonEnumerableProperty(target, 'toString', toString);
    }
  }
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/shared-key.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/shared-key.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js-pure/internals/shared.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js-pure/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/shared-store.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/shared-store.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js-pure/internals/set-global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "./node_modules/core-js-pure/internals/shared.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js-pure/internals/shared.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js-pure/internals/is-pure.js");
var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js-pure/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.13.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/core-js-pure/internals/species-constructor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/species-constructor.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js-pure/internals/an-object.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js-pure/internals/a-function.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/string-multibyte.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/string-multibyte.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js-pure/internals/to-integer.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js-pure/internals/require-object-coercible.js");

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
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/task.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js-pure/internals/task.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js-pure/internals/function-bind-context.js");
var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js-pure/internals/html.js");
var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js-pure/internals/document-create-element.js");
var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ "./node_modules/core-js-pure/internals/engine-is-ios.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js-pure/internals/engine-is-node.js");

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
  // eslint-disable-next-line no-prototype-builtins -- safe
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
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
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
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    typeof postMessage == 'function' &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
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

/***/ "./node_modules/core-js-pure/internals/to-absolute-index.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-absolute-index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js-pure/internals/to-integer.js");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-indexed-object.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-indexed-object.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js-pure/internals/indexed-object.js");
var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js-pure/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-integer.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-integer.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-length.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-length.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js-pure/internals/to-integer.js");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js-pure/internals/require-object-coercible.js");

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/to-primitive.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-primitive.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
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

/***/ "./node_modules/core-js-pure/internals/to-string-tag-support.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/to-string-tag-support.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "./node_modules/core-js-pure/internals/uid.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js-pure/internals/uid.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "./node_modules/core-js-pure/internals/use-symbol-as-uid.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/use-symbol-as-uid.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js-pure/internals/native-symbol.js");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "./node_modules/core-js-pure/internals/well-known-symbol.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/internals/well-known-symbol.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js-pure/internals/shared.js");
var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js-pure/internals/has.js");
var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js-pure/internals/uid.js");
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js-pure/internals/native-symbol.js");
var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js-pure/internals/use-symbol-as-uid.js");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.aggregate-error.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.aggregate-error.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js-pure/internals/object-get-prototype-of.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js-pure/internals/object-set-prototype-of.js");
var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js-pure/internals/object-create.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js-pure/internals/create-property-descriptor.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js-pure/internals/iterate.js");

var $AggregateError = function AggregateError(errors, message) {
  var that = this;
  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
  if (setPrototypeOf) {
    // eslint-disable-next-line unicorn/error-message -- expected
    that = setPrototypeOf(new Error(undefined), getPrototypeOf(that));
  }
  if (message !== undefined) createNonEnumerableProperty(that, 'message', String(message));
  var errorsArray = [];
  iterate(errors, errorsArray.push, { that: errorsArray });
  createNonEnumerableProperty(that, 'errors', errorsArray);
  return that;
};

$AggregateError.prototype = create(Error.prototype, {
  constructor: createPropertyDescriptor(5, $AggregateError),
  message: createPropertyDescriptor(5, ''),
  name: createPropertyDescriptor(5, 'AggregateError')
});

// `AggregateError` constructor
// https://tc39.es/ecma262/#sec-aggregate-error-constructor
$({ global: true }, {
  AggregateError: $AggregateError
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.array.iterator.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.array.iterator.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js-pure/internals/to-indexed-object.js");
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js-pure/internals/add-to-unscopables.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js-pure/internals/iterators.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js-pure/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js-pure/internals/define-iterator.js");

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
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
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

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.object.to-string.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.object.to-string.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// empty


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.promise.all-settled.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.promise.all-settled.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js-pure/internals/a-function.js");
var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js-pure/internals/new-promise-capability.js");
var perform = __webpack_require__(/*! ../internals/perform */ "./node_modules/core-js-pure/internals/perform.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js-pure/internals/iterate.js");

// `Promise.allSettled` method
// https://tc39.es/ecma262/#sec-promise.allsettled
$({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (error) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: error };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.promise.any.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.promise.any.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js-pure/internals/a-function.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");
var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js-pure/internals/new-promise-capability.js");
var perform = __webpack_require__(/*! ../internals/perform */ "./node_modules/core-js-pure/internals/perform.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js-pure/internals/iterate.js");

var PROMISE_ANY_ERROR = 'No one promise resolved';

// `Promise.any` method
// https://tc39.es/ecma262/#sec-promise.any
$({ target: 'Promise', stat: true }, {
  any: function any(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        errors.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (error) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = error;
          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.promise.finally.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.promise.finally.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js-pure/internals/is-pure.js");
var NativePromise = __webpack_require__(/*! ../internals/native-promise-constructor */ "./node_modules/core-js-pure/internals/native-promise-constructor.js");
var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js-pure/internals/fails.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js-pure/internals/species-constructor.js");
var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ "./node_modules/core-js-pure/internals/promise-resolve.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js-pure/internals/redefine.js");

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!NativePromise && fails(function () {
  NativePromise.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
$({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
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

// makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
if (!IS_PURE && typeof NativePromise == 'function') {
  var method = getBuiltIn('Promise').prototype['finally'];
  if (NativePromise.prototype['finally'] !== method) {
    redefine(NativePromise.prototype, 'finally', method, { unsafe: true });
  }
}


/***/ }),

/***/ "./node_modules/core-js-pure/modules/es.promise.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.promise.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js-pure/internals/is-pure.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js-pure/internals/get-built-in.js");
var NativePromise = __webpack_require__(/*! ../internals/native-promise-constructor */ "./node_modules/core-js-pure/internals/native-promise-constructor.js");
var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js-pure/internals/redefine.js");
var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js-pure/internals/redefine-all.js");
var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js-pure/internals/object-set-prototype-of.js");
var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js-pure/internals/set-to-string-tag.js");
var setSpecies = __webpack_require__(/*! ../internals/set-species */ "./node_modules/core-js-pure/internals/set-species.js");
var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js-pure/internals/is-object.js");
var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js-pure/internals/a-function.js");
var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js-pure/internals/an-instance.js");
var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js-pure/internals/inspect-source.js");
var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js-pure/internals/iterate.js");
var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js-pure/internals/check-correctness-of-iteration.js");
var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js-pure/internals/species-constructor.js");
var task = __webpack_require__(/*! ../internals/task */ "./node_modules/core-js-pure/internals/task.js").set;
var microtask = __webpack_require__(/*! ../internals/microtask */ "./node_modules/core-js-pure/internals/microtask.js");
var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ "./node_modules/core-js-pure/internals/promise-resolve.js");
var hostReportErrors = __webpack_require__(/*! ../internals/host-report-errors */ "./node_modules/core-js-pure/internals/host-report-errors.js");
var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js-pure/internals/new-promise-capability.js");
var perform = __webpack_require__(/*! ../internals/perform */ "./node_modules/core-js-pure/internals/perform.js");
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js-pure/internals/internal-state.js");
var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js-pure/internals/is-forced.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");
var IS_BROWSER = __webpack_require__(/*! ../internals/engine-is-browser */ "./node_modules/core-js-pure/internals/engine-is-browser.js");
var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js-pure/internals/engine-is-node.js");
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js-pure/internals/engine-v8-version.js");

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var NativePromisePrototype = NativePromise && NativePromise.prototype;
var PromiseConstructor = NativePromise;
var PromiseConstructorPrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var SUBCLASSING = false;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (IS_PURE && !PromiseConstructorPrototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = new PromiseConstructor(function (resolve) { resolve(1); });
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
  if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  return !GLOBAL_CORE_JS_PROMISE && IS_BROWSER && !NATIVE_REJECTION_EVENT;
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (state, isReject) {
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
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
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
    if (isReject && !state.rejection) onUnhandled(state);
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
  if (!NATIVE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
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

var onHandleUnhandled = function (state) {
  task.call(global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
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
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromiseConstructorPrototype = PromiseConstructor.prototype;
  // eslint-disable-next-line no-unused-vars -- required for `.length`
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
  Internal.prototype = redefineAll(PromiseConstructorPrototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function' && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      redefine(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          nativeThen.call(that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });

      // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
      redefine(NativePromisePrototype, 'catch', PromiseConstructorPrototype['catch'], { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromiseConstructorPrototype);
    }
  }
}

$({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
$({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

$({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

$({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
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
  // https://tc39.es/ecma262/#sec-promise.race
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

/***/ "./node_modules/core-js-pure/modules/es.string.iterator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/es.string.iterator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js-pure/internals/string-multibyte.js").charAt;
var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js-pure/internals/internal-state.js");
var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js-pure/internals/define-iterator.js");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.aggregate-error.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.aggregate-error.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(/*! ./es.aggregate-error */ "./node_modules/core-js-pure/modules/es.aggregate-error.js");


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.promise.all-settled.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.promise.all-settled.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(/*! ./es.promise.all-settled.js */ "./node_modules/core-js-pure/modules/es.promise.all-settled.js");


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.promise.any.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.promise.any.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(/*! ./es.promise.any */ "./node_modules/core-js-pure/modules/es.promise.any.js");


/***/ }),

/***/ "./node_modules/core-js-pure/modules/esnext.promise.try.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/esnext.promise.try.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js-pure/internals/export.js");
var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js-pure/internals/new-promise-capability.js");
var perform = __webpack_require__(/*! ../internals/perform */ "./node_modules/core-js-pure/internals/perform.js");

// `Promise.try` method
// https://github.com/tc39/proposal-promise-try
$({ target: 'Promise', stat: true }, {
  'try': function (callbackfn) {
    var promiseCapability = newPromiseCapabilityModule.f(this);
    var result = perform(callbackfn);
    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
    return promiseCapability.promise;
  }
});


/***/ }),

/***/ "./node_modules/core-js-pure/modules/web.dom-collections.iterator.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js-pure/modules/web.dom-collections.iterator.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./es.array.iterator */ "./node_modules/core-js-pure/modules/es.array.iterator.js");
var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js-pure/internals/dom-iterables.js");
var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js-pure/internals/global.js");
var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js-pure/internals/classof.js");
var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js-pure/internals/create-non-enumerable-property.js");
var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js-pure/internals/iterators.js");
var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js-pure/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  }
  Iterators[COLLECTION_NAME] = Iterators.Array;
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
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

/***/ "./src/css/index.styl":
/*!****************************!*\
  !*** ./src/css/index.styl ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! @/polyfill */ "./src/js/polyfill.js");

var _imageEditor = __webpack_require__(/*! @/imageEditor */ "./src/js/imageEditor.js");

var _imageEditor2 = _interopRequireDefault(_imageEditor);

__webpack_require__(/*! @css/index.styl */ "./src/css/index.styl");

__webpack_require__(/*! @/command/addIcon */ "./src/js/command/addIcon.js");

__webpack_require__(/*! @/command/addImageObject */ "./src/js/command/addImageObject.js");

__webpack_require__(/*! @/command/addObject */ "./src/js/command/addObject.js");

__webpack_require__(/*! @/command/addShape */ "./src/js/command/addShape.js");

__webpack_require__(/*! @/command/addText */ "./src/js/command/addText.js");

__webpack_require__(/*! @/command/applyFilter */ "./src/js/command/applyFilter.js");

__webpack_require__(/*! @/command/changeIconColor */ "./src/js/command/changeIconColor.js");

__webpack_require__(/*! @/command/changeShape */ "./src/js/command/changeShape.js");

__webpack_require__(/*! @/command/changeText */ "./src/js/command/changeText.js");

__webpack_require__(/*! @/command/changeTextStyle */ "./src/js/command/changeTextStyle.js");

__webpack_require__(/*! @/command/clearObjects */ "./src/js/command/clearObjects.js");

__webpack_require__(/*! @/command/flip */ "./src/js/command/flip.js");

__webpack_require__(/*! @/command/loadImage */ "./src/js/command/loadImage.js");

__webpack_require__(/*! @/command/removeFilter */ "./src/js/command/removeFilter.js");

__webpack_require__(/*! @/command/removeObject */ "./src/js/command/removeObject.js");

__webpack_require__(/*! @/command/resizeCanvasDimension */ "./src/js/command/resizeCanvasDimension.js");

__webpack_require__(/*! @/command/rotate */ "./src/js/command/rotate.js");

__webpack_require__(/*! @/command/setObjectProperties */ "./src/js/command/setObjectProperties.js");

__webpack_require__(/*! @/command/setObjectPosition */ "./src/js/command/setObjectPosition.js");

__webpack_require__(/*! @/command/changeSelection */ "./src/js/command/changeSelection.js");

__webpack_require__(/*! @/command/resize */ "./src/js/command/resize.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _imageEditor2.default;

// commands

/***/ }),

/***/ "./src/js/action.js":
/*!**************************!*\
  !*** ./src/js/action.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _imagetracer = __webpack_require__(/*! @/helper/imagetracer */ "./src/js/helper/imagetracer.js");

var _imagetracer2 = _interopRequireDefault(_imagetracer);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  /**
   * Get ui actions
   * @returns {Object} actions for ui
   * @private
   */
  getActions: function getActions() {
    return {
      main: this._mainAction(),
      shape: this._shapeAction(),
      crop: this._cropAction(),
      resize: this._resizeAction(),
      flip: this._flipAction(),
      rotate: this._rotateAction(),
      text: this._textAction(),
      mask: this._maskAction(),
      draw: this._drawAction(),
      icon: this._iconAction(),
      filter: this._filterAction(),
      history: this._historyAction()
    };
  },


  /**
   * Main Action
   * @returns {Object} actions for ui main
   * @private
   */
  _mainAction: function _mainAction() {
    var _this = this;

    var exitCropOnAction = function exitCropOnAction() {
      if (_this.ui.submenu === 'crop') {
        _this.stopDrawingMode();
        _this.ui.changeMenu('crop');
      }
    };
    var setAngleRangeBarOnAction = function setAngleRangeBarOnAction(angle) {
      if (_this.ui.submenu === 'rotate') {
        _this.ui.rotate.setRangeBarAngle('setAngle', angle);
      }
    };
    var setFilterStateRangeBarOnAction = function setFilterStateRangeBarOnAction(filterOptions) {
      if (_this.ui.submenu === 'filter') {
        _this.ui.filter.setFilterState(filterOptions);
      }
    };
    var onEndUndoRedo = function onEndUndoRedo(result) {
      setAngleRangeBarOnAction(result);
      setFilterStateRangeBarOnAction(result);

      return result;
    };
    var toggleZoomMode = function toggleZoomMode() {
      var zoomMode = _this._graphics.getZoomMode();

      _this.stopDrawingMode();
      if (zoomMode !== _consts.zoomModes.ZOOM) {
        _this.startDrawingMode(_consts.drawingModes.ZOOM);
        _this._graphics.startZoomInMode();
      } else {
        _this._graphics.endZoomInMode();
      }
    };
    var toggleHandMode = function toggleHandMode() {
      var zoomMode = _this._graphics.getZoomMode();

      _this.stopDrawingMode();
      if (zoomMode !== _consts.zoomModes.HAND) {
        _this.startDrawingMode(_consts.drawingModes.ZOOM);
        _this._graphics.startHandMode();
      } else {
        _this._graphics.endHandMode();
      }
    };
    var initFilterState = function initFilterState() {
      if (_this.ui.filter) {
        _this.ui.filter.initFilterCheckBoxState();
      }
    };

    return (0, _tuiCodeSnippet.extend)({
      initLoadImage: function initLoadImage(imagePath, imageName) {
        return _this.loadImageFromURL(imagePath, imageName).then(function (sizeValue) {
          exitCropOnAction();
          _this.ui.initializeImgUrl = imagePath;
          _this.ui.resizeEditor({ imageSize: sizeValue });
          _this.clearUndoStack();
          _this._invoker.fire(_consts.eventNames.EXECUTE_COMMAND, _consts.historyNames.LOAD_IMAGE);
        });
      },
      undo: function undo() {
        if (!_this.isEmptyUndoStack()) {
          exitCropOnAction();
          _this.deactivateAll();
          _this.undo().then(onEndUndoRedo);
        }
      },
      redo: function redo() {
        if (!_this.isEmptyRedoStack()) {
          exitCropOnAction();
          _this.deactivateAll();
          _this.redo().then(onEndUndoRedo);
        }
      },
      reset: function reset() {
        exitCropOnAction();
        _this.loadImageFromURL(_this.ui.initializeImgUrl, 'resetImage').then(function (sizeValue) {
          exitCropOnAction();
          initFilterState();
          _this.ui.resizeEditor({ imageSize: sizeValue });
          _this.clearUndoStack();
          _this._initHistory();
        });
      },
      delete: function _delete() {
        _this.ui.changeHelpButtonEnabled('delete', false);
        exitCropOnAction();
        _this.removeActiveObject();
        _this.activeObjectId = null;
      },
      deleteAll: function deleteAll() {
        exitCropOnAction();
        _this.clearObjects();
        _this.ui.changeHelpButtonEnabled('delete', false);
        _this.ui.changeHelpButtonEnabled('deleteAll', false);
      },
      load: function load(file) {
        if (!(0, _util.isSupportFileApi)()) {
          alert('This browser does not support file-api');
        }

        _this.ui.initializeImgUrl = URL.createObjectURL(file);
        _this.loadImageFromFile(file).then(function (sizeValue) {
          exitCropOnAction();
          initFilterState();
          _this.clearUndoStack();
          _this.ui.activeMenuEvent();
          _this.ui.resizeEditor({ imageSize: sizeValue });
          _this._clearHistory();
          _this._invoker.fire(_consts.eventNames.EXECUTE_COMMAND, _consts.historyNames.LOAD_IMAGE);
        })['catch'](function (message) {
          return Promise.reject(message);
        });
      },
      download: function download() {
        var dataURL = _this.toDataURL();
        var imageName = _this.getImageName();
        var blob = void 0,
            type = void 0,
            w = void 0;

        if ((0, _util.isSupportFileApi)() && window.saveAs) {
          blob = (0, _util.base64ToBlob)(dataURL);
          type = blob.type.split('/')[1];
          if (imageName.split('.').pop() !== type) {
            imageName += '.' + type;
          }
          saveAs(blob, imageName); // eslint-disable-line
        } else {
          w = window.open();
          w.document.body.innerHTML = '<img src=\'' + dataURL + '\'>';
        }
      },
      history: function history(event) {
        _this.ui.toggleHistoryMenu(event);
      },
      zoomIn: function zoomIn() {
        _this.ui.toggleZoomButtonStatus('zoomIn');
        _this.deactivateAll();
        toggleZoomMode();
      },
      zoomOut: function zoomOut() {
        _this._graphics.zoomOut();
      },
      hand: function hand() {
        _this.ui.offZoomInButtonStatus();
        _this.ui.toggleZoomButtonStatus('hand');
        _this.deactivateAll();
        toggleHandMode();
      }
    }, this._commonAction());
  },


  /**
   * Icon Action
   * @returns {Object} actions for ui icon
   * @private
   */
  _iconAction: function _iconAction() {
    var _this2 = this;

    return (0, _tuiCodeSnippet.extend)({
      changeColor: function changeColor(color) {
        if (_this2.activeObjectId) {
          _this2.changeIconColor(_this2.activeObjectId, color);
        }
      },
      addIcon: function addIcon(iconType, iconColor) {
        _this2.startDrawingMode('ICON');
        _this2.setDrawingIcon(iconType, iconColor);
      },
      cancelAddIcon: function cancelAddIcon() {
        _this2.ui.icon.clearIconType();
        _this2.changeSelectableAll(true);
        _this2.changeCursor('default');
        _this2.stopDrawingMode();
      },
      registerDefaultIcons: function registerDefaultIcons(type, path) {
        var iconObj = {};
        iconObj[type] = path;
        _this2.registerIcons(iconObj);
      },
      registerCustomIcon: function registerCustomIcon(imgUrl, file) {
        var imagetracer = new _imagetracer2.default();
        imagetracer.imageToSVG(imgUrl, function (svgstr) {
          var _svgstr$match = svgstr.match(/path[^>]*d="([^"]*)"/),
              svgPath = _svgstr$match[1];

          var iconObj = {};
          iconObj[file.name] = svgPath;
          _this2.registerIcons(iconObj);
          _this2.addIcon(file.name, {
            left: 100,
            top: 100
          });
        }, _imagetracer2.default.tracerDefaultOption());
      }
    }, this._commonAction());
  },


  /**
   * Draw Action
   * @returns {Object} actions for ui draw
   * @private
   */
  _drawAction: function _drawAction() {
    var _this3 = this;

    return (0, _tuiCodeSnippet.extend)({
      setDrawMode: function setDrawMode(type, settings) {
        _this3.stopDrawingMode();
        if (type === 'free') {
          _this3.startDrawingMode('FREE_DRAWING', settings);
        } else {
          _this3.startDrawingMode('LINE_DRAWING', settings);
        }
      },
      setColor: function setColor(color) {
        _this3.setBrush({
          color: color
        });
      }
    }, this._commonAction());
  },


  /**
   * Mask Action
   * @returns {Object} actions for ui mask
   * @private
   */
  _maskAction: function _maskAction() {
    var _this4 = this;

    return (0, _tuiCodeSnippet.extend)({
      loadImageFromURL: function loadImageFromURL(imgUrl, file) {
        return _this4.loadImageFromURL(_this4.toDataURL(), 'FilterImage').then(function () {
          _this4.addImageObject(imgUrl).then(function () {
            URL.revokeObjectURL(file);
          });
          _this4._invoker.fire(_consts.eventNames.EXECUTE_COMMAND, _consts.historyNames.LOAD_MASK_IMAGE);
        });
      },
      applyFilter: function applyFilter() {
        _this4.applyFilter('mask', {
          maskObjId: _this4.activeObjectId
        });
      }
    }, this._commonAction());
  },


  /**
   * Text Action
   * @returns {Object} actions for ui text
   * @private
   */
  _textAction: function _textAction() {
    var _this5 = this;

    return (0, _tuiCodeSnippet.extend)({
      changeTextStyle: function changeTextStyle(styleObj, isSilent) {
        if (_this5.activeObjectId) {
          _this5.changeTextStyle(_this5.activeObjectId, styleObj, isSilent);
        }
      }
    }, this._commonAction());
  },


  /**
   * Rotate Action
   * @returns {Object} actions for ui rotate
   * @private
   */
  _rotateAction: function _rotateAction() {
    var _this6 = this;

    return (0, _tuiCodeSnippet.extend)({
      rotate: function rotate(angle, isSilent) {
        _this6.rotate(angle, isSilent);
        _this6.ui.resizeEditor();
        _this6.ui.rotate.setRangeBarAngle('rotate', angle);
      },
      setAngle: function setAngle(angle, isSilent) {
        _this6.setAngle(angle, isSilent);
        _this6.ui.resizeEditor();
        _this6.ui.rotate.setRangeBarAngle('setAngle', angle);
      }
    }, this._commonAction());
  },


  /**
   * Shape Action
   * @returns {Object} actions for ui shape
   * @private
   */
  _shapeAction: function _shapeAction() {
    var _this7 = this;

    return (0, _tuiCodeSnippet.extend)({
      changeShape: function changeShape(changeShapeObject, isSilent) {
        if (_this7.activeObjectId) {
          _this7.changeShape(_this7.activeObjectId, changeShapeObject, isSilent);
        }
      },
      setDrawingShape: function setDrawingShape(shapeType) {
        _this7.setDrawingShape(shapeType);
      }
    }, this._commonAction());
  },


  /**
   * Crop Action
   * @returns {Object} actions for ui crop
   * @private
   */
  _cropAction: function _cropAction() {
    var _this8 = this;

    return (0, _tuiCodeSnippet.extend)({
      crop: function crop() {
        var cropRect = _this8.getCropzoneRect();
        if (cropRect && !(0, _util.isEmptyCropzone)(cropRect)) {
          _this8.crop(cropRect).then(function () {
            _this8.stopDrawingMode();
            _this8.ui.resizeEditor();
            _this8.ui.changeMenu('crop');
            _this8._invoker.fire(_consts.eventNames.EXECUTE_COMMAND, _consts.historyNames.CROP);
          })['catch'](function (message) {
            return Promise.reject(message);
          });
        }
      },
      cancel: function cancel() {
        _this8.stopDrawingMode();
        _this8.ui.changeMenu('crop');
      },
      /* eslint-disable */
      preset: function preset(presetType) {
        switch (presetType) {
          case 'preset-square':
            _this8.setCropzoneRect(1 / 1);
            break;
          case 'preset-3-2':
            _this8.setCropzoneRect(3 / 2);
            break;
          case 'preset-4-3':
            _this8.setCropzoneRect(4 / 3);
            break;
          case 'preset-5-4':
            _this8.setCropzoneRect(5 / 4);
            break;
          case 'preset-7-5':
            _this8.setCropzoneRect(7 / 5);
            break;
          case 'preset-16-9':
            _this8.setCropzoneRect(16 / 9);
            break;
          default:
            _this8.setCropzoneRect();
            _this8.ui.crop.changeApplyButtonStatus(false);
            break;
        }
      }
    }, this._commonAction());
  },


  /**
   * Resize Action
   * @returns {Object} actions for ui resize
   * @private
   */
  _resizeAction: function _resizeAction() {
    var _this9 = this;

    return (0, _tuiCodeSnippet.extend)({
      getCurrentDimensions: function getCurrentDimensions() {
        return _this9._graphics.getCurrentDimensions();
      },
      preview: function preview(actor, value, lockState) {
        var currentDimensions = _this9._graphics.getCurrentDimensions();
        var calcAspectRatio = function calcAspectRatio() {
          return currentDimensions.width / currentDimensions.height;
        };

        var dimensions = {};
        switch (actor) {
          case 'width':
            dimensions.width = value;
            if (lockState) {
              dimensions.height = value / calcAspectRatio();
            } else {
              dimensions.height = currentDimensions.height;
            }
            break;
          case 'height':
            dimensions.height = value;
            if (lockState) {
              dimensions.width = value * calcAspectRatio();
            } else {
              dimensions.width = currentDimensions.width;
            }
            break;
          default:
            dimensions = currentDimensions;
        }

        _this9._graphics.resize(dimensions).then(function () {
          _this9.ui.resizeEditor();
        });

        if (lockState) {
          _this9.ui.resize.setWidthValue(dimensions.width);
          _this9.ui.resize.setHeightValue(dimensions.height);
        }
      },
      lockAspectRatio: function lockAspectRatio(lockState, min, max) {
        var _graphics$getCurrentD = _this9._graphics.getCurrentDimensions(),
            width = _graphics$getCurrentD.width,
            height = _graphics$getCurrentD.height;

        var aspectRatio = width / height;
        if (lockState) {
          if (width > height) {
            var pMax = max / aspectRatio;
            var pMin = min * aspectRatio;
            _this9.ui.resize.setLimit({
              minWidth: pMin > min ? pMin : min,
              minHeight: min,
              maxWidth: max,
              maxHeight: pMax < max ? pMax : max
            });
          } else {
            var _pMax = max * aspectRatio;
            var _pMin = min / aspectRatio;
            _this9.ui.resize.setLimit({
              minWidth: min,
              minHeight: _pMin > min ? _pMin : min,
              maxWidth: _pMax < max ? _pMax : max,
              maxHeight: max
            });
          }
        } else {
          _this9.ui.resize.setLimit({
            minWidth: min,
            minHeight: min,
            maxWidth: max,
            maxHeight: max
          });
        }
      },
      resize: function resize() {
        var dimensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (!dimensions) {
          dimensions = _this9._graphics.getCurrentDimensions();
        }

        _this9.resize(dimensions).then(function () {
          _this9._graphics.setOriginalDimensions(dimensions);
          _this9.stopDrawingMode();
          _this9.ui.resizeEditor();
          _this9.ui.changeMenu('resize');
        })['catch'](function (message) {
          return Promise.reject(message);
        });
      },
      reset: function reset() {
        var standByMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var dimensions = _this9._graphics.getOriginalDimensions();

        _this9.ui.resize.setWidthValue(dimensions.width, true);
        _this9.ui.resize.setHeightValue(dimensions.height, true);

        _this9._graphics.resize(dimensions).then(function () {
          if (!standByMode) {
            _this9.stopDrawingMode();
            _this9.ui.resizeEditor();
            _this9.ui.changeMenu('resize');
          }
        });
      }
    }, this._commonAction());
  },


  /**
   * Flip Action
   * @returns {Object} actions for ui flip
   * @private
   */
  _flipAction: function _flipAction() {
    var _this10 = this;

    return (0, _tuiCodeSnippet.extend)({
      flip: function flip(flipType) {
        return _this10[flipType]();
      }
    }, this._commonAction());
  },


  /**
   * Filter Action
   * @returns {Object} actions for ui filter
   * @private
   */
  _filterAction: function _filterAction() {
    var _this11 = this;

    return (0, _tuiCodeSnippet.extend)({
      applyFilter: function applyFilter(applying, type, options, isSilent) {
        if (applying) {
          _this11.applyFilter(type, options, isSilent);
        } else if (_this11.hasFilter(type)) {
          _this11.removeFilter(type);
        }
      }
    }, this._commonAction());
  },


  /**
   * Image Editor Event Observer
   */
  setReAction: function setReAction() {
    var _this12 = this;

    this.on({
      undoStackChanged: function undoStackChanged(length) {
        if (length) {
          _this12.ui.changeHelpButtonEnabled('undo', true);
          _this12.ui.changeHelpButtonEnabled('reset', true);
        } else {
          _this12.ui.changeHelpButtonEnabled('undo', false);
          _this12.ui.changeHelpButtonEnabled('reset', false);
        }
        _this12.ui.resizeEditor();
      },
      redoStackChanged: function redoStackChanged(length) {
        if (length) {
          _this12.ui.changeHelpButtonEnabled('redo', true);
        } else {
          _this12.ui.changeHelpButtonEnabled('redo', false);
        }
        _this12.ui.resizeEditor();
      },
      /* eslint-disable complexity */
      objectActivated: function objectActivated(obj) {
        _this12.activeObjectId = obj.id;

        _this12.ui.changeHelpButtonEnabled('delete', true);
        _this12.ui.changeHelpButtonEnabled('deleteAll', true);

        if (obj.type === 'cropzone') {
          _this12.ui.crop.changeApplyButtonStatus(true);
        } else if (['rect', 'circle', 'triangle'].indexOf(obj.type) > -1) {
          _this12.stopDrawingMode();
          if (_this12.ui.submenu !== 'shape') {
            _this12.ui.changeMenu('shape', false, false);
          }
          _this12.ui.shape.setShapeStatus({
            strokeColor: obj.stroke,
            strokeWidth: obj.strokeWidth,
            fillColor: obj.fill
          });

          _this12.ui.shape.setMaxStrokeValue(Math.min(obj.width, obj.height));
        } else if (obj.type === 'path' || obj.type === 'line') {
          if (_this12.ui.submenu !== 'draw') {
            _this12.ui.changeMenu('draw', false, false);
            _this12.ui.draw.changeStandbyMode();
          }
        } else if (['i-text', 'text'].indexOf(obj.type) > -1) {
          if (_this12.ui.submenu !== 'text') {
            _this12.ui.changeMenu('text', false, false);
          }

          _this12.ui.text.setTextStyleStateOnAction(obj);
        } else if (obj.type === 'icon') {
          _this12.stopDrawingMode();
          if (_this12.ui.submenu !== 'icon') {
            _this12.ui.changeMenu('icon', false, false);
          }
          _this12.ui.icon.setIconPickerColor(obj.fill);
        }
      },
      /* eslint-enable complexity */
      addText: function addText(pos) {
        var _ui$text = _this12.ui.text,
            fill = _ui$text.textColor,
            fontSize = _ui$text.fontSize,
            fontStyle = _ui$text.fontStyle,
            fontWeight = _ui$text.fontWeight,
            underline = _ui$text.underline;

        var fontFamily = 'Noto Sans';

        _this12.addText('Double Click', {
          position: pos.originPosition,
          styles: { fill: fill, fontSize: fontSize, fontFamily: fontFamily, fontStyle: fontStyle, fontWeight: fontWeight, underline: underline }
        }).then(function () {
          _this12.changeCursor('default');
        });
      },
      addObjectAfter: function addObjectAfter(obj) {
        if (obj.type === 'icon') {
          _this12.ui.icon.changeStandbyMode();
        } else if (['rect', 'circle', 'triangle'].indexOf(obj.type) > -1) {
          _this12.ui.shape.setMaxStrokeValue(Math.min(obj.width, obj.height));
          _this12.ui.shape.changeStandbyMode();
        }
      },
      objectScaled: function objectScaled(obj) {
        if (['i-text', 'text'].indexOf(obj.type) > -1) {
          _this12.ui.text.fontSize = (0, _util.toInteger)(obj.fontSize);
        } else if (['rect', 'circle', 'triangle'].indexOf(obj.type) >= 0) {
          var width = obj.width,
              height = obj.height;

          var strokeValue = _this12.ui.shape.getStrokeValue();

          if (width < strokeValue) {
            _this12.ui.shape.setStrokeValue(width);
          }
          if (height < strokeValue) {
            _this12.ui.shape.setStrokeValue(height);
          }
        }
      },
      selectionCleared: function selectionCleared() {
        _this12.activeObjectId = null;
        if (_this12.ui.submenu === 'text') {
          _this12.changeCursor('text');
        } else if (!(0, _util.includes)(['draw', 'crop', 'resize'], _this12.ui.submenu)) {
          _this12.stopDrawingMode();
        }
      }
    });
  },


  /**
   * History Action
   * @returns {Object} history actions for ui
   * @private
   */
  _historyAction: function _historyAction() {
    var _this13 = this;

    return {
      undo: function undo(count) {
        return _this13.undo(count);
      },
      redo: function redo(count) {
        return _this13.redo(count);
      }
    };
  },


  /**
   * Common Action
   * @returns {Object} common actions for ui
   * @private
   */
  _commonAction: function _commonAction() {
    var _this14 = this;

    var TEXT = _consts.drawingModes.TEXT,
        CROPPER = _consts.drawingModes.CROPPER,
        SHAPE = _consts.drawingModes.SHAPE,
        ZOOM = _consts.drawingModes.ZOOM,
        RESIZE = _consts.drawingModes.RESIZE;


    return {
      modeChange: function modeChange(menu) {
        switch (menu) {
          case _consts.drawingMenuNames.TEXT:
            _this14._changeActivateMode(TEXT);
            break;
          case _consts.drawingMenuNames.CROP:
            _this14.startDrawingMode(CROPPER);
            break;
          case _consts.drawingMenuNames.SHAPE:
            _this14._changeActivateMode(SHAPE);
            _this14.setDrawingShape(_this14.ui.shape.type, _this14.ui.shape.options);
            break;
          case _consts.drawingMenuNames.ZOOM:
            _this14.startDrawingMode(ZOOM);
            break;
          case _consts.drawingMenuNames.RESIZE:
            _this14.startDrawingMode(RESIZE);
            break;
          default:
            break;
        }
      },
      deactivateAll: this.deactivateAll.bind(this),
      changeSelectableAll: this.changeSelectableAll.bind(this),
      discardSelection: this.discardSelection.bind(this),
      stopDrawingMode: this.stopDrawingMode.bind(this)
    };
  },


  /**
   * Mixin
   * @param {ImageEditor} ImageEditor instance
   */
  mixin: function mixin(ImageEditor) {
    (0, _tuiCodeSnippet.extend)(ImageEditor.prototype, this);
  }
};

/***/ }),

/***/ "./src/js/command/addIcon.js":
/*!***********************************!*\
  !*** ./src/js/command/addIcon.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ICON = _consts.componentNames.ICON; /**
                                         * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                         * @fileoverview Add an icon
                                         */

var command = {
  name: _consts.commandNames.ADD_ICON,

  /**
   * Add an icon
   * @param {Graphics} graphics - Graphics instance
   * @param {string} type - Icon type ('arrow', 'cancel', custom icon name)
   * @param {Object} options - Icon options
   *      @param {string} [options.fill] - Icon foreground color
   *      @param {string} [options.left] - Icon x position
   *      @param {string} [options.top] - Icon y position
   * @returns {Promise}
   */
  execute: function execute(graphics, type, options) {
    var _this = this;

    var iconComp = graphics.getComponent(ICON);

    return iconComp.add(type, options).then(function (objectProps) {
      _this.undoData.object = graphics.getObject(objectProps.id);

      return objectProps;
    });
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo: function undo(graphics) {
    graphics.remove(this.undoData.object);

    return _util.Promise.resolve();
  }
};

_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/addImageObject.js":
/*!******************************************!*\
  !*** ./src/js/command/addImageObject.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = {
  name: _consts.commandNames.ADD_IMAGE_OBJECT,

  /**
   * Add an image object
   * @param {Graphics} graphics - Graphics instance
   * @param {string} imgUrl - Image url to make object
   * @returns {Promise}
   */
  execute: function execute(graphics, imgUrl) {
    var _this = this;

    return graphics.addImageObject(imgUrl).then(function (objectProps) {
      _this.undoData.object = graphics.getObject(objectProps.id);

      return objectProps;
    });
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo: function undo(graphics) {
    graphics.remove(this.undoData.object);

    return _util.Promise.resolve();
  }
}; /**
    * @author NHN. FE Development Team <dl_javascript@nhn.com>
    * @fileoverview Add an image object
    */


_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/addObject.js":
/*!*************************************!*\
  !*** ./src/js/command/addObject.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = {
  name: _consts.commandNames.ADD_OBJECT,

  /**
   * Add an object
   * @param {Graphics} graphics - Graphics instance
   * @param {Object} object - Fabric object
   * @returns {Promise}
   */
  execute: function execute(graphics, object) {
    return new _util.Promise(function (resolve, reject) {
      if (!graphics.contains(object)) {
        graphics.add(object);
        resolve(object);
      } else {
        reject(_consts.rejectMessages.addedObject);
      }
    });
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @param {Object} object - Fabric object
   * @returns {Promise}
   */
  undo: function undo(graphics, object) {
    return new _util.Promise(function (resolve, reject) {
      if (graphics.contains(object)) {
        graphics.remove(object);
        resolve(object);
      } else {
        reject(_consts.rejectMessages.noObject);
      }
    });
  }
}; /**
    * @author NHN. FE Development Team <dl_javascript@nhn.com>
    * @fileoverview Add an object
    */


_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/addShape.js":
/*!************************************!*\
  !*** ./src/js/command/addShape.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SHAPE = _consts.componentNames.SHAPE; /**
                                           * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                           * @fileoverview Add a shape
                                           */

var command = {
  name: _consts.commandNames.ADD_SHAPE,

  /**
   * Add a shape
   * @param {Graphics} graphics - Graphics instance
   * @param {string} type - Shape type (ex: 'rect', 'circle', 'triangle')
   * @param {Object} options - Shape options
   *      @param {string} [options.fill] - Shape foreground color (ex: '#fff', 'transparent')
   *      @param {string} [options.stroke] - Shape outline color
   *      @param {number} [options.strokeWidth] - Shape outline width
   *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
   *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
   *      @param {number} [options.rx] - Radius x value (When type option is 'circle', this options can use)
   *      @param {number} [options.ry] - Radius y value (When type option is 'circle', this options can use)
   *      @param {number} [options.left] - Shape x position
   *      @param {number} [options.top] - Shape y position
   *      @param {number} [options.isRegular] - Whether resizing shape has 1:1 ratio or not
   * @returns {Promise}
   */
  execute: function execute(graphics, type, options) {
    var _this = this;

    var shapeComp = graphics.getComponent(SHAPE);

    return shapeComp.add(type, options).then(function (objectProps) {
      var id = objectProps.id;


      _this.undoData.object = graphics.getObject(id);

      return objectProps;
    });
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo: function undo(graphics) {
    graphics.remove(this.undoData.object);

    return _util.Promise.resolve();
  }
};

_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/addText.js":
/*!***********************************!*\
  !*** ./src/js/command/addText.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

var _selectionModifyHelper = __webpack_require__(/*! @/helper/selectionModifyHelper */ "./src/js/helper/selectionModifyHelper.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Add a text object
 */
var TEXT = _consts.componentNames.TEXT;


var command = {
  name: _consts.commandNames.ADD_TEXT,

  /**
   * Add a text object
   * @param {Graphics} graphics - Graphics instance
   * @param {string} text - Initial input text
   * @param {Object} [options] Options for text styles
   *     @param {Object} [options.styles] Initial styles
   *         @param {string} [options.styles.fill] Color
   *         @param {string} [options.styles.fontFamily] Font type for text
   *         @param {number} [options.styles.fontSize] Size
   *         @param {string} [options.styles.fontStyle] Type of inclination (normal / italic)
   *         @param {string} [options.styles.fontWeight] Type of thicker or thinner looking (normal / bold)
   *         @param {string} [options.styles.textAlign] Type of text align (left / center / right)
   *         @param {string} [options.styles.textDecoration] Type of line (underline / line-through / overline)
   *     @param {{x: number, y: number}} [options.position] - Initial position
   * @returns {Promise}
   */
  execute: function execute(graphics, text, options) {
    var _this = this;

    var textComp = graphics.getComponent(TEXT);

    if (this.undoData.object) {
      var undoObject = this.undoData.object;

      return new _util.Promise(function (resolve, reject) {
        if (!graphics.contains(undoObject)) {
          graphics.add(undoObject);
          resolve(undoObject);
        } else {
          reject(_consts.rejectMessages.redo);
        }
      });
    }

    return textComp.add(text, options).then(function (objectProps) {
      var id = objectProps.id;

      var textObject = graphics.getObject(id);

      _this.undoData.object = textObject;

      (0, _selectionModifyHelper.setCachedUndoDataForDimension)((0, _selectionModifyHelper.makeSelectionUndoData)(textObject, function () {
        return (0, _selectionModifyHelper.makeSelectionUndoDatum)(id, textObject, false);
      }));

      return objectProps;
    });
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo: function undo(graphics) {
    graphics.remove(this.undoData.object);

    return _util.Promise.resolve();
  }
};

_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/applyFilter.js":
/*!***************************************!*\
  !*** ./src/js/command/applyFilter.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FILTER = _consts.componentNames.FILTER;

/**
 * Cached data for undo
 * @type {Object}
 */
/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Apply a filter into an image
 */

var cachedUndoDataForSilent = null;

/**
 * Make undoData
 * @param {string} type - Filter type
 * @param {Object} prevfilterOption - prev Filter options
 * @param {Object} options - Filter options
 * @returns {object} - undo data
 */
function makeUndoData(type, prevfilterOption, options) {
  var undoData = {};

  if (type === 'mask') {
    undoData.object = options.mask;
  }

  undoData.options = prevfilterOption;

  return undoData;
}

var command = {
  name: _consts.commandNames.APPLY_FILTER,

  /**
   * Apply a filter into an image
   * @param {Graphics} graphics - Graphics instance
   * @param {string} type - Filter type
   * @param {Object} options - Filter options
   *  @param {number} options.maskObjId - masking image object id
   * @param {boolean} isSilent - is silent execution or not
   * @returns {Promise}
   */
  execute: function execute(graphics, type, options, isSilent) {
    var filterComp = graphics.getComponent(FILTER);

    if (type === 'mask') {
      var maskObj = graphics.getObject(options.maskObjId);

      if (!(maskObj && maskObj.isType('image'))) {
        return Promise.reject(_consts.rejectMessages.invalidParameters);
      }

      _tuiCodeSnippet2.default.extend(options, { mask: maskObj });
      graphics.remove(options.mask);
    }
    if (!this.isRedo) {
      var prevfilterOption = filterComp.getOptions(type);
      var undoData = makeUndoData(type, prevfilterOption, options);

      cachedUndoDataForSilent = this.setUndoData(undoData, cachedUndoDataForSilent, isSilent);
    }

    return filterComp.add(type, options);
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @param {string} type - Filter type
   * @returns {Promise}
   */
  undo: function undo(graphics, type) {
    var filterComp = graphics.getComponent(FILTER);

    if (type === 'mask') {
      var mask = this.undoData.object;
      graphics.add(mask);
      graphics.setActiveObject(mask);

      return filterComp.remove(type);
    }

    // options changed case
    if (this.undoData.options) {
      return filterComp.add(type, this.undoData.options);
    }

    // filter added case
    return filterComp.remove(type);
  }
};

_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/changeIconColor.js":
/*!*******************************************!*\
  !*** ./src/js/command/changeIconColor.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ICON = _consts.componentNames.ICON; /**
                                         * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                         * @fileoverview Change icon color
                                         */

var command = {
  name: _consts.commandNames.CHANGE_ICON_COLOR,

  /**
   * Change icon color
   * @param {Graphics} graphics - Graphics instance
   * @param {number} id - object id
   * @param {string} color - Color for icon
   * @returns {Promise}
   */
  execute: function execute(graphics, id, color) {
    var _this = this;

    return new _util.Promise(function (resolve, reject) {
      var iconComp = graphics.getComponent(ICON);
      var targetObj = graphics.getObject(id);

      if (!targetObj) {
        reject(_consts.rejectMessages.noObject);
      }

      _this.undoData.object = targetObj;
      _this.undoData.color = iconComp.getColor(targetObj);
      iconComp.setColor(color, targetObj);
      resolve();
    });
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo: function undo(graphics) {
    var iconComp = graphics.getComponent(ICON);
    var _undoData = this.undoData,
        icon = _undoData.object,
        color = _undoData.color;


    iconComp.setColor(color, icon);

    return _util.Promise.resolve();
  }
};

_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/changeSelection.js":
/*!*******************************************!*\
  !*** ./src/js/command/changeSelection.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

var _selectionModifyHelper = __webpack_require__(/*! @/helper/selectionModifyHelper */ "./src/js/helper/selectionModifyHelper.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview change selection
 */
var command = {
  name: _consts.commandNames.CHANGE_SELECTION,

  execute: function execute(graphics, props) {
    if (this.isRedo) {
      props.forEach(function (prop) {
        graphics.setObjectProperties(prop.id, prop);
      });
    } else {
      this.undoData = (0, _selectionModifyHelper.getCachedUndoDataForDimension)();
    }

    return _util.Promise.resolve();
  },
  undo: function undo(graphics) {
    this.undoData.forEach(function (datum) {
      graphics.setObjectProperties(datum.id, datum);
    });

    return _util.Promise.resolve();
  }
};

_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/changeShape.js":
/*!***************************************!*\
  !*** ./src/js/command/changeShape.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview change a shape
 */
var SHAPE = _consts.componentNames.SHAPE;

/**
 * Cached data for undo
 * @type {Object}
 */

var cachedUndoDataForSilent = null;

/**
 * Make undoData
 * @param {object} options - shape options
 * @param {Component} targetObj - shape component
 * @returns {object} - undo data
 */
function makeUndoData(options, targetObj) {
  var undoData = {
    object: targetObj,
    options: {}
  };

  _tuiCodeSnippet2.default.forEachOwnProperties(options, function (value, key) {
    undoData.options[key] = targetObj[key];
  });

  return undoData;
}

var command = {
  name: _consts.commandNames.CHANGE_SHAPE,

  /**
   * Change a shape
   * @param {Graphics} graphics - Graphics instance
   * @param {number} id - object id
   * @param {Object} options - Shape options
   *      @param {string} [options.fill] - Shape foreground color (ex: '#fff', 'transparent')
   *      @param {string} [options.stroke] - Shape outline color
   *      @param {number} [options.strokeWidth] - Shape outline width
   *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
   *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
   *      @param {number} [options.rx] - Radius x value (When type option is 'circle', this options can use)
   *      @param {number} [options.ry] - Radius y value (When type option is 'circle', this options can use)
   *      @param {number} [options.left] - Shape x position
   *      @param {number} [options.top] - Shape y position
   *      @param {number} [options.isRegular] - Whether resizing shape has 1:1 ratio or not
   * @param {boolean} isSilent - is silent execution or not
   * @returns {Promise}
   */
  execute: function execute(graphics, id, options, isSilent) {
    var shapeComp = graphics.getComponent(SHAPE);
    var targetObj = graphics.getObject(id);

    if (!targetObj) {
      return _util.Promise.reject(_consts.rejectMessages.noObject);
    }

    if (!this.isRedo) {
      var undoData = makeUndoData(options, targetObj);

      cachedUndoDataForSilent = this.setUndoData(undoData, cachedUndoDataForSilent, isSilent);
    }

    return shapeComp.change(targetObj, options);
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo: function undo(graphics) {
    var shapeComp = graphics.getComponent(SHAPE);
    var _undoData = this.undoData,
        shape = _undoData.object,
        options = _undoData.options;


    return shapeComp.change(shape, options);
  }
};

_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/changeText.js":
/*!**************************************!*\
  !*** ./src/js/command/changeText.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TEXT = _consts.componentNames.TEXT; /**
                                         * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                         * @fileoverview Change a text
                                         */

var command = {
  name: _consts.commandNames.CHANGE_TEXT,

  /**
   * Change a text
   * @param {Graphics} graphics - Graphics instance
   * @param {number} id - object id
   * @param {string} text - Changing text
   * @returns {Promise}
   */
  execute: function execute(graphics, id, text) {
    var textComp = graphics.getComponent(TEXT);
    var targetObj = graphics.getObject(id);

    if (!targetObj) {
      return _util.Promise.reject(_consts.rejectMessages.noObject);
    }

    this.undoData.object = targetObj;
    this.undoData.text = textComp.getText(targetObj);

    return textComp.change(targetObj, text);
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo: function undo(graphics) {
    var textComp = graphics.getComponent(TEXT);
    var _undoData = this.undoData,
        textObj = _undoData.object,
        text = _undoData.text;


    return textComp.change(textObj, text);
  }
};

_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/changeTextStyle.js":
/*!*******************************************!*\
  !*** ./src/js/command/changeTextStyle.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Change text styles
 */
var TEXT = _consts.componentNames.TEXT;

/**
 * Cached data for undo
 * @type {Object}
 */

var cachedUndoDataForSilent = null;

/**
 * Make undoData
 * @param {object} styles - text styles
 * @param {Component} targetObj - text component
 * @returns {object} - undo data
 */
function makeUndoData(styles, targetObj) {
  var undoData = {
    object: targetObj,
    styles: {}
  };
  _tuiCodeSnippet2.default.forEachOwnProperties(styles, function (value, key) {
    var undoValue = targetObj[key];
    undoData.styles[key] = undoValue;
  });

  return undoData;
}

var command = {
  name: _consts.commandNames.CHANGE_TEXT_STYLE,

  /**
   * Change text styles
   * @param {Graphics} graphics - Graphics instance
   * @param {number} id - object id
   * @param {Object} styles - text styles
   *     @param {string} [styles.fill] Color
   *     @param {string} [styles.fontFamily] Font type for text
   *     @param {number} [styles.fontSize] Size
   *     @param {string} [styles.fontStyle] Type of inclination (normal / italic)
   *     @param {string} [styles.fontWeight] Type of thicker or thinner looking (normal / bold)
   *     @param {string} [styles.textAlign] Type of text align (left / center / right)
   *     @param {string} [styles.textDecoration] Type of line (underline / line-through / overline)
   * @param {boolean} isSilent - is silent execution or not
   * @returns {Promise}
   */
  execute: function execute(graphics, id, styles, isSilent) {
    var textComp = graphics.getComponent(TEXT);
    var targetObj = graphics.getObject(id);

    if (!targetObj) {
      return _util.Promise.reject(_consts.rejectMessages.noObject);
    }
    if (!this.isRedo) {
      var undoData = makeUndoData(styles, targetObj);

      cachedUndoDataForSilent = this.setUndoData(undoData, cachedUndoDataForSilent, isSilent);
    }

    return textComp.setStyle(targetObj, styles);
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo: function undo(graphics) {
    var textComp = graphics.getComponent(TEXT);
    var _undoData = this.undoData,
        textObj = _undoData.object,
        styles = _undoData.styles;


    return textComp.setStyle(textObj, styles);
  }
};

_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/clearObjects.js":
/*!****************************************!*\
  !*** ./src/js/command/clearObjects.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = {
  name: _consts.commandNames.CLEAR_OBJECTS,

  /**
   * Clear all objects without background (main) image
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  execute: function execute(graphics) {
    var _this = this;

    return new _util.Promise(function (resolve) {
      _this.undoData.objects = graphics.removeAll();
      resolve();
    });
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   * @ignore
   */
  undo: function undo(graphics) {
    graphics.add(this.undoData.objects);

    return _util.Promise.resolve();
  }
}; /**
    * @author NHN. FE Development Team <dl_javascript@nhn.com>
    * @fileoverview Clear all objects
    */


_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/flip.js":
/*!********************************!*\
  !*** ./src/js/command/flip.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Flip an image
 */
var FLIP = _consts.componentNames.FLIP;


var command = {
  name: _consts.commandNames.FLIP_IMAGE,

  /**
   * flip an image
   * @param {Graphics} graphics - Graphics instance
   * @param {string} type - 'flipX' or 'flipY' or 'reset'
   * @returns {Promise}
   */
  execute: function execute(graphics, type) {
    var flipComp = graphics.getComponent(FLIP);

    this.undoData.setting = flipComp.getCurrentSetting();

    return flipComp[type]();
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo: function undo(graphics) {
    var flipComp = graphics.getComponent(FLIP);

    return flipComp.set(this.undoData.setting);
  }
};

_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/loadImage.js":
/*!*************************************!*\
  !*** ./src/js/command/loadImage.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Load a background (main) image
 */
var IMAGE_LOADER = _consts.componentNames.IMAGE_LOADER;


var command = {
  name: _consts.commandNames.LOAD_IMAGE,

  /**
   * Load a background (main) image
   * @param {Graphics} graphics - Graphics instance
   * @param {string} imageName - Image name
   * @param {string} imgUrl - Image Url
   * @returns {Promise}
   */
  execute: function execute(graphics, imageName, imgUrl) {
    var loader = graphics.getComponent(IMAGE_LOADER);
    var prevImage = loader.getCanvasImage();
    var prevImageWidth = prevImage ? prevImage.width : 0;
    var prevImageHeight = prevImage ? prevImage.height : 0;
    var objects = graphics.removeAll(true).filter(function (objectItem) {
      return objectItem.type !== 'cropzone';
    });

    objects.forEach(function (objectItem) {
      objectItem.evented = true;
    });

    this.undoData = {
      name: loader.getImageName(),
      image: prevImage,
      objects: objects
    };

    return loader.load(imageName, imgUrl).then(function (newImage) {
      return {
        oldWidth: prevImageWidth,
        oldHeight: prevImageHeight,
        newWidth: newImage.width,
        newHeight: newImage.height
      };
    });
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo: function undo(graphics) {
    var loader = graphics.getComponent(IMAGE_LOADER);
    var _undoData = this.undoData,
        objects = _undoData.objects,
        name = _undoData.name,
        image = _undoData.image;


    graphics.removeAll(true);
    graphics.add(objects);

    return loader.load(name, image);
  }
};

_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/removeFilter.js":
/*!****************************************!*\
  !*** ./src/js/command/removeFilter.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Remove a filter from an image
 */
var FILTER = _consts.componentNames.FILTER;


var command = {
  name: _consts.commandNames.REMOVE_FILTER,

  /**
   * Remove a filter from an image
   * @param {Graphics} graphics - Graphics instance
   * @param {string} type - Filter type
   * @returns {Promise}
   */
  execute: function execute(graphics, type) {
    var filterComp = graphics.getComponent(FILTER);

    this.undoData.options = filterComp.getOptions(type);

    return filterComp.remove(type);
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @param {string} type - Filter type
   * @returns {Promise}
   */
  undo: function undo(graphics, type) {
    var filterComp = graphics.getComponent(FILTER);
    var options = this.undoData.options;


    return filterComp.add(type, options);
  }
};

_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/removeObject.js":
/*!****************************************!*\
  !*** ./src/js/command/removeObject.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = {
  name: _consts.commandNames.REMOVE_OBJECT,

  /**
   * Remove an object
   * @param {Graphics} graphics - Graphics instance
   * @param {number} id - object id
   * @returns {Promise}
   */
  execute: function execute(graphics, id) {
    var _this = this;

    return new _util.Promise(function (resolve, reject) {
      _this.undoData.objects = graphics.removeObjectById(id);
      if (_this.undoData.objects.length) {
        resolve();
      } else {
        reject(_consts.rejectMessages.noObject);
      }
    });
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo: function undo(graphics) {
    graphics.add(this.undoData.objects);

    return _util.Promise.resolve();
  }
}; /**
    * @author NHN. FE Development Team <dl_javascript@nhn.com>
    * @fileoverview Remove an object
    */


_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/resize.js":
/*!**********************************!*\
  !*** ./src/js/command/resize.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Resize an image
 */
var RESIZE = _consts.componentNames.RESIZE;


var command = {
  name: _consts.commandNames.RESIZE_IMAGE,

  /**
   * Resize an image
   * @param {Graphics} graphics - Graphics instance
   * @param {object} dimensions - Image Dimensions
   * @returns {Promise}
   */
  execute: function execute(graphics, dimensions) {
    var resizeComp = graphics.getComponent(RESIZE);

    var originalDimensions = resizeComp.getOriginalDimensions();
    if (!originalDimensions) {
      originalDimensions = resizeComp.getCurrentDimensions();
    }

    this.undoData.dimensions = originalDimensions;

    return resizeComp.resize(dimensions);
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo: function undo(graphics) {
    var resizeComp = graphics.getComponent(RESIZE);

    return resizeComp.resize(this.undoData.dimensions);
  }
};

_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/resizeCanvasDimension.js":
/*!*************************************************!*\
  !*** ./src/js/command/resizeCanvasDimension.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = {
  name: _consts.commandNames.RESIZE_CANVAS_DIMENSION,

  /**
   * resize the canvas with given dimension
   * @param {Graphics} graphics - Graphics instance
   * @param {{width: number, height: number}} dimension - Max width & height
   * @returns {Promise}
   */
  execute: function execute(graphics, dimension) {
    var _this = this;

    return new _util.Promise(function (resolve) {
      _this.undoData.size = {
        width: graphics.cssMaxWidth,
        height: graphics.cssMaxHeight
      };

      graphics.setCssMaxDimension(dimension);
      graphics.adjustCanvasDimension();
      resolve();
    });
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo: function undo(graphics) {
    graphics.setCssMaxDimension(this.undoData.size);
    graphics.adjustCanvasDimension();

    return _util.Promise.resolve();
  }
}; /**
    * @author NHN. FE Development Team <dl_javascript@nhn.com>
    * @fileoverview Resize a canvas
    */


_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/rotate.js":
/*!**********************************!*\
  !*** ./src/js/command/rotate.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Rotate an image
 */
var ROTATION = _consts.componentNames.ROTATION;

/**
 * Cached data for undo
 * @type {Object}
 */

var cachedUndoDataForSilent = null;

/**
 * Make undo data
 * @param {Component} rotationComp - rotation component
 * @returns {object} - undodata
 */
function makeUndoData(rotationComp) {
  return {
    angle: rotationComp.getCurrentAngle()
  };
}

var command = {
  name: _consts.commandNames.ROTATE_IMAGE,

  /**
   * Rotate an image
   * @param {Graphics} graphics - Graphics instance
   * @param {string} type - 'rotate' or 'setAngle'
   * @param {number} angle - angle value (degree)
   * @param {boolean} isSilent - is silent execution or not
   * @returns {Promise}
   */
  execute: function execute(graphics, type, angle, isSilent) {
    var rotationComp = graphics.getComponent(ROTATION);

    if (!this.isRedo) {
      var undoData = makeUndoData(rotationComp);

      cachedUndoDataForSilent = this.setUndoData(undoData, cachedUndoDataForSilent, isSilent);
    }

    return rotationComp[type](angle);
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo: function undo(graphics) {
    var rotationComp = graphics.getComponent(ROTATION);
    var _args = this.args,
        type = _args[1],
        angle = _args[2];


    if (type === 'setAngle') {
      return rotationComp[type](this.undoData.angle);
    }

    return rotationComp.rotate(-angle);
  }
};

_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/setObjectPosition.js":
/*!*********************************************!*\
  !*** ./src/js/command/setObjectPosition.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var command = {
  name: _consts.commandNames.SET_OBJECT_POSITION,

  /**
   * Set object properties
   * @param {Graphics} graphics - Graphics instance
   * @param {number} id - object id
   * @param {Object} posInfo - position object
   *  @param {number} posInfo.x - x position
   *  @param {number} posInfo.y - y position
   *  @param {string} posInfo.originX - can be 'left', 'center', 'right'
   *  @param {string} posInfo.originY - can be 'top', 'center', 'bottom'
   * @returns {Promise}
   */
  execute: function execute(graphics, id, posInfo) {
    var targetObj = graphics.getObject(id);

    if (!targetObj) {
      return _util.Promise.reject(_consts.rejectMessages.noObject);
    }

    this.undoData.objectId = id;
    this.undoData.props = graphics.getObjectProperties(id, ['left', 'top']);

    graphics.setObjectPosition(id, posInfo);
    graphics.renderAll();

    return _util.Promise.resolve();
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @returns {Promise}
   */
  undo: function undo(graphics) {
    var _undoData = this.undoData,
        objectId = _undoData.objectId,
        props = _undoData.props;


    graphics.setObjectProperties(objectId, props);
    graphics.renderAll();

    return _util.Promise.resolve();
  }
}; /**
    * @author NHN. FE Development Team <dl_javascript@nhn.com>
    * @fileoverview Set object properties
    */


_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/command/setObjectProperties.js":
/*!***********************************************!*\
  !*** ./src/js/command/setObjectProperties.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Set object properties
 */
var command = {
  name: _consts.commandNames.SET_OBJECT_PROPERTIES,

  /**
   * Set object properties
   * @param {Graphics} graphics - Graphics instance
   * @param {number} id - object id
   * @param {Object} props - properties
   *     @param {string} [props.fill] Color
   *     @param {string} [props.fontFamily] Font type for text
   *     @param {number} [props.fontSize] Size
   *     @param {string} [props.fontStyle] Type of inclination (normal / italic)
   *     @param {string} [props.fontWeight] Type of thicker or thinner looking (normal / bold)
   *     @param {string} [props.textAlign] Type of text align (left / center / right)
   *     @param {string} [props.textDecoration] Type of line (underline / line-through / overline)
   * @returns {Promise}
   */
  execute: function execute(graphics, id, props) {
    var _this = this;

    var targetObj = graphics.getObject(id);

    if (!targetObj) {
      return _util.Promise.reject(_consts.rejectMessages.noObject);
    }

    this.undoData.props = {};
    _tuiCodeSnippet2.default.forEachOwnProperties(props, function (value, key) {
      _this.undoData.props[key] = targetObj[key];
    });

    graphics.setObjectProperties(id, props);

    return _util.Promise.resolve();
  },


  /**
   * @param {Graphics} graphics - Graphics instance
   * @param {number} id - object id
   * @returns {Promise}
   */
  undo: function undo(graphics, id) {
    var props = this.undoData.props;


    graphics.setObjectProperties(id, props);

    return _util.Promise.resolve();
  }
};

_command2.default.register(command);

exports.default = command;

/***/ }),

/***/ "./src/js/component/cropper.js":
/*!*************************************!*\
  !*** ./src/js/component/cropper.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

var _component = __webpack_require__(/*! @/interface/component */ "./src/js/interface/component.js");

var _component2 = _interopRequireDefault(_component);

var _cropzone = __webpack_require__(/*! @/extension/cropzone */ "./src/js/extension/cropzone.js");

var _cropzone2 = _interopRequireDefault(_cropzone);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview Image crop module (start cropping, end cropping)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var MOUSE_MOVE_THRESHOLD = 10;
var DEFAULT_OPTION = {
  presetRatio: null,
  top: -10,
  left: -10,
  height: 1,
  width: 1
};

/**
 * Cropper components
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @class Cropper
 * @ignore
 */

var Cropper = function (_Component) {
  _inherits(Cropper, _Component);

  function Cropper(graphics) {
    _classCallCheck(this, Cropper);

    /**
     * Cropzone
     * @type {Cropzone}
     * @private
     */
    var _this = _possibleConstructorReturn(this, (Cropper.__proto__ || Object.getPrototypeOf(Cropper)).call(this, _consts.componentNames.CROPPER, graphics));

    _this._cropzone = null;

    /**
     * StartX of Cropzone
     * @type {number}
     * @private
     */
    _this._startX = null;

    /**
     * StartY of Cropzone
     * @type {number}
     * @private
     */
    _this._startY = null;

    /**
     * State whether shortcut key is pressed or not
     * @type {boolean}
     * @private
     */
    _this._withShiftKey = false;

    /**
     * Listeners
     * @type {object.<string, function>}
     * @private
     */
    _this._listeners = {
      keydown: _this._onKeyDown.bind(_this),
      keyup: _this._onKeyUp.bind(_this),
      mousedown: _this._onFabricMouseDown.bind(_this),
      mousemove: _this._onFabricMouseMove.bind(_this),
      mouseup: _this._onFabricMouseUp.bind(_this)
    };
    return _this;
  }

  /**
   * Start cropping
   */


  _createClass(Cropper, [{
    key: 'start',
    value: function start() {
      if (this._cropzone) {
        return;
      }
      var canvas = this.getCanvas();

      canvas.forEachObject(function (obj) {
        // {@link http://fabricjs.com/docs/fabric.Object.html#evented}
        obj.evented = false;
      });

      this._cropzone = new _cropzone2.default(canvas, _tuiCodeSnippet2.default.extend({
        left: 0,
        top: 0,
        width: 0.5,
        height: 0.5,
        strokeWidth: 0, // {@link https://github.com/kangax/fabric.js/issues/2860}
        cornerSize: 10,
        cornerColor: 'black',
        fill: 'transparent'
      }, _consts.CROPZONE_DEFAULT_OPTIONS, this.graphics.cropSelectionStyle));

      canvas.discardActiveObject();
      canvas.add(this._cropzone);
      canvas.on('mouse:down', this._listeners.mousedown);
      canvas.selection = false;
      canvas.defaultCursor = 'crosshair';

      _fabric2.default.util.addListener(document, 'keydown', this._listeners.keydown);
      _fabric2.default.util.addListener(document, 'keyup', this._listeners.keyup);
    }

    /**
     * End cropping
     */

  }, {
    key: 'end',
    value: function end() {
      var canvas = this.getCanvas();
      var cropzone = this._cropzone;

      if (!cropzone) {
        return;
      }
      canvas.remove(cropzone);
      canvas.selection = true;
      canvas.defaultCursor = 'default';
      canvas.off('mouse:down', this._listeners.mousedown);
      canvas.forEachObject(function (obj) {
        obj.evented = true;
      });

      this._cropzone = null;

      _fabric2.default.util.removeListener(document, 'keydown', this._listeners.keydown);
      _fabric2.default.util.removeListener(document, 'keyup', this._listeners.keyup);
    }

    /**
     * Change cropzone visible
     * @param {boolean} visible - cropzone visible state
     */

  }, {
    key: 'changeVisibility',
    value: function changeVisibility(visible) {
      if (this._cropzone) {
        this._cropzone.set({ visible: visible });
      }
    }

    /**
     * onMousedown handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onFabricMouseDown',
    value: function _onFabricMouseDown(fEvent) {
      var canvas = this.getCanvas();

      if (fEvent.target) {
        return;
      }

      canvas.selection = false;
      var coord = canvas.getPointer(fEvent.e);

      this._startX = coord.x;
      this._startY = coord.y;

      canvas.on({
        'mouse:move': this._listeners.mousemove,
        'mouse:up': this._listeners.mouseup
      });
    }

    /**
     * onMousemove handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onFabricMouseMove',
    value: function _onFabricMouseMove(fEvent) {
      var canvas = this.getCanvas();
      var pointer = canvas.getPointer(fEvent.e);
      var x = pointer.x,
          y = pointer.y;

      var cropzone = this._cropzone;

      if (Math.abs(x - this._startX) + Math.abs(y - this._startY) > MOUSE_MOVE_THRESHOLD) {
        canvas.remove(cropzone);
        cropzone.set(this._calcRectDimensionFromPoint(x, y));

        canvas.add(cropzone);
        canvas.setActiveObject(cropzone);
      }
    }

    /**
     * Get rect dimension setting from Canvas-Mouse-Position(x, y)
     * @param {number} x - Canvas-Mouse-Position x
     * @param {number} y - Canvas-Mouse-Position Y
     * @returns {{left: number, top: number, width: number, height: number}}
     * @private
     */

  }, {
    key: '_calcRectDimensionFromPoint',
    value: function _calcRectDimensionFromPoint(x, y) {
      var canvas = this.getCanvas();
      var canvasWidth = canvas.getWidth();
      var canvasHeight = canvas.getHeight();
      var startX = this._startX;
      var startY = this._startY;
      var left = (0, _util.clamp)(x, 0, startX);
      var top = (0, _util.clamp)(y, 0, startY);
      var width = (0, _util.clamp)(x, startX, canvasWidth) - left; // (startX <= x(mouse) <= canvasWidth) - left
      var height = (0, _util.clamp)(y, startY, canvasHeight) - top; // (startY <= y(mouse) <= canvasHeight) - top

      if (this._withShiftKey) {
        // make fixed ratio cropzone
        if (width > height) {
          height = width;
        } else if (height > width) {
          width = height;
        }

        if (startX >= x) {
          left = startX - width;
        }

        if (startY >= y) {
          top = startY - height;
        }
      }

      return {
        left: left,
        top: top,
        width: width,
        height: height
      };
    }

    /**
     * onMouseup handler in fabric canvas
     * @private
     */

  }, {
    key: '_onFabricMouseUp',
    value: function _onFabricMouseUp() {
      var cropzone = this._cropzone;
      var listeners = this._listeners;
      var canvas = this.getCanvas();

      canvas.setActiveObject(cropzone);
      canvas.off({
        'mouse:move': listeners.mousemove,
        'mouse:up': listeners.mouseup
      });
    }

    /**
     * Get cropped image data
     * @param {Object} cropRect cropzone rect
     *  @param {Number} cropRect.left left position
     *  @param {Number} cropRect.top top position
     *  @param {Number} cropRect.width width
     *  @param {Number} cropRect.height height
     * @returns {?{imageName: string, url: string}} cropped Image data
     */

  }, {
    key: 'getCroppedImageData',
    value: function getCroppedImageData(cropRect) {
      var canvas = this.getCanvas();
      var containsCropzone = canvas.contains(this._cropzone);
      if (!cropRect) {
        return null;
      }

      if (containsCropzone) {
        canvas.remove(this._cropzone);
      }

      var imageData = {
        imageName: this.getImageName(),
        url: canvas.toDataURL(cropRect)
      };

      if (containsCropzone) {
        canvas.add(this._cropzone);
      }

      return imageData;
    }

    /**
     * Get cropped rect
     * @returns {Object} rect
     */

  }, {
    key: 'getCropzoneRect',
    value: function getCropzoneRect() {
      var cropzone = this._cropzone;

      if (!cropzone.isValid()) {
        return null;
      }

      return {
        left: cropzone.left,
        top: cropzone.top,
        width: cropzone.width,
        height: cropzone.height
      };
    }

    /**
     * Set a cropzone square
     * @param {number} [presetRatio] - preset ratio
     */

  }, {
    key: 'setCropzoneRect',
    value: function setCropzoneRect(presetRatio) {
      var canvas = this.getCanvas();
      var cropzone = this._cropzone;

      canvas.discardActiveObject();
      canvas.selection = false;
      canvas.remove(cropzone);

      cropzone.set(presetRatio ? this._getPresetPropertiesForCropSize(presetRatio) : DEFAULT_OPTION);

      canvas.add(cropzone);
      canvas.selection = true;

      if (presetRatio) {
        canvas.setActiveObject(cropzone);
      }
    }

    /**
     * get a cropzone square info
     * @param {number} presetRatio - preset ratio
     * @returns {{presetRatio: number, left: number, top: number, width: number, height: number}}
     * @private
     */

  }, {
    key: '_getPresetPropertiesForCropSize',
    value: function _getPresetPropertiesForCropSize(presetRatio) {
      var canvas = this.getCanvas();
      var originalWidth = canvas.getWidth();
      var originalHeight = canvas.getHeight();

      var standardSize = originalWidth >= originalHeight ? originalWidth : originalHeight;
      var getScale = function getScale(value, orignalValue) {
        return value > orignalValue ? orignalValue / value : 1;
      };

      var width = standardSize * presetRatio;
      var height = standardSize;

      var scaleWidth = getScale(width, originalWidth);

      var _snippet$map = _tuiCodeSnippet2.default.map([width, height], function (sizeValue) {
        return sizeValue * scaleWidth;
      });

      width = _snippet$map[0];
      height = _snippet$map[1];


      var scaleHeight = getScale(height, originalHeight);

      var _snippet$map2 = _tuiCodeSnippet2.default.map([width, height], function (sizeValue) {
        return (0, _util.fixFloatingPoint)(sizeValue * scaleHeight);
      });

      width = _snippet$map2[0];
      height = _snippet$map2[1];


      return {
        presetRatio: presetRatio,
        top: (originalHeight - height) / 2,
        left: (originalWidth - width) / 2,
        width: width,
        height: height
      };
    }

    /**
     * Keydown event handler
     * @param {KeyboardEvent} e - Event object
     * @private
     */

  }, {
    key: '_onKeyDown',
    value: function _onKeyDown(e) {
      if (e.keyCode === _consts.keyCodes.SHIFT) {
        this._withShiftKey = true;
      }
    }

    /**
     * Keyup event handler
     * @param {KeyboardEvent} e - Event object
     * @private
     */

  }, {
    key: '_onKeyUp',
    value: function _onKeyUp(e) {
      if (e.keyCode === _consts.keyCodes.SHIFT) {
        this._withShiftKey = false;
      }
    }
  }]);

  return Cropper;
}(_component2.default);

exports.default = Cropper;

/***/ }),

/***/ "./src/js/component/filter.js":
/*!************************************!*\
  !*** ./src/js/component/filter.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

var _component = __webpack_require__(/*! @/interface/component */ "./src/js/interface/component.js");

var _component2 = _interopRequireDefault(_component);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

var _mask = __webpack_require__(/*! @/extension/mask */ "./src/js/extension/mask.js");

var _mask2 = _interopRequireDefault(_mask);

var _sharpen = __webpack_require__(/*! @/extension/sharpen */ "./src/js/extension/sharpen.js");

var _sharpen2 = _interopRequireDefault(_sharpen);

var _emboss = __webpack_require__(/*! @/extension/emboss */ "./src/js/extension/emboss.js");

var _emboss2 = _interopRequireDefault(_emboss);

var _colorFilter = __webpack_require__(/*! @/extension/colorFilter */ "./src/js/extension/colorFilter.js");

var _colorFilter2 = _interopRequireDefault(_colorFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview Add filter module
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var filters = _fabric2.default.Image.filters;


filters.Mask = _mask2.default;
filters.Sharpen = _sharpen2.default;
filters.Emboss = _emboss2.default;
filters.ColorFilter = _colorFilter2.default;

/**
 * Filter
 * @class Filter
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */

var Filter = function (_Component) {
  _inherits(Filter, _Component);

  function Filter(graphics) {
    _classCallCheck(this, Filter);

    return _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, _consts.componentNames.FILTER, graphics));
  }

  /**
   * Add filter to source image (a specific filter is added on fabric.js)
   * @param {string} type - Filter type
   * @param {Object} [options] - Options of filter
   * @returns {Promise}
   */


  _createClass(Filter, [{
    key: 'add',
    value: function add(type, options) {
      var _this2 = this;

      return new _util.Promise(function (resolve, reject) {
        var sourceImg = _this2._getSourceImage();
        var canvas = _this2.getCanvas();
        var imgFilter = _this2._getFilter(sourceImg, type);
        if (!imgFilter) {
          imgFilter = _this2._createFilter(sourceImg, type, options);
        }

        if (!imgFilter) {
          reject(_consts.rejectMessages.invalidParameters);
        }

        _this2._changeFilterValues(imgFilter, options);

        _this2._apply(sourceImg, function () {
          canvas.renderAll();
          resolve({
            type: type,
            action: 'add',
            options: options
          });
        });
      });
    }

    /**
     * Remove filter to source image
     * @param {string} type - Filter type
     * @returns {Promise}
     */

  }, {
    key: 'remove',
    value: function remove(type) {
      var _this3 = this;

      return new _util.Promise(function (resolve, reject) {
        var sourceImg = _this3._getSourceImage();
        var canvas = _this3.getCanvas();
        var options = _this3.getOptions(type);

        if (!sourceImg.filters.length) {
          reject(_consts.rejectMessages.unsupportedOperation);
        }

        _this3._removeFilter(sourceImg, type);

        _this3._apply(sourceImg, function () {
          canvas.renderAll();
          resolve({
            type: type,
            action: 'remove',
            options: options
          });
        });
      });
    }

    /**
     * Whether this has the filter or not
     * @param {string} type - Filter type
     * @returns {boolean} true if it has the filter
     */

  }, {
    key: 'hasFilter',
    value: function hasFilter(type) {
      return !!this._getFilter(this._getSourceImage(), type);
    }

    /**
     * Get a filter options
     * @param {string} type - Filter type
     * @returns {Object} filter options or null if there is no that filter
     */

  }, {
    key: 'getOptions',
    value: function getOptions(type) {
      var sourceImg = this._getSourceImage();
      var imgFilter = this._getFilter(sourceImg, type);
      if (!imgFilter) {
        return null;
      }

      return (0, _tuiCodeSnippet.extend)({}, imgFilter.options);
    }

    /**
     * Change filter values
     * @param {Object} imgFilter object of filter
     * @param {Object} options object
     * @private
     */

  }, {
    key: '_changeFilterValues',
    value: function _changeFilterValues(imgFilter, options) {
      (0, _tuiCodeSnippet.forEach)(options, function (value, key) {
        if (!(0, _tuiCodeSnippet.isUndefined)(imgFilter[key])) {
          imgFilter[key] = value;
        }
      });
      (0, _tuiCodeSnippet.forEach)(imgFilter.options, function (value, key) {
        if (!(0, _tuiCodeSnippet.isUndefined)(options[key])) {
          imgFilter.options[key] = options[key];
        }
      });
    }

    /**
     * Apply filter
     * @param {fabric.Image} sourceImg - Source image to apply filter
     * @param {function} callback - Executed function after applying filter
     * @private
     */

  }, {
    key: '_apply',
    value: function _apply(sourceImg, callback) {
      sourceImg.filters.push();
      var result = sourceImg.applyFilters();
      if (result) {
        callback();
      }
    }

    /**
     * Get source image on canvas
     * @returns {fabric.Image} Current source image on canvas
     * @private
     */

  }, {
    key: '_getSourceImage',
    value: function _getSourceImage() {
      return this.getCanvasImage();
    }

    /**
     * Create filter instance
     * @param {fabric.Image} sourceImg - Source image to apply filter
     * @param {string} type - Filter type
     * @param {Object} [options] - Options of filter
     * @returns {Object} Fabric object of filter
     * @private
     */

  }, {
    key: '_createFilter',
    value: function _createFilter(sourceImg, type, options) {
      var filterObj = void 0;
      // capitalize first letter for matching with fabric image filter name
      var fabricType = this._getFabricFilterType(type);
      var ImageFilter = _fabric2.default.Image.filters[fabricType];
      if (ImageFilter) {
        filterObj = new ImageFilter(options);
        filterObj.options = options;
        sourceImg.filters.push(filterObj);
      }

      return filterObj;
    }

    /**
     * Get applied filter instance
     * @param {fabric.Image} sourceImg - Source image to apply filter
     * @param {string} type - Filter type
     * @returns {Object} Fabric object of filter
     * @private
     */

  }, {
    key: '_getFilter',
    value: function _getFilter(sourceImg, type) {
      var imgFilter = null;

      if (sourceImg) {
        var fabricType = this._getFabricFilterType(type);
        var length = sourceImg.filters.length;

        var item = void 0,
            i = void 0;

        for (i = 0; i < length; i += 1) {
          item = sourceImg.filters[i];
          if (item.type === fabricType) {
            imgFilter = item;
            break;
          }
        }
      }

      return imgFilter;
    }

    /**
     * Remove applied filter instance
     * @param {fabric.Image} sourceImg - Source image to apply filter
     * @param {string} type - Filter type
     * @private
     */

  }, {
    key: '_removeFilter',
    value: function _removeFilter(sourceImg, type) {
      var fabricType = this._getFabricFilterType(type);
      sourceImg.filters = (0, _tuiCodeSnippet.filter)(sourceImg.filters, function (value) {
        return value.type !== fabricType;
      });
    }

    /**
     * Change filter class name to fabric's, especially capitalizing first letter
     * @param {string} type - Filter type
     * @example
     * 'grayscale' -> 'Grayscale'
     * @returns {string} Fabric filter class name
     */

  }, {
    key: '_getFabricFilterType',
    value: function _getFabricFilterType(type) {
      return type.charAt(0).toUpperCase() + type.slice(1);
    }
  }]);

  return Filter;
}(_component2.default);

exports.default = Filter;

/***/ }),

/***/ "./src/js/component/flip.js":
/*!**********************************!*\
  !*** ./src/js/component/flip.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _component = __webpack_require__(/*! @/interface/component */ "./src/js/interface/component.js");

var _component2 = _interopRequireDefault(_component);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview Image flip module
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Flip
 * @class Flip
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
var Flip = function (_Component) {
  _inherits(Flip, _Component);

  function Flip(graphics) {
    _classCallCheck(this, Flip);

    return _possibleConstructorReturn(this, (Flip.__proto__ || Object.getPrototypeOf(Flip)).call(this, _consts.componentNames.FLIP, graphics));
  }

  /**
   * Get current flip settings
   * @returns {{flipX: Boolean, flipY: Boolean}}
   */


  _createClass(Flip, [{
    key: 'getCurrentSetting',
    value: function getCurrentSetting() {
      var canvasImage = this.getCanvasImage();

      return {
        flipX: canvasImage.flipX,
        flipY: canvasImage.flipY
      };
    }

    /**
     * Set flipX, flipY
     * @param {{flipX: Boolean, flipY: Boolean}} newSetting - Flip setting
     * @returns {Promise}
     */

  }, {
    key: 'set',
    value: function set(newSetting) {
      var setting = this.getCurrentSetting();
      var isChangingFlipX = setting.flipX !== newSetting.flipX;
      var isChangingFlipY = setting.flipY !== newSetting.flipY;

      if (!isChangingFlipX && !isChangingFlipY) {
        return _util.Promise.reject(_consts.rejectMessages.flip);
      }

      _tuiCodeSnippet2.default.extend(setting, newSetting);
      this.setImageProperties(setting, true);
      this._invertAngle(isChangingFlipX, isChangingFlipY);
      this._flipObjects(isChangingFlipX, isChangingFlipY);

      return _util.Promise.resolve({
        flipX: setting.flipX,
        flipY: setting.flipY,
        angle: this.getCanvasImage().angle
      });
    }

    /**
     * Invert image angle for flip
     * @param {boolean} isChangingFlipX - Change flipX
     * @param {boolean} isChangingFlipY - Change flipY
     */

  }, {
    key: '_invertAngle',
    value: function _invertAngle(isChangingFlipX, isChangingFlipY) {
      var canvasImage = this.getCanvasImage();
      var angle = canvasImage.angle;


      if (isChangingFlipX) {
        angle *= -1;
      }
      if (isChangingFlipY) {
        angle *= -1;
      }
      canvasImage.rotate(parseFloat(angle)).setCoords(); // parseFloat for -0 to 0
    }

    /**
     * Flip objects
     * @param {boolean} isChangingFlipX - Change flipX
     * @param {boolean} isChangingFlipY - Change flipY
     * @private
     */

  }, {
    key: '_flipObjects',
    value: function _flipObjects(isChangingFlipX, isChangingFlipY) {
      var canvas = this.getCanvas();

      if (isChangingFlipX) {
        canvas.forEachObject(function (obj) {
          obj.set({
            angle: parseFloat(obj.angle * -1), // parseFloat for -0 to 0
            flipX: !obj.flipX,
            left: canvas.width - obj.left
          }).setCoords();
        });
      }
      if (isChangingFlipY) {
        canvas.forEachObject(function (obj) {
          obj.set({
            angle: parseFloat(obj.angle * -1), // parseFloat for -0 to 0
            flipY: !obj.flipY,
            top: canvas.height - obj.top
          }).setCoords();
        });
      }
      canvas.renderAll();
    }

    /**
     * Reset flip settings
     * @returns {Promise}
     */

  }, {
    key: 'reset',
    value: function reset() {
      return this.set({
        flipX: false,
        flipY: false
      });
    }

    /**
     * Flip x
     * @returns {Promise}
     */

  }, {
    key: 'flipX',
    value: function flipX() {
      var current = this.getCurrentSetting();

      return this.set({
        flipX: !current.flipX,
        flipY: current.flipY
      });
    }

    /**
     * Flip y
     * @returns {Promise}
     */

  }, {
    key: 'flipY',
    value: function flipY() {
      var current = this.getCurrentSetting();

      return this.set({
        flipX: current.flipX,
        flipY: !current.flipY
      });
    }
  }]);

  return Flip;
}(_component2.default);

exports.default = Flip;

/***/ }),

/***/ "./src/js/component/freeDrawing.js":
/*!*****************************************!*\
  !*** ./src/js/component/freeDrawing.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

var _component = __webpack_require__(/*! @/interface/component */ "./src/js/interface/component.js");

var _component2 = _interopRequireDefault(_component);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview Free drawing module, Set brush
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * FreeDrawing
 * @class FreeDrawing
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
var FreeDrawing = function (_Component) {
  _inherits(FreeDrawing, _Component);

  function FreeDrawing(graphics) {
    _classCallCheck(this, FreeDrawing);

    /**
     * Brush width
     * @type {number}
     */
    var _this = _possibleConstructorReturn(this, (FreeDrawing.__proto__ || Object.getPrototypeOf(FreeDrawing)).call(this, _consts.componentNames.FREE_DRAWING, graphics));

    _this.width = 12;

    /**
     * fabric.Color instance for brush color
     * @type {fabric.Color}
     */
    _this.oColor = new _fabric2.default.Color('rgba(0, 0, 0, 0.5)');
    return _this;
  }

  /**
   * Start free drawing mode
   * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
   */


  _createClass(FreeDrawing, [{
    key: 'start',
    value: function start(setting) {
      var canvas = this.getCanvas();

      canvas.isDrawingMode = true;
      this.setBrush(setting);
    }

    /**
     * Set brush
     * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
     */

  }, {
    key: 'setBrush',
    value: function setBrush(setting) {
      var brush = this.getCanvas().freeDrawingBrush;

      setting = setting || {};
      this.width = setting.width || this.width;
      if (setting.color) {
        this.oColor = new _fabric2.default.Color(setting.color);
      }
      brush.width = this.width;
      brush.color = this.oColor.toRgba();
    }

    /**
     * End free drawing mode
     */

  }, {
    key: 'end',
    value: function end() {
      var canvas = this.getCanvas();

      canvas.isDrawingMode = false;
    }
  }]);

  return FreeDrawing;
}(_component2.default);

exports.default = FreeDrawing;

/***/ }),

/***/ "./src/js/component/icon.js":
/*!**********************************!*\
  !*** ./src/js/component/icon.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

var _component = __webpack_require__(/*! @/interface/component */ "./src/js/interface/component.js");

var _component2 = _interopRequireDefault(_component);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview Add icon module
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var pathMap = {
  arrow: 'M 0 90 H 105 V 120 L 160 60 L 105 0 V 30 H 0 Z',
  cancel: 'M 0 30 L 30 60 L 0 90 L 30 120 L 60 90 L 90 120 L 120 90 ' + 'L 90 60 L 120 30 L 90 0 L 60 30 L 30 0 Z'
};

/**
 * Icon
 * @class Icon
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */

var Icon = function (_Component) {
  _inherits(Icon, _Component);

  function Icon(graphics) {
    _classCallCheck(this, Icon);

    /**
     * Default icon color
     * @type {string}
     */
    var _this = _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).call(this, _consts.componentNames.ICON, graphics));

    _this._oColor = '#000000';

    /**
     * Path value of each icon type
     * @type {Object}
     */
    _this._pathMap = pathMap;

    /**
     * Type of the drawing icon
     * @type {string}
     * @private
     */
    _this._type = null;

    /**
     * Color of the drawing icon
     * @type {string}
     * @private
     */
    _this._iconColor = null;

    /**
     * Event handler list
     * @type {Object}
     * @private
     */
    _this._handlers = {
      mousedown: _this._onFabricMouseDown.bind(_this),
      mousemove: _this._onFabricMouseMove.bind(_this),
      mouseup: _this._onFabricMouseUp.bind(_this)
    };
    return _this;
  }

  /**
   * Set states of the current drawing shape
   * @ignore
   * @param {string} type - Icon type ('arrow', 'cancel', custom icon name)
   * @param {string} iconColor - Icon foreground color
   */


  _createClass(Icon, [{
    key: 'setStates',
    value: function setStates(type, iconColor) {
      this._type = type;
      this._iconColor = iconColor;
    }

    /**
     * Start to draw the icon on canvas
     * @ignore
     */

  }, {
    key: 'start',
    value: function start() {
      var canvas = this.getCanvas();
      canvas.selection = false;
      canvas.on('mouse:down', this._handlers.mousedown);
    }

    /**
     * End to draw the icon on canvas
     * @ignore
     */

  }, {
    key: 'end',
    value: function end() {
      var canvas = this.getCanvas();

      canvas.selection = true;
      canvas.off({
        'mouse:down': this._handlers.mousedown
      });
    }

    /**
     * Add icon
     * @param {string} type - Icon type
     * @param {Object} options - Icon options
     *      @param {string} [options.fill] - Icon foreground color
     *      @param {string} [options.left] - Icon x position
     *      @param {string} [options.top] - Icon y position
     * @returns {Promise}
     */

  }, {
    key: 'add',
    value: function add(type, options) {
      var _this2 = this;

      return new _util.Promise(function (resolve, reject) {
        var canvas = _this2.getCanvas();
        var path = _this2._pathMap[type];
        var selectionStyle = _consts.fObjectOptions.SELECTION_STYLE;
        var icon = path ? _this2._createIcon(path) : null;
        _this2._icon = icon;

        if (!icon) {
          reject(_consts.rejectMessages.invalidParameters);
        }

        icon.set(_tuiCodeSnippet2.default.extend({
          type: 'icon',
          fill: _this2._oColor
        }, selectionStyle, options, _this2.graphics.controlStyle));

        canvas.add(icon).setActiveObject(icon);

        resolve(_this2.graphics.createObjectProperties(icon));
      });
    }

    /**
     * Register icon paths
     * @param {{key: string, value: string}} pathInfos - Path infos
     */

  }, {
    key: 'registerPaths',
    value: function registerPaths(pathInfos) {
      var _this3 = this;

      _tuiCodeSnippet2.default.forEach(pathInfos, function (path, type) {
        _this3._pathMap[type] = path;
      }, this);
    }

    /**
     * Set icon object color
     * @param {string} color - Color to set
     * @param {fabric.Path}[obj] - Current activated path object
     */

  }, {
    key: 'setColor',
    value: function setColor(color, obj) {
      this._oColor = color;

      if (obj && obj.get('type') === 'icon') {
        obj.set({ fill: this._oColor });
        this.getCanvas().renderAll();
      }
    }

    /**
     * Get icon color
     * @param {fabric.Path}[obj] - Current activated path object
     * @returns {string} color
     */

  }, {
    key: 'getColor',
    value: function getColor(obj) {
      return obj.fill;
    }

    /**
     * Create icon object
     * @param {string} path - Path value to create icon
     * @returns {fabric.Path} Path object
     */

  }, {
    key: '_createIcon',
    value: function _createIcon(path) {
      return new _fabric2.default.Path(path);
    }

    /**
     * MouseDown event handler on canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object
     * @private
     */

  }, {
    key: '_onFabricMouseDown',
    value: function _onFabricMouseDown(fEvent) {
      var _this4 = this;

      var canvas = this.getCanvas();

      this._startPoint = canvas.getPointer(fEvent.e);
      var _startPoint = this._startPoint,
          left = _startPoint.x,
          top = _startPoint.y;


      this.add(this._type, {
        left: left,
        top: top,
        fill: this._iconColor
      }).then(function () {
        _this4.fire(_consts.eventNames.ADD_OBJECT, _this4.graphics.createObjectProperties(_this4._icon));
        canvas.on('mouse:move', _this4._handlers.mousemove);
        canvas.on('mouse:up', _this4._handlers.mouseup);
      });
    }

    /**
     * MouseMove event handler on canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object
     * @private
     */

  }, {
    key: '_onFabricMouseMove',
    value: function _onFabricMouseMove(fEvent) {
      var canvas = this.getCanvas();

      if (!this._icon) {
        return;
      }
      var moveOriginPointer = canvas.getPointer(fEvent.e);

      var scaleX = (moveOriginPointer.x - this._startPoint.x) / this._icon.width;
      var scaleY = (moveOriginPointer.y - this._startPoint.y) / this._icon.height;

      this._icon.set({
        scaleX: Math.abs(scaleX * 2),
        scaleY: Math.abs(scaleY * 2)
      });

      this._icon.setCoords();
      canvas.renderAll();
    }

    /**
     * MouseUp event handler on canvas
     * @private
     */

  }, {
    key: '_onFabricMouseUp',
    value: function _onFabricMouseUp() {
      var canvas = this.getCanvas();

      this.fire(_consts.eventNames.OBJECT_ADDED, this.graphics.createObjectProperties(this._icon));

      this._icon = null;

      canvas.off('mouse:down', this._handlers.mousedown);
      canvas.off('mouse:move', this._handlers.mousemove);
      canvas.off('mouse:up', this._handlers.mouseup);
    }
  }]);

  return Icon;
}(_component2.default);

exports.default = Icon;

/***/ }),

/***/ "./src/js/component/imageLoader.js":
/*!*****************************************!*\
  !*** ./src/js/component/imageLoader.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(/*! @/interface/component */ "./src/js/interface/component.js");

var _component2 = _interopRequireDefault(_component);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview Image loader
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var imageOption = {
  padding: 0,
  crossOrigin: 'Anonymous'
};

/**
 * ImageLoader components
 * @extends {Component}
 * @class ImageLoader
 * @param {Graphics} graphics - Graphics instance
 * @ignore
 */

var ImageLoader = function (_Component) {
  _inherits(ImageLoader, _Component);

  function ImageLoader(graphics) {
    _classCallCheck(this, ImageLoader);

    return _possibleConstructorReturn(this, (ImageLoader.__proto__ || Object.getPrototypeOf(ImageLoader)).call(this, _consts.componentNames.IMAGE_LOADER, graphics));
  }

  /**
   * Load image from url
   * @param {?string} imageName - File name
   * @param {?(fabric.Image|string)} img - fabric.Image instance or URL of an image
   * @returns {Promise}
   */


  _createClass(ImageLoader, [{
    key: 'load',
    value: function load(imageName, img) {
      var _this2 = this;

      var promise = void 0;

      if (!imageName && !img) {
        // Back to the initial state, not error.
        var canvas = this.getCanvas();

        canvas.backgroundImage = null;
        canvas.renderAll();

        promise = new _util.Promise(function (resolve) {
          _this2.setCanvasImage('', null);
          resolve();
        });
      } else {
        promise = this._setBackgroundImage(img).then(function (oImage) {
          _this2.setCanvasImage(imageName, oImage);
          _this2.adjustCanvasDimension();

          return oImage;
        });
      }

      return promise;
    }

    /**
     * Set background image
     * @param {?(fabric.Image|String)} img fabric.Image instance or URL of an image to set background to
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_setBackgroundImage',
    value: function _setBackgroundImage(img) {
      var _this3 = this;

      if (!img) {
        return _util.Promise.reject(_consts.rejectMessages.loadImage);
      }

      return new _util.Promise(function (resolve, reject) {
        var canvas = _this3.getCanvas();

        canvas.setBackgroundImage(img, function () {
          var oImage = canvas.backgroundImage;

          if (oImage && oImage.getElement()) {
            resolve(oImage);
          } else {
            reject(_consts.rejectMessages.loadingImageFailed);
          }
        }, imageOption);
      });
    }
  }]);

  return ImageLoader;
}(_component2.default);

exports.default = ImageLoader;

/***/ }),

/***/ "./src/js/component/line.js":
/*!**********************************!*\
  !*** ./src/js/component/line.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

var _component = __webpack_require__(/*! @/interface/component */ "./src/js/interface/component.js");

var _component2 = _interopRequireDefault(_component);

var _arrowLine = __webpack_require__(/*! @/extension/arrowLine */ "./src/js/extension/arrowLine.js");

var _arrowLine2 = _interopRequireDefault(_arrowLine);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview Free drawing module, Set brush
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Line
 * @class Line
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
var Line = function (_Component) {
  _inherits(Line, _Component);

  function Line(graphics) {
    _classCallCheck(this, Line);

    /**
     * Brush width
     * @type {number}
     * @private
     */
    var _this = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, _consts.componentNames.LINE, graphics));

    _this._width = 12;

    /**
     * fabric.Color instance for brush color
     * @type {fabric.Color}
     * @private
     */
    _this._oColor = new _fabric2.default.Color('rgba(0, 0, 0, 0.5)');

    /**
     * Listeners
     * @type {object.<string, function>}
     * @private
     */
    _this._listeners = {
      mousedown: _this._onFabricMouseDown.bind(_this),
      mousemove: _this._onFabricMouseMove.bind(_this),
      mouseup: _this._onFabricMouseUp.bind(_this)
    };
    return _this;
  }

  /**
   * Start drawing line mode
   * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
   */


  _createClass(Line, [{
    key: 'setHeadOption',
    value: function setHeadOption(setting) {
      var _setting$arrowType = setting.arrowType,
          arrowType = _setting$arrowType === undefined ? {
        head: null,
        tail: null
      } : _setting$arrowType;


      this._arrowType = arrowType;
    }

    /**
     * Start drawing line mode
     * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
     */

  }, {
    key: 'start',
    value: function start() {
      var setting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var canvas = this.getCanvas();

      canvas.defaultCursor = 'crosshair';
      canvas.selection = false;

      this.setHeadOption(setting);
      this.setBrush(setting);

      canvas.forEachObject(function (obj) {
        obj.set({
          evented: false
        });
      });

      canvas.on({
        'mouse:down': this._listeners.mousedown
      });
    }

    /**
     * Set brush
     * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
     */

  }, {
    key: 'setBrush',
    value: function setBrush(setting) {
      var brush = this.getCanvas().freeDrawingBrush;

      setting = setting || {};
      this._width = setting.width || this._width;

      if (setting.color) {
        this._oColor = new _fabric2.default.Color(setting.color);
      }
      brush.width = this._width;
      brush.color = this._oColor.toRgba();
    }

    /**
     * End drawing line mode
     */

  }, {
    key: 'end',
    value: function end() {
      var canvas = this.getCanvas();

      canvas.defaultCursor = 'default';
      canvas.selection = true;

      canvas.forEachObject(function (obj) {
        obj.set({
          evented: true
        });
      });

      canvas.off('mouse:down', this._listeners.mousedown);
    }

    /**
     * Mousedown event handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object
     * @private
     */

  }, {
    key: '_onFabricMouseDown',
    value: function _onFabricMouseDown(fEvent) {
      var canvas = this.getCanvas();

      var _canvas$getPointer = canvas.getPointer(fEvent.e),
          x = _canvas$getPointer.x,
          y = _canvas$getPointer.y;

      var points = [x, y, x, y];

      this._line = new _arrowLine2.default(points, {
        stroke: this._oColor.toRgba(),
        strokeWidth: this._width,
        arrowType: this._arrowType,
        evented: false
      });

      this._line.set(_consts.fObjectOptions.SELECTION_STYLE);

      canvas.add(this._line);

      canvas.on({
        'mouse:move': this._listeners.mousemove,
        'mouse:up': this._listeners.mouseup
      });

      this.fire(_consts.eventNames.ADD_OBJECT, this._createLineEventObjectProperties());
    }

    /**
     * Mousemove event handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object
     * @private
     */

  }, {
    key: '_onFabricMouseMove',
    value: function _onFabricMouseMove(fEvent) {
      var canvas = this.getCanvas();
      var pointer = canvas.getPointer(fEvent.e);

      this._line.set({
        x2: pointer.x,
        y2: pointer.y
      });

      this._line.setCoords();

      canvas.renderAll();
    }

    /**
     * Mouseup event handler in fabric canvas
     * @private
     */

  }, {
    key: '_onFabricMouseUp',
    value: function _onFabricMouseUp() {
      var canvas = this.getCanvas();

      this.fire(_consts.eventNames.OBJECT_ADDED, this._createLineEventObjectProperties());

      this._line = null;

      canvas.off({
        'mouse:move': this._listeners.mousemove,
        'mouse:up': this._listeners.mouseup
      });
    }

    /**
     * create line event object properties
     * @returns {Object} properties line object
     * @private
     */

  }, {
    key: '_createLineEventObjectProperties',
    value: function _createLineEventObjectProperties() {
      var params = this.graphics.createObjectProperties(this._line);
      var _line = this._line,
          x1 = _line.x1,
          x2 = _line.x2,
          y1 = _line.y1,
          y2 = _line.y2;


      return _tuiCodeSnippet2.default.extend({}, params, {
        startPosition: {
          x: x1,
          y: y1
        },
        endPosition: {
          x: x2,
          y: y2
        }
      });
    }
  }]);

  return Line;
}(_component2.default);

exports.default = Line;

/***/ }),

/***/ "./src/js/component/resize.js":
/*!************************************!*\
  !*** ./src/js/component/resize.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _component = __webpack_require__(/*! @/interface/component */ "./src/js/interface/component.js");

var _component2 = _interopRequireDefault(_component);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Resize components
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @class Resize
 * @ignore
 */
var Resize = function (_Component) {
  _inherits(Resize, _Component);

  function Resize(graphics) {
    _classCallCheck(this, Resize);

    /**
     * Current dimensions
     * @type {Object}
     * @private
     */
    var _this = _possibleConstructorReturn(this, (Resize.__proto__ || Object.getPrototypeOf(Resize)).call(this, _consts.componentNames.RESIZE, graphics));

    _this._dimensions = null;

    /**
     * Original dimensions
     * @type {Object}
     * @private
     */
    _this._originalDimensions = null;
    return _this;
  }

  /**
   * Get current dimensions
   * @returns {object}
   */


  _createClass(Resize, [{
    key: 'getCurrentDimensions',
    value: function getCurrentDimensions() {
      var canvasImage = this.getCanvasImage();
      if (!this._dimensions && canvasImage) {
        var width = canvasImage.width,
            height = canvasImage.height;

        this._dimensions = { width: width, height: height };
      }

      return this._dimensions;
    }

    /**
     * Get original dimensions
     * @returns {object}
     */

  }, {
    key: 'getOriginalDimensions',
    value: function getOriginalDimensions() {
      return this._originalDimensions;
    }

    /**
     * Set original dimensions
     * @param {object} dimensions - Dimensions
     */

  }, {
    key: 'setOriginalDimensions',
    value: function setOriginalDimensions(dimensions) {
      this._originalDimensions = dimensions;
    }

    /**
     * Resize Image
     * @param {Object} dimensions - Resize dimensions
     * @returns {Promise}
     */

  }, {
    key: 'resize',
    value: function resize(dimensions) {
      var canvasImage = this.getCanvasImage();
      var width = canvasImage.width,
          height = canvasImage.height,
          scaleX = canvasImage.scaleX,
          scaleY = canvasImage.scaleY;
      var dimensionsWidth = dimensions.width,
          dimensionsHeight = dimensions.height;


      var scaleValues = {
        scaleX: dimensionsWidth ? dimensionsWidth / width : scaleX,
        scaleY: dimensionsHeight ? dimensionsHeight / height : scaleY
      };

      if (scaleX !== scaleValues.scaleX || scaleY !== scaleValues.scaleY) {
        canvasImage.set(scaleValues).setCoords();

        this._dimensions = {
          width: canvasImage.width * canvasImage.scaleX,
          height: canvasImage.height * canvasImage.scaleY
        };
      }

      this.adjustCanvasDimensionBase();

      return _util.Promise.resolve();
    }

    /**
     * Start resizing
     */

  }, {
    key: 'start',
    value: function start() {
      var dimensions = this.getCurrentDimensions();
      this.setOriginalDimensions(dimensions);
    }

    /**
     * End resizing
     */

  }, {
    key: 'end',
    value: function end() {}
  }]);

  return Resize;
}(_component2.default);

exports.default = Resize;

/***/ }),

/***/ "./src/js/component/rotation.js":
/*!**************************************!*\
  !*** ./src/js/component/rotation.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

var _component = __webpack_require__(/*! @/interface/component */ "./src/js/interface/component.js");

var _component2 = _interopRequireDefault(_component);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview Image rotation module
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * Image Rotation component
 * @class Rotation
 * @extends {Component}
 * @param {Graphics} graphics - Graphics instance
 * @ignore
 */
var Rotation = function (_Component) {
  _inherits(Rotation, _Component);

  function Rotation(graphics) {
    _classCallCheck(this, Rotation);

    return _possibleConstructorReturn(this, (Rotation.__proto__ || Object.getPrototypeOf(Rotation)).call(this, _consts.componentNames.ROTATION, graphics));
  }

  /**
   * Get current angle
   * @returns {Number}
   */


  _createClass(Rotation, [{
    key: 'getCurrentAngle',
    value: function getCurrentAngle() {
      return this.getCanvasImage().angle;
    }

    /**
     * Set angle of the image
     *
     *  Do not call "this.setImageProperties" for setting angle directly.
     *  Before setting angle, The originX,Y of image should be set to center.
     *      See "http://fabricjs.com/docs/fabric.Object.html#setAngle"
     *
     * @param {number} angle - Angle value
     * @returns {Promise}
     */

  }, {
    key: 'setAngle',
    value: function setAngle(angle) {
      var oldAngle = this.getCurrentAngle() % 360; // The angle is lower than 2*PI(===360 degrees)

      angle %= 360;

      var canvasImage = this.getCanvasImage();
      var oldImageCenter = canvasImage.getCenterPoint();
      canvasImage.set({ angle: angle }).setCoords();
      this.adjustCanvasDimension();
      var newImageCenter = canvasImage.getCenterPoint();
      this._rotateForEachObject(oldImageCenter, newImageCenter, angle - oldAngle);

      return _util.Promise.resolve(angle);
    }

    /**
     * Rotate for each object
     * @param {fabric.Point} oldImageCenter - Image center point before rotation
     * @param {fabric.Point} newImageCenter - Image center point after rotation
     * @param {number} angleDiff - Image angle difference after rotation
     * @private
     */

  }, {
    key: '_rotateForEachObject',
    value: function _rotateForEachObject(oldImageCenter, newImageCenter, angleDiff) {
      var canvas = this.getCanvas();
      var centerDiff = {
        x: oldImageCenter.x - newImageCenter.x,
        y: oldImageCenter.y - newImageCenter.y
      };

      canvas.forEachObject(function (obj) {
        var objCenter = obj.getCenterPoint();
        var radian = _fabric2.default.util.degreesToRadians(angleDiff);
        var newObjCenter = _fabric2.default.util.rotatePoint(objCenter, oldImageCenter, radian);

        obj.set({
          left: newObjCenter.x - centerDiff.x,
          top: newObjCenter.y - centerDiff.y,
          angle: (obj.angle + angleDiff) % 360
        });
        obj.setCoords();
      });
      canvas.renderAll();
    }

    /**
     * Rotate the image
     * @param {number} additionalAngle - Additional angle
     * @returns {Promise}
     */

  }, {
    key: 'rotate',
    value: function rotate(additionalAngle) {
      var current = this.getCurrentAngle();

      return this.setAngle(current + additionalAngle);
    }
  }]);

  return Rotation;
}(_component2.default);

exports.default = Rotation;

/***/ }),

/***/ "./src/js/component/shape.js":
/*!***********************************!*\
  !*** ./src/js/component/shape.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

var _component = __webpack_require__(/*! @/interface/component */ "./src/js/interface/component.js");

var _component2 = _interopRequireDefault(_component);

var _shapeResizeHelper = __webpack_require__(/*! @/helper/shapeResizeHelper */ "./src/js/helper/shapeResizeHelper.js");

var _shapeResizeHelper2 = _interopRequireDefault(_shapeResizeHelper);

var _shapeFilterFillHelper = __webpack_require__(/*! @/helper/shapeFilterFillHelper */ "./src/js/helper/shapeFilterFillHelper.js");

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview Shape component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var SHAPE_INIT_OPTIONS = (0, _tuiCodeSnippet.extend)({
  strokeWidth: 1,
  stroke: '#000000',
  fill: '#ffffff',
  width: 1,
  height: 1,
  rx: 0,
  ry: 0
}, _consts.SHAPE_DEFAULT_OPTIONS);
var DEFAULT_TYPE = 'rect';
var DEFAULT_WIDTH = 20;
var DEFAULT_HEIGHT = 20;

/**
 * Make fill option
 * @param {Object} options - Options to create the shape
 * @param {Object.Image} canvasImage - canvas background image
 * @param {Function} createStaticCanvas - static canvas creater
 * @returns {Object} - shape option
 * @private
 */
function makeFabricFillOption(options, canvasImage, createStaticCanvas) {
  var fillOption = options.fill;
  var fillType = (0, _util.getFillTypeFromOption)(options.fill);
  var fill = fillOption;

  if (fillOption.color) {
    fill = fillOption.color;
  }

  var extOption = null;
  if (fillType === 'filter') {
    var newStaticCanvas = createStaticCanvas();
    extOption = (0, _shapeFilterFillHelper.makeFillPatternForFilter)(canvasImage, fillOption.filter, newStaticCanvas);
  } else {
    extOption = { fill: fill };
  }

  return (0, _tuiCodeSnippet.extend)({}, options, extOption);
}

/**
 * Shape
 * @class Shape
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */

var Shape = function (_Component) {
  _inherits(Shape, _Component);

  function Shape(graphics) {
    _classCallCheck(this, Shape);

    /**
     * Object of The drawing shape
     * @type {fabric.Object}
     * @private
     */
    var _this = _possibleConstructorReturn(this, (Shape.__proto__ || Object.getPrototypeOf(Shape)).call(this, _consts.componentNames.SHAPE, graphics));

    _this._shapeObj = null;

    /**
     * Type of the drawing shape
     * @type {string}
     * @private
     */
    _this._type = DEFAULT_TYPE;

    /**
     * Options to draw the shape
     * @type {Object}
     * @private
     */
    _this._options = (0, _tuiCodeSnippet.extend)({}, SHAPE_INIT_OPTIONS);

    /**
     * Whether the shape object is selected or not
     * @type {boolean}
     * @private
     */
    _this._isSelected = false;

    /**
     * Pointer for drawing shape (x, y)
     * @type {Object}
     * @private
     */
    _this._startPoint = {};

    /**
     * Using shortcut on drawing shape
     * @type {boolean}
     * @private
     */
    _this._withShiftKey = false;

    /**
     * Event handler list
     * @type {Object}
     * @private
     */
    _this._handlers = {
      mousedown: _this._onFabricMouseDown.bind(_this),
      mousemove: _this._onFabricMouseMove.bind(_this),
      mouseup: _this._onFabricMouseUp.bind(_this),
      keydown: _this._onKeyDown.bind(_this),
      keyup: _this._onKeyUp.bind(_this)
    };
    return _this;
  }

  /**
   * Start to draw the shape on canvas
   * @ignore
   */


  _createClass(Shape, [{
    key: 'start',
    value: function start() {
      var canvas = this.getCanvas();

      this._isSelected = false;

      canvas.defaultCursor = 'crosshair';
      canvas.selection = false;
      canvas.uniformScaling = true;
      canvas.on({
        'mouse:down': this._handlers.mousedown
      });

      _fabric2.default.util.addListener(document, 'keydown', this._handlers.keydown);
      _fabric2.default.util.addListener(document, 'keyup', this._handlers.keyup);
    }

    /**
     * End to draw the shape on canvas
     * @ignore
     */

  }, {
    key: 'end',
    value: function end() {
      var canvas = this.getCanvas();

      this._isSelected = false;

      canvas.defaultCursor = 'default';

      canvas.selection = true;
      canvas.uniformScaling = false;
      canvas.off({
        'mouse:down': this._handlers.mousedown
      });

      _fabric2.default.util.removeListener(document, 'keydown', this._handlers.keydown);
      _fabric2.default.util.removeListener(document, 'keyup', this._handlers.keyup);
    }

    /**
     * Set states of the current drawing shape
     * @ignore
     * @param {string} type - Shape type (ex: 'rect', 'circle')
     * @param {Object} [options] - Shape options
     *      @param {(ShapeFillOption | string)} [options.fill] - {@link ShapeFillOption} or
     *        Shape foreground color (ex: '#fff', 'transparent')
     *      @param {string} [options.stoke] - Shape outline color
     *      @param {number} [options.strokeWidth] - Shape outline width
     *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
     *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
     *      @param {number} [options.rx] - Radius x value (When type option is 'circle', this options can use)
     *      @param {number} [options.ry] - Radius y value (When type option is 'circle', this options can use)
     */

  }, {
    key: 'setStates',
    value: function setStates(type, options) {
      this._type = type;

      if (options) {
        this._options = (0, _tuiCodeSnippet.extend)(this._options, options);
      }
    }

    /**
     * Add the shape
     * @ignore
     * @param {string} type - Shape type (ex: 'rect', 'circle')
     * @param {Object} options - Shape options
     *      @param {(ShapeFillOption | string)} [options.fill] - ShapeFillOption or Shape foreground color (ex: '#fff', 'transparent') or ShapeFillOption object
     *      @param {string} [options.stroke] - Shape outline color
     *      @param {number} [options.strokeWidth] - Shape outline width
     *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
     *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
     *      @param {number} [options.rx] - Radius x value (When type option is 'circle', this options can use)
     *      @param {number} [options.ry] - Radius y value (When type option is 'circle', this options can use)
     *      @param {number} [options.isRegular] - Whether scaling shape has 1:1 ratio or not
     * @returns {Promise}
     */

  }, {
    key: 'add',
    value: function add(type, options) {
      var _this2 = this;

      return new _util.Promise(function (resolve) {
        var canvas = _this2.getCanvas();
        var extendOption = _this2._extendOptions(options);

        var shapeObj = _this2._createInstance(type, extendOption);
        var objectProperties = _this2.graphics.createObjectProperties(shapeObj);

        _this2._bindEventOnShape(shapeObj);

        canvas.add(shapeObj).setActiveObject(shapeObj);

        _this2._resetPositionFillFilter(shapeObj);

        resolve(objectProperties);
      });
    }

    /**
     * Change the shape
     * @ignore
     * @param {fabric.Object} shapeObj - Selected shape object on canvas
     * @param {Object} options - Shape options
     *      @param {(ShapeFillOption | string)} [options.fill] - {@link ShapeFillOption} or
     *        Shape foreground color (ex: '#fff', 'transparent')
     *      @param {string} [options.stroke] - Shape outline color
     *      @param {number} [options.strokeWidth] - Shape outline width
     *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
     *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
     *      @param {number} [options.rx] - Radius x value (When type option is 'circle', this options can use)
     *      @param {number} [options.ry] - Radius y value (When type option is 'circle', this options can use)
     *      @param {number} [options.isRegular] - Whether scaling shape has 1:1 ratio or not
     * @returns {Promise}
     */

  }, {
    key: 'change',
    value: function change(shapeObj, options) {
      var _this3 = this;

      return new _util.Promise(function (resolve, reject) {
        if (!(0, _util.isShape)(shapeObj)) {
          reject(_consts.rejectMessages.unsupportedType);
        }
        var hasFillOption = (0, _util.getFillTypeFromOption)(options.fill) === 'filter';
        var _graphics = _this3.graphics,
            canvasImage = _graphics.canvasImage,
            createStaticCanvas = _graphics.createStaticCanvas;


        shapeObj.set(hasFillOption ? makeFabricFillOption(options, canvasImage, createStaticCanvas) : options);

        if (hasFillOption) {
          _this3._resetPositionFillFilter(shapeObj);
        }

        _this3.getCanvas().renderAll();
        resolve();
      });
    }

    /**
     * make fill property for user event
     * @param {fabric.Object} shapeObj - fabric object
     * @returns {Object}
     */

  }, {
    key: 'makeFillPropertyForUserEvent',
    value: function makeFillPropertyForUserEvent(shapeObj) {
      var fillType = (0, _util.getFillTypeFromObject)(shapeObj);
      var fillProp = {};

      if (fillType === _consts.SHAPE_FILL_TYPE.FILTER) {
        var fillImage = (0, _shapeFilterFillHelper.getFillImageFromShape)(shapeObj);
        var filterOption = (0, _shapeFilterFillHelper.makeFilterOptionFromFabricImage)(fillImage);

        fillProp.type = fillType;
        fillProp.filter = filterOption;
      } else {
        fillProp.type = _consts.SHAPE_FILL_TYPE.COLOR;
        fillProp.color = shapeObj.fill || 'transparent';
      }

      return fillProp;
    }

    /**
     * Copy object handling.
     * @param {fabric.Object} shapeObj - Shape object
     * @param {fabric.Object} originalShapeObj - Shape object
     */

  }, {
    key: 'processForCopiedObject',
    value: function processForCopiedObject(shapeObj, originalShapeObj) {
      this._bindEventOnShape(shapeObj);

      if ((0, _util.getFillTypeFromObject)(shapeObj) === 'filter') {
        var fillImage = (0, _shapeFilterFillHelper.getFillImageFromShape)(originalShapeObj);
        var filterOption = (0, _shapeFilterFillHelper.makeFilterOptionFromFabricImage)(fillImage);
        var newStaticCanvas = this.graphics.createStaticCanvas();

        shapeObj.set((0, _shapeFilterFillHelper.makeFillPatternForFilter)(this.graphics.canvasImage, filterOption, newStaticCanvas));
        this._resetPositionFillFilter(shapeObj);
      }
    }

    /**
     * Create the instance of shape
     * @param {string} type - Shape type
     * @param {Object} options - Options to creat the shape
     * @returns {fabric.Object} Shape instance
     * @private
     */

  }, {
    key: '_createInstance',
    value: function _createInstance(type, options) {
      var instance = void 0;

      switch (type) {
        case 'rect':
          instance = new _fabric2.default.Rect(options);
          break;
        case 'circle':
          instance = new _fabric2.default.Ellipse((0, _tuiCodeSnippet.extend)({
            type: 'circle'
          }, options));
          break;
        case 'triangle':
          instance = new _fabric2.default.Triangle(options);
          break;
        default:
          instance = {};
      }

      return instance;
    }

    /**
     * Get the options to create the shape
     * @param {Object} options - Options to creat the shape
     * @returns {Object} Shape options
     * @private
     */

  }, {
    key: '_extendOptions',
    value: function _extendOptions(options) {
      var selectionStyles = _consts.fObjectOptions.SELECTION_STYLE;
      var _graphics2 = this.graphics,
          canvasImage = _graphics2.canvasImage,
          createStaticCanvas = _graphics2.createStaticCanvas;


      options = (0, _tuiCodeSnippet.extend)({}, SHAPE_INIT_OPTIONS, this._options, selectionStyles, options);

      return makeFabricFillOption(options, canvasImage, createStaticCanvas);
    }

    /**
     * Bind fabric events on the creating shape object
     * @param {fabric.Object} shapeObj - Shape object
     * @private
     */

  }, {
    key: '_bindEventOnShape',
    value: function _bindEventOnShape(shapeObj) {
      var self = this;
      var canvas = this.getCanvas();

      shapeObj.on({
        added: function added() {
          self._shapeObj = this;
          _shapeResizeHelper2.default.setOrigins(self._shapeObj);
        },
        selected: function selected() {
          self._isSelected = true;
          self._shapeObj = this;
          canvas.uniformScaling = true;
          canvas.defaultCursor = 'default';
          _shapeResizeHelper2.default.setOrigins(self._shapeObj);
        },
        deselected: function deselected() {
          self._isSelected = false;
          self._shapeObj = null;
          canvas.defaultCursor = 'crosshair';
          canvas.uniformScaling = false;
        },
        modified: function modified() {
          var currentObj = self._shapeObj;

          _shapeResizeHelper2.default.adjustOriginToCenter(currentObj);
          _shapeResizeHelper2.default.setOrigins(currentObj);
        },
        modifiedInGroup: function modifiedInGroup(activeSelection) {
          self._fillFilterRePositionInGroupSelection(shapeObj, activeSelection);
        },
        moving: function moving() {
          self._resetPositionFillFilter(this);
        },
        rotating: function rotating() {
          self._resetPositionFillFilter(this);
        },
        scaling: function scaling(fEvent) {
          var pointer = canvas.getPointer(fEvent.e);
          var currentObj = self._shapeObj;

          canvas.setCursor('crosshair');
          _shapeResizeHelper2.default.resize(currentObj, pointer, true);

          self._resetPositionFillFilter(this);
        }
      });
    }

    /**
     * MouseDown event handler on canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object
     * @private
     */

  }, {
    key: '_onFabricMouseDown',
    value: function _onFabricMouseDown(fEvent) {
      if (!fEvent.target) {
        this._isSelected = false;
        this._shapeObj = false;
      }

      if (!this._isSelected && !this._shapeObj) {
        var canvas = this.getCanvas();
        this._startPoint = canvas.getPointer(fEvent.e);

        canvas.on({
          'mouse:move': this._handlers.mousemove,
          'mouse:up': this._handlers.mouseup
        });
      }
    }

    /**
     * MouseDown event handler on canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object
     * @private
     */

  }, {
    key: '_onFabricMouseMove',
    value: function _onFabricMouseMove(fEvent) {
      var _this4 = this;

      var canvas = this.getCanvas();
      var pointer = canvas.getPointer(fEvent.e);
      var startPointX = this._startPoint.x;
      var startPointY = this._startPoint.y;
      var width = startPointX - pointer.x;
      var height = startPointY - pointer.y;
      var shape = this._shapeObj;

      if (!shape) {
        this.add(this._type, {
          left: startPointX,
          top: startPointY,
          width: width,
          height: height
        }).then(function (objectProps) {
          _this4.fire(_consts.eventNames.ADD_OBJECT, objectProps);
        });
      } else {
        this._shapeObj.set({
          isRegular: this._withShiftKey
        });

        _shapeResizeHelper2.default.resize(shape, pointer);
        canvas.renderAll();

        this._resetPositionFillFilter(shape);
      }
    }

    /**
     * MouseUp event handler on canvas
     * @private
     */

  }, {
    key: '_onFabricMouseUp',
    value: function _onFabricMouseUp() {
      var _this5 = this;

      var canvas = this.getCanvas();
      var startPointX = this._startPoint.x;
      var startPointY = this._startPoint.y;
      var shape = this._shapeObj;

      if (!shape) {
        this.add(this._type, {
          left: startPointX,
          top: startPointY,
          width: DEFAULT_WIDTH,
          height: DEFAULT_HEIGHT
        }).then(function (objectProps) {
          _this5.fire(_consts.eventNames.ADD_OBJECT, objectProps);
        });
      } else if (shape) {
        _shapeResizeHelper2.default.adjustOriginToCenter(shape);
        this.fire(_consts.eventNames.OBJECT_ADDED, this.graphics.createObjectProperties(shape));
      }

      canvas.off({
        'mouse:move': this._handlers.mousemove,
        'mouse:up': this._handlers.mouseup
      });
    }

    /**
     * Keydown event handler on document
     * @param {KeyboardEvent} e - Event object
     * @private
     */

  }, {
    key: '_onKeyDown',
    value: function _onKeyDown(e) {
      if (e.keyCode === _consts.keyCodes.SHIFT) {
        this._withShiftKey = true;

        if (this._shapeObj) {
          this._shapeObj.isRegular = true;
        }
      }
    }

    /**
     * Keyup event handler on document
     * @param {KeyboardEvent} e - Event object
     * @private
     */

  }, {
    key: '_onKeyUp',
    value: function _onKeyUp(e) {
      if (e.keyCode === _consts.keyCodes.SHIFT) {
        this._withShiftKey = false;

        if (this._shapeObj) {
          this._shapeObj.isRegular = false;
        }
      }
    }

    /**
     * Reset shape position and internal proportions in the filter type fill area.
     * @param {fabric.Object} shapeObj - Shape object
     * @private
     */

  }, {
    key: '_resetPositionFillFilter',
    value: function _resetPositionFillFilter(shapeObj) {
      if ((0, _util.getFillTypeFromObject)(shapeObj) !== 'filter') {
        return;
      }

      var _getCustomProperty = (0, _util.getCustomProperty)(shapeObj, 'patternSourceCanvas'),
          patternSourceCanvas = _getCustomProperty.patternSourceCanvas;

      var fillImage = (0, _shapeFilterFillHelper.getFillImageFromShape)(shapeObj);

      var _getCustomProperty2 = (0, _util.getCustomProperty)(fillImage, 'originalAngle'),
          originalAngle = _getCustomProperty2.originalAngle;

      if (this.graphics.canvasImage.angle !== originalAngle) {
        (0, _shapeFilterFillHelper.reMakePatternImageSource)(shapeObj, this.graphics.canvasImage);
      }
      var originX = shapeObj.originX,
          originY = shapeObj.originY;


      _shapeResizeHelper2.default.adjustOriginToCenter(shapeObj);

      shapeObj.width *= shapeObj.scaleX;
      shapeObj.height *= shapeObj.scaleY;
      shapeObj.rx *= shapeObj.scaleX;
      shapeObj.ry *= shapeObj.scaleY;
      shapeObj.scaleX = 1;
      shapeObj.scaleY = 1;

      (0, _shapeFilterFillHelper.rePositionFilterTypeFillImage)(shapeObj);

      (0, _util.changeOrigin)(shapeObj, {
        originX: originX,
        originY: originY
      });

      (0, _shapeFilterFillHelper.resetFillPatternCanvas)(patternSourceCanvas);
    }

    /**
     * Reset filter area position within group selection.
     * @param {fabric.Object} shapeObj - Shape object
     * @param {fabric.ActiveSelection} activeSelection - Shape object
     * @private
     */

  }, {
    key: '_fillFilterRePositionInGroupSelection',
    value: function _fillFilterRePositionInGroupSelection(shapeObj, activeSelection) {
      if (activeSelection.scaleX !== 1 || activeSelection.scaleY !== 1) {
        // This is necessary because the group's scale transition state affects the relative size of the fill area.
        // The only way to reset the object transformation scale state to neutral.
        // {@link https://github.com/fabricjs/fabric.js/issues/5372}
        activeSelection.addWithUpdate();
      }

      var angle = shapeObj.angle,
          left = shapeObj.left,
          top = shapeObj.top;


      _fabric2.default.util.addTransformToObject(shapeObj, activeSelection.calcTransformMatrix());
      this._resetPositionFillFilter(shapeObj);

      shapeObj.set({
        angle: angle,
        left: left,
        top: top
      });
    }
  }]);

  return Shape;
}(_component2.default);

exports.default = Shape;

/***/ }),

/***/ "./src/js/component/text.js":
/*!**********************************!*\
  !*** ./src/js/component/text.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

var _component = __webpack_require__(/*! @/interface/component */ "./src/js/interface/component.js");

var _component2 = _interopRequireDefault(_component);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview Text module
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var defaultStyles = {
  fill: '#000000',
  left: 0,
  top: 0
};
var resetStyles = {
  fill: '#000000',
  fontStyle: 'normal',
  fontWeight: 'normal',
  textAlign: 'tie-text-align-left',
  underline: false
};
var DBCLICK_TIME = 500;

/**
 * Text
 * @class Text
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */

var Text = function (_Component) {
  _inherits(Text, _Component);

  function Text(graphics) {
    _classCallCheck(this, Text);

    /**
     * Default text style
     * @type {Object}
     */
    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, _consts.componentNames.TEXT, graphics));

    _this._defaultStyles = defaultStyles;

    /**
     * Selected state
     * @type {boolean}
     */
    _this._isSelected = false;

    /**
     * Selected text object
     * @type {Object}
     */
    _this._selectedObj = {};

    /**
     * Editing text object
     * @type {Object}
     */
    _this._editingObj = {};

    /**
     * Listeners for fabric event
     * @type {Object}
     */
    _this._listeners = {
      mousedown: _this._onFabricMouseDown.bind(_this),
      select: _this._onFabricSelect.bind(_this),
      selectClear: _this._onFabricSelectClear.bind(_this),
      scaling: _this._onFabricScaling.bind(_this),
      textChanged: _this._onFabricTextChanged.bind(_this)
    };

    /**
     * Textarea element for editing
     * @type {HTMLElement}
     */
    _this._textarea = null;

    /**
     * Ratio of current canvas
     * @type {number}
     */
    _this._ratio = 1;

    /**
     * Last click time
     * @type {Date}
     */
    _this._lastClickTime = new Date().getTime();

    /**
     * Text object infos before editing
     * @type {Object}
     */
    _this._editingObjInfos = {};

    /**
     * Previous state of editing
     * @type {boolean}
     */
    _this.isPrevEditing = false;
    return _this;
  }

  /**
   * Start input text mode
   */


  _createClass(Text, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      var canvas = this.getCanvas();

      canvas.selection = false;
      canvas.defaultCursor = 'text';
      canvas.on({
        'mouse:down': this._listeners.mousedown,
        'selection:created': this._listeners.select,
        'selection:updated': this._listeners.select,
        'before:selection:cleared': this._listeners.selectClear,
        'object:scaling': this._listeners.scaling,
        'text:changed': this._listeners.textChanged
      });

      canvas.forEachObject(function (obj) {
        if (obj.type === 'i-text') {
          _this2.adjustOriginPosition(obj, 'start');
        }
      });

      this.setCanvasRatio();
    }

    /**
     * End input text mode
     */

  }, {
    key: 'end',
    value: function end() {
      var _this3 = this;

      var canvas = this.getCanvas();

      canvas.selection = true;
      canvas.defaultCursor = 'default';

      canvas.forEachObject(function (obj) {
        if (obj.type === 'i-text') {
          if (obj.text === '') {
            canvas.remove(obj);
          } else {
            _this3.adjustOriginPosition(obj, 'end');
          }
        }
      });

      canvas.off({
        'mouse:down': this._listeners.mousedown,
        'selection:created': this._listeners.select,
        'selection:updated': this._listeners.select,
        'before:selection:cleared': this._listeners.selectClear,
        'object:selected': this._listeners.select,
        'object:scaling': this._listeners.scaling,
        'text:changed': this._listeners.textChanged
      });
    }

    /**
     * Adjust the origin position
     * @param {fabric.Object} text - text object
     * @param {string} editStatus - 'start' or 'end'
     */

  }, {
    key: 'adjustOriginPosition',
    value: function adjustOriginPosition(text, editStatus) {
      var originX = 'center',
          originY = 'center';

      if (editStatus === 'start') {
        originX = 'left';
        originY = 'top';
      }

      var _text$getPointByOrigi = text.getPointByOrigin(originX, originY),
          left = _text$getPointByOrigi.x,
          top = _text$getPointByOrigi.y;

      text.set({
        left: left,
        top: top,
        originX: originX,
        originY: originY
      });
      text.setCoords();
    }

    /**
     * Add new text on canvas image
     * @param {string} text - Initial input text
     * @param {Object} options - Options for generating text
     *     @param {Object} [options.styles] Initial styles
     *         @param {string} [options.styles.fill] Color
     *         @param {string} [options.styles.fontFamily] Font type for text
     *         @param {number} [options.styles.fontSize] Size
     *         @param {string} [options.styles.fontStyle] Type of inclination (normal / italic)
     *         @param {string} [options.styles.fontWeight] Type of thicker or thinner looking (normal / bold)
     *         @param {string} [options.styles.textAlign] Type of text align (left / center / right)
     *         @param {string} [options.styles.textDecoration] Type of line (underline / line-through / overline)
     *     @param {{x: number, y: number}} [options.position] - Initial position
     * @returns {Promise}
     */

  }, {
    key: 'add',
    value: function add(text, options) {
      var _this4 = this;

      return new _util.Promise(function (resolve) {
        var canvas = _this4.getCanvas();
        var newText = null;
        var selectionStyle = _consts.fObjectOptions.SELECTION_STYLE;
        var styles = _this4._defaultStyles;

        _this4._setInitPos(options.position);

        if (options.styles) {
          styles = _tuiCodeSnippet2.default.extend(styles, options.styles);
        }

        if (!_tuiCodeSnippet2.default.isExisty(options.autofocus)) {
          options.autofocus = true;
        }

        newText = new _fabric2.default.IText(text, styles);
        selectionStyle = _tuiCodeSnippet2.default.extend({}, selectionStyle, {
          originX: 'left',
          originY: 'top'
        });

        newText.set(selectionStyle);
        newText.on({
          mouseup: _this4._onFabricMouseUp.bind(_this4)
        });

        canvas.add(newText);

        if (options.autofocus) {
          newText.enterEditing();
          newText.selectAll();
        }

        if (!canvas.getActiveObject()) {
          canvas.setActiveObject(newText);
        }

        _this4.isPrevEditing = true;
        resolve(_this4.graphics.createObjectProperties(newText));
      });
    }

    /**
     * Change text of activate object on canvas image
     * @param {Object} activeObj - Current selected text object
     * @param {string} text - Changed text
     * @returns {Promise}
     */

  }, {
    key: 'change',
    value: function change(activeObj, text) {
      var _this5 = this;

      return new _util.Promise(function (resolve) {
        activeObj.set('text', text);

        _this5.getCanvas().renderAll();
        resolve();
      });
    }

    /**
     * Set style
     * @param {Object} activeObj - Current selected text object
     * @param {Object} styleObj - Initial styles
     *     @param {string} [styleObj.fill] Color
     *     @param {string} [styleObj.fontFamily] Font type for text
     *     @param {number} [styleObj.fontSize] Size
     *     @param {string} [styleObj.fontStyle] Type of inclination (normal / italic)
     *     @param {string} [styleObj.fontWeight] Type of thicker or thinner looking (normal / bold)
     *     @param {string} [styleObj.textAlign] Type of text align (left / center / right)
     *     @param {string} [styleObj.textDecoration] Type of line (underline / line-through / overline)
     * @returns {Promise}
     */

  }, {
    key: 'setStyle',
    value: function setStyle(activeObj, styleObj) {
      var _this6 = this;

      return new _util.Promise(function (resolve) {
        _tuiCodeSnippet2.default.forEach(styleObj, function (val, key) {
          if (activeObj[key] === val && key !== 'fontSize') {
            styleObj[key] = resetStyles[key] || '';
          }
        }, _this6);

        if ('textDecoration' in styleObj) {
          _tuiCodeSnippet2.default.extend(styleObj, _this6._getTextDecorationAdaptObject(styleObj.textDecoration));
        }

        activeObj.set(styleObj);

        _this6.getCanvas().renderAll();
        resolve();
      });
    }

    /**
     * Get the text
     * @param {Object} activeObj - Current selected text object
     * @returns {String} text
     */

  }, {
    key: 'getText',
    value: function getText(activeObj) {
      return activeObj.text;
    }

    /**
     * Set infos of the current selected object
     * @param {fabric.Text} obj - Current selected text object
     * @param {boolean} state - State of selecting
     */

  }, {
    key: 'setSelectedInfo',
    value: function setSelectedInfo(obj, state) {
      this._selectedObj = obj;
      this._isSelected = state;
    }

    /**
     * Whether object is selected or not
     * @returns {boolean} State of selecting
     */

  }, {
    key: 'isSelected',
    value: function isSelected() {
      return this._isSelected;
    }

    /**
     * Get current selected text object
     * @returns {fabric.Text} Current selected text object
     */

  }, {
    key: 'getSelectedObj',
    value: function getSelectedObj() {
      return this._selectedObj;
    }

    /**
     * Set ratio value of canvas
     */

  }, {
    key: 'setCanvasRatio',
    value: function setCanvasRatio() {
      var canvasElement = this.getCanvasElement();
      var cssWidth = parseInt(canvasElement.style.maxWidth, 10);
      var originWidth = canvasElement.width;

      this._ratio = originWidth / cssWidth;
    }

    /**
     * Get ratio value of canvas
     * @returns {number} Ratio value
     */

  }, {
    key: 'getCanvasRatio',
    value: function getCanvasRatio() {
      return this._ratio;
    }

    /**
     * Get text decoration adapt object
     * @param {string} textDecoration - text decoration option string
     * @returns {object} adapt object for override
     */

  }, {
    key: '_getTextDecorationAdaptObject',
    value: function _getTextDecorationAdaptObject(textDecoration) {
      return {
        underline: textDecoration === 'underline',
        linethrough: textDecoration === 'line-through',
        overline: textDecoration === 'overline'
      };
    }

    /**
     * Set initial position on canvas image
     * @param {{x: number, y: number}} [position] - Selected position
     * @private
     */

  }, {
    key: '_setInitPos',
    value: function _setInitPos(position) {
      position = position || this.getCanvasImage().getCenterPoint();

      this._defaultStyles.left = position.x;
      this._defaultStyles.top = position.y;
    }

    /**
     * Input event handler
     * @private
     */

  }, {
    key: '_onInput',
    value: function _onInput() {
      var ratio = this.getCanvasRatio();
      var obj = this._editingObj;
      var textareaStyle = this._textarea.style;

      textareaStyle.width = Math.ceil(obj.width / ratio) + 'px';
      textareaStyle.height = Math.ceil(obj.height / ratio) + 'px';
    }

    /**
     * Keydown event handler
     * @private
     */

  }, {
    key: '_onKeyDown',
    value: function _onKeyDown() {
      var _this7 = this;

      var ratio = this.getCanvasRatio();
      var obj = this._editingObj;
      var textareaStyle = this._textarea.style;

      setTimeout(function () {
        obj.text(_this7._textarea.value);

        textareaStyle.width = Math.ceil(obj.width / ratio) + 'px';
        textareaStyle.height = Math.ceil(obj.height / ratio) + 'px';
      }, 0);
    }

    /**
     * Blur event handler
     * @private
     */

  }, {
    key: '_onBlur',
    value: function _onBlur() {
      var ratio = this.getCanvasRatio();
      var editingObj = this._editingObj;
      var editingObjInfos = this._editingObjInfos;
      var textContent = this._textarea.value;
      var transWidth = editingObj.width / ratio - editingObjInfos.width / ratio;
      var transHeight = editingObj.height / ratio - editingObjInfos.height / ratio;

      if (ratio === 1) {
        transWidth /= 2;
        transHeight /= 2;
      }

      this._textarea.style.display = 'none';

      editingObj.set({
        left: editingObjInfos.left + transWidth,
        top: editingObjInfos.top + transHeight
      });

      if (textContent.length) {
        this.getCanvas().add(editingObj);

        var params = {
          id: _tuiCodeSnippet2.default.stamp(editingObj),
          type: editingObj.type,
          text: textContent
        };

        this.fire(_consts.eventNames.TEXT_CHANGED, params);
      }
    }

    /**
     * Scroll event handler
     * @private
     */

  }, {
    key: '_onScroll',
    value: function _onScroll() {
      this._textarea.scrollLeft = 0;
      this._textarea.scrollTop = 0;
    }

    /**
     * Fabric scaling event handler
     * @param {fabric.Event} fEvent - Current scaling event on selected object
     * @private
     */

  }, {
    key: '_onFabricScaling',
    value: function _onFabricScaling(fEvent) {
      var obj = fEvent.target;

      obj.fontSize = obj.fontSize * obj.scaleY;
      obj.scaleX = 1;
      obj.scaleY = 1;
    }

    /**
     * textChanged event handler
     * @param {{target: fabric.Object}} props - changed text object
     * @private
     */

  }, {
    key: '_onFabricTextChanged',
    value: function _onFabricTextChanged(props) {
      this.fire(_consts.eventNames.TEXT_CHANGED, props.target);
    }

    /**
     * onSelectClear handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onFabricSelectClear',
    value: function _onFabricSelectClear(fEvent) {
      var obj = this.getSelectedObj();

      this.isPrevEditing = true;

      this.setSelectedInfo(fEvent.target, false);

      if (obj) {
        // obj is empty object at initial time, will be set fabric object
        if (obj.text === '') {
          this.getCanvas().remove(obj);
        }
      }
    }

    /**
     * onSelect handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onFabricSelect',
    value: function _onFabricSelect(fEvent) {
      this.isPrevEditing = true;

      this.setSelectedInfo(fEvent.target, true);
    }

    /**
     * Fabric 'mousedown' event handler
     * @param {fabric.Event} fEvent - Current mousedown event on selected object
     * @private
     */

  }, {
    key: '_onFabricMouseDown',
    value: function _onFabricMouseDown(fEvent) {
      var obj = fEvent.target;

      if (obj && !obj.isType('text')) {
        return;
      }

      if (this.isPrevEditing) {
        this.isPrevEditing = false;

        return;
      }

      this._fireAddText(fEvent);
    }

    /**
     * Fire 'addText' event if object is not selected.
     * @param {fabric.Event} fEvent - Current mousedown event on selected object
     * @private
     */

  }, {
    key: '_fireAddText',
    value: function _fireAddText(fEvent) {
      var obj = fEvent.target;
      var e = fEvent.e || {};
      var originPointer = this.getCanvas().getPointer(e);

      if (!obj) {
        this.fire(_consts.eventNames.ADD_TEXT, {
          originPosition: {
            x: originPointer.x,
            y: originPointer.y
          },
          clientPosition: {
            x: e.clientX || 0,
            y: e.clientY || 0
          }
        });
      }
    }

    /**
     * Fabric mouseup event handler
     * @param {fabric.Event} fEvent - Current mousedown event on selected object
     * @private
     */

  }, {
    key: '_onFabricMouseUp',
    value: function _onFabricMouseUp(fEvent) {
      var target = fEvent.target;

      var newClickTime = new Date().getTime();

      if (this._isDoubleClick(newClickTime) && !target.isEditing) {
        target.enterEditing();
      }

      if (target.isEditing) {
        this.fire(_consts.eventNames.TEXT_EDITING); // fire editing text event
      }

      this._lastClickTime = newClickTime;
    }

    /**
     * Get state of firing double click event
     * @param {Date} newClickTime - Current clicked time
     * @returns {boolean} Whether double clicked or not
     * @private
     */

  }, {
    key: '_isDoubleClick',
    value: function _isDoubleClick(newClickTime) {
      return newClickTime - this._lastClickTime < DBCLICK_TIME;
    }
  }]);

  return Text;
}(_component2.default);

exports.default = Text;

/***/ }),

/***/ "./src/js/component/zoom.js":
/*!**********************************!*\
  !*** ./src/js/component/zoom.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

var _component = __webpack_require__(/*! @/interface/component */ "./src/js/interface/component.js");

var _component2 = _interopRequireDefault(_component);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview Image zoom module (start zoom, end zoom)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var MOUSE_MOVE_THRESHOLD = 10;
var DEFAULT_SCROLL_OPTION = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  stroke: '#000000',
  strokeWidth: 0,
  fill: '#000000',
  opacity: 0.4,
  evented: false,
  selectable: false,
  hoverCursor: 'auto'
};
var DEFAULT_VERTICAL_SCROLL_RATIO = {
  SIZE: 0.0045,
  MARGIN: 0.003,
  BORDER_RADIUS: 0.003
};
var DEFAULT_HORIZONTAL_SCROLL_RATIO = {
  SIZE: 0.0066,
  MARGIN: 0.0044,
  BORDER_RADIUS: 0.003
};
var DEFAULT_ZOOM_LEVEL = 1.0;
var ZOOM_CHANGED = _consts.eventNames.ZOOM_CHANGED,
    ADD_TEXT = _consts.eventNames.ADD_TEXT,
    TEXT_EDITING = _consts.eventNames.TEXT_EDITING,
    OBJECT_MODIFIED = _consts.eventNames.OBJECT_MODIFIED,
    KEY_DOWN = _consts.eventNames.KEY_DOWN,
    KEY_UP = _consts.eventNames.KEY_UP,
    HAND_STARTED = _consts.eventNames.HAND_STARTED,
    HAND_STOPPED = _consts.eventNames.HAND_STOPPED;

/**
 * Zoom components
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @class Zoom
 * @ignore
 */

var Zoom = function (_Component) {
  _inherits(Zoom, _Component);

  function Zoom(graphics) {
    _classCallCheck(this, Zoom);

    /**
     * zoomArea
     * @type {?fabric.Rect}
     * @private
     */
    var _this = _possibleConstructorReturn(this, (Zoom.__proto__ || Object.getPrototypeOf(Zoom)).call(this, _consts.componentNames.ZOOM, graphics));

    _this.zoomArea = null;

    /**
     * Start point of zoom area
     * @type {?{x: number, y: number}}
     */
    _this._startPoint = null;

    /**
     * Center point of every zoom
     * @type {Array.<{prevZoomLevel: number, zoomLevel: number, x: number, y: number}>}
     */
    _this._centerPoints = [];

    /**
     * Zoom level (default: 100%(1.0), max: 400%(4.0))
     * @type {number}
     */
    _this.zoomLevel = DEFAULT_ZOOM_LEVEL;

    /**
     * Zoom mode ('normal', 'zoom', 'hand')
     * @type {string}
     */
    _this.zoomMode = _consts.zoomModes.DEFAULT;

    /**
     * Listeners
     * @type {Object.<string, Function>}
     * @private
     */
    _this._listeners = {
      startZoom: _this._onMouseDownWithZoomMode.bind(_this),
      moveZoom: _this._onMouseMoveWithZoomMode.bind(_this),
      stopZoom: _this._onMouseUpWithZoomMode.bind(_this),
      startHand: _this._onMouseDownWithHandMode.bind(_this),
      moveHand: _this._onMouseMoveWithHandMode.bind(_this),
      stopHand: _this._onMouseUpWithHandMode.bind(_this),
      zoomChanged: _this._changeScrollState.bind(_this),
      keydown: _this._startHandModeWithSpaceBar.bind(_this),
      keyup: _this._endHandModeWithSpaceBar.bind(_this)
    };

    var canvas = _this.getCanvas();

    /**
     * Width:Height ratio (ex. width=1.5, height=1 -> aspectRatio=1.5)
     * @private
     */
    _this.aspectRatio = canvas.width / canvas.height;

    /**
     * vertical scroll bar
     * @type {fabric.Rect}
     * @private
     */
    _this._verticalScroll = new _fabric2.default.Rect(DEFAULT_SCROLL_OPTION);

    /**
     * horizontal scroll bar
     * @type {fabric.Rect}
     * @private
     */
    _this._horizontalScroll = new _fabric2.default.Rect(DEFAULT_SCROLL_OPTION);

    canvas.on(ZOOM_CHANGED, _this._listeners.zoomChanged);

    _this.graphics.on(ADD_TEXT, _this._startTextEditingHandler.bind(_this));
    _this.graphics.on(TEXT_EDITING, _this._startTextEditingHandler.bind(_this));
    _this.graphics.on(OBJECT_MODIFIED, _this._stopTextEditingHandler.bind(_this));
    return _this;
  }

  /**
   * Attach zoom keyboard events
   */


  _createClass(Zoom, [{
    key: 'attachKeyboardZoomEvents',
    value: function attachKeyboardZoomEvents() {
      _fabric2.default.util.addListener(document, KEY_DOWN, this._listeners.keydown);
      _fabric2.default.util.addListener(document, KEY_UP, this._listeners.keyup);
    }

    /**
     * Detach zoom keyboard events
     */

  }, {
    key: 'detachKeyboardZoomEvents',
    value: function detachKeyboardZoomEvents() {
      _fabric2.default.util.removeListener(document, KEY_DOWN, this._listeners.keydown);
      _fabric2.default.util.removeListener(document, KEY_UP, this._listeners.keyup);
    }

    /**
     * Handler when you started editing text
     * @private
     */

  }, {
    key: '_startTextEditingHandler',
    value: function _startTextEditingHandler() {
      this.isTextEditing = true;
    }

    /**
     * Handler when you stopped editing text
     * @private
     */

  }, {
    key: '_stopTextEditingHandler',
    value: function _stopTextEditingHandler() {
      this.isTextEditing = false;
    }

    /**
     * Handler who turns on hand mode when the space bar is down
     * @param {KeyboardEvent} e - Event object
     * @private
     */

  }, {
    key: '_startHandModeWithSpaceBar',
    value: function _startHandModeWithSpaceBar(e) {
      if (this.withSpace || this.isTextEditing) {
        return;
      }

      if (e.keyCode === _consts.keyCodes.SPACE) {
        this.withSpace = true;
        this.startHandMode();
      }
    }

    /**
     * Handler who turns off hand mode when space bar is up
     * @param {KeyboardEvent} e - Event object
     * @private
     */

  }, {
    key: '_endHandModeWithSpaceBar',
    value: function _endHandModeWithSpaceBar(e) {
      if (e.keyCode === _consts.keyCodes.SPACE) {
        this.withSpace = false;
        this.endHandMode();
      }
    }

    /**
     * Start zoom-in mode
     */

  }, {
    key: 'startZoomInMode',
    value: function startZoomInMode() {
      if (this.zoomArea) {
        return;
      }
      this.endHandMode();
      this.zoomMode = _consts.zoomModes.ZOOM;

      var canvas = this.getCanvas();

      this._changeObjectsEventedState(false);

      this.zoomArea = new _fabric2.default.Rect({
        left: 0,
        top: 0,
        width: 0.5,
        height: 0.5,
        stroke: 'black',
        strokeWidth: 1,
        fill: 'transparent',
        hoverCursor: 'zoom-in'
      });

      canvas.discardActiveObject();
      canvas.add(this.zoomArea);
      canvas.on('mouse:down', this._listeners.startZoom);
      canvas.selection = false;
      canvas.defaultCursor = 'zoom-in';
    }

    /**
     * End zoom-in mode
     */

  }, {
    key: 'endZoomInMode',
    value: function endZoomInMode() {
      this.zoomMode = _consts.zoomModes.DEFAULT;

      var canvas = this.getCanvas();
      var _listeners = this._listeners,
          startZoom = _listeners.startZoom,
          moveZoom = _listeners.moveZoom,
          stopZoom = _listeners.stopZoom;


      canvas.selection = true;
      canvas.defaultCursor = 'auto';
      canvas.off({
        'mouse:down': startZoom,
        'mouse:move': moveZoom,
        'mouse:up': stopZoom
      });

      this._changeObjectsEventedState(true);

      canvas.remove(this.zoomArea);
      this.zoomArea = null;
    }

    /**
     * Start zoom drawing mode
     */

  }, {
    key: 'start',
    value: function start() {
      this.zoomArea = null;
      this._startPoint = null;
      this._startHandPoint = null;
    }

    /**
     * Stop zoom drawing mode
     */

  }, {
    key: 'end',
    value: function end() {
      this.endZoomInMode();
      this.endHandMode();
    }

    /**
     * Start hand mode
     */

  }, {
    key: 'startHandMode',
    value: function startHandMode() {
      this.endZoomInMode();
      this.zoomMode = _consts.zoomModes.HAND;

      var canvas = this.getCanvas();

      this._changeObjectsEventedState(false);

      canvas.discardActiveObject();
      canvas.off('mouse:down', this._listeners.startHand);
      canvas.on('mouse:down', this._listeners.startHand);
      canvas.selection = false;
      canvas.defaultCursor = 'grab';

      canvas.fire(HAND_STARTED);
    }

    /**
     * Stop hand mode
     */

  }, {
    key: 'endHandMode',
    value: function endHandMode() {
      this.zoomMode = _consts.zoomModes.DEFAULT;
      var canvas = this.getCanvas();

      this._changeObjectsEventedState(true);

      canvas.off('mouse:down', this._listeners.startHand);
      canvas.selection = true;
      canvas.defaultCursor = 'auto';

      this._startHandPoint = null;

      canvas.fire(HAND_STOPPED);
    }

    /**
     * onMousedown handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onMouseDownWithZoomMode',
    value: function _onMouseDownWithZoomMode(_ref) {
      var target = _ref.target,
          e = _ref.e;

      if (target) {
        return;
      }

      var canvas = this.getCanvas();

      canvas.selection = false;

      this._startPoint = canvas.getPointer(e);
      this.zoomArea.set({ width: 0, height: 0 });

      var _listeners2 = this._listeners,
          moveZoom = _listeners2.moveZoom,
          stopZoom = _listeners2.stopZoom;

      canvas.on({
        'mouse:move': moveZoom,
        'mouse:up': stopZoom
      });
    }

    /**
     * onMousemove handler in fabric canvas
     * @param {{e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onMouseMoveWithZoomMode',
    value: function _onMouseMoveWithZoomMode(_ref2) {
      var e = _ref2.e;

      var canvas = this.getCanvas();
      var pointer = canvas.getPointer(e);
      var x = pointer.x,
          y = pointer.y;
      var zoomArea = this.zoomArea,
          _startPoint = this._startPoint;

      var deltaX = Math.abs(x - _startPoint.x);
      var deltaY = Math.abs(y - _startPoint.y);

      if (deltaX + deltaY > MOUSE_MOVE_THRESHOLD) {
        canvas.remove(zoomArea);
        zoomArea.set(this._calcRectDimensionFromPoint(x, y));
        canvas.add(zoomArea);
      }
    }

    /**
     * Get rect dimension setting from Canvas-Mouse-Position(x, y)
     * @param {number} x - Canvas-Mouse-Position x
     * @param {number} y - Canvas-Mouse-Position Y
     * @returns {{left: number, top: number, width: number, height: number}}
     * @private
     */

  }, {
    key: '_calcRectDimensionFromPoint',
    value: function _calcRectDimensionFromPoint(x, y) {
      var canvas = this.getCanvas();
      var canvasWidth = canvas.getWidth();
      var canvasHeight = canvas.getHeight();
      var _startPoint2 = this._startPoint,
          startX = _startPoint2.x,
          startY = _startPoint2.y;
      var min = Math.min;


      var left = min(startX, x);
      var top = min(startY, y);
      var width = (0, _util.clamp)(x, startX, canvasWidth) - left; // (startX <= x(mouse) <= canvasWidth) - left
      var height = (0, _util.clamp)(y, startY, canvasHeight) - top; // (startY <= y(mouse) <= canvasHeight) - top

      return { left: left, top: top, width: width, height: height };
    }

    /**
     * onMouseup handler in fabric canvas
     * @private
     */

  }, {
    key: '_onMouseUpWithZoomMode',
    value: function _onMouseUpWithZoomMode() {
      var zoomLevel = this.zoomLevel;
      var zoomArea = this.zoomArea;
      var _listeners3 = this._listeners,
          moveZoom = _listeners3.moveZoom,
          stopZoom = _listeners3.stopZoom;

      var canvas = this.getCanvas();
      var center = this._getCenterPoint();
      var x = center.x,
          y = center.y;


      if (!this._isMaxZoomLevel()) {
        this._centerPoints.push({
          x: x,
          y: y,
          prevZoomLevel: zoomLevel,
          zoomLevel: zoomLevel + 1
        });
        zoomLevel += 1;
        canvas.zoomToPoint({ x: x, y: y }, zoomLevel);

        this._fireZoomChanged(canvas, zoomLevel);

        this.zoomLevel = zoomLevel;
      }

      canvas.off({
        'mouse:move': moveZoom,
        'mouse:up': stopZoom
      });

      canvas.remove(zoomArea);
      this._startPoint = null;
    }

    /**
     * Get center point
     * @returns {{x: number, y: number}}
     * @private
     */

  }, {
    key: '_getCenterPoint',
    value: function _getCenterPoint() {
      var _zoomArea = this.zoomArea,
          left = _zoomArea.left,
          top = _zoomArea.top,
          width = _zoomArea.width,
          height = _zoomArea.height;
      var _startPoint3 = this._startPoint,
          x = _startPoint3.x,
          y = _startPoint3.y;
      var aspectRatio = this.aspectRatio;


      if (width < MOUSE_MOVE_THRESHOLD && height < MOUSE_MOVE_THRESHOLD) {
        return { x: x, y: y };
      }

      return width > height ? { x: left + aspectRatio * height / 2, y: top + height / 2 } : { x: left + width / 2, y: top + width / aspectRatio / 2 };
    }

    /**
     * Zoom the canvas
     * @param {{x: number, y: number}} center - center of zoom
     * @param {?number} zoomLevel - zoom level
     */

  }, {
    key: 'zoom',
    value: function zoom(_ref3) {
      var x = _ref3.x,
          y = _ref3.y;
      var zoomLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.zoomLevel;

      var canvas = this.getCanvas();
      var centerPoints = this._centerPoints;

      for (var i = centerPoints.length - 1; i >= 0; i -= 1) {
        if (centerPoints[i].zoomLevel < zoomLevel) {
          break;
        }

        var _centerPoints$pop = centerPoints.pop(),
            prevX = _centerPoints$pop.x,
            prevY = _centerPoints$pop.y,
            prevZoomLevel = _centerPoints$pop.prevZoomLevel;

        canvas.zoomToPoint({ x: prevX, y: prevY }, prevZoomLevel);
        this.zoomLevel = prevZoomLevel;
      }

      canvas.zoomToPoint({ x: x, y: y }, zoomLevel);
      if (!this._isDefaultZoomLevel(zoomLevel)) {
        this._centerPoints.push({
          x: x,
          y: y,
          zoomLevel: zoomLevel,
          prevZoomLevel: this.zoomLevel
        });
      }
      this.zoomLevel = zoomLevel;

      this._fireZoomChanged(canvas, zoomLevel);
    }

    /**
     * Zoom out one step
     */

  }, {
    key: 'zoomOut',
    value: function zoomOut() {
      var centerPoints = this._centerPoints;

      if (!centerPoints.length) {
        return;
      }

      var canvas = this.getCanvas();
      var point = centerPoints.pop();
      var x = point.x,
          y = point.y,
          prevZoomLevel = point.prevZoomLevel;


      if (this._isDefaultZoomLevel(prevZoomLevel)) {
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
      } else {
        canvas.zoomToPoint({ x: x, y: y }, prevZoomLevel);
      }

      this.zoomLevel = prevZoomLevel;

      this._fireZoomChanged(canvas, this.zoomLevel);
    }

    /**
     * Zoom reset
     */

  }, {
    key: 'resetZoom',
    value: function resetZoom() {
      var canvas = this.getCanvas();

      canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);

      this.zoomLevel = DEFAULT_ZOOM_LEVEL;
      this._centerPoints = [];

      this._fireZoomChanged(canvas, this.zoomLevel);
    }

    /**
     * Whether zoom level is max (5.0)
     * @returns {boolean}
     * @private
     */

  }, {
    key: '_isMaxZoomLevel',
    value: function _isMaxZoomLevel() {
      return this.zoomLevel >= 5.0;
    }

    /**
     * Move point of zoom
     * @param {{x: number, y: number}} delta - move amount
     * @private
     */

  }, {
    key: '_movePointOfZoom',
    value: function _movePointOfZoom(_ref4) {
      var deltaX = _ref4.x,
          deltaY = _ref4.y;

      var centerPoints = this._centerPoints;

      if (!centerPoints.length) {
        return;
      }

      var canvas = this.getCanvas();
      var zoomLevel = this.zoomLevel;


      var point = centerPoints.pop();
      var originX = point.x,
          originY = point.y,
          prevZoomLevel = point.prevZoomLevel;

      var x = originX - deltaX;
      var y = originY - deltaY;

      canvas.zoomToPoint({ x: originX, y: originY }, prevZoomLevel);
      canvas.zoomToPoint({ x: x, y: y }, zoomLevel);
      centerPoints.push({ x: x, y: y, prevZoomLevel: prevZoomLevel, zoomLevel: zoomLevel });

      this._fireZoomChanged(canvas, zoomLevel);
    }

    /**
     * onMouseDown handler in fabric canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onMouseDownWithHandMode',
    value: function _onMouseDownWithHandMode(_ref5) {
      var target = _ref5.target,
          e = _ref5.e;

      if (target) {
        return;
      }

      var canvas = this.getCanvas();

      if (this.zoomLevel <= DEFAULT_ZOOM_LEVEL) {
        return;
      }

      canvas.selection = false;

      this._startHandPoint = canvas.getPointer(e);

      var _listeners4 = this._listeners,
          moveHand = _listeners4.moveHand,
          stopHand = _listeners4.stopHand;

      canvas.on({
        'mouse:move': moveHand,
        'mouse:up': stopHand
      });
    }

    /**
     * onMouseMove handler in fabric canvas
     * @param {{e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onMouseMoveWithHandMode',
    value: function _onMouseMoveWithHandMode(_ref6) {
      var e = _ref6.e;

      var canvas = this.getCanvas();

      var _canvas$getPointer = canvas.getPointer(e),
          x = _canvas$getPointer.x,
          y = _canvas$getPointer.y;

      var deltaX = x - this._startHandPoint.x;
      var deltaY = y - this._startHandPoint.y;

      this._movePointOfZoom({ x: deltaX, y: deltaY });
    }

    /**
     * onMouseUp handler in fabric canvas
     * @private
     */

  }, {
    key: '_onMouseUpWithHandMode',
    value: function _onMouseUpWithHandMode() {
      var canvas = this.getCanvas();
      var _listeners5 = this._listeners,
          moveHand = _listeners5.moveHand,
          stopHand = _listeners5.stopHand;


      canvas.off({
        'mouse:move': moveHand,
        'mouse:up': stopHand
      });

      this._startHandPoint = null;
    }

    /**
     * onChangeZoom handler in fabric canvas
     * @private
     */

  }, {
    key: '_changeScrollState',
    value: function _changeScrollState(_ref7) {
      var viewport = _ref7.viewport,
          zoomLevel = _ref7.zoomLevel;

      var canvas = this.getCanvas();

      canvas.remove(this._verticalScroll);
      canvas.remove(this._horizontalScroll);

      if (this._isDefaultZoomLevel(zoomLevel)) {
        return;
      }

      var canvasWidth = canvas.width;
      var canvasHeight = canvas.height;

      var tl = viewport.tl,
          tr = viewport.tr,
          bl = viewport.bl;

      var viewportWidth = tr.x - tl.x;
      var viewportHeight = bl.y - tl.y;

      var horizontalScrollWidth = viewportWidth * viewportWidth / canvasWidth;
      var horizontalScrollHeight = viewportHeight * DEFAULT_HORIZONTAL_SCROLL_RATIO.SIZE;
      var horizontalScrollLeft = (0, _util.clamp)(tl.x + tl.x / canvasWidth * viewportWidth, tl.x, tr.x - horizontalScrollWidth);
      var horizontalScrollMargin = viewportHeight * DEFAULT_HORIZONTAL_SCROLL_RATIO.MARGIN;
      var horizontalScrollBorderRadius = viewportHeight * DEFAULT_HORIZONTAL_SCROLL_RATIO.BORDER_RADIUS;

      this._horizontalScroll.set({
        left: horizontalScrollLeft,
        top: bl.y - horizontalScrollHeight - horizontalScrollMargin,
        width: horizontalScrollWidth,
        height: horizontalScrollHeight,
        rx: horizontalScrollBorderRadius,
        ry: horizontalScrollBorderRadius
      });

      var verticalScrollWidth = viewportWidth * DEFAULT_VERTICAL_SCROLL_RATIO.SIZE;
      var verticalScrollHeight = viewportHeight * viewportHeight / canvasHeight;
      var verticalScrollTop = (0, _util.clamp)(tl.y + tl.y / canvasHeight * viewportHeight, tr.y, bl.y - verticalScrollHeight);
      var verticalScrollMargin = viewportWidth * DEFAULT_VERTICAL_SCROLL_RATIO.MARGIN;
      var verticalScrollBorderRadius = viewportWidth * DEFAULT_VERTICAL_SCROLL_RATIO.BORDER_RADIUS;

      this._verticalScroll.set({
        left: tr.x - verticalScrollWidth - verticalScrollMargin,
        top: verticalScrollTop,
        width: verticalScrollWidth,
        height: verticalScrollHeight,
        rx: verticalScrollBorderRadius,
        ry: verticalScrollBorderRadius
      });

      this._addScrollBar();
    }

    /**
     * Change objects 'evented' state
     * @param {boolean} [evented=true] - objects 'evented' state
     */

  }, {
    key: '_changeObjectsEventedState',
    value: function _changeObjectsEventedState() {
      var evented = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var canvas = this.getCanvas();

      canvas.forEachObject(function (obj) {
        // {@link http://fabricjs.com/docs/fabric.Object.html#evented}
        obj.evented = evented;
      });
    }

    /**
     * Add scroll bar and set remove timer
     */

  }, {
    key: '_addScrollBar',
    value: function _addScrollBar() {
      var _this2 = this;

      var canvas = this.getCanvas();

      canvas.add(this._horizontalScroll);
      canvas.add(this._verticalScroll);

      if (this.scrollBarTid) {
        clearTimeout(this.scrollBarTid);
      }

      this.scrollBarTid = setTimeout(function () {
        canvas.remove(_this2._horizontalScroll);
        canvas.remove(_this2._verticalScroll);
      }, 3000);
    }

    /**
     * Check zoom level is default zoom level (1.0)
     * @param {number} zoomLevel - zoom level
     * @returns {boolean} - whether zoom level is 1.0
     */

  }, {
    key: '_isDefaultZoomLevel',
    value: function _isDefaultZoomLevel(zoomLevel) {
      return zoomLevel === DEFAULT_ZOOM_LEVEL;
    }

    /**
     * Fire 'zoomChanged' event
     * @param {fabric.Canvas} canvas - fabric canvas
     * @param {number} zoomLevel - 'zoomChanged' event params
     */

  }, {
    key: '_fireZoomChanged',
    value: function _fireZoomChanged(canvas, zoomLevel) {
      canvas.fire(ZOOM_CHANGED, { viewport: canvas.calcViewportBoundaries(), zoomLevel: zoomLevel });
    }

    /**
     * Get zoom mode
     */

  }, {
    key: 'mode',
    get: function get() {
      return this.zoomMode;
    }
  }]);

  return Zoom;
}(_component2.default);

exports.default = Zoom;

/***/ }),

/***/ "./src/js/consts.js":
/*!**************************!*\
  !*** ./src/js/consts.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultResizePixelValues = exports.emptyCropRectValues = exports.defaultFilterRangeValues = exports.defaultTextRangeValues = exports.defaultShapeStrokeValues = exports.defaultDrawRangeValues = exports.defaultRotateRangeValues = exports.defaultIconPath = exports.rejectMessages = exports.fObjectOptions = exports.keyCodes = exports.zoomModes = exports.drawingMenuNames = exports.drawingModes = exports.historyNames = exports.selectorNames = exports.eventNames = exports.commandNames = exports.CROPZONE_DEFAULT_OPTIONS = exports.SHAPE_DEFAULT_OPTIONS = exports.componentNames = exports.filterType = exports.OBJ_TYPE = exports.SHAPE_TYPE = exports.SHAPE_FILL_TYPE = exports.HELP_MENUS = exports.DELETE_HELP_MENUS = exports.COMMAND_HELP_MENUS = exports.ZOOM_HELP_MENUS = undefined;

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

/**
 * Help features for zoom
 * @type {Array.<string>}
 */
var ZOOM_HELP_MENUS = exports.ZOOM_HELP_MENUS = ['zoomIn', 'zoomOut', 'hand'];

/**
 * Help features for command
 * @type {Array.<string>}
 */
/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Constants
 */
var COMMAND_HELP_MENUS = exports.COMMAND_HELP_MENUS = ['history', 'undo', 'redo', 'reset'];

/**
 * Help features for delete
 * @type {Array.<string>}
 */
var DELETE_HELP_MENUS = exports.DELETE_HELP_MENUS = ['delete', 'deleteAll'];

/**
 * Editor help features
 * @type {Array.<string>}
 */
var HELP_MENUS = exports.HELP_MENUS = [].concat(ZOOM_HELP_MENUS, COMMAND_HELP_MENUS, DELETE_HELP_MENUS);

/**
 * Fill type for shape
 * @type {Object.<string, string>}
 */
var SHAPE_FILL_TYPE = exports.SHAPE_FILL_TYPE = {
  FILTER: 'filter',
  COLOR: 'color'
};

/**
 * Shape type list
 * @type {Array.<string>}
 */
var SHAPE_TYPE = exports.SHAPE_TYPE = ['rect', 'circle', 'triangle'];

/**
 * Object type
 * @type {Object.<string, string>}
 */
var OBJ_TYPE = exports.OBJ_TYPE = {
  CROPZONE: 'cropzone'
};

/**
 * Filter type map
 * @type {Object.<string, string>}
 */
var filterType = exports.filterType = {
  VINTAGE: 'vintage',
  SEPIA2: 'sepia2',
  REMOVE_COLOR: 'removeColor',
  COLOR_FILTER: 'colorFilter',
  REMOVE_WHITE: 'removeWhite',
  BLEND_COLOR: 'blendColor',
  BLEND: 'blend'
};

/**
 * Component names
 * @type {Object.<string, string>}
 */
var componentNames = exports.componentNames = (0, _util.keyMirror)('IMAGE_LOADER', 'CROPPER', 'FLIP', 'ROTATION', 'FREE_DRAWING', 'LINE', 'TEXT', 'ICON', 'FILTER', 'SHAPE', 'ZOOM', 'RESIZE');

/**
 * Shape default option
 * @type {Object}
 */
var SHAPE_DEFAULT_OPTIONS = exports.SHAPE_DEFAULT_OPTIONS = {
  lockSkewingX: true,
  lockSkewingY: true,
  bringForward: true,
  isRegular: false
};

/**
 * Cropzone default option
 * @type {Object}
 */
var CROPZONE_DEFAULT_OPTIONS = exports.CROPZONE_DEFAULT_OPTIONS = {
  hasRotatingPoint: false,
  hasBorders: false,
  lockScalingFlip: true,
  lockRotation: true,
  lockSkewingX: true,
  lockSkewingY: true
};

/**
 * Command names
 * @type {Object.<string, string>}
 */
var commandNames = exports.commandNames = {
  CLEAR_OBJECTS: 'clearObjects',
  LOAD_IMAGE: 'loadImage',
  FLIP_IMAGE: 'flip',
  ROTATE_IMAGE: 'rotate',
  ADD_OBJECT: 'addObject',
  REMOVE_OBJECT: 'removeObject',
  APPLY_FILTER: 'applyFilter',
  REMOVE_FILTER: 'removeFilter',
  ADD_ICON: 'addIcon',
  CHANGE_ICON_COLOR: 'changeIconColor',
  ADD_SHAPE: 'addShape',
  CHANGE_SHAPE: 'changeShape',
  ADD_TEXT: 'addText',
  CHANGE_TEXT: 'changeText',
  CHANGE_TEXT_STYLE: 'changeTextStyle',
  ADD_IMAGE_OBJECT: 'addImageObject',
  RESIZE_CANVAS_DIMENSION: 'resizeCanvasDimension',
  SET_OBJECT_PROPERTIES: 'setObjectProperties',
  SET_OBJECT_POSITION: 'setObjectPosition',
  CHANGE_SELECTION: 'changeSelection',
  RESIZE_IMAGE: 'resize'
};

/**
 * Event names
 * @type {Object.<string, string>}
 */
var eventNames = exports.eventNames = {
  OBJECT_ACTIVATED: 'objectActivated',
  OBJECT_MOVED: 'objectMoved',
  OBJECT_SCALED: 'objectScaled',
  OBJECT_CREATED: 'objectCreated',
  OBJECT_ROTATED: 'objectRotated',
  OBJECT_ADDED: 'objectAdded',
  OBJECT_MODIFIED: 'objectModified',
  TEXT_EDITING: 'textEditing',
  TEXT_CHANGED: 'textChanged',
  ICON_CREATE_RESIZE: 'iconCreateResize',
  ICON_CREATE_END: 'iconCreateEnd',
  ADD_TEXT: 'addText',
  ADD_OBJECT: 'addObject',
  ADD_OBJECT_AFTER: 'addObjectAfter',
  MOUSE_DOWN: 'mousedown',
  MOUSE_UP: 'mouseup',
  MOUSE_MOVE: 'mousemove',
  // UNDO/REDO Events
  REDO_STACK_CHANGED: 'redoStackChanged',
  UNDO_STACK_CHANGED: 'undoStackChanged',
  SELECTION_CLEARED: 'selectionCleared',
  SELECTION_CREATED: 'selectionCreated',
  EXECUTE_COMMAND: 'executeCommand',
  AFTER_UNDO: 'afterUndo',
  AFTER_REDO: 'afterRedo',
  ZOOM_CHANGED: 'zoomChanged',
  HAND_STARTED: 'handStarted',
  HAND_STOPPED: 'handStopped',
  KEY_DOWN: 'keydown',
  KEY_UP: 'keyup',
  INPUT_BOX_EDITING_STARTED: 'inputBoxEditingStarted',
  INPUT_BOX_EDITING_STOPPED: 'inputBoxEditingStopped',
  FOCUS: 'focus',
  BLUR: 'blur',
  IMAGE_RESIZED: 'imageResized'
};

/**
 * Selector names
 * @type {Object.<string, string>}
 */
var selectorNames = exports.selectorNames = {
  COLOR_PICKER_INPUT_BOX: '.tui-colorpicker-palette-hex'
};

/**
 * History names
 * @type {Object.<string, string>}
 */
var historyNames = exports.historyNames = {
  LOAD_IMAGE: 'Load',
  LOAD_MASK_IMAGE: 'Mask',
  ADD_MASK_IMAGE: 'Mask',
  ADD_IMAGE_OBJECT: 'Mask',
  CROP: 'Crop',
  RESIZE: 'Resize',
  APPLY_FILTER: 'Filter',
  REMOVE_FILTER: 'Filter',
  CHANGE_SHAPE: 'Shape',
  CHANGE_ICON_COLOR: 'Icon',
  ADD_TEXT: 'Text',
  CHANGE_TEXT_STYLE: 'Text',
  REMOVE_OBJECT: 'Delete',
  CLEAR_OBJECTS: 'Delete'
};

/**
 * Editor states
 * @type {Object.<string, string>}
 */
var drawingModes = exports.drawingModes = (0, _util.keyMirror)('NORMAL', 'CROPPER', 'FREE_DRAWING', 'LINE_DRAWING', 'TEXT', 'SHAPE', 'ICON', 'ZOOM', 'RESIZE');

/**
 * Menu names with drawing mode
 * @type {Object.<string, string>}
 */
var drawingMenuNames = exports.drawingMenuNames = {
  TEXT: 'text',
  CROP: 'crop',
  RESIZE: 'resize',
  SHAPE: 'shape',
  ZOOM: 'zoom'
};

/**
 * Zoom modes
 * @type {Object.<string, string>}
 */
var zoomModes = exports.zoomModes = {
  DEFAULT: 'normal',
  ZOOM: 'zoom',
  HAND: 'hand'
};

/**
 * Shortcut key values
 * @type {Object.<string, number>}
 */
var keyCodes = exports.keyCodes = {
  Z: 90,
  Y: 89,
  C: 67,
  V: 86,
  SHIFT: 16,
  BACKSPACE: 8,
  DEL: 46,
  ARROW_DOWN: 40,
  ARROW_UP: 38,
  SPACE: 32
};

/**
 * Fabric object options
 * @type {Object.<string, Object>}
 */
var fObjectOptions = exports.fObjectOptions = {
  SELECTION_STYLE: {
    borderColor: 'red',
    cornerColor: 'green',
    cornerSize: 10,
    originX: 'center',
    originY: 'center',
    transparentCorners: false
  }
};

/**
 * Promise reject messages
 * @type {Object.<string, string>}
 */
var rejectMessages = exports.rejectMessages = {
  addedObject: 'The object is already added.',
  flip: 'The flipX and flipY setting values are not changed.',
  invalidDrawingMode: 'This operation is not supported in the drawing mode.',
  invalidParameters: 'Invalid parameters.',
  isLock: 'The executing command state is locked.',
  loadImage: 'The background image is empty.',
  loadingImageFailed: 'Invalid image loaded.',
  noActiveObject: 'There is no active object.',
  noObject: 'The object is not in canvas.',
  redo: 'The promise of redo command is reject.',
  rotation: 'The current angle is same the old angle.',
  undo: 'The promise of undo command is reject.',
  unsupportedOperation: 'Unsupported operation.',
  unsupportedType: 'Unsupported object type.'
};

/**
 * Default icon menu svg path
 * @type {Object.<string, string>}
 */
var defaultIconPath = exports.defaultIconPath = {
  'icon-arrow': 'M40 12V0l24 24-24 24V36H0V12h40z',
  'icon-arrow-2': 'M49,32 H3 V22 h46 l-18,-18 h12 l23,23 L43,50 h-12 l18,-18  z ',
  'icon-arrow-3': 'M43.349998,27 L17.354,53 H1.949999 l25.996,-26 L1.949999,1 h15.404 L43.349998,27  z ',
  'icon-star': 'M35,54.557999 l-19.912001,10.468 l3.804,-22.172001 l-16.108,-15.7 l22.26,-3.236 L35,3.746 l9.956,20.172001 l22.26,3.236 l-16.108,15.7 l3.804,22.172001  z ',
  'icon-star-2': 'M17,31.212 l-7.194,4.08 l-4.728,-6.83 l-8.234,0.524 l-1.328,-8.226 l-7.644,-3.14 l2.338,-7.992 l-5.54,-6.18 l5.54,-6.176 l-2.338,-7.994 l7.644,-3.138 l1.328,-8.226 l8.234,0.522 l4.728,-6.83 L17,-24.312 l7.194,-4.08 l4.728,6.83 l8.234,-0.522 l1.328,8.226 l7.644,3.14 l-2.338,7.992 l5.54,6.178 l-5.54,6.178 l2.338,7.992 l-7.644,3.14 l-1.328,8.226 l-8.234,-0.524 l-4.728,6.83  z ',
  'icon-polygon': 'M3,31 L19,3 h32 l16,28 l-16,28 H19  z ',
  'icon-location': 'M24 62C8 45.503 0 32.837 0 24 0 10.745 10.745 0 24 0s24 10.745 24 24c0 8.837-8 21.503-24 38zm0-28c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z',
  'icon-heart': 'M49.994999,91.349998 l-6.96,-6.333 C18.324001,62.606995 2.01,47.829002 2.01,29.690998 C2.01,14.912998 13.619999,3.299999 28.401001,3.299999 c8.349,0 16.362,5.859 21.594,12 c5.229,-6.141 13.242001,-12 21.591,-12 c14.778,0 26.390999,11.61 26.390999,26.390999 c0,18.138 -16.314001,32.916 -41.025002,55.374001 l-6.96,6.285  z ',
  'icon-bubble': 'M44 48L34 58V48H12C5.373 48 0 42.627 0 36V12C0 5.373 5.373 0 12 0h40c6.627 0 12 5.373 12 12v24c0 6.627-5.373 12-12 12h-8z'
};

var defaultRotateRangeValues = exports.defaultRotateRangeValues = {
  realTimeEvent: true,
  min: -360,
  max: 360,
  value: 0
};

var defaultDrawRangeValues = exports.defaultDrawRangeValues = {
  min: 5,
  max: 30,
  value: 12
};

var defaultShapeStrokeValues = exports.defaultShapeStrokeValues = {
  realTimeEvent: true,
  min: 2,
  max: 300,
  value: 3
};

var defaultTextRangeValues = exports.defaultTextRangeValues = {
  realTimeEvent: true,
  min: 10,
  max: 100,
  value: 50
};

var defaultFilterRangeValues = exports.defaultFilterRangeValues = {
  tintOpacityRange: {
    realTimeEvent: true,
    min: 0,
    max: 1,
    value: 0.7,
    useDecimal: true
  },
  removewhiteDistanceRange: {
    realTimeEvent: true,
    min: 0,
    max: 1,
    value: 0.2,
    useDecimal: true
  },
  brightnessRange: {
    realTimeEvent: true,
    min: -1,
    max: 1,
    value: 0,
    useDecimal: true
  },
  noiseRange: {
    realTimeEvent: true,
    min: 0,
    max: 1000,
    value: 100
  },
  pixelateRange: {
    realTimeEvent: true,
    min: 2,
    max: 20,
    value: 4
  },
  colorfilterThresholdRange: {
    realTimeEvent: true,
    min: 0,
    max: 1,
    value: 0.2,
    useDecimal: true
  },
  blurFilterRange: {
    value: 0.1
  }
};

var emptyCropRectValues = exports.emptyCropRectValues = {
  LEFT: 0,
  TOP: 0,
  WIDTH: 0.5,
  HEIGHT: 0.5
};

var defaultResizePixelValues = exports.defaultResizePixelValues = {
  realTimeEvent: true,
  min: 32,
  max: 4088,
  value: 800
};

/***/ }),

/***/ "./src/js/drawingMode/cropper.js":
/*!***************************************!*\
  !*** ./src/js/drawingMode/cropper.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawingMode = __webpack_require__(/*! @/interface/drawingMode */ "./src/js/interface/drawingMode.js");

var _drawingMode2 = _interopRequireDefault(_drawingMode);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview CropperDrawingMode class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * CropperDrawingMode class
 * @class
 * @ignore
 */
var CropperDrawingMode = function (_DrawingMode) {
  _inherits(CropperDrawingMode, _DrawingMode);

  function CropperDrawingMode() {
    _classCallCheck(this, CropperDrawingMode);

    return _possibleConstructorReturn(this, (CropperDrawingMode.__proto__ || Object.getPrototypeOf(CropperDrawingMode)).call(this, _consts.drawingModes.CROPPER));
  }

  /**
   * start this drawing mode
   * @param {Graphics} graphics - Graphics instance
   * @override
   */


  _createClass(CropperDrawingMode, [{
    key: 'start',
    value: function start(graphics) {
      var cropper = graphics.getComponent(_consts.componentNames.CROPPER);
      cropper.start();
    }

    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */

  }, {
    key: 'end',
    value: function end(graphics) {
      var cropper = graphics.getComponent(_consts.componentNames.CROPPER);
      cropper.end();
    }
  }]);

  return CropperDrawingMode;
}(_drawingMode2.default);

exports.default = CropperDrawingMode;

/***/ }),

/***/ "./src/js/drawingMode/freeDrawing.js":
/*!*******************************************!*\
  !*** ./src/js/drawingMode/freeDrawing.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawingMode = __webpack_require__(/*! @/interface/drawingMode */ "./src/js/interface/drawingMode.js");

var _drawingMode2 = _interopRequireDefault(_drawingMode);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview FreeDrawingMode class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * FreeDrawingMode class
 * @class
 * @ignore
 */
var FreeDrawingMode = function (_DrawingMode) {
  _inherits(FreeDrawingMode, _DrawingMode);

  function FreeDrawingMode() {
    _classCallCheck(this, FreeDrawingMode);

    return _possibleConstructorReturn(this, (FreeDrawingMode.__proto__ || Object.getPrototypeOf(FreeDrawingMode)).call(this, _consts.drawingModes.FREE_DRAWING));
  }

  /**
   * start this drawing mode
   * @param {Graphics} graphics - Graphics instance
   * @param {{width: ?number, color: ?string}} [options] - Brush width & color
   * @override
   */


  _createClass(FreeDrawingMode, [{
    key: 'start',
    value: function start(graphics, options) {
      var freeDrawing = graphics.getComponent(_consts.componentNames.FREE_DRAWING);
      freeDrawing.start(options);
    }

    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */

  }, {
    key: 'end',
    value: function end(graphics) {
      var freeDrawing = graphics.getComponent(_consts.componentNames.FREE_DRAWING);
      freeDrawing.end();
    }
  }]);

  return FreeDrawingMode;
}(_drawingMode2.default);

exports.default = FreeDrawingMode;

/***/ }),

/***/ "./src/js/drawingMode/icon.js":
/*!************************************!*\
  !*** ./src/js/drawingMode/icon.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawingMode = __webpack_require__(/*! @/interface/drawingMode */ "./src/js/interface/drawingMode.js");

var _drawingMode2 = _interopRequireDefault(_drawingMode);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview IconDrawingMode class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * IconDrawingMode class
 * @class
 * @ignore
 */
var IconDrawingMode = function (_DrawingMode) {
  _inherits(IconDrawingMode, _DrawingMode);

  function IconDrawingMode() {
    _classCallCheck(this, IconDrawingMode);

    return _possibleConstructorReturn(this, (IconDrawingMode.__proto__ || Object.getPrototypeOf(IconDrawingMode)).call(this, _consts.drawingModes.ICON));
  }

  /**
   * start this drawing mode
   * @param {Graphics} graphics - Graphics instance
   * @override
   */


  _createClass(IconDrawingMode, [{
    key: 'start',
    value: function start(graphics) {
      var icon = graphics.getComponent(_consts.componentNames.ICON);
      icon.start();
    }

    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */

  }, {
    key: 'end',
    value: function end(graphics) {
      var icon = graphics.getComponent(_consts.componentNames.ICON);
      icon.end();
    }
  }]);

  return IconDrawingMode;
}(_drawingMode2.default);

exports.default = IconDrawingMode;

/***/ }),

/***/ "./src/js/drawingMode/lineDrawing.js":
/*!*******************************************!*\
  !*** ./src/js/drawingMode/lineDrawing.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawingMode = __webpack_require__(/*! @/interface/drawingMode */ "./src/js/interface/drawingMode.js");

var _drawingMode2 = _interopRequireDefault(_drawingMode);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview LineDrawingMode class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * LineDrawingMode class
 * @class
 * @ignore
 */
var LineDrawingMode = function (_DrawingMode) {
  _inherits(LineDrawingMode, _DrawingMode);

  function LineDrawingMode() {
    _classCallCheck(this, LineDrawingMode);

    return _possibleConstructorReturn(this, (LineDrawingMode.__proto__ || Object.getPrototypeOf(LineDrawingMode)).call(this, _consts.drawingModes.LINE_DRAWING));
  }

  /**
   * start this drawing mode
   * @param {Graphics} graphics - Graphics instance
   * @param {{width: ?number, color: ?string}} [options] - Brush width & color
   * @override
   */


  _createClass(LineDrawingMode, [{
    key: 'start',
    value: function start(graphics, options) {
      var lineDrawing = graphics.getComponent(_consts.componentNames.LINE);
      lineDrawing.start(options);
    }

    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */

  }, {
    key: 'end',
    value: function end(graphics) {
      var lineDrawing = graphics.getComponent(_consts.componentNames.LINE);
      lineDrawing.end();
    }
  }]);

  return LineDrawingMode;
}(_drawingMode2.default);

exports.default = LineDrawingMode;

/***/ }),

/***/ "./src/js/drawingMode/resize.js":
/*!**************************************!*\
  !*** ./src/js/drawingMode/resize.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawingMode = __webpack_require__(/*! @/interface/drawingMode */ "./src/js/interface/drawingMode.js");

var _drawingMode2 = _interopRequireDefault(_drawingMode);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ResizeDrawingMode class
 * @class
 * @ignore
 */
var ResizeDrawingMode = function (_DrawingMode) {
  _inherits(ResizeDrawingMode, _DrawingMode);

  function ResizeDrawingMode() {
    _classCallCheck(this, ResizeDrawingMode);

    return _possibleConstructorReturn(this, (ResizeDrawingMode.__proto__ || Object.getPrototypeOf(ResizeDrawingMode)).call(this, _consts.drawingModes.RESIZE));
  }

  /**
   * start this drawing mode
   * @param {Graphics} graphics - Graphics instance
   * @override
   */


  _createClass(ResizeDrawingMode, [{
    key: 'start',
    value: function start(graphics) {
      var resize = graphics.getComponent(_consts.componentNames.RESIZE);
      resize.start();
    }

    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */

  }, {
    key: 'end',
    value: function end(graphics) {
      var resize = graphics.getComponent(_consts.componentNames.RESIZE);
      resize.end();
    }
  }]);

  return ResizeDrawingMode;
}(_drawingMode2.default);

exports.default = ResizeDrawingMode;

/***/ }),

/***/ "./src/js/drawingMode/shape.js":
/*!*************************************!*\
  !*** ./src/js/drawingMode/shape.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawingMode = __webpack_require__(/*! @/interface/drawingMode */ "./src/js/interface/drawingMode.js");

var _drawingMode2 = _interopRequireDefault(_drawingMode);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview ShapeDrawingMode class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * ShapeDrawingMode class
 * @class
 * @ignore
 */
var ShapeDrawingMode = function (_DrawingMode) {
  _inherits(ShapeDrawingMode, _DrawingMode);

  function ShapeDrawingMode() {
    _classCallCheck(this, ShapeDrawingMode);

    return _possibleConstructorReturn(this, (ShapeDrawingMode.__proto__ || Object.getPrototypeOf(ShapeDrawingMode)).call(this, _consts.drawingModes.SHAPE));
  }

  /**
   * start this drawing mode
   * @param {Graphics} graphics - Graphics instance
   * @override
   */


  _createClass(ShapeDrawingMode, [{
    key: 'start',
    value: function start(graphics) {
      var shape = graphics.getComponent(_consts.componentNames.SHAPE);
      shape.start();
    }

    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */

  }, {
    key: 'end',
    value: function end(graphics) {
      var shape = graphics.getComponent(_consts.componentNames.SHAPE);
      shape.end();
    }
  }]);

  return ShapeDrawingMode;
}(_drawingMode2.default);

exports.default = ShapeDrawingMode;

/***/ }),

/***/ "./src/js/drawingMode/text.js":
/*!************************************!*\
  !*** ./src/js/drawingMode/text.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawingMode = __webpack_require__(/*! @/interface/drawingMode */ "./src/js/interface/drawingMode.js");

var _drawingMode2 = _interopRequireDefault(_drawingMode);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview TextDrawingMode class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * TextDrawingMode class
 * @class
 * @ignore
 */
var TextDrawingMode = function (_DrawingMode) {
  _inherits(TextDrawingMode, _DrawingMode);

  function TextDrawingMode() {
    _classCallCheck(this, TextDrawingMode);

    return _possibleConstructorReturn(this, (TextDrawingMode.__proto__ || Object.getPrototypeOf(TextDrawingMode)).call(this, _consts.drawingModes.TEXT));
  }

  /**
   * start this drawing mode
   * @param {Graphics} graphics - Graphics instance
   * @override
   */


  _createClass(TextDrawingMode, [{
    key: 'start',
    value: function start(graphics) {
      var text = graphics.getComponent(_consts.componentNames.TEXT);
      text.start();
    }

    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */

  }, {
    key: 'end',
    value: function end(graphics) {
      var text = graphics.getComponent(_consts.componentNames.TEXT);
      text.end();
    }
  }]);

  return TextDrawingMode;
}(_drawingMode2.default);

exports.default = TextDrawingMode;

/***/ }),

/***/ "./src/js/drawingMode/zoom.js":
/*!************************************!*\
  !*** ./src/js/drawingMode/zoom.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawingMode = __webpack_require__(/*! @/interface/drawingMode */ "./src/js/interface/drawingMode.js");

var _drawingMode2 = _interopRequireDefault(_drawingMode);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fileoverview ZoomDrawingMode class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * ZoomDrawingMode class
 * @class
 * @ignore
 */
var ZoomDrawingMode = function (_DrawingMode) {
  _inherits(ZoomDrawingMode, _DrawingMode);

  function ZoomDrawingMode() {
    _classCallCheck(this, ZoomDrawingMode);

    return _possibleConstructorReturn(this, (ZoomDrawingMode.__proto__ || Object.getPrototypeOf(ZoomDrawingMode)).call(this, _consts.drawingModes.ZOOM));
  }

  /**
   * start this drawing mode
   * @param {Graphics} graphics - Graphics instance
   * @override
   */


  _createClass(ZoomDrawingMode, [{
    key: 'start',
    value: function start(graphics) {
      var zoom = graphics.getComponent(_consts.componentNames.ZOOM);

      zoom.start();
    }

    /**
     * stop this drawing mode
     * @param {Graphics} graphics - Graphics instance
     * @override
     */

  }, {
    key: 'end',
    value: function end(graphics) {
      var zoom = graphics.getComponent(_consts.componentNames.ZOOM);

      zoom.end();
    }
  }]);

  return ZoomDrawingMode;
}(_drawingMode2.default);

exports.default = ZoomDrawingMode;

/***/ }),

/***/ "./src/js/extension/arrowLine.js":
/*!***************************************!*\
  !*** ./src/js/extension/arrowLine.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ARROW_ANGLE = 30; /**
                       * @author NHN. FE Development Team <dl_javascript@nhn.com>
                       * @fileoverview Blur extending fabric.Image.filters.Convolute
                       */

var CHEVRON_SIZE_RATIO = 2.7;
var TRIANGLE_SIZE_RATIO = 1.7;
var RADIAN_CONVERSION_VALUE = 180;

var ArrowLine = _fabric2.default.util.createClass(_fabric2.default.Line,
/** @lends Convolute.prototype */{
  /**
   * Line type
   * @param {String} type
   * @default
   */
  type: 'line',

  /**
   * Constructor
   * @param {Array} [points] Array of points
   * @param {Object} [options] Options object
   * @override
   */
  initialize: function initialize(points) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.callSuper('initialize', points, options);

    this.arrowType = options.arrowType;
  },


  /**
   * Render ArrowLine
   * @private
   * @override
   */
  _render: function _render(ctx) {
    var _calcLinePoints = this.calcLinePoints(),
        fromX = _calcLinePoints.x1,
        fromY = _calcLinePoints.y1,
        toX = _calcLinePoints.x2,
        toY = _calcLinePoints.y2;

    var linePosition = {
      fromX: fromX,
      fromY: fromY,
      toX: toX,
      toY: toY
    };
    this.ctx = ctx;
    ctx.lineWidth = this.strokeWidth;

    this._renderBasicLinePath(linePosition);
    this._drawDecoratorPath(linePosition);

    this._renderStroke(ctx);
  },


  /**
   * Render Basic line path
   * @param {Object} linePosition - line position
   *  @param {number} option.fromX - line start position x
   *  @param {number} option.fromY - line start position y
   *  @param {number} option.toX - line end position x
   *  @param {number} option.toY - line end position y
   * @private
   */
  _renderBasicLinePath: function _renderBasicLinePath(_ref) {
    var fromX = _ref.fromX,
        fromY = _ref.fromY,
        toX = _ref.toX,
        toY = _ref.toY;

    this.ctx.beginPath();
    this.ctx.moveTo(fromX, fromY);
    this.ctx.lineTo(toX, toY);
  },


  /**
   * Render Arrow Head
   * @param {Object} linePosition - line position
   *  @param {number} option.fromX - line start position x
   *  @param {number} option.fromY - line start position y
   *  @param {number} option.toX - line end position x
   *  @param {number} option.toY - line end position y
   * @private
   */
  _drawDecoratorPath: function _drawDecoratorPath(linePosition) {
    this._drawDecoratorPathType('head', linePosition);
    this._drawDecoratorPathType('tail', linePosition);
  },


  /**
   * Render Arrow Head
   * @param {string} type - 'head' or 'tail'
   * @param {Object} linePosition - line position
   *  @param {number} option.fromX - line start position x
   *  @param {number} option.fromY - line start position y
   *  @param {number} option.toX - line end position x
   *  @param {number} option.toY - line end position y
   * @private
   */
  _drawDecoratorPathType: function _drawDecoratorPathType(type, linePosition) {
    switch (this.arrowType[type]) {
      case 'triangle':
        this._drawTrianglePath(type, linePosition);
        break;
      case 'chevron':
        this._drawChevronPath(type, linePosition);
        break;
      default:
        break;
    }
  },


  /**
   * Render Triangle Head
   * @param {string} type - 'head' or 'tail'
   * @param {Object} linePosition - line position
   *  @param {number} option.fromX - line start position x
   *  @param {number} option.fromY - line start position y
   *  @param {number} option.toX - line end position x
   *  @param {number} option.toY - line end position y
   * @private
   */
  _drawTrianglePath: function _drawTrianglePath(type, linePosition) {
    var decorateSize = this.ctx.lineWidth * TRIANGLE_SIZE_RATIO;

    this._drawChevronPath(type, linePosition, decorateSize);
    this.ctx.closePath();
  },


  /**
   * Render Chevron Head
   * @param {string} type - 'head' or 'tail'
   * @param {Object} linePosition - line position
   *  @param {number} option.fromX - line start position x
   *  @param {number} option.fromY - line start position y
   *  @param {number} option.toX - line end position x
   *  @param {number} option.toY - line end position y
   * @param {number} decorateSize - decorate size
   * @private
   */
  _drawChevronPath: function _drawChevronPath(type, _ref2, decorateSize) {
    var _this = this;

    var fromX = _ref2.fromX,
        fromY = _ref2.fromY,
        toX = _ref2.toX,
        toY = _ref2.toY;
    var ctx = this.ctx;

    if (!decorateSize) {
      decorateSize = this.ctx.lineWidth * CHEVRON_SIZE_RATIO;
    }

    var _ref3 = type === 'head' ? [fromX, fromY] : [toX, toY],
        standardX = _ref3[0],
        standardY = _ref3[1];

    var _ref4 = type === 'head' ? [toX, toY] : [fromX, fromY],
        compareX = _ref4[0],
        compareY = _ref4[1];

    var angle = Math.atan2(compareY - standardY, compareX - standardX) * RADIAN_CONVERSION_VALUE / Math.PI;
    var rotatedPosition = function rotatedPosition(changeAngle) {
      return _this.getRotatePosition(decorateSize, changeAngle, {
        x: standardX,
        y: standardY
      });
    };

    ctx.moveTo.apply(ctx, rotatedPosition(angle + ARROW_ANGLE));
    ctx.lineTo(standardX, standardY);
    ctx.lineTo.apply(ctx, rotatedPosition(angle - ARROW_ANGLE));
  },


  /**
   * return position from change angle.
   * @param {number} distance - change distance
   * @param {number} angle - change angle
   * @param {Object} referencePosition - reference position
   * @returns {Array}
   * @private
   */
  getRotatePosition: function getRotatePosition(distance, angle, referencePosition) {
    var radian = angle * Math.PI / RADIAN_CONVERSION_VALUE;
    var x = referencePosition.x,
        y = referencePosition.y;


    return [distance * Math.cos(radian) + x, distance * Math.sin(radian) + y];
  }
});

exports.default = ArrowLine;

/***/ }),

/***/ "./src/js/extension/colorFilter.js":
/*!*****************************************!*\
  !*** ./src/js/extension/colorFilter.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ColorFilter object
 * @class ColorFilter
 * @extends {fabric.Image.filters.BaseFilter}
 * @ignore
 */
var ColorFilter = _fabric2.default.util.createClass(_fabric2.default.Image.filters.BaseFilter,
/** @lends BaseFilter.prototype */{
  /**
   * Filter type
   * @param {String} type
   * @default
   */
  type: 'ColorFilter',

  /**
   * Constructor
   * @member fabric.Image.filters.ColorFilter.prototype
   * @param {Object} [options] Options object
   * @param {Number} [options.color='#FFFFFF'] Value of color (0...255)
   * @param {Number} [options.threshold=45] Value of threshold (0...255)
   * @override
   */
  initialize: function initialize(options) {
    if (!options) {
      options = {};
    }
    this.color = options.color || '#FFFFFF';
    this.threshold = options.threshold || 45;
    this.x = options.x || null;
    this.y = options.y || null;
  },


  /**
   * Applies filter to canvas element
   * @param {Object} canvas Canvas object passed by fabric
   */
  // eslint-disable-next-line complexity
  applyTo: function applyTo(canvas) {
    var canvasEl = canvas.canvasEl;

    var context = canvasEl.getContext('2d');
    var imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height);
    var data = imageData.data;
    var threshold = this.threshold;

    var filterColor = _fabric2.default.Color.sourceFromHex(this.color);
    var i = void 0,
        len = void 0;

    if (this.x && this.y) {
      filterColor = this._getColor(imageData, this.x, this.y);
    }

    for (i = 0, len = data.length; i < len; i += 4) {
      if (this._isOutsideThreshold(data[i], filterColor[0], threshold) || this._isOutsideThreshold(data[i + 1], filterColor[1], threshold) || this._isOutsideThreshold(data[i + 2], filterColor[2], threshold)) {
        continue;
      }
      data[i] = data[i + 1] = data[i + 2] = data[i + 3] = 0;
    }
    context.putImageData(imageData, 0, 0);
  },


  /**
   * Check color if it is within threshold
   * @param {Number} color1 source color
   * @param {Number} color2 filtering color
   * @param {Number} threshold threshold
   * @returns {boolean} true if within threshold or false
   */
  _isOutsideThreshold: function _isOutsideThreshold(color1, color2, threshold) {
    var diff = color1 - color2;

    return Math.abs(diff) > threshold;
  },


  /**
   * Get color at (x, y)
   * @param {Object} imageData of canvas
   * @param {Number} x left position
   * @param {Number} y top position
   * @returns {Array} color array
   */
  _getColor: function _getColor(imageData, x, y) {
    var color = [0, 0, 0, 0];
    var data = imageData.data,
        width = imageData.width;

    var bytes = 4;
    var position = (width * y + x) * bytes;

    color[0] = data[position];
    color[1] = data[position + 1];
    color[2] = data[position + 2];
    color[3] = data[position + 3];

    return color;
  }
}); /**
     * @author NHN. FE Development Team <dl_javascript@nhn.com>
     * @fileoverview ColorFilter extending fabric.Image.filters.BaseFilter
     */
exports.default = ColorFilter;

/***/ }),

/***/ "./src/js/extension/cropzone.js":
/*!**************************************!*\
  !*** ./src/js/extension/cropzone.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                   * @fileoverview Cropzone extending fabric.Rect
                                                                                                                                                                                                                   */


var CORNER_TYPE_TOP_LEFT = 'tl';
var CORNER_TYPE_TOP_RIGHT = 'tr';
var CORNER_TYPE_MIDDLE_TOP = 'mt';
var CORNER_TYPE_MIDDLE_LEFT = 'ml';
var CORNER_TYPE_MIDDLE_RIGHT = 'mr';
var CORNER_TYPE_MIDDLE_BOTTOM = 'mb';
var CORNER_TYPE_BOTTOM_LEFT = 'bl';
var CORNER_TYPE_BOTTOM_RIGHT = 'br';
var CORNER_TYPE_LIST = [CORNER_TYPE_TOP_LEFT, CORNER_TYPE_TOP_RIGHT, CORNER_TYPE_MIDDLE_TOP, CORNER_TYPE_MIDDLE_LEFT, CORNER_TYPE_MIDDLE_RIGHT, CORNER_TYPE_MIDDLE_BOTTOM, CORNER_TYPE_BOTTOM_LEFT, CORNER_TYPE_BOTTOM_RIGHT];
var NOOP_FUNCTION = function NOOP_FUNCTION() {};

/**
 * Align with cropzone ratio
 * @param {string} selectedCorner - selected corner type
 * @returns {{width: number, height: number}}
 * @private
 */
function cornerTypeValid(selectedCorner) {
  return CORNER_TYPE_LIST.indexOf(selectedCorner) >= 0;
}

/**
 * return scale basis type
 * @param {number} diffX - X distance of the cursor and corner.
 * @param {number} diffY - Y distance of the cursor and corner.
 * @returns {string}
 * @private
 */
function getScaleBasis(diffX, diffY) {
  return diffX > diffY ? 'width' : 'height';
}

/**
 * Cropzone object
 * Issue: IE7, 8(with excanvas)
 *  - Cropzone is a black zone without transparency.
 * @class Cropzone
 * @extends {fabric.Rect}
 * @ignore
 */
var Cropzone = _fabric2.default.util.createClass(_fabric2.default.Rect,
/** @lends Cropzone.prototype */{
  /**
   * Constructor
   * @param {Object} canvas canvas
   * @param {Object} options Options object
   * @param {Object} extendsOptions object for extends "options"
   * @override
   */
  initialize: function initialize(canvas, options, extendsOptions) {
    options = _tuiCodeSnippet2.default.extend(options, extendsOptions);
    options.type = 'cropzone';

    this.callSuper('initialize', options);
    this._addEventHandler();

    this.canvas = canvas;
    this.options = options;
  },
  canvasEventDelegation: function canvasEventDelegation(eventName) {
    var delegationState = 'unregistered';
    var isRegistered = this.canvasEventTrigger[eventName] !== NOOP_FUNCTION;
    if (isRegistered) {
      delegationState = 'registered';
    } else if ([_consts.eventNames.OBJECT_MOVED, _consts.eventNames.OBJECT_SCALED].indexOf(eventName) < 0) {
      delegationState = 'none';
    }

    return delegationState;
  },
  canvasEventRegister: function canvasEventRegister(eventName, eventTrigger) {
    this.canvasEventTrigger[eventName] = eventTrigger;
  },
  _addEventHandler: function _addEventHandler() {
    var _canvasEventTrigger;

    this.canvasEventTrigger = (_canvasEventTrigger = {}, _defineProperty(_canvasEventTrigger, _consts.eventNames.OBJECT_MOVED, NOOP_FUNCTION), _defineProperty(_canvasEventTrigger, _consts.eventNames.OBJECT_SCALED, NOOP_FUNCTION), _canvasEventTrigger);
    this.on({
      moving: this._onMoving.bind(this),
      scaling: this._onScaling.bind(this)
    });
    _fabric2.default.util.addListener(document, 'keydown', this._onKeyDown.bind(this));
    _fabric2.default.util.addListener(document, 'keyup', this._onKeyUp.bind(this));
  },
  _renderCropzone: function _renderCropzone(ctx) {
    var cropzoneDashLineWidth = 7;
    var cropzoneDashLineOffset = 7;

    // Calc original scale
    var originalFlipX = this.flipX ? -1 : 1;
    var originalFlipY = this.flipY ? -1 : 1;
    var originalScaleX = originalFlipX / this.scaleX;
    var originalScaleY = originalFlipY / this.scaleY;

    // Set original scale
    ctx.scale(originalScaleX, originalScaleY);

    // Render outer rect
    this._fillOuterRect(ctx, 'rgba(0, 0, 0, 0.5)');

    if (this.options.lineWidth) {
      this._fillInnerRect(ctx);
      this._strokeBorder(ctx, 'rgb(255, 255, 255)', {
        lineWidth: this.options.lineWidth
      });
    } else {
      // Black dash line
      this._strokeBorder(ctx, 'rgb(0, 0, 0)', {
        lineDashWidth: cropzoneDashLineWidth
      });

      // White dash line
      this._strokeBorder(ctx, 'rgb(255, 255, 255)', {
        lineDashWidth: cropzoneDashLineWidth,
        lineDashOffset: cropzoneDashLineOffset
      });
    }

    // Reset scale
    ctx.scale(1 / originalScaleX, 1 / originalScaleY);
  },


  /**
   * Render Crop-zone
   * @private
   * @override
   */
  _render: function _render(ctx) {
    this.callSuper('_render', ctx);

    this._renderCropzone(ctx);
  },


  /**
   * Cropzone-coordinates with outer rectangle
   *
   *     x0     x1         x2      x3
   *  y0 +--------------------------+
   *     |///////|//////////|///////|    // <--- "Outer-rectangle"
   *     |///////|//////////|///////|
   *  y1 +-------+----------+-------+
   *     |///////| Cropzone |///////|    Cropzone is the "Inner-rectangle"
   *     |///////|  (0, 0)  |///////|    Center point (0, 0)
   *  y2 +-------+----------+-------+
   *     |///////|//////////|///////|
   *     |///////|//////////|///////|
   *  y3 +--------------------------+
   *
   * @typedef {{x: Array<number>, y: Array<number>}} cropzoneCoordinates
   * @ignore
   */

  /**
   * Fill outer rectangle
   * @param {CanvasRenderingContext2D} ctx - Context
   * @param {string|CanvasGradient|CanvasPattern} fillStyle - Fill-style
   * @private
   */
  _fillOuterRect: function _fillOuterRect(ctx, fillStyle) {
    var _getCoordinates = this._getCoordinates(),
        x = _getCoordinates.x,
        y = _getCoordinates.y;

    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.beginPath();

    // Outer rectangle
    // Numbers are +/-1 so that overlay edges don't get blurry.
    ctx.moveTo(x[0] - 1, y[0] - 1);
    ctx.lineTo(x[3] + 1, y[0] - 1);
    ctx.lineTo(x[3] + 1, y[3] + 1);
    ctx.lineTo(x[0] - 1, y[3] + 1);
    ctx.lineTo(x[0] - 1, y[0] - 1);
    ctx.closePath();

    // Inner rectangle
    ctx.moveTo(x[1], y[1]);
    ctx.lineTo(x[1], y[2]);
    ctx.lineTo(x[2], y[2]);
    ctx.lineTo(x[2], y[1]);
    ctx.lineTo(x[1], y[1]);
    ctx.closePath();

    ctx.fill();
    ctx.restore();
  },


  /**
   * Draw Inner grid line
   * @param {CanvasRenderingContext2D} ctx - Context
   * @private
   */
  _fillInnerRect: function _fillInnerRect(ctx) {
    var _getCoordinates2 = this._getCoordinates(),
        outerX = _getCoordinates2.x,
        outerY = _getCoordinates2.y;

    var x = this._caculateInnerPosition(outerX, (outerX[2] - outerX[1]) / 3);
    var y = this._caculateInnerPosition(outerY, (outerY[2] - outerY[1]) / 3);

    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = this.options.lineWidth;
    ctx.beginPath();

    ctx.moveTo(x[0], y[1]);
    ctx.lineTo(x[3], y[1]);

    ctx.moveTo(x[0], y[2]);
    ctx.lineTo(x[3], y[2]);

    ctx.moveTo(x[1], y[0]);
    ctx.lineTo(x[1], y[3]);

    ctx.moveTo(x[2], y[0]);
    ctx.lineTo(x[2], y[3]);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  },


  /**
   * Calculate Inner Position
   * @param {Array} outer - outer position
   * @param {number} size - interval for calculate
   * @returns {Array} - inner position
   * @private
   */
  _caculateInnerPosition: function _caculateInnerPosition(outer, size) {
    var position = [];
    position[0] = outer[1];
    position[1] = outer[1] + size;
    position[2] = outer[1] + size * 2;
    position[3] = outer[2];

    return position;
  },


  /**
   * Get coordinates
   * @returns {cropzoneCoordinates} - {@link cropzoneCoordinates}
   * @private
   */
  _getCoordinates: function _getCoordinates() {
    var canvas = this.canvas,
        width = this.width,
        height = this.height,
        left = this.left,
        top = this.top;

    var halfWidth = width / 2;
    var halfHeight = height / 2;
    var canvasHeight = canvas.getHeight(); // fabric object
    var canvasWidth = canvas.getWidth(); // fabric object

    return {
      x: _tuiCodeSnippet2.default.map([-(halfWidth + left), // x0
      -halfWidth, // x1
      halfWidth, // x2
      halfWidth + (canvasWidth - left - width)], Math.ceil),
      y: _tuiCodeSnippet2.default.map([-(halfHeight + top), // y0
      -halfHeight, // y1
      halfHeight, // y2
      halfHeight + (canvasHeight - top - height)], Math.ceil)
    };
  },


  /**
   * Stroke border
   * @param {CanvasRenderingContext2D} ctx - Context
   * @param {string|CanvasGradient|CanvasPattern} strokeStyle - Stroke-style
   * @param {number} lineDashWidth - Dash width
   * @param {number} [lineDashOffset] - Dash offset
   * @param {number} [lineWidth] - line width
   * @private
   */
  _strokeBorder: function _strokeBorder(ctx, strokeStyle, _ref) {
    var lineDashWidth = _ref.lineDashWidth,
        lineDashOffset = _ref.lineDashOffset,
        lineWidth = _ref.lineWidth;

    var halfWidth = this.width / 2;
    var halfHeight = this.height / 2;

    ctx.save();
    ctx.strokeStyle = strokeStyle;

    if (ctx.setLineDash) {
      ctx.setLineDash([lineDashWidth, lineDashWidth]);
    }
    if (lineDashOffset) {
      ctx.lineDashOffset = lineDashOffset;
    }
    if (lineWidth) {
      ctx.lineWidth = lineWidth;
    }

    ctx.beginPath();
    ctx.moveTo(-halfWidth, -halfHeight);
    ctx.lineTo(halfWidth, -halfHeight);
    ctx.lineTo(halfWidth, halfHeight);
    ctx.lineTo(-halfWidth, halfHeight);
    ctx.lineTo(-halfWidth, -halfHeight);
    ctx.stroke();

    ctx.restore();
  },


  /**
   * onMoving event listener
   * @private
   */
  _onMoving: function _onMoving() {
    var height = this.height,
        width = this.width,
        left = this.left,
        top = this.top;

    var maxLeft = this.canvas.getWidth() - width;
    var maxTop = this.canvas.getHeight() - height;

    this.left = (0, _util.clamp)(left, 0, maxLeft);
    this.top = (0, _util.clamp)(top, 0, maxTop);

    this.canvasEventTrigger[_consts.eventNames.OBJECT_MOVED](this);
  },


  /**
   * onScaling event listener
   * @param {{e: MouseEvent}} fEvent - Fabric event
   * @private
   */
  _onScaling: function _onScaling(fEvent) {
    var selectedCorner = fEvent.transform.corner;
    var pointer = this.canvas.getPointer(fEvent.e);
    var settings = this._calcScalingSizeFromPointer(pointer, selectedCorner);

    // On scaling cropzone,
    // change real width and height and fix scaleFactor to 1
    this.scale(1).set(settings);

    this.canvasEventTrigger[_consts.eventNames.OBJECT_SCALED](this);
  },


  /**
   * Calc scaled size from mouse pointer with selected corner
   * @param {{x: number, y: number}} pointer - Mouse position
   * @param {string} selectedCorner - selected corner type
   * @returns {Object} Having left or(and) top or(and) width or(and) height.
   * @private
   */
  _calcScalingSizeFromPointer: function _calcScalingSizeFromPointer(pointer, selectedCorner) {
    var isCornerTypeValid = cornerTypeValid(selectedCorner);

    return isCornerTypeValid && this._resizeCropZone(pointer, selectedCorner);
  },


  /**
   * Align with cropzone ratio
   * @param {number} width - cropzone width
   * @param {number} height - cropzone height
   * @param {number} maxWidth - limit max width
   * @param {number} maxHeight - limit max height
   * @param {number} scaleTo - cropzone ratio
   * @returns {{width: number, height: number}}
   * @private
   */
  adjustRatioCropzoneSize: function adjustRatioCropzoneSize(_ref2) {
    var width = _ref2.width,
        height = _ref2.height,
        leftMaker = _ref2.leftMaker,
        topMaker = _ref2.topMaker,
        maxWidth = _ref2.maxWidth,
        maxHeight = _ref2.maxHeight,
        scaleTo = _ref2.scaleTo;

    width = maxWidth ? (0, _util.clamp)(width, 1, maxWidth) : width;
    height = maxHeight ? (0, _util.clamp)(height, 1, maxHeight) : height;

    if (!this.presetRatio) {
      if (this._withShiftKey) {
        // make fixed ratio cropzone
        if (width > height) {
          height = width;
        } else if (height > width) {
          width = height;
        }
      }

      return {
        width: width,
        height: height,
        left: leftMaker(width),
        top: topMaker(height)
      };
    }

    if (scaleTo === 'width') {
      height = width / this.presetRatio;
    } else {
      width = height * this.presetRatio;
    }

    var maxScaleFactor = Math.min(maxWidth / width, maxHeight / height);
    if (maxScaleFactor <= 1) {
      var _map = [width, height].map(function (v) {
        return v * maxScaleFactor;
      });

      width = _map[0];
      height = _map[1];
    }

    return {
      width: width,
      height: height,
      left: leftMaker(width),
      top: topMaker(height)
    };
  },


  /**
   * Get dimension last state cropzone
   * @returns {{rectTop: number, rectLeft: number, rectWidth: number, rectHeight: number}}
   * @private
   */
  _getCropzoneRectInfo: function _getCropzoneRectInfo() {
    var _canvas = this.canvas,
        canvasWidth = _canvas.width,
        canvasHeight = _canvas.height;

    var _getBoundingRect = this.getBoundingRect(false, true),
        rectTop = _getBoundingRect.top,
        rectLeft = _getBoundingRect.left,
        rectWidth = _getBoundingRect.width,
        rectHeight = _getBoundingRect.height;

    return {
      rectTop: rectTop,
      rectLeft: rectLeft,
      rectWidth: rectWidth,
      rectHeight: rectHeight,
      rectRight: rectLeft + rectWidth,
      rectBottom: rectTop + rectHeight,
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight
    };
  },


  /**
   * Calc scaling dimension
   * @param {Object} position - Mouse position
   * @param {string} corner - corner type
   * @returns {{left: number, top: number, width: number, height: number}}
   * @private
   */
  _resizeCropZone: function _resizeCropZone(_ref3, corner) {
    var x = _ref3.x,
        y = _ref3.y;

    var _getCropzoneRectInfo2 = this._getCropzoneRectInfo(),
        rectWidth = _getCropzoneRectInfo2.rectWidth,
        rectHeight = _getCropzoneRectInfo2.rectHeight,
        rectTop = _getCropzoneRectInfo2.rectTop,
        rectLeft = _getCropzoneRectInfo2.rectLeft,
        rectBottom = _getCropzoneRectInfo2.rectBottom,
        rectRight = _getCropzoneRectInfo2.rectRight,
        canvasWidth = _getCropzoneRectInfo2.canvasWidth,
        canvasHeight = _getCropzoneRectInfo2.canvasHeight;

    var resizeInfoMap = {
      tl: {
        width: rectRight - x,
        height: rectBottom - y,
        leftMaker: function leftMaker(newWidth) {
          return rectRight - newWidth;
        },
        topMaker: function topMaker(newHeight) {
          return rectBottom - newHeight;
        },
        maxWidth: rectRight,
        maxHeight: rectBottom,
        scaleTo: getScaleBasis(rectLeft - x, rectTop - y)
      },
      tr: {
        width: x - rectLeft,
        height: rectBottom - y,
        leftMaker: function leftMaker() {
          return rectLeft;
        },
        topMaker: function topMaker(newHeight) {
          return rectBottom - newHeight;
        },
        maxWidth: canvasWidth - rectLeft,
        maxHeight: rectBottom,
        scaleTo: getScaleBasis(x - rectRight, rectTop - y)
      },
      mt: {
        width: rectWidth,
        height: rectBottom - y,
        leftMaker: function leftMaker() {
          return rectLeft;
        },
        topMaker: function topMaker(newHeight) {
          return rectBottom - newHeight;
        },
        maxWidth: canvasWidth - rectLeft,
        maxHeight: rectBottom,
        scaleTo: 'height'
      },
      ml: {
        width: rectRight - x,
        height: rectHeight,
        leftMaker: function leftMaker(newWidth) {
          return rectRight - newWidth;
        },
        topMaker: function topMaker() {
          return rectTop;
        },
        maxWidth: rectRight,
        maxHeight: canvasHeight - rectTop,
        scaleTo: 'width'
      },
      mr: {
        width: x - rectLeft,
        height: rectHeight,
        leftMaker: function leftMaker() {
          return rectLeft;
        },
        topMaker: function topMaker() {
          return rectTop;
        },
        maxWidth: canvasWidth - rectLeft,
        maxHeight: canvasHeight - rectTop,
        scaleTo: 'width'
      },
      mb: {
        width: rectWidth,
        height: y - rectTop,
        leftMaker: function leftMaker() {
          return rectLeft;
        },
        topMaker: function topMaker() {
          return rectTop;
        },
        maxWidth: canvasWidth - rectLeft,
        maxHeight: canvasHeight - rectTop,
        scaleTo: 'height'
      },
      bl: {
        width: rectRight - x,
        height: y - rectTop,
        leftMaker: function leftMaker(newWidth) {
          return rectRight - newWidth;
        },
        topMaker: function topMaker() {
          return rectTop;
        },
        maxWidth: rectRight,
        maxHeight: canvasHeight - rectTop,
        scaleTo: getScaleBasis(rectLeft - x, y - rectBottom)
      },
      br: {
        width: x - rectLeft,
        height: y - rectTop,
        leftMaker: function leftMaker() {
          return rectLeft;
        },
        topMaker: function topMaker() {
          return rectTop;
        },
        maxWidth: canvasWidth - rectLeft,
        maxHeight: canvasHeight - rectTop,
        scaleTo: getScaleBasis(x - rectRight, y - rectBottom)
      }
    };

    return this.adjustRatioCropzoneSize(resizeInfoMap[corner]);
  },


  /**
   * Return the whether this cropzone is valid
   * @returns {boolean}
   */
  isValid: function isValid() {
    return this.left >= 0 && this.top >= 0 && this.width > 0 && this.height > 0;
  },


  /**
   * Keydown event handler
   * @param {{number}} keyCode - Event keyCode
   * @private
   */
  _onKeyDown: function _onKeyDown(_ref4) {
    var keyCode = _ref4.keyCode;

    if (keyCode === _consts.keyCodes.SHIFT) {
      this._withShiftKey = true;
    }
  },


  /**
   * Keyup event handler
   * @param {{number}} keyCode - Event keyCode
   * @private
   */
  _onKeyUp: function _onKeyUp(_ref5) {
    var keyCode = _ref5.keyCode;

    if (keyCode === _consts.keyCodes.SHIFT) {
      this._withShiftKey = false;
    }
  }
});

exports.default = Cropzone;

/***/ }),

/***/ "./src/js/extension/emboss.js":
/*!************************************!*\
  !*** ./src/js/extension/emboss.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Emboss object
 * @class Emboss
 * @extends {fabric.Image.filters.Convolute}
 * @ignore
 */
var Emboss = _fabric2.default.util.createClass(_fabric2.default.Image.filters.Convolute,
/** @lends Convolute.prototype */{
  /**
   * Filter type
   * @param {String} type
   * @default
   */
  type: 'Emboss',

  /**
   * constructor
   * @override
   */
  initialize: function initialize() {
    this.matrix = [1, 1, 1, 1, 0.7, -1, -1, -1, -1];
  }
}); /**
     * @author NHN. FE Development Team <dl_javascript@nhn.com>
     * @fileoverview Emboss extending fabric.Image.filters.Convolute
     */
exports.default = Emboss;

/***/ }),

/***/ "./src/js/extension/mask.js":
/*!**********************************!*\
  !*** ./src/js/extension/mask.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Mask object
 * @class Mask
 * @extends {fabric.Image.filters.BlendImage}
 * @ignore
 */
var Mask = _fabric2.default.util.createClass(_fabric2.default.Image.filters.BlendImage,
/** @lends Mask.prototype */{
  /**
   * Apply filter to canvas element
   * @param {Object} pipelineState - Canvas element to apply filter
   * @override
   */
  applyTo: function applyTo(pipelineState) {
    if (!this.mask) {
      return;
    }

    var canvas = pipelineState.canvasEl;
    var width = canvas.width,
        height = canvas.height;

    var maskCanvasEl = this._createCanvasOfMask(width, height);
    var ctx = canvas.getContext('2d');
    var maskCtx = maskCanvasEl.getContext('2d');
    var imageData = ctx.getImageData(0, 0, width, height);

    this._drawMask(maskCtx, canvas, ctx);
    this._mapData(maskCtx, imageData, width, height);

    pipelineState.imageData = imageData;
  },


  /**
   * Create canvas of mask image
   * @param {number} width - Width of main canvas
   * @param {number} height - Height of main canvas
   * @returns {HTMLElement} Canvas element
   * @private
   */
  _createCanvasOfMask: function _createCanvasOfMask(width, height) {
    var maskCanvasEl = _fabric2.default.util.createCanvasElement();

    maskCanvasEl.width = width;
    maskCanvasEl.height = height;

    return maskCanvasEl;
  },


  /**
   * Draw mask image on canvas element
   * @param {Object} maskCtx - Context of mask canvas
   * @private
   */
  _drawMask: function _drawMask(maskCtx) {
    var mask = this.mask;

    var maskImg = mask.getElement();
    var angle = mask.angle,
        left = mask.left,
        scaleX = mask.scaleX,
        scaleY = mask.scaleY,
        top = mask.top;


    maskCtx.save();
    maskCtx.translate(left, top);
    maskCtx.rotate(angle * Math.PI / 180);
    maskCtx.scale(scaleX, scaleY);
    maskCtx.drawImage(maskImg, -maskImg.width / 2, -maskImg.height / 2);
    maskCtx.restore();
  },


  /**
   * Map mask image data to source image data
   * @param {Object} maskCtx - Context of mask canvas
   * @param {Object} imageData - Data of source image
   * @param {number} width - Width of main canvas
   * @param {number} height - Height of main canvas
   * @private
   */
  _mapData: function _mapData(maskCtx, imageData, width, height) {
    var data = imageData.data,
        imgHeight = imageData.height,
        imgWidth = imageData.width;

    var sourceData = data;
    var len = imgWidth * imgHeight * 4;
    var maskData = maskCtx.getImageData(0, 0, width, height).data;

    for (var i = 0; i < len; i += 4) {
      sourceData[i + 3] = maskData[i]; // adjust value of alpha data
    }
  }
}); /**
     * @author NHN. FE Development Team <dl_javascript@nhn.com>
     * @fileoverview Mask extending fabric.Image.filters.Mask
     */
exports.default = Mask;

/***/ }),

/***/ "./src/js/extension/sharpen.js":
/*!*************************************!*\
  !*** ./src/js/extension/sharpen.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sharpen object
 * @class Sharpen
 * @extends {fabric.Image.filters.Convolute}
 * @ignore
 */
var Sharpen = _fabric2.default.util.createClass(_fabric2.default.Image.filters.Convolute,
/** @lends Convolute.prototype */{
  /**
   * Filter type
   * @param {String} type
   * @default
   */
  type: 'Sharpen',

  /**
   * constructor
   * @override
   */
  initialize: function initialize() {
    this.matrix = [0, -1, 0, -1, 5, -1, 0, -1, 0];
  }
}); /**
     * @author NHN. FE Development Team <dl_javascript@nhn.com>
     * @fileoverview Sharpen extending fabric.Image.filters.Convolute
     */
exports.default = Sharpen;

/***/ }),

/***/ "./src/js/factory/command.js":
/*!***********************************!*\
  !*** ./src/js/factory/command.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _command = __webpack_require__(/*! @/interface/command */ "./src/js/interface/command.js");

var _command2 = _interopRequireDefault(_command);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commands = {};

/**
 * Create a command
 * @param {string} name - Command name
 * @param {...*} args - Arguments for creating command
 * @returns {Command}
 * @ignore
 */
/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Command factory
 */
function create(name) {
  var actions = commands[name];
  if (actions) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return new _command2.default(actions, args);
  }

  return null;
}

/**
 * Register a command with name as a key
 * @param {Object} command - {name:{string}, execute: {function}, undo: {function}}
 * @param {string} command.name - command name
 * @param {function} command.execute - executable function
 * @param {function} command.undo - undo function
 * @ignore
 */
function register(command) {
  commands[command.name] = command;
}

exports.default = {
  create: create,
  register: register
};

/***/ }),

/***/ "./src/js/factory/errorMessage.js":
/*!****************************************!*\
  !*** ./src/js/factory/errorMessage.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Error-message factory
 */
var types = (0, _util.keyMirror)('UN_IMPLEMENTATION', 'NO_COMPONENT_NAME');
var messages = {
  UN_IMPLEMENTATION: 'Should implement a method: ',
  NO_COMPONENT_NAME: 'Should set a component name'
};
var map = {
  UN_IMPLEMENTATION: function UN_IMPLEMENTATION(methodName) {
    return messages.UN_IMPLEMENTATION + methodName;
  },
  NO_COMPONENT_NAME: function NO_COMPONENT_NAME() {
    return messages.NO_COMPONENT_NAME;
  }
};

exports.default = {
  types: _tuiCodeSnippet2.default.extend({}, types),

  create: function create(type) {
    type = type.toLowerCase();
    var func = map[type];

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return func.apply(undefined, args);
  }
};

/***/ }),

/***/ "./src/js/graphics.js":
/*!****************************!*\
  !*** ./src/js/graphics.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @fileoverview Graphics module
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

var _imageLoader = __webpack_require__(/*! @/component/imageLoader */ "./src/js/component/imageLoader.js");

var _imageLoader2 = _interopRequireDefault(_imageLoader);

var _cropper = __webpack_require__(/*! @/component/cropper */ "./src/js/component/cropper.js");

var _cropper2 = _interopRequireDefault(_cropper);

var _flip = __webpack_require__(/*! @/component/flip */ "./src/js/component/flip.js");

var _flip2 = _interopRequireDefault(_flip);

var _rotation = __webpack_require__(/*! @/component/rotation */ "./src/js/component/rotation.js");

var _rotation2 = _interopRequireDefault(_rotation);

var _freeDrawing = __webpack_require__(/*! @/component/freeDrawing */ "./src/js/component/freeDrawing.js");

var _freeDrawing2 = _interopRequireDefault(_freeDrawing);

var _line = __webpack_require__(/*! @/component/line */ "./src/js/component/line.js");

var _line2 = _interopRequireDefault(_line);

var _text = __webpack_require__(/*! @/component/text */ "./src/js/component/text.js");

var _text2 = _interopRequireDefault(_text);

var _icon = __webpack_require__(/*! @/component/icon */ "./src/js/component/icon.js");

var _icon2 = _interopRequireDefault(_icon);

var _filter = __webpack_require__(/*! @/component/filter */ "./src/js/component/filter.js");

var _filter2 = _interopRequireDefault(_filter);

var _shape = __webpack_require__(/*! @/component/shape */ "./src/js/component/shape.js");

var _shape2 = _interopRequireDefault(_shape);

var _zoom = __webpack_require__(/*! @/component/zoom */ "./src/js/component/zoom.js");

var _zoom2 = _interopRequireDefault(_zoom);

var _cropper3 = __webpack_require__(/*! @/drawingMode/cropper */ "./src/js/drawingMode/cropper.js");

var _cropper4 = _interopRequireDefault(_cropper3);

var _freeDrawing3 = __webpack_require__(/*! @/drawingMode/freeDrawing */ "./src/js/drawingMode/freeDrawing.js");

var _freeDrawing4 = _interopRequireDefault(_freeDrawing3);

var _lineDrawing = __webpack_require__(/*! @/drawingMode/lineDrawing */ "./src/js/drawingMode/lineDrawing.js");

var _lineDrawing2 = _interopRequireDefault(_lineDrawing);

var _shape3 = __webpack_require__(/*! @/drawingMode/shape */ "./src/js/drawingMode/shape.js");

var _shape4 = _interopRequireDefault(_shape3);

var _text3 = __webpack_require__(/*! @/drawingMode/text */ "./src/js/drawingMode/text.js");

var _text4 = _interopRequireDefault(_text3);

var _icon3 = __webpack_require__(/*! @/drawingMode/icon */ "./src/js/drawingMode/icon.js");

var _icon4 = _interopRequireDefault(_icon3);

var _zoom3 = __webpack_require__(/*! @/drawingMode/zoom */ "./src/js/drawingMode/zoom.js");

var _zoom4 = _interopRequireDefault(_zoom3);

var _selectionModifyHelper = __webpack_require__(/*! @/helper/selectionModifyHelper */ "./src/js/helper/selectionModifyHelper.js");

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

var _resize = __webpack_require__(/*! @/component/resize */ "./src/js/component/resize.js");

var _resize2 = _interopRequireDefault(_resize);

var _resize3 = __webpack_require__(/*! @/drawingMode/resize */ "./src/js/drawingMode/resize.js");

var _resize4 = _interopRequireDefault(_resize3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = _tuiCodeSnippet2.default.extend,
    stamp = _tuiCodeSnippet2.default.stamp,
    isArray = _tuiCodeSnippet2.default.isArray,
    isString = _tuiCodeSnippet2.default.isString,
    forEachArray = _tuiCodeSnippet2.default.forEachArray,
    forEachOwnProperties = _tuiCodeSnippet2.default.forEachOwnProperties,
    CustomEvents = _tuiCodeSnippet2.default.CustomEvents;

var DEFAULT_CSS_MAX_WIDTH = 1000;
var DEFAULT_CSS_MAX_HEIGHT = 800;
var EXTRA_PX_FOR_PASTE = 10;

var cssOnly = {
  cssOnly: true
};
var backstoreOnly = {
  backstoreOnly: true
};

/**
 * Graphics class
 * @class
 * @param {string|HTMLElement} wrapper - Wrapper's element or selector
 * @param {Object} [option] - Canvas max width & height of css
 *  @param {number} option.cssMaxWidth - Canvas css-max-width
 *  @param {number} option.cssMaxHeight - Canvas css-max-height
 * @ignore
 */

var Graphics = function () {
  function Graphics(element) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        cssMaxWidth = _ref.cssMaxWidth,
        cssMaxHeight = _ref.cssMaxHeight;

    _classCallCheck(this, Graphics);

    /**
     * Fabric image instance
     * @type {fabric.Image}
     */
    this.canvasImage = null;

    /**
     * Max width of canvas elements
     * @type {number}
     */
    this.cssMaxWidth = cssMaxWidth || DEFAULT_CSS_MAX_WIDTH;

    /**
     * Max height of canvas elements
     * @type {number}
     */
    this.cssMaxHeight = cssMaxHeight || DEFAULT_CSS_MAX_HEIGHT;

    /**
     * cropper Selection Style
     * @type {Object}
     */
    this.cropSelectionStyle = {};

    /**
     * target fabric object for copy paste feature
     * @type {fabric.Object}
     * @private
     */
    this.targetObjectForCopyPaste = null;

    /**
     * Image name
     * @type {string}
     */
    this.imageName = '';

    /**
     * Object Map
     * @type {Object}
     * @private
     */
    this._objects = {};

    /**
     * Fabric-Canvas instance
     * @type {fabric.Canvas}
     * @private
     */
    this._canvas = null;

    /**
     * Drawing mode
     * @type {string}
     * @private
     */
    this._drawingMode = _consts.drawingModes.NORMAL;

    /**
     * DrawingMode map
     * @type {Object.<string, DrawingMode>}
     * @private
     */
    this._drawingModeMap = {};

    /**
     * Component map
     * @type {Object.<string, Component>}
     * @private
     */
    this._componentMap = {};

    /**
     * fabric event handlers
     * @type {Object.<string, function>}
     * @private
     */
    this._handler = {
      onMouseDown: this._onMouseDown.bind(this),
      onObjectAdded: this._onObjectAdded.bind(this),
      onObjectRemoved: this._onObjectRemoved.bind(this),
      onObjectMoved: this._onObjectMoved.bind(this),
      onObjectScaled: this._onObjectScaled.bind(this),
      onObjectModified: this._onObjectModified.bind(this),
      onObjectRotated: this._onObjectRotated.bind(this),
      onObjectSelected: this._onObjectSelected.bind(this),
      onPathCreated: this._onPathCreated.bind(this),
      onSelectionCleared: this._onSelectionCleared.bind(this),
      onSelectionCreated: this._onSelectionCreated.bind(this)
    };

    this._setObjectCachingToFalse();
    this._setCanvasElement(element);
    this._createDrawingModeInstances();
    this._createComponents();
    this._attachCanvasEvents();
    this._attachZoomEvents();
  }

  /**
   * Destroy canvas element
   */


  _createClass(Graphics, [{
    key: 'destroy',
    value: function destroy() {
      var wrapperEl = this._canvas.wrapperEl;


      this._canvas.clear();

      wrapperEl.parentNode.removeChild(wrapperEl);

      this._detachZoomEvents();
    }

    /**
     * Attach zoom events
     */

  }, {
    key: '_attachZoomEvents',
    value: function _attachZoomEvents() {
      var zoom = this.getComponent(_consts.componentNames.ZOOM);

      zoom.attachKeyboardZoomEvents();
    }

    /**
     * Detach zoom events
     */

  }, {
    key: '_detachZoomEvents',
    value: function _detachZoomEvents() {
      var zoom = this.getComponent(_consts.componentNames.ZOOM);

      zoom.detachKeyboardZoomEvents();
    }

    /**
     * Deactivates all objects on canvas
     * @returns {Graphics} this
     */

  }, {
    key: 'deactivateAll',
    value: function deactivateAll() {
      this._canvas.discardActiveObject();

      return this;
    }

    /**
     * Renders all objects on canvas
     * @returns {Graphics} this
     */

  }, {
    key: 'renderAll',
    value: function renderAll() {
      this._canvas.renderAll();

      return this;
    }

    /**
     * Adds objects on canvas
     * @param {Object|Array} objects - objects
     */

  }, {
    key: 'add',
    value: function add(objects) {
      var _canvas;

      var theArgs = [];
      if (isArray(objects)) {
        theArgs = objects;
      } else {
        theArgs.push(objects);
      }

      (_canvas = this._canvas).add.apply(_canvas, theArgs);
    }

    /**
     * Removes the object or group
     * @param {Object} target - graphics object or group
     * @returns {boolean} true if contains or false
     */

  }, {
    key: 'contains',
    value: function contains(target) {
      return this._canvas.contains(target);
    }

    /**
     * Gets all objects or group
     * @returns {Array} all objects, shallow copy
     */

  }, {
    key: 'getObjects',
    value: function getObjects() {
      return this._canvas.getObjects().slice();
    }

    /**
     * Get an object by id
     * @param {number} id - object id
     * @returns {fabric.Object} object corresponding id
     */

  }, {
    key: 'getObject',
    value: function getObject(id) {
      return this._objects[id];
    }

    /**
     * Removes the object or group
     * @param {Object} target - graphics object or group
     */

  }, {
    key: 'remove',
    value: function remove(target) {
      this._canvas.remove(target);
    }

    /**
     * Removes all object or group
     * @param {boolean} includesBackground - remove the background image or not
     * @returns {Array} all objects array which is removed
     */

  }, {
    key: 'removeAll',
    value: function removeAll(includesBackground) {
      var canvas = this._canvas;
      var objects = canvas.getObjects().slice();
      canvas.remove.apply(canvas, this._canvas.getObjects());

      if (includesBackground) {
        canvas.clear();
      }

      return objects;
    }

    /**
     * Removes an object or group by id
     * @param {number} id - object id
     * @returns {Array} removed objects
     */

  }, {
    key: 'removeObjectById',
    value: function removeObjectById(id) {
      var objects = [];
      var canvas = this._canvas;
      var target = this.getObject(id);
      var isValidGroup = target && target.isType('group') && !target.isEmpty();

      if (isValidGroup) {
        canvas.discardActiveObject(); // restore states for each objects
        target.forEachObject(function (obj) {
          objects.push(obj);
          canvas.remove(obj);
        });
      } else if (canvas.contains(target)) {
        objects.push(target);
        canvas.remove(target);
      }

      return objects;
    }

    /**
     * Get an id by object instance
     * @param {fabric.Object} object object
     * @returns {number} object id if it exists or null
     */

  }, {
    key: 'getObjectId',
    value: function getObjectId(object) {
      var key = null;
      for (key in this._objects) {
        if (this._objects.hasOwnProperty(key)) {
          if (object === this._objects[key]) {
            return key;
          }
        }
      }

      return null;
    }

    /**
     * Gets an active object or group
     * @returns {Object} active object or group instance
     */

  }, {
    key: 'getActiveObject',
    value: function getActiveObject() {
      return this._canvas._activeObject;
    }

    /**
     * Returns the object ID to delete the object.
     * @returns {number} object id for remove
     */

  }, {
    key: 'getActiveObjectIdForRemove',
    value: function getActiveObjectIdForRemove() {
      var activeObject = this.getActiveObject();
      var type = activeObject.type,
          left = activeObject.left,
          top = activeObject.top;

      var isSelection = type === 'activeSelection';

      if (isSelection) {
        var group = new _fabric2.default.Group([].concat(activeObject.getObjects()), {
          left: left,
          top: top
        });

        return this._addFabricObject(group);
      }

      return this.getObjectId(activeObject);
    }

    /**
     * Verify that you are ready to erase the object.
     * @returns {boolean} ready for object remove
     */

  }, {
    key: 'isReadyRemoveObject',
    value: function isReadyRemoveObject() {
      var activeObject = this.getActiveObject();

      return activeObject && !activeObject.isEditing;
    }

    /**
     * Gets an active group object
     * @returns {Object} active group object instance
     */

  }, {
    key: 'getActiveObjects',
    value: function getActiveObjects() {
      var activeObject = this._canvas._activeObject;

      return activeObject && activeObject.type === 'activeSelection' ? activeObject : null;
    }

    /**
     * Get Active object Selection from object ids
     * @param {Array.<Object>} objects - fabric objects
     * @returns {Object} target - target object group
     */

  }, {
    key: 'getActiveSelectionFromObjects',
    value: function getActiveSelectionFromObjects(objects) {
      var canvas = this.getCanvas();

      return new _fabric2.default.ActiveSelection(objects, { canvas: canvas });
    }

    /**
     * Activates an object or group
     * @param {Object} target - target object or group
     */

  }, {
    key: 'setActiveObject',
    value: function setActiveObject(target) {
      this._canvas.setActiveObject(target);
    }

    /**
     * Set Crop selection style
     * @param {Object} style - Selection styles
     */

  }, {
    key: 'setCropSelectionStyle',
    value: function setCropSelectionStyle(style) {
      this.cropSelectionStyle = style;
    }

    /**
     * Get component
     * @param {string} name - Component name
     * @returns {Component}
     */

  }, {
    key: 'getComponent',
    value: function getComponent(name) {
      return this._componentMap[name];
    }

    /**
     * Get current drawing mode
     * @returns {string}
     */

  }, {
    key: 'getDrawingMode',
    value: function getDrawingMode() {
      return this._drawingMode;
    }

    /**
     * Start a drawing mode. If the current mode is not 'NORMAL', 'stopDrawingMode()' will be called first.
     * @param {String} mode Can be one of <I>'CROPPER', 'FREE_DRAWING', 'LINE', 'TEXT', 'SHAPE'</I>
     * @param {Object} [option] parameters of drawing mode, it's available with 'FREE_DRAWING', 'LINE_DRAWING'
     *  @param {Number} [option.width] brush width
     *  @param {String} [option.color] brush color
     * @returns {boolean} true if success or false
     */

  }, {
    key: 'startDrawingMode',
    value: function startDrawingMode(mode, option) {
      if (this._isSameDrawingMode(mode)) {
        return true;
      }

      // If the current mode is not 'NORMAL', 'stopDrawingMode()' will be called first.
      this.stopDrawingMode();

      var drawingModeInstance = this._getDrawingModeInstance(mode);
      if (drawingModeInstance && drawingModeInstance.start) {
        drawingModeInstance.start(this, option);

        this._drawingMode = mode;
      }

      return !!drawingModeInstance;
    }

    /**
     * Stop the current drawing mode and back to the 'NORMAL' mode
     */

  }, {
    key: 'stopDrawingMode',
    value: function stopDrawingMode() {
      if (this._isSameDrawingMode(_consts.drawingModes.NORMAL)) {
        return;
      }

      var drawingModeInstance = this._getDrawingModeInstance(this.getDrawingMode());
      if (drawingModeInstance && drawingModeInstance.end) {
        drawingModeInstance.end(this);
      }
      this._drawingMode = _consts.drawingModes.NORMAL;
    }

    /**
     * Change zoom of canvas
     * @param {{x: number, y: number}} center - center of zoom
     * @param {number} zoomLevel - zoom level
     */

  }, {
    key: 'zoom',
    value: function zoom(_ref2, zoomLevel) {
      var x = _ref2.x,
          y = _ref2.y;

      var zoom = this.getComponent(_consts.componentNames.ZOOM);

      zoom.zoom({ x: x, y: y }, zoomLevel);
    }

    /**
     * Get zoom mode
     * @returns {string}
     */

  }, {
    key: 'getZoomMode',
    value: function getZoomMode() {
      var zoom = this.getComponent(_consts.componentNames.ZOOM);

      return zoom.mode;
    }

    /**
     * Start zoom-in mode
     */

  }, {
    key: 'startZoomInMode',
    value: function startZoomInMode() {
      var zoom = this.getComponent(_consts.componentNames.ZOOM);

      zoom.startZoomInMode();
    }

    /**
     * Stop zoom-in mode
     */

  }, {
    key: 'endZoomInMode',
    value: function endZoomInMode() {
      var zoom = this.getComponent(_consts.componentNames.ZOOM);

      zoom.endZoomInMode();
    }

    /**
     * Zoom out one step
     */

  }, {
    key: 'zoomOut',
    value: function zoomOut() {
      var zoom = this.getComponent(_consts.componentNames.ZOOM);

      zoom.zoomOut();
    }

    /**
     * Start hand mode
     */

  }, {
    key: 'startHandMode',
    value: function startHandMode() {
      var zoom = this.getComponent(_consts.componentNames.ZOOM);

      zoom.startHandMode();
    }

    /**
     * Stop hand mode
     */

  }, {
    key: 'endHandMode',
    value: function endHandMode() {
      var zoom = this.getComponent(_consts.componentNames.ZOOM);

      zoom.endHandMode();
    }

    /**
     * Zoom reset
     */

  }, {
    key: 'resetZoom',
    value: function resetZoom() {
      var zoom = this.getComponent(_consts.componentNames.ZOOM);

      zoom.resetZoom();
    }

    /**
     * To data url from canvas
     * @param {Object} options - options for toDataURL
     *   @param {String} [options.format=png] The format of the output image. Either "jpeg" or "png"
     *   @param {Number} [options.quality=1] Quality level (0..1). Only used for jpeg.
     *   @param {Number} [options.multiplier=1] Multiplier to scale by
     *   @param {Number} [options.left] Cropping left offset. Introduced in fabric v1.2.14
     *   @param {Number} [options.top] Cropping top offset. Introduced in fabric v1.2.14
     *   @param {Number} [options.width] Cropping width. Introduced in fabric v1.2.14
     *   @param {Number} [options.height] Cropping height. Introduced in fabric v1.2.14
     * @returns {string} A DOMString containing the requested data URI.
     */

  }, {
    key: 'toDataURL',
    value: function toDataURL(options) {
      var cropper = this.getComponent(_consts.componentNames.CROPPER);
      cropper.changeVisibility(false);

      var dataUrl = this._canvas && this._canvas.toDataURL(options);
      cropper.changeVisibility(true);

      return dataUrl;
    }

    /**
     * Save image(background) of canvas
     * @param {string} name - Name of image
     * @param {?fabric.Image} canvasImage - Fabric image instance
     */

  }, {
    key: 'setCanvasImage',
    value: function setCanvasImage(name, canvasImage) {
      if (canvasImage) {
        stamp(canvasImage);
      }
      this.imageName = name;
      this.canvasImage = canvasImage;
    }

    /**
     * Set css max dimension
     * @param {{width: number, height: number}} maxDimension - Max width & Max height
     */

  }, {
    key: 'setCssMaxDimension',
    value: function setCssMaxDimension(maxDimension) {
      this.cssMaxWidth = maxDimension.width || this.cssMaxWidth;
      this.cssMaxHeight = maxDimension.height || this.cssMaxHeight;
    }

    /**
     * Adjust canvas dimension with scaling image
     */

  }, {
    key: 'adjustCanvasDimension',
    value: function adjustCanvasDimension() {
      this.adjustCanvasDimensionBase(this.canvasImage.scale(1));
    }
  }, {
    key: 'adjustCanvasDimensionBase',
    value: function adjustCanvasDimensionBase() {
      var canvasImage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!canvasImage) {
        canvasImage = this.canvasImage;
      }

      var _canvasImage$getBound = canvasImage.getBoundingRect(),
          width = _canvasImage$getBound.width,
          height = _canvasImage$getBound.height;

      var maxDimension = this._calcMaxDimension(width, height);

      this.setCanvasCssDimension({
        width: '100%',
        height: '100%', // Set height '' for IE9
        'max-width': maxDimension.width + 'px',
        'max-height': maxDimension.height + 'px'
      });

      this.setCanvasBackstoreDimension({
        width: width,
        height: height
      });
      this._canvas.centerObject(canvasImage);
    }

    /**
     * Set canvas dimension - css only
     *  {@link http://fabricjs.com/docs/fabric.Canvas.html#setDimensions}
     * @param {Object} dimension - Canvas css dimension
     */

  }, {
    key: 'setCanvasCssDimension',
    value: function setCanvasCssDimension(dimension) {
      this._canvas.setDimensions(dimension, cssOnly);
    }

    /**
     * Set canvas dimension - backstore only
     *  {@link http://fabricjs.com/docs/fabric.Canvas.html#setDimensions}
     * @param {Object} dimension - Canvas backstore dimension
     */

  }, {
    key: 'setCanvasBackstoreDimension',
    value: function setCanvasBackstoreDimension(dimension) {
      this._canvas.setDimensions(dimension, backstoreOnly);
    }

    /**
     * Set image properties
     * {@link http://fabricjs.com/docs/fabric.Image.html#set}
     * @param {Object} setting - Image properties
     * @param {boolean} [withRendering] - If true, The changed image will be reflected in the canvas
     */

  }, {
    key: 'setImageProperties',
    value: function setImageProperties(setting, withRendering) {
      var canvasImage = this.canvasImage;


      if (!canvasImage) {
        return;
      }

      canvasImage.set(setting).setCoords();
      if (withRendering) {
        this._canvas.renderAll();
      }
    }

    /**
     * Returns canvas element of fabric.Canvas[[lower-canvas]]
     * @returns {HTMLCanvasElement}
     */

  }, {
    key: 'getCanvasElement',
    value: function getCanvasElement() {
      return this._canvas.getElement();
    }

    /**
     * Get fabric.Canvas instance
     * @returns {fabric.Canvas}
     */

  }, {
    key: 'getCanvas',
    value: function getCanvas() {
      return this._canvas;
    }

    /**
     * Get canvasImage (fabric.Image instance)
     * @returns {fabric.Image}
     */

  }, {
    key: 'getCanvasImage',
    value: function getCanvasImage() {
      return this.canvasImage;
    }

    /**
     * Get image name
     * @returns {string}
     */

  }, {
    key: 'getImageName',
    value: function getImageName() {
      return this.imageName;
    }

    /**
     * Add image object on canvas
     * @param {string} imgUrl - Image url to make object
     * @returns {Promise}
     */

  }, {
    key: 'addImageObject',
    value: function addImageObject(imgUrl) {
      var _this = this;

      var callback = this._callbackAfterLoadingImageObject.bind(this);

      return new _util.Promise(function (resolve) {
        _fabric2.default.Image.fromURL(imgUrl, function (image) {
          callback(image);
          resolve(_this.createObjectProperties(image));
        }, {
          crossOrigin: 'Anonymous'
        });
      });
    }

    /**
     * Get center position of canvas
     * @returns {Object} {left, top}
     */

  }, {
    key: 'getCenter',
    value: function getCenter() {
      return this._canvas.getCenter();
    }

    /**
     * Get cropped rect
     * @returns {Object} rect
     */

  }, {
    key: 'getCropzoneRect',
    value: function getCropzoneRect() {
      return this.getComponent(_consts.componentNames.CROPPER).getCropzoneRect();
    }

    /**
     * Get cropped rect
     * @param {number} [mode] cropzone rect mode
     */

  }, {
    key: 'setCropzoneRect',
    value: function setCropzoneRect(mode) {
      this.getComponent(_consts.componentNames.CROPPER).setCropzoneRect(mode);
    }

    /**
     * Get cropped image data
     * @param {Object} cropRect cropzone rect
     *  @param {Number} cropRect.left left position
     *  @param {Number} cropRect.top top position
     *  @param {Number} cropRect.width width
     *  @param {Number} cropRect.height height
     * @returns {?{imageName: string, url: string}} cropped Image data
     */

  }, {
    key: 'getCroppedImageData',
    value: function getCroppedImageData(cropRect) {
      return this.getComponent(_consts.componentNames.CROPPER).getCroppedImageData(cropRect);
    }

    /**
     * Set brush option
     * @param {Object} option brush option
     *  @param {Number} option.width width
     *  @param {String} option.color color like 'FFFFFF', 'rgba(0, 0, 0, 0.5)'
     */

  }, {
    key: 'setBrush',
    value: function setBrush(option) {
      var drawingMode = this._drawingMode;
      var compName = _consts.componentNames.FREE_DRAWING;

      if (drawingMode === _consts.drawingModes.LINE_DRAWING) {
        compName = _consts.componentNames.LINE;
      }

      this.getComponent(compName).setBrush(option);
    }

    /**
     * Set states of current drawing shape
     * @param {string} type - Shape type (ex: 'rect', 'circle', 'triangle')
     * @param {Object} [options] - Shape options
     *      @param {(ShapeFillOption | string)} [options.fill] - {@link ShapeFillOption} or
     *        Shape foreground color (ex: '#fff', 'transparent')
     *      @param {string} [options.stoke] - Shape outline color
     *      @param {number} [options.strokeWidth] - Shape outline width
     *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
     *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
     *      @param {number} [options.rx] - Radius x value (When type option is 'circle', this options can use)
     *      @param {number} [options.ry] - Radius y value (When type option is 'circle', this options can use)
     *      @param {number} [options.isRegular] - Whether resizing shape has 1:1 ratio or not
     */

  }, {
    key: 'setDrawingShape',
    value: function setDrawingShape(type, options) {
      this.getComponent(_consts.componentNames.SHAPE).setStates(type, options);
    }

    /**
     * Set style of current drawing icon
     * @param {string} type - icon type (ex: 'icon-arrow', 'icon-star')
     * @param {Object} [iconColor] - Icon color
     */

  }, {
    key: 'setIconStyle',
    value: function setIconStyle(type, iconColor) {
      this.getComponent(_consts.componentNames.ICON).setStates(type, iconColor);
    }

    /**
     * Register icon paths
     * @param {Object} pathInfos - Path infos
     *  @param {string} pathInfos.key - key
     *  @param {string} pathInfos.value - value
     */

  }, {
    key: 'registerPaths',
    value: function registerPaths(pathInfos) {
      this.getComponent(_consts.componentNames.ICON).registerPaths(pathInfos);
    }

    /**
     * Change cursor style
     * @param {string} cursorType - cursor type
     */

  }, {
    key: 'changeCursor',
    value: function changeCursor(cursorType) {
      var canvas = this.getCanvas();
      canvas.defaultCursor = cursorType;
      canvas.renderAll();
    }

    /**
     * Whether it has the filter or not
     * @param {string} type - Filter type
     * @returns {boolean} true if it has the filter
     */

  }, {
    key: 'hasFilter',
    value: function hasFilter(type) {
      return this.getComponent(_consts.componentNames.FILTER).hasFilter(type);
    }

    /**
     * Set selection style of fabric object by init option
     * @param {Object} styles - Selection styles
     */

  }, {
    key: 'setSelectionStyle',
    value: function setSelectionStyle(styles) {
      extend(_consts.fObjectOptions.SELECTION_STYLE, styles);
    }

    /**
     * Set object properties
     * @param {number} id - object id
     * @param {Object} props - props
     *     @param {string} [props.fill] Color
     *     @param {string} [props.fontFamily] Font type for text
     *     @param {number} [props.fontSize] Size
     *     @param {string} [props.fontStyle] Type of inclination (normal / italic)
     *     @param {string} [props.fontWeight] Type of thicker or thinner looking (normal / bold)
     *     @param {string} [props.textAlign] Type of text align (left / center / right)
     *     @param {string} [props.textDecoration] Type of line (underline / line-through / overline)
     * @returns {Object} applied properties
     */

  }, {
    key: 'setObjectProperties',
    value: function setObjectProperties(id, props) {
      var object = this.getObject(id);
      var clone = extend({}, props);

      object.set(clone);

      object.setCoords();

      this.getCanvas().renderAll();

      return clone;
    }

    /**
     * Get object properties corresponding key
     * @param {number} id - object id
     * @param {Array<string>|ObjectProps|string} keys - property's key
     * @returns {Object} properties
     */

  }, {
    key: 'getObjectProperties',
    value: function getObjectProperties(id, keys) {
      var object = this.getObject(id);
      var props = {};

      if (isString(keys)) {
        props[keys] = object[keys];
      } else if (isArray(keys)) {
        forEachArray(keys, function (value) {
          props[value] = object[value];
        });
      } else {
        forEachOwnProperties(keys, function (value, key) {
          props[key] = object[key];
        });
      }

      return props;
    }

    /**
     * Get object position by originX, originY
     * @param {number} id - object id
     * @param {string} originX - can be 'left', 'center', 'right'
     * @param {string} originY - can be 'top', 'center', 'bottom'
     * @returns {Object} {{x:number, y: number}} position by origin if id is valid, or null
     */

  }, {
    key: 'getObjectPosition',
    value: function getObjectPosition(id, originX, originY) {
      var targetObj = this.getObject(id);
      if (!targetObj) {
        return null;
      }

      return targetObj.getPointByOrigin(originX, originY);
    }

    /**
     * Set object position  by originX, originY
     * @param {number} id - object id
     * @param {Object} posInfo - position object
     *  @param {number} posInfo.x - x position
     *  @param {number} posInfo.y - y position
     *  @param {string} posInfo.originX - can be 'left', 'center', 'right'
     *  @param {string} posInfo.originY - can be 'top', 'center', 'bottom'
     * @returns {boolean} true if target id is valid or false
     */

  }, {
    key: 'setObjectPosition',
    value: function setObjectPosition(id, posInfo) {
      var targetObj = this.getObject(id);
      var x = posInfo.x,
          y = posInfo.y,
          originX = posInfo.originX,
          originY = posInfo.originY;

      if (!targetObj) {
        return false;
      }

      var targetOrigin = targetObj.getPointByOrigin(originX, originY);
      var centerOrigin = targetObj.getPointByOrigin('center', 'center');
      var diffX = centerOrigin.x - targetOrigin.x;
      var diffY = centerOrigin.y - targetOrigin.y;

      targetObj.set({
        left: x + diffX,
        top: y + diffY
      });

      targetObj.setCoords();

      return true;
    }

    /**
     * Get the canvas size
     * @returns {Object} {{width: number, height: number}} image size
     */

  }, {
    key: 'getCanvasSize',
    value: function getCanvasSize() {
      var image = this.getCanvasImage();

      return {
        width: image ? image.width : 0,
        height: image ? image.height : 0
      };
    }

    /**
     * Create fabric static canvas
     * @returns {Object} {{width: number, height: number}} image size
     */

  }, {
    key: 'createStaticCanvas',
    value: function createStaticCanvas() {
      var staticCanvas = new _fabric2.default.StaticCanvas();

      staticCanvas.set({
        enableRetinaScaling: false
      });

      return staticCanvas;
    }

    /**
     * Get a DrawingMode instance
     * @param {string} modeName - DrawingMode Class Name
     * @returns {DrawingMode} DrawingMode instance
     * @private
     */

  }, {
    key: '_getDrawingModeInstance',
    value: function _getDrawingModeInstance(modeName) {
      return this._drawingModeMap[modeName];
    }

    /**
     * Set object caching to false. This brought many bugs when draw Shape & cropzone
     * @see http://fabricjs.com/fabric-object-caching
     * @private
     */

  }, {
    key: '_setObjectCachingToFalse',
    value: function _setObjectCachingToFalse() {
      _fabric2.default.Object.prototype.objectCaching = false;
    }

    /**
     * Set canvas element to fabric.Canvas
     * @param {Element|string} element - Wrapper or canvas element or selector
     * @private
     */

  }, {
    key: '_setCanvasElement',
    value: function _setCanvasElement(element) {
      var selectedElement = void 0;
      var canvasElement = void 0;

      if (element.nodeType) {
        selectedElement = element;
      } else {
        selectedElement = document.querySelector(element);
      }

      if (selectedElement.nodeName.toUpperCase() !== 'CANVAS') {
        canvasElement = document.createElement('canvas');
        selectedElement.appendChild(canvasElement);
      }

      this._canvas = new _fabric2.default.Canvas(canvasElement, {
        containerClass: 'tui-image-editor-canvas-container',
        enableRetinaScaling: false
      });
    }

    /**
     * Creates DrawingMode instances
     * @private
     */

  }, {
    key: '_createDrawingModeInstances',
    value: function _createDrawingModeInstances() {
      this._register(this._drawingModeMap, new _cropper4.default());
      this._register(this._drawingModeMap, new _freeDrawing4.default());
      this._register(this._drawingModeMap, new _lineDrawing2.default());
      this._register(this._drawingModeMap, new _shape4.default());
      this._register(this._drawingModeMap, new _text4.default());
      this._register(this._drawingModeMap, new _icon4.default());
      this._register(this._drawingModeMap, new _zoom4.default());
      this._register(this._drawingModeMap, new _resize4.default());
    }

    /**
     * Create components
     * @private
     */

  }, {
    key: '_createComponents',
    value: function _createComponents() {
      this._register(this._componentMap, new _imageLoader2.default(this));
      this._register(this._componentMap, new _cropper2.default(this));
      this._register(this._componentMap, new _flip2.default(this));
      this._register(this._componentMap, new _rotation2.default(this));
      this._register(this._componentMap, new _freeDrawing2.default(this));
      this._register(this._componentMap, new _line2.default(this));
      this._register(this._componentMap, new _text2.default(this));
      this._register(this._componentMap, new _icon2.default(this));
      this._register(this._componentMap, new _filter2.default(this));
      this._register(this._componentMap, new _shape2.default(this));
      this._register(this._componentMap, new _zoom2.default(this));
      this._register(this._componentMap, new _resize2.default(this));
    }

    /**
     * Register component
     * @param {Object} map - map object
     * @param {Object} module - module which has getName method
     * @private
     */

  }, {
    key: '_register',
    value: function _register(map, module) {
      map[module.getName()] = module;
    }

    /**
     * Get the current drawing mode is same with given mode
     * @param {string} mode drawing mode
     * @returns {boolean} true if same or false
     */

  }, {
    key: '_isSameDrawingMode',
    value: function _isSameDrawingMode(mode) {
      return this.getDrawingMode() === mode;
    }

    /**
     * Calculate max dimension of canvas
     * The css-max dimension is dynamically decided with maintaining image ratio
     * The css-max dimension is lower than canvas dimension (attribute of canvas, not css)
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @returns {{width: number, height: number}} - Max width & Max height
     * @private
     */

  }, {
    key: '_calcMaxDimension',
    value: function _calcMaxDimension(width, height) {
      var wScaleFactor = this.cssMaxWidth / width;
      var hScaleFactor = this.cssMaxHeight / height;
      var cssMaxWidth = Math.min(width, this.cssMaxWidth);
      var cssMaxHeight = Math.min(height, this.cssMaxHeight);

      if (wScaleFactor < 1 && wScaleFactor < hScaleFactor) {
        cssMaxWidth = width * wScaleFactor;
        cssMaxHeight = height * wScaleFactor;
      } else if (hScaleFactor < 1 && hScaleFactor < wScaleFactor) {
        cssMaxWidth = width * hScaleFactor;
        cssMaxHeight = height * hScaleFactor;
      }

      return {
        width: Math.floor(cssMaxWidth),
        height: Math.floor(cssMaxHeight)
      };
    }

    /**
     * Callback function after loading image
     * @param {fabric.Image} obj - Fabric image object
     * @private
     */

  }, {
    key: '_callbackAfterLoadingImageObject',
    value: function _callbackAfterLoadingImageObject(obj) {
      var centerPos = this.getCanvasImage().getCenterPoint();

      obj.set(_consts.fObjectOptions.SELECTION_STYLE);
      obj.set({
        left: centerPos.x,
        top: centerPos.y,
        crossOrigin: 'Anonymous'
      });

      this.getCanvas().add(obj).setActiveObject(obj);
    }

    /**
     * Attach canvas's events
     */

  }, {
    key: '_attachCanvasEvents',
    value: function _attachCanvasEvents() {
      var canvas = this._canvas;
      var handler = this._handler;
      canvas.on({
        'mouse:down': handler.onMouseDown,
        'object:added': handler.onObjectAdded,
        'object:removed': handler.onObjectRemoved,
        'object:moving': handler.onObjectMoved,
        'object:scaling': handler.onObjectScaled,
        'object:modified': handler.onObjectModified,
        'object:rotating': handler.onObjectRotated,
        'path:created': handler.onPathCreated,
        'selection:cleared': handler.onSelectionCleared,
        'selection:created': handler.onSelectionCreated,
        'selection:updated': handler.onObjectSelected
      });
    }

    /**
     * "mouse:down" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onMouseDown',
    value: function _onMouseDown(fEvent) {
      var _this2 = this;

      var event = fEvent.e,
          target = fEvent.target;

      var originPointer = this._canvas.getPointer(event);

      if (target) {
        var type = target.type;

        var undoData = (0, _selectionModifyHelper.makeSelectionUndoData)(target, function (item) {
          return (0, _selectionModifyHelper.makeSelectionUndoDatum)(_this2.getObjectId(item), item, type === 'activeSelection');
        });

        (0, _selectionModifyHelper.setCachedUndoDataForDimension)(undoData);
      }

      this.fire(_consts.eventNames.MOUSE_DOWN, event, originPointer);
    }

    /**
     * "object:added" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onObjectAdded',
    value: function _onObjectAdded(fEvent) {
      var obj = fEvent.target;
      if (obj.isType('cropzone')) {
        return;
      }

      this._addFabricObject(obj);
    }

    /**
     * "object:removed" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onObjectRemoved',
    value: function _onObjectRemoved(fEvent) {
      var obj = fEvent.target;

      this._removeFabricObject(stamp(obj));
    }

    /**
     * "object:moving" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onObjectMoved',
    value: function _onObjectMoved(fEvent) {
      var _this3 = this;

      this._lazyFire(_consts.eventNames.OBJECT_MOVED, function (object) {
        return _this3.createObjectProperties(object);
      }, fEvent.target);
    }

    /**
     * "object:scaling" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onObjectScaled',
    value: function _onObjectScaled(fEvent) {
      var _this4 = this;

      this._lazyFire(_consts.eventNames.OBJECT_SCALED, function (object) {
        return _this4.createObjectProperties(object);
      }, fEvent.target);
    }

    /**
     * "object:modified" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onObjectModified',
    value: function _onObjectModified(fEvent) {
      var target = fEvent.target;

      if (target.type === 'activeSelection') {
        var items = target.getObjects();

        items.forEach(function (item) {
          return item.fire('modifiedInGroup', target);
        });
      }

      this.fire(_consts.eventNames.OBJECT_MODIFIED, target, this.getObjectId(target));
    }

    /**
     * "object:rotating" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onObjectRotated',
    value: function _onObjectRotated(fEvent) {
      var _this5 = this;

      this._lazyFire(_consts.eventNames.OBJECT_ROTATED, function (object) {
        return _this5.createObjectProperties(object);
      }, fEvent.target);
    }

    /**
     * Lazy event emitter
     * @param {string} eventName - event name
     * @param {Function} paramsMaker - make param function
     * @param {Object} [target] - Object of the event owner.
     * @private
     */

  }, {
    key: '_lazyFire',
    value: function _lazyFire(eventName, paramsMaker, target) {
      var _this6 = this;

      var existEventDelegation = target && target.canvasEventDelegation;
      var delegationState = existEventDelegation ? target.canvasEventDelegation(eventName) : 'none';

      if (delegationState === 'unregistered') {
        target.canvasEventRegister(eventName, function (object) {
          _this6.fire(eventName, paramsMaker(object));
        });
      }

      if (delegationState === 'none') {
        this.fire(eventName, paramsMaker(target));
      }
    }

    /**
     * "object:selected" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onObjectSelected',
    value: function _onObjectSelected(fEvent) {
      var target = fEvent.target;

      var params = this.createObjectProperties(target);

      this.fire(_consts.eventNames.OBJECT_ACTIVATED, params);
    }

    /**
     * "path:created" canvas event handler
     * @param {{path: fabric.Path}} obj - Path object
     * @private
     */

  }, {
    key: '_onPathCreated',
    value: function _onPathCreated(obj) {
      var _obj$path$getCenterPo = obj.path.getCenterPoint(),
          left = _obj$path$getCenterPo.x,
          top = _obj$path$getCenterPo.y;

      obj.path.set(extend({
        left: left,
        top: top
      }, _consts.fObjectOptions.SELECTION_STYLE));

      var params = this.createObjectProperties(obj.path);

      this.fire(_consts.eventNames.ADD_OBJECT, params);
    }

    /**
     * "selction:cleared" canvas event handler
     * @private
     */

  }, {
    key: '_onSelectionCleared',
    value: function _onSelectionCleared() {
      this.fire(_consts.eventNames.SELECTION_CLEARED);
    }

    /**
     * "selction:created" canvas event handler
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event
     * @private
     */

  }, {
    key: '_onSelectionCreated',
    value: function _onSelectionCreated(fEvent) {
      var target = fEvent.target;

      var params = this.createObjectProperties(target);

      this.fire(_consts.eventNames.OBJECT_ACTIVATED, params);
      this.fire(_consts.eventNames.SELECTION_CREATED, fEvent.target);
    }

    /**
     * Canvas discard selection all
     */

  }, {
    key: 'discardSelection',
    value: function discardSelection() {
      this._canvas.discardActiveObject();
      this._canvas.renderAll();
    }

    /**
     * Canvas Selectable status change
     * @param {boolean} selectable - expect status
     */

  }, {
    key: 'changeSelectableAll',
    value: function changeSelectableAll(selectable) {
      this._canvas.forEachObject(function (obj) {
        obj.selectable = selectable;
        obj.hoverCursor = selectable ? 'move' : 'crosshair';
      });
    }

    /**
     * Return object's properties
     * @param {fabric.Object} obj - fabric object
     * @returns {Object} properties object
     */

  }, {
    key: 'createObjectProperties',
    value: function createObjectProperties(obj) {
      var predefinedKeys = ['left', 'top', 'width', 'height', 'fill', 'stroke', 'strokeWidth', 'opacity', 'angle'];
      var props = {
        id: stamp(obj),
        type: obj.type
      };

      extend(props, (0, _util.getProperties)(obj, predefinedKeys));

      if ((0, _util.includes)(['i-text', 'text'], obj.type)) {
        extend(props, this._createTextProperties(obj, props));
      } else if ((0, _util.includes)(['rect', 'triangle', 'circle'], obj.type)) {
        var shapeComp = this.getComponent(_consts.componentNames.SHAPE);
        extend(props, {
          fill: shapeComp.makeFillPropertyForUserEvent(obj)
        });
      }

      return props;
    }

    /**
     * Get text object's properties
     * @param {fabric.Object} obj - fabric text object
     * @param {Object} props - properties
     * @returns {Object} properties object
     */

  }, {
    key: '_createTextProperties',
    value: function _createTextProperties(obj) {
      var predefinedKeys = ['text', 'fontFamily', 'fontSize', 'fontStyle', 'textAlign', 'textDecoration', 'fontWeight'];
      var props = {};
      extend(props, (0, _util.getProperties)(obj, predefinedKeys));

      return props;
    }

    /**
     * Add object array by id
     * @param {fabric.Object} obj - fabric object
     * @returns {number} object id
     */

  }, {
    key: '_addFabricObject',
    value: function _addFabricObject(obj) {
      var id = stamp(obj);
      this._objects[id] = obj;

      return id;
    }

    /**
     * Remove an object in array yb id
     * @param {number} id - object id
     */

  }, {
    key: '_removeFabricObject',
    value: function _removeFabricObject(id) {
      delete this._objects[id];
    }

    /**
     * Reset targetObjectForCopyPaste value from activeObject
     */

  }, {
    key: 'resetTargetObjectForCopyPaste',
    value: function resetTargetObjectForCopyPaste() {
      var activeObject = this.getActiveObject();

      if (activeObject) {
        this.targetObjectForCopyPaste = activeObject;
      }
    }

    /**
     * Paste fabric object
     * @returns {Promise}
     */

  }, {
    key: 'pasteObject',
    value: function pasteObject() {
      var _this7 = this;

      if (!this.targetObjectForCopyPaste) {
        return _util.Promise.resolve([]);
      }

      var targetObject = this.targetObjectForCopyPaste;
      var isGroupSelect = targetObject.type === 'activeSelection';
      var targetObjects = isGroupSelect ? targetObject.getObjects() : [targetObject];
      var newTargetObject = null;

      this.discardSelection();

      return this._cloneObject(targetObjects).then(function (addedObjects) {
        if (addedObjects.length > 1) {
          newTargetObject = _this7.getActiveSelectionFromObjects(addedObjects);
        } else {
          newTargetObject = addedObjects[0];
        }
        _this7.targetObjectForCopyPaste = newTargetObject;
        _this7.setActiveObject(newTargetObject);
      });
    }

    /**
     * Clone object
     * @param {fabric.Object} targetObjects - fabric object
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_cloneObject',
    value: function _cloneObject(targetObjects) {
      var _this8 = this;

      var addedObjects = _tuiCodeSnippet2.default.map(targetObjects, function (targetObject) {
        return _this8._cloneObjectItem(targetObject);
      });

      return _util.Promise.all(addedObjects);
    }

    /**
     * Clone object one item
     * @param {fabric.Object} targetObject - fabric object
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_cloneObjectItem',
    value: function _cloneObjectItem(targetObject) {
      var _this9 = this;

      return this._copyFabricObjectForPaste(targetObject).then(function (clonedObject) {
        var objectProperties = _this9.createObjectProperties(clonedObject);
        _this9.add(clonedObject);

        _this9.fire(_consts.eventNames.ADD_OBJECT, objectProperties);

        return clonedObject;
      });
    }

    /**
     * Copy fabric object with Changed position for copy and paste
     * @param {fabric.Object} targetObject - fabric object
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_copyFabricObjectForPaste',
    value: function _copyFabricObjectForPaste(targetObject) {
      var _this10 = this;

      var addExtraPx = function addExtraPx(value, isReverse) {
        return isReverse ? value - EXTRA_PX_FOR_PASTE : value + EXTRA_PX_FOR_PASTE;
      };

      return this._copyFabricObject(targetObject).then(function (clonedObject) {
        var left = clonedObject.left,
            top = clonedObject.top,
            width = clonedObject.width,
            height = clonedObject.height;

        var _getCanvasSize = _this10.getCanvasSize(),
            canvasWidth = _getCanvasSize.width,
            canvasHeight = _getCanvasSize.height;

        var rightEdge = left + width / 2;
        var bottomEdge = top + height / 2;

        clonedObject.set(_tuiCodeSnippet2.default.extend({
          left: addExtraPx(left, rightEdge + EXTRA_PX_FOR_PASTE > canvasWidth),
          top: addExtraPx(top, bottomEdge + EXTRA_PX_FOR_PASTE > canvasHeight)
        }, _consts.fObjectOptions.SELECTION_STYLE));

        return clonedObject;
      });
    }

    /**
     * Copy fabric object
     * @param {fabric.Object} targetObject - fabric object
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_copyFabricObject',
    value: function _copyFabricObject(targetObject) {
      var _this11 = this;

      return new _util.Promise(function (resolve) {
        targetObject.clone(function (cloned) {
          var shapeComp = _this11.getComponent(_consts.componentNames.SHAPE);
          if ((0, _util.isShape)(cloned)) {
            shapeComp.processForCopiedObject(cloned, targetObject);
          }

          resolve(cloned);
        });
      });
    }

    /**
     * Get current dimensions
     * @returns {object}
     */

  }, {
    key: 'getCurrentDimensions',
    value: function getCurrentDimensions() {
      var resize = this.getComponent(_consts.componentNames.RESIZE);

      return resize.getCurrentDimensions();
    }

    /**
     * Get original dimensions
     * @returns {object}
     */

  }, {
    key: 'getOriginalDimensions',
    value: function getOriginalDimensions() {
      var resize = this.getComponent(_consts.componentNames.RESIZE);

      return resize.getOriginalDimensions();
    }

    /**
     * Set original dimensions
     * @param {object} dimensions - Dimensions
     */

  }, {
    key: 'setOriginalDimensions',
    value: function setOriginalDimensions(dimensions) {
      var resize = this.getComponent(_consts.componentNames.RESIZE);
      resize.setOriginalDimensions(dimensions);
    }

    /**
     * Resize Image
     * @param {Object} dimensions - Resize dimensions
     * @returns {Promise}
     */

  }, {
    key: 'resize',
    value: function resize(dimensions) {
      var resize = this.getComponent(_consts.componentNames.RESIZE);

      return resize.resize(dimensions);
    }
  }]);

  return Graphics;
}();

CustomEvents.mixin(Graphics);

exports.default = Graphics;

/***/ }),

/***/ "./src/js/helper/imagetracer.js":
/*!**************************************!*\
  !*** ./src/js/helper/imagetracer.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  imagetracer.js version 1.2.4
  Simple raster image tracer and vectorizer written in JavaScript.
  andras@jankovics.net
*/

/*
  The Unlicense / PUBLIC DOMAIN
  This is free and unencumbered software released into the public domain.
  Anyone is free to copy, modify, publish, use, compile, sell, or
  distribute this software, either in source code form or as a compiled
  binary, for any purpose, commercial or non-commercial, and by any
  means.
  In jurisdictions that recognize copyright laws, the author or authors
  of this software dedicate any and all copyright interest in the
  software to the public domain. We make this dedication for the benefit
  of the public at large and to the detriment of our heirs and
  successors. We intend this dedication to be an overt act of
  relinquishment in perpetuity of all present and future rights to this
  software under copyright law.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
  OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
  ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
  For more information, please refer to http://unlicense.org/
*/
var ImageTracer = function () {
  _createClass(ImageTracer, null, [{
    key: 'tracerDefaultOption',
    value: function tracerDefaultOption() {
      return {
        pathomit: 100,
        ltres: 0.1,
        qtres: 1,

        scale: 1,
        strokewidth: 5,
        viewbox: false,
        linefilter: true,
        desc: false,
        rightangleenhance: false,
        pal: [{
          r: 0,
          g: 0,
          b: 0,
          a: 255
        }, {
          r: 255,
          g: 255,
          b: 255,
          a: 255
        }]
      };
    }
    /* eslint-disable */

  }]);

  function ImageTracer() {
    _classCallCheck(this, ImageTracer);

    this.versionnumber = '1.2.4';
    this.optionpresets = {
      default: {
        corsenabled: false,
        ltres: 1,
        qtres: 1,
        pathomit: 8,
        rightangleenhance: true,
        colorsampling: 2,
        numberofcolors: 16,
        mincolorratio: 0,
        colorquantcycles: 3,
        layering: 0,
        strokewidth: 1,
        linefilter: false,
        scale: 1,
        roundcoords: 1,
        viewbox: false,
        desc: false,
        lcpr: 0,
        qcpr: 0,
        blurradius: 0,
        blurdelta: 20
      },
      posterized1: {
        colorsampling: 0,
        numberofcolors: 2
      },
      posterized2: {
        numberofcolors: 4,
        blurradius: 5
      },
      curvy: {
        ltres: 0.01,
        linefilter: true,
        rightangleenhance: false
      },
      sharp: { qtres: 0.01, linefilter: false },
      detailed: { pathomit: 0, roundcoords: 2, ltres: 0.5, qtres: 0.5, numberofcolors: 64 },
      smoothed: { blurradius: 5, blurdelta: 64 },
      grayscale: { colorsampling: 0, colorquantcycles: 1, numberofcolors: 7 },
      fixedpalette: { colorsampling: 0, colorquantcycles: 1, numberofcolors: 27 },
      randomsampling1: { colorsampling: 1, numberofcolors: 8 },
      randomsampling2: { colorsampling: 1, numberofcolors: 64 },
      artistic1: {
        colorsampling: 0,
        colorquantcycles: 1,
        pathomit: 0,
        blurradius: 5,
        blurdelta: 64,
        ltres: 0.01,
        linefilter: true,
        numberofcolors: 16,
        strokewidth: 2
      },
      artistic2: {
        qtres: 0.01,
        colorsampling: 0,
        colorquantcycles: 1,
        numberofcolors: 4,
        strokewidth: 0
      },
      artistic3: { qtres: 10, ltres: 10, numberofcolors: 8 },
      artistic4: {
        qtres: 10,
        ltres: 10,
        numberofcolors: 64,
        blurradius: 5,
        blurdelta: 256,
        strokewidth: 2
      },
      posterized3: {
        ltres: 1,
        qtres: 1,
        pathomit: 20,
        rightangleenhance: true,
        colorsampling: 0,
        numberofcolors: 3,
        mincolorratio: 0,
        colorquantcycles: 3,
        blurradius: 3,
        blurdelta: 20,
        strokewidth: 0,
        linefilter: false,
        roundcoords: 1,
        pal: [{ r: 0, g: 0, b: 100, a: 255 }, { r: 255, g: 255, b: 255, a: 255 }]
      }
    };

    this.pathscan_combined_lookup = [[[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]], [[0, 1, 0, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [0, 2, -1, 0]], [[-1, -1, -1, -1], [-1, -1, -1, -1], [0, 1, 0, -1], [0, 0, 1, 0]], [[0, 0, 1, 0], [-1, -1, -1, -1], [0, 2, -1, 0], [-1, -1, -1, -1]], [[-1, -1, -1, -1], [0, 0, 1, 0], [0, 3, 0, 1], [-1, -1, -1, -1]], [[13, 3, 0, 1], [13, 2, -1, 0], [7, 1, 0, -1], [7, 0, 1, 0]], [[-1, -1, -1, -1], [0, 1, 0, -1], [-1, -1, -1, -1], [0, 3, 0, 1]], [[0, 3, 0, 1], [0, 2, -1, 0], [-1, -1, -1, -1], [-1, -1, -1, -1]], [[0, 3, 0, 1], [0, 2, -1, 0], [-1, -1, -1, -1], [-1, -1, -1, -1]], [[-1, -1, -1, -1], [0, 1, 0, -1], [-1, -1, -1, -1], [0, 3, 0, 1]], [[11, 1, 0, -1], [14, 0, 1, 0], [14, 3, 0, 1], [11, 2, -1, 0]], [[-1, -1, -1, -1], [0, 0, 1, 0], [0, 3, 0, 1], [-1, -1, -1, -1]], [[0, 0, 1, 0], [-1, -1, -1, -1], [0, 2, -1, 0], [-1, -1, -1, -1]], [[-1, -1, -1, -1], [-1, -1, -1, -1], [0, 1, 0, -1], [0, 0, 1, 0]], [[0, 1, 0, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [0, 2, -1, 0]], [[-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, -1]]];

    this.gks = [[0.27901, 0.44198, 0.27901], [0.135336, 0.228569, 0.272192, 0.228569, 0.135336], [0.086776, 0.136394, 0.178908, 0.195843, 0.178908, 0.136394, 0.086776], [0.063327, 0.093095, 0.122589, 0.144599, 0.152781, 0.144599, 0.122589, 0.093095, 0.063327], [0.049692, 0.069304, 0.089767, 0.107988, 0.120651, 0.125194, 0.120651, 0.107988, 0.089767, 0.069304, 0.049692]];

    this.specpalette = [{ r: 0, g: 0, b: 0, a: 255 }, { r: 128, g: 128, b: 128, a: 255 }, { r: 0, g: 0, b: 128, a: 255 }, { r: 64, g: 64, b: 128, a: 255 }, { r: 192, g: 192, b: 192, a: 255 }, { r: 255, g: 255, b: 255, a: 255 }, { r: 128, g: 128, b: 192, a: 255 }, { r: 0, g: 0, b: 192, a: 255 }, { r: 128, g: 0, b: 0, a: 255 }, { r: 128, g: 64, b: 64, a: 255 }, { r: 128, g: 0, b: 128, a: 255 }, { r: 168, g: 168, b: 168, a: 255 }, { r: 192, g: 128, b: 128, a: 255 }, { r: 192, g: 0, b: 0, a: 255 }, { r: 255, g: 255, b: 255, a: 255 }, { r: 0, g: 128, b: 0, a: 255 }];
  }

  _createClass(ImageTracer, [{
    key: 'imageToSVG',
    value: function imageToSVG(url, callback, options) {
      var _this = this;

      options = this.checkoptions(options);
      this.loadImage(url, function (canvas) {
        callback(_this.imagedataToSVG(_this.getImgdata(canvas), options));
      }, options);
    }
  }, {
    key: 'imagedataToSVG',
    value: function imagedataToSVG(imgd, options) {
      options = this.checkoptions(options);
      var td = this.imagedataToTracedata(imgd, options);

      return this.getsvgstring(td, options);
    }
  }, {
    key: 'imageToTracedata',
    value: function imageToTracedata(url, callback, options) {
      var _this2 = this;

      options = this.checkoptions(options);
      this.loadImage(url, function (canvas) {
        callback(_this2.imagedataToTracedata(_this2.getImgdata(canvas), options));
      }, options);
    }
  }, {
    key: 'imagedataToTracedata',
    value: function imagedataToTracedata(imgd, options) {
      options = this.checkoptions(options);
      var ii = this.colorquantization(imgd, options);
      var tracedata = void 0;
      if (options.layering === 0) {
        tracedata = {
          layers: [],
          palette: ii.palette,
          width: ii.array[0].length - 2,
          height: ii.array.length - 2
        };

        for (var colornum = 0; colornum < ii.palette.length; colornum += 1) {
          var tracedlayer = this.batchtracepaths(this.internodes(this.pathscan(this.layeringstep(ii, colornum), options.pathomit), options), options.ltres, options.qtres);
          tracedata.layers.push(tracedlayer);
        }
      } else {
        var ls = this.layering(ii);
        if (options.layercontainerid) {
          this.drawLayers(ls, this.specpalette, options.scale, options.layercontainerid);
        }
        var bps = this.batchpathscan(ls, options.pathomit);
        var bis = this.batchinternodes(bps, options);
        tracedata = {
          layers: this.batchtracelayers(bis, options.ltres, options.qtres),
          palette: ii.palette,
          width: imgd.width,
          height: imgd.height
        };
      }

      return tracedata;
    }
  }, {
    key: 'checkoptions',
    value: function checkoptions(options) {
      options = options || {};
      if (typeof options === 'string') {
        options = options.toLowerCase();
        if (this.optionpresets[options]) {
          options = this.optionpresets[options];
        } else {
          options = {};
        }
      }
      var ok = Object.keys(this.optionpresets['default']);
      for (var k = 0; k < ok.length; k += 1) {
        if (!options.hasOwnProperty(ok[k])) {
          options[ok[k]] = this.optionpresets['default'][ok[k]];
        }
      }

      return options;
    }
  }, {
    key: 'colorquantization',
    value: function colorquantization(imgd, options) {
      var arr = [];
      var idx = 0;
      var cd = void 0;
      var cdl = void 0;
      var ci = void 0;
      var paletteacc = [];
      var pixelnum = imgd.width * imgd.height;
      var i = void 0;
      var j = void 0;
      var k = void 0;
      var cnt = void 0;
      var palette = void 0;

      for (j = 0; j < imgd.height + 2; j += 1) {
        arr[j] = [];
        for (i = 0; i < imgd.width + 2; i += 1) {
          arr[j][i] = -1;
        }
      }
      if (options.pal) {
        palette = options.pal;
      } else if (options.colorsampling === 0) {
        palette = this.generatepalette(options.numberofcolors);
      } else if (options.colorsampling === 1) {
        palette = this.samplepalette(options.numberofcolors, imgd);
      } else {
        palette = this.samplepalette2(options.numberofcolors, imgd);
      }
      if (options.blurradius > 0) {
        imgd = this.blur(imgd, options.blurradius, options.blurdelta);
      }
      for (cnt = 0; cnt < options.colorquantcycles; cnt += 1) {
        if (cnt > 0) {
          for (k = 0; k < palette.length; k += 1) {
            if (paletteacc[k].n > 0) {
              palette[k] = {
                r: Math.floor(paletteacc[k].r / paletteacc[k].n),
                g: Math.floor(paletteacc[k].g / paletteacc[k].n),
                b: Math.floor(paletteacc[k].b / paletteacc[k].n),
                a: Math.floor(paletteacc[k].a / paletteacc[k].n)
              };
            }

            if (paletteacc[k].n / pixelnum < options.mincolorratio && cnt < options.colorquantcycles - 1) {
              palette[k] = {
                r: Math.floor(Math.random() * 255),
                g: Math.floor(Math.random() * 255),
                b: Math.floor(Math.random() * 255),
                a: Math.floor(Math.random() * 255)
              };
            }
          }
        }

        for (i = 0; i < palette.length; i += 1) {
          paletteacc[i] = { r: 0, g: 0, b: 0, a: 0, n: 0 };
        }

        for (j = 0; j < imgd.height; j += 1) {
          for (i = 0; i < imgd.width; i += 1) {
            idx = (j * imgd.width + i) * 4;

            ci = 0;
            cdl = 1024;
            for (k = 0; k < palette.length; k += 1) {
              cd = Math.abs(palette[k].r - imgd.data[idx]) + Math.abs(palette[k].g - imgd.data[idx + 1]) + Math.abs(palette[k].b - imgd.data[idx + 2]) + Math.abs(palette[k].a - imgd.data[idx + 3]);

              if (cd < cdl) {
                cdl = cd;
                ci = k;
              }
            }

            paletteacc[ci].r += imgd.data[idx];
            paletteacc[ci].g += imgd.data[idx + 1];
            paletteacc[ci].b += imgd.data[idx + 2];
            paletteacc[ci].a += imgd.data[idx + 3];
            paletteacc[ci].n += 1;

            arr[j + 1][i + 1] = ci;
          }
        }
      }

      return { array: arr, palette: palette };
    }
  }, {
    key: 'samplepalette',
    value: function samplepalette(numberofcolors, imgd) {
      var idx = void 0;
      var palette = [];
      for (var i = 0; i < numberofcolors; i += 1) {
        idx = Math.floor(Math.random() * imgd.data.length / 4) * 4;
        palette.push({
          r: imgd.data[idx],
          g: imgd.data[idx + 1],
          b: imgd.data[idx + 2],
          a: imgd.data[idx + 3]
        });
      }

      return palette;
    }
  }, {
    key: 'samplepalette2',
    value: function samplepalette2(numberofcolors, imgd) {
      var idx = void 0;
      var palette = [];
      var ni = Math.ceil(Math.sqrt(numberofcolors));
      var nj = Math.ceil(numberofcolors / ni);
      var vx = imgd.width / (ni + 1);
      var vy = imgd.height / (nj + 1);
      for (var j = 0; j < nj; j += 1) {
        for (var i = 0; i < ni; i += 1) {
          if (palette.length === numberofcolors) {
            break;
          } else {
            idx = Math.floor((j + 1) * vy * imgd.width + (i + 1) * vx) * 4;
            palette.push({
              r: imgd.data[idx],
              g: imgd.data[idx + 1],
              b: imgd.data[idx + 2],
              a: imgd.data[idx + 3]
            });
          }
        }
      }

      return palette;
    }
  }, {
    key: 'generatepalette',
    value: function generatepalette(numberofcolors) {
      var palette = [];
      var rcnt = void 0;
      var gcnt = void 0;
      var bcnt = void 0;
      if (numberofcolors < 8) {
        var graystep = Math.floor(255 / (numberofcolors - 1));
        for (var i = 0; i < numberofcolors; i += 1) {
          palette.push({ r: i * graystep, g: i * graystep, b: i * graystep, a: 255 });
        }
      } else {
        var colorqnum = Math.floor(Math.pow(numberofcolors, 1 / 3));
        var colorstep = Math.floor(255 / (colorqnum - 1));
        var rndnum = numberofcolors - colorqnum * colorqnum * colorqnum;
        for (rcnt = 0; rcnt < colorqnum; rcnt += 1) {
          for (gcnt = 0; gcnt < colorqnum; gcnt += 1) {
            for (bcnt = 0; bcnt < colorqnum; bcnt += 1) {
              palette.push({ r: rcnt * colorstep, g: gcnt * colorstep, b: bcnt * colorstep, a: 255 });
            }
          }
        }
        for (rcnt = 0; rcnt < rndnum; rcnt += 1) {
          palette.push({
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255),
            a: Math.floor(Math.random() * 255)
          });
        }
      }

      return palette;
    }
  }, {
    key: 'layering',
    value: function layering(ii) {
      var layers = [];
      var val = 0;
      var ah = ii.array.length;
      var aw = ii.array[0].length;
      var n1 = void 0;
      var n2 = void 0;
      var n3 = void 0;
      var n4 = void 0;
      var n5 = void 0;
      var n6 = void 0;
      var n7 = void 0;
      var n8 = void 0;
      var i = void 0;
      var j = void 0;
      var k = void 0;
      for (k = 0; k < ii.palette.length; k += 1) {
        layers[k] = [];
        for (j = 0; j < ah; j += 1) {
          layers[k][j] = [];
          for (i = 0; i < aw; i += 1) {
            layers[k][j][i] = 0;
          }
        }
      }
      for (j = 1; j < ah - 1; j += 1) {
        for (i = 1; i < aw - 1; i += 1) {
          val = ii.array[j][i];

          n1 = ii.array[j - 1][i - 1] === val ? 1 : 0;
          n2 = ii.array[j - 1][i] === val ? 1 : 0;
          n3 = ii.array[j - 1][i + 1] === val ? 1 : 0;
          n4 = ii.array[j][i - 1] === val ? 1 : 0;
          n5 = ii.array[j][i + 1] === val ? 1 : 0;
          n6 = ii.array[j + 1][i - 1] === val ? 1 : 0;
          n7 = ii.array[j + 1][i] === val ? 1 : 0;
          n8 = ii.array[j + 1][i + 1] === val ? 1 : 0;

          layers[val][j + 1][i + 1] = 1 + n5 * 2 + n8 * 4 + n7 * 8;
          if (!n4) {
            layers[val][j + 1][i] = 0 + 2 + n7 * 4 + n6 * 8;
          }
          if (!n2) {
            layers[val][j][i + 1] = 0 + n3 * 2 + n5 * 4 + 8;
          }
          if (!n1) {
            layers[val][j][i] = 0 + n2 * 2 + 4 + n4 * 8;
          }
        }
      }

      return layers;
    }
  }, {
    key: 'layeringstep',
    value: function layeringstep(ii, cnum) {
      var layer = [];
      var ah = ii.array.length;
      var aw = ii.array[0].length;
      var i = void 0;
      var j = void 0;
      for (j = 0; j < ah; j += 1) {
        layer[j] = [];
        for (i = 0; i < aw; i += 1) {
          layer[j][i] = 0;
        }
      }
      for (j = 1; j < ah; j += 1) {
        for (i = 1; i < aw; i += 1) {
          layer[j][i] = (ii.array[j - 1][i - 1] === cnum ? 1 : 0) + (ii.array[j - 1][i] === cnum ? 2 : 0) + (ii.array[j][i - 1] === cnum ? 8 : 0) + (ii.array[j][i] === cnum ? 4 : 0);
        }
      }

      return layer;
    }
  }, {
    key: 'pathscan',
    value: function pathscan(arr, pathomit) {
      var paths = [];
      var pacnt = 0;
      var pcnt = 0;
      var px = 0;
      var py = 0;
      var w = arr[0].length;
      var h = arr.length;
      var dir = 0;
      var pathfinished = true;
      var holepath = false;
      var lookuprow = void 0;
      for (var j = 0; j < h; j += 1) {
        for (var i = 0; i < w; i += 1) {
          if (arr[j][i] === 4 || arr[j][i] === 11) {
            px = i;
            py = j;
            paths[pacnt] = {};
            paths[pacnt].points = [];
            paths[pacnt].boundingbox = [px, py, px, py];
            paths[pacnt].holechildren = [];
            pathfinished = false;
            pcnt = 0;
            holepath = arr[j][i] === 11;
            dir = 1;

            while (!pathfinished) {
              paths[pacnt].points[pcnt] = {};
              paths[pacnt].points[pcnt].x = px - 1;
              paths[pacnt].points[pcnt].y = py - 1;
              paths[pacnt].points[pcnt].t = arr[py][px];

              if (px - 1 < paths[pacnt].boundingbox[0]) {
                paths[pacnt].boundingbox[0] = px - 1;
              }
              if (px - 1 > paths[pacnt].boundingbox[2]) {
                paths[pacnt].boundingbox[2] = px - 1;
              }
              if (py - 1 < paths[pacnt].boundingbox[1]) {
                paths[pacnt].boundingbox[1] = py - 1;
              }
              if (py - 1 > paths[pacnt].boundingbox[3]) {
                paths[pacnt].boundingbox[3] = py - 1;
              }

              lookuprow = this.pathscan_combined_lookup[arr[py][px]][dir];
              arr[py][px] = lookuprow[0];
              dir = lookuprow[1];
              px += lookuprow[2];
              py += lookuprow[3];

              if (px - 1 === paths[pacnt].points[0].x && py - 1 === paths[pacnt].points[0].y) {
                pathfinished = true;

                if (paths[pacnt].points.length < pathomit) {
                  paths.pop();
                } else {
                  paths[pacnt].isholepath = !!holepath;

                  if (holepath) {
                    var parentidx = 0,
                        parentbbox = [-1, -1, w + 1, h + 1];
                    for (var parentcnt = 0; parentcnt < pacnt; parentcnt++) {
                      if (!paths[parentcnt].isholepath && this.boundingboxincludes(paths[parentcnt].boundingbox, paths[pacnt].boundingbox) && this.boundingboxincludes(parentbbox, paths[parentcnt].boundingbox)) {
                        parentidx = parentcnt;
                        parentbbox = paths[parentcnt].boundingbox;
                      }
                    }
                    paths[parentidx].holechildren.push(pacnt);
                  }
                  pacnt += 1;
                }
              }
              pcnt += 1;
            }
          }
        }
      }

      return paths;
    }
  }, {
    key: 'boundingboxincludes',
    value: function boundingboxincludes(parentbbox, childbbox) {
      return parentbbox[0] < childbbox[0] && parentbbox[1] < childbbox[1] && parentbbox[2] > childbbox[2] && parentbbox[3] > childbbox[3];
    }
  }, {
    key: 'batchpathscan',
    value: function batchpathscan(layers, pathomit) {
      var bpaths = [];
      for (var k in layers) {
        if (!layers.hasOwnProperty(k)) {
          continue;
        }
        bpaths[k] = this.pathscan(layers[k], pathomit);
      }

      return bpaths;
    }
  }, {
    key: 'internodes',
    value: function internodes(paths, options) {
      var ins = [];
      var palen = 0;
      var nextidx = 0;
      var nextidx2 = 0;
      var previdx = 0;
      var previdx2 = 0;
      var pacnt = void 0;
      var pcnt = void 0;
      for (pacnt = 0; pacnt < paths.length; pacnt += 1) {
        ins[pacnt] = {};
        ins[pacnt].points = [];
        ins[pacnt].boundingbox = paths[pacnt].boundingbox;
        ins[pacnt].holechildren = paths[pacnt].holechildren;
        ins[pacnt].isholepath = paths[pacnt].isholepath;
        palen = paths[pacnt].points.length;

        for (pcnt = 0; pcnt < palen; pcnt += 1) {
          nextidx = (pcnt + 1) % palen;
          nextidx2 = (pcnt + 2) % palen;
          previdx = (pcnt - 1 + palen) % palen;
          previdx2 = (pcnt - 2 + palen) % palen;

          if (options.rightangleenhance && this.testrightangle(paths[pacnt], previdx2, previdx, pcnt, nextidx, nextidx2)) {
            if (ins[pacnt].points.length > 0) {
              ins[pacnt].points[ins[pacnt].points.length - 1].linesegment = this.getdirection(ins[pacnt].points[ins[pacnt].points.length - 1].x, ins[pacnt].points[ins[pacnt].points.length - 1].y, paths[pacnt].points[pcnt].x, paths[pacnt].points[pcnt].y);
            }

            ins[pacnt].points.push({
              x: paths[pacnt].points[pcnt].x,
              y: paths[pacnt].points[pcnt].y,
              linesegment: this.getdirection(paths[pacnt].points[pcnt].x, paths[pacnt].points[pcnt].y, (paths[pacnt].points[pcnt].x + paths[pacnt].points[nextidx].x) / 2, (paths[pacnt].points[pcnt].y + paths[pacnt].points[nextidx].y) / 2)
            });
          }

          ins[pacnt].points.push({
            x: (paths[pacnt].points[pcnt].x + paths[pacnt].points[nextidx].x) / 2,
            y: (paths[pacnt].points[pcnt].y + paths[pacnt].points[nextidx].y) / 2,
            linesegment: this.getdirection((paths[pacnt].points[pcnt].x + paths[pacnt].points[nextidx].x) / 2, (paths[pacnt].points[pcnt].y + paths[pacnt].points[nextidx].y) / 2, (paths[pacnt].points[nextidx].x + paths[pacnt].points[nextidx2].x) / 2, (paths[pacnt].points[nextidx].y + paths[pacnt].points[nextidx2].y) / 2)
          });
        }
      }

      return ins;
    }
  }, {
    key: 'testrightangle',
    value: function testrightangle(path, idx1, idx2, idx3, idx4, idx5) {
      return path.points[idx3].x === path.points[idx1].x && path.points[idx3].x === path.points[idx2].x && path.points[idx3].y === path.points[idx4].y && path.points[idx3].y === path.points[idx5].y || path.points[idx3].y === path.points[idx1].y && path.points[idx3].y === path.points[idx2].y && path.points[idx3].x === path.points[idx4].x && path.points[idx3].x === path.points[idx5].x;
    }
  }, {
    key: 'getdirection',
    value: function getdirection(x1, y1, x2, y2) {
      var val = 8;
      if (x1 < x2) {
        if (y1 < y2) {
          val = 1;
        } else if (y1 > y2) {
          val = 7;
        } else {
          val = 0;
        }
      } else if (x1 > x2) {
        if (y1 < y2) {
          val = 3;
        } else if (y1 > y2) {
          val = 5;
        } else {
          val = 4;
        }
      } else if (y1 < y2) {
        val = 2;
      } else if (y1 > y2) {
        val = 6;
      } else {
        val = 8;
      }

      return val;
    }
  }, {
    key: 'batchinternodes',
    value: function batchinternodes(bpaths, options) {
      var binternodes = [];
      for (var k in bpaths) {
        if (!bpaths.hasOwnProperty(k)) {
          continue;
        }
        binternodes[k] = this.internodes(bpaths[k], options);
      }

      return binternodes;
    }
  }, {
    key: 'tracepath',
    value: function tracepath(path, ltres, qtres) {
      var pcnt = 0;
      var segtype1 = void 0;
      var segtype2 = void 0;
      var seqend = void 0;
      var smp = {};
      smp.segments = [];
      smp.boundingbox = path.boundingbox;
      smp.holechildren = path.holechildren;
      smp.isholepath = path.isholepath;

      while (pcnt < path.points.length) {
        segtype1 = path.points[pcnt].linesegment;
        segtype2 = -1;
        seqend = pcnt + 1;
        while ((path.points[seqend].linesegment === segtype1 || path.points[seqend].linesegment === segtype2 || segtype2 === -1) && seqend < path.points.length - 1) {
          if (path.points[seqend].linesegment !== segtype1 && segtype2 === -1) {
            segtype2 = path.points[seqend].linesegment;
          }
          seqend += 1;
        }
        if (seqend === path.points.length - 1) {
          seqend = 0;
        }

        smp.segments = smp.segments.concat(this.fitseq(path, ltres, qtres, pcnt, seqend));

        if (seqend > 0) {
          pcnt = seqend;
        } else {
          pcnt = path.points.length;
        }
      }

      return smp;
    }
  }, {
    key: 'fitseq',
    value: function fitseq(path, ltres, qtres, seqstart, seqend) {
      if (seqend > path.points.length || seqend < 0) {
        return [];
      }
      var errorpoint = seqstart,
          errorval = 0,
          curvepass = true,
          px = void 0,
          py = void 0,
          dist2 = void 0;
      var tl = seqend - seqstart;
      if (tl < 0) {
        tl += path.points.length;
      }
      var vx = (path.points[seqend].x - path.points[seqstart].x) / tl,
          vy = (path.points[seqend].y - path.points[seqstart].y) / tl;
      var pcnt = (seqstart + 1) % path.points.length,
          pl = void 0;
      while (pcnt != seqend) {
        pl = pcnt - seqstart;
        if (pl < 0) {
          pl += path.points.length;
        }
        px = path.points[seqstart].x + vx * pl;
        py = path.points[seqstart].y + vy * pl;
        dist2 = (path.points[pcnt].x - px) * (path.points[pcnt].x - px) + (path.points[pcnt].y - py) * (path.points[pcnt].y - py);
        if (dist2 > ltres) {
          curvepass = false;
        }
        if (dist2 > errorval) {
          errorpoint = pcnt;
          errorval = dist2;
        }
        pcnt = (pcnt + 1) % path.points.length;
      }
      if (curvepass) {
        return [{
          type: 'L',
          x1: path.points[seqstart].x,
          y1: path.points[seqstart].y,
          x2: path.points[seqend].x,
          y2: path.points[seqend].y
        }];
      }
      var fitpoint = errorpoint;
      curvepass = true;
      errorval = 0;
      var t = (fitpoint - seqstart) / tl,
          t1 = (1 - t) * (1 - t),
          t2 = 2 * (1 - t) * t,
          t3 = t * t;
      var cpx = (t1 * path.points[seqstart].x + t3 * path.points[seqend].x - path.points[fitpoint].x) / -t2,
          cpy = (t1 * path.points[seqstart].y + t3 * path.points[seqend].y - path.points[fitpoint].y) / -t2;
      pcnt = seqstart + 1;
      while (pcnt != seqend) {
        t = (pcnt - seqstart) / tl;
        t1 = (1 - t) * (1 - t);
        t2 = 2 * (1 - t) * t;
        t3 = t * t;
        px = t1 * path.points[seqstart].x + t2 * cpx + t3 * path.points[seqend].x;
        py = t1 * path.points[seqstart].y + t2 * cpy + t3 * path.points[seqend].y;
        dist2 = (path.points[pcnt].x - px) * (path.points[pcnt].x - px) + (path.points[pcnt].y - py) * (path.points[pcnt].y - py);
        if (dist2 > qtres) {
          curvepass = false;
        }
        if (dist2 > errorval) {
          errorpoint = pcnt;
          errorval = dist2;
        }
        pcnt = (pcnt + 1) % path.points.length;
      }
      if (curvepass) {
        return [{
          type: 'Q',
          x1: path.points[seqstart].x,
          y1: path.points[seqstart].y,
          x2: cpx,
          y2: cpy,
          x3: path.points[seqend].x,
          y3: path.points[seqend].y
        }];
      }
      var splitpoint = fitpoint;

      return this.fitseq(path, ltres, qtres, seqstart, splitpoint).concat(this.fitseq(path, ltres, qtres, splitpoint, seqend));
    }
  }, {
    key: 'batchtracepaths',
    value: function batchtracepaths(internodepaths, ltres, qtres) {
      var btracedpaths = [];
      for (var k in internodepaths) {
        if (!internodepaths.hasOwnProperty(k)) {
          continue;
        }
        btracedpaths.push(this.tracepath(internodepaths[k], ltres, qtres));
      }

      return btracedpaths;
    }
  }, {
    key: 'batchtracelayers',
    value: function batchtracelayers(binternodes, ltres, qtres) {
      var btbis = [];
      for (var k in binternodes) {
        if (!binternodes.hasOwnProperty(k)) {
          continue;
        }
        btbis[k] = this.batchtracepaths(binternodes[k], ltres, qtres);
      }

      return btbis;
    }
  }, {
    key: 'roundtodec',
    value: function roundtodec(val, places) {
      return Number(val.toFixed(places));
    }
  }, {
    key: 'svgpathstring',
    value: function svgpathstring(tracedata, lnum, pathnum, options) {
      var layer = tracedata.layers[lnum],
          smp = layer[pathnum],
          str = '',
          pcnt = void 0;
      if (options.linefilter && smp.segments.length < 3) {
        return str;
      }
      str = '<path ' + (options.desc ? 'desc="l ' + lnum + ' p ' + pathnum + '" ' : '') + this.tosvgcolorstr(tracedata.palette[lnum], options) + 'd="';
      if (options.roundcoords === -1) {
        str += 'M ' + smp.segments[0].x1 * options.scale + ' ' + smp.segments[0].y1 * options.scale + ' ';
        for (pcnt = 0; pcnt < smp.segments.length; pcnt++) {
          str += smp.segments[pcnt].type + ' ' + smp.segments[pcnt].x2 * options.scale + ' ' + smp.segments[pcnt].y2 * options.scale + ' ';
          if (smp.segments[pcnt].hasOwnProperty('x3')) {
            str += smp.segments[pcnt].x3 * options.scale + ' ' + smp.segments[pcnt].y3 * options.scale + ' ';
          }
        }
        str += 'Z ';
      } else {
        str += 'M ' + this.roundtodec(smp.segments[0].x1 * options.scale, options.roundcoords) + ' ' + this.roundtodec(smp.segments[0].y1 * options.scale, options.roundcoords) + ' ';
        for (pcnt = 0; pcnt < smp.segments.length; pcnt++) {
          str += smp.segments[pcnt].type + ' ' + this.roundtodec(smp.segments[pcnt].x2 * options.scale, options.roundcoords) + ' ' + this.roundtodec(smp.segments[pcnt].y2 * options.scale, options.roundcoords) + ' ';
          if (smp.segments[pcnt].hasOwnProperty('x3')) {
            str += this.roundtodec(smp.segments[pcnt].x3 * options.scale, options.roundcoords) + ' ' + this.roundtodec(smp.segments[pcnt].y3 * options.scale, options.roundcoords) + ' ';
          }
        }
        str += 'Z ';
      }
      for (var hcnt = 0; hcnt < smp.holechildren.length; hcnt++) {
        var hsmp = layer[smp.holechildren[hcnt]];

        if (options.roundcoords === -1) {
          if (hsmp.segments[hsmp.segments.length - 1].hasOwnProperty('x3')) {
            str += 'M ' + hsmp.segments[hsmp.segments.length - 1].x3 * options.scale + ' ' + hsmp.segments[hsmp.segments.length - 1].y3 * options.scale + ' ';
          } else {
            str += 'M ' + hsmp.segments[hsmp.segments.length - 1].x2 * options.scale + ' ' + hsmp.segments[hsmp.segments.length - 1].y2 * options.scale + ' ';
          }
          for (pcnt = hsmp.segments.length - 1; pcnt >= 0; pcnt--) {
            str += hsmp.segments[pcnt].type + ' ';
            if (hsmp.segments[pcnt].hasOwnProperty('x3')) {
              str += hsmp.segments[pcnt].x2 * options.scale + ' ' + hsmp.segments[pcnt].y2 * options.scale + ' ';
            }
            str += hsmp.segments[pcnt].x1 * options.scale + ' ' + hsmp.segments[pcnt].y1 * options.scale + ' ';
          }
        } else {
          if (hsmp.segments[hsmp.segments.length - 1].hasOwnProperty('x3')) {
            str += 'M ' + this.roundtodec(hsmp.segments[hsmp.segments.length - 1].x3 * options.scale) + ' ' + this.roundtodec(hsmp.segments[hsmp.segments.length - 1].y3 * options.scale) + ' ';
          } else {
            str += 'M ' + this.roundtodec(hsmp.segments[hsmp.segments.length - 1].x2 * options.scale) + ' ' + this.roundtodec(hsmp.segments[hsmp.segments.length - 1].y2 * options.scale) + ' ';
          }
          for (pcnt = hsmp.segments.length - 1; pcnt >= 0; pcnt--) {
            str += hsmp.segments[pcnt].type + ' ';
            if (hsmp.segments[pcnt].hasOwnProperty('x3')) {
              str += this.roundtodec(hsmp.segments[pcnt].x2 * options.scale) + ' ' + this.roundtodec(hsmp.segments[pcnt].y2 * options.scale) + ' ';
            }
            str += this.roundtodec(hsmp.segments[pcnt].x1 * options.scale) + ' ' + this.roundtodec(hsmp.segments[pcnt].y1 * options.scale) + ' ';
          }
        }
        str += 'Z ';
      }
      str += '" />';
      if (options.lcpr || options.qcpr) {
        for (pcnt = 0; pcnt < smp.segments.length; pcnt++) {
          if (smp.segments[pcnt].hasOwnProperty('x3') && options.qcpr) {
            str += '<circle cx="' + smp.segments[pcnt].x2 * options.scale + '" cy="' + smp.segments[pcnt].y2 * options.scale + '" r="' + options.qcpr + '" fill="cyan" stroke-width="' + options.qcpr * 0.2 + '" stroke="black" />';
            str += '<circle cx="' + smp.segments[pcnt].x3 * options.scale + '" cy="' + smp.segments[pcnt].y3 * options.scale + '" r="' + options.qcpr + '" fill="white" stroke-width="' + options.qcpr * 0.2 + '" stroke="black" />';
            str += '<line x1="' + smp.segments[pcnt].x1 * options.scale + '" y1="' + smp.segments[pcnt].y1 * options.scale + '" x2="' + smp.segments[pcnt].x2 * options.scale + '" y2="' + smp.segments[pcnt].y2 * options.scale + '" stroke-width="' + options.qcpr * 0.2 + '" stroke="cyan" />';
            str += '<line x1="' + smp.segments[pcnt].x2 * options.scale + '" y1="' + smp.segments[pcnt].y2 * options.scale + '" x2="' + smp.segments[pcnt].x3 * options.scale + '" y2="' + smp.segments[pcnt].y3 * options.scale + '" stroke-width="' + options.qcpr * 0.2 + '" stroke="cyan" />';
          }
          if (!smp.segments[pcnt].hasOwnProperty('x3') && options.lcpr) {
            str += '<circle cx="' + smp.segments[pcnt].x2 * options.scale + '" cy="' + smp.segments[pcnt].y2 * options.scale + '" r="' + options.lcpr + '" fill="white" stroke-width="' + options.lcpr * 0.2 + '" stroke="black" />';
          }
        }

        for (var hcnt = 0; hcnt < smp.holechildren.length; hcnt++) {
          var hsmp = layer[smp.holechildren[hcnt]];
          for (pcnt = 0; pcnt < hsmp.segments.length; pcnt++) {
            if (hsmp.segments[pcnt].hasOwnProperty('x3') && options.qcpr) {
              str += '<circle cx="' + hsmp.segments[pcnt].x2 * options.scale + '" cy="' + hsmp.segments[pcnt].y2 * options.scale + '" r="' + options.qcpr + '" fill="cyan" stroke-width="' + options.qcpr * 0.2 + '" stroke="black" />';
              str += '<circle cx="' + hsmp.segments[pcnt].x3 * options.scale + '" cy="' + hsmp.segments[pcnt].y3 * options.scale + '" r="' + options.qcpr + '" fill="white" stroke-width="' + options.qcpr * 0.2 + '" stroke="black" />';
              str += '<line x1="' + hsmp.segments[pcnt].x1 * options.scale + '" y1="' + hsmp.segments[pcnt].y1 * options.scale + '" x2="' + hsmp.segments[pcnt].x2 * options.scale + '" y2="' + hsmp.segments[pcnt].y2 * options.scale + '" stroke-width="' + options.qcpr * 0.2 + '" stroke="cyan" />';
              str += '<line x1="' + hsmp.segments[pcnt].x2 * options.scale + '" y1="' + hsmp.segments[pcnt].y2 * options.scale + '" x2="' + hsmp.segments[pcnt].x3 * options.scale + '" y2="' + hsmp.segments[pcnt].y3 * options.scale + '" stroke-width="' + options.qcpr * 0.2 + '" stroke="cyan" />';
            }
            if (!hsmp.segments[pcnt].hasOwnProperty('x3') && options.lcpr) {
              str += '<circle cx="' + hsmp.segments[pcnt].x2 * options.scale + '" cy="' + hsmp.segments[pcnt].y2 * options.scale + '" r="' + options.lcpr + '" fill="white" stroke-width="' + options.lcpr * 0.2 + '" stroke="black" />';
            }
          }
        }
      }

      return str;
    }
  }, {
    key: 'getsvgstring',
    value: function getsvgstring(tracedata, options) {
      options = this.checkoptions(options);
      var w = tracedata.width * options.scale;
      var h = tracedata.height * options.scale;

      var svgstr = '<svg ' + (options.viewbox ? 'viewBox="0 0 ' + w + ' ' + h + '" ' : 'width="' + w + '" height="' + h + '" ') + 'version="1.1" xmlns="http://www.w3.org/2000/svg" desc="Created with imagetracer.js version ' + this.versionnumber + '" >';
      for (var lcnt = 0; lcnt < tracedata.layers.length; lcnt += 1) {
        for (var pcnt = 0; pcnt < tracedata.layers[lcnt].length; pcnt += 1) {
          if (!tracedata.layers[lcnt][pcnt].isholepath) {
            svgstr += this.svgpathstring(tracedata, lcnt, pcnt, options);
          }
        }
      }
      svgstr += '</svg>';

      return svgstr;
    }
  }, {
    key: 'compareNumbers',
    value: function compareNumbers(a, b) {
      return a - b;
    }
  }, {
    key: 'torgbastr',
    value: function torgbastr(c) {
      return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.a + ')';
    }
  }, {
    key: 'tosvgcolorstr',
    value: function tosvgcolorstr(c, options) {
      return 'fill="rgb(' + c.r + ',' + c.g + ',' + c.b + ')" stroke="rgb(' + c.r + ',' + c.g + ',' + c.b + ')" stroke-width="' + options.strokewidth + '" opacity="' + c.a / 255.0 + '" ';
    }
  }, {
    key: 'appendSVGString',
    value: function appendSVGString(svgstr, parentid) {
      var div = void 0;
      if (parentid) {
        div = document.getElementById(parentid);
        if (!div) {
          div = document.createElement('div');
          div.id = parentid;
          document.body.appendChild(div);
        }
      } else {
        div = document.createElement('div');
        document.body.appendChild(div);
      }
      div.innerHTML += svgstr;
    }
  }, {
    key: 'blur',
    value: function blur(imgd, radius, delta) {
      var i = void 0,
          j = void 0,
          k = void 0,
          d = void 0,
          idx = void 0,
          racc = void 0,
          gacc = void 0,
          bacc = void 0,
          aacc = void 0,
          wacc = void 0;
      var imgd2 = { width: imgd.width, height: imgd.height, data: [] };
      radius = Math.floor(radius);
      if (radius < 1) {
        return imgd;
      }
      if (radius > 5) {
        radius = 5;
      }
      delta = Math.abs(delta);
      if (delta > 1024) {
        delta = 1024;
      }
      var thisgk = this.gks[radius - 1];
      for (j = 0; j < imgd.height; j++) {
        for (i = 0; i < imgd.width; i++) {
          racc = 0;
          gacc = 0;
          bacc = 0;
          aacc = 0;
          wacc = 0;

          for (k = -radius; k < radius + 1; k++) {
            if (i + k > 0 && i + k < imgd.width) {
              idx = (j * imgd.width + i + k) * 4;
              racc += imgd.data[idx] * thisgk[k + radius];
              gacc += imgd.data[idx + 1] * thisgk[k + radius];
              bacc += imgd.data[idx + 2] * thisgk[k + radius];
              aacc += imgd.data[idx + 3] * thisgk[k + radius];
              wacc += thisgk[k + radius];
            }
          }

          idx = (j * imgd.width + i) * 4;
          imgd2.data[idx] = Math.floor(racc / wacc);
          imgd2.data[idx + 1] = Math.floor(gacc / wacc);
          imgd2.data[idx + 2] = Math.floor(bacc / wacc);
          imgd2.data[idx + 3] = Math.floor(aacc / wacc);
        }
      }
      var himgd = new Uint8ClampedArray(imgd2.data);
      for (j = 0; j < imgd.height; j++) {
        for (i = 0; i < imgd.width; i++) {
          racc = 0;
          gacc = 0;
          bacc = 0;
          aacc = 0;
          wacc = 0;

          for (k = -radius; k < radius + 1; k++) {
            if (j + k > 0 && j + k < imgd.height) {
              idx = ((j + k) * imgd.width + i) * 4;
              racc += himgd[idx] * thisgk[k + radius];
              gacc += himgd[idx + 1] * thisgk[k + radius];
              bacc += himgd[idx + 2] * thisgk[k + radius];
              aacc += himgd[idx + 3] * thisgk[k + radius];
              wacc += thisgk[k + radius];
            }
          }

          idx = (j * imgd.width + i) * 4;
          imgd2.data[idx] = Math.floor(racc / wacc);
          imgd2.data[idx + 1] = Math.floor(gacc / wacc);
          imgd2.data[idx + 2] = Math.floor(bacc / wacc);
          imgd2.data[idx + 3] = Math.floor(aacc / wacc);
        }
      }
      for (j = 0; j < imgd.height; j++) {
        for (i = 0; i < imgd.width; i++) {
          idx = (j * imgd.width + i) * 4;

          d = Math.abs(imgd2.data[idx] - imgd.data[idx]) + Math.abs(imgd2.data[idx + 1] - imgd.data[idx + 1]) + Math.abs(imgd2.data[idx + 2] - imgd.data[idx + 2]) + Math.abs(imgd2.data[idx + 3] - imgd.data[idx + 3]);

          if (d > delta) {
            imgd2.data[idx] = imgd.data[idx];
            imgd2.data[idx + 1] = imgd.data[idx + 1];
            imgd2.data[idx + 2] = imgd.data[idx + 2];
            imgd2.data[idx + 3] = imgd.data[idx + 3];
          }
        }
      }

      return imgd2;
    }
  }, {
    key: 'loadImage',
    value: function loadImage(url, callback, options) {
      var img = new Image();
      if (options && options.corsenabled) {
        img.crossOrigin = 'Anonymous';
      }
      img.src = url;
      img.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        callback(canvas);
      };
    }
  }, {
    key: 'getImgdata',
    value: function getImgdata(canvas) {
      var context = canvas.getContext('2d');

      return context.getImageData(0, 0, canvas.width, canvas.height);
    }
  }, {
    key: 'drawLayers',
    value: function drawLayers(layers, palette, scale, parentid) {
      scale = scale || 1;
      var w = void 0,
          h = void 0,
          i = void 0,
          j = void 0,
          k = void 0;
      var div = void 0;
      if (parentid) {
        div = document.getElementById(parentid);
        if (!div) {
          div = document.createElement('div');
          div.id = parentid;
          document.body.appendChild(div);
        }
      } else {
        div = document.createElement('div');
        document.body.appendChild(div);
      }
      for (k in layers) {
        if (!layers.hasOwnProperty(k)) {
          continue;
        }

        w = layers[k][0].length;
        h = layers[k].length;

        var canvas = document.createElement('canvas');
        canvas.width = w * scale;
        canvas.height = h * scale;
        var context = canvas.getContext('2d');

        for (j = 0; j < h; j += 1) {
          for (i = 0; i < w; i += 1) {
            context.fillStyle = this.torgbastr(palette[layers[k][j][i] % palette.length]);
            context.fillRect(i * scale, j * scale, scale, scale);
          }
        }

        div.appendChild(canvas);
      }
    }
  }]);

  return ImageTracer;
}();

exports.default = ImageTracer;

/***/ }),

/***/ "./src/js/helper/selectionModifyHelper.js":
/*!************************************************!*\
  !*** ./src/js/helper/selectionModifyHelper.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCachedUndoDataForDimension = setCachedUndoDataForDimension;
exports.getCachedUndoDataForDimension = getCachedUndoDataForDimension;
exports.makeSelectionUndoData = makeSelectionUndoData;
exports.makeSelectionUndoDatum = makeSelectionUndoDatum;

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _fabric = __webpack_require__(/*! fabric */ "fabric");

var _fabric2 = _interopRequireDefault(_fabric);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Cached selection's info
 * @type {Array}
 * @private
 */
/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Selection modification helper
 */

var cachedUndoDataForChangeDimension = null;

/**
 * Set cached undo data
 * @param {Array} undoData - selection object
 * @private
 */
function setCachedUndoDataForDimension(undoData) {
  cachedUndoDataForChangeDimension = undoData;
}

/**
 * Get cached undo data
 * @returns {Object} cached undo data
 * @private
 */
function getCachedUndoDataForDimension() {
  return cachedUndoDataForChangeDimension;
}

/**
 * Make undo data
 * @param {fabric.Object} obj - selection object
 * @param {Function} undoDatumMaker - make undo datum
 * @returns {Array} undoData
 * @private
 */
function makeSelectionUndoData(obj, undoDatumMaker) {
  var undoData = void 0;

  if (obj.type === 'activeSelection') {
    undoData = obj.getObjects().map(function (item) {
      var angle = item.angle,
          left = item.left,
          top = item.top,
          scaleX = item.scaleX,
          scaleY = item.scaleY,
          width = item.width,
          height = item.height;


      _fabric2.default.util.addTransformToObject(item, obj.calcTransformMatrix());
      var result = undoDatumMaker(item);

      item.set({
        angle: angle,
        left: left,
        top: top,
        width: width,
        height: height,
        scaleX: scaleX,
        scaleY: scaleY
      });

      return result;
    });
  } else {
    undoData = [undoDatumMaker(obj)];
  }

  return undoData;
}

/**
 * Make undo datum
 * @param {number} id - object id
 * @param {fabric.Object} obj - selection object
 * @param {boolean} isSelection - whether or not object is selection
 * @returns {Object} undo datum
 * @private
 */
function makeSelectionUndoDatum(id, obj, isSelection) {
  return isSelection ? {
    id: id,
    width: obj.width,
    height: obj.height,
    top: obj.top,
    left: obj.left,
    angle: obj.angle,
    scaleX: obj.scaleX,
    scaleY: obj.scaleY
  } : (0, _tuiCodeSnippet.extend)({ id: id }, obj);
}

/***/ }),

/***/ "./src/js/helper/shapeFilterFillHelper.js":
/*!************************************************!*\
  !*** ./src/js/helper/shapeFilterFillHelper.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFillImageFromShape = getFillImageFromShape;
exports.rePositionFilterTypeFillImage = rePositionFilterTypeFillImage;
exports.makeFilterOptionFromFabricImage = makeFilterOptionFromFabricImage;
exports.makeFillPatternForFilter = makeFillPatternForFilter;
exports.resetFillPatternCanvas = resetFillPatternCanvas;
exports.reMakePatternImageSource = reMakePatternImageSource;
exports.getCachedCanvasImageElement = getCachedCanvasImageElement;

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _shapeResizeHelper = __webpack_require__(/*! @/helper/shapeResizeHelper */ "./src/js/helper/shapeResizeHelper.js");

var _shapeResizeHelper2 = _interopRequireDefault(_shapeResizeHelper);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                   * @fileoverview Shape resize helper
                                                                                                                                                                                                                   */


var FILTER_OPTION_MAP = {
  pixelate: 'blocksize',
  blur: 'blur'
};
var POSITION_DIMENSION_MAP = {
  x: 'width',
  y: 'height'
};

var FILTER_NAME_VALUE_MAP = (0, _util.flipObject)(FILTER_OPTION_MAP);

/**
 * Cached canvas image element for fill image
 * @type {boolean}
 * @private
 */
var cachedCanvasImageElement = null;

/**
 * Get background image of fill
 * @param {fabric.Object} shapeObj - Shape object
 * @returns {fabric.Image}
 * @private
 */
function getFillImageFromShape(shapeObj) {
  var _getCustomProperty = (0, _util.getCustomProperty)(shapeObj, 'patternSourceCanvas'),
      patternSourceCanvas = _getCustomProperty.patternSourceCanvas;

  var _patternSourceCanvas$ = patternSourceCanvas.getObjects(),
      fillImage = _patternSourceCanvas$[0];

  return fillImage;
}

/**
 * Reset the image position in the filter type fill area.
 * @param {fabric.Object} shapeObj - Shape object
 * @private
 */
function rePositionFilterTypeFillImage(shapeObj) {
  var angle = shapeObj.angle,
      flipX = shapeObj.flipX,
      flipY = shapeObj.flipY;

  var fillImage = getFillImageFromShape(shapeObj);
  var rotatedShapeCornerDimension = getRotatedDimension(shapeObj);
  var right = rotatedShapeCornerDimension.right,
      bottom = rotatedShapeCornerDimension.bottom;
  var width = rotatedShapeCornerDimension.width,
      height = rotatedShapeCornerDimension.height;

  var diffLeft = (width - shapeObj.width) / 2;
  var diffTop = (height - shapeObj.height) / 2;
  var cropX = shapeObj.left - shapeObj.width / 2 - diffLeft;
  var cropY = shapeObj.top - shapeObj.height / 2 - diffTop;
  var left = width / 2 - diffLeft;
  var top = height / 2 - diffTop;
  var fillImageMaxSize = Math.max(width, height) + Math.max(diffLeft, diffTop);

  var _calculateFillImageDi = calculateFillImageDimensionOutsideCanvas({
    shapeObj: shapeObj,
    left: left,
    top: top,
    width: width,
    height: height,
    cropX: cropX,
    cropY: cropY,
    flipX: flipX,
    flipY: flipY,
    right: right,
    bottom: bottom
  });

  left = _calculateFillImageDi[0];
  top = _calculateFillImageDi[1];
  width = _calculateFillImageDi[2];
  height = _calculateFillImageDi[3];


  fillImage.set({
    angle: flipX === flipY ? -angle : angle,
    left: left,
    top: top,
    width: width,
    height: height,
    cropX: cropX,
    cropY: cropY,
    flipX: flipX,
    flipY: flipY
  });

  (0, _util.setCustomProperty)(fillImage, { fillImageMaxSize: fillImageMaxSize });
}

/**
 * Make filter option from fabric image
 * @param {fabric.Image} imageObject - fabric image object
 * @returns {object}
 */
function makeFilterOptionFromFabricImage(imageObject) {
  return (0, _tuiCodeSnippet.map)(imageObject.filters, function (filter) {
    var _Object$keys = Object.keys(filter),
        key = _Object$keys[0];

    return _defineProperty({}, FILTER_NAME_VALUE_MAP[key], filter[key]);
  });
}

/**
 * Calculate fill image position and size for out of Canvas
 * @param {Object} options - options for position dimension calculate
 *   @param {fabric.Object} shapeObj - shape object
 *   @param {number} left - original left position
 *   @param {number} top - original top position
 *   @param {number} width - image width
 *   @param {number} height - image height
 *   @param {number} cropX - image cropX
 *   @param {number} cropY - image cropY
 *   @param {boolean} flipX - shape flipX
 *   @param {boolean} flipY - shape flipY
 * @returns {Object}
 */
function calculateFillImageDimensionOutsideCanvas(_ref2) {
  var shapeObj = _ref2.shapeObj,
      left = _ref2.left,
      top = _ref2.top,
      width = _ref2.width,
      height = _ref2.height,
      cropX = _ref2.cropX,
      cropY = _ref2.cropY,
      flipX = _ref2.flipX,
      flipY = _ref2.flipY,
      right = _ref2.right,
      bottom = _ref2.bottom;

  var overflowAreaPositionFixer = function overflowAreaPositionFixer(type, outDistance, imageLeft, imageTop) {
    return calculateDistanceOverflowPart({
      type: type,
      outDistance: outDistance,
      shapeObj: shapeObj,
      flipX: flipX,
      flipY: flipY,
      left: imageLeft,
      top: imageTop
    });
  };
  var originalWidth = width,
      originalHeight = height;

  var _calculateDimensionLe = calculateDimensionLeftTopEdge(overflowAreaPositionFixer, {
    left: left,
    top: top,
    width: width,
    height: height,
    cropX: cropX,
    cropY: cropY
  });

  left = _calculateDimensionLe[0];
  top = _calculateDimensionLe[1];
  width = _calculateDimensionLe[2];
  height = _calculateDimensionLe[3];

  var _calculateDimensionRi = calculateDimensionRightBottomEdge(overflowAreaPositionFixer, {
    left: left,
    top: top,
    insideCanvasRealImageWidth: width,
    insideCanvasRealImageHeight: height,
    right: right,
    bottom: bottom,
    cropX: cropX,
    cropY: cropY,
    originalWidth: originalWidth,
    originalHeight: originalHeight
  });

  left = _calculateDimensionRi[0];
  top = _calculateDimensionRi[1];
  width = _calculateDimensionRi[2];
  height = _calculateDimensionRi[3];


  return [left, top, width, height];
}

/**
 * Calculate fill image position and size for for right bottom edge
 * @param {Function} overflowAreaPositionFixer - position fixer
 * @param {Object} options - options for position dimension calculate
 *   @param {fabric.Object} shapeObj - shape object
 *   @param {number} left - original left position
 *   @param {number} top - original top position
 *   @param {number} width - image width
 *   @param {number} height - image height
 *   @param {number} right - image right
 *   @param {number} bottom - image bottom
 *   @param {number} cropX - image cropX
 *   @param {number} cropY - image cropY
 *   @param {boolean} originalWidth - image original width
 *   @param {boolean} originalHeight - image original height
 * @returns {Object}
 */
function calculateDimensionRightBottomEdge(overflowAreaPositionFixer, _ref3) {
  var left = _ref3.left,
      top = _ref3.top,
      insideCanvasRealImageWidth = _ref3.insideCanvasRealImageWidth,
      insideCanvasRealImageHeight = _ref3.insideCanvasRealImageHeight,
      right = _ref3.right,
      bottom = _ref3.bottom,
      cropX = _ref3.cropX,
      cropY = _ref3.cropY,
      originalWidth = _ref3.originalWidth,
      originalHeight = _ref3.originalHeight;
  var width = insideCanvasRealImageWidth,
      height = insideCanvasRealImageHeight;
  var _cachedCanvasImageEle = cachedCanvasImageElement,
      canvasWidth = _cachedCanvasImageEle.width,
      canvasHeight = _cachedCanvasImageEle.height;


  if (right > canvasWidth && cropX > 0) {
    width = originalWidth - Math.abs(right - canvasWidth);
  }
  if (bottom > canvasHeight && cropY > 0) {
    height = originalHeight - Math.abs(bottom - canvasHeight);
  }

  var diff = {
    x: (insideCanvasRealImageWidth - width) / 2,
    y: (insideCanvasRealImageHeight - height) / 2
  };

  (0, _tuiCodeSnippet.forEach)(['x', 'y'], function (type) {
    var cropDistance2 = diff[type];
    if (cropDistance2 > 0) {
      var _overflowAreaPosition = overflowAreaPositionFixer(type, cropDistance2, left, top);

      left = _overflowAreaPosition[0];
      top = _overflowAreaPosition[1];
    }
  });

  return [left, top, width, height];
}

/**
 * Calculate fill image position and size for for left top
 * @param {Function} overflowAreaPositionFixer - position fixer
 * @param {Object} options - options for position dimension calculate
 *   @param {fabric.Object} shapeObj - shape object
 *   @param {number} left - original left position
 *   @param {number} top - original top position
 *   @param {number} width - image width
 *   @param {number} height - image height
 *   @param {number} cropX - image cropX
 *   @param {number} cropY - image cropY
 * @returns {Object}
 */
function calculateDimensionLeftTopEdge(overflowAreaPositionFixer, _ref4) {
  var left = _ref4.left,
      top = _ref4.top,
      width = _ref4.width,
      height = _ref4.height,
      cropX = _ref4.cropX,
      cropY = _ref4.cropY;

  var dimension = {
    width: width,
    height: height
  };

  (0, _tuiCodeSnippet.forEach)(['x', 'y'], function (type) {
    var cropDistance = type === 'x' ? cropX : cropY;
    var compareSize = dimension[POSITION_DIMENSION_MAP[type]];
    var standardSize = cachedCanvasImageElement[POSITION_DIMENSION_MAP[type]];

    if (compareSize > standardSize) {
      var outDistance = (compareSize - standardSize) / 2;

      dimension[POSITION_DIMENSION_MAP[type]] = standardSize;

      var _overflowAreaPosition2 = overflowAreaPositionFixer(type, outDistance, left, top);

      left = _overflowAreaPosition2[0];
      top = _overflowAreaPosition2[1];
    }
    if (cropDistance < 0) {
      var _overflowAreaPosition3 = overflowAreaPositionFixer(type, cropDistance, left, top);

      left = _overflowAreaPosition3[0];
      top = _overflowAreaPosition3[1];
    }
  });

  return [left, top, dimension.width, dimension.height];
}

/**
 * Make fill property of dynamic pattern type
 * @param {fabric.Image} canvasImage - canvas background image
 * @param {Array} filterOption - filter option
 * @param {fabric.StaticCanvas} patternSourceCanvas - fabric static canvas
 * @returns {Object}
 */
function makeFillPatternForFilter(canvasImage, filterOption, patternSourceCanvas) {
  var copiedCanvasElement = getCachedCanvasImageElement(canvasImage);
  var fillImage = makeFillImage(copiedCanvasElement, canvasImage.angle, filterOption);
  patternSourceCanvas.add(fillImage);

  var fabricProperty = {
    fill: new fabric.Pattern({
      source: patternSourceCanvas.getElement(),
      repeat: 'no-repeat'
    })
  };

  (0, _util.setCustomProperty)(fabricProperty, { patternSourceCanvas: patternSourceCanvas });

  return fabricProperty;
}

/**
 * Reset fill pattern canvas
 * @param {fabric.StaticCanvas} patternSourceCanvas - fabric static canvas
 */
function resetFillPatternCanvas(patternSourceCanvas) {
  var _patternSourceCanvas$2 = patternSourceCanvas.getObjects(),
      innerImage = _patternSourceCanvas$2[0];

  var _getCustomProperty2 = (0, _util.getCustomProperty)(innerImage, 'fillImageMaxSize'),
      fillImageMaxSize = _getCustomProperty2.fillImageMaxSize;

  fillImageMaxSize = Math.max(1, fillImageMaxSize);

  patternSourceCanvas.setDimensions({
    width: fillImageMaxSize,
    height: fillImageMaxSize
  });
  patternSourceCanvas.renderAll();
}

/**
 * Remake filter pattern image source
 * @param {fabric.Object} shapeObj - Shape object
 * @param {fabric.Image} canvasImage - canvas background image
 */
function reMakePatternImageSource(shapeObj, canvasImage) {
  var _getCustomProperty3 = (0, _util.getCustomProperty)(shapeObj, 'patternSourceCanvas'),
      patternSourceCanvas = _getCustomProperty3.patternSourceCanvas;

  var _patternSourceCanvas$3 = patternSourceCanvas.getObjects(),
      fillImage = _patternSourceCanvas$3[0];

  var filterOption = makeFilterOptionFromFabricImage(fillImage);

  patternSourceCanvas.remove(fillImage);

  var copiedCanvasElement = getCachedCanvasImageElement(canvasImage, true);
  var newFillImage = makeFillImage(copiedCanvasElement, canvasImage.angle, filterOption);

  patternSourceCanvas.add(newFillImage);
}

/**
 * Calculate a point line outside the canvas.
 * @param {fabric.Image} canvasImage - canvas background image
 * @param {boolean} reset - default is false
 * @returns {HTMLImageElement}
 */
function getCachedCanvasImageElement(canvasImage) {
  var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!cachedCanvasImageElement || reset) {
    cachedCanvasImageElement = canvasImage.toCanvasElement();
  }

  return cachedCanvasImageElement;
}

/**
 * Calculate fill image position for out of Canvas
 * @param {string} type - 'x' or 'y'
 * @param {fabric.Object} shapeObj - shape object
 * @param {number} outDistance - distance away
 * @param {number} left - original left position
 * @param {number} top - original top position
 * @returns {Array}
 */
function calculateDistanceOverflowPart(_ref5) {
  var type = _ref5.type,
      shapeObj = _ref5.shapeObj,
      outDistance = _ref5.outDistance,
      left = _ref5.left,
      top = _ref5.top,
      flipX = _ref5.flipX,
      flipY = _ref5.flipY;

  var shapePointNavigation = getShapeEdgePoint(shapeObj);
  var shapeNeighborPointNavigation = [[1, 2], [0, 3], [0, 3], [1, 2]];
  var linePointsOutsideCanvas = calculateLinePointsOutsideCanvas(type, shapePointNavigation, shapeNeighborPointNavigation);
  var reatAngles = calculateLineAngleOfOutsideCanvas(type, shapePointNavigation, linePointsOutsideCanvas);
  var startPointIndex = linePointsOutsideCanvas.startPointIndex;

  var diffPosition = getReversePositionForFlip({
    outDistance: outDistance,
    startPointIndex: startPointIndex,
    flipX: flipX,
    flipY: flipY,
    reatAngles: reatAngles
  });

  return [left + diffPosition.left, top + diffPosition.top];
}

/**
 * Calculate fill image position for out of Canvas
 * @param {number} outDistance - distance away
 * @param {boolean} flipX - flip x statux
 * @param {boolean} flipY - flip y statux
 * @param {Array} reatAngles - Line angle of the rectangle vertex.
 * @returns {Object} diffPosition
 */
function getReversePositionForFlip(_ref6) {
  var outDistance = _ref6.outDistance,
      startPointIndex = _ref6.startPointIndex,
      flipX = _ref6.flipX,
      flipY = _ref6.flipY,
      reatAngles = _ref6.reatAngles;

  var rotationChangePoint1 = outDistance * Math.cos(reatAngles[0] * Math.PI / 180);
  var rotationChangePoint2 = outDistance * Math.cos(reatAngles[1] * Math.PI / 180);
  var isForward = startPointIndex === 2 || startPointIndex === 3;
  var diffPosition = {
    top: isForward ? rotationChangePoint1 : rotationChangePoint2,
    left: isForward ? rotationChangePoint2 : rotationChangePoint1
  };

  if (isReverseLeftPositionForFlip(startPointIndex, flipX, flipY)) {
    diffPosition.left = diffPosition.left * -1;
  }
  if (isReverseTopPositionForFlip(startPointIndex, flipX, flipY)) {
    diffPosition.top = diffPosition.top * -1;
  }

  return diffPosition;
}

/**
 * Calculate a point line outside the canvas.
 * @param {string} type - 'x' or 'y'
 * @param {Array} shapePointNavigation - shape edge positions
 *   @param {Object} shapePointNavigation.lefttop - left top position
 *   @param {Object} shapePointNavigation.righttop - right top position
 *   @param {Object} shapePointNavigation.leftbottom - lefttop position
 *   @param {Object} shapePointNavigation.rightbottom - rightbottom position
 * @param {Array} shapeNeighborPointNavigation - Array to find adjacent edges.
 * @returns {Object}
 */
function calculateLinePointsOutsideCanvas(type, shapePointNavigation, shapeNeighborPointNavigation) {
  var minimumPoint = 0;
  var minimumPointIndex = 0;
  (0, _tuiCodeSnippet.forEach)(shapePointNavigation, function (point, index) {
    if (point[type] < minimumPoint) {
      minimumPoint = point[type];
      minimumPointIndex = index;
    }
  });

  var _shapeNeighborPointNa = shapeNeighborPointNavigation[minimumPointIndex],
      endPointIndex1 = _shapeNeighborPointNa[0],
      endPointIndex2 = _shapeNeighborPointNa[1];


  return {
    startPointIndex: minimumPointIndex,
    endPointIndex1: endPointIndex1,
    endPointIndex2: endPointIndex2
  };
}

/**
 * Calculate a point line outside the canvas.
 * @param {string} type - 'x' or 'y'
 * @param {Array} shapePointNavigation - shape edge positions
 *   @param {object} shapePointNavigation.lefttop - left top position
 *   @param {object} shapePointNavigation.righttop - right top position
 *   @param {object} shapePointNavigation.leftbottom - lefttop position
 *   @param {object} shapePointNavigation.rightbottom - rightbottom position
 * @param {Object} linePointsOfOneVertexIndex - Line point of one vertex
 *   @param {Object} linePointsOfOneVertexIndex.startPoint - start point index
 *   @param {Object} linePointsOfOneVertexIndex.endPointIndex1 - end point index
 *   @param {Object} linePointsOfOneVertexIndex.endPointIndex2 - end point index
 * @returns {Object}
 */
function calculateLineAngleOfOutsideCanvas(type, shapePointNavigation, linePointsOfOneVertexIndex) {
  var startPointIndex = linePointsOfOneVertexIndex.startPointIndex,
      endPointIndex1 = linePointsOfOneVertexIndex.endPointIndex1,
      endPointIndex2 = linePointsOfOneVertexIndex.endPointIndex2;

  var horizontalVerticalAngle = type === 'x' ? 180 : 270;

  return (0, _tuiCodeSnippet.map)([endPointIndex1, endPointIndex2], function (pointIndex) {
    var startPoint = shapePointNavigation[startPointIndex];
    var endPoint = shapePointNavigation[pointIndex];
    var diffY = startPoint.y - endPoint.y;
    var diffX = startPoint.x - endPoint.x;

    return Math.atan2(diffY, diffX) * 180 / Math.PI - horizontalVerticalAngle;
  });
}

/* eslint-disable complexity */
/**
 * Calculate a point line outside the canvas for horizontal.
 * @param {number} startPointIndex - start point index
 * @param {boolean} flipX - flip x statux
 * @param {boolean} flipY - flip y statux
 * @returns {boolean} flipY - flip y statux
 */
function isReverseLeftPositionForFlip(startPointIndex, flipX, flipY) {
  return (!flipX && flipY || !flipX && !flipY) && startPointIndex === 0 || (flipX && flipY || flipX && !flipY) && startPointIndex === 1 || (!flipX && !flipY || !flipX && flipY) && startPointIndex === 2 || (flipX && !flipY || flipX && flipY) && startPointIndex === 3;
}
/* eslint-enable complexity */

/* eslint-disable complexity */
/**
 * Calculate a point line outside the canvas for vertical.
 * @param {number} startPointIndex - start point index
 * @param {boolean} flipX - flip x statux
 * @param {boolean} flipY - flip y statux
 * @returns {boolean} flipY - flip y statux
 */
function isReverseTopPositionForFlip(startPointIndex, flipX, flipY) {
  return (flipX && !flipY || !flipX && !flipY) && startPointIndex === 0 || (!flipX && !flipY || flipX && !flipY) && startPointIndex === 1 || (flipX && flipY || !flipX && flipY) && startPointIndex === 2 || (!flipX && flipY || flipX && flipY) && startPointIndex === 3;
}
/* eslint-enable complexity */

/**
 * Shape edge points
 * @param {fabric.Object} shapeObj - Selected shape object on canvas
 * @returns {Array} shapeEdgePoint - shape edge positions
 */
function getShapeEdgePoint(shapeObj) {
  return [shapeObj.getPointByOrigin('left', 'top'), shapeObj.getPointByOrigin('right', 'top'), shapeObj.getPointByOrigin('left', 'bottom'), shapeObj.getPointByOrigin('right', 'bottom')];
}

/**
 * Rotated shape dimension
 * @param {fabric.Object} shapeObj - Shape object
 * @returns {Object} Rotated shape dimension
 */
function getRotatedDimension(shapeObj) {
  var _getShapeEdgePoint = getShapeEdgePoint(shapeObj),
      _getShapeEdgePoint$ = _getShapeEdgePoint[0],
      ax = _getShapeEdgePoint$.x,
      ay = _getShapeEdgePoint$.y,
      _getShapeEdgePoint$2 = _getShapeEdgePoint[1],
      bx = _getShapeEdgePoint$2.x,
      by = _getShapeEdgePoint$2.y,
      _getShapeEdgePoint$3 = _getShapeEdgePoint[2],
      cx = _getShapeEdgePoint$3.x,
      cy = _getShapeEdgePoint$3.y,
      _getShapeEdgePoint$4 = _getShapeEdgePoint[3],
      dx = _getShapeEdgePoint$4.x,
      dy = _getShapeEdgePoint$4.y;

  var left = Math.min(ax, bx, cx, dx);
  var top = Math.min(ay, by, cy, dy);
  var right = Math.max(ax, bx, cx, dx);
  var bottom = Math.max(ay, by, cy, dy);

  return {
    left: left,
    top: top,
    right: right,
    bottom: bottom,
    width: right - left,
    height: bottom - top
  };
}

/**
 * Make fill image
 * @param {HTMLImageElement} copiedCanvasElement - html image element
 * @param {number} currentCanvasImageAngle - current canvas angle
 * @param {Array} filterOption - filter option
 * @returns {fabric.Image}
 * @private
 */
function makeFillImage(copiedCanvasElement, currentCanvasImageAngle, filterOption) {
  var fillImage = new fabric.Image(copiedCanvasElement);

  (0, _tuiCodeSnippet.forEach)(_tuiCodeSnippet.extend.apply(undefined, [{}].concat(filterOption)), function (value, key) {
    var fabricFilterClassName = (0, _util.capitalizeString)(key);
    var filter = new fabric.Image.filters[fabricFilterClassName](_defineProperty({}, FILTER_OPTION_MAP[key], value));
    fillImage.filters.push(filter);
  });
  fillImage.applyFilters();

  (0, _util.setCustomProperty)(fillImage, {
    originalAngle: currentCanvasImageAngle,
    fillImageMaxSize: Math.max(fillImage.width, fillImage.height)
  });
  _shapeResizeHelper2.default.adjustOriginToCenter(fillImage);

  return fillImage;
}

/***/ }),

/***/ "./src/js/helper/shapeResizeHelper.js":
/*!********************************************!*\
  !*** ./src/js/helper/shapeResizeHelper.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Shape resize helper
 */
var DIVISOR = {
  rect: 1,
  circle: 2,
  triangle: 1
};
var DIMENSION_KEYS = {
  rect: {
    w: 'width',
    h: 'height'
  },
  circle: {
    w: 'rx',
    h: 'ry'
  },
  triangle: {
    w: 'width',
    h: 'height'
  }
};

/**
 * Set the start point value to the shape object
 * @param {fabric.Object} shape - Shape object
 * @ignore
 */
function setStartPoint(shape) {
  var originX = shape.originX,
      originY = shape.originY;

  var originKey = originX.substring(0, 1) + originY.substring(0, 1);

  shape.startPoint = shape.origins[originKey];
}

/**
 * Get the positions of ratated origin by the pointer value
 * @param {{x: number, y: number}} origin - Origin value
 * @param {{x: number, y: number}} pointer - Pointer value
 * @param {number} angle - Rotating angle
 * @returns {Object} Postions of origin
 * @ignore
 */
function getPositionsOfRotatedOrigin(origin, pointer, angle) {
  var sx = origin.x;
  var sy = origin.y;
  var px = pointer.x;
  var py = pointer.y;
  var r = angle * Math.PI / 180;
  var rx = (px - sx) * Math.cos(r) - (py - sy) * Math.sin(r) + sx;
  var ry = (px - sx) * Math.sin(r) + (py - sy) * Math.cos(r) + sy;

  return {
    originX: sx > rx ? 'right' : 'left',
    originY: sy > ry ? 'bottom' : 'top'
  };
}

/**
 * Whether the shape has the center origin or not
 * @param {fabric.Object} shape - Shape object
 * @returns {boolean} State
 * @ignore
 */
function hasCenterOrigin(shape) {
  return shape.originX === 'center' && shape.originY === 'center';
}

/**
 * Adjust the origin of shape by the start point
 * @param {{x: number, y: number}} pointer - Pointer value
 * @param {fabric.Object} shape - Shape object
 * @ignore
 */
function adjustOriginByStartPoint(pointer, shape) {
  var centerPoint = shape.getPointByOrigin('center', 'center');
  var angle = -shape.angle;
  var originPositions = getPositionsOfRotatedOrigin(centerPoint, pointer, angle);
  var originX = originPositions.originX,
      originY = originPositions.originY;

  var origin = shape.getPointByOrigin(originX, originY);
  var left = shape.left - (centerPoint.x - origin.x);
  var top = shape.top - (centerPoint.y - origin.y);

  shape.set({
    originX: originX,
    originY: originY,
    left: left,
    top: top
  });

  shape.setCoords();
}

/**
 * Adjust the origin of shape by the moving pointer value
 * @param {{x: number, y: number}} pointer - Pointer value
 * @param {fabric.Object} shape - Shape object
 * @ignore
 */
function adjustOriginByMovingPointer(pointer, shape) {
  var origin = shape.startPoint;
  var angle = -shape.angle;
  var originPositions = getPositionsOfRotatedOrigin(origin, pointer, angle);
  var originX = originPositions.originX,
      originY = originPositions.originY;


  shape.setPositionByOrigin(origin, originX, originY);
  shape.setCoords();
}

/**
 * Adjust the dimension of shape on firing scaling event
 * @param {fabric.Object} shape - Shape object
 * @ignore
 */
function adjustDimensionOnScaling(shape) {
  var type = shape.type,
      scaleX = shape.scaleX,
      scaleY = shape.scaleY;

  var dimensionKeys = DIMENSION_KEYS[type];
  var width = shape[dimensionKeys.w] * scaleX;
  var height = shape[dimensionKeys.h] * scaleY;

  if (shape.isRegular) {
    var maxScale = Math.max(scaleX, scaleY);

    width = shape[dimensionKeys.w] * maxScale;
    height = shape[dimensionKeys.h] * maxScale;
  }

  var options = {
    hasControls: false,
    hasBorders: false,
    scaleX: 1,
    scaleY: 1
  };

  options[dimensionKeys.w] = width;
  options[dimensionKeys.h] = height;

  shape.set(options);
}

/**
 * Adjust the dimension of shape on firing mouse move event
 * @param {{x: number, y: number}} pointer - Pointer value
 * @param {fabric.Object} shape - Shape object
 * @ignore
 */
function adjustDimensionOnMouseMove(pointer, shape) {
  var type = shape.type,
      strokeWidth = shape.strokeWidth,
      origin = shape.startPoint;

  var divisor = DIVISOR[type];
  var dimensionKeys = DIMENSION_KEYS[type];
  var isTriangle = !!(shape.type === 'triangle');
  var options = {};
  var width = Math.abs(origin.x - pointer.x) / divisor;
  var height = Math.abs(origin.y - pointer.y) / divisor;

  if (width > strokeWidth) {
    width -= strokeWidth / divisor;
  }

  if (height > strokeWidth) {
    height -= strokeWidth / divisor;
  }

  if (shape.isRegular) {
    width = height = Math.max(width, height);

    if (isTriangle) {
      height = Math.sqrt(3) / 2 * width;
    }
  }

  options[dimensionKeys.w] = width;
  options[dimensionKeys.h] = height;

  shape.set(options);
}

module.exports = {
  /**
   * Set each origin value to shape
   * @param {fabric.Object} shape - Shape object
   */
  setOrigins: function setOrigins(shape) {
    var leftTopPoint = shape.getPointByOrigin('left', 'top');
    var rightTopPoint = shape.getPointByOrigin('right', 'top');
    var rightBottomPoint = shape.getPointByOrigin('right', 'bottom');
    var leftBottomPoint = shape.getPointByOrigin('left', 'bottom');

    shape.origins = {
      lt: leftTopPoint,
      rt: rightTopPoint,
      rb: rightBottomPoint,
      lb: leftBottomPoint
    };
  },


  /**
   * Resize the shape
   * @param {fabric.Object} shape - Shape object
   * @param {{x: number, y: number}} pointer - Mouse pointer values on canvas
   * @param {boolean} isScaling - Whether the resizing action is scaling or not
   */
  resize: function resize(shape, pointer, isScaling) {
    if (hasCenterOrigin(shape)) {
      adjustOriginByStartPoint(pointer, shape);
      setStartPoint(shape);
    }

    if (isScaling) {
      adjustDimensionOnScaling(shape, pointer);
    } else {
      adjustDimensionOnMouseMove(pointer, shape);
    }

    adjustOriginByMovingPointer(pointer, shape);
  },


  /**
   * Adjust the origin position of shape to center
   * @param {fabric.Object} shape - Shape object
   */
  adjustOriginToCenter: function adjustOriginToCenter(shape) {
    var centerPoint = shape.getPointByOrigin('center', 'center');
    var originX = shape.originX,
        originY = shape.originY;

    var origin = shape.getPointByOrigin(originX, originY);
    var left = shape.left + (centerPoint.x - origin.x);
    var top = shape.top + (centerPoint.y - origin.y);

    shape.set({
      hasControls: true,
      hasBorders: true,
      originX: 'center',
      originY: 'center',
      left: left,
      top: top
    });

    shape.setCoords(); // For left, top properties
  }
};

/***/ }),

/***/ "./src/js/imageEditor.js":
/*!*******************************!*\
  !*** ./src/js/imageEditor.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @fileoverview Image-editor application class
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _invoker3 = __webpack_require__(/*! @/invoker */ "./src/js/invoker.js");

var _invoker4 = _interopRequireDefault(_invoker3);

var _ui = __webpack_require__(/*! @/ui */ "./src/js/ui.js");

var _ui2 = _interopRequireDefault(_ui);

var _action = __webpack_require__(/*! @/action */ "./src/js/action.js");

var _action2 = _interopRequireDefault(_action);

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _graphics = __webpack_require__(/*! @/graphics */ "./src/js/graphics.js");

var _graphics2 = _interopRequireDefault(_graphics);

var _selectionModifyHelper = __webpack_require__(/*! @/helper/selectionModifyHelper */ "./src/js/helper/selectionModifyHelper.js");

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isUndefined = _tuiCodeSnippet2.default.isUndefined,
    forEach = _tuiCodeSnippet2.default.forEach,
    CustomEvents = _tuiCodeSnippet2.default.CustomEvents;
var MOUSE_DOWN = _consts.eventNames.MOUSE_DOWN,
    OBJECT_MOVED = _consts.eventNames.OBJECT_MOVED,
    OBJECT_SCALED = _consts.eventNames.OBJECT_SCALED,
    OBJECT_ACTIVATED = _consts.eventNames.OBJECT_ACTIVATED,
    OBJECT_ROTATED = _consts.eventNames.OBJECT_ROTATED,
    OBJECT_ADDED = _consts.eventNames.OBJECT_ADDED,
    OBJECT_MODIFIED = _consts.eventNames.OBJECT_MODIFIED,
    ADD_TEXT = _consts.eventNames.ADD_TEXT,
    ADD_OBJECT = _consts.eventNames.ADD_OBJECT,
    TEXT_EDITING = _consts.eventNames.TEXT_EDITING,
    TEXT_CHANGED = _consts.eventNames.TEXT_CHANGED,
    ICON_CREATE_RESIZE = _consts.eventNames.ICON_CREATE_RESIZE,
    ICON_CREATE_END = _consts.eventNames.ICON_CREATE_END,
    SELECTION_CLEARED = _consts.eventNames.SELECTION_CLEARED,
    SELECTION_CREATED = _consts.eventNames.SELECTION_CREATED,
    ADD_OBJECT_AFTER = _consts.eventNames.ADD_OBJECT_AFTER;

/**
 * Image filter result
 * @typedef {object} FilterResult
 * @property {string} type - filter type like 'mask', 'Grayscale' and so on
 * @property {string} action - action type like 'add', 'remove'
 */

/**
 * Flip status
 * @typedef {object} FlipStatus
 * @property {boolean} flipX - x axis
 * @property {boolean} flipY - y axis
 * @property {Number} angle - angle
 */
/**
 * Rotation status
 * @typedef {Number} RotateStatus
 * @property {Number} angle - angle
 */

/**
 * Old and new Size
 * @typedef {object} SizeChange
 * @property {Number} oldWidth - old width
 * @property {Number} oldHeight - old height
 * @property {Number} newWidth - new width
 * @property {Number} newHeight - new height
 */

/**
 * @typedef {string} ErrorMsg - {string} error message
 */

/**
 * @typedef {object} ObjectProps - graphics object properties
 * @property {number} id - object id
 * @property {string} type - object type
 * @property {string} text - text content
 * @property {(string | number)} left - Left
 * @property {(string | number)} top - Top
 * @property {(string | number)} width - Width
 * @property {(string | number)} height - Height
 * @property {string} fill - Color
 * @property {string} stroke - Stroke
 * @property {(string | number)} strokeWidth - StrokeWidth
 * @property {string} fontFamily - Font type for text
 * @property {number} fontSize - Font Size
 * @property {string} fontStyle - Type of inclination (normal / italic)
 * @property {string} fontWeight - Type of thicker or thinner looking (normal / bold)
 * @property {string} textAlign - Type of text align (left / center / right)
 * @property {string} textDecoration - Type of line (underline / line-through / overline)
 */

/**
 * Shape filter option
 * @typedef {object.<string, number>} ShapeFilterOption
 */

/**
 * Shape filter option
 * @typedef {object} ShapeFillOption - fill option of shape
 * @property {string} type - fill type ('color' or 'filter')
 * @property {Array.<ShapeFillFilterOption>} [filter] - {@link ShapeFilterOption} List.
 *  only applies to filter types
 *  (ex: \[\{pixelate: 20\}, \{blur: 0.3\}\])
 * @property {string} [color] - Shape foreground color (ex: '#fff', 'transparent')
 */

/**
 * Image editor
 * @class
 * @param {string|HTMLElement} wrapper - Wrapper's element or selector
 * @param {Object} [options] - Canvas max width & height of css
 *  @param {number} [options.includeUI] - Use the provided UI
 *    @param {Object} [options.includeUI.loadImage] - Basic editing image
 *      @param {string} options.includeUI.loadImage.path - image path
 *      @param {string} options.includeUI.loadImage.name - image name
 *    @param {Object} [options.includeUI.theme] - Theme object
 *    @param {Array} [options.includeUI.menu] - It can be selected when only specific menu is used, Default values are \['crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'mask', 'filter'\].
 *    @param {string} [options.includeUI.initMenu] - The first menu to be selected and started.
 *    @param {Object} [options.includeUI.uiSize] - ui size of editor
 *      @param {string} options.includeUI.uiSize.width - width of ui
 *      @param {string} options.includeUI.uiSize.height - height of ui
 *    @param {string} [options.includeUI.menuBarPosition=bottom] - Menu bar position('top', 'bottom', 'left', 'right')
 *  @param {number} options.cssMaxWidth - Canvas css-max-width
 *  @param {number} options.cssMaxHeight - Canvas css-max-height
 *  @param {Object} [options.selectionStyle] - selection style
 *  @param {string} [options.selectionStyle.cornerStyle] - selection corner style
 *  @param {number} [options.selectionStyle.cornerSize] - selection corner size
 *  @param {string} [options.selectionStyle.cornerColor] - selection corner color
 *  @param {string} [options.selectionStyle.cornerStrokeColor] = selection corner stroke color
 *  @param {boolean} [options.selectionStyle.transparentCorners] - selection corner transparent
 *  @param {number} [options.selectionStyle.lineWidth] - selection line width
 *  @param {string} [options.selectionStyle.borderColor] - selection border color
 *  @param {number} [options.selectionStyle.rotatingPointOffset] - selection rotating point length
 *  @param {Boolean} [options.usageStatistics=true] - Let us know the hostname. If you don't want to send the hostname, please set to false.
 * @example
 * var ImageEditor = require('tui-image-editor');
 * var blackTheme = require('./js/theme/black-theme.js');
 * var instance = new ImageEditor(document.querySelector('#tui-image-editor'), {
 *   includeUI: {
 *     loadImage: {
 *       path: 'img/sampleImage.jpg',
 *       name: 'SampleImage'
 *     },
 *     theme: blackTheme, // or whiteTheme
 *     menu: ['shape', 'filter'],
 *     initMenu: 'filter',
 *     uiSize: {
 *         width: '1000px',
 *         height: '700px'
 *     },
 *     menuBarPosition: 'bottom'
 *   },
 *   cssMaxWidth: 700,
 *   cssMaxHeight: 500,
 *   selectionStyle: {
 *     cornerSize: 20,
 *     rotatingPointOffset: 70
 *   }
 * });
 */

var ImageEditor = function () {
  function ImageEditor(wrapper, options) {
    _classCallCheck(this, ImageEditor);

    options = _tuiCodeSnippet2.default.extend({
      includeUI: false,
      usageStatistics: true
    }, options);

    this.mode = null;

    this.activeObjectId = null;

    /**
     * UI instance
     * @type {Ui}
     */
    if (options.includeUI) {
      var UIOption = options.includeUI;
      UIOption.usageStatistics = options.usageStatistics;

      this.ui = new _ui2.default(wrapper, UIOption, this.getActions());
      options = this.ui.setUiDefaultSelectionStyle(options);
    }

    /**
     * Invoker
     * @type {Invoker}
     * @private
     */
    this._invoker = new _invoker4.default();

    /**
     * Graphics instance
     * @type {Graphics}
     * @private
     */
    this._graphics = new _graphics2.default(this.ui ? this.ui.getEditorArea() : wrapper, {
      cssMaxWidth: options.cssMaxWidth,
      cssMaxHeight: options.cssMaxHeight
    });

    /**
     * Event handler list
     * @type {Object}
     * @private
     */
    this._handlers = {
      keydown: this._onKeyDown.bind(this),
      mousedown: this._onMouseDown.bind(this),
      objectActivated: this._onObjectActivated.bind(this),
      objectMoved: this._onObjectMoved.bind(this),
      objectScaled: this._onObjectScaled.bind(this),
      objectRotated: this._onObjectRotated.bind(this),
      objectAdded: this._onObjectAdded.bind(this),
      objectModified: this._onObjectModified.bind(this),
      createdPath: this._onCreatedPath,
      addText: this._onAddText.bind(this),
      addObject: this._onAddObject.bind(this),
      textEditing: this._onTextEditing.bind(this),
      textChanged: this._onTextChanged.bind(this),
      iconCreateResize: this._onIconCreateResize.bind(this),
      iconCreateEnd: this._onIconCreateEnd.bind(this),
      selectionCleared: this._selectionCleared.bind(this),
      selectionCreated: this._selectionCreated.bind(this)
    };

    this._attachInvokerEvents();
    this._attachGraphicsEvents();
    this._attachDomEvents();
    this._setSelectionStyle(options.selectionStyle, {
      applyCropSelectionStyle: options.applyCropSelectionStyle,
      applyGroupSelectionStyle: options.applyGroupSelectionStyle
    });

    if (options.usageStatistics) {
      (0, _util.sendHostName)();
    }

    if (this.ui) {
      this.ui.initCanvas();
      this.setReAction();
      this._attachColorPickerInputBoxEvents();
    }
    fabric.enableGLFiltering = false;
  }

  _createClass(ImageEditor, [{
    key: '_attachColorPickerInputBoxEvents',
    value: function _attachColorPickerInputBoxEvents() {
      var _this = this;

      this.ui.on(_consts.eventNames.INPUT_BOX_EDITING_STARTED, function () {
        _this.isColorPickerInputBoxEditing = true;
      });
      this.ui.on(_consts.eventNames.INPUT_BOX_EDITING_STOPPED, function () {
        _this.isColorPickerInputBoxEditing = false;
      });
    }
  }, {
    key: '_detachColorPickerInputBoxEvents',
    value: function _detachColorPickerInputBoxEvents() {
      this.ui.off(_consts.eventNames.INPUT_BOX_EDITING_STARTED);
      this.ui.off(_consts.eventNames.INPUT_BOX_EDITING_STOPPED);
    }

    /**
     * Set selection style by init option
     * @param {Object} selectionStyle - Selection styles
     * @param {Object} applyTargets - Selection apply targets
     *   @param {boolean} applyCropSelectionStyle - whether apply with crop selection style or not
     *   @param {boolean} applyGroupSelectionStyle - whether apply with group selection style or not
     * @private
     */

  }, {
    key: '_setSelectionStyle',
    value: function _setSelectionStyle(selectionStyle, _ref) {
      var applyCropSelectionStyle = _ref.applyCropSelectionStyle,
          applyGroupSelectionStyle = _ref.applyGroupSelectionStyle;

      if (selectionStyle) {
        this._graphics.setSelectionStyle(selectionStyle);
      }

      if (applyCropSelectionStyle) {
        this._graphics.setCropSelectionStyle(selectionStyle);
      }

      if (applyGroupSelectionStyle) {
        this.on('selectionCreated', function (eventTarget) {
          if (eventTarget.type === 'activeSelection') {
            eventTarget.set(selectionStyle);
          }
        });
      }
    }

    /**
     * Attach invoker events
     * @private
     */

  }, {
    key: '_attachInvokerEvents',
    value: function _attachInvokerEvents() {
      var _this2 = this;

      var UNDO_STACK_CHANGED = _consts.eventNames.UNDO_STACK_CHANGED,
          REDO_STACK_CHANGED = _consts.eventNames.REDO_STACK_CHANGED,
          EXECUTE_COMMAND = _consts.eventNames.EXECUTE_COMMAND,
          AFTER_UNDO = _consts.eventNames.AFTER_UNDO,
          AFTER_REDO = _consts.eventNames.AFTER_REDO,
          HAND_STARTED = _consts.eventNames.HAND_STARTED,
          HAND_STOPPED = _consts.eventNames.HAND_STOPPED;

      /**
       * Undo stack changed event
       * @event ImageEditor#undoStackChanged
       * @param {Number} length - undo stack length
       * @example
       * imageEditor.on('undoStackChanged', function(length) {
       *     console.log(length);
       * });
       */

      this._invoker.on(UNDO_STACK_CHANGED, this.fire.bind(this, UNDO_STACK_CHANGED));
      /**
       * Redo stack changed event
       * @event ImageEditor#redoStackChanged
       * @param {Number} length - redo stack length
       * @example
       * imageEditor.on('redoStackChanged', function(length) {
       *     console.log(length);
       * });
       */
      this._invoker.on(REDO_STACK_CHANGED, this.fire.bind(this, REDO_STACK_CHANGED));

      if (this.ui) {
        var canvas = this._graphics.getCanvas();

        this._invoker.on(EXECUTE_COMMAND, function (command) {
          return _this2.ui.fire(EXECUTE_COMMAND, command);
        });
        this._invoker.on(AFTER_UNDO, function (command) {
          return _this2.ui.fire(AFTER_UNDO, command);
        });
        this._invoker.on(AFTER_REDO, function (command) {
          return _this2.ui.fire(AFTER_REDO, command);
        });

        canvas.on(HAND_STARTED, function () {
          return _this2.ui.fire(HAND_STARTED);
        });
        canvas.on(HAND_STOPPED, function () {
          return _this2.ui.fire(HAND_STOPPED);
        });
      }
    }

    /**
     * Attach canvas events
     * @private
     */

  }, {
    key: '_attachGraphicsEvents',
    value: function _attachGraphicsEvents() {
      var _graphics$on;

      this._graphics.on((_graphics$on = {}, _defineProperty(_graphics$on, MOUSE_DOWN, this._handlers.mousedown), _defineProperty(_graphics$on, OBJECT_MOVED, this._handlers.objectMoved), _defineProperty(_graphics$on, OBJECT_SCALED, this._handlers.objectScaled), _defineProperty(_graphics$on, OBJECT_ROTATED, this._handlers.objectRotated), _defineProperty(_graphics$on, OBJECT_ACTIVATED, this._handlers.objectActivated), _defineProperty(_graphics$on, OBJECT_ADDED, this._handlers.objectAdded), _defineProperty(_graphics$on, OBJECT_MODIFIED, this._handlers.objectModified), _defineProperty(_graphics$on, ADD_TEXT, this._handlers.addText), _defineProperty(_graphics$on, ADD_OBJECT, this._handlers.addObject), _defineProperty(_graphics$on, TEXT_EDITING, this._handlers.textEditing), _defineProperty(_graphics$on, TEXT_CHANGED, this._handlers.textChanged), _defineProperty(_graphics$on, ICON_CREATE_RESIZE, this._handlers.iconCreateResize), _defineProperty(_graphics$on, ICON_CREATE_END, this._handlers.iconCreateEnd), _defineProperty(_graphics$on, SELECTION_CLEARED, this._handlers.selectionCleared), _defineProperty(_graphics$on, SELECTION_CREATED, this._handlers.selectionCreated), _graphics$on));
    }

    /**
     * Attach dom events
     * @private
     */

  }, {
    key: '_attachDomEvents',
    value: function _attachDomEvents() {
      // ImageEditor supports IE 9 higher
      document.addEventListener('keydown', this._handlers.keydown);
    }

    /**
     * Detach dom events
     * @private
     */

  }, {
    key: '_detachDomEvents',
    value: function _detachDomEvents() {
      // ImageEditor supports IE 9 higher
      document.removeEventListener('keydown', this._handlers.keydown);
    }

    /**
     * Keydown event handler
     * @param {KeyboardEvent} e - Event object
     * @private
     */
    /* eslint-disable complexity */

  }, {
    key: '_onKeyDown',
    value: function _onKeyDown(e) {
      var ctrlKey = e.ctrlKey,
          keyCode = e.keyCode,
          metaKey = e.metaKey;

      var isModifierKey = ctrlKey || metaKey;

      if (isModifierKey) {
        if (keyCode === _consts.keyCodes.C) {
          this._graphics.resetTargetObjectForCopyPaste();
        } else if (keyCode === _consts.keyCodes.V) {
          this._graphics.pasteObject();
          this.clearRedoStack();
        } else if (keyCode === _consts.keyCodes.Z) {
          // There is no error message on shortcut when it's empty
          this.undo()['catch'](function () {});
        } else if (keyCode === _consts.keyCodes.Y) {
          // There is no error message on shortcut when it's empty
          this.redo()['catch'](function () {});
        }
      }

      var isDeleteKey = keyCode === _consts.keyCodes.BACKSPACE || keyCode === _consts.keyCodes.DEL;
      var isRemoveReady = this._graphics.isReadyRemoveObject();

      if (!this.isColorPickerInputBoxEditing && isRemoveReady && isDeleteKey) {
        e.preventDefault();
        this.removeActiveObject();
      }
    }

    /**
     * Remove Active Object
     */

  }, {
    key: 'removeActiveObject',
    value: function removeActiveObject() {
      var activeObjectId = this._graphics.getActiveObjectIdForRemove();

      this.removeObject(activeObjectId);
    }

    /**
     * mouse down event handler
     * @param {Event} event - mouse down event
     * @param {Object} originPointer - origin pointer
     *  @param {Number} originPointer.x x position
     *  @param {Number} originPointer.y y position
     * @private
     */

  }, {
    key: '_onMouseDown',
    value: function _onMouseDown(event, originPointer) {
      /**
       * The mouse down event with position x, y on canvas
       * @event ImageEditor#mousedown
       * @param {Object} event - browser mouse event object
       * @param {Object} originPointer origin pointer
       *  @param {Number} originPointer.x x position
       *  @param {Number} originPointer.y y position
       * @example
       * imageEditor.on('mousedown', function(event, originPointer) {
       *     console.log(event);
       *     console.log(originPointer);
       *     if (imageEditor.hasFilter('colorFilter')) {
       *         imageEditor.applyFilter('colorFilter', {
       *             x: parseInt(originPointer.x, 10),
       *             y: parseInt(originPointer.y, 10)
       *         });
       *     }
       * });
       */

      this.fire(_consts.eventNames.MOUSE_DOWN, event, originPointer);
    }

    /**
     * Add a 'addObject' command
     * @param {Object} obj - Fabric object
     * @private
     */

  }, {
    key: '_pushAddObjectCommand',
    value: function _pushAddObjectCommand(obj) {
      var command = _command2.default.create(_consts.commandNames.ADD_OBJECT, this._graphics, obj);
      this._invoker.pushUndoStack(command);
    }

    /**
     * Add a 'changeSelection' command
     * @param {fabric.Object} obj - selection object
     * @private
     */

  }, {
    key: '_pushModifyObjectCommand',
    value: function _pushModifyObjectCommand(obj) {
      var _this3 = this;

      var type = obj.type;

      var props = (0, _selectionModifyHelper.makeSelectionUndoData)(obj, function (item) {
        return (0, _selectionModifyHelper.makeSelectionUndoDatum)(_this3._graphics.getObjectId(item), item, type === 'activeSelection');
      });
      var command = _command2.default.create(_consts.commandNames.CHANGE_SELECTION, this._graphics, props);
      command.execute(this._graphics, props);

      this._invoker.pushUndoStack(command);
    }

    /**
     * 'objectActivated' event handler
     * @param {ObjectProps} props - object properties
     * @private
     */

  }, {
    key: '_onObjectActivated',
    value: function _onObjectActivated(props) {
      /**
       * The event when object is selected(aka activated).
       * @event ImageEditor#objectActivated
       * @param {ObjectProps} objectProps - object properties
       * @example
       * imageEditor.on('objectActivated', function(props) {
       *     console.log(props);
       *     console.log(props.type);
       *     console.log(props.id);
       * });
       */
      this.fire(_consts.eventNames.OBJECT_ACTIVATED, props);
    }

    /**
     * 'objectMoved' event handler
     * @param {ObjectProps} props - object properties
     * @private
     */

  }, {
    key: '_onObjectMoved',
    value: function _onObjectMoved(props) {
      /**
       * The event when object is moved
       * @event ImageEditor#objectMoved
       * @param {ObjectProps} props - object properties
       * @example
       * imageEditor.on('objectMoved', function(props) {
       *     console.log(props);
       *     console.log(props.type);
       * });
       */
      this.fire(_consts.eventNames.OBJECT_MOVED, props);
    }

    /**
     * 'objectScaled' event handler
     * @param {ObjectProps} props - object properties
     * @private
     */

  }, {
    key: '_onObjectScaled',
    value: function _onObjectScaled(props) {
      /**
       * The event when scale factor is changed
       * @event ImageEditor#objectScaled
       * @param {ObjectProps} props - object properties
       * @example
       * imageEditor.on('objectScaled', function(props) {
       *     console.log(props);
       *     console.log(props.type);
       * });
       */
      this.fire(_consts.eventNames.OBJECT_SCALED, props);
    }

    /**
     * 'objectRotated' event handler
     * @param {ObjectProps} props - object properties
     * @private
     */

  }, {
    key: '_onObjectRotated',
    value: function _onObjectRotated(props) {
      /**
       * The event when object angle is changed
       * @event ImageEditor#objectRotated
       * @param {ObjectProps} props - object properties
       * @example
       * imageEditor.on('objectRotated', function(props) {
       *     console.log(props);
       *     console.log(props.type);
       * });
       */
      this.fire(_consts.eventNames.OBJECT_ROTATED, props);
    }

    /**
     * Get current drawing mode
     * @returns {string}
     * @example
     * // Image editor drawing mode
     * //
     * //    NORMAL: 'NORMAL'
     * //    CROPPER: 'CROPPER'
     * //    FREE_DRAWING: 'FREE_DRAWING'
     * //    LINE_DRAWING: 'LINE_DRAWING'
     * //    TEXT: 'TEXT'
     * //
     * if (imageEditor.getDrawingMode() === 'FREE_DRAWING') {
     *     imageEditor.stopDrawingMode();
     * }
     */

  }, {
    key: 'getDrawingMode',
    value: function getDrawingMode() {
      return this._graphics.getDrawingMode();
    }

    /**
     * Clear all objects
     * @returns {Promise}
     * @example
     * imageEditor.clearObjects();
     */

  }, {
    key: 'clearObjects',
    value: function clearObjects() {
      return this.execute(_consts.commandNames.CLEAR_OBJECTS);
    }

    /**
     * Deactivate all objects
     * @example
     * imageEditor.deactivateAll();
     */

  }, {
    key: 'deactivateAll',
    value: function deactivateAll() {
      this._graphics.deactivateAll();
      this._graphics.renderAll();
    }

    /**
     * discard selction
     * @example
     * imageEditor.discardSelection();
     */

  }, {
    key: 'discardSelection',
    value: function discardSelection() {
      this._graphics.discardSelection();
    }

    /**
     * selectable status change
     * @param {boolean} selectable - selectable status
     * @example
     * imageEditor.changeSelectableAll(false); // or true
     */

  }, {
    key: 'changeSelectableAll',
    value: function changeSelectableAll(selectable) {
      this._graphics.changeSelectableAll(selectable);
    }

    /**
     * Init history
     */

  }, {
    key: '_initHistory',
    value: function _initHistory() {
      if (this.ui) {
        this.ui.initHistory();
      }
    }

    /**
     * Clear history
     */

  }, {
    key: '_clearHistory',
    value: function _clearHistory() {
      if (this.ui) {
        this.ui.clearHistory();
      }
    }

    /**
     * Invoke command
     * @param {String} commandName - Command name
     * @param {...*} args - Arguments for creating command
     * @returns {Promise}
     * @private
     */

  }, {
    key: 'execute',
    value: function execute(commandName) {
      var _invoker;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // Inject an Graphics instance as first parameter
      var theArgs = [this._graphics].concat(args);

      return (_invoker = this._invoker).execute.apply(_invoker, [commandName].concat(theArgs));
    }

    /**
     * Invoke command
     * @param {String} commandName - Command name
     * @param {...*} args - Arguments for creating command
     * @returns {Promise}
     * @private
     */

  }, {
    key: 'executeSilent',
    value: function executeSilent(commandName) {
      var _invoker2;

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      // Inject an Graphics instance as first parameter
      var theArgs = [this._graphics].concat(args);

      return (_invoker2 = this._invoker).executeSilent.apply(_invoker2, [commandName].concat(theArgs));
    }

    /**
     * Undo
     * @param {number} [iterationCount=1] - Iteration count of undo
     * @returns {Promise}
     * @example
     * imageEditor.undo();
     */

  }, {
    key: 'undo',
    value: function undo() {
      var _this4 = this;

      var iterationCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      var promise = _util.Promise.resolve();

      for (var i = 0; i < iterationCount; i += 1) {
        promise = promise.then(function () {
          return _this4._invoker.undo();
        });
      }

      return promise;
    }

    /**
     * Redo
     * @param {number} [iterationCount=1] - Iteration count of redo
     * @returns {Promise}
     * @example
     * imageEditor.redo();
     */

  }, {
    key: 'redo',
    value: function redo() {
      var _this5 = this;

      var iterationCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      var promise = _util.Promise.resolve();

      for (var i = 0; i < iterationCount; i += 1) {
        promise = promise.then(function () {
          return _this5._invoker.redo();
        });
      }

      return promise;
    }

    /**
     * Zoom
     * @param {number} x - x axis of center point for zoom
     * @param {number} y - y axis of center point for zoom
     * @param {number} zoomLevel - level of zoom(1.0 ~ 5.0)
     */

  }, {
    key: 'zoom',
    value: function zoom(_ref2) {
      var x = _ref2.x,
          y = _ref2.y,
          zoomLevel = _ref2.zoomLevel;

      this._graphics.zoom({ x: x, y: y }, zoomLevel);
    }

    /**
     * Reset zoom. Change zoom level to 1.0
     */

  }, {
    key: 'resetZoom',
    value: function resetZoom() {
      this._graphics.resetZoom();
    }

    /**
     * Load image from file
     * @param {File} imgFile - Image file
     * @param {string} [imageName] - imageName
     * @returns {Promise<SizeChange, ErrorMsg>}
     * @example
     * imageEditor.loadImageFromFile(file).then(result => {
     *      console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
     *      console.log('new : ' + result.newWidth + ', ' + result.newHeight);
     * });
     */

  }, {
    key: 'loadImageFromFile',
    value: function loadImageFromFile(imgFile, imageName) {
      if (!imgFile) {
        return _util.Promise.reject(_consts.rejectMessages.invalidParameters);
      }

      var imgUrl = URL.createObjectURL(imgFile);
      imageName = imageName || imgFile.name;

      return this.loadImageFromURL(imgUrl, imageName).then(function (value) {
        URL.revokeObjectURL(imgFile);

        return value;
      });
    }

    /**
     * Load image from url
     * @param {string} url - File url
     * @param {string} imageName - imageName
     * @returns {Promise<SizeChange, ErrorMsg>}
     * @example
     * imageEditor.loadImageFromURL('http://url/testImage.png', 'lena').then(result => {
     *      console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
     *      console.log('new : ' + result.newWidth + ', ' + result.newHeight);
     * });
     */

  }, {
    key: 'loadImageFromURL',
    value: function loadImageFromURL(url, imageName) {
      if (!imageName || !url) {
        return _util.Promise.reject(_consts.rejectMessages.invalidParameters);
      }

      return this.execute(_consts.commandNames.LOAD_IMAGE, imageName, url);
    }

    /**
     * Add image object on canvas
     * @param {string} imgUrl - Image url to make object
     * @returns {Promise<ObjectProps, ErrorMsg>}
     * @example
     * imageEditor.addImageObject('path/fileName.jpg').then(objectProps => {
     *     console.log(ojectProps.id);
     * });
     */

  }, {
    key: 'addImageObject',
    value: function addImageObject(imgUrl) {
      if (!imgUrl) {
        return _util.Promise.reject(_consts.rejectMessages.invalidParameters);
      }

      return this.execute(_consts.commandNames.ADD_IMAGE_OBJECT, imgUrl);
    }

    /**
     * Start a drawing mode. If the current mode is not 'NORMAL', 'stopDrawingMode()' will be called first.
     * @param {String} mode Can be one of <I>'CROPPER', 'FREE_DRAWING', 'LINE_DRAWING', 'TEXT', 'SHAPE'</I>
     * @param {Object} [option] parameters of drawing mode, it's available with 'FREE_DRAWING', 'LINE_DRAWING'
     *  @param {Number} [option.width] brush width
     *  @param {String} [option.color] brush color
     *  @param {Object} [option.arrowType] arrow decorate
     *    @param {string} [option.arrowType.tail] arrow decorate for tail. 'chevron' or 'triangle'
     *    @param {string} [option.arrowType.head] arrow decorate for head. 'chevron' or 'triangle'
     * @returns {boolean} true if success or false
     * @example
     * imageEditor.startDrawingMode('FREE_DRAWING', {
     *      width: 10,
     *      color: 'rgba(255,0,0,0.5)'
     * });
     * imageEditor.startDrawingMode('LINE_DRAWING', {
     *      width: 10,
     *      color: 'rgba(255,0,0,0.5)',
     *      arrowType: {
     *          tail: 'chevron' // triangle
     *      }
     * });
     *
     */

  }, {
    key: 'startDrawingMode',
    value: function startDrawingMode(mode, option) {
      return this._graphics.startDrawingMode(mode, option);
    }

    /**
     * Stop the current drawing mode and back to the 'NORMAL' mode
     * @example
     * imageEditor.stopDrawingMode();
     */

  }, {
    key: 'stopDrawingMode',
    value: function stopDrawingMode() {
      this._graphics.stopDrawingMode();
    }

    /**
     * Crop this image with rect
     * @param {Object} rect crop rect
     *  @param {Number} rect.left left position
     *  @param {Number} rect.top top position
     *  @param {Number} rect.width width
     *  @param {Number} rect.height height
     * @returns {Promise}
     * @example
     * imageEditor.crop(imageEditor.getCropzoneRect());
     */

  }, {
    key: 'crop',
    value: function crop(rect) {
      var data = this._graphics.getCroppedImageData(rect);
      if (!data) {
        return _util.Promise.reject(_consts.rejectMessages.invalidParameters);
      }

      return this.loadImageFromURL(data.url, data.imageName);
    }

    /**
     * Get the cropping rect
     * @returns {Object}  {{left: number, top: number, width: number, height: number}} rect
     */

  }, {
    key: 'getCropzoneRect',
    value: function getCropzoneRect() {
      return this._graphics.getCropzoneRect();
    }

    /**
     * Set the cropping rect
     * @param {number} [mode] crop rect mode [1, 1.5, 1.3333333333333333, 1.25, 1.7777777777777777]
     */

  }, {
    key: 'setCropzoneRect',
    value: function setCropzoneRect(mode) {
      this._graphics.setCropzoneRect(mode);
    }

    /**
     * Flip
     * @returns {Promise}
     * @param {string} type - 'flipX' or 'flipY' or 'reset'
     * @returns {Promise<FlipStatus, ErrorMsg>}
     * @private
     */

  }, {
    key: '_flip',
    value: function _flip(type) {
      return this.execute(_consts.commandNames.FLIP_IMAGE, type);
    }

    /**
     * Flip x
     * @returns {Promise<FlipStatus, ErrorMsg>}
     * @example
     * imageEditor.flipX().then((status => {
     *     console.log('flipX: ', status.flipX);
     *     console.log('flipY: ', status.flipY);
     *     console.log('angle: ', status.angle);
     * }).catch(message => {
     *     console.log('error: ', message);
     * });
     */

  }, {
    key: 'flipX',
    value: function flipX() {
      return this._flip('flipX');
    }

    /**
     * Flip y
     * @returns {Promise<FlipStatus, ErrorMsg>}
     * @example
     * imageEditor.flipY().then(status => {
     *     console.log('flipX: ', status.flipX);
     *     console.log('flipY: ', status.flipY);
     *     console.log('angle: ', status.angle);
     * }).catch(message => {
     *     console.log('error: ', message);
     * });
     */

  }, {
    key: 'flipY',
    value: function flipY() {
      return this._flip('flipY');
    }

    /**
     * Reset flip
     * @returns {Promise<FlipStatus, ErrorMsg>}
     * @example
     * imageEditor.resetFlip().then(status => {
     *     console.log('flipX: ', status.flipX);
     *     console.log('flipY: ', status.flipY);
     *     console.log('angle: ', status.angle);
     * }).catch(message => {
     *     console.log('error: ', message);
     * });;
     */

  }, {
    key: 'resetFlip',
    value: function resetFlip() {
      return this._flip('reset');
    }

    /**
     * @param {string} type - 'rotate' or 'setAngle'
     * @param {number} angle - angle value (degree)
     * @param {boolean} isSilent - is silent execution or not
     * @returns {Promise<RotateStatus, ErrorMsg>}
     * @private
     */

  }, {
    key: '_rotate',
    value: function _rotate(type, angle, isSilent) {
      var result = null;

      if (isSilent) {
        result = this.executeSilent(_consts.commandNames.ROTATE_IMAGE, type, angle);
      } else {
        result = this.execute(_consts.commandNames.ROTATE_IMAGE, type, angle);
      }

      return result;
    }

    /**
     * Rotate image
     * @returns {Promise}
     * @param {number} angle - Additional angle to rotate image
     * @param {boolean} isSilent - is silent execution or not
     * @returns {Promise<RotateStatus, ErrorMsg>}
     * @example
     * imageEditor.rotate(10); // angle = 10
     * imageEditor.rotate(10); // angle = 20
     * imageEditor.rotate(5); // angle = 5
     * imageEditor.rotate(-95); // angle = -90
     * imageEditor.rotate(10).then(status => {
     *     console.log('angle: ', status.angle);
     * })).catch(message => {
     *     console.log('error: ', message);
     * });
     */

  }, {
    key: 'rotate',
    value: function rotate(angle, isSilent) {
      return this._rotate('rotate', angle, isSilent);
    }

    /**
     * Set angle
     * @param {number} angle - Angle of image
     * @param {boolean} isSilent - is silent execution or not
     * @returns {Promise<RotateStatus, ErrorMsg>}
     * @example
     * imageEditor.setAngle(10); // angle = 10
     * imageEditor.rotate(10); // angle = 20
     * imageEditor.setAngle(5); // angle = 5
     * imageEditor.rotate(50); // angle = 55
     * imageEditor.setAngle(-40); // angle = -40
     * imageEditor.setAngle(10).then(status => {
     *     console.log('angle: ', status.angle);
     * })).catch(message => {
     *     console.log('error: ', message);
     * });
     */

  }, {
    key: 'setAngle',
    value: function setAngle(angle, isSilent) {
      return this._rotate('setAngle', angle, isSilent);
    }

    /**
     * Set drawing brush
     * @param {Object} option brush option
     *  @param {Number} option.width width
     *  @param {String} option.color color like 'FFFFFF', 'rgba(0, 0, 0, 0.5)'
     * @example
     * imageEditor.startDrawingMode('FREE_DRAWING');
     * imageEditor.setBrush({
     *     width: 12,
     *     color: 'rgba(0, 0, 0, 0.5)'
     * });
     * imageEditor.setBrush({
     *     width: 8,
     *     color: 'FFFFFF'
     * });
     */

  }, {
    key: 'setBrush',
    value: function setBrush(option) {
      this._graphics.setBrush(option);
    }

    /**
     * Set states of current drawing shape
     * @param {string} type - Shape type (ex: 'rect', 'circle', 'triangle')
     * @param {Object} [options] - Shape options
     *      @param {(ShapeFillOption | string)} [options.fill] - {@link ShapeFillOption} or
     *        Shape foreground color (ex: '#fff', 'transparent')
     *      @param {string} [options.stoke] - Shape outline color
     *      @param {number} [options.strokeWidth] - Shape outline width
     *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
     *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
     *      @param {number} [options.rx] - Radius x value (When type option is 'circle', this options can use)
     *      @param {number} [options.ry] - Radius y value (When type option is 'circle', this options can use)
     *      @param {number} [options.isRegular] - Whether resizing shape has 1:1 ratio or not
     * @example
     * imageEditor.setDrawingShape('rect', {
     *     fill: 'red',
     *     width: 100,
     *     height: 200
     * });
     * @example
     * imageEditor.setDrawingShape('rect', {
     *     fill: {
     *         type: 'filter',
     *         filter: [{blur: 0.3}, {pixelate: 20}]
     *     },
     *     width: 100,
     *     height: 200
     * });
     * @example
     * imageEditor.setDrawingShape('circle', {
     *     fill: 'transparent',
     *     stroke: 'blue',
     *     strokeWidth: 3,
     *     rx: 10,
     *     ry: 100
     * });
     * @example
     * imageEditor.setDrawingShape('triangle', { // When resizing, the shape keep the 1:1 ratio
     *     width: 1,
     *     height: 1,
     *     isRegular: true
     * });
     * @example
     * imageEditor.setDrawingShape('circle', { // When resizing, the shape keep the 1:1 ratio
     *     rx: 10,
     *     ry: 10,
     *     isRegular: true
     * });
     */

  }, {
    key: 'setDrawingShape',
    value: function setDrawingShape(type, options) {
      this._graphics.setDrawingShape(type, options);
    }
  }, {
    key: 'setDrawingIcon',
    value: function setDrawingIcon(type, iconColor) {
      this._graphics.setIconStyle(type, iconColor);
    }

    /**
     * Add shape
     * @param {string} type - Shape type (ex: 'rect', 'circle', 'triangle')
     * @param {Object} options - Shape options
     *      @param {(ShapeFillOption | string)} [options.fill] - {@link ShapeFillOption} or
     *        Shape foreground color (ex: '#fff', 'transparent')
     *      @param {string} [options.stroke] - Shape outline color
     *      @param {number} [options.strokeWidth] - Shape outline width
     *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
     *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
     *      @param {number} [options.rx] - Radius x value (When type option is 'circle', this options can use)
     *      @param {number} [options.ry] - Radius y value (When type option is 'circle', this options can use)
     *      @param {number} [options.left] - Shape x position
     *      @param {number} [options.top] - Shape y position
     *      @param {boolean} [options.isRegular] - Whether resizing shape has 1:1 ratio or not
     * @returns {Promise<ObjectProps, ErrorMsg>}
     * @example
     * imageEditor.addShape('rect', {
     *     fill: 'red',
     *     stroke: 'blue',
     *     strokeWidth: 3,
     *     width: 100,
     *     height: 200,
     *     left: 10,
     *     top: 10,
     *     isRegular: true
     * });
     * @example
     * imageEditor.addShape('circle', {
     *     fill: 'red',
     *     stroke: 'blue',
     *     strokeWidth: 3,
     *     rx: 10,
     *     ry: 100,
     *     isRegular: false
     * }).then(objectProps => {
     *     console.log(objectProps.id);
     * });
     * @example
     * imageEditor.addShape('rect', {
     *     fill: {
     *         type: 'filter',
     *         filter: [{blur: 0.3}, {pixelate: 20}]
     *     },
     *     stroke: 'blue',
     *     strokeWidth: 3,
     *     rx: 10,
     *     ry: 100,
     *     isRegular: false
     * }).then(objectProps => {
     *     console.log(objectProps.id);
     * });
     */

  }, {
    key: 'addShape',
    value: function addShape(type, options) {
      options = options || {};

      this._setPositions(options);

      return this.execute(_consts.commandNames.ADD_SHAPE, type, options);
    }

    /**
     * Change shape
     * @param {number} id - object id
     * @param {Object} options - Shape options
     *      @param {(ShapeFillOption | string)} [options.fill] - {@link ShapeFillOption} or
     *        Shape foreground color (ex: '#fff', 'transparent')
     *      @param {string} [options.stroke] - Shape outline color
     *      @param {number} [options.strokeWidth] - Shape outline width
     *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
     *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
     *      @param {number} [options.rx] - Radius x value (When type option is 'circle', this options can use)
     *      @param {number} [options.ry] - Radius y value (When type option is 'circle', this options can use)
     *      @param {boolean} [options.isRegular] - Whether resizing shape has 1:1 ratio or not
     * @param {boolean} isSilent - is silent execution or not
     * @returns {Promise}
     * @example
     * // call after selecting shape object on canvas
     * imageEditor.changeShape(id, { // change rectagle or triangle
     *     fill: 'red',
     *     stroke: 'blue',
     *     strokeWidth: 3,
     *     width: 100,
     *     height: 200
     * });
     * @example
     * // call after selecting shape object on canvas
     * imageEditor.changeShape(id, { // change circle
     *     fill: 'red',
     *     stroke: 'blue',
     *     strokeWidth: 3,
     *     rx: 10,
     *     ry: 100
     * });
     */

  }, {
    key: 'changeShape',
    value: function changeShape(id, options, isSilent) {
      var executeMethodName = isSilent ? 'executeSilent' : 'execute';

      return this[executeMethodName](_consts.commandNames.CHANGE_SHAPE, id, options);
    }

    /**
     * Add text on image
     * @param {string} text - Initial input text
     * @param {Object} [options] Options for generating text
     *     @param {Object} [options.styles] Initial styles
     *         @param {string} [options.styles.fill] Color
     *         @param {string} [options.styles.fontFamily] Font type for text
     *         @param {number} [options.styles.fontSize] Size
     *         @param {string} [options.styles.fontStyle] Type of inclination (normal / italic)
     *         @param {string} [options.styles.fontWeight] Type of thicker or thinner looking (normal / bold)
     *         @param {string} [options.styles.textAlign] Type of text align (left / center / right)
     *         @param {string} [options.styles.textDecoration] Type of line (underline / line-through / overline)
     *     @param {{x: number, y: number}} [options.position] - Initial position
     *     @param {boolean} [options.autofocus] - text autofocus, default is true
     * @returns {Promise}
     * @example
     * imageEditor.addText('init text');
     * @example
     * imageEditor.addText('init text', {
     *     styles: {
     *         fill: '#000',
     *         fontSize: 20,
     *         fontWeight: 'bold'
     *     },
     *     position: {
     *         x: 10,
     *         y: 10
     *     }
     * }).then(objectProps => {
     *     console.log(objectProps.id);
     * });
     */

  }, {
    key: 'addText',
    value: function addText(text, options) {
      text = text || '';
      options = options || {};

      return this.execute(_consts.commandNames.ADD_TEXT, text, options);
    }

    /**
     * Change contents of selected text object on image
     * @param {number} id - object id
     * @param {string} text - Changing text
     * @returns {Promise<ObjectProps, ErrorMsg>}
     * @example
     * imageEditor.changeText(id, 'change text');
     */

  }, {
    key: 'changeText',
    value: function changeText(id, text) {
      text = text || '';

      return this.execute(_consts.commandNames.CHANGE_TEXT, id, text);
    }

    /**
     * Set style
     * @param {number} id - object id
     * @param {Object} styleObj - text styles
     *     @param {string} [styleObj.fill] Color
     *     @param {string} [styleObj.fontFamily] Font type for text
     *     @param {number} [styleObj.fontSize] Size
     *     @param {string} [styleObj.fontStyle] Type of inclination (normal / italic)
     *     @param {string} [styleObj.fontWeight] Type of thicker or thinner looking (normal / bold)
     *     @param {string} [styleObj.textAlign] Type of text align (left / center / right)
     *     @param {string} [styleObj.textDecoration] Type of line (underline / line-through / overline)
     * @param {boolean} isSilent - is silent execution or not
     * @returns {Promise}
     * @example
     * imageEditor.changeTextStyle(id, {
     *     fontStyle: 'italic'
     * });
     */

  }, {
    key: 'changeTextStyle',
    value: function changeTextStyle(id, styleObj, isSilent) {
      var executeMethodName = isSilent ? 'executeSilent' : 'execute';

      return this[executeMethodName](_consts.commandNames.CHANGE_TEXT_STYLE, id, styleObj);
    }

    /**
     * change text mode
     * @param {string} type - change type
     * @private
     */

  }, {
    key: '_changeActivateMode',
    value: function _changeActivateMode(type) {
      if (type !== 'ICON' && this.getDrawingMode() !== type) {
        this.startDrawingMode(type);
      }
    }

    /**
     * 'textChanged' event handler
     * @param {Object} target - changed text object
     * @private
     */

  }, {
    key: '_onTextChanged',
    value: function _onTextChanged(target) {
      this.fire(_consts.eventNames.TEXT_CHANGED, target);
    }

    /**
     * 'iconCreateResize' event handler
     * @param {Object} originPointer origin pointer
     *  @param {Number} originPointer.x x position
     *  @param {Number} originPointer.y y position
     * @private
     */

  }, {
    key: '_onIconCreateResize',
    value: function _onIconCreateResize(originPointer) {
      this.fire(_consts.eventNames.ICON_CREATE_RESIZE, originPointer);
    }

    /**
     * 'iconCreateEnd' event handler
     * @param {Object} originPointer origin pointer
     *  @param {Number} originPointer.x x position
     *  @param {Number} originPointer.y y position
     * @private
     */

  }, {
    key: '_onIconCreateEnd',
    value: function _onIconCreateEnd(originPointer) {
      this.fire(_consts.eventNames.ICON_CREATE_END, originPointer);
    }

    /**
     * 'textEditing' event handler
     * @private
     */

  }, {
    key: '_onTextEditing',
    value: function _onTextEditing() {
      /**
       * The event which starts to edit text object
       * @event ImageEditor#textEditing
       * @example
       * imageEditor.on('textEditing', function() {
       *     console.log('text editing');
       * });
       */

      this.fire(_consts.eventNames.TEXT_EDITING);
    }

    /**
     * Mousedown event handler in case of 'TEXT' drawing mode
     * @param {fabric.Event} event - Current mousedown event object
     * @private
     */

  }, {
    key: '_onAddText',
    value: function _onAddText(event) {
      /**
       * The event when 'TEXT' drawing mode is enabled and click non-object area.
       * @event ImageEditor#addText
       * @param {Object} pos
       *  @param {Object} pos.originPosition - Current position on origin canvas
       *      @param {Number} pos.originPosition.x - x
       *      @param {Number} pos.originPosition.y - y
       *  @param {Object} pos.clientPosition - Current position on client area
       *      @param {Number} pos.clientPosition.x - x
       *      @param {Number} pos.clientPosition.y - y
       * @example
       * imageEditor.on('addText', function(pos) {
       *     console.log('text position on canvas: ' + pos.originPosition);
       *     console.log('text position on brwoser: ' + pos.clientPosition);
       * });
       */

      this.fire(_consts.eventNames.ADD_TEXT, {
        originPosition: event.originPosition,
        clientPosition: event.clientPosition
      });
    }

    /**
     * 'addObject' event handler
     * @param {Object} objectProps added object properties
     * @private
     */

  }, {
    key: '_onAddObject',
    value: function _onAddObject(objectProps) {
      var obj = this._graphics.getObject(objectProps.id);
      this._invoker.fire(_consts.eventNames.EXECUTE_COMMAND, (0, _util.getObjectType)(obj.type));
      this._pushAddObjectCommand(obj);
    }

    /**
     * 'objectAdded' event handler
     * @param {Object} objectProps added object properties
     * @private
     */

  }, {
    key: '_onObjectAdded',
    value: function _onObjectAdded(objectProps) {
      /**
       * The event when object added
       * @event ImageEditor#objectAdded
       * @param {ObjectProps} props - object properties
       * @example
       * imageEditor.on('objectAdded', function(props) {
       *     console.log(props);
       * });
       */
      this.fire(OBJECT_ADDED, objectProps);

      /**
       * The event when object added (deprecated)
       * @event ImageEditor#addObjectAfter
       * @param {ObjectProps} props - object properties
       * @deprecated
       */
      this.fire(ADD_OBJECT_AFTER, objectProps);
    }

    /**
     * 'objectModified' event handler
     * @param {fabric.Object} obj - selection object
     * @private
     */

  }, {
    key: '_onObjectModified',
    value: function _onObjectModified(obj) {
      if (obj.type !== _consts.OBJ_TYPE.CROPZONE) {
        this._invoker.fire(_consts.eventNames.EXECUTE_COMMAND, (0, _util.getObjectType)(obj.type));
        this._pushModifyObjectCommand(obj);
      }
    }

    /**
     * 'selectionCleared' event handler
     * @private
     */

  }, {
    key: '_selectionCleared',
    value: function _selectionCleared() {
      this.fire(SELECTION_CLEARED);
    }

    /**
     * 'selectionCreated' event handler
     * @param {Object} eventTarget - Fabric object
     * @private
     */

  }, {
    key: '_selectionCreated',
    value: function _selectionCreated(eventTarget) {
      this.fire(SELECTION_CREATED, eventTarget);
    }

    /**
     * Register custom icons
     * @param {{iconType: string, pathValue: string}} infos - Infos to register icons
     * @example
     * imageEditor.registerIcons({
     *     customIcon: 'M 0 0 L 20 20 L 10 10 Z',
     *     customArrow: 'M 60 0 L 120 60 H 90 L 75 45 V 180 H 45 V 45 L 30 60 H 0 Z'
     * });
     */

  }, {
    key: 'registerIcons',
    value: function registerIcons(infos) {
      this._graphics.registerPaths(infos);
    }

    /**
     * Change canvas cursor type
     * @param {string} cursorType - cursor type
     * @example
     * imageEditor.changeCursor('crosshair');
     */

  }, {
    key: 'changeCursor',
    value: function changeCursor(cursorType) {
      this._graphics.changeCursor(cursorType);
    }

    /**
     * Add icon on canvas
     * @param {string} type - Icon type ('arrow', 'cancel', custom icon name)
     * @param {Object} options - Icon options
     *      @param {string} [options.fill] - Icon foreground color
     *      @param {number} [options.left] - Icon x position
     *      @param {number} [options.top] - Icon y position
     * @returns {Promise<ObjectProps, ErrorMsg>}
     * @example
     * imageEditor.addIcon('arrow'); // The position is center on canvas
     * @example
     * imageEditor.addIcon('arrow', {
     *     left: 100,
     *     top: 100
     * }).then(objectProps => {
     *     console.log(objectProps.id);
     * });
     */

  }, {
    key: 'addIcon',
    value: function addIcon(type, options) {
      options = options || {};

      this._setPositions(options);

      return this.execute(_consts.commandNames.ADD_ICON, type, options);
    }

    /**
     * Change icon color
     * @param {number} id - object id
     * @param {string} color - Color for icon
     * @returns {Promise}
     * @example
     * imageEditor.changeIconColor(id, '#000000');
     */

  }, {
    key: 'changeIconColor',
    value: function changeIconColor(id, color) {
      return this.execute(_consts.commandNames.CHANGE_ICON_COLOR, id, color);
    }

    /**
     * Remove an object or group by id
     * @param {number} id - object id
     * @returns {Promise}
     * @example
     * imageEditor.removeObject(id);
     */

  }, {
    key: 'removeObject',
    value: function removeObject(id) {
      var _graphics$getObject = this._graphics.getObject(id),
          type = _graphics$getObject.type;

      return this.execute(_consts.commandNames.REMOVE_OBJECT, id, (0, _util.getObjectType)(type));
    }

    /**
     * Whether it has the filter or not
     * @param {string} type - Filter type
     * @returns {boolean} true if it has the filter
     */

  }, {
    key: 'hasFilter',
    value: function hasFilter(type) {
      return this._graphics.hasFilter(type);
    }

    /**
     * Remove filter on canvas image
     * @param {string} type - Filter type
     * @returns {Promise<FilterResult, ErrorMsg>}
     * @example
     * imageEditor.removeFilter('Grayscale').then(obj => {
     *     console.log('filterType: ', obj.type);
     *     console.log('actType: ', obj.action);
     * }).catch(message => {
     *     console.log('error: ', message);
     * });
     */

  }, {
    key: 'removeFilter',
    value: function removeFilter(type) {
      return this.execute(_consts.commandNames.REMOVE_FILTER, type);
    }

    /**
     * Apply filter on canvas image
     * @param {string} type - Filter type
     * @param {object} options - Options to apply filter
     * @param {boolean} isSilent - is silent execution or not
     * @returns {Promise<FilterResult, ErrorMsg>}
     * @example
     * imageEditor.applyFilter('Grayscale');
     * @example
     * imageEditor.applyFilter('mask', {maskObjId: id}).then(obj => {
     *     console.log('filterType: ', obj.type);
     *     console.log('actType: ', obj.action);
     * }).catch(message => {
     *     console.log('error: ', message);
     * });;
     */

  }, {
    key: 'applyFilter',
    value: function applyFilter(type, options, isSilent) {
      var executeMethodName = isSilent ? 'executeSilent' : 'execute';

      return this[executeMethodName](_consts.commandNames.APPLY_FILTER, type, options);
    }

    /**
     * Get data url
     * @param {Object} options - options for toDataURL
     *   @param {String} [options.format=png] The format of the output image. Either "jpeg" or "png"
     *   @param {Number} [options.quality=1] Quality level (0..1). Only used for jpeg.
     *   @param {Number} [options.multiplier=1] Multiplier to scale by
     *   @param {Number} [options.left] Cropping left offset. Introduced in fabric v1.2.14
     *   @param {Number} [options.top] Cropping top offset. Introduced in fabric v1.2.14
     *   @param {Number} [options.width] Cropping width. Introduced in fabric v1.2.14
     *   @param {Number} [options.height] Cropping height. Introduced in fabric v1.2.14
     * @returns {string} A DOMString containing the requested data URI
     * @example
     * imgEl.src = imageEditor.toDataURL();
     *
     * imageEditor.loadImageFromURL(imageEditor.toDataURL(), 'FilterImage').then(() => {
     *      imageEditor.addImageObject(imgUrl);
     * });
     */

  }, {
    key: 'toDataURL',
    value: function toDataURL(options) {
      return this._graphics.toDataURL(options);
    }

    /**
     * Get image name
     * @returns {string} image name
     * @example
     * console.log(imageEditor.getImageName());
     */

  }, {
    key: 'getImageName',
    value: function getImageName() {
      return this._graphics.getImageName();
    }

    /**
     * Clear undoStack
     * @example
     * imageEditor.clearUndoStack();
     */

  }, {
    key: 'clearUndoStack',
    value: function clearUndoStack() {
      this._invoker.clearUndoStack();
    }

    /**
     * Clear redoStack
     * @example
     * imageEditor.clearRedoStack();
     */

  }, {
    key: 'clearRedoStack',
    value: function clearRedoStack() {
      this._invoker.clearRedoStack();
    }

    /**
     * Whehter the undo stack is empty or not
     * @returns {boolean}
     * imageEditor.isEmptyUndoStack();
     */

  }, {
    key: 'isEmptyUndoStack',
    value: function isEmptyUndoStack() {
      return this._invoker.isEmptyUndoStack();
    }

    /**
     * Whehter the redo stack is empty or not
     * @returns {boolean}
     * imageEditor.isEmptyRedoStack();
     */

  }, {
    key: 'isEmptyRedoStack',
    value: function isEmptyRedoStack() {
      return this._invoker.isEmptyRedoStack();
    }

    /**
     * Resize canvas dimension
     * @param {{width: number, height: number}} dimension - Max width & height
     * @returns {Promise}
     */

  }, {
    key: 'resizeCanvasDimension',
    value: function resizeCanvasDimension(dimension) {
      if (!dimension) {
        return _util.Promise.reject(_consts.rejectMessages.invalidParameters);
      }

      return this.execute(_consts.commandNames.RESIZE_CANVAS_DIMENSION, dimension);
    }

    /**
     * Destroy
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      var _this6 = this;

      this.stopDrawingMode();
      this._detachDomEvents();
      this._graphics.destroy();
      this._graphics = null;

      if (this.ui) {
        this._detachColorPickerInputBoxEvents();
        this.ui.destroy();
      }

      forEach(this, function (value, key) {
        _this6[key] = null;
      }, this);
    }

    /**
     * Set position
     * @param {Object} options - Position options (left or top)
     * @private
     */

  }, {
    key: '_setPositions',
    value: function _setPositions(options) {
      var centerPosition = this._graphics.getCenter();

      if (isUndefined(options.left)) {
        options.left = centerPosition.left;
      }

      if (isUndefined(options.top)) {
        options.top = centerPosition.top;
      }
    }

    /**
     * Set properties of active object
     * @param {number} id - object id
     * @param {Object} keyValue - key & value
     * @returns {Promise}
     * @example
     * imageEditor.setObjectProperties(id, {
     *     left:100,
     *     top:100,
     *     width: 200,
     *     height: 200,
     *     opacity: 0.5
     * });
     */

  }, {
    key: 'setObjectProperties',
    value: function setObjectProperties(id, keyValue) {
      return this.execute(_consts.commandNames.SET_OBJECT_PROPERTIES, id, keyValue);
    }

    /**
     * Set properties of active object, Do not leave an invoke history.
     * @param {number} id - object id
     * @param {Object} keyValue - key & value
     * @example
     * imageEditor.setObjectPropertiesQuietly(id, {
     *     left:100,
     *     top:100,
     *     width: 200,
     *     height: 200,
     *     opacity: 0.5
     * });
     */

  }, {
    key: 'setObjectPropertiesQuietly',
    value: function setObjectPropertiesQuietly(id, keyValue) {
      this._graphics.setObjectProperties(id, keyValue);
    }

    /**
     * Get properties of active object corresponding key
     * @param {number} id - object id
     * @param {Array<string>|ObjectProps|string} keys - property's key
     * @returns {ObjectProps} properties if id is valid or null
     * @example
     * var props = imageEditor.getObjectProperties(id, 'left');
     * console.log(props);
     * @example
     * var props = imageEditor.getObjectProperties(id, ['left', 'top', 'width', 'height']);
     * console.log(props);
     * @example
     * var props = imageEditor.getObjectProperties(id, {
     *     left: null,
     *     top: null,
     *     width: null,
     *     height: null,
     *     opacity: null
     * });
     * console.log(props);
     */

  }, {
    key: 'getObjectProperties',
    value: function getObjectProperties(id, keys) {
      var object = this._graphics.getObject(id);
      if (!object) {
        return null;
      }

      return this._graphics.getObjectProperties(id, keys);
    }

    /**
     * Get the canvas size
     * @returns {Object} {{width: number, height: number}} canvas size
     * @example
     * var canvasSize = imageEditor.getCanvasSize();
     * console.log(canvasSize.width);
     * console.height(canvasSize.height);
     */

  }, {
    key: 'getCanvasSize',
    value: function getCanvasSize() {
      return this._graphics.getCanvasSize();
    }

    /**
     * Get object position by originX, originY
     * @param {number} id - object id
     * @param {string} originX - can be 'left', 'center', 'right'
     * @param {string} originY - can be 'top', 'center', 'bottom'
     * @returns {Object} {{x:number, y: number}} position by origin if id is valid, or null
     * @example
     * var position = imageEditor.getObjectPosition(id, 'left', 'top');
     * console.log(position);
     */

  }, {
    key: 'getObjectPosition',
    value: function getObjectPosition(id, originX, originY) {
      return this._graphics.getObjectPosition(id, originX, originY);
    }

    /**
     * Set object position  by originX, originY
     * @param {number} id - object id
     * @param {Object} posInfo - position object
     *  @param {number} posInfo.x - x position
     *  @param {number} posInfo.y - y position
     *  @param {string} posInfo.originX - can be 'left', 'center', 'right'
     *  @param {string} posInfo.originY - can be 'top', 'center', 'bottom'
     * @returns {Promise}
     * @example
     * // align the object to 'left', 'top'
     * imageEditor.setObjectPosition(id, {
     *     x: 0,
     *     y: 0,
     *     originX: 'left',
     *     originY: 'top'
     * });
     * @example
     * // align the object to 'right', 'top'
     * var canvasSize = imageEditor.getCanvasSize();
     * imageEditor.setObjectPosition(id, {
     *     x: canvasSize.width,
     *     y: 0,
     *     originX: 'right',
     *     originY: 'top'
     * });
     * @example
     * // align the object to 'left', 'bottom'
     * var canvasSize = imageEditor.getCanvasSize();
     * imageEditor.setObjectPosition(id, {
     *     x: 0,
     *     y: canvasSize.height,
     *     originX: 'left',
     *     originY: 'bottom'
     * });
     * @example
     * // align the object to 'right', 'bottom'
     * var canvasSize = imageEditor.getCanvasSize();
     * imageEditor.setObjectPosition(id, {
     *     x: canvasSize.width,
     *     y: canvasSize.height,
     *     originX: 'right',
     *     originY: 'bottom'
     * });
     */

  }, {
    key: 'setObjectPosition',
    value: function setObjectPosition(id, posInfo) {
      return this.execute(_consts.commandNames.SET_OBJECT_POSITION, id, posInfo);
    }

    /**
     * @param {object} dimensions - Image Dimensions
     * @returns {Promise<ErrorMsg>}
     */

  }, {
    key: 'resize',
    value: function resize(dimensions) {
      return this.execute(_consts.commandNames.RESIZE_IMAGE, dimensions);
    }
  }]);

  return ImageEditor;
}();

_action2.default.mixin(ImageEditor);
CustomEvents.mixin(ImageEditor);

exports.default = ImageEditor;

/***/ }),

/***/ "./src/js/interface/command.js":
/*!*************************************!*\
  !*** ./src/js/interface/command.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @fileoverview Command interface
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _errorMessage = __webpack_require__(/*! @/factory/errorMessage */ "./src/js/factory/errorMessage.js");

var _errorMessage2 = _interopRequireDefault(_errorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var createMessage = _errorMessage2.default.create;
var errorTypes = _errorMessage2.default.types;

/**
 * Command class
 * @class
 * @param {{name:function, execute: function, undo: function,
 *          executeCallback: function, undoCallback: function}} actions - Command actions
 * @param {Array} args - passing arguments on execute, undo
 * @ignore
 */

var Command = function () {
  function Command(actions, args) {
    _classCallCheck(this, Command);

    /**
     * command name
     * @type {string}
     */
    this.name = actions.name;

    /**
     * arguments
     * @type {Array}
     */
    this.args = args;

    /**
     * Execute function
     * @type {function}
     */
    this.execute = actions.execute;

    /**
     * Undo function
     * @type {function}
     */
    this.undo = actions.undo;

    /**
     * executeCallback
     * @type {function}
     */
    this.executeCallback = actions.executeCallback || null;

    /**
     * undoCallback
     * @type {function}
     */
    this.undoCallback = actions.undoCallback || null;

    /**
     * data for undo
     * @type {Object}
     */
    this.undoData = {};
  }

  /**
   * Execute action
   * @param {Object.<string, Component>} compMap - Components injection
   * @abstract
   */


  _createClass(Command, [{
    key: 'execute',
    value: function execute() {
      throw new Error(createMessage(errorTypes.UN_IMPLEMENTATION, 'execute'));
    }

    /**
     * Undo action
     * @param {Object.<string, Component>} compMap - Components injection
     * @abstract
     */

  }, {
    key: 'undo',
    value: function undo() {
      throw new Error(createMessage(errorTypes.UN_IMPLEMENTATION, 'undo'));
    }

    /**
     * command for redo if undoData exists
     * @returns {boolean} isRedo
     */

  }, {
    key: 'setUndoData',


    /**
     * Set undoData action
     * @param {Object} undoData - maked undo data
     * @param {Object} cachedUndoDataForSilent - cached undo data
     * @param {boolean} isSilent - is silent execution or not
     * @returns {Object} cachedUndoDataForSilent
     */
    value: function setUndoData(undoData, cachedUndoDataForSilent, isSilent) {
      if (cachedUndoDataForSilent) {
        undoData = cachedUndoDataForSilent;
      }

      if (!isSilent) {
        _tuiCodeSnippet2.default.extend(this.undoData, undoData);
        cachedUndoDataForSilent = null;
      } else if (!cachedUndoDataForSilent) {
        cachedUndoDataForSilent = undoData;
      }

      return cachedUndoDataForSilent;
    }

    /**
     * Attach execute callabck
     * @param {function} callback - Callback after execution
     * @returns {Command} this
     */

  }, {
    key: 'setExecuteCallback',
    value: function setExecuteCallback(callback) {
      this.executeCallback = callback;

      return this;
    }

    /**
     * Attach undo callback
     * @param {function} callback - Callback after undo
     * @returns {Command} this
     */

  }, {
    key: 'setUndoCallback',
    value: function setUndoCallback(callback) {
      this.undoCallback = callback;

      return this;
    }
  }, {
    key: 'isRedo',
    get: function get() {
      return Object.keys(this.undoData).length > 0;
    }
  }]);

  return Command;
}();

exports.default = Command;

/***/ }),

/***/ "./src/js/interface/component.js":
/*!***************************************!*\
  !*** ./src/js/interface/component.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview Component interface
 */

/**
 * Component interface
 * @class
 * @param {string} name - component name
 * @param {Graphics} graphics - Graphics instance
 * @ignore
 */
var Component = function () {
  function Component(name, graphics) {
    _classCallCheck(this, Component);

    /**
     * Component name
     * @type {string}
     */
    this.name = name;

    /**
     * Graphics instance
     * @type {Graphics}
     */
    this.graphics = graphics;
  }

  /**
   * Fire Graphics event
   * @returns {Object} return value
   */


  _createClass(Component, [{
    key: "fire",
    value: function fire() {
      var context = this.graphics;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.graphics.fire.apply(context, args);
    }

    /**
     * Save image(background) of canvas
     * @param {string} name - Name of image
     * @param {fabric.Image} oImage - Fabric image instance
     */

  }, {
    key: "setCanvasImage",
    value: function setCanvasImage(name, oImage) {
      this.graphics.setCanvasImage(name, oImage);
    }

    /**
     * Returns canvas element of fabric.Canvas[[lower-canvas]]
     * @returns {HTMLCanvasElement}
     */

  }, {
    key: "getCanvasElement",
    value: function getCanvasElement() {
      return this.graphics.getCanvasElement();
    }

    /**
     * Get fabric.Canvas instance
     * @returns {fabric.Canvas}
     */

  }, {
    key: "getCanvas",
    value: function getCanvas() {
      return this.graphics.getCanvas();
    }

    /**
     * Get canvasImage (fabric.Image instance)
     * @returns {fabric.Image}
     */

  }, {
    key: "getCanvasImage",
    value: function getCanvasImage() {
      return this.graphics.getCanvasImage();
    }

    /**
     * Get image name
     * @returns {string}
     */

  }, {
    key: "getImageName",
    value: function getImageName() {
      return this.graphics.getImageName();
    }

    /**
     * Get image editor
     * @returns {ImageEditor}
     */

  }, {
    key: "getEditor",
    value: function getEditor() {
      return this.graphics.getEditor();
    }

    /**
     * Return component name
     * @returns {string}
     */

  }, {
    key: "getName",
    value: function getName() {
      return this.name;
    }

    /**
     * Set image properties
     * @param {Object} setting - Image properties
     * @param {boolean} [withRendering] - If true, The changed image will be reflected in the canvas
     */

  }, {
    key: "setImageProperties",
    value: function setImageProperties(setting, withRendering) {
      this.graphics.setImageProperties(setting, withRendering);
    }

    /**
     * Set canvas dimension - css only
     * @param {Object} dimension - Canvas css dimension
     */

  }, {
    key: "setCanvasCssDimension",
    value: function setCanvasCssDimension(dimension) {
      this.graphics.setCanvasCssDimension(dimension);
    }

    /**
     * Set canvas dimension - css only
     * @param {Object} dimension - Canvas backstore dimension
     */

  }, {
    key: "setCanvasBackstoreDimension",
    value: function setCanvasBackstoreDimension(dimension) {
      this.graphics.setCanvasBackstoreDimension(dimension);
    }

    /**
     * Adjust canvas dimension with scaling image
     */

  }, {
    key: "adjustCanvasDimension",
    value: function adjustCanvasDimension() {
      this.graphics.adjustCanvasDimension();
    }
  }, {
    key: "adjustCanvasDimensionBase",
    value: function adjustCanvasDimensionBase() {
      this.graphics.adjustCanvasDimensionBase();
    }
  }]);

  return Component;
}();

exports.default = Component;

/***/ }),

/***/ "./src/js/interface/drawingMode.js":
/*!*****************************************!*\
  !*** ./src/js/interface/drawingMode.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @fileoverview DrawingMode interface
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _errorMessage = __webpack_require__(/*! @/factory/errorMessage */ "./src/js/factory/errorMessage.js");

var _errorMessage2 = _interopRequireDefault(_errorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var createMessage = _errorMessage2.default.create;
var errorTypes = _errorMessage2.default.types;

/**
 * DrawingMode interface
 * @class
 * @param {string} name - drawing mode name
 * @ignore
 */

var DrawingMode = function () {
  function DrawingMode(name) {
    _classCallCheck(this, DrawingMode);

    /**
     * the name of drawing mode
     * @type {string}
     */
    this.name = name;
  }

  /**
   * Get this drawing mode name;
   * @returns {string} drawing mode name
   */


  _createClass(DrawingMode, [{
    key: 'getName',
    value: function getName() {
      return this.name;
    }

    /**
     * start this drawing mode
     * @param {Object} options - drawing mode options
     * @abstract
     */

  }, {
    key: 'start',
    value: function start() {
      throw new Error(createMessage(errorTypes.UN_IMPLEMENTATION, 'start'));
    }

    /**
     * stop this drawing mode
     * @abstract
     */

  }, {
    key: 'end',
    value: function end() {
      throw new Error(createMessage(errorTypes.UN_IMPLEMENTATION, 'stop'));
    }
  }]);

  return DrawingMode;
}();

exports.default = DrawingMode;

/***/ }),

/***/ "./src/js/invoker.js":
/*!***************************!*\
  !*** ./src/js/invoker.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author NHN. FE Development Team <dl_javascript@nhn.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @fileoverview Invoker - invoke commands
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _command = __webpack_require__(/*! @/factory/command */ "./src/js/factory/command.js");

var _command2 = _interopRequireDefault(_command);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isFunction = _tuiCodeSnippet2.default.isFunction,
    isString = _tuiCodeSnippet2.default.isString,
    CustomEvents = _tuiCodeSnippet2.default.CustomEvents;

/**
 * Invoker
 * @class
 * @ignore
 */

var Invoker = function () {
  function Invoker() {
    _classCallCheck(this, Invoker);

    /**
     * Undo stack
     * @type {Array.<Command>}
     * @private
     */
    this._undoStack = [];

    /**
     * Redo stack
     * @type {Array.<Command>}
     * @private
     */
    this._redoStack = [];

    /**
     * Lock-flag for executing command
     * @type {boolean}
     * @private
     */
    this._isLocked = false;

    this._isSilent = false;
  }

  /**
   * Invoke command execution
   * @param {Command} command - Command
   * @param {boolean} [isRedo=false] - check if command is redo
   * @returns {Promise}
   * @private
   */


  _createClass(Invoker, [{
    key: '_invokeExecution',
    value: function _invokeExecution(command) {
      var _this = this;

      var isRedo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.lock();

      var args = command.args;

      if (!args) {
        args = [];
      }

      return command.execute.apply(command, args).then(function (value) {
        if (!_this._isSilent) {
          _this.pushUndoStack(command);

          _this.fire(isRedo ? _consts.eventNames.AFTER_REDO : _consts.eventNames.EXECUTE_COMMAND, command);
        }
        _this.unlock();
        if (isFunction(command.executeCallback)) {
          command.executeCallback(value);
        }

        return value;
      })['catch'](function (message) {
        _this.unlock();

        return _util.Promise.reject(message);
      });
    }

    /**
     * Invoke command undo
     * @param {Command} command - Command
     * @returns {Promise}
     * @private
     */

  }, {
    key: '_invokeUndo',
    value: function _invokeUndo(command) {
      var _this2 = this;

      this.lock();

      var args = command.args;

      if (!args) {
        args = [];
      }

      return command.undo.apply(command, args).then(function (value) {
        _this2.pushRedoStack(command);
        _this2.fire(_consts.eventNames.AFTER_UNDO, command);
        _this2.unlock();
        if (isFunction(command.undoCallback)) {
          command.undoCallback(value);
        }

        return value;
      })['catch'](function (message) {
        _this2.unlock();

        return _util.Promise.reject(message);
      });
    }

    /**
     * fire REDO_STACK_CHANGED event
     * @private
     */

  }, {
    key: '_fireRedoStackChanged',
    value: function _fireRedoStackChanged() {
      this.fire(_consts.eventNames.REDO_STACK_CHANGED, this._redoStack.length);
    }

    /**
     * fire UNDO_STACK_CHANGED event
     * @private
     */

  }, {
    key: '_fireUndoStackChanged',
    value: function _fireUndoStackChanged() {
      this.fire(_consts.eventNames.UNDO_STACK_CHANGED, this._undoStack.length);
    }

    /**
     * Lock this invoker
     */

  }, {
    key: 'lock',
    value: function lock() {
      this._isLocked = true;
    }

    /**
     * Unlock this invoker
     */

  }, {
    key: 'unlock',
    value: function unlock() {
      this._isLocked = false;
    }
  }, {
    key: 'executeSilent',
    value: function executeSilent() {
      var _this3 = this;

      this._isSilent = true;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.execute.apply(this, args.concat([this._isSilent])).then(function () {
        _this3._isSilent = false;
      });
    }

    /**
     * Invoke command
     * Store the command to the undoStack
     * Clear the redoStack
     * @param {String} commandName - Command name
     * @param {...*} args - Arguments for creating command
     * @returns {Promise}
     */

  }, {
    key: 'execute',
    value: function execute() {
      var _this4 = this;

      if (this._isLocked) {
        return _util.Promise.reject(_consts.rejectMessages.isLock);
      }

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var command = args[0];

      if (isString(command)) {
        command = _command2.default.create.apply(_command2.default, args);
      }

      return this._invokeExecution(command).then(function (value) {
        _this4.clearRedoStack();

        return value;
      });
    }

    /**
     * Undo command
     * @returns {Promise}
     */

  }, {
    key: 'undo',
    value: function undo() {
      var command = this._undoStack.pop();
      var promise = void 0;
      var message = '';

      if (command && this._isLocked) {
        this.pushUndoStack(command, true);
        command = null;
      }
      if (command) {
        if (this.isEmptyUndoStack()) {
          this._fireUndoStackChanged();
        }
        promise = this._invokeUndo(command);
      } else {
        message = _consts.rejectMessages.undo;
        if (this._isLocked) {
          message = message + ' Because ' + _consts.rejectMessages.isLock;
        }
        promise = _util.Promise.reject(message);
      }

      return promise;
    }

    /**
     * Redo command
     * @returns {Promise}
     */

  }, {
    key: 'redo',
    value: function redo() {
      var command = this._redoStack.pop();
      var promise = void 0;
      var message = '';

      if (command && this._isLocked) {
        this.pushRedoStack(command, true);
        command = null;
      }
      if (command) {
        if (this.isEmptyRedoStack()) {
          this._fireRedoStackChanged();
        }
        promise = this._invokeExecution(command, true);
      } else {
        message = _consts.rejectMessages.redo;
        if (this._isLocked) {
          message = message + ' Because ' + _consts.rejectMessages.isLock;
        }
        promise = _util.Promise.reject(message);
      }

      return promise;
    }

    /**
     * Push undo stack
     * @param {Command} command - command
     * @param {boolean} [isSilent] - Fire event or not
     */

  }, {
    key: 'pushUndoStack',
    value: function pushUndoStack(command, isSilent) {
      this._undoStack.push(command);
      if (!isSilent) {
        this._fireUndoStackChanged();
      }
    }

    /**
     * Push redo stack
     * @param {Command} command - command
     * @param {boolean} [isSilent] - Fire event or not
     */

  }, {
    key: 'pushRedoStack',
    value: function pushRedoStack(command, isSilent) {
      this._redoStack.push(command);
      if (!isSilent) {
        this._fireRedoStackChanged();
      }
    }

    /**
     * Return whether the redoStack is empty
     * @returns {boolean}
     */

  }, {
    key: 'isEmptyRedoStack',
    value: function isEmptyRedoStack() {
      return this._redoStack.length === 0;
    }

    /**
     * Return whether the undoStack is empty
     * @returns {boolean}
     */

  }, {
    key: 'isEmptyUndoStack',
    value: function isEmptyUndoStack() {
      return this._undoStack.length === 0;
    }

    /**
     * Clear undoStack
     */

  }, {
    key: 'clearUndoStack',
    value: function clearUndoStack() {
      if (!this.isEmptyUndoStack()) {
        this._undoStack = [];
        this._fireUndoStackChanged();
      }
    }

    /**
     * Clear redoStack
     */

  }, {
    key: 'clearRedoStack',
    value: function clearRedoStack() {
      if (!this.isEmptyRedoStack()) {
        this._redoStack = [];
        this._fireRedoStackChanged();
      }
    }
  }]);

  return Invoker;
}();

CustomEvents.mixin(Invoker);

exports.default = Invoker;

/***/ }),

/***/ "./src/js/polyfill.js":
/*!****************************!*\
  !*** ./src/js/polyfill.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
// Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/if (!Element.prototype.matches)
Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest) Element.prototype.closest = function (s) {
  var el = this;
  if (!document.documentElement.contains(el)) return null;
  do {
    if (el.matches(s)) return el;
    el = el.parentElement || el.parentNode;
  } while (el !== null && el.nodeType === 1);
  return null;
};

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ('document' in window.self) {
  // Full polyfill for browsers with no classList support
  // Including IE < Edge missing SVGElement.classList
  if (!('classList' in document.createElement('_')) || document.createElementNS && !('classList' in document.createElementNS('http://www.w3.org/2000/svg', 'g'))) {
    (function (view) {
      'use strict';

      if (!('Element' in view)) return;

      var classListProp = 'classList',
          protoProp = 'prototype',
          elemCtrProto = view.Element[protoProp],
          objCtr = Object,
          strTrim = String[protoProp].trim || function () {
        return this.replace(/^\s+|\s+$/g, '');
      },
          arrIndexOf = Array[protoProp].indexOf || function (item) {
        var i = 0,
            len = this.length;
        for (; i < len; i++) {
          if (i in this && this[i] === item) {
            return i;
          }
        }
        return -1;
      },

      // Vendors: please allow content code to instantiate DOMExceptions
      DOMEx = function DOMEx(type, message) {
        this.name = type;
        this.code = DOMException[type];
        this.message = message;
      },
          checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
        if (token === '') {
          throw new DOMEx('SYNTAX_ERR', 'An invalid or illegal string was specified');
        }
        if (/\s/.test(token)) {
          throw new DOMEx('INVALID_CHARACTER_ERR', 'String contains an invalid character');
        }
        return arrIndexOf.call(classList, token);
      },
          ClassList = function ClassList(elem) {
        var trimmedClasses = strTrim.call(elem.getAttribute('class') || ''),
            classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
            i = 0,
            len = classes.length;
        for (; i < len; i++) {
          this.push(classes[i]);
        }
        this._updateClassName = function () {
          elem.setAttribute('class', this.toString());
        };
      },
          classListProto = ClassList[protoProp] = [],
          classListGetter = function classListGetter() {
        return new ClassList(this);
      };
      // Most DOMException implementations don't allow calling DOMException's toString()
      // on non-DOMExceptions. Error's toString() is sufficient here.
      DOMEx[protoProp] = Error[protoProp];
      classListProto.item = function (i) {
        return this[i] || null;
      };
      classListProto.contains = function (token) {
        token += '';
        return checkTokenAndGetIndex(this, token) !== -1;
      };
      classListProto.add = function () {
        var tokens = arguments,
            i = 0,
            l = tokens.length,
            token,
            updated = false;
        do {
          token = tokens[i] + '';
          if (checkTokenAndGetIndex(this, token) === -1) {
            this.push(token);
            updated = true;
          }
        } while (++i < l);

        if (updated) {
          this._updateClassName();
        }
      };
      classListProto.remove = function () {
        var tokens = arguments,
            i = 0,
            l = tokens.length,
            token,
            updated = false,
            index;
        do {
          token = tokens[i] + '';
          index = checkTokenAndGetIndex(this, token);
          while (index !== -1) {
            this.splice(index, 1);
            updated = true;
            index = checkTokenAndGetIndex(this, token);
          }
        } while (++i < l);

        if (updated) {
          this._updateClassName();
        }
      };
      classListProto.toggle = function (token, force) {
        token += '';

        var result = this.contains(token),
            method = result ? force !== true && 'remove' : force !== false && 'add';
        if (method) {
          this[method](token);
        }

        if (force === true || force === false) {
          return force;
        } else {
          return !result;
        }
      };
      classListProto.toString = function () {
        return this.join(' ');
      };

      if (objCtr.defineProperty) {
        var classListPropDesc = {
          get: classListGetter,
          enumerable: true,
          configurable: true
        };
        try {
          objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        } catch (ex) {
          // IE 8 doesn't support enumerable:true
          // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
          // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
          if (ex.number === undefined || ex.number === -0x7ff5ec54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
          }
        }
      } else if (objCtr[protoProp].__defineGetter__) {
        elemCtrProto.__defineGetter__(classListProp, classListGetter);
      }
    })(window.self);
  }

  // There is full or partial native classList support, so just check if we need
  // to normalize the add/remove and toggle APIs.

  (function () {
    'use strict';

    var testElement = document.createElement('_');

    testElement.classList.add('c1', 'c2');

    // Polyfill for IE 10/11 and Firefox <26, where classList.add and
    // classList.remove exist but support only one argument at a time.
    if (!testElement.classList.contains('c2')) {
      var createMethod = function createMethod(method) {
        var original = DOMTokenList.prototype[method];

        DOMTokenList.prototype[method] = function (token) {
          var i,
              len = arguments.length;

          for (i = 0; i < len; i++) {
            token = arguments[i];
            original.call(this, token);
          }
        };
      };
      createMethod('add');
      createMethod('remove');
    }

    testElement.classList.toggle('c3', false);

    // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
    // support the second argument.
    if (testElement.classList.contains('c3')) {
      var _toggle = DOMTokenList.prototype.toggle;

      DOMTokenList.prototype.toggle = function (token, force) {
        if (1 in arguments && !this.contains(token) === !force) {
          return force;
        } else {
          return _toggle.call(this, token);
        }
      };
    }

    testElement = null;
  })();
}

/*!
 * @copyright Copyright (c) 2017 IcoMoon.io
 * @license   Licensed under MIT license
 *            See https://github.com/Keyamoon/svgxuse
 * @version   1.2.6
 */
/*jslint browser: true */
/*global XDomainRequest, MutationObserver, window */
(function () {
  'use strict';

  if (typeof window !== 'undefined' && window.addEventListener) {
    var cache = Object.create(null); // holds xhr objects to prevent multiple requests
    var checkUseElems;
    var tid; // timeout id
    var debouncedCheck = function debouncedCheck() {
      clearTimeout(tid);
      tid = setTimeout(checkUseElems, 100);
    };
    var unobserveChanges = function unobserveChanges() {
      return;
    };
    var observeChanges = function observeChanges() {
      var observer;
      window.addEventListener('resize', debouncedCheck, false);
      window.addEventListener('orientationchange', debouncedCheck, false);
      if (window.MutationObserver) {
        observer = new MutationObserver(debouncedCheck);
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
          attributes: true
        });
        unobserveChanges = function unobserveChanges() {
          try {
            observer.disconnect();
            window.removeEventListener('resize', debouncedCheck, false);
            window.removeEventListener('orientationchange', debouncedCheck, false);
          } catch (ignore) {}
        };
      } else {
        document.documentElement.addEventListener('DOMSubtreeModified', debouncedCheck, false);
        unobserveChanges = function unobserveChanges() {
          document.documentElement.removeEventListener('DOMSubtreeModified', debouncedCheck, false);
          window.removeEventListener('resize', debouncedCheck, false);
          window.removeEventListener('orientationchange', debouncedCheck, false);
        };
      }
    };
    var createRequest = function createRequest(url) {
      // In IE 9, cross origin requests can only be sent using XDomainRequest.
      // XDomainRequest would fail if CORS headers are not set.
      // Therefore, XDomainRequest should only be used with cross origin requests.
      function getOrigin(loc) {
        var a;
        if (loc.protocol !== undefined) {
          a = loc;
        } else {
          a = document.createElement('a');
          a.href = loc;
        }
        return a.protocol.replace(/:/g, '') + a.host;
      }
      var Request;
      var origin;
      var origin2;
      if (window.XMLHttpRequest) {
        Request = new XMLHttpRequest();
        origin = getOrigin(location);
        origin2 = getOrigin(url);
        if (Request.withCredentials === undefined && origin2 !== '' && origin2 !== origin) {
          Request = XDomainRequest || undefined;
        } else {
          Request = XMLHttpRequest;
        }
      }
      return Request;
    };
    var xlinkNS = 'http://www.w3.org/1999/xlink';
    checkUseElems = function checkUseElems() {
      var base;
      var bcr;
      var fallback = ''; // optional fallback URL in case no base path to SVG file was given and no symbol definition was found.
      var hash;
      var href;
      var i;
      var inProgressCount = 0;
      var isHidden;
      var Request;
      var url;
      var uses;
      var xhr;
      function observeIfDone() {
        // If done with making changes, start watching for chagnes in DOM again
        inProgressCount -= 1;
        if (inProgressCount === 0) {
          // if all xhrs were resolved
          unobserveChanges(); // make sure to remove old handlers
          observeChanges(); // watch for changes to DOM
        }
      }
      function attrUpdateFunc(spec) {
        return function () {
          if (cache[spec.base] !== true) {
            spec.useEl.setAttributeNS(xlinkNS, 'xlink:href', '#' + spec.hash);
            if (spec.useEl.hasAttribute('href')) {
              spec.useEl.setAttribute('href', '#' + spec.hash);
            }
          }
        };
      }
      function onloadFunc(xhr) {
        return function () {
          var body = document.body;
          var x = document.createElement('x');
          var svg;
          xhr.onload = null;
          x.innerHTML = xhr.responseText;
          svg = x.getElementsByTagName('svg')[0];
          if (svg) {
            svg.setAttribute('aria-hidden', 'true');
            svg.style.position = 'absolute';
            svg.style.width = 0;
            svg.style.height = 0;
            svg.style.overflow = 'hidden';
            body.insertBefore(svg, body.firstChild);
          }
          observeIfDone();
        };
      }
      function onErrorTimeout(xhr) {
        return function () {
          xhr.onerror = null;
          xhr.ontimeout = null;
          observeIfDone();
        };
      }
      unobserveChanges(); // stop watching for changes to DOM
      // find all use elements
      uses = document.getElementsByTagName('use');
      for (i = 0; i < uses.length; i += 1) {
        try {
          bcr = uses[i].getBoundingClientRect();
        } catch (ignore) {
          // failed to get bounding rectangle of the use element
          bcr = false;
        }
        href = uses[i].getAttribute('href') || uses[i].getAttributeNS(xlinkNS, 'href') || uses[i].getAttribute('xlink:href');
        if (href && href.split) {
          url = href.split('#');
        } else {
          url = ['', ''];
        }
        base = url[0];
        hash = url[1];
        isHidden = bcr && bcr.left === 0 && bcr.right === 0 && bcr.top === 0 && bcr.bottom === 0;
        if (bcr && bcr.width === 0 && bcr.height === 0 && !isHidden) {
          // the use element is empty
          // if there is a reference to an external SVG, try to fetch it
          // use the optional fallback URL if there is no reference to an external SVG
          if (fallback && !base.length && hash && !document.getElementById(hash)) {
            base = fallback;
          }
          if (uses[i].hasAttribute('href')) {
            uses[i].setAttributeNS(xlinkNS, 'xlink:href', href);
          }
          if (base.length) {
            // schedule updating xlink:href
            xhr = cache[base];
            if (xhr !== true) {
              // true signifies that prepending the SVG was not required
              setTimeout(attrUpdateFunc({
                useEl: uses[i],
                base: base,
                hash: hash
              }), 0);
            }
            if (xhr === undefined) {
              Request = createRequest(base);
              if (Request !== undefined) {
                xhr = new Request();
                cache[base] = xhr;
                xhr.onload = onloadFunc(xhr);
                xhr.onerror = onErrorTimeout(xhr);
                xhr.ontimeout = onErrorTimeout(xhr);
                xhr.open('GET', base);
                xhr.send();
                inProgressCount += 1;
              }
            }
          }
        } else {
          if (!isHidden) {
            if (cache[base] === undefined) {
              // remember this URL if the use element was not empty and no request was sent
              cache[base] = true;
            } else if (cache[base].onload) {
              // if it turns out that prepending the SVG is not necessary,
              // abort the in-progress xhr.
              cache[base].abort();
              delete cache[base].onload;
              cache[base] = true;
            }
          } else if (base.length && cache[base]) {
            setTimeout(attrUpdateFunc({
              useEl: uses[i],
              base: base,
              hash: hash
            }), 0);
          }
        }
      }
      uses = '';
      inProgressCount += 1;
      observeIfDone();
    };
    var _winLoad;
    _winLoad = function winLoad() {
      window.removeEventListener('load', _winLoad, false); // to prevent memory leaks
      tid = setTimeout(checkUseElems, 0);
    };
    if (document.readyState !== 'complete') {
      // The load event fires when all resources have finished loading, which allows detecting whether SVG use elements are empty.
      window.addEventListener('load', _winLoad, false);
    } else {
      // No need to add a listener if the document is already loaded, initialize immediately.
      _winLoad();
    }
  }
})();

/***/ }),

/***/ "./src/js/ui.js":
/*!**********************!*\
  !*** ./src/js/ui.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

var _mainContainer = __webpack_require__(/*! @/ui/template/mainContainer */ "./src/js/ui/template/mainContainer.js");

var _mainContainer2 = _interopRequireDefault(_mainContainer);

var _controls = __webpack_require__(/*! @/ui/template/controls */ "./src/js/ui/template/controls.js");

var _controls2 = _interopRequireDefault(_controls);

var _theme = __webpack_require__(/*! @/ui/theme/theme */ "./src/js/ui/theme/theme.js");

var _theme2 = _interopRequireDefault(_theme);

var _shape = __webpack_require__(/*! @/ui/shape */ "./src/js/ui/shape.js");

var _shape2 = _interopRequireDefault(_shape);

var _crop = __webpack_require__(/*! @/ui/crop */ "./src/js/ui/crop.js");

var _crop2 = _interopRequireDefault(_crop);

var _resize = __webpack_require__(/*! @/ui/resize */ "./src/js/ui/resize.js");

var _resize2 = _interopRequireDefault(_resize);

var _flip = __webpack_require__(/*! @/ui/flip */ "./src/js/ui/flip.js");

var _flip2 = _interopRequireDefault(_flip);

var _rotate = __webpack_require__(/*! @/ui/rotate */ "./src/js/ui/rotate.js");

var _rotate2 = _interopRequireDefault(_rotate);

var _text = __webpack_require__(/*! @/ui/text */ "./src/js/ui/text.js");

var _text2 = _interopRequireDefault(_text);

var _mask = __webpack_require__(/*! @/ui/mask */ "./src/js/ui/mask.js");

var _mask2 = _interopRequireDefault(_mask);

var _icon = __webpack_require__(/*! @/ui/icon */ "./src/js/ui/icon.js");

var _icon2 = _interopRequireDefault(_icon);

var _draw = __webpack_require__(/*! @/ui/draw */ "./src/js/ui/draw.js");

var _draw2 = _interopRequireDefault(_draw);

var _filter = __webpack_require__(/*! @/ui/filter */ "./src/js/ui/filter.js");

var _filter2 = _interopRequireDefault(_filter);

var _history = __webpack_require__(/*! @/ui/history */ "./src/js/ui/history.js");

var _history2 = _interopRequireDefault(_history);

var _locale = __webpack_require__(/*! @/ui/locale/locale */ "./src/js/ui/locale/locale.js");

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SUB_UI_COMPONENT = {
  Shape: _shape2.default,
  Crop: _crop2.default,
  Resize: _resize2.default,
  Flip: _flip2.default,
  Rotate: _rotate2.default,
  Text: _text2.default,
  Mask: _mask2.default,
  Icon: _icon2.default,
  Draw: _draw2.default,
  Filter: _filter2.default
};

var CustomEvents = _tuiCodeSnippet2.default.CustomEvents;


var BI_EXPRESSION_MINSIZE_WHEN_TOP_POSITION = '1300';
var HISTORY_MENU = 'history';
var HISTORY_PANEL_CLASS_NAME = 'tie-panel-history';

var CLASS_NAME_ON = 'on';
var ZOOM_BUTTON_TYPE = {
  ZOOM_IN: 'zoomIn',
  HAND: 'hand'
};

/**
 * Ui class
 * @class
 * @param {string|HTMLElement} element - Wrapper's element or selector
 * @param {Object} [options] - Ui setting options
 *   @param {number} options.loadImage - Init default load image
 *   @param {number} options.initMenu - Init start menu
 *   @param {Boolean} [options.menuBarPosition=bottom] - Let
 *   @param {Boolean} [options.applyCropSelectionStyle=false] - Let
 *   @param {Boolean} [options.usageStatistics=false] - Use statistics or not
 *   @param {Object} [options.uiSize] - ui size of editor
 *     @param {string} options.uiSize.width - width of ui
 *     @param {string} options.uiSize.height - height of ui
 * @param {Object} actions - ui action instance
 */

var Ui = function () {
  function Ui(element, options, actions) {
    _classCallCheck(this, Ui);

    this.options = this._initializeOption(options);
    this._actions = actions;
    this.submenu = false;
    this.imageSize = {};
    this.uiSize = {};
    this._locale = new _locale2.default(this.options.locale);
    this.theme = new _theme2.default(this.options.theme);
    this.eventHandler = {};
    this._submenuChangeTransection = false;
    this._selectedElement = null;
    this._mainElement = null;
    this._editorElementWrap = null;
    this._editorElement = null;
    this._menuBarElement = null;
    this._subMenuElement = null;
    this._makeUiElement(element);
    this._setUiSize();
    this._initMenuEvent = false;

    this._makeSubMenu();

    this._attachHistoryEvent();
    this._attachZoomEvent();
  }

  /**
   * Destroys the instance.
   */


  _createClass(Ui, [{
    key: 'destroy',
    value: function destroy() {
      this._removeUiEvent();
      this._destroyAllMenu();
      this._selectedElement.innerHTML = '';

      (0, _util.assignmentForDestroy)(this);
    }

    /**
     * Set Default Selection for includeUI
     * @param {Object} option - imageEditor options
     * @returns {Object} - extends selectionStyle option
     * @ignore
     */

  }, {
    key: 'setUiDefaultSelectionStyle',
    value: function setUiDefaultSelectionStyle(option) {
      return _tuiCodeSnippet2.default.extend({
        applyCropSelectionStyle: true,
        applyGroupSelectionStyle: true,
        selectionStyle: {
          cornerStyle: 'circle',
          cornerSize: 16,
          cornerColor: '#fff',
          cornerStrokeColor: '#fff',
          transparentCorners: false,
          lineWidth: 2,
          borderColor: '#fff'
        }
      }, option);
    }

    /**
     * Change editor size
     * @param {Object} resizeInfo - ui & image size info
     *   @param {Object} [resizeInfo.uiSize] - image size dimension
     *     @param {string} resizeInfo.uiSize.width - ui width
     *     @param {string} resizeInfo.uiSize.height - ui height
     *   @param {Object} [resizeInfo.imageSize] - image size dimension
     *     @param {Number} resizeInfo.imageSize.oldWidth - old width
     *     @param {Number} resizeInfo.imageSize.oldHeight - old height
     *     @param {Number} resizeInfo.imageSize.newWidth - new width
     *     @param {Number} resizeInfo.imageSize.newHeight - new height
     * @example
     * // Change the image size and ui size, and change the affected ui state together.
     * imageEditor.ui.resizeEditor({
     *     imageSize: {oldWidth: 100, oldHeight: 100, newWidth: 700, newHeight: 700},
     *     uiSize: {width: 1000, height: 1000}
     * });
     * @example
     * // Apply the ui state while preserving the previous attribute (for example, if responsive Ui)
     * imageEditor.ui.resizeEditor();
     */

  }, {
    key: 'resizeEditor',
    value: function resizeEditor() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          uiSize = _ref.uiSize,
          _ref$imageSize = _ref.imageSize,
          imageSize = _ref$imageSize === undefined ? this.imageSize : _ref$imageSize;

      if (imageSize !== this.imageSize) {
        this.imageSize = imageSize;
      }
      if (uiSize) {
        this._setUiSize(uiSize);
      }

      var _getCanvasMaxDimensio = this._getCanvasMaxDimension(),
          width = _getCanvasMaxDimensio.width,
          height = _getCanvasMaxDimensio.height;

      var editorElementStyle = this._editorElement.style;
      var menuBarPosition = this.options.menuBarPosition;


      editorElementStyle.height = height + 'px';
      editorElementStyle.width = width + 'px';

      this._setEditorPosition(menuBarPosition);

      this._editorElementWrap.style.bottom = '0px';
      this._editorElementWrap.style.top = '0px';
      this._editorElementWrap.style.left = '0px';
      this._editorElementWrap.style.width = '100%';

      var selectElementClassList = this._selectedElement.classList;

      if (menuBarPosition === 'top' && this._selectedElement.offsetWidth < BI_EXPRESSION_MINSIZE_WHEN_TOP_POSITION) {
        selectElementClassList.add('tui-image-editor-top-optimization');
      } else {
        selectElementClassList.remove('tui-image-editor-top-optimization');
      }
    }

    /**
     * Toggle zoom button status
     * @param {string} type - type of zoom button
     */

  }, {
    key: 'toggleZoomButtonStatus',
    value: function toggleZoomButtonStatus(type) {
      var targetClassList = this._buttonElements[type].classList;

      targetClassList.toggle(CLASS_NAME_ON);

      if (type === ZOOM_BUTTON_TYPE.ZOOM_IN) {
        this._buttonElements[ZOOM_BUTTON_TYPE.HAND].classList.remove(CLASS_NAME_ON);
      } else {
        this._buttonElements[ZOOM_BUTTON_TYPE.ZOOM_IN].classList.remove(CLASS_NAME_ON);
      }
    }

    /**
     * Turn off zoom-in button status
     */

  }, {
    key: 'offZoomInButtonStatus',
    value: function offZoomInButtonStatus() {
      var zoomInClassList = this._buttonElements[ZOOM_BUTTON_TYPE.ZOOM_IN].classList;

      zoomInClassList.remove(CLASS_NAME_ON);
    }

    /**
     * Change hand button status
     * @param {boolean} enabled - status to change
     */

  }, {
    key: 'changeHandButtonStatus',
    value: function changeHandButtonStatus(enabled) {
      var handClassList = this._buttonElements[ZOOM_BUTTON_TYPE.HAND].classList;

      handClassList[enabled ? 'add' : 'remove'](CLASS_NAME_ON);
    }

    /**
     * Change help button status
     * @param {string} buttonType - target button type
     * @param {Boolean} enableStatus - enabled status
     * @ignore
     */

  }, {
    key: 'changeHelpButtonEnabled',
    value: function changeHelpButtonEnabled(buttonType, enableStatus) {
      var buttonClassList = this._buttonElements[buttonType].classList;

      buttonClassList[enableStatus ? 'add' : 'remove']('enabled');
    }

    /**
     * Change delete button status
     * @param {Object} [options] - Ui setting options
     *   @param {object} [options.loadImage] - Init default load image
     *   @param {string} [options.initMenu] - Init start menu
     *   @param {string} [options.menuBarPosition=bottom] - Let
     *   @param {boolean} [options.applyCropSelectionStyle=false] - Let
     *   @param {boolean} [options.usageStatistics=false] - Send statistics ping or not
     * @returns {Object} initialize option
     * @private
     */

  }, {
    key: '_initializeOption',
    value: function _initializeOption(options) {
      return _tuiCodeSnippet2.default.extend({
        loadImage: {
          path: '',
          name: ''
        },
        locale: {},
        menuIconPath: '',
        menu: ['resize', 'crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'mask', 'filter'],
        initMenu: '',
        uiSize: {
          width: '100%',
          height: '100%'
        },
        menuBarPosition: 'bottom'
      }, options);
    }

    /**
     * Set ui container size
     * @param {Object} uiSize - ui dimension
     *   @param {string} uiSize.width - css width property
     *   @param {string} uiSize.height - css height property
     * @private
     */

  }, {
    key: '_setUiSize',
    value: function _setUiSize() {
      var uiSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.uiSize;

      var elementDimension = this._selectedElement.style;
      elementDimension.width = uiSize.width;
      elementDimension.height = uiSize.height;
    }

    /**
     * Make submenu dom element
     * @private
     */

  }, {
    key: '_makeSubMenu',
    value: function _makeSubMenu() {
      var _this = this;

      _tuiCodeSnippet2.default.forEach(this.options.menu, function (menuName) {
        var SubComponentClass = SUB_UI_COMPONENT[menuName.replace(/^[a-z]/, function ($0) {
          return $0.toUpperCase();
        })];

        // make menu element
        _this._makeMenuElement(menuName);

        // menu btn element
        _this._buttonElements[menuName] = _this._menuBarElement.querySelector('.tie-btn-' + menuName);

        // submenu ui instance
        _this[menuName] = new SubComponentClass(_this._subMenuElement, {
          locale: _this._locale,
          makeSvgIcon: _this.theme.makeMenSvgIconSet.bind(_this.theme),
          menuBarPosition: _this.options.menuBarPosition,
          usageStatistics: _this.options.usageStatistics
        });
      });
    }

    /**
     * Attach history event
     * @private
     */

  }, {
    key: '_attachHistoryEvent',
    value: function _attachHistoryEvent() {
      this.on(_consts.eventNames.EXECUTE_COMMAND, this._addHistory.bind(this));
      this.on(_consts.eventNames.AFTER_UNDO, this._selectPrevHistory.bind(this));
      this.on(_consts.eventNames.AFTER_REDO, this._selectNextHistory.bind(this));
    }

    /**
     * Attach zoom event
     * @private
     */

  }, {
    key: '_attachZoomEvent',
    value: function _attachZoomEvent() {
      var _this2 = this;

      this.on(_consts.eventNames.HAND_STARTED, function () {
        _this2.offZoomInButtonStatus();
        _this2.changeHandButtonStatus(true);
      });
      this.on(_consts.eventNames.HAND_STOPPED, function () {
        return _this2.changeHandButtonStatus(false);
      });
    }

    /**
     * Make primary ui dom element
     * @param {string|HTMLElement} element - Wrapper's element or selector
     * @private
     */

  }, {
    key: '_makeUiElement',
    value: function _makeUiElement(element) {
      var selectedElement = void 0;

      window.snippet = _tuiCodeSnippet2.default;

      if (element.nodeType) {
        selectedElement = element;
      } else {
        selectedElement = document.querySelector(element);
      }
      var selector = (0, _util.getSelector)(selectedElement);

      selectedElement.classList.add('tui-image-editor-container');
      selectedElement.innerHTML = (0, _controls2.default)({
        locale: this._locale,
        biImage: this.theme.getStyle('common.bi'),
        loadButtonStyle: this.theme.getStyle('loadButton'),
        downloadButtonStyle: this.theme.getStyle('downloadButton'),
        menuBarPosition: this.options.menuBarPosition
      }) + (0, _mainContainer2.default)({
        locale: this._locale,
        biImage: this.theme.getStyle('common.bi'),
        commonStyle: this.theme.getStyle('common'),
        headerStyle: this.theme.getStyle('header'),
        loadButtonStyle: this.theme.getStyle('loadButton'),
        downloadButtonStyle: this.theme.getStyle('downloadButton'),
        submenuStyle: this.theme.getStyle('submenu')
      });

      this._selectedElement = selectedElement;
      this._selectedElement.classList.add(this.options.menuBarPosition);

      this._mainElement = selector('.tui-image-editor-main');
      this._editorElementWrap = selector('.tui-image-editor-wrap');
      this._editorElement = selector('.tui-image-editor');
      this._helpMenuBarElement = selector('.tui-image-editor-help-menu');
      this._menuBarElement = selector('.tui-image-editor-menu');
      this._subMenuElement = selector('.tui-image-editor-submenu');
      this._buttonElements = {
        download: this._selectedElement.querySelectorAll('.tui-image-editor-download-btn'),
        load: this._selectedElement.querySelectorAll('.tui-image-editor-load-btn')
      };

      this._addHelpMenus();

      this._historyMenu = new _history2.default(this._buttonElements[HISTORY_MENU], {
        locale: this._locale,
        makeSvgIcon: this.theme.makeMenSvgIconSet.bind(this.theme)
      });

      this._activateZoomMenus();
    }

    /**
     * Activate help menus for zoom.
     * @private
     */

  }, {
    key: '_activateZoomMenus',
    value: function _activateZoomMenus() {
      var _this3 = this;

      _tuiCodeSnippet2.default.forEach(_consts.ZOOM_HELP_MENUS, function (menu) {
        _this3.changeHelpButtonEnabled(menu, true);
      });
    }

    /**
     * make array for help menu output, including partitions.
     * @returns {Array}
     * @private
     */

  }, {
    key: '_makeHelpMenuWithPartition',
    value: function _makeHelpMenuWithPartition() {
      return [].concat(_consts.ZOOM_HELP_MENUS, [''], _consts.COMMAND_HELP_MENUS, [''], _consts.DELETE_HELP_MENUS);
    }

    /**
     * Add help menu
     * @private
     */

  }, {
    key: '_addHelpMenus',
    value: function _addHelpMenus() {
      var _this4 = this;

      var helpMenuWithPartition = this._makeHelpMenuWithPartition();

      _tuiCodeSnippet2.default.forEach(helpMenuWithPartition, function (menuName) {
        if (!menuName) {
          _this4._makeMenuPartitionElement();
        } else {
          _this4._makeMenuElement(menuName, ['normal', 'disabled', 'hover'], 'help');

          _this4._buttonElements[menuName] = _this4._helpMenuBarElement.querySelector('.tie-btn-' + menuName);
        }
      });
    }

    /**
     * Make menu partition element
     * @private
     */

  }, {
    key: '_makeMenuPartitionElement',
    value: function _makeMenuPartitionElement() {
      var partitionElement = document.createElement('li');
      var partitionInnerElement = document.createElement('div');
      partitionElement.className = (0, _util.cls)('item');
      partitionInnerElement.className = (0, _util.cls)('icpartition');
      partitionElement.appendChild(partitionInnerElement);

      this._helpMenuBarElement.appendChild(partitionElement);
    }

    /**
     * Make menu button element
     * @param {string} menuName - menu name
     * @param {Array} useIconTypes - Possible values are  \['normal', 'active', 'hover', 'disabled'\]
     * @param {string} menuType - 'normal' or 'help'
     * @private
     */

  }, {
    key: '_makeMenuElement',
    value: function _makeMenuElement(menuName) {
      var useIconTypes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['normal', 'active', 'hover'];
      var menuType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'normal';

      var btnElement = document.createElement('li');
      var menuItemHtml = this.theme.makeMenSvgIconSet(useIconTypes, menuName);

      this._addTooltipAttribute(btnElement, menuName);
      btnElement.className = 'tie-btn-' + menuName + ' ' + (0, _util.cls)('item') + ' ' + menuType;
      btnElement.innerHTML = menuItemHtml;

      if (menuType === 'normal') {
        this._menuBarElement.appendChild(btnElement);
      } else {
        this._helpMenuBarElement.appendChild(btnElement);
      }
    }

    /**
     * Add help action event
     * @private
     */

  }, {
    key: '_addHelpActionEvent',
    value: function _addHelpActionEvent() {
      var _this5 = this;

      _tuiCodeSnippet2.default.forEach(_consts.HELP_MENUS, function (helpName) {
        _this5.eventHandler[helpName] = function (event) {
          return _this5._actions.main[helpName](event);
        };
        _this5._buttonElements[helpName].addEventListener('click', _this5.eventHandler[helpName]);
      });
    }

    /**
     * Remove help action event
     * @private
     */

  }, {
    key: '_removeHelpActionEvent',
    value: function _removeHelpActionEvent() {
      var _this6 = this;

      _tuiCodeSnippet2.default.forEach(_consts.HELP_MENUS, function (helpName) {
        _this6._buttonElements[helpName].removeEventListener('click', _this6.eventHandler[helpName]);
      });
    }

    /**
     * Add history
     * @param {Command|string} command - command or command name
     */

  }, {
    key: '_addHistory',
    value: function _addHistory(command) {
      if (!(0, _util.isSilentCommand)(command)) {
        var historyTitle = typeof command === 'string' ? { name: command } : (0, _util.getHistoryTitle)(command);

        this._historyMenu.add(historyTitle);
      }
    }

    /**
     * Init history
     */

  }, {
    key: 'initHistory',
    value: function initHistory() {
      this._historyMenu.init();
    }

    /**
     * Clear history
     */

  }, {
    key: 'clearHistory',
    value: function clearHistory() {
      this._historyMenu.clear();
    }

    /**
     * Select prev history
     */

  }, {
    key: '_selectPrevHistory',
    value: function _selectPrevHistory() {
      this._historyMenu.prev();
    }

    /**
     * Select next history
     */

  }, {
    key: '_selectNextHistory',
    value: function _selectNextHistory() {
      this._historyMenu.next();
    }

    /**
     * Toggle history menu
     * @param {object} event - event object
     */

  }, {
    key: 'toggleHistoryMenu',
    value: function toggleHistoryMenu(event) {
      var target = event.target;

      var item = target.closest('.' + HISTORY_PANEL_CLASS_NAME);

      if (item) {
        return;
      }

      var historyButtonClassList = this._buttonElements[HISTORY_MENU].classList;

      historyButtonClassList.toggle('opened');
    }

    /**
     * Add attribute for menu tooltip
     * @param {HTMLElement} element - menu element
     * @param {string} tooltipName - tooltipName
     * @private
     */

  }, {
    key: '_addTooltipAttribute',
    value: function _addTooltipAttribute(element, tooltipName) {
      element.setAttribute('tooltip-content', this._locale.localize(tooltipName.replace(/^[a-z]/g, function ($0) {
        return $0.toUpperCase();
      })));
    }

    /**
     * Add download event
     * @private
     */

  }, {
    key: '_addDownloadEvent',
    value: function _addDownloadEvent() {
      var _this7 = this;

      this.eventHandler.download = function () {
        return _this7._actions.main.download();
      };
      _tuiCodeSnippet2.default.forEach(this._buttonElements.download, function (element) {
        element.addEventListener('click', _this7.eventHandler.download);
      });
    }
  }, {
    key: '_removeDownloadEvent',
    value: function _removeDownloadEvent() {
      var _this8 = this;

      _tuiCodeSnippet2.default.forEach(this._buttonElements.download, function (element) {
        element.removeEventListener('click', _this8.eventHandler.download);
      });
    }

    /**
     * Add load event
     * @private
     */

  }, {
    key: '_addLoadEvent',
    value: function _addLoadEvent() {
      var _this9 = this;

      this.eventHandler.loadImage = function (event) {
        return _this9._actions.main.load(event.target.files[0]);
      };

      _tuiCodeSnippet2.default.forEach(this._buttonElements.load, function (element) {
        element.addEventListener('change', _this9.eventHandler.loadImage);
      });
    }

    /**
     * Remove load event
     * @private
     */

  }, {
    key: '_removeLoadEvent',
    value: function _removeLoadEvent() {
      var _this10 = this;

      _tuiCodeSnippet2.default.forEach(this._buttonElements.load, function (element) {
        element.removeEventListener('change', _this10.eventHandler.loadImage);
      });
    }

    /**
     * Add menu event
     * @param {string} menuName - menu name
     * @private
     */

  }, {
    key: '_addMainMenuEvent',
    value: function _addMainMenuEvent(menuName) {
      var _this11 = this;

      this.eventHandler[menuName] = function () {
        return _this11.changeMenu(menuName);
      };
      this._buttonElements[menuName].addEventListener('click', this.eventHandler[menuName]);
    }

    /**
     * Add menu event
     * @param {string} menuName - menu name
     * @private
     */

  }, {
    key: '_addSubMenuEvent',
    value: function _addSubMenuEvent(menuName) {
      var _this12 = this;

      this[menuName].addEvent(this._actions[menuName]);
      this[menuName].on(_consts.eventNames.INPUT_BOX_EDITING_STARTED, function () {
        return _this12.fire(_consts.eventNames.INPUT_BOX_EDITING_STARTED);
      });
      this[menuName].on(_consts.eventNames.INPUT_BOX_EDITING_STOPPED, function () {
        return _this12.fire(_consts.eventNames.INPUT_BOX_EDITING_STOPPED);
      });
    }

    /**
     * Add menu event
     * @private
     */

  }, {
    key: '_addMenuEvent',
    value: function _addMenuEvent() {
      var _this13 = this;

      _tuiCodeSnippet2.default.forEach(this.options.menu, function (menuName) {
        _this13._addMainMenuEvent(menuName);
        _this13._addSubMenuEvent(menuName);
      });
    }

    /**
     * Remove menu event
     * @private
     */

  }, {
    key: '_removeMainMenuEvent',
    value: function _removeMainMenuEvent() {
      var _this14 = this;

      _tuiCodeSnippet2.default.forEach(this.options.menu, function (menuName) {
        _this14._buttonElements[menuName].removeEventListener('click', _this14.eventHandler[menuName]);
        _this14[menuName].off(_consts.eventNames.INPUT_BOX_EDITING_STARTED);
        _this14[menuName].off(_consts.eventNames.INPUT_BOX_EDITING_STOPPED);
      });
    }

    /**
     * Get editor area element
     * @returns {HTMLElement} editor area html element
     * @ignore
     */

  }, {
    key: 'getEditorArea',
    value: function getEditorArea() {
      return this._editorElement;
    }

    /**
     * Add event for menu items
     * @ignore
     */

  }, {
    key: 'activeMenuEvent',
    value: function activeMenuEvent() {
      if (this._initMenuEvent) {
        return;
      }

      this._addHelpActionEvent();
      this._addDownloadEvent();
      this._addMenuEvent();
      this._initMenu();
      this._historyMenu.addEvent(this._actions.history);
      this._initMenuEvent = true;
    }

    /**
     * Remove ui event
     * @private
     */

  }, {
    key: '_removeUiEvent',
    value: function _removeUiEvent() {
      this._removeHelpActionEvent();
      this._removeDownloadEvent();
      this._removeLoadEvent();
      this._removeMainMenuEvent();
      this._historyMenu.removeEvent();
    }

    /**
     * Destroy all menu instance
     * @private
     */

  }, {
    key: '_destroyAllMenu',
    value: function _destroyAllMenu() {
      var _this15 = this;

      _tuiCodeSnippet2.default.forEach(this.options.menu, function (menuName) {
        _this15[menuName].destroy();
      });

      this._historyMenu.destroy();
    }

    /**
     * Init canvas
     * @ignore
     */

  }, {
    key: 'initCanvas',
    value: function initCanvas() {
      var _this16 = this;

      var loadImageInfo = this._getLoadImage();
      if (loadImageInfo.path) {
        this._actions.main.initLoadImage(loadImageInfo.path, loadImageInfo.name).then(function () {
          _this16.activeMenuEvent();
        });
      }

      this._addLoadEvent();

      var gridVisual = document.createElement('div');

      gridVisual.className = (0, _util.cls)('grid-visual');
      var grid = '<table>\n           <tr><td class="dot left-top"></td><td></td><td class="dot right-top"></td></tr>\n           <tr><td></td><td></td><td></td></tr>\n           <tr><td class="dot left-bottom"></td><td></td><td class="dot right-bottom"></td></tr>\n         </table>';
      gridVisual.innerHTML = grid;
      this._editorContainerElement = this._editorElement.querySelector('.tui-image-editor-canvas-container');
      this._editorContainerElement.appendChild(gridVisual);
    }

    /**
     * get editor area element
     * @returns {Object} load image option
     * @private
     */

  }, {
    key: '_getLoadImage',
    value: function _getLoadImage() {
      return this.options.loadImage;
    }

    /**
     * change menu
     * @param {string} menuName - menu name
     * @param {boolean} toggle - whether toogle or not
     * @param {boolean} discardSelection - discard selection
     * @ignore
     */

  }, {
    key: 'changeMenu',
    value: function changeMenu(menuName) {
      var toggle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var discardSelection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!this._submenuChangeTransection) {
        this._submenuChangeTransection = true;
        this._changeMenu(menuName, toggle, discardSelection);
        this._submenuChangeTransection = false;
      }
    }

    /**
     * change menu
     * @param {string} menuName - menu name
     * @param {boolean} toggle - whether toggle or not
     * @param {boolean} discardSelection - discard selection
     * @private
     */

  }, {
    key: '_changeMenu',
    value: function _changeMenu(menuName, toggle, discardSelection) {
      if (this.submenu) {
        this._buttonElements[this.submenu].classList.remove('active');
        this._mainElement.classList.remove('tui-image-editor-menu-' + this.submenu);
        if (discardSelection) {
          this._actions.main.discardSelection();
        }
        this._actions.main.changeSelectableAll(true);
        this[this.submenu].changeStandbyMode();
      }

      if (this.submenu === menuName && toggle) {
        this.submenu = null;
      } else {
        this._buttonElements[menuName].classList.add('active');
        this._mainElement.classList.add('tui-image-editor-menu-' + menuName);
        this.submenu = menuName;
        this[this.submenu].changeStartMode();
      }

      this.resizeEditor();
    }

    /**
     * Init menu
     * @private
     */

  }, {
    key: '_initMenu',
    value: function _initMenu() {
      if (this.options.initMenu) {
        var evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, false);
        this._buttonElements[this.options.initMenu].dispatchEvent(evt);
      }

      if (this.icon) {
        this.icon.registerDefaultIcon();
      }
    }

    /**
     * Get canvas max Dimension
     * @returns {Object} - width & height of editor
     * @private
     */

  }, {
    key: '_getCanvasMaxDimension',
    value: function _getCanvasMaxDimension() {
      var _editorContainerEleme = this._editorContainerElement.style,
          maxWidth = _editorContainerEleme.maxWidth,
          maxHeight = _editorContainerEleme.maxHeight;

      var width = parseFloat(maxWidth);
      var height = parseFloat(maxHeight);

      return {
        width: width,
        height: height
      };
    }

    /**
     * Set editor position
     * @param {string} menuBarPosition - top or right or bottom or left
     * @private
     */
    // eslint-disable-next-line complexity

  }, {
    key: '_setEditorPosition',
    value: function _setEditorPosition(menuBarPosition) {
      var _getCanvasMaxDimensio2 = this._getCanvasMaxDimension(),
          width = _getCanvasMaxDimensio2.width,
          height = _getCanvasMaxDimensio2.height;

      var editorElementStyle = this._editorElement.style;
      var top = 0;
      var left = 0;

      if (this.submenu) {
        if (menuBarPosition === 'bottom') {
          if (height > this._editorElementWrap.scrollHeight - 150) {
            top = (height - this._editorElementWrap.scrollHeight) / 2;
          } else {
            top = 150 / 2 * -1;
          }
        } else if (menuBarPosition === 'top') {
          if (height > this._editorElementWrap.offsetHeight - 150) {
            top = 150 / 2 - (height - (this._editorElementWrap.offsetHeight - 150)) / 2;
          } else {
            top = 150 / 2;
          }
        } else if (menuBarPosition === 'left') {
          if (width > this._editorElementWrap.offsetWidth - 248) {
            left = 248 / 2 - (width - (this._editorElementWrap.offsetWidth - 248)) / 2;
          } else {
            left = 248 / 2;
          }
        } else if (menuBarPosition === 'right') {
          if (width > this._editorElementWrap.scrollWidth - 248) {
            left = (width - this._editorElementWrap.scrollWidth) / 2;
          } else {
            left = 248 / 2 * -1;
          }
        }
      }
      editorElementStyle.top = top + 'px';
      editorElementStyle.left = left + 'px';
    }
  }]);

  return Ui;
}();

CustomEvents.mixin(Ui);

exports.default = Ui;

/***/ }),

/***/ "./src/js/ui/crop.js":
/*!***************************!*\
  !*** ./src/js/ui/crop.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _submenuBase = __webpack_require__(/*! @/ui/submenuBase */ "./src/js/ui/submenuBase.js");

var _submenuBase2 = _interopRequireDefault(_submenuBase);

var _crop = __webpack_require__(/*! @/ui/template/submenu/crop */ "./src/js/ui/template/submenu/crop.js");

var _crop2 = _interopRequireDefault(_crop);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Crop ui class
 * @class
 * @ignore
 */
var Crop = function (_Submenu) {
  _inherits(Crop, _Submenu);

  function Crop(subMenuElement, _ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon,
        menuBarPosition = _ref.menuBarPosition,
        usageStatistics = _ref.usageStatistics;

    _classCallCheck(this, Crop);

    var _this = _possibleConstructorReturn(this, (Crop.__proto__ || Object.getPrototypeOf(Crop)).call(this, subMenuElement, {
      locale: locale,
      name: 'crop',
      makeSvgIcon: makeSvgIcon,
      menuBarPosition: menuBarPosition,
      templateHtml: _crop2.default,
      usageStatistics: usageStatistics
    }));

    _this.status = 'active';

    _this._els = {
      apply: _this.selector('.tie-crop-button .apply'),
      cancel: _this.selector('.tie-crop-button .cancel'),
      preset: _this.selector('.tie-crop-preset-button')
    };

    _this.defaultPresetButton = _this._els.preset.querySelector('.preset-none');
    return _this;
  }

  /**
   * Destroys the instance.
   */


  _createClass(Crop, [{
    key: 'destroy',
    value: function destroy() {
      this._removeEvent();

      (0, _util.assignmentForDestroy)(this);
    }

    /**
     * Add event for crop
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.crop - crop action
     *   @param {Function} actions.cancel - cancel action
     *   @param {Function} actions.preset - draw rectzone at a predefined ratio
     */

  }, {
    key: 'addEvent',
    value: function addEvent(actions) {
      var apply = this._applyEventHandler.bind(this);
      var cancel = this._cancelEventHandler.bind(this);
      var cropzonePreset = this._cropzonePresetEventHandler.bind(this);

      this.eventHandler = {
        apply: apply,
        cancel: cancel,
        cropzonePreset: cropzonePreset
      };

      this.actions = actions;
      this._els.apply.addEventListener('click', apply);
      this._els.cancel.addEventListener('click', cancel);
      this._els.preset.addEventListener('click', cropzonePreset);
    }

    /**
     * Remove event
     * @private
     */

  }, {
    key: '_removeEvent',
    value: function _removeEvent() {
      this._els.apply.removeEventListener('click', this.eventHandler.apply);
      this._els.cancel.removeEventListener('click', this.eventHandler.cancel);
      this._els.preset.removeEventListener('click', this.eventHandler.cropzonePreset);
    }
  }, {
    key: '_applyEventHandler',
    value: function _applyEventHandler() {
      this.actions.crop();
      this._els.apply.classList.remove('active');
    }
  }, {
    key: '_cancelEventHandler',
    value: function _cancelEventHandler() {
      this.actions.cancel();
      this._els.apply.classList.remove('active');
    }
  }, {
    key: '_cropzonePresetEventHandler',
    value: function _cropzonePresetEventHandler(event) {
      var button = event.target.closest('.tui-image-editor-button.preset');
      if (button) {
        var _button$className$mat = button.className.match(/preset-[^\s]+/),
            presetType = _button$className$mat[0];

        this._setPresetButtonActive(button);
        this.actions.preset(presetType);
      }
    }

    /**
     * Executed when the menu starts.
     */

  }, {
    key: 'changeStartMode',
    value: function changeStartMode() {
      this.actions.modeChange('crop');
    }

    /**
     * Returns the menu to its default state.
     */

  }, {
    key: 'changeStandbyMode',
    value: function changeStandbyMode() {
      this.actions.stopDrawingMode();
      this._setPresetButtonActive();
    }

    /**
     * Change apply button status
     * @param {Boolean} enableStatus - apply button status
     */

  }, {
    key: 'changeApplyButtonStatus',
    value: function changeApplyButtonStatus(enableStatus) {
      if (enableStatus) {
        this._els.apply.classList.add('active');
      } else {
        this._els.apply.classList.remove('active');
      }
    }

    /**
     * Set preset button to active status
     * @param {HTMLElement} button - event target element
     * @private
     */

  }, {
    key: '_setPresetButtonActive',
    value: function _setPresetButtonActive() {
      var button = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.defaultPresetButton;

      _tuiCodeSnippet2.default.forEach([].slice.call(this._els.preset.querySelectorAll('.preset')), function (presetButton) {
        presetButton.classList.remove('active');
      });

      if (button) {
        button.classList.add('active');
      }
    }
  }]);

  return Crop;
}(_submenuBase2.default);

exports.default = Crop;

/***/ }),

/***/ "./src/js/ui/draw.js":
/*!***************************!*\
  !*** ./src/js/ui/draw.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _colorpicker = __webpack_require__(/*! @/ui/tools/colorpicker */ "./src/js/ui/tools/colorpicker.js");

var _colorpicker2 = _interopRequireDefault(_colorpicker);

var _range = __webpack_require__(/*! @/ui/tools/range */ "./src/js/ui/tools/range.js");

var _range2 = _interopRequireDefault(_range);

var _submenuBase = __webpack_require__(/*! @/ui/submenuBase */ "./src/js/ui/submenuBase.js");

var _submenuBase2 = _interopRequireDefault(_submenuBase);

var _draw = __webpack_require__(/*! @/ui/template/submenu/draw */ "./src/js/ui/template/submenu/draw.js");

var _draw2 = _interopRequireDefault(_draw);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DRAW_OPACITY = 0.7;

/**
 * Draw ui class
 * @class
 * @ignore
 */

var Draw = function (_Submenu) {
  _inherits(Draw, _Submenu);

  function Draw(subMenuElement, _ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon,
        menuBarPosition = _ref.menuBarPosition,
        usageStatistics = _ref.usageStatistics;

    _classCallCheck(this, Draw);

    var _this = _possibleConstructorReturn(this, (Draw.__proto__ || Object.getPrototypeOf(Draw)).call(this, subMenuElement, {
      locale: locale,
      name: 'draw',
      makeSvgIcon: makeSvgIcon,
      menuBarPosition: menuBarPosition,
      templateHtml: _draw2.default,
      usageStatistics: usageStatistics
    }));

    _this._els = {
      lineSelectButton: _this.selector('.tie-draw-line-select-button'),
      drawColorPicker: new _colorpicker2.default(_this.selector('.tie-draw-color'), '#00a9ff', _this.toggleDirection, _this.usageStatistics),
      drawRange: new _range2.default({
        slider: _this.selector('.tie-draw-range'),
        input: _this.selector('.tie-draw-range-value')
      }, _consts.defaultDrawRangeValues)
    };

    _this.type = null;
    _this.color = _this._els.drawColorPicker.color;
    _this.width = _this._els.drawRange.value;

    _this.colorPickerInputBox = _this._els.drawColorPicker.colorpickerElement.querySelector(_consts.selectorNames.COLOR_PICKER_INPUT_BOX);
    return _this;
  }

  /**
   * Destroys the instance.
   */


  _createClass(Draw, [{
    key: 'destroy',
    value: function destroy() {
      this._removeEvent();
      this._els.drawColorPicker.destroy();
      this._els.drawRange.destroy();

      (0, _util.assignmentForDestroy)(this);
    }

    /**
     * Add event for draw
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.setDrawMode - set draw mode
     */

  }, {
    key: 'addEvent',
    value: function addEvent(actions) {
      this.eventHandler.changeDrawType = this._changeDrawType.bind(this);

      this.actions = actions;
      this._els.lineSelectButton.addEventListener('click', this.eventHandler.changeDrawType);
      this._els.drawColorPicker.on('change', this._changeDrawColor.bind(this));
      this._els.drawRange.on('change', this._changeDrawRange.bind(this));

      this.colorPickerInputBox.addEventListener(_consts.eventNames.FOCUS, this._onStartEditingInputBox.bind(this));
      this.colorPickerInputBox.addEventListener(_consts.eventNames.BLUR, this._onStopEditingInputBox.bind(this));
    }

    /**
     * Remove event
     * @private
     */

  }, {
    key: '_removeEvent',
    value: function _removeEvent() {
      this._els.lineSelectButton.removeEventListener('click', this.eventHandler.changeDrawType);
      this._els.drawColorPicker.off();
      this._els.drawRange.off();

      this.colorPickerInputBox.removeEventListener(_consts.eventNames.FOCUS, this._onStartEditingInputBox.bind(this));
      this.colorPickerInputBox.removeEventListener(_consts.eventNames.BLUR, this._onStopEditingInputBox.bind(this));
    }

    /**
     * set draw mode - action runner
     */

  }, {
    key: 'setDrawMode',
    value: function setDrawMode() {
      this.actions.setDrawMode(this.type, {
        width: this.width,
        color: (0, _util.getRgb)(this.color, DRAW_OPACITY)
      });
    }

    /**
     * Returns the menu to its default state.
     */

  }, {
    key: 'changeStandbyMode',
    value: function changeStandbyMode() {
      this.type = null;
      this.actions.stopDrawingMode();
      this.actions.changeSelectableAll(true);
      this._els.lineSelectButton.classList.remove('free');
      this._els.lineSelectButton.classList.remove('line');
    }

    /**
     * Executed when the menu starts.
     */

  }, {
    key: 'changeStartMode',
    value: function changeStartMode() {
      this.type = 'free';
      this._els.lineSelectButton.classList.add('free');
      this.setDrawMode();
    }

    /**
     * Change draw type event
     * @param {object} event - line select event
     * @private
     */

  }, {
    key: '_changeDrawType',
    value: function _changeDrawType(event) {
      var button = event.target.closest('.tui-image-editor-button');
      if (button) {
        var lineType = this.getButtonType(button, ['free', 'line']);
        this.actions.discardSelection();

        if (this.type === lineType) {
          this.changeStandbyMode();

          return;
        }

        this.changeStandbyMode();
        this.type = lineType;
        this._els.lineSelectButton.classList.add(lineType);
        this.setDrawMode();
      }
    }

    /**
     * Change drawing color
     * @param {string} color - select drawing color
     * @private
     */

  }, {
    key: '_changeDrawColor',
    value: function _changeDrawColor(color) {
      this.color = color || 'transparent';
      if (!this.type) {
        this.changeStartMode();
      } else {
        this.setDrawMode();
      }
    }

    /**
     * Change drawing Range
     * @param {number} value - select drawing range
     * @private
     */

  }, {
    key: '_changeDrawRange',
    value: function _changeDrawRange(value) {
      this.width = value;
      if (!this.type) {
        this.changeStartMode();
      } else {
        this.setDrawMode();
      }
    }
  }]);

  return Draw;
}(_submenuBase2.default);

exports.default = Draw;

/***/ }),

/***/ "./src/js/ui/filter.js":
/*!*****************************!*\
  !*** ./src/js/ui/filter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _colorpicker = __webpack_require__(/*! @/ui/tools/colorpicker */ "./src/js/ui/tools/colorpicker.js");

var _colorpicker2 = _interopRequireDefault(_colorpicker);

var _range = __webpack_require__(/*! @/ui/tools/range */ "./src/js/ui/tools/range.js");

var _range2 = _interopRequireDefault(_range);

var _submenuBase = __webpack_require__(/*! @/ui/submenuBase */ "./src/js/ui/submenuBase.js");

var _submenuBase2 = _interopRequireDefault(_submenuBase);

var _filter = __webpack_require__(/*! @/ui/template/submenu/filter */ "./src/js/ui/template/submenu/filter.js");

var _filter2 = _interopRequireDefault(_filter);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PICKER_CONTROL_HEIGHT = '130px';
var BLEND_OPTIONS = ['add', 'diff', 'subtract', 'multiply', 'screen', 'lighten', 'darken'];
var FILTER_OPTIONS = ['grayscale', 'invert', 'sepia', 'vintage', 'blur', 'sharpen', 'emboss', 'remove-white', 'brightness', 'noise', 'pixelate', 'color-filter', 'tint', 'multiply', 'blend'];
var filterNameMap = {
  grayscale: 'grayscale',
  invert: 'invert',
  sepia: 'sepia',
  blur: 'blur',
  sharpen: 'sharpen',
  emboss: 'emboss',
  removeWhite: 'removeColor',
  brightness: 'brightness',
  contrast: 'contrast',
  saturation: 'saturation',
  vintage: 'vintage',
  polaroid: 'polaroid',
  noise: 'noise',
  pixelate: 'pixelate',
  colorFilter: 'removeColor',
  tint: 'blendColor',
  multiply: 'blendColor',
  blend: 'blendColor',
  hue: 'hue',
  gamma: 'gamma'
};
var RANGE_INSTANCE_NAMES = ['removewhiteDistanceRange', 'colorfilterThresholdRange', 'pixelateRange', 'noiseRange', 'brightnessRange', 'tintOpacity'];
var COLORPICKER_INSTANCE_NAMES = ['filterBlendColor', 'filterMultiplyColor', 'filterTintColor'];

/**
 * Filter ui class
 * @class
 * @ignore
 */

var Filter = function (_Submenu) {
  _inherits(Filter, _Submenu);

  function Filter(subMenuElement, _ref) {
    var locale = _ref.locale,
        menuBarPosition = _ref.menuBarPosition,
        usageStatistics = _ref.usageStatistics;

    _classCallCheck(this, Filter);

    var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, subMenuElement, {
      locale: locale,
      name: 'filter',
      menuBarPosition: menuBarPosition,
      templateHtml: _filter2.default,
      usageStatistics: usageStatistics
    }));

    _this.selectBoxShow = false;

    _this.checkedMap = {};
    _this._makeControlElement();
    return _this;
  }

  /**
   * Destroys the instance.
   */


  _createClass(Filter, [{
    key: 'destroy',
    value: function destroy() {
      this._removeEvent();
      this._destroyToolInstance();

      (0, _util.assignmentForDestroy)(this);
    }

    /**
     * Remove event for filter
     */

  }, {
    key: '_removeEvent',
    value: function _removeEvent() {
      var _this2 = this;

      _tuiCodeSnippet2.default.forEach(FILTER_OPTIONS, function (filter) {
        var filterCheckElement = _this2.selector('.tie-' + filter);
        var filterNameCamelCase = (0, _util.toCamelCase)(filter);

        filterCheckElement.removeEventListener('change', _this2.eventHandler[filterNameCamelCase]);
      });

      _tuiCodeSnippet2.default.forEach([].concat(RANGE_INSTANCE_NAMES, COLORPICKER_INSTANCE_NAMES), function (instanceName) {
        _this2._els[instanceName].off();
      });

      this._els.blendType.removeEventListener('change', this.eventHandler.changeBlendFilter);
      this._els.blendType.removeEventListener('click', this.eventHandler.changeBlendFilter);

      _tuiCodeSnippet2.default.forEachArray(this.colorPickerInputBoxes, function (inputBox) {
        inputBox.removeEventListener(_consts.eventNames.FOCUS, _this2._onStartEditingInputBox.bind(_this2));
        inputBox.removeEventListener(_consts.eventNames.BLUR, _this2._onStopEditingInputBox.bind(_this2));
      }, this);
    }
  }, {
    key: '_destroyToolInstance',
    value: function _destroyToolInstance() {
      var _this3 = this;

      _tuiCodeSnippet2.default.forEach([].concat(RANGE_INSTANCE_NAMES, COLORPICKER_INSTANCE_NAMES), function (instanceName) {
        _this3._els[instanceName].destroy();
      });
    }

    /**
     * Add event for filter
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.applyFilter - apply filter option
     */

  }, {
    key: 'addEvent',
    value: function addEvent(_ref2) {
      var _this4 = this;

      var applyFilter = _ref2.applyFilter;

      var changeFilterState = function changeFilterState(filterName) {
        return _this4._changeFilterState.bind(_this4, applyFilter, filterName);
      };
      var changeFilterStateForRange = function changeFilterStateForRange(filterName) {
        return function (value, isLast) {
          return _this4._changeFilterState(applyFilter, filterName, isLast);
        };
      };

      this.eventHandler = {
        changeBlendFilter: changeFilterState('blend'),
        blandTypeClick: function blandTypeClick(event) {
          return event.stopPropagation();
        }
      };

      _tuiCodeSnippet2.default.forEach(FILTER_OPTIONS, function (filter) {
        var filterCheckElement = _this4.selector('.tie-' + filter);
        var filterNameCamelCase = (0, _util.toCamelCase)(filter);
        _this4.checkedMap[filterNameCamelCase] = filterCheckElement;
        _this4.eventHandler[filterNameCamelCase] = changeFilterState(filterNameCamelCase);

        filterCheckElement.addEventListener('change', _this4.eventHandler[filterNameCamelCase]);
      });

      this._els.removewhiteDistanceRange.on('change', changeFilterStateForRange('removeWhite'));
      this._els.colorfilterThresholdRange.on('change', changeFilterStateForRange('colorFilter'));
      this._els.pixelateRange.on('change', changeFilterStateForRange('pixelate'));
      this._els.noiseRange.on('change', changeFilterStateForRange('noise'));
      this._els.brightnessRange.on('change', changeFilterStateForRange('brightness'));

      this._els.filterBlendColor.on('change', this.eventHandler.changeBlendFilter);
      this._els.filterMultiplyColor.on('change', changeFilterState('multiply'));
      this._els.filterTintColor.on('change', changeFilterState('tint'));
      this._els.tintOpacity.on('change', changeFilterStateForRange('tint'));
      this._els.filterMultiplyColor.on('changeShow', this.colorPickerChangeShow.bind(this));
      this._els.filterTintColor.on('changeShow', this.colorPickerChangeShow.bind(this));
      this._els.filterBlendColor.on('changeShow', this.colorPickerChangeShow.bind(this));

      this._els.blendType.addEventListener('change', this.eventHandler.changeBlendFilter);
      this._els.blendType.addEventListener('click', this.eventHandler.blandTypeClick);

      _tuiCodeSnippet2.default.forEachArray(this.colorPickerInputBoxes, function (inputBox) {
        inputBox.addEventListener(_consts.eventNames.FOCUS, _this4._onStartEditingInputBox.bind(_this4));
        inputBox.addEventListener(_consts.eventNames.BLUR, _this4._onStopEditingInputBox.bind(_this4));
      }, this);
    }

    /**
     * Set filter for undo changed
     * @param {Object} changedFilterInfos - changed command infos
     *   @param {string} type - filter type
     *   @param {string} action - add or remove
     *   @param {Object} options - filter options
     */

  }, {
    key: 'setFilterState',
    value: function setFilterState(changedFilterInfos) {
      var type = changedFilterInfos.type,
          options = changedFilterInfos.options,
          action = changedFilterInfos.action;

      var filterName = this._getFilterNameFromOptions(type, options);
      var isRemove = action === 'remove';

      if (!isRemove) {
        this._setFilterState(filterName, options);
      }

      this.checkedMap[filterName].checked = !isRemove;
    }

    /**
     * Init all filter's checkbox to unchecked state
     */

  }, {
    key: 'initFilterCheckBoxState',
    value: function initFilterCheckBoxState() {
      _tuiCodeSnippet2.default.forEach(this.checkedMap, function (filter) {
        filter.checked = false;
      }, this);
    }

    /**
     * Set filter for undo changed
     * @param {string} filterName - filter name
     * @param {Object} options - filter options
     * @private
     */
    // eslint-disable-next-line complexity

  }, {
    key: '_setFilterState',
    value: function _setFilterState(filterName, options) {
      if (filterName === 'colorFilter') {
        this._els.colorfilterThresholdRange.value = options.distance;
      } else if (filterName === 'removeWhite') {
        this._els.removewhiteDistanceRange.value = options.distance;
      } else if (filterName === 'pixelate') {
        this._els.pixelateRange.value = options.blocksize;
      } else if (filterName === 'brightness') {
        this._els.brightnessRange.value = options.brightness;
      } else if (filterName === 'noise') {
        this._els.noiseRange.value = options.noise;
      } else if (filterName === 'tint') {
        this._els.tintOpacity.value = options.alpha;
        this._els.filterTintColor.color = options.color;
      } else if (filterName === 'blend') {
        this._els.filterBlendColor.color = options.color;
      } else if (filterName === 'multiply') {
        this._els.filterMultiplyColor.color = options.color;
      }
    }

    /**
     * Get filter name
     * @param {string} type - filter type
     * @param {Object} options - filter options
     * @returns {string} filter name
     * @private
     */

  }, {
    key: '_getFilterNameFromOptions',
    value: function _getFilterNameFromOptions(type, options) {
      var filterName = type;

      if (type === 'removeColor') {
        filterName = _tuiCodeSnippet2.default.isExisty(options.useAlpha) ? 'removeWhite' : 'colorFilter';
      } else if (type === 'blendColor') {
        filterName = {
          add: 'blend',
          multiply: 'multiply',
          tint: 'tint'
        }[options.mode];
      }

      return filterName;
    }

    /**
     * Add event for filter
     * @param {Function} applyFilter - actions for firter
     * @param {string} filterName - filter name
     * @param {boolean} [isLast] - Is last change
     */

  }, {
    key: '_changeFilterState',
    value: function _changeFilterState(applyFilter, filterName) {
      var isLast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var apply = this.checkedMap[filterName].checked;
      var type = filterNameMap[filterName];

      var checkboxGroup = this.checkedMap[filterName].closest('.tui-image-editor-checkbox-group');
      if (checkboxGroup) {
        if (apply) {
          checkboxGroup.classList.remove('tui-image-editor-disabled');
        } else {
          checkboxGroup.classList.add('tui-image-editor-disabled');
        }
      }
      applyFilter(apply, type, this._getFilterOption(filterName), !isLast);
    }

    /**
     * Get filter option
     * @param {String} type - filter type
     * @returns {Object} filter option object
     * @private
     */
    // eslint-disable-next-line complexity

  }, {
    key: '_getFilterOption',
    value: function _getFilterOption(type) {
      var option = {};
      switch (type) {
        case 'removeWhite':
          option.color = '#FFFFFF';
          option.useAlpha = false;
          option.distance = parseFloat(this._els.removewhiteDistanceRange.value);
          break;
        case 'colorFilter':
          option.color = '#FFFFFF';
          option.distance = parseFloat(this._els.colorfilterThresholdRange.value);
          break;
        case 'pixelate':
          option.blocksize = (0, _util.toInteger)(this._els.pixelateRange.value);
          break;
        case 'noise':
          option.noise = (0, _util.toInteger)(this._els.noiseRange.value);
          break;
        case 'brightness':
          option.brightness = parseFloat(this._els.brightnessRange.value);
          break;
        case 'blend':
          option.mode = 'add';
          option.color = this._els.filterBlendColor.color;
          option.mode = this._els.blendType.value;
          break;
        case 'multiply':
          option.mode = 'multiply';
          option.color = this._els.filterMultiplyColor.color;
          break;
        case 'tint':
          option.mode = 'tint';
          option.color = this._els.filterTintColor.color;
          option.alpha = this._els.tintOpacity.value;
          break;
        case 'blur':
          option.blur = this._els.blurRange.value;
          break;
        default:
          break;
      }

      return option;
    }

    /**
     * Make submenu range and colorpicker control
     * @private
     */

  }, {
    key: '_makeControlElement',
    value: function _makeControlElement() {
      this._els = {
        removewhiteDistanceRange: new _range2.default({ slider: this.selector('.tie-removewhite-distance-range') }, _consts.defaultFilterRangeValues.removewhiteDistanceRange),
        brightnessRange: new _range2.default({ slider: this.selector('.tie-brightness-range') }, _consts.defaultFilterRangeValues.brightnessRange),
        noiseRange: new _range2.default({ slider: this.selector('.tie-noise-range') }, _consts.defaultFilterRangeValues.noiseRange),
        pixelateRange: new _range2.default({ slider: this.selector('.tie-pixelate-range') }, _consts.defaultFilterRangeValues.pixelateRange),
        colorfilterThresholdRange: new _range2.default({ slider: this.selector('.tie-colorfilter-threshold-range') }, _consts.defaultFilterRangeValues.colorfilterThresholdRange),
        filterTintColor: new _colorpicker2.default(this.selector('.tie-filter-tint-color'), '#03bd9e', this.toggleDirection, this.usageStatistics),
        filterMultiplyColor: new _colorpicker2.default(this.selector('.tie-filter-multiply-color'), '#515ce6', this.toggleDirection, this.usageStatistics),
        filterBlendColor: new _colorpicker2.default(this.selector('.tie-filter-blend-color'), '#ffbb3b', this.toggleDirection, this.usageStatistics),
        blurRange: _consts.defaultFilterRangeValues.blurFilterRange
      };

      this._els.tintOpacity = this._pickerWithRange(this._els.filterTintColor.pickerControl);
      this._els.blendType = this._pickerWithSelectbox(this._els.filterBlendColor.pickerControl);

      this.colorPickerControls.push(this._els.filterTintColor);
      this.colorPickerControls.push(this._els.filterMultiplyColor);
      this.colorPickerControls.push(this._els.filterBlendColor);

      this.colorPickerInputBoxes = [];
      this.colorPickerInputBoxes.push(this._els.filterTintColor.colorpickerElement.querySelector(_consts.selectorNames.COLOR_PICKER_INPUT_BOX));
      this.colorPickerInputBoxes.push(this._els.filterMultiplyColor.colorpickerElement.querySelector(_consts.selectorNames.COLOR_PICKER_INPUT_BOX));
      this.colorPickerInputBoxes.push(this._els.filterBlendColor.colorpickerElement.querySelector(_consts.selectorNames.COLOR_PICKER_INPUT_BOX));
    }

    /**
     * Make submenu control for picker & range mixin
     * @param {HTMLElement} pickerControl - pickerControl dom element
     * @returns {Range}
     * @private
     */

  }, {
    key: '_pickerWithRange',
    value: function _pickerWithRange(pickerControl) {
      var rangeWrap = document.createElement('div');
      var rangeLabel = document.createElement('label');
      var slider = document.createElement('div');

      slider.id = 'tie-filter-tint-opacity';
      rangeLabel.innerHTML = 'Opacity';
      rangeWrap.appendChild(rangeLabel);
      rangeWrap.appendChild(slider);
      pickerControl.appendChild(rangeWrap);
      pickerControl.style.height = PICKER_CONTROL_HEIGHT;

      return new _range2.default({ slider: slider }, _consts.defaultFilterRangeValues.tintOpacityRange);
    }

    /**
     * Make submenu control for picker & selectbox
     * @param {HTMLElement} pickerControl - pickerControl dom element
     * @returns {HTMLElement}
     * @private
     */

  }, {
    key: '_pickerWithSelectbox',
    value: function _pickerWithSelectbox(pickerControl) {
      var selectlistWrap = document.createElement('div');
      var selectlist = document.createElement('select');
      var optionlist = document.createElement('ul');

      selectlistWrap.className = 'tui-image-editor-selectlist-wrap';
      optionlist.className = 'tui-image-editor-selectlist';

      selectlistWrap.appendChild(selectlist);
      selectlistWrap.appendChild(optionlist);

      this._makeSelectOptionList(selectlist);

      pickerControl.appendChild(selectlistWrap);
      pickerControl.style.height = PICKER_CONTROL_HEIGHT;

      this._drawSelectOptionList(selectlist, optionlist);
      this._pickerWithSelectboxForAddEvent(selectlist, optionlist);

      return selectlist;
    }

    /**
     * Make selectbox option list custom style
     * @param {HTMLElement} selectlist - selectbox element
     * @param {HTMLElement} optionlist - custom option list item element
     * @private
     */

  }, {
    key: '_drawSelectOptionList',
    value: function _drawSelectOptionList(selectlist, optionlist) {
      var options = selectlist.querySelectorAll('option');
      _tuiCodeSnippet2.default.forEach(options, function (option) {
        var optionElement = document.createElement('li');
        optionElement.innerHTML = option.innerHTML;
        optionElement.setAttribute('data-item', option.value);
        optionlist.appendChild(optionElement);
      });
    }

    /**
     * custom selectbox custom event
     * @param {HTMLElement} selectlist - selectbox element
     * @param {HTMLElement} optionlist - custom option list item element
     * @private
     */

  }, {
    key: '_pickerWithSelectboxForAddEvent',
    value: function _pickerWithSelectboxForAddEvent(selectlist, optionlist) {
      var _this5 = this;

      optionlist.addEventListener('click', function (event) {
        var optionValue = event.target.getAttribute('data-item');
        var fireEvent = document.createEvent('HTMLEvents');

        selectlist.querySelector('[value="' + optionValue + '"]').selected = true;
        fireEvent.initEvent('change', true, true);

        selectlist.dispatchEvent(fireEvent);

        _this5.selectBoxShow = false;
        optionlist.style.display = 'none';
      });

      selectlist.addEventListener('mousedown', function (event) {
        event.preventDefault();
        _this5.selectBoxShow = !_this5.selectBoxShow;
        optionlist.style.display = _this5.selectBoxShow ? 'block' : 'none';
        optionlist.setAttribute('data-selectitem', selectlist.value);
        optionlist.querySelector('[data-item=\'' + selectlist.value + '\']').classList.add('active');
      });
    }

    /**
     * Make option list for select control
     * @param {HTMLElement} selectlist - blend option select list element
     * @private
     */

  }, {
    key: '_makeSelectOptionList',
    value: function _makeSelectOptionList(selectlist) {
      _tuiCodeSnippet2.default.forEach(BLEND_OPTIONS, function (option) {
        var selectOption = document.createElement('option');
        selectOption.setAttribute('value', option);
        selectOption.innerHTML = option.replace(/^[a-z]/, function ($0) {
          return $0.toUpperCase();
        });
        selectlist.appendChild(selectOption);
      });
    }
  }]);

  return Filter;
}(_submenuBase2.default);

exports.default = Filter;

/***/ }),

/***/ "./src/js/ui/flip.js":
/*!***************************!*\
  !*** ./src/js/ui/flip.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _submenuBase = __webpack_require__(/*! @/ui/submenuBase */ "./src/js/ui/submenuBase.js");

var _submenuBase2 = _interopRequireDefault(_submenuBase);

var _flip = __webpack_require__(/*! @/ui/template/submenu/flip */ "./src/js/ui/template/submenu/flip.js");

var _flip2 = _interopRequireDefault(_flip);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Flip ui class
 * @class
 * @ignore
 */
var Flip = function (_Submenu) {
  _inherits(Flip, _Submenu);

  function Flip(subMenuElement, _ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon,
        menuBarPosition = _ref.menuBarPosition,
        usageStatistics = _ref.usageStatistics;

    _classCallCheck(this, Flip);

    var _this = _possibleConstructorReturn(this, (Flip.__proto__ || Object.getPrototypeOf(Flip)).call(this, subMenuElement, {
      locale: locale,
      name: 'flip',
      makeSvgIcon: makeSvgIcon,
      menuBarPosition: menuBarPosition,
      templateHtml: _flip2.default,
      usageStatistics: usageStatistics
    }));

    _this.flipStatus = false;

    _this._els = {
      flipButton: _this.selector('.tie-flip-button')
    };
    return _this;
  }

  /**
   * Destroys the instance.
   */


  _createClass(Flip, [{
    key: 'destroy',
    value: function destroy() {
      this._removeEvent();

      (0, _util.assignmentForDestroy)(this);
    }

    /**
     * Add event for flip
     * @param {Object} actions - actions for flip
     *   @param {Function} actions.flip - flip action
     */

  }, {
    key: 'addEvent',
    value: function addEvent(actions) {
      this.eventHandler.changeFlip = this._changeFlip.bind(this);
      this._actions = actions;
      this._els.flipButton.addEventListener('click', this.eventHandler.changeFlip);
    }

    /**
     * Remove event
     * @private
     */

  }, {
    key: '_removeEvent',
    value: function _removeEvent() {
      this._els.flipButton.removeEventListener('click', this.eventHandler.changeFlip);
    }

    /**
     * change Flip status
     * @param {object} event - change event
     * @private
     */

  }, {
    key: '_changeFlip',
    value: function _changeFlip(event) {
      var _this2 = this;

      var button = event.target.closest('.tui-image-editor-button');
      if (button) {
        var flipType = this.getButtonType(button, ['flipX', 'flipY', 'resetFlip']);
        if (!this.flipStatus && flipType === 'resetFlip') {
          return;
        }

        this._actions.flip(flipType).then(function (flipStatus) {
          var flipClassList = _this2._els.flipButton.classList;
          _this2.flipStatus = false;

          flipClassList.remove('resetFlip');
          _tuiCodeSnippet2.default.forEach(['flipX', 'flipY'], function (type) {
            flipClassList.remove(type);
            if (flipStatus[type]) {
              flipClassList.add(type);
              flipClassList.add('resetFlip');
              _this2.flipStatus = true;
            }
          });
        });
      }
    }
  }]);

  return Flip;
}(_submenuBase2.default);

exports.default = Flip;

/***/ }),

/***/ "./src/js/ui/history.js":
/*!******************************!*\
  !*** ./src/js/ui/history.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _panelMenu = __webpack_require__(/*! @/ui/panelMenu */ "./src/js/ui/panelMenu.js");

var _panelMenu2 = _interopRequireDefault(_panelMenu);

var _history = __webpack_require__(/*! @/ui/template/submenu/history */ "./src/js/ui/template/submenu/history.js");

var _history2 = _interopRequireDefault(_history);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var historyClassName = 'history-item';
var selectedClassName = 'selected-item';
var disabledClassName = 'disabled-item';

/**
 * History ui class
 * @class
 * @ignore
 */

var History = function (_Panel) {
  _inherits(History, _Panel);

  function History(menuElement, _ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon;

    _classCallCheck(this, History);

    var _this = _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).call(this, menuElement, { name: 'history' }));

    menuElement.classList.add('enabled');

    _this.locale = locale;
    _this.makeSvgIcon = makeSvgIcon;
    _this._eventHandler = {};
    _this._historyIndex = _this.getListLength();
    return _this;
  }

  /**
   * Add history
   * @param {string} name - name of history
   * @param {?string} detail - detail information of history
   */


  _createClass(History, [{
    key: 'add',
    value: function add(_ref2) {
      var name = _ref2.name,
          detail = _ref2.detail;

      if (this._hasDisabledItem()) {
        this.deleteListItemElement(this._historyIndex + 1, this.getListLength());
      }

      var html = (0, _history2.default)({ locale: this.locale, makeSvgIcon: this.makeSvgIcon, name: name, detail: detail });
      var item = this.makeListItemElement(html);

      this.pushListItemElement(item);
      this._historyIndex = this.getListLength() - 1;
      this._selectItem(this._historyIndex);
    }

    /**
     * Init history
     */

  }, {
    key: 'init',
    value: function init() {
      this.deleteListItemElement(1, this.getListLength());
      this._historyIndex = 0;
      this._selectItem(this._historyIndex);
    }

    /**
     * Clear history
     */

  }, {
    key: 'clear',
    value: function clear() {
      this.deleteListItemElement(0, this.getListLength());
      this._historyIndex = -1;
    }

    /**
     * Select previous history of current selected history
     */

  }, {
    key: 'prev',
    value: function prev() {
      this._historyIndex -= 1;
      this._selectItem(this._historyIndex);
    }

    /**
     * Select next history of current selected history
     */

  }, {
    key: 'next',
    value: function next() {
      this._historyIndex += 1;
      this._selectItem(this._historyIndex);
    }

    /**
     * Whether history menu has disabled item
     * @returns {boolean}
     */

  }, {
    key: '_hasDisabledItem',
    value: function _hasDisabledItem() {
      return this.getListLength() - 1 > this._historyIndex;
    }

    /**
     * Add history menu event
     * @private
     */

  }, {
    key: '_addHistoryEventListener',
    value: function _addHistoryEventListener() {
      var _this2 = this;

      this._eventHandler.history = function (event) {
        return _this2._clickHistoryItem(event);
      };
      this.listElement.addEventListener('click', this._eventHandler.history);
    }

    /**
     * Remove history menu event
     * @private
     */

  }, {
    key: '_removeHistoryEventListener',
    value: function _removeHistoryEventListener() {
      this.listElement.removeEventListener('click', this._eventHandler.history);
    }

    /**
     * onClick history menu event listener
     * @param {object} event - event object
     * @private
     */

  }, {
    key: '_clickHistoryItem',
    value: function _clickHistoryItem(event) {
      var target = event.target;

      var item = target.closest('.' + historyClassName);

      if (!item) {
        return;
      }

      var index = Number.parseInt(item.getAttribute('data-index'), 10);

      if (index !== this._historyIndex) {
        var count = Math.abs(index - this._historyIndex);

        if (index < this._historyIndex) {
          this._actions.undo(count);
        } else {
          this._actions.redo(count);
        }
      }
    }

    /**
     * Change item's state to selected state
     * @param {number} index - index of selected item
     */

  }, {
    key: '_selectItem',
    value: function _selectItem(index) {
      for (var i = 0; i < this.getListLength(); i += 1) {
        this.removeClass(i, selectedClassName);
        this.removeClass(i, disabledClassName);
        if (i > index) {
          this.addClass(i, disabledClassName);
        }
      }
      this.addClass(index, selectedClassName);
    }

    /**
     * Destroys the instance.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.removeEvent();

      (0, _util.assignmentForDestroy)(this);
    }

    /**
     * Add event for history
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.undo - undo action
     *   @param {Function} actions.redo - redo action
     */

  }, {
    key: 'addEvent',
    value: function addEvent(actions) {
      this._actions = actions;
      this._addHistoryEventListener();
    }

    /**
     * Remove event
     * @private
     */

  }, {
    key: 'removeEvent',
    value: function removeEvent() {
      this._removeHistoryEventListener();
    }
  }]);

  return History;
}(_panelMenu2.default);

exports.default = History;

/***/ }),

/***/ "./src/js/ui/icon.js":
/*!***************************!*\
  !*** ./src/js/ui/icon.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _colorpicker = __webpack_require__(/*! @/ui/tools/colorpicker */ "./src/js/ui/tools/colorpicker.js");

var _colorpicker2 = _interopRequireDefault(_colorpicker);

var _submenuBase = __webpack_require__(/*! @/ui/submenuBase */ "./src/js/ui/submenuBase.js");

var _submenuBase2 = _interopRequireDefault(_submenuBase);

var _icon = __webpack_require__(/*! @/ui/template/submenu/icon */ "./src/js/ui/template/submenu/icon.js");

var _icon2 = _interopRequireDefault(_icon);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Icon ui class
 * @class
 * @ignore
 */
var Icon = function (_Submenu) {
  _inherits(Icon, _Submenu);

  function Icon(subMenuElement, _ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon,
        menuBarPosition = _ref.menuBarPosition,
        usageStatistics = _ref.usageStatistics;

    _classCallCheck(this, Icon);

    var _this = _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).call(this, subMenuElement, {
      locale: locale,
      name: 'icon',
      makeSvgIcon: makeSvgIcon,
      menuBarPosition: menuBarPosition,
      templateHtml: _icon2.default,
      usageStatistics: usageStatistics
    }));

    _this.iconType = null;
    _this._iconMap = {};

    _this._els = {
      registerIconButton: _this.selector('.tie-icon-image-file'),
      addIconButton: _this.selector('.tie-icon-add-button'),
      iconColorpicker: new _colorpicker2.default(_this.selector('.tie-icon-color'), '#ffbb3b', _this.toggleDirection, _this.usageStatistics)
    };

    _this.colorPickerInputBox = _this._els.iconColorpicker.colorpickerElement.querySelector(_consts.selectorNames.COLOR_PICKER_INPUT_BOX);
    return _this;
  }

  /**
   * Destroys the instance.
   */


  _createClass(Icon, [{
    key: 'destroy',
    value: function destroy() {
      this._removeEvent();
      this._els.iconColorpicker.destroy();

      (0, _util.assignmentForDestroy)(this);
    }

    /**
     * Add event for icon
     * @param {Object} actions - actions for icon
     *   @param {Function} actions.registerCustomIcon - register icon
     *   @param {Function} actions.addIcon - add icon
     *   @param {Function} actions.changeColor - change icon color
     */

  }, {
    key: 'addEvent',
    value: function addEvent(actions) {
      var registerIcon = this._registerIconHandler.bind(this);
      var addIcon = this._addIconHandler.bind(this);

      this.eventHandler = {
        registerIcon: registerIcon,
        addIcon: addIcon
      };

      this.actions = actions;
      this._els.iconColorpicker.on('change', this._changeColorHandler.bind(this));
      this._els.registerIconButton.addEventListener('change', registerIcon);
      this._els.addIconButton.addEventListener('click', addIcon);

      this.colorPickerInputBox.addEventListener(_consts.eventNames.FOCUS, this._onStartEditingInputBox.bind(this));
      this.colorPickerInputBox.addEventListener(_consts.eventNames.BLUR, this._onStopEditingInputBox.bind(this));
    }

    /**
     * Remove event
     * @private
     */

  }, {
    key: '_removeEvent',
    value: function _removeEvent() {
      this._els.iconColorpicker.off();
      this._els.registerIconButton.removeEventListener('change', this.eventHandler.registerIcon);
      this._els.addIconButton.removeEventListener('click', this.eventHandler.addIcon);

      this.colorPickerInputBox.removeEventListener(_consts.eventNames.FOCUS, this._onStartEditingInputBox.bind(this));
      this.colorPickerInputBox.removeEventListener(_consts.eventNames.BLUR, this._onStopEditingInputBox.bind(this));
    }

    /**
     * Clear icon type
     */

  }, {
    key: 'clearIconType',
    value: function clearIconType() {
      this._els.addIconButton.classList.remove(this.iconType);
      this.iconType = null;
    }

    /**
     * Register default icon
     */

  }, {
    key: 'registerDefaultIcon',
    value: function registerDefaultIcon() {
      var _this2 = this;

      _tuiCodeSnippet2.default.forEach(_consts.defaultIconPath, function (path, type) {
        _this2.actions.registerDefaultIcons(type, path);
      });
    }

    /**
     * Set icon picker color
     * @param {string} iconColor - rgb color string
     */

  }, {
    key: 'setIconPickerColor',
    value: function setIconPickerColor(iconColor) {
      this._els.iconColorpicker.color = iconColor;
    }

    /**
     * Returns the menu to its default state.
     */

  }, {
    key: 'changeStandbyMode',
    value: function changeStandbyMode() {
      this.clearIconType();
      this.actions.cancelAddIcon();
    }

    /**
     * Change icon color
     * @param {string} color - color for change
     * @private
     */

  }, {
    key: '_changeColorHandler',
    value: function _changeColorHandler(color) {
      color = color || 'transparent';
      this.actions.changeColor(color);
    }

    /**
     * Change icon color
     * @param {object} event - add button event object
     * @private
     */

  }, {
    key: '_addIconHandler',
    value: function _addIconHandler(event) {
      var button = event.target.closest('.tui-image-editor-button');

      if (button) {
        var iconType = button.getAttribute('data-icontype');
        var iconColor = this._els.iconColorpicker.color;
        this.actions.discardSelection();
        this.actions.changeSelectableAll(false);
        this._els.addIconButton.classList.remove(this.iconType);
        this._els.addIconButton.classList.add(iconType);

        if (this.iconType === iconType) {
          this.changeStandbyMode();
        } else {
          this.actions.addIcon(iconType, iconColor);
          this.iconType = iconType;
        }
      }
    }

    /**
     * register icon
     * @param {object} event - file change event object
     * @private
     */

  }, {
    key: '_registerIconHandler',
    value: function _registerIconHandler(event) {
      var imgUrl = void 0;

      if (!_util.isSupportFileApi) {
        alert('This browser does not support file-api');
      }

      var _event$target$files = event.target.files,
          file = _event$target$files[0];


      if (file) {
        imgUrl = URL.createObjectURL(file);
        this.actions.registerCustomIcon(imgUrl, file);
      }
    }
  }]);

  return Icon;
}(_submenuBase2.default);

exports.default = Icon;

/***/ }),

/***/ "./src/js/ui/locale/locale.js":
/*!************************************!*\
  !*** ./src/js/ui/locale/locale.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Translate messages
 */
var Locale = function () {
  function Locale(locale) {
    _classCallCheck(this, Locale);

    this._locale = locale;
  }

  /**
   * localize message
   * @param {string} message - message who will be localized
   * @returns {string}
   */


  _createClass(Locale, [{
    key: "localize",
    value: function localize(message) {
      return this._locale[message] || message;
    }
  }]);

  return Locale;
}();

exports.default = Locale;

/***/ }),

/***/ "./src/js/ui/mask.js":
/*!***************************!*\
  !*** ./src/js/ui/mask.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _submenuBase = __webpack_require__(/*! @/ui/submenuBase */ "./src/js/ui/submenuBase.js");

var _submenuBase2 = _interopRequireDefault(_submenuBase);

var _mask = __webpack_require__(/*! @/ui/template/submenu/mask */ "./src/js/ui/template/submenu/mask.js");

var _mask2 = _interopRequireDefault(_mask);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Mask ui class
 * @class
 * @ignore
 */
var Mask = function (_Submenu) {
  _inherits(Mask, _Submenu);

  function Mask(subMenuElement, _ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon,
        menuBarPosition = _ref.menuBarPosition,
        usageStatistics = _ref.usageStatistics;

    _classCallCheck(this, Mask);

    var _this = _possibleConstructorReturn(this, (Mask.__proto__ || Object.getPrototypeOf(Mask)).call(this, subMenuElement, {
      locale: locale,
      name: 'mask',
      makeSvgIcon: makeSvgIcon,
      menuBarPosition: menuBarPosition,
      templateHtml: _mask2.default,
      usageStatistics: usageStatistics
    }));

    _this._els = {
      applyButton: _this.selector('.tie-mask-apply'),
      maskImageButton: _this.selector('.tie-mask-image-file')
    };
    return _this;
  }

  /**
   * Destroys the instance.
   */


  _createClass(Mask, [{
    key: 'destroy',
    value: function destroy() {
      this._removeEvent();

      (0, _util.assignmentForDestroy)(this);
    }

    /**
     * Add event for mask
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.loadImageFromURL - load image action
     *   @param {Function} actions.applyFilter - apply filter action
     */

  }, {
    key: 'addEvent',
    value: function addEvent(actions) {
      var loadMaskFile = this._loadMaskFile.bind(this);
      var applyMask = this._applyMask.bind(this);

      this.eventHandler = {
        loadMaskFile: loadMaskFile,
        applyMask: applyMask
      };

      this.actions = actions;
      this._els.maskImageButton.addEventListener('change', loadMaskFile);
      this._els.applyButton.addEventListener('click', applyMask);
    }

    /**
     * Remove event
     * @private
     */

  }, {
    key: '_removeEvent',
    value: function _removeEvent() {
      this._els.maskImageButton.removeEventListener('change', this.eventHandler.loadMaskFile);
      this._els.applyButton.removeEventListener('click', this.eventHandler.applyMask);
    }

    /**
     * Apply mask
     * @private
     */

  }, {
    key: '_applyMask',
    value: function _applyMask() {
      this.actions.applyFilter();
      this._els.applyButton.classList.remove('active');
    }

    /**
     * Load mask file
     * @param {object} event - File change event object
     * @private
     */

  }, {
    key: '_loadMaskFile',
    value: function _loadMaskFile(event) {
      var imgUrl = void 0;

      if (!(0, _util.isSupportFileApi)()) {
        alert('This browser does not support file-api');
      }

      var _event$target$files = event.target.files,
          file = _event$target$files[0];


      if (file) {
        imgUrl = URL.createObjectURL(file);
        this.actions.loadImageFromURL(imgUrl, file);
        this._els.applyButton.classList.add('active');
      }
    }
  }]);

  return Mask;
}(_submenuBase2.default);

exports.default = Mask;

/***/ }),

/***/ "./src/js/ui/panelMenu.js":
/*!********************************!*\
  !*** ./src/js/ui/panelMenu.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Menu Panel Class
 * @class
 * @ignore
 */

var Panel = function () {
  /**
   * @param {HTMLElement} menuElement - menu dom element
   * @param {Object} options - menu options
   *   @param {string} options.name - name of panel menu
   */
  function Panel(menuElement, _ref) {
    var name = _ref.name;

    _classCallCheck(this, Panel);

    this.name = name;
    this.items = [];

    this.panelElement = this._makePanelElement();
    this.listElement = this._makeListElement();

    this.panelElement.appendChild(this.listElement);
    menuElement.appendChild(this.panelElement);
  }

  /**
   * Make Panel element
   * @returns {HTMLElement}
   */


  _createClass(Panel, [{
    key: '_makePanelElement',
    value: function _makePanelElement() {
      var panel = document.createElement('div');

      panel.className = 'tie-panel-' + this.name;

      return panel;
    }

    /**
     * Make list element
     * @returns {HTMLElement} list element
     * @private
     */

  }, {
    key: '_makeListElement',
    value: function _makeListElement() {
      var list = document.createElement('ol');

      list.className = this.name + '-list';

      return list;
    }

    /**
     * Make list item element
     * @param {string} html - history list item html
     * @returns {HTMLElement} list item element
     */

  }, {
    key: 'makeListItemElement',
    value: function makeListItemElement(html) {
      var listItem = document.createElement('li');

      listItem.innerHTML = html;
      listItem.className = this.name + '-item';
      listItem.setAttribute('data-index', this.items.length);

      return listItem;
    }

    /**
     * Push list item element
     * @param {HTMLElement} item - list item element to add to the list
     */

  }, {
    key: 'pushListItemElement',
    value: function pushListItemElement(item) {
      this.listElement.appendChild(item);
      this.listElement.scrollTop += item.offsetHeight;
      this.items.push(item);
    }

    /**
     * Delete list item element
     * @param {number} start - start index to delete
     * @param {number} end - end index to delete
     */

  }, {
    key: 'deleteListItemElement',
    value: function deleteListItemElement(start, end) {
      var items = this.items;


      for (var i = start; i < end; i += 1) {
        this.listElement.removeChild(items[i]);
      }
      items.splice(start, end - start + 1);
    }

    /**
     * Get list's length
     * @returns {number}
     */

  }, {
    key: 'getListLength',
    value: function getListLength() {
      return this.items.length;
    }

    /**
     * Add class name of item
     * @param {number} index - index of item
     * @param {string} className - class name to add
     */

  }, {
    key: 'addClass',
    value: function addClass(index, className) {
      if (this.items[index]) {
        this.items[index].classList.add(className);
      }
    }

    /**
     * Remove class name of item
     * @param {number} index - index of item
     * @param {string} className - class name to remove
     */

  }, {
    key: 'removeClass',
    value: function removeClass(index, className) {
      if (this.items[index]) {
        this.items[index].classList.remove(className);
      }
    }

    /**
     * Toggle class name of item
     * @param {number} index - index of item
     * @param {string} className - class name to remove
     */

  }, {
    key: 'toggleClass',
    value: function toggleClass(index, className) {
      if (this.items[index]) {
        this.items[index].classList.toggle(className);
      }
    }
  }]);

  return Panel;
}();

exports.default = Panel;

/***/ }),

/***/ "./src/js/ui/resize.js":
/*!*****************************!*\
  !*** ./src/js/ui/resize.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _submenuBase = __webpack_require__(/*! @/ui/submenuBase */ "./src/js/ui/submenuBase.js");

var _submenuBase2 = _interopRequireDefault(_submenuBase);

var _resize = __webpack_require__(/*! @/ui/template/submenu/resize */ "./src/js/ui/template/submenu/resize.js");

var _resize2 = _interopRequireDefault(_resize);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _range = __webpack_require__(/*! @/ui/tools/range */ "./src/js/ui/tools/range.js");

var _range2 = _interopRequireDefault(_range);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Resize ui class
 * @class
 * @ignore
 */
var Resize = function (_Submenu) {
  _inherits(Resize, _Submenu);

  function Resize(subMenuElement, _ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon,
        menuBarPosition = _ref.menuBarPosition,
        usageStatistics = _ref.usageStatistics;

    _classCallCheck(this, Resize);

    var _this = _possibleConstructorReturn(this, (Resize.__proto__ || Object.getPrototypeOf(Resize)).call(this, subMenuElement, {
      locale: locale,
      name: 'resize',
      makeSvgIcon: makeSvgIcon,
      menuBarPosition: menuBarPosition,
      templateHtml: _resize2.default,
      usageStatistics: usageStatistics
    }));

    _this.status = 'active';

    _this._lockState = false;

    /**
     * Original dimensions
     * @type {Object}
     * @private
     */
    _this._originalDimensions = null;

    _this._els = {
      widthRange: new _range2.default({
        slider: _this.selector('.tie-width-range'),
        input: _this.selector('.tie-width-range-value')
      }, _consts.defaultResizePixelValues),
      heightRange: new _range2.default({
        slider: _this.selector('.tie-height-range'),
        input: _this.selector('.tie-height-range-value')
      }, _consts.defaultResizePixelValues),
      lockAspectRatio: _this.selector('.tie-lock-aspect-ratio'),
      apply: _this.selector('.tie-resize-button .apply'),
      cancel: _this.selector('.tie-resize-button .cancel')
    };
    return _this;
  }

  /**
   * Executed when the menu starts.
   */


  _createClass(Resize, [{
    key: 'changeStartMode',
    value: function changeStartMode() {
      this.actions.modeChange('resize');
      var dimensions = this.actions.getCurrentDimensions();

      this._originalDimensions = dimensions;

      this.setWidthValue(dimensions.width);
      this.setHeightValue(dimensions.height);
    }

    /**
     * Returns the menu to its default state.
     */

  }, {
    key: 'changeStandbyMode',
    value: function changeStandbyMode() {
      this.actions.stopDrawingMode();
      this.actions.reset(true);
    }

    /**
     * Set dimension limits
     * @param {object} limits - expect dimension limits for change
     */

  }, {
    key: 'setLimit',
    value: function setLimit(limits) {
      this._els.widthRange.min = this.calcMinValue(limits.minWidth);
      this._els.heightRange.min = this.calcMinValue(limits.minHeight);
      this._els.widthRange.max = this.calcMaxValue(limits.maxWidth);
      this._els.heightRange.max = this.calcMaxValue(limits.maxHeight);
    }

    /**
     * Calculate max value
     * @param {number} maxValue - max value
     * @returns {number}
     */

  }, {
    key: 'calcMaxValue',
    value: function calcMaxValue(maxValue) {
      if (maxValue <= 0) {
        maxValue = _consts.defaultResizePixelValues.max;
      }

      return maxValue;
    }

    /**
     * Calculate min value
     * @param {number} minValue - min value
     * @returns {number}
     */

  }, {
    key: 'calcMinValue',
    value: function calcMinValue(minValue) {
      if (minValue <= 0) {
        minValue = _consts.defaultResizePixelValues.min;
      }

      return minValue;
    }

    /**
     * Set width value
     * @param {number} value - expect value for widthRange change
     * @param {boolean} trigger - fire change event control
     */

  }, {
    key: 'setWidthValue',
    value: function setWidthValue(value) {
      var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this._els.widthRange.value = value;
      if (trigger) {
        this._els.widthRange.trigger('change');
      }
    }

    /**
     * Set height value
     * @param {number} value - expect value for heightRange change
     * @param {boolean} trigger - fire change event control
     */

  }, {
    key: 'setHeightValue',
    value: function setHeightValue(value) {
      var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this._els.heightRange.value = value;
      if (trigger) {
        this._els.heightRange.trigger('change');
      }
    }

    /**
     * Destroys the instance.
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this._removeEvent();

      (0, _util.assignmentForDestroy)(this);
    }

    /**
     * Add event for resize
     * @param {Object} actions - actions for resize
     *   @param {Function} actions.resize - resize action
     *   @param {Function} actions.preview - preview action
     *   @param {Function} actions.getCurrentDimensions - Get current dimensions action
     *   @param {Function} actions.modeChange - change mode
     *   @param {Function} actions.stopDrawingMode - stop drawing mode
     *   @param {Function} actions.lockAspectRatio - lock aspect ratio
     *   @param {Function} actions.reset - reset action
     */

  }, {
    key: 'addEvent',
    value: function addEvent(actions) {
      this._els.widthRange.on('change', this._changeWidthRangeHandler.bind(this));
      this._els.heightRange.on('change', this._changeHeightRangeHandler.bind(this));
      this._els.lockAspectRatio.addEventListener('change', this._changeLockAspectRatio.bind(this));

      var apply = this._applyEventHandler.bind(this);
      var cancel = this._cancelEventHandler.bind(this);

      this.eventHandler = {
        apply: apply,
        cancel: cancel
      };

      this.actions = actions;
      this._els.apply.addEventListener('click', apply);
      this._els.cancel.addEventListener('click', cancel);
    }

    /**
     * Change width
     * @param {number} value - width range value
     * @private
     */

  }, {
    key: '_changeWidthRangeHandler',
    value: function _changeWidthRangeHandler(value) {
      this.actions.preview('width', (0, _util.toInteger)(value), this._lockState);
    }

    /**
     * Change height
     * @param {number} value - height range value
     * @private
     */

  }, {
    key: '_changeHeightRangeHandler',
    value: function _changeHeightRangeHandler(value) {
      this.actions.preview('height', (0, _util.toInteger)(value), this._lockState);
    }

    /**
     * Change lock aspect ratio state
     * @param {Event} event - aspect ratio check event
     * @private
     */

  }, {
    key: '_changeLockAspectRatio',
    value: function _changeLockAspectRatio(event) {
      this._lockState = event.target.checked;
      this.actions.lockAspectRatio(this._lockState, _consts.defaultResizePixelValues.min, _consts.defaultResizePixelValues.max);
    }

    /**
     * Remove event
     * @private
     */

  }, {
    key: '_removeEvent',
    value: function _removeEvent() {
      this._els.apply.removeEventListener('click', this.eventHandler.apply);
      this._els.cancel.removeEventListener('click', this.eventHandler.cancel);
    }
  }, {
    key: '_applyEventHandler',
    value: function _applyEventHandler() {
      this.actions.resize();
      this._els.apply.classList.remove('active');
    }
  }, {
    key: '_cancelEventHandler',
    value: function _cancelEventHandler() {
      this.actions.reset();
      this._els.cancel.classList.remove('active');
    }

    /**
     * Change apply button status
     * @param {Boolean} enableStatus - apply button status
     */

  }, {
    key: 'changeApplyButtonStatus',
    value: function changeApplyButtonStatus(enableStatus) {
      if (enableStatus) {
        this._els.apply.classList.add('active');
      } else {
        this._els.apply.classList.remove('active');
      }
    }
  }]);

  return Resize;
}(_submenuBase2.default);

exports.default = Resize;

/***/ }),

/***/ "./src/js/ui/rotate.js":
/*!*****************************!*\
  !*** ./src/js/ui/rotate.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _range = __webpack_require__(/*! @/ui/tools/range */ "./src/js/ui/tools/range.js");

var _range2 = _interopRequireDefault(_range);

var _submenuBase = __webpack_require__(/*! @/ui/submenuBase */ "./src/js/ui/submenuBase.js");

var _submenuBase2 = _interopRequireDefault(_submenuBase);

var _rotate = __webpack_require__(/*! @/ui/template/submenu/rotate */ "./src/js/ui/template/submenu/rotate.js");

var _rotate2 = _interopRequireDefault(_rotate);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CLOCKWISE = 30;
var COUNTERCLOCKWISE = -30;

/**
 * Rotate ui class
 * @class
 * @ignore
 */

var Rotate = function (_Submenu) {
  _inherits(Rotate, _Submenu);

  function Rotate(subMenuElement, _ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon,
        menuBarPosition = _ref.menuBarPosition,
        usageStatistics = _ref.usageStatistics;

    _classCallCheck(this, Rotate);

    var _this = _possibleConstructorReturn(this, (Rotate.__proto__ || Object.getPrototypeOf(Rotate)).call(this, subMenuElement, {
      locale: locale,
      name: 'rotate',
      makeSvgIcon: makeSvgIcon,
      menuBarPosition: menuBarPosition,
      templateHtml: _rotate2.default,
      usageStatistics: usageStatistics
    }));

    _this._value = 0;

    _this._els = {
      rotateButton: _this.selector('.tie-rotate-button'),
      rotateRange: new _range2.default({
        slider: _this.selector('.tie-rotate-range'),
        input: _this.selector('.tie-rotate-range-value')
      }, _consts.defaultRotateRangeValues)
    };
    return _this;
  }

  /**
   * Destroys the instance.
   */


  _createClass(Rotate, [{
    key: 'destroy',
    value: function destroy() {
      this._removeEvent();
      this._els.rotateRange.destroy();

      (0, _util.assignmentForDestroy)(this);
    }
  }, {
    key: 'setRangeBarAngle',
    value: function setRangeBarAngle(type, angle) {
      var resultAngle = angle;

      if (type === 'rotate') {
        resultAngle = parseInt(this._els.rotateRange.value, 10) + angle;
      }

      this._setRangeBarRatio(resultAngle);
    }
  }, {
    key: '_setRangeBarRatio',
    value: function _setRangeBarRatio(angle) {
      this._els.rotateRange.value = angle;
    }

    /**
     * Add event for rotate
     * @param {Object} actions - actions for crop
     *   @param {Function} actions.rotate - rotate action
     *   @param {Function} actions.setAngle - set angle action
     */

  }, {
    key: 'addEvent',
    value: function addEvent(actions) {
      this.eventHandler.rotationAngleChanged = this._changeRotateForButton.bind(this);

      // {rotate, setAngle}
      this.actions = actions;
      this._els.rotateButton.addEventListener('click', this.eventHandler.rotationAngleChanged);
      this._els.rotateRange.on('change', this._changeRotateForRange.bind(this));
    }

    /**
     * Remove event
     * @private
     */

  }, {
    key: '_removeEvent',
    value: function _removeEvent() {
      this._els.rotateButton.removeEventListener('click', this.eventHandler.rotationAngleChanged);
      this._els.rotateRange.off();
    }

    /**
     * Change rotate for range
     * @param {number} value - angle value
     * @param {boolean} isLast - Is last change
     * @private
     */

  }, {
    key: '_changeRotateForRange',
    value: function _changeRotateForRange(value, isLast) {
      var angle = (0, _util.toInteger)(value);
      this.actions.setAngle(angle, !isLast);
      this._value = angle;
    }

    /**
     * Change rotate for button
     * @param {object} event - add button event object
     * @private
     */

  }, {
    key: '_changeRotateForButton',
    value: function _changeRotateForButton(event) {
      var button = event.target.closest('.tui-image-editor-button');
      var angle = this._els.rotateRange.value;

      if (button) {
        var rotateType = this.getButtonType(button, ['counterclockwise', 'clockwise']);
        var rotateAngle = {
          clockwise: CLOCKWISE,
          counterclockwise: COUNTERCLOCKWISE
        }[rotateType];
        var newAngle = parseInt(angle, 10) + rotateAngle;
        var isRotatable = newAngle >= -360 && newAngle <= 360;
        if (isRotatable) {
          this.actions.rotate(rotateAngle);
        }
      }
    }
  }]);

  return Rotate;
}(_submenuBase2.default);

exports.default = Rotate;

/***/ }),

/***/ "./src/js/ui/shape.js":
/*!****************************!*\
  !*** ./src/js/ui/shape.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _colorpicker = __webpack_require__(/*! @/ui/tools/colorpicker */ "./src/js/ui/tools/colorpicker.js");

var _colorpicker2 = _interopRequireDefault(_colorpicker);

var _range = __webpack_require__(/*! @/ui/tools/range */ "./src/js/ui/tools/range.js");

var _range2 = _interopRequireDefault(_range);

var _submenuBase = __webpack_require__(/*! @/ui/submenuBase */ "./src/js/ui/submenuBase.js");

var _submenuBase2 = _interopRequireDefault(_submenuBase);

var _shape = __webpack_require__(/*! @/ui/template/submenu/shape */ "./src/js/ui/template/submenu/shape.js");

var _shape2 = _interopRequireDefault(_shape);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SHAPE_DEFAULT_OPTION = {
  stroke: '#ffbb3b',
  fill: '',
  strokeWidth: 3
};

/**
 * Shape ui class
 * @class
 * @ignore
 */

var Shape = function (_Submenu) {
  _inherits(Shape, _Submenu);

  function Shape(subMenuElement, _ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon,
        menuBarPosition = _ref.menuBarPosition,
        usageStatistics = _ref.usageStatistics;

    _classCallCheck(this, Shape);

    var _this = _possibleConstructorReturn(this, (Shape.__proto__ || Object.getPrototypeOf(Shape)).call(this, subMenuElement, {
      locale: locale,
      name: 'shape',
      makeSvgIcon: makeSvgIcon,
      menuBarPosition: menuBarPosition,
      templateHtml: _shape2.default,
      usageStatistics: usageStatistics
    }));

    _this.type = null;
    _this.options = SHAPE_DEFAULT_OPTION;

    _this._els = {
      shapeSelectButton: _this.selector('.tie-shape-button'),
      shapeColorButton: _this.selector('.tie-shape-color-button'),
      strokeRange: new _range2.default({
        slider: _this.selector('.tie-stroke-range'),
        input: _this.selector('.tie-stroke-range-value')
      }, _consts.defaultShapeStrokeValues),
      fillColorpicker: new _colorpicker2.default(_this.selector('.tie-color-fill'), '', _this.toggleDirection, _this.usageStatistics),
      strokeColorpicker: new _colorpicker2.default(_this.selector('.tie-color-stroke'), '#ffbb3b', _this.toggleDirection, _this.usageStatistics)
    };

    _this.colorPickerControls.push(_this._els.fillColorpicker);
    _this.colorPickerControls.push(_this._els.strokeColorpicker);

    _this.colorPickerInputBoxes = [];
    _this.colorPickerInputBoxes.push(_this._els.fillColorpicker.colorpickerElement.querySelector(_consts.selectorNames.COLOR_PICKER_INPUT_BOX));
    _this.colorPickerInputBoxes.push(_this._els.strokeColorpicker.colorpickerElement.querySelector(_consts.selectorNames.COLOR_PICKER_INPUT_BOX));
    return _this;
  }

  /**
   * Destroys the instance.
   */


  _createClass(Shape, [{
    key: 'destroy',
    value: function destroy() {
      this._removeEvent();
      this._els.strokeRange.destroy();
      this._els.fillColorpicker.destroy();
      this._els.strokeColorpicker.destroy();

      (0, _util.assignmentForDestroy)(this);
    }

    /**
     * Add event for shape
     * @param {Object} actions - actions for shape
     *   @param {Function} actions.changeShape - change shape mode
     *   @param {Function} actions.setDrawingShape - set drawing shape
     */

  }, {
    key: 'addEvent',
    value: function addEvent(actions) {
      var _this2 = this;

      this.eventHandler.shapeTypeSelected = this._changeShapeHandler.bind(this);
      this.actions = actions;

      this._els.shapeSelectButton.addEventListener('click', this.eventHandler.shapeTypeSelected);
      this._els.strokeRange.on('change', this._changeStrokeRangeHandler.bind(this));
      this._els.fillColorpicker.on('change', this._changeFillColorHandler.bind(this));
      this._els.strokeColorpicker.on('change', this._changeStrokeColorHandler.bind(this));
      this._els.fillColorpicker.on('changeShow', this.colorPickerChangeShow.bind(this));
      this._els.strokeColorpicker.on('changeShow', this.colorPickerChangeShow.bind(this));

      _tuiCodeSnippet2.default.forEachArray(this.colorPickerInputBoxes, function (inputBox) {
        inputBox.addEventListener(_consts.eventNames.FOCUS, _this2._onStartEditingInputBox.bind(_this2));
        inputBox.addEventListener(_consts.eventNames.BLUR, _this2._onStopEditingInputBox.bind(_this2));
      }, this);
    }

    /**
     * Remove event
     * @private
     */

  }, {
    key: '_removeEvent',
    value: function _removeEvent() {
      var _this3 = this;

      this._els.shapeSelectButton.removeEventListener('click', this.eventHandler.shapeTypeSelected);
      this._els.strokeRange.off();
      this._els.fillColorpicker.off();
      this._els.strokeColorpicker.off();

      _tuiCodeSnippet2.default.forEachArray(this.colorPickerInputBoxes, function (inputBox) {
        inputBox.removeEventListener(_consts.eventNames.FOCUS, _this3._onStartEditingInputBox.bind(_this3));
        inputBox.removeEventListener(_consts.eventNames.BLUR, _this3._onStopEditingInputBox.bind(_this3));
      }, this);
    }

    /**
     * Set Shape status
     * @param {Object} options - options of shape status
     *   @param {string} strokeWidth - stroke width
     *   @param {string} strokeColor - stroke color
     *   @param {string} fillColor - fill color
     */

  }, {
    key: 'setShapeStatus',
    value: function setShapeStatus(_ref2) {
      var strokeWidth = _ref2.strokeWidth,
          strokeColor = _ref2.strokeColor,
          fillColor = _ref2.fillColor;

      this._els.strokeRange.value = strokeWidth;
      this._els.strokeColorpicker.color = strokeColor;
      this._els.fillColorpicker.color = fillColor;
      this.options.stroke = strokeColor;
      this.options.fill = fillColor;
      this.options.strokeWidth = strokeWidth;

      this.actions.setDrawingShape(this.type, { strokeWidth: strokeWidth });
    }

    /**
     * Executed when the menu starts.
     */

  }, {
    key: 'changeStartMode',
    value: function changeStartMode() {
      this.actions.stopDrawingMode();
    }

    /**
     * Returns the menu to its default state.
     */

  }, {
    key: 'changeStandbyMode',
    value: function changeStandbyMode() {
      this.type = null;
      this.actions.changeSelectableAll(true);
      this._els.shapeSelectButton.classList.remove('circle');
      this._els.shapeSelectButton.classList.remove('triangle');
      this._els.shapeSelectButton.classList.remove('rect');
    }

    /**
     * set range stroke max value
     * @param {number} maxValue - expect max value for change
     */

  }, {
    key: 'setMaxStrokeValue',
    value: function setMaxStrokeValue(maxValue) {
      var strokeMaxValue = maxValue;
      if (strokeMaxValue <= 0) {
        strokeMaxValue = _consts.defaultShapeStrokeValues.max;
      }
      this._els.strokeRange.max = strokeMaxValue;
    }

    /**
     * Set stroke value
     * @param {number} value - expect value for strokeRange change
     */

  }, {
    key: 'setStrokeValue',
    value: function setStrokeValue(value) {
      this._els.strokeRange.value = value;
      this._els.strokeRange.trigger('change');
    }

    /**
     * Get stroke value
     * @returns {number} - stroke range value
     */

  }, {
    key: 'getStrokeValue',
    value: function getStrokeValue() {
      return this._els.strokeRange.value;
    }

    /**
     * Change icon color
     * @param {object} event - add button event object
     * @private
     */

  }, {
    key: '_changeShapeHandler',
    value: function _changeShapeHandler(event) {
      var button = event.target.closest('.tui-image-editor-button');
      if (button) {
        this.actions.stopDrawingMode();
        this.actions.discardSelection();
        var shapeType = this.getButtonType(button, ['circle', 'triangle', 'rect']);

        if (this.type === shapeType) {
          this.changeStandbyMode();

          return;
        }
        this.changeStandbyMode();
        this.type = shapeType;
        event.currentTarget.classList.add(shapeType);
        this.actions.changeSelectableAll(false);
        this.actions.modeChange('shape');
      }
    }

    /**
     * Change stroke range
     * @param {number} value - stroke range value
     * @param {boolean} isLast - Is last change
     * @private
     */

  }, {
    key: '_changeStrokeRangeHandler',
    value: function _changeStrokeRangeHandler(value, isLast) {
      this.options.strokeWidth = (0, _util.toInteger)(value);
      this.actions.changeShape({
        strokeWidth: value
      }, !isLast);

      this.actions.setDrawingShape(this.type, this.options);
    }

    /**
     * Change shape color
     * @param {string} color - fill color
     * @private
     */

  }, {
    key: '_changeFillColorHandler',
    value: function _changeFillColorHandler(color) {
      color = color || 'transparent';
      this.options.fill = color;
      this.actions.changeShape({
        fill: color
      });
    }

    /**
     * Change shape stroke color
     * @param {string} color - fill color
     * @private
     */

  }, {
    key: '_changeStrokeColorHandler',
    value: function _changeStrokeColorHandler(color) {
      color = color || 'transparent';
      this.options.stroke = color;
      this.actions.changeShape({
        stroke: color
      });
    }
  }]);

  return Shape;
}(_submenuBase2.default);

exports.default = Shape;

/***/ }),

/***/ "./src/js/ui/submenuBase.js":
/*!**********************************!*\
  !*** ./src/js/ui/submenuBase.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Submenu Base Class
 * @class
 * @ignore
 */
var Submenu = function () {
  /**
   * @param {HTMLElement} subMenuElement - submenu dom element
   * @param {Locale} locale - translate text
   * @param {string} name - name of sub menu
   * @param {Object} iconStyle - style of icon
   * @param {string} menuBarPosition - position of menu
   * @param {*} templateHtml - template for SubMenuElement
   * @param {boolean} [usageStatistics=false] - template for SubMenuElement
   */
  function Submenu(subMenuElement, _ref) {
    var locale = _ref.locale,
        name = _ref.name,
        makeSvgIcon = _ref.makeSvgIcon,
        menuBarPosition = _ref.menuBarPosition,
        templateHtml = _ref.templateHtml,
        usageStatistics = _ref.usageStatistics;

    _classCallCheck(this, Submenu);

    this.subMenuElement = subMenuElement;
    this.menuBarPosition = menuBarPosition;
    this.toggleDirection = menuBarPosition === 'top' ? 'down' : 'up';
    this.colorPickerControls = [];
    this.usageStatistics = usageStatistics;
    this.eventHandler = {};
    this._makeSubMenuElement({
      locale: locale,
      name: name,
      makeSvgIcon: makeSvgIcon,
      templateHtml: templateHtml
    });
  }

  /**
   * editor dom ui query selector
   * @param {string} selectName - query selector string name
   * @returns {HTMLElement}
   */


  _createClass(Submenu, [{
    key: 'selector',
    value: function selector(selectName) {
      return this.subMenuElement.querySelector(selectName);
    }

    /**
     * change show state change for colorpicker instance
     * @param {Colorpicker} occurredControl - target Colorpicker Instance
     */

  }, {
    key: 'colorPickerChangeShow',
    value: function colorPickerChangeShow(occurredControl) {
      this.colorPickerControls.forEach(function (pickerControl) {
        if (occurredControl !== pickerControl) {
          pickerControl.hide();
        }
      });
    }

    /**
     * Get button type
     * @param {HTMLElement} button - event target element
     * @param {array} buttonNames - Array of button names
     * @returns {string} - button type
     */

  }, {
    key: 'getButtonType',
    value: function getButtonType(button, buttonNames) {
      return button.className.match(RegExp('(' + buttonNames.join('|') + ')'))[0];
    }

    /**
     * Get button type
     * @param {HTMLElement} target - event target element
     * @param {string} removeClass - remove class name
     * @param {string} addClass - add class name
     */

  }, {
    key: 'changeClass',
    value: function changeClass(target, removeClass, addClass) {
      target.classList.remove(removeClass);
      target.classList.add(addClass);
    }

    /**
     * Interface method whose implementation is optional.
     * Returns the menu to its default state.
     */

  }, {
    key: 'changeStandbyMode',
    value: function changeStandbyMode() {}

    /**
     * Interface method whose implementation is optional.
     * Executed when the menu starts.
     */

  }, {
    key: 'changeStartMode',
    value: function changeStartMode() {}

    /**
     * Make submenu dom element
     * @param {Locale} locale - translate text
     * @param {string} name - submenu name
     * @param {Object} iconStyle -  icon style
     * @param {*} templateHtml - template for SubMenuElement
     * @private
     */

  }, {
    key: '_makeSubMenuElement',
    value: function _makeSubMenuElement(_ref2) {
      var locale = _ref2.locale,
          name = _ref2.name,
          iconStyle = _ref2.iconStyle,
          makeSvgIcon = _ref2.makeSvgIcon,
          templateHtml = _ref2.templateHtml;

      var iconSubMenu = document.createElement('div');
      iconSubMenu.className = 'tui-image-editor-menu-' + name;
      iconSubMenu.innerHTML = templateHtml({
        locale: locale,
        iconStyle: iconStyle,
        makeSvgIcon: makeSvgIcon
      });

      this.subMenuElement.appendChild(iconSubMenu);
    }
  }, {
    key: '_onStartEditingInputBox',
    value: function _onStartEditingInputBox() {
      this.fire(_consts.eventNames.INPUT_BOX_EDITING_STARTED);
    }
  }, {
    key: '_onStopEditingInputBox',
    value: function _onStopEditingInputBox() {
      this.fire(_consts.eventNames.INPUT_BOX_EDITING_STOPPED);
    }
  }]);

  return Submenu;
}();

_tuiCodeSnippet.CustomEvents.mixin(Submenu);

exports.default = Submenu;

/***/ }),

/***/ "./src/js/ui/template/controls.js":
/*!****************************************!*\
  !*** ./src/js/ui/template/controls.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

exports.default = function (_ref) {
    var locale = _ref.locale,
        biImage = _ref.biImage,
        loadButtonStyle = _ref.loadButtonStyle,
        downloadButtonStyle = _ref.downloadButtonStyle,
        menuBarPosition = _ref.menuBarPosition;
    return '\n    <ul class="tui-image-editor-help-menu ' + (0, _util.getHelpMenuBarPosition)(menuBarPosition) + '"></ul>\n    <div class="tui-image-editor-controls">\n        <div class="tui-image-editor-controls-logo">\n            <img src="' + biImage + '" />\n        </div>\n        <ul class="tui-image-editor-menu"></ul>\n\n        <div class="tui-image-editor-controls-buttons">\n            <div style="' + loadButtonStyle + '">\n                ' + locale.localize('Load') + '\n                <input type="file" class="tui-image-editor-load-btn" />\n            </div>\n            <button class="tui-image-editor-download-btn" style="' + downloadButtonStyle + '">\n                ' + locale.localize('Download') + '\n            </button>\n        </div>\n    </div>\n';
};

/***/ }),

/***/ "./src/js/ui/template/mainContainer.js":
/*!*********************************************!*\
  !*** ./src/js/ui/template/mainContainer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var locale = _ref.locale,
        biImage = _ref.biImage,
        commonStyle = _ref.commonStyle,
        headerStyle = _ref.headerStyle,
        loadButtonStyle = _ref.loadButtonStyle,
        downloadButtonStyle = _ref.downloadButtonStyle,
        submenuStyle = _ref.submenuStyle;
    return '\n    <div class="tui-image-editor-main-container" style="' + commonStyle + '">\n        <div class="tui-image-editor-header" style="' + headerStyle + '">\n            <div class="tui-image-editor-header-logo">\n                <img src="' + biImage + '" />\n            </div>\n            <div class="tui-image-editor-header-buttons">\n                <div style="' + loadButtonStyle + '">\n                    ' + locale.localize('Load') + '\n                    <input type="file" class="tui-image-editor-load-btn" />\n                </div>\n                <button class="tui-image-editor-download-btn" style="' + downloadButtonStyle + '">\n                    ' + locale.localize('Download') + '\n                </button>\n            </div>\n        </div>\n        <div class="tui-image-editor-main">\n            <div class="tui-image-editor-submenu">\n                <div class="tui-image-editor-submenu-style" style="' + submenuStyle + '"></div>\n            </div>\n            <div class="tui-image-editor-wrap">\n                <div class="tui-image-editor-size-wrap">\n                    <div class="tui-image-editor-align-wrap">\n                        <div class="tui-image-editor"></div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n';
};

/***/ }),

/***/ "./src/js/ui/template/style.js":
/*!*************************************!*\
  !*** ./src/js/ui/template/style.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var subMenuLabelActive = _ref.subMenuLabelActive,
        subMenuLabelNormal = _ref.subMenuLabelNormal,
        subMenuRangeTitle = _ref.subMenuRangeTitle,
        submenuPartitionVertical = _ref.submenuPartitionVertical,
        submenuPartitionHorizontal = _ref.submenuPartitionHorizontal,
        submenuCheckbox = _ref.submenuCheckbox,
        submenuRangePointer = _ref.submenuRangePointer,
        submenuRangeValue = _ref.submenuRangeValue,
        submenuColorpickerTitle = _ref.submenuColorpickerTitle,
        submenuColorpickerButton = _ref.submenuColorpickerButton,
        submenuRangeBar = _ref.submenuRangeBar,
        submenuRangeSubbar = _ref.submenuRangeSubbar,
        submenuDisabledRangePointer = _ref.submenuDisabledRangePointer,
        submenuDisabledRangeBar = _ref.submenuDisabledRangeBar,
        submenuDisabledRangeSubbar = _ref.submenuDisabledRangeSubbar,
        submenuIconSize = _ref.submenuIconSize,
        menuIconSize = _ref.menuIconSize,
        biSize = _ref.biSize,
        menuIconStyle = _ref.menuIconStyle,
        submenuIconStyle = _ref.submenuIconStyle;
    return "\n    .tie-icon-add-button.icon-bubble .tui-image-editor-button[data-icontype=\"icon-bubble\"] label,\n    .tie-icon-add-button.icon-heart .tui-image-editor-button[data-icontype=\"icon-heart\"] label,\n    .tie-icon-add-button.icon-location .tui-image-editor-button[data-icontype=\"icon-location\"] label,\n    .tie-icon-add-button.icon-polygon .tui-image-editor-button[data-icontype=\"icon-polygon\"] label,\n    .tie-icon-add-button.icon-star .tui-image-editor-button[data-icontype=\"icon-star\"] label,\n    .tie-icon-add-button.icon-star-2 .tui-image-editor-button[data-icontype=\"icon-star-2\"] label,\n    .tie-icon-add-button.icon-arrow-3 .tui-image-editor-button[data-icontype=\"icon-arrow-3\"] label,\n    .tie-icon-add-button.icon-arrow-2 .tui-image-editor-button[data-icontype=\"icon-arrow-2\"] label,\n    .tie-icon-add-button.icon-arrow .tui-image-editor-button[data-icontype=\"icon-arrow\"] label,\n    .tie-icon-add-button.icon-bubble .tui-image-editor-button[data-icontype=\"icon-bubble\"] label,\n    .tie-draw-line-select-button.line .tui-image-editor-button.line label,\n    .tie-draw-line-select-button.free .tui-image-editor-button.free label,\n    .tie-flip-button.flipX .tui-image-editor-button.flipX label,\n    .tie-flip-button.flipY .tui-image-editor-button.flipY label,\n    .tie-flip-button.resetFlip .tui-image-editor-button.resetFlip label,\n    .tie-crop-button .tui-image-editor-button.apply.active label,\n    .tie-crop-preset-button .tui-image-editor-button.preset.active label,\n    .tie-resize-button .tui-image-editor-button.apply.active label,\n    .tie-resize-preset-button .tui-image-editor-button.preset.active label,\n    .tie-shape-button.rect .tui-image-editor-button.rect label,\n    .tie-shape-button.circle .tui-image-editor-button.circle label,\n    .tie-shape-button.triangle .tui-image-editor-button.triangle label,\n    .tie-text-effect-button .tui-image-editor-button.active label,\n    .tie-text-align-button.tie-text-align-left .tui-image-editor-button.left label,\n    .tie-text-align-button.tie-text-align-center .tui-image-editor-button.center label,\n    .tie-text-align-button.tie-text-align-right .tui-image-editor-button.right label,\n    .tie-mask-apply.apply.active .tui-image-editor-button.apply label,\n    .tui-image-editor-container .tui-image-editor-submenu .tui-image-editor-button:hover > label,\n    .tui-image-editor-container .tui-image-editor-checkbox label > span {\n        " + subMenuLabelActive + "\n    }\n    .tui-image-editor-container .tui-image-editor-submenu .tui-image-editor-button > label,\n    .tui-image-editor-container .tui-image-editor-range-wrap.tui-image-editor-newline.short label,\n    .tui-image-editor-container .tui-image-editor-range-wrap.tui-image-editor-newline.short label > span {\n        " + subMenuLabelNormal + "\n    }\n    .tui-image-editor-container .tui-image-editor-range-wrap label > span {\n        " + subMenuRangeTitle + "\n    }\n    .tui-image-editor-container .tui-image-editor-partition > div {\n        " + submenuPartitionVertical + "\n    }\n    .tui-image-editor-container.left .tui-image-editor-submenu .tui-image-editor-partition > div,\n    .tui-image-editor-container.right .tui-image-editor-submenu .tui-image-editor-partition > div {\n        " + submenuPartitionHorizontal + "\n    }\n    .tui-image-editor-container .tui-image-editor-checkbox label > span:before {\n        " + submenuCheckbox + "\n    }\n    .tui-image-editor-container .tui-image-editor-checkbox label > input:checked + span:before {\n        border: 0;\n    }\n    .tui-image-editor-container .tui-image-editor-virtual-range-pointer {\n        " + submenuRangePointer + "\n    }\n    .tui-image-editor-container .tui-image-editor-virtual-range-bar {\n        " + submenuRangeBar + "\n    }\n    .tui-image-editor-container .tui-image-editor-virtual-range-subbar {\n        " + submenuRangeSubbar + "\n    }\n    .tui-image-editor-container .tui-image-editor-disabled .tui-image-editor-virtual-range-pointer {\n        " + submenuDisabledRangePointer + "\n    }\n    .tui-image-editor-container .tui-image-editor-disabled .tui-image-editor-virtual-range-subbar {\n        " + submenuDisabledRangeSubbar + "\n    }\n    .tui-image-editor-container .tui-image-editor-disabled .tui-image-editor-virtual-range-bar {\n        " + submenuDisabledRangeBar + "\n    }\n    .tui-image-editor-container .tui-image-editor-range-value {\n        " + submenuRangeValue + "\n    }\n    .tui-image-editor-container .tui-image-editor-submenu .tui-image-editor-button .color-picker-value + label {\n        " + submenuColorpickerTitle + "\n    }\n    .tui-image-editor-container .tui-image-editor-submenu .tui-image-editor-button .color-picker-value {\n        " + submenuColorpickerButton + "\n    }\n    .tui-image-editor-container .svg_ic-menu {\n        " + menuIconSize + "\n    }\n    .tui-image-editor-container .svg_ic-submenu {\n        " + submenuIconSize + "\n    }\n    .tui-image-editor-container .tui-image-editor-controls-logo > img,\n    .tui-image-editor-container .tui-image-editor-header-logo > img {\n        " + biSize + "\n    }\n    .tui-image-editor-menu use.normal.use-default,\n    .tui-image-editor-help-menu use.normal.use-default {\n        fill-rule: evenodd;\n        fill: " + menuIconStyle.normal.color + ";\n        stroke: " + menuIconStyle.normal.color + ";\n    }\n    .tui-image-editor-menu use.active.use-default,\n    .tui-image-editor-help-menu use.active.use-default {\n        fill-rule: evenodd;\n        fill: " + menuIconStyle.active.color + ";\n        stroke: " + menuIconStyle.active.color + ";\n    }\n    .tui-image-editor-menu use.hover.use-default,\n    .tui-image-editor-help-menu use.hover.use-default {\n        fill-rule: evenodd;\n        fill: " + menuIconStyle.hover.color + ";\n        stroke: " + menuIconStyle.hover.color + ";\n    }\n    .tui-image-editor-menu use.disabled.use-default,\n    .tui-image-editor-help-menu use.disabled.use-default {\n        fill-rule: evenodd;\n        fill: " + menuIconStyle.disabled.color + ";\n        stroke: " + menuIconStyle.disabled.color + ";\n    }\n    .tui-image-editor-submenu use.normal.use-default {\n        fill-rule: evenodd;\n        fill: " + submenuIconStyle.normal.color + ";\n        stroke: " + submenuIconStyle.normal.color + ";\n    }\n    .tui-image-editor-submenu use.active.use-default {\n        fill-rule: evenodd;\n        fill: " + submenuIconStyle.active.color + ";\n        stroke: " + submenuIconStyle.active.color + ";\n    }\n";
};

/***/ }),

/***/ "./src/js/ui/template/submenu/crop.js":
/*!********************************************!*\
  !*** ./src/js/ui/template/submenu/crop.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 * @returns {string}
 */
exports.default = function (_ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon;
    return '\n    <ul class="tui-image-editor-submenu-item">\n        <li class="tie-crop-preset-button">\n            <div class="tui-image-editor-button preset preset-none active">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'shape-rectangle', true) + '\n                </div>\n                <label> ' + locale.localize('Custom') + ' </label>\n            </div>\n            <div class="tui-image-editor-button preset preset-square">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'crop', true) + '\n                </div>\n                <label> ' + locale.localize('Square') + ' </label>\n            </div>\n            <div class="tui-image-editor-button preset preset-3-2">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'crop', true) + '\n                </div>\n                <label> ' + locale.localize('3:2') + ' </label>\n            </div>\n            <div class="tui-image-editor-button preset preset-4-3">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'crop', true) + '\n                </div>\n                <label> ' + locale.localize('4:3') + ' </label>\n            </div>\n            <div class="tui-image-editor-button preset preset-5-4">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'crop', true) + '\n                </div>\n                <label> ' + locale.localize('5:4') + ' </label>\n            </div>\n            <div class="tui-image-editor-button preset preset-7-5">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'crop', true) + '\n                </div>\n                <label> ' + locale.localize('7:5') + ' </label>\n            </div>\n            <div class="tui-image-editor-button preset preset-16-9">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'crop', true) + '\n                </div>\n                <label> ' + locale.localize('16:9') + ' </label>\n            </div>\n        </li>\n        <li class="tui-image-editor-partition tui-image-editor-newline">\n        </li>\n        <li class="tui-image-editor-partition only-left-right">\n            <div></div>\n        </li>\n        <li class="tie-crop-button action">\n            <div class="tui-image-editor-button apply">\n                ' + makeSvgIcon(['normal', 'active'], 'apply') + '\n                <label>\n                    ' + locale.localize('Apply') + '\n                </label>\n            </div>\n            <div class="tui-image-editor-button cancel">\n                ' + makeSvgIcon(['normal', 'active'], 'cancel') + '\n                <label>\n                    ' + locale.localize('Cancel') + '\n                </label>\n            </div>\n        </li>\n    </ul>\n';
};

/***/ }),

/***/ "./src/js/ui/template/submenu/draw.js":
/*!********************************************!*\
  !*** ./src/js/ui/template/submenu/draw.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 * @returns {string}
 */
exports.default = function (_ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon;
    return '\n    <ul class="tui-image-editor-submenu-item">\n        <li class="tie-draw-line-select-button">\n            <div class="tui-image-editor-button free">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'draw-free', true) + '\n                </div>\n                <label>\n                    ' + locale.localize('Free') + '\n                </label>\n            </div>\n            <div class="tui-image-editor-button line">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'draw-line', true) + '\n                </div>\n                <label>\n                    ' + locale.localize('Straight') + '\n                </label>\n            </div>\n        </li>\n        <li class="tui-image-editor-partition">\n            <div></div>\n        </li>\n        <li>\n            <div class="tie-draw-color" title="' + locale.localize('Color') + '"></div>\n        </li>\n        <li class="tui-image-editor-partition only-left-right">\n            <div></div>\n        </li>\n        <li class="tui-image-editor-newline tui-image-editor-range-wrap">\n            <label class="range">' + locale.localize('Range') + '</label>\n            <div class="tie-draw-range"></div>\n            <input class="tie-draw-range-value tui-image-editor-range-value" value="0" />\n        </li>\n    </ul>\n';
};

/***/ }),

/***/ "./src/js/ui/template/submenu/filter.js":
/*!**********************************************!*\
  !*** ./src/js/ui/template/submenu/filter.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @param {Locale} locale - Translate text
 * @returns {string}
 */
exports.default = function (_ref) {
    var locale = _ref.locale;
    return '\n    <ul class="tui-image-editor-submenu-item">\n        <li class="tui-image-editor-submenu-align">\n            <div class="tui-image-editor-checkbox-wrap fixed-width">\n                <div class="tui-image-editor-checkbox">\n                    <label>\n                        <input type="checkbox" class="tie-grayscale">\n                        <span>' + locale.localize('Grayscale') + '</span>\n                    </label>\n                </div>\n                <div class="tui-image-editor-checkbox">\n                    <label>\n                        <input type="checkbox" class="tie-invert">\n                        <span>' + locale.localize('Invert') + '</span>\n                    </label>\n                </div>\n                <div class="tui-image-editor-checkbox">\n                    <label>\n                        <input type="checkbox" class="tie-sepia">\n                        <span>' + locale.localize('Sepia') + '</span>\n                    </label>\n                </div>\n                <div class="tui-image-editor-checkbox">\n                    <label>\n                        <input type="checkbox" class="tie-vintage">\n                        <span>' + locale.localize('Sepia2') + '</span>\n                    </label>\n                </div>\n                <div class="tui-image-editor-checkbox">\n                    <label>\n                        <input type="checkbox" class="tie-blur">\n                        <span>' + locale.localize('Blur') + '</span>\n                    </label>\n                </div>\n                <div class="tui-image-editor-checkbox">\n                    <label>\n                        <input type="checkbox" class="tie-sharpen">\n                        <span>' + locale.localize('Sharpen') + '</span>\n                    </label>\n                </div>\n                <div class="tui-image-editor-checkbox">\n                    <label>\n                        <input type="checkbox" class="tie-emboss">\n                        <span>' + locale.localize('Emboss') + '</span>\n                    </label>\n                </div>\n            </div>\n        </li>\n        <li class="tui-image-editor-partition">\n            <div></div>\n        </li>\n        <li class="tui-image-editor-submenu-align">\n            <div class="tui-image-editor-checkbox-group tui-image-editor-disabled" style="margin-bottom: 7px;">\n                <div class="tui-image-editor-checkbox-wrap">\n                    <div class="tui-image-editor-checkbox">\n                        <label>\n                            <input type="checkbox" class="tie-remove-white">\n                            <span>' + locale.localize('Remove White') + '</span>\n                        </label>\n                    </div>\n                </div>\n                <div class="tui-image-editor-newline tui-image-editor-range-wrap short">\n                    <label>' + locale.localize('Distance') + '</label>\n                    <div class="tie-removewhite-distance-range"></div>\n                </div>\n            </div>\n            <div class="tui-image-editor-checkbox-group tui-image-editor-disabled">\n                <div class="tui-image-editor-checkbox">\n                    <label>\n                        <input type="checkbox" class="tie-brightness">\n                        <span>' + locale.localize('Brightness') + '</span>\n                    </label>\n                </div>\n                <div class="tui-image-editor-range-wrap short">\n                    <div class="tie-brightness-range"></div>\n                </div>\n            </div>\n            <div class="tui-image-editor-checkbox-group tui-image-editor-disabled">\n                <div class="tui-image-editor-checkbox">\n                    <label>\n                        <input type="checkbox" class="tie-noise">\n                        <span>' + locale.localize('Noise') + '</span>\n                    </label>\n                </div>\n                <div class="tui-image-editor-range-wrap short">\n                    <div class="tie-noise-range"></div>\n                </div>\n            </div>\n        </li>\n        <li class="tui-image-editor-partition only-left-right">\n            <div></div>\n        </li>\n        <li class="tui-image-editor-submenu-align">\n            <div class="tui-image-editor-checkbox-group tui-image-editor-disabled">\n                <div class="tui-image-editor-checkbox">\n                    <label>\n                        <input type="checkbox" class="tie-pixelate">\n                        <span>' + locale.localize('Pixelate') + '</span>\n                    </label>\n                </div>\n                <div class="tui-image-editor-range-wrap short">\n                    <div class="tie-pixelate-range"></div>\n                </div>\n            </div>\n            <div class="tui-image-editor-checkbox-group tui-image-editor-disabled">\n                <div class="tui-image-editor-newline tui-image-editor-checkbox-wrap">\n                    <div class="tui-image-editor-checkbox">\n                        <label>\n                            <input type="checkbox" class="tie-color-filter">\n                            <span>' + locale.localize('Color Filter') + '</span>\n                        </label>\n                    </div>\n                </div>\n                <div class="tui-image-editor-newline tui-image-editor-range-wrap short">\n                    <label>' + locale.localize('Threshold') + '</label>\n                    <div class="tie-colorfilter-threshold-range"></div>\n                </div>\n            </div>\n        </li>\n        <li class="tui-image-editor-partition">\n            <div></div>\n        </li>\n        <li>\n            <div class="filter-color-item">\n                <div class="tie-filter-tint-color" title="' + locale.localize('Tint') + '"></div>\n                <div class="tui-image-editor-checkbox">\n                    <label>\n                        <input type="checkbox" class="tie-tint">\n                        <span></span>\n                    </label>\n                </div>\n            </div>\n            <div class="filter-color-item">\n                <div class="tie-filter-multiply-color" title="' + locale.localize('Multiply') + '"></div>\n                <div class="tui-image-editor-checkbox">\n                    <label>\n                        <input type="checkbox" class="tie-multiply">\n                        <span></span>\n                    </label>\n                </div>\n            </div>\n            <div class="filter-color-item">\n                <div class="tie-filter-blend-color" title="' + locale.localize('Blend') + '"></div>\n                <div class="tui-image-editor-checkbox">\n                    <label>\n                        <input type="checkbox" class="tie-blend">\n                        <span></span>\n                    </label>\n                </div>\n            </div>\n        </li>\n    </ul>\n';
};

/***/ }),

/***/ "./src/js/ui/template/submenu/flip.js":
/*!********************************************!*\
  !*** ./src/js/ui/template/submenu/flip.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 * @returns {string}
 */
exports.default = function (_ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon;
    return '\n    <ul class="tie-flip-button tui-image-editor-submenu-item">\n        <li>\n            <div class="tui-image-editor-button flipX">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'flip-x', true) + '\n                </div>\n                <label>\n                    ' + locale.localize('Flip X') + '\n                </label>\n            </div>\n            <div class="tui-image-editor-button flipY">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'flip-y', true) + '\n                </div>\n                <label>\n                    ' + locale.localize('Flip Y') + '\n                </label>\n            </div>\n        </li>\n        <li class="tui-image-editor-partition">\n            <div></div>\n        </li>\n        <li>\n            <div class="tui-image-editor-button resetFlip">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'flip-reset', true) + '\n                </div>\n                <label>\n                    ' + locale.localize('Reset') + '\n                </label>\n            </div>\n        </li>\n    </ul>\n';
};

/***/ }),

/***/ "./src/js/ui/template/submenu/history.js":
/*!***********************************************!*\
  !*** ./src/js/ui/template/submenu/history.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 *   @param {string} name - history name
 *   @param {string} detail - history detail information
 * @returns {string}
 */
exports.default = function (_ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon,
        name = _ref.name,
        detail = _ref.detail;
    return '\n    <div class="tui-image-editor-history-item history">\n        <div class="history-item-icon">\n            ' + makeSvgIcon(['normal', 'active'], 'history-' + name.toLowerCase(), true) + '\n        </div>\n        <span>\n            ' + locale.localize(name) + '\n            ' + (detail ? '(' + locale.localize(detail) + ')' : '') + '\n        </span>\n        <div class="history-item-checkbox">\n            ' + makeSvgIcon(['normal'], 'history-check', true) + '\n        </div>\n    </div>\n';
};

/***/ }),

/***/ "./src/js/ui/template/submenu/icon.js":
/*!********************************************!*\
  !*** ./src/js/ui/template/submenu/icon.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 * @returns {string}
 */
exports.default = function (_ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon;
    return '\n    <ul class="tui-image-editor-submenu-item">\n        <li class="tie-icon-add-button">\n            <div class="tui-image-editor-button" data-icontype="icon-arrow">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'icon-arrow', true) + '\n                </div>\n                <label>\n                    ' + locale.localize('Arrow') + '\n                </label>\n            </div>\n            <div class="tui-image-editor-button" data-icontype="icon-arrow-2">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'icon-arrow-2', true) + '\n                </div>\n                <label>\n                    ' + locale.localize('Arrow-2') + '\n                </label>\n            </div>\n            <div class="tui-image-editor-button" data-icontype="icon-arrow-3">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'icon-arrow-3', true) + '\n                </div>\n                <label>\n                    ' + locale.localize('Arrow-3') + '\n                </label>\n            </div>\n            <div class="tui-image-editor-button" data-icontype="icon-star">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'icon-star', true) + '\n                </div>\n                <label>\n                    ' + locale.localize('Star-1') + '\n                </label>\n            </div>\n            <div class="tui-image-editor-button" data-icontype="icon-star-2">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'icon-star-2', true) + '\n                </div>\n                <label>\n                    ' + locale.localize('Star-2') + '\n                </label>\n            </div>\n\n            <div class="tui-image-editor-button" data-icontype="icon-polygon">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'icon-polygon', true) + '\n                </div>\n                <label>\n                    ' + locale.localize('Polygon') + '\n                </label>\n            </div>\n\n            <div class="tui-image-editor-button" data-icontype="icon-location">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'icon-location', true) + '\n                </div>\n                <label>\n                    ' + locale.localize('Location') + '\n                </label>\n            </div>\n\n            <div class="tui-image-editor-button" data-icontype="icon-heart">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'icon-heart', true) + '\n                </div>\n                <label>\n                    ' + locale.localize('Heart') + '\n                </label>\n            </div>\n\n            <div class="tui-image-editor-button" data-icontype="icon-bubble">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'icon-bubble', true) + '\n                </div>\n                <label>\n                    ' + locale.localize('Bubble') + '\n                </label>\n            </div>\n        </li>\n        <li class="tui-image-editor-partition">\n            <div></div>\n        </li>\n        <li class="tie-icon-add-button">\n            <div class="tui-image-editor-button" style="margin:0">\n                <div>\n                    <input type="file" accept="image/*" class="tie-icon-image-file">\n                    ' + makeSvgIcon(['normal', 'active'], 'icon-load', true) + '\n                </div>\n                <label>\n                    ' + locale.localize('Custom icon') + '\n                </label>\n            </div>\n        </li>\n        <li class="tui-image-editor-partition">\n            <div></div>\n        </li>\n        <li>\n            <div class="tie-icon-color" title="' + locale.localize('Color') + '"></div>\n        </li>\n    </ul>\n';
};

/***/ }),

/***/ "./src/js/ui/template/submenu/mask.js":
/*!********************************************!*\
  !*** ./src/js/ui/template/submenu/mask.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 * @returns {string}
 */
exports.default = function (_ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon;
    return '\n    <ul class="tui-image-editor-submenu-item">\n        <li>\n            <div class="tui-image-editor-button">\n                <div>\n                    <input type="file" accept="image/*" class="tie-mask-image-file">\n                    ' + makeSvgIcon(['normal', 'active'], 'mask-load', true) + '\n                </div>\n                <label> ' + locale.localize('Load Mask Image') + ' </label>\n            </div>\n        </li>\n        <li class="tui-image-editor-partition only-left-right">\n            <div></div>\n        </li>\n        <li class="tie-mask-apply tui-image-editor-newline apply" style="margin-top: 22px;margin-bottom: 5px">\n            <div class="tui-image-editor-button apply">\n                ' + makeSvgIcon(['normal', 'active'], 'apply') + '\n                <label>\n                    ' + locale.localize('Apply') + '\n                </label>\n            </div>\n        </li>\n    </ul>\n';
};

/***/ }),

/***/ "./src/js/ui/template/submenu/resize.js":
/*!**********************************************!*\
  !*** ./src/js/ui/template/submenu/resize.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 * @returns {string}
 */
exports.default = function (_ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon;
    return '\n    <ul class="tui-image-editor-submenu-item">\n        <li class="tui-image-editor-submenu-align">\n            <div class="tui-image-editor-range-wrap tui-image-editor-newline">\n                <label class="range">' + locale.localize('Width') + '&nbsp;</label>\n                <div class="tie-width-range"></div>\n                <input class="tie-width-range-value tui-image-editor-range-value" value="0" /> <label class="range">px</label>\n                <div class="tui-image-editor-partition tui-image-editor-newline"></div>\n                <label class="range">' + locale.localize('Height') + '</label>\n                <div class="tie-height-range"></div>\n                <input class="tie-height-range-value tui-image-editor-range-value" value="0" /> <label class="range">px</label>\n            </div>\n        </li>\n        <li class="tui-image-editor-partition tui-image-editor-newline"></li>\n        <li class="tui-image-editor-partition only-left-right">\n            <div></div>\n        </li>\n        <li class="tui-image-editor-submenu-align">\n            <div class="tui-image-editor-checkbox-wrap">\n                <div class="tui-image-editor-checkbox">\n                    <label>\n                        <input type="checkbox" class="tie-lock-aspect-ratio">\n                        <span>' + locale.localize('Lock Aspect Ratio') + '</span>\n                    </label>\n                </div>\n            </div>\n        </li>\n        <li class="tui-image-editor-partition tui-image-editor-newline"></li>\n        <li class="tui-image-editor-partition only-left-right">\n            <div></div>\n        </li>\n        <li class="tui-image-editor-partition tui-image-editor-newline"></li>\n        <li class="tie-resize-button action">\n            <div class="tui-image-editor-button apply">\n                ' + makeSvgIcon(['normal', 'active'], 'apply') + '\n                <label>\n                    ' + locale.localize('Apply') + '\n                </label>\n            </div>\n            <div class="tui-image-editor-button cancel">\n                ' + makeSvgIcon(['normal', 'active'], 'cancel') + '\n                <label>\n                    ' + locale.localize('Cancel') + '\n                </label>\n            </div>\n        </li>\n    </ul>\n';
};

/***/ }),

/***/ "./src/js/ui/template/submenu/rotate.js":
/*!**********************************************!*\
  !*** ./src/js/ui/template/submenu/rotate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 * @returns {string}
 */
exports.default = function (_ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon;
    return '\n    <ul class="tui-image-editor-submenu-item">\n        <li class="tie-rotate-button">\n            <div class="tui-image-editor-button clockwise">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'rotate-clockwise', true) + '\n                </div>\n                <label> 30 </label>\n            </div>\n            <div class="tui-image-editor-button counterclockwise">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'rotate-counterclockwise', true) + '\n                </div>\n                <label> -30 </label>\n            </div>\n        </li>\n        <li class="tui-image-editor-partition only-left-right">\n            <div></div>\n        </li>\n        <li class="tui-image-editor-newline tui-image-editor-range-wrap">\n            <label class="range">' + locale.localize('Range') + '</label>\n            <div class="tie-rotate-range"></div>\n            <input class="tie-rotate-range-value tui-image-editor-range-value" value="0" />\n        </li>\n    </ul>\n';
};

/***/ }),

/***/ "./src/js/ui/template/submenu/shape.js":
/*!*********************************************!*\
  !*** ./src/js/ui/template/submenu/shape.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 * @returns {string}
 */
exports.default = function (_ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon;
    return '\n    <ul class="tui-image-editor-submenu-item">\n        <li class="tie-shape-button">\n            <div class="tui-image-editor-button rect">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'shape-rectangle', true) + '\n                </div>\n                <label> ' + locale.localize('Rectangle') + ' </label>\n            </div>\n            <div class="tui-image-editor-button circle">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'shape-circle', true) + '\n                </div>\n                <label> ' + locale.localize('Circle') + ' </label>\n            </div>\n            <div class="tui-image-editor-button triangle">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'shape-triangle', true) + '\n                </div>\n                <label> ' + locale.localize('Triangle') + ' </label>\n            </div>\n        </li>\n        <li class="tui-image-editor-partition">\n            <div></div>\n        </li>\n        <li class="tie-shape-color-button">\n            <div class="tie-color-fill" title="' + locale.localize('Fill') + '"></div>\n            <div class="tie-color-stroke" title="' + locale.localize('Stroke') + '"></div>\n        </li>\n        <li class="tui-image-editor-partition only-left-right">\n            <div></div>\n        </li>\n        <li class="tui-image-editor-newline tui-image-editor-range-wrap">\n            <label class="range">' + locale.localize('Stroke') + '</label>\n            <div class="tie-stroke-range"></div>\n            <input class="tie-stroke-range-value tui-image-editor-range-value" value="0" />\n        </li>\n    </ul>\n';
};

/***/ }),

/***/ "./src/js/ui/template/submenu/text.js":
/*!********************************************!*\
  !*** ./src/js/ui/template/submenu/text.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

/**
 * @param {Object} submenuInfo - submenu info for make template
 *   @param {Locale} locale - Translate text
 *   @param {Function} makeSvgIcon - svg icon generator
 * @returns {string}
 */
exports.default = function (_ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon;
    return '\n    <ul class="tui-image-editor-submenu-item">\n        <li class="tie-text-effect-button">\n            <div class="tui-image-editor-button bold">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'text-bold', true) + '\n                </div>\n                <label> ' + locale.localize('Bold') + ' </label>\n            </div>\n            <div class="tui-image-editor-button italic">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'text-italic', true) + '\n                </div>\n                <label> ' + locale.localize('Italic') + ' </label>\n            </div>\n            <div class="tui-image-editor-button underline">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'text-underline', true) + '\n                </div>\n                <label> ' + locale.localize('Underline') + ' </label>\n            </div>\n        </li>\n        <li class="tui-image-editor-partition">\n            <div></div>\n        </li>\n        <li class="tie-text-align-button">\n            <div class="tui-image-editor-button left">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'text-align-left', true) + '\n                </div>\n                <label> ' + locale.localize('Left') + ' </label>\n            </div>\n            <div class="tui-image-editor-button center">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'text-align-center', true) + '\n                </div>\n                <label> ' + locale.localize('Center') + ' </label>\n            </div>\n            <div class="tui-image-editor-button right">\n                <div>\n                    ' + makeSvgIcon(['normal', 'active'], 'text-align-right', true) + '\n                </div>\n                <label> ' + locale.localize('Right') + ' </label>\n            </div>\n        </li>\n        <li class="tui-image-editor-partition">\n            <div></div>\n        </li>\n        <li>\n            <div class="tie-text-color" title="' + locale.localize('Color') + '"></div>\n        </li>\n        <li class="tui-image-editor-partition only-left-right">\n            <div></div>\n        </li>\n        <li class="tui-image-editor-newline tui-image-editor-range-wrap">\n            <label class="range">' + locale.localize('Text size') + '</label>\n            <div class="tie-text-range"></div>\n            <input class="tie-text-range-value tui-image-editor-range-value" value="0" />\n        </li>\n    </ul>\n';
};

/***/ }),

/***/ "./src/js/ui/text.js":
/*!***************************!*\
  !*** ./src/js/ui/text.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _range = __webpack_require__(/*! @/ui/tools/range */ "./src/js/ui/tools/range.js");

var _range2 = _interopRequireDefault(_range);

var _colorpicker = __webpack_require__(/*! @/ui/tools/colorpicker */ "./src/js/ui/tools/colorpicker.js");

var _colorpicker2 = _interopRequireDefault(_colorpicker);

var _submenuBase = __webpack_require__(/*! @/ui/submenuBase */ "./src/js/ui/submenuBase.js");

var _submenuBase2 = _interopRequireDefault(_submenuBase);

var _text = __webpack_require__(/*! @/ui/template/submenu/text */ "./src/js/ui/template/submenu/text.js");

var _text2 = _interopRequireDefault(_text);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Crop ui class
 * @class
 * @ignore
 */
var Text = function (_Submenu) {
  _inherits(Text, _Submenu);

  function Text(subMenuElement, _ref) {
    var locale = _ref.locale,
        makeSvgIcon = _ref.makeSvgIcon,
        menuBarPosition = _ref.menuBarPosition,
        usageStatistics = _ref.usageStatistics;

    _classCallCheck(this, Text);

    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, subMenuElement, {
      locale: locale,
      name: 'text',
      makeSvgIcon: makeSvgIcon,
      menuBarPosition: menuBarPosition,
      templateHtml: _text2.default,
      usageStatistics: usageStatistics
    }));

    _this.effect = {
      bold: false,
      italic: false,
      underline: false
    };
    _this.align = 'tie-text-align-left';
    _this._els = {
      textEffectButton: _this.selector('.tie-text-effect-button'),
      textAlignButton: _this.selector('.tie-text-align-button'),
      textColorpicker: new _colorpicker2.default(_this.selector('.tie-text-color'), '#ffbb3b', _this.toggleDirection, _this.usageStatistics),
      textRange: new _range2.default({
        slider: _this.selector('.tie-text-range'),
        input: _this.selector('.tie-text-range-value')
      }, _consts.defaultTextRangeValues)
    };

    _this.colorPickerInputBox = _this._els.textColorpicker.colorpickerElement.querySelector(_consts.selectorNames.COLOR_PICKER_INPUT_BOX);
    return _this;
  }

  /**
   * Destroys the instance.
   */


  _createClass(Text, [{
    key: 'destroy',
    value: function destroy() {
      this._removeEvent();
      this._els.textColorpicker.destroy();
      this._els.textRange.destroy();

      (0, _util.assignmentForDestroy)(this);
    }

    /**
     * Add event for text
     * @param {Object} actions - actions for text
     *   @param {Function} actions.changeTextStyle - change text style
     */

  }, {
    key: 'addEvent',
    value: function addEvent(actions) {
      var setTextEffect = this._setTextEffectHandler.bind(this);
      var setTextAlign = this._setTextAlignHandler.bind(this);

      this.eventHandler = {
        setTextEffect: setTextEffect,
        setTextAlign: setTextAlign
      };

      this.actions = actions;
      this._els.textEffectButton.addEventListener('click', setTextEffect);
      this._els.textAlignButton.addEventListener('click', setTextAlign);
      this._els.textRange.on('change', this._changeTextRnageHandler.bind(this));
      this._els.textColorpicker.on('change', this._changeColorHandler.bind(this));

      this.colorPickerInputBox.addEventListener(_consts.eventNames.FOCUS, this._onStartEditingInputBox.bind(this));
      this.colorPickerInputBox.addEventListener(_consts.eventNames.BLUR, this._onStopEditingInputBox.bind(this));
    }

    /**
     * Remove event
     * @private
     */

  }, {
    key: '_removeEvent',
    value: function _removeEvent() {
      var _eventHandler = this.eventHandler,
          setTextEffect = _eventHandler.setTextEffect,
          setTextAlign = _eventHandler.setTextAlign;


      this._els.textEffectButton.removeEventListener('click', setTextEffect);
      this._els.textAlignButton.removeEventListener('click', setTextAlign);
      this._els.textRange.off();
      this._els.textColorpicker.off();

      this.colorPickerInputBox.removeEventListener(_consts.eventNames.FOCUS, this._onStartEditingInputBox.bind(this));
      this.colorPickerInputBox.removeEventListener(_consts.eventNames.BLUR, this._onStopEditingInputBox.bind(this));
    }

    /**
     * Returns the menu to its default state.
     */

  }, {
    key: 'changeStandbyMode',
    value: function changeStandbyMode() {
      this.actions.stopDrawingMode();
    }

    /**
     * Executed when the menu starts.
     */

  }, {
    key: 'changeStartMode',
    value: function changeStartMode() {
      this.actions.modeChange('text');
    }
  }, {
    key: 'setTextStyleStateOnAction',
    value: function setTextStyleStateOnAction() {
      var textStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var fill = textStyle.fill,
          fontSize = textStyle.fontSize,
          fontStyle = textStyle.fontStyle,
          fontWeight = textStyle.fontWeight,
          textDecoration = textStyle.textDecoration,
          textAlign = textStyle.textAlign;


      this.textColor = fill;
      this.fontSize = fontSize;
      this.setEffectState('italic', fontStyle);
      this.setEffectState('bold', fontWeight);
      this.setEffectState('underline', textDecoration);
      this.setAlignState('tie-text-align-' + textAlign);
    }
  }, {
    key: 'setEffectState',
    value: function setEffectState(effectName, value) {
      var effectValue = value === 'italic' || value === 'bold' || value === 'underline';
      var button = this._els.textEffectButton.querySelector('.tui-image-editor-button.' + effectName);

      this.effect[effectName] = effectValue;

      button.classList[effectValue ? 'add' : 'remove']('active');
    }
  }, {
    key: 'setAlignState',
    value: function setAlignState(value) {
      var button = this._els.textAlignButton;
      button.classList.remove(this.align);
      button.classList.add(value);
      this.align = value;
    }

    /**
     * text effect set handler
     * @param {object} event - add button event object
     * @private
     */

  }, {
    key: '_setTextEffectHandler',
    value: function _setTextEffectHandler(event) {
      var button = event.target.closest('.tui-image-editor-button');
      if (button) {
        var _button$className$mat = button.className.match(/(bold|italic|underline)/),
            styleType = _button$className$mat[0];

        var styleObj = {
          bold: { fontWeight: 'bold' },
          italic: { fontStyle: 'italic' },
          underline: { textDecoration: 'underline' }
        }[styleType];

        this.effect[styleType] = !this.effect[styleType];
        button.classList.toggle('active');
        this.actions.changeTextStyle(styleObj);
      }
    }

    /**
     * text effect set handler
     * @param {object} event - add button event object
     * @private
     */

  }, {
    key: '_setTextAlignHandler',
    value: function _setTextAlignHandler(event) {
      var button = event.target.closest('.tui-image-editor-button');
      if (button) {
        var styleType = this.getButtonType(button, ['left', 'center', 'right']);
        var styleTypeAlias = 'tie-text-align-' + styleType;

        event.currentTarget.classList.remove(this.align);
        if (this.align !== styleTypeAlias) {
          event.currentTarget.classList.add(styleTypeAlias);
        }
        this.actions.changeTextStyle({ textAlign: styleType });

        this.align = styleTypeAlias;
      }
    }

    /**
     * text align set handler
     * @param {number} value - range value
     * @param {boolean} isLast - Is last change
     * @private
     */

  }, {
    key: '_changeTextRnageHandler',
    value: function _changeTextRnageHandler(value, isLast) {
      this.actions.changeTextStyle({
        fontSize: value
      }, !isLast);
    }

    /**
     * change color handler
     * @param {string} color - change color string
     * @private
     */

  }, {
    key: '_changeColorHandler',
    value: function _changeColorHandler(color) {
      color = color || 'transparent';
      this.actions.changeTextStyle({
        fill: color
      });
    }
  }, {
    key: 'textColor',
    set: function set(color) {
      this._els.textColorpicker.color = color;
    }

    /**
     * Get text color
     * @returns {string} - text color
     */
    ,
    get: function get() {
      return this._els.textColorpicker.color;
    }

    /**
     * Get text size
     * @returns {string} - text size
     */

  }, {
    key: 'fontSize',
    get: function get() {
      return this._els.textRange.value;
    }

    /**
     * Set text size
     * @param {Number} value - text size
     */
    ,
    set: function set(value) {
      this._els.textRange.value = value;
    }

    /**
     * get font style
     * @returns {string} - font style
     */

  }, {
    key: 'fontStyle',
    get: function get() {
      return this.effect.italic ? 'italic' : 'normal';
    }

    /**
     * get font weight
     * @returns {string} - font weight
     */

  }, {
    key: 'fontWeight',
    get: function get() {
      return this.effect.bold ? 'bold' : 'normal';
    }

    /**
     * get text underline text underline
     * @returns {boolean} - true or false
     */

  }, {
    key: 'underline',
    get: function get() {
      return this.effect.underline;
    }
  }]);

  return Text;
}(_submenuBase2.default);

exports.default = Text;

/***/ }),

/***/ "./src/js/ui/theme/standard.js":
/*!*************************************!*\
  !*** ./src/js/ui/theme/standard.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @author NHN. FE Development Team <dl_javascript@nhn.com>
 * @fileoverview The standard theme
 */

/**
 * Full configuration for theme.<br>
 * @typedef {object} themeConfig
 * @property {string} common.bi.image - Brand icon image
 * @property {string} common.bisize.width - Icon image width
 * @property {string} common.bisize.height - Icon Image Height
 * @property {string} common.backgroundImage - Background image
 * @property {string} common.backgroundColor - Background color
 * @property {string} common.border - Full area border style
 * @property {string} header.backgroundImage - header area background
 * @property {string} header.backgroundColor - header area background color
 * @property {string} header.border - header area border style
 * @property {string} loadButton.backgroundColor - load button background color
 * @property {string} loadButton.border - load button border style
 * @property {string} loadButton.color - load button foreground color
 * @property {string} loadButton.fontFamily - load button font type
 * @property {string} loadButton.fontSize - load button font size
 * @property {string} downloadButton.backgroundColor - download button background color
 * @property {string} downloadButton.border - download button border style
 * @property {string} downloadButton.color - download button foreground color
 * @property {string} downloadButton.fontFamily - download button font type
 * @property {string} downloadButton.fontSize - download button font size
 * @property {string} menu.normalIcon.color - Menu normal color for default icon
 * @property {string} menu.normalIcon.path - Menu normal icon svg bundle file path
 * @property {string} menu.normalIcon.name - Menu normal icon svg bundle name
 * @property {string} menu.activeIcon.color - Menu active color for default icon
 * @property {string} menu.activeIcon.path - Menu active icon svg bundle file path
 * @property {string} menu.activeIcon.name - Menu active icon svg bundle name
 * @property {string} menu.disabled.color - Menu disabled color for default icon
 * @property {string} menu.disabled.path - Menu disabled icon svg bundle file path
 * @property {string} menu.disabled.name - Menu disabled icon svg bundle name
 * @property {string} menu.hover.color - Menu default icon hover color
 * @property {string} menu.hover.path - Menu hover icon svg bundle file path
 * @property {string} menu.hover.name - Menu hover icon svg bundle name
 * @property {string} menu.iconSize.width - Menu icon Size Width
 * @property {string} menu.iconSize.height - Menu Icon Size Height
 * @property {string} submenu.backgroundColor - Sub-menu area background color
 * @property {string} submenu.partition.color - Submenu partition line color
 * @property {string} submenu.normalIcon.color - Submenu normal color for default icon
 * @property {string} submenu.normalIcon.path - Submenu default icon svg bundle file path
 * @property {string} submenu.normalIcon.name - Submenu default icon svg bundle name
 * @property {string} submenu.activeIcon.color - Submenu active color for default icon
 * @property {string} submenu.activeIcon.path - Submenu active icon svg bundle file path
 * @property {string} submenu.activeIcon.name - Submenu active icon svg bundle name
 * @property {string} submenu.iconSize.width - Submenu icon Size Width
 * @property {string} submenu.iconSize.height - Submenu Icon Size Height
 * @property {string} submenu.normalLabel.color - Submenu default label color
 * @property {string} submenu.normalLabel.fontWeight - Sub Menu Default Label Font Thickness
 * @property {string} submenu.activeLabel.color - Submenu active label color
 * @property {string} submenu.activeLabel.fontWeight - Submenu active label Font thickness
 * @property {string} checkbox.border - Checkbox border style
 * @property {string} checkbox.backgroundColor - Checkbox background color
 * @property {string} range.pointer.color - range control pointer color
 * @property {string} range.bar.color - range control bar color
 * @property {string} range.subbar.color - range control subbar color
 * @property {string} range.value.color - range number box font color
 * @property {string} range.value.fontWeight - range number box font thickness
 * @property {string} range.value.fontSize - range number box font size
 * @property {string} range.value.border - range number box border style
 * @property {string} range.value.backgroundColor - range number box background color
 * @property {string} range.title.color - range title font color
 * @property {string} range.title.fontWeight - range title font weight
 * @property {string} colorpicker.button.border - colorpicker button border style
 * @property {string} colorpicker.title.color - colorpicker button title font color
 * @example
 // default keys and styles
 var customTheme = {
    'common.bi.image': 'https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png',
    'common.bisize.width': '251px',
    'common.bisize.height': '21px',
    'common.backgroundImage': 'none',
    'common.backgroundColor': '#1e1e1e',
    'common.border': '0px',

    // header
    'header.backgroundImage': 'none',
    'header.backgroundColor': 'transparent',
    'header.border': '0px',

    // load button
    'loadButton.backgroundColor': '#fff',
    'loadButton.border': '1px solid #ddd',
    'loadButton.color': '#222',
    'loadButton.fontFamily': 'NotoSans, sans-serif',
    'loadButton.fontSize': '12px',

    // download button
    'downloadButton.backgroundColor': '#fdba3b',
    'downloadButton.border': '1px solid #fdba3b',
    'downloadButton.color': '#fff',
    'downloadButton.fontFamily': 'NotoSans, sans-serif',
    'downloadButton.fontSize': '12px',

    // icons default
    'menu.normalIcon.color': '#8a8a8a',
    'menu.activeIcon.color': '#555555',
    'menu.disabledIcon.color': '#434343',
    'menu.hoverIcon.color': '#e9e9e9',
    'submenu.normalIcon.color': '#8a8a8a',
    'submenu.activeIcon.color': '#e9e9e9',

    'menu.iconSize.width': '24px',
    'menu.iconSize.height': '24px',
    'submenu.iconSize.width': '32px',
    'submenu.iconSize.height': '32px',

    // submenu primary color
    'submenu.backgroundColor': '#1e1e1e',
    'submenu.partition.color': '#858585',

    // submenu labels
    'submenu.normalLabel.color': '#858585',
    'submenu.normalLabel.fontWeight': 'lighter',
    'submenu.activeLabel.color': '#fff',
    'submenu.activeLabel.fontWeight': 'lighter',

    // checkbox style
    'checkbox.border': '1px solid #ccc',
    'checkbox.backgroundColor': '#fff',

    // rango style
    'range.pointer.color': '#fff',
    'range.bar.color': '#666',
    'range.subbar.color': '#d1d1d1',

    'range.disabledPointer.color': '#414141',
    'range.disabledBar.color': '#282828',
    'range.disabledSubbar.color': '#414141',

    'range.value.color': '#fff',
    'range.value.fontWeight': 'lighter',
    'range.value.fontSize': '11px',
    'range.value.border': '1px solid #353535',
    'range.value.backgroundColor': '#151515',
    'range.title.color': '#fff',
    'range.title.fontWeight': 'lighter',

    // colorpicker style
    'colorpicker.button.border': '1px solid #1e1e1e',
    'colorpicker.title.color': '#fff'
};
 */
exports.default = {
  'common.bi.image': 'https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png',
  'common.bisize.width': '251px',
  'common.bisize.height': '21px',
  'common.backgroundImage': 'none',
  'common.backgroundColor': '#1e1e1e',
  'common.border': '0px',

  // header
  'header.backgroundImage': 'none',
  'header.backgroundColor': 'transparent',
  'header.border': '0px',

  // load button
  'loadButton.backgroundColor': '#fff',
  'loadButton.border': '1px solid #ddd',
  'loadButton.color': '#222',
  'loadButton.fontFamily': "'Noto Sans', sans-serif",
  'loadButton.fontSize': '12px',

  // download button
  'downloadButton.backgroundColor': '#fdba3b',
  'downloadButton.border': '1px solid #fdba3b',
  'downloadButton.color': '#fff',
  'downloadButton.fontFamily': "'Noto Sans', sans-serif",
  'downloadButton.fontSize': '12px',

  // main icons
  'menu.normalIcon.color': '#8a8a8a',
  'menu.activeIcon.color': '#555555',
  'menu.disabledIcon.color': '#434343',
  'menu.hoverIcon.color': '#e9e9e9',

  // submenu icons
  'submenu.normalIcon.color': '#8a8a8a',
  'submenu.activeIcon.color': '#e9e9e9',

  'menu.iconSize.width': '24px',
  'menu.iconSize.height': '24px',

  'submenu.iconSize.width': '32px',
  'submenu.iconSize.height': '32px',

  // submenu primary color
  'submenu.backgroundColor': '#1e1e1e',
  'submenu.partition.color': '#3c3c3c',

  // submenu labels
  'submenu.normalLabel.color': '#8a8a8a',
  'submenu.normalLabel.fontWeight': 'lighter',
  'submenu.activeLabel.color': '#fff',
  'submenu.activeLabel.fontWeight': 'lighter',

  // checkbox style
  'checkbox.border': '0px',
  'checkbox.backgroundColor': '#fff',

  // range style
  'range.pointer.color': '#fff',
  'range.bar.color': '#666',
  'range.subbar.color': '#d1d1d1',

  'range.disabledPointer.color': '#414141',
  'range.disabledBar.color': '#282828',
  'range.disabledSubbar.color': '#414141',

  'range.value.color': '#fff',
  'range.value.fontWeight': 'lighter',
  'range.value.fontSize': '11px',
  'range.value.border': '1px solid #353535',
  'range.value.backgroundColor': '#151515',
  'range.title.color': '#fff',
  'range.title.fontWeight': 'lighter',

  // colorpicker style
  'colorpicker.button.border': '1px solid #1e1e1e',
  'colorpicker.title.color': '#fff'
};

/***/ }),

/***/ "./src/js/ui/theme/theme.js":
/*!**********************************!*\
  !*** ./src/js/ui/theme/theme.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _style = __webpack_require__(/*! @/ui/template/style */ "./src/js/ui/template/style.js");

var _style2 = _interopRequireDefault(_style);

var _standard = __webpack_require__(/*! @/ui/theme/standard */ "./src/js/ui/theme/standard.js");

var _standard2 = _interopRequireDefault(_standard);

var _default = __webpack_require__(/*! @svg/default.svg */ "./src/svg/default.svg");

var _default2 = _interopRequireDefault(_default);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Theme manager
 * @class
 * @param {Object} customTheme - custom theme
 * @ignore
 */
var Theme = function () {
  function Theme(customTheme) {
    _classCallCheck(this, Theme);

    this.styles = this._changeToObject((0, _tuiCodeSnippet.extend)({}, _standard2.default, customTheme));
    (0, _util.styleLoad)(this._styleMaker());

    this._loadDefaultSvgIcon();
  }

  /**
   * Get a Style cssText or StyleObject
   * @param {string} type - style type
   * @returns {string|object} - cssText or StyleObject
   */
  // eslint-disable-next-line complexity


  _createClass(Theme, [{
    key: 'getStyle',
    value: function getStyle(type) {
      var result = null;
      var firstProperty = type.replace(/\..+$/, '');
      var option = this.styles[type];
      switch (type) {
        case 'common.bi':
          result = this.styles[type].image;
          break;
        case 'menu.icon':
          result = {
            active: this.styles[firstProperty + '.activeIcon'],
            normal: this.styles[firstProperty + '.normalIcon'],
            hover: this.styles[firstProperty + '.hoverIcon'],
            disabled: this.styles[firstProperty + '.disabledIcon']
          };
          break;
        case 'submenu.icon':
          result = {
            active: this.styles[firstProperty + '.activeIcon'],
            normal: this.styles[firstProperty + '.normalIcon']
          };
          break;
        case 'submenu.label':
          result = {
            active: this._makeCssText(this.styles[firstProperty + '.activeLabel']),
            normal: this._makeCssText(this.styles[firstProperty + '.normalLabel'])
          };
          break;
        case 'submenu.partition':
          result = {
            vertical: this._makeCssText((0, _tuiCodeSnippet.extend)({}, option, { borderLeft: '1px solid ' + option.color })),
            horizontal: this._makeCssText((0, _tuiCodeSnippet.extend)({}, option, { borderBottom: '1px solid ' + option.color }))
          };
          break;

        case 'range.disabledPointer':
        case 'range.disabledBar':
        case 'range.disabledSubbar':
        case 'range.pointer':
        case 'range.bar':
        case 'range.subbar':
          option.backgroundColor = option.color;
          result = this._makeCssText(option);
          break;
        default:
          result = this._makeCssText(option);
          break;
      }

      return result;
    }

    /**
     * Make css resource
     * @returns {string} - serialized css text
     * @private
     */

  }, {
    key: '_styleMaker',
    value: function _styleMaker() {
      var submenuLabelStyle = this.getStyle('submenu.label');
      var submenuPartitionStyle = this.getStyle('submenu.partition');

      return (0, _style2.default)({
        subMenuLabelActive: submenuLabelStyle.active,
        subMenuLabelNormal: submenuLabelStyle.normal,
        submenuPartitionVertical: submenuPartitionStyle.vertical,
        submenuPartitionHorizontal: submenuPartitionStyle.horizontal,
        biSize: this.getStyle('common.bisize'),
        subMenuRangeTitle: this.getStyle('range.title'),
        submenuRangePointer: this.getStyle('range.pointer'),
        submenuRangeBar: this.getStyle('range.bar'),
        submenuRangeSubbar: this.getStyle('range.subbar'),

        submenuDisabledRangePointer: this.getStyle('range.disabledPointer'),
        submenuDisabledRangeBar: this.getStyle('range.disabledBar'),
        submenuDisabledRangeSubbar: this.getStyle('range.disabledSubbar'),

        submenuRangeValue: this.getStyle('range.value'),
        submenuColorpickerTitle: this.getStyle('colorpicker.title'),
        submenuColorpickerButton: this.getStyle('colorpicker.button'),
        submenuCheckbox: this.getStyle('checkbox'),
        menuIconSize: this.getStyle('menu.iconSize'),
        submenuIconSize: this.getStyle('submenu.iconSize'),
        menuIconStyle: this.getStyle('menu.icon'),
        submenuIconStyle: this.getStyle('submenu.icon')
      });
    }

    /**
     * Change to low dimensional object.
     * @param {object} styleOptions - style object of user interface
     * @returns {object} low level object for style apply
     * @private
     */

  }, {
    key: '_changeToObject',
    value: function _changeToObject(styleOptions) {
      var styleObject = {};
      (0, _tuiCodeSnippet.forEach)(styleOptions, function (value, key) {
        var keyExplode = key.match(/^(.+)\.([a-z]+)$/i);
        var property = keyExplode[1],
            subProperty = keyExplode[2];


        if (!styleObject[property]) {
          styleObject[property] = {};
        }
        styleObject[property][subProperty] = value;
      });

      return styleObject;
    }

    /**
     * Style object to Csstext serialize
     * @param {object} styleObject - style object
     * @returns {string} - css text string
     * @private
     */

  }, {
    key: '_makeCssText',
    value: function _makeCssText(styleObject) {
      var _this = this;

      var converterStack = [];

      (0, _tuiCodeSnippet.forEach)(styleObject, function (value, key) {
        if (['backgroundImage'].indexOf(key) > -1 && value !== 'none') {
          value = 'url(' + value + ')';
        }

        converterStack.push(_this._toUnderScore(key) + ': ' + value);
      });

      return converterStack.join(';');
    }

    /**
     * Camel key string to Underscore string
     * @param {string} targetString - change target
     * @returns {string}
     * @private
     */

  }, {
    key: '_toUnderScore',
    value: function _toUnderScore(targetString) {
      return targetString.replace(/([A-Z])/g, function ($0, $1) {
        return '-' + $1.toLowerCase();
      });
    }

    /**
     * Load default svg icon
     * @private
     */

  }, {
    key: '_loadDefaultSvgIcon',
    value: function _loadDefaultSvgIcon() {
      if (!document.getElementById('tui-image-editor-svg-default-icons')) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(_default2.default, 'text/xml');

        document.body.appendChild(dom.documentElement);
      }
    }

    /**
     * Make className for svg icon
     * @param {string} iconType - normal' or 'active' or 'hover' or 'disabled
     * @param {boolean} isSubmenu - submenu icon or not.
     * @returns {string}
     * @private
     */

  }, {
    key: '_makeIconClassName',
    value: function _makeIconClassName(iconType, isSubmenu) {
      var iconStyleInfo = isSubmenu ? this.getStyle('submenu.icon') : this.getStyle('menu.icon');
      var _iconStyleInfo$iconTy = iconStyleInfo[iconType],
          path = _iconStyleInfo$iconTy.path,
          name = _iconStyleInfo$iconTy.name;


      return path && name ? iconType : iconType + ' use-default';
    }

    /**
     * Make svg use link path name
     * @param {string} iconType - normal' or 'active' or 'hover' or 'disabled
     * @param {boolean} isSubmenu - submenu icon or not.
     * @returns {string}
     * @private
     */

  }, {
    key: '_makeSvgIconPrefix',
    value: function _makeSvgIconPrefix(iconType, isSubmenu) {
      var iconStyleInfo = isSubmenu ? this.getStyle('submenu.icon') : this.getStyle('menu.icon');
      var _iconStyleInfo$iconTy2 = iconStyleInfo[iconType],
          path = _iconStyleInfo$iconTy2.path,
          name = _iconStyleInfo$iconTy2.name;


      return path && name ? path + '#' + name + '-' : '#';
    }

    /**
     * Make svg use link path name
     * @param {Array.<string>} useIconTypes - normal' or 'active' or 'hover' or 'disabled
     * @param {string} menuName - menu name
     * @param {boolean} isSubmenu - submenu icon or not.
     * @returns {string}
     * @private
     */

  }, {
    key: '_makeSvgItem',
    value: function _makeSvgItem(useIconTypes, menuName, isSubmenu) {
      var _this2 = this;

      return (0, _tuiCodeSnippet.map)(useIconTypes, function (iconType) {
        var svgIconPrefix = _this2._makeSvgIconPrefix(iconType, isSubmenu);
        var iconName = _this2._toUnderScore(menuName);
        var svgIconClassName = _this2._makeIconClassName(iconType, isSubmenu);

        return '<use xlink:href="' + svgIconPrefix + 'ic-' + iconName + '" class="' + svgIconClassName + '"/>';
      }).join('');
    }

    /**
     * Make svg icon set
     * @param {Array.<string>} useIconTypes - normal' or 'active' or 'hover' or 'disabled
     * @param {string} menuName - menu name
     * @param {boolean} isSubmenu - submenu icon or not.
     * @returns {string}
     */

  }, {
    key: 'makeMenSvgIconSet',
    value: function makeMenSvgIconSet(useIconTypes, menuName) {
      var isSubmenu = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      return '<svg class="svg_ic-' + (isSubmenu ? 'submenu' : 'menu') + '">' + this._makeSvgItem(useIconTypes, menuName, isSubmenu) + '</svg>';
    }
  }]);

  return Theme;
}();

exports.default = Theme;

/***/ }),

/***/ "./src/js/ui/tools/colorpicker.js":
/*!****************************************!*\
  !*** ./src/js/ui/tools/colorpicker.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _tuiColorPicker = __webpack_require__(/*! tui-color-picker */ "tui-color-picker");

var _tuiColorPicker2 = _interopRequireDefault(_tuiColorPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PICKER_COLOR = ['#000000', '#2a2a2a', '#545454', '#7e7e7e', '#a8a8a8', '#d2d2d2', '#ffffff', '', '#ff4040', '#ff6518', '#ffbb3b', '#03bd9e', '#00a9ff', '#515ce6', '#9e5fff', '#ff5583'];

/**
 * Colorpicker control class
 * @class
 * @ignore
 */

var Colorpicker = function () {
  function Colorpicker(colorpickerElement) {
    var defaultColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#7e7e7e';
    var toggleDirection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'up';
    var usageStatistics = arguments[3];

    _classCallCheck(this, Colorpicker);

    this.colorpickerElement = colorpickerElement;
    this.usageStatistics = usageStatistics;

    this._show = false;

    this._colorpickerElement = colorpickerElement;
    this._toggleDirection = toggleDirection;
    this._makePickerButtonElement(defaultColor);
    this._makePickerLayerElement(colorpickerElement, colorpickerElement.getAttribute('title'));
    this._color = defaultColor;
    this.picker = _tuiColorPicker2.default.create({
      container: this.pickerElement,
      preset: PICKER_COLOR,
      color: defaultColor,
      usageStatistics: this.usageStatistics
    });

    this._addEvent();
  }

  /**
   * Destroys the instance.
   */


  _createClass(Colorpicker, [{
    key: 'destroy',
    value: function destroy() {
      var _this = this;

      this._removeEvent();
      this.picker.destroy();
      this.colorpickerElement.innerHTML = '';
      _tuiCodeSnippet2.default.forEach(this, function (value, key) {
        _this[key] = null;
      });
    }

    /**
     * Get color
     * @returns {Number} color value
     */

  }, {
    key: '_changeColorElement',


    /**
     * Change color element
     * @param {string} color color value
     * #private
     */
    value: function _changeColorElement(color) {
      if (color) {
        this.colorElement.classList.remove('transparent');
        this.colorElement.style.backgroundColor = color;
      } else {
        this.colorElement.style.backgroundColor = '#fff';
        this.colorElement.classList.add('transparent');
      }
    }

    /**
     * Make picker button element
     * @param {string} defaultColor color value
     * @private
     */

  }, {
    key: '_makePickerButtonElement',
    value: function _makePickerButtonElement(defaultColor) {
      this.colorpickerElement.classList.add('tui-image-editor-button');

      this.colorElement = document.createElement('div');
      this.colorElement.className = 'color-picker-value';
      if (defaultColor) {
        this.colorElement.style.backgroundColor = defaultColor;
      } else {
        this.colorElement.classList.add('transparent');
      }
    }

    /**
     * Make picker layer element
     * @param {HTMLElement} colorpickerElement color picker element
     * @param {string} title picker title
     * @private
     */

  }, {
    key: '_makePickerLayerElement',
    value: function _makePickerLayerElement(colorpickerElement, title) {
      var label = document.createElement('label');
      var triangle = document.createElement('div');

      this.pickerControl = document.createElement('div');
      this.pickerControl.className = 'color-picker-control';

      this.pickerElement = document.createElement('div');
      this.pickerElement.className = 'color-picker';

      label.innerHTML = title;
      triangle.className = 'triangle';

      this.pickerControl.appendChild(this.pickerElement);
      this.pickerControl.appendChild(triangle);

      colorpickerElement.appendChild(this.pickerControl);
      colorpickerElement.appendChild(this.colorElement);
      colorpickerElement.appendChild(label);
    }

    /**
     * Add event
     * @private
     */

  }, {
    key: '_addEvent',
    value: function _addEvent() {
      var _this2 = this;

      this.picker.on('selectColor', function (value) {
        _this2._changeColorElement(value.color);
        _this2._color = value.color;
        _this2.fire('change', value.color);
      });

      this.eventHandler = {
        pickerToggle: this._pickerToggleEventHandler.bind(this),
        pickerHide: function pickerHide() {
          return _this2.hide();
        }
      };

      this.colorpickerElement.addEventListener('click', this.eventHandler.pickerToggle);
      document.body.addEventListener('click', this.eventHandler.pickerHide);
    }

    /**
     * Remove event
     * @private
     */

  }, {
    key: '_removeEvent',
    value: function _removeEvent() {
      this.colorpickerElement.removeEventListener('click', this.eventHandler.pickerToggle);
      document.body.removeEventListener('click', this.eventHandler.pickerHide);
      this.picker.off();
    }

    /**
     * Picker toggle event handler
     * @param {object} event - change event
     * @private
     */

  }, {
    key: '_pickerToggleEventHandler',
    value: function _pickerToggleEventHandler(event) {
      var target = event.target;

      var isInPickerControl = target && this._isElementInColorPickerControl(target);

      if (!isInPickerControl || isInPickerControl && this._isPaletteButton(target)) {
        this._show = !this._show;
        this.pickerControl.style.display = this._show ? 'block' : 'none';
        this._setPickerControlPosition();
        this.fire('changeShow', this);
      }
      event.stopPropagation();
    }

    /**
     * Check hex input or not
     * @param {Element} target - Event target element
     * @returns {boolean}
     * @private
     */

  }, {
    key: '_isPaletteButton',
    value: function _isPaletteButton(target) {
      return target.className === 'tui-colorpicker-palette-button';
    }

    /**
     * Check given element is in pickerControl element
     * @param {Element} element - element to check
     * @returns {boolean}
     * @private
     */

  }, {
    key: '_isElementInColorPickerControl',
    value: function _isElementInColorPickerControl(element) {
      var parentNode = element;

      while (parentNode !== document.body) {
        if (!parentNode) {
          break;
        }

        if (parentNode === this.pickerControl) {
          return true;
        }

        parentNode = parentNode.parentNode;
      }

      return false;
    }
  }, {
    key: 'hide',
    value: function hide() {
      this._show = false;
      this.pickerControl.style.display = 'none';
    }

    /**
     * Set picker control position
     * @private
     */

  }, {
    key: '_setPickerControlPosition',
    value: function _setPickerControlPosition() {
      var controlStyle = this.pickerControl.style;
      var halfPickerWidth = this._colorpickerElement.clientWidth / 2 + 2;
      var left = this.pickerControl.offsetWidth / 2 - halfPickerWidth;
      var top = (this.pickerControl.offsetHeight + 10) * -1;

      if (this._toggleDirection === 'down') {
        top = 30;
      }

      controlStyle.top = top + 'px';
      controlStyle.left = '-' + left + 'px';
    }
  }, {
    key: 'color',
    get: function get() {
      return this._color;
    }

    /**
     * Set color
     * @param {string} color color value
     */
    ,
    set: function set(color) {
      this._color = color;
      this._changeColorElement(color);
    }
  }]);

  return Colorpicker;
}();

_tuiCodeSnippet2.default.CustomEvents.mixin(Colorpicker);
exports.default = Colorpicker;

/***/ }),

/***/ "./src/js/ui/tools/range.js":
/*!**********************************!*\
  !*** ./src/js/ui/tools/range.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _tuiCodeSnippet2 = _interopRequireDefault(_tuiCodeSnippet);

var _util = __webpack_require__(/*! @/util */ "./src/js/util.js");

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INPUT_FILTER_REGEXP = /(-?)([0-9]*)[^0-9]*([0-9]*)/g;

/**
 * Range control class
 * @class
 * @ignore
 */

var Range = function () {
  /**
   * @constructor
   * @extends {View}
   * @param {Object} rangeElements - Html resources for creating sliders
   *  @param {HTMLElement} rangeElements.slider - b
   *  @param {HTMLElement} [rangeElements.input] - c
   * @param {Object} options - Slider make options
   *  @param {number} options.min - min value
   *  @param {number} options.max - max value
   *  @param {number} options.value - default value
   *  @param {number} [options.useDecimal] - Decimal point processing.
   *  @param {boolean} [options.realTimeEvent] - Reflect live events.
   */
  function Range(rangeElements) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Range);

    this._value = options.value || 0;

    this.rangeElement = rangeElements.slider;
    this.rangeInputElement = rangeElements.input;

    this._drawRangeElement();

    this.rangeWidth = this._getRangeWidth();
    this._min = options.min || 0;
    this._max = options.max || 100;
    this._useDecimal = options.useDecimal;
    this._absMax = this._min * -1 + this._max;
    this.realTimeEvent = options.realTimeEvent || false;

    this.eventHandler = {
      startChangingSlide: this._startChangingSlide.bind(this),
      stopChangingSlide: this._stopChangingSlide.bind(this),
      changeSlide: this._changeSlide.bind(this),
      changeSlideFinally: this._changeSlideFinally.bind(this),
      changeInput: this._changeValueWithInput.bind(this, false),
      changeInputFinally: this._changeValueWithInput.bind(this, true),
      changeInputWithArrow: this._changeValueWithInputKeyEvent.bind(this)
    };

    this._addClickEvent();
    this._addDragEvent();
    this._addInputEvent();
    this.value = options.value;
    this.trigger('change');
  }

  /**
   * Destroys the instance.
   */


  _createClass(Range, [{
    key: 'destroy',
    value: function destroy() {
      var _this = this;

      this._removeClickEvent();
      this._removeDragEvent();
      this._removeInputEvent();
      this.rangeElement.innerHTML = '';
      _tuiCodeSnippet2.default.forEach(this, function (value, key) {
        _this[key] = null;
      });
    }

    /**
     * Set range max value and re position cursor
     * @param {number} maxValue - max value
     */

  }, {
    key: 'trigger',


    /**
     * event trigger
     * @param {string} type - type
     */
    value: function trigger(type) {
      this.fire(type, this._value);
    }

    /**
     * Calculate slider width
     * @returns {number} - slider width
     */

  }, {
    key: '_getRangeWidth',
    value: function _getRangeWidth() {
      var getElementWidth = function getElementWidth(element) {
        return (0, _util.toInteger)(window.getComputedStyle(element, null).width);
      };

      return getElementWidth(this.rangeElement) - getElementWidth(this.pointer);
    }

    /**
     * Make range element
     * @private
     */

  }, {
    key: '_drawRangeElement',
    value: function _drawRangeElement() {
      this.rangeElement.classList.add('tui-image-editor-range');

      this.bar = document.createElement('div');
      this.bar.className = 'tui-image-editor-virtual-range-bar';

      this.subbar = document.createElement('div');
      this.subbar.className = 'tui-image-editor-virtual-range-subbar';

      this.pointer = document.createElement('div');
      this.pointer.className = 'tui-image-editor-virtual-range-pointer';

      this.bar.appendChild(this.subbar);
      this.bar.appendChild(this.pointer);
      this.rangeElement.appendChild(this.bar);
    }

    /**
     * Add range input editing event
     * @private
     */

  }, {
    key: '_addInputEvent',
    value: function _addInputEvent() {
      if (this.rangeInputElement) {
        this.rangeInputElement.addEventListener('keydown', this.eventHandler.changeInputWithArrow);
        this.rangeInputElement.addEventListener('keyup', this.eventHandler.changeInput);
        this.rangeInputElement.addEventListener('blur', this.eventHandler.changeInputFinally);
      }
    }

    /**
     * Remove range input editing event
     * @private
     */

  }, {
    key: '_removeInputEvent',
    value: function _removeInputEvent() {
      if (this.rangeInputElement) {
        this.rangeInputElement.removeEventListener('keydown', this.eventHandler.changeInputWithArrow);
        this.rangeInputElement.removeEventListener('keyup', this.eventHandler.changeInput);
        this.rangeInputElement.removeEventListener('blur', this.eventHandler.changeInputFinally);
      }
    }

    /**
     * change angle event
     * @param {object} event - key event
     * @private
     */

  }, {
    key: '_changeValueWithInputKeyEvent',
    value: function _changeValueWithInputKeyEvent(event) {
      var keyCode = event.keyCode,
          target = event.target;


      if ([_consts.keyCodes.ARROW_UP, _consts.keyCodes.ARROW_DOWN].indexOf(keyCode) < 0) {
        return;
      }

      var value = Number(target.value);

      value = this._valueUpDownForKeyEvent(value, keyCode);

      var unChanged = value < this._min || value > this._max;

      if (!unChanged) {
        var clampValue = (0, _util.clamp)(value, this._min, this.max);
        this.value = clampValue;
        this.fire('change', clampValue, false);
      }
    }

    /**
     * value up down for input
     * @param {number} value - original value number
     * @param {number} keyCode - input event key code
     * @returns {number} value - changed value
     * @private
     */

  }, {
    key: '_valueUpDownForKeyEvent',
    value: function _valueUpDownForKeyEvent(value, keyCode) {
      var step = this._useDecimal ? 0.1 : 1;

      if (keyCode === _consts.keyCodes.ARROW_UP) {
        value += step;
      } else if (keyCode === _consts.keyCodes.ARROW_DOWN) {
        value -= step;
      }

      return value;
    }

    /**
     * change angle event
     * @param {boolean} isLast - Is last change
     * @param {object} event - key event
     * @private
     */

  }, {
    key: '_changeValueWithInput',
    value: function _changeValueWithInput(isLast, event) {
      var keyCode = event.keyCode,
          target = event.target;


      if ([_consts.keyCodes.ARROW_UP, _consts.keyCodes.ARROW_DOWN].indexOf(keyCode) >= 0) {
        return;
      }

      var stringValue = this._filterForInputText(target.value);
      var waitForChange = !stringValue || isNaN(stringValue);
      target.value = stringValue;

      if (!waitForChange) {
        var value = this._useDecimal ? Number(stringValue) : (0, _util.toInteger)(stringValue);
        value = (0, _util.clamp)(value, this._min, this.max);

        this.value = value;
        this.fire('change', value, isLast);
      }
    }

    /**
     * Add Range click event
     * @private
     */

  }, {
    key: '_addClickEvent',
    value: function _addClickEvent() {
      this.rangeElement.addEventListener('click', this.eventHandler.changeSlideFinally);
    }

    /**
     * Remove Range click event
     * @private
     */

  }, {
    key: '_removeClickEvent',
    value: function _removeClickEvent() {
      this.rangeElement.removeEventListener('click', this.eventHandler.changeSlideFinally);
    }

    /**
     * Add Range drag event
     * @private
     */

  }, {
    key: '_addDragEvent',
    value: function _addDragEvent() {
      this.pointer.addEventListener('mousedown', this.eventHandler.startChangingSlide);
    }

    /**
     * Remove Range drag event
     * @private
     */

  }, {
    key: '_removeDragEvent',
    value: function _removeDragEvent() {
      this.pointer.removeEventListener('mousedown', this.eventHandler.startChangingSlide);
    }

    /**
     * change angle event
     * @param {object} event - change event
     * @private
     */

  }, {
    key: '_changeSlide',
    value: function _changeSlide(event) {
      var changePosition = event.screenX;
      var diffPosition = changePosition - this.firstPosition;
      var touchPx = this.firstLeft + diffPosition;
      touchPx = touchPx > this.rangeWidth ? this.rangeWidth : touchPx;
      touchPx = touchPx < 0 ? 0 : touchPx;

      this.pointer.style.left = touchPx + 'px';
      this.subbar.style.right = this.rangeWidth - touchPx + 'px';

      var ratio = touchPx / this.rangeWidth;
      var resultValue = this._absMax * ratio + this._min;
      var value = this._useDecimal ? resultValue : (0, _util.toInteger)(resultValue);
      var isValueChanged = this.value !== value;

      if (isValueChanged) {
        this.value = value;
        if (this.realTimeEvent) {
          this.fire('change', this._value, false);
        }
      }
    }
  }, {
    key: '_changeSlideFinally',
    value: function _changeSlideFinally(event) {
      event.stopPropagation();
      if (event.target.className !== 'tui-image-editor-range') {
        return;
      }
      var touchPx = event.offsetX;
      var ratio = touchPx / this.rangeWidth;
      var value = this._absMax * ratio + this._min;
      this.pointer.style.left = ratio * this.rangeWidth + 'px';
      this.subbar.style.right = (1 - ratio) * this.rangeWidth + 'px';
      this.value = value;

      this.fire('change', value, true);
    }
  }, {
    key: '_startChangingSlide',
    value: function _startChangingSlide(event) {
      this.firstPosition = event.screenX;
      this.firstLeft = (0, _util.toInteger)(this.pointer.style.left) || 0;

      document.addEventListener('mousemove', this.eventHandler.changeSlide);
      document.addEventListener('mouseup', this.eventHandler.stopChangingSlide);
    }

    /**
     * stop change angle event
     * @private
     */

  }, {
    key: '_stopChangingSlide',
    value: function _stopChangingSlide() {
      this.fire('change', this._value, true);

      document.removeEventListener('mousemove', this.eventHandler.changeSlide);
      document.removeEventListener('mouseup', this.eventHandler.stopChangingSlide);
    }

    /**
     * Unnecessary string filtering.
     * @param {string} inputValue - origin string of input
     * @returns {string} filtered string
     * @private
     */

  }, {
    key: '_filterForInputText',
    value: function _filterForInputText(inputValue) {
      return inputValue.replace(INPUT_FILTER_REGEXP, '$1$2$3');
    }
  }, {
    key: 'max',
    set: function set(maxValue) {
      this._max = maxValue;
      this._absMax = this._min * -1 + this._max;
      this.value = this._value;
    },
    get: function get() {
      return this._max;
    }

    /**
     * Set range min value and re position cursor
     * @param {number} minValue - min value
     */

  }, {
    key: 'min',
    set: function set(minValue) {
      this._min = minValue;
      this.max = this._max;
    },
    get: function get() {
      return this._min;
    }

    /**
     * Get range value
     * @returns {Number} range value
     */

  }, {
    key: 'value',
    get: function get() {
      return this._value;
    }

    /**
     * Set range value
     * @param {Number} value range value
     */
    ,
    set: function set(value) {
      value = this._useDecimal ? value : (0, _util.toInteger)(value);

      var absValue = value - this._min;
      var leftPosition = absValue * this.rangeWidth / this._absMax;

      if (this.rangeWidth < leftPosition) {
        leftPosition = this.rangeWidth;
      }

      this.pointer.style.left = leftPosition + 'px';
      this.subbar.style.right = this.rangeWidth - leftPosition + 'px';

      this._value = value;
      if (this.rangeInputElement) {
        this.rangeInputElement.value = value;
      }
    }
  }]);

  return Range;
}();

_tuiCodeSnippet2.default.CustomEvents.mixin(Range);

exports.default = Range;

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Promise = undefined;
exports.clamp = clamp;
exports.keyMirror = keyMirror;
exports.makeStyleText = makeStyleText;
exports.getProperties = getProperties;
exports.toInteger = toInteger;
exports.toCamelCase = toCamelCase;
exports.isSupportFileApi = isSupportFileApi;
exports.getRgb = getRgb;
exports.sendHostName = sendHostName;
exports.styleLoad = styleLoad;
exports.getSelector = getSelector;
exports.base64ToBlob = base64ToBlob;
exports.fixFloatingPoint = fixFloatingPoint;
exports.assignmentForDestroy = assignmentForDestroy;
exports.cls = cls;
exports.changeOrigin = changeOrigin;
exports.flipObject = flipObject;
exports.setCustomProperty = setCustomProperty;
exports.getCustomProperty = getCustomProperty;
exports.capitalizeString = capitalizeString;
exports.includes = includes;
exports.getFillTypeFromOption = getFillTypeFromOption;
exports.getFillTypeFromObject = getFillTypeFromObject;
exports.isShape = isShape;
exports.getObjectType = getObjectType;
exports.isSilentCommand = isSilentCommand;
exports.getHistoryTitle = getHistoryTitle;
exports.getHelpMenuBarPosition = getHelpMenuBarPosition;
exports.isEmptyCropzone = isEmptyCropzone;

var _tuiCodeSnippet = __webpack_require__(/*! tui-code-snippet */ "tui-code-snippet");

var _promise = __webpack_require__(/*! core-js-pure/features/promise */ "./node_modules/core-js-pure/features/promise/index.js");

var _promise2 = _interopRequireDefault(_promise);

var _consts = __webpack_require__(/*! @/consts */ "./src/js/consts.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FLOATING_POINT_DIGIT = 2; /**
                               * @author NHN. FE Development Team <dl_javascript@nhn.com>
                               * @fileoverview Util
                               */

var CSS_PREFIX = 'tui-image-editor-';
var min = Math.min,
    max = Math.max;

var hostnameSent = false;

/**
 * Export Promise Class (for simplified module path)
 * @returns {Promise} promise class
 */
exports.Promise = _promise2.default;

/**
 * Clamp value
 * @param {number} value - Value
 * @param {number} minValue - Minimum value
 * @param {number} maxValue - Maximum value
 * @returns {number} clamped value
 */

function clamp(value, minValue, maxValue) {
  if (minValue > maxValue) {
    var _ref = [maxValue, minValue];
    minValue = _ref[0];
    maxValue = _ref[1];
  }

  return max(minValue, min(value, maxValue));
}

/**
 * Make key-value object from arguments
 * @returns {object.<string, string>}
 */
function keyMirror() {
  var obj = {};

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  (0, _tuiCodeSnippet.forEach)(args, function (key) {
    obj[key] = key;
  });

  return obj;
}

/**
 * Make CSSText
 * @param {Object} styleObj - Style info object
 * @returns {string} Connected string of style
 */
function makeStyleText(styleObj) {
  var styleStr = '';

  (0, _tuiCodeSnippet.forEach)(styleObj, function (value, prop) {
    styleStr += prop + ': ' + value + ';';
  });

  return styleStr;
}

/**
 * Get object's properties
 * @param {Object} obj - object
 * @param {Array} keys - keys
 * @returns {Object} properties object
 */
function getProperties(obj, keys) {
  var props = {};
  var length = keys.length;

  var i = 0;
  var key = void 0;

  for (i = 0; i < length; i += 1) {
    key = keys[i];
    props[key] = obj[key];
  }

  return props;
}

/**
 * ParseInt simpliment
 * @param {number} value - Value
 * @returns {number}
 */
function toInteger(value) {
  return parseInt(value, 10);
}

/**
 * String to camelcase string
 * @param {string} targetString - change target
 * @returns {string}
 * @private
 */
function toCamelCase(targetString) {
  return targetString.replace(/-([a-z])/g, function ($0, $1) {
    return $1.toUpperCase();
  });
}

/**
 * Check browser file api support
 * @returns {boolean}
 * @private
 */
function isSupportFileApi() {
  return !!(window.File && window.FileList && window.FileReader);
}

/**
 * hex to rgb
 * @param {string} color - hex color
 * @param {string} alpha - color alpha value
 * @returns {string} rgb expression
 */
function getRgb(color, alpha) {
  if (color.length === 4) {
    color = '' + color + color.slice(1, 4);
  }
  var r = parseInt(color.slice(1, 3), 16);
  var g = parseInt(color.slice(3, 5), 16);
  var b = parseInt(color.slice(5, 7), 16);
  var a = alpha || 1;

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
}

/**
 * send hostname
 */
function sendHostName() {
  if (hostnameSent) {
    return;
  }
  hostnameSent = true;

  (0, _tuiCodeSnippet.sendHostname)('image-editor', 'UA-129999381-1');
}

/**
 * Apply css resource
 * @param {string} styleBuffer - serialized css text
 * @param {string} tagId - style tag id
 */
function styleLoad(styleBuffer, tagId) {
  var _document$getElements = document.getElementsByTagName('head'),
      head = _document$getElements[0];

  var linkElement = document.createElement('link');
  var styleData = encodeURIComponent(styleBuffer);
  if (tagId) {
    linkElement.id = tagId;
    // linkElement.id = 'tui-image-editor-theme-style';
  }
  linkElement.setAttribute('rel', 'stylesheet');
  linkElement.setAttribute('type', 'text/css');
  linkElement.setAttribute('href', 'data:text/css;charset=UTF-8,' + styleData);
  head.appendChild(linkElement);
}

/**
 * Get selector
 * @param {HTMLElement} targetElement - target element
 * @returns {Function} selector
 */
function getSelector(targetElement) {
  return function (str) {
    return targetElement.querySelector(str);
  };
}

/**
 * Change base64 to blob
 * @param {String} data - base64 string data
 * @returns {Blob} Blob Data
 */
function base64ToBlob(data) {
  var rImageType = /data:(image\/.+);base64,/;
  var mimeString = '';
  var raw = void 0,
      uInt8Array = void 0,
      i = void 0;

  raw = data.replace(rImageType, function (header, imageType) {
    mimeString = imageType;

    return '';
  });

  raw = atob(raw);
  var rawLength = raw.length;
  uInt8Array = new Uint8Array(rawLength); // eslint-disable-line

  for (i = 0; i < rawLength; i += 1) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: mimeString });
}

/**
 * Fix floating point diff.
 * @param {number} value - original value
 * @returns {number} fixed value
 */
function fixFloatingPoint(value) {
  return Number(value.toFixed(FLOATING_POINT_DIGIT));
}

/**
 * Assignment for destroying objects.
 * @param {Object} targetObject - object to be removed.
 */
function assignmentForDestroy(targetObject) {
  (0, _tuiCodeSnippet.forEach)(targetObject, function (value, key) {
    targetObject[key] = null;
  });
}

/**
 * Make class name for ui
 * @param {String} str  - main string of className
 * @param {String} prefix - prefix string of className
 * @returns {String} class name
 */
function cls() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (str.charAt(0) === '.') {
    return '.' + CSS_PREFIX + prefix + str.slice(1);
  }

  return '' + CSS_PREFIX + prefix + str;
}

/**
 * Change object origin
 * @param {fabric.Object} fObject - fabric object
 * @param {Object} origin - origin of fabric object
 *   @param {string} originX - horizontal basis.
 *   @param {string} originY - vertical basis.
 */
function changeOrigin(fObject, origin) {
  var originX = origin.originX,
      originY = origin.originY;

  var _fObject$getPointByOr = fObject.getPointByOrigin(originX, originY),
      left = _fObject$getPointByOr.x,
      top = _fObject$getPointByOr.y;

  fObject.set({
    left: left,
    top: top,
    originX: originX,
    originY: originY
  });

  fObject.setCoords();
}

/**
 * Object key value flip
 * @param {Object} targetObject - The data object of the key value.
 * @returns {Object}
 */
function flipObject(targetObject) {
  var result = {};

  Object.keys(targetObject).forEach(function (key) {
    result[targetObject[key]] = key;
  });

  return result;
}

/**
 * Set custom properties
 * @param {Object} targetObject - target object
 * @param {Object} props - custom props object
 */
function setCustomProperty(targetObject, props) {
  targetObject.customProps = targetObject.customProps || {};
  (0, _tuiCodeSnippet.extend)(targetObject.customProps, props);
}

/**
 * Get custom property
 * @param {fabric.Object} fObject - fabric object
 * @param {Array|string} propNames - prop name array
 * @returns {object | number | string}
 */
function getCustomProperty(fObject, propNames) {
  var resultObject = {};
  if ((0, _tuiCodeSnippet.isString)(propNames)) {
    propNames = [propNames];
  }
  (0, _tuiCodeSnippet.forEach)(propNames, function (propName) {
    resultObject[propName] = fObject.customProps[propName];
  });

  return resultObject;
}

/**
 * Capitalize string
 * @param {string} targetString - target string
 * @returns {string}
 */
function capitalizeString(targetString) {
  return targetString.charAt(0).toUpperCase() + targetString.slice(1);
}

/**
 * Array includes check
 * @param {Array} targetArray - target array
 * @param {string|number} compareValue - compare value
 * @returns {boolean}
 */
function includes(targetArray, compareValue) {
  return targetArray.indexOf(compareValue) >= 0;
}

/**
 * Get fill type
 * @param {Object | string} fillOption - shape fill option
 * @returns {string} 'color' or 'filter'
 */
function getFillTypeFromOption() {
  var fillOption = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return (0, _tuiCodeSnippet.pick)(fillOption, 'type') || _consts.SHAPE_FILL_TYPE.COLOR;
}

/**
 * Get fill type of shape type object
 * @param {fabric.Object} shapeObj - fabric object
 * @returns {string} 'transparent' or 'color' or 'filter'
 */
function getFillTypeFromObject(shapeObj) {
  var _shapeObj$fill = shapeObj.fill,
      fill = _shapeObj$fill === undefined ? {} : _shapeObj$fill;

  if (fill.source) {
    return _consts.SHAPE_FILL_TYPE.FILTER;
  }

  return _consts.SHAPE_FILL_TYPE.COLOR;
}

/**
 * Check if the object is a shape object.
 * @param {fabric.Object} obj - fabric object
 * @returns {boolean}
 */
function isShape(obj) {
  return (0, _tuiCodeSnippet.inArray)(obj.get('type'), _consts.SHAPE_TYPE) >= 0;
}

/**
 * Get object type
 * @param {string} type - fabric object type
 * @returns {string} type of object (ex: shape, icon, ...)
 */
function getObjectType(type) {
  if (includes(_consts.SHAPE_TYPE, type)) {
    return 'Shape';
  }

  switch (type) {
    case 'i-text':
      return 'Text';
    case 'path':
    case 'line':
      return 'Draw';
    case 'activeSelection':
      return 'Group';
    default:
      return toStartOfCapital(type);
  }
}

/**
 * Get filter type
 * @param {string} type - fabric filter type
 * @param {object} [options] - filter type options
 *   @param {boolean} [options.useAlpha=true] - usage of alpha(true is 'color filter', false is 'remove white')
 *   @param {string} [options.mode] - mode of blendColor
 * @returns {string} type of filter (ex: sepia, blur, ...)
 */
function getFilterType(type) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$useAlpha = _ref2.useAlpha,
      useAlpha = _ref2$useAlpha === undefined ? true : _ref2$useAlpha,
      mode = _ref2.mode;

  var VINTAGE = _consts.filterType.VINTAGE,
      REMOVE_COLOR = _consts.filterType.REMOVE_COLOR,
      BLEND_COLOR = _consts.filterType.BLEND_COLOR,
      SEPIA2 = _consts.filterType.SEPIA2,
      COLOR_FILTER = _consts.filterType.COLOR_FILTER,
      REMOVE_WHITE = _consts.filterType.REMOVE_WHITE,
      BLEND = _consts.filterType.BLEND;


  var filterName = void 0;

  switch (type) {
    case VINTAGE:
      filterName = SEPIA2;
      break;
    case REMOVE_COLOR:
      filterName = useAlpha ? COLOR_FILTER : REMOVE_WHITE;
      break;
    case BLEND_COLOR:
      filterName = mode === 'add' ? BLEND : mode;
      break;
    default:
      filterName = type;
  }

  return toStartOfCapital(filterName);
}

/**
 * Check if command is silent command
 * @param {Command|string} command - command or command name
 * @returns {boolean}
 */
function isSilentCommand(command) {
  var LOAD_IMAGE = _consts.commandNames.LOAD_IMAGE;


  return typeof command === 'string' ? LOAD_IMAGE === command : LOAD_IMAGE === command.name;
}

/**
 * Get command name
 * @param {Command|string} command - command or command name
 * @returns {{name: string, ?detail: string}}
 */
// eslint-disable-next-line complexity, require-jsdoc
function getHistoryTitle(command) {
  var FLIP_IMAGE = _consts.commandNames.FLIP_IMAGE,
      ROTATE_IMAGE = _consts.commandNames.ROTATE_IMAGE,
      ADD_TEXT = _consts.commandNames.ADD_TEXT,
      APPLY_FILTER = _consts.commandNames.APPLY_FILTER,
      REMOVE_FILTER = _consts.commandNames.REMOVE_FILTER,
      CHANGE_SHAPE = _consts.commandNames.CHANGE_SHAPE,
      CHANGE_ICON_COLOR = _consts.commandNames.CHANGE_ICON_COLOR,
      CHANGE_TEXT_STYLE = _consts.commandNames.CHANGE_TEXT_STYLE,
      CLEAR_OBJECTS = _consts.commandNames.CLEAR_OBJECTS,
      ADD_IMAGE_OBJECT = _consts.commandNames.ADD_IMAGE_OBJECT,
      REMOVE_OBJECT = _consts.commandNames.REMOVE_OBJECT,
      RESIZE_IMAGE = _consts.commandNames.RESIZE_IMAGE;
  var name = command.name,
      args = command.args;

  var historyInfo = void 0;

  switch (name) {
    case FLIP_IMAGE:
      historyInfo = { name: name, detail: args[1] === 'reset' ? args[1] : args[1].slice(4) };
      break;
    case ROTATE_IMAGE:
      historyInfo = { name: name, detail: args[2] };
      break;
    case APPLY_FILTER:
      historyInfo = { name: _consts.historyNames.APPLY_FILTER, detail: getFilterType(args[1], args[2]) };
      break;
    case REMOVE_FILTER:
      historyInfo = { name: _consts.historyNames.REMOVE_FILTER, detail: 'Remove' };
      break;
    case CHANGE_SHAPE:
      historyInfo = { name: _consts.historyNames.CHANGE_SHAPE, detail: 'Change' };
      break;
    case CHANGE_ICON_COLOR:
      historyInfo = { name: _consts.historyNames.CHANGE_ICON_COLOR, detail: 'Change' };
      break;
    case CHANGE_TEXT_STYLE:
      historyInfo = { name: _consts.historyNames.CHANGE_TEXT_STYLE, detail: 'Change' };
      break;
    case REMOVE_OBJECT:
      historyInfo = { name: _consts.historyNames.REMOVE_OBJECT, detail: args[2] };
      break;
    case CLEAR_OBJECTS:
      historyInfo = { name: _consts.historyNames.CLEAR_OBJECTS, detail: 'All' };
      break;
    case ADD_IMAGE_OBJECT:
      historyInfo = { name: _consts.historyNames.ADD_IMAGE_OBJECT, detail: 'Add' };
      break;
    case ADD_TEXT:
      historyInfo = { name: _consts.historyNames.ADD_TEXT };
      break;
    case RESIZE_IMAGE:
      historyInfo = { name: _consts.historyNames.RESIZE, detail: ~~args[1].width + 'x' + ~~args[1].height };
      break;

    default:
      historyInfo = { name: name };
      break;
  }

  if (args[1] === 'mask') {
    historyInfo = { name: _consts.historyNames.LOAD_MASK_IMAGE, detail: 'Apply' };
  }

  return historyInfo;
}

/**
 * Get help menubar position(opposite of menubar)
 * @param {string} position - position of menubar
 * @returns {string} position of help menubar
 */
function getHelpMenuBarPosition(position) {
  if (position === 'top') {
    return 'bottom';
  }
  if (position === 'left') {
    return 'right';
  }
  if (position === 'right') {
    return 'left';
  }

  return 'top';
}

/**
 * Change to capital start letter
 * @param {string} str - string to change
 * @returns {string}
 */
function toStartOfCapital(str) {
  return str.replace(/[a-z]/, function (first) {
    return first.toUpperCase();
  });
}

/**
 * Check if cropRect is Empty.
 * @param {Object} cropRect - cropRect object
 *  @param {Number} cropRect.left - cropRect left position value
 *  @param {Number} cropRect.top - cropRect top position value
 *  @param {Number} cropRect.width - cropRect width value
 *  @param {Number} cropRect.height - cropRect height value
 * @returns {boolean}
 */
function isEmptyCropzone(cropRect) {
  var left = cropRect.left,
      top = cropRect.top,
      width = cropRect.width,
      height = cropRect.height;
  var LEFT = _consts.emptyCropRectValues.LEFT,
      TOP = _consts.emptyCropRectValues.TOP,
      WIDTH = _consts.emptyCropRectValues.WIDTH,
      HEIGHT = _consts.emptyCropRectValues.HEIGHT;


  return left === LEFT && top === TOP && width === WIDTH && height === HEIGHT;
}

/***/ }),

/***/ "./src/svg/default.svg":
/*!*****************************!*\
  !*** ./src/svg/default.svg ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg display=\"none\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><defs id=\"tui-image-editor-svg-default-icons\"><symbol id=\"ic-apply\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" stroke=\"none\" fill=\"none\"></path><path fill=\"none\" stroke=\"inherit\" d=\"M4 12.011l5 5L20.011 6\"></path></symbol><symbol id=\"ic-cancel\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" fill=\"none\" stroke=\"none\"></path><path fill=\"none\" stroke=\"inherit\" d=\"M6 6l12 12M18 6L6 18\"></path></symbol><symbol id=\"ic-crop\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" stroke=\"none\" fill=\"none\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M4 0h1v20a1 1 0 0 1-1-1V0zM20 17h-1V5h1v12zm0 2v5h-1v-5h1z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M5 19h19v1H5zM4.762 4v1H0V4h4.762zM7 4h12a1 1 0 0 1 1 1H7V4z\"></path></symbol><symbol id=\"ic-resize\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" stroke=\"none\" fill=\"none\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M 18.988281 3.011719 C 18.800781 2.824219 18.5 2.824219 18.3125 3.011719 L 11.621094 9.707031 C 11.429688 9.894531 11.429688 10.195312 11.621094 10.378906 C 11.710938 10.472656 11.835938 10.519531 11.957031 10.519531 C 12.078125 10.519531 12.203125 10.472656 12.292969 10.378906 L 18.988281 3.6875 C 19.175781 3.5 19.175781 3.199219 18.988281 3.011719 Z M 18.988281 3.011719 \"></path><path stroke=\"none\" fill=\"inherit\" d=\"M 18.652344 2.867188 C 18.386719 2.867188 18.171875 3.082031 18.171875 3.347656 L 18.171875 9.085938 C 18.171875 9.347656 18.386719 9.5625 18.652344 9.5625 C 18.917969 9.5625 19.132812 9.347656 19.132812 9.085938 L 19.132812 3.347656 C 19.132812 3.082031 18.917969 2.867188 18.652344 2.867188 Z M 18.652344 2.867188 \"></path><path stroke=\"none\" fill=\"inherit\" d=\"M 18.652344 2.867188 L 12.914062 2.867188 C 12.652344 2.867188 12.4375 3.082031 12.4375 3.347656 C 12.4375 3.613281 12.652344 3.828125 12.914062 3.828125 L 18.652344 3.828125 C 18.917969 3.828125 19.132812 3.613281 19.132812 3.347656 C 19.132812 3.082031 18.917969 2.867188 18.652344 2.867188 Z M 18.652344 2.867188 \"></path><path stroke=\"none\" fill=\"inherit\" d=\"M 10.378906 11.621094 C 10.195312 11.433594 9.890625 11.433594 9.703125 11.621094 L 3.007812 18.316406 C 2.820312 18.5 2.820312 18.804688 3.007812 18.992188 C 3.105469 19.085938 3.226562 19.132812 3.347656 19.132812 C 3.46875 19.132812 3.589844 19.085938 3.683594 18.992188 L 10.378906 12.296875 C 10.566406 12.109375 10.566406 11.804688 10.378906 11.621094 Z M 10.378906 11.621094 \"></path><path stroke=\"none\" fill=\"inherit\" d=\"M 3.347656 12.4375 C 3.082031 12.4375 2.867188 12.652344 2.867188 12.914062 L 2.867188 18.652344 C 2.867188 18.917969 3.082031 19.132812 3.347656 19.132812 C 3.613281 19.132812 3.828125 18.917969 3.828125 18.652344 L 3.828125 12.914062 C 3.828125 12.652344 3.613281 12.4375 3.347656 12.4375 Z M 3.347656 12.4375 \"></path><path stroke=\"none\" fill=\"inherit\" d=\"M 9.085938 18.171875 L 3.347656 18.171875 C 3.082031 18.171875 2.867188 18.386719 2.867188 18.652344 C 2.867188 18.917969 3.082031 19.132812 3.347656 19.132812 L 9.085938 19.132812 C 9.347656 19.132812 9.5625 18.917969 9.5625 18.652344 C 9.5625 18.386719 9.347656 18.171875 9.085938 18.171875 Z M 9.085938 18.171875 \"></path><path stroke=\"none\" fill=\"inherit\" d=\"M 20.5625 0 L 1.4375 0 C 0.644531 0 0 0.644531 0 1.4375 L 0 20.5625 C 0 21.355469 0.644531 22 1.4375 22 L 20.5625 22 C 21.355469 22 22 21.355469 22 20.5625 L 22 1.4375 C 22 0.644531 21.355469 0 20.5625 0 Z M 21.042969 20.5625 C 21.042969 20.828125 20.828125 21.042969 20.5625 21.042969 L 1.4375 21.042969 C 1.171875 21.042969 0.957031 20.828125 0.957031 20.5625 L 0.957031 1.4375 C 0.957031 1.171875 1.171875 0.957031 1.4375 0.957031 L 20.5625 0.957031 C 20.828125 0.957031 21.042969 1.171875 21.042969 1.4375 Z M 21.042969 20.5625 \"></path></symbol><symbol id=\"ic-delete-all\" viewBox=\"0 0 24 24\"><path stroke=\"none\" fill=\"inherit\" d=\"M5 23H3a1 1 0 0 1-1-1V6h1v16h2v1zm16-10h-1V6h1v7zM9 13H8v-3h1v3zm3 0h-1v-3h1v3zm3 0h-1v-3h1v3zM14.794 3.794L13 2h-3L8.206 3.794A.963.963 0 0 1 8 2.5l.703-1.055A1 1 0 0 1 9.535 1h3.93a1 1 0 0 1 .832.445L15 2.5a.965.965 0 0 1-.206 1.294zM14.197 4H8.803h5.394z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M0 3h23v1H0zM11.286 21H8.714L8 23H7l1-2.8V20h.071L9.5 16h1l1.429 4H12v.2l1 2.8h-1l-.714-2zm-.357-1L10 17.4 9.071 20h1.858zM20 22h3v1h-4v-7h1v6zm-5 0h3v1h-4v-7h1v6z\"></path></symbol><symbol id=\"ic-delete\" viewBox=\"0 0 24 24\"><path stroke=\"none\" fill=\"inherit\" d=\"M3 6v16h17V6h1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6h1zM14.794 3.794L13 2h-3L8.206 3.794A.963.963 0 0 1 8 2.5l.703-1.055A1 1 0 0 1 9.535 1h3.93a1 1 0 0 1 .832.445L15 2.5a.965.965 0 0 1-.206 1.294zM14.197 4H8.803h5.394z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M0 3h23v1H0zM8 10h1v6H8v-6zm3 0h1v6h-1v-6zm3 0h1v6h-1v-6z\"></path></symbol><symbol id=\"ic-draw-free\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke=\"inherit\" d=\"M2.5 20.929C2.594 10.976 4.323 6 7.686 6c5.872 0 2.524 19 7.697 19s1.89-14.929 6.414-14.929 1.357 10.858 5.13 10.858c1.802 0 2.657-2.262 2.566-6.786\"></path></symbol><symbol id=\"ic-draw-line\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke=\"inherit\" d=\"M2 15.5h28\"></path></symbol><symbol id=\"ic-draw\" viewBox=\"0 0 24 24\"><path fill=\"none\" stroke=\"inherit\" d=\"M2.5 21.5H5c.245 0 .48-.058.691-.168l.124-.065.14.01c.429.028.85-.127 1.16-.437L22.55 5.405a.5.5 0 0 0 0-.707l-3.246-3.245a.5.5 0 0 0-.707 0L3.162 16.888a1.495 1.495 0 0 0-.437 1.155l.01.14-.065.123c-.111.212-.17.448-.17.694v2.5z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M16.414 3.707l3.89 3.89-.708.706-3.889-3.889z\"></path></symbol><symbol id=\"ic-filter\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" fill=\"none\" stroke=\"none\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M12 7v1H2V7h10zm6 0h4v1h-4V7zM12 16v1h10v-1H12zm-6 0H2v1h4v-1z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M8.5 20a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM15.5 11a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm0-1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z\"></path></symbol><symbol id=\"ic-flip-reset\" viewBox=\"0 0 31 32\"><path fill=\"none\" stroke=\"none\" d=\"M31 0H0v32h31z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M28 16a8 8 0 0 1-8 8H3v-1h1v-7H3a8 8 0 0 1 8-8h17v1h-1v7h1zM11 9a7 7 0 0 0-7 7v7h16a7 7 0 0 0 7-7V9H11z\"></path><path fill=\"none\" stroke=\"inherit\" stroke-linecap=\"square\" d=\"M24 5l3.5 3.5L24 12M7 20l-3.5 3.5L7 27\"></path></symbol><symbol id=\"ic-flip-x\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke=\"none\" d=\"M32 32H0V0h32z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M17 32h-1V0h1zM27.167 11l.5 3h-1.03l-.546-3h1.076zm-.5-3h-1.122L25 5h-5V4h5.153a1 1 0 0 1 .986.836L26.667 8zm1.5 9l.5 3h-.94l-.545-3h.985zm1 6l.639 3.836A1 1 0 0 1 28.819 28H26v-1h3l-.726-4h.894zM23 28h-3v-1h3v1zM13 4v1H7L3 27h10v1H3.18a1 1 0 0 1-.986-1.164l3.666-22A1 1 0 0 1 6.847 4H13z\"></path></symbol><symbol id=\"ic-flip-y\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke=\"none\" d=\"M0 0v32h32V0z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M0 16v1h32v-1zM11 27.167l3 .5v-1.03l-3-.546v1.076zm-3-.5v-1.122L5 25v-5H4v5.153a1 1 0 0 0 .836.986L8 26.667zm9 1.5l3 .5v-.94l-3-.545v.985zm6 1l3.836.639A1 1 0 0 0 28 28.82V26h-1v3l-4-.727v.894zM28 23v-3h-1v3h1zM4 13h1V7l22-4v10h1V3.18a1 1 0 0 0-1.164-.986l-22 3.667A1 1 0 0 0 4 6.847V13z\"></path></symbol><symbol id=\"ic-flip\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" fill=\"none\" stroke=\"none\"></path><path fill=\"inherit\" stroke=\"none\" d=\"M11 0h1v24h-1zM19 21v-1h2v-2h1v2a1 1 0 0 1-1 1h-2zm-2 0h-3v-1h3v1zm5-5h-1v-3h1v3zm0-5h-1V8h1v3zm0-5h-1V4h-2V3h2a1 1 0 0 1 1 1v2zm-5-3v1h-3V3h3zM9 3v1H2v16h7v1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7z\"></path></symbol><symbol id=\"ic-history\" viewBox=\"0 0 24 24\"><path fill=\"none\" stroke=\"none\" d=\"M0 0H24V24H0z\" transform=\"translate(-740 -16) translate(547 8) translate(193 8)\"></path><path fill=\"inherit\" stroke=\"none\" d=\"M12.5 1C18.299 1 23 5.701 23 11.5S18.299 22 12.5 22c-5.29 0-9.665-3.911-10.394-8.999h1.012C3.838 17.534 7.764 21 12.5 21c5.247 0 9.5-4.253 9.5-9.5S17.747 2 12.5 2C8.49 2 5.06 4.485 3.666 8H3h4v1H2V4h1v3.022C4.68 3.462 8.303 1 12.5 1zm.5 5l-.001 5.291 2.537 2.537-.708.708L12.292 12H12V6h1z\" transform=\"translate(-740 -16) translate(547 8) translate(193 8)\"></path></symbol><symbol id=\"ic-history-check\" viewBox=\"0 0 24 24\"><g fill=\"none\" fill-rule=\"evenodd\"><path stroke=\"#555555\" d=\"M4.5 -1L1.5 2 6.5 7\" transform=\"translate(-60 -804) translate(60 804) translate(2 3) rotate(-90 4 3)\"></path></g></symbol><symbol id=\"ic-history-crop\" viewBox=\"0 0 24 24\"><g fill=\"none\" stroke=\"none\" fill-rule=\"evenodd\"><path d=\"M0 0H12V12H0z\" transform=\"translate(-84 -804) translate(84 804)\"></path><path fill=\"#434343\" d=\"M2 0h1v10c-.552 0-1-.448-1-1V0zM10 9v3H9V9h1zM9 2h1v6H9V2z\" transform=\"translate(-84 -804) translate(84 804)\"></path><path fill=\"#434343\" d=\"M2 9H12V10H2zM9 2c.513 0 .936.386.993.883L10 3H3V2h6zM2 3H0V2h2v1z\" transform=\"translate(-84 -804) translate(84 804)\"></path></g></symbol><symbol id=\"ic-history-resize\" viewBox=\"0 0 24 24\"><g fill=\"none\" stroke=\"none\" fill-rule=\"evenodd\"><path fill=\"#434343\" d=\"M 9.492188 1.507812 C 9.398438 1.414062 9.25 1.414062 9.15625 1.507812 L 5.8125 4.851562 C 5.714844 4.945312 5.714844 5.097656 5.8125 5.1875 C 5.855469 5.234375 5.917969 5.257812 5.976562 5.257812 C 6.039062 5.257812 6.101562 5.234375 6.148438 5.1875 L 9.492188 1.84375 C 9.585938 1.75 9.585938 1.601562 9.492188 1.507812 Z M 9.492188 1.507812 \"></path><path fill=\"#434343\" d=\"M 9.328125 1.433594 C 9.195312 1.433594 9.085938 1.539062 9.085938 1.671875 L 9.085938 4.542969 C 9.085938 4.671875 9.195312 4.78125 9.328125 4.78125 C 9.460938 4.78125 9.566406 4.671875 9.566406 4.542969 L 9.566406 1.671875 C 9.566406 1.539062 9.460938 1.433594 9.328125 1.433594 Z M 9.328125 1.433594 \"></path><path fill=\"#434343\" d=\"M 9.328125 1.433594 L 6.457031 1.433594 C 6.328125 1.433594 6.21875 1.539062 6.21875 1.671875 C 6.21875 1.804688 6.328125 1.914062 6.457031 1.914062 L 9.328125 1.914062 C 9.460938 1.914062 9.566406 1.804688 9.566406 1.671875 C 9.566406 1.539062 9.460938 1.433594 9.328125 1.433594 Z M 9.328125 1.433594 \"></path><path fill=\"#434343\" d=\"M 5.1875 5.8125 C 5.097656 5.71875 4.945312 5.71875 4.851562 5.8125 L 1.503906 9.15625 C 1.410156 9.25 1.410156 9.402344 1.503906 9.496094 C 1.554688 9.542969 1.613281 9.566406 1.671875 9.566406 C 1.734375 9.566406 1.796875 9.542969 1.84375 9.496094 L 5.1875 6.148438 C 5.28125 6.054688 5.28125 5.902344 5.1875 5.8125 Z M 5.1875 5.8125 \"></path><path fill=\"#434343\" d=\"M 1.671875 6.21875 C 1.539062 6.21875 1.433594 6.328125 1.433594 6.457031 L 1.433594 9.328125 C 1.433594 9.460938 1.539062 9.566406 1.671875 9.566406 C 1.804688 9.566406 1.914062 9.460938 1.914062 9.328125 L 1.914062 6.457031 C 1.914062 6.328125 1.804688 6.21875 1.671875 6.21875 Z M 1.671875 6.21875 \"></path><path fill=\"#434343\" d=\"M 4.542969 9.085938 L 1.671875 9.085938 C 1.539062 9.085938 1.433594 9.195312 1.433594 9.328125 C 1.433594 9.460938 1.539062 9.566406 1.671875 9.566406 L 4.542969 9.566406 C 4.671875 9.566406 4.78125 9.460938 4.78125 9.328125 C 4.78125 9.195312 4.671875 9.085938 4.542969 9.085938 Z M 4.542969 9.085938 \"></path><path fill=\"#434343\" d=\"M 10.28125 0 L 0.71875 0 C 0.320312 0 0 0.320312 0 0.71875 L 0 10.28125 C 0 10.679688 0.320312 11 0.71875 11 L 10.28125 11 C 10.679688 11 11 10.679688 11 10.28125 L 11 0.71875 C 11 0.320312 10.679688 0 10.28125 0 Z M 10.523438 10.28125 C 10.523438 10.414062 10.414062 10.523438 10.28125 10.523438 L 0.71875 10.523438 C 0.585938 10.523438 0.476562 10.414062 0.476562 10.28125 L 0.476562 0.71875 C 0.476562 0.585938 0.585938 0.476562 0.71875 0.476562 L 10.28125 0.476562 C 10.414062 0.476562 10.523438 0.585938 10.523438 0.71875 Z M 10.523438 10.28125 \"></path></g></symbol><symbol id=\"ic-history-draw\" viewBox=\"0 0 24 24\"><g fill=\"none\" stroke=\"none\" fill-rule=\"evenodd\"><path d=\"M0 1H12V13H0z\" transform=\"translate(-156 -804) translate(156 803)\"></path><path stroke=\"#434343\" d=\"M9.622 1.584l1.835 1.658-8.31 8.407L.5 12.5V11l9.122-9.416z\" transform=\"translate(-156 -804) translate(156 803)\"></path><path fill=\"#434343\" d=\"M7.628 3.753L10.378 3.753 10.378 4.253 7.628 4.253z\" transform=\"translate(-156 -804) translate(156 803) rotate(45 9.003 4.003)\"></path></g></symbol><symbol id=\"ic-history-filter\" viewBox=\"0 0 24 24\"><g fill=\"none\" stroke=\"none\" fill-rule=\"evenodd\"><path d=\"M0 0H12V12H0z\" transform=\"translate(-276 -804) translate(276 804)\"></path><path fill=\"#434343\" d=\"M12 3v1H9V3h3zM7 4H0V3h7v1z\" transform=\"translate(-276 -804) translate(276 804)\"></path><path fill=\"#434343\" d=\"M12 8v1H9V8h3zM7 9H0V8h7v1z\" transform=\"translate(-276 -804) translate(276 804) matrix(-1 0 0 1 12 0)\"></path><path fill=\"#434343\" d=\"M8 1c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm0 1c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1zM4 7c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm0 1c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z\" transform=\"translate(-276 -804) translate(276 804)\"></path></g></symbol><symbol id=\"ic-history-flip\" viewBox=\"0 0 24 24\"><g fill=\"none\" stroke=\"none\" fill-rule=\"evenodd\"><path d=\"M0 0H12V12H0z\" transform=\"translate(-108 -804) translate(108 804)\"></path><path fill=\"#434343\" d=\"M6 0L7 0 7 12 6 12zM11 10V9h1v1.5c0 .276-.224.5-.5.5H10v-1h1zM5 1v1H1v8h4v1H.5c-.276 0-.5-.224-.5-.5v-9c0-.276.224-.5.5-.5H5zm7 5v2h-1V6h1zm0-3v2h-1V3h1zM9 1v1H7V1h2zm2.5 0c.276 0 .5.224.5.5V2h-2V1h1.5zM9 11H7v-1h2v1z\" transform=\"translate(-108 -804) translate(108 804)\"></path></g></symbol><symbol id=\"ic-history-icon\" viewBox=\"0 0 24 24\"><g fill=\"none\" stroke=\"none\" fill-rule=\"evenodd\"><path d=\"M0 0H12V12H0z\" transform=\"translate(-204 -804) translate(204 804)\"></path><path stroke=\"#434343\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.1\" d=\"M6 9.568L2.601 11 2.975 7.467 0.5 4.82 4.13 4.068 6 1 7.87 4.068 11.5 4.82 9.025 7.467 9.399 11z\" transform=\"translate(-204 -804) translate(204 804)\"></path></g></symbol><symbol id=\"ic-history-mask\" viewBox=\"0 0 24 24\"><g fill=\"none\" stroke=\"none\" fill-rule=\"evenodd\"><g transform=\"translate(-252 -804) translate(252 804)\"><path d=\"M0 0H12V12H0z\"></path><circle cx=\"6\" cy=\"6\" r=\"2.5\" stroke=\"#444\"></circle><path fill=\"#434343\" d=\"M11.5 0c.276 0 .5.224.5.5v11c0 .276-.224.5-.5.5H.5c-.276 0-.5-.224-.5-.5V.5C0 .224.224 0 .5 0h11zM11 1H1v10h10V1z\"></path></g></g></symbol><symbol id=\"ic-history-rotate\" viewBox=\"0 0 24 24\"><defs><path id=\"rfn4rylffa\" d=\"M7 12c-.335 0-.663-.025-.983-.074C3.171 11.492 1 9.205 1 6.444c0-1.363.534-2.613 1.415-3.58\"></path><mask id=\"6f9gn2dysb\" width=\"6\" height=\"9.136\" x=\"0\" y=\"0\" maskUnits=\"objectBoundingBox\"><use xlink:href=\"#rfn4rylffa\" stroke=\"434343\"></use></mask></defs><g fill=\"none\" stroke=\"none\" fill-rule=\"evenodd\"><g transform=\"translate(-132 -804) translate(132 804)\"><path d=\"M0 0.5H12V12.5H0z\"></path><path fill=\"#434343\" d=\"M6.5 1C9.538 1 12 3.462 12 6.5c0 2.37-1.5 4.39-3.6 5.163l-.407-.916C9.744 10.13 11 8.462 11 6.5 11 4.015 8.985 2 6.5 2c-.777 0-1.509.197-2.147.544L4 1.75l-.205-.04C4.594 1.258 5.517 1 6.5 1z\"></path><use stroke=\"#434343\" stroke-dasharray=\"2 1.25\" stroke-width=\"1\" mask=\"url(#6f9gn2dysb)\" xlink:href=\"#rfn4rylffa\"></use><path fill=\"#434343\" d=\"M4.279 0L6 1.75 4.25 3.571 3.543 2.864 4.586 1.75 3.572 0.707z\" transform=\"matrix(-1 0 0 1 9.543 0)\"></path></g></g></symbol><symbol id=\"ic-history-shape\" viewBox=\"0 0 24 24\"><g fill=\"none\" stroke=\"none\" fill-rule=\"evenodd\"><path d=\"M0 0H12V12H0z\" transform=\"translate(-180 -804) translate(180 804)\"></path><path fill=\"#434343\" d=\"M11.5 4c.276 0 .5.224.5.5v7c0 .276-.224.5-.5.5h-7c-.276 0-.5-.224-.5-.5V8.8h1V11h6V5H8.341l-.568-1H11.5z\" transform=\"translate(-180 -804) translate(180 804)\"></path><path stroke=\"#434343\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4.5 0.5L8.5 7.611 0.5 7.611z\" transform=\"translate(-180 -804) translate(180 804)\"></path></g></symbol><symbol id=\"ic-history-text\" viewBox=\"0 0 24 24\"><g fill=\"none\" stroke=\"none\" fill-rule=\"evenodd\"><path d=\"M0 0H12V12H0z\" transform=\"translate(-228 -804) translate(228 804)\"></path><path fill=\"#434343\" d=\"M2 1h8c.552 0 1 .448 1 1H1c0-.552.448-1 1-1z\" transform=\"translate(-228 -804) translate(228 804)\"></path><path fill=\"#434343\" d=\"M1 1H2V3H1zM10 1H11V3H10zM5.5 1L6.5 1 6.5 11 5.5 11z\" transform=\"translate(-228 -804) translate(228 804)\"></path><path fill=\"#434343\" d=\"M4 10H8V11H4z\" transform=\"translate(-228 -804) translate(228 804)\"></path></g></symbol><symbol id=\"ic-history-load\" viewBox=\"0 0 24 24\"><g fill=\"none\" stroke=\"none\" fill-rule=\"evenodd\"><path d=\"M0 0H12V12H0z\" transform=\"translate(-324 -805) translate(324 805)\"></path><path fill=\"#434343\" d=\"M5 0c.552 0 1 .448 1 1v1h5.5c.276 0 .5.224.5.5v8c0 .276-.224.5-.5.5H.5c-.276 0-.5-.224-.5-.5V1c0-.552.448-1 1-1h4zm0 1H1v9h10V3H5V1z\" transform=\"translate(-324 -805) translate(324 805)\"></path><path fill=\"#434343\" d=\"M1 2L5 2 5 3 1 3z\" transform=\"translate(-324 -805) translate(324 805)\"></path></g></symbol><symbol id=\"ic-history-delete\" viewBox=\"0 0 24 24\"><g fill=\"none\" stroke=\"none\" fill-rule=\"evenodd\"><g fill=\"#434343\"><path d=\"M2 9h8V1h1v8.5c0 .276-.224.5-.5.5h-9c-.276 0-.5-.224-.5-.5V1h1v8zM0 0H12V1H0z\" transform=\"translate(-300 -804) translate(300 804) translate(0 2)\"></path><path d=\"M4 3H5V7H4zM7 3H8V7H7z\" transform=\"translate(-300 -804) translate(300 804) translate(0 2)\"></path><path d=\"M4 1h4V0h1v1.5c0 .276-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5V0h1v1z\" transform=\"translate(-300 -804) translate(300 804) matrix(1 0 0 -1 0 2)\"></path></g></g></symbol><symbol id=\"ic-history-group\" viewBox=\"0 0 24 24\"><g fill=\"none\" stroke=\"none\" fill-rule=\"evenodd\"><g transform=\"translate(-348 -804) translate(348 804)\"><path d=\"M0 0H12V12H0z\"></path><path fill=\"#434343\" d=\"M1 9v2h1v1H.5c-.276 0-.5-.224-.5-.5V9h1zm11 1v1.5c0 .276-.224.5-.5.5H9v-1h2v-1h1zm-4 1v1H6v-1h2zm-3 0v1H3v-1h2zm7-4v2h-1V7h1zM1 6v2H0V6h1zm11-2v2h-1V4h1zM1 3v2H0V3h1zm10.5-3c.276 0 .5.224.5.5V3h-1V1h-1V0h1.5zM6 0v1H4V0h2zm3 0v1H7V0h2zM0 .5C0 .224.224 0 .5 0H3v1H1v1H0V.5zM9.5 4c.276 0 .5.224.5.5v5c0 .276-.224.5-.5.5h-5c-.276 0-.5-.224-.5-.5V8.355c.317.094.652.145 1 .145V9h4V5h-.5c0-.348-.05-.683-.145-1H9.5z\"></path><circle cx=\"5\" cy=\"5\" r=\"2.5\" stroke=\"#434343\"></circle></g></g></symbol><symbol id=\"ic-icon-arrow-2\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke=\"inherit\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M21.793 18.5H2.5v-5h18.935l-7.6-8h5.872l10.5 10.5-10.5 10.5h-5.914l8-8z\"></path></symbol><symbol id=\"ic-icon-arrow-3\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke=\"inherit\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M25.288 16.42L14.208 27.5H6.792l11.291-11.291L6.826 4.5h7.381l11.661 11.661-.58.258z\"></path></symbol><symbol id=\"ic-icon-arrow\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke=\"inherit\" d=\"M2.5 11.5v9h18v5.293L30.293 16 20.5 6.207V11.5h-18z\"></path></symbol><symbol id=\"ic-icon-bubble\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke=\"inherit\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M22.207 24.5L16.5 30.207V24.5H8A6.5 6.5 0 0 1 1.5 18V9A6.5 6.5 0 0 1 8 2.5h16A6.5 6.5 0 0 1 30.5 9v9a6.5 6.5 0 0 1-6.5 6.5h-1.793z\"></path></symbol><symbol id=\"ic-icon-heart\" viewBox=\"0 0 32 32\"><path fill-rule=\"nonzero\" fill=\"none\" stroke=\"inherit\" d=\"M15.996 30.675l1.981-1.79c7.898-7.177 10.365-9.718 12.135-13.012.922-1.716 1.377-3.37 1.377-5.076 0-4.65-3.647-8.297-8.297-8.297-2.33 0-4.86 1.527-6.817 3.824l-.38.447-.381-.447C13.658 4.027 11.126 2.5 8.797 2.5 4.147 2.5.5 6.147.5 10.797c0 1.714.46 3.375 1.389 5.098 1.775 3.288 4.26 5.843 12.123 12.974l1.984 1.806z\"></path></symbol><symbol id=\"ic-icon-load\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke=\"inherit\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M17.314 18.867l1.951-2.53 4 5.184h-17l6.5-8.84 4.549 6.186z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M18.01 4a11.798 11.798 0 0 0 0 1H3v24h24V14.986a8.738 8.738 0 0 0 1 0V29a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h15.01z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M25 3h1v9h-1z\"></path><path fill=\"none\" stroke=\"inherit\" d=\"M22 6l3.5-3.5L29 6\"></path></symbol><symbol id=\"ic-icon-location\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke=\"inherit\" d=\"M16 31.28C23.675 23.302 27.5 17.181 27.5 13c0-6.351-5.149-11.5-11.5-11.5S4.5 6.649 4.5 13c0 4.181 3.825 10.302 11.5 18.28z\"></path><circle fill=\"none\" stroke=\"inherit\" cx=\"16\" cy=\"13\" r=\"4.5\"></circle></symbol><symbol id=\"ic-icon-polygon\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke=\"inherit\" d=\"M.576 16L8.29 29.5h15.42L31.424 16 23.71 2.5H8.29L.576 16z\"></path></symbol><symbol id=\"ic-icon-star-2\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke=\"inherit\" d=\"M19.446 31.592l2.265-3.272 3.946.25.636-3.94 3.665-1.505-1.12-3.832 2.655-2.962-2.656-2.962 1.12-3.832-3.664-1.505-.636-3.941-3.946.25-2.265-3.271L16 3.024 12.554 1.07 10.289 4.34l-3.946-.25-.636 3.941-3.665 1.505 1.12 3.832L.508 16.33l2.656 2.962-1.12 3.832 3.664 1.504.636 3.942 3.946-.25 2.265 3.27L16 29.638l3.446 1.955z\"></path></symbol><symbol id=\"ic-icon-star\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke=\"inherit\" d=\"M25.292 29.878l-1.775-10.346 7.517-7.327-10.388-1.51L16 1.282l-4.646 9.413-10.388 1.51 7.517 7.327-1.775 10.346L16 24.993l9.292 4.885z\"></path></symbol><symbol id=\"ic-icon\" viewBox=\"0 0 24 24\"><path fill=\"none\" stroke=\"inherit\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M11.923 19.136L5.424 22l.715-7.065-4.731-5.296 6.94-1.503L11.923 2l3.574 6.136 6.94 1.503-4.731 5.296L18.42 22z\"></path></symbol><symbol id=\"ic-mask-load\" viewBox=\"0 0 32 32\"><path stroke=\"none\" fill=\"none\" d=\"M0 0h32v32H0z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M18.01 4a11.798 11.798 0 0 0 0 1H3v24h24V14.986a8.738 8.738 0 0 0 1 0V29a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h15.01zM15 23a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-1a5 5 0 1 0 0-10 5 5 0 0 0 0 10z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M25 3h1v9h-1z\"></path><path fill=\"none\" stroke=\"inherit\" d=\"M22 6l3.5-3.5L29 6\"></path></symbol><symbol id=\"ic-mask\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"4.5\" stroke=\"inherit\" fill=\"none\"></circle><path stroke=\"none\" fill=\"inherit\" d=\"M2 1h20a1 1 0 0 1 1 1v20a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 1v20h20V2H2z\"></path></symbol><symbol id=\"ic-redo\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" opacity=\".5\" fill=\"none\" stroke=\"none\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M21 6H9a6 6 0 1 0 0 12h12v1H9A7 7 0 0 1 9 5h12v1z\"></path><path fill=\"none\" stroke=\"inherit\" stroke-linecap=\"square\" d=\"M19 3l2.5 2.5L19 8\"></path></symbol><symbol id=\"ic-reset\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" opacity=\".5\" stroke=\"none\" fill=\"none\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M2 13v-1a7 7 0 0 1 7-7h13v1h-1v5h1v1a7 7 0 0 1-7 7H2v-1h1v-5H2zm7-7a6 6 0 0 0-6 6v6h12a6 6 0 0 0 6-6V6H9z\"></path><path fill=\"none\" stroke=\"inherit\" stroke-linecap=\"square\" d=\"M19 3l2.5 2.5L19 8M5 16l-2.5 2.5L5 21\"></path></symbol><symbol id=\"ic-rotate-clockwise\" viewBox=\"0 0 32 32\"><path stroke=\"none\" fill=\"inherit\" d=\"M29 17h-.924c0 6.627-5.373 12-12 12-6.628 0-12-5.373-12-12C4.076 10.398 9.407 5.041 16 5V4C8.82 4 3 9.82 3 17s5.82 13 13 13 13-5.82 13-13z\"></path><path fill=\"none\" stroke=\"inherit\" stroke-linecap=\"square\" d=\"M16 1.5l4 3-4 3\"></path><path stroke=\"none\" fill=\"inherit\" fill-rule=\"nonzero\" d=\"M16 4h4v1h-4z\"></path></symbol><symbol id=\"ic-rotate-counterclockwise\" viewBox=\"0 0 32 32\"><path stroke=\"none\" d=\"M3 17h.924c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.602-5.331-11.96-11.924-12V4c7.18 0 13 5.82 13 13s-5.82 13-13 13S3 24.18 3 17z\"></path><path stroke=\"none\" fill=\"inherit\" fill-rule=\"nonzero\" d=\"M12 4h4v1h-4z\"></path><path fill=\"none\" stroke=\"inherit\" stroke-linecap=\"square\" d=\"M16 1.5l-4 3 4 3\"></path></symbol><symbol id=\"ic-rotate\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" fill=\"none\" stroke=\"none\"></path><path fill=\"inherit\" stroke=\"none\" d=\"M8.349 22.254a10.002 10.002 0 0 1-2.778-1.719l.65-.76a9.002 9.002 0 0 0 2.495 1.548l-.367.931zm2.873.704l.078-.997a9 9 0 1 0-.557-17.852l-.14-.99A10.076 10.076 0 0 1 12.145 3c5.523 0 10 4.477 10 10s-4.477 10-10 10c-.312 0-.62-.014-.924-.042zm-7.556-4.655a9.942 9.942 0 0 1-1.253-2.996l.973-.234a8.948 8.948 0 0 0 1.124 2.693l-.844.537zm-1.502-5.91A9.949 9.949 0 0 1 2.88 9.23l.925.382a8.954 8.954 0 0 0-.644 2.844l-.998-.062zm2.21-5.686c.687-.848 1.51-1.58 2.436-2.166l.523.852a9.048 9.048 0 0 0-2.188 1.95l-.771-.636z\"></path><path stroke=\"inherit\" fill=\"none\" stroke-linecap=\"square\" d=\"M13 1l-2.5 2.5L13 6\"></path></symbol><symbol id=\"ic-shape-circle\" viewBox=\"0 0 32 32\"><circle cx=\"16\" cy=\"16\" r=\"14.5\" fill=\"none\" stroke=\"inherit\"></circle></symbol><symbol id=\"ic-shape-rectangle\" viewBox=\"0 0 32 32\"><rect width=\"27\" height=\"27\" x=\"2.5\" y=\"2.5\" fill=\"none\" stroke=\"inherit\" rx=\"1\"></rect></symbol><symbol id=\"ic-shape-triangle\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M16 2.5l15.5 27H.5z\"></path></symbol><symbol id=\"ic-shape\" viewBox=\"0 0 24 24\"><path stroke=\"none\" fill=\"inherit\" d=\"M14.706 8H21a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-4h1v4h12V9h-5.706l-.588-1z\"></path><path fill=\"none\" stroke=\"inherit\" stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8.5 1.5l7.5 13H1z\"></path></symbol><symbol id=\"ic-text-align-center\" viewBox=\"0 0 32 32\"><path stroke=\"none\" fill=\"none\" d=\"M0 0h32v32H0z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M2 5h28v1H2zM8 12h16v1H8zM2 19h28v1H2zM8 26h16v1H8z\"></path></symbol><symbol id=\"ic-text-align-left\" viewBox=\"0 0 32 32\"><path stroke=\"none\" fill=\"none\" d=\"M0 0h32v32H0z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M2 5h28v1H2zM2 12h16v1H2zM2 19h28v1H2zM2 26h16v1H2z\"></path></symbol><symbol id=\"ic-text-align-right\" viewBox=\"0 0 32 32\"><path stroke=\"none\" fill=\"none\" d=\"M0 0h32v32H0z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M2 5h28v1H2zM14 12h16v1H14zM2 19h28v1H2zM14 26h16v1H14z\"></path></symbol><symbol id=\"ic-text-bold\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke=\"none\" d=\"M0 0h32v32H0z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M7 2h2v2H7zM7 28h2v2H7z\"></path><path fill=\"none\" stroke=\"inherit\" stroke-width=\"2\" d=\"M9 3v12h9a6 6 0 1 0 0-12H9zM9 15v14h10a7 7 0 0 0 0-14H9z\"></path></symbol><symbol id=\"ic-text-italic\" viewBox=\"0 0 32 32\"><path fill=\"none\" stroke=\"none\" d=\"M0 0h32v32H0z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M15 2h5v1h-5zM11 29h5v1h-5zM17 3h1l-4 26h-1z\"></path></symbol><symbol id=\"ic-text-underline\" viewBox=\"0 0 32 32\"><path stroke=\"none\" fill=\"none\" d=\"M0 0h32v32H0z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M8 2v14a8 8 0 1 0 16 0V2h1v14a9 9 0 0 1-18 0V2h1zM3 29h26v1H3z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M5 2h5v1H5zM22 2h5v1h-5z\"></path></symbol><symbol id=\"ic-text\" viewBox=\"0 0 24 24\"><path stroke=\"none\" fill=\"inherit\" d=\"M4 3h15a1 1 0 0 1 1 1H3a1 1 0 0 1 1-1zM3 4h1v1H3zM19 4h1v1h-1z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M11 3h1v18h-1z\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M10 20h3v1h-3z\"></path></symbol><symbol id=\"ic-undo\" viewBox=\"0 0 24 24\"><path d=\"M24 0H0v24h24z\" opacity=\".5\" fill=\"none\" stroke=\"none\"></path><path stroke=\"none\" fill=\"inherit\" d=\"M3 6h12a6 6 0 1 1 0 12H3v1h12a7 7 0 0 0 0-14H3v1z\"></path><path fill=\"none\" stroke=\"inherit\" stroke-linecap=\"square\" d=\"M5 3L2.5 5.5 5 8\"></path></symbol><symbol id=\"ic-zoom-in\" viewBox=\"0 0 24 24\"><g transform=\"translate(-229 -290) translate(229 290)\"><circle cx=\"10.5\" cy=\"10.5\" r=\"9\" stroke=\"inherit\" fill=\"none\"></circle><path fill=\"inherit\" d=\"M18.828 15.828H19.828V22.828H18.828z\" transform=\"rotate(-45 19.328 19.328)\"></path><path fill=\"inherit\" d=\"M7 10H14V11H7z\"></path><path fill=\"inherit\" d=\"M10 7H11V14H10z\"></path></g></symbol><symbol id=\"ic-zoom-out\" viewBox=\"0 0 24 24\"><g transform=\"translate(-263 -290) translate(263 290)\"><circle cx=\"10.5\" cy=\"10.5\" r=\"9\" stroke=\"inherit\" fill=\"none\"></circle><path fill=\"inherit\" d=\"M18.828 15.828H19.828V22.828H18.828z\" transform=\"rotate(-45 19.328 19.328)\"></path><path fill=\"inherit\" d=\"M7 10H14V11H7z\"></path></g></symbol><symbol id=\"ic-hand\" viewBox=\"0 0 24 24\"><g fill=\"none\" fill-rule=\"evenodd\" stroke-linejoin=\"round\"><path fill=\"inherit\" fill-rule=\"nonzero\" d=\"M8.672 3.36c1.328 0 2.114.78 2.29 1.869l.014.101.023.006v1.042l-.638-.185c-.187-.055-.323-.211-.354-.399L10 5.713c0-.825-.42-1.353-1.328-1.353C7.695 4.36 7 5.041 7 5.713v7.941c0 .439-.524.665-.843.364l-1.868-1.761c-.595-.528-1.316-.617-1.918-.216-.522.348-.562 1.203-.18 1.8L7.738 22h11.013l.285-.518c1.247-2.326 1.897-4.259 1.96-5.785l.004-.239V8.035c0-.656-.5-1.17-1-1.17-.503 0-1 .456-1 1.17 0 .333-.32.573-.64.48L18 8.41V7.368l.086.026.042-.136c.279-.805.978-1.332 1.738-1.388L20 5.865c1.057 0 2 .967 2 2.17v7.423c0 1.929-.845 4.352-2.521 7.29-.09.156-.255.252-.435.252H7.474c-.166 0-.321-.082-.414-.219l-5.704-8.39c-.653-1.019-.584-2.486.46-3.182 1-.666 2.216-.516 3.148.31L6 12.495V5.713c0-1.18 1.058-2.263 2.49-2.348z\" transform=\"translate(-297 -290) translate(297 290)\"></path><path fill=\"inherit\" fill-rule=\"nonzero\" d=\"M12.5 1.5c1.325 0 2.41 1.032 2.495 2.336L15 4v7.22h-1V4c0-.828-.672-1.5-1.5-1.5-.78 0-1.42.595-1.493 1.356L11 4v7.22h-1V4c0-1.38 1.12-2.5 2.5-2.5z\" transform=\"translate(-297 -290) translate(297 290)\"></path><path fill=\"inherit\" fill-rule=\"nonzero\" d=\"M16.5 3.5c1.325 0 2.41 1.032 2.495 2.336L19 6v6.3h-1V6c0-.828-.672-1.5-1.5-1.5-.78 0-1.42.595-1.493 1.356L15 6v2.44h-1V6c0-1.38 1.12-2.5 2.5-2.5z\" transform=\"translate(-297 -290) translate(297 290)\"></path></g></symbol></defs></svg>"

/***/ }),

/***/ "fabric":
/*!****************************************************************************************************************!*\
  !*** external {"commonjs":["fabric","fabric"],"commonjs2":["fabric","fabric"],"amd":"fabric","root":"fabric"} ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_fabric__;

/***/ }),

/***/ "tui-code-snippet":
/*!******************************************************************************************************************************!*\
  !*** external {"commonjs":"tui-code-snippet","commonjs2":"tui-code-snippet","amd":"tui-code-snippet","root":["tui","util"]} ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_tui_code_snippet__;

/***/ }),

/***/ "tui-color-picker":
/*!*************************************************************************************************************************************!*\
  !*** external {"commonjs":"tui-color-picker","commonjs2":"tui-color-picker","amd":"tui-color-picker","root":["tui","colorPicker"]} ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_tui_color_picker__;

/***/ })

/******/ });
});
//# sourceMappingURL=tui-image-editor.js.map