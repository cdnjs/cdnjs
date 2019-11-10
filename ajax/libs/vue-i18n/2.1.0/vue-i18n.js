/**
 * vue-i18n v2.1.0
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

	/**
	 * Import(s)
	 */

	var extend = __webpack_require__(1)


	/**
	 * Export(s)
	 */

	module.exports = plugin


	/**
	 * plugin
	 *
	 * @param {Object} Vue
	 * @param {Object} opts
	 */

	function plugin (Vue, opts) {
	  opts = opts || {}
	  var lang = opts.lang || 'en'
	  var locales = opts.locales || {}

	  defineConfig(Vue.config, lang)
	  extend(Vue, locales)
	}


	/**
	 * defineConfig
	 *
	 * This function define `lang` property to `Vue.config`.
	 *
	 * @param {Object} config
	 * @param {String} lang
	 * @private
	 */

	function defineConfig (config, lang) {
	  Object.defineProperty(config, 'lang', {
	    get: function () { return lang },
	    set: function (val) { lang = val }
	  })
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Import(s)
	 */

	var format = __webpack_require__(2)


	/**
	 * Export(s)
	 */

	module.exports = extend


	/**
	 * extend
	 *  
	 * @param {Vue} Vue
	 * @param {Object} locales
	 * @return {Vue}
	 */

	function extend (Vue, locales) {
	  var path = Vue.parsers.path
	  var util = Vue.util

	  function getVal (path, key, lang, args) {
	    var value = key
	    try {
	      var val = path.get(locales[lang], key) || locales[lang][key]
	      value = (args ? format(val, args) : val) || key
	    } catch (e) {
	      value = key
	    }
	    return value
	  }

	  Vue.prototype.$t = function (key) {
	    if (!key) { return '' }

	    var args = null
	    var language = Vue.config.lang
	    if (arguments.length === 2) {
	      if (util.isObject(arguments[1]) || util.isArray(arguments[1])) {
	        args = arguments[1]
	      } else if (typeof arguments[1] === 'string') {
	        language = arguments[1]
	      }
	    } else if (arguments.length === 3) {
	      if (typeof arguments[1] === 'string') {
	        language = arguments[1]
	      }
	      if (util.isObject(arguments[2]) || util.isArray(arguments[2])) {
	        args = arguments[2]
	      }
	    }

	    return getVal(path, key, language, args)
	  }

	  return Vue
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 *  String format template
	 *  - Inspired:  
	 *    https://github.com/Matt-Esch/string-template/index.js
	 */

	/**
	 * Import(s)
	 */

	var slice = Array.prototype.slice


	/**
	 * Constant(s)
	 */

	var RE_NARGS = /\{([0-9a-zA-Z]+)\}/g


	/**
	 * Export(s)
	 */

	module.exports = template 


	/**
	 * template
	 *  
	 * @param {String} string
	 * @return {String}
	 */

	function template (string) {
	  var args

	  if (arguments.length === 2 && typeof arguments[1] === 'object') {
	    args = arguments[1]
	  } else {
	    args = slice.call(arguments, 1)
	  }

	  if (!args || !args.hasOwnProperty) {
	    args = {}
	  }

	  return string.replace(RE_NARGS, function (match, i, index) {
	    var result

	    if (string[index - 1] === '{' &&
	      string[index + match.length] === '}') {
	      return i
	    } else {
	      result = args.hasOwnProperty(i) ? args[i] : null
	      if (result === null || result === undefined) {
	        return ''
	      }

	      return result
	    }
	  })
	}


/***/ }
/******/ ])
});
;