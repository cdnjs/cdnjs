(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactBootstrapTypeahead"] = factory(require("react"), require("react-dom"));
	else
		root["ReactBootstrapTypeahead"] = factory(root["React"], root["ReactDOM"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__) {
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

/***/ "./node_modules/babel-runtime/core-js/array/from.js":
/*!**********************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/array/from.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = { \"default\": __webpack_require__(/*! core-js/library/fn/array/from */ \"./node_modules/core-js/library/fn/array/from.js\"), __esModule: true };\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/babel-runtime/core-js/array/from.js?");

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/object/assign.js":
/*!*************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/assign.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = { \"default\": __webpack_require__(/*! core-js/library/fn/object/assign */ \"./node_modules/core-js/library/fn/object/assign.js\"), __esModule: true };\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/babel-runtime/core-js/object/assign.js?");

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/object/create.js":
/*!*************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/create.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = { \"default\": __webpack_require__(/*! core-js/library/fn/object/create */ \"./node_modules/core-js/library/fn/object/create.js\"), __esModule: true };\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/babel-runtime/core-js/object/create.js?");

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/object/define-property.js":
/*!**********************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/define-property.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = { \"default\": __webpack_require__(/*! core-js/library/fn/object/define-property */ \"./node_modules/core-js/library/fn/object/define-property.js\"), __esModule: true };\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/babel-runtime/core-js/object/define-property.js?");

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/object/get-prototype-of.js":
/*!***********************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/get-prototype-of.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = { \"default\": __webpack_require__(/*! core-js/library/fn/object/get-prototype-of */ \"./node_modules/core-js/library/fn/object/get-prototype-of.js\"), __esModule: true };\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/babel-runtime/core-js/object/get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/object/set-prototype-of.js":
/*!***********************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/object/set-prototype-of.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = { \"default\": __webpack_require__(/*! core-js/library/fn/object/set-prototype-of */ \"./node_modules/core-js/library/fn/object/set-prototype-of.js\"), __esModule: true };\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/babel-runtime/core-js/object/set-prototype-of.js?");

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/symbol.js":
/*!******************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/symbol.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = { \"default\": __webpack_require__(/*! core-js/library/fn/symbol */ \"./node_modules/core-js/library/fn/symbol/index.js\"), __esModule: true };\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/babel-runtime/core-js/symbol.js?");

/***/ }),

/***/ "./node_modules/babel-runtime/core-js/symbol/iterator.js":
/*!***************************************************************!*\
  !*** ./node_modules/babel-runtime/core-js/symbol/iterator.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = { \"default\": __webpack_require__(/*! core-js/library/fn/symbol/iterator */ \"./node_modules/core-js/library/fn/symbol/iterator.js\"), __esModule: true };\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/babel-runtime/core-js/symbol/iterator.js?");

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/classCallCheck.js":
/*!**************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/classCallCheck.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nexports.default = function (instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n};\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/babel-runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/createClass.js":
/*!***********************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/createClass.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ \"./node_modules/babel-runtime/core-js/object/define-property.js\");\n\nvar _defineProperty2 = _interopRequireDefault(_defineProperty);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];\n      descriptor.enumerable = descriptor.enumerable || false;\n      descriptor.configurable = true;\n      if (\"value\" in descriptor) descriptor.writable = true;\n      (0, _defineProperty2.default)(target, descriptor.key, descriptor);\n    }\n  }\n\n  return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);\n    if (staticProps) defineProperties(Constructor, staticProps);\n    return Constructor;\n  };\n}();\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/babel-runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/extends.js":
/*!*******************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/extends.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _assign = __webpack_require__(/*! ../core-js/object/assign */ \"./node_modules/babel-runtime/core-js/object/assign.js\");\n\nvar _assign2 = _interopRequireDefault(_assign);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _assign2.default || function (target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = arguments[i];\n\n    for (var key in source) {\n      if (Object.prototype.hasOwnProperty.call(source, key)) {\n        target[key] = source[key];\n      }\n    }\n  }\n\n  return target;\n};\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/babel-runtime/helpers/extends.js?");

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/inherits.js":
/*!********************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/inherits.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ \"./node_modules/babel-runtime/core-js/object/set-prototype-of.js\");\n\nvar _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);\n\nvar _create = __webpack_require__(/*! ../core-js/object/create */ \"./node_modules/babel-runtime/core-js/object/create.js\");\n\nvar _create2 = _interopRequireDefault(_create);\n\nvar _typeof2 = __webpack_require__(/*! ../helpers/typeof */ \"./node_modules/babel-runtime/helpers/typeof.js\");\n\nvar _typeof3 = _interopRequireDefault(_typeof2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function, not \" + (typeof superClass === \"undefined\" ? \"undefined\" : (0, _typeof3.default)(superClass)));\n  }\n\n  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      enumerable: false,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;\n};\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/babel-runtime/helpers/inherits.js?");

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/possibleConstructorReturn.js":
/*!*************************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/possibleConstructorReturn.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _typeof2 = __webpack_require__(/*! ../helpers/typeof */ \"./node_modules/babel-runtime/helpers/typeof.js\");\n\nvar _typeof3 = _interopRequireDefault(_typeof2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (self, call) {\n  if (!self) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return call && ((typeof call === \"undefined\" ? \"undefined\" : (0, _typeof3.default)(call)) === \"object\" || typeof call === \"function\") ? call : self;\n};\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/babel-runtime/helpers/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/toConsumableArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/toConsumableArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _from = __webpack_require__(/*! ../core-js/array/from */ \"./node_modules/babel-runtime/core-js/array/from.js\");\n\nvar _from2 = _interopRequireDefault(_from);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = function (arr) {\n  if (Array.isArray(arr)) {\n    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {\n      arr2[i] = arr[i];\n    }\n\n    return arr2;\n  } else {\n    return (0, _from2.default)(arr);\n  }\n};\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/babel-runtime/helpers/toConsumableArray.js?");

/***/ }),

/***/ "./node_modules/babel-runtime/helpers/typeof.js":
/*!******************************************************!*\
  !*** ./node_modules/babel-runtime/helpers/typeof.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ \"./node_modules/babel-runtime/core-js/symbol/iterator.js\");\n\nvar _iterator2 = _interopRequireDefault(_iterator);\n\nvar _symbol = __webpack_require__(/*! ../core-js/symbol */ \"./node_modules/babel-runtime/core-js/symbol.js\");\n\nvar _symbol2 = _interopRequireDefault(_symbol);\n\nvar _typeof = typeof _symbol2.default === \"function\" && typeof _iterator2.default === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === \"function\" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? \"symbol\" : typeof obj; };\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = typeof _symbol2.default === \"function\" && _typeof(_iterator2.default) === \"symbol\" ? function (obj) {\n  return typeof obj === \"undefined\" ? \"undefined\" : _typeof(obj);\n} : function (obj) {\n  return obj && typeof _symbol2.default === \"function\" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? \"symbol\" : typeof obj === \"undefined\" ? \"undefined\" : _typeof(obj);\n};\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/babel-runtime/helpers/typeof.js?");

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!\n  Copyright (c) 2017 Jed Watson.\n  Licensed under the MIT License (MIT), see\n  http://jedwatson.github.io/classnames\n*/\n/* global define */\n\n(function () {\n\t'use strict';\n\n\tvar hasOwn = {}.hasOwnProperty;\n\n\tfunction classNames () {\n\t\tvar classes = [];\n\n\t\tfor (var i = 0; i < arguments.length; i++) {\n\t\t\tvar arg = arguments[i];\n\t\t\tif (!arg) continue;\n\n\t\t\tvar argType = typeof arg;\n\n\t\t\tif (argType === 'string' || argType === 'number') {\n\t\t\t\tclasses.push(arg);\n\t\t\t} else if (Array.isArray(arg) && arg.length) {\n\t\t\t\tvar inner = classNames.apply(null, arg);\n\t\t\t\tif (inner) {\n\t\t\t\t\tclasses.push(inner);\n\t\t\t\t}\n\t\t\t} else if (argType === 'object') {\n\t\t\t\tfor (var key in arg) {\n\t\t\t\t\tif (hasOwn.call(arg, key) && arg[key]) {\n\t\t\t\t\t\tclasses.push(key);\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn classes.join(' ');\n\t}\n\n\tif (typeof module !== 'undefined' && module.exports) {\n\t\tclassNames.default = classNames;\n\t\tmodule.exports = classNames;\n\t} else if (true) {\n\t\t// register as 'classnames', consistent with npm package name\n\t\t!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {\n\t\t\treturn classNames;\n\t\t}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\t} else {}\n}());\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/classnames/index.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/array/from.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/fn/array/from.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es6.string.iterator */ \"./node_modules/core-js/library/modules/es6.string.iterator.js\");\n__webpack_require__(/*! ../../modules/es6.array.from */ \"./node_modules/core-js/library/modules/es6.array.from.js\");\nmodule.exports = __webpack_require__(/*! ../../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").Array.from;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/fn/array/from.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/object/assign.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/assign.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es6.object.assign */ \"./node_modules/core-js/library/modules/es6.object.assign.js\");\nmodule.exports = __webpack_require__(/*! ../../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").Object.assign;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/fn/object/assign.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/object/create.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/create.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es6.object.create */ \"./node_modules/core-js/library/modules/es6.object.create.js\");\nvar $Object = __webpack_require__(/*! ../../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").Object;\nmodule.exports = function create(P, D) {\n  return $Object.create(P, D);\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/fn/object/create.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/object/define-property.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/define-property.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es6.object.define-property */ \"./node_modules/core-js/library/modules/es6.object.define-property.js\");\nvar $Object = __webpack_require__(/*! ../../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").Object;\nmodule.exports = function defineProperty(it, key, desc) {\n  return $Object.defineProperty(it, key, desc);\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/fn/object/define-property.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/object/get-prototype-of.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/get-prototype-of.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es6.object.get-prototype-of */ \"./node_modules/core-js/library/modules/es6.object.get-prototype-of.js\");\nmodule.exports = __webpack_require__(/*! ../../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").Object.getPrototypeOf;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/fn/object/get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/object/set-prototype-of.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/fn/object/set-prototype-of.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es6.object.set-prototype-of */ \"./node_modules/core-js/library/modules/es6.object.set-prototype-of.js\");\nmodule.exports = __webpack_require__(/*! ../../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").Object.setPrototypeOf;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/fn/object/set-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/symbol/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/fn/symbol/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es6.symbol */ \"./node_modules/core-js/library/modules/es6.symbol.js\");\n__webpack_require__(/*! ../../modules/es6.object.to-string */ \"./node_modules/core-js/library/modules/es6.object.to-string.js\");\n__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ \"./node_modules/core-js/library/modules/es7.symbol.async-iterator.js\");\n__webpack_require__(/*! ../../modules/es7.symbol.observable */ \"./node_modules/core-js/library/modules/es7.symbol.observable.js\");\nmodule.exports = __webpack_require__(/*! ../../modules/_core */ \"./node_modules/core-js/library/modules/_core.js\").Symbol;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/fn/symbol/index.js?");

/***/ }),

/***/ "./node_modules/core-js/library/fn/symbol/iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/fn/symbol/iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../modules/es6.string.iterator */ \"./node_modules/core-js/library/modules/es6.string.iterator.js\");\n__webpack_require__(/*! ../../modules/web.dom.iterable */ \"./node_modules/core-js/library/modules/web.dom.iterable.js\");\nmodule.exports = __webpack_require__(/*! ../../modules/_wks-ext */ \"./node_modules/core-js/library/modules/_wks-ext.js\").f('iterator');\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/fn/symbol/iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_a-function.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_a-function.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  if (typeof it != 'function') throw TypeError(it + ' is not a function!');\n  return it;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_a-function.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_add-to-unscopables.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_add-to-unscopables.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function () { /* empty */ };\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_add-to-unscopables.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_an-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_an-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\nmodule.exports = function (it) {\n  if (!isObject(it)) throw TypeError(it + ' is not an object!');\n  return it;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_an-object.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_array-includes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_array-includes.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// false -> Array#indexOf\n// true  -> Array#includes\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/library/modules/_to-iobject.js\");\nvar toLength = __webpack_require__(/*! ./_to-length */ \"./node_modules/core-js/library/modules/_to-length.js\");\nvar toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ \"./node_modules/core-js/library/modules/_to-absolute-index.js\");\nmodule.exports = function (IS_INCLUDES) {\n  return function ($this, el, fromIndex) {\n    var O = toIObject($this);\n    var length = toLength(O.length);\n    var index = toAbsoluteIndex(fromIndex, length);\n    var value;\n    // Array#includes uses SameValueZero equality algorithm\n    // eslint-disable-next-line no-self-compare\n    if (IS_INCLUDES && el != el) while (length > index) {\n      value = O[index++];\n      // eslint-disable-next-line no-self-compare\n      if (value != value) return true;\n    // Array#indexOf ignores holes, Array#includes - not\n    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {\n      if (O[index] === el) return IS_INCLUDES || index || 0;\n    } return !IS_INCLUDES && -1;\n  };\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_array-includes.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_classof.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_classof.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// getting tag from 19.1.3.6 Object.prototype.toString()\nvar cof = __webpack_require__(/*! ./_cof */ \"./node_modules/core-js/library/modules/_cof.js\");\nvar TAG = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('toStringTag');\n// ES3 wrong here\nvar ARG = cof(function () { return arguments; }()) == 'Arguments';\n\n// fallback for IE11 Script Access Denied error\nvar tryGet = function (it, key) {\n  try {\n    return it[key];\n  } catch (e) { /* empty */ }\n};\n\nmodule.exports = function (it) {\n  var O, T, B;\n  return it === undefined ? 'Undefined' : it === null ? 'Null'\n    // @@toStringTag case\n    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T\n    // builtinTag case\n    : ARG ? cof(O)\n    // ES3 arguments fallback\n    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_classof.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_cof.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_cof.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var toString = {}.toString;\n\nmodule.exports = function (it) {\n  return toString.call(it).slice(8, -1);\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_cof.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_core.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_core.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var core = module.exports = { version: '2.5.7' };\nif (typeof __e == 'number') __e = core; // eslint-disable-line no-undef\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_core.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_create-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_create-property.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar $defineProperty = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\");\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/library/modules/_property-desc.js\");\n\nmodule.exports = function (object, index, value) {\n  if (index in object) $defineProperty.f(object, index, createDesc(0, value));\n  else object[index] = value;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_create-property.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_ctx.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ctx.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// optional / simple context binding\nvar aFunction = __webpack_require__(/*! ./_a-function */ \"./node_modules/core-js/library/modules/_a-function.js\");\nmodule.exports = function (fn, that, length) {\n  aFunction(fn);\n  if (that === undefined) return fn;\n  switch (length) {\n    case 1: return function (a) {\n      return fn.call(that, a);\n    };\n    case 2: return function (a, b) {\n      return fn.call(that, a, b);\n    };\n    case 3: return function (a, b, c) {\n      return fn.call(that, a, b, c);\n    };\n  }\n  return function (/* ...args */) {\n    return fn.apply(that, arguments);\n  };\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_ctx.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_defined.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_defined.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 7.2.1 RequireObjectCoercible(argument)\nmodule.exports = function (it) {\n  if (it == undefined) throw TypeError(\"Can't call method on  \" + it);\n  return it;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_defined.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_descriptors.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_descriptors.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Thank's IE8 for his funny defineProperty\nmodule.exports = !__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\")(function () {\n  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;\n});\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_descriptors.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_dom-create.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_dom-create.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\nvar document = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\").document;\n// typeof document.createElement is 'object' in old IE\nvar is = isObject(document) && isObject(document.createElement);\nmodule.exports = function (it) {\n  return is ? document.createElement(it) : {};\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_dom-create.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_enum-bug-keys.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_enum-bug-keys.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// IE 8- don't enum bug keys\nmodule.exports = (\n  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'\n).split(',');\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_enum-bug-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_enum-keys.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_enum-keys.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// all enumerable object keys, includes symbols\nvar getKeys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/library/modules/_object-keys.js\");\nvar gOPS = __webpack_require__(/*! ./_object-gops */ \"./node_modules/core-js/library/modules/_object-gops.js\");\nvar pIE = __webpack_require__(/*! ./_object-pie */ \"./node_modules/core-js/library/modules/_object-pie.js\");\nmodule.exports = function (it) {\n  var result = getKeys(it);\n  var getSymbols = gOPS.f;\n  if (getSymbols) {\n    var symbols = getSymbols(it);\n    var isEnum = pIE.f;\n    var i = 0;\n    var key;\n    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);\n  } return result;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_enum-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_export.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_export.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\nvar core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/library/modules/_core.js\");\nvar ctx = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/library/modules/_ctx.js\");\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/library/modules/_hide.js\");\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\nvar PROTOTYPE = 'prototype';\n\nvar $export = function (type, name, source) {\n  var IS_FORCED = type & $export.F;\n  var IS_GLOBAL = type & $export.G;\n  var IS_STATIC = type & $export.S;\n  var IS_PROTO = type & $export.P;\n  var IS_BIND = type & $export.B;\n  var IS_WRAP = type & $export.W;\n  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});\n  var expProto = exports[PROTOTYPE];\n  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];\n  var key, own, out;\n  if (IS_GLOBAL) source = name;\n  for (key in source) {\n    // contains in native\n    own = !IS_FORCED && target && target[key] !== undefined;\n    if (own && has(exports, key)) continue;\n    // export native or passed\n    out = own ? target[key] : source[key];\n    // prevent global pollution for namespaces\n    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]\n    // bind timers to global for call from export context\n    : IS_BIND && own ? ctx(out, global)\n    // wrap global constructors for prevent change them in library\n    : IS_WRAP && target[key] == out ? (function (C) {\n      var F = function (a, b, c) {\n        if (this instanceof C) {\n          switch (arguments.length) {\n            case 0: return new C();\n            case 1: return new C(a);\n            case 2: return new C(a, b);\n          } return new C(a, b, c);\n        } return C.apply(this, arguments);\n      };\n      F[PROTOTYPE] = C[PROTOTYPE];\n      return F;\n    // make static versions for prototype methods\n    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;\n    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%\n    if (IS_PROTO) {\n      (exports.virtual || (exports.virtual = {}))[key] = out;\n      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%\n      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);\n    }\n  }\n};\n// type bitmap\n$export.F = 1;   // forced\n$export.G = 2;   // global\n$export.S = 4;   // static\n$export.P = 8;   // proto\n$export.B = 16;  // bind\n$export.W = 32;  // wrap\n$export.U = 64;  // safe\n$export.R = 128; // real proto method for `library`\nmodule.exports = $export;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_export.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_fails.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_fails.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (exec) {\n  try {\n    return !!exec();\n  } catch (e) {\n    return true;\n  }\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_fails.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_global.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_global.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028\nvar global = module.exports = typeof window != 'undefined' && window.Math == Math\n  ? window : typeof self != 'undefined' && self.Math == Math ? self\n  // eslint-disable-next-line no-new-func\n  : Function('return this')();\nif (typeof __g == 'number') __g = global; // eslint-disable-line no-undef\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_global.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_has.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_has.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var hasOwnProperty = {}.hasOwnProperty;\nmodule.exports = function (it, key) {\n  return hasOwnProperty.call(it, key);\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_has.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_hide.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_hide.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var dP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\");\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/library/modules/_property-desc.js\");\nmodule.exports = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\") ? function (object, key, value) {\n  return dP.f(object, key, createDesc(1, value));\n} : function (object, key, value) {\n  object[key] = value;\n  return object;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_hide.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_html.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_html.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var document = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\").document;\nmodule.exports = document && document.documentElement;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_html.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_ie8-dom-define.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_ie8-dom-define.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = !__webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\") && !__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\")(function () {\n  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ \"./node_modules/core-js/library/modules/_dom-create.js\")('div'), 'a', { get: function () { return 7; } }).a != 7;\n});\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_ie8-dom-define.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_iobject.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iobject.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// fallback for non-array-like ES3 and non-enumerable old V8 strings\nvar cof = __webpack_require__(/*! ./_cof */ \"./node_modules/core-js/library/modules/_cof.js\");\n// eslint-disable-next-line no-prototype-builtins\nmodule.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {\n  return cof(it) == 'String' ? it.split('') : Object(it);\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_iobject.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_is-array-iter.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-array-iter.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// check on default Array iterator\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/library/modules/_iterators.js\");\nvar ITERATOR = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('iterator');\nvar ArrayProto = Array.prototype;\n\nmodule.exports = function (it) {\n  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_is-array-iter.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_is-array.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-array.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.2.2 IsArray(argument)\nvar cof = __webpack_require__(/*! ./_cof */ \"./node_modules/core-js/library/modules/_cof.js\");\nmodule.exports = Array.isArray || function isArray(arg) {\n  return cof(arg) == 'Array';\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_is-array.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_is-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_is-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (it) {\n  return typeof it === 'object' ? it !== null : typeof it === 'function';\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_is-object.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-call.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-call.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// call something on iterator step with safe closing on error\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\nmodule.exports = function (iterator, fn, value, entries) {\n  try {\n    return entries ? fn(anObject(value)[0], value[1]) : fn(value);\n  // 7.4.6 IteratorClose(iterator, completion)\n  } catch (e) {\n    var ret = iterator['return'];\n    if (ret !== undefined) anObject(ret.call(iterator));\n    throw e;\n  }\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_iter-call.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-create.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-create.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar create = __webpack_require__(/*! ./_object-create */ \"./node_modules/core-js/library/modules/_object-create.js\");\nvar descriptor = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/library/modules/_property-desc.js\");\nvar setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ \"./node_modules/core-js/library/modules/_set-to-string-tag.js\");\nvar IteratorPrototype = {};\n\n// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()\n__webpack_require__(/*! ./_hide */ \"./node_modules/core-js/library/modules/_hide.js\")(IteratorPrototype, __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('iterator'), function () { return this; });\n\nmodule.exports = function (Constructor, NAME, next) {\n  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });\n  setToStringTag(Constructor, NAME + ' Iterator');\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_iter-create.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-define.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-define.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar LIBRARY = __webpack_require__(/*! ./_library */ \"./node_modules/core-js/library/modules/_library.js\");\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\nvar redefine = __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/library/modules/_redefine.js\");\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/library/modules/_hide.js\");\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/library/modules/_iterators.js\");\nvar $iterCreate = __webpack_require__(/*! ./_iter-create */ \"./node_modules/core-js/library/modules/_iter-create.js\");\nvar setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ \"./node_modules/core-js/library/modules/_set-to-string-tag.js\");\nvar getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ \"./node_modules/core-js/library/modules/_object-gpo.js\");\nvar ITERATOR = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('iterator');\nvar BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`\nvar FF_ITERATOR = '@@iterator';\nvar KEYS = 'keys';\nvar VALUES = 'values';\n\nvar returnThis = function () { return this; };\n\nmodule.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {\n  $iterCreate(Constructor, NAME, next);\n  var getMethod = function (kind) {\n    if (!BUGGY && kind in proto) return proto[kind];\n    switch (kind) {\n      case KEYS: return function keys() { return new Constructor(this, kind); };\n      case VALUES: return function values() { return new Constructor(this, kind); };\n    } return function entries() { return new Constructor(this, kind); };\n  };\n  var TAG = NAME + ' Iterator';\n  var DEF_VALUES = DEFAULT == VALUES;\n  var VALUES_BUG = false;\n  var proto = Base.prototype;\n  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];\n  var $default = $native || getMethod(DEFAULT);\n  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;\n  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;\n  var methods, key, IteratorPrototype;\n  // Fix native\n  if ($anyNative) {\n    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));\n    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {\n      // Set @@toStringTag to native iterators\n      setToStringTag(IteratorPrototype, TAG, true);\n      // fix for some old engines\n      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);\n    }\n  }\n  // fix Array#{values, @@iterator}.name in V8 / FF\n  if (DEF_VALUES && $native && $native.name !== VALUES) {\n    VALUES_BUG = true;\n    $default = function values() { return $native.call(this); };\n  }\n  // Define iterator\n  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {\n    hide(proto, ITERATOR, $default);\n  }\n  // Plug for library\n  Iterators[NAME] = $default;\n  Iterators[TAG] = returnThis;\n  if (DEFAULT) {\n    methods = {\n      values: DEF_VALUES ? $default : getMethod(VALUES),\n      keys: IS_SET ? $default : getMethod(KEYS),\n      entries: $entries\n    };\n    if (FORCED) for (key in methods) {\n      if (!(key in proto)) redefine(proto, key, methods[key]);\n    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);\n  }\n  return methods;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_iter-define.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-detect.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-detect.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ITERATOR = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('iterator');\nvar SAFE_CLOSING = false;\n\ntry {\n  var riter = [7][ITERATOR]();\n  riter['return'] = function () { SAFE_CLOSING = true; };\n  // eslint-disable-next-line no-throw-literal\n  Array.from(riter, function () { throw 2; });\n} catch (e) { /* empty */ }\n\nmodule.exports = function (exec, skipClosing) {\n  if (!skipClosing && !SAFE_CLOSING) return false;\n  var safe = false;\n  try {\n    var arr = [7];\n    var iter = arr[ITERATOR]();\n    iter.next = function () { return { done: safe = true }; };\n    arr[ITERATOR] = function () { return iter; };\n    exec(arr);\n  } catch (e) { /* empty */ }\n  return safe;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_iter-detect.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_iter-step.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iter-step.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (done, value) {\n  return { value: value, done: !!done };\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_iter-step.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_iterators.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_iterators.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_iterators.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_library.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_library.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = true;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_library.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_meta.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_meta.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var META = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/library/modules/_uid.js\")('meta');\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\nvar setDesc = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\").f;\nvar id = 0;\nvar isExtensible = Object.isExtensible || function () {\n  return true;\n};\nvar FREEZE = !__webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\")(function () {\n  return isExtensible(Object.preventExtensions({}));\n});\nvar setMeta = function (it) {\n  setDesc(it, META, { value: {\n    i: 'O' + ++id, // object ID\n    w: {}          // weak collections IDs\n  } });\n};\nvar fastKey = function (it, create) {\n  // return primitive with prefix\n  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;\n  if (!has(it, META)) {\n    // can't set metadata to uncaught frozen object\n    if (!isExtensible(it)) return 'F';\n    // not necessary to add metadata\n    if (!create) return 'E';\n    // add missing metadata\n    setMeta(it);\n  // return object ID\n  } return it[META].i;\n};\nvar getWeak = function (it, create) {\n  if (!has(it, META)) {\n    // can't set metadata to uncaught frozen object\n    if (!isExtensible(it)) return true;\n    // not necessary to add metadata\n    if (!create) return false;\n    // add missing metadata\n    setMeta(it);\n  // return hash weak collections IDs\n  } return it[META].w;\n};\n// add metadata on freeze-family methods calling\nvar onFreeze = function (it) {\n  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);\n  return it;\n};\nvar meta = module.exports = {\n  KEY: META,\n  NEED: false,\n  fastKey: fastKey,\n  getWeak: getWeak,\n  onFreeze: onFreeze\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_meta.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-assign.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-assign.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// 19.1.2.1 Object.assign(target, source, ...)\nvar getKeys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/library/modules/_object-keys.js\");\nvar gOPS = __webpack_require__(/*! ./_object-gops */ \"./node_modules/core-js/library/modules/_object-gops.js\");\nvar pIE = __webpack_require__(/*! ./_object-pie */ \"./node_modules/core-js/library/modules/_object-pie.js\");\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/library/modules/_to-object.js\");\nvar IObject = __webpack_require__(/*! ./_iobject */ \"./node_modules/core-js/library/modules/_iobject.js\");\nvar $assign = Object.assign;\n\n// should work with symbols and should have deterministic property order (V8 bug)\nmodule.exports = !$assign || __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\")(function () {\n  var A = {};\n  var B = {};\n  // eslint-disable-next-line no-undef\n  var S = Symbol();\n  var K = 'abcdefghijklmnopqrst';\n  A[S] = 7;\n  K.split('').forEach(function (k) { B[k] = k; });\n  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;\n}) ? function assign(target, source) { // eslint-disable-line no-unused-vars\n  var T = toObject(target);\n  var aLen = arguments.length;\n  var index = 1;\n  var getSymbols = gOPS.f;\n  var isEnum = pIE.f;\n  while (aLen > index) {\n    var S = IObject(arguments[index++]);\n    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);\n    var length = keys.length;\n    var j = 0;\n    var key;\n    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];\n  } return T;\n} : $assign;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_object-assign.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-create.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\nvar dPs = __webpack_require__(/*! ./_object-dps */ \"./node_modules/core-js/library/modules/_object-dps.js\");\nvar enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ \"./node_modules/core-js/library/modules/_enum-bug-keys.js\");\nvar IE_PROTO = __webpack_require__(/*! ./_shared-key */ \"./node_modules/core-js/library/modules/_shared-key.js\")('IE_PROTO');\nvar Empty = function () { /* empty */ };\nvar PROTOTYPE = 'prototype';\n\n// Create object with fake `null` prototype: use iframe Object with cleared prototype\nvar createDict = function () {\n  // Thrash, waste and sodomy: IE GC bug\n  var iframe = __webpack_require__(/*! ./_dom-create */ \"./node_modules/core-js/library/modules/_dom-create.js\")('iframe');\n  var i = enumBugKeys.length;\n  var lt = '<';\n  var gt = '>';\n  var iframeDocument;\n  iframe.style.display = 'none';\n  __webpack_require__(/*! ./_html */ \"./node_modules/core-js/library/modules/_html.js\").appendChild(iframe);\n  iframe.src = 'javascript:'; // eslint-disable-line no-script-url\n  // createDict = iframe.contentWindow.Object;\n  // html.removeChild(iframe);\n  iframeDocument = iframe.contentWindow.document;\n  iframeDocument.open();\n  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);\n  iframeDocument.close();\n  createDict = iframeDocument.F;\n  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];\n  return createDict();\n};\n\nmodule.exports = Object.create || function create(O, Properties) {\n  var result;\n  if (O !== null) {\n    Empty[PROTOTYPE] = anObject(O);\n    result = new Empty();\n    Empty[PROTOTYPE] = null;\n    // add \"__proto__\" for Object.getPrototypeOf polyfill\n    result[IE_PROTO] = O;\n  } else result = createDict();\n  return Properties === undefined ? result : dPs(result, Properties);\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_object-create.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-dp.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-dp.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ \"./node_modules/core-js/library/modules/_ie8-dom-define.js\");\nvar toPrimitive = __webpack_require__(/*! ./_to-primitive */ \"./node_modules/core-js/library/modules/_to-primitive.js\");\nvar dP = Object.defineProperty;\n\nexports.f = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\") ? Object.defineProperty : function defineProperty(O, P, Attributes) {\n  anObject(O);\n  P = toPrimitive(P, true);\n  anObject(Attributes);\n  if (IE8_DOM_DEFINE) try {\n    return dP(O, P, Attributes);\n  } catch (e) { /* empty */ }\n  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');\n  if ('value' in Attributes) O[P] = Attributes.value;\n  return O;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_object-dp.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-dps.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-dps.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var dP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\");\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\nvar getKeys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/library/modules/_object-keys.js\");\n\nmodule.exports = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\") ? Object.defineProperties : function defineProperties(O, Properties) {\n  anObject(O);\n  var keys = getKeys(Properties);\n  var length = keys.length;\n  var i = 0;\n  var P;\n  while (length > i) dP.f(O, P = keys[i++], Properties[P]);\n  return O;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_object-dps.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gopd.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gopd.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var pIE = __webpack_require__(/*! ./_object-pie */ \"./node_modules/core-js/library/modules/_object-pie.js\");\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/library/modules/_property-desc.js\");\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/library/modules/_to-iobject.js\");\nvar toPrimitive = __webpack_require__(/*! ./_to-primitive */ \"./node_modules/core-js/library/modules/_to-primitive.js\");\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\nvar IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ \"./node_modules/core-js/library/modules/_ie8-dom-define.js\");\nvar gOPD = Object.getOwnPropertyDescriptor;\n\nexports.f = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\") ? gOPD : function getOwnPropertyDescriptor(O, P) {\n  O = toIObject(O);\n  P = toPrimitive(P, true);\n  if (IE8_DOM_DEFINE) try {\n    return gOPD(O, P);\n  } catch (e) { /* empty */ }\n  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_object-gopd.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gopn-ext.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gopn-ext.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/library/modules/_to-iobject.js\");\nvar gOPN = __webpack_require__(/*! ./_object-gopn */ \"./node_modules/core-js/library/modules/_object-gopn.js\").f;\nvar toString = {}.toString;\n\nvar windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames\n  ? Object.getOwnPropertyNames(window) : [];\n\nvar getWindowNames = function (it) {\n  try {\n    return gOPN(it);\n  } catch (e) {\n    return windowNames.slice();\n  }\n};\n\nmodule.exports.f = function getOwnPropertyNames(it) {\n  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_object-gopn-ext.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gopn.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gopn.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)\nvar $keys = __webpack_require__(/*! ./_object-keys-internal */ \"./node_modules/core-js/library/modules/_object-keys-internal.js\");\nvar hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ \"./node_modules/core-js/library/modules/_enum-bug-keys.js\").concat('length', 'prototype');\n\nexports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {\n  return $keys(O, hiddenKeys);\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_object-gopn.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gops.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gops.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.f = Object.getOwnPropertySymbols;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_object-gops.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-gpo.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-gpo.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/library/modules/_to-object.js\");\nvar IE_PROTO = __webpack_require__(/*! ./_shared-key */ \"./node_modules/core-js/library/modules/_shared-key.js\")('IE_PROTO');\nvar ObjectProto = Object.prototype;\n\nmodule.exports = Object.getPrototypeOf || function (O) {\n  O = toObject(O);\n  if (has(O, IE_PROTO)) return O[IE_PROTO];\n  if (typeof O.constructor == 'function' && O instanceof O.constructor) {\n    return O.constructor.prototype;\n  } return O instanceof Object ? ObjectProto : null;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_object-gpo.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-keys-internal.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-keys-internal.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/library/modules/_to-iobject.js\");\nvar arrayIndexOf = __webpack_require__(/*! ./_array-includes */ \"./node_modules/core-js/library/modules/_array-includes.js\")(false);\nvar IE_PROTO = __webpack_require__(/*! ./_shared-key */ \"./node_modules/core-js/library/modules/_shared-key.js\")('IE_PROTO');\n\nmodule.exports = function (object, names) {\n  var O = toIObject(object);\n  var i = 0;\n  var result = [];\n  var key;\n  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);\n  // Don't enum bug & hidden keys\n  while (names.length > i) if (has(O, key = names[i++])) {\n    ~arrayIndexOf(result, key) || result.push(key);\n  }\n  return result;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_object-keys-internal.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-keys.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-keys.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.14 / 15.2.3.14 Object.keys(O)\nvar $keys = __webpack_require__(/*! ./_object-keys-internal */ \"./node_modules/core-js/library/modules/_object-keys-internal.js\");\nvar enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ \"./node_modules/core-js/library/modules/_enum-bug-keys.js\");\n\nmodule.exports = Object.keys || function keys(O) {\n  return $keys(O, enumBugKeys);\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_object-keys.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-pie.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-pie.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("exports.f = {}.propertyIsEnumerable;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_object-pie.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_object-sap.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_object-sap.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// most Object methods by ES6 should accept primitives\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\nvar core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/library/modules/_core.js\");\nvar fails = __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\");\nmodule.exports = function (KEY, exec) {\n  var fn = (core.Object || {})[KEY] || Object[KEY];\n  var exp = {};\n  exp[KEY] = exec(fn);\n  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_object-sap.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_property-desc.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_property-desc.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (bitmap, value) {\n  return {\n    enumerable: !(bitmap & 1),\n    configurable: !(bitmap & 2),\n    writable: !(bitmap & 4),\n    value: value\n  };\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_property-desc.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_redefine.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_redefine.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/library/modules/_hide.js\");\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_redefine.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_set-proto.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-proto.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Works with __proto__ only. Old v8 can't work with null proto objects.\n/* eslint-disable no-proto */\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\nvar check = function (O, proto) {\n  anObject(O);\n  if (!isObject(proto) && proto !== null) throw TypeError(proto + \": can't set as prototype!\");\n};\nmodule.exports = {\n  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line\n    function (test, buggy, set) {\n      try {\n        set = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/library/modules/_ctx.js\")(Function.call, __webpack_require__(/*! ./_object-gopd */ \"./node_modules/core-js/library/modules/_object-gopd.js\").f(Object.prototype, '__proto__').set, 2);\n        set(test, []);\n        buggy = !(test instanceof Array);\n      } catch (e) { buggy = true; }\n      return function setPrototypeOf(O, proto) {\n        check(O, proto);\n        if (buggy) O.__proto__ = proto;\n        else set(O, proto);\n        return O;\n      };\n    }({}, false) : undefined),\n  check: check\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_set-proto.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_set-to-string-tag.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_set-to-string-tag.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var def = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\").f;\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\nvar TAG = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('toStringTag');\n\nmodule.exports = function (it, tag, stat) {\n  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_set-to-string-tag.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_shared-key.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_shared-key.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var shared = __webpack_require__(/*! ./_shared */ \"./node_modules/core-js/library/modules/_shared.js\")('keys');\nvar uid = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/library/modules/_uid.js\");\nmodule.exports = function (key) {\n  return shared[key] || (shared[key] = uid(key));\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_shared-key.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_shared.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_shared.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/library/modules/_core.js\");\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\nvar SHARED = '__core-js_shared__';\nvar store = global[SHARED] || (global[SHARED] = {});\n\n(module.exports = function (key, value) {\n  return store[key] || (store[key] = value !== undefined ? value : {});\n})('versions', []).push({\n  version: core.version,\n  mode: __webpack_require__(/*! ./_library */ \"./node_modules/core-js/library/modules/_library.js\") ? 'pure' : 'global',\n  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'\n});\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_shared.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_string-at.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_string-at.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ./_to-integer */ \"./node_modules/core-js/library/modules/_to-integer.js\");\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/library/modules/_defined.js\");\n// true  -> String#at\n// false -> String#codePointAt\nmodule.exports = function (TO_STRING) {\n  return function (that, pos) {\n    var s = String(defined(that));\n    var i = toInteger(pos);\n    var l = s.length;\n    var a, b;\n    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;\n    a = s.charCodeAt(i);\n    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff\n      ? TO_STRING ? s.charAt(i) : a\n      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;\n  };\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_string-at.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-absolute-index.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-absolute-index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toInteger = __webpack_require__(/*! ./_to-integer */ \"./node_modules/core-js/library/modules/_to-integer.js\");\nvar max = Math.max;\nvar min = Math.min;\nmodule.exports = function (index, length) {\n  index = toInteger(index);\n  return index < 0 ? max(index + length, 0) : min(index, length);\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_to-absolute-index.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-integer.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-integer.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 7.1.4 ToInteger\nvar ceil = Math.ceil;\nvar floor = Math.floor;\nmodule.exports = function (it) {\n  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_to-integer.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-iobject.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-iobject.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// to indexed object, toObject with fallback for non-array-like ES3 strings\nvar IObject = __webpack_require__(/*! ./_iobject */ \"./node_modules/core-js/library/modules/_iobject.js\");\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/library/modules/_defined.js\");\nmodule.exports = function (it) {\n  return IObject(defined(it));\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_to-iobject.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-length.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-length.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.1.15 ToLength\nvar toInteger = __webpack_require__(/*! ./_to-integer */ \"./node_modules/core-js/library/modules/_to-integer.js\");\nvar min = Math.min;\nmodule.exports = function (it) {\n  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_to-length.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-object.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-object.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.1.13 ToObject(argument)\nvar defined = __webpack_require__(/*! ./_defined */ \"./node_modules/core-js/library/modules/_defined.js\");\nmodule.exports = function (it) {\n  return Object(defined(it));\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_to-object.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_to-primitive.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_to-primitive.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 7.1.1 ToPrimitive(input [, PreferredType])\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\n// instead of the ES6 spec version, we didn't implement @@toPrimitive case\n// and the second argument - flag - preferred type is a string\nmodule.exports = function (it, S) {\n  if (!isObject(it)) return it;\n  var fn, val;\n  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;\n  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;\n  throw TypeError(\"Can't convert object to primitive value\");\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_to-primitive.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_uid.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_uid.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var id = 0;\nvar px = Math.random();\nmodule.exports = function (key) {\n  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_uid.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_wks-define.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks-define.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\nvar core = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/library/modules/_core.js\");\nvar LIBRARY = __webpack_require__(/*! ./_library */ \"./node_modules/core-js/library/modules/_library.js\");\nvar wksExt = __webpack_require__(/*! ./_wks-ext */ \"./node_modules/core-js/library/modules/_wks-ext.js\");\nvar defineProperty = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\").f;\nmodule.exports = function (name) {\n  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});\n  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_wks-define.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_wks-ext.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports.f = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\");\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_wks-ext.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/_wks.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/library/modules/_wks.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var store = __webpack_require__(/*! ./_shared */ \"./node_modules/core-js/library/modules/_shared.js\")('wks');\nvar uid = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/library/modules/_uid.js\");\nvar Symbol = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\").Symbol;\nvar USE_SYMBOL = typeof Symbol == 'function';\n\nvar $exports = module.exports = function (name) {\n  return store[name] || (store[name] =\n    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));\n};\n\n$exports.store = store;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/_wks.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/core.get-iterator-method.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/core.get-iterator-method.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var classof = __webpack_require__(/*! ./_classof */ \"./node_modules/core-js/library/modules/_classof.js\");\nvar ITERATOR = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('iterator');\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/library/modules/_iterators.js\");\nmodule.exports = __webpack_require__(/*! ./_core */ \"./node_modules/core-js/library/modules/_core.js\").getIteratorMethod = function (it) {\n  if (it != undefined) return it[ITERATOR]\n    || it['@@iterator']\n    || Iterators[classof(it)];\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/core.get-iterator-method.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.array.from.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.array.from.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar ctx = __webpack_require__(/*! ./_ctx */ \"./node_modules/core-js/library/modules/_ctx.js\");\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/library/modules/_to-object.js\");\nvar call = __webpack_require__(/*! ./_iter-call */ \"./node_modules/core-js/library/modules/_iter-call.js\");\nvar isArrayIter = __webpack_require__(/*! ./_is-array-iter */ \"./node_modules/core-js/library/modules/_is-array-iter.js\");\nvar toLength = __webpack_require__(/*! ./_to-length */ \"./node_modules/core-js/library/modules/_to-length.js\");\nvar createProperty = __webpack_require__(/*! ./_create-property */ \"./node_modules/core-js/library/modules/_create-property.js\");\nvar getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ \"./node_modules/core-js/library/modules/core.get-iterator-method.js\");\n\n$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ \"./node_modules/core-js/library/modules/_iter-detect.js\")(function (iter) { Array.from(iter); }), 'Array', {\n  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)\n  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {\n    var O = toObject(arrayLike);\n    var C = typeof this == 'function' ? this : Array;\n    var aLen = arguments.length;\n    var mapfn = aLen > 1 ? arguments[1] : undefined;\n    var mapping = mapfn !== undefined;\n    var index = 0;\n    var iterFn = getIterFn(O);\n    var length, result, step, iterator;\n    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);\n    // if object isn't iterable or it's array with default iterator - use simple case\n    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {\n      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {\n        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);\n      }\n    } else {\n      length = toLength(O.length);\n      for (result = new C(length); length > index; index++) {\n        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);\n      }\n    }\n    result.length = index;\n    return result;\n  }\n});\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/es6.array.from.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.array.iterator.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.array.iterator.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ \"./node_modules/core-js/library/modules/_add-to-unscopables.js\");\nvar step = __webpack_require__(/*! ./_iter-step */ \"./node_modules/core-js/library/modules/_iter-step.js\");\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/library/modules/_iterators.js\");\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/library/modules/_to-iobject.js\");\n\n// 22.1.3.4 Array.prototype.entries()\n// 22.1.3.13 Array.prototype.keys()\n// 22.1.3.29 Array.prototype.values()\n// 22.1.3.30 Array.prototype[@@iterator]()\nmodule.exports = __webpack_require__(/*! ./_iter-define */ \"./node_modules/core-js/library/modules/_iter-define.js\")(Array, 'Array', function (iterated, kind) {\n  this._t = toIObject(iterated); // target\n  this._i = 0;                   // next index\n  this._k = kind;                // kind\n// 22.1.5.2.1 %ArrayIteratorPrototype%.next()\n}, function () {\n  var O = this._t;\n  var kind = this._k;\n  var index = this._i++;\n  if (!O || index >= O.length) {\n    this._t = undefined;\n    return step(1);\n  }\n  if (kind == 'keys') return step(0, index);\n  if (kind == 'values') return step(0, O[index]);\n  return step(0, [index, O[index]]);\n}, 'values');\n\n// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)\nIterators.Arguments = Iterators.Array;\n\naddToUnscopables('keys');\naddToUnscopables('values');\naddToUnscopables('entries');\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/es6.array.iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.assign.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.assign.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.3.1 Object.assign(target, source)\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n\n$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ \"./node_modules/core-js/library/modules/_object-assign.js\") });\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/es6.object.assign.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.create.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.create.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])\n$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ \"./node_modules/core-js/library/modules/_object-create.js\") });\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/es6.object.create.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.define-property.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.define-property.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)\n$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\"), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\").f });\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/es6.object.define-property.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.get-prototype-of.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.get-prototype-of.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.2.9 Object.getPrototypeOf(O)\nvar toObject = __webpack_require__(/*! ./_to-object */ \"./node_modules/core-js/library/modules/_to-object.js\");\nvar $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ \"./node_modules/core-js/library/modules/_object-gpo.js\");\n\n__webpack_require__(/*! ./_object-sap */ \"./node_modules/core-js/library/modules/_object-sap.js\")('getPrototypeOf', function () {\n  return function getPrototypeOf(it) {\n    return $getPrototypeOf(toObject(it));\n  };\n});\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/es6.object.get-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.set-prototype-of.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.set-prototype-of.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// 19.1.3.19 Object.setPrototypeOf(O, proto)\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\n$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ \"./node_modules/core-js/library/modules/_set-proto.js\").set });\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/es6.object.set-prototype-of.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.object.to-string.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.object.to-string.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/es6.object.to-string.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.string.iterator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.string.iterator.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar $at = __webpack_require__(/*! ./_string-at */ \"./node_modules/core-js/library/modules/_string-at.js\")(true);\n\n// 21.1.3.27 String.prototype[@@iterator]()\n__webpack_require__(/*! ./_iter-define */ \"./node_modules/core-js/library/modules/_iter-define.js\")(String, 'String', function (iterated) {\n  this._t = String(iterated); // target\n  this._i = 0;                // next index\n// 21.1.5.2.1 %StringIteratorPrototype%.next()\n}, function () {\n  var O = this._t;\n  var index = this._i;\n  var point;\n  if (index >= O.length) return { value: undefined, done: true };\n  point = $at(O, index);\n  this._i += point.length;\n  return { value: point, done: false };\n});\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/es6.string.iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es6.symbol.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es6.symbol.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n// ECMAScript 6 symbols shim\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\nvar has = __webpack_require__(/*! ./_has */ \"./node_modules/core-js/library/modules/_has.js\");\nvar DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ \"./node_modules/core-js/library/modules/_descriptors.js\");\nvar $export = __webpack_require__(/*! ./_export */ \"./node_modules/core-js/library/modules/_export.js\");\nvar redefine = __webpack_require__(/*! ./_redefine */ \"./node_modules/core-js/library/modules/_redefine.js\");\nvar META = __webpack_require__(/*! ./_meta */ \"./node_modules/core-js/library/modules/_meta.js\").KEY;\nvar $fails = __webpack_require__(/*! ./_fails */ \"./node_modules/core-js/library/modules/_fails.js\");\nvar shared = __webpack_require__(/*! ./_shared */ \"./node_modules/core-js/library/modules/_shared.js\");\nvar setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ \"./node_modules/core-js/library/modules/_set-to-string-tag.js\");\nvar uid = __webpack_require__(/*! ./_uid */ \"./node_modules/core-js/library/modules/_uid.js\");\nvar wks = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\");\nvar wksExt = __webpack_require__(/*! ./_wks-ext */ \"./node_modules/core-js/library/modules/_wks-ext.js\");\nvar wksDefine = __webpack_require__(/*! ./_wks-define */ \"./node_modules/core-js/library/modules/_wks-define.js\");\nvar enumKeys = __webpack_require__(/*! ./_enum-keys */ \"./node_modules/core-js/library/modules/_enum-keys.js\");\nvar isArray = __webpack_require__(/*! ./_is-array */ \"./node_modules/core-js/library/modules/_is-array.js\");\nvar anObject = __webpack_require__(/*! ./_an-object */ \"./node_modules/core-js/library/modules/_an-object.js\");\nvar isObject = __webpack_require__(/*! ./_is-object */ \"./node_modules/core-js/library/modules/_is-object.js\");\nvar toIObject = __webpack_require__(/*! ./_to-iobject */ \"./node_modules/core-js/library/modules/_to-iobject.js\");\nvar toPrimitive = __webpack_require__(/*! ./_to-primitive */ \"./node_modules/core-js/library/modules/_to-primitive.js\");\nvar createDesc = __webpack_require__(/*! ./_property-desc */ \"./node_modules/core-js/library/modules/_property-desc.js\");\nvar _create = __webpack_require__(/*! ./_object-create */ \"./node_modules/core-js/library/modules/_object-create.js\");\nvar gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ \"./node_modules/core-js/library/modules/_object-gopn-ext.js\");\nvar $GOPD = __webpack_require__(/*! ./_object-gopd */ \"./node_modules/core-js/library/modules/_object-gopd.js\");\nvar $DP = __webpack_require__(/*! ./_object-dp */ \"./node_modules/core-js/library/modules/_object-dp.js\");\nvar $keys = __webpack_require__(/*! ./_object-keys */ \"./node_modules/core-js/library/modules/_object-keys.js\");\nvar gOPD = $GOPD.f;\nvar dP = $DP.f;\nvar gOPN = gOPNExt.f;\nvar $Symbol = global.Symbol;\nvar $JSON = global.JSON;\nvar _stringify = $JSON && $JSON.stringify;\nvar PROTOTYPE = 'prototype';\nvar HIDDEN = wks('_hidden');\nvar TO_PRIMITIVE = wks('toPrimitive');\nvar isEnum = {}.propertyIsEnumerable;\nvar SymbolRegistry = shared('symbol-registry');\nvar AllSymbols = shared('symbols');\nvar OPSymbols = shared('op-symbols');\nvar ObjectProto = Object[PROTOTYPE];\nvar USE_NATIVE = typeof $Symbol == 'function';\nvar QObject = global.QObject;\n// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173\nvar setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;\n\n// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687\nvar setSymbolDesc = DESCRIPTORS && $fails(function () {\n  return _create(dP({}, 'a', {\n    get: function () { return dP(this, 'a', { value: 7 }).a; }\n  })).a != 7;\n}) ? function (it, key, D) {\n  var protoDesc = gOPD(ObjectProto, key);\n  if (protoDesc) delete ObjectProto[key];\n  dP(it, key, D);\n  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);\n} : dP;\n\nvar wrap = function (tag) {\n  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);\n  sym._k = tag;\n  return sym;\n};\n\nvar isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {\n  return typeof it == 'symbol';\n} : function (it) {\n  return it instanceof $Symbol;\n};\n\nvar $defineProperty = function defineProperty(it, key, D) {\n  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);\n  anObject(it);\n  key = toPrimitive(key, true);\n  anObject(D);\n  if (has(AllSymbols, key)) {\n    if (!D.enumerable) {\n      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));\n      it[HIDDEN][key] = true;\n    } else {\n      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;\n      D = _create(D, { enumerable: createDesc(0, false) });\n    } return setSymbolDesc(it, key, D);\n  } return dP(it, key, D);\n};\nvar $defineProperties = function defineProperties(it, P) {\n  anObject(it);\n  var keys = enumKeys(P = toIObject(P));\n  var i = 0;\n  var l = keys.length;\n  var key;\n  while (l > i) $defineProperty(it, key = keys[i++], P[key]);\n  return it;\n};\nvar $create = function create(it, P) {\n  return P === undefined ? _create(it) : $defineProperties(_create(it), P);\n};\nvar $propertyIsEnumerable = function propertyIsEnumerable(key) {\n  var E = isEnum.call(this, key = toPrimitive(key, true));\n  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;\n  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;\n};\nvar $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {\n  it = toIObject(it);\n  key = toPrimitive(key, true);\n  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;\n  var D = gOPD(it, key);\n  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;\n  return D;\n};\nvar $getOwnPropertyNames = function getOwnPropertyNames(it) {\n  var names = gOPN(toIObject(it));\n  var result = [];\n  var i = 0;\n  var key;\n  while (names.length > i) {\n    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);\n  } return result;\n};\nvar $getOwnPropertySymbols = function getOwnPropertySymbols(it) {\n  var IS_OP = it === ObjectProto;\n  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));\n  var result = [];\n  var i = 0;\n  var key;\n  while (names.length > i) {\n    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);\n  } return result;\n};\n\n// 19.4.1.1 Symbol([description])\nif (!USE_NATIVE) {\n  $Symbol = function Symbol() {\n    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');\n    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);\n    var $set = function (value) {\n      if (this === ObjectProto) $set.call(OPSymbols, value);\n      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;\n      setSymbolDesc(this, tag, createDesc(1, value));\n    };\n    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });\n    return wrap(tag);\n  };\n  redefine($Symbol[PROTOTYPE], 'toString', function toString() {\n    return this._k;\n  });\n\n  $GOPD.f = $getOwnPropertyDescriptor;\n  $DP.f = $defineProperty;\n  __webpack_require__(/*! ./_object-gopn */ \"./node_modules/core-js/library/modules/_object-gopn.js\").f = gOPNExt.f = $getOwnPropertyNames;\n  __webpack_require__(/*! ./_object-pie */ \"./node_modules/core-js/library/modules/_object-pie.js\").f = $propertyIsEnumerable;\n  __webpack_require__(/*! ./_object-gops */ \"./node_modules/core-js/library/modules/_object-gops.js\").f = $getOwnPropertySymbols;\n\n  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ \"./node_modules/core-js/library/modules/_library.js\")) {\n    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);\n  }\n\n  wksExt.f = function (name) {\n    return wrap(wks(name));\n  };\n}\n\n$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });\n\nfor (var es6Symbols = (\n  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14\n  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'\n).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);\n\nfor (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);\n\n$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {\n  // 19.4.2.1 Symbol.for(key)\n  'for': function (key) {\n    return has(SymbolRegistry, key += '')\n      ? SymbolRegistry[key]\n      : SymbolRegistry[key] = $Symbol(key);\n  },\n  // 19.4.2.5 Symbol.keyFor(sym)\n  keyFor: function keyFor(sym) {\n    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');\n    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;\n  },\n  useSetter: function () { setter = true; },\n  useSimple: function () { setter = false; }\n});\n\n$export($export.S + $export.F * !USE_NATIVE, 'Object', {\n  // 19.1.2.2 Object.create(O [, Properties])\n  create: $create,\n  // 19.1.2.4 Object.defineProperty(O, P, Attributes)\n  defineProperty: $defineProperty,\n  // 19.1.2.3 Object.defineProperties(O, Properties)\n  defineProperties: $defineProperties,\n  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)\n  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,\n  // 19.1.2.7 Object.getOwnPropertyNames(O)\n  getOwnPropertyNames: $getOwnPropertyNames,\n  // 19.1.2.8 Object.getOwnPropertySymbols(O)\n  getOwnPropertySymbols: $getOwnPropertySymbols\n});\n\n// 24.3.2 JSON.stringify(value [, replacer [, space]])\n$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {\n  var S = $Symbol();\n  // MS Edge converts symbol values to JSON as {}\n  // WebKit converts symbol values to JSON as null\n  // V8 throws on boxed symbols\n  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';\n})), 'JSON', {\n  stringify: function stringify(it) {\n    var args = [it];\n    var i = 1;\n    var replacer, $replacer;\n    while (arguments.length > i) args.push(arguments[i++]);\n    $replacer = replacer = args[1];\n    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined\n    if (!isArray(replacer)) replacer = function (key, value) {\n      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);\n      if (!isSymbol(value)) return value;\n    };\n    args[1] = replacer;\n    return _stringify.apply($JSON, args);\n  }\n});\n\n// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)\n$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/library/modules/_hide.js\")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);\n// 19.4.3.5 Symbol.prototype[@@toStringTag]\nsetToStringTag($Symbol, 'Symbol');\n// 20.2.1.9 Math[@@toStringTag]\nsetToStringTag(Math, 'Math', true);\n// 24.3.3 JSON[@@toStringTag]\nsetToStringTag(global.JSON, 'JSON', true);\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/es6.symbol.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.symbol.async-iterator.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.symbol.async-iterator.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./_wks-define */ \"./node_modules/core-js/library/modules/_wks-define.js\")('asyncIterator');\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/es7.symbol.async-iterator.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/es7.symbol.observable.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/library/modules/es7.symbol.observable.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./_wks-define */ \"./node_modules/core-js/library/modules/_wks-define.js\")('observable');\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/es7.symbol.observable.js?");

/***/ }),

/***/ "./node_modules/core-js/library/modules/web.dom.iterable.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/library/modules/web.dom.iterable.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./es6.array.iterator */ \"./node_modules/core-js/library/modules/es6.array.iterator.js\");\nvar global = __webpack_require__(/*! ./_global */ \"./node_modules/core-js/library/modules/_global.js\");\nvar hide = __webpack_require__(/*! ./_hide */ \"./node_modules/core-js/library/modules/_hide.js\");\nvar Iterators = __webpack_require__(/*! ./_iterators */ \"./node_modules/core-js/library/modules/_iterators.js\");\nvar TO_STRING_TAG = __webpack_require__(/*! ./_wks */ \"./node_modules/core-js/library/modules/_wks.js\")('toStringTag');\n\nvar DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +\n  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +\n  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +\n  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +\n  'TextTrackList,TouchList').split(',');\n\nfor (var i = 0; i < DOMIterables.length; i++) {\n  var NAME = DOMIterables[i];\n  var Collection = global[NAME];\n  var proto = Collection && Collection.prototype;\n  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);\n  Iterators[NAME] = Iterators.Array;\n}\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/core-js/library/modules/web.dom.iterable.js?");

/***/ }),

/***/ "./node_modules/create-react-context/lib/implementation.js":
/*!*****************************************************************!*\
  !*** ./node_modules/create-react-context/lib/implementation.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _gud = __webpack_require__(/*! gud */ \"./node_modules/gud/index.js\");\n\nvar _gud2 = _interopRequireDefault(_gud);\n\nvar _warning = __webpack_require__(/*! fbjs/lib/warning */ \"./node_modules/fbjs/lib/warning.js\");\n\nvar _warning2 = _interopRequireDefault(_warning);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar MAX_SIGNED_31_BIT_INT = 1073741823;\n\n// Inlined Object.is polyfill.\n// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is\nfunction objectIs(x, y) {\n  if (x === y) {\n    return x !== 0 || 1 / x === 1 / y;\n  } else {\n    return x !== x && y !== y;\n  }\n}\n\nfunction createEventEmitter(value) {\n  var handlers = [];\n  return {\n    on: function on(handler) {\n      handlers.push(handler);\n    },\n    off: function off(handler) {\n      handlers = handlers.filter(function (h) {\n        return h !== handler;\n      });\n    },\n    get: function get() {\n      return value;\n    },\n    set: function set(newValue, changedBits) {\n      value = newValue;\n      handlers.forEach(function (handler) {\n        return handler(value, changedBits);\n      });\n    }\n  };\n}\n\nfunction onlyChild(children) {\n  return Array.isArray(children) ? children[0] : children;\n}\n\nfunction createReactContext(defaultValue, calculateChangedBits) {\n  var _Provider$childContex, _Consumer$contextType;\n\n  var contextProp = '__create-react-context-' + (0, _gud2.default)() + '__';\n\n  var Provider = function (_Component) {\n    _inherits(Provider, _Component);\n\n    function Provider() {\n      var _temp, _this, _ret;\n\n      _classCallCheck(this, Provider);\n\n      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.emitter = createEventEmitter(_this.props.value), _temp), _possibleConstructorReturn(_this, _ret);\n    }\n\n    Provider.prototype.getChildContext = function getChildContext() {\n      var _ref;\n\n      return _ref = {}, _ref[contextProp] = this.emitter, _ref;\n    };\n\n    Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {\n      if (this.props.value !== nextProps.value) {\n        var oldValue = this.props.value;\n        var newValue = nextProps.value;\n        var changedBits = void 0;\n\n        if (objectIs(oldValue, newValue)) {\n          changedBits = 0; // No change\n        } else {\n          changedBits = typeof calculateChangedBits === 'function' ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;\n          if (true) {\n            (0, _warning2.default)((changedBits & MAX_SIGNED_31_BIT_INT) === changedBits, 'calculateChangedBits: Expected the return value to be a ' + '31-bit integer. Instead received: %s', changedBits);\n          }\n\n          changedBits |= 0;\n\n          if (changedBits !== 0) {\n            this.emitter.set(nextProps.value, changedBits);\n          }\n        }\n      }\n    };\n\n    Provider.prototype.render = function render() {\n      return this.props.children;\n    };\n\n    return Provider;\n  }(_react.Component);\n\n  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = _propTypes2.default.object.isRequired, _Provider$childContex);\n\n  var Consumer = function (_Component2) {\n    _inherits(Consumer, _Component2);\n\n    function Consumer() {\n      var _temp2, _this2, _ret2;\n\n      _classCallCheck(this, Consumer);\n\n      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n\n      return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, _Component2.call.apply(_Component2, [this].concat(args))), _this2), _this2.state = {\n        value: _this2.getValue()\n      }, _this2.onUpdate = function (newValue, changedBits) {\n        var observedBits = _this2.observedBits | 0;\n        if ((observedBits & changedBits) !== 0) {\n          _this2.setState({ value: _this2.getValue() });\n        }\n      }, _temp2), _possibleConstructorReturn(_this2, _ret2);\n    }\n\n    Consumer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {\n      var observedBits = nextProps.observedBits;\n\n      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default\n      : observedBits;\n    };\n\n    Consumer.prototype.componentDidMount = function componentDidMount() {\n      if (this.context[contextProp]) {\n        this.context[contextProp].on(this.onUpdate);\n      }\n      var observedBits = this.props.observedBits;\n\n      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT // Subscribe to all changes by default\n      : observedBits;\n    };\n\n    Consumer.prototype.componentWillUnmount = function componentWillUnmount() {\n      if (this.context[contextProp]) {\n        this.context[contextProp].off(this.onUpdate);\n      }\n    };\n\n    Consumer.prototype.getValue = function getValue() {\n      if (this.context[contextProp]) {\n        return this.context[contextProp].get();\n      } else {\n        return defaultValue;\n      }\n    };\n\n    Consumer.prototype.render = function render() {\n      return onlyChild(this.props.children)(this.state.value);\n    };\n\n    return Consumer;\n  }(_react.Component);\n\n  Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = _propTypes2.default.object, _Consumer$contextType);\n\n\n  return {\n    Provider: Provider,\n    Consumer: Consumer\n  };\n}\n\nexports.default = createReactContext;\nmodule.exports = exports['default'];\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/create-react-context/lib/implementation.js?");

/***/ }),

/***/ "./node_modules/create-react-context/lib/index.js":
/*!********************************************************!*\
  !*** ./node_modules/create-react-context/lib/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _implementation = __webpack_require__(/*! ./implementation */ \"./node_modules/create-react-context/lib/implementation.js\");\n\nvar _implementation2 = _interopRequireDefault(_implementation);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _react2.default.createContext || _implementation2.default;\nmodule.exports = exports['default'];\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/create-react-context/lib/index.js?");

/***/ }),

/***/ "./node_modules/dom-helpers/ownerDocument.js":
/*!***************************************************!*\
  !*** ./node_modules/dom-helpers/ownerDocument.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = ownerDocument;\nfunction ownerDocument(node) {\n  return node && node.ownerDocument || document;\n}\nmodule.exports = exports[\"default\"];\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/dom-helpers/ownerDocument.js?");

/***/ }),

/***/ "./node_modules/escape-string-regexp/index.js":
/*!****************************************************!*\
  !*** ./node_modules/escape-string-regexp/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar matchOperatorsRe = /[|\\\\{}()[\\]^$+*?.]/g;\n\nmodule.exports = function (str) {\n\tif (typeof str !== 'string') {\n\t\tthrow new TypeError('Expected a string');\n\t}\n\n\treturn str.replace(matchOperatorsRe, '\\\\$&');\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/escape-string-regexp/index.js?");

/***/ }),

/***/ "./node_modules/fbjs/lib/emptyFunction.js":
/*!************************************************!*\
  !*** ./node_modules/fbjs/lib/emptyFunction.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n *\n * \n */\n\nfunction makeEmptyFunction(arg) {\n  return function () {\n    return arg;\n  };\n}\n\n/**\n * This function accepts and discards inputs; it has no side effects. This is\n * primarily useful idiomatically for overridable function endpoints which\n * always need to be callable, since JS lacks a null-call idiom ala Cocoa.\n */\nvar emptyFunction = function emptyFunction() {};\n\nemptyFunction.thatReturns = makeEmptyFunction;\nemptyFunction.thatReturnsFalse = makeEmptyFunction(false);\nemptyFunction.thatReturnsTrue = makeEmptyFunction(true);\nemptyFunction.thatReturnsNull = makeEmptyFunction(null);\nemptyFunction.thatReturnsThis = function () {\n  return this;\n};\nemptyFunction.thatReturnsArgument = function (arg) {\n  return arg;\n};\n\nmodule.exports = emptyFunction;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/fbjs/lib/emptyFunction.js?");

/***/ }),

/***/ "./node_modules/fbjs/lib/warning.js":
/*!******************************************!*\
  !*** ./node_modules/fbjs/lib/warning.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2014-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n *\n */\n\n\n\nvar emptyFunction = __webpack_require__(/*! ./emptyFunction */ \"./node_modules/fbjs/lib/emptyFunction.js\");\n\n/**\n * Similar to invariant but only logs a warning if the condition is not met.\n * This can be used to log issues in development environments in critical\n * paths. Removing the logging code for production environments will keep the\n * same logic and follow the same code paths.\n */\n\nvar warning = emptyFunction;\n\nif (true) {\n  var printWarning = function printWarning(format) {\n    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n      args[_key - 1] = arguments[_key];\n    }\n\n    var argIndex = 0;\n    var message = 'Warning: ' + format.replace(/%s/g, function () {\n      return args[argIndex++];\n    });\n    if (typeof console !== 'undefined') {\n      console.error(message);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  };\n\n  warning = function warning(condition, format) {\n    if (format === undefined) {\n      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');\n    }\n\n    if (format.indexOf('Failed Composite propType: ') === 0) {\n      return; // Ignore CompositeComponent proptype check.\n    }\n\n    if (!condition) {\n      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {\n        args[_key2 - 2] = arguments[_key2];\n      }\n\n      printWarning.apply(undefined, [format].concat(args));\n    }\n  };\n}\n\nmodule.exports = warning;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/fbjs/lib/warning.js?");

/***/ }),

/***/ "./node_modules/gud/index.js":
/*!***********************************!*\
  !*** ./node_modules/gud/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {// @flow\n\n\nvar key = '__global_unique_id__';\n\nmodule.exports = function() {\n  return global[key] = (global[key] || 0) + 1;\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/gud/index.js?");

/***/ }),

/***/ "./node_modules/invariant/browser.js":
/*!*******************************************!*\
  !*** ./node_modules/invariant/browser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\n/**\n * Use invariant() to assert state which your program assumes to be true.\n *\n * Provide sprintf-style format (only %s is supported) and arguments\n * to provide information about what broke and what you were\n * expecting.\n *\n * The invariant message will be stripped in production, but the invariant\n * will remain to ensure logic does not differ in production.\n */\n\nvar invariant = function(condition, format, a, b, c, d, e, f) {\n  if (true) {\n    if (format === undefined) {\n      throw new Error('invariant requires an error message argument');\n    }\n  }\n\n  if (!condition) {\n    var error;\n    if (format === undefined) {\n      error = new Error(\n        'Minified exception occurred; use the non-minified dev environment ' +\n        'for the full error message and additional helpful warnings.'\n      );\n    } else {\n      var args = [a, b, c, d, e, f];\n      var argIndex = 0;\n      error = new Error(\n        format.replace(/%s/g, function() { return args[argIndex++]; })\n      );\n      error.name = 'Invariant Violation';\n    }\n\n    error.framesToPop = 1; // we don't care about invariant's own frame\n    throw error;\n  }\n};\n\nmodule.exports = invariant;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/invariant/browser.js?");

/***/ }),

/***/ "./node_modules/lodash/_DataView.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_DataView.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar DataView = getNative(root, 'DataView');\n\nmodule.exports = DataView;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_DataView.js?");

/***/ }),

/***/ "./node_modules/lodash/_Hash.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var hashClear = __webpack_require__(/*! ./_hashClear */ \"./node_modules/lodash/_hashClear.js\"),\n    hashDelete = __webpack_require__(/*! ./_hashDelete */ \"./node_modules/lodash/_hashDelete.js\"),\n    hashGet = __webpack_require__(/*! ./_hashGet */ \"./node_modules/lodash/_hashGet.js\"),\n    hashHas = __webpack_require__(/*! ./_hashHas */ \"./node_modules/lodash/_hashHas.js\"),\n    hashSet = __webpack_require__(/*! ./_hashSet */ \"./node_modules/lodash/_hashSet.js\");\n\n/**\n * Creates a hash object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Hash(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `Hash`.\nHash.prototype.clear = hashClear;\nHash.prototype['delete'] = hashDelete;\nHash.prototype.get = hashGet;\nHash.prototype.has = hashHas;\nHash.prototype.set = hashSet;\n\nmodule.exports = Hash;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_Hash.js?");

/***/ }),

/***/ "./node_modules/lodash/_LazyWrapper.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_LazyWrapper.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseCreate = __webpack_require__(/*! ./_baseCreate */ \"./node_modules/lodash/_baseCreate.js\"),\n    baseLodash = __webpack_require__(/*! ./_baseLodash */ \"./node_modules/lodash/_baseLodash.js\");\n\n/** Used as references for the maximum length and index of an array. */\nvar MAX_ARRAY_LENGTH = 4294967295;\n\n/**\n * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.\n *\n * @private\n * @constructor\n * @param {*} value The value to wrap.\n */\nfunction LazyWrapper(value) {\n  this.__wrapped__ = value;\n  this.__actions__ = [];\n  this.__dir__ = 1;\n  this.__filtered__ = false;\n  this.__iteratees__ = [];\n  this.__takeCount__ = MAX_ARRAY_LENGTH;\n  this.__views__ = [];\n}\n\n// Ensure `LazyWrapper` is an instance of `baseLodash`.\nLazyWrapper.prototype = baseCreate(baseLodash.prototype);\nLazyWrapper.prototype.constructor = LazyWrapper;\n\nmodule.exports = LazyWrapper;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_LazyWrapper.js?");

/***/ }),

/***/ "./node_modules/lodash/_ListCache.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ \"./node_modules/lodash/_listCacheClear.js\"),\n    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ \"./node_modules/lodash/_listCacheDelete.js\"),\n    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ \"./node_modules/lodash/_listCacheGet.js\"),\n    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ \"./node_modules/lodash/_listCacheHas.js\"),\n    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ \"./node_modules/lodash/_listCacheSet.js\");\n\n/**\n * Creates an list cache object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction ListCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `ListCache`.\nListCache.prototype.clear = listCacheClear;\nListCache.prototype['delete'] = listCacheDelete;\nListCache.prototype.get = listCacheGet;\nListCache.prototype.has = listCacheHas;\nListCache.prototype.set = listCacheSet;\n\nmodule.exports = ListCache;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_ListCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_LodashWrapper.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_LodashWrapper.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseCreate = __webpack_require__(/*! ./_baseCreate */ \"./node_modules/lodash/_baseCreate.js\"),\n    baseLodash = __webpack_require__(/*! ./_baseLodash */ \"./node_modules/lodash/_baseLodash.js\");\n\n/**\n * The base constructor for creating `lodash` wrapper objects.\n *\n * @private\n * @param {*} value The value to wrap.\n * @param {boolean} [chainAll] Enable explicit method chain sequences.\n */\nfunction LodashWrapper(value, chainAll) {\n  this.__wrapped__ = value;\n  this.__actions__ = [];\n  this.__chain__ = !!chainAll;\n  this.__index__ = 0;\n  this.__values__ = undefined;\n}\n\nLodashWrapper.prototype = baseCreate(baseLodash.prototype);\nLodashWrapper.prototype.constructor = LodashWrapper;\n\nmodule.exports = LodashWrapper;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_LodashWrapper.js?");

/***/ }),

/***/ "./node_modules/lodash/_Map.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Map = getNative(root, 'Map');\n\nmodule.exports = Map;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_Map.js?");

/***/ }),

/***/ "./node_modules/lodash/_MapCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ \"./node_modules/lodash/_mapCacheClear.js\"),\n    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ \"./node_modules/lodash/_mapCacheDelete.js\"),\n    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ \"./node_modules/lodash/_mapCacheGet.js\"),\n    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ \"./node_modules/lodash/_mapCacheHas.js\"),\n    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ \"./node_modules/lodash/_mapCacheSet.js\");\n\n/**\n * Creates a map cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction MapCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `MapCache`.\nMapCache.prototype.clear = mapCacheClear;\nMapCache.prototype['delete'] = mapCacheDelete;\nMapCache.prototype.get = mapCacheGet;\nMapCache.prototype.has = mapCacheHas;\nMapCache.prototype.set = mapCacheSet;\n\nmodule.exports = MapCache;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_MapCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Promise.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_Promise.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Promise = getNative(root, 'Promise');\n\nmodule.exports = Promise;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_Promise.js?");

/***/ }),

/***/ "./node_modules/lodash/_Set.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/_Set.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Set = getNative(root, 'Set');\n\nmodule.exports = Set;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_Set.js?");

/***/ }),

/***/ "./node_modules/lodash/_SetCache.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_SetCache.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MapCache = __webpack_require__(/*! ./_MapCache */ \"./node_modules/lodash/_MapCache.js\"),\n    setCacheAdd = __webpack_require__(/*! ./_setCacheAdd */ \"./node_modules/lodash/_setCacheAdd.js\"),\n    setCacheHas = __webpack_require__(/*! ./_setCacheHas */ \"./node_modules/lodash/_setCacheHas.js\");\n\n/**\n *\n * Creates an array cache object to store unique values.\n *\n * @private\n * @constructor\n * @param {Array} [values] The values to cache.\n */\nfunction SetCache(values) {\n  var index = -1,\n      length = values == null ? 0 : values.length;\n\n  this.__data__ = new MapCache;\n  while (++index < length) {\n    this.add(values[index]);\n  }\n}\n\n// Add methods to `SetCache`.\nSetCache.prototype.add = SetCache.prototype.push = setCacheAdd;\nSetCache.prototype.has = setCacheHas;\n\nmodule.exports = SetCache;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_SetCache.js?");

/***/ }),

/***/ "./node_modules/lodash/_Stack.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    stackClear = __webpack_require__(/*! ./_stackClear */ \"./node_modules/lodash/_stackClear.js\"),\n    stackDelete = __webpack_require__(/*! ./_stackDelete */ \"./node_modules/lodash/_stackDelete.js\"),\n    stackGet = __webpack_require__(/*! ./_stackGet */ \"./node_modules/lodash/_stackGet.js\"),\n    stackHas = __webpack_require__(/*! ./_stackHas */ \"./node_modules/lodash/_stackHas.js\"),\n    stackSet = __webpack_require__(/*! ./_stackSet */ \"./node_modules/lodash/_stackSet.js\");\n\n/**\n * Creates a stack cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Stack(entries) {\n  var data = this.__data__ = new ListCache(entries);\n  this.size = data.size;\n}\n\n// Add methods to `Stack`.\nStack.prototype.clear = stackClear;\nStack.prototype['delete'] = stackDelete;\nStack.prototype.get = stackGet;\nStack.prototype.has = stackHas;\nStack.prototype.set = stackSet;\n\nmodule.exports = Stack;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_Stack.js?");

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Symbol = root.Symbol;\n\nmodule.exports = Symbol;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_Symbol.js?");

/***/ }),

/***/ "./node_modules/lodash/_Uint8Array.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Uint8Array = root.Uint8Array;\n\nmodule.exports = Uint8Array;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_Uint8Array.js?");

/***/ }),

/***/ "./node_modules/lodash/_WeakMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_WeakMap.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar WeakMap = getNative(root, 'WeakMap');\n\nmodule.exports = WeakMap;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_WeakMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_apply.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A faster alternative to `Function#apply`, this function invokes `func`\n * with the `this` binding of `thisArg` and the arguments of `args`.\n *\n * @private\n * @param {Function} func The function to invoke.\n * @param {*} thisArg The `this` binding of `func`.\n * @param {Array} args The arguments to invoke `func` with.\n * @returns {*} Returns the result of `func`.\n */\nfunction apply(func, thisArg, args) {\n  switch (args.length) {\n    case 0: return func.call(thisArg);\n    case 1: return func.call(thisArg, args[0]);\n    case 2: return func.call(thisArg, args[0], args[1]);\n    case 3: return func.call(thisArg, args[0], args[1], args[2]);\n  }\n  return func.apply(thisArg, args);\n}\n\nmodule.exports = apply;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_apply.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayFilter.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayFilter.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.filter` for arrays without support for\n * iteratee shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} predicate The function invoked per iteration.\n * @returns {Array} Returns the new filtered array.\n */\nfunction arrayFilter(array, predicate) {\n  var index = -1,\n      length = array == null ? 0 : array.length,\n      resIndex = 0,\n      result = [];\n\n  while (++index < length) {\n    var value = array[index];\n    if (predicate(value, index, array)) {\n      result[resIndex++] = value;\n    }\n  }\n  return result;\n}\n\nmodule.exports = arrayFilter;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_arrayFilter.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseTimes = __webpack_require__(/*! ./_baseTimes */ \"./node_modules/lodash/_baseTimes.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\"),\n    isTypedArray = __webpack_require__(/*! ./isTypedArray */ \"./node_modules/lodash/isTypedArray.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Creates an array of the enumerable property names of the array-like `value`.\n *\n * @private\n * @param {*} value The value to query.\n * @param {boolean} inherited Specify returning inherited property names.\n * @returns {Array} Returns the array of property names.\n */\nfunction arrayLikeKeys(value, inherited) {\n  var isArr = isArray(value),\n      isArg = !isArr && isArguments(value),\n      isBuff = !isArr && !isArg && isBuffer(value),\n      isType = !isArr && !isArg && !isBuff && isTypedArray(value),\n      skipIndexes = isArr || isArg || isBuff || isType,\n      result = skipIndexes ? baseTimes(value.length, String) : [],\n      length = result.length;\n\n  for (var key in value) {\n    if ((inherited || hasOwnProperty.call(value, key)) &&\n        !(skipIndexes && (\n           // Safari 9 has enumerable `arguments.length` in strict mode.\n           key == 'length' ||\n           // Node.js 0.10 has enumerable non-index properties on buffers.\n           (isBuff && (key == 'offset' || key == 'parent')) ||\n           // PhantomJS 2 has enumerable non-index properties on typed arrays.\n           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||\n           // Skip index properties.\n           isIndex(key, length)\n        ))) {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = arrayLikeKeys;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_arrayLikeKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayMap.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.map` for arrays without support for iteratee\n * shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns the new mapped array.\n */\nfunction arrayMap(array, iteratee) {\n  var index = -1,\n      length = array == null ? 0 : array.length,\n      result = Array(length);\n\n  while (++index < length) {\n    result[index] = iteratee(array[index], index, array);\n  }\n  return result;\n}\n\nmodule.exports = arrayMap;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_arrayMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayPush.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayPush.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Appends the elements of `values` to `array`.\n *\n * @private\n * @param {Array} array The array to modify.\n * @param {Array} values The values to append.\n * @returns {Array} Returns `array`.\n */\nfunction arrayPush(array, values) {\n  var index = -1,\n      length = values.length,\n      offset = array.length;\n\n  while (++index < length) {\n    array[offset + index] = values[index];\n  }\n  return array;\n}\n\nmodule.exports = arrayPush;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_arrayPush.js?");

/***/ }),

/***/ "./node_modules/lodash/_arraySome.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arraySome.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.some` for arrays without support for iteratee\n * shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} predicate The function invoked per iteration.\n * @returns {boolean} Returns `true` if any element passes the predicate check,\n *  else `false`.\n */\nfunction arraySome(array, predicate) {\n  var index = -1,\n      length = array == null ? 0 : array.length;\n\n  while (++index < length) {\n    if (predicate(array[index], index, array)) {\n      return true;\n    }\n  }\n  return false;\n}\n\nmodule.exports = arraySome;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_arraySome.js?");

/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_assignValue.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ \"./node_modules/lodash/_baseAssignValue.js\"),\n    eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Assigns `value` to `key` of `object` if the existing value is not equivalent\n * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * for equality comparisons.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction assignValue(object, key, value) {\n  var objValue = object[key];\n  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||\n      (value === undefined && !(key in object))) {\n    baseAssignValue(object, key, value);\n  }\n}\n\nmodule.exports = assignValue;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_assignValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_assocIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\");\n\n/**\n * Gets the index at which the `key` is found in `array` of key-value pairs.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} key The key to search for.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction assocIndexOf(array, key) {\n  var length = array.length;\n  while (length--) {\n    if (eq(array[length][0], key)) {\n      return length;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = assocIndexOf;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_assocIndexOf.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseAssignValue.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var defineProperty = __webpack_require__(/*! ./_defineProperty */ \"./node_modules/lodash/_defineProperty.js\");\n\n/**\n * The base implementation of `assignValue` and `assignMergeValue` without\n * value checks.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {string} key The key of the property to assign.\n * @param {*} value The value to assign.\n */\nfunction baseAssignValue(object, key, value) {\n  if (key == '__proto__' && defineProperty) {\n    defineProperty(object, key, {\n      'configurable': true,\n      'enumerable': true,\n      'value': value,\n      'writable': true\n    });\n  } else {\n    object[key] = value;\n  }\n}\n\nmodule.exports = baseAssignValue;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseAssignValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseCreate.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/** Built-in value references. */\nvar objectCreate = Object.create;\n\n/**\n * The base implementation of `_.create` without support for assigning\n * properties to the created object.\n *\n * @private\n * @param {Object} proto The object to inherit from.\n * @returns {Object} Returns the new object.\n */\nvar baseCreate = (function() {\n  function object() {}\n  return function(proto) {\n    if (!isObject(proto)) {\n      return {};\n    }\n    if (objectCreate) {\n      return objectCreate(proto);\n    }\n    object.prototype = proto;\n    var result = new object;\n    object.prototype = undefined;\n    return result;\n  };\n}());\n\nmodule.exports = baseCreate;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseCreate.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseEach.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseEach.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseForOwn = __webpack_require__(/*! ./_baseForOwn */ \"./node_modules/lodash/_baseForOwn.js\"),\n    createBaseEach = __webpack_require__(/*! ./_createBaseEach */ \"./node_modules/lodash/_createBaseEach.js\");\n\n/**\n * The base implementation of `_.forEach` without support for iteratee shorthands.\n *\n * @private\n * @param {Array|Object} collection The collection to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array|Object} Returns `collection`.\n */\nvar baseEach = createBaseEach(baseForOwn);\n\nmodule.exports = baseEach;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseEach.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseFlatten.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseFlatten.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayPush = __webpack_require__(/*! ./_arrayPush */ \"./node_modules/lodash/_arrayPush.js\"),\n    isFlattenable = __webpack_require__(/*! ./_isFlattenable */ \"./node_modules/lodash/_isFlattenable.js\");\n\n/**\n * The base implementation of `_.flatten` with support for restricting flattening.\n *\n * @private\n * @param {Array} array The array to flatten.\n * @param {number} depth The maximum recursion depth.\n * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.\n * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.\n * @param {Array} [result=[]] The initial result value.\n * @returns {Array} Returns the new flattened array.\n */\nfunction baseFlatten(array, depth, predicate, isStrict, result) {\n  var index = -1,\n      length = array.length;\n\n  predicate || (predicate = isFlattenable);\n  result || (result = []);\n\n  while (++index < length) {\n    var value = array[index];\n    if (depth > 0 && predicate(value)) {\n      if (depth > 1) {\n        // Recursively flatten arrays (susceptible to call stack limits).\n        baseFlatten(value, depth - 1, predicate, isStrict, result);\n      } else {\n        arrayPush(result, value);\n      }\n    } else if (!isStrict) {\n      result[result.length] = value;\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseFlatten;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseFlatten.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseFor.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ \"./node_modules/lodash/_createBaseFor.js\");\n\n/**\n * The base implementation of `baseForOwn` which iterates over `object`\n * properties returned by `keysFunc` and invokes `iteratee` for each property.\n * Iteratee functions may exit iteration early by explicitly returning `false`.\n *\n * @private\n * @param {Object} object The object to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @param {Function} keysFunc The function to get the keys of `object`.\n * @returns {Object} Returns `object`.\n */\nvar baseFor = createBaseFor();\n\nmodule.exports = baseFor;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseFor.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseForOwn.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseForOwn.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseFor = __webpack_require__(/*! ./_baseFor */ \"./node_modules/lodash/_baseFor.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * The base implementation of `_.forOwn` without support for iteratee shorthands.\n *\n * @private\n * @param {Object} object The object to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Object} Returns `object`.\n */\nfunction baseForOwn(object, iteratee) {\n  return object && baseFor(object, iteratee, keys);\n}\n\nmodule.exports = baseForOwn;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseForOwn.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * The base implementation of `_.get` without support for default values.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Array|string} path The path of the property to get.\n * @returns {*} Returns the resolved value.\n */\nfunction baseGet(object, path) {\n  path = castPath(path, object);\n\n  var index = 0,\n      length = path.length;\n\n  while (object != null && index < length) {\n    object = object[toKey(path[index++])];\n  }\n  return (index && index == length) ? object : undefined;\n}\n\nmodule.exports = baseGet;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetAllKeys.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_baseGetAllKeys.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayPush = __webpack_require__(/*! ./_arrayPush */ \"./node_modules/lodash/_arrayPush.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\");\n\n/**\n * The base implementation of `getAllKeys` and `getAllKeysIn` which uses\n * `keysFunc` and `symbolsFunc` to get the enumerable property names and\n * symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Function} keysFunc The function to get the keys of `object`.\n * @param {Function} symbolsFunc The function to get the symbols of `object`.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction baseGetAllKeys(object, keysFunc, symbolsFunc) {\n  var result = keysFunc(object);\n  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));\n}\n\nmodule.exports = baseGetAllKeys;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseGetAllKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    getRawTag = __webpack_require__(/*! ./_getRawTag */ \"./node_modules/lodash/_getRawTag.js\"),\n    objectToString = __webpack_require__(/*! ./_objectToString */ \"./node_modules/lodash/_objectToString.js\");\n\n/** `Object#toString` result references. */\nvar nullTag = '[object Null]',\n    undefinedTag = '[object Undefined]';\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * The base implementation of `getTag` without fallbacks for buggy environments.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nfunction baseGetTag(value) {\n  if (value == null) {\n    return value === undefined ? undefinedTag : nullTag;\n  }\n  return (symToStringTag && symToStringTag in Object(value))\n    ? getRawTag(value)\n    : objectToString(value);\n}\n\nmodule.exports = baseGetTag;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseGetTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseHasIn.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseHasIn.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.hasIn` without support for deep paths.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {Array|string} key The key to check.\n * @returns {boolean} Returns `true` if `key` exists, else `false`.\n */\nfunction baseHasIn(object, key) {\n  return object != null && key in Object(object);\n}\n\nmodule.exports = baseHasIn;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseHasIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsArguments.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]';\n\n/**\n * The base implementation of `_.isArguments`.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n */\nfunction baseIsArguments(value) {\n  return isObjectLike(value) && baseGetTag(value) == argsTag;\n}\n\nmodule.exports = baseIsArguments;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseIsArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsEqual.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsEqual.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsEqualDeep = __webpack_require__(/*! ./_baseIsEqualDeep */ \"./node_modules/lodash/_baseIsEqualDeep.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/**\n * The base implementation of `_.isEqual` which supports partial comparisons\n * and tracks traversed objects.\n *\n * @private\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @param {boolean} bitmask The bitmask flags.\n *  1 - Unordered comparison\n *  2 - Partial comparison\n * @param {Function} [customizer] The function to customize comparisons.\n * @param {Object} [stack] Tracks traversed `value` and `other` objects.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n */\nfunction baseIsEqual(value, other, bitmask, customizer, stack) {\n  if (value === other) {\n    return true;\n  }\n  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {\n    return value !== value && other !== other;\n  }\n  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);\n}\n\nmodule.exports = baseIsEqual;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseIsEqual.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsEqualDeep.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsEqualDeep.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stack = __webpack_require__(/*! ./_Stack */ \"./node_modules/lodash/_Stack.js\"),\n    equalArrays = __webpack_require__(/*! ./_equalArrays */ \"./node_modules/lodash/_equalArrays.js\"),\n    equalByTag = __webpack_require__(/*! ./_equalByTag */ \"./node_modules/lodash/_equalByTag.js\"),\n    equalObjects = __webpack_require__(/*! ./_equalObjects */ \"./node_modules/lodash/_equalObjects.js\"),\n    getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isTypedArray = __webpack_require__(/*! ./isTypedArray */ \"./node_modules/lodash/isTypedArray.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1;\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    objectTag = '[object Object]';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * A specialized version of `baseIsEqual` for arrays and objects which performs\n * deep comparisons and tracks traversed objects enabling objects with circular\n * references to be compared.\n *\n * @private\n * @param {Object} object The object to compare.\n * @param {Object} other The other object to compare.\n * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.\n * @param {Function} customizer The function to customize comparisons.\n * @param {Function} equalFunc The function to determine equivalents of values.\n * @param {Object} [stack] Tracks traversed `object` and `other` objects.\n * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.\n */\nfunction baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {\n  var objIsArr = isArray(object),\n      othIsArr = isArray(other),\n      objTag = objIsArr ? arrayTag : getTag(object),\n      othTag = othIsArr ? arrayTag : getTag(other);\n\n  objTag = objTag == argsTag ? objectTag : objTag;\n  othTag = othTag == argsTag ? objectTag : othTag;\n\n  var objIsObj = objTag == objectTag,\n      othIsObj = othTag == objectTag,\n      isSameTag = objTag == othTag;\n\n  if (isSameTag && isBuffer(object)) {\n    if (!isBuffer(other)) {\n      return false;\n    }\n    objIsArr = true;\n    objIsObj = false;\n  }\n  if (isSameTag && !objIsObj) {\n    stack || (stack = new Stack);\n    return (objIsArr || isTypedArray(object))\n      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)\n      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);\n  }\n  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {\n    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),\n        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');\n\n    if (objIsWrapped || othIsWrapped) {\n      var objUnwrapped = objIsWrapped ? object.value() : object,\n          othUnwrapped = othIsWrapped ? other.value() : other;\n\n      stack || (stack = new Stack);\n      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);\n    }\n  }\n  if (!isSameTag) {\n    return false;\n  }\n  stack || (stack = new Stack);\n  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);\n}\n\nmodule.exports = baseIsEqualDeep;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseIsEqualDeep.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsMatch.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsMatch.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stack = __webpack_require__(/*! ./_Stack */ \"./node_modules/lodash/_Stack.js\"),\n    baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ \"./node_modules/lodash/_baseIsEqual.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1,\n    COMPARE_UNORDERED_FLAG = 2;\n\n/**\n * The base implementation of `_.isMatch` without support for iteratee shorthands.\n *\n * @private\n * @param {Object} object The object to inspect.\n * @param {Object} source The object of property values to match.\n * @param {Array} matchData The property names, values, and compare flags to match.\n * @param {Function} [customizer] The function to customize comparisons.\n * @returns {boolean} Returns `true` if `object` is a match, else `false`.\n */\nfunction baseIsMatch(object, source, matchData, customizer) {\n  var index = matchData.length,\n      length = index,\n      noCustomizer = !customizer;\n\n  if (object == null) {\n    return !length;\n  }\n  object = Object(object);\n  while (index--) {\n    var data = matchData[index];\n    if ((noCustomizer && data[2])\n          ? data[1] !== object[data[0]]\n          : !(data[0] in object)\n        ) {\n      return false;\n    }\n  }\n  while (++index < length) {\n    data = matchData[index];\n    var key = data[0],\n        objValue = object[key],\n        srcValue = data[1];\n\n    if (noCustomizer && data[2]) {\n      if (objValue === undefined && !(key in object)) {\n        return false;\n      }\n    } else {\n      var stack = new Stack;\n      if (customizer) {\n        var result = customizer(objValue, srcValue, key, object, source, stack);\n      }\n      if (!(result === undefined\n            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)\n            : result\n          )) {\n        return false;\n      }\n    }\n  }\n  return true;\n}\n\nmodule.exports = baseIsMatch;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseIsMatch.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsNative.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isMasked = __webpack_require__(/*! ./_isMasked */ \"./node_modules/lodash/_isMasked.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    toSource = __webpack_require__(/*! ./_toSource */ \"./node_modules/lodash/_toSource.js\");\n\n/**\n * Used to match `RegExp`\n * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).\n */\nvar reRegExpChar = /[\\\\^$.*+?()[\\]{}|]/g;\n\n/** Used to detect host constructors (Safari). */\nvar reIsHostCtor = /^\\[object .+?Constructor\\]$/;\n\n/** Used for built-in method references. */\nvar funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Used to detect if a method is native. */\nvar reIsNative = RegExp('^' +\n  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\\\$&')\n  .replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g, '$1.*?') + '$'\n);\n\n/**\n * The base implementation of `_.isNative` without bad shim checks.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a native function,\n *  else `false`.\n */\nfunction baseIsNative(value) {\n  if (!isObject(value) || isMasked(value)) {\n    return false;\n  }\n  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;\n  return pattern.test(toSource(value));\n}\n\nmodule.exports = baseIsNative;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseIsNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    errorTag = '[object Error]',\n    funcTag = '[object Function]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    objectTag = '[object Object]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    weakMapTag = '[object WeakMap]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/** Used to identify `toStringTag` values of typed arrays. */\nvar typedArrayTags = {};\ntypedArrayTags[float32Tag] = typedArrayTags[float64Tag] =\ntypedArrayTags[int8Tag] = typedArrayTags[int16Tag] =\ntypedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =\ntypedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =\ntypedArrayTags[uint32Tag] = true;\ntypedArrayTags[argsTag] = typedArrayTags[arrayTag] =\ntypedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =\ntypedArrayTags[dataViewTag] = typedArrayTags[dateTag] =\ntypedArrayTags[errorTag] = typedArrayTags[funcTag] =\ntypedArrayTags[mapTag] = typedArrayTags[numberTag] =\ntypedArrayTags[objectTag] = typedArrayTags[regexpTag] =\ntypedArrayTags[setTag] = typedArrayTags[stringTag] =\ntypedArrayTags[weakMapTag] = false;\n\n/**\n * The base implementation of `_.isTypedArray` without Node.js optimizations.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.\n */\nfunction baseIsTypedArray(value) {\n  return isObjectLike(value) &&\n    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];\n}\n\nmodule.exports = baseIsTypedArray;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseIsTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIteratee.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIteratee.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseMatches = __webpack_require__(/*! ./_baseMatches */ \"./node_modules/lodash/_baseMatches.js\"),\n    baseMatchesProperty = __webpack_require__(/*! ./_baseMatchesProperty */ \"./node_modules/lodash/_baseMatchesProperty.js\"),\n    identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    property = __webpack_require__(/*! ./property */ \"./node_modules/lodash/property.js\");\n\n/**\n * The base implementation of `_.iteratee`.\n *\n * @private\n * @param {*} [value=_.identity] The value to convert to an iteratee.\n * @returns {Function} Returns the iteratee.\n */\nfunction baseIteratee(value) {\n  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.\n  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.\n  if (typeof value == 'function') {\n    return value;\n  }\n  if (value == null) {\n    return identity;\n  }\n  if (typeof value == 'object') {\n    return isArray(value)\n      ? baseMatchesProperty(value[0], value[1])\n      : baseMatches(value);\n  }\n  return property(value);\n}\n\nmodule.exports = baseIteratee;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseIteratee.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseKeys.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isPrototype = __webpack_require__(/*! ./_isPrototype */ \"./node_modules/lodash/_isPrototype.js\"),\n    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ \"./node_modules/lodash/_nativeKeys.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n */\nfunction baseKeys(object) {\n  if (!isPrototype(object)) {\n    return nativeKeys(object);\n  }\n  var result = [];\n  for (var key in Object(object)) {\n    if (hasOwnProperty.call(object, key) && key != 'constructor') {\n      result.push(key);\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseKeys;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseLodash.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseLodash.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The function whose prototype chain sequence wrappers inherit from.\n *\n * @private\n */\nfunction baseLodash() {\n  // No operation performed.\n}\n\nmodule.exports = baseLodash;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseLodash.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseMatches.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseMatches.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsMatch = __webpack_require__(/*! ./_baseIsMatch */ \"./node_modules/lodash/_baseIsMatch.js\"),\n    getMatchData = __webpack_require__(/*! ./_getMatchData */ \"./node_modules/lodash/_getMatchData.js\"),\n    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ \"./node_modules/lodash/_matchesStrictComparable.js\");\n\n/**\n * The base implementation of `_.matches` which doesn't clone `source`.\n *\n * @private\n * @param {Object} source The object of property values to match.\n * @returns {Function} Returns the new spec function.\n */\nfunction baseMatches(source) {\n  var matchData = getMatchData(source);\n  if (matchData.length == 1 && matchData[0][2]) {\n    return matchesStrictComparable(matchData[0][0], matchData[0][1]);\n  }\n  return function(object) {\n    return object === source || baseIsMatch(object, source, matchData);\n  };\n}\n\nmodule.exports = baseMatches;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseMatches.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseMatchesProperty.js":
/*!*****************************************************!*\
  !*** ./node_modules/lodash/_baseMatchesProperty.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ \"./node_modules/lodash/_baseIsEqual.js\"),\n    get = __webpack_require__(/*! ./get */ \"./node_modules/lodash/get.js\"),\n    hasIn = __webpack_require__(/*! ./hasIn */ \"./node_modules/lodash/hasIn.js\"),\n    isKey = __webpack_require__(/*! ./_isKey */ \"./node_modules/lodash/_isKey.js\"),\n    isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ \"./node_modules/lodash/_isStrictComparable.js\"),\n    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ \"./node_modules/lodash/_matchesStrictComparable.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1,\n    COMPARE_UNORDERED_FLAG = 2;\n\n/**\n * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.\n *\n * @private\n * @param {string} path The path of the property to get.\n * @param {*} srcValue The value to match.\n * @returns {Function} Returns the new spec function.\n */\nfunction baseMatchesProperty(path, srcValue) {\n  if (isKey(path) && isStrictComparable(srcValue)) {\n    return matchesStrictComparable(toKey(path), srcValue);\n  }\n  return function(object) {\n    var objValue = get(object, path);\n    return (objValue === undefined && objValue === srcValue)\n      ? hasIn(object, path)\n      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);\n  };\n}\n\nmodule.exports = baseMatchesProperty;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseMatchesProperty.js?");

/***/ }),

/***/ "./node_modules/lodash/_basePick.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_basePick.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var basePickBy = __webpack_require__(/*! ./_basePickBy */ \"./node_modules/lodash/_basePickBy.js\"),\n    hasIn = __webpack_require__(/*! ./hasIn */ \"./node_modules/lodash/hasIn.js\");\n\n/**\n * The base implementation of `_.pick` without support for individual\n * property identifiers.\n *\n * @private\n * @param {Object} object The source object.\n * @param {string[]} paths The property paths to pick.\n * @returns {Object} Returns the new object.\n */\nfunction basePick(object, paths) {\n  return basePickBy(object, paths, function(value, path) {\n    return hasIn(object, path);\n  });\n}\n\nmodule.exports = basePick;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_basePick.js?");

/***/ }),

/***/ "./node_modules/lodash/_basePickBy.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_basePickBy.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGet = __webpack_require__(/*! ./_baseGet */ \"./node_modules/lodash/_baseGet.js\"),\n    baseSet = __webpack_require__(/*! ./_baseSet */ \"./node_modules/lodash/_baseSet.js\"),\n    castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\");\n\n/**\n * The base implementation of  `_.pickBy` without support for iteratee shorthands.\n *\n * @private\n * @param {Object} object The source object.\n * @param {string[]} paths The property paths to pick.\n * @param {Function} predicate The function invoked per property.\n * @returns {Object} Returns the new object.\n */\nfunction basePickBy(object, paths, predicate) {\n  var index = -1,\n      length = paths.length,\n      result = {};\n\n  while (++index < length) {\n    var path = paths[index],\n        value = baseGet(object, path);\n\n    if (predicate(value, path)) {\n      baseSet(result, castPath(path, object), value);\n    }\n  }\n  return result;\n}\n\nmodule.exports = basePickBy;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_basePickBy.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseProperty.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseProperty.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.property` without support for deep paths.\n *\n * @private\n * @param {string} key The key of the property to get.\n * @returns {Function} Returns the new accessor function.\n */\nfunction baseProperty(key) {\n  return function(object) {\n    return object == null ? undefined : object[key];\n  };\n}\n\nmodule.exports = baseProperty;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseProperty.js?");

/***/ }),

/***/ "./node_modules/lodash/_basePropertyDeep.js":
/*!**************************************************!*\
  !*** ./node_modules/lodash/_basePropertyDeep.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGet = __webpack_require__(/*! ./_baseGet */ \"./node_modules/lodash/_baseGet.js\");\n\n/**\n * A specialized version of `baseProperty` which supports deep paths.\n *\n * @private\n * @param {Array|string} path The path of the property to get.\n * @returns {Function} Returns the new accessor function.\n */\nfunction basePropertyDeep(path) {\n  return function(object) {\n    return baseGet(object, path);\n  };\n}\n\nmodule.exports = basePropertyDeep;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_basePropertyDeep.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseSet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assignValue = __webpack_require__(/*! ./_assignValue */ \"./node_modules/lodash/_assignValue.js\"),\n    castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * The base implementation of `_.set`.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {Array|string} path The path of the property to set.\n * @param {*} value The value to set.\n * @param {Function} [customizer] The function to customize path creation.\n * @returns {Object} Returns `object`.\n */\nfunction baseSet(object, path, value, customizer) {\n  if (!isObject(object)) {\n    return object;\n  }\n  path = castPath(path, object);\n\n  var index = -1,\n      length = path.length,\n      lastIndex = length - 1,\n      nested = object;\n\n  while (nested != null && ++index < length) {\n    var key = toKey(path[index]),\n        newValue = value;\n\n    if (index != lastIndex) {\n      var objValue = nested[key];\n      newValue = customizer ? customizer(objValue, key, nested) : undefined;\n      if (newValue === undefined) {\n        newValue = isObject(objValue)\n          ? objValue\n          : (isIndex(path[index + 1]) ? [] : {});\n      }\n    }\n    assignValue(nested, key, newValue);\n    nested = nested[key];\n  }\n  return object;\n}\n\nmodule.exports = baseSet;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseSetToString.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var constant = __webpack_require__(/*! ./constant */ \"./node_modules/lodash/constant.js\"),\n    defineProperty = __webpack_require__(/*! ./_defineProperty */ \"./node_modules/lodash/_defineProperty.js\"),\n    identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\");\n\n/**\n * The base implementation of `setToString` without support for hot loop shorting.\n *\n * @private\n * @param {Function} func The function to modify.\n * @param {Function} string The `toString` result.\n * @returns {Function} Returns `func`.\n */\nvar baseSetToString = !defineProperty ? identity : function(func, string) {\n  return defineProperty(func, 'toString', {\n    'configurable': true,\n    'enumerable': false,\n    'value': constant(string),\n    'writable': true\n  });\n};\n\nmodule.exports = baseSetToString;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseSetToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseSome.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseSome.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseEach = __webpack_require__(/*! ./_baseEach */ \"./node_modules/lodash/_baseEach.js\");\n\n/**\n * The base implementation of `_.some` without support for iteratee shorthands.\n *\n * @private\n * @param {Array|Object} collection The collection to iterate over.\n * @param {Function} predicate The function invoked per iteration.\n * @returns {boolean} Returns `true` if any element passes the predicate check,\n *  else `false`.\n */\nfunction baseSome(collection, predicate) {\n  var result;\n\n  baseEach(collection, function(value, index, collection) {\n    result = predicate(value, index, collection);\n    return !result;\n  });\n  return !!result;\n}\n\nmodule.exports = baseSome;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseSome.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseTimes.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.times` without support for iteratee shorthands\n * or max array length checks.\n *\n * @private\n * @param {number} n The number of times to invoke `iteratee`.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns the array of results.\n */\nfunction baseTimes(n, iteratee) {\n  var index = -1,\n      result = Array(n);\n\n  while (++index < n) {\n    result[index] = iteratee(index);\n  }\n  return result;\n}\n\nmodule.exports = baseTimes;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseTimes.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseToString.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseToString.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    arrayMap = __webpack_require__(/*! ./_arrayMap */ \"./node_modules/lodash/_arrayMap.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/** Used to convert symbols to primitives and strings. */\nvar symbolProto = Symbol ? Symbol.prototype : undefined,\n    symbolToString = symbolProto ? symbolProto.toString : undefined;\n\n/**\n * The base implementation of `_.toString` which doesn't convert nullish\n * values to empty strings.\n *\n * @private\n * @param {*} value The value to process.\n * @returns {string} Returns the string.\n */\nfunction baseToString(value) {\n  // Exit early for strings to avoid a performance hit in some environments.\n  if (typeof value == 'string') {\n    return value;\n  }\n  if (isArray(value)) {\n    // Recursively convert values (susceptible to call stack limits).\n    return arrayMap(value, baseToString) + '';\n  }\n  if (isSymbol(value)) {\n    return symbolToString ? symbolToString.call(value) : '';\n  }\n  var result = (value + '');\n  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;\n}\n\nmodule.exports = baseToString;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseUnary.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.unary` without support for storing metadata.\n *\n * @private\n * @param {Function} func The function to cap arguments for.\n * @returns {Function} Returns the new capped function.\n */\nfunction baseUnary(func) {\n  return function(value) {\n    return func(value);\n  };\n}\n\nmodule.exports = baseUnary;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_baseUnary.js?");

/***/ }),

/***/ "./node_modules/lodash/_cacheHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_cacheHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if a `cache` value for `key` exists.\n *\n * @private\n * @param {Object} cache The cache to query.\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction cacheHas(cache, key) {\n  return cache.has(key);\n}\n\nmodule.exports = cacheHas;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_cacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_castPath.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_castPath.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isKey = __webpack_require__(/*! ./_isKey */ \"./node_modules/lodash/_isKey.js\"),\n    stringToPath = __webpack_require__(/*! ./_stringToPath */ \"./node_modules/lodash/_stringToPath.js\"),\n    toString = __webpack_require__(/*! ./toString */ \"./node_modules/lodash/toString.js\");\n\n/**\n * Casts `value` to a path array if it's not one.\n *\n * @private\n * @param {*} value The value to inspect.\n * @param {Object} [object] The object to query keys on.\n * @returns {Array} Returns the cast property path array.\n */\nfunction castPath(value, object) {\n  if (isArray(value)) {\n    return value;\n  }\n  return isKey(value, object) ? [value] : stringToPath(toString(value));\n}\n\nmodule.exports = castPath;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_castPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_copyArray.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Copies the values of `source` to `array`.\n *\n * @private\n * @param {Array} source The array to copy values from.\n * @param {Array} [array=[]] The array to copy values to.\n * @returns {Array} Returns `array`.\n */\nfunction copyArray(source, array) {\n  var index = -1,\n      length = source.length;\n\n  array || (array = Array(length));\n  while (++index < length) {\n    array[index] = source[index];\n  }\n  return array;\n}\n\nmodule.exports = copyArray;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_copyArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_coreJsData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/** Used to detect overreaching core-js shims. */\nvar coreJsData = root['__core-js_shared__'];\n\nmodule.exports = coreJsData;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_coreJsData.js?");

/***/ }),

/***/ "./node_modules/lodash/_createBaseEach.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_createBaseEach.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\");\n\n/**\n * Creates a `baseEach` or `baseEachRight` function.\n *\n * @private\n * @param {Function} eachFunc The function to iterate over a collection.\n * @param {boolean} [fromRight] Specify iterating from right to left.\n * @returns {Function} Returns the new base function.\n */\nfunction createBaseEach(eachFunc, fromRight) {\n  return function(collection, iteratee) {\n    if (collection == null) {\n      return collection;\n    }\n    if (!isArrayLike(collection)) {\n      return eachFunc(collection, iteratee);\n    }\n    var length = collection.length,\n        index = fromRight ? length : -1,\n        iterable = Object(collection);\n\n    while ((fromRight ? index-- : ++index < length)) {\n      if (iteratee(iterable[index], index, iterable) === false) {\n        break;\n      }\n    }\n    return collection;\n  };\n}\n\nmodule.exports = createBaseEach;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_createBaseEach.js?");

/***/ }),

/***/ "./node_modules/lodash/_createBaseFor.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a base function for methods like `_.forIn` and `_.forOwn`.\n *\n * @private\n * @param {boolean} [fromRight] Specify iterating from right to left.\n * @returns {Function} Returns the new base function.\n */\nfunction createBaseFor(fromRight) {\n  return function(object, iteratee, keysFunc) {\n    var index = -1,\n        iterable = Object(object),\n        props = keysFunc(object),\n        length = props.length;\n\n    while (length--) {\n      var key = props[fromRight ? length : ++index];\n      if (iteratee(iterable[key], key, iterable) === false) {\n        break;\n      }\n    }\n    return object;\n  };\n}\n\nmodule.exports = createBaseFor;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_createBaseFor.js?");

/***/ }),

/***/ "./node_modules/lodash/_createFlow.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_createFlow.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var LodashWrapper = __webpack_require__(/*! ./_LodashWrapper */ \"./node_modules/lodash/_LodashWrapper.js\"),\n    flatRest = __webpack_require__(/*! ./_flatRest */ \"./node_modules/lodash/_flatRest.js\"),\n    getData = __webpack_require__(/*! ./_getData */ \"./node_modules/lodash/_getData.js\"),\n    getFuncName = __webpack_require__(/*! ./_getFuncName */ \"./node_modules/lodash/_getFuncName.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isLaziable = __webpack_require__(/*! ./_isLaziable */ \"./node_modules/lodash/_isLaziable.js\");\n\n/** Error message constants. */\nvar FUNC_ERROR_TEXT = 'Expected a function';\n\n/** Used to compose bitmasks for function metadata. */\nvar WRAP_CURRY_FLAG = 8,\n    WRAP_PARTIAL_FLAG = 32,\n    WRAP_ARY_FLAG = 128,\n    WRAP_REARG_FLAG = 256;\n\n/**\n * Creates a `_.flow` or `_.flowRight` function.\n *\n * @private\n * @param {boolean} [fromRight] Specify iterating from right to left.\n * @returns {Function} Returns the new flow function.\n */\nfunction createFlow(fromRight) {\n  return flatRest(function(funcs) {\n    var length = funcs.length,\n        index = length,\n        prereq = LodashWrapper.prototype.thru;\n\n    if (fromRight) {\n      funcs.reverse();\n    }\n    while (index--) {\n      var func = funcs[index];\n      if (typeof func != 'function') {\n        throw new TypeError(FUNC_ERROR_TEXT);\n      }\n      if (prereq && !wrapper && getFuncName(func) == 'wrapper') {\n        var wrapper = new LodashWrapper([], true);\n      }\n    }\n    index = wrapper ? index : length;\n    while (++index < length) {\n      func = funcs[index];\n\n      var funcName = getFuncName(func),\n          data = funcName == 'wrapper' ? getData(func) : undefined;\n\n      if (data && isLaziable(data[0]) &&\n            data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&\n            !data[4].length && data[9] == 1\n          ) {\n        wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);\n      } else {\n        wrapper = (func.length == 1 && isLaziable(func))\n          ? wrapper[funcName]()\n          : wrapper.thru(func);\n      }\n    }\n    return function() {\n      var args = arguments,\n          value = args[0];\n\n      if (wrapper && args.length == 1 && isArray(value)) {\n        return wrapper.plant(value).value();\n      }\n      var index = 0,\n          result = length ? funcs[index].apply(this, args) : value;\n\n      while (++index < length) {\n        result = funcs[index].call(this, result);\n      }\n      return result;\n    };\n  });\n}\n\nmodule.exports = createFlow;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_createFlow.js?");

/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_defineProperty.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\nvar defineProperty = (function() {\n  try {\n    var func = getNative(Object, 'defineProperty');\n    func({}, '', {});\n    return func;\n  } catch (e) {}\n}());\n\nmodule.exports = defineProperty;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_defineProperty.js?");

/***/ }),

/***/ "./node_modules/lodash/_equalArrays.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_equalArrays.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var SetCache = __webpack_require__(/*! ./_SetCache */ \"./node_modules/lodash/_SetCache.js\"),\n    arraySome = __webpack_require__(/*! ./_arraySome */ \"./node_modules/lodash/_arraySome.js\"),\n    cacheHas = __webpack_require__(/*! ./_cacheHas */ \"./node_modules/lodash/_cacheHas.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1,\n    COMPARE_UNORDERED_FLAG = 2;\n\n/**\n * A specialized version of `baseIsEqualDeep` for arrays with support for\n * partial deep comparisons.\n *\n * @private\n * @param {Array} array The array to compare.\n * @param {Array} other The other array to compare.\n * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.\n * @param {Function} customizer The function to customize comparisons.\n * @param {Function} equalFunc The function to determine equivalents of values.\n * @param {Object} stack Tracks traversed `array` and `other` objects.\n * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.\n */\nfunction equalArrays(array, other, bitmask, customizer, equalFunc, stack) {\n  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,\n      arrLength = array.length,\n      othLength = other.length;\n\n  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {\n    return false;\n  }\n  // Assume cyclic values are equal.\n  var stacked = stack.get(array);\n  if (stacked && stack.get(other)) {\n    return stacked == other;\n  }\n  var index = -1,\n      result = true,\n      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;\n\n  stack.set(array, other);\n  stack.set(other, array);\n\n  // Ignore non-index properties.\n  while (++index < arrLength) {\n    var arrValue = array[index],\n        othValue = other[index];\n\n    if (customizer) {\n      var compared = isPartial\n        ? customizer(othValue, arrValue, index, other, array, stack)\n        : customizer(arrValue, othValue, index, array, other, stack);\n    }\n    if (compared !== undefined) {\n      if (compared) {\n        continue;\n      }\n      result = false;\n      break;\n    }\n    // Recursively compare arrays (susceptible to call stack limits).\n    if (seen) {\n      if (!arraySome(other, function(othValue, othIndex) {\n            if (!cacheHas(seen, othIndex) &&\n                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {\n              return seen.push(othIndex);\n            }\n          })) {\n        result = false;\n        break;\n      }\n    } else if (!(\n          arrValue === othValue ||\n            equalFunc(arrValue, othValue, bitmask, customizer, stack)\n        )) {\n      result = false;\n      break;\n    }\n  }\n  stack['delete'](array);\n  stack['delete'](other);\n  return result;\n}\n\nmodule.exports = equalArrays;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_equalArrays.js?");

/***/ }),

/***/ "./node_modules/lodash/_equalByTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_equalByTag.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    Uint8Array = __webpack_require__(/*! ./_Uint8Array */ \"./node_modules/lodash/_Uint8Array.js\"),\n    eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\"),\n    equalArrays = __webpack_require__(/*! ./_equalArrays */ \"./node_modules/lodash/_equalArrays.js\"),\n    mapToArray = __webpack_require__(/*! ./_mapToArray */ \"./node_modules/lodash/_mapToArray.js\"),\n    setToArray = __webpack_require__(/*! ./_setToArray */ \"./node_modules/lodash/_setToArray.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1,\n    COMPARE_UNORDERED_FLAG = 2;\n\n/** `Object#toString` result references. */\nvar boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    errorTag = '[object Error]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    symbolTag = '[object Symbol]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]';\n\n/** Used to convert symbols to primitives and strings. */\nvar symbolProto = Symbol ? Symbol.prototype : undefined,\n    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;\n\n/**\n * A specialized version of `baseIsEqualDeep` for comparing objects of\n * the same `toStringTag`.\n *\n * **Note:** This function only supports comparing values with tags of\n * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.\n *\n * @private\n * @param {Object} object The object to compare.\n * @param {Object} other The other object to compare.\n * @param {string} tag The `toStringTag` of the objects to compare.\n * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.\n * @param {Function} customizer The function to customize comparisons.\n * @param {Function} equalFunc The function to determine equivalents of values.\n * @param {Object} stack Tracks traversed `object` and `other` objects.\n * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.\n */\nfunction equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {\n  switch (tag) {\n    case dataViewTag:\n      if ((object.byteLength != other.byteLength) ||\n          (object.byteOffset != other.byteOffset)) {\n        return false;\n      }\n      object = object.buffer;\n      other = other.buffer;\n\n    case arrayBufferTag:\n      if ((object.byteLength != other.byteLength) ||\n          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {\n        return false;\n      }\n      return true;\n\n    case boolTag:\n    case dateTag:\n    case numberTag:\n      // Coerce booleans to `1` or `0` and dates to milliseconds.\n      // Invalid dates are coerced to `NaN`.\n      return eq(+object, +other);\n\n    case errorTag:\n      return object.name == other.name && object.message == other.message;\n\n    case regexpTag:\n    case stringTag:\n      // Coerce regexes to strings and treat strings, primitives and objects,\n      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring\n      // for more details.\n      return object == (other + '');\n\n    case mapTag:\n      var convert = mapToArray;\n\n    case setTag:\n      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;\n      convert || (convert = setToArray);\n\n      if (object.size != other.size && !isPartial) {\n        return false;\n      }\n      // Assume cyclic values are equal.\n      var stacked = stack.get(object);\n      if (stacked) {\n        return stacked == other;\n      }\n      bitmask |= COMPARE_UNORDERED_FLAG;\n\n      // Recursively compare objects (susceptible to call stack limits).\n      stack.set(object, other);\n      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);\n      stack['delete'](object);\n      return result;\n\n    case symbolTag:\n      if (symbolValueOf) {\n        return symbolValueOf.call(object) == symbolValueOf.call(other);\n      }\n  }\n  return false;\n}\n\nmodule.exports = equalByTag;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_equalByTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_equalObjects.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_equalObjects.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getAllKeys = __webpack_require__(/*! ./_getAllKeys */ \"./node_modules/lodash/_getAllKeys.js\");\n\n/** Used to compose bitmasks for value comparisons. */\nvar COMPARE_PARTIAL_FLAG = 1;\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * A specialized version of `baseIsEqualDeep` for objects with support for\n * partial deep comparisons.\n *\n * @private\n * @param {Object} object The object to compare.\n * @param {Object} other The other object to compare.\n * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.\n * @param {Function} customizer The function to customize comparisons.\n * @param {Function} equalFunc The function to determine equivalents of values.\n * @param {Object} stack Tracks traversed `object` and `other` objects.\n * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.\n */\nfunction equalObjects(object, other, bitmask, customizer, equalFunc, stack) {\n  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,\n      objProps = getAllKeys(object),\n      objLength = objProps.length,\n      othProps = getAllKeys(other),\n      othLength = othProps.length;\n\n  if (objLength != othLength && !isPartial) {\n    return false;\n  }\n  var index = objLength;\n  while (index--) {\n    var key = objProps[index];\n    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {\n      return false;\n    }\n  }\n  // Assume cyclic values are equal.\n  var stacked = stack.get(object);\n  if (stacked && stack.get(other)) {\n    return stacked == other;\n  }\n  var result = true;\n  stack.set(object, other);\n  stack.set(other, object);\n\n  var skipCtor = isPartial;\n  while (++index < objLength) {\n    key = objProps[index];\n    var objValue = object[key],\n        othValue = other[key];\n\n    if (customizer) {\n      var compared = isPartial\n        ? customizer(othValue, objValue, key, other, object, stack)\n        : customizer(objValue, othValue, key, object, other, stack);\n    }\n    // Recursively compare objects (susceptible to call stack limits).\n    if (!(compared === undefined\n          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))\n          : compared\n        )) {\n      result = false;\n      break;\n    }\n    skipCtor || (skipCtor = key == 'constructor');\n  }\n  if (result && !skipCtor) {\n    var objCtor = object.constructor,\n        othCtor = other.constructor;\n\n    // Non `Object` object instances with different constructors are not equal.\n    if (objCtor != othCtor &&\n        ('constructor' in object && 'constructor' in other) &&\n        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&\n          typeof othCtor == 'function' && othCtor instanceof othCtor)) {\n      result = false;\n    }\n  }\n  stack['delete'](object);\n  stack['delete'](other);\n  return result;\n}\n\nmodule.exports = equalObjects;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_equalObjects.js?");

/***/ }),

/***/ "./node_modules/lodash/_flatRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_flatRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var flatten = __webpack_require__(/*! ./flatten */ \"./node_modules/lodash/flatten.js\"),\n    overRest = __webpack_require__(/*! ./_overRest */ \"./node_modules/lodash/_overRest.js\"),\n    setToString = __webpack_require__(/*! ./_setToString */ \"./node_modules/lodash/_setToString.js\");\n\n/**\n * A specialized version of `baseRest` which flattens the rest array.\n *\n * @private\n * @param {Function} func The function to apply a rest parameter to.\n * @returns {Function} Returns the new function.\n */\nfunction flatRest(func) {\n  return setToString(overRest(func, undefined, flatten), func + '');\n}\n\nmodule.exports = flatRest;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_flatRest.js?");

/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */\nvar freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n\nmodule.exports = freeGlobal;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_freeGlobal.js?");

/***/ }),

/***/ "./node_modules/lodash/_getAllKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getAllKeys.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ \"./node_modules/lodash/_baseGetAllKeys.js\"),\n    getSymbols = __webpack_require__(/*! ./_getSymbols */ \"./node_modules/lodash/_getSymbols.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * Creates an array of own enumerable property names and symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction getAllKeys(object) {\n  return baseGetAllKeys(object, keys, getSymbols);\n}\n\nmodule.exports = getAllKeys;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_getAllKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_getData.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_getData.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var metaMap = __webpack_require__(/*! ./_metaMap */ \"./node_modules/lodash/_metaMap.js\"),\n    noop = __webpack_require__(/*! ./noop */ \"./node_modules/lodash/noop.js\");\n\n/**\n * Gets metadata for `func`.\n *\n * @private\n * @param {Function} func The function to query.\n * @returns {*} Returns the metadata for `func`.\n */\nvar getData = !metaMap ? noop : function(func) {\n  return metaMap.get(func);\n};\n\nmodule.exports = getData;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_getData.js?");

/***/ }),

/***/ "./node_modules/lodash/_getFuncName.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_getFuncName.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var realNames = __webpack_require__(/*! ./_realNames */ \"./node_modules/lodash/_realNames.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Gets the name of `func`.\n *\n * @private\n * @param {Function} func The function to query.\n * @returns {string} Returns the function name.\n */\nfunction getFuncName(func) {\n  var result = (func.name + ''),\n      array = realNames[result],\n      length = hasOwnProperty.call(realNames, result) ? array.length : 0;\n\n  while (length--) {\n    var data = array[length],\n        otherFunc = data.func;\n    if (otherFunc == null || otherFunc == func) {\n      return data.name;\n    }\n  }\n  return result;\n}\n\nmodule.exports = getFuncName;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_getFuncName.js?");

/***/ }),

/***/ "./node_modules/lodash/_getMapData.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isKeyable = __webpack_require__(/*! ./_isKeyable */ \"./node_modules/lodash/_isKeyable.js\");\n\n/**\n * Gets the data for `map`.\n *\n * @private\n * @param {Object} map The map to query.\n * @param {string} key The reference key.\n * @returns {*} Returns the map data.\n */\nfunction getMapData(map, key) {\n  var data = map.__data__;\n  return isKeyable(key)\n    ? data[typeof key == 'string' ? 'string' : 'hash']\n    : data.map;\n}\n\nmodule.exports = getMapData;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_getMapData.js?");

/***/ }),

/***/ "./node_modules/lodash/_getMatchData.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getMatchData.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ \"./node_modules/lodash/_isStrictComparable.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * Gets the property names, values, and compare flags of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the match data of `object`.\n */\nfunction getMatchData(object) {\n  var result = keys(object),\n      length = result.length;\n\n  while (length--) {\n    var key = result[length],\n        value = object[key];\n\n    result[length] = [key, value, isStrictComparable(value)];\n  }\n  return result;\n}\n\nmodule.exports = getMatchData;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_getMatchData.js?");

/***/ }),

/***/ "./node_modules/lodash/_getNative.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ \"./node_modules/lodash/_baseIsNative.js\"),\n    getValue = __webpack_require__(/*! ./_getValue */ \"./node_modules/lodash/_getValue.js\");\n\n/**\n * Gets the native function at `key` of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {string} key The key of the method to get.\n * @returns {*} Returns the function if it's native, else `undefined`.\n */\nfunction getNative(object, key) {\n  var value = getValue(object, key);\n  return baseIsNative(value) ? value : undefined;\n}\n\nmodule.exports = getNative;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_getNative.js?");

/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getPrototype.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var overArg = __webpack_require__(/*! ./_overArg */ \"./node_modules/lodash/_overArg.js\");\n\n/** Built-in value references. */\nvar getPrototype = overArg(Object.getPrototypeOf, Object);\n\nmodule.exports = getPrototype;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_getPrototype.js?");

/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the raw `toStringTag`.\n */\nfunction getRawTag(value) {\n  var isOwn = hasOwnProperty.call(value, symToStringTag),\n      tag = value[symToStringTag];\n\n  try {\n    value[symToStringTag] = undefined;\n    var unmasked = true;\n  } catch (e) {}\n\n  var result = nativeObjectToString.call(value);\n  if (unmasked) {\n    if (isOwn) {\n      value[symToStringTag] = tag;\n    } else {\n      delete value[symToStringTag];\n    }\n  }\n  return result;\n}\n\nmodule.exports = getRawTag;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_getRawTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_getSymbols.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_getSymbols.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ \"./node_modules/lodash/_arrayFilter.js\"),\n    stubArray = __webpack_require__(/*! ./stubArray */ \"./node_modules/lodash/stubArray.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Built-in value references. */\nvar propertyIsEnumerable = objectProto.propertyIsEnumerable;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeGetSymbols = Object.getOwnPropertySymbols;\n\n/**\n * Creates an array of the own enumerable symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of symbols.\n */\nvar getSymbols = !nativeGetSymbols ? stubArray : function(object) {\n  if (object == null) {\n    return [];\n  }\n  object = Object(object);\n  return arrayFilter(nativeGetSymbols(object), function(symbol) {\n    return propertyIsEnumerable.call(object, symbol);\n  });\n};\n\nmodule.exports = getSymbols;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_getSymbols.js?");

/***/ }),

/***/ "./node_modules/lodash/_getTag.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var DataView = __webpack_require__(/*! ./_DataView */ \"./node_modules/lodash/_DataView.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\"),\n    Promise = __webpack_require__(/*! ./_Promise */ \"./node_modules/lodash/_Promise.js\"),\n    Set = __webpack_require__(/*! ./_Set */ \"./node_modules/lodash/_Set.js\"),\n    WeakMap = __webpack_require__(/*! ./_WeakMap */ \"./node_modules/lodash/_WeakMap.js\"),\n    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    toSource = __webpack_require__(/*! ./_toSource */ \"./node_modules/lodash/_toSource.js\");\n\n/** `Object#toString` result references. */\nvar mapTag = '[object Map]',\n    objectTag = '[object Object]',\n    promiseTag = '[object Promise]',\n    setTag = '[object Set]',\n    weakMapTag = '[object WeakMap]';\n\nvar dataViewTag = '[object DataView]';\n\n/** Used to detect maps, sets, and weakmaps. */\nvar dataViewCtorString = toSource(DataView),\n    mapCtorString = toSource(Map),\n    promiseCtorString = toSource(Promise),\n    setCtorString = toSource(Set),\n    weakMapCtorString = toSource(WeakMap);\n\n/**\n * Gets the `toStringTag` of `value`.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nvar getTag = baseGetTag;\n\n// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.\nif ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||\n    (Map && getTag(new Map) != mapTag) ||\n    (Promise && getTag(Promise.resolve()) != promiseTag) ||\n    (Set && getTag(new Set) != setTag) ||\n    (WeakMap && getTag(new WeakMap) != weakMapTag)) {\n  getTag = function(value) {\n    var result = baseGetTag(value),\n        Ctor = result == objectTag ? value.constructor : undefined,\n        ctorString = Ctor ? toSource(Ctor) : '';\n\n    if (ctorString) {\n      switch (ctorString) {\n        case dataViewCtorString: return dataViewTag;\n        case mapCtorString: return mapTag;\n        case promiseCtorString: return promiseTag;\n        case setCtorString: return setTag;\n        case weakMapCtorString: return weakMapTag;\n      }\n    }\n    return result;\n  };\n}\n\nmodule.exports = getTag;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_getTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_getValue.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the value at `key` of `object`.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction getValue(object, key) {\n  return object == null ? undefined : object[key];\n}\n\nmodule.exports = getValue;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_getValue.js?");

/***/ }),

/***/ "./node_modules/lodash/_hasPath.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hasPath.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * Checks if `path` exists on `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Array|string} path The path to check.\n * @param {Function} hasFunc The function to check properties.\n * @returns {boolean} Returns `true` if `path` exists, else `false`.\n */\nfunction hasPath(object, path, hasFunc) {\n  path = castPath(path, object);\n\n  var index = -1,\n      length = path.length,\n      result = false;\n\n  while (++index < length) {\n    var key = toKey(path[index]);\n    if (!(result = object != null && hasFunc(object, key))) {\n      break;\n    }\n    object = object[key];\n  }\n  if (result || ++index != length) {\n    return result;\n  }\n  length = object == null ? 0 : object.length;\n  return !!length && isLength(length) && isIndex(key, length) &&\n    (isArray(object) || isArguments(object));\n}\n\nmodule.exports = hasPath;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_hasPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashClear.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/**\n * Removes all key-value entries from the hash.\n *\n * @private\n * @name clear\n * @memberOf Hash\n */\nfunction hashClear() {\n  this.__data__ = nativeCreate ? nativeCreate(null) : {};\n  this.size = 0;\n}\n\nmodule.exports = hashClear;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_hashClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashDelete.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes `key` and its value from the hash.\n *\n * @private\n * @name delete\n * @memberOf Hash\n * @param {Object} hash The hash to modify.\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction hashDelete(key) {\n  var result = this.has(key) && delete this.__data__[key];\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = hashDelete;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_hashDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashGet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Gets the hash value for `key`.\n *\n * @private\n * @name get\n * @memberOf Hash\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction hashGet(key) {\n  var data = this.__data__;\n  if (nativeCreate) {\n    var result = data[key];\n    return result === HASH_UNDEFINED ? undefined : result;\n  }\n  return hasOwnProperty.call(data, key) ? data[key] : undefined;\n}\n\nmodule.exports = hashGet;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_hashGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Checks if a hash value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Hash\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction hashHas(key) {\n  var data = this.__data__;\n  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);\n}\n\nmodule.exports = hashHas;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_hashHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_hashSet.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/**\n * Sets the hash `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Hash\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the hash instance.\n */\nfunction hashSet(key, value) {\n  var data = this.__data__;\n  this.size += this.has(key) ? 0 : 1;\n  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;\n  return this;\n}\n\nmodule.exports = hashSet;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_hashSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_isFlattenable.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_isFlattenable.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\"),\n    isArguments = __webpack_require__(/*! ./isArguments */ \"./node_modules/lodash/isArguments.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\");\n\n/** Built-in value references. */\nvar spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;\n\n/**\n * Checks if `value` is a flattenable `arguments` object or array.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.\n */\nfunction isFlattenable(value) {\n  return isArray(value) || isArguments(value) ||\n    !!(spreadableSymbol && value && value[spreadableSymbol]);\n}\n\nmodule.exports = isFlattenable;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_isFlattenable.js?");

/***/ }),

/***/ "./node_modules/lodash/_isIndex.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/** Used to detect unsigned integer values. */\nvar reIsUint = /^(?:0|[1-9]\\d*)$/;\n\n/**\n * Checks if `value` is a valid array-like index.\n *\n * @private\n * @param {*} value The value to check.\n * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.\n * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.\n */\nfunction isIndex(value, length) {\n  var type = typeof value;\n  length = length == null ? MAX_SAFE_INTEGER : length;\n\n  return !!length &&\n    (type == 'number' ||\n      (type != 'symbol' && reIsUint.test(value))) &&\n        (value > -1 && value % 1 == 0 && value < length);\n}\n\nmodule.exports = isIndex;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_isIndex.js?");

/***/ }),

/***/ "./node_modules/lodash/_isIterateeCall.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_isIterateeCall.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var eq = __webpack_require__(/*! ./eq */ \"./node_modules/lodash/eq.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\"),\n    isIndex = __webpack_require__(/*! ./_isIndex */ \"./node_modules/lodash/_isIndex.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/**\n * Checks if the given arguments are from an iteratee call.\n *\n * @private\n * @param {*} value The potential iteratee value argument.\n * @param {*} index The potential iteratee index or key argument.\n * @param {*} object The potential iteratee object argument.\n * @returns {boolean} Returns `true` if the arguments are from an iteratee call,\n *  else `false`.\n */\nfunction isIterateeCall(value, index, object) {\n  if (!isObject(object)) {\n    return false;\n  }\n  var type = typeof index;\n  if (type == 'number'\n        ? (isArrayLike(object) && isIndex(index, object.length))\n        : (type == 'string' && index in object)\n      ) {\n    return eq(object[index], value);\n  }\n  return false;\n}\n\nmodule.exports = isIterateeCall;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_isIterateeCall.js?");

/***/ }),

/***/ "./node_modules/lodash/_isKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_isKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used to match property names within property paths. */\nvar reIsDeepProp = /\\.|\\[(?:[^[\\]]*|([\"'])(?:(?!\\1)[^\\\\]|\\\\.)*?\\1)\\]/,\n    reIsPlainProp = /^\\w*$/;\n\n/**\n * Checks if `value` is a property name and not a property path.\n *\n * @private\n * @param {*} value The value to check.\n * @param {Object} [object] The object to query keys on.\n * @returns {boolean} Returns `true` if `value` is a property name, else `false`.\n */\nfunction isKey(value, object) {\n  if (isArray(value)) {\n    return false;\n  }\n  var type = typeof value;\n  if (type == 'number' || type == 'symbol' || type == 'boolean' ||\n      value == null || isSymbol(value)) {\n    return true;\n  }\n  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||\n    (object != null && value in Object(object));\n}\n\nmodule.exports = isKey;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_isKey.js?");

/***/ }),

/***/ "./node_modules/lodash/_isKeyable.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is suitable for use as unique object key.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is suitable, else `false`.\n */\nfunction isKeyable(value) {\n  var type = typeof value;\n  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')\n    ? (value !== '__proto__')\n    : (value === null);\n}\n\nmodule.exports = isKeyable;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_isKeyable.js?");

/***/ }),

/***/ "./node_modules/lodash/_isLaziable.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_isLaziable.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var LazyWrapper = __webpack_require__(/*! ./_LazyWrapper */ \"./node_modules/lodash/_LazyWrapper.js\"),\n    getData = __webpack_require__(/*! ./_getData */ \"./node_modules/lodash/_getData.js\"),\n    getFuncName = __webpack_require__(/*! ./_getFuncName */ \"./node_modules/lodash/_getFuncName.js\"),\n    lodash = __webpack_require__(/*! ./wrapperLodash */ \"./node_modules/lodash/wrapperLodash.js\");\n\n/**\n * Checks if `func` has a lazy counterpart.\n *\n * @private\n * @param {Function} func The function to check.\n * @returns {boolean} Returns `true` if `func` has a lazy counterpart,\n *  else `false`.\n */\nfunction isLaziable(func) {\n  var funcName = getFuncName(func),\n      other = lodash[funcName];\n\n  if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {\n    return false;\n  }\n  if (func === other) {\n    return true;\n  }\n  var data = getData(other);\n  return !!data && func === data[0];\n}\n\nmodule.exports = isLaziable;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_isLaziable.js?");

/***/ }),

/***/ "./node_modules/lodash/_isMasked.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var coreJsData = __webpack_require__(/*! ./_coreJsData */ \"./node_modules/lodash/_coreJsData.js\");\n\n/** Used to detect methods masquerading as native. */\nvar maskSrcKey = (function() {\n  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');\n  return uid ? ('Symbol(src)_1.' + uid) : '';\n}());\n\n/**\n * Checks if `func` has its source masked.\n *\n * @private\n * @param {Function} func The function to check.\n * @returns {boolean} Returns `true` if `func` is masked, else `false`.\n */\nfunction isMasked(func) {\n  return !!maskSrcKey && (maskSrcKey in func);\n}\n\nmodule.exports = isMasked;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_isMasked.js?");

/***/ }),

/***/ "./node_modules/lodash/_isPrototype.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Checks if `value` is likely a prototype object.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.\n */\nfunction isPrototype(value) {\n  var Ctor = value && value.constructor,\n      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;\n\n  return value === proto;\n}\n\nmodule.exports = isPrototype;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_isPrototype.js?");

/***/ }),

/***/ "./node_modules/lodash/_isStrictComparable.js":
/*!****************************************************!*\
  !*** ./node_modules/lodash/_isStrictComparable.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/**\n * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` if suitable for strict\n *  equality comparisons, else `false`.\n */\nfunction isStrictComparable(value) {\n  return value === value && !isObject(value);\n}\n\nmodule.exports = isStrictComparable;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_isStrictComparable.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheClear.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes all key-value entries from the list cache.\n *\n * @private\n * @name clear\n * @memberOf ListCache\n */\nfunction listCacheClear() {\n  this.__data__ = [];\n  this.size = 0;\n}\n\nmodule.exports = listCacheClear;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_listCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheDelete.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/** Used for built-in method references. */\nvar arrayProto = Array.prototype;\n\n/** Built-in value references. */\nvar splice = arrayProto.splice;\n\n/**\n * Removes `key` and its value from the list cache.\n *\n * @private\n * @name delete\n * @memberOf ListCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction listCacheDelete(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    return false;\n  }\n  var lastIndex = data.length - 1;\n  if (index == lastIndex) {\n    data.pop();\n  } else {\n    splice.call(data, index, 1);\n  }\n  --this.size;\n  return true;\n}\n\nmodule.exports = listCacheDelete;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_listCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheGet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Gets the list cache value for `key`.\n *\n * @private\n * @name get\n * @memberOf ListCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction listCacheGet(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  return index < 0 ? undefined : data[index][1];\n}\n\nmodule.exports = listCacheGet;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_listCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheHas.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Checks if a list cache value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf ListCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction listCacheHas(key) {\n  return assocIndexOf(this.__data__, key) > -1;\n}\n\nmodule.exports = listCacheHas;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_listCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_listCacheSet.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Sets the list cache `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf ListCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the list cache instance.\n */\nfunction listCacheSet(key, value) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    ++this.size;\n    data.push([key, value]);\n  } else {\n    data[index][1] = value;\n  }\n  return this;\n}\n\nmodule.exports = listCacheSet;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_listCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheClear.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Hash = __webpack_require__(/*! ./_Hash */ \"./node_modules/lodash/_Hash.js\"),\n    ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\");\n\n/**\n * Removes all key-value entries from the map.\n *\n * @private\n * @name clear\n * @memberOf MapCache\n */\nfunction mapCacheClear() {\n  this.size = 0;\n  this.__data__ = {\n    'hash': new Hash,\n    'map': new (Map || ListCache),\n    'string': new Hash\n  };\n}\n\nmodule.exports = mapCacheClear;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_mapCacheClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheDelete.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Removes `key` and its value from the map.\n *\n * @private\n * @name delete\n * @memberOf MapCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction mapCacheDelete(key) {\n  var result = getMapData(this, key)['delete'](key);\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = mapCacheDelete;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_mapCacheDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheGet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Gets the map value for `key`.\n *\n * @private\n * @name get\n * @memberOf MapCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction mapCacheGet(key) {\n  return getMapData(this, key).get(key);\n}\n\nmodule.exports = mapCacheGet;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_mapCacheGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Checks if a map value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf MapCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction mapCacheHas(key) {\n  return getMapData(this, key).has(key);\n}\n\nmodule.exports = mapCacheHas;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_mapCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapCacheSet.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./node_modules/lodash/_getMapData.js\");\n\n/**\n * Sets the map `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf MapCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the map cache instance.\n */\nfunction mapCacheSet(key, value) {\n  var data = getMapData(this, key),\n      size = data.size;\n\n  data.set(key, value);\n  this.size += data.size == size ? 0 : 1;\n  return this;\n}\n\nmodule.exports = mapCacheSet;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_mapCacheSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_mapToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_mapToArray.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Converts `map` to its key-value pairs.\n *\n * @private\n * @param {Object} map The map to convert.\n * @returns {Array} Returns the key-value pairs.\n */\nfunction mapToArray(map) {\n  var index = -1,\n      result = Array(map.size);\n\n  map.forEach(function(value, key) {\n    result[++index] = [key, value];\n  });\n  return result;\n}\n\nmodule.exports = mapToArray;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_mapToArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_matchesStrictComparable.js":
/*!*********************************************************!*\
  !*** ./node_modules/lodash/_matchesStrictComparable.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `matchesProperty` for source values suitable\n * for strict equality comparisons, i.e. `===`.\n *\n * @private\n * @param {string} key The key of the property to get.\n * @param {*} srcValue The value to match.\n * @returns {Function} Returns the new spec function.\n */\nfunction matchesStrictComparable(key, srcValue) {\n  return function(object) {\n    if (object == null) {\n      return false;\n    }\n    return object[key] === srcValue &&\n      (srcValue !== undefined || (key in Object(object)));\n  };\n}\n\nmodule.exports = matchesStrictComparable;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_matchesStrictComparable.js?");

/***/ }),

/***/ "./node_modules/lodash/_memoizeCapped.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_memoizeCapped.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var memoize = __webpack_require__(/*! ./memoize */ \"./node_modules/lodash/memoize.js\");\n\n/** Used as the maximum memoize cache size. */\nvar MAX_MEMOIZE_SIZE = 500;\n\n/**\n * A specialized version of `_.memoize` which clears the memoized function's\n * cache when it exceeds `MAX_MEMOIZE_SIZE`.\n *\n * @private\n * @param {Function} func The function to have its output memoized.\n * @returns {Function} Returns the new memoized function.\n */\nfunction memoizeCapped(func) {\n  var result = memoize(func, function(key) {\n    if (cache.size === MAX_MEMOIZE_SIZE) {\n      cache.clear();\n    }\n    return key;\n  });\n\n  var cache = result.cache;\n  return result;\n}\n\nmodule.exports = memoizeCapped;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_memoizeCapped.js?");

/***/ }),

/***/ "./node_modules/lodash/_metaMap.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_metaMap.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var WeakMap = __webpack_require__(/*! ./_WeakMap */ \"./node_modules/lodash/_WeakMap.js\");\n\n/** Used to store function metadata. */\nvar metaMap = WeakMap && new WeakMap;\n\nmodule.exports = metaMap;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_metaMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeCreate.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./node_modules/lodash/_getNative.js\");\n\n/* Built-in method references that are verified to be native. */\nvar nativeCreate = getNative(Object, 'create');\n\nmodule.exports = nativeCreate;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_nativeCreate.js?");

/***/ }),

/***/ "./node_modules/lodash/_nativeKeys.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var overArg = __webpack_require__(/*! ./_overArg */ \"./node_modules/lodash/_overArg.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeKeys = overArg(Object.keys, Object);\n\nmodule.exports = nativeKeys;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_nativeKeys.js?");

/***/ }),

/***/ "./node_modules/lodash/_nodeUtil.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Detect free variable `process` from Node.js. */\nvar freeProcess = moduleExports && freeGlobal.process;\n\n/** Used to access faster Node.js helpers. */\nvar nodeUtil = (function() {\n  try {\n    // Use `util.types` for Node.js 10+.\n    var types = freeModule && freeModule.require && freeModule.require('util').types;\n\n    if (types) {\n      return types;\n    }\n\n    // Legacy `process.binding('util')` for Node.js < 10.\n    return freeProcess && freeProcess.binding && freeProcess.binding('util');\n  } catch (e) {}\n}());\n\nmodule.exports = nodeUtil;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_nodeUtil.js?");

/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/**\n * Converts `value` to a string using `Object.prototype.toString`.\n *\n * @private\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n */\nfunction objectToString(value) {\n  return nativeObjectToString.call(value);\n}\n\nmodule.exports = objectToString;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_objectToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_overArg.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a unary function that invokes `func` with its argument transformed.\n *\n * @private\n * @param {Function} func The function to wrap.\n * @param {Function} transform The argument transform.\n * @returns {Function} Returns the new function.\n */\nfunction overArg(func, transform) {\n  return function(arg) {\n    return func(transform(arg));\n  };\n}\n\nmodule.exports = overArg;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_overArg.js?");

/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_overRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var apply = __webpack_require__(/*! ./_apply */ \"./node_modules/lodash/_apply.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMax = Math.max;\n\n/**\n * A specialized version of `baseRest` which transforms the rest array.\n *\n * @private\n * @param {Function} func The function to apply a rest parameter to.\n * @param {number} [start=func.length-1] The start position of the rest parameter.\n * @param {Function} transform The rest array transform.\n * @returns {Function} Returns the new function.\n */\nfunction overRest(func, start, transform) {\n  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);\n  return function() {\n    var args = arguments,\n        index = -1,\n        length = nativeMax(args.length - start, 0),\n        array = Array(length);\n\n    while (++index < length) {\n      array[index] = args[start + index];\n    }\n    index = -1;\n    var otherArgs = Array(start + 1);\n    while (++index < start) {\n      otherArgs[index] = args[index];\n    }\n    otherArgs[start] = transform(array);\n    return apply(func, this, otherArgs);\n  };\n}\n\nmodule.exports = overRest;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_overRest.js?");

/***/ }),

/***/ "./node_modules/lodash/_realNames.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_realNames.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to lookup unminified function names. */\nvar realNames = {};\n\nmodule.exports = realNames;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_realNames.js?");

/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `self`. */\nvar freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n\n/** Used as a reference to the global object. */\nvar root = freeGlobal || freeSelf || Function('return this')();\n\nmodule.exports = root;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_root.js?");

/***/ }),

/***/ "./node_modules/lodash/_setCacheAdd.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheAdd.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/**\n * Adds `value` to the array cache.\n *\n * @private\n * @name add\n * @memberOf SetCache\n * @alias push\n * @param {*} value The value to cache.\n * @returns {Object} Returns the cache instance.\n */\nfunction setCacheAdd(value) {\n  this.__data__.set(value, HASH_UNDEFINED);\n  return this;\n}\n\nmodule.exports = setCacheAdd;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_setCacheAdd.js?");

/***/ }),

/***/ "./node_modules/lodash/_setCacheHas.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheHas.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is in the array cache.\n *\n * @private\n * @name has\n * @memberOf SetCache\n * @param {*} value The value to search for.\n * @returns {number} Returns `true` if `value` is found, else `false`.\n */\nfunction setCacheHas(value) {\n  return this.__data__.has(value);\n}\n\nmodule.exports = setCacheHas;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_setCacheHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_setToArray.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_setToArray.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Converts `set` to an array of its values.\n *\n * @private\n * @param {Object} set The set to convert.\n * @returns {Array} Returns the values.\n */\nfunction setToArray(set) {\n  var index = -1,\n      result = Array(set.size);\n\n  set.forEach(function(value) {\n    result[++index] = value;\n  });\n  return result;\n}\n\nmodule.exports = setToArray;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_setToArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setToString.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseSetToString = __webpack_require__(/*! ./_baseSetToString */ \"./node_modules/lodash/_baseSetToString.js\"),\n    shortOut = __webpack_require__(/*! ./_shortOut */ \"./node_modules/lodash/_shortOut.js\");\n\n/**\n * Sets the `toString` method of `func` to return `string`.\n *\n * @private\n * @param {Function} func The function to modify.\n * @param {Function} string The `toString` result.\n * @returns {Function} Returns `func`.\n */\nvar setToString = shortOut(baseSetToString);\n\nmodule.exports = setToString;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_setToString.js?");

/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_shortOut.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to detect hot functions by number of calls within a span of milliseconds. */\nvar HOT_COUNT = 800,\n    HOT_SPAN = 16;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeNow = Date.now;\n\n/**\n * Creates a function that'll short out and invoke `identity` instead\n * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`\n * milliseconds.\n *\n * @private\n * @param {Function} func The function to restrict.\n * @returns {Function} Returns the new shortable function.\n */\nfunction shortOut(func) {\n  var count = 0,\n      lastCalled = 0;\n\n  return function() {\n    var stamp = nativeNow(),\n        remaining = HOT_SPAN - (stamp - lastCalled);\n\n    lastCalled = stamp;\n    if (remaining > 0) {\n      if (++count >= HOT_COUNT) {\n        return arguments[0];\n      }\n    } else {\n      count = 0;\n    }\n    return func.apply(undefined, arguments);\n  };\n}\n\nmodule.exports = shortOut;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_shortOut.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackClear.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\");\n\n/**\n * Removes all key-value entries from the stack.\n *\n * @private\n * @name clear\n * @memberOf Stack\n */\nfunction stackClear() {\n  this.__data__ = new ListCache;\n  this.size = 0;\n}\n\nmodule.exports = stackClear;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_stackClear.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackDelete.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes `key` and its value from the stack.\n *\n * @private\n * @name delete\n * @memberOf Stack\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction stackDelete(key) {\n  var data = this.__data__,\n      result = data['delete'](key);\n\n  this.size = data.size;\n  return result;\n}\n\nmodule.exports = stackDelete;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_stackDelete.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackGet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the stack value for `key`.\n *\n * @private\n * @name get\n * @memberOf Stack\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction stackGet(key) {\n  return this.__data__.get(key);\n}\n\nmodule.exports = stackGet;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_stackGet.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackHas.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if a stack value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Stack\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction stackHas(key) {\n  return this.__data__.has(key);\n}\n\nmodule.exports = stackHas;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_stackHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_stackSet.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var ListCache = __webpack_require__(/*! ./_ListCache */ \"./node_modules/lodash/_ListCache.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./node_modules/lodash/_Map.js\"),\n    MapCache = __webpack_require__(/*! ./_MapCache */ \"./node_modules/lodash/_MapCache.js\");\n\n/** Used as the size to enable large array optimizations. */\nvar LARGE_ARRAY_SIZE = 200;\n\n/**\n * Sets the stack `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Stack\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the stack cache instance.\n */\nfunction stackSet(key, value) {\n  var data = this.__data__;\n  if (data instanceof ListCache) {\n    var pairs = data.__data__;\n    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {\n      pairs.push([key, value]);\n      this.size = ++data.size;\n      return this;\n    }\n    data = this.__data__ = new MapCache(pairs);\n  }\n  data.set(key, value);\n  this.size = data.size;\n  return this;\n}\n\nmodule.exports = stackSet;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_stackSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_stringToPath.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_stringToPath.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ \"./node_modules/lodash/_memoizeCapped.js\");\n\n/** Used to match property names within property paths. */\nvar rePropName = /[^.[\\]]+|\\[(?:(-?\\d+(?:\\.\\d+)?)|([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))/g;\n\n/** Used to match backslashes in property paths. */\nvar reEscapeChar = /\\\\(\\\\)?/g;\n\n/**\n * Converts `string` to a property path array.\n *\n * @private\n * @param {string} string The string to convert.\n * @returns {Array} Returns the property path array.\n */\nvar stringToPath = memoizeCapped(function(string) {\n  var result = [];\n  if (string.charCodeAt(0) === 46 /* . */) {\n    result.push('');\n  }\n  string.replace(rePropName, function(match, number, quote, subString) {\n    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));\n  });\n  return result;\n});\n\nmodule.exports = stringToPath;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_stringToPath.js?");

/***/ }),

/***/ "./node_modules/lodash/_toKey.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/_toKey.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar INFINITY = 1 / 0;\n\n/**\n * Converts `value` to a string key if it's not a string or symbol.\n *\n * @private\n * @param {*} value The value to inspect.\n * @returns {string|symbol} Returns the key.\n */\nfunction toKey(value) {\n  if (typeof value == 'string' || isSymbol(value)) {\n    return value;\n  }\n  var result = (value + '');\n  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;\n}\n\nmodule.exports = toKey;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_toKey.js?");

/***/ }),

/***/ "./node_modules/lodash/_toSource.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar funcProto = Function.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/**\n * Converts `func` to its source code.\n *\n * @private\n * @param {Function} func The function to convert.\n * @returns {string} Returns the source code.\n */\nfunction toSource(func) {\n  if (func != null) {\n    try {\n      return funcToString.call(func);\n    } catch (e) {}\n    try {\n      return (func + '');\n    } catch (e) {}\n  }\n  return '';\n}\n\nmodule.exports = toSource;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_toSource.js?");

/***/ }),

/***/ "./node_modules/lodash/_wrapperClone.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_wrapperClone.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var LazyWrapper = __webpack_require__(/*! ./_LazyWrapper */ \"./node_modules/lodash/_LazyWrapper.js\"),\n    LodashWrapper = __webpack_require__(/*! ./_LodashWrapper */ \"./node_modules/lodash/_LodashWrapper.js\"),\n    copyArray = __webpack_require__(/*! ./_copyArray */ \"./node_modules/lodash/_copyArray.js\");\n\n/**\n * Creates a clone of `wrapper`.\n *\n * @private\n * @param {Object} wrapper The wrapper to clone.\n * @returns {Object} Returns the cloned wrapper.\n */\nfunction wrapperClone(wrapper) {\n  if (wrapper instanceof LazyWrapper) {\n    return wrapper.clone();\n  }\n  var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);\n  result.__actions__ = copyArray(wrapper.__actions__);\n  result.__index__  = wrapper.__index__;\n  result.__values__ = wrapper.__values__;\n  return result;\n}\n\nmodule.exports = wrapperClone;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/_wrapperClone.js?");

/***/ }),

/***/ "./node_modules/lodash/constant.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/constant.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Creates a function that returns `value`.\n *\n * @static\n * @memberOf _\n * @since 2.4.0\n * @category Util\n * @param {*} value The value to return from the new function.\n * @returns {Function} Returns the new constant function.\n * @example\n *\n * var objects = _.times(2, _.constant({ 'a': 1 }));\n *\n * console.log(objects);\n * // => [{ 'a': 1 }, { 'a': 1 }]\n *\n * console.log(objects[0] === objects[1]);\n * // => true\n */\nfunction constant(value) {\n  return function() {\n    return value;\n  };\n}\n\nmodule.exports = constant;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/constant.js?");

/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/debounce.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    now = __webpack_require__(/*! ./now */ \"./node_modules/lodash/now.js\"),\n    toNumber = __webpack_require__(/*! ./toNumber */ \"./node_modules/lodash/toNumber.js\");\n\n/** Error message constants. */\nvar FUNC_ERROR_TEXT = 'Expected a function';\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeMax = Math.max,\n    nativeMin = Math.min;\n\n/**\n * Creates a debounced function that delays invoking `func` until after `wait`\n * milliseconds have elapsed since the last time the debounced function was\n * invoked. The debounced function comes with a `cancel` method to cancel\n * delayed `func` invocations and a `flush` method to immediately invoke them.\n * Provide `options` to indicate whether `func` should be invoked on the\n * leading and/or trailing edge of the `wait` timeout. The `func` is invoked\n * with the last arguments provided to the debounced function. Subsequent\n * calls to the debounced function return the result of the last `func`\n * invocation.\n *\n * **Note:** If `leading` and `trailing` options are `true`, `func` is\n * invoked on the trailing edge of the timeout only if the debounced function\n * is invoked more than once during the `wait` timeout.\n *\n * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred\n * until to the next tick, similar to `setTimeout` with a timeout of `0`.\n *\n * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)\n * for details over the differences between `_.debounce` and `_.throttle`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Function\n * @param {Function} func The function to debounce.\n * @param {number} [wait=0] The number of milliseconds to delay.\n * @param {Object} [options={}] The options object.\n * @param {boolean} [options.leading=false]\n *  Specify invoking on the leading edge of the timeout.\n * @param {number} [options.maxWait]\n *  The maximum time `func` is allowed to be delayed before it's invoked.\n * @param {boolean} [options.trailing=true]\n *  Specify invoking on the trailing edge of the timeout.\n * @returns {Function} Returns the new debounced function.\n * @example\n *\n * // Avoid costly calculations while the window size is in flux.\n * jQuery(window).on('resize', _.debounce(calculateLayout, 150));\n *\n * // Invoke `sendMail` when clicked, debouncing subsequent calls.\n * jQuery(element).on('click', _.debounce(sendMail, 300, {\n *   'leading': true,\n *   'trailing': false\n * }));\n *\n * // Ensure `batchLog` is invoked once after 1 second of debounced calls.\n * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });\n * var source = new EventSource('/stream');\n * jQuery(source).on('message', debounced);\n *\n * // Cancel the trailing debounced invocation.\n * jQuery(window).on('popstate', debounced.cancel);\n */\nfunction debounce(func, wait, options) {\n  var lastArgs,\n      lastThis,\n      maxWait,\n      result,\n      timerId,\n      lastCallTime,\n      lastInvokeTime = 0,\n      leading = false,\n      maxing = false,\n      trailing = true;\n\n  if (typeof func != 'function') {\n    throw new TypeError(FUNC_ERROR_TEXT);\n  }\n  wait = toNumber(wait) || 0;\n  if (isObject(options)) {\n    leading = !!options.leading;\n    maxing = 'maxWait' in options;\n    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;\n    trailing = 'trailing' in options ? !!options.trailing : trailing;\n  }\n\n  function invokeFunc(time) {\n    var args = lastArgs,\n        thisArg = lastThis;\n\n    lastArgs = lastThis = undefined;\n    lastInvokeTime = time;\n    result = func.apply(thisArg, args);\n    return result;\n  }\n\n  function leadingEdge(time) {\n    // Reset any `maxWait` timer.\n    lastInvokeTime = time;\n    // Start the timer for the trailing edge.\n    timerId = setTimeout(timerExpired, wait);\n    // Invoke the leading edge.\n    return leading ? invokeFunc(time) : result;\n  }\n\n  function remainingWait(time) {\n    var timeSinceLastCall = time - lastCallTime,\n        timeSinceLastInvoke = time - lastInvokeTime,\n        timeWaiting = wait - timeSinceLastCall;\n\n    return maxing\n      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)\n      : timeWaiting;\n  }\n\n  function shouldInvoke(time) {\n    var timeSinceLastCall = time - lastCallTime,\n        timeSinceLastInvoke = time - lastInvokeTime;\n\n    // Either this is the first call, activity has stopped and we're at the\n    // trailing edge, the system time has gone backwards and we're treating\n    // it as the trailing edge, or we've hit the `maxWait` limit.\n    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||\n      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));\n  }\n\n  function timerExpired() {\n    var time = now();\n    if (shouldInvoke(time)) {\n      return trailingEdge(time);\n    }\n    // Restart the timer.\n    timerId = setTimeout(timerExpired, remainingWait(time));\n  }\n\n  function trailingEdge(time) {\n    timerId = undefined;\n\n    // Only invoke if we have `lastArgs` which means `func` has been\n    // debounced at least once.\n    if (trailing && lastArgs) {\n      return invokeFunc(time);\n    }\n    lastArgs = lastThis = undefined;\n    return result;\n  }\n\n  function cancel() {\n    if (timerId !== undefined) {\n      clearTimeout(timerId);\n    }\n    lastInvokeTime = 0;\n    lastArgs = lastCallTime = lastThis = timerId = undefined;\n  }\n\n  function flush() {\n    return timerId === undefined ? result : trailingEdge(now());\n  }\n\n  function debounced() {\n    var time = now(),\n        isInvoking = shouldInvoke(time);\n\n    lastArgs = arguments;\n    lastThis = this;\n    lastCallTime = time;\n\n    if (isInvoking) {\n      if (timerId === undefined) {\n        return leadingEdge(lastCallTime);\n      }\n      if (maxing) {\n        // Handle invocations in a tight loop.\n        timerId = setTimeout(timerExpired, wait);\n        return invokeFunc(lastCallTime);\n      }\n    }\n    if (timerId === undefined) {\n      timerId = setTimeout(timerExpired, wait);\n    }\n    return result;\n  }\n  debounced.cancel = cancel;\n  debounced.flush = flush;\n  return debounced;\n}\n\nmodule.exports = debounce;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/debounce.js?");

/***/ }),

/***/ "./node_modules/lodash/eq.js":
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Performs a\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * comparison between two values to determine if they are equivalent.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * var object = { 'a': 1 };\n * var other = { 'a': 1 };\n *\n * _.eq(object, object);\n * // => true\n *\n * _.eq(object, other);\n * // => false\n *\n * _.eq('a', 'a');\n * // => true\n *\n * _.eq('a', Object('a'));\n * // => false\n *\n * _.eq(NaN, NaN);\n * // => true\n */\nfunction eq(value, other) {\n  return value === other || (value !== value && other !== other);\n}\n\nmodule.exports = eq;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/eq.js?");

/***/ }),

/***/ "./node_modules/lodash/flatten.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/flatten.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseFlatten = __webpack_require__(/*! ./_baseFlatten */ \"./node_modules/lodash/_baseFlatten.js\");\n\n/**\n * Flattens `array` a single level deep.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Array\n * @param {Array} array The array to flatten.\n * @returns {Array} Returns the new flattened array.\n * @example\n *\n * _.flatten([1, [2, [3, [4]], 5]]);\n * // => [1, 2, [3, [4]], 5]\n */\nfunction flatten(array) {\n  var length = array == null ? 0 : array.length;\n  return length ? baseFlatten(array, 1) : [];\n}\n\nmodule.exports = flatten;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/flatten.js?");

/***/ }),

/***/ "./node_modules/lodash/flowRight.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/flowRight.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var createFlow = __webpack_require__(/*! ./_createFlow */ \"./node_modules/lodash/_createFlow.js\");\n\n/**\n * This method is like `_.flow` except that it creates a function that\n * invokes the given functions from right to left.\n *\n * @static\n * @since 3.0.0\n * @memberOf _\n * @category Util\n * @param {...(Function|Function[])} [funcs] The functions to invoke.\n * @returns {Function} Returns the new composite function.\n * @see _.flow\n * @example\n *\n * function square(n) {\n *   return n * n;\n * }\n *\n * var addSquare = _.flowRight([square, _.add]);\n * addSquare(1, 2);\n * // => 9\n */\nvar flowRight = createFlow(true);\n\nmodule.exports = flowRight;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/flowRight.js?");

/***/ }),

/***/ "./node_modules/lodash/get.js":
/*!************************************!*\
  !*** ./node_modules/lodash/get.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGet = __webpack_require__(/*! ./_baseGet */ \"./node_modules/lodash/_baseGet.js\");\n\n/**\n * Gets the value at `path` of `object`. If the resolved value is\n * `undefined`, the `defaultValue` is returned in its place.\n *\n * @static\n * @memberOf _\n * @since 3.7.0\n * @category Object\n * @param {Object} object The object to query.\n * @param {Array|string} path The path of the property to get.\n * @param {*} [defaultValue] The value returned for `undefined` resolved values.\n * @returns {*} Returns the resolved value.\n * @example\n *\n * var object = { 'a': [{ 'b': { 'c': 3 } }] };\n *\n * _.get(object, 'a[0].b.c');\n * // => 3\n *\n * _.get(object, ['a', '0', 'b', 'c']);\n * // => 3\n *\n * _.get(object, 'a.b.c', 'default');\n * // => 'default'\n */\nfunction get(object, path, defaultValue) {\n  var result = object == null ? undefined : baseGet(object, path);\n  return result === undefined ? defaultValue : result;\n}\n\nmodule.exports = get;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/get.js?");

/***/ }),

/***/ "./node_modules/lodash/hasIn.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/hasIn.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseHasIn = __webpack_require__(/*! ./_baseHasIn */ \"./node_modules/lodash/_baseHasIn.js\"),\n    hasPath = __webpack_require__(/*! ./_hasPath */ \"./node_modules/lodash/_hasPath.js\");\n\n/**\n * Checks if `path` is a direct or inherited property of `object`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Object\n * @param {Object} object The object to query.\n * @param {Array|string} path The path to check.\n * @returns {boolean} Returns `true` if `path` exists, else `false`.\n * @example\n *\n * var object = _.create({ 'a': _.create({ 'b': 2 }) });\n *\n * _.hasIn(object, 'a');\n * // => true\n *\n * _.hasIn(object, 'a.b');\n * // => true\n *\n * _.hasIn(object, ['a', 'b']);\n * // => true\n *\n * _.hasIn(object, 'b');\n * // => false\n */\nfunction hasIn(object, path) {\n  return object != null && hasPath(object, path, baseHasIn);\n}\n\nmodule.exports = hasIn;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/hasIn.js?");

/***/ }),

/***/ "./node_modules/lodash/head.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/head.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the first element of `array`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @alias first\n * @category Array\n * @param {Array} array The array to query.\n * @returns {*} Returns the first element of `array`.\n * @example\n *\n * _.head([1, 2, 3]);\n * // => 1\n *\n * _.head([]);\n * // => undefined\n */\nfunction head(array) {\n  return (array && array.length) ? array[0] : undefined;\n}\n\nmodule.exports = head;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/head.js?");

/***/ }),

/***/ "./node_modules/lodash/identity.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns the first argument it receives.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Util\n * @param {*} value Any value.\n * @returns {*} Returns `value`.\n * @example\n *\n * var object = { 'a': 1 };\n *\n * console.log(_.identity(object) === object);\n * // => true\n */\nfunction identity(value) {\n  return value;\n}\n\nmodule.exports = identity;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/identity.js?");

/***/ }),

/***/ "./node_modules/lodash/isArguments.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ \"./node_modules/lodash/_baseIsArguments.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Built-in value references. */\nvar propertyIsEnumerable = objectProto.propertyIsEnumerable;\n\n/**\n * Checks if `value` is likely an `arguments` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an `arguments` object,\n *  else `false`.\n * @example\n *\n * _.isArguments(function() { return arguments; }());\n * // => true\n *\n * _.isArguments([1, 2, 3]);\n * // => false\n */\nvar isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {\n  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&\n    !propertyIsEnumerable.call(value, 'callee');\n};\n\nmodule.exports = isArguments;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/isArguments.js?");

/***/ }),

/***/ "./node_modules/lodash/isArray.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is classified as an `Array` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an array, else `false`.\n * @example\n *\n * _.isArray([1, 2, 3]);\n * // => true\n *\n * _.isArray(document.body.children);\n * // => false\n *\n * _.isArray('abc');\n * // => false\n *\n * _.isArray(_.noop);\n * // => false\n */\nvar isArray = Array.isArray;\n\nmodule.exports = isArray;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/isArray.js?");

/***/ }),

/***/ "./node_modules/lodash/isArrayLike.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./node_modules/lodash/isFunction.js\"),\n    isLength = __webpack_require__(/*! ./isLength */ \"./node_modules/lodash/isLength.js\");\n\n/**\n * Checks if `value` is array-like. A value is considered array-like if it's\n * not a function and has a `value.length` that's an integer greater than or\n * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is array-like, else `false`.\n * @example\n *\n * _.isArrayLike([1, 2, 3]);\n * // => true\n *\n * _.isArrayLike(document.body.children);\n * // => true\n *\n * _.isArrayLike('abc');\n * // => true\n *\n * _.isArrayLike(_.noop);\n * // => false\n */\nfunction isArrayLike(value) {\n  return value != null && isLength(value.length) && !isFunction(value);\n}\n\nmodule.exports = isArrayLike;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/isArrayLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isBuffer.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\"),\n    stubFalse = __webpack_require__(/*! ./stubFalse */ \"./node_modules/lodash/stubFalse.js\");\n\n/** Detect free variable `exports`. */\nvar freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;\n\n/** Detect free variable `module`. */\nvar freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;\n\n/** Detect the popular CommonJS extension `module.exports`. */\nvar moduleExports = freeModule && freeModule.exports === freeExports;\n\n/** Built-in value references. */\nvar Buffer = moduleExports ? root.Buffer : undefined;\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;\n\n/**\n * Checks if `value` is a buffer.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.\n * @example\n *\n * _.isBuffer(new Buffer(2));\n * // => true\n *\n * _.isBuffer(new Uint8Array(2));\n * // => false\n */\nvar isBuffer = nativeIsBuffer || stubFalse;\n\nmodule.exports = isBuffer;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/isBuffer.js?");

/***/ }),

/***/ "./node_modules/lodash/isEqual.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/isEqual.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ \"./node_modules/lodash/_baseIsEqual.js\");\n\n/**\n * Performs a deep comparison between two values to determine if they are\n * equivalent.\n *\n * **Note:** This method supports comparing arrays, array buffers, booleans,\n * date objects, error objects, maps, numbers, `Object` objects, regexes,\n * sets, strings, symbols, and typed arrays. `Object` objects are compared\n * by their own, not inherited, enumerable properties. Functions and DOM\n * nodes are compared by strict equality, i.e. `===`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * var object = { 'a': 1 };\n * var other = { 'a': 1 };\n *\n * _.isEqual(object, other);\n * // => true\n *\n * object === other;\n * // => false\n */\nfunction isEqual(value, other) {\n  return baseIsEqual(value, other);\n}\n\nmodule.exports = isEqual;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/isEqual.js?");

/***/ }),

/***/ "./node_modules/lodash/isFunction.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\");\n\n/** `Object#toString` result references. */\nvar asyncTag = '[object AsyncFunction]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    proxyTag = '[object Proxy]';\n\n/**\n * Checks if `value` is classified as a `Function` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a function, else `false`.\n * @example\n *\n * _.isFunction(_);\n * // => true\n *\n * _.isFunction(/abc/);\n * // => false\n */\nfunction isFunction(value) {\n  if (!isObject(value)) {\n    return false;\n  }\n  // The use of `Object#toString` avoids issues with the `typeof` operator\n  // in Safari 9 which returns 'object' for typed arrays and other constructors.\n  var tag = baseGetTag(value);\n  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;\n}\n\nmodule.exports = isFunction;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/isFunction.js?");

/***/ }),

/***/ "./node_modules/lodash/isLength.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used as references for various `Number` constants. */\nvar MAX_SAFE_INTEGER = 9007199254740991;\n\n/**\n * Checks if `value` is a valid array-like length.\n *\n * **Note:** This method is loosely based on\n * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.\n * @example\n *\n * _.isLength(3);\n * // => true\n *\n * _.isLength(Number.MIN_VALUE);\n * // => false\n *\n * _.isLength(Infinity);\n * // => false\n *\n * _.isLength('3');\n * // => false\n */\nfunction isLength(value) {\n  return typeof value == 'number' &&\n    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;\n}\n\nmodule.exports = isLength;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/isLength.js?");

/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is the\n * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)\n * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an object, else `false`.\n * @example\n *\n * _.isObject({});\n * // => true\n *\n * _.isObject([1, 2, 3]);\n * // => true\n *\n * _.isObject(_.noop);\n * // => true\n *\n * _.isObject(null);\n * // => false\n */\nfunction isObject(value) {\n  var type = typeof value;\n  return value != null && (type == 'object' || type == 'function');\n}\n\nmodule.exports = isObject;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/isObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is object-like. A value is object-like if it's not `null`\n * and has a `typeof` result of \"object\".\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n * @example\n *\n * _.isObjectLike({});\n * // => true\n *\n * _.isObjectLike([1, 2, 3]);\n * // => true\n *\n * _.isObjectLike(_.noop);\n * // => false\n *\n * _.isObjectLike(null);\n * // => false\n */\nfunction isObjectLike(value) {\n  return value != null && typeof value == 'object';\n}\n\nmodule.exports = isObjectLike;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/isObjectLike.js?");

/***/ }),

/***/ "./node_modules/lodash/isPlainObject.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/isPlainObject.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    getPrototype = __webpack_require__(/*! ./_getPrototype */ \"./node_modules/lodash/_getPrototype.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar objectTag = '[object Object]';\n\n/** Used for built-in method references. */\nvar funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Used to infer the `Object` constructor. */\nvar objectCtorString = funcToString.call(Object);\n\n/**\n * Checks if `value` is a plain object, that is, an object created by the\n * `Object` constructor or one with a `[[Prototype]]` of `null`.\n *\n * @static\n * @memberOf _\n * @since 0.8.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n * }\n *\n * _.isPlainObject(new Foo);\n * // => false\n *\n * _.isPlainObject([1, 2, 3]);\n * // => false\n *\n * _.isPlainObject({ 'x': 0, 'y': 0 });\n * // => true\n *\n * _.isPlainObject(Object.create(null));\n * // => true\n */\nfunction isPlainObject(value) {\n  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {\n    return false;\n  }\n  var proto = getPrototype(value);\n  if (proto === null) {\n    return true;\n  }\n  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;\n  return typeof Ctor == 'function' && Ctor instanceof Ctor &&\n    funcToString.call(Ctor) == objectCtorString;\n}\n\nmodule.exports = isPlainObject;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/isPlainObject.js?");

/***/ }),

/***/ "./node_modules/lodash/isString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isString.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar stringTag = '[object String]';\n\n/**\n * Checks if `value` is classified as a `String` primitive or object.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a string, else `false`.\n * @example\n *\n * _.isString('abc');\n * // => true\n *\n * _.isString(1);\n * // => false\n */\nfunction isString(value) {\n  return typeof value == 'string' ||\n    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);\n}\n\nmodule.exports = isString;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/isString.js?");

/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar symbolTag = '[object Symbol]';\n\n/**\n * Checks if `value` is classified as a `Symbol` primitive or object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.\n * @example\n *\n * _.isSymbol(Symbol.iterator);\n * // => true\n *\n * _.isSymbol('abc');\n * // => false\n */\nfunction isSymbol(value) {\n  return typeof value == 'symbol' ||\n    (isObjectLike(value) && baseGetTag(value) == symbolTag);\n}\n\nmodule.exports = isSymbol;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/isSymbol.js?");

/***/ }),

/***/ "./node_modules/lodash/isTypedArray.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ \"./node_modules/lodash/_baseIsTypedArray.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ \"./node_modules/lodash/_nodeUtil.js\");\n\n/* Node.js helper references. */\nvar nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;\n\n/**\n * Checks if `value` is classified as a typed array.\n *\n * @static\n * @memberOf _\n * @since 3.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.\n * @example\n *\n * _.isTypedArray(new Uint8Array);\n * // => true\n *\n * _.isTypedArray([]);\n * // => false\n */\nvar isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;\n\nmodule.exports = isTypedArray;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/isTypedArray.js?");

/***/ }),

/***/ "./node_modules/lodash/keys.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ \"./node_modules/lodash/_arrayLikeKeys.js\"),\n    baseKeys = __webpack_require__(/*! ./_baseKeys */ \"./node_modules/lodash/_baseKeys.js\"),\n    isArrayLike = __webpack_require__(/*! ./isArrayLike */ \"./node_modules/lodash/isArrayLike.js\");\n\n/**\n * Creates an array of the own enumerable property names of `object`.\n *\n * **Note:** Non-object values are coerced to objects. See the\n * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)\n * for more details.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Object\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names.\n * @example\n *\n * function Foo() {\n *   this.a = 1;\n *   this.b = 2;\n * }\n *\n * Foo.prototype.c = 3;\n *\n * _.keys(new Foo);\n * // => ['a', 'b'] (iteration order is not guaranteed)\n *\n * _.keys('hi');\n * // => ['0', '1']\n */\nfunction keys(object) {\n  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);\n}\n\nmodule.exports = keys;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/keys.js?");

/***/ }),

/***/ "./node_modules/lodash/memoize.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/memoize.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MapCache = __webpack_require__(/*! ./_MapCache */ \"./node_modules/lodash/_MapCache.js\");\n\n/** Error message constants. */\nvar FUNC_ERROR_TEXT = 'Expected a function';\n\n/**\n * Creates a function that memoizes the result of `func`. If `resolver` is\n * provided, it determines the cache key for storing the result based on the\n * arguments provided to the memoized function. By default, the first argument\n * provided to the memoized function is used as the map cache key. The `func`\n * is invoked with the `this` binding of the memoized function.\n *\n * **Note:** The cache is exposed as the `cache` property on the memoized\n * function. Its creation may be customized by replacing the `_.memoize.Cache`\n * constructor with one whose instances implement the\n * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)\n * method interface of `clear`, `delete`, `get`, `has`, and `set`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Function\n * @param {Function} func The function to have its output memoized.\n * @param {Function} [resolver] The function to resolve the cache key.\n * @returns {Function} Returns the new memoized function.\n * @example\n *\n * var object = { 'a': 1, 'b': 2 };\n * var other = { 'c': 3, 'd': 4 };\n *\n * var values = _.memoize(_.values);\n * values(object);\n * // => [1, 2]\n *\n * values(other);\n * // => [3, 4]\n *\n * object.a = 2;\n * values(object);\n * // => [1, 2]\n *\n * // Modify the result cache.\n * values.cache.set(object, ['a', 'b']);\n * values(object);\n * // => ['a', 'b']\n *\n * // Replace `_.memoize.Cache`.\n * _.memoize.Cache = WeakMap;\n */\nfunction memoize(func, resolver) {\n  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {\n    throw new TypeError(FUNC_ERROR_TEXT);\n  }\n  var memoized = function() {\n    var args = arguments,\n        key = resolver ? resolver.apply(this, args) : args[0],\n        cache = memoized.cache;\n\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    var result = func.apply(this, args);\n    memoized.cache = cache.set(key, result) || cache;\n    return result;\n  };\n  memoized.cache = new (memoize.Cache || MapCache);\n  return memoized;\n}\n\n// Expose `MapCache`.\nmemoize.Cache = MapCache;\n\nmodule.exports = memoize;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/memoize.js?");

/***/ }),

/***/ "./node_modules/lodash/noop.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/noop.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `undefined`.\n *\n * @static\n * @memberOf _\n * @since 2.3.0\n * @category Util\n * @example\n *\n * _.times(2, _.noop);\n * // => [undefined, undefined]\n */\nfunction noop() {\n  // No operation performed.\n}\n\nmodule.exports = noop;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/noop.js?");

/***/ }),

/***/ "./node_modules/lodash/now.js":
/*!************************************!*\
  !*** ./node_modules/lodash/now.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./node_modules/lodash/_root.js\");\n\n/**\n * Gets the timestamp of the number of milliseconds that have elapsed since\n * the Unix epoch (1 January 1970 00:00:00 UTC).\n *\n * @static\n * @memberOf _\n * @since 2.4.0\n * @category Date\n * @returns {number} Returns the timestamp.\n * @example\n *\n * _.defer(function(stamp) {\n *   console.log(_.now() - stamp);\n * }, _.now());\n * // => Logs the number of milliseconds it took for the deferred invocation.\n */\nvar now = function() {\n  return root.Date.now();\n};\n\nmodule.exports = now;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/now.js?");

/***/ }),

/***/ "./node_modules/lodash/pick.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/pick.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var basePick = __webpack_require__(/*! ./_basePick */ \"./node_modules/lodash/_basePick.js\"),\n    flatRest = __webpack_require__(/*! ./_flatRest */ \"./node_modules/lodash/_flatRest.js\");\n\n/**\n * Creates an object composed of the picked `object` properties.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Object\n * @param {Object} object The source object.\n * @param {...(string|string[])} [paths] The property paths to pick.\n * @returns {Object} Returns the new object.\n * @example\n *\n * var object = { 'a': 1, 'b': '2', 'c': 3 };\n *\n * _.pick(object, ['a', 'c']);\n * // => { 'a': 1, 'c': 3 }\n */\nvar pick = flatRest(function(object, paths) {\n  return object == null ? {} : basePick(object, paths);\n});\n\nmodule.exports = pick;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/pick.js?");

/***/ }),

/***/ "./node_modules/lodash/property.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/property.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseProperty = __webpack_require__(/*! ./_baseProperty */ \"./node_modules/lodash/_baseProperty.js\"),\n    basePropertyDeep = __webpack_require__(/*! ./_basePropertyDeep */ \"./node_modules/lodash/_basePropertyDeep.js\"),\n    isKey = __webpack_require__(/*! ./_isKey */ \"./node_modules/lodash/_isKey.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * Creates a function that returns the value at `path` of a given object.\n *\n * @static\n * @memberOf _\n * @since 2.4.0\n * @category Util\n * @param {Array|string} path The path of the property to get.\n * @returns {Function} Returns the new accessor function.\n * @example\n *\n * var objects = [\n *   { 'a': { 'b': 2 } },\n *   { 'a': { 'b': 1 } }\n * ];\n *\n * _.map(objects, _.property('a.b'));\n * // => [2, 1]\n *\n * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');\n * // => [1, 2]\n */\nfunction property(path) {\n  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);\n}\n\nmodule.exports = property;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/property.js?");

/***/ }),

/***/ "./node_modules/lodash/some.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/some.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arraySome = __webpack_require__(/*! ./_arraySome */ \"./node_modules/lodash/_arraySome.js\"),\n    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ \"./node_modules/lodash/_baseIteratee.js\"),\n    baseSome = __webpack_require__(/*! ./_baseSome */ \"./node_modules/lodash/_baseSome.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isIterateeCall = __webpack_require__(/*! ./_isIterateeCall */ \"./node_modules/lodash/_isIterateeCall.js\");\n\n/**\n * Checks if `predicate` returns truthy for **any** element of `collection`.\n * Iteration is stopped once `predicate` returns truthy. The predicate is\n * invoked with three arguments: (value, index|key, collection).\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Collection\n * @param {Array|Object} collection The collection to iterate over.\n * @param {Function} [predicate=_.identity] The function invoked per iteration.\n * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.\n * @returns {boolean} Returns `true` if any element passes the predicate check,\n *  else `false`.\n * @example\n *\n * _.some([null, 0, 'yes', false], Boolean);\n * // => true\n *\n * var users = [\n *   { 'user': 'barney', 'active': true },\n *   { 'user': 'fred',   'active': false }\n * ];\n *\n * // The `_.matches` iteratee shorthand.\n * _.some(users, { 'user': 'barney', 'active': false });\n * // => false\n *\n * // The `_.matchesProperty` iteratee shorthand.\n * _.some(users, ['active', false]);\n * // => true\n *\n * // The `_.property` iteratee shorthand.\n * _.some(users, 'active');\n * // => true\n */\nfunction some(collection, predicate, guard) {\n  var func = isArray(collection) ? arraySome : baseSome;\n  if (guard && isIterateeCall(collection, predicate, guard)) {\n    predicate = undefined;\n  }\n  return func(collection, baseIteratee(predicate, 3));\n}\n\nmodule.exports = some;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/some.js?");

/***/ }),

/***/ "./node_modules/lodash/stubArray.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubArray.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns a new empty array.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {Array} Returns the new empty array.\n * @example\n *\n * var arrays = _.times(2, _.stubArray);\n *\n * console.log(arrays);\n * // => [[], []]\n *\n * console.log(arrays[0] === arrays[1]);\n * // => false\n */\nfunction stubArray() {\n  return [];\n}\n\nmodule.exports = stubArray;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/stubArray.js?");

/***/ }),

/***/ "./node_modules/lodash/stubFalse.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * This method returns `false`.\n *\n * @static\n * @memberOf _\n * @since 4.13.0\n * @category Util\n * @returns {boolean} Returns `false`.\n * @example\n *\n * _.times(2, _.stubFalse);\n * // => [false, false]\n */\nfunction stubFalse() {\n  return false;\n}\n\nmodule.exports = stubFalse;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/stubFalse.js?");

/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar NAN = 0 / 0;\n\n/** Used to match leading and trailing whitespace. */\nvar reTrim = /^\\s+|\\s+$/g;\n\n/** Used to detect bad signed hexadecimal string values. */\nvar reIsBadHex = /^[-+]0x[0-9a-f]+$/i;\n\n/** Used to detect binary string values. */\nvar reIsBinary = /^0b[01]+$/i;\n\n/** Used to detect octal string values. */\nvar reIsOctal = /^0o[0-7]+$/i;\n\n/** Built-in method references without a dependency on `root`. */\nvar freeParseInt = parseInt;\n\n/**\n * Converts `value` to a number.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to process.\n * @returns {number} Returns the number.\n * @example\n *\n * _.toNumber(3.2);\n * // => 3.2\n *\n * _.toNumber(Number.MIN_VALUE);\n * // => 5e-324\n *\n * _.toNumber(Infinity);\n * // => Infinity\n *\n * _.toNumber('3.2');\n * // => 3.2\n */\nfunction toNumber(value) {\n  if (typeof value == 'number') {\n    return value;\n  }\n  if (isSymbol(value)) {\n    return NAN;\n  }\n  if (isObject(value)) {\n    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;\n    value = isObject(other) ? (other + '') : other;\n  }\n  if (typeof value != 'string') {\n    return value === 0 ? value : +value;\n  }\n  value = value.replace(reTrim, '');\n  var isBinary = reIsBinary.test(value);\n  return (isBinary || reIsOctal.test(value))\n    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)\n    : (reIsBadHex.test(value) ? NAN : +value);\n}\n\nmodule.exports = toNumber;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/toNumber.js?");

/***/ }),

/***/ "./node_modules/lodash/toString.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseToString = __webpack_require__(/*! ./_baseToString */ \"./node_modules/lodash/_baseToString.js\");\n\n/**\n * Converts `value` to a string. An empty string is returned for `null`\n * and `undefined` values. The sign of `-0` is preserved.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n * @example\n *\n * _.toString(null);\n * // => ''\n *\n * _.toString(-0);\n * // => '-0'\n *\n * _.toString([1, 2, 3]);\n * // => '1,2,3'\n */\nfunction toString(value) {\n  return value == null ? '' : baseToString(value);\n}\n\nmodule.exports = toString;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/toString.js?");

/***/ }),

/***/ "./node_modules/lodash/uniqueId.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/uniqueId.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var toString = __webpack_require__(/*! ./toString */ \"./node_modules/lodash/toString.js\");\n\n/** Used to generate unique IDs. */\nvar idCounter = 0;\n\n/**\n * Generates a unique ID. If `prefix` is given, the ID is appended to it.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Util\n * @param {string} [prefix=''] The value to prefix the ID with.\n * @returns {string} Returns the unique ID.\n * @example\n *\n * _.uniqueId('contact_');\n * // => 'contact_104'\n *\n * _.uniqueId();\n * // => '105'\n */\nfunction uniqueId(prefix) {\n  var id = ++idCounter;\n  return toString(prefix) + id;\n}\n\nmodule.exports = uniqueId;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/uniqueId.js?");

/***/ }),

/***/ "./node_modules/lodash/wrapperLodash.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/wrapperLodash.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var LazyWrapper = __webpack_require__(/*! ./_LazyWrapper */ \"./node_modules/lodash/_LazyWrapper.js\"),\n    LodashWrapper = __webpack_require__(/*! ./_LodashWrapper */ \"./node_modules/lodash/_LodashWrapper.js\"),\n    baseLodash = __webpack_require__(/*! ./_baseLodash */ \"./node_modules/lodash/_baseLodash.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\"),\n    wrapperClone = __webpack_require__(/*! ./_wrapperClone */ \"./node_modules/lodash/_wrapperClone.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Creates a `lodash` object which wraps `value` to enable implicit method\n * chain sequences. Methods that operate on and return arrays, collections,\n * and functions can be chained together. Methods that retrieve a single value\n * or may return a primitive value will automatically end the chain sequence\n * and return the unwrapped value. Otherwise, the value must be unwrapped\n * with `_#value`.\n *\n * Explicit chain sequences, which must be unwrapped with `_#value`, may be\n * enabled using `_.chain`.\n *\n * The execution of chained methods is lazy, that is, it's deferred until\n * `_#value` is implicitly or explicitly called.\n *\n * Lazy evaluation allows several methods to support shortcut fusion.\n * Shortcut fusion is an optimization to merge iteratee calls; this avoids\n * the creation of intermediate arrays and can greatly reduce the number of\n * iteratee executions. Sections of a chain sequence qualify for shortcut\n * fusion if the section is applied to an array and iteratees accept only\n * one argument. The heuristic for whether a section qualifies for shortcut\n * fusion is subject to change.\n *\n * Chaining is supported in custom builds as long as the `_#value` method is\n * directly or indirectly included in the build.\n *\n * In addition to lodash methods, wrappers have `Array` and `String` methods.\n *\n * The wrapper `Array` methods are:\n * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`\n *\n * The wrapper `String` methods are:\n * `replace` and `split`\n *\n * The wrapper methods that support shortcut fusion are:\n * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,\n * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,\n * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`\n *\n * The chainable wrapper methods are:\n * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,\n * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,\n * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,\n * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,\n * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,\n * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,\n * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,\n * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,\n * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,\n * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,\n * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,\n * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,\n * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,\n * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,\n * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,\n * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,\n * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,\n * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,\n * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,\n * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,\n * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,\n * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,\n * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,\n * `zipObject`, `zipObjectDeep`, and `zipWith`\n *\n * The wrapper methods that are **not** chainable by default are:\n * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,\n * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,\n * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,\n * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,\n * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,\n * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,\n * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,\n * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,\n * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,\n * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,\n * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,\n * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,\n * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,\n * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,\n * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,\n * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,\n * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,\n * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,\n * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,\n * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,\n * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,\n * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,\n * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,\n * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,\n * `upperFirst`, `value`, and `words`\n *\n * @name _\n * @constructor\n * @category Seq\n * @param {*} value The value to wrap in a `lodash` instance.\n * @returns {Object} Returns the new `lodash` wrapper instance.\n * @example\n *\n * function square(n) {\n *   return n * n;\n * }\n *\n * var wrapped = _([1, 2, 3]);\n *\n * // Returns an unwrapped value.\n * wrapped.reduce(_.add);\n * // => 6\n *\n * // Returns a wrapped value.\n * var squares = wrapped.map(square);\n *\n * _.isArray(squares);\n * // => false\n *\n * _.isArray(squares.value());\n * // => true\n */\nfunction lodash(value) {\n  if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {\n    if (value instanceof LodashWrapper) {\n      return value;\n    }\n    if (hasOwnProperty.call(value, '__wrapped__')) {\n      return wrapperClone(value);\n    }\n  }\n  return new LodashWrapper(value);\n}\n\n// Ensure wrappers are instances of `baseLodash`.\nlodash.prototype = baseLodash.prototype;\nlodash.prototype.constructor = lodash;\n\nmodule.exports = lodash;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/lodash/wrapperLodash.js?");

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/*\nobject-assign\n(c) Sindre Sorhus\n@license MIT\n*/\n\n\n/* eslint-disable no-unused-vars */\nvar getOwnPropertySymbols = Object.getOwnPropertySymbols;\nvar hasOwnProperty = Object.prototype.hasOwnProperty;\nvar propIsEnumerable = Object.prototype.propertyIsEnumerable;\n\nfunction toObject(val) {\n\tif (val === null || val === undefined) {\n\t\tthrow new TypeError('Object.assign cannot be called with null or undefined');\n\t}\n\n\treturn Object(val);\n}\n\nfunction shouldUseNative() {\n\ttry {\n\t\tif (!Object.assign) {\n\t\t\treturn false;\n\t\t}\n\n\t\t// Detect buggy property enumeration order in older V8 versions.\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=4118\n\t\tvar test1 = new String('abc');  // eslint-disable-line no-new-wrappers\n\t\ttest1[5] = 'de';\n\t\tif (Object.getOwnPropertyNames(test1)[0] === '5') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test2 = {};\n\t\tfor (var i = 0; i < 10; i++) {\n\t\t\ttest2['_' + String.fromCharCode(i)] = i;\n\t\t}\n\t\tvar order2 = Object.getOwnPropertyNames(test2).map(function (n) {\n\t\t\treturn test2[n];\n\t\t});\n\t\tif (order2.join('') !== '0123456789') {\n\t\t\treturn false;\n\t\t}\n\n\t\t// https://bugs.chromium.org/p/v8/issues/detail?id=3056\n\t\tvar test3 = {};\n\t\t'abcdefghijklmnopqrst'.split('').forEach(function (letter) {\n\t\t\ttest3[letter] = letter;\n\t\t});\n\t\tif (Object.keys(Object.assign({}, test3)).join('') !==\n\t\t\t\t'abcdefghijklmnopqrst') {\n\t\t\treturn false;\n\t\t}\n\n\t\treturn true;\n\t} catch (err) {\n\t\t// We don't expect any of the above to throw, but better to be safe.\n\t\treturn false;\n\t}\n}\n\nmodule.exports = shouldUseNative() ? Object.assign : function (target, source) {\n\tvar from;\n\tvar to = toObject(target);\n\tvar symbols;\n\n\tfor (var s = 1; s < arguments.length; s++) {\n\t\tfrom = Object(arguments[s]);\n\n\t\tfor (var key in from) {\n\t\t\tif (hasOwnProperty.call(from, key)) {\n\t\t\t\tto[key] = from[key];\n\t\t\t}\n\t\t}\n\n\t\tif (getOwnPropertySymbols) {\n\t\t\tsymbols = getOwnPropertySymbols(from);\n\t\t\tfor (var i = 0; i < symbols.length; i++) {\n\t\t\t\tif (propIsEnumerable.call(from, symbols[i])) {\n\t\t\t\t\tto[symbols[i]] = from[symbols[i]];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn to;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/object-assign/index.js?");

/***/ }),

/***/ "./node_modules/popper.js/dist/esm/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/popper.js/dist/esm/popper.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global) {/**!\n * @fileOverview Kickass library to create and place poppers near their reference elements.\n * @version 1.14.3\n * @license\n * Copyright (c) 2016 Federico Zivolo and contributors\n *\n * Permission is hereby granted, free of charge, to any person obtaining a copy\n * of this software and associated documentation files (the \"Software\"), to deal\n * in the Software without restriction, including without limitation the rights\n * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\n * copies of the Software, and to permit persons to whom the Software is\n * furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in all\n * copies or substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\n * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\n * SOFTWARE.\n */\nvar isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';\n\nvar longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];\nvar timeoutDuration = 0;\nfor (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {\n  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {\n    timeoutDuration = 1;\n    break;\n  }\n}\n\nfunction microtaskDebounce(fn) {\n  var called = false;\n  return function () {\n    if (called) {\n      return;\n    }\n    called = true;\n    window.Promise.resolve().then(function () {\n      called = false;\n      fn();\n    });\n  };\n}\n\nfunction taskDebounce(fn) {\n  var scheduled = false;\n  return function () {\n    if (!scheduled) {\n      scheduled = true;\n      setTimeout(function () {\n        scheduled = false;\n        fn();\n      }, timeoutDuration);\n    }\n  };\n}\n\nvar supportsMicroTasks = isBrowser && window.Promise;\n\n/**\n* Create a debounced version of a method, that's asynchronously deferred\n* but called in the minimum time possible.\n*\n* @method\n* @memberof Popper.Utils\n* @argument {Function} fn\n* @returns {Function}\n*/\nvar debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;\n\n/**\n * Check if the given variable is a function\n * @method\n * @memberof Popper.Utils\n * @argument {Any} functionToCheck - variable to check\n * @returns {Boolean} answer to: is a function?\n */\nfunction isFunction(functionToCheck) {\n  var getType = {};\n  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';\n}\n\n/**\n * Get CSS computed property of the given element\n * @method\n * @memberof Popper.Utils\n * @argument {Eement} element\n * @argument {String} property\n */\nfunction getStyleComputedProperty(element, property) {\n  if (element.nodeType !== 1) {\n    return [];\n  }\n  // NOTE: 1 DOM access here\n  var css = getComputedStyle(element, null);\n  return property ? css[property] : css;\n}\n\n/**\n * Returns the parentNode or the host of the element\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element\n * @returns {Element} parent\n */\nfunction getParentNode(element) {\n  if (element.nodeName === 'HTML') {\n    return element;\n  }\n  return element.parentNode || element.host;\n}\n\n/**\n * Returns the scrolling parent of the given element\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element\n * @returns {Element} scroll parent\n */\nfunction getScrollParent(element) {\n  // Return body, `getScroll` will take care to get the correct `scrollTop` from it\n  if (!element) {\n    return document.body;\n  }\n\n  switch (element.nodeName) {\n    case 'HTML':\n    case 'BODY':\n      return element.ownerDocument.body;\n    case '#document':\n      return element.body;\n  }\n\n  // Firefox want us to check `-x` and `-y` variations as well\n\n  var _getStyleComputedProp = getStyleComputedProperty(element),\n      overflow = _getStyleComputedProp.overflow,\n      overflowX = _getStyleComputedProp.overflowX,\n      overflowY = _getStyleComputedProp.overflowY;\n\n  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {\n    return element;\n  }\n\n  return getScrollParent(getParentNode(element));\n}\n\nvar isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);\nvar isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);\n\n/**\n * Determines if the browser is Internet Explorer\n * @method\n * @memberof Popper.Utils\n * @param {Number} version to check\n * @returns {Boolean} isIE\n */\nfunction isIE(version) {\n  if (version === 11) {\n    return isIE11;\n  }\n  if (version === 10) {\n    return isIE10;\n  }\n  return isIE11 || isIE10;\n}\n\n/**\n * Returns the offset parent of the given element\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element\n * @returns {Element} offset parent\n */\nfunction getOffsetParent(element) {\n  if (!element) {\n    return document.documentElement;\n  }\n\n  var noOffsetParent = isIE(10) ? document.body : null;\n\n  // NOTE: 1 DOM access here\n  var offsetParent = element.offsetParent;\n  // Skip hidden elements which don't have an offsetParent\n  while (offsetParent === noOffsetParent && element.nextElementSibling) {\n    offsetParent = (element = element.nextElementSibling).offsetParent;\n  }\n\n  var nodeName = offsetParent && offsetParent.nodeName;\n\n  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {\n    return element ? element.ownerDocument.documentElement : document.documentElement;\n  }\n\n  // .offsetParent will return the closest TD or TABLE in case\n  // no offsetParent is present, I hate this job...\n  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {\n    return getOffsetParent(offsetParent);\n  }\n\n  return offsetParent;\n}\n\nfunction isOffsetContainer(element) {\n  var nodeName = element.nodeName;\n\n  if (nodeName === 'BODY') {\n    return false;\n  }\n  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;\n}\n\n/**\n * Finds the root node (document, shadowDOM root) of the given element\n * @method\n * @memberof Popper.Utils\n * @argument {Element} node\n * @returns {Element} root node\n */\nfunction getRoot(node) {\n  if (node.parentNode !== null) {\n    return getRoot(node.parentNode);\n  }\n\n  return node;\n}\n\n/**\n * Finds the offset parent common to the two provided nodes\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element1\n * @argument {Element} element2\n * @returns {Element} common offset parent\n */\nfunction findCommonOffsetParent(element1, element2) {\n  // This check is needed to avoid errors in case one of the elements isn't defined for any reason\n  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {\n    return document.documentElement;\n  }\n\n  // Here we make sure to give as \"start\" the element that comes first in the DOM\n  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;\n  var start = order ? element1 : element2;\n  var end = order ? element2 : element1;\n\n  // Get common ancestor container\n  var range = document.createRange();\n  range.setStart(start, 0);\n  range.setEnd(end, 0);\n  var commonAncestorContainer = range.commonAncestorContainer;\n\n  // Both nodes are inside #document\n\n  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {\n    if (isOffsetContainer(commonAncestorContainer)) {\n      return commonAncestorContainer;\n    }\n\n    return getOffsetParent(commonAncestorContainer);\n  }\n\n  // one of the nodes is inside shadowDOM, find which one\n  var element1root = getRoot(element1);\n  if (element1root.host) {\n    return findCommonOffsetParent(element1root.host, element2);\n  } else {\n    return findCommonOffsetParent(element1, getRoot(element2).host);\n  }\n}\n\n/**\n * Gets the scroll value of the given element in the given side (top and left)\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element\n * @argument {String} side `top` or `left`\n * @returns {number} amount of scrolled pixels\n */\nfunction getScroll(element) {\n  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';\n\n  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';\n  var nodeName = element.nodeName;\n\n  if (nodeName === 'BODY' || nodeName === 'HTML') {\n    var html = element.ownerDocument.documentElement;\n    var scrollingElement = element.ownerDocument.scrollingElement || html;\n    return scrollingElement[upperSide];\n  }\n\n  return element[upperSide];\n}\n\n/*\n * Sum or subtract the element scroll values (left and top) from a given rect object\n * @method\n * @memberof Popper.Utils\n * @param {Object} rect - Rect object you want to change\n * @param {HTMLElement} element - The element from the function reads the scroll values\n * @param {Boolean} subtract - set to true if you want to subtract the scroll values\n * @return {Object} rect - The modifier rect object\n */\nfunction includeScroll(rect, element) {\n  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n\n  var scrollTop = getScroll(element, 'top');\n  var scrollLeft = getScroll(element, 'left');\n  var modifier = subtract ? -1 : 1;\n  rect.top += scrollTop * modifier;\n  rect.bottom += scrollTop * modifier;\n  rect.left += scrollLeft * modifier;\n  rect.right += scrollLeft * modifier;\n  return rect;\n}\n\n/*\n * Helper to detect borders of a given element\n * @method\n * @memberof Popper.Utils\n * @param {CSSStyleDeclaration} styles\n * Result of `getStyleComputedProperty` on the given element\n * @param {String} axis - `x` or `y`\n * @return {number} borders - The borders size of the given axis\n */\n\nfunction getBordersSize(styles, axis) {\n  var sideA = axis === 'x' ? 'Left' : 'Top';\n  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';\n\n  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);\n}\n\nfunction getSize(axis, body, html, computedStyle) {\n  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);\n}\n\nfunction getWindowSizes() {\n  var body = document.body;\n  var html = document.documentElement;\n  var computedStyle = isIE(10) && getComputedStyle(html);\n\n  return {\n    height: getSize('Height', body, html, computedStyle),\n    width: getSize('Width', body, html, computedStyle)\n  };\n}\n\nvar classCallCheck = function (instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n};\n\nvar createClass = function () {\n  function defineProperties(target, props) {\n    for (var i = 0; i < props.length; i++) {\n      var descriptor = props[i];\n      descriptor.enumerable = descriptor.enumerable || false;\n      descriptor.configurable = true;\n      if (\"value\" in descriptor) descriptor.writable = true;\n      Object.defineProperty(target, descriptor.key, descriptor);\n    }\n  }\n\n  return function (Constructor, protoProps, staticProps) {\n    if (protoProps) defineProperties(Constructor.prototype, protoProps);\n    if (staticProps) defineProperties(Constructor, staticProps);\n    return Constructor;\n  };\n}();\n\n\n\n\n\nvar defineProperty = function (obj, key, value) {\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n\n  return obj;\n};\n\nvar _extends = Object.assign || function (target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = arguments[i];\n\n    for (var key in source) {\n      if (Object.prototype.hasOwnProperty.call(source, key)) {\n        target[key] = source[key];\n      }\n    }\n  }\n\n  return target;\n};\n\n/**\n * Given element offsets, generate an output similar to getBoundingClientRect\n * @method\n * @memberof Popper.Utils\n * @argument {Object} offsets\n * @returns {Object} ClientRect like output\n */\nfunction getClientRect(offsets) {\n  return _extends({}, offsets, {\n    right: offsets.left + offsets.width,\n    bottom: offsets.top + offsets.height\n  });\n}\n\n/**\n * Get bounding client rect of given element\n * @method\n * @memberof Popper.Utils\n * @param {HTMLElement} element\n * @return {Object} client rect\n */\nfunction getBoundingClientRect(element) {\n  var rect = {};\n\n  // IE10 10 FIX: Please, don't ask, the element isn't\n  // considered in DOM in some circumstances...\n  // This isn't reproducible in IE10 compatibility mode of IE11\n  try {\n    if (isIE(10)) {\n      rect = element.getBoundingClientRect();\n      var scrollTop = getScroll(element, 'top');\n      var scrollLeft = getScroll(element, 'left');\n      rect.top += scrollTop;\n      rect.left += scrollLeft;\n      rect.bottom += scrollTop;\n      rect.right += scrollLeft;\n    } else {\n      rect = element.getBoundingClientRect();\n    }\n  } catch (e) {}\n\n  var result = {\n    left: rect.left,\n    top: rect.top,\n    width: rect.right - rect.left,\n    height: rect.bottom - rect.top\n  };\n\n  // subtract scrollbar size from sizes\n  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};\n  var width = sizes.width || element.clientWidth || result.right - result.left;\n  var height = sizes.height || element.clientHeight || result.bottom - result.top;\n\n  var horizScrollbar = element.offsetWidth - width;\n  var vertScrollbar = element.offsetHeight - height;\n\n  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`\n  // we make this check conditional for performance reasons\n  if (horizScrollbar || vertScrollbar) {\n    var styles = getStyleComputedProperty(element);\n    horizScrollbar -= getBordersSize(styles, 'x');\n    vertScrollbar -= getBordersSize(styles, 'y');\n\n    result.width -= horizScrollbar;\n    result.height -= vertScrollbar;\n  }\n\n  return getClientRect(result);\n}\n\nfunction getOffsetRectRelativeToArbitraryNode(children, parent) {\n  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n\n  var isIE10 = isIE(10);\n  var isHTML = parent.nodeName === 'HTML';\n  var childrenRect = getBoundingClientRect(children);\n  var parentRect = getBoundingClientRect(parent);\n  var scrollParent = getScrollParent(children);\n\n  var styles = getStyleComputedProperty(parent);\n  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);\n  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);\n\n  // In cases where the parent is fixed, we must ignore negative scroll in offset calc\n  if (fixedPosition && parent.nodeName === 'HTML') {\n    parentRect.top = Math.max(parentRect.top, 0);\n    parentRect.left = Math.max(parentRect.left, 0);\n  }\n  var offsets = getClientRect({\n    top: childrenRect.top - parentRect.top - borderTopWidth,\n    left: childrenRect.left - parentRect.left - borderLeftWidth,\n    width: childrenRect.width,\n    height: childrenRect.height\n  });\n  offsets.marginTop = 0;\n  offsets.marginLeft = 0;\n\n  // Subtract margins of documentElement in case it's being used as parent\n  // we do this only on HTML because it's the only element that behaves\n  // differently when margins are applied to it. The margins are included in\n  // the box of the documentElement, in the other cases not.\n  if (!isIE10 && isHTML) {\n    var marginTop = parseFloat(styles.marginTop, 10);\n    var marginLeft = parseFloat(styles.marginLeft, 10);\n\n    offsets.top -= borderTopWidth - marginTop;\n    offsets.bottom -= borderTopWidth - marginTop;\n    offsets.left -= borderLeftWidth - marginLeft;\n    offsets.right -= borderLeftWidth - marginLeft;\n\n    // Attach marginTop and marginLeft because in some circumstances we may need them\n    offsets.marginTop = marginTop;\n    offsets.marginLeft = marginLeft;\n  }\n\n  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {\n    offsets = includeScroll(offsets, parent);\n  }\n\n  return offsets;\n}\n\nfunction getViewportOffsetRectRelativeToArtbitraryNode(element) {\n  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n\n  var html = element.ownerDocument.documentElement;\n  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);\n  var width = Math.max(html.clientWidth, window.innerWidth || 0);\n  var height = Math.max(html.clientHeight, window.innerHeight || 0);\n\n  var scrollTop = !excludeScroll ? getScroll(html) : 0;\n  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;\n\n  var offset = {\n    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,\n    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,\n    width: width,\n    height: height\n  };\n\n  return getClientRect(offset);\n}\n\n/**\n * Check if the given element is fixed or is inside a fixed parent\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element\n * @argument {Element} customContainer\n * @returns {Boolean} answer to \"isFixed?\"\n */\nfunction isFixed(element) {\n  var nodeName = element.nodeName;\n  if (nodeName === 'BODY' || nodeName === 'HTML') {\n    return false;\n  }\n  if (getStyleComputedProperty(element, 'position') === 'fixed') {\n    return true;\n  }\n  return isFixed(getParentNode(element));\n}\n\n/**\n * Finds the first parent of an element that has a transformed property defined\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element\n * @returns {Element} first transformed parent or documentElement\n */\n\nfunction getFixedPositionOffsetParent(element) {\n  // This check is needed to avoid errors in case one of the elements isn't defined for any reason\n  if (!element || !element.parentElement || isIE()) {\n    return document.documentElement;\n  }\n  var el = element.parentElement;\n  while (el && getStyleComputedProperty(el, 'transform') === 'none') {\n    el = el.parentElement;\n  }\n  return el || document.documentElement;\n}\n\n/**\n * Computed the boundaries limits and return them\n * @method\n * @memberof Popper.Utils\n * @param {HTMLElement} popper\n * @param {HTMLElement} reference\n * @param {number} padding\n * @param {HTMLElement} boundariesElement - Element used to define the boundaries\n * @param {Boolean} fixedPosition - Is in fixed position mode\n * @returns {Object} Coordinates of the boundaries\n */\nfunction getBoundaries(popper, reference, padding, boundariesElement) {\n  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;\n\n  // NOTE: 1 DOM access here\n\n  var boundaries = { top: 0, left: 0 };\n  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);\n\n  // Handle viewport case\n  if (boundariesElement === 'viewport') {\n    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);\n  } else {\n    // Handle other cases based on DOM element used as boundaries\n    var boundariesNode = void 0;\n    if (boundariesElement === 'scrollParent') {\n      boundariesNode = getScrollParent(getParentNode(reference));\n      if (boundariesNode.nodeName === 'BODY') {\n        boundariesNode = popper.ownerDocument.documentElement;\n      }\n    } else if (boundariesElement === 'window') {\n      boundariesNode = popper.ownerDocument.documentElement;\n    } else {\n      boundariesNode = boundariesElement;\n    }\n\n    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);\n\n    // In case of HTML, we need a different computation\n    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {\n      var _getWindowSizes = getWindowSizes(),\n          height = _getWindowSizes.height,\n          width = _getWindowSizes.width;\n\n      boundaries.top += offsets.top - offsets.marginTop;\n      boundaries.bottom = height + offsets.top;\n      boundaries.left += offsets.left - offsets.marginLeft;\n      boundaries.right = width + offsets.left;\n    } else {\n      // for all the other DOM elements, this one is good\n      boundaries = offsets;\n    }\n  }\n\n  // Add paddings\n  boundaries.left += padding;\n  boundaries.top += padding;\n  boundaries.right -= padding;\n  boundaries.bottom -= padding;\n\n  return boundaries;\n}\n\nfunction getArea(_ref) {\n  var width = _ref.width,\n      height = _ref.height;\n\n  return width * height;\n}\n\n/**\n * Utility used to transform the `auto` placement to the placement with more\n * available space.\n * @method\n * @memberof Popper.Utils\n * @argument {Object} data - The data object generated by update method\n * @argument {Object} options - Modifiers configuration and options\n * @returns {Object} The data object, properly modified\n */\nfunction computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {\n  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;\n\n  if (placement.indexOf('auto') === -1) {\n    return placement;\n  }\n\n  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);\n\n  var rects = {\n    top: {\n      width: boundaries.width,\n      height: refRect.top - boundaries.top\n    },\n    right: {\n      width: boundaries.right - refRect.right,\n      height: boundaries.height\n    },\n    bottom: {\n      width: boundaries.width,\n      height: boundaries.bottom - refRect.bottom\n    },\n    left: {\n      width: refRect.left - boundaries.left,\n      height: boundaries.height\n    }\n  };\n\n  var sortedAreas = Object.keys(rects).map(function (key) {\n    return _extends({\n      key: key\n    }, rects[key], {\n      area: getArea(rects[key])\n    });\n  }).sort(function (a, b) {\n    return b.area - a.area;\n  });\n\n  var filteredAreas = sortedAreas.filter(function (_ref2) {\n    var width = _ref2.width,\n        height = _ref2.height;\n    return width >= popper.clientWidth && height >= popper.clientHeight;\n  });\n\n  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;\n\n  var variation = placement.split('-')[1];\n\n  return computedPlacement + (variation ? '-' + variation : '');\n}\n\n/**\n * Get offsets to the reference element\n * @method\n * @memberof Popper.Utils\n * @param {Object} state\n * @param {Element} popper - the popper element\n * @param {Element} reference - the reference element (the popper will be relative to this)\n * @param {Element} fixedPosition - is in fixed position mode\n * @returns {Object} An object containing the offsets which will be applied to the popper\n */\nfunction getReferenceOffsets(state, popper, reference) {\n  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;\n\n  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);\n  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);\n}\n\n/**\n * Get the outer sizes of the given element (offset size + margins)\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element\n * @returns {Object} object containing width and height properties\n */\nfunction getOuterSizes(element) {\n  var styles = getComputedStyle(element);\n  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);\n  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);\n  var result = {\n    width: element.offsetWidth + y,\n    height: element.offsetHeight + x\n  };\n  return result;\n}\n\n/**\n * Get the opposite placement of the given one\n * @method\n * @memberof Popper.Utils\n * @argument {String} placement\n * @returns {String} flipped placement\n */\nfunction getOppositePlacement(placement) {\n  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };\n  return placement.replace(/left|right|bottom|top/g, function (matched) {\n    return hash[matched];\n  });\n}\n\n/**\n * Get offsets to the popper\n * @method\n * @memberof Popper.Utils\n * @param {Object} position - CSS position the Popper will get applied\n * @param {HTMLElement} popper - the popper element\n * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)\n * @param {String} placement - one of the valid placement options\n * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper\n */\nfunction getPopperOffsets(popper, referenceOffsets, placement) {\n  placement = placement.split('-')[0];\n\n  // Get popper node sizes\n  var popperRect = getOuterSizes(popper);\n\n  // Add position, width and height to our offsets object\n  var popperOffsets = {\n    width: popperRect.width,\n    height: popperRect.height\n  };\n\n  // depending by the popper placement we have to compute its offsets slightly differently\n  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;\n  var mainSide = isHoriz ? 'top' : 'left';\n  var secondarySide = isHoriz ? 'left' : 'top';\n  var measurement = isHoriz ? 'height' : 'width';\n  var secondaryMeasurement = !isHoriz ? 'height' : 'width';\n\n  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;\n  if (placement === secondarySide) {\n    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];\n  } else {\n    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];\n  }\n\n  return popperOffsets;\n}\n\n/**\n * Mimics the `find` method of Array\n * @method\n * @memberof Popper.Utils\n * @argument {Array} arr\n * @argument prop\n * @argument value\n * @returns index or -1\n */\nfunction find(arr, check) {\n  // use native find if supported\n  if (Array.prototype.find) {\n    return arr.find(check);\n  }\n\n  // use `filter` to obtain the same behavior of `find`\n  return arr.filter(check)[0];\n}\n\n/**\n * Return the index of the matching object\n * @method\n * @memberof Popper.Utils\n * @argument {Array} arr\n * @argument prop\n * @argument value\n * @returns index or -1\n */\nfunction findIndex(arr, prop, value) {\n  // use native findIndex if supported\n  if (Array.prototype.findIndex) {\n    return arr.findIndex(function (cur) {\n      return cur[prop] === value;\n    });\n  }\n\n  // use `find` + `indexOf` if `findIndex` isn't supported\n  var match = find(arr, function (obj) {\n    return obj[prop] === value;\n  });\n  return arr.indexOf(match);\n}\n\n/**\n * Loop trough the list of modifiers and run them in order,\n * each of them will then edit the data object.\n * @method\n * @memberof Popper.Utils\n * @param {dataObject} data\n * @param {Array} modifiers\n * @param {String} ends - Optional modifier name used as stopper\n * @returns {dataObject}\n */\nfunction runModifiers(modifiers, data, ends) {\n  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));\n\n  modifiersToRun.forEach(function (modifier) {\n    if (modifier['function']) {\n      // eslint-disable-line dot-notation\n      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');\n    }\n    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation\n    if (modifier.enabled && isFunction(fn)) {\n      // Add properties to offsets to make them a complete clientRect object\n      // we do this before each modifier to make sure the previous one doesn't\n      // mess with these values\n      data.offsets.popper = getClientRect(data.offsets.popper);\n      data.offsets.reference = getClientRect(data.offsets.reference);\n\n      data = fn(data, modifier);\n    }\n  });\n\n  return data;\n}\n\n/**\n * Updates the position of the popper, computing the new offsets and applying\n * the new style.<br />\n * Prefer `scheduleUpdate` over `update` because of performance reasons.\n * @method\n * @memberof Popper\n */\nfunction update() {\n  // if popper is destroyed, don't perform any further update\n  if (this.state.isDestroyed) {\n    return;\n  }\n\n  var data = {\n    instance: this,\n    styles: {},\n    arrowStyles: {},\n    attributes: {},\n    flipped: false,\n    offsets: {}\n  };\n\n  // compute reference element offsets\n  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);\n\n  // compute auto placement, store placement inside the data object,\n  // modifiers will be able to edit `placement` if needed\n  // and refer to originalPlacement to know the original value\n  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);\n\n  // store the computed placement inside `originalPlacement`\n  data.originalPlacement = data.placement;\n\n  data.positionFixed = this.options.positionFixed;\n\n  // compute the popper offsets\n  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);\n\n  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';\n\n  // run the modifiers\n  data = runModifiers(this.modifiers, data);\n\n  // the first `update` will call `onCreate` callback\n  // the other ones will call `onUpdate` callback\n  if (!this.state.isCreated) {\n    this.state.isCreated = true;\n    this.options.onCreate(data);\n  } else {\n    this.options.onUpdate(data);\n  }\n}\n\n/**\n * Helper used to know if the given modifier is enabled.\n * @method\n * @memberof Popper.Utils\n * @returns {Boolean}\n */\nfunction isModifierEnabled(modifiers, modifierName) {\n  return modifiers.some(function (_ref) {\n    var name = _ref.name,\n        enabled = _ref.enabled;\n    return enabled && name === modifierName;\n  });\n}\n\n/**\n * Get the prefixed supported property name\n * @method\n * @memberof Popper.Utils\n * @argument {String} property (camelCase)\n * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)\n */\nfunction getSupportedPropertyName(property) {\n  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];\n  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);\n\n  for (var i = 0; i < prefixes.length; i++) {\n    var prefix = prefixes[i];\n    var toCheck = prefix ? '' + prefix + upperProp : property;\n    if (typeof document.body.style[toCheck] !== 'undefined') {\n      return toCheck;\n    }\n  }\n  return null;\n}\n\n/**\n * Destroy the popper\n * @method\n * @memberof Popper\n */\nfunction destroy() {\n  this.state.isDestroyed = true;\n\n  // touch DOM only if `applyStyle` modifier is enabled\n  if (isModifierEnabled(this.modifiers, 'applyStyle')) {\n    this.popper.removeAttribute('x-placement');\n    this.popper.style.position = '';\n    this.popper.style.top = '';\n    this.popper.style.left = '';\n    this.popper.style.right = '';\n    this.popper.style.bottom = '';\n    this.popper.style.willChange = '';\n    this.popper.style[getSupportedPropertyName('transform')] = '';\n  }\n\n  this.disableEventListeners();\n\n  // remove the popper if user explicity asked for the deletion on destroy\n  // do not use `remove` because IE11 doesn't support it\n  if (this.options.removeOnDestroy) {\n    this.popper.parentNode.removeChild(this.popper);\n  }\n  return this;\n}\n\n/**\n * Get the window associated with the element\n * @argument {Element} element\n * @returns {Window}\n */\nfunction getWindow(element) {\n  var ownerDocument = element.ownerDocument;\n  return ownerDocument ? ownerDocument.defaultView : window;\n}\n\nfunction attachToScrollParents(scrollParent, event, callback, scrollParents) {\n  var isBody = scrollParent.nodeName === 'BODY';\n  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;\n  target.addEventListener(event, callback, { passive: true });\n\n  if (!isBody) {\n    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);\n  }\n  scrollParents.push(target);\n}\n\n/**\n * Setup needed event listeners used to update the popper position\n * @method\n * @memberof Popper.Utils\n * @private\n */\nfunction setupEventListeners(reference, options, state, updateBound) {\n  // Resize event listener on window\n  state.updateBound = updateBound;\n  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });\n\n  // Scroll event listener on scroll parents\n  var scrollElement = getScrollParent(reference);\n  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);\n  state.scrollElement = scrollElement;\n  state.eventsEnabled = true;\n\n  return state;\n}\n\n/**\n * It will add resize/scroll events and start recalculating\n * position of the popper element when they are triggered.\n * @method\n * @memberof Popper\n */\nfunction enableEventListeners() {\n  if (!this.state.eventsEnabled) {\n    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);\n  }\n}\n\n/**\n * Remove event listeners used to update the popper position\n * @method\n * @memberof Popper.Utils\n * @private\n */\nfunction removeEventListeners(reference, state) {\n  // Remove resize event listener on window\n  getWindow(reference).removeEventListener('resize', state.updateBound);\n\n  // Remove scroll event listener on scroll parents\n  state.scrollParents.forEach(function (target) {\n    target.removeEventListener('scroll', state.updateBound);\n  });\n\n  // Reset state\n  state.updateBound = null;\n  state.scrollParents = [];\n  state.scrollElement = null;\n  state.eventsEnabled = false;\n  return state;\n}\n\n/**\n * It will remove resize/scroll events and won't recalculate popper position\n * when they are triggered. It also won't trigger onUpdate callback anymore,\n * unless you call `update` method manually.\n * @method\n * @memberof Popper\n */\nfunction disableEventListeners() {\n  if (this.state.eventsEnabled) {\n    cancelAnimationFrame(this.scheduleUpdate);\n    this.state = removeEventListeners(this.reference, this.state);\n  }\n}\n\n/**\n * Tells if a given input is a number\n * @method\n * @memberof Popper.Utils\n * @param {*} input to check\n * @return {Boolean}\n */\nfunction isNumeric(n) {\n  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);\n}\n\n/**\n * Set the style to the given popper\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element - Element to apply the style to\n * @argument {Object} styles\n * Object with a list of properties and values which will be applied to the element\n */\nfunction setStyles(element, styles) {\n  Object.keys(styles).forEach(function (prop) {\n    var unit = '';\n    // add unit if the value is numeric and is one of the following\n    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {\n      unit = 'px';\n    }\n    element.style[prop] = styles[prop] + unit;\n  });\n}\n\n/**\n * Set the attributes to the given popper\n * @method\n * @memberof Popper.Utils\n * @argument {Element} element - Element to apply the attributes to\n * @argument {Object} styles\n * Object with a list of properties and values which will be applied to the element\n */\nfunction setAttributes(element, attributes) {\n  Object.keys(attributes).forEach(function (prop) {\n    var value = attributes[prop];\n    if (value !== false) {\n      element.setAttribute(prop, attributes[prop]);\n    } else {\n      element.removeAttribute(prop);\n    }\n  });\n}\n\n/**\n * @function\n * @memberof Modifiers\n * @argument {Object} data - The data object generated by `update` method\n * @argument {Object} data.styles - List of style properties - values to apply to popper element\n * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element\n * @argument {Object} options - Modifiers configuration and options\n * @returns {Object} The same data object\n */\nfunction applyStyle(data) {\n  // any property present in `data.styles` will be applied to the popper,\n  // in this way we can make the 3rd party modifiers add custom styles to it\n  // Be aware, modifiers could override the properties defined in the previous\n  // lines of this modifier!\n  setStyles(data.instance.popper, data.styles);\n\n  // any property present in `data.attributes` will be applied to the popper,\n  // they will be set as HTML attributes of the element\n  setAttributes(data.instance.popper, data.attributes);\n\n  // if arrowElement is defined and arrowStyles has some properties\n  if (data.arrowElement && Object.keys(data.arrowStyles).length) {\n    setStyles(data.arrowElement, data.arrowStyles);\n  }\n\n  return data;\n}\n\n/**\n * Set the x-placement attribute before everything else because it could be used\n * to add margins to the popper margins needs to be calculated to get the\n * correct popper offsets.\n * @method\n * @memberof Popper.modifiers\n * @param {HTMLElement} reference - The reference element used to position the popper\n * @param {HTMLElement} popper - The HTML element used as popper\n * @param {Object} options - Popper.js options\n */\nfunction applyStyleOnLoad(reference, popper, options, modifierOptions, state) {\n  // compute reference element offsets\n  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);\n\n  // compute auto placement, store placement inside the data object,\n  // modifiers will be able to edit `placement` if needed\n  // and refer to originalPlacement to know the original value\n  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);\n\n  popper.setAttribute('x-placement', placement);\n\n  // Apply `position` to popper before anything else because\n  // without the position applied we can't guarantee correct computations\n  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });\n\n  return options;\n}\n\n/**\n * @function\n * @memberof Modifiers\n * @argument {Object} data - The data object generated by `update` method\n * @argument {Object} options - Modifiers configuration and options\n * @returns {Object} The data object, properly modified\n */\nfunction computeStyle(data, options) {\n  var x = options.x,\n      y = options.y;\n  var popper = data.offsets.popper;\n\n  // Remove this legacy support in Popper.js v2\n\n  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {\n    return modifier.name === 'applyStyle';\n  }).gpuAcceleration;\n  if (legacyGpuAccelerationOption !== undefined) {\n    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');\n  }\n  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;\n\n  var offsetParent = getOffsetParent(data.instance.popper);\n  var offsetParentRect = getBoundingClientRect(offsetParent);\n\n  // Styles\n  var styles = {\n    position: popper.position\n  };\n\n  // Avoid blurry text by using full pixel integers.\n  // For pixel-perfect positioning, top/bottom prefers rounded\n  // values, while left/right prefers floored values.\n  var offsets = {\n    left: Math.floor(popper.left),\n    top: Math.round(popper.top),\n    bottom: Math.round(popper.bottom),\n    right: Math.floor(popper.right)\n  };\n\n  var sideA = x === 'bottom' ? 'top' : 'bottom';\n  var sideB = y === 'right' ? 'left' : 'right';\n\n  // if gpuAcceleration is set to `true` and transform is supported,\n  //  we use `translate3d` to apply the position to the popper we\n  // automatically use the supported prefixed version if needed\n  var prefixedProperty = getSupportedPropertyName('transform');\n\n  // now, let's make a step back and look at this code closely (wtf?)\n  // If the content of the popper grows once it's been positioned, it\n  // may happen that the popper gets misplaced because of the new content\n  // overflowing its reference element\n  // To avoid this problem, we provide two options (x and y), which allow\n  // the consumer to define the offset origin.\n  // If we position a popper on top of a reference element, we can set\n  // `x` to `top` to make the popper grow towards its top instead of\n  // its bottom.\n  var left = void 0,\n      top = void 0;\n  if (sideA === 'bottom') {\n    top = -offsetParentRect.height + offsets.bottom;\n  } else {\n    top = offsets.top;\n  }\n  if (sideB === 'right') {\n    left = -offsetParentRect.width + offsets.right;\n  } else {\n    left = offsets.left;\n  }\n  if (gpuAcceleration && prefixedProperty) {\n    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';\n    styles[sideA] = 0;\n    styles[sideB] = 0;\n    styles.willChange = 'transform';\n  } else {\n    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties\n    var invertTop = sideA === 'bottom' ? -1 : 1;\n    var invertLeft = sideB === 'right' ? -1 : 1;\n    styles[sideA] = top * invertTop;\n    styles[sideB] = left * invertLeft;\n    styles.willChange = sideA + ', ' + sideB;\n  }\n\n  // Attributes\n  var attributes = {\n    'x-placement': data.placement\n  };\n\n  // Update `data` attributes, styles and arrowStyles\n  data.attributes = _extends({}, attributes, data.attributes);\n  data.styles = _extends({}, styles, data.styles);\n  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);\n\n  return data;\n}\n\n/**\n * Helper used to know if the given modifier depends from another one.<br />\n * It checks if the needed modifier is listed and enabled.\n * @method\n * @memberof Popper.Utils\n * @param {Array} modifiers - list of modifiers\n * @param {String} requestingName - name of requesting modifier\n * @param {String} requestedName - name of requested modifier\n * @returns {Boolean}\n */\nfunction isModifierRequired(modifiers, requestingName, requestedName) {\n  var requesting = find(modifiers, function (_ref) {\n    var name = _ref.name;\n    return name === requestingName;\n  });\n\n  var isRequired = !!requesting && modifiers.some(function (modifier) {\n    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;\n  });\n\n  if (!isRequired) {\n    var _requesting = '`' + requestingName + '`';\n    var requested = '`' + requestedName + '`';\n    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');\n  }\n  return isRequired;\n}\n\n/**\n * @function\n * @memberof Modifiers\n * @argument {Object} data - The data object generated by update method\n * @argument {Object} options - Modifiers configuration and options\n * @returns {Object} The data object, properly modified\n */\nfunction arrow(data, options) {\n  var _data$offsets$arrow;\n\n  // arrow depends on keepTogether in order to work\n  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {\n    return data;\n  }\n\n  var arrowElement = options.element;\n\n  // if arrowElement is a string, suppose it's a CSS selector\n  if (typeof arrowElement === 'string') {\n    arrowElement = data.instance.popper.querySelector(arrowElement);\n\n    // if arrowElement is not found, don't run the modifier\n    if (!arrowElement) {\n      return data;\n    }\n  } else {\n    // if the arrowElement isn't a query selector we must check that the\n    // provided DOM node is child of its popper node\n    if (!data.instance.popper.contains(arrowElement)) {\n      console.warn('WARNING: `arrow.element` must be child of its popper element!');\n      return data;\n    }\n  }\n\n  var placement = data.placement.split('-')[0];\n  var _data$offsets = data.offsets,\n      popper = _data$offsets.popper,\n      reference = _data$offsets.reference;\n\n  var isVertical = ['left', 'right'].indexOf(placement) !== -1;\n\n  var len = isVertical ? 'height' : 'width';\n  var sideCapitalized = isVertical ? 'Top' : 'Left';\n  var side = sideCapitalized.toLowerCase();\n  var altSide = isVertical ? 'left' : 'top';\n  var opSide = isVertical ? 'bottom' : 'right';\n  var arrowElementSize = getOuterSizes(arrowElement)[len];\n\n  //\n  // extends keepTogether behavior making sure the popper and its\n  // reference have enough pixels in conjuction\n  //\n\n  // top/left side\n  if (reference[opSide] - arrowElementSize < popper[side]) {\n    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);\n  }\n  // bottom/right side\n  if (reference[side] + arrowElementSize > popper[opSide]) {\n    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];\n  }\n  data.offsets.popper = getClientRect(data.offsets.popper);\n\n  // compute center of the popper\n  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;\n\n  // Compute the sideValue using the updated popper offsets\n  // take popper margin in account because we don't have this info available\n  var css = getStyleComputedProperty(data.instance.popper);\n  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);\n  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);\n  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;\n\n  // prevent arrowElement from being placed not contiguously to its popper\n  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);\n\n  data.arrowElement = arrowElement;\n  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);\n\n  return data;\n}\n\n/**\n * Get the opposite placement variation of the given one\n * @method\n * @memberof Popper.Utils\n * @argument {String} placement variation\n * @returns {String} flipped placement variation\n */\nfunction getOppositeVariation(variation) {\n  if (variation === 'end') {\n    return 'start';\n  } else if (variation === 'start') {\n    return 'end';\n  }\n  return variation;\n}\n\n/**\n * List of accepted placements to use as values of the `placement` option.<br />\n * Valid placements are:\n * - `auto`\n * - `top`\n * - `right`\n * - `bottom`\n * - `left`\n *\n * Each placement can have a variation from this list:\n * - `-start`\n * - `-end`\n *\n * Variations are interpreted easily if you think of them as the left to right\n * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`\n * is right.<br />\n * Vertically (`left` and `right`), `start` is top and `end` is bottom.\n *\n * Some valid examples are:\n * - `top-end` (on top of reference, right aligned)\n * - `right-start` (on right of reference, top aligned)\n * - `bottom` (on bottom, centered)\n * - `auto-right` (on the side with more space available, alignment depends by placement)\n *\n * @static\n * @type {Array}\n * @enum {String}\n * @readonly\n * @method placements\n * @memberof Popper\n */\nvar placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];\n\n// Get rid of `auto` `auto-start` and `auto-end`\nvar validPlacements = placements.slice(3);\n\n/**\n * Given an initial placement, returns all the subsequent placements\n * clockwise (or counter-clockwise).\n *\n * @method\n * @memberof Popper.Utils\n * @argument {String} placement - A valid placement (it accepts variations)\n * @argument {Boolean} counter - Set to true to walk the placements counterclockwise\n * @returns {Array} placements including their variations\n */\nfunction clockwise(placement) {\n  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n\n  var index = validPlacements.indexOf(placement);\n  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));\n  return counter ? arr.reverse() : arr;\n}\n\nvar BEHAVIORS = {\n  FLIP: 'flip',\n  CLOCKWISE: 'clockwise',\n  COUNTERCLOCKWISE: 'counterclockwise'\n};\n\n/**\n * @function\n * @memberof Modifiers\n * @argument {Object} data - The data object generated by update method\n * @argument {Object} options - Modifiers configuration and options\n * @returns {Object} The data object, properly modified\n */\nfunction flip(data, options) {\n  // if `inner` modifier is enabled, we can't use the `flip` modifier\n  if (isModifierEnabled(data.instance.modifiers, 'inner')) {\n    return data;\n  }\n\n  if (data.flipped && data.placement === data.originalPlacement) {\n    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides\n    return data;\n  }\n\n  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);\n\n  var placement = data.placement.split('-')[0];\n  var placementOpposite = getOppositePlacement(placement);\n  var variation = data.placement.split('-')[1] || '';\n\n  var flipOrder = [];\n\n  switch (options.behavior) {\n    case BEHAVIORS.FLIP:\n      flipOrder = [placement, placementOpposite];\n      break;\n    case BEHAVIORS.CLOCKWISE:\n      flipOrder = clockwise(placement);\n      break;\n    case BEHAVIORS.COUNTERCLOCKWISE:\n      flipOrder = clockwise(placement, true);\n      break;\n    default:\n      flipOrder = options.behavior;\n  }\n\n  flipOrder.forEach(function (step, index) {\n    if (placement !== step || flipOrder.length === index + 1) {\n      return data;\n    }\n\n    placement = data.placement.split('-')[0];\n    placementOpposite = getOppositePlacement(placement);\n\n    var popperOffsets = data.offsets.popper;\n    var refOffsets = data.offsets.reference;\n\n    // using floor because the reference offsets may contain decimals we are not going to consider here\n    var floor = Math.floor;\n    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);\n\n    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);\n    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);\n    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);\n    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);\n\n    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;\n\n    // flip the variation if required\n    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;\n    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);\n\n    if (overlapsRef || overflowsBoundaries || flippedVariation) {\n      // this boolean to detect any flip loop\n      data.flipped = true;\n\n      if (overlapsRef || overflowsBoundaries) {\n        placement = flipOrder[index + 1];\n      }\n\n      if (flippedVariation) {\n        variation = getOppositeVariation(variation);\n      }\n\n      data.placement = placement + (variation ? '-' + variation : '');\n\n      // this object contains `position`, we want to preserve it along with\n      // any additional property we may add in the future\n      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));\n\n      data = runModifiers(data.instance.modifiers, data, 'flip');\n    }\n  });\n  return data;\n}\n\n/**\n * @function\n * @memberof Modifiers\n * @argument {Object} data - The data object generated by update method\n * @argument {Object} options - Modifiers configuration and options\n * @returns {Object} The data object, properly modified\n */\nfunction keepTogether(data) {\n  var _data$offsets = data.offsets,\n      popper = _data$offsets.popper,\n      reference = _data$offsets.reference;\n\n  var placement = data.placement.split('-')[0];\n  var floor = Math.floor;\n  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;\n  var side = isVertical ? 'right' : 'bottom';\n  var opSide = isVertical ? 'left' : 'top';\n  var measurement = isVertical ? 'width' : 'height';\n\n  if (popper[side] < floor(reference[opSide])) {\n    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];\n  }\n  if (popper[opSide] > floor(reference[side])) {\n    data.offsets.popper[opSide] = floor(reference[side]);\n  }\n\n  return data;\n}\n\n/**\n * Converts a string containing value + unit into a px value number\n * @function\n * @memberof {modifiers~offset}\n * @private\n * @argument {String} str - Value + unit string\n * @argument {String} measurement - `height` or `width`\n * @argument {Object} popperOffsets\n * @argument {Object} referenceOffsets\n * @returns {Number|String}\n * Value in pixels, or original string if no values were extracted\n */\nfunction toValue(str, measurement, popperOffsets, referenceOffsets) {\n  // separate value from unit\n  var split = str.match(/((?:\\-|\\+)?\\d*\\.?\\d*)(.*)/);\n  var value = +split[1];\n  var unit = split[2];\n\n  // If it's not a number it's an operator, I guess\n  if (!value) {\n    return str;\n  }\n\n  if (unit.indexOf('%') === 0) {\n    var element = void 0;\n    switch (unit) {\n      case '%p':\n        element = popperOffsets;\n        break;\n      case '%':\n      case '%r':\n      default:\n        element = referenceOffsets;\n    }\n\n    var rect = getClientRect(element);\n    return rect[measurement] / 100 * value;\n  } else if (unit === 'vh' || unit === 'vw') {\n    // if is a vh or vw, we calculate the size based on the viewport\n    var size = void 0;\n    if (unit === 'vh') {\n      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);\n    } else {\n      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);\n    }\n    return size / 100 * value;\n  } else {\n    // if is an explicit pixel unit, we get rid of the unit and keep the value\n    // if is an implicit unit, it's px, and we return just the value\n    return value;\n  }\n}\n\n/**\n * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.\n * @function\n * @memberof {modifiers~offset}\n * @private\n * @argument {String} offset\n * @argument {Object} popperOffsets\n * @argument {Object} referenceOffsets\n * @argument {String} basePlacement\n * @returns {Array} a two cells array with x and y offsets in numbers\n */\nfunction parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {\n  var offsets = [0, 0];\n\n  // Use height if placement is left or right and index is 0 otherwise use width\n  // in this way the first offset will use an axis and the second one\n  // will use the other one\n  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;\n\n  // Split the offset string to obtain a list of values and operands\n  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)\n  var fragments = offset.split(/(\\+|\\-)/).map(function (frag) {\n    return frag.trim();\n  });\n\n  // Detect if the offset string contains a pair of values or a single one\n  // they could be separated by comma or space\n  var divider = fragments.indexOf(find(fragments, function (frag) {\n    return frag.search(/,|\\s/) !== -1;\n  }));\n\n  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {\n    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');\n  }\n\n  // If divider is found, we divide the list of values and operands to divide\n  // them by ofset X and Y.\n  var splitRegex = /\\s*,\\s*|\\s+/;\n  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];\n\n  // Convert the values with units to absolute pixels to allow our computations\n  ops = ops.map(function (op, index) {\n    // Most of the units rely on the orientation of the popper\n    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';\n    var mergeWithPrevious = false;\n    return op\n    // This aggregates any `+` or `-` sign that aren't considered operators\n    // e.g.: 10 + +5 => [10, +, +5]\n    .reduce(function (a, b) {\n      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {\n        a[a.length - 1] = b;\n        mergeWithPrevious = true;\n        return a;\n      } else if (mergeWithPrevious) {\n        a[a.length - 1] += b;\n        mergeWithPrevious = false;\n        return a;\n      } else {\n        return a.concat(b);\n      }\n    }, [])\n    // Here we convert the string values into number values (in px)\n    .map(function (str) {\n      return toValue(str, measurement, popperOffsets, referenceOffsets);\n    });\n  });\n\n  // Loop trough the offsets arrays and execute the operations\n  ops.forEach(function (op, index) {\n    op.forEach(function (frag, index2) {\n      if (isNumeric(frag)) {\n        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);\n      }\n    });\n  });\n  return offsets;\n}\n\n/**\n * @function\n * @memberof Modifiers\n * @argument {Object} data - The data object generated by update method\n * @argument {Object} options - Modifiers configuration and options\n * @argument {Number|String} options.offset=0\n * The offset value as described in the modifier description\n * @returns {Object} The data object, properly modified\n */\nfunction offset(data, _ref) {\n  var offset = _ref.offset;\n  var placement = data.placement,\n      _data$offsets = data.offsets,\n      popper = _data$offsets.popper,\n      reference = _data$offsets.reference;\n\n  var basePlacement = placement.split('-')[0];\n\n  var offsets = void 0;\n  if (isNumeric(+offset)) {\n    offsets = [+offset, 0];\n  } else {\n    offsets = parseOffset(offset, popper, reference, basePlacement);\n  }\n\n  if (basePlacement === 'left') {\n    popper.top += offsets[0];\n    popper.left -= offsets[1];\n  } else if (basePlacement === 'right') {\n    popper.top += offsets[0];\n    popper.left += offsets[1];\n  } else if (basePlacement === 'top') {\n    popper.left += offsets[0];\n    popper.top -= offsets[1];\n  } else if (basePlacement === 'bottom') {\n    popper.left += offsets[0];\n    popper.top += offsets[1];\n  }\n\n  data.popper = popper;\n  return data;\n}\n\n/**\n * @function\n * @memberof Modifiers\n * @argument {Object} data - The data object generated by `update` method\n * @argument {Object} options - Modifiers configuration and options\n * @returns {Object} The data object, properly modified\n */\nfunction preventOverflow(data, options) {\n  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);\n\n  // If offsetParent is the reference element, we really want to\n  // go one step up and use the next offsetParent as reference to\n  // avoid to make this modifier completely useless and look like broken\n  if (data.instance.reference === boundariesElement) {\n    boundariesElement = getOffsetParent(boundariesElement);\n  }\n\n  // NOTE: DOM access here\n  // resets the popper's position so that the document size can be calculated excluding\n  // the size of the popper element itself\n  var transformProp = getSupportedPropertyName('transform');\n  var popperStyles = data.instance.popper.style; // assignment to help minification\n  var top = popperStyles.top,\n      left = popperStyles.left,\n      transform = popperStyles[transformProp];\n\n  popperStyles.top = '';\n  popperStyles.left = '';\n  popperStyles[transformProp] = '';\n\n  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);\n\n  // NOTE: DOM access here\n  // restores the original style properties after the offsets have been computed\n  popperStyles.top = top;\n  popperStyles.left = left;\n  popperStyles[transformProp] = transform;\n\n  options.boundaries = boundaries;\n\n  var order = options.priority;\n  var popper = data.offsets.popper;\n\n  var check = {\n    primary: function primary(placement) {\n      var value = popper[placement];\n      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {\n        value = Math.max(popper[placement], boundaries[placement]);\n      }\n      return defineProperty({}, placement, value);\n    },\n    secondary: function secondary(placement) {\n      var mainSide = placement === 'right' ? 'left' : 'top';\n      var value = popper[mainSide];\n      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {\n        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));\n      }\n      return defineProperty({}, mainSide, value);\n    }\n  };\n\n  order.forEach(function (placement) {\n    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';\n    popper = _extends({}, popper, check[side](placement));\n  });\n\n  data.offsets.popper = popper;\n\n  return data;\n}\n\n/**\n * @function\n * @memberof Modifiers\n * @argument {Object} data - The data object generated by `update` method\n * @argument {Object} options - Modifiers configuration and options\n * @returns {Object} The data object, properly modified\n */\nfunction shift(data) {\n  var placement = data.placement;\n  var basePlacement = placement.split('-')[0];\n  var shiftvariation = placement.split('-')[1];\n\n  // if shift shiftvariation is specified, run the modifier\n  if (shiftvariation) {\n    var _data$offsets = data.offsets,\n        reference = _data$offsets.reference,\n        popper = _data$offsets.popper;\n\n    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;\n    var side = isVertical ? 'left' : 'top';\n    var measurement = isVertical ? 'width' : 'height';\n\n    var shiftOffsets = {\n      start: defineProperty({}, side, reference[side]),\n      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])\n    };\n\n    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);\n  }\n\n  return data;\n}\n\n/**\n * @function\n * @memberof Modifiers\n * @argument {Object} data - The data object generated by update method\n * @argument {Object} options - Modifiers configuration and options\n * @returns {Object} The data object, properly modified\n */\nfunction hide(data) {\n  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {\n    return data;\n  }\n\n  var refRect = data.offsets.reference;\n  var bound = find(data.instance.modifiers, function (modifier) {\n    return modifier.name === 'preventOverflow';\n  }).boundaries;\n\n  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {\n    // Avoid unnecessary DOM access if visibility hasn't changed\n    if (data.hide === true) {\n      return data;\n    }\n\n    data.hide = true;\n    data.attributes['x-out-of-boundaries'] = '';\n  } else {\n    // Avoid unnecessary DOM access if visibility hasn't changed\n    if (data.hide === false) {\n      return data;\n    }\n\n    data.hide = false;\n    data.attributes['x-out-of-boundaries'] = false;\n  }\n\n  return data;\n}\n\n/**\n * @function\n * @memberof Modifiers\n * @argument {Object} data - The data object generated by `update` method\n * @argument {Object} options - Modifiers configuration and options\n * @returns {Object} The data object, properly modified\n */\nfunction inner(data) {\n  var placement = data.placement;\n  var basePlacement = placement.split('-')[0];\n  var _data$offsets = data.offsets,\n      popper = _data$offsets.popper,\n      reference = _data$offsets.reference;\n\n  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;\n\n  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;\n\n  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);\n\n  data.placement = getOppositePlacement(placement);\n  data.offsets.popper = getClientRect(popper);\n\n  return data;\n}\n\n/**\n * Modifier function, each modifier can have a function of this type assigned\n * to its `fn` property.<br />\n * These functions will be called on each update, this means that you must\n * make sure they are performant enough to avoid performance bottlenecks.\n *\n * @function ModifierFn\n * @argument {dataObject} data - The data object generated by `update` method\n * @argument {Object} options - Modifiers configuration and options\n * @returns {dataObject} The data object, properly modified\n */\n\n/**\n * Modifiers are plugins used to alter the behavior of your poppers.<br />\n * Popper.js uses a set of 9 modifiers to provide all the basic functionalities\n * needed by the library.\n *\n * Usually you don't want to override the `order`, `fn` and `onLoad` props.\n * All the other properties are configurations that could be tweaked.\n * @namespace modifiers\n */\nvar modifiers = {\n  /**\n   * Modifier used to shift the popper on the start or end of its reference\n   * element.<br />\n   * It will read the variation of the `placement` property.<br />\n   * It can be one either `-end` or `-start`.\n   * @memberof modifiers\n   * @inner\n   */\n  shift: {\n    /** @prop {number} order=100 - Index used to define the order of execution */\n    order: 100,\n    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */\n    enabled: true,\n    /** @prop {ModifierFn} */\n    fn: shift\n  },\n\n  /**\n   * The `offset` modifier can shift your popper on both its axis.\n   *\n   * It accepts the following units:\n   * - `px` or unitless, interpreted as pixels\n   * - `%` or `%r`, percentage relative to the length of the reference element\n   * - `%p`, percentage relative to the length of the popper element\n   * - `vw`, CSS viewport width unit\n   * - `vh`, CSS viewport height unit\n   *\n   * For length is intended the main axis relative to the placement of the popper.<br />\n   * This means that if the placement is `top` or `bottom`, the length will be the\n   * `width`. In case of `left` or `right`, it will be the height.\n   *\n   * You can provide a single value (as `Number` or `String`), or a pair of values\n   * as `String` divided by a comma or one (or more) white spaces.<br />\n   * The latter is a deprecated method because it leads to confusion and will be\n   * removed in v2.<br />\n   * Additionally, it accepts additions and subtractions between different units.\n   * Note that multiplications and divisions aren't supported.\n   *\n   * Valid examples are:\n   * ```\n   * 10\n   * '10%'\n   * '10, 10'\n   * '10%, 10'\n   * '10 + 10%'\n   * '10 - 5vh + 3%'\n   * '-10px + 5vh, 5px - 6%'\n   * ```\n   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap\n   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.\n   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)\n   *\n   * @memberof modifiers\n   * @inner\n   */\n  offset: {\n    /** @prop {number} order=200 - Index used to define the order of execution */\n    order: 200,\n    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */\n    enabled: true,\n    /** @prop {ModifierFn} */\n    fn: offset,\n    /** @prop {Number|String} offset=0\n     * The offset value as described in the modifier description\n     */\n    offset: 0\n  },\n\n  /**\n   * Modifier used to prevent the popper from being positioned outside the boundary.\n   *\n   * An scenario exists where the reference itself is not within the boundaries.<br />\n   * We can say it has \"escaped the boundaries\" — or just \"escaped\".<br />\n   * In this case we need to decide whether the popper should either:\n   *\n   * - detach from the reference and remain \"trapped\" in the boundaries, or\n   * - if it should ignore the boundary and \"escape with its reference\"\n   *\n   * When `escapeWithReference` is set to`true` and reference is completely\n   * outside its boundaries, the popper will overflow (or completely leave)\n   * the boundaries in order to remain attached to the edge of the reference.\n   *\n   * @memberof modifiers\n   * @inner\n   */\n  preventOverflow: {\n    /** @prop {number} order=300 - Index used to define the order of execution */\n    order: 300,\n    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */\n    enabled: true,\n    /** @prop {ModifierFn} */\n    fn: preventOverflow,\n    /**\n     * @prop {Array} [priority=['left','right','top','bottom']]\n     * Popper will try to prevent overflow following these priorities by default,\n     * then, it could overflow on the left and on top of the `boundariesElement`\n     */\n    priority: ['left', 'right', 'top', 'bottom'],\n    /**\n     * @prop {number} padding=5\n     * Amount of pixel used to define a minimum distance between the boundaries\n     * and the popper this makes sure the popper has always a little padding\n     * between the edges of its container\n     */\n    padding: 5,\n    /**\n     * @prop {String|HTMLElement} boundariesElement='scrollParent'\n     * Boundaries used by the modifier, can be `scrollParent`, `window`,\n     * `viewport` or any DOM element.\n     */\n    boundariesElement: 'scrollParent'\n  },\n\n  /**\n   * Modifier used to make sure the reference and its popper stay near eachothers\n   * without leaving any gap between the two. Expecially useful when the arrow is\n   * enabled and you want to assure it to point to its reference element.\n   * It cares only about the first axis, you can still have poppers with margin\n   * between the popper and its reference element.\n   * @memberof modifiers\n   * @inner\n   */\n  keepTogether: {\n    /** @prop {number} order=400 - Index used to define the order of execution */\n    order: 400,\n    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */\n    enabled: true,\n    /** @prop {ModifierFn} */\n    fn: keepTogether\n  },\n\n  /**\n   * This modifier is used to move the `arrowElement` of the popper to make\n   * sure it is positioned between the reference element and its popper element.\n   * It will read the outer size of the `arrowElement` node to detect how many\n   * pixels of conjuction are needed.\n   *\n   * It has no effect if no `arrowElement` is provided.\n   * @memberof modifiers\n   * @inner\n   */\n  arrow: {\n    /** @prop {number} order=500 - Index used to define the order of execution */\n    order: 500,\n    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */\n    enabled: true,\n    /** @prop {ModifierFn} */\n    fn: arrow,\n    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */\n    element: '[x-arrow]'\n  },\n\n  /**\n   * Modifier used to flip the popper's placement when it starts to overlap its\n   * reference element.\n   *\n   * Requires the `preventOverflow` modifier before it in order to work.\n   *\n   * **NOTE:** this modifier will interrupt the current update cycle and will\n   * restart it if it detects the need to flip the placement.\n   * @memberof modifiers\n   * @inner\n   */\n  flip: {\n    /** @prop {number} order=600 - Index used to define the order of execution */\n    order: 600,\n    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */\n    enabled: true,\n    /** @prop {ModifierFn} */\n    fn: flip,\n    /**\n     * @prop {String|Array} behavior='flip'\n     * The behavior used to change the popper's placement. It can be one of\n     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid\n     * placements (with optional variations).\n     */\n    behavior: 'flip',\n    /**\n     * @prop {number} padding=5\n     * The popper will flip if it hits the edges of the `boundariesElement`\n     */\n    padding: 5,\n    /**\n     * @prop {String|HTMLElement} boundariesElement='viewport'\n     * The element which will define the boundaries of the popper position,\n     * the popper will never be placed outside of the defined boundaries\n     * (except if keepTogether is enabled)\n     */\n    boundariesElement: 'viewport'\n  },\n\n  /**\n   * Modifier used to make the popper flow toward the inner of the reference element.\n   * By default, when this modifier is disabled, the popper will be placed outside\n   * the reference element.\n   * @memberof modifiers\n   * @inner\n   */\n  inner: {\n    /** @prop {number} order=700 - Index used to define the order of execution */\n    order: 700,\n    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */\n    enabled: false,\n    /** @prop {ModifierFn} */\n    fn: inner\n  },\n\n  /**\n   * Modifier used to hide the popper when its reference element is outside of the\n   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can\n   * be used to hide with a CSS selector the popper when its reference is\n   * out of boundaries.\n   *\n   * Requires the `preventOverflow` modifier before it in order to work.\n   * @memberof modifiers\n   * @inner\n   */\n  hide: {\n    /** @prop {number} order=800 - Index used to define the order of execution */\n    order: 800,\n    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */\n    enabled: true,\n    /** @prop {ModifierFn} */\n    fn: hide\n  },\n\n  /**\n   * Computes the style that will be applied to the popper element to gets\n   * properly positioned.\n   *\n   * Note that this modifier will not touch the DOM, it just prepares the styles\n   * so that `applyStyle` modifier can apply it. This separation is useful\n   * in case you need to replace `applyStyle` with a custom implementation.\n   *\n   * This modifier has `850` as `order` value to maintain backward compatibility\n   * with previous versions of Popper.js. Expect the modifiers ordering method\n   * to change in future major versions of the library.\n   *\n   * @memberof modifiers\n   * @inner\n   */\n  computeStyle: {\n    /** @prop {number} order=850 - Index used to define the order of execution */\n    order: 850,\n    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */\n    enabled: true,\n    /** @prop {ModifierFn} */\n    fn: computeStyle,\n    /**\n     * @prop {Boolean} gpuAcceleration=true\n     * If true, it uses the CSS 3d transformation to position the popper.\n     * Otherwise, it will use the `top` and `left` properties.\n     */\n    gpuAcceleration: true,\n    /**\n     * @prop {string} [x='bottom']\n     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.\n     * Change this if your popper should grow in a direction different from `bottom`\n     */\n    x: 'bottom',\n    /**\n     * @prop {string} [x='left']\n     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.\n     * Change this if your popper should grow in a direction different from `right`\n     */\n    y: 'right'\n  },\n\n  /**\n   * Applies the computed styles to the popper element.\n   *\n   * All the DOM manipulations are limited to this modifier. This is useful in case\n   * you want to integrate Popper.js inside a framework or view library and you\n   * want to delegate all the DOM manipulations to it.\n   *\n   * Note that if you disable this modifier, you must make sure the popper element\n   * has its position set to `absolute` before Popper.js can do its work!\n   *\n   * Just disable this modifier and define you own to achieve the desired effect.\n   *\n   * @memberof modifiers\n   * @inner\n   */\n  applyStyle: {\n    /** @prop {number} order=900 - Index used to define the order of execution */\n    order: 900,\n    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */\n    enabled: true,\n    /** @prop {ModifierFn} */\n    fn: applyStyle,\n    /** @prop {Function} */\n    onLoad: applyStyleOnLoad,\n    /**\n     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier\n     * @prop {Boolean} gpuAcceleration=true\n     * If true, it uses the CSS 3d transformation to position the popper.\n     * Otherwise, it will use the `top` and `left` properties.\n     */\n    gpuAcceleration: undefined\n  }\n};\n\n/**\n * The `dataObject` is an object containing all the informations used by Popper.js\n * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.\n * @name dataObject\n * @property {Object} data.instance The Popper.js instance\n * @property {String} data.placement Placement applied to popper\n * @property {String} data.originalPlacement Placement originally defined on init\n * @property {Boolean} data.flipped True if popper has been flipped by flip modifier\n * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.\n * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier\n * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)\n * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)\n * @property {Object} data.boundaries Offsets of the popper boundaries\n * @property {Object} data.offsets The measurements of popper, reference and arrow elements.\n * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values\n * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values\n * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0\n */\n\n/**\n * Default options provided to Popper.js constructor.<br />\n * These can be overriden using the `options` argument of Popper.js.<br />\n * To override an option, simply pass as 3rd argument an object with the same\n * structure of this object, example:\n * ```\n * new Popper(ref, pop, {\n *   modifiers: {\n *     preventOverflow: { enabled: false }\n *   }\n * })\n * ```\n * @type {Object}\n * @static\n * @memberof Popper\n */\nvar Defaults = {\n  /**\n   * Popper's placement\n   * @prop {Popper.placements} placement='bottom'\n   */\n  placement: 'bottom',\n\n  /**\n   * Set this to true if you want popper to position it self in 'fixed' mode\n   * @prop {Boolean} positionFixed=false\n   */\n  positionFixed: false,\n\n  /**\n   * Whether events (resize, scroll) are initially enabled\n   * @prop {Boolean} eventsEnabled=true\n   */\n  eventsEnabled: true,\n\n  /**\n   * Set to true if you want to automatically remove the popper when\n   * you call the `destroy` method.\n   * @prop {Boolean} removeOnDestroy=false\n   */\n  removeOnDestroy: false,\n\n  /**\n   * Callback called when the popper is created.<br />\n   * By default, is set to no-op.<br />\n   * Access Popper.js instance with `data.instance`.\n   * @prop {onCreate}\n   */\n  onCreate: function onCreate() {},\n\n  /**\n   * Callback called when the popper is updated, this callback is not called\n   * on the initialization/creation of the popper, but only on subsequent\n   * updates.<br />\n   * By default, is set to no-op.<br />\n   * Access Popper.js instance with `data.instance`.\n   * @prop {onUpdate}\n   */\n  onUpdate: function onUpdate() {},\n\n  /**\n   * List of modifiers used to modify the offsets before they are applied to the popper.\n   * They provide most of the functionalities of Popper.js\n   * @prop {modifiers}\n   */\n  modifiers: modifiers\n};\n\n/**\n * @callback onCreate\n * @param {dataObject} data\n */\n\n/**\n * @callback onUpdate\n * @param {dataObject} data\n */\n\n// Utils\n// Methods\nvar Popper = function () {\n  /**\n   * Create a new Popper.js instance\n   * @class Popper\n   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper\n   * @param {HTMLElement} popper - The HTML element used as popper.\n   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)\n   * @return {Object} instance - The generated Popper.js instance\n   */\n  function Popper(reference, popper) {\n    var _this = this;\n\n    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};\n    classCallCheck(this, Popper);\n\n    this.scheduleUpdate = function () {\n      return requestAnimationFrame(_this.update);\n    };\n\n    // make update() debounced, so that it only runs at most once-per-tick\n    this.update = debounce(this.update.bind(this));\n\n    // with {} we create a new object with the options inside it\n    this.options = _extends({}, Popper.Defaults, options);\n\n    // init state\n    this.state = {\n      isDestroyed: false,\n      isCreated: false,\n      scrollParents: []\n    };\n\n    // get reference and popper elements (allow jQuery wrappers)\n    this.reference = reference && reference.jquery ? reference[0] : reference;\n    this.popper = popper && popper.jquery ? popper[0] : popper;\n\n    // Deep merge modifiers options\n    this.options.modifiers = {};\n    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {\n      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});\n    });\n\n    // Refactoring modifiers' list (Object => Array)\n    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {\n      return _extends({\n        name: name\n      }, _this.options.modifiers[name]);\n    })\n    // sort the modifiers by order\n    .sort(function (a, b) {\n      return a.order - b.order;\n    });\n\n    // modifiers have the ability to execute arbitrary code when Popper.js get inited\n    // such code is executed in the same order of its modifier\n    // they could add new properties to their options configuration\n    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!\n    this.modifiers.forEach(function (modifierOptions) {\n      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {\n        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);\n      }\n    });\n\n    // fire the first update to position the popper in the right place\n    this.update();\n\n    var eventsEnabled = this.options.eventsEnabled;\n    if (eventsEnabled) {\n      // setup event listeners, they will take care of update the position in specific situations\n      this.enableEventListeners();\n    }\n\n    this.state.eventsEnabled = eventsEnabled;\n  }\n\n  // We can't use class properties because they don't get listed in the\n  // class prototype and break stuff like Sinon stubs\n\n\n  createClass(Popper, [{\n    key: 'update',\n    value: function update$$1() {\n      return update.call(this);\n    }\n  }, {\n    key: 'destroy',\n    value: function destroy$$1() {\n      return destroy.call(this);\n    }\n  }, {\n    key: 'enableEventListeners',\n    value: function enableEventListeners$$1() {\n      return enableEventListeners.call(this);\n    }\n  }, {\n    key: 'disableEventListeners',\n    value: function disableEventListeners$$1() {\n      return disableEventListeners.call(this);\n    }\n\n    /**\n     * Schedule an update, it will run on the next UI update available\n     * @method scheduleUpdate\n     * @memberof Popper\n     */\n\n\n    /**\n     * Collection of utilities useful when writing custom modifiers.\n     * Starting from version 1.7, this method is available only if you\n     * include `popper-utils.js` before `popper.js`.\n     *\n     * **DEPRECATION**: This way to access PopperUtils is deprecated\n     * and will be removed in v2! Use the PopperUtils module directly instead.\n     * Due to the high instability of the methods contained in Utils, we can't\n     * guarantee them to follow semver. Use them at your own risk!\n     * @static\n     * @private\n     * @type {Object}\n     * @deprecated since version 1.8\n     * @member Utils\n     * @memberof Popper\n     */\n\n  }]);\n  return Popper;\n}();\n\n/**\n * The `referenceObject` is an object that provides an interface compatible with Popper.js\n * and lets you use it as replacement of a real DOM node.<br />\n * You can use this method to position a popper relatively to a set of coordinates\n * in case you don't have a DOM node to use as reference.\n *\n * ```\n * new Popper(referenceObject, popperNode);\n * ```\n *\n * NB: This feature isn't supported in Internet Explorer 10\n * @name referenceObject\n * @property {Function} data.getBoundingClientRect\n * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.\n * @property {number} data.clientWidth\n * An ES6 getter that will return the width of the virtual reference element.\n * @property {number} data.clientHeight\n * An ES6 getter that will return the height of the virtual reference element.\n */\n\n\nPopper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;\nPopper.placements = placements;\nPopper.Defaults = Defaults;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Popper);\n//# sourceMappingURL=popper.js.map\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/popper.js/dist/esm/popper.js?");

/***/ }),

/***/ "./node_modules/prop-types-extra/lib/componentOrElement.js":
/*!*****************************************************************!*\
  !*** ./node_modules/prop-types-extra/lib/componentOrElement.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _createChainableTypeChecker = __webpack_require__(/*! ./utils/createChainableTypeChecker */ \"./node_modules/prop-types-extra/lib/utils/createChainableTypeChecker.js\");\n\nvar _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction validate(props, propName, componentName, location, propFullName) {\n  var propValue = props[propName];\n  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);\n\n  if (_react2.default.isValidElement(propValue)) {\n    return new Error('Invalid ' + location + ' `' + propFullName + '` of type ReactElement ' + ('supplied to `' + componentName + '`, expected a ReactComponent or a ') + 'DOMElement. You can usually obtain a ReactComponent or DOMElement ' + 'from a ReactElement by attaching a ref to it.');\n  }\n\n  if ((propType !== 'object' || typeof propValue.render !== 'function') && propValue.nodeType !== 1) {\n    return new Error('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected a ReactComponent or a ') + 'DOMElement.');\n  }\n\n  return null;\n}\n\nexports.default = (0, _createChainableTypeChecker2.default)(validate);\nmodule.exports = exports['default'];\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/prop-types-extra/lib/componentOrElement.js?");

/***/ }),

/***/ "./node_modules/prop-types-extra/lib/isRequiredForA11y.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types-extra/lib/isRequiredForA11y.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = isRequiredForA11y;\nfunction isRequiredForA11y(validator) {\n  return function validate(props, propName, componentName, location, propFullName) {\n    var componentNameSafe = componentName || '<<anonymous>>';\n    var propFullNameSafe = propFullName || propName;\n\n    if (props[propName] == null) {\n      return new Error('The ' + location + ' `' + propFullNameSafe + '` is required to make ' + ('`' + componentNameSafe + '` accessible for users of assistive ') + 'technologies such as screen readers.');\n    }\n\n    for (var _len = arguments.length, args = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {\n      args[_key - 5] = arguments[_key];\n    }\n\n    return validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));\n  };\n}\nmodule.exports = exports['default'];\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/prop-types-extra/lib/isRequiredForA11y.js?");

/***/ }),

/***/ "./node_modules/prop-types-extra/lib/utils/createChainableTypeChecker.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/prop-types-extra/lib/utils/createChainableTypeChecker.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = createChainableTypeChecker;\n/**\n * Copyright 2013-present, Facebook, Inc.\n * All rights reserved.\n *\n * This source code is licensed under the BSD-style license found in the\n * LICENSE file in the root directory of this source tree. An additional grant\n * of patent rights can be found in the PATENTS file in the same directory.\n */\n\n// Mostly taken from ReactPropTypes.\n\nfunction createChainableTypeChecker(validate) {\n  function checkType(isRequired, props, propName, componentName, location, propFullName) {\n    var componentNameSafe = componentName || '<<anonymous>>';\n    var propFullNameSafe = propFullName || propName;\n\n    if (props[propName] == null) {\n      if (isRequired) {\n        return new Error('Required ' + location + ' `' + propFullNameSafe + '` was not specified ' + ('in `' + componentNameSafe + '`.'));\n      }\n\n      return null;\n    }\n\n    for (var _len = arguments.length, args = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {\n      args[_key - 6] = arguments[_key];\n    }\n\n    return validate.apply(undefined, [props, propName, componentNameSafe, location, propFullNameSafe].concat(args));\n  }\n\n  var chainedCheckType = checkType.bind(null, false);\n  chainedCheckType.isRequired = checkType.bind(null, true);\n\n  return chainedCheckType;\n}\nmodule.exports = exports['default'];\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/prop-types-extra/lib/utils/createChainableTypeChecker.js?");

/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar printWarning = function() {};\n\nif (true) {\n  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ \"./node_modules/prop-types/lib/ReactPropTypesSecret.js\");\n  var loggedTypeFailures = {};\n\n  printWarning = function(text) {\n    var message = 'Warning: ' + text;\n    if (typeof console !== 'undefined') {\n      console.error(message);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  };\n}\n\n/**\n * Assert that the values match with the type specs.\n * Error messages are memorized and will only be shown once.\n *\n * @param {object} typeSpecs Map of name to a ReactPropType\n * @param {object} values Runtime values that need to be type-checked\n * @param {string} location e.g. \"prop\", \"context\", \"child context\"\n * @param {string} componentName Name of the component for error messages.\n * @param {?Function} getStack Returns the component stack.\n * @private\n */\nfunction checkPropTypes(typeSpecs, values, location, componentName, getStack) {\n  if (true) {\n    for (var typeSpecName in typeSpecs) {\n      if (typeSpecs.hasOwnProperty(typeSpecName)) {\n        var error;\n        // Prop type validation may throw. In case they do, we don't want to\n        // fail the render phase where it didn't fail before. So we log it.\n        // After these have been cleaned up, we'll let them throw.\n        try {\n          // This is intentionally an invariant that gets caught. It's the same\n          // behavior as without this statement except with a better message.\n          if (typeof typeSpecs[typeSpecName] !== 'function') {\n            var err = Error(\n              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +\n              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'\n            );\n            err.name = 'Invariant Violation';\n            throw err;\n          }\n          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);\n        } catch (ex) {\n          error = ex;\n        }\n        if (error && !(error instanceof Error)) {\n          printWarning(\n            (componentName || 'React class') + ': type specification of ' +\n            location + ' `' + typeSpecName + '` is invalid; the type checker ' +\n            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +\n            'You may have forgotten to pass an argument to the type checker ' +\n            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +\n            'shape all require an argument).'\n          )\n\n        }\n        if (error instanceof Error && !(error.message in loggedTypeFailures)) {\n          // Only monitor this failure once because there tends to be a lot of the\n          // same error.\n          loggedTypeFailures[error.message] = true;\n\n          var stack = getStack ? getStack() : '';\n\n          printWarning(\n            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')\n          );\n        }\n      }\n    }\n  }\n}\n\nmodule.exports = checkPropTypes;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/prop-types/checkPropTypes.js?");

/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar assign = __webpack_require__(/*! object-assign */ \"./node_modules/object-assign/index.js\");\n\nvar ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ \"./node_modules/prop-types/lib/ReactPropTypesSecret.js\");\nvar checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ \"./node_modules/prop-types/checkPropTypes.js\");\n\nvar printWarning = function() {};\n\nif (true) {\n  printWarning = function(text) {\n    var message = 'Warning: ' + text;\n    if (typeof console !== 'undefined') {\n      console.error(message);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  };\n}\n\nfunction emptyFunctionThatReturnsNull() {\n  return null;\n}\n\nmodule.exports = function(isValidElement, throwOnDirectAccess) {\n  /* global Symbol */\n  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;\n  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.\n\n  /**\n   * Returns the iterator method function contained on the iterable object.\n   *\n   * Be sure to invoke the function with the iterable as context:\n   *\n   *     var iteratorFn = getIteratorFn(myIterable);\n   *     if (iteratorFn) {\n   *       var iterator = iteratorFn.call(myIterable);\n   *       ...\n   *     }\n   *\n   * @param {?object} maybeIterable\n   * @return {?function}\n   */\n  function getIteratorFn(maybeIterable) {\n    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);\n    if (typeof iteratorFn === 'function') {\n      return iteratorFn;\n    }\n  }\n\n  /**\n   * Collection of methods that allow declaration and validation of props that are\n   * supplied to React components. Example usage:\n   *\n   *   var Props = require('ReactPropTypes');\n   *   var MyArticle = React.createClass({\n   *     propTypes: {\n   *       // An optional string prop named \"description\".\n   *       description: Props.string,\n   *\n   *       // A required enum prop named \"category\".\n   *       category: Props.oneOf(['News','Photos']).isRequired,\n   *\n   *       // A prop named \"dialog\" that requires an instance of Dialog.\n   *       dialog: Props.instanceOf(Dialog).isRequired\n   *     },\n   *     render: function() { ... }\n   *   });\n   *\n   * A more formal specification of how these methods are used:\n   *\n   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)\n   *   decl := ReactPropTypes.{type}(.isRequired)?\n   *\n   * Each and every declaration produces a function with the same signature. This\n   * allows the creation of custom validation functions. For example:\n   *\n   *  var MyLink = React.createClass({\n   *    propTypes: {\n   *      // An optional string or URI prop named \"href\".\n   *      href: function(props, propName, componentName) {\n   *        var propValue = props[propName];\n   *        if (propValue != null && typeof propValue !== 'string' &&\n   *            !(propValue instanceof URI)) {\n   *          return new Error(\n   *            'Expected a string or an URI for ' + propName + ' in ' +\n   *            componentName\n   *          );\n   *        }\n   *      }\n   *    },\n   *    render: function() {...}\n   *  });\n   *\n   * @internal\n   */\n\n  var ANONYMOUS = '<<anonymous>>';\n\n  // Important!\n  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.\n  var ReactPropTypes = {\n    array: createPrimitiveTypeChecker('array'),\n    bool: createPrimitiveTypeChecker('boolean'),\n    func: createPrimitiveTypeChecker('function'),\n    number: createPrimitiveTypeChecker('number'),\n    object: createPrimitiveTypeChecker('object'),\n    string: createPrimitiveTypeChecker('string'),\n    symbol: createPrimitiveTypeChecker('symbol'),\n\n    any: createAnyTypeChecker(),\n    arrayOf: createArrayOfTypeChecker,\n    element: createElementTypeChecker(),\n    instanceOf: createInstanceTypeChecker,\n    node: createNodeChecker(),\n    objectOf: createObjectOfTypeChecker,\n    oneOf: createEnumTypeChecker,\n    oneOfType: createUnionTypeChecker,\n    shape: createShapeTypeChecker,\n    exact: createStrictShapeTypeChecker,\n  };\n\n  /**\n   * inlined Object.is polyfill to avoid requiring consumers ship their own\n   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is\n   */\n  /*eslint-disable no-self-compare*/\n  function is(x, y) {\n    // SameValue algorithm\n    if (x === y) {\n      // Steps 1-5, 7-10\n      // Steps 6.b-6.e: +0 != -0\n      return x !== 0 || 1 / x === 1 / y;\n    } else {\n      // Step 6.a: NaN == NaN\n      return x !== x && y !== y;\n    }\n  }\n  /*eslint-enable no-self-compare*/\n\n  /**\n   * We use an Error-like object for backward compatibility as people may call\n   * PropTypes directly and inspect their output. However, we don't use real\n   * Errors anymore. We don't inspect their stack anyway, and creating them\n   * is prohibitively expensive if they are created too often, such as what\n   * happens in oneOfType() for any type before the one that matched.\n   */\n  function PropTypeError(message) {\n    this.message = message;\n    this.stack = '';\n  }\n  // Make `instanceof Error` still work for returned errors.\n  PropTypeError.prototype = Error.prototype;\n\n  function createChainableTypeChecker(validate) {\n    if (true) {\n      var manualPropTypeCallCache = {};\n      var manualPropTypeWarningCount = 0;\n    }\n    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {\n      componentName = componentName || ANONYMOUS;\n      propFullName = propFullName || propName;\n\n      if (secret !== ReactPropTypesSecret) {\n        if (throwOnDirectAccess) {\n          // New behavior only for users of `prop-types` package\n          var err = new Error(\n            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +\n            'Use `PropTypes.checkPropTypes()` to call them. ' +\n            'Read more at http://fb.me/use-check-prop-types'\n          );\n          err.name = 'Invariant Violation';\n          throw err;\n        } else if (\"development\" !== 'production' && typeof console !== 'undefined') {\n          // Old behavior for people using React.PropTypes\n          var cacheKey = componentName + ':' + propName;\n          if (\n            !manualPropTypeCallCache[cacheKey] &&\n            // Avoid spamming the console because they are often not actionable except for lib authors\n            manualPropTypeWarningCount < 3\n          ) {\n            printWarning(\n              'You are manually calling a React.PropTypes validation ' +\n              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +\n              'and will throw in the standalone `prop-types` package. ' +\n              'You may be seeing this warning due to a third-party PropTypes ' +\n              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'\n            );\n            manualPropTypeCallCache[cacheKey] = true;\n            manualPropTypeWarningCount++;\n          }\n        }\n      }\n      if (props[propName] == null) {\n        if (isRequired) {\n          if (props[propName] === null) {\n            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));\n          }\n          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));\n        }\n        return null;\n      } else {\n        return validate(props, propName, componentName, location, propFullName);\n      }\n    }\n\n    var chainedCheckType = checkType.bind(null, false);\n    chainedCheckType.isRequired = checkType.bind(null, true);\n\n    return chainedCheckType;\n  }\n\n  function createPrimitiveTypeChecker(expectedType) {\n    function validate(props, propName, componentName, location, propFullName, secret) {\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== expectedType) {\n        // `propValue` being instance of, say, date/regexp, pass the 'object'\n        // check, but we can offer a more precise error message here rather than\n        // 'of type `object`'.\n        var preciseType = getPreciseType(propValue);\n\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createAnyTypeChecker() {\n    return createChainableTypeChecker(emptyFunctionThatReturnsNull);\n  }\n\n  function createArrayOfTypeChecker(typeChecker) {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (typeof typeChecker !== 'function') {\n        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');\n      }\n      var propValue = props[propName];\n      if (!Array.isArray(propValue)) {\n        var propType = getPropType(propValue);\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));\n      }\n      for (var i = 0; i < propValue.length; i++) {\n        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);\n        if (error instanceof Error) {\n          return error;\n        }\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createElementTypeChecker() {\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      if (!isValidElement(propValue)) {\n        var propType = getPropType(propValue);\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createInstanceTypeChecker(expectedClass) {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (!(props[propName] instanceof expectedClass)) {\n        var expectedClassName = expectedClass.name || ANONYMOUS;\n        var actualClassName = getClassName(props[propName]);\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createEnumTypeChecker(expectedValues) {\n    if (!Array.isArray(expectedValues)) {\n       true ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : undefined;\n      return emptyFunctionThatReturnsNull;\n    }\n\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      for (var i = 0; i < expectedValues.length; i++) {\n        if (is(propValue, expectedValues[i])) {\n          return null;\n        }\n      }\n\n      var valuesString = JSON.stringify(expectedValues);\n      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createObjectOfTypeChecker(typeChecker) {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (typeof typeChecker !== 'function') {\n        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');\n      }\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== 'object') {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));\n      }\n      for (var key in propValue) {\n        if (propValue.hasOwnProperty(key)) {\n          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);\n          if (error instanceof Error) {\n            return error;\n          }\n        }\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createUnionTypeChecker(arrayOfTypeCheckers) {\n    if (!Array.isArray(arrayOfTypeCheckers)) {\n       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;\n      return emptyFunctionThatReturnsNull;\n    }\n\n    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {\n      var checker = arrayOfTypeCheckers[i];\n      if (typeof checker !== 'function') {\n        printWarning(\n          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +\n          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'\n        );\n        return emptyFunctionThatReturnsNull;\n      }\n    }\n\n    function validate(props, propName, componentName, location, propFullName) {\n      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {\n        var checker = arrayOfTypeCheckers[i];\n        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {\n          return null;\n        }\n      }\n\n      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createNodeChecker() {\n    function validate(props, propName, componentName, location, propFullName) {\n      if (!isNode(props[propName])) {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createShapeTypeChecker(shapeTypes) {\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== 'object') {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));\n      }\n      for (var key in shapeTypes) {\n        var checker = shapeTypes[key];\n        if (!checker) {\n          continue;\n        }\n        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);\n        if (error) {\n          return error;\n        }\n      }\n      return null;\n    }\n    return createChainableTypeChecker(validate);\n  }\n\n  function createStrictShapeTypeChecker(shapeTypes) {\n    function validate(props, propName, componentName, location, propFullName) {\n      var propValue = props[propName];\n      var propType = getPropType(propValue);\n      if (propType !== 'object') {\n        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));\n      }\n      // We need to check all keys in case some are required but missing from\n      // props.\n      var allKeys = assign({}, props[propName], shapeTypes);\n      for (var key in allKeys) {\n        var checker = shapeTypes[key];\n        if (!checker) {\n          return new PropTypeError(\n            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +\n            '\\nBad object: ' + JSON.stringify(props[propName], null, '  ') +\n            '\\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')\n          );\n        }\n        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);\n        if (error) {\n          return error;\n        }\n      }\n      return null;\n    }\n\n    return createChainableTypeChecker(validate);\n  }\n\n  function isNode(propValue) {\n    switch (typeof propValue) {\n      case 'number':\n      case 'string':\n      case 'undefined':\n        return true;\n      case 'boolean':\n        return !propValue;\n      case 'object':\n        if (Array.isArray(propValue)) {\n          return propValue.every(isNode);\n        }\n        if (propValue === null || isValidElement(propValue)) {\n          return true;\n        }\n\n        var iteratorFn = getIteratorFn(propValue);\n        if (iteratorFn) {\n          var iterator = iteratorFn.call(propValue);\n          var step;\n          if (iteratorFn !== propValue.entries) {\n            while (!(step = iterator.next()).done) {\n              if (!isNode(step.value)) {\n                return false;\n              }\n            }\n          } else {\n            // Iterator will provide entry [k,v] tuples rather than values.\n            while (!(step = iterator.next()).done) {\n              var entry = step.value;\n              if (entry) {\n                if (!isNode(entry[1])) {\n                  return false;\n                }\n              }\n            }\n          }\n        } else {\n          return false;\n        }\n\n        return true;\n      default:\n        return false;\n    }\n  }\n\n  function isSymbol(propType, propValue) {\n    // Native Symbol.\n    if (propType === 'symbol') {\n      return true;\n    }\n\n    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'\n    if (propValue['@@toStringTag'] === 'Symbol') {\n      return true;\n    }\n\n    // Fallback for non-spec compliant Symbols which are polyfilled.\n    if (typeof Symbol === 'function' && propValue instanceof Symbol) {\n      return true;\n    }\n\n    return false;\n  }\n\n  // Equivalent of `typeof` but with special handling for array and regexp.\n  function getPropType(propValue) {\n    var propType = typeof propValue;\n    if (Array.isArray(propValue)) {\n      return 'array';\n    }\n    if (propValue instanceof RegExp) {\n      // Old webkits (at least until Android 4.0) return 'function' rather than\n      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/\n      // passes PropTypes.object.\n      return 'object';\n    }\n    if (isSymbol(propType, propValue)) {\n      return 'symbol';\n    }\n    return propType;\n  }\n\n  // This handles more types than `getPropType`. Only used for error messages.\n  // See `createPrimitiveTypeChecker`.\n  function getPreciseType(propValue) {\n    if (typeof propValue === 'undefined' || propValue === null) {\n      return '' + propValue;\n    }\n    var propType = getPropType(propValue);\n    if (propType === 'object') {\n      if (propValue instanceof Date) {\n        return 'date';\n      } else if (propValue instanceof RegExp) {\n        return 'regexp';\n      }\n    }\n    return propType;\n  }\n\n  // Returns a string that is postfixed to a warning about an invalid type.\n  // For example, \"undefined\" or \"of type array\"\n  function getPostfixForTypeWarning(value) {\n    var type = getPreciseType(value);\n    switch (type) {\n      case 'array':\n      case 'object':\n        return 'an ' + type;\n      case 'boolean':\n      case 'date':\n      case 'regexp':\n        return 'a ' + type;\n      default:\n        return type;\n    }\n  }\n\n  // Returns class name of the object, if any.\n  function getClassName(propValue) {\n    if (!propValue.constructor || !propValue.constructor.name) {\n      return ANONYMOUS;\n    }\n    return propValue.constructor.name;\n  }\n\n  ReactPropTypes.checkPropTypes = checkPropTypes;\n  ReactPropTypes.PropTypes = ReactPropTypes;\n\n  return ReactPropTypes;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/prop-types/factoryWithTypeCheckers.js?");

/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\nif (true) {\n  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&\n    Symbol.for &&\n    Symbol.for('react.element')) ||\n    0xeac7;\n\n  var isValidElement = function(object) {\n    return typeof object === 'object' &&\n      object !== null &&\n      object.$$typeof === REACT_ELEMENT_TYPE;\n  };\n\n  // By explicitly using `prop-types` you are opting into new development behavior.\n  // http://fb.me/prop-types-in-prod\n  var throwOnDirectAccess = true;\n  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ \"./node_modules/prop-types/factoryWithTypeCheckers.js\")(isValidElement, throwOnDirectAccess);\n} else {}\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/prop-types/index.js?");

/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2013-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n */\n\n\n\nvar ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';\n\nmodule.exports = ReactPropTypesSecret;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/prop-types/lib/ReactPropTypesSecret.js?");

/***/ }),

/***/ "./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js ***!
  \***************************************************************************/
/*! exports provided: IGNORE_CLASS_NAME, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"IGNORE_CLASS_NAME\", function() { return IGNORE_CLASS_NAME; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ \"react-dom\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction _inheritsLoose(subClass, superClass) {\n  subClass.prototype = Object.create(superClass.prototype);\n  subClass.prototype.constructor = subClass;\n  subClass.__proto__ = superClass;\n}\n\nfunction _objectWithoutProperties(source, excluded) {\n  if (source == null) return {};\n  var target = {};\n  var sourceKeys = Object.keys(source);\n  var key, i;\n\n  for (i = 0; i < sourceKeys.length; i++) {\n    key = sourceKeys[i];\n    if (excluded.indexOf(key) >= 0) continue;\n    target[key] = source[key];\n  }\n\n  if (Object.getOwnPropertySymbols) {\n    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);\n\n    for (i = 0; i < sourceSymbolKeys.length; i++) {\n      key = sourceSymbolKeys[i];\n      if (excluded.indexOf(key) >= 0) continue;\n      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;\n      target[key] = source[key];\n    }\n  }\n\n  return target;\n}\n\n/**\n * Check whether some DOM node is our Component's node.\n */\nfunction isNodeFound(current, componentNode, ignoreClass) {\n  if (current === componentNode) {\n    return true;\n  } // SVG <use/> elements do not technically reside in the rendered DOM, so\n  // they do not have classList directly, but they offer a link to their\n  // corresponding element, which can have classList. This extra check is for\n  // that case.\n  // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement\n  // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17\n\n\n  if (current.correspondingElement) {\n    return current.correspondingElement.classList.contains(ignoreClass);\n  }\n\n  return current.classList.contains(ignoreClass);\n}\n/**\n * Try to find our node in a hierarchy of nodes, returning the document\n * node as highest node if our node is not found in the path up.\n */\n\nfunction findHighest(current, componentNode, ignoreClass) {\n  if (current === componentNode) {\n    return true;\n  } // If source=local then this event came from 'somewhere'\n  // inside and should be ignored. We could handle this with\n  // a layered approach, too, but that requires going back to\n  // thinking in terms of Dom node nesting, running counter\n  // to React's 'you shouldn't care about the DOM' philosophy.\n\n\n  while (current.parentNode) {\n    if (isNodeFound(current, componentNode, ignoreClass)) {\n      return true;\n    }\n\n    current = current.parentNode;\n  }\n\n  return current;\n}\n/**\n * Check if the browser scrollbar was clicked\n */\n\nfunction clickedScrollbar(evt) {\n  return document.documentElement.clientWidth <= evt.clientX || document.documentElement.clientHeight <= evt.clientY;\n}\n\n// ideally will get replaced with external dep\n// when rafrex/detect-passive-events#4 and rafrex/detect-passive-events#5 get merged in\nvar testPassiveEventSupport = function testPassiveEventSupport() {\n  if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') {\n    return;\n  }\n\n  var passive = false;\n  var options = Object.defineProperty({}, 'passive', {\n    get: function get() {\n      passive = true;\n    }\n  });\n\n  var noop = function noop() {};\n\n  window.addEventListener('testPassiveEventSupport', noop, options);\n  window.removeEventListener('testPassiveEventSupport', noop, options);\n  return passive;\n};\n\nfunction autoInc(seed) {\n  if (seed === void 0) {\n    seed = 0;\n  }\n\n  return function () {\n    return ++seed;\n  };\n}\n\nvar uid = autoInc();\n\nvar passiveEventSupport;\nvar handlersMap = {};\nvar enabledInstances = {};\nvar touchEvents = ['touchstart', 'touchmove'];\nvar IGNORE_CLASS_NAME = 'ignore-react-onclickoutside';\n/**\n * Options for addEventHandler and removeEventHandler\n */\n\nfunction getEventHandlerOptions(instance, eventName) {\n  var handlerOptions = null;\n  var isTouchEvent = touchEvents.indexOf(eventName) !== -1;\n\n  if (isTouchEvent && passiveEventSupport) {\n    handlerOptions = {\n      passive: !instance.props.preventDefault\n    };\n  }\n\n  return handlerOptions;\n}\n/**\n * This function generates the HOC function that you'll use\n * in order to impart onOutsideClick listening to an\n * arbitrary component. It gets called at the end of the\n * bootstrapping code to yield an instance of the\n * onClickOutsideHOC function defined inside setupHOC().\n */\n\n\nfunction onClickOutsideHOC(WrappedComponent, config) {\n  var _class, _temp;\n\n  return _temp = _class =\n  /*#__PURE__*/\n  function (_Component) {\n    _inheritsLoose(onClickOutside, _Component);\n\n    function onClickOutside(props) {\n      var _this;\n\n      _this = _Component.call(this, props) || this;\n\n      _this.__outsideClickHandler = function (event) {\n        if (typeof _this.__clickOutsideHandlerProp === 'function') {\n          _this.__clickOutsideHandlerProp(event);\n\n          return;\n        }\n\n        var instance = _this.getInstance();\n\n        if (typeof instance.props.handleClickOutside === 'function') {\n          instance.props.handleClickOutside(event);\n          return;\n        }\n\n        if (typeof instance.handleClickOutside === 'function') {\n          instance.handleClickOutside(event);\n          return;\n        }\n\n        throw new Error('WrappedComponent lacks a handleClickOutside(event) function for processing outside click events.');\n      };\n\n      _this.enableOnClickOutside = function () {\n        if (typeof document === 'undefined' || enabledInstances[_this._uid]) {\n          return;\n        }\n\n        if (typeof passiveEventSupport === 'undefined') {\n          passiveEventSupport = testPassiveEventSupport();\n        }\n\n        enabledInstances[_this._uid] = true;\n        var events = _this.props.eventTypes;\n\n        if (!events.forEach) {\n          events = [events];\n        }\n\n        handlersMap[_this._uid] = function (event) {\n          if (_this.props.disableOnClickOutside) return;\n          if (_this.componentNode === null) return;\n\n          if (_this.props.preventDefault) {\n            event.preventDefault();\n          }\n\n          if (_this.props.stopPropagation) {\n            event.stopPropagation();\n          }\n\n          if (_this.props.excludeScrollbar && clickedScrollbar(event)) return;\n          var current = event.target;\n\n          if (findHighest(current, _this.componentNode, _this.props.outsideClickIgnoreClass) !== document) {\n            return;\n          }\n\n          _this.__outsideClickHandler(event);\n        };\n\n        events.forEach(function (eventName) {\n          document.addEventListener(eventName, handlersMap[_this._uid], getEventHandlerOptions(_this, eventName));\n        });\n      };\n\n      _this.disableOnClickOutside = function () {\n        delete enabledInstances[_this._uid];\n        var fn = handlersMap[_this._uid];\n\n        if (fn && typeof document !== 'undefined') {\n          var events = _this.props.eventTypes;\n\n          if (!events.forEach) {\n            events = [events];\n          }\n\n          events.forEach(function (eventName) {\n            return document.removeEventListener(eventName, fn, getEventHandlerOptions(_this, eventName));\n          });\n          delete handlersMap[_this._uid];\n        }\n      };\n\n      _this.getRef = function (ref) {\n        return _this.instanceRef = ref;\n      };\n\n      _this._uid = uid();\n      return _this;\n    }\n    /**\n     * Access the WrappedComponent's instance.\n     */\n\n\n    var _proto = onClickOutside.prototype;\n\n    _proto.getInstance = function getInstance() {\n      if (!WrappedComponent.prototype.isReactComponent) {\n        return this;\n      }\n\n      var ref = this.instanceRef;\n      return ref.getInstance ? ref.getInstance() : ref;\n    };\n\n    /**\n     * Add click listeners to the current document,\n     * linked to this component's state.\n     */\n    _proto.componentDidMount = function componentDidMount() {\n      // If we are in an environment without a DOM such\n      // as shallow rendering or snapshots then we exit\n      // early to prevent any unhandled errors being thrown.\n      if (typeof document === 'undefined' || !document.createElement) {\n        return;\n      }\n\n      var instance = this.getInstance();\n\n      if (config && typeof config.handleClickOutside === 'function') {\n        this.__clickOutsideHandlerProp = config.handleClickOutside(instance);\n\n        if (typeof this.__clickOutsideHandlerProp !== 'function') {\n          throw new Error('WrappedComponent lacks a function for processing outside click events specified by the handleClickOutside config option.');\n        }\n      }\n\n      this.componentNode = Object(react_dom__WEBPACK_IMPORTED_MODULE_1__[\"findDOMNode\"])(this.getInstance());\n      this.enableOnClickOutside();\n    };\n\n    _proto.componentDidUpdate = function componentDidUpdate() {\n      this.componentNode = Object(react_dom__WEBPACK_IMPORTED_MODULE_1__[\"findDOMNode\"])(this.getInstance());\n    };\n    /**\n     * Remove all document's event listeners for this component\n     */\n\n\n    _proto.componentWillUnmount = function componentWillUnmount() {\n      this.disableOnClickOutside();\n    };\n    /**\n     * Can be called to explicitly enable event listening\n     * for clicks and touches outside of this element.\n     */\n\n\n    /**\n     * Pass-through render\n     */\n    _proto.render = function render() {\n      // eslint-disable-next-line no-unused-vars\n      var _props = this.props,\n          excludeScrollbar = _props.excludeScrollbar,\n          props = _objectWithoutProperties(_props, [\"excludeScrollbar\"]);\n\n      if (WrappedComponent.prototype.isReactComponent) {\n        props.ref = this.getRef;\n      } else {\n        props.wrappedRef = this.getRef;\n      }\n\n      props.disableOnClickOutside = this.disableOnClickOutside;\n      props.enableOnClickOutside = this.enableOnClickOutside;\n      return Object(react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"])(WrappedComponent, props);\n    };\n\n    return onClickOutside;\n  }(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]), _class.displayName = \"OnClickOutside(\" + (WrappedComponent.displayName || WrappedComponent.name || 'Component') + \")\", _class.defaultProps = {\n    eventTypes: ['mousedown', 'touchstart'],\n    excludeScrollbar: config && config.excludeScrollbar || false,\n    outsideClickIgnoreClass: IGNORE_CLASS_NAME,\n    preventDefault: false,\n    stopPropagation: false\n  }, _class.getClass = function () {\n    return WrappedComponent.getClass ? WrappedComponent.getClass() : WrappedComponent;\n  }, _temp;\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (onClickOutsideHOC);\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js?");

/***/ }),

/***/ "./node_modules/react-overlays/lib/LegacyPortal.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-overlays/lib/LegacyPortal.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _componentOrElement = __webpack_require__(/*! prop-types-extra/lib/componentOrElement */ \"./node_modules/prop-types-extra/lib/componentOrElement.js\");\n\nvar _componentOrElement2 = _interopRequireDefault(_componentOrElement);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _getContainer = __webpack_require__(/*! ./utils/getContainer */ \"./node_modules/react-overlays/lib/utils/getContainer.js\");\n\nvar _getContainer2 = _interopRequireDefault(_getContainer);\n\nvar _ownerDocument = __webpack_require__(/*! ./utils/ownerDocument */ \"./node_modules/react-overlays/lib/utils/ownerDocument.js\");\n\nvar _ownerDocument2 = _interopRequireDefault(_ownerDocument);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * The `<Portal/>` component renders its children into a new \"subtree\" outside of current component hierarchy.\n * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.\n * The children of `<Portal/>` component will be appended to the `container` specified.\n */\nvar Portal = function (_React$Component) {\n  _inherits(Portal, _React$Component);\n\n  function Portal() {\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, Portal);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this._mountOverlayTarget = function () {\n      if (!_this._overlayTarget) {\n        _this._overlayTarget = document.createElement('div');\n        _this._portalContainerNode = (0, _getContainer2.default)(_this.props.container, (0, _ownerDocument2.default)(_this).body);\n        _this._portalContainerNode.appendChild(_this._overlayTarget);\n      }\n    }, _this._unmountOverlayTarget = function () {\n      if (_this._overlayTarget) {\n        _this._portalContainerNode.removeChild(_this._overlayTarget);\n        _this._overlayTarget = null;\n      }\n      _this._portalContainerNode = null;\n    }, _this._renderOverlay = function () {\n      var overlay = !_this.props.children ? null : _react2.default.Children.only(_this.props.children);\n\n      // Save reference for future access.\n      if (overlay !== null) {\n        _this._mountOverlayTarget();\n\n        var initialRender = !_this._overlayInstance;\n\n        _this._overlayInstance = _reactDom2.default.unstable_renderSubtreeIntoContainer(_this, overlay, _this._overlayTarget, function () {\n          if (initialRender && _this.props.onRendered) {\n            _this.props.onRendered();\n          }\n        });\n      } else {\n        // Unrender if the component is null for transitions to null\n        _this._unrenderOverlay();\n        _this._unmountOverlayTarget();\n      }\n    }, _this._unrenderOverlay = function () {\n      if (_this._overlayTarget) {\n        _reactDom2.default.unmountComponentAtNode(_this._overlayTarget);\n        _this._overlayInstance = null;\n      }\n    }, _this.getMountNode = function () {\n      return _this._overlayTarget;\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  Portal.prototype.componentDidMount = function componentDidMount() {\n    this._isMounted = true;\n    this._renderOverlay();\n  };\n\n  Portal.prototype.componentDidUpdate = function componentDidUpdate() {\n    this._renderOverlay();\n  };\n\n  Portal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {\n    if (this._overlayTarget && nextProps.container !== this.props.container) {\n      this._portalContainerNode.removeChild(this._overlayTarget);\n      this._portalContainerNode = (0, _getContainer2.default)(nextProps.container, (0, _ownerDocument2.default)(this).body);\n      this._portalContainerNode.appendChild(this._overlayTarget);\n    }\n  };\n\n  Portal.prototype.componentWillUnmount = function componentWillUnmount() {\n    this._isMounted = false;\n    this._unrenderOverlay();\n    this._unmountOverlayTarget();\n  };\n\n  Portal.prototype.render = function render() {\n    return null;\n  };\n\n  return Portal;\n}(_react2.default.Component);\n\nPortal.displayName = 'Portal';\nPortal.propTypes = {\n  /**\n   * A Node, Component instance, or function that returns either. The `container` will have the Portal children\n   * appended to it.\n   */\n  container: _propTypes2.default.oneOfType([_componentOrElement2.default, _propTypes2.default.func]),\n\n  onRendered: _propTypes2.default.func\n};\nexports.default = Portal;\nmodule.exports = exports['default'];\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/react-overlays/lib/LegacyPortal.js?");

/***/ }),

/***/ "./node_modules/react-overlays/lib/Portal.js":
/*!***************************************************!*\
  !*** ./node_modules/react-overlays/lib/Portal.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _componentOrElement = __webpack_require__(/*! prop-types-extra/lib/componentOrElement */ \"./node_modules/prop-types-extra/lib/componentOrElement.js\");\n\nvar _componentOrElement2 = _interopRequireDefault(_componentOrElement);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _getContainer = __webpack_require__(/*! ./utils/getContainer */ \"./node_modules/react-overlays/lib/utils/getContainer.js\");\n\nvar _getContainer2 = _interopRequireDefault(_getContainer);\n\nvar _ownerDocument = __webpack_require__(/*! ./utils/ownerDocument */ \"./node_modules/react-overlays/lib/utils/ownerDocument.js\");\n\nvar _ownerDocument2 = _interopRequireDefault(_ownerDocument);\n\nvar _LegacyPortal = __webpack_require__(/*! ./LegacyPortal */ \"./node_modules/react-overlays/lib/LegacyPortal.js\");\n\nvar _LegacyPortal2 = _interopRequireDefault(_LegacyPortal);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * The `<Portal/>` component renders its children into a new \"subtree\" outside of current component hierarchy.\n * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.\n * The children of `<Portal/>` component will be appended to the `container` specified.\n */\nvar Portal = function (_React$Component) {\n  _inherits(Portal, _React$Component);\n\n  function Portal() {\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, Portal);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.setContainer = function () {\n      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;\n\n      _this._portalContainerNode = (0, _getContainer2.default)(props.container, (0, _ownerDocument2.default)(_this).body);\n    }, _this.getMountNode = function () {\n      return _this._portalContainerNode;\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  Portal.prototype.componentDidMount = function componentDidMount() {\n    this.setContainer();\n    this.forceUpdate(this.props.onRendered);\n  };\n\n  Portal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {\n    if (nextProps.container !== this.props.container) {\n      this.setContainer(nextProps);\n    }\n  };\n\n  Portal.prototype.componentWillUnmount = function componentWillUnmount() {\n    this._portalContainerNode = null;\n  };\n\n  Portal.prototype.render = function render() {\n    return this.props.children && this._portalContainerNode ? _reactDom2.default.createPortal(this.props.children, this._portalContainerNode) : null;\n  };\n\n  return Portal;\n}(_react2.default.Component);\n\nPortal.displayName = 'Portal';\nPortal.propTypes = {\n  /**\n   * A Node, Component instance, or function that returns either. The `container` will have the Portal children\n   * appended to it.\n   */\n  container: _propTypes2.default.oneOfType([_componentOrElement2.default, _propTypes2.default.func]),\n\n  onRendered: _propTypes2.default.func\n};\nexports.default = _reactDom2.default.createPortal ? Portal : _LegacyPortal2.default;\nmodule.exports = exports['default'];\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/react-overlays/lib/Portal.js?");

/***/ }),

/***/ "./node_modules/react-overlays/lib/utils/getContainer.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-overlays/lib/utils/getContainer.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\nexports.default = getContainer;\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction getContainer(container, defaultContainer) {\n  container = typeof container === 'function' ? container() : container;\n  return _reactDom2.default.findDOMNode(container) || defaultContainer;\n}\nmodule.exports = exports['default'];\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/react-overlays/lib/utils/getContainer.js?");

/***/ }),

/***/ "./node_modules/react-overlays/lib/utils/ownerDocument.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-overlays/lib/utils/ownerDocument.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nexports.__esModule = true;\n\nexports.default = function (componentOrElement) {\n  return (0, _ownerDocument2.default)(_reactDom2.default.findDOMNode(componentOrElement));\n};\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _ownerDocument = __webpack_require__(/*! dom-helpers/ownerDocument */ \"./node_modules/dom-helpers/ownerDocument.js\");\n\nvar _ownerDocument2 = _interopRequireDefault(_ownerDocument);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nmodule.exports = exports['default'];\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/react-overlays/lib/utils/ownerDocument.js?");

/***/ }),

/***/ "./node_modules/react-popper/lib/cjs/Manager.js":
/*!******************************************************!*\
  !*** ./node_modules/react-popper/lib/cjs/Manager.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.ManagerContext = undefined;\n\nvar _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ \"./node_modules/babel-runtime/helpers/extends.js\");\n\nvar _extends3 = _interopRequireDefault(_extends2);\n\nvar _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ \"./node_modules/babel-runtime/core-js/object/get-prototype-of.js\");\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"./node_modules/babel-runtime/helpers/possibleConstructorReturn.js\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"./node_modules/babel-runtime/helpers/inherits.js\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar React = _interopRequireWildcard(_react);\n\nvar _createReactContext = __webpack_require__(/*! create-react-context */ \"./node_modules/create-react-context/lib/index.js\");\n\nvar _createReactContext2 = _interopRequireDefault(_createReactContext);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar ManagerContext = exports.ManagerContext = (0, _createReactContext2.default)({ getReferenceRef: undefined, referenceNode: undefined });\n\nvar Manager = function (_React$Component) {\n  (0, _inherits3.default)(Manager, _React$Component);\n\n  function Manager() {\n    (0, _classCallCheck3.default)(this, Manager);\n\n    var _this = (0, _possibleConstructorReturn3.default)(this, (Manager.__proto__ || (0, _getPrototypeOf2.default)(Manager)).call(this));\n\n    _this.getReferenceRef = function (referenceNode) {\n      return _this.setState(function (_ref) {\n        var context = _ref.context;\n        return {\n          context: (0, _extends3.default)({}, context, { referenceNode: referenceNode })\n        };\n      });\n    };\n\n    _this.state = {\n      context: {\n        getReferenceRef: _this.getReferenceRef,\n        referenceNode: undefined\n      }\n    };\n    return _this;\n  }\n\n  (0, _createClass3.default)(Manager, [{\n    key: \"render\",\n    value: function render() {\n      return React.createElement(\n        ManagerContext.Provider,\n        { value: this.state.context },\n        this.props.children\n      );\n    }\n  }]);\n  return Manager;\n}(React.Component);\n\nexports.default = Manager;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/react-popper/lib/cjs/Manager.js?");

/***/ }),

/***/ "./node_modules/react-popper/lib/cjs/Popper.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-popper/lib/cjs/Popper.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.placements = exports.InnerPopper = undefined;\n\nvar _extends2 = __webpack_require__(/*! babel-runtime/helpers/extends */ \"./node_modules/babel-runtime/helpers/extends.js\");\n\nvar _extends3 = _interopRequireDefault(_extends2);\n\nvar _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ \"./node_modules/babel-runtime/core-js/object/get-prototype-of.js\");\n\nvar _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);\n\nvar _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ \"./node_modules/babel-runtime/helpers/classCallCheck.js\");\n\nvar _classCallCheck3 = _interopRequireDefault(_classCallCheck2);\n\nvar _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ \"./node_modules/babel-runtime/helpers/createClass.js\");\n\nvar _createClass3 = _interopRequireDefault(_createClass2);\n\nvar _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ \"./node_modules/babel-runtime/helpers/possibleConstructorReturn.js\");\n\nvar _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);\n\nvar _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ \"./node_modules/babel-runtime/helpers/inherits.js\");\n\nvar _inherits3 = _interopRequireDefault(_inherits2);\n\nexports.default = Popper;\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar React = _interopRequireWildcard(_react);\n\nvar _popper = __webpack_require__(/*! popper.js */ \"./node_modules/popper.js/dist/esm/popper.js\");\n\nvar _popper2 = _interopRequireDefault(_popper);\n\nvar _Manager = __webpack_require__(/*! ./Manager */ \"./node_modules/react-popper/lib/cjs/Manager.js\");\n\nvar _utils = __webpack_require__(/*! ./utils */ \"./node_modules/react-popper/lib/cjs/utils.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar initialStyle = {\n  position: 'absolute',\n  top: 0,\n  left: 0,\n  opacity: 0,\n  pointerEvents: 'none'\n};\n\nvar initialArrowStyle = {};\n\nvar InnerPopper = exports.InnerPopper = function (_React$Component) {\n  (0, _inherits3.default)(InnerPopper, _React$Component);\n\n  function InnerPopper() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    (0, _classCallCheck3.default)(this, InnerPopper);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = InnerPopper.__proto__ || (0, _getPrototypeOf2.default)(InnerPopper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {\n      popperNode: undefined,\n      arrowNode: undefined,\n      popperInstance: undefined,\n      data: undefined\n    }, _this.setPopperNode = function (popperNode) {\n      (0, _utils.safeInvoke)(_this.props.innerRef, popperNode);\n      _this.setState({ popperNode: popperNode });\n    }, _this.setArrowNode = function (arrowNode) {\n      return _this.setState({ arrowNode: arrowNode });\n    }, _this.updateStateModifier = {\n      enabled: true,\n      order: 900,\n      fn: function fn(data) {\n        _this.setState({ data: data });\n        return data;\n      }\n    }, _this.getOptions = function () {\n      return {\n        placement: _this.props.placement,\n        eventsEnabled: _this.props.eventsEnabled,\n        positionFixed: _this.props.positionFixed,\n        modifiers: (0, _extends3.default)({}, _this.props.modifiers, {\n          arrow: {\n            enabled: !!_this.state.arrowNode,\n            element: _this.state.arrowNode\n          },\n          applyStyle: { enabled: false },\n          updateStateModifier: _this.updateStateModifier\n        })\n      };\n    }, _this.getPopperStyle = function () {\n      return !_this.state.popperNode || !_this.state.data ? initialStyle : (0, _extends3.default)({\n        position: _this.state.data.offsets.popper.position\n      }, _this.state.data.styles);\n    }, _this.getPopperPlacement = function () {\n      return !_this.state.data ? undefined : _this.state.data.placement;\n    }, _this.getArrowStyle = function () {\n      return !_this.state.arrowNode || !_this.state.data ? initialArrowStyle : _this.state.data.arrowStyles;\n    }, _this.getOutOfBoundariesState = function () {\n      return _this.state.data ? _this.state.data.hide : undefined;\n    }, _this.initPopperInstance = function () {\n      var referenceElement = _this.props.referenceElement;\n      var _this$state = _this.state,\n          popperNode = _this$state.popperNode,\n          popperInstance = _this$state.popperInstance;\n\n      if (referenceElement && popperNode && !popperInstance) {\n        var _popperInstance = new _popper2.default(referenceElement, popperNode, _this.getOptions());\n        _this.setState({ popperInstance: _popperInstance });\n        return true;\n      }\n      return false;\n    }, _this.destroyPopperInstance = function (callback) {\n      if (_this.state.popperInstance) {\n        _this.state.popperInstance.destroy();\n      }\n      _this.setState({ popperInstance: undefined }, callback);\n    }, _this.updatePopperInstance = function () {\n      if (_this.state.popperInstance) {\n        _this.destroyPopperInstance(function () {\n          return _this.initPopperInstance();\n        });\n      }\n    }, _this.scheduleUpdate = function () {\n      if (_this.state.popperInstance) {\n        _this.state.popperInstance.scheduleUpdate();\n      }\n    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);\n  }\n\n  (0, _createClass3.default)(InnerPopper, [{\n    key: 'componentDidUpdate',\n    value: function componentDidUpdate(prevProps, prevState) {\n      // If needed, initialize the Popper.js instance\n      // it will return `true` if it initialized a new instance, or `false` otherwise\n      // if it returns `false`, we make sure Popper props haven't changed, and update\n      // the Popper.js instance if needed\n      if (!this.initPopperInstance()) {\n        // If the Popper.js options have changed, update the instance (destroy + create)\n        if (this.props.placement !== prevProps.placement || this.props.eventsEnabled !== prevProps.eventsEnabled || this.state.arrowNode !== prevState.arrowNode || this.state.popperNode !== prevState.popperNode || this.props.referenceElement !== prevProps.referenceElement || this.props.positionFixed !== prevProps.positionFixed) {\n          this.updatePopperInstance();\n        }\n      }\n    }\n  }, {\n    key: 'componentWillUnmount',\n    value: function componentWillUnmount() {\n      if (this.state.popperInstance) {\n        this.state.popperInstance.destroy();\n      }\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      return (0, _utils.unwrapArray)(this.props.children)({\n        ref: this.setPopperNode,\n        style: this.getPopperStyle(),\n        placement: this.getPopperPlacement(),\n        outOfBoundaries: this.getOutOfBoundariesState(),\n        scheduleUpdate: this.scheduleUpdate,\n        arrowProps: {\n          ref: this.setArrowNode,\n          style: this.getArrowStyle()\n        }\n      });\n    }\n  }]);\n  return InnerPopper;\n}(React.Component);\n\nInnerPopper.defaultProps = {\n  placement: 'bottom',\n  eventsEnabled: true,\n  referenceElement: undefined,\n  positionFixed: false\n};\n\n\nvar placements = _popper2.default.placements;\nexports.placements = placements;\nfunction Popper(props) {\n  return React.createElement(\n    _Manager.ManagerContext.Consumer,\n    null,\n    function (_ref2) {\n      var referenceNode = _ref2.referenceNode;\n      return React.createElement(InnerPopper, (0, _extends3.default)({ referenceElement: referenceNode }, props));\n    }\n  );\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/react-popper/lib/cjs/Popper.js?");

/***/ }),

/***/ "./node_modules/react-popper/lib/cjs/utils.js":
/*!****************************************************!*\
  !*** ./node_modules/react-popper/lib/cjs/utils.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.safeInvoke = exports.unwrapArray = undefined;\n\nvar _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ \"./node_modules/babel-runtime/helpers/toConsumableArray.js\");\n\nvar _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Takes an argument and if it's an array, returns the first item in the array,\n * otherwise returns the argument. Used for Preact compatibility.\n */\nvar unwrapArray = exports.unwrapArray = function unwrapArray(arg) {\n  return Array.isArray(arg) ? arg[0] : arg;\n};\n\n/**\n * Takes a maybe-undefined function and arbitrary args and invokes the function\n * only if it is defined.\n */\nvar safeInvoke = exports.safeInvoke = function safeInvoke(fn) {\n  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n    args[_key - 1] = arguments[_key];\n  }\n\n  if (typeof fn === \"function\") {\n    return fn.apply(undefined, (0, _toConsumableArray3.default)(args));\n  }\n};\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/react-popper/lib/cjs/utils.js?");

/***/ }),

/***/ "./node_modules/warning/warning.js":
/*!*****************************************!*\
  !*** ./node_modules/warning/warning.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/**\n * Copyright (c) 2014-present, Facebook, Inc.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE file in the root directory of this source tree.\n *\n * @providesModule warning\n */\n\n\n\n/**\n * Similar to invariant but only logs a warning if the condition is not met.\n * This can be used to log issues in development environments in critical\n * paths. Removing the logging code for production environments will keep the\n * same logic and follow the same code paths.\n */\n\nvar __DEV__ = \"development\" !== 'production';\n\nvar warning = function() {};\n\nif (__DEV__) {\n  var printWarning = function printWarning(format, args) {\n    var len = arguments.length;\n    args = new Array(len > 2 ? len - 2 : 0);\n    for (var key = 2; key < len; key++) {\n      args[key - 2] = arguments[key];\n    }\n    var argIndex = 0;\n    var message = 'Warning: ' +\n      format.replace(/%s/g, function() {\n        return args[argIndex++];\n      });\n    if (typeof console !== 'undefined') {\n      console.error(message);\n    }\n    try {\n      // --- Welcome to debugging React ---\n      // This error was thrown as a convenience so that you can use this stack\n      // to find the callsite that caused this warning to fire.\n      throw new Error(message);\n    } catch (x) {}\n  }\n\n  warning = function(condition, format, args) {\n    var len = arguments.length;\n    args = new Array(len > 2 ? len - 2 : 0);\n    for (var key = 2; key < len; key++) {\n      args[key - 2] = arguments[key];\n    }\n    if (format === undefined) {\n      throw new Error(\n          '`warning(condition, format, ...args)` requires a warning ' +\n          'message argument'\n      );\n    }\n    if (!condition) {\n      printWarning.apply(null, [format].concat(args));\n    }\n  };\n}\n\nmodule.exports = warning;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./node_modules/warning/warning.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/(webpack)/buildin/global.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function(module) {\n\tif (!module.webpackPolyfill) {\n\t\tmodule.deprecate = function() {};\n\t\tmodule.paths = [];\n\t\t// module.parent = undefined by default\n\t\tif (!module.children) module.children = [];\n\t\tObject.defineProperty(module, \"loaded\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.l;\n\t\t\t}\n\t\t});\n\t\tObject.defineProperty(module, \"id\", {\n\t\t\tenumerable: true,\n\t\t\tget: function() {\n\t\t\t\treturn module.i;\n\t\t\t}\n\t\t});\n\t\tmodule.webpackPolyfill = 1;\n\t}\n\treturn module;\n};\n\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/(webpack)/buildin/module.js?");

/***/ }),

/***/ "./src/AsyncTypeahead.react.js":
/*!*************************************!*\
  !*** ./src/AsyncTypeahead.react.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _asyncContainer = __webpack_require__(/*! ./containers/asyncContainer */ \"./src/containers/asyncContainer.js\");\n\nvar _asyncContainer2 = _interopRequireDefault(_asyncContainer);\n\nvar _Typeahead = __webpack_require__(/*! ./Typeahead.react */ \"./src/Typeahead.react.js\");\n\nvar _Typeahead2 = _interopRequireDefault(_Typeahead);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = (0, _asyncContainer2.default)(_Typeahead2.default);\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/AsyncTypeahead.react.js?");

/***/ }),

/***/ "./src/AutosizeInput.react.js":
/*!************************************!*\
  !*** ./src/AutosizeInput.react.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar SIZER_STYLE = {\n  height: 0,\n  left: 0,\n  overflow: 'scroll',\n  position: 'absolute',\n  top: 0,\n  visibility: 'hidden',\n  whiteSpace: 'pre'\n};\n\nvar INPUT_PROPS_BLACKLIST = ['inputClassName', 'inputRef', 'inputStyle'];\n\nvar MIN_WIDTH = 1;\n\nvar cleanInputProps = function cleanInputProps(inputProps) {\n  INPUT_PROPS_BLACKLIST.forEach(function (field) {\n    return delete inputProps[field];\n  });\n  return inputProps;\n};\n\nvar copyStyles = function copyStyles(styles, node) {\n  node.style.fontSize = styles.fontSize;\n  node.style.fontFamily = styles.fontFamily;\n  node.style.fontWeight = styles.fontWeight;\n  node.style.fontStyle = styles.fontStyle;\n  node.style.letterSpacing = styles.letterSpacing;\n  node.style.textTransform = styles.textTransform;\n};\n\nvar AutosizeInput = function (_React$Component) {\n  _inherits(AutosizeInput, _React$Component);\n\n  function AutosizeInput() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, AutosizeInput);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AutosizeInput.__proto__ || Object.getPrototypeOf(AutosizeInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {\n      inputWidth: MIN_WIDTH\n    }, _this._copyInputStyles = function () {\n      var inputStyles = _this._input && window.getComputedStyle && window.getComputedStyle(_this._input);\n\n      if (!inputStyles) {\n        return;\n      }\n\n      copyStyles(inputStyles, _this._sizer);\n\n      if (_this._placeHolderSizer) {\n        copyStyles(inputStyles, _this._placeHolderSizer);\n      }\n    }, _this._updateInputWidth = function () {\n      if (!_this._sizer || _this._sizer.scrollWidth === undefined) {\n        return;\n      }\n\n      _this._copyInputStyles();\n\n      var placeholderWidth = _this._placeHolderSizer && _this._placeHolderSizer.scrollWidth || MIN_WIDTH;\n\n      var inputWidth = Math.max(_this._sizer.scrollWidth, placeholderWidth) + 2;\n\n      if (inputWidth !== _this.state.inputWidth) {\n        _this.setState({ inputWidth: inputWidth });\n      }\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(AutosizeInput, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      this._updateInputWidth();\n    }\n  }, {\n    key: 'componentDidUpdate',\n    value: function componentDidUpdate(prevProps, prevState) {\n      this._updateInputWidth();\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this2 = this;\n\n      var _props = this.props,\n          className = _props.className,\n          defaultValue = _props.defaultValue,\n          placeholder = _props.placeholder,\n          value = _props.value;\n\n\n      var wrapperStyle = _extends({}, this.props.style);\n      if (!wrapperStyle.display) {\n        wrapperStyle.display = 'inline-block';\n      }\n\n      var inputProps = cleanInputProps(_extends({}, this.props, {\n        className: this.props.inputClassName,\n        style: _extends({}, this.props.inputStyle, {\n          boxSizing: 'content-box',\n          width: this.state.inputWidth + 'px'\n        })\n      }));\n\n      return _react2.default.createElement(\n        'div',\n        { className: className, style: wrapperStyle },\n        _react2.default.createElement('input', _extends({}, inputProps, {\n          ref: function ref(el) {\n            _this2._input = el;\n            if (typeof _this2.props.inputRef === 'function') {\n              _this2.props.inputRef(el);\n            }\n          }\n        })),\n        _react2.default.createElement(\n          'div',\n          {\n            ref: function ref(el) {\n              return _this2._sizer = el;\n            },\n            style: SIZER_STYLE },\n          defaultValue || value || ''\n        ),\n        placeholder ? _react2.default.createElement(\n          'div',\n          {\n            ref: function ref(el) {\n              return _this2._placeHolderSizer = el;\n            },\n            style: SIZER_STYLE },\n          placeholder\n        ) : null\n      );\n    }\n  }]);\n\n  return AutosizeInput;\n}(_react2.default.Component);\n\nAutosizeInput.propTypes = {\n  /**\n   * ClassName for the input element.\n   */\n  inputClassName: _propTypes2.default.string,\n  /**\n   * Ref callback for the input element.\n   */\n  inputRef: _propTypes2.default.func,\n  /**\n   * CSS styles for the input element.\n   */\n  inputStyle: _propTypes2.default.object\n};\n\nexports.default = AutosizeInput;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/AutosizeInput.react.js?");

/***/ }),

/***/ "./src/ClearButton.react.js":
/*!**********************************!*\
  !*** ./src/ClearButton.react.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _classnames = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n\nvar _classnames2 = _interopRequireDefault(_classnames);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\n/**\n * ClearButton\n *\n * http://getbootstrap.com/css/#helper-classes-close\n */\nvar ClearButton = function ClearButton(_ref) {\n  var bsSize = _ref.bsSize,\n      className = _ref.className,\n      label = _ref.label,\n      _onClick = _ref.onClick,\n      props = _objectWithoutProperties(_ref, ['bsSize', 'className', 'label', 'onClick']);\n\n  return _react2.default.createElement(\n    'button',\n    _extends({}, props, {\n      'aria-label': label,\n      className: (0, _classnames2.default)('close', 'rbt-close', {\n        'rbt-close-lg': bsSize === 'large' || bsSize === 'lg'\n      }, className),\n      onClick: function onClick(e) {\n        e.stopPropagation();\n        _onClick(e);\n      },\n      type: 'button' }),\n    _react2.default.createElement(\n      'span',\n      { 'aria-hidden': 'true' },\n      '\\xD7'\n    ),\n    _react2.default.createElement(\n      'span',\n      { className: 'sr-only' },\n      label\n    )\n  );\n};\n\nClearButton.propTypes = {\n  bsSize: _propTypes2.default.oneOf(['large', 'lg', 'small', 'sm']),\n  label: _propTypes2.default.string,\n  onClick: _propTypes2.default.func.isRequired\n};\n\nClearButton.defaultProps = {\n  label: 'Clear'\n};\n\nexports.default = ClearButton;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/ClearButton.react.js?");

/***/ }),

/***/ "./src/Highlighter.react.js":
/*!**********************************!*\
  !*** ./src/Highlighter.react.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _utils = __webpack_require__(/*! ./utils */ \"./src/utils/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * Stripped-down version of https://github.com/helior/react-highlighter\n *\n * Results are already filtered by the time the component is used internally so\n * we can safely ignore case and diacritical marks for the purposes of matching.\n */\nvar Highlighter = function (_React$Component) {\n  _inherits(Highlighter, _React$Component);\n\n  function Highlighter() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, Highlighter);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Highlighter.__proto__ || Object.getPrototypeOf(Highlighter)).call.apply(_ref, [this].concat(args))), _this), _this._count = 0, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(Highlighter, [{\n    key: 'render',\n    value: function render() {\n      var children = this.props.search ? this._renderHighlightedChildren() : this.props.children;\n\n      return _react2.default.createElement(\n        'span',\n        null,\n        children\n      );\n    }\n  }, {\n    key: '_renderHighlightedChildren',\n    value: function _renderHighlightedChildren() {\n      var children = [];\n      var remaining = this.props.children;\n\n      while (remaining) {\n        var bounds = (0, _utils.getMatchBounds)(remaining, this.props.search);\n\n        if (!bounds) {\n          this._count++;\n          children.push(_react2.default.createElement(\n            'span',\n            { key: this._count },\n            remaining\n          ));\n          return children;\n        }\n\n        // Capture the string that leads up to a match...\n        var nonMatch = remaining.slice(0, bounds.start);\n        if (nonMatch) {\n          this._count++;\n          children.push(_react2.default.createElement(\n            'span',\n            { key: this._count },\n            nonMatch\n          ));\n        }\n\n        // Now, capture the matching string...\n        var match = remaining.slice(bounds.start, bounds.end);\n        if (match) {\n          this._count++;\n          children.push(_react2.default.createElement(\n            'mark',\n            { className: 'rbt-highlight-text', key: this._count },\n            match\n          ));\n        }\n\n        // And if there's anything left over, continue the loop.\n        remaining = remaining.slice(bounds.end);\n      }\n\n      return children;\n    }\n  }]);\n\n  return Highlighter;\n}(_react2.default.Component);\n\nHighlighter.propTypes = {\n  children: _propTypes2.default.string.isRequired,\n  search: _propTypes2.default.string.isRequired\n};\n\nexports.default = Highlighter;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/Highlighter.react.js?");

/***/ }),

/***/ "./src/Loader.react.js":
/*!*****************************!*\
  !*** ./src/Loader.react.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _classnames = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n\nvar _classnames2 = _interopRequireDefault(_classnames);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Loader = function Loader(_ref) {\n  var bsSize = _ref.bsSize;\n  return _react2.default.createElement('div', {\n    className: (0, _classnames2.default)('rbt-loader', {\n      'rbt-loader-lg': bsSize === 'large' || bsSize === 'lg',\n      'rbt-loader-sm': bsSize === 'small' || bsSize === 'sm'\n    })\n  });\n};\n\nLoader.propTypes = {\n  bsSize: _propTypes2.default.oneOf(['large', 'lg', 'small', 'sm'])\n};\n\nexports.default = Loader;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/Loader.react.js?");

/***/ }),

/***/ "./src/Menu.react.js":
/*!***************************!*\
  !*** ./src/Menu.react.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _classnames = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n\nvar _classnames2 = _interopRequireDefault(_classnames);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _isRequiredForA11y = __webpack_require__(/*! prop-types-extra/lib/isRequiredForA11y */ \"./node_modules/prop-types-extra/lib/isRequiredForA11y.js\");\n\nvar _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _MenuItem = __webpack_require__(/*! ./MenuItem.react */ \"./src/MenuItem.react.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * Menu component that handles empty state when passed a set of results.\n */\nvar Menu = function (_React$Component) {\n  _inherits(Menu, _React$Component);\n\n  function Menu() {\n    _classCallCheck(this, Menu);\n\n    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));\n  }\n\n  _createClass(Menu, [{\n    key: 'render',\n    value: function render() {\n      var _props = this.props,\n          children = _props.children,\n          className = _props.className,\n          emptyLabel = _props.emptyLabel,\n          id = _props.id,\n          innerRef = _props.innerRef,\n          maxHeight = _props.maxHeight,\n          style = _props.style;\n\n\n      var contents = _react.Children.count(children) === 0 ? _react2.default.createElement(\n        _MenuItem.BaseMenuItem,\n        { disabled: true },\n        emptyLabel\n      ) : children;\n\n      return _react2.default.createElement(\n        'ul',\n        {\n          className: (0, _classnames2.default)('rbt-menu', 'dropdown-menu', 'show', className),\n          id: id,\n          ref: innerRef,\n          role: 'listbox',\n          style: _extends({}, style, {\n            display: 'block',\n            maxHeight: maxHeight,\n            overflow: 'auto'\n          }) },\n        contents\n      );\n    }\n  }]);\n\n  return Menu;\n}(_react2.default.Component);\n\nMenu.propTypes = {\n  /**\n   * Needed for accessibility.\n   */\n  id: (0, _isRequiredForA11y2.default)(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])),\n  /**\n   * Maximum height of the dropdown menu.\n   */\n  maxHeight: _propTypes2.default.string\n};\n\nMenu.defaultProps = {\n  maxHeight: '300px'\n};\n\nMenu.Divider = function (props) {\n  return _react2.default.createElement('li', { className: 'divider dropdown-divider', role: 'separator' });\n};\n\nMenu.Header = function (props) {\n  return _react2.default.createElement('li', _extends({}, props, { className: 'dropdown-header' }));\n};\n\nexports.default = Menu;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/Menu.react.js?");

/***/ }),

/***/ "./src/MenuItem.react.js":
/*!*******************************!*\
  !*** ./src/MenuItem.react.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.BaseMenuItem = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _classnames = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n\nvar _classnames2 = _interopRequireDefault(_classnames);\n\nvar _noop = __webpack_require__(/*! lodash/noop */ \"./node_modules/lodash/noop.js\");\n\nvar _noop2 = _interopRequireDefault(_noop);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _menuItemContainer = __webpack_require__(/*! ./containers/menuItemContainer */ \"./src/containers/menuItemContainer.js\");\n\nvar _menuItemContainer2 = _interopRequireDefault(_menuItemContainer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar BaseMenuItem = function (_React$Component) {\n  _inherits(BaseMenuItem, _React$Component);\n\n  function BaseMenuItem() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, BaseMenuItem);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BaseMenuItem.__proto__ || Object.getPrototypeOf(BaseMenuItem)).call.apply(_ref, [this].concat(args))), _this), _this._handleClick = function (e) {\n      var _this$props = _this.props,\n          disabled = _this$props.disabled,\n          onClick = _this$props.onClick;\n\n\n      e.preventDefault();\n      !disabled && onClick(e);\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(BaseMenuItem, [{\n    key: 'render',\n    value: function render() {\n      var _props = this.props,\n          active = _props.active,\n          children = _props.children,\n          className = _props.className,\n          disabled = _props.disabled,\n          onClick = _props.onClick,\n          onMouseDown = _props.onMouseDown,\n          props = _objectWithoutProperties(_props, ['active', 'children', 'className', 'disabled', 'onClick', 'onMouseDown']);\n\n      var conditionalClassNames = {\n        'active': active,\n        'disabled': disabled\n      };\n\n      return (\n        /* eslint-disable jsx-a11y/anchor-is-valid */\n        _react2.default.createElement(\n          'li',\n          _extends({}, props, {\n            className: (0, _classnames2.default)(conditionalClassNames, className) }),\n          _react2.default.createElement(\n            'a',\n            {\n              className: (0, _classnames2.default)('dropdown-item', conditionalClassNames),\n              href: '#',\n              onClick: this._handleClick,\n              onMouseDown: onMouseDown },\n            children\n          )\n        )\n        /* eslint-enable jsx-a11y/anchor-is-valid */\n\n      );\n    }\n  }]);\n\n  return BaseMenuItem;\n}(_react2.default.Component);\n\nBaseMenuItem.defaultProps = {\n  onClick: _noop2.default\n};\n\nexports.BaseMenuItem = BaseMenuItem;\nexports.default = (0, _menuItemContainer2.default)(BaseMenuItem);\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/MenuItem.react.js?");

/***/ }),

/***/ "./src/Overlay.react.js":
/*!******************************!*\
  !*** ./src/Overlay.react.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _classnames = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n\nvar _classnames2 = _interopRequireDefault(_classnames);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _componentOrElement = __webpack_require__(/*! prop-types-extra/lib/componentOrElement */ \"./node_modules/prop-types-extra/lib/componentOrElement.js\");\n\nvar _componentOrElement2 = _interopRequireDefault(_componentOrElement);\n\nvar _Portal = __webpack_require__(/*! react-overlays/lib/Portal */ \"./node_modules/react-overlays/lib/Portal.js\");\n\nvar _Portal2 = _interopRequireDefault(_Portal);\n\nvar _Popper = __webpack_require__(/*! react-popper/lib/cjs/Popper */ \"./node_modules/react-popper/lib/cjs/Popper.js\");\n\nvar _Popper2 = _interopRequireDefault(_Popper);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar BODY_CLASS = 'rbt-body-container';\n\n// When appending the overlay to `document.body`, clicking on it will register\n// as an \"outside\" click and immediately close the overlay. This classname tells\n// `react-onclickoutside` to ignore the click.\nvar IGNORE_CLICK_OUTSIDE = 'ignore-react-onclickoutside';\n\nfunction getModifiers(_ref) {\n  var align = _ref.align,\n      flip = _ref.flip;\n\n  return {\n    computeStyles: {\n      enabled: true,\n      fn: function fn(data) {\n        // Use the following condition instead of `align === 'justify'` since\n        // it allows the component to fall back to justifying the menu width\n        // even when `align` is undefined.\n        if (align !== 'right' && align !== 'left') {\n          // Set the popper width to match the target width.\n          data.styles.width = data.offsets.reference.width;\n        }\n        return data;\n      }\n    },\n    flip: {\n      enabled: flip\n    },\n    preventOverflow: {\n      escapeWithReference: true\n    }\n  };\n}\n\nfunction isBody(container) {\n  return container === document.body;\n}\n\n/**\n * Custom `Overlay` component, since the version in `react-overlays` doesn't\n * work for our needs. Specifically, the `Position` component doesn't provide\n * the customized placement we need.\n */\n\nvar Overlay = function (_React$Component) {\n  _inherits(Overlay, _React$Component);\n\n  function Overlay() {\n    var _ref2;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, Overlay);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call.apply(_ref2, [this].concat(args))), _this), _this._update = function () {\n      var _container$classList;\n\n      var _this$props = _this.props,\n          className = _this$props.className,\n          container = _this$props.container,\n          show = _this$props.show;\n\n      // Positioning is only used when body is the container.\n\n      if (!(show && isBody(container))) {\n        return;\n      }\n\n      // Set a classname on the body for scoping purposes.\n      container.classList.add(BODY_CLASS);\n      !!className && (_container$classList = container.classList).add.apply(_container$classList, _toConsumableArray(className.split(' ')));\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(Overlay, [{\n    key: 'componentDidMount',\n    value: function componentDidMount() {\n      this._update();\n    }\n  }, {\n    key: 'componentWillReceiveProps',\n    value: function componentWillReceiveProps(nextProps) {\n      var onMenuHide = nextProps.onMenuHide,\n          onMenuShow = nextProps.onMenuShow,\n          show = nextProps.show;\n\n\n      if (this.props.show && !show) {\n        onMenuHide();\n      }\n\n      if (!this.props.show && show) {\n        onMenuShow();\n      }\n\n      // Remove scoping classes if menu isn't being appended to document body.\n      var _props = this.props,\n          className = _props.className,\n          container = _props.container;\n\n      if (isBody(container) && !isBody(nextProps.container)) {\n        var _container$classList2;\n\n        container.classList.remove(BODY_CLASS);\n        !!className && (_container$classList2 = container.classList).remove.apply(_container$classList2, _toConsumableArray(className.split(' ')));\n      }\n\n      this._update();\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _props2 = this.props,\n          align = _props2.align,\n          children = _props2.children,\n          container = _props2.container,\n          dropup = _props2.dropup,\n          referenceElement = _props2.referenceElement,\n          show = _props2.show;\n\n\n      if (!(show && _react.Children.count(children) && referenceElement)) {\n        return null;\n      }\n\n      var child = _react.Children.only(children);\n\n      var xPlacement = align === 'right' ? 'end' : 'start';\n      var yPlacement = dropup ? 'top' : 'bottom';\n\n      return _react2.default.createElement(\n        _Portal2.default,\n        { container: container },\n        _react2.default.createElement(\n          _Popper2.default,\n          {\n            modifiers: getModifiers(this.props),\n            placement: yPlacement + '-' + xPlacement,\n            referenceElement: referenceElement },\n          function (_ref3) {\n            var ref = _ref3.ref,\n                props = _objectWithoutProperties(_ref3, ['ref']);\n\n            return (0, _react.cloneElement)(child, _extends({}, child.props, props, {\n              className: (0, _classnames2.default)(child.props.className, _defineProperty({}, IGNORE_CLICK_OUTSIDE, isBody(container))),\n              innerRef: ref\n            }));\n          }\n        )\n      );\n    }\n  }]);\n\n  return Overlay;\n}(_react2.default.Component);\n\nOverlay.propTypes = {\n  children: _propTypes2.default.element,\n  container: _componentOrElement2.default.isRequired,\n  onMenuHide: _propTypes2.default.func.isRequired,\n  onMenuShow: _propTypes2.default.func.isRequired,\n  referenceElement: _componentOrElement2.default,\n  show: _propTypes2.default.bool\n};\n\nOverlay.defaultProps = {\n  show: false\n};\n\nexports.default = Overlay;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/Overlay.react.js?");

/***/ }),

/***/ "./src/Token.react.js":
/*!****************************!*\
  !*** ./src/Token.react.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _classnames = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n\nvar _classnames2 = _interopRequireDefault(_classnames);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _ClearButton = __webpack_require__(/*! ./ClearButton.react */ \"./src/ClearButton.react.js\");\n\nvar _ClearButton2 = _interopRequireDefault(_ClearButton);\n\nvar _tokenContainer = __webpack_require__(/*! ./containers/tokenContainer */ \"./src/containers/tokenContainer.js\");\n\nvar _tokenContainer2 = _interopRequireDefault(_tokenContainer);\n\nvar _keyCode = __webpack_require__(/*! ./constants/keyCode */ \"./src/constants/keyCode.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * Token\n *\n * Individual token component, generally displayed within the TokenizerInput\n * component, but can also be rendered on its own.\n */\nvar Token = function (_React$Component) {\n  _inherits(Token, _React$Component);\n\n  function Token() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, Token);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Token.__proto__ || Object.getPrototypeOf(Token)).call.apply(_ref, [this].concat(args))), _this), _this._renderRemoveableToken = function () {\n      var _this$props = _this.props,\n          active = _this$props.active,\n          children = _this$props.children,\n          className = _this$props.className,\n          onRemove = _this$props.onRemove,\n          props = _objectWithoutProperties(_this$props, ['active', 'children', 'className', 'onRemove']);\n\n      return _react2.default.createElement(\n        'div',\n        _extends({}, props, {\n          className: (0, _classnames2.default)('rbt-token', 'rbt-token-removeable', {\n            'rbt-token-active': active\n          }, className) }),\n        children,\n        _react2.default.createElement(_ClearButton2.default, {\n          className: 'rbt-token-remove-button',\n          label: 'Remove',\n          onClick: onRemove,\n          onKeyDown: _this._handleRemoveButtonKeydown,\n          tabIndex: -1\n        })\n      );\n    }, _this._renderToken = function () {\n      var _this$props2 = _this.props,\n          children = _this$props2.children,\n          className = _this$props2.className,\n          disabled = _this$props2.disabled,\n          href = _this$props2.href;\n\n      var classnames = (0, _classnames2.default)('rbt-token', {\n        'rbt-token-disabled': disabled\n      }, className);\n\n      if (href) {\n        return _react2.default.createElement(\n          'a',\n          { className: classnames, href: href },\n          children\n        );\n      }\n\n      return _react2.default.createElement(\n        'div',\n        { className: classnames },\n        children\n      );\n    }, _this._handleRemoveButtonKeydown = function (e) {\n      switch (e.keyCode) {\n        case _keyCode.RETURN:\n          _this.props.onRemove();\n          break;\n      }\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(Token, [{\n    key: 'render',\n    value: function render() {\n      return this.props.onRemove && !this.props.disabled ? this._renderRemoveableToken() : this._renderToken();\n    }\n  }]);\n\n  return Token;\n}(_react2.default.Component);\n\nToken.propTypes = {\n  active: _propTypes2.default.bool,\n  /**\n   * Handler for removing/deleting the token. If not defined, the token will\n   * be rendered in a read-only state.\n   */\n  onRemove: _propTypes2.default.func,\n  tabIndex: _propTypes2.default.number\n};\n\nToken.defaultProps = {\n  active: false,\n  tabIndex: 0\n};\n\nexports.default = (0, _tokenContainer2.default)(Token);\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/Token.react.js?");

/***/ }),

/***/ "./src/Typeahead.react.js":
/*!********************************!*\
  !*** ./src/Typeahead.react.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _classnames = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n\nvar _classnames2 = _interopRequireDefault(_classnames);\n\nvar _pick = __webpack_require__(/*! lodash/pick */ \"./node_modules/lodash/pick.js\");\n\nvar _pick2 = _interopRequireDefault(_pick);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _ClearButton = __webpack_require__(/*! ./ClearButton.react */ \"./src/ClearButton.react.js\");\n\nvar _ClearButton2 = _interopRequireDefault(_ClearButton);\n\nvar _Loader = __webpack_require__(/*! ./Loader.react */ \"./src/Loader.react.js\");\n\nvar _Loader2 = _interopRequireDefault(_Loader);\n\nvar _Overlay = __webpack_require__(/*! ./Overlay.react */ \"./src/Overlay.react.js\");\n\nvar _Overlay2 = _interopRequireDefault(_Overlay);\n\nvar _TypeaheadInputMulti = __webpack_require__(/*! ./TypeaheadInputMulti.react */ \"./src/TypeaheadInputMulti.react.js\");\n\nvar _TypeaheadInputMulti2 = _interopRequireDefault(_TypeaheadInputMulti);\n\nvar _TypeaheadInputSingle = __webpack_require__(/*! ./TypeaheadInputSingle.react */ \"./src/TypeaheadInputSingle.react.js\");\n\nvar _TypeaheadInputSingle2 = _interopRequireDefault(_TypeaheadInputSingle);\n\nvar _TypeaheadMenu = __webpack_require__(/*! ./TypeaheadMenu.react */ \"./src/TypeaheadMenu.react.js\");\n\nvar _TypeaheadMenu2 = _interopRequireDefault(_TypeaheadMenu);\n\nvar _typeaheadContainer = __webpack_require__(/*! ./containers/typeaheadContainer */ \"./src/containers/typeaheadContainer.js\");\n\nvar _typeaheadContainer2 = _interopRequireDefault(_typeaheadContainer);\n\nvar _utils = __webpack_require__(/*! ./utils/ */ \"./src/utils/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar Typeahead = function (_React$Component) {\n  _inherits(Typeahead, _React$Component);\n\n  function Typeahead() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, Typeahead);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Typeahead.__proto__ || Object.getPrototypeOf(Typeahead)).call.apply(_ref, [this].concat(args))), _this), _this._renderInput = function (inputProps) {\n      var Input = inputProps.multiple ? _TypeaheadInputMulti2.default : _TypeaheadInputSingle2.default;\n\n      return _react2.default.createElement(Input, inputProps);\n    }, _this._renderAux = function () {\n      var _this$props = _this.props,\n          bsSize = _this$props.bsSize,\n          clearButton = _this$props.clearButton,\n          disabled = _this$props.disabled,\n          isLoading = _this$props.isLoading,\n          onClear = _this$props.onClear,\n          selected = _this$props.selected;\n\n\n      var content = void 0;\n\n      if (isLoading) {\n        content = _react2.default.createElement(_Loader2.default, { bsSize: bsSize });\n      } else if (clearButton && !disabled && selected.length) {\n        content = _react2.default.createElement(_ClearButton2.default, {\n          bsSize: bsSize,\n          onClick: onClear,\n          onFocus: function onFocus(e) {\n            // Prevent the main input from auto-focusing again.\n            e.stopPropagation();\n          },\n          onMouseDown: _utils.preventInputBlur\n        });\n      }\n\n      return content ? _react2.default.createElement(\n        'div',\n        {\n          className: (0, _classnames2.default)('rbt-aux', {\n            'rbt-aux-lg': bsSize === 'large' || bsSize === 'lg'\n          }) },\n        content\n      ) : null;\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(Typeahead, [{\n    key: 'componentWillReceiveProps',\n    value: function componentWillReceiveProps(nextProps) {\n      var allowNew = nextProps.allowNew,\n          onInitialItemChange = nextProps.onInitialItemChange,\n          results = nextProps.results;\n\n      // Clear the initial item when there are no results.\n\n      if (!(allowNew || results.length)) {\n        onInitialItemChange(null);\n      }\n    }\n  }, {\n    key: 'render',\n    value: function render() {\n      var _this2 = this;\n\n      var _props = this.props,\n          bodyContainer = _props.bodyContainer,\n          children = _props.children,\n          className = _props.className,\n          isMenuShown = _props.isMenuShown,\n          menuId = _props.menuId,\n          renderMenu = _props.renderMenu,\n          results = _props.results;\n\n\n      var inputProps = (0, _pick2.default)(this.props, ['activeIndex', 'activeItem', 'bsSize', 'disabled', 'initialItem', 'inputProps', 'inputRef', 'isInvalid', 'isMenuShown', 'isValid', 'labelKey', 'menuId', 'multiple', 'onAdd', 'onBlur', 'onChange', 'onFocus', 'onKeyDown', 'onRemove', 'placeholder', 'renderToken', 'selected', 'selectHintOnEnter', 'text']);\n\n      var overlayProps = (0, _pick2.default)(this.props, ['align', 'className', 'dropup', 'flip', 'onMenuHide', 'onMenuShow']);\n\n      var menuProps = (0, _pick2.default)(this.props, ['emptyLabel', 'labelKey', 'maxHeight', 'newSelectionPrefix', 'renderMenuItemChildren', 'text']);\n\n      var auxContent = this._renderAux();\n\n      return _react2.default.createElement(\n        'div',\n        {\n          className: (0, _classnames2.default)('rbt', 'clearfix', 'open', {\n            'has-aux': !!auxContent\n          }, className),\n          style: { position: 'relative' },\n          tabIndex: -1 },\n        this._renderInput(_extends({}, inputProps, {\n          // Use `findDOMNode` here since it's easier and less fragile than\n          // forwarding refs down to the input's container.\n          // TODO: Consider using `forwardRef` when React 16.3 usage is higher.\n          ref: function ref(node) {\n            return _this2._inputContainer = (0, _reactDom.findDOMNode)(node);\n          }\n        })),\n        typeof children === 'function' ? children(this.props) : children,\n        auxContent,\n        _react2.default.createElement(\n          _Overlay2.default,\n          _extends({}, overlayProps, {\n            container: bodyContainer ? document.body : this,\n            referenceElement: this._inputContainer,\n            show: isMenuShown }),\n          renderMenu(results, _extends({}, menuProps, { id: menuId }))\n        ),\n        _react2.default.createElement(\n          'div',\n          {\n            'aria-atomic': true,\n            'aria-live': 'polite',\n            className: 'sr-only rbt-sr-status',\n            role: 'status' },\n          (0, _utils.getAccessibilityStatus)(this.props)\n        )\n      );\n    }\n  }]);\n\n  return Typeahead;\n}(_react2.default.Component);\n\nTypeahead.propTypes = {\n  renderMenu: _propTypes2.default.func\n};\n\nTypeahead.defaultProps = {\n  renderMenu: function renderMenu(results, menuProps) {\n    return _react2.default.createElement(_TypeaheadMenu2.default, _extends({}, menuProps, { options: results }));\n  }\n};\n\nexports.default = (0, _typeaheadContainer2.default)(Typeahead);\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/Typeahead.react.js?");

/***/ }),

/***/ "./src/TypeaheadInputMulti.react.js":
/*!******************************************!*\
  !*** ./src/TypeaheadInputMulti.react.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _classnames = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n\nvar _classnames2 = _interopRequireDefault(_classnames);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _AutosizeInput = __webpack_require__(/*! ./AutosizeInput.react */ \"./src/AutosizeInput.react.js\");\n\nvar _AutosizeInput2 = _interopRequireDefault(_AutosizeInput);\n\nvar _Token = __webpack_require__(/*! ./Token.react */ \"./src/Token.react.js\");\n\nvar _Token2 = _interopRequireDefault(_Token);\n\nvar _utils = __webpack_require__(/*! ./utils/ */ \"./src/utils/index.js\");\n\nvar _hintContainer = __webpack_require__(/*! ./containers/hintContainer */ \"./src/containers/hintContainer.js\");\n\nvar _hintContainer2 = _interopRequireDefault(_hintContainer);\n\nvar _inputContainer = __webpack_require__(/*! ./containers/inputContainer */ \"./src/containers/inputContainer.js\");\n\nvar _inputContainer2 = _interopRequireDefault(_inputContainer);\n\nvar _keyCode = __webpack_require__(/*! ./constants/keyCode */ \"./src/constants/keyCode.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar HintedAutosizeInput = (0, _hintContainer2.default)(_AutosizeInput2.default);\n\nvar TypeaheadInputMulti = function (_React$Component) {\n  _inherits(TypeaheadInputMulti, _React$Component);\n\n  function TypeaheadInputMulti() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, TypeaheadInputMulti);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TypeaheadInputMulti.__proto__ || Object.getPrototypeOf(TypeaheadInputMulti)).call.apply(_ref, [this].concat(args))), _this), _this._renderToken = function (option, idx) {\n      var _this$props = _this.props,\n          _onRemove = _this$props.onRemove,\n          renderToken = _this$props.renderToken;\n\n      var props = _extends({}, _this.props, {\n        onRemove: function onRemove() {\n          return _onRemove(option);\n        }\n      });\n\n      return renderToken(option, props, idx);\n    }, _this._handleContainerClickOrFocus = function (e) {\n      // Don't focus the input if it's disabled.\n      if (_this.props.disabled) {\n        e.target.blur();\n        return;\n      }\n\n      // Move cursor to the end if the user clicks outside the actual input.\n      var inputNode = _this._input;\n      if (e.target !== inputNode) {\n        inputNode.selectionStart = inputNode.value.length;\n      }\n\n      inputNode.focus();\n    }, _this._handleKeyDown = function (e) {\n      var _this$props2 = _this.props,\n          onKeyDown = _this$props2.onKeyDown,\n          selected = _this$props2.selected,\n          value = _this$props2.value;\n\n\n      switch (e.keyCode) {\n        case _keyCode.BACKSPACE:\n          if (e.target === _this._input && selected.length && !value) {\n            // If the input is selected and there is no text, focus the last\n            // token when the user hits backspace.\n            var children = _this._wrapper.children;\n            var lastToken = children[children.length - 2];\n            lastToken && lastToken.focus();\n          }\n          break;\n      }\n\n      onKeyDown(e);\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(TypeaheadInputMulti, [{\n    key: 'render',\n    value: function render() {\n      var _this2 = this;\n\n      var _props = this.props,\n          className = _props.className,\n          inputClassName = _props.inputClassName,\n          labelKey = _props.labelKey,\n          onRemove = _props.onRemove,\n          renderToken = _props.renderToken,\n          selected = _props.selected,\n          props = _objectWithoutProperties(_props, ['className', 'inputClassName', 'labelKey', 'onRemove', 'renderToken', 'selected']);\n\n      return (\n        /* eslint-disable jsx-a11y/no-static-element-interactions */\n        /* eslint-disable jsx-a11y/click-events-have-key-events */\n        _react2.default.createElement(\n          'div',\n          {\n            className: (0, _classnames2.default)('form-control', 'rbt-input-multi', className),\n            disabled: props.disabled,\n            onClick: this._handleContainerClickOrFocus,\n            onFocus: this._handleContainerClickOrFocus,\n            tabIndex: -1 },\n          _react2.default.createElement(\n            'div',\n            { className: 'rbt-input-wrapper', ref: function ref(el) {\n                return _this2._wrapper = el;\n              } },\n            selected.map(this._renderToken),\n            _react2.default.createElement(HintedAutosizeInput, _extends({}, props, {\n              inputClassName: (0, _classnames2.default)('rbt-input-main', inputClassName),\n              inputRef: function inputRef(input) {\n                _this2._input = input;\n                _this2.props.inputRef(input);\n              },\n              inputStyle: {\n                backgroundColor: 'transparent',\n                border: 0,\n                boxShadow: 'none',\n                cursor: 'inherit',\n                outline: 'none',\n                padding: 0\n              },\n              onKeyDown: this._handleKeyDown,\n              style: {\n                position: 'relative',\n                zIndex: 1\n              }\n            }))\n          )\n        )\n        /* eslint-enable jsx-a11y/no-static-element-interactions */\n        /* eslint-enable jsx-a11y/click-events-have-key-events */\n\n      );\n    }\n\n    /**\n     * Forward click or focus events on the container element to the input.\n     */\n\n  }]);\n\n  return TypeaheadInputMulti;\n}(_react2.default.Component);\n\nTypeaheadInputMulti.propTypes = {\n  /**\n   * Provides a hook for customized rendering of tokens when multiple\n   * selections are enabled.\n   */\n  renderToken: _propTypes2.default.func\n};\n\nTypeaheadInputMulti.defaultProps = {\n  renderToken: function renderToken(option, props, idx) {\n    return _react2.default.createElement(\n      _Token2.default,\n      {\n        disabled: props.disabled,\n        key: idx,\n        onRemove: props.onRemove,\n        tabIndex: props.tabIndex },\n      (0, _utils.getOptionLabel)(option, props.labelKey)\n    );\n  }\n};\n\nexports.default = (0, _inputContainer2.default)(TypeaheadInputMulti);\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/TypeaheadInputMulti.react.js?");

/***/ }),

/***/ "./src/TypeaheadInputSingle.react.js":
/*!*******************************************!*\
  !*** ./src/TypeaheadInputSingle.react.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _classnames = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n\nvar _classnames2 = _interopRequireDefault(_classnames);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _hintContainer = __webpack_require__(/*! ./containers/hintContainer */ \"./src/containers/hintContainer.js\");\n\nvar _hintContainer2 = _interopRequireDefault(_hintContainer);\n\nvar _inputContainer = __webpack_require__(/*! ./containers/inputContainer */ \"./src/containers/inputContainer.js\");\n\nvar _inputContainer2 = _interopRequireDefault(_inputContainer);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar TypeaheadInputSingle = function (_React$Component) {\n  _inherits(TypeaheadInputSingle, _React$Component);\n\n  function TypeaheadInputSingle() {\n    _classCallCheck(this, TypeaheadInputSingle);\n\n    return _possibleConstructorReturn(this, (TypeaheadInputSingle.__proto__ || Object.getPrototypeOf(TypeaheadInputSingle)).apply(this, arguments));\n  }\n\n  _createClass(TypeaheadInputSingle, [{\n    key: 'render',\n    value: function render() {\n      var _props = this.props,\n          className = _props.className,\n          inputRef = _props.inputRef,\n          props = _objectWithoutProperties(_props, ['className', 'inputRef']);\n\n      return _react2.default.createElement('input', _extends({}, props, {\n        className: (0, _classnames2.default)('rbt-input-main', 'form-control', className),\n        ref: inputRef,\n        type: 'text'\n      }));\n    }\n  }]);\n\n  return TypeaheadInputSingle;\n}(_react2.default.Component);\n\nexports.default = (0, _inputContainer2.default)((0, _hintContainer2.default)(TypeaheadInputSingle));\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/TypeaheadInputSingle.react.js?");

/***/ }),

/***/ "./src/TypeaheadMenu.react.js":
/*!************************************!*\
  !*** ./src/TypeaheadMenu.react.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _Highlighter = __webpack_require__(/*! ./Highlighter.react */ \"./src/Highlighter.react.js\");\n\nvar _Highlighter2 = _interopRequireDefault(_Highlighter);\n\nvar _Menu = __webpack_require__(/*! ./Menu.react */ \"./src/Menu.react.js\");\n\nvar _Menu2 = _interopRequireDefault(_Menu);\n\nvar _MenuItem = __webpack_require__(/*! ./MenuItem.react */ \"./src/MenuItem.react.js\");\n\nvar _MenuItem2 = _interopRequireDefault(_MenuItem);\n\nvar _utils = __webpack_require__(/*! ./utils/ */ \"./src/utils/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar TypeaheadMenu = function (_React$Component) {\n  _inherits(TypeaheadMenu, _React$Component);\n\n  function TypeaheadMenu() {\n    var _ref;\n\n    var _temp, _this, _ret;\n\n    _classCallCheck(this, TypeaheadMenu);\n\n    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n      args[_key] = arguments[_key];\n    }\n\n    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TypeaheadMenu.__proto__ || Object.getPrototypeOf(TypeaheadMenu)).call.apply(_ref, [this].concat(args))), _this), _this._renderMenuItem = function (option, idx) {\n      var _this$props = _this.props,\n          labelKey = _this$props.labelKey,\n          newSelectionPrefix = _this$props.newSelectionPrefix,\n          renderMenuItemChildren = _this$props.renderMenuItemChildren,\n          text = _this$props.text;\n\n\n      var label = (0, _utils.getOptionLabel)(option, labelKey);\n\n      var menuItemProps = {\n        disabled: option.disabled,\n        key: idx,\n        label: label,\n        option: option,\n        position: idx\n      };\n\n      if (option.customOption) {\n        return _react2.default.createElement(\n          _MenuItem2.default,\n          _extends({}, menuItemProps, {\n            className: 'rbt-menu-custom-option',\n            label: newSelectionPrefix + label }),\n          newSelectionPrefix,\n          _react2.default.createElement(\n            _Highlighter2.default,\n            { search: text },\n            label\n          )\n        );\n      }\n\n      if (option.paginationOption) {\n        return [_react2.default.createElement(_Menu2.default.Divider, { key: 'pagination-item-divider' }), _react2.default.createElement(\n          _MenuItem2.default,\n          _extends({}, menuItemProps, {\n            className: 'rbt-menu-pagination-option',\n            key: 'pagination-item' }),\n          label\n        )];\n      }\n\n      return _react2.default.createElement(\n        _MenuItem2.default,\n        menuItemProps,\n        renderMenuItemChildren(option, _this.props, idx)\n      );\n    }, _temp), _possibleConstructorReturn(_this, _ret);\n  }\n\n  _createClass(TypeaheadMenu, [{\n    key: 'render',\n    value: function render() {\n      var _props = this.props,\n          labelKey = _props.labelKey,\n          newSelectionPrefix = _props.newSelectionPrefix,\n          options = _props.options,\n          renderMenuItemChildren = _props.renderMenuItemChildren,\n          text = _props.text,\n          menuProps = _objectWithoutProperties(_props, ['labelKey', 'newSelectionPrefix', 'options', 'renderMenuItemChildren', 'text']);\n\n      return _react2.default.createElement(\n        _Menu2.default,\n        menuProps,\n        options.map(this._renderMenuItem)\n      );\n    }\n  }]);\n\n  return TypeaheadMenu;\n}(_react2.default.Component);\n\nTypeaheadMenu.propTypes = {\n  /**\n   * Provides the ability to specify a prefix before the user-entered text to\n   * indicate that the selection will be new. No-op unless `allowNew={true}`.\n   */\n  newSelectionPrefix: _propTypes2.default.string,\n  /**\n   * Provides a hook for customized rendering of menu item contents.\n   */\n  renderMenuItemChildren: _propTypes2.default.func\n};\n\nTypeaheadMenu.defaultProps = {\n  newSelectionPrefix: 'New selection: ',\n  renderMenuItemChildren: function renderMenuItemChildren(option, props, idx) {\n    return _react2.default.createElement(\n      _Highlighter2.default,\n      { search: props.text },\n      (0, _utils.getOptionLabel)(option, props.labelKey)\n    );\n  }\n};\n\nexports.default = TypeaheadMenu;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/TypeaheadMenu.react.js?");

/***/ }),

/***/ "./src/constants/defaultLabelKey.js":
/*!******************************************!*\
  !*** ./src/constants/defaultLabelKey.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar DEFAULT_LABELKEY = exports.DEFAULT_LABELKEY = 'label';\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/constants/defaultLabelKey.js?");

/***/ }),

/***/ "./src/constants/keyCode.js":
/*!**********************************!*\
  !*** ./src/constants/keyCode.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/* eslint-disable sort-keys */\n\n/**\n * KeyCode\n *\n * Map of common (non-printable) keycodes for the `keydown` and `keyup` events.\n * Note that `keypress` handles things differently and may not return the same\n * values.\n */\nmodule.exports = {\n  BACKSPACE: 8,\n  TAB: 9,\n  RETURN: 13,\n  ESC: 27,\n  SPACE: 32,\n  LEFT: 37,\n  UP: 38,\n  RIGHT: 39,\n  DOWN: 40\n};\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/constants/keyCode.js?");

/***/ }),

/***/ "./src/containers/asyncContainer.js":
/*!******************************************!*\
  !*** ./src/containers/asyncContainer.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _debounce = __webpack_require__(/*! lodash/debounce */ \"./node_modules/lodash/debounce.js\");\n\nvar _debounce2 = _interopRequireDefault(_debounce);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _utils = __webpack_require__(/*! ../utils/ */ \"./src/utils/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar DEFAULT_DELAY_MS = 200;\n\n/**\n * HoC that encapsulates common behavior and functionality for doing\n * asynchronous searches, including:\n *\n *  - Debouncing user input\n *  - Query caching (optional)\n *  - Search prompt and empty results behaviors\n */\nvar asyncContainer = function asyncContainer(Typeahead) {\n  var WrappedTypeahead = function (_React$Component) {\n    _inherits(WrappedTypeahead, _React$Component);\n\n    function WrappedTypeahead() {\n      var _ref;\n\n      var _temp, _this, _ret;\n\n      _classCallCheck(this, WrappedTypeahead);\n\n      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WrappedTypeahead.__proto__ || Object.getPrototypeOf(WrappedTypeahead)).call.apply(_ref, [this].concat(args))), _this), _this.state = {\n        query: ''\n      }, _this._getEmptyLabel = function () {\n        var _this$props = _this.props,\n            emptyLabel = _this$props.emptyLabel,\n            isLoading = _this$props.isLoading,\n            promptText = _this$props.promptText,\n            searchText = _this$props.searchText,\n            useCache = _this$props.useCache;\n        var query = _this.state.query;\n\n\n        if (!query.length) {\n          return promptText;\n        }\n\n        if (isLoading || useCache && !_this._cache[query]) {\n          return searchText;\n        }\n\n        return emptyLabel;\n      }, _this._handleInputChange = function (query, e) {\n        _this.props.onInputChange && _this.props.onInputChange(query, e);\n        _this._handleSearchDebounced(query);\n      }, _this._handleSearch = function (query) {\n        var _this$props2 = _this.props,\n            minLength = _this$props2.minLength,\n            onSearch = _this$props2.onSearch,\n            useCache = _this$props2.useCache;\n\n\n        _this.setState({ query: query });\n\n        if (!query || minLength && query.length < minLength) {\n          return;\n        }\n\n        // Use cached results, if available.\n        if (useCache && _this._cache[query]) {\n          return;\n        }\n\n        // Perform the search.\n        onSearch(query);\n      }, _temp), _possibleConstructorReturn(_this, _ret);\n    }\n\n    _createClass(WrappedTypeahead, [{\n      key: 'componentWillMount',\n      value: function componentWillMount() {\n        this._cache = {};\n        this._handleSearchDebounced = (0, _debounce2.default)(this._handleSearch, this.props.delay);\n      }\n    }, {\n      key: 'componentWillReceiveProps',\n      value: function componentWillReceiveProps(nextProps) {\n        var options = nextProps.options,\n            useCache = nextProps.useCache;\n\n\n        if (!this.props.isLoading) {\n          return;\n        }\n\n        if (useCache) {\n          this._cache[this.state.query] = options;\n        }\n      }\n    }, {\n      key: 'componentWillUnmount',\n      value: function componentWillUnmount() {\n        this._cache = {};\n        this._handleSearchDebounced.cancel();\n      }\n    }, {\n      key: 'render',\n      value: function render() {\n        var _this2 = this;\n\n        var _props = this.props,\n            options = _props.options,\n            useCache = _props.useCache,\n            props = _objectWithoutProperties(_props, ['options', 'useCache']);\n\n        var cachedQuery = this._cache[this.state.query];\n        var emptyLabel = this._getEmptyLabel();\n\n        // Short-circuit the creation of custom selections while the user is in\n        // the process of searching. The logic for whether or not to display the\n        // custom menu option is basically the same as whether we display the\n        // empty label, so use that as a proxy.\n        var allowNew = props.allowNew && emptyLabel === props.emptyLabel;\n        // Unless allowNew is a function,\n        // in which case it is up to the function to decide\n        if (typeof props.allowNew === 'function') {\n          allowNew = props.allowNew;\n        }\n\n        return _react2.default.createElement(Typeahead, _extends({}, props, {\n          allowNew: allowNew,\n          emptyLabel: emptyLabel,\n          onInputChange: this._handleInputChange,\n          options: useCache && cachedQuery ? cachedQuery : options,\n          ref: function ref(instance) {\n            return _this2._instance = instance;\n          }\n        }));\n      }\n\n      /**\n       * Make the component instance available.\n       */\n\n    }, {\n      key: 'getInstance',\n      value: function getInstance() {\n        return this._instance.getInstance();\n      }\n    }]);\n\n    return WrappedTypeahead;\n  }(_react2.default.Component);\n\n  WrappedTypeahead.displayName = 'AsyncContainer(' + (0, _utils.getDisplayName)(Typeahead) + ')';\n\n  WrappedTypeahead.propTypes = {\n    /**\n     * Delay, in milliseconds, before performing search.\n     */\n    delay: _propTypes2.default.number,\n    /**\n     * Whether or not a request is currently pending. Necessary for the\n     * container to know when new results are available.\n     */\n    isLoading: _propTypes2.default.bool.isRequired,\n    /**\n     * Callback to perform when the search is executed.\n     */\n    onSearch: _propTypes2.default.func.isRequired,\n    /**\n     * Options to be passed to the typeahead. Will typically be the query\n     * results, but can also be initial default options.\n     */\n    options: _propTypes2.default.array,\n    /**\n     * Message displayed in the menu when there is no user input.\n     */\n    promptText: _propTypes2.default.node,\n    /**\n     * Message displayed in the menu while the request is pending.\n     */\n    searchText: _propTypes2.default.node,\n    /**\n     * Whether or not the component should cache query results.\n     */\n    useCache: _propTypes2.default.bool\n  };\n\n  WrappedTypeahead.defaultProps = {\n    delay: DEFAULT_DELAY_MS,\n    minLength: 2,\n    options: [],\n    promptText: 'Type to search...',\n    searchText: 'Searching...',\n    useCache: true\n  };\n\n  return WrappedTypeahead;\n};\n\nexports.default = asyncContainer;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/containers/asyncContainer.js?");

/***/ }),

/***/ "./src/containers/highlightOnlyResultContainer.js":
/*!********************************************************!*\
  !*** ./src/containers/highlightOnlyResultContainer.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _head = __webpack_require__(/*! lodash/head */ \"./node_modules/lodash/head.js\");\n\nvar _head2 = _interopRequireDefault(_head);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _keyCode = __webpack_require__(/*! ../constants/keyCode */ \"./src/constants/keyCode.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction highlightOnlyResultContainer(Typeahead) {\n  var WrappedTypeahead = function (_React$Component) {\n    _inherits(WrappedTypeahead, _React$Component);\n\n    function WrappedTypeahead() {\n      var _ref;\n\n      var _temp, _this, _ret;\n\n      _classCallCheck(this, WrappedTypeahead);\n\n      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WrappedTypeahead.__proto__ || Object.getPrototypeOf(WrappedTypeahead)).call.apply(_ref, [this].concat(args))), _this), _this.state = {\n        isOnlyResult: false\n      }, _this._handleKeyDown = function (e) {\n        var _this$props = _this.props,\n            initialItem = _this$props.initialItem,\n            onKeyDown = _this$props.onKeyDown,\n            onAdd = _this$props.onAdd;\n\n\n        switch (e.keyCode) {\n          case _keyCode.RETURN:\n            if (_this.state.isOnlyResult) {\n              onAdd(initialItem);\n            }\n            break;\n        }\n\n        onKeyDown(e);\n      }, _temp), _possibleConstructorReturn(_this, _ret);\n    }\n\n    _createClass(WrappedTypeahead, [{\n      key: 'componentWillReceiveProps',\n      value: function componentWillReceiveProps(nextProps) {\n        var allowNew = nextProps.allowNew,\n            highlightOnlyResult = nextProps.highlightOnlyResult,\n            results = nextProps.results;\n\n\n        if (!highlightOnlyResult || allowNew) {\n          return;\n        }\n\n        if (results.length !== this.props.results.length) {\n          this.setState({\n            isOnlyResult: results.length === 1 && !(0, _head2.default)(results).disabled\n          });\n        }\n      }\n    }, {\n      key: 'getChildContext',\n      value: function getChildContext() {\n        return {\n          isOnlyResult: this.state.isOnlyResult\n        };\n      }\n    }, {\n      key: 'render',\n      value: function render() {\n        return _react2.default.createElement(Typeahead, _extends({}, this.props, {\n          onKeyDown: this._handleKeyDown\n        }));\n      }\n    }]);\n\n    return WrappedTypeahead;\n  }(_react2.default.Component);\n\n  WrappedTypeahead.childContextTypes = {\n    isOnlyResult: _propTypes2.default.bool.isRequired\n  };\n\n  return WrappedTypeahead;\n}\n\nexports.default = highlightOnlyResultContainer;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/containers/highlightOnlyResultContainer.js?");

/***/ }),

/***/ "./src/containers/hintContainer.js":
/*!*****************************************!*\
  !*** ./src/containers/hintContainer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _utils = __webpack_require__(/*! ../utils/ */ \"./src/utils/index.js\");\n\nvar _keyCode = __webpack_require__(/*! ../constants/keyCode */ \"./src/constants/keyCode.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n// IE doesn't seem to get the composite computed value (eg: 'padding',\n// 'borderStyle', etc.), so generate these from the individual values.\nfunction interpolateStyle(styles, attr) {\n  var subattr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';\n\n  // Title-case the sub-attribute.\n  if (subattr) {\n    subattr = subattr.replace(subattr[0], subattr[0].toUpperCase());\n  }\n\n  return ['Top', 'Right', 'Bottom', 'Left'].map(function (dir) {\n    return styles[attr + dir + subattr];\n  }).join(' ');\n}\n\nfunction copyStyles(inputNode, hintNode) {\n  var inputStyle = window.getComputedStyle(inputNode);\n\n  hintNode.style.borderStyle = interpolateStyle(inputStyle, 'border', 'style');\n  hintNode.style.borderWidth = interpolateStyle(inputStyle, 'border', 'width');\n  hintNode.style.fontSize = inputStyle.fontSize;\n  hintNode.style.lineHeight = inputStyle.lineHeight;\n  hintNode.style.margin = interpolateStyle(inputStyle, 'margin');\n  hintNode.style.padding = interpolateStyle(inputStyle, 'padding');\n}\n\nfunction hintContainer(Input) {\n  var HintedInput = function (_React$Component) {\n    _inherits(HintedInput, _React$Component);\n\n    function HintedInput() {\n      var _ref;\n\n      var _temp, _this, _ret;\n\n      _classCallCheck(this, HintedInput);\n\n      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HintedInput.__proto__ || Object.getPrototypeOf(HintedInput)).call.apply(_ref, [this].concat(args))), _this), _this._handleKeyDown = function (e) {\n        var _this$context = _this.context,\n            hintText = _this$context.hintText,\n            initialItem = _this$context.initialItem,\n            onAdd = _this$context.onAdd,\n            selectHintOnEnter = _this$context.selectHintOnEnter;\n        var _this$props = _this.props,\n            onKeyDown = _this$props.onKeyDown,\n            value = _this$props.value;\n\n\n        if (hintText && (e.keyCode === _keyCode.RETURN && selectHintOnEnter || e.keyCode === _keyCode.RIGHT && e.target.selectionStart === value.length || e.keyCode === _keyCode.TAB)) {\n          e.preventDefault(); // Prevent input from blurring on TAB.\n          onAdd(initialItem);\n        }\n\n        onKeyDown(e);\n      }, _temp), _possibleConstructorReturn(_this, _ret);\n    }\n\n    _createClass(HintedInput, [{\n      key: 'componentDidMount',\n      value: function componentDidMount() {\n        copyStyles(this._input, this._hint);\n      }\n    }, {\n      key: 'componentDidUpdate',\n      value: function componentDidUpdate() {\n        copyStyles(this._input, this._hint);\n      }\n    }, {\n      key: 'render',\n      value: function render() {\n        var _this2 = this;\n\n        return _react2.default.createElement(\n          'div',\n          {\n            className: 'rbt-input-hint-container',\n            style: { position: 'relative' } },\n          _react2.default.createElement(Input, _extends({}, this.props, {\n            inputRef: function inputRef(input) {\n              _this2._input = input;\n              _this2.props.inputRef(input);\n            },\n            onKeyDown: this._handleKeyDown\n          })),\n          _react2.default.createElement('input', {\n            'aria-hidden': true,\n            className: 'rbt-input-hint',\n            ref: function ref(hint) {\n              return _this2._hint = hint;\n            },\n            style: {\n              backgroundColor: 'transparent',\n              borderColor: 'transparent',\n              boxShadow: 'none',\n              color: 'rgba(0, 0, 0, 0.35)',\n              left: 0,\n              pointerEvents: 'none',\n              position: 'absolute',\n              top: 0\n            },\n            tabIndex: -1,\n            value: this.context.hintText\n          })\n        );\n      }\n    }]);\n\n    return HintedInput;\n  }(_react2.default.Component);\n\n  HintedInput.displayName = 'HintContainer(' + (0, _utils.getDisplayName)(Input) + ')';\n\n  HintedInput.contextTypes = {\n    hintText: _propTypes2.default.string.isRequired,\n    initialItem: _propTypes2.default.oneOfType([_propTypes2.default.object.isRequired, _propTypes2.default.string.isRequired]),\n    onAdd: _propTypes2.default.func.isRequired,\n    selectHintOnEnter: _propTypes2.default.bool.isRequired\n  };\n\n  return HintedInput;\n}\n\nexports.default = hintContainer;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/containers/hintContainer.js?");

/***/ }),

/***/ "./src/containers/inputContainer.js":
/*!******************************************!*\
  !*** ./src/containers/inputContainer.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _classnames = __webpack_require__(/*! classnames */ \"./node_modules/classnames/index.js\");\n\nvar _classnames2 = _interopRequireDefault(_classnames);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _utils = __webpack_require__(/*! ../utils/ */ \"./src/utils/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction inputContainer(Input) {\n  var WrappedInput = function (_React$Component) {\n    _inherits(WrappedInput, _React$Component);\n\n    function WrappedInput() {\n      var _ref;\n\n      var _temp, _this, _ret;\n\n      _classCallCheck(this, WrappedInput);\n\n      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WrappedInput.__proto__ || Object.getPrototypeOf(WrappedInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {\n        isFocused: false\n      }, _this._handleBlur = function (e) {\n        e.persist();\n        _this.setState({ isFocused: false }, function () {\n          return _this.props.onBlur(e);\n        });\n      }, _this._handleFocus = function (e) {\n        e.persist();\n        _this.setState({ isFocused: true }, function () {\n          return _this.props.onFocus(e);\n        });\n      }, _temp), _possibleConstructorReturn(_this, _ret);\n    }\n\n    _createClass(WrappedInput, [{\n      key: 'getChildContext',\n      value: function getChildContext() {\n        var _props = this.props,\n            initialItem = _props.initialItem,\n            onAdd = _props.onAdd,\n            selectHintOnEnter = _props.selectHintOnEnter;\n\n\n        return {\n          hintText: (0, _utils.getHintText)(this.props),\n          initialItem: initialItem,\n          onAdd: onAdd,\n          selectHintOnEnter: selectHintOnEnter\n        };\n      }\n    }, {\n      key: 'render',\n      value: function render() {\n        var _cx;\n\n        var _props2 = this.props,\n            activeIndex = _props2.activeIndex,\n            bsSize = _props2.bsSize,\n            disabled = _props2.disabled,\n            inputRef = _props2.inputRef,\n            isInvalid = _props2.isInvalid,\n            isMenuShown = _props2.isMenuShown,\n            isValid = _props2.isValid,\n            labelKey = _props2.labelKey,\n            menuId = _props2.menuId,\n            multiple = _props2.multiple,\n            onChange = _props2.onChange,\n            onKeyDown = _props2.onKeyDown,\n            onRemove = _props2.onRemove,\n            placeholder = _props2.placeholder,\n            renderToken = _props2.renderToken,\n            selected = _props2.selected;\n\n        // Add a11y-related props.\n\n        var inputProps = _extends({}, this.props.inputProps, {\n          'aria-activedescendant': activeIndex >= 0 ? (0, _utils.getMenuItemId)(activeIndex) : '',\n          'aria-autocomplete': multiple ? 'list' : 'both',\n          'aria-expanded': isMenuShown,\n          'aria-haspopup': 'listbox',\n          'aria-owns': menuId,\n          autoComplete: 'nope',\n          disabled: disabled,\n          inputRef: inputRef,\n          onBlur: this._handleBlur,\n          onChange: onChange,\n          // Re-open the menu, eg: if it's closed via ESC.\n          onClick: this._handleFocus,\n          onFocus: this._handleFocus,\n          onKeyDown: onKeyDown,\n          placeholder: selected.length ? null : placeholder,\n          // Comboboxes are single-select by definition:\n          // https://www.w3.org/TR/wai-aria-practices-1.1/#combobox\n          role: 'combobox',\n          value: (0, _utils.getInputText)(this.props)\n        });\n\n        var className = inputProps.className || '';\n\n        if (multiple) {\n          inputProps = _extends({}, inputProps, {\n            inputClassName: className,\n            labelKey: labelKey,\n            onRemove: onRemove,\n            renderToken: renderToken,\n            role: '',\n            selected: selected\n          });\n        }\n\n        return _react2.default.createElement(Input, _extends({}, inputProps, {\n          className: (0, _classnames2.default)('rbt-input', (_cx = {}, _defineProperty(_cx, className, !multiple), _defineProperty(_cx, 'focus', this.state.isFocused), _defineProperty(_cx, 'input-lg form-control-lg', bsSize === 'large' || bsSize === 'lg'), _defineProperty(_cx, 'input-sm form-control-sm', bsSize === 'small' || bsSize === 'sm'), _defineProperty(_cx, 'is-invalid', isInvalid), _defineProperty(_cx, 'is-valid', isValid), _cx))\n        }));\n      }\n    }]);\n\n    return WrappedInput;\n  }(_react2.default.Component);\n\n  WrappedInput.displayName = 'InputContainer(' + (0, _utils.getDisplayName)(Input) + ')';\n\n  WrappedInput.childContextTypes = {\n    hintText: _propTypes2.default.string.isRequired,\n    initialItem: _propTypes2.default.oneOfType([_propTypes2.default.object.isRequired, _propTypes2.default.string.isRequired]),\n    onAdd: _propTypes2.default.func.isRequired,\n    selectHintOnEnter: _propTypes2.default.bool.isRequired\n  };\n\n  return WrappedInput;\n}\n\nexports.default = inputContainer;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/containers/inputContainer.js?");

/***/ }),

/***/ "./src/containers/menuItemContainer.js":
/*!*********************************************!*\
  !*** ./src/containers/menuItemContainer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ \"react-dom\");\n\nvar _utils = __webpack_require__(/*! ../utils/ */ \"./src/utils/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nvar menuItemContainer = function menuItemContainer(Component) {\n  var WrappedMenuItem = function (_React$Component) {\n    _inherits(WrappedMenuItem, _React$Component);\n\n    function WrappedMenuItem() {\n      var _ref;\n\n      var _temp, _this, _ret;\n\n      _classCallCheck(this, WrappedMenuItem);\n\n      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WrappedMenuItem.__proto__ || Object.getPrototypeOf(WrappedMenuItem)).call.apply(_ref, [this].concat(args))), _this), _this._handleClick = function (e) {\n        var _this$props = _this.props,\n            option = _this$props.option,\n            onClick = _this$props.onClick;\n\n\n        _this.context.onMenuItemClick(option, e);\n        onClick && onClick(e);\n      }, _this._updateInitialItem = function (props) {\n        var option = props.option,\n            position = props.position;\n\n        if (position === 0) {\n          _this.context.onInitialItemChange(option);\n        }\n      }, _temp), _possibleConstructorReturn(_this, _ret);\n    }\n\n    _createClass(WrappedMenuItem, [{\n      key: 'componentWillMount',\n      value: function componentWillMount() {\n        this._updateInitialItem(this.props);\n      }\n    }, {\n      key: 'componentWillReceiveProps',\n      value: function componentWillReceiveProps(nextProps, nextContext) {\n        var currentlyActive = this.context.activeIndex === this.props.position;\n        var option = nextProps.option,\n            position = nextProps.position;\n        var activeIndex = nextContext.activeIndex,\n            onActiveItemChange = nextContext.onActiveItemChange;\n\n\n        if (position == null) {\n          return;\n        }\n\n        // The item will become active.\n        if (activeIndex === position) {\n          // Ensures that if the menu items exceed the bounds of the menu, the\n          // menu will scroll up or down as the user hits the arrow keys.\n          (0, _utils.scrollIntoViewIfNeeded)((0, _reactDom.findDOMNode)(this));\n\n          // Fire the change handler when the menu item becomes active.\n          !currentlyActive && onActiveItemChange(option);\n        }\n\n        this._updateInitialItem(nextProps);\n      }\n    }, {\n      key: 'render',\n      value: function render() {\n        var _context = this.context,\n            activeIndex = _context.activeIndex,\n            isOnlyResult = _context.isOnlyResult;\n\n        var _props = this.props,\n            label = _props.label,\n            option = _props.option,\n            position = _props.position,\n            props = _objectWithoutProperties(_props, ['label', 'option', 'position']);\n\n        var active = isOnlyResult || activeIndex === position;\n\n        return _react2.default.createElement(Component, _extends({}, props, {\n          active: active,\n          'aria-label': label,\n          'aria-selected': active,\n          id: (0, _utils.getMenuItemId)(position),\n          onClick: this._handleClick,\n          onMouseDown: _utils.preventInputBlur,\n          role: 'option'\n        }));\n      }\n    }]);\n\n    return WrappedMenuItem;\n  }(_react2.default.Component);\n\n  WrappedMenuItem.displayName = 'MenuItemContainer(' + (0, _utils.getDisplayName)(Component) + ')';\n\n  WrappedMenuItem.propTypes = {\n    option: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]).isRequired,\n    position: _propTypes2.default.number\n  };\n\n  WrappedMenuItem.contextTypes = {\n    activeIndex: _propTypes2.default.number.isRequired,\n    isOnlyResult: _propTypes2.default.bool.isRequired,\n    onActiveItemChange: _propTypes2.default.func.isRequired,\n    onInitialItemChange: _propTypes2.default.func.isRequired,\n    onMenuItemClick: _propTypes2.default.func.isRequired\n  };\n\n  return WrappedMenuItem;\n};\n\nexports.default = menuItemContainer;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/containers/menuItemContainer.js?");

/***/ }),

/***/ "./src/containers/tokenContainer.js":
/*!******************************************!*\
  !*** ./src/containers/tokenContainer.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactOnclickoutside = __webpack_require__(/*! react-onclickoutside */ \"./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js\");\n\nvar _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);\n\nvar _utils = __webpack_require__(/*! ../utils/ */ \"./src/utils/index.js\");\n\nvar _keyCode = __webpack_require__(/*! ../constants/keyCode */ \"./src/constants/keyCode.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n/**\n * Higher-order component that encapsulates Token behaviors, allowing them to\n * be easily re-used.\n */\nvar tokenContainer = function tokenContainer(Component) {\n  var WrappedComponent = function (_React$Component) {\n    _inherits(WrappedComponent, _React$Component);\n\n    function WrappedComponent() {\n      var _ref;\n\n      var _temp, _this, _ret;\n\n      _classCallCheck(this, WrappedComponent);\n\n      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WrappedComponent.__proto__ || Object.getPrototypeOf(WrappedComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {\n        active: false\n      }, _this._handleBlur = function (e) {\n        _this.setState({ active: false });\n      }, _this._handleKeyDown = function (e) {\n        switch (e.keyCode) {\n          case _keyCode.BACKSPACE:\n            if (_this.state.active) {\n              // Prevent backspace keypress from triggering the browser \"back\"\n              // action.\n              e.preventDefault();\n              _this.props.onRemove();\n            }\n            break;\n        }\n      }, _this.handleClickOutside = function (e) {\n        _this._handleBlur();\n      }, _this._handleActive = function (e) {\n        e.stopPropagation();\n        _this.setState({ active: true });\n      }, _temp), _possibleConstructorReturn(_this, _ret);\n    }\n\n    _createClass(WrappedComponent, [{\n      key: 'render',\n      value: function render() {\n        var _props = this.props,\n            disableOnClickOutside = _props.disableOnClickOutside,\n            enableOnClickOutside = _props.enableOnClickOutside,\n            eventTypes = _props.eventTypes,\n            outsideClickIgnoreClass = _props.outsideClickIgnoreClass,\n            preventDefault = _props.preventDefault,\n            stopPropagation = _props.stopPropagation,\n            tokenProps = _objectWithoutProperties(_props, ['disableOnClickOutside', 'enableOnClickOutside', 'eventTypes', 'outsideClickIgnoreClass', 'preventDefault', 'stopPropagation']);\n\n        return _react2.default.createElement(Component, _extends({}, tokenProps, this.state, {\n          onBlur: this._handleBlur,\n          onClick: this._handleActive,\n          onFocus: this._handleActive,\n          onKeyDown: this._handleKeyDown\n        }));\n      }\n\n      /**\n       * From `onClickOutside` HOC.\n       */\n\n    }]);\n\n    return WrappedComponent;\n  }(_react2.default.Component);\n\n  WrappedComponent.displayName = 'TokenContainer(' + (0, _utils.getDisplayName)(Component) + ')';\n\n  return (0, _reactOnclickoutside2.default)(WrappedComponent);\n};\n\nexports.default = tokenContainer;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/containers/tokenContainer.js?");

/***/ }),

/***/ "./src/containers/typeaheadContainer.js":
/*!**********************************************!*\
  !*** ./src/containers/typeaheadContainer.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _flowRight = __webpack_require__(/*! lodash/flowRight */ \"./node_modules/lodash/flowRight.js\");\n\nvar _flowRight2 = _interopRequireDefault(_flowRight);\n\nvar _head = __webpack_require__(/*! lodash/head */ \"./node_modules/lodash/head.js\");\n\nvar _head2 = _interopRequireDefault(_head);\n\nvar _isEqual = __webpack_require__(/*! lodash/isEqual */ \"./node_modules/lodash/isEqual.js\");\n\nvar _isEqual2 = _interopRequireDefault(_isEqual);\n\nvar _noop = __webpack_require__(/*! lodash/noop */ \"./node_modules/lodash/noop.js\");\n\nvar _noop2 = _interopRequireDefault(_noop);\n\nvar _uniqueId = __webpack_require__(/*! lodash/uniqueId */ \"./node_modules/lodash/uniqueId.js\");\n\nvar _uniqueId2 = _interopRequireDefault(_uniqueId);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _reactOnclickoutside = __webpack_require__(/*! react-onclickoutside */ \"./node_modules/react-onclickoutside/dist/react-onclickoutside.es.js\");\n\nvar _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);\n\nvar _react = __webpack_require__(/*! react */ \"react\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _highlightOnlyResultContainer = __webpack_require__(/*! ./highlightOnlyResultContainer */ \"./src/containers/highlightOnlyResultContainer.js\");\n\nvar _highlightOnlyResultContainer2 = _interopRequireDefault(_highlightOnlyResultContainer);\n\nvar _propTypes3 = __webpack_require__(/*! ../propTypes/ */ \"./src/propTypes/index.js\");\n\nvar _utils = __webpack_require__(/*! ../utils/ */ \"./src/utils/index.js\");\n\nvar _defaultLabelKey = __webpack_require__(/*! ../constants/defaultLabelKey */ \"./src/constants/defaultLabelKey.js\");\n\nvar _keyCode = __webpack_require__(/*! ../constants/keyCode */ \"./src/constants/keyCode.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return call && (typeof call === \"object\" || typeof call === \"function\") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function, not \" + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\nfunction genId() {\n  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n\n  return prefix + Math.random().toString(36).substr(2, 12);\n}\n\nfunction getInitialState(props) {\n  var defaultInputValue = props.defaultInputValue,\n      defaultSelected = props.defaultSelected,\n      maxResults = props.maxResults,\n      multiple = props.multiple;\n\n\n  var selected = props.selected ? props.selected.slice() : defaultSelected.slice();\n\n  var text = defaultInputValue;\n\n  if (!multiple && selected.length) {\n    // Set the text if an initial selection is passed in.\n    text = (0, _utils.getOptionLabel)((0, _head2.default)(selected), props.labelKey);\n\n    if (selected.length > 1) {\n      // Limit to 1 selection in single-select mode.\n      selected = selected.slice(0, 1);\n    }\n  }\n\n  return {\n    activeIndex: -1,\n    activeItem: null,\n    initialItem: null,\n    selected: selected,\n    showMenu: false,\n    shownResults: maxResults,\n    text: text\n  };\n}\n\nfunction typeaheadContainer(Typeahead) {\n  // Nested HOCs to encapsulate behaviors. In order from outer to inner.\n  Typeahead = (0, _flowRight2.default)(_highlightOnlyResultContainer2.default)(Typeahead);\n\n  var WrappedTypeahead = function (_React$Component) {\n    _inherits(WrappedTypeahead, _React$Component);\n\n    function WrappedTypeahead(props) {\n      _classCallCheck(this, WrappedTypeahead);\n\n      var _this = _possibleConstructorReturn(this, (WrappedTypeahead.__proto__ || Object.getPrototypeOf(WrappedTypeahead)).call(this, props));\n\n      _this.blur = function () {\n        _this.getInput().blur();\n        _this._hideMenu();\n      };\n\n      _this.clear = function () {\n        _this.setState(_extends({}, getInitialState(_this.props), {\n          selected: [],\n          text: ''\n        }));\n      };\n\n      _this.focus = function () {\n        _this.getInput().focus();\n      };\n\n      _this.getInput = function () {\n        return _this._input;\n      };\n\n      _this._handleActiveIndexChange = function (activeIndex) {\n        var newState = { activeIndex: activeIndex };\n\n        if (activeIndex === -1) {\n          // Reset the active item if there is no active index.\n          newState.activeItem = null;\n        }\n\n        _this.setState(newState);\n      };\n\n      _this._handleActiveItemChange = function (activeItem) {\n        _this.setState({ activeItem: activeItem });\n      };\n\n      _this._handleClear = function () {\n        _this.clear();\n        _this._updateSelected([]);\n      };\n\n      _this._handleFocus = function (e) {\n        _this.setState({ showMenu: true }, function () {\n          return _this.props.onFocus(e);\n        });\n      };\n\n      _this._handleInitialItemChange = function (initialItem) {\n        var labelKey = _this.props.labelKey;\n\n        var currentItem = _this.state.initialItem;\n\n        // Don't update the initial item if it hasn't changed. For custom items,\n        // compare the `labelKey` values since a unique id is generated each time,\n        // causing the comparison to always return false otherwise.\n        if ((0, _isEqual2.default)(initialItem, currentItem) || currentItem && initialItem && initialItem.customOption && initialItem[labelKey] === currentItem[labelKey]) {\n          return;\n        }\n\n        _this.setState({ initialItem: initialItem });\n      };\n\n      _this._handleInputChange = function (e) {\n        e.persist();\n        var text = e.target.value;\n\n        var _getInitialState = getInitialState(_this.props),\n            activeIndex = _getInitialState.activeIndex,\n            activeItem = _getInitialState.activeItem;\n\n        var _this$props = _this.props,\n            multiple = _this$props.multiple,\n            onInputChange = _this$props.onInputChange;\n\n\n        _this.setState({\n          activeIndex: activeIndex,\n          activeItem: activeItem,\n          showMenu: true,\n          text: text\n        }, function () {\n          return onInputChange(text, e);\n        });\n\n        // Clear any selections if text is entered in single-select mode.\n        if (_this.state.selected.length && !multiple) {\n          _this._updateSelected([]);\n        }\n      };\n\n      _this._handleKeyDown = function (e, results, isMenuShown) {\n        var activeItem = _this.state.activeItem;\n\n\n        switch (e.keyCode) {\n          case _keyCode.UP:\n          case _keyCode.DOWN:\n            if (!isMenuShown) {\n              _this._showMenu();\n              break;\n            }\n\n            var activeIndex = _this.state.activeIndex;\n\n            // Prevents input cursor from going to the beginning when pressing up.\n\n            e.preventDefault();\n\n            // Increment or decrement index based on user keystroke.\n            activeIndex += e.keyCode === _keyCode.UP ? -1 : 1;\n\n            // Skip over any disabled options.\n            while (results[activeIndex] && results[activeIndex].disabled) {\n              activeIndex += e.keyCode === _keyCode.UP ? -1 : 1;\n            }\n\n            // If we've reached the end, go back to the beginning or vice-versa.\n            if (activeIndex === results.length) {\n              activeIndex = -1;\n            } else if (activeIndex === -2) {\n              activeIndex = results.length - 1;\n            }\n\n            _this._handleActiveIndexChange(activeIndex);\n            break;\n          case _keyCode.ESC:\n            isMenuShown && _this._hideMenu();\n            break;\n          case _keyCode.RETURN:\n            if (!isMenuShown) {\n              break;\n            }\n\n            // Prevent form submission while menu is open.\n            e.preventDefault();\n            activeItem && _this._handleMenuItemSelect(activeItem, e);\n            break;\n          case _keyCode.RIGHT:\n          case _keyCode.TAB:\n            if (!isMenuShown) {\n              break;\n            }\n\n            if (activeItem && !activeItem.paginationOption) {\n              // Prevent blurring when selecting the active item.\n              e.keyCode === _keyCode.TAB && e.preventDefault();\n              _this._handleSelectionAdd(activeItem);\n              break;\n            }\n\n            if (e.keyCode === _keyCode.TAB) {\n              _this._hideMenu();\n            }\n            break;\n        }\n\n        _this.props.onKeyDown(e);\n      };\n\n      _this._handleMenuItemSelect = function (option, e) {\n        if (option.paginationOption) {\n          _this._handlePaginate(e);\n        } else {\n          _this._handleSelectionAdd(option);\n        }\n      };\n\n      _this._handlePaginate = function (e) {\n        e.persist();\n        var _this$props2 = _this.props,\n            maxResults = _this$props2.maxResults,\n            onPaginate = _this$props2.onPaginate;\n\n\n        _this.setState({\n          shownResults: _this.state.shownResults + maxResults\n        }, function () {\n          return onPaginate(e);\n        });\n      };\n\n      _this._handleSelectionAdd = function (selection) {\n        var _this$props3 = _this.props,\n            multiple = _this$props3.multiple,\n            labelKey = _this$props3.labelKey;\n\n\n        var selected = void 0;\n        var text = void 0;\n\n        if (multiple) {\n          // If multiple selections are allowed, add the new selection to the\n          // existing selections.\n          selected = _this.state.selected.concat(selection);\n          text = '';\n        } else {\n          // If only a single selection is allowed, replace the existing selection\n          // with the new one.\n          selected = [selection];\n          text = (0, _utils.getOptionLabel)(selection, labelKey);\n        }\n\n        _this._hideMenu();\n        _this.setState({\n          initialItem: selection,\n          text: text\n        });\n\n        // Text must be updated before the selection to fix #211.\n        // TODO: Find a more robust way of solving the issue.\n        _this._updateSelected(selected);\n      };\n\n      _this._handleSelectionRemove = function (selection) {\n        var selected = _this.state.selected.filter(function (option) {\n          return !(0, _isEqual2.default)(option, selection);\n        });\n\n        // Make sure the input stays focused after the item is removed.\n        _this.focus();\n        _this._hideMenu();\n        _this._updateSelected(selected);\n      };\n\n      _this.handleClickOutside = function (e) {\n        _this.state.showMenu && _this._hideMenu();\n      };\n\n      _this._hideMenu = function () {\n        var _getInitialState2 = getInitialState(_this.props),\n            activeIndex = _getInitialState2.activeIndex,\n            activeItem = _getInitialState2.activeItem,\n            showMenu = _getInitialState2.showMenu,\n            shownResults = _getInitialState2.shownResults;\n\n        _this.setState({\n          activeIndex: activeIndex,\n          activeItem: activeItem,\n          showMenu: showMenu,\n          shownResults: shownResults\n        });\n      };\n\n      _this._showMenu = function () {\n        _this.setState({ showMenu: true });\n      };\n\n      _this._updateSelected = function (selected) {\n        _this.setState({ selected: selected }, function () {\n          return _this.props.onChange(selected);\n        });\n      };\n\n      _this.state = getInitialState(props);\n      return _this;\n    }\n\n    _createClass(WrappedTypeahead, [{\n      key: 'getChildContext',\n      value: function getChildContext() {\n        return {\n          activeIndex: this.state.activeIndex,\n          onActiveItemChange: this._handleActiveItemChange,\n          onInitialItemChange: this._handleInitialItemChange,\n          onMenuItemClick: this._handleMenuItemSelect\n        };\n      }\n    }, {\n      key: 'componentWillMount',\n      value: function componentWillMount() {\n        // Generate random id here since doing it in defaultProps will generate\n        // the same id for every instance.\n        this._menuId = genId('rbt-menu-');\n      }\n    }, {\n      key: 'componentDidMount',\n      value: function componentDidMount() {\n        this.props.autoFocus && this.focus();\n      }\n    }, {\n      key: 'componentWillReceiveProps',\n      value: function componentWillReceiveProps(nextProps) {\n        var labelKey = nextProps.labelKey,\n            multiple = nextProps.multiple,\n            selected = nextProps.selected;\n\n        // If new selections are passed via props, treat as a controlled input.\n\n        if (selected && !(0, _isEqual2.default)(selected, this.state.selected)) {\n          this.setState({ selected: selected });\n\n          if (multiple) {\n            return;\n          }\n\n          this.setState({\n            text: selected.length ? (0, _utils.getOptionLabel)((0, _head2.default)(selected), labelKey) : ''\n          });\n        }\n\n        // Truncate selections when in single-select mode.\n        var newSelected = selected || this.state.selected;\n        if (!multiple && newSelected.length > 1) {\n          newSelected = newSelected.slice(0, 1);\n          this.setState({\n            selected: newSelected,\n            text: (0, _utils.getOptionLabel)((0, _head2.default)(newSelected), labelKey)\n          });\n          return;\n        }\n\n        if (multiple !== this.props.multiple) {\n          this.setState({ text: '' });\n        }\n      }\n    }, {\n      key: 'render',\n      value: function render() {\n        var _this2 = this;\n\n        var _props = this.props,\n            emptyLabel = _props.emptyLabel,\n            filterBy = _props.filterBy,\n            labelKey = _props.labelKey,\n            minLength = _props.minLength,\n            options = _props.options,\n            paginate = _props.paginate,\n            paginationText = _props.paginationText;\n        var _state = this.state,\n            shownResults = _state.shownResults,\n            showMenu = _state.showMenu,\n            text = _state.text;\n\n        var mergedPropsAndState = _extends({}, this.props, this.state);\n\n        var results = [];\n        if (text.length >= minLength) {\n          var cb = Array.isArray(filterBy) ? _utils.defaultFilterBy : filterBy;\n          results = options.filter(function (option) {\n            return cb(option, mergedPropsAndState);\n          });\n        }\n\n        // This must come before results are truncated.\n        var shouldPaginate = paginate && results.length > shownResults;\n\n        // Truncate results if necessary.\n        results = (0, _utils.getTruncatedOptions)(results, shownResults);\n\n        // Add the custom option if necessary.\n        if ((0, _utils.addCustomOption)(results, mergedPropsAndState)) {\n          results.push(_defineProperty({\n            customOption: true,\n            id: (0, _uniqueId2.default)('new-id-')\n          }, (0, _utils.getStringLabelKey)(labelKey), text));\n        }\n\n        // Add the pagination item if necessary.\n        if (shouldPaginate) {\n          var _results$push2;\n\n          results.push((_results$push2 = {}, _defineProperty(_results$push2, (0, _utils.getStringLabelKey)(labelKey), paginationText), _defineProperty(_results$push2, 'paginationOption', true), _results$push2));\n        }\n\n        // This must come after the custom option is added, if applicable.\n        var isMenuShown = !!(text.length >= minLength && showMenu && (results.length || emptyLabel));\n\n        return _react2.default.createElement(Typeahead, _extends({}, this.props, this.state, {\n          inputRef: function inputRef(input) {\n            return _this2._input = input;\n          },\n          isMenuShown: isMenuShown,\n          menuId: this.props.menuId || this._menuId,\n          onAdd: this._handleSelectionAdd,\n          onChange: this._handleInputChange,\n          onClear: this._handleClear,\n          onFocus: this._handleFocus,\n          onInitialItemChange: this._handleInitialItemChange,\n          onKeyDown: function onKeyDown(e) {\n            return _this2._handleKeyDown(e, results, isMenuShown);\n          },\n          onRemove: this._handleSelectionRemove,\n          results: results\n        }));\n      }\n\n      /**\n       * From `onClickOutside` HOC.\n       */\n\n    }]);\n\n    return WrappedTypeahead;\n  }(_react2.default.Component);\n\n  WrappedTypeahead.displayName = 'TypeaheadContainer(' + (0, _utils.getDisplayName)(Typeahead) + ')';\n\n  WrappedTypeahead.propTypes = {\n    /**\n     * For localized accessibility: Should return a string indicating the number\n     * of results for screen readers. Receives the current results.\n     */\n    a11yNumResults: _propTypes2.default.func,\n    /**\n     * For localized accessibility: Should return a string indicating the number\n     * of selections for screen readers. Receives the current selections.\n     */\n    a11yNumSelected: _propTypes2.default.func,\n    /**\n     * Specify menu alignment. The default value is `justify`, which makes the\n     * menu as wide as the input and truncates long values. Specifying `left`\n     * or `right` will align the menu to that side and the width will be\n     * determined by the length of menu item values.\n     */\n    align: _propTypes2.default.oneOf(['justify', 'left', 'right']),\n    /**\n     * Allows the creation of new selections on the fly. Note that any new items\n     * will be added to the list of selections, but not the list of original\n     * options unless handled as such by `Typeahead`'s parent.\n     *\n     * If a function is specified, it will be used to determine whether a custom\n     * option should be included. The return value should be true or false.\n     */\n    allowNew: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),\n    /**\n     * Autofocus the input when the component initially mounts.\n     */\n    autoFocus: _propTypes2.default.bool,\n    /**\n     * Whether to render the menu inline or attach to `document.body`.\n     */\n    bodyContainer: _propTypes2.default.bool,\n    /**\n     * Whether or not filtering should be case-sensitive.\n     */\n    caseSensitive: (0, _propTypes3.checkPropType)(_propTypes2.default.bool, _propTypes3.caseSensitiveType),\n    /**\n     * Displays a button to clear the input when there are selections.\n     */\n    clearButton: _propTypes2.default.bool,\n    /**\n     * The initial value displayed in the text input.\n     */\n    defaultInputValue: (0, _propTypes3.checkPropType)(_propTypes2.default.string, _propTypes3.defaultInputValueType),\n    /**\n     * Specify any pre-selected options. Use only if you want the component to\n     * be uncontrolled.\n     */\n    defaultSelected: _propTypes3.optionType,\n    /**\n     * Whether to disable the component.\n     */\n    disabled: _propTypes2.default.bool,\n    /**\n     * Specify whether the menu should appear above the input.\n     */\n    dropup: _propTypes2.default.bool,\n    /**\n     * Message to display in the menu if there are no valid results.\n     */\n    emptyLabel: _propTypes2.default.node,\n    /**\n     * Either an array of fields in `option` to search, or a custom filtering\n     * callback.\n     */\n    filterBy: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string.isRequired), _propTypes2.default.func]),\n    /**\n     * Whether or not to automatically adjust the position of the menu when it\n     * reaches the viewport boundaries.\n     */\n    flip: _propTypes2.default.bool,\n    /**\n     * Highlights the menu item if there is only one result and allows selecting\n     * that item by hitting enter. Does not work with `allowNew`.\n     */\n    highlightOnlyResult: (0, _propTypes3.checkPropType)(_propTypes2.default.bool, _propTypes3.highlightOnlyResultType),\n    /**\n     * Whether the filter should ignore accents and other diacritical marks.\n     */\n    ignoreDiacritics: (0, _propTypes3.checkPropType)(_propTypes2.default.bool, _propTypes3.ignoreDiacriticsType),\n    /**\n     * Props to be applied directly to the input. `onBlur`, `onChange`,\n     * `onFocus`, and `onKeyDown` are ignored.\n     */\n    inputProps: (0, _propTypes3.checkPropType)(_propTypes2.default.object, _propTypes3.inputPropsType),\n    /**\n     * Bootstrap 4 only. Adds the `is-invalid` classname to the `form-control`.\n     */\n    isInvalid: _propTypes2.default.bool,\n    /**\n     * Indicate whether an asynchronous data fetch is happening.\n     */\n    isLoading: _propTypes2.default.bool,\n    /**\n     * Bootstrap 4 only. Adds the `is-valid` classname to the `form-control`.\n     */\n    isValid: _propTypes2.default.bool,\n    /**\n     * Specify the option key to use for display or a function returning the\n     * display string. By default, the selector will use the `label` key.\n     */\n    labelKey: (0, _propTypes3.checkPropType)(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]), _propTypes3.labelKeyType),\n    /**\n     * Maximum number of results to display by default. Mostly done for\n     * performance reasons so as not to render too many DOM nodes in the case of\n     * large data sets.\n     */\n    maxResults: _propTypes2.default.number,\n    /**\n     * Id applied to the top-level menu element. Required for accessibility.\n     */\n    menuId: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),\n    /**\n     * Number of input characters that must be entered before showing results.\n     */\n    minLength: _propTypes2.default.number,\n    /**\n     * Whether or not multiple selections are allowed.\n     */\n    multiple: _propTypes2.default.bool,\n    /**\n     * Invoked when the input is blurred. Receives an event.\n     */\n    onBlur: _propTypes2.default.func,\n    /**\n     * Invoked whenever items are added or removed. Receives an array of the\n     * selected options.\n     */\n    onChange: _propTypes2.default.func,\n    /**\n     * Invoked when the input is focused. Receives an event.\n     */\n    onFocus: _propTypes2.default.func,\n    /**\n     * Invoked when the input value changes. Receives the string value of the\n     * input.\n     */\n    onInputChange: _propTypes2.default.func,\n    /**\n     * Invoked when a key is pressed. Receives an event.\n     */\n    onKeyDown: _propTypes2.default.func,\n    /**\n     * Invoked when the menu is hidden.\n     */\n    onMenuHide: _propTypes2.default.func,\n    /**\n     * Invoked when the menu is shown.\n     */\n    onMenuShow: _propTypes2.default.func,\n    /**\n     * Invoked when the pagination menu item is clicked. Receives an event.\n     */\n    onPaginate: _propTypes2.default.func,\n    /**\n     * Full set of options, including pre-selected options. Must either be an\n     * array of objects (recommended) or strings.\n     */\n    options: _propTypes3.optionType.isRequired,\n    /**\n     * Give user the ability to display additional results if the number of\n     * results exceeds `maxResults`.\n     */\n    paginate: _propTypes2.default.bool,\n    /**\n     * Prompt displayed when large data sets are paginated.\n     */\n    paginationText: _propTypes2.default.string,\n    /**\n     * Placeholder text for the input.\n     */\n    placeholder: _propTypes2.default.string,\n    /**\n     * Callback for custom menu rendering.\n     */\n    renderMenu: _propTypes2.default.func,\n    /**\n     * The selected option(s) displayed in the input. Use this prop if you want\n     * to control the component via its parent.\n     */\n    selected: _propTypes3.optionType,\n    /**\n     * Allows selecting the hinted result by pressing enter.\n     */\n    selectHintOnEnter: _propTypes2.default.bool\n  };\n\n  WrappedTypeahead.defaultProps = {\n    a11yNumResults: function a11yNumResults(results) {\n      var resultString = (0, _utils.pluralize)('result', results.length);\n      return resultString + '. Use up and down arrow keys to navigate.';\n    },\n    a11yNumSelected: function a11yNumSelected(selected) {\n      return (0, _utils.pluralize)('selection', selected.length);\n    },\n    align: 'justify',\n    allowNew: false,\n    autoFocus: false,\n    bodyContainer: false,\n    caseSensitive: false,\n    clearButton: false,\n    defaultInputValue: '',\n    defaultSelected: [],\n    disabled: false,\n    dropup: false,\n    emptyLabel: 'No matches found.',\n    filterBy: [],\n    flip: false,\n    highlightOnlyResult: false,\n    ignoreDiacritics: true,\n    inputProps: {},\n    isInvalid: false,\n    isLoading: false,\n    isValid: false,\n    labelKey: _defaultLabelKey.DEFAULT_LABELKEY,\n    maxResults: 100,\n    minLength: 0,\n    multiple: false,\n    onBlur: _noop2.default,\n    onChange: _noop2.default,\n    onFocus: _noop2.default,\n    onInputChange: _noop2.default,\n    onKeyDown: _noop2.default,\n    onMenuHide: _noop2.default,\n    onMenuShow: _noop2.default,\n    onPaginate: _noop2.default,\n    paginate: true,\n    paginationText: 'Display additional results...',\n    placeholder: '',\n    selectHintOnEnter: false\n  };\n\n  WrappedTypeahead.childContextTypes = {\n    activeIndex: _propTypes2.default.number.isRequired,\n    onActiveItemChange: _propTypes2.default.func.isRequired,\n    onInitialItemChange: _propTypes2.default.func.isRequired,\n    onMenuItemClick: _propTypes2.default.func.isRequired\n  };\n\n  return (0, _reactOnclickoutside2.default)(WrappedTypeahead);\n}\n\nexports.default = typeaheadContainer;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/containers/typeaheadContainer.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.tokenContainer = exports.menuItemContainer = exports.asyncContainer = exports.TypeaheadMenu = exports.Typeahead = exports.Token = exports.MenuItem = exports.Menu = exports.Highlighter = exports.AsyncTypeahead = undefined;\n\nvar _AsyncTypeahead2 = __webpack_require__(/*! ./AsyncTypeahead.react */ \"./src/AsyncTypeahead.react.js\");\n\nvar _AsyncTypeahead3 = _interopRequireDefault(_AsyncTypeahead2);\n\nvar _Highlighter2 = __webpack_require__(/*! ./Highlighter.react */ \"./src/Highlighter.react.js\");\n\nvar _Highlighter3 = _interopRequireDefault(_Highlighter2);\n\nvar _Menu2 = __webpack_require__(/*! ./Menu.react */ \"./src/Menu.react.js\");\n\nvar _Menu3 = _interopRequireDefault(_Menu2);\n\nvar _MenuItem2 = __webpack_require__(/*! ./MenuItem.react */ \"./src/MenuItem.react.js\");\n\nvar _MenuItem3 = _interopRequireDefault(_MenuItem2);\n\nvar _Token2 = __webpack_require__(/*! ./Token.react */ \"./src/Token.react.js\");\n\nvar _Token3 = _interopRequireDefault(_Token2);\n\nvar _Typeahead2 = __webpack_require__(/*! ./Typeahead.react */ \"./src/Typeahead.react.js\");\n\nvar _Typeahead3 = _interopRequireDefault(_Typeahead2);\n\nvar _TypeaheadMenu2 = __webpack_require__(/*! ./TypeaheadMenu.react */ \"./src/TypeaheadMenu.react.js\");\n\nvar _TypeaheadMenu3 = _interopRequireDefault(_TypeaheadMenu2);\n\nvar _asyncContainer2 = __webpack_require__(/*! ./containers/asyncContainer */ \"./src/containers/asyncContainer.js\");\n\nvar _asyncContainer3 = _interopRequireDefault(_asyncContainer2);\n\nvar _menuItemContainer2 = __webpack_require__(/*! ./containers/menuItemContainer */ \"./src/containers/menuItemContainer.js\");\n\nvar _menuItemContainer3 = _interopRequireDefault(_menuItemContainer2);\n\nvar _tokenContainer2 = __webpack_require__(/*! ./containers/tokenContainer */ \"./src/containers/tokenContainer.js\");\n\nvar _tokenContainer3 = _interopRequireDefault(_tokenContainer2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.AsyncTypeahead = _AsyncTypeahead3.default; /* eslint-disable object-curly-spacing */\n\n// Components\n\nexports.Highlighter = _Highlighter3.default;\nexports.Menu = _Menu3.default;\nexports.MenuItem = _MenuItem3.default;\nexports.Token = _Token3.default;\nexports.Typeahead = _Typeahead3.default;\nexports.TypeaheadMenu = _TypeaheadMenu3.default;\n\n// HOCs\n\nexports.asyncContainer = _asyncContainer3.default;\nexports.menuItemContainer = _menuItemContainer3.default;\nexports.tokenContainer = _tokenContainer3.default;\n\n/* eslint-enable object-curly-spacing */\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/index.js?");

/***/ }),

/***/ "./src/propTypes/caseSensitiveType.js":
/*!********************************************!*\
  !*** ./src/propTypes/caseSensitiveType.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = caseSensitiveType;\n\nvar _warn = __webpack_require__(/*! ../utils/warn */ \"./src/utils/warn.js\");\n\nvar _warn2 = _interopRequireDefault(_warn);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction caseSensitiveType(props, propName, componentName) {\n  var caseSensitive = props.caseSensitive,\n      filterBy = props.filterBy;\n\n  (0, _warn2.default)(!caseSensitive || typeof filterBy !== 'function', 'Your `filterBy` function will override the `caseSensitive` prop.');\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/propTypes/caseSensitiveType.js?");

/***/ }),

/***/ "./src/propTypes/checkPropType.js":
/*!****************************************!*\
  !*** ./src/propTypes/checkPropType.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = checkPropType;\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/**\n * Allows additional warnings or messaging related to prop validation.\n */\nfunction checkPropType(validator, callback) {\n  return function (props, propName, componentName) {\n    _propTypes2.default.checkPropTypes(_defineProperty({}, propName, validator), props, 'prop', componentName);\n\n    typeof callback === 'function' && callback(props, propName, componentName);\n  };\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/propTypes/checkPropType.js?");

/***/ }),

/***/ "./src/propTypes/defaultInputValueType.js":
/*!************************************************!*\
  !*** ./src/propTypes/defaultInputValueType.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = defaultInputValueType;\n\nvar _warn = __webpack_require__(/*! ../utils/warn */ \"./src/utils/warn.js\");\n\nvar _warn2 = _interopRequireDefault(_warn);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction defaultInputValueType(props, propName, componentName) {\n  var defaultInputValue = props.defaultInputValue,\n      defaultSelected = props.defaultSelected,\n      multiple = props.multiple,\n      selected = props.selected;\n\n  var name = defaultSelected.length ? 'defaultSelected' : 'selected';\n\n  (0, _warn2.default)(!(!multiple && defaultInputValue && (defaultSelected.length || selected && selected.length)), '`defaultInputValue` will be overridden by the value from `' + name + '`.');\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/propTypes/defaultInputValueType.js?");

/***/ }),

/***/ "./src/propTypes/highlightOnlyResultType.js":
/*!**************************************************!*\
  !*** ./src/propTypes/highlightOnlyResultType.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = highlightOnlyResultType;\n\nvar _warn = __webpack_require__(/*! ../utils/warn */ \"./src/utils/warn.js\");\n\nvar _warn2 = _interopRequireDefault(_warn);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction highlightOnlyResultType(props, propName, componentName) {\n  var allowNew = props.allowNew,\n      highlightOnlyResult = props.highlightOnlyResult;\n\n  (0, _warn2.default)(!(highlightOnlyResult && allowNew), '`highlightOnlyResult` will not work with `allowNew`.');\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/propTypes/highlightOnlyResultType.js?");

/***/ }),

/***/ "./src/propTypes/ignoreDiacriticsType.js":
/*!***********************************************!*\
  !*** ./src/propTypes/ignoreDiacriticsType.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = ignoreDiacriticsType;\n\nvar _warn = __webpack_require__(/*! ../utils/warn */ \"./src/utils/warn.js\");\n\nvar _warn2 = _interopRequireDefault(_warn);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction ignoreDiacriticsType(props, propName, componentName) {\n  var filterBy = props.filterBy,\n      ignoreDiacritics = props.ignoreDiacritics;\n\n  (0, _warn2.default)(ignoreDiacritics || typeof filterBy !== 'function', 'Your `filterBy` function will override the `ignoreDiacritics` prop.');\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/propTypes/ignoreDiacriticsType.js?");

/***/ }),

/***/ "./src/propTypes/index.js":
/*!********************************!*\
  !*** ./src/propTypes/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.optionType = exports.labelKeyType = exports.inputPropsType = exports.ignoreDiacriticsType = exports.highlightOnlyResultType = exports.defaultInputValueType = exports.checkPropType = exports.caseSensitiveType = undefined;\n\nvar _caseSensitiveType2 = __webpack_require__(/*! ./caseSensitiveType */ \"./src/propTypes/caseSensitiveType.js\");\n\nvar _caseSensitiveType3 = _interopRequireDefault(_caseSensitiveType2);\n\nvar _checkPropType2 = __webpack_require__(/*! ./checkPropType */ \"./src/propTypes/checkPropType.js\");\n\nvar _checkPropType3 = _interopRequireDefault(_checkPropType2);\n\nvar _defaultInputValueType2 = __webpack_require__(/*! ./defaultInputValueType */ \"./src/propTypes/defaultInputValueType.js\");\n\nvar _defaultInputValueType3 = _interopRequireDefault(_defaultInputValueType2);\n\nvar _highlightOnlyResultType2 = __webpack_require__(/*! ./highlightOnlyResultType */ \"./src/propTypes/highlightOnlyResultType.js\");\n\nvar _highlightOnlyResultType3 = _interopRequireDefault(_highlightOnlyResultType2);\n\nvar _ignoreDiacriticsType2 = __webpack_require__(/*! ./ignoreDiacriticsType */ \"./src/propTypes/ignoreDiacriticsType.js\");\n\nvar _ignoreDiacriticsType3 = _interopRequireDefault(_ignoreDiacriticsType2);\n\nvar _inputPropsType2 = __webpack_require__(/*! ./inputPropsType */ \"./src/propTypes/inputPropsType.js\");\n\nvar _inputPropsType3 = _interopRequireDefault(_inputPropsType2);\n\nvar _labelKeyType2 = __webpack_require__(/*! ./labelKeyType */ \"./src/propTypes/labelKeyType.js\");\n\nvar _labelKeyType3 = _interopRequireDefault(_labelKeyType2);\n\nvar _optionType2 = __webpack_require__(/*! ./optionType */ \"./src/propTypes/optionType.js\");\n\nvar _optionType3 = _interopRequireDefault(_optionType2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.caseSensitiveType = _caseSensitiveType3.default; /* eslint-disable object-curly-spacing */\n\nexports.checkPropType = _checkPropType3.default;\nexports.defaultInputValueType = _defaultInputValueType3.default;\nexports.highlightOnlyResultType = _highlightOnlyResultType3.default;\nexports.ignoreDiacriticsType = _ignoreDiacriticsType3.default;\nexports.inputPropsType = _inputPropsType3.default;\nexports.labelKeyType = _labelKeyType3.default;\nexports.optionType = _optionType3.default;\n/* eslint-enable object-curly-spacing */\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/propTypes/index.js?");

/***/ }),

/***/ "./src/propTypes/inputPropsType.js":
/*!*****************************************!*\
  !*** ./src/propTypes/inputPropsType.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = inputPropsType;\n\nvar _isPlainObject = __webpack_require__(/*! lodash/isPlainObject */ \"./node_modules/lodash/isPlainObject.js\");\n\nvar _isPlainObject2 = _interopRequireDefault(_isPlainObject);\n\nvar _warn = __webpack_require__(/*! ../utils/warn */ \"./src/utils/warn.js\");\n\nvar _warn2 = _interopRequireDefault(_warn);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar BLACKLIST = [{ alt: 'onBlur', prop: 'onBlur' }, { alt: 'onInputChange', prop: 'onChange' }, { alt: 'onFocus', prop: 'onFocus' }, { alt: 'onKeyDown', prop: 'onKeyDown' }];\n\nfunction inputPropsType(props, propName, componentName) {\n  var inputProps = props.inputProps;\n\n  if (!(inputProps && (0, _isPlainObject2.default)(inputProps))) {\n    return;\n  }\n\n  // Blacklisted properties.\n  BLACKLIST.forEach(function (_ref) {\n    var alt = _ref.alt,\n        prop = _ref.prop;\n\n    var msg = alt ? ' Use the top-level `' + alt + '` prop instead.' : null;\n    (0, _warn2.default)(!inputProps.hasOwnProperty(prop), 'The `' + prop + '` property of `inputProps` will be ignored.' + msg);\n  });\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/propTypes/inputPropsType.js?");

/***/ }),

/***/ "./src/propTypes/labelKeyType.js":
/*!***************************************!*\
  !*** ./src/propTypes/labelKeyType.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = labelKeyType;\n\nvar _warn = __webpack_require__(/*! ../utils/warn */ \"./src/utils/warn.js\");\n\nvar _warn2 = _interopRequireDefault(_warn);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction labelKeyType(props, propName, componentName) {\n  var allowNew = props.allowNew,\n      labelKey = props.labelKey;\n\n  (0, _warn2.default)(!(typeof labelKey === 'function' && allowNew), '`labelKey` must be a string when `allowNew={true}`.');\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/propTypes/labelKeyType.js?");

/***/ }),

/***/ "./src/propTypes/optionType.js":
/*!*************************************!*\
  !*** ./src/propTypes/optionType.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.default = _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.object.isRequired), _propTypes2.default.arrayOf(_propTypes2.default.string.isRequired)]);\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/propTypes/optionType.js?");

/***/ }),

/***/ "./src/utils/addCustomOption.js":
/*!**************************************!*\
  !*** ./src/utils/addCustomOption.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _index = __webpack_require__(/*! ./index */ \"./src/utils/index.js\");\n\nfunction addCustomOption(results, props) {\n  var allowNew = props.allowNew,\n      labelKey = props.labelKey,\n      text = props.text;\n\n\n  if (!allowNew || !text.trim()) {\n    return false;\n  }\n\n  // If the consumer has provided a callback, use that to determine whether or\n  // not to add the custom option.\n  if (typeof allowNew === 'function') {\n    return allowNew(results, props);\n  }\n\n  // By default, don't add the custom option if there is an exact text match\n  // with an existing option.\n  return !results.some(function (o) {\n    return (0, _index.getOptionLabel)(o, labelKey) === text;\n  });\n}\n\nexports.default = addCustomOption;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/addCustomOption.js?");

/***/ }),

/***/ "./src/utils/defaultFilterBy.js":
/*!**************************************!*\
  !*** ./src/utils/defaultFilterBy.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = defaultFilterBy;\n\nvar _isEqual = __webpack_require__(/*! lodash/isEqual */ \"./node_modules/lodash/isEqual.js\");\n\nvar _isEqual2 = _interopRequireDefault(_isEqual);\n\nvar _isFunction = __webpack_require__(/*! lodash/isFunction */ \"./node_modules/lodash/isFunction.js\");\n\nvar _isFunction2 = _interopRequireDefault(_isFunction);\n\nvar _isString = __webpack_require__(/*! lodash/isString */ \"./node_modules/lodash/isString.js\");\n\nvar _isString2 = _interopRequireDefault(_isString);\n\nvar _some = __webpack_require__(/*! lodash/some */ \"./node_modules/lodash/some.js\");\n\nvar _some2 = _interopRequireDefault(_some);\n\nvar _stripDiacritics = __webpack_require__(/*! ./stripDiacritics */ \"./src/utils/stripDiacritics.js\");\n\nvar _stripDiacritics2 = _interopRequireDefault(_stripDiacritics);\n\nvar _warn = __webpack_require__(/*! ./warn */ \"./src/utils/warn.js\");\n\nvar _warn2 = _interopRequireDefault(_warn);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction isMatch(input, string, props) {\n  if (!props.caseSensitive) {\n    input = input.toLowerCase();\n    string = string.toLowerCase();\n  }\n\n  if (props.ignoreDiacritics) {\n    input = (0, _stripDiacritics2.default)(input);\n    string = (0, _stripDiacritics2.default)(string);\n  }\n\n  return string.indexOf(input) !== -1;\n}\n\n/**\n * Default algorithm for filtering results.\n */\nfunction defaultFilterBy(option, props) {\n  var filterBy = props.filterBy,\n      labelKey = props.labelKey,\n      multiple = props.multiple,\n      selected = props.selected,\n      text = props.text;\n\n  // Don't show selected options in the menu for the multi-select case.\n\n  if (multiple && selected.some(function (o) {\n    return (0, _isEqual2.default)(o, option);\n  })) {\n    return false;\n  }\n\n  var fields = filterBy.slice();\n\n  if ((0, _isFunction2.default)(labelKey) && isMatch(text, labelKey(option), props)) {\n    return true;\n  }\n\n  if ((0, _isString2.default)(labelKey)) {\n    // Add the `labelKey` field to the list of fields if it isn't already there.\n    if (fields.indexOf(labelKey) === -1) {\n      fields.unshift(labelKey);\n    }\n  }\n\n  if ((0, _isString2.default)(option)) {\n    (0, _warn2.default)(fields.length <= 1, 'You cannot filter by properties when `option` is a string.');\n\n    return isMatch(text, option, props);\n  }\n\n  return (0, _some2.default)(fields, function (field) {\n    var value = option[field];\n\n    if (!(0, _isString2.default)(value)) {\n      (0, _warn2.default)(false, 'Fields passed to `filterBy` should have string values. Value will ' + 'be converted to a string; results may be unexpected.');\n\n      // Coerce to string since `toString` isn't null-safe.\n      value = value + '';\n    }\n\n    return isMatch(text, value, props);\n  });\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/defaultFilterBy.js?");

/***/ }),

/***/ "./src/utils/getAccessibilityStatus.js":
/*!*********************************************!*\
  !*** ./src/utils/getAccessibilityStatus.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nfunction getAccessibilityStatus(props) {\n  var a11yNumResults = props.a11yNumResults,\n      a11yNumSelected = props.a11yNumSelected,\n      emptyLabel = props.emptyLabel,\n      isMenuShown = props.isMenuShown,\n      results = props.results,\n      selected = props.selected;\n\n  // If the menu is hidden, display info about the number of selections.\n\n  if (!isMenuShown) {\n    return a11yNumSelected(selected);\n  }\n\n  // Display info about the number of matches.\n  if (results.length === 0) {\n    return emptyLabel;\n  }\n\n  return a11yNumResults(results);\n}\n\nexports.default = getAccessibilityStatus;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/getAccessibilityStatus.js?");

/***/ }),

/***/ "./src/utils/getDisplayName.js":
/*!*************************************!*\
  !*** ./src/utils/getDisplayName.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = getDisplayName;\nfunction getDisplayName(WrappedComponent) {\n  return WrappedComponent.displayName || WrappedComponent.name || 'Component';\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/getDisplayName.js?");

/***/ }),

/***/ "./src/utils/getHintText.js":
/*!**********************************!*\
  !*** ./src/utils/getHintText.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _getMatchBounds = __webpack_require__(/*! ./getMatchBounds */ \"./src/utils/getMatchBounds.js\");\n\nvar _getMatchBounds2 = _interopRequireDefault(_getMatchBounds);\n\nvar _getOptionLabel = __webpack_require__(/*! ./getOptionLabel */ \"./src/utils/getOptionLabel.js\");\n\nvar _getOptionLabel2 = _interopRequireDefault(_getOptionLabel);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction getHintText(_ref) {\n  var activeItem = _ref.activeItem,\n      initialItem = _ref.initialItem,\n      isMenuShown = _ref.isMenuShown,\n      labelKey = _ref.labelKey,\n      multiple = _ref.multiple,\n      selected = _ref.selected,\n      text = _ref.text;\n\n  // Don't display a hint under the following conditions:\n  if (\n  // No text entered.\n  !text ||\n  // The menu is hidden.\n  !isMenuShown ||\n  // No item in the menu.\n  !initialItem ||\n  // The initial item is a custom option.\n  initialItem.customOption ||\n  // One of the menu items is active.\n  activeItem ||\n  // There's already a selection in single-select mode.\n  !!selected.length && !multiple) {\n    return '';\n  }\n\n  var initialItemStr = (0, _getOptionLabel2.default)(initialItem, labelKey);\n  var bounds = (0, _getMatchBounds2.default)(initialItemStr.toLowerCase(), text.toLowerCase());\n\n  if (!(bounds && bounds.start === 0)) {\n    return '';\n  }\n\n  // Text matching is case- and accent-insensitive, so to display the hint\n  // correctly, splice the input string with the hint string.\n  return text + initialItemStr.slice(bounds.end, initialItemStr.length);\n}\n\nexports.default = getHintText;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/getHintText.js?");

/***/ }),

/***/ "./src/utils/getInputText.js":
/*!***********************************!*\
  !*** ./src/utils/getInputText.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _head = __webpack_require__(/*! lodash/head */ \"./node_modules/lodash/head.js\");\n\nvar _head2 = _interopRequireDefault(_head);\n\nvar _getOptionLabel = __webpack_require__(/*! ./getOptionLabel */ \"./src/utils/getOptionLabel.js\");\n\nvar _getOptionLabel2 = _interopRequireDefault(_getOptionLabel);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction getInputText(_ref) {\n  var activeItem = _ref.activeItem,\n      labelKey = _ref.labelKey,\n      multiple = _ref.multiple,\n      selected = _ref.selected,\n      text = _ref.text;\n\n  if (activeItem) {\n    // Display the input value if the pagination item is active.\n    return activeItem.paginationOption ? text : (0, _getOptionLabel2.default)(activeItem, labelKey);\n  }\n\n  var selectedItem = !multiple && !!selected.length && (0, _head2.default)(selected);\n  if (selectedItem) {\n    return (0, _getOptionLabel2.default)(selectedItem, labelKey);\n  }\n\n  return text;\n}\n\nexports.default = getInputText;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/getInputText.js?");

/***/ }),

/***/ "./src/utils/getMatchBounds.js":
/*!*************************************!*\
  !*** ./src/utils/getMatchBounds.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = getMatchBounds;\n\nvar _escapeStringRegexp = __webpack_require__(/*! escape-string-regexp */ \"./node_modules/escape-string-regexp/index.js\");\n\nvar _escapeStringRegexp2 = _interopRequireDefault(_escapeStringRegexp);\n\nvar _stripDiacritics = __webpack_require__(/*! ./stripDiacritics */ \"./src/utils/stripDiacritics.js\");\n\nvar _stripDiacritics2 = _interopRequireDefault(_stripDiacritics);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar CASE_INSENSITIVE = 'i';\nvar COMBINING_MARKS = /[\\u0300-\\u036F]/;\n\nfunction getMatchBounds(subject, search) {\n  search = new RegExp((0, _escapeStringRegexp2.default)((0, _stripDiacritics2.default)(search)), CASE_INSENSITIVE);\n\n  var matches = search.exec((0, _stripDiacritics2.default)(subject));\n\n  if (!matches) {\n    return null;\n  }\n\n  var start = matches.index;\n  var matchLength = matches[0].length;\n\n  // Account for combining marks, which changes the indices.\n  if (COMBINING_MARKS.test(subject)) {\n    // Starting at the beginning of the subject string, check for the number of\n    // combining marks and increment the start index whenever one is found.\n    for (var ii = 0; ii <= start; ii++) {\n      if (COMBINING_MARKS.test(subject[ii])) {\n        start++;\n      }\n    }\n\n    // Similarly, increment the length of the match string if it contains a\n    // combining mark.\n    for (var _ii = start; _ii <= start + matchLength; _ii++) {\n      if (COMBINING_MARKS.test(subject[_ii])) {\n        matchLength++;\n      }\n    }\n  }\n\n  return {\n    end: start + matchLength,\n    start: start\n  };\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/getMatchBounds.js?");

/***/ }),

/***/ "./src/utils/getMenuItemId.js":
/*!************************************!*\
  !*** ./src/utils/getMenuItemId.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = getMenuItemId;\nfunction getMenuItemId(position) {\n  return \"rbt-menu-item-\" + position;\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/getMenuItemId.js?");

/***/ }),

/***/ "./src/utils/getOptionLabel.js":
/*!*************************************!*\
  !*** ./src/utils/getOptionLabel.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _invariant = __webpack_require__(/*! invariant */ \"./node_modules/invariant/browser.js\");\n\nvar _invariant2 = _interopRequireDefault(_invariant);\n\nvar _isPlainObject = __webpack_require__(/*! lodash/isPlainObject */ \"./node_modules/lodash/isPlainObject.js\");\n\nvar _isPlainObject2 = _interopRequireDefault(_isPlainObject);\n\nvar _getStringLabelKey = __webpack_require__(/*! ./getStringLabelKey */ \"./src/utils/getStringLabelKey.js\");\n\nvar _getStringLabelKey2 = _interopRequireDefault(_getStringLabelKey);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Retrieves the display string from an option. Options can be the string\n * themselves, or an object with a defined display string. Anything else throws\n * an error.\n */\nfunction getOptionLabel(option, labelKey) {\n  if (option.paginationOption || option.customOption) {\n    return option[(0, _getStringLabelKey2.default)(labelKey)];\n  }\n\n  var optionLabel = void 0;\n\n  if (typeof option === 'string') {\n    optionLabel = option;\n  }\n\n  if (typeof labelKey === 'function') {\n    // This overwrites string options, but we assume the consumer wants to do\n    // something custom if `labelKey` is a function.\n    optionLabel = labelKey(option);\n  } else if (typeof labelKey === 'string' && (0, _isPlainObject2.default)(option)) {\n    optionLabel = option[labelKey];\n  }\n\n  !(typeof optionLabel === 'string') ?  true ? (0, _invariant2.default)(false, 'One or more options does not have a valid label string. Check the ' + '`labelKey` prop to ensure that it matches the correct option key and ' + 'provides a string for filtering and display.') : undefined : void 0;\n\n  return optionLabel;\n}\n\nexports.default = getOptionLabel;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/getOptionLabel.js?");

/***/ }),

/***/ "./src/utils/getStringLabelKey.js":
/*!****************************************!*\
  !*** ./src/utils/getStringLabelKey.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = getStringLabelKey;\n\nvar _defaultLabelKey = __webpack_require__(/*! ../constants/defaultLabelKey */ \"./src/constants/defaultLabelKey.js\");\n\nfunction getStringLabelKey(labelKey) {\n  return typeof labelKey === 'string' ? labelKey : _defaultLabelKey.DEFAULT_LABELKEY;\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/getStringLabelKey.js?");

/***/ }),

/***/ "./src/utils/getTruncatedOptions.js":
/*!******************************************!*\
  !*** ./src/utils/getTruncatedOptions.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/**\n * Truncates the result set based on `maxResults` and returns the new set.\n */\nfunction getTruncatedOptions(options, maxResults) {\n  if (!maxResults || maxResults >= options.length) {\n    return options;\n  }\n\n  return options.slice(0, maxResults);\n}\n\nexports.default = getTruncatedOptions;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/getTruncatedOptions.js?");

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.warn = exports.stripDiacritics = exports.scrollIntoViewIfNeeded = exports.preventInputBlur = exports.pluralize = exports.getTruncatedOptions = exports.getStringLabelKey = exports.getOptionLabel = exports.getMenuItemId = exports.getMatchBounds = exports.getInputText = exports.getHintText = exports.getDisplayName = exports.getAccessibilityStatus = exports.defaultFilterBy = exports.addCustomOption = undefined;\n\nvar _addCustomOption2 = __webpack_require__(/*! ./addCustomOption */ \"./src/utils/addCustomOption.js\");\n\nvar _addCustomOption3 = _interopRequireDefault(_addCustomOption2);\n\nvar _defaultFilterBy2 = __webpack_require__(/*! ./defaultFilterBy */ \"./src/utils/defaultFilterBy.js\");\n\nvar _defaultFilterBy3 = _interopRequireDefault(_defaultFilterBy2);\n\nvar _getAccessibilityStatus2 = __webpack_require__(/*! ./getAccessibilityStatus */ \"./src/utils/getAccessibilityStatus.js\");\n\nvar _getAccessibilityStatus3 = _interopRequireDefault(_getAccessibilityStatus2);\n\nvar _getDisplayName2 = __webpack_require__(/*! ./getDisplayName */ \"./src/utils/getDisplayName.js\");\n\nvar _getDisplayName3 = _interopRequireDefault(_getDisplayName2);\n\nvar _getHintText2 = __webpack_require__(/*! ./getHintText */ \"./src/utils/getHintText.js\");\n\nvar _getHintText3 = _interopRequireDefault(_getHintText2);\n\nvar _getInputText2 = __webpack_require__(/*! ./getInputText */ \"./src/utils/getInputText.js\");\n\nvar _getInputText3 = _interopRequireDefault(_getInputText2);\n\nvar _getMatchBounds2 = __webpack_require__(/*! ./getMatchBounds */ \"./src/utils/getMatchBounds.js\");\n\nvar _getMatchBounds3 = _interopRequireDefault(_getMatchBounds2);\n\nvar _getMenuItemId2 = __webpack_require__(/*! ./getMenuItemId */ \"./src/utils/getMenuItemId.js\");\n\nvar _getMenuItemId3 = _interopRequireDefault(_getMenuItemId2);\n\nvar _getOptionLabel2 = __webpack_require__(/*! ./getOptionLabel */ \"./src/utils/getOptionLabel.js\");\n\nvar _getOptionLabel3 = _interopRequireDefault(_getOptionLabel2);\n\nvar _getStringLabelKey2 = __webpack_require__(/*! ./getStringLabelKey */ \"./src/utils/getStringLabelKey.js\");\n\nvar _getStringLabelKey3 = _interopRequireDefault(_getStringLabelKey2);\n\nvar _getTruncatedOptions2 = __webpack_require__(/*! ./getTruncatedOptions */ \"./src/utils/getTruncatedOptions.js\");\n\nvar _getTruncatedOptions3 = _interopRequireDefault(_getTruncatedOptions2);\n\nvar _pluralize2 = __webpack_require__(/*! ./pluralize */ \"./src/utils/pluralize.js\");\n\nvar _pluralize3 = _interopRequireDefault(_pluralize2);\n\nvar _preventInputBlur2 = __webpack_require__(/*! ./preventInputBlur */ \"./src/utils/preventInputBlur.js\");\n\nvar _preventInputBlur3 = _interopRequireDefault(_preventInputBlur2);\n\nvar _scrollIntoViewIfNeeded2 = __webpack_require__(/*! ./scrollIntoViewIfNeeded */ \"./src/utils/scrollIntoViewIfNeeded.js\");\n\nvar _scrollIntoViewIfNeeded3 = _interopRequireDefault(_scrollIntoViewIfNeeded2);\n\nvar _stripDiacritics2 = __webpack_require__(/*! ./stripDiacritics */ \"./src/utils/stripDiacritics.js\");\n\nvar _stripDiacritics3 = _interopRequireDefault(_stripDiacritics2);\n\nvar _warn2 = __webpack_require__(/*! ./warn */ \"./src/utils/warn.js\");\n\nvar _warn3 = _interopRequireDefault(_warn2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.addCustomOption = _addCustomOption3.default; /* eslint-disable object-curly-spacing */\n\nexports.defaultFilterBy = _defaultFilterBy3.default;\nexports.getAccessibilityStatus = _getAccessibilityStatus3.default;\nexports.getDisplayName = _getDisplayName3.default;\nexports.getHintText = _getHintText3.default;\nexports.getInputText = _getInputText3.default;\nexports.getMatchBounds = _getMatchBounds3.default;\nexports.getMenuItemId = _getMenuItemId3.default;\nexports.getOptionLabel = _getOptionLabel3.default;\nexports.getStringLabelKey = _getStringLabelKey3.default;\nexports.getTruncatedOptions = _getTruncatedOptions3.default;\nexports.pluralize = _pluralize3.default;\nexports.preventInputBlur = _preventInputBlur3.default;\nexports.scrollIntoViewIfNeeded = _scrollIntoViewIfNeeded3.default;\nexports.stripDiacritics = _stripDiacritics3.default;\nexports.warn = _warn3.default;\n/* eslint-enable object-curly-spacing */\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/index.js?");

/***/ }),

/***/ "./src/utils/pluralize.js":
/*!********************************!*\
  !*** ./src/utils/pluralize.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = pluralize;\n/**\n * Basic util for pluralizing words. By default, simply adds an 's' to the word.\n * Also allows for a custom plural version.\n */\nfunction pluralize(text, count, plural) {\n  plural = plural || text + \"s\";\n  return count === 1 ? \"1 \" + text : count + \" \" + plural;\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/pluralize.js?");

/***/ }),

/***/ "./src/utils/preventInputBlur.js":
/*!***************************************!*\
  !*** ./src/utils/preventInputBlur.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = preventInputBlur;\n/**\n * Prevent the main input from blurring when a menu item or the clear button is\n * clicked. (#226 & #310)\n */\nfunction preventInputBlur(e) {\n  e.preventDefault();\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/preventInputBlur.js?");

/***/ }),

/***/ "./src/utils/scrollIntoViewIfNeeded.js":
/*!*********************************************!*\
  !*** ./src/utils/scrollIntoViewIfNeeded.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n/**\n * Partial polyfill for webkit `scrollIntoViewIfNeeded()` method. Addresses\n * vertical scrolling only.\n *\n * Inspired by https://gist.github.com/hsablonniere/2581101, but uses\n * `getBoundingClientRect`.\n */\nfunction scrollIntoViewIfNeeded(node) {\n  // Webkit browsers\n  if (Element.prototype.scrollIntoViewIfNeeded) {\n    node.scrollIntoViewIfNeeded();\n    return;\n  }\n\n  // FF, IE, etc.\n  var rect = node.getBoundingClientRect();\n  var parent = node.parentNode;\n  var parentRect = parent.getBoundingClientRect();\n\n  var parentComputedStyle = window.getComputedStyle(parent, null);\n  var parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width'));\n\n  if (rect.top < parentRect.top || rect.bottom > parentRect.bottom) {\n    parent.scrollTop = node.offsetTop - parent.offsetTop - parent.clientHeight / 2 - parentBorderTopWidth + node.clientHeight / 2;\n  }\n}\n\nexports.default = scrollIntoViewIfNeeded;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/scrollIntoViewIfNeeded.js?");

/***/ }),

/***/ "./src/utils/stripDiacritics.js":
/*!**************************************!*\
  !*** ./src/utils/stripDiacritics.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = stripDiacritics;\n/**\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n *\n * Taken from: http://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript/18391901#18391901\n */\n\n/* eslint-disable max-len */\nvar map = [{ 'base': 'A', 'letters': 'A\\u24B6\\uFF21\\xC0\\xC1\\xC2\\u1EA6\\u1EA4\\u1EAA\\u1EA8\\xC3\\u0100\\u0102\\u1EB0\\u1EAE\\u1EB4\\u1EB2\\u0226\\u01E0\\xC4\\u01DE\\u1EA2\\xC5\\u01FA\\u01CD\\u0200\\u0202\\u1EA0\\u1EAC\\u1EB6\\u1E00\\u0104\\u023A\\u2C6F' }, { 'base': 'AA', 'letters': '\\uA732' }, { 'base': 'AE', 'letters': '\\xC6\\u01FC\\u01E2' }, { 'base': 'AO', 'letters': '\\uA734' }, { 'base': 'AU', 'letters': '\\uA736' }, { 'base': 'AV', 'letters': '\\uA738\\uA73A' }, { 'base': 'AY', 'letters': '\\uA73C' }, { 'base': 'B', 'letters': 'B\\u24B7\\uFF22\\u1E02\\u1E04\\u1E06\\u0243\\u0182\\u0181' }, { 'base': 'C', 'letters': 'C\\u24B8\\uFF23\\u0106\\u0108\\u010A\\u010C\\xC7\\u1E08\\u0187\\u023B\\uA73E' }, { 'base': 'D', 'letters': 'D\\u24B9\\uFF24\\u1E0A\\u010E\\u1E0C\\u1E10\\u1E12\\u1E0E\\u0110\\u018B\\u018A\\u0189\\uA779\\xD0' }, { 'base': 'DZ', 'letters': '\\u01F1\\u01C4' }, { 'base': 'Dz', 'letters': '\\u01F2\\u01C5' }, { 'base': 'E', 'letters': 'E\\u24BA\\uFF25\\xC8\\xC9\\xCA\\u1EC0\\u1EBE\\u1EC4\\u1EC2\\u1EBC\\u0112\\u1E14\\u1E16\\u0114\\u0116\\xCB\\u1EBA\\u011A\\u0204\\u0206\\u1EB8\\u1EC6\\u0228\\u1E1C\\u0118\\u1E18\\u1E1A\\u0190\\u018E' }, { 'base': 'F', 'letters': 'F\\u24BB\\uFF26\\u1E1E\\u0191\\uA77B' }, { 'base': 'G', 'letters': 'G\\u24BC\\uFF27\\u01F4\\u011C\\u1E20\\u011E\\u0120\\u01E6\\u0122\\u01E4\\u0193\\uA7A0\\uA77D\\uA77E' }, { 'base': 'H', 'letters': 'H\\u24BD\\uFF28\\u0124\\u1E22\\u1E26\\u021E\\u1E24\\u1E28\\u1E2A\\u0126\\u2C67\\u2C75\\uA78D' }, { 'base': 'I', 'letters': 'I\\u24BE\\uFF29\\xCC\\xCD\\xCE\\u0128\\u012A\\u012C\\u0130\\xCF\\u1E2E\\u1EC8\\u01CF\\u0208\\u020A\\u1ECA\\u012E\\u1E2C\\u0197' }, { 'base': 'J', 'letters': 'J\\u24BF\\uFF2A\\u0134\\u0248' }, { 'base': 'K', 'letters': 'K\\u24C0\\uFF2B\\u1E30\\u01E8\\u1E32\\u0136\\u1E34\\u0198\\u2C69\\uA740\\uA742\\uA744\\uA7A2' }, { 'base': 'L', 'letters': 'L\\u24C1\\uFF2C\\u013F\\u0139\\u013D\\u1E36\\u1E38\\u013B\\u1E3C\\u1E3A\\u0141\\u023D\\u2C62\\u2C60\\uA748\\uA746\\uA780' }, { 'base': 'LJ', 'letters': '\\u01C7' }, { 'base': 'Lj', 'letters': '\\u01C8' }, { 'base': 'M', 'letters': 'M\\u24C2\\uFF2D\\u1E3E\\u1E40\\u1E42\\u2C6E\\u019C' }, { 'base': 'N', 'letters': 'N\\u24C3\\uFF2E\\u01F8\\u0143\\xD1\\u1E44\\u0147\\u1E46\\u0145\\u1E4A\\u1E48\\u0220\\u019D\\uA790\\uA7A4' }, { 'base': 'NJ', 'letters': '\\u01CA' }, { 'base': 'Nj', 'letters': '\\u01CB' }, { 'base': 'O', 'letters': 'O\\u24C4\\uFF2F\\xD2\\xD3\\xD4\\u1ED2\\u1ED0\\u1ED6\\u1ED4\\xD5\\u1E4C\\u022C\\u1E4E\\u014C\\u1E50\\u1E52\\u014E\\u022E\\u0230\\xD6\\u022A\\u1ECE\\u0150\\u01D1\\u020C\\u020E\\u01A0\\u1EDC\\u1EDA\\u1EE0\\u1EDE\\u1EE2\\u1ECC\\u1ED8\\u01EA\\u01EC\\xD8\\u01FE\\u0186\\u019F\\uA74A\\uA74C' }, { 'base': 'OI', 'letters': '\\u01A2' }, { 'base': 'OO', 'letters': '\\uA74E' }, { 'base': 'OU', 'letters': '\\u0222' }, { 'base': 'OE', 'letters': '\\x8C\\u0152' }, { 'base': 'oe', 'letters': '\\x9C\\u0153' }, { 'base': 'P', 'letters': 'P\\u24C5\\uFF30\\u1E54\\u1E56\\u01A4\\u2C63\\uA750\\uA752\\uA754' }, { 'base': 'Q', 'letters': 'Q\\u24C6\\uFF31\\uA756\\uA758\\u024A' }, { 'base': 'R', 'letters': 'R\\u24C7\\uFF32\\u0154\\u1E58\\u0158\\u0210\\u0212\\u1E5A\\u1E5C\\u0156\\u1E5E\\u024C\\u2C64\\uA75A\\uA7A6\\uA782' }, { 'base': 'S', 'letters': 'S\\u24C8\\uFF33\\u1E9E\\u015A\\u1E64\\u015C\\u1E60\\u0160\\u1E66\\u1E62\\u1E68\\u0218\\u015E\\u2C7E\\uA7A8\\uA784' }, { 'base': 'T', 'letters': 'T\\u24C9\\uFF34\\u1E6A\\u0164\\u1E6C\\u021A\\u0162\\u1E70\\u1E6E\\u0166\\u01AC\\u01AE\\u023E\\uA786' }, { 'base': 'TZ', 'letters': '\\uA728' }, { 'base': 'U', 'letters': 'U\\u24CA\\uFF35\\xD9\\xDA\\xDB\\u0168\\u1E78\\u016A\\u1E7A\\u016C\\xDC\\u01DB\\u01D7\\u01D5\\u01D9\\u1EE6\\u016E\\u0170\\u01D3\\u0214\\u0216\\u01AF\\u1EEA\\u1EE8\\u1EEE\\u1EEC\\u1EF0\\u1EE4\\u1E72\\u0172\\u1E76\\u1E74\\u0244' }, { 'base': 'V', 'letters': 'V\\u24CB\\uFF36\\u1E7C\\u1E7E\\u01B2\\uA75E\\u0245' }, { 'base': 'VY', 'letters': '\\uA760' }, { 'base': 'W', 'letters': 'W\\u24CC\\uFF37\\u1E80\\u1E82\\u0174\\u1E86\\u1E84\\u1E88\\u2C72' }, { 'base': 'X', 'letters': 'X\\u24CD\\uFF38\\u1E8A\\u1E8C' }, { 'base': 'Y', 'letters': 'Y\\u24CE\\uFF39\\u1EF2\\xDD\\u0176\\u1EF8\\u0232\\u1E8E\\u0178\\u1EF6\\u1EF4\\u01B3\\u024E\\u1EFE' }, { 'base': 'Z', 'letters': 'Z\\u24CF\\uFF3A\\u0179\\u1E90\\u017B\\u017D\\u1E92\\u1E94\\u01B5\\u0224\\u2C7F\\u2C6B\\uA762' }, { 'base': 'a', 'letters': 'a\\u24D0\\uFF41\\u1E9A\\xE0\\xE1\\xE2\\u1EA7\\u1EA5\\u1EAB\\u1EA9\\xE3\\u0101\\u0103\\u1EB1\\u1EAF\\u1EB5\\u1EB3\\u0227\\u01E1\\xE4\\u01DF\\u1EA3\\xE5\\u01FB\\u01CE\\u0201\\u0203\\u1EA1\\u1EAD\\u1EB7\\u1E01\\u0105\\u2C65\\u0250' }, { 'base': 'aa', 'letters': '\\uA733' }, { 'base': 'ae', 'letters': '\\xE6\\u01FD\\u01E3' }, { 'base': 'ao', 'letters': '\\uA735' }, { 'base': 'au', 'letters': '\\uA737' }, { 'base': 'av', 'letters': '\\uA739\\uA73B' }, { 'base': 'ay', 'letters': '\\uA73D' }, { 'base': 'b', 'letters': 'b\\u24D1\\uFF42\\u1E03\\u1E05\\u1E07\\u0180\\u0183\\u0253' }, { 'base': 'c', 'letters': 'c\\u24D2\\uFF43\\u0107\\u0109\\u010B\\u010D\\xE7\\u1E09\\u0188\\u023C\\uA73F\\u2184' }, { 'base': 'd', 'letters': 'd\\u24D3\\uFF44\\u1E0B\\u010F\\u1E0D\\u1E11\\u1E13\\u1E0F\\u0111\\u018C\\u0256\\u0257\\uA77A' }, { 'base': 'dz', 'letters': '\\u01F3\\u01C6' }, { 'base': 'e', 'letters': 'e\\u24D4\\uFF45\\xE8\\xE9\\xEA\\u1EC1\\u1EBF\\u1EC5\\u1EC3\\u1EBD\\u0113\\u1E15\\u1E17\\u0115\\u0117\\xEB\\u1EBB\\u011B\\u0205\\u0207\\u1EB9\\u1EC7\\u0229\\u1E1D\\u0119\\u1E19\\u1E1B\\u0247\\u025B\\u01DD' }, { 'base': 'f', 'letters': 'f\\u24D5\\uFF46\\u1E1F\\u0192\\uA77C' }, { 'base': 'g', 'letters': 'g\\u24D6\\uFF47\\u01F5\\u011D\\u1E21\\u011F\\u0121\\u01E7\\u0123\\u01E5\\u0260\\uA7A1\\u1D79\\uA77F' }, { 'base': 'h', 'letters': 'h\\u24D7\\uFF48\\u0125\\u1E23\\u1E27\\u021F\\u1E25\\u1E29\\u1E2B\\u1E96\\u0127\\u2C68\\u2C76\\u0265' }, { 'base': 'hv', 'letters': '\\u0195' }, { 'base': 'i', 'letters': 'i\\u24D8\\uFF49\\xEC\\xED\\xEE\\u0129\\u012B\\u012D\\xEF\\u1E2F\\u1EC9\\u01D0\\u0209\\u020B\\u1ECB\\u012F\\u1E2D\\u0268\\u0131' }, { 'base': 'j', 'letters': 'j\\u24D9\\uFF4A\\u0135\\u01F0\\u0249' }, { 'base': 'k', 'letters': 'k\\u24DA\\uFF4B\\u1E31\\u01E9\\u1E33\\u0137\\u1E35\\u0199\\u2C6A\\uA741\\uA743\\uA745\\uA7A3' }, { 'base': 'l', 'letters': 'l\\u24DB\\uFF4C\\u0140\\u013A\\u013E\\u1E37\\u1E39\\u013C\\u1E3D\\u1E3B\\u017F\\u0142\\u019A\\u026B\\u2C61\\uA749\\uA781\\uA747' }, { 'base': 'lj', 'letters': '\\u01C9' }, { 'base': 'm', 'letters': 'm\\u24DC\\uFF4D\\u1E3F\\u1E41\\u1E43\\u0271\\u026F' }, { 'base': 'n', 'letters': 'n\\u24DD\\uFF4E\\u01F9\\u0144\\xF1\\u1E45\\u0148\\u1E47\\u0146\\u1E4B\\u1E49\\u019E\\u0272\\u0149\\uA791\\uA7A5' }, { 'base': 'nj', 'letters': '\\u01CC' }, { 'base': 'o', 'letters': 'o\\u24DE\\uFF4F\\xF2\\xF3\\xF4\\u1ED3\\u1ED1\\u1ED7\\u1ED5\\xF5\\u1E4D\\u022D\\u1E4F\\u014D\\u1E51\\u1E53\\u014F\\u022F\\u0231\\xF6\\u022B\\u1ECF\\u0151\\u01D2\\u020D\\u020F\\u01A1\\u1EDD\\u1EDB\\u1EE1\\u1EDF\\u1EE3\\u1ECD\\u1ED9\\u01EB\\u01ED\\xF8\\u01FF\\u0254\\uA74B\\uA74D\\u0275' }, { 'base': 'oi', 'letters': '\\u01A3' }, { 'base': 'ou', 'letters': '\\u0223' }, { 'base': 'oo', 'letters': '\\uA74F' }, { 'base': 'p', 'letters': 'p\\u24DF\\uFF50\\u1E55\\u1E57\\u01A5\\u1D7D\\uA751\\uA753\\uA755' }, { 'base': 'q', 'letters': 'q\\u24E0\\uFF51\\u024B\\uA757\\uA759' }, { 'base': 'r', 'letters': 'r\\u24E1\\uFF52\\u0155\\u1E59\\u0159\\u0211\\u0213\\u1E5B\\u1E5D\\u0157\\u1E5F\\u024D\\u027D\\uA75B\\uA7A7\\uA783' }, { 'base': 's', 'letters': 's\\u24E2\\uFF53\\xDF\\u015B\\u1E65\\u015D\\u1E61\\u0161\\u1E67\\u1E63\\u1E69\\u0219\\u015F\\u023F\\uA7A9\\uA785\\u1E9B' }, { 'base': 't', 'letters': 't\\u24E3\\uFF54\\u1E6B\\u1E97\\u0165\\u1E6D\\u021B\\u0163\\u1E71\\u1E6F\\u0167\\u01AD\\u0288\\u2C66\\uA787' }, { 'base': 'tz', 'letters': '\\uA729' }, { 'base': 'u', 'letters': 'u\\u24E4\\uFF55\\xF9\\xFA\\xFB\\u0169\\u1E79\\u016B\\u1E7B\\u016D\\xFC\\u01DC\\u01D8\\u01D6\\u01DA\\u1EE7\\u016F\\u0171\\u01D4\\u0215\\u0217\\u01B0\\u1EEB\\u1EE9\\u1EEF\\u1EED\\u1EF1\\u1EE5\\u1E73\\u0173\\u1E77\\u1E75\\u0289' }, { 'base': 'v', 'letters': 'v\\u24E5\\uFF56\\u1E7D\\u1E7F\\u028B\\uA75F\\u028C' }, { 'base': 'vy', 'letters': '\\uA761' }, { 'base': 'w', 'letters': 'w\\u24E6\\uFF57\\u1E81\\u1E83\\u0175\\u1E87\\u1E85\\u1E98\\u1E89\\u2C73' }, { 'base': 'x', 'letters': 'x\\u24E7\\uFF58\\u1E8B\\u1E8D' }, { 'base': 'y', 'letters': 'y\\u24E8\\uFF59\\u1EF3\\xFD\\u0177\\u1EF9\\u0233\\u1E8F\\xFF\\u1EF7\\u1E99\\u1EF5\\u01B4\\u024F\\u1EFF' }, { 'base': 'z', 'letters': 'z\\u24E9\\uFF5A\\u017A\\u1E91\\u017C\\u017E\\u1E93\\u1E95\\u01B6\\u0225\\u0240\\u2C6C\\uA763' }];\n/* eslint-enable max-len */\n\nvar diacriticsMap = {};\nfor (var ii = 0; ii < map.length; ii++) {\n  var letters = map[ii].letters;\n  for (var jj = 0; jj < letters.length; jj++) {\n    diacriticsMap[letters[jj]] = map[ii].base;\n  }\n}\n\n// \"what?\" version ... http://jsperf.com/diacritics/12\nfunction stripDiacritics(str) {\n  return str.replace(/[\\u0300-\\u036F]/g, '') // Remove combining diacritics\n  /* eslint-disable-next-line no-control-regex */\n  .replace(/[^\\u0000-\\u007E]/g, function (a) {\n    return diacriticsMap[a] || a;\n  });\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/stripDiacritics.js?");

/***/ }),

/***/ "./src/utils/warn.js":
/*!***************************!*\
  !*** ./src/utils/warn.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = warn;\nexports._resetWarned = _resetWarned;\n\nvar _warning = __webpack_require__(/*! warning */ \"./node_modules/warning/warning.js\");\n\nvar _warning2 = _interopRequireDefault(_warning);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar warned = {}; /**\n                  * This code is copied from: https://github.com/ReactTraining/react-router/blob/master/modules/routerWarning.js\n                  */\n\nfunction warn(falseToWarn, message) {\n  // Only issue deprecation warnings once.\n  if (!falseToWarn && message.indexOf('deprecated') !== -1) {\n    if (warned[message]) {\n      return;\n    }\n    warned[message] = true;\n  }\n\n  message = '[react-bootstrap-typeahead] ' + message;\n\n  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    args[_key - 2] = arguments[_key];\n  }\n\n  _warning2.default.apply(undefined, [falseToWarn, message].concat(args));\n}\n\nfunction _resetWarned() {\n  warned = {};\n}\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/./src/utils/warn.js?");

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/external_%7B%22root%22:%22React%22,%22commonjs2%22:%22react%22,%22commonjs%22:%22react%22,%22amd%22:%22react%22%7D?");

/***/ }),

/***/ "react-dom":
/*!*****************************************************************************************************!*\
  !*** external {"root":"ReactDOM","commonjs2":"react-dom","commonjs":"react-dom","amd":"react-dom"} ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom__;\n\n//# sourceURL=webpack://ReactBootstrapTypeahead/external_%7B%22root%22:%22ReactDOM%22,%22commonjs2%22:%22react-dom%22,%22commonjs%22:%22react-dom%22,%22amd%22:%22react-dom%22%7D?");

/***/ })

/******/ });
});