/**
 * sp-pnp-js v2.0.0 - A JavaScript library for SharePoint development.
 * MIT (https://github.com/SharePoint/PnP-JS-Core/blob/master/LICENSE)
 * Copyright (c) 2016 Microsoft
 * docs: http://officedev.github.io/PnP-JS-Core
 * source: https://github.com/SharePoint/PnP-JS-Core
 * bugs: https://github.com/SharePoint/PnP-JS-Core/issues
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["$pnp"] = factory();
	else
		root["$pnp"] = factory();
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function __export(m) {
	  for (var p in m) {
	    if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	  }
	}
	var util_1 = __webpack_require__(1);
	var storage_1 = __webpack_require__(2);
	var configuration_1 = __webpack_require__(3);
	var logging_1 = __webpack_require__(5);
	var rest_1 = __webpack_require__(6);
	var pnplibconfig_1 = __webpack_require__(12);
	/**
	 * Root class of the Patterns and Practices namespace, provides an entry point to the library
	 */
	/**
	 * Utility methods
	 */
	exports.util = util_1.Util;
	/**
	 * Provides access to the REST interface
	 */
	exports.sp = new rest_1.Rest();
	/**
	 * Provides access to local and session storage
	 */
	exports.storage = new storage_1.PnPClientStorage();
	/**
	 * Global configuration instance to which providers can be added
	 */
	exports.config = new configuration_1.Settings();
	/**
	 * Global logging instance to which subscribers can be registered and messages written
	 */
	exports.log = logging_1.Logger;
	/**
	 * Allows for the configuration of the library
	 */
	exports.setup = pnplibconfig_1.setRuntimeConfig;
	/**
	 * Expose a subset of classes from the library for public consumption
	 */
	__export(__webpack_require__(39));
	// creating this class instead of directly assigning to default fixes issue #116
	var Def = {
	  /**
	   * Global configuration instance to which providers can be added
	   */
	  config: exports.config,
	  /**
	   * Global logging instance to which subscribers can be registered and messages written
	   */
	  log: exports.log,
	  /**
	   * Provides access to local and session storage
	   */
	  setup: exports.setup,
	  /**
	   * Provides access to the REST interface
	   */
	  sp: exports.sp,
	  /**
	   * Provides access to local and session storage
	   */
	  storage: exports.storage,
	  /**
	   * Utility methods
	   */
	  util: exports.util
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Enables use of the import pnp from syntax
	 */
	exports.default = Def;

/***/ },
/* 1 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Util = function () {
	    function Util() {
	        _classCallCheck(this, Util);
	    }
	
	    _createClass(Util, null, [{
	        key: "getCtxCallback",
	
	        /**
	         * Gets a callback function which will maintain context across async calls.
	         * Allows for the calling pattern getCtxCallback(thisobj, method, methodarg1, methodarg2, ...)
	         *
	         * @param context The object that will be the 'this' value in the callback
	         * @param method The method to which we will apply the context and parameters
	         * @param params Optional, additional arguments to supply to the wrapped method when it is invoked
	         */
	        value: function getCtxCallback(context, method) {
	            for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	                params[_key - 2] = arguments[_key];
	            }
	
	            return function () {
	                method.apply(context, params);
	            };
	        }
	        /**
	         * Tests if a url param exists
	         *
	         * @param name The name of the url paramter to check
	         */
	
	    }, {
	        key: "urlParamExists",
	        value: function urlParamExists(name) {
	            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	            return regex.test(location.search);
	        }
	        /**
	         * Gets a url param value by name
	         *
	         * @param name The name of the paramter for which we want the value
	         */
	
	    }, {
	        key: "getUrlParamByName",
	        value: function getUrlParamByName(name) {
	            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	            var results = regex.exec(location.search);
	            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	        }
	        /**
	         * Gets a url param by name and attempts to parse a bool value
	         *
	         * @param name The name of the paramter for which we want the boolean value
	         */
	
	    }, {
	        key: "getUrlParamBoolByName",
	        value: function getUrlParamBoolByName(name) {
	            var p = this.getUrlParamByName(name);
	            var isFalse = p === "" || /false|0/i.test(p);
	            return !isFalse;
	        }
	        /**
	         * Inserts the string s into the string target as the index specified by index
	         *
	         * @param target The string into which we will insert s
	         * @param index The location in target to insert s (zero based)
	         * @param s The string to insert into target at position index
	         */
	
	    }, {
	        key: "stringInsert",
	        value: function stringInsert(target, index, s) {
	            if (index > 0) {
	                return target.substring(0, index) + s + target.substring(index, target.length);
	            }
	            return s + target;
	        }
	        /**
	         * Adds a value to a date
	         *
	         * @param date The date to which we will add units, done in local time
	         * @param interval The name of the interval to add, one of: ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second']
	         * @param units The amount to add to date of the given interval
	         *
	         * http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
	         */
	
	    }, {
	        key: "dateAdd",
	        value: function dateAdd(date, interval, units) {
	            var ret = new Date(date.toLocaleString()); // don't change original date
	            switch (interval.toLowerCase()) {
	                case "year":
	                    ret.setFullYear(ret.getFullYear() + units);
	                    break;
	                case "quarter":
	                    ret.setMonth(ret.getMonth() + 3 * units);
	                    break;
	                case "month":
	                    ret.setMonth(ret.getMonth() + units);
	                    break;
	                case "week":
	                    ret.setDate(ret.getDate() + 7 * units);
	                    break;
	                case "day":
	                    ret.setDate(ret.getDate() + units);
	                    break;
	                case "hour":
	                    ret.setTime(ret.getTime() + units * 3600000);
	                    break;
	                case "minute":
	                    ret.setTime(ret.getTime() + units * 60000);
	                    break;
	                case "second":
	                    ret.setTime(ret.getTime() + units * 1000);
	                    break;
	                default:
	                    ret = undefined;
	                    break;
	            }
	            return ret;
	        }
	        /**
	         * Loads a stylesheet into the current page
	         *
	         * @param path The url to the stylesheet
	         * @param avoidCache If true a value will be appended as a query string to avoid browser caching issues
	         */
	
	    }, {
	        key: "loadStylesheet",
	        value: function loadStylesheet(path, avoidCache) {
	            if (avoidCache) {
	                path += "?" + encodeURIComponent(new Date().getTime().toString());
	            }
	            var head = document.getElementsByTagName("head");
	            if (head.length > 0) {
	                var e = document.createElement("link");
	                head[0].appendChild(e);
	                e.setAttribute("type", "text/css");
	                e.setAttribute("rel", "stylesheet");
	                e.setAttribute("href", path);
	            }
	        }
	        /**
	         * Combines an arbitrary set of paths ensuring that the slashes are normalized
	         *
	         * @param paths 0 to n path parts to combine
	         */
	
	    }, {
	        key: "combinePaths",
	        value: function combinePaths() {
	            for (var _len2 = arguments.length, paths = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                paths[_key2] = arguments[_key2];
	            }
	
	            return paths.filter(function (path) {
	                return typeof path !== "undefined" && path !== null;
	            }).map(function (path) {
	                return path.replace(/^[\\|\/]/, "").replace(/[\\|\/]$/, "");
	            }).join("/").replace(/\\/g, "/");
	        }
	        /**
	         * Gets a random string of chars length
	         *
	         * @param chars The length of the random string to generate
	         */
	
	    }, {
	        key: "getRandomString",
	        value: function getRandomString(chars) {
	            var text = new Array(chars);
	            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	            for (var i = 0; i < chars; i++) {
	                text[i] = possible.charAt(Math.floor(Math.random() * possible.length));
	            }
	            return text.join("");
	        }
	        /**
	         * Gets a random GUID value
	         *
	         * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
	         */
	        /* tslint:disable no-bitwise */
	
	    }, {
	        key: "getGUID",
	        value: function getGUID() {
	            var d = new Date().getTime();
	            var guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
	                var r = (d + Math.random() * 16) % 16 | 0;
	                d = Math.floor(d / 16);
	                return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
	            });
	            return guid;
	        }
	        /* tslint:enable */
	        /**
	         * Determines if a given value is a function
	         *
	         * @param candidateFunction The thing to test for being a function
	         */
	
	    }, {
	        key: "isFunction",
	        value: function isFunction(candidateFunction) {
	            return typeof candidateFunction === "function";
	        }
	        /**
	         * @returns whether the provided parameter is a JavaScript Array or not.
	        */
	
	    }, {
	        key: "isArray",
	        value: function isArray(array) {
	            if (Array.isArray) {
	                return Array.isArray(array);
	            }
	            return array && typeof array.length === "number" && array.constructor === Array;
	        }
	        /**
	         * Determines if a string is null or empty or undefined
	         *
	         * @param s The string to test
	         */
	
	    }, {
	        key: "stringIsNullOrEmpty",
	        value: function stringIsNullOrEmpty(s) {
	            return typeof s === "undefined" || s === null || s === "";
	        }
	        /**
	         * Provides functionality to extend the given object by doing a shallow copy
	         *
	         * @param target The object to which properties will be copied
	         * @param source The source object from which properties will be copied
	         * @param noOverwrite If true existing properties on the target are not overwritten from the source
	         *
	         */
	
	    }, {
	        key: "extend",
	        value: function extend(target, source) {
	            var noOverwrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	            if (source === null || typeof source === "undefined") {
	                return target;
	            }
	            // ensure we don't overwrite things we don't want overwritten
	            var check = noOverwrite ? function (o, i) {
	                return !(i in o);
	            } : function () {
	                return true;
	            };
	            return Object.getOwnPropertyNames(source).filter(function (v) {
	                return check(target, v);
	            }).reduce(function (t, v) {
	                t[v] = source[v];
	                return t;
	            }, target);
	        }
	        /**
	         * Determines if a given url is absolute
	         *
	         * @param url The url to check to see if it is absolute
	         */
	
	    }, {
	        key: "isUrlAbsolute",
	        value: function isUrlAbsolute(url) {
	            return (/^https?:\/\/|^\/\//i.test(url)
	            );
	        }
	        /**
	         * Attempts to make the supplied relative url absolute based on the _spPageContextInfo object, if available
	         *
	         * @param url The relative url to make absolute
	         */
	
	    }, {
	        key: "makeUrlAbsolute",
	        value: function makeUrlAbsolute(url) {
	            if (Util.isUrlAbsolute(url)) {
	                return url;
	            }
	            if (typeof global._spPageContextInfo !== "undefined") {
	                if (global._spPageContextInfo.hasOwnProperty("webAbsoluteUrl")) {
	                    return Util.combinePaths(global._spPageContextInfo.webAbsoluteUrl, url);
	                } else if (global._spPageContextInfo.hasOwnProperty("webServerRelativeUrl")) {
	                    return Util.combinePaths(global._spPageContextInfo.webServerRelativeUrl, url);
	                }
	            } else {
	                return url;
	            }
	        }
	    }]);
	
	    return Util;
	}();
	
	exports.Util = Util;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var util_1 = __webpack_require__(1);
	/**
	 * A wrapper class to provide a consistent interface to browser based storage
	 *
	 */
	
	var PnPClientStorageWrapper = function () {
	    /**
	     * Creates a new instance of the PnPClientStorageWrapper class
	     *
	     * @constructor
	     */
	    function PnPClientStorageWrapper(store, defaultTimeoutMinutes) {
	        _classCallCheck(this, PnPClientStorageWrapper);
	
	        this.store = store;
	        this.defaultTimeoutMinutes = defaultTimeoutMinutes;
	        this.defaultTimeoutMinutes = defaultTimeoutMinutes === void 0 ? 5 : defaultTimeoutMinutes;
	        this.enabled = this.test();
	    }
	    /**
	     * Get a value from storage, or null if that value does not exist
	     *
	     * @param key The key whose value we want to retrieve
	     */
	
	
	    _createClass(PnPClientStorageWrapper, [{
	        key: "get",
	        value: function get(key) {
	            if (!this.enabled) {
	                return null;
	            }
	            var o = this.store.getItem(key);
	            if (o == null) {
	                return null;
	            }
	            var persistable = JSON.parse(o);
	            if (new Date(persistable.expiration) <= new Date()) {
	                this.delete(key);
	                return null;
	            } else {
	                return persistable.value;
	            }
	        }
	        /**
	         * Adds a value to the underlying storage
	         *
	         * @param key The key to use when storing the provided value
	         * @param o The value to store
	         * @param expire Optional, if provided the expiration of the item, otherwise the default is used
	         */
	
	    }, {
	        key: "put",
	        value: function put(key, o, expire) {
	            if (this.enabled) {
	                this.store.setItem(key, this.createPersistable(o, expire));
	            }
	        }
	        /**
	         * Deletes a value from the underlying storage
	         *
	         * @param key The key of the pair we want to remove from storage
	         */
	
	    }, {
	        key: "delete",
	        value: function _delete(key) {
	            if (this.enabled) {
	                this.store.removeItem(key);
	            }
	        }
	        /**
	         * Gets an item from the underlying storage, or adds it if it does not exist using the supplied getter function
	         *
	         * @param key The key to use when storing the provided value
	         * @param getter A function which will upon execution provide the desired value
	         * @param expire Optional, if provided the expiration of the item, otherwise the default is used
	         */
	
	    }, {
	        key: "getOrPut",
	        value: function getOrPut(key, getter, expire) {
	            var _this = this;
	
	            if (!this.enabled) {
	                return getter();
	            }
	            return new Promise(function (resolve) {
	                var o = _this.get(key);
	                if (o == null) {
	                    getter().then(function (d) {
	                        _this.put(key, d, expire);
	                        resolve(d);
	                    });
	                } else {
	                    resolve(o);
	                }
	            });
	        }
	        /**
	         * Used to determine if the wrapped storage is available currently
	         */
	
	    }, {
	        key: "test",
	        value: function test() {
	            var str = "test";
	            try {
	                this.store.setItem(str, str);
	                this.store.removeItem(str);
	                return true;
	            } catch (e) {
	                return false;
	            }
	        }
	        /**
	         * Creates the persistable to store
	         */
	
	    }, {
	        key: "createPersistable",
	        value: function createPersistable(o, expire) {
	            if (typeof expire === "undefined") {
	                expire = util_1.Util.dateAdd(new Date(), "minute", this.defaultTimeoutMinutes);
	            }
	            return JSON.stringify({ expiration: expire, value: o });
	        }
	    }]);
	
	    return PnPClientStorageWrapper;
	}();
	
	exports.PnPClientStorageWrapper = PnPClientStorageWrapper;
	/**
	 * A class that will establish wrappers for both local and session storage
	 */
	
	var PnPClientStorage =
	/**
	 * Creates a new instance of the PnPClientStorage class
	 *
	 * @constructor
	 */
	function PnPClientStorage() {
	    _classCallCheck(this, PnPClientStorage);
	
	    this.local = typeof localStorage !== "undefined" ? new PnPClientStorageWrapper(localStorage) : null;
	    this.session = typeof sessionStorage !== "undefined" ? new PnPClientStorageWrapper(sessionStorage) : null;
	};
	
	exports.PnPClientStorage = PnPClientStorage;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var collections_1 = __webpack_require__(4);
	/**
	 * Class used to manage the current application settings
	 *
	 */
	
	var Settings = function () {
	    /**
	     * Creates a new instance of the settings class
	     *
	     * @constructor
	     */
	    function Settings() {
	        _classCallCheck(this, Settings);
	
	        this._settings = new collections_1.Dictionary();
	    }
	    /**
	     * Adds a new single setting, or overwrites a previous setting with the same key
	     *
	     * @param {string} key The key used to store this setting
	     * @param {string} value The setting value to store
	     */
	
	
	    _createClass(Settings, [{
	        key: "add",
	        value: function add(key, value) {
	            this._settings.add(key, value);
	        }
	        /**
	         * Adds a JSON value to the collection as a string, you must use getJSON to rehydrate the object when read
	         *
	         * @param {string} key The key used to store this setting
	         * @param {any} value The setting value to store
	         */
	
	    }, {
	        key: "addJSON",
	        value: function addJSON(key, value) {
	            this._settings.add(key, JSON.stringify(value));
	        }
	        /**
	         * Applies the supplied hash to the setting collection overwriting any existing value, or created new values
	         *
	         * @param {TypedHash<any>} hash The set of values to add
	         */
	
	    }, {
	        key: "apply",
	        value: function apply(hash) {
	            var _this = this;
	
	            return new Promise(function (resolve, reject) {
	                try {
	                    _this._settings.merge(hash);
	                    resolve();
	                } catch (e) {
	                    reject(e);
	                }
	            });
	        }
	        /**
	         * Loads configuration settings into the collection from the supplied provider and returns a Promise
	         *
	         * @param {IConfigurationProvider} provider The provider from which we will load the settings
	         */
	
	    }, {
	        key: "load",
	        value: function load(provider) {
	            var _this2 = this;
	
	            return new Promise(function (resolve, reject) {
	                provider.getConfiguration().then(function (value) {
	                    _this2._settings.merge(value);
	                    resolve();
	                }).catch(function (reason) {
	                    reject(reason);
	                });
	            });
	        }
	        /**
	         * Gets a value from the configuration
	         *
	         * @param {string} key The key whose value we want to return. Returns null if the key does not exist
	         * @return {string} string value from the configuration
	         */
	
	    }, {
	        key: "get",
	        value: function get(key) {
	            return this._settings.get(key);
	        }
	        /**
	         * Gets a JSON value, rehydrating the stored string to the original object
	         *
	         * @param {string} key The key whose value we want to return. Returns null if the key does not exist
	         * @return {any} object from the configuration
	         */
	
	    }, {
	        key: "getJSON",
	        value: function getJSON(key) {
	            var o = this.get(key);
	            if (typeof o === "undefined" || o === null) {
	                return o;
	            }
	            return JSON.parse(o);
	        }
	    }]);
	
	    return Settings;
	}();
	
	exports.Settings = Settings;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Generic dictionary
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dictionary = function () {
	    /**
	     * Creates a new instance of the Dictionary<T> class
	     *
	     * @constructor
	     */
	    function Dictionary() {
	        var keys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	        var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	        _classCallCheck(this, Dictionary);
	
	        this.keys = keys;
	        this.values = values;
	    }
	    /**
	     * Gets a value from the collection using the specified key
	     *
	     * @param key The key whose value we want to return, returns null if the key does not exist
	     */
	
	
	    _createClass(Dictionary, [{
	        key: "get",
	        value: function get(key) {
	            var index = this.keys.indexOf(key);
	            if (index < 0) {
	                return null;
	            }
	            return this.values[index];
	        }
	        /**
	         * Adds the supplied key and value to the dictionary
	         *
	         * @param key The key to add
	         * @param o The value to add
	         */
	
	    }, {
	        key: "add",
	        value: function add(key, o) {
	            var index = this.keys.indexOf(key);
	            if (index > -1) {
	                this.values[index] = o;
	            } else {
	                this.keys.push(key);
	                this.values.push(o);
	            }
	        }
	        /**
	         * Merges the supplied typed hash into this dictionary instance. Existing values are updated and new ones are created as appropriate.
	         */
	
	    }, {
	        key: "merge",
	        value: function merge(source) {
	            var _this = this;
	
	            if ("getKeys" in source) {
	                (function () {
	                    var sourceAsDictionary = source;
	                    sourceAsDictionary.getKeys().map(function (key) {
	                        _this.add(key, sourceAsDictionary.get(key));
	                    });
	                })();
	            } else {
	                var sourceAsHash = source;
	                for (var key in sourceAsHash) {
	                    if (sourceAsHash.hasOwnProperty(key)) {
	                        this.add(key, sourceAsHash[key]);
	                    }
	                }
	            }
	        }
	        /**
	         * Removes a value from the dictionary
	         *
	         * @param key The key of the key/value pair to remove. Returns null if the key was not found.
	         */
	
	    }, {
	        key: "remove",
	        value: function remove(key) {
	            var index = this.keys.indexOf(key);
	            if (index < 0) {
	                return null;
	            }
	            var val = this.values[index];
	            this.keys.splice(index, 1);
	            this.values.splice(index, 1);
	            return val;
	        }
	        /**
	         * Returns all the keys currently in the dictionary as an array
	         */
	
	    }, {
	        key: "getKeys",
	        value: function getKeys() {
	            return this.keys;
	        }
	        /**
	         * Returns all the values currently in the dictionary as an array
	         */
	
	    }, {
	        key: "getValues",
	        value: function getValues() {
	            return this.values;
	        }
	        /**
	         * Clears the current dictionary
	         */
	
	    }, {
	        key: "clear",
	        value: function clear() {
	            this.keys = [];
	            this.values = [];
	        }
	        /**
	         * Gets a count of the items currently in the dictionary
	         */
	
	    }, {
	        key: "count",
	        value: function count() {
	            return this.keys.length;
	        }
	    }]);
	
	    return Dictionary;
	}();
	
	exports.Dictionary = Dictionary;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * A set of logging levels
	 *
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LogLevel;
	(function (LogLevel) {
	    LogLevel[LogLevel["Verbose"] = 0] = "Verbose";
	    LogLevel[LogLevel["Info"] = 1] = "Info";
	    LogLevel[LogLevel["Warning"] = 2] = "Warning";
	    LogLevel[LogLevel["Error"] = 3] = "Error";
	    LogLevel[LogLevel["Off"] = 99] = "Off";
	})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
	/**
	 * Class used to subscribe ILogListener and log messages throughout an application
	 *
	 */
	
	var Logger = function () {
	    function Logger() {
	        _classCallCheck(this, Logger);
	    }
	
	    _createClass(Logger, null, [{
	        key: "subscribe",
	
	        /**
	         * Adds ILogListener instances to the set of subscribed listeners
	         *
	         * @param listeners One or more listeners to subscribe to this log
	         */
	        value: function subscribe() {
	            for (var _len = arguments.length, listeners = Array(_len), _key = 0; _key < _len; _key++) {
	                listeners[_key] = arguments[_key];
	            }
	
	            listeners.map(function (listener) {
	                return Logger.instance.subscribe(listener);
	            });
	        }
	        /**
	         * Clears the subscribers collection, returning the collection before modifiction
	         */
	
	    }, {
	        key: "clearSubscribers",
	        value: function clearSubscribers() {
	            return Logger.instance.clearSubscribers();
	        }
	        /**
	         * Gets the current subscriber count
	         */
	
	    }, {
	        key: "write",
	
	        /**
	         * Writes the supplied string to the subscribed listeners
	         *
	         * @param message The message to write
	         * @param level [Optional] if supplied will be used as the level of the entry (Default: LogLevel.Verbose)
	         */
	        value: function write(message) {
	            var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LogLevel.Verbose;
	
	            Logger.instance.log({ level: level, message: message });
	        }
	        /**
	         * Writes the supplied string to the subscribed listeners
	         *
	         * @param json The json object to stringify and write
	         * @param level [Optional] if supplied will be used as the level of the entry (Default: LogLevel.Verbose)
	         */
	
	    }, {
	        key: "writeJSON",
	        value: function writeJSON(json) {
	            var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LogLevel.Verbose;
	
	            Logger.instance.log({ level: level, message: JSON.stringify(json) });
	        }
	        /**
	         * Logs the supplied entry to the subscribed listeners
	         *
	         * @param entry The message to log
	         */
	
	    }, {
	        key: "log",
	        value: function log(entry) {
	            Logger.instance.log(entry);
	        }
	        /**
	         * Logs performance tracking data for the the execution duration of the supplied function using console.profile
	         *
	         * @param name The name of this profile boundary
	         * @param f The function to execute and track within this performance boundary
	         */
	
	    }, {
	        key: "measure",
	        value: function measure(name, f) {
	            return Logger.instance.measure(name, f);
	        }
	    }, {
	        key: "activeLogLevel",
	        get: function get() {
	            return Logger.instance.activeLogLevel;
	        },
	        set: function set(value) {
	            Logger.instance.activeLogLevel = value;
	        }
	    }, {
	        key: "instance",
	        get: function get() {
	            if (typeof Logger._instance === "undefined" || Logger._instance === null) {
	                Logger._instance = new LoggerImpl();
	            }
	            return Logger._instance;
	        }
	    }, {
	        key: "count",
	        get: function get() {
	            return Logger.instance.count;
	        }
	    }]);
	
	    return Logger;
	}();
	
	exports.Logger = Logger;
	
	var LoggerImpl = function () {
	    function LoggerImpl() {
	        var activeLogLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : LogLevel.Warning;
	        var subscribers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	
	        _classCallCheck(this, LoggerImpl);
	
	        this.activeLogLevel = activeLogLevel;
	        this.subscribers = subscribers;
	    }
	
	    _createClass(LoggerImpl, [{
	        key: "subscribe",
	        value: function subscribe(listener) {
	            this.subscribers.push(listener);
	        }
	    }, {
	        key: "clearSubscribers",
	        value: function clearSubscribers() {
	            var s = this.subscribers.slice(0);
	            this.subscribers.length = 0;
	            return s;
	        }
	    }, {
	        key: "write",
	        value: function write(message) {
	            var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LogLevel.Verbose;
	
	            this.log({ level: level, message: message });
	        }
	    }, {
	        key: "log",
	        value: function log(entry) {
	            if (typeof entry === "undefined" || entry.level < this.activeLogLevel) {
	                return;
	            }
	            this.subscribers.map(function (subscriber) {
	                return subscriber.log(entry);
	            });
	        }
	    }, {
	        key: "measure",
	        value: function measure(name, f) {
	            console.profile(name);
	            try {
	                return f();
	            } finally {
	                console.profileEnd();
	            }
	        }
	    }, {
	        key: "count",
	        get: function get() {
	            return this.subscribers.length;
	        }
	    }]);
	
	    return LoggerImpl;
	}();
	/**
	 * Implementation of ILogListener which logs to the browser console
	 *
	 */
	
	
	var ConsoleListener = function () {
	    function ConsoleListener() {
	        _classCallCheck(this, ConsoleListener);
	    }
	
	    _createClass(ConsoleListener, [{
	        key: "log",
	
	        /**
	         * Any associated data that a given logging listener may choose to log or ignore
	         *
	         * @param entry The information to be logged
	         */
	        value: function log(entry) {
	            var msg = this.format(entry);
	            switch (entry.level) {
	                case LogLevel.Verbose:
	                case LogLevel.Info:
	                    console.log(msg);
	                    break;
	                case LogLevel.Warning:
	                    console.warn(msg);
	                    break;
	                case LogLevel.Error:
	                    console.error(msg);
	                    break;
	            }
	        }
	        /**
	         * Formats the message
	         *
	         * @param entry The information to format into a string
	         */
	
	    }, {
	        key: "format",
	        value: function format(entry) {
	            return "Message: " + entry.message + ". Data: " + JSON.stringify(entry.data);
	        }
	    }]);
	
	    return ConsoleListener;
	}();
	
	exports.ConsoleListener = ConsoleListener;
	/**
	 * Implementation of ILogListener which logs to the supplied function
	 *
	 */
	
	var FunctionListener = function () {
	    /**
	     * Creates a new instance of the FunctionListener class
	     *
	     * @constructor
	     * @param  method The method to which any logging data will be passed
	     */
	    function FunctionListener(method) {
	        _classCallCheck(this, FunctionListener);
	
	        this.method = method;
	    }
	    /**
	     * Any associated data that a given logging listener may choose to log or ignore
	     *
	     * @param entry The information to be logged
	     */
	
	
	    _createClass(FunctionListener, [{
	        key: "log",
	        value: function log(entry) {
	            this.method(entry);
	        }
	    }]);
	
	    return FunctionListener;
	}();
	
	exports.FunctionListener = FunctionListener;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var search_1 = __webpack_require__(7);
	var searchsuggest_1 = __webpack_require__(16);
	var site_1 = __webpack_require__(17);
	var webs_1 = __webpack_require__(18);
	var util_1 = __webpack_require__(1);
	var userprofiles_1 = __webpack_require__(37);
	var exceptions_1 = __webpack_require__(14);
	/**
	 * Root of the SharePoint REST module
	 */
	
	var Rest = function () {
	    function Rest() {
	        _classCallCheck(this, Rest);
	    }
	
	    _createClass(Rest, [{
	        key: "searchSuggest",
	
	        /**
	         * Executes a search against this web context
	         *
	         * @param query The SearchQuery definition
	         */
	        value: function searchSuggest(query) {
	            var finalQuery = void 0;
	            if (typeof query === "string") {
	                finalQuery = { querytext: query };
	            } else {
	                finalQuery = query;
	            }
	            return new searchsuggest_1.SearchSuggest("").execute(finalQuery);
	        }
	        /**
	         * Executes a search against this web context
	         *
	         * @param query The SearchQuery definition
	         */
	
	    }, {
	        key: "search",
	        value: function search(query) {
	            var finalQuery = void 0;
	            if (typeof query === "string") {
	                finalQuery = { Querytext: query };
	            } else {
	                finalQuery = query;
	            }
	            return new search_1.Search("").execute(finalQuery);
	        }
	        /**
	         * Begins a site collection scoped REST request
	         *
	         */
	
	    }, {
	        key: "createBatch",
	
	        /**
	         * Creates a new batch object for use with the Queryable.addToBatch method
	         *
	         */
	        value: function createBatch() {
	            return this.web.createBatch();
	        }
	        /**
	         * Begins a cross-domain, host site scoped REST request, for use in add-in webs
	         *
	         * @param addInWebUrl The absolute url of the add-in web
	         * @param hostWebUrl The absolute url of the host web
	         */
	
	    }, {
	        key: "crossDomainSite",
	        value: function crossDomainSite(addInWebUrl, hostWebUrl) {
	            return this._cdImpl(site_1.Site, addInWebUrl, hostWebUrl, "site");
	        }
	        /**
	         * Begins a cross-domain, host web scoped REST request, for use in add-in webs
	         *
	         * @param addInWebUrl The absolute url of the add-in web
	         * @param hostWebUrl The absolute url of the host web
	         */
	
	    }, {
	        key: "crossDomainWeb",
	        value: function crossDomainWeb(addInWebUrl, hostWebUrl) {
	            return this._cdImpl(webs_1.Web, addInWebUrl, hostWebUrl, "web");
	        }
	        /**
	         * Implements the creation of cross domain REST urls
	         *
	         * @param factory The constructor of the object to create Site | Web
	         * @param addInWebUrl The absolute url of the add-in web
	         * @param hostWebUrl The absolute url of the host web
	         * @param urlPart String part to append to the url "site" | "web"
	         */
	
	    }, {
	        key: "_cdImpl",
	        value: function _cdImpl(factory, addInWebUrl, hostWebUrl, urlPart) {
	            if (!util_1.Util.isUrlAbsolute(addInWebUrl)) {
	                throw new exceptions_1.UrlException("The addInWebUrl parameter must be an absolute url.");
	            }
	            if (!util_1.Util.isUrlAbsolute(hostWebUrl)) {
	                throw new exceptions_1.UrlException("The hostWebUrl parameter must be an absolute url.");
	            }
	            var url = util_1.Util.combinePaths(addInWebUrl, "_api/SP.AppContextSite(@target)");
	            var instance = new factory(url, urlPart);
	            instance.query.add("@target", "'" + encodeURIComponent(hostWebUrl) + "'");
	            return instance;
	        }
	    }, {
	        key: "site",
	        get: function get() {
	            return new site_1.Site("");
	        }
	        /**
	         * Begins a web scoped REST request
	         *
	         */
	
	    }, {
	        key: "web",
	        get: function get() {
	            return new webs_1.Web("");
	        }
	        /**
	         * Access to user profile methods
	         *
	         */
	
	    }, {
	        key: "profiles",
	        get: function get() {
	            return new userprofiles_1.UserProfileQuery("");
	        }
	    }]);
	
	    return Rest;
	}();
	
	exports.Rest = Rest;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	var util_1 = __webpack_require__(1);
	/**
	 * Describes the search API
	 *
	 */
	
	var Search = function (_queryable_1$Queryabl) {
	    _inherits(Search, _queryable_1$Queryabl);
	
	    /**
	     * Creates a new instance of the Search class
	     *
	     * @param baseUrl The url for the search context
	     * @param query The SearchQuery object to execute
	     */
	    function Search(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "_api/search/postquery";
	
	        _classCallCheck(this, Search);
	
	        return _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, baseUrl, path));
	    }
	    /**
	     * .......
	     * @returns Promise
	     */
	
	
	    _createClass(Search, [{
	        key: "execute",
	        value: function execute(query) {
	            var formattedBody = void 0;
	            formattedBody = query;
	            if (formattedBody.SelectProperties) {
	                formattedBody.SelectProperties = { results: query.SelectProperties };
	            }
	            if (formattedBody.RefinementFilters) {
	                formattedBody.RefinementFilters = { results: query.RefinementFilters };
	            }
	            if (formattedBody.SortList) {
	                formattedBody.SortList = { results: query.SortList };
	            }
	            if (formattedBody.HithighlightedProperties) {
	                formattedBody.HithighlightedProperties = { results: query.HithighlightedProperties };
	            }
	            if (formattedBody.ReorderingRules) {
	                formattedBody.ReorderingRules = { results: query.ReorderingRules };
	            }
	            if (formattedBody.Properties) {
	                formattedBody.Properties = { results: query.Properties };
	            }
	            var postBody = JSON.stringify({
	                request: util_1.Util.extend({
	                    "__metadata": { "type": "Microsoft.Office.Server.Search.REST.SearchRequest" }
	                }, formattedBody)
	            });
	            return this.post({ body: postBody }).then(function (data) {
	                return new SearchResults(data);
	            });
	        }
	    }]);
	
	    return Search;
	}(queryable_1.QueryableInstance);
	
	exports.Search = Search;
	/**
	 * Describes the SearchResults class, which returns the formatted and raw version of the query response
	 */
	
	var SearchResults = function () {
	    /**
	     * Creates a new instance of the SearchResult class
	     *
	     */
	    function SearchResults(rawResponse) {
	        _classCallCheck(this, SearchResults);
	
	        var response = rawResponse.postquery ? rawResponse.postquery : rawResponse;
	        this.PrimarySearchResults = this.formatSearchResults(response.PrimaryQueryResult.RelevantResults.Table.Rows);
	        this.RawSearchResults = response;
	        this.ElapsedTime = response.ElapsedTime;
	        this.RowCount = response.PrimaryQueryResult.RelevantResults.RowCount;
	        this.TotalRows = response.PrimaryQueryResult.RelevantResults.TotalRows;
	        this.TotalRowsIncludingDuplicates = response.PrimaryQueryResult.RelevantResults.TotalRowsIncludingDuplicates;
	    }
	    /**
	     * Formats a search results array
	     *
	     * @param rawResults The array to process
	     */
	
	
	    _createClass(SearchResults, [{
	        key: "formatSearchResults",
	        value: function formatSearchResults(rawResults) {
	            var results = new Array(),
	                tempResults = rawResults.results ? rawResults.results : rawResults;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;
	
	            try {
	                for (var _iterator = tempResults[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var i = _step.value;
	
	                    results.push(new SearchResult(i.Cells));
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	
	            return results;
	        }
	    }]);
	
	    return SearchResults;
	}();
	
	exports.SearchResults = SearchResults;
	/**
	 * Describes the SearchResult class
	 */
	
	var SearchResult =
	/**
	 * Creates a new instance of the SearchResult class
	 *
	 */
	function SearchResult(rawItem) {
	    _classCallCheck(this, SearchResult);
	
	    var item = rawItem.results ? rawItem.results : rawItem;
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;
	
	    try {
	        for (var _iterator2 = item[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var i = _step2.value;
	
	            Object.defineProperty(this, i.Key, {
	                configurable: false,
	                enumerable: false,
	                value: i.Value,
	                writable: false
	            });
	        }
	    } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                _iterator2.return();
	            }
	        } finally {
	            if (_didIteratorError2) {
	                throw _iteratorError2;
	            }
	        }
	    }
	};
	
	exports.SearchResult = SearchResult;
	/**
	 * defines the SortDirection enum
	 */
	var SortDirection;
	(function (SortDirection) {
	    SortDirection[SortDirection["Ascending"] = 0] = "Ascending";
	    SortDirection[SortDirection["Descending"] = 1] = "Descending";
	    SortDirection[SortDirection["FQLFormula"] = 2] = "FQLFormula";
	})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
	/**
	 * defines the ReorderingRuleMatchType  enum
	 */
	var ReorderingRuleMatchType;
	(function (ReorderingRuleMatchType) {
	    ReorderingRuleMatchType[ReorderingRuleMatchType["ResultContainsKeyword"] = 0] = "ResultContainsKeyword";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["TitleContainsKeyword"] = 1] = "TitleContainsKeyword";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["TitleMatchesKeyword"] = 2] = "TitleMatchesKeyword";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["UrlStartsWith"] = 3] = "UrlStartsWith";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["UrlExactlyMatches"] = 4] = "UrlExactlyMatches";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["ContentTypeIs"] = 5] = "ContentTypeIs";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["FileExtensionMatches"] = 6] = "FileExtensionMatches";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["ResultHasTag"] = 7] = "ResultHasTag";
	    ReorderingRuleMatchType[ReorderingRuleMatchType["ManualCondition"] = 8] = "ManualCondition";
	})(ReorderingRuleMatchType = exports.ReorderingRuleMatchType || (exports.ReorderingRuleMatchType = {}));
	/**
	 * Specifies the type value for the property
	 */
	var QueryPropertyValueType;
	(function (QueryPropertyValueType) {
	    QueryPropertyValueType[QueryPropertyValueType["None"] = 0] = "None";
	    QueryPropertyValueType[QueryPropertyValueType["StringType"] = 1] = "StringType";
	    QueryPropertyValueType[QueryPropertyValueType["Int32TYpe"] = 2] = "Int32TYpe";
	    QueryPropertyValueType[QueryPropertyValueType["BooleanType"] = 3] = "BooleanType";
	    QueryPropertyValueType[QueryPropertyValueType["StringArrayType"] = 4] = "StringArrayType";
	    QueryPropertyValueType[QueryPropertyValueType["UnSupportedType"] = 5] = "UnSupportedType";
	})(QueryPropertyValueType = exports.QueryPropertyValueType || (exports.QueryPropertyValueType = {}));

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var util_1 = __webpack_require__(1);
	var collections_1 = __webpack_require__(4);
	var httpclient_1 = __webpack_require__(9);
	var odata_1 = __webpack_require__(11);
	var caching_1 = __webpack_require__(15);
	var pnplibconfig_1 = __webpack_require__(12);
	var exceptions_1 = __webpack_require__(14);
	/**
	 * Queryable Base Class
	 *
	 */
	
	var Queryable = function () {
	    _createClass(Queryable, [{
	        key: "concat",
	
	        /**
	         * Directly concatonates the supplied string to the current url, not normalizing "/" chars
	         *
	         * @param pathPart The string to concatonate to the url
	         */
	        value: function concat(pathPart) {
	            this._url += pathPart;
	        }
	        /**
	         * Appends the given string and normalizes "/" chars
	         *
	         * @param pathPart The string to append
	         */
	
	    }, {
	        key: "append",
	        value: function append(pathPart) {
	            this._url = util_1.Util.combinePaths(this._url, pathPart);
	        }
	        /**
	         * Blocks a batch call from occuring, MUST be cleared by calling the returned function
	         */
	
	    }, {
	        key: "addBatchDependency",
	        value: function addBatchDependency() {
	            if (this.hasBatch) {
	                return this._batch.addBatchDependency();
	            }
	            return function () {
	                return null;
	            };
	        }
	        /**
	         * Indicates if the current query has a batch associated
	         *
	         */
	
	    }, {
	        key: "hasBatch",
	        get: function get() {
	            return this._batch !== null;
	        }
	        /**
	         * Gets the parent url used when creating this instance
	         *
	         */
	
	    }, {
	        key: "parentUrl",
	        get: function get() {
	            return this._parentUrl;
	        }
	        /**
	         * Provides access to the query builder for this url
	         *
	         */
	
	    }, {
	        key: "query",
	        get: function get() {
	            return this._query;
	        }
	        /**
	         * Creates a new instance of the Queryable class
	         *
	         * @constructor
	         * @param baseUrl A string or Queryable that should form the base part of the url
	         *
	         */
	
	    }]);
	
	    function Queryable(baseUrl, path) {
	        _classCallCheck(this, Queryable);
	
	        this._query = new collections_1.Dictionary();
	        this._batch = null;
	        if (typeof baseUrl === "string") {
	            // we need to do some extra parsing to get the parent url correct if we are
	            // being created from just a string.
	            var urlStr = baseUrl;
	            if (util_1.Util.isUrlAbsolute(urlStr) || urlStr.lastIndexOf("/") < 0) {
	                this._parentUrl = urlStr;
	                this._url = util_1.Util.combinePaths(urlStr, path);
	            } else if (urlStr.lastIndexOf("/") > urlStr.lastIndexOf("(")) {
	                // .../items(19)/fields
	                var index = urlStr.lastIndexOf("/");
	                this._parentUrl = urlStr.slice(0, index);
	                path = util_1.Util.combinePaths(urlStr.slice(index), path);
	                this._url = util_1.Util.combinePaths(this._parentUrl, path);
	            } else {
	                // .../items(19)
	                var _index = urlStr.lastIndexOf("(");
	                this._parentUrl = urlStr.slice(0, _index);
	                this._url = util_1.Util.combinePaths(urlStr, path);
	            }
	        } else {
	            var q = baseUrl;
	            this._parentUrl = q._url;
	            var target = q._query.get("@target");
	            if (target !== null) {
	                this._query.add("@target", target);
	            }
	            this._url = util_1.Util.combinePaths(this._parentUrl, path);
	        }
	    }
	    /**
	     * Adds this query to the supplied batch
	     *
	     * @example
	     * ```
	     *
	     * let b = pnp.sp.createBatch();
	     * pnp.sp.web.inBatch(b).get().then(...);
	     * b.execute().then(...)
	     * ```
	     */
	
	
	    _createClass(Queryable, [{
	        key: "inBatch",
	        value: function inBatch(batch) {
	            if (this._batch !== null) {
	                throw new exceptions_1.AlreadyInBatchException();
	            }
	            this._batch = batch;
	            return this;
	        }
	        /**
	         * Enables caching for this request
	         *
	         * @param options Defines the options used when caching this request
	         */
	
	    }, {
	        key: "usingCaching",
	        value: function usingCaching(options) {
	            if (!pnplibconfig_1.RuntimeConfig.globalCacheDisable) {
	                this._useCaching = true;
	                this._cachingOptions = options;
	            }
	            return this;
	        }
	        /**
	         * Gets the currentl url, made absolute based on the availability of the _spPageContextInfo object
	         *
	         */
	
	    }, {
	        key: "toUrl",
	        value: function toUrl() {
	            return util_1.Util.makeUrlAbsolute(this._url);
	        }
	        /**
	         * Gets the full url with query information
	         *
	         */
	
	    }, {
	        key: "toUrlAndQuery",
	        value: function toUrlAndQuery() {
	            var _this = this;
	
	            var url = this.toUrl();
	            if (this._query.count() > 0) {
	                url += "?";
	                var keys = this._query.getKeys();
	                url += keys.map(function (key) {
	                    return key + "=" + _this._query.get(key);
	                }).join("&");
	            }
	            return url;
	        }
	        /**
	         * Executes the currently built request
	         *
	         */
	
	    }, {
	        key: "get",
	        value: function get() {
	            var parser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new odata_1.ODataDefaultParser();
	            var getOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            return this.getImpl(getOptions, parser);
	        }
	    }, {
	        key: "getAs",
	        value: function getAs() {
	            var parser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new odata_1.ODataDefaultParser();
	            var getOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            return this.getImpl(getOptions, parser);
	        }
	    }, {
	        key: "post",
	        value: function post() {
	            var postOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	            var parser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new odata_1.ODataDefaultParser();
	
	            return this.postImpl(postOptions, parser);
	        }
	    }, {
	        key: "postAs",
	        value: function postAs() {
	            var postOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	            var parser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new odata_1.ODataDefaultParser();
	
	            return this.postImpl(postOptions, parser);
	        }
	    }, {
	        key: "patch",
	        value: function patch() {
	            var patchOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	            var parser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new odata_1.ODataDefaultParser();
	
	            return this.patchImpl(patchOptions, parser);
	        }
	    }, {
	        key: "delete",
	        value: function _delete() {
	            var deleteOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	            var parser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new odata_1.ODataDefaultParser();
	
	            return this.deleteImpl(deleteOptions, parser);
	        }
	        /**
	         * Gets a parent for this instance as specified
	         *
	         * @param factory The contructor for the class to create
	         */
	
	    }, {
	        key: "getParent",
	        value: function getParent(factory) {
	            var baseUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.parentUrl;
	            var path = arguments[2];
	
	            var parent = new factory(baseUrl, path);
	            var target = this.query.get("@target");
	            if (target !== null) {
	                parent.query.add("@target", target);
	            }
	            return parent;
	        }
	    }, {
	        key: "getImpl",
	        value: function getImpl() {
	            var getOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	            var parser = arguments[1];
	
	            if (this._useCaching) {
	                var options = new caching_1.CachingOptions(this.toUrlAndQuery().toLowerCase());
	                if (typeof this._cachingOptions !== "undefined") {
	                    options = util_1.Util.extend(options, this._cachingOptions);
	                }
	                // we may not have a valid store, i.e. on node
	                if (options.store !== null) {
	                    var _ret = function () {
	                        // check if we have the data in cache and if so return a resolved promise
	                        var data = options.store.get(options.key);
	                        if (data !== null) {
	                            return {
	                                v: new Promise(function (resolve) {
	                                    return resolve(data);
	                                })
	                            };
	                        }
	                    }();
	
	                    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	                }
	                // if we don't then wrap the supplied parser in the caching parser wrapper
	                // and send things on their way
	                parser = new caching_1.CachingParserWrapper(parser, options);
	            }
	            if (!this.hasBatch) {
	                // we are not part of a batch, so proceed as normal
	                var client = new httpclient_1.HttpClient();
	                return client.get(this.toUrlAndQuery(), getOptions).then(function (response) {
	                    return parser.parse(response);
	                });
	            } else {
	                return this._batch.add(this.toUrlAndQuery(), "GET", getOptions, parser);
	            }
	        }
	    }, {
	        key: "postImpl",
	        value: function postImpl(postOptions, parser) {
	            if (!this.hasBatch) {
	                // we are not part of a batch, so proceed as normal
	                var client = new httpclient_1.HttpClient();
	                return client.post(this.toUrlAndQuery(), postOptions).then(function (response) {
	                    return parser.parse(response);
	                });
	            } else {
	                return this._batch.add(this.toUrlAndQuery(), "POST", postOptions, parser);
	            }
	        }
	    }, {
	        key: "patchImpl",
	        value: function patchImpl(patchOptions, parser) {
	            if (!this.hasBatch) {
	                // we are not part of a batch, so proceed as normal
	                var client = new httpclient_1.HttpClient();
	                return client.patch(this.toUrlAndQuery(), patchOptions).then(function (response) {
	                    return parser.parse(response);
	                });
	            } else {
	                return this._batch.add(this.toUrlAndQuery(), "PATCH", patchOptions, parser);
	            }
	        }
	    }, {
	        key: "deleteImpl",
	        value: function deleteImpl(deleteOptions, parser) {
	            if (!this.hasBatch) {
	                // we are not part of a batch, so proceed as normal
	                var client = new httpclient_1.HttpClient();
	                return client.delete(this.toUrlAndQuery(), deleteOptions).then(function (response) {
	                    return parser.parse(response);
	                });
	            } else {
	                return this._batch.add(this.toUrlAndQuery(), "DELETE", deleteOptions, parser);
	            }
	        }
	    }]);
	
	    return Queryable;
	}();
	
	exports.Queryable = Queryable;
	/**
	 * Represents a REST collection which can be filtered, paged, and selected
	 *
	 */
	
	var QueryableCollection = function (_Queryable) {
	    _inherits(QueryableCollection, _Queryable);
	
	    function QueryableCollection() {
	        _classCallCheck(this, QueryableCollection);
	
	        return _possibleConstructorReturn(this, (QueryableCollection.__proto__ || Object.getPrototypeOf(QueryableCollection)).apply(this, arguments));
	    }
	
	    _createClass(QueryableCollection, [{
	        key: "filter",
	
	        /**
	         * Filters the returned collection (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#bk_supported)
	         *
	         * @param filter The string representing the filter query
	         */
	        value: function filter(_filter) {
	            this._query.add("$filter", _filter);
	            return this;
	        }
	        /**
	         * Choose which fields to return
	         *
	         * @param selects One or more fields to return
	         */
	
	    }, {
	        key: "select",
	        value: function select() {
	            for (var _len = arguments.length, selects = Array(_len), _key = 0; _key < _len; _key++) {
	                selects[_key] = arguments[_key];
	            }
	
	            this._query.add("$select", selects.join(","));
	            return this;
	        }
	        /**
	         * Expands fields such as lookups to get additional data
	         *
	         * @param expands The Fields for which to expand the values
	         */
	
	    }, {
	        key: "expand",
	        value: function expand() {
	            for (var _len2 = arguments.length, expands = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	                expands[_key2] = arguments[_key2];
	            }
	
	            this._query.add("$expand", expands.join(","));
	            return this;
	        }
	        /**
	         * Orders based on the supplied fields ascending
	         *
	         * @param orderby The name of the field to sort on
	         * @param ascending If false DESC is appended, otherwise ASC (default)
	         */
	
	    }, {
	        key: "orderBy",
	        value: function orderBy(_orderBy) {
	            var ascending = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	            var keys = this._query.getKeys();
	            var query = [];
	            var asc = ascending ? " asc" : " desc";
	            for (var i = 0; i < keys.length; i++) {
	                if (keys[i] === "$orderby") {
	                    query.push(this._query.get("$orderby"));
	                    break;
	                }
	            }
	            query.push("" + _orderBy + asc);
	            this._query.add("$orderby", query.join(","));
	            return this;
	        }
	        /**
	         * Skips the specified number of items
	         *
	         * @param skip The number of items to skip
	         */
	
	    }, {
	        key: "skip",
	        value: function skip(_skip) {
	            this._query.add("$skip", _skip.toString());
	            return this;
	        }
	        /**
	         * Limits the query to only return the specified number of items
	         *
	         * @param top The query row limit
	         */
	
	    }, {
	        key: "top",
	        value: function top(_top) {
	            this._query.add("$top", _top.toString());
	            return this;
	        }
	    }]);
	
	    return QueryableCollection;
	}(Queryable);
	
	exports.QueryableCollection = QueryableCollection;
	/**
	 * Represents an instance that can be selected
	 *
	 */
	
	var QueryableInstance = function (_Queryable2) {
	    _inherits(QueryableInstance, _Queryable2);
	
	    function QueryableInstance() {
	        _classCallCheck(this, QueryableInstance);
	
	        return _possibleConstructorReturn(this, (QueryableInstance.__proto__ || Object.getPrototypeOf(QueryableInstance)).apply(this, arguments));
	    }
	
	    _createClass(QueryableInstance, [{
	        key: "select",
	
	        /**
	         * Choose which fields to return
	         *
	         * @param selects One or more fields to return
	         */
	        value: function select() {
	            for (var _len3 = arguments.length, selects = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	                selects[_key3] = arguments[_key3];
	            }
	
	            this._query.add("$select", selects.join(","));
	            return this;
	        }
	        /**
	         * Expands fields such as lookups to get additional data
	         *
	         * @param expands The Fields for which to expand the values
	         */
	
	    }, {
	        key: "expand",
	        value: function expand() {
	            for (var _len4 = arguments.length, expands = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	                expands[_key4] = arguments[_key4];
	            }
	
	            this._query.add("$expand", expands.join(","));
	            return this;
	        }
	    }]);
	
	    return QueryableInstance;
	}(Queryable);
	
	exports.QueryableInstance = QueryableInstance;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var digestcache_1 = __webpack_require__(10);
	var util_1 = __webpack_require__(1);
	var pnplibconfig_1 = __webpack_require__(12);
	var exceptions_1 = __webpack_require__(14);
	
	var HttpClient = function () {
	    function HttpClient() {
	        _classCallCheck(this, HttpClient);
	
	        this._impl = pnplibconfig_1.RuntimeConfig.fetchClientFactory();
	        this._digestCache = new digestcache_1.DigestCache(this);
	    }
	
	    _createClass(HttpClient, [{
	        key: "fetch",
	        value: function fetch(url) {
	            var _this = this;
	
	            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            var opts = util_1.Util.extend(options, { cache: "no-cache", credentials: "same-origin" }, true);
	            var headers = new Headers();
	            // first we add the global headers so they can be overwritten by any passed in locally to this call
	            this.mergeHeaders(headers, pnplibconfig_1.RuntimeConfig.headers);
	            // second we add the local options so we can overwrite the globals
	            this.mergeHeaders(headers, options.headers);
	            // lastly we apply any default headers we need that may not exist
	            if (!headers.has("Accept")) {
	                headers.append("Accept", "application/json");
	            }
	            if (!headers.has("Content-Type")) {
	                headers.append("Content-Type", "application/json;odata=verbose;charset=utf-8");
	            }
	            if (!headers.has("X-ClientService-ClientTag")) {
	                headers.append("X-ClientService-ClientTag", "PnPCoreJS:2.0.0");
	            }
	            opts = util_1.Util.extend(opts, { headers: headers });
	            if (opts.method && opts.method.toUpperCase() !== "GET") {
	                if (!headers.has("X-RequestDigest")) {
	                    var index = url.indexOf("_api/");
	                    if (index < 0) {
	                        throw new exceptions_1.APIUrlException();
	                    }
	                    var webUrl = url.substr(0, index);
	                    return this._digestCache.getDigest(webUrl).then(function (digest) {
	                        headers.append("X-RequestDigest", digest);
	                        return _this.fetchRaw(url, opts);
	                    });
	                }
	            }
	            return this.fetchRaw(url, opts);
	        }
	    }, {
	        key: "fetchRaw",
	        value: function fetchRaw(url) {
	            var _this2 = this;
	
	            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            // here we need to normalize the headers
	            var rawHeaders = new Headers();
	            this.mergeHeaders(rawHeaders, options.headers);
	            options = util_1.Util.extend(options, { headers: rawHeaders });
	            var retry = function retry(ctx) {
	                _this2._impl.fetch(url, options).then(function (response) {
	                    return ctx.resolve(response);
	                }).catch(function (response) {
	                    // grab our current delay
	                    var delay = ctx.delay;
	                    // Check if request was throttled - http status code 429 
	                    // Check is request failed due to server unavailable - http status code 503 
	                    if (response.status !== 429 && response.status !== 503) {
	                        ctx.reject(response);
	                    }
	                    // Increment our counters.
	                    ctx.delay *= 2;
	                    ctx.attempts++;
	                    // If we have exceeded the retry count, reject.
	                    if (ctx.retryCount <= ctx.attempts) {
	                        ctx.reject(response);
	                    }
	                    // Set our retry timeout for {delay} milliseconds.
	                    setTimeout(util_1.Util.getCtxCallback(_this2, retry, ctx), delay);
	                });
	            };
	            return new Promise(function (resolve, reject) {
	                var retryContext = {
	                    attempts: 0,
	                    delay: 100,
	                    reject: reject,
	                    resolve: resolve,
	                    retryCount: 7
	                };
	                retry.call(_this2, retryContext);
	            });
	        }
	    }, {
	        key: "get",
	        value: function get(url) {
	            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            var opts = util_1.Util.extend(options, { method: "GET" });
	            return this.fetch(url, opts);
	        }
	    }, {
	        key: "post",
	        value: function post(url) {
	            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            var opts = util_1.Util.extend(options, { method: "POST" });
	            return this.fetch(url, opts);
	        }
	    }, {
	        key: "patch",
	        value: function patch(url) {
	            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            var opts = util_1.Util.extend(options, { method: "PATCH" });
	            return this.fetch(url, opts);
	        }
	    }, {
	        key: "delete",
	        value: function _delete(url) {
	            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            var opts = util_1.Util.extend(options, { method: "DELETE" });
	            return this.fetch(url, opts);
	        }
	    }, {
	        key: "mergeHeaders",
	        value: function mergeHeaders(target, source) {
	            if (typeof source !== "undefined" && source !== null) {
	                var temp = new Request("", { headers: source });
	                temp.headers.forEach(function (value, name) {
	                    target.append(name, value);
	                });
	            }
	        }
	    }]);
	
	    return HttpClient;
	}();
	
	exports.HttpClient = HttpClient;
	;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var collections_1 = __webpack_require__(4);
	var util_1 = __webpack_require__(1);
	var odata_1 = __webpack_require__(11);
	
	var CachedDigest = function CachedDigest() {
	    _classCallCheck(this, CachedDigest);
	};
	
	exports.CachedDigest = CachedDigest;
	
	var DigestCache = function () {
	    function DigestCache(_httpClient) {
	        var _digests = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new collections_1.Dictionary();
	
	        _classCallCheck(this, DigestCache);
	
	        this._httpClient = _httpClient;
	        this._digests = _digests;
	    }
	
	    _createClass(DigestCache, [{
	        key: "getDigest",
	        value: function getDigest(webUrl) {
	            var _this = this;
	
	            var cachedDigest = this._digests.get(webUrl);
	            if (cachedDigest !== null) {
	                var now = new Date();
	                if (now < cachedDigest.expiration) {
	                    return Promise.resolve(cachedDigest.value);
	                }
	            }
	            var url = util_1.Util.combinePaths(webUrl, "/_api/contextinfo");
	            return this._httpClient.fetchRaw(url, {
	                cache: "no-cache",
	                credentials: "same-origin",
	                headers: {
	                    "Accept": "application/json;odata=verbose",
	                    "Content-type": "application/json;odata=verbose;charset=utf-8"
	                },
	                method: "POST"
	            }).then(function (response) {
	                var parser = new odata_1.ODataDefaultParser();
	                return parser.parse(response).then(function (d) {
	                    return d.GetContextWebInformation;
	                });
	            }).then(function (data) {
	                var newCachedDigest = new CachedDigest();
	                newCachedDigest.value = data.FormDigestValue;
	                var seconds = data.FormDigestTimeoutSeconds;
	                var expiration = new Date();
	                expiration.setTime(expiration.getTime() + 1000 * seconds);
	                newCachedDigest.expiration = expiration;
	                _this._digests.add(webUrl, newCachedDigest);
	                return newCachedDigest.value;
	            });
	        }
	    }, {
	        key: "clear",
	        value: function clear() {
	            this._digests.clear();
	        }
	    }]);
	
	    return DigestCache;
	}();
	
	exports.DigestCache = DigestCache;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var util_1 = __webpack_require__(1);
	var logging_1 = __webpack_require__(5);
	var httpclient_1 = __webpack_require__(9);
	var pnplibconfig_1 = __webpack_require__(12);
	var exceptions_1 = __webpack_require__(14);
	var exceptions_2 = __webpack_require__(14);
	function extractOdataId(candidate) {
	    if (candidate.hasOwnProperty("odata.id")) {
	        return candidate["odata.id"];
	    } else if (candidate.hasOwnProperty("__metadata") && candidate.__metadata.hasOwnProperty("id")) {
	        return candidate.__metadata.id;
	    } else {
	        throw new exceptions_1.ODataIdException(candidate);
	    }
	}
	exports.extractOdataId = extractOdataId;
	
	var ODataParserBase = function () {
	    function ODataParserBase() {
	        _classCallCheck(this, ODataParserBase);
	    }
	
	    _createClass(ODataParserBase, [{
	        key: "parse",
	        value: function parse(r) {
	            var _this = this;
	
	            return new Promise(function (resolve, reject) {
	                if (_this.handleError(r, reject)) {
	                    if (r.headers.has("Content-Length") && parseFloat(r.headers.get("Content-Length")) === 0 || r.status === 204) {
	                        resolve({});
	                    } else {
	                        r.json().then(function (json) {
	                            return resolve(_this.parseODataJSON(json));
	                        });
	                    }
	                }
	            });
	        }
	    }, {
	        key: "handleError",
	        value: function handleError(r, reject) {
	            if (!r.ok) {
	                r.json().then(function (json) {
	                    reject(new exceptions_2.ProcessHttpClientResponseException(r.status, r.statusText, json));
	                });
	            }
	            return r.ok;
	        }
	    }, {
	        key: "parseODataJSON",
	        value: function parseODataJSON(json) {
	            var result = json;
	            if (json.hasOwnProperty("d")) {
	                if (json.d.hasOwnProperty("results")) {
	                    result = json.d.results;
	                } else {
	                    result = json.d;
	                }
	            } else if (json.hasOwnProperty("value")) {
	                result = json.value;
	            }
	            return result;
	        }
	    }]);
	
	    return ODataParserBase;
	}();
	
	exports.ODataParserBase = ODataParserBase;
	
	var ODataDefaultParser = function (_ODataParserBase) {
	    _inherits(ODataDefaultParser, _ODataParserBase);
	
	    function ODataDefaultParser() {
	        _classCallCheck(this, ODataDefaultParser);
	
	        return _possibleConstructorReturn(this, (ODataDefaultParser.__proto__ || Object.getPrototypeOf(ODataDefaultParser)).apply(this, arguments));
	    }
	
	    return ODataDefaultParser;
	}(ODataParserBase);
	
	exports.ODataDefaultParser = ODataDefaultParser;
	
	var ODataRawParserImpl = function () {
	    function ODataRawParserImpl() {
	        _classCallCheck(this, ODataRawParserImpl);
	    }
	
	    _createClass(ODataRawParserImpl, [{
	        key: "parse",
	        value: function parse(r) {
	            return r.json();
	        }
	    }]);
	
	    return ODataRawParserImpl;
	}();
	
	exports.ODataRawParserImpl = ODataRawParserImpl;
	
	var ODataValueParserImpl = function (_ODataParserBase2) {
	    _inherits(ODataValueParserImpl, _ODataParserBase2);
	
	    function ODataValueParserImpl() {
	        _classCallCheck(this, ODataValueParserImpl);
	
	        return _possibleConstructorReturn(this, (ODataValueParserImpl.__proto__ || Object.getPrototypeOf(ODataValueParserImpl)).apply(this, arguments));
	    }
	
	    _createClass(ODataValueParserImpl, [{
	        key: "parse",
	        value: function parse(r) {
	            return _get(ODataValueParserImpl.prototype.__proto__ || Object.getPrototypeOf(ODataValueParserImpl.prototype), "parse", this).call(this, r).then(function (d) {
	                return d;
	            });
	        }
	    }]);
	
	    return ODataValueParserImpl;
	}(ODataParserBase);
	
	var ODataEntityParserImpl = function (_ODataParserBase3) {
	    _inherits(ODataEntityParserImpl, _ODataParserBase3);
	
	    function ODataEntityParserImpl(factory) {
	        _classCallCheck(this, ODataEntityParserImpl);
	
	        var _this4 = _possibleConstructorReturn(this, (ODataEntityParserImpl.__proto__ || Object.getPrototypeOf(ODataEntityParserImpl)).call(this));
	
	        _this4.factory = factory;
	        return _this4;
	    }
	
	    _createClass(ODataEntityParserImpl, [{
	        key: "parse",
	        value: function parse(r) {
	            var _this5 = this;
	
	            return _get(ODataEntityParserImpl.prototype.__proto__ || Object.getPrototypeOf(ODataEntityParserImpl.prototype), "parse", this).call(this, r).then(function (d) {
	                var o = new _this5.factory(getEntityUrl(d), null);
	                return util_1.Util.extend(o, d);
	            });
	        }
	    }]);
	
	    return ODataEntityParserImpl;
	}(ODataParserBase);
	
	var ODataEntityArrayParserImpl = function (_ODataParserBase4) {
	    _inherits(ODataEntityArrayParserImpl, _ODataParserBase4);
	
	    function ODataEntityArrayParserImpl(factory) {
	        _classCallCheck(this, ODataEntityArrayParserImpl);
	
	        var _this6 = _possibleConstructorReturn(this, (ODataEntityArrayParserImpl.__proto__ || Object.getPrototypeOf(ODataEntityArrayParserImpl)).call(this));
	
	        _this6.factory = factory;
	        return _this6;
	    }
	
	    _createClass(ODataEntityArrayParserImpl, [{
	        key: "parse",
	        value: function parse(r) {
	            var _this7 = this;
	
	            return _get(ODataEntityArrayParserImpl.prototype.__proto__ || Object.getPrototypeOf(ODataEntityArrayParserImpl.prototype), "parse", this).call(this, r).then(function (d) {
	                return d.map(function (v) {
	                    var o = new _this7.factory(getEntityUrl(v), null);
	                    return util_1.Util.extend(o, v);
	                });
	            });
	        }
	    }]);
	
	    return ODataEntityArrayParserImpl;
	}(ODataParserBase);
	
	function getEntityUrl(entity) {
	    if (entity.hasOwnProperty("odata.editLink")) {
	        // we are dealign with minimal metadata (default)
	        return util_1.Util.combinePaths("_api", entity["odata.editLink"]);
	    } else if (entity.hasOwnProperty("__metadata")) {
	        // we are dealing with verbose, which has an absolute uri
	        return entity.__metadata.uri;
	    } else {
	        // we are likely dealing with nometadata, so don't error but we won't be able to
	        // chain off these objects
	        logging_1.Logger.write("No uri information found in ODataEntity parsing, chaining will fail for this object.", logging_1.LogLevel.Warning);
	        return "";
	    }
	}
	exports.ODataRaw = new ODataRawParserImpl();
	function ODataValue() {
	    return new ODataValueParserImpl();
	}
	exports.ODataValue = ODataValue;
	function ODataEntity(factory) {
	    return new ODataEntityParserImpl(factory);
	}
	exports.ODataEntity = ODataEntity;
	function ODataEntityArray(factory) {
	    return new ODataEntityArrayParserImpl(factory);
	}
	exports.ODataEntityArray = ODataEntityArray;
	/**
	 * Manages a batch of OData operations
	 */
	
	var ODataBatch = function () {
	    function ODataBatch(baseUrl) {
	        var _batchId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : util_1.Util.getGUID();
	
	        _classCallCheck(this, ODataBatch);
	
	        this.baseUrl = baseUrl;
	        this._batchId = _batchId;
	        this._requests = [];
	        this._batchDependencies = Promise.resolve();
	    }
	    /**
	     * Adds a request to a batch (not designed for public use)
	     *
	     * @param url The full url of the request
	     * @param method The http method GET, POST, etc
	     * @param options Any options to include in the request
	     * @param parser The parser that will hadle the results of the request
	     */
	
	
	    _createClass(ODataBatch, [{
	        key: "add",
	        value: function add(url, method, options, parser) {
	            var info = {
	                method: method.toUpperCase(),
	                options: options,
	                parser: parser,
	                reject: null,
	                resolve: null,
	                url: url
	            };
	            var p = new Promise(function (resolve, reject) {
	                info.resolve = resolve;
	                info.reject = reject;
	            });
	            this._requests.push(info);
	            return p;
	        }
	    }, {
	        key: "addBatchDependency",
	        value: function addBatchDependency() {
	            var resolver = void 0;
	            var promise = new Promise(function (resolve) {
	                resolver = resolve;
	            });
	            this._batchDependencies = this._batchDependencies.then(function () {
	                return promise;
	            });
	            return resolver;
	        }
	        /**
	         * Execute the current batch and resolve the associated promises
	         *
	         * @returns A promise which will be resolved once all of the batch's child promises have resolved
	         */
	
	    }, {
	        key: "execute",
	        value: function execute() {
	            var _this8 = this;
	
	            return this._batchDependencies.then(function () {
	                return _this8.executeImpl();
	            });
	        }
	    }, {
	        key: "executeImpl",
	        value: function executeImpl() {
	            var _this9 = this;
	
	            // if we don't have any requests, don't bother sending anything
	            // this could be due to caching further upstream, or just an empty batch 
	            if (this._requests.length < 1) {
	                return Promise.resolve();
	            }
	            // build all the requests, send them, pipe results in order to parsers
	            var batchBody = [];
	            var currentChangeSetId = "";
	            this._requests.map(function (reqInfo) {
	                if (reqInfo.method === "GET") {
	                    if (currentChangeSetId.length > 0) {
	                        // end an existing change set
	                        batchBody.push("--changeset_" + currentChangeSetId + "--\n\n");
	                        currentChangeSetId = "";
	                    }
	                    batchBody.push("--batch_" + _this9._batchId + "\n");
	                } else {
	                    if (currentChangeSetId.length < 1) {
	                        // start new change set
	                        currentChangeSetId = util_1.Util.getGUID();
	                        batchBody.push("--batch_" + _this9._batchId + "\n");
	                        batchBody.push("Content-Type: multipart/mixed; boundary=\"changeset_" + currentChangeSetId + "\"\n\n");
	                    }
	                    batchBody.push("--changeset_" + currentChangeSetId + "\n");
	                }
	                // common batch part prefix
	                batchBody.push("Content-Type: application/http\n");
	                batchBody.push("Content-Transfer-Encoding: binary\n\n");
	                var headers = {
	                    "Accept": "application/json;"
	                };
	                if (reqInfo.method !== "GET") {
	                    var method = reqInfo.method;
	                    if (reqInfo.hasOwnProperty("options") && reqInfo.options.hasOwnProperty("headers") && typeof reqInfo.options.headers["X-HTTP-Method"] !== "undefined") {
	                        method = reqInfo.options.headers["X-HTTP-Method"];
	                        delete reqInfo.options.headers["X-HTTP-Method"];
	                    }
	                    batchBody.push(method + " " + reqInfo.url + " HTTP/1.1\n");
	                    headers = util_1.Util.extend(headers, { "Content-Type": "application/json;odata=verbose;charset=utf-8" });
	                } else {
	                    batchBody.push(reqInfo.method + " " + reqInfo.url + " HTTP/1.1\n");
	                }
	                if (typeof pnplibconfig_1.RuntimeConfig.headers !== "undefined") {
	                    headers = util_1.Util.extend(headers, pnplibconfig_1.RuntimeConfig.headers);
	                }
	                if (reqInfo.options && reqInfo.options.headers) {
	                    headers = util_1.Util.extend(headers, reqInfo.options.headers);
	                }
	                for (var name in headers) {
	                    if (headers.hasOwnProperty(name)) {
	                        batchBody.push(name + ": " + headers[name] + "\n");
	                    }
	                }
	                batchBody.push("\n");
	                if (reqInfo.options.body) {
	                    batchBody.push(reqInfo.options.body + "\n\n");
	                }
	            });
	            if (currentChangeSetId.length > 0) {
	                // Close the changeset
	                batchBody.push("--changeset_" + currentChangeSetId + "--\n\n");
	                currentChangeSetId = "";
	            }
	            batchBody.push("--batch_" + this._batchId + "--\n");
	            var batchHeaders = {
	                "Content-Type": "multipart/mixed; boundary=batch_" + this._batchId
	            };
	            var batchOptions = {
	                "body": batchBody.join(""),
	                "headers": batchHeaders
	            };
	            var client = new httpclient_1.HttpClient();
	            var requestUrl = util_1.Util.makeUrlAbsolute(util_1.Util.combinePaths(this.baseUrl, "/_api/$batch"));
	            return client.post(requestUrl, batchOptions).then(function (r) {
	                return r.text();
	            }).then(this._parseResponse).then(function (responses) {
	                if (responses.length !== _this9._requests.length) {
	                    throw new exceptions_1.BatchParseException("Could not properly parse responses to match requests in batch.");
	                }
	                return responses.reduce(function (chain, response, index) {
	                    var request = _this9._requests[index];
	                    if (!response.ok) {
	                        request.reject(new Error(response.statusText));
	                    }
	                    return chain.then(function (_) {
	                        return request.parser.parse(response).then(request.resolve).catch(request.reject);
	                    });
	                }, Promise.resolve());
	            });
	        }
	        /**
	         * Parses the response from a batch request into an array of Response instances
	         *
	         * @param body Text body of the response from the batch request
	         */
	
	    }, {
	        key: "_parseResponse",
	        value: function _parseResponse(body) {
	            return new Promise(function (resolve, reject) {
	                var responses = [];
	                var header = "--batchresponse_";
	                // Ex. "HTTP/1.1 500 Internal Server Error"
	                var statusRegExp = new RegExp("^HTTP/[0-9.]+ +([0-9]+) +(.*)", "i");
	                var lines = body.split("\n");
	                var state = "batch";
	                var status = void 0;
	                var statusText = void 0;
	                for (var i = 0; i < lines.length; ++i) {
	                    var line = lines[i];
	                    switch (state) {
	                        case "batch":
	                            if (line.substr(0, header.length) === header) {
	                                state = "batchHeaders";
	                            } else {
	                                if (line.trim() !== "") {
	                                    throw new exceptions_1.BatchParseException("Invalid response, line " + i);
	                                }
	                            }
	                            break;
	                        case "batchHeaders":
	                            if (line.trim() === "") {
	                                state = "status";
	                            }
	                            break;
	                        case "status":
	                            var parts = statusRegExp.exec(line);
	                            if (parts.length !== 3) {
	                                throw new exceptions_1.BatchParseException("Invalid status, line " + i);
	                            }
	                            status = parseInt(parts[1], 10);
	                            statusText = parts[2];
	                            state = "statusHeaders";
	                            break;
	                        case "statusHeaders":
	                            if (line.trim() === "") {
	                                state = "body";
	                            }
	                            break;
	                        case "body":
	                            responses.push(status === 204 ? new Response() : new Response(line, { status: status, statusText: statusText }));
	                            state = "batch";
	                            break;
	                    }
	                }
	                if (state !== "status") {
	                    reject(new exceptions_1.BatchParseException("Unexpected end of input"));
	                }
	                resolve(responses);
	            });
	        }
	    }]);
	
	    return ODataBatch;
	}();
	
	exports.ODataBatch = ODataBatch;
	
	var TextFileParser = function () {
	    function TextFileParser() {
	        _classCallCheck(this, TextFileParser);
	    }
	
	    _createClass(TextFileParser, [{
	        key: "parse",
	        value: function parse(r) {
	            return r.text();
	        }
	    }]);
	
	    return TextFileParser;
	}();
	
	exports.TextFileParser = TextFileParser;
	
	var BlobFileParser = function () {
	    function BlobFileParser() {
	        _classCallCheck(this, BlobFileParser);
	    }
	
	    _createClass(BlobFileParser, [{
	        key: "parse",
	        value: function parse(r) {
	            return r.blob();
	        }
	    }]);
	
	    return BlobFileParser;
	}();
	
	exports.BlobFileParser = BlobFileParser;
	
	var JSONFileParser = function () {
	    function JSONFileParser() {
	        _classCallCheck(this, JSONFileParser);
	    }
	
	    _createClass(JSONFileParser, [{
	        key: "parse",
	        value: function parse(r) {
	            return r.json();
	        }
	    }]);
	
	    return JSONFileParser;
	}();
	
	exports.JSONFileParser = JSONFileParser;
	
	var BufferFileParser = function () {
	    function BufferFileParser() {
	        _classCallCheck(this, BufferFileParser);
	    }
	
	    _createClass(BufferFileParser, [{
	        key: "parse",
	        value: function parse(r) {
	            if (util_1.Util.isFunction(r.arrayBuffer)) {
	                return r.arrayBuffer();
	            }
	            return r.buffer();
	        }
	    }]);
	
	    return BufferFileParser;
	}();
	
	exports.BufferFileParser = BufferFileParser;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var fetchclient_1 = __webpack_require__(13);
	
	var RuntimeConfigImpl = function () {
	    function RuntimeConfigImpl() {
	        _classCallCheck(this, RuntimeConfigImpl);
	
	        // these are our default values for the library
	        this._headers = null;
	        this._defaultCachingStore = "session";
	        this._defaultCachingTimeoutSeconds = 30;
	        this._globalCacheDisable = false;
	        this._fetchClientFactory = function () {
	            return new fetchclient_1.FetchClient();
	        };
	    }
	
	    _createClass(RuntimeConfigImpl, [{
	        key: "set",
	        value: function set(config) {
	            if (config.hasOwnProperty("headers")) {
	                this._headers = config.headers;
	            }
	            if (config.hasOwnProperty("globalCacheDisable")) {
	                this._globalCacheDisable = config.globalCacheDisable;
	            }
	            if (config.hasOwnProperty("defaultCachingStore")) {
	                this._defaultCachingStore = config.defaultCachingStore;
	            }
	            if (config.hasOwnProperty("defaultCachingTimeoutSeconds")) {
	                this._defaultCachingTimeoutSeconds = config.defaultCachingTimeoutSeconds;
	            }
	            if (config.hasOwnProperty("fetchClientFactory")) {
	                this._fetchClientFactory = config.fetchClientFactory;
	            }
	        }
	    }, {
	        key: "headers",
	        get: function get() {
	            return this._headers;
	        }
	    }, {
	        key: "defaultCachingStore",
	        get: function get() {
	            return this._defaultCachingStore;
	        }
	    }, {
	        key: "defaultCachingTimeoutSeconds",
	        get: function get() {
	            return this._defaultCachingTimeoutSeconds;
	        }
	    }, {
	        key: "globalCacheDisable",
	        get: function get() {
	            return this._globalCacheDisable;
	        }
	    }, {
	        key: "fetchClientFactory",
	        get: function get() {
	            return this._fetchClientFactory;
	        }
	    }]);
	
	    return RuntimeConfigImpl;
	}();
	
	exports.RuntimeConfigImpl = RuntimeConfigImpl;
	var _runtimeConfig = new RuntimeConfigImpl();
	exports.RuntimeConfig = _runtimeConfig;
	function setRuntimeConfig(config) {
	    _runtimeConfig.set(config);
	}
	exports.setRuntimeConfig = setRuntimeConfig;

