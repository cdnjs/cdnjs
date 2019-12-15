/**
@license
 * @pnp/sp v1.1.2-1 - pnp - provides a fluent api for working with SharePoint REST
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2018 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https:github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pnp"] = factory();
	else
		root["pnp"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = __extends;
/* unused harmony export __assign */
/* unused harmony export __rest */
/* harmony export (immutable) */ __webpack_exports__["a"] = __decorate;
/* unused harmony export __param */
/* unused harmony export __metadata */
/* unused harmony export __awaiter */
/* unused harmony export __generator */
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/* unused harmony export __makeTemplateObject */
/* unused harmony export __importStar */
/* unused harmony export __importDefault */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharePointQueryable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SharePointQueryableCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SharePointQueryableInstance; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pnp_odata__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pnp_logging__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__net_sphttpclient__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_toabsoluteurl__ = __webpack_require__(16);






/**
 * SharePointQueryable Base Class
 *
 */
var SharePointQueryable = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SharePointQueryable, _super);
    /**
     * Creates a new instance of the SharePointQueryable class
     *
     * @constructor
     * @param baseUrl A string or SharePointQueryable that should form the base part of the url
     *
     */
    function SharePointQueryable(baseUrl, path) {
        var _this = _super.call(this) || this;
        if (typeof baseUrl === "string") {
            // we need to do some extra parsing to get the parent url correct if we are
            // being created from just a string.
            if (Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["l" /* isUrlAbsolute */])(baseUrl) || baseUrl.lastIndexOf("/") < 0) {
                _this._parentUrl = baseUrl;
                _this._url = Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["e" /* combinePaths */])(baseUrl, path);
            }
            else if (baseUrl.lastIndexOf("/") > baseUrl.lastIndexOf("(")) {
                // .../items(19)/fields
                var index = baseUrl.lastIndexOf("/");
                _this._parentUrl = baseUrl.slice(0, index);
                path = Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["e" /* combinePaths */])(baseUrl.slice(index), path);
                _this._url = Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["e" /* combinePaths */])(_this._parentUrl, path);
            }
            else {
                // .../items(19)
                var index = baseUrl.lastIndexOf("(");
                _this._parentUrl = baseUrl.slice(0, index);
                _this._url = Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["e" /* combinePaths */])(baseUrl, path);
            }
        }
        else {
            _this.extend(baseUrl, path);
            var target = baseUrl._query.get("@target");
            if (target !== null) {
                _this._query.add("@target", target);
            }
        }
        return _this;
    }
    /**
     * Creates a new instance of the supplied factory and extends this into that new instance
     *
     * @param factory constructor for the new SharePointQueryable
     */
    SharePointQueryable.prototype.as = function (factory) {
        var o = new factory(this._url, null);
        return Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])(o, this, true);
    };
    /**
     * Gets the full url with query information
     *
     */
    SharePointQueryable.prototype.toUrlAndQuery = function () {
        var aliasedParams = new __WEBPACK_IMPORTED_MODULE_1__pnp_common__["a" /* Dictionary */]();
        var url = this.toUrl().replace(/'!(@.*?)::(.*?)'/ig, function (match, labelName, value) {
            __WEBPACK_IMPORTED_MODULE_3__pnp_logging__["a" /* Logger */].write("Rewriting aliased parameter from match " + match + " to label: " + labelName + " value: " + value, 0 /* Verbose */);
            aliasedParams.add(labelName, "'" + value + "'");
            return labelName;
        });
        // inlude our explicitly set query string params
        aliasedParams.merge(this._query);
        if (aliasedParams.count > 0) {
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
        clone.configure(this._options);
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
        var dependencyDispose = this.hasBatch ? this.addBatchDependency() : function () { return; };
        return Object(__WEBPACK_IMPORTED_MODULE_5__utils_toabsoluteurl__["a" /* toAbsoluteUrl */])(this.toUrlAndQuery()).then(function (url) {
            Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["n" /* mergeOptions */])(options, _this._options);
            // build our request context
            var context = {
                batch: _this.batch,
                batchDependency: dependencyDispose,
                cachingOptions: _this._cachingOptions,
                clientFactory: function () { return new __WEBPACK_IMPORTED_MODULE_4__net_sphttpclient__["a" /* SPHttpClient */](); },
                isBatched: _this.hasBatch,
                isCached: /^get$/i.test(verb) && _this._useCaching,
                options: options,
                parser: parser,
                pipeline: pipeline,
                requestAbsoluteUrl: url,
                requestId: Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["j" /* getGUID */])(),
                verb: verb,
            };
            return context;
        });
    };
    return SharePointQueryable;
}(__WEBPACK_IMPORTED_MODULE_2__pnp_odata__["g" /* ODataQueryable */]));

/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
var SharePointQueryableCollection = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SharePointQueryableCollection, _super);
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
     * Orders based on the supplied fields
     *
     * @param orderby The name of the field on which to sort
     * @param ascending If false DESC is appended, otherwise ASC (default)
     */
    SharePointQueryableCollection.prototype.orderBy = function (orderBy, ascending) {
        var _this = this;
        if (ascending === void 0) { ascending = true; }
        var query = this._query.getKeys().filter(function (k) { return k === "$orderby"; }).map(function (k) { return _this._query.get(k); });
        query.push(orderBy + " " + (ascending ? "asc" : "desc"));
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

/**
 * Represents an instance that can be selected
 *
 */
var SharePointQueryableInstance = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SharePointQueryableInstance, _super);
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

//# sourceMappingURL=sharepointqueryable.js.map

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* unused harmony export AdalClient */
/* unused harmony export readBlobAsText */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return readBlobAsArrayBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Dictionary; });
/* unused harmony export deprecatedClass */
/* unused harmony export deprecated */
/* unused harmony export beta */
/* unused harmony export UrlException */
/* unused harmony export setup */
/* unused harmony export RuntimeConfigImpl */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return RuntimeConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return mergeHeaders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return mergeOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FetchClient; });
/* unused harmony export BearerTokenFetchClient */
/* unused harmony export PnPClientStorageWrapper */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PnPClientStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return getCtxCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return dateAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return combinePaths; });
/* unused harmony export getRandomString */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return getGUID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return isFunc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return objectDefinedNotNull; });
/* unused harmony export isArray */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return isUrlAbsolute; });
/* unused harmony export stringIsNullOrEmpty */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return getAttrValueFromString; });
/* unused harmony export sanitizeGuid */
/* unused harmony export Util */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pnp_logging__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_adal_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_adal_angular___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_adal_angular__);
/**
@license
 * @pnp/common v1.1.2-1 - pnp - provides shared functionality across all pnp libraries
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2018 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https:github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */




function deprecatedClass(deprecationVersion, message) {
    return function (target) {
        __WEBPACK_IMPORTED_MODULE_0__pnp_logging__["a" /* Logger */].log({
            data: {
                target: target,
            },
            level: 2 /* Warning */,
            message: "(" + deprecationVersion + ") " + message,
        });
    };
}
function deprecated(deprecationVersion, message) {
    return function (target, propertyKey, descriptor) {
        var method = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            __WEBPACK_IMPORTED_MODULE_0__pnp_logging__["a" /* Logger */].log({
                data: {
                    descriptor: descriptor,
                    propertyKey: propertyKey,
                    target: target,
                },
                level: 2 /* Warning */,
                message: "(" + deprecationVersion + ") " + message,
            });
            return method.apply(this, args);
        };
    };
}
function beta(message) {
    if (message === void 0) { message = "This feature is flagged as beta and is subject to change."; }
    return function (target, propertyKey, descriptor) {
        var method = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            __WEBPACK_IMPORTED_MODULE_0__pnp_logging__["a" /* Logger */].log({
                data: {
                    descriptor: descriptor,
                    propertyKey: propertyKey,
                    target: target,
                },
                level: 2 /* Warning */,
                message: message,
            });
            return method.apply(this, args);
        };
    };
}

/**
 * Gets a callback function which will maintain context across async calls.
 * Allows for the calling pattern getCtxCallback(thisobj, method, methodarg1, methodarg2, ...)
 *
 * @param context The object that will be the 'this' value in the callback
 * @param method The method to which we will apply the context and parameters
 * @param params Optional, additional arguments to supply to the wrapped method when it is invoked
 */
function getCtxCallback(context, method) {
    var params = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        params[_i - 2] = arguments[_i];
    }
    return function () {
        method.apply(context, params);
    };
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
function dateAdd(date, interval, units) {
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
}
/**
 * Combines an arbitrary set of paths ensuring and normalizes the slashes
 *
 * @param paths 0 to n path parts to combine
 */
function combinePaths() {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    return paths
        .filter(function (path) { return !stringIsNullOrEmpty(path); })
        .map(function (path) { return path.replace(/^[\\|\/]/, "").replace(/[\\|\/]$/, ""); })
        .join("/")
        .replace(/\\/g, "/");
}
/**
 * Gets a random string of chars length
 *
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 *
 * @param chars The length of the random string to generate
 */
function getRandomString(chars) {
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
function getGUID() {
    var d = new Date().getTime();
    var guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return guid;
}
/* tslint:enable */
/**
 * Determines if a given value is a function
 *
 * @param cf The thing to test for functionness
 */
function isFunc(cf) {
    return typeof cf === "function";
}
/**
 * Determines if an object is both defined and not null
 * @param obj Object to test
 */
function objectDefinedNotNull(obj) {
    return typeof obj !== "undefined" && obj !== null;
}
/**
 * @returns whether the provided parameter is a JavaScript Array or not.
*/
function isArray(array) {
    if (Array.isArray) {
        return Array.isArray(array);
    }
    return array && typeof array.length === "number" && array.constructor === Array;
}
/**
 * Provides functionality to extend the given object by doing a shallow copy
 *
 * @param target The object to which properties will be copied
 * @param source The source object from which properties will be copied
 * @param noOverwrite If true existing properties on the target are not overwritten from the source
 * @param filter If provided allows additional filtering on what properties are copied (propName: string) => boolean
 *
 */
function extend(target, source, noOverwrite, filter) {
    if (noOverwrite === void 0) { noOverwrite = false; }
    if (!objectDefinedNotNull(source)) {
        return target;
    }
    // ensure we don't overwrite things we don't want overwritten
    var check = noOverwrite ? function (o, i) { return !(i in o); } : function () { return true; };
    // allow filtering of copied properties
    var check2 = isFunc(filter) ? filter : function () { return true; };
    // final filter we will use
    var f = function (v) { return check(target, v) && check2(v); };
    return Object.getOwnPropertyNames(source)
        .filter(f)
        .reduce(function (t, v) {
        t[v] = source[v];
        return t;
    }, target);
}
/**
 * Determines if a given url is absolute
 *
 * @param url The url to check to see if it is absolute
 */
function isUrlAbsolute(url) {
    return /^https?:\/\/|^\/\//i.test(url);
}
/**
 * Determines if a string is null or empty or undefined
 *
 * @param s The string to test
 */
function stringIsNullOrEmpty(s) {
    return typeof s === "undefined" || s === null || s.length < 1;
}
/**
 * Gets an attribute value from an html/xml string block. NOTE: if the input attribute value has
 * RegEx special characters they will be escaped in the returned string
 *
 * @param html HTML to search
 * @param attrName The name of the attribute to find
 */
function getAttrValueFromString(html, attrName) {
    // make the input safe for regex
    html = html.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var reg = new RegExp(attrName + "\\s*?=\\s*?(\"|')([^\\1]*?)\\1", "i");
    var match = reg.exec(html);
    return match !== null && match.length > 0 ? match[2] : null;
}
/**
 * Ensures guid values are represented consistently as "ea123463-137d-4ae3-89b8-cf3fc578ca05"
 *
 * @param guid The candidate guid
 */
function sanitizeGuid(guid) {
    if (stringIsNullOrEmpty(guid)) {
        return guid;
    }
    var matches = /([0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12})/i.exec(guid);
    return matches === null ? guid : matches[1];
}
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
    Util.getCtxCallback = getCtxCallback;
    /**
     * Adds a value to a date
     *
     * @param date The date to which we will add units, done in local time
     * @param interval The name of the interval to add, one of: ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second']
     * @param units The amount to add to date of the given interval
     *
     * http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
     */
    Util.dateAdd = dateAdd;
    /**
     * Combines an arbitrary set of paths ensuring and normalizes the slashes
     *
     * @param paths 0 to n path parts to combine
     */
    Util.combinePaths = combinePaths;
    /**
     * Gets a random string of chars length
     *
     * @param chars The length of the random string to generate
     */
    Util.getRandomString = getRandomString;
    /**
     * Gets a random GUID value
     *
     * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
     */
    Util.getGUID = getGUID;
    /**
     * Determines if a given value is a function
     *
     * @param cf The thing to test for functionness
     */
    Util.isFunc = isFunc;
    /**
     * Determines if an object is both defined and not null
     * @param obj Object to test
     */
    Util.objectDefinedNotNull = objectDefinedNotNull;
    /**
     * @returns whether the provided parameter is a JavaScript Array or not.
    */
    Util.isArray = isArray;
    /**
     * Provides functionality to extend the given object by doing a shallow copy
     *
     * @param target The object to which properties will be copied
     * @param source The source object from which properties will be copied
     * @param noOverwrite If true existing properties on the target are not overwritten from the source
     *
     */
    Util.extend = extend;
    /**
     * Determines if a given url is absolute
     *
     * @param url The url to check to see if it is absolute
     */
    Util.isUrlAbsolute = isUrlAbsolute;
    /**
     * Determines if a string is null or empty or undefined
     *
     * @param s The string to test
     */
    Util.stringIsNullOrEmpty = stringIsNullOrEmpty;
    /**
     * Gets an attribute value from an html/xml string block
     *
     * @param html HTML to search
     * @param attrName The name of the attribute to find
     */
    Util.getAttrValueFromString = getAttrValueFromString;
    /**
     * Ensures guid values are represented consistently as "ea123463-137d-4ae3-89b8-cf3fc578ca05"
     *
     * @param guid The candidate guid id
     */
    Util.sanitizeGuid = sanitizeGuid;
    return Util;
}());

function mergeHeaders(target, source) {
    if (typeof source !== "undefined" && source !== null) {
        var temp = new Request("", { headers: source });
        temp.headers.forEach(function (value, name) {
            target.append(name, value);
        });
    }
}
function mergeOptions(target, source) {
    if (objectDefinedNotNull(source)) {
        var headers = extend(target.headers || {}, source.headers);
        target = extend(target, source);
        target.headers = headers;
    }
}
/**
 * Makes requests using the global/window fetch API
 */
var FetchClient = /** @class */ (function () {
    function FetchClient() {
    }
    FetchClient.prototype.fetch = function (url, options) {
        return global.fetch(url, options);
    };
    return FetchClient;
}());
/**
 * Makes requests using the fetch API adding the supplied token to the Authorization header
 */
var BearerTokenFetchClient = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_1_tslib__["b" /* __extends */])(BearerTokenFetchClient, _super);
    function BearerTokenFetchClient(_token) {
        var _this = _super.call(this) || this;
        _this._token = _token;
        return _this;
    }
    Object.defineProperty(BearerTokenFetchClient.prototype, "token", {
        get: function () {
            return this._token;
        },
        set: function (token) {
            this._token = token;
        },
        enumerable: true,
        configurable: true
    });
    BearerTokenFetchClient.prototype.fetch = function (url, options) {
        if (options === void 0) { options = {}; }
        var headers = new Headers();
        mergeHeaders(headers, options.headers);
        headers.set("Authorization", "Bearer " + this._token);
        options.headers = headers;
        return _super.prototype.fetch.call(this, url, options);
    };
    return BearerTokenFetchClient;
}(FetchClient));

/**
 * Azure AD Client for use in the browser
 */
var AdalClient = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_1_tslib__["b" /* __extends */])(AdalClient, _super);
    /**
     * Creates a new instance of AdalClient
     * @param clientId Azure App Id
     * @param tenant Office 365 tenant (Ex: {tenant}.onmicrosoft.com)
     * @param redirectUri The redirect url used to authenticate the
     */
    function AdalClient(clientId, tenant, redirectUri) {
        var _this = _super.call(this, null) || this;
        _this.clientId = clientId;
        _this.tenant = tenant;
        _this.redirectUri = redirectUri;
        return _this;
    }
    /**
     * Creates a new AdalClient using the values of the supplied SPFx context
     *
     * @param spfxContext Current SPFx context
     * @param clientId Optional client id to use instead of the built-in SPFx id
     * @description Using this method and the default clientId requires that the features described in
     * this article https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aadhttpclient are activated in the tenant. If not you can
     * creat your own app, grant permissions and use that clientId here along with the SPFx context
     */
    AdalClient.fromSPFxContext = function (spfxContext, cliendId) {
        if (cliendId === void 0) { cliendId = "c58637bb-e2e1-4312-8a00-04b5ffcd3403"; }
        // this "magic" client id is the one to which permissions are granted behind the scenes
        // this redirectUrl is the page as used by spfx
        return new AdalClient(cliendId, spfxContext.pageContext.aadInfo.tenantId.toString(), combinePaths(window.location.origin, "/_forms/spfxsinglesignon.aspx"));
    };
    /**
     * Conducts the fetch opertation against the AAD secured resource
     *
     * @param url Absolute URL for the request
     * @param options Any fetch options passed to the underlying fetch implementation
     */
    AdalClient.prototype.fetch = function (url, options) {
        var _this = this;
        if (!isUrlAbsolute(url)) {
            throw new Error("You must supply absolute urls to AdalClient.fetch.");
        }
        // the url we are calling is the resource
        return this.getToken(this.getResource(url)).then(function (token) {
            _this.token = token;
            return _super.prototype.fetch.call(_this, url, options);
        });
    };
    /**
     * Gets a token based on the current user
     *
     * @param resource The resource for which we are requesting a token
     */
    AdalClient.prototype.getToken = function (resource) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.ensureAuthContext().then(function (_) { return _this.login(); }).then(function (_) {
                AdalClient._authContext.acquireToken(resource, function (message, token) {
                    if (message) {
                        return reject(new Error(message));
                    }
                    resolve(token);
                });
            }).catch(reject);
        });
    };
    /**
     * Ensures we have created and setup the adal AuthenticationContext instance
     */
    AdalClient.prototype.ensureAuthContext = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (AdalClient._authContext === null) {
                AdalClient._authContext = Object(__WEBPACK_IMPORTED_MODULE_2_adal_angular__["inject"])({
                    clientId: _this.clientId,
                    displayCall: function (url) {
                        if (_this._displayCallback) {
                            _this._displayCallback(url);
                        }
                    },
                    navigateToLoginRequestUrl: false,
                    redirectUri: _this.redirectUri,
                    tenant: _this.tenant,
                });
            }
            resolve();
        });
    };
    /**
     * Ensures the current user is logged in
     */
    AdalClient.prototype.login = function () {
        var _this = this;
        if (this._loginPromise) {
            return this._loginPromise;
        }
        this._loginPromise = new Promise(function (resolve, reject) {
            if (AdalClient._authContext.getCachedUser()) {
                return resolve();
            }
            _this._displayCallback = function (url) {
                var popupWindow = window.open(url, "login", "width=483, height=600");
                if (!popupWindow) {
                    return reject(new Error("Could not open pop-up window for auth. Likely pop-ups are blocked by the browser."));
                }
                if (popupWindow && popupWindow.focus) {
                    popupWindow.focus();
                }
                var pollTimer = window.setInterval(function () {
                    if (!popupWindow || popupWindow.closed || popupWindow.closed === undefined) {
                        window.clearInterval(pollTimer);
                    }
                    try {
                        if (popupWindow.document.URL.indexOf(_this.redirectUri) !== -1) {
                            window.clearInterval(pollTimer);
                            AdalClient._authContext.handleWindowCallback(popupWindow.location.hash);
                            popupWindow.close();
                            resolve();
                        }
                    }
                    catch (e) {
                        reject(e);
                    }
                }, 30);
            };
            // this triggers the login process
            _this.ensureAuthContext().then(function (_) {
                AdalClient._authContext._loginInProgress = false;
                AdalClient._authContext.login();
                _this._displayCallback = null;
            });
        });
        return this._loginPromise;
    };
    /**
     * Parses out the root of the request url to use as the resource when getting the token
     *
     * After: https://gist.github.com/jlong/2428561
     * @param url The url to parse
     */
    AdalClient.prototype.getResource = function (url) {
        var parser = document.createElement("a");
        parser.href = url;
        return parser.protocol + "//" + parser.hostname;
    };
    /**
     * Our auth context
     */
    AdalClient._authContext = null;
    return AdalClient;
}(BearerTokenFetchClient));

/**
 * Reads a blob as text
 *
 * @param blob The data to read
 */
function readBlobAsText(blob) {
    return readBlobAs(blob, "string");
}
/**
 * Reads a blob into an array buffer
 *
 * @param blob The data to read
 */
function readBlobAsArrayBuffer(blob) {
    return readBlobAs(blob, "buffer");
}
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
            if (o === null) {
                this.remove(key);
            }
            else {
                this.values[index] = o;
            }
        }
        else {
            if (o !== null) {
                this.keys.push(key);
                this.values.push(o);
            }
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
    Object.defineProperty(Dictionary.prototype, "count", {
        /**
         * Gets a count of the items currently in the dictionary
         */
        get: function () {
            return this.keys.length;
        },
        enumerable: true,
        configurable: true
    });
    return Dictionary;
}());

var UrlException = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_1_tslib__["b" /* __extends */])(UrlException, _super);
    function UrlException(msg) {
        var _this = _super.call(this, msg) || this;
        _this.name = "UrlException";
        __WEBPACK_IMPORTED_MODULE_0__pnp_logging__["a" /* Logger */].log({ data: {}, level: 3 /* Error */, message: "[" + _this.name + "]::" + _this.message });
        return _this;
    }
    return UrlException;
}(Error));

function setup(config) {
    RuntimeConfig.extend(config);
}
var RuntimeConfigImpl = /** @class */ (function () {
    function RuntimeConfigImpl() {
        this._v = new Dictionary();
        // setup defaults
        this._v.add("defaultCachingStore", "session");
        this._v.add("defaultCachingTimeoutSeconds", 60);
        this._v.add("globalCacheDisable", false);
        this._v.add("enableCacheExpiration", false);
        this._v.add("cacheExpirationIntervalMilliseconds", 750);
        this._v.add("spfxContext", null);
    }
    /**
     *
     * @param config The set of properties to add to the globa configuration instance
     */
    RuntimeConfigImpl.prototype.extend = function (config) {
        var _this = this;
        Object.keys(config).forEach(function (key) {
            _this._v.add(key, config[key]);
        });
    };
    RuntimeConfigImpl.prototype.get = function (key) {
        return this._v.get(key);
    };
    Object.defineProperty(RuntimeConfigImpl.prototype, "defaultCachingStore", {
        get: function () {
            return this.get("defaultCachingStore");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "defaultCachingTimeoutSeconds", {
        get: function () {
            return this.get("defaultCachingTimeoutSeconds");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "globalCacheDisable", {
        get: function () {
            return this.get("globalCacheDisable");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "enableCacheExpiration", {
        get: function () {
            return this.get("enableCacheExpiration");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "cacheExpirationIntervalMilliseconds", {
        get: function () {
            return this.get("cacheExpirationIntervalMilliseconds");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "spfxContext", {
        get: function () {
            return this.get("spfxContext");
        },
        enumerable: true,
        configurable: true
    });
    return RuntimeConfigImpl;
}());
var _runtimeConfig = new RuntimeConfigImpl();
var RuntimeConfig = _runtimeConfig;

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
        if (defaultTimeoutMinutes === void 0) { defaultTimeoutMinutes = -1; }
        this.store = store;
        this.defaultTimeoutMinutes = defaultTimeoutMinutes;
        this.enabled = this.test();
        // if the cache timeout is enabled call the handler
        // this will clear any expired items and set the timeout function
        if (RuntimeConfig.enableCacheExpiration) {
            __WEBPACK_IMPORTED_MODULE_0__pnp_logging__["a" /* Logger */].write("Enabling cache expiration.", 1 /* Info */);
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
            __WEBPACK_IMPORTED_MODULE_0__pnp_logging__["a" /* Logger */].write("Removing item with key '" + key + "' from cache due to expiration.", 1 /* Info */);
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
                    if (key !== null) {
                        // test the stored item to see if we stored it
                        if (/["|']?pnp["|']? ?: ?1/i.test(_this.store.getItem(key))) {
                            // get those items as get will delete from cache if they are expired
                            _this.get(key);
                        }
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
            var defaultTimeout = RuntimeConfig.defaultCachingTimeoutSeconds;
            if (this.defaultTimeoutMinutes > 0) {
                defaultTimeout = this.defaultTimeoutMinutes * 60;
            }
            expire = dateAdd(new Date(), "second", defaultTimeout);
        }
        return JSON.stringify({ pnp: 1, expiration: expire, value: o });
    };
    /**
     * Deletes expired items added by this library in this.store and sets a timeout to call itself
     */
    PnPClientStorageWrapper.prototype.cacheExpirationHandler = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_0__pnp_logging__["a" /* Logger */].write("Called cache expiration handler.", 0 /* Verbose */);
        this.deleteExpired().then(function (_) {
            // call ourself in the future
            setTimeout(getCtxCallback(_this, _this.cacheExpirationHandler), RuntimeConfig.cacheExpirationIntervalMilliseconds);
        }).catch(function (e) {
            // we've got some error - so just stop the loop and report the error
            __WEBPACK_IMPORTED_MODULE_0__pnp_logging__["a" /* Logger */].log({
                data: e,
                level: 3 /* Error */,
                message: "Error deleting expired cache entries, see data for details. Timeout not reset.",
            });
        });
    };
    return PnPClientStorageWrapper;
}());
/**
 * A thin implementation of in-memory storage for use in nodejs
 */
var MemoryStorage = /** @class */ (function () {
    function MemoryStorage(_store) {
        if (_store === void 0) { _store = new Dictionary(); }
        this._store = _store;
    }
    Object.defineProperty(MemoryStorage.prototype, "length", {
        get: function () {
            return this._store.count;
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


//# sourceMappingURL=common.es5.js.map

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(27)))

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = spExtractODataId;
/* harmony export (immutable) */ __webpack_exports__["b"] = spGetEntityUrl;
/* harmony export (immutable) */ __webpack_exports__["c"] = spODataEntity;
/* harmony export (immutable) */ __webpack_exports__["d"] = spODataEntityArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_extractweburl__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pnp_logging__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__exceptions__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pnp_odata__ = __webpack_require__(5);






function spExtractODataId(candidate) {
    if (candidate.hasOwnProperty("odata.id")) {
        return candidate["odata.id"];
    }
    else if (candidate.hasOwnProperty("__metadata") && candidate.__metadata.hasOwnProperty("id")) {
        return candidate.__metadata.id;
    }
    else {
        throw new __WEBPACK_IMPORTED_MODULE_4__exceptions__["d" /* SPODataIdException */](candidate);
    }
}
var SPODataEntityParserImpl = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SPODataEntityParserImpl, _super);
    function SPODataEntityParserImpl(factory) {
        var _this = _super.call(this) || this;
        _this.factory = factory;
        _this.hydrate = function (d) {
            var o = new _this.factory(spGetEntityUrl(d), null);
            return Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(o, d);
        };
        return _this;
    }
    SPODataEntityParserImpl.prototype.parse = function (r) {
        var _this = this;
        return _super.prototype.parse.call(this, r).then(function (d) {
            var o = new _this.factory(spGetEntityUrl(d), null);
            return Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(o, d);
        });
    };
    return SPODataEntityParserImpl;
}(__WEBPACK_IMPORTED_MODULE_5__pnp_odata__["f" /* ODataParserBase */]));
var SPODataEntityArrayParserImpl = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SPODataEntityArrayParserImpl, _super);
    function SPODataEntityArrayParserImpl(factory) {
        var _this = _super.call(this) || this;
        _this.factory = factory;
        _this.hydrate = function (d) {
            return d.map(function (v) {
                var o = new _this.factory(spGetEntityUrl(v), null);
                return Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(o, v);
            });
        };
        return _this;
    }
    SPODataEntityArrayParserImpl.prototype.parse = function (r) {
        var _this = this;
        return _super.prototype.parse.call(this, r).then(function (d) {
            return d.map(function (v) {
                var o = new _this.factory(spGetEntityUrl(v), null);
                return Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(o, v);
            });
        });
    };
    return SPODataEntityArrayParserImpl;
}(__WEBPACK_IMPORTED_MODULE_5__pnp_odata__["f" /* ODataParserBase */]));
function spGetEntityUrl(entity) {
    if (entity.hasOwnProperty("odata.metadata") && entity.hasOwnProperty("odata.editLink")) {
        // we are dealign with minimal metadata (default)
        return Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["e" /* combinePaths */])(Object(__WEBPACK_IMPORTED_MODULE_1__utils_extractweburl__["a" /* extractWebUrl */])(entity["odata.metadata"]), "_api", entity["odata.editLink"]);
    }
    else if (entity.hasOwnProperty("odata.editLink")) {
        return entity["odata.editLink"];
    }
    else if (entity.hasOwnProperty("__metadata")) {
        // we are dealing with verbose, which has an absolute uri
        return entity.__metadata.uri;
    }
    else {
        // we are likely dealing with nometadata, so don't error but we won't be able to
        // chain off these objects
        __WEBPACK_IMPORTED_MODULE_3__pnp_logging__["a" /* Logger */].write("No uri information found in ODataEntity parsing, chaining will fail for this object.", 2 /* Warning */);
        return "";
    }
}
function spODataEntity(factory) {
    return new SPODataEntityParserImpl(factory);
}
function spODataEntityArray(factory) {
    return new SPODataEntityArrayParserImpl(factory);
}
//# sourceMappingURL=odata.js.map

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Logger; });
/* unused harmony export LogLevel */
/* unused harmony export ConsoleListener */
/* unused harmony export FunctionListener */
/**
@license
 * @pnp/logging v1.1.2-1 - pnp - light-weight, subscribable logging framework
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2018 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https:github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
/**
 * Class used to subscribe ILogListener and log messages throughout an application
 *
 */
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Object.defineProperty(Logger, "activeLogLevel", {
        /**
         * Gets or sets the active log level to apply for log filtering
         */
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
     * @param level [Optional] if supplied will be used as the level of the entry (Default: LogLevel.Info)
     */
    Logger.write = function (message, level) {
        if (level === void 0) { level = 1 /* Info */; }
        Logger.instance.log({ level: level, message: message });
    };
    /**
     * Writes the supplied string to the subscribed listeners
     *
     * @param json The json object to stringify and write
     * @param level [Optional] if supplied will be used as the level of the entry (Default: LogLevel.Info)
     */
    Logger.writeJSON = function (json, level) {
        if (level === void 0) { level = 1 /* Info */; }
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
     * Logs an error object to the subscribed listeners
     *
     * @param err The error object
     */
    Logger.error = function (err) {
        Logger.instance.log({ data: err, level: 3 /* Error */, message: err.message });
    };
    return Logger;
}());
var LoggerImpl = /** @class */ (function () {
    function LoggerImpl(activeLogLevel, subscribers) {
        if (activeLogLevel === void 0) { activeLogLevel = 2 /* Warning */; }
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
        if (level === void 0) { level = 1 /* Info */; }
        this.log({ level: level, message: message });
    };
    LoggerImpl.prototype.log = function (entry) {
        if (typeof entry !== "undefined" && this.activeLogLevel <= entry.level) {
            this.subscribers.map(function (subscriber) { return subscriber.log(entry); });
        }
    };
    return LoggerImpl;
}());

/**
 * A set of logging levels
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Verbose"] = 0] = "Verbose";
    LogLevel[LogLevel["Info"] = 1] = "Info";
    LogLevel[LogLevel["Warning"] = 2] = "Warning";
    LogLevel[LogLevel["Error"] = 3] = "Error";
    LogLevel[LogLevel["Off"] = 99] = "Off";
})(LogLevel || (LogLevel = {}));

/**
 * Implementation of LogListener which logs to the console
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
            case 0 /* Verbose */:
            case 1 /* Info */:
                console.log(msg);
                break;
            case 2 /* Warning */:
                console.warn(msg);
                break;
            case 3 /* Error */:
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
/**
 * Implementation of LogListener which logs to the supplied function
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


//# sourceMappingURL=logging.es5.js.map


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CachingOptions */
/* unused harmony export CachingParserWrapper */
/* unused harmony export ProcessHttpClientResponseException */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ODataParserBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ODataDefaultParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return TextParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlobParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return JSONParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BufferParser; });
/* unused harmony export LambdaParser */
/* unused harmony export setResult */
/* unused harmony export pipe */
/* unused harmony export requestPipelineMethod */
/* unused harmony export PipelineMethods */
/* unused harmony export getDefaultPipeline */
/* unused harmony export AlreadyInBatchException */
/* unused harmony export Queryable */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ODataQueryable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ODataBatch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pnp_logging__ = __webpack_require__(4);
/**
@license
 * @pnp/odata v1.1.2-1 - pnp - provides shared odata functionality and base classes
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2018 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https:github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */




var CachingOptions = /** @class */ (function () {
    function CachingOptions(key) {
        this.key = key;
        this.expiration = Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["f" /* dateAdd */])(new Date(), "second", __WEBPACK_IMPORTED_MODULE_0__pnp_common__["d" /* RuntimeConfig */].defaultCachingTimeoutSeconds);
        this.storeName = __WEBPACK_IMPORTED_MODULE_0__pnp_common__["d" /* RuntimeConfig */].defaultCachingStore;
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
    CachingOptions.storage = new __WEBPACK_IMPORTED_MODULE_0__pnp_common__["c" /* PnPClientStorage */]();
    return CachingOptions;
}());
var CachingParserWrapper = /** @class */ (function () {
    function CachingParserWrapper(parser, cacheOptions) {
        this.parser = parser;
        this.cacheOptions = cacheOptions;
    }
    CachingParserWrapper.prototype.parse = function (response) {
        var _this = this;
        return this.parser.parse(response).then(function (r) { return _this.cacheData(r); });
    };
    CachingParserWrapper.prototype.cacheData = function (data) {
        if (this.cacheOptions.store !== null) {
            this.cacheOptions.store.put(this.cacheOptions.key, data, this.cacheOptions.expiration);
        }
        return data;
    };
    return CachingParserWrapper;
}());

/**
 * Represents an exception with an HttpClient request
 *
 */
var ProcessHttpClientResponseException = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_1_tslib__["b" /* __extends */])(ProcessHttpClientResponseException, _super);
    function ProcessHttpClientResponseException(status, statusText, data) {
        var _this = _super.call(this, "Error making HttpClient request in queryable: [" + status + "] " + statusText) || this;
        _this.status = status;
        _this.statusText = statusText;
        _this.data = data;
        _this.name = "ProcessHttpClientResponseException";
        __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].log({ data: _this.data, level: 3 /* Error */, message: _this.message });
        return _this;
    }
    return ProcessHttpClientResponseException;
}(Error));
var ODataParserBase = /** @class */ (function () {
    function ODataParserBase() {
    }
    ODataParserBase.prototype.parse = function (r) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.handleError(r, reject)) {
                _this.parseImpl(r, resolve, reject);
            }
        });
    };
    ODataParserBase.prototype.parseImpl = function (r, resolve, reject) {
        var _this = this;
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
    };
    /**
     * Handles a response with ok === false by parsing the body and creating a ProcessHttpClientResponseException
     * which is passed to the reject delegate. This method returns true if there is no error, otherwise false
     *
     * @param r Current response object
     * @param reject reject delegate for the surrounding promise
     */
    ODataParserBase.prototype.handleError = function (r, reject) {
        if (!r.ok) {
            // read the response as text, it may not be valid json
            r.json().then(function (json) {
                // include the headers as they contain diagnostic information
                var data = {
                    responseBody: json,
                    responseHeaders: r.headers,
                };
                reject(new ProcessHttpClientResponseException(r.status, r.statusText, data));
            }).catch(function (e) {
                // we failed to read the body - possibly it is empty. Let's report the original status that caused
                // the request to fail and log the error without parsing the body if anyone needs it for debugging
                __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].log({
                    data: e,
                    level: 2 /* Warning */,
                    message: "There was an error parsing the error response body. See data for details.",
                });
                // include the headers as they contain diagnostic information
                var data = {
                    responseBody: "[[body not available]]",
                    responseHeaders: r.headers,
                };
                reject(new ProcessHttpClientResponseException(r.status, r.statusText, data));
            });
        }
        return r.ok;
    };
    /**
     * Normalizes the json response by removing the various nested levels
     *
     * @param json json object to parse
     */
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
var ODataDefaultParser = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_1_tslib__["b" /* __extends */])(ODataDefaultParser, _super);
    function ODataDefaultParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ODataDefaultParser;
}(ODataParserBase));
var TextParser = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_1_tslib__["b" /* __extends */])(TextParser, _super);
    function TextParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextParser.prototype.parseImpl = function (r, resolve) {
        r.text().then(resolve);
    };
    return TextParser;
}(ODataParserBase));
var BlobParser = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_1_tslib__["b" /* __extends */])(BlobParser, _super);
    function BlobParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlobParser.prototype.parseImpl = function (r, resolve) {
        r.blob().then(resolve);
    };
    return BlobParser;
}(ODataParserBase));
var JSONParser = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_1_tslib__["b" /* __extends */])(JSONParser, _super);
    function JSONParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONParser.prototype.parseImpl = function (r, resolve) {
        r.json().then(resolve);
    };
    return JSONParser;
}(ODataParserBase));
var BufferParser = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_1_tslib__["b" /* __extends */])(BufferParser, _super);
    function BufferParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BufferParser.prototype.parseImpl = function (r, resolve) {
        if (Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["k" /* isFunc */])(r.arrayBuffer)) {
            r.arrayBuffer().then(resolve);
        }
        else {
            r.buffer().then(resolve);
        }
    };
    return BufferParser;
}(ODataParserBase));
var LambdaParser = /** @class */ (function () {
    function LambdaParser(parser) {
        this.parser = parser;
    }
    LambdaParser.prototype.parse = function (r) {
        return this.parser(r);
    };
    return LambdaParser;
}());

