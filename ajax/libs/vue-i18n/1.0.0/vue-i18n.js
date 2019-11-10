/**
 * vue-i18n v1.0.0
 * (c) 2015 kazuya kawaguchi
 * Released under the MIT License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["vue-i18n"] = factory();
	else
		root["vue-i18n"] = factory();
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
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Expose internationalization plugin
	 *
	 * @param {Object} Vue
	 * @param {Object} opts
	 */

	module.exports = function (Vue, opts) {
	  opts = opts || {}
	  var lang = opts.lang || 'en'
	  var locales = opts.locales || opts.resources || {}

	  // for Vue 0.11.4 later
	  try {
	    var path = Vue.parsers.path
	    Vue.prototype.$t = function (key) {
	      return key ? (path.get(locales[lang], key) || key) : ''
	    }
	  } catch (e) {
	    Vue.utils.warn('not support $t in this Vue version')
	  }

	  Vue.t = function (key) {
	    var ret = key || ''
	    var locale = locales[lang]
	    if (key && locale) {
	      var namespaces = key.split('.')
	      for (var i = 0; i < namespaces.length; i++) {
	        locale = locale[namespaces[i]]
	        if (!locale) {
	          ret = key
	          break
	        } else {
	          ret = locale
	        }
	      }
	    }
	    return ret
	  }

	  Vue.directive('t', {
	    isLiteral: true,
	    bind: function () {
	      if (this.el.nodeType !== 1) { return }

	      this.el.textContent = Vue.t(this.expression)
	    }
	  })
	}


/***/ }
/******/ ])
});