/***/ },
/* 13 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	/**
	 * Makes requests using the fetch API
	 */
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FetchClient = function () {
	    function FetchClient() {
	        _classCallCheck(this, FetchClient);
	    }
	
	    _createClass(FetchClient, [{
	        key: "fetch",
	        value: function fetch(url, options) {
	            return global.fetch(url, options);
	        }
	    }]);
	
	    return FetchClient;
	}();
	
	exports.FetchClient = FetchClient;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var logging_1 = __webpack_require__(5);
	function defaultLog(error) {
	    logging_1.Logger.log({ data: {}, level: logging_1.LogLevel.Error, message: "[" + error.name + "]::" + error.message });
	}
	/**
	 * Represents an exception with an HttpClient request
	 *
	 */
	
	var ProcessHttpClientResponseException = function (_Error) {
	    _inherits(ProcessHttpClientResponseException, _Error);
	
	    function ProcessHttpClientResponseException(status, statusText, data) {
	        _classCallCheck(this, ProcessHttpClientResponseException);
	
	        var _this = _possibleConstructorReturn(this, (ProcessHttpClientResponseException.__proto__ || Object.getPrototypeOf(ProcessHttpClientResponseException)).call(this, "Error making HttpClient request in queryable: [" + status + "] " + statusText));
	
	        _this.status = status;
	        _this.statusText = statusText;
	        _this.data = data;
	        _this.name = "ProcessHttpClientResponseException";
	        logging_1.Logger.log({ data: _this.data, level: logging_1.LogLevel.Error, message: _this.message });
	        return _this;
	    }
	
	    return ProcessHttpClientResponseException;
	}(Error);
	
	exports.ProcessHttpClientResponseException = ProcessHttpClientResponseException;
	
	var NoCacheAvailableException = function (_Error2) {
	    _inherits(NoCacheAvailableException, _Error2);
	
	    function NoCacheAvailableException() {
	        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Cannot create a caching configuration provider since cache is not available.";
	
	        _classCallCheck(this, NoCacheAvailableException);
	
	        var _this2 = _possibleConstructorReturn(this, (NoCacheAvailableException.__proto__ || Object.getPrototypeOf(NoCacheAvailableException)).call(this, msg));
	
	        _this2.name = "NoCacheAvailableException";
	        defaultLog(_this2);
	        return _this2;
	    }
	
	    return NoCacheAvailableException;
	}(Error);
	
	exports.NoCacheAvailableException = NoCacheAvailableException;
	
	var APIUrlException = function (_Error3) {
	    _inherits(APIUrlException, _Error3);
	
	    function APIUrlException() {
	        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Unable to determine API url.";
	
	        _classCallCheck(this, APIUrlException);
	
	        var _this3 = _possibleConstructorReturn(this, (APIUrlException.__proto__ || Object.getPrototypeOf(APIUrlException)).call(this, msg));
	
	        _this3.name = "APIUrlException";
	        defaultLog(_this3);
	        return _this3;
	    }
	
	    return APIUrlException;
	}(Error);
	
	exports.APIUrlException = APIUrlException;
	
	var AuthUrlException = function (_Error4) {
	    _inherits(AuthUrlException, _Error4);
	
	    function AuthUrlException(data) {
	        var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Auth URL Endpoint could not be determined from data. Data logged.";
	
	        _classCallCheck(this, AuthUrlException);
	
	        var _this4 = _possibleConstructorReturn(this, (AuthUrlException.__proto__ || Object.getPrototypeOf(AuthUrlException)).call(this, msg));
	
	        _this4.name = "APIUrlException";
	        logging_1.Logger.log({ data: data, level: logging_1.LogLevel.Error, message: _this4.message });
	        return _this4;
	    }
	
	    return AuthUrlException;
	}(Error);
	
	exports.AuthUrlException = AuthUrlException;
	
	var NodeFetchClientUnsupportedException = function (_Error5) {
	    _inherits(NodeFetchClientUnsupportedException, _Error5);
	
	    function NodeFetchClientUnsupportedException() {
	        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Using NodeFetchClient in the browser is not supported.";
	
	        _classCallCheck(this, NodeFetchClientUnsupportedException);
	
	        var _this5 = _possibleConstructorReturn(this, (NodeFetchClientUnsupportedException.__proto__ || Object.getPrototypeOf(NodeFetchClientUnsupportedException)).call(this, msg));
	
	        _this5.name = "NodeFetchClientUnsupportedException";
	        defaultLog(_this5);
	        return _this5;
	    }
	
	    return NodeFetchClientUnsupportedException;
	}(Error);
	
	exports.NodeFetchClientUnsupportedException = NodeFetchClientUnsupportedException;
	
	var SPRequestExecutorUndefinedException = function (_Error6) {
	    _inherits(SPRequestExecutorUndefinedException, _Error6);
	
	    function SPRequestExecutorUndefinedException() {
	        _classCallCheck(this, SPRequestExecutorUndefinedException);
	
	        var msg = ["SP.RequestExecutor is undefined. ", "Load the SP.RequestExecutor.js library (/_layouts/15/SP.RequestExecutor.js) before loading the PnP JS Core library."].join(" ");
	
	        var _this6 = _possibleConstructorReturn(this, (SPRequestExecutorUndefinedException.__proto__ || Object.getPrototypeOf(SPRequestExecutorUndefinedException)).call(this, msg));
	
	        _this6.name = "SPRequestExecutorUndefinedException";
	        defaultLog(_this6);
	        return _this6;
	    }
	
	    return SPRequestExecutorUndefinedException;
	}(Error);
	
	exports.SPRequestExecutorUndefinedException = SPRequestExecutorUndefinedException;
	
	var MaxCommentLengthException = function (_Error7) {
	    _inherits(MaxCommentLengthException, _Error7);
	
	    function MaxCommentLengthException() {
	        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "The maximum comment length is 1023 characters.";
	
	        _classCallCheck(this, MaxCommentLengthException);
	
	        var _this7 = _possibleConstructorReturn(this, (MaxCommentLengthException.__proto__ || Object.getPrototypeOf(MaxCommentLengthException)).call(this, msg));
	
	        _this7.name = "MaxCommentLengthException";
	        defaultLog(_this7);
	        return _this7;
	    }
	
	    return MaxCommentLengthException;
	}(Error);
	
	exports.MaxCommentLengthException = MaxCommentLengthException;
	
	var NotSupportedInBatchException = function (_Error8) {
	    _inherits(NotSupportedInBatchException, _Error8);
	
	    function NotSupportedInBatchException() {
	        var operation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "This operation";
	
	        _classCallCheck(this, NotSupportedInBatchException);
	
	        var _this8 = _possibleConstructorReturn(this, (NotSupportedInBatchException.__proto__ || Object.getPrototypeOf(NotSupportedInBatchException)).call(this, operation + " is not supported as part of a batch."));
	
	        _this8.name = "NotSupportedInBatchException";
	        defaultLog(_this8);
	        return _this8;
	    }
	
	    return NotSupportedInBatchException;
	}(Error);
	
	exports.NotSupportedInBatchException = NotSupportedInBatchException;
	
	var ODataIdException = function (_Error9) {
	    _inherits(ODataIdException, _Error9);
	
	    function ODataIdException(data) {
	        var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Could not extract odata id in object, you may be using nometadata. Object data logged to logger.";
	
	        _classCallCheck(this, ODataIdException);
	
	        var _this9 = _possibleConstructorReturn(this, (ODataIdException.__proto__ || Object.getPrototypeOf(ODataIdException)).call(this, msg));
	
	        _this9.name = "ODataIdException";
	        logging_1.Logger.log({ data: data, level: logging_1.LogLevel.Error, message: _this9.message });
	        return _this9;
	    }
	
	    return ODataIdException;
	}(Error);
	
	exports.ODataIdException = ODataIdException;
	
	var BatchParseException = function (_Error10) {
	    _inherits(BatchParseException, _Error10);
	
	    function BatchParseException(msg) {
	        _classCallCheck(this, BatchParseException);
	
	        var _this10 = _possibleConstructorReturn(this, (BatchParseException.__proto__ || Object.getPrototypeOf(BatchParseException)).call(this, msg));
	
	        _this10.name = "BatchParseException";
	        defaultLog(_this10);
	        return _this10;
	    }
	
	    return BatchParseException;
	}(Error);
	
	exports.BatchParseException = BatchParseException;
	
	var AlreadyInBatchException = function (_Error11) {
	    _inherits(AlreadyInBatchException, _Error11);
	
	    function AlreadyInBatchException() {
	        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "This query is already part of a batch.";
	
	        _classCallCheck(this, AlreadyInBatchException);
	
	        var _this11 = _possibleConstructorReturn(this, (AlreadyInBatchException.__proto__ || Object.getPrototypeOf(AlreadyInBatchException)).call(this, msg));
	
	        _this11.name = "AlreadyInBatchException";
	        defaultLog(_this11);
	        return _this11;
	    }
	
	    return AlreadyInBatchException;
	}(Error);
	
	exports.AlreadyInBatchException = AlreadyInBatchException;
	
	var FunctionExpectedException = function (_Error12) {
	    _inherits(FunctionExpectedException, _Error12);
	
	    function FunctionExpectedException() {
	        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "This query is already part of a batch.";
	
	        _classCallCheck(this, FunctionExpectedException);
	
	        var _this12 = _possibleConstructorReturn(this, (FunctionExpectedException.__proto__ || Object.getPrototypeOf(FunctionExpectedException)).call(this, msg));
	
	        _this12.name = "FunctionExpectedException";
	        defaultLog(_this12);
	        return _this12;
	    }
	
	    return FunctionExpectedException;
	}(Error);
	
	exports.FunctionExpectedException = FunctionExpectedException;
	
	var UrlException = function (_Error13) {
	    _inherits(UrlException, _Error13);
	
	    function UrlException(msg) {
	        _classCallCheck(this, UrlException);
	
	        var _this13 = _possibleConstructorReturn(this, (UrlException.__proto__ || Object.getPrototypeOf(UrlException)).call(this, msg));
	
	        _this13.name = "UrlException";
	        defaultLog(_this13);
	        return _this13;
	    }
	
	    return UrlException;
	}(Error);
	
	exports.UrlException = UrlException;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var storage_1 = __webpack_require__(2);
	var util_1 = __webpack_require__(1);
	var pnplibconfig_1 = __webpack_require__(12);
	
	var CachingOptions = function () {
	    function CachingOptions(key) {
	        _classCallCheck(this, CachingOptions);
	
	        this.key = key;
	        this.expiration = util_1.Util.dateAdd(new Date(), "second", pnplibconfig_1.RuntimeConfig.defaultCachingTimeoutSeconds);
	        this.storeName = pnplibconfig_1.RuntimeConfig.defaultCachingStore;
	    }
	
	    _createClass(CachingOptions, [{
	        key: "store",
	        get: function get() {
	            if (this.storeName === "local") {
	                return CachingOptions.storage.local;
	            } else {
	                return CachingOptions.storage.session;
	            }
	        }
	    }]);
	
	    return CachingOptions;
	}();
	
	CachingOptions.storage = new storage_1.PnPClientStorage();
	exports.CachingOptions = CachingOptions;
	
	var CachingParserWrapper = function () {
	    function CachingParserWrapper(_parser, _cacheOptions) {
	        _classCallCheck(this, CachingParserWrapper);
	
	        this._parser = _parser;
	        this._cacheOptions = _cacheOptions;
	    }
	
	    _createClass(CachingParserWrapper, [{
	        key: "parse",
	        value: function parse(response) {
	            var _this = this;
	
	            // add this to the cache based on the options
	            return this._parser.parse(response).then(function (data) {
	                if (_this._cacheOptions.store !== null) {
	                    _this._cacheOptions.store.put(_this._cacheOptions.key, data, _this._cacheOptions.expiration);
	                }
	                return data;
	            });
	        }
	    }]);
	
	    return CachingParserWrapper;
	}();
	
	exports.CachingParserWrapper = CachingParserWrapper;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	
	var SearchSuggest = function (_queryable_1$Queryabl) {
	    _inherits(SearchSuggest, _queryable_1$Queryabl);
	
	    function SearchSuggest(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "_api/search/suggest";
	
	        _classCallCheck(this, SearchSuggest);
	
	        return _possibleConstructorReturn(this, (SearchSuggest.__proto__ || Object.getPrototypeOf(SearchSuggest)).call(this, baseUrl, path));
	    }
	
	    _createClass(SearchSuggest, [{
	        key: "execute",
	        value: function execute(query) {
	            this.mapQueryToQueryString(query);
	            return this.get().then(function (response) {
	                return new SearchSuggestResult(response);
	            });
	        }
	    }, {
	        key: "mapQueryToQueryString",
	        value: function mapQueryToQueryString(query) {
	            this.query.add("querytext", "'" + query.querytext + "'");
	            if (query.hasOwnProperty("count")) {
	                this.query.add("inumberofquerysuggestions", query.count.toString());
	            }
	            if (query.hasOwnProperty("personalCount")) {
	                this.query.add("inumberofresultsuggestions", query.personalCount.toString());
	            }
	            if (query.hasOwnProperty("preQuery")) {
	                this.query.add("fprequerysuggestions", query.preQuery.toString());
	            }
	            if (query.hasOwnProperty("hitHighlighting")) {
	                this.query.add("fhithighlighting", query.hitHighlighting.toString());
	            }
	            if (query.hasOwnProperty("capitalize")) {
	                this.query.add("fcapitalizefirstletters", query.capitalize.toString());
	            }
	            if (query.hasOwnProperty("culture")) {
	                this.query.add("culture", query.culture.toString());
	            }
	            if (query.hasOwnProperty("stemming")) {
	                this.query.add("enablestemming", query.stemming.toString());
	            }
	            if (query.hasOwnProperty("includePeople")) {
	                this.query.add("showpeoplenamesuggestions", query.includePeople.toString());
	            }
	            if (query.hasOwnProperty("queryRules")) {
	                this.query.add("enablequeryrules", query.queryRules.toString());
	            }
	            if (query.hasOwnProperty("prefixMatch")) {
	                this.query.add("fprefixmatchallterms", query.prefixMatch.toString());
	            }
	        }
	    }]);
	
	    return SearchSuggest;
	}(queryable_1.QueryableInstance);
	
	exports.SearchSuggest = SearchSuggest;
	
	var SearchSuggestResult = function SearchSuggestResult(json) {
	    _classCallCheck(this, SearchSuggestResult);
	
	    if (json.hasOwnProperty("suggest")) {
	        // verbose
	        this.PeopleNames = json.suggest.PeopleNames.results;
	        this.PersonalResults = json.suggest.PersonalResults.results;
	        this.Queries = json.suggest.Queries.results;
	    } else {
	        this.PeopleNames = json.PeopleNames;
	        this.PersonalResults = json.PersonalResults;
	        this.Queries = json.Queries;
	    }
	};
	
	exports.SearchSuggestResult = SearchSuggestResult;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	var webs_1 = __webpack_require__(18);
	var usercustomactions_1 = __webpack_require__(34);
	var odata_1 = __webpack_require__(11);
	var features_1 = __webpack_require__(36);
	/**
	 * Describes a site collection
	 *
	 */
	
	var Site = function (_queryable_1$Queryabl) {
	    _inherits(Site, _queryable_1$Queryabl);
	
	    /**
	     * Creates a new instance of the RoleAssignments class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Site(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "_api/site";
	
	        _classCallCheck(this, Site);
	
	        return _possibleConstructorReturn(this, (Site.__proto__ || Object.getPrototypeOf(Site)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets the root web of the site collection
	     *
	     */
	
	
	    _createClass(Site, [{
	        key: "getContextInfo",
	
	        /**
	         * Gets the context information for the site.
	         */
	        value: function getContextInfo() {
	            var q = new Site(this.parentUrl, "_api/contextinfo");
	            return q.post().then(function (data) {
	                if (data.hasOwnProperty("GetContextWebInformation")) {
	                    var info = data.GetContextWebInformation;
	                    info.SupportedSchemaVersions = info.SupportedSchemaVersions.results;
	                    return info;
	                } else {
	                    return data;
	                }
	            });
	        }
	        /**
	         * Gets the document libraries on a site. Static method. (SharePoint Online only)
	         *
	         * @param absoluteWebUrl The absolute url of the web whose document libraries should be returned
	         */
	
	    }, {
	        key: "getDocumentLibraries",
	        value: function getDocumentLibraries(absoluteWebUrl) {
	            var q = new queryable_1.Queryable("", "_api/sp.web.getdocumentlibraries(@v)");
	            q.query.add("@v", "'" + absoluteWebUrl + "'");
	            return q.get().then(function (data) {
	                if (data.hasOwnProperty("GetDocumentLibraries")) {
	                    return data.GetDocumentLibraries;
	                } else {
	                    return data;
	                }
	            });
	        }
	        /**
	         * Gets the site URL from a page URL.
	         *
	         * @param absolutePageUrl The absolute url of the page
	         */
	
	    }, {
	        key: "getWebUrlFromPageUrl",
	        value: function getWebUrlFromPageUrl(absolutePageUrl) {
	            var q = new queryable_1.Queryable("", "_api/sp.web.getweburlfrompageurl(@v)");
	            q.query.add("@v", "'" + absolutePageUrl + "'");
	            return q.get().then(function (data) {
	                if (data.hasOwnProperty("GetWebUrlFromPageUrl")) {
	                    return data.GetWebUrlFromPageUrl;
	                } else {
	                    return data;
	                }
	            });
	        }
	        /**
	         * Creates a new batch for requests within the context of context this site
	         *
	         */
	
	    }, {
	        key: "createBatch",
	        value: function createBatch() {
	            return new odata_1.ODataBatch(this.parentUrl);
	        }
	    }, {
	        key: "rootWeb",
	        get: function get() {
	            return new webs_1.Web(this, "rootweb");
	        }
	        /**
	         * Gets the active features for this site
	         *
	         */
	
	    }, {
	        key: "features",
	        get: function get() {
	            return new features_1.Features(this);
	        }
	        /**
	         * Get all custom actions on a site collection
	         *
	         */
	
	    }, {
	        key: "userCustomActions",
	        get: function get() {
	            return new usercustomactions_1.UserCustomActions(this);
	        }
	    }]);
	
	    return Site;
	}(queryable_1.QueryableInstance);
	
	exports.Site = Site;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	var queryablesecurable_1 = __webpack_require__(19);
	var lists_1 = __webpack_require__(23);
	var fields_1 = __webpack_require__(30);
	var navigation_1 = __webpack_require__(35);
	var sitegroups_1 = __webpack_require__(21);
	var contenttypes_1 = __webpack_require__(27);
	var folders_1 = __webpack_require__(25);
	var roles_1 = __webpack_require__(20);
	var files_1 = __webpack_require__(26);
	var util_1 = __webpack_require__(1);
	var lists_2 = __webpack_require__(23);
	var siteusers_1 = __webpack_require__(22);
	var usercustomactions_1 = __webpack_require__(34);
	var odata_1 = __webpack_require__(11);
	var features_1 = __webpack_require__(36);
	
	var Webs = function (_queryable_1$Queryabl) {
	    _inherits(Webs, _queryable_1$Queryabl);
	
	    function Webs(baseUrl) {
	        var webPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "webs";
	
	        _classCallCheck(this, Webs);
	
	        return _possibleConstructorReturn(this, (Webs.__proto__ || Object.getPrototypeOf(Webs)).call(this, baseUrl, webPath));
	    }
	    /**
	     * Adds a new web to the collection
	     *
	     * @param title The new web's title
	     * @param url The new web's relative url
	     * @param description The web web's description
	     * @param template The web's template
	     * @param language The language code to use for this web
	     * @param inheritPermissions If true permissions will be inherited from the partent web
	     * @param additionalSettings Will be passed as part of the web creation body
	     */
	
	
	    _createClass(Webs, [{
	        key: "add",
	        value: function add(title, url) {
	            var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
	            var template = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "STS";
	            var language = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1033;
	            var inheritPermissions = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
	            var additionalSettings = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
	
	            var props = util_1.Util.extend({
	                Description: description,
	                Language: language,
	                Title: title,
	                Url: url,
	                UseSamePermissionsAsParentSite: inheritPermissions,
	                WebTemplate: template
	            }, additionalSettings);
	            var postBody = JSON.stringify({
	                "parameters": util_1.Util.extend({
	                    "__metadata": { "type": "SP.WebCreationInformation" }
	                }, props)
	            });
	            var q = new Webs(this, "add");
	            return q.post({ body: postBody }).then(function (data) {
	                return {
	                    data: data,
	                    web: new Web(odata_1.extractOdataId(data).replace(/_api\/web\/?/i, ""))
	                };
	            });
	        }
	    }]);
	
	    return Webs;
	}(queryable_1.QueryableCollection);
	
	exports.Webs = Webs;
	/**
	 * Describes a web
	 *
	 */
	
	var Web = function (_queryablesecurable_) {
	    _inherits(Web, _queryablesecurable_);
	
	    function Web(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "_api/web";
	
	        _classCallCheck(this, Web);
	
	        return _possibleConstructorReturn(this, (Web.__proto__ || Object.getPrototypeOf(Web)).call(this, baseUrl, path));
	    }
	
	    _createClass(Web, [{
	        key: "createBatch",
	
	        /**
	         * Creates a new batch for requests within the context of context this web
	         *
	         */
	        value: function createBatch() {
	            return new odata_1.ODataBatch(this.parentUrl);
	        }
	        /**
	         * Get a folder by server relative url
	         *
	         * @param folderRelativeUrl the server relative path to the folder (including /sites/ if applicable)
	         */
	
	    }, {
	        key: "getFolderByServerRelativeUrl",
	        value: function getFolderByServerRelativeUrl(folderRelativeUrl) {
	            return new folders_1.Folder(this, "getFolderByServerRelativeUrl('" + folderRelativeUrl + "')");
	        }
	        /**
	         * Get a file by server relative url
	         *
	         * @param fileRelativeUrl the server relative path to the file (including /sites/ if applicable)
	         */
	
	    }, {
	        key: "getFileByServerRelativeUrl",
	        value: function getFileByServerRelativeUrl(fileRelativeUrl) {
	            return new files_1.File(this, "getFileByServerRelativeUrl('" + fileRelativeUrl + "')");
	        }
	        /**
	         * Get a list by server relative url (list's root folder)
	         *
	         * @param listRelativeUrl the server relative path to the list's root folder (including /sites/ if applicable)
	         */
	
	    }, {
	        key: "getList",
	        value: function getList(listRelativeUrl) {
	            return new lists_2.List(this, "getList('" + listRelativeUrl + "')");
	        }
	        /**
	         * Updates this web intance with the supplied properties
	         *
	         * @param properties A plain object hash of values to update for the web
	         */
	
	    }, {
	        key: "update",
	        value: function update(properties) {
	            var _this3 = this;
	
	            var postBody = JSON.stringify(util_1.Util.extend({
	                "__metadata": { "type": "SP.Web" }
	            }, properties));
	            return this.post({
	                body: postBody,
	                headers: {
	                    "X-HTTP-Method": "MERGE"
	                }
	            }).then(function (data) {
	                return {
	                    data: data,
	                    web: _this3
	                };
	            });
	        }
	        /**
	         * Delete this web
	         *
	         */
	
	    }, {
	        key: "delete",
	        value: function _delete() {
	            return _get(Web.prototype.__proto__ || Object.getPrototypeOf(Web.prototype), "delete", this).call(this);
	        }
	        /**
	         * Applies the theme specified by the contents of each of the files specified in the arguments to the site.
	         *
	         * @param colorPaletteUrl Server-relative URL of the color palette file.
	         * @param fontSchemeUrl Server-relative URL of the font scheme.
	         * @param backgroundImageUrl Server-relative URL of the background image.
	         * @param shareGenerated true to store the generated theme files in the root site, or false to store them in this site.
	         */
	
	    }, {
	        key: "applyTheme",
	        value: function applyTheme(colorPaletteUrl, fontSchemeUrl, backgroundImageUrl, shareGenerated) {
	            var postBody = JSON.stringify({
	                backgroundImageUrl: backgroundImageUrl,
	                colorPaletteUrl: colorPaletteUrl,
	                fontSchemeUrl: fontSchemeUrl,
	                shareGenerated: shareGenerated
	            });
	            var q = new Web(this, "applytheme");
	            return q.post({ body: postBody });
	        }
	        /**
	         * Applies the specified site definition or site template to the Web site that has no template applied to it.
	         *
	         * @param template Name of the site definition or the name of the site template
	         */
	
	    }, {
	        key: "applyWebTemplate",
	        value: function applyWebTemplate(template) {
	            var q = new Web(this, "applywebtemplate");
	            q.concat("(@t)");
	            q.query.add("@t", template);
	            return q.post();
	        }
	        /**
	         * Returns whether the current user has the given set of permissions.
	         *
	         * @param perms The high and low permission range.
	         */
	
	    }, {
	        key: "doesUserHavePermissions",
	        value: function doesUserHavePermissions(perms) {
	            var q = new Web(this, "doesuserhavepermissions");
	            q.concat("(@p)");
	            q.query.add("@p", JSON.stringify(perms));
	            return q.get();
	        }
	        /**
	         * Checks whether the specified login name belongs to a valid user in the site. If the user doesn't exist, adds the user to the site.
	         *
	         * @param loginName The login name of the user (ex: i:0#.f|membership|user@domain.onmicrosoft.com)
	         */
	
	    }, {
	        key: "ensureUser",
	        value: function ensureUser(loginName) {
	            // TODO:: this should resolve to a User
	            var postBody = JSON.stringify({
	                logonName: loginName
	            });
	            var q = new Web(this, "ensureuser");
	            return q.post({ body: postBody });
	        }
	        /**
	         * Returns a collection of site templates available for the site.
	         *
	         * @param language The LCID of the site templates to get.
	         * @param true to include language-neutral site templates; otherwise false
	         */
	
	    }, {
	        key: "availableWebTemplates",
	        value: function availableWebTemplates() {
	            var language = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1033;
	            var includeCrossLanugage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	            return new queryable_1.QueryableCollection(this, "getavailablewebtemplates(lcid=" + language + ", doincludecrosslanguage=" + includeCrossLanugage + ")");
	        }
	        /**
	         * Returns the list gallery on the site.
	         *
	         * @param type The gallery type - WebTemplateCatalog = 111, WebPartCatalog = 113 ListTemplateCatalog = 114,
	         * MasterPageCatalog = 116, SolutionCatalog = 121, ThemeCatalog = 123, DesignCatalog = 124, AppDataCatalog = 125
	         */
	        /* tslint:disable member-access */
	
	    }, {
	        key: "getCatalog",
	        value: function getCatalog(type) {
	            var q = new Web(this, "getcatalog(" + type + ")");
	            q.select("Id");
	            return q.get().then(function (data) {
	                return new lists_2.List(odata_1.extractOdataId(data));
	            });
	        }
	        /* tslint:enable */
	        /**
	         * Returns the collection of changes from the change log that have occurred within the list, based on the specified query.
	         */
	
	    }, {
	        key: "getChanges",
	        value: function getChanges(query) {
	            var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeQuery" } }, query) });
	            // don't change "this" instance, make a new one
	            var q = new Web(this, "getchanges");
	            return q.post({ body: postBody });
	        }
	        /**
	         * Gets the custom list templates for the site.
	         *
	         */
	
	    }, {
	        key: "getUserById",
	
	        /**
	         * Returns the user corresponding to the specified member identifier for the current site.
	         *
	         * @param id The ID of the user.
	         */
	        value: function getUserById(id) {
	            return new siteusers_1.SiteUser(this, "getUserById(" + id + ")");
	        }
	        /**
	         * Returns the name of the image file for the icon that is used to represent the specified file.
	         *
	         * @param filename The file name. If this parameter is empty, the server returns an empty string.
	         * @param size The size of the icon: 16x16 pixels = 0, 32x32 pixels = 1.
	         * @param progId The ProgID of the application that was used to create the file, in the form OLEServerName.ObjectName
	         */
	
	    }, {
	        key: "mapToIcon",
	        value: function mapToIcon(filename) {
	            var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	            var progId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
	
	            var q = new Web(this, "maptoicon(filename='" + filename + "', progid='" + progId + "', size=" + size + ")");
	            return q.get();
	        }
	    }, {
	        key: "webs",
	        get: function get() {
	            return new Webs(this);
	        }
	        /**
	         * Get the content types available in this web
	         *
	         */
	
	    }, {
	        key: "contentTypes",
	        get: function get() {
	            return new contenttypes_1.ContentTypes(this);
	        }
	        /**
	         * Get the lists in this web
	         *
	         */
	
	    }, {
	        key: "lists",
	        get: function get() {
	            return new lists_1.Lists(this);
	        }
	        /**
	         * Gets the fields in this web
	         *
	         */
	
	    }, {
	        key: "fields",
	        get: function get() {
	            return new fields_1.Fields(this);
	        }
	        /**
	         * Gets the active features for this web
	         *
	         */
	
	    }, {
	        key: "features",
	        get: function get() {
	            return new features_1.Features(this);
	        }
	        /**
	         * Gets the available fields in this web
	         *
	         */
	
	    }, {
	        key: "availablefields",
	        get: function get() {
	            return new fields_1.Fields(this, "availablefields");
	        }
	        /**
	         * Get the navigation options in this web
	         *
	         */
	
	    }, {
	        key: "navigation",
	        get: function get() {
	            return new navigation_1.Navigation(this);
	        }
	        /**
	         * Gets the site users
	         *
	         */
	
	    }, {
	        key: "siteUsers",
	        get: function get() {
	            return new siteusers_1.SiteUsers(this);
	        }
	        /**
	         * Gets the site groups
	         *
	         */
	
	    }, {
	        key: "siteGroups",
	        get: function get() {
	            return new sitegroups_1.SiteGroups(this);
	        }
	        /**
	         * Gets the current user
	         */
	
	    }, {
	        key: "currentUser",
	        get: function get() {
	            return new siteusers_1.CurrentUser(this);
	        }
	        /**
	         * Get the folders in this web
	         *
	         */
	
	    }, {
	        key: "folders",
	        get: function get() {
	            return new folders_1.Folders(this);
	        }
	        /**
	         * Get all custom actions on a site
	         *
	         */
	
	    }, {
	        key: "userCustomActions",
	        get: function get() {
	            return new usercustomactions_1.UserCustomActions(this);
	        }
	        /**
	         * Gets the collection of RoleDefinition resources.
	         *
	         */
	
	    }, {
	        key: "roleDefinitions",
	        get: function get() {
	            return new roles_1.RoleDefinitions(this);
	        }
	    }, {
	        key: "customListTemplate",
	        get: function get() {
	            return new queryable_1.QueryableCollection(this, "getcustomlisttemplates");
	        }
	    }]);
	
	    return Web;
	}(queryablesecurable_1.QueryableSecurable);
	
	exports.Web = Web;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var roles_1 = __webpack_require__(20);
	var queryable_1 = __webpack_require__(8);
	
	var QueryableSecurable = function (_queryable_1$Queryabl) {
	    _inherits(QueryableSecurable, _queryable_1$Queryabl);
	
	    function QueryableSecurable() {
	        _classCallCheck(this, QueryableSecurable);
	
	        return _possibleConstructorReturn(this, (QueryableSecurable.__proto__ || Object.getPrototypeOf(QueryableSecurable)).apply(this, arguments));
	    }
	
	    _createClass(QueryableSecurable, [{
	        key: "getUserEffectivePermissions",
	
	        /**
	         * Gets the effective permissions for the user supplied
	         *
	         * @param loginName The claims username for the user (ex: i:0#.f|membership|user@domain.com)
	         */
	        value: function getUserEffectivePermissions(loginName) {
	            var perms = new queryable_1.Queryable(this, "getUserEffectivePermissions(@user)");
	            perms.query.add("@user", "'" + encodeURIComponent(loginName) + "'");
	            return perms;
	        }
	        /**
	         * Breaks the security inheritance at this level optinally copying permissions and clearing subscopes
	         *
	         * @param copyRoleAssignments If true the permissions are copied from the current parent scope
	         * @param clearSubscopes Optional. true to make all child securable objects inherit role assignments from the current object
	         */
	
	    }, {
	        key: "breakRoleInheritance",
	        value: function breakRoleInheritance() {
	            var copyRoleAssignments = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	            var clearSubscopes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            var Breaker = function (_queryable_1$Queryabl2) {
	                _inherits(Breaker, _queryable_1$Queryabl2);
	
	                function Breaker(baseUrl, copy, clear) {
	                    _classCallCheck(this, Breaker);
	
	                    return _possibleConstructorReturn(this, (Breaker.__proto__ || Object.getPrototypeOf(Breaker)).call(this, baseUrl, "breakroleinheritance(copyroleassignments=" + copy + ", clearsubscopes=" + clear + ")"));
	                }
	
	                _createClass(Breaker, [{
	                    key: "break",
	                    value: function _break() {
	                        return this.post();
	                    }
	                }]);
	
	                return Breaker;
	            }(queryable_1.Queryable);
	
	            var b = new Breaker(this, copyRoleAssignments, clearSubscopes);
	            return b.break();
	        }
	        /**
	         * Removes the local role assignments so that it re-inherit role assignments from the parent object.
	         *
	         */
	
	    }, {
	        key: "resetRoleInheritance",
	        value: function resetRoleInheritance() {
	            var Resetter = function (_queryable_1$Queryabl3) {
	                _inherits(Resetter, _queryable_1$Queryabl3);
	
	                function Resetter(baseUrl) {
	                    _classCallCheck(this, Resetter);
	
	                    return _possibleConstructorReturn(this, (Resetter.__proto__ || Object.getPrototypeOf(Resetter)).call(this, baseUrl, "resetroleinheritance"));
	                }
	
	                _createClass(Resetter, [{
	                    key: "reset",
	                    value: function reset() {
	                        return this.post();
	                    }
	                }]);
	
	                return Resetter;
	            }(queryable_1.Queryable);
	
	            var r = new Resetter(this);
	            return r.reset();
	        }
	    }, {
	        key: "roleAssignments",
	
	        /**
	         * Gets the set of role assignments for this item
	         *
	         */
	        get: function get() {
	            return new roles_1.RoleAssignments(this);
	        }
	        /**
	         * Gets the closest securable up the security hierarchy whose permissions are applied to this list item
	         *
	         */
	
	    }, {
	        key: "firstUniqueAncestorSecurableObject",
	        get: function get() {
	            return new queryable_1.QueryableInstance(this, "FirstUniqueAncestorSecurableObject");
	        }
	    }]);
	
	    return QueryableSecurable;
	}(queryable_1.QueryableInstance);
	
	exports.QueryableSecurable = QueryableSecurable;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	var sitegroups_1 = __webpack_require__(21);
	var util_1 = __webpack_require__(1);
	/**
	 * Describes a set of role assignments for the current scope
	 *
	 */
	
	var RoleAssignments = function (_queryable_1$Queryabl) {
	    _inherits(RoleAssignments, _queryable_1$Queryabl);
	
	    /**
	     * Creates a new instance of the RoleAssignments class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function RoleAssignments(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "roleassignments";
	
	        _classCallCheck(this, RoleAssignments);
	
	        return _possibleConstructorReturn(this, (RoleAssignments.__proto__ || Object.getPrototypeOf(RoleAssignments)).call(this, baseUrl, path));
	    }
	    /**
	     * Adds a new role assignment with the specified principal and role definitions to the collection.
	     *
	     * @param principalId The ID of the user or group to assign permissions to
	     * @param roleDefId The ID of the role definition that defines the permissions to assign
	     *
	     */
	
	
	    _createClass(RoleAssignments, [{
	        key: "add",
	        value: function add(principalId, roleDefId) {
	            var a = new RoleAssignments(this, "addroleassignment(principalid=" + principalId + ", roledefid=" + roleDefId + ")");
	            return a.post();
	        }
	        /**
	         * Removes the role assignment with the specified principal and role definition from the collection
	         *
	         * @param principalId The ID of the user or group in the role assignment.
	         * @param roleDefId The ID of the role definition in the role assignment
	         *
	         */
	
	    }, {
	        key: "remove",
	        value: function remove(principalId, roleDefId) {
	            var a = new RoleAssignments(this, "removeroleassignment(principalid=" + principalId + ", roledefid=" + roleDefId + ")");
	            return a.post();
	        }
	        /**
	         * Gets the role assignment associated with the specified principal ID from the collection.
	         *
	         * @param id The id of the role assignment
	         */
	
	    }, {
	        key: "getById",
	        value: function getById(id) {
	            var ra = new RoleAssignment(this);
	            ra.concat("(" + id + ")");
	            return ra;
	        }
	    }]);
	
	    return RoleAssignments;
	}(queryable_1.QueryableCollection);
	
	exports.RoleAssignments = RoleAssignments;
	
	var RoleAssignment = function (_queryable_1$Queryabl2) {
	    _inherits(RoleAssignment, _queryable_1$Queryabl2);
	
	    /**
	    * Creates a new instance of the RoleAssignment class
	    *
	    * @param baseUrl The url or Queryable which forms the parent of this fields collection
	    */
	    function RoleAssignment(baseUrl, path) {
	        _classCallCheck(this, RoleAssignment);
	
	        return _possibleConstructorReturn(this, (RoleAssignment.__proto__ || Object.getPrototypeOf(RoleAssignment)).call(this, baseUrl, path));
	    }
	
	    _createClass(RoleAssignment, [{
	        key: "delete",
	
	        /**
	         * Delete this role assignment
	         *
	         */
	        value: function _delete() {
	            return this.post({
	                headers: {
	                    "X-HTTP-Method": "DELETE"
	                }
	            });
	        }
	    }, {
	        key: "groups",
	        get: function get() {
	            return new sitegroups_1.SiteGroups(this, "groups");
	        }
	        /**
	         * Get the role definition bindings for this role assignment
	         *
	         */
	
	    }, {
	        key: "bindings",
	        get: function get() {
	            return new RoleDefinitionBindings(this);
	        }
	    }]);
	
	    return RoleAssignment;
	}(queryable_1.QueryableInstance);
	
	exports.RoleAssignment = RoleAssignment;
	
	var RoleDefinitions = function (_queryable_1$Queryabl3) {
	    _inherits(RoleDefinitions, _queryable_1$Queryabl3);
	
	    /**
	     * Creates a new instance of the RoleDefinitions class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     * @param path
	     *
	     */
	    function RoleDefinitions(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "roledefinitions";
	
	        _classCallCheck(this, RoleDefinitions);
	
	        return _possibleConstructorReturn(this, (RoleDefinitions.__proto__ || Object.getPrototypeOf(RoleDefinitions)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets the role definition with the specified ID from the collection.
	     *
	     * @param id The ID of the role definition.
	     *
	     */
	
	
	    _createClass(RoleDefinitions, [{
	        key: "getById",
	        value: function getById(id) {
	            return new RoleDefinition(this, "getById(" + id + ")");
	        }
	        /**
	         * Gets the role definition with the specified name.
	         *
	         * @param name The name of the role definition.
	         *
	         */
	
	    }, {
	        key: "getByName",
	        value: function getByName(name) {
	            return new RoleDefinition(this, "getbyname('" + name + "')");
	        }
	        /**
	         * Gets the role definition with the specified type.
	         *
	         * @param name The name of the role definition.
	         *
	         */
	
	    }, {
	        key: "getByType",
	        value: function getByType(roleTypeKind) {
	            return new RoleDefinition(this, "getbytype(" + roleTypeKind + ")");
	        }
	        /**
	         * Create a role definition
	         *
	         * @param name The new role definition's name
	         * @param description The new role definition's description
	         * @param order The order in which the role definition appears
	         * @param basePermissions The permissions mask for this role definition
	         *
	         */
	
	    }, {
	        key: "add",
	        value: function add(name, description, order, basePermissions) {
	            var _this4 = this;
	
	            var postBody = JSON.stringify({
	                BasePermissions: util_1.Util.extend({ __metadata: { type: "SP.BasePermissions" } }, basePermissions),
	                Description: description,
	                Name: name,
	                Order: order,
	                __metadata: { "type": "SP.RoleDefinition" }
	            });
	            return this.post({ body: postBody }).then(function (data) {
	                return {
	                    data: data,
	                    definition: _this4.getById(data.Id)
	                };
	            });
	        }
	    }]);
	
	    return RoleDefinitions;
	}(queryable_1.QueryableCollection);
	
	exports.RoleDefinitions = RoleDefinitions;
	
	var RoleDefinition = function (_queryable_1$Queryabl4) {
	    _inherits(RoleDefinition, _queryable_1$Queryabl4);
	
	    function RoleDefinition(baseUrl, path) {
	        _classCallCheck(this, RoleDefinition);
	
	        return _possibleConstructorReturn(this, (RoleDefinition.__proto__ || Object.getPrototypeOf(RoleDefinition)).call(this, baseUrl, path));
	    }
	    /**
	     * Updates this web intance with the supplied properties
	     *
	     * @param properties A plain object hash of values to update for the web
	     */
	    /* tslint:disable no-string-literal */
	
	
	    _createClass(RoleDefinition, [{
	        key: "update",
	        value: function update(properties) {
	            var _this6 = this;
	
	            if (typeof properties.hasOwnProperty("BasePermissions") !== "undefined") {
	                properties["BasePermissions"] = util_1.Util.extend({ __metadata: { type: "SP.BasePermissions" } }, properties["BasePermissions"]);
	            }
	            var postBody = JSON.stringify(util_1.Util.extend({
	                "__metadata": { "type": "SP.RoleDefinition" }
	            }, properties));
	            return this.post({
	                body: postBody,
	                headers: {
	                    "X-HTTP-Method": "MERGE"
	                }
	            }).then(function (data) {
	                var retDef = _this6;
	                if (properties.hasOwnProperty("Name")) {
	                    var parent = _this6.getParent(RoleDefinitions, _this6.parentUrl, "");
	                    retDef = parent.getByName(properties["Name"]);
	                }
	                return {
	                    data: data,
	                    definition: retDef
	                };
	            });
	        }
	        /* tslint:enable */
	        /**
	         * Delete this role definition
	         *
	         */
	
	    }, {
	        key: "delete",
	        value: function _delete() {
	            return this.post({
	                headers: {
	                    "X-HTTP-Method": "DELETE"
	                }
	            });
	        }
	    }]);
	
	    return RoleDefinition;
	}(queryable_1.QueryableInstance);
	
	exports.RoleDefinition = RoleDefinition;
	
	var RoleDefinitionBindings = function (_queryable_1$Queryabl5) {
	    _inherits(RoleDefinitionBindings, _queryable_1$Queryabl5);
	
	    function RoleDefinitionBindings(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "roledefinitionbindings";
	
	        _classCallCheck(this, RoleDefinitionBindings);
	
	        return _possibleConstructorReturn(this, (RoleDefinitionBindings.__proto__ || Object.getPrototypeOf(RoleDefinitionBindings)).call(this, baseUrl, path));
	    }
	
	    return RoleDefinitionBindings;
	}(queryable_1.QueryableCollection);
	
	exports.RoleDefinitionBindings = RoleDefinitionBindings;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	var siteusers_1 = __webpack_require__(22);
	var util_1 = __webpack_require__(1);
	/**
	 * Principal Type enum
	 *
	 */
	var PrincipalType;
	(function (PrincipalType) {
	    PrincipalType[PrincipalType["None"] = 0] = "None";
	    PrincipalType[PrincipalType["User"] = 1] = "User";
	    PrincipalType[PrincipalType["DistributionList"] = 2] = "DistributionList";
	    PrincipalType[PrincipalType["SecurityGroup"] = 4] = "SecurityGroup";
	    PrincipalType[PrincipalType["SharePointGroup"] = 8] = "SharePointGroup";
	    PrincipalType[PrincipalType["All"] = 15] = "All";
	})(PrincipalType = exports.PrincipalType || (exports.PrincipalType = {}));
	/**
	 * Describes a collection of site users
	 *
	 */
	
	var SiteGroups = function (_queryable_1$Queryabl) {
	    _inherits(SiteGroups, _queryable_1$Queryabl);
	
	    /**
	     * Creates a new instance of the SiteUsers class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this user collection
	     */
	    function SiteGroups(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "sitegroups";
	
	        _classCallCheck(this, SiteGroups);
	
	        return _possibleConstructorReturn(this, (SiteGroups.__proto__ || Object.getPrototypeOf(SiteGroups)).call(this, baseUrl, path));
	    }
	    /**
	     * Adds a new group to the site collection
	     *
	     * @param props The properties to be updated
	     */
	
	
	    _createClass(SiteGroups, [{
	        key: "add",
	        value: function add(properties) {
	            var _this2 = this;
	
	            var postBody = JSON.stringify(util_1.Util.extend({ "__metadata": { "type": "SP.Group" } }, properties));
	            return this.post({ body: postBody }).then(function (data) {
	                return {
	                    data: data,
	                    group: _this2.getById(data.Id)
	                };
	            });
	        }
	        /**
	         * Gets a group from the collection by name
	         *
	         * @param email The name of the group
	         */
	
	    }, {
	        key: "getByName",
	        value: function getByName(groupName) {
	            return new SiteGroup(this, "getByName('" + groupName + "')");
	        }
	        /**
	         * Gets a group from the collection by id
	         *
	         * @param id The id of the group
	         */
	
	    }, {
	        key: "getById",
	        value: function getById(id) {
	            var sg = new SiteGroup(this);
	            sg.concat("(" + id + ")");
	            return sg;
	        }
	        /**
	         * Removes the group with the specified member ID from the collection.
	         *
	         * @param id The id of the group to remove
	         */
	
	    }, {
	        key: "removeById",
	        value: function removeById(id) {
	            var g = new SiteGroups(this, "removeById('" + id + "')");
	            return g.post();
	        }
	        /**
	         * Removes a user from the collection by login name
	         *
	         * @param loginName The login name of the user
	         */
	
	    }, {
	        key: "removeByLoginName",
	        value: function removeByLoginName(loginName) {
	            var g = new SiteGroups(this, "removeByLoginName('" + loginName + "')");
	            return g.post();
	        }
	    }]);
	
	    return SiteGroups;
	}(queryable_1.QueryableCollection);
	
	exports.SiteGroups = SiteGroups;
	/**
	 * Describes a single group
	 *
	 */
	
	var SiteGroup = function (_queryable_1$Queryabl2) {
	    _inherits(SiteGroup, _queryable_1$Queryabl2);
	
	    /**
	     * Creates a new instance of the Group class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this site group
	     * @param path Optional, passes the path to the group
	     */
	    function SiteGroup(baseUrl, path) {
	        _classCallCheck(this, SiteGroup);
	
	        return _possibleConstructorReturn(this, (SiteGroup.__proto__ || Object.getPrototypeOf(SiteGroup)).call(this, baseUrl, path));
	    }
	    /**
	     * Get's the users for this group
	     *
	     */
	
	
	    _createClass(SiteGroup, [{
	        key: "update",
	
	        /**
	        * Updates this group instance with the supplied properties
	        *
	        * @param properties A GroupWriteableProperties object of property names and values to update for the user
	        */
	        /* tslint:disable no-string-literal */
	        value: function update(properties) {
	            var _this4 = this;
	
	            var postBody = util_1.Util.extend({ "__metadata": { "type": "SP.Group" } }, properties);
	            return this.post({
	                body: JSON.stringify(postBody),
	                headers: {
	                    "X-HTTP-Method": "MERGE"
	                }
	            }).then(function (data) {
	                var retGroup = _this4;
	                if (properties.hasOwnProperty("Title")) {
	                    retGroup = _this4.getParent(SiteGroup, _this4.parentUrl, "getByName('" + properties["Title"] + "')");
	                }
	                return {
	                    data: data,
	                    group: retGroup
	                };
	            });
	        }
	    }, {
	        key: "users",
	        get: function get() {
	            return new siteusers_1.SiteUsers(this, "users");
	        }
	    }]);
	
	    return SiteGroup;
	}(queryable_1.QueryableInstance);
	
	exports.SiteGroup = SiteGroup;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	var sitegroups_1 = __webpack_require__(21);
	var util_1 = __webpack_require__(1);
	/**
	 * Describes a collection of all site collection users
	 *
	 */
	
	var SiteUsers = function (_queryable_1$Queryabl) {
	    _inherits(SiteUsers, _queryable_1$Queryabl);
	
	    /**
	     * Creates a new instance of the Users class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this user collection
	     */
	    function SiteUsers(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "siteusers";
	
	        _classCallCheck(this, SiteUsers);
	
	        return _possibleConstructorReturn(this, (SiteUsers.__proto__ || Object.getPrototypeOf(SiteUsers)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets a user from the collection by email
	     *
	     * @param email The email of the user
	     */
	
	
	    _createClass(SiteUsers, [{
	        key: "getByEmail",
	        value: function getByEmail(email) {
	            return new SiteUser(this, "getByEmail('" + email + "')");
	        }
	        /**
	         * Gets a user from the collection by id
	         *
	         * @param id The id of the user
	         */
	
	    }, {
	        key: "getById",
	        value: function getById(id) {
	            return new SiteUser(this, "getById(" + id + ")");
	        }
	        /**
	         * Gets a user from the collection by login name
	         *
	         * @param loginName The email address of the user
	         */
	
	    }, {
	        key: "getByLoginName",
	        value: function getByLoginName(loginName) {
	            var su = new SiteUser(this);
	            su.concat("(@v)");
	            su.query.add("@v", encodeURIComponent(loginName));
	            return su;
	        }
	        /**
	         * Removes a user from the collection by id
	         *
	         * @param id The id of the user
	         */
	
	    }, {
	        key: "removeById",
	        value: function removeById(id) {
	            var o = new SiteUsers(this, "removeById(" + id + ")");
	            return o.post();
	        }
	        /**
	         * Removes a user from the collection by login name
	         *
	         * @param loginName The login name of the user
	         */
	
	    }, {
	        key: "removeByLoginName",
	        value: function removeByLoginName(loginName) {
	            var o = new SiteUsers(this, "removeByLoginName(@v)");
	            o.query.add("@v", encodeURIComponent(loginName));
	            return o.post();
	        }
	        /**
	         * Add a user to a group
	         *
	         * @param loginName The login name of the user to add to the group
	         *
	         */
	
	    }, {
	        key: "add",
	        value: function add(loginName) {
	            var _this2 = this;
	
	            var postBody = JSON.stringify({ "__metadata": { "type": "SP.User" }, LoginName: loginName });
	            return this.post({ body: postBody }).then(function () {
	                return _this2.getByLoginName(loginName);
	            });
	        }
	    }]);
	
	    return SiteUsers;
	}(queryable_1.QueryableCollection);
	
	exports.SiteUsers = SiteUsers;
	/**
	 * Describes a single user
	 *
	 */
	
	var SiteUser = function (_queryable_1$Queryabl2) {
	    _inherits(SiteUser, _queryable_1$Queryabl2);
	
	    /**
	     * Creates a new instance of the User class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     * @param path Optional, passes the path to the user
	     */
	    function SiteUser(baseUrl, path) {
	        _classCallCheck(this, SiteUser);
	
	        return _possibleConstructorReturn(this, (SiteUser.__proto__ || Object.getPrototypeOf(SiteUser)).call(this, baseUrl, path));
	    }
	    /**
	     * Get's the groups for this user.
	     *
	     */
	
	
	    _createClass(SiteUser, [{
	        key: "update",
	
	        /**
	        * Updates this user instance with the supplied properties
	        *
	        * @param properties A plain object of property names and values to update for the user
	        */
	        value: function update(properties) {
	            var _this4 = this;
	
	            var postBody = util_1.Util.extend({ "__metadata": { "type": "SP.User" } }, properties);
	            return this.post({
	                body: JSON.stringify(postBody),
	                headers: {
	                    "X-HTTP-Method": "MERGE"
	                }
	            }).then(function (data) {
	                return {
	                    data: data,
	                    user: _this4
	                };
	            });
	        }
	        /**
	         * Delete this user
	         *
	         */
	
	    }, {
	        key: "delete",
	        value: function _delete() {
	            return this.post({
	                headers: {
	                    "X-HTTP-Method": "DELETE"
	                }
	            });
	        }
	    }, {
	        key: "groups",
	        get: function get() {
	            return new sitegroups_1.SiteGroups(this, "groups");
	        }
	    }]);
	
	    return SiteUser;
	}(queryable_1.QueryableInstance);
	
	exports.SiteUser = SiteUser;
	/**
	 * Represents the current user
	 */
	
	var CurrentUser = function (_queryable_1$Queryabl3) {
	    _inherits(CurrentUser, _queryable_1$Queryabl3);
	
	    function CurrentUser(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "currentuser";
	
	        _classCallCheck(this, CurrentUser);
	
	        return _possibleConstructorReturn(this, (CurrentUser.__proto__ || Object.getPrototypeOf(CurrentUser)).call(this, baseUrl, path));
	    }
	
	    return CurrentUser;
	}(queryable_1.QueryableInstance);
	
	exports.CurrentUser = CurrentUser;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var items_1 = __webpack_require__(24);
	var views_1 = __webpack_require__(29);
	var contenttypes_1 = __webpack_require__(27);
	var fields_1 = __webpack_require__(30);
	var forms_1 = __webpack_require__(32);
	var subscriptions_1 = __webpack_require__(33);
	var queryable_1 = __webpack_require__(8);
	var queryablesecurable_1 = __webpack_require__(19);
	var util_1 = __webpack_require__(1);
	var usercustomactions_1 = __webpack_require__(34);
	var odata_1 = __webpack_require__(11);
	var exceptions_1 = __webpack_require__(14);
	/**
	 * Describes a collection of List objects
	 *
	 */
	
	var Lists = function (_queryable_1$Queryabl) {
	    _inherits(Lists, _queryable_1$Queryabl);
	
	    /**
	     * Creates a new instance of the Lists class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Lists(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "lists";
	
	        _classCallCheck(this, Lists);
	
	        return _possibleConstructorReturn(this, (Lists.__proto__ || Object.getPrototypeOf(Lists)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets a list from the collection by title
	     *
	     * @param title The title of the list
	     */
	
	
	    _createClass(Lists, [{
	        key: "getByTitle",
	        value: function getByTitle(title) {
	            return new List(this, "getByTitle('" + title + "')");
	        }
	        /**
	         * Gets a list from the collection by guid id
	         *
	         * @param id The Id of the list (GUID)
	         */
	
	    }, {
	        key: "getById",
	        value: function getById(id) {
	            var list = new List(this);
	            list.concat("('" + id + "')");
	            return list;
	        }
	        /**
	         * Adds a new list to the collection
	         *
	         * @param title The new list's title
	         * @param description The new list's description
	         * @param template The list template value
	         * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
	         * @param additionalSettings Will be passed as part of the list creation body
	         */
	
	    }, {
	        key: "add",
	        value: function add(title) {
	            var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
	            var template = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
	
	            var _this2 = this;
	
	            var enableContentTypes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	            var additionalSettings = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
	
	            var postBody = JSON.stringify(util_1.Util.extend({
	                "__metadata": { "type": "SP.List" },
	                "AllowContentTypes": enableContentTypes,
	                "BaseTemplate": template,
	                "ContentTypesEnabled": enableContentTypes,
	                "Description": description,
	                "Title": title
	            }, additionalSettings));
	            return this.post({ body: postBody }).then(function (data) {
	                return { data: data, list: _this2.getByTitle(title) };
	            });
	        }
	        /**
	         * Ensures that the specified list exists in the collection (note: this method not supported for batching)
	         *
	         * @param title The new list's title
	         * @param description The new list's description
	         * @param template The list template value
	         * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
	         * @param additionalSettings Will be passed as part of the list creation body or used to update an existing list
	         */
	
	    }, {
	        key: "ensure",
	        value: function ensure(title) {
	            var description = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
	            var template = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
	
	            var _this3 = this;
	
	            var enableContentTypes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	            var additionalSettings = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
	
	            if (this.hasBatch) {
	                throw new exceptions_1.NotSupportedInBatchException("The ensure list method");
	            }
	            return new Promise(function (resolve, reject) {
	                var list = _this3.getByTitle(title);
	                list.get().then(function (_) {
	                    list.update(additionalSettings).then(function (d) {
	                        resolve({ created: false, data: d, list: list });
	                    }).catch(function (e) {
	                        return reject(e);
	                    });
	                }).catch(function () {
	                    _this3.add(title, description, template, enableContentTypes, additionalSettings).then(function (r) {
	                        resolve({ created: true, data: r.data, list: _this3.getByTitle(title) });
	                    });
	                }).catch(function (e) {
	                    return reject(e);
	                });
	            });
	        }
	        /**
	         * Gets a list that is the default asset location for images or other files, which the users upload to their wiki pages.
	         */
	
	    }, {
	        key: "ensureSiteAssetsLibrary",
	        value: function ensureSiteAssetsLibrary() {
	            var q = new Lists(this, "ensuresiteassetslibrary");
	            return q.post().then(function (json) {
	                return new List(odata_1.extractOdataId(json));
	            });
	        }
	        /**
	         * Gets a list that is the default location for wiki pages.
	         */
	
	    }, {
	        key: "ensureSitePagesLibrary",
	        value: function ensureSitePagesLibrary() {
	            var q = new Lists(this, "ensuresitepageslibrary");
	            return q.post().then(function (json) {
	                return new List(odata_1.extractOdataId(json));
	            });
	        }
	    }]);
	
	    return Lists;
	}(queryable_1.QueryableCollection);
	
	exports.Lists = Lists;
	/**
	 * Describes a single List instance
	 *
	 */
	
	var List = function (_queryablesecurable_) {
	    _inherits(List, _queryablesecurable_);
	
	    /**
	     * Creates a new instance of the Lists class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     * @param path Optional, if supplied will be appended to the supplied baseUrl
	     */
	    function List(baseUrl, path) {
	        _classCallCheck(this, List);
	
	        return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets the content types in this list
	     *
	     */
	
	
	    _createClass(List, [{
	        key: "getView",
	
	        /**
	         * Gets a view by view guid id
	         *
	         */
	        value: function getView(viewId) {
	            return new views_1.View(this, "getView('" + viewId + "')");
	        }
	        /**
	         * Updates this list intance with the supplied properties
	         *
	         * @param properties A plain object hash of values to update for the list
	         * @param eTag Value used in the IF-Match header, by default "*"
	         */
	        /* tslint:disable no-string-literal */
	
	    }, {
	        key: "update",
	        value: function update(properties) {
	            var _this5 = this;
	
	            var eTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "*";
	
	            var postBody = JSON.stringify(util_1.Util.extend({
	                "__metadata": { "type": "SP.List" }
	            }, properties));
	            return this.post({
	                body: postBody,
	                headers: {
	                    "IF-Match": eTag,
	                    "X-HTTP-Method": "MERGE"
	                }
	            }).then(function (data) {
	                var retList = _this5;
	                if (properties.hasOwnProperty("Title")) {
	                    retList = _this5.getParent(List, _this5.parentUrl, "getByTitle('" + properties["Title"] + "')");
	                }
	                return {
	                    data: data,
	                    list: retList
	                };
	            });
	        }
	        /* tslint:enable */
	        /**
	         * Delete this list
	         *
	         * @param eTag Value used in the IF-Match header, by default "*"
	         */
	
	    }, {
	        key: "delete",
	        value: function _delete() {
	            var eTag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
	
	            return this.post({
	                headers: {
	                    "IF-Match": eTag,
	                    "X-HTTP-Method": "DELETE"
	                }
	            });
	        }
	        /**
	         * Returns the collection of changes from the change log that have occurred within the list, based on the specified query.
	         */
	
	    }, {
	        key: "getChanges",
	        value: function getChanges(query) {
	            var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeQuery" } }, query) });
	            // don't change "this" instance of the List, make a new one
	            var q = new List(this, "getchanges");
	            return q.post({ body: postBody });
	        }
	        /**
	         * Returns a collection of items from the list based on the specified query.
	         *
	         * @param CamlQuery The Query schema of Collaborative Application Markup
	         * Language (CAML) is used in various ways within the context of Microsoft SharePoint Foundation
	         * to define queries against list data.
	         * see:
	         *
	         * https://msdn.microsoft.com/en-us/library/office/ms467521.aspx
	         *
	         * @param expands A URI with a $expand System Query Option indicates that Entries associated with
	         * the Entry or Collection of Entries identified by the Resource Path
	         * section of the URI must be represented inline (i.e. eagerly loaded).
	         * see:
	         *
	         * https://msdn.microsoft.com/en-us/library/office/fp142385.aspx
	         *
	         * http://www.odata.org/documentation/odata-version-2-0/uri-conventions/#ExpandSystemQueryOption
	         */
	
	    }, {
	        key: "getItemsByCAMLQuery",
	        value: function getItemsByCAMLQuery(query) {
	            var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.CamlQuery" } }, query) });
	            // don't change "this" instance of the List, make a new one
	            var q = new List(this, "getitems");
	
	            for (var _len = arguments.length, expands = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                expands[_key - 1] = arguments[_key];
	            }
	
	            q = q.expand.apply(q, expands);
	            return q.post({ body: postBody });
	        }
	        /**
	         * See: https://msdn.microsoft.com/en-us/library/office/dn292554.aspx
	         */
	
	    }, {
	        key: "getListItemChangesSinceToken",
	        value: function getListItemChangesSinceToken(query) {
	            var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeLogItemQuery" } }, query) });
	            // don't change "this" instance of the List, make a new one
	            var q = new List(this, "getlistitemchangessincetoken");
	            // note we are using a custom parser to return text as the response is an xml doc
	            return q.post({ body: postBody }, {
	                parse: function parse(r) {
	                    return r.text();
	                }
	            });
	        }
	        /**
	         * Moves the list to the Recycle Bin and returns the identifier of the new Recycle Bin item.
	         */
	
	    }, {
	        key: "recycle",
	        value: function recycle() {
	            this.append("recycle");
	            return this.post().then(function (data) {
	                if (data.hasOwnProperty("Recycle")) {
	                    return data.Recycle;
	                } else {
	                    return data;
	                }
	            });
	        }
	        /**
	         * Renders list data based on the view xml provided
	         */
	
	    }, {
	        key: "renderListData",
	        value: function renderListData(viewXml) {
	            // don't change "this" instance of the List, make a new one
	            var q = new List(this, "renderlistdata(@viewXml)");
	            q.query.add("@viewXml", "'" + viewXml + "'");
	            return q.post().then(function (data) {
	                // data will be a string, so we parse it again
	                data = JSON.parse(data);
	                if (data.hasOwnProperty("RenderListData")) {
	                    return data.RenderListData;
	                } else {
	                    return data;
	                }
	            });
	        }
	        /**
	         * Gets the field values and field schema attributes for a list item.
	         */
	
	    }, {
	        key: "renderListFormData",
	        value: function renderListFormData(itemId, formId, mode) {
	            // don't change "this" instance of the List, make a new one
	            var q = new List(this, "renderlistformdata(itemid=" + itemId + ", formid='" + formId + "', mode=" + mode + ")");
	            return q.post().then(function (data) {
	                // data will be a string, so we parse it again
	                data = JSON.parse(data);
	                if (data.hasOwnProperty("ListData")) {
	                    return data.ListData;
	                } else {
	                    return data;
	                }
	            });
	        }
	        /**
	         * Reserves a list item ID for idempotent list item creation.
	         */
	
	    }, {
	        key: "reserveListItemId",
	        value: function reserveListItemId() {
	            // don't change "this" instance of the List, make a new one
	            var q = new List(this, "reservelistitemid");
	            return q.post().then(function (data) {
	                if (data.hasOwnProperty("ReserveListItemId")) {
	                    return data.ReserveListItemId;
	                } else {
	                    return data;
	                }
	            });
	        }
	        /**
	         * Returns the ListItemEntityTypeFullName for this list, used when adding/updating list items
	         *
	         */
	
	    }, {
	        key: "getListItemEntityTypeFullName",
	        value: function getListItemEntityTypeFullName() {
	            var q = new queryable_1.QueryableInstance(this);
	            return q.select("ListItemEntityTypeFullName").getAs().then(function (o) {
	                return o.ListItemEntityTypeFullName;
	            });
	        }
	    }, {
	        key: "contentTypes",
	        get: function get() {
	            return new contenttypes_1.ContentTypes(this);
	        }
	        /**
	         * Gets the items in this list
	         *
	         */
	
	    }, {
	        key: "items",
	        get: function get() {
	            return new items_1.Items(this);
	        }
	        /**
	         * Gets the views in this list
	         *
	         */
	
	    }, {
	        key: "views",
	        get: function get() {
	            return new views_1.Views(this);
	        }
	        /**
	         * Gets the fields in this list
	         *
	         */
	
	    }, {
	        key: "fields",
	        get: function get() {
	            return new fields_1.Fields(this);
	        }
	        /**
	         * Gets the forms in this list
	         *
	         */
	
	    }, {
	        key: "forms",
	        get: function get() {
	            return new forms_1.Forms(this);
	        }
	        /**
	         * Gets the default view of this list
	         *
	         */
	
	    }, {
	        key: "defaultView",
	        get: function get() {
	            return new queryable_1.QueryableInstance(this, "DefaultView");
	        }
	        /**
	         * Get all custom actions on a site collection
	         *
	         */
	
	    }, {
	        key: "userCustomActions",
	        get: function get() {
	            return new usercustomactions_1.UserCustomActions(this);
	        }
	        /**
	         * Gets the effective base permissions of this list
	         *
	         */
	
	    }, {
	        key: "effectiveBasePermissions",
	        get: function get() {
	            return new queryable_1.Queryable(this, "EffectiveBasePermissions");
	        }
	        /**
	         * Gets the event receivers attached to this list
	         *
	         */
	
	    }, {
	        key: "eventReceivers",
	        get: function get() {
	            return new queryable_1.QueryableCollection(this, "EventReceivers");
	        }
	        /**
	         * Gets the related fields of this list
	         *
	         */
	
	    }, {
	        key: "relatedFields",
	        get: function get() {
	            return new queryable_1.Queryable(this, "getRelatedFields");
	        }
	        /**
	         * Gets the IRM settings for this list
	         *
	         */
	
	    }, {
	        key: "informationRightsManagementSettings",
	        get: function get() {
	            return new queryable_1.Queryable(this, "InformationRightsManagementSettings");
	        }
	        /**
	         * Gets the webhook subscriptions of this list
	         *
	         */
	
	    }, {
	        key: "subscriptions",
	        get: function get() {
	            return new subscriptions_1.Subscriptions(this);
	        }
	    }]);
	
	    return List;
	}(queryablesecurable_1.QueryableSecurable);
	
	exports.List = List;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	var queryablesecurable_1 = __webpack_require__(19);
	var folders_1 = __webpack_require__(25);
	var files_1 = __webpack_require__(26);
	var contenttypes_1 = __webpack_require__(27);
	var util_1 = __webpack_require__(1);
	var odata_1 = __webpack_require__(11);
	var attachmentfiles_1 = __webpack_require__(28);
	var lists_1 = __webpack_require__(23);
	/**
	 * Describes a collection of Item objects
	 *
	 */
	
	var Items = function (_queryable_1$Queryabl) {
	    _inherits(Items, _queryable_1$Queryabl);
	
	    /**
	     * Creates a new instance of the Items class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Items(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "items";
	
	        _classCallCheck(this, Items);
	
	        return _possibleConstructorReturn(this, (Items.__proto__ || Object.getPrototypeOf(Items)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets an Item by id
	     *
	     * @param id The integer id of the item to retrieve
	     */
	
	
	    _createClass(Items, [{
	        key: "getById",
	        value: function getById(id) {
	            var i = new Item(this);
	            i.concat("(" + id + ")");
	            return i;
	        }
	        /**
	         * Skips the specified number of items (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#sectionSection6)
	         *
	         * @param skip The starting id where the page should start, use with top to specify pages
	         */
	
	    }, {
	        key: "skip",
	        value: function skip(_skip) {
	            this._query.add("$skiptoken", encodeURIComponent("Paged=TRUE&p_ID=" + _skip));
	            return this;
	        }
	        /**
	         * Gets a collection designed to aid in paging through data
	         *
	         */
	
	    }, {
	        key: "getPaged",
	        value: function getPaged() {
	            return this.getAs(new PagedItemCollectionParser());
	        }
	        /**
	         * Adds a new item to the collection
	         *
	         * @param properties The new items's properties
	         */
	
	    }, {
	        key: "add",
	        value: function add() {
	            var _this2 = this;
	
	            var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	            var listItemEntityTypeFullName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	            var doAdd = function doAdd(listItemEntityType) {
	                var postBody = JSON.stringify(util_1.Util.extend({
	                    "__metadata": { "type": listItemEntityType }
	                }, properties));
	                return _this2.postAs({ body: postBody }).then(function (data) {
	                    return {
	                        data: data,
	                        item: _this2.getById(data.Id)
	                    };
	                });
	            };
	            if (!listItemEntityTypeFullName) {
	                var _ret = function () {
	                    var parentList = _this2.getParent(lists_1.List);
	                    var removeDependency = _this2.addBatchDependency();
	                    return {
	                        v: parentList.getListItemEntityTypeFullName().then(function (n) {
	                            var promise = doAdd(n);
	                            removeDependency();
	                            return promise;
	                        })
	                    };
	                }();
	
	                if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	            } else {
	                return doAdd(listItemEntityTypeFullName);
	            }
	        }
	    }]);
	
	    return Items;
	}(queryable_1.QueryableCollection);
	
	exports.Items = Items;
	/**
	 * Descrines a single Item instance
	 *
	 */
	
	var Item = function (_queryablesecurable_) {
	    _inherits(Item, _queryablesecurable_);
	
	    /**
	     * Creates a new instance of the Items class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Item(baseUrl, path) {
	        _classCallCheck(this, Item);
	
	        return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets the set of attachments for this item
	     *
	     */
	
	
	    _createClass(Item, [{
	        key: "update",
	
	        /**
	         * Updates this list intance with the supplied properties
	         *
	         * @param properties A plain object hash of values to update for the list
	         * @param eTag Value used in the IF-Match header, by default "*"
	         */
	        value: function update(properties) {
	            var _this4 = this;
	
	            var eTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "*";
	
	            return new Promise(function (resolve, reject) {
	                var removeDependency = _this4.addBatchDependency();
	                var parentList = _this4.getParent(queryable_1.QueryableInstance, _this4.parentUrl.substr(0, _this4.parentUrl.lastIndexOf("/")));
	                parentList.select("ListItemEntityTypeFullName").getAs().then(function (d) {
	                    var postBody = JSON.stringify(util_1.Util.extend({
	                        "__metadata": { "type": d.ListItemEntityTypeFullName }
	                    }, properties));
	                    _this4.post({
	                        body: postBody,
	                        headers: {
	                            "IF-Match": eTag,
	                            "X-HTTP-Method": "MERGE"
	                        }
	                    }, new ItemUpdatedParser()).then(function (data) {
	                        removeDependency();
	                        resolve({
	                            data: data,
	                            item: _this4
	                        });
	                    });
	                }).catch(function (e) {
	                    return reject(e);
	                });
	            });
	        }
	        /**
	         * Delete this item
	         *
	         * @param eTag Value used in the IF-Match header, by default "*"
	         */
	
	    }, {
	        key: "delete",
	        value: function _delete() {
	            var eTag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
	
	            return this.post({
	                headers: {
	                    "IF-Match": eTag,
	                    "X-HTTP-Method": "DELETE"
	                }
	            });
	        }
	        /**
	         * Moves the list item to the Recycle Bin and returns the identifier of the new Recycle Bin item.
	         */
	
	    }, {
	        key: "recycle",
	        value: function recycle() {
	            var i = new Item(this, "recycle");
	            return i.post();
	        }
	        /**
	         * Gets a string representation of the full URL to the WOPI frame.
	         * If there is no associated WOPI application, or no associated action, an empty string is returned.
	         *
	         * @param action Display mode: 0: view, 1: edit, 2: mobileView, 3: interactivePreview
	         */
	
	    }, {
	        key: "getWopiFrameUrl",
	        value: function getWopiFrameUrl() {
	            var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
	            var i = new Item(this, "getWOPIFrameUrl(@action)");
	            i._query.add("@action", action);
	            return i.post().then(function (data) {
	                return data.GetWOPIFrameUrl;
	            });
	        }
	        /**
	         * Validates and sets the values of the specified collection of fields for the list item.
	         *
	         * @param formValues The fields to change and their new values.
	         * @param newDocumentUpdate true if the list item is a document being updated after upload; otherwise false.
	         */
	        /* tslint:disable max-line-length */
	
	    }, {
	        key: "validateUpdateListItem",
	        value: function validateUpdateListItem(formValues) {
	            var newDocumentUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            var postBody = JSON.stringify({ "formValues": formValues, bNewDocumentUpdate: newDocumentUpdate });
	            var item = new Item(this, "validateupdatelistitem");
	            return item.post({ body: postBody });
	        }
	    }, {
	        key: "attachmentFiles",
	        get: function get() {
	            return new attachmentfiles_1.AttachmentFiles(this);
	        }
	        /**
	         * Gets the content type for this item
	         *
	         */
	
	    }, {
	        key: "contentType",
	        get: function get() {
	            return new contenttypes_1.ContentType(this, "ContentType");
	        }
	        /**
	         * Gets the effective base permissions for the item
	         *
	         */
	
	    }, {
	        key: "effectiveBasePermissions",
	        get: function get() {
	            return new queryable_1.Queryable(this, "EffectiveBasePermissions");
	        }
	        /**
	         * Gets the effective base permissions for the item in a UI context
	         *
	         */
	
	    }, {
	        key: "effectiveBasePermissionsForUI",
	        get: function get() {
	            return new queryable_1.Queryable(this, "EffectiveBasePermissionsForUI");
	        }
	        /**
	         * Gets the field values for this list item in their HTML representation
	         *
	         */
	
	    }, {
	        key: "fieldValuesAsHTML",
	        get: function get() {
	            return new queryable_1.QueryableInstance(this, "FieldValuesAsHTML");
	        }
	        /**
	         * Gets the field values for this list item in their text representation
	         *
	         */
	
	    }, {
	        key: "fieldValuesAsText",
	        get: function get() {
	            return new queryable_1.QueryableInstance(this, "FieldValuesAsText");
	        }
	        /**
	         * Gets the field values for this list item for use in editing controls
	         *
	         */
	
	    }, {
	        key: "fieldValuesForEdit",
	        get: function get() {
	            return new queryable_1.QueryableInstance(this, "FieldValuesForEdit");
	        }
	        /**
	         * Gets the folder associated with this list item (if this item represents a folder)
	         *
	         */
	
	    }, {
	        key: "folder",
	        get: function get() {
	            return new folders_1.Folder(this, "folder");
	        }
	        /**
	         * Gets the folder associated with this list item (if this item represents a folder)
	         *
	         */
	
	    }, {
	        key: "file",
	        get: function get() {
	            return new files_1.File(this, "file");
	        }
	    }]);
	
	    return Item;
	}(queryablesecurable_1.QueryableSecurable);
	
	exports.Item = Item;
	/**
	 * Provides paging functionality for list items
	 */
	
	var PagedItemCollection = function () {
	    function PagedItemCollection(nextUrl, results) {
	        _classCallCheck(this, PagedItemCollection);
	
	        this.nextUrl = nextUrl;
	        this.results = results;
	    }
	    /**
	     * If true there are more results available in the set, otherwise there are not
	     */
	
	
	    _createClass(PagedItemCollection, [{
	        key: "getNext",
	
	        /**
	         * Gets the next set of results, or resolves to null if no results are available
	         */
	        value: function getNext() {
	            if (this.hasNext) {
	                var items = new Items(this.nextUrl, null);
	                return items.getPaged();
	            }
	            return new Promise(function (r) {
	                return r(null);
	            });
	        }
	    }, {
	        key: "hasNext",
	        get: function get() {
	            return typeof this.nextUrl === "string" && this.nextUrl.length > 0;
	        }
	    }]);
	
	    return PagedItemCollection;
	}();
	
	exports.PagedItemCollection = PagedItemCollection;
	
	var PagedItemCollectionParser = function (_odata_1$ODataParserB) {
	    _inherits(PagedItemCollectionParser, _odata_1$ODataParserB);
	
	    function PagedItemCollectionParser() {
	        _classCallCheck(this, PagedItemCollectionParser);
	
	        return _possibleConstructorReturn(this, (PagedItemCollectionParser.__proto__ || Object.getPrototypeOf(PagedItemCollectionParser)).apply(this, arguments));
	    }
	
	    _createClass(PagedItemCollectionParser, [{
	        key: "parse",
	        value: function parse(r) {
	            var _this6 = this;
	
	            return new Promise(function (resolve, reject) {
	                if (_this6.handleError(r, reject)) {
	                    r.json().then(function (json) {
	                        var nextUrl = json.hasOwnProperty("d") && json.d.hasOwnProperty("__next") ? json.d.__next : json["odata.nextLink"];
	                        resolve(new PagedItemCollection(nextUrl, _this6.parseODataJSON(json)));
	                    });
	                }
	            });
	        }
	    }]);
	
	    return PagedItemCollectionParser;
	}(odata_1.ODataParserBase);
	
	var ItemUpdatedParser = function (_odata_1$ODataParserB2) {
	    _inherits(ItemUpdatedParser, _odata_1$ODataParserB2);
	
	    function ItemUpdatedParser() {
	        _classCallCheck(this, ItemUpdatedParser);
	
	        return _possibleConstructorReturn(this, (ItemUpdatedParser.__proto__ || Object.getPrototypeOf(ItemUpdatedParser)).apply(this, arguments));
	    }
	
	    _createClass(ItemUpdatedParser, [{
	        key: "parse",
	        value: function parse(r) {
	            var _this8 = this;
	
	            return new Promise(function (resolve, reject) {
	                if (_this8.handleError(r, reject)) {
	                    resolve({
	                        "odata.etag": r.headers.get("etag")
	                    });
	                }
	            });
	        }
	    }]);
	
	    return ItemUpdatedParser;
	}(odata_1.ODataParserBase);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	var files_1 = __webpack_require__(26);
	var items_1 = __webpack_require__(24);
	/**
	 * Describes a collection of Folder objects
	 *
	 */
	
	var Folders = function (_queryable_1$Queryabl) {
	    _inherits(Folders, _queryable_1$Queryabl);
	
	    /**
	     * Creates a new instance of the Folders class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Folders(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "folders";
	
	        _classCallCheck(this, Folders);
	
	        return _possibleConstructorReturn(this, (Folders.__proto__ || Object.getPrototypeOf(Folders)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets a folder by folder name
	     *
	     */
	
	
	    _createClass(Folders, [{
	        key: "getByName",
	        value: function getByName(name) {
	            var f = new Folder(this);
	            f.concat("('" + name + "')");
	            return f;
	        }
	        /**
	         * Adds a new folder to the current folder (relative) or any folder (absolute)
	         *
	         * @param url The relative or absolute url where the new folder will be created. Urls starting with a forward slash are absolute.
	         * @returns The new Folder and the raw response.
	         */
	
	    }, {
	        key: "add",
	        value: function add(url) {
	            var _this2 = this;
	
	            return new Folders(this, "add('" + url + "')").post().then(function (response) {
	                return {
	                    data: response,
	                    folder: _this2.getByName(url)
	                };
	            });
	        }
	    }]);
	
	    return Folders;
	}(queryable_1.QueryableCollection);
	
	exports.Folders = Folders;
	/**
	 * Describes a single Folder instance
	 *
	 */
	
	var Folder = function (_queryable_1$Queryabl2) {
	    _inherits(Folder, _queryable_1$Queryabl2);
	
	    //
	    // TODO:
	    //      Properties (https://msdn.microsoft.com/en-us/library/office/dn450841.aspx#bk_FolderProperties)
	    //          UniqueContentTypeOrder (setter)
	    //          WelcomePage (setter)
	    //
	    /**
	     * Creates a new instance of the Folder class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     * @param path Optional, if supplied will be appended to the supplied baseUrl
	     */
	    function Folder(baseUrl, path) {
	        _classCallCheck(this, Folder);
	
	        return _possibleConstructorReturn(this, (Folder.__proto__ || Object.getPrototypeOf(Folder)).call(this, baseUrl, path));
	    }
	    /**
	     * Specifies the sequence in which content types are displayed.
	     *
	     */
	
	
	    _createClass(Folder, [{
	        key: "delete",
	
	        /**
	        * Delete this folder
	        *
	        * @param eTag Value used in the IF-Match header, by default "*"
	        */
	        value: function _delete() {
	            var eTag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
	
	            return new Folder(this).post({
	                headers: {
	                    "IF-Match": eTag,
	                    "X-HTTP-Method": "DELETE"
	                }
	            });
	        }
	        /**
	         * Moves the folder to the Recycle Bin and returns the identifier of the new Recycle Bin item.
	         */
	
	    }, {
	        key: "recycle",
	        value: function recycle() {
	            return new Folder(this, "recycle").post();
	        }
	    }, {
	        key: "contentTypeOrder",
	        get: function get() {
	            return new queryable_1.QueryableCollection(this, "contentTypeOrder");
	        }
	        /**
	         * Gets this folder's files
	         *
	         */
	
	    }, {
	        key: "files",
	        get: function get() {
	            return new files_1.Files(this);
	        }
	        /**
	         * Gets this folder's sub folders
	         *
	         */
	
	    }, {
	        key: "folders",
	        get: function get() {
	            return new Folders(this);
	        }
	        /**
	         * Gets this folder's list item
	         *
	         */
	
	    }, {
	        key: "listItemAllFields",
	        get: function get() {
	            return new items_1.Item(this, "listItemAllFields");
	        }
	        /**
	         * Gets the parent folder, if available
	         *
	         */
	
	    }, {
	        key: "parentFolder",
	        get: function get() {
	            return new Folder(this, "parentFolder");
	        }
	        /**
	         * Gets this folder's properties
	         *
	         */
	
	    }, {
	        key: "properties",
	        get: function get() {
	            return new queryable_1.QueryableInstance(this, "properties");
	        }
	        /**
	         * Gets this folder's server relative url
	         *
	         */
	
	    }, {
	        key: "serverRelativeUrl",
	        get: function get() {
	            return new queryable_1.Queryable(this, "serverRelativeUrl");
	        }
	        /**
	         * Gets a value that specifies the content type order.
	         *
	         */
	
	    }, {
	        key: "uniqueContentTypeOrder",
	        get: function get() {
	            return new queryable_1.QueryableCollection(this, "uniqueContentTypeOrder");
	        }
	    }]);
	
	    return Folder;
	}(queryable_1.QueryableInstance);
	
	exports.Folder = Folder;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	var items_1 = __webpack_require__(24);
	var odata_1 = __webpack_require__(11);
	var util_1 = __webpack_require__(1);
	var exceptions_1 = __webpack_require__(14);
	/**
	 * Describes a collection of File objects
	 *
	 */
	
	var Files = function (_queryable_1$Queryabl) {
	    _inherits(Files, _queryable_1$Queryabl);
	
	    /**
	     * Creates a new instance of the Files class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Files(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "files";
	
	        _classCallCheck(this, Files);
	
	        return _possibleConstructorReturn(this, (Files.__proto__ || Object.getPrototypeOf(Files)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets a File by filename
	     *
	     * @param name The name of the file, including extension.
	     */
	
	
	    _createClass(Files, [{
	        key: "getByName",
	        value: function getByName(name) {
	            var f = new File(this);
	            f.concat("('" + name + "')");
	            return f;
	        }
	        /**
	         * Uploads a file.
	         *
	         * @param url The folder-relative url of the file.
	         * @param content The file contents blob.
	         * @param shouldOverWrite Should a file with the same name in the same location be overwritten? (default: true)
	         * @returns The new File and the raw response.
	         */
	
	    }, {
	        key: "add",
	        value: function add(url, content) {
	            var _this2 = this;
	
	            var shouldOverWrite = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	
	            return new Files(this, "add(overwrite=" + shouldOverWrite + ",url='" + url + "')").post({
	                body: content
	            }).then(function (response) {
	                return {
	                    data: response,
	                    file: _this2.getByName(url)
	                };
	            });
	        }
	        /**
	         * Uploads a file.
	         *
	         * @param url The folder-relative url of the file.
	         * @param content The Blob file content to add
	         * @param progress A callback function which can be used to track the progress of the upload
	         * @param shouldOverWrite Should a file with the same name in the same location be overwritten? (default: true)
	         * @param chunkSize The size of each file slice, in bytes (default: 10485760)
	         * @returns The new File and the raw response.
	         */
	
	    }, {
	        key: "addChunked",
	        value: function addChunked(url, content, progress) {
	            var _this3 = this;
	
	            var shouldOverWrite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	            var chunkSize = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 10485760;
	
	            var adder = new Files(this, "add(overwrite=" + shouldOverWrite + ",url='" + url + "')");
	            return adder.post().then(function () {
	                return _this3.getByName(url);
	            }).then(function (file) {
	                return file.setContentChunked(content, progress, chunkSize);
	            }).then(function (response) {
	                return {
	                    data: response,
	                    file: _this3.getByName(url)
	                };
	            });
	        }
	        /**
	         * Adds a ghosted file to an existing list or document library.
	         *
	         * @param fileUrl The server-relative url where you want to save the file.
	         * @param templateFileType The type of use to create the file.
	         * @returns The template file that was added and the raw response.
	         */
	
	    }, {
	        key: "addTemplateFile",
	        value: function addTemplateFile(fileUrl, templateFileType) {
	            var _this4 = this;
	
	            return new Files(this, "addTemplateFile(urloffile='" + fileUrl + "',templatefiletype=" + templateFileType + ")").post().then(function (response) {
	                return {
	                    data: response,
	                    file: _this4.getByName(fileUrl)
	                };
	            });
	        }
	    }]);
	
	    return Files;
	}(queryable_1.QueryableCollection);
	
	exports.Files = Files;
	/**
	 * Describes a single File instance
	 *
	 */
	
	var File = function (_queryable_1$Queryabl2) {
	    _inherits(File, _queryable_1$Queryabl2);
	
	    /**
	     * Creates a new instance of the File class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     * @param path Optional, if supplied will be appended to the supplied baseUrl
	     */
	    function File(baseUrl, path) {
	        _classCallCheck(this, File);
	
	        return _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets a value that specifies the list item field values for the list item corresponding to the file.
	     *
	     */
	
	
	    _createClass(File, [{
	        key: "approve",
	
	        /**
	         * Approves the file submitted for content approval with the specified comment.
	         * Only documents in lists that are enabled for content approval can be approved.
	         *
	         * @param comment The comment for the approval.
	         */
	        value: function approve(comment) {
	            return new File(this, "approve(comment='" + comment + "')").post();
	        }
	        /**
	         * Stops the chunk upload session without saving the uploaded data.
	         * If the file doesn’t already exist in the library, the partially uploaded file will be deleted.
	         * Use this in response to user action (as in a request to cancel an upload) or an error or exception.
	         * Use the uploadId value that was passed to the StartUpload method that started the upload session.
	         * This method is currently available only on Office 365.
	         *
	         * @param uploadId The unique identifier of the upload session.
	         */
	
	    }, {
	        key: "cancelUpload",
	        value: function cancelUpload(uploadId) {
	            return new File(this, "cancelUpload(uploadId=guid'" + uploadId + "')").post();
	        }
	        /**
	         * Checks the file in to a document library based on the check-in type.
	         *
	         * @param comment A comment for the check-in. Its length must be <= 1023.
	         * @param checkinType The check-in type for the file.
	         */
	
	    }, {
	        key: "checkin",
	        value: function checkin() {
	            var comment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	            var checkinType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : CheckinType.Major;
	
	            // TODO: Enforce comment length <= 1023
	            return new File(this, "checkin(comment='" + comment + "',checkintype=" + checkinType + ")").post();
	        }
	        /**
	         * Checks out the file from a document library.
	         */
	
	    }, {
	        key: "checkout",
	        value: function checkout() {
	            return new File(this, "checkout").post();
	        }
	        /**
	         * Copies the file to the destination url.
	         *
	         * @param url The absolute url or server relative url of the destination file path to copy to.
	         * @param shouldOverWrite Should a file with the same name in the same location be overwritten?
	         */
	
	    }, {
	        key: "copyTo",
	        value: function copyTo(url) {
	            var shouldOverWrite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	            return new File(this, "copyTo(strnewurl='" + url + "',boverwrite=" + shouldOverWrite + ")").post();
	        }
	        /**
	         * Delete this file.
	         *
	         * @param eTag Value used in the IF-Match header, by default "*"
	         */
	
	    }, {
	        key: "delete",
	        value: function _delete() {
	            var eTag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
	
	            return new File(this).post({
	                headers: {
	                    "IF-Match": eTag,
	                    "X-HTTP-Method": "DELETE"
	                }
	            });
	        }
	        /**
	         * Denies approval for a file that was submitted for content approval.
	         * Only documents in lists that are enabled for content approval can be denied.
	         *
	         * @param comment The comment for the denial.
	         */
	
	    }, {
	        key: "deny",
	        value: function deny() {
	            var comment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	
	            return new File(this, "deny(comment='" + comment + "')").post();
	        }
	        /**
	         * Specifies the control set used to access, modify, or add Web Parts associated with this Web Part Page and view.
	         * An exception is thrown if the file is not an ASPX page.
	         *
	         * @param scope The WebPartsPersonalizationScope view on the Web Parts page.
	         */
	
	    }, {
	        key: "getLimitedWebPartManager",
	        value: function getLimitedWebPartManager() {
	            var scope = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : WebPartsPersonalizationScope.User;
	
	            return new queryable_1.Queryable(this, "getLimitedWebPartManager(scope=" + scope + ")");
	        }
	        /**
	         * Moves the file to the specified destination url.
	         *
	         * @param url The absolute url or server relative url of the destination file path to move to.
	         * @param moveOperations The bitwise MoveOperations value for how to move the file.
	         */
	
	    }, {
	        key: "moveTo",
	        value: function moveTo(url) {
	            var moveOperations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : MoveOperations.Overwrite;
	
	            return new File(this, "moveTo(newurl='" + url + "',flags=" + moveOperations + ")").post();
	        }
	        /**
	         * Submits the file for content approval with the specified comment.
	         *
	         * @param comment The comment for the published file. Its length must be <= 1023.
	         */
	
	    }, {
	        key: "publish",
	        value: function publish() {
	            var comment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	
	            return new File(this, "publish(comment='" + comment + "')").post();
	        }
	        /**
	         * Moves the file to the Recycle Bin and returns the identifier of the new Recycle Bin item.
	         *
	         * @returns The GUID of the recycled file.
	         */
	
	    }, {
	        key: "recycle",
	        value: function recycle() {
	            return new File(this, "recycle").post();
	        }
	        /**
	         * Reverts an existing checkout for the file.
	         *
	         */
	
	    }, {
	        key: "undoCheckout",
	        value: function undoCheckout() {
	            return new File(this, "undoCheckout").post();
	        }
	        /**
	         * Removes the file from content approval or unpublish a major version.
	         *
	         * @param comment The comment for the unpublish operation. Its length must be <= 1023.
	         */
	
	    }, {
	        key: "unpublish",
	        value: function unpublish() {
	            var comment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
	
	            if (comment.length > 1023) {
	                throw new exceptions_1.MaxCommentLengthException();
	            }
	            return new File(this, "unpublish(comment='" + comment + "')").post();
	        }
	        /**
	         * Gets the contents of the file as text
	         *
	         */
	
	    }, {
	        key: "getText",
	        value: function getText() {
	            return new File(this, "$value").get(new odata_1.TextFileParser(), { headers: { "binaryStringResponseBody": "true" } });
	        }
	        /**
	         * Gets the contents of the file as a blob, does not work in Node.js
	         *
	         */
	
	    }, {
	        key: "getBlob",
	        value: function getBlob() {
	            return new File(this, "$value").get(new odata_1.BlobFileParser(), { headers: { "binaryStringResponseBody": "true" } });
	        }
	        /**
	         * Gets the contents of a file as an ArrayBuffer, works in Node.js
	         */
	
	    }, {
	        key: "getBuffer",
	        value: function getBuffer() {
	            return new File(this, "$value").get(new odata_1.BufferFileParser(), { headers: { "binaryStringResponseBody": "true" } });
	        }
	        /**
	         * Gets the contents of a file as an ArrayBuffer, works in Node.js
	         */
	
	    }, {
	        key: "getJSON",
	        value: function getJSON() {
	            return new File(this, "$value").get(new odata_1.JSONFileParser(), { headers: { "binaryStringResponseBody": "true" } });
	        }
	        /**
	         * Sets the content of a file, for large files use setContentChunked
	         *
	         * @param content The file content
	         *
	         */
	
	    }, {
	        key: "setContent",
	        value: function setContent(content) {
	            var _this6 = this;
	
	            var setter = new File(this, "$value");
	            return setter.post({
	                body: content,
	                headers: {
	                    "X-HTTP-Method": "PUT"
	                }
	            }).then(function (_) {
	                return new File(_this6);
	            });
	        }
	        /**
	         * Sets the contents of a file using a chunked upload approach
	         *
	         * @param file The file to upload
	         * @param progress A callback function which can be used to track the progress of the upload
	         * @param chunkSize The size of each file slice, in bytes (default: 10485760)
	         */
	
	    }, {
	        key: "setContentChunked",
	        value: function setContentChunked(file, progress) {
	            var chunkSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10485760;
	
	            if (typeof progress === "undefined") {
	                progress = function progress() {
	                    return null;
	                };
	            }
	            var self = this;
	            var fileSize = file.size;
	            var blockCount = parseInt((file.size / chunkSize).toString(), 10) + (file.size % chunkSize === 0 ? 1 : 0);
	            console.log("blockCount: " + blockCount);
	            var uploadId = util_1.Util.getGUID();
	            // start the chain with the first fragment
	            progress({ blockNumber: 1, chunkSize: chunkSize, currentPointer: 0, fileSize: fileSize, stage: "starting", totalBlocks: blockCount });
	            var chain = self.startUpload(uploadId, file.slice(0, chunkSize));
	            // skip the first and last blocks
	
	            var _loop = function _loop(i) {
	                chain = chain.then(function (pointer) {
	                    progress({ blockNumber: i, chunkSize: chunkSize, currentPointer: pointer, fileSize: fileSize, stage: "continue", totalBlocks: blockCount });
	                    return self.continueUpload(uploadId, pointer, file.slice(pointer, pointer + chunkSize));
	                });
	            };
	
	            for (var i = 2; i < blockCount; i++) {
	                _loop(i);
	            }
	            return chain.then(function (pointer) {
	                progress({ blockNumber: blockCount, chunkSize: chunkSize, currentPointer: pointer, fileSize: fileSize, stage: "finishing", totalBlocks: blockCount });
	                return self.finishUpload(uploadId, pointer, file.slice(pointer));
	            }).then(function (_) {
	                return self;
	            });
	        }
	        /**
	         * Starts a new chunk upload session and uploads the first fragment.
	         * The current file content is not changed when this method completes.
	         * The method is idempotent (and therefore does not change the result) as long as you use the same values for uploadId and stream.
	         * The upload session ends either when you use the CancelUpload method or when you successfully
	         * complete the upload session by passing the rest of the file contents through the ContinueUpload and FinishUpload methods.
	         * The StartUpload and ContinueUpload methods return the size of the running total of uploaded data in bytes,
	         * so you can pass those return values to subsequent uses of ContinueUpload and FinishUpload.
	         * This method is currently available only on Office 365.
	         *
	         * @param uploadId The unique identifier of the upload session.
	         * @param fragment The file contents.
	         * @returns The size of the total uploaded data in bytes.
	         */
	
	    }, {
	        key: "startUpload",
	        value: function startUpload(uploadId, fragment) {
	            return new File(this, "startUpload(uploadId=guid'" + uploadId + "')").postAs({ body: fragment }).then(function (n) {
	                return parseFloat(n);
	            });
	        }
	        /**
	         * Continues the chunk upload session with an additional fragment.
	         * The current file content is not changed.
	         * Use the uploadId value that was passed to the StartUpload method that started the upload session.
	         * This method is currently available only on Office 365.
	         *
	         * @param uploadId The unique identifier of the upload session.
	         * @param fileOffset The size of the offset into the file where the fragment starts.
	         * @param fragment The file contents.
	         * @returns The size of the total uploaded data in bytes.
	         */
	
	    }, {
	        key: "continueUpload",
	        value: function continueUpload(uploadId, fileOffset, fragment) {
	            return new File(this, "continueUpload(uploadId=guid'" + uploadId + "',fileOffset=" + fileOffset + ")").postAs({ body: fragment }).then(function (n) {
	                return parseFloat(n);
	            });
	        }
	        /**
	         * Uploads the last file fragment and commits the file. The current file content is changed when this method completes.
	         * Use the uploadId value that was passed to the StartUpload method that started the upload session.
	         * This method is currently available only on Office 365.
	         *
	         * @param uploadId The unique identifier of the upload session.
	         * @param fileOffset The size of the offset into the file where the fragment starts.
	         * @param fragment The file contents.
	         * @returns The newly uploaded file.
	         */
	
	    }, {
	        key: "finishUpload",
	        value: function finishUpload(uploadId, fileOffset, fragment) {
	            return new File(this, "finishUpload(uploadId=guid'" + uploadId + "',fileOffset=" + fileOffset + ")").postAs({ body: fragment }).then(function (response) {
	                return {
	                    data: response,
	                    file: new File(response.ServerRelativeUrl)
	                };
	            });
	        }
	    }, {
	        key: "listItemAllFields",
	        get: function get() {
	            return new items_1.Item(this, "listItemAllFields");
	        }
	        /**
	         * Gets a collection of versions
	         *
	         */
	
	    }, {
	        key: "versions",
	        get: function get() {
	            return new Versions(this);
	        }
	    }]);
	
	    return File;
	}(queryable_1.QueryableInstance);
	
	exports.File = File;
	/**
	 * Describes a collection of Version objects
	 *
	 */
	
	var Versions = function (_queryable_1$Queryabl3) {
	    _inherits(Versions, _queryable_1$Queryabl3);
	
	    /**
	     * Creates a new instance of the File class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Versions(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "versions";
	
	        _classCallCheck(this, Versions);
	
	        return _possibleConstructorReturn(this, (Versions.__proto__ || Object.getPrototypeOf(Versions)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets a version by id
	     *
	     * @param versionId The id of the version to retrieve
	     */
	
	
	    _createClass(Versions, [{
	        key: "getById",
	        value: function getById(versionId) {
	            var v = new Version(this);
	            v.concat("(" + versionId + ")");
	            return v;
	        }
	        /**
	         * Deletes all the file version objects in the collection.
	         *
	         */
	
	    }, {
	        key: "deleteAll",
	        value: function deleteAll() {
	            return new Versions(this, "deleteAll").post();
	        }
	        /**
	         * Deletes the specified version of the file.
	         *
	         * @param versionId The ID of the file version to delete.
	         */
	
	    }, {
	        key: "deleteById",
	        value: function deleteById(versionId) {
	            return new Versions(this, "deleteById(vid=" + versionId + ")").post();
	        }
	        /**
	         * Deletes the file version object with the specified version label.
	         *
	         * @param label The version label of the file version to delete, for example: 1.2
	         */
	
	    }, {
	        key: "deleteByLabel",
	        value: function deleteByLabel(label) {
	            return new Versions(this, "deleteByLabel(versionlabel='" + label + "')").post();
	        }
	        /**
	         * Creates a new file version from the file specified by the version label.
	         *
	         * @param label The version label of the file version to restore, for example: 1.2
	         */
	
	    }, {
	        key: "restoreByLabel",
	        value: function restoreByLabel(label) {
	            return new Versions(this, "restoreByLabel(versionlabel='" + label + "')").post();
	        }
	    }]);
	
	    return Versions;
	}(queryable_1.QueryableCollection);
	
	exports.Versions = Versions;
	/**
	 * Describes a single Version instance
	 *
	 */
	
	var Version = function (_queryable_1$Queryabl4) {
	    _inherits(Version, _queryable_1$Queryabl4);
	
	    /**
	     * Creates a new instance of the Version class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     * @param path Optional, if supplied will be appended to the supplied baseUrl
	     */
	    function Version(baseUrl, path) {
	        _classCallCheck(this, Version);
	
	        return _possibleConstructorReturn(this, (Version.__proto__ || Object.getPrototypeOf(Version)).call(this, baseUrl, path));
	    }
	    /**
	    * Delete a specific version of a file.
	    *
	    * @param eTag Value used in the IF-Match header, by default "*"
	    */
	
	
	    _createClass(Version, [{
	        key: "delete",
	        value: function _delete() {
	            var eTag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
	
	            return this.post({
	                headers: {
	                    "IF-Match": eTag,
	                    "X-HTTP-Method": "DELETE"
	                }
	            });
	        }
	    }]);
	
	    return Version;
	}(queryable_1.QueryableInstance);
	
	exports.Version = Version;
	var CheckinType;
	(function (CheckinType) {
	    CheckinType[CheckinType["Minor"] = 0] = "Minor";
	    CheckinType[CheckinType["Major"] = 1] = "Major";
	    CheckinType[CheckinType["Overwrite"] = 2] = "Overwrite";
	})(CheckinType = exports.CheckinType || (exports.CheckinType = {}));
	var WebPartsPersonalizationScope;
	(function (WebPartsPersonalizationScope) {
	    WebPartsPersonalizationScope[WebPartsPersonalizationScope["User"] = 0] = "User";
	    WebPartsPersonalizationScope[WebPartsPersonalizationScope["Shared"] = 1] = "Shared";
	})(WebPartsPersonalizationScope = exports.WebPartsPersonalizationScope || (exports.WebPartsPersonalizationScope = {}));
	var MoveOperations;
	(function (MoveOperations) {
	    MoveOperations[MoveOperations["Overwrite"] = 1] = "Overwrite";
	    MoveOperations[MoveOperations["AllowBrokenThickets"] = 8] = "AllowBrokenThickets";
	})(MoveOperations = exports.MoveOperations || (exports.MoveOperations = {}));
	var TemplateFileType;
	(function (TemplateFileType) {
	    TemplateFileType[TemplateFileType["StandardPage"] = 0] = "StandardPage";
	    TemplateFileType[TemplateFileType["WikiPage"] = 1] = "WikiPage";
	    TemplateFileType[TemplateFileType["FormPage"] = 2] = "FormPage";
	})(TemplateFileType = exports.TemplateFileType || (exports.TemplateFileType = {}));

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var util_1 = __webpack_require__(1);
	var queryable_1 = __webpack_require__(8);
	/**
	 * Describes a collection of content types
	 *
	 */
	
	var ContentTypes = function (_queryable_1$Queryabl) {
	    _inherits(ContentTypes, _queryable_1$Queryabl);
	
	    /**
	     * Creates a new instance of the ContentTypes class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this content types collection
	     */
	    function ContentTypes(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "contenttypes";
	
	        _classCallCheck(this, ContentTypes);
	
	        return _possibleConstructorReturn(this, (ContentTypes.__proto__ || Object.getPrototypeOf(ContentTypes)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets a ContentType by content type id
	     */
	
	
	    _createClass(ContentTypes, [{
	        key: "getById",
	        value: function getById(id) {
	            var ct = new ContentType(this);
	            ct.concat("('" + id + "')");
	            return ct;
	        }
	        /**
	         * Adds an existing contenttype to a content type collection
	         *
	         * @param contentTypeId in the following format, for example: 0x010102
	         */
	
	    }, {
	        key: "addAvailableContentType",
	        value: function addAvailableContentType(contentTypeId) {
	            var _this2 = this;
	
	            var postBody = JSON.stringify({
	                "contentTypeId": contentTypeId
	            });
	            return new ContentTypes(this, "addAvailableContentType").postAs({ body: postBody }).then(function (data) {
	                return {
	                    contentType: _this2.getById(data.id),
	                    data: data
	                };
	            });
	        }
	        /**
	         * Adds a new content type to the collection
	         *
	         * @param id The desired content type id for the new content type (also determines the parent content type)
	         * @param name The name of the content type
	         * @param description The description of the content type
	         * @param group The group in which to add the content type
	         * @param additionalSettings Any additional settings to provide when creating the content type
	         *
	         */
	
	    }, {
	        key: "add",
	        value: function add(id, name) {
	            var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
	
	            var _this3 = this;
	
	            var group = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Custom Content Types";
	            var additionalSettings = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
	
	            var postBody = JSON.stringify(util_1.Util.extend({
	                "__metadata": { "type": "SP.ContentType" },
	                "Id": { "StringValue": id },
	                "Name": name,
	                "Group": group,
	                "Description": description
	            }, additionalSettings));
	            return this.post({ body: postBody }).then(function (data) {
	                return { contentType: _this3.getById(data.id), data: data };
	            });
	        }
	    }]);
	
	    return ContentTypes;
	}(queryable_1.QueryableCollection);
	
	exports.ContentTypes = ContentTypes;
	/**
	 * Describes a single ContentType instance
	 *
	 */
	
	var ContentType = function (_queryable_1$Queryabl2) {
	    _inherits(ContentType, _queryable_1$Queryabl2);
	
	    /**
	     * Creates a new instance of the ContentType class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this content type instance
	     */
	    function ContentType(baseUrl, path) {
	        _classCallCheck(this, ContentType);
	
	        return _possibleConstructorReturn(this, (ContentType.__proto__ || Object.getPrototypeOf(ContentType)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets the column (also known as field) references in the content type.
	    */
	
	
	    _createClass(ContentType, [{
	        key: "fieldLinks",
	        get: function get() {
	            return new FieldLinks(this);
	        }
	        /**
	         * Gets a value that specifies the collection of fields for the content type.
	         */
	
	    }, {
	        key: "fields",
	        get: function get() {
	            return new queryable_1.QueryableCollection(this, "fields");
	        }
	        /**
	         * Gets the parent content type of the content type.
	         */
	
	    }, {
	        key: "parent",
	        get: function get() {
	            return new ContentType(this, "parent");
	        }
	        /**
	         * Gets a value that specifies the collection of workflow associations for the content type.
	         */
	
	    }, {
	        key: "workflowAssociations",
	        get: function get() {
	            return new queryable_1.QueryableCollection(this, "workflowAssociations");
	        }
	    }]);
	
	    return ContentType;
	}(queryable_1.QueryableInstance);
	
	exports.ContentType = ContentType;
	/**
	 * Represents a collection of field link instances
	 */
	
	var FieldLinks = function (_queryable_1$Queryabl3) {
	    _inherits(FieldLinks, _queryable_1$Queryabl3);
	
	    /**
	     * Creates a new instance of the ContentType class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this content type instance
	     */
	    function FieldLinks(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "fieldlinks";
	
	        _classCallCheck(this, FieldLinks);
	
	        return _possibleConstructorReturn(this, (FieldLinks.__proto__ || Object.getPrototypeOf(FieldLinks)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets a FieldLink by GUID id
	     *
	     * @param id The GUID id of the field link
	     */
	
	
	    _createClass(FieldLinks, [{
	        key: "getById",
	        value: function getById(id) {
	            var fl = new FieldLink(this);
	            fl.concat("(guid'" + id + "')");
	            return fl;
	        }
	    }]);
	
	    return FieldLinks;
	}(queryable_1.QueryableCollection);
	
	exports.FieldLinks = FieldLinks;
	/**
	 * Represents a field link instance
	 */
	
	var FieldLink = function (_queryable_1$Queryabl4) {
	    _inherits(FieldLink, _queryable_1$Queryabl4);
	
	    /**
	     * Creates a new instance of the ContentType class
	    *
	    * @param baseUrl The url or Queryable which forms the parent of this content type instance
	    */
	    function FieldLink(baseUrl, path) {
	        _classCallCheck(this, FieldLink);
	
	        return _possibleConstructorReturn(this, (FieldLink.__proto__ || Object.getPrototypeOf(FieldLink)).call(this, baseUrl, path));
	    }
	
	    return FieldLink;
	}(queryable_1.QueryableInstance);
	
	exports.FieldLink = FieldLink;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	var odata_1 = __webpack_require__(11);
	/**
	 * Describes a collection of Item objects
	 *
	 */
	
	var AttachmentFiles = function (_queryable_1$Queryabl) {
	    _inherits(AttachmentFiles, _queryable_1$Queryabl);
	
	    /**
	     * Creates a new instance of the AttachmentFiles class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this attachments collection
	     */
	    function AttachmentFiles(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "AttachmentFiles";
	
	        _classCallCheck(this, AttachmentFiles);
	
	        return _possibleConstructorReturn(this, (AttachmentFiles.__proto__ || Object.getPrototypeOf(AttachmentFiles)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets a Attachment File by filename
	     *
	     * @param name The name of the file, including extension.
	     */
	
	
	    _createClass(AttachmentFiles, [{
	        key: "getByName",
	        value: function getByName(name) {
	            var f = new AttachmentFile(this);
	            f.concat("('" + name + "')");
	            return f;
	        }
	        /**
	         * Adds a new attachment to the collection
	         *
	         * @param name The name of the file, including extension.
	         * @param content The Base64 file content.
	         */
	
	    }, {
	        key: "add",
	        value: function add(name, content) {
	            var _this2 = this;
	
	            return new AttachmentFiles(this, "add(FileName='" + name + "')").post({
	                body: content
	            }).then(function (response) {
	                return {
	                    data: response,
	                    file: _this2.getByName(name)
	                };
	            });
	        }
	    }]);
	
	    return AttachmentFiles;
	}(queryable_1.QueryableCollection);
	
	exports.AttachmentFiles = AttachmentFiles;
	/**
	 * Describes a single attachment file instance
	 *
	 */
	
	var AttachmentFile = function (_queryable_1$Queryabl2) {
	    _inherits(AttachmentFile, _queryable_1$Queryabl2);
	
	    /**
	     * Creates a new instance of the AttachmentFile class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this attachment file
	     */
	    function AttachmentFile(baseUrl, path) {
	        _classCallCheck(this, AttachmentFile);
	
	        return _possibleConstructorReturn(this, (AttachmentFile.__proto__ || Object.getPrototypeOf(AttachmentFile)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets the contents of the file as text
	     *
	     */
	
	
	    _createClass(AttachmentFile, [{
	        key: "getText",
	        value: function getText() {
	            return new AttachmentFile(this, "$value").get(new odata_1.TextFileParser());
	        }
	        /**
	         * Gets the contents of the file as a blob, does not work in Node.js
	         *
	         */
	
	    }, {
	        key: "getBlob",
	        value: function getBlob() {
	            return new AttachmentFile(this, "$value").get(new odata_1.BlobFileParser());
	        }
	        /**
	         * Gets the contents of a file as an ArrayBuffer, works in Node.js
	         */
	
	    }, {
	        key: "getBuffer",
	        value: function getBuffer() {
	            return new AttachmentFile(this, "$value").get(new odata_1.BufferFileParser());
	        }
	        /**
	         * Gets the contents of a file as an ArrayBuffer, works in Node.js
	         */
	
	    }, {
	        key: "getJSON",
	        value: function getJSON() {
	            return new AttachmentFile(this, "$value").get(new odata_1.JSONFileParser());
	        }
	        /**
	         * Delete this attachment file
	         *
	         * @param eTag Value used in the IF-Match header, by default "*"
	         */
	
	    }, {
	        key: "delete",
	        value: function _delete() {
	            var eTag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
	
	            return this.post({
	                headers: {
	                    "IF-Match": eTag,
	                    "X-HTTP-Method": "DELETE"
	                }
	            });
	        }
	    }]);
	
	    return AttachmentFile;
	}(queryable_1.QueryableInstance);
	
	exports.AttachmentFile = AttachmentFile;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	var util_1 = __webpack_require__(1);
	/**
	 * Describes the views available in the current context
	 *
	 */
	
	var Views = function (_queryable_1$Queryabl) {
	    _inherits(Views, _queryable_1$Queryabl);
	
	    /**
	     * Creates a new instance of the Views class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Views(baseUrl) {
	        _classCallCheck(this, Views);
	
	        return _possibleConstructorReturn(this, (Views.__proto__ || Object.getPrototypeOf(Views)).call(this, baseUrl, "views"));
	    }
	    /**
	     * Gets a view by guid id
	     *
	     * @param id The GUID id of the view
	     */
	
	
	    _createClass(Views, [{
	        key: "getById",
	        value: function getById(id) {
	            var v = new View(this);
	            v.concat("('" + id + "')");
	            return v;
	        }
	        /**
	         * Gets a view by title (case-sensitive)
	         *
	         * @param title The case-sensitive title of the view
	         */
	
	    }, {
	        key: "getByTitle",
	        value: function getByTitle(title) {
	            return new View(this, "getByTitle('" + title + "')");
	        }
	        /**
	         * Adds a new view to the collection
	         *
	         * @param title The new views's title
	         * @param personalView True if this is a personal view, otherwise false, default = false
	         * @param additionalSettings Will be passed as part of the view creation body
	         */
	        /*tslint:disable max-line-length */
	
	    }, {
	        key: "add",
	        value: function add(title) {
	            var _this2 = this;
	
	            var personalView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	            var additionalSettings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	            var postBody = JSON.stringify(util_1.Util.extend({
	                "__metadata": { "type": "SP.View" },
	                "Title": title,
	                "PersonalView": personalView
	            }, additionalSettings));
	            return this.postAs({ body: postBody }).then(function (data) {
	                return {
	                    data: data,
	                    view: _this2.getById(data.Id)
	                };
	            });
	        }
	    }]);
	
	    return Views;
	}(queryable_1.QueryableCollection);
	
	exports.Views = Views;
	/**
	 * Describes a single View instance
	 *
	 */
	
	var View = function (_queryable_1$Queryabl2) {
	    _inherits(View, _queryable_1$Queryabl2);
	
	    /**
	     * Creates a new instance of the View class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function View(baseUrl, path) {
	        _classCallCheck(this, View);
	
	        return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, baseUrl, path));
	    }
	
	    _createClass(View, [{
	        key: "update",
	
	        /**
	         * Updates this view intance with the supplied properties
	         *
	         * @param properties A plain object hash of values to update for the view
	         */
	        value: function update(properties) {
	            var _this4 = this;
	
	            var postBody = JSON.stringify(util_1.Util.extend({
	                "__metadata": { "type": "SP.View" }
	            }, properties));
	            return this.post({
	                body: postBody,
	                headers: {
	                    "X-HTTP-Method": "MERGE"
	                }
	            }).then(function (data) {
	                return {
	                    data: data,
	                    view: _this4
	                };
	            });
	        }
	        /**
	         * Delete this view
	         *
	         */
	
	    }, {
	        key: "delete",
	        value: function _delete() {
	            return this.post({
	                headers: {
	                    "X-HTTP-Method": "DELETE"
	                }
	            });
	        }
	        /**
	         * Returns the list view as HTML.
	         *
	         */
	
	    }, {
	        key: "renderAsHtml",
	        value: function renderAsHtml() {
	            var q = new queryable_1.Queryable(this, "renderashtml");
	            return q.get();
	        }
	    }, {
	        key: "fields",
	        get: function get() {
	            return new ViewFields(this);
	        }
	    }]);
	
	    return View;
	}(queryable_1.QueryableInstance);
	
	exports.View = View;
	
	var ViewFields = function (_queryable_1$Queryabl3) {
	    _inherits(ViewFields, _queryable_1$Queryabl3);
	
	    function ViewFields(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "viewfields";
	
	        _classCallCheck(this, ViewFields);
	
	        return _possibleConstructorReturn(this, (ViewFields.__proto__ || Object.getPrototypeOf(ViewFields)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets a value that specifies the XML schema that represents the collection.
	     */
	
	
	    _createClass(ViewFields, [{
	        key: "getSchemaXml",
	        value: function getSchemaXml() {
	            var q = new queryable_1.Queryable(this, "schemaxml");
	            return q.get();
	        }
	        /**
	         * Adds the field with the specified field internal name or display name to the collection.
	         *
	         * @param fieldTitleOrInternalName The case-sensitive internal name or display name of the field to add.
	         */
	
	    }, {
	        key: "add",
	        value: function add(fieldTitleOrInternalName) {
	            var q = new ViewFields(this, "addviewfield('" + fieldTitleOrInternalName + "')");
	            return q.post();
	        }
	        /**
	         * Moves the field with the specified field internal name to the specified position in the collection.
	         *
	         * @param fieldInternalName The case-sensitive internal name of the field to move.
	         * @param index The zero-based index of the new position for the field.
	         */
	
	    }, {
	        key: "move",
	        value: function move(fieldInternalName, index) {
	            var q = new ViewFields(this, "moveviewfieldto");
	            var postBody = JSON.stringify({ "field": fieldInternalName, "index": index });
	            return q.post({ body: postBody });
	        }
	        /**
	         * Removes all the fields from the collection.
	         */
	
	    }, {
	        key: "removeAll",
	        value: function removeAll() {
	            var q = new ViewFields(this, "removeallviewfields");
	            return q.post();
	        }
	        /**
	         * Removes the field with the specified field internal name from the collection.
	         *
	         * @param fieldInternalName The case-sensitive internal name of the field to remove from the view.
	         */
	
	    }, {
	        key: "remove",
	        value: function remove(fieldInternalName) {
	            var q = new ViewFields(this, "removeviewfield('" + fieldInternalName + "')");
	            return q.post();
	        }
	    }]);
	
	    return ViewFields;
	}(queryable_1.QueryableCollection);
	
	exports.ViewFields = ViewFields;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	var util_1 = __webpack_require__(1);
	var Types = __webpack_require__(31);
	/**
	 * Describes a collection of Field objects
	 *
	 */
	
	var Fields = function (_queryable_1$Queryabl) {
	    _inherits(Fields, _queryable_1$Queryabl);
	
	    /**
	     * Creates a new instance of the Fields class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Fields(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "fields";
	
	        _classCallCheck(this, Fields);
	
	        return _possibleConstructorReturn(this, (Fields.__proto__ || Object.getPrototypeOf(Fields)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets a field from the collection by title
	     *
	     * @param title The case-sensitive title of the field
	     */
	
	
	    _createClass(Fields, [{
	        key: "getByTitle",
	        value: function getByTitle(title) {
	            return new Field(this, "getByTitle('" + title + "')");
	        }
	        /**
	         * Gets a field from the collection by using internal name or title
	         *
	         * @param name The case-sensitive internal name or title of the field
	         */
	
	    }, {
	        key: "getByInternalNameOrTitle",
	        value: function getByInternalNameOrTitle(name) {
	            return new Field(this, "getByInternalNameOrTitle('" + name + "')");
	        }
	        /**
	         * Gets a list from the collection by guid id
	         *
	         * @param title The Id of the list
	         */
	
	    }, {
	        key: "getById",
	        value: function getById(id) {
	            var f = new Field(this);
	            f.concat("('" + id + "')");
	            return f;
	        }
	        /**
	         * Creates a field based on the specified schema
	         */
	
	    }, {
	        key: "createFieldAsXml",
	        value: function createFieldAsXml(xml) {
	            var _this2 = this;
	
	            var info = void 0;
	            if (typeof xml === "string") {
	                info = { SchemaXml: xml };
	            } else {
	                info = xml;
	            }
	            var postBody = JSON.stringify({
	                "parameters": util_1.Util.extend({
	                    "__metadata": {
	                        "type": "SP.XmlSchemaFieldCreationInformation"
	                    }
	                }, info)
	            });
	            var q = new Fields(this, "createfieldasxml");
	            return q.postAs({ body: postBody }).then(function (data) {
	                return {
	                    data: data,
	                    field: _this2.getById(data.Id)
	                };
	            });
	        }
	        /**
	         * Adds a new list to the collection
	         *
	         * @param title The new field's title
	         * @param fieldType The new field's type (ex: SP.FieldText)
	         * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
	         */
	
	    }, {
	        key: "add",
	        value: function add(title, fieldType) {
	            var _this3 = this;
	
	            var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	            var postBody = JSON.stringify(util_1.Util.extend({
	                "__metadata": { "type": fieldType },
	                "Title": title
	            }, properties));
	            return this.postAs({ body: postBody }).then(function (data) {
	                return {
	                    data: data,
	                    field: _this3.getById(data.Id)
	                };
	            });
	        }
	        /**
	         * Adds a new SP.FieldText to the collection
	         *
	         * @param title The field title
	         * @param maxLength The maximum number of characters allowed in the value of the field.
	         * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
	         */
	
	    }, {
	        key: "addText",
	        value: function addText(title) {
	            var maxLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 255;
	            var properties = arguments[2];
	
	            var props = {
	                FieldTypeKind: 2,
	                MaxLength: maxLength
	            };
	            return this.add(title, "SP.FieldText", util_1.Util.extend(props, properties));
	        }
	        /**
	         * Adds a new SP.FieldCalculated to the collection
	         *
	         * @param title The field title.
	         * @param formula The formula for the field.
	         * @param dateFormat The date and time format that is displayed in the field.
	         * @param outputType Specifies the output format for the field. Represents a FieldType value.
	         * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
	         */
	
	    }, {
	        key: "addCalculated",
	        value: function addCalculated(title, formula, dateFormat) {
	            var outputType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Types.FieldTypes.Text;
	            var properties = arguments[4];
	
	            var props = {
	                DateFormat: dateFormat,
	                FieldTypeKind: 17,
	                Formula: formula,
	                OutputType: outputType
	            };
	            return this.add(title, "SP.FieldCalculated", util_1.Util.extend(props, properties));
	        }
	        /**
	         * Adds a new SP.FieldDateTime to the collection
	         *
	         * @param title The field title
	         * @param displayFormat The format of the date and time that is displayed in the field.
	         * @param calendarType Specifies the calendar type of the field.
	         * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
	         */
	
	    }, {
	        key: "addDateTime",
	        value: function addDateTime(title) {
	            var displayFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Types.DateTimeFieldFormatType.DateOnly;
	            var calendarType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Types.CalendarType.Gregorian;
	            var friendlyDisplayFormat = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	            var properties = arguments[4];
	
	            var props = {
	                DateTimeCalendarType: calendarType,
	                DisplayFormat: displayFormat,
	                FieldTypeKind: 4,
	                FriendlyDisplayFormat: friendlyDisplayFormat
	            };
	            return this.add(title, "SP.FieldDateTime", util_1.Util.extend(props, properties));
	        }
	        /**
	         * Adds a new SP.FieldNumber to the collection
	         *
	         * @param title The field title
	         * @param minValue The field's minimum value
	         * @param maxValue The field's maximum value
	         * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
	         */
	
	    }, {
	        key: "addNumber",
	        value: function addNumber(title, minValue, maxValue, properties) {
	            var props = { FieldTypeKind: 9 };
	            if (typeof minValue !== "undefined") {
	                props = util_1.Util.extend({ MinimumValue: minValue }, props);
	            }
	            if (typeof maxValue !== "undefined") {
	                props = util_1.Util.extend({ MaximumValue: maxValue }, props);
	            }
	            return this.add(title, "SP.FieldNumber", util_1.Util.extend(props, properties));
	        }
	        /**
	         * Adds a new SP.FieldCurrency to the collection
	         *
	         * @param title The field title
	         * @param minValue The field's minimum value
	         * @param maxValue The field's maximum value
	         * @param currencyLocalId Specifies the language code identifier (LCID) used to format the value of the field
	         * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
	         */
	
	    }, {
	        key: "addCurrency",
	        value: function addCurrency(title, minValue, maxValue) {
	            var currencyLocalId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1033;
	            var properties = arguments[4];
	
	            var props = {
	                CurrencyLocaleId: currencyLocalId,
	                FieldTypeKind: 10
	            };
	            if (typeof minValue !== "undefined") {
	                props = util_1.Util.extend({ MinimumValue: minValue }, props);
	            }
	            if (typeof maxValue !== "undefined") {
	                props = util_1.Util.extend({ MaximumValue: maxValue }, props);
	            }
	            return this.add(title, "SP.FieldCurrency", util_1.Util.extend(props, properties));
	        }
	        /**
	         * Adds a new SP.FieldMultiLineText to the collection
	         *
	         * @param title The field title
	         * @param numberOfLines Specifies the number of lines of text to display for the field.
	         * @param richText Specifies whether the field supports rich formatting.
	         * @param restrictedMode Specifies whether the field supports a subset of rich formatting.
	         * @param appendOnly Specifies whether all changes to the value of the field are displayed in list forms.
	         * @param allowHyperlink Specifies whether a hyperlink is allowed as a value of the field.
	         * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
	         *
	         */
	
	    }, {
	        key: "addMultilineText",
	        value: function addMultilineText(title) {
	            var numberOfLines = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
	            var richText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	            var restrictedMode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	            var appendOnly = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
	            var allowHyperlink = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
	            var properties = arguments[6];
	
	            var props = {
	                AllowHyperlink: allowHyperlink,
	                AppendOnly: appendOnly,
	                FieldTypeKind: 3,
	                NumberOfLines: numberOfLines,
	                RestrictedMode: restrictedMode,
	                RichText: richText
	            };
	            return this.add(title, "SP.FieldMultiLineText", util_1.Util.extend(props, properties));
	        }
	        /**
	         * Adds a new SP.FieldUrl to the collection
	         *
	         * @param title The field title
	         */
	
	    }, {
	        key: "addUrl",
	        value: function addUrl(title) {
	            var displayFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Types.UrlFieldFormatType.Hyperlink;
	            var properties = arguments[2];
	
	            var props = {
	                DisplayFormat: displayFormat,
	                FieldTypeKind: 11
	            };
	            return this.add(title, "SP.FieldUrl", util_1.Util.extend(props, properties));
	        }
	    }]);
	
	    return Fields;
	}(queryable_1.QueryableCollection);
	
	exports.Fields = Fields;
	/**
	 * Describes a single of Field instance
	 *
	 */
	
	var Field = function (_queryable_1$Queryabl2) {
	    _inherits(Field, _queryable_1$Queryabl2);
	
	    /**
	     * Creates a new instance of the Field class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this field instance
	     */
	    function Field(baseUrl, path) {
	        _classCallCheck(this, Field);
	
	        return _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, baseUrl, path));
	    }
	    /**
	     * Updates this field intance with the supplied properties
	     *
	     * @param properties A plain object hash of values to update for the list
	     * @param fieldType The type value, required to update child field type properties
	     */
	
	
	    _createClass(Field, [{
	        key: "update",
	        value: function update(properties) {
	            var _this5 = this;
	
	            var fieldType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "SP.Field";
	
	            var postBody = JSON.stringify(util_1.Util.extend({
	                "__metadata": { "type": fieldType }
	            }, properties));
	            return this.post({
	                body: postBody,
	                headers: {
	                    "X-HTTP-Method": "MERGE"
	                }
	            }).then(function (data) {
	                return {
	                    data: data,
	                    field: _this5
	                };
	            });
	        }
	        /**
	         * Delete this fields
	         *
	         */
	
	    }, {
	        key: "delete",
	        value: function _delete() {
	            return this.post({
	                headers: {
	                    "X-HTTP-Method": "DELETE"
	                }
	            });
	        }
	        /**
	         * Sets the value of the ShowInDisplayForm property for this field.
	         */
	
	    }, {
	        key: "setShowInDisplayForm",
	        value: function setShowInDisplayForm(show) {
	            var q = new Field(this, "setshowindisplayform(" + show + ")");
	            return q.post();
	        }
	        /**
	         * Sets the value of the ShowInEditForm property for this field.
	         */
	
	    }, {
	        key: "setShowInEditForm",
	        value: function setShowInEditForm(show) {
	            var q = new Field(this, "setshowineditform(" + show + ")");
	            return q.post();
	        }
	        /**
	         * Sets the value of the ShowInNewForm property for this field.
	         */
	
	    }, {
	        key: "setShowInNewForm",
	        value: function setShowInNewForm(show) {
	            var q = new Field(this, "setshowinnewform(" + show + ")");
	            return q.post();
	        }
	    }]);
	
	    return Field;
	}(queryable_1.QueryableInstance);
	
	exports.Field = Field;

/***/ },
/* 31 */
/***/ function(module, exports) {

	// reference: https://msdn.microsoft.com/en-us/library/office/dn600183.aspx
	"use strict";
	/**
	 * Determines the display mode of the given control or view
	 */
	
	var ControlMode;
	(function (ControlMode) {
	  ControlMode[ControlMode["Display"] = 1] = "Display";
	  ControlMode[ControlMode["Edit"] = 2] = "Edit";
	  ControlMode[ControlMode["New"] = 3] = "New";
	})(ControlMode = exports.ControlMode || (exports.ControlMode = {}));
	/**
	 * Specifies the type of the field.
	 */
	var FieldTypes;
	(function (FieldTypes) {
	  FieldTypes[FieldTypes["Invalid"] = 0] = "Invalid";
	  FieldTypes[FieldTypes["Integer"] = 1] = "Integer";
	  FieldTypes[FieldTypes["Text"] = 2] = "Text";
	  FieldTypes[FieldTypes["Note"] = 3] = "Note";
	  FieldTypes[FieldTypes["DateTime"] = 4] = "DateTime";
	  FieldTypes[FieldTypes["Counter"] = 5] = "Counter";
	  FieldTypes[FieldTypes["Choice"] = 6] = "Choice";
	  FieldTypes[FieldTypes["Lookup"] = 7] = "Lookup";
	  FieldTypes[FieldTypes["Boolean"] = 8] = "Boolean";
	  FieldTypes[FieldTypes["Number"] = 9] = "Number";
	  FieldTypes[FieldTypes["Currency"] = 10] = "Currency";
	  FieldTypes[FieldTypes["URL"] = 11] = "URL";
	  FieldTypes[FieldTypes["Computed"] = 12] = "Computed";
	  FieldTypes[FieldTypes["Threading"] = 13] = "Threading";
	  FieldTypes[FieldTypes["Guid"] = 14] = "Guid";
	  FieldTypes[FieldTypes["MultiChoice"] = 15] = "MultiChoice";
	  FieldTypes[FieldTypes["GridChoice"] = 16] = "GridChoice";
	  FieldTypes[FieldTypes["Calculated"] = 17] = "Calculated";
	  FieldTypes[FieldTypes["File"] = 18] = "File";
	  FieldTypes[FieldTypes["Attachments"] = 19] = "Attachments";
	  FieldTypes[FieldTypes["User"] = 20] = "User";
	  FieldTypes[FieldTypes["Recurrence"] = 21] = "Recurrence";
	  FieldTypes[FieldTypes["CrossProjectLink"] = 22] = "CrossProjectLink";
	  FieldTypes[FieldTypes["ModStat"] = 23] = "ModStat";
	  FieldTypes[FieldTypes["Error"] = 24] = "Error";
	  FieldTypes[FieldTypes["ContentTypeId"] = 25] = "ContentTypeId";
	  FieldTypes[FieldTypes["PageSeparator"] = 26] = "PageSeparator";
	  FieldTypes[FieldTypes["ThreadIndex"] = 27] = "ThreadIndex";
	  FieldTypes[FieldTypes["WorkflowStatus"] = 28] = "WorkflowStatus";
	  FieldTypes[FieldTypes["AllDayEvent"] = 29] = "AllDayEvent";
	  FieldTypes[FieldTypes["WorkflowEventType"] = 30] = "WorkflowEventType";
	})(FieldTypes = exports.FieldTypes || (exports.FieldTypes = {}));
	var DateTimeFieldFormatType;
	(function (DateTimeFieldFormatType) {
	  DateTimeFieldFormatType[DateTimeFieldFormatType["DateOnly"] = 0] = "DateOnly";
	  DateTimeFieldFormatType[DateTimeFieldFormatType["DateTime"] = 1] = "DateTime";
	})(DateTimeFieldFormatType = exports.DateTimeFieldFormatType || (exports.DateTimeFieldFormatType = {}));
	/**
	 * Specifies the control settings while adding a field.
	 */
	var AddFieldOptions;
	(function (AddFieldOptions) {
	  /**
	   *  Specify that a new field added to the list must also be added to the default content type in the site collection
	   */
	  AddFieldOptions[AddFieldOptions["DefaultValue"] = 0] = "DefaultValue";
	  /**
	   * Specify that a new field added to the list must also be added to the default content type in the site collection.
	   */
	  AddFieldOptions[AddFieldOptions["AddToDefaultContentType"] = 1] = "AddToDefaultContentType";
	  /**
	   * Specify that a new field must not be added to any other content type
	   */
	  AddFieldOptions[AddFieldOptions["AddToNoContentType"] = 2] = "AddToNoContentType";
	  /**
	   *  Specify that a new field that is added to the specified list must also be added to all content types in the site collection
	   */
	  AddFieldOptions[AddFieldOptions["AddToAllContentTypes"] = 4] = "AddToAllContentTypes";
	  /**
	   * Specify adding an internal field name hint for the purpose of avoiding possible database locking or field renaming operations
	   */
	  AddFieldOptions[AddFieldOptions["AddFieldInternalNameHint"] = 8] = "AddFieldInternalNameHint";
	  /**
	   * Specify that a new field that is added to the specified list must also be added to the default list view
	   */
	  AddFieldOptions[AddFieldOptions["AddFieldToDefaultView"] = 16] = "AddFieldToDefaultView";
	  /**
	   * Specify to confirm that no other field has the same display name
	   */
	  AddFieldOptions[AddFieldOptions["AddFieldCheckDisplayName"] = 32] = "AddFieldCheckDisplayName";
	})(AddFieldOptions = exports.AddFieldOptions || (exports.AddFieldOptions = {}));
	var CalendarType;
	(function (CalendarType) {
	  CalendarType[CalendarType["Gregorian"] = 1] = "Gregorian";
	  CalendarType[CalendarType["Japan"] = 3] = "Japan";
	  CalendarType[CalendarType["Taiwan"] = 4] = "Taiwan";
	  CalendarType[CalendarType["Korea"] = 5] = "Korea";
	  CalendarType[CalendarType["Hijri"] = 6] = "Hijri";
	  CalendarType[CalendarType["Thai"] = 7] = "Thai";
	  CalendarType[CalendarType["Hebrew"] = 8] = "Hebrew";
	  CalendarType[CalendarType["GregorianMEFrench"] = 9] = "GregorianMEFrench";
	  CalendarType[CalendarType["GregorianArabic"] = 10] = "GregorianArabic";
	  CalendarType[CalendarType["GregorianXLITEnglish"] = 11] = "GregorianXLITEnglish";
	  CalendarType[CalendarType["GregorianXLITFrench"] = 12] = "GregorianXLITFrench";
	  CalendarType[CalendarType["KoreaJapanLunar"] = 14] = "KoreaJapanLunar";
	  CalendarType[CalendarType["ChineseLunar"] = 15] = "ChineseLunar";
	  CalendarType[CalendarType["SakaEra"] = 16] = "SakaEra";
	  CalendarType[CalendarType["UmAlQura"] = 23] = "UmAlQura";
	})(CalendarType = exports.CalendarType || (exports.CalendarType = {}));
	var UrlFieldFormatType;
	(function (UrlFieldFormatType) {
	  UrlFieldFormatType[UrlFieldFormatType["Hyperlink"] = 0] = "Hyperlink";
	  UrlFieldFormatType[UrlFieldFormatType["Image"] = 1] = "Image";
	})(UrlFieldFormatType = exports.UrlFieldFormatType || (exports.UrlFieldFormatType = {}));
	var PrincipalType;
	(function (PrincipalType) {
	  PrincipalType[PrincipalType["None"] = 0] = "None";
	  PrincipalType[PrincipalType["User"] = 1] = "User";
	  PrincipalType[PrincipalType["DistributionList"] = 2] = "DistributionList";
	  PrincipalType[PrincipalType["SecurityGroup"] = 4] = "SecurityGroup";
	  PrincipalType[PrincipalType["SharePointGroup"] = 8] = "SharePointGroup";
	  PrincipalType[PrincipalType["All"] = 15] = "All";
	})(PrincipalType = exports.PrincipalType || (exports.PrincipalType = {}));
	var PageType;
	(function (PageType) {
	  PageType[PageType["Invalid"] = -1] = "Invalid";
	  PageType[PageType["DefaultView"] = 0] = "DefaultView";
	  PageType[PageType["NormalView"] = 1] = "NormalView";
	  PageType[PageType["DialogView"] = 2] = "DialogView";
	  PageType[PageType["View"] = 3] = "View";
	  PageType[PageType["DisplayForm"] = 4] = "DisplayForm";
	  PageType[PageType["DisplayFormDialog"] = 5] = "DisplayFormDialog";
	  PageType[PageType["EditForm"] = 6] = "EditForm";
	  PageType[PageType["EditFormDialog"] = 7] = "EditFormDialog";
	  PageType[PageType["NewForm"] = 8] = "NewForm";
	  PageType[PageType["NewFormDialog"] = 9] = "NewFormDialog";
	  PageType[PageType["SolutionForm"] = 10] = "SolutionForm";
	  PageType[PageType["PAGE_MAXITEMS"] = 11] = "PAGE_MAXITEMS";
	})(PageType = exports.PageType || (exports.PageType = {}));

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	/**
	 * Describes a collection of Field objects
	 *
	 */
	
	var Forms = function (_queryable_1$Queryabl) {
	  _inherits(Forms, _queryable_1$Queryabl);
	
	  /**
	   * Creates a new instance of the Fields class
	   *
	   * @param baseUrl The url or Queryable which forms the parent of this fields collection
	   */
	  function Forms(baseUrl) {
	    var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "forms";
	
	    _classCallCheck(this, Forms);
	
	    return _possibleConstructorReturn(this, (Forms.__proto__ || Object.getPrototypeOf(Forms)).call(this, baseUrl, path));
	  }
	  /**
	   * Gets a form by id
	   *
	   * @param id The guid id of the item to retrieve
	   */
	
	
	  _createClass(Forms, [{
	    key: "getById",
	    value: function getById(id) {
	      var i = new Form(this);
	      i.concat("('" + id + "')");
	      return i;
	    }
	  }]);
	
	  return Forms;
	}(queryable_1.QueryableCollection);
	
	exports.Forms = Forms;
	/**
	 * Describes a single of Form instance
	 *
	 */
	
	var Form = function (_queryable_1$Queryabl2) {
	  _inherits(Form, _queryable_1$Queryabl2);
	
	  /**
	   * Creates a new instance of the Form class
	   *
	   * @param baseUrl The url or Queryable which is the parent of this form instance
	   */
	  function Form(baseUrl, path) {
	    _classCallCheck(this, Form);
	
	    return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, baseUrl, path));
	  }
	
	  return Form;
	}(queryable_1.QueryableInstance);
	
	exports.Form = Form;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	/**
	 * Describes a collection of webhook subscriptions
	 *
	 */
	
	var Subscriptions = function (_queryable_1$Queryabl) {
	    _inherits(Subscriptions, _queryable_1$Queryabl);
	
	    /**
	     * Creates a new instance of the Subscriptions class
	     *
	     * @param baseUrl - The url or Queryable which forms the parent of this webhook subscriptions collection
	     */
	    function Subscriptions(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "subscriptions";
	
	        _classCallCheck(this, Subscriptions);
	
	        return _possibleConstructorReturn(this, (Subscriptions.__proto__ || Object.getPrototypeOf(Subscriptions)).call(this, baseUrl, path));
	    }
	    /**
	     * Returns all the webhook subscriptions or the specified webhook subscription
	     *
	     */
	
	
	    _createClass(Subscriptions, [{
	        key: "getById",
	        value: function getById(subscriptionId) {
	            var subscription = new Subscription(this);
	            subscription.concat("('" + subscriptionId + "')");
	            return subscription;
	        }
	        /**
	         * Create a new webhook subscription
	         *
	         */
	
	    }, {
	        key: "add",
	        value: function add(notificationUrl, expirationDate, clientState) {
	            var _this2 = this;
	
	            var postBody = JSON.stringify({
	                "resource": this.toUrl(),
	                "notificationUrl": notificationUrl,
	                "expirationDateTime": expirationDate,
	                "clientState": clientState || "pnp-js-core-subscription"
	            });
	            return this.post({ body: postBody, headers: { "Content-Type": "application/json" } }).then(function (result) {
	                return { data: result, subscription: _this2.getById(result.id) };
	            });
	        }
	    }]);
	
	    return Subscriptions;
	}(queryable_1.QueryableCollection);
	
	exports.Subscriptions = Subscriptions;
	/**
	 * Describes a single webhook subscription instance
	 *
	 */
	
	var Subscription = function (_queryable_1$Queryabl2) {
	    _inherits(Subscription, _queryable_1$Queryabl2);
	
	    /**
	     * Creates a new instance of the Subscription class
	     *
	     * @param baseUrl - The url or Queryable which forms the parent of this webhook subscription instance
	     */
	    function Subscription(baseUrl, path) {
	        _classCallCheck(this, Subscription);
	
	        return _possibleConstructorReturn(this, (Subscription.__proto__ || Object.getPrototypeOf(Subscription)).call(this, baseUrl, path));
	    }
	    /**
	     * Update a webhook subscription
	     *
	     */
	
	
	    _createClass(Subscription, [{
	        key: "update",
	        value: function update(expirationDate) {
	            var _this4 = this;
	
	            var postBody = JSON.stringify({
	                "expirationDateTime": expirationDate
	            });
	            return this.patch({ body: postBody, headers: { "Content-Type": "application/json" } }).then(function (data) {
	                return { data: data, subscription: _this4 };
	            });
	        }
	        /**
	         * Remove a webhook subscription
	         *
	         */
	
	    }, {
	        key: "delete",
	        value: function _delete() {
	            return _get(Subscription.prototype.__proto__ || Object.getPrototypeOf(Subscription.prototype), "delete", this).call(this);
	        }
	    }]);
	
	    return Subscription;
	}(queryable_1.QueryableInstance);
	
	exports.Subscription = Subscription;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	var util_1 = __webpack_require__(1);
	
	var UserCustomActions = function (_queryable_1$Queryabl) {
	    _inherits(UserCustomActions, _queryable_1$Queryabl);
	
	    function UserCustomActions(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "usercustomactions";
	
	        _classCallCheck(this, UserCustomActions);
	
	        return _possibleConstructorReturn(this, (UserCustomActions.__proto__ || Object.getPrototypeOf(UserCustomActions)).call(this, baseUrl, path));
	    }
	    /**
	     * Returns the custom action with the specified identifier.
	     *
	     * @param id The GUID ID of the user custom action to get.
	     */
	
	
	    _createClass(UserCustomActions, [{
	        key: "getById",
	        value: function getById(id) {
	            var uca = new UserCustomAction(this);
	            uca.concat("('" + id + "')");
	            return uca;
	        }
	        /**
	         * Create a custom action
	         *
	         * @param creationInfo The information which defines the new custom action
	         *
	         */
	
	    }, {
	        key: "add",
	        value: function add(properties) {
	            var _this2 = this;
	
	            var postBody = JSON.stringify(util_1.Util.extend({ __metadata: { "type": "SP.UserCustomAction" } }, properties));
	            return this.post({ body: postBody }).then(function (data) {
	                return {
	                    action: _this2.getById(data.Id),
	                    data: data
	                };
	            });
	        }
	        /**
	         * Deletes all custom actions in the collection.
	         *
	         */
	
	    }, {
	        key: "clear",
	        value: function clear() {
	            var a = new UserCustomActions(this, "clear");
	            return a.post();
	        }
	    }]);
	
	    return UserCustomActions;
	}(queryable_1.QueryableCollection);
	
	exports.UserCustomActions = UserCustomActions;
	
	var UserCustomAction = function (_queryable_1$Queryabl2) {
	    _inherits(UserCustomAction, _queryable_1$Queryabl2);
	
	    function UserCustomAction(baseUrl, path) {
	        _classCallCheck(this, UserCustomAction);
	
	        return _possibleConstructorReturn(this, (UserCustomAction.__proto__ || Object.getPrototypeOf(UserCustomAction)).call(this, baseUrl, path));
	    }
	
	    _createClass(UserCustomAction, [{
	        key: "update",
	        value: function update(properties) {
	            var _this4 = this;
	
	            var postBody = JSON.stringify(util_1.Util.extend({
	                "__metadata": { "type": "SP.UserCustomAction" }
	            }, properties));
	            return this.post({
	                body: postBody,
	                headers: {
	                    "X-HTTP-Method": "MERGE"
	                }
	            }).then(function (data) {
	                return {
	                    action: _this4,
	                    data: data
	                };
	            });
	        }
	        /**
	        * Remove a custom action
	        *
	        */
	
	    }, {
	        key: "delete",
	        value: function _delete() {
	            return _get(UserCustomAction.prototype.__proto__ || Object.getPrototypeOf(UserCustomAction.prototype), "delete", this).call(this);
	        }
	    }]);
	
	    return UserCustomAction;
	}(queryable_1.QueryableInstance);
	
	exports.UserCustomAction = UserCustomAction;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var util_1 = __webpack_require__(1);
	var queryable_1 = __webpack_require__(8);
	/**
	 * Represents a collection of navigation nodes
	 *
	 */
	
	var NavigationNodes = function (_queryable_1$Queryabl) {
	    _inherits(NavigationNodes, _queryable_1$Queryabl);
	
	    function NavigationNodes(baseUrl, path) {
	        _classCallCheck(this, NavigationNodes);
	
	        return _possibleConstructorReturn(this, (NavigationNodes.__proto__ || Object.getPrototypeOf(NavigationNodes)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets a navigation node by id
	     *
	     * @param id The id of the node
	     */
	
	
	    _createClass(NavigationNodes, [{
	        key: "getById",
	        value: function getById(id) {
	            var node = new NavigationNode(this);
	            node.concat("(" + id + ")");
	            return node;
	        }
	        /**
	         * Adds a new node to the collection
	         *
	         * @param title Display name of the node
	         * @param url The url of the node
	         * @param visible If true the node is visible, otherwise it is hidden (default: true)
	         */
	
	    }, {
	        key: "add",
	        value: function add(title, url) {
	            var _this2 = this;
	
	            var visible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	
	            var postBody = JSON.stringify({
	                "__metadata": { "type": "SP.NavigationNode" },
	                IsVisible: visible,
	                Title: title,
	                Url: url
	            });
	            var adder = new NavigationNodes(this);
	            return adder.post({ body: postBody }).then(function (data) {
	                return {
	                    data: data,
	                    node: _this2.getById(data.Id)
	                };
	            });
	        }
	        /**
	         * Moves a node to be after another node in the navigation
	         *
	         * @param nodeId Id of the node to move
	         * @param previousNodeId Id of the node after which we move the node specified by nodeId
	         */
	
	    }, {
	        key: "moveAfter",
	        value: function moveAfter(nodeId, previousNodeId) {
	            var postBody = JSON.stringify({
	                nodeId: nodeId,
	                previousNodeId: previousNodeId
	            });
	            var mover = new NavigationNodes(this, "MoveAfter");
	            return mover.post({ body: postBody });
	        }
	    }]);
	
	    return NavigationNodes;
	}(queryable_1.QueryableCollection);
	
	exports.NavigationNodes = NavigationNodes;
	
	var NavigationNode = function (_queryable_1$Queryabl2) {
	    _inherits(NavigationNode, _queryable_1$Queryabl2);
	
	    function NavigationNode(baseUrl, path) {
	        _classCallCheck(this, NavigationNode);
	
	        return _possibleConstructorReturn(this, (NavigationNode.__proto__ || Object.getPrototypeOf(NavigationNode)).call(this, baseUrl, path));
	    }
	    /**
	     * Represents the child nodes of this node
	     */
	
	
	    _createClass(NavigationNode, [{
	        key: "update",
	
	        /**
	         * Updates this node based on the supplied properties
	         *
	         * @param properties The hash of key/value pairs to update
	         */
	        value: function update(properties) {
	            var _this4 = this;
	
	            var postBody = JSON.stringify(util_1.Util.extend({
	                "__metadata": { "type": "SP.NavigationNode" }
	            }, properties));
	            return this.post({
	                body: postBody,
	                headers: {
	                    "X-HTTP-Method": "MERGE"
	                }
	            }).then(function (data) {
	                return {
	                    data: data,
	                    node: _this4
	                };
	            });
	        }
	        /**
	         * Deletes this node and any child nodes
	         */
	
	    }, {
	        key: "delete",
	        value: function _delete() {
	            return _get(NavigationNode.prototype.__proto__ || Object.getPrototypeOf(NavigationNode.prototype), "delete", this).call(this);
	        }
	    }, {
	        key: "children",
	        get: function get() {
	            return new NavigationNodes(this, "Children");
	        }
	    }]);
	
	    return NavigationNode;
	}(queryable_1.QueryableInstance);
	
	exports.NavigationNode = NavigationNode;
	/**
	 * Exposes the navigation components
	 *
	 */
	
	var Navigation = function (_queryable_1$Queryabl3) {
	    _inherits(Navigation, _queryable_1$Queryabl3);
	
	    /**
	     * Creates a new instance of the Lists class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Navigation(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "navigation";
	
	        _classCallCheck(this, Navigation);
	
	        return _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets the quicklaunch navigation for the current context
	     *
	     */
	
	
	    _createClass(Navigation, [{
	        key: "quicklaunch",
	        get: function get() {
	            return new NavigationNodes(this, "quicklaunch");
	        }
	        /**
	         * Gets the top bar navigation navigation for the current context
	         *
	         */
	
	    }, {
	        key: "topNavigationBar",
	        get: function get() {
	            return new NavigationNodes(this, "topnavigationbar");
	        }
	    }]);
	
	    return Navigation;
	}(queryable_1.Queryable);
	
	exports.Navigation = Navigation;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	/**
	 * Describes a collection of List objects
	 *
	 */
	
	var Features = function (_queryable_1$Queryabl) {
	    _inherits(Features, _queryable_1$Queryabl);
	
	    /**
	     * Creates a new instance of the Lists class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Features(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "features";
	
	        _classCallCheck(this, Features);
	
	        return _possibleConstructorReturn(this, (Features.__proto__ || Object.getPrototypeOf(Features)).call(this, baseUrl, path));
	    }
	    /**
	     * Gets a list from the collection by guid id
	     *
	     * @param id The Id of the feature (GUID)
	     */
	
	
	    _createClass(Features, [{
	        key: "getById",
	        value: function getById(id) {
	            var feature = new Feature(this);
	            feature.concat("('" + id + "')");
	            return feature;
	        }
	        /**
	         * Adds a new list to the collection
	         *
	         * @param id The Id of the feature (GUID)
	         * @param force If true the feature activation will be forced
	         */
	
	    }, {
	        key: "add",
	        value: function add(id) {
	            var _this2 = this;
	
	            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            var adder = new Features(this, "add");
	            return adder.post({
	                body: JSON.stringify({
	                    featdefScope: 0,
	                    featureId: id,
	                    force: force
	                })
	            }).then(function (data) {
	                return {
	                    data: data,
	                    feature: _this2.getById(id)
	                };
	            });
	        }
	        /**
	         * Removes (deactivates) a feature from the collection
	         *
	         * @param id The Id of the feature (GUID)
	         * @param force If true the feature deactivation will be forced
	         */
	
	    }, {
	        key: "remove",
	        value: function remove(id) {
	            var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	            var remover = new Features(this, "remove");
	            return remover.post({
	                body: JSON.stringify({
	                    featureId: id,
	                    force: force
	                })
	            });
	        }
	    }]);
	
	    return Features;
	}(queryable_1.QueryableCollection);
	
	exports.Features = Features;
	
	var Feature = function (_queryable_1$Queryabl2) {
	    _inherits(Feature, _queryable_1$Queryabl2);
	
	    /**
	     * Creates a new instance of the Lists class
	     *
	     * @param baseUrl The url or Queryable which forms the parent of this fields collection
	     */
	    function Feature(baseUrl, path) {
	        _classCallCheck(this, Feature);
	
	        return _possibleConstructorReturn(this, (Feature.__proto__ || Object.getPrototypeOf(Feature)).call(this, baseUrl, path));
	    }
	    /**
	     * Removes (deactivates) a feature from the collection
	     *
	     * @param force If true the feature deactivation will be forced
	     */
	
	
	    _createClass(Feature, [{
	        key: "deactivate",
	        value: function deactivate() {
	            var _this4 = this;
	
	            var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
	            var removeDependency = this.addBatchDependency();
	            var idGet = new Feature(this).select("DefinitionId");
	            return idGet.getAs().then(function (feature) {
	                var promise = _this4.getParent(Features, _this4.parentUrl, "").remove(feature.DefinitionId, force);
	                removeDependency();
	                return promise;
	            });
	        }
	    }]);
	
	    return Feature;
	}(queryable_1.QueryableInstance);
	
	exports.Feature = Feature;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queryable_1 = __webpack_require__(8);
	var FileUtil = __webpack_require__(38);
	var odata_1 = __webpack_require__(11);
	
	var UserProfileQuery = function (_queryable_1$Queryabl) {
	    _inherits(UserProfileQuery, _queryable_1$Queryabl);
	
	    function UserProfileQuery(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "_api/sp.userprofiles.peoplemanager";
	
	        _classCallCheck(this, UserProfileQuery);
	
	        var _this = _possibleConstructorReturn(this, (UserProfileQuery.__proto__ || Object.getPrototypeOf(UserProfileQuery)).call(this, baseUrl, path));
	
	        _this.profileLoader = new ProfileLoader(baseUrl);
	        return _this;
	    }
	    /**
	     * The URL of the edit profile page for the current user.
	     */
	
	
	    _createClass(UserProfileQuery, [{
	        key: "amIFollowedBy",
	
	        /**
	         * A Boolean value that indicates whether the current user's People I'm Following list is public.
	         *
	         * @param loginName The account name of the user
	         */
	        value: function amIFollowedBy(loginName) {
	            var q = new UserProfileQuery(this, "amifollowedby(@v)");
	            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
	            return q.get();
	        }
	        /**
	         * Checks whether the current user is following the specified user.
	         *
	         * @param loginName The account name of the user
	         */
	
	    }, {
	        key: "amIFollowing",
	        value: function amIFollowing(loginName) {
	            var q = new UserProfileQuery(this, "amifollowing(@v)");
	            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
	            return q.get();
	        }
	        /**
	         * Gets tags that the user is following.
	         *
	         * @param maxCount The maximum number of tags to get.
	         */
	
	    }, {
	        key: "getFollowedTags",
	        value: function getFollowedTags() {
	            var maxCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
	
	            var q = new UserProfileQuery(this, "getfollowedtags(" + maxCount + ")");
	            return q.get();
	        }
	        /**
	         * Gets the people who are following the specified user.
	         *
	         * @param loginName The account name of the user.
	         */
	
	    }, {
	        key: "getFollowersFor",
	        value: function getFollowersFor(loginName) {
	            var q = new UserProfileQuery(this, "getfollowersfor(@v)");
	            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
	            return q.get();
	        }
	        /**
	         * Gets the people who are following the current user.
	         *
	         */
	
	    }, {
	        key: "getPeopleFollowedBy",
	
	        /**
	         * Gets the people who the specified user is following.
	         *
	         * @param loginName The account name of the user.
	         */
	        value: function getPeopleFollowedBy(loginName) {
	            var q = new UserProfileQuery(this, "getpeoplefollowedby(@v)");
	            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
	            return q.get();
	        }
	        /**
	         * Gets user properties for the specified user.
	         *
	         * @param loginName The account name of the user.
	         */
	
	    }, {
	        key: "getPropertiesFor",
	        value: function getPropertiesFor(loginName) {
	            var q = new UserProfileQuery(this, "getpropertiesfor(@v)");
	            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
	            return q.get();
	        }
	        /**
	         * Gets the most popular tags.
	         *
	         */
	
	    }, {
	        key: "getUserProfilePropertyFor",
	
	        /**
	         * Gets the specified user profile property for the specified user.
	         *
	         * @param loginName The account name of the user.
	         * @param propertyName The case-sensitive name of the property to get.
	         */
	        value: function getUserProfilePropertyFor(loginName, propertyName) {
	            var q = new UserProfileQuery(this, "getuserprofilepropertyfor(accountname=@v, propertyname='" + propertyName + "')");
	            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
	            return q.get();
	        }
	        /**
	         * Removes the specified user from the user's list of suggested people to follow.
	         *
	         * @param loginName The account name of the user.
	         */
	
	    }, {
	        key: "hideSuggestion",
	        value: function hideSuggestion(loginName) {
	            var q = new UserProfileQuery(this, "hidesuggestion(@v)");
	            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
	            return q.post();
	        }
	        /**
	         * Checks whether the first user is following the second user.
	         *
	         * @param follower The account name of the user who might be following followee.
	         * @param followee The account name of the user who might be followed.
	         */
	
	    }, {
	        key: "isFollowing",
	        value: function isFollowing(follower, followee) {
	            var q = new UserProfileQuery(this, null);
	            q.concat(".isfollowing(possiblefolloweraccountname=@v, possiblefolloweeaccountname=@y)");
	            q.query.add("@v", "'" + encodeURIComponent(follower) + "'");
	            q.query.add("@y", "'" + encodeURIComponent(followee) + "'");
	            return q.get();
	        }
	        /**
	         * Uploads and sets the user profile picture
	         *
	         * @param profilePicSource Blob data representing the user's picture
	         */
	
	    }, {
	        key: "setMyProfilePic",
	        value: function setMyProfilePic(profilePicSource) {
	            var _this2 = this;
	
	            return new Promise(function (resolve, reject) {
	                FileUtil.readBlobAsArrayBuffer(profilePicSource).then(function (buffer) {
	                    var request = new UserProfileQuery(_this2, "setmyprofilepicture");
	                    request.post({
	                        body: String.fromCharCode.apply(null, new Uint16Array(buffer))
	                    }).then(function (_) {
	                        return resolve();
	                    });
	                }).catch(function (e) {
	                    return reject(e);
	                });
	            });
	        }
	        /**
	         * Provisions one or more users' personal sites. (My Site administrator on SharePoint Online only)
	         *
	         * @param emails The email addresses of the users to provision sites for
	         */
	
	    }, {
	        key: "createPersonalSiteEnqueueBulk",
	        value: function createPersonalSiteEnqueueBulk() {
	            for (var _len = arguments.length, emails = Array(_len), _key = 0; _key < _len; _key++) {
	                emails[_key] = arguments[_key];
	            }
	
	            return this.profileLoader.createPersonalSiteEnqueueBulk(emails);
	        }
	        /**
	         * Gets the user profile of the site owner.
	         *
	         */
	
	    }, {
	        key: "createPersonalSite",
	
	        /**
	         * Enqueues creating a personal site for this user, which can be used to share documents, web pages, and other files.
	         *
	         * @param interactiveRequest true if interactively (web) initiated request, or false if non-interactively (client) initiated request
	         */
	        value: function createPersonalSite() {
	            var interactiveRequest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
	            return this.profileLoader.createPersonalSite(interactiveRequest);
	        }
	        /**
	         * Sets the privacy settings for this profile.
	         *
	         * @param share true to make all social data public; false to make all social data private.
	         */
	
	    }, {
	        key: "shareAllSocialData",
	        value: function shareAllSocialData(share) {
	            return this.profileLoader.shareAllSocialData(share);
	        }
	    }, {
	        key: "editProfileLink",
	        get: function get() {
	            var q = new UserProfileQuery(this, "EditProfileLink");
	            return q.getAs(odata_1.ODataValue());
	        }
	        /**
	         * A Boolean value that indicates whether the current user's People I'm Following list is public.
	         */
	
	    }, {
	        key: "isMyPeopleListPublic",
	        get: function get() {
	            var q = new UserProfileQuery(this, "IsMyPeopleListPublic");
	            return q.getAs(odata_1.ODataValue());
	        }
	    }, {
	        key: "myFollowers",
	        get: function get() {
	            return new queryable_1.QueryableCollection(this, "getmyfollowers");
	        }
	        /**
	         * Gets user properties for the current user.
	         *
	         */
	
	    }, {
	        key: "myProperties",
	        get: function get() {
	            return new UserProfileQuery(this, "getmyproperties");
	        }
	    }, {
	        key: "trendingTags",
	        get: function get() {
	            var q = new UserProfileQuery(this, null);
	            q.concat(".gettrendingtags");
	            return q.get();
	        }
	    }, {
	        key: "ownerUserProfile",
	        get: function get() {
	            return this.profileLoader.ownerUserProfile;
	        }
	        /**
	         * Gets the user profile that corresponds to the current user.
	         */
	
	    }, {
	        key: "userProfile",
	        get: function get() {
	            return this.profileLoader.userProfile;
	        }
	    }]);
	
	    return UserProfileQuery;
	}(queryable_1.QueryableInstance);
	
	exports.UserProfileQuery = UserProfileQuery;
	
	var ProfileLoader = function (_queryable_1$Queryabl2) {
	    _inherits(ProfileLoader, _queryable_1$Queryabl2);
	
	    function ProfileLoader(baseUrl) {
	        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "_api/sp.userprofiles.profileloader.getprofileloader";
	
	        _classCallCheck(this, ProfileLoader);
	
	        return _possibleConstructorReturn(this, (ProfileLoader.__proto__ || Object.getPrototypeOf(ProfileLoader)).call(this, baseUrl, path));
	    }
	    /**
	     * Provisions one or more users' personal sites. (My Site administrator on SharePoint Online only)
	     *
	     * @param emails The email addresses of the users to provision sites for
	     */
	
	
	    _createClass(ProfileLoader, [{
	        key: "createPersonalSiteEnqueueBulk",
	        value: function createPersonalSiteEnqueueBulk(emails) {
	            var q = new ProfileLoader(this, "createpersonalsiteenqueuebulk");
	            var postBody = JSON.stringify({ "emailIDs": emails });
	            return q.post({
	                body: postBody
	            });
	        }
	        /**
	         * Gets the user profile of the site owner.
	         *
	         */
	
	    }, {
	        key: "createPersonalSite",
	
	        /**
	         * Enqueues creating a personal site for this user, which can be used to share documents, web pages, and other files.
	         *
	         * @param interactiveRequest true if interactively (web) initiated request, or false if non-interactively (client) initiated request
	         */
	        value: function createPersonalSite() {
	            var interactiveRequest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
	            var q = new ProfileLoader(this, "getuserprofile/createpersonalsiteenque(" + interactiveRequest + ")\",");
	            return q.post();
	        }
	        /**
	         * Sets the privacy settings for this profile.
	         *
	         * @param share true to make all social data public; false to make all social data private.
	         */
	
	    }, {
	        key: "shareAllSocialData",
	        value: function shareAllSocialData(share) {
	            var q = new ProfileLoader(this, "getuserprofile/shareallsocialdata(" + share + ")\",");
	            return q.post();
	        }
	    }, {
	        key: "ownerUserProfile",
	        get: function get() {
	            var q = this.getParent(ProfileLoader, this.parentUrl, "_api/sp.userprofiles.profileloader.getowneruserprofile");
	            return q.postAs();
	        }
	        /**
	         * Gets the user profile that corresponds to the current user.
	         *
	         */
	
	    }, {
	        key: "userProfile",
	        get: function get() {
	            var q = new ProfileLoader(this, "getuserprofile");
	            return q.postAs();
	        }
	    }]);
	
	    return ProfileLoader;
	}(queryable_1.Queryable);

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Reads a blob as text
	 *
	 * @param blob The data to read
	 */
	
	function readBlobAsText(blob) {
	    return readBlobAs(blob, "string");
	}
	exports.readBlobAsText = readBlobAsText;
	/**
	 * Reads a blob into an array buffer
	 *
	 * @param blob The data to read
	 */
	function readBlobAsArrayBuffer(blob) {
	    return readBlobAs(blob, "buffer");
	}
	exports.readBlobAsArrayBuffer = readBlobAsArrayBuffer;
	/**
	 * Generic method to read blob's content
	 *
	 * @param blob The data to read
	 * @param mode The read mode
	 */
	function readBlobAs(blob, mode) {
	    return new Promise(function (resolve, reject) {
	        try {
	            var reader = new FileReader();
	            reader.onload = function (e) {
	                resolve(e.target.result);
	            };
	            switch (mode) {
	                case "string":
	                    reader.readAsText(blob);
	                    break;
	                case "buffer":
	                    reader.readAsArrayBuffer(blob);
	                    break;
	            }
	        } catch (e) {
	            reject(e);
	        }
	    });
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(40));
	var httpclient_1 = __webpack_require__(9);
	exports.HttpClient = httpclient_1.HttpClient;
	var sprequestexecutorclient_1 = __webpack_require__(41);
	exports.SPRequestExecutorClient = sprequestexecutorclient_1.SPRequestExecutorClient;
	var nodefetchclient_1 = __webpack_require__(42);
	exports.NodeFetchClient = nodefetchclient_1.NodeFetchClient;
	var fetchclient_1 = __webpack_require__(13);
	exports.FetchClient = fetchclient_1.FetchClient;
	__export(__webpack_require__(43));
	var collections_1 = __webpack_require__(4);
	exports.Dictionary = collections_1.Dictionary;
	var util_1 = __webpack_require__(1);
	exports.Util = util_1.Util;
	__export(__webpack_require__(5));
	__export(__webpack_require__(14));

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function __export(m) {
	    for (var p in m) {
	        if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	}
	__export(__webpack_require__(15));
	var files_1 = __webpack_require__(26);
	exports.CheckinType = files_1.CheckinType;
	exports.WebPartsPersonalizationScope = files_1.WebPartsPersonalizationScope;
	exports.MoveOperations = files_1.MoveOperations;
	exports.TemplateFileType = files_1.TemplateFileType;
	var items_1 = __webpack_require__(24);
	exports.Item = items_1.Item;
	exports.PagedItemCollection = items_1.PagedItemCollection;
	var navigation_1 = __webpack_require__(35);
	exports.NavigationNodes = navigation_1.NavigationNodes;
	exports.NavigationNode = navigation_1.NavigationNode;
	var lists_1 = __webpack_require__(23);
	exports.List = lists_1.List;
	var odata_1 = __webpack_require__(11);
	exports.extractOdataId = odata_1.extractOdataId;
	exports.ODataParserBase = odata_1.ODataParserBase;
	exports.ODataDefaultParser = odata_1.ODataDefaultParser;
	exports.ODataRaw = odata_1.ODataRaw;
	exports.ODataValue = odata_1.ODataValue;
	exports.ODataEntity = odata_1.ODataEntity;
	exports.ODataEntityArray = odata_1.ODataEntityArray;
	exports.TextFileParser = odata_1.TextFileParser;
	exports.BlobFileParser = odata_1.BlobFileParser;
	exports.BufferFileParser = odata_1.BufferFileParser;
	exports.JSONFileParser = odata_1.JSONFileParser;
	var roles_1 = __webpack_require__(20);
	exports.RoleDefinitionBindings = roles_1.RoleDefinitionBindings;
	var search_1 = __webpack_require__(7);
	exports.Search = search_1.Search;
	exports.SearchResult = search_1.SearchResult;
	exports.SearchResults = search_1.SearchResults;
	exports.SortDirection = search_1.SortDirection;
	exports.ReorderingRuleMatchType = search_1.ReorderingRuleMatchType;
	exports.QueryPropertyValueType = search_1.QueryPropertyValueType;
	var searchsuggest_1 = __webpack_require__(16);
	exports.SearchSuggest = searchsuggest_1.SearchSuggest;
	exports.SearchSuggestResult = searchsuggest_1.SearchSuggestResult;
	var site_1 = __webpack_require__(17);
	exports.Site = site_1.Site;
	__export(__webpack_require__(31));
	var webs_1 = __webpack_require__(18);
	exports.Web = webs_1.Web;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var util_1 = __webpack_require__(1);
	var exceptions_1 = __webpack_require__(14);
	/**
	 * Makes requests using the SP.RequestExecutor library.
	 */
	
	var SPRequestExecutorClient = function () {
	    function SPRequestExecutorClient() {
	        _classCallCheck(this, SPRequestExecutorClient);
	
	        /**
	         * Converts a SharePoint REST API response to a fetch API response.
	         */
	        this.convertToResponse = function (spResponse) {
	            var responseHeaders = new Headers();
	            for (var h in spResponse.headers) {
	                if (spResponse.headers[h]) {
	                    responseHeaders.append(h, spResponse.headers[h]);
	                }
	            }
	            // issue #256, Cannot have an empty string body when creating a Response with status 204
	            var body = spResponse.statusCode === 204 ? null : spResponse.body;
	            return new Response(body, {
	                headers: responseHeaders,
	                status: spResponse.statusCode,
	                statusText: spResponse.statusText
	            });
	        };
	    }
	    /**
	     * Fetches a URL using the SP.RequestExecutor library.
	     */
	
	
	    _createClass(SPRequestExecutorClient, [{
	        key: "fetch",
	        value: function fetch(url, options) {
	            var _this = this;
	
	            if (typeof SP === "undefined" || typeof SP.RequestExecutor === "undefined") {
	                throw new exceptions_1.SPRequestExecutorUndefinedException();
	            }
	            var addinWebUrl = url.substring(0, url.indexOf("/_api")),
	                executor = new SP.RequestExecutor(addinWebUrl),
	                headers = {},
	                iterator = void 0,
	                temp = void 0;
	            if (options.headers && options.headers instanceof Headers) {
	                iterator = options.headers.entries();
	                temp = iterator.next();
	                while (!temp.done) {
	                    headers[temp.value[0]] = temp.value[1];
	                    temp = iterator.next();
	                }
	            } else {
	                headers = options.headers;
	            }
	            return new Promise(function (resolve, reject) {
	                var requestOptions = {
	                    error: function error(_error) {
	                        reject(_this.convertToResponse(_error));
	                    },
	                    headers: headers,
	                    method: options.method,
	                    success: function success(response) {
	                        resolve(_this.convertToResponse(response));
	                    },
	                    url: url
	                };
	                if (options.body) {
	                    requestOptions = util_1.Util.extend(requestOptions, { body: options.body });
	                } else {
	                    requestOptions = util_1.Util.extend(requestOptions, { binaryStringRequestBody: true });
	                }
	                executor.executeAsync(requestOptions);
	            });
	        }
	    }]);
	
	    return SPRequestExecutorClient;
	}();
	
	exports.SPRequestExecutorClient = SPRequestExecutorClient;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var exceptions_1 = __webpack_require__(14);
	/**
	 * This module is substituted for the NodeFetchClient.ts during the packaging process. This helps to reduce the pnp.js file size by
	 * not including all of the node dependencies
	 */
	
	var NodeFetchClient = function () {
	  function NodeFetchClient() {
	    _classCallCheck(this, NodeFetchClient);
	  }
	
	  _createClass(NodeFetchClient, [{
	    key: "fetch",
	
	    /**
	     * Always throws an error that NodeFetchClient is not supported for use in the browser
	     */
	    value: function fetch() {
	      throw new exceptions_1.NodeFetchClientUnsupportedException();
	    }
	  }]);
	
	  return NodeFetchClient;
	}();
	
	exports.NodeFetchClient = NodeFetchClient;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var cachingConfigurationProvider_1 = __webpack_require__(44);
	exports.CachingConfigurationProvider = cachingConfigurationProvider_1.default;
	var spListConfigurationProvider_1 = __webpack_require__(45);
	exports.SPListConfigurationProvider = spListConfigurationProvider_1.default;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var storage = __webpack_require__(2);
	var exceptions_1 = __webpack_require__(14);
	/**
	 * A caching provider which can wrap other non-caching providers
	 *
	 */
	
	var CachingConfigurationProvider = function () {
	    /**
	     * Creates a new caching configuration provider
	     * @constructor
	     * @param {IConfigurationProvider} wrappedProvider Provider which will be used to fetch the configuration
	     * @param {string} cacheKey Key that will be used to store cached items to the cache
	     * @param {IPnPClientStore} cacheStore OPTIONAL storage, which will be used to store cached settings.
	     */
	    function CachingConfigurationProvider(wrappedProvider, cacheKey, cacheStore) {
	        _classCallCheck(this, CachingConfigurationProvider);
	
	        this.wrappedProvider = wrappedProvider;
	        this.store = cacheStore ? cacheStore : this.selectPnPCache();
	        this.cacheKey = "_configcache_" + cacheKey;
	    }
	    /**
	     * Gets the wrapped configuration providers
	     *
	     * @return {IConfigurationProvider} Wrapped configuration provider
	     */
	
	
	    _createClass(CachingConfigurationProvider, [{
	        key: "getWrappedProvider",
	        value: function getWrappedProvider() {
	            return this.wrappedProvider;
	        }
	        /**
	         * Loads the configuration values either from the cache or from the wrapped provider
	         *
	         * @return {Promise<TypedHash<string>>} Promise of loaded configuration values
	         */
	
	    }, {
	        key: "getConfiguration",
	        value: function getConfiguration() {
	            var _this = this;
	
	            // Cache not available, pass control to  the wrapped provider
	            if (!this.store || !this.store.enabled) {
	                return this.wrappedProvider.getConfiguration();
	            }
	            // Value is found in cache, return it directly
	            var cachedConfig = this.store.get(this.cacheKey);
	            if (cachedConfig) {
	                return new Promise(function (resolve) {
	                    resolve(cachedConfig);
	                });
	            }
	            // Get and cache value from the wrapped provider
	            var providerPromise = this.wrappedProvider.getConfiguration();
	            providerPromise.then(function (providedConfig) {
	                _this.store.put(_this.cacheKey, providedConfig);
	            });
	            return providerPromise;
	        }
	    }, {
	        key: "selectPnPCache",
	        value: function selectPnPCache() {
	            var pnpCache = new storage.PnPClientStorage();
	            if (pnpCache.local && pnpCache.local.enabled) {
	                return pnpCache.local;
	            }
	            if (pnpCache.session && pnpCache.session.enabled) {
	                return pnpCache.session;
	            }
	            throw new exceptions_1.NoCacheAvailableException();
	        }
	    }]);
	
	    return CachingConfigurationProvider;
	}();
	
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = CachingConfigurationProvider;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var cachingConfigurationProvider_1 = __webpack_require__(44);
	/**
	 * A configuration provider which loads configuration values from a SharePoint list
	 *
	 */
	
	var SPListConfigurationProvider = function () {
	    /**
	     * Creates a new SharePoint list based configuration provider
	     * @constructor
	     * @param {string} webUrl Url of the SharePoint site, where the configuration list is located
	     * @param {string} listTitle Title of the SharePoint list, which contains the configuration settings (optional, default = "config")
	     */
	    function SPListConfigurationProvider(sourceWeb) {
	        var sourceListTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "config";
	
	        _classCallCheck(this, SPListConfigurationProvider);
	
	        this.sourceWeb = sourceWeb;
	        this.sourceListTitle = sourceListTitle;
	    }
	    /**
	     * Gets the url of the SharePoint site, where the configuration list is located
	     *
	     * @return {string} Url address of the site
	     */
	
	
	    _createClass(SPListConfigurationProvider, [{
	        key: "getConfiguration",
	
	        /**
	         * Loads the configuration values from the SharePoint list
	         *
	         * @return {Promise<TypedHash<string>>} Promise of loaded configuration values
	         */
	        value: function getConfiguration() {
	            return this.web.lists.getByTitle(this.listTitle).items.select("Title", "Value").getAs().then(function (data) {
	                return data.reduce(function (configuration, item) {
	                    return Object.defineProperty(configuration, item.Title, {
	                        configurable: false,
	                        enumerable: false,
	                        value: item.Value,
	                        writable: false
	                    });
	                }, {});
	            });
	        }
	        /**
	         * Wraps the current provider in a cache enabled provider
	         *
	         * @return {CachingConfigurationProvider} Caching providers which wraps the current provider
	         */
	
	    }, {
	        key: "asCaching",
	        value: function asCaching() {
	            var cacheKey = "splist_" + this.web.toUrl() + "+" + this.listTitle;
	            return new cachingConfigurationProvider_1.default(this, cacheKey);
	        }
	    }, {
	        key: "web",
	        get: function get() {
	            return this.sourceWeb;
	        }
	        /**
	         * Gets the title of the SharePoint list, which contains the configuration settings
	         *
	         * @return {string} List title
	         */
	
	    }, {
	        key: "listTitle",
	        get: function get() {
	            return this.sourceListTitle;
	        }
	    }]);
	
	    return SPListConfigurationProvider;
	}();
	
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = SPListConfigurationProvider;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=pnp.js.map