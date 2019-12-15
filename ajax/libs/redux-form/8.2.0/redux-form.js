(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-redux"), require("redux"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-redux", "redux"], factory);
	else if(typeof exports === 'object')
		exports["ReduxForm"] = factory(require("react"), require("react-redux"), require("redux"));
	else
		root["ReduxForm"] = factory(root["React"], root["ReactRedux"], root["Redux"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_redux__, __WEBPACK_EXTERNAL_MODULE_redux__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _arrayWithoutHoles(arr) {\n  if (Array.isArray(arr)) {\n    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {\n      arr2[i] = arr[i];\n    }\n\n    return arr2;\n  }\n}\n\nmodule.exports = _arrayWithoutHoles;\n\n//# sourceURL=webpack://ReduxForm/./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\n\n//# sourceURL=webpack://ReduxForm/./node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/extends.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/extends.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _extends() {\n  module.exports = _extends = Object.assign || function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n\n    return target;\n  };\n\n  return _extends.apply(this, arguments);\n}\n\nmodule.exports = _extends;\n\n//# sourceURL=webpack://ReduxForm/./node_modules/@babel/runtime/helpers/extends.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inheritsLoose.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inheritsLoose.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _inheritsLoose(subClass, superClass) {\n  subClass.prototype = Object.create(superClass.prototype);\n  subClass.prototype.constructor = subClass;\n  subClass.__proto__ = superClass;\n}\n\nmodule.exports = _inheritsLoose;\n\n//# sourceURL=webpack://ReduxForm/./node_modules/@babel/runtime/helpers/inheritsLoose.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    \"default\": obj\n  };\n}\n\nmodule.exports = _interopRequireDefault;\n\n//# sourceURL=webpack://ReduxForm/./node_modules/@babel/runtime/helpers/interopRequireDefault.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _interopRequireWildcard(obj) {\n  if (obj && obj.__esModule) {\n    return obj;\n  } else {\n    var newObj = {};\n\n    if (obj != null) {\n      for (var key in obj) {\n        if (Object.prototype.hasOwnProperty.call(obj, key)) {\n          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};\n\n          if (desc.get || desc.set) {\n            Object.defineProperty(newObj, key, desc);\n          } else {\n            newObj[key] = obj[key];\n          }\n        }\n      }\n    }\n\n    newObj[\"default\"] = obj;\n    return newObj;\n  }\n}\n\nmodule.exports = _interopRequireWildcard;\n\n//# sourceURL=webpack://ReduxForm/./node_modules/@babel/runtime/helpers/interopRequireWildcard.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _iterableToArray(iter) {\n  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter);\n}\n\nmodule.exports = _iterableToArray;\n\n//# sourceURL=webpack://ReduxForm/./node_modules/@babel/runtime/helpers/iterableToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _nonIterableSpread() {\n  throw new TypeError(\"Invalid attempt to spread non-iterable instance\");\n}\n\nmodule.exports = _nonIterableSpread;\n\n//# sourceURL=webpack://ReduxForm/./node_modules/@babel/runtime/helpers/nonIterableSpread.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _objectWithoutPropertiesLoose(source, excluded) {\n  if (source == null) return {};\n  var target = {};\n  var sourceKeys = Object.keys(source);\n  var key, i;\n\n  for (i = 0; i < sourceKeys.length; i++) {\n    key = sourceKeys[i];\n    if (excluded.indexOf(key) >= 0) continue;\n    target[key] = source[key];\n  }\n\n  return target;\n}\n\nmodule.exports = _objectWithoutPropertiesLoose;\n\n//# sourceURL=webpack://ReduxForm/./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ \"./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js\");\n\nvar iterableToArray = __webpack_require__(/*! ./iterableToArray */ \"./node_modules/@babel/runtime/helpers/iterableToArray.js\");\n\nvar nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ \"./node_modules/@babel/runtime/helpers/nonIterableSpread.js\");\n\nfunction _toConsumableArray(arr) {\n  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();\n}\n\nmodule.exports = _toConsumableArray;\n\n//# sourceURL=webpack://ReduxForm/./node_modules/@babel/runtime/helpers/toConsumableArray.js?");

/***/ }),

/***/ "./node_modules/es6-error/es6/index.js":
/*!*********************************************!*\
  !*** ./node_modules/es6-error/es6/index.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction _extendableBuiltin(cls) {\n  function ExtendableBuiltin() {\n    cls.apply(this, arguments);\n  }\n\n  ExtendableBuiltin.prototype = Object.create(cls.prototype, {\n    constructor: {\n      value: cls,\n      enumerable: false,\n      writable: true,\n      configurable: true\n    }\n  });\n\n  if (Object.setPrototypeOf) {\n    Object.setPrototypeOf(ExtendableBuiltin, cls);\n  } else {\n    ExtendableBuiltin.__proto__ = cls;\n  }\n\n  return ExtendableBuiltin;\n}\n\nvar ExtendableError = function (_extendableBuiltin2) {\n  _inherits(ExtendableError, _extendableBuiltin2);\n\n  function ExtendableError() {\n    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n\n    _classCallCheck(this, ExtendableError);\n\n    // extending Error is weird and does not propagate `message`\n    var _this = _possibleConstructorReturn(this, (ExtendableError.__proto__ || Object.getPrototypeOf(ExtendableError)).call(this, message));\n\n    Object.defineProperty(_this, 'message', {\n      configurable: true,\n      enumerable: false,\n      value: message,\n      writable: true\n    });\n\n    Object.defineProperty(_this, 'name', {\n      configurable: true,\n      enumerable: false,\n      value: _this.constructor.name,\n      writable: true\n    });\n\n    if (Error.hasOwnProperty('captureStackTrace')) {\n      Error.captureStackTrace(_this, _this.constructor);\n      return _possibleConstructorReturn(_this);\n    }\n\n    Object.defineProperty(_this, 'stack', {\n      configurable: true,\n      enumerable: false,\n      value: new Error(message).stack,\n      writable: true\n    });\n    return _this;\n  }\n\n  return ExtendableError;\n}(_extendableBuiltin(Error));\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ExtendableError);\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/es6-error/es6/index.js?");

/***/ }),

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Copyright 2015, Yahoo! Inc.\n * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.\n */\nvar ReactIs = __webpack_require__(/*! react-is */ \"./node_modules/react-is/index.js\");\nvar REACT_STATICS = {\n    childContextTypes: true,\n    contextType: true,\n    contextTypes: true,\n    defaultProps: true,\n    displayName: true,\n    getDefaultProps: true,\n    getDerivedStateFromError: true,\n    getDerivedStateFromProps: true,\n    mixins: true,\n    propTypes: true,\n    type: true\n};\n\nvar KNOWN_STATICS = {\n    name: true,\n    length: true,\n    prototype: true,\n    caller: true,\n    callee: true,\n    arguments: true,\n    arity: true\n};\n\nvar FORWARD_REF_STATICS = {\n    '$$typeof': true,\n    render: true,\n    defaultProps: true,\n    displayName: true,\n    propTypes: true\n};\n\nvar MEMO_STATICS = {\n    '$$typeof': true,\n    compare: true,\n    defaultProps: true,\n    displayName: true,\n    propTypes: true,\n    type: true\n};\n\nvar TYPE_STATICS = {};\nTYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;\n\nfunction getStatics(component) {\n    if (ReactIs.isMemo(component)) {\n        return MEMO_STATICS;\n    }\n    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;\n}\n\nvar defineProperty = Object.defineProperty;\nvar getOwnPropertyNames = Object.getOwnPropertyNames;\nvar getOwnPropertySymbols = Object.getOwnPropertySymbols;\nvar getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;\nvar getPrototypeOf = Object.getPrototypeOf;\nvar objectPrototype = Object.prototype;\n\nfunction hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {\n    if (typeof sourceComponent !== 'string') {\n        // don't hoist over string (html) components\n\n        if (objectPrototype) {\n            var inheritedComponent = getPrototypeOf(sourceComponent);\n            if (inheritedComponent && inheritedComponent !== objectPrototype) {\n                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);\n            }\n        }\n\n        var keys = getOwnPropertyNames(sourceComponent);\n\n        if (getOwnPropertySymbols) {\n            keys = keys.concat(getOwnPropertySymbols(sourceComponent));\n        }\n\n        var targetStatics = getStatics(targetComponent);\n        var sourceStatics = getStatics(sourceComponent);\n\n        for (var i = 0; i < keys.length; ++i) {\n            var key = keys[i];\n            if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {\n                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);\n                try {\n                    // Avoid failures from read-only properties\n                    defineProperty(targetComponent, key, descriptor);\n                } catch (e) {}\n            }\n        }\n\n        return targetComponent;\n    }\n\n    return targetComponent;\n}\n\nmodule.exports = hoistNonReactStatics;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js?");

/***/ }),

/***/ "./node_modules/invariant/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/invariant/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\n/**\n * Use invariant() to assert state which your program assumes to be true.\n *\n * Provide sprintf-style format (only %s is supported) and arguments\n * to provide information about what broke and what you were\n * expecting.\n *\n * The invariant message will be stripped in production, but the invariant\n * will remain to ensure logic does not differ in production.\n */\n\nvar invariant = function(condition, format, a, b, c, d, e, f) {\n  if (true) {\n    if (format === undefined) {\n      throw new Error('invariant requires an error message argument');\n    }\n  }\n\n  if (!condition) {\n    var error;\n    if (format === undefined) {\n      error = new Error(\n        'Minified exception occurred; use the non-minified dev environment ' +\n        'for the full error message and additional helpful warnings.'\n      );\n    } else {\n      var args = [a, b, c, d, e, f];\n      var argIndex = 0;\n      error = new Error(\n        format.replace(/%s/g, function() { return args[argIndex++]; })\n      );\n      error.name = 'Invariant Violation';\n    }\n\n    error.framesToPop = 1; // we don't care about invariant's own frame\n    throw error;\n  }\n};\n\nmodule.exports = invariant;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/invariant/browser.js?");

/***/ }),

/***/ "./node_modules/is-promise/index.js":
/*!******************************************!*\
  !*** ./node_modules/is-promise/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = isPromise;\n\nfunction isPromise(obj) {\n  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';\n}\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/is-promise/index.js?");

/***/ }),

/***/ "./node_modules/lodash/_SetCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_SetCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\");\n\n/**\n * Casts `value` as an array if it's not one.\n *\n * @static\n * @memberOf _\n * @since 4.4.0\n * @category Lang\n * @param {*} value The value to inspect.\n * @returns {Array} Returns the cast array.\n * @example\n *\n * _.castArray(1);\n * // => [1]\n *\n * _.castArray({ 'a': 1 });\n * // => [{ 'a': 1 }]\n *\n * _.castArray('abc');\n * // => ['abc']\n *\n * _.castArray(null);\n * // => [null]\n *\n * _.castArray(undefined);\n * // => [undefined]\n *\n * _.castArray();\n * // => []\n *\n * var array = [1, 2, 3];\n * console.log(_.castArray(array) === array);\n * // => true\n */\nfunction castArray() {\n  if (!arguments.length) {\n    return [];\n  }\n  var value = arguments[0];\n  return isArray(value) ? value : [value];\n}\n\nmodule.exports = castArray;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_SetCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Stack.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ \"./node_modules/lodash/_listCacheClear.js\"),\n    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ \"./node_modules/lodash/_listCacheDelete.js\"),\n    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ \"./node_modules/lodash/_listCacheGet.js\"),\n    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ \"./node_modules/lodash/_listCacheHas.js\"),\n    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ \"./node_modules/lodash/_listCacheSet.js\");\n\n/**\n * Creates an list cache object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction ListCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `ListCache`.\nListCache.prototype.clear = listCacheClear;\nListCache.prototype['delete'] = listCacheDelete;\nListCache.prototype.get = listCacheGet;\nListCache.prototype.has = listCacheHas;\nListCache.prototype.set = listCacheSet;\n\nmodule.exports = ListCache;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_Stack.js?");

/***/ }),

/***/ "./node_modules/lodash/_Uint8Array.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Uint8Array = root.Uint8Array;\n\nmodule.exports = Uint8Array;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_Uint8Array.js?");

/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A faster alternative to `Function#apply`, this function invokes `func`\n * with the `this` binding of `thisArg` and the arguments of `args`.\n *\n * @private\n * @param {Function} func The function to invoke.\n * @param {*} thisArg The `this` binding of `func`.\n * @param {Array} args The arguments to invoke `func` with.\n * @returns {*} Returns the result of `func`.\n */\nfunction apply(func, thisArg, args) {\n  switch (args.length) {\n    case 0: return func.call(thisArg);\n    case 1: return func.call(thisArg, args[0]);\n    case 2: return func.call(thisArg, args[0], args[1]);\n    case 3: return func.call(thisArg, args[0], args[1], args[2]);\n  }\n  return func.apply(thisArg, args);\n}\n\nmodule.exports = apply;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_apply.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.map` for arrays without support for iteratee\n * shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns the new mapped array.\n */\nfunction arrayMap(array, iteratee) {\n  var index = -1,\n      length = array == null ? 0 : array.length,\n      result = Array(length);\n\n  while (++index < length) {\n    result[index] = iteratee(array[index], index, array);\n  }\n  return result;\n}\n\nmodule.exports = arrayMap;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_arrayMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_arraySome.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arraySome.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.some` for arrays without support for iteratee\n * shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} predicate The function invoked per iteration.\n * @returns {boolean} Returns `true` if any element passes the predicate check,\n *  else `false`.\n */\nfunction arraySome(array, predicate) {\n  var index = -1,\n      length = array == null ? 0 : array.length;\n\n  while (++index < length) {\n    if (predicate(array[index], index, array)) {\n      return true;\n    }\n  }\n  return false;\n}\n\nmodule.exports = arraySome;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_arraySome.js?");

/***/ }),

/***/ "./node_modules/lodash/_assignMergeValue.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_assignMergeValue.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\"),\n    eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/**\n * This function is like `assignValue` except that it doesn't assign\n * `undefined` values.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction assignMergeValue(object, key, value) {\n  if ((value !== undefined && !eq(object[key], value)) ||\n      (value === undefined && !(key in object))) {\n    baseAssignValue(object, key, value);\n  }\n}\n\nmodule.exports = assignMergeValue;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_assignMergeValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\"),\n    eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Assigns `value` to `key` of `object` if the existing value is not equivalent\n * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * for equality comparisons.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction assignValue(object, key, value) {\n  var objValue = object[key];\n  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||\n      (value === undefined && !(key in object))) {\n    baseAssignValue(object, key, value);\n  }\n}\n\nmodule.exports = assignValue;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_assignValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/**\n * Gets the index at which the `key` is found in `array` of key-value pairs.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} key The key to search for.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction assocIndexOf(array, key) {\n  var length = array.length;\n  while (length--) {\n    if (eq(array[length][0], key)) {\n      return length;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = assocIndexOf;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_assocIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var defineProperty = __webpack_require__(/*! ./_defineProperty */ \"./node_modules/lodash/_defineProperty.js\");\n\n/**\n * The base implementation of `assignValue` and `assignMergeValue` without\n * value checks.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction baseAssignValue(object, key, value) {\n  if (key == '__proto__' && defineProperty) {\n    defineProperty(object, key, {\n      'configurable': true,\n      'enumerable': true,\n      'value': value,\n      'writable': true\n    });\n  } else {\n    object[key] = value;\n  }\n}\n\nmodule.exports = baseAssignValue;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_baseAssignValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/** Built-in value references. */\nvar objectCreate = Object.create;\n\n/**\n * The base implementation of `_.create` without support for assigning\n * properties to the created object.\n *\n * @private\n * @param {Object} proto The object to inherit from.\n * @returns {Object} Returns the new object.\n */\nvar baseCreate = (function() {\n  function object() {}\n  return function(proto) {\n    if (!isObject(proto)) {\n      return {};\n    }\n    if (objectCreate) {\n      return objectCreate(proto);\n    }\n    object.prototype = proto;\n    var result = new object;\n    object.prototype = undefined;\n    return result;\n  };\n}());\n\nmodule.exports = baseCreate;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_baseCreate.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseFor.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ \"./node_modules/lodash/_createBaseFor.js\");\n\n/**\n * The base implementation of `baseForOwn` which iterates over `object`\n * properties returned by `keysFunc` and invokes `iteratee` for each property.\n * Iteratee functions may exit iteration early by explicitly returning `false`.\n *\n * @private\n * @param {Object} object The object to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @param {Function} keysFunc The function to get the keys of `object`.\n * @returns {Object} Returns `object`.\n */\nvar baseFor = createBaseFor();\n\nmodule.exports = baseFor;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_baseFor.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseForOwn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseForOwn.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseFor = __webpack_require__(/*! ./_baseFor */ \"./node_modules/lodash/_baseFor.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * The base implementation of `_.forOwn` without support for iteratee shorthands.\n *\n * @private\n * @param {Object} object The object to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Object} Returns `object`.\n */\nfunction baseForOwn(object, iteratee) {\n  return object && baseFor(object, iteratee, keys);\n}\n\nmodule.exports = baseForOwn;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_baseForOwn.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the value at `key` of `object`.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction getValue(object, key) {\n  return object == null ? undefined : object[key];\n}\n\nmodule.exports = getValue;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_baseGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/**\n * Converts `value` to a string using `Object.prototype.toString`.\n *\n * @private\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n */\nfunction objectToString(value) {\n  return nativeObjectToString.call(value);\n}\n\nmodule.exports = objectToString;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_baseGetTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIndexOf.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIndexOf.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.indexOf` which performs strict equality\n * comparisons of values, i.e. `===`.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} value The value to search for.\n * @param {number} fromIndex The index to search from.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction strictIndexOf(array, value, fromIndex) {\n  var index = fromIndex - 1,\n      length = array.length;\n\n  while (++index < length) {\n    if (array[index] === value) {\n      return index;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = strictIndexOf;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_baseIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsEqual.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsEqual.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsEqualDeep = __webpack_require__(/*! ./_baseIsEqualDeep */ \"./node_modules/lodash/_baseIsEqualDeep.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/**\n * The base implementation of `_.isEqual` which supports partial comparisons\n * and tracks traversed objects.\n *\n * @private\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @param {boolean} bitmask The bitmask flags.\n *  1 - Unordered comparison\n *  2 - Partial comparison\n * @param {Function} [customizer] The function to customize comparisons.\n * @param {Object} [stack] Tracks traversed `value` and `other` objects.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n */\nfunction baseIsEqual(value, other, bitmask, customizer, stack) {\n  if (value === other) {\n    return true;\n  }\n  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {\n    return value !== value && other !== other;\n  }\n  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);\n}\n\nmodule.exports = baseIsEqual;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_baseIsEqual.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsEqualDeep.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsEqualDeep.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stack = __webpack_require__(/*! ./_Stack */ \"./node_modules/lodash/_Stack.js\"),\n    equalArrays = __webpack_require__(/*! ./_equalArrays */ \"./node_modules/lodash/_equalArrays.js\"),\n    equalByTag = __webpack_require__(/*! ./_equalByTag */ \"./node_modules/lodash/_equalByTag.js\"),\n    equalObjects = __webpack_require__(/*! ./_equalObjects */ \"./node_modules/lodash/_equalObjects.js\"),\n    getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isTypedArray = __webpack_require__(/*! ./isTypedArray */ \"./node_modules/lodash/isTypedArray.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1;\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    objectTag = '[object Object]';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * A specialized version of `baseIsEqual` for arrays and objects which performs\n * deep comparisons and tracks traversed objects enabling objects with circular\n * references to be compared.\n *\n * @private\n * @param {Object} object The object to compare.\n * @param {Object} other The other object to compare.\n * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.\n * @param {Function} customizer The function to customize comparisons.\n * @param {Function} equalFunc The function to determine equivalents of values.\n * @param {Object} [stack] Tracks traversed `object` and `other` objects.\n * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.\n */\nfunction baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {\n  var objIsArr = isArray(object),\n      othIsArr = isArray(other),\n      objTag = objIsArr ? arrayTag : getTag(object),\n      othTag = othIsArr ? arrayTag : getTag(other);\n\n  objTag = objTag == argsTag ? objectTag : objTag;\n  othTag = othTag == argsTag ? objectTag : othTag;\n\n  var objIsObj = objTag == objectTag,\n      othIsObj = othTag == objectTag,\n      isSameTag = objTag == othTag;\n\n  if (isSameTag && isBuffer(object)) {\n    if (!isBuffer(other)) {\n      return false;\n    }\n    objIsArr = true;\n    objIsObj = false;\n  }\n  if (isSameTag && !objIsObj) {\n    stack || (stack = new Stack);\n    return (objIsArr || isTypedArray(object))\n      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)\n      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);\n  }\n  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {\n    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),\n        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');\n\n    if (objIsWrapped || othIsWrapped) {\n      var objUnwrapped = objIsWrapped ? object.value() : object,\n          othUnwrapped = othIsWrapped ? other.value() : other;\n\n      stack || (stack = new Stack);\n      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);\n    }\n  }\n  if (!isSameTag) {\n    return false;\n  }\n  stack || (stack = new Stack);\n  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);\n}\n\nmodule.exports = baseIsEqualDeep;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_baseIsEqualDeep.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIteratee.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIteratee.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns the first argument it receives.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Util\n * @param {*} value Any value.\n * @returns {*} Returns `value`.\n * @example\n *\n * var object = { 'a': 1 };\n *\n * console.log(_.identity(object) === object);\n * // => true\n */\nfunction identity(value) {\n  return value;\n}\n\nmodule.exports = identity;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_baseIteratee.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var overArg = __webpack_require__(/*! ./_overArg */ \"./node_modules/lodash/_overArg.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeKeys = overArg(Object.keys, Object);\n\nmodule.exports = nativeKeys;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_baseKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseMerge.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseMerge.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stack = __webpack_require__(/*! ./_Stack */ \"./node_modules/lodash/_Stack.js\"),\n    assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ \"./node_modules/lodash/_assignMergeValue.js\"),\n    baseFor = __webpack_require__(/*! ./_baseFor */ \"./node_modules/lodash/_baseFor.js\"),\n    baseMergeDeep = __webpack_require__(/*! ./_baseMergeDeep */ \"./node_modules/lodash/_baseMergeDeep.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\"),\n    safeGet = __webpack_require__(/*! ./_safeGet */ \"./node_modules/lodash/_safeGet.js\");\n\n/**\n * The base implementation of `_.merge` without support for multiple sources.\n *\n * @private\n * @param {Object} object The destination object.\n * @param {Object} source The source object.\n * @param {number} srcIndex The index of `source`.\n * @param {Function} [customizer] The function to customize merged values.\n * @param {Object} [stack] Tracks traversed source values and their merged\n *  counterparts.\n */\nfunction baseMerge(object, source, srcIndex, customizer, stack) {\n  if (object === source) {\n    return;\n  }\n  baseFor(source, function(srcValue, key) {\n    if (isObject(srcValue)) {\n      stack || (stack = new Stack);\n      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);\n    }\n    else {\n      var newValue = customizer\n        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)\n        : undefined;\n\n      if (newValue === undefined) {\n        newValue = srcValue;\n      }\n      assignMergeValue(object, key, newValue);\n    }\n  }, keysIn);\n}\n\nmodule.exports = baseMerge;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_baseMerge.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseMergeDeep.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_baseMergeDeep.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assignMergeValue = __webpack_require__(/*! ./_assignMergeValue */ \"./node_modules/lodash/_assignMergeValue.js\"),\n    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ \"./node_modules/lodash/_cloneBuffer.js\"),\n    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ \"./node_modules/lodash/_cloneTypedArray.js\"),\n    copyArray = __webpack_require__(/*! ./_copyArray */ \"./node_modules/lodash/_copyArray.js\"),\n    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ \"./node_modules/lodash/_initCloneObject.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isArrayLikeObject = __webpack_require__(/*! ./isArrayLikeObject */ \"./node_modules/lodash/isArrayLikeObject.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    isPlainObject = __webpack_require__(/*! ./isPlainObject */ \"./node_modules/lodash/isPlainObject.js\"),\n    isTypedArray = __webpack_require__(/*! ./isTypedArray */ \"./node_modules/lodash/isTypedArray.js\"),\n    safeGet = __webpack_require__(/*! ./_safeGet */ \"./node_modules/lodash/_safeGet.js\"),\n    toPlainObject = __webpack_require__(/*! ./toPlainObject */ \"./node_modules/lodash/toPlainObject.js\");\n\n/**\n * A specialized version of `baseMerge` for arrays and objects which performs\n * deep merges and tracks traversed objects enabling objects with circular\n * references to be merged.\n *\n * @private\n * @param {Object} object The destination object.\n * @param {Object} source The source object.\n * @param {string} key The key of the value to merge.\n * @param {number} srcIndex The index of `source`.\n * @param {Function} mergeFunc The function to merge values.\n * @param {Function} [customizer] The function to customize assigned values.\n * @param {Object} [stack] Tracks traversed source values and their merged\n *  counterparts.\n */\nfunction baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {\n  var objValue = safeGet(object, key),\n      srcValue = safeGet(source, key),\n      stacked = stack.get(srcValue);\n\n  if (stacked) {\n    assignMergeValue(object, key, stacked);\n    return;\n  }\n  var newValue = customizer\n    ? customizer(objValue, srcValue, (key + ''), object, source, stack)\n    : undefined;\n\n  var isCommon = newValue === undefined;\n\n  if (isCommon) {\n    var isArr = isArray(srcValue),\n        isBuff = !isArr && isBuffer(srcValue),\n        isTyped = !isArr && !isBuff && isTypedArray(srcValue);\n\n    newValue = srcValue;\n    if (isArr || isBuff || isTyped) {\n      if (isArray(objValue)) {\n        newValue = objValue;\n      }\n      else if (isArrayLikeObject(objValue)) {\n        newValue = copyArray(objValue);\n      }\n      else if (isBuff) {\n        isCommon = false;\n        newValue = cloneBuffer(srcValue, true);\n      }\n      else if (isTyped) {\n        isCommon = false;\n        newValue = cloneTypedArray(srcValue, true);\n      }\n      else {\n        newValue = [];\n      }\n    }\n    else if (isPlainObject(srcValue) || isArguments(srcValue)) {\n      newValue = objValue;\n      if (isArguments(objValue)) {\n        newValue = toPlainObject(objValue);\n      }\n      else if (!isObject(objValue) || isFunction(objValue)) {\n        newValue = initCloneObject(srcValue);\n      }\n    }\n    else {\n      isCommon = false;\n    }\n  }\n  if (isCommon) {\n    // Recursively merge objects and arrays (susceptible to call stack limits).\n    stack.set(srcValue, newValue);\n    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);\n    stack['delete'](srcValue);\n  }\n  assignMergeValue(object, key, newValue);\n}\n\nmodule.exports = baseMergeDeep;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_baseMergeDeep.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\"),\n    overRest = __webpack_require__(/*! ./_overRest */ \"./node_modules/lodash/_overRest.js\"),\n    setToString = __webpack_require__(/*! ./_setToString */ \"./node_modules/lodash/_setToString.js\");\n\n/**\n * The base implementation of `_.rest` which doesn't validate or coerce arguments.\n *\n * @private\n * @param {Function} func The function to apply a rest parameter to.\n * @param {number} [start=func.length-1] The start position of the rest parameter.\n * @returns {Function} Returns the new function.\n */\nfunction baseRest(func, start) {\n  return setToString(overRest(func, start, identity), func + '');\n}\n\nmodule.exports = baseRest;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_baseRest.js?");

/***/ }),

/***/ "./node_modules/lodash/_cacheHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_cacheHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIndexOf = __webpack_require__(/*! ./_baseIndexOf */ \"./node_modules/lodash/_baseIndexOf.js\");\n\n/**\n * A specialized version of `_.includes` for arrays without support for\n * specifying an index to search from.\n *\n * @private\n * @param {Array} [array] The array to inspect.\n * @param {*} target The value to search for.\n * @returns {boolean} Returns `true` if `target` is found, else `false`.\n */\nfunction arrayIncludes(array, value) {\n  var length = array == null ? 0 : array.length;\n  return !!length && baseIndexOf(array, value, 0) > -1;\n}\n\nmodule.exports = arrayIncludes;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_cacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneArrayBuffer.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_cloneArrayBuffer.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ \"./node_modules/lodash/_Uint8Array.js\");\n\n/**\n * Creates a clone of `arrayBuffer`.\n *\n * @private\n * @param {ArrayBuffer} arrayBuffer The array buffer to clone.\n * @returns {ArrayBuffer} Returns the cloned array buffer.\n */\nfunction cloneArrayBuffer(arrayBuffer) {\n  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);\n  new Uint8Array(result).set(new Uint8Array(arrayBuffer));\n  return result;\n}\n\nmodule.exports = cloneArrayBuffer;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_cloneArrayBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneBuffer.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneBuffer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports =  true && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Built-in value references. */\nvar Buffer = moduleExports ? root.Buffer : undefined,\n    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;\n\n/**\n * Creates a clone of  `buffer`.\n *\n * @private\n * @param {Buffer} buffer The buffer to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Buffer} Returns the cloned buffer.\n */\nfunction cloneBuffer(buffer, isDeep) {\n  if (isDeep) {\n    return buffer.slice();\n  }\n  var length = buffer.length,\n      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);\n\n  buffer.copy(result);\n  return result;\n}\n\nmodule.exports = cloneBuffer;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_cloneBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneTypedArray.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_cloneTypedArray.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ \"./node_modules/lodash/_cloneArrayBuffer.js\");\n\n/**\n * Creates a clone of `typedArray`.\n *\n * @private\n * @param {Object} typedArray The typed array to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the cloned typed array.\n */\nfunction cloneTypedArray(typedArray, isDeep) {\n  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;\n  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);\n}\n\nmodule.exports = cloneTypedArray;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_cloneTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Copies the values of `source` to `array`.\n *\n * @private\n * @param {Array} source The array to copy values from.\n * @param {Array} [array=[]] The array to copy values to.\n * @returns {Array} Returns `array`.\n */\nfunction copyArray(source, array) {\n  var index = -1,\n      length = source.length;\n\n  array || (array = Array(length));\n  while (++index < length) {\n    array[index] = source[index];\n  }\n  return array;\n}\n\nmodule.exports = copyArray;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_copyArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_copyObject.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assignValue = __webpack_require__(/*! ./_assignValue */ \"./node_modules/lodash/_assignValue.js\"),\n    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\");\n\n/**\n * Copies properties of `source` to `object`.\n *\n * @private\n * @param {Object} source The object to copy properties from.\n * @param {Array} props The property identifiers to copy.\n * @param {Object} [object={}] The object to copy properties to.\n * @param {Function} [customizer] The function to customize copied values.\n * @returns {Object} Returns `object`.\n */\nfunction copyObject(source, props, object, customizer) {\n  var isNew = !object;\n  object || (object = {});\n\n  var index = -1,\n      length = props.length;\n\n  while (++index < length) {\n    var key = props[index];\n\n    var newValue = customizer\n      ? customizer(object[key], source[key], key, object, source)\n      : undefined;\n\n    if (newValue === undefined) {\n      newValue = source[key];\n    }\n    if (isNew) {\n      baseAssignValue(object, key, newValue);\n    } else {\n      assignValue(object, key, newValue);\n    }\n  }\n  return object;\n}\n\nmodule.exports = copyObject;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_copyObject.js?");

/***/ }),

/***/ "./node_modules/lodash/_createAssigner.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createAssigner.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseRest = __webpack_require__(/*! ./_baseRest */ \"./node_modules/lodash/_baseRest.js\"),\n    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ \"./node_modules/lodash/_isIterateeCall.js\");\n\n/**\n * Creates a function like `_.assign`.\n *\n * @private\n * @param {Function} assigner The function to assign values.\n * @returns {Function} Returns the new assigner function.\n */\nfunction createAssigner(assigner) {\n  return baseRest(function(object, sources) {\n    var index = -1,\n        length = sources.length,\n        customizer = length > 1 ? sources[length - 1] : undefined,\n        guard = length > 2 ? sources[2] : undefined;\n\n    customizer = (assigner.length > 3 && typeof customizer == 'function')\n      ? (length--, customizer)\n      : undefined;\n\n    if (guard && isIterateeCall(sources[0], sources[1], guard)) {\n      customizer = length < 3 ? undefined : customizer;\n      length = 1;\n    }\n    object = Object(object);\n    while (++index < length) {\n      var source = sources[index];\n      if (source) {\n        assigner(object, source, index, customizer);\n      }\n    }\n    return object;\n  });\n}\n\nmodule.exports = createAssigner;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_createAssigner.js?");

/***/ }),

/***/ "./node_modules/lodash/_createBaseFor.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a base function for methods like `_.forIn` and `_.forOwn`.\n *\n * @private\n * @param {boolean} [fromRight] Specify iterating from right to left.\n * @returns {Function} Returns the new base function.\n */\nfunction createBaseFor(fromRight) {\n  return function(object, iteratee, keysFunc) {\n    var index = -1,\n        iterable = Object(object),\n        props = keysFunc(object),\n        length = props.length;\n\n    while (length--) {\n      var key = props[fromRight ? length : ++index];\n      if (iteratee(iterable[key], key, iterable) === false) {\n        break;\n      }\n    }\n    return object;\n  };\n}\n\nmodule.exports = createBaseFor;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_createBaseFor.js?");

/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\nvar defineProperty = (function() {\n  try {\n    var func = getNative(Object, 'defineProperty');\n    func({}, '', {});\n    return func;\n  } catch (e) {}\n}());\n\nmodule.exports = defineProperty;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_defineProperty.js?");

/***/ }),

/***/ "./node_modules/lodash/_equalArrays.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_equalArrays.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var SetCache = __webpack_require__(/*! ./_SetCache */ \"./node_modules/lodash/_SetCache.js\"),\n    arraySome = __webpack_require__(/*! ./_arraySome */ \"./node_modules/lodash/_arraySome.js\"),\n    cacheHas = __webpack_require__(/*! ./_cacheHas */ \"./node_modules/lodash/_cacheHas.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1,\n    COMPARE_UNORDERED_FLAG = 2;\n\n/**\n * A specialized version of `baseIsEqualDeep` for arrays with support for\n * partial deep comparisons.\n *\n * @private\n * @param {Array} array The array to compare.\n * @param {Array} other The other array to compare.\n * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.\n * @param {Function} customizer The function to customize comparisons.\n * @param {Function} equalFunc The function to determine equivalents of values.\n * @param {Object} stack Tracks traversed `array` and `other` objects.\n * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.\n */\nfunction equalArrays(array, other, bitmask, customizer, equalFunc, stack) {\n  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,\n      arrLength = array.length,\n      othLength = other.length;\n\n  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {\n    return false;\n  }\n  // Assume cyclic values are equal.\n  var stacked = stack.get(array);\n  if (stacked && stack.get(other)) {\n    return stacked == other;\n  }\n  var index = -1,\n      result = true,\n      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;\n\n  stack.set(array, other);\n  stack.set(other, array);\n\n  // Ignore non-index properties.\n  while (++index < arrLength) {\n    var arrValue = array[index],\n        othValue = other[index];\n\n    if (customizer) {\n      var compared = isPartial\n        ? customizer(othValue, arrValue, index, other, array, stack)\n        : customizer(arrValue, othValue, index, array, other, stack);\n    }\n    if (compared !== undefined) {\n      if (compared) {\n        continue;\n      }\n      result = false;\n      break;\n    }\n    // Recursively compare arrays (susceptible to call stack limits).\n    if (seen) {\n      if (!arraySome(other, function(othValue, othIndex) {\n            if (!cacheHas(seen, othIndex) &&\n                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {\n              return seen.push(othIndex);\n            }\n          })) {\n        result = false;\n        break;\n      }\n    } else if (!(\n          arrValue === othValue ||\n            equalFunc(arrValue, othValue, bitmask, customizer, stack)\n        )) {\n      result = false;\n      break;\n    }\n  }\n  stack['delete'](array);\n  stack['delete'](other);\n  return result;\n}\n\nmodule.exports = equalArrays;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_equalArrays.js?");

/***/ }),

/***/ "./node_modules/lodash/_equalByTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_equalByTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Performs a\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * comparison between two values to determine if they are equivalent.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * var object = { 'a': 1 };\n * var other = { 'a': 1 };\n *\n * _.eq(object, object);\n * // => true\n *\n * _.eq(object, other);\n * // => false\n *\n * _.eq('a', 'a');\n * // => true\n *\n * _.eq('a', Object('a'));\n * // => false\n *\n * _.eq(NaN, NaN);\n * // => true\n */\nfunction eq(value, other) {\n  return value === other || (value !== value && other !== other);\n}\n\nmodule.exports = eq;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_equalByTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_equalObjects.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_equalObjects.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getAllKeys = __webpack_require__(/*! ./_getAllKeys */ \"./node_modules/lodash/_getAllKeys.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1;\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * A specialized version of `baseIsEqualDeep` for objects with support for\n * partial deep comparisons.\n *\n * @private\n * @param {Object} object The object to compare.\n * @param {Object} other The other object to compare.\n * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.\n * @param {Function} customizer The function to customize comparisons.\n * @param {Function} equalFunc The function to determine equivalents of values.\n * @param {Object} stack Tracks traversed `object` and `other` objects.\n * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.\n */\nfunction equalObjects(object, other, bitmask, customizer, equalFunc, stack) {\n  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,\n      objProps = getAllKeys(object),\n      objLength = objProps.length,\n      othProps = getAllKeys(other),\n      othLength = othProps.length;\n\n  if (objLength != othLength && !isPartial) {\n    return false;\n  }\n  var index = objLength;\n  while (index--) {\n    var key = objProps[index];\n    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {\n      return false;\n    }\n  }\n  // Assume cyclic values are equal.\n  var stacked = stack.get(object);\n  if (stacked && stack.get(other)) {\n    return stacked == other;\n  }\n  var result = true;\n  stack.set(object, other);\n  stack.set(other, object);\n\n  var skipCtor = isPartial;\n  while (++index < objLength) {\n    key = objProps[index];\n    var objValue = object[key],\n        othValue = other[key];\n\n    if (customizer) {\n      var compared = isPartial\n        ? customizer(othValue, objValue, key, other, object, stack)\n        : customizer(objValue, othValue, key, object, other, stack);\n    }\n    // Recursively compare objects (susceptible to call stack limits).\n    if (!(compared === undefined\n          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))\n          : compared\n        )) {\n      result = false;\n      break;\n    }\n    skipCtor || (skipCtor = key == 'constructor');\n  }\n  if (result && !skipCtor) {\n    var objCtor = object.constructor,\n        othCtor = other.constructor;\n\n    // Non `Object` object instances with different constructors are not equal.\n    if (objCtor != othCtor &&\n        ('constructor' in object && 'constructor' in other) &&\n        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&\n          typeof othCtor == 'function' && othCtor instanceof othCtor)) {\n      result = false;\n    }\n  }\n  stack['delete'](object);\n  stack['delete'](other);\n  return result;\n}\n\nmodule.exports = equalObjects;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_equalObjects.js?");

/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */\nvar freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n\nmodule.exports = freeGlobal;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_freeGlobal.js?");

/***/ }),

/***/ "./node_modules/lodash/_getAllKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getAllKeys.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var overArg = __webpack_require__(/*! ./_overArg */ \"./node_modules/lodash/_overArg.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeKeys = overArg(Object.keys, Object);\n\nmodule.exports = nativeKeys;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_getAllKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the value at `key` of `object`.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction getValue(object, key) {\n  return object == null ? undefined : object[key];\n}\n\nmodule.exports = getValue;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_getNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var overArg = __webpack_require__(/*! ./_overArg */ \"./node_modules/lodash/_overArg.js\");\n\n/** Built-in value references. */\nvar getPrototype = overArg(Object.getPrototypeOf, Object);\n\nmodule.exports = getPrototype;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_getPrototype.js?");

/***/ }),

/***/ "./node_modules/lodash/_getTag.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/**\n * Converts `value` to a string using `Object.prototype.toString`.\n *\n * @private\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n */\nfunction objectToString(value) {\n  return nativeObjectToString.call(value);\n}\n\nmodule.exports = objectToString;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_getTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_initCloneObject.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_initCloneObject.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseCreate = __webpack_require__(/*! ./_baseCreate */ \"./node_modules/lodash/_baseCreate.js\"),\n    getPrototype = __webpack_require__(/*! ./_getPrototype */ \"./node_modules/lodash/_getPrototype.js\"),\n    isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\");\n\n/**\n * Initializes an object clone.\n *\n * @private\n * @param {Object} object The object to clone.\n * @returns {Object} Returns the initialized clone.\n */\nfunction initCloneObject(object) {\n  return (typeof object.constructor == 'function' && !isPrototype(object))\n    ? baseCreate(getPrototype(object))\n    : {};\n}\n\nmodule.exports = initCloneObject;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_initCloneObject.js?");

/***/ }),

/***/ "./node_modules/lodash/_isIterateeCall.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_isIterateeCall.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `false`.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {boolean} Returns `false`.\n * @example\n *\n * _.times(2, _.stubFalse);\n * // => [false, false]\n */\nfunction stubFalse() {\n  return false;\n}\n\nmodule.exports = stubFalse;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_isIterateeCall.js?");

/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `false`.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {boolean} Returns `false`.\n * @example\n *\n * _.times(2, _.stubFalse);\n * // => [false, false]\n */\nfunction stubFalse() {\n  return false;\n}\n\nmodule.exports = stubFalse;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_isPrototype.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes all key-value entries from the list cache.\n *\n * @private\n * @name clear\n * @memberOf ListCache\n */\nfunction listCacheClear() {\n  this.__data__ = [];\n  this.size = 0;\n}\n\nmodule.exports = listCacheClear;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_listCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/** Used for built-in method references. */\nvar arrayProto = Array.prototype;\n\n/** Built-in value references. */\nvar splice = arrayProto.splice;\n\n/**\n * Removes `key` and its value from the list cache.\n *\n * @private\n * @name delete\n * @memberOf ListCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction listCacheDelete(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    return false;\n  }\n  var lastIndex = data.length - 1;\n  if (index == lastIndex) {\n    data.pop();\n  } else {\n    splice.call(data, index, 1);\n  }\n  --this.size;\n  return true;\n}\n\nmodule.exports = listCacheDelete;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_listCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Gets the list cache value for `key`.\n *\n * @private\n * @name get\n * @memberOf ListCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction listCacheGet(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  return index < 0 ? undefined : data[index][1];\n}\n\nmodule.exports = listCacheGet;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_listCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Checks if a list cache value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf ListCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction listCacheHas(key) {\n  return assocIndexOf(this.__data__, key) > -1;\n}\n\nmodule.exports = listCacheHas;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_listCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Sets the list cache `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf ListCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the list cache instance.\n */\nfunction listCacheSet(key, value) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    ++this.size;\n    data.push([key, value]);\n  } else {\n    data[index][1] = value;\n  }\n  return this;\n}\n\nmodule.exports = listCacheSet;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_listCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_memoizeCapped.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_memoizeCapped.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns the first argument it receives.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Util\n * @param {*} value Any value.\n * @returns {*} Returns `value`.\n * @example\n *\n * var object = { 'a': 1 };\n *\n * console.log(_.identity(object) === object);\n * // => true\n */\nfunction identity(value) {\n  return value;\n}\n\nmodule.exports = identity;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_memoizeCapped.js?");

/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a unary function that invokes `func` with its argument transformed.\n *\n * @private\n * @param {Function} func The function to wrap.\n * @param {Function} transform The argument transform.\n * @returns {Function} Returns the new function.\n */\nfunction overArg(func, transform) {\n  return function(arg) {\n    return func(transform(arg));\n  };\n}\n\nmodule.exports = overArg;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_overArg.js?");

/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var apply = __webpack_require__(/*! ./_apply */ \"./node_modules/lodash/_apply.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMax = Math.max;\n\n/**\n * A specialized version of `baseRest` which transforms the rest array.\n *\n * @private\n * @param {Function} func The function to apply a rest parameter to.\n * @param {number} [start=func.length-1] The start position of the rest parameter.\n * @param {Function} transform The rest array transform.\n * @returns {Function} Returns the new function.\n */\nfunction overRest(func, start, transform) {\n  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);\n  return function() {\n    var args = arguments,\n        index = -1,\n        length = nativeMax(args.length - start, 0),\n        array = Array(length);\n\n    while (++index < length) {\n      array[index] = args[start + index];\n    }\n    index = -1;\n    var otherArgs = Array(start + 1);\n    while (++index < start) {\n      otherArgs[index] = args[index];\n    }\n    otherArgs[start] = transform(array);\n    return apply(func, this, otherArgs);\n  };\n}\n\nmodule.exports = overRest;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_overRest.js?");

/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `self`. */\nvar freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n\n/** Used as a reference to the global object. */\nvar root = freeGlobal || freeSelf || Function('return this')();\n\nmodule.exports = root;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_root.js?");

/***/ }),

/***/ "./node_modules/lodash/_safeGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_safeGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the value at `key`, unless `key` is \"__proto__\".\n *\n * @private\n * @param {Object} object The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction safeGet(object, key) {\n  if (key == '__proto__') {\n    return;\n  }\n\n  return object[key];\n}\n\nmodule.exports = safeGet;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_safeGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns the first argument it receives.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Util\n * @param {*} value Any value.\n * @returns {*} Returns `value`.\n * @example\n *\n * var object = { 'a': 1 };\n *\n * console.log(_.identity(object) === object);\n * // => true\n */\nfunction identity(value) {\n  return value;\n}\n\nmodule.exports = identity;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_setToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_stringToPath.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_stringToPath.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ \"./node_modules/lodash/_memoizeCapped.js\");\n\n/** Used to match property names within property paths. */\nvar rePropName = /[^.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))/g;\n\n/** Used to match backslashes in property paths. */\nvar reEscapeChar = /\\\\(\\\\)?/g;\n\n/**\n * Converts `string` to a property path array.\n *\n * @private\n * @param {string} string The string to convert.\n * @returns {Array} Returns the property path array.\n */\nvar stringToPath = memoizeCapped(function(string) {\n  var result = [];\n  if (string.charCodeAt(0) === 46 /* . */) {\n    result.push('');\n  }\n  string.replace(rePropName, function(match, number, quote, subString) {\n    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));\n  });\n  return result;\n});\n\nmodule.exports = stringToPath;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_stringToPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_toKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_toKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns the first argument it receives.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Util\n * @param {*} value Any value.\n * @returns {*} Returns `value`.\n * @example\n *\n * var object = { 'a': 1 };\n *\n * console.log(_.identity(object) === object);\n * // => true\n */\nfunction identity(value) {\n  return value;\n}\n\nmodule.exports = identity;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/_toKey.js?");

/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Performs a\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * comparison between two values to determine if they are equivalent.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * var object = { 'a': 1 };\n * var other = { 'a': 1 };\n *\n * _.eq(object, object);\n * // => true\n *\n * _.eq(object, other);\n * // => false\n *\n * _.eq('a', 'a');\n * // => true\n *\n * _.eq('a', Object('a'));\n * // => false\n *\n * _.eq(NaN, NaN);\n * // => true\n */\nfunction eq(value, other) {\n  return value === other || (value !== value && other !== other);\n}\n\nmodule.exports = eq;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/eq.js?");

/***/ }),

/***/ "./node_modules/lodash/get.js":
/*!************************************!*\
  !*** ./node_modules/lodash/get.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGet = __webpack_require__(/*! ./_baseGet */ \"./node_modules/lodash/_baseGet.js\");\n\n/**\n * Gets the value at `path` of `object`. If the resolved value is\n * `undefined`, the `defaultValue` is returned in its place.\n *\n * @static\n * @memberOf _\n * @since 3.7.0\n * @category Object\n * @param {Object} object The object to query.\n * @param {Array|string} path The path of the property to get.\n * @param {*} [defaultValue] The value returned for `undefined` resolved values.\n * @returns {*} Returns the resolved value.\n * @example\n *\n * var object = { 'a': [{ 'b': { 'c': 3 } }] };\n *\n * _.get(object, 'a[0].b.c');\n * // => 3\n *\n * _.get(object, ['a', '0', 'b', 'c']);\n * // => 3\n *\n * _.get(object, 'a.b.c', 'default');\n * // => 'default'\n */\nfunction get(object, path, defaultValue) {\n  var result = object == null ? undefined : baseGet(object, path);\n  return result === undefined ? defaultValue : result;\n}\n\nmodule.exports = get;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/get.js?");

/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns the first argument it receives.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Util\n * @param {*} value Any value.\n * @returns {*} Returns `value`.\n * @example\n *\n * var object = { 'a': 1 };\n *\n * console.log(_.identity(object) === object);\n * // => true\n */\nfunction identity(value) {\n  return value;\n}\n\nmodule.exports = identity;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/identity.js?");

/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `false`.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {boolean} Returns `false`.\n * @example\n *\n * _.times(2, _.stubFalse);\n * // => [false, false]\n */\nfunction stubFalse() {\n  return false;\n}\n\nmodule.exports = stubFalse;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is classified as an `Array` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array, else `false`.\n * @example\n *\n * _.isArray([1, 2, 3]);\n * // => true\n *\n * _.isArray(document.body.children);\n * // => false\n *\n * _.isArray('abc');\n * // => false\n *\n * _.isArray(_.noop);\n * // => false\n */\nvar isArray = Array.isArray;\n\nmodule.exports = isArray;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isArray.js?");

/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\");\n\n/**\n * Checks if `value` is array-like. A value is considered array-like if it's\n * not a function and has a `value.length` that's an integer greater than or\n * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is array-like, else `false`.\n * @example\n *\n * _.isArrayLike([1, 2, 3]);\n * // => true\n *\n * _.isArrayLike(document.body.children);\n * // => true\n *\n * _.isArrayLike('abc');\n * // => true\n *\n * _.isArrayLike(_.noop);\n * // => false\n */\nfunction isArrayLike(value) {\n  return value != null && isLength(value.length) && !isFunction(value);\n}\n\nmodule.exports = isArrayLike;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isArrayLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isArrayLikeObject.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/isArrayLikeObject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/**\n * This method is like `_.isArrayLike` except that it also checks if `value`\n * is an object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array-like object,\n *  else `false`.\n * @example\n *\n * _.isArrayLikeObject([1, 2, 3]);\n * // => true\n *\n * _.isArrayLikeObject(document.body.children);\n * // => true\n *\n * _.isArrayLikeObject('abc');\n * // => false\n *\n * _.isArrayLikeObject(_.noop);\n * // => false\n */\nfunction isArrayLikeObject(value) {\n  return isObjectLike(value) && isArrayLike(value);\n}\n\nmodule.exports = isArrayLikeObject;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isArrayLikeObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `false`.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {boolean} Returns `false`.\n * @example\n *\n * _.times(2, _.stubFalse);\n * // => [false, false]\n */\nfunction stubFalse() {\n  return false;\n}\n\nmodule.exports = stubFalse;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/isEmpty.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isEmpty.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseKeys = __webpack_require__(/*! ./_baseKeys */ \"./node_modules/lodash/_baseKeys.js\"),\n    getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\"),\n    isTypedArray = __webpack_require__(/*! ./isTypedArray */ \"./node_modules/lodash/isTypedArray.js\");\n\n/** `Object#toString` result references. */\nvar mapTag = '[object Map]',\n    setTag = '[object Set]';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Checks if `value` is an empty object, collection, map, or set.\n *\n * Objects are considered empty if they have no own enumerable string keyed\n * properties.\n *\n * Array-like values such as `arguments` objects, arrays, buffers, strings, or\n * jQuery-like collections are considered empty if they have a `length` of `0`.\n * Similarly, maps and sets are considered empty if they have a `size` of `0`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is empty, else `false`.\n * @example\n *\n * _.isEmpty(null);\n * // => true\n *\n * _.isEmpty(true);\n * // => true\n *\n * _.isEmpty(1);\n * // => true\n *\n * _.isEmpty([1, 2, 3]);\n * // => false\n *\n * _.isEmpty({ 'a': 1 });\n * // => false\n */\nfunction isEmpty(value) {\n  if (value == null) {\n    return true;\n  }\n  if (isArrayLike(value) &&\n      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||\n        isBuffer(value) || isTypedArray(value) || isArguments(value))) {\n    return !value.length;\n  }\n  var tag = getTag(value);\n  if (tag == mapTag || tag == setTag) {\n    return !value.size;\n  }\n  if (isPrototype(value)) {\n    return !baseKeys(value).length;\n  }\n  for (var key in value) {\n    if (hasOwnProperty.call(value, key)) {\n      return false;\n    }\n  }\n  return true;\n}\n\nmodule.exports = isEmpty;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isEmpty.js?");

/***/ }),

/***/ "./node_modules/lodash/isEqual.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isEqual.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ \"./node_modules/lodash/_baseIsEqual.js\");\n\n/**\n * Performs a deep comparison between two values to determine if they are\n * equivalent.\n *\n * **Note:** This method supports comparing arrays, array buffers, booleans,\n * date objects, error objects, maps, numbers, `Object` objects, regexes,\n * sets, strings, symbols, and typed arrays. `Object` objects are compared\n * by their own, not inherited, enumerable properties. Functions and DOM\n * nodes are compared by strict equality, i.e. `===`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * var object = { 'a': 1 };\n * var other = { 'a': 1 };\n *\n * _.isEqual(object, other);\n * // => true\n *\n * object === other;\n * // => false\n */\nfunction isEqual(value, other) {\n  return baseIsEqual(value, other);\n}\n\nmodule.exports = isEqual;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isEqual.js?");

/***/ }),

/***/ "./node_modules/lodash/isEqualWith.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isEqualWith.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ \"./node_modules/lodash/_baseIsEqual.js\");\n\n/**\n * This method is like `_.isEqual` except that it accepts `customizer` which\n * is invoked to compare values. If `customizer` returns `undefined`, comparisons\n * are handled by the method instead. The `customizer` is invoked with up to\n * six arguments: (objValue, othValue [, index|key, object, other, stack]).\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @param {Function} [customizer] The function to customize comparisons.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * function isGreeting(value) {\n *   return /^h(?:i|ello)$/.test(value);\n * }\n *\n * function customizer(objValue, othValue) {\n *   if (isGreeting(objValue) && isGreeting(othValue)) {\n *     return true;\n *   }\n * }\n *\n * var array = ['hello', 'goodbye'];\n * var other = ['hi', 'goodbye'];\n *\n * _.isEqualWith(array, other, customizer);\n * // => true\n */\nfunction isEqualWith(value, other, customizer) {\n  customizer = typeof customizer == 'function' ? customizer : undefined;\n  var result = customizer ? customizer(value, other) : undefined;\n  return result === undefined ? baseIsEqual(value, other, undefined, customizer) : !!result;\n}\n\nmodule.exports = isEqualWith;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isEqualWith.js?");

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/** `Object#toString` result references. */\nvar asyncTag = '[object AsyncFunction]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    proxyTag = '[object Proxy]';\n\n/**\n * Checks if `value` is classified as a `Function` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a function, else `false`.\n * @example\n *\n * _.isFunction(_);\n * // => true\n *\n * _.isFunction(/abc/);\n * // => false\n */\nfunction isFunction(value) {\n  if (!isObject(value)) {\n    return false;\n  }\n  // The use of `Object#toString` avoids issues with the `typeof` operator\n  // in Safari 9 which returns 'object' for typed arrays and other constructors.\n  var tag = baseGetTag(value);\n  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;\n}\n\nmodule.exports = isFunction;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isFunction.js?");

/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/**\n * Checks if `value` is a valid array-like length.\n *\n * **Note:** This method is loosely based on\n * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.\n * @example\n *\n * _.isLength(3);\n * // => true\n *\n * _.isLength(Number.MIN_VALUE);\n * // => false\n *\n * _.isLength(Infinity);\n * // => false\n *\n * _.isLength('3');\n * // => false\n */\nfunction isLength(value) {\n  return typeof value == 'number' &&\n    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;\n}\n\nmodule.exports = isLength;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isLength.js?");

/***/ }),

/***/ "./node_modules/lodash/isNil.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isNil.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is `null` or `undefined`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is nullish, else `false`.\n * @example\n *\n * _.isNil(null);\n * // => true\n *\n * _.isNil(void 0);\n * // => true\n *\n * _.isNil(NaN);\n * // => false\n */\nfunction isNil(value) {\n  return value == null;\n}\n\nmodule.exports = isNil;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isNil.js?");

/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is the\n * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)\n * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an object, else `false`.\n * @example\n *\n * _.isObject({});\n * // => true\n *\n * _.isObject([1, 2, 3]);\n * // => true\n *\n * _.isObject(_.noop);\n * // => true\n *\n * _.isObject(null);\n * // => false\n */\nfunction isObject(value) {\n  var type = typeof value;\n  return value != null && (type == 'object' || type == 'function');\n}\n\nmodule.exports = isObject;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is object-like. A value is object-like if it's not `null`\n * and has a `typeof` result of \"object\".\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n * @example\n *\n * _.isObjectLike({});\n * // => true\n *\n * _.isObjectLike([1, 2, 3]);\n * // => true\n *\n * _.isObjectLike(_.noop);\n * // => false\n *\n * _.isObjectLike(null);\n * // => false\n */\nfunction isObjectLike(value) {\n  return value != null && typeof value == 'object';\n}\n\nmodule.exports = isObjectLike;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isObjectLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/isPlainObject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    getPrototype = __webpack_require__(/*! ./_getPrototype */ \"./node_modules/lodash/_getPrototype.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar objectTag = '[object Object]';\n\n/** Used for built-in method references. */\nvar funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Used to infer the `Object` constructor. */\nvar objectCtorString = funcToString.call(Object);\n\n/**\n * Checks if `value` is a plain object, that is, an object created by the\n * `Object` constructor or one with a `[[Prototype]]` of `null`.\n *\n * @static\n * @memberOf _\n * @since 0.8.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n * }\n *\n * _.isPlainObject(new Foo);\n * // => false\n *\n * _.isPlainObject([1, 2, 3]);\n * // => false\n *\n * _.isPlainObject({ 'x': 0, 'y': 0 });\n * // => true\n *\n * _.isPlainObject(Object.create(null));\n * // => true\n */\nfunction isPlainObject(value) {\n  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {\n    return false;\n  }\n  var proto = getPrototype(value);\n  if (proto === null) {\n    return true;\n  }\n  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;\n  return typeof Ctor == 'function' && Ctor instanceof Ctor &&\n    funcToString.call(Ctor) == objectCtorString;\n}\n\nmodule.exports = isPlainObject;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isPlainObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `false`.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {boolean} Returns `false`.\n * @example\n *\n * _.times(2, _.stubFalse);\n * // => [false, false]\n */\nfunction stubFalse() {\n  return false;\n}\n\nmodule.exports = stubFalse;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isSymbol.js?");

/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `false`.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {boolean} Returns `false`.\n * @example\n *\n * _.times(2, _.stubFalse);\n * // => [false, false]\n */\nfunction stubFalse() {\n  return false;\n}\n\nmodule.exports = stubFalse;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/isTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var overArg = __webpack_require__(/*! ./_overArg */ \"./node_modules/lodash/_overArg.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeKeys = overArg(Object.keys, Object);\n\nmodule.exports = nativeKeys;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/keys.js?");

/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/keysIn.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This function is like\n * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)\n * except that it includes inherited enumerable properties.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction nativeKeysIn(object) {\n  var result = [];\n  if (object != null) {\n    for (var key in Object(object)) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = nativeKeysIn;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/keysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/mapValues.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/mapValues.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\"),\n    baseForOwn = __webpack_require__(/*! ./_baseForOwn */ \"./node_modules/lodash/_baseForOwn.js\"),\n    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ \"./node_modules/lodash/_baseIteratee.js\");\n\n/**\n * Creates an object with the same keys as `object` and values generated\n * by running each own enumerable string keyed property of `object` thru\n * `iteratee`. The iteratee is invoked with three arguments:\n * (value, key, object).\n *\n * @static\n * @memberOf _\n * @since 2.4.0\n * @category Object\n * @param {Object} object The object to iterate over.\n * @param {Function} [iteratee=_.identity] The function invoked per iteration.\n * @returns {Object} Returns the new mapped object.\n * @see _.mapKeys\n * @example\n *\n * var users = {\n *   'fred':    { 'user': 'fred',    'age': 40 },\n *   'pebbles': { 'user': 'pebbles', 'age': 1 }\n * };\n *\n * _.mapValues(users, function(o) { return o.age; });\n * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)\n *\n * // The `_.property` iteratee shorthand.\n * _.mapValues(users, 'age');\n * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)\n */\nfunction mapValues(object, iteratee) {\n  var result = {};\n  iteratee = baseIteratee(iteratee, 3);\n\n  baseForOwn(object, function(value, key, object) {\n    baseAssignValue(result, key, iteratee(value, key, object));\n  });\n  return result;\n}\n\nmodule.exports = mapValues;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/mapValues.js?");

/***/ }),

/***/ "./node_modules/lodash/merge.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/merge.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseMerge = __webpack_require__(/*! ./_baseMerge */ \"./node_modules/lodash/_baseMerge.js\"),\n    createAssigner = __webpack_require__(/*! ./_createAssigner */ \"./node_modules/lodash/_createAssigner.js\");\n\n/**\n * This method is like `_.assign` except that it recursively merges own and\n * inherited enumerable string keyed properties of source objects into the\n * destination object. Source properties that resolve to `undefined` are\n * skipped if a destination value exists. Array and plain object properties\n * are merged recursively. Other objects and value types are overridden by\n * assignment. Source objects are applied from left to right. Subsequent\n * sources overwrite property assignments of previous sources.\n *\n * **Note:** This method mutates `object`.\n *\n * @static\n * @memberOf _\n * @since 0.5.0\n * @category Object\n * @param {Object} object The destination object.\n * @param {...Object} [sources] The source objects.\n * @returns {Object} Returns `object`.\n * @example\n *\n * var object = {\n *   'a': [{ 'b': 2 }, { 'd': 4 }]\n * };\n *\n * var other = {\n *   'a': [{ 'c': 3 }, { 'e': 5 }]\n * };\n *\n * _.merge(object, other);\n * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }\n */\nvar merge = createAssigner(function(object, source, srcIndex) {\n  baseMerge(object, source, srcIndex);\n});\n\nmodule.exports = merge;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/merge.js?");

/***/ }),

/***/ "./node_modules/lodash/toPath.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/toPath.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayMap = __webpack_require__(/*! ./_arrayMap */ \"./node_modules/lodash/_arrayMap.js\"),\n    copyArray = __webpack_require__(/*! ./_copyArray */ \"./node_modules/lodash/_copyArray.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\"),\n    stringToPath = __webpack_require__(/*! ./_stringToPath */ \"./node_modules/lodash/_stringToPath.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\"),\n    toString = __webpack_require__(/*! ./toString */ \"./node_modules/lodash/toString.js\");\n\n/**\n * Converts `value` to a property path array.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Util\n * @param {*} value The value to convert.\n * @returns {Array} Returns the new property path array.\n * @example\n *\n * _.toPath('a.b.c');\n * // => ['a', 'b', 'c']\n *\n * _.toPath('a[0].b.c');\n * // => ['a', '0', 'b', 'c']\n */\nfunction toPath(value) {\n  if (isArray(value)) {\n    return arrayMap(value, toKey);\n  }\n  return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));\n}\n\nmodule.exports = toPath;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/toPath.js?");

/***/ }),

/***/ "./node_modules/lodash/toPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/toPlainObject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\");\n\n/**\n * Converts `value` to a plain object flattening inherited enumerable string\n * keyed properties of `value` to own properties of the plain object.\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category Lang\n * @param {*} value The value to convert.\n * @returns {Object} Returns the converted plain object.\n * @example\n *\n * function Foo() {\n *   this.b = 2;\n * }\n *\n * Foo.prototype.c = 3;\n *\n * _.assign({ 'a': 1 }, new Foo);\n * // => { 'a': 1, 'b': 2 }\n *\n * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));\n * // => { 'a': 1, 'b': 2, 'c': 3 }\n */\nfunction toPlainObject(value) {\n  return copyObject(value, keysIn(value));\n}\n\nmodule.exports = toPlainObject;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/toPlainObject.js?");

/***/ }),

/***/ "./node_modules/lodash/toString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns the first argument it receives.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Util\n * @param {*} value Any value.\n * @returns {*} Returns `value`.\n * @example\n *\n * var object = { 'a': 1 };\n *\n * console.log(_.identity(object) === object);\n * // => true\n */\nfunction identity(value) {\n  return value;\n}\n\nmodule.exports = identity;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/lodash/toString.js?");

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nobject-assign\n(c) Sindre Sorhus\n@license MIT\n*/\n\n\n/* eslint-disable no-unused-vars */\nvar getOwnPropertySymbols = Object.getOwnPropertySymbols;\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar propIsEnumerable = Object.prototype.propertyIsEnumerable;\n\nfunction toObject(val) {\n\tif (val === null || val === undefined) {\n\t\tthrow new TypeError('Object.assign cannot be called with null or undefined');\n\t}\n\n\treturn Object(val);\n}\n\nfunction shouldUseNative() {\n\ttry {\n\t\tif (!Object.assign) {\n\t\t\treturn false;\n\t\t}\n\n\t\t// Detect buggy property enumeration order in older V8 versions.\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=4118\n\t\tvar test1 = new String('abc');  // eslint-disable-line no-new-wrappers\n\t\ttest1[5] = 'de';\n\t\tif (Object.getOwnPropertyNames(test1)[0] === '5') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test2 = {};\n\t\tfor (var i = 0; i < 10; i++) {\n\t\t\ttest2['_' + String.fromCharCode(i)] = i;\n\t\t}\n\t\tvar order2 = Object.getOwnPropertyNames(test2).map(function (n) {\n\t\t\treturn test2[n];\n\t\t});\n\t\tif (order2.join('') !== '0123456789') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test3 = {};\n\t\t'abcdefghijklmnopqrst'.split('').forEach(function (letter) {\n\t\t\ttest3[letter] = letter;\n\t\t});\n\t\tif (Object.keys(Object.assign({}, test3)).join('') !==\n\t\t\t\t'abcdefghijklmnopqrst') {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t} catch (err) {\n\t\t// We don't expect any of the above to throw, but better to be safe.\n\t\treturn false;\n\t}\n}\n\nmodule.exports = shouldUseNative() ? Object.assign : function (target, source) {\n\tvar from;\n\tvar to = toObject(target);\n\tvar symbols;\n\n\tfor (var s = 1; s < arguments.length; s++) {\n\t\tfrom = Object(arguments[s]);\n\n\t\tfor (var key in from) {\n\t\t\tif (hasOwnProperty.call(from, key)) {\n\t\t\t\tto[key] = from[key];\n\t\t\t}\n\t\t}\n\n\t\tif (getOwnPropertySymbols) {\n\t\t\tsymbols = getOwnPropertySymbols(from);\n\t\t\tfor (var i = 0; i < symbols.length; i++) {\n\t\t\t\tif (propIsEnumerable.call(from, symbols[i])) {\n\t\t\t\t\tto[symbols[i]] = from[symbols[i]];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn to;\n};\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/object-assign/index.js?");

/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar printWarning = function() {};\n\nif (true) {\n  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ \"./node_modules/prop-types/lib/ReactPropTypesSecret.js\");\n  var loggedTypeFailures = {};\n  var has = Function.call.bind(Object.prototype.hasOwnProperty);\n\n  printWarning = function(text) {\n    var message = 'Warning: ' + text;\n    if (typeof console !== 'undefined') {\n      console.error(message);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  };\n}\n\n/**\n * Assert that the values match with the type specs.\n * Error messages are memorized and will only be shown once.\n *\n * @param {object} typeSpecs Map of name to a ReactPropType\n * @param {object} values Runtime values that need to be type-checked\n * @param {string} location e.g. \"prop\", \"context\", \"child context\"\n * @param {string} componentName Name of the component for error messages.\n * @param {?Function} getStack Returns the component stack.\n * @private\n */\nfunction checkPropTypes(typeSpecs, values, location, componentName, getStack) {\n  if (true) {\n    for (var typeSpecName in typeSpecs) {\n      if (has(typeSpecs, typeSpecName)) {\n        var error;\n        // Prop type validation may throw. In case they do, we don't want to\n        // fail the render phase where it didn't fail before. So we log it.\n        // After these have been cleaned up, we'll let them throw.\n        try {\n          // This is intentionally an invariant that gets caught. It's the same\n          // behavior as without this statement except with a better message.\n          if (typeof typeSpecs[typeSpecName] !== 'function') {\n            var err = Error(\n              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +\n              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'\n            );\n            err.name = 'Invariant Violation';\n            throw err;\n          }\n          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);\n        } catch (ex) {\n          error = ex;\n        }\n        if (error && !(error instanceof Error)) {\n          printWarning(\n            (componentName || 'React class') + ': type specification of ' +\n            location + ' `' + typeSpecName + '` is invalid; the type checker ' +\n            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +\n            'You may have forgotten to pass an argument to the type checker ' +\n            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +\n            'shape all require an argument).'\n          );\n        }\n        if (error instanceof Error && !(error.message in loggedTypeFailures)) {\n          // Only monitor this failure once because there tends to be a lot of the\n          // same error.\n          loggedTypeFailures[error.message] = true;\n\n          var stack = getStack ? getStack() : '';\n\n          printWarning(\n            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')\n          );\n        }\n      }\n    }\n  }\n}\n\n/**\n * Resets warning cache when testing.\n *\n * @private\n */\ncheckPropTypes.resetWarningCache = function() {\n  if (true) {\n    loggedTypeFailures = {};\n  }\n}\n\nmodule.exports = checkPropTypes;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/prop-types/checkPropTypes.js?");

/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar ReactIs = __webpack_require__(/*! react-is */ \"./node_modules/react-is/index.js\");\nvar assign = __webpack_require__(/*! object-assign */ \"./node_modules/object-assign/index.js\");\n\nvar ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ \"./node_modules/prop-types/lib/ReactPropTypesSecret.js\");\nvar checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ \"./node_modules/prop-types/checkPropTypes.js\");\n\nvar has = Function.call.bind(Object.prototype.hasOwnProperty);\nvar printWarning = function() {};\n\nif (true) {\n  printWarning = function(text) {\n    var message = 'Warning: ' + text;\n    if (typeof console !== 'undefined') {\n      console.error(message);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  };\n}\n\nfunction emptyFunctionThatReturnsNull() {\n  return null;\n}\n\nmodule.exports = function(isValidElement, throwOnDirectAccess) {\n  /* global Symbol */\n  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;\n  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.\n\n  /**\n   * Returns the iterator method function contained on the iterable object.\n   *\n   * Be sure to invoke the function with the iterable as context:\n   *\n   *     var iteratorFn = getIteratorFn(myIterable);\n   *     if (iteratorFn) {\n   *       var iterator = iteratorFn.call(myIterable);\n   *       ...\n   *     }\n   *\n   * @param {?object} maybeIterable\n   * @return {?function}\n   */\n  function getIteratorFn(maybeIterable) {\n    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);\n    if (typeof iteratorFn === 'function') {\n      return iteratorFn;\n    }\n  }\n\n  /**\n   * Collection of methods that allow declaration and validation of props that are\n   * supplied to React components. Example usage:\n   *\n   *   var Props = require('ReactPropTypes');\n   *   var MyArticle = React.createClass({\n   *     propTypes: {\n   *       // An optional string prop named \"description\".\n   *       description: Props.string,\n   *\n   *       // A required enum prop named \"category\".\n   *       category: Props.oneOf(['News','Photos']).isRequired,\n   *\n   *       // A prop named \"dialog\" that requires an instance of Dialog.\n   *       dialog: Props.instanceOf(Dialog).isRequired\n   *     },\n   *     render: function() { ... }\n   *   });\n   *\n   * A more formal specification of how these methods are used:\n   *\n   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)\n   *   decl := ReactPropTypes.{type}(.isRequired)?\n   *\n   * Each and every declaration produces a function with the same signature. This\n   * allows the creation of custom validation functions. For example:\n   *\n   *  var MyLink = React.createClass({\n   *    propTypes: {\n   *      // An optional string or URI prop named \"href\".\n   *      href: function(props, propName, componentName) {\n   *        var propValue = props[propName];\n   *        if (propValue != null && typeof propValue !== 'string' &&\n   *            !(propValue instanceof URI)) {\n   *          return new Error(\n   *            'Expected a string or an URI for ' + propName + ' in ' +\n   *            componentName\n   *          );\n   *        }\n   *      }\n   *    },\n   *    render: function() {...}\n   *  });\n   *\n   * @internal\n   */\n\n  var ANONYMOUS = '<<anonymous>>';\n\n  // Important!\n  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.\n  var ReactPropTypes = {\n    array: createPrimitiveTypeChecker('array'),\n    bool: createPrimitiveTypeChecker('boolean'),\n    func: createPrimitiveTypeChecker('function'),\n    number: createPrimitiveTypeChecker('number'),\n    object: createPrimitiveTypeChecker('object'),\n    string: createPrimitiveTypeChecker('string'),\n    symbol: createPrimitiveTypeChecker('symbol'),\n\n    any: createAnyTypeChecker(),\n    arrayOf: createArrayOfTypeChecker,\n    element: createElementTypeChecker(),\n    elementType: createElementTypeTypeChecker(),\n    instanceOf: createInstanceTypeChecker,\n    node: createNodeChecker(),\n    objectOf: createObjectOfTypeChecker,\n    oneOf: createEnumTypeChecker,\n    oneOfType: createUnionTypeChecker,\n    shape: createShapeTypeChecker,\n    exact: createStrictShapeTypeChecker,\n  };\n\n  /**\n   * inlined Object.is polyfill to avoid requiring consumers ship their own\n   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is\n   */\n  /*eslint-disable no-self-compare*/\n  function is(x, y) {\n    // SameValue algorithm\n    if (x === y) {\n      // Steps 1-5, 7-10\n      // Steps 6.b-6.e: +0 != -0\n      return x !== 0 || 1 / x === 1 / y;\n    } else {\n      // Step 6.a: NaN == NaN\n      return x !== x && y !== y;\n    }\n  }\n  /*eslint-enable no-self-compare*/\n\n  /**\n   * We use an Error-like object for backward compatibility as people may call\n   * PropTypes directly and inspect their output. However, we don't use real\n   * Errors anymore. We don't inspect their stack anyway, and creating them\n   * is prohibitively expensive if they are created too often, such as what\n   * happens in oneOfType() for any type before the one that matched.\n   */\n  function PropTypeError(message) {\n    this.message = message;\n    this.stack = '';\n  }\n  // Make `instanceof Error` still work for returned errors.\n  PropTypeError.prototype = Error.prototype;\n\n  function createChainableTypeChecker(validate) {\n    if (true) {\n      var manualPropTypeCallCache = {};\n      var manualPropTypeWarningCount = 0;\n    }\n    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {\n      componentName = componentName || ANONYMOUS;\n      propFullName = propFullName || propName;\n\n      if (secret !== ReactPropTypesSecret) {\n        if (throwOnDirectAccess) {\n          // New behavior only for users of `prop-types` package\n          var err = new Error(\n            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +\n            'Use `PropTypes.checkPropTypes()` to call them. ' +\n            'Read more at http://fb.me/use-check-prop-types'\n          );\n          err.name = 'Invariant Violation';\n          throw err;\n        } else if ( true && typeof console !== 'undefined') {\n          // Old behavior for people using React.PropTypes\n          var cacheKey = componentName + ':' + propName;\n          if (\n            !manualPropTypeCallCache[cacheKey] &&\n            // Avoid spamming the console because they are often not actionable except for lib authors\n            manualPropTypeWarningCount < 3\n          ) {\n            printWarning(\n              'You are manually calling a React.PropTypes validation ' +\n              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +\n              'and will throw in the standalone `prop-types` package. ' +\n              'You may be seeing this warning due to a third-party PropTypes ' +\n              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'\n            );\n            manualPropTypeCallCache[cacheKey] = true;\n            manualPropTypeWarningCount++;\n          }\n        }\n      }\n      if (props[propName] == null) {\n        if (isRequired) {\n          if (props[propName] === null) {\n            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));\n          }\n          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));\n        }\n        return null;\n      } else {\n        return validate(props, propName, componentName, location, propFullName);\n      }\n    }\n\n    var chainedCheckType = checkType.bind(null, false);\n    chainedCheckType.isRequired = checkType.bind(null, true);\n\n    return chainedCheckType;\n  }\n\n  function createPrimitiveTypeChecker(expectedType) {\n    function validate(props, propName, componentName, location, propFullName, secret) {\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== expectedType) {\n        // `propValue` being instance of, say, date/regexp, pass the 'object'\n        // check, but we can offer a more precise error message here rather than\n        // 'of type `object`'.\n        var preciseType = getPreciseType(propValue);\n\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createAnyTypeChecker() {\n    return createChainableTypeChecker(emptyFunctionThatReturnsNull);\n  }\n\n  function createArrayOfTypeChecker(typeChecker) {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (typeof typeChecker !== 'function') {\n        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');\n      }\n      var propValue = props[propName];\n      if (!Array.isArray(propValue)) {\n        var propType = getPropType(propValue);\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));\n      }\n      for (var i = 0; i < propValue.length; i++) {\n        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);\n        if (error instanceof Error) {\n          return error;\n        }\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createElementTypeChecker() {\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      if (!isValidElement(propValue)) {\n        var propType = getPropType(propValue);\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createElementTypeTypeChecker() {\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      if (!ReactIs.isValidElementType(propValue)) {\n        var propType = getPropType(propValue);\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createInstanceTypeChecker(expectedClass) {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (!(props[propName] instanceof expectedClass)) {\n        var expectedClassName = expectedClass.name || ANONYMOUS;\n        var actualClassName = getClassName(props[propName]);\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createEnumTypeChecker(expectedValues) {\n    if (!Array.isArray(expectedValues)) {\n      if (true) {\n        if (arguments.length > 1) {\n          printWarning(\n            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +\n            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'\n          );\n        } else {\n          printWarning('Invalid argument supplied to oneOf, expected an array.');\n        }\n      }\n      return emptyFunctionThatReturnsNull;\n    }\n\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      for (var i = 0; i < expectedValues.length; i++) {\n        if (is(propValue, expectedValues[i])) {\n          return null;\n        }\n      }\n\n      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {\n        var type = getPreciseType(value);\n        if (type === 'symbol') {\n          return String(value);\n        }\n        return value;\n      });\n      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createObjectOfTypeChecker(typeChecker) {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (typeof typeChecker !== 'function') {\n        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');\n      }\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== 'object') {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));\n      }\n      for (var key in propValue) {\n        if (has(propValue, key)) {\n          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);\n          if (error instanceof Error) {\n            return error;\n          }\n        }\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createUnionTypeChecker(arrayOfTypeCheckers) {\n    if (!Array.isArray(arrayOfTypeCheckers)) {\n       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;\n      return emptyFunctionThatReturnsNull;\n    }\n\n    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {\n      var checker = arrayOfTypeCheckers[i];\n      if (typeof checker !== 'function') {\n        printWarning(\n          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +\n          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'\n        );\n        return emptyFunctionThatReturnsNull;\n      }\n    }\n\n    function validate(props, propName, componentName, location, propFullName) {\n      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {\n        var checker = arrayOfTypeCheckers[i];\n        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {\n          return null;\n        }\n      }\n\n      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createNodeChecker() {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (!isNode(props[propName])) {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createShapeTypeChecker(shapeTypes) {\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== 'object') {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));\n      }\n      for (var key in shapeTypes) {\n        var checker = shapeTypes[key];\n        if (!checker) {\n          continue;\n        }\n        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);\n        if (error) {\n          return error;\n        }\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createStrictShapeTypeChecker(shapeTypes) {\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== 'object') {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));\n      }\n      // We need to check all keys in case some are required but missing from\n      // props.\n      var allKeys = assign({}, props[propName], shapeTypes);\n      for (var key in allKeys) {\n        var checker = shapeTypes[key];\n        if (!checker) {\n          return new PropTypeError(\n            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +\n            '\\nBad object: ' + JSON.stringify(props[propName], null, '  ') +\n            '\\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')\n          );\n        }\n        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);\n        if (error) {\n          return error;\n        }\n      }\n      return null;\n    }\n\n    return createChainableTypeChecker(validate);\n  }\n\n  function isNode(propValue) {\n    switch (typeof propValue) {\n      case 'number':\n      case 'string':\n      case 'undefined':\n        return true;\n      case 'boolean':\n        return !propValue;\n      case 'object':\n        if (Array.isArray(propValue)) {\n          return propValue.every(isNode);\n        }\n        if (propValue === null || isValidElement(propValue)) {\n          return true;\n        }\n\n        var iteratorFn = getIteratorFn(propValue);\n        if (iteratorFn) {\n          var iterator = iteratorFn.call(propValue);\n          var step;\n          if (iteratorFn !== propValue.entries) {\n            while (!(step = iterator.next()).done) {\n              if (!isNode(step.value)) {\n                return false;\n              }\n            }\n          } else {\n            // Iterator will provide entry [k,v] tuples rather than values.\n            while (!(step = iterator.next()).done) {\n              var entry = step.value;\n              if (entry) {\n                if (!isNode(entry[1])) {\n                  return false;\n                }\n              }\n            }\n          }\n        } else {\n          return false;\n        }\n\n        return true;\n      default:\n        return false;\n    }\n  }\n\n  function isSymbol(propType, propValue) {\n    // Native Symbol.\n    if (propType === 'symbol') {\n      return true;\n    }\n\n    // falsy value can't be a Symbol\n    if (!propValue) {\n      return false;\n    }\n\n    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'\n    if (propValue['@@toStringTag'] === 'Symbol') {\n      return true;\n    }\n\n    // Fallback for non-spec compliant Symbols which are polyfilled.\n    if (typeof Symbol === 'function' && propValue instanceof Symbol) {\n      return true;\n    }\n\n    return false;\n  }\n\n  // Equivalent of `typeof` but with special handling for array and regexp.\n  function getPropType(propValue) {\n    var propType = typeof propValue;\n    if (Array.isArray(propValue)) {\n      return 'array';\n    }\n    if (propValue instanceof RegExp) {\n      // Old webkits (at least until Android 4.0) return 'function' rather than\n      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/\n      // passes PropTypes.object.\n      return 'object';\n    }\n    if (isSymbol(propType, propValue)) {\n      return 'symbol';\n    }\n    return propType;\n  }\n\n  // This handles more types than `getPropType`. Only used for error messages.\n  // See `createPrimitiveTypeChecker`.\n  function getPreciseType(propValue) {\n    if (typeof propValue === 'undefined' || propValue === null) {\n      return '' + propValue;\n    }\n    var propType = getPropType(propValue);\n    if (propType === 'object') {\n      if (propValue instanceof Date) {\n        return 'date';\n      } else if (propValue instanceof RegExp) {\n        return 'regexp';\n      }\n    }\n    return propType;\n  }\n\n  // Returns a string that is postfixed to a warning about an invalid type.\n  // For example, \"undefined\" or \"of type array\"\n  function getPostfixForTypeWarning(value) {\n    var type = getPreciseType(value);\n    switch (type) {\n      case 'array':\n      case 'object':\n        return 'an ' + type;\n      case 'boolean':\n      case 'date':\n      case 'regexp':\n        return 'a ' + type;\n      default:\n        return type;\n    }\n  }\n\n  // Returns class name of the object, if any.\n  function getClassName(propValue) {\n    if (!propValue.constructor || !propValue.constructor.name) {\n      return ANONYMOUS;\n    }\n    return propValue.constructor.name;\n  }\n\n  ReactPropTypes.checkPropTypes = checkPropTypes;\n  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;\n  ReactPropTypes.PropTypes = ReactPropTypes;\n\n  return ReactPropTypes;\n};\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/prop-types/factoryWithTypeCheckers.js?");

/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nif (true) {\n  var ReactIs = __webpack_require__(/*! react-is */ \"./node_modules/react-is/index.js\");\n\n  // By explicitly using `prop-types` you are opting into new development behavior.\n  // http://fb.me/prop-types-in-prod\n  var throwOnDirectAccess = true;\n  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ \"./node_modules/prop-types/factoryWithTypeCheckers.js\")(ReactIs.isElement, throwOnDirectAccess);\n} else {}\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/prop-types/index.js?");

/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';\n\nmodule.exports = ReactPropTypesSecret;\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/prop-types/lib/ReactPropTypesSecret.js?");

/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/** @license React v16.8.6\n * react-is.development.js\n *\n * Copyright (c) Facebook, Inc. and its affiliates.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\n\n\nif (true) {\n  (function() {\n'use strict';\n\nObject.defineProperty(exports, '__esModule', { value: true });\n\n// The Symbol used to tag the ReactElement-like types. If there is no native Symbol\n// nor polyfill, then a plain number is used for performance.\nvar hasSymbol = typeof Symbol === 'function' && Symbol.for;\n\nvar REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;\nvar REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;\nvar REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;\nvar REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;\nvar REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;\nvar REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;\nvar REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;\nvar REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;\nvar REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;\nvar REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;\nvar REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;\nvar REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;\nvar REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;\n\nfunction isValidElementType(type) {\n  return typeof type === 'string' || typeof type === 'function' ||\n  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.\n  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);\n}\n\n/**\n * Forked from fbjs/warning:\n * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js\n *\n * Only change is we use console.warn instead of console.error,\n * and do nothing when 'console' is not supported.\n * This really simplifies the code.\n * ---\n * Similar to invariant but only logs a warning if the condition is not met.\n * This can be used to log issues in development environments in critical\n * paths. Removing the logging code for production environments will keep the\n * same logic and follow the same code paths.\n */\n\nvar lowPriorityWarning = function () {};\n\n{\n  var printWarning = function (format) {\n    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n      args[_key - 1] = arguments[_key];\n    }\n\n    var argIndex = 0;\n    var message = 'Warning: ' + format.replace(/%s/g, function () {\n      return args[argIndex++];\n    });\n    if (typeof console !== 'undefined') {\n      console.warn(message);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  };\n\n  lowPriorityWarning = function (condition, format) {\n    if (format === undefined) {\n      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');\n    }\n    if (!condition) {\n      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {\n        args[_key2 - 2] = arguments[_key2];\n      }\n\n      printWarning.apply(undefined, [format].concat(args));\n    }\n  };\n}\n\nvar lowPriorityWarning$1 = lowPriorityWarning;\n\nfunction typeOf(object) {\n  if (typeof object === 'object' && object !== null) {\n    var $$typeof = object.$$typeof;\n    switch ($$typeof) {\n      case REACT_ELEMENT_TYPE:\n        var type = object.type;\n\n        switch (type) {\n          case REACT_ASYNC_MODE_TYPE:\n          case REACT_CONCURRENT_MODE_TYPE:\n          case REACT_FRAGMENT_TYPE:\n          case REACT_PROFILER_TYPE:\n          case REACT_STRICT_MODE_TYPE:\n          case REACT_SUSPENSE_TYPE:\n            return type;\n          default:\n            var $$typeofType = type && type.$$typeof;\n\n            switch ($$typeofType) {\n              case REACT_CONTEXT_TYPE:\n              case REACT_FORWARD_REF_TYPE:\n              case REACT_PROVIDER_TYPE:\n                return $$typeofType;\n              default:\n                return $$typeof;\n            }\n        }\n      case REACT_LAZY_TYPE:\n      case REACT_MEMO_TYPE:\n      case REACT_PORTAL_TYPE:\n        return $$typeof;\n    }\n  }\n\n  return undefined;\n}\n\n// AsyncMode is deprecated along with isAsyncMode\nvar AsyncMode = REACT_ASYNC_MODE_TYPE;\nvar ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;\nvar ContextConsumer = REACT_CONTEXT_TYPE;\nvar ContextProvider = REACT_PROVIDER_TYPE;\nvar Element = REACT_ELEMENT_TYPE;\nvar ForwardRef = REACT_FORWARD_REF_TYPE;\nvar Fragment = REACT_FRAGMENT_TYPE;\nvar Lazy = REACT_LAZY_TYPE;\nvar Memo = REACT_MEMO_TYPE;\nvar Portal = REACT_PORTAL_TYPE;\nvar Profiler = REACT_PROFILER_TYPE;\nvar StrictMode = REACT_STRICT_MODE_TYPE;\nvar Suspense = REACT_SUSPENSE_TYPE;\n\nvar hasWarnedAboutDeprecatedIsAsyncMode = false;\n\n// AsyncMode should be deprecated\nfunction isAsyncMode(object) {\n  {\n    if (!hasWarnedAboutDeprecatedIsAsyncMode) {\n      hasWarnedAboutDeprecatedIsAsyncMode = true;\n      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');\n    }\n  }\n  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;\n}\nfunction isConcurrentMode(object) {\n  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;\n}\nfunction isContextConsumer(object) {\n  return typeOf(object) === REACT_CONTEXT_TYPE;\n}\nfunction isContextProvider(object) {\n  return typeOf(object) === REACT_PROVIDER_TYPE;\n}\nfunction isElement(object) {\n  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;\n}\nfunction isForwardRef(object) {\n  return typeOf(object) === REACT_FORWARD_REF_TYPE;\n}\nfunction isFragment(object) {\n  return typeOf(object) === REACT_FRAGMENT_TYPE;\n}\nfunction isLazy(object) {\n  return typeOf(object) === REACT_LAZY_TYPE;\n}\nfunction isMemo(object) {\n  return typeOf(object) === REACT_MEMO_TYPE;\n}\nfunction isPortal(object) {\n  return typeOf(object) === REACT_PORTAL_TYPE;\n}\nfunction isProfiler(object) {\n  return typeOf(object) === REACT_PROFILER_TYPE;\n}\nfunction isStrictMode(object) {\n  return typeOf(object) === REACT_STRICT_MODE_TYPE;\n}\nfunction isSuspense(object) {\n  return typeOf(object) === REACT_SUSPENSE_TYPE;\n}\n\nexports.typeOf = typeOf;\nexports.AsyncMode = AsyncMode;\nexports.ConcurrentMode = ConcurrentMode;\nexports.ContextConsumer = ContextConsumer;\nexports.ContextProvider = ContextProvider;\nexports.Element = Element;\nexports.ForwardRef = ForwardRef;\nexports.Fragment = Fragment;\nexports.Lazy = Lazy;\nexports.Memo = Memo;\nexports.Portal = Portal;\nexports.Profiler = Profiler;\nexports.StrictMode = StrictMode;\nexports.Suspense = Suspense;\nexports.isValidElementType = isValidElementType;\nexports.isAsyncMode = isAsyncMode;\nexports.isConcurrentMode = isConcurrentMode;\nexports.isContextConsumer = isContextConsumer;\nexports.isContextProvider = isContextProvider;\nexports.isElement = isElement;\nexports.isForwardRef = isForwardRef;\nexports.isFragment = isFragment;\nexports.isLazy = isLazy;\nexports.isMemo = isMemo;\nexports.isPortal = isPortal;\nexports.isProfiler = isProfiler;\nexports.isStrictMode = isStrictMode;\nexports.isSuspense = isSuspense;\n  })();\n}\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/react-is/cjs/react-is.development.js?");

/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nif (false) {} else {\n  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ \"./node_modules/react-is/cjs/react-is.development.js\");\n}\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/react-is/index.js?");

/***/ }),

/***/ "./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js":
/*!****************************************************************************!*\
  !*** ./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js ***!
  \****************************************************************************/
/*! exports provided: polyfill */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"polyfill\", function() { return polyfill; });\n/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nfunction componentWillMount() {\n  // Call this.constructor.gDSFP to support sub-classes.\n  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);\n  if (state !== null && state !== undefined) {\n    this.setState(state);\n  }\n}\n\nfunction componentWillReceiveProps(nextProps) {\n  // Call this.constructor.gDSFP to support sub-classes.\n  // Use the setState() updater to ensure state isn't stale in certain edge cases.\n  function updater(prevState) {\n    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);\n    return state !== null && state !== undefined ? state : null;\n  }\n  // Binding \"this\" is important for shallow renderer support.\n  this.setState(updater.bind(this));\n}\n\nfunction componentWillUpdate(nextProps, nextState) {\n  try {\n    var prevProps = this.props;\n    var prevState = this.state;\n    this.props = nextProps;\n    this.state = nextState;\n    this.__reactInternalSnapshotFlag = true;\n    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(\n      prevProps,\n      prevState\n    );\n  } finally {\n    this.props = prevProps;\n    this.state = prevState;\n  }\n}\n\n// React may warn about cWM/cWRP/cWU methods being deprecated.\n// Add a flag to suppress these warnings for this special case.\ncomponentWillMount.__suppressDeprecationWarning = true;\ncomponentWillReceiveProps.__suppressDeprecationWarning = true;\ncomponentWillUpdate.__suppressDeprecationWarning = true;\n\nfunction polyfill(Component) {\n  var prototype = Component.prototype;\n\n  if (!prototype || !prototype.isReactComponent) {\n    throw new Error('Can only polyfill class components');\n  }\n\n  if (\n    typeof Component.getDerivedStateFromProps !== 'function' &&\n    typeof prototype.getSnapshotBeforeUpdate !== 'function'\n  ) {\n    return Component;\n  }\n\n  // If new component APIs are defined, \"unsafe\" lifecycles won't be called.\n  // Error if any of these lifecycles are present,\n  // Because they would work differently between older and newer (16.3+) versions of React.\n  var foundWillMountName = null;\n  var foundWillReceivePropsName = null;\n  var foundWillUpdateName = null;\n  if (typeof prototype.componentWillMount === 'function') {\n    foundWillMountName = 'componentWillMount';\n  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {\n    foundWillMountName = 'UNSAFE_componentWillMount';\n  }\n  if (typeof prototype.componentWillReceiveProps === 'function') {\n    foundWillReceivePropsName = 'componentWillReceiveProps';\n  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {\n    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';\n  }\n  if (typeof prototype.componentWillUpdate === 'function') {\n    foundWillUpdateName = 'componentWillUpdate';\n  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {\n    foundWillUpdateName = 'UNSAFE_componentWillUpdate';\n  }\n  if (\n    foundWillMountName !== null ||\n    foundWillReceivePropsName !== null ||\n    foundWillUpdateName !== null\n  ) {\n    var componentName = Component.displayName || Component.name;\n    var newApiName =\n      typeof Component.getDerivedStateFromProps === 'function'\n        ? 'getDerivedStateFromProps()'\n        : 'getSnapshotBeforeUpdate()';\n\n    throw Error(\n      'Unsafe legacy lifecycles will not be called for components using new component APIs.\\n\\n' +\n        componentName +\n        ' uses ' +\n        newApiName +\n        ' but also contains the following legacy lifecycles:' +\n        (foundWillMountName !== null ? '\\n  ' + foundWillMountName : '') +\n        (foundWillReceivePropsName !== null\n          ? '\\n  ' + foundWillReceivePropsName\n          : '') +\n        (foundWillUpdateName !== null ? '\\n  ' + foundWillUpdateName : '') +\n        '\\n\\nThe above lifecycles should be removed. Learn more about this warning here:\\n' +\n        'https://fb.me/react-async-component-lifecycle-hooks'\n    );\n  }\n\n  // React <= 16.2 does not support static getDerivedStateFromProps.\n  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.\n  // Newer versions of React will ignore these lifecycles if gDSFP exists.\n  if (typeof Component.getDerivedStateFromProps === 'function') {\n    prototype.componentWillMount = componentWillMount;\n    prototype.componentWillReceiveProps = componentWillReceiveProps;\n  }\n\n  // React <= 16.2 does not support getSnapshotBeforeUpdate.\n  // As a workaround, use cWU to invoke the new lifecycle.\n  // Newer versions of React will ignore that lifecycle if gSBU exists.\n  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {\n    if (typeof prototype.componentDidUpdate !== 'function') {\n      throw new Error(\n        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'\n      );\n    }\n\n    prototype.componentWillUpdate = componentWillUpdate;\n\n    var componentDidUpdate = prototype.componentDidUpdate;\n\n    prototype.componentDidUpdate = function componentDidUpdatePolyfill(\n      prevProps,\n      prevState,\n      maybeSnapshot\n    ) {\n      // 16.3+ will not execute our will-update method;\n      // It will pass a snapshot value to did-update though.\n      // Older versions will require our polyfilled will-update value.\n      // We need to handle both cases, but can't just check for the presence of \"maybeSnapshot\",\n      // Because for <= 15.x versions this might be a \"prevContext\" object.\n      // We also can't just check \"__reactInternalSnapshot\",\n      // Because get-snapshot might return a falsy value.\n      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.\n      var snapshot = this.__reactInternalSnapshotFlag\n        ? this.__reactInternalSnapshot\n        : maybeSnapshot;\n\n      componentDidUpdate.call(this, prevProps, prevState, snapshot);\n    };\n  }\n\n  return Component;\n}\n\n\n\n\n//# sourceURL=webpack://ReduxForm/./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack://ReduxForm/(webpack)/buildin/global.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack://ReduxForm/(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/ConnectedField.js":
/*!*******************************!*\
  !*** ./src/ConnectedField.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"./node_modules/@babel/runtime/helpers/interopRequireWildcard.js\");\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\"));\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ \"./node_modules/@babel/runtime/helpers/inheritsLoose.js\"));\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _createFieldProps2 = _interopRequireDefault(__webpack_require__(/*! ./createFieldProps */ \"./src/createFieldProps.js\"));\n\nvar _onChangeValue = _interopRequireDefault(__webpack_require__(/*! ./events/onChangeValue */ \"./src/events/onChangeValue.js\"));\n\nvar _eventConsts = __webpack_require__(/*! ./util/eventConsts */ \"./src/util/eventConsts.js\");\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _isReactNative = _interopRequireDefault(__webpack_require__(/*! ./isReactNative */ \"./src/isReactNative.js\"));\n\nvar _validateComponentProp = _interopRequireDefault(__webpack_require__(/*! ./util/validateComponentProp */ \"./src/util/validateComponentProp.js\"));\n\nvar _isEvent = _interopRequireDefault(__webpack_require__(/*! ./events/isEvent */ \"./src/events/isEvent.js\"));\n\nvar propsToNotUpdateFor = ['_reduxForm'];\n\nvar isObject = function isObject(entity) {\n  return entity && typeof entity === 'object';\n};\n\nvar isFunction = function isFunction(entity) {\n  return entity && typeof entity === 'function';\n};\n\nvar eventPreventDefault = function eventPreventDefault(event) {\n  if (isObject(event) && isFunction(event.preventDefault)) {\n    event.preventDefault();\n  }\n};\n\nvar eventDataTransferGetData = function eventDataTransferGetData(event, key) {\n  if (isObject(event) && isObject(event.dataTransfer) && isFunction(event.dataTransfer.getData)) {\n    return event.dataTransfer.getData(key);\n  }\n};\n\nvar eventDataTransferSetData = function eventDataTransferSetData(event, key, value) {\n  if (isObject(event) && isObject(event.dataTransfer) && isFunction(event.dataTransfer.setData)) {\n    event.dataTransfer.setData(key, value);\n  }\n};\n\nvar createConnectedField = function createConnectedField(structure) {\n  var deepEqual = structure.deepEqual,\n      getIn = structure.getIn;\n\n  var getSyncError = function getSyncError(syncErrors, name) {\n    var error = _plain[\"default\"].getIn(syncErrors, name); // Because the error for this field might not be at a level in the error structure where\n    // it can be set directly, it might need to be unwrapped from the _error property\n\n\n    return error && error._error ? error._error : error;\n  };\n\n  var getSyncWarning = function getSyncWarning(syncWarnings, name) {\n    var warning = getIn(syncWarnings, name); // Because the warning for this field might not be at a level in the warning structure where\n    // it can be set directly, it might need to be unwrapped from the _warning property\n\n    return warning && warning._warning ? warning._warning : warning;\n  };\n\n  var ConnectedField =\n  /*#__PURE__*/\n  function (_Component) {\n    (0, _inheritsLoose2[\"default\"])(ConnectedField, _Component);\n\n    function ConnectedField() {\n      var _this;\n\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      _this = _Component.call.apply(_Component, [this].concat(args)) || this;\n      _this.ref = _react[\"default\"].createRef();\n\n      _this.isPristine = function () {\n        return _this.props.pristine;\n      };\n\n      _this.getValue = function () {\n        return _this.props.value;\n      };\n\n      _this.handleChange = function (event) {\n        var _this$props = _this.props,\n            name = _this$props.name,\n            dispatch = _this$props.dispatch,\n            parse = _this$props.parse,\n            normalize = _this$props.normalize,\n            onChange = _this$props.onChange,\n            _reduxForm = _this$props._reduxForm,\n            previousValue = _this$props.value;\n        var newValue = (0, _onChangeValue[\"default\"])(event, {\n          name: name,\n          parse: parse,\n          normalize: normalize\n        });\n        var defaultPrevented = false;\n\n        if (onChange) {\n          // Can't seem to find a way to extend Event in React Native,\n          // thus I simply avoid adding preventDefault() in a RN environment\n          // to prevent the following error:\n          // `One of the sources for assign has an enumerable key on the prototype chain`\n          // Reference: https://github.com/facebook/react-native/issues/5507\n          if (!_isReactNative[\"default\"] && (0, _isEvent[\"default\"])(event)) {\n            onChange((0, _extends2[\"default\"])({}, event, {\n              preventDefault: function preventDefault() {\n                defaultPrevented = true;\n                return eventPreventDefault(event);\n              }\n            }), newValue, previousValue, name);\n          } else {\n            defaultPrevented = onChange(event, newValue, previousValue, name);\n          }\n        }\n\n        if (!defaultPrevented) {\n          // dispatch change action\n          dispatch(_reduxForm.change(name, newValue)); // call post-change callback\n\n          if (_reduxForm.asyncValidate) {\n            _reduxForm.asyncValidate(name, newValue, 'change');\n          }\n        }\n      };\n\n      _this.handleFocus = function (event) {\n        var _this$props2 = _this.props,\n            name = _this$props2.name,\n            dispatch = _this$props2.dispatch,\n            onFocus = _this$props2.onFocus,\n            _reduxForm = _this$props2._reduxForm;\n        var defaultPrevented = false;\n\n        if (onFocus) {\n          if (!_isReactNative[\"default\"]) {\n            onFocus((0, _extends2[\"default\"])({}, event, {\n              preventDefault: function preventDefault() {\n                defaultPrevented = true;\n                return eventPreventDefault(event);\n              }\n            }), name);\n          } else {\n            defaultPrevented = onFocus(event, name);\n          }\n        }\n\n        if (!defaultPrevented) {\n          dispatch(_reduxForm.focus(name));\n        }\n      };\n\n      _this.handleBlur = function (event) {\n        var _this$props3 = _this.props,\n            name = _this$props3.name,\n            dispatch = _this$props3.dispatch,\n            parse = _this$props3.parse,\n            normalize = _this$props3.normalize,\n            onBlur = _this$props3.onBlur,\n            _reduxForm = _this$props3._reduxForm,\n            _value = _this$props3._value,\n            previousValue = _this$props3.value;\n        var newValue = (0, _onChangeValue[\"default\"])(event, {\n          name: name,\n          parse: parse,\n          normalize: normalize\n        }); // for checkbox and radio, if the value property of checkbox or radio equals\n        // the value passed by blur event, then fire blur action with previousValue.\n\n        if (newValue === _value && _value !== undefined) {\n          newValue = previousValue;\n        }\n\n        var defaultPrevented = false;\n\n        if (onBlur) {\n          if (!_isReactNative[\"default\"]) {\n            onBlur((0, _extends2[\"default\"])({}, event, {\n              preventDefault: function preventDefault() {\n                defaultPrevented = true;\n                return eventPreventDefault(event);\n              }\n            }), newValue, previousValue, name);\n          } else {\n            defaultPrevented = onBlur(event, newValue, previousValue, name);\n          }\n        }\n\n        if (!defaultPrevented) {\n          // dispatch blur action\n          dispatch(_reduxForm.blur(name, newValue)); // call post-blur callback\n\n          if (_reduxForm.asyncValidate) {\n            _reduxForm.asyncValidate(name, newValue, 'blur');\n          }\n        }\n      };\n\n      _this.handleDragStart = function (event) {\n        var _this$props4 = _this.props,\n            name = _this$props4.name,\n            onDragStart = _this$props4.onDragStart,\n            value = _this$props4.value;\n        eventDataTransferSetData(event, _eventConsts.dataKey, value == null ? '' : value);\n\n        if (onDragStart) {\n          onDragStart(event, name);\n        }\n      };\n\n      _this.handleDrop = function (event) {\n        var _this$props5 = _this.props,\n            name = _this$props5.name,\n            dispatch = _this$props5.dispatch,\n            onDrop = _this$props5.onDrop,\n            _reduxForm = _this$props5._reduxForm,\n            previousValue = _this$props5.value;\n        var newValue = eventDataTransferGetData(event, _eventConsts.dataKey);\n        var defaultPrevented = false;\n\n        if (onDrop) {\n          onDrop((0, _extends2[\"default\"])({}, event, {\n            preventDefault: function preventDefault() {\n              defaultPrevented = true;\n              return eventPreventDefault(event);\n            }\n          }), newValue, previousValue, name);\n        }\n\n        if (!defaultPrevented) {\n          // dispatch change action\n          dispatch(_reduxForm.change(name, newValue));\n          eventPreventDefault(event);\n        }\n      };\n\n      return _this;\n    }\n\n    var _proto = ConnectedField.prototype;\n\n    _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {\n      var _this2 = this;\n\n      var nextPropsKeys = Object.keys(nextProps);\n      var thisPropsKeys = Object.keys(this.props); // if we have children, we MUST update in React 16\n      // https://twitter.com/erikras/status/915866544558788608\n\n      return !!(this.props.children || nextProps.children || nextPropsKeys.length !== thisPropsKeys.length || nextPropsKeys.some(function (prop) {\n        if (~(nextProps.immutableProps || []).indexOf(prop)) {\n          return _this2.props[prop] !== nextProps[prop];\n        }\n\n        return !~propsToNotUpdateFor.indexOf(prop) && !deepEqual(_this2.props[prop], nextProps[prop]);\n      }));\n    };\n\n    _proto.getRenderedComponent = function getRenderedComponent() {\n      return this.ref.current;\n    };\n\n    _proto.render = function render() {\n      var _this$props6 = this.props,\n          component = _this$props6.component,\n          forwardRef = _this$props6.forwardRef,\n          name = _this$props6.name,\n          _reduxForm = _this$props6._reduxForm,\n          normalize = _this$props6.normalize,\n          onBlur = _this$props6.onBlur,\n          onChange = _this$props6.onChange,\n          onFocus = _this$props6.onFocus,\n          onDragStart = _this$props6.onDragStart,\n          onDrop = _this$props6.onDrop,\n          immutableProps = _this$props6.immutableProps,\n          rest = (0, _objectWithoutPropertiesLoose2[\"default\"])(_this$props6, [\"component\", \"forwardRef\", \"name\", \"_reduxForm\", \"normalize\", \"onBlur\", \"onChange\", \"onFocus\", \"onDragStart\", \"onDrop\", \"immutableProps\"]);\n\n      var _createFieldProps = (0, _createFieldProps2[\"default\"])(structure, name, (0, _extends2[\"default\"])({}, rest, {\n        form: _reduxForm.form,\n        onBlur: this.handleBlur,\n        onChange: this.handleChange,\n        onDrop: this.handleDrop,\n        onDragStart: this.handleDragStart,\n        onFocus: this.handleFocus\n      })),\n          custom = _createFieldProps.custom,\n          props = (0, _objectWithoutPropertiesLoose2[\"default\"])(_createFieldProps, [\"custom\"]);\n\n      if (forwardRef) {\n        custom.ref = this.ref;\n      }\n\n      if (typeof component === 'string') {\n        var input = props.input,\n            meta = props.meta; // eslint-disable-line no-unused-vars\n        // flatten input into other props\n\n        return (0, _react.createElement)(component, (0, _extends2[\"default\"])({}, input, custom));\n      } else {\n        return (0, _react.createElement)(component, (0, _extends2[\"default\"])({}, props, custom));\n      }\n    };\n\n    return ConnectedField;\n  }(_react.Component);\n\n  ConnectedField.propTypes = {\n    component: _validateComponentProp[\"default\"],\n    props: _propTypes[\"default\"].object\n  };\n  var connector = (0, _reactRedux.connect)(function (state, ownProps) {\n    var name = ownProps.name,\n        _ownProps$_reduxForm = ownProps._reduxForm,\n        initialValues = _ownProps$_reduxForm.initialValues,\n        getFormState = _ownProps$_reduxForm.getFormState;\n    var formState = getFormState(state);\n    var initialState = getIn(formState, \"initial.\" + name);\n    var initial = initialState !== undefined ? initialState : initialValues && getIn(initialValues, name);\n    var value = getIn(formState, \"values.\" + name);\n    var submitting = getIn(formState, 'submitting');\n    var syncError = getSyncError(getIn(formState, 'syncErrors'), name);\n    var syncWarning = getSyncWarning(getIn(formState, 'syncWarnings'), name);\n    var pristine = deepEqual(value, initial);\n    return {\n      asyncError: getIn(formState, \"asyncErrors.\" + name),\n      asyncValidating: getIn(formState, 'asyncValidating') === name,\n      dirty: !pristine,\n      pristine: pristine,\n      state: getIn(formState, \"fields.\" + name),\n      submitError: getIn(formState, \"submitErrors.\" + name),\n      submitFailed: getIn(formState, 'submitFailed'),\n      submitting: submitting,\n      syncError: syncError,\n      syncWarning: syncWarning,\n      initial: initial,\n      value: value,\n      _value: ownProps.value // save value passed in (for radios)\n\n    };\n  }, undefined, undefined, {\n    forwardRef: true\n  });\n  return connector(ConnectedField);\n};\n\nvar _default = createConnectedField;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/ConnectedField.js?");

/***/ }),

/***/ "./src/ConnectedFieldArray.js":
/*!************************************!*\
  !*** ./src/ConnectedFieldArray.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"./node_modules/@babel/runtime/helpers/interopRequireWildcard.js\");\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\"));\n\nvar _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\"));\n\nvar _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ \"./node_modules/@babel/runtime/helpers/inheritsLoose.js\"));\n\nvar _mapValues2 = _interopRequireDefault(__webpack_require__(/*! lodash/mapValues */ \"./node_modules/lodash/mapValues.js\"));\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _createFieldArrayProps = _interopRequireDefault(__webpack_require__(/*! ./createFieldArrayProps */ \"./src/createFieldArrayProps.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _validateComponentProp = _interopRequireDefault(__webpack_require__(/*! ./util/validateComponentProp */ \"./src/util/validateComponentProp.js\"));\n\nvar propsToNotUpdateFor = ['_reduxForm', 'value'];\n\nvar createConnectedFieldArray = function createConnectedFieldArray(structure) {\n  var deepEqual = structure.deepEqual,\n      getIn = structure.getIn,\n      size = structure.size,\n      equals = structure.equals,\n      orderChanged = structure.orderChanged;\n\n  var getSyncError = function getSyncError(syncErrors, name) {\n    // For an array, the error can _ONLY_ be under _error.\n    // This is why this getSyncError is not the same as the\n    // one in Field.\n    return _plain[\"default\"].getIn(syncErrors, name + \"._error\");\n  };\n\n  var getSyncWarning = function getSyncWarning(syncWarnings, name) {\n    // For an array, the warning can _ONLY_ be under _warning.\n    // This is why this getSyncError is not the same as the\n    // one in Field.\n    return getIn(syncWarnings, name + \"._warning\");\n  };\n\n  var ConnectedFieldArray =\n  /*#__PURE__*/\n  function (_Component) {\n    (0, _inheritsLoose2[\"default\"])(ConnectedFieldArray, _Component);\n\n    function ConnectedFieldArray() {\n      var _this;\n\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      _this = _Component.call.apply(_Component, [this].concat(args)) || this;\n      _this.ref = _react[\"default\"].createRef();\n\n      _this.getValue = function (index) {\n        return _this.props.value && getIn(_this.props.value, String(index));\n      };\n\n      return _this;\n    }\n\n    var _proto = ConnectedFieldArray.prototype;\n\n    _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {\n      var _this2 = this;\n\n      // Update if the elements of the value array was updated.\n      var thisValue = this.props.value;\n      var nextValue = nextProps.value;\n\n      if (thisValue && nextValue) {\n        var nextValueItemsSame = equals(nextValue, thisValue); //.every(val => ~thisValue.indexOf(val))\n\n        var nextValueItemsOrderChanged = orderChanged(thisValue, nextValue);\n        var thisValueLength = thisValue.length || thisValue.size;\n        var nextValueLength = nextValue.length || nextValue.size;\n\n        if (thisValueLength !== nextValueLength || nextValueItemsSame && nextValueItemsOrderChanged || nextProps.rerenderOnEveryChange && thisValue.some(function (val, index) {\n          return !deepEqual(val, nextValue[index]);\n        })) {\n          return true;\n        }\n      }\n\n      var nextPropsKeys = Object.keys(nextProps);\n      var thisPropsKeys = Object.keys(this.props); // if we have children, we MUST update in React 16\n      // https://twitter.com/erikras/status/915866544558788608\n\n      return !!(this.props.children || nextProps.children || nextPropsKeys.length !== thisPropsKeys.length || nextPropsKeys.some(function (prop) {\n        // useful to debug rerenders\n        // if (!plain.deepEqual(this.props[ prop ], nextProps[ prop ])) {\n        //   console.info(prop, 'changed', this.props[ prop ], '==>', nextProps[ prop ])\n        // }\n        return !~propsToNotUpdateFor.indexOf(prop) && !deepEqual(_this2.props[prop], nextProps[prop]);\n      }));\n    };\n\n    _proto.getRenderedComponent = function getRenderedComponent() {\n      return this.ref.current;\n    };\n\n    _proto.render = function render() {\n      var _this$props = this.props,\n          component = _this$props.component,\n          forwardRef = _this$props.forwardRef,\n          name = _this$props.name,\n          _reduxForm = _this$props._reduxForm,\n          validate = _this$props.validate,\n          warn = _this$props.warn,\n          rerenderOnEveryChange = _this$props.rerenderOnEveryChange,\n          rest = (0, _objectWithoutPropertiesLoose2[\"default\"])(_this$props, [\"component\", \"forwardRef\", \"name\", \"_reduxForm\", \"validate\", \"warn\", \"rerenderOnEveryChange\"]);\n      var props = (0, _createFieldArrayProps[\"default\"])(structure, name, _reduxForm.form, _reduxForm.sectionPrefix, this.getValue, rest);\n\n      if (forwardRef) {\n        props.ref = this.ref;\n      }\n\n      return (0, _react.createElement)(component, props);\n    };\n\n    (0, _createClass2[\"default\"])(ConnectedFieldArray, [{\n      key: \"dirty\",\n      get: function get() {\n        return this.props.dirty;\n      }\n    }, {\n      key: \"pristine\",\n      get: function get() {\n        return this.props.pristine;\n      }\n    }, {\n      key: \"value\",\n      get: function get() {\n        return this.props.value;\n      }\n    }]);\n    return ConnectedFieldArray;\n  }(_react.Component);\n\n  ConnectedFieldArray.propTypes = {\n    component: _validateComponentProp[\"default\"],\n    props: _propTypes[\"default\"].object,\n    rerenderOnEveryChange: _propTypes[\"default\"].bool\n  };\n  ConnectedFieldArray.defaultProps = {\n    rerenderOnEveryChange: false\n  };\n  var connector = (0, _reactRedux.connect)(function (state, ownProps) {\n    var name = ownProps.name,\n        _ownProps$_reduxForm = ownProps._reduxForm,\n        initialValues = _ownProps$_reduxForm.initialValues,\n        getFormState = _ownProps$_reduxForm.getFormState;\n    var formState = getFormState(state);\n    var initial = getIn(formState, \"initial.\" + name) || initialValues && getIn(initialValues, name);\n    var value = getIn(formState, \"values.\" + name);\n    var submitting = getIn(formState, 'submitting');\n    var syncError = getSyncError(getIn(formState, 'syncErrors'), name);\n    var syncWarning = getSyncWarning(getIn(formState, 'syncWarnings'), name);\n    var pristine = deepEqual(value, initial);\n    return {\n      asyncError: getIn(formState, \"asyncErrors.\" + name + \"._error\"),\n      dirty: !pristine,\n      pristine: pristine,\n      state: getIn(formState, \"fields.\" + name),\n      submitError: getIn(formState, \"submitErrors.\" + name + \"._error\"),\n      submitFailed: getIn(formState, 'submitFailed'),\n      submitting: submitting,\n      syncError: syncError,\n      syncWarning: syncWarning,\n      value: value,\n      length: size(value)\n    };\n  }, function (dispatch, ownProps) {\n    var name = ownProps.name,\n        _reduxForm = ownProps._reduxForm;\n    var arrayInsert = _reduxForm.arrayInsert,\n        arrayMove = _reduxForm.arrayMove,\n        arrayPop = _reduxForm.arrayPop,\n        arrayPush = _reduxForm.arrayPush,\n        arrayRemove = _reduxForm.arrayRemove,\n        arrayRemoveAll = _reduxForm.arrayRemoveAll,\n        arrayShift = _reduxForm.arrayShift,\n        arraySplice = _reduxForm.arraySplice,\n        arraySwap = _reduxForm.arraySwap,\n        arrayUnshift = _reduxForm.arrayUnshift;\n    return (0, _mapValues2[\"default\"])({\n      arrayInsert: arrayInsert,\n      arrayMove: arrayMove,\n      arrayPop: arrayPop,\n      arrayPush: arrayPush,\n      arrayRemove: arrayRemove,\n      arrayRemoveAll: arrayRemoveAll,\n      arrayShift: arrayShift,\n      arraySplice: arraySplice,\n      arraySwap: arraySwap,\n      arrayUnshift: arrayUnshift\n    }, function (actionCreator) {\n      return (0, _redux.bindActionCreators)(actionCreator.bind(null, name), dispatch);\n    });\n  }, undefined, {\n    forwardRef: true\n  });\n  return connector(ConnectedFieldArray);\n};\n\nvar _default = createConnectedFieldArray;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/ConnectedFieldArray.js?");

/***/ }),

/***/ "./src/ConnectedFields.js":
/*!********************************!*\
  !*** ./src/ConnectedFields.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\"));\n\nvar _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ \"./node_modules/@babel/runtime/helpers/inheritsLoose.js\"));\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"react\"));\n\nvar _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _createFieldProps2 = _interopRequireDefault(__webpack_require__(/*! ./createFieldProps */ \"./src/createFieldProps.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _onChangeValue = _interopRequireDefault(__webpack_require__(/*! ./events/onChangeValue */ \"./src/events/onChangeValue.js\"));\n\nvar _validateComponentProp = _interopRequireDefault(__webpack_require__(/*! ./util/validateComponentProp */ \"./src/util/validateComponentProp.js\"));\n\nvar propsToNotUpdateFor = ['_reduxForm'];\n\nvar createConnectedFields = function createConnectedFields(structure) {\n  var deepEqual = structure.deepEqual,\n      getIn = structure.getIn,\n      size = structure.size;\n\n  var getSyncError = function getSyncError(syncErrors, name) {\n    // Because the error for this field might not be at a level in the error structure where\n    // it can be set directly, it might need to be unwrapped from the _error property\n    return _plain[\"default\"].getIn(syncErrors, name + \"._error\") || _plain[\"default\"].getIn(syncErrors, name);\n  };\n\n  var getSyncWarning = function getSyncWarning(syncWarnings, name) {\n    var warning = getIn(syncWarnings, name); // Because the warning for this field might not be at a level in the warning structure where\n    // it can be set directly, it might need to be unwrapped from the _warning property\n\n    return warning && warning._warning ? warning._warning : warning;\n  };\n\n  var ConnectedFields =\n  /*#__PURE__*/\n  function (_React$Component) {\n    (0, _inheritsLoose2[\"default\"])(ConnectedFields, _React$Component);\n\n    function ConnectedFields(props) {\n      var _this;\n\n      _this = _React$Component.call(this, props) || this;\n      _this.onChangeFns = {};\n      _this.onFocusFns = {};\n      _this.onBlurFns = {};\n      _this.ref = _react[\"default\"].createRef();\n\n      _this.prepareEventHandlers = function (_ref) {\n        var names = _ref.names;\n        return names.forEach(function (name) {\n          _this.onChangeFns[name] = function (event) {\n            return _this.handleChange(name, event);\n          };\n\n          _this.onFocusFns[name] = function () {\n            return _this.handleFocus(name);\n          };\n\n          _this.onBlurFns[name] = function (event) {\n            return _this.handleBlur(name, event);\n          };\n        });\n      };\n\n      _this.handleChange = function (name, event) {\n        var _this$props = _this.props,\n            dispatch = _this$props.dispatch,\n            parse = _this$props.parse,\n            _reduxForm = _this$props._reduxForm;\n        var value = (0, _onChangeValue[\"default\"])(event, {\n          name: name,\n          parse: parse\n        });\n        dispatch(_reduxForm.change(name, value)); // call post-change callback\n\n        if (_reduxForm.asyncValidate) {\n          _reduxForm.asyncValidate(name, value, 'change');\n        }\n      };\n\n      _this.handleFocus = function (name) {\n        var _this$props2 = _this.props,\n            dispatch = _this$props2.dispatch,\n            _reduxForm = _this$props2._reduxForm;\n        dispatch(_reduxForm.focus(name));\n      };\n\n      _this.handleBlur = function (name, event) {\n        var _this$props3 = _this.props,\n            dispatch = _this$props3.dispatch,\n            parse = _this$props3.parse,\n            _reduxForm = _this$props3._reduxForm;\n        var value = (0, _onChangeValue[\"default\"])(event, {\n          name: name,\n          parse: parse\n        }); // dispatch blur action\n\n        dispatch(_reduxForm.blur(name, value)); // call post-blur callback\n\n        if (_reduxForm.asyncValidate) {\n          _reduxForm.asyncValidate(name, value, 'blur');\n        }\n      };\n\n      _this.prepareEventHandlers(props);\n\n      return _this;\n    }\n\n    var _proto = ConnectedFields.prototype;\n\n    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {\n      var _this2 = this;\n\n      if (this.props.names !== nextProps.names && (size(this.props.names) !== size(nextProps.names) || nextProps.names.some(function (nextName) {\n        return !_this2.props._fields[nextName];\n      }))) {\n        // names has changed. The cached event handlers need to be updated\n        this.prepareEventHandlers(nextProps);\n      }\n    };\n\n    _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {\n      var _this3 = this;\n\n      var nextPropsKeys = Object.keys(nextProps);\n      var thisPropsKeys = Object.keys(this.props); // if we have children, we MUST update in React 16\n      // https://twitter.com/erikras/status/915866544558788608\n\n      return !!(this.props.children || nextProps.children || nextPropsKeys.length !== thisPropsKeys.length || nextPropsKeys.some(function (prop) {\n        return !~propsToNotUpdateFor.indexOf(prop) && !deepEqual(_this3.props[prop], nextProps[prop]);\n      }));\n    };\n\n    _proto.isDirty = function isDirty() {\n      var _fields = this.props._fields;\n      return Object.keys(_fields).some(function (name) {\n        return _fields[name].dirty;\n      });\n    };\n\n    _proto.getValues = function getValues() {\n      var _fields = this.props._fields;\n      return Object.keys(_fields).reduce(function (accumulator, name) {\n        return _plain[\"default\"].setIn(accumulator, name, _fields[name].value);\n      }, {});\n    };\n\n    _proto.getRenderedComponent = function getRenderedComponent() {\n      return this.ref.current;\n    };\n\n    _proto.render = function render() {\n      var _this4 = this;\n\n      var _this$props4 = this.props,\n          component = _this$props4.component,\n          forwardRef = _this$props4.forwardRef,\n          _fields = _this$props4._fields,\n          _reduxForm = _this$props4._reduxForm,\n          rest = (0, _objectWithoutPropertiesLoose2[\"default\"])(_this$props4, [\"component\", \"forwardRef\", \"_fields\", \"_reduxForm\"]);\n      var sectionPrefix = _reduxForm.sectionPrefix,\n          form = _reduxForm.form;\n\n      var _Object$keys$reduce = Object.keys(_fields).reduce(function (accumulator, name) {\n        var connectedProps = _fields[name];\n\n        var _createFieldProps = (0, _createFieldProps2[\"default\"])(structure, name, (0, _extends2[\"default\"])({}, connectedProps, rest, {\n          form: form,\n          onBlur: _this4.onBlurFns[name],\n          onChange: _this4.onChangeFns[name],\n          onFocus: _this4.onFocusFns[name]\n        })),\n            custom = _createFieldProps.custom,\n            fieldProps = (0, _objectWithoutPropertiesLoose2[\"default\"])(_createFieldProps, [\"custom\"]);\n\n        accumulator.custom = custom;\n        var fieldName = sectionPrefix ? name.replace(sectionPrefix + \".\", '') : name;\n        return _plain[\"default\"].setIn(accumulator, fieldName, fieldProps);\n      }, {}),\n          custom = _Object$keys$reduce.custom,\n          props = (0, _objectWithoutPropertiesLoose2[\"default\"])(_Object$keys$reduce, [\"custom\"]);\n\n      if (forwardRef) {\n        props.ref = this.ref;\n      }\n\n      return _react[\"default\"].createElement(component, (0, _extends2[\"default\"])({}, props, custom));\n    };\n\n    return ConnectedFields;\n  }(_react[\"default\"].Component);\n\n  ConnectedFields.propTypes = {\n    component: _validateComponentProp[\"default\"],\n    _fields: _propTypes[\"default\"].object.isRequired,\n    props: _propTypes[\"default\"].object\n  };\n  var connector = (0, _reactRedux.connect)(function (state, ownProps) {\n    var names = ownProps.names,\n        _ownProps$_reduxForm = ownProps._reduxForm,\n        initialValues = _ownProps$_reduxForm.initialValues,\n        getFormState = _ownProps$_reduxForm.getFormState;\n    var formState = getFormState(state);\n    return {\n      _fields: names.reduce(function (accumulator, name) {\n        var initialState = getIn(formState, \"initial.\" + name);\n        var initial = initialState !== undefined ? initialState : initialValues && getIn(initialValues, name);\n        var value = getIn(formState, \"values.\" + name);\n        var syncError = getSyncError(getIn(formState, 'syncErrors'), name);\n        var syncWarning = getSyncWarning(getIn(formState, 'syncWarnings'), name);\n        var submitting = getIn(formState, 'submitting');\n        var pristine = value === initial;\n        accumulator[name] = {\n          asyncError: getIn(formState, \"asyncErrors.\" + name),\n          asyncValidating: getIn(formState, 'asyncValidating') === name,\n          dirty: !pristine,\n          initial: initial,\n          pristine: pristine,\n          state: getIn(formState, \"fields.\" + name),\n          submitError: getIn(formState, \"submitErrors.\" + name),\n          submitFailed: getIn(formState, 'submitFailed'),\n          submitting: submitting,\n          syncError: syncError,\n          syncWarning: syncWarning,\n          value: value,\n          _value: ownProps.value // save value passed in (for radios)\n\n        };\n        return accumulator;\n      }, {})\n    };\n  }, undefined, undefined, {\n    forwardRef: true\n  });\n  return connector(ConnectedFields);\n};\n\nvar _default = createConnectedFields;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/ConnectedFields.js?");

/***/ }),

/***/ "./src/Field.js":
/*!**********************!*\
  !*** ./src/Field.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _createField = _interopRequireDefault(__webpack_require__(/*! ./createField */ \"./src/createField.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _createField[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/Field.js?");

/***/ }),

/***/ "./src/FieldArray.js":
/*!***************************!*\
  !*** ./src/FieldArray.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _createFieldArray = _interopRequireDefault(__webpack_require__(/*! ./createFieldArray */ \"./src/createFieldArray.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _createFieldArray[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/FieldArray.js?");

/***/ }),

/***/ "./src/Fields.js":
/*!***********************!*\
  !*** ./src/Fields.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _createFields = _interopRequireDefault(__webpack_require__(/*! ./createFields */ \"./src/createFields.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _createFields[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/Fields.js?");

/***/ }),

/***/ "./src/Form.js":
/*!*********************!*\
  !*** ./src/Form.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"./node_modules/@babel/runtime/helpers/interopRequireWildcard.js\");\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\"));\n\nvar _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ \"./node_modules/@babel/runtime/helpers/inheritsLoose.js\"));\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactLifecyclesCompat = __webpack_require__(/*! react-lifecycles-compat */ \"./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js\");\n\nvar _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\n\nvar _ReduxFormContext = __webpack_require__(/*! ./ReduxFormContext */ \"./src/ReduxFormContext.js\");\n\nvar Form =\n/*#__PURE__*/\nfunction (_Component) {\n  (0, _inheritsLoose2[\"default\"])(Form, _Component);\n\n  function Form(props) {\n    var _this;\n\n    _this = _Component.call(this, props) || this;\n\n    if (!props._reduxForm) {\n      throw new Error('Form must be inside a component decorated with reduxForm()');\n    }\n\n    return _this;\n  }\n\n  var _proto = Form.prototype;\n\n  _proto.componentWillMount = function componentWillMount() {\n    this.props._reduxForm.registerInnerOnSubmit(this.props.onSubmit);\n  };\n\n  _proto.render = function render() {\n    var _this$props = this.props,\n        _reduxForm = _this$props._reduxForm,\n        rest = (0, _objectWithoutPropertiesLoose2[\"default\"])(_this$props, [\"_reduxForm\"]);\n    return _react[\"default\"].createElement(\"form\", rest);\n  };\n\n  return Form;\n}(_react.Component);\n\nForm.propTypes = {\n  onSubmit: _propTypes[\"default\"].func.isRequired,\n  _reduxForm: _propTypes[\"default\"].object\n};\n(0, _reactLifecyclesCompat.polyfill)(Form);\n\nvar _default = (0, _ReduxFormContext.withReduxForm)(Form);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/Form.js?");

/***/ }),

/***/ "./src/FormName.js":
/*!*************************!*\
  !*** ./src/FormName.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"./node_modules/@babel/runtime/helpers/interopRequireWildcard.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar React = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _ReduxFormContext = __webpack_require__(/*! ./ReduxFormContext */ \"./src/ReduxFormContext.js\");\n\nvar FormName = function FormName(_ref) {\n  var children = _ref.children,\n      _reduxForm = _ref._reduxForm;\n  return children({\n    form: _reduxForm && _reduxForm.form,\n    sectionPrefix: _reduxForm && _reduxForm.sectionPrefix\n  });\n};\n\nvar _default = (0, _ReduxFormContext.withReduxForm)(FormName);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/FormName.js?");

/***/ }),

/***/ "./src/FormSection.js":
/*!****************************!*\
  !*** ./src/FormSection.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"./node_modules/@babel/runtime/helpers/interopRequireWildcard.js\");\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\"));\n\nvar _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ \"./node_modules/@babel/runtime/helpers/inheritsLoose.js\"));\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\n\nvar _prefixName = _interopRequireDefault(__webpack_require__(/*! ./util/prefixName */ \"./src/util/prefixName.js\"));\n\nvar _ReduxFormContext = __webpack_require__(/*! ./ReduxFormContext */ \"./src/ReduxFormContext.js\");\n\nvar _validateComponentProp = _interopRequireDefault(__webpack_require__(/*! ./util/validateComponentProp */ \"./src/util/validateComponentProp.js\"));\n\nvar FormSection =\n/*#__PURE__*/\nfunction (_Component) {\n  (0, _inheritsLoose2[\"default\"])(FormSection, _Component);\n\n  function FormSection(props) {\n    var _this;\n\n    _this = _Component.call(this, props) || this;\n\n    if (!props._reduxForm) {\n      throw new Error('FormSection must be inside a component decorated with reduxForm()');\n    }\n\n    return _this;\n  }\n\n  var _proto = FormSection.prototype;\n\n  _proto.render = function render() {\n    var _this$props = this.props,\n        _reduxForm = _this$props._reduxForm,\n        children = _this$props.children,\n        name = _this$props.name,\n        component = _this$props.component,\n        rest = (0, _objectWithoutPropertiesLoose2[\"default\"])(_this$props, [\"_reduxForm\", \"children\", \"name\", \"component\"]);\n\n    if (_react[\"default\"].isValidElement(children)) {\n      return (0, _react.createElement)(_ReduxFormContext.ReduxFormContext.Provider, {\n        value: (0, _extends2[\"default\"])({}, this.props._reduxForm, {\n          sectionPrefix: (0, _prefixName[\"default\"])(this.props, name)\n        }),\n        children: children\n      });\n    }\n\n    return (0, _react.createElement)(_ReduxFormContext.ReduxFormContext.Provider, {\n      value: (0, _extends2[\"default\"])({}, this.props._reduxForm, {\n        sectionPrefix: (0, _prefixName[\"default\"])(this.props, name)\n      }),\n      children: (0, _react.createElement)(component, (0, _extends2[\"default\"])({}, rest, {\n        children: children\n      }))\n    });\n  };\n\n  return FormSection;\n}(_react.Component);\n\nFormSection.propTypes = {\n  name: _propTypes[\"default\"].string.isRequired,\n  component: _validateComponentProp[\"default\"]\n};\nFormSection.defaultProps = {\n  component: 'div'\n};\n\nvar _default = (0, _ReduxFormContext.withReduxForm)(FormSection);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/FormSection.js?");

/***/ }),

/***/ "./src/ReduxFormContext.js":
/*!*********************************!*\
  !*** ./src/ReduxFormContext.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"./node_modules/@babel/runtime/helpers/interopRequireWildcard.js\");\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports.withReduxForm = exports.ReduxFormContext = void 0;\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\"));\n\nvar _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ \"./node_modules/@babel/runtime/helpers/inheritsLoose.js\"));\n\nvar React = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar ReduxFormContext = React.createContext(null);\nexports.ReduxFormContext = ReduxFormContext;\n\nvar withReduxForm = function withReduxForm(Component) {\n  var Hoc =\n  /*#__PURE__*/\n  function (_React$Component) {\n    (0, _inheritsLoose2[\"default\"])(Hoc, _React$Component);\n\n    function Hoc() {\n      return _React$Component.apply(this, arguments) || this;\n    }\n\n    var _proto = Hoc.prototype;\n\n    _proto.render = function render() {\n      var _this$props = this.props,\n          forwardedRef = _this$props.forwardedRef,\n          rest = (0, _objectWithoutPropertiesLoose2[\"default\"])(_this$props, [\"forwardedRef\"]);\n      return React.createElement(ReduxFormContext.Consumer, {\n        children: function children(_reduxForm) {\n          return React.createElement(Component, (0, _extends2[\"default\"])({\n            _reduxForm: _reduxForm,\n            ref: forwardedRef\n          }, rest));\n        }\n      });\n    };\n\n    return Hoc;\n  }(React.Component);\n\n  var ref = React.forwardRef(function (props, ref) {\n    return React.createElement(Hoc, (0, _extends2[\"default\"])({}, props, {\n      forwardedRef: ref\n    }));\n  });\n  ref.displayName = Component.displayName || Component.name || 'Component';\n  return ref;\n};\n\nexports.withReduxForm = withReduxForm;\n\n//# sourceURL=webpack://ReduxForm/./src/ReduxFormContext.js?");

/***/ }),

/***/ "./src/SubmissionError.js":
/*!********************************!*\
  !*** ./src/SubmissionError.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ \"./node_modules/@babel/runtime/helpers/inheritsLoose.js\"));\n\nvar _es6Error = _interopRequireDefault(__webpack_require__(/*! es6-error */ \"./node_modules/es6-error/es6/index.js\"));\n\nvar SubmissionError =\n/*#__PURE__*/\nfunction (_ExtendableError) {\n  (0, _inheritsLoose2[\"default\"])(SubmissionError, _ExtendableError);\n\n  function SubmissionError(errors) {\n    var _this;\n\n    _this = _ExtendableError.call(this, 'Submit Validation Failed') || this;\n    _this.errors = errors;\n    return _this;\n  }\n\n  return SubmissionError;\n}(_es6Error[\"default\"]);\n\nvar _default = SubmissionError;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/SubmissionError.js?");

/***/ }),

/***/ "./src/actionTypes.js":
/*!****************************!*\
  !*** ./src/actionTypes.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.UPDATE_SYNC_WARNINGS = exports.UPDATE_SYNC_ERRORS = exports.UNTOUCH = exports.UNREGISTER_FIELD = exports.TOUCH = exports.SUBMIT = exports.STOP_SUBMIT = exports.STOP_ASYNC_VALIDATION = exports.START_SUBMIT = exports.START_ASYNC_VALIDATION = exports.SET_SUBMIT_SUCCEEDED = exports.SET_SUBMIT_FAILED = exports.RESET_SECTION = exports.RESET = exports.REGISTER_FIELD = exports.INITIALIZE = exports.FOCUS = exports.DESTROY = exports.CLEAR_ASYNC_ERROR = exports.CLEAR_SUBMIT_ERRORS = exports.CLEAR_SUBMIT = exports.CLEAR_FIELDS = exports.CHANGE = exports.BLUR = exports.AUTOFILL = exports.ARRAY_SWAP = exports.ARRAY_UNSHIFT = exports.ARRAY_SPLICE = exports.ARRAY_SHIFT = exports.ARRAY_REMOVE_ALL = exports.ARRAY_REMOVE = exports.ARRAY_PUSH = exports.ARRAY_POP = exports.ARRAY_MOVE = exports.ARRAY_INSERT = exports.prefix = void 0;\nvar prefix = '@@redux-form/';\nexports.prefix = prefix;\nvar ARRAY_INSERT = prefix + \"ARRAY_INSERT\";\nexports.ARRAY_INSERT = ARRAY_INSERT;\nvar ARRAY_MOVE = prefix + \"ARRAY_MOVE\";\nexports.ARRAY_MOVE = ARRAY_MOVE;\nvar ARRAY_POP = prefix + \"ARRAY_POP\";\nexports.ARRAY_POP = ARRAY_POP;\nvar ARRAY_PUSH = prefix + \"ARRAY_PUSH\";\nexports.ARRAY_PUSH = ARRAY_PUSH;\nvar ARRAY_REMOVE = prefix + \"ARRAY_REMOVE\";\nexports.ARRAY_REMOVE = ARRAY_REMOVE;\nvar ARRAY_REMOVE_ALL = prefix + \"ARRAY_REMOVE_ALL\";\nexports.ARRAY_REMOVE_ALL = ARRAY_REMOVE_ALL;\nvar ARRAY_SHIFT = prefix + \"ARRAY_SHIFT\";\nexports.ARRAY_SHIFT = ARRAY_SHIFT;\nvar ARRAY_SPLICE = prefix + \"ARRAY_SPLICE\";\nexports.ARRAY_SPLICE = ARRAY_SPLICE;\nvar ARRAY_UNSHIFT = prefix + \"ARRAY_UNSHIFT\";\nexports.ARRAY_UNSHIFT = ARRAY_UNSHIFT;\nvar ARRAY_SWAP = prefix + \"ARRAY_SWAP\";\nexports.ARRAY_SWAP = ARRAY_SWAP;\nvar AUTOFILL = prefix + \"AUTOFILL\";\nexports.AUTOFILL = AUTOFILL;\nvar BLUR = prefix + \"BLUR\";\nexports.BLUR = BLUR;\nvar CHANGE = prefix + \"CHANGE\";\nexports.CHANGE = CHANGE;\nvar CLEAR_FIELDS = prefix + \"CLEAR_FIELDS\";\nexports.CLEAR_FIELDS = CLEAR_FIELDS;\nvar CLEAR_SUBMIT = prefix + \"CLEAR_SUBMIT\";\nexports.CLEAR_SUBMIT = CLEAR_SUBMIT;\nvar CLEAR_SUBMIT_ERRORS = prefix + \"CLEAR_SUBMIT_ERRORS\";\nexports.CLEAR_SUBMIT_ERRORS = CLEAR_SUBMIT_ERRORS;\nvar CLEAR_ASYNC_ERROR = prefix + \"CLEAR_ASYNC_ERROR\";\nexports.CLEAR_ASYNC_ERROR = CLEAR_ASYNC_ERROR;\nvar DESTROY = prefix + \"DESTROY\";\nexports.DESTROY = DESTROY;\nvar FOCUS = prefix + \"FOCUS\";\nexports.FOCUS = FOCUS;\nvar INITIALIZE = prefix + \"INITIALIZE\";\nexports.INITIALIZE = INITIALIZE;\nvar REGISTER_FIELD = prefix + \"REGISTER_FIELD\";\nexports.REGISTER_FIELD = REGISTER_FIELD;\nvar RESET = prefix + \"RESET\";\nexports.RESET = RESET;\nvar RESET_SECTION = prefix + \"RESET_SECTION\";\nexports.RESET_SECTION = RESET_SECTION;\nvar SET_SUBMIT_FAILED = prefix + \"SET_SUBMIT_FAILED\";\nexports.SET_SUBMIT_FAILED = SET_SUBMIT_FAILED;\nvar SET_SUBMIT_SUCCEEDED = prefix + \"SET_SUBMIT_SUCCEEDED\";\nexports.SET_SUBMIT_SUCCEEDED = SET_SUBMIT_SUCCEEDED;\nvar START_ASYNC_VALIDATION = prefix + \"START_ASYNC_VALIDATION\";\nexports.START_ASYNC_VALIDATION = START_ASYNC_VALIDATION;\nvar START_SUBMIT = prefix + \"START_SUBMIT\";\nexports.START_SUBMIT = START_SUBMIT;\nvar STOP_ASYNC_VALIDATION = prefix + \"STOP_ASYNC_VALIDATION\";\nexports.STOP_ASYNC_VALIDATION = STOP_ASYNC_VALIDATION;\nvar STOP_SUBMIT = prefix + \"STOP_SUBMIT\";\nexports.STOP_SUBMIT = STOP_SUBMIT;\nvar SUBMIT = prefix + \"SUBMIT\";\nexports.SUBMIT = SUBMIT;\nvar TOUCH = prefix + \"TOUCH\";\nexports.TOUCH = TOUCH;\nvar UNREGISTER_FIELD = prefix + \"UNREGISTER_FIELD\";\nexports.UNREGISTER_FIELD = UNREGISTER_FIELD;\nvar UNTOUCH = prefix + \"UNTOUCH\";\nexports.UNTOUCH = UNTOUCH;\nvar UPDATE_SYNC_ERRORS = prefix + \"UPDATE_SYNC_ERRORS\";\nexports.UPDATE_SYNC_ERRORS = UPDATE_SYNC_ERRORS;\nvar UPDATE_SYNC_WARNINGS = prefix + \"UPDATE_SYNC_WARNINGS\";\nexports.UPDATE_SYNC_WARNINGS = UPDATE_SYNC_WARNINGS;\n\n//# sourceURL=webpack://ReduxForm/./src/actionTypes.js?");

/***/ }),

/***/ "./src/actions.js":
/*!************************!*\
  !*** ./src/actions.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _actionTypes = __webpack_require__(/*! ./actionTypes */ \"./src/actionTypes.js\");\n\nvar arrayInsert = function arrayInsert(form, field, index, value) {\n  return {\n    type: _actionTypes.ARRAY_INSERT,\n    meta: {\n      form: form,\n      field: field,\n      index: index\n    },\n    payload: value\n  };\n};\n\nvar arrayMove = function arrayMove(form, field, from, to) {\n  return {\n    type: _actionTypes.ARRAY_MOVE,\n    meta: {\n      form: form,\n      field: field,\n      from: from,\n      to: to\n    }\n  };\n};\n\nvar arrayPop = function arrayPop(form, field) {\n  return {\n    type: _actionTypes.ARRAY_POP,\n    meta: {\n      form: form,\n      field: field\n    }\n  };\n};\n\nvar arrayPush = function arrayPush(form, field, value) {\n  return {\n    type: _actionTypes.ARRAY_PUSH,\n    meta: {\n      form: form,\n      field: field\n    },\n    payload: value\n  };\n};\n\nvar arrayRemove = function arrayRemove(form, field, index) {\n  return {\n    type: _actionTypes.ARRAY_REMOVE,\n    meta: {\n      form: form,\n      field: field,\n      index: index\n    }\n  };\n};\n\nvar arrayRemoveAll = function arrayRemoveAll(form, field) {\n  return {\n    type: _actionTypes.ARRAY_REMOVE_ALL,\n    meta: {\n      form: form,\n      field: field\n    }\n  };\n};\n\nvar arrayShift = function arrayShift(form, field) {\n  return {\n    type: _actionTypes.ARRAY_SHIFT,\n    meta: {\n      form: form,\n      field: field\n    }\n  };\n};\n\nvar arraySplice = function arraySplice(form, field, index, removeNum, value) {\n  var action = {\n    type: _actionTypes.ARRAY_SPLICE,\n    meta: {\n      form: form,\n      field: field,\n      index: index,\n      removeNum: removeNum\n    }\n  };\n\n  if (value !== undefined) {\n    action.payload = value;\n  }\n\n  return action;\n};\n\nvar arraySwap = function arraySwap(form, field, indexA, indexB) {\n  if (indexA === indexB) {\n    throw new Error('Swap indices cannot be equal');\n  }\n\n  if (indexA < 0 || indexB < 0) {\n    throw new Error('Swap indices cannot be negative');\n  }\n\n  return {\n    type: _actionTypes.ARRAY_SWAP,\n    meta: {\n      form: form,\n      field: field,\n      indexA: indexA,\n      indexB: indexB\n    }\n  };\n};\n\nvar arrayUnshift = function arrayUnshift(form, field, value) {\n  return {\n    type: _actionTypes.ARRAY_UNSHIFT,\n    meta: {\n      form: form,\n      field: field\n    },\n    payload: value\n  };\n};\n\nvar autofill = function autofill(form, field, value) {\n  return {\n    type: _actionTypes.AUTOFILL,\n    meta: {\n      form: form,\n      field: field\n    },\n    payload: value\n  };\n};\n\nvar blur = function blur(form, field, value, touch) {\n  return {\n    type: _actionTypes.BLUR,\n    meta: {\n      form: form,\n      field: field,\n      touch: touch\n    },\n    payload: value\n  };\n};\n\nvar change = function change(form, field, value, touch, persistentSubmitErrors) {\n  return {\n    type: _actionTypes.CHANGE,\n    meta: {\n      form: form,\n      field: field,\n      touch: touch,\n      persistentSubmitErrors: persistentSubmitErrors\n    },\n    payload: value\n  };\n};\n\nvar clearSubmit = function clearSubmit(form) {\n  return {\n    type: _actionTypes.CLEAR_SUBMIT,\n    meta: {\n      form: form\n    }\n  };\n};\n\nvar clearSubmitErrors = function clearSubmitErrors(form) {\n  return {\n    type: _actionTypes.CLEAR_SUBMIT_ERRORS,\n    meta: {\n      form: form\n    }\n  };\n};\n\nvar clearAsyncError = function clearAsyncError(form, field) {\n  return {\n    type: _actionTypes.CLEAR_ASYNC_ERROR,\n    meta: {\n      form: form,\n      field: field\n    }\n  };\n};\n\nvar clearFields = function clearFields(form, keepTouched, persistentSubmitErrors) {\n  for (var _len = arguments.length, fields = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {\n    fields[_key - 3] = arguments[_key];\n  }\n\n  return {\n    type: _actionTypes.CLEAR_FIELDS,\n    meta: {\n      form: form,\n      keepTouched: keepTouched,\n      persistentSubmitErrors: persistentSubmitErrors,\n      fields: fields\n    }\n  };\n};\n\nvar destroy = function destroy() {\n  for (var _len2 = arguments.length, form = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n    form[_key2] = arguments[_key2];\n  }\n\n  return {\n    type: _actionTypes.DESTROY,\n    meta: {\n      form: form\n    }\n  };\n};\n\nvar focus = function focus(form, field) {\n  return {\n    type: _actionTypes.FOCUS,\n    meta: {\n      form: form,\n      field: field\n    }\n  };\n};\n\nvar initialize = function initialize(form, values, keepDirty, otherMeta) {\n  if (otherMeta === void 0) {\n    otherMeta = {};\n  }\n\n  if (keepDirty instanceof Object) {\n    otherMeta = keepDirty;\n    keepDirty = false;\n  }\n\n  return {\n    type: _actionTypes.INITIALIZE,\n    meta: (0, _extends2[\"default\"])({\n      form: form,\n      keepDirty: keepDirty\n    }, otherMeta),\n    payload: values\n  };\n};\n\nvar registerField = function registerField(form, name, type) {\n  return {\n    type: _actionTypes.REGISTER_FIELD,\n    meta: {\n      form: form\n    },\n    payload: {\n      name: name,\n      type: type\n    }\n  };\n};\n\nvar reset = function reset(form) {\n  return {\n    type: _actionTypes.RESET,\n    meta: {\n      form: form\n    }\n  };\n};\n\nvar resetSection = function resetSection(form) {\n  for (var _len3 = arguments.length, sections = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {\n    sections[_key3 - 1] = arguments[_key3];\n  }\n\n  return {\n    type: _actionTypes.RESET_SECTION,\n    meta: {\n      form: form,\n      sections: sections\n    }\n  };\n};\n\nvar startAsyncValidation = function startAsyncValidation(form, field) {\n  return {\n    type: _actionTypes.START_ASYNC_VALIDATION,\n    meta: {\n      form: form,\n      field: field\n    }\n  };\n};\n\nvar startSubmit = function startSubmit(form) {\n  return {\n    type: _actionTypes.START_SUBMIT,\n    meta: {\n      form: form\n    }\n  };\n};\n\nvar stopAsyncValidation = function stopAsyncValidation(form, errors) {\n  return {\n    type: _actionTypes.STOP_ASYNC_VALIDATION,\n    meta: {\n      form: form\n    },\n    payload: errors,\n    error: !!(errors && Object.keys(errors).length)\n  };\n};\n\nvar stopSubmit = function stopSubmit(form, errors) {\n  return {\n    type: _actionTypes.STOP_SUBMIT,\n    meta: {\n      form: form\n    },\n    payload: errors,\n    error: !!(errors && Object.keys(errors).length)\n  };\n};\n\nvar submit = function submit(form) {\n  return {\n    type: _actionTypes.SUBMIT,\n    meta: {\n      form: form\n    }\n  };\n};\n\nvar setSubmitFailed = function setSubmitFailed(form) {\n  for (var _len4 = arguments.length, fields = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {\n    fields[_key4 - 1] = arguments[_key4];\n  }\n\n  return {\n    type: _actionTypes.SET_SUBMIT_FAILED,\n    meta: {\n      form: form,\n      fields: fields\n    },\n    error: true\n  };\n};\n\nvar setSubmitSucceeded = function setSubmitSucceeded(form) {\n  for (var _len5 = arguments.length, fields = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {\n    fields[_key5 - 1] = arguments[_key5];\n  }\n\n  return {\n    type: _actionTypes.SET_SUBMIT_SUCCEEDED,\n    meta: {\n      form: form,\n      fields: fields\n    },\n    error: false\n  };\n};\n\nvar touch = function touch(form) {\n  for (var _len6 = arguments.length, fields = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {\n    fields[_key6 - 1] = arguments[_key6];\n  }\n\n  return {\n    type: _actionTypes.TOUCH,\n    meta: {\n      form: form,\n      fields: fields\n    }\n  };\n};\n\nvar unregisterField = function unregisterField(form, name, destroyOnUnmount) {\n  if (destroyOnUnmount === void 0) {\n    destroyOnUnmount = true;\n  }\n\n  return {\n    type: _actionTypes.UNREGISTER_FIELD,\n    meta: {\n      form: form\n    },\n    payload: {\n      name: name,\n      destroyOnUnmount: destroyOnUnmount\n    }\n  };\n};\n\nvar untouch = function untouch(form) {\n  for (var _len7 = arguments.length, fields = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {\n    fields[_key7 - 1] = arguments[_key7];\n  }\n\n  return {\n    type: _actionTypes.UNTOUCH,\n    meta: {\n      form: form,\n      fields: fields\n    }\n  };\n};\n\nvar updateSyncErrors = function updateSyncErrors(form, syncErrors, error) {\n  if (syncErrors === void 0) {\n    syncErrors = {};\n  }\n\n  return {\n    type: _actionTypes.UPDATE_SYNC_ERRORS,\n    meta: {\n      form: form\n    },\n    payload: {\n      syncErrors: syncErrors,\n      error: error\n    }\n  };\n};\n\nvar updateSyncWarnings = function updateSyncWarnings(form, syncWarnings, warning) {\n  if (syncWarnings === void 0) {\n    syncWarnings = {};\n  }\n\n  return {\n    type: _actionTypes.UPDATE_SYNC_WARNINGS,\n    meta: {\n      form: form\n    },\n    payload: {\n      syncWarnings: syncWarnings,\n      warning: warning\n    }\n  };\n};\n\nvar actions = {\n  arrayInsert: arrayInsert,\n  arrayMove: arrayMove,\n  arrayPop: arrayPop,\n  arrayPush: arrayPush,\n  arrayRemove: arrayRemove,\n  arrayRemoveAll: arrayRemoveAll,\n  arrayShift: arrayShift,\n  arraySplice: arraySplice,\n  arraySwap: arraySwap,\n  arrayUnshift: arrayUnshift,\n  autofill: autofill,\n  blur: blur,\n  change: change,\n  clearFields: clearFields,\n  clearSubmit: clearSubmit,\n  clearSubmitErrors: clearSubmitErrors,\n  clearAsyncError: clearAsyncError,\n  destroy: destroy,\n  focus: focus,\n  initialize: initialize,\n  registerField: registerField,\n  reset: reset,\n  resetSection: resetSection,\n  startAsyncValidation: startAsyncValidation,\n  startSubmit: startSubmit,\n  stopAsyncValidation: stopAsyncValidation,\n  stopSubmit: stopSubmit,\n  submit: submit,\n  setSubmitFailed: setSubmitFailed,\n  setSubmitSucceeded: setSubmitSucceeded,\n  touch: touch,\n  unregisterField: unregisterField,\n  untouch: untouch,\n  updateSyncErrors: updateSyncErrors,\n  updateSyncWarnings: updateSyncWarnings\n};\nvar _default = actions;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/actions.js?");

/***/ }),

/***/ "./src/asyncValidation.js":
/*!********************************!*\
  !*** ./src/asyncValidation.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _isPromise = _interopRequireDefault(__webpack_require__(/*! is-promise */ \"./node_modules/is-promise/index.js\"));\n\nvar asyncValidation = function asyncValidation(fn, start, stop, field) {\n  start(field);\n  var promise = fn();\n\n  if (!(0, _isPromise[\"default\"])(promise)) {\n    throw new Error('asyncValidate function passed to reduxForm must return a promise');\n  }\n\n  var handleErrors = function handleErrors(rejected) {\n    return function (errors) {\n      if (rejected) {\n        if (errors && Object.keys(errors).length) {\n          stop(errors);\n          return errors;\n        } else {\n          stop();\n          throw new Error('Asynchronous validation promise was rejected without errors.');\n        }\n      }\n\n      stop();\n      return Promise.resolve();\n    };\n  };\n\n  return promise.then(handleErrors(false), handleErrors(true));\n};\n\nvar _default = asyncValidation;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/asyncValidation.js?");

/***/ }),

/***/ "./src/createField.js":
/*!****************************!*\
  !*** ./src/createField.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"./node_modules/@babel/runtime/helpers/interopRequireWildcard.js\");\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\"));\n\nvar _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ \"./node_modules/@babel/runtime/helpers/inheritsLoose.js\"));\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactLifecyclesCompat = __webpack_require__(/*! react-lifecycles-compat */ \"./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js\");\n\nvar _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\n\nvar _invariant = _interopRequireDefault(__webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\"));\n\nvar _ConnectedField = _interopRequireDefault(__webpack_require__(/*! ./ConnectedField */ \"./src/ConnectedField.js\"));\n\nvar _shallowCompare = _interopRequireDefault(__webpack_require__(/*! ./util/shallowCompare */ \"./src/util/shallowCompare.js\"));\n\nvar _prefixName = _interopRequireDefault(__webpack_require__(/*! ./util/prefixName */ \"./src/util/prefixName.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _ReduxFormContext = __webpack_require__(/*! ./ReduxFormContext */ \"./src/ReduxFormContext.js\");\n\nvar _validateComponentProp = _interopRequireDefault(__webpack_require__(/*! ./util/validateComponentProp */ \"./src/util/validateComponentProp.js\"));\n\nvar createField = function createField(structure) {\n  var ConnectedField = (0, _ConnectedField[\"default\"])(structure);\n  var setIn = structure.setIn;\n\n  var Field =\n  /*#__PURE__*/\n  function (_Component) {\n    (0, _inheritsLoose2[\"default\"])(Field, _Component);\n\n    function Field(props) {\n      var _this;\n\n      _this = _Component.call(this, props) || this;\n      _this.ref = _react[\"default\"].createRef();\n      _this.ref = _react[\"default\"].createRef();\n\n      _this.normalize = function (name, value) {\n        var normalize = _this.props.normalize;\n\n        if (!normalize) {\n          return value;\n        }\n\n        var previousValues = _this.props._reduxForm.getValues();\n\n        var previousValue = _this.value;\n        var nextValues = setIn(previousValues, name, value);\n        return normalize(value, previousValue, nextValues, previousValues, name);\n      };\n\n      if (!props._reduxForm) {\n        throw new Error('Field must be inside a component decorated with reduxForm()');\n      }\n\n      return _this;\n    }\n\n    var _proto = Field.prototype;\n\n    _proto.componentDidMount = function componentDidMount() {\n      var _this2 = this;\n\n      this.props._reduxForm.register(this.name, 'Field', function () {\n        return _this2.props.validate;\n      }, function () {\n        return _this2.props.warn;\n      });\n    };\n\n    _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {\n      return (0, _shallowCompare[\"default\"])(this, nextProps, nextState);\n    };\n\n    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {\n      var oldName = (0, _prefixName[\"default\"])(this.props, this.props.name);\n      var newName = (0, _prefixName[\"default\"])(nextProps, nextProps.name);\n\n      if (oldName !== newName || // use deepEqual here because they could be a function or an array of functions\n      !_plain[\"default\"].deepEqual(this.props.validate, nextProps.validate) || !_plain[\"default\"].deepEqual(this.props.warn, nextProps.warn)) {\n        // unregister old name\n        this.props._reduxForm.unregister(oldName); // register new name\n\n\n        this.props._reduxForm.register(newName, 'Field', function () {\n          return nextProps.validate;\n        }, function () {\n          return nextProps.warn;\n        });\n      }\n    };\n\n    _proto.componentWillUnmount = function componentWillUnmount() {\n      this.props._reduxForm.unregister(this.name);\n    };\n\n    _proto.getRenderedComponent = function getRenderedComponent() {\n      (0, _invariant[\"default\"])(this.props.forwardRef, 'If you want to access getRenderedComponent(), ' + 'you must specify a forwardRef prop to Field');\n      return this.ref.current ? this.ref.current.getRenderedComponent() : undefined;\n    };\n\n    _proto.render = function render() {\n      return (0, _react.createElement)(ConnectedField, (0, _extends2[\"default\"])({}, this.props, {\n        name: this.name,\n        normalize: this.normalize,\n        ref: this.ref\n      }));\n    };\n\n    (0, _createClass2[\"default\"])(Field, [{\n      key: \"name\",\n      get: function get() {\n        return (0, _prefixName[\"default\"])(this.props, this.props.name);\n      }\n    }, {\n      key: \"dirty\",\n      get: function get() {\n        return !this.pristine;\n      }\n    }, {\n      key: \"pristine\",\n      get: function get() {\n        return !!(this.ref.current && this.ref.current.isPristine());\n      }\n    }, {\n      key: \"value\",\n      get: function get() {\n        return this.ref.current && this.ref.current.getValue();\n      }\n    }]);\n    return Field;\n  }(_react.Component);\n\n  Field.propTypes = {\n    name: _propTypes[\"default\"].string.isRequired,\n    component: _validateComponentProp[\"default\"],\n    format: _propTypes[\"default\"].func,\n    normalize: _propTypes[\"default\"].func,\n    onBlur: _propTypes[\"default\"].func,\n    onChange: _propTypes[\"default\"].func,\n    onFocus: _propTypes[\"default\"].func,\n    onDragStart: _propTypes[\"default\"].func,\n    onDrop: _propTypes[\"default\"].func,\n    parse: _propTypes[\"default\"].func,\n    props: _propTypes[\"default\"].object,\n    validate: _propTypes[\"default\"].oneOfType([_propTypes[\"default\"].func, _propTypes[\"default\"].arrayOf(_propTypes[\"default\"].func)]),\n    warn: _propTypes[\"default\"].oneOfType([_propTypes[\"default\"].func, _propTypes[\"default\"].arrayOf(_propTypes[\"default\"].func)]),\n    forwardRef: _propTypes[\"default\"].bool,\n    immutableProps: _propTypes[\"default\"].arrayOf(_propTypes[\"default\"].string),\n    _reduxForm: _propTypes[\"default\"].object\n  };\n  (0, _reactLifecyclesCompat.polyfill)(Field);\n  return (0, _ReduxFormContext.withReduxForm)(Field);\n};\n\nvar _default = createField;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/createField.js?");

/***/ }),

/***/ "./src/createFieldArray.js":
/*!*********************************!*\
  !*** ./src/createFieldArray.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"./node_modules/@babel/runtime/helpers/interopRequireWildcard.js\");\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\"));\n\nvar _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ \"./node_modules/@babel/runtime/helpers/inheritsLoose.js\"));\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactLifecyclesCompat = __webpack_require__(/*! react-lifecycles-compat */ \"./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js\");\n\nvar _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\n\nvar _invariant = _interopRequireDefault(__webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\"));\n\nvar _ConnectedFieldArray = _interopRequireDefault(__webpack_require__(/*! ./ConnectedFieldArray */ \"./src/ConnectedFieldArray.js\"));\n\nvar _prefixName = _interopRequireDefault(__webpack_require__(/*! ./util/prefixName */ \"./src/util/prefixName.js\"));\n\nvar _ReduxFormContext = __webpack_require__(/*! ./ReduxFormContext */ \"./src/ReduxFormContext.js\");\n\nvar _validateComponentProp = _interopRequireDefault(__webpack_require__(/*! ./util/validateComponentProp */ \"./src/util/validateComponentProp.js\"));\n\nvar toArray = function toArray(value) {\n  return Array.isArray(value) ? value : [value];\n};\n\nvar wrapError = function wrapError(fn, key) {\n  return fn && function () {\n    var validators = toArray(fn);\n\n    for (var i = 0; i < validators.length; i++) {\n      var result = validators[i].apply(validators, arguments);\n\n      if (result) {\n        var _ref;\n\n        return _ref = {}, _ref[key] = result, _ref;\n      }\n    }\n  };\n};\n\nvar createFieldArray = function createFieldArray(structure) {\n  var ConnectedFieldArray = (0, _ConnectedFieldArray[\"default\"])(structure);\n\n  var FieldArray =\n  /*#__PURE__*/\n  function (_Component) {\n    (0, _inheritsLoose2[\"default\"])(FieldArray, _Component);\n\n    function FieldArray(props) {\n      var _this;\n\n      _this = _Component.call(this, props) || this;\n      _this.ref = _react[\"default\"].createRef();\n\n      if (!props._reduxForm) {\n        throw new Error('FieldArray must be inside a component decorated with reduxForm()');\n      }\n\n      return _this;\n    }\n\n    var _proto = FieldArray.prototype;\n\n    _proto.componentDidMount = function componentDidMount() {\n      var _this2 = this;\n\n      this.props._reduxForm.register(this.name, 'FieldArray', function () {\n        return wrapError(_this2.props.validate, '_error');\n      }, function () {\n        return wrapError(_this2.props.warn, '_warning');\n      });\n    };\n\n    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {\n      var oldName = (0, _prefixName[\"default\"])(this.props, this.props.name);\n      var newName = (0, _prefixName[\"default\"])(nextProps, nextProps.name);\n\n      if (oldName !== newName) {\n        // unregister old name\n        this.props._reduxForm.unregister(oldName); // register new name\n\n\n        this.props._reduxForm.register(newName, 'FieldArray');\n      }\n    };\n\n    _proto.componentWillUnmount = function componentWillUnmount() {\n      this.props._reduxForm.unregister(this.name);\n    };\n\n    _proto.getRenderedComponent = function getRenderedComponent() {\n      (0, _invariant[\"default\"])(this.props.forwardRef, 'If you want to access getRenderedComponent(), ' + 'you must specify a forwardRef prop to FieldArray');\n      return this.ref && this.ref.current.getRenderedComponent();\n    };\n\n    _proto.render = function render() {\n      return (0, _react.createElement)(ConnectedFieldArray, (0, _extends2[\"default\"])({}, this.props, {\n        name: this.name,\n        ref: this.ref\n      }));\n    };\n\n    (0, _createClass2[\"default\"])(FieldArray, [{\n      key: \"name\",\n      get: function get() {\n        return (0, _prefixName[\"default\"])(this.props, this.props.name);\n      }\n    }, {\n      key: \"dirty\",\n      get: function get() {\n        return !this.ref || this.ref.current.dirty;\n      }\n    }, {\n      key: \"pristine\",\n      get: function get() {\n        return !!(this.ref && this.ref.current.pristine);\n      }\n    }, {\n      key: \"value\",\n      get: function get() {\n        return this.ref ? this.ref.current.value : undefined;\n      }\n    }]);\n    return FieldArray;\n  }(_react.Component);\n\n  FieldArray.propTypes = {\n    name: _propTypes[\"default\"].string.isRequired,\n    component: _validateComponentProp[\"default\"],\n    props: _propTypes[\"default\"].object,\n    validate: _propTypes[\"default\"].oneOfType([_propTypes[\"default\"].func, _propTypes[\"default\"].arrayOf(_propTypes[\"default\"].func)]),\n    warn: _propTypes[\"default\"].oneOfType([_propTypes[\"default\"].func, _propTypes[\"default\"].arrayOf(_propTypes[\"default\"].func)]),\n    forwardRef: _propTypes[\"default\"].bool,\n    _reduxForm: _propTypes[\"default\"].object\n  };\n  (0, _reactLifecyclesCompat.polyfill)(FieldArray);\n  return (0, _ReduxFormContext.withReduxForm)(FieldArray);\n};\n\nvar _default = createFieldArray;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/createFieldArray.js?");

/***/ }),

/***/ "./src/createFieldArrayProps.js":
/*!**************************************!*\
  !*** ./src/createFieldArrayProps.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\"));\n\nvar createFieldArrayProps = function createFieldArrayProps(_ref, name, form, sectionPrefix, getValue, _ref2) {\n  var getIn = _ref.getIn;\n  var arrayInsert = _ref2.arrayInsert,\n      arrayMove = _ref2.arrayMove,\n      arrayPop = _ref2.arrayPop,\n      arrayPush = _ref2.arrayPush,\n      arrayRemove = _ref2.arrayRemove,\n      arrayRemoveAll = _ref2.arrayRemoveAll,\n      arrayShift = _ref2.arrayShift,\n      arraySplice = _ref2.arraySplice,\n      arraySwap = _ref2.arraySwap,\n      arrayUnshift = _ref2.arrayUnshift,\n      asyncError = _ref2.asyncError,\n      dirty = _ref2.dirty,\n      length = _ref2.length,\n      pristine = _ref2.pristine,\n      submitError = _ref2.submitError,\n      state = _ref2.state,\n      submitFailed = _ref2.submitFailed,\n      submitting = _ref2.submitting,\n      syncError = _ref2.syncError,\n      syncWarning = _ref2.syncWarning,\n      value = _ref2.value,\n      props = _ref2.props,\n      rest = (0, _objectWithoutPropertiesLoose2[\"default\"])(_ref2, [\"arrayInsert\", \"arrayMove\", \"arrayPop\", \"arrayPush\", \"arrayRemove\", \"arrayRemoveAll\", \"arrayShift\", \"arraySplice\", \"arraySwap\", \"arrayUnshift\", \"asyncError\", \"dirty\", \"length\", \"pristine\", \"submitError\", \"state\", \"submitFailed\", \"submitting\", \"syncError\", \"syncWarning\", \"value\", \"props\"]);\n  var error = syncError || asyncError || submitError;\n  var warning = syncWarning;\n  var fieldName = sectionPrefix ? name.replace(sectionPrefix + \".\", '') : name;\n  var finalProps = (0, _extends2[\"default\"])({\n    fields: {\n      _isFieldArray: true,\n      forEach: function forEach(callback) {\n        return (value || []).forEach(function (item, index) {\n          return callback(fieldName + \"[\" + index + \"]\", index, finalProps.fields);\n        });\n      },\n      get: getValue,\n      getAll: function getAll() {\n        return value;\n      },\n      insert: arrayInsert,\n      length: length,\n      map: function map(callback) {\n        return (value || []).map(function (item, index) {\n          return callback(fieldName + \"[\" + index + \"]\", index, finalProps.fields);\n        });\n      },\n      move: arrayMove,\n      name: name,\n      pop: function pop() {\n        arrayPop();\n        return getIn(value, String(length - 1));\n      },\n      push: arrayPush,\n      reduce: function reduce(callback, initial) {\n        return (value || []).reduce(function (accumulator, item, index) {\n          return callback(accumulator, fieldName + \"[\" + index + \"]\", index, finalProps.fields);\n        }, initial);\n      },\n      remove: arrayRemove,\n      removeAll: arrayRemoveAll,\n      shift: function shift() {\n        arrayShift();\n        return getIn(value, '0');\n      },\n      splice: arraySplice,\n      swap: arraySwap,\n      unshift: arrayUnshift\n    },\n    meta: {\n      dirty: dirty,\n      error: error,\n      form: form,\n      warning: warning,\n      invalid: !!error,\n      pristine: pristine,\n      submitting: submitting,\n      submitFailed: submitFailed,\n      valid: !error\n    }\n  }, props, rest);\n  return finalProps;\n};\n\nvar _default = createFieldArrayProps;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/createFieldArrayProps.js?");

/***/ }),

/***/ "./src/createFieldProps.js":
/*!*********************************!*\
  !*** ./src/createFieldProps.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\"));\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar processProps = function processProps(type, props, _value, deepEqual) {\n  var value = props.value;\n\n  if (type === 'checkbox') {\n    return (0, _extends2[\"default\"])({}, props, {\n      checked: !!value\n    });\n  }\n\n  if (type === 'radio') {\n    return (0, _extends2[\"default\"])({}, props, {\n      checked: deepEqual(value, _value),\n      value: _value\n    });\n  }\n\n  if (type === 'select-multiple') {\n    return (0, _extends2[\"default\"])({}, props, {\n      value: value || []\n    });\n  }\n\n  if (type === 'file') {\n    return (0, _extends2[\"default\"])({}, props, {\n      value: value || undefined\n    });\n  }\n\n  return props;\n};\n\nvar createFieldProps = function createFieldProps(_ref, name, _ref2) {\n  var getIn = _ref.getIn,\n      toJS = _ref.toJS,\n      deepEqual = _ref.deepEqual;\n  var asyncError = _ref2.asyncError,\n      asyncValidating = _ref2.asyncValidating,\n      onBlur = _ref2.onBlur,\n      onChange = _ref2.onChange,\n      onDrop = _ref2.onDrop,\n      onDragStart = _ref2.onDragStart,\n      dirty = _ref2.dirty,\n      dispatch = _ref2.dispatch,\n      onFocus = _ref2.onFocus,\n      form = _ref2.form,\n      format = _ref2.format,\n      initial = _ref2.initial,\n      parse = _ref2.parse,\n      pristine = _ref2.pristine,\n      props = _ref2.props,\n      state = _ref2.state,\n      submitError = _ref2.submitError,\n      submitFailed = _ref2.submitFailed,\n      submitting = _ref2.submitting,\n      syncError = _ref2.syncError,\n      syncWarning = _ref2.syncWarning,\n      validate = _ref2.validate,\n      value = _ref2.value,\n      _value = _ref2._value,\n      warn = _ref2.warn,\n      custom = (0, _objectWithoutPropertiesLoose2[\"default\"])(_ref2, [\"asyncError\", \"asyncValidating\", \"onBlur\", \"onChange\", \"onDrop\", \"onDragStart\", \"dirty\", \"dispatch\", \"onFocus\", \"form\", \"format\", \"initial\", \"parse\", \"pristine\", \"props\", \"state\", \"submitError\", \"submitFailed\", \"submitting\", \"syncError\", \"syncWarning\", \"validate\", \"value\", \"_value\", \"warn\"]);\n  var error = syncError || asyncError || submitError;\n  var warning = syncWarning;\n\n  var formatFieldValue = function formatFieldValue(value, format) {\n    if (format === null) {\n      return value;\n    }\n\n    var defaultFormattedValue = value == null ? '' : value;\n    return format ? format(value, name) : defaultFormattedValue;\n  };\n\n  var formattedFieldValue = formatFieldValue(value, format);\n  return {\n    input: processProps(custom.type, {\n      name: name,\n      onBlur: onBlur,\n      onChange: onChange,\n      onDragStart: onDragStart,\n      onDrop: onDrop,\n      onFocus: onFocus,\n      value: formattedFieldValue\n    }, _value, deepEqual),\n    meta: (0, _extends2[\"default\"])({}, toJS(state), {\n      active: !!(state && getIn(state, 'active')),\n      asyncValidating: asyncValidating,\n      autofilled: !!(state && getIn(state, 'autofilled')),\n      dirty: dirty,\n      dispatch: dispatch,\n      error: error,\n      form: form,\n      initial: initial,\n      warning: warning,\n      invalid: !!error,\n      pristine: pristine,\n      submitting: !!submitting,\n      submitFailed: !!submitFailed,\n      touched: !!(state && getIn(state, 'touched')),\n      valid: !error,\n      visited: !!(state && getIn(state, 'visited'))\n    }),\n    custom: (0, _extends2[\"default\"])({}, custom, props)\n  };\n};\n\nvar _default = createFieldProps;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/createFieldProps.js?");

/***/ }),

/***/ "./src/createFields.js":
/*!*****************************!*\
  !*** ./src/createFields.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\"));\n\nvar _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ \"./node_modules/@babel/runtime/helpers/inheritsLoose.js\"));\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _reactLifecyclesCompat = __webpack_require__(/*! react-lifecycles-compat */ \"./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js\");\n\nvar _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\n\nvar _invariant = _interopRequireDefault(__webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\"));\n\nvar _get = _interopRequireDefault(__webpack_require__(/*! lodash/get */ \"./node_modules/lodash/get.js\"));\n\nvar _ConnectedFields = _interopRequireDefault(__webpack_require__(/*! ./ConnectedFields */ \"./src/ConnectedFields.js\"));\n\nvar _shallowCompare = _interopRequireDefault(__webpack_require__(/*! ./util/shallowCompare */ \"./src/util/shallowCompare.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _prefixName = _interopRequireDefault(__webpack_require__(/*! ./util/prefixName */ \"./src/util/prefixName.js\"));\n\nvar _ReduxFormContext = __webpack_require__(/*! ./ReduxFormContext */ \"./src/ReduxFormContext.js\");\n\nvar _validateComponentProp = _interopRequireDefault(__webpack_require__(/*! ./util/validateComponentProp */ \"./src/util/validateComponentProp.js\"));\n\nvar validateNameProp = function validateNameProp(prop) {\n  if (!prop) {\n    return new Error('No \"names\" prop was specified <Fields/>');\n  }\n\n  if (!Array.isArray(prop) && !prop._isFieldArray) {\n    return new Error('Invalid prop \"names\" supplied to <Fields/>. Must be either an array of strings or the fields array generated by FieldArray.');\n  }\n};\n\nvar warnAndValidatePropType = _propTypes[\"default\"].oneOfType([_propTypes[\"default\"].func, _propTypes[\"default\"].arrayOf(_propTypes[\"default\"].func), _propTypes[\"default\"].objectOf(_propTypes[\"default\"].oneOfType([_propTypes[\"default\"].func, _propTypes[\"default\"].arrayOf(_propTypes[\"default\"].func)]))]);\n\nvar fieldsPropTypes = {\n  component: _validateComponentProp[\"default\"],\n  format: _propTypes[\"default\"].func,\n  parse: _propTypes[\"default\"].func,\n  props: _propTypes[\"default\"].object,\n  forwardRef: _propTypes[\"default\"].bool,\n  validate: warnAndValidatePropType,\n  warn: warnAndValidatePropType\n};\n\nvar getFieldWarnAndValidate = function getFieldWarnAndValidate(prop, name) {\n  return Array.isArray(prop) || typeof prop === 'function' ? prop : (0, _get[\"default\"])(prop, name, undefined);\n};\n\nvar createFields = function createFields(structure) {\n  var ConnectedFields = (0, _ConnectedFields[\"default\"])(structure);\n\n  var Fields =\n  /*#__PURE__*/\n  function (_Component) {\n    (0, _inheritsLoose2[\"default\"])(Fields, _Component);\n\n    function Fields(props) {\n      var _this;\n\n      _this = _Component.call(this, props) || this;\n\n      if (!props._reduxForm) {\n        throw new Error('Fields must be inside a component decorated with reduxForm()');\n      }\n\n      var error = validateNameProp(props.names);\n\n      if (error) {\n        throw error;\n      }\n\n      return _this;\n    }\n\n    var _proto = Fields.prototype;\n\n    _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {\n      return (0, _shallowCompare[\"default\"])(this, nextProps);\n    };\n\n    _proto.componentDidMount = function componentDidMount() {\n      this.registerFields(this.props.names);\n    };\n\n    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {\n      if (!_plain[\"default\"].deepEqual(this.props.names, nextProps.names)) {\n        var props = this.props;\n        var unregister = props._reduxForm.unregister; // unregister old name\n\n        this.props.names.forEach(function (name) {\n          return unregister((0, _prefixName[\"default\"])(props, name));\n        }); // register new name\n\n        this.registerFields(nextProps.names);\n      }\n    };\n\n    _proto.componentWillUnmount = function componentWillUnmount() {\n      var props = this.props;\n      var unregister = props._reduxForm.unregister;\n      this.props.names.forEach(function (name) {\n        return unregister((0, _prefixName[\"default\"])(props, name));\n      });\n    };\n\n    _proto.registerFields = function registerFields(names) {\n      var _this2 = this;\n\n      var props = this.props;\n      var register = props._reduxForm.register;\n      names.forEach(function (name) {\n        return register((0, _prefixName[\"default\"])(props, name), 'Field', function () {\n          return getFieldWarnAndValidate(_this2.props.validate, name);\n        }, function () {\n          return getFieldWarnAndValidate(_this2.props.warn, name);\n        });\n      });\n    };\n\n    _proto.getRenderedComponent = function getRenderedComponent() {\n      (0, _invariant[\"default\"])(this.props.forwardRef, 'If you want to access getRenderedComponent(), ' + 'you must specify a forwardRef prop to Fields');\n      return this.refs.connected.getRenderedComponent();\n    };\n\n    _proto.render = function render() {\n      var props = this.props;\n      return (0, _react.createElement)(ConnectedFields, (0, _extends2[\"default\"])({}, this.props, {\n        names: this.props.names.map(function (name) {\n          return (0, _prefixName[\"default\"])(props, name);\n        }),\n        ref: 'connected'\n      }));\n    };\n\n    (0, _createClass2[\"default\"])(Fields, [{\n      key: \"names\",\n      get: function get() {\n        var props = this.props;\n        return this.props.names.map(function (name) {\n          return (0, _prefixName[\"default\"])(props, name);\n        });\n      }\n    }, {\n      key: \"dirty\",\n      get: function get() {\n        return this.refs.connected.isDirty();\n      }\n    }, {\n      key: \"pristine\",\n      get: function get() {\n        return !this.dirty;\n      }\n    }, {\n      key: \"values\",\n      get: function get() {\n        return this.refs.connected && this.refs.connected.getValues();\n      }\n    }]);\n    return Fields;\n  }(_react.Component);\n\n  Fields.propTypes = (0, _extends2[\"default\"])({\n    names: function names(props, propName) {\n      return validateNameProp(props[propName]);\n    }\n  }, fieldsPropTypes);\n  (0, _reactLifecyclesCompat.polyfill)(Fields);\n  return (0, _ReduxFormContext.withReduxForm)(Fields);\n};\n\nvar _default = createFields;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/createFields.js?");

/***/ }),

/***/ "./src/createFormValueSelector.js":
/*!****************************************!*\
  !*** ./src/createFormValueSelector.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _invariant = _interopRequireDefault(__webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar createFormValueSelector = function createFormValueSelector(_ref) {\n  var getIn = _ref.getIn;\n  return function (form, getFormState) {\n    (0, _invariant[\"default\"])(form, 'Form value must be specified');\n\n    var nonNullGetFormState = getFormState || function (state) {\n      return getIn(state, 'form');\n    };\n\n    return function (state) {\n      for (var _len = arguments.length, fields = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n        fields[_key - 1] = arguments[_key];\n      }\n\n      (0, _invariant[\"default\"])(fields.length, 'No fields specified');\n      return fields.length === 1 ? // only selecting one field, so return its value\n      getIn(nonNullGetFormState(state), form + \".values.\" + fields[0]) : // selecting many fields, so return an object of field values\n      fields.reduce(function (accumulator, field) {\n        var value = getIn(nonNullGetFormState(state), form + \".values.\" + field);\n        return value === undefined ? accumulator : _plain[\"default\"].setIn(accumulator, field, value);\n      }, {});\n    };\n  };\n};\n\nvar _default = createFormValueSelector;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/createFormValueSelector.js?");

/***/ }),

/***/ "./src/createFormValues.js":
/*!*********************************!*\
  !*** ./src/createFormValues.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\"));\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ \"./node_modules/@babel/runtime/helpers/inheritsLoose.js\"));\n\nvar _mapValues2 = _interopRequireDefault(__webpack_require__(/*! lodash/mapValues */ \"./node_modules/lodash/mapValues.js\"));\n\nvar _isEqual2 = _interopRequireDefault(__webpack_require__(/*! lodash/isEqual */ \"./node_modules/lodash/isEqual.js\"));\n\nvar _isEmpty2 = _interopRequireDefault(__webpack_require__(/*! lodash/isEmpty */ \"./node_modules/lodash/isEmpty.js\"));\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _prefixName = _interopRequireDefault(__webpack_require__(/*! ./util/prefixName */ \"./src/util/prefixName.js\"));\n\nvar _ReduxFormContext = __webpack_require__(/*! ./ReduxFormContext */ \"./src/ReduxFormContext.js\");\n\nvar createValues = function createValues(_ref) {\n  var getIn = _ref.getIn;\n  return function (firstArg) {\n    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n      rest[_key - 1] = arguments[_key];\n    }\n\n    // create a class that reads current form name and creates a selector\n    // return\n    return function (Component) {\n      var FormValues =\n      /*#__PURE__*/\n      function (_React$Component) {\n        (0, _inheritsLoose2[\"default\"])(FormValues, _React$Component);\n\n        function FormValues(props) {\n          var _this;\n\n          _this = _React$Component.call(this, props) || this;\n\n          if (!props._reduxForm) {\n            throw new Error('formValues() must be used inside a React tree decorated with reduxForm()');\n          }\n\n          _this.updateComponent(props);\n\n          return _this;\n        }\n\n        var _proto = FormValues.prototype;\n\n        _proto.componentWillReceiveProps = function componentWillReceiveProps(props) {\n          if (typeof firstArg === 'function') {\n            this.updateComponent(props);\n          }\n        };\n\n        _proto.render = function render() {\n          var Component = this.Component;\n          return _react[\"default\"].createElement(Component // so that the connected component updates props when sectionPrefix has changed\n          , (0, _extends2[\"default\"])({\n            sectionPrefix: this.props._reduxForm.sectionPrefix\n          }, this.props));\n        };\n\n        _proto.updateComponent = function updateComponent(props) {\n          var valuesMap;\n          var resolvedFirstArg = typeof firstArg === 'function' ? firstArg(props) : firstArg;\n\n          if (typeof resolvedFirstArg === 'string') {\n            var _rest$reduce;\n\n            valuesMap = rest.reduce(function (result, k) {\n              result[k] = k;\n              return result;\n            }, (_rest$reduce = {}, _rest$reduce[resolvedFirstArg] = resolvedFirstArg, _rest$reduce));\n          } else {\n            valuesMap = resolvedFirstArg;\n          }\n\n          if ((0, _isEmpty2[\"default\"])(valuesMap)) {\n            // maybe that empty valuesMap is ok if firstArg is a function?\n            // if this is the case, we probably should set this.Component = Component\n            throw new Error('formValues(): You must specify values to get as formValues(name1, name2, ...) or formValues({propName1: propPath1, ...}) or formValues((props) => name) or formValues((props) => ({propName1: propPath1, ...}))');\n          }\n\n          if ((0, _isEqual2[\"default\"])(valuesMap, this._valuesMap)) {\n            // no change in valuesMap\n            return;\n          }\n\n          this._valuesMap = valuesMap;\n          this.setComponent();\n        };\n\n        _proto.setComponent = function setComponent() {\n          var _this2 = this;\n\n          var formValuesSelector = function formValuesSelector(_, _ref2) {\n            var sectionPrefix = _ref2.sectionPrefix;\n            // Yes, we're only using connect() for listening to updates.\n            // The second argument needs to be there so that connect calls\n            // the selector when props change\n            var getValues = _this2.props._reduxForm.getValues;\n            var values = getValues();\n            return (0, _mapValues2[\"default\"])(_this2._valuesMap, function (path) {\n              return getIn(values, (0, _prefixName[\"default\"])(_this2.props, path));\n            });\n          };\n\n          this.Component = (0, _reactRedux.connect)(formValuesSelector, function () {\n            return {};\n          } // ignore dispatch\n          )(function (_ref3) {\n            var sectionPrefix = _ref3.sectionPrefix,\n                otherProps = (0, _objectWithoutPropertiesLoose2[\"default\"])(_ref3, [\"sectionPrefix\"]);\n            return _react[\"default\"].createElement(Component, otherProps);\n          });\n        };\n\n        return FormValues;\n      }(_react[\"default\"].Component);\n\n      return (0, _ReduxFormContext.withReduxForm)(FormValues);\n    };\n  };\n};\n\nvar _default = createValues;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/createFormValues.js?");

/***/ }),

/***/ "./src/createReducer.js":
/*!******************************!*\
  !*** ./src/createReducer.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\"));\n\nvar _isFunction2 = _interopRequireDefault(__webpack_require__(/*! lodash/isFunction */ \"./node_modules/lodash/isFunction.js\"));\n\nvar _actionTypes = __webpack_require__(/*! ./actionTypes */ \"./src/actionTypes.js\");\n\nvar _deleteInWithCleanUp = _interopRequireDefault(__webpack_require__(/*! ./deleteInWithCleanUp */ \"./src/deleteInWithCleanUp.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar shouldDelete = function shouldDelete(_ref) {\n  var getIn = _ref.getIn;\n  return function (state, path) {\n    var initialValuesPath = null;\n\n    if (/^values/.test(path)) {\n      initialValuesPath = path.replace('values', 'initial');\n    }\n\n    var initialValueComparison = initialValuesPath ? getIn(state, initialValuesPath) === undefined : true;\n    return getIn(state, path) !== undefined && initialValueComparison;\n  };\n};\n\nvar isReduxFormAction = function isReduxFormAction(action) {\n  return action && action.type && action.type.length > _actionTypes.prefix.length && action.type.substring(0, _actionTypes.prefix.length) === _actionTypes.prefix;\n};\n\nfunction createReducer(structure) {\n  var _behaviors;\n\n  var deepEqual = structure.deepEqual,\n      empty = structure.empty,\n      forEach = structure.forEach,\n      getIn = structure.getIn,\n      setIn = structure.setIn,\n      deleteIn = structure.deleteIn,\n      fromJS = structure.fromJS,\n      keys = structure.keys,\n      size = structure.size,\n      some = structure.some,\n      splice = structure.splice;\n  var deleteInWithCleanUp = (0, _deleteInWithCleanUp[\"default\"])(structure)(shouldDelete);\n  var plainDeleteInWithCleanUp = (0, _deleteInWithCleanUp[\"default\"])(_plain[\"default\"])(shouldDelete);\n\n  var doSplice = function doSplice(state, key, field, index, removeNum, value, force) {\n    var existing = getIn(state, key + \".\" + field);\n    return existing || force ? setIn(state, key + \".\" + field, splice(existing, index, removeNum, value)) : state;\n  };\n\n  var doPlainSplice = function doPlainSplice(state, key, field, index, removeNum, value, force) {\n    var slice = getIn(state, key);\n\n    var existing = _plain[\"default\"].getIn(slice, field);\n\n    return existing || force ? setIn(state, key, _plain[\"default\"].setIn(slice, field, _plain[\"default\"].splice(existing, index, removeNum, value))) : state;\n  };\n\n  var rootKeys = ['values', 'fields', 'submitErrors', 'asyncErrors'];\n\n  var arraySplice = function arraySplice(state, field, index, removeNum, value) {\n    var result = state;\n    var nonValuesValue = value != null ? empty : undefined;\n    result = doSplice(result, 'values', field, index, removeNum, value, true);\n    result = doSplice(result, 'fields', field, index, removeNum, nonValuesValue);\n    result = doPlainSplice(result, 'syncErrors', field, index, removeNum, undefined);\n    result = doPlainSplice(result, 'syncWarnings', field, index, removeNum, undefined);\n    result = doSplice(result, 'submitErrors', field, index, removeNum, undefined);\n    result = doSplice(result, 'asyncErrors', field, index, removeNum, undefined);\n    return result;\n  };\n\n  var behaviors = (_behaviors = {}, _behaviors[_actionTypes.ARRAY_INSERT] = function (state, _ref2) {\n    var _ref2$meta = _ref2.meta,\n        field = _ref2$meta.field,\n        index = _ref2$meta.index,\n        payload = _ref2.payload;\n    return arraySplice(state, field, index, 0, payload);\n  }, _behaviors[_actionTypes.ARRAY_MOVE] = function (state, _ref3) {\n    var _ref3$meta = _ref3.meta,\n        field = _ref3$meta.field,\n        from = _ref3$meta.from,\n        to = _ref3$meta.to;\n    var array = getIn(state, \"values.\" + field);\n    var length = array ? size(array) : 0;\n    var result = state;\n\n    if (length) {\n      rootKeys.forEach(function (key) {\n        var path = key + \".\" + field;\n\n        if (getIn(result, path)) {\n          var value = getIn(result, path + \"[\" + from + \"]\");\n          result = setIn(result, path, splice(getIn(result, path), from, 1)); // remove\n\n          result = setIn(result, path, splice(getIn(result, path), to, 0, value)); // insert\n        }\n      });\n    }\n\n    return result;\n  }, _behaviors[_actionTypes.ARRAY_POP] = function (state, _ref4) {\n    var field = _ref4.meta.field;\n    var array = getIn(state, \"values.\" + field);\n    var length = array ? size(array) : 0;\n    return length ? arraySplice(state, field, length - 1, 1) : state;\n  }, _behaviors[_actionTypes.ARRAY_PUSH] = function (state, _ref5) {\n    var field = _ref5.meta.field,\n        payload = _ref5.payload;\n    var array = getIn(state, \"values.\" + field);\n    var length = array ? size(array) : 0;\n    return arraySplice(state, field, length, 0, payload);\n  }, _behaviors[_actionTypes.ARRAY_REMOVE] = function (state, _ref6) {\n    var _ref6$meta = _ref6.meta,\n        field = _ref6$meta.field,\n        index = _ref6$meta.index;\n    return arraySplice(state, field, index, 1);\n  }, _behaviors[_actionTypes.ARRAY_REMOVE_ALL] = function (state, _ref7) {\n    var field = _ref7.meta.field;\n    var array = getIn(state, \"values.\" + field);\n    var length = array ? size(array) : 0;\n    return length ? arraySplice(state, field, 0, length) : state;\n  }, _behaviors[_actionTypes.ARRAY_SHIFT] = function (state, _ref8) {\n    var field = _ref8.meta.field;\n    return arraySplice(state, field, 0, 1);\n  }, _behaviors[_actionTypes.ARRAY_SPLICE] = function (state, _ref9) {\n    var _ref9$meta = _ref9.meta,\n        field = _ref9$meta.field,\n        index = _ref9$meta.index,\n        removeNum = _ref9$meta.removeNum,\n        payload = _ref9.payload;\n    return arraySplice(state, field, index, removeNum, payload);\n  }, _behaviors[_actionTypes.ARRAY_SWAP] = function (state, _ref10) {\n    var _ref10$meta = _ref10.meta,\n        field = _ref10$meta.field,\n        indexA = _ref10$meta.indexA,\n        indexB = _ref10$meta.indexB;\n    var result = state;\n    rootKeys.forEach(function (key) {\n      var valueA = getIn(result, key + \".\" + field + \"[\" + indexA + \"]\");\n      var valueB = getIn(result, key + \".\" + field + \"[\" + indexB + \"]\");\n\n      if (valueA !== undefined || valueB !== undefined) {\n        result = setIn(result, key + \".\" + field + \"[\" + indexA + \"]\", valueB);\n        result = setIn(result, key + \".\" + field + \"[\" + indexB + \"]\", valueA);\n      }\n    });\n    return result;\n  }, _behaviors[_actionTypes.ARRAY_UNSHIFT] = function (state, _ref11) {\n    var field = _ref11.meta.field,\n        payload = _ref11.payload;\n    return arraySplice(state, field, 0, 0, payload);\n  }, _behaviors[_actionTypes.AUTOFILL] = function (state, _ref12) {\n    var field = _ref12.meta.field,\n        payload = _ref12.payload;\n    var result = state;\n    result = deleteInWithCleanUp(result, \"asyncErrors.\" + field);\n    result = deleteInWithCleanUp(result, \"submitErrors.\" + field);\n    result = setIn(result, \"fields.\" + field + \".autofilled\", true);\n    result = setIn(result, \"values.\" + field, payload);\n    return result;\n  }, _behaviors[_actionTypes.BLUR] = function (state, _ref13) {\n    var _ref13$meta = _ref13.meta,\n        field = _ref13$meta.field,\n        touch = _ref13$meta.touch,\n        payload = _ref13.payload;\n    var result = state;\n    var initial = getIn(result, \"initial.\" + field);\n\n    if (initial === undefined && payload === '') {\n      result = deleteInWithCleanUp(result, \"values.\" + field);\n    } else if (payload !== undefined) {\n      result = setIn(result, \"values.\" + field, payload);\n    }\n\n    if (field === getIn(result, 'active')) {\n      result = deleteIn(result, 'active');\n    }\n\n    result = deleteIn(result, \"fields.\" + field + \".active\");\n\n    if (touch) {\n      result = setIn(result, \"fields.\" + field + \".touched\", true);\n      result = setIn(result, 'anyTouched', true);\n    }\n\n    return result;\n  }, _behaviors[_actionTypes.CHANGE] = function (state, _ref14) {\n    var _ref14$meta = _ref14.meta,\n        field = _ref14$meta.field,\n        touch = _ref14$meta.touch,\n        persistentSubmitErrors = _ref14$meta.persistentSubmitErrors,\n        payload = _ref14.payload;\n    var result = state;\n    var initial = getIn(result, \"initial.\" + field);\n\n    if (initial === undefined && payload === '') {\n      result = deleteInWithCleanUp(result, \"values.\" + field);\n    } else if ((0, _isFunction2[\"default\"])(payload)) {\n      var fieldCurrentValue = getIn(state, \"values.\" + field);\n      result = setIn(result, \"values.\" + field, payload(fieldCurrentValue, state.values));\n    } else if (payload !== undefined) {\n      result = setIn(result, \"values.\" + field, payload);\n    }\n\n    result = deleteInWithCleanUp(result, \"asyncErrors.\" + field);\n\n    if (!persistentSubmitErrors) {\n      result = deleteInWithCleanUp(result, \"submitErrors.\" + field);\n    }\n\n    result = deleteInWithCleanUp(result, \"fields.\" + field + \".autofilled\");\n\n    if (touch) {\n      result = setIn(result, \"fields.\" + field + \".touched\", true);\n      result = setIn(result, 'anyTouched', true);\n    }\n\n    return result;\n  }, _behaviors[_actionTypes.CLEAR_SUBMIT] = function (state) {\n    return deleteIn(state, 'triggerSubmit');\n  }, _behaviors[_actionTypes.CLEAR_SUBMIT_ERRORS] = function (state) {\n    var result = state;\n    result = deleteInWithCleanUp(result, 'submitErrors');\n    result = deleteIn(result, 'error');\n    return result;\n  }, _behaviors[_actionTypes.CLEAR_ASYNC_ERROR] = function (state, _ref15) {\n    var field = _ref15.meta.field;\n    return deleteIn(state, \"asyncErrors.\" + field);\n  }, _behaviors[_actionTypes.CLEAR_FIELDS] = function (state, _ref16) {\n    var _ref16$meta = _ref16.meta,\n        keepTouched = _ref16$meta.keepTouched,\n        persistentSubmitErrors = _ref16$meta.persistentSubmitErrors,\n        fields = _ref16$meta.fields;\n    var result = state;\n    fields.forEach(function (field) {\n      result = deleteInWithCleanUp(result, \"values.\" + field);\n      result = deleteInWithCleanUp(result, \"asyncErrors.\" + field);\n\n      if (!persistentSubmitErrors) {\n        result = deleteInWithCleanUp(result, \"submitErrors.\" + field);\n      }\n\n      result = deleteInWithCleanUp(result, \"fields.\" + field + \".autofilled\");\n\n      if (!keepTouched) {\n        result = deleteIn(result, \"fields.\" + field + \".touched\");\n      }\n    });\n    var anyTouched = some(keys(getIn(result, 'registeredFields')), function (key) {\n      return getIn(result, \"fields.\" + key + \".touched\");\n    });\n    result = anyTouched ? setIn(result, 'anyTouched', true) : deleteIn(result, 'anyTouched');\n    return result;\n  }, _behaviors[_actionTypes.FOCUS] = function (state, _ref17) {\n    var field = _ref17.meta.field;\n    var result = state;\n    var previouslyActive = getIn(state, 'active');\n    result = deleteIn(result, \"fields.\" + previouslyActive + \".active\");\n    result = setIn(result, \"fields.\" + field + \".visited\", true);\n    result = setIn(result, \"fields.\" + field + \".active\", true);\n    result = setIn(result, 'active', field);\n    return result;\n  }, _behaviors[_actionTypes.INITIALIZE] = function (state, _ref18) {\n    var payload = _ref18.payload,\n        _ref18$meta = _ref18.meta,\n        keepDirty = _ref18$meta.keepDirty,\n        keepSubmitSucceeded = _ref18$meta.keepSubmitSucceeded,\n        updateUnregisteredFields = _ref18$meta.updateUnregisteredFields,\n        keepValues = _ref18$meta.keepValues;\n    var mapData = fromJS(payload);\n    var result = empty; // clean all field state\n    // persist old warnings, they will get recalculated if the new form values are different from the old values\n\n    var warning = getIn(state, 'warning');\n\n    if (warning) {\n      result = setIn(result, 'warning', warning);\n    }\n\n    var syncWarnings = getIn(state, 'syncWarnings');\n\n    if (syncWarnings) {\n      result = setIn(result, 'syncWarnings', syncWarnings);\n    } // persist old errors, they will get recalculated if the new form values are different from the old values\n\n\n    var error = getIn(state, 'error');\n\n    if (error) {\n      result = setIn(result, 'error', error);\n    }\n\n    var syncErrors = getIn(state, 'syncErrors');\n\n    if (syncErrors) {\n      result = setIn(result, 'syncErrors', syncErrors);\n    }\n\n    var registeredFields = getIn(state, 'registeredFields');\n\n    if (registeredFields) {\n      result = setIn(result, 'registeredFields', registeredFields);\n    }\n\n    var previousValues = getIn(state, 'values');\n    var previousInitialValues = getIn(state, 'initial');\n    var newInitialValues = mapData;\n    var newValues = previousValues;\n\n    if (keepDirty && registeredFields) {\n      if (!deepEqual(newInitialValues, previousInitialValues)) {\n        //\n        // Keep the value of dirty fields while updating the value of\n        // pristine fields. This way, apps can reinitialize forms while\n        // avoiding stomping on user edits.\n        //\n        // Note 1: The initialize action replaces all initial values\n        // regardless of keepDirty.\n        //\n        // Note 2: When a field is dirty, keepDirty is enabled, and the field\n        // value is the same as the new initial value for the field, the\n        // initialize action causes the field to become pristine. That effect\n        // is what we want.\n        //\n        var overwritePristineValue = function overwritePristineValue(name) {\n          var previousInitialValue = getIn(previousInitialValues, name);\n          var previousValue = getIn(previousValues, name);\n\n          if (deepEqual(previousValue, previousInitialValue)) {\n            // Overwrite the old pristine value with the new pristine value\n            var newInitialValue = getIn(newInitialValues, name); // This check prevents any 'setIn' call that would create useless\n            // nested objects, since the path to the new field value would\n            // evaluate to the same (especially for undefined values)\n\n            if (getIn(newValues, name) !== newInitialValue) {\n              newValues = setIn(newValues, name, newInitialValue);\n            }\n          }\n        };\n\n        if (!updateUnregisteredFields) {\n          forEach(keys(registeredFields), function (name) {\n            return overwritePristineValue(name);\n          });\n        }\n\n        forEach(keys(newInitialValues), function (name) {\n          var previousInitialValue = getIn(previousInitialValues, name);\n\n          if (typeof previousInitialValue === 'undefined') {\n            // Add new values at the root level.\n            var newInitialValue = getIn(newInitialValues, name);\n            newValues = setIn(newValues, name, newInitialValue);\n          }\n\n          if (updateUnregisteredFields) {\n            overwritePristineValue(name);\n          }\n        });\n      }\n    } else {\n      newValues = newInitialValues;\n    }\n\n    if (keepValues) {\n      forEach(keys(previousValues), function (name) {\n        var previousValue = getIn(previousValues, name);\n        newValues = setIn(newValues, name, previousValue);\n      });\n      forEach(keys(previousInitialValues), function (name) {\n        var previousInitialValue = getIn(previousInitialValues, name);\n        newInitialValues = setIn(newInitialValues, name, previousInitialValue);\n      });\n    }\n\n    if (keepSubmitSucceeded && getIn(state, 'submitSucceeded')) {\n      result = setIn(result, 'submitSucceeded', true);\n    }\n\n    result = setIn(result, 'values', newValues);\n    result = setIn(result, 'initial', newInitialValues);\n    return result;\n  }, _behaviors[_actionTypes.REGISTER_FIELD] = function (state, _ref19) {\n    var _ref19$payload = _ref19.payload,\n        name = _ref19$payload.name,\n        type = _ref19$payload.type;\n    var key = \"registeredFields['\" + name + \"']\";\n    var field = getIn(state, key);\n\n    if (field) {\n      var count = getIn(field, 'count') + 1;\n      field = setIn(field, 'count', count);\n    } else {\n      field = fromJS({\n        name: name,\n        type: type,\n        count: 1\n      });\n    }\n\n    return setIn(state, key, field);\n  }, _behaviors[_actionTypes.RESET] = function (state) {\n    var result = empty;\n    var registeredFields = getIn(state, 'registeredFields');\n\n    if (registeredFields) {\n      result = setIn(result, 'registeredFields', registeredFields);\n    }\n\n    var values = getIn(state, 'initial');\n\n    if (values) {\n      result = setIn(result, 'values', values);\n      result = setIn(result, 'initial', values);\n    }\n\n    return result;\n  }, _behaviors[_actionTypes.RESET_SECTION] = function (state, _ref20) {\n    var sections = _ref20.meta.sections;\n    var result = state;\n    sections.forEach(function (section) {\n      result = deleteInWithCleanUp(result, \"asyncErrors.\" + section);\n      result = deleteInWithCleanUp(result, \"submitErrors.\" + section);\n      result = deleteInWithCleanUp(result, \"fields.\" + section);\n      var values = getIn(state, \"initial.\" + section);\n      result = values ? setIn(result, \"values.\" + section, values) : deleteInWithCleanUp(result, \"values.\" + section);\n    });\n    var anyTouched = some(keys(getIn(result, 'registeredFields')), function (key) {\n      return getIn(result, \"fields.\" + key + \".touched\");\n    });\n    result = anyTouched ? setIn(result, 'anyTouched', true) : deleteIn(result, 'anyTouched');\n    return result;\n  }, _behaviors[_actionTypes.SUBMIT] = function (state) {\n    return setIn(state, 'triggerSubmit', true);\n  }, _behaviors[_actionTypes.START_ASYNC_VALIDATION] = function (state, _ref21) {\n    var field = _ref21.meta.field;\n    return setIn(state, 'asyncValidating', field || true);\n  }, _behaviors[_actionTypes.START_SUBMIT] = function (state) {\n    return setIn(state, 'submitting', true);\n  }, _behaviors[_actionTypes.STOP_ASYNC_VALIDATION] = function (state, _ref22) {\n    var payload = _ref22.payload;\n    var result = state;\n    result = deleteIn(result, 'asyncValidating');\n\n    if (payload && Object.keys(payload).length) {\n      var _error = payload._error,\n          fieldErrors = (0, _objectWithoutPropertiesLoose2[\"default\"])(payload, [\"_error\"]);\n\n      if (_error) {\n        result = setIn(result, 'error', _error);\n      }\n\n      if (Object.keys(fieldErrors).length) {\n        result = setIn(result, 'asyncErrors', fromJS(fieldErrors));\n      }\n    } else {\n      result = deleteIn(result, 'error');\n      result = deleteIn(result, 'asyncErrors');\n    }\n\n    return result;\n  }, _behaviors[_actionTypes.STOP_SUBMIT] = function (state, _ref23) {\n    var payload = _ref23.payload;\n    var result = state;\n    result = deleteIn(result, 'submitting');\n    result = deleteIn(result, 'submitFailed');\n    result = deleteIn(result, 'submitSucceeded');\n\n    if (payload && Object.keys(payload).length) {\n      var _error = payload._error,\n          fieldErrors = (0, _objectWithoutPropertiesLoose2[\"default\"])(payload, [\"_error\"]);\n\n      if (_error) {\n        result = setIn(result, 'error', _error);\n      } else {\n        result = deleteIn(result, 'error');\n      }\n\n      if (Object.keys(fieldErrors).length) {\n        result = setIn(result, 'submitErrors', fromJS(fieldErrors));\n      } else {\n        result = deleteIn(result, 'submitErrors');\n      }\n\n      result = setIn(result, 'submitFailed', true);\n    } else {\n      result = deleteIn(result, 'error');\n      result = deleteIn(result, 'submitErrors');\n    }\n\n    return result;\n  }, _behaviors[_actionTypes.SET_SUBMIT_FAILED] = function (state, _ref24) {\n    var fields = _ref24.meta.fields;\n    var result = state;\n    result = setIn(result, 'submitFailed', true);\n    result = deleteIn(result, 'submitSucceeded');\n    result = deleteIn(result, 'submitting');\n    fields.forEach(function (field) {\n      return result = setIn(result, \"fields.\" + field + \".touched\", true);\n    });\n\n    if (fields.length) {\n      result = setIn(result, 'anyTouched', true);\n    }\n\n    return result;\n  }, _behaviors[_actionTypes.SET_SUBMIT_SUCCEEDED] = function (state) {\n    var result = state;\n    result = deleteIn(result, 'submitFailed');\n    result = setIn(result, 'submitSucceeded', true);\n    return result;\n  }, _behaviors[_actionTypes.TOUCH] = function (state, _ref25) {\n    var fields = _ref25.meta.fields;\n    var result = state;\n    fields.forEach(function (field) {\n      return result = setIn(result, \"fields.\" + field + \".touched\", true);\n    });\n    result = setIn(result, 'anyTouched', true);\n    return result;\n  }, _behaviors[_actionTypes.UNREGISTER_FIELD] = function (state, _ref26) {\n    var _ref26$payload = _ref26.payload,\n        name = _ref26$payload.name,\n        destroyOnUnmount = _ref26$payload.destroyOnUnmount;\n    var result = state;\n    var key = \"registeredFields['\" + name + \"']\";\n    var field = getIn(result, key);\n\n    if (!field) {\n      return result;\n    }\n\n    var count = getIn(field, 'count') - 1;\n\n    if (count <= 0 && destroyOnUnmount) {\n      // Note: Cannot use deleteWithCleanUp here because of the flat nature of registeredFields\n      result = deleteIn(result, key);\n\n      if (deepEqual(getIn(result, 'registeredFields'), empty)) {\n        result = deleteIn(result, 'registeredFields');\n      }\n\n      var syncErrors = getIn(result, 'syncErrors');\n\n      if (syncErrors) {\n        syncErrors = plainDeleteInWithCleanUp(syncErrors, name);\n\n        if (_plain[\"default\"].deepEqual(syncErrors, _plain[\"default\"].empty)) {\n          result = deleteIn(result, 'syncErrors');\n        } else {\n          result = setIn(result, 'syncErrors', syncErrors);\n        }\n      }\n\n      var syncWarnings = getIn(result, 'syncWarnings');\n\n      if (syncWarnings) {\n        syncWarnings = plainDeleteInWithCleanUp(syncWarnings, name);\n\n        if (_plain[\"default\"].deepEqual(syncWarnings, _plain[\"default\"].empty)) {\n          result = deleteIn(result, 'syncWarnings');\n        } else {\n          result = setIn(result, 'syncWarnings', syncWarnings);\n        }\n      }\n\n      result = deleteInWithCleanUp(result, \"submitErrors.\" + name);\n      result = deleteInWithCleanUp(result, \"asyncErrors.\" + name);\n    } else {\n      field = setIn(field, 'count', count);\n      result = setIn(result, key, field);\n    }\n\n    return result;\n  }, _behaviors[_actionTypes.UNTOUCH] = function (state, _ref27) {\n    var fields = _ref27.meta.fields;\n    var result = state;\n    fields.forEach(function (field) {\n      return result = deleteIn(result, \"fields.\" + field + \".touched\");\n    });\n    var anyTouched = some(keys(getIn(result, 'registeredFields')), function (key) {\n      return getIn(result, \"fields.\" + key + \".touched\");\n    });\n    result = anyTouched ? setIn(result, 'anyTouched', true) : deleteIn(result, 'anyTouched');\n    return result;\n  }, _behaviors[_actionTypes.UPDATE_SYNC_ERRORS] = function (state, _ref28) {\n    var _ref28$payload = _ref28.payload,\n        syncErrors = _ref28$payload.syncErrors,\n        error = _ref28$payload.error;\n    var result = state;\n\n    if (error) {\n      result = setIn(result, 'error', error);\n      result = setIn(result, 'syncError', true);\n    } else {\n      result = deleteIn(result, 'error');\n      result = deleteIn(result, 'syncError');\n    }\n\n    if (Object.keys(syncErrors).length) {\n      result = setIn(result, 'syncErrors', syncErrors);\n    } else {\n      result = deleteIn(result, 'syncErrors');\n    }\n\n    return result;\n  }, _behaviors[_actionTypes.UPDATE_SYNC_WARNINGS] = function (state, _ref29) {\n    var _ref29$payload = _ref29.payload,\n        syncWarnings = _ref29$payload.syncWarnings,\n        warning = _ref29$payload.warning;\n    var result = state;\n\n    if (warning) {\n      result = setIn(result, 'warning', warning);\n    } else {\n      result = deleteIn(result, 'warning');\n    }\n\n    if (Object.keys(syncWarnings).length) {\n      result = setIn(result, 'syncWarnings', syncWarnings);\n    } else {\n      result = deleteIn(result, 'syncWarnings');\n    }\n\n    return result;\n  }, _behaviors);\n\n  var reducer = function reducer(state, action) {\n    if (state === void 0) {\n      state = empty;\n    }\n\n    var behavior = behaviors[action.type];\n    return behavior ? behavior(state, action) : state;\n  };\n\n  var byForm = function byForm(reducer) {\n    return function (state, action) {\n      if (state === void 0) {\n        state = empty;\n      }\n\n      if (action === void 0) {\n        action = {\n          type: 'NONE'\n        };\n      }\n\n      var form = action && action.meta && action.meta.form;\n\n      if (!form || !isReduxFormAction(action)) {\n        return state;\n      }\n\n      if (action.type === _actionTypes.DESTROY && action.meta && action.meta.form) {\n        return action.meta.form.reduce(function (result, form) {\n          return deleteInWithCleanUp(result, form);\n        }, state);\n      }\n\n      var formState = getIn(state, form);\n      var result = reducer(formState, action);\n      return result === formState ? state : setIn(state, form, result);\n    };\n  };\n  /**\n   * Adds additional functionality to the reducer\n   */\n\n\n  function decorate(target) {\n    target.plugin = function (reducers, config) {\n      var _this = this;\n\n      if (config === void 0) {\n        config = {};\n      }\n\n      // use 'function' keyword to enable 'this'\n      return decorate(function (state, action) {\n        if (state === void 0) {\n          state = empty;\n        }\n\n        if (action === void 0) {\n          action = {\n            type: 'NONE'\n          };\n        }\n\n        var callPlugin = function callPlugin(processed, key) {\n          var previousState = getIn(processed, key);\n          var nextState = reducers[key](previousState, action, getIn(state, key));\n          return nextState !== previousState ? setIn(processed, key, nextState) : processed;\n        };\n\n        var processed = _this(state, action); // run through redux-form reducer\n\n\n        var form = action && action.meta && action.meta.form;\n\n        if (form && !config.receiveAllFormActions) {\n          // this is an action aimed at forms, so only give it to the specified form's plugin\n          return reducers[form] ? callPlugin(processed, form) : processed;\n        } else {\n          // this is not a form-specific action, so send it to all the plugins\n          return Object.keys(reducers).reduce(callPlugin, processed);\n        }\n      });\n    };\n\n    return target;\n  }\n\n  return decorate(byForm(reducer));\n}\n\nvar _default = createReducer;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/createReducer.js?");

/***/ }),

/***/ "./src/createReduxForm.js":
/*!********************************!*\
  !*** ./src/createReduxForm.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"./node_modules/@babel/runtime/helpers/interopRequireWildcard.js\");\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\"));\n\nvar _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ \"./node_modules/@babel/runtime/helpers/inheritsLoose.js\"));\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ \"./node_modules/@babel/runtime/helpers/toConsumableArray.js\"));\n\nvar _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ \"./node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js\"));\n\nvar _merge4 = _interopRequireDefault(__webpack_require__(/*! lodash/merge */ \"./node_modules/lodash/merge.js\"));\n\nvar _mapValues2 = _interopRequireDefault(__webpack_require__(/*! lodash/mapValues */ \"./node_modules/lodash/mapValues.js\"));\n\nvar _reactLifecyclesCompat = __webpack_require__(/*! react-lifecycles-compat */ \"./node_modules/react-lifecycles-compat/react-lifecycles-compat.es.js\");\n\nvar _hoistNonReactStatics = _interopRequireDefault(__webpack_require__(/*! hoist-non-react-statics */ \"./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js\"));\n\nvar _invariant = _interopRequireDefault(__webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\"));\n\nvar _isPromise = _interopRequireDefault(__webpack_require__(/*! is-promise */ \"./node_modules/is-promise/index.js\"));\n\nvar _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\n\nvar _react = _interopRequireWildcard(__webpack_require__(/*! react */ \"react\"));\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar _redux = __webpack_require__(/*! redux */ \"redux\");\n\nvar _actions = _interopRequireDefault(__webpack_require__(/*! ./actions */ \"./src/actions.js\"));\n\nvar _asyncValidation = _interopRequireDefault(__webpack_require__(/*! ./asyncValidation */ \"./src/asyncValidation.js\"));\n\nvar _defaultShouldAsyncValidate = _interopRequireDefault(__webpack_require__(/*! ./defaultShouldAsyncValidate */ \"./src/defaultShouldAsyncValidate.js\"));\n\nvar _defaultShouldValidate = _interopRequireDefault(__webpack_require__(/*! ./defaultShouldValidate */ \"./src/defaultShouldValidate.js\"));\n\nvar _defaultShouldError = _interopRequireDefault(__webpack_require__(/*! ./defaultShouldError */ \"./src/defaultShouldError.js\"));\n\nvar _defaultShouldWarn = _interopRequireDefault(__webpack_require__(/*! ./defaultShouldWarn */ \"./src/defaultShouldWarn.js\"));\n\nvar _silenceEvent = _interopRequireDefault(__webpack_require__(/*! ./events/silenceEvent */ \"./src/events/silenceEvent.js\"));\n\nvar _silenceEvents = _interopRequireDefault(__webpack_require__(/*! ./events/silenceEvents */ \"./src/events/silenceEvents.js\"));\n\nvar _generateValidator = _interopRequireDefault(__webpack_require__(/*! ./generateValidator */ \"./src/generateValidator.js\"));\n\nvar _handleSubmit = _interopRequireDefault(__webpack_require__(/*! ./handleSubmit */ \"./src/handleSubmit.js\"));\n\nvar _isValid = _interopRequireDefault(__webpack_require__(/*! ./selectors/isValid */ \"./src/selectors/isValid.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _getDisplayName = _interopRequireDefault(__webpack_require__(/*! ./util/getDisplayName */ \"./src/util/getDisplayName.js\"));\n\nvar _isHotReloading = _interopRequireDefault(__webpack_require__(/*! ./util/isHotReloading */ \"./src/util/isHotReloading.js\"));\n\nvar _ReduxFormContext = __webpack_require__(/*! ./ReduxFormContext */ \"./src/ReduxFormContext.js\");\n\nvar isClassComponent = function isClassComponent(Component) {\n  return Boolean(Component && Component.prototype && typeof Component.prototype.isReactComponent === 'object');\n}; // extract field-specific actions\n\n\nvar arrayInsert = _actions[\"default\"].arrayInsert,\n    arrayMove = _actions[\"default\"].arrayMove,\n    arrayPop = _actions[\"default\"].arrayPop,\n    arrayPush = _actions[\"default\"].arrayPush,\n    arrayRemove = _actions[\"default\"].arrayRemove,\n    arrayRemoveAll = _actions[\"default\"].arrayRemoveAll,\n    arrayShift = _actions[\"default\"].arrayShift,\n    arraySplice = _actions[\"default\"].arraySplice,\n    arraySwap = _actions[\"default\"].arraySwap,\n    arrayUnshift = _actions[\"default\"].arrayUnshift,\n    blur = _actions[\"default\"].blur,\n    change = _actions[\"default\"].change,\n    focus = _actions[\"default\"].focus,\n    formActions = (0, _objectWithoutPropertiesLoose2[\"default\"])(_actions[\"default\"], [\"arrayInsert\", \"arrayMove\", \"arrayPop\", \"arrayPush\", \"arrayRemove\", \"arrayRemoveAll\", \"arrayShift\", \"arraySplice\", \"arraySwap\", \"arrayUnshift\", \"blur\", \"change\", \"focus\"]);\nvar arrayActions = {\n  arrayInsert: arrayInsert,\n  arrayMove: arrayMove,\n  arrayPop: arrayPop,\n  arrayPush: arrayPush,\n  arrayRemove: arrayRemove,\n  arrayRemoveAll: arrayRemoveAll,\n  arrayShift: arrayShift,\n  arraySplice: arraySplice,\n  arraySwap: arraySwap,\n  arrayUnshift: arrayUnshift\n};\nvar propsToNotUpdateFor = [].concat((0, _toConsumableArray2[\"default\"])(Object.keys(_actions[\"default\"])), ['array', 'asyncErrors', 'initialValues', 'syncErrors', 'syncWarnings', 'values', 'registeredFields']);\n\nvar checkSubmit = function checkSubmit(submit) {\n  if (!submit || typeof submit !== 'function') {\n    throw new Error('You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop');\n  }\n\n  return submit;\n};\n\n/**\n * The decorator that is the main API to redux-form\n */\nvar createReduxForm = function createReduxForm(structure) {\n  var deepEqual = structure.deepEqual,\n      empty = structure.empty,\n      getIn = structure.getIn,\n      setIn = structure.setIn,\n      keys = structure.keys,\n      fromJS = structure.fromJS;\n  var isValid = (0, _isValid[\"default\"])(structure);\n  return function (initialConfig) {\n    var config = (0, _extends2[\"default\"])({\n      touchOnBlur: true,\n      touchOnChange: false,\n      persistentSubmitErrors: false,\n      destroyOnUnmount: true,\n      shouldAsyncValidate: _defaultShouldAsyncValidate[\"default\"],\n      shouldValidate: _defaultShouldValidate[\"default\"],\n      shouldError: _defaultShouldError[\"default\"],\n      shouldWarn: _defaultShouldWarn[\"default\"],\n      enableReinitialize: false,\n      keepDirtyOnReinitialize: false,\n      updateUnregisteredFields: false,\n      getFormState: function getFormState(state) {\n        return getIn(state, 'form');\n      },\n      pure: true,\n      forceUnregisterOnUnmount: false,\n      submitAsSideEffect: false\n    }, initialConfig);\n    return function (WrappedComponent) {\n      var Form =\n      /*#__PURE__*/\n      function (_React$Component) {\n        (0, _inheritsLoose2[\"default\"])(Form, _React$Component);\n\n        function Form() {\n          var _this;\n\n          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n            args[_key] = arguments[_key];\n          }\n\n          _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;\n          _this.wrapped = _react[\"default\"].createRef();\n          _this.destroyed = false;\n          _this.fieldCounts = {};\n          _this.fieldValidators = {};\n          _this.lastFieldValidatorKeys = [];\n          _this.fieldWarners = {};\n          _this.lastFieldWarnerKeys = [];\n          _this.innerOnSubmit = undefined;\n          _this.submitPromise = undefined;\n\n          _this.getValues = function () {\n            return _this.props.values;\n          };\n\n          _this.isValid = function () {\n            return _this.props.valid;\n          };\n\n          _this.isPristine = function () {\n            return _this.props.pristine;\n          };\n\n          _this.register = function (name, type, getValidator, getWarner) {\n            var lastCount = _this.fieldCounts[name];\n            var nextCount = (lastCount || 0) + 1;\n            _this.fieldCounts[name] = nextCount;\n\n            _this.props.registerField(name, type);\n\n            if (getValidator) {\n              _this.fieldValidators[name] = getValidator;\n            }\n\n            if (getWarner) {\n              _this.fieldWarners[name] = getWarner;\n            }\n          };\n\n          _this.unregister = function (name) {\n            var lastCount = _this.fieldCounts[name];\n            if (lastCount === 1) delete _this.fieldCounts[name];else if (lastCount != null) _this.fieldCounts[name] = lastCount - 1;\n\n            if (!_this.destroyed) {\n              var _this$props = _this.props,\n                  _destroyOnUnmount = _this$props.destroyOnUnmount,\n                  forceUnregisterOnUnmount = _this$props.forceUnregisterOnUnmount,\n                  unregisterField = _this$props.unregisterField;\n\n              if (_destroyOnUnmount || forceUnregisterOnUnmount) {\n                unregisterField(name, _destroyOnUnmount);\n\n                if (!_this.fieldCounts[name]) {\n                  delete _this.fieldValidators[name];\n                  delete _this.fieldWarners[name];\n                  _this.lastFieldValidatorKeys = _this.lastFieldValidatorKeys.filter(function (key) {\n                    return key !== name;\n                  });\n                }\n              } else {\n                unregisterField(name, false);\n              }\n            }\n          };\n\n          _this.getFieldList = function (options) {\n            var registeredFields = _this.props.registeredFields;\n            var list = [];\n\n            if (!registeredFields) {\n              return list;\n            }\n\n            var keySeq = keys(registeredFields);\n\n            if (options) {\n              if (options.excludeFieldArray) {\n                keySeq = keySeq.filter(function (name) {\n                  return getIn(registeredFields, \"['\" + name + \"'].type\") !== 'FieldArray';\n                });\n              }\n\n              if (options.excludeUnregistered) {\n                keySeq = keySeq.filter(function (name) {\n                  return getIn(registeredFields, \"['\" + name + \"'].count\") !== 0;\n                });\n              }\n            }\n\n            return fromJS(keySeq.reduce(function (acc, key) {\n              acc.push(key);\n              return acc;\n            }, list));\n          };\n\n          _this.getValidators = function () {\n            var validators = {};\n            Object.keys(_this.fieldValidators).forEach(function (name) {\n              var validator = _this.fieldValidators[name]();\n\n              if (validator) {\n                validators[name] = validator;\n              }\n            });\n            return validators;\n          };\n\n          _this.generateValidator = function () {\n            var validators = _this.getValidators();\n\n            return Object.keys(validators).length ? (0, _generateValidator[\"default\"])(validators, structure) : undefined;\n          };\n\n          _this.getWarners = function () {\n            var warners = {};\n            Object.keys(_this.fieldWarners).forEach(function (name) {\n              var warner = _this.fieldWarners[name]();\n\n              if (warner) {\n                warners[name] = warner;\n              }\n            });\n            return warners;\n          };\n\n          _this.generateWarner = function () {\n            var warners = _this.getWarners();\n\n            return Object.keys(warners).length ? (0, _generateValidator[\"default\"])(warners, structure) : undefined;\n          };\n\n          _this.asyncValidate = function (name, value, trigger) {\n            var _this$props2 = _this.props,\n                asyncBlurFields = _this$props2.asyncBlurFields,\n                asyncChangeFields = _this$props2.asyncChangeFields,\n                asyncErrors = _this$props2.asyncErrors,\n                asyncValidate = _this$props2.asyncValidate,\n                dispatch = _this$props2.dispatch,\n                initialized = _this$props2.initialized,\n                pristine = _this$props2.pristine,\n                shouldAsyncValidate = _this$props2.shouldAsyncValidate,\n                startAsyncValidation = _this$props2.startAsyncValidation,\n                stopAsyncValidation = _this$props2.stopAsyncValidation,\n                syncErrors = _this$props2.syncErrors,\n                values = _this$props2.values;\n            var submitting = !name;\n\n            var fieldNeedsValidation = function fieldNeedsValidation() {\n              var fieldNeedsValidationForBlur = asyncBlurFields && name && ~asyncBlurFields.indexOf(name.replace(/\\[[0-9]+\\]/g, '[]'));\n              var fieldNeedsValidationForChange = asyncChangeFields && name && ~asyncChangeFields.indexOf(name.replace(/\\[[0-9]+\\]/g, '[]'));\n              var asyncValidateByDefault = !(asyncBlurFields || asyncChangeFields);\n              return submitting || asyncValidateByDefault || (trigger === 'blur' ? fieldNeedsValidationForBlur : fieldNeedsValidationForChange);\n            };\n\n            if (asyncValidate) {\n              var valuesToValidate = submitting ? values : setIn(values, name, value);\n              var syncValidationPasses = submitting || !getIn(syncErrors, name);\n\n              if (fieldNeedsValidation() && shouldAsyncValidate({\n                asyncErrors: asyncErrors,\n                initialized: initialized,\n                trigger: submitting ? 'submit' : trigger,\n                blurredField: name,\n                pristine: pristine,\n                syncValidationPasses: syncValidationPasses\n              })) {\n                return (0, _asyncValidation[\"default\"])(function () {\n                  return asyncValidate(valuesToValidate, dispatch, _this.props, name);\n                }, startAsyncValidation, stopAsyncValidation, name);\n              }\n            }\n          };\n\n          _this.submitCompleted = function (result) {\n            delete _this.submitPromise;\n            return result;\n          };\n\n          _this.submitFailed = function (error) {\n            delete _this.submitPromise;\n            throw error;\n          };\n\n          _this.listenToSubmit = function (promise) {\n            if (!(0, _isPromise[\"default\"])(promise)) {\n              return promise;\n            }\n\n            _this.submitPromise = promise;\n            return promise.then(_this.submitCompleted, _this.submitFailed);\n          };\n\n          _this.submit = function (submitOrEvent) {\n            var _this$props3 = _this.props,\n                onSubmit = _this$props3.onSubmit,\n                blur = _this$props3.blur,\n                change = _this$props3.change,\n                dispatch = _this$props3.dispatch;\n\n            if (!submitOrEvent || (0, _silenceEvent[\"default\"])(submitOrEvent)) {\n              // submitOrEvent is an event: fire submit if not already submitting\n              if (!_this.submitPromise) {\n                // avoid recursive stack trace if use Form with onSubmit as handleSubmit\n                if (_this.innerOnSubmit && _this.innerOnSubmit !== _this.submit) {\n                  // will call \"submitOrEvent is the submit function\" block below\n                  return _this.innerOnSubmit();\n                } else {\n                  return _this.listenToSubmit((0, _handleSubmit[\"default\"])(checkSubmit(onSubmit), (0, _extends2[\"default\"])({}, _this.props, (0, _redux.bindActionCreators)({\n                    blur: blur,\n                    change: change\n                  }, dispatch)), _this.props.validExceptSubmit, _this.asyncValidate, _this.getFieldList({\n                    excludeFieldArray: true,\n                    excludeUnregistered: true\n                  })));\n                }\n              }\n            } else {\n              // submitOrEvent is the submit function: return deferred submit thunk\n              return (0, _silenceEvents[\"default\"])(function () {\n                return !_this.submitPromise && _this.listenToSubmit((0, _handleSubmit[\"default\"])(checkSubmit(submitOrEvent), (0, _extends2[\"default\"])({}, _this.props, (0, _redux.bindActionCreators)({\n                  blur: blur,\n                  change: change\n                }, dispatch)), _this.props.validExceptSubmit, _this.asyncValidate, _this.getFieldList({\n                  excludeFieldArray: true,\n                  excludeUnregistered: true\n                })));\n              });\n            }\n          };\n\n          _this.reset = function () {\n            return _this.props.reset();\n          };\n\n          return _this;\n        }\n\n        var _proto = Form.prototype;\n\n        _proto.initIfNeeded = function initIfNeeded(nextProps) {\n          var enableReinitialize = this.props.enableReinitialize;\n\n          if (nextProps) {\n            if ((enableReinitialize || !nextProps.initialized) && !deepEqual(this.props.initialValues, nextProps.initialValues)) {\n              var _keepDirty = nextProps.initialized && this.props.keepDirtyOnReinitialize;\n\n              this.props.initialize(nextProps.initialValues, _keepDirty, {\n                keepValues: nextProps.keepValues,\n                lastInitialValues: this.props.initialValues,\n                updateUnregisteredFields: nextProps.updateUnregisteredFields\n              });\n            }\n          } else if (this.props.initialValues && (!this.props.initialized || enableReinitialize)) {\n            this.props.initialize(this.props.initialValues, this.props.keepDirtyOnReinitialize, {\n              keepValues: this.props.keepValues,\n              updateUnregisteredFields: this.props.updateUnregisteredFields\n            });\n          }\n        };\n\n        _proto.updateSyncErrorsIfNeeded = function updateSyncErrorsIfNeeded(nextSyncErrors, nextError, lastSyncErrors) {\n          var _this$props4 = this.props,\n              error = _this$props4.error,\n              updateSyncErrors = _this$props4.updateSyncErrors;\n          var noErrors = (!lastSyncErrors || !Object.keys(lastSyncErrors).length) && !error;\n          var nextNoErrors = (!nextSyncErrors || !Object.keys(nextSyncErrors).length) && !nextError;\n\n          if (!(noErrors && nextNoErrors) && (!_plain[\"default\"].deepEqual(lastSyncErrors, nextSyncErrors) || !_plain[\"default\"].deepEqual(error, nextError))) {\n            updateSyncErrors(nextSyncErrors, nextError);\n          }\n        };\n\n        _proto.clearSubmitPromiseIfNeeded = function clearSubmitPromiseIfNeeded(nextProps) {\n          var submitting = this.props.submitting;\n\n          if (this.submitPromise && submitting && !nextProps.submitting) {\n            delete this.submitPromise;\n          }\n        };\n\n        _proto.submitIfNeeded = function submitIfNeeded(nextProps) {\n          var _this$props5 = this.props,\n              clearSubmit = _this$props5.clearSubmit,\n              triggerSubmit = _this$props5.triggerSubmit;\n\n          if (!triggerSubmit && nextProps.triggerSubmit) {\n            clearSubmit();\n            this.submit();\n          }\n        };\n\n        _proto.shouldErrorFunction = function shouldErrorFunction() {\n          var _this$props6 = this.props,\n              shouldValidate = _this$props6.shouldValidate,\n              shouldError = _this$props6.shouldError;\n          var shouldValidateOverridden = shouldValidate !== _defaultShouldValidate[\"default\"];\n          var shouldErrorOverridden = shouldError !== _defaultShouldError[\"default\"];\n          return shouldValidateOverridden && !shouldErrorOverridden ? shouldValidate : shouldError;\n        };\n\n        _proto.validateIfNeeded = function validateIfNeeded(nextProps) {\n          var _this$props7 = this.props,\n              validate = _this$props7.validate,\n              values = _this$props7.values;\n          var shouldError = this.shouldErrorFunction();\n          var fieldLevelValidate = this.generateValidator();\n\n          if (validate || fieldLevelValidate) {\n            var initialRender = nextProps === undefined;\n            var fieldValidatorKeys = Object.keys(this.getValidators());\n            var validateParams = {\n              values: values,\n              nextProps: nextProps,\n              props: this.props,\n              initialRender: initialRender,\n              lastFieldValidatorKeys: this.lastFieldValidatorKeys,\n              fieldValidatorKeys: fieldValidatorKeys,\n              structure: structure\n            };\n\n            if (shouldError(validateParams)) {\n              var propsToValidate = initialRender || !nextProps ? this.props : nextProps;\n\n              var _merge2 = (0, _merge4[\"default\"])(validate ? validate(propsToValidate.values, propsToValidate) || {} : {}, fieldLevelValidate ? fieldLevelValidate(propsToValidate.values, propsToValidate) || {} : {}),\n                  _error = _merge2._error,\n                  nextSyncErrors = (0, _objectWithoutPropertiesLoose2[\"default\"])(_merge2, [\"_error\"]);\n\n              this.lastFieldValidatorKeys = fieldValidatorKeys;\n              this.updateSyncErrorsIfNeeded(nextSyncErrors, _error, propsToValidate.syncErrors);\n            }\n          } else {\n            this.lastFieldValidatorKeys = [];\n          }\n        };\n\n        _proto.updateSyncWarningsIfNeeded = function updateSyncWarningsIfNeeded(nextSyncWarnings, nextWarning, lastSyncWarnings) {\n          var _this$props8 = this.props,\n              warning = _this$props8.warning,\n              syncWarnings = _this$props8.syncWarnings,\n              updateSyncWarnings = _this$props8.updateSyncWarnings;\n          var noWarnings = (!syncWarnings || !Object.keys(syncWarnings).length) && !warning;\n          var nextNoWarnings = (!nextSyncWarnings || !Object.keys(nextSyncWarnings).length) && !nextWarning;\n\n          if (!(noWarnings && nextNoWarnings) && (!_plain[\"default\"].deepEqual(lastSyncWarnings, nextSyncWarnings) || !_plain[\"default\"].deepEqual(warning, nextWarning))) {\n            updateSyncWarnings(nextSyncWarnings, nextWarning);\n          }\n        };\n\n        _proto.shouldWarnFunction = function shouldWarnFunction() {\n          var _this$props9 = this.props,\n              shouldValidate = _this$props9.shouldValidate,\n              shouldWarn = _this$props9.shouldWarn;\n          var shouldValidateOverridden = shouldValidate !== _defaultShouldValidate[\"default\"];\n          var shouldWarnOverridden = shouldWarn !== _defaultShouldWarn[\"default\"];\n          return shouldValidateOverridden && !shouldWarnOverridden ? shouldValidate : shouldWarn;\n        };\n\n        _proto.warnIfNeeded = function warnIfNeeded(nextProps) {\n          var _this$props10 = this.props,\n              warn = _this$props10.warn,\n              values = _this$props10.values;\n          var shouldWarn = this.shouldWarnFunction();\n          var fieldLevelWarn = this.generateWarner();\n\n          if (warn || fieldLevelWarn) {\n            var initialRender = nextProps === undefined;\n            var fieldWarnerKeys = Object.keys(this.getWarners());\n            var validateParams = {\n              values: values,\n              nextProps: nextProps,\n              props: this.props,\n              initialRender: initialRender,\n              lastFieldValidatorKeys: this.lastFieldWarnerKeys,\n              fieldValidatorKeys: fieldWarnerKeys,\n              structure: structure\n            };\n\n            if (shouldWarn(validateParams)) {\n              var propsToWarn = initialRender || !nextProps ? this.props : nextProps;\n\n              var _merge3 = (0, _merge4[\"default\"])(warn ? warn(propsToWarn.values, propsToWarn) : {}, fieldLevelWarn ? fieldLevelWarn(propsToWarn.values, propsToWarn) : {}),\n                  _warning = _merge3._warning,\n                  nextSyncWarnings = (0, _objectWithoutPropertiesLoose2[\"default\"])(_merge3, [\"_warning\"]);\n\n              this.lastFieldWarnerKeys = fieldWarnerKeys;\n              this.updateSyncWarningsIfNeeded(nextSyncWarnings, _warning, propsToWarn.syncWarnings);\n            }\n          }\n        };\n\n        _proto.componentWillMount = function componentWillMount() {\n          if (!(0, _isHotReloading[\"default\"])()) {\n            this.initIfNeeded();\n            this.validateIfNeeded();\n            this.warnIfNeeded();\n          }\n\n          (0, _invariant[\"default\"])(this.props.shouldValidate, 'shouldValidate() is deprecated and will be removed in v9.0.0. Use shouldWarn() or shouldError() instead.');\n        };\n\n        _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {\n          this.initIfNeeded(nextProps);\n          this.validateIfNeeded(nextProps);\n          this.warnIfNeeded(nextProps);\n          this.clearSubmitPromiseIfNeeded(nextProps);\n          this.submitIfNeeded(nextProps);\n          var onChange = nextProps.onChange,\n              values = nextProps.values,\n              dispatch = nextProps.dispatch;\n\n          if (onChange && !deepEqual(values, this.props.values)) {\n            onChange(values, dispatch, nextProps, this.props.values);\n          }\n        };\n\n        _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {\n          var _this2 = this;\n\n          if (!this.props.pure) return true;\n          var _config$immutableProp = config.immutableProps,\n              immutableProps = _config$immutableProp === void 0 ? [] : _config$immutableProp; // if we have children, we MUST update in React 16\n          // https://twitter.com/erikras/status/915866544558788608\n\n          return !!(this.props.children || nextProps.children || Object.keys(nextProps).some(function (prop) {\n            // useful to debug rerenders\n            // if (!plain.deepEqual(this.props[ prop ], nextProps[ prop ])) {\n            //   console.info(prop, 'changed', this.props[ prop ], '==>', nextProps[ prop ])\n            // }\n            if (~immutableProps.indexOf(prop)) {\n              return _this2.props[prop] !== nextProps[prop];\n            }\n\n            return !~propsToNotUpdateFor.indexOf(prop) && !deepEqual(_this2.props[prop], nextProps[prop]);\n          }));\n        };\n\n        _proto.componentDidMount = function componentDidMount() {\n          if (!(0, _isHotReloading[\"default\"])()) {\n            this.initIfNeeded(this.props);\n            this.validateIfNeeded();\n            this.warnIfNeeded();\n          }\n\n          (0, _invariant[\"default\"])(this.props.shouldValidate, 'shouldValidate() is deprecated and will be removed in v9.0.0. Use shouldWarn() or shouldError() instead.');\n        };\n\n        _proto.componentWillUnmount = function componentWillUnmount() {\n          var _this$props11 = this.props,\n              destroyOnUnmount = _this$props11.destroyOnUnmount,\n              destroy = _this$props11.destroy;\n\n          if (destroyOnUnmount && !(0, _isHotReloading[\"default\"])()) {\n            this.destroyed = true;\n            destroy();\n          }\n        };\n\n        _proto.render = function render() {\n          var _ref,\n              _this3 = this;\n\n          // remove some redux-form config-only props\n\n          /* eslint-disable no-unused-vars */\n          var _this$props12 = this.props,\n              anyTouched = _this$props12.anyTouched,\n              array = _this$props12.array,\n              arrayInsert = _this$props12.arrayInsert,\n              arrayMove = _this$props12.arrayMove,\n              arrayPop = _this$props12.arrayPop,\n              arrayPush = _this$props12.arrayPush,\n              arrayRemove = _this$props12.arrayRemove,\n              arrayRemoveAll = _this$props12.arrayRemoveAll,\n              arrayShift = _this$props12.arrayShift,\n              arraySplice = _this$props12.arraySplice,\n              arraySwap = _this$props12.arraySwap,\n              arrayUnshift = _this$props12.arrayUnshift,\n              asyncErrors = _this$props12.asyncErrors,\n              asyncValidate = _this$props12.asyncValidate,\n              asyncValidating = _this$props12.asyncValidating,\n              blur = _this$props12.blur,\n              change = _this$props12.change,\n              clearSubmit = _this$props12.clearSubmit,\n              destroy = _this$props12.destroy,\n              destroyOnUnmount = _this$props12.destroyOnUnmount,\n              forceUnregisterOnUnmount = _this$props12.forceUnregisterOnUnmount,\n              dirty = _this$props12.dirty,\n              dispatch = _this$props12.dispatch,\n              enableReinitialize = _this$props12.enableReinitialize,\n              error = _this$props12.error,\n              focus = _this$props12.focus,\n              form = _this$props12.form,\n              getFormState = _this$props12.getFormState,\n              immutableProps = _this$props12.immutableProps,\n              initialize = _this$props12.initialize,\n              initialized = _this$props12.initialized,\n              initialValues = _this$props12.initialValues,\n              invalid = _this$props12.invalid,\n              keepDirtyOnReinitialize = _this$props12.keepDirtyOnReinitialize,\n              keepValues = _this$props12.keepValues,\n              updateUnregisteredFields = _this$props12.updateUnregisteredFields,\n              pristine = _this$props12.pristine,\n              propNamespace = _this$props12.propNamespace,\n              registeredFields = _this$props12.registeredFields,\n              registerField = _this$props12.registerField,\n              reset = _this$props12.reset,\n              resetSection = _this$props12.resetSection,\n              setSubmitFailed = _this$props12.setSubmitFailed,\n              setSubmitSucceeded = _this$props12.setSubmitSucceeded,\n              shouldAsyncValidate = _this$props12.shouldAsyncValidate,\n              shouldValidate = _this$props12.shouldValidate,\n              shouldError = _this$props12.shouldError,\n              shouldWarn = _this$props12.shouldWarn,\n              startAsyncValidation = _this$props12.startAsyncValidation,\n              startSubmit = _this$props12.startSubmit,\n              stopAsyncValidation = _this$props12.stopAsyncValidation,\n              stopSubmit = _this$props12.stopSubmit,\n              submitAsSideEffect = _this$props12.submitAsSideEffect,\n              submitting = _this$props12.submitting,\n              submitFailed = _this$props12.submitFailed,\n              submitSucceeded = _this$props12.submitSucceeded,\n              touch = _this$props12.touch,\n              touchOnBlur = _this$props12.touchOnBlur,\n              touchOnChange = _this$props12.touchOnChange,\n              persistentSubmitErrors = _this$props12.persistentSubmitErrors,\n              syncErrors = _this$props12.syncErrors,\n              syncWarnings = _this$props12.syncWarnings,\n              unregisterField = _this$props12.unregisterField,\n              untouch = _this$props12.untouch,\n              updateSyncErrors = _this$props12.updateSyncErrors,\n              updateSyncWarnings = _this$props12.updateSyncWarnings,\n              valid = _this$props12.valid,\n              validExceptSubmit = _this$props12.validExceptSubmit,\n              values = _this$props12.values,\n              warning = _this$props12.warning,\n              rest = (0, _objectWithoutPropertiesLoose2[\"default\"])(_this$props12, [\"anyTouched\", \"array\", \"arrayInsert\", \"arrayMove\", \"arrayPop\", \"arrayPush\", \"arrayRemove\", \"arrayRemoveAll\", \"arrayShift\", \"arraySplice\", \"arraySwap\", \"arrayUnshift\", \"asyncErrors\", \"asyncValidate\", \"asyncValidating\", \"blur\", \"change\", \"clearSubmit\", \"destroy\", \"destroyOnUnmount\", \"forceUnregisterOnUnmount\", \"dirty\", \"dispatch\", \"enableReinitialize\", \"error\", \"focus\", \"form\", \"getFormState\", \"immutableProps\", \"initialize\", \"initialized\", \"initialValues\", \"invalid\", \"keepDirtyOnReinitialize\", \"keepValues\", \"updateUnregisteredFields\", \"pristine\", \"propNamespace\", \"registeredFields\", \"registerField\", \"reset\", \"resetSection\", \"setSubmitFailed\", \"setSubmitSucceeded\", \"shouldAsyncValidate\", \"shouldValidate\", \"shouldError\", \"shouldWarn\", \"startAsyncValidation\", \"startSubmit\", \"stopAsyncValidation\", \"stopSubmit\", \"submitAsSideEffect\", \"submitting\", \"submitFailed\", \"submitSucceeded\", \"touch\", \"touchOnBlur\", \"touchOnChange\", \"persistentSubmitErrors\", \"syncErrors\", \"syncWarnings\", \"unregisterField\", \"untouch\", \"updateSyncErrors\", \"updateSyncWarnings\", \"valid\", \"validExceptSubmit\", \"values\", \"warning\"]);\n          /* eslint-enable no-unused-vars */\n\n          var reduxFormProps = (0, _extends2[\"default\"])({\n            array: array,\n            anyTouched: anyTouched,\n            asyncValidate: this.asyncValidate,\n            asyncValidating: asyncValidating\n          }, (0, _redux.bindActionCreators)({\n            blur: blur,\n            change: change\n          }, dispatch), {\n            clearSubmit: clearSubmit,\n            destroy: destroy,\n            dirty: dirty,\n            dispatch: dispatch,\n            error: error,\n            form: form,\n            handleSubmit: this.submit,\n            initialize: initialize,\n            initialized: initialized,\n            initialValues: initialValues,\n            invalid: invalid,\n            pristine: pristine,\n            reset: reset,\n            resetSection: resetSection,\n            submitting: submitting,\n            submitAsSideEffect: submitAsSideEffect,\n            submitFailed: submitFailed,\n            submitSucceeded: submitSucceeded,\n            touch: touch,\n            untouch: untouch,\n            valid: valid,\n            warning: warning\n          });\n          var propsToPass = (0, _extends2[\"default\"])({}, propNamespace ? (_ref = {}, _ref[propNamespace] = reduxFormProps, _ref) : reduxFormProps, rest);\n\n          if (isClassComponent(WrappedComponent)) {\n            ;\n            propsToPass.ref = this.wrapped;\n          }\n\n          var _reduxForm = (0, _extends2[\"default\"])({}, this.props, {\n            getFormState: function getFormState(state) {\n              return getIn(_this3.props.getFormState(state), _this3.props.form);\n            },\n            asyncValidate: this.asyncValidate,\n            getValues: this.getValues,\n            sectionPrefix: undefined,\n            register: this.register,\n            unregister: this.unregister,\n            registerInnerOnSubmit: function registerInnerOnSubmit(innerOnSubmit) {\n              return _this3.innerOnSubmit = innerOnSubmit;\n            }\n          });\n\n          return (0, _react.createElement)(_ReduxFormContext.ReduxFormContext.Provider, {\n            value: _reduxForm,\n            children: (0, _react.createElement)(WrappedComponent, propsToPass)\n          });\n        };\n\n        return Form;\n      }(_react[\"default\"].Component);\n\n      Form.displayName = \"Form(\" + (0, _getDisplayName[\"default\"])(WrappedComponent) + \")\";\n      Form.WrappedComponent = WrappedComponent;\n      Form.propTypes = {\n        destroyOnUnmount: _propTypes[\"default\"].bool,\n        forceUnregisterOnUnmount: _propTypes[\"default\"].bool,\n        form: _propTypes[\"default\"].string.isRequired,\n        immutableProps: _propTypes[\"default\"].arrayOf(_propTypes[\"default\"].string),\n        initialValues: _propTypes[\"default\"].oneOfType([_propTypes[\"default\"].array, _propTypes[\"default\"].object]),\n        getFormState: _propTypes[\"default\"].func,\n        onSubmitFail: _propTypes[\"default\"].func,\n        onSubmitSuccess: _propTypes[\"default\"].func,\n        propNamespace: _propTypes[\"default\"].string,\n        validate: _propTypes[\"default\"].func,\n        warn: _propTypes[\"default\"].func,\n        touchOnBlur: _propTypes[\"default\"].bool,\n        touchOnChange: _propTypes[\"default\"].bool,\n        triggerSubmit: _propTypes[\"default\"].bool,\n        persistentSubmitErrors: _propTypes[\"default\"].bool,\n        registeredFields: _propTypes[\"default\"].any\n      };\n      var connector = (0, _reactRedux.connect)(function (state, props) {\n        var form = props.form,\n            getFormState = props.getFormState,\n            initialValues = props.initialValues,\n            enableReinitialize = props.enableReinitialize,\n            keepDirtyOnReinitialize = props.keepDirtyOnReinitialize;\n        var formState = getIn(getFormState(state) || empty, form) || empty;\n        var stateInitial = getIn(formState, 'initial');\n        var initialized = !!stateInitial;\n        var shouldUpdateInitialValues = enableReinitialize && initialized && !deepEqual(initialValues, stateInitial);\n        var shouldResetValues = shouldUpdateInitialValues && !keepDirtyOnReinitialize;\n        var initial = initialValues || stateInitial || empty;\n\n        if (!shouldUpdateInitialValues) {\n          initial = stateInitial || empty;\n        }\n\n        var values = getIn(formState, 'values') || initial;\n\n        if (shouldResetValues) {\n          values = initial;\n        }\n\n        var pristine = shouldResetValues || deepEqual(initial, values);\n        var asyncErrors = getIn(formState, 'asyncErrors');\n\n        var syncErrors = getIn(formState, 'syncErrors') || _plain[\"default\"].empty;\n\n        var syncWarnings = getIn(formState, 'syncWarnings') || _plain[\"default\"].empty;\n\n        var registeredFields = getIn(formState, 'registeredFields');\n        var valid = isValid(form, getFormState, false)(state);\n        var validExceptSubmit = isValid(form, getFormState, true)(state);\n        var anyTouched = !!getIn(formState, 'anyTouched');\n        var submitting = !!getIn(formState, 'submitting');\n        var submitFailed = !!getIn(formState, 'submitFailed');\n        var submitSucceeded = !!getIn(formState, 'submitSucceeded');\n        var error = getIn(formState, 'error');\n        var warning = getIn(formState, 'warning');\n        var triggerSubmit = getIn(formState, 'triggerSubmit');\n        return {\n          anyTouched: anyTouched,\n          asyncErrors: asyncErrors,\n          asyncValidating: getIn(formState, 'asyncValidating') || false,\n          dirty: !pristine,\n          error: error,\n          initialized: initialized,\n          invalid: !valid,\n          pristine: pristine,\n          registeredFields: registeredFields,\n          submitting: submitting,\n          submitFailed: submitFailed,\n          submitSucceeded: submitSucceeded,\n          syncErrors: syncErrors,\n          syncWarnings: syncWarnings,\n          triggerSubmit: triggerSubmit,\n          values: values,\n          valid: valid,\n          validExceptSubmit: validExceptSubmit,\n          warning: warning\n        };\n      }, function (dispatch, initialProps) {\n        var bindForm = function bindForm(actionCreator) {\n          return actionCreator.bind(null, initialProps.form);\n        }; // Bind the first parameter on `props.form`\n\n\n        var boundFormACs = (0, _mapValues2[\"default\"])(formActions, bindForm);\n        var boundArrayACs = (0, _mapValues2[\"default\"])(arrayActions, bindForm);\n\n        var boundBlur = function boundBlur(field, value) {\n          return blur(initialProps.form, field, value, !!initialProps.touchOnBlur);\n        };\n\n        var boundChange = function boundChange(field, value) {\n          return change(initialProps.form, field, value, !!initialProps.touchOnChange, !!initialProps.persistentSubmitErrors);\n        };\n\n        var boundFocus = bindForm(focus); // Wrap action creators with `dispatch`\n\n        var connectedFormACs = (0, _redux.bindActionCreators)(boundFormACs, dispatch);\n        var connectedArrayACs = {\n          insert: (0, _redux.bindActionCreators)(boundArrayACs.arrayInsert, dispatch),\n          move: (0, _redux.bindActionCreators)(boundArrayACs.arrayMove, dispatch),\n          pop: (0, _redux.bindActionCreators)(boundArrayACs.arrayPop, dispatch),\n          push: (0, _redux.bindActionCreators)(boundArrayACs.arrayPush, dispatch),\n          remove: (0, _redux.bindActionCreators)(boundArrayACs.arrayRemove, dispatch),\n          removeAll: (0, _redux.bindActionCreators)(boundArrayACs.arrayRemoveAll, dispatch),\n          shift: (0, _redux.bindActionCreators)(boundArrayACs.arrayShift, dispatch),\n          splice: (0, _redux.bindActionCreators)(boundArrayACs.arraySplice, dispatch),\n          swap: (0, _redux.bindActionCreators)(boundArrayACs.arraySwap, dispatch),\n          unshift: (0, _redux.bindActionCreators)(boundArrayACs.arrayUnshift, dispatch)\n        };\n        var computedActions = (0, _extends2[\"default\"])({}, connectedFormACs, boundArrayACs, {\n          blur: boundBlur,\n          change: boundChange,\n          array: connectedArrayACs,\n          focus: boundFocus,\n          dispatch: dispatch\n        });\n        return function () {\n          return computedActions;\n        };\n      }, undefined, {\n        forwardRef: true\n      });\n      var ConnectedForm = (0, _hoistNonReactStatics[\"default\"])(connector(Form), WrappedComponent);\n      ConnectedForm.defaultProps = config; // build outer component to expose instance api\n\n      var ReduxForm =\n      /*#__PURE__*/\n      function (_React$Component2) {\n        (0, _inheritsLoose2[\"default\"])(ReduxForm, _React$Component2);\n\n        function ReduxForm() {\n          var _this4;\n\n          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n            args[_key2] = arguments[_key2];\n          }\n\n          _this4 = _React$Component2.call.apply(_React$Component2, [this].concat(args)) || this;\n          _this4.ref = _react[\"default\"].createRef();\n          return _this4;\n        }\n\n        var _proto2 = ReduxForm.prototype;\n\n        _proto2.submit = function submit() {\n          return this.ref.current && this.ref.current.submit();\n        };\n\n        _proto2.reset = function reset() {\n          if (this.ref) {\n            this.ref.current.reset();\n          }\n        };\n\n        _proto2.render = function render() {\n          var _this$props13 = this.props,\n              initialValues = _this$props13.initialValues,\n              rest = (0, _objectWithoutPropertiesLoose2[\"default\"])(_this$props13, [\"initialValues\"]);\n          return (0, _react.createElement)(ConnectedForm, (0, _extends2[\"default\"])({}, rest, {\n            ref: this.ref,\n            // convert initialValues if need to\n            initialValues: fromJS(initialValues)\n          }));\n        };\n\n        (0, _createClass2[\"default\"])(ReduxForm, [{\n          key: \"valid\",\n          get: function get() {\n            return !!(this.ref.current && this.ref.current.isValid());\n          }\n        }, {\n          key: \"invalid\",\n          get: function get() {\n            return !this.valid;\n          }\n        }, {\n          key: \"pristine\",\n          get: function get() {\n            return !!(this.ref.current && this.ref.current.isPristine());\n          }\n        }, {\n          key: \"dirty\",\n          get: function get() {\n            return !this.pristine;\n          }\n        }, {\n          key: \"values\",\n          get: function get() {\n            return this.ref.current ? this.ref.current.getValues() : empty;\n          }\n        }, {\n          key: \"fieldList\",\n          get: function get() {\n            // mainly provided for testing\n            return this.ref.current ? this.ref.current.getFieldList() : [];\n          }\n        }, {\n          key: \"wrappedInstance\",\n          get: function get() {\n            // for testing\n            return this.ref.current && this.ref.current.wrapped.current;\n          }\n        }]);\n        return ReduxForm;\n      }(_react[\"default\"].Component);\n\n      (0, _reactLifecyclesCompat.polyfill)(ReduxForm);\n      var WithContext = (0, _hoistNonReactStatics[\"default\"])((0, _ReduxFormContext.withReduxForm)(ReduxForm), WrappedComponent);\n      WithContext.defaultProps = config;\n      return WithContext;\n    };\n  };\n};\n\nvar _default = createReduxForm;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/createReduxForm.js?");

/***/ }),

/***/ "./src/createValues.js":
/*!*****************************!*\
  !*** ./src/createValues.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _reactRedux = __webpack_require__(/*! react-redux */ \"react-redux\");\n\nvar createValues = function createValues(_ref) {\n  var getIn = _ref.getIn;\n  return function (config) {\n    var _prop$getFormState$co = (0, _extends2[\"default\"])({\n      prop: 'values',\n      getFormState: function getFormState(state) {\n        return getIn(state, 'form');\n      }\n    }, config),\n        form = _prop$getFormState$co.form,\n        prop = _prop$getFormState$co.prop,\n        getFormState = _prop$getFormState$co.getFormState;\n\n    return (0, _reactRedux.connect)(function (state) {\n      var _ref2;\n\n      return _ref2 = {}, _ref2[prop] = getIn(getFormState(state), form + \".values\"), _ref2;\n    } // ignore dispatch\n    );\n  };\n};\n\nvar _default = createValues;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/createValues.js?");

/***/ }),

/***/ "./src/defaultShouldAsyncValidate.js":
/*!*******************************************!*\
  !*** ./src/defaultShouldAsyncValidate.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar defaultShouldAsyncValidate = function defaultShouldAsyncValidate(_ref) {\n  var initialized = _ref.initialized,\n      trigger = _ref.trigger,\n      pristine = _ref.pristine,\n      syncValidationPasses = _ref.syncValidationPasses;\n\n  if (!syncValidationPasses) {\n    return false;\n  }\n\n  switch (trigger) {\n    case 'blur':\n    case 'change':\n      // blurring\n      return true;\n\n    case 'submit':\n      // submitting, so only async validate if form is dirty or was never initialized\n      // conversely, DON'T async validate if the form is pristine just as it was initialized\n      return !pristine || !initialized;\n\n    default:\n      return false;\n  }\n};\n\nvar _default = defaultShouldAsyncValidate;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/defaultShouldAsyncValidate.js?");

/***/ }),

/***/ "./src/defaultShouldError.js":
/*!***********************************!*\
  !*** ./src/defaultShouldError.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar defaultShouldError = function defaultShouldError(_ref) {\n  var values = _ref.values,\n      nextProps = _ref.nextProps,\n      initialRender = _ref.initialRender,\n      lastFieldValidatorKeys = _ref.lastFieldValidatorKeys,\n      fieldValidatorKeys = _ref.fieldValidatorKeys,\n      structure = _ref.structure;\n\n  if (initialRender) {\n    return true;\n  }\n\n  return !structure.deepEqual(values, nextProps && nextProps.values) || !structure.deepEqual(lastFieldValidatorKeys, fieldValidatorKeys);\n};\n\nvar _default = defaultShouldError;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/defaultShouldError.js?");

/***/ }),

/***/ "./src/defaultShouldValidate.js":
/*!**************************************!*\
  !*** ./src/defaultShouldValidate.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar defaultShouldValidate = function defaultShouldValidate(_ref) {\n  var values = _ref.values,\n      nextProps = _ref.nextProps,\n      initialRender = _ref.initialRender,\n      lastFieldValidatorKeys = _ref.lastFieldValidatorKeys,\n      fieldValidatorKeys = _ref.fieldValidatorKeys,\n      structure = _ref.structure;\n\n  if (initialRender) {\n    return true;\n  }\n\n  return !structure.deepEqual(values, nextProps && nextProps.values) || !structure.deepEqual(lastFieldValidatorKeys, fieldValidatorKeys);\n};\n\nvar _default = defaultShouldValidate;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/defaultShouldValidate.js?");

/***/ }),

/***/ "./src/defaultShouldWarn.js":
/*!**********************************!*\
  !*** ./src/defaultShouldWarn.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar defaultShouldWarn = function defaultShouldWarn(_ref) {\n  var values = _ref.values,\n      nextProps = _ref.nextProps,\n      initialRender = _ref.initialRender,\n      lastFieldValidatorKeys = _ref.lastFieldValidatorKeys,\n      fieldValidatorKeys = _ref.fieldValidatorKeys,\n      structure = _ref.structure;\n\n  if (initialRender) {\n    return true;\n  }\n\n  return !structure.deepEqual(values, nextProps && nextProps.values) || !structure.deepEqual(lastFieldValidatorKeys, fieldValidatorKeys);\n};\n\nvar _default = defaultShouldWarn;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/defaultShouldWarn.js?");

/***/ }),

/***/ "./src/deleteInWithCleanUp.js":
/*!************************************!*\
  !*** ./src/deleteInWithCleanUp.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _toPath2 = _interopRequireDefault(__webpack_require__(/*! lodash/toPath */ \"./node_modules/lodash/toPath.js\"));\n\nfunction createDeleteInWithCleanUp(structure) {\n  var shouldDeleteDefault = function shouldDeleteDefault(structure) {\n    return function (state, path) {\n      return structure.getIn(state, path) !== undefined;\n    };\n  };\n\n  var deepEqual = structure.deepEqual,\n      empty = structure.empty,\n      getIn = structure.getIn,\n      deleteIn = structure.deleteIn,\n      setIn = structure.setIn;\n  return function (shouldDelete) {\n    if (shouldDelete === void 0) {\n      shouldDelete = shouldDeleteDefault;\n    }\n\n    var deleteInWithCleanUp = function deleteInWithCleanUp(state, path) {\n      if (path[path.length - 1] === ']') {\n        // array path\n        var pathTokens = (0, _toPath2[\"default\"])(path);\n        pathTokens.pop();\n        var parent = getIn(state, pathTokens.join('.'));\n        return parent ? setIn(state, path) : state;\n      }\n\n      var result = state;\n\n      if (shouldDelete(structure)(state, path)) {\n        result = deleteIn(state, path);\n      }\n\n      var dotIndex = path.lastIndexOf('.');\n\n      if (dotIndex > 0) {\n        var parentPath = path.substring(0, dotIndex);\n\n        if (parentPath[parentPath.length - 1] !== ']') {\n          var _parent = getIn(result, parentPath);\n\n          if (deepEqual(_parent, empty)) {\n            return deleteInWithCleanUp(result, parentPath);\n          }\n        }\n      }\n\n      return result;\n    };\n\n    return deleteInWithCleanUp;\n  };\n}\n\nvar _default = createDeleteInWithCleanUp;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/deleteInWithCleanUp.js?");

/***/ }),

/***/ "./src/events/getValue.js":
/*!********************************!*\
  !*** ./src/events/getValue.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _isEvent = _interopRequireDefault(__webpack_require__(/*! ./isEvent */ \"./src/events/isEvent.js\"));\n\nvar getSelectedValues = function getSelectedValues(options) {\n  var result = [];\n\n  if (options) {\n    for (var index = 0; index < options.length; index++) {\n      var option = options[index];\n\n      if (option.selected) {\n        result.push(option.value);\n      }\n    }\n  }\n\n  return result;\n};\n\nvar getValue = function getValue(event, isReactNative) {\n  if ((0, _isEvent[\"default\"])(event)) {\n    if (!isReactNative && event.nativeEvent && event.nativeEvent.text !== undefined) {\n      return event.nativeEvent.text;\n    }\n\n    if (isReactNative && event.nativeEvent !== undefined) {\n      return event.nativeEvent.text;\n    }\n\n    var detypedEvent = event;\n    var _detypedEvent$target = detypedEvent.target,\n        type = _detypedEvent$target.type,\n        value = _detypedEvent$target.value,\n        checked = _detypedEvent$target.checked,\n        files = _detypedEvent$target.files,\n        dataTransfer = detypedEvent.dataTransfer;\n\n    if (type === 'checkbox') {\n      return !!checked;\n    }\n\n    if (type === 'file') {\n      return files || dataTransfer && dataTransfer.files;\n    }\n\n    if (type === 'select-multiple') {\n      return getSelectedValues(event.target.options);\n    }\n\n    return value;\n  }\n\n  return event;\n};\n\nvar _default = getValue;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/events/getValue.js?");

/***/ }),

/***/ "./src/events/isEvent.js":
/*!*******************************!*\
  !*** ./src/events/isEvent.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar isEvent = function isEvent(candidate) {\n  return !!(candidate && candidate.stopPropagation && candidate.preventDefault);\n};\n\nvar _default = isEvent;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/events/isEvent.js?");

/***/ }),

/***/ "./src/events/onChangeValue.js":
/*!*************************************!*\
  !*** ./src/events/onChangeValue.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _getValue = _interopRequireDefault(__webpack_require__(/*! ./getValue */ \"./src/events/getValue.js\"));\n\nvar _isReactNative = _interopRequireDefault(__webpack_require__(/*! ../isReactNative */ \"./src/isReactNative.js\"));\n\nvar onChangeValue = function onChangeValue(event, _ref) {\n  var name = _ref.name,\n      parse = _ref.parse,\n      normalize = _ref.normalize;\n  // read value from input\n  var value = (0, _getValue[\"default\"])(event, _isReactNative[\"default\"]); // parse value if we have a parser\n\n  if (parse) {\n    value = parse(value, name);\n  } // normalize value\n\n\n  if (normalize) {\n    value = normalize(name, value);\n  }\n\n  return value;\n};\n\nvar _default = onChangeValue;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/events/onChangeValue.js?");

/***/ }),

/***/ "./src/events/silenceEvent.js":
/*!************************************!*\
  !*** ./src/events/silenceEvent.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _isEvent = _interopRequireDefault(__webpack_require__(/*! ./isEvent */ \"./src/events/isEvent.js\"));\n\nvar silenceEvent = function silenceEvent(event) {\n  var is = (0, _isEvent[\"default\"])(event);\n\n  if (is) {\n    event.preventDefault();\n  }\n\n  return is;\n};\n\nvar _default = silenceEvent;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/events/silenceEvent.js?");

/***/ }),

/***/ "./src/events/silenceEvents.js":
/*!*************************************!*\
  !*** ./src/events/silenceEvents.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _silenceEvent = _interopRequireDefault(__webpack_require__(/*! ./silenceEvent */ \"./src/events/silenceEvent.js\"));\n\nvar silenceEvents = function silenceEvents(fn) {\n  return function (event) {\n    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n      args[_key - 1] = arguments[_key];\n    }\n\n    return (0, _silenceEvent[\"default\"])(event) ? fn.apply(void 0, args) : fn.apply(void 0, [event].concat(args));\n  };\n};\n\nvar _default = silenceEvents;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/events/silenceEvents.js?");

/***/ }),

/***/ "./src/formValueSelector.js":
/*!**********************************!*\
  !*** ./src/formValueSelector.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _createFormValueSelector = _interopRequireDefault(__webpack_require__(/*! ./createFormValueSelector */ \"./src/createFormValueSelector.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _createFormValueSelector[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/formValueSelector.js?");

/***/ }),

/***/ "./src/formValues.js":
/*!***************************!*\
  !*** ./src/formValues.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _createFormValues = _interopRequireDefault(__webpack_require__(/*! ./createFormValues */ \"./src/createFormValues.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _createFormValues[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/formValues.js?");

/***/ }),

/***/ "./src/generateValidator.js":
/*!**********************************!*\
  !*** ./src/generateValidator.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar toArray = function toArray(value) {\n  return Array.isArray(value) ? value : [value];\n};\n\nvar getError = function getError(value, values, props, validators, name) {\n  var array = toArray(validators);\n\n  for (var i = 0; i < array.length; i++) {\n    var error = array[i](value, values, props, name);\n\n    if (error) {\n      return error;\n    }\n  }\n};\n\nvar generateValidator = function generateValidator(validators, _ref) {\n  var getIn = _ref.getIn;\n  return function (values, props) {\n    var errors = {};\n    Object.keys(validators).forEach(function (name) {\n      var value = getIn(values, name);\n      var error = getError(value, values, props, validators[name], name);\n\n      if (error) {\n        errors = _plain[\"default\"].setIn(errors, name, error);\n      }\n    });\n    return errors;\n  };\n};\n\nvar _default = generateValidator;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/generateValidator.js?");

/***/ }),

/***/ "./src/getFormAsyncErrors.js":
/*!***********************************!*\
  !*** ./src/getFormAsyncErrors.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _getFormAsyncErrors = _interopRequireDefault(__webpack_require__(/*! ./selectors/getFormAsyncErrors */ \"./src/selectors/getFormAsyncErrors.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _getFormAsyncErrors[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/getFormAsyncErrors.js?");

/***/ }),

/***/ "./src/getFormError.js":
/*!*****************************!*\
  !*** ./src/getFormError.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _getFormError = _interopRequireDefault(__webpack_require__(/*! ./selectors/getFormError */ \"./src/selectors/getFormError.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _getFormError[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/getFormError.js?");

/***/ }),

/***/ "./src/getFormInitialValues.js":
/*!*************************************!*\
  !*** ./src/getFormInitialValues.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _getFormInitialValues = _interopRequireDefault(__webpack_require__(/*! ./selectors/getFormInitialValues */ \"./src/selectors/getFormInitialValues.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _getFormInitialValues[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/getFormInitialValues.js?");

/***/ }),

/***/ "./src/getFormMeta.js":
/*!****************************!*\
  !*** ./src/getFormMeta.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _getFormMeta = _interopRequireDefault(__webpack_require__(/*! ./selectors/getFormMeta */ \"./src/selectors/getFormMeta.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _getFormMeta[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/getFormMeta.js?");

/***/ }),

/***/ "./src/getFormNames.js":
/*!*****************************!*\
  !*** ./src/getFormNames.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _getFormNames = _interopRequireDefault(__webpack_require__(/*! ./selectors/getFormNames */ \"./src/selectors/getFormNames.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _getFormNames[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/getFormNames.js?");

/***/ }),

/***/ "./src/getFormSubmitErrors.js":
/*!************************************!*\
  !*** ./src/getFormSubmitErrors.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _getFormSubmitErrors = _interopRequireDefault(__webpack_require__(/*! ./selectors/getFormSubmitErrors */ \"./src/selectors/getFormSubmitErrors.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _getFormSubmitErrors[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/getFormSubmitErrors.js?");

/***/ }),

/***/ "./src/getFormSyncErrors.js":
/*!**********************************!*\
  !*** ./src/getFormSyncErrors.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _getFormSyncErrors = _interopRequireDefault(__webpack_require__(/*! ./selectors/getFormSyncErrors */ \"./src/selectors/getFormSyncErrors.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _getFormSyncErrors[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/getFormSyncErrors.js?");

/***/ }),

/***/ "./src/getFormSyncWarnings.js":
/*!************************************!*\
  !*** ./src/getFormSyncWarnings.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _getFormSyncWarnings = _interopRequireDefault(__webpack_require__(/*! ./selectors/getFormSyncWarnings */ \"./src/selectors/getFormSyncWarnings.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _getFormSyncWarnings[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/getFormSyncWarnings.js?");

/***/ }),

/***/ "./src/getFormValues.js":
/*!******************************!*\
  !*** ./src/getFormValues.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _getFormValues = _interopRequireDefault(__webpack_require__(/*! ./selectors/getFormValues */ \"./src/selectors/getFormValues.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _getFormValues[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/getFormValues.js?");

/***/ }),

/***/ "./src/handleSubmit.js":
/*!*****************************!*\
  !*** ./src/handleSubmit.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ \"./node_modules/@babel/runtime/helpers/toConsumableArray.js\"));\n\nvar _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _isPromise = _interopRequireDefault(__webpack_require__(/*! is-promise */ \"./node_modules/is-promise/index.js\"));\n\nvar _SubmissionError = _interopRequireDefault(__webpack_require__(/*! ./SubmissionError */ \"./src/SubmissionError.js\"));\n\nvar isSubmissionError = function isSubmissionError(error) {\n  return error && error.name === _SubmissionError[\"default\"].name;\n};\n\nvar mergeErrors = function mergeErrors(_ref) {\n  var asyncErrors = _ref.asyncErrors,\n      syncErrors = _ref.syncErrors;\n  return asyncErrors && typeof asyncErrors.merge === 'function' ? asyncErrors.merge(syncErrors).toJS() : (0, _extends2[\"default\"])({}, asyncErrors, syncErrors);\n};\n\nvar executeSubmit = function executeSubmit(submit, fields, props) {\n  var dispatch = props.dispatch,\n      submitAsSideEffect = props.submitAsSideEffect,\n      onSubmitFail = props.onSubmitFail,\n      onSubmitSuccess = props.onSubmitSuccess,\n      startSubmit = props.startSubmit,\n      stopSubmit = props.stopSubmit,\n      setSubmitFailed = props.setSubmitFailed,\n      setSubmitSucceeded = props.setSubmitSucceeded,\n      values = props.values;\n  var result;\n\n  try {\n    result = submit(values, dispatch, props);\n  } catch (submitError) {\n    var error = isSubmissionError(submitError) ? submitError.errors : undefined;\n    stopSubmit(error);\n    setSubmitFailed.apply(void 0, (0, _toConsumableArray2[\"default\"])(fields));\n\n    if (onSubmitFail) {\n      onSubmitFail(error, dispatch, submitError, props);\n    }\n\n    if (error || onSubmitFail) {\n      // if you've provided an onSubmitFail callback, don't re-throw the error\n      return error;\n    } else {\n      throw submitError;\n    }\n  }\n\n  if (submitAsSideEffect) {\n    if (result) {\n      dispatch(result);\n    }\n  } else {\n    if ((0, _isPromise[\"default\"])(result)) {\n      startSubmit();\n      return result.then(function (submitResult) {\n        stopSubmit();\n        setSubmitSucceeded();\n\n        if (onSubmitSuccess) {\n          onSubmitSuccess(submitResult, dispatch, props);\n        }\n\n        return submitResult;\n      }, function (submitError) {\n        var error = isSubmissionError(submitError) ? submitError.errors : undefined;\n        stopSubmit(error);\n        setSubmitFailed.apply(void 0, (0, _toConsumableArray2[\"default\"])(fields));\n\n        if (onSubmitFail) {\n          onSubmitFail(error, dispatch, submitError, props);\n        }\n\n        if (error || onSubmitFail) {\n          // if you've provided an onSubmitFail callback, don't re-throw the error\n          return error;\n        } else {\n          throw submitError;\n        }\n      });\n    } else {\n      setSubmitSucceeded();\n\n      if (onSubmitSuccess) {\n        onSubmitSuccess(result, dispatch, props);\n      }\n    }\n  }\n\n  return result;\n};\n\nvar handleSubmit = function handleSubmit(submit, props, valid, asyncValidate, fields) {\n  var dispatch = props.dispatch,\n      onSubmitFail = props.onSubmitFail,\n      setSubmitFailed = props.setSubmitFailed,\n      syncErrors = props.syncErrors,\n      asyncErrors = props.asyncErrors,\n      touch = props.touch,\n      persistentSubmitErrors = props.persistentSubmitErrors;\n  touch.apply(void 0, (0, _toConsumableArray2[\"default\"])(fields)); // mark all fields as touched\n\n  if (valid || persistentSubmitErrors) {\n    var asyncValidateResult = asyncValidate && asyncValidate();\n\n    if (asyncValidateResult) {\n      return asyncValidateResult.then(function (asyncErrors) {\n        if (asyncErrors) {\n          throw asyncErrors;\n        }\n\n        return executeSubmit(submit, fields, props);\n      })[\"catch\"](function (asyncErrors) {\n        setSubmitFailed.apply(void 0, (0, _toConsumableArray2[\"default\"])(fields));\n\n        if (onSubmitFail) {\n          onSubmitFail(asyncErrors, dispatch, null, props);\n        }\n\n        return Promise.reject(asyncErrors);\n      });\n    } else {\n      return executeSubmit(submit, fields, props);\n    }\n  } else {\n    setSubmitFailed.apply(void 0, (0, _toConsumableArray2[\"default\"])(fields));\n    var errors = mergeErrors({\n      asyncErrors: asyncErrors,\n      syncErrors: syncErrors\n    });\n\n    if (onSubmitFail) {\n      onSubmitFail(errors, dispatch, null, props);\n    }\n\n    return errors;\n  }\n};\n\nvar _default = handleSubmit;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/handleSubmit.js?");

/***/ }),

/***/ "./src/hasError.js":
/*!*************************!*\
  !*** ./src/hasError.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar getErrorKeys = function getErrorKeys(name, type) {\n  switch (type) {\n    case 'Field':\n      return [name, name + \"._error\"];\n\n    case 'FieldArray':\n      return [name + \"._error\"];\n\n    default:\n      throw new Error('Unknown field type');\n  }\n};\n\nvar createHasError = function createHasError(_ref) {\n  var getIn = _ref.getIn;\n\n  var hasError = function hasError(field, syncErrors, asyncErrors, submitErrors) {\n    if (!syncErrors && !asyncErrors && !submitErrors) {\n      return false;\n    }\n\n    var name = getIn(field, 'name');\n    var type = getIn(field, 'type');\n    return getErrorKeys(name, type).some(function (key) {\n      return getIn(syncErrors, key) || getIn(asyncErrors, key) || getIn(submitErrors, key);\n    });\n  };\n\n  return hasError;\n};\n\nvar _default = createHasError;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/hasError.js?");

/***/ }),

/***/ "./src/hasSubmitFailed.js":
/*!********************************!*\
  !*** ./src/hasSubmitFailed.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _hasSubmitFailed = _interopRequireDefault(__webpack_require__(/*! ./selectors/hasSubmitFailed */ \"./src/selectors/hasSubmitFailed.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _hasSubmitFailed[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/hasSubmitFailed.js?");

/***/ }),

/***/ "./src/hasSubmitSucceeded.js":
/*!***********************************!*\
  !*** ./src/hasSubmitSucceeded.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _hasSubmitSucceeded = _interopRequireDefault(__webpack_require__(/*! ./selectors/hasSubmitSucceeded */ \"./src/selectors/hasSubmitSucceeded.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _hasSubmitSucceeded[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/hasSubmitSucceeded.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ \"./node_modules/@babel/runtime/helpers/interopRequireWildcard.js\");\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports.updateSyncErrors = exports.updateSyncWarnings = exports.untouch = exports.unregisterField = exports.touch = exports.submit = exports.stopSubmit = exports.stopAsyncValidation = exports.startSubmit = exports.startAsyncValidation = exports.setSubmitSucceeded = exports.setSubmitFailed = exports.resetSection = exports.reset = exports.registerField = exports.initialize = exports.focus = exports.destroy = exports.clearSubmitErrors = exports.clearSubmit = exports.clearFields = exports.clearAsyncError = exports.change = exports.blur = exports.autofill = exports.arrayUnshift = exports.arraySwap = exports.arraySplice = exports.arrayShift = exports.arrayRemoveAll = exports.arrayRemove = exports.arrayPush = exports.arrayPop = exports.arrayMove = exports.arrayInsert = exports.actionTypes = exports.formPropTypes = exports.fieldArrayPropTypes = exports.fieldArrayMetaPropTypes = exports.fieldArrayFieldsPropTypes = exports.fieldPropTypes = exports.fieldMetaPropTypes = exports.fieldInputPropTypes = exports.values = exports.reducer = exports.reduxForm = exports.hasSubmitFailed = exports.hasSubmitSucceeded = exports.isSubmitting = exports.isValid = exports.isPristine = exports.isInvalid = exports.isDirty = exports.isAsyncValidating = exports.getFormSubmitErrors = exports.getFormSyncWarnings = exports.getFormAsyncErrors = exports.getFormMeta = exports.getFormSyncErrors = exports.getFormInitialValues = exports.getFormValues = exports.getFormNames = exports.getFormError = exports.formValues = exports.formValueSelector = exports.FieldArray = exports.Fields = exports.Field = exports.propTypes = exports.SubmissionError = exports.FormSection = exports.FormName = exports.Form = exports.defaultShouldWarn = exports.defaultShouldError = exports.defaultShouldValidate = exports.defaultShouldAsyncValidate = void 0;\n\nvar _actions = _interopRequireDefault(__webpack_require__(/*! ./actions */ \"./src/actions.js\"));\n\nvar _actionTypes = _interopRequireWildcard(__webpack_require__(/*! ./actionTypes */ \"./src/actionTypes.js\"));\n\nvar _defaultShouldAsyncValidate = _interopRequireDefault(__webpack_require__(/*! ./defaultShouldAsyncValidate */ \"./src/defaultShouldAsyncValidate.js\"));\n\nexports.defaultShouldAsyncValidate = _defaultShouldAsyncValidate[\"default\"];\n\nvar _defaultShouldValidate = _interopRequireDefault(__webpack_require__(/*! ./defaultShouldValidate */ \"./src/defaultShouldValidate.js\"));\n\nexports.defaultShouldValidate = _defaultShouldValidate[\"default\"];\n\nvar _defaultShouldError = _interopRequireDefault(__webpack_require__(/*! ./defaultShouldError */ \"./src/defaultShouldError.js\"));\n\nexports.defaultShouldError = _defaultShouldError[\"default\"];\n\nvar _defaultShouldWarn = _interopRequireDefault(__webpack_require__(/*! ./defaultShouldWarn */ \"./src/defaultShouldWarn.js\"));\n\nexports.defaultShouldWarn = _defaultShouldWarn[\"default\"];\n\nvar _Form = _interopRequireDefault(__webpack_require__(/*! ./Form */ \"./src/Form.js\"));\n\nexports.Form = _Form[\"default\"];\n\nvar _FormName = _interopRequireDefault(__webpack_require__(/*! ./FormName */ \"./src/FormName.js\"));\n\nexports.FormName = _FormName[\"default\"];\n\nvar _FormSection = _interopRequireDefault(__webpack_require__(/*! ./FormSection */ \"./src/FormSection.js\"));\n\nexports.FormSection = _FormSection[\"default\"];\n\nvar _SubmissionError = _interopRequireDefault(__webpack_require__(/*! ./SubmissionError */ \"./src/SubmissionError.js\"));\n\nexports.SubmissionError = _SubmissionError[\"default\"];\n\nvar _propTypes = _interopRequireWildcard(__webpack_require__(/*! ./propTypes */ \"./src/propTypes.js\"));\n\nexports.propTypes = _propTypes[\"default\"];\nexports.fieldInputPropTypes = _propTypes.fieldInputPropTypes;\nexports.fieldMetaPropTypes = _propTypes.fieldMetaPropTypes;\nexports.fieldPropTypes = _propTypes.fieldPropTypes;\nexports.fieldArrayFieldsPropTypes = _propTypes.fieldArrayFieldsPropTypes;\nexports.fieldArrayMetaPropTypes = _propTypes.fieldArrayMetaPropTypes;\nexports.fieldArrayPropTypes = _propTypes.fieldArrayPropTypes;\nexports.formPropTypes = _propTypes.formPropTypes;\n\nvar _Field = _interopRequireDefault(__webpack_require__(/*! ./Field */ \"./src/Field.js\"));\n\nexports.Field = _Field[\"default\"];\n\nvar _Fields = _interopRequireDefault(__webpack_require__(/*! ./Fields */ \"./src/Fields.js\"));\n\nexports.Fields = _Fields[\"default\"];\n\nvar _FieldArray = _interopRequireDefault(__webpack_require__(/*! ./FieldArray */ \"./src/FieldArray.js\"));\n\nexports.FieldArray = _FieldArray[\"default\"];\n\nvar _formValueSelector = _interopRequireDefault(__webpack_require__(/*! ./formValueSelector */ \"./src/formValueSelector.js\"));\n\nexports.formValueSelector = _formValueSelector[\"default\"];\n\nvar _formValues = _interopRequireDefault(__webpack_require__(/*! ./formValues */ \"./src/formValues.js\"));\n\nexports.formValues = _formValues[\"default\"];\n\nvar _getFormError = _interopRequireDefault(__webpack_require__(/*! ./getFormError */ \"./src/getFormError.js\"));\n\nexports.getFormError = _getFormError[\"default\"];\n\nvar _getFormNames = _interopRequireDefault(__webpack_require__(/*! ./getFormNames */ \"./src/getFormNames.js\"));\n\nexports.getFormNames = _getFormNames[\"default\"];\n\nvar _getFormValues = _interopRequireDefault(__webpack_require__(/*! ./getFormValues */ \"./src/getFormValues.js\"));\n\nexports.getFormValues = _getFormValues[\"default\"];\n\nvar _getFormInitialValues = _interopRequireDefault(__webpack_require__(/*! ./getFormInitialValues */ \"./src/getFormInitialValues.js\"));\n\nexports.getFormInitialValues = _getFormInitialValues[\"default\"];\n\nvar _getFormSyncErrors = _interopRequireDefault(__webpack_require__(/*! ./getFormSyncErrors */ \"./src/getFormSyncErrors.js\"));\n\nexports.getFormSyncErrors = _getFormSyncErrors[\"default\"];\n\nvar _getFormMeta = _interopRequireDefault(__webpack_require__(/*! ./getFormMeta */ \"./src/getFormMeta.js\"));\n\nexports.getFormMeta = _getFormMeta[\"default\"];\n\nvar _getFormAsyncErrors = _interopRequireDefault(__webpack_require__(/*! ./getFormAsyncErrors */ \"./src/getFormAsyncErrors.js\"));\n\nexports.getFormAsyncErrors = _getFormAsyncErrors[\"default\"];\n\nvar _getFormSyncWarnings = _interopRequireDefault(__webpack_require__(/*! ./getFormSyncWarnings */ \"./src/getFormSyncWarnings.js\"));\n\nexports.getFormSyncWarnings = _getFormSyncWarnings[\"default\"];\n\nvar _getFormSubmitErrors = _interopRequireDefault(__webpack_require__(/*! ./getFormSubmitErrors */ \"./src/getFormSubmitErrors.js\"));\n\nexports.getFormSubmitErrors = _getFormSubmitErrors[\"default\"];\n\nvar _isAsyncValidating = _interopRequireDefault(__webpack_require__(/*! ./isAsyncValidating */ \"./src/isAsyncValidating.js\"));\n\nexports.isAsyncValidating = _isAsyncValidating[\"default\"];\n\nvar _isDirty = _interopRequireDefault(__webpack_require__(/*! ./isDirty */ \"./src/isDirty.js\"));\n\nexports.isDirty = _isDirty[\"default\"];\n\nvar _isInvalid = _interopRequireDefault(__webpack_require__(/*! ./isInvalid */ \"./src/isInvalid.js\"));\n\nexports.isInvalid = _isInvalid[\"default\"];\n\nvar _isPristine = _interopRequireDefault(__webpack_require__(/*! ./isPristine */ \"./src/isPristine.js\"));\n\nexports.isPristine = _isPristine[\"default\"];\n\nvar _isValid = _interopRequireDefault(__webpack_require__(/*! ./isValid */ \"./src/isValid.js\"));\n\nexports.isValid = _isValid[\"default\"];\n\nvar _isSubmitting = _interopRequireDefault(__webpack_require__(/*! ./isSubmitting */ \"./src/isSubmitting.js\"));\n\nexports.isSubmitting = _isSubmitting[\"default\"];\n\nvar _hasSubmitSucceeded = _interopRequireDefault(__webpack_require__(/*! ./hasSubmitSucceeded */ \"./src/hasSubmitSucceeded.js\"));\n\nexports.hasSubmitSucceeded = _hasSubmitSucceeded[\"default\"];\n\nvar _hasSubmitFailed = _interopRequireDefault(__webpack_require__(/*! ./hasSubmitFailed */ \"./src/hasSubmitFailed.js\"));\n\nexports.hasSubmitFailed = _hasSubmitFailed[\"default\"];\n\nvar _reduxForm = _interopRequireDefault(__webpack_require__(/*! ./reduxForm */ \"./src/reduxForm.js\"));\n\nexports.reduxForm = _reduxForm[\"default\"];\n\nvar _reducer = _interopRequireDefault(__webpack_require__(/*! ./reducer */ \"./src/reducer.js\"));\n\nexports.reducer = _reducer[\"default\"];\n\nvar _values = _interopRequireDefault(__webpack_require__(/*! ./values */ \"./src/values.js\"));\n\nexports.values = _values[\"default\"];\n// alias for propTypes\nvar actionTypes = _actionTypes;\nexports.actionTypes = actionTypes;\nvar arrayInsert = _actions[\"default\"].arrayInsert;\nexports.arrayInsert = arrayInsert;\nvar arrayMove = _actions[\"default\"].arrayMove;\nexports.arrayMove = arrayMove;\nvar arrayPop = _actions[\"default\"].arrayPop;\nexports.arrayPop = arrayPop;\nvar arrayPush = _actions[\"default\"].arrayPush;\nexports.arrayPush = arrayPush;\nvar arrayRemove = _actions[\"default\"].arrayRemove;\nexports.arrayRemove = arrayRemove;\nvar arrayRemoveAll = _actions[\"default\"].arrayRemoveAll;\nexports.arrayRemoveAll = arrayRemoveAll;\nvar arrayShift = _actions[\"default\"].arrayShift;\nexports.arrayShift = arrayShift;\nvar arraySplice = _actions[\"default\"].arraySplice;\nexports.arraySplice = arraySplice;\nvar arraySwap = _actions[\"default\"].arraySwap;\nexports.arraySwap = arraySwap;\nvar arrayUnshift = _actions[\"default\"].arrayUnshift;\nexports.arrayUnshift = arrayUnshift;\nvar autofill = _actions[\"default\"].autofill;\nexports.autofill = autofill;\nvar blur = _actions[\"default\"].blur;\nexports.blur = blur;\nvar change = _actions[\"default\"].change;\nexports.change = change;\nvar clearAsyncError = _actions[\"default\"].clearAsyncError;\nexports.clearAsyncError = clearAsyncError;\nvar clearFields = _actions[\"default\"].clearFields;\nexports.clearFields = clearFields;\nvar clearSubmit = _actions[\"default\"].clearSubmit;\nexports.clearSubmit = clearSubmit;\nvar clearSubmitErrors = _actions[\"default\"].clearSubmitErrors;\nexports.clearSubmitErrors = clearSubmitErrors;\nvar destroy = _actions[\"default\"].destroy;\nexports.destroy = destroy;\nvar focus = _actions[\"default\"].focus;\nexports.focus = focus;\nvar initialize = _actions[\"default\"].initialize;\nexports.initialize = initialize;\nvar registerField = _actions[\"default\"].registerField;\nexports.registerField = registerField;\nvar reset = _actions[\"default\"].reset;\nexports.reset = reset;\nvar resetSection = _actions[\"default\"].resetSection;\nexports.resetSection = resetSection;\nvar setSubmitFailed = _actions[\"default\"].setSubmitFailed;\nexports.setSubmitFailed = setSubmitFailed;\nvar setSubmitSucceeded = _actions[\"default\"].setSubmitSucceeded;\nexports.setSubmitSucceeded = setSubmitSucceeded;\nvar startAsyncValidation = _actions[\"default\"].startAsyncValidation;\nexports.startAsyncValidation = startAsyncValidation;\nvar startSubmit = _actions[\"default\"].startSubmit;\nexports.startSubmit = startSubmit;\nvar stopAsyncValidation = _actions[\"default\"].stopAsyncValidation;\nexports.stopAsyncValidation = stopAsyncValidation;\nvar stopSubmit = _actions[\"default\"].stopSubmit;\nexports.stopSubmit = stopSubmit;\nvar submit = _actions[\"default\"].submit;\nexports.submit = submit;\nvar touch = _actions[\"default\"].touch;\nexports.touch = touch;\nvar unregisterField = _actions[\"default\"].unregisterField;\nexports.unregisterField = unregisterField;\nvar untouch = _actions[\"default\"].untouch;\nexports.untouch = untouch;\nvar updateSyncWarnings = _actions[\"default\"].updateSyncWarnings;\nexports.updateSyncWarnings = updateSyncWarnings;\nvar updateSyncErrors = _actions[\"default\"].updateSyncErrors;\nexports.updateSyncErrors = updateSyncErrors;\n\n//# sourceURL=webpack://ReduxForm/./src/index.js?");

/***/ }),

/***/ "./src/isAsyncValidating.js":
/*!**********************************!*\
  !*** ./src/isAsyncValidating.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _isAsyncValidating = _interopRequireDefault(__webpack_require__(/*! ./selectors/isAsyncValidating */ \"./src/selectors/isAsyncValidating.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _isAsyncValidating[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/isAsyncValidating.js?");

/***/ }),

/***/ "./src/isDirty.js":
/*!************************!*\
  !*** ./src/isDirty.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _isDirty = _interopRequireDefault(__webpack_require__(/*! ./selectors/isDirty */ \"./src/selectors/isDirty.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _isDirty[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/isDirty.js?");

/***/ }),

/***/ "./src/isInvalid.js":
/*!**************************!*\
  !*** ./src/isInvalid.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _isInvalid = _interopRequireDefault(__webpack_require__(/*! ./selectors/isInvalid */ \"./src/selectors/isInvalid.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _isInvalid[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/isInvalid.js?");

/***/ }),

/***/ "./src/isPristine.js":
/*!***************************!*\
  !*** ./src/isPristine.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _isPristine = _interopRequireDefault(__webpack_require__(/*! ./selectors/isPristine */ \"./src/selectors/isPristine.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _isPristine[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/isPristine.js?");

/***/ }),

/***/ "./src/isReactNative.js":
/*!******************************!*\
  !*** ./src/isReactNative.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\nvar isReactNative = typeof window !== 'undefined' && window.navigator && window.navigator.product && window.navigator.product === 'ReactNative';\nvar _default = isReactNative;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/isReactNative.js?");

/***/ }),

/***/ "./src/isSubmitting.js":
/*!*****************************!*\
  !*** ./src/isSubmitting.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _isSubmitting = _interopRequireDefault(__webpack_require__(/*! ./selectors/isSubmitting */ \"./src/selectors/isSubmitting.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _isSubmitting[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/isSubmitting.js?");

/***/ }),

/***/ "./src/isValid.js":
/*!************************!*\
  !*** ./src/isValid.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _isValid = _interopRequireDefault(__webpack_require__(/*! ./selectors/isValid */ \"./src/selectors/isValid.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _isValid[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/isValid.js?");

/***/ }),

/***/ "./src/propTypes.js":
/*!**************************!*\
  !*** ./src/propTypes.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = exports.fieldArrayPropTypes = exports.fieldPropTypes = exports.fieldArrayFieldsPropTypes = exports.fieldArrayMetaPropTypes = exports.fieldMetaPropTypes = exports.fieldInputPropTypes = exports.formPropTypes = void 0;\n\nvar _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\"));\n\nvar any = _propTypes[\"default\"].any,\n    bool = _propTypes[\"default\"].bool,\n    func = _propTypes[\"default\"].func,\n    shape = _propTypes[\"default\"].shape,\n    string = _propTypes[\"default\"].string,\n    oneOfType = _propTypes[\"default\"].oneOfType,\n    object = _propTypes[\"default\"].object,\n    number = _propTypes[\"default\"].number;\nvar formPropTypes = {\n  // State:\n  anyTouched: bool.isRequired,\n  // true if any of the fields have been marked as touched\n  asyncValidating: oneOfType([bool, string]).isRequired,\n  // true if async validation is running, a string if a field triggered async validation\n  dirty: bool.isRequired,\n  // true if any values are different from initialValues\n  error: any,\n  // form-wide error from '_error' key in validation result\n  form: string.isRequired,\n  // the name of the form\n  invalid: bool.isRequired,\n  // true if there are any validation errors\n  initialized: bool.isRequired,\n  // true if the form has been initialized\n  initialValues: object,\n  // the initialValues object passed to reduxForm\n  pristine: bool.isRequired,\n  // true if the values are the same as initialValues\n  pure: bool.isRequired,\n  // if true, implements shouldComponentUpdate\n  submitting: bool.isRequired,\n  // true if the form is in the process of being submitted\n  submitAsSideEffect: bool.isRequired,\n  // true if onSubmit result will be dispatched\n  submitFailed: bool.isRequired,\n  // true if the form was submitted and failed for any reason\n  submitSucceeded: bool.isRequired,\n  // true if the form was successfully submitted\n  valid: bool.isRequired,\n  // true if there are no validation errors\n  warning: any,\n  // form-wide warning from '_warning' key in validation result\n  // Actions:\n  array: shape({\n    insert: func.isRequired,\n    // function to insert a value into an array field\n    move: func.isRequired,\n    // function to move a value within an array field\n    pop: func.isRequired,\n    // function to pop a value off of an array field\n    push: func.isRequired,\n    // function to push a value onto an array field\n    remove: func.isRequired,\n    // function to remove a value from an array field\n    removeAll: func.isRequired,\n    // function to remove all the values from an array field\n    shift: func.isRequired,\n    // function to shift a value out of an array field\n    splice: func.isRequired,\n    // function to splice a value into an array field\n    swap: func.isRequired,\n    // function to swap values in an array field\n    unshift: func.isRequired // function to unshift a value into an array field\n\n  }),\n  asyncValidate: func.isRequired,\n  // function to trigger async validation\n  autofill: func.isRequired,\n  // action to set a value of a field and mark it as autofilled\n  blur: func.isRequired,\n  // action to mark a field as blurred\n  change: func.isRequired,\n  // action to change the value of a field\n  clearAsyncError: func.isRequired,\n  // action to clear the async error of a field\n  clearFields: func.isRequired,\n  // action to clean fields values for all fields\n  clearSubmitErrors: func.isRequired,\n  // action to remove submitErrors and error\n  destroy: func.isRequired,\n  // action to destroy the form's data in Redux\n  dispatch: func.isRequired,\n  // the Redux dispatch action\n  handleSubmit: func.isRequired,\n  // function to submit the form\n  initialize: func.isRequired,\n  // action to initialize form data\n  reset: func.isRequired,\n  // action to reset the form data to previously initialized values\n  resetSection: func.isRequired,\n  // action to reset the form sections data to previously initialized values\n  touch: func.isRequired,\n  // action to mark fields as touched\n  submit: func.isRequired,\n  // action to trigger a submission of the specified form\n  untouch: func.isRequired,\n  // action to mark fields as untouched\n  // triggerSubmit\n  triggerSubmit: bool,\n  // if true, submits the form on componentWillReceiveProps\n  clearSubmit: func.isRequired // called before a triggered submit, by default clears triggerSubmit\n\n};\nexports.formPropTypes = formPropTypes;\nvar fieldInputPropTypes = {\n  checked: bool,\n  name: string.isRequired,\n  onBlur: func.isRequired,\n  onChange: func.isRequired,\n  onDragStart: func.isRequired,\n  onDrop: func.isRequired,\n  onFocus: func.isRequired,\n  value: any\n};\nexports.fieldInputPropTypes = fieldInputPropTypes;\nvar fieldMetaPropTypes = {\n  active: bool.isRequired,\n  asyncValidating: bool.isRequired,\n  autofilled: bool.isRequired,\n  dirty: bool.isRequired,\n  dispatch: func.isRequired,\n  error: any,\n  form: string.isRequired,\n  invalid: bool.isRequired,\n  pristine: bool.isRequired,\n  submitting: bool.isRequired,\n  submitFailed: bool.isRequired,\n  touched: bool.isRequired,\n  valid: bool.isRequired,\n  visited: bool.isRequired,\n  warning: string\n};\nexports.fieldMetaPropTypes = fieldMetaPropTypes;\nvar fieldArrayMetaPropTypes = {\n  dirty: bool.isRequired,\n  error: any,\n  form: string.isRequired,\n  invalid: bool.isRequired,\n  pristine: bool.isRequired,\n  submitFailed: bool,\n  submitting: bool,\n  valid: bool.isRequired,\n  warning: string\n};\nexports.fieldArrayMetaPropTypes = fieldArrayMetaPropTypes;\nvar fieldArrayFieldsPropTypes = {\n  name: string.isRequired,\n  forEach: func.isRequired,\n  get: func.isRequired,\n  getAll: func.isRequired,\n  insert: func.isRequired,\n  length: number.isRequired,\n  map: func.isRequired,\n  move: func.isRequired,\n  pop: func.isRequired,\n  push: func.isRequired,\n  reduce: func.isRequired,\n  remove: func.isRequired,\n  removeAll: func.isRequired,\n  shift: func.isRequired,\n  swap: func.isRequired,\n  unshift: func.isRequired\n};\nexports.fieldArrayFieldsPropTypes = fieldArrayFieldsPropTypes;\nvar fieldPropTypes = {\n  input: shape(fieldInputPropTypes).isRequired,\n  meta: shape(fieldMetaPropTypes).isRequired\n};\nexports.fieldPropTypes = fieldPropTypes;\nvar fieldArrayPropTypes = {\n  fields: shape(fieldArrayFieldsPropTypes).isRequired,\n  meta: shape(fieldArrayMetaPropTypes).isRequired\n};\nexports.fieldArrayPropTypes = fieldArrayPropTypes;\nvar _default = formPropTypes;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/propTypes.js?");

/***/ }),

/***/ "./src/reducer.js":
/*!************************!*\
  !*** ./src/reducer.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _createReducer = _interopRequireDefault(__webpack_require__(/*! ./createReducer */ \"./src/createReducer.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _createReducer[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/reducer.js?");

/***/ }),

/***/ "./src/reduxForm.js":
/*!**************************!*\
  !*** ./src/reduxForm.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _createReduxForm = _interopRequireDefault(__webpack_require__(/*! ./createReduxForm */ \"./src/createReduxForm.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _createReduxForm[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/reduxForm.js?");

/***/ }),

/***/ "./src/selectors/getFormAsyncErrors.js":
/*!*********************************************!*\
  !*** ./src/selectors/getFormAsyncErrors.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar createGetFormAsyncErrors = function createGetFormAsyncErrors(_ref) {\n  var getIn = _ref.getIn;\n  return function (form, getFormState) {\n    return function (state) {\n      var nonNullGetFormState = getFormState || function (state) {\n        return getIn(state, 'form');\n      };\n\n      return getIn(nonNullGetFormState(state), form + \".asyncErrors\");\n    };\n  };\n};\n\nvar _default = createGetFormAsyncErrors;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/getFormAsyncErrors.js?");

/***/ }),

/***/ "./src/selectors/getFormError.js":
/*!***************************************!*\
  !*** ./src/selectors/getFormError.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar createGetFormError = function createGetFormError(_ref) {\n  var getIn = _ref.getIn;\n  return function (form, getFormState) {\n    return function (state) {\n      var nonNullGetFormState = getFormState || function (state) {\n        return getIn(state, 'form');\n      };\n\n      return getIn(nonNullGetFormState(state), form + \".error\");\n    };\n  };\n};\n\nvar _default = createGetFormError;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/getFormError.js?");

/***/ }),

/***/ "./src/selectors/getFormInitialValues.js":
/*!***********************************************!*\
  !*** ./src/selectors/getFormInitialValues.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar createGetFormInitialValues = function createGetFormInitialValues(_ref) {\n  var getIn = _ref.getIn;\n  return function (form, getFormState) {\n    return function (state) {\n      var nonNullGetFormState = getFormState || function (state) {\n        return getIn(state, 'form');\n      };\n\n      return getIn(nonNullGetFormState(state), form + \".initial\");\n    };\n  };\n};\n\nvar _default = createGetFormInitialValues;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/getFormInitialValues.js?");

/***/ }),

/***/ "./src/selectors/getFormMeta.js":
/*!**************************************!*\
  !*** ./src/selectors/getFormMeta.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar createGetFormMeta = function createGetFormMeta(_ref) {\n  var getIn = _ref.getIn,\n      empty = _ref.empty;\n  return function (form, getFormState) {\n    return function (state) {\n      var nonNullGetFormState = getFormState || function (state) {\n        return getIn(state, 'form');\n      };\n\n      return getIn(nonNullGetFormState(state), form + \".fields\") || empty;\n    };\n  };\n};\n\nvar _default = createGetFormMeta;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/getFormMeta.js?");

/***/ }),

/***/ "./src/selectors/getFormNames.js":
/*!***************************************!*\
  !*** ./src/selectors/getFormNames.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nfunction createGetFormNames(_ref) {\n  var getIn = _ref.getIn,\n      keys = _ref.keys;\n  return function (getFormState) {\n    return function (state) {\n      var nonNullGetFormState = getFormState || function (state) {\n        return getIn(state, 'form');\n      };\n\n      return keys(nonNullGetFormState(state));\n    };\n  };\n}\n\nvar _default = createGetFormNames;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/getFormNames.js?");

/***/ }),

/***/ "./src/selectors/getFormSubmitErrors.js":
/*!**********************************************!*\
  !*** ./src/selectors/getFormSubmitErrors.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar createGetFormSubmitErrors = function createGetFormSubmitErrors(_ref) {\n  var getIn = _ref.getIn,\n      empty = _ref.empty;\n  return function (form, getFormState) {\n    return function (state) {\n      var nonNullGetFormState = getFormState || function (state) {\n        return getIn(state, 'form');\n      };\n\n      return getIn(nonNullGetFormState(state), form + \".submitErrors\") || empty;\n    };\n  };\n};\n\nvar _default = createGetFormSubmitErrors;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/getFormSubmitErrors.js?");

/***/ }),

/***/ "./src/selectors/getFormSyncErrors.js":
/*!********************************************!*\
  !*** ./src/selectors/getFormSyncErrors.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar createGetFormSyncErrors = function createGetFormSyncErrors(_ref) {\n  var getIn = _ref.getIn,\n      empty = _ref.empty;\n  return function (form, getFormState) {\n    return function (state) {\n      var nonNullGetFormState = getFormState || function (state) {\n        return getIn(state, 'form');\n      };\n\n      return getIn(nonNullGetFormState(state), form + \".syncErrors\") || empty;\n    };\n  };\n};\n\nvar _default = createGetFormSyncErrors;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/getFormSyncErrors.js?");

/***/ }),

/***/ "./src/selectors/getFormSyncWarnings.js":
/*!**********************************************!*\
  !*** ./src/selectors/getFormSyncWarnings.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar createGetFormSyncWarnings = function createGetFormSyncWarnings(_ref) {\n  var getIn = _ref.getIn,\n      empty = _ref.empty;\n  return function (form, getFormState) {\n    return function (state) {\n      var nonNullGetFormState = getFormState || function (state) {\n        return getIn(state, 'form');\n      };\n\n      return getIn(nonNullGetFormState(state), form + \".syncWarnings\") || empty;\n    };\n  };\n};\n\nvar _default = createGetFormSyncWarnings;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/getFormSyncWarnings.js?");

/***/ }),

/***/ "./src/selectors/getFormValues.js":
/*!****************************************!*\
  !*** ./src/selectors/getFormValues.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar createGetFormValues = function createGetFormValues(_ref) {\n  var getIn = _ref.getIn;\n  return function (form, getFormState) {\n    return function (state) {\n      var nonNullGetFormState = getFormState || function (state) {\n        return getIn(state, 'form');\n      };\n\n      return getIn(nonNullGetFormState(state), form + \".values\");\n    };\n  };\n};\n\nvar _default = createGetFormValues;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/getFormValues.js?");

/***/ }),

/***/ "./src/selectors/hasSubmitFailed.js":
/*!******************************************!*\
  !*** ./src/selectors/hasSubmitFailed.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar createHasSubmitFailed = function createHasSubmitFailed(_ref) {\n  var getIn = _ref.getIn;\n  return function (form, getFormState) {\n    return function (state) {\n      var nonNullGetFormState = getFormState || function (state) {\n        return getIn(state, 'form');\n      };\n\n      return !!getIn(nonNullGetFormState(state), form + \".submitFailed\");\n    };\n  };\n};\n\nvar _default = createHasSubmitFailed;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/hasSubmitFailed.js?");

/***/ }),

/***/ "./src/selectors/hasSubmitSucceeded.js":
/*!*********************************************!*\
  !*** ./src/selectors/hasSubmitSucceeded.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar createHasSubmitSucceeded = function createHasSubmitSucceeded(_ref) {\n  var getIn = _ref.getIn;\n  return function (form, getFormState) {\n    return function (state) {\n      var nonNullGetFormState = getFormState || function (state) {\n        return getIn(state, 'form');\n      };\n\n      return !!getIn(nonNullGetFormState(state), form + \".submitSucceeded\");\n    };\n  };\n};\n\nvar _default = createHasSubmitSucceeded;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/hasSubmitSucceeded.js?");

/***/ }),

/***/ "./src/selectors/isAsyncValidating.js":
/*!********************************************!*\
  !*** ./src/selectors/isAsyncValidating.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar createIsAsyncValidating = function createIsAsyncValidating(_ref) {\n  var getIn = _ref.getIn;\n  return function (form, getFormState) {\n    return function (state) {\n      var nonNullGetFormState = getFormState || function (state) {\n        return getIn(state, 'form');\n      };\n\n      return !!getIn(nonNullGetFormState(state), form + \".asyncValidating\");\n    };\n  };\n};\n\nvar _default = createIsAsyncValidating;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/isAsyncValidating.js?");

/***/ }),

/***/ "./src/selectors/isDirty.js":
/*!**********************************!*\
  !*** ./src/selectors/isDirty.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _isPristine = _interopRequireDefault(__webpack_require__(/*! ./isPristine */ \"./src/selectors/isPristine.js\"));\n\nvar createIsDirty = function createIsDirty(structure) {\n  return function (form, getFormState) {\n    var isPristine = (0, _isPristine[\"default\"])(structure)(form, getFormState);\n    return function (state) {\n      for (var _len = arguments.length, fields = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n        fields[_key - 1] = arguments[_key];\n      }\n\n      return !isPristine.apply(void 0, [state].concat(fields));\n    };\n  };\n};\n\nvar _default = createIsDirty;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/isDirty.js?");

/***/ }),

/***/ "./src/selectors/isInvalid.js":
/*!************************************!*\
  !*** ./src/selectors/isInvalid.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _isValid = _interopRequireDefault(__webpack_require__(/*! ./isValid */ \"./src/selectors/isValid.js\"));\n\nvar createIsInvalid = function createIsInvalid(structure) {\n  return function (form, getFormState) {\n    var isValid = (0, _isValid[\"default\"])(structure)(form, getFormState);\n    return function (state) {\n      return !isValid(state);\n    };\n  };\n};\n\nvar _default = createIsInvalid;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/isInvalid.js?");

/***/ }),

/***/ "./src/selectors/isPristine.js":
/*!*************************************!*\
  !*** ./src/selectors/isPristine.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar createIsPristine = function createIsPristine(_ref) {\n  var deepEqual = _ref.deepEqual,\n      empty = _ref.empty,\n      getIn = _ref.getIn;\n  return function (form, getFormState) {\n    return function (state) {\n      var nonNullGetFormState = getFormState || function (state) {\n        return getIn(state, 'form');\n      };\n\n      var formState = nonNullGetFormState(state);\n\n      for (var _len = arguments.length, fields = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n        fields[_key - 1] = arguments[_key];\n      }\n\n      if (fields && fields.length) {\n        return fields.every(function (field) {\n          var fieldInitial = getIn(formState, form + \".initial.\" + field);\n          var fieldValue = getIn(formState, form + \".values.\" + field);\n          return deepEqual(fieldInitial, fieldValue);\n        });\n      }\n\n      var initial = getIn(formState, form + \".initial\") || empty;\n      var values = getIn(formState, form + \".values\") || initial;\n      return deepEqual(initial, values);\n    };\n  };\n};\n\nvar _default = createIsPristine;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/isPristine.js?");

/***/ }),

/***/ "./src/selectors/isSubmitting.js":
/*!***************************************!*\
  !*** ./src/selectors/isSubmitting.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar createIsSubmitting = function createIsSubmitting(_ref) {\n  var getIn = _ref.getIn;\n  return function (form, getFormState) {\n    return function (state) {\n      var nonNullGetFormState = getFormState || function (state) {\n        return getIn(state, 'form');\n      };\n\n      return !!getIn(nonNullGetFormState(state), form + \".submitting\");\n    };\n  };\n};\n\nvar _default = createIsSubmitting;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/isSubmitting.js?");

/***/ }),

/***/ "./src/selectors/isValid.js":
/*!**********************************!*\
  !*** ./src/selectors/isValid.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _hasError = _interopRequireDefault(__webpack_require__(/*! ../hasError */ \"./src/hasError.js\"));\n\nvar createIsValid = function createIsValid(structure) {\n  var getIn = structure.getIn,\n      keys = structure.keys;\n  var hasError = (0, _hasError[\"default\"])(structure);\n  return function (form, getFormState, ignoreSubmitErrors) {\n    if (ignoreSubmitErrors === void 0) {\n      ignoreSubmitErrors = false;\n    }\n\n    return function (state) {\n      var nonNullGetFormState = getFormState || function (state) {\n        return getIn(state, 'form');\n      };\n\n      var formState = nonNullGetFormState(state);\n      var syncError = getIn(formState, form + \".syncError\");\n\n      if (syncError) {\n        return false;\n      }\n\n      if (!ignoreSubmitErrors) {\n        var error = getIn(formState, form + \".error\");\n\n        if (error) {\n          return false;\n        }\n      }\n\n      var syncErrors = getIn(formState, form + \".syncErrors\");\n      var asyncErrors = getIn(formState, form + \".asyncErrors\");\n      var submitErrors = ignoreSubmitErrors ? undefined : getIn(formState, form + \".submitErrors\");\n\n      if (!syncErrors && !asyncErrors && !submitErrors) {\n        return true;\n      }\n\n      var registeredFields = getIn(formState, form + \".registeredFields\");\n\n      if (!registeredFields) {\n        return true;\n      }\n\n      return !keys(registeredFields).filter(function (name) {\n        return getIn(registeredFields, \"['\" + name + \"'].count\") > 0;\n      }).some(function (name) {\n        return hasError(getIn(registeredFields, \"['\" + name + \"']\"), syncErrors, asyncErrors, submitErrors);\n      });\n    };\n  };\n};\n\nvar _default = createIsValid;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/selectors/isValid.js?");

/***/ }),

/***/ "./src/structure/plain/deepEqual.js":
/*!******************************************!*\
  !*** ./src/structure/plain/deepEqual.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _isNil2 = _interopRequireDefault(__webpack_require__(/*! lodash/isNil */ \"./node_modules/lodash/isNil.js\"));\n\nvar _isEqualWith2 = _interopRequireDefault(__webpack_require__(/*! lodash/isEqualWith */ \"./node_modules/lodash/isEqualWith.js\"));\n\nvar _react = _interopRequireDefault(__webpack_require__(/*! react */ \"react\"));\n\nvar isEmpty = function isEmpty(obj) {\n  return (0, _isNil2[\"default\"])(obj) || obj === '' || isNaN(obj);\n};\n\nvar customizer = function customizer(obj, other) {\n  if (obj === other) return true;\n\n  if (!obj && !other) {\n    return isEmpty(obj) === isEmpty(other);\n  }\n\n  if (obj && other && obj._error !== other._error) return false;\n  if (obj && other && obj._warning !== other._warning) return false;\n  if (_react[\"default\"].isValidElement(obj) || _react[\"default\"].isValidElement(other)) return false;\n};\n\nvar deepEqual = function deepEqual(a, b) {\n  return (0, _isEqualWith2[\"default\"])(a, b, customizer);\n};\n\nvar _default = deepEqual;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/structure/plain/deepEqual.js?");

/***/ }),

/***/ "./src/structure/plain/deleteIn.js":
/*!*****************************************!*\
  !*** ./src/structure/plain/deleteIn.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _extends3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ \"./node_modules/@babel/runtime/helpers/toConsumableArray.js\"));\n\nvar _toPath2 = _interopRequireDefault(__webpack_require__(/*! lodash/toPath */ \"./node_modules/lodash/toPath.js\"));\n\nfunction deleteInWithPath(state, first) {\n  if (state === undefined || state === null || first === undefined || first === null) {\n    return state;\n  }\n\n  for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    rest[_key - 2] = arguments[_key];\n  }\n\n  if (rest.length) {\n    if (Array.isArray(state)) {\n      if (isNaN(first)) {\n        throw new Error(\"Must access array elements with a number, not \\\"\" + String(first) + \"\\\".\");\n      }\n\n      var firstIndex = Number(first);\n\n      if (firstIndex < state.length) {\n        var result = deleteInWithPath.apply(void 0, [state && state[firstIndex]].concat(rest));\n\n        if (result !== state[firstIndex]) {\n          var copy = (0, _toConsumableArray2[\"default\"])(state);\n          copy[firstIndex] = result;\n          return copy;\n        }\n      }\n\n      return state;\n    }\n\n    if (first in state) {\n      var _extends2;\n\n      var _result = deleteInWithPath.apply(void 0, [state && state[first]].concat(rest));\n\n      return state[first] === _result ? state : (0, _extends3[\"default\"])({}, state, (_extends2 = {}, _extends2[first] = _result, _extends2));\n    }\n\n    return state;\n  }\n\n  if (Array.isArray(state)) {\n    if (isNaN(first)) {\n      throw new Error(\"Cannot delete non-numerical index from an array. Given: \\\"\" + String(first));\n    }\n\n    var _firstIndex = Number(first);\n\n    if (_firstIndex < state.length) {\n      var _copy = (0, _toConsumableArray2[\"default\"])(state);\n\n      _copy.splice(_firstIndex, 1);\n\n      return _copy;\n    }\n\n    return state;\n  }\n\n  if (first in state) {\n    var _copy2 = (0, _extends3[\"default\"])({}, state);\n\n    delete _copy2[first];\n    return _copy2;\n  }\n\n  return state;\n}\n\nvar deleteIn = function deleteIn(state, field) {\n  return deleteInWithPath.apply(void 0, [state].concat((0, _toConsumableArray2[\"default\"])((0, _toPath2[\"default\"])(field))));\n};\n\nvar _default = deleteIn;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/structure/plain/deleteIn.js?");

/***/ }),

/***/ "./src/structure/plain/getIn.js":
/*!**************************************!*\
  !*** ./src/structure/plain/getIn.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _toPath2 = _interopRequireDefault(__webpack_require__(/*! lodash/toPath */ \"./node_modules/lodash/toPath.js\"));\n\nvar getIn = function getIn(state, field) {\n  if (!state) {\n    return state;\n  }\n\n  var path = (0, _toPath2[\"default\"])(field);\n  var length = path.length;\n\n  if (!length) {\n    return undefined;\n  }\n\n  var result = state;\n\n  for (var i = 0; i < length && result; ++i) {\n    result = result[path[i]];\n  }\n\n  return result;\n};\n\nvar _default = getIn;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/structure/plain/getIn.js?");

/***/ }),

/***/ "./src/structure/plain/index.js":
/*!**************************************!*\
  !*** ./src/structure/plain/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _splice = _interopRequireDefault(__webpack_require__(/*! ./splice */ \"./src/structure/plain/splice.js\"));\n\nvar _getIn = _interopRequireDefault(__webpack_require__(/*! ./getIn */ \"./src/structure/plain/getIn.js\"));\n\nvar _setIn = _interopRequireDefault(__webpack_require__(/*! ./setIn */ \"./src/structure/plain/setIn.js\"));\n\nvar _deepEqual = _interopRequireDefault(__webpack_require__(/*! ./deepEqual */ \"./src/structure/plain/deepEqual.js\"));\n\nvar _deleteIn = _interopRequireDefault(__webpack_require__(/*! ./deleteIn */ \"./src/structure/plain/deleteIn.js\"));\n\nvar _keys = _interopRequireDefault(__webpack_require__(/*! ./keys */ \"./src/structure/plain/keys.js\"));\n\nvar structure = {\n  allowsArrayErrors: true,\n  empty: {},\n  emptyList: [],\n  getIn: _getIn[\"default\"],\n  setIn: _setIn[\"default\"],\n  deepEqual: _deepEqual[\"default\"],\n  deleteIn: _deleteIn[\"default\"],\n  forEach: function forEach(items, callback) {\n    return items.forEach(callback);\n  },\n  fromJS: function fromJS(value) {\n    return value;\n  },\n  keys: _keys[\"default\"],\n  size: function size(array) {\n    return array ? array.length : 0;\n  },\n  some: function some(items, callback) {\n    return items.some(callback);\n  },\n  splice: _splice[\"default\"],\n  equals: function equals(a, b) {\n    return b.every(function (val) {\n      return ~a.indexOf(val);\n    });\n  },\n  orderChanged: function orderChanged(a, b) {\n    return b.some(function (val, index) {\n      return val !== a[index];\n    });\n  },\n  toJS: function toJS(value) {\n    return value;\n  }\n};\nvar _default = structure;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/structure/plain/index.js?");

/***/ }),

/***/ "./src/structure/plain/keys.js":
/*!*************************************!*\
  !*** ./src/structure/plain/keys.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nfunction keys(value) {\n  if (!value) {\n    return [];\n  }\n\n  if (Array.isArray(value)) {\n    return value.map(function (i) {\n      return i.name;\n    });\n  }\n\n  return Object.keys(value);\n}\n\nvar _default = keys;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/structure/plain/keys.js?");

/***/ }),

/***/ "./src/structure/plain/setIn.js":
/*!**************************************!*\
  !*** ./src/structure/plain/setIn.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _extends3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\"));\n\nvar _toPath2 = _interopRequireDefault(__webpack_require__(/*! lodash/toPath */ \"./node_modules/lodash/toPath.js\"));\n\nvar setInWithPath = function setInWithPath(state, value, path, pathIndex) {\n  var _extends2;\n\n  if (pathIndex >= path.length) {\n    return value;\n  }\n\n  var first = path[pathIndex];\n  var firstState = state && (Array.isArray(state) ? state[Number(first)] : state[first]);\n  var next = setInWithPath(firstState, value, path, pathIndex + 1);\n\n  if (!state) {\n    if (isNaN(first)) {\n      var _ref;\n\n      return _ref = {}, _ref[first] = next, _ref;\n    }\n\n    var initialized = [];\n    initialized[parseInt(first, 10)] = next;\n    return initialized;\n  }\n\n  if (Array.isArray(state)) {\n    var copy = [].concat(state);\n    copy[parseInt(first, 10)] = next;\n    return copy;\n  }\n\n  return (0, _extends3[\"default\"])({}, state, (_extends2 = {}, _extends2[first] = next, _extends2));\n};\n\nvar setIn = function setIn(state, field, value) {\n  return setInWithPath(state, value, (0, _toPath2[\"default\"])(field), 0);\n};\n\nvar _default = setIn;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/structure/plain/setIn.js?");

/***/ }),

/***/ "./src/structure/plain/splice.js":
/*!***************************************!*\
  !*** ./src/structure/plain/splice.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ \"./node_modules/@babel/runtime/helpers/toConsumableArray.js\"));\n\nvar splice = function splice(array, index, removeNum, value) {\n  array = array || [];\n\n  if (index < array.length) {\n    if (value === undefined && !removeNum) {\n      // inserting undefined\n      var _copy2 = (0, _toConsumableArray2[\"default\"])(array);\n\n      _copy2.splice(index, 0, true); // temporary placeholder\n\n\n      _copy2[index] = undefined; // set to undefined\n\n      return _copy2;\n    }\n\n    if (value != null) {\n      var _copy3 = (0, _toConsumableArray2[\"default\"])(array);\n\n      _copy3.splice(index, removeNum, value); // removing and adding\n\n\n      return _copy3;\n    }\n\n    var _copy = (0, _toConsumableArray2[\"default\"])(array);\n\n    _copy.splice(index, removeNum); // removing\n\n\n    return _copy;\n  }\n\n  if (removeNum) {\n    // trying to remove non-existant item: return original array\n    return array;\n  } // trying to add outside of range: just set value\n\n\n  var copy = (0, _toConsumableArray2[\"default\"])(array);\n  copy[index] = value;\n  return copy;\n};\n\nvar _default = splice;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/structure/plain/splice.js?");

/***/ }),

/***/ "./src/util/eventConsts.js":
/*!*********************************!*\
  !*** ./src/util/eventConsts.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.dataKey = void 0;\nvar dataKey = 'text';\nexports.dataKey = dataKey;\n\n//# sourceURL=webpack://ReduxForm/./src/util/eventConsts.js?");

/***/ }),

/***/ "./src/util/getDisplayName.js":
/*!************************************!*\
  !*** ./src/util/getDisplayName.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar getDisplayName = function getDisplayName(Comp) {\n  return Comp.displayName || Comp.name || 'Component';\n};\n\nvar _default = getDisplayName;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/util/getDisplayName.js?");

/***/ }),

/***/ "./src/util/isHotReloading.js":
/*!************************************!*\
  !*** ./src/util/isHotReloading.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(module) {\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar isHotReloading = function isHotReloading() {\n  var castModule = module;\n  return !!(typeof castModule !== 'undefined' && castModule.hot && typeof castModule.hot.status === 'function' && castModule.hot.status() === 'apply');\n};\n\nvar _default = isHotReloading;\nexports[\"default\"] = _default;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack://ReduxForm/./src/util/isHotReloading.js?");

/***/ }),

/***/ "./src/util/prefixName.js":
/*!********************************!*\
  !*** ./src/util/prefixName.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar formatName = function formatName(_ref, name) {\n  var sectionPrefix = _ref._reduxForm.sectionPrefix;\n  return sectionPrefix ? sectionPrefix + \".\" + name : name;\n};\n\nvar _default = formatName;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/util/prefixName.js?");

/***/ }),

/***/ "./src/util/shallowCompare.js":
/*!************************************!*\
  !*** ./src/util/shallowCompare.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _isEqualWith2 = _interopRequireDefault(__webpack_require__(/*! lodash/isEqualWith */ \"./node_modules/lodash/isEqualWith.js\"));\n\nvar customizer = function customizer(objectValue, otherValue, indexOrkey, object, other, stack) {\n  // https://lodash.com/docs/4.17.4#isEqualWith\n  if (stack) {\n    // Shallow compares\n    // For 1st level, stack === undefined.\n    //   -> Do nothing (and implicitly return undefined so that it goes to compare 2nd level)\n    // For 2nd level and up, stack !== undefined.\n    //   -> Compare by === operator\n    return objectValue === otherValue;\n  }\n};\n\nvar shallowCompare = function shallowCompare(instance, nextProps, nextState) {\n  var propsEqual = (0, _isEqualWith2[\"default\"])(instance.props, nextProps, customizer);\n  var stateEqual = (0, _isEqualWith2[\"default\"])(instance.state, nextState, customizer);\n  return !propsEqual || !stateEqual;\n};\n\nvar _default = shallowCompare;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/util/shallowCompare.js?");

/***/ }),

/***/ "./src/util/validateComponentProp.js":
/*!*******************************************!*\
  !*** ./src/util/validateComponentProp.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _reactIs = __webpack_require__(/*! react-is */ \"./node_modules/react-is/index.js\");\n\nvar validateComponentProp = function validateComponentProp(props, propName, componentName) {\n  if (!(0, _reactIs.isValidElementType)(props[propName])) {\n    return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`.');\n  }\n\n  return null;\n};\n\nvar _default = validateComponentProp;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/util/validateComponentProp.js?");

/***/ }),

/***/ "./src/values.js":
/*!***********************!*\
  !*** ./src/values.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ \"./node_modules/@babel/runtime/helpers/interopRequireDefault.js\");\n\nexports.__esModule = true;\nexports[\"default\"] = void 0;\n\nvar _createValues = _interopRequireDefault(__webpack_require__(/*! ./createValues */ \"./src/createValues.js\"));\n\nvar _plain = _interopRequireDefault(__webpack_require__(/*! ./structure/plain */ \"./src/structure/plain/index.js\"));\n\nvar _default = (0, _createValues[\"default\"])(_plain[\"default\"]);\n\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://ReduxForm/./src/values.js?");

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack://ReduxForm/external_%7B%22root%22:%22React%22,%22commonjs2%22:%22react%22,%22commonjs%22:%22react%22,%22amd%22:%22react%22%7D?");

/***/ }),

/***/ "react-redux":
/*!*************************************************************************************************************!*\
  !*** external {"root":"ReactRedux","commonjs2":"react-redux","commonjs":"react-redux","amd":"react-redux"} ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react_redux__;\n\n//# sourceURL=webpack://ReduxForm/external_%7B%22root%22:%22ReactRedux%22,%22commonjs2%22:%22react-redux%22,%22commonjs%22:%22react-redux%22,%22amd%22:%22react-redux%22%7D?");

/***/ }),

/***/ "redux":
/*!**************************************************************************************!*\
  !*** external {"root":"Redux","commonjs2":"redux","commonjs":"redux","amd":"redux"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_redux__;\n\n//# sourceURL=webpack://ReduxForm/external_%7B%22root%22:%22Redux%22,%22commonjs2%22:%22redux%22,%22commonjs%22:%22redux%22,%22amd%22:%22redux%22%7D?");

/***/ })

/******/ });
});