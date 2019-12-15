/**
 * sp-pnp-js v3.0.2 - A JavaScript library for SharePoint development.
 * MIT (https://github.com/SharePoint/PnP-JS-Core/blob/master/LICENSE)
 * Copyright (c) 2017 Microsoft
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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var pnplibconfig_1 = __webpack_require__(3);
function extractWebUrl(candidateUrl) {
    if (candidateUrl === null) {
        return "";
    }
    var index = candidateUrl.indexOf("_api/");
    if (index > -1) {
        return candidateUrl.substr(0, index);
    }
    // if all else fails just give them what they gave us back
    return candidateUrl;
}
exports.extractWebUrl = extractWebUrl;
var Util = /** @class */ (function () {
    function Util() {
    }
    /**
     * Gets a callback function which will maintain context across async calls.
     * Allows for the calling pattern getCtxCallback(thisobj, method, methodarg1, methodarg2, ...)
     *
     * @param context The object that will be the 'this' value in the callback
     * @param method The method to which we will apply the context and parameters
     * @param params Optional, additional arguments to supply to the wrapped method when it is invoked
     */
    Util.getCtxCallback = function (context, method) {
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        return function () {
            method.apply(context, params);
        };
    };
    /**
     * Tests if a url param exists
     *
     * @param name The name of the url paramter to check
     */
    Util.urlParamExists = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        return regex.test(location.search);
    };
    /**
     * Gets a url param value by name
     *
     * @param name The name of the paramter for which we want the value
     */
    Util.getUrlParamByName = function (name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    /**
     * Gets a url param by name and attempts to parse a bool value
     *
     * @param name The name of the paramter for which we want the boolean value
     */
    Util.getUrlParamBoolByName = function (name) {
        var p = this.getUrlParamByName(name);
        var isFalse = (p === "" || /false|0/i.test(p));
        return !isFalse;
    };
    /**
     * Inserts the string s into the string target as the index specified by index
     *
     * @param target The string into which we will insert s
     * @param index The location in target to insert s (zero based)
     * @param s The string to insert into target at position index
     */
    Util.stringInsert = function (target, index, s) {
        if (index > 0) {
            return target.substring(0, index) + s + target.substring(index, target.length);
        }
        return s + target;
    };
    /**
     * Adds a value to a date
     *
     * @param date The date to which we will add units, done in local time
     * @param interval The name of the interval to add, one of: ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second']
     * @param units The amount to add to date of the given interval
     *
     * http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
     */
    Util.dateAdd = function (date, interval, units) {
        var ret = new Date(date); // don't change original date
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
    };
    /**
     * Loads a stylesheet into the current page
     *
     * @param path The url to the stylesheet
     * @param avoidCache If true a value will be appended as a query string to avoid browser caching issues
     */
    Util.loadStylesheet = function (path, avoidCache) {
        if (avoidCache) {
            path += "?" + encodeURIComponent((new Date()).getTime().toString());
        }
        var head = document.getElementsByTagName("head");
        if (head.length > 0) {
            var e = document.createElement("link");
            head[0].appendChild(e);
            e.setAttribute("type", "text/css");
            e.setAttribute("rel", "stylesheet");
            e.setAttribute("href", path);
        }
    };
    /**
     * Combines an arbitrary set of paths ensuring that the slashes are normalized
     *
     * @param paths 0 to n path parts to combine
     */
    Util.combinePaths = function () {
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        return paths
            .filter(function (path) { return !Util.stringIsNullOrEmpty(path); })
            .map(function (path) { return path.replace(/^[\\|\/]/, "").replace(/[\\|\/]$/, ""); })
            .join("/")
            .replace(/\\/g, "/");
    };
    /**
     * Gets a random string of chars length
     *
     * @param chars The length of the random string to generate
     */
    Util.getRandomString = function (chars) {
        var text = new Array(chars);
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < chars; i++) {
            text[i] = possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text.join("");
    };
    /**
     * Gets a random GUID value
     *
     * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
     */
    /* tslint:disable no-bitwise */
    Util.getGUID = function () {
        var d = new Date().getTime();
        var guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return guid;
    };
    /* tslint:enable */
    /**
     * Determines if a given value is a function
     *
     * @param candidateFunction The thing to test for being a function
     */
    Util.isFunction = function (candidateFunction) {
        return typeof candidateFunction === "function";
    };
    /**
     * @returns whether the provided parameter is a JavaScript Array or not.
    */
    Util.isArray = function (array) {
        if (Array.isArray) {
            return Array.isArray(array);
        }
        return array && typeof array.length === "number" && array.constructor === Array;
    };
    /**
     * Determines if a string is null or empty or undefined
     *
     * @param s The string to test
     */
    Util.stringIsNullOrEmpty = function (s) {
        return typeof s === "undefined" || s === null || s.length < 1;
    };
    /**
     * Provides functionality to extend the given object by doing a shallow copy
     *
     * @param target The object to which properties will be copied
     * @param source The source object from which properties will be copied
     * @param noOverwrite If true existing properties on the target are not overwritten from the source
     *
     */
    Util.extend = function (target, source, noOverwrite) {
        if (noOverwrite === void 0) { noOverwrite = false; }
        if (source === null || typeof source === "undefined") {
            return target;
        }
        // ensure we don't overwrite things we don't want overwritten
        var check = noOverwrite ? function (o, i) { return !(i in o); } : function () { return true; };
        return Object.getOwnPropertyNames(source)
            .filter(function (v) { return check(target, v); })
            .reduce(function (t, v) {
            t[v] = source[v];
            return t;
        }, target);
    };
    /**
     * Determines if a given url is absolute
     *
     * @param url The url to check to see if it is absolute
     */
    Util.isUrlAbsolute = function (url) {
        return /^https?:\/\/|^\/\//i.test(url);
    };
    /**
     * Ensures that a given url is absolute for the current web based on context
     *
     * @param candidateUrl The url to make absolute
     *
     */
    Util.toAbsoluteUrl = function (candidateUrl) {
        return new Promise(function (resolve) {
            if (Util.isUrlAbsolute(candidateUrl)) {
                // if we are already absolute, then just return the url
                return resolve(candidateUrl);
            }
            if (pnplibconfig_1.RuntimeConfig.spBaseUrl !== null) {
                // base url specified either with baseUrl of spfxContext config property
                return resolve(Util.combinePaths(pnplibconfig_1.RuntimeConfig.spBaseUrl, candidateUrl));
            }
            if (typeof global._spPageContextInfo !== "undefined") {
                // operating in classic pages
                if (global._spPageContextInfo.hasOwnProperty("webAbsoluteUrl")) {
                    return resolve(Util.combinePaths(global._spPageContextInfo.webAbsoluteUrl, candidateUrl));
                }
                else if (global._spPageContextInfo.hasOwnProperty("webServerRelativeUrl")) {
                    return resolve(Util.combinePaths(global._spPageContextInfo.webServerRelativeUrl, candidateUrl));
                }
            }
            // does window.location exist and have a certain path part in it?
            if (typeof global.location !== "undefined") {
                var baseUrl_1 = global.location.toString().toLowerCase();
                ["/_layouts/", "/siteassets/"].forEach(function (s) {
                    var index = baseUrl_1.indexOf(s);
                    if (index > 0) {
                        return resolve(Util.combinePaths(baseUrl_1.substr(0, index), candidateUrl));
                    }
                });
            }
            return resolve(candidateUrl);
        });
    };
    return Util;
}());
exports.Util = Util;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var collections_1 = __webpack_require__(8);
var utils_1 = __webpack_require__(10);
var exceptions_1 = __webpack_require__(2);
var logging_1 = __webpack_require__(4);
var queryable_1 = __webpack_require__(19);
var pipeline_1 = __webpack_require__(20);
var httpclient_1 = __webpack_require__(21);
/**
 * SharePointQueryable Base Class
 *
 */
var SharePointQueryable = /** @class */ (function (_super) {
    __extends(SharePointQueryable, _super);
    /**
     * Creates a new instance of the SharePointQueryable class
     *
     * @constructor
     * @param baseUrl A string or SharePointQueryable that should form the base part of the url
     *
     */
    function SharePointQueryable(baseUrl, path) {
        var _this = _super.call(this) || this;
        _this._options = {};
        _this._query = new collections_1.Dictionary();
        _this._batch = null;
        if (typeof baseUrl === "string") {
            // we need to do some extra parsing to get the parent url correct if we are
            // being created from just a string.
            var urlStr = baseUrl;
            if (util_1.Util.isUrlAbsolute(urlStr) || urlStr.lastIndexOf("/") < 0) {
                _this._parentUrl = urlStr;
                _this._url = util_1.Util.combinePaths(urlStr, path);
            }
            else if (urlStr.lastIndexOf("/") > urlStr.lastIndexOf("(")) {
                // .../items(19)/fields
                var index = urlStr.lastIndexOf("/");
                _this._parentUrl = urlStr.slice(0, index);
                path = util_1.Util.combinePaths(urlStr.slice(index), path);
                _this._url = util_1.Util.combinePaths(_this._parentUrl, path);
            }
            else {
                // .../items(19)
                var index = urlStr.lastIndexOf("(");
                _this._parentUrl = urlStr.slice(0, index);
                _this._url = util_1.Util.combinePaths(urlStr, path);
            }
        }
        else {
            var q = baseUrl;
            _this._parentUrl = q._url;
            _this._options = q._options;
            var target = q._query.get("@target");
            if (target !== null) {
                _this._query.add("@target", target);
            }
            _this._url = util_1.Util.combinePaths(_this._parentUrl, path);
        }
        return _this;
    }
    /**
     * Blocks a batch call from occuring, MUST be cleared by calling the returned function
     */
    SharePointQueryable.prototype.addBatchDependency = function () {
        if (this.hasBatch) {
            return this._batch.addDependency();
        }
        return function () { return null; };
    };
    Object.defineProperty(SharePointQueryable.prototype, "hasBatch", {
        /**
         * Indicates if the current query has a batch associated
         *
         */
        get: function () {
            return this._batch !== null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharePointQueryable.prototype, "batch", {
        /**
         * The batch currently associated with this query or null
         *
         */
        get: function () {
            return this.hasBatch ? this._batch : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new instance of the supplied factory and extends this into that new instance
     *
     * @param factory constructor for the new SharePointQueryable
     */
    SharePointQueryable.prototype.as = function (factory) {
        var o = new factory(this._url, null);
        return util_1.Util.extend(o, this, true);
    };
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
    SharePointQueryable.prototype.inBatch = function (batch) {
        if (this._batch !== null) {
            throw new exceptions_1.AlreadyInBatchException();
        }
        this._batch = batch;
        return this;
    };
    /**
     * Gets the full url with query information
     *
     */
    SharePointQueryable.prototype.toUrlAndQuery = function () {
        var aliasedParams = new collections_1.Dictionary();
        var url = this.toUrl().replace(/'!(@.*?)::(.*?)'/ig, function (match, labelName, value) {
            logging_1.Logger.write("Rewriting aliased parameter from match " + match + " to label: " + labelName + " value: " + value, logging_1.LogLevel.Verbose);
            aliasedParams.add(labelName, "'" + value + "'");
            return labelName;
        });
        // inlude our explicitly set query string params
        aliasedParams.merge(this._query);
        if (aliasedParams.count() > 0) {
            url += "?" + aliasedParams.getKeys().map(function (key) { return key + "=" + aliasedParams.get(key); }).join("&");
        }
        return url;
    };
    /**
     * Gets a parent for this instance as specified
     *
     * @param factory The contructor for the class to create
     */
    SharePointQueryable.prototype.getParent = function (factory, baseUrl, path, batch) {
        if (baseUrl === void 0) { baseUrl = this.parentUrl; }
        var parent = new factory(baseUrl, path);
        parent.configure(this._options);
        var target = this.query.get("@target");
        if (target !== null) {
            parent.query.add("@target", target);
        }
        if (typeof batch !== "undefined") {
            parent = parent.inBatch(batch);
        }
        return parent;
    };
    /**
     * Clones this SharePointQueryable into a new SharePointQueryable instance of T
     * @param factory Constructor used to create the new instance
     * @param additionalPath Any additional path to include in the clone
     * @param includeBatch If true this instance's batch will be added to the cloned instance
     */
    SharePointQueryable.prototype.clone = function (factory, additionalPath, includeBatch) {
        if (includeBatch === void 0) { includeBatch = true; }
        var clone = new factory(this, additionalPath);
        var target = this.query.get("@target");
        if (target !== null) {
            clone.query.add("@target", target);
        }
        if (includeBatch && this.hasBatch) {
            clone = clone.inBatch(this.batch);
        }
        return clone;
    };
    /**
     * Converts the current instance to a request context
     *
     * @param verb The request verb
     * @param options The set of supplied request options
     * @param parser The supplied ODataParser instance
     * @param pipeline Optional request processing pipeline
     */
    SharePointQueryable.prototype.toRequestContext = function (verb, options, parser, pipeline) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (pipeline === void 0) { pipeline = pipeline_1.PipelineMethods.default; }
        var dependencyDispose = this.hasBatch ? this.addBatchDependency() : function () { return; };
        return util_1.Util.toAbsoluteUrl(this.toUrlAndQuery()).then(function (url) {
            utils_1.mergeOptions(options, _this._options);
            // build our request context
            var context = {
                batch: _this._batch,
                batchDependency: dependencyDispose,
                cachingOptions: _this._cachingOptions,
                clientFactory: function () { return new httpclient_1.HttpClient(); },
                isBatched: _this.hasBatch,
                isCached: _this._useCaching,
                options: options,
                parser: parser,
                pipeline: pipeline,
                requestAbsoluteUrl: url,
                requestId: util_1.Util.getGUID(),
                verb: verb,
            };
            return context;
        });
    };
    return SharePointQueryable;
}(queryable_1.ODataQueryable));
exports.SharePointQueryable = SharePointQueryable;
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
var SharePointQueryableCollection = /** @class */ (function (_super) {
    __extends(SharePointQueryableCollection, _super);
    function SharePointQueryableCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Filters the returned collection (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#bk_supported)
     *
     * @param filter The string representing the filter query
     */
    SharePointQueryableCollection.prototype.filter = function (filter) {
        this._query.add("$filter", filter);
        return this;
    };
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    SharePointQueryableCollection.prototype.select = function () {
        var selects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selects[_i] = arguments[_i];
        }
        if (selects.length > 0) {
            this._query.add("$select", selects.join(","));
        }
        return this;
    };
    /**
     * Expands fields such as lookups to get additional data
     *
     * @param expands The Fields for which to expand the values
     */
    SharePointQueryableCollection.prototype.expand = function () {
        var expands = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expands[_i] = arguments[_i];
        }
        if (expands.length > 0) {
            this._query.add("$expand", expands.join(","));
        }
        return this;
    };
    /**
     * Orders based on the supplied fields ascending
     *
     * @param orderby The name of the field to sort on
     * @param ascending If false DESC is appended, otherwise ASC (default)
     */
    SharePointQueryableCollection.prototype.orderBy = function (orderBy, ascending) {
        if (ascending === void 0) { ascending = true; }
        var keys = this._query.getKeys();
        var query = [];
        var asc = ascending ? " asc" : " desc";
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === "$orderby") {
                query.push(this._query.get("$orderby"));
                break;
            }
        }
        query.push("" + orderBy + asc);
        this._query.add("$orderby", query.join(","));
        return this;
    };
    /**
     * Skips the specified number of items
     *
     * @param skip The number of items to skip
     */
    SharePointQueryableCollection.prototype.skip = function (skip) {
        this._query.add("$skip", skip.toString());
        return this;
    };
    /**
     * Limits the query to only return the specified number of items
     *
     * @param top The query row limit
     */
    SharePointQueryableCollection.prototype.top = function (top) {
        this._query.add("$top", top.toString());
        return this;
    };
    return SharePointQueryableCollection;
}(SharePointQueryable));
exports.SharePointQueryableCollection = SharePointQueryableCollection;
/**
 * Represents an instance that can be selected
 *
 */
var SharePointQueryableInstance = /** @class */ (function (_super) {
    __extends(SharePointQueryableInstance, _super);
    function SharePointQueryableInstance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    SharePointQueryableInstance.prototype.select = function () {
        var selects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selects[_i] = arguments[_i];
        }
        if (selects.length > 0) {
            this._query.add("$select", selects.join(","));
        }
        return this;
    };
    /**
     * Expands fields such as lookups to get additional data
     *
     * @param expands The Fields for which to expand the values
     */
    SharePointQueryableInstance.prototype.expand = function () {
        var expands = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expands[_i] = arguments[_i];
        }
        if (expands.length > 0) {
            this._query.add("$expand", expands.join(","));
        }
        return this;
    };
    return SharePointQueryableInstance;
}(SharePointQueryable));
exports.SharePointQueryableInstance = SharePointQueryableInstance;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = __webpack_require__(4);
function defaultLog(error) {
    logging_1.Logger.log({ data: {}, level: logging_1.LogLevel.Error, message: "[" + error.name + "]::" + error.message });
}
/**
 * Represents an exception with an HttpClient request
 *
 */
