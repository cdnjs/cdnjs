/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: external "angular"
var external_angular_namespaceObject = angular;
var external_angular_default = /*#__PURE__*/__webpack_require__.n(external_angular_namespaceObject);
;// CONCATENATED MODULE: external "auth0"
var external_auth0_namespaceObject = auth0;
var external_auth0_default = /*#__PURE__*/__webpack_require__.n(external_auth0_namespaceObject);
;// CONCATENATED MODULE: ./src/version.js
/* harmony default export */ var version = ('3.1.0');
;// CONCATENATED MODULE: ./src/index.js




if (typeof (external_angular_default()) !== 'object') {
  throw new Error('Angular must be loaded.');
}

if (!external_angular_default().isObject((external_auth0_default()))) {
  throw new Error('Auth0 must be loaded.');
}

external_angular_default().module('auth0.auth0', []).provider('angularAuth0', angularAuth0);

function angularAuth0() {
  this.init = function(config) {
    if (!config) {
      throw new Error('Client ID and Domain are required to initialize Auth0.js');
    }
    if (config._telemetryInfo) {
      config._telemetryInfo.env = external_angular_default().extend({}, this.config._telemetryInfo.env, {
        'angular-auth0': version
      });
    } else {
      config._telemetryInfo = {
        name: 'angular-auth0',
        version: version,
        env: {
          'auth0-js': (external_auth0_default()).version.raw
        }
      }
    }
    this.config = config;
  };

  this.$get = [
    '$rootScope',
    function($rootScope) {
      var Auth0Js = new (external_auth0_default()).WebAuth(this.config);
      var webAuth = {};
      var functions = [];

      for (var i in Auth0Js) {
        if (external_angular_default().isFunction(Auth0Js[i])) {
          functions.push(i);
        }
        if (external_angular_default().isObject(Auth0Js[i])) {
          webAuth[i] = Auth0Js[i];
        }
      }

      function wrapArguments(parameters) {
        var lastIndex = parameters.length - 1,
          func = parameters[lastIndex];
        if (external_angular_default().isFunction(func)) {
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

/******/ })()
;