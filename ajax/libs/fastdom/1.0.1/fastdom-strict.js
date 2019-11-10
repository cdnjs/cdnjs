(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fastdom"));
	else if(typeof define === 'function' && define.amd)
		define(["fastdom"], factory);
	else if(typeof exports === 'object')
		exports["fastdom"] = factory(require("fastdom"));
	else
		root["fastdom"] = factory(root["fastdom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var strictdom = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"strictdom\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var fastdom = __webpack_require__(1);

	/**
	 * Mini logger
	 *
	 * @return {Function}
	 */
	var debug = 0 ? console.log.bind(console, '[fastdom-strict]') : function() {};

	/**
	 * Enabled state
	 *
	 * @type {Boolean}
	 */
	var enabled = false;

	window.fastdom = module.exports = fastdom.extend({
	  measure: function(task, ctx) {
	    debug('measure');
	    return this.fastdom.measure(function() {
	      if (!enabled) return task();
	      return strictdom.phase('measure', task);
	    }, ctx);
	  },

	  mutate: function(task, ctx) {
	    debug('mutate');
	    return this.fastdom.mutate(function() {
	      if (!enabled) return task();
	      return strictdom.phase('mutate', task);
	    }, ctx);
	  },

	  strict: function(value) {
	    if (value) {
	      enabled = true;
	      strictdom.enable();
	    } else {
	      enabled = false;
	      strictdom.disable();
	    }
	  }
	});

	// turn on strict-mode
	window.fastdom.strict(true);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;