(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("dontGo", [], factory);
	else if(typeof exports === 'object')
		exports["dontGo"] = factory();
	else
		root["dontGo"] = factory();
})(this, function() {
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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = dontGo;
	function dontGo() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  var defaults = {
	    title: 'Don\'t go!',
	    faviconSrc: '',
	    timeout: 0
	  };
	
	  var opts = Object.assign(defaults, options);
	  var originalTitle = document.title;
	  var favicon = void 0;
	  var originalFavicon = void 0;
	  var img = void 0;
	
	  // Store the original favicon if it exists
	  if (document.querySelectorAll('link[rel$="icon"]').length) {
	    favicon = document.querySelectorAll('link[rel$="icon"]')[0];
	    originalFavicon = favicon.getAttribute('href');
	  }
	
	  // Preload the alternative favicon
	  if (opts.faviconSrc.length) {
	    img = new Image();
	    img.src = opts.faviconSrc;
	  }
	
	  document.addEventListener("visibilitychange", function () {
	    // Make sure we ignore timeout when coming back
	    if (document.visibilityState == 'hidden' && opts.timeout > 0) {
	      setTimeout(onChange, opts.timeout);
	    } else {
	      onChange();
	    }
	  });
	
	  var onChange = function onChange() {
	    // Change the title
	    document.title = document.hidden ? opts.title : originalTitle;
	
	    // Change favicon if enabled
	    if (opts.faviconSrc.length) {
	      favicon.setAttribute('href', document.hidden ? opts.faviconSrc : originalFavicon);
	    }
	  };
	}
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=dont-go.js.map