var ProcessHttpClientResponseException = /** @class */ (function (_super) {
    __extends(ProcessHttpClientResponseException, _super);
    function ProcessHttpClientResponseException(status, statusText, data) {
        var _this = _super.call(this, "Error making HttpClient request in queryable: [" + status + "] " + statusText) || this;
        _this.status = status;
        _this.statusText = statusText;
        _this.data = data;
        _this.name = "ProcessHttpClientResponseException";
        logging_1.Logger.log({ data: _this.data, level: logging_1.LogLevel.Error, message: _this.message });
        return _this;
    }
    return ProcessHttpClientResponseException;
}(Error));
exports.ProcessHttpClientResponseException = ProcessHttpClientResponseException;
var NoCacheAvailableException = /** @class */ (function (_super) {
    __extends(NoCacheAvailableException, _super);
    function NoCacheAvailableException(msg) {
        if (msg === void 0) { msg = "Cannot create a caching configuration provider since cache is not available."; }
        var _this = _super.call(this, msg) || this;
        _this.name = "NoCacheAvailableException";
        defaultLog(_this);
        return _this;
    }
    return NoCacheAvailableException;
}(Error));
exports.NoCacheAvailableException = NoCacheAvailableException;
var APIUrlException = /** @class */ (function (_super) {
    __extends(APIUrlException, _super);
    function APIUrlException(msg) {
        if (msg === void 0) { msg = "Unable to determine API url."; }
        var _this = _super.call(this, msg) || this;
        _this.name = "APIUrlException";
        defaultLog(_this);
        return _this;
    }
    return APIUrlException;
}(Error));
exports.APIUrlException = APIUrlException;
var AuthUrlException = /** @class */ (function (_super) {
    __extends(AuthUrlException, _super);
    function AuthUrlException(data, msg) {
        if (msg === void 0) { msg = "Auth URL Endpoint could not be determined from data. Data logged."; }
        var _this = _super.call(this, msg) || this;
        _this.name = "APIUrlException";
        logging_1.Logger.log({ data: data, level: logging_1.LogLevel.Error, message: _this.message });
        return _this;
    }
    return AuthUrlException;
}(Error));
exports.AuthUrlException = AuthUrlException;
var NodeFetchClientUnsupportedException = /** @class */ (function (_super) {
    __extends(NodeFetchClientUnsupportedException, _super);
    function NodeFetchClientUnsupportedException(msg) {
        if (msg === void 0) { msg = "Using NodeFetchClient in the browser is not supported."; }
        var _this = _super.call(this, msg) || this;
        _this.name = "NodeFetchClientUnsupportedException";
        defaultLog(_this);
        return _this;
    }
    return NodeFetchClientUnsupportedException;
}(Error));
exports.NodeFetchClientUnsupportedException = NodeFetchClientUnsupportedException;
var SPRequestExecutorUndefinedException = /** @class */ (function (_super) {
    __extends(SPRequestExecutorUndefinedException, _super);
    function SPRequestExecutorUndefinedException() {
        var _this = this;
        var msg = [
            "SP.RequestExecutor is undefined. ",
            "Load the SP.RequestExecutor.js library (/_layouts/15/SP.RequestExecutor.js) before loading the PnP JS Core library.",
        ].join(" ");
        _this = _super.call(this, msg) || this;
        _this.name = "SPRequestExecutorUndefinedException";
        defaultLog(_this);
        return _this;
    }
    return SPRequestExecutorUndefinedException;
}(Error));
exports.SPRequestExecutorUndefinedException = SPRequestExecutorUndefinedException;
var MaxCommentLengthException = /** @class */ (function (_super) {
    __extends(MaxCommentLengthException, _super);
    function MaxCommentLengthException(msg) {
        if (msg === void 0) { msg = "The maximum comment length is 1023 characters."; }
        var _this = _super.call(this, msg) || this;
        _this.name = "MaxCommentLengthException";
        defaultLog(_this);
        return _this;
    }
    return MaxCommentLengthException;
}(Error));
exports.MaxCommentLengthException = MaxCommentLengthException;
var NotSupportedInBatchException = /** @class */ (function (_super) {
    __extends(NotSupportedInBatchException, _super);
    function NotSupportedInBatchException(operation) {
        if (operation === void 0) { operation = "This operation"; }
        var _this = _super.call(this, operation + " is not supported as part of a batch.") || this;
        _this.name = "NotSupportedInBatchException";
        defaultLog(_this);
        return _this;
    }
    return NotSupportedInBatchException;
}(Error));
exports.NotSupportedInBatchException = NotSupportedInBatchException;
var ODataIdException = /** @class */ (function (_super) {
    __extends(ODataIdException, _super);
    function ODataIdException(data, msg) {
        if (msg === void 0) { msg = "Could not extract odata id in object, you may be using nometadata. Object data logged to logger."; }
        var _this = _super.call(this, msg) || this;
        _this.name = "ODataIdException";
        logging_1.Logger.log({ data: data, level: logging_1.LogLevel.Error, message: _this.message });
        return _this;
    }
    return ODataIdException;
}(Error));
exports.ODataIdException = ODataIdException;
var BatchParseException = /** @class */ (function (_super) {
    __extends(BatchParseException, _super);
    function BatchParseException(msg) {
        var _this = _super.call(this, msg) || this;
        _this.name = "BatchParseException";
        defaultLog(_this);
        return _this;
    }
    return BatchParseException;
}(Error));
exports.BatchParseException = BatchParseException;
var AlreadyInBatchException = /** @class */ (function (_super) {
    __extends(AlreadyInBatchException, _super);
    function AlreadyInBatchException(msg) {
        if (msg === void 0) { msg = "This query is already part of a batch."; }
        var _this = _super.call(this, msg) || this;
        _this.name = "AlreadyInBatchException";
        defaultLog(_this);
        return _this;
    }
    return AlreadyInBatchException;
}(Error));
exports.AlreadyInBatchException = AlreadyInBatchException;
var FunctionExpectedException = /** @class */ (function (_super) {
    __extends(FunctionExpectedException, _super);
    function FunctionExpectedException(msg) {
        if (msg === void 0) { msg = "This query is already part of a batch."; }
        var _this = _super.call(this, msg) || this;
        _this.name = "FunctionExpectedException";
        defaultLog(_this);
        return _this;
    }
    return FunctionExpectedException;
}(Error));
exports.FunctionExpectedException = FunctionExpectedException;
var UrlException = /** @class */ (function (_super) {
    __extends(UrlException, _super);
    function UrlException(msg) {
        var _this = _super.call(this, msg) || this;
        _this.name = "UrlException";
        defaultLog(_this);
        return _this;
    }
    return UrlException;
}(Error));
exports.UrlException = UrlException;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fetchclient_1 = __webpack_require__(27);
var RuntimeConfigImpl = /** @class */ (function () {
    function RuntimeConfigImpl() {
        // these are our default values for the library
        this._defaultCachingStore = "session";
        this._defaultCachingTimeoutSeconds = 60;
        this._globalCacheDisable = false;
        this._enableCacheExpiration = false;
        this._cacheExpirationIntervalMilliseconds = 750;
        this._spfxContext = null;
        // sharepoint settings
        this._spFetchClientFactory = function () { return new fetchclient_1.FetchClient(); };
        this._spBaseUrl = null;
        this._spHeaders = null;
        // ms graph settings
        this._graphHeaders = null;
        this._graphFetchClientFactory = function () { return null; };
    }
    RuntimeConfigImpl.prototype.set = function (config) {
        var _this = this;
        if (config.hasOwnProperty("globalCacheDisable")) {
            this._globalCacheDisable = config.globalCacheDisable;
        }
        if (config.hasOwnProperty("defaultCachingStore")) {
            this._defaultCachingStore = config.defaultCachingStore;
        }
        if (config.hasOwnProperty("defaultCachingTimeoutSeconds")) {
            this._defaultCachingTimeoutSeconds = config.defaultCachingTimeoutSeconds;
        }
        if (config.hasOwnProperty("sp")) {
            if (config.sp.hasOwnProperty("fetchClientFactory")) {
                this._spFetchClientFactory = config.sp.fetchClientFactory;
            }
            if (config.sp.hasOwnProperty("baseUrl")) {
                this._spBaseUrl = config.sp.baseUrl;
            }
            if (config.sp.hasOwnProperty("headers")) {
                this._spHeaders = config.sp.headers;
            }
        }
        if (config.hasOwnProperty("spfxContext")) {
            this._spfxContext = config.spfxContext;
            if (typeof this._spfxContext.graphHttpClient !== "undefined") {
                this._graphFetchClientFactory = function () { return _this._spfxContext.graphHttpClient; };
            }
        }
        if (config.hasOwnProperty("graph")) {
            if (config.graph.hasOwnProperty("headers")) {
                this._graphHeaders = config.graph.headers;
            }
            // this comes after the default setting of the _graphFetchClientFactory client so it can be overwritten
            if (config.graph.hasOwnProperty("fetchClientFactory")) {
                this._graphFetchClientFactory = config.graph.fetchClientFactory;
            }
        }
        if (config.hasOwnProperty("enableCacheExpiration")) {
            this._enableCacheExpiration = config.enableCacheExpiration;
        }
        if (config.hasOwnProperty("cacheExpirationIntervalMilliseconds")) {
            // we don't let the interval be less than 300 milliseconds
            var interval = config.cacheExpirationIntervalMilliseconds < 300 ? 300 : config.cacheExpirationIntervalMilliseconds;
            this._cacheExpirationIntervalMilliseconds = interval;
        }
    };
    Object.defineProperty(RuntimeConfigImpl.prototype, "defaultCachingStore", {
        get: function () {
            return this._defaultCachingStore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "defaultCachingTimeoutSeconds", {
        get: function () {
            return this._defaultCachingTimeoutSeconds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "globalCacheDisable", {
        get: function () {
            return this._globalCacheDisable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "spFetchClientFactory", {
        get: function () {
            return this._spFetchClientFactory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "spBaseUrl", {
        get: function () {
            if (this._spBaseUrl !== null) {
                return this._spBaseUrl;
            }
            else if (this._spfxContext !== null) {
                return this._spfxContext.pageContext.web.absoluteUrl;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "spHeaders", {
        get: function () {
            return this._spHeaders;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "enableCacheExpiration", {
        get: function () {
            return this._enableCacheExpiration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "cacheExpirationIntervalMilliseconds", {
        get: function () {
            return this._cacheExpirationIntervalMilliseconds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "spfxContext", {
        get: function () {
            return this._spfxContext;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "graphFetchClientFactory", {
        get: function () {
            return this._graphFetchClientFactory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "graphHeaders", {
        get: function () {
            return this._graphHeaders;
        },
        enumerable: true,
        configurable: true
    });
    return RuntimeConfigImpl;
}());
exports.RuntimeConfigImpl = RuntimeConfigImpl;
var _runtimeConfig = new RuntimeConfigImpl();
exports.RuntimeConfig = _runtimeConfig;
function setRuntimeConfig(config) {
    _runtimeConfig.set(config);
}
exports.setRuntimeConfig = setRuntimeConfig;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A set of logging levels
 *
 */
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
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Object.defineProperty(Logger, "activeLogLevel", {
        get: function () {
            return Logger.instance.activeLogLevel;
        },
        set: function (value) {
            Logger.instance.activeLogLevel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Logger, "instance", {
        get: function () {
            if (typeof Logger._instance === "undefined" || Logger._instance === null) {
                Logger._instance = new LoggerImpl();
            }
            return Logger._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds ILogListener instances to the set of subscribed listeners
     *
     * @param listeners One or more listeners to subscribe to this log
     */
    Logger.subscribe = function () {
        var listeners = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            listeners[_i] = arguments[_i];
        }
        listeners.map(function (listener) { return Logger.instance.subscribe(listener); });
    };
    /**
     * Clears the subscribers collection, returning the collection before modifiction
     */
    Logger.clearSubscribers = function () {
        return Logger.instance.clearSubscribers();
    };
    Object.defineProperty(Logger, "count", {
        /**
         * Gets the current subscriber count
         */
        get: function () {
            return Logger.instance.count;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Writes the supplied string to the subscribed listeners
     *
     * @param message The message to write
     * @param level [Optional] if supplied will be used as the level of the entry (Default: LogLevel.Verbose)
     */
    Logger.write = function (message, level) {
        if (level === void 0) { level = LogLevel.Verbose; }
        Logger.instance.log({ level: level, message: message });
    };
    /**
     * Writes the supplied string to the subscribed listeners
     *
     * @param json The json object to stringify and write
     * @param level [Optional] if supplied will be used as the level of the entry (Default: LogLevel.Verbose)
     */
    Logger.writeJSON = function (json, level) {
        if (level === void 0) { level = LogLevel.Verbose; }
        Logger.instance.log({ level: level, message: JSON.stringify(json) });
    };
    /**
     * Logs the supplied entry to the subscribed listeners
     *
     * @param entry The message to log
     */
    Logger.log = function (entry) {
        Logger.instance.log(entry);
    };
    /**
     * Logs performance tracking data for the the execution duration of the supplied function using console.profile
     *
     * @param name The name of this profile boundary
     * @param f The function to execute and track within this performance boundary
     */
    Logger.measure = function (name, f) {
        return Logger.instance.measure(name, f);
    };
    return Logger;
}());
exports.Logger = Logger;
var LoggerImpl = /** @class */ (function () {
    function LoggerImpl(activeLogLevel, subscribers) {
        if (activeLogLevel === void 0) { activeLogLevel = LogLevel.Warning; }
        if (subscribers === void 0) { subscribers = []; }
        this.activeLogLevel = activeLogLevel;
        this.subscribers = subscribers;
    }
    LoggerImpl.prototype.subscribe = function (listener) {
        this.subscribers.push(listener);
    };
    LoggerImpl.prototype.clearSubscribers = function () {
        var s = this.subscribers.slice(0);
        this.subscribers.length = 0;
        return s;
    };
    Object.defineProperty(LoggerImpl.prototype, "count", {
        get: function () {
            return this.subscribers.length;
        },
        enumerable: true,
        configurable: true
    });
    LoggerImpl.prototype.write = function (message, level) {
        if (level === void 0) { level = LogLevel.Verbose; }
        this.log({ level: level, message: message });
    };
    LoggerImpl.prototype.log = function (entry) {
        if (typeof entry === "undefined" || entry.level < this.activeLogLevel) {
            return;
        }
        this.subscribers.map(function (subscriber) { return subscriber.log(entry); });
    };
    LoggerImpl.prototype.measure = function (name, f) {
        console.profile(name);
        try {
            return f();
        }
        finally {
            console.profileEnd();
        }
    };
    return LoggerImpl;
}());
/**
 * Implementation of ILogListener which logs to the browser console
 *
 */
var ConsoleListener = /** @class */ (function () {
    function ConsoleListener() {
    }
    /**
     * Any associated data that a given logging listener may choose to log or ignore
     *
     * @param entry The information to be logged
     */
    ConsoleListener.prototype.log = function (entry) {
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
    };
    /**
     * Formats the message
     *
     * @param entry The information to format into a string
     */
    ConsoleListener.prototype.format = function (entry) {
        var msg = [];
        msg.push("Message: " + entry.message);
        if (typeof entry.data !== "undefined") {
            msg.push(" Data: " + JSON.stringify(entry.data));
        }
        return msg.join("");
    };
    return ConsoleListener;
}());
exports.ConsoleListener = ConsoleListener;
/**
 * Implementation of ILogListener which logs to the supplied function
 *
 */
var FunctionListener = /** @class */ (function () {
    /**
     * Creates a new instance of the FunctionListener class
     *
     * @constructor
     * @param  method The method to which any logging data will be passed
     */
    function FunctionListener(method) {
        this.method = method;
    }
    /**
     * Any associated data that a given logging listener may choose to log or ignore
     *
     * @param entry The information to be logged
     */
    FunctionListener.prototype.log = function (entry) {
        this.method(entry);
    };
    return FunctionListener;
}());
exports.FunctionListener = FunctionListener;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var logging_1 = __webpack_require__(4);
var exceptions_1 = __webpack_require__(2);
var core_1 = __webpack_require__(13);
function spExtractODataId(candidate) {
    if (candidate.hasOwnProperty("odata.id")) {
        return candidate["odata.id"];
    }
    else if (candidate.hasOwnProperty("__metadata") && candidate.__metadata.hasOwnProperty("id")) {
        return candidate.__metadata.id;
    }
    else {
        throw new exceptions_1.ODataIdException(candidate);
    }
}
exports.spExtractODataId = spExtractODataId;
var SPODataEntityParserImpl = /** @class */ (function (_super) {
    __extends(SPODataEntityParserImpl, _super);
    function SPODataEntityParserImpl(factory) {
        var _this = _super.call(this) || this;
        _this.factory = factory;
        _this.hydrate = function (d) {
            var o = new _this.factory(spGetEntityUrl(d), null);
            return util_1.Util.extend(o, d);
        };
        return _this;
    }
    SPODataEntityParserImpl.prototype.parse = function (r) {
        var _this = this;
        return _super.prototype.parse.call(this, r).then(function (d) {
            var o = new _this.factory(spGetEntityUrl(d), null);
            return util_1.Util.extend(o, d);
        });
    };
    return SPODataEntityParserImpl;
}(core_1.ODataParserBase));
var SPODataEntityArrayParserImpl = /** @class */ (function (_super) {
    __extends(SPODataEntityArrayParserImpl, _super);
    function SPODataEntityArrayParserImpl(factory) {
        var _this = _super.call(this) || this;
        _this.factory = factory;
        _this.hydrate = function (d) {
            return d.map(function (v) {
                var o = new _this.factory(spGetEntityUrl(v), null);
                return util_1.Util.extend(o, v);
            });
        };
        return _this;
    }
    SPODataEntityArrayParserImpl.prototype.parse = function (r) {
        var _this = this;
        return _super.prototype.parse.call(this, r).then(function (d) {
            return d.map(function (v) {
                var o = new _this.factory(spGetEntityUrl(v), null);
                return util_1.Util.extend(o, v);
            });
        });
    };
    return SPODataEntityArrayParserImpl;
}(core_1.ODataParserBase));
function spGetEntityUrl(entity) {
    if (entity.hasOwnProperty("odata.metadata") && entity.hasOwnProperty("odata.editLink")) {
        // we are dealign with minimal metadata (default)
        return util_1.Util.combinePaths(util_1.extractWebUrl(entity["odata.metadata"]), "_api", entity["odata.editLink"]);
    }
    else if (entity.hasOwnProperty("__metadata")) {
        // we are dealing with verbose, which has an absolute uri
        return entity.__metadata.uri;
    }
    else {
        // we are likely dealing with nometadata, so don't error but we won't be able to
        // chain off these objects
        logging_1.Logger.write("No uri information found in ODataEntity parsing, chaining will fail for this object.", logging_1.LogLevel.Warning);
        return "";
    }
}
exports.spGetEntityUrl = spGetEntityUrl;
function spODataEntity(factory) {
    return new SPODataEntityParserImpl(factory);
}
exports.spODataEntity = spODataEntity;
function spODataEntityArray(factory) {
    return new SPODataEntityArrayParserImpl(factory);
}
exports.spODataEntityArray = spODataEntityArray;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var collections_1 = __webpack_require__(8);
var graphclient_1 = __webpack_require__(41);
var queryable_1 = __webpack_require__(19);
var pipeline_1 = __webpack_require__(20);
/**
 * Queryable Base Class
 *
 */
var GraphQueryable = /** @class */ (function (_super) {
    __extends(GraphQueryable, _super);
    /**
     * Creates a new instance of the Queryable class
     *
     * @constructor
     * @param baseUrl A string or Queryable that should form the base part of the url
     *
     */
    function GraphQueryable(baseUrl, path) {
        var _this = _super.call(this) || this;
        _this._query = new collections_1.Dictionary();
        if (typeof baseUrl === "string") {
            var urlStr = baseUrl;
            _this._parentUrl = urlStr;
            _this._url = util_1.Util.combinePaths(urlStr, path);
        }
        else {
            var q = baseUrl;
            _this._parentUrl = q._url;
            _this._url = util_1.Util.combinePaths(_this._parentUrl, path);
        }
        return _this;
    }
    /**
     * Creates a new instance of the supplied factory and extends this into that new instance
     *
     * @param factory constructor for the new queryable
     */
    GraphQueryable.prototype.as = function (factory) {
        var o = new factory(this._url, null);
        return util_1.Util.extend(o, this, true);
    };
    /**
     * Gets the full url with query information
     *
     */
    GraphQueryable.prototype.toUrlAndQuery = function () {
        var _this = this;
        return this.toUrl() + ("?" + this._query.getKeys().map(function (key) { return key + "=" + _this._query.get(key); }).join("&"));
    };
    /**
     * Gets a parent for this instance as specified
     *
     * @param factory The contructor for the class to create
     */
    GraphQueryable.prototype.getParent = function (factory, baseUrl, path) {
        if (baseUrl === void 0) { baseUrl = this.parentUrl; }
        return new factory(baseUrl, path);
    };
    /**
     * Clones this queryable into a new queryable instance of T
     * @param factory Constructor used to create the new instance
     * @param additionalPath Any additional path to include in the clone
     * @param includeBatch If true this instance's batch will be added to the cloned instance
     */
    GraphQueryable.prototype.clone = function (factory, additionalPath, includeBatch) {
        if (includeBatch === void 0) { includeBatch = true; }
        // TODO:: include batching info in clone
        if (includeBatch) {
            return new factory(this, additionalPath);
        }
        return new factory(this, additionalPath);
    };
    /**
     * Converts the current instance to a request context
     *
     * @param verb The request verb
     * @param options The set of supplied request options
     * @param parser The supplied ODataParser instance
     * @param pipeline Optional request processing pipeline
     */
    GraphQueryable.prototype.toRequestContext = function (verb, options, parser, pipeline) {
        if (options === void 0) { options = {}; }
        if (pipeline === void 0) { pipeline = pipeline_1.PipelineMethods.default; }
        // TODO:: add batch support
        return Promise.resolve({
            batch: null,
            batchDependency: function () { return void (0); },
            cachingOptions: this._cachingOptions,
            clientFactory: function () { return new graphclient_1.GraphHttpClient(); },
            isBatched: false,
            isCached: this._useCaching,
            options: options,
            parser: parser,
            pipeline: pipeline,
            requestAbsoluteUrl: this.toUrlAndQuery(),
            requestId: util_1.Util.getGUID(),
            verb: verb,
        });
    };
    return GraphQueryable;
}(queryable_1.ODataQueryable));
exports.GraphQueryable = GraphQueryable;
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
var GraphQueryableCollection = /** @class */ (function (_super) {
    __extends(GraphQueryableCollection, _super);
    function GraphQueryableCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @param filter The string representing the filter query
     */
    GraphQueryableCollection.prototype.filter = function (filter) {
        this._query.add("$filter", filter);
        return this;
    };
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    GraphQueryableCollection.prototype.select = function () {
        var selects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selects[_i] = arguments[_i];
        }
        if (selects.length > 0) {
            this._query.add("$select", selects.join(","));
        }
        return this;
    };
    /**
     * Expands fields such as lookups to get additional data
     *
     * @param expands The Fields for which to expand the values
     */
    GraphQueryableCollection.prototype.expand = function () {
        var expands = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expands[_i] = arguments[_i];
        }
        if (expands.length > 0) {
            this._query.add("$expand", expands.join(","));
        }
        return this;
    };
    /**
     * Orders based on the supplied fields ascending
     *
     * @param orderby The name of the field to sort on
     * @param ascending If false DESC is appended, otherwise ASC (default)
     */
    GraphQueryableCollection.prototype.orderBy = function (orderBy, ascending) {
        if (ascending === void 0) { ascending = true; }
        var keys = this._query.getKeys();
        var query = [];
        var asc = ascending ? " asc" : " desc";
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] === "$orderby") {
                query.push(this._query.get("$orderby"));
                break;
            }
        }
        query.push("" + orderBy + asc);
        this._query.add("$orderby", query.join(","));
        return this;
    };
    /**
     * Limits the query to only return the specified number of items
     *
     * @param top The query row limit
     */
    GraphQueryableCollection.prototype.top = function (top) {
        this._query.add("$top", top.toString());
        return this;
    };
    /**
     * Skips a set number of items in the return set
     *
     * @param num Number of items to skip
     */
    GraphQueryableCollection.prototype.skip = function (num) {
        this._query.add("$top", num.toString());
        return this;
    };
    /**
     * 	To request second and subsequent pages of Graph data
     */
    GraphQueryableCollection.prototype.skipToken = function (token) {
        this._query.add("$skiptoken", token);
        return this;
    };
    Object.defineProperty(GraphQueryableCollection.prototype, "count", {
        /**
         * 	Retrieves the total count of matching resources
         */
        get: function () {
            this._query.add("$count", "true");
            return this;
        },
        enumerable: true,
        configurable: true
    });
    return GraphQueryableCollection;
}(GraphQueryable));
exports.GraphQueryableCollection = GraphQueryableCollection;
var GraphQueryableSearchableCollection = /** @class */ (function (_super) {
    __extends(GraphQueryableSearchableCollection, _super);
    function GraphQueryableSearchableCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 	To request second and subsequent pages of Graph data
     */
    GraphQueryableSearchableCollection.prototype.search = function (query) {
        this._query.add("$search", query);
        return this;
    };
    return GraphQueryableSearchableCollection;
}(GraphQueryableCollection));
exports.GraphQueryableSearchableCollection = GraphQueryableSearchableCollection;
/**
 * Represents an instance that can be selected
 *
 */
var GraphQueryableInstance = /** @class */ (function (_super) {
    __extends(GraphQueryableInstance, _super);
    function GraphQueryableInstance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    GraphQueryableInstance.prototype.select = function () {
        var selects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selects[_i] = arguments[_i];
        }
        if (selects.length > 0) {
            this._query.add("$select", selects.join(","));
        }
        return this;
    };
    /**
     * Expands fields such as lookups to get additional data
     *
     * @param expands The Fields for which to expand the values
     */
    GraphQueryableInstance.prototype.expand = function () {
        var expands = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expands[_i] = arguments[_i];
        }
        if (expands.length > 0) {
            this._query.add("$expand", expands.join(","));
        }
        return this;
    };
    return GraphQueryableInstance;
}(GraphQueryable));
exports.GraphQueryableInstance = GraphQueryableInstance;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(13);
var util_1 = __webpack_require__(0);
var ODataDefaultParser = /** @class */ (function (_super) {
    __extends(ODataDefaultParser, _super);
    function ODataDefaultParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ODataDefaultParser;
}(core_1.ODataParserBase));
exports.ODataDefaultParser = ODataDefaultParser;
var ODataValueParserImpl = /** @class */ (function (_super) {
    __extends(ODataValueParserImpl, _super);
    function ODataValueParserImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ODataValueParserImpl.prototype.parse = function (r) {
        return _super.prototype.parse.call(this, r).then(function (d) { return d; });
    };
    return ODataValueParserImpl;
}(core_1.ODataParserBase));
function ODataValue() {
    return new ODataValueParserImpl();
}
exports.ODataValue = ODataValue;
var ODataRawParserImpl = /** @class */ (function () {
    function ODataRawParserImpl() {
    }
    ODataRawParserImpl.prototype.parse = function (r) {
        return r.json();
    };
    return ODataRawParserImpl;
}());
exports.ODataRawParserImpl = ODataRawParserImpl;
exports.ODataRaw = new ODataRawParserImpl();
var TextFileParser = /** @class */ (function () {
    function TextFileParser() {
    }
    TextFileParser.prototype.parse = function (r) {
        return r.text();
    };
    return TextFileParser;
}());
exports.TextFileParser = TextFileParser;
var BlobFileParser = /** @class */ (function () {
    function BlobFileParser() {
    }
    BlobFileParser.prototype.parse = function (r) {
        return r.blob();
    };
    return BlobFileParser;
}());
exports.BlobFileParser = BlobFileParser;
var JSONFileParser = /** @class */ (function () {
    function JSONFileParser() {
    }
    JSONFileParser.prototype.parse = function (r) {
        return r.json();
    };
    return JSONFileParser;
}());
exports.JSONFileParser = JSONFileParser;
var BufferFileParser = /** @class */ (function () {
    function BufferFileParser() {
    }
    BufferFileParser.prototype.parse = function (r) {
        if (util_1.Util.isFunction(r.arrayBuffer)) {
            return r.arrayBuffer();
        }
        return r.buffer();
    };
    return BufferFileParser;
}());
exports.BufferFileParser = BufferFileParser;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generic dictionary
 */
var Dictionary = /** @class */ (function () {
    /**
     * Creates a new instance of the Dictionary<T> class
     *
     * @constructor
     */
    function Dictionary(keys, values) {
        if (keys === void 0) { keys = []; }
        if (values === void 0) { values = []; }
        this.keys = keys;
        this.values = values;
    }
    /**
     * Gets a value from the collection using the specified key
     *
     * @param key The key whose value we want to return, returns null if the key does not exist
     */
    Dictionary.prototype.get = function (key) {
        var index = this.keys.indexOf(key);
        if (index < 0) {
            return null;
        }
        return this.values[index];
    };
    /**
     * Adds the supplied key and value to the dictionary
     *
     * @param key The key to add
     * @param o The value to add
     */
    Dictionary.prototype.add = function (key, o) {
        var index = this.keys.indexOf(key);
        if (index > -1) {
            this.values[index] = o;
        }
        else {
            this.keys.push(key);
            this.values.push(o);
        }
    };
    /**
     * Merges the supplied typed hash into this dictionary instance. Existing values are updated and new ones are created as appropriate.
     */
    Dictionary.prototype.merge = function (source) {
        var _this = this;
        if ("getKeys" in source) {
            var sourceAsDictionary_1 = source;
            sourceAsDictionary_1.getKeys().map(function (key) {
                _this.add(key, sourceAsDictionary_1.get(key));
            });
        }
        else {
            var sourceAsHash = source;
            for (var key in sourceAsHash) {
                if (sourceAsHash.hasOwnProperty(key)) {
                    this.add(key, sourceAsHash[key]);
                }
            }
        }
    };
    /**
     * Removes a value from the dictionary
     *
     * @param key The key of the key/value pair to remove. Returns null if the key was not found.
     */
    Dictionary.prototype.remove = function (key) {
        var index = this.keys.indexOf(key);
        if (index < 0) {
            return null;
        }
        var val = this.values[index];
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
        return val;
    };
    /**
     * Returns all the keys currently in the dictionary as an array
     */
    Dictionary.prototype.getKeys = function () {
        return this.keys;
    };
    /**
     * Returns all the values currently in the dictionary as an array
     */
    Dictionary.prototype.getValues = function () {
        return this.values;
    };
    /**
     * Clears the current dictionary
     */
    Dictionary.prototype.clear = function () {
        this.keys = [];
        this.values = [];
    };
    /**
     * Gets a count of the items currently in the dictionary
     */
    Dictionary.prototype.count = function () {
        return this.keys.length;
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var parsers_1 = __webpack_require__(7);
var util_1 = __webpack_require__(0);
var exceptions_1 = __webpack_require__(2);
var webparts_1 = __webpack_require__(34);
var items_1 = __webpack_require__(15);
var sharepointqueryableshareable_1 = __webpack_require__(16);
var odata_1 = __webpack_require__(5);
/**
 * Describes a collection of File objects
 *
 */
var Files = /** @class */ (function (_super) {
    __extends(Files, _super);
    /**
     * Creates a new instance of the Files class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    function Files(baseUrl, path) {
        if (path === void 0) { path = "files"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a File by filename
     *
     * @param name The name of the file, including extension.
     */
    Files.prototype.getByName = function (name) {
        var f = new File(this);
        f.concat("('" + name + "')");
        return f;
    };
    /**
     * Uploads a file. Not supported for batching
     *
     * @param url The folder-relative url of the file.
     * @param content The file contents blob.
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten? (default: true)
     * @returns The new File and the raw response.
     */
    Files.prototype.add = function (url, content, shouldOverWrite) {
        var _this = this;
        if (shouldOverWrite === void 0) { shouldOverWrite = true; }
        return new Files(this, "add(overwrite=" + shouldOverWrite + ",url='" + url + "')")
            .postCore({
            body: content,
        }).then(function (response) {
            return {
                data: response,
                file: _this.getByName(url),
            };
        });
    };
    /**
     * Uploads a file. Not supported for batching
     *
     * @param url The folder-relative url of the file.
     * @param content The Blob file content to add
     * @param progress A callback function which can be used to track the progress of the upload
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten? (default: true)
     * @param chunkSize The size of each file slice, in bytes (default: 10485760)
     * @returns The new File and the raw response.
     */
    Files.prototype.addChunked = function (url, content, progress, shouldOverWrite, chunkSize) {
        var _this = this;
        if (shouldOverWrite === void 0) { shouldOverWrite = true; }
        if (chunkSize === void 0) { chunkSize = 10485760; }
        var adder = this.clone(Files, "add(overwrite=" + shouldOverWrite + ",url='" + url + "')", false);
        return adder.postCore().then(function () { return _this.getByName(url); }).then(function (file) { return file.setContentChunked(content, progress, chunkSize); }).then(function (response) {
            return {
                data: response,
                file: _this.getByName(url),
            };
        });
    };
    /**
     * Adds a ghosted file to an existing list or document library. Not supported for batching.
     *
     * @param fileUrl The server-relative url where you want to save the file.
     * @param templateFileType The type of use to create the file.
     * @returns The template file that was added and the raw response.
     */
    Files.prototype.addTemplateFile = function (fileUrl, templateFileType) {
        var _this = this;
        return this.clone(Files, "addTemplateFile(urloffile='" + fileUrl + "',templatefiletype=" + templateFileType + ")", false)
            .postCore().then(function (response) {
            return {
                data: response,
                file: _this.getByName(fileUrl),
            };
        });
    };
    return Files;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.Files = Files;
/**
 * Describes a single File instance
 *
 */
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    function File() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(File.prototype, "listItemAllFields", {
        /**
         * Gets a value that specifies the list item field values for the list item corresponding to the file.
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryableCollection(this, "listItemAllFields");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(File.prototype, "versions", {
        /**
         * Gets a collection of versions
         *
         */
        get: function () {
            return new Versions(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Approves the file submitted for content approval with the specified comment.
     * Only documents in lists that are enabled for content approval can be approved.
     *
     * @param comment The comment for the approval.
     */
    File.prototype.approve = function (comment) {
        if (comment === void 0) { comment = ""; }
        return this.clone(File, "approve(comment='" + comment + "')").postCore();
    };
    /**
     * Stops the chunk upload session without saving the uploaded data. Does not support batching.
     * If the file doesn’t already exist in the library, the partially uploaded file will be deleted.
     * Use this in response to user action (as in a request to cancel an upload) or an error or exception.
     * Use the uploadId value that was passed to the StartUpload method that started the upload session.
     * This method is currently available only on Office 365.
     *
     * @param uploadId The unique identifier of the upload session.
     */
    File.prototype.cancelUpload = function (uploadId) {
        return this.clone(File, "cancelUpload(uploadId=guid'" + uploadId + "')", false).postCore();
    };
    /**
     * Checks the file in to a document library based on the check-in type.
     *
     * @param comment A comment for the check-in. Its length must be <= 1023.
     * @param checkinType The check-in type for the file.
     */
    File.prototype.checkin = function (comment, checkinType) {
        if (comment === void 0) { comment = ""; }
        if (checkinType === void 0) { checkinType = CheckinType.Major; }
        if (comment.length > 1023) {
            throw new exceptions_1.MaxCommentLengthException();
        }
        return this.clone(File, "checkin(comment='" + comment + "',checkintype=" + checkinType + ")").postCore();
    };
    /**
     * Checks out the file from a document library.
     */
    File.prototype.checkout = function () {
        return this.clone(File, "checkout").postCore();
    };
    /**
     * Copies the file to the destination url.
     *
     * @param url The absolute url or server relative url of the destination file path to copy to.
     * @param shouldOverWrite Should a file with the same name in the same location be overwritten?
     */
    File.prototype.copyTo = function (url, shouldOverWrite) {
        if (shouldOverWrite === void 0) { shouldOverWrite = true; }
        return this.clone(File, "copyTo(strnewurl='" + url + "',boverwrite=" + shouldOverWrite + ")").postCore();
    };
    /**
     * Delete this file.
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    File.prototype.delete = function (eTag) {
        if (eTag === void 0) { eTag = "*"; }
        return this.clone(File, null).postCore({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    /**
     * Denies approval for a file that was submitted for content approval.
     * Only documents in lists that are enabled for content approval can be denied.
     *
     * @param comment The comment for the denial.
     */
    File.prototype.deny = function (comment) {
        if (comment === void 0) { comment = ""; }
        if (comment.length > 1023) {
            throw new exceptions_1.MaxCommentLengthException();
        }
        return this.clone(File, "deny(comment='" + comment + "')").postCore();
    };
    /**
     * Specifies the control set used to access, modify, or add Web Parts associated with this Web Part Page and view.
     * An exception is thrown if the file is not an ASPX page.
     *
     * @param scope The WebPartsPersonalizationScope view on the Web Parts page.
     */
    File.prototype.getLimitedWebPartManager = function (scope) {
        if (scope === void 0) { scope = WebPartsPersonalizationScope.Shared; }
        return new webparts_1.LimitedWebPartManager(this, "getLimitedWebPartManager(scope=" + scope + ")");
    };
    /**
     * Moves the file to the specified destination url.
     *
     * @param url The absolute url or server relative url of the destination file path to move to.
     * @param moveOperations The bitwise MoveOperations value for how to move the file.
     */
    File.prototype.moveTo = function (url, moveOperations) {
        if (moveOperations === void 0) { moveOperations = MoveOperations.Overwrite; }
        return this.clone(File, "moveTo(newurl='" + url + "',flags=" + moveOperations + ")").postCore();
    };
    /**
     * Submits the file for content approval with the specified comment.
     *
     * @param comment The comment for the published file. Its length must be <= 1023.
     */
    File.prototype.publish = function (comment) {
        if (comment === void 0) { comment = ""; }
        if (comment.length > 1023) {
            throw new exceptions_1.MaxCommentLengthException();
        }
        return this.clone(File, "publish(comment='" + comment + "')").postCore();
    };
    /**
     * Moves the file to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     *
     * @returns The GUID of the recycled file.
     */
    File.prototype.recycle = function () {
        return this.clone(File, "recycle").postCore();
    };
    /**
     * Reverts an existing checkout for the file.
     *
     */
    File.prototype.undoCheckout = function () {
        return this.clone(File, "undoCheckout").postCore();
    };
    /**
     * Removes the file from content approval or unpublish a major version.
     *
     * @param comment The comment for the unpublish operation. Its length must be <= 1023.
     */
    File.prototype.unpublish = function (comment) {
        if (comment === void 0) { comment = ""; }
        if (comment.length > 1023) {
            throw new exceptions_1.MaxCommentLengthException();
        }
        return this.clone(File, "unpublish(comment='" + comment + "')").postCore();
    };
    /**
     * Gets the contents of the file as text. Not supported in batching.
     *
     */
    File.prototype.getText = function () {
        return this.clone(File, "$value", false).get(new parsers_1.TextFileParser(), { headers: { "binaryStringResponseBody": "true" } });
    };
    /**
     * Gets the contents of the file as a blob, does not work in Node.js. Not supported in batching.
     *
     */
    File.prototype.getBlob = function () {
        return this.clone(File, "$value", false).get(new parsers_1.BlobFileParser(), { headers: { "binaryStringResponseBody": "true" } });
    };
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js. Not supported in batching.
     */
    File.prototype.getBuffer = function () {
        return this.clone(File, "$value", false).get(new parsers_1.BufferFileParser(), { headers: { "binaryStringResponseBody": "true" } });
    };
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js. Not supported in batching.
     */
    File.prototype.getJSON = function () {
        return this.clone(File, "$value", false).get(new parsers_1.JSONFileParser(), { headers: { "binaryStringResponseBody": "true" } });
    };
    /**
     * Sets the content of a file, for large files use setContentChunked. Not supported in batching.
     *
     * @param content The file content
     *
     */
    File.prototype.setContent = function (content) {
        var _this = this;
        return this.clone(File, "$value", false).postCore({
            body: content,
            headers: {
                "X-HTTP-Method": "PUT",
            },
        }).then(function (_) { return new File(_this); });
    };
    /**
     * Gets the associated list item for this folder, loading the default properties
     */
    File.prototype.getItem = function () {
        var selects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selects[_i] = arguments[_i];
        }
        var q = this.listItemAllFields;
        return q.select.apply(q, selects).get().then(function (d) {
            return util_1.Util.extend(new items_1.Item(odata_1.spGetEntityUrl(d)), d);
        });
    };
    /**
     * Sets the contents of a file using a chunked upload approach. Not supported in batching.
     *
     * @param file The file to upload
     * @param progress A callback function which can be used to track the progress of the upload
     * @param chunkSize The size of each file slice, in bytes (default: 10485760)
     */
    File.prototype.setContentChunked = function (file, progress, chunkSize) {
        if (chunkSize === void 0) { chunkSize = 10485760; }
        if (typeof progress === "undefined") {
            progress = function () { return null; };
        }
        var self = this;
        var fileSize = file.size;
        var blockCount = parseInt((file.size / chunkSize).toString(), 10) + ((file.size % chunkSize === 0) ? 1 : 0);
        var uploadId = util_1.Util.getGUID();
        // start the chain with the first fragment
        progress({ blockNumber: 1, chunkSize: chunkSize, currentPointer: 0, fileSize: fileSize, stage: "starting", totalBlocks: blockCount });
        var chain = self.startUpload(uploadId, file.slice(0, chunkSize));
        var _loop_1 = function (i) {
            chain = chain.then(function (pointer) {
                progress({ blockNumber: i, chunkSize: chunkSize, currentPointer: pointer, fileSize: fileSize, stage: "continue", totalBlocks: blockCount });
                return self.continueUpload(uploadId, pointer, file.slice(pointer, pointer + chunkSize));
            });
        };
        // skip the first and last blocks
        for (var i = 2; i < blockCount; i++) {
            _loop_1(i);
        }
        return chain.then(function (pointer) {
            progress({ blockNumber: blockCount, chunkSize: chunkSize, currentPointer: pointer, fileSize: fileSize, stage: "finishing", totalBlocks: blockCount });
            return self.finishUpload(uploadId, pointer, file.slice(pointer));
        }).then(function (_) {
            return self;
        });
    };
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
    File.prototype.startUpload = function (uploadId, fragment) {
        return this.clone(File, "startUpload(uploadId=guid'" + uploadId + "')", false).postAsCore({ body: fragment }).then(function (n) { return parseFloat(n); });
    };
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
    File.prototype.continueUpload = function (uploadId, fileOffset, fragment) {
        return this.clone(File, "continueUpload(uploadId=guid'" + uploadId + "',fileOffset=" + fileOffset + ")", false).postAsCore({ body: fragment }).then(function (n) { return parseFloat(n); });
    };
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
    File.prototype.finishUpload = function (uploadId, fileOffset, fragment) {
        return this.clone(File, "finishUpload(uploadId=guid'" + uploadId + "',fileOffset=" + fileOffset + ")", false)
            .postAsCore({ body: fragment }).then(function (response) {
            return {
                data: response,
                file: new File(response.ServerRelativeUrl),
            };
        });
    };
    return File;
}(sharepointqueryableshareable_1.SharePointQueryableShareableFile));
exports.File = File;
/**
 * Describes a collection of Version objects
 *
 */
var Versions = /** @class */ (function (_super) {
    __extends(Versions, _super);
    /**
     * Creates a new instance of the File class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    function Versions(baseUrl, path) {
        if (path === void 0) { path = "versions"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a version by id
     *
     * @param versionId The id of the version to retrieve
     */
    Versions.prototype.getById = function (versionId) {
        var v = new Version(this);
        v.concat("(" + versionId + ")");
        return v;
    };
    /**
     * Deletes all the file version objects in the collection.
     *
     */
    Versions.prototype.deleteAll = function () {
        return new Versions(this, "deleteAll").postCore();
    };
    /**
     * Deletes the specified version of the file.
     *
     * @param versionId The ID of the file version to delete.
     */
    Versions.prototype.deleteById = function (versionId) {
        return this.clone(Versions, "deleteById(vid=" + versionId + ")").postCore();
    };
    /**
     * Deletes the file version object with the specified version label.
     *
     * @param label The version label of the file version to delete, for example: 1.2
     */
    Versions.prototype.deleteByLabel = function (label) {
        return this.clone(Versions, "deleteByLabel(versionlabel='" + label + "')").postCore();
    };
    /**
     * Creates a new file version from the file specified by the version label.
     *
     * @param label The version label of the file version to restore, for example: 1.2
     */
    Versions.prototype.restoreByLabel = function (label) {
        return this.clone(Versions, "restoreByLabel(versionlabel='" + label + "')").postCore();
    };
    return Versions;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.Versions = Versions;
/**
 * Describes a single Version instance
 *
 */
var Version = /** @class */ (function (_super) {
    __extends(Version, _super);
    function Version() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * Delete a specific version of a file.
    *
    * @param eTag Value used in the IF-Match header, by default "*"
    */
    Version.prototype.delete = function (eTag) {
        if (eTag === void 0) { eTag = "*"; }
        return this.postCore({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    return Version;
}(sharepointqueryable_1.SharePointQueryableInstance));
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


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
function mergeOptions(target, source) {
    target.headers = target.headers || {};
    var headers = util_1.Util.extend(target.headers, source.headers);
    target = util_1.Util.extend(target, source);
    target.headers = headers;
}
exports.mergeOptions = mergeOptions;
function mergeHeaders(target, source) {
    if (typeof source !== "undefined" && source !== null) {
        var temp = new Request("", { headers: source });
        temp.headers.forEach(function (value, name) {
            target.append(name, value);
        });
    }
}
exports.mergeHeaders = mergeHeaders;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var lists_1 = __webpack_require__(14);
var fields_1 = __webpack_require__(35);
var navigation_1 = __webpack_require__(36);
var sitegroups_1 = __webpack_require__(23);
var contenttypes_1 = __webpack_require__(24);
var folders_1 = __webpack_require__(18);
var roles_1 = __webpack_require__(22);
var files_1 = __webpack_require__(9);
var util_1 = __webpack_require__(0);
var lists_2 = __webpack_require__(14);
var siteusers_1 = __webpack_require__(33);
var usercustomactions_1 = __webpack_require__(25);
var odata_1 = __webpack_require__(5);
var batch_1 = __webpack_require__(37);
var features_1 = __webpack_require__(38);
var sharepointqueryableshareable_1 = __webpack_require__(16);
var relateditems_1 = __webpack_require__(51);
var appcatalog_1 = __webpack_require__(39);
/**
 * Describes a collection of webs
 *
 */
var Webs = /** @class */ (function (_super) {
    __extends(Webs, _super);
    /**
     * Creates a new instance of the Webs class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this web collection
     */
    function Webs(baseUrl, webPath) {
        if (webPath === void 0) { webPath = "webs"; }
        return _super.call(this, baseUrl, webPath) || this;
    }
    /**
     * Adds a new web to the collection
     *
     * @param title The new web's title
     * @param url The new web's relative url
     * @param description The new web's description
     * @param template The new web's template internal name (default = STS)
     * @param language The locale id that specifies the new web's language (default = 1033 [English, US])
     * @param inheritPermissions When true, permissions will be inherited from the new web's parent (default = true)
     */
    Webs.prototype.add = function (title, url, description, template, language, inheritPermissions) {
        if (description === void 0) { description = ""; }
        if (template === void 0) { template = "STS"; }
        if (language === void 0) { language = 1033; }
        if (inheritPermissions === void 0) { inheritPermissions = true; }
        var props = {
            Description: description,
            Language: language,
            Title: title,
            Url: url,
            UseSamePermissionsAsParentSite: inheritPermissions,
            WebTemplate: template,
        };
        var postBody = JSON.stringify({
            "parameters": util_1.Util.extend({
                "__metadata": { "type": "SP.WebCreationInformation" },
            }, props),
        });
        return this.clone(Webs, "add").postCore({ body: postBody }).then(function (data) {
            return {
                data: data,
                web: new Web(odata_1.spExtractODataId(data).replace(/_api\/web\/?/i, "")),
            };
        });
    };
    return Webs;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.Webs = Webs;
/**
 * Describes a collection of web infos
 *
 */
var WebInfos = /** @class */ (function (_super) {
    __extends(WebInfos, _super);
    /**
     * Creates a new instance of the WebInfos class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this web infos collection
     */
    function WebInfos(baseUrl, webPath) {
        if (webPath === void 0) { webPath = "webinfos"; }
        return _super.call(this, baseUrl, webPath) || this;
    }
    return WebInfos;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.WebInfos = WebInfos;
/**
 * Describes a web
 *
 */
var Web = /** @class */ (function (_super) {
    __extends(Web, _super);
    /**
     * Creates a new instance of the Web class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this web
     */
    function Web(baseUrl, path) {
        if (path === void 0) { path = "_api/web"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Creates a new web instance from the given url by indexing the location of the /_api/
     * segment. If this is not found the method creates a new web with the entire string as
     * supplied.
     *
     * @param url
     */
    Web.fromUrl = function (url, path) {
        return new Web(util_1.extractWebUrl(url), path);
    };
    Object.defineProperty(Web.prototype, "webs", {
        /**
         * Gets this web's subwebs
         *
         */
        get: function () {
            return new Webs(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Returns a collection of objects that contain metadata about subsites of the current site in which the current user is a member.
    *
    * @param nWebTemplateFilter Specifies the site definition (default = -1)
    * @param nConfigurationFilter A 16-bit integer that specifies the identifier of a configuration (default = -1)
    */
    Web.prototype.getSubwebsFilteredForCurrentUser = function (nWebTemplateFilter, nConfigurationFilter) {
        if (nWebTemplateFilter === void 0) { nWebTemplateFilter = -1; }
        if (nConfigurationFilter === void 0) { nConfigurationFilter = -1; }
        return this.clone(Webs, "getSubwebsFilteredForCurrentUser(nWebTemplateFilter=" + nWebTemplateFilter + ",nConfigurationFilter=" + nConfigurationFilter + ")");
    };
    Object.defineProperty(Web.prototype, "webinfos", {
        /**
         * Gets a collection of WebInfos for this web's subwebs
         *
         */
        get: function () {
            return new WebInfos(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "contentTypes", {
        /**
         * Gets the content types available in this web
         *
         */
        get: function () {
            return new contenttypes_1.ContentTypes(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "lists", {
        /**
         * Gets the lists in this web
         *
         */
        get: function () {
            return new lists_1.Lists(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "fields", {
        /**
         * Gets the fields in this web
         *
         */
        get: function () {
            return new fields_1.Fields(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "features", {
        /**
         * Gets the active features for this web
         *
         */
        get: function () {
            return new features_1.Features(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "availablefields", {
        /**
         * Gets the available fields in this web
         *
         */
        get: function () {
            return new fields_1.Fields(this, "availablefields");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "navigation", {
        /**
         * Gets the navigation options in this web
         *
         */
        get: function () {
            return new navigation_1.Navigation(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "siteUsers", {
        /**
         * Gets the site users
         *
         */
        get: function () {
            return new siteusers_1.SiteUsers(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "siteGroups", {
        /**
         * Gets the site groups
         *
         */
        get: function () {
            return new sitegroups_1.SiteGroups(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "siteUserInfoList", {
        /**
         * Gets site user info list
         *
         */
        get: function () {
            return new lists_2.List(this, "siteuserinfolist");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "currentUser", {
        /**
         * Gets the current user
         */
        get: function () {
            return new siteusers_1.CurrentUser(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "folders", {
        /**
         * Gets the top-level folders in this web
         *
         */
        get: function () {
            return new folders_1.Folders(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "userCustomActions", {
        /**
         * Gets all user custom actions for this web
         *
         */
        get: function () {
            return new usercustomactions_1.UserCustomActions(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "roleDefinitions", {
        /**
         * Gets the collection of RoleDefinition resources
         *
         */
        get: function () {
            return new roles_1.RoleDefinitions(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "relatedItems", {
        /**
         * Provides an interface to manage related items
         *
         */
        get: function () {
            return relateditems_1.RelatedItemManagerImpl.FromUrl(this.toUrl());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new batch for requests within the context of this web
     *
     */
    Web.prototype.createBatch = function () {
        return new batch_1.ODataBatch(this.parentUrl);
    };
    Object.defineProperty(Web.prototype, "rootFolder", {
        /**
         * Gets the root folder of this web
         *
         */
        get: function () {
            return new folders_1.Folder(this, "rootFolder");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "associatedOwnerGroup", {
        /**
         * Gets the associated owner group for this web
         *
         */
        get: function () {
            return new sitegroups_1.SiteGroup(this, "associatedownergroup");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "associatedMemberGroup", {
        /**
         * Gets the associated member group for this web
         *
         */
        get: function () {
            return new sitegroups_1.SiteGroup(this, "associatedmembergroup");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "associatedVisitorGroup", {
        /**
         * Gets the associated visitor group for this web
         *
         */
        get: function () {
            return new sitegroups_1.SiteGroup(this, "associatedvisitorgroup");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets a folder by server relative url
     *
     * @param folderRelativeUrl The server relative path to the folder (including /sites/ if applicable)
     */
    Web.prototype.getFolderByServerRelativeUrl = function (folderRelativeUrl) {
        return new folders_1.Folder(this, "getFolderByServerRelativeUrl('" + folderRelativeUrl + "')");
    };
    /**
     * Gets a file by server relative url
     *
     * @param fileRelativeUrl The server relative path to the file (including /sites/ if applicable)
     */
    Web.prototype.getFileByServerRelativeUrl = function (fileRelativeUrl) {
        return new files_1.File(this, "getFileByServerRelativeUrl('" + fileRelativeUrl + "')");
    };
    /**
     * Gets a list by server relative url (list's root folder)
     *
     * @param listRelativeUrl The server relative path to the list's root folder (including /sites/ if applicable)
     */
    Web.prototype.getList = function (listRelativeUrl) {
        return new lists_2.List(this, "getList('" + listRelativeUrl + "')");
    };
    /**
     * Updates this web instance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the web
     */
    Web.prototype.update = function (properties) {
        var _this = this;
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": "SP.Web" },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            return {
                data: data,
                web: _this,
            };
        });
    };
    /**
     * Deletes this web
     *
     */
    Web.prototype.delete = function () {
        return _super.prototype.deleteCore.call(this);
    };
    /**
     * Applies the theme specified by the contents of each of the files specified in the arguments to the site
     *
     * @param colorPaletteUrl The server-relative URL of the color palette file
     * @param fontSchemeUrl The server-relative URL of the font scheme
     * @param backgroundImageUrl The server-relative URL of the background image
     * @param shareGenerated When true, the generated theme files are stored in the root site. When false, they are stored in this web
     */
    Web.prototype.applyTheme = function (colorPaletteUrl, fontSchemeUrl, backgroundImageUrl, shareGenerated) {
        var postBody = JSON.stringify({
            backgroundImageUrl: backgroundImageUrl,
            colorPaletteUrl: colorPaletteUrl,
            fontSchemeUrl: fontSchemeUrl,
            shareGenerated: shareGenerated,
        });
        return this.clone(Web, "applytheme").postCore({ body: postBody });
    };
    /**
     * Applies the specified site definition or site template to the Web site that has no template applied to it
     *
     * @param template Name of the site definition or the name of the site template
     */
    Web.prototype.applyWebTemplate = function (template) {
        var q = this.clone(Web, "applywebtemplate");
        q.concat("(@t)");
        q.query.add("@t", template);
        return q.postCore();
    };
    /**
     * Checks whether the specified login name belongs to a valid user in the web. If the user doesn't exist, adds the user to the web.
     *
     * @param loginName The login name of the user (ex: i:0#.f|membership|user@domain.onmicrosoft.com)
     */
    Web.prototype.ensureUser = function (loginName) {
        var postBody = JSON.stringify({
            logonName: loginName,
        });
        return this.clone(Web, "ensureuser").postCore({ body: postBody }).then(function (data) {
            return {
                data: data,
                user: new siteusers_1.SiteUser(odata_1.spExtractODataId(data)),
            };
        });
    };
    /**
     * Returns a collection of site templates available for the site
     *
     * @param language The locale id of the site templates to retrieve (default = 1033 [English, US])
     * @param includeCrossLanguage When true, includes language-neutral site templates; otherwise false (default = true)
     */
    Web.prototype.availableWebTemplates = function (language, includeCrossLanugage) {
        if (language === void 0) { language = 1033; }
        if (includeCrossLanugage === void 0) { includeCrossLanugage = true; }
        return new sharepointqueryable_1.SharePointQueryableCollection(this, "getavailablewebtemplates(lcid=" + language + ", doincludecrosslanguage=" + includeCrossLanugage + ")");
    };
    /**
     * Returns the list gallery on the site
     *
     * @param type The gallery type - WebTemplateCatalog = 111, WebPartCatalog = 113 ListTemplateCatalog = 114,
     * MasterPageCatalog = 116, SolutionCatalog = 121, ThemeCatalog = 123, DesignCatalog = 124, AppDataCatalog = 125
     */
    Web.prototype.getCatalog = function (type) {
        return this.clone(Web, "getcatalog(" + type + ")").select("Id").get().then(function (data) {
            return new lists_2.List(odata_1.spExtractODataId(data));
        });
    };
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query
     *
     * @param query The change query
     */
    Web.prototype.getChanges = function (query) {
        var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeQuery" } }, query) });
        return this.clone(Web, "getchanges").postCore({ body: postBody });
    };
    Object.defineProperty(Web.prototype, "customListTemplate", {
        /**
         * Gets the custom list templates for the site
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryableCollection(this, "getcustomlisttemplates");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the user corresponding to the specified member identifier for the current site
     *
     * @param id The id of the user
     */
    Web.prototype.getUserById = function (id) {
        return new siteusers_1.SiteUser(this, "getUserById(" + id + ")");
    };
    /**
     * Returns the name of the image file for the icon that is used to represent the specified file
     *
     * @param filename The file name. If this parameter is empty, the server returns an empty string
     * @param size The size of the icon: 16x16 pixels = 0, 32x32 pixels = 1 (default = 0)
     * @param progId The ProgID of the application that was used to create the file, in the form OLEServerName.ObjectName
     */
    Web.prototype.mapToIcon = function (filename, size, progId) {
        if (size === void 0) { size = 0; }
        if (progId === void 0) { progId = ""; }
        return this.clone(Web, "maptoicon(filename='" + filename + "', progid='" + progId + "', size=" + size + ")").get();
    };
    /**
     * Returns the tenant property corresponding to the specified key in the app catalog site
     *
     * @param key
     */
    Web.prototype.getStorageEntity = function (key) {
        return this.clone(Web, "getStorageEntity('" + key + "')").get();
    };
    /**
     * Gets the app catalog for this web
     *
     * @param url Optional url or web containing the app catalog (default: current web)
     */
    Web.prototype.getAppCatalog = function (url) {
        return new appcatalog_1.AppCatalog(url || this);
    };
    return Web;
}(sharepointqueryableshareable_1.SharePointQueryableShareableWeb));
exports.Web = Web;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var collections_1 = __webpack_require__(8);
var pnplibconfig_1 = __webpack_require__(3);
var logging_1 = __webpack_require__(4);
/**
 * A wrapper class to provide a consistent interface to browser based storage
 *
 */
var PnPClientStorageWrapper = /** @class */ (function () {
    /**
     * Creates a new instance of the PnPClientStorageWrapper class
     *
     * @constructor
     */
    function PnPClientStorageWrapper(store, defaultTimeoutMinutes) {
        this.store = store;
        this.defaultTimeoutMinutes = defaultTimeoutMinutes;
        this.defaultTimeoutMinutes = (defaultTimeoutMinutes === void 0) ? -1 : defaultTimeoutMinutes;
        this.enabled = this.test();
        // if the cache timeout is enabled call the handler
        // this will clear any expired items and set the timeout function
        if (pnplibconfig_1.RuntimeConfig.enableCacheExpiration) {
            logging_1.Logger.write("Enabling cache expiration.", logging_1.LogLevel.Info);
            this.cacheExpirationHandler();
        }
    }
    /**
     * Get a value from storage, or null if that value does not exist
     *
     * @param key The key whose value we want to retrieve
     */
    PnPClientStorageWrapper.prototype.get = function (key) {
        if (!this.enabled) {
            return null;
        }
        var o = this.store.getItem(key);
        if (o == null) {
            return null;
        }
        var persistable = JSON.parse(o);
        if (new Date(persistable.expiration) <= new Date()) {
            logging_1.Logger.write("Removing item with key '" + key + "' from cache due to expiration.", logging_1.LogLevel.Info);
            this.delete(key);
            return null;
        }
        else {
            return persistable.value;
        }
    };
    /**
     * Adds a value to the underlying storage
     *
     * @param key The key to use when storing the provided value
     * @param o The value to store
     * @param expire Optional, if provided the expiration of the item, otherwise the default is used
     */
    PnPClientStorageWrapper.prototype.put = function (key, o, expire) {
        if (this.enabled) {
            this.store.setItem(key, this.createPersistable(o, expire));
        }
    };
    /**
     * Deletes a value from the underlying storage
     *
     * @param key The key of the pair we want to remove from storage
     */
    PnPClientStorageWrapper.prototype.delete = function (key) {
        if (this.enabled) {
            this.store.removeItem(key);
        }
    };
    /**
     * Gets an item from the underlying storage, or adds it if it does not exist using the supplied getter function
     *
     * @param key The key to use when storing the provided value
     * @param getter A function which will upon execution provide the desired value
     * @param expire Optional, if provided the expiration of the item, otherwise the default is used
     */
    PnPClientStorageWrapper.prototype.getOrPut = function (key, getter, expire) {
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
            }
            else {
                resolve(o);
            }
        });
    };
    /**
     * Deletes any expired items placed in the store by the pnp library, leaves other items untouched
     */
    PnPClientStorageWrapper.prototype.deleteExpired = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.enabled) {
                resolve();
            }
            try {
                for (var i = 0; i < _this.store.length; i++) {
                    var key = _this.store.key(i);
                    // test the stored item to see if we stored it
                    if (/["|']?pnp["|']? ?: ?1/i.test(_this.store.getItem(key))) {
                        // get those items as get will delete from cache if they are expired
                        _this.get(key);
                    }
                }
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    };
    /**
     * Used to determine if the wrapped storage is available currently
     */
    PnPClientStorageWrapper.prototype.test = function () {
        var str = "test";
        try {
            this.store.setItem(str, str);
            this.store.removeItem(str);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    /**
     * Creates the persistable to store
     */
    PnPClientStorageWrapper.prototype.createPersistable = function (o, expire) {
        if (typeof expire === "undefined") {
            // ensure we are by default inline with the global library setting
            var defaultTimeout = pnplibconfig_1.RuntimeConfig.defaultCachingTimeoutSeconds;
            if (this.defaultTimeoutMinutes > 0) {
                defaultTimeout = this.defaultTimeoutMinutes * 60;
            }
            expire = util_1.Util.dateAdd(new Date(), "second", defaultTimeout);
        }
        return JSON.stringify({ pnp: 1, expiration: expire, value: o });
    };
    /**
     * Deletes expired items added by this library in this.store and sets a timeout to call itself
     */
    PnPClientStorageWrapper.prototype.cacheExpirationHandler = function () {
        var _this = this;
        logging_1.Logger.write("Called cache expiration handler.", logging_1.LogLevel.Verbose);
        this.deleteExpired().then(function (_) {
            // call ourself in the future
            setTimeout(util_1.Util.getCtxCallback(_this, _this.cacheExpirationHandler), pnplibconfig_1.RuntimeConfig.cacheExpirationIntervalMilliseconds);
        }).catch(function (e) {
            // we've got some error - so just stop the loop and report the error
            logging_1.Logger.log({
                data: e,
                level: logging_1.LogLevel.Error,
                message: "Error deleting expired cache entries, see data for details. Timeout not reset.",
            });
        });
    };
    return PnPClientStorageWrapper;
}());
exports.PnPClientStorageWrapper = PnPClientStorageWrapper;
/**
 * A thin implementation of in-memory storage for use in nodejs
 */
var MemoryStorage = /** @class */ (function () {
    function MemoryStorage(_store) {
        if (_store === void 0) { _store = new collections_1.Dictionary(); }
        this._store = _store;
    }
    Object.defineProperty(MemoryStorage.prototype, "length", {
        get: function () {
            return this._store.count();
        },
        enumerable: true,
        configurable: true
    });
    MemoryStorage.prototype.clear = function () {
        this._store.clear();
    };
    MemoryStorage.prototype.getItem = function (key) {
        return this._store.get(key);
    };
    MemoryStorage.prototype.key = function (index) {
        return this._store.getKeys()[index];
    };
    MemoryStorage.prototype.removeItem = function (key) {
        this._store.remove(key);
    };
    MemoryStorage.prototype.setItem = function (key, data) {
        this._store.add(key, data);
    };
    return MemoryStorage;
}());
/**
 * A class that will establish wrappers for both local and session storage
 */
var PnPClientStorage = /** @class */ (function () {
    /**
     * Creates a new instance of the PnPClientStorage class
     *
     * @constructor
     */
    function PnPClientStorage(_local, _session) {
        if (_local === void 0) { _local = null; }
        if (_session === void 0) { _session = null; }
        this._local = _local;
        this._session = _session;
    }
    Object.defineProperty(PnPClientStorage.prototype, "local", {
        /**
         * Provides access to the local storage of the browser
         */
        get: function () {
            if (this._local === null) {
                this._local = typeof localStorage !== "undefined" ? new PnPClientStorageWrapper(localStorage) : new PnPClientStorageWrapper(new MemoryStorage());
            }
            return this._local;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PnPClientStorage.prototype, "session", {
        /**
         * Provides access to the session storage of the browser
         */
        get: function () {
            if (this._session === null) {
                this._session = typeof sessionStorage !== "undefined" ? new PnPClientStorageWrapper(sessionStorage) : new PnPClientStorageWrapper(new MemoryStorage());
            }
            return this._session;
        },
        enumerable: true,
        configurable: true
    });
    return PnPClientStorage;
}());
exports.PnPClientStorage = PnPClientStorage;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var exceptions_1 = __webpack_require__(2);
var logging_1 = __webpack_require__(4);
var ODataParserBase = /** @class */ (function () {
    function ODataParserBase() {
    }
    ODataParserBase.prototype.parse = function (r) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.handleError(r, reject)) {
                if ((r.headers.has("Content-Length") && parseFloat(r.headers.get("Content-Length")) === 0) || r.status === 204) {
                    resolve({});
                }
                else {
                    // patch to handle cases of 200 response with no or whitespace only bodies (#487 & #545)
                    r.text()
                        .then(function (txt) { return txt.replace(/\s/ig, "").length > 0 ? JSON.parse(txt) : {}; })
                        .then(function (json) { return resolve(_this.parseODataJSON(json)); })
                        .catch(function (e) { return reject(e); });
                }
            }
        });
    };
    ODataParserBase.prototype.handleError = function (r, reject) {
        if (!r.ok) {
            r.json().then(function (json) {
                // include the headers as they contain diagnostic information
                var data = {
                    responseBody: json,
                    responseHeaders: r.headers,
                };
                reject(new exceptions_1.ProcessHttpClientResponseException(r.status, r.statusText, data));
            }).catch(function (e) {
                // we failed to read the body - possibly it is empty. Let's report the original status that caused
                // the request to fail and log the error with parsing the body if anyone needs it for debugging
                logging_1.Logger.log({
                    data: e,
                    level: logging_1.LogLevel.Warning,
                    message: "There was an error parsing the error response body. See data for details.",
                });
                // include the headers as they contain diagnostic information
                var data = {
                    responseBody: "[[body not available]]",
                    responseHeaders: r.headers,
                };
                reject(new exceptions_1.ProcessHttpClientResponseException(r.status, r.statusText, data));
            });
        }
        return r.ok;
    };
    ODataParserBase.prototype.parseODataJSON = function (json) {
        var result = json;
        if (json.hasOwnProperty("d")) {
            if (json.d.hasOwnProperty("results")) {
                result = json.d.results;
            }
            else {
                result = json.d;
            }
        }
        else if (json.hasOwnProperty("value")) {
            result = json.value;
        }
        return result;
    };
    return ODataParserBase;
}());
exports.ODataParserBase = ODataParserBase;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var items_1 = __webpack_require__(15);
var views_1 = __webpack_require__(48);
var contenttypes_1 = __webpack_require__(24);
var fields_1 = __webpack_require__(35);
var forms_1 = __webpack_require__(49);
var subscriptions_1 = __webpack_require__(50);
var sharepointqueryable_1 = __webpack_require__(1);
var sharepointqueryablesecurable_1 = __webpack_require__(32);
var util_1 = __webpack_require__(0);
var usercustomactions_1 = __webpack_require__(25);
var odata_1 = __webpack_require__(5);
var exceptions_1 = __webpack_require__(2);
var folders_1 = __webpack_require__(18);
/**
 * Describes a collection of List objects
 *
 */
var Lists = /** @class */ (function (_super) {
    __extends(Lists, _super);
    /**
     * Creates a new instance of the Lists class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    function Lists(baseUrl, path) {
        if (path === void 0) { path = "lists"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a list from the collection by title
     *
     * @param title The title of the list
     */
    Lists.prototype.getByTitle = function (title) {
        return new List(this, "getByTitle('" + title + "')");
    };
    /**
     * Gets a list from the collection by guid id
     *
     * @param id The Id of the list (GUID)
     */
    Lists.prototype.getById = function (id) {
        var list = new List(this);
        list.concat("('" + id + "')");
        return list;
    };
    /**
     * Adds a new list to the collection
     *
     * @param title The new list's title
     * @param description The new list's description
     * @param template The list template value
     * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
     * @param additionalSettings Will be passed as part of the list creation body
     */
    Lists.prototype.add = function (title, description, template, enableContentTypes, additionalSettings) {
        var _this = this;
        if (description === void 0) { description = ""; }
        if (template === void 0) { template = 100; }
        if (enableContentTypes === void 0) { enableContentTypes = false; }
        if (additionalSettings === void 0) { additionalSettings = {}; }
        var addSettings = util_1.Util.extend({
            "AllowContentTypes": enableContentTypes,
            "BaseTemplate": template,
            "ContentTypesEnabled": enableContentTypes,
            "Description": description,
            "Title": title,
            "__metadata": { "type": "SP.List" },
        }, additionalSettings);
        return this.postCore({ body: JSON.stringify(addSettings) }).then(function (data) {
            return { data: data, list: _this.getByTitle(addSettings.Title) };
        });
    };
    /**
     * Ensures that the specified list exists in the collection (note: this method not supported for batching)
     *
     * @param title The new list's title
     * @param description The new list's description
     * @param template The list template value
     * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
     * @param additionalSettings Will be passed as part of the list creation body or used to update an existing list
     */
    Lists.prototype.ensure = function (title, description, template, enableContentTypes, additionalSettings) {
        var _this = this;
        if (description === void 0) { description = ""; }
        if (template === void 0) { template = 100; }
        if (enableContentTypes === void 0) { enableContentTypes = false; }
        if (additionalSettings === void 0) { additionalSettings = {}; }
        if (this.hasBatch) {
            throw new exceptions_1.NotSupportedInBatchException("The ensure list method");
        }
        return new Promise(function (resolve, reject) {
            var addOrUpdateSettings = util_1.Util.extend(additionalSettings, { Title: title, Description: description, ContentTypesEnabled: enableContentTypes }, true);
            var list = _this.getByTitle(addOrUpdateSettings.Title);
            list.get().then(function (_) {
                list.update(addOrUpdateSettings).then(function (d) {
                    resolve({ created: false, data: d, list: _this.getByTitle(addOrUpdateSettings.Title) });
                }).catch(function (e) { return reject(e); });
            }).catch(function (_) {
                _this.add(title, description, template, enableContentTypes, addOrUpdateSettings).then(function (r) {
                    resolve({ created: true, data: r.data, list: _this.getByTitle(addOrUpdateSettings.Title) });
                }).catch(function (e) { return reject(e); });
            });
        });
    };
    /**
     * Gets a list that is the default asset location for images or other files, which the users upload to their wiki pages.
     */
    Lists.prototype.ensureSiteAssetsLibrary = function () {
        return this.clone(Lists, "ensuresiteassetslibrary").postCore().then(function (json) {
            return new List(odata_1.spExtractODataId(json));
        });
    };
    /**
     * Gets a list that is the default location for wiki pages.
     */
    Lists.prototype.ensureSitePagesLibrary = function () {
        return this.clone(Lists, "ensuresitepageslibrary").postCore().then(function (json) {
            return new List(odata_1.spExtractODataId(json));
        });
    };
    return Lists;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.Lists = Lists;
/**
 * Describes a single List instance
 *
 */
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(List.prototype, "contentTypes", {
        /**
         * Gets the content types in this list
         *
         */
        get: function () {
            return new contenttypes_1.ContentTypes(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "items", {
        /**
         * Gets the items in this list
         *
         */
        get: function () {
            return new items_1.Items(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "views", {
        /**
         * Gets the views in this list
         *
         */
        get: function () {
            return new views_1.Views(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "fields", {
        /**
         * Gets the fields in this list
         *
         */
        get: function () {
            return new fields_1.Fields(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "forms", {
        /**
         * Gets the forms in this list
         *
         */
        get: function () {
            return new forms_1.Forms(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "defaultView", {
        /**
         * Gets the default view of this list
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryableInstance(this, "DefaultView");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "userCustomActions", {
        /**
         * Get all custom actions on a site collection
         *
         */
        get: function () {
            return new usercustomactions_1.UserCustomActions(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "effectiveBasePermissions", {
        /**
         * Gets the effective base permissions of this list
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryable(this, "EffectiveBasePermissions");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "eventReceivers", {
        /**
         * Gets the event receivers attached to this list
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryableCollection(this, "EventReceivers");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "relatedFields", {
        /**
         * Gets the related fields of this list
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryable(this, "getRelatedFields");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "informationRightsManagementSettings", {
        /**
         * Gets the IRM settings for this list
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryable(this, "InformationRightsManagementSettings");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "subscriptions", {
        /**
         * Gets the webhook subscriptions of this list
         *
         */
        get: function () {
            return new subscriptions_1.Subscriptions(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "rootFolder", {
        /**
         * The root folder of the list
         */
        get: function () {
            return new folders_1.Folder(this, "rootFolder");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets a view by view guid id
     *
     */
    List.prototype.getView = function (viewId) {
        return new views_1.View(this, "getView('" + viewId + "')");
    };
    /**
     * Updates this list intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    /* tslint:disable no-string-literal */
    List.prototype.update = function (properties, eTag) {
        var _this = this;
        if (eTag === void 0) { eTag = "*"; }
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": "SP.List" },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            var retList = _this;
            if (properties.hasOwnProperty("Title")) {
                retList = _this.getParent(List, _this.parentUrl, "getByTitle('" + properties["Title"] + "')");
            }
            return {
                data: data,
                list: retList,
            };
        });
    };
    /* tslint:enable */
    /**
     * Delete this list
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    List.prototype.delete = function (eTag) {
        if (eTag === void 0) { eTag = "*"; }
        return this.postCore({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query.
     */
    List.prototype.getChanges = function (query) {
        return this.clone(List, "getchanges").postCore({
            body: JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeQuery" } }, query) }),
        });
    };
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
    List.prototype.getItemsByCAMLQuery = function (query) {
        var expands = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            expands[_i - 1] = arguments[_i];
        }
        var q = this.clone(List, "getitems");
        return q.expand.apply(q, expands).postCore({
            body: JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.CamlQuery" } }, query) }),
        });
    };
    /**
     * See: https://msdn.microsoft.com/en-us/library/office/dn292554.aspx
     */
    List.prototype.getListItemChangesSinceToken = function (query) {
        return this.clone(List, "getlistitemchangessincetoken").postCore({
            body: JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeLogItemQuery" } }, query) }),
        }, { parse: function (r) { return r.text(); } });
    };
    /**
     * Moves the list to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    List.prototype.recycle = function () {
        return this.clone(List, "recycle").postCore().then(function (data) {
            if (data.hasOwnProperty("Recycle")) {
                return data.Recycle;
            }
            else {
                return data;
            }
        });
    };
    /**
     * Renders list data based on the view xml provided
     */
    List.prototype.renderListData = function (viewXml) {
        var q = this.clone(List, "renderlistdata(@viewXml)");
        q.query.add("@viewXml", "'" + viewXml + "'");
        return q.postCore().then(function (data) {
            // data will be a string, so we parse it again
            data = JSON.parse(data);
            if (data.hasOwnProperty("RenderListData")) {
                return data.RenderListData;
            }
            else {
                return data;
            }
        });
    };
    /**
     * Returns the data for the specified query view
     *
     * @param parameters The parameters to be used to render list data as JSON string.
     * @param overrideParameters The parameters that are used to override and extend the regular SPRenderListDataParameters.
     */
    List.prototype.renderListDataAsStream = function (parameters, overrideParameters) {
        if (overrideParameters === void 0) { overrideParameters = null; }
        var postBody = {
            overrideParameters: util_1.Util.extend({
                "__metadata": { "type": "SP.RenderListDataOverrideParameters" },
            }, overrideParameters),
            parameters: util_1.Util.extend({
                "__metadata": { "type": "SP.RenderListDataParameters" },
            }, parameters),
        };
        return this.clone(List, "RenderListDataAsStream", true).postCore({
            body: JSON.stringify(postBody),
        });
    };
    /**
     * Gets the field values and field schema attributes for a list item.
     */
    List.prototype.renderListFormData = function (itemId, formId, mode) {
        return this.clone(List, "renderlistformdata(itemid=" + itemId + ", formid='" + formId + "', mode='" + mode + "')").postCore().then(function (data) {
            // data will be a string, so we parse it again
            data = JSON.parse(data);
            if (data.hasOwnProperty("ListData")) {
                return data.ListData;
            }
            else {
                return data;
            }
        });
    };
    /**
     * Reserves a list item ID for idempotent list item creation.
     */
    List.prototype.reserveListItemId = function () {
        return this.clone(List, "reservelistitemid").postCore().then(function (data) {
            if (data.hasOwnProperty("ReserveListItemId")) {
                return data.ReserveListItemId;
            }
            else {
                return data;
            }
        });
    };
    /**
     * Returns the ListItemEntityTypeFullName for this list, used when adding/updating list items. Does not support batching.
     *
     */
    List.prototype.getListItemEntityTypeFullName = function () {
        return this.clone(List, null, false).select("ListItemEntityTypeFullName").getAs().then(function (o) { return o.ListItemEntityTypeFullName; });
    };
    return List;
}(sharepointqueryablesecurable_1.SharePointQueryableSecurable));
exports.List = List;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var sharepointqueryableshareable_1 = __webpack_require__(16);
var folders_1 = __webpack_require__(18);
var files_1 = __webpack_require__(9);
var contenttypes_1 = __webpack_require__(24);
var util_1 = __webpack_require__(0);
var core_1 = __webpack_require__(13);
var attachmentfiles_1 = __webpack_require__(47);
var lists_1 = __webpack_require__(14);
/**
 * Describes a collection of Item objects
 *
 */
var Items = /** @class */ (function (_super) {
    __extends(Items, _super);
    /**
     * Creates a new instance of the Items class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    function Items(baseUrl, path) {
        if (path === void 0) { path = "items"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets an Item by id
     *
     * @param id The integer id of the item to retrieve
     */
    Items.prototype.getById = function (id) {
        var i = new Item(this);
        i.concat("(" + id + ")");
        return i;
    };
    /**
     * Gets BCS Item by string id
     *
     * @param stringId The string id of the BCS item to retrieve
     */
    Items.prototype.getItemByStringId = function (stringId) {
        var i = new Item(this);
        i.concat("/../getItemByStringId('" + stringId + "')");
        return i;
    };
    /**
     * Skips the specified number of items (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#sectionSection6)
     *
     * @param skip The starting id where the page should start, use with top to specify pages
     */
    Items.prototype.skip = function (skip) {
        this._query.add("$skiptoken", encodeURIComponent("Paged=TRUE&p_ID=" + skip));
        return this;
    };
    /**
     * Gets a collection designed to aid in paging through data
     *
     */
    Items.prototype.getPaged = function () {
        return this.getAs(new PagedItemCollectionParser());
    };
    //
    /**
     * Adds a new item to the collection
     *
     * @param properties The new items's properties
     */
    Items.prototype.add = function (properties, listItemEntityTypeFullName) {
        var _this = this;
        if (properties === void 0) { properties = {}; }
        if (listItemEntityTypeFullName === void 0) { listItemEntityTypeFullName = null; }
        var removeDependency = this.addBatchDependency();
        return this.ensureListItemEntityTypeName(listItemEntityTypeFullName).then(function (listItemEntityType) {
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": listItemEntityType },
            }, properties));
            var promise = _this.clone(Items, null).postAsCore({ body: postBody }).then(function (data) {
                return {
                    data: data,
                    item: _this.getById(data.Id),
                };
            });
            removeDependency();
            return promise;
        });
    };
    /**
     * Ensures we have the proper list item entity type name, either from the value provided or from the list
     *
     * @param candidatelistItemEntityTypeFullName The potential type name
     */
    Items.prototype.ensureListItemEntityTypeName = function (candidatelistItemEntityTypeFullName) {
        return candidatelistItemEntityTypeFullName ?
            Promise.resolve(candidatelistItemEntityTypeFullName) :
            this.getParent(lists_1.List).getListItemEntityTypeFullName();
    };
    return Items;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.Items = Items;
/**
 * Descrines a single Item instance
 *
 */
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Item.prototype, "attachmentFiles", {
        /**
         * Gets the set of attachments for this item
         *
         */
        get: function () {
            return new attachmentfiles_1.AttachmentFiles(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "contentType", {
        /**
         * Gets the content type for this item
         *
         */
        get: function () {
            return new contenttypes_1.ContentType(this, "ContentType");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "effectiveBasePermissions", {
        /**
         * Gets the effective base permissions for the item
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryable(this, "EffectiveBasePermissions");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "effectiveBasePermissionsForUI", {
        /**
         * Gets the effective base permissions for the item in a UI context
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryable(this, "EffectiveBasePermissionsForUI");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "fieldValuesAsHTML", {
        /**
         * Gets the field values for this list item in their HTML representation
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryableInstance(this, "FieldValuesAsHTML");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "fieldValuesAsText", {
        /**
         * Gets the field values for this list item in their text representation
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryableInstance(this, "FieldValuesAsText");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "fieldValuesForEdit", {
        /**
         * Gets the field values for this list item for use in editing controls
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryableInstance(this, "FieldValuesForEdit");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "folder", {
        /**
         * Gets the folder associated with this list item (if this item represents a folder)
         *
         */
        get: function () {
            return new folders_1.Folder(this, "folder");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "file", {
        /**
         * Gets the folder associated with this list item (if this item represents a folder)
         *
         */
        get: function () {
            return new files_1.File(this, "file");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates this list intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    Item.prototype.update = function (properties, eTag, listItemEntityTypeFullName) {
        var _this = this;
        if (eTag === void 0) { eTag = "*"; }
        if (listItemEntityTypeFullName === void 0) { listItemEntityTypeFullName = null; }
        return new Promise(function (resolve, reject) {
            var removeDependency = _this.addBatchDependency();
            return _this.ensureListItemEntityTypeName(listItemEntityTypeFullName).then(function (listItemEntityType) {
                var postBody = JSON.stringify(util_1.Util.extend({
                    "__metadata": { "type": listItemEntityType },
                }, properties));
                removeDependency();
                return _this.postCore({
                    body: postBody,
                    headers: {
                        "IF-Match": eTag,
                        "X-HTTP-Method": "MERGE",
                    },
                }, new ItemUpdatedParser()).then(function (data) {
                    resolve({
                        data: data,
                        item: _this,
                    });
                });
            }).catch(function (e) { return reject(e); });
        });
    };
    /**
     * Delete this item
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    Item.prototype.delete = function (eTag) {
        if (eTag === void 0) { eTag = "*"; }
        return this.postCore({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    /**
     * Moves the list item to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    Item.prototype.recycle = function () {
        return this.clone(Item, "recycle").postCore();
    };
    /**
     * Gets a string representation of the full URL to the WOPI frame.
     * If there is no associated WOPI application, or no associated action, an empty string is returned.
     *
     * @param action Display mode: 0: view, 1: edit, 2: mobileView, 3: interactivePreview
     */
    Item.prototype.getWopiFrameUrl = function (action) {
        if (action === void 0) { action = 0; }
        var i = this.clone(Item, "getWOPIFrameUrl(@action)");
        i._query.add("@action", action);
        return i.postCore().then(function (data) {
            // handle verbose mode
            if (data.hasOwnProperty("GetWOPIFrameUrl")) {
                return data.GetWOPIFrameUrl;
            }
            return data;
        });
    };
    /**
     * Validates and sets the values of the specified collection of fields for the list item.
     *
     * @param formValues The fields to change and their new values.
     * @param newDocumentUpdate true if the list item is a document being updated after upload; otherwise false.
     */
    Item.prototype.validateUpdateListItem = function (formValues, newDocumentUpdate) {
        if (newDocumentUpdate === void 0) { newDocumentUpdate = false; }
        return this.clone(Item, "validateupdatelistitem").postCore({
            body: JSON.stringify({ "formValues": formValues, bNewDocumentUpdate: newDocumentUpdate }),
        });
    };
    /**
     * Ensures we have the proper list item entity type name, either from the value provided or from the list
     *
     * @param candidatelistItemEntityTypeFullName The potential type name
     */
    Item.prototype.ensureListItemEntityTypeName = function (candidatelistItemEntityTypeFullName) {
        return candidatelistItemEntityTypeFullName ?
            Promise.resolve(candidatelistItemEntityTypeFullName) :
            this.getParent(lists_1.List, this.parentUrl.substr(0, this.parentUrl.lastIndexOf("/"))).getListItemEntityTypeFullName();
    };
    return Item;
}(sharepointqueryableshareable_1.SharePointQueryableShareableItem));
exports.Item = Item;
/**
 * Provides paging functionality for list items
 */
var PagedItemCollection = /** @class */ (function () {
    function PagedItemCollection(nextUrl, results) {
        this.nextUrl = nextUrl;
        this.results = results;
    }
    Object.defineProperty(PagedItemCollection.prototype, "hasNext", {
        /**
         * If true there are more results available in the set, otherwise there are not
         */
        get: function () {
            return typeof this.nextUrl === "string" && this.nextUrl.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the next set of results, or resolves to null if no results are available
     */
    PagedItemCollection.prototype.getNext = function () {
        if (this.hasNext) {
            var items = new Items(this.nextUrl, null);
            return items.getPaged();
        }
        return new Promise(function (r) { return r(null); });
    };
    return PagedItemCollection;
}());
exports.PagedItemCollection = PagedItemCollection;
var PagedItemCollectionParser = /** @class */ (function (_super) {
    __extends(PagedItemCollectionParser, _super);
    function PagedItemCollectionParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PagedItemCollectionParser.prototype.parse = function (r) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.handleError(r, reject)) {
                r.json().then(function (json) {
                    var nextUrl = json.hasOwnProperty("d") && json.d.hasOwnProperty("__next") ? json.d.__next : json["odata.nextLink"];
                    resolve(new PagedItemCollection(nextUrl, _this.parseODataJSON(json)));
                });
            }
        });
    };
    return PagedItemCollectionParser;
}(core_1.ODataParserBase));
var ItemUpdatedParser = /** @class */ (function (_super) {
    __extends(ItemUpdatedParser, _super);
    function ItemUpdatedParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemUpdatedParser.prototype.parse = function (r) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.handleError(r, reject)) {
                resolve({
                    "odata.etag": r.headers.get("etag"),
                });
            }
        });
    };
    return ItemUpdatedParser;
}(core_1.ODataParserBase));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var webs_1 = __webpack_require__(11);
var odata_1 = __webpack_require__(5);
var sharepointqueryable_1 = __webpack_require__(1);
var sharepointqueryablesecurable_1 = __webpack_require__(32);
var types_1 = __webpack_require__(17);
/**
 * Internal helper class used to augment classes to include sharing functionality
 */
var SharePointQueryableShareable = /** @class */ (function (_super) {
    __extends(SharePointQueryableShareable, _super);
    function SharePointQueryableShareable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a sharing link for the supplied
     *
     * @param kind The kind of link to share
     * @param expiration The optional expiration for this link
     */
    SharePointQueryableShareable.prototype.getShareLink = function (kind, expiration) {
        if (expiration === void 0) { expiration = null; }
        // date needs to be an ISO string or null
        var expString = expiration !== null ? expiration.toISOString() : null;
        // clone using the factory and send the request
        return this.clone(SharePointQueryableShareable, "shareLink").postAsCore({
            body: JSON.stringify({
                request: {
                    createLink: true,
                    emailData: null,
                    settings: {
                        expiration: expString,
                        linkKind: kind,
                    },
                },
            }),
        });
    };
    /**
     * Shares this instance with the supplied users
     *
     * @param loginNames Resolved login names to share
     * @param role The role
     * @param requireSignin True to require the user is authenticated, otherwise false
     * @param propagateAcl True to apply this share to all children
     * @param emailData If supplied an email will be sent with the indicated properties
     */
    SharePointQueryableShareable.prototype.shareWith = function (loginNames, role, requireSignin, propagateAcl, emailData) {
        var _this = this;
        if (requireSignin === void 0) { requireSignin = false; }
        if (propagateAcl === void 0) { propagateAcl = false; }
        // handle the multiple input types
        if (!Array.isArray(loginNames)) {
            loginNames = [loginNames];
        }
        var userStr = JSON.stringify(loginNames.map(function (login) { return { Key: login }; }));
        var roleFilter = role === types_1.SharingRole.Edit ? types_1.RoleType.Contributor : types_1.RoleType.Reader;
        // start by looking up the role definition id we need to set the roleValue
        return webs_1.Web.fromUrl(this.toUrl()).roleDefinitions.select("Id").filter("RoleTypeKind eq " + roleFilter).get().then(function (def) {
            if (!Array.isArray(def) || def.length < 1) {
                throw new Error("Could not locate a role defintion with RoleTypeKind " + roleFilter);
            }
            var postBody = {
                includeAnonymousLinkInEmail: requireSignin,
                peoplePickerInput: userStr,
                propagateAcl: propagateAcl,
                roleValue: "role:" + def[0].Id,
                useSimplifiedRoles: true,
            };
            if (typeof emailData !== "undefined") {
                postBody = util_1.Util.extend(postBody, {
                    emailBody: emailData.body,
                    emailSubject: typeof emailData.subject !== "undefined" ? emailData.subject : "",
                    sendEmail: true,
                });
            }
            return _this.clone(SharePointQueryableShareable, "shareObject").postAsCore({
                body: JSON.stringify(postBody),
            });
        });
    };
    /**
     * Shares an object based on the supplied options
     *
     * @param options The set of options to send to the ShareObject method
     * @param bypass If true any processing is skipped and the options are sent directly to the ShareObject method
     */
    SharePointQueryableShareable.prototype.shareObject = function (options, bypass) {
        var _this = this;
        if (bypass === void 0) { bypass = false; }
        if (bypass) {
            // if the bypass flag is set send the supplied parameters directly to the service
            return this.sendShareObjectRequest(options);
        }
        // extend our options with some defaults
        options = util_1.Util.extend(options, {
            group: null,
            includeAnonymousLinkInEmail: false,
            propagateAcl: false,
            useSimplifiedRoles: true,
        }, true);
        return this.getRoleValue(options.role, options.group).then(function (roleValue) {
            // handle the multiple input types
            if (!Array.isArray(options.loginNames)) {
                options.loginNames = [options.loginNames];
            }
            var userStr = JSON.stringify(options.loginNames.map(function (login) { return { Key: login }; }));
            var postBody = {
                peoplePickerInput: userStr,
                roleValue: roleValue,
                url: options.url,
            };
            if (typeof options.emailData !== "undefined" && options.emailData !== null) {
                postBody = util_1.Util.extend(postBody, {
                    emailBody: options.emailData.body,
                    emailSubject: typeof options.emailData.subject !== "undefined" ? options.emailData.subject : "Shared with you.",
                    sendEmail: true,
                });
            }
            return _this.sendShareObjectRequest(postBody);
        });
    };
    /**
     * Calls the web's UnshareObject method
     *
     * @param url The url of the object to unshare
     */
    SharePointQueryableShareable.prototype.unshareObjectWeb = function (url) {
        return this.clone(SharePointQueryableShareable, "unshareObject").postAsCore({
            body: JSON.stringify({
                url: url,
            }),
        });
    };
    /**
     * Checks Permissions on the list of Users and returns back role the users have on the Item.
     *
     * @param recipients The array of Entities for which Permissions need to be checked.
     */
    SharePointQueryableShareable.prototype.checkPermissions = function (recipients) {
        return this.clone(SharePointQueryableShareable, "checkPermissions").postAsCore({
            body: JSON.stringify({
                recipients: recipients,
            }),
        });
    };
    /**
     * Get Sharing Information.
     *
     * @param request The SharingInformationRequest Object.
     */
    SharePointQueryableShareable.prototype.getSharingInformation = function (request) {
        if (request === void 0) { request = null; }
        return this.clone(SharePointQueryableShareable, "getSharingInformation").postAsCore({
            body: JSON.stringify({
                request: request,
            }),
        });
    };
    /**
     * Gets the sharing settings of an item.
     *
     * @param useSimplifiedRoles Determines whether to use simplified roles.
     */
    SharePointQueryableShareable.prototype.getObjectSharingSettings = function (useSimplifiedRoles) {
        if (useSimplifiedRoles === void 0) { useSimplifiedRoles = true; }
        return this.clone(SharePointQueryableShareable, "getObjectSharingSettings").postAsCore({
            body: JSON.stringify({
                useSimplifiedRoles: useSimplifiedRoles,
            }),
        });
    };
    /**
     * Unshares this object
     */
    SharePointQueryableShareable.prototype.unshareObject = function () {
        return this.clone(SharePointQueryableShareable, "unshareObject").postAsCore();
    };
    /**
     * Deletes a link by type
     *
     * @param kind Deletes a sharing link by the kind of link
     */
    SharePointQueryableShareable.prototype.deleteLinkByKind = function (kind) {
        return this.clone(SharePointQueryableShareable, "deleteLinkByKind").postCore({
            body: JSON.stringify({ linkKind: kind }),
        });
    };
    /**
     * Removes the specified link to the item.
     *
     * @param kind The kind of link to be deleted.
     * @param shareId
     */
    SharePointQueryableShareable.prototype.unshareLink = function (kind, shareId) {
        if (shareId === void 0) { shareId = "00000000-0000-0000-0000-000000000000"; }
        return this.clone(SharePointQueryableShareable, "unshareLink").postCore({
            body: JSON.stringify({ linkKind: kind, shareId: shareId }),
        });
    };
    /**
     * Calculates the roleValue string used in the sharing query
     *
     * @param role The Sharing Role
     * @param group The Group type
     */
    SharePointQueryableShareable.prototype.getRoleValue = function (role, group) {
        // we will give group precedence, because we had to make a choice
        if (typeof group !== "undefined" && group !== null) {
            switch (group) {
                case types_1.RoleType.Contributor:
                    return webs_1.Web.fromUrl(this.toUrl()).associatedMemberGroup.select("Id").getAs().then(function (g) { return "group: " + g.Id; });
                case types_1.RoleType.Reader:
                case types_1.RoleType.Guest:
                    return webs_1.Web.fromUrl(this.toUrl()).associatedVisitorGroup.select("Id").getAs().then(function (g) { return "group: " + g.Id; });
                default:
                    throw new Error("Could not determine role value for supplied value. Contributor, Reader, and Guest are supported");
            }
        }
        else {
            var roleFilter = role === types_1.SharingRole.Edit ? types_1.RoleType.Contributor : types_1.RoleType.Reader;
            return webs_1.Web.fromUrl(this.toUrl()).roleDefinitions.select("Id").top(1).filter("RoleTypeKind eq " + roleFilter).getAs().then(function (def) {
                if (def.length < 1) {
                    throw new Error("Could not locate associated role definition for supplied role. Edit and View are supported");
                }
                return "role: " + def[0].Id;
            });
        }
    };
    SharePointQueryableShareable.prototype.getShareObjectWeb = function (candidate) {
        return Promise.resolve(webs_1.Web.fromUrl(candidate, "/_api/SP.Web.ShareObject"));
    };
    SharePointQueryableShareable.prototype.sendShareObjectRequest = function (options) {
        return this.getShareObjectWeb(this.toUrl()).then(function (web) {
            return web.expand("UsersWithAccessRequests", "GroupsSharedWith").as(SharePointQueryableShareable).postCore({
                body: JSON.stringify(options),
            });
        });
    };
    return SharePointQueryableShareable;
}(sharepointqueryable_1.SharePointQueryable));
exports.SharePointQueryableShareable = SharePointQueryableShareable;
var SharePointQueryableShareableWeb = /** @class */ (function (_super) {
    __extends(SharePointQueryableShareableWeb, _super);
    function SharePointQueryableShareableWeb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Shares this web with the supplied users
     * @param loginNames The resolved login names to share
     * @param role The role to share this web
     * @param emailData Optional email data
     */
    SharePointQueryableShareableWeb.prototype.shareWith = function (loginNames, role, emailData) {
        var _this = this;
        if (role === void 0) { role = types_1.SharingRole.View; }
        var dependency = this.addBatchDependency();
        return webs_1.Web.fromUrl(this.toUrl(), "/_api/web/url").get().then(function (url) {
            dependency();
            return _this.shareObject(util_1.Util.combinePaths(url, "/_layouts/15/aclinv.aspx?forSharing=1&mbypass=1"), loginNames, role, emailData);
        });
    };
    /**
     * Provides direct access to the static web.ShareObject method
     *
     * @param url The url to share
     * @param loginNames Resolved loginnames string[] of a single login name string
     * @param roleValue Role value
     * @param emailData Optional email data
     * @param groupId Optional group id
     * @param propagateAcl
     * @param includeAnonymousLinkInEmail
     * @param useSimplifiedRoles
     */
    SharePointQueryableShareableWeb.prototype.shareObject = function (url, loginNames, role, emailData, group, propagateAcl, includeAnonymousLinkInEmail, useSimplifiedRoles) {
        if (propagateAcl === void 0) { propagateAcl = false; }
        if (includeAnonymousLinkInEmail === void 0) { includeAnonymousLinkInEmail = false; }
        if (useSimplifiedRoles === void 0) { useSimplifiedRoles = true; }
        return this.clone(SharePointQueryableShareable, null).shareObject({
            emailData: emailData,
            group: group,
            includeAnonymousLinkInEmail: includeAnonymousLinkInEmail,
            loginNames: loginNames,
            propagateAcl: propagateAcl,
            role: role,
            url: url,
            useSimplifiedRoles: useSimplifiedRoles,
        });
    };
    /**
     * Supplies a method to pass any set of arguments to ShareObject
     *
     * @param options The set of options to send to ShareObject
     */
    SharePointQueryableShareableWeb.prototype.shareObjectRaw = function (options) {
        return this.clone(SharePointQueryableShareable, null).shareObject(options, true);
    };
    /**
     * Unshares the object
     *
     * @param url The url of the object to stop sharing
     */
    SharePointQueryableShareableWeb.prototype.unshareObject = function (url) {
        return this.clone(SharePointQueryableShareable, null).unshareObjectWeb(url);
    };
    return SharePointQueryableShareableWeb;
}(sharepointqueryablesecurable_1.SharePointQueryableSecurable));
exports.SharePointQueryableShareableWeb = SharePointQueryableShareableWeb;
var SharePointQueryableShareableItem = /** @class */ (function (_super) {
    __extends(SharePointQueryableShareableItem, _super);
    function SharePointQueryableShareableItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a link suitable for sharing for this item
     *
     * @param kind The type of link to share
     * @param expiration The optional expiration date
     */
    SharePointQueryableShareableItem.prototype.getShareLink = function (kind, expiration) {
        if (kind === void 0) { kind = types_1.SharingLinkKind.OrganizationView; }
        if (expiration === void 0) { expiration = null; }
        return this.clone(SharePointQueryableShareable, null).getShareLink(kind, expiration);
    };
    /**
     * Shares this item with one or more users
     *
     * @param loginNames string or string[] of resolved login names to which this item will be shared
     * @param role The role (View | Edit) applied to the share
     * @param emailData Optional, if inlucded an email will be sent. Note subject currently has no effect.
     */
    SharePointQueryableShareableItem.prototype.shareWith = function (loginNames, role, requireSignin, emailData) {
        if (role === void 0) { role = types_1.SharingRole.View; }
        if (requireSignin === void 0) { requireSignin = false; }
        return this.clone(SharePointQueryableShareable, null).shareWith(loginNames, role, requireSignin, false, emailData);
    };
    /**
     * Checks Permissions on the list of Users and returns back role the users have on the Item.
     *
     * @param recipients The array of Entities for which Permissions need to be checked.
     */
    SharePointQueryableShareableItem.prototype.checkSharingPermissions = function (recipients) {
        return this.clone(SharePointQueryableShareable, null).checkPermissions(recipients);
    };
    /**
     * Get Sharing Information.
     *
     * @param request The SharingInformationRequest Object.
     */
    SharePointQueryableShareableItem.prototype.getSharingInformation = function (request) {
        if (request === void 0) { request = null; }
        return this.clone(SharePointQueryableShareable, null).getSharingInformation(request);
    };
    /**
     * Gets the sharing settings of an item.
     *
     * @param useSimplifiedRoles Determines whether to use simplified roles.
     */
    SharePointQueryableShareableItem.prototype.getObjectSharingSettings = function (useSimplifiedRoles) {
        if (useSimplifiedRoles === void 0) { useSimplifiedRoles = true; }
        return this.clone(SharePointQueryableShareable, null).getObjectSharingSettings(useSimplifiedRoles);
    };
    /**
     * Unshare this item
     */
    SharePointQueryableShareableItem.prototype.unshare = function () {
        return this.clone(SharePointQueryableShareable, null).unshareObject();
    };
    /**
     * Deletes a sharing link by kind
     *
     * @param kind Deletes a sharing link by the kind of link
     */
    SharePointQueryableShareableItem.prototype.deleteSharingLinkByKind = function (kind) {
        return this.clone(SharePointQueryableShareable, null).deleteLinkByKind(kind);
    };
    /**
     * Removes the specified link to the item.
     *
     * @param kind The kind of link to be deleted.
     * @param shareId
     */
    SharePointQueryableShareableItem.prototype.unshareLink = function (kind, shareId) {
        return this.clone(SharePointQueryableShareable, null).unshareLink(kind, shareId);
    };
    return SharePointQueryableShareableItem;
}(sharepointqueryablesecurable_1.SharePointQueryableSecurable));
exports.SharePointQueryableShareableItem = SharePointQueryableShareableItem;
var FileFolderShared = /** @class */ (function (_super) {
    __extends(FileFolderShared, _super);
    function FileFolderShared() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a link suitable for sharing
     *
     * @param kind The kind of link to get
     * @param expiration Optional, an expiration for this link
     */
    FileFolderShared.prototype.getShareLink = function (kind, expiration) {
        if (kind === void 0) { kind = types_1.SharingLinkKind.OrganizationView; }
        if (expiration === void 0) { expiration = null; }
        var dependency = this.addBatchDependency();
        return this.getShareable().then(function (shareable) {
            dependency();
            return shareable.getShareLink(kind, expiration);
        });
    };
    /**
         * Checks Permissions on the list of Users and returns back role the users have on the Item.
         *
         * @param recipients The array of Entities for which Permissions need to be checked.
         */
    FileFolderShared.prototype.checkSharingPermissions = function (recipients) {
        var dependency = this.addBatchDependency();
        return this.getShareable().then(function (shareable) {
            dependency();
            return shareable.checkPermissions(recipients);
        });
    };
    /**
     * Get Sharing Information.
     *
     * @param request The SharingInformationRequest Object.
     */
    FileFolderShared.prototype.getSharingInformation = function (request) {
        if (request === void 0) { request = null; }
        var dependency = this.addBatchDependency();
        return this.getShareable().then(function (shareable) {
            dependency();
            return shareable.getSharingInformation(request);
        });
    };
    /**
     * Gets the sharing settings of an item.
     *
     * @param useSimplifiedRoles Determines whether to use simplified roles.
     */
    FileFolderShared.prototype.getObjectSharingSettings = function (useSimplifiedRoles) {
        if (useSimplifiedRoles === void 0) { useSimplifiedRoles = true; }
        var dependency = this.addBatchDependency();
        return this.getShareable().then(function (shareable) {
            dependency();
            return shareable.getObjectSharingSettings(useSimplifiedRoles);
        });
    };
    /**
     * Unshare this item
     */
    FileFolderShared.prototype.unshare = function () {
        var dependency = this.addBatchDependency();
        return this.getShareable().then(function (shareable) {
            dependency();
            return shareable.unshareObject();
        });
    };
    /**
     * Deletes a sharing link by the kind of link
     *
     * @param kind The kind of link to be deleted.
     */
    FileFolderShared.prototype.deleteSharingLinkByKind = function (kind) {
        var dependency = this.addBatchDependency();
        return this.getShareable().then(function (shareable) {
            dependency();
            return shareable.deleteLinkByKind(kind);
        });
    };
    /**
     * Removes the specified link to the item.
     *
     * @param kind The kind of link to be deleted.
     * @param shareId The share id to delete
     */
    FileFolderShared.prototype.unshareLink = function (kind, shareId) {
        var dependency = this.addBatchDependency();
        return this.getShareable().then(function (shareable) {
            dependency();
            return shareable.unshareLink(kind, shareId);
        });
    };
    /**
     * For files and folders we need to use the associated item end point
     */
    FileFolderShared.prototype.getShareable = function () {
        var _this = this;
        // sharing only works on the item end point, not the file one - so we create a folder instance with the item url internally
        return this.clone(SharePointQueryableShareableFile, "listItemAllFields", false).select("odata.editlink").get().then(function (d) {
            var shareable = new SharePointQueryableShareable(odata_1.spGetEntityUrl(d));
            // we need to handle batching
            if (_this.hasBatch) {
                shareable = shareable.inBatch(_this.batch);
            }
            return shareable;
        });
    };
    return FileFolderShared;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.FileFolderShared = FileFolderShared;
var SharePointQueryableShareableFile = /** @class */ (function (_super) {
    __extends(SharePointQueryableShareableFile, _super);
    function SharePointQueryableShareableFile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Shares this item with one or more users
     *
     * @param loginNames string or string[] of resolved login names to which this item will be shared
     * @param role The role (View | Edit) applied to the share
     * @param shareEverything Share everything in this folder, even items with unique permissions.
     * @param requireSignin If true the user must signin to view link, otherwise anyone with the link can access the resource
     * @param emailData Optional, if inlucded an email will be sent. Note subject currently has no effect.
     */
    SharePointQueryableShareableFile.prototype.shareWith = function (loginNames, role, requireSignin, emailData) {
        if (role === void 0) { role = types_1.SharingRole.View; }
        if (requireSignin === void 0) { requireSignin = false; }
        var dependency = this.addBatchDependency();
        return this.getShareable().then(function (shareable) {
            dependency();
            return shareable.shareWith(loginNames, role, requireSignin, false, emailData);
        });
    };
    return SharePointQueryableShareableFile;
}(FileFolderShared));
exports.SharePointQueryableShareableFile = SharePointQueryableShareableFile;
var SharePointQueryableShareableFolder = /** @class */ (function (_super) {
    __extends(SharePointQueryableShareableFolder, _super);
    function SharePointQueryableShareableFolder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Shares this item with one or more users
     *
     * @param loginNames string or string[] of resolved login names to which this item will be shared
     * @param role The role (View | Edit) applied to the share
     * @param shareEverything Share everything in this folder, even items with unique permissions.
     * @param requireSignin If true the user must signin to view link, otherwise anyone with the link can access the resource
     * @param emailData Optional, if inlucded an email will be sent. Note subject currently has no effect.
     */
    SharePointQueryableShareableFolder.prototype.shareWith = function (loginNames, role, requireSignin, shareEverything, emailData) {
        if (role === void 0) { role = types_1.SharingRole.View; }
        if (requireSignin === void 0) { requireSignin = false; }
        if (shareEverything === void 0) { shareEverything = false; }
        var dependency = this.addBatchDependency();
        return this.getShareable().then(function (shareable) {
            dependency();
            return shareable.shareWith(loginNames, role, requireSignin, shareEverything, emailData);
        });
    };
    return SharePointQueryableShareableFolder;
}(FileFolderShared));
exports.SharePointQueryableShareableFolder = SharePointQueryableShareableFolder;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
var PermissionKind;
(function (PermissionKind) {
    /**
     * Has no permissions on the Site. Not available through the user interface.
     */
    PermissionKind[PermissionKind["EmptyMask"] = 0] = "EmptyMask";
    /**
     * View items in lists, documents in document libraries, and Web discussion comments.
     */
    PermissionKind[PermissionKind["ViewListItems"] = 1] = "ViewListItems";
    /**
     * Add items to lists, documents to document libraries, and Web discussion comments.
     */
    PermissionKind[PermissionKind["AddListItems"] = 2] = "AddListItems";
    /**
     * Edit items in lists, edit documents in document libraries, edit Web discussion comments
     * in documents, and customize Web Part Pages in document libraries.
     */
    PermissionKind[PermissionKind["EditListItems"] = 3] = "EditListItems";
    /**
     * Delete items from a list, documents from a document library, and Web discussion
     * comments in documents.
     */
    PermissionKind[PermissionKind["DeleteListItems"] = 4] = "DeleteListItems";
    /**
     * Approve a minor version of a list item or document.
     */
    PermissionKind[PermissionKind["ApproveItems"] = 5] = "ApproveItems";
    /**
     * View the source of documents with server-side file handlers.
     */
    PermissionKind[PermissionKind["OpenItems"] = 6] = "OpenItems";
    /**
     * View past versions of a list item or document.
     */
    PermissionKind[PermissionKind["ViewVersions"] = 7] = "ViewVersions";
    /**
     * Delete past versions of a list item or document.
     */
    PermissionKind[PermissionKind["DeleteVersions"] = 8] = "DeleteVersions";
    /**
     * Discard or check in a document which is checked out to another user.
     */
    PermissionKind[PermissionKind["CancelCheckout"] = 9] = "CancelCheckout";
    /**
     * Create, change, and delete personal views of lists.
     */
    PermissionKind[PermissionKind["ManagePersonalViews"] = 10] = "ManagePersonalViews";
    /**
     * Create and delete lists, add or remove columns in a list, and add or remove public views of a list.
     */
    PermissionKind[PermissionKind["ManageLists"] = 12] = "ManageLists";
    /**
     * View forms, views, and application pages, and enumerate lists.
     */
    PermissionKind[PermissionKind["ViewFormPages"] = 13] = "ViewFormPages";
    /**
     * Make content of a list or document library retrieveable for anonymous users through SharePoint search.
     * The list permissions in the site do not change.
     */
    PermissionKind[PermissionKind["AnonymousSearchAccessList"] = 14] = "AnonymousSearchAccessList";
    /**
     * Allow users to open a Site, list, or folder to access items inside that container.
     */
    PermissionKind[PermissionKind["Open"] = 17] = "Open";
    /**
     * View pages in a Site.
     */
    PermissionKind[PermissionKind["ViewPages"] = 18] = "ViewPages";
    /**
     * Add, change, or delete HTML pages or Web Part Pages, and edit the Site using
     * a Windows SharePoint Services compatible editor.
     */
    PermissionKind[PermissionKind["AddAndCustomizePages"] = 19] = "AddAndCustomizePages";
    /**
     * Apply a theme or borders to the entire Site.
     */
    PermissionKind[PermissionKind["ApplyThemeAndBorder"] = 20] = "ApplyThemeAndBorder";
    /**
     * Apply a style sheet (.css file) to the Site.
     */
    PermissionKind[PermissionKind["ApplyStyleSheets"] = 21] = "ApplyStyleSheets";
    /**
     * View reports on Site usage.
     */
    PermissionKind[PermissionKind["ViewUsageData"] = 22] = "ViewUsageData";
    /**
     * Create a Site using Self-Service Site Creation.
     */
    PermissionKind[PermissionKind["CreateSSCSite"] = 23] = "CreateSSCSite";
    /**
     * Create subsites such as team sites, Meeting Workspace sites, and Document Workspace sites.
     */
    PermissionKind[PermissionKind["ManageSubwebs"] = 24] = "ManageSubwebs";
    /**
     * Create a group of users that can be used anywhere within the site collection.
     */
    PermissionKind[PermissionKind["CreateGroups"] = 25] = "CreateGroups";
    /**
     * Create and change permission levels on the Site and assign permissions to users
     * and groups.
     */
    PermissionKind[PermissionKind["ManagePermissions"] = 26] = "ManagePermissions";
    /**
     * Enumerate files and folders in a Site using Microsoft Office SharePoint Designer
     * and WebDAV interfaces.
     */
    PermissionKind[PermissionKind["BrowseDirectories"] = 27] = "BrowseDirectories";
    /**
     * View information about users of the Site.
     */
    PermissionKind[PermissionKind["BrowseUserInfo"] = 28] = "BrowseUserInfo";
    /**
     * Add or remove personal Web Parts on a Web Part Page.
     */
    PermissionKind[PermissionKind["AddDelPrivateWebParts"] = 29] = "AddDelPrivateWebParts";
    /**
     * Update Web Parts to display personalized information.
     */
    PermissionKind[PermissionKind["UpdatePersonalWebParts"] = 30] = "UpdatePersonalWebParts";
    /**
     * Grant the ability to perform all administration tasks for the Site as well as
     * manage content, activate, deactivate, or edit properties of Site scoped Features
     * through the object model or through the user interface (UI). When granted on the
     * root Site of a Site Collection, activate, deactivate, or edit properties of
     * site collection scoped Features through the object model. To browse to the Site
     * Collection Features page and activate or deactivate Site Collection scoped Features
     * through the UI, you must be a Site Collection administrator.
     */
    PermissionKind[PermissionKind["ManageWeb"] = 31] = "ManageWeb";
    /**
     * Content of lists and document libraries in the Web site will be retrieveable for anonymous users through
     * SharePoint search if the list or document library has AnonymousSearchAccessList set.
     */
    PermissionKind[PermissionKind["AnonymousSearchAccessWebLists"] = 32] = "AnonymousSearchAccessWebLists";
    /**
     * Use features that launch client applications. Otherwise, users must work on documents
     * locally and upload changes.
     */
    PermissionKind[PermissionKind["UseClientIntegration"] = 37] = "UseClientIntegration";
    /**
     * Use SOAP, WebDAV, or Microsoft Office SharePoint Designer interfaces to access the Site.
     */
    PermissionKind[PermissionKind["UseRemoteAPIs"] = 38] = "UseRemoteAPIs";
    /**
     * Manage alerts for all users of the Site.
     */
    PermissionKind[PermissionKind["ManageAlerts"] = 39] = "ManageAlerts";
    /**
     * Create e-mail alerts.
     */
    PermissionKind[PermissionKind["CreateAlerts"] = 40] = "CreateAlerts";
    /**
     * Allows a user to change his or her user information, such as adding a picture.
     */
    PermissionKind[PermissionKind["EditMyUserInfo"] = 41] = "EditMyUserInfo";
    /**
     * Enumerate permissions on Site, list, folder, document, or list item.
     */
    PermissionKind[PermissionKind["EnumeratePermissions"] = 63] = "EnumeratePermissions";
    /**
     * Has all permissions on the Site. Not available through the user interface.
     */
    PermissionKind[PermissionKind["FullMask"] = 65] = "FullMask";
})(PermissionKind = exports.PermissionKind || (exports.PermissionKind = {}));
var PrincipalType;
(function (PrincipalType) {
    PrincipalType[PrincipalType["None"] = 0] = "None";
    PrincipalType[PrincipalType["User"] = 1] = "User";
    PrincipalType[PrincipalType["DistributionList"] = 2] = "DistributionList";
    PrincipalType[PrincipalType["SecurityGroup"] = 4] = "SecurityGroup";
    PrincipalType[PrincipalType["SharePointGroup"] = 8] = "SharePointGroup";
    PrincipalType[PrincipalType["All"] = 15] = "All";
})(PrincipalType = exports.PrincipalType || (exports.PrincipalType = {}));
var PrincipalSource;
(function (PrincipalSource) {
    PrincipalSource[PrincipalSource["None"] = 0] = "None";
    PrincipalSource[PrincipalSource["UserInfoList"] = 1] = "UserInfoList";
    PrincipalSource[PrincipalSource["Windows"] = 2] = "Windows";
    PrincipalSource[PrincipalSource["MembershipProvider"] = 4] = "MembershipProvider";
    PrincipalSource[PrincipalSource["RoleProvider"] = 8] = "RoleProvider";
    PrincipalSource[PrincipalSource["All"] = 15] = "All";
})(PrincipalSource = exports.PrincipalSource || (exports.PrincipalSource = {}));
var RoleType;
(function (RoleType) {
    RoleType[RoleType["None"] = 0] = "None";
    RoleType[RoleType["Guest"] = 1] = "Guest";
    RoleType[RoleType["Reader"] = 2] = "Reader";
    RoleType[RoleType["Contributor"] = 3] = "Contributor";
    RoleType[RoleType["WebDesigner"] = 4] = "WebDesigner";
    RoleType[RoleType["Administrator"] = 5] = "Administrator";
})(RoleType = exports.RoleType || (exports.RoleType = {}));
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
var SharingLinkKind;
(function (SharingLinkKind) {
    /**
     * Uninitialized link
     */
    SharingLinkKind[SharingLinkKind["Uninitialized"] = 0] = "Uninitialized";
    /**
     * Direct link to the object being shared
     */
    SharingLinkKind[SharingLinkKind["Direct"] = 1] = "Direct";
    /**
     * Organization-shareable link to the object being shared with view permissions
     */
    SharingLinkKind[SharingLinkKind["OrganizationView"] = 2] = "OrganizationView";
    /**
     * Organization-shareable link to the object being shared with edit permissions
     */
    SharingLinkKind[SharingLinkKind["OrganizationEdit"] = 3] = "OrganizationEdit";
    /**
     * View only anonymous link
     */
    SharingLinkKind[SharingLinkKind["AnonymousView"] = 4] = "AnonymousView";
    /**
     * Read/Write anonymous link
     */
    SharingLinkKind[SharingLinkKind["AnonymousEdit"] = 5] = "AnonymousEdit";
    /**
     * Flexible sharing Link where properties can change without affecting link URL
     */
    SharingLinkKind[SharingLinkKind["Flexible"] = 6] = "Flexible";
})(SharingLinkKind = exports.SharingLinkKind || (exports.SharingLinkKind = {}));
/**
 * Indicates the role of the sharing link
 */
var SharingRole;
(function (SharingRole) {
    SharingRole[SharingRole["None"] = 0] = "None";
    SharingRole[SharingRole["View"] = 1] = "View";
    SharingRole[SharingRole["Edit"] = 2] = "Edit";
    SharingRole[SharingRole["Owner"] = 3] = "Owner";
})(SharingRole = exports.SharingRole || (exports.SharingRole = {}));
var SharingOperationStatusCode;
(function (SharingOperationStatusCode) {
    /**
     * The share operation completed without errors.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["CompletedSuccessfully"] = 0] = "CompletedSuccessfully";
    /**
     * The share operation completed and generated requests for access.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["AccessRequestsQueued"] = 1] = "AccessRequestsQueued";
    /**
     * The share operation failed as there were no resolved users.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["NoResolvedUsers"] = -1] = "NoResolvedUsers";
    /**
     * The share operation failed due to insufficient permissions.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["AccessDenied"] = -2] = "AccessDenied";
    /**
     * The share operation failed when attempting a cross site share, which is not supported.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["CrossSiteRequestNotSupported"] = -3] = "CrossSiteRequestNotSupported";
    /**
     * The sharing operation failed due to an unknown error.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["UnknowError"] = -4] = "UnknowError";
    /**
     * The text you typed is too long. Please shorten it.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["EmailBodyTooLong"] = -5] = "EmailBodyTooLong";
    /**
     * The maximum number of unique scopes in the list has been exceeded.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["ListUniqueScopesExceeded"] = -6] = "ListUniqueScopesExceeded";
    /**
     * The share operation failed because a sharing capability is disabled in the site.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["CapabilityDisabled"] = -7] = "CapabilityDisabled";
    /**
     * The specified object for the share operation is not supported.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["ObjectNotSupported"] = -8] = "ObjectNotSupported";
    /**
     * A SharePoint group cannot contain another SharePoint group.
     */
    SharingOperationStatusCode[SharingOperationStatusCode["NestedGroupsNotSupported"] = -9] = "NestedGroupsNotSupported";
})(SharingOperationStatusCode = exports.SharingOperationStatusCode || (exports.SharingOperationStatusCode = {}));
var SPSharedObjectType;
(function (SPSharedObjectType) {
    SPSharedObjectType[SPSharedObjectType["Unknown"] = 0] = "Unknown";
    SPSharedObjectType[SPSharedObjectType["File"] = 1] = "File";
    SPSharedObjectType[SPSharedObjectType["Folder"] = 2] = "Folder";
    SPSharedObjectType[SPSharedObjectType["Item"] = 3] = "Item";
    SPSharedObjectType[SPSharedObjectType["List"] = 4] = "List";
    SPSharedObjectType[SPSharedObjectType["Web"] = 5] = "Web";
    SPSharedObjectType[SPSharedObjectType["Max"] = 6] = "Max";
})(SPSharedObjectType = exports.SPSharedObjectType || (exports.SPSharedObjectType = {}));
var SharingDomainRestrictionMode;
(function (SharingDomainRestrictionMode) {
    SharingDomainRestrictionMode[SharingDomainRestrictionMode["None"] = 0] = "None";
    SharingDomainRestrictionMode[SharingDomainRestrictionMode["AllowList"] = 1] = "AllowList";
    SharingDomainRestrictionMode[SharingDomainRestrictionMode["BlockList"] = 2] = "BlockList";
})(SharingDomainRestrictionMode = exports.SharingDomainRestrictionMode || (exports.SharingDomainRestrictionMode = {}));
var RenderListDataOptions;
(function (RenderListDataOptions) {
    RenderListDataOptions[RenderListDataOptions["None"] = 0] = "None";
    RenderListDataOptions[RenderListDataOptions["ContextInfo"] = 1] = "ContextInfo";
    RenderListDataOptions[RenderListDataOptions["ListData"] = 2] = "ListData";
    RenderListDataOptions[RenderListDataOptions["ListSchema"] = 4] = "ListSchema";
    RenderListDataOptions[RenderListDataOptions["MenuView"] = 8] = "MenuView";
})(RenderListDataOptions = exports.RenderListDataOptions || (exports.RenderListDataOptions = {}));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var sharepointqueryableshareable_1 = __webpack_require__(16);
var files_1 = __webpack_require__(9);
var util_1 = __webpack_require__(0);
var odata_1 = __webpack_require__(5);
var items_1 = __webpack_require__(15);
/**
 * Describes a collection of Folder objects
 *
 */
var Folders = /** @class */ (function (_super) {
    __extends(Folders, _super);
    /**
     * Creates a new instance of the Folders class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    function Folders(baseUrl, path) {
        if (path === void 0) { path = "folders"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a folder by folder name
     *
     */
    Folders.prototype.getByName = function (name) {
        var f = new Folder(this);
        f.concat("('" + name + "')");
        return f;
    };
    /**
     * Adds a new folder to the current folder (relative) or any folder (absolute)
     *
     * @param url The relative or absolute url where the new folder will be created. Urls starting with a forward slash are absolute.
     * @returns The new Folder and the raw response.
     */
    Folders.prototype.add = function (url) {
        var _this = this;
        return this.clone(Folders, "add('" + url + "')").postCore().then(function (response) {
            return {
                data: response,
                folder: _this.getByName(url),
            };
        });
    };
    return Folders;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.Folders = Folders;
/**
 * Describes a single Folder instance
 *
 */
var Folder = /** @class */ (function (_super) {
    __extends(Folder, _super);
    function Folder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Folder.prototype, "contentTypeOrder", {
        /**
         * Specifies the sequence in which content types are displayed.
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryableCollection(this, "contentTypeOrder");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "files", {
        /**
         * Gets this folder's files
         *
         */
        get: function () {
            return new files_1.Files(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "folders", {
        /**
         * Gets this folder's sub folders
         *
         */
        get: function () {
            return new Folders(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "listItemAllFields", {
        /**
         * Gets this folder's list item field values
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryableCollection(this, "listItemAllFields");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "parentFolder", {
        /**
         * Gets the parent folder, if available
         *
         */
        get: function () {
            return new Folder(this, "parentFolder");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "properties", {
        /**
         * Gets this folder's properties
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryableInstance(this, "properties");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "serverRelativeUrl", {
        /**
         * Gets this folder's server relative url
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryable(this, "serverRelativeUrl");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Folder.prototype, "uniqueContentTypeOrder", {
        /**
         * Gets a value that specifies the content type order.
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryableCollection(this, "uniqueContentTypeOrder");
        },
        enumerable: true,
        configurable: true
    });
    Folder.prototype.update = function (properties) {
        var _this = this;
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": "SP.Folder" },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            return {
                data: data,
                folder: _this,
            };
        });
    };
    /**
    * Delete this folder
    *
    * @param eTag Value used in the IF-Match header, by default "*"
    */
    Folder.prototype.delete = function (eTag) {
        if (eTag === void 0) { eTag = "*"; }
        return this.clone(Folder, null).postCore({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    /**
     * Moves the folder to the Recycle Bin and returns the identifier of the new Recycle Bin item.
     */
    Folder.prototype.recycle = function () {
        return this.clone(Folder, "recycle").postCore();
    };
    /**
     * Gets the associated list item for this folder, loading the default properties
     */
    Folder.prototype.getItem = function () {
        var selects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selects[_i] = arguments[_i];
        }
        var q = this.listItemAllFields;
        return q.select.apply(q, selects).get().then(function (d) {
            return util_1.Util.extend(new items_1.Item(odata_1.spGetEntityUrl(d)), d);
        });
    };
    return Folder;
}(sharepointqueryableshareable_1.SharePointQueryableShareableFolder));
exports.Folder = Folder;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var utils_1 = __webpack_require__(10);
var parsers_1 = __webpack_require__(7);
var pnplibconfig_1 = __webpack_require__(3);
var pipeline_1 = __webpack_require__(20);
var ODataQueryable = /** @class */ (function () {
    function ODataQueryable() {
    }
    /**
     * Directly concatonates the supplied string to the current url, not normalizing "/" chars
     *
     * @param pathPart The string to concatonate to the url
     */
    ODataQueryable.prototype.concat = function (pathPart) {
        this._url += pathPart;
        return this;
    };
    /**
     * Appends the given string and normalizes "/" chars
     *
     * @param pathPart The string to append
     */
    ODataQueryable.prototype.append = function (pathPart) {
        this._url = util_1.Util.combinePaths(this._url, pathPart);
    };
    Object.defineProperty(ODataQueryable.prototype, "parentUrl", {
        /**
         * Gets the parent url used when creating this instance
         *
         */
        get: function () {
            return this._parentUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataQueryable.prototype, "query", {
        /**
         * Provides access to the query builder for this url
         *
         */
        get: function () {
            return this._query;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets custom options for current object and all derived objects accessible via chaining
     *
     * @param options custom options
     */
    ODataQueryable.prototype.configure = function (options) {
        utils_1.mergeOptions(this._options, options);
        return this;
    };
    /**
     * Enables caching for this request
     *
     * @param options Defines the options used when caching this request
     */
    ODataQueryable.prototype.usingCaching = function (options) {
        if (!pnplibconfig_1.RuntimeConfig.globalCacheDisable) {
            this._useCaching = true;
            this._cachingOptions = options;
        }
        return this;
    };
    /**
     * Gets the currentl url, made absolute based on the availability of the _spPageContextInfo object
     *
     */
    ODataQueryable.prototype.toUrl = function () {
        return this._url;
    };
    /**
     * Executes the currently built request
     *
     * @param parser Allows you to specify a parser to handle the result
     * @param getOptions The options used for this request
     */
    ODataQueryable.prototype.get = function (parser, options) {
        if (parser === void 0) { parser = new parsers_1.ODataDefaultParser(); }
        if (options === void 0) { options = {}; }
        return this.toRequestContext("GET", options, parser, pipeline_1.PipelineMethods.default).then(function (context) { return pipeline_1.pipe(context); });
    };
    ODataQueryable.prototype.getAs = function (parser, options) {
        if (parser === void 0) { parser = new parsers_1.ODataDefaultParser(); }
        if (options === void 0) { options = {}; }
        return this.toRequestContext("GET", options, parser, pipeline_1.PipelineMethods.default).then(function (context) { return pipeline_1.pipe(context); });
    };
    ODataQueryable.prototype.postCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new parsers_1.ODataDefaultParser(); }
        return this.toRequestContext("POST", options, parser, pipeline_1.PipelineMethods.default).then(function (context) { return pipeline_1.pipe(context); });
    };
    ODataQueryable.prototype.postAsCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new parsers_1.ODataDefaultParser(); }
        return this.toRequestContext("POST", options, parser, pipeline_1.PipelineMethods.default).then(function (context) { return pipeline_1.pipe(context); });
    };
    ODataQueryable.prototype.patchCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new parsers_1.ODataDefaultParser(); }
        return this.toRequestContext("PATCH", options, parser, pipeline_1.PipelineMethods.default).then(function (context) { return pipeline_1.pipe(context); });
    };
    ODataQueryable.prototype.deleteCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new parsers_1.ODataDefaultParser(); }
        return this.toRequestContext("DELETE", options, parser, pipeline_1.PipelineMethods.default).then(function (context) { return pipeline_1.pipe(context); });
    };
    return ODataQueryable;
}());
exports.ODataQueryable = ODataQueryable;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var caching_1 = __webpack_require__(29);
var logging_1 = __webpack_require__(4);
var util_1 = __webpack_require__(0);
/**
 * Resolves the context's result value
 *
 * @param context The current context
 */
function returnResult(context) {
    logging_1.Logger.log({
        data: context.result,
        level: logging_1.LogLevel.Verbose,
        message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") Returning result, see data property for value.",
    });
    return Promise.resolve(context.result);
}
/**
 * Sets the result on the context
 */
function setResult(context, value) {
    return new Promise(function (resolve) {
        context.result = value;
        context.hasResult = true;
        resolve(context);
    });
}
exports.setResult = setResult;
/**
 * Invokes the next method in the provided context's pipeline
 *
 * @param c The current request context
 */
function next(c) {
    if (c.pipeline.length < 1) {
        return Promise.resolve(c);
    }
    return c.pipeline.shift()(c);
}
/**
 * Executes the current request context's pipeline
 *
 * @param context Current context
 */
function pipe(context) {
    return next(context)
        .then(function (ctx) { return returnResult(ctx); })
        .catch(function (e) {
        logging_1.Logger.log({
            data: e,
            level: logging_1.LogLevel.Error,
            message: "Error in request pipeline: " + e.message,
        });
        throw e;
    });
}
exports.pipe = pipe;
/**
 * decorator factory applied to methods in the pipeline to control behavior
 */
function requestPipelineMethod(alwaysRun) {
    if (alwaysRun === void 0) { alwaysRun = false; }
    return function (target, propertyKey, descriptor) {
        var method = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // if we have a result already in the pipeline, pass it along and don't call the tagged method
            if (!alwaysRun && args.length > 0 && args[0].hasOwnProperty("hasResult") && args[0].hasResult) {
                logging_1.Logger.write("[" + args[0].requestId + "] (" + (new Date()).getTime() + ") Skipping request pipeline method " + propertyKey + ", existing result in pipeline.", logging_1.LogLevel.Verbose);
                return Promise.resolve(args[0]);
            }
            // apply the tagged method
            logging_1.Logger.write("[" + args[0].requestId + "] (" + (new Date()).getTime() + ") Calling request pipeline method " + propertyKey + ".", logging_1.LogLevel.Verbose);
            // then chain the next method in the context's pipeline - allows for dynamic pipeline
            return method.apply(target, args).then(function (ctx) { return next(ctx); });
        };
    };
}
exports.requestPipelineMethod = requestPipelineMethod;
/**
 * Contains the methods used within the request pipeline
 */
var PipelineMethods = /** @class */ (function () {
    function PipelineMethods() {
    }
    /**
     * Logs the start of the request
     */
    PipelineMethods.logStart = function (context) {
        return new Promise(function (resolve) {
            logging_1.Logger.log({
                data: logging_1.Logger.activeLogLevel === logging_1.LogLevel.Info ? {} : context,
                level: logging_1.LogLevel.Info,
                message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") Beginning " + context.verb + " request (" + context.requestAbsoluteUrl + ")",
            });
            resolve(context);
        });
    };
    /**
     * Handles caching of the request
     */
    PipelineMethods.caching = function (context) {
        return new Promise(function (resolve) {
            // handle caching, if applicable
            if (context.verb === "GET" && context.isCached) {
                logging_1.Logger.write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Caching is enabled for request, checking cache...", logging_1.LogLevel.Info);
                var cacheOptions = new caching_1.CachingOptions(context.requestAbsoluteUrl.toLowerCase());
                if (typeof context.cachingOptions !== "undefined") {
                    cacheOptions = util_1.Util.extend(cacheOptions, context.cachingOptions);
                }
                // we may not have a valid store
                if (cacheOptions.store !== null) {
                    // check if we have the data in cache and if so resolve the promise and return
                    var data = cacheOptions.store.get(cacheOptions.key);
                    if (data !== null) {
                        // ensure we clear any help batch dependency we are resolving from the cache
                        logging_1.Logger.log({
                            data: logging_1.Logger.activeLogLevel === logging_1.LogLevel.Info ? {} : data,
                            level: logging_1.LogLevel.Info,
                            message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") Value returned from cache.",
                        });
                        context.batchDependency();
                        // handle the case where a parser needs to take special actions with a cached result (such as getAs)
                        if (context.parser.hasOwnProperty("hydrate")) {
                            data = context.parser.hydrate(data);
                        }
                        return setResult(context, data).then(function (ctx) { return resolve(ctx); });
                    }
                }
                logging_1.Logger.write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Value not found in cache.", logging_1.LogLevel.Info);
                // if we don't then wrap the supplied parser in the caching parser wrapper
                // and send things on their way
                context.parser = new caching_1.CachingParserWrapper(context.parser, cacheOptions);
            }
            return resolve(context);
        });
    };
    /**
     * Sends the request
     */
    PipelineMethods.send = function (context) {
        return new Promise(function (resolve, reject) {
            // send or batch the request
            if (context.isBatched) {
                // we are in a batch, so add to batch, remove dependency, and resolve with the batch's promise
                var p = context.batch.add(context.requestAbsoluteUrl, context.verb, context.options, context.parser);
                // we release the dependency here to ensure the batch does not execute until the request is added to the batch
                context.batchDependency();
                logging_1.Logger.write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Batching request in batch " + context.batch.batchId + ".", logging_1.LogLevel.Info);
                // we set the result as the promise which will be resolved by the batch's execution
                resolve(setResult(context, p));
            }
            else {
                logging_1.Logger.write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Sending request.", logging_1.LogLevel.Info);
                // we are not part of a batch, so proceed as normal
                var client = context.clientFactory();
                var opts = util_1.Util.extend(context.options || {}, { method: context.verb });
                client.fetch(context.requestAbsoluteUrl, opts)
                    .then(function (response) { return context.parser.parse(response); })
                    .then(function (result) { return setResult(context, result); })
                    .then(function (ctx) { return resolve(ctx); })
                    .catch(function (e) { return reject(e); });
            }
        });
    };
    /**
     * Logs the end of the request
     */
    PipelineMethods.logEnd = function (context) {
        return new Promise(function (resolve) {
            if (context.isBatched) {
                logging_1.Logger.log({
                    data: logging_1.Logger.activeLogLevel === logging_1.LogLevel.Info ? {} : context,
                    level: logging_1.LogLevel.Info,
                    message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") " + context.verb + " request will complete in batch " + context.batch.batchId + ".",
                });
            }
            else {
                logging_1.Logger.log({
                    data: logging_1.Logger.activeLogLevel === logging_1.LogLevel.Info ? {} : context,
                    level: logging_1.LogLevel.Info,
                    message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") Completing " + context.verb + " request.",
                });
            }
            resolve(context);
        });
    };
    Object.defineProperty(PipelineMethods, "default", {
        get: function () {
            return [
                PipelineMethods.logStart,
                PipelineMethods.caching,
                PipelineMethods.send,
                PipelineMethods.logEnd,
            ];
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        requestPipelineMethod(true)
    ], PipelineMethods, "logStart", null);
    __decorate([
        requestPipelineMethod()
    ], PipelineMethods, "caching", null);
    __decorate([
        requestPipelineMethod()
    ], PipelineMethods, "send", null);
    __decorate([
        requestPipelineMethod(true)
    ], PipelineMethods, "logEnd", null);
    return PipelineMethods;
}());
exports.PipelineMethods = PipelineMethods;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var digestcache_1 = __webpack_require__(46);
var util_1 = __webpack_require__(0);
var pnplibconfig_1 = __webpack_require__(3);
var exceptions_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(10);
var HttpClient = /** @class */ (function () {
    function HttpClient() {
        this._impl = pnplibconfig_1.RuntimeConfig.spFetchClientFactory();
        this._digestCache = new digestcache_1.DigestCache(this);
    }
    HttpClient.prototype.fetch = function (url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var opts = util_1.Util.extend(options, { cache: "no-cache", credentials: "same-origin" }, true);
        var headers = new Headers();
        // first we add the global headers so they can be overwritten by any passed in locally to this call
        utils_1.mergeHeaders(headers, pnplibconfig_1.RuntimeConfig.spHeaders);
        // second we add the local options so we can overwrite the globals
        utils_1.mergeHeaders(headers, options.headers);
        // lastly we apply any default headers we need that may not exist
        if (!headers.has("Accept")) {
            headers.append("Accept", "application/json");
        }
        if (!headers.has("Content-Type")) {
            headers.append("Content-Type", "application/json;odata=verbose;charset=utf-8");
        }
        if (!headers.has("X-ClientService-ClientTag")) {
            headers.append("X-ClientService-ClientTag", "PnPCoreJS:3.0.2");
        }
        if (!headers.has("User-Agent")) {
            // this marks the requests for understanding by the service
            headers.append("User-Agent", "NONISV|SharePointPnP|PnPCoreJS/3.0.2");
        }
        opts = util_1.Util.extend(opts, { headers: headers });
        if (opts.method && opts.method.toUpperCase() !== "GET") {
            // if we have either a request digest or an authorization header we don't need a digest
            if (!headers.has("X-RequestDigest") && !headers.has("Authorization")) {
                var index = url.indexOf("_api/");
                if (index < 0) {
                    throw new exceptions_1.APIUrlException();
                }
                var webUrl = url.substr(0, index);
                return this._digestCache.getDigest(webUrl)
                    .then(function (digest) {
                    headers.append("X-RequestDigest", digest);
                    return _this.fetchRaw(url, opts);
                });
            }
        }
        return this.fetchRaw(url, opts);
    };
    HttpClient.prototype.fetchRaw = function (url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        // here we need to normalize the headers
        var rawHeaders = new Headers();
        utils_1.mergeHeaders(rawHeaders, options.headers);
        options = util_1.Util.extend(options, { headers: rawHeaders });
        var retry = function (ctx) {
            _this._impl.fetch(url, options).then(function (response) { return ctx.resolve(response); }).catch(function (response) {
                // Check if request was throttled - http status code 429
                // Check if request failed due to server unavailable - http status code 503
                if (response.status !== 429 && response.status !== 503) {
                    ctx.reject(response);
                }
                // grab our current delay
                var delay = ctx.delay;
                // Increment our counters.
                ctx.delay *= 2;
                ctx.attempts++;
                // If we have exceeded the retry count, reject.
                if (ctx.retryCount <= ctx.attempts) {
                    ctx.reject(response);
                }
                // Set our retry timeout for {delay} milliseconds.
                setTimeout(util_1.Util.getCtxCallback(_this, retry, ctx), delay);
            });
        };
        return new Promise(function (resolve, reject) {
            var retryContext = {
                attempts: 0,
                delay: 100,
                reject: reject,
                resolve: resolve,
                retryCount: 7,
            };
            retry.call(_this, retryContext);
        });
    };
    HttpClient.prototype.get = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = util_1.Util.extend(options, { method: "GET" });
        return this.fetch(url, opts);
    };
    HttpClient.prototype.post = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = util_1.Util.extend(options, { method: "POST" });
        return this.fetch(url, opts);
    };
    HttpClient.prototype.patch = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = util_1.Util.extend(options, { method: "PATCH" });
        return this.fetch(url, opts);
    };
    HttpClient.prototype.delete = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = util_1.Util.extend(options, { method: "DELETE" });
        return this.fetch(url, opts);
    };
    return HttpClient;
}());
exports.HttpClient = HttpClient;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var sitegroups_1 = __webpack_require__(23);
var util_1 = __webpack_require__(0);
/**
 * Describes a set of role assignments for the current scope
 *
 */
var RoleAssignments = /** @class */ (function (_super) {
    __extends(RoleAssignments, _super);
    /**
     * Creates a new instance of the RoleAssignments class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this role assignments collection
     */
    function RoleAssignments(baseUrl, path) {
        if (path === void 0) { path = "roleassignments"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Adds a new role assignment with the specified principal and role definitions to the collection
     *
     * @param principalId The id of the user or group to assign permissions to
     * @param roleDefId The id of the role definition that defines the permissions to assign
     *
     */
    RoleAssignments.prototype.add = function (principalId, roleDefId) {
        return this.clone(RoleAssignments, "addroleassignment(principalid=" + principalId + ", roledefid=" + roleDefId + ")").postCore();
    };
    /**
     * Removes the role assignment with the specified principal and role definition from the collection
     *
     * @param principalId The id of the user or group in the role assignment
     * @param roleDefId The id of the role definition in the role assignment
     *
     */
    RoleAssignments.prototype.remove = function (principalId, roleDefId) {
        return this.clone(RoleAssignments, "removeroleassignment(principalid=" + principalId + ", roledefid=" + roleDefId + ")").postCore();
    };
    /**
     * Gets the role assignment associated with the specified principal id from the collection.
     *
     * @param id The id of the role assignment
     */
    RoleAssignments.prototype.getById = function (id) {
        var ra = new RoleAssignment(this);
        ra.concat("(" + id + ")");
        return ra;
    };
    return RoleAssignments;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.RoleAssignments = RoleAssignments;
/**
 * Describes a role assignment
 *
 */
var RoleAssignment = /** @class */ (function (_super) {
    __extends(RoleAssignment, _super);
    function RoleAssignment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RoleAssignment.prototype, "groups", {
        /**
         * Gets the groups that directly belong to the access control list (ACL) for this securable object
         *
         */
        get: function () {
            return new sitegroups_1.SiteGroups(this, "groups");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoleAssignment.prototype, "bindings", {
        /**
         * Gets the role definition bindings for this role assignment
         *
         */
        get: function () {
            return new RoleDefinitionBindings(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Deletes this role assignment
     *
     */
    RoleAssignment.prototype.delete = function () {
        return this.postCore({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    return RoleAssignment;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.RoleAssignment = RoleAssignment;
/**
 * Describes a collection of role definitions
 *
 */
var RoleDefinitions = /** @class */ (function (_super) {
    __extends(RoleDefinitions, _super);
    /**
     * Creates a new instance of the RoleDefinitions class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this role definitions collection
     *
     */
    function RoleDefinitions(baseUrl, path) {
        if (path === void 0) { path = "roledefinitions"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets the role definition with the specified id from the collection
     *
     * @param id The id of the role definition
     *
     */
    RoleDefinitions.prototype.getById = function (id) {
        return new RoleDefinition(this, "getById(" + id + ")");
    };
    /**
     * Gets the role definition with the specified name
     *
     * @param name The name of the role definition
     *
     */
    RoleDefinitions.prototype.getByName = function (name) {
        return new RoleDefinition(this, "getbyname('" + name + "')");
    };
    /**
     * Gets the role definition with the specified role type
     *
     * @param roleTypeKind The roletypekind of the role definition (None=0, Guest=1, Reader=2, Contributor=3, WebDesigner=4, Administrator=5, Editor=6, System=7)
     *
     */
    RoleDefinitions.prototype.getByType = function (roleTypeKind) {
        return new RoleDefinition(this, "getbytype(" + roleTypeKind + ")");
    };
    /**
     * Creates a role definition
     *
     * @param name The new role definition's name
     * @param description The new role definition's description
     * @param order The order in which the role definition appears
     * @param basePermissions The permissions mask for this role definition
     *
     */
    RoleDefinitions.prototype.add = function (name, description, order, basePermissions) {
        var _this = this;
        var postBody = JSON.stringify({
            BasePermissions: util_1.Util.extend({ __metadata: { type: "SP.BasePermissions" } }, basePermissions),
            Description: description,
            Name: name,
            Order: order,
            __metadata: { "type": "SP.RoleDefinition" },
        });
        return this.postCore({ body: postBody }).then(function (data) {
            return {
                data: data,
                definition: _this.getById(data.Id),
            };
        });
    };
    return RoleDefinitions;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.RoleDefinitions = RoleDefinitions;
/**
 * Describes a role definition
 *
 */
var RoleDefinition = /** @class */ (function (_super) {
    __extends(RoleDefinition, _super);
    function RoleDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Updates this role definition with the supplied properties
     *
     * @param properties A plain object hash of values to update for the role definition
     */
    /* tslint:disable no-string-literal */
    RoleDefinition.prototype.update = function (properties) {
        var _this = this;
        if (typeof properties.hasOwnProperty("BasePermissions") !== "undefined") {
            properties["BasePermissions"] = util_1.Util.extend({ __metadata: { type: "SP.BasePermissions" } }, properties["BasePermissions"]);
        }
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": "SP.RoleDefinition" },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            var retDef = _this;
            if (properties.hasOwnProperty("Name")) {
                var parent_1 = _this.getParent(RoleDefinitions, _this.parentUrl, "");
                retDef = parent_1.getByName(properties["Name"]);
            }
            return {
                data: data,
                definition: retDef,
            };
        });
    };
    /* tslint:enable */
    /**
     * Deletes this role definition
     *
     */
    RoleDefinition.prototype.delete = function () {
        return this.postCore({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    return RoleDefinition;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.RoleDefinition = RoleDefinition;
/**
 * Describes the role definitons bound to a role assignment object
 *
 */
var RoleDefinitionBindings = /** @class */ (function (_super) {
    __extends(RoleDefinitionBindings, _super);
    /**
     * Creates a new instance of the RoleDefinitionBindings class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this role definition bindings collection
     */
    function RoleDefinitionBindings(baseUrl, path) {
        if (path === void 0) { path = "roledefinitionbindings"; }
        return _super.call(this, baseUrl, path) || this;
    }
    return RoleDefinitionBindings;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.RoleDefinitionBindings = RoleDefinitionBindings;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var siteusers_1 = __webpack_require__(33);
var util_1 = __webpack_require__(0);
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
 * Describes a collection of site groups
 *
 */
var SiteGroups = /** @class */ (function (_super) {
    __extends(SiteGroups, _super);
    /**
     * Creates a new instance of the SiteGroups class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this group collection
     */
    function SiteGroups(baseUrl, path) {
        if (path === void 0) { path = "sitegroups"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Adds a new group to the site collection
     *
     * @param props The group properties object of property names and values to be set for the group
     */
    SiteGroups.prototype.add = function (properties) {
        var _this = this;
        var postBody = JSON.stringify(util_1.Util.extend({ "__metadata": { "type": "SP.Group" } }, properties));
        return this.postCore({ body: postBody }).then(function (data) {
            return {
                data: data,
                group: _this.getById(data.Id),
            };
        });
    };
    /**
     * Gets a group from the collection by name
     *
     * @param groupName The name of the group to retrieve
     */
    SiteGroups.prototype.getByName = function (groupName) {
        return new SiteGroup(this, "getByName('" + groupName + "')");
    };
    /**
     * Gets a group from the collection by id
     *
     * @param id The id of the group to retrieve
     */
    SiteGroups.prototype.getById = function (id) {
        var sg = new SiteGroup(this);
        sg.concat("(" + id + ")");
        return sg;
    };
    /**
     * Removes the group with the specified member id from the collection
     *
     * @param id The id of the group to remove
     */
    SiteGroups.prototype.removeById = function (id) {
        return this.clone(SiteGroups, "removeById('" + id + "')").postCore();
    };
    /**
     * Removes the cross-site group with the specified name from the collection
     *
     * @param loginName The name of the group to remove
     */
    SiteGroups.prototype.removeByLoginName = function (loginName) {
        return this.clone(SiteGroups, "removeByLoginName('" + loginName + "')").postCore();
    };
    return SiteGroups;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.SiteGroups = SiteGroups;
/**
 * Describes a single group
 *
 */
var SiteGroup = /** @class */ (function (_super) {
    __extends(SiteGroup, _super);
    function SiteGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SiteGroup.prototype, "users", {
        /**
         * Gets the users for this group
         *
         */
        get: function () {
            return new siteusers_1.SiteUsers(this, "users");
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Updates this group instance with the supplied properties
    *
    * @param properties A GroupWriteableProperties object of property names and values to update for the group
    */
    /* tslint:disable no-string-literal */
    SiteGroup.prototype.update = function (properties) {
        var _this = this;
        var postBody = util_1.Util.extend({ "__metadata": { "type": "SP.Group" } }, properties);
        return this.postCore({
            body: JSON.stringify(postBody),
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            var retGroup = _this;
            if (properties.hasOwnProperty("Title")) {
                retGroup = _this.getParent(SiteGroup, _this.parentUrl, "getByName('" + properties["Title"] + "')");
            }
            return {
                data: data,
                group: retGroup,
            };
        });
    };
    return SiteGroup;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.SiteGroup = SiteGroup;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var sharepointqueryable_1 = __webpack_require__(1);
/**
 * Describes a collection of content types
 *
 */
var ContentTypes = /** @class */ (function (_super) {
    __extends(ContentTypes, _super);
    /**
     * Creates a new instance of the ContentTypes class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this content types collection
     */
    function ContentTypes(baseUrl, path) {
        if (path === void 0) { path = "contenttypes"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a ContentType by content type id
     */
    ContentTypes.prototype.getById = function (id) {
        var ct = new ContentType(this);
        ct.concat("('" + id + "')");
        return ct;
    };
    /**
     * Adds an existing contenttype to a content type collection
     *
     * @param contentTypeId in the following format, for example: 0x010102
     */
    ContentTypes.prototype.addAvailableContentType = function (contentTypeId) {
        var _this = this;
        var postBody = JSON.stringify({
            "contentTypeId": contentTypeId,
        });
        return this.clone(ContentTypes, "addAvailableContentType").postAsCore({ body: postBody }).then(function (data) {
            return {
                contentType: _this.getById(data.id),
                data: data,
            };
        });
    };
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
    ContentTypes.prototype.add = function (id, name, description, group, additionalSettings) {
        var _this = this;
        if (description === void 0) { description = ""; }
        if (group === void 0) { group = "Custom Content Types"; }
        if (additionalSettings === void 0) { additionalSettings = {}; }
        var postBody = JSON.stringify(util_1.Util.extend({
            "Description": description,
            "Group": group,
            "Id": { "StringValue": id },
            "Name": name,
            "__metadata": { "type": "SP.ContentType" },
        }, additionalSettings));
        return this.postCore({ body: postBody }).then(function (data) {
            return { contentType: _this.getById(data.id), data: data };
        });
    };
    return ContentTypes;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.ContentTypes = ContentTypes;
/**
 * Describes a single ContentType instance
 *
 */
var ContentType = /** @class */ (function (_super) {
    __extends(ContentType, _super);
    function ContentType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ContentType.prototype, "fieldLinks", {
        /**
         * Gets the column (also known as field) references in the content type.
        */
        get: function () {
            return new FieldLinks(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "fields", {
        /**
         * Gets a value that specifies the collection of fields for the content type.
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryableCollection(this, "fields");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "parent", {
        /**
         * Gets the parent content type of the content type.
         */
        get: function () {
            return new ContentType(this, "parent");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContentType.prototype, "workflowAssociations", {
        /**
         * Gets a value that specifies the collection of workflow associations for the content type.
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryableCollection(this, "workflowAssociations");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Delete this content type
     */
    ContentType.prototype.delete = function () {
        return this.postCore({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    return ContentType;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.ContentType = ContentType;
/**
 * Represents a collection of field link instances
 */
var FieldLinks = /** @class */ (function (_super) {
    __extends(FieldLinks, _super);
    /**
     * Creates a new instance of the ContentType class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this content type instance
     */
    function FieldLinks(baseUrl, path) {
        if (path === void 0) { path = "fieldlinks"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a FieldLink by GUID id
     *
     * @param id The GUID id of the field link
     */
    FieldLinks.prototype.getById = function (id) {
        var fl = new FieldLink(this);
        fl.concat("(guid'" + id + "')");
        return fl;
    };
    return FieldLinks;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.FieldLinks = FieldLinks;
/**
 * Represents a field link instance
 */
var FieldLink = /** @class */ (function (_super) {
    __extends(FieldLink, _super);
    function FieldLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FieldLink;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.FieldLink = FieldLink;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var util_1 = __webpack_require__(0);
/**
 * Describes a collection of user custom actions
 *
 */
var UserCustomActions = /** @class */ (function (_super) {
    __extends(UserCustomActions, _super);
    /**
     * Creates a new instance of the UserCustomActions class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this user custom actions collection
     */
    function UserCustomActions(baseUrl, path) {
        if (path === void 0) { path = "usercustomactions"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Returns the user custom action with the specified id
     *
     * @param id The GUID id of the user custom action to retrieve
     */
    UserCustomActions.prototype.getById = function (id) {
        var uca = new UserCustomAction(this);
        uca.concat("('" + id + "')");
        return uca;
    };
    /**
     * Creates a user custom action
     *
     * @param properties The information object of property names and values which define the new user custom action
     *
     */
    UserCustomActions.prototype.add = function (properties) {
        var _this = this;
        var postBody = JSON.stringify(util_1.Util.extend({ __metadata: { "type": "SP.UserCustomAction" } }, properties));
        return this.postCore({ body: postBody }).then(function (data) {
            return {
                action: _this.getById(data.Id),
                data: data,
            };
        });
    };
    /**
     * Deletes all user custom actions in the collection
     *
     */
    UserCustomActions.prototype.clear = function () {
        return this.clone(UserCustomActions, "clear").postCore();
    };
    return UserCustomActions;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.UserCustomActions = UserCustomActions;
/**
 * Describes a single user custom action
 *
 */
var UserCustomAction = /** @class */ (function (_super) {
    __extends(UserCustomAction, _super);
    function UserCustomAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * Updates this user custom action with the supplied properties
    *
    * @param properties An information object of property names and values to update for this user custom action
    */
    UserCustomAction.prototype.update = function (properties) {
        var _this = this;
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": "SP.UserCustomAction" },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            return {
                action: _this,
                data: data,
            };
        });
    };
    /**
    * Removes this user custom action
    *
    */
    UserCustomAction.prototype.delete = function () {
        return _super.prototype.deleteCore.call(this);
    };
    return UserCustomAction;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.UserCustomAction = UserCustomAction;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Makes requests using the fetch API
 */
var FetchClient = /** @class */ (function () {
    function FetchClient() {
    }
    FetchClient.prototype.fetch = function (url, options) {
        return global.fetch(url, options);
    };
    return FetchClient;
}());
exports.FetchClient = FetchClient;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var util_1 = __webpack_require__(0);
/**
 * Allows for the fluent construction of search queries
 */
var SearchQueryBuilder = /** @class */ (function () {
    function SearchQueryBuilder(queryText, _query) {
        if (queryText === void 0) { queryText = ""; }
        if (_query === void 0) { _query = {}; }
        this._query = _query;
        if (typeof queryText === "string" && queryText.length > 0) {
            this.extendQuery({ Querytext: queryText });
        }
    }
    SearchQueryBuilder.create = function (queryText, queryTemplate) {
        if (queryText === void 0) { queryText = ""; }
        if (queryTemplate === void 0) { queryTemplate = {}; }
        return new SearchQueryBuilder(queryText, queryTemplate);
    };
    SearchQueryBuilder.prototype.text = function (queryText) {
        return this.extendQuery({ Querytext: queryText });
    };
    SearchQueryBuilder.prototype.template = function (template) {
        return this.extendQuery({ QueryTemplate: template });
    };
    SearchQueryBuilder.prototype.sourceId = function (id) {
        return this.extendQuery({ SourceId: id });
    };
    Object.defineProperty(SearchQueryBuilder.prototype, "enableInterleaving", {
        get: function () {
            return this.extendQuery({ EnableInterleaving: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchQueryBuilder.prototype, "enableStemming", {
        get: function () {
            return this.extendQuery({ EnableStemming: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchQueryBuilder.prototype, "trimDuplicates", {
        get: function () {
            return this.extendQuery({ TrimDuplicates: true });
        },
        enumerable: true,
        configurable: true
    });
    SearchQueryBuilder.prototype.trimDuplicatesIncludeId = function (n) {
        return this.extendQuery({ TrimDuplicatesIncludeId: n });
    };
    Object.defineProperty(SearchQueryBuilder.prototype, "enableNicknames", {
        get: function () {
            return this.extendQuery({ EnableNicknames: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchQueryBuilder.prototype, "enableFql", {
        get: function () {
            return this.extendQuery({ EnableFQL: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchQueryBuilder.prototype, "enablePhonetic", {
        get: function () {
            return this.extendQuery({ EnablePhonetic: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchQueryBuilder.prototype, "bypassResultTypes", {
        get: function () {
            return this.extendQuery({ BypassResultTypes: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchQueryBuilder.prototype, "processBestBets", {
        get: function () {
            return this.extendQuery({ ProcessBestBets: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchQueryBuilder.prototype, "enableQueryRules", {
        get: function () {
            return this.extendQuery({ EnableQueryRules: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchQueryBuilder.prototype, "enableSorting", {
        get: function () {
            return this.extendQuery({ EnableSorting: true });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchQueryBuilder.prototype, "generateBlockRankLog", {
        get: function () {
            return this.extendQuery({ GenerateBlockRankLog: true });
        },
        enumerable: true,
        configurable: true
    });
    SearchQueryBuilder.prototype.rankingModelId = function (id) {
        return this.extendQuery({ RankingModelId: id });
    };
    SearchQueryBuilder.prototype.startRow = function (n) {
        return this.extendQuery({ StartRow: n });
    };
    SearchQueryBuilder.prototype.rowLimit = function (n) {
        return this.extendQuery({ RowLimit: n });
    };
    SearchQueryBuilder.prototype.rowsPerPage = function (n) {
        return this.extendQuery({ RowsPerPage: n });
    };
    SearchQueryBuilder.prototype.selectProperties = function () {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        return this.extendQuery({ SelectProperties: properties });
    };
    SearchQueryBuilder.prototype.culture = function (culture) {
        return this.extendQuery({ Culture: culture });
    };
    SearchQueryBuilder.prototype.timeZoneId = function (id) {
        return this.extendQuery({ TimeZoneId: id });
    };
    SearchQueryBuilder.prototype.refinementFilters = function () {
        var filters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            filters[_i] = arguments[_i];
        }
        return this.extendQuery({ RefinementFilters: filters });
    };
    SearchQueryBuilder.prototype.refiners = function (refiners) {
        return this.extendQuery({ Refiners: refiners });
    };
    SearchQueryBuilder.prototype.hiddenConstraints = function (constraints) {
        return this.extendQuery({ HiddenConstraints: constraints });
    };
    SearchQueryBuilder.prototype.sortList = function () {
        var sorts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sorts[_i] = arguments[_i];
        }
        return this.extendQuery({ SortList: sorts });
    };
    SearchQueryBuilder.prototype.timeout = function (milliseconds) {
        return this.extendQuery({ Timeout: milliseconds });
    };
    SearchQueryBuilder.prototype.hithighlightedProperties = function () {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        return this.extendQuery({ HitHighlightedProperties: properties });
    };
    SearchQueryBuilder.prototype.clientType = function (clientType) {
        return this.extendQuery({ ClientType: clientType });
    };
    SearchQueryBuilder.prototype.personalizationData = function (data) {
        return this.extendQuery({ PersonalizationData: data });
    };
    SearchQueryBuilder.prototype.resultsURL = function (url) {
        return this.extendQuery({ ResultsUrl: url });
    };
    SearchQueryBuilder.prototype.queryTag = function () {
        var tags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tags[_i] = arguments[_i];
        }
        return this.extendQuery({ QueryTag: tags });
    };
    SearchQueryBuilder.prototype.properties = function () {
        var properties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            properties[_i] = arguments[_i];
        }
        return this.extendQuery({ Properties: properties });
    };
    Object.defineProperty(SearchQueryBuilder.prototype, "processPersonalFavorites", {
        get: function () {
            return this.extendQuery({ ProcessPersonalFavorites: true });
        },
        enumerable: true,
        configurable: true
    });
    SearchQueryBuilder.prototype.queryTemplatePropertiesUrl = function (url) {
        return this.extendQuery({ QueryTemplatePropertiesUrl: url });
    };
    SearchQueryBuilder.prototype.reorderingRules = function () {
        var rules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rules[_i] = arguments[_i];
        }
        return this.extendQuery({ ReorderingRules: rules });
    };
    SearchQueryBuilder.prototype.hitHighlightedMultivaluePropertyLimit = function (limit) {
        return this.extendQuery({ HitHighlightedMultivaluePropertyLimit: limit });
    };
    Object.defineProperty(SearchQueryBuilder.prototype, "enableOrderingHitHighlightedProperty", {
        get: function () {
            return this.extendQuery({ EnableOrderingHitHighlightedProperty: true });
        },
        enumerable: true,
        configurable: true
    });
    SearchQueryBuilder.prototype.collapseSpecification = function (spec) {
        return this.extendQuery({ CollapseSpecification: spec });
    };
    SearchQueryBuilder.prototype.uiLanguage = function (lang) {
        return this.extendQuery({ UILanguage: lang });
    };
    SearchQueryBuilder.prototype.desiredSnippetLength = function (len) {
        return this.extendQuery({ DesiredSnippetLength: len });
    };
    SearchQueryBuilder.prototype.maxSnippetLength = function (len) {
        return this.extendQuery({ MaxSnippetLength: len });
    };
    SearchQueryBuilder.prototype.summaryLength = function (len) {
        return this.extendQuery({ SummaryLength: len });
    };
    SearchQueryBuilder.prototype.toSearchQuery = function () {
        return this._query;
    };
    SearchQueryBuilder.prototype.extendQuery = function (part) {
        this._query = util_1.Util.extend(this._query, part);
        return this;
    };
    return SearchQueryBuilder;
}());
exports.SearchQueryBuilder = SearchQueryBuilder;
/**
 * Describes the search API
 *
 */
var Search = /** @class */ (function (_super) {
    __extends(Search, _super);
    /**
     * Creates a new instance of the Search class
     *
     * @param baseUrl The url for the search context
     * @param query The SearchQuery object to execute
     */
    function Search(baseUrl, path) {
        if (path === void 0) { path = "_api/search/postquery"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * .......
     * @returns Promise
     */
    Search.prototype.execute = function (query) {
        var _this = this;
        var formattedBody;
        formattedBody = query;
        if (formattedBody.SelectProperties) {
            formattedBody.SelectProperties = this.fixupProp(query.SelectProperties);
        }
        if (formattedBody.RefinementFilters) {
            formattedBody.RefinementFilters = this.fixupProp(query.RefinementFilters);
        }
        if (formattedBody.SortList) {
            formattedBody.SortList = this.fixupProp(query.SortList);
        }
        if (formattedBody.HithighlightedProperties) {
            formattedBody.HithighlightedProperties = this.fixupProp(query.HitHighlightedProperties);
        }
        if (formattedBody.ReorderingRules) {
            formattedBody.ReorderingRules = this.fixupProp(query.ReorderingRules);
        }
        if (formattedBody.Properties) {
            formattedBody.Properties = this.fixupProp(query.Properties);
        }
        var postBody = JSON.stringify({
            request: util_1.Util.extend({
                "__metadata": { "type": "Microsoft.Office.Server.Search.REST.SearchRequest" },
            }, formattedBody),
        });
        return this.postCore({ body: postBody }).then(function (data) { return new SearchResults(data, _this.toUrl(), query); });
    };
    /**
     * Fixes up properties that expect to consist of a "results" collection when needed
     *
     * @param prop property to fixup for container struct
     */
    Search.prototype.fixupProp = function (prop) {
        if (prop.hasOwnProperty("results")) {
            return prop;
        }
        return { results: prop };
    };
    return Search;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.Search = Search;
/**
 * Describes the SearchResults class, which returns the formatted and raw version of the query response
 */
var SearchResults = /** @class */ (function () {
    /**
     * Creates a new instance of the SearchResult class
     *
     */
    function SearchResults(rawResponse, _url, _query, _raw, _primary) {
        if (_raw === void 0) { _raw = null; }
        if (_primary === void 0) { _primary = null; }
        this._url = _url;
        this._query = _query;
        this._raw = _raw;
        this._primary = _primary;
        this._raw = rawResponse.postquery ? rawResponse.postquery : rawResponse;
    }
    Object.defineProperty(SearchResults.prototype, "ElapsedTime", {
        get: function () {
            return this.RawSearchResults.ElapsedTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResults.prototype, "RowCount", {
        get: function () {
            return this.RawSearchResults.PrimaryQueryResult.RelevantResults.RowCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResults.prototype, "TotalRows", {
        get: function () {
            return this.RawSearchResults.PrimaryQueryResult.RelevantResults.TotalRows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResults.prototype, "TotalRowsIncludingDuplicates", {
        get: function () {
            return this.RawSearchResults.PrimaryQueryResult.RelevantResults.TotalRowsIncludingDuplicates;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResults.prototype, "RawSearchResults", {
        get: function () {
            return this._raw;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResults.prototype, "PrimarySearchResults", {
        get: function () {
            if (this._primary === null) {
                this._primary = this.formatSearchResults(this._raw.PrimaryQueryResult.RelevantResults.Table.Rows);
            }
            return this._primary;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets a page of results
     *
     * @param pageNumber Index of the page to return. Used to determine StartRow
     * @param pageSize Optional, items per page (default = 10)
     */
    SearchResults.prototype.getPage = function (pageNumber, pageSize) {
        // if we got all the available rows we don't have another page
        if (this.TotalRows < this.RowCount) {
            return Promise.resolve(null);
        }
        // if pageSize is supplied, then we use that regardless of any previous values
        // otherwise get the previous RowLimit or default to 10
        var rows = typeof pageSize !== "undefined" ? pageSize : this._query.hasOwnProperty("RowLimit") ? this._query.RowLimit : 10;
        var query = util_1.Util.extend(this._query, {
            RowLimit: rows,
            StartRow: rows * (pageNumber - 1),
        });
        // we have reached the end
        if (query.StartRow > this.TotalRows) {
            return Promise.resolve(null);
        }
        var search = new Search(this._url, null);
        return search.execute(query);
    };
    /**
     * Formats a search results array
     *
     * @param rawResults The array to process
     */
    SearchResults.prototype.formatSearchResults = function (rawResults) {
        var results = new Array();
        var tempResults = rawResults.results ? rawResults.results : rawResults;
        for (var _i = 0, tempResults_1 = tempResults; _i < tempResults_1.length; _i++) {
            var tempResult = tempResults_1[_i];
            var cells = tempResult.Cells.results ? tempResult.Cells.results : tempResult.Cells;
            results.push(cells.reduce(function (res, cell) {
                Object.defineProperty(res, cell.Key, {
                    configurable: false,
                    enumerable: false,
                    value: cell.Value,
                    writable: false,
                });
                return res;
            }, {}));
        }
        return results;
    };
    return SearchResults;
}());
exports.SearchResults = SearchResults;
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
var SearchBuiltInSourceId = /** @class */ (function () {
    function SearchBuiltInSourceId() {
    }
    SearchBuiltInSourceId.Documents = "e7ec8cee-ded8-43c9-beb5-436b54b31e84";
    SearchBuiltInSourceId.ItemsMatchingContentType = "5dc9f503-801e-4ced-8a2c-5d1237132419";
    SearchBuiltInSourceId.ItemsMatchingTag = "e1327b9c-2b8c-4b23-99c9-3730cb29c3f7";
    SearchBuiltInSourceId.ItemsRelatedToCurrentUser = "48fec42e-4a92-48ce-8363-c2703a40e67d";
    SearchBuiltInSourceId.ItemsWithSameKeywordAsThisItem = "5c069288-1d17-454a-8ac6-9c642a065f48";
    SearchBuiltInSourceId.LocalPeopleResults = "b09a7990-05ea-4af9-81ef-edfab16c4e31";
    SearchBuiltInSourceId.LocalReportsAndDataResults = "203fba36-2763-4060-9931-911ac8c0583b";
    SearchBuiltInSourceId.LocalSharePointResults = "8413cd39-2156-4e00-b54d-11efd9abdb89";
    SearchBuiltInSourceId.LocalVideoResults = "78b793ce-7956-4669-aa3b-451fc5defebf";
    SearchBuiltInSourceId.Pages = "5e34578e-4d08-4edc-8bf3-002acf3cdbcc";
    SearchBuiltInSourceId.Pictures = "38403c8c-3975-41a8-826e-717f2d41568a";
    SearchBuiltInSourceId.Popular = "97c71db1-58ce-4891-8b64-585bc2326c12";
    SearchBuiltInSourceId.RecentlyChangedItems = "ba63bbae-fa9c-42c0-b027-9a878f16557c";
    SearchBuiltInSourceId.RecommendedItems = "ec675252-14fa-4fbe-84dd-8d098ed74181";
    SearchBuiltInSourceId.Wiki = "9479bf85-e257-4318-b5a8-81a180f5faa1";
    return SearchBuiltInSourceId;
}());
exports.SearchBuiltInSourceId = SearchBuiltInSourceId;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var storage_1 = __webpack_require__(12);
var util_1 = __webpack_require__(0);
var pnplibconfig_1 = __webpack_require__(3);
var CachingOptions = /** @class */ (function () {
    function CachingOptions(key) {
        this.key = key;
        this.expiration = util_1.Util.dateAdd(new Date(), "second", pnplibconfig_1.RuntimeConfig.defaultCachingTimeoutSeconds);
        this.storeName = pnplibconfig_1.RuntimeConfig.defaultCachingStore;
    }
    Object.defineProperty(CachingOptions.prototype, "store", {
        get: function () {
            if (this.storeName === "local") {
                return CachingOptions.storage.local;
            }
            else {
                return CachingOptions.storage.session;
            }
        },
        enumerable: true,
        configurable: true
    });
    CachingOptions.storage = new storage_1.PnPClientStorage();
    return CachingOptions;
}());
exports.CachingOptions = CachingOptions;
var CachingParserWrapper = /** @class */ (function () {
    function CachingParserWrapper(_parser, _cacheOptions) {
        this._parser = _parser;
        this._cacheOptions = _cacheOptions;
    }
    CachingParserWrapper.prototype.parse = function (response) {
        var _this = this;
        // add this to the cache based on the options
        return this._parser.parse(response).then(function (data) {
            if (_this._cacheOptions.store !== null) {
                _this._cacheOptions.store.put(_this._cacheOptions.key, data, _this._cacheOptions.expiration);
            }
            return data;
        });
    };
    return CachingParserWrapper;
}());
exports.CachingParserWrapper = CachingParserWrapper;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var SearchSuggest = /** @class */ (function (_super) {
    __extends(SearchSuggest, _super);
    function SearchSuggest(baseUrl, path) {
        if (path === void 0) { path = "_api/search/suggest"; }
        return _super.call(this, baseUrl, path) || this;
    }
    SearchSuggest.prototype.execute = function (query) {
        this.mapQueryToQueryString(query);
        return this.get().then(function (response) { return new SearchSuggestResult(response); });
    };
    SearchSuggest.prototype.mapQueryToQueryString = function (query) {
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
    };
    return SearchSuggest;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.SearchSuggest = SearchSuggest;
var SearchSuggestResult = /** @class */ (function () {
    function SearchSuggestResult(json) {
        if (json.hasOwnProperty("suggest")) {
            // verbose
            this.PeopleNames = json.suggest.PeopleNames.results;
            this.PersonalResults = json.suggest.PersonalResults.results;
            this.Queries = json.suggest.Queries.results;
        }
        else {
            this.PeopleNames = json.PeopleNames;
            this.PersonalResults = json.PersonalResults;
            this.Queries = json.Queries;
        }
    }
    return SearchSuggestResult;
}());
exports.SearchSuggestResult = SearchSuggestResult;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var webs_1 = __webpack_require__(11);
var usercustomactions_1 = __webpack_require__(25);
var odata_1 = __webpack_require__(5);
var batch_1 = __webpack_require__(37);
var features_1 = __webpack_require__(38);
/**
 * Describes a site collection
 *
 */
var Site = /** @class */ (function (_super) {
    __extends(Site, _super);
    /**
     * Creates a new instance of the Site class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this site collection
     */
    function Site(baseUrl, path) {
        if (path === void 0) { path = "_api/site"; }
        return _super.call(this, baseUrl, path) || this;
    }
    Object.defineProperty(Site.prototype, "rootWeb", {
        /**
         * Gets the root web of the site collection
         *
         */
        get: function () {
            return new webs_1.Web(this, "rootweb");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Site.prototype, "features", {
        /**
         * Gets the active features for this site collection
         *
         */
        get: function () {
            return new features_1.Features(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Site.prototype, "userCustomActions", {
        /**
         * Gets all custom actions for this site collection
         *
         */
        get: function () {
            return new usercustomactions_1.UserCustomActions(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the context information for this site collection
     */
    Site.prototype.getContextInfo = function () {
        var q = new Site(this.parentUrl, "_api/contextinfo");
        return q.postCore().then(function (data) {
            if (data.hasOwnProperty("GetContextWebInformation")) {
                var info = data.GetContextWebInformation;
                info.SupportedSchemaVersions = info.SupportedSchemaVersions.results;
                return info;
            }
            else {
                return data;
            }
        });
    };
    /**
     * Gets the document libraries on a site. Static method. (SharePoint Online only)
     *
     * @param absoluteWebUrl The absolute url of the web whose document libraries should be returned
     */
    Site.prototype.getDocumentLibraries = function (absoluteWebUrl) {
        var q = new sharepointqueryable_1.SharePointQueryable("", "_api/sp.web.getdocumentlibraries(@v)");
        q.query.add("@v", "'" + absoluteWebUrl + "'");
        return q.get().then(function (data) {
            if (data.hasOwnProperty("GetDocumentLibraries")) {
                return data.GetDocumentLibraries;
            }
            else {
                return data;
            }
        });
    };
    /**
     * Gets the site url from a page url
     *
     * @param absolutePageUrl The absolute url of the page
     */
    Site.prototype.getWebUrlFromPageUrl = function (absolutePageUrl) {
        var q = new sharepointqueryable_1.SharePointQueryable("", "_api/sp.web.getweburlfrompageurl(@v)");
        q.query.add("@v", "'" + absolutePageUrl + "'");
        return q.get().then(function (data) {
            if (data.hasOwnProperty("GetWebUrlFromPageUrl")) {
                return data.GetWebUrlFromPageUrl;
            }
            else {
                return data;
            }
        });
    };
    /**
     * Creates a new batch for requests within the context of this site collection
     *
     */
    Site.prototype.createBatch = function () {
        return new batch_1.ODataBatch(this.parentUrl);
    };
    /**
     * Opens a web by id (using POST)
     *
     * @param webId The GUID id of the web to open
     */
    Site.prototype.openWebById = function (webId) {
        return this.clone(Site, "openWebById('" + webId + "')").postCore().then(function (d) {
            return {
                data: d,
                web: webs_1.Web.fromUrl(odata_1.spExtractODataId(d)),
            };
        });
    };
    return Site;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.Site = Site;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var webs_1 = __webpack_require__(11);
var roles_1 = __webpack_require__(22);
var types_1 = __webpack_require__(17);
var sharepointqueryable_1 = __webpack_require__(1);
var SharePointQueryableSecurable = /** @class */ (function (_super) {
    __extends(SharePointQueryableSecurable, _super);
    function SharePointQueryableSecurable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SharePointQueryableSecurable.prototype, "roleAssignments", {
        /**
         * Gets the set of role assignments for this item
         *
         */
        get: function () {
            return new roles_1.RoleAssignments(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SharePointQueryableSecurable.prototype, "firstUniqueAncestorSecurableObject", {
        /**
         * Gets the closest securable up the security hierarchy whose permissions are applied to this list item
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryableInstance(this, "FirstUniqueAncestorSecurableObject");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the effective permissions for the user supplied
     *
     * @param loginName The claims username for the user (ex: i:0#.f|membership|user@domain.com)
     */
    SharePointQueryableSecurable.prototype.getUserEffectivePermissions = function (loginName) {
        var q = this.clone(sharepointqueryable_1.SharePointQueryable, "getUserEffectivePermissions(@user)");
        q.query.add("@user", "'" + encodeURIComponent(loginName) + "'");
        return q.get().then(function (r) {
            // handle verbose mode
            return r.hasOwnProperty("GetUserEffectivePermissions") ? r.GetUserEffectivePermissions : r;
        });
    };
    /**
     * Gets the effective permissions for the current user
     */
    SharePointQueryableSecurable.prototype.getCurrentUserEffectivePermissions = function () {
        var _this = this;
        var w = webs_1.Web.fromUrl(this.toUrl());
        return w.currentUser.select("LoginName").getAs().then(function (user) {
            return _this.getUserEffectivePermissions(user.LoginName);
        });
    };
    /**
     * Breaks the security inheritance at this level optinally copying permissions and clearing subscopes
     *
     * @param copyRoleAssignments If true the permissions are copied from the current parent scope
     * @param clearSubscopes Optional. true to make all child securable objects inherit role assignments from the current object
     */
    SharePointQueryableSecurable.prototype.breakRoleInheritance = function (copyRoleAssignments, clearSubscopes) {
        if (copyRoleAssignments === void 0) { copyRoleAssignments = false; }
        if (clearSubscopes === void 0) { clearSubscopes = false; }
        return this.clone(SharePointQueryableSecurable, "breakroleinheritance(copyroleassignments=" + copyRoleAssignments + ", clearsubscopes=" + clearSubscopes + ")").postCore();
    };
    /**
     * Removes the local role assignments so that it re-inherit role assignments from the parent object.
     *
     */
    SharePointQueryableSecurable.prototype.resetRoleInheritance = function () {
        return this.clone(SharePointQueryableSecurable, "resetroleinheritance").postCore();
    };
    /**
     * Determines if a given user has the appropriate permissions
     *
     * @param loginName The user to check
     * @param permission The permission being checked
     */
    SharePointQueryableSecurable.prototype.userHasPermissions = function (loginName, permission) {
        var _this = this;
        return this.getUserEffectivePermissions(loginName).then(function (perms) {
            return _this.hasPermissions(perms, permission);
        });
    };
    /**
     * Determines if the current user has the requested permissions
     *
     * @param permission The permission we wish to check
     */
    SharePointQueryableSecurable.prototype.currentUserHasPermissions = function (permission) {
        var _this = this;
        return this.getCurrentUserEffectivePermissions().then(function (perms) {
            return _this.hasPermissions(perms, permission);
        });
    };
    /**
     * Taken from sp.js, checks the supplied permissions against the mask
     *
     * @param value The security principal's permissions on the given object
     * @param perm The permission checked against the value
     */
    /* tslint:disable:no-bitwise */
    SharePointQueryableSecurable.prototype.hasPermissions = function (value, perm) {
        if (!perm) {
            return true;
        }
        if (perm === types_1.PermissionKind.FullMask) {
            return (value.High & 32767) === 32767 && value.Low === 65535;
        }
        perm = perm - 1;
        var num = 1;
        if (perm >= 0 && perm < 32) {
            num = num << perm;
            return 0 !== (value.Low & num);
        }
        else if (perm >= 32 && perm < 64) {
            num = num << perm - 32;
            return 0 !== (value.High & num);
        }
        return false;
    };
    return SharePointQueryableSecurable;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.SharePointQueryableSecurable = SharePointQueryableSecurable;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var sitegroups_1 = __webpack_require__(23);
var util_1 = __webpack_require__(0);
/**
 * Describes a collection of all site collection users
 *
 */
var SiteUsers = /** @class */ (function (_super) {
    __extends(SiteUsers, _super);
    /**
     * Creates a new instance of the SiteUsers class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this user collection
     */
    function SiteUsers(baseUrl, path) {
        if (path === void 0) { path = "siteusers"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a user from the collection by email
     *
     * @param email The email address of the user to retrieve
     */
    SiteUsers.prototype.getByEmail = function (email) {
        return new SiteUser(this, "getByEmail('" + email + "')");
    };
    /**
     * Gets a user from the collection by id
     *
     * @param id The id of the user to retrieve
     */
    SiteUsers.prototype.getById = function (id) {
        return new SiteUser(this, "getById(" + id + ")");
    };
    /**
     * Gets a user from the collection by login name
     *
     * @param loginName The login name of the user to retrieve
     */
    SiteUsers.prototype.getByLoginName = function (loginName) {
        var su = new SiteUser(this);
        su.concat("('!@v::" + encodeURIComponent(loginName) + "')");
        return su;
    };
    /**
     * Removes a user from the collection by id
     *
     * @param id The id of the user to remove
     */
    SiteUsers.prototype.removeById = function (id) {
        return this.clone(SiteUsers, "removeById(" + id + ")").postCore();
    };
    /**
     * Removes a user from the collection by login name
     *
     * @param loginName The login name of the user to remove
     */
    SiteUsers.prototype.removeByLoginName = function (loginName) {
        var o = this.clone(SiteUsers, "removeByLoginName(@v)");
        o.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
        return o.postCore();
    };
    /**
     * Adds a user to a group
     *
     * @param loginName The login name of the user to add to the group
     *
     */
    SiteUsers.prototype.add = function (loginName) {
        var _this = this;
        return this.clone(SiteUsers, null).postCore({
            body: JSON.stringify({ "__metadata": { "type": "SP.User" }, LoginName: loginName }),
        }).then(function () { return _this.getByLoginName(loginName); });
    };
    return SiteUsers;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.SiteUsers = SiteUsers;
/**
 * Describes a single user
 *
 */
var SiteUser = /** @class */ (function (_super) {
    __extends(SiteUser, _super);
    function SiteUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SiteUser.prototype, "groups", {
        /**
         * Gets the groups for this user
         *
         */
        get: function () {
            return new sitegroups_1.SiteGroups(this, "groups");
        },
        enumerable: true,
        configurable: true
    });
    /**
    * Updates this user instance with the supplied properties
    *
    * @param properties A plain object of property names and values to update for the user
    */
    SiteUser.prototype.update = function (properties) {
        var _this = this;
        var postBody = util_1.Util.extend({ "__metadata": { "type": "SP.User" } }, properties);
        return this.postCore({
            body: JSON.stringify(postBody),
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            return {
                data: data,
                user: _this,
            };
        });
    };
    /**
     * Delete this user
     *
     */
    SiteUser.prototype.delete = function () {
        return this.postCore({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    return SiteUser;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.SiteUser = SiteUser;
/**
 * Represents the current user
 */
var CurrentUser = /** @class */ (function (_super) {
    __extends(CurrentUser, _super);
    function CurrentUser(baseUrl, path) {
        if (path === void 0) { path = "currentuser"; }
        return _super.call(this, baseUrl, path) || this;
    }
    return CurrentUser;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.CurrentUser = CurrentUser;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var LimitedWebPartManager = /** @class */ (function (_super) {
    __extends(LimitedWebPartManager, _super);
    function LimitedWebPartManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LimitedWebPartManager.prototype, "webparts", {
        /**
         * Gets the set of web part definitions contained by this web part manager
         *
         */
        get: function () {
            return new WebPartDefinitions(this, "webparts");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Exports a webpart definition
     *
     * @param id the GUID id of the definition to export
     */
    LimitedWebPartManager.prototype.export = function (id) {
        return this.clone(LimitedWebPartManager, "ExportWebPart").postCore({
            body: JSON.stringify({ webPartId: id }),
        });
    };
    /**
     * Imports a webpart
     *
     * @param xml webpart definition which must be valid XML in the .dwp or .webpart format
     */
    LimitedWebPartManager.prototype.import = function (xml) {
        return this.clone(LimitedWebPartManager, "ImportWebPart").postCore({
            body: JSON.stringify({ webPartXml: xml }),
        });
    };
    return LimitedWebPartManager;
}(sharepointqueryable_1.SharePointQueryable));
exports.LimitedWebPartManager = LimitedWebPartManager;
var WebPartDefinitions = /** @class */ (function (_super) {
    __extends(WebPartDefinitions, _super);
    function WebPartDefinitions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a web part definition from the collection by id
     *
     * @param id The storage ID of the SPWebPartDefinition to retrieve
     */
    WebPartDefinitions.prototype.getById = function (id) {
        return new WebPartDefinition(this, "getbyid('" + id + "')");
    };
    /**
     * Gets a web part definition from the collection by storage id
     *
     * @param id The WebPart.ID of the SPWebPartDefinition to retrieve
     */
    WebPartDefinitions.prototype.getByControlId = function (id) {
        return new WebPartDefinition(this, "getByControlId('" + id + "')");
    };
    return WebPartDefinitions;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.WebPartDefinitions = WebPartDefinitions;
var WebPartDefinition = /** @class */ (function (_super) {
    __extends(WebPartDefinition, _super);
    function WebPartDefinition() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WebPartDefinition.prototype, "webpart", {
        /**
         * Gets the webpart information associated with this definition
         */
        get: function () {
            return new WebPart(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Saves changes to the Web Part made using other properties and methods on the SPWebPartDefinition object
     */
    WebPartDefinition.prototype.saveChanges = function () {
        return this.clone(WebPartDefinition, "SaveWebPartChanges").postCore();
    };
    /**
     * Moves the Web Part to a different location on a Web Part Page
     *
     * @param zoneId The ID of the Web Part Zone to which to move the Web Part
     * @param zoneIndex A Web Part zone index that specifies the position at which the Web Part is to be moved within the destination Web Part zone
     */
    WebPartDefinition.prototype.moveTo = function (zoneId, zoneIndex) {
        return this.clone(WebPartDefinition, "MoveWebPartTo(zoneID='" + zoneId + "', zoneIndex=" + zoneIndex + ")").postCore();
    };
    /**
     * Closes the Web Part. If the Web Part is already closed, this method does nothing
     */
    WebPartDefinition.prototype.close = function () {
        return this.clone(WebPartDefinition, "CloseWebPart").postCore();
    };
    /**
     * Opens the Web Part. If the Web Part is already closed, this method does nothing
     */
    WebPartDefinition.prototype.open = function () {
        return this.clone(WebPartDefinition, "OpenWebPart").postCore();
    };
    /**
     * Removes a webpart from a page, all settings will be lost
     */
    WebPartDefinition.prototype.delete = function () {
        return this.clone(WebPartDefinition, "DeleteWebPart").postCore();
    };
    return WebPartDefinition;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.WebPartDefinition = WebPartDefinition;
var WebPart = /** @class */ (function (_super) {
    __extends(WebPart, _super);
    /**
     * Creates a new instance of the WebPart class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     * @param path Optional, if supplied will be appended to the supplied baseUrl
     */
    function WebPart(baseUrl, path) {
        if (path === void 0) { path = "webpart"; }
        return _super.call(this, baseUrl, path) || this;
    }
    return WebPart;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.WebPart = WebPart;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var util_1 = __webpack_require__(0);
var types_1 = __webpack_require__(17);
/**
 * Describes a collection of Field objects
 *
 */
var Fields = /** @class */ (function (_super) {
    __extends(Fields, _super);
    /**
     * Creates a new instance of the Fields class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    function Fields(baseUrl, path) {
        if (path === void 0) { path = "fields"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a field from the collection by title
     *
     * @param title The case-sensitive title of the field
     */
    Fields.prototype.getByTitle = function (title) {
        return new Field(this, "getByTitle('" + title + "')");
    };
    /**
     * Gets a field from the collection by using internal name or title
     *
     * @param name The case-sensitive internal name or title of the field
     */
    Fields.prototype.getByInternalNameOrTitle = function (name) {
        return new Field(this, "getByInternalNameOrTitle('" + name + "')");
    };
    /**
     * Gets a list from the collection by guid id
     *
     * @param title The Id of the list
     */
    Fields.prototype.getById = function (id) {
        var f = new Field(this);
        f.concat("('" + id + "')");
        return f;
    };
    /**
     * Creates a field based on the specified schema
     */
    Fields.prototype.createFieldAsXml = function (xml) {
        var _this = this;
        var info;
        if (typeof xml === "string") {
            info = { SchemaXml: xml };
        }
        else {
            info = xml;
        }
        var postBody = JSON.stringify({
            "parameters": util_1.Util.extend({
                "__metadata": {
                    "type": "SP.XmlSchemaFieldCreationInformation",
                },
            }, info),
        });
        return this.clone(Fields, "createfieldasxml").postAsCore({ body: postBody }).then(function (data) {
            return {
                data: data,
                field: _this.getById(data.Id),
            };
        });
    };
    /**
     * Adds a new list to the collection
     *
     * @param title The new field's title
     * @param fieldType The new field's type (ex: SP.FieldText)
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.add = function (title, fieldType, properties) {
        var _this = this;
        if (properties === void 0) { properties = {}; }
        var postBody = JSON.stringify(util_1.Util.extend({
            "Title": title,
            "__metadata": { "type": fieldType },
        }, properties));
        return this.clone(Fields, null).postAsCore({ body: postBody }).then(function (data) {
            return {
                data: data,
                field: _this.getById(data.Id),
            };
        });
    };
    /**
     * Adds a new SP.FieldText to the collection
     *
     * @param title The field title
     * @param maxLength The maximum number of characters allowed in the value of the field.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.addText = function (title, maxLength, properties) {
        if (maxLength === void 0) { maxLength = 255; }
        var props = {
            FieldTypeKind: 2,
            MaxLength: maxLength,
        };
        return this.add(title, "SP.FieldText", util_1.Util.extend(props, properties));
    };
    /**
     * Adds a new SP.FieldCalculated to the collection
     *
     * @param title The field title.
     * @param formula The formula for the field.
     * @param dateFormat The date and time format that is displayed in the field.
     * @param outputType Specifies the output format for the field. Represents a FieldType value.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.addCalculated = function (title, formula, dateFormat, outputType, properties) {
        if (outputType === void 0) { outputType = types_1.FieldTypes.Text; }
        var props = {
            DateFormat: dateFormat,
            FieldTypeKind: 17,
            Formula: formula,
            OutputType: outputType,
        };
        return this.add(title, "SP.FieldCalculated", util_1.Util.extend(props, properties));
    };
    /**
     * Adds a new SP.FieldDateTime to the collection
     *
     * @param title The field title
     * @param displayFormat The format of the date and time that is displayed in the field.
     * @param calendarType Specifies the calendar type of the field.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.addDateTime = function (title, displayFormat, calendarType, friendlyDisplayFormat, properties) {
        if (displayFormat === void 0) { displayFormat = types_1.DateTimeFieldFormatType.DateOnly; }
        if (calendarType === void 0) { calendarType = types_1.CalendarType.Gregorian; }
        if (friendlyDisplayFormat === void 0) { friendlyDisplayFormat = 0; }
        var props = {
            DateTimeCalendarType: calendarType,
            DisplayFormat: displayFormat,
            FieldTypeKind: 4,
            FriendlyDisplayFormat: friendlyDisplayFormat,
        };
        return this.add(title, "SP.FieldDateTime", util_1.Util.extend(props, properties));
    };
    /**
     * Adds a new SP.FieldNumber to the collection
     *
     * @param title The field title
     * @param minValue The field's minimum value
     * @param maxValue The field's maximum value
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.addNumber = function (title, minValue, maxValue, properties) {
        var props = { FieldTypeKind: 9 };
        if (typeof minValue !== "undefined") {
            props = util_1.Util.extend({ MinimumValue: minValue }, props);
        }
        if (typeof maxValue !== "undefined") {
            props = util_1.Util.extend({ MaximumValue: maxValue }, props);
        }
        return this.add(title, "SP.FieldNumber", util_1.Util.extend(props, properties));
    };
    /**
     * Adds a new SP.FieldCurrency to the collection
     *
     * @param title The field title
     * @param minValue The field's minimum value
     * @param maxValue The field's maximum value
     * @param currencyLocalId Specifies the language code identifier (LCID) used to format the value of the field
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.addCurrency = function (title, minValue, maxValue, currencyLocalId, properties) {
        if (currencyLocalId === void 0) { currencyLocalId = 1033; }
        var props = {
            CurrencyLocaleId: currencyLocalId,
            FieldTypeKind: 10,
        };
        if (typeof minValue !== "undefined") {
            props = util_1.Util.extend({ MinimumValue: minValue }, props);
        }
        if (typeof maxValue !== "undefined") {
            props = util_1.Util.extend({ MaximumValue: maxValue }, props);
        }
        return this.add(title, "SP.FieldCurrency", util_1.Util.extend(props, properties));
    };
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
    Fields.prototype.addMultilineText = function (title, numberOfLines, richText, restrictedMode, appendOnly, allowHyperlink, properties) {
        if (numberOfLines === void 0) { numberOfLines = 6; }
        if (richText === void 0) { richText = true; }
        if (restrictedMode === void 0) { restrictedMode = false; }
        if (appendOnly === void 0) { appendOnly = false; }
        if (allowHyperlink === void 0) { allowHyperlink = true; }
        var props = {
            AllowHyperlink: allowHyperlink,
            AppendOnly: appendOnly,
            FieldTypeKind: 3,
            NumberOfLines: numberOfLines,
            RestrictedMode: restrictedMode,
            RichText: richText,
        };
        return this.add(title, "SP.FieldMultiLineText", util_1.Util.extend(props, properties));
    };
    /**
     * Adds a new SP.FieldUrl to the collection
     *
     * @param title The field title
     */
    Fields.prototype.addUrl = function (title, displayFormat, properties) {
        if (displayFormat === void 0) { displayFormat = types_1.UrlFieldFormatType.Hyperlink; }
        var props = {
            DisplayFormat: displayFormat,
            FieldTypeKind: 11,
        };
        return this.add(title, "SP.FieldUrl", util_1.Util.extend(props, properties));
    };
    return Fields;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.Fields = Fields;
/**
 * Describes a single of Field instance
 *
 */
var Field = /** @class */ (function (_super) {
    __extends(Field, _super);
    function Field() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Updates this field intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param fieldType The type value, required to update child field type properties
     */
    Field.prototype.update = function (properties, fieldType) {
        var _this = this;
        if (fieldType === void 0) { fieldType = "SP.Field"; }
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": fieldType },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            return {
                data: data,
                field: _this,
            };
        });
    };
    /**
     * Delete this fields
     *
     */
    Field.prototype.delete = function () {
        return this.postCore({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    /**
     * Sets the value of the ShowInDisplayForm property for this field.
     */
    Field.prototype.setShowInDisplayForm = function (show) {
        return this.clone(Field, "setshowindisplayform(" + show + ")").postCore();
    };
    /**
     * Sets the value of the ShowInEditForm property for this field.
     */
    Field.prototype.setShowInEditForm = function (show) {
        return this.clone(Field, "setshowineditform(" + show + ")").postCore();
    };
    /**
     * Sets the value of the ShowInNewForm property for this field.
     */
    Field.prototype.setShowInNewForm = function (show) {
        return this.clone(Field, "setshowinnewform(" + show + ")").postCore();
    };
    return Field;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.Field = Field;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var sharepointqueryable_1 = __webpack_require__(1);
/**
 * Represents a collection of navigation nodes
 *
 */
var NavigationNodes = /** @class */ (function (_super) {
    __extends(NavigationNodes, _super);
    function NavigationNodes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a navigation node by id
     *
     * @param id The id of the node
     */
    NavigationNodes.prototype.getById = function (id) {
        var node = new NavigationNode(this);
        node.concat("(" + id + ")");
        return node;
    };
    /**
     * Adds a new node to the collection
     *
     * @param title Display name of the node
     * @param url The url of the node
     * @param visible If true the node is visible, otherwise it is hidden (default: true)
     */
    NavigationNodes.prototype.add = function (title, url, visible) {
        var _this = this;
        if (visible === void 0) { visible = true; }
        var postBody = JSON.stringify({
            IsVisible: visible,
            Title: title,
            Url: url,
            "__metadata": { "type": "SP.NavigationNode" },
        });
        return this.clone(NavigationNodes, null).postCore({ body: postBody }).then(function (data) {
            return {
                data: data,
                node: _this.getById(data.Id),
            };
        });
    };
    /**
     * Moves a node to be after another node in the navigation
     *
     * @param nodeId Id of the node to move
     * @param previousNodeId Id of the node after which we move the node specified by nodeId
     */
    NavigationNodes.prototype.moveAfter = function (nodeId, previousNodeId) {
        var postBody = JSON.stringify({
            nodeId: nodeId,
            previousNodeId: previousNodeId,
        });
        return this.clone(NavigationNodes, "MoveAfter").postCore({ body: postBody });
    };
    return NavigationNodes;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.NavigationNodes = NavigationNodes;
/**
 * Represents an instance of a navigation node
 *
 */
var NavigationNode = /** @class */ (function (_super) {
    __extends(NavigationNode, _super);
    function NavigationNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NavigationNode.prototype, "children", {
        /**
         * Represents the child nodes of this node
         */
        get: function () {
            return new NavigationNodes(this, "Children");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates this node based on the supplied properties
     *
     * @param properties The hash of key/value pairs to update
     */
    NavigationNode.prototype.update = function (properties) {
        var _this = this;
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": "SP.NavigationNode" },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            return {
                data: data,
                node: _this,
            };
        });
    };
    /**
     * Deletes this node and any child nodes
     */
    NavigationNode.prototype.delete = function () {
        return _super.prototype.deleteCore.call(this);
    };
    return NavigationNode;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.NavigationNode = NavigationNode;
/**
 * Exposes the navigation components
 *
 */
var Navigation = /** @class */ (function (_super) {
    __extends(Navigation, _super);
    /**
     * Creates a new instance of the Navigation class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of these navigation components
     */
    function Navigation(baseUrl, path) {
        if (path === void 0) { path = "navigation"; }
        return _super.call(this, baseUrl, path) || this;
    }
    Object.defineProperty(Navigation.prototype, "quicklaunch", {
        /**
         * Gets the quicklaunch navigation nodes for the current context
         *
         */
        get: function () {
            return new NavigationNodes(this, "quicklaunch");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Navigation.prototype, "topNavigationBar", {
        /**
         * Gets the top bar navigation nodes for the current context
         *
         */
        get: function () {
            return new NavigationNodes(this, "topnavigationbar");
        },
        enumerable: true,
        configurable: true
    });
    return Navigation;
}(sharepointqueryable_1.SharePointQueryable));
exports.Navigation = Navigation;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var logging_1 = __webpack_require__(4);
var httpclient_1 = __webpack_require__(21);
var utils_1 = __webpack_require__(10);
var pnplibconfig_1 = __webpack_require__(3);
var exceptions_1 = __webpack_require__(2);
/**
 * Manages a batch of OData operations
 */
var ODataBatch = /** @class */ (function () {
    function ODataBatch(baseUrl, _batchId) {
        if (_batchId === void 0) { _batchId = util_1.Util.getGUID(); }
        this.baseUrl = baseUrl;
        this._batchId = _batchId;
        this._requests = [];
        this._dependencies = [];
    }
    Object.defineProperty(ODataBatch.prototype, "batchId", {
        get: function () {
            return this._batchId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a request to a batch (not designed for public use)
     *
     * @param url The full url of the request
     * @param method The http method GET, POST, etc
     * @param options Any options to include in the request
     * @param parser The parser that will hadle the results of the request
     */
    ODataBatch.prototype.add = function (url, method, options, parser) {
        var info = {
            method: method.toUpperCase(),
            options: options,
            parser: parser,
            reject: null,
            resolve: null,
            url: url,
        };
        var p = new Promise(function (resolve, reject) {
            info.resolve = resolve;
            info.reject = reject;
        });
        this._requests.push(info);
        return p;
    };
    /**
     * Adds a dependency insuring that some set of actions will occur before a batch is processed.
     * MUST be cleared using the returned resolve delegate to allow batches to run
     */
    ODataBatch.prototype.addDependency = function () {
        var resolver;
        var promise = new Promise(function (resolve) {
            resolver = resolve;
        });
        this._dependencies.push(promise);
        return resolver;
    };
    /**
     * Execute the current batch and resolve the associated promises
     *
     * @returns A promise which will be resolved once all of the batch's child promises have resolved
     */
    ODataBatch.prototype.execute = function () {
        var _this = this;
        // we need to check the dependencies twice due to how different engines handle things.
        // We can get a second set of promises added after the first set resolve
        return Promise.all(this._dependencies).then(function () { return Promise.all(_this._dependencies); }).then(function () { return _this.executeImpl(); });
    };
    ODataBatch.prototype.executeImpl = function () {
        var _this = this;
        logging_1.Logger.write("[" + this.batchId + "] (" + (new Date()).getTime() + ") Executing batch with " + this._requests.length + " requests.", logging_1.LogLevel.Info);
        // if we don't have any requests, don't bother sending anything
        // this could be due to caching further upstream, or just an empty batch
        if (this._requests.length < 1) {
            logging_1.Logger.write("Resolving empty batch.", logging_1.LogLevel.Info);
            return Promise.resolve();
        }
        // creating the client here allows the url to be populated for nodejs client as well as potentially
        // any other hacks needed for other types of clients. Essentially allows the absoluteRequestUrl
        // below to be correct
        var client = new httpclient_1.HttpClient();
        // due to timing we need to get the absolute url here so we can use it for all the individual requests
        // and for sending the entire batch
        return util_1.Util.toAbsoluteUrl(this.baseUrl).then(function (absoluteRequestUrl) {
            // build all the requests, send them, pipe results in order to parsers
            var batchBody = [];
            var currentChangeSetId = "";
            for (var i = 0; i < _this._requests.length; i++) {
                var reqInfo = _this._requests[i];
                if (reqInfo.method === "GET") {
                    if (currentChangeSetId.length > 0) {
                        // end an existing change set
                        batchBody.push("--changeset_" + currentChangeSetId + "--\n\n");
                        currentChangeSetId = "";
                    }
                    batchBody.push("--batch_" + _this._batchId + "\n");
                }
                else {
                    if (currentChangeSetId.length < 1) {
                        // start new change set
                        currentChangeSetId = util_1.Util.getGUID();
                        batchBody.push("--batch_" + _this._batchId + "\n");
                        batchBody.push("Content-Type: multipart/mixed; boundary=\"changeset_" + currentChangeSetId + "\"\n\n");
                    }
                    batchBody.push("--changeset_" + currentChangeSetId + "\n");
                }
                // common batch part prefix
                batchBody.push("Content-Type: application/http\n");
                batchBody.push("Content-Transfer-Encoding: binary\n\n");
                var headers = new Headers();
                // this is the url of the individual request within the batch
                var url = util_1.Util.isUrlAbsolute(reqInfo.url) ? reqInfo.url : util_1.Util.combinePaths(absoluteRequestUrl, reqInfo.url);
                logging_1.Logger.write("[" + _this.batchId + "] (" + (new Date()).getTime() + ") Adding request " + reqInfo.method + " " + url + " to batch.", logging_1.LogLevel.Verbose);
                if (reqInfo.method !== "GET") {
                    var method = reqInfo.method;
                    if (reqInfo.hasOwnProperty("options") && reqInfo.options.hasOwnProperty("headers") && typeof reqInfo.options.headers["X-HTTP-Method"] !== "undefined") {
                        method = reqInfo.options.headers["X-HTTP-Method"];
                        delete reqInfo.options.headers["X-HTTP-Method"];
                    }
                    batchBody.push(method + " " + url + " HTTP/1.1\n");
                    headers.set("Content-Type", "application/json;odata=verbose;charset=utf-8");
                }
                else {
                    batchBody.push(reqInfo.method + " " + url + " HTTP/1.1\n");
                }
                // merge global config headers
                utils_1.mergeHeaders(headers, pnplibconfig_1.RuntimeConfig.spHeaders);
                // merge per-request headers
                if (reqInfo.options) {
                    utils_1.mergeHeaders(headers, reqInfo.options.headers);
                }
                // lastly we apply any default headers we need that may not exist
                if (!headers.has("Accept")) {
                    headers.append("Accept", "application/json");
                }
                if (!headers.has("Content-Type")) {
                    headers.append("Content-Type", "application/json;odata=verbose;charset=utf-8");
                }
                if (!headers.has("X-ClientService-ClientTag")) {
                    headers.append("X-ClientService-ClientTag", "PnPCoreJS:3.0.2");
                }
                // write headers into batch body
                headers.forEach(function (value, name) {
                    batchBody.push(name + ": " + value + "\n");
                });
                batchBody.push("\n");
                if (reqInfo.options.body) {
                    batchBody.push(reqInfo.options.body + "\n\n");
                }
            }
            if (currentChangeSetId.length > 0) {
                // Close the changeset
                batchBody.push("--changeset_" + currentChangeSetId + "--\n\n");
                currentChangeSetId = "";
            }
            batchBody.push("--batch_" + _this._batchId + "--\n");
            var batchHeaders = {
                "Content-Type": "multipart/mixed; boundary=batch_" + _this._batchId,
            };
            var batchOptions = {
                "body": batchBody.join(""),
                "headers": batchHeaders,
                "method": "POST",
            };
            logging_1.Logger.write("[" + _this.batchId + "] (" + (new Date()).getTime() + ") Sending batch request.", logging_1.LogLevel.Info);
            return client.fetch(util_1.Util.combinePaths(absoluteRequestUrl, "/_api/$batch"), batchOptions)
                .then(function (r) { return r.text(); })
                .then(_this._parseResponse)
                .then(function (responses) {
                if (responses.length !== _this._requests.length) {
                    throw new exceptions_1.BatchParseException("Could not properly parse responses to match requests in batch.");
                }
                logging_1.Logger.write("[" + _this.batchId + "] (" + (new Date()).getTime() + ") Resolving batched requests.", logging_1.LogLevel.Info);
                return responses.reduce(function (chain, response, index) {
                    var request = _this._requests[index];
                    logging_1.Logger.write("[" + _this.batchId + "] (" + (new Date()).getTime() + ") Resolving batched request " + request.method + " " + request.url + ".", logging_1.LogLevel.Verbose);
                    return chain.then(function (_) { return request.parser.parse(response).then(request.resolve).catch(request.reject); });
                }, Promise.resolve());
            });
        });
    };
    /**
     * Parses the response from a batch request into an array of Response instances
     *
     * @param body Text body of the response from the batch request
     */
    ODataBatch.prototype._parseResponse = function (body) {
        return new Promise(function (resolve, reject) {
            var responses = [];
            var header = "--batchresponse_";
            // Ex. "HTTP/1.1 500 Internal Server Error"
            var statusRegExp = new RegExp("^HTTP/[0-9.]+ +([0-9]+) +(.*)", "i");
            var lines = body.split("\n");
            var state = "batch";
            var status;
            var statusText;
            for (var i = 0; i < lines.length; ++i) {
                var line = lines[i];
                switch (state) {
                    case "batch":
                        if (line.substr(0, header.length) === header) {
                            state = "batchHeaders";
                        }
                        else {
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
                        responses.push((status === 204) ? new Response() : new Response(line, { status: status, statusText: statusText }));
                        state = "batch";
                        break;
                }
            }
            if (state !== "status") {
                reject(new exceptions_1.BatchParseException("Unexpected end of input"));
            }
            resolve(responses);
        });
    };
    return ODataBatch;
}());
exports.ODataBatch = ODataBatch;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
/**
 * Describes a collection of List objects
 *
 */
var Features = /** @class */ (function (_super) {
    __extends(Features, _super);
    /**
     * Creates a new instance of the Lists class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    function Features(baseUrl, path) {
        if (path === void 0) { path = "features"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a list from the collection by guid id
     *
     * @param id The Id of the feature (GUID)
     */
    Features.prototype.getById = function (id) {
        var feature = new Feature(this);
        feature.concat("('" + id + "')");
        return feature;
    };
    /**
     * Adds a new list to the collection
     *
     * @param id The Id of the feature (GUID)
     * @param force If true the feature activation will be forced
     */
    Features.prototype.add = function (id, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        return this.clone(Features, "add").postCore({
            body: JSON.stringify({
                featdefScope: 0,
                featureId: id,
                force: force,
            }),
        }).then(function (data) {
            return {
                data: data,
                feature: _this.getById(id),
            };
        });
    };
    /**
     * Removes (deactivates) a feature from the collection
     *
     * @param id The Id of the feature (GUID)
     * @param force If true the feature deactivation will be forced
     */
    Features.prototype.remove = function (id, force) {
        if (force === void 0) { force = false; }
        return this.clone(Features, "remove").postCore({
            body: JSON.stringify({
                featureId: id,
                force: force,
            }),
        });
    };
    return Features;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.Features = Features;
var Feature = /** @class */ (function (_super) {
    __extends(Feature, _super);
    function Feature() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Removes (deactivates) a feature from the collection
     *
     * @param force If true the feature deactivation will be forced
     */
    Feature.prototype.deactivate = function (force) {
        var _this = this;
        if (force === void 0) { force = false; }
        var removeDependency = this.addBatchDependency();
        var idGet = new Feature(this).select("DefinitionId");
        return idGet.getAs().then(function (feature) {
            var promise = _this.getParent(Features, _this.parentUrl, "", _this.batch).remove(feature.DefinitionId, force);
            removeDependency();
            return promise;
        });
    };
    return Feature;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.Feature = Feature;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var files_1 = __webpack_require__(9);
var odata_1 = __webpack_require__(5);
var util_1 = __webpack_require__(0);
/**
 * Represents an app catalog
 */
var AppCatalog = /** @class */ (function (_super) {
    __extends(AppCatalog, _super);
    function AppCatalog(baseUrl, path) {
        if (path === void 0) { path = "_api/web/tenantappcatalog/AvailableApps"; }
        var _this = this;
        // we need to handle the case of getting created from something that already has "_api/..." or does not
        var candidateUrl = "";
        if (typeof baseUrl === "string") {
            candidateUrl = baseUrl;
        }
        else if (typeof baseUrl !== "undefined") {
            candidateUrl = baseUrl.toUrl();
        }
        _this = _super.call(this, util_1.extractWebUrl(candidateUrl), path) || this;
        return _this;
    }
    /**
     * Get details of specific app from the app catalog
     * @param id - Specify the guid of the app
     */
    AppCatalog.prototype.getAppById = function (id) {
        return new App(this, "getById('" + id + "')");
    };
    /**
     * Uploads an app package. Not supported for batching
     *
     * @param filename Filename to create.
     * @param content app package data (eg: the .app or .sppkg file).
     * @param shouldOverWrite Should an app with the same name in the same location be overwritten? (default: true)
     * @returns Promise<AppAddResult>
     */
    AppCatalog.prototype.add = function (filename, content, shouldOverWrite) {
        if (shouldOverWrite === void 0) { shouldOverWrite = true; }
        // you don't add to the availableapps collection
        var adder = new AppCatalog(util_1.extractWebUrl(this.toUrl()), "_api/web/tenantappcatalog/add(overwrite=" + shouldOverWrite + ",url='" + filename + "')");
        return adder.postCore({
            body: content,
        }).then(function (r) {
            return {
                data: r,
                file: new files_1.File(odata_1.spExtractODataId(r)),
            };
        });
    };
    return AppCatalog;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.AppCatalog = AppCatalog;
/**
 * Represents the actions you can preform on a given app within the catalog
 */
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * This method deploys an app on the app catalog.  It must be called in the context
     * of the tenant app catalog web or it will fail.
     */
    App.prototype.deploy = function () {
        return this.clone(App, "Deploy").postCore();
    };
    /**
     * This method retracts a deployed app on the app catalog.  It must be called in the context
     * of the tenant app catalog web or it will fail.
     */
    App.prototype.retract = function () {
        return this.clone(App, "Retract").postCore();
    };
    /**
     * This method allows an app which is already deployed to be installed on a web
     */
    App.prototype.install = function () {
        return this.clone(App, "Install").postCore();
    };
    /**
     * This method allows an app which is already insatlled to be uninstalled on a web
     */
    App.prototype.uninstall = function () {
        return this.clone(App, "Uninstall").postCore();
    };
    /**
     * This method allows an app which is already insatlled to be upgraded on a web
     */
    App.prototype.upgrade = function () {
        return this.clone(App, "Upgrade").postCore();
    };
    /**
     * This method removes an app from the app catalog.  It must be called in the context
     * of the tenant app catalog web or it will fail.
     */
    App.prototype.remove = function () {
        return this.clone(App, "Remove").postCore();
    };
    return App;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.App = App;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var util_1 = __webpack_require__(0);
var files_1 = __webpack_require__(9);
var odata_1 = __webpack_require__(5);
/**
 * Allows for calling of the static SP.Utilities.Utility methods by supplying the method name
 */
var UtilityMethod = /** @class */ (function (_super) {
    __extends(UtilityMethod, _super);
    /**
     * Creates a new instance of the Utility method class
     *
     * @param baseUrl The parent url provider
     * @param methodName The static method name to call on the utility class
     */
    function UtilityMethod(baseUrl, methodName) {
        return _super.call(this, UtilityMethod.getBaseUrl(baseUrl), "_api/SP.Utilities.Utility." + methodName) || this;
    }
    UtilityMethod.getBaseUrl = function (candidate) {
        if (typeof candidate === "string") {
            return candidate;
        }
        var c = candidate;
        var url = c.toUrl();
        var index = url.indexOf("_api/");
        if (index < 0) {
            return url;
        }
        return url.substr(0, index);
    };
    UtilityMethod.prototype.excute = function (props) {
        return this.postAsCore({
            body: JSON.stringify(props),
        });
    };
    /**
     * Sends an email based on the supplied properties
     *
     * @param props The properties of the email to send
     */
    UtilityMethod.prototype.sendEmail = function (props) {
        var params = {
            properties: {
                Body: props.Body,
                From: props.From,
                Subject: props.Subject,
                "__metadata": { "type": "SP.Utilities.EmailProperties" },
            },
        };
        if (props.To && props.To.length > 0) {
            params.properties = util_1.Util.extend(params.properties, {
                To: { results: props.To },
            });
        }
        if (props.CC && props.CC.length > 0) {
            params.properties = util_1.Util.extend(params.properties, {
                CC: { results: props.CC },
            });
        }
        if (props.BCC && props.BCC.length > 0) {
            params.properties = util_1.Util.extend(params.properties, {
                BCC: { results: props.BCC },
            });
        }
        if (props.AdditionalHeaders) {
            params.properties = util_1.Util.extend(params.properties, {
                AdditionalHeaders: props.AdditionalHeaders,
            });
        }
        return this.clone(UtilityMethod, "SendEmail", true).excute(params);
    };
    UtilityMethod.prototype.getCurrentUserEmailAddresses = function () {
        return this.clone(UtilityMethod, "GetCurrentUserEmailAddresses", true).excute({});
    };
    UtilityMethod.prototype.resolvePrincipal = function (input, scopes, sources, inputIsEmailOnly, addToUserInfoList, matchUserInfoList) {
        if (matchUserInfoList === void 0) { matchUserInfoList = false; }
        var params = {
            addToUserInfoList: addToUserInfoList,
            input: input,
            inputIsEmailOnly: inputIsEmailOnly,
            matchUserInfoList: matchUserInfoList,
            scopes: scopes,
            sources: sources,
        };
        return this.clone(UtilityMethod, "ResolvePrincipalInCurrentContext", true).excute(params);
    };
    UtilityMethod.prototype.searchPrincipals = function (input, scopes, sources, groupName, maxCount) {
        var params = {
            groupName: groupName,
            input: input,
            maxCount: maxCount,
            scopes: scopes,
            sources: sources,
        };
        return this.clone(UtilityMethod, "SearchPrincipalsUsingContextWeb", true).excute(params);
    };
    UtilityMethod.prototype.createEmailBodyForInvitation = function (pageAddress) {
        var params = {
            pageAddress: pageAddress,
        };
        return this.clone(UtilityMethod, "CreateEmailBodyForInvitation", true).excute(params);
    };
    UtilityMethod.prototype.expandGroupsToPrincipals = function (inputs, maxCount) {
        if (maxCount === void 0) { maxCount = 30; }
        var params = {
            inputs: inputs,
            maxCount: maxCount,
        };
        return this.clone(UtilityMethod, "ExpandGroupsToPrincipals", true).excute(params);
    };
    UtilityMethod.prototype.createWikiPage = function (info) {
        return this.clone(UtilityMethod, "CreateWikiPageInContextWeb", true).excute({
            parameters: info,
        }).then(function (r) {
            return {
                data: r,
                file: new files_1.File(odata_1.spExtractODataId(r)),
            };
        });
    };
    return UtilityMethod;
}(sharepointqueryable_1.SharePointQueryable));
exports.UtilityMethod = UtilityMethod;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var pnplibconfig_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(10);
// import { APIUrlException } from "../utils/exceptions";
var GraphHttpClient = /** @class */ (function () {
    function GraphHttpClient() {
        this._impl = pnplibconfig_1.RuntimeConfig.graphFetchClientFactory();
    }
    GraphHttpClient.prototype.fetch = function (url, options) {
        if (options === void 0) { options = {}; }
        var headers = new Headers();
        // first we add the global headers so they can be overwritten by any passed in locally to this call
        utils_1.mergeHeaders(headers, pnplibconfig_1.RuntimeConfig.graphHeaders);
        // second we add the local options so we can overwrite the globals
        utils_1.mergeHeaders(headers, options.headers);
        var opts = util_1.Util.extend(options, { headers: headers });
        // TODO: we could process auth here
        return this.fetchRaw(url, opts);
    };
    GraphHttpClient.prototype.fetchRaw = function (url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        // here we need to normalize the headers
        var rawHeaders = new Headers();
        utils_1.mergeHeaders(rawHeaders, options.headers);
        options = util_1.Util.extend(options, { headers: rawHeaders });
        var retry = function (ctx) {
            _this._impl.fetch(url, {}, options).then(function (response) { return ctx.resolve(response); }).catch(function (response) {
                // Check if request was throttled - http status code 429
                // Check if request failed due to server unavailable - http status code 503
                if (response.status !== 429 && response.status !== 503) {
                    ctx.reject(response);
                }
                // grab our current delay
                var delay = ctx.delay;
                // Increment our counters.
                ctx.delay *= 2;
                ctx.attempts++;
                // If we have exceeded the retry count, reject.
                if (ctx.retryCount <= ctx.attempts) {
                    ctx.reject(response);
                }
                // Set our retry timeout for {delay} milliseconds.
                setTimeout(util_1.Util.getCtxCallback(_this, retry, ctx), delay);
            });
        };
        return new Promise(function (resolve, reject) {
            var retryContext = {
                attempts: 0,
                delay: 100,
                reject: reject,
                resolve: resolve,
                retryCount: 7,
            };
            retry.call(_this, retryContext);
        });
    };
    GraphHttpClient.prototype.get = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = util_1.Util.extend(options, { method: "GET" });
        return this.fetch(url, opts);
    };
    GraphHttpClient.prototype.post = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = util_1.Util.extend(options, { method: "POST" });
        return this.fetch(url, opts);
    };
    GraphHttpClient.prototype.patch = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = util_1.Util.extend(options, { method: "PATCH" });
        return this.fetch(url, opts);
    };
    GraphHttpClient.prototype.delete = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = util_1.Util.extend(options, { method: "DELETE" });
        return this.fetch(url, opts);
    };
    return GraphHttpClient;
}());
exports.GraphHttpClient = GraphHttpClient;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var storage = __webpack_require__(12);
var exceptions_1 = __webpack_require__(2);
/**
 * A caching provider which can wrap other non-caching providers
 *
 */
var CachingConfigurationProvider = /** @class */ (function () {
    /**
     * Creates a new caching configuration provider
     * @constructor
     * @param {IConfigurationProvider} wrappedProvider Provider which will be used to fetch the configuration
     * @param {string} cacheKey Key that will be used to store cached items to the cache
     * @param {IPnPClientStore} cacheStore OPTIONAL storage, which will be used to store cached settings.
     */
    function CachingConfigurationProvider(wrappedProvider, cacheKey, cacheStore) {
        this.wrappedProvider = wrappedProvider;
        this.store = (cacheStore) ? cacheStore : this.selectPnPCache();
        this.cacheKey = "_configcache_" + cacheKey;
    }
    /**
     * Gets the wrapped configuration providers
     *
     * @return {IConfigurationProvider} Wrapped configuration provider
     */
    CachingConfigurationProvider.prototype.getWrappedProvider = function () {
        return this.wrappedProvider;
    };
    /**
     * Loads the configuration values either from the cache or from the wrapped provider
     *
     * @return {Promise<TypedHash<string>>} Promise of loaded configuration values
     */
    CachingConfigurationProvider.prototype.getConfiguration = function () {
        var _this = this;
        // Cache not available, pass control to  the wrapped provider
        if ((!this.store) || (!this.store.enabled)) {
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
    };
    CachingConfigurationProvider.prototype.selectPnPCache = function () {
        var pnpCache = new storage.PnPClientStorage();
        if ((pnpCache.local) && (pnpCache.local.enabled)) {
            return pnpCache.local;
        }
        if ((pnpCache.session) && (pnpCache.session.enabled)) {
            return pnpCache.session;
        }
        throw new exceptions_1.NoCacheAvailableException();
    };
    return CachingConfigurationProvider;
}());
exports.default = CachingConfigurationProvider;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var storage_1 = __webpack_require__(12);
var configuration_1 = __webpack_require__(44);
var logging_1 = __webpack_require__(4);
var rest_1 = __webpack_require__(45);
var pnplibconfig_1 = __webpack_require__(3);
var rest_2 = __webpack_require__(54);
/**
 * Root class of the Patterns and Practices namespace, provides an entry point to the library
 */
/**
 * Utility methods
 */
exports.util = util_1.Util;
/**
 * Provides access to the SharePoint REST interface
 */
exports.sp = new rest_1.SPRest();
/**
 * Provides access to the Microsoft Graph REST interface
 */
exports.graph = new rest_2.GraphRest();
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
 * Export everything back to the top level so it can be properly bundled
 */
__export(__webpack_require__(63));
__export(__webpack_require__(66));
__export(__webpack_require__(68));
__export(__webpack_require__(71));
__export(__webpack_require__(72));
// /**
//  * Expose a subset of classes from the library for public consumption
//  */
// creating this class instead of directly assigning to default fixes issue #116
var Def = {
    /**
     * Global configuration instance to which providers can be added
     */
    config: exports.config,
    /**
     * Provides access to the Microsoft Graph REST interface
     */
    graph: exports.graph,
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
    util: exports.util,
};
/**
 * Enables use of the import pnp from syntax
 */
exports.default = Def;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = __webpack_require__(8);
/**
 * Class used to manage the current application settings
 *
 */
var Settings = /** @class */ (function () {
    /**
     * Creates a new instance of the settings class
     *
     * @constructor
     */
    function Settings() {
        this._settings = new collections_1.Dictionary();
    }
    /**
     * Adds a new single setting, or overwrites a previous setting with the same key
     *
     * @param {string} key The key used to store this setting
     * @param {string} value The setting value to store
     */
    Settings.prototype.add = function (key, value) {
        this._settings.add(key, value);
    };
    /**
     * Adds a JSON value to the collection as a string, you must use getJSON to rehydrate the object when read
     *
     * @param {string} key The key used to store this setting
     * @param {any} value The setting value to store
     */
    Settings.prototype.addJSON = function (key, value) {
        this._settings.add(key, JSON.stringify(value));
    };
    /**
     * Applies the supplied hash to the setting collection overwriting any existing value, or created new values
     *
     * @param {TypedHash<any>} hash The set of values to add
     */
    Settings.prototype.apply = function (hash) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this._settings.merge(hash);
                resolve();
            }
            catch (e) {
                reject(e);
            }
        });
    };
    /**
     * Loads configuration settings into the collection from the supplied provider and returns a Promise
     *
     * @param {IConfigurationProvider} provider The provider from which we will load the settings
     */
    Settings.prototype.load = function (provider) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            provider.getConfiguration().then(function (value) {
                _this._settings.merge(value);
                resolve();
            }).catch(function (reason) {
                reject(reason);
            });
        });
    };
    /**
     * Gets a value from the configuration
     *
     * @param {string} key The key whose value we want to return. Returns null if the key does not exist
     * @return {string} string value from the configuration
     */
    Settings.prototype.get = function (key) {
        return this._settings.get(key);
    };
    /**
     * Gets a JSON value, rehydrating the stored string to the original object
     *
     * @param {string} key The key whose value we want to return. Returns null if the key does not exist
     * @return {any} object from the configuration
     */
    Settings.prototype.getJSON = function (key) {
        var o = this.get(key);
        if (typeof o === "undefined" || o === null) {
            return o;
        }
        return JSON.parse(o);
    };
    return Settings;
}());
exports.Settings = Settings;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var search_1 = __webpack_require__(28);
var searchsuggest_1 = __webpack_require__(30);
var site_1 = __webpack_require__(31);
var webs_1 = __webpack_require__(11);
var util_1 = __webpack_require__(0);
var userprofiles_1 = __webpack_require__(52);
var exceptions_1 = __webpack_require__(2);
var utilities_1 = __webpack_require__(40);
/**
 * Root of the SharePoint REST module
 */
var SPRest = /** @class */ (function () {
    /**
     * Creates a new instance of the SPRest class
     *
     * @param options Additional options
     * @param baseUrl A string that should form the base part of the url
     */
    function SPRest(options, baseUrl) {
        if (options === void 0) { options = {}; }
        if (baseUrl === void 0) { baseUrl = ""; }
        this._options = options;
        this._baseUrl = baseUrl;
    }
    /**
     * Configures instance with additional options and baseUrl.
     * Provided configuration used by other objects in a chain
     *
     * @param options Additional options
     * @param baseUrl A string that should form the base part of the url
     */
    SPRest.prototype.configure = function (options, baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        return new SPRest(options, baseUrl);
    };
    /**
     * Executes a search against this web context
     *
     * @param query The SearchQuery definition
     */
    SPRest.prototype.searchSuggest = function (query) {
        var finalQuery;
        if (typeof query === "string") {
            finalQuery = { querytext: query };
        }
        else {
            finalQuery = query;
        }
        return new searchsuggest_1.SearchSuggest(this._baseUrl).configure(this._options).execute(finalQuery);
    };
    /**
     * Executes a search against this web context
     *
     * @param query The SearchQuery definition
     */
    SPRest.prototype.search = function (query) {
        var finalQuery;
        if (typeof query === "string") {
            finalQuery = { Querytext: query };
        }
        else if (query instanceof search_1.SearchQueryBuilder) {
            finalQuery = query.toSearchQuery();
        }
        else {
            finalQuery = query;
        }
        return new search_1.Search(this._baseUrl).configure(this._options).execute(finalQuery);
    };
    Object.defineProperty(SPRest.prototype, "site", {
        /**
         * Begins a site collection scoped REST request
         *
         */
        get: function () {
            return new site_1.Site(this._baseUrl).configure(this._options);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRest.prototype, "web", {
        /**
         * Begins a web scoped REST request
         *
         */
        get: function () {
            return new webs_1.Web(this._baseUrl).configure(this._options);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRest.prototype, "profiles", {
        /**
         * Access to user profile methods
         *
         */
        get: function () {
            return new userprofiles_1.UserProfileQuery(this._baseUrl).configure(this._options);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new batch object for use with the SharePointQueryable.addToBatch method
     *
     */
    SPRest.prototype.createBatch = function () {
        return this.web.createBatch();
    };
    Object.defineProperty(SPRest.prototype, "utility", {
        /**
         * Static utilities methods from SP.Utilities.Utility
         */
        get: function () {
            return new utilities_1.UtilityMethod(this._baseUrl, "").configure(this._options);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Begins a cross-domain, host site scoped REST request, for use in add-in webs
     *
     * @param addInWebUrl The absolute url of the add-in web
     * @param hostWebUrl The absolute url of the host web
     */
    SPRest.prototype.crossDomainSite = function (addInWebUrl, hostWebUrl) {
        return this._cdImpl(site_1.Site, addInWebUrl, hostWebUrl, "site");
    };
    /**
     * Begins a cross-domain, host web scoped REST request, for use in add-in webs
     *
     * @param addInWebUrl The absolute url of the add-in web
     * @param hostWebUrl The absolute url of the host web
     */
    SPRest.prototype.crossDomainWeb = function (addInWebUrl, hostWebUrl) {
        return this._cdImpl(webs_1.Web, addInWebUrl, hostWebUrl, "web");
    };
    /**
     * Implements the creation of cross domain REST urls
     *
     * @param factory The constructor of the object to create Site | Web
     * @param addInWebUrl The absolute url of the add-in web
     * @param hostWebUrl The absolute url of the host web
     * @param urlPart String part to append to the url "site" | "web"
     */
    SPRest.prototype._cdImpl = function (factory, addInWebUrl, hostWebUrl, urlPart) {
        if (!util_1.Util.isUrlAbsolute(addInWebUrl)) {
            throw new exceptions_1.UrlException("The addInWebUrl parameter must be an absolute url.");
        }
        if (!util_1.Util.isUrlAbsolute(hostWebUrl)) {
            throw new exceptions_1.UrlException("The hostWebUrl parameter must be an absolute url.");
        }
        var url = util_1.Util.combinePaths(addInWebUrl, "_api/SP.AppContextSite(@target)");
        var instance = new factory(url, urlPart);
        instance.query.add("@target", "'" + encodeURIComponent(hostWebUrl) + "'");
        return instance.configure(this._options);
    };
    return SPRest;
}());
exports.SPRest = SPRest;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = __webpack_require__(8);
var util_1 = __webpack_require__(0);
var parsers_1 = __webpack_require__(7);
var pnplibconfig_1 = __webpack_require__(3);
var CachedDigest = /** @class */ (function () {
    function CachedDigest() {
    }
    return CachedDigest;
}());
exports.CachedDigest = CachedDigest;
// allows for the caching of digests across all HttpClient's which each have their own DigestCache wrapper.
var digests = new collections_1.Dictionary();
var DigestCache = /** @class */ (function () {
    function DigestCache(_httpClient, _digests) {
        if (_digests === void 0) { _digests = digests; }
        this._httpClient = _httpClient;
        this._digests = _digests;
    }
    DigestCache.prototype.getDigest = function (webUrl) {
        var _this = this;
        var cachedDigest = this._digests.get(webUrl);
        if (cachedDigest !== null) {
            var now = new Date();
            if (now < cachedDigest.expiration) {
                return Promise.resolve(cachedDigest.value);
            }
        }
        var url = util_1.Util.combinePaths(webUrl, "/_api/contextinfo");
        var headers = {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose;charset=utf-8",
        };
        return this._httpClient.fetchRaw(url, {
            cache: "no-cache",
            credentials: "same-origin",
            headers: util_1.Util.extend(headers, pnplibconfig_1.RuntimeConfig.spHeaders, true),
            method: "POST",
        }).then(function (response) {
            var parser = new parsers_1.ODataDefaultParser();
            return parser.parse(response).then(function (d) { return d.GetContextWebInformation; });
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
    };
    DigestCache.prototype.clear = function () {
        this._digests.clear();
    };
    return DigestCache;
}());
exports.DigestCache = DigestCache;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var parsers_1 = __webpack_require__(7);
/**
 * Describes a collection of Item objects
 *
 */
var AttachmentFiles = /** @class */ (function (_super) {
    __extends(AttachmentFiles, _super);
    /**
     * Creates a new instance of the AttachmentFiles class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this attachments collection
     */
    function AttachmentFiles(baseUrl, path) {
        if (path === void 0) { path = "AttachmentFiles"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a Attachment File by filename
     *
     * @param name The name of the file, including extension.
     */
    AttachmentFiles.prototype.getByName = function (name) {
        var f = new AttachmentFile(this);
        f.concat("('" + name + "')");
        return f;
    };
    /**
     * Adds a new attachment to the collection. Not supported for batching.
     *
     * @param name The name of the file, including extension.
     * @param content The Base64 file content.
     */
    AttachmentFiles.prototype.add = function (name, content) {
        var _this = this;
        return this.clone(AttachmentFiles, "add(FileName='" + name + "')", false).postCore({
            body: content,
        }).then(function (response) {
            return {
                data: response,
                file: _this.getByName(name),
            };
        });
    };
    /**
     * Adds multiple new attachment to the collection. Not supported for batching.
     *
     * @files name The collection of files to add
     */
    AttachmentFiles.prototype.addMultiple = function (files) {
        var _this = this;
        // add the files in series so we don't get update conflicts
        return files.reduce(function (chain, file) { return chain.then(function () { return _this.clone(AttachmentFiles, "add(FileName='" + file.name + "')", false).postCore({
            body: file.content,
        }); }); }, Promise.resolve());
    };
    /**
     * Delete multiple attachments from the collection. Not supported for batching.
     *
     * @files name The collection of files to delete
     */
    AttachmentFiles.prototype.deleteMultiple = function () {
        var _this = this;
        var files = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            files[_i] = arguments[_i];
        }
        return files.reduce(function (chain, file) { return chain.then(function () { return _this.getByName(file).delete(); }); }, Promise.resolve());
    };
    return AttachmentFiles;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.AttachmentFiles = AttachmentFiles;
/**
 * Describes a single attachment file instance
 *
 */
var AttachmentFile = /** @class */ (function (_super) {
    __extends(AttachmentFile, _super);
    function AttachmentFile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the contents of the file as text
     *
     */
    AttachmentFile.prototype.getText = function () {
        return this.clone(AttachmentFile, "$value", false).get(new parsers_1.TextFileParser());
    };
    /**
     * Gets the contents of the file as a blob, does not work in Node.js
     *
     */
    AttachmentFile.prototype.getBlob = function () {
        return this.clone(AttachmentFile, "$value", false).get(new parsers_1.BlobFileParser());
    };
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js
     */
    AttachmentFile.prototype.getBuffer = function () {
        return this.clone(AttachmentFile, "$value", false).get(new parsers_1.BufferFileParser());
    };
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js
     */
    AttachmentFile.prototype.getJSON = function () {
        return this.clone(AttachmentFile, "$value", false).get(new parsers_1.JSONFileParser());
    };
    /**
     * Sets the content of a file. Not supported for batching
     *
     * @param content The value to set for the file contents
     */
    AttachmentFile.prototype.setContent = function (content) {
        var _this = this;
        return this.clone(AttachmentFile, "$value", false).postCore({
            body: content,
            headers: {
                "X-HTTP-Method": "PUT",
            },
        }).then(function (_) { return new AttachmentFile(_this); });
    };
    /**
     * Delete this attachment file
     *
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    AttachmentFile.prototype.delete = function (eTag) {
        if (eTag === void 0) { eTag = "*"; }
        return this.postCore({
            headers: {
                "IF-Match": eTag,
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    return AttachmentFile;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.AttachmentFile = AttachmentFile;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var util_1 = __webpack_require__(0);
/**
 * Describes the views available in the current context
 *
 */
var Views = /** @class */ (function (_super) {
    __extends(Views, _super);
    /**
     * Creates a new instance of the Views class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    function Views(baseUrl, path) {
        if (path === void 0) { path = "views"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a view by guid id
     *
     * @param id The GUID id of the view
     */
    Views.prototype.getById = function (id) {
        var v = new View(this);
        v.concat("('" + id + "')");
        return v;
    };
    /**
     * Gets a view by title (case-sensitive)
     *
     * @param title The case-sensitive title of the view
     */
    Views.prototype.getByTitle = function (title) {
        return new View(this, "getByTitle('" + title + "')");
    };
    /**
     * Adds a new view to the collection
     *
     * @param title The new views's title
     * @param personalView True if this is a personal view, otherwise false, default = false
     * @param additionalSettings Will be passed as part of the view creation body
     */
    Views.prototype.add = function (title, personalView, additionalSettings) {
        var _this = this;
        if (personalView === void 0) { personalView = false; }
        if (additionalSettings === void 0) { additionalSettings = {}; }
        var postBody = JSON.stringify(util_1.Util.extend({
            "PersonalView": personalView,
            "Title": title,
            "__metadata": { "type": "SP.View" },
        }, additionalSettings));
        return this.clone(Views, null).postAsCore({ body: postBody }).then(function (data) {
            return {
                data: data,
                view: _this.getById(data.Id),
            };
        });
    };
    return Views;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.Views = Views;
/**
 * Describes a single View instance
 *
 */
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(View.prototype, "fields", {
        get: function () {
            return new ViewFields(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates this view intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the view
     */
    View.prototype.update = function (properties) {
        var _this = this;
        var postBody = JSON.stringify(util_1.Util.extend({
            "__metadata": { "type": "SP.View" },
        }, properties));
        return this.postCore({
            body: postBody,
            headers: {
                "X-HTTP-Method": "MERGE",
            },
        }).then(function (data) {
            return {
                data: data,
                view: _this,
            };
        });
    };
    /**
     * Delete this view
     *
     */
    View.prototype.delete = function () {
        return this.postCore({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    /**
     * Returns the list view as HTML.
     *
     */
    View.prototype.renderAsHtml = function () {
        return this.clone(sharepointqueryable_1.SharePointQueryable, "renderashtml").get();
    };
    return View;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.View = View;
var ViewFields = /** @class */ (function (_super) {
    __extends(ViewFields, _super);
    function ViewFields(baseUrl, path) {
        if (path === void 0) { path = "viewfields"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a value that specifies the XML schema that represents the collection.
     */
    ViewFields.prototype.getSchemaXml = function () {
        return this.clone(sharepointqueryable_1.SharePointQueryable, "schemaxml").get();
    };
    /**
     * Adds the field with the specified field internal name or display name to the collection.
     *
     * @param fieldTitleOrInternalName The case-sensitive internal name or display name of the field to add.
     */
    ViewFields.prototype.add = function (fieldTitleOrInternalName) {
        return this.clone(ViewFields, "addviewfield('" + fieldTitleOrInternalName + "')").postCore();
    };
    /**
     * Moves the field with the specified field internal name to the specified position in the collection.
     *
     * @param fieldInternalName The case-sensitive internal name of the field to move.
     * @param index The zero-based index of the new position for the field.
     */
    ViewFields.prototype.move = function (fieldInternalName, index) {
        return this.clone(ViewFields, "moveviewfieldto").postCore({
            body: JSON.stringify({ "field": fieldInternalName, "index": index }),
        });
    };
    /**
     * Removes all the fields from the collection.
     */
    ViewFields.prototype.removeAll = function () {
        return this.clone(ViewFields, "removeallviewfields").postCore();
    };
    /**
     * Removes the field with the specified field internal name from the collection.
     *
     * @param fieldInternalName The case-sensitive internal name of the field to remove from the view.
     */
    ViewFields.prototype.remove = function (fieldInternalName) {
        return this.clone(ViewFields, "removeviewfield('" + fieldInternalName + "')").postCore();
    };
    return ViewFields;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.ViewFields = ViewFields;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
/**
 * Describes a collection of Field objects
 *
 */
var Forms = /** @class */ (function (_super) {
    __extends(Forms, _super);
    /**
     * Creates a new instance of the Fields class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    function Forms(baseUrl, path) {
        if (path === void 0) { path = "forms"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a form by id
     *
     * @param id The guid id of the item to retrieve
     */
    Forms.prototype.getById = function (id) {
        var i = new Form(this);
        i.concat("('" + id + "')");
        return i;
    };
    return Forms;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.Forms = Forms;
/**
 * Describes a single of Form instance
 *
 */
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Form;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.Form = Form;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
/**
 * Describes a collection of webhook subscriptions
 *
 */
var Subscriptions = /** @class */ (function (_super) {
    __extends(Subscriptions, _super);
    /**
     * Creates a new instance of the Subscriptions class
     *
     * @param baseUrl - The url or SharePointQueryable which forms the parent of this webhook subscriptions collection
     */
    function Subscriptions(baseUrl, path) {
        if (path === void 0) { path = "subscriptions"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Returns all the webhook subscriptions or the specified webhook subscription
     *
     * @param subscriptionId The id of a specific webhook subscription to retrieve, omit to retrieve all the webhook subscriptions
     */
    Subscriptions.prototype.getById = function (subscriptionId) {
        var subscription = new Subscription(this);
        subscription.concat("('" + subscriptionId + "')");
        return subscription;
    };
    /**
     * Creates a new webhook subscription
     *
     * @param notificationUrl The url to receive the notifications
     * @param expirationDate The date and time to expire the subscription in the form YYYY-MM-ddTHH:mm:ss+00:00 (maximum of 6 months)
     * @param clientState A client specific string (defaults to pnp-js-core-subscription when omitted)
     */
    Subscriptions.prototype.add = function (notificationUrl, expirationDate, clientState) {
        var _this = this;
        var postBody = JSON.stringify({
            "clientState": clientState || "pnp-js-core-subscription",
            "expirationDateTime": expirationDate,
            "notificationUrl": notificationUrl,
            "resource": this.toUrl(),
        });
        return this.postCore({ body: postBody, headers: { "Content-Type": "application/json" } }).then(function (result) {
            return { data: result, subscription: _this.getById(result.id) };
        });
    };
    return Subscriptions;
}(sharepointqueryable_1.SharePointQueryableCollection));
exports.Subscriptions = Subscriptions;
/**
 * Describes a single webhook subscription instance
 *
 */
var Subscription = /** @class */ (function (_super) {
    __extends(Subscription, _super);
    function Subscription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Renews this webhook subscription
     *
     * @param expirationDate The date and time to expire the subscription in the form YYYY-MM-ddTHH:mm:ss+00:00 (maximum of 6 months)
     */
    Subscription.prototype.update = function (expirationDate) {
        var _this = this;
        var postBody = JSON.stringify({
            "expirationDateTime": expirationDate,
        });
        return this.patchCore({ body: postBody, headers: { "Content-Type": "application/json" } }).then(function (data) {
            return { data: data, subscription: _this };
        });
    };
    /**
     * Removes this webhook subscription
     *
     */
    Subscription.prototype.delete = function () {
        return _super.prototype.deleteCore.call(this);
    };
    return Subscription;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.Subscription = Subscription;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var RelatedItemManagerImpl = /** @class */ (function (_super) {
    __extends(RelatedItemManagerImpl, _super);
    function RelatedItemManagerImpl(baseUrl, path) {
        if (path === void 0) { path = "_api/SP.RelatedItemManager"; }
        return _super.call(this, baseUrl, path) || this;
    }
    RelatedItemManagerImpl.FromUrl = function (url) {
        if (url === null) {
            return new RelatedItemManagerImpl("");
        }
        var index = url.indexOf("_api/");
        if (index > -1) {
            return new RelatedItemManagerImpl(url.substr(0, index));
        }
        return new RelatedItemManagerImpl(url);
    };
    RelatedItemManagerImpl.prototype.getRelatedItems = function (sourceListName, sourceItemId) {
        var query = this.clone(RelatedItemManagerImpl, null);
        query.concat(".GetRelatedItems");
        return query.postCore({
            body: JSON.stringify({
                SourceItemID: sourceItemId,
                SourceListName: sourceListName,
            }),
        });
    };
    RelatedItemManagerImpl.prototype.getPageOneRelatedItems = function (sourceListName, sourceItemId) {
        var query = this.clone(RelatedItemManagerImpl, null);
        query.concat(".GetPageOneRelatedItems");
        return query.postCore({
            body: JSON.stringify({
                SourceItemID: sourceItemId,
                SourceListName: sourceListName,
            }),
        });
    };
    RelatedItemManagerImpl.prototype.addSingleLink = function (sourceListName, sourceItemId, sourceWebUrl, targetListName, targetItemID, targetWebUrl, tryAddReverseLink) {
        if (tryAddReverseLink === void 0) { tryAddReverseLink = false; }
        var query = this.clone(RelatedItemManagerImpl, null);
        query.concat(".AddSingleLink");
        return query.postCore({
            body: JSON.stringify({
                SourceItemID: sourceItemId,
                SourceListName: sourceListName,
                SourceWebUrl: sourceWebUrl,
                TargetItemID: targetItemID,
                TargetListName: targetListName,
                TargetWebUrl: targetWebUrl,
                TryAddReverseLink: tryAddReverseLink,
            }),
        });
    };
    /**
     * Adds a related item link from an item specified by list name and item id, to an item specified by url
     *
     * @param sourceListName The source list name or list id
     * @param sourceItemId The source item id
     * @param targetItemUrl The target item url
     * @param tryAddReverseLink If set to true try to add the reverse link (will not return error if it fails)
     */
    RelatedItemManagerImpl.prototype.addSingleLinkToUrl = function (sourceListName, sourceItemId, targetItemUrl, tryAddReverseLink) {
        if (tryAddReverseLink === void 0) { tryAddReverseLink = false; }
        var query = this.clone(RelatedItemManagerImpl, null);
        query.concat(".AddSingleLinkToUrl");
        return query.postCore({
            body: JSON.stringify({
                SourceItemID: sourceItemId,
                SourceListName: sourceListName,
                TargetItemUrl: targetItemUrl,
                TryAddReverseLink: tryAddReverseLink,
            }),
        });
    };
    /**
     * Adds a related item link from an item specified by url, to an item specified by list name and item id
     *
     * @param sourceItemUrl The source item url
     * @param targetListName The target list name or list id
     * @param targetItemId The target item id
     * @param tryAddReverseLink If set to true try to add the reverse link (will not return error if it fails)
     */
    RelatedItemManagerImpl.prototype.addSingleLinkFromUrl = function (sourceItemUrl, targetListName, targetItemId, tryAddReverseLink) {
        if (tryAddReverseLink === void 0) { tryAddReverseLink = false; }
        var query = this.clone(RelatedItemManagerImpl, null);
        query.concat(".AddSingleLinkFromUrl");
        return query.postCore({
            body: JSON.stringify({
                SourceItemUrl: sourceItemUrl,
                TargetItemID: targetItemId,
                TargetListName: targetListName,
                TryAddReverseLink: tryAddReverseLink,
            }),
        });
    };
    RelatedItemManagerImpl.prototype.deleteSingleLink = function (sourceListName, sourceItemId, sourceWebUrl, targetListName, targetItemId, targetWebUrl, tryDeleteReverseLink) {
        if (tryDeleteReverseLink === void 0) { tryDeleteReverseLink = false; }
        var query = this.clone(RelatedItemManagerImpl, null);
        query.concat(".DeleteSingleLink");
        return query.postCore({
            body: JSON.stringify({
                SourceItemID: sourceItemId,
                SourceListName: sourceListName,
                SourceWebUrl: sourceWebUrl,
                TargetItemID: targetItemId,
                TargetListName: targetListName,
                TargetWebUrl: targetWebUrl,
                TryDeleteReverseLink: tryDeleteReverseLink,
            }),
        });
    };
    return RelatedItemManagerImpl;
}(sharepointqueryable_1.SharePointQueryable));
exports.RelatedItemManagerImpl = RelatedItemManagerImpl;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sharepointqueryable_1 = __webpack_require__(1);
var files_1 = __webpack_require__(53);
var parsers_1 = __webpack_require__(7);
var UserProfileQuery = /** @class */ (function (_super) {
    __extends(UserProfileQuery, _super);
    /**
     * Creates a new instance of the UserProfileQuery class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this user profile query
     */
    function UserProfileQuery(baseUrl, path) {
        if (path === void 0) { path = "_api/sp.userprofiles.peoplemanager"; }
        var _this = _super.call(this, baseUrl, path) || this;
        _this.profileLoader = new ProfileLoader(baseUrl);
        return _this;
    }
    Object.defineProperty(UserProfileQuery.prototype, "editProfileLink", {
        /**
         * The url of the edit profile page for the current user
         */
        get: function () {
            return this.clone(UserProfileQuery, "EditProfileLink").getAs(parsers_1.ODataValue());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserProfileQuery.prototype, "isMyPeopleListPublic", {
        /**
         * A boolean value that indicates whether the current user's "People I'm Following" list is public
         */
        get: function () {
            return this.clone(UserProfileQuery, "IsMyPeopleListPublic").getAs(parsers_1.ODataValue());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * A boolean value that indicates whether the current user is being followed by the specified user
     *
     * @param loginName The account name of the user
     */
    UserProfileQuery.prototype.amIFollowedBy = function (loginName) {
        var q = this.clone(UserProfileQuery, "amifollowedby(@v)");
        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
        return q.get();
    };
    /**
     * A boolean value that indicates whether the current user is following the specified user
     *
     * @param loginName The account name of the user
     */
    UserProfileQuery.prototype.amIFollowing = function (loginName) {
        var q = this.clone(UserProfileQuery, "amifollowing(@v)");
        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
        return q.get();
    };
    /**
     * Gets tags that the current user is following
     *
     * @param maxCount The maximum number of tags to retrieve (default is 20)
     */
    UserProfileQuery.prototype.getFollowedTags = function (maxCount) {
        if (maxCount === void 0) { maxCount = 20; }
        return this.clone(UserProfileQuery, "getfollowedtags(" + maxCount + ")").get();
    };
    /**
     * Gets the people who are following the specified user
     *
     * @param loginName The account name of the user
     */
    UserProfileQuery.prototype.getFollowersFor = function (loginName) {
        var q = this.clone(UserProfileQuery, "getfollowersfor(@v)");
        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
        return q.get();
    };
    Object.defineProperty(UserProfileQuery.prototype, "myFollowers", {
        /**
         * Gets the people who are following the current user
         *
         */
        get: function () {
            return new sharepointqueryable_1.SharePointQueryableCollection(this, "getmyfollowers");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserProfileQuery.prototype, "myProperties", {
        /**
         * Gets user properties for the current user
         *
         */
        get: function () {
            return new UserProfileQuery(this, "getmyproperties");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the people who the specified user is following
     *
     * @param loginName The account name of the user.
     */
    UserProfileQuery.prototype.getPeopleFollowedBy = function (loginName) {
        var q = this.clone(UserProfileQuery, "getpeoplefollowedby(@v)");
        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
        return q.get();
    };
    /**
     * Gets user properties for the specified user.
     *
     * @param loginName The account name of the user.
     */
    UserProfileQuery.prototype.getPropertiesFor = function (loginName) {
        var q = this.clone(UserProfileQuery, "getpropertiesfor(@v)");
        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
        return q.get();
    };
    Object.defineProperty(UserProfileQuery.prototype, "trendingTags", {
        /**
         * Gets the 20 most popular hash tags over the past week, sorted so that the most popular tag appears first
         *
         */
        get: function () {
            var q = this.clone(UserProfileQuery, null);
            q.concat(".gettrendingtags");
            return q.get();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the specified user profile property for the specified user
     *
     * @param loginName The account name of the user
     * @param propertyName The case-sensitive name of the property to get
     */
    UserProfileQuery.prototype.getUserProfilePropertyFor = function (loginName, propertyName) {
        var q = this.clone(UserProfileQuery, "getuserprofilepropertyfor(accountname=@v, propertyname='" + propertyName + "')");
        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
        return q.get();
    };
    /**
     * Removes the specified user from the user's list of suggested people to follow
     *
     * @param loginName The account name of the user
     */
    UserProfileQuery.prototype.hideSuggestion = function (loginName) {
        var q = this.clone(UserProfileQuery, "hidesuggestion(@v)");
        q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
        return q.postCore();
    };
    /**
     * A boolean values that indicates whether the first user is following the second user
     *
     * @param follower The account name of the user who might be following the followee
     * @param followee The account name of the user who might be followed by the follower
     */
    UserProfileQuery.prototype.isFollowing = function (follower, followee) {
        var q = this.clone(UserProfileQuery, null);
        q.concat(".isfollowing(possiblefolloweraccountname=@v, possiblefolloweeaccountname=@y)");
        q.query.add("@v", "'" + encodeURIComponent(follower) + "'");
        q.query.add("@y", "'" + encodeURIComponent(followee) + "'");
        return q.get();
    };
    /**
     * Uploads and sets the user profile picture (Users can upload a picture to their own profile only). Not supported for batching.
     *
     * @param profilePicSource Blob data representing the user's picture in BMP, JPEG, or PNG format of up to 4.76MB
     */
    UserProfileQuery.prototype.setMyProfilePic = function (profilePicSource) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            files_1.readBlobAsArrayBuffer(profilePicSource).then(function (buffer) {
                var request = new UserProfileQuery(_this, "setmyprofilepicture");
                request.postCore({
                    body: String.fromCharCode.apply(null, new Uint16Array(buffer)),
                }).then(function (_) { return resolve(); });
            }).catch(function (e) { return reject(e); });
        });
    };
    /**
     * Provisions one or more users' personal sites. (My Site administrator on SharePoint Online only)
     *
     * @param emails The email addresses of the users to provision sites for
     */
    UserProfileQuery.prototype.createPersonalSiteEnqueueBulk = function () {
        var emails = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            emails[_i] = arguments[_i];
        }
        return this.profileLoader.createPersonalSiteEnqueueBulk(emails);
    };
    Object.defineProperty(UserProfileQuery.prototype, "ownerUserProfile", {
        /**
         * Gets the user profile of the site owner
         *
         */
        get: function () {
            return this.profileLoader.ownerUserProfile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserProfileQuery.prototype, "userProfile", {
        /**
         * Gets the user profile for the current user
         */
        get: function () {
            return this.profileLoader.userProfile;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Enqueues creating a personal site for this user, which can be used to share documents, web pages, and other files
     *
     * @param interactiveRequest true if interactively (web) initiated request, or false (default) if non-interactively (client) initiated request
     */
    UserProfileQuery.prototype.createPersonalSite = function (interactiveRequest) {
        if (interactiveRequest === void 0) { interactiveRequest = false; }
        return this.profileLoader.createPersonalSite(interactiveRequest);
    };
    /**
     * Sets the privacy settings for this profile
     *
     * @param share true to make all social data public; false to make all social data private
     */
    UserProfileQuery.prototype.shareAllSocialData = function (share) {
        return this.profileLoader.shareAllSocialData(share);
    };
    return UserProfileQuery;
}(sharepointqueryable_1.SharePointQueryableInstance));
exports.UserProfileQuery = UserProfileQuery;
var ProfileLoader = /** @class */ (function (_super) {
    __extends(ProfileLoader, _super);
    /**
   * Creates a new instance of the ProfileLoader class
   *
   * @param baseUrl The url or SharePointQueryable which forms the parent of this profile loader
   */
    function ProfileLoader(baseUrl, path) {
        if (path === void 0) { path = "_api/sp.userprofiles.profileloader.getprofileloader"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Provisions one or more users' personal sites. (My Site administrator on SharePoint Online only) Doesn't support batching
     *
     * @param emails The email addresses of the users to provision sites for
     */
    ProfileLoader.prototype.createPersonalSiteEnqueueBulk = function (emails) {
        return this.clone(ProfileLoader, "createpersonalsiteenqueuebulk", false).postCore({
            body: JSON.stringify({ "emailIDs": emails }),
        });
    };
    Object.defineProperty(ProfileLoader.prototype, "ownerUserProfile", {
        /**
         * Gets the user profile of the site owner.
         *
         */
        get: function () {
            var q = this.getParent(ProfileLoader, this.parentUrl, "_api/sp.userprofiles.profileloader.getowneruserprofile");
            if (this.hasBatch) {
                q = q.inBatch(this.batch);
            }
            return q.postAsCore();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProfileLoader.prototype, "userProfile", {
        /**
         * Gets the user profile of the current user.
         *
         */
        get: function () {
            return this.clone(ProfileLoader, "getuserprofile").postAsCore();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Enqueues creating a personal site for this user, which can be used to share documents, web pages, and other files.
     *
     * @param interactiveRequest true if interactively (web) initiated request, or false (default) if non-interactively (client) initiated request
     */
    ProfileLoader.prototype.createPersonalSite = function (interactiveRequest) {
        if (interactiveRequest === void 0) { interactiveRequest = false; }
        return this.clone(ProfileLoader, "getuserprofile/createpersonalsiteenque(" + interactiveRequest + ")").postCore();
    };
    /**
     * Sets the privacy settings for this profile
     *
     * @param share true to make all social data public; false to make all social data private.
     */
    ProfileLoader.prototype.shareAllSocialData = function (share) {
        return this.clone(ProfileLoader, "getuserprofile/shareallsocialdata(" + share + ")").postCore();
    };
    return ProfileLoader;
}(sharepointqueryable_1.SharePointQueryable));


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
        }
        catch (e) {
            reject(e);
        }
    });
}


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var v1_1 = __webpack_require__(55);
var GraphRest = /** @class */ (function () {
    function GraphRest() {
    }
    Object.defineProperty(GraphRest.prototype, "v1", {
        get: function () {
            return new v1_1.V1("");
        },
        enumerable: true,
        configurable: true
    });
    return GraphRest;
}());
exports.GraphRest = GraphRest;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var graphqueryable_1 = __webpack_require__(6);
var groups_1 = __webpack_require__(56);
// import { Me } from "./me";
/**
 * Root object wrapping v1 functionality for MS Graph
 *
 */
var V1 = /** @class */ (function (_super) {
    __extends(V1, _super);
    /**
     * Creates a new instance of the V1 class
     *
     * @param baseUrl The url or Queryable which forms the parent of this fields collection
     * @param path Optional additional path
     */
    function V1(baseUrl, path) {
        if (path === void 0) { path = "v1.0"; }
        return _super.call(this, baseUrl, path) || this;
    }
    Object.defineProperty(V1.prototype, "groups", {
        get: function () {
            return new groups_1.Groups(this);
        },
        enumerable: true,
        configurable: true
    });
    return V1;
}(graphqueryable_1.GraphQueryable));
exports.V1 = V1;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var graphqueryable_1 = __webpack_require__(6);
var members_1 = __webpack_require__(57);
var util_1 = __webpack_require__(0);
var calendars_1 = __webpack_require__(58);
var conversations_1 = __webpack_require__(59);
var plans_1 = __webpack_require__(61);
var photos_1 = __webpack_require__(62);
var GroupType;
(function (GroupType) {
    /**
     * Office 365 (aka unified group)
     */
    GroupType[GroupType["Office365"] = 0] = "Office365";
    /**
     * Dynamic membership
     */
    GroupType[GroupType["Dynamic"] = 1] = "Dynamic";
    /**
     * Security
     */
    GroupType[GroupType["Security"] = 2] = "Security";
})(GroupType = exports.GroupType || (exports.GroupType = {}));
/**
 * Describes a collection of Field objects
 *
 */
var Groups = /** @class */ (function (_super) {
    __extends(Groups, _super);
    function Groups(baseUrl, path) {
        if (path === void 0) { path = "groups"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a group from the collection using the specified id
     *
     * @param id Id of the group to get from this collection
     */
    Groups.prototype.getById = function (id) {
        return new Group(this, id);
    };
    /**
     * Create a new group as specified in the request body.
     *
     * @param name Name to display in the address book for the group
     * @param mailNickname Mail alias for the group
     * @param groupType Type of group being created
     * @param additionalProperties A plain object collection of additional properties you want to set on the new group
     */
    Groups.prototype.add = function (name, mailNickname, groupType, additionalProperties) {
        var _this = this;
        if (additionalProperties === void 0) { additionalProperties = {}; }
        var postBody = util_1.Util.extend({
            displayName: name,
            mailEnabled: groupType === GroupType.Office365,
            mailNickname: mailNickname,
            securityEnabled: groupType !== GroupType.Office365,
        }, additionalProperties);
        // include a group type if required
        if (groupType !== GroupType.Security) {
            postBody = util_1.Util.extend(postBody, {
                groupTypes: [groupType === GroupType.Office365 ? "Unified" : "DynamicMembership"],
            });
        }
        return this.postCore({
            body: JSON.stringify(postBody),
        }).then(function (r) {
            return {
                data: r,
                group: _this.getById(r.id),
            };
        });
    };
    return Groups;
}(graphqueryable_1.GraphQueryableCollection));
exports.Groups = Groups;
/**
 * Represents a group entity
 */
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Group.prototype, "caldendar", {
        /**
         * The calendar associated with this group
         */
        get: function () {
            return new calendars_1.Calendar(this, "calendar");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "events", {
        /**
         * Retrieve a list of event objects
         */
        get: function () {
            return new calendars_1.Events(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "owners", {
        /**
         * Gets the collection of owners for this group
         */
        get: function () {
            return new members_1.Owners(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "plans", {
        /**
         * The collection of plans for this group
         */
        get: function () {
            return new plans_1.Plans(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "members", {
        /**
         * Gets the collection of members for this group
         */
        get: function () {
            return new members_1.Members(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "conversations", {
        /**
         * Gets the conversations collection for this group
         */
        get: function () {
            return new conversations_1.Conversations(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "acceptedSenders", {
        /**
         * Gets the collection of accepted senders for this group
         */
        get: function () {
            return new conversations_1.Senders(this, "acceptedsenders");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "rejectedSenders", {
        /**
         * Gets the collection of rejected senders for this group
         */
        get: function () {
            return new conversations_1.Senders(this, "rejectedsenders");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "photo", {
        /**
         * The photo associated with the group
         */
        get: function () {
            return new photos_1.Photo(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add the group to the list of the current user's favorite groups. Supported for only Office 365 groups
     */
    Group.prototype.addFavorite = function () {
        return this.clone(Group, "addFavorite").postCore();
    };
    /**
     * Return all the groups that the specified group is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    Group.prototype.getMemberGroups = function (securityEnabledOnly) {
        if (securityEnabledOnly === void 0) { securityEnabledOnly = false; }
        return this.clone(Group, "getMemberGroups").postCore({
            body: JSON.stringify({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    };
    /**
     * Deletes this group
     */
    Group.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a group object
     *
     * @param properties Set of properties of this group to update
     */
    Group.prototype.update = function (properties) {
        return this.patchCore({
            body: JSON.stringify(properties),
        });
    };
    /**
     * Remove the group from the list of the current user's favorite groups. Supported for only Office 365 groups
     */
    Group.prototype.removeFavorite = function () {
        return this.clone(Group, "removeFavorite").postCore();
    };
    /**
     * Reset the unseenCount of all the posts that the current user has not seen since their last visit
     */
    Group.prototype.resetUnseenCount = function () {
        return this.clone(Group, "resetUnseenCount").postCore();
    };
    /**
     * Calling this method will enable the current user to receive email notifications for this group,
     * about new posts, events, and files in that group. Supported for only Office 365 groups
     */
    Group.prototype.subscribeByMail = function () {
        return this.clone(Group, "subscribeByMail").postCore();
    };
    /**
     * Calling this method will prevent the current user from receiving email notifications for this group
     * about new posts, events, and files in that group. Supported for only Office 365 groups
     */
    Group.prototype.unsubscribeByMail = function () {
        return this.clone(Group, "unsubscribeByMail").postCore();
    };
    /**
     * Get the occurrences, exceptions, and single instances of events in a calendar view defined by a time range, from the default calendar of a group
     *
     * @param start Start date and time of the time range
     * @param end End date and time of the time range
     */
    Group.prototype.getCalendarView = function (start, end) {
        var view = this.clone(Group, "calendarView");
        view.query.add("startDateTime", start.toISOString());
        view.query.add("endDateTime", end.toISOString());
        return view.get();
    };
    return Group;
}(graphqueryable_1.GraphQueryableInstance));
exports.Group = Group;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var graphqueryable_1 = __webpack_require__(6);
var Members = /** @class */ (function (_super) {
    __extends(Members, _super);
    function Members(baseUrl, path) {
        if (path === void 0) { path = "members"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Use this API to add a member to an Office 365 group, a security group or a mail-enabled security group through
     * the members navigation property. You can add users or other groups.
     * Important: You can add only users to Office 365 groups.
     *
     * @param id Full @odata.id of the directoryObject, user, or group object you want to add (ex: https://graph.microsoft.com/v1.0/directoryObjects/${id})
     */
    Members.prototype.add = function (id) {
        return this.clone(Members, "$ref").postCore({
            body: JSON.stringify({
                "@odata.id": id,
            }),
        });
    };
    /**
     * Gets a member of the group by id
     *
     * @param id Group member's id
     */
    Members.prototype.getById = function (id) {
        return new Member(this, id);
    };
    return Members;
}(graphqueryable_1.GraphQueryableCollection));
exports.Members = Members;
var Member = /** @class */ (function (_super) {
    __extends(Member, _super);
    function Member() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Member;
}(graphqueryable_1.GraphQueryableInstance));
exports.Member = Member;
var Owners = /** @class */ (function (_super) {
    __extends(Owners, _super);
    function Owners(baseUrl, path) {
        if (path === void 0) { path = "owners"; }
        return _super.call(this, baseUrl, path) || this;
    }
    return Owners;
}(Members));
exports.Owners = Owners;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var graphqueryable_1 = __webpack_require__(6);
// import { Attachments } from "./attachments";
var Calendars = /** @class */ (function (_super) {
    __extends(Calendars, _super);
    function Calendars(baseUrl, path) {
        if (path === void 0) { path = "calendars"; }
        return _super.call(this, baseUrl, path) || this;
    }
    return Calendars;
}(graphqueryable_1.GraphQueryableCollection));
exports.Calendars = Calendars;
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Calendar.prototype, "events", {
        get: function () {
            return new Events(this);
        },
        enumerable: true,
        configurable: true
    });
    return Calendar;
}(graphqueryable_1.GraphQueryableInstance));
exports.Calendar = Calendar;
var Events = /** @class */ (function (_super) {
    __extends(Events, _super);
    function Events(baseUrl, path) {
        if (path === void 0) { path = "events"; }
        return _super.call(this, baseUrl, path) || this;
    }
    Events.prototype.getById = function (id) {
        return new Event(this, id);
    };
    /**
     * Adds a new event to the collection
     *
     * @param properties The set of properties used to create the event
     */
    Events.prototype.add = function (properties) {
        var _this = this;
        return this.postCore({
            body: JSON.stringify(properties),
        }).then(function (r) {
            return {
                data: r,
                event: _this.getById(r.id),
            };
        });
    };
    return Events;
}(graphqueryable_1.GraphQueryableCollection));
exports.Events = Events;
var Event = /** @class */ (function (_super) {
    __extends(Event, _super);
    function Event() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // TODO:: when supported
    // /**
    //  * Gets the collection of attachments for this event
    //  */
    // public get attachments(): Attachments {
    //     return new Attachments(this);
    // }
    /**
     * Update the properties of an event object
     *
     * @param properties Set of properties of this event to update
     */
    Event.prototype.update = function (properties) {
        return this.patchCore({
            body: JSON.stringify(properties),
        });
    };
    /**
     * Deletes this event
     */
    Event.prototype.delete = function () {
        return this.deleteCore();
    };
    return Event;
}(graphqueryable_1.GraphQueryableInstance));
exports.Event = Event;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var graphqueryable_1 = __webpack_require__(6);
var attachments_1 = __webpack_require__(60);
var Conversations = /** @class */ (function (_super) {
    __extends(Conversations, _super);
    function Conversations(baseUrl, path) {
        if (path === void 0) { path = "conversations"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Create a new conversation by including a thread and a post.
     *
     * @param properties Properties used to create the new conversation
     */
    Conversations.prototype.add = function (properties) {
        return this.postCore({
            body: JSON.stringify(properties),
        });
    };
    /**
     * Gets a conversation from this collection by id
     *
     * @param id Group member's id
     */
    Conversations.prototype.getById = function (id) {
        return new Conversation(this, id);
    };
    return Conversations;
}(graphqueryable_1.GraphQueryableCollection));
exports.Conversations = Conversations;
var Threads = /** @class */ (function (_super) {
    __extends(Threads, _super);
    function Threads(baseUrl, path) {
        if (path === void 0) { path = "threads"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a thread from this collection by id
     *
     * @param id Group member's id
     */
    Threads.prototype.getById = function (id) {
        return new Thread(this, id);
    };
    /**
     * Adds a new thread to this collection
     *
     * @param properties properties used to create the new thread
     * @returns Id of the new thread
     */
    Threads.prototype.add = function (properties) {
        return this.postCore({
            body: JSON.stringify(properties),
        });
    };
    return Threads;
}(graphqueryable_1.GraphQueryableCollection));
exports.Threads = Threads;
var Posts = /** @class */ (function (_super) {
    __extends(Posts, _super);
    function Posts(baseUrl, path) {
        if (path === void 0) { path = "posts"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a thread from this collection by id
     *
     * @param id Group member's id
     */
    Posts.prototype.getById = function (id) {
        return new Post(this, id);
    };
    /**
     * Adds a new thread to this collection
     *
     * @param properties properties used to create the new thread
     * @returns Id of the new thread
     */
    Posts.prototype.add = function (properties) {
        return this.postCore({
            body: JSON.stringify(properties),
        });
    };
    return Posts;
}(graphqueryable_1.GraphQueryableCollection));
exports.Posts = Posts;
var Conversation = /** @class */ (function (_super) {
    __extends(Conversation, _super);
    function Conversation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Conversation.prototype, "threads", {
        /**
         * Get all the threads in a group conversation.
         */
        get: function () {
            return new Threads(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates this conversation
     */
    Conversation.prototype.update = function (properties) {
        return this.patchCore({
            body: JSON.stringify(properties),
        });
    };
    /**
     * Deletes this member from the group
     */
    Conversation.prototype.delete = function () {
        return this.deleteCore();
    };
    return Conversation;
}(graphqueryable_1.GraphQueryableInstance));
exports.Conversation = Conversation;
var Thread = /** @class */ (function (_super) {
    __extends(Thread, _super);
    function Thread() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Thread.prototype, "posts", {
        /**
         * Get all the threads in a group conversation.
         */
        get: function () {
            return new Posts(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Reply to a thread in a group conversation and add a new post to it
     *
     * @param post Contents of the post
     */
    Thread.prototype.reply = function (post) {
        return this.clone(Thread, "reply").postCore({
            body: JSON.stringify({
                post: post,
            }),
        });
    };
    /**
     * Deletes this member from the group
     */
    Thread.prototype.delete = function () {
        return this.deleteCore();
    };
    return Thread;
}(graphqueryable_1.GraphQueryableInstance));
exports.Thread = Thread;
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Post.prototype, "attachments", {
        get: function () {
            return new attachments_1.Attachments(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Deletes this post
     */
    Post.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Forward a post to a recipient
     */
    Post.prototype.forward = function (info) {
        return this.clone(Post, "forward").postCore({
            body: JSON.stringify(info),
        });
    };
    /**
     * Reply to a thread in a group conversation and add a new post to it
     *
     * @param post Contents of the post
     */
    Post.prototype.reply = function (post) {
        return this.clone(Post, "reply").postCore({
            body: JSON.stringify({
                post: post,
            }),
        });
    };
    return Post;
}(graphqueryable_1.GraphQueryableInstance));
exports.Post = Post;
var Senders = /** @class */ (function (_super) {
    __extends(Senders, _super);
    function Senders(baseUrl, path) {
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Add a new user or group to this senders collection
     * @param id The full @odata.id value to add (ex: https://graph.microsoft.com/v1.0/users/user@contoso.com)
     */
    Senders.prototype.add = function (id) {
        return this.clone(Senders, "$ref").postCore({
            body: JSON.stringify({
                "@odata.id": id,
            }),
        });
    };
    /**
     * Removes the entity from the collection
     *
     * @param id The full @odata.id value to remove (ex: https://graph.microsoft.com/v1.0/users/user@contoso.com)
     */
    Senders.prototype.remove = function (id) {
        var remover = this.clone(Senders, "$ref");
        remover.query.add("$id", id);
        return remover.deleteCore();
    };
    return Senders;
}(graphqueryable_1.GraphQueryableCollection));
exports.Senders = Senders;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var graphqueryable_1 = __webpack_require__(6);
var Attachments = /** @class */ (function (_super) {
    __extends(Attachments, _super);
    function Attachments(baseUrl, path) {
        if (path === void 0) { path = "attachments"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a member of the group by id
     *
     * @param id Attachment id
     */
    Attachments.prototype.getById = function (id) {
        return new Attachment(this, id);
    };
    /**
     * Add attachment to this collection
     *
     * @param name Name given to the attachment file
     * @param bytes File content
     */
    Attachments.prototype.addFile = function (name, bytes) {
        return this.postCore({
            body: JSON.stringify({
                "@odata.type": "#microsoft.graph.fileAttachment",
                contentBytes: bytes,
                name: name,
            }),
        });
    };
    return Attachments;
}(graphqueryable_1.GraphQueryableCollection));
exports.Attachments = Attachments;
var Attachment = /** @class */ (function (_super) {
    __extends(Attachment, _super);
    function Attachment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Attachment;
}(graphqueryable_1.GraphQueryableInstance));
exports.Attachment = Attachment;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var graphqueryable_1 = __webpack_require__(6);
var Plans = /** @class */ (function (_super) {
    __extends(Plans, _super);
    function Plans(baseUrl, path) {
        if (path === void 0) { path = "planner/plans"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a plan from this collection by id
     *
     * @param id Plan's id
     */
    Plans.prototype.getById = function (id) {
        return new Plan(this, id);
    };
    return Plans;
}(graphqueryable_1.GraphQueryableCollection));
exports.Plans = Plans;
var Plan = /** @class */ (function (_super) {
    __extends(Plan, _super);
    function Plan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Plan;
}(graphqueryable_1.GraphQueryableInstance));
exports.Plan = Plan;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var graphqueryable_1 = __webpack_require__(6);
var parsers_1 = __webpack_require__(7);
var Photo = /** @class */ (function (_super) {
    __extends(Photo, _super);
    function Photo(baseUrl, path) {
        if (path === void 0) { path = "photo"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets the image bytes as a blob (browser)
     */
    Photo.prototype.getBlob = function () {
        return this.clone(Photo, "$value", false).get(new parsers_1.BlobFileParser());
    };
    /**
     * Gets the image file byets as a Buffer (node.js)
     */
    Photo.prototype.getBuffer = function () {
        return this.clone(Photo, "$value", false).get(new parsers_1.BufferFileParser());
    };
    /**
     * Sets the file bytes
     *
     * @param content Image file contents, max 4 MB
     */
    Photo.prototype.setContent = function (content) {
        return this.clone(Photo, "$value", false).patchCore({
            body: content,
        });
    };
    return Photo;
}(graphqueryable_1.GraphQueryableInstance));
exports.Photo = Photo;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(64));
var collections_1 = __webpack_require__(8);
exports.Dictionary = collections_1.Dictionary;
var util_1 = __webpack_require__(0);
exports.Util = util_1.Util;
__export(__webpack_require__(4));
__export(__webpack_require__(2));
__export(__webpack_require__(12));


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cachingConfigurationProvider_1 = __webpack_require__(42);
exports.CachingConfigurationProvider = cachingConfigurationProvider_1.default;
var spListConfigurationProvider_1 = __webpack_require__(65);
exports.SPListConfigurationProvider = spListConfigurationProvider_1.default;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cachingConfigurationProvider_1 = __webpack_require__(42);
/**
 * A configuration provider which loads configuration values from a SharePoint list
 *
 */
var SPListConfigurationProvider = /** @class */ (function () {
    /**
     * Creates a new SharePoint list based configuration provider
     * @constructor
     * @param {string} webUrl Url of the SharePoint site, where the configuration list is located
     * @param {string} listTitle Title of the SharePoint list, which contains the configuration settings (optional, default = "config")
     */
    function SPListConfigurationProvider(sourceWeb, sourceListTitle) {
        if (sourceListTitle === void 0) { sourceListTitle = "config"; }
        this.sourceWeb = sourceWeb;
        this.sourceListTitle = sourceListTitle;
    }
    Object.defineProperty(SPListConfigurationProvider.prototype, "web", {
        /**
         * Gets the url of the SharePoint site, where the configuration list is located
         *
         * @return {string} Url address of the site
         */
        get: function () {
            return this.sourceWeb;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPListConfigurationProvider.prototype, "listTitle", {
        /**
         * Gets the title of the SharePoint list, which contains the configuration settings
         *
         * @return {string} List title
         */
        get: function () {
            return this.sourceListTitle;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Loads the configuration values from the SharePoint list
     *
     * @return {Promise<TypedHash<string>>} Promise of loaded configuration values
     */
    SPListConfigurationProvider.prototype.getConfiguration = function () {
        return this.web.lists.getByTitle(this.listTitle).items.select("Title", "Value")
            .getAs().then(function (data) {
            return data.reduce(function (configuration, item) {
                return Object.defineProperty(configuration, item.Title, {
                    configurable: false,
                    enumerable: false,
                    value: item.Value,
                    writable: false,
                });
            }, {});
        });
    };
    /**
     * Wraps the current provider in a cache enabled provider
     *
     * @return {CachingConfigurationProvider} Caching providers which wraps the current provider
     */
    SPListConfigurationProvider.prototype.asCaching = function () {
        var cacheKey = "splist_" + this.web.toUrl() + "+" + this.listTitle;
        return new cachingConfigurationProvider_1.default(this, cacheKey);
    };
    return SPListConfigurationProvider;
}());
exports.default = SPListConfigurationProvider;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(67));


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var graphqueryable_1 = __webpack_require__(6);
exports.GraphQueryable = graphqueryable_1.GraphQueryable;
exports.GraphQueryableCollection = graphqueryable_1.GraphQueryableCollection;
exports.GraphQueryableInstance = graphqueryable_1.GraphQueryableInstance;
exports.GraphQueryableSearchableCollection = graphqueryable_1.GraphQueryableSearchableCollection;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var httpclient_1 = __webpack_require__(21);
exports.HttpClient = httpclient_1.HttpClient;
var sprequestexecutorclient_1 = __webpack_require__(69);
exports.SPRequestExecutorClient = sprequestexecutorclient_1.SPRequestExecutorClient;
var nodefetchclient_1 = __webpack_require__(70);
exports.NodeFetchClient = nodefetchclient_1.NodeFetchClient;
var fetchclient_1 = __webpack_require__(27);
exports.FetchClient = fetchclient_1.FetchClient;
var graphclient_1 = __webpack_require__(41);
exports.GraphHttpClient = graphclient_1.GraphHttpClient;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var exceptions_1 = __webpack_require__(2);
/**
 * Makes requests using the SP.RequestExecutor library.
 */
var SPRequestExecutorClient = /** @class */ (function () {
    function SPRequestExecutorClient() {
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
                statusText: spResponse.statusText,
            });
        };
    }
    /**
     * Fetches a URL using the SP.RequestExecutor library.
     */
    SPRequestExecutorClient.prototype.fetch = function (url, options) {
        var _this = this;
        if (typeof SP === "undefined" || typeof SP.RequestExecutor === "undefined") {
            throw new exceptions_1.SPRequestExecutorUndefinedException();
        }
        var addinWebUrl = url.substring(0, url.indexOf("/_api")), executor = new SP.RequestExecutor(addinWebUrl);
        var headers = {}, iterator, temp;
        if (options.headers && options.headers instanceof Headers) {
            iterator = options.headers.entries();
            temp = iterator.next();
            while (!temp.done) {
                headers[temp.value[0]] = temp.value[1];
                temp = iterator.next();
            }
        }
        else {
            headers = options.headers;
        }
        // this is a way to determine if we need to set the binaryStringRequestBody by testing what method we are calling
        // and if they would normally have a binary body. This addresses issue #565.
        var paths = [
            "files\/add",
            "files\/addTemplateFile",
            "file\/startUpload",
            "file\/continueUpload",
            "file\/finishUpload",
            "attachmentfiles\/add",
        ];
        var isBinaryRequest = (new RegExp(paths.join("|"), "i")).test(url);
        return new Promise(function (resolve, reject) {
            var requestOptions = {
                error: function (error) {
                    reject(_this.convertToResponse(error));
                },
                headers: headers,
                method: options.method,
                success: function (response) {
                    resolve(_this.convertToResponse(response));
                },
                url: url,
            };
            if (options.body) {
                requestOptions = util_1.Util.extend(requestOptions, { body: options.body });
                if (isBinaryRequest) {
                    requestOptions = util_1.Util.extend(requestOptions, { binaryStringRequestBody: true });
                }
            }
            executor.executeAsync(requestOptions);
        });
    };
    return SPRequestExecutorClient;
}());
exports.SPRequestExecutorClient = SPRequestExecutorClient;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var exceptions_1 = __webpack_require__(2);
/**
 * This module is substituted for the NodeFetchClient.ts during the packaging process. This helps to reduce the pnp.js file size by
 * not including all of the node dependencies
 */
var NodeFetchClient = /** @class */ (function () {
    function NodeFetchClient() {
    }
    /**
     * Always throws an error that NodeFetchClient is not supported for use in the browser
     */
    NodeFetchClient.prototype.fetch = function () {
        throw new exceptions_1.NodeFetchClientUnsupportedException();
    };
    return NodeFetchClient;
}());
exports.NodeFetchClient = NodeFetchClient;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(13));
__export(__webpack_require__(7));
__export(__webpack_require__(29));
__export(__webpack_require__(19));


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(73));


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var appcatalog_1 = __webpack_require__(39);
exports.AppCatalog = appcatalog_1.AppCatalog;
exports.App = appcatalog_1.App;
var files_1 = __webpack_require__(9);
exports.CheckinType = files_1.CheckinType;
exports.WebPartsPersonalizationScope = files_1.WebPartsPersonalizationScope;
exports.MoveOperations = files_1.MoveOperations;
exports.TemplateFileType = files_1.TemplateFileType;
exports.File = files_1.File;
exports.Files = files_1.Files;
var folders_1 = __webpack_require__(18);
exports.Folder = folders_1.Folder;
exports.Folders = folders_1.Folders;
var items_1 = __webpack_require__(15);
exports.Item = items_1.Item;
exports.Items = items_1.Items;
exports.PagedItemCollection = items_1.PagedItemCollection;
var navigation_1 = __webpack_require__(36);
exports.NavigationNodes = navigation_1.NavigationNodes;
exports.NavigationNode = navigation_1.NavigationNode;
var lists_1 = __webpack_require__(14);
exports.List = lists_1.List;
exports.Lists = lists_1.Lists;
var odata_1 = __webpack_require__(5);
exports.spExtractODataId = odata_1.spExtractODataId;
exports.spODataEntity = odata_1.spODataEntity;
exports.spODataEntityArray = odata_1.spODataEntityArray;
var sharepointqueryable_1 = __webpack_require__(1);
exports.SharePointQueryable = sharepointqueryable_1.SharePointQueryable;
exports.SharePointQueryableInstance = sharepointqueryable_1.SharePointQueryableInstance;
exports.SharePointQueryableCollection = sharepointqueryable_1.SharePointQueryableCollection;
var roles_1 = __webpack_require__(22);
exports.RoleDefinitionBindings = roles_1.RoleDefinitionBindings;
var search_1 = __webpack_require__(28);
exports.Search = search_1.Search;
exports.SearchQueryBuilder = search_1.SearchQueryBuilder;
exports.SearchResults = search_1.SearchResults;
exports.SortDirection = search_1.SortDirection;
exports.ReorderingRuleMatchType = search_1.ReorderingRuleMatchType;
exports.QueryPropertyValueType = search_1.QueryPropertyValueType;
exports.SearchBuiltInSourceId = search_1.SearchBuiltInSourceId;
var searchsuggest_1 = __webpack_require__(30);
exports.SearchSuggest = searchsuggest_1.SearchSuggest;
exports.SearchSuggestResult = searchsuggest_1.SearchSuggestResult;
var site_1 = __webpack_require__(31);
exports.Site = site_1.Site;
__export(__webpack_require__(17));
var utilities_1 = __webpack_require__(40);
exports.UtilityMethod = utilities_1.UtilityMethod;
var webparts_1 = __webpack_require__(34);
exports.WebPartDefinitions = webparts_1.WebPartDefinitions;
exports.WebPartDefinition = webparts_1.WebPartDefinition;
exports.WebPart = webparts_1.WebPart;
var webs_1 = __webpack_require__(11);
exports.Web = webs_1.Web;


/***/ })
/******/ ]);
});
//# sourceMappingURL=pnp.js.map