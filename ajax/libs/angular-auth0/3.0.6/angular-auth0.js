/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_angular__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_auth0_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_auth0_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_auth0_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__version__ = __webpack_require__(3);




if (typeof __WEBPACK_IMPORTED_MODULE_0_angular___default.a !== 'object') {
  throw new Error('Angular must be loaded.');
}

if (!__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isObject(__WEBPACK_IMPORTED_MODULE_1_auth0_js___default.a)) {
  throw new Error('Auth0 must be loaded.');
}

__WEBPACK_IMPORTED_MODULE_0_angular___default.a.module('auth0.auth0', []).provider('angularAuth0', angularAuth0);

function angularAuth0() {
  this.init = function(config) {
    if (!config) {
      throw new Error('Client ID and Domain are required to initialize Auth0.js');
    }
    if (config._telemetryInfo) {
      config._telemetryInfo.env = __WEBPACK_IMPORTED_MODULE_0_angular___default.a.extend({}, this.config._telemetryInfo.env, {
        'angular-auth0': __WEBPACK_IMPORTED_MODULE_2__version__["a" /* default */]
      });
    } else {
      config._telemetryInfo = {
        name: 'angular-auth0',
        version: __WEBPACK_IMPORTED_MODULE_2__version__["a" /* default */],
        env: {
          'auth0-js': __WEBPACK_IMPORTED_MODULE_1_auth0_js___default.a.version.raw
        }
      }
    }
    this.config = config;
  };

  this.$get = [
    '$rootScope',
    function($rootScope) {
      var Auth0Js = new __WEBPACK_IMPORTED_MODULE_1_auth0_js___default.a.WebAuth(this.config);
      var webAuth = {};
      var functions = [];

      for (var i in Auth0Js) {
        if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isFunction(Auth0Js[i])) {
          functions.push(i);
        }
        if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isObject(Auth0Js[i])) {
          webAuth[i] = Auth0Js[i];
        }
      }

      function wrapArguments(parameters) {
        var lastIndex = parameters.length - 1,
          func = parameters[lastIndex];
        if (__WEBPACK_IMPORTED_MODULE_0_angular___default.a.isFunction(func)) {
          parameters[lastIndex] = function() {
            var args = arguments;
            $rootScope.$evalAsync(function() {
              func.apply(Auth0Js, args);
            });
          };
        }
        return parameters;
      }

      for (var i = 0; i < functions.length; i++) {
        webAuth[functions[i]] = (function(name) {
          var customFunction = function() {
            return Auth0Js[name].apply(Auth0Js, wrapArguments(arguments));
          };
          return customFunction;
        })(functions[i]);
      }

      return webAuth;
    }
  ];
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = angular;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = auth0;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("3.0.6");


/***/ })
/******/ ]);