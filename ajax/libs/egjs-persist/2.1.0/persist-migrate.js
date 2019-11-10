/*!
 * Copyright (c) 2017 NAVER Corp.
 * @egjs/persist project is licensed under the MIT license
 * 
 * @egjs/persist JavaScript library
 * 
 * 
 * @version 2.1.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Persist", [], factory);
	else if(typeof exports === 'object')
		exports["Persist"] = factory();
	else
		root["eg"] = root["eg"] || {}, root["eg"]["Persist"] = factory();
})(this, function() {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var win = typeof window !== "undefined" && window || {};

exports.window = win;
var console = exports.console = win.console;
var document = exports.document = win.document;
var history = exports.history = win.history;
var localStorage = exports.localStorage = win.localStorage;
var location = exports.location = win.location;
var sessionStorage = exports.sessionStorage = win.sessionStorage;
var navigator = exports.navigator = win.navigator;
var JSON = exports.JSON = win.JSON;
var RegExp = exports.RegExp = win.RegExp;
var parseFloat = exports.parseFloat = win.parseFloat;
var performance = exports.performance = win.performance;

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _browser = __webpack_require__(0);

exports["default"] = function (eg) {
	if (!eg || !eg.Persist) {
		return;
	}

	var GLOBAL_KEY = "KEY___persist___";
	var oldConstructor = eg.Persist.prototype;
	var isNeeded = eg.Persist.isNeeded;
	var StorageManager = eg.Persist.StorageManager;

	eg.Persist = function Persist(key, value) {
		// when called as plain method
		if (!(this instanceof Persist)) {
			if (arguments.length === 0) {
				return StorageManager.getStateByKey(GLOBAL_KEY);
			}

			if (arguments.length === 1 && typeof key !== "string") {
				var value_ = key;

				StorageManager.setStateByKey(GLOBAL_KEY, value_);
				return undefined;
			}

			if (arguments.length === 2) {
				StorageManager.setStateByKey(key, value);
			}

			return StorageManager.getStateByKey(key);
		}

		// when called as constructer
		this.key = key;
		return undefined;
	};
	eg.Persist.isNeeded = isNeeded;
	eg.Persist.prototype = oldConstructor;
	return eg.Persist;
}(_browser.window.eg);

/* eslint-enable */
/* eslint-disable */


module.exports = exports["default"];

/***/ })

/******/ });
});