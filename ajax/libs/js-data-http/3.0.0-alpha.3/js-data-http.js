/*!
* js-data-http
* @version 3.0.0-alpha.3 - Homepage <http://www.js-data.io/docs/dshttpadapter>
* @author Jason Dobry <jason.dobry@gmail.com>
* @copyright (c) 2014-2016 Jason Dobry
* @license MIT <https://github.com/js-data/js-data-http/blob/master/LICENSE>
*
* @overview HTTP (XHR) adapter for js-data in the browser.
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("js-data"));
	else if(typeof define === 'function' && define.amd)
		define(["js-data"], factory);
	else if(typeof exports === 'object')
		exports["DSHttpAdapter"] = factory(require("js-data"));
	else
		root["DSHttpAdapter"] = factory(root["JSData"]);
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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _jsData = __webpack_require__(1);
	
	/* global fetch:true Headers:true Request:true */
	var axios = __webpack_require__(2);
	var _ = _jsData.utils._;
	var copy = _jsData.utils.copy;
	var deepMixIn = _jsData.utils.deepMixIn;
	var extend = _jsData.utils.extend;
	var fillIn = _jsData.utils.fillIn;
	var forOwn = _jsData.utils.forOwn;
	var isArray = _jsData.utils.isArray;
	var isFunction = _jsData.utils.isFunction;
	var isNumber = _jsData.utils.isNumber;
	var isObject = _jsData.utils.isObject;
	var isSorN = _jsData.utils.isSorN;
	var isString = _jsData.utils.isString;
	var resolve = _jsData.utils.resolve;
	var reject = _jsData.utils.reject;
	var toJson = _jsData.utils.toJson;
	
	var hasFetch = false;
	
	try {
	  hasFetch = window && window.fetch;
	} catch (e) {}
	
	function isValidString(value) {
	  return value != null && value !== '';
	}
	function join(items, separator) {
	  separator || (separator = '');
	  return items.filter(isValidString).join(separator);
	}
	function makePath() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }
	
	  var result = join(args, '/');
	  return result.replace(/([^:\/]|^)\/{2,}/g, '$1/');
	}
	
	function encode(val) {
	  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
	}
	
	function buildUrl(url, params) {
	  if (!params) {
	    return url;
	  }
	
	  var parts = [];
	
	  forOwn(params, function (val, key) {
	    if (val === null || typeof val === 'undefined') {
	      return;
	    }
	    if (!isArray(val)) {
	      val = [val];
	    }
	
	    val.forEach(function (v) {
	      if (window.toString.call(v) === '[object Date]') {
	        v = v.toISOString();
	      } else if (isObject(v)) {
	        v = toJson(v);
	      }
	      parts.push(encode(key) + '=' + encode(v));
	    });
	  });
	
	  if (parts.length > 0) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
	  }
	
	  return url;
	}
	
	/**
	 * DSHttpAdapter class.
	 * @class DSHttpAdapter
	 * @alias DSHttpAdapter
	 *
	 * @param {Object} [opts] Configuration options.
	 * @param {string} [opts.basePath='']
	 * @param {boolean} [opts.debug=false]
	 * @param {boolean} [opts.forceTrailingSlash=false]
	 * @param {Object} [opts.http=axios]
	 * @param {Object} [opts.httpConfig={}]
	 * @param {string} [opts.suffix='']
	 * @param {boolean} [opts.useFetch=false]
	 */
	function DSHttpAdapter(opts) {
	  var self = this;
	
	  // Default values for arguments
	  opts || (opts = {});
	
	  // Default and user-defined settings
	  /**
	   * @name DSHttpAdapter#basePath
	   * @type {string}
	   */
	  self.basePath = opts.basePath === undefined ? '' : opts.basePath;
	
	  /**
	   * @name DSHttpAdapter#debug
	   * @type {boolean}
	   * @default false
	   */
	  self.debug = opts.debug === undefined ? false : opts.debug;
	
	  /**
	   * @name DSHttpAdapter#forceTrailingSlash
	   * @type {boolean}
	   * @default false
	   */
	  self.forceTrailingSlash = opts.forceTrailingSlash === undefined ? false : opts.forceTrailingSlash;
	
	  /**
	   * @name DSHttpAdapter#http
	   * @type {Function}
	   */
	  self.http = opts.http === undefined ? axios : opts.http;
	
	  /**
	   * @name DSHttpAdapter#httpConfig
	   * @type {Object}
	   */
	  self.httpConfig = opts.httpConfig === undefined ? {} : opts.httpConfig;
	
	  /**
	   * @name DSHttpAdapter#suffix
	   * @type {string}
	   */
	  self.suffix = opts.suffix === undefined ? '' : opts.suffix;
	
	  /**
	   * @name DSHttpAdapter#useFetch
	   * @type {boolean}
	   * @default false
	   */
	  self.useFetch = opts.useFetch === undefined ? false : opts.useFetch;
	}
	
	fillIn(DSHttpAdapter.prototype, {
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#create}. If this method
	   * returns a promise then {@link DSHttpAdapter#create} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#create}
	   * will resolve with that same value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#create}.
	   * @param {Object} props The `props` argument passed to {@link DSHttpAdapter#create}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#create}.
	   * @param {Object} data The `data` value that {@link DSHttpAdapter#create} will return.
	   */
	
	  afterCreate: function afterCreate() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#createMany}. If this method
	   * returns a promise then {@link DSHttpAdapter#createMany} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#createMany}
	   * will resolve with that same value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#createMany}.
	   * @param {Object} models The `models` argument passed to {@link DSHttpAdapter#createMany}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#createMany}.
	   * @param {Object} data The `data` value that {@link DSHttpAdapter#createMany} will return.
	   */
	  afterCreateMany: function afterCreateMany() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#DEL}. If this method
	   * returns a promise then {@link DSHttpAdapter#DEL} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#DEL}
	   * will resolve with that same value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {string} url The `url` argument passed to {@link DSHttpAdapter#DEL}.
	   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#DEL}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#DEL}.
	   * @param {Object} response The `response` value that {@link DSHttpAdapter#DEL} will return.
	   */
	  afterDEL: function afterDEL() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#destroy}. If this method
	   * returns a promise then {@link DSHttpAdapter#destroy} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#destroy}
	   * will resolve with that same value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#destroy}.
	   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#destroy}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#destroy}.
	   * @param {Object} data The `data` value that {@link DSHttpAdapter#destroy} will return.
	   */
	  afterDestroy: function afterDestroy() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#destroyAll}. If this method
	   * returns a promise then {@link DSHttpAdapter#destroyAll} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#destroyAll}
	   * will resolve with that same value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#destroyAll}.
	   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#destroyAll}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#destroyAll}.
	   * @param {Object} data The `data` value that {@link DSHttpAdapter#destroyAll} will return.
	   */
	  afterDestroyAll: function afterDestroyAll() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#find}. If this method
	   * returns a promise then {@link DSHttpAdapter#find} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#find}
	   * will resolve with that same value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#find}.
	   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#find}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#find}.
	   * @param {Object} data The `data` value that {@link DSHttpAdapter#find} will return.
	   */
	  afterFind: function afterFind() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#findAll}. If this method
	   * returns a promise then {@link DSHttpAdapter#findAll} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#findAll}
	   * will resolve with that same value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#findAll}.
	   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#findAll}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#findAll}.
	   * @param {Object} data The `data` value that {@link DSHttpAdapter#findAll} will return.
	   */
	  afterFindAll: function afterFindAll() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#GET}. If this method
	   * returns a promise then {@link DSHttpAdapter#GET} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#GET}
	   * will resolve with that same value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {string} url The `url` argument passed to {@link DSHttpAdapter#GET}.
	   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#GET}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#GET}.
	   * @param {Object} response The `response` value that {@link DSHttpAdapter#GET} will return.
	   */
	  afterGET: function afterGET() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#HTTP}. If this method
	   * returns a promise then {@link DSHttpAdapter#HTTP} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#HTTP}
	   * will resolve with that same value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#HTTP}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#HTTP}.
	   * @param {Object} response The `response` value that {@link DSHttpAdapter#HTTP} will return.
	   */
	  afterHTTP: function afterHTTP() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#POST}. If this method
	   * returns a promise then {@link DSHttpAdapter#POST} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#POST}
	   * will resolve with that same value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {string} url The `url` argument passed to {@link DSHttpAdapter#POST}.
	   * @param {Object} data The `data` argument passed to {@link DSHttpAdapter#POST}.
	   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#POST}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#POST}.
	   * @param {Object} response The `response` value that {@link DSHttpAdapter#POST} will return.
	   */
	  afterPOST: function afterPOST() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#PUT}. If this method
	   * returns a promise then {@link DSHttpAdapter#PUT} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#PUT}
	   * will resolve with that same value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {string} url The `url` argument passed to {@link DSHttpAdapter#PUT}.
	   * @param {Object} data The `data` argument passed to {@link DSHttpAdapter#PUT}.
	   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#PUT}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#PUT}.
	   * @param {Object} response The `response` value that {@link DSHttpAdapter#PUT} will return.
	   */
	  afterPUT: function afterPUT() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#update}. If this method
	   * returns a promise then {@link DSHttpAdapter#update} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#update}
	   * will resolve with that same value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#update}.
	   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#update}.
	   * @param {Object} props The `props` argument passed to {@link DSHttpAdapter#update}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#update}.
	   * @param {Object} data The `data` value that {@link DSHttpAdapter#update} will return.
	   */
	  afterUpdate: function afterUpdate() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#updateAll}. If this method
	   * returns a promise then {@link DSHttpAdapter#updateAll} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#updateAll}
	   * will resolve with that same value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#updateAll}.
	   * @param {Object} props The `props` argument passed to {@link DSHttpAdapter#updateAll}.
	   * @param {Object} query The `query` argument passed to {@link DSHttpAdapter#updateAll}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#updateAll}.
	   * @param {Object} data The `data` value that {@link DSHttpAdapter#updateAll} will return.
	   */
	  afterUpdateAll: function afterUpdateAll() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#updateMany}. If this method
	   * returns a promise then {@link DSHttpAdapter#updateMany} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#updateMany}
	   * will resolve with that same value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#updateMany}.
	   * @param {Object} models The `models` argument passed to {@link DSHttpAdapter#updateMany}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#updateMany}.
	   * @param {Object} data The `data` value that {@link DSHttpAdapter#updateMany} will return.
	   */
	  afterUpdateMany: function afterUpdateMany() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#create}. If this method
	   * returns a promise then {@link DSHttpAdapter#create} will wait for the
	   * promise to resolve before continuing.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#create}.
	   * @param {Object} props The `props` argument passed to {@link DSHttpAdapter#create}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#create}.
	   */
	  beforeCreate: function beforeCreate() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#createMany}. If this method
	   * returns a promise then {@link DSHttpAdapter#createMany} will wait for the
	   * promise to resolve before continuing.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#createMany}.
	   * @param {Object} models The `models` argument passed to {@link DSHttpAdapter#createMany}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#createMany}.
	   */
	  beforeCreateMany: function beforeCreateMany() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#DEL}. If this method
	   * returns a promise then {@link DSHttpAdapter#DEL} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#create}
	   * will resolve with that same value, then the `config` argument passed to
	   * {@link DSHttpAdapter#DEL} will be replaced by the value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} url The `url` argument passed to {@link DSHttpAdapter#DEL}.
	   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#DEL}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#DEL}.
	   */
	  beforeDEL: function beforeDEL() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#destroy}. If this method
	   * returns a promise then {@link DSHttpAdapter#destroy} will wait for the
	   * promise to resolve before continuing.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#destroy}.
	   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#destroy}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#destroy}.
	   */
	  beforeDestroy: function beforeDestroy() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#destroyAll}. If this method
	   * returns a promise then {@link DSHttpAdapter#destroyAll} will wait for the
	   * promise to resolve before continuing.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#destroyAll}.
	   * @param {Object} query The `query` argument passed to {@link DSHttpAdapter#destroyAll}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#destroyAll}.
	   */
	  beforeDestroyAll: function beforeDestroyAll() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#find}. If this method
	   * returns a promise then {@link DSHttpAdapter#find} will wait for the
	   * promise to resolve before continuing.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#find}.
	   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#find}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#find}.
	   */
	  beforeFind: function beforeFind() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#findAll}. If this method
	   * returns a promise then {@link DSHttpAdapter#findAll} will wait for the
	   * promise to resolve before continuing.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#findAll}.
	   * @param {Object} query The `query` argument passed to {@link DSHttpAdapter#findAll}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#findAll}.
	   */
	  beforeFindAll: function beforeFindAll() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#GET}. If this method
	   * returns a promise then {@link DSHttpAdapter#GET} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#create}
	   * will resolve with that same value, then the `config` argument passed to
	   * {@link DSHttpAdapter#GET} will be replaced by the value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} url The `url` argument passed to {@link DSHttpAdapter#GET}.
	   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#GET}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#GET}.
	   */
	  beforeGET: function beforeGET() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#HTTP}. If this method
	   * returns a promise then {@link DSHttpAdapter#HTTP} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#create}
	   * will resolve with that same value, then the `config` argument passed to
	   * {@link DSHttpAdapter#HTTP} will be replaced by the value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#HTTP}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#HTTP}.
	   */
	  beforeHTTP: function beforeHTTP() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#POST}. If this method
	   * returns a promise then {@link DSHttpAdapter#POST} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#create}
	   * will resolve with that same value, then the `config` argument passed to
	   * {@link DSHttpAdapter#POST} will be replaced by the value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} url The `url` argument passed to {@link DSHttpAdapter#POST}.
	   * @param {Object} data The `data` argument passed to {@link DSHttpAdapter#POST}.
	   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#POST}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#POST}.
	   */
	  beforePOST: function beforePOST() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#PUT}. If this method
	   * returns a promise then {@link DSHttpAdapter#PUT} will wait for the
	   * promise to resolve before continuing. If this method returns any other
	   * value or the promise resolves with a value, then {@link DSHttpAdapter#create}
	   * will resolve with that same value, then the `config` argument passed to
	   * {@link DSHttpAdapter#PUT} will be replaced by the value.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} url The `url` argument passed to {@link DSHttpAdapter#PUT}.
	   * @param {Object} data The `data` argument passed to {@link DSHttpAdapter#PUT}.
	   * @param {Object} config The `config` argument passed to {@link DSHttpAdapter#PUT}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#PUT}.
	   */
	  beforePUT: function beforePUT() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#update}. If this method
	   * returns a promise then {@link DSHttpAdapter#update} will wait for the
	   * promise to resolve before continuing.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#update}.
	   * @param {(string|number)} id The `id` argument passed to {@link DSHttpAdapter#update}.
	   * @param {Object} props The `props` argument passed to {@link DSHttpAdapter#update}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#update}.
	   */
	  beforeUpdate: function beforeUpdate() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#updateAll}. If this method
	   * returns a promise then {@link DSHttpAdapter#updateAll} will wait for the
	   * promise to resolve before continuing.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#updateAll}.
	   * @param {Object} props The `props` argument passed to {@link DSHttpAdapter#updateAll}.
	   * @param {Object} query The `query` argument passed to {@link DSHttpAdapter#updateAll}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#updateAll}.
	   */
	  beforeUpdateAll: function beforeUpdateAll() {},
	
	  /**
	   * Lifecycle hook called by {@link DSHttpAdapter#updateMany}. If this method
	   * returns a promise then {@link DSHttpAdapter#updateMany} will wait for the
	   * promise to resolve before continuing.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The `Model` argument passed to {@link DSHttpAdapter#updateMany}.
	   * @param {Object} models The `models` argument passed to {@link DSHttpAdapter#updateMany}.
	   * @param {Object} opts The `opts` argument passed to {@link DSHttpAdapter#updateMany}.
	   */
	  beforeUpdateMany: function beforeUpdateMany() {},
	
	  /**
	   * Create a new the entity from the provided `props`.
	   *
	   * {@link DSHttpAdapter#beforeCreate} will be called before calling
	   * {@link DSHttpAdapter#POST}.
	   * {@link DSHttpAdapter#afterCreate} will be called after calling
	   * {@link DSHttpAdapter#POST}.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The Model.
	   * @param {Object} props Properties to send as the payload.
	   * @param {Object} [opts] Configuration options.
	   * @param {string} [opts.params] TODO
	   * @param {string} [opts.suffix={@link DSHttpAdapter#suffix}] TODO
	   * @return {Promise}
	   */
	  create: function create(Model, props, opts) {
	    var self = this;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    opts.suffix || (opts.suffix = Model.suffix);
	    opts.op = 'create';
	    self.dbg(opts.op, Model, props, opts);
	    return resolve(self.beforeCreate(Model, props, opts)).then(function () {
	      return self.POST(self.getPath('create', Model, props, opts), self.serialize(Model, props, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterCreate(Model, props, opts, data)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  },
	
	  /**
	   * Create multiple new entities in batch.
	   *
	   * {@link DSHttpAdapter#beforeCreateMany} will be called before calling
	   * {@link DSHttpAdapter#POST}.
	   * {@link DSHttpAdapter#afterCreateMany} will be called after calling
	   * {@link DSHttpAdapter#POST}.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The Model.
	   * @param {Array} models Array of property objects to send as the payload.
	   * @param {Object} [opts] Configuration options.
	   * @param {string} [opts.params] TODO
	   * @param {string} [opts.suffix={@link DSHttpAdapter#suffix}] TODO
	   * @return {Promise}
	   */
	  createMany: function createMany(Model, models, opts) {
	    var self = this;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    opts.suffix || (opts.suffix = Model.suffix);
	    opts.op = 'createMany';
	    self.dbg(opts.op, Model, models, opts);
	    return resolve(self.beforeCreateMany(Model, models, opts)).then(function () {
	      return self.POST(self.getPath('createMany', Model, null, opts), self.serialize(Model, models, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterCreateMany(Model, models, opts, data)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  },
	
	  /**
	   * Call {@link DSHttpAdapter#log} at the "debug" level.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {...*} [args] Args passed to {@link DSHttpAdapter#log}.
	   */
	  dbg: function dbg() {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }
	
	    this.log.apply(this, ['debug'].concat(args));
	  },
	
	  /**
	   * Make an Http request to `url` according to the configuration in `config`.
	   *
	   * {@link DSHttpAdapter#beforeDEL} will be called before calling
	   * {@link DSHttpAdapter#HTTP}.
	   * {@link DSHttpAdapter#afterDEL} will be called after calling
	   * {@link DSHttpAdapter#HTTP}.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {string} url Url for the request.
	   * @param {Object} [config] Http configuration that will be passed to
	   * {@link DSHttpAdapter#HTTP}.
	   * @param {Object} [opts] Configuration options.
	   * @return {Promise}
	   */
	  DEL: function DEL(url, config, opts) {
	    var self = this;
	    config || (config = {});
	    config.url = url || config.url;
	    config.method = config.method || 'delete';
	    return resolve(self.beforeDEL(url, config, opts)).then(function (_config) {
	      config = _config || config;
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      return resolve(self.afterDEL(url, config, opts, response)).then(function (_response) {
	        return _response || response;
	      });
	    });
	  },
	
	  /**
	   * Transform the server response object into the payload that will be returned
	   * to JSData.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The Model used for the operation.
	   * @param {Object} response Response object from {@link DSHttpAdapter#HTTP}.
	   * @param {Object} opts Configuration options.
	   * @return {(Object|Array)} Deserialized data.
	   */
	  deserialize: function deserialize(Model, response, opts) {
	    opts || (opts = {});
	    if (isFunction(opts.deserialize)) {
	      return opts.deserialize(Model, response, opts);
	    }
	    if (isFunction(Model.deserialize)) {
	      return Model.deserialize(Model, response, opts);
	    }
	    if (opts.raw) {
	      return response;
	    }
	    return response ? 'data' in response ? response.data : response : response;
	  },
	
	  /**
	   * Destroy the entity with the given primary key.
	   *
	   * {@link DSHttpAdapter#beforeDestroy} will be called before calling
	   * {@link DSHttpAdapter#DEL}.
	   * {@link DSHttpAdapter#afterDestroy} will be called after calling
	   * {@link DSHttpAdapter#DEL}.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The Model.
	   * @param {(string|number)} id Primary key of the entity to destroy.
	   * @param {Object} [opts] Configuration options.
	   * @param {string} [opts.params] TODO
	   * @param {string} [opts.suffix={@link DSHttpAdapter#suffix}] TODO
	   * @return {Promise}
	   */
	  destroy: function destroy(Model, id, opts) {
	    var self = this;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    opts.suffix || (opts.suffix = Model.suffix);
	    opts.op = 'destroy';
	    self.dbg(opts.op, Model, id, opts);
	    return resolve(self.beforeDestroy(Model, id, opts)).then(function () {
	      return self.DEL(self.getPath('destroy', Model, id, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterDestroy(Model, id, opts, data)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  },
	
	  /**
	   * Destroy the entities that match the selection `query`.
	   *
	   * {@link DSHttpAdapter#beforeDestroyAll} will be called before calling
	   * {@link DSHttpAdapter#DEL}.
	   * {@link DSHttpAdapter#afterDestroyAll} will be called after calling
	   * {@link DSHttpAdapter#DEL}.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The Model.
	   * @param {Object} query Selection query.
	   * @param {Object} [opts] Configuration options.
	   * @param {string} [opts.params] TODO
	   * @param {string} [opts.suffix={@link DSHttpAdapter#suffix}] TODO
	   * @return {Promise}
	   */
	  destroyAll: function destroyAll(Model, query, opts) {
	    var self = this;
	    query || (query = {});
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    deepMixIn(opts.params, query);
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    opts.suffix || (opts.suffix = Model.suffix);
	    opts.op = 'destroyAll';
	    self.dbg(opts.op, Model, query, opts);
	    return resolve(self.beforeDestroyAll(Model, query, opts)).then(function () {
	      return self.DEL(self.getPath('destroyAll', Model, null, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterDestroyAll(Model, query, opts, data)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  },
	
	  /**
	   * Log an error.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {...*} [args] Arguments to log.
	   */
	  error: function error() {
	    if (console) {
	      var _console;
	
	      (_console = console)[typeof console.error === 'function' ? 'error' : 'log'].apply(_console, arguments);
	    }
	  },
	
	  /**
	   * Make an Http request using `window.fetch`.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} config Request configuration.
	   * @param {Object} config.data Payload for the request.
	   * @param {string} config.method Http method for the request.
	   * @param {Object} config.headers Headers for the request.
	   * @param {Object} config.params Querystring for the request.
	   * @param {string} config.url Url for the request.
	   * @param {Object} [opts] Configuration options.
	   */
	  fetch: function (_fetch) {
	    function fetch(_x, _x2) {
	      return _fetch.apply(this, arguments);
	    }
	
	    fetch.toString = function () {
	      return _fetch.toString();
	    };
	
	    return fetch;
	  }(function (config, opts) {
	    var requestConfig = {
	      method: config.method,
	      // turn the plain headers object into the Fetch Headers object
	      headers: new Headers(config.headers)
	    };
	
	    if (config.data) {
	      requestConfig.body = toJson(config.data);
	    }
	
	    return fetch(new Request(buildUrl(config.url, config.params), requestConfig)).then(function (response) {
	      response.config = {
	        method: config.method,
	        url: config.url
	      };
	      return response.json().then(function (data) {
	        response.data = data;
	        return response;
	      });
	    });
	  }),
	
	  /**
	   * Retrieve the entity with the given primary key.
	   *
	   * {@link DSHttpAdapter#beforeFind} will be called before calling
	   * {@link DSHttpAdapter#GET}.
	   * {@link DSHttpAdapter#afterFind} will be called after calling
	   * {@link DSHttpAdapter#GET}.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The Model.
	   * @param {(string|number)} id Primary key of the entity to retrieve.
	   * @param {Object} [opts] Configuration options.
	   * @param {string} [opts.params] TODO
	   * @param {string} [opts.suffix={@link DSHttpAdapter#suffix}] TODO
	   * @return {Promise}
	   */
	  find: function find(Model, id, opts) {
	    var self = this;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    opts.suffix || (opts.suffix = Model.suffix);
	    opts.op = 'find';
	    self.dbg(opts.op, Model, id, opts);
	    return resolve(self.beforeFind(Model, id, opts)).then(function () {
	      return self.GET(self.getPath('find', Model, id, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterFind(Model, id, opts, data)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  },
	
	  /**
	   * Retrieve the entities that match the selection `query`.
	   *
	   * {@link DSHttpAdapter#beforeFindAll} will be called before calling
	   * {@link DSHttpAdapter#GET}.
	   * {@link DSHttpAdapter#afterFindAll} will be called after calling
	   * {@link DSHttpAdapter#GET}.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The Model.
	   * @param {Object} query Selection query.
	   * @param {Object} [opts] Configuration options.
	   * @param {string} [opts.params] TODO
	   * @param {string} [opts.suffix={@link DSHttpAdapter#suffix}] TODO
	   * @return {Promise}
	   */
	  findAll: function findAll(Model, query, opts) {
	    var self = this;
	    query || (query = {});
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.suffix || (opts.suffix = Model.suffix);
	    opts.op = 'findAll';
	    self.dbg(opts.op, Model, query, opts);
	    deepMixIn(opts.params, query);
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    return resolve(self.beforeFindAll(Model, query, opts)).then(function () {
	      return self.GET(self.getPath('findAll', Model, opts.params, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterFindAll(Model, query, opts, data)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  },
	
	  /**
	   * { function_description }
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {string} url The url for the request.
	   * @param {Object} config Request configuration options.
	   * @param {Object} [opts] Configuration options.
	   * @return {Promise}
	   */
	  GET: function GET(url, config, opts) {
	    var self = this;
	    config || (config = {});
	    config.url = url || config.url;
	    config.method = config.method || 'get';
	    return resolve(self.beforeGET(url, config, opts)).then(function (_config) {
	      config = _config || config;
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      return resolve(self.afterGET(url, config, opts, response)).then(function (_response) {
	        return _response || response;
	      });
	    });
	  },
	
	  /**
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {*} Model { description }
	   * @param {*} id { description }
	   * @param {boolean} opts { description }
	   * @return {string} Full path.
	   */
	  getEndpoint: function getEndpoint(Model, id, opts) {
	    var _this = this;
	
	    opts || (opts = {});
	    opts.params || (opts.params = {});
	
	    var item = undefined;
	    var parentKey = Model.parentKey;
	    var endpoint = opts.hasOwnProperty('endpoint') ? opts.endpoint : Model.endpoint;
	    var parentField = Model.parentField;
	    var parentDef = Model.parent ? Model.getResource(Model.parent) : undefined;
	    var parentId = opts.params[parentKey];
	
	    if (parentId === false || !parentKey || !parentDef) {
	      if (parentId === false) {
	        delete opts.params[parentKey];
	      }
	      return endpoint;
	    } else {
	      delete opts.params[parentKey];
	
	      if (isString(id) || isNumber(id)) {
	        item = Model.get(id);
	      } else if (isObject(id)) {
	        item = id;
	      }
	
	      if (item) {
	        parentId = parentId || item[parentKey] || (item[parentField] ? item[parentField][parentDef.idAttribute] : null);
	      }
	
	      if (parentId) {
	        var _ret = function () {
	          delete opts.endpoint;
	          var _opts = {};
	          forOwn(opts, function (value, key) {
	            _opts[key] = value;
	          });
	          _(_opts, parentDef);
	          return {
	            v: makePath(_this.getEndpoint(parentDef, parentId, _opts, parentId, endpoint))
	          };
	        }();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      } else {
	        return endpoint;
	      }
	    }
	  },
	
	  /**
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {string} method TODO
	   * @param {*} Model TODO
	   * @param {(string|number)?} id TODO
	   * @param {Object} opts Configuration options.
	   */
	  getPath: function getPath(method, Model, id, opts) {
	    var self = this;
	    opts || (opts = {});
	    var args = [opts.basePath === undefined ? Model.basePath === undefined ? self.basePath : Model.basePath : opts.basePath, self.getEndpoint(Model, isString(id) || isNumber(id) || method === 'create' ? id : null, opts)];
	    if (method === 'find' || method === 'update' || method === 'destroy') {
	      args.push(id);
	    }
	    return makePath.apply(_jsData.utils, args);
	  },
	
	  /**
	   * Make an Http request.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} config Request configuration options.
	   * @param {Object} [opts] Configuration options.
	   * @return {Promise}
	   */
	  HTTP: function HTTP(config, opts) {
	    var self = this;
	    var start = new Date();
	    opts || (opts = {});
	    config = copy(config);
	    config = deepMixIn(config, self.httpConfig);
	    if (self.forceTrailingSlash && config.url[config.url.length - 1] !== '/') {
	      config.url += '/';
	    }
	    config.method = config.method.toUpperCase();
	    var suffix = config.suffix || opts.suffix || self.suffix;
	    if (suffix && config.url.substr(config.url.length - suffix.length) !== suffix) {
	      config.url += suffix;
	    }
	
	    function logResponse(data) {
	      var str = start.toUTCString() + ' - ' + config.method.toUpperCase() + ' ' + config.url + ' - ' + data.status + ' ' + (new Date().getTime() - start.getTime()) + 'ms';
	      if (data.status >= 200 && data.status < 300) {
	        if (self.log) {
	          self.dbg('debug', str, data);
	        }
	        return data;
	      } else {
	        if (self.error) {
	          self.error('\'FAILED: ' + str, data);
	        }
	        return reject(data);
	      }
	    }
	
	    if (!self.http) {
	      throw new Error('You have not configured this adapter with an http library!');
	    }
	
	    return resolve(self.beforeHTTP(config, opts)).then(function (_config) {
	      config = _config || config;
	      if (hasFetch && (self.useFetch || opts.useFetch || !self.http)) {
	        return self.fetch(config, opts).then(logResponse, logResponse);
	      }
	      return self.http(config).then(logResponse, logResponse).catch(function (err) {
	        return self.responseError(err, config, opts);
	      });
	    }).then(function (response) {
	      return resolve(self.afterHTTP(config, opts, response)).then(function (_response) {
	        return _response || response;
	      });
	    });
	  },
	
	  /**
	   * Log the provided arguments at the specified leve.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {string} level Log level.
	   * @param {...*} [args] Arguments to log.
	   */
	  log: function log(level) {
	    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	      args[_key3 - 1] = arguments[_key3];
	    }
	
	    if (level && !args.length) {
	      args.push(level);
	      level = 'debug';
	    }
	    if (level === 'debug' && !this.debug) {
	      return;
	    }
	    var prefix = level.toUpperCase() + ': (' + this.name + ')';
	    if (console[level]) {
	      var _console2;
	
	      (_console2 = console)[level].apply(_console2, [prefix].concat(args));
	    } else {
	      var _console3;
	
	      (_console3 = console).log.apply(_console3, [prefix].concat(args));
	    }
	  },
	
	  /**
	   * { function_description }
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {*} url { description }
	   * @param {*} data { description }
	   * @param {*} config { description }
	   * @param {Object} [opts] Configuration options.
	   * @return {Promise}
	   */
	  POST: function POST(url, data, config, opts) {
	    var self = this;
	    config || (config = {});
	    config.url = url || config.url;
	    config.data = data || config.data;
	    config.method = config.method || 'post';
	    return resolve(self.beforePOST(url, data, config, opts)).then(function (_config) {
	      config = _config || config;
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      return resolve(self.afterPOST(url, data, config, opts, response)).then(function (_response) {
	        return _response || response;
	      });
	    });
	  },
	
	  /**
	   * { function_description }
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {*} url { description }
	   * @param {*} data { description }
	   * @param {*} config { description }
	   * @param {Object} [opts] Configuration options.
	   * @return {Promise}
	   */
	  PUT: function PUT(url, data, config, opts) {
	    var self = this;
	    config || (config = {});
	    config.url = url || config.url;
	    config.data = data || config.data;
	    config.method = config.method || 'put';
	    return resolve(self.beforePUT(url, data, config, opts)).then(function (_config) {
	      config = _config || config;
	      return self.HTTP(config, opts);
	    }).then(function (response) {
	      return resolve(self.afterPUT(url, data, config, opts, response)).then(function (_response) {
	        return _response || response;
	      });
	    });
	  },
	
	  /**
	   * { function_description }
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {*} Model { description }
	   * @param {*} params { description }
	   * @param {*} opts { description }
	   * @return {*} Transformed params.
	   */
	  queryTransform: function queryTransform(Model, params, opts) {
	    opts || (opts = {});
	    if (isFunction(opts.queryTransform)) {
	      return opts.queryTransform(Model, params, opts);
	    }
	    if (isFunction(Model.queryTransform)) {
	      return Model.queryTransform(Model, params, opts);
	    }
	    return params;
	  },
	
	  /**
	   * Error handler invoked when the promise returned by {@link DSHttpAdapter#http}
	   * is rejected. Default implementation is to just return the error wrapped in
	   * a rejected Promise, aka rethrow the error. {@link DSHttpAdapter#http} is
	   * called by {@link DSHttpAdapter#HTTP}.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {*} err The error that {@link DSHttpAdapter#http} rejected with.
	   * @param {*} config The `config` argument that was passed to {@link DSHttpAdapter#HTTP}.
	   * @param {*} opts The `opts` argument that was passed to {@link DSHttpAdapter#HTTP}.
	   * @return {Promise}
	   */
	  responseError: function responseError(err, config, opts) {
	    return reject(err);
	  },
	
	  /**
	   * { function_description }
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {*} Model { description }
	   * @param {*} data { description }
	   * @param {*} opts { description }
	   * @return {*} Serialized data.
	   */
	  serialize: function serialize(Model, data, opts) {
	    opts || (opts = {});
	    if (isFunction(opts.serialize)) {
	      return opts.serialize(Model, data, opts);
	    }
	    if (isFunction(Model.serialize)) {
	      return Model.serialize(Model, data, opts);
	    }
	    return data;
	  },
	
	  /**
	   * { function_description }
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {*} Model { description }
	   * @param {*} id { description }
	   * @param {*} props { description }
	   * @param {Object} [opts] Configuration options.
	   * @return {Promise}
	   */
	  update: function update(Model, id, props, opts) {
	    var self = this;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    opts.suffix || (opts.suffix = Model.suffix);
	    opts.op = 'update';
	    self.dbg(opts.op, Model, id, props, opts);
	    return resolve(self.beforeUpdate(Model, id, props, opts)).then(function () {
	      return self.PUT(self.getPath('update', Model, id, opts), self.serialize(Model, props, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterUpdate(Model, id, props, opts, data)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  },
	
	  /**
	   * { function_description }
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {*} Model { description }
	   * @param {*} props { description }
	   * @param {*} query { description }
	   * @param {Object} [opts] Configuration options.
	   * @return {Promise}
	   */
	  updateAll: function updateAll(Model, props, query, opts) {
	    var self = this;
	    query || (query = {});
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    deepMixIn(opts.params, query);
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    opts.suffix || (opts.suffix = Model.suffix);
	    opts.op = 'updateAll';
	    self.dbg(opts.op, Model, props, query, opts);
	    return resolve(self.beforeUpdateAll(Model, props, query, opts)).then(function () {
	      return self.PUT(self.getPath('updateAll', Model, null, opts), self.serialize(Model, props, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterUpdateAll(Model, props, query, opts, data)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  },
	
	  /**
	   * Update multiple entities in batch.
	   *
	   * {@link DSHttpAdapter#beforeUpdateMany} will be called before calling
	   * {@link DSHttpAdapter#PUT}.
	   * {@link DSHttpAdapter#afterUpdateMany} will be called after calling
	   * {@link DSHttpAdapter#PUT}.
	   *
	   * @memberof DSHttpAdapter
	   * @instance
	   * @param {Object} Model The Model.
	   * @param {Array} models Array of property objects to send as the payload.
	   * @param {Object} [opts] Configuration options.
	   * @param {string} [opts.params] TODO
	   * @param {string} [opts.suffix={@link DSHttpAdapter#suffix}] TODO
	   * @return {Promise}
	   */
	  updateMany: function updateMany(Model, models, opts) {
	    var self = this;
	    opts = opts ? copy(opts) : {};
	    opts.params || (opts.params = {});
	    opts.params = self.queryTransform(Model, opts.params, opts);
	    opts.suffix || (opts.suffix = Model.suffix);
	    opts.op = 'updateMany';
	    self.dbg(opts.op, Model, models, opts);
	    return resolve(self.beforeUpdateMany(Model, models, opts)).then(function () {
	      return self.PUT(self.getPath('updateMany', Model, null, opts), self.serialize(Model, models, opts), opts);
	    }).then(function (response) {
	      return self.deserialize(Model, response, opts);
	    }).then(function (data) {
	      return resolve(self.afterUpdateMany(Model, models, opts, data)).then(function (_data) {
	        return _data || data;
	      });
	    });
	  }
	});
	
	/**
	 * Add an Http actions to a Model.
	 *
	 * @name DSHttpAdapter.addAction
	 * @method
	 * @param {string} name Name of the new action.
	 * @param {Object} [opts] Action configuration
	 * @param {string} [opts.adapter]
	 * @param {string} [opts.pathname]
	 * @param {Function} [opts.request]
	 * @param {Function} [opts.response]
	 * @param {Function} [opts.responseError]
	 * @return {Function} Decoration function, which should be passed the Model to
	 * decorate when invoked.
	 */
	DSHttpAdapter.addAction = function (name, opts) {
	  if (!name || !isString(name)) {
	    throw new TypeError('action(name[, opts]): Expected: string, Found: ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));
	  }
	  return function (Model) {
	    if (Model[name]) {
	      throw new Error('action(name[, opts]): ' + name + ' already exists on target!');
	    }
	    opts.request = opts.request || function (config) {
	      return config;
	    };
	    opts.response = opts.response || function (response) {
	      return response;
	    };
	    opts.responseError = opts.responseError || function (err) {
	      return reject(err);
	    };
	    Model[name] = function (id, _opts) {
	      if (isObject(id)) {
	        _opts = id;
	      }
	      _opts = _opts || {};
	      var adapter = this.getAdapter(opts.adapter || this.defaultAdapter || 'http');
	      var config = {};
	      fillIn(config, opts);
	      if (!_opts.hasOwnProperty('endpoint') && config.endpoint) {
	        _opts.endpoint = config.endpoint;
	      }
	      if (typeof _opts.getEndpoint === 'function') {
	        config.url = _opts.getEndpoint(this, _opts);
	      } else {
	        var _args = [_opts.basePath || this.basePath || adapter.defaults.basePath, adapter.getEndpoint(this, isSorN(id) ? id : null, _opts)];
	        if (isSorN(id)) {
	          _args.push(id);
	        }
	        _args.push(opts.pathname || name);
	        config.url = makePath.apply(null, _args);
	      }
	      config.method = config.method || 'GET';
	      config.modelName = this.name;
	      deepMixIn(config)(_opts);
	      return resolve(config).then(_opts.request || opts.request).then(function (config) {
	        return adapter.HTTP(config);
	      }).then(function (data) {
	        if (data && data.config) {
	          data.config.modelName = this.name;
	        }
	        return data;
	      }).then(_opts.response || opts.response, _opts.responseError || opts.responseError);
	    };
	    return Model;
	  };
	};
	
	/**
	 * Add multiple Http actions to a Model. See {@link DSHttpAdapter.addAction} for
	 * action configuration options.
	 *
	 * @name DSHttpAdapter.addActions
	 * @method
	 * @param {Object.<string, Object>} opts Object where the key is an action name
	 * and the value is the configuration for the action.
	 * @return {Function} Decoration function, which should be passed the Model to
	 * decorate when invoked.
	 */
	DSHttpAdapter.addActions = function (opts) {
	  opts || (opts = {});
	  return function (Model) {
	    forOwn(Model, function (value, key) {
	      DSHttpAdapter.addAction(key, value)(Model);
	    });
	    return Model;
	  };
	};
	
	/**
	 * Alternative to ES6 class syntax for extending `DSHttpAdapter`.
	 *
	 * __ES6__:
	 * ```javascript
	 * class MyHttpAdapter extends DSHttpAdapter {
	 *   deserialize (Model, data, opts) {
	 *     const data = super.deserialize(Model, data, opts)
	 *     data.foo = 'bar'
	 *     return data
	 *   }
	 * }
	 * ```
	 *
	 * __ES5__:
	 * ```javascript
	 * var instanceProps = {
	 *   // override deserialize
	 *   deserialize: function (Model, data, opts) {
	 *     var Ctor = this.constructor
	 *     var superDeserialize = (Ctor.__super__ || Object.getPrototypeOf(Ctor)).deserialize
	 *     // call the super deserialize
	 *     var data = superDeserialize(Model, data, opts)
	 *     data.foo = 'bar'
	 *     return data
	 *   },
	 *   say: function () { return 'hi' }
	 * }
	 * var classProps = {
	 *   yell: function () { return 'HI' }
	 * }
	 *
	 * var MyHttpAdapter = DSHttpAdapter.extend(instanceProps, classProps)
	 * var adapter = new MyHttpAdapter()
	 * adapter.say() // "hi"
	 * MyHttpAdapter.yell() // "HI"
	 * ```
	 *
	 * @name DSHttpAdapter.extend
	 * @method
	 * @param {Object} [instanceProps] Properties that will be added to the
	 * prototype of the subclass.
	 * @param {Object} [classProps] Properties that will be added as static
	 * properties to the subclass itself.
	 * @return {Object} Subclass of `DSHttpAdapter`.
	 */
	DSHttpAdapter.extend = extend;
	
	/**
	 * Details of the current version of the `js-data-http` module.
	 *
	 * @name DSHttpAdapter.version
	 * @type {Object}
	 * @property {string} version.full The full semver value.
	 * @property {number} version.major The major version number.
	 * @property {number} version.minor The minor version number.
	 * @property {number} version.patch The patch version number.
	 * @property {(string|boolean)} version.alpha The alpha version value,
	 * otherwise `false` if the current version is not alpha.
	 * @property {(string|boolean)} version.beta The beta version value,
	 * otherwise `false` if the current version is not beta.
	 */
	DSHttpAdapter.version = {
	  full: '3.0.0-alpha.3',
	  major: parseInt('3', 10),
	  minor: parseInt('0', 10),
	  patch: parseInt('0', 10),
	  alpha:  true ? '3' : false,
	  beta:  true ? 'false' : false
	};
	
	/**
	 * Registered as `js-data-http` in NPM and Bower. The build of `js-data-http`
	 * that works on Node.js is registered in NPM as `js-data-http-node`. The build
	 * of `js-data-http` that does not bundle `axios` is registered in NPM and Bower
	 * as `js-data-fetch`.
	 *
	 * __Script tag__:
	 * ```javascript
	 * window.DSHttpAdapter
	 * ```
	 * __CommonJS__:
	 * ```javascript
	 * var DSHttpAdapter = require('js-data-http')
	 * ```
	 * __ES6 Modules__:
	 * ```javascript
	 * import DSHttpAdapter from 'js-data-http'
	 * ```
	 * __AMD__:
	 * ```javascript
	 * define('myApp', ['js-data-http'], function (DSHttpAdapter) { ... })
	 * ```
	 *
	 * @module js-data-http
	 */
	
	module.exports = DSHttpAdapter;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaults = __webpack_require__(4);
	var utils = __webpack_require__(5);
	var dispatchRequest = __webpack_require__(6);
	var InterceptorManager = __webpack_require__(15);
	var isAbsoluteURL = __webpack_require__(16);
	var combineURLs = __webpack_require__(17);
	var bind = __webpack_require__(18);
	
	function Axios(defaultConfig) {
	  this.defaultConfig = utils.merge({
	    headers: {},
	    timeout: defaults.timeout,
	    transformRequest: defaults.transformRequest,
	    transformResponse: defaults.transformResponse
	  }, defaultConfig);
	
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}
	
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }
	
	  config = utils.merge(this.defaultConfig, { method: 'get' }, config);
	
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }
	
	  // Don't allow overriding defaults.withCredentials
	  config.withCredentials = config.withCredentials || defaults.withCredentials;
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	var defaultInstance = new Axios();
	
	var axios = module.exports = bind(Axios.prototype.request, defaultInstance);
	
	axios.create = function create(defaultConfig) {
	  return new Axios(defaultConfig);
	};
	
	// Expose defaults
	axios.defaults = defaults;
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(19);
	
	// Expose interceptors
	axios.interceptors = defaultInstance.interceptors;
	
	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	
	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	module.exports = {
	  transformRequest: [function transformResponseJSON(data, headers) {
	    if (utils.isFormData(data)) {
	      return data;
	    }
	    if (utils.isArrayBuffer(data)) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isObject(data) && !utils.isFile(data) && !utils.isBlob(data)) {
	      // Set application/json if no Content-Type has been specified
	      if (!utils.isUndefined(headers)) {
	        utils.forEach(headers, function processContentTypeHeader(val, key) {
	          if (key.toLowerCase() === 'content-type') {
	            headers['Content-Type'] = val;
	          }
	        });
	
	        if (utils.isUndefined(headers['Content-Type'])) {
	          headers['Content-Type'] = 'application/json;charset=utf-8';
	        }
	      }
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponseJSON(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],
	
	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE)
	  },
	
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN'
	};


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return toString.call(val) === '[object FormData]';
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    result[key] = val;
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  trim: trim
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/**
	 * Dispatch a request to the server using whichever adapter
	 * is supported by the current environment.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  return new Promise(function executor(resolve, reject) {
	    try {
	      if ((typeof XMLHttpRequest !== 'undefined') || (typeof ActiveXObject !== 'undefined')) {
	        // For browsers use XHR adapter
	        __webpack_require__(8)(resolve, reject, config);
	      } else if (typeof process !== 'undefined') {
	        // For node use HTTP adapter
	        __webpack_require__(8)(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	};
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*global ActiveXObject:true*/
	
	var defaults = __webpack_require__(4);
	var utils = __webpack_require__(5);
	var buildURL = __webpack_require__(9);
	var parseHeaders = __webpack_require__(10);
	var transformData = __webpack_require__(11);
	var isURLSameOrigin = __webpack_require__(12);
	var btoa = window.btoa || __webpack_require__(13);
	
	module.exports = function xhrAdapter(resolve, reject, config) {
	  // Transform request data
	  var data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Merge headers
	  var requestHeaders = utils.merge(
	    defaults.headers.common,
	    defaults.headers[config.method] || {},
	    config.headers || {}
	  );
	
	  if (utils.isFormData(data)) {
	    delete requestHeaders['Content-Type']; // Let the browser set it
	  }
	
	  var Adapter = (XMLHttpRequest || ActiveXObject);
	  var loadEvent = 'onreadystatechange';
	  var xDomain = false;
	
	  // For IE 8/9 CORS support
	  if (!isURLSameOrigin(config.url) && window.XDomainRequest) {
	    Adapter = window.XDomainRequest;
	    loadEvent = 'onload';
	    xDomain = true;
	  }
	
	  // HTTP basic authentication
	  if (config.auth) {
	    var username = config.auth.username || '';
	    var password = config.auth.password || '';
	    requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	  }
	
	  // Create the request
	  var request = new Adapter('Microsoft.XMLHTTP');
	  request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
	
	  // Set the request timeout in MS
	  request.timeout = config.timeout;
	
	  // Listen for ready state
	  request[loadEvent] = function handleReadyState() {
	    if (request && (request.readyState === 4 || xDomain)) {
	      // Prepare the response
	      var responseHeaders = xDomain ? null : parseHeaders(request.getAllResponseHeaders());
	      var responseData = ['text', ''].indexOf(config.responseType || '') !== -1 ? request.responseText : request.response;
	      var response = {
	        data: transformData(
	          responseData,
	          responseHeaders,
	          config.transformResponse
	        ),
	        status: request.status,
	        statusText: request.statusText,
	        headers: responseHeaders,
	        config: config
	      };
	      // Resolve or reject the Promise based on the status
	      ((request.status >= 200 && request.status < 300) || (xDomain && request.responseText) ?
	        resolve :
	        reject)(response);
	
	      // Clean up request
	      request = null;
	    }
	  };
	
	  // Add xsrf header
	  // This is only done if running in a standard browser environment.
	  // Specifically not if we're in a web worker, or react-native.
	  if (utils.isStandardBrowserEnv()) {
	    var cookies = __webpack_require__(14);
	
	    // Add xsrf header
	    var xsrfValue =  config.withCredentials || isURLSameOrigin(config.url) ?
	        cookies.read(config.xsrfCookieName || defaults.xsrfCookieName) :
	        undefined;
	
	    if (xsrfValue) {
	      requestHeaders[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue;
	    }
	  }
	
	  // Add headers to the request
	  if (!xDomain) {
	    utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	      if (!data && key.toLowerCase() === 'content-type') {
	        // Remove Content-Type if data is undefined
	        delete requestHeaders[key];
	      } else {
	        // Otherwise add header to the request
	        request.setRequestHeader(key, val);
	      }
	    });
	  }
	
	  // Add withCredentials to request if needed
	  if (config.withCredentials) {
	    request.withCredentials = true;
	  }
	
	  // Add responseType to request if needed
	  if (config.responseType) {
	    try {
	      request.responseType = config.responseType;
	    } catch (e) {
	      if (request.responseType !== 'json') {
	        throw e;
	      }
	    }
	  }
	
	  if (utils.isArrayBuffer(data)) {
	    data = new DataView(data);
	  }
	
	  // Send the request
	  request.send(data);
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }
	
	      if (!utils.isArray(val)) {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};
	


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) { return parsed; }
	
	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });
	
	  return parsed;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;
	
	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;
	
	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }
	
	      urlParsingNode.setAttribute('href', href);
	
	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }
	
	    originURL = resolveURL(window.location.href);
	
	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :
	
	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	function InvalidCharacterError(message) {
	  this.message = message;
	}
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.code = 5;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';
	
	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new InvalidCharacterError('INVALID_CHARACTER_ERR: DOM Exception 5');
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}
	
	module.exports = btoa;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));
	
	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }
	
	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }
	
	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }
	
	        if (secure === true) {
	          cookie.push('secure');
	        }
	
	        document.cookie = cookie.join('; ');
	      },
	
	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },
	
	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :
	
	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(5);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
	
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ }
/******/ ])
});
;
//# sourceMappingURL=js-data-http.js.map