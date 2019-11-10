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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function dontGo() {
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
  var timeout = void 0;

  // Store the original favicon if it exists
  if (document.querySelectorAll('link[rel$="icon"]').length) {
    favicon = document.querySelector('link[rel$="icon"]');
    originalFavicon = favicon.getAttribute('href');
  }

  // Preload the alternative favicon
  if (opts.faviconSrc.length) {
    img = new Image(); // eslint-disable-line
    img.src = opts.faviconSrc;
  }

  var setHidden = function setHidden() {
    document.title = opts.title;
    if (opts.faviconSrc.length) {
      favicon.setAttribute('href', opts.faviconSrc);
    }
  };

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      if (opts.timeout > 0) {
        timeout = setTimeout(setHidden, opts.timeout);
      } else {
        setHidden();
      }
    } else {
      document.title = originalTitle;
      favicon.setAttribute('href', originalFavicon);
      clearTimeout(timeout);
    }
  });
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=dont-go.js.map