/**
 * Resolves the context's result value
 *
 * @param context The current context
 */
function returnResult(context) {
    __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].log({
        data: __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].activeLogLevel === 0 /* Verbose */ ? context.result : {},
        level: 1 /* Info */,
        message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") Returning result from pipeline. Set logging to verbose to see data.",
    });
    return Promise.resolve(context.result || null);
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
/**
 * Invokes the next method in the provided context's pipeline
 *
 * @param c The current request context
 */
function next(c) {
    if (c.pipeline.length > 0) {
        return c.pipeline.shift()(c);
    }
    else {
        return Promise.resolve(c);
    }
}
/**
 * Executes the current request context's pipeline
 *
 * @param context Current context
 */
function pipe(context) {
    if (context.pipeline.length < 1) {
        __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Request pipeline contains no methods!", 2 /* Warning */);
    }
    var promise = next(context).then(function (ctx) { return returnResult(ctx); }).catch(function (e) {
        __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].error(e);
        throw e;
    });
    if (context.isBatched) {
        // this will block the batch's execute method from returning until the child requets have been resolved
        context.batch.addResolveBatchDependency(promise);
    }
    return promise;
}
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
                __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].write("[" + args[0].requestId + "] (" + (new Date()).getTime() + ") Skipping request pipeline method " + propertyKey + ", existing result in pipeline.", 0 /* Verbose */);
                return Promise.resolve(args[0]);
            }
            // apply the tagged method
            __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].write("[" + args[0].requestId + "] (" + (new Date()).getTime() + ") Calling request pipeline method " + propertyKey + ".", 0 /* Verbose */);
            // then chain the next method in the context's pipeline - allows for dynamic pipeline
            return method.apply(target, args).then(function (ctx) { return next(ctx); });
        };
    };
}
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
            __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].log({
                data: __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].activeLogLevel === 1 /* Info */ ? {} : context,
                level: 1 /* Info */,
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
            if (context.isCached) {
                __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Caching is enabled for request, checking cache...", 1 /* Info */);
                var cacheOptions = new CachingOptions(context.requestAbsoluteUrl.toLowerCase());
                if (typeof context.cachingOptions !== "undefined") {
                    cacheOptions = Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["g" /* extend */])(cacheOptions, context.cachingOptions);
                }
                // we may not have a valid store
                if (cacheOptions.store !== null) {
                    // check if we have the data in cache and if so resolve the promise and return
                    var data = cacheOptions.store.get(cacheOptions.key);
                    if (data !== null) {
                        // ensure we clear any held batch dependency we are resolving from the cache
                        __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].log({
                            data: __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].activeLogLevel === 1 /* Info */ ? {} : data,
                            level: 1 /* Info */,
                            message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") Value returned from cache.",
                        });
                        if (Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["k" /* isFunc */])(context.batchDependency)) {
                            context.batchDependency();
                        }
                        // handle the case where a parser needs to take special actions with a cached result
                        if (context.parser.hasOwnProperty("hydrate")) {
                            data = context.parser.hydrate(data);
                        }
                        return setResult(context, data).then(function (ctx) { return resolve(ctx); });
                    }
                }
                __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Value not found in cache.", 1 /* Info */);
                // if we don't then wrap the supplied parser in the caching parser wrapper
                // and send things on their way
                context.parser = new CachingParserWrapper(context.parser, cacheOptions);
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
                var p = context.batch.add(context.requestAbsoluteUrl, context.verb, context.options, context.parser, context.requestId);
                // we release the dependency here to ensure the batch does not execute until the request is added to the batch
                if (Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["k" /* isFunc */])(context.batchDependency)) {
                    context.batchDependency();
                }
                __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Batching request in batch " + context.batch.batchId + ".", 1 /* Info */);
                // we set the result as the promise which will be resolved by the batch's execution
                resolve(setResult(context, p));
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Sending request.", 1 /* Info */);
                // we are not part of a batch, so proceed as normal
                var client = context.clientFactory();
                var opts = Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["g" /* extend */])(context.options || {}, { method: context.verb });
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
                __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].log({
                    data: __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].activeLogLevel === 1 /* Info */ ? {} : context,
                    level: 1 /* Info */,
                    message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") " + context.verb + " request will complete in batch " + context.batch.batchId + ".",
                });
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].log({
                    data: __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].activeLogLevel === 1 /* Info */ ? {} : context,
                    level: 1 /* Info */,
                    message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") Completing " + context.verb + " request.",
                });
            }
            resolve(context);
        });
    };
    Object(__WEBPACK_IMPORTED_MODULE_1_tslib__["a" /* __decorate */])([
        requestPipelineMethod(true)
    ], PipelineMethods, "logStart", null);
    Object(__WEBPACK_IMPORTED_MODULE_1_tslib__["a" /* __decorate */])([
        requestPipelineMethod()
    ], PipelineMethods, "caching", null);
    Object(__WEBPACK_IMPORTED_MODULE_1_tslib__["a" /* __decorate */])([
        requestPipelineMethod()
    ], PipelineMethods, "send", null);
    Object(__WEBPACK_IMPORTED_MODULE_1_tslib__["a" /* __decorate */])([
        requestPipelineMethod(true)
    ], PipelineMethods, "logEnd", null);
    return PipelineMethods;
}());
function getDefaultPipeline() {
    return [
        PipelineMethods.logStart,
        PipelineMethods.caching,
        PipelineMethods.send,
        PipelineMethods.logEnd,
    ].slice(0);
}

var AlreadyInBatchException = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_1_tslib__["b" /* __extends */])(AlreadyInBatchException, _super);
    function AlreadyInBatchException(msg) {
        if (msg === void 0) { msg = "This query is already part of a batch."; }
        var _this = _super.call(this, msg) || this;
        _this.name = "AlreadyInBatchException";
        __WEBPACK_IMPORTED_MODULE_2__pnp_logging__["a" /* Logger */].error(_this);
        return _this;
    }
    return AlreadyInBatchException;
}(Error));
var Queryable = /** @class */ (function () {
    function Queryable() {
        this._query = new __WEBPACK_IMPORTED_MODULE_0__pnp_common__["a" /* Dictionary */]();
        this._options = {};
        this._url = "";
        this._parentUrl = "";
        this._useCaching = false;
        this._cachingOptions = null;
    }
    /**
    * Gets the currentl url
    *
    */
    Queryable.prototype.toUrl = function () {
        return this._url;
    };
    /**
     * Directly concatonates the supplied string to the current url, not normalizing "/" chars
     *
     * @param pathPart The string to concatonate to the url
     */
    Queryable.prototype.concat = function (pathPart) {
        this._url += pathPart;
        return this;
    };
    Object.defineProperty(Queryable.prototype, "query", {
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
    Queryable.prototype.configure = function (options) {
        Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["n" /* mergeOptions */])(this._options, options);
        return this;
    };
    /**
     * Configures this instance from the configure options of the supplied instance
     *
     * @param o Instance from which options should be taken
     */
    Queryable.prototype.configureFrom = function (o) {
        Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["n" /* mergeOptions */])(this._options, o._options);
        return this;
    };
    /**
     * Enables caching for this request
     *
     * @param options Defines the options used when caching this request
     */
    Queryable.prototype.usingCaching = function (options) {
        if (!__WEBPACK_IMPORTED_MODULE_0__pnp_common__["d" /* RuntimeConfig */].globalCacheDisable) {
            this._useCaching = true;
            if (typeof options !== "undefined") {
                this._cachingOptions = options;
            }
        }
        return this;
    };
    Queryable.prototype.getCore = function (parser, options) {
        if (parser === void 0) { parser = new JSONParser(); }
        if (options === void 0) { options = {}; }
        return this.toRequestContext("GET", options, parser, getDefaultPipeline()).then(function (context) { return pipe(context); });
    };
    Queryable.prototype.postCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new JSONParser(); }
        return this.toRequestContext("POST", options, parser, getDefaultPipeline()).then(function (context) { return pipe(context); });
    };
    Queryable.prototype.patchCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new JSONParser(); }
        return this.toRequestContext("PATCH", options, parser, getDefaultPipeline()).then(function (context) { return pipe(context); });
    };
    Queryable.prototype.deleteCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new JSONParser(); }
        return this.toRequestContext("DELETE", options, parser, getDefaultPipeline()).then(function (context) { return pipe(context); });
    };
    Queryable.prototype.putCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new JSONParser(); }
        return this.toRequestContext("PUT", options, parser, getDefaultPipeline()).then(function (context) { return pipe(context); });
    };
    /**
     * Appends the given string and normalizes "/" chars
     *
     * @param pathPart The string to append
     */
    Queryable.prototype.append = function (pathPart) {
        this._url = Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["e" /* combinePaths */])(this._url, pathPart);
    };
    Object.defineProperty(Queryable.prototype, "parentUrl", {
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
    /**
     * Extends this queryable from the provided parent
     *
     * @param parent Parent queryable from which we will derive a base url
     * @param path Additional path
     */
    Queryable.prototype.extend = function (parent, path) {
        this._parentUrl = parent._url;
        this._url = Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["e" /* combinePaths */])(this._parentUrl, path);
        this.configureFrom(parent);
    };
    return Queryable;
}());
var ODataQueryable = /** @class */ (function (_super) {
    Object(__WEBPACK_IMPORTED_MODULE_1_tslib__["b" /* __extends */])(ODataQueryable, _super);
    function ODataQueryable() {
        var _this = _super.call(this) || this;
        _this._batch = null;
        return _this;
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
    ODataQueryable.prototype.inBatch = function (batch) {
        if (this.batch !== null) {
            throw new AlreadyInBatchException();
        }
        this._batch = batch;
        return this;
    };
    /**
     * Gets the currentl url
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
        if (parser === void 0) { parser = new ODataDefaultParser(); }
        if (options === void 0) { options = {}; }
        return this.getCore(parser, options);
    };
    ODataQueryable.prototype.getCore = function (parser, options) {
        if (parser === void 0) { parser = new ODataDefaultParser(); }
        if (options === void 0) { options = {}; }
        return this.toRequestContext("GET", options, parser, getDefaultPipeline()).then(function (context) { return pipe(context); });
    };
    ODataQueryable.prototype.postCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new ODataDefaultParser(); }
        return this.toRequestContext("POST", options, parser, getDefaultPipeline()).then(function (context) { return pipe(context); });
    };
    ODataQueryable.prototype.patchCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new ODataDefaultParser(); }
        return this.toRequestContext("PATCH", options, parser, getDefaultPipeline()).then(function (context) { return pipe(context); });
    };
    ODataQueryable.prototype.deleteCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new ODataDefaultParser(); }
        return this.toRequestContext("DELETE", options, parser, getDefaultPipeline()).then(function (context) { return pipe(context); });
    };
    ODataQueryable.prototype.putCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new ODataDefaultParser(); }
        return this.toRequestContext("PUT", options, parser, getDefaultPipeline()).then(function (context) { return pipe(context); });
    };
    /**
     * Blocks a batch call from occuring, MUST be cleared by calling the returned function
    */
    ODataQueryable.prototype.addBatchDependency = function () {
        if (this._batch !== null) {
            return this._batch.addDependency();
        }
        return function () { return null; };
    };
    Object.defineProperty(ODataQueryable.prototype, "hasBatch", {
        /**
         * Indicates if the current query has a batch associated
         *
         */
        get: function () {
            return Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["o" /* objectDefinedNotNull */])(this._batch);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataQueryable.prototype, "batch", {
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
    return ODataQueryable;
}(Queryable));

var ODataBatch = /** @class */ (function () {
    function ODataBatch(_batchId) {
        if (_batchId === void 0) { _batchId = Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["j" /* getGUID */])(); }
        this._batchId = _batchId;
        this._requests = [];
        this._dependencies = [];
        this._resolveBatchDependencies = [];
    }
    Object.defineProperty(ODataBatch.prototype, "batchId", {
        get: function () {
            return this._batchId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ODataBatch.prototype, "requests", {
        /**
         * The requests contained in this batch
         */
        get: function () {
            return this._requests;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param url Request url
     * @param method Request method (GET, POST, etc)
     * @param options Any request options
     * @param parser The parser used to handle the eventual return from the query
     */
    ODataBatch.prototype.add = function (url, method, options, parser, requestId) {
        var info = {
            id: requestId,
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
        var resolver = function () { return void (0); };
        var promise = new Promise(function (resolve) {
            resolver = resolve;
        });
        this._dependencies.push(promise);
        return resolver;
    };
    /**
     * The batch's execute method will not resolve util any promises added here resolve
     *
     * @param p The dependent promise
     */
    ODataBatch.prototype.addResolveBatchDependency = function (p) {
        this._resolveBatchDependencies.push(p);
    };
    /**
     * Execute the current batch and resolve the associated promises
     *
     * @returns A promise which will be resolved once all of the batch's child promises have resolved
     */
    ODataBatch.prototype.execute = function () {
        var _this = this;
        // we need to check the dependencies twice due to how different engines handle things.
        // We can get a second set of promises added during the first set resolving
        return Promise.all(this._dependencies)
            .then(function () { return Promise.all(_this._dependencies); })
            .then(function () { return _this.executeImpl(); })
            .then(function () { return Promise.all(_this._resolveBatchDependencies); })
            .then(function () { return void (0); });
    };
    return ODataBatch;
}());


//# sourceMappingURL=odata.es5.js.map


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Files; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return File; });
/* unused harmony export Versions */
/* unused harmony export Version */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckinType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return WebPartsPersonalizationScope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return MoveOperations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return TemplateFileType; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pnp_odata__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__exceptions__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__webparts__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__items__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sharepointqueryableshareable__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__odata__ = __webpack_require__(3);









/**
 * Describes a collection of File objects
 *
 */
var Files = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Files, _super);
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
        return adder.postCore()
            .then(function () { return _this.getByName(url); })
            .then(function (file) { return file.setContentChunked(content, progress, chunkSize); });
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a single File instance
 *
 */
var File = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](File, _super);
    function File() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(File.prototype, "listItemAllFields", {
        /**
         * Gets a value that specifies the list item field values for the list item corresponding to the file.
         *
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */](this, "listItemAllFields");
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
            throw new __WEBPACK_IMPORTED_MODULE_4__exceptions__["a" /* MaxCommentLengthException */]();
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
            throw new __WEBPACK_IMPORTED_MODULE_4__exceptions__["a" /* MaxCommentLengthException */]();
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
        return new __WEBPACK_IMPORTED_MODULE_5__webparts__["a" /* LimitedWebPartManager */](this, "getLimitedWebPartManager(scope=" + scope + ")");
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
            throw new __WEBPACK_IMPORTED_MODULE_4__exceptions__["a" /* MaxCommentLengthException */]();
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
            throw new __WEBPACK_IMPORTED_MODULE_4__exceptions__["a" /* MaxCommentLengthException */]();
        }
        return this.clone(File, "unpublish(comment='" + comment + "')").postCore();
    };
    /**
     * Gets the contents of the file as text. Not supported in batching.
     *
     */
    File.prototype.getText = function () {
        return this.clone(File, "$value", false).get(new __WEBPACK_IMPORTED_MODULE_2__pnp_odata__["h" /* TextParser */](), { headers: { "binaryStringResponseBody": "true" } });
    };
    /**
     * Gets the contents of the file as a blob, does not work in Node.js. Not supported in batching.
     *
     */
    File.prototype.getBlob = function () {
        return this.clone(File, "$value", false).get(new __WEBPACK_IMPORTED_MODULE_2__pnp_odata__["a" /* BlobParser */](), { headers: { "binaryStringResponseBody": "true" } });
    };
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js. Not supported in batching.
     */
    File.prototype.getBuffer = function () {
        return this.clone(File, "$value", false).get(new __WEBPACK_IMPORTED_MODULE_2__pnp_odata__["b" /* BufferParser */](), { headers: { "binaryStringResponseBody": "true" } });
    };
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js. Not supported in batching.
     */
    File.prototype.getJSON = function () {
        return this.clone(File, "$value", false).get(new __WEBPACK_IMPORTED_MODULE_2__pnp_odata__["c" /* JSONParser */](), { headers: { "binaryStringResponseBody": "true" } });
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
            return Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["g" /* extend */])(new __WEBPACK_IMPORTED_MODULE_6__items__["a" /* Item */](Object(__WEBPACK_IMPORTED_MODULE_8__odata__["b" /* spGetEntityUrl */])(d)), d);
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
        var _this = this;
        if (chunkSize === void 0) { chunkSize = 10485760; }
        if (typeof progress === "undefined") {
            progress = function () { return null; };
        }
        var fileSize = file.size;
        var blockCount = parseInt((file.size / chunkSize).toString(), 10) + ((file.size % chunkSize === 0) ? 1 : 0);
        var uploadId = Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["j" /* getGUID */])();
        // start the chain with the first fragment
        progress({ uploadId: uploadId, blockNumber: 1, chunkSize: chunkSize, currentPointer: 0, fileSize: fileSize, stage: "starting", totalBlocks: blockCount });
        var chain = this.startUpload(uploadId, file.slice(0, chunkSize));
        var _loop_1 = function (i) {
            chain = chain.then(function (pointer) {
                progress({ uploadId: uploadId, blockNumber: i, chunkSize: chunkSize, currentPointer: pointer, fileSize: fileSize, stage: "continue", totalBlocks: blockCount });
                return _this.continueUpload(uploadId, pointer, file.slice(pointer, pointer + chunkSize));
            });
        };
        // skip the first and last blocks
        for (var i = 2; i < blockCount; i++) {
            _loop_1(i);
        }
        return chain.then(function (pointer) {
            progress({ uploadId: uploadId, blockNumber: blockCount, chunkSize: chunkSize, currentPointer: pointer, fileSize: fileSize, stage: "finishing", totalBlocks: blockCount });
            return _this.finishUpload(uploadId, pointer, file.slice(pointer));
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
        return this.clone(File, "startUpload(uploadId=guid'" + uploadId + "')", false)
            .postCore({ body: fragment })
            .then(function (n) {
            // When OData=verbose the payload has the following shape:
            // { StartUpload: "10485760" }
            if (typeof n === "object") {
                n = n.StartUpload;
            }
            return parseFloat(n);
        });
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
        return this.clone(File, "continueUpload(uploadId=guid'" + uploadId + "',fileOffset=" + fileOffset + ")", false)
            .postCore({ body: fragment })
            .then(function (n) {
            // When OData=verbose the payload has the following shape:
            // { ContinueUpload: "20971520" }
            if (typeof n === "object") {
                n = n.ContinueUpload;
            }
            return parseFloat(n);
        });
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
            .postCore({ body: fragment })
            .then(function (response) {
            return {
                data: response,
                file: new File(response.ServerRelativeUrl),
            };
        });
    };
    return File;
}(__WEBPACK_IMPORTED_MODULE_7__sharepointqueryableshareable__["c" /* SharePointQueryableShareableFile */]));

/**
 * Describes a collection of Version objects
 *
 */
var Versions = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Versions, _super);
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
     * Recycles the specified version of the file.
     *
     * @param versionId The ID of the file version to delete.
     */
    Versions.prototype.recycleByID = function (versionId) {
        return this.clone(Versions, "recycleByID(vid=" + versionId + ")").postCore();
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
     * Recycles the file version object with the specified version label.
     *
     * @param label The version label of the file version to delete, for example: 1.2
     */
    Versions.prototype.recycleByLabel = function (label) {
        return this.clone(Versions, "recycleByLabel(versionlabel='" + label + "')").postCore();
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a single Version instance
 *
 */
var Version = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Version, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

var CheckinType;
(function (CheckinType) {
    CheckinType[CheckinType["Minor"] = 0] = "Minor";
    CheckinType[CheckinType["Major"] = 1] = "Major";
    CheckinType[CheckinType["Overwrite"] = 2] = "Overwrite";
})(CheckinType || (CheckinType = {}));
var WebPartsPersonalizationScope;
(function (WebPartsPersonalizationScope) {
    WebPartsPersonalizationScope[WebPartsPersonalizationScope["User"] = 0] = "User";
    WebPartsPersonalizationScope[WebPartsPersonalizationScope["Shared"] = 1] = "Shared";
})(WebPartsPersonalizationScope || (WebPartsPersonalizationScope = {}));
var MoveOperations;
(function (MoveOperations) {
    MoveOperations[MoveOperations["Overwrite"] = 1] = "Overwrite";
    MoveOperations[MoveOperations["AllowBrokenThickets"] = 8] = "AllowBrokenThickets";
})(MoveOperations || (MoveOperations = {}));
var TemplateFileType;
(function (TemplateFileType) {
    TemplateFileType[TemplateFileType["StandardPage"] = 0] = "StandardPage";
    TemplateFileType[TemplateFileType["WikiPage"] = 1] = "WikiPage";
    TemplateFileType[TemplateFileType["FormPage"] = 2] = "FormPage";
    TemplateFileType[TemplateFileType["ClientSidePage"] = 3] = "ClientSidePage";
})(TemplateFileType || (TemplateFileType = {}));
//# sourceMappingURL=files.js.map

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extractWebUrl;
function extractWebUrl(candidateUrl) {
    if (candidateUrl === null) {
        return "";
    }
    var index = candidateUrl.indexOf("_api/");
    if (index < 0) {
        index = candidateUrl.indexOf("_vti_bin/");
    }
    if (index > -1) {
        return candidateUrl.substr(0, index);
    }
    // if all else fails just give them what they gave us back
    return candidateUrl;
}
//# sourceMappingURL=extractweburl.js.map

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = setup;
/* unused harmony export SPRuntimeConfigImpl */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SPRuntimeConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pnp_common__ = __webpack_require__(2);

function setup(config) {
    __WEBPACK_IMPORTED_MODULE_0__pnp_common__["d" /* RuntimeConfig */].extend(config);
}
var SPRuntimeConfigImpl = /** @class */ (function () {
    function SPRuntimeConfigImpl() {
    }
    Object.defineProperty(SPRuntimeConfigImpl.prototype, "headers", {
        get: function () {
            var spPart = __WEBPACK_IMPORTED_MODULE_0__pnp_common__["d" /* RuntimeConfig */].get("sp");
            if (spPart !== null && typeof spPart !== "undefined" && typeof spPart.headers !== "undefined") {
                return spPart.headers;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRuntimeConfigImpl.prototype, "baseUrl", {
        get: function () {
            var spPart = __WEBPACK_IMPORTED_MODULE_0__pnp_common__["d" /* RuntimeConfig */].get("sp");
            if (spPart !== null && typeof spPart.baseUrl !== "undefined") {
                return spPart.baseUrl;
            }
            if (__WEBPACK_IMPORTED_MODULE_0__pnp_common__["d" /* RuntimeConfig */].spfxContext !== null) {
                return __WEBPACK_IMPORTED_MODULE_0__pnp_common__["d" /* RuntimeConfig */].spfxContext.pageContext.web.absoluteUrl;
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRuntimeConfigImpl.prototype, "fetchClientFactory", {
        get: function () {
            var spPart = __WEBPACK_IMPORTED_MODULE_0__pnp_common__["d" /* RuntimeConfig */].get("sp");
            // use a configured factory firt
            if (spPart !== null && typeof spPart.fetchClientFactory !== "undefined") {
                return spPart.fetchClientFactory;
            }
            else {
                return function () { return new __WEBPACK_IMPORTED_MODULE_0__pnp_common__["b" /* FetchClient */](); };
            }
        },
        enumerable: true,
        configurable: true
    });
    return SPRuntimeConfigImpl;
}());

var SPRuntimeConfig = new SPRuntimeConfigImpl();
//# sourceMappingURL=splibconfig.js.map

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SharePointQueryableShareable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SharePointQueryableShareableWeb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SharePointQueryableShareableItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileFolderShared; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SharePointQueryableShareableFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SharePointQueryableShareableFolder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__odata__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sharepointqueryablesecurable__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__types__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_extractweburl__ = __webpack_require__(7);







/**
 * Internal helper class used to augment classes to include sharing functionality
 */
var SharePointQueryableShareable = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SharePointQueryableShareable, _super);
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
        return this.clone(SharePointQueryableShareable, "shareLink").postCore({
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
        var roleFilter = role === __WEBPACK_IMPORTED_MODULE_5__types__["r" /* SharingRole */].Edit ? __WEBPACK_IMPORTED_MODULE_5__types__["m" /* RoleType */].Contributor : __WEBPACK_IMPORTED_MODULE_5__types__["m" /* RoleType */].Reader;
        // start by looking up the role definition id we need to set the roleValue
        // remove need to reference Web here, which created a circular build issue
        var w = new __WEBPACK_IMPORTED_MODULE_3__sharepointqueryable__["b" /* SharePointQueryableCollection */]("_api/web", "roledefinitions");
        return w.select("Id").filter("RoleTypeKind eq " + roleFilter).get().then(function (def) {
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
                postBody = Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])(postBody, {
                    emailBody: emailData.body,
                    emailSubject: typeof emailData.subject !== "undefined" ? emailData.subject : "",
                    sendEmail: true,
                });
            }
            return _this.clone(SharePointQueryableShareable, "shareObject").postCore({
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
        options = Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])(options, {
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
                postBody = Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])(postBody, {
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
        return this.clone(SharePointQueryableShareable, "unshareObject").postCore({
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
        return this.clone(SharePointQueryableShareable, "checkPermissions").postCore({
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
        return this.clone(SharePointQueryableShareable, "getSharingInformation").postCore({
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
        return this.clone(SharePointQueryableShareable, "getObjectSharingSettings").postCore({
            body: JSON.stringify({
                useSimplifiedRoles: useSimplifiedRoles,
            }),
        });
    };
    /**
     * Unshares this object
     */
    SharePointQueryableShareable.prototype.unshareObject = function () {
        return this.clone(SharePointQueryableShareable, "unshareObject").postCore();
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
                case __WEBPACK_IMPORTED_MODULE_5__types__["m" /* RoleType */].Contributor:
                    // remove need to reference Web here, which created a circular build issue
                    var memberGroup = new __WEBPACK_IMPORTED_MODULE_3__sharepointqueryable__["c" /* SharePointQueryableInstance */]("_api/web", "associatedmembergroup");
                    return memberGroup.select("Id").get().then(function (g) { return "group: " + g.Id; });
                case __WEBPACK_IMPORTED_MODULE_5__types__["m" /* RoleType */].Reader:
                case __WEBPACK_IMPORTED_MODULE_5__types__["m" /* RoleType */].Guest:
                    // remove need to reference Web here, which created a circular build issue
                    var visitorGroup = new __WEBPACK_IMPORTED_MODULE_3__sharepointqueryable__["c" /* SharePointQueryableInstance */]("_api/web", "associatedvisitorgroup");
                    return visitorGroup.select("Id").get().then(function (g) { return "group: " + g.Id; });
                default:
                    throw new Error("Could not determine role value for supplied value. Contributor, Reader, and Guest are supported");
            }
        }
        else {
            var roleFilter = role === __WEBPACK_IMPORTED_MODULE_5__types__["r" /* SharingRole */].Edit ? __WEBPACK_IMPORTED_MODULE_5__types__["m" /* RoleType */].Contributor : __WEBPACK_IMPORTED_MODULE_5__types__["m" /* RoleType */].Reader;
            // remove need to reference Web here, which created a circular build issue
            var roleDefs = new __WEBPACK_IMPORTED_MODULE_3__sharepointqueryable__["b" /* SharePointQueryableCollection */]("_api/web", "roledefinitions");
            return roleDefs.select("Id").top(1).filter("RoleTypeKind eq " + roleFilter).get().then(function (def) {
                if (def.length < 1) {
                    throw new Error("Could not locate associated role definition for supplied role. Edit and View are supported");
                }
                return "role: " + def[0].Id;
            });
        }
    };
    SharePointQueryableShareable.prototype.getShareObjectWeb = function (candidate) {
        return Promise.resolve(new __WEBPACK_IMPORTED_MODULE_3__sharepointqueryable__["c" /* SharePointQueryableInstance */](Object(__WEBPACK_IMPORTED_MODULE_6__utils_extractweburl__["a" /* extractWebUrl */])(candidate), "/_api/SP.Web.ShareObject"));
    };
    SharePointQueryableShareable.prototype.sendShareObjectRequest = function (options) {
        return this.getShareObjectWeb(this.toUrl()).then(function (web) {
            return web.expand("UsersWithAccessRequests", "GroupsSharedWith").as(SharePointQueryableShareable).postCore({
                body: JSON.stringify(options),
            });
        });
    };
    return SharePointQueryableShareable;
}(__WEBPACK_IMPORTED_MODULE_3__sharepointqueryable__["a" /* SharePointQueryable */]));

var SharePointQueryableShareableWeb = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SharePointQueryableShareableWeb, _super);
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
        if (role === void 0) { role = __WEBPACK_IMPORTED_MODULE_5__types__["r" /* SharingRole */].View; }
        var dependency = this.addBatchDependency();
        // remove need to reference Web here, which created a circular build issue
        var web = new __WEBPACK_IMPORTED_MODULE_3__sharepointqueryable__["c" /* SharePointQueryableInstance */](Object(__WEBPACK_IMPORTED_MODULE_6__utils_extractweburl__["a" /* extractWebUrl */])(this.toUrl()), "/_api/web/url");
        return web.get().then(function (url) {
            dependency();
            return _this.shareObject(Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["e" /* combinePaths */])(url, "/_layouts/15/aclinv.aspx?forSharing=1&mbypass=1"), loginNames, role, emailData);
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
}(__WEBPACK_IMPORTED_MODULE_4__sharepointqueryablesecurable__["a" /* SharePointQueryableSecurable */]));

var SharePointQueryableShareableItem = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SharePointQueryableShareableItem, _super);
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
        if (kind === void 0) { kind = __WEBPACK_IMPORTED_MODULE_5__types__["p" /* SharingLinkKind */].OrganizationView; }
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
        if (role === void 0) { role = __WEBPACK_IMPORTED_MODULE_5__types__["r" /* SharingRole */].View; }
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
}(__WEBPACK_IMPORTED_MODULE_4__sharepointqueryablesecurable__["a" /* SharePointQueryableSecurable */]));

var FileFolderShared = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](FileFolderShared, _super);
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
        if (kind === void 0) { kind = __WEBPACK_IMPORTED_MODULE_5__types__["p" /* SharingLinkKind */].OrganizationView; }
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
            var shareable = new SharePointQueryableShareable(Object(__WEBPACK_IMPORTED_MODULE_2__odata__["b" /* spGetEntityUrl */])(d));
            // we need to handle batching
            if (_this.hasBatch) {
                shareable = shareable.inBatch(_this.batch);
            }
            return shareable;
        });
    };
    return FileFolderShared;
}(__WEBPACK_IMPORTED_MODULE_3__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

var SharePointQueryableShareableFile = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SharePointQueryableShareableFile, _super);
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
        if (role === void 0) { role = __WEBPACK_IMPORTED_MODULE_5__types__["r" /* SharingRole */].View; }
        if (requireSignin === void 0) { requireSignin = false; }
        var dependency = this.addBatchDependency();
        return this.getShareable().then(function (shareable) {
            dependency();
            return shareable.shareWith(loginNames, role, requireSignin, false, emailData);
        });
    };
    return SharePointQueryableShareableFile;
}(FileFolderShared));

var SharePointQueryableShareableFolder = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SharePointQueryableShareableFolder, _super);
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
        if (role === void 0) { role = __WEBPACK_IMPORTED_MODULE_5__types__["r" /* SharingRole */].View; }
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

//# sourceMappingURL=sharepointqueryableshareable.js.map

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Items; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ItemVersions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ItemVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return PagedItemCollection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sharepointqueryableshareable__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__folders__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__files__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__contenttypes__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pnp_odata__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__attachmentfiles__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lists__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pnp_logging__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__comments__ = __webpack_require__(31);












/**
 * Describes a collection of Item objects
 *
 */
var Items = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Items, _super);
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
        // creates an item with the parent list path and append out method call
        return new Item(this.parentUrl, "getItemByStringId('" + stringId + "')");
    };
    /**
     * Skips the specified number of items (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#sectionSection6)
     *
     * @param skip The starting id where the page should start, use with top to specify pages
     * @param reverse It true the PagedPrev=true parameter is added allowing backwards navigation in the collection
     */
    Items.prototype.skip = function (skip, reverse) {
        if (reverse === void 0) { reverse = false; }
        if (reverse) {
            this._query.add("$skiptoken", encodeURIComponent("Paged=TRUE&PagedPrev=TRUE&p_ID=" + skip));
        }
        else {
            this._query.add("$skiptoken", encodeURIComponent("Paged=TRUE&p_ID=" + skip));
        }
        return this;
    };
    /**
     * Gets a collection designed to aid in paging through data
     *
     */
    Items.prototype.getPaged = function () {
        return this.get(new PagedItemCollectionParser(this));
    };
    /**
     * Gets all the items in a list, regardless of count. Does not support batching or caching
     *
     *  @param requestSize Number of items to return in each request (Default: 2000)
     */
    Items.prototype.getAll = function (requestSize) {
        var _this = this;
        if (requestSize === void 0) { requestSize = 2000; }
        __WEBPACK_IMPORTED_MODULE_10__pnp_logging__["a" /* Logger */].write("Calling items.getAll should be done sparingly. Ensure this is the correct choice. If you are unsure, it is not.", 2 /* Warning */);
        // this will be used for the actual query
        // and we set no metadata here to try and reduce traffic
        var items = new Items(this, "").top(requestSize).configure({
            headers: {
                "Accept": "application/json;odata=nometadata",
            },
        });
        // let's copy over the odata query params that can be applied
        // $top - allow setting the page size this way (override what we did above)
        // $select - allow picking the return fields (good behavior)
        // $filter - allow setting a filter, though this may fail due for large lists
        this.query.getKeys()
            .filter(function (k) { return /^\$select$|^\$filter$|^\$top$|^\$expand$/.test(k.toLowerCase()); })
            .reduce(function (i, k) {
            i.query.add(k, _this.query.get(k));
            return i;
        }, items);
        // give back the promise
        return new Promise(function (resolve, reject) {
            // this will eventually hold the items we return
            var itemsCollector = [];
            // action that will gather up our results recursively
            var gatherer = function (last) {
                // collect that set of results
                [].push.apply(itemsCollector, last.results);
                // if we have more, repeat - otherwise resolve with the collected items
                if (last.hasNext) {
                    last.getNext().then(gatherer).catch(reject);
                }
                else {
                    resolve(itemsCollector);
                }
            };
            // start the cycle
            items.getPaged().then(gatherer).catch(reject);
        });
    };
    /**
     * Adds a new item to the collection
     *
     * @param properties The new items's properties
     * @param listItemEntityTypeFullName The type name of the list's entities
     */
    Items.prototype.add = function (properties, listItemEntityTypeFullName) {
        var _this = this;
        if (properties === void 0) { properties = {}; }
        if (listItemEntityTypeFullName === void 0) { listItemEntityTypeFullName = null; }
        var removeDependency = this.addBatchDependency();
        return this.ensureListItemEntityTypeName(listItemEntityTypeFullName).then(function (listItemEntityType) {
            var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_6__pnp_common__["g" /* extend */])({
                "__metadata": { "type": listItemEntityType },
            }, properties));
            var promise = _this.clone(Items, null).postCore({ body: postBody }).then(function (data) {
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
            this.getParent(__WEBPACK_IMPORTED_MODULE_9__lists__["a" /* List */]).getListItemEntityTypeFullName();
    };
    return Items;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Descrines a single Item instance
 *
 */
var Item = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Item.prototype, "attachmentFiles", {
        /**
         * Gets the set of attachments for this item
         *
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_8__attachmentfiles__["a" /* AttachmentFiles */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_5__contenttypes__["a" /* ContentType */](this, "ContentType");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "comments", {
        /**
         * Gets the collection of comments associated with this list item
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_11__comments__["b" /* Comments */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["a" /* SharePointQueryable */](this, "EffectiveBasePermissions");
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
            return new __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["a" /* SharePointQueryable */](this, "EffectiveBasePermissionsForUI");
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
            return new __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */](this, "FieldValuesAsHTML");
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
            return new __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */](this, "FieldValuesAsText");
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
            return new __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */](this, "FieldValuesForEdit");
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
            return new __WEBPACK_IMPORTED_MODULE_3__folders__["a" /* Folder */](this, "folder");
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
            return new __WEBPACK_IMPORTED_MODULE_4__files__["b" /* File */](this, "file");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "versions", {
        /**
         * Gets the collection of versions associated with this item
         */
        get: function () {
            return new ItemVersions(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates this list intance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the list
     * @param eTag Value used in the IF-Match header, by default "*"
     * @param listItemEntityTypeFullName The type name of the list's entities
     */
    Item.prototype.update = function (properties, eTag, listItemEntityTypeFullName) {
        var _this = this;
        if (eTag === void 0) { eTag = "*"; }
        if (listItemEntityTypeFullName === void 0) { listItemEntityTypeFullName = null; }
        return new Promise(function (resolve, reject) {
            var removeDependency = _this.addBatchDependency();
            return _this.ensureListItemEntityTypeName(listItemEntityTypeFullName).then(function (listItemEntityType) {
                var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_6__pnp_common__["g" /* extend */])({
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
     * Gets the collection of people who have liked this item
     */
    Item.prototype.getLikedBy = function () {
        return this.clone(Item, "likedBy").postCore();
    };
    /**
     * Likes this item as the current user
     */
    Item.prototype.like = function () {
        return this.clone(Item, "like").postCore();
    };
    /**
     * Unlikes this item as the current user
     */
    Item.prototype.unlike = function () {
        return this.clone(Item, "unlike").postCore();
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
            this.getParent(__WEBPACK_IMPORTED_MODULE_9__lists__["a" /* List */], this.parentUrl.substr(0, this.parentUrl.lastIndexOf("/"))).getListItemEntityTypeFullName();
    };
    return Item;
}(__WEBPACK_IMPORTED_MODULE_2__sharepointqueryableshareable__["e" /* SharePointQueryableShareableItem */]));

/**
 * Describes a collection of Version objects
 *
 */
var ItemVersions = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ItemVersions, _super);
    /**
     * Creates a new instance of the File class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    function ItemVersions(baseUrl, path) {
        if (path === void 0) { path = "versions"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a version by id
     *
     * @param versionId The id of the version to retrieve
     */
    ItemVersions.prototype.getById = function (versionId) {
        var v = new ItemVersion(this);
        v.concat("(" + versionId + ")");
        return v;
    };
    return ItemVersions;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a single Version instance
 *
 */
var ItemVersion = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ItemVersion, _super);
    function ItemVersion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * Delete a specific version of a file.
    *
    * @param eTag Value used in the IF-Match header, by default "*"
    */
    ItemVersion.prototype.delete = function () {
        return this.postCore({
            headers: {
                "X-HTTP-Method": "DELETE",
            },
        });
    };
    return ItemVersion;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

/**
 * Provides paging functionality for list items
 */
var PagedItemCollection = /** @class */ (function () {
    function PagedItemCollection(parent, nextUrl, results) {
        this.parent = parent;
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
            var items = new Items(this.nextUrl, null).configureFrom(this.parent);
            return items.getPaged();
        }
        return new Promise(function (r) { return r(null); });
    };
    return PagedItemCollection;
}());

var PagedItemCollectionParser = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](PagedItemCollectionParser, _super);
    function PagedItemCollectionParser(_parent) {
        var _this = _super.call(this) || this;
        _this._parent = _parent;
        return _this;
    }
    PagedItemCollectionParser.prototype.parse = function (r) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.handleError(r, reject)) {
                r.json().then(function (json) {
                    var nextUrl = json.hasOwnProperty("d") && json.d.hasOwnProperty("__next") ? json.d.__next : json["odata.nextLink"];
                    resolve(new PagedItemCollection(_this._parent, nextUrl, _this.parseODataJSON(json)));
                });
            }
        });
    };
    return PagedItemCollectionParser;
}(__WEBPACK_IMPORTED_MODULE_7__pnp_odata__["f" /* ODataParserBase */]));
var ItemUpdatedParser = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ItemUpdatedParser, _super);
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
}(__WEBPACK_IMPORTED_MODULE_7__pnp_odata__["f" /* ODataParserBase */]));
//# sourceMappingURL=items.js.map

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SPBatchParseException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SPODataIdException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaxCommentLengthException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NotSupportedInBatchException; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pnp_logging__ = __webpack_require__(4);


var SPBatchParseException = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SPBatchParseException, _super);
    function SPBatchParseException(msg) {
        var _this = _super.call(this, msg) || this;
        _this.name = "BatchParseException";
        __WEBPACK_IMPORTED_MODULE_1__pnp_logging__["a" /* Logger */].error(_this);
        return _this;
    }
    return SPBatchParseException;
}(Error));

var SPODataIdException = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SPODataIdException, _super);
    function SPODataIdException(data, msg) {
        if (msg === void 0) { msg = "Could not extract odata id in object, you may be using nometadata. Object data logged to logger."; }
        var _this = _super.call(this, msg) || this;
        _this.data = data;
        _this.name = "ODataIdException";
        __WEBPACK_IMPORTED_MODULE_1__pnp_logging__["a" /* Logger */].error(_this);
        return _this;
    }
    return SPODataIdException;
}(Error));

var MaxCommentLengthException = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](MaxCommentLengthException, _super);
    function MaxCommentLengthException(msg) {
        if (msg === void 0) { msg = "The maximum comment length is 1023 characters."; }
        var _this = _super.call(this, msg) || this;
        _this.name = "MaxCommentLengthException";
        __WEBPACK_IMPORTED_MODULE_1__pnp_logging__["a" /* Logger */].error(_this);
        return _this;
    }
    return MaxCommentLengthException;
}(Error));

var NotSupportedInBatchException = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](NotSupportedInBatchException, _super);
    function NotSupportedInBatchException(operation) {
        if (operation === void 0) { operation = "This operation"; }
        var _this = _super.call(this, operation + " is not supported as part of a batch.") || this;
        _this.name = "NotSupportedInBatchException";
        __WEBPACK_IMPORTED_MODULE_1__pnp_logging__["a" /* Logger */].error(_this);
        return _this;
    }
    return NotSupportedInBatchException;
}(Error));

//# sourceMappingURL=exceptions.js.map

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SPHttpClient; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__digestcache__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_splibconfig__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_extractweburl__ = __webpack_require__(7);




var SPHttpClient = /** @class */ (function () {
    function SPHttpClient() {
        this._impl = __WEBPACK_IMPORTED_MODULE_2__config_splibconfig__["a" /* SPRuntimeConfig */].fetchClientFactory();
        this._digestCache = new __WEBPACK_IMPORTED_MODULE_0__digestcache__["a" /* DigestCache */](this);
    }
    SPHttpClient.prototype.fetch = function (url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var opts = Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])(options, { cache: "no-cache", credentials: "same-origin" }, true);
        var headers = new Headers();
        // first we add the global headers so they can be overwritten by any passed in locally to this call
        Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["m" /* mergeHeaders */])(headers, __WEBPACK_IMPORTED_MODULE_2__config_splibconfig__["a" /* SPRuntimeConfig */].headers);
        // second we add the local options so we can overwrite the globals
        Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["m" /* mergeHeaders */])(headers, options.headers);
        // lastly we apply any default headers we need that may not exist
        if (!headers.has("Accept")) {
            headers.append("Accept", "application/json");
        }
        if (!headers.has("Content-Type")) {
            headers.append("Content-Type", "application/json;odata=verbose;charset=utf-8");
        }
        if (!headers.has("X-ClientService-ClientTag")) {
            headers.append("X-ClientService-ClientTag", "PnPCoreJS:@pnp-1.1.2-1");
        }
        if (!headers.has("User-Agent")) {
            // this marks the requests for understanding by the service
            headers.append("User-Agent", "NONISV|SharePointPnP|PnPCoreJS/1.1.2-1");
        }
        opts = Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])(opts, { headers: headers });
        if (opts.method && opts.method.toUpperCase() !== "GET") {
            // if we have either a request digest or an authorization header we don't need a digest
            if (!headers.has("X-RequestDigest") && !headers.has("Authorization")) {
                return this._digestCache.getDigest(Object(__WEBPACK_IMPORTED_MODULE_3__utils_extractweburl__["a" /* extractWebUrl */])(url))
                    .then(function (digest) {
                    headers.append("X-RequestDigest", digest);
                    return _this.fetchRaw(url, opts);
                });
            }
        }
        return this.fetchRaw(url, opts);
    };
    SPHttpClient.prototype.fetchRaw = function (url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        // here we need to normalize the headers
        var rawHeaders = new Headers();
        Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["m" /* mergeHeaders */])(rawHeaders, options.headers);
        options = Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])(options, { headers: rawHeaders });
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
                setTimeout(Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["i" /* getCtxCallback */])(_this, retry, ctx), delay);
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
    SPHttpClient.prototype.get = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])(options, { method: "GET" });
        return this.fetch(url, opts);
    };
    SPHttpClient.prototype.post = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])(options, { method: "POST" });
        return this.fetch(url, opts);
    };
    SPHttpClient.prototype.patch = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])(options, { method: "PATCH" });
        return this.fetch(url, opts);
    };
    SPHttpClient.prototype.delete = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])(options, { method: "DELETE" });
        return this.fetch(url, opts);
    };
    return SPHttpClient;
}());

//# sourceMappingURL=sphttpclient.js.map

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ControlMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return FieldTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return DateTimeFieldFormatType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddFieldOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CalendarType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return UrlFieldFormatType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return PermissionKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return PrincipalType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return PrincipalSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return RoleType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return PageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return SharingLinkKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return SharingRole; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return SharingOperationStatusCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return SPSharedObjectType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return SharingDomainRestrictionMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return RenderListDataOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return FieldUserSelectionMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ChoiceFieldFormatType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return UrlZone; });
/**
 * Determines the display mode of the given control or view
 */
var ControlMode;
(function (ControlMode) {
    ControlMode[ControlMode["Display"] = 1] = "Display";
    ControlMode[ControlMode["Edit"] = 2] = "Edit";
    ControlMode[ControlMode["New"] = 3] = "New";
})(ControlMode || (ControlMode = {}));
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
})(FieldTypes || (FieldTypes = {}));
var DateTimeFieldFormatType;
(function (DateTimeFieldFormatType) {
    DateTimeFieldFormatType[DateTimeFieldFormatType["DateOnly"] = 0] = "DateOnly";
    DateTimeFieldFormatType[DateTimeFieldFormatType["DateTime"] = 1] = "DateTime";
})(DateTimeFieldFormatType || (DateTimeFieldFormatType = {}));
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
})(AddFieldOptions || (AddFieldOptions = {}));
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
})(CalendarType || (CalendarType = {}));
var UrlFieldFormatType;
(function (UrlFieldFormatType) {
    UrlFieldFormatType[UrlFieldFormatType["Hyperlink"] = 0] = "Hyperlink";
    UrlFieldFormatType[UrlFieldFormatType["Image"] = 1] = "Image";
})(UrlFieldFormatType || (UrlFieldFormatType = {}));
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
})(PermissionKind || (PermissionKind = {}));
/**
 * Specifies the type of a principal.
 */
/* tslint:disable:no-bitwise */
var PrincipalType;
(function (PrincipalType) {
    /**
     * Enumeration whose value specifies no principal type.
     */
    PrincipalType[PrincipalType["None"] = 0] = "None";
    /**
     * Enumeration whose value specifies a user as the principal type.
     */
    PrincipalType[PrincipalType["User"] = 1] = "User";
    /**
     * Enumeration whose value specifies a distribution list as the principal type.
     */
    PrincipalType[PrincipalType["DistributionList"] = 2] = "DistributionList";
    /**
     * Enumeration whose value specifies a security group as the principal type.
     */
    PrincipalType[PrincipalType["SecurityGroup"] = 4] = "SecurityGroup";
    /**
     * Enumeration whose value specifies a group as the principal type.
     */
    PrincipalType[PrincipalType["SharePointGroup"] = 8] = "SharePointGroup";
    /**
     * Enumeration whose value specifies all principal types.
     */
    PrincipalType[PrincipalType["All"] = 15] = "All";
})(PrincipalType || (PrincipalType = {}));
/* tslint:enable:no-bitwise */
/**
 * Specifies the source of a principal.
 */
/* tslint:disable:no-bitwise */
var PrincipalSource;
(function (PrincipalSource) {
    /**
     * Enumeration whose value specifies no principal source.
     */
    PrincipalSource[PrincipalSource["None"] = 0] = "None";
    /**
     * Enumeration whose value specifies user information list as the principal source.
     */
    PrincipalSource[PrincipalSource["UserInfoList"] = 1] = "UserInfoList";
    /**
     * Enumeration whose value specifies Active Directory as the principal source.
     */
    PrincipalSource[PrincipalSource["Windows"] = 2] = "Windows";
    /**
     * Enumeration whose value specifies the current membership provider as the principal source.
     */
    PrincipalSource[PrincipalSource["MembershipProvider"] = 4] = "MembershipProvider";
    /**
     * Enumeration whose value specifies the current role provider as the principal source.
     */
    PrincipalSource[PrincipalSource["RoleProvider"] = 8] = "RoleProvider";
    /**
     * Enumeration whose value specifies all principal sources.
     */
    PrincipalSource[PrincipalSource["All"] = 15] = "All";
})(PrincipalSource || (PrincipalSource = {}));
/* tslint:enable:no-bitwise */
var RoleType;
(function (RoleType) {
    RoleType[RoleType["None"] = 0] = "None";
    RoleType[RoleType["Guest"] = 1] = "Guest";
    RoleType[RoleType["Reader"] = 2] = "Reader";
    RoleType[RoleType["Contributor"] = 3] = "Contributor";
    RoleType[RoleType["WebDesigner"] = 4] = "WebDesigner";
    RoleType[RoleType["Administrator"] = 5] = "Administrator";
})(RoleType || (RoleType = {}));
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
})(PageType || (PageType = {}));
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
})(SharingLinkKind || (SharingLinkKind = {}));
/**
 * Indicates the role of the sharing link
 */
var SharingRole;
(function (SharingRole) {
    SharingRole[SharingRole["None"] = 0] = "None";
    SharingRole[SharingRole["View"] = 1] = "View";
    SharingRole[SharingRole["Edit"] = 2] = "Edit";
    SharingRole[SharingRole["Owner"] = 3] = "Owner";
})(SharingRole || (SharingRole = {}));
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
})(SharingOperationStatusCode || (SharingOperationStatusCode = {}));
var SPSharedObjectType;
(function (SPSharedObjectType) {
    SPSharedObjectType[SPSharedObjectType["Unknown"] = 0] = "Unknown";
    SPSharedObjectType[SPSharedObjectType["File"] = 1] = "File";
    SPSharedObjectType[SPSharedObjectType["Folder"] = 2] = "Folder";
    SPSharedObjectType[SPSharedObjectType["Item"] = 3] = "Item";
    SPSharedObjectType[SPSharedObjectType["List"] = 4] = "List";
    SPSharedObjectType[SPSharedObjectType["Web"] = 5] = "Web";
    SPSharedObjectType[SPSharedObjectType["Max"] = 6] = "Max";
})(SPSharedObjectType || (SPSharedObjectType = {}));
var SharingDomainRestrictionMode;
(function (SharingDomainRestrictionMode) {
    SharingDomainRestrictionMode[SharingDomainRestrictionMode["None"] = 0] = "None";
    SharingDomainRestrictionMode[SharingDomainRestrictionMode["AllowList"] = 1] = "AllowList";
    SharingDomainRestrictionMode[SharingDomainRestrictionMode["BlockList"] = 2] = "BlockList";
})(SharingDomainRestrictionMode || (SharingDomainRestrictionMode = {}));
var RenderListDataOptions;
(function (RenderListDataOptions) {
    RenderListDataOptions[RenderListDataOptions["None"] = 0] = "None";
    RenderListDataOptions[RenderListDataOptions["ContextInfo"] = 1] = "ContextInfo";
    RenderListDataOptions[RenderListDataOptions["ListData"] = 2] = "ListData";
    RenderListDataOptions[RenderListDataOptions["ListSchema"] = 4] = "ListSchema";
    RenderListDataOptions[RenderListDataOptions["MenuView"] = 8] = "MenuView";
    RenderListDataOptions[RenderListDataOptions["ListContentType"] = 16] = "ListContentType";
    RenderListDataOptions[RenderListDataOptions["FileSystemItemId"] = 32] = "FileSystemItemId";
    RenderListDataOptions[RenderListDataOptions["ClientFormSchema"] = 64] = "ClientFormSchema";
    RenderListDataOptions[RenderListDataOptions["QuickLaunch"] = 128] = "QuickLaunch";
    RenderListDataOptions[RenderListDataOptions["Spotlight"] = 256] = "Spotlight";
    RenderListDataOptions[RenderListDataOptions["Visualization"] = 512] = "Visualization";
    RenderListDataOptions[RenderListDataOptions["ViewMetadata"] = 1024] = "ViewMetadata";
    RenderListDataOptions[RenderListDataOptions["DisableAutoHyperlink"] = 2048] = "DisableAutoHyperlink";
    RenderListDataOptions[RenderListDataOptions["EnableMediaTAUrls"] = 4096] = "EnableMediaTAUrls";
    RenderListDataOptions[RenderListDataOptions["ParentInfo"] = 8192] = "ParentInfo";
    RenderListDataOptions[RenderListDataOptions["PageContextInfo"] = 16384] = "PageContextInfo";
    RenderListDataOptions[RenderListDataOptions["ClientSideComponentManifest"] = 32768] = "ClientSideComponentManifest";
})(RenderListDataOptions || (RenderListDataOptions = {}));
var FieldUserSelectionMode;
(function (FieldUserSelectionMode) {
    FieldUserSelectionMode[FieldUserSelectionMode["PeopleAndGroups"] = 1] = "PeopleAndGroups";
    FieldUserSelectionMode[FieldUserSelectionMode["PeopleOnly"] = 0] = "PeopleOnly";
})(FieldUserSelectionMode || (FieldUserSelectionMode = {}));
var ChoiceFieldFormatType;
(function (ChoiceFieldFormatType) {
    ChoiceFieldFormatType[ChoiceFieldFormatType["Dropdown"] = 0] = "Dropdown";
    ChoiceFieldFormatType[ChoiceFieldFormatType["RadioButtons"] = 1] = "RadioButtons";
})(ChoiceFieldFormatType || (ChoiceFieldFormatType = {}));
/**
 * Specifies the originating zone of a request received.
 */
var UrlZone;
(function (UrlZone) {
    /**
     * Specifies the default zone used for requests unless another zone is specified.
     */
    UrlZone[UrlZone["DefaultZone"] = 0] = "DefaultZone";
    /**
     * Specifies an intranet zone.
     */
    UrlZone[UrlZone["Intranet"] = 1] = "Intranet";
    /**
     * Specifies an Internet zone.
     */
    UrlZone[UrlZone["Internet"] = 2] = "Internet";
    /**
     * Specifies a custom zone.
     */
    UrlZone[UrlZone["Custom"] = 3] = "Custom";
    /**
     * Specifies an extranet zone.
     */
    UrlZone[UrlZone["Extranet"] = 4] = "Extranet";
})(UrlZone || (UrlZone = {}));
//# sourceMappingURL=types.js.map

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Folders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Folder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sharepointqueryableshareable__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__files__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__odata__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__items__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__net_sphttpclient__ = __webpack_require__(12);








/**
 * Describes a collection of Folder objects
 *
 */
var Folders = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Folders, _super);
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
}(__WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a single Folder instance
 *
 */
var Folder = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Folder, _super);
    function Folder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Folder.prototype, "contentTypeOrder", {
        /**
         * Specifies the sequence in which content types are displayed.
         *
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["b" /* SharePointQueryableCollection */](this, "contentTypeOrder");
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
            return new __WEBPACK_IMPORTED_MODULE_4__files__["c" /* Files */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["c" /* SharePointQueryableInstance */](this, "listItemAllFields");
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
            return new __WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["c" /* SharePointQueryableInstance */](this, "properties");
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
            return new __WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["a" /* SharePointQueryable */](this, "serverRelativeUrl");
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
            return new __WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["b" /* SharePointQueryableCollection */](this, "uniqueContentTypeOrder");
        },
        enumerable: true,
        configurable: true
    });
    Folder.prototype.update = function (properties) {
        var _this = this;
        var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])({
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
            return Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])(new __WEBPACK_IMPORTED_MODULE_6__items__["a" /* Item */](Object(__WEBPACK_IMPORTED_MODULE_5__odata__["b" /* spGetEntityUrl */])(d)), d);
        });
    };
    /**
     * Moves a folder to destination path
     *
     * @param destUrl Absolute or relative URL of the destination path
     */
    Folder.prototype.moveTo = function (destUrl) {
        var _this = this;
        return this.select("ServerRelativeUrl").get().then(function (_a) {
            var srcUrl = _a.ServerRelativeUrl;
            var client = new __WEBPACK_IMPORTED_MODULE_7__net_sphttpclient__["a" /* SPHttpClient */]();
            var webBaseUrl = _this.toUrl().split("/_api")[0];
            var hostUrl = webBaseUrl.replace("://", "___").split("/")[0].replace("___", "://");
            var methodUrl = webBaseUrl + "/_api/SP.MoveCopyUtil.MoveFolder()";
            return client.post(methodUrl, {
                body: JSON.stringify({
                    destUrl: destUrl.indexOf("http") === 0 ? destUrl : "" + hostUrl + destUrl,
                    srcUrl: "" + hostUrl + srcUrl,
                }),
            }).then(function (r) { return r.json(); });
        });
    };
    return Folder;
}(__WEBPACK_IMPORTED_MODULE_3__sharepointqueryableshareable__["d" /* SharePointQueryableShareableFolder */]));

//# sourceMappingURL=folders.js.map

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ContentTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContentType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FieldLinks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return FieldLink; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__ = __webpack_require__(1);



/**
 * Describes a collection of content types
 *
 */
var ContentTypes = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ContentTypes, _super);
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
        return this.clone(ContentTypes, "addAvailableContentType").postCore({ body: postBody }).then(function (data) {
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
        var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])({
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
}(__WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a single ContentType instance
 *
 */
var ContentType = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ContentType, _super);
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
            return new __WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["b" /* SharePointQueryableCollection */](this, "fields");
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
            return new __WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["b" /* SharePointQueryableCollection */](this, "workflowAssociations");
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
}(__WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

/**
 * Represents a collection of field link instances
 */
var FieldLinks = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](FieldLinks, _super);
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
}(__WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Represents a field link instance
 */
var FieldLink = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](FieldLink, _super);
    function FieldLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FieldLink;
}(__WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

//# sourceMappingURL=contenttypes.js.map

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (immutable) */ __webpack_exports__["a"] = toAbsoluteUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_splibconfig__ = __webpack_require__(8);


/**
 * Ensures that a given url is absolute for the current web based on context
 *
 * @param candidateUrl The url to make absolute
 *
 */
function toAbsoluteUrl(candidateUrl) {
    return new Promise(function (resolve) {
        if (Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["l" /* isUrlAbsolute */])(candidateUrl)) {
            // if we are already absolute, then just return the url
            return resolve(candidateUrl);
        }
        if (__WEBPACK_IMPORTED_MODULE_1__config_splibconfig__["a" /* SPRuntimeConfig */].baseUrl !== null) {
            // base url specified either with baseUrl of spfxContext config property
            return resolve(Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["e" /* combinePaths */])(__WEBPACK_IMPORTED_MODULE_1__config_splibconfig__["a" /* SPRuntimeConfig */].baseUrl, candidateUrl));
        }
        if (typeof global._spPageContextInfo !== "undefined") {
            // operating in classic pages
            if (global._spPageContextInfo.hasOwnProperty("webAbsoluteUrl")) {
                return resolve(Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["e" /* combinePaths */])(global._spPageContextInfo.webAbsoluteUrl, candidateUrl));
            }
            else if (global._spPageContextInfo.hasOwnProperty("webServerRelativeUrl")) {
                return resolve(Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["e" /* combinePaths */])(global._spPageContextInfo.webServerRelativeUrl, candidateUrl));
            }
        }
        // does window.location exist and have a certain path part in it?
        if (typeof global.location !== "undefined") {
            var baseUrl_1 = global.location.toString().toLowerCase();
            ["/_layouts/", "/siteassets/"].forEach(function (s) {
                var index = baseUrl_1.indexOf(s);
                if (index > 0) {
                    return resolve(Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["e" /* combinePaths */])(baseUrl_1.substr(0, index), candidateUrl));
                }
            });
        }
        return resolve(candidateUrl);
    });
}
//# sourceMappingURL=toabsoluteurl.js.map
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(27)))

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharePointQueryableSecurable; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__roles__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__types__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sharepointqueryable__ = __webpack_require__(1);




var SharePointQueryableSecurable = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SharePointQueryableSecurable, _super);
    function SharePointQueryableSecurable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SharePointQueryableSecurable.prototype, "roleAssignments", {
        /**
         * Gets the set of role assignments for this item
         *
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_1__roles__["a" /* RoleAssignments */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_3__sharepointqueryable__["c" /* SharePointQueryableInstance */](this, "FirstUniqueAncestorSecurableObject");
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
        var q = this.clone(__WEBPACK_IMPORTED_MODULE_3__sharepointqueryable__["a" /* SharePointQueryable */], "getUserEffectivePermissions(@user)");
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
        // remove need to reference Web here, which created a circular build issue
        var w = new __WEBPACK_IMPORTED_MODULE_3__sharepointqueryable__["c" /* SharePointQueryableInstance */]("_api/web", "currentuser");
        return w.select("LoginName").get().then(function (user) {
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
        if (perm === __WEBPACK_IMPORTED_MODULE_2__types__["i" /* PermissionKind */].FullMask) {
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
}(__WEBPACK_IMPORTED_MODULE_3__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

//# sourceMappingURL=sharepointqueryablesecurable.js.map

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleAssignments; });
/* unused harmony export RoleAssignment */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return RoleDefinitions; });
/* unused harmony export RoleDefinition */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RoleDefinitionBindings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sitegroups__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pnp_common__ = __webpack_require__(2);




/**
 * Describes a set of role assignments for the current scope
 *
 */
var RoleAssignments = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](RoleAssignments, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a role assignment
 *
 */
var RoleAssignment = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](RoleAssignment, _super);
    function RoleAssignment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RoleAssignment.prototype, "groups", {
        /**
         * Gets the groups that directly belong to the access control list (ACL) for this securable object
         *
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_2__sitegroups__["b" /* SiteGroups */](this, "groups");
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

/**
 * Describes a collection of role definitions
 *
 */
var RoleDefinitions = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](RoleDefinitions, _super);
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
            BasePermissions: Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["g" /* extend */])({ __metadata: { type: "SP.BasePermissions" } }, basePermissions),
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a role definition
 *
 */
var RoleDefinition = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](RoleDefinition, _super);
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
            properties["BasePermissions"] = Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["g" /* extend */])({ __metadata: { type: "SP.BasePermissions" } }, properties["BasePermissions"]);
        }
        var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["g" /* extend */])({
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

/**
 * Describes the role definitons bound to a role assignment object
 *
 */
var RoleDefinitionBindings = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](RoleDefinitionBindings, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

//# sourceMappingURL=roles.js.map

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export PrincipalType */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SiteGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SiteGroup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__siteusers__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pnp_common__ = __webpack_require__(2);




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
})(PrincipalType || (PrincipalType = {}));
/**
 * Describes a collection of site groups
 *
 */
var SiteGroups = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SiteGroups, _super);
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
        var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["g" /* extend */])({ "__metadata": { "type": "SP.Group" } }, properties));
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a single group
 *
 */
var SiteGroup = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SiteGroup, _super);
    function SiteGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SiteGroup.prototype, "users", {
        /**
         * Gets the users for this group
         *
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_2__siteusers__["c" /* SiteUsers */](this, "users");
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
        var postBody = Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["g" /* extend */])({ "__metadata": { "type": "SP.Group" } }, properties);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

//# sourceMappingURL=sitegroups.js.map

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Lists; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return List; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__items__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contenttypes__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__fields__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__forms__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__subscriptions__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sharepointqueryablesecurable__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__usercustomactions__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__odata__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__exceptions__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__folders__ = __webpack_require__(14);














/**
 * Describes a collection of List objects
 *
 */
var Lists = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Lists, _super);
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
        var addSettings = Object(__WEBPACK_IMPORTED_MODULE_9__pnp_common__["g" /* extend */])({
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
            throw new __WEBPACK_IMPORTED_MODULE_12__exceptions__["b" /* NotSupportedInBatchException */]("The ensure list method");
        }
        return new Promise(function (resolve, reject) {
            var addOrUpdateSettings = Object(__WEBPACK_IMPORTED_MODULE_9__pnp_common__["g" /* extend */])(additionalSettings, { Title: title, Description: description, ContentTypesEnabled: enableContentTypes }, true);
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
            return new List(Object(__WEBPACK_IMPORTED_MODULE_11__odata__["a" /* spExtractODataId */])(json));
        });
    };
    /**
     * Gets a list that is the default location for wiki pages.
     */
    Lists.prototype.ensureSitePagesLibrary = function () {
        return this.clone(Lists, "ensuresitepageslibrary").postCore().then(function (json) {
            return new List(Object(__WEBPACK_IMPORTED_MODULE_11__odata__["a" /* spExtractODataId */])(json));
        });
    };
    return Lists;
}(__WEBPACK_IMPORTED_MODULE_7__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a single List instance
 *
 */
var List = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(List.prototype, "contentTypes", {
        /**
         * Gets the content types in this list
         *
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_3__contenttypes__["b" /* ContentTypes */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_1__items__["d" /* Items */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_2__views__["b" /* Views */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_4__fields__["b" /* Fields */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_5__forms__["a" /* Forms */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_2__views__["a" /* View */](this, "DefaultView");
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
            return new __WEBPACK_IMPORTED_MODULE_10__usercustomactions__["a" /* UserCustomActions */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_7__sharepointqueryable__["a" /* SharePointQueryable */](this, "EffectiveBasePermissions");
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
            return new __WEBPACK_IMPORTED_MODULE_7__sharepointqueryable__["b" /* SharePointQueryableCollection */](this, "EventReceivers");
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
            return new __WEBPACK_IMPORTED_MODULE_7__sharepointqueryable__["a" /* SharePointQueryable */](this, "getRelatedFields");
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
            return new __WEBPACK_IMPORTED_MODULE_7__sharepointqueryable__["a" /* SharePointQueryable */](this, "InformationRightsManagementSettings");
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
            return new __WEBPACK_IMPORTED_MODULE_6__subscriptions__["a" /* Subscriptions */](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "rootFolder", {
        /**
         * The root folder of the list
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_13__folders__["a" /* Folder */](this, "rootFolder");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets a view by view guid id
     *
     */
    List.prototype.getView = function (viewId) {
        return new __WEBPACK_IMPORTED_MODULE_2__views__["a" /* View */](this, "getView('" + viewId + "')");
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
        var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_9__pnp_common__["g" /* extend */])({
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
            body: JSON.stringify({ "query": Object(__WEBPACK_IMPORTED_MODULE_9__pnp_common__["g" /* extend */])({ "__metadata": { "type": "SP.ChangeQuery" } }, query) }),
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
            body: JSON.stringify({ "query": Object(__WEBPACK_IMPORTED_MODULE_9__pnp_common__["g" /* extend */])({ "__metadata": { "type": "SP.CamlQuery" } }, query) }),
        });
    };
    /**
     * See: https://msdn.microsoft.com/en-us/library/office/dn292554.aspx
     */
    List.prototype.getListItemChangesSinceToken = function (query) {
        return this.clone(List, "getlistitemchangessincetoken").postCore({
            body: JSON.stringify({ "query": Object(__WEBPACK_IMPORTED_MODULE_9__pnp_common__["g" /* extend */])({ "__metadata": { "type": "SP.ChangeLogItemQuery" } }, query) }),
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
            overrideParameters: Object(__WEBPACK_IMPORTED_MODULE_9__pnp_common__["g" /* extend */])({
                "__metadata": { "type": "SP.RenderListDataOverrideParameters" },
            }, overrideParameters),
            parameters: Object(__WEBPACK_IMPORTED_MODULE_9__pnp_common__["g" /* extend */])({
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
        return this.clone(List, null, false).select("ListItemEntityTypeFullName").get().then(function (o) { return o.ListItemEntityTypeFullName; });
    };
    /**
     * Creates an item using path (in a folder), validates and sets its field values.
     *
     * @param formValues The fields to change and their new values.
     * @param decodedUrl Path decoded url; folder's server relative path.
     * @param bNewDocumentUpdate true if the list item is a document being updated after upload; otherwise false.
     * @param checkInComment Optional check in comment.
     */
    List.prototype.addValidateUpdateItemUsingPath = function (formValues, decodedUrl, bNewDocumentUpdate, checkInComment) {
        if (bNewDocumentUpdate === void 0) { bNewDocumentUpdate = false; }
        return this.clone(List, "AddValidateUpdateItemUsingPath()").postCore({
            body: JSON.stringify({
                bNewDocumentUpdate: bNewDocumentUpdate,
                checkInComment: checkInComment,
                formValues: formValues,
                listItemCreateInfo: {
                    FolderPath: {
                        DecodedUrl: decodedUrl,
                        __metadata: { type: "SP.ResourcePath" },
                    },
                    __metadata: { type: "SP.ListItemCreationInformationUsingPath" },
                },
            }),
        }).then(function (res) {
            if (typeof res.AddValidateUpdateItemUsingPath !== "undefined") {
                return res.AddValidateUpdateItemUsingPath.results;
            }
            return res;
        });
    };
    return List;
}(__WEBPACK_IMPORTED_MODULE_8__sharepointqueryablesecurable__["a" /* SharePointQueryableSecurable */]));

//# sourceMappingURL=lists.js.map

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Fields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Field; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__types__ = __webpack_require__(13);




/**
 * Describes a collection of Field objects
 *
 */
var Fields = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Fields, _super);
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
            "parameters": Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({
                "__metadata": {
                    "type": "SP.XmlSchemaFieldCreationInformation",
                },
            }, info),
        });
        return this.clone(Fields, "createfieldasxml").postCore({ body: postBody }).then(function (data) {
            return {
                data: data,
                field: _this.getById(data.Id),
            };
        });
    };
    /**
     * Adds a new field to the collection
     *
     * @param title The new field's title
     * @param fieldType The new field's type (ex: SP.FieldText)
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.add = function (title, fieldType, properties) {
        var _this = this;
        var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({
            "Title": title,
            "__metadata": { "type": fieldType },
        }, properties));
        return this.clone(Fields, null).postCore({ body: postBody }).then(function (data) {
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
        return this.add(title, "SP.FieldText", Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(props, properties));
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
        if (outputType === void 0) { outputType = __WEBPACK_IMPORTED_MODULE_3__types__["f" /* FieldTypes */].Text; }
        var props = {
            DateFormat: dateFormat,
            FieldTypeKind: 17,
            Formula: formula,
            OutputType: outputType,
        };
        return this.add(title, "SP.FieldCalculated", Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(props, properties));
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
        if (displayFormat === void 0) { displayFormat = __WEBPACK_IMPORTED_MODULE_3__types__["e" /* DateTimeFieldFormatType */].DateOnly; }
        if (calendarType === void 0) { calendarType = __WEBPACK_IMPORTED_MODULE_3__types__["b" /* CalendarType */].Gregorian; }
        if (friendlyDisplayFormat === void 0) { friendlyDisplayFormat = 0; }
        var props = {
            DateTimeCalendarType: calendarType,
            DisplayFormat: displayFormat,
            FieldTypeKind: 4,
            FriendlyDisplayFormat: friendlyDisplayFormat,
        };
        return this.add(title, "SP.FieldDateTime", Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(props, properties));
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
            props = Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({ MinimumValue: minValue }, props);
        }
        if (typeof maxValue !== "undefined") {
            props = Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({ MaximumValue: maxValue }, props);
        }
        return this.add(title, "SP.FieldNumber", Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(props, properties));
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
            props = Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({ MinimumValue: minValue }, props);
        }
        if (typeof maxValue !== "undefined") {
            props = Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({ MaximumValue: maxValue }, props);
        }
        return this.add(title, "SP.FieldCurrency", Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(props, properties));
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
        return this.add(title, "SP.FieldMultiLineText", Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(props, properties));
    };
    /**
     * Adds a new SP.FieldUrl to the collection
     *
     * @param title The field title
     */
    Fields.prototype.addUrl = function (title, displayFormat, properties) {
        if (displayFormat === void 0) { displayFormat = __WEBPACK_IMPORTED_MODULE_3__types__["s" /* UrlFieldFormatType */].Hyperlink; }
        var props = {
            DisplayFormat: displayFormat,
            FieldTypeKind: 11,
        };
        return this.add(title, "SP.FieldUrl", Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(props, properties));
    };
    /** Adds a user field to the colleciton
    *
    * @param title The new field's title
    * @param selectionMode The selection mode of the field
    * @param selectionGroup Value that specifies the identifier of the SharePoint group whose members can be selected as values of the field
    * @param properties
    */
    Fields.prototype.addUser = function (title, selectionMode, properties) {
        var props = {
            FieldTypeKind: 20,
            SelectionMode: selectionMode,
        };
        return this.add(title, "SP.FieldUser", Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(props, properties));
    };
    /**
     * Adds a SP.FieldLookup to the collection
     *
     * @param title The new field's title
     * @param lookupListId The guid id of the list where the source of the lookup is found
     * @param lookupFieldName The internal name of the field in the source list
     * @param properties Set of additional properties to set on the new field
     */
    Fields.prototype.addLookup = function (title, lookupListId, lookupFieldName, properties) {
        var _this = this;
        var postBody = JSON.stringify({
            parameters: Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({
                FieldTypeKind: 7,
                LookupFieldName: lookupFieldName,
                LookupListId: lookupListId,
                Title: title,
                "__metadata": { "type": "SP.FieldCreationInformation" },
            }, properties),
        });
        return this.clone(Fields, "addfield").postCore({ body: postBody }).then(function (data) {
            return {
                data: data,
                field: _this.getById(data.Id),
            };
        });
    };
    /**
     * Adds a new SP.FieldChoice to the collection
     *
     * @param title The field title.
     * @param choices The choices for the field.
     * @param format The display format of the available options for the field.
     * @param fillIn Specifies whether the field allows fill-in values.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.addChoice = function (title, choices, format, fillIn, properties) {
        if (format === void 0) { format = __WEBPACK_IMPORTED_MODULE_3__types__["c" /* ChoiceFieldFormatType */].Dropdown; }
        var props = {
            Choices: {
                results: choices,
            },
            EditFormat: format,
            FieldTypeKind: 6,
            FillInChoice: fillIn,
        };
        return this.add(title, "SP.FieldChoice", Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(props, properties));
    };
    /**
     * Adds a new SP.FieldMultiChoice to the collection
     *
     * @param title The field title.
     * @param choices The choices for the field.
     * @param fillIn Specifies whether the field allows fill-in values.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.addMultiChoice = function (title, choices, fillIn, properties) {
        var props = {
            Choices: {
                results: choices,
            },
            FieldTypeKind: 15,
            FillInChoice: fillIn,
        };
        return this.add(title, "SP.FieldMultiChoice", Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(props, properties));
    };
    /**
     * Adds a new SP.FieldBoolean to the collection
     *
     * @param title The field title.
     * @param properties Differ by type of field being created (see: https://msdn.microsoft.com/en-us/library/office/dn600182.aspx)
     */
    Fields.prototype.addBoolean = function (title, properties) {
        var props = {
            FieldTypeKind: 8,
        };
        return this.add(title, "SP.Field", Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(props, properties));
    };
    return Fields;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a single of Field instance
 *
 */
var Field = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Field, _super);
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
        var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

//# sourceMappingURL=fields.js.map

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserCustomActions; });
/* unused harmony export UserCustomAction */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pnp_common__ = __webpack_require__(2);



/**
 * Describes a collection of user custom actions
 *
 */
var UserCustomActions = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](UserCustomActions, _super);
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
        var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({ __metadata: { "type": "SP.UserCustomAction" } }, properties));
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a single user custom action
 *
 */
var UserCustomAction = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](UserCustomAction, _super);
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
        var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

//# sourceMappingURL=usercustomactions.js.map

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NavigationNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return NavigationNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Navigation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return NavigationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);


/**
 * Represents a collection of navigation nodes
 *
 */
var NavigationNodes = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](NavigationNodes, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Represents an instance of a navigation node
 *
 */
var NavigationNode = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](NavigationNode, _super);
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
     * Deletes this node and any child nodes
     */
    NavigationNode.prototype.delete = function () {
        return _super.prototype.deleteCore.call(this);
    };
    return NavigationNode;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

/**
 * Exposes the navigation components
 *
 */
var Navigation = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Navigation, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["a" /* SharePointQueryable */]));

/**
 * Represents the top level navigation service
 */
var NavigationService = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](NavigationService, _super);
    function NavigationService(path) {
        if (path === void 0) { path = null; }
        return _super.call(this, "_api/navigation", path) || this;
    }
    /**
     * The MenuState service operation returns a Menu-State (dump) of a SiteMapProvider on a site.
     *
     * @param menuNodeKey MenuNode.Key of the start node within the SiteMapProvider If no key is provided the SiteMapProvider.RootNode will be the root of the menu state.
     * @param depth Depth of the dump. If no value is provided a dump with the depth of 10 is returned
     * @param mapProviderName The name identifying the SiteMapProvider to be used
     * @param customProperties comma seperated list of custom properties to be returned.
     */
    NavigationService.prototype.getMenuState = function (menuNodeKey, depth, mapProviderName, customProperties) {
        if (menuNodeKey === void 0) { menuNodeKey = null; }
        if (depth === void 0) { depth = 10; }
        if (mapProviderName === void 0) { mapProviderName = null; }
        if (customProperties === void 0) { customProperties = null; }
        return (new NavigationService("MenuState")).postCore({
            body: JSON.stringify({
                customProperties: customProperties,
                depth: depth,
                mapProviderName: mapProviderName,
                menuNodeKey: menuNodeKey,
            }),
        });
    };
    /**
     * Tries to get a SiteMapNode.Key for a given URL within a site collection.
     *
     * @param currentUrl A url representing the SiteMapNode
     * @param mapProviderName The name identifying the SiteMapProvider to be used
     */
    NavigationService.prototype.getMenuNodeKey = function (currentUrl, mapProviderName) {
        if (mapProviderName === void 0) { mapProviderName = null; }
        return (new NavigationService("MenuNodeKey")).postCore({
            body: JSON.stringify({
                currentUrl: currentUrl,
                mapProviderName: mapProviderName,
            }),
        });
    };
    return NavigationService;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["a" /* SharePointQueryable */]));

//# sourceMappingURL=navigation.js.map

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Site; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__webs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__usercustomactions__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__odata__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__batch__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__features__ = __webpack_require__(37);







/**
 * Describes a site collection
 *
 */
var Site = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Site, _super);
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
            return new __WEBPACK_IMPORTED_MODULE_2__webs__["a" /* Web */](this, "rootweb");
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
            return new __WEBPACK_IMPORTED_MODULE_6__features__["a" /* Features */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_3__usercustomactions__["a" /* UserCustomActions */](this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets a Web instance representing the root web of the site collection
     * correctly setup for chaining within the library
     */
    Site.prototype.getRootWeb = function () {
        return this.rootWeb.select("Url").get().then(function (web) { return new __WEBPACK_IMPORTED_MODULE_2__webs__["a" /* Web */](web.Url); });
    };
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
        var q = new __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["a" /* SharePointQueryable */]("", "_api/sp.web.getdocumentlibraries(@v)");
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
        var q = new __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["a" /* SharePointQueryable */]("", "_api/sp.web.getweburlfrompageurl(@v)");
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
        return new __WEBPACK_IMPORTED_MODULE_5__batch__["a" /* SPBatch */](this.parentUrl);
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
                web: __WEBPACK_IMPORTED_MODULE_2__webs__["a" /* Web */].fromUrl(Object(__WEBPACK_IMPORTED_MODULE_4__odata__["a" /* spExtractODataId */])(d)),
            };
        });
    };
    return Site;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

//# sourceMappingURL=site.js.map

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Webs */
/* unused harmony export WebInfos */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Web; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sharepointqueryableshareable__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__folders__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lists__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__fields__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__site__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__navigation__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__sitegroups__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__contenttypes__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__roles__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__files__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__utils_extractweburl__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__siteusers__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__usercustomactions__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__odata__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__batch__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__features__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__relateditems__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__appcatalog__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__regionalsettings__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__clientsidepages__ = __webpack_require__(32);























/**
 * Describes a collection of webs
 *
 */
var Webs = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Webs, _super);
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
            "parameters": Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])({
                "__metadata": { "type": "SP.WebCreationInformation" },
            }, props),
        });
        return this.clone(Webs, "add").postCore({ body: postBody }).then(function (data) {
            return {
                data: data,
                web: new Web(Object(__WEBPACK_IMPORTED_MODULE_16__odata__["a" /* spExtractODataId */])(data).replace(/_api\/web\/?/i, "")),
            };
        });
    };
    return Webs;
}(__WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a collection of web infos
 *
 */
var WebInfos = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](WebInfos, _super);
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
}(__WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a web
 *
 */
var Web = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Web, _super);
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
        return new Web(Object(__WEBPACK_IMPORTED_MODULE_13__utils_extractweburl__["a" /* extractWebUrl */])(url), path);
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
     * Gets this web's parent web and data
     *
     */
    Web.prototype.getParentWeb = function () {
        var _this = this;
        return this.select("ParentWeb/Id").expand("ParentWeb").get()
            .then(function (_a) {
            var ParentWeb = _a.ParentWeb;
            return new __WEBPACK_IMPORTED_MODULE_7__site__["a" /* Site */](_this.toUrlAndQuery().split("/_api")[0]).openWebById(ParentWeb.Id);
        });
    };
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
    Object.defineProperty(Web.prototype, "allProperties", {
        /**
         * Allows access to the web's all properties collection
         */
        get: function () {
            return this.clone(__WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["b" /* SharePointQueryableCollection */], "allproperties");
        },
        enumerable: true,
        configurable: true
    });
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
            return new __WEBPACK_IMPORTED_MODULE_10__contenttypes__["b" /* ContentTypes */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_5__lists__["b" /* Lists */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_6__fields__["b" /* Fields */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_18__features__["a" /* Features */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_6__fields__["b" /* Fields */](this, "availablefields");
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
            return new __WEBPACK_IMPORTED_MODULE_8__navigation__["a" /* Navigation */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_14__siteusers__["c" /* SiteUsers */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_9__sitegroups__["b" /* SiteGroups */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_5__lists__["a" /* List */](this, "siteuserinfolist");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "regionalSettings", {
        /**
         * Gets regional settings
         *
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_21__regionalsettings__["b" /* RegionalSettings */](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Web.prototype, "currentUser", {
        /**
         * Gets the current user
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_14__siteusers__["a" /* CurrentUser */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_4__folders__["b" /* Folders */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_15__usercustomactions__["a" /* UserCustomActions */](this);
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
            return new __WEBPACK_IMPORTED_MODULE_11__roles__["c" /* RoleDefinitions */](this);
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
            return __WEBPACK_IMPORTED_MODULE_19__relateditems__["a" /* RelatedItemManagerImpl */].FromUrl(this.toUrl());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new batch for requests within the context of this web
     *
     */
    Web.prototype.createBatch = function () {
        return new __WEBPACK_IMPORTED_MODULE_17__batch__["a" /* SPBatch */](this.parentUrl);
    };
    Object.defineProperty(Web.prototype, "rootFolder", {
        /**
         * Gets the root folder of this web
         *
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_4__folders__["a" /* Folder */](this, "rootFolder");
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
            return new __WEBPACK_IMPORTED_MODULE_9__sitegroups__["a" /* SiteGroup */](this, "associatedownergroup");
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
            return new __WEBPACK_IMPORTED_MODULE_9__sitegroups__["a" /* SiteGroup */](this, "associatedmembergroup");
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
            return new __WEBPACK_IMPORTED_MODULE_9__sitegroups__["a" /* SiteGroup */](this, "associatedvisitorgroup");
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
        return new __WEBPACK_IMPORTED_MODULE_4__folders__["a" /* Folder */](this, "getFolderByServerRelativeUrl('" + folderRelativeUrl + "')");
    };
    /**
     * Gets a folder by server relative relative path if your folder name contains # and % characters
     * you need to first encode the file name using encodeURIComponent() and then pass the url
     * let url = "/sites/test/Shared Documents/" + encodeURIComponent("%123");
     * This works only in SharePoint online.
     *
     * @param folderRelativeUrl The server relative path to the folder (including /sites/ if applicable)
     */
    Web.prototype.getFolderByServerRelativePath = function (folderRelativeUrl) {
        return new __WEBPACK_IMPORTED_MODULE_4__folders__["a" /* Folder */](this, "getFolderByServerRelativePath(decodedUrl='" + folderRelativeUrl + "')");
    };
    /**
     * Gets a file by server relative url
     *
     * @param fileRelativeUrl The server relative path to the file (including /sites/ if applicable)
     */
    Web.prototype.getFileByServerRelativeUrl = function (fileRelativeUrl) {
        return new __WEBPACK_IMPORTED_MODULE_12__files__["b" /* File */](this, "getFileByServerRelativeUrl('" + fileRelativeUrl + "')");
    };
    /**
     * Gets a file by server relative url if your file name contains # and % characters
     * you need to first encode the file name using encodeURIComponent() and then pass the url
     * let url = "/sites/test/Shared Documents/" + encodeURIComponent("%123.docx");
     *
     * @param fileRelativeUrl The server relative path to the file (including /sites/ if applicable)
     */
    Web.prototype.getFileByServerRelativePath = function (fileRelativeUrl) {
        return new __WEBPACK_IMPORTED_MODULE_12__files__["b" /* File */](this, "getFileByServerRelativePath(decodedUrl='" + fileRelativeUrl + "')");
    };
    /**
     * Gets a list by server relative url (list's root folder)
     *
     * @param listRelativeUrl The server relative path to the list's root folder (including /sites/ if applicable)
     */
    Web.prototype.getList = function (listRelativeUrl) {
        return new __WEBPACK_IMPORTED_MODULE_5__lists__["a" /* List */](this, "getList('" + listRelativeUrl + "')");
    };
    /**
     * Updates this web instance with the supplied properties
     *
     * @param properties A plain object hash of values to update for the web
     */
    Web.prototype.update = function (properties) {
        var _this = this;
        var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])({
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
                user: new __WEBPACK_IMPORTED_MODULE_14__siteusers__["b" /* SiteUser */](Object(__WEBPACK_IMPORTED_MODULE_16__odata__["a" /* spExtractODataId */])(data)),
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
        return new __WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["b" /* SharePointQueryableCollection */](this, "getavailablewebtemplates(lcid=" + language + ", doincludecrosslanguage=" + includeCrossLanugage + ")");
    };
    /**
     * Returns the list gallery on the site
     *
     * @param type The gallery type - WebTemplateCatalog = 111, WebPartCatalog = 113 ListTemplateCatalog = 114,
     * MasterPageCatalog = 116, SolutionCatalog = 121, ThemeCatalog = 123, DesignCatalog = 124, AppDataCatalog = 125
     */
    Web.prototype.getCatalog = function (type) {
        return this.clone(Web, "getcatalog(" + type + ")").select("Id").get().then(function (data) {
            return new __WEBPACK_IMPORTED_MODULE_5__lists__["a" /* List */](Object(__WEBPACK_IMPORTED_MODULE_16__odata__["a" /* spExtractODataId */])(data));
        });
    };
    /**
     * Returns the collection of changes from the change log that have occurred within the list, based on the specified query
     *
     * @param query The change query
     */
    Web.prototype.getChanges = function (query) {
        var postBody = JSON.stringify({ "query": Object(__WEBPACK_IMPORTED_MODULE_1__pnp_common__["g" /* extend */])({ "__metadata": { "type": "SP.ChangeQuery" } }, query) });
        return this.clone(Web, "getchanges").postCore({ body: postBody });
    };
    Object.defineProperty(Web.prototype, "customListTemplate", {
        /**
         * Gets the custom list templates for the site
         *
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["b" /* SharePointQueryableCollection */](this, "getcustomlisttemplates");
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
        return new __WEBPACK_IMPORTED_MODULE_14__siteusers__["b" /* SiteUser */](this, "getUserById(" + id + ")");
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
     * @param key Id of storage entity to be set
     */
    Web.prototype.getStorageEntity = function (key) {
        return this.clone(Web, "getStorageEntity('" + key + "')").get();
    };
    /**
     * This will set the storage entity identified by the given key (MUST be called in the context of the app catalog)
     *
     * @param key Id of storage entity to be set
     * @param value Value of storage entity to be set
     * @param description Description of storage entity to be set
     * @param comments Comments of storage entity to be set
     */
    Web.prototype.setStorageEntity = function (key, value, description, comments) {
        if (description === void 0) { description = ""; }
        if (comments === void 0) { comments = ""; }
        return this.clone(Web, "setStorageEntity").postCore({
            body: JSON.stringify({
                comments: comments,
                description: description,
                key: key,
                value: value,
            }),
        });
    };
    /**
     * This will remove the storage entity identified by the given key
     *
     * @param key Id of storage entity to be removed
     */
    Web.prototype.removeStorageEntity = function (key) {
        return this.clone(Web, "removeStorageEntity('" + key + "')").postCore();
    };
    /**
     * Gets the app catalog for this web
     *
     * @param url Optional url or web containing the app catalog (default: current web)
     */
    Web.prototype.getAppCatalog = function (url) {
        return new __WEBPACK_IMPORTED_MODULE_20__appcatalog__["b" /* AppCatalog */](url || this);
    };
    /**
     * Gets the collection of available client side web parts for this web instance
     */
    Web.prototype.getClientSideWebParts = function () {
        return this.clone(__WEBPACK_IMPORTED_MODULE_2__sharepointqueryable__["b" /* SharePointQueryableCollection */], "GetClientSideWebParts").get();
    };
    /**
     * Creates a new client side page
     *
     * @param pageName Name of the new page
     * @param title Display title of the new page
     * @param libraryTitle Title of the library in which to create the new page. Default: "Site Pages"
     */
    Web.prototype.addClientSidePage = function (pageName, title, libraryTitle) {
        if (title === void 0) { title = pageName.replace(/\.[^/.]+$/, ""); }
        if (libraryTitle === void 0) { libraryTitle = "Site Pages"; }
        return __WEBPACK_IMPORTED_MODULE_22__clientsidepages__["d" /* ClientSidePage */].create(this.lists.getByTitle(libraryTitle), pageName, title);
    };
    /**
     * Creates a new client side page using the library path
     *
     * @param pageName Name of the new page
     * @param listRelativePath The server relative path to the list's root folder (including /sites/ if applicable)
     * @param title Display title of the new page
     */
    Web.prototype.addClientSidePageByPath = function (pageName, listRelativePath, title) {
        if (title === void 0) { title = pageName.replace(/\.[^/.]+$/, ""); }
        return __WEBPACK_IMPORTED_MODULE_22__clientsidepages__["d" /* ClientSidePage */].create(this.getList(listRelativePath), pageName, title);
    };
    return Web;
}(__WEBPACK_IMPORTED_MODULE_3__sharepointqueryableshareable__["f" /* SharePointQueryableShareableWeb */]));

//# sourceMappingURL=webs.js.map

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_sp__ = __webpack_require__(41);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "spExtractODataId", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_46"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "spODataEntity", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_47"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "spODataEntityArray", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_48"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SharePointQueryable", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_12"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SharePointQueryableInstance", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_14"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SharePointQueryableCollection", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_13"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SharePointQueryableSecurable", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_15"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FileFolderShared", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["A"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SharePointQueryableShareable", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_16"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SharePointQueryableShareableFile", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_17"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SharePointQueryableShareableFolder", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_18"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SharePointQueryableShareableItem", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_19"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SharePointQueryableShareableWeb", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_20"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AppCatalog", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "App", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContentType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["p"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ContentTypes", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FieldLink", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["u"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FieldLinks", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["v"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["t"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Fields", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["y"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CheckinType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "WebPartsPersonalizationScope", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_43"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MoveOperations", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["L"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TemplateFileType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_32"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "File", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["z"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Files", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["B"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Folder", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["C"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Folders", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["D"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SPHttpClient", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_3"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Item", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["F"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Items", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["I"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ItemVersion", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["G"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ItemVersions", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["H"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PagedItemCollection", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["R"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NavigationNodes", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["O"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NavigationNode", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["N"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NavigationService", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["P"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "List", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["J"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Lists", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["K"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RegionalSettings", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["X"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "InstalledLanguages", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["E"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TimeZone", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_33"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TimeZones", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_34"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sp", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_45"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SPRest", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_4"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RoleDefinitionBindings", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_1"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Search", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_6"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SearchQueryBuilder", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_8"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SearchResults", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_9"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SortDirection", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_31"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ReorderingRuleMatchType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["Z"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "QueryPropertyValueType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["W"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SearchBuiltInSourceId", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_7"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SearchSuggest", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_10"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SearchSuggestResult", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_11"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Site", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_25"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UserProfileQuery", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_37"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "toAbsoluteUrl", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_49"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "extractWebUrl", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_44"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UtilityMethod", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_38"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "WebPartDefinitions", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_42"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "WebPartDefinition", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_41"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "WebPart", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_40"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Web", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_39"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PromotedState", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["V"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ClientSidePage", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CanvasSection", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CanvasControl", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CanvasColumn", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ClientSidePart", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ClientSideText", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ClientSideWebpart", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["m"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Comments", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["o"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Comment", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["n"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Replies", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_0"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SocialQuery", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_29"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MySocialQuery", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["M"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SocialActorType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_26"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SocialActorTypes", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_27"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SocialFollowResult", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_28"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SocialStatusCode", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_30"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ControlMode", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["r"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FieldTypes", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["w"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DateTimeFieldFormatType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["s"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "AddFieldOptions", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CalendarType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UrlFieldFormatType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_35"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PermissionKind", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["S"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PrincipalType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["U"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PrincipalSource", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["T"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RoleType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_2"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PageType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["Q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SharingLinkKind", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_22"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SharingRole", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_24"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SharingOperationStatusCode", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_23"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SPSharedObjectType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_5"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SharingDomainRestrictionMode", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_21"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RenderListDataOptions", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["Y"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FieldUserSelectionMode", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["x"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ChoiceFieldFormatType", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UrlZone", function() { return __WEBPACK_IMPORTED_MODULE_0__src_sp__["_36"]; });

//# sourceMappingURL=index.js.map

/***/ }),
/* 27 */
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
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SiteUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SiteUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurrentUser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sitegroups__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pnp_common__ = __webpack_require__(2);




/**
 * Describes a collection of all site collection users
 *
 */
var SiteUsers = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SiteUsers, _super);
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
        su.concat("(@v)");
        su.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a single user
 *
 */
var SiteUser = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SiteUser, _super);
    function SiteUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SiteUser.prototype, "groups", {
        /**
         * Gets the groups for this user
         *
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_2__sitegroups__["b" /* SiteGroups */](this, "groups");
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
        var postBody = Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["g" /* extend */])({ "__metadata": { "type": "SP.User" } }, properties);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

/**
 * Represents the current user
 */
var CurrentUser = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](CurrentUser, _super);
    function CurrentUser(baseUrl, path) {
        if (path === void 0) { path = "currentuser"; }
        return _super.call(this, baseUrl, path) || this;
    }
    return CurrentUser;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

//# sourceMappingURL=siteusers.js.map

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppCatalog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__files__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__odata__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_extractweburl__ = __webpack_require__(7);





/**
 * Represents an app catalog
 */
var AppCatalog = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](AppCatalog, _super);
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
        _this = _super.call(this, Object(__WEBPACK_IMPORTED_MODULE_4__utils_extractweburl__["a" /* extractWebUrl */])(candidateUrl), path) || this;
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
        var adder = new AppCatalog(Object(__WEBPACK_IMPORTED_MODULE_4__utils_extractweburl__["a" /* extractWebUrl */])(this.toUrl()), "_api/web/tenantappcatalog/add(overwrite=" + shouldOverWrite + ",url='" + filename + "')");
        return adder.postCore({
            body: content,
        }).then(function (r) {
            return {
                data: r,
                file: new __WEBPACK_IMPORTED_MODULE_2__files__["b" /* File */](Object(__WEBPACK_IMPORTED_MODULE_3__odata__["a" /* spExtractODataId */])(r)),
            };
        });
    };
    return AppCatalog;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Represents the actions you can preform on a given app within the catalog
 */
var App = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](App, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

//# sourceMappingURL=appcatalog.js.map

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LimitedWebPartManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return WebPartDefinitions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return WebPartDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return WebPart; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);


var LimitedWebPartManager = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](LimitedWebPartManager, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["a" /* SharePointQueryable */]));

var WebPartDefinitions = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](WebPartDefinitions, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

var WebPartDefinition = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](WebPartDefinition, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

var WebPart = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](WebPart, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

//# sourceMappingURL=webparts.js.map

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Comments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Comment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Replies; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3____ = __webpack_require__(26);




/**
 * Represents a Collection of comments
 */
var Comments = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Comments, _super);
    /**
     * Creates a new instance of the Comments class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    function Comments(baseUrl, path) {
        if (path === void 0) { path = "comments"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a comment by id
     *
     * @param id Id of the comment to load
     */
    Comments.prototype.getById = function (id) {
        var c = new Comment(this);
        c.concat("(" + id + ")");
        return c;
    };
    /**
     * Adds a new comment to this collection
     *
     * @param info Comment information to add
     */
    Comments.prototype.add = function (info) {
        var _this = this;
        if (typeof info === "string") {
            info = { text: info };
        }
        var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({
            "__metadata": { "type": "Microsoft.SharePoint.Comments.comment" },
        }, info));
        return this.clone(Comments, null).postCore({ body: postBody }).then(function (d) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(_this.getById(d.id), d);
        });
    };
    /**
     * Deletes all the comments in this collection
     */
    Comments.prototype.clear = function () {
        return this.clone(Comments, "DeleteAll").postCore();
    };
    return Comments;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Represents a comment
 */
var Comment = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Comment, _super);
    function Comment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Comment.prototype, "replies", {
        get: function () {
            return new Replies(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Likes the comment as the current user
     */
    Comment.prototype.like = function () {
        return this.clone(Comment, "Like").postCore();
    };
    /**
     * Unlikes the comment as the current user
     */
    Comment.prototype.unlike = function () {
        return this.clone(Comment, "Unlike").postCore();
    };
    /**
     * Deletes this comment
     */
    Comment.prototype.delete = function () {
        return this.clone(Comment, "DeleteComment").postCore();
    };
    return Comment;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

/**
 * Represents a Collection of comments
 */
var Replies = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Replies, _super);
    /**
     * Creates a new instance of the Comments class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this fields collection
     */
    function Replies(baseUrl, path) {
        if (path === void 0) { path = "replies"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Adds a new reply to this collection
     *
     * @param info Comment information to add
     */
    Replies.prototype.add = function (info) {
        if (typeof info === "string") {
            info = { text: info };
        }
        var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({
            "__metadata": { "type": "Microsoft.SharePoint.Comments.comment" },
        }, info));
        return this.clone(Replies, null).postCore({ body: postBody }).then(function (d) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(new Comment(Object(__WEBPACK_IMPORTED_MODULE_3____["spExtractODataId"])(d)), d);
        });
    };
    return Replies;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

//# sourceMappingURL=comments.js.map

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return PromotedState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ClientSidePage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CanvasSection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CanvasControl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CanvasColumn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ClientSidePart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ClientSideText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ClientSideWebpart; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__files__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__items__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pnp_common__ = __webpack_require__(2);




/**
 * Page promotion state
 */
var PromotedState;
(function (PromotedState) {
    /**
     * Regular client side page
     */
    PromotedState[PromotedState["NotPromoted"] = 0] = "NotPromoted";
    /**
     * Page that will be promoted as news article after publishing
     */
    PromotedState[PromotedState["PromoteOnPublish"] = 1] = "PromoteOnPublish";
    /**
     * Page that is promoted as news article
     */
    PromotedState[PromotedState["Promoted"] = 2] = "Promoted";
})(PromotedState || (PromotedState = {}));
/**
 * Gets the next order value 1 based for the provided collection
 *
 * @param collection Collection of orderable things
 */
function getNextOrder(collection) {
    if (collection.length < 1) {
        return 1;
    }
    return Math.max.apply(null, collection.map(function (i) { return i.order; })) + 1;
}
/**
 * After https://stackoverflow.com/questions/273789/is-there-a-version-of-javascripts-string-indexof-that-allows-for-regular-expr/274094#274094
 *
 * @param this Types the called context this to a string in which the search will be conducted
 * @param regex A regex or string to match
 * @param startpos A starting position from which the search will begin
 */
function regexIndexOf(regex, startpos) {
    if (startpos === void 0) { startpos = 0; }
    var indexOf = this.substring(startpos).search(regex);
    return (indexOf >= 0) ? (indexOf + (startpos)) : indexOf;
}
/**
 * Finds bounded blocks of markup bounded by divs, ensuring to match the ending div even with nested divs in the interstitial markup
 *
 * @param html HTML to search
 * @param boundaryStartPattern The starting pattern to find, typically a div with attribute
 * @param collector A func to take the found block and provide a way to form it into a useful return that is added into the return array
 */
function getBoundedDivMarkup(html, boundaryStartPattern, collector) {
    var blocks = [];
    if (typeof html === "undefined" || html === null) {
        return blocks;
    }
    // remove some extra whitespace if present
    var cleanedHtml = html.replace(/[\t\r\n]/g, "");
    // find the first div
    var startIndex = regexIndexOf.call(cleanedHtml, boundaryStartPattern);
    if (startIndex < 0) {
        // we found no blocks in the supplied html
        return blocks;
    }
    // this loop finds each of the blocks
    while (startIndex > -1) {
        // we have one open div counting from the one found above using boundaryStartPattern so we need to ensure we find it's close
        var openCounter = 1;
        var searchIndex = startIndex + 1;
        var nextDivOpen = -1;
        var nextCloseDiv = -1;
        // this loop finds the </div> tag that matches the opening of the control
        while (true) {
            // find both the next opening and closing div tags from our current searching index
            nextDivOpen = regexIndexOf.call(cleanedHtml, /<div[^>]*>/i, searchIndex);
            nextCloseDiv = regexIndexOf.call(cleanedHtml, /<\/div>/i, searchIndex);
            if (nextDivOpen < 0) {
                // we have no more opening divs, just set this to simplify checks below
                nextDivOpen = cleanedHtml.length + 1;
            }
            // determine which we found first, then increment or decrement our counter
            // and set the location to begin searching again
            if (nextDivOpen < nextCloseDiv) {
                openCounter++;
                searchIndex = nextDivOpen + 1;
            }
            else if (nextCloseDiv < nextDivOpen) {
                openCounter--;
                searchIndex = nextCloseDiv + 1;
            }
            // once we have no open divs back to the level of the opening control div
            // meaning we have all of the markup we intended to find
            if (openCounter === 0) {
                // get the bounded markup, +6 is the size of the ending </div> tag
                var markup = cleanedHtml.substring(startIndex, nextCloseDiv + 6).trim();
                // save the control data we found to the array
                blocks.push(collector(markup));
                // get out of our while loop
                break;
            }
            if (openCounter > 1000 || openCounter < 0) {
                // this is an arbitrary cut-off but likely we will not have 1000 nested divs
                // something has gone wrong above and we are probably stuck in our while loop
                // let's get out of our while loop and not hang everything
                throw new Error("getBoundedDivMarkup exceeded depth parameters.");
            }
        }
        // get the start of the next control
        startIndex = regexIndexOf.call(cleanedHtml, boundaryStartPattern, nextCloseDiv);
    }
    return blocks;
}
/**
 * Normalizes the order value for all the sections, columns, and controls to be 1 based and stepped (1, 2, 3...)
 *
 * @param collection The collection to normalize
 */
function reindex(collection) {
    for (var i = 0; i < collection.length; i++) {
        collection[i].order = i + 1;
        if (collection[i].hasOwnProperty("columns")) {
            reindex(collection[i].columns);
        }
        else if (collection[i].hasOwnProperty("controls")) {
            reindex(collection[i].controls);
        }
    }
}
/**
 * Represents the data and methods associated with client side "modern" pages
 */
var ClientSidePage = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ClientSidePage, _super);
    /**
     * Creates a new instance of the ClientSidePage class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this web collection
     * @param commentsDisabled Indicates if comments are disabled, not valid until load is called
     */
    function ClientSidePage(file, sections, commentsDisabled) {
        if (sections === void 0) { sections = []; }
        if (commentsDisabled === void 0) { commentsDisabled = false; }
        var _this = _super.call(this, file) || this;
        _this.sections = sections;
        _this.commentsDisabled = commentsDisabled;
        return _this;
    }
    /**
     * Creates a new blank page within the supplied library
     *
     * @param library The library in which to create the page
     * @param pageName Filename of the page, such as "page.aspx"
     * @param title The display title of the page
     * @param pageLayoutType Layout type of the page to use
     */
    ClientSidePage.create = function (library, pageName, title, pageLayoutType) {
        if (pageLayoutType === void 0) { pageLayoutType = "Article"; }
        // see if file exists, if not create it
        return library.rootFolder.files.select("Name").filter("Name eq '" + pageName + "'").get().then(function (fs) {
            if (fs.length > 0) {
                throw new Error("A file with the name '" + pageName + "' already exists in the library '" + library.toUrl() + "'.");
            }
            // get our server relative path
            return library.rootFolder.select("ServerRelativePath").get().then(function (path) {
                var pageServerRelPath = Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["e" /* combinePaths */])("/", path.ServerRelativePath.DecodedUrl, pageName);
                // add the template file
                return library.rootFolder.files.addTemplateFile(pageServerRelPath, __WEBPACK_IMPORTED_MODULE_1__files__["e" /* TemplateFileType */].ClientSidePage).then(function (far) {
                    // get the item associated with the file
                    return far.file.getItem().then(function (i) {
                        // update the item to have the correct values to create the client side page
                        return i.update({
                            BannerImageUrl: {
                                Url: "/_layouts/15/images/sitepagethumbnail.png",
                            },
                            CanvasContent1: "",
                            ClientSideApplicationId: "b6917cb1-93a0-4b97-a84d-7cf49975d4ec",
                            ContentTypeId: "0x0101009D1CB255DA76424F860D91F20E6C4118",
                            PageLayoutType: pageLayoutType,
                            PromotedState: 0 /* NotPromoted */,
                            Title: title,
                        }).then(function (iar) { return new ClientSidePage(iar.item.file, iar.item.CommentsDisabled); });
                    });
                });
            });
        });
    };
    /**
     * Creates a new ClientSidePage instance from the provided html content string
     *
     * @param html HTML markup representing the page
     */
    ClientSidePage.fromFile = function (file) {
        var page = new ClientSidePage(file);
        return page.load().then(function (_) { return page; });
    };
    /**
     * Converts a json object to an escaped string appropriate for use in attributes when storing client-side controls
     *
     * @param json The json object to encode into a string
     */
    ClientSidePage.jsonToEscapedString = function (json) {
        return JSON.stringify(json)
            .replace(/"/g, "&quot;")
            .replace(/:/g, "&#58;")
            .replace(/{/g, "&#123;")
            .replace(/}/g, "&#125;")
            .replace(/\[/g, "\[")
            .replace(/\]/g, "\]")
            .replace(/\./g, "\.");
    };
    /**
     * Converts an escaped string from a client-side control attribute to a json object
     *
     * @param escapedString
     */
    ClientSidePage.escapedStringToJson = function (escapedString) {
        return JSON.parse(escapedString
            .replace(/&quot;/g, "\"")
            .replace(/&#58;/g, ":")
            .replace(/&#123;/g, "{")
            .replace(/&#125;/g, "}")
            .replace(/\\\[/g, "[")
            .replace(/\\\]/g, "]")
            .replace(/\\\./g, "."));
    };
    /**
     * Add a section to this page
     */
    ClientSidePage.prototype.addSection = function () {
        var section = new CanvasSection(this, getNextOrder(this.sections));
        this.sections.push(section);
        return section;
    };
    /**
     * Converts this page's content to html markup
     */
    ClientSidePage.prototype.toHtml = function () {
        // trigger reindex of the entire tree
        reindex(this.sections);
        var html = [];
        html.push("<div>");
        for (var i = 0; i < this.sections.length; i++) {
            html.push(this.sections[i].toHtml());
        }
        html.push("</div>");
        return html.join("");
    };
    /**
     * Loads this page instance's content from the supplied html
     *
     * @param html html string representing the page's content
     */
    ClientSidePage.prototype.fromHtml = function (html) {
        var _this = this;
        // reset sections
        this.sections = [];
        // gather our controls from the supplied html
        getBoundedDivMarkup(html, /<div\b[^>]*data-sp-canvascontrol[^>]*?>/i, function (markup) {
            // get the control type
            var ct = /controlType&quot;&#58;(\d*?),/i.exec(markup);
            // if no control type is present this is a column which we give type 0 to let us process it
            var controlType = ct == null || ct.length < 2 ? 0 : parseInt(ct[1], 10);
            var control = null;
            switch (controlType) {
                case 0:
                    // empty canvas column
                    control = new CanvasColumn(null, 0);
                    control.fromHtml(markup);
                    _this.mergeColumnToTree(control);
                    break;
                case 3:
                    // client side webpart
                    control = new ClientSideWebpart("");
                    control.fromHtml(markup);
                    _this.mergePartToTree(control);
                    break;
                case 4:
                    // client side text
                    control = new ClientSideText();
                    control.fromHtml(markup);
                    _this.mergePartToTree(control);
                    break;
            }
        });
        // refresh all the orders within the tree
        reindex(this.sections);
        return this;
    };
    /**
     * Loads this page's content from the server
     */
    ClientSidePage.prototype.load = function () {
        var _this = this;
        return this.getItem("CanvasContent1", "CommentsDisabled").then(function (item) {
            _this.fromHtml(item.CanvasContent1);
            _this.commentsDisabled = item.CommentsDisabled;
        });
    };
    /**
     * Persists the content changes (sections, columns, and controls)
     */
    ClientSidePage.prototype.save = function () {
        return this.updateProperties({ CanvasContent1: this.toHtml() });
    };
    /**
     * Enables comments on this page
     */
    ClientSidePage.prototype.enableComments = function () {
        var _this = this;
        return this.setCommentsOn(true).then(function (r) {
            _this.commentsDisabled = false;
            return r;
        });
    };
    /**
     * Disables comments on this page
     */
    ClientSidePage.prototype.disableComments = function () {
        var _this = this;
        return this.setCommentsOn(false).then(function (r) {
            _this.commentsDisabled = true;
            return r;
        });
    };
    /**
     * Finds a control by the specified instance id
     *
     * @param id Instance id of the control to find
     */
    ClientSidePage.prototype.findControlById = function (id) {
        return this.findControl(function (c) { return c.id === id; });
    };
    /**
     * Finds a control within this page's control tree using the supplied predicate
     *
     * @param predicate Takes a control and returns true or false, if true that control is returned by findControl
     */
    ClientSidePage.prototype.findControl = function (predicate) {
        // check all sections
        for (var i = 0; i < this.sections.length; i++) {
            // check all columns
            for (var j = 0; j < this.sections[i].columns.length; j++) {
                // check all controls
                for (var k = 0; k < this.sections[i].columns[j].controls.length; k++) {
                    // check to see if the predicate likes this control
                    if (predicate(this.sections[i].columns[j].controls[k])) {
                        return this.sections[i].columns[j].controls[k];
                    }
                }
            }
        }
        // we found nothing so give nothing back
        return null;
    };
    /**
     * Sets the comments flag for a page
     *
     * @param on If true comments are enabled, false they are disabled
     */
    ClientSidePage.prototype.setCommentsOn = function (on) {
        return this.getItem().then(function (i) {
            var updater = new __WEBPACK_IMPORTED_MODULE_2__items__["a" /* Item */](i, "SetCommentsDisabled(" + !on + ")");
            return updater.update({});
        });
    };
    /**
     * Merges the control into the tree of sections and columns for this page
     *
     * @param control The control to merge
     */
    ClientSidePage.prototype.mergePartToTree = function (control) {
        var section = null;
        var column = null;
        var sections = this.sections.filter(function (s) { return s.order === control.controlData.position.zoneIndex; });
        if (sections.length < 1) {
            section = new CanvasSection(this, control.controlData.position.zoneIndex);
            this.sections.push(section);
        }
        else {
            section = sections[0];
        }
        var columns = section.columns.filter(function (c) { return c.order === control.controlData.position.sectionIndex; });
        if (columns.length < 1) {
            column = new CanvasColumn(section, control.controlData.position.sectionIndex, control.controlData.position.sectionFactor);
            section.columns.push(column);
        }
        else {
            column = columns[0];
        }
        control.column = column;
        column.addControl(control);
    };
    /**
     * Merges the supplied column into the tree
     *
     * @param column Column to merge
     * @param position The position data for the column
     */
    ClientSidePage.prototype.mergeColumnToTree = function (column) {
        var section = null;
        var sections = this.sections.filter(function (s) { return s.order === column.controlData.position.zoneIndex; });
        if (sections.length < 1) {
            section = new CanvasSection(this, column.controlData.position.zoneIndex);
            this.sections.push(section);
        }
        else {
            section = sections[0];
        }
        column.section = section;
        section.columns.push(column);
    };
    /**
     * Updates the properties of the underlying ListItem associated with this ClientSidePage
     *
     * @param properties Set of properties to update
     * @param eTag Value used in the IF-Match header, by default "*"
     */
    ClientSidePage.prototype.updateProperties = function (properties, eTag) {
        if (eTag === void 0) { eTag = "*"; }
        return this.getItem().then(function (i) { return i.update(properties, eTag); });
    };
    return ClientSidePage;
}(__WEBPACK_IMPORTED_MODULE_1__files__["b" /* File */]));

var CanvasSection = /** @class */ (function () {
    function CanvasSection(page, order, columns) {
        if (columns === void 0) { columns = []; }
        this.page = page;
        this.order = order;
        this.columns = columns;
        this._memId = Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["j" /* getGUID */])();
    }
    Object.defineProperty(CanvasSection.prototype, "defaultColumn", {
        /**
         * Default column (this.columns[0]) for this section
         */
        get: function () {
            if (this.columns.length < 1) {
                this.addColumn(12);
            }
            return this.columns[0];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a new column to this section
     */
    CanvasSection.prototype.addColumn = function (factor) {
        var column = new CanvasColumn(this, getNextOrder(this.columns), factor);
        this.columns.push(column);
        return column;
    };
    /**
     * Adds a control to the default column for this section
     *
     * @param control Control to add to the default column
     */
    CanvasSection.prototype.addControl = function (control) {
        this.defaultColumn.addControl(control);
        return this;
    };
    CanvasSection.prototype.toHtml = function () {
        var html = [];
        for (var i = 0; i < this.columns.length; i++) {
            html.push(this.columns[i].toHtml());
        }
        return html.join("");
    };
    /**
     * Removes this section and all contained columns and controls from the collection
     */
    CanvasSection.prototype.remove = function () {
        var _this = this;
        this.page.sections = this.page.sections.filter(function (section) { return section._memId !== _this._memId; });
        reindex(this.page.sections);
    };
    return CanvasSection;
}());

var CanvasControl = /** @class */ (function () {
    function CanvasControl(controlType, dataVersion, column, order, id, controlData) {
        if (column === void 0) { column = null; }
        if (order === void 0) { order = 1; }
        if (id === void 0) { id = Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["j" /* getGUID */])(); }
        if (controlData === void 0) { controlData = null; }
        this.controlType = controlType;
        this.dataVersion = dataVersion;
        this.column = column;
        this.order = order;
        this.id = id;
        this.controlData = controlData;
    }
    Object.defineProperty(CanvasControl.prototype, "jsonData", {
        /**
         * Value of the control's "data-sp-controldata" attribute
         */
        get: function () {
            return ClientSidePage.jsonToEscapedString(this.getControlData());
        },
        enumerable: true,
        configurable: true
    });
    CanvasControl.prototype.fromHtml = function (html) {
        this.controlData = ClientSidePage.escapedStringToJson(Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["h" /* getAttrValueFromString */])(html, "data-sp-controldata"));
        this.dataVersion = Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["h" /* getAttrValueFromString */])(html, "data-sp-canvasdataversion");
        this.controlType = this.controlData.controlType;
        this.id = this.controlData.id;
    };
    return CanvasControl;
}());

var CanvasColumn = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](CanvasColumn, _super);
    function CanvasColumn(section, order, factor, controls, dataVersion) {
        if (factor === void 0) { factor = 12; }
        if (controls === void 0) { controls = []; }
        if (dataVersion === void 0) { dataVersion = "1.0"; }
        var _this = _super.call(this, 0, dataVersion) || this;
        _this.section = section;
        _this.order = order;
        _this.factor = factor;
        _this.controls = controls;
        return _this;
    }
    CanvasColumn.prototype.addControl = function (control) {
        control.column = this;
        this.controls.push(control);
        return this;
    };
    CanvasColumn.prototype.getControl = function (index) {
        return this.controls[index];
    };
    CanvasColumn.prototype.toHtml = function () {
        var html = [];
        if (this.controls.length < 1) {
            html.push("<div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"" + this.dataVersion + "\" data-sp-controldata=\"" + this.jsonData + "\"></div>");
        }
        else {
            for (var i = 0; i < this.controls.length; i++) {
                html.push(this.controls[i].toHtml(i + 1));
            }
        }
        return html.join("");
    };
    CanvasColumn.prototype.fromHtml = function (html) {
        _super.prototype.fromHtml.call(this, html);
        this.controlData = ClientSidePage.escapedStringToJson(Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["h" /* getAttrValueFromString */])(html, "data-sp-controldata"));
        this.factor = this.controlData.position.sectionFactor;
        this.order = this.controlData.position.sectionIndex;
    };
    CanvasColumn.prototype.getControlData = function () {
        return {
            displayMode: 2,
            position: {
                sectionFactor: this.factor,
                sectionIndex: this.order,
                zoneIndex: this.section.order,
            },
        };
    };
    /**
     * Removes this column and all contained controls from the collection
     */
    CanvasColumn.prototype.remove = function () {
        var _this = this;
        this.section.columns = this.section.columns.filter(function (column) { return column.id !== _this.id; });
        reindex(this.column.controls);
    };
    return CanvasColumn;
}(CanvasControl));

/**
 * Abstract class with shared functionality for parts
 */
var ClientSidePart = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ClientSidePart, _super);
    function ClientSidePart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Removes this column and all contained controls from the collection
     */
    ClientSidePart.prototype.remove = function () {
        var _this = this;
        this.column.controls = this.column.controls.filter(function (control) { return control.id !== _this.id; });
        reindex(this.column.controls);
    };
    return ClientSidePart;
}(CanvasControl));

var ClientSideText = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ClientSideText, _super);
    function ClientSideText(text) {
        if (text === void 0) { text = ""; }
        var _this = _super.call(this, 4, "1.0") || this;
        _this.text = text;
        return _this;
    }
    Object.defineProperty(ClientSideText.prototype, "text", {
        /**
         * The text markup of this control
         */
        get: function () {
            return this._text;
        },
        set: function (text) {
            if (!text.startsWith("<p>")) {
                text = "<p>" + text + "</p>";
            }
            this._text = text;
        },
        enumerable: true,
        configurable: true
    });
    ClientSideText.prototype.getControlData = function () {
        return {
            controlType: this.controlType,
            editorType: "CKEditor",
            id: this.id,
            position: {
                controlIndex: this.order,
                sectionFactor: this.column.factor,
                sectionIndex: this.column.order,
                zoneIndex: this.column.section.order,
            },
        };
    };
    ClientSideText.prototype.toHtml = function (index) {
        // set our order to the value passed in
        this.order = index;
        var html = [];
        html.push("<div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"" + this.dataVersion + "\" data-sp-controldata=\"" + this.jsonData + "\">");
        html.push("<div data-sp-rte=\"\">");
        html.push("" + this.text);
        html.push("</div>");
        html.push("</div>");
        return html.join("");
    };
    ClientSideText.prototype.fromHtml = function (html) {
        var _this = this;
        _super.prototype.fromHtml.call(this, html);
        this.text = "";
        getBoundedDivMarkup(html, /<div[^>]*data-sp-rte[^>]*>/i, function (s) {
            // now we need to grab the inner text between the divs
            var match = /<div[^>]*data-sp-rte[^>]*>(.*?)<\/div>$/i.exec(s);
            _this.text = match.length > 1 ? match[1] : "";
        });
    };
    return ClientSideText;
}(ClientSidePart));

var ClientSideWebpart = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ClientSideWebpart, _super);
    function ClientSideWebpart(title, description, propertieJson, webPartId, htmlProperties, serverProcessedContent, canvasDataVersion) {
        if (description === void 0) { description = ""; }
        if (propertieJson === void 0) { propertieJson = {}; }
        if (webPartId === void 0) { webPartId = ""; }
        if (htmlProperties === void 0) { htmlProperties = ""; }
        if (serverProcessedContent === void 0) { serverProcessedContent = null; }
        if (canvasDataVersion === void 0) { canvasDataVersion = "1.0"; }
        var _this = _super.call(this, 3, "1.0") || this;
        _this.title = title;
        _this.description = description;
        _this.propertieJson = propertieJson;
        _this.webPartId = webPartId;
        _this.htmlProperties = htmlProperties;
        _this.serverProcessedContent = serverProcessedContent;
        _this.canvasDataVersion = canvasDataVersion;
        return _this;
    }
    ClientSideWebpart.fromComponentDef = function (definition) {
        var part = new ClientSideWebpart("");
        part.import(definition);
        return part;
    };
    ClientSideWebpart.prototype.import = function (component) {
        this.webPartId = component.Id.replace(/^\{|\}$/g, "").toLowerCase();
        var manifest = JSON.parse(component.Manifest);
        this.title = manifest.preconfiguredEntries[0].title.default;
        this.description = manifest.preconfiguredEntries[0].description.default;
        this.dataVersion = "";
        this.propertieJson = this.parseJsonProperties(manifest.preconfiguredEntries[0].properties);
    };
    ClientSideWebpart.prototype.setProperties = function (properties) {
        this.propertieJson = Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["g" /* extend */])(this.propertieJson, properties);
        return this;
    };
    ClientSideWebpart.prototype.getProperties = function () {
        return this.propertieJson;
    };
    ClientSideWebpart.prototype.toHtml = function (index) {
        // set our order to the value passed in
        this.order = index;
        // will form the value of the data-sp-webpartdata attribute
        var data = {
            dataVersion: this.dataVersion,
            description: this.description,
            id: this.webPartId,
            instanceId: this.id,
            properties: this.propertieJson,
            serverProcessedContent: this.serverProcessedContent,
            title: this.title,
        };
        var html = [];
        html.push("<div data-sp-canvascontrol=\"\" data-sp-canvasdataversion=\"" + this.canvasDataVersion + "\" data-sp-controldata=\"" + this.jsonData + "\">");
        html.push("<div data-sp-webpart=\"\" data-sp-webpartdataversion=\"" + this.dataVersion + "\" data-sp-webpartdata=\"" + ClientSidePage.jsonToEscapedString(data) + "\">");
        html.push("<div data-sp-componentid>");
        html.push(this.webPartId);
        html.push("</div>");
        html.push("<div data-sp-htmlproperties=\"\">");
        html.push(this.renderHtmlProperties());
        html.push("</div>");
        html.push("</div>");
        html.push("</div>");
        return html.join("");
    };
    ClientSideWebpart.prototype.fromHtml = function (html) {
        _super.prototype.fromHtml.call(this, html);
        var webPartData = ClientSidePage.escapedStringToJson(Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["h" /* getAttrValueFromString */])(html, "data-sp-webpartdata"));
        this.title = webPartData.title;
        this.description = webPartData.description;
        this.webPartId = webPartData.id;
        this.canvasDataVersion = Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["h" /* getAttrValueFromString */])(html, "data-sp-canvasdataversion").replace(/\\\./, ".");
        this.dataVersion = Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["h" /* getAttrValueFromString */])(html, "data-sp-webpartdataversion").replace(/\\\./, ".");
        this.setProperties(webPartData.properties);
        if (typeof webPartData.serverProcessedContent !== "undefined") {
            this.serverProcessedContent = webPartData.serverProcessedContent;
        }
        // get our html properties
        var htmlProps = getBoundedDivMarkup(html, /<div\b[^>]*data-sp-htmlproperties[^>]*?>/i, function (markup) {
            return markup.replace(/^<div\b[^>]*data-sp-htmlproperties[^>]*?>/i, "").replace(/<\/div>$/i, "");
        });
        this.htmlProperties = htmlProps.length > 0 ? htmlProps[0] : "";
    };
    ClientSideWebpart.prototype.getControlData = function () {
        return {
            controlType: this.controlType,
            id: this.id,
            position: {
                controlIndex: this.order,
                sectionFactor: this.column.factor,
                sectionIndex: this.column.order,
                zoneIndex: this.column.section.order,
            },
            webPartId: this.webPartId,
        };
    };
    ClientSideWebpart.prototype.renderHtmlProperties = function () {
        var html = [];
        if (typeof this.serverProcessedContent === "undefined" || this.serverProcessedContent === null) {
            html.push(this.htmlProperties);
        }
        else if (typeof this.serverProcessedContent !== "undefined") {
            if (typeof this.serverProcessedContent.searchablePlainTexts !== "undefined") {
                var keys = Object.keys(this.serverProcessedContent.searchablePlainTexts);
                for (var i = 0; i < keys.length; i++) {
                    html.push("<div data-sp-prop-name=\"" + keys[i] + "\" data-sp-searchableplaintext=\"true\">");
                    html.push(this.serverProcessedContent.searchablePlainTexts[keys[i]]);
                    html.push("</div>");
                }
            }
            if (typeof this.serverProcessedContent.imageSources !== "undefined") {
                var keys = Object.keys(this.serverProcessedContent.imageSources);
                for (var i = 0; i < keys.length; i++) {
                    html.push("<img data-sp-prop-name=\"" + keys[i] + "\" src=\"" + this.serverProcessedContent.imageSources[keys[i]] + "\" />");
                }
            }
            if (typeof this.serverProcessedContent.links !== "undefined") {
                var keys = Object.keys(this.serverProcessedContent.links);
                for (var i = 0; i < keys.length; i++) {
                    html.push("<a data-sp-prop-name=\"" + keys[i] + "\" href=\"" + this.serverProcessedContent.links[keys[i]] + "\"></a>");
                }
            }
        }
        return html.join("");
    };
    ClientSideWebpart.prototype.parseJsonProperties = function (props) {
        // If the web part has the serverProcessedContent property then keep this one as it might be needed as input to render the web part HTML later on
        if (typeof props.webPartData !== "undefined" && typeof props.webPartData.serverProcessedContent !== "undefined") {
            this.serverProcessedContent = props.webPartData.serverProcessedContent;
        }
        else if (typeof props.serverProcessedContent !== "undefined") {
            this.serverProcessedContent = props.serverProcessedContent;
        }
        else {
            this.serverProcessedContent = null;
        }
        if (typeof props.webPartData !== "undefined" && typeof props.webPartData.properties !== "undefined") {
            return props.webPartData.properties;
        }
        else if (typeof props.properties !== "undefined") {
            return props.properties;
        }
        else {
            return props;
        }
    };
    return ClientSideWebpart;
}(ClientSidePart));

//# sourceMappingURL=clientsidepages.js.map

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RegionalSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstalledLanguages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TimeZone; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return TimeZones; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__odata__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pnp_common__ = __webpack_require__(2);




/**
 * Describes regional settings ODada object
 */
var RegionalSettings = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](RegionalSettings, _super);
    /**
     * Creates a new instance of the RegionalSettings class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this regional settings collection
     */
    function RegionalSettings(baseUrl, path) {
        if (path === void 0) { path = "regionalsettings"; }
        return _super.call(this, baseUrl, path) || this;
    }
    Object.defineProperty(RegionalSettings.prototype, "installedLanguages", {
        /**
         * Gets the collection of languages used in a server farm.
         */
        get: function () {
            return new InstalledLanguages(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegionalSettings.prototype, "globalInstalledLanguages", {
        /**
         * Gets the collection of language packs that are installed on the server.
         */
        get: function () {
            return new InstalledLanguages(this, "globalinstalledlanguages");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegionalSettings.prototype, "timeZone", {
        /**
         * Gets time zone
         */
        get: function () {
            return new TimeZone(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegionalSettings.prototype, "timeZones", {
        /**
         * Gets time zones
         */
        get: function () {
            return new TimeZones(this);
        },
        enumerable: true,
        configurable: true
    });
    return RegionalSettings;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

/**
 * Describes installed languages ODada queriable collection
 */
var InstalledLanguages = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](InstalledLanguages, _super);
    function InstalledLanguages(baseUrl, path) {
        if (path === void 0) { path = "installedlanguages"; }
        return _super.call(this, baseUrl, path) || this;
    }
    return InstalledLanguages;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes TimeZone ODada object
 */
var TimeZone = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](TimeZone, _super);
    function TimeZone(baseUrl, path) {
        if (path === void 0) { path = "timezone"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets an Local Time by UTC Time
     *
     * @param utcTime UTC Time as Date or ISO String
     */
    TimeZone.prototype.utcToLocalTime = function (utcTime) {
        var dateIsoString;
        if (typeof utcTime === "string") {
            dateIsoString = utcTime;
        }
        else {
            dateIsoString = utcTime.toISOString();
        }
        return this.clone(TimeZone, "utctolocaltime('" + dateIsoString + "')")
            .postCore()
            .then(function (res) { return res.hasOwnProperty("UTCToLocalTime") ? res.UTCToLocalTime : res; });
    };
    /**
     * Gets an UTC Time by Local Time
     *
     * @param localTime Local Time as Date or ISO String
     */
    TimeZone.prototype.localTimeToUTC = function (localTime) {
        var dateIsoString;
        if (typeof localTime === "string") {
            dateIsoString = localTime;
        }
        else {
            dateIsoString = Object(__WEBPACK_IMPORTED_MODULE_3__pnp_common__["f" /* dateAdd */])(localTime, "minute", localTime.getTimezoneOffset() * -1).toISOString();
        }
        return this.clone(TimeZone, "localtimetoutc('" + dateIsoString + "')")
            .postCore()
            .then(function (res) { return res.hasOwnProperty("LocalTimeToUTC") ? res.LocalTimeToUTC : res; });
    };
    return TimeZone;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

/**
 * Describes time zones queriable collection
 */
var TimeZones = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](TimeZones, _super);
    function TimeZones(baseUrl, path) {
        if (path === void 0) { path = "timezones"; }
        return _super.call(this, baseUrl, path) || this;
    }
    // https://msdn.microsoft.com/en-us/library/office/jj247008.aspx - timezones ids
    /**
     * Gets an TimeZone by id
     *
     * @param id The integer id of the timezone to retrieve
     */
    TimeZones.prototype.getById = function (id) {
        // do the post and merge the result into a TimeZone instance so the data and methods are available
        return this.clone(TimeZones, "GetById(" + id + ")").postCore({}, Object(__WEBPACK_IMPORTED_MODULE_2__odata__["c" /* spODataEntity */])(TimeZone));
    };
    return TimeZones;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

//# sourceMappingURL=regionalsettings.js.map

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SearchQueryBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Search; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SearchResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return SortDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ReorderingRuleMatchType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QueryPropertyValueType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SearchBuiltInSourceId; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pnp_common__ = __webpack_require__(2);



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
        this._query = Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(this._query, part);
        return this;
    };
    return SearchQueryBuilder;
}());

/**
 * Describes the search API
 *
 */
var Search = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Search, _super);
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
            request: Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

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
        var query = Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(this._query, {
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
                    enumerable: true,
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

/**
 * defines the SortDirection enum
 */
var SortDirection;
(function (SortDirection) {
    SortDirection[SortDirection["Ascending"] = 0] = "Ascending";
    SortDirection[SortDirection["Descending"] = 1] = "Descending";
    SortDirection[SortDirection["FQLFormula"] = 2] = "FQLFormula";
})(SortDirection || (SortDirection = {}));
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
})(ReorderingRuleMatchType || (ReorderingRuleMatchType = {}));
/**
 * Specifies the type value for the property
 */
var QueryPropertyValueType;
(function (QueryPropertyValueType) {
    QueryPropertyValueType[QueryPropertyValueType["None"] = 0] = "None";
    QueryPropertyValueType[QueryPropertyValueType["StringType"] = 1] = "StringType";
    QueryPropertyValueType[QueryPropertyValueType["Int32Type"] = 2] = "Int32Type";
    QueryPropertyValueType[QueryPropertyValueType["BooleanType"] = 3] = "BooleanType";
    QueryPropertyValueType[QueryPropertyValueType["StringArrayType"] = 4] = "StringArrayType";
    QueryPropertyValueType[QueryPropertyValueType["UnSupportedType"] = 5] = "UnSupportedType";
})(QueryPropertyValueType || (QueryPropertyValueType = {}));
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

//# sourceMappingURL=search.js.map

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchSuggest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SearchSuggestResult; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);


var SearchSuggest = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SearchSuggest, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

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

//# sourceMappingURL=searchsuggest.js.map

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SPBatch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pnp_odata__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pnp_logging__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__net_sphttpclient__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_splibconfig__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__exceptions__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_toabsoluteurl__ = __webpack_require__(16);








/**
 * Manages a batch of OData operations
 */
var SPBatch = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SPBatch, _super);
    function SPBatch(baseUrl) {
        var _this = _super.call(this) || this;
        _this.baseUrl = baseUrl;
        return _this;
    }
    /**
     * Parses the response from a batch request into an array of Response instances
     *
     * @param body Text body of the response from the batch request
     */
    SPBatch.ParseResponse = function (body) {
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
                                throw new __WEBPACK_IMPORTED_MODULE_6__exceptions__["c" /* SPBatchParseException */]("Invalid response, line " + i);
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
                            throw new __WEBPACK_IMPORTED_MODULE_6__exceptions__["c" /* SPBatchParseException */]("Invalid status, line " + i);
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
                reject(new __WEBPACK_IMPORTED_MODULE_6__exceptions__["c" /* SPBatchParseException */]("Unexpected end of input"));
            }
            resolve(responses);
        });
    };
    SPBatch.prototype.executeImpl = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_3__pnp_logging__["a" /* Logger */].write("[" + this.batchId + "] (" + (new Date()).getTime() + ") Executing batch with " + this.requests.length + " requests.", 1 /* Info */);
        // if we don't have any requests, don't bother sending anything
        // this could be due to caching further upstream, or just an empty batch
        if (this.requests.length < 1) {
            __WEBPACK_IMPORTED_MODULE_3__pnp_logging__["a" /* Logger */].write("Resolving empty batch.", 1 /* Info */);
            return Promise.resolve();
        }
        // creating the client here allows the url to be populated for nodejs client as well as potentially
        // any other hacks needed for other types of clients. Essentially allows the absoluteRequestUrl
        // below to be correct
        var client = new __WEBPACK_IMPORTED_MODULE_4__net_sphttpclient__["a" /* SPHttpClient */]();
        // due to timing we need to get the absolute url here so we can use it for all the individual requests
        // and for sending the entire batch
        return Object(__WEBPACK_IMPORTED_MODULE_7__utils_toabsoluteurl__["a" /* toAbsoluteUrl */])(this.baseUrl).then(function (absoluteRequestUrl) {
            // build all the requests, send them, pipe results in order to parsers
            var batchBody = [];
            var currentChangeSetId = "";
            for (var i = 0; i < _this.requests.length; i++) {
                var reqInfo = _this.requests[i];
                if (reqInfo.method === "GET") {
                    if (currentChangeSetId.length > 0) {
                        // end an existing change set
                        batchBody.push("--changeset_" + currentChangeSetId + "--\n\n");
                        currentChangeSetId = "";
                    }
                    batchBody.push("--batch_" + _this.batchId + "\n");
                }
                else {
                    if (currentChangeSetId.length < 1) {
                        // start new change set
                        currentChangeSetId = Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["j" /* getGUID */])();
                        batchBody.push("--batch_" + _this.batchId + "\n");
                        batchBody.push("Content-Type: multipart/mixed; boundary=\"changeset_" + currentChangeSetId + "\"\n\n");
                    }
                    batchBody.push("--changeset_" + currentChangeSetId + "\n");
                }
                // common batch part prefix
                batchBody.push("Content-Type: application/http\n");
                batchBody.push("Content-Transfer-Encoding: binary\n\n");
                var headers = new Headers();
                // this is the url of the individual request within the batch
                var url = Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["l" /* isUrlAbsolute */])(reqInfo.url) ? reqInfo.url : Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["e" /* combinePaths */])(absoluteRequestUrl, reqInfo.url);
                __WEBPACK_IMPORTED_MODULE_3__pnp_logging__["a" /* Logger */].write("[" + _this.batchId + "] (" + (new Date()).getTime() + ") Adding request " + reqInfo.method + " " + url + " to batch.", 0 /* Verbose */);
                if (reqInfo.method !== "GET") {
                    var method = reqInfo.method;
                    var castHeaders = reqInfo.options.headers;
                    if (reqInfo.hasOwnProperty("options") && reqInfo.options.hasOwnProperty("headers") && typeof castHeaders["X-HTTP-Method"] !== "undefined") {
                        method = castHeaders["X-HTTP-Method"];
                        delete castHeaders["X-HTTP-Method"];
                    }
                    batchBody.push(method + " " + url + " HTTP/1.1\n");
                    headers.set("Content-Type", "application/json;odata=verbose;charset=utf-8");
                }
                else {
                    batchBody.push(reqInfo.method + " " + url + " HTTP/1.1\n");
                }
                // merge global config headers
                Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["m" /* mergeHeaders */])(headers, __WEBPACK_IMPORTED_MODULE_5__config_splibconfig__["a" /* SPRuntimeConfig */].headers);
                // merge per-request headers
                if (reqInfo.options) {
                    Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["m" /* mergeHeaders */])(headers, reqInfo.options.headers);
                }
                // lastly we apply any default headers we need that may not exist
                if (!headers.has("Accept")) {
                    headers.append("Accept", "application/json");
                }
                if (!headers.has("Content-Type")) {
                    headers.append("Content-Type", "application/json;odata=verbose;charset=utf-8");
                }
                if (!headers.has("X-ClientService-ClientTag")) {
                    headers.append("X-ClientService-ClientTag", "PnPCoreJS:@pnp-1.1.2-1");
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
            batchBody.push("--batch_" + _this.batchId + "--\n");
            var batchOptions = {
                "body": batchBody.join(""),
                "headers": {
                    "Content-Type": "multipart/mixed; boundary=batch_" + _this.batchId,
                },
                "method": "POST",
            };
            __WEBPACK_IMPORTED_MODULE_3__pnp_logging__["a" /* Logger */].write("[" + _this.batchId + "] (" + (new Date()).getTime() + ") Sending batch request.", 1 /* Info */);
            return client.fetch(Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["e" /* combinePaths */])(absoluteRequestUrl, "/_api/$batch"), batchOptions)
                .then(function (r) { return r.text(); })
                .then(SPBatch.ParseResponse)
                .then(function (responses) {
                if (responses.length !== _this.requests.length) {
                    throw new __WEBPACK_IMPORTED_MODULE_6__exceptions__["c" /* SPBatchParseException */]("Could not properly parse responses to match requests in batch.");
                }
                __WEBPACK_IMPORTED_MODULE_3__pnp_logging__["a" /* Logger */].write("[" + _this.batchId + "] (" + (new Date()).getTime() + ") Resolving batched requests.", 1 /* Info */);
                return responses.reduce(function (chain, response, index) {
                    var request = _this.requests[index];
                    __WEBPACK_IMPORTED_MODULE_3__pnp_logging__["a" /* Logger */].write("[" + request.id + "] (" + (new Date()).getTime() + ") Resolving request in batch " + _this.batchId + ".", 1 /* Info */);
                    return chain.then(function (_) { return request.parser.parse(response).then(request.resolve).catch(request.reject); });
                }, Promise.resolve());
            });
        });
    };
    return SPBatch;
}(__WEBPACK_IMPORTED_MODULE_1__pnp_odata__["d" /* ODataBatch */]));

//# sourceMappingURL=batch.js.map

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Features; });
/* unused harmony export Feature */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);


/**
 * Describes a collection of List objects
 *
 */
var Features = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Features, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

var Feature = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Feature, _super);
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
        return idGet.get().then(function (feature) {
            var promise = _this.getParent(Features, _this.parentUrl, "", _this.batch).remove(feature.DefinitionId, force);
            removeDependency();
            return promise;
        });
    };
    return Feature;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

//# sourceMappingURL=features.js.map

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProfileQuery; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pnp_common__ = __webpack_require__(2);



var UserProfileQuery = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](UserProfileQuery, _super);
    /**
     * Creates a new instance of the UserProfileQuery class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this user profile query
     */
    function UserProfileQuery(baseUrl, path) {
        if (path === void 0) { path = "_api/sp.userprofiles.peoplemanager"; }
        var _this = _super.call(this, baseUrl, path) || this;
        _this.clientPeoplePickerQuery = new ClientPeoplePickerQuery(baseUrl);
        _this.profileLoader = new ProfileLoader(baseUrl);
        return _this;
    }
    Object.defineProperty(UserProfileQuery.prototype, "editProfileLink", {
        /**
         * The url of the edit profile page for the current user
         */
        get: function () {
            return this.clone(UserProfileQuery, "EditProfileLink").get();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserProfileQuery.prototype, "isMyPeopleListPublic", {
        /**
         * A boolean value that indicates whether the current user's "People I'm Following" list is public
         */
        get: function () {
            return this.clone(UserProfileQuery, "IsMyPeopleListPublic").get();
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
            return new __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */](this, "getmyfollowers");
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
            Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["p" /* readBlobAsArrayBuffer */])(profilePicSource).then(function (buffer) {
                var request = new UserProfileQuery(_this, "setmyprofilepicture");
                request.postCore({
                    body: String.fromCharCode.apply(null, new Uint16Array(buffer)),
                }).then(function (_) { return resolve(); });
            }).catch(function (e) { return reject(e); });
        });
    };
    /**
     * Sets single value User Profile property
     *
     * @param accountName The account name of the user
     * @param propertyName Property name
     * @param propertyValue Property value
     */
    UserProfileQuery.prototype.setSingleValueProfileProperty = function (accountName, propertyName, propertyValue) {
        var postBody = JSON.stringify({
            accountName: accountName,
            propertyName: propertyName,
            propertyValue: propertyValue,
        });
        return this.clone(UserProfileQuery, "SetSingleValueProfileProperty")
            .postCore({ body: postBody });
    };
    /**
     * Sets multi valued User Profile property
     *
     * @param accountName The account name of the user
     * @param propertyName Property name
     * @param propertyValues Property values
     */
    UserProfileQuery.prototype.setMultiValuedProfileProperty = function (accountName, propertyName, propertyValues) {
        var postBody = JSON.stringify({
            accountName: accountName,
            propertyName: propertyName,
            propertyValues: propertyValues,
        });
        return this.clone(UserProfileQuery, "SetMultiValuedProfileProperty")
            .postCore({ body: postBody });
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
    /**
     * Resolves user or group using specified query parameters
     *
     * @param queryParams The query parameters used to perform resolve
     */
    UserProfileQuery.prototype.clientPeoplePickerResolveUser = function (queryParams) {
        return this.clientPeoplePickerQuery.clientPeoplePickerResolveUser(queryParams);
    };
    /**
     * Searches for users or groups using specified query parameters
     *
     * @param queryParams The query parameters used to perform search
     */
    UserProfileQuery.prototype.clientPeoplePickerSearchUser = function (queryParams) {
        return this.clientPeoplePickerQuery.clientPeoplePickerSearchUser(queryParams);
    };
    return UserProfileQuery;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

var ProfileLoader = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ProfileLoader, _super);
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
            return q.postCore();
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
            return this.clone(ProfileLoader, "getuserprofile").postCore();
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["a" /* SharePointQueryable */]));
var ClientPeoplePickerQuery = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ClientPeoplePickerQuery, _super);
    /**
     * Creates a new instance of the PeoplePickerQuery class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this people picker query
     */
    function ClientPeoplePickerQuery(baseUrl, path) {
        if (path === void 0) { path = "_api/sp.ui.applicationpages.clientpeoplepickerwebserviceinterface"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Resolves user or group using specified query parameters
     *
     * @param queryParams The query parameters used to perform resolve
     */
    ClientPeoplePickerQuery.prototype.clientPeoplePickerResolveUser = function (queryParams) {
        var q = this.clone(ClientPeoplePickerQuery, null);
        q.concat(".clientpeoplepickerresolveuser");
        return q.postCore({
            body: this.createClientPeoplePickerQueryParametersRequestBody(queryParams),
        })
            .then(function (res) {
            if (typeof res === "object") {
                return res.ClientPeoplePickerResolveUser;
            }
            return res;
        })
            .then(JSON.parse);
    };
    /**
     * Searches for users or groups using specified query parameters
     *
     * @param queryParams The query parameters used to perform search
     */
    ClientPeoplePickerQuery.prototype.clientPeoplePickerSearchUser = function (queryParams) {
        var q = this.clone(ClientPeoplePickerQuery, null);
        q.concat(".clientpeoplepickersearchuser");
        return q.postCore({
            body: this.createClientPeoplePickerQueryParametersRequestBody(queryParams),
        })
            .then(function (res) {
            if (typeof res === "object") {
                return res.ClientPeoplePickerSearchUser;
            }
            return res;
        })
            .then(JSON.parse);
    };
    /**
     * Creates ClientPeoplePickerQueryParameters request body
     *
     * @param queryParams The query parameters to create request body
     */
    ClientPeoplePickerQuery.prototype.createClientPeoplePickerQueryParametersRequestBody = function (queryParams) {
        return JSON.stringify({
            "queryParams": Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({
                "__metadata": { "type": "SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters" },
            }, queryParams),
        });
    };
    return ClientPeoplePickerQuery;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["a" /* SharePointQueryable */]));
//# sourceMappingURL=userprofiles.js.map

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SocialQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MySocialQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SocialActorType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SocialActorTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SocialFollowResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SocialStatusCode; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pnp_common__ = __webpack_require__(2);



/**
 * Exposes social following methods
 */
var SocialQuery = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](SocialQuery, _super);
    /**
     * Creates a new instance of the SocialQuery class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this social query
     */
    function SocialQuery(baseUrl, path) {
        if (path === void 0) { path = "_api/social.following"; }
        return _super.call(this, baseUrl, path) || this;
    }
    Object.defineProperty(SocialQuery.prototype, "my", {
        get: function () {
            return new MySocialQuery(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets a URI to a site that lists the current user's followed sites.
     */
    SocialQuery.prototype.getFollowedSitesUri = function () {
        return this.clone(SocialQuery, "FollowedSitesUri").get().then(function (r) {
            return r.FollowedSitesUri || r;
        });
    };
    /**
     * Gets a URI to a site that lists the current user's followed documents.
     */
    SocialQuery.prototype.getFollowedDocumentsUri = function () {
        return this.clone(SocialQuery, "FollowedDocumentsUri").get().then(function (r) {
            return r.FollowedDocumentsUri || r;
        });
    };
    /**
     * Makes the current user start following a user, document, site, or tag
     *
     * @param actorInfo The actor to start following
     */
    SocialQuery.prototype.follow = function (actorInfo) {
        return this.clone(SocialQuery, "follow").postCore({ body: this.createSocialActorInfoRequestBody(actorInfo) });
    };
    /**
     * Indicates whether the current user is following a specified user, document, site, or tag
     *
     * @param actorInfo The actor to find the following status for
     */
    SocialQuery.prototype.isFollowed = function (actorInfo) {
        return this.clone(SocialQuery, "isfollowed").postCore({ body: this.createSocialActorInfoRequestBody(actorInfo) });
    };
    /**
     * Makes the current user stop following a user, document, site, or tag
     *
     * @param actorInfo The actor to stop following
     */
    SocialQuery.prototype.stopFollowing = function (actorInfo) {
        return this.clone(SocialQuery, "stopfollowing").postCore({ body: this.createSocialActorInfoRequestBody(actorInfo) });
    };
    /**
     * Creates SocialActorInfo request body
     *
     * @param actorInfo The actor to create request body
     */
    SocialQuery.prototype.createSocialActorInfoRequestBody = function (actorInfo) {
        return JSON.stringify({
            "actor": Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({
                Id: null,
                "__metadata": { "type": "SP.Social.SocialActorInfo" },
            }, actorInfo),
        });
    };
    return SocialQuery;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

var MySocialQuery = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](MySocialQuery, _super);
    /**
     * Creates a new instance of the SocialQuery class
     *
     * @param baseUrl The url or SharePointQueryable which forms the parent of this social query
     */
    function MySocialQuery(baseUrl, path) {
        if (path === void 0) { path = "my"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets users, documents, sites, and tags that the current user is following.
     *
     * @param types Bitwise set of SocialActorTypes to retrieve
     */
    MySocialQuery.prototype.followed = function (types) {
        return this.clone(MySocialQuery, "followed(types=" + types + ")").get().then(function (r) {
            return r.hasOwnProperty("Followed") ? r.Followed.results : r;
        });
    };
    /**
     * Gets the count of users, documents, sites, and tags that the current user is following.
     *
     * @param types Bitwise set of SocialActorTypes to retrieve
     */
    MySocialQuery.prototype.followedCount = function (types) {
        return this.clone(MySocialQuery, "followedcount(types=" + types + ")").get().then(function (r) {
            return r.FollowedCount || r;
        });
    };
    /**
     * Gets the users who are following the current user.
     */
    MySocialQuery.prototype.followers = function () {
        return this.clone(MySocialQuery, "followers").get().then(function (r) {
            return r.hasOwnProperty("Followers") ? r.Followers.results : r;
        });
    };
    /**
     * Gets users who the current user might want to follow.
     */
    MySocialQuery.prototype.suggestions = function () {
        return this.clone(MySocialQuery, "suggestions").get().then(function (r) {
            return r.hasOwnProperty("Suggestions") ? r.Suggestions.results : r;
        });
    };
    return MySocialQuery;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

/**
 * Social actor type
 *
 */
var SocialActorType;
(function (SocialActorType) {
    SocialActorType[SocialActorType["User"] = 0] = "User";
    SocialActorType[SocialActorType["Document"] = 1] = "Document";
    SocialActorType[SocialActorType["Site"] = 2] = "Site";
    SocialActorType[SocialActorType["Tag"] = 3] = "Tag";
})(SocialActorType || (SocialActorType = {}));
/**
 * Social actor type
 *
 */
/* tslint:disable:no-bitwise */
var SocialActorTypes;
(function (SocialActorTypes) {
    SocialActorTypes[SocialActorTypes["None"] = 0] = "None";
    SocialActorTypes[SocialActorTypes["User"] = 1] = "User";
    SocialActorTypes[SocialActorTypes["Document"] = 2] = "Document";
    SocialActorTypes[SocialActorTypes["Site"] = 4] = "Site";
    SocialActorTypes[SocialActorTypes["Tag"] = 8] = "Tag";
    /**
     * The set excludes documents and sites that do not have feeds.
     */
    SocialActorTypes[SocialActorTypes["ExcludeContentWithoutFeeds"] = 268435456] = "ExcludeContentWithoutFeeds";
    /**
     * The set includes group sites
     */
    SocialActorTypes[SocialActorTypes["IncludeGroupsSites"] = 536870912] = "IncludeGroupsSites";
    /**
     * The set includes only items created within the last 24 hours
     */
    SocialActorTypes[SocialActorTypes["WithinLast24Hours"] = 1073741824] = "WithinLast24Hours";
})(SocialActorTypes || (SocialActorTypes = {}));
/* tslint:enable */
/**
 * Result from following
 *
 */
var SocialFollowResult;
(function (SocialFollowResult) {
    SocialFollowResult[SocialFollowResult["Ok"] = 0] = "Ok";
    SocialFollowResult[SocialFollowResult["AlreadyFollowing"] = 1] = "AlreadyFollowing";
    SocialFollowResult[SocialFollowResult["LimitReached"] = 2] = "LimitReached";
    SocialFollowResult[SocialFollowResult["InternalError"] = 3] = "InternalError";
})(SocialFollowResult || (SocialFollowResult = {}));
/**
 * Specifies an exception or status code.
 */
var SocialStatusCode;
(function (SocialStatusCode) {
    /**
     * The operation completed successfully
     */
    SocialStatusCode[SocialStatusCode["OK"] = 0] = "OK";
    /**
     * The request is invalid.
     */
    SocialStatusCode[SocialStatusCode["InvalidRequest"] = 1] = "InvalidRequest";
    /**
     *  The current user is not authorized to perform the operation.
     */
    SocialStatusCode[SocialStatusCode["AccessDenied"] = 2] = "AccessDenied";
    /**
     * The target of the operation was not found.
     */
    SocialStatusCode[SocialStatusCode["ItemNotFound"] = 3] = "ItemNotFound";
    /**
     * The operation is invalid for the target's current state.
     */
    SocialStatusCode[SocialStatusCode["InvalidOperation"] = 4] = "InvalidOperation";
    /**
     * The operation completed without modifying the target.
     */
    SocialStatusCode[SocialStatusCode["ItemNotModified"] = 5] = "ItemNotModified";
    /**
     * The operation failed because an internal error occurred.
     */
    SocialStatusCode[SocialStatusCode["InternalError"] = 6] = "InternalError";
    /**
     * The operation failed because the server could not access the distributed cache.
     */
    SocialStatusCode[SocialStatusCode["CacheReadError"] = 7] = "CacheReadError";
    /**
     * The operation succeeded but the server could not update the distributed cache.
     */
    SocialStatusCode[SocialStatusCode["CacheUpdateError"] = 8] = "CacheUpdateError";
    /**
     * No personal site exists for the current user, and no further information is available.
     */
    SocialStatusCode[SocialStatusCode["PersonalSiteNotFound"] = 9] = "PersonalSiteNotFound";
    /**
     * No personal site exists for the current user, and a previous attempt to create one failed.
     */
    SocialStatusCode[SocialStatusCode["FailedToCreatePersonalSite"] = 10] = "FailedToCreatePersonalSite";
    /**
     * No personal site exists for the current user, and a previous attempt to create one was not authorized.
     */
    SocialStatusCode[SocialStatusCode["NotAuthorizedToCreatePersonalSite"] = 11] = "NotAuthorizedToCreatePersonalSite";
    /**
     * No personal site exists for the current user, and no attempt should be made to create one.
     */
    SocialStatusCode[SocialStatusCode["CannotCreatePersonalSite"] = 12] = "CannotCreatePersonalSite";
    /**
     * The operation was rejected because an internal limit had been reached.
     */
    SocialStatusCode[SocialStatusCode["LimitReached"] = 13] = "LimitReached";
    /**
     * The operation failed because an error occurred during the processing of the specified attachment.
     */
    SocialStatusCode[SocialStatusCode["AttachmentError"] = 14] = "AttachmentError";
    /**
     * The operation succeeded with recoverable errors; the returned data is incomplete.
     */
    SocialStatusCode[SocialStatusCode["PartialData"] = 15] = "PartialData";
    /**
     * A required SharePoint feature is not enabled.
     */
    SocialStatusCode[SocialStatusCode["FeatureDisabled"] = 16] = "FeatureDisabled";
    /**
     * The site's storage quota has been exceeded.
     */
    SocialStatusCode[SocialStatusCode["StorageQuotaExceeded"] = 17] = "StorageQuotaExceeded";
    /**
     * The operation failed because the server could not access the database.
     */
    SocialStatusCode[SocialStatusCode["DatabaseError"] = 18] = "DatabaseError";
})(SocialStatusCode || (SocialStatusCode = {}));
//# sourceMappingURL=social.js.map

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilityMethod; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__files__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__odata__ = __webpack_require__(3);





/**
 * Allows for calling of the static SP.Utilities.Utility methods by supplying the method name
 */
var UtilityMethod = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](UtilityMethod, _super);
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
        return this.postCore({
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
            params.properties = Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(params.properties, {
                To: { results: props.To },
            });
        }
        if (props.CC && props.CC.length > 0) {
            params.properties = Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(params.properties, {
                CC: { results: props.CC },
            });
        }
        if (props.BCC && props.BCC.length > 0) {
            params.properties = Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(params.properties, {
                BCC: { results: props.BCC },
            });
        }
        if (props.AdditionalHeaders) {
            params.properties = Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])(params.properties, {
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
                file: new __WEBPACK_IMPORTED_MODULE_3__files__["b" /* File */](Object(__WEBPACK_IMPORTED_MODULE_4__odata__["a" /* spExtractODataId */])(r)),
            };
        });
    };
    return UtilityMethod;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["a" /* SharePointQueryable */]));

//# sourceMappingURL=utilities.js.map

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__odata__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_46", function() { return __WEBPACK_IMPORTED_MODULE_0__odata__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_47", function() { return __WEBPACK_IMPORTED_MODULE_0__odata__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_48", function() { return __WEBPACK_IMPORTED_MODULE_0__odata__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_12", function() { return __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_14", function() { return __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_13", function() { return __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sharepointqueryablesecurable__ = __webpack_require__(17);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_15", function() { return __WEBPACK_IMPORTED_MODULE_2__sharepointqueryablesecurable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sharepointqueryableshareable__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "A", function() { return __WEBPACK_IMPORTED_MODULE_3__sharepointqueryableshareable__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_16", function() { return __WEBPACK_IMPORTED_MODULE_3__sharepointqueryableshareable__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_17", function() { return __WEBPACK_IMPORTED_MODULE_3__sharepointqueryableshareable__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_18", function() { return __WEBPACK_IMPORTED_MODULE_3__sharepointqueryableshareable__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_19", function() { return __WEBPACK_IMPORTED_MODULE_3__sharepointqueryableshareable__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_20", function() { return __WEBPACK_IMPORTED_MODULE_3__sharepointqueryableshareable__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__appcatalog__ = __webpack_require__(29);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__appcatalog__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__appcatalog__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__clientsidepages__ = __webpack_require__(32);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__clientsidepages__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_5__clientsidepages__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_5__clientsidepages__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_5__clientsidepages__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_5__clientsidepages__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_5__clientsidepages__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_5__clientsidepages__["g"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "V", function() { return __WEBPACK_IMPORTED_MODULE_5__clientsidepages__["h"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__comments__ = __webpack_require__(31);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_6__comments__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_6__comments__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "_0", function() { return __WEBPACK_IMPORTED_MODULE_6__comments__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__contenttypes__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_7__contenttypes__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_7__contenttypes__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return __WEBPACK_IMPORTED_MODULE_7__contenttypes__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "v", function() { return __WEBPACK_IMPORTED_MODULE_7__contenttypes__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__fields__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "t", function() { return __WEBPACK_IMPORTED_MODULE_8__fields__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "y", function() { return __WEBPACK_IMPORTED_MODULE_8__fields__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__files__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_9__files__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_43", function() { return __WEBPACK_IMPORTED_MODULE_9__files__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return __WEBPACK_IMPORTED_MODULE_9__files__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_32", function() { return __WEBPACK_IMPORTED_MODULE_9__files__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "z", function() { return __WEBPACK_IMPORTED_MODULE_9__files__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "B", function() { return __WEBPACK_IMPORTED_MODULE_9__files__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__folders__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "C", function() { return __WEBPACK_IMPORTED_MODULE_10__folders__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "D", function() { return __WEBPACK_IMPORTED_MODULE_10__folders__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__net_sphttpclient__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_3", function() { return __WEBPACK_IMPORTED_MODULE_11__net_sphttpclient__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__items__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "F", function() { return __WEBPACK_IMPORTED_MODULE_12__items__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "I", function() { return __WEBPACK_IMPORTED_MODULE_12__items__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "G", function() { return __WEBPACK_IMPORTED_MODULE_12__items__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return __WEBPACK_IMPORTED_MODULE_12__items__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "R", function() { return __WEBPACK_IMPORTED_MODULE_12__items__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__navigation__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "O", function() { return __WEBPACK_IMPORTED_MODULE_13__navigation__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "N", function() { return __WEBPACK_IMPORTED_MODULE_13__navigation__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "P", function() { return __WEBPACK_IMPORTED_MODULE_13__navigation__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__lists__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "J", function() { return __WEBPACK_IMPORTED_MODULE_14__lists__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "K", function() { return __WEBPACK_IMPORTED_MODULE_14__lists__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__regionalsettings__ = __webpack_require__(33);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "X", function() { return __WEBPACK_IMPORTED_MODULE_15__regionalsettings__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "E", function() { return __WEBPACK_IMPORTED_MODULE_15__regionalsettings__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_33", function() { return __WEBPACK_IMPORTED_MODULE_15__regionalsettings__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_34", function() { return __WEBPACK_IMPORTED_MODULE_15__regionalsettings__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__rest__ = __webpack_require__(48);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_45", function() { return __WEBPACK_IMPORTED_MODULE_16__rest__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_4", function() { return __WEBPACK_IMPORTED_MODULE_16__rest__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__roles__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_1", function() { return __WEBPACK_IMPORTED_MODULE_17__roles__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__search__ = __webpack_require__(34);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_6", function() { return __WEBPACK_IMPORTED_MODULE_18__search__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_8", function() { return __WEBPACK_IMPORTED_MODULE_18__search__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_9", function() { return __WEBPACK_IMPORTED_MODULE_18__search__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_31", function() { return __WEBPACK_IMPORTED_MODULE_18__search__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Z", function() { return __WEBPACK_IMPORTED_MODULE_18__search__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "W", function() { return __WEBPACK_IMPORTED_MODULE_18__search__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_7", function() { return __WEBPACK_IMPORTED_MODULE_18__search__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__searchsuggest__ = __webpack_require__(35);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_10", function() { return __WEBPACK_IMPORTED_MODULE_19__searchsuggest__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_11", function() { return __WEBPACK_IMPORTED_MODULE_19__searchsuggest__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__site__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_25", function() { return __WEBPACK_IMPORTED_MODULE_20__site__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__social__ = __webpack_require__(39);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "M", function() { return __WEBPACK_IMPORTED_MODULE_21__social__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "_26", function() { return __WEBPACK_IMPORTED_MODULE_21__social__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "_27", function() { return __WEBPACK_IMPORTED_MODULE_21__social__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "_28", function() { return __WEBPACK_IMPORTED_MODULE_21__social__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "_29", function() { return __WEBPACK_IMPORTED_MODULE_21__social__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "_30", function() { return __WEBPACK_IMPORTED_MODULE_21__social__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__types__ = __webpack_require__(13);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["e"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "w", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["f"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "x", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["g"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "Q", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["h"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "S", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["i"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "T", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["j"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "U", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["k"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "Y", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["l"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "_2", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["m"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "_5", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["n"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "_21", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["o"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "_22", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["p"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "_23", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["q"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "_24", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["r"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "_35", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["s"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "_36", function() { return __WEBPACK_IMPORTED_MODULE_22__types__["t"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__userprofiles__ = __webpack_require__(38);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_37", function() { return __WEBPACK_IMPORTED_MODULE_23__userprofiles__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__utils_toabsoluteurl__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_49", function() { return __WEBPACK_IMPORTED_MODULE_24__utils_toabsoluteurl__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__utils_extractweburl__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_44", function() { return __WEBPACK_IMPORTED_MODULE_25__utils_extractweburl__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__utilities__ = __webpack_require__(40);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_38", function() { return __WEBPACK_IMPORTED_MODULE_26__utilities__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__webparts__ = __webpack_require__(30);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_42", function() { return __WEBPACK_IMPORTED_MODULE_27__webparts__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_41", function() { return __WEBPACK_IMPORTED_MODULE_27__webparts__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_40", function() { return __WEBPACK_IMPORTED_MODULE_27__webparts__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__webs__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "_39", function() { return __WEBPACK_IMPORTED_MODULE_28__webs__["a"]; });





























//# sourceMappingURL=sp.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports) {

//----------------------------------------------------------------------
// AdalJS v1.0.17
// @preserve Copyright (c) Microsoft Open Technologies, Inc.
// All Rights Reserved
// Apache License 2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//id
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//----------------------------------------------------------------------

var AuthenticationContext = (function () {

    'use strict';

    /**
     * Configuration options for Authentication Context.
     * @class config
     *  @property {string} tenant - Your target tenant.
     *  @property {string} clientId - Client ID assigned to your app by Azure Active Directory.
     *  @property {string} redirectUri - Endpoint at which you expect to receive tokens.Defaults to `window.location.href`.
     *  @property {string} instance - Azure Active Directory Instance.Defaults to `https://login.microsoftonline.com/`.
     *  @property {Array} endpoints - Collection of {Endpoint-ResourceId} used for automatically attaching tokens in webApi calls.
     *  @property {Boolean} popUp - Set this to true to enable login in a popup winodow instead of a full redirect.Defaults to `false`.
     *  @property {string} localLoginUrl - Set this to redirect the user to a custom login page.
     *  @property {function} displayCall - User defined function of handling the navigation to Azure AD authorization endpoint in case of login. Defaults to 'null'.
     *  @property {string} postLogoutRedirectUri - Redirects the user to postLogoutRedirectUri after logout. Defaults is 'redirectUri'.
     *  @property {string} cacheLocation - Sets browser storage to either 'localStorage' or sessionStorage'. Defaults to 'sessionStorage'.
     *  @property {Array.<string>} anonymousEndpoints Array of keywords or URI's. Adal will not attach a token to outgoing requests that have these keywords or uri. Defaults to 'null'.
     *  @property {number} expireOffsetSeconds If the cached token is about to be expired in the expireOffsetSeconds (in seconds), Adal will renew the token instead of using the cached token. Defaults to 300 seconds.
     *  @property {string} correlationId Unique identifier used to map the request with the response. Defaults to RFC4122 version 4 guid (128 bits).
     *  @property {number} loadFrameTimeout The number of milliseconds of inactivity before a token renewal response from AAD should be considered timed out.
     */

    /**
     * Creates a new AuthenticationContext object.
     * @constructor
     * @param {config}  config               Configuration options for AuthenticationContext
     */

    AuthenticationContext = function (config) {
        /**
         * Enum for request type
         * @enum {string}
         */
        this.REQUEST_TYPE = {
            LOGIN: 'LOGIN',
            RENEW_TOKEN: 'RENEW_TOKEN',
            UNKNOWN: 'UNKNOWN'
        };

        this.RESPONSE_TYPE = {
            ID_TOKEN_TOKEN: 'id_token token',
            TOKEN: 'token'
        };

        /**
         * Enum for storage constants
         * @enum {string}
         */
        this.CONSTANTS = {
            ACCESS_TOKEN: 'access_token',
            EXPIRES_IN: 'expires_in',
            ID_TOKEN: 'id_token',
            ERROR_DESCRIPTION: 'error_description',
            SESSION_STATE: 'session_state',
            ERROR: 'error',
            STORAGE: {
                TOKEN_KEYS: 'adal.token.keys',
                ACCESS_TOKEN_KEY: 'adal.access.token.key',
                EXPIRATION_KEY: 'adal.expiration.key',
                STATE_LOGIN: 'adal.state.login',
                STATE_RENEW: 'adal.state.renew',
                NONCE_IDTOKEN: 'adal.nonce.idtoken',
                SESSION_STATE: 'adal.session.state',
                USERNAME: 'adal.username',
                IDTOKEN: 'adal.idtoken',
                ERROR: 'adal.error',
                ERROR_DESCRIPTION: 'adal.error.description',
                LOGIN_REQUEST: 'adal.login.request',
                LOGIN_ERROR: 'adal.login.error',
                RENEW_STATUS: 'adal.token.renew.status',
                ANGULAR_LOGIN_REQUEST: 'adal.angular.login.request'
            },
            RESOURCE_DELIMETER: '|',
            CACHE_DELIMETER: '||',
            LOADFRAME_TIMEOUT: 6000,
            TOKEN_RENEW_STATUS_CANCELED: 'Canceled',
            TOKEN_RENEW_STATUS_COMPLETED: 'Completed',
            TOKEN_RENEW_STATUS_IN_PROGRESS: 'In Progress',
            LOGGING_LEVEL: {
                ERROR: 0,
                WARN: 1,
                INFO: 2,
                VERBOSE: 3
            },
            LEVEL_STRING_MAP: {
                0: 'ERROR:',
                1: 'WARNING:',
                2: 'INFO:',
                3: 'VERBOSE:'
            },
            POPUP_WIDTH: 483,
            POPUP_HEIGHT: 600
        };

        if (AuthenticationContext.prototype._singletonInstance) {
            return AuthenticationContext.prototype._singletonInstance;
        }
        AuthenticationContext.prototype._singletonInstance = this;

        // public
        this.instance = 'https://login.microsoftonline.com/';
        this.config = {};
        this.callback = null;
        this.popUp = false;
        this.isAngular = false;

        // private
        this._user = null;
        this._activeRenewals = {};
        this._loginInProgress = false;
        this._acquireTokenInProgress = false;
        this._renewStates = [];
        this._callBackMappedToRenewStates = {};
        this._callBacksMappedToRenewStates = {};
        this._openedWindows = [];
        this._requestType = this.REQUEST_TYPE.LOGIN;
        window._adalInstance = this;

        // validate before constructor assignments
        if (config.displayCall && typeof config.displayCall !== 'function') {
            throw new Error('displayCall is not a function');
        }

        if (!config.clientId) {
            throw new Error('clientId is required');
        }

        this.config = this._cloneConfig(config);

        if (this.config.navigateToLoginRequestUrl === undefined)
            this.config.navigateToLoginRequestUrl = true;

        if (this.config.popUp)
            this.popUp = true;

        if (this.config.callback && typeof this.config.callback === 'function')
            this.callback = this.config.callback;

        if (this.config.instance) {
            this.instance = this.config.instance;
        }

        // App can request idtoken for itself using clientid as resource
        if (!this.config.loginResource) {
            this.config.loginResource = this.config.clientId;
        }

        // redirect and logout_redirect are set to current location by default
        if (!this.config.redirectUri) {
            // strip off query parameters or hashes from the redirect uri as AAD does not allow those.
            this.config.redirectUri = window.location.href.split("?")[0].split("#")[0];
        }

        if (!this.config.postLogoutRedirectUri) {
            // strip off query parameters or hashes from the post logout redirect uri as AAD does not allow those.
            this.config.postLogoutRedirectUri = window.location.href.split("?")[0].split("#")[0];
        }

        if (!this.config.anonymousEndpoints) {
            this.config.anonymousEndpoints = [];
        }

        if (this.config.isAngular) {
            this.isAngular = this.config.isAngular;
        }

        if (this.config.loadFrameTimeout) {
            this.CONSTANTS.LOADFRAME_TIMEOUT = this.config.loadFrameTimeout;
        }
    };

    if (typeof window !== 'undefined') {
        window.Logging = {
            piiLoggingEnabled: false,
            level: 0,
            log: function (message) { }
        };
    }

    /**
     * Initiates the login process by redirecting the user to Azure AD authorization endpoint.
     */
    AuthenticationContext.prototype.login = function () {
        if (this._loginInProgress) {
            this.info("Login in progress");
            return;
        }

        this._loginInProgress = true;

        // Token is not present and user needs to login
        var expectedState = this._guid();
        this.config.state = expectedState;
        this._idTokenNonce = this._guid();
        var loginStartPage = this._getItem(this.CONSTANTS.STORAGE.ANGULAR_LOGIN_REQUEST);

        if (!loginStartPage || loginStartPage === "") {
            loginStartPage = window.location.href;
        }
        else {
            this._saveItem(this.CONSTANTS.STORAGE.ANGULAR_LOGIN_REQUEST, "")
        }

        this.verbose('Expected state: ' + expectedState + ' startPage:' + loginStartPage);
        this._saveItem(this.CONSTANTS.STORAGE.LOGIN_REQUEST, loginStartPage);
        this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, '');
        this._saveItem(this.CONSTANTS.STORAGE.STATE_LOGIN, expectedState, true);
        this._saveItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN, this._idTokenNonce, true);
        this._saveItem(this.CONSTANTS.STORAGE.ERROR, '');
        this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, '');
        var urlNavigate = this._getNavigateUrl('id_token', null) + '&nonce=' + encodeURIComponent(this._idTokenNonce);

        if (this.config.displayCall) {
            // User defined way of handling the navigation
            this.config.displayCall(urlNavigate);
        }
        else if (this.popUp) {
            this._saveItem(this.CONSTANTS.STORAGE.STATE_LOGIN, '');// so requestInfo does not match redirect case
            this._renewStates.push(expectedState);
            this.registerCallback(expectedState, this.config.clientId, this.callback);
            this._loginPopup(urlNavigate);
        }
        else {
            this.promptUser(urlNavigate);
        }
    };

    /**
     * Configures popup window for login.
     * @ignore
     */
    AuthenticationContext.prototype._openPopup = function (urlNavigate, title, popUpWidth, popUpHeight) {
        try {
            /**
            * adding winLeft and winTop to account for dual monitor
            * using screenLeft and screenTop for IE8 and earlier
            */
            var winLeft = window.screenLeft ? window.screenLeft : window.screenX;
            var winTop = window.screenTop ? window.screenTop : window.screenY;
            /**
            * window.innerWidth displays browser window's height and width excluding toolbars
            * using document.documentElement.clientWidth for IE8 and earlier
            */
            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var left = ((width / 2) - (popUpWidth / 2)) + winLeft;
            var top = ((height / 2) - (popUpHeight / 2)) + winTop;

            var popupWindow = window.open(urlNavigate, title, 'width=' + popUpWidth + ', height=' + popUpHeight + ', top=' + top + ', left=' + left);

            if (popupWindow.focus) {
                popupWindow.focus();
            }

            return popupWindow;
        } catch (e) {
            this.warn('Error opening popup, ' + e.message);
            this._loginInProgress = false;
            this._acquireTokenInProgress = false;
            return null;
        }
    }

    AuthenticationContext.prototype._handlePopupError = function (loginCallback, resource, error, errorDesc, loginError) {
        this.warn(errorDesc);
        this._saveItem(this.CONSTANTS.STORAGE.ERROR, error);
        this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, errorDesc);
        this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, loginError);

        if (resource && this._activeRenewals[resource]) {
            this._activeRenewals[resource] = null;
        }

        this._loginInProgress = false;
        this._acquireTokenInProgress = false;

        if (loginCallback) {
            loginCallback(errorDesc, null, error);
        }
    }

    /**
     * After authorization, the user will be sent to your specified redirect_uri with the user's bearer token
     * attached to the URI fragment as an id_token field. It closes popup window after redirection.
     * @ignore
     */
    AuthenticationContext.prototype._loginPopup = function (urlNavigate, resource, callback) {
        var popupWindow = this._openPopup(urlNavigate, "login", this.CONSTANTS.POPUP_WIDTH, this.CONSTANTS.POPUP_HEIGHT);
        var loginCallback = callback || this.callback;

        if (popupWindow == null) {
            var error = 'Error opening popup';
            var errorDesc = 'Popup Window is null. This can happen if you are using IE';
            this._handlePopupError(loginCallback, resource, error, errorDesc, errorDesc);
            return;
        }

        this._openedWindows.push(popupWindow);

        if (this.config.redirectUri.indexOf('#') != -1) {
            var registeredRedirectUri = this.config.redirectUri.split("#")[0];
        }

        else {
            var registeredRedirectUri = this.config.redirectUri;
        }

        var that = this;

        var pollTimer = window.setInterval(function () {
            if (!popupWindow || popupWindow.closed || popupWindow.closed === undefined) {
                var error = 'Popup Window closed';
                var errorDesc = 'Popup Window closed by UI action/ Popup Window handle destroyed due to cross zone navigation in IE/Edge'

                if (that.isAngular) {
                    that._broadcast('adal:popUpClosed', errorDesc + that.CONSTANTS.RESOURCE_DELIMETER + error);
                }

                that._handlePopupError(loginCallback, resource, error, errorDesc, errorDesc);
                window.clearInterval(pollTimer);
                return;
            }
            try {
                var popUpWindowLocation = popupWindow.location;
                if (encodeURI(popUpWindowLocation.href).indexOf(encodeURI(registeredRedirectUri)) != -1) {
                    if (that.isAngular) {
                        that._broadcast('adal:popUpHashChanged', popUpWindowLocation.hash);
                    }
                    else {
                        that.handleWindowCallback(popUpWindowLocation.hash);
                    }

                    window.clearInterval(pollTimer);
                    that._loginInProgress = false;
                    that._acquireTokenInProgress = false;
                    that.info("Closing popup window");
                    that._openedWindows = [];
                    popupWindow.close();
                    return;
                }
            } catch (e) {
            }
        }, 1);
    };

    AuthenticationContext.prototype._broadcast = function (eventName, data) {
        // Custom Event is not supported in IE, below IIFE will polyfill the CustomEvent() constructor functionality in Internet Explorer 9 and higher
        (function () {

            if (typeof window.CustomEvent === "function") {
                return false;
            }

            function CustomEvent(event, params) {
                params = params || { bubbles: false, cancelable: false, detail: undefined };
                var evt = document.createEvent('CustomEvent');
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
            }

            CustomEvent.prototype = window.Event.prototype;
            window.CustomEvent = CustomEvent;
        })();

        var evt = new CustomEvent(eventName, { detail: data });
        window.dispatchEvent(evt);
    };

    AuthenticationContext.prototype.loginInProgress = function () {
        return this._loginInProgress;
    };

    /**
     * Checks for the resource in the cache. By default, cache location is Session Storage
     * @ignore
     * @returns {Boolean} 'true' if login is in progress, else returns 'false'.
     */
    AuthenticationContext.prototype._hasResource = function (key) {
        var keys = this._getItem(this.CONSTANTS.STORAGE.TOKEN_KEYS);
        return keys && !this._isEmpty(keys) && (keys.indexOf(key + this.CONSTANTS.RESOURCE_DELIMETER) > -1);
    };

    /**
     * Gets token for the specified resource from the cache.
     * @param {string}   resource A URI that identifies the resource for which the token is requested.
     * @returns {string} token if if it exists and not expired, otherwise null.
     */
    AuthenticationContext.prototype.getCachedToken = function (resource) {
        if (!this._hasResource(resource)) {
            return null;
        }

        var token = this._getItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + resource);
        var expiry = this._getItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY + resource);

        // If expiration is within offset, it will force renew
        var offset = this.config.expireOffsetSeconds || 300;

        if (expiry && (expiry > this._now() + offset)) {
            return token;
        } else {
            this._saveItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + resource, '');
            this._saveItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY + resource, 0);
            return null;
        }
    };

    /**
    * User information from idtoken.
    *  @class User
    *  @property {string} userName - username assigned from upn or email.
    *  @property {object} profile - properties parsed from idtoken.
    */

    /**
     * If user object exists, returns it. Else creates a new user object by decoding id_token from the cache.
     * @returns {User} user object
     */
    AuthenticationContext.prototype.getCachedUser = function () {
        if (this._user) {
            return this._user;
        }

        var idtoken = this._getItem(this.CONSTANTS.STORAGE.IDTOKEN);
        this._user = this._createUser(idtoken);
        return this._user;
    };

    /**
     * Adds the passed callback to the array of callbacks for the specified resource and puts the array on the window object. 
     * @param {string}   resource A URI that identifies the resource for which the token is requested.
     * @param {string}   expectedState A unique identifier (guid).
     * @param {tokenCallback} callback - The callback provided by the caller. It will be called with token or error.
     */
    AuthenticationContext.prototype.registerCallback = function (expectedState, resource, callback) {
        this._activeRenewals[resource] = expectedState;

        if (!this._callBacksMappedToRenewStates[expectedState]) {
            this._callBacksMappedToRenewStates[expectedState] = [];
        }

        var self = this;
        this._callBacksMappedToRenewStates[expectedState].push(callback);

        if (!this._callBackMappedToRenewStates[expectedState]) {
            this._callBackMappedToRenewStates[expectedState] = function (errorDesc, token, error, tokenType) {
                self._activeRenewals[resource] = null;

                for (var i = 0; i < self._callBacksMappedToRenewStates[expectedState].length; ++i) {
                    try {
                        self._callBacksMappedToRenewStates[expectedState][i](errorDesc, token, error, tokenType);
                    }
                    catch (error) {
                        self.warn(error);
                    }
                }

                self._callBacksMappedToRenewStates[expectedState] = null;
                self._callBackMappedToRenewStates[expectedState] = null;
            };
        }
    };

    // var errorResponse = {error:'', error_description:''};
    // var token = 'string token';
    // callback(errorResponse, token)
    // with callback
    /**
     * Acquires access token with hidden iframe
     * @ignore
     */
    AuthenticationContext.prototype._renewToken = function (resource, callback, responseType) {
        // use iframe to try to renew token
        // use given resource to create new authz url
        this.info('renewToken is called for resource:' + resource);
        var frameHandle = this._addAdalFrame('adalRenewFrame' + resource);
        var expectedState = this._guid() + '|' + resource;
        this.config.state = expectedState;
        // renew happens in iframe, so it keeps javascript context
        this._renewStates.push(expectedState);
        this.verbose('Renew token Expected state: ' + expectedState);
        // remove the existing prompt=... query parameter and add prompt=none
        responseType = responseType || 'token';
        var urlNavigate = this._urlRemoveQueryStringParameter(this._getNavigateUrl(responseType, resource), 'prompt');

        if (responseType === this.RESPONSE_TYPE.ID_TOKEN_TOKEN) {
            this._idTokenNonce = this._guid();
            this._saveItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN, this._idTokenNonce, true);
            urlNavigate += '&nonce=' + encodeURIComponent(this._idTokenNonce);
        }

        urlNavigate = urlNavigate + '&prompt=none';
        urlNavigate = this._addHintParameters(urlNavigate);
        this.registerCallback(expectedState, resource, callback);
        this.verbosePii('Navigate to:' + urlNavigate);
        frameHandle.src = 'about:blank';
        this._loadFrameTimeout(urlNavigate, 'adalRenewFrame' + resource, resource);

    };

    /**
     * Renews idtoken for app's own backend when resource is clientId and calls the callback with token/error
     * @ignore
     */
    AuthenticationContext.prototype._renewIdToken = function (callback, responseType) {
        // use iframe to try to renew token
        this.info('renewIdToken is called');
        var frameHandle = this._addAdalFrame('adalIdTokenFrame');
        var expectedState = this._guid() + '|' + this.config.clientId;
        this._idTokenNonce = this._guid();
        this._saveItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN, this._idTokenNonce, true);
        this.config.state = expectedState;
        // renew happens in iframe, so it keeps javascript context
        this._renewStates.push(expectedState);
        this.verbose('Renew Idtoken Expected state: ' + expectedState);
        // remove the existing prompt=... query parameter and add prompt=none
        var resource = responseType === null || typeof (responseType) === "undefined" ? null : this.config.clientId;
        var responseType = responseType || 'id_token';
        var urlNavigate = this._urlRemoveQueryStringParameter(this._getNavigateUrl(responseType, resource), 'prompt');
        urlNavigate = urlNavigate + '&prompt=none';
        urlNavigate = this._addHintParameters(urlNavigate);
        urlNavigate += '&nonce=' + encodeURIComponent(this._idTokenNonce);
        this.registerCallback(expectedState, this.config.clientId, callback);
        this.verbosePii('Navigate to:' + urlNavigate);
        frameHandle.src = 'about:blank';
        this._loadFrameTimeout(urlNavigate, 'adalIdTokenFrame', this.config.clientId);
    };

    /**
     * Checks if the authorization endpoint URL contains query string parameters
     * @ignore
     */
    AuthenticationContext.prototype._urlContainsQueryStringParameter = function (name, url) {
        // regex to detect pattern of a ? or & followed by the name parameter and an equals character
        var regex = new RegExp("[\\?&]" + name + "=");
        return regex.test(url);
    }

    /**
     * Removes the query string parameter from the authorization endpoint URL if it exists
     * @ignore
     */
    AuthenticationContext.prototype._urlRemoveQueryStringParameter = function (url, name) {
        // we remove &name=value, name=value& and name=value
        // &name=value
        var regex = new RegExp('(\\&' + name + '=)[^\&]+');
        url = url.replace(regex, '');
        // name=value&
        regex = new RegExp('(' + name + '=)[^\&]+&');
        url = url.replace(regex, '');
        // name=value
        regex = new RegExp('(' + name + '=)[^\&]+');
        url = url.replace(regex, '');
        return url;
    }

    // Calling _loadFrame but with a timeout to signal failure in loadframeStatus. Callbacks are left
    // registered when network errors occur and subsequent token requests for same resource are registered to the pending request
    /**
     * @ignore
     */
    AuthenticationContext.prototype._loadFrameTimeout = function (urlNavigation, frameName, resource) {
        //set iframe session to pending
        this.verbose('Set loading state to pending for: ' + resource);
        this._saveItem(this.CONSTANTS.STORAGE.RENEW_STATUS + resource, this.CONSTANTS.TOKEN_RENEW_STATUS_IN_PROGRESS);
        this._loadFrame(urlNavigation, frameName);
        var self = this;

        setTimeout(function () {
            if (self._getItem(self.CONSTANTS.STORAGE.RENEW_STATUS + resource) === self.CONSTANTS.TOKEN_RENEW_STATUS_IN_PROGRESS) {
                // fail the iframe session if it's in pending state
                self.verbose('Loading frame has timed out after: ' + (self.CONSTANTS.LOADFRAME_TIMEOUT / 1000) + ' seconds for resource ' + resource);
                var expectedState = self._activeRenewals[resource];

                if (expectedState && self._callBackMappedToRenewStates[expectedState]) {
                    self._callBackMappedToRenewStates[expectedState]('Token renewal operation failed due to timeout', null, 'Token Renewal Failed');
                }

                self._saveItem(self.CONSTANTS.STORAGE.RENEW_STATUS + resource, self.CONSTANTS.TOKEN_RENEW_STATUS_CANCELED);
            }
        }, self.CONSTANTS.LOADFRAME_TIMEOUT);
    }

    /**
     * Loads iframe with authorization endpoint URL
     * @ignore
     */
    AuthenticationContext.prototype._loadFrame = function (urlNavigate, frameName) {
        // This trick overcomes iframe navigation in IE
        // IE does not load the page consistently in iframe
        var self = this;
        self.info('LoadFrame: ' + frameName);
        var frameCheck = frameName;
        setTimeout(function () {
            var frameHandle = self._addAdalFrame(frameCheck);

            if (frameHandle.src === '' || frameHandle.src === 'about:blank') {
                frameHandle.src = urlNavigate;
                self._loadFrame(urlNavigate, frameCheck);
            }

        }, 500);
    };

    /**
     * @callback tokenCallback
     * @param {string} error_description error description returned from AAD if token request fails.
     * @param {string} token token returned from AAD if token request is successful.
     * @param {string} error error message returned from AAD if token request fails.
     */

    /**
     * Acquires token from the cache if it is not expired. Otherwise sends request to AAD to obtain a new token.
     * @param {string}   resource  ResourceUri identifying the target resource
     * @param {tokenCallback} callback -  The callback provided by the caller. It will be called with token or error.
     */
    AuthenticationContext.prototype.acquireToken = function (resource, callback) {
        if (this._isEmpty(resource)) {
            this.warn('resource is required');
            callback('resource is required', null, 'resource is required');
            return;
        }

        var token = this.getCachedToken(resource);

        if (token) {
            this.info('Token is already in cache for resource:' + resource);
            callback(null, token, null);
            return;
        }

        if (!this._user && !(this.config.extraQueryParameter && this.config.extraQueryParameter.indexOf('login_hint') !== -1)) {
            this.warn('User login is required');
            callback('User login is required', null, 'login required');
            return;
        }

        // renew attempt with iframe
        // Already renewing for this resource, callback when we get the token.
        if (this._activeRenewals[resource]) {
            // Active renewals contains the state for each renewal.
            this.registerCallback(this._activeRenewals[resource], resource, callback);
        }
        else {
            this._requestType = this.REQUEST_TYPE.RENEW_TOKEN;
            if (resource === this.config.clientId) {
                // App uses idtoken to send to api endpoints
                // Default resource is tracked as clientid to store this token
                if (this._user) {
                    this.verbose('renewing idtoken');
                    this._renewIdToken(callback);
                }
                else {
                    this.verbose('renewing idtoken and access_token');
                    this._renewIdToken(callback, this.RESPONSE_TYPE.ID_TOKEN_TOKEN);
                }
            } else {
                if (this._user) {
                    this.verbose('renewing access_token');
                    this._renewToken(resource, callback);
                }
                else {
                    this.verbose('renewing idtoken and access_token');
                    this._renewToken(resource, callback, this.RESPONSE_TYPE.ID_TOKEN_TOKEN);
                }
            }
        }
    };

    /**
  * Acquires token (interactive flow using a popUp window) by sending request to AAD to obtain a new token.
  * @param {string}   resource  ResourceUri identifying the target resource
  * @param {string}   extraQueryParameters  extraQueryParameters to add to the authentication request
  * @param {tokenCallback} callback -  The callback provided by the caller. It will be called with token or error.
  */
    AuthenticationContext.prototype.acquireTokenPopup = function (resource, extraQueryParameters, claims, callback) {
        if (this._isEmpty(resource)) {
            this.warn('resource is required');
            callback('resource is required', null, 'resource is required');
            return;
        }

        if (!this._user) {
            this.warn('User login is required');
            callback('User login is required', null, 'login required');
            return;
        }

        if (this._acquireTokenInProgress) {
            this.warn("Acquire token interactive is already in progress")
            callback("Acquire token interactive is already in progress", null, "Acquire token interactive is already in progress");
            return;
        }

        var expectedState = this._guid() + '|' + resource;
        this.config.state = expectedState;
        this._renewStates.push(expectedState);
        this._requestType = this.REQUEST_TYPE.RENEW_TOKEN;
        this.verbose('Renew token Expected state: ' + expectedState);
        // remove the existing prompt=... query parameter and add prompt=select_account
        var urlNavigate = this._urlRemoveQueryStringParameter(this._getNavigateUrl('token', resource), 'prompt');
        urlNavigate = urlNavigate + '&prompt=select_account';

        if (extraQueryParameters) {
            urlNavigate += extraQueryParameters;
        }

        if (claims && (urlNavigate.indexOf("&claims") === -1)) {
            urlNavigate += '&claims=' + encodeURIComponent(claims);
        }
        else if (claims && (urlNavigate.indexOf("&claims") !== -1)) {
            throw new Error('Claims cannot be passed as an extraQueryParameter');
        }

        urlNavigate = this._addHintParameters(urlNavigate);
        this._acquireTokenInProgress = true;
        this.info('acquireToken interactive is called for the resource ' + resource);
        this.registerCallback(expectedState, resource, callback);
        this._loginPopup(urlNavigate, resource, callback);

    };

    /**
      * Acquires token (interactive flow using a redirect) by sending request to AAD to obtain a new token. In this case the callback passed in the Authentication
      * request constructor will be called.
      * @param {string}   resource  ResourceUri identifying the target resource
      * @param {string}   extraQueryParameters  extraQueryParameters to add to the authentication request
      */
    AuthenticationContext.prototype.acquireTokenRedirect = function (resource, extraQueryParameters, claims) {
        if (this._isEmpty(resource)) {
            this.warn('resource is required');
            callback('resource is required', null, 'resource is required');
            return;
        }

        var callback = this.callback;

        if (!this._user) {
            this.warn('User login is required');
            callback('User login is required', null, 'login required');
            return;
        }

        if (this._acquireTokenInProgress) {
            this.warn("Acquire token interactive is already in progress")
            callback("Acquire token interactive is already in progress", null, "Acquire token interactive is already in progress");
            return;
        }

        var expectedState = this._guid() + '|' + resource;
        this.config.state = expectedState;
        this.verbose('Renew token Expected state: ' + expectedState);

        // remove the existing prompt=... query parameter and add prompt=select_account
        var urlNavigate = this._urlRemoveQueryStringParameter(this._getNavigateUrl('token', resource), 'prompt');
        urlNavigate = urlNavigate + '&prompt=select_account';
        if (extraQueryParameters) {
            urlNavigate += extraQueryParameters;
        }

        if (claims && (urlNavigate.indexOf("&claims") === -1)) {
            urlNavigate += '&claims=' + encodeURIComponent(claims);
        }
        else if (claims && (urlNavigate.indexOf("&claims") !== -1)) {
            throw new Error('Claims cannot be passed as an extraQueryParameter');
        }

        urlNavigate = this._addHintParameters(urlNavigate);
        this._acquireTokenInProgress = true;
        this.info('acquireToken interactive is called for the resource ' + resource);
        this._saveItem(this.CONSTANTS.STORAGE.LOGIN_REQUEST, window.location.href);
        this._saveItem(this.CONSTANTS.STORAGE.STATE_RENEW, expectedState, true);
        this.promptUser(urlNavigate);
    };
    /**
     * Redirects the browser to Azure AD authorization endpoint.
     * @param {string}   urlNavigate  Url of the authorization endpoint.
     */
    AuthenticationContext.prototype.promptUser = function (urlNavigate) {
        if (urlNavigate) {
            this.infoPii('Navigate to:' + urlNavigate);
            window.location.replace(urlNavigate);
        } else {
            this.info('Navigate url is empty');
        }
    };

    /**
     * Clears cache items.
     */
    AuthenticationContext.prototype.clearCache = function () {
        this._saveItem(this.CONSTANTS.STORAGE.LOGIN_REQUEST, '');
        this._saveItem(this.CONSTANTS.STORAGE.ANGULAR_LOGIN_REQUEST, '');
        this._saveItem(this.CONSTANTS.STORAGE.SESSION_STATE, '');
        this._saveItem(this.CONSTANTS.STORAGE.STATE_LOGIN, '');
        this._saveItem(this.CONSTANTS.STORAGE.STATE_RENEW, '');
        this._renewStates = [];
        this._saveItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN, '');
        this._saveItem(this.CONSTANTS.STORAGE.IDTOKEN, '');
        this._saveItem(this.CONSTANTS.STORAGE.ERROR, '');
        this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, '');
        this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, '');
        this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, '');
        var keys = this._getItem(this.CONSTANTS.STORAGE.TOKEN_KEYS);

        if (!this._isEmpty(keys)) {
            keys = keys.split(this.CONSTANTS.RESOURCE_DELIMETER);
            for (var i = 0; i < keys.length && keys[i] !== ""; i++) {
                this._saveItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + keys[i], '');
                this._saveItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY + keys[i], 0);
            }
        }

        this._saveItem(this.CONSTANTS.STORAGE.TOKEN_KEYS, '');
    };

    /**
     * Clears cache items for a given resource.
     * @param {string}  resource a URI that identifies the resource.
     */
    AuthenticationContext.prototype.clearCacheForResource = function (resource) {
        this._saveItem(this.CONSTANTS.STORAGE.STATE_RENEW, '');
        this._saveItem(this.CONSTANTS.STORAGE.ERROR, '');
        this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, '');

        if (this._hasResource(resource)) {
            this._saveItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + resource, '');
            this._saveItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY + resource, 0);
        }
    };

    /**
     * Redirects user to logout endpoint.
     * After logout, it will redirect to postLogoutRedirectUri if added as a property on the config object.
     */
    AuthenticationContext.prototype.logOut = function () {
        this.clearCache();
        this._user = null;
        var urlNavigate;

        if (this.config.logOutUri) {
            urlNavigate = this.config.logOutUri;
        } else {
            var tenant = 'common';
            var logout = '';

            if (this.config.tenant) {
                tenant = this.config.tenant;
            }

            if (this.config.postLogoutRedirectUri) {
                logout = 'post_logout_redirect_uri=' + encodeURIComponent(this.config.postLogoutRedirectUri);
            }

            urlNavigate = this.instance + tenant + '/oauth2/logout?' + logout;
        }

        this.infoPii('Logout navigate to: ' + urlNavigate);
        this.promptUser(urlNavigate);
    };

    AuthenticationContext.prototype._isEmpty = function (str) {
        return (typeof str === 'undefined' || !str || 0 === str.length);
    };

    /**
     * @callback userCallback
     * @param {string} error error message if user info is not available.
     * @param {User} user user object retrieved from the cache.
     */

    /**
     * Calls the passed in callback with the user object or error message related to the user.
     * @param {userCallback} callback - The callback provided by the caller. It will be called with user or error.
     */
    AuthenticationContext.prototype.getUser = function (callback) {
        // IDToken is first call
        if (typeof callback !== 'function') {
            throw new Error('callback is not a function');
        }

        // user in memory
        if (this._user) {
            callback(null, this._user);
            return;
        }

        // frame is used to get idtoken
        var idtoken = this._getItem(this.CONSTANTS.STORAGE.IDTOKEN);

        if (!this._isEmpty(idtoken)) {
            this.info('User exists in cache: ');
            this._user = this._createUser(idtoken);
            callback(null, this._user);
        } else {
            this.warn('User information is not available');
            callback('User information is not available', null);
        }
    };

    /**
     * Adds login_hint to authorization URL which is used to pre-fill the username field of sign in page for the user if known ahead of time.
     * domain_hint can be one of users/organisations which when added skips the email based discovery process of the user.
     * @ignore
     */
    AuthenticationContext.prototype._addHintParameters = function (urlNavigate) {
        //If you don�t use prompt=none, then if the session does not exist, there will be a failure.
        //If sid is sent alongside domain or login hints, there will be a failure since request is ambiguous.
        //If sid is sent with a prompt value other than none or attempt_none, there will be a failure since the request is ambiguous.

        if (this._user && this._user.profile) {
            if (this._user.profile.sid && urlNavigate.indexOf('&prompt=none') !== -1) {
                // don't add sid twice if user provided it in the extraQueryParameter value
                if (!this._urlContainsQueryStringParameter("sid", urlNavigate)) {
                    // add sid
                    urlNavigate += '&sid=' + encodeURIComponent(this._user.profile.sid);
                }
            }
            else if (this._user.profile.upn) {
                // don't add login_hint twice if user provided it in the extraQueryParameter value
                if (!this._urlContainsQueryStringParameter("login_hint", urlNavigate)) {
                    // add login_hint
                    urlNavigate += '&login_hint=' + encodeURIComponent(this._user.profile.upn);
                }
                // don't add domain_hint twice if user provided it in the extraQueryParameter value
                if (!this._urlContainsQueryStringParameter("domain_hint", urlNavigate) && this._user.profile.upn.indexOf('@') > -1) {
                    var parts = this._user.profile.upn.split('@');
                    // local part can include @ in quotes. Sending last part handles that.
                    urlNavigate += '&domain_hint=' + encodeURIComponent(parts[parts.length - 1]);
                }
            }

        }

        return urlNavigate;
    }

    /**
     * Creates a user object by decoding the id_token
     * @ignore
     */
    AuthenticationContext.prototype._createUser = function (idToken) {
        var user = null;
        var parsedJson = this._extractIdToken(idToken);
        if (parsedJson && parsedJson.hasOwnProperty('aud')) {
            if (parsedJson.aud.toLowerCase() === this.config.clientId.toLowerCase()) {

                user = {
                    userName: '',
                    profile: parsedJson
                };

                if (parsedJson.hasOwnProperty('upn')) {
                    user.userName = parsedJson.upn;
                } else if (parsedJson.hasOwnProperty('email')) {
                    user.userName = parsedJson.email;
                }
            } else {
                this.warn('IdToken has invalid aud field');
            }

        }

        return user;
    };

    /**
     * Returns the anchor part(#) of the URL
     * @ignore
     */
    AuthenticationContext.prototype._getHash = function (hash) {
        if (hash.indexOf('#/') > -1) {
            hash = hash.substring(hash.indexOf('#/') + 2);
        } else if (hash.indexOf('#') > -1) {
            hash = hash.substring(1);
        }

        return hash;
    };

    /**
     * Checks if the URL fragment contains access token, id token or error_description.
     * @param {string} hash  -  Hash passed from redirect page
     * @returns {Boolean} true if response contains id_token, access_token or error, false otherwise.
     */
    AuthenticationContext.prototype.isCallback = function (hash) {
        hash = this._getHash(hash);
        var parameters = this._deserialize(hash);
        return (
            parameters.hasOwnProperty(this.CONSTANTS.ERROR_DESCRIPTION) ||
            parameters.hasOwnProperty(this.CONSTANTS.ACCESS_TOKEN) ||
            parameters.hasOwnProperty(this.CONSTANTS.ID_TOKEN)
        );
    };

    /**
     * Gets login error
     * @returns {string} error message related to login.
     */
    AuthenticationContext.prototype.getLoginError = function () {
        return this._getItem(this.CONSTANTS.STORAGE.LOGIN_ERROR);
    };

    /**
     * Request info object created from the response received from AAD.
     *  @class RequestInfo
     *  @property {object} parameters - object comprising of fields such as id_token/error, session_state, state, e.t.c.
     *  @property {REQUEST_TYPE} requestType - either LOGIN, RENEW_TOKEN or UNKNOWN.
     *  @property {boolean} stateMatch - true if state is valid, false otherwise.
     *  @property {string} stateResponse - unique guid used to match the response with the request.
     *  @property {boolean} valid - true if requestType contains id_token, access_token or error, false otherwise.
     */

    /**
     * Creates a requestInfo object from the URL fragment and returns it.
     * @returns {RequestInfo} an object created from the redirect response from AAD comprising of the keys - parameters, requestType, stateMatch, stateResponse and valid.
     */
    AuthenticationContext.prototype.getRequestInfo = function (hash) {
        hash = this._getHash(hash);
        var parameters = this._deserialize(hash);
        var requestInfo = {
            valid: false,
            parameters: {},
            stateMatch: false,
            stateResponse: '',
            requestType: this.REQUEST_TYPE.UNKNOWN,
        };

        if (parameters) {
            requestInfo.parameters = parameters;
            if (parameters.hasOwnProperty(this.CONSTANTS.ERROR_DESCRIPTION) ||
                parameters.hasOwnProperty(this.CONSTANTS.ACCESS_TOKEN) ||
                parameters.hasOwnProperty(this.CONSTANTS.ID_TOKEN)) {

                requestInfo.valid = true;

                // which call
                var stateResponse = '';
                if (parameters.hasOwnProperty('state')) {
                    this.verbose('State: ' + parameters.state);
                    stateResponse = parameters.state;
                } else {
                    this.warn('No state returned');
                    return requestInfo;
                }

                requestInfo.stateResponse = stateResponse;

                // async calls can fire iframe and login request at the same time if developer does not use the API as expected
                // incoming callback needs to be looked up to find the request type
                if (this._matchState(requestInfo)) { // loginRedirect or acquireTokenRedirect
                    return requestInfo;
                }

                // external api requests may have many renewtoken requests for different resource
                if (!requestInfo.stateMatch && window.parent) {
                    requestInfo.requestType = this._requestType;
                    var statesInParentContext = this._renewStates;
                    for (var i = 0; i < statesInParentContext.length; i++) {
                        if (statesInParentContext[i] === requestInfo.stateResponse) {
                            requestInfo.stateMatch = true;
                            break;
                        }
                    }
                }
            }
        }
        return requestInfo;
    };

    /**
    * Matches nonce from the request with the response.
    * @ignore
    */
    AuthenticationContext.prototype._matchNonce = function (user) {
        var requestNonce = this._getItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN);

        if (requestNonce) {
            requestNonce = requestNonce.split(this.CONSTANTS.CACHE_DELIMETER);
            for (var i = 0; i < requestNonce.length; i++) {
                if (requestNonce[i] === user.profile.nonce) {
                    return true;
                }
            }
        }

        return false;
    };

    /**
    * Matches state from the request with the response.
    * @ignore
    */
    AuthenticationContext.prototype._matchState = function (requestInfo) {
        var loginStates = this._getItem(this.CONSTANTS.STORAGE.STATE_LOGIN);

        if (loginStates) {
            loginStates = loginStates.split(this.CONSTANTS.CACHE_DELIMETER);
            for (var i = 0; i < loginStates.length; i++) {
                if (loginStates[i] === requestInfo.stateResponse) {
                    requestInfo.requestType = this.REQUEST_TYPE.LOGIN;
                    requestInfo.stateMatch = true;
                    return true;
                }
            }
        }

        var acquireTokenStates = this._getItem(this.CONSTANTS.STORAGE.STATE_RENEW);

        if (acquireTokenStates) {
            acquireTokenStates = acquireTokenStates.split(this.CONSTANTS.CACHE_DELIMETER);
            for (var i = 0; i < acquireTokenStates.length; i++) {
                if (acquireTokenStates[i] === requestInfo.stateResponse) {
                    requestInfo.requestType = this.REQUEST_TYPE.RENEW_TOKEN;
                    requestInfo.stateMatch = true;
                    return true;
                }
            }
        }

        return false;

    };

    /**
     * Extracts resource value from state.
     * @ignore
     */
    AuthenticationContext.prototype._getResourceFromState = function (state) {
        if (state) {
            var splitIndex = state.indexOf('|');

            if (splitIndex > -1 && splitIndex + 1 < state.length) {
                return state.substring(splitIndex + 1);
            }
        }

        return '';
    };

    /**
     * Saves token or error received in the response from AAD in the cache. In case of id_token, it also creates the user object.
     */
    AuthenticationContext.prototype.saveTokenFromHash = function (requestInfo) {
        this.info('State status:' + requestInfo.stateMatch + '; Request type:' + requestInfo.requestType);
        this._saveItem(this.CONSTANTS.STORAGE.ERROR, '');
        this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, '');

        var resource = this._getResourceFromState(requestInfo.stateResponse);

        // Record error
        if (requestInfo.parameters.hasOwnProperty(this.CONSTANTS.ERROR_DESCRIPTION)) {
            this.infoPii('Error :' + requestInfo.parameters.error + '; Error description:' + requestInfo.parameters[this.CONSTANTS.ERROR_DESCRIPTION]);
            this._saveItem(this.CONSTANTS.STORAGE.ERROR, requestInfo.parameters.error);
            this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, requestInfo.parameters[this.CONSTANTS.ERROR_DESCRIPTION]);

            if (requestInfo.requestType === this.REQUEST_TYPE.LOGIN) {
                this._loginInProgress = false;
                this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, requestInfo.parameters.error_description);
            }
        } else {
            // It must verify the state from redirect
            if (requestInfo.stateMatch) {
                // record tokens to storage if exists
                this.info('State is right');
                if (requestInfo.parameters.hasOwnProperty(this.CONSTANTS.SESSION_STATE)) {
                    this._saveItem(this.CONSTANTS.STORAGE.SESSION_STATE, requestInfo.parameters[this.CONSTANTS.SESSION_STATE]);
                }

                var keys;

                if (requestInfo.parameters.hasOwnProperty(this.CONSTANTS.ACCESS_TOKEN)) {
                    this.info('Fragment has access token');

                    if (!this._hasResource(resource)) {
                        keys = this._getItem(this.CONSTANTS.STORAGE.TOKEN_KEYS) || '';
                        this._saveItem(this.CONSTANTS.STORAGE.TOKEN_KEYS, keys + resource + this.CONSTANTS.RESOURCE_DELIMETER);
                    }

                    // save token with related resource
                    this._saveItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + resource, requestInfo.parameters[this.CONSTANTS.ACCESS_TOKEN]);
                    this._saveItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY + resource, this._expiresIn(requestInfo.parameters[this.CONSTANTS.EXPIRES_IN]));
                }

                if (requestInfo.parameters.hasOwnProperty(this.CONSTANTS.ID_TOKEN)) {
                    this.info('Fragment has id token');
                    this._loginInProgress = false;
                    this._user = this._createUser(requestInfo.parameters[this.CONSTANTS.ID_TOKEN]);
                    if (this._user && this._user.profile) {
                        if (!this._matchNonce(this._user)) {
                            this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR, 'Nonce received: ' + this._user.profile.nonce + ' is not same as requested: ' +
                                this._getItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN));
                            this._user = null;
                        } else {
                            this._saveItem(this.CONSTANTS.STORAGE.IDTOKEN, requestInfo.parameters[this.CONSTANTS.ID_TOKEN]);

                            // Save idtoken as access token for app itself
                            resource = this.config.loginResource ? this.config.loginResource : this.config.clientId;

                            if (!this._hasResource(resource)) {
                                keys = this._getItem(this.CONSTANTS.STORAGE.TOKEN_KEYS) || '';
                                this._saveItem(this.CONSTANTS.STORAGE.TOKEN_KEYS, keys + resource + this.CONSTANTS.RESOURCE_DELIMETER);
                            }

                            this._saveItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY + resource, requestInfo.parameters[this.CONSTANTS.ID_TOKEN]);
                            this._saveItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY + resource, this._user.profile.exp);
                        }
                    }
                    else {
                        requestInfo.parameters['error'] = 'invalid id_token';
                        requestInfo.parameters['error_description'] = 'Invalid id_token. id_token: ' + requestInfo.parameters[this.CONSTANTS.ID_TOKEN];
                        this._saveItem(this.CONSTANTS.STORAGE.ERROR, 'invalid id_token');
                        this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, 'Invalid id_token. id_token: ' + requestInfo.parameters[this.CONSTANTS.ID_TOKEN]);
                    }
                }
            } else {
                requestInfo.parameters['error'] = 'Invalid_state';
                requestInfo.parameters['error_description'] = 'Invalid_state. state: ' + requestInfo.stateResponse;
                this._saveItem(this.CONSTANTS.STORAGE.ERROR, 'Invalid_state');
                this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION, 'Invalid_state. state: ' + requestInfo.stateResponse);
            }
        }

        this._saveItem(this.CONSTANTS.STORAGE.RENEW_STATUS + resource, this.CONSTANTS.TOKEN_RENEW_STATUS_COMPLETED);
    };

    /**
     * Gets resource for given endpoint if mapping is provided with config.
     * @param {string} endpoint  -  The URI for which the resource Id is requested.
     * @returns {string} resource for this API endpoint.
     */
    AuthenticationContext.prototype.getResourceForEndpoint = function (endpoint) {

        // if user specified list of anonymous endpoints, no need to send token to these endpoints, return null.
        if (this.config && this.config.anonymousEndpoints) {
            for (var i = 0; i < this.config.anonymousEndpoints.length; i++) {
                if (endpoint.indexOf(this.config.anonymousEndpoints[i]) > -1) {
                    return null;
                }
            }
        }

        if (this.config && this.config.endpoints) {
            for (var configEndpoint in this.config.endpoints) {
                // configEndpoint is like /api/Todo requested endpoint can be /api/Todo/1
                if (endpoint.indexOf(configEndpoint) > -1) {
                    return this.config.endpoints[configEndpoint];
                }
            }
        }

        // default resource will be clientid if nothing specified
        // App will use idtoken for calls to itself
        // check if it's staring from http or https, needs to match with app host
        if (endpoint.indexOf('http://') > -1 || endpoint.indexOf('https://') > -1) {
            if (this._getHostFromUri(endpoint) === this._getHostFromUri(this.config.redirectUri)) {
                return this.config.loginResource;
            }
        }
        else {
            // in angular level, the url for $http interceptor call could be relative url,
            // if it's relative call, we'll treat it as app backend call.            
            return this.config.loginResource;
        }

        // if not the app's own backend or not a domain listed in the endpoints structure
        return null;
    };

    /**
     * Strips the protocol part of the URL and returns it.
     * @ignore
     */
    AuthenticationContext.prototype._getHostFromUri = function (uri) {
        // remove http:// or https:// from uri
        var extractedUri = String(uri).replace(/^(https?:)\/\//, '');
        extractedUri = extractedUri.split('/')[0];
        return extractedUri;
    };

    /**
     * This method must be called for processing the response received from AAD. It extracts the hash, processes the token or error, saves it in the cache and calls the registered callbacks with the result.
     * @param {string} [hash=window.location.hash] - Hash fragment of Url.
     */
    AuthenticationContext.prototype.handleWindowCallback = function (hash) {
        // This is for regular javascript usage for redirect handling
        // need to make sure this is for callback
        if (hash == null) {
            hash = window.location.hash;
        }

        if (this.isCallback(hash)) {
            var self = null;
            var isPopup = false;

            if (this._openedWindows.length > 0 && this._openedWindows[this._openedWindows.length - 1].opener
                && this._openedWindows[this._openedWindows.length - 1].opener._adalInstance) {
                self = this._openedWindows[this._openedWindows.length - 1].opener._adalInstance;
                isPopup = true;
            }
            else if (window.parent && window.parent._adalInstance) {
                self = window.parent._adalInstance;
            }

            var requestInfo = self.getRequestInfo(hash);
            var token, tokenReceivedCallback, tokenType = null;

            if (isPopup || window.parent !== window) {
                tokenReceivedCallback = self._callBackMappedToRenewStates[requestInfo.stateResponse];
            }
            else {
                tokenReceivedCallback = self.callback;
            }

            self.info("Returned from redirect url");
            self.saveTokenFromHash(requestInfo);

            if ((requestInfo.requestType === this.REQUEST_TYPE.RENEW_TOKEN) && window.parent) {
                if (window.parent !== window) {
                    self.verbose("Window is in iframe, acquiring token silently");
                } else {
                    self.verbose("acquiring token interactive in progress");
                }

                token = requestInfo.parameters[self.CONSTANTS.ACCESS_TOKEN] || requestInfo.parameters[self.CONSTANTS.ID_TOKEN];
                tokenType = self.CONSTANTS.ACCESS_TOKEN;
            } else if (requestInfo.requestType === this.REQUEST_TYPE.LOGIN) {
                token = requestInfo.parameters[self.CONSTANTS.ID_TOKEN];
                tokenType = self.CONSTANTS.ID_TOKEN;
            }

            var errorDesc = requestInfo.parameters[self.CONSTANTS.ERROR_DESCRIPTION];
            var error = requestInfo.parameters[self.CONSTANTS.ERROR];
            try {
                if (tokenReceivedCallback) {
                    tokenReceivedCallback(errorDesc, token, error, tokenType);
                }

            } catch (err) {
                self.error("Error occurred in user defined callback function: " + err);
            }

            if (window.parent === window && !isPopup) {
                if (self.config.navigateToLoginRequestUrl) {
                    window.location.href = self._getItem(self.CONSTANTS.STORAGE.LOGIN_REQUEST);
                } else window.location.hash = '';
            }
        }
    };

    /**
     * Constructs the authorization endpoint URL and returns it.
     * @ignore
     */
    AuthenticationContext.prototype._getNavigateUrl = function (responseType, resource) {
        var tenant = 'common';
        if (this.config.tenant) {
            tenant = this.config.tenant;
        }

        var urlNavigate = this.instance + tenant + '/oauth2/authorize' + this._serialize(responseType, this.config, resource) + this._addLibMetadata();
        this.info('Navigate url:' + urlNavigate);
        return urlNavigate;
    };

    /**
     * Returns the decoded id_token.
     * @ignore
     */
    AuthenticationContext.prototype._extractIdToken = function (encodedIdToken) {
        // id token will be decoded to get the username
        var decodedToken = this._decodeJwt(encodedIdToken);

        if (!decodedToken) {
            return null;
        }

        try {
            var base64IdToken = decodedToken.JWSPayload;
            var base64Decoded = this._base64DecodeStringUrlSafe(base64IdToken);

            if (!base64Decoded) {
                this.info('The returned id_token could not be base64 url safe decoded.');
                return null;
            }

            // ECMA script has JSON built-in support
            return JSON.parse(base64Decoded);
        } catch (err) {
            this.error('The returned id_token could not be decoded', err);
        }

        return null;
    };

    /**
     * Decodes a string of data which has been encoded using base-64 encoding.
     * @ignore
     */
    AuthenticationContext.prototype._base64DecodeStringUrlSafe = function (base64IdToken) {
        // html5 should support atob function for decoding
        base64IdToken = base64IdToken.replace(/-/g, '+').replace(/_/g, '/');

        if (window.atob) {
            return decodeURIComponent(escape(window.atob(base64IdToken))); // jshint ignore:line
        }
        else {
            return decodeURIComponent(escape(this._decode(base64IdToken)));
        }
    };

    //Take https://cdnjs.cloudflare.com/ajax/libs/Base64/0.3.0/base64.js and https://en.wikipedia.org/wiki/Base64 as reference. 
    AuthenticationContext.prototype._decode = function (base64IdToken) {
        var codes = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        base64IdToken = String(base64IdToken).replace(/=+$/, '');

        var length = base64IdToken.length;

        if (length % 4 === 1) {
            throw new Error('The token to be decoded is not correctly encoded.');
        }

        var h1, h2, h3, h4, bits, c1, c2, c3, decoded = '';

        for (var i = 0; i < length; i += 4) {
            //Every 4 base64 encoded character will be converted to 3 byte string, which is 24 bits
            // then 6 bits per base64 encoded character
            h1 = codes.indexOf(base64IdToken.charAt(i));
            h2 = codes.indexOf(base64IdToken.charAt(i + 1));
            h3 = codes.indexOf(base64IdToken.charAt(i + 2));
            h4 = codes.indexOf(base64IdToken.charAt(i + 3));

            // For padding, if last two are '='
            if (i + 2 === length - 1) {
                bits = h1 << 18 | h2 << 12 | h3 << 6;
                c1 = bits >> 16 & 255;
                c2 = bits >> 8 & 255;
                decoded += String.fromCharCode(c1, c2);
                break;
            }
            // if last one is '='
            else if (i + 1 === length - 1) {
                bits = h1 << 18 | h2 << 12
                c1 = bits >> 16 & 255;
                decoded += String.fromCharCode(c1);
                break;
            }

            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

            // then convert to 3 byte chars
            c1 = bits >> 16 & 255;
            c2 = bits >> 8 & 255;
            c3 = bits & 255;

            decoded += String.fromCharCode(c1, c2, c3);
        }

        return decoded;
    };

    /**
     * Decodes an id token into an object with header, payload and signature fields.
     * @ignore
     */
    // Adal.node js crack function
    AuthenticationContext.prototype._decodeJwt = function (jwtToken) {
        if (this._isEmpty(jwtToken)) {
            return null;
        };

        var idTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;

        var matches = idTokenPartsRegex.exec(jwtToken);

        if (!matches || matches.length < 4) {
            this.warn('The returned id_token is not parseable.');
            return null;
        }

        var crackedToken = {
            header: matches[1],
            JWSPayload: matches[2],
            JWSSig: matches[3]
        };

        return crackedToken;
    };

    /**
     * Converts string to represent binary data in ASCII string format by translating it into a radix-64 representation and returns it
     * @ignore
     */
    AuthenticationContext.prototype._convertUrlSafeToRegularBase64EncodedString = function (str) {
        return str.replace('-', '+').replace('_', '/');
    };

    /**
     * Serializes the parameters for the authorization endpoint URL and returns the serialized uri string.
     * @ignore
     */
    AuthenticationContext.prototype._serialize = function (responseType, obj, resource) {
        var str = [];

        if (obj !== null) {
            str.push('?response_type=' + responseType);
            str.push('client_id=' + encodeURIComponent(obj.clientId));
            if (resource) {
                str.push('resource=' + encodeURIComponent(resource));
            }

            str.push('redirect_uri=' + encodeURIComponent(obj.redirectUri));
            str.push('state=' + encodeURIComponent(obj.state));

            if (obj.hasOwnProperty('slice')) {
                str.push('slice=' + encodeURIComponent(obj.slice));
            }

            if (obj.hasOwnProperty('extraQueryParameter')) {
                str.push(obj.extraQueryParameter);
            }

            var correlationId = obj.correlationId ? obj.correlationId : this._guid();
            str.push('client-request-id=' + encodeURIComponent(correlationId));
        }

        return str.join('&');
    };

    /**
     * Parses the query string parameters into a key-value pair object.
     * @ignore
     */
    AuthenticationContext.prototype._deserialize = function (query) {
        var match,
            pl = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=([^&]*)/g,
            decode = function (s) {
                return decodeURIComponent(s.replace(pl, ' '));
            },
            obj = {};
        match = search.exec(query);

        while (match) {
            obj[decode(match[1])] = decode(match[2]);
            match = search.exec(query);
        }

        return obj;
    };

    /**
     * Converts decimal value to hex equivalent
     * @ignore
     */
    AuthenticationContext.prototype._decimalToHex = function (number) {
        var hex = number.toString(16);

        while (hex.length < 2) {
            hex = '0' + hex;
        }
        return hex;
    }

    /**
     * Generates RFC4122 version 4 guid (128 bits)
     * @ignore
     */
    /* jshint ignore:start */
    AuthenticationContext.prototype._guid = function () {
        // RFC4122: The version 4 UUID is meant for generating UUIDs from truly-random or
        // pseudo-random numbers.
        // The algorithm is as follows:
        //     Set the two most significant bits (bits 6 and 7) of the
        //        clock_seq_hi_and_reserved to zero and one, respectively.
        //     Set the four most significant bits (bits 12 through 15) of the
        //        time_hi_and_version field to the 4-bit version number from
        //        Section 4.1.3. Version4
        //     Set all the other bits to randomly (or pseudo-randomly) chosen
        //     values.
        // UUID                   = time-low "-" time-mid "-"time-high-and-version "-"clock-seq-reserved and low(2hexOctet)"-" node
        // time-low               = 4hexOctet
        // time-mid               = 2hexOctet
        // time-high-and-version  = 2hexOctet
        // clock-seq-and-reserved = hexOctet:
        // clock-seq-low          = hexOctet
        // node                   = 6hexOctet
        // Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
        // y could be 1000, 1001, 1010, 1011 since most significant two bits needs to be 10
        // y values are 8, 9, A, B
        var cryptoObj = window.crypto || window.msCrypto; // for IE 11
        if (cryptoObj && cryptoObj.getRandomValues) {
            var buffer = new Uint8Array(16);
            cryptoObj.getRandomValues(buffer);
            //buffer[6] and buffer[7] represents the time_hi_and_version field. We will set the four most significant bits (4 through 7) of buffer[6] to represent decimal number 4 (UUID version number).
            buffer[6] |= 0x40; //buffer[6] | 01000000 will set the 6 bit to 1.
            buffer[6] &= 0x4f; //buffer[6] & 01001111 will set the 4, 5, and 7 bit to 0 such that bits 4-7 == 0100 = "4".
            //buffer[8] represents the clock_seq_hi_and_reserved field. We will set the two most significant bits (6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively.
            buffer[8] |= 0x80; //buffer[8] | 10000000 will set the 7 bit to 1.
            buffer[8] &= 0xbf; //buffer[8] & 10111111 will set the 6 bit to 0.
            return this._decimalToHex(buffer[0]) + this._decimalToHex(buffer[1]) + this._decimalToHex(buffer[2]) + this._decimalToHex(buffer[3]) + '-' + this._decimalToHex(buffer[4]) + this._decimalToHex(buffer[5]) + '-' + this._decimalToHex(buffer[6]) + this._decimalToHex(buffer[7]) + '-' +
                this._decimalToHex(buffer[8]) + this._decimalToHex(buffer[9]) + '-' + this._decimalToHex(buffer[10]) + this._decimalToHex(buffer[11]) + this._decimalToHex(buffer[12]) + this._decimalToHex(buffer[13]) + this._decimalToHex(buffer[14]) + this._decimalToHex(buffer[15]);
        }
        else {
            var guidHolder = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
            var hex = '0123456789abcdef';
            var r = 0;
            var guidResponse = "";
            for (var i = 0; i < 36; i++) {
                if (guidHolder[i] !== '-' && guidHolder[i] !== '4') {
                    // each x and y needs to be random
                    r = Math.random() * 16 | 0;
                }
                if (guidHolder[i] === 'x') {
                    guidResponse += hex[r];
                } else if (guidHolder[i] === 'y') {
                    // clock-seq-and-reserved first hex is filtered and remaining hex values are random
                    r &= 0x3; // bit and with 0011 to set pos 2 to zero ?0??
                    r |= 0x8; // set pos 3 to 1 as 1???
                    guidResponse += hex[r];
                } else {
                    guidResponse += guidHolder[i];
                }
            }
            return guidResponse;
        }
    };
    /* jshint ignore:end */

    /**
     * Calculates the expires in value in milliseconds for the acquired token
     * @ignore
     */
    AuthenticationContext.prototype._expiresIn = function (expires) {
        // if AAD did not send "expires_in" property, use default expiration of 3599 seconds, for some reason AAD sends 3599 as "expires_in" value instead of 3600
        if (!expires) expires = 3599;
        return this._now() + parseInt(expires, 10);
    };

    /**
     * Return the number of milliseconds since 1970/01/01
     * @ignore
     */
    AuthenticationContext.prototype._now = function () {
        return Math.round(new Date().getTime() / 1000.0);
    };

    /**
     * Adds the hidden iframe for silent token renewal
     * @ignore
     */
    AuthenticationContext.prototype._addAdalFrame = function (iframeId) {
        if (typeof iframeId === 'undefined') {
            return;
        }

        this.info('Add adal frame to document:' + iframeId);
        var adalFrame = document.getElementById(iframeId);

        if (!adalFrame) {
            if (document.createElement && document.documentElement &&
                (window.opera || window.navigator.userAgent.indexOf('MSIE 5.0') === -1)) {
                var ifr = document.createElement('iframe');
                ifr.setAttribute('id', iframeId);
                ifr.setAttribute('aria-hidden', 'true');
                ifr.style.visibility = 'hidden';
                ifr.style.position = 'absolute';
                ifr.style.width = ifr.style.height = ifr.borderWidth = '0px';

                adalFrame = document.getElementsByTagName('body')[0].appendChild(ifr);
            }
            else if (document.body && document.body.insertAdjacentHTML) {
                document.body.insertAdjacentHTML('beforeEnd', '<iframe name="' + iframeId + '" id="' + iframeId + '" style="display:none"></iframe>');
            }
            if (window.frames && window.frames[iframeId]) {
                adalFrame = window.frames[iframeId];
            }
        }

        return adalFrame;
    };

    /**
     * Saves the key-value pair in the cache
     * @ignore
     */
    AuthenticationContext.prototype._saveItem = function (key, obj, preserve) {

        if (this.config && this.config.cacheLocation && this.config.cacheLocation === 'localStorage') {

            if (!this._supportsLocalStorage()) {
                this.info('Local storage is not supported');
                return false;
            }

            if (preserve) {
                var value = this._getItem(key) || '';
                localStorage.setItem(key, value + obj + this.CONSTANTS.CACHE_DELIMETER);
            }
            else {
                localStorage.setItem(key, obj);
            }

            return true;
        }

        // Default as session storage
        if (!this._supportsSessionStorage()) {
            this.info('Session storage is not supported');
            return false;
        }

        sessionStorage.setItem(key, obj);
        return true;
    };

    /**
     * Searches the value for the given key in the cache
     * @ignore
     */
    AuthenticationContext.prototype._getItem = function (key) {

        if (this.config && this.config.cacheLocation && this.config.cacheLocation === 'localStorage') {

            if (!this._supportsLocalStorage()) {
                this.info('Local storage is not supported');
                return null;
            }

            return localStorage.getItem(key);
        }

        // Default as session storage
        if (!this._supportsSessionStorage()) {
            this.info('Session storage is not supported');
            return null;
        }

        return sessionStorage.getItem(key);
    };

    /**
     * Returns true if browser supports localStorage, false otherwise.
     * @ignore
     */
    AuthenticationContext.prototype._supportsLocalStorage = function () {
        try {
            if (!window.localStorage) return false; // Test availability
            window.localStorage.setItem('storageTest', 'A'); // Try write
            if (window.localStorage.getItem('storageTest') != 'A') return false; // Test read/write
            window.localStorage.removeItem('storageTest'); // Try delete
            if (window.localStorage.getItem('storageTest')) return false; // Test delete
            return true; // Success
        } catch (e) {
            return false;
        }
    };

    /**
     * Returns true if browser supports sessionStorage, false otherwise.
     * @ignore
     */
    AuthenticationContext.prototype._supportsSessionStorage = function () {
        try {
            if (!window.sessionStorage) return false; // Test availability
            window.sessionStorage.setItem('storageTest', 'A'); // Try write
            if (window.sessionStorage.getItem('storageTest') != 'A') return false; // Test read/write
            window.sessionStorage.removeItem('storageTest'); // Try delete
            if (window.sessionStorage.getItem('storageTest')) return false; // Test delete
            return true; // Success
        } catch (e) {
            return false;
        }
    };

    /**
     * Returns a cloned copy of the passed object.
     * @ignore
     */
    AuthenticationContext.prototype._cloneConfig = function (obj) {
        if (null === obj || 'object' !== typeof obj) {
            return obj;
        }

        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = obj[attr];
            }
        }
        return copy;
    };

    /**
     * Adds the library version and returns it.
     * @ignore
     */
    AuthenticationContext.prototype._addLibMetadata = function () {
        // x-client-SKU
        // x-client-Ver
        return '&x-client-SKU=Js&x-client-Ver=' + this._libVersion();
    };

    /**
     * Checks the Logging Level, constructs the Log message and logs it. Users need to implement/override this method to turn on Logging. 
     * @param {number} level  -  Level can be set 0,1,2 and 3 which turns on 'error', 'warning', 'info' or 'verbose' level logging respectively.
     * @param {string} message  -  Message to log.
     * @param {string} error  -  Error to log.
     */
    AuthenticationContext.prototype.log = function (level, message, error, containsPii) {

        if (level <= Logging.level) {

            if (!Logging.piiLoggingEnabled && containsPii)
                return;

            var timestamp = new Date().toUTCString();
            var formattedMessage = '';

            if (this.config.correlationId)
                formattedMessage = timestamp + ':' + this.config.correlationId + '-' + this._libVersion() + '-' + this.CONSTANTS.LEVEL_STRING_MAP[level] + ' ' + message;
            else
                formattedMessage = timestamp + ':' + this._libVersion() + '-' + this.CONSTANTS.LEVEL_STRING_MAP[level] + ' ' + message;

            if (error) {
                formattedMessage += '\nstack:\n' + error.stack;
            }

            Logging.log(formattedMessage);
        }
    };

    /**
     * Logs messages when Logging Level is set to 0.
     * @param {string} message  -  Message to log.
     * @param {string} error  -  Error to log.
     */
    AuthenticationContext.prototype.error = function (message, error) {
        this.log(this.CONSTANTS.LOGGING_LEVEL.ERROR, message, error);
    };

    /**
     * Logs messages when Logging Level is set to 1.
     * @param {string} message  -  Message to log.
     */
    AuthenticationContext.prototype.warn = function (message) {
        this.log(this.CONSTANTS.LOGGING_LEVEL.WARN, message, null);
    };

    /**
     * Logs messages when Logging Level is set to 2.
     * @param {string} message  -  Message to log.
     */
    AuthenticationContext.prototype.info = function (message) {
        this.log(this.CONSTANTS.LOGGING_LEVEL.INFO, message, null);
    };

    /**
     * Logs messages when Logging Level is set to 3.
     * @param {string} message  -  Message to log.
     */
    AuthenticationContext.prototype.verbose = function (message) {
        this.log(this.CONSTANTS.LOGGING_LEVEL.VERBOSE, message, null);
    };

    /**
    * Logs Pii messages when Logging Level is set to 0 and window.piiLoggingEnabled is set to true.
    * @param {string} message  -  Message to log.
    * @param {string} error  -  Error to log.
    */
    AuthenticationContext.prototype.errorPii = function (message, error) {
        this.log(this.CONSTANTS.LOGGING_LEVEL.ERROR, message, error, true);
    };

    /**
     * Logs  Pii messages when Logging Level is set to 1 and window.piiLoggingEnabled is set to true.
     * @param {string} message  -  Message to log.
     */
    AuthenticationContext.prototype.warnPii = function (message) {
        this.log(this.CONSTANTS.LOGGING_LEVEL.WARN, message, null, true);
    };

    /**
     * Logs messages when Logging Level is set to 2 and window.piiLoggingEnabled is set to true.
     * @param {string} message  -  Message to log.
     */
    AuthenticationContext.prototype.infoPii = function (message) {
        this.log(this.CONSTANTS.LOGGING_LEVEL.INFO, message, null, true);
    };

    /**
     * Logs messages when Logging Level is set to 3 and window.piiLoggingEnabled is set to true.
     * @param {string} message  -  Message to log.
     */
    AuthenticationContext.prototype.verbosePii = function (message) {
        this.log(this.CONSTANTS.LOGGING_LEVEL.VERBOSE, message, null, true);
    };
    /**
     * Returns the library version.
     * @ignore
     */
    AuthenticationContext.prototype._libVersion = function () {
        return '1.0.17';
    };

    /**
     * Returns a reference of Authentication Context as a result of a require call.
     * @ignore
     */
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = AuthenticationContext;
        module.exports.inject = function (conf) {
            return new AuthenticationContext(conf);
        };
    }

    return AuthenticationContext;

}());


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CachedDigest */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DigestCache; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pnp_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pnp_odata__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_splibconfig__ = __webpack_require__(8);



var CachedDigest = /** @class */ (function () {
    function CachedDigest() {
    }
    return CachedDigest;
}());

// allows for the caching of digests across all HttpClient's which each have their own DigestCache wrapper.
var digests = new __WEBPACK_IMPORTED_MODULE_0__pnp_common__["a" /* Dictionary */]();
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
        var url = Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["e" /* combinePaths */])(webUrl, "/_api/contextinfo");
        var headers = {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose;charset=utf-8",
        };
        return this._httpClient.fetchRaw(url, {
            cache: "no-cache",
            credentials: "same-origin",
            headers: Object(__WEBPACK_IMPORTED_MODULE_0__pnp_common__["g" /* extend */])(headers, __WEBPACK_IMPORTED_MODULE_2__config_splibconfig__["a" /* SPRuntimeConfig */].headers, true),
            method: "POST",
        }).then(function (response) {
            var parser = new __WEBPACK_IMPORTED_MODULE_1__pnp_odata__["e" /* ODataDefaultParser */]();
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

//# sourceMappingURL=digestcache.js.map

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AttachmentFiles; });
/* unused harmony export AttachmentFile */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pnp_odata__ = __webpack_require__(5);



/**
 * Describes a collection of Item objects
 *
 */
var AttachmentFiles = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](AttachmentFiles, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a single attachment file instance
 *
 */
var AttachmentFile = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](AttachmentFile, _super);
    function AttachmentFile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the contents of the file as text
     *
     */
    AttachmentFile.prototype.getText = function () {
        return this.getParsed(new __WEBPACK_IMPORTED_MODULE_2__pnp_odata__["h" /* TextParser */]());
    };
    /**
     * Gets the contents of the file as a blob, does not work in Node.js
     *
     */
    AttachmentFile.prototype.getBlob = function () {
        return this.getParsed(new __WEBPACK_IMPORTED_MODULE_2__pnp_odata__["a" /* BlobParser */]());
    };
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js
     */
    AttachmentFile.prototype.getBuffer = function () {
        return this.getParsed(new __WEBPACK_IMPORTED_MODULE_2__pnp_odata__["b" /* BufferParser */]());
    };
    /**
     * Gets the contents of a file as an ArrayBuffer, works in Node.js
     */
    AttachmentFile.prototype.getJSON = function () {
        return this.getParsed(new __WEBPACK_IMPORTED_MODULE_2__pnp_odata__["c" /* JSONParser */]());
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
    AttachmentFile.prototype.getParsed = function (parser) {
        return this.clone(AttachmentFile, "$value", false).get(parser);
    };
    return AttachmentFile;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

//# sourceMappingURL=attachmentfiles.js.map

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Views; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return View; });
/* unused harmony export ViewFields */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pnp_common__ = __webpack_require__(2);



/**
 * Describes the views available in the current context
 *
 */
var Views = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Views, _super);
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
        var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({
            "PersonalView": personalView,
            "Title": title,
            "__metadata": { "type": "SP.View" },
        }, additionalSettings));
        return this.clone(Views, null).postCore({ body: postBody }).then(function (data) {
            return {
                data: data,
                view: _this.getById(data.Id),
            };
        });
    };
    return Views;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a single View instance
 *
 */
var View = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](View, _super);
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
        var postBody = JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_2__pnp_common__["g" /* extend */])({
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
        return this.clone(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["a" /* SharePointQueryable */], "renderashtml").get();
    };
    return View;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

var ViewFields = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](ViewFields, _super);
    function ViewFields(baseUrl, path) {
        if (path === void 0) { path = "viewfields"; }
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Gets a value that specifies the XML schema that represents the collection.
     */
    ViewFields.prototype.getSchemaXml = function () {
        return this.clone(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["a" /* SharePointQueryable */], "schemaxml").get();
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

//# sourceMappingURL=views.js.map

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Forms; });
/* unused harmony export Form */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);


/**
 * Describes a collection of Field objects
 *
 */
var Forms = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Forms, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a single of Form instance
 *
 */
var Form = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Form, _super);
    function Form() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Form;
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

//# sourceMappingURL=forms.js.map

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscriptions; });
/* unused harmony export Subscription */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);


/**
 * Describes a collection of webhook subscriptions
 *
 */
var Subscriptions = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Subscriptions, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["b" /* SharePointQueryableCollection */]));

/**
 * Describes a single webhook subscription instance
 *
 */
var Subscription = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](Subscription, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["c" /* SharePointQueryableInstance */]));

//# sourceMappingURL=subscriptions.js.map

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SPRest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return sp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__search__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__searchsuggest__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__site__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__webs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userprofiles__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__navigation__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__social__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utilities__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__config_splibconfig__ = __webpack_require__(8);









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
    function SPRest(_options, _baseUrl) {
        if (_options === void 0) { _options = {}; }
        if (_baseUrl === void 0) { _baseUrl = ""; }
        this._options = _options;
        this._baseUrl = _baseUrl;
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
     * Global SharePoint configuration options
     *
     * @param config The SharePoint configuration to apply
     */
    SPRest.prototype.setup = function (config) {
        Object(__WEBPACK_IMPORTED_MODULE_8__config_splibconfig__["b" /* setup */])(config);
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
        return this.create(__WEBPACK_IMPORTED_MODULE_1__searchsuggest__["a" /* SearchSuggest */]).execute(finalQuery);
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
        else if (query instanceof __WEBPACK_IMPORTED_MODULE_0__search__["e" /* SearchQueryBuilder */]) {
            finalQuery = query.toSearchQuery();
        }
        else {
            finalQuery = query;
        }
        return this.create(__WEBPACK_IMPORTED_MODULE_0__search__["c" /* Search */]).execute(finalQuery);
    };
    Object.defineProperty(SPRest.prototype, "site", {
        /**
         * Begins a site collection scoped REST request
         *
         */
        get: function () {
            return this.create(__WEBPACK_IMPORTED_MODULE_2__site__["a" /* Site */]);
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
            return this.create(__WEBPACK_IMPORTED_MODULE_3__webs__["a" /* Web */]);
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
            return this.create(__WEBPACK_IMPORTED_MODULE_4__userprofiles__["a" /* UserProfileQuery */]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRest.prototype, "social", {
        /**
         * Access to social methods
         */
        get: function () {
            return this.create(__WEBPACK_IMPORTED_MODULE_6__social__["e" /* SocialQuery */]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SPRest.prototype, "navigation", {
        /**
         * Access to the site collection level navigation service
         */
        get: function () {
            return new __WEBPACK_IMPORTED_MODULE_5__navigation__["d" /* NavigationService */]();
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
            return this.create(__WEBPACK_IMPORTED_MODULE_7__utilities__["a" /* UtilityMethod */], "");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handles creating and configuring the objects returned from this class
     *
     * @param fm The factory method used to create the instance
     * @param path Optional additional path information to pass to the factory method
     */
    SPRest.prototype.create = function (fm, path) {
        return new fm(this._baseUrl, path).configure(this._options);
    };
    return SPRest;
}());

var sp = new SPRest();
//# sourceMappingURL=rest.js.map

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelatedItemManagerImpl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__ = __webpack_require__(1);


var RelatedItemManagerImpl = /** @class */ (function (_super) {
    __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __extends */](RelatedItemManagerImpl, _super);
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
}(__WEBPACK_IMPORTED_MODULE_1__sharepointqueryable__["a" /* SharePointQueryable */]));

//# sourceMappingURL=relateditems.js.map

/***/ })
/******/ ]);
});
//# sourceMappingURL=sp.es5.umd.bundle.js.map