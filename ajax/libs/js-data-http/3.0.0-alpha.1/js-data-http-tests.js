(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("chai"));
	else if(typeof define === 'function' && define.amd)
		define(["chai"], factory);
	else if(typeof exports === 'object')
		exports["DSHttpAdapter"] = factory(require("chai"));
	else
		root["DSHttpAdapter"] = factory(root["chai"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TYPES_EXCEPT_FUNCTION = exports.TYPES_EXCEPT_BOOLEAN = exports.TYPES_EXCEPT_OBJECT = exports.TYPES_EXCEPT_NUMBER = exports.TYPES_EXCEPT_STRING_OR_ARRAY_OR_NUMBER = exports.TYPES_EXCEPT_ARRAY = exports.TYPES_EXCEPT_STRING_OR_NUMBER_OBJECT = exports.TYPES_EXCEPT_STRING_OR_OBJECT = exports.TYPES_EXCEPT_STRING_OR_NUMBER = exports.TYPES_EXCEPT_STRING_OR_ARRAY = exports.TYPES_EXCEPT_STRING = undefined;
	exports.init = init;
	
	var _chai = __webpack_require__(1);
	
	_chai.assert.objectsEqual = function (a, b, msg) {
	  _chai.assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)), msg || 'Expected objects or arrays to be equal');
	}; /* global JSData:true */
	
	_chai.assert.fail = function (msg) {
	  _chai.assert.equal('should not reach this!: ' + msg, 'failure');
	};
	
	function init() {
	  describe('DSHttpAdapter', function () {
	    it('has all the right exports', function () {
	      _chai.assert.isFunction(DSHttpAdapter.addAction, 'has the addAction decorator');
	      _chai.assert.isFunction(DSHttpAdapter.addActions, 'has the addActions decorator');
	      _chai.assert.isObject(DSHttpAdapter.version, 'has a version');
	    });
	  });
	}
	
	var TYPES_EXCEPT_STRING = exports.TYPES_EXCEPT_STRING = [123, 123.123, null, undefined, {}, [], true, false, function () {}];
	var TYPES_EXCEPT_STRING_OR_ARRAY = exports.TYPES_EXCEPT_STRING_OR_ARRAY = [123, 123.123, null, undefined, {}, true, false, function () {}];
	var TYPES_EXCEPT_STRING_OR_NUMBER = exports.TYPES_EXCEPT_STRING_OR_NUMBER = [null, undefined, {}, [], true, false, function () {}];
	var TYPES_EXCEPT_STRING_OR_OBJECT = exports.TYPES_EXCEPT_STRING_OR_OBJECT = [123, 123.123, null, undefined, [], true, false, function () {}];
	var TYPES_EXCEPT_STRING_OR_NUMBER_OBJECT = exports.TYPES_EXCEPT_STRING_OR_NUMBER_OBJECT = [null, undefined, [], true, false, function () {}];
	var TYPES_EXCEPT_ARRAY = exports.TYPES_EXCEPT_ARRAY = ['string', 123, 123.123, null, undefined, {}, true, false, function () {}];
	var TYPES_EXCEPT_STRING_OR_ARRAY_OR_NUMBER = exports.TYPES_EXCEPT_STRING_OR_ARRAY_OR_NUMBER = [null, undefined, {}, true, false, function () {}];
	var TYPES_EXCEPT_NUMBER = exports.TYPES_EXCEPT_NUMBER = ['string', null, undefined, {}, [], true, false, function () {}];
	var TYPES_EXCEPT_OBJECT = exports.TYPES_EXCEPT_OBJECT = ['string', 123, 123.123, null, undefined, true, false, function () {}];
	var TYPES_EXCEPT_BOOLEAN = exports.TYPES_EXCEPT_BOOLEAN = ['string', 123, 123.123, null, undefined, {}, [], function () {}];
	var TYPES_EXCEPT_FUNCTION = exports.TYPES_EXCEPT_FUNCTION = ['string', 123, 123.123, null, undefined, {}, [], true, false];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-data-http-tests.js.map