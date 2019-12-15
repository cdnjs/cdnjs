/**
 * @license
 * v1.2.10-5
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2019 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https://github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pnp.graph"] = factory();
	else
		root["pnp.graph"] = factory();
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./build/packages-es5/graph/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/packages-es5/common/index.js":
/*!********************************************!*\
  !*** ./build/packages-es5/common/index.js ***!
  \********************************************/
/*! exports provided: AdalClient, SPFxAdalClient, objectToMap, mergeMaps, setup, RuntimeConfigImpl, RuntimeConfig, mergeHeaders, mergeOptions, FetchClient, BearerTokenFetchClient, PnPClientStorageWrapper, PnPClientStorage, getCtxCallback, dateAdd, combine, getRandomString, getGUID, isFunc, objectDefinedNotNull, isArray, extend, isUrlAbsolute, stringIsNullOrEmpty, getAttrValueFromString, sanitizeGuid, jsS, hOP, getHashCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./build/packages-es5/common/src/common.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AdalClient", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["AdalClient"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPFxAdalClient", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["SPFxAdalClient"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "objectToMap", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["objectToMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeMaps", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["mergeMaps"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["setup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RuntimeConfigImpl", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["RuntimeConfigImpl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RuntimeConfig", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["RuntimeConfig"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeHeaders", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["mergeHeaders"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeOptions", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["mergeOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FetchClient", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["FetchClient"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BearerTokenFetchClient", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["BearerTokenFetchClient"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PnPClientStorageWrapper", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["PnPClientStorageWrapper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PnPClientStorage", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["PnPClientStorage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getCtxCallback", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["getCtxCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dateAdd", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["dateAdd"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "combine", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["combine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRandomString", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["getRandomString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getGUID", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["getGUID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isFunc", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["isFunc"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "objectDefinedNotNull", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["objectDefinedNotNull"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["isArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["extend"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isUrlAbsolute", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["isUrlAbsolute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringIsNullOrEmpty", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["stringIsNullOrEmpty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAttrValueFromString", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["getAttrValueFromString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sanitizeGuid", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["sanitizeGuid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "jsS", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["jsS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hOP", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["hOP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getHashCode", function() { return _src_common__WEBPACK_IMPORTED_MODULE_0__["getHashCode"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./build/packages-es5/common/src/adalclient.js":
/*!*****************************************************!*\
  !*** ./build/packages-es5/common/src/adalclient.js ***!
  \*****************************************************/
/*! exports provided: AdalClient, SPFxAdalClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdalClient", function() { return AdalClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPFxAdalClient", function() { return SPFxAdalClient; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _netutil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./netutil */ "./build/packages-es5/common/src/netutil.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util */ "./build/packages-es5/common/src/util.js");
/* harmony import */ var adal_angular_dist_adal_min_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! adal-angular/dist/adal.min.js */ "./node_modules/adal-angular/dist/adal.min.js");
/* harmony import */ var adal_angular_dist_adal_min_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(adal_angular_dist_adal_min_js__WEBPACK_IMPORTED_MODULE_3__);



// @ts-ignore

/**
 * Parses out the root of the request url to use as the resource when getting the token
 *
 * After: https://gist.github.com/jlong/2428561
 * @param url The url to parse
 */
function getResource(url) {
    var parser = document.createElement("a");
    parser.href = url;
    return parser.protocol + "//" + parser.hostname;
}
/**
 * Azure AD Client for use in the browser
 */
var AdalClient = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AdalClient, _super);
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
        _this._displayCallback = null;
        _this._loginPromise = null;
        return _this;
    }
    /**
     * Creates a new AdalClient using the values of the supplied SPFx context (requires SPFx >= 1.6)
     *
     * @param spfxContext Current SPFx context
     * @description Using this method requires that the features described in this article
     * https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aadhttpclient are activated in the tenant.
     */
    AdalClient.fromSPFxContext = function (spfxContext) {
        return new SPFxAdalClient(spfxContext);
    };
    /**
     * Conducts the fetch opertation against the AAD secured resource
     *
     * @param url Absolute URL for the request
     * @param options Any fetch options passed to the underlying fetch implementation
     */
    AdalClient.prototype.fetch = function (url, options) {
        var _this = this;
        if (!Object(_util__WEBPACK_IMPORTED_MODULE_2__["isUrlAbsolute"])(url)) {
            throw Error("You must supply absolute urls to AdalClient.fetch.");
        }
        // the url we are calling is the resource
        return this.getToken(getResource(url)).then(function (token) {
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
                        return reject(Error(message));
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
                AdalClient._authContext = adal_angular_dist_adal_min_js__WEBPACK_IMPORTED_MODULE_3__["inject"]({
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
                    return reject(Error("Could not open pop-up window for auth. Likely pop-ups are blocked by the browser."));
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
     * Our auth context
     */
    AdalClient._authContext = null;
    return AdalClient;
}(_netutil__WEBPACK_IMPORTED_MODULE_1__["BearerTokenFetchClient"]));

/**
 * Client wrapping the aadTokenProvider available from SPFx >= 1.6
 */
var SPFxAdalClient = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SPFxAdalClient, _super);
    /**
     *
     * @param context provide the appropriate SPFx Context object
     */
    function SPFxAdalClient(context) {
        var _this = _super.call(this, null) || this;
        _this.context = context;
        return _this;
    }
    /**
     * Executes a fetch request using the supplied url and options
     *
     * @param url Absolute url of the request
     * @param options Any options
     */
    SPFxAdalClient.prototype.fetch = function (url, options) {
        var _this = this;
        return this.getToken(getResource(url)).then(function (token) {
            _this.token = token;
            return _super.prototype.fetch.call(_this, url, options);
        });
    };
    /**
     * Gets an AAD token for the provided resource using the SPFx AADTokenProvider
     *
     * @param resource Resource for which a token is to be requested (ex: https://graph.microsoft.com)
     */
    SPFxAdalClient.prototype.getToken = function (resource) {
        return this.context.aadTokenProviderFactory.getTokenProvider().then(function (provider) {
            return provider.getToken(resource);
        });
    };
    return SPFxAdalClient;
}(_netutil__WEBPACK_IMPORTED_MODULE_1__["BearerTokenFetchClient"]));

//# sourceMappingURL=adalclient.js.map

/***/ }),

/***/ "./build/packages-es5/common/src/collections.js":
/*!******************************************************!*\
  !*** ./build/packages-es5/common/src/collections.js ***!
  \******************************************************/
/*! exports provided: objectToMap, mergeMaps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objectToMap", function() { return objectToMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeMaps", function() { return mergeMaps; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./build/packages-es5/common/src/util.js");

/**
 * Used to calculate the object properties, with polyfill if needed
 */
var objectEntries = Object(_util__WEBPACK_IMPORTED_MODULE_0__["isFunc"])(Object.entries) ? Object.entries : function (o) { return Object.keys(o).map(function (k) { return [k, o[k]]; }); };
/**
 * Converts the supplied object to a map
 *
 * @param o The object to map
 */
function objectToMap(o) {
    if (o !== undefined && o !== null) {
        return new Map(objectEntries(o));
    }
    return new Map();
}
/**
 * Merges to Map instances together, overwriting values in target with matching keys, last in wins
 *
 * @param target map into which the other maps are merged
 * @param maps One or more maps to merge into the target
 */
function mergeMaps(target) {
    var maps = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        maps[_i - 1] = arguments[_i];
    }
    for (var i = 0; i < maps.length; i++) {
        maps[i].forEach(function (v, k) {
            target.set(k, v);
        });
    }
    return target;
}
//# sourceMappingURL=collections.js.map

/***/ }),

/***/ "./build/packages-es5/common/src/common.js":
/*!*************************************************!*\
  !*** ./build/packages-es5/common/src/common.js ***!
  \*************************************************/
/*! exports provided: AdalClient, SPFxAdalClient, objectToMap, mergeMaps, setup, RuntimeConfigImpl, RuntimeConfig, mergeHeaders, mergeOptions, FetchClient, BearerTokenFetchClient, PnPClientStorageWrapper, PnPClientStorage, getCtxCallback, dateAdd, combine, getRandomString, getGUID, isFunc, objectDefinedNotNull, isArray, extend, isUrlAbsolute, stringIsNullOrEmpty, getAttrValueFromString, sanitizeGuid, jsS, hOP, getHashCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adalclient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adalclient */ "./build/packages-es5/common/src/adalclient.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AdalClient", function() { return _adalclient__WEBPACK_IMPORTED_MODULE_0__["AdalClient"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPFxAdalClient", function() { return _adalclient__WEBPACK_IMPORTED_MODULE_0__["SPFxAdalClient"]; });

/* harmony import */ var _collections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collections */ "./build/packages-es5/common/src/collections.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "objectToMap", function() { return _collections__WEBPACK_IMPORTED_MODULE_1__["objectToMap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeMaps", function() { return _collections__WEBPACK_IMPORTED_MODULE_1__["mergeMaps"]; });

/* harmony import */ var _libconfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./libconfig */ "./build/packages-es5/common/src/libconfig.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return _libconfig__WEBPACK_IMPORTED_MODULE_2__["setup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RuntimeConfigImpl", function() { return _libconfig__WEBPACK_IMPORTED_MODULE_2__["RuntimeConfigImpl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RuntimeConfig", function() { return _libconfig__WEBPACK_IMPORTED_MODULE_2__["RuntimeConfig"]; });

/* harmony import */ var _netutil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./netutil */ "./build/packages-es5/common/src/netutil.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeHeaders", function() { return _netutil__WEBPACK_IMPORTED_MODULE_3__["mergeHeaders"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeOptions", function() { return _netutil__WEBPACK_IMPORTED_MODULE_3__["mergeOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FetchClient", function() { return _netutil__WEBPACK_IMPORTED_MODULE_3__["FetchClient"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BearerTokenFetchClient", function() { return _netutil__WEBPACK_IMPORTED_MODULE_3__["BearerTokenFetchClient"]; });

/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./storage */ "./build/packages-es5/common/src/storage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PnPClientStorageWrapper", function() { return _storage__WEBPACK_IMPORTED_MODULE_4__["PnPClientStorageWrapper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PnPClientStorage", function() { return _storage__WEBPACK_IMPORTED_MODULE_4__["PnPClientStorage"]; });

/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util */ "./build/packages-es5/common/src/util.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getCtxCallback", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["getCtxCallback"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dateAdd", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["dateAdd"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "combine", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["combine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRandomString", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["getRandomString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getGUID", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["getGUID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isFunc", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["isFunc"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "objectDefinedNotNull", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["objectDefinedNotNull"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["isArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["extend"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isUrlAbsolute", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["isUrlAbsolute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringIsNullOrEmpty", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["stringIsNullOrEmpty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getAttrValueFromString", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["getAttrValueFromString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sanitizeGuid", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["sanitizeGuid"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "jsS", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["jsS"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hOP", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["hOP"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getHashCode", function() { return _util__WEBPACK_IMPORTED_MODULE_5__["getHashCode"]; });







//# sourceMappingURL=common.js.map

/***/ }),

/***/ "./build/packages-es5/common/src/libconfig.js":
/*!****************************************************!*\
  !*** ./build/packages-es5/common/src/libconfig.js ***!
  \****************************************************/
/*! exports provided: setup, RuntimeConfigImpl, RuntimeConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuntimeConfigImpl", function() { return RuntimeConfigImpl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RuntimeConfig", function() { return RuntimeConfig; });
/* harmony import */ var _collections__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./collections */ "./build/packages-es5/common/src/collections.js");

function setup(config) {
    RuntimeConfig.extend(config);
}
// lable mapping for known config values
var s = [
    "defaultCachingStore",
    "defaultCachingTimeoutSeconds",
    "globalCacheDisable",
    "enableCacheExpiration",
    "cacheExpirationIntervalMilliseconds",
    "spfxContext",
];
var RuntimeConfigImpl = /** @class */ (function () {
    function RuntimeConfigImpl(_v) {
        if (_v === void 0) { _v = new Map(); }
        this._v = _v;
        // setup defaults
        this._v.set(s[0], "session");
        this._v.set(s[1], 60);
        this._v.set(s[2], false);
        this._v.set(s[3], false);
        this._v.set(s[4], 750);
        this._v.set(s[5], null);
    }
    /**
     *
     * @param config The set of properties to add to the globa configuration instance
     */
    RuntimeConfigImpl.prototype.extend = function (config) {
        this._v = Object(_collections__WEBPACK_IMPORTED_MODULE_0__["mergeMaps"])(this._v, Object(_collections__WEBPACK_IMPORTED_MODULE_0__["objectToMap"])(config));
    };
    RuntimeConfigImpl.prototype.get = function (key) {
        return this._v.get(key);
    };
    Object.defineProperty(RuntimeConfigImpl.prototype, "defaultCachingStore", {
        get: function () {
            return this.get(s[0]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "defaultCachingTimeoutSeconds", {
        get: function () {
            return this.get(s[1]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "globalCacheDisable", {
        get: function () {
            return this.get(s[2]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "enableCacheExpiration", {
        get: function () {
            return this.get(s[3]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "cacheExpirationIntervalMilliseconds", {
        get: function () {
            return this.get(s[4]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeConfigImpl.prototype, "spfxContext", {
        get: function () {
            return this.get(s[5]);
        },
        enumerable: true,
        configurable: true
    });
    return RuntimeConfigImpl;
}());

var _runtimeConfig = new RuntimeConfigImpl();
var RuntimeConfig = _runtimeConfig;
//# sourceMappingURL=libconfig.js.map

/***/ }),

/***/ "./build/packages-es5/common/src/netutil.js":
/*!**************************************************!*\
  !*** ./build/packages-es5/common/src/netutil.js ***!
  \**************************************************/
/*! exports provided: mergeHeaders, mergeOptions, FetchClient, BearerTokenFetchClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeHeaders", function() { return mergeHeaders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeOptions", function() { return mergeOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchClient", function() { return FetchClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BearerTokenFetchClient", function() { return BearerTokenFetchClient; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./build/packages-es5/common/src/util.js");


function mergeHeaders(target, source) {
    if (source !== undefined && source !== null) {
        var temp = new Request("", { headers: source });
        temp.headers.forEach(function (value, name) {
            target.append(name, value);
        });
    }
}
function mergeOptions(target, source) {
    if (Object(_util__WEBPACK_IMPORTED_MODULE_1__["objectDefinedNotNull"])(source)) {
        var headers = Object(_util__WEBPACK_IMPORTED_MODULE_1__["extend"])(target.headers || {}, source.headers);
        target = Object(_util__WEBPACK_IMPORTED_MODULE_1__["extend"])(target, source);
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
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BearerTokenFetchClient, _super);
    function BearerTokenFetchClient(_token) {
        var _this = _super.call(this) || this;
        _this._token = _token;
        return _this;
    }
    Object.defineProperty(BearerTokenFetchClient.prototype, "token", {
        get: function () {
            return this._token || "";
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

//# sourceMappingURL=netutil.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./build/packages-es5/common/src/storage.js":
/*!**************************************************!*\
  !*** ./build/packages-es5/common/src/storage.js ***!
  \**************************************************/
/*! exports provided: PnPClientStorageWrapper, PnPClientStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PnPClientStorageWrapper", function() { return PnPClientStorageWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PnPClientStorage", function() { return PnPClientStorage; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./build/packages-es5/common/src/util.js");
/* harmony import */ var _libconfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./libconfig */ "./build/packages-es5/common/src/libconfig.js");


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
        if (_libconfig__WEBPACK_IMPORTED_MODULE_1__["RuntimeConfig"].enableCacheExpiration) {
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
        if (!Object(_util__WEBPACK_IMPORTED_MODULE_0__["objectDefinedNotNull"])(o)) {
            return null;
        }
        var persistable = JSON.parse(o);
        if (new Date(persistable.expiration) <= new Date()) {
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
        var str = "t";
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
        if (expire === undefined) {
            // ensure we are by default inline with the global library setting
            var defaultTimeout = _libconfig__WEBPACK_IMPORTED_MODULE_1__["RuntimeConfig"].defaultCachingTimeoutSeconds;
            if (this.defaultTimeoutMinutes > 0) {
                defaultTimeout = this.defaultTimeoutMinutes * 60;
            }
            expire = Object(_util__WEBPACK_IMPORTED_MODULE_0__["dateAdd"])(new Date(), "second", defaultTimeout);
        }
        return Object(_util__WEBPACK_IMPORTED_MODULE_0__["jsS"])({ pnp: 1, expiration: expire, value: o });
    };
    /**
     * Deletes expired items added by this library in this.store and sets a timeout to call itself
     */
    PnPClientStorageWrapper.prototype.cacheExpirationHandler = function () {
        var _this = this;
        this.deleteExpired().then(function (_) {
            // call ourself in the future
            setTimeout(Object(_util__WEBPACK_IMPORTED_MODULE_0__["getCtxCallback"])(_this, _this.cacheExpirationHandler), _libconfig__WEBPACK_IMPORTED_MODULE_1__["RuntimeConfig"].cacheExpirationIntervalMilliseconds);
        }).catch(function (e) {
            console.error(e);
        });
    };
    return PnPClientStorageWrapper;
}());

/**
 * A thin implementation of in-memory storage for use in nodejs
 */
var MemoryStorage = /** @class */ (function () {
    function MemoryStorage(_store) {
        if (_store === void 0) { _store = new Map(); }
        this._store = _store;
    }
    Object.defineProperty(MemoryStorage.prototype, "length", {
        get: function () {
            return this._store.size;
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
        return Array.from(this._store)[index][0];
    };
    MemoryStorage.prototype.removeItem = function (key) {
        this._store.delete(key);
    };
    MemoryStorage.prototype.setItem = function (key, data) {
        this._store.set(key, data);
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
                this._local = this.getStore("local");
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
                this._session = this.getStore("session");
            }
            return this._session;
        },
        enumerable: true,
        configurable: true
    });
    PnPClientStorage.prototype.getStore = function (name) {
        if (name === "local") {
            return new PnPClientStorageWrapper(typeof (localStorage) === "undefined" ? new MemoryStorage() : localStorage);
        }
        return new PnPClientStorageWrapper(typeof (sessionStorage) === "undefined" ? new MemoryStorage() : sessionStorage);
    };
    return PnPClientStorage;
}());

//# sourceMappingURL=storage.js.map

/***/ }),

/***/ "./build/packages-es5/common/src/util.js":
/*!***********************************************!*\
  !*** ./build/packages-es5/common/src/util.js ***!
  \***********************************************/
/*! exports provided: getCtxCallback, dateAdd, combine, getRandomString, getGUID, isFunc, objectDefinedNotNull, isArray, extend, isUrlAbsolute, stringIsNullOrEmpty, getAttrValueFromString, sanitizeGuid, jsS, hOP, getHashCode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCtxCallback", function() { return getCtxCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateAdd", function() { return dateAdd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combine", function() { return combine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomString", function() { return getRandomString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGUID", function() { return getGUID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunc", function() { return isFunc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objectDefinedNotNull", function() { return objectDefinedNotNull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUrlAbsolute", function() { return isUrlAbsolute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringIsNullOrEmpty", function() { return stringIsNullOrEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAttrValueFromString", function() { return getAttrValueFromString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sanitizeGuid", function() { return sanitizeGuid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsS", function() { return jsS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hOP", function() { return hOP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHashCode", function() { return getHashCode; });
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
function combine() {
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
 * https://stackoverflow.com/a/8809472 updated to prevent collisions.
 */
/* tslint:disable no-bitwise */
function getGUID() {
    var d = Date.now();
    if (typeof performance !== "undefined" && typeof performance.now === "function") {
        d += performance.now(); // use high-precision timer if available
    }
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
    if (filter === void 0) { filter = function () { return true; }; }
    if (!objectDefinedNotNull(source)) {
        return target;
    }
    // ensure we don't overwrite things we don't want overwritten
    var check = noOverwrite ? function (o, i) { return !(i in o); } : function () { return true; };
    // final filter we will use
    var f = function (v) { return check(target, v) && filter(v); };
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
    return s === undefined || s === null || s.length < 1;
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
/**
 * Shorthand for JSON.stringify
 *
 * @param o Any type of object
 */
function jsS(o) {
    return JSON.stringify(o);
}
/**
 * Shorthand for Object.hasOwnProperty
 *
 * @param o Object to check for
 * @param p Name of the property
 */
function hOP(o, p) {
    return Object.hasOwnProperty.call(o, p);
}
/**
 * Generates a ~unique hash code
 *
 * From: https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 */
// tslint:disable:no-bitwise
function getHashCode(s) {
    var hash = 0;
    if (s.length === 0) {
        return hash;
    }
    for (var i = 0; i < s.length; i++) {
        var chr = s.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}
// tslint:enable:no-bitwise
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "./build/packages-es5/graph/index.js":
/*!*******************************************!*\
  !*** ./build/packages-es5/graph/index.js ***!
  \*******************************************/
/*! exports provided: graph, GraphRest, GroupType, Group, Groups, GraphBatch, GraphQueryable, GraphQueryableCollection, GraphQueryableInstance, GraphQueryableSearchableCollection, Teams, Team, Channels, Channel, Apps, Tabs, Tab, GraphEndpoints, OneNote, Notebooks, Notebook, Sections, Section, Pages, Contacts, Contact, ContactFolders, ContactFolder, Drives, Drive, Root, DriveItems, DriveItem, Children, DriveList, Recent, SharedWithMe, DriveSearch, Thumbnails, Planner, Plans, Plan, Tasks, Task, Buckets, Bucket, Details, DirectoryObjectType, DirectoryObjects, DirectoryObject, Invitations, Subscriptions, Subscription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/graph */ "./build/packages-es5/graph/src/graph.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "graph", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["graph"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphRest", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["GraphRest"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupType", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["GroupType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Group", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Group"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Groups", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Groups"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphBatch", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["GraphBatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphQueryable", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["GraphQueryable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphQueryableCollection", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["GraphQueryableCollection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphQueryableInstance", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["GraphQueryableInstance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphQueryableSearchableCollection", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["GraphQueryableSearchableCollection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Teams", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Teams"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Team", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Team"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Channels", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Channels"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Channel", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Channel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Apps", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Apps"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tabs", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Tabs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tab", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Tab"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphEndpoints", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["GraphEndpoints"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OneNote", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["OneNote"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Notebooks", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Notebooks"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Notebook", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Notebook"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sections", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Sections"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Section", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Section"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pages", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Pages"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Contacts", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Contacts"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Contact", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Contact"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContactFolders", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["ContactFolders"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContactFolder", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["ContactFolder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Drives", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Drives"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Drive", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Drive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Root", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Root"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DriveItems", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["DriveItems"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DriveItem", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["DriveItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Children"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DriveList", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["DriveList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Recent", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Recent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SharedWithMe", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["SharedWithMe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DriveSearch", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["DriveSearch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Thumbnails", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Thumbnails"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Planner", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Planner"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Plans", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Plans"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Plan", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Plan"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tasks", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Tasks"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Task", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Task"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Buckets", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Buckets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bucket", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Bucket"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Details", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Details"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirectoryObjectType", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["DirectoryObjectType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirectoryObjects", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["DirectoryObjects"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirectoryObject", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["DirectoryObject"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Invitations", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Invitations"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Subscriptions", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Subscriptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Subscription", function() { return _src_graph__WEBPACK_IMPORTED_MODULE_0__["Subscription"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/attachments.js":
/*!*****************************************************!*\
  !*** ./build/packages-es5/graph/src/attachments.js ***!
  \*****************************************************/
/*! exports provided: Attachments, Attachment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attachments", function() { return Attachments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attachment", function() { return Attachment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");



var Attachments = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Attachments, _super);
    function Attachments() {
        return _super !== null && _super.apply(this, arguments) || this;
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
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])({
                "@odata.type": "#microsoft.graph.fileAttachment",
                contentBytes: bytes,
                name: name,
            }),
        });
    };
    Attachments = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("attachments")
    ], Attachments);
    return Attachments;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var Attachment = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Attachment, _super);
    function Attachment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Attachment;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

//# sourceMappingURL=attachments.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/batch.js":
/*!***********************************************!*\
  !*** ./build/packages-es5/graph/src/batch.js ***!
  \***********************************************/
/*! exports provided: GraphBatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphBatch", function() { return GraphBatch; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _pnp_odata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pnp/odata */ "./build/packages-es5/odata/index.js");
/* harmony import */ var _pnp_logging__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/logging */ "./build/packages-es5/logging/index.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");
/* harmony import */ var _config_graphlibconfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config/graphlibconfig */ "./build/packages-es5/graph/src/config/graphlibconfig.js");
/* harmony import */ var _net_graphhttpclient__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./net/graphhttpclient */ "./build/packages-es5/graph/src/net/graphhttpclient.js");






var GraphBatch = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GraphBatch, _super);
    function GraphBatch(batchUrl, maxRequests) {
        if (batchUrl === void 0) { batchUrl = "https://graph.microsoft.com/v1.0/$batch"; }
        if (maxRequests === void 0) { maxRequests = 20; }
        var _this = _super.call(this) || this;
        _this.batchUrl = batchUrl;
        _this.maxRequests = maxRequests;
        return _this;
    }
    /**
     * Urls come to the batch absolute, but the processor expects relative
     * @param url Url to ensure is relative
     */
    GraphBatch.makeUrlRelative = function (url) {
        if (!Object(_pnp_common__WEBPACK_IMPORTED_MODULE_3__["isUrlAbsolute"])(url)) {
            // already not absolute, just give it back
            return url;
        }
        var index = url.indexOf(".com/v1.0/");
        if (index < 0) {
            index = url.indexOf(".com/beta/");
            if (index > -1) {
                // beta url
                return url.substr(index + 10);
            }
        }
        else {
            // v1.0 url
            return url.substr(index + 9);
        }
        // no idea
        return url;
    };
    GraphBatch.formatRequests = function (requests) {
        var _this = this;
        return requests.map(function (reqInfo, index) {
            var requestFragment = {
                id: "" + ++index,
                method: reqInfo.method,
                url: _this.makeUrlRelative(reqInfo.url),
            };
            var headers = {};
            // merge global config headers
            if (_config_graphlibconfig__WEBPACK_IMPORTED_MODULE_4__["GraphRuntimeConfig"].headers !== undefined && _config_graphlibconfig__WEBPACK_IMPORTED_MODULE_4__["GraphRuntimeConfig"].headers !== null) {
                headers = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_3__["extend"])(headers, _config_graphlibconfig__WEBPACK_IMPORTED_MODULE_4__["GraphRuntimeConfig"].headers);
            }
            if (reqInfo.options !== undefined) {
                // merge per request headers
                if (reqInfo.options.headers !== undefined && reqInfo.options.headers !== null) {
                    headers = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_3__["extend"])(headers, reqInfo.options.headers);
                }
                // add a request body
                if (reqInfo.options.body !== undefined && reqInfo.options.body !== null) {
                    requestFragment = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_3__["extend"])(requestFragment, {
                        body: reqInfo.options.body,
                    });
                }
            }
            requestFragment = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_3__["extend"])(requestFragment, {
                headers: headers,
            });
            return requestFragment;
        });
    };
    GraphBatch.parseResponse = function (requests, graphResponse) {
        return new Promise(function (resolve) {
            var parsedResponses = new Array(requests.length).fill(null);
            for (var i = 0; i < graphResponse.responses.length; ++i) {
                var response = graphResponse.responses[i];
                // we create the request id by adding 1 to the index, so we place the response by subtracting one to match
                // the array of requests and make it easier to map them by index
                var responseId = parseInt(response.id, 10) - 1;
                if (response.status === 204) {
                    parsedResponses[responseId] = new Response();
                }
                else {
                    parsedResponses[responseId] = new Response(JSON.stringify(response.body), response);
                }
            }
            resolve({
                nextLink: graphResponse.nextLink,
                responses: parsedResponses,
            });
        });
    };
    GraphBatch.prototype.executeImpl = function () {
        var _this = this;
        _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].write("[" + this.batchId + "] (" + (new Date()).getTime() + ") Executing batch with " + this.requests.length + " requests.", 1 /* Info */);
        if (this.requests.length < 1) {
            _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].write("Resolving empty batch.", 1 /* Info */);
            return Promise.resolve();
        }
        var client = new _net_graphhttpclient__WEBPACK_IMPORTED_MODULE_5__["GraphHttpClient"]();
        // create a working copy of our requests
        var requests = this.requests.slice();
        // this is the root of our promise chain
        var promise = Promise.resolve();
        var _loop_1 = function () {
            var requestsChunk = requests.splice(0, this_1.maxRequests);
            var batchRequest = {
                requests: GraphBatch.formatRequests(requestsChunk),
            };
            var batchOptions = {
                body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_3__["jsS"])(batchRequest),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
            };
            _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].write("[" + this_1.batchId + "] (" + (new Date()).getTime() + ") Sending batch request.", 1 /* Info */);
            client.fetch(this_1.batchUrl, batchOptions)
                .then(function (r) { return r.json(); })
                .then(function (j) { return GraphBatch.parseResponse(requestsChunk, j); })
                .then(function (parsedResponse) {
                _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].write("[" + _this.batchId + "] (" + (new Date()).getTime() + ") Resolving batched requests.", 1 /* Info */);
                parsedResponse.responses.reduce(function (chain, response, index) {
                    var request = requestsChunk[index];
                    _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].write("[" + _this.batchId + "] (" + (new Date()).getTime() + ") Resolving batched request " + request.method + " " + request.url + ".", 0 /* Verbose */);
                    return chain.then(function (_) { return request.parser.parse(response).then(request.resolve).catch(request.reject); });
                }, promise);
            });
        };
        var this_1 = this;
        while (requests.length > 0) {
            _loop_1();
        }
        return promise;
    };
    return GraphBatch;
}(_pnp_odata__WEBPACK_IMPORTED_MODULE_1__["ODataBatch"]));

//# sourceMappingURL=batch.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/calendars.js":
/*!***************************************************!*\
  !*** ./build/packages-es5/graph/src/calendars.js ***!
  \***************************************************/
/*! exports provided: Calendars, Calendar, Events, Event */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Calendars", function() { return Calendars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Calendar", function() { return Calendar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return Event; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");



// import { Attachments } from "./attachments";
var Calendars = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Calendars, _super);
    function Calendars() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Calendars = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("calendars")
    ], Calendars);
    return Calendars;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var Calendar = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Calendar, _super);
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
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

var Events = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Events, _super);
    function Events() {
        return _super !== null && _super.apply(this, arguments) || this;
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
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(properties),
        }).then(function (r) {
            return {
                data: r,
                event: _this.getById(r.id),
            };
        });
    };
    Events = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("events")
    ], Events);
    return Events;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var Event = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Event, _super);
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
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(properties),
        });
    };
    /**
     * Deletes this event
     */
    Event.prototype.delete = function () {
        return this.deleteCore();
    };
    return Event;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

//# sourceMappingURL=calendars.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/config/graphlibconfig.js":
/*!***************************************************************!*\
  !*** ./build/packages-es5/graph/src/config/graphlibconfig.js ***!
  \***************************************************************/
/*! exports provided: setup, GraphRuntimeConfigImpl, GraphRuntimeConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphRuntimeConfigImpl", function() { return GraphRuntimeConfigImpl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphRuntimeConfig", function() { return GraphRuntimeConfig; });
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");

function setup(config) {
    _pnp_common__WEBPACK_IMPORTED_MODULE_0__["RuntimeConfig"].extend(config);
}
var GraphRuntimeConfigImpl = /** @class */ (function () {
    function GraphRuntimeConfigImpl() {
    }
    Object.defineProperty(GraphRuntimeConfigImpl.prototype, "headers", {
        get: function () {
            var graphPart = _pnp_common__WEBPACK_IMPORTED_MODULE_0__["RuntimeConfig"].get("graph");
            if (graphPart !== undefined && graphPart !== null && graphPart.headers !== undefined) {
                return graphPart.headers;
            }
            return {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRuntimeConfigImpl.prototype, "fetchClientFactory", {
        get: function () {
            var graphPart = _pnp_common__WEBPACK_IMPORTED_MODULE_0__["RuntimeConfig"].get("graph");
            // use a configured factory firt
            if (graphPart !== undefined && graphPart !== null && graphPart.fetchClientFactory !== undefined) {
                return graphPart.fetchClientFactory;
            }
            // then try and use spfx context if available
            if (_pnp_common__WEBPACK_IMPORTED_MODULE_0__["RuntimeConfig"].spfxContext !== undefined) {
                return function () { return _pnp_common__WEBPACK_IMPORTED_MODULE_0__["AdalClient"].fromSPFxContext(_pnp_common__WEBPACK_IMPORTED_MODULE_0__["RuntimeConfig"].spfxContext); };
            }
            throw Error("There is no Graph Client available, either set one using configuraiton or provide a valid SPFx Context using setup.");
        },
        enumerable: true,
        configurable: true
    });
    return GraphRuntimeConfigImpl;
}());

var GraphRuntimeConfig = new GraphRuntimeConfigImpl();
//# sourceMappingURL=graphlibconfig.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/contacts.js":
/*!**************************************************!*\
  !*** ./build/packages-es5/graph/src/contacts.js ***!
  \**************************************************/
/*! exports provided: Contacts, Contact, ContactFolders, ContactFolder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Contacts", function() { return Contacts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Contact", function() { return Contact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactFolders", function() { return ContactFolders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactFolder", function() { return ContactFolder; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");



var Contacts = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Contacts, _super);
    function Contacts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Contacts.prototype.getById = function (id) {
        return new Contact(this, id);
    };
    /**
    * Create a new Contact for the user.
    *
    * @param givenName The contact's given name.
    * @param surName The contact's surname.
    * @param emailAddresses The contact's email addresses.
    * @param businessPhones The contact's business phone numbers.
    * @param additionalProperties A plain object collection of additional properties you want to set on the new contact
    */
    Contacts.prototype.add = function (givenName, surName, emailAddresses, businessPhones, additionalProperties) {
        var _this = this;
        if (additionalProperties === void 0) { additionalProperties = {}; }
        var postBody = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["extend"])({
            businessPhones: businessPhones,
            emailAddresses: emailAddresses,
            givenName: givenName,
            surName: surName,
        }, additionalProperties);
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(postBody),
        }).then(function (r) {
            return {
                contact: _this.getById(r.id),
                data: r,
            };
        });
    };
    Contacts = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("contacts")
    ], Contacts);
    return Contacts;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var Contact = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Contact, _super);
    function Contact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Deletes this contact
     */
    Contact.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a contact object
     *
     * @param properties Set of properties of this contact to update
     */
    Contact.prototype.update = function (properties) {
        return this.patchCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(properties),
        });
    };
    return Contact;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

var ContactFolders = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ContactFolders, _super);
    function ContactFolders() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContactFolders.prototype.getById = function (id) {
        return new ContactFolder(this, id);
    };
    /**
     * Create a new Contact Folder for the user.
     *
     * @param displayName The folder's display name.
     * @param parentFolderId The ID of the folder's parent folder.
     */
    ContactFolders.prototype.add = function (displayName, parentFolderId) {
        var _this = this;
        var postBody = {
            displayName: displayName,
            parentFolderId: parentFolderId,
        };
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(postBody),
        }).then(function (r) {
            return {
                contactFolder: _this.getById(r.id),
                data: r,
            };
        });
    };
    ContactFolders = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("contactFolders")
    ], ContactFolders);
    return ContactFolders;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var ContactFolder = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ContactFolder, _super);
    function ContactFolder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ContactFolder.prototype, "contacts", {
        /**
         * Gets the contacts in this contact folder
         */
        get: function () {
            return new Contacts(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ContactFolder.prototype, "childFolders", {
        /**
        * Gets the contacts in this contact folder
        */
        get: function () {
            return new ContactFolders(this, "childFolders");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Deletes this contact folder
     */
    ContactFolder.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a contact folder
     *
     * @param properties Set of properties of this contact folder to update
     */
    ContactFolder.prototype.update = function (properties) {
        return this.patchCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(properties),
        });
    };
    return ContactFolder;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

//# sourceMappingURL=contacts.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/conversations.js":
/*!*******************************************************!*\
  !*** ./build/packages-es5/graph/src/conversations.js ***!
  \*******************************************************/
/*! exports provided: Conversations, Threads, Posts, Conversation, Thread, Post, Senders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Conversations", function() { return Conversations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Threads", function() { return Threads; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Posts", function() { return Posts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Conversation", function() { return Conversation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Thread", function() { return Thread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Post", function() { return Post; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Senders", function() { return Senders; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");
/* harmony import */ var _attachments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./attachments */ "./build/packages-es5/graph/src/attachments.js");




var Conversations = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Conversations, _super);
    function Conversations() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create a new conversation by including a thread and a post.
     *
     * @param properties Properties used to create the new conversation
     */
    Conversations.prototype.add = function (properties) {
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(properties),
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
    Conversations = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("conversations")
    ], Conversations);
    return Conversations;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var Threads = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Threads, _super);
    function Threads() {
        return _super !== null && _super.apply(this, arguments) || this;
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
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(properties),
        });
    };
    Threads = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("threads")
    ], Threads);
    return Threads;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var Posts = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Posts, _super);
    function Posts() {
        return _super !== null && _super.apply(this, arguments) || this;
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
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(properties),
        });
    };
    Posts = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("posts")
    ], Posts);
    return Posts;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var Conversation = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Conversation, _super);
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
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(properties),
        });
    };
    /**
     * Deletes this member from the group
     */
    Conversation.prototype.delete = function () {
        return this.deleteCore();
    };
    return Conversation;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

var Thread = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Thread, _super);
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
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])({
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
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

var Post = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Post.prototype, "attachments", {
        get: function () {
            return new _attachments__WEBPACK_IMPORTED_MODULE_3__["Attachments"](this);
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
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(info),
        });
    };
    /**
     * Reply to a thread in a group conversation and add a new post to it
     *
     * @param post Contents of the post
     */
    Post.prototype.reply = function (post) {
        return this.clone(Post, "reply").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])({
                post: post,
            }),
        });
    };
    return Post;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

var Senders = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Senders, _super);
    function Senders(baseUrl, path) {
        return _super.call(this, baseUrl, path) || this;
    }
    /**
     * Add a new user or group to this senders collection
     * @param id The full @odata.id value to add (ex: https://graph.microsoft.com/v1.0/users/user@contoso.com)
     */
    Senders.prototype.add = function (id) {
        return this.clone(Senders, "$ref").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])({
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
        remover.query.set("$id", id);
        return remover.deleteCore();
    };
    return Senders;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

//# sourceMappingURL=conversations.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/directoryobjects.js":
/*!**********************************************************!*\
  !*** ./build/packages-es5/graph/src/directoryobjects.js ***!
  \**********************************************************/
/*! exports provided: DirectoryObjectType, DirectoryObjects, DirectoryObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectoryObjectType", function() { return DirectoryObjectType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectoryObjects", function() { return DirectoryObjects; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirectoryObject", function() { return DirectoryObject; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");



var DirectoryObjectType;
(function (DirectoryObjectType) {
    /**
     * Directory Objects
     */
    DirectoryObjectType[DirectoryObjectType["directoryObject"] = 0] = "directoryObject";
    /**
     * User
     */
    DirectoryObjectType[DirectoryObjectType["user"] = 1] = "user";
    /**
     * Group
     */
    DirectoryObjectType[DirectoryObjectType["group"] = 2] = "group";
    /**
     * Device
     */
    DirectoryObjectType[DirectoryObjectType["device"] = 3] = "device";
})(DirectoryObjectType || (DirectoryObjectType = {}));
/**
 * Describes a collection of Directory Objects
 *
 */
var DirectoryObjects = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DirectoryObjects, _super);
    function DirectoryObjects() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DirectoryObjects_1 = DirectoryObjects;
    /**
     * Gets a directoryObject from the collection using the specified id
     *
     * @param id Id of the Directory Object to get from this collection
     */
    DirectoryObjects.prototype.getById = function (id) {
        return new DirectoryObject(this, id);
    };
    /**
    * Returns the directory objects specified in a list of ids. NOTE: The directory objects returned are the full objects containing all their properties.
    * The $select query option is not available for this operation.
    *
    * @param ids A collection of ids for which to return objects. You can specify up to 1000 ids.
    * @param type A collection of resource types that specifies the set of resource collections to search. Default is directoryObject.
    */
    DirectoryObjects.prototype.getByIds = function (ids, type) {
        if (type === void 0) { type = DirectoryObjectType.directoryObject; }
        return this.clone(DirectoryObjects_1, "getByIds").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])({
                ids: ids,
                type: type,
            }),
        });
    };
    var DirectoryObjects_1;
    DirectoryObjects = DirectoryObjects_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("directoryObjects")
    ], DirectoryObjects);
    return DirectoryObjects;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

/**
 * Represents a Directory Object entity
 */
var DirectoryObject = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DirectoryObject, _super);
    function DirectoryObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Deletes this group
     */
    DirectoryObject.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Returns all the groups and directory roles that the specified Directory Object is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    DirectoryObject.prototype.getMemberObjects = function (securityEnabledOnly) {
        if (securityEnabledOnly === void 0) { securityEnabledOnly = false; }
        return this.clone(DirectoryObject, "getMemberObjects").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    };
    /**
     * Returns all the groups that the specified Directory Object is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    DirectoryObject.prototype.getMemberGroups = function (securityEnabledOnly) {
        if (securityEnabledOnly === void 0) { securityEnabledOnly = false; }
        return this.clone(DirectoryObject, "getMemberGroups").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    };
    /**
     * Check for membership in a specified list of groups, and returns from that list those groups of which the specified user, group, or directory object is a member.
     * This function is transitive.
     * @param groupIds A collection that contains the object IDs of the groups in which to check membership. Up to 20 groups may be specified.
     */
    DirectoryObject.prototype.checkMemberGroups = function (groupIds) {
        return this.clone(DirectoryObject, "checkMemberGroups").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])({
                groupIds: groupIds,
            }),
        });
    };
    return DirectoryObject;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

//# sourceMappingURL=directoryobjects.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/graph.js":
/*!***********************************************!*\
  !*** ./build/packages-es5/graph/src/graph.js ***!
  \***********************************************/
/*! exports provided: graph, GraphRest, GroupType, Group, Groups, GraphBatch, GraphQueryable, GraphQueryableCollection, GraphQueryableInstance, GraphQueryableSearchableCollection, Teams, Team, Channels, Channel, Apps, Tabs, Tab, GraphEndpoints, OneNote, Notebooks, Notebook, Sections, Section, Pages, Contacts, Contact, ContactFolders, ContactFolder, Drives, Drive, Root, DriveItems, DriveItem, Children, DriveList, Recent, SharedWithMe, DriveSearch, Thumbnails, Planner, Plans, Plan, Tasks, Task, Buckets, Bucket, Details, DirectoryObjectType, DirectoryObjects, DirectoryObject, Invitations, Subscriptions, Subscription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rest */ "./build/packages-es5/graph/src/rest.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "graph", function() { return _rest__WEBPACK_IMPORTED_MODULE_0__["graph"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphRest", function() { return _rest__WEBPACK_IMPORTED_MODULE_0__["GraphRest"]; });

/* harmony import */ var _groups__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./groups */ "./build/packages-es5/graph/src/groups.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupType", function() { return _groups__WEBPACK_IMPORTED_MODULE_1__["GroupType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Group", function() { return _groups__WEBPACK_IMPORTED_MODULE_1__["Group"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Groups", function() { return _groups__WEBPACK_IMPORTED_MODULE_1__["Groups"]; });

/* harmony import */ var _batch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./batch */ "./build/packages-es5/graph/src/batch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphBatch", function() { return _batch__WEBPACK_IMPORTED_MODULE_2__["GraphBatch"]; });

/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphQueryable", function() { return _graphqueryable__WEBPACK_IMPORTED_MODULE_3__["GraphQueryable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphQueryableCollection", function() { return _graphqueryable__WEBPACK_IMPORTED_MODULE_3__["GraphQueryableCollection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphQueryableInstance", function() { return _graphqueryable__WEBPACK_IMPORTED_MODULE_3__["GraphQueryableInstance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphQueryableSearchableCollection", function() { return _graphqueryable__WEBPACK_IMPORTED_MODULE_3__["GraphQueryableSearchableCollection"]; });

/* harmony import */ var _teams__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./teams */ "./build/packages-es5/graph/src/teams.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Teams", function() { return _teams__WEBPACK_IMPORTED_MODULE_4__["Teams"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Team", function() { return _teams__WEBPACK_IMPORTED_MODULE_4__["Team"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Channels", function() { return _teams__WEBPACK_IMPORTED_MODULE_4__["Channels"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Channel", function() { return _teams__WEBPACK_IMPORTED_MODULE_4__["Channel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Apps", function() { return _teams__WEBPACK_IMPORTED_MODULE_4__["Apps"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tabs", function() { return _teams__WEBPACK_IMPORTED_MODULE_4__["Tabs"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tab", function() { return _teams__WEBPACK_IMPORTED_MODULE_4__["Tab"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types */ "./build/packages-es5/graph/src/types.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GraphEndpoints", function() { return _types__WEBPACK_IMPORTED_MODULE_5__["GraphEndpoints"]; });

/* harmony import */ var _onenote__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./onenote */ "./build/packages-es5/graph/src/onenote.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OneNote", function() { return _onenote__WEBPACK_IMPORTED_MODULE_6__["OneNote"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Notebooks", function() { return _onenote__WEBPACK_IMPORTED_MODULE_6__["Notebooks"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Notebook", function() { return _onenote__WEBPACK_IMPORTED_MODULE_6__["Notebook"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sections", function() { return _onenote__WEBPACK_IMPORTED_MODULE_6__["Sections"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Section", function() { return _onenote__WEBPACK_IMPORTED_MODULE_6__["Section"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pages", function() { return _onenote__WEBPACK_IMPORTED_MODULE_6__["Pages"]; });

/* harmony import */ var _contacts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./contacts */ "./build/packages-es5/graph/src/contacts.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Contacts", function() { return _contacts__WEBPACK_IMPORTED_MODULE_7__["Contacts"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Contact", function() { return _contacts__WEBPACK_IMPORTED_MODULE_7__["Contact"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContactFolders", function() { return _contacts__WEBPACK_IMPORTED_MODULE_7__["ContactFolders"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContactFolder", function() { return _contacts__WEBPACK_IMPORTED_MODULE_7__["ContactFolder"]; });

/* harmony import */ var _onedrive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./onedrive */ "./build/packages-es5/graph/src/onedrive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Drives", function() { return _onedrive__WEBPACK_IMPORTED_MODULE_8__["Drives"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Drive", function() { return _onedrive__WEBPACK_IMPORTED_MODULE_8__["Drive"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Root", function() { return _onedrive__WEBPACK_IMPORTED_MODULE_8__["Root"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DriveItems", function() { return _onedrive__WEBPACK_IMPORTED_MODULE_8__["DriveItems"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DriveItem", function() { return _onedrive__WEBPACK_IMPORTED_MODULE_8__["DriveItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return _onedrive__WEBPACK_IMPORTED_MODULE_8__["Children"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DriveList", function() { return _onedrive__WEBPACK_IMPORTED_MODULE_8__["DriveList"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Recent", function() { return _onedrive__WEBPACK_IMPORTED_MODULE_8__["Recent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SharedWithMe", function() { return _onedrive__WEBPACK_IMPORTED_MODULE_8__["SharedWithMe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DriveSearch", function() { return _onedrive__WEBPACK_IMPORTED_MODULE_8__["DriveSearch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Thumbnails", function() { return _onedrive__WEBPACK_IMPORTED_MODULE_8__["Thumbnails"]; });

/* harmony import */ var _planner__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./planner */ "./build/packages-es5/graph/src/planner.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Planner", function() { return _planner__WEBPACK_IMPORTED_MODULE_9__["Planner"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Plans", function() { return _planner__WEBPACK_IMPORTED_MODULE_9__["Plans"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Plan", function() { return _planner__WEBPACK_IMPORTED_MODULE_9__["Plan"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tasks", function() { return _planner__WEBPACK_IMPORTED_MODULE_9__["Tasks"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Task", function() { return _planner__WEBPACK_IMPORTED_MODULE_9__["Task"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Buckets", function() { return _planner__WEBPACK_IMPORTED_MODULE_9__["Buckets"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bucket", function() { return _planner__WEBPACK_IMPORTED_MODULE_9__["Bucket"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Details", function() { return _planner__WEBPACK_IMPORTED_MODULE_9__["Details"]; });

/* harmony import */ var _directoryobjects__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./directoryobjects */ "./build/packages-es5/graph/src/directoryobjects.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirectoryObjectType", function() { return _directoryobjects__WEBPACK_IMPORTED_MODULE_10__["DirectoryObjectType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirectoryObjects", function() { return _directoryobjects__WEBPACK_IMPORTED_MODULE_10__["DirectoryObjects"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DirectoryObject", function() { return _directoryobjects__WEBPACK_IMPORTED_MODULE_10__["DirectoryObject"]; });

/* harmony import */ var _invitations__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./invitations */ "./build/packages-es5/graph/src/invitations.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Invitations", function() { return _invitations__WEBPACK_IMPORTED_MODULE_11__["Invitations"]; });

/* harmony import */ var _subscriptions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./subscriptions */ "./build/packages-es5/graph/src/subscriptions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Subscriptions", function() { return _subscriptions__WEBPACK_IMPORTED_MODULE_12__["Subscriptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Subscription", function() { return _subscriptions__WEBPACK_IMPORTED_MODULE_12__["Subscription"]; });














//# sourceMappingURL=graph.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/graphqueryable.js":
/*!********************************************************!*\
  !*** ./build/packages-es5/graph/src/graphqueryable.js ***!
  \********************************************************/
/*! exports provided: GraphQueryable, GraphQueryableCollection, GraphQueryableSearchableCollection, GraphQueryableInstance, defaultPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphQueryable", function() { return GraphQueryable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphQueryableCollection", function() { return GraphQueryableCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphQueryableSearchableCollection", function() { return GraphQueryableSearchableCollection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphQueryableInstance", function() { return GraphQueryableInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultPath", function() { return defaultPath; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");
/* harmony import */ var _pnp_odata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/odata */ "./build/packages-es5/odata/index.js");
/* harmony import */ var _net_graphhttpclient__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./net/graphhttpclient */ "./build/packages-es5/graph/src/net/graphhttpclient.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./types */ "./build/packages-es5/graph/src/types.js");





/**
 * Queryable Base Class
 *
 */
var GraphQueryable = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GraphQueryable, _super);
    /**
     * Creates a new instance of the Queryable class
     *
     * @constructor
     * @param baseUrl A string or Queryable that should form the base part of the url
     *
     */
    function GraphQueryable(baseUrl, path) {
        var _this = _super.call(this) || this;
        if (typeof baseUrl === "string") {
            var urlStr = baseUrl;
            _this._parentUrl = urlStr;
            _this._url = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["combine"])(urlStr, path);
        }
        else {
            _this.extend(baseUrl, path);
        }
        return _this;
    }
    /**
     * Choose which fields to return
     *
     * @param selects One or more fields to return
     */
    GraphQueryable.prototype.select = function () {
        var selects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            selects[_i] = arguments[_i];
        }
        if (selects.length > 0) {
            this.query.set("$select", selects.join(","));
        }
        return this;
    };
    /**
     * Expands fields such as lookups to get additional data
     *
     * @param expands The Fields for which to expand the values
     */
    GraphQueryable.prototype.expand = function () {
        var expands = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expands[_i] = arguments[_i];
        }
        if (expands.length > 0) {
            this.query.set("$expand", expands.join(","));
        }
        return this;
    };
    /**
     * Creates a new instance of the supplied factory and extends this into that new instance
     *
     * @param factory constructor for the new queryable
     */
    GraphQueryable.prototype.as = function (factory) {
        var o = new factory(this._url, null);
        return Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["extend"])(o, this, true);
    };
    /**
     * Gets the full url with query information
     *
     */
    GraphQueryable.prototype.toUrlAndQuery = function () {
        var url = this.toUrl();
        if (!Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["isUrlAbsolute"])(url)) {
            url = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["combine"])("https://graph.microsoft.com", url);
        }
        if (this.query.size > 0) {
            var char = url.indexOf("?") > -1 ? "&" : "?";
            url += "" + char + Array.from(this.query).map(function (v) { return v[0] + "=" + v[1]; }).join("&");
        }
        return url;
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
        return _super.prototype._clone.call(this, new factory(this, additionalPath), { includeBatch: includeBatch });
    };
    GraphQueryable.prototype.setEndpoint = function (endpoint) {
        this._url = _types__WEBPACK_IMPORTED_MODULE_4__["GraphEndpoints"].ensure(this._url, endpoint);
        return this;
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
        var dependencyDispose = this.hasBatch ? this._batchDependency : function () { return; };
        return Promise.resolve({
            batch: this.batch,
            batchDependency: dependencyDispose,
            cachingOptions: this._cachingOptions,
            clientFactory: function () { return new _net_graphhttpclient__WEBPACK_IMPORTED_MODULE_3__["GraphHttpClient"](); },
            isBatched: this.hasBatch,
            isCached: /^get$/i.test(verb) && this._useCaching,
            options: options,
            parser: parser,
            pipeline: pipeline,
            requestAbsoluteUrl: this.toUrlAndQuery(),
            requestId: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["getGUID"])(),
            verb: verb,
        });
    };
    return GraphQueryable;
}(_pnp_odata__WEBPACK_IMPORTED_MODULE_2__["ODataQueryable"]));

/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */
var GraphQueryableCollection = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GraphQueryableCollection, _super);
    function GraphQueryableCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @param filter The string representing the filter query
     */
    GraphQueryableCollection.prototype.filter = function (filter) {
        this.query.set("$filter", filter);
        return this;
    };
    /**
     * Orders based on the supplied fields
     *
     * @param orderby The name of the field on which to sort
     * @param ascending If false DESC is appended, otherwise ASC (default)
     */
    GraphQueryableCollection.prototype.orderBy = function (orderBy, ascending) {
        if (ascending === void 0) { ascending = true; }
        var o = "$orderby";
        var query = this.query.has(o) ? this.query.get(o).split(",") : [];
        query.push(orderBy + " " + (ascending ? "asc" : "desc"));
        this.query.set(o, query.join(","));
        return this;
    };
    /**
     * Limits the query to only return the specified number of items
     *
     * @param top The query row limit
     */
    GraphQueryableCollection.prototype.top = function (top) {
        this.query.set("$top", top.toString());
        return this;
    };
    /**
     * Skips a set number of items in the return set
     *
     * @param num Number of items to skip
     */
    GraphQueryableCollection.prototype.skip = function (num) {
        this.query.set("$skip", num.toString());
        return this;
    };
    /**
     * 	To request second and subsequent pages of Graph data
     */
    GraphQueryableCollection.prototype.skipToken = function (token) {
        this.query.set("$skiptoken", token);
        return this;
    };
    Object.defineProperty(GraphQueryableCollection.prototype, "count", {
        /**
         * 	Retrieves the total count of matching resources
         */
        get: function () {
            this.query.set("$count", "true");
            return this;
        },
        enumerable: true,
        configurable: true
    });
    return GraphQueryableCollection;
}(GraphQueryable));

var GraphQueryableSearchableCollection = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GraphQueryableSearchableCollection, _super);
    function GraphQueryableSearchableCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 	To request second and subsequent pages of Graph data
     */
    GraphQueryableSearchableCollection.prototype.search = function (query) {
        this.query.set("$search", query);
        return this;
    };
    return GraphQueryableSearchableCollection;
}(GraphQueryableCollection));

/**
 * Represents an instance that can be selected
 *
 */
var GraphQueryableInstance = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GraphQueryableInstance, _super);
    function GraphQueryableInstance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GraphQueryableInstance;
}(GraphQueryable));

/**
 * Decorator used to specify the default path for Queryable objects
 *
 * @param path
 */
function defaultPath(path) {
    return function (target) {
        return /** @class */ (function (_super) {
            tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _super.call(this, args[0], args.length > 1 && args[1] !== undefined ? args[1] : path) || this;
            }
            return class_1;
        }(target));
    };
}
//# sourceMappingURL=graphqueryable.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/groups.js":
/*!************************************************!*\
  !*** ./build/packages-es5/graph/src/groups.js ***!
  \************************************************/
/*! exports provided: GroupType, Groups, Group */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupType", function() { return GroupType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Groups", function() { return Groups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Group", function() { return Group; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _members__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./members */ "./build/packages-es5/graph/src/members.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");
/* harmony import */ var _calendars__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./calendars */ "./build/packages-es5/graph/src/calendars.js");
/* harmony import */ var _conversations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./conversations */ "./build/packages-es5/graph/src/conversations.js");
/* harmony import */ var _planner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./planner */ "./build/packages-es5/graph/src/planner.js");
/* harmony import */ var _photos__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./photos */ "./build/packages-es5/graph/src/photos.js");
/* harmony import */ var _teams__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./teams */ "./build/packages-es5/graph/src/teams.js");









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
})(GroupType || (GroupType = {}));
/**
 * Describes a collection of Field objects
 *
 */
var Groups = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Groups, _super);
    function Groups() {
        return _super !== null && _super.apply(this, arguments) || this;
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
        var postBody = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_3__["extend"])({
            displayName: name,
            mailEnabled: groupType === GroupType.Office365,
            mailNickname: mailNickname,
            securityEnabled: groupType !== GroupType.Office365,
        }, additionalProperties);
        // include a group type if required
        if (groupType !== GroupType.Security) {
            postBody = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_3__["extend"])(postBody, {
                groupTypes: groupType === GroupType.Office365 ? ["Unified"] : ["DynamicMembership"],
            });
        }
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_3__["jsS"])(postBody),
        }).then(function (r) {
            return {
                data: r,
                group: _this.getById(r.id),
            };
        });
    };
    Groups = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("groups")
    ], Groups);
    return Groups;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

/**
 * Represents a group entity
 */
var Group = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Group.prototype, "calendar", {
        /**
         * The calendar associated with this group
         */
        get: function () {
            return new _calendars__WEBPACK_IMPORTED_MODULE_4__["Calendar"](this, "calendar");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "events", {
        /**
         * Retrieve a list of event objects
         */
        get: function () {
            return new _calendars__WEBPACK_IMPORTED_MODULE_4__["Events"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "owners", {
        /**
         * Gets the collection of owners for this group
         */
        get: function () {
            return new _members__WEBPACK_IMPORTED_MODULE_2__["Owners"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "plans", {
        /**
         * The collection of plans for this group
         */
        get: function () {
            return new _planner__WEBPACK_IMPORTED_MODULE_6__["Plans"](this, "planner/plans");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "members", {
        /**
         * Gets the collection of members for this group
         */
        get: function () {
            return new _members__WEBPACK_IMPORTED_MODULE_2__["Members"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "conversations", {
        /**
         * Gets the conversations collection for this group
         */
        get: function () {
            return new _conversations__WEBPACK_IMPORTED_MODULE_5__["Conversations"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "acceptedSenders", {
        /**
         * Gets the collection of accepted senders for this group
         */
        get: function () {
            return new _conversations__WEBPACK_IMPORTED_MODULE_5__["Senders"](this, "acceptedsenders");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "rejectedSenders", {
        /**
         * Gets the collection of rejected senders for this group
         */
        get: function () {
            return new _conversations__WEBPACK_IMPORTED_MODULE_5__["Senders"](this, "rejectedsenders");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "photo", {
        /**
         * The photo associated with the group
         */
        get: function () {
            return new _photos__WEBPACK_IMPORTED_MODULE_7__["Photo"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Group.prototype, "team", {
        /**
         * Gets the team associated with this group, if it exists
         */
        get: function () {
            return new _teams__WEBPACK_IMPORTED_MODULE_8__["Team"](this);
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
     * Creates a Microsoft Team associated with this group
     *
     * @param properties Initial properties for the new Team
     */
    Group.prototype.createTeam = function (properties) {
        return this.clone(Group, "team").putCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_3__["jsS"])(properties),
        });
    };
    /**
     * Returns all the groups and directory roles that the specified group is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    Group.prototype.getMemberObjects = function (securityEnabledOnly) {
        if (securityEnabledOnly === void 0) { securityEnabledOnly = false; }
        return this.clone(Group, "getMemberObjects").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_3__["jsS"])({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    };
    /**
     * Return all the groups that the specified group is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    Group.prototype.getMemberGroups = function (securityEnabledOnly) {
        if (securityEnabledOnly === void 0) { securityEnabledOnly = false; }
        return this.clone(Group, "getMemberGroups").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_3__["jsS"])({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    };
    /**
     * Check for membership in a specified list of groups, and returns from that list those groups of which the specified user, group, or directory object is a member.
     * This function is transitive.
     * @param groupIds A collection that contains the object IDs of the groups in which to check membership. Up to 20 groups may be specified.
     */
    Group.prototype.checkMemberGroups = function (groupIds) {
        return this.clone(Group, "checkMemberGroups").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_3__["jsS"])({
                groupIds: groupIds,
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
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_3__["jsS"])(properties),
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
        view.query.set("startDateTime", start.toISOString());
        view.query.set("endDateTime", end.toISOString());
        return view.get();
    };
    return Group;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

//# sourceMappingURL=groups.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/invitations.js":
/*!*****************************************************!*\
  !*** ./build/packages-es5/graph/src/invitations.js ***!
  \*****************************************************/
/*! exports provided: Invitations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Invitations", function() { return Invitations; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");



var Invitations = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Invitations, _super);
    function Invitations() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create a new Invitation via invitation manager.
     *
     * @param invitedUserEmailAddress The email address of the user being invited.
     * @param inviteRedirectUrl The URL user should be redirected to once the invitation is redeemed.
     * @param additionalProperties A plain object collection of additional properties you want to set in the invitation
     */
    Invitations.prototype.create = function (invitedUserEmailAddress, inviteRedirectUrl, additionalProperties) {
        if (additionalProperties === void 0) { additionalProperties = {}; }
        var postBody = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["extend"])({
            inviteRedirectUrl: inviteRedirectUrl,
            invitedUserEmailAddress: invitedUserEmailAddress,
        }, additionalProperties);
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["jsS"])(postBody),
        }).then(function (r) {
            return {
                data: r,
            };
        });
    };
    Invitations = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_2__["defaultPath"])("invitations")
    ], Invitations);
    return Invitations;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_2__["GraphQueryableCollection"]));

//# sourceMappingURL=invitations.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/members.js":
/*!*************************************************!*\
  !*** ./build/packages-es5/graph/src/members.js ***!
  \*************************************************/
/*! exports provided: Members, Member, Owners */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Members", function() { return Members; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Member", function() { return Member; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Owners", function() { return Owners; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");



var Members = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Members, _super);
    function Members() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Members_1 = Members;
    /**
     * Use this API to add a member to an Office 365 group, a security group or a mail-enabled security group through
     * the members navigation property. You can add users or other groups.
     * Important: You can add only users to Office 365 groups.
     *
     * @param id Full @odata.id of the directoryObject, user, or group object you want to add (ex: https://graph.microsoft.com/v1.0/directoryObjects/${id})
     */
    Members.prototype.add = function (id) {
        return this.clone(Members_1, "$ref").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])({
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
    var Members_1;
    Members = Members_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("members")
    ], Members);
    return Members;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var Member = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Member, _super);
    function Member() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Removes this Member
     */
    Member.prototype.remove = function () {
        return this.clone(Member, "$ref").deleteCore();
    };
    return Member;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

var Owners = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Owners, _super);
    function Owners() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Owners = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("owners")
    ], Owners);
    return Owners;
}(Members));

//# sourceMappingURL=members.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/messages.js":
/*!**************************************************!*\
  !*** ./build/packages-es5/graph/src/messages.js ***!
  \**************************************************/
/*! exports provided: Messages, Message, MailFolders, MailFolder, MailboxSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Messages", function() { return Messages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MailFolders", function() { return MailFolders; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MailFolder", function() { return MailFolder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MailboxSettings", function() { return MailboxSettings; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");



var Messages = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Messages, _super);
    function Messages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a member of the group by id
     *
     * @param id Attachment id
     */
    Messages.prototype.getById = function (id) {
        return new Message(this, id);
    };
    /**
     * Add a message to this collection
     *
     * @param message The message details
     */
    Messages.prototype.add = function (message) {
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(message),
        });
    };
    Messages = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("messages")
    ], Messages);
    return Messages;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var Message = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Message;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

var MailFolders = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MailFolders, _super);
    function MailFolders() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a member of the group by id
     *
     * @param id Attachment id
     */
    MailFolders.prototype.getById = function (id) {
        return new MailFolder(this, id);
    };
    /**
     * Add a mail folder to this collection
     *
     * @param message The message details
     */
    MailFolders.prototype.add = function (mailFolder) {
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(mailFolder),
        });
    };
    MailFolders = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("mailFolders")
    ], MailFolders);
    return MailFolders;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var MailFolder = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MailFolder, _super);
    function MailFolder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MailFolder;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

var MailboxSettings = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](MailboxSettings, _super);
    function MailboxSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MailboxSettings.prototype.update = function (settings) {
        return this.patchCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(settings),
        });
    };
    MailboxSettings = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("mailboxSettings")
    ], MailboxSettings);
    return MailboxSettings;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

//# sourceMappingURL=messages.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/net/graphhttpclient.js":
/*!*************************************************************!*\
  !*** ./build/packages-es5/graph/src/net/graphhttpclient.js ***!
  \*************************************************************/
/*! exports provided: GraphHttpClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphHttpClient", function() { return GraphHttpClient; });
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");
/* harmony import */ var _config_graphlibconfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/graphlibconfig */ "./build/packages-es5/graph/src/config/graphlibconfig.js");


var GraphHttpClient = /** @class */ (function () {
    function GraphHttpClient() {
        this._impl = _config_graphlibconfig__WEBPACK_IMPORTED_MODULE_1__["GraphRuntimeConfig"].fetchClientFactory();
    }
    GraphHttpClient.prototype.fetch = function (url, options) {
        if (options === void 0) { options = {}; }
        var headers = new Headers();
        // first we add the global headers so they can be overwritten by any passed in locally to this call
        Object(_pnp_common__WEBPACK_IMPORTED_MODULE_0__["mergeHeaders"])(headers, _config_graphlibconfig__WEBPACK_IMPORTED_MODULE_1__["GraphRuntimeConfig"].headers);
        // second we add the local options so we can overwrite the globals
        Object(_pnp_common__WEBPACK_IMPORTED_MODULE_0__["mergeHeaders"])(headers, options.headers);
        if (!headers.has("Content-Type")) {
            headers.append("Content-Type", "application/json");
        }
        var opts = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_0__["extend"])(options, { headers: headers });
        return this.fetchRaw(url, opts);
    };
    GraphHttpClient.prototype.fetchRaw = function (url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        // here we need to normalize the headers
        var rawHeaders = new Headers();
        Object(_pnp_common__WEBPACK_IMPORTED_MODULE_0__["mergeHeaders"])(rawHeaders, options.headers);
        options = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_0__["extend"])(options, { headers: rawHeaders });
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
                setTimeout(Object(_pnp_common__WEBPACK_IMPORTED_MODULE_0__["getCtxCallback"])(_this, retry, ctx), delay);
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
        var opts = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_0__["extend"])(options, { method: "GET" });
        return this.fetch(url, opts);
    };
    GraphHttpClient.prototype.post = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_0__["extend"])(options, { method: "POST" });
        return this.fetch(url, opts);
    };
    GraphHttpClient.prototype.patch = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_0__["extend"])(options, { method: "PATCH" });
        return this.fetch(url, opts);
    };
    GraphHttpClient.prototype.delete = function (url, options) {
        if (options === void 0) { options = {}; }
        var opts = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_0__["extend"])(options, { method: "DELETE" });
        return this.fetch(url, opts);
    };
    return GraphHttpClient;
}());

//# sourceMappingURL=graphhttpclient.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/onedrive.js":
/*!**************************************************!*\
  !*** ./build/packages-es5/graph/src/onedrive.js ***!
  \**************************************************/
/*! exports provided: Drives, Drive, Root, DriveItems, DriveItem, Children, DriveList, Recent, SharedWithMe, DriveSearch, Thumbnails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Drives", function() { return Drives; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Drive", function() { return Drive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Root", function() { return Root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DriveItems", function() { return DriveItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DriveItem", function() { return DriveItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return Children; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DriveList", function() { return DriveList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Recent", function() { return Recent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedWithMe", function() { return SharedWithMe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DriveSearch", function() { return DriveSearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Thumbnails", function() { return Thumbnails; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");



/**
 * Describes a collection of Drive objects
 *
 */
var Drives = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Drives, _super);
    function Drives() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a Drive instance by id
     *
     * @param id Drive id
     */
    Drives.prototype.getById = function (id) {
        return new Drive(this, id);
    };
    Drives = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("drives")
    ], Drives);
    return Drives;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

/**
 * Describes a Drive instance
 *
 */
var Drive = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Drive, _super);
    function Drive() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Drive.prototype, "root", {
        get: function () {
            return new Root(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Drive.prototype, "items", {
        get: function () {
            return new DriveItems(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Drive.prototype, "list", {
        get: function () {
            return new DriveList(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Drive.prototype, "recent", {
        get: function () {
            return new Recent(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Drive.prototype, "sharedWithMe", {
        get: function () {
            return new SharedWithMe(this);
        },
        enumerable: true,
        configurable: true
    });
    Drive = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("drive")
    ], Drive);
    return Drive;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

/**
 * Describes a Root instance
 *
 */
var Root = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Root, _super);
    function Root() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Root.prototype, "children", {
        get: function () {
            return new Children(this);
        },
        enumerable: true,
        configurable: true
    });
    Root.prototype.search = function (query) {
        return new DriveSearch(this, "search(q='" + query + "')");
    };
    Root = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("root")
    ], Root);
    return Root;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

/**
 * Describes a collection of Drive Item objects
 *
 */
var DriveItems = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DriveItems, _super);
    function DriveItems() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a Drive Item instance by id
     *
     * @param id Drive Item id
     */
    DriveItems.prototype.getById = function (id) {
        return new DriveItem(this, id);
    };
    DriveItems = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("items")
    ], DriveItems);
    return DriveItems;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

/**
 * Describes a Drive Item instance
 *
 */
var DriveItem = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DriveItem, _super);
    function DriveItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DriveItem.prototype, "children", {
        get: function () {
            return new Children(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DriveItem.prototype, "thumbnails", {
        get: function () {
            return new Thumbnails(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Deletes this Drive Item
     */
    DriveItem.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a Drive item
     *
     * @param properties Set of properties of this Drive Item to update
     */
    DriveItem.prototype.update = function (properties) {
        return this.patchCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(properties),
        });
    };
    /**
     * Move the Drive item and optionally update the properties
     *
     * @param parentReference Should contain Id of new parent folder
     * @param properties Optional set of properties of this Drive Item to update
     */
    DriveItem.prototype.move = function (parentReference, properties) {
        var patchBody = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, parentReference);
        if (properties) {
            patchBody = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["extend"])({}, properties);
        }
        return this.patchCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(patchBody),
        });
    };
    return DriveItem;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

/**
 * Return a collection of DriveItems in the children relationship of a DriveItem
 *
 */
var Children = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Children, _super);
    function Children() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * Create a new folder or DriveItem in a Drive with a specified parent item or path
    * Currently only Folder or File works
    * @param name The name of the Drive Item.
    * @param properties Type of Drive Item to create.
    * */
    Children.prototype.add = function (name, driveItemType) {
        var _this = this;
        var postBody = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["extend"])({
            name: name,
        }, driveItemType);
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(postBody),
        }).then(function (r) {
            return {
                data: r,
                driveItem: new DriveItem(_this, r.id),
            };
        });
    };
    Children = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("children")
    ], Children);
    return Children;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var DriveList = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DriveList, _super);
    function DriveList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DriveList = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("list")
    ], DriveList);
    return DriveList;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var Recent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Recent, _super);
    function Recent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Recent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("recent")
    ], Recent);
    return Recent;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

var SharedWithMe = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SharedWithMe, _super);
    function SharedWithMe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SharedWithMe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("sharedWithMe")
    ], SharedWithMe);
    return SharedWithMe;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

var DriveSearch = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DriveSearch, _super);
    function DriveSearch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DriveSearch = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("search")
    ], DriveSearch);
    return DriveSearch;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

var Thumbnails = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Thumbnails, _super);
    function Thumbnails() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Thumbnails = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("thumbnails")
    ], Thumbnails);
    return Thumbnails;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

//# sourceMappingURL=onedrive.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/onenote.js":
/*!*************************************************!*\
  !*** ./build/packages-es5/graph/src/onenote.js ***!
  \*************************************************/
/*! exports provided: OneNote, Notebooks, Notebook, Sections, Section, Pages */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OneNote", function() { return OneNote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Notebooks", function() { return Notebooks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Notebook", function() { return Notebook; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sections", function() { return Sections; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Section", function() { return Section; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pages", function() { return Pages; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");



/**
 * Represents a onenote entity
 */
var OneNote = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](OneNote, _super);
    function OneNote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(OneNote.prototype, "notebooks", {
        get: function () {
            return new Notebooks(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OneNote.prototype, "sections", {
        get: function () {
            return new Sections(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OneNote.prototype, "pages", {
        get: function () {
            return new Pages(this);
        },
        enumerable: true,
        configurable: true
    });
    OneNote = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("onenote")
    ], OneNote);
    return OneNote;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

/**
 * Describes a collection of Notebook objects
 *
 */
var Notebooks = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Notebooks, _super);
    function Notebooks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a notebook instance by id
     *
     * @param id Notebook id
     */
    Notebooks.prototype.getById = function (id) {
        return new Notebook(this, id);
    };
    /**
     * Create a new notebook as specified in the request body.
     *
     * @param displayName Notebook display name
     */
    Notebooks.prototype.add = function (displayName) {
        var _this = this;
        var postBody = {
            displayName: displayName,
        };
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(postBody),
        }).then(function (r) {
            return {
                data: r,
                notebook: _this.getById(r.id),
            };
        });
    };
    Notebooks = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("notebooks")
    ], Notebooks);
    return Notebooks;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

/**
 * Describes a notebook instance
 *
 */
var Notebook = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Notebook, _super);
    function Notebook(baseUrl, path) {
        return _super.call(this, baseUrl, path) || this;
    }
    Object.defineProperty(Notebook.prototype, "sections", {
        get: function () {
            return new Sections(this);
        },
        enumerable: true,
        configurable: true
    });
    return Notebook;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

/**
 * Describes a collection of Sections objects
 *
 */
var Sections = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Sections, _super);
    function Sections() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a section instance by id
     *
     * @param id Section id
     */
    Sections.prototype.getById = function (id) {
        return new Section(this, id);
    };
    /**
     * Adds a new section
     *
     * @param displayName New section display name
     */
    Sections.prototype.add = function (displayName) {
        var _this = this;
        var postBody = {
            displayName: displayName,
        };
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(postBody),
        }).then(function (r) {
            return {
                data: r,
                section: _this.getById(r.id),
            };
        });
    };
    Sections = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("sections")
    ], Sections);
    return Sections;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

/**
 * Describes a sections instance
 *
 */
var Section = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Section, _super);
    function Section(baseUrl, path) {
        return _super.call(this, baseUrl, path) || this;
    }
    return Section;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

/**
 * Describes a collection of Pages objects
 *
 */
var Pages = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Pages, _super);
    function Pages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pages = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("pages")
    ], Pages);
    return Pages;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

//# sourceMappingURL=onenote.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/photos.js":
/*!************************************************!*\
  !*** ./build/packages-es5/graph/src/photos.js ***!
  \************************************************/
/*! exports provided: Photo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Photo", function() { return Photo; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _pnp_odata__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/odata */ "./build/packages-es5/odata/index.js");



var Photo = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Photo, _super);
    function Photo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Photo_1 = Photo;
    /**
     * Gets the image bytes as a blob (browser)
     */
    Photo.prototype.getBlob = function () {
        return this.clone(Photo_1, "$value", false).get(new _pnp_odata__WEBPACK_IMPORTED_MODULE_2__["BlobParser"]());
    };
    /**
     * Gets the image file byets as a Buffer (node.js)
     */
    Photo.prototype.getBuffer = function () {
        return this.clone(Photo_1, "$value", false).get(new _pnp_odata__WEBPACK_IMPORTED_MODULE_2__["BufferParser"]());
    };
    /**
     * Sets the file bytes
     *
     * @param content Image file contents, max 4 MB
     */
    Photo.prototype.setContent = function (content) {
        return this.clone(Photo_1, "$value", false).patchCore({
            body: content,
        });
    };
    var Photo_1;
    Photo = Photo_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("photo")
    ], Photo);
    return Photo;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

//# sourceMappingURL=photos.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/planner.js":
/*!*************************************************!*\
  !*** ./build/packages-es5/graph/src/planner.js ***!
  \*************************************************/
/*! exports provided: Planner, Plans, Plan, Tasks, Task, Buckets, Bucket, Details */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Planner", function() { return Planner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plans", function() { return Plans; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plan", function() { return Plan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tasks", function() { return Tasks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Task", function() { return Task; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Buckets", function() { return Buckets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bucket", function() { return Bucket; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Details", function() { return Details; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");



var Planner = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Planner, _super);
    function Planner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Planner.prototype, "plans", {
        // Should Only be able to get by id, or else error occur
        get: function () {
            return new Plans(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Planner.prototype, "tasks", {
        // Should Only be able to get by id, or else error occur
        get: function () {
            return new Tasks(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Planner.prototype, "buckets", {
        // Should Only be able to get by id, or else error occur
        get: function () {
            return new Buckets(this);
        },
        enumerable: true,
        configurable: true
    });
    Planner = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("planner")
    ], Planner);
    return Planner;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

var Plans = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Plans, _super);
    function Plans() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Plans.prototype.getById = function (id) {
        return new Plan(this, id);
    };
    /**
     * Create a new Planner Plan.
     *
     * @param owner Id of Group object.
     * @param title The Title of the Plan.
     */
    Plans.prototype.add = function (owner, title) {
        var _this = this;
        var postBody = {
            owner: owner,
            title: title,
        };
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(postBody),
        }).then(function (r) {
            return {
                data: r,
                plan: _this.getById(r.id),
            };
        });
    };
    Plans = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("plans")
    ], Plans);
    return Plans;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

/**
 * Should not be able to get by Id
 */
var Plan = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Plan, _super);
    function Plan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Plan.prototype, "tasks", {
        get: function () {
            return new Tasks(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Plan.prototype, "buckets", {
        get: function () {
            return new Buckets(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Plan.prototype, "details", {
        get: function () {
            return new Details(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Deletes this Plan
     */
    Plan.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a Plan
     *
     * @param properties Set of properties of this Plan to update
     */
    Plan.prototype.update = function (properties) {
        return this.patchCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(properties),
        });
    };
    return Plan;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

var Tasks = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Tasks, _super);
    function Tasks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tasks.prototype.getById = function (id) {
        return new Task(this, id);
    };
    /**
     * Create a new Planner Task.
     *
     * @param planId Id of Plan.
     * @param title The Title of the Task.
     * @param assignments Assign the task
     * @param bucketId Id of Bucket
     */
    Tasks.prototype.add = function (planId, title, assignments, bucketId) {
        var _this = this;
        var postBody = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["extend"])({
            planId: planId,
            title: title,
        }, assignments);
        if (bucketId) {
            postBody = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["extend"])(postBody, {
                bucketId: bucketId,
            });
        }
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(postBody),
        }).then(function (r) {
            return {
                data: r,
                task: _this.getById(r.id),
            };
        });
    };
    Tasks = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("tasks")
    ], Tasks);
    return Tasks;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var Task = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Task, _super);
    function Task() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Deletes this Task
     */
    Task.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a Task
     *
     * @param properties Set of properties of this Task to update
     */
    Task.prototype.update = function (properties) {
        return this.patchCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(properties),
        });
    };
    Object.defineProperty(Task.prototype, "details", {
        get: function () {
            return new Details(this);
        },
        enumerable: true,
        configurable: true
    });
    return Task;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

var Buckets = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Buckets, _super);
    function Buckets() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create a new Bucket.
     *
     * @param name Name of Bucket object.
     * @param planId The Id of the Plan.
     * @param oderHint Hint used to order items of this type in a list view.
     */
    Buckets.prototype.add = function (name, planId, orderHint) {
        var _this = this;
        var postBody = {
            name: name,
            orderHint: orderHint ? orderHint : "",
            planId: planId,
        };
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(postBody),
        }).then(function (r) {
            return {
                bucket: _this.getById(r.id),
                data: r,
            };
        });
    };
    Buckets.prototype.getById = function (id) {
        return new Bucket(this, id);
    };
    Buckets = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("buckets")
    ], Buckets);
    return Buckets;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var Bucket = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Bucket, _super);
    function Bucket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Deletes this Bucket
     */
    Bucket.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a Bucket
     *
     * @param properties Set of properties of this Bucket to update
     */
    Bucket.prototype.update = function (properties) {
        return this.patchCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(properties),
        });
    };
    Object.defineProperty(Bucket.prototype, "tasks", {
        get: function () {
            return new Tasks(this);
        },
        enumerable: true,
        configurable: true
    });
    return Bucket;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

var Details = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Details, _super);
    function Details() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Details = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("details")
    ], Details);
    return Details;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

//# sourceMappingURL=planner.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/rest.js":
/*!**********************************************!*\
  !*** ./build/packages-es5/graph/src/rest.js ***!
  \**********************************************/
/*! exports provided: GraphRest, graph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphRest", function() { return GraphRest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graph", function() { return graph; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _config_graphlibconfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/graphlibconfig */ "./build/packages-es5/graph/src/config/graphlibconfig.js");
/* harmony import */ var _groups__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./groups */ "./build/packages-es5/graph/src/groups.js");
/* harmony import */ var _teams__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./teams */ "./build/packages-es5/graph/src/teams.js");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./users */ "./build/packages-es5/graph/src/users.js");
/* harmony import */ var _planner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./planner */ "./build/packages-es5/graph/src/planner.js");
/* harmony import */ var _batch__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./batch */ "./build/packages-es5/graph/src/batch.js");
/* harmony import */ var _directoryobjects__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./directoryobjects */ "./build/packages-es5/graph/src/directoryobjects.js");
/* harmony import */ var _invitations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./invitations */ "./build/packages-es5/graph/src/invitations.js");
/* harmony import */ var _subscriptions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./subscriptions */ "./build/packages-es5/graph/src/subscriptions.js");











var GraphRest = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](GraphRest, _super);
    function GraphRest(baseUrl, path) {
        return _super.call(this, baseUrl, path) || this;
    }
    Object.defineProperty(GraphRest.prototype, "directoryObjects", {
        get: function () {
            return new _directoryobjects__WEBPACK_IMPORTED_MODULE_8__["DirectoryObjects"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRest.prototype, "groups", {
        get: function () {
            return new _groups__WEBPACK_IMPORTED_MODULE_3__["Groups"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRest.prototype, "teams", {
        get: function () {
            return new _teams__WEBPACK_IMPORTED_MODULE_4__["Teams"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRest.prototype, "me", {
        get: function () {
            return new _users__WEBPACK_IMPORTED_MODULE_5__["User"](this, "me");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRest.prototype, "planner", {
        get: function () {
            return new _planner__WEBPACK_IMPORTED_MODULE_6__["Planner"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRest.prototype, "users", {
        get: function () {
            return new _users__WEBPACK_IMPORTED_MODULE_5__["Users"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRest.prototype, "invitations", {
        get: function () {
            return new _invitations__WEBPACK_IMPORTED_MODULE_9__["Invitations"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphRest.prototype, "subscriptions", {
        get: function () {
            return new _subscriptions__WEBPACK_IMPORTED_MODULE_10__["Subscriptions"](this);
        },
        enumerable: true,
        configurable: true
    });
    GraphRest.prototype.createBatch = function () {
        return new _batch__WEBPACK_IMPORTED_MODULE_7__["GraphBatch"]();
    };
    GraphRest.prototype.setup = function (config) {
        Object(_config_graphlibconfig__WEBPACK_IMPORTED_MODULE_2__["setup"])(config);
    };
    return GraphRest;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryable"]));

var graph = new GraphRest("v1.0");
//# sourceMappingURL=rest.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/subscriptions.js":
/*!*******************************************************!*\
  !*** ./build/packages-es5/graph/src/subscriptions.js ***!
  \*******************************************************/
/*! exports provided: Subscriptions, Subscription */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Subscriptions", function() { return Subscriptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Subscription", function() { return Subscription; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");



var Subscriptions = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Subscriptions, _super);
    function Subscriptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Subscriptions.prototype.getById = function (id) {
        return new Subscription(this, id);
    };
    /**
     * Create a new Subscription.
     *
     * @param changeType Indicates the type of change in the subscribed resource that will raise a notification. The supported values are: created, updated, deleted.
     * @param notificationUrl The URL of the endpoint that will receive the notifications. This URL must make use of the HTTPS protocol.
     * @param resource Specifies the resource that will be monitored for changes. Do not include the base URL (https://graph.microsoft.com/v1.0/).
     * @param expirationDateTime Specifies the date and time when the webhook subscription expires. The time is in UTC.
     * @param additionalProperties A plain object collection of additional properties you want to set on the new subscription
     *
     */
    Subscriptions.prototype.add = function (changeType, notificationUrl, resource, expirationDateTime, additionalProperties) {
        var _this = this;
        if (additionalProperties === void 0) { additionalProperties = {}; }
        var postBody = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["extend"])({
            changeType: changeType,
            expirationDateTime: expirationDateTime,
            notificationUrl: notificationUrl,
            resource: resource,
        }, additionalProperties);
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(postBody),
        }).then(function (r) {
            return {
                data: r,
                subscription: _this.getById(r.id),
            };
        });
    };
    Subscriptions = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["defaultPath"])("subscriptions")
    ], Subscriptions);
    return Subscriptions;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableCollection"]));

var Subscription = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Subscription, _super);
    function Subscription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Deletes this Subscription
     */
    Subscription.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Update the properties of a Subscription
     *
     * @param properties Set of properties of this Subscription to update
     */
    Subscription.prototype.update = function (properties) {
        return this.patchCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_2__["jsS"])(properties),
        });
    };
    return Subscription;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_1__["GraphQueryableInstance"]));

//# sourceMappingURL=subscriptions.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/teams.js":
/*!***********************************************!*\
  !*** ./build/packages-es5/graph/src/teams.js ***!
  \***********************************************/
/*! exports provided: Teams, Team, Channels, Channel, Apps, Tabs, Tab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Teams", function() { return Teams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Team", function() { return Team; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Channels", function() { return Channels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Channel", function() { return Channel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Apps", function() { return Apps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tabs", function() { return Tabs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab", function() { return Tab; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _rest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rest */ "./build/packages-es5/graph/src/rest.js");
/* harmony import */ var _groups__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./groups */ "./build/packages-es5/graph/src/groups.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _pnp_odata__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @pnp/odata */ "./build/packages-es5/odata/index.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");






var Teams = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Teams, _super);
    function Teams() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates a new team and associated Group with the given information
     * @param name The name of the new Group
     * @param description Optional description of the group
     * @param ownerId Add an owner with a user id from the graph
     */
    Teams.prototype.create = function (name, description, ownerId, teamProperties) {
        if (description === void 0) { description = ""; }
        if (teamProperties === void 0) { teamProperties = {}; }
        var groupProps = {
            "description": description && description.length > 0 ? description : "",
            "owners@odata.bind": [
                "https://graph.microsoft.com/v1.0/users/" + ownerId,
            ],
        };
        return _rest__WEBPACK_IMPORTED_MODULE_1__["graph"].groups.add(name, name, _groups__WEBPACK_IMPORTED_MODULE_2__["GroupType"].Office365, groupProps).then(function (gar) {
            return gar.group.createTeam(teamProperties).then(function (data) {
                return {
                    data: data,
                    group: gar.group,
                    team: new Team(gar.group),
                };
            });
        });
    };
    Teams.prototype.getById = function (id) {
        return new Team(this, id);
    };
    Teams = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_3__["defaultPath"])("teams")
    ], Teams);
    return Teams;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_3__["GraphQueryableCollection"]));

/**
 * Represents a Microsoft Team
 */
var Team = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Team, _super);
    function Team() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Team_1 = Team;
    Object.defineProperty(Team.prototype, "channels", {
        get: function () {
            return new Channels(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Team.prototype, "installedApps", {
        get: function () {
            return new Apps(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates this team instance's properties
     *
     * @param properties The set of properties to update
     */
    // TODO:: update properties to be typed once type is available in graph-types
    Team.prototype.update = function (properties) {
        var _this = this;
        return this.clone(Team_1, "").patchCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_5__["jsS"])(properties),
        }).then(function (data) {
            return {
                data: data,
                team: _this,
            };
        });
    };
    /**
     * Archives this Team
     *
     * @param shouldSetSpoSiteReadOnlyForMembers Should members have Read-only in associated Team Site
     */
    // TODO:: update properties to be typed once type is available in graph-types
    Team.prototype.archive = function (shouldSetSpoSiteReadOnlyForMembers) {
        var _this = this;
        var postBody;
        if (shouldSetSpoSiteReadOnlyForMembers != null) {
            postBody = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_5__["extend"])(postBody, {
                shouldSetSpoSiteReadOnlyForMembers: shouldSetSpoSiteReadOnlyForMembers,
            });
        }
        return this.clone(Team_1, "archive").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_5__["jsS"])(postBody),
        }).then(function (data) {
            return {
                data: data,
                team: _this,
            };
        });
    };
    /**
    * Unarchives this Team
    *
    */
    // TODO:: update properties to be typed once type is available in graph-types
    Team.prototype.unarchive = function () {
        var _this = this;
        return this.clone(Team_1, "unarchive").postCore({}).then(function (data) {
            return {
                data: data,
                team: _this,
            };
        });
    };
    /**
     * Clones this Team
     * @param name The name of the new Group
     * @param description Optional description of the group
     * @param partsToClone Parts to clone ex: apps,tabs,settings,channels,members
     * @param visibility Set visibility to public or private
     */
    // TODO:: update properties to be typed once type is available in graph-types
    Team.prototype.cloneTeam = function (name, description, partsToClone, visibility) {
        var _this = this;
        if (description === void 0) { description = ""; }
        var postBody = {
            description: description ? description : "",
            displayName: name,
            mailNickname: name,
            partsToClone: partsToClone,
            visibility: visibility,
        };
        return this.clone(Team_1, "clone").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_5__["jsS"])(postBody),
        }).then(function (data) {
            return {
                data: data,
                team: _this,
            };
        });
    };
    /**
     * Executes the currently built request
     *
     * @param parser Allows you to specify a parser to handle the result
     * @param getOptions The options used for this request
     */
    Team.prototype.get = function (parser, options) {
        if (parser === void 0) { parser = new _pnp_odata__WEBPACK_IMPORTED_MODULE_4__["ODataDefaultParser"](); }
        if (options === void 0) { options = {}; }
        return this.clone(Team_1, "").getCore(parser, options);
    };
    var Team_1;
    Team = Team_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_3__["defaultPath"])("team")
    ], Team);
    return Team;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_3__["GraphQueryableInstance"]));

var Channels = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Channels, _super);
    function Channels() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates a new Channel in the Team
     * @param name The display name of the new channel
     * @param description Optional description of the channel
     *
     */
    Channels.prototype.create = function (name, description) {
        var _this = this;
        if (description === void 0) { description = ""; }
        var postBody = {
            description: description && description.length > 0 ? description : "",
            displayName: name,
        };
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_5__["jsS"])(postBody),
        }).then(function (r) {
            return {
                channel: _this.getById(r.id),
                data: r,
            };
        });
    };
    Channels.prototype.getById = function (id) {
        return new Channel(this, id);
    };
    Channels = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_3__["defaultPath"])("channels")
    ], Channels);
    return Channels;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_3__["GraphQueryableCollection"]));

var Channel = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Channel, _super);
    function Channel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Channel.prototype, "tabs", {
        get: function () {
            return new Tabs(this);
        },
        enumerable: true,
        configurable: true
    });
    return Channel;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_3__["GraphQueryableInstance"]));

var Apps = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Apps, _super);
    function Apps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates a new App in the Team
     * @param appUrl The url to an app ex: https://graph.microsoft.com/beta/appCatalogs/teamsApps/12345678-9abc-def0-123456789a
     *
     */
    Apps.prototype.add = function (appUrl) {
        var postBody = {
            "teamsApp@odata.bind": appUrl,
        };
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_5__["jsS"])(postBody),
        }).then(function (r) {
            return {
                data: r,
            };
        });
    };
    /**
     * Deletes this app
     */
    Apps.prototype.remove = function () {
        return this.deleteCore();
    };
    Apps = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_3__["defaultPath"])("installedApps")
    ], Apps);
    return Apps;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_3__["GraphQueryableCollection"]));

var Tabs = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Tabs, _super);
    function Tabs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Adds a tab to the cahnnel
     * @param name The name of the new Tab
     * @param appUrl The url to an app ex: https://graph.microsoft.com/beta/appCatalogs/teamsApps/12345678-9abc-def0-123456789a
     * @param tabsConfiguration visit https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/teamstab_add for reference
     */
    Tabs.prototype.add = function (name, appUrl, properties) {
        var _this = this;
        var postBody = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_5__["extend"])({
            name: name,
            "teamsApp@odata.bind": appUrl,
        }, properties);
        return this.postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_5__["jsS"])(postBody),
        }).then(function (r) {
            return {
                data: r,
                tab: _this.getById(r.id),
            };
        });
    };
    Tabs.prototype.getById = function (id) {
        return new Tab(this, id);
    };
    Tabs = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_3__["defaultPath"])("tabs")
    ], Tabs);
    return Tabs;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_3__["GraphQueryableCollection"]));

/**
 * Represents a Microsoft Team
 */
var Tab = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Tab, _super);
    function Tab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tab_1 = Tab;
    /**
     * Updates this tab
     *
     * @param properties The set of properties to update
     */
    // TODO:: update properties to be typed once type is available in graph-types
    Tab.prototype.update = function (properties) {
        var _this = this;
        return this.clone(Tab_1, "").patchCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_5__["jsS"])(properties),
        }).then(function (data) {
            return {
                data: data,
                tab: _this,
            };
        });
    };
    /**
     * Deletes this tab
     */
    Tab.prototype.remove = function () {
        return this.deleteCore();
    };
    var Tab_1;
    Tab = Tab_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_3__["defaultPath"])("tab")
    ], Tab);
    return Tab;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_3__["GraphQueryableInstance"]));

//# sourceMappingURL=teams.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/types.js":
/*!***********************************************!*\
  !*** ./build/packages-es5/graph/src/types.js ***!
  \***********************************************/
/*! exports provided: GraphEndpoints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GraphEndpoints", function() { return GraphEndpoints; });
var GraphEndpoints = /** @class */ (function () {
    function GraphEndpoints() {
    }
    /**
     *
     * @param url The url to set the endpoint
     */
    GraphEndpoints.ensure = function (url, endpoint) {
        var all = [GraphEndpoints.Beta, GraphEndpoints.V1];
        var regex = new RegExp(endpoint, "i");
        var replaces = all.filter(function (s) { return !regex.test(s); }).map(function (s) { return s.replace(".", "\\."); });
        regex = new RegExp("/?(" + replaces.join("|") + ")/", "ig");
        return url.replace(regex, "/" + endpoint + "/");
    };
    GraphEndpoints.Beta = "beta";
    GraphEndpoints.V1 = "v1.0";
    return GraphEndpoints;
}());

//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./build/packages-es5/graph/src/users.js":
/*!***********************************************!*\
  !*** ./build/packages-es5/graph/src/users.js ***!
  \***********************************************/
/*! exports provided: Users, User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Users", function() { return Users; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");
/* harmony import */ var _graphqueryable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./graphqueryable */ "./build/packages-es5/graph/src/graphqueryable.js");
/* harmony import */ var _contacts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contacts */ "./build/packages-es5/graph/src/contacts.js");
/* harmony import */ var _onenote__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./onenote */ "./build/packages-es5/graph/src/onenote.js");
/* harmony import */ var _onedrive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./onedrive */ "./build/packages-es5/graph/src/onedrive.js");
/* harmony import */ var _planner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./planner */ "./build/packages-es5/graph/src/planner.js");
/* harmony import */ var _teams__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./teams */ "./build/packages-es5/graph/src/teams.js");
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./messages */ "./build/packages-es5/graph/src/messages.js");
/* harmony import */ var _directoryobjects__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./directoryobjects */ "./build/packages-es5/graph/src/directoryobjects.js");










/**
 * Describes a collection of Users objects
 *
 */
var Users = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Users, _super);
    function Users() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets a user from the collection using the specified id
     *
     * @param id Id of the user to get from this collection
     */
    Users.prototype.getById = function (id) {
        return new User(this, id);
    };
    Users = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_graphqueryable__WEBPACK_IMPORTED_MODULE_2__["defaultPath"])("users")
    ], Users);
    return Users;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_2__["GraphQueryableCollection"]));

/**
 * Represents a user entity
 */
var User = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(User.prototype, "onenote", {
        /**
        * The onenote associated with me
        */
        get: function () {
            return new _onenote__WEBPACK_IMPORTED_MODULE_4__["OneNote"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "contacts", {
        /**
        * The Contacts associated with the user
        */
        get: function () {
            return new _contacts__WEBPACK_IMPORTED_MODULE_3__["Contacts"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "joinedTeams", {
        /**
        * The Teams associated with the user
        */
        get: function () {
            return new _teams__WEBPACK_IMPORTED_MODULE_7__["Teams"](this, "joinedTeams");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "memberOf", {
        /**
        * The groups and directory roles associated with the user
        */
        get: function () {
            return new _directoryobjects__WEBPACK_IMPORTED_MODULE_9__["DirectoryObjects"](this, "memberOf");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns all the groups and directory roles that the specified useris a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    User.prototype.getMemberObjects = function (securityEnabledOnly) {
        if (securityEnabledOnly === void 0) { securityEnabledOnly = false; }
        return this.clone(User, "getMemberObjects").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["jsS"])({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    };
    /**
     * Return all the groups that the specified user is a member of. The check is transitive
     *
     * @param securityEnabledOnly
     */
    User.prototype.getMemberGroups = function (securityEnabledOnly) {
        if (securityEnabledOnly === void 0) { securityEnabledOnly = false; }
        return this.clone(User, "getMemberGroups").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["jsS"])({
                securityEnabledOnly: securityEnabledOnly,
            }),
        });
    };
    /**
     * Check for membership in a specified list of groups, and returns from that list those groups of which the specified user, group, or directory object is a member.
     * This function is transitive.
     * @param groupIds A collection that contains the object IDs of the groups in which to check membership. Up to 20 groups may be specified.
     */
    User.prototype.checkMemberGroups = function (groupIds) {
        return this.clone(User, "checkMemberGroups").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["jsS"])({
                groupIds: groupIds,
            }),
        });
    };
    Object.defineProperty(User.prototype, "contactFolders", {
        /**
        * The Contact Folders associated with the user
        */
        get: function () {
            return new _contacts__WEBPACK_IMPORTED_MODULE_3__["ContactFolders"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "drive", {
        /**
        * The default Drive associated with the user
        */
        get: function () {
            return new _onedrive__WEBPACK_IMPORTED_MODULE_5__["Drive"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "drives", {
        /**
        * The Drives the user has available
        */
        get: function () {
            return new _onedrive__WEBPACK_IMPORTED_MODULE_5__["Drives"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "tasks", {
        /**
        * The Tasks the user has available
        */
        get: function () {
            return new _planner__WEBPACK_IMPORTED_MODULE_6__["Tasks"](this, "planner/tasks");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "messages", {
        /**
         * Get the messages in the signed-in user's mailbox
         */
        get: function () {
            return new _messages__WEBPACK_IMPORTED_MODULE_8__["Messages"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "mailboxSettings", {
        /**
         * Get the MailboxSettings in the signed-in user's mailbox
         */
        get: function () {
            return new _messages__WEBPACK_IMPORTED_MODULE_8__["MailboxSettings"](this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(User.prototype, "mailFolders", {
        /**
         * Get the MailboxSettings in the signed-in user's mailbox
         */
        get: function () {
            return new _messages__WEBPACK_IMPORTED_MODULE_8__["MailFolders"](this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates this user
     *
     * @param properties Properties used to update this user
     */
    User.prototype.update = function (properties) {
        return this.patchCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["jsS"])(properties),
        });
    };
    /**
     * Deletes this user
     */
    User.prototype.delete = function () {
        return this.deleteCore();
    };
    /**
     * Send the message specified in the request body. The message is saved in the Sent Items folder by default.
     */
    User.prototype.sendMail = function (message) {
        return this.clone(User, "sendMail").postCore({
            body: Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["jsS"])(message),
        });
    };
    return User;
}(_graphqueryable__WEBPACK_IMPORTED_MODULE_2__["GraphQueryableInstance"]));

//# sourceMappingURL=users.js.map

/***/ }),

/***/ "./build/packages-es5/logging/index.js":
/*!*********************************************!*\
  !*** ./build/packages-es5/logging/index.js ***!
  \*********************************************/
/*! exports provided: Logger, LogLevel, ConsoleListener, FunctionListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_logging__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/logging */ "./build/packages-es5/logging/src/logging.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return _src_logging__WEBPACK_IMPORTED_MODULE_0__["Logger"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return _src_logging__WEBPACK_IMPORTED_MODULE_0__["LogLevel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConsoleListener", function() { return _src_logging__WEBPACK_IMPORTED_MODULE_0__["ConsoleListener"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FunctionListener", function() { return _src_logging__WEBPACK_IMPORTED_MODULE_0__["FunctionListener"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./build/packages-es5/logging/src/listeners.js":
/*!*****************************************************!*\
  !*** ./build/packages-es5/logging/src/listeners.js ***!
  \*****************************************************/
/*! exports provided: ConsoleListener, FunctionListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsoleListener", function() { return ConsoleListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FunctionListener", function() { return FunctionListener; });
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
        if (entry.data !== undefined) {
            try {
                msg.push(" Data: " + JSON.stringify(entry.data));
            }
            catch (e) {
                msg.push(" Data: Error in stringify of supplied data " + e);
            }
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

//# sourceMappingURL=listeners.js.map

/***/ }),

/***/ "./build/packages-es5/logging/src/logger.js":
/*!**************************************************!*\
  !*** ./build/packages-es5/logging/src/logger.js ***!
  \**************************************************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
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
            if (Logger._instance === undefined || Logger._instance === null) {
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
        this.write(JSON.stringify(json), level);
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
        if (entry !== undefined && this.activeLogLevel <= entry.level) {
            this.subscribers.map(function (subscriber) { return subscriber.log(entry); });
        }
    };
    return LoggerImpl;
}());
//# sourceMappingURL=logger.js.map

/***/ }),

/***/ "./build/packages-es5/logging/src/logging.js":
/*!***************************************************!*\
  !*** ./build/packages-es5/logging/src/logging.js ***!
  \***************************************************/
/*! exports provided: Logger, LogLevel, ConsoleListener, FunctionListener */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ "./build/packages-es5/logging/src/logger.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return _logger__WEBPACK_IMPORTED_MODULE_0__["Logger"]; });

/* harmony import */ var _loglevel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loglevel */ "./build/packages-es5/logging/src/loglevel.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return _loglevel__WEBPACK_IMPORTED_MODULE_1__["LogLevel"]; });

/* harmony import */ var _listeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listeners */ "./build/packages-es5/logging/src/listeners.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConsoleListener", function() { return _listeners__WEBPACK_IMPORTED_MODULE_2__["ConsoleListener"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FunctionListener", function() { return _listeners__WEBPACK_IMPORTED_MODULE_2__["FunctionListener"]; });




//# sourceMappingURL=logging.js.map

/***/ }),

/***/ "./build/packages-es5/logging/src/loglevel.js":
/*!****************************************************!*\
  !*** ./build/packages-es5/logging/src/loglevel.js ***!
  \****************************************************/
/*! exports provided: LogLevel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogLevel", function() { return LogLevel; });
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
//# sourceMappingURL=loglevel.js.map

/***/ }),

/***/ "./build/packages-es5/odata/index.js":
/*!*******************************************!*\
  !*** ./build/packages-es5/odata/index.js ***!
  \*******************************************/
/*! exports provided: CachingOptions, CachingParserWrapper, HttpRequestError, ODataParserBase, ODataDefaultParser, TextParser, BlobParser, JSONParser, BufferParser, LambdaParser, setResult, pipe, requestPipelineMethod, PipelineMethods, getDefaultPipeline, Queryable, ODataQueryable, ODataBatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_odata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/odata */ "./build/packages-es5/odata/src/odata.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CachingOptions", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["CachingOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CachingParserWrapper", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["CachingParserWrapper"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpRequestError", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["HttpRequestError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ODataParserBase", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["ODataParserBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ODataDefaultParser", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["ODataDefaultParser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextParser", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["TextParser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BlobParser", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["BlobParser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JSONParser", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["JSONParser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BufferParser", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["BufferParser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LambdaParser", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["LambdaParser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setResult", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["setResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["pipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestPipelineMethod", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["requestPipelineMethod"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PipelineMethods", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["PipelineMethods"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDefaultPipeline", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["getDefaultPipeline"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Queryable", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["Queryable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ODataQueryable", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["ODataQueryable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ODataBatch", function() { return _src_odata__WEBPACK_IMPORTED_MODULE_0__["ODataBatch"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./build/packages-es5/odata/src/caching.js":
/*!*************************************************!*\
  !*** ./build/packages-es5/odata/src/caching.js ***!
  \*************************************************/
/*! exports provided: CachingOptions, CachingParserWrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CachingOptions", function() { return CachingOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CachingParserWrapper", function() { return CachingParserWrapper; });
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");

var CachingOptions = /** @class */ (function () {
    function CachingOptions(key) {
        this.key = key;
        this.expiration = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_0__["dateAdd"])(new Date(), "second", _pnp_common__WEBPACK_IMPORTED_MODULE_0__["RuntimeConfig"].defaultCachingTimeoutSeconds);
        this.storeName = _pnp_common__WEBPACK_IMPORTED_MODULE_0__["RuntimeConfig"].defaultCachingStore;
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
    CachingOptions.storage = new _pnp_common__WEBPACK_IMPORTED_MODULE_0__["PnPClientStorage"]();
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

//# sourceMappingURL=caching.js.map

/***/ }),

/***/ "./build/packages-es5/odata/src/odata.js":
/*!***********************************************!*\
  !*** ./build/packages-es5/odata/src/odata.js ***!
  \***********************************************/
/*! exports provided: CachingOptions, CachingParserWrapper, HttpRequestError, ODataParserBase, ODataDefaultParser, TextParser, BlobParser, JSONParser, BufferParser, LambdaParser, setResult, pipe, requestPipelineMethod, PipelineMethods, getDefaultPipeline, Queryable, ODataQueryable, ODataBatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _caching__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./caching */ "./build/packages-es5/odata/src/caching.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CachingOptions", function() { return _caching__WEBPACK_IMPORTED_MODULE_0__["CachingOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CachingParserWrapper", function() { return _caching__WEBPACK_IMPORTED_MODULE_0__["CachingParserWrapper"]; });

/* harmony import */ var _parsers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parsers */ "./build/packages-es5/odata/src/parsers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HttpRequestError", function() { return _parsers__WEBPACK_IMPORTED_MODULE_1__["HttpRequestError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ODataParserBase", function() { return _parsers__WEBPACK_IMPORTED_MODULE_1__["ODataParserBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ODataDefaultParser", function() { return _parsers__WEBPACK_IMPORTED_MODULE_1__["ODataDefaultParser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TextParser", function() { return _parsers__WEBPACK_IMPORTED_MODULE_1__["TextParser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BlobParser", function() { return _parsers__WEBPACK_IMPORTED_MODULE_1__["BlobParser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "JSONParser", function() { return _parsers__WEBPACK_IMPORTED_MODULE_1__["JSONParser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BufferParser", function() { return _parsers__WEBPACK_IMPORTED_MODULE_1__["BufferParser"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LambdaParser", function() { return _parsers__WEBPACK_IMPORTED_MODULE_1__["LambdaParser"]; });

/* harmony import */ var _pipeline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pipeline */ "./build/packages-es5/odata/src/pipeline.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setResult", function() { return _pipeline__WEBPACK_IMPORTED_MODULE_2__["setResult"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return _pipeline__WEBPACK_IMPORTED_MODULE_2__["pipe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "requestPipelineMethod", function() { return _pipeline__WEBPACK_IMPORTED_MODULE_2__["requestPipelineMethod"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PipelineMethods", function() { return _pipeline__WEBPACK_IMPORTED_MODULE_2__["PipelineMethods"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDefaultPipeline", function() { return _pipeline__WEBPACK_IMPORTED_MODULE_2__["getDefaultPipeline"]; });

/* harmony import */ var _queryable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./queryable */ "./build/packages-es5/odata/src/queryable.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Queryable", function() { return _queryable__WEBPACK_IMPORTED_MODULE_3__["Queryable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ODataQueryable", function() { return _queryable__WEBPACK_IMPORTED_MODULE_3__["ODataQueryable"]; });

/* harmony import */ var _odatabatch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./odatabatch */ "./build/packages-es5/odata/src/odatabatch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ODataBatch", function() { return _odatabatch__WEBPACK_IMPORTED_MODULE_4__["ODataBatch"]; });






//# sourceMappingURL=odata.js.map

/***/ }),

/***/ "./build/packages-es5/odata/src/odatabatch.js":
/*!****************************************************!*\
  !*** ./build/packages-es5/odata/src/odatabatch.js ***!
  \****************************************************/
/*! exports provided: ODataBatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ODataBatch", function() { return ODataBatch; });
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");

var ODataBatch = /** @class */ (function () {
    function ODataBatch(_batchId) {
        if (_batchId === void 0) { _batchId = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_0__["getGUID"])(); }
        this._batchId = _batchId;
        this._reqs = [];
        this._deps = [];
        this._rDeps = [];
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
            return this._reqs;
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
     * @param id An identifier used to track a request within a batch
     */
    ODataBatch.prototype.add = function (url, method, options, parser, id) {
        var info = {
            id: id,
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
        this._reqs.push(info);
        return p;
    };
    /**
     * Adds a dependency insuring that some set of actions will occur before a batch is processed.
     * MUST be cleared using the returned resolve delegate to allow batches to run
     */
    ODataBatch.prototype.addDependency = function () {
        var resolver = function () { return void (0); };
        this._deps.push(new Promise(function (resolve) {
            resolver = resolve;
        }));
        return resolver;
    };
    /**
     * The batch's execute method will not resolve util any promises added here resolve
     *
     * @param p The dependent promise
     */
    ODataBatch.prototype.addResolveBatchDependency = function (p) {
        this._rDeps.push(p);
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
        return Promise.all(this._deps)
            .then(function () { return _this.executeImpl(); })
            .then(function () { return Promise.all(_this._rDeps); })
            .then(function () { return void (0); });
    };
    return ODataBatch;
}());

//# sourceMappingURL=odatabatch.js.map

/***/ }),

/***/ "./build/packages-es5/odata/src/parsers.js":
/*!*************************************************!*\
  !*** ./build/packages-es5/odata/src/parsers.js ***!
  \*************************************************/
/*! exports provided: HttpRequestError, ODataParserBase, ODataDefaultParser, TextParser, BlobParser, JSONParser, BufferParser, LambdaParser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpRequestError", function() { return HttpRequestError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ODataParserBase", function() { return ODataParserBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ODataDefaultParser", function() { return ODataDefaultParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextParser", function() { return TextParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BlobParser", function() { return BlobParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JSONParser", function() { return JSONParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BufferParser", function() { return BufferParser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LambdaParser", function() { return LambdaParser; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");


var HttpRequestError = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](HttpRequestError, _super);
    function HttpRequestError(message, response, status, statusText) {
        if (status === void 0) { status = response.status; }
        if (statusText === void 0) { statusText = response.statusText; }
        var _this = _super.call(this, message) || this;
        _this.response = response;
        _this.status = status;
        _this.statusText = statusText;
        _this.isHttpRequestError = true;
        return _this;
    }
    HttpRequestError.init = function (r) {
        return r.clone().text().then(function (t) {
            return new HttpRequestError("Error making HttpClient request in queryable [" + r.status + "] " + r.statusText + " ::> " + t, r.clone());
        });
    };
    return HttpRequestError;
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
            HttpRequestError.init(r).then(reject);
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
        if (Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["hOP"])(json, "d")) {
            if (Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["hOP"])(json.d, "results")) {
                result = json.d.results;
            }
            else {
                result = json.d;
            }
        }
        else if (Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["hOP"])(json, "value")) {
            result = json.value;
        }
        return result;
    };
    return ODataParserBase;
}());

var ODataDefaultParser = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ODataDefaultParser, _super);
    function ODataDefaultParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ODataDefaultParser;
}(ODataParserBase));

var TextParser = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TextParser, _super);
    function TextParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextParser.prototype.parseImpl = function (r, resolve) {
        r.text().then(resolve);
    };
    return TextParser;
}(ODataParserBase));

var BlobParser = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BlobParser, _super);
    function BlobParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlobParser.prototype.parseImpl = function (r, resolve) {
        r.blob().then(resolve);
    };
    return BlobParser;
}(ODataParserBase));

var JSONParser = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](JSONParser, _super);
    function JSONParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSONParser.prototype.parseImpl = function (r, resolve) {
        r.json().then(resolve);
    };
    return JSONParser;
}(ODataParserBase));

var BufferParser = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BufferParser, _super);
    function BufferParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BufferParser.prototype.parseImpl = function (r, resolve) {
        if (Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["isFunc"])(r.arrayBuffer)) {
            r.arrayBuffer().then(resolve);
        }
        else {
            r.buffer().then(resolve);
        }
    };
    return BufferParser;
}(ODataParserBase));

var LambdaParser = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LambdaParser, _super);
    function LambdaParser(parser) {
        var _this = _super.call(this) || this;
        _this.parser = parser;
        return _this;
    }
    LambdaParser.prototype.parseImpl = function (r, resolve) {
        this.parser(r).then(resolve);
    };
    return LambdaParser;
}(ODataParserBase));

//# sourceMappingURL=parsers.js.map

/***/ }),

/***/ "./build/packages-es5/odata/src/pipeline.js":
/*!**************************************************!*\
  !*** ./build/packages-es5/odata/src/pipeline.js ***!
  \**************************************************/
/*! exports provided: setResult, pipe, requestPipelineMethod, PipelineMethods, getDefaultPipeline */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setResult", function() { return setResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return pipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestPipelineMethod", function() { return requestPipelineMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PipelineMethods", function() { return PipelineMethods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDefaultPipeline", function() { return getDefaultPipeline; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");
/* harmony import */ var _pnp_logging__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @pnp/logging */ "./build/packages-es5/logging/index.js");
/* harmony import */ var _caching__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./caching */ "./build/packages-es5/odata/src/caching.js");




/**
 * Resolves the context's result value
 *
 * @param context The current context
 */
function returnResult(context) {
    _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].log({
        data: _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].activeLogLevel === 0 /* Verbose */ ? context.result : {},
        level: 1 /* Info */,
        message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") Returning result from pipeline. Set logging to verbose to see data.",
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
        _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Request pipeline contains no methods!", 2 /* Warning */);
    }
    var promise = next(context).then(function (ctx) { return returnResult(ctx); }).catch(function (e) {
        _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].error(e);
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
            if (!alwaysRun && args.length > 0 && Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["hOP"])(args[0], "hasResult") && args[0].hasResult) {
                _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].write("[" + args[0].requestId + "] (" + (new Date()).getTime() + ") Skipping request pipeline method " + propertyKey + ", existing result in pipeline.", 0 /* Verbose */);
                return Promise.resolve(args[0]);
            }
            // apply the tagged method
            _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].write("[" + args[0].requestId + "] (" + (new Date()).getTime() + ") Calling request pipeline method " + propertyKey + ".", 0 /* Verbose */);
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
            _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].log({
                data: _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].activeLogLevel === 1 /* Info */ ? {} : context,
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
                _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Caching is enabled for request, checking cache...", 1 /* Info */);
                var cacheOptions = new _caching__WEBPACK_IMPORTED_MODULE_3__["CachingOptions"](context.requestAbsoluteUrl.toLowerCase());
                if (context.cachingOptions !== undefined) {
                    cacheOptions = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["extend"])(cacheOptions, context.cachingOptions);
                }
                // we may not have a valid store
                if (cacheOptions.store !== null) {
                    // check if we have the data in cache and if so resolve the promise and return
                    var data = cacheOptions.store.get(cacheOptions.key);
                    if (data !== null) {
                        // ensure we clear any held batch dependency we are resolving from the cache
                        _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].log({
                            data: _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].activeLogLevel === 1 /* Info */ ? {} : data,
                            level: 1 /* Info */,
                            message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") Value returned from cache.",
                        });
                        if (Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["isFunc"])(context.batchDependency)) {
                            context.batchDependency();
                        }
                        // handle the case where a parser needs to take special actions with a cached result
                        if (Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["hOP"])(context.parser, "hydrate")) {
                            data = context.parser.hydrate(data);
                        }
                        return setResult(context, data).then(function (ctx) { return resolve(ctx); });
                    }
                }
                _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Value not found in cache.", 1 /* Info */);
                // if we don't then wrap the supplied parser in the caching parser wrapper
                // and send things on their way
                context.parser = new _caching__WEBPACK_IMPORTED_MODULE_3__["CachingParserWrapper"](context.parser, cacheOptions);
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
                if (Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["isFunc"])(context.batchDependency)) {
                    context.batchDependency();
                }
                _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Batching request in batch " + context.batch.batchId + ".", 1 /* Info */);
                // we set the result as the promise which will be resolved by the batch's execution
                resolve(setResult(context, p));
            }
            else {
                _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].write("[" + context.requestId + "] (" + (new Date()).getTime() + ") Sending request.", 1 /* Info */);
                // we are not part of a batch, so proceed as normal
                var client = context.clientFactory();
                var opts = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["extend"])(context.options || {}, { method: context.verb });
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
                _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].log({
                    data: _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].activeLogLevel === 1 /* Info */ ? {} : context,
                    level: 1 /* Info */,
                    message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") " + context.verb + " request will complete in batch " + context.batch.batchId + ".",
                });
            }
            else {
                _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].log({
                    data: _pnp_logging__WEBPACK_IMPORTED_MODULE_2__["Logger"].activeLogLevel === 1 /* Info */ ? {} : context,
                    level: 1 /* Info */,
                    message: "[" + context.requestId + "] (" + (new Date()).getTime() + ") Completing " + context.verb + " request.",
                });
            }
            resolve(context);
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        requestPipelineMethod(true)
    ], PipelineMethods, "logStart", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        requestPipelineMethod()
    ], PipelineMethods, "caching", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        requestPipelineMethod()
    ], PipelineMethods, "send", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
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
//# sourceMappingURL=pipeline.js.map

/***/ }),

/***/ "./build/packages-es5/odata/src/queryable.js":
/*!***************************************************!*\
  !*** ./build/packages-es5/odata/src/queryable.js ***!
  \***************************************************/
/*! exports provided: Queryable, ODataQueryable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Queryable", function() { return Queryable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ODataQueryable", function() { return ODataQueryable; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _pnp_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @pnp/common */ "./build/packages-es5/common/index.js");
/* harmony import */ var _parsers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parsers */ "./build/packages-es5/odata/src/parsers.js");
/* harmony import */ var _pipeline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pipeline */ "./build/packages-es5/odata/src/pipeline.js");




var Queryable = /** @class */ (function () {
    function Queryable() {
        this._query = new Map();
        this._options = {};
        this._url = "";
        this._parentUrl = "";
        this._useCaching = false;
        this._cachingOptions = null;
        this._cloneParentWasCaching = false;
        this._cloneParentCacheOptions = null;
        this._requestPipeline = null;
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
        Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["mergeOptions"])(this._options, options);
        return this;
    };
    /**
     * Configures this instance from the configure options of the supplied instance
     *
     * @param o Instance from which options should be taken
     */
    Queryable.prototype.configureFrom = function (o) {
        Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["mergeOptions"])(this._options, o._options);
        return this;
    };
    /**
     * Enables caching for this request
     *
     * @param options Defines the options used when caching this request
     */
    Queryable.prototype.usingCaching = function (options) {
        if (!_pnp_common__WEBPACK_IMPORTED_MODULE_1__["RuntimeConfig"].globalCacheDisable) {
            this._useCaching = true;
            if (options !== undefined) {
                this._cachingOptions = options;
            }
        }
        return this;
    };
    /**
     * Allows you to set a request specific processing pipeline
     *
     * @param pipeline The set of methods, in order, to execute a given request
     */
    Queryable.prototype.withPipeline = function (pipeline) {
        this._requestPipeline = pipeline.slice(0);
        return this;
    };
    Queryable.prototype.getCore = function (parser, options) {
        if (parser === void 0) { parser = new _parsers__WEBPACK_IMPORTED_MODULE_2__["JSONParser"](); }
        if (options === void 0) { options = {}; }
        // Fix for #304 - when we clone objects we in some cases then execute a get request
        // in these cases the caching settings were getting dropped from the request
        // this tracks if the object from which this was cloned was caching and applies that to an immediate get request
        // does not affect objects cloned from this as we are using different fields to track the settings so it won't
        // be triggered
        if (this._cloneParentWasCaching) {
            this.usingCaching(this._cloneParentCacheOptions);
        }
        return this.reqImpl("GET", options, parser);
    };
    Queryable.prototype.postCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new _parsers__WEBPACK_IMPORTED_MODULE_2__["JSONParser"](); }
        return this.reqImpl("POST", options, parser);
    };
    Queryable.prototype.patchCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new _parsers__WEBPACK_IMPORTED_MODULE_2__["JSONParser"](); }
        return this.reqImpl("PATCH", options, parser);
    };
    Queryable.prototype.deleteCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new _parsers__WEBPACK_IMPORTED_MODULE_2__["JSONParser"](); }
        return this.reqImpl("DELETE", options, parser);
    };
    Queryable.prototype.putCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new _parsers__WEBPACK_IMPORTED_MODULE_2__["JSONParser"](); }
        return this.reqImpl("PUT", options, parser);
    };
    Queryable.prototype.reqImpl = function (method, options, parser) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return this.getRequestPipeline(method, options, parser)
            .then(function (pipeline) { return _this.toRequestContext(method, options, parser, pipeline); })
            .then(function (context) { return Object(_pipeline__WEBPACK_IMPORTED_MODULE_3__["pipe"])(context); });
    };
    /**
     * Appends the given string and normalizes "/" chars
     *
     * @param pathPart The string to append
     */
    Queryable.prototype.append = function (pathPart) {
        this._url = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["combine"])(this._url, pathPart);
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
        this._url = Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["combine"])(this._parentUrl, path || "");
        this.configureFrom(parent);
    };
    /**
     * Configures a cloned object from this instance
     *
     * @param clone
     */
    Queryable.prototype._clone = function (clone, _0) {
        clone.configureFrom(this);
        if (this._useCaching) {
            clone._cloneParentWasCaching = true;
            clone._cloneParentCacheOptions = this._cachingOptions;
        }
        return clone;
    };
    /**
     * Handles getting the request pipeline to run for a given request
     */
    // @ts-ignore
    // justified because we want to show that all these arguments are passed to the method so folks inheriting and potentially overriding
    // clearly see how the method is invoked inside the class
    Queryable.prototype.getRequestPipeline = function (method, options, parser) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new Promise(function (resolve) {
            if (Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["objectDefinedNotNull"])(_this._requestPipeline) && Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["isArray"])(_this._requestPipeline)) {
                resolve(_this._requestPipeline);
            }
            else {
                resolve(Object(_pipeline__WEBPACK_IMPORTED_MODULE_3__["getDefaultPipeline"])());
            }
        });
    };
    return Queryable;
}());

var ODataQueryable = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ODataQueryable, _super);
    function ODataQueryable() {
        var _this = _super.call(this) || this;
        _this._batch = null;
        _this._batchDependency = null;
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
            throw Error("This query is already part of a batch.");
        }
        if (Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["objectDefinedNotNull"])(batch)) {
            this._batch = batch;
            this._batchDependency = batch.addDependency();
        }
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
        if (parser === void 0) { parser = new _parsers__WEBPACK_IMPORTED_MODULE_2__["ODataDefaultParser"](); }
        if (options === void 0) { options = {}; }
        return this.getCore(parser, options);
    };
    ODataQueryable.prototype.getCore = function (parser, options) {
        if (parser === void 0) { parser = new _parsers__WEBPACK_IMPORTED_MODULE_2__["ODataDefaultParser"](); }
        if (options === void 0) { options = {}; }
        return _super.prototype.getCore.call(this, parser, options);
    };
    ODataQueryable.prototype.postCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new _parsers__WEBPACK_IMPORTED_MODULE_2__["ODataDefaultParser"](); }
        return _super.prototype.postCore.call(this, options, parser);
    };
    ODataQueryable.prototype.patchCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new _parsers__WEBPACK_IMPORTED_MODULE_2__["ODataDefaultParser"](); }
        return _super.prototype.patchCore.call(this, options, parser);
    };
    ODataQueryable.prototype.deleteCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new _parsers__WEBPACK_IMPORTED_MODULE_2__["ODataDefaultParser"](); }
        return _super.prototype.deleteCore.call(this, options, parser);
    };
    ODataQueryable.prototype.putCore = function (options, parser) {
        if (options === void 0) { options = {}; }
        if (parser === void 0) { parser = new _parsers__WEBPACK_IMPORTED_MODULE_2__["ODataDefaultParser"](); }
        return _super.prototype.putCore.call(this, options, parser);
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
            return Object(_pnp_common__WEBPACK_IMPORTED_MODULE_1__["objectDefinedNotNull"])(this._batch);
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
    /**
     * Configures a cloned object from this instance
     *
     * @param clone
     */
    ODataQueryable.prototype._clone = function (clone, cloneSettings) {
        clone = _super.prototype._clone.call(this, clone, cloneSettings);
        if (cloneSettings.includeBatch) {
            clone = clone.inBatch(this._batch);
        }
        return clone;
    };
    return ODataQueryable;
}(Queryable));

//# sourceMappingURL=queryable.js.map

/***/ }),

/***/ "./node_modules/adal-angular/dist/adal.min.js":
/*!****************************************************!*\
  !*** ./node_modules/adal-angular/dist/adal.min.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! adal-angular v1.0.17 2018-02-27 */
var AuthenticationContext=function(){"use strict";return AuthenticationContext=function(a){if(this.REQUEST_TYPE={LOGIN:"LOGIN",RENEW_TOKEN:"RENEW_TOKEN",UNKNOWN:"UNKNOWN"},this.RESPONSE_TYPE={ID_TOKEN_TOKEN:"id_token token",TOKEN:"token"},this.CONSTANTS={ACCESS_TOKEN:"access_token",EXPIRES_IN:"expires_in",ID_TOKEN:"id_token",ERROR_DESCRIPTION:"error_description",SESSION_STATE:"session_state",ERROR:"error",STORAGE:{TOKEN_KEYS:"adal.token.keys",ACCESS_TOKEN_KEY:"adal.access.token.key",EXPIRATION_KEY:"adal.expiration.key",STATE_LOGIN:"adal.state.login",STATE_RENEW:"adal.state.renew",NONCE_IDTOKEN:"adal.nonce.idtoken",SESSION_STATE:"adal.session.state",USERNAME:"adal.username",IDTOKEN:"adal.idtoken",ERROR:"adal.error",ERROR_DESCRIPTION:"adal.error.description",LOGIN_REQUEST:"adal.login.request",LOGIN_ERROR:"adal.login.error",RENEW_STATUS:"adal.token.renew.status",ANGULAR_LOGIN_REQUEST:"adal.angular.login.request"},RESOURCE_DELIMETER:"|",CACHE_DELIMETER:"||",LOADFRAME_TIMEOUT:6e3,TOKEN_RENEW_STATUS_CANCELED:"Canceled",TOKEN_RENEW_STATUS_COMPLETED:"Completed",TOKEN_RENEW_STATUS_IN_PROGRESS:"In Progress",LOGGING_LEVEL:{ERROR:0,WARN:1,INFO:2,VERBOSE:3},LEVEL_STRING_MAP:{0:"ERROR:",1:"WARNING:",2:"INFO:",3:"VERBOSE:"},POPUP_WIDTH:483,POPUP_HEIGHT:600},AuthenticationContext.prototype._singletonInstance)return AuthenticationContext.prototype._singletonInstance;if(AuthenticationContext.prototype._singletonInstance=this,this.instance="https://login.microsoftonline.com/",this.config={},this.callback=null,this.popUp=!1,this.isAngular=!1,this._user=null,this._activeRenewals={},this._loginInProgress=!1,this._acquireTokenInProgress=!1,this._renewStates=[],this._callBackMappedToRenewStates={},this._callBacksMappedToRenewStates={},this._openedWindows=[],this._requestType=this.REQUEST_TYPE.LOGIN,window._adalInstance=this,a.displayCall&&"function"!=typeof a.displayCall)throw new Error("displayCall is not a function");if(!a.clientId)throw new Error("clientId is required");this.config=this._cloneConfig(a),void 0===this.config.navigateToLoginRequestUrl&&(this.config.navigateToLoginRequestUrl=!0),this.config.popUp&&(this.popUp=!0),this.config.callback&&"function"==typeof this.config.callback&&(this.callback=this.config.callback),this.config.instance&&(this.instance=this.config.instance),this.config.loginResource||(this.config.loginResource=this.config.clientId),this.config.redirectUri||(this.config.redirectUri=window.location.href.split("?")[0].split("#")[0]),this.config.postLogoutRedirectUri||(this.config.postLogoutRedirectUri=window.location.href.split("?")[0].split("#")[0]),this.config.anonymousEndpoints||(this.config.anonymousEndpoints=[]),this.config.isAngular&&(this.isAngular=this.config.isAngular),this.config.loadFrameTimeout&&(this.CONSTANTS.LOADFRAME_TIMEOUT=this.config.loadFrameTimeout)},"undefined"!=typeof window&&(window.Logging={piiLoggingEnabled:!1,level:0,log:function(a){}}),AuthenticationContext.prototype.login=function(){if(this._loginInProgress)return void this.info("Login in progress");this._loginInProgress=!0;var a=this._guid();this.config.state=a,this._idTokenNonce=this._guid();var b=this._getItem(this.CONSTANTS.STORAGE.ANGULAR_LOGIN_REQUEST);b&&""!==b?this._saveItem(this.CONSTANTS.STORAGE.ANGULAR_LOGIN_REQUEST,""):b=window.location.href,this.verbose("Expected state: "+a+" startPage:"+b),this._saveItem(this.CONSTANTS.STORAGE.LOGIN_REQUEST,b),this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR,""),this._saveItem(this.CONSTANTS.STORAGE.STATE_LOGIN,a,!0),this._saveItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN,this._idTokenNonce,!0),this._saveItem(this.CONSTANTS.STORAGE.ERROR,""),this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION,"");var c=this._getNavigateUrl("id_token",null)+"&nonce="+encodeURIComponent(this._idTokenNonce);this.config.displayCall?this.config.displayCall(c):this.popUp?(this._saveItem(this.CONSTANTS.STORAGE.STATE_LOGIN,""),this._renewStates.push(a),this.registerCallback(a,this.config.clientId,this.callback),this._loginPopup(c)):this.promptUser(c)},AuthenticationContext.prototype._openPopup=function(a,b,c,d){try{var e=window.screenLeft?window.screenLeft:window.screenX,f=window.screenTop?window.screenTop:window.screenY,g=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,i=g/2-c/2+e,j=h/2-d/2+f,k=window.open(a,b,"width="+c+", height="+d+", top="+j+", left="+i);return k.focus&&k.focus(),k}catch(a){return this.warn("Error opening popup, "+a.message),this._loginInProgress=!1,this._acquireTokenInProgress=!1,null}},AuthenticationContext.prototype._handlePopupError=function(a,b,c,d,e){this.warn(d),this._saveItem(this.CONSTANTS.STORAGE.ERROR,c),this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION,d),this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR,e),b&&this._activeRenewals[b]&&(this._activeRenewals[b]=null),this._loginInProgress=!1,this._acquireTokenInProgress=!1,a&&a(d,null,c)},AuthenticationContext.prototype._loginPopup=function(a,b,c){var d=this._openPopup(a,"login",this.CONSTANTS.POPUP_WIDTH,this.CONSTANTS.POPUP_HEIGHT),e=c||this.callback;if(null==d){var f="Popup Window is null. This can happen if you are using IE";return void this._handlePopupError(e,b,"Error opening popup",f,f)}if(this._openedWindows.push(d),-1!=this.config.redirectUri.indexOf("#"))var g=this.config.redirectUri.split("#")[0];else var g=this.config.redirectUri;var h=this,i=window.setInterval(function(){if(!d||d.closed||void 0===d.closed){var a="Popup Window closed",c="Popup Window closed by UI action/ Popup Window handle destroyed due to cross zone navigation in IE/Edge";return h.isAngular&&h._broadcast("adal:popUpClosed",c+h.CONSTANTS.RESOURCE_DELIMETER+a),h._handlePopupError(e,b,a,c,c),void window.clearInterval(i)}try{var f=d.location;if(-1!=encodeURI(f.href).indexOf(encodeURI(g)))return h.isAngular?h._broadcast("adal:popUpHashChanged",f.hash):h.handleWindowCallback(f.hash),window.clearInterval(i),h._loginInProgress=!1,h._acquireTokenInProgress=!1,h.info("Closing popup window"),h._openedWindows=[],void d.close()}catch(a){}},1)},AuthenticationContext.prototype._broadcast=function(a,b){!function(){function a(a,b){b=b||{bubbles:!1,cancelable:!1,detail:void 0};var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}if("function"==typeof window.CustomEvent)return!1;a.prototype=window.Event.prototype,window.CustomEvent=a}();var c=new CustomEvent(a,{detail:b});window.dispatchEvent(c)},AuthenticationContext.prototype.loginInProgress=function(){return this._loginInProgress},AuthenticationContext.prototype._hasResource=function(a){var b=this._getItem(this.CONSTANTS.STORAGE.TOKEN_KEYS);return b&&!this._isEmpty(b)&&b.indexOf(a+this.CONSTANTS.RESOURCE_DELIMETER)>-1},AuthenticationContext.prototype.getCachedToken=function(a){if(!this._hasResource(a))return null;var b=this._getItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY+a),c=this._getItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY+a),d=this.config.expireOffsetSeconds||300;return c&&c>this._now()+d?b:(this._saveItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY+a,""),this._saveItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY+a,0),null)},AuthenticationContext.prototype.getCachedUser=function(){if(this._user)return this._user;var a=this._getItem(this.CONSTANTS.STORAGE.IDTOKEN);return this._user=this._createUser(a),this._user},AuthenticationContext.prototype.registerCallback=function(a,b,c){this._activeRenewals[b]=a,this._callBacksMappedToRenewStates[a]||(this._callBacksMappedToRenewStates[a]=[]);var d=this;this._callBacksMappedToRenewStates[a].push(c),this._callBackMappedToRenewStates[a]||(this._callBackMappedToRenewStates[a]=function(c,e,f,g){d._activeRenewals[b]=null;for(var h=0;h<d._callBacksMappedToRenewStates[a].length;++h)try{d._callBacksMappedToRenewStates[a][h](c,e,f,g)}catch(f){d.warn(f)}d._callBacksMappedToRenewStates[a]=null,d._callBackMappedToRenewStates[a]=null})},AuthenticationContext.prototype._renewToken=function(a,b,c){this.info("renewToken is called for resource:"+a);var d=this._addAdalFrame("adalRenewFrame"+a),e=this._guid()+"|"+a;this.config.state=e,this._renewStates.push(e),this.verbose("Renew token Expected state: "+e),c=c||"token";var f=this._urlRemoveQueryStringParameter(this._getNavigateUrl(c,a),"prompt");c===this.RESPONSE_TYPE.ID_TOKEN_TOKEN&&(this._idTokenNonce=this._guid(),this._saveItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN,this._idTokenNonce,!0),f+="&nonce="+encodeURIComponent(this._idTokenNonce)),f+="&prompt=none",f=this._addHintParameters(f),this.registerCallback(e,a,b),this.verbosePii("Navigate to:"+f),d.src="about:blank",this._loadFrameTimeout(f,"adalRenewFrame"+a,a)},AuthenticationContext.prototype._renewIdToken=function(a,b){this.info("renewIdToken is called");var c=this._addAdalFrame("adalIdTokenFrame"),d=this._guid()+"|"+this.config.clientId;this._idTokenNonce=this._guid(),this._saveItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN,this._idTokenNonce,!0),this.config.state=d,this._renewStates.push(d),this.verbose("Renew Idtoken Expected state: "+d);var e=null===b||void 0===b?null:this.config.clientId,b=b||"id_token",f=this._urlRemoveQueryStringParameter(this._getNavigateUrl(b,e),"prompt");f+="&prompt=none",f=this._addHintParameters(f),f+="&nonce="+encodeURIComponent(this._idTokenNonce),this.registerCallback(d,this.config.clientId,a),this.verbosePii("Navigate to:"+f),c.src="about:blank",this._loadFrameTimeout(f,"adalIdTokenFrame",this.config.clientId)},AuthenticationContext.prototype._urlContainsQueryStringParameter=function(a,b){return new RegExp("[\\?&]"+a+"=").test(b)},AuthenticationContext.prototype._urlRemoveQueryStringParameter=function(a,b){var c=new RegExp("(\\&"+b+"=)[^&]+");return a=a.replace(c,""),c=new RegExp("("+b+"=)[^&]+&"),a=a.replace(c,""),c=new RegExp("("+b+"=)[^&]+"),a=a.replace(c,"")},AuthenticationContext.prototype._loadFrameTimeout=function(a,b,c){this.verbose("Set loading state to pending for: "+c),this._saveItem(this.CONSTANTS.STORAGE.RENEW_STATUS+c,this.CONSTANTS.TOKEN_RENEW_STATUS_IN_PROGRESS),this._loadFrame(a,b);var d=this;setTimeout(function(){if(d._getItem(d.CONSTANTS.STORAGE.RENEW_STATUS+c)===d.CONSTANTS.TOKEN_RENEW_STATUS_IN_PROGRESS){d.verbose("Loading frame has timed out after: "+d.CONSTANTS.LOADFRAME_TIMEOUT/1e3+" seconds for resource "+c);var a=d._activeRenewals[c];a&&d._callBackMappedToRenewStates[a]&&d._callBackMappedToRenewStates[a]("Token renewal operation failed due to timeout",null,"Token Renewal Failed"),d._saveItem(d.CONSTANTS.STORAGE.RENEW_STATUS+c,d.CONSTANTS.TOKEN_RENEW_STATUS_CANCELED)}},d.CONSTANTS.LOADFRAME_TIMEOUT)},AuthenticationContext.prototype._loadFrame=function(a,b){var c=this;c.info("LoadFrame: "+b);var d=b;setTimeout(function(){var b=c._addAdalFrame(d);""!==b.src&&"about:blank"!==b.src||(b.src=a,c._loadFrame(a,d))},500)},AuthenticationContext.prototype.acquireToken=function(a,b){if(this._isEmpty(a))return this.warn("resource is required"),void b("resource is required",null,"resource is required");var c=this.getCachedToken(a);return c?(this.info("Token is already in cache for resource:"+a),void b(null,c,null)):this._user||this.config.extraQueryParameter&&-1!==this.config.extraQueryParameter.indexOf("login_hint")?void(this._activeRenewals[a]?this.registerCallback(this._activeRenewals[a],a,b):(this._requestType=this.REQUEST_TYPE.RENEW_TOKEN,a===this.config.clientId?this._user?(this.verbose("renewing idtoken"),this._renewIdToken(b)):(this.verbose("renewing idtoken and access_token"),this._renewIdToken(b,this.RESPONSE_TYPE.ID_TOKEN_TOKEN)):this._user?(this.verbose("renewing access_token"),this._renewToken(a,b)):(this.verbose("renewing idtoken and access_token"),this._renewToken(a,b,this.RESPONSE_TYPE.ID_TOKEN_TOKEN)))):(this.warn("User login is required"),void b("User login is required",null,"login required"))},AuthenticationContext.prototype.acquireTokenPopup=function(a,b,c,d){if(this._isEmpty(a))return this.warn("resource is required"),void d("resource is required",null,"resource is required");if(!this._user)return this.warn("User login is required"),void d("User login is required",null,"login required");if(this._acquireTokenInProgress)return this.warn("Acquire token interactive is already in progress"),void d("Acquire token interactive is already in progress",null,"Acquire token interactive is already in progress");var e=this._guid()+"|"+a;this.config.state=e,this._renewStates.push(e),this._requestType=this.REQUEST_TYPE.RENEW_TOKEN,this.verbose("Renew token Expected state: "+e);var f=this._urlRemoveQueryStringParameter(this._getNavigateUrl("token",a),"prompt");if(f+="&prompt=select_account",b&&(f+=b),c&&-1===f.indexOf("&claims"))f+="&claims="+encodeURIComponent(c);else if(c&&-1!==f.indexOf("&claims"))throw new Error("Claims cannot be passed as an extraQueryParameter");f=this._addHintParameters(f),this._acquireTokenInProgress=!0,this.info("acquireToken interactive is called for the resource "+a),this.registerCallback(e,a,d),this._loginPopup(f,a,d)},AuthenticationContext.prototype.acquireTokenRedirect=function(a,b,c){if(this._isEmpty(a))return this.warn("resource is required"),void d("resource is required",null,"resource is required");var d=this.callback;if(!this._user)return this.warn("User login is required"),void d("User login is required",null,"login required");if(this._acquireTokenInProgress)return this.warn("Acquire token interactive is already in progress"),void d("Acquire token interactive is already in progress",null,"Acquire token interactive is already in progress");var e=this._guid()+"|"+a;this.config.state=e,this.verbose("Renew token Expected state: "+e);var f=this._urlRemoveQueryStringParameter(this._getNavigateUrl("token",a),"prompt");if(f+="&prompt=select_account",b&&(f+=b),c&&-1===f.indexOf("&claims"))f+="&claims="+encodeURIComponent(c);else if(c&&-1!==f.indexOf("&claims"))throw new Error("Claims cannot be passed as an extraQueryParameter");f=this._addHintParameters(f),this._acquireTokenInProgress=!0,this.info("acquireToken interactive is called for the resource "+a),this._saveItem(this.CONSTANTS.STORAGE.LOGIN_REQUEST,window.location.href),this._saveItem(this.CONSTANTS.STORAGE.STATE_RENEW,e,!0),this.promptUser(f)},AuthenticationContext.prototype.promptUser=function(a){a?(this.infoPii("Navigate to:"+a),window.location.replace(a)):this.info("Navigate url is empty")},AuthenticationContext.prototype.clearCache=function(){this._saveItem(this.CONSTANTS.STORAGE.LOGIN_REQUEST,""),this._saveItem(this.CONSTANTS.STORAGE.ANGULAR_LOGIN_REQUEST,""),this._saveItem(this.CONSTANTS.STORAGE.SESSION_STATE,""),this._saveItem(this.CONSTANTS.STORAGE.STATE_LOGIN,""),this._saveItem(this.CONSTANTS.STORAGE.STATE_RENEW,""),this._renewStates=[],this._saveItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN,""),this._saveItem(this.CONSTANTS.STORAGE.IDTOKEN,""),this._saveItem(this.CONSTANTS.STORAGE.ERROR,""),this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION,""),this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR,""),this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR,"");var a=this._getItem(this.CONSTANTS.STORAGE.TOKEN_KEYS);if(!this._isEmpty(a)){a=a.split(this.CONSTANTS.RESOURCE_DELIMETER);for(var b=0;b<a.length&&""!==a[b];b++)this._saveItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY+a[b],""),this._saveItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY+a[b],0)}this._saveItem(this.CONSTANTS.STORAGE.TOKEN_KEYS,"")},AuthenticationContext.prototype.clearCacheForResource=function(a){this._saveItem(this.CONSTANTS.STORAGE.STATE_RENEW,""),this._saveItem(this.CONSTANTS.STORAGE.ERROR,""),this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION,""),this._hasResource(a)&&(this._saveItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY+a,""),this._saveItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY+a,0))},AuthenticationContext.prototype.logOut=function(){this.clearCache(),this._user=null;var a;if(this.config.logOutUri)a=this.config.logOutUri;else{var b="common",c="";this.config.tenant&&(b=this.config.tenant),this.config.postLogoutRedirectUri&&(c="post_logout_redirect_uri="+encodeURIComponent(this.config.postLogoutRedirectUri)),a=this.instance+b+"/oauth2/logout?"+c}this.infoPii("Logout navigate to: "+a),this.promptUser(a)},AuthenticationContext.prototype._isEmpty=function(a){return void 0===a||!a||0===a.length},AuthenticationContext.prototype.getUser=function(a){if("function"!=typeof a)throw new Error("callback is not a function");if(this._user)return void a(null,this._user);var b=this._getItem(this.CONSTANTS.STORAGE.IDTOKEN);this._isEmpty(b)?(this.warn("User information is not available"),a("User information is not available",null)):(this.info("User exists in cache: "),this._user=this._createUser(b),a(null,this._user))},AuthenticationContext.prototype._addHintParameters=function(a){if(this._user&&this._user.profile)if(this._user.profile.sid&&-1!==a.indexOf("&prompt=none"))this._urlContainsQueryStringParameter("sid",a)||(a+="&sid="+encodeURIComponent(this._user.profile.sid));else if(this._user.profile.upn&&(this._urlContainsQueryStringParameter("login_hint",a)||(a+="&login_hint="+encodeURIComponent(this._user.profile.upn)),!this._urlContainsQueryStringParameter("domain_hint",a)&&this._user.profile.upn.indexOf("@")>-1)){var b=this._user.profile.upn.split("@");a+="&domain_hint="+encodeURIComponent(b[b.length-1])}return a},AuthenticationContext.prototype._createUser=function(a){var b=null,c=this._extractIdToken(a);return c&&c.hasOwnProperty("aud")&&(c.aud.toLowerCase()===this.config.clientId.toLowerCase()?(b={userName:"",profile:c},c.hasOwnProperty("upn")?b.userName=c.upn:c.hasOwnProperty("email")&&(b.userName=c.email)):this.warn("IdToken has invalid aud field")),b},AuthenticationContext.prototype._getHash=function(a){return a.indexOf("#/")>-1?a=a.substring(a.indexOf("#/")+2):a.indexOf("#")>-1&&(a=a.substring(1)),a},AuthenticationContext.prototype.isCallback=function(a){a=this._getHash(a);var b=this._deserialize(a);return b.hasOwnProperty(this.CONSTANTS.ERROR_DESCRIPTION)||b.hasOwnProperty(this.CONSTANTS.ACCESS_TOKEN)||b.hasOwnProperty(this.CONSTANTS.ID_TOKEN)},AuthenticationContext.prototype.getLoginError=function(){return this._getItem(this.CONSTANTS.STORAGE.LOGIN_ERROR)},AuthenticationContext.prototype.getRequestInfo=function(a){a=this._getHash(a);var b=this._deserialize(a),c={valid:!1,parameters:{},stateMatch:!1,stateResponse:"",requestType:this.REQUEST_TYPE.UNKNOWN};if(b&&(c.parameters=b,b.hasOwnProperty(this.CONSTANTS.ERROR_DESCRIPTION)||b.hasOwnProperty(this.CONSTANTS.ACCESS_TOKEN)||b.hasOwnProperty(this.CONSTANTS.ID_TOKEN))){c.valid=!0;var d="";if(!b.hasOwnProperty("state"))return this.warn("No state returned"),c;if(this.verbose("State: "+b.state),d=b.state,c.stateResponse=d,this._matchState(c))return c;if(!c.stateMatch&&window.parent){c.requestType=this._requestType;for(var e=this._renewStates,f=0;f<e.length;f++)if(e[f]===c.stateResponse){c.stateMatch=!0;break}}}return c},AuthenticationContext.prototype._matchNonce=function(a){var b=this._getItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN);if(b){b=b.split(this.CONSTANTS.CACHE_DELIMETER);for(var c=0;c<b.length;c++)if(b[c]===a.profile.nonce)return!0}return!1},AuthenticationContext.prototype._matchState=function(a){var b=this._getItem(this.CONSTANTS.STORAGE.STATE_LOGIN);if(b){b=b.split(this.CONSTANTS.CACHE_DELIMETER);for(var c=0;c<b.length;c++)if(b[c]===a.stateResponse)return a.requestType=this.REQUEST_TYPE.LOGIN,a.stateMatch=!0,!0}var d=this._getItem(this.CONSTANTS.STORAGE.STATE_RENEW);if(d){d=d.split(this.CONSTANTS.CACHE_DELIMETER);for(var c=0;c<d.length;c++)if(d[c]===a.stateResponse)return a.requestType=this.REQUEST_TYPE.RENEW_TOKEN,a.stateMatch=!0,!0}return!1},AuthenticationContext.prototype._getResourceFromState=function(a){if(a){var b=a.indexOf("|");if(b>-1&&b+1<a.length)return a.substring(b+1)}return""},AuthenticationContext.prototype.saveTokenFromHash=function(a){this.info("State status:"+a.stateMatch+"; Request type:"+a.requestType),this._saveItem(this.CONSTANTS.STORAGE.ERROR,""),this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION,"");var b=this._getResourceFromState(a.stateResponse);if(a.parameters.hasOwnProperty(this.CONSTANTS.ERROR_DESCRIPTION))this.infoPii("Error :"+a.parameters.error+"; Error description:"+a.parameters[this.CONSTANTS.ERROR_DESCRIPTION]),this._saveItem(this.CONSTANTS.STORAGE.ERROR,a.parameters.error),this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION,a.parameters[this.CONSTANTS.ERROR_DESCRIPTION]),a.requestType===this.REQUEST_TYPE.LOGIN&&(this._loginInProgress=!1,this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR,a.parameters.error_description));else if(a.stateMatch){this.info("State is right"),a.parameters.hasOwnProperty(this.CONSTANTS.SESSION_STATE)&&this._saveItem(this.CONSTANTS.STORAGE.SESSION_STATE,a.parameters[this.CONSTANTS.SESSION_STATE]);var c;a.parameters.hasOwnProperty(this.CONSTANTS.ACCESS_TOKEN)&&(this.info("Fragment has access token"),this._hasResource(b)||(c=this._getItem(this.CONSTANTS.STORAGE.TOKEN_KEYS)||"",this._saveItem(this.CONSTANTS.STORAGE.TOKEN_KEYS,c+b+this.CONSTANTS.RESOURCE_DELIMETER)),this._saveItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY+b,a.parameters[this.CONSTANTS.ACCESS_TOKEN]),this._saveItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY+b,this._expiresIn(a.parameters[this.CONSTANTS.EXPIRES_IN]))),a.parameters.hasOwnProperty(this.CONSTANTS.ID_TOKEN)&&(this.info("Fragment has id token"),this._loginInProgress=!1,this._user=this._createUser(a.parameters[this.CONSTANTS.ID_TOKEN]),this._user&&this._user.profile?this._matchNonce(this._user)?(this._saveItem(this.CONSTANTS.STORAGE.IDTOKEN,a.parameters[this.CONSTANTS.ID_TOKEN]),b=this.config.loginResource?this.config.loginResource:this.config.clientId,this._hasResource(b)||(c=this._getItem(this.CONSTANTS.STORAGE.TOKEN_KEYS)||"",this._saveItem(this.CONSTANTS.STORAGE.TOKEN_KEYS,c+b+this.CONSTANTS.RESOURCE_DELIMETER)),this._saveItem(this.CONSTANTS.STORAGE.ACCESS_TOKEN_KEY+b,a.parameters[this.CONSTANTS.ID_TOKEN]),this._saveItem(this.CONSTANTS.STORAGE.EXPIRATION_KEY+b,this._user.profile.exp)):(this._saveItem(this.CONSTANTS.STORAGE.LOGIN_ERROR,"Nonce received: "+this._user.profile.nonce+" is not same as requested: "+this._getItem(this.CONSTANTS.STORAGE.NONCE_IDTOKEN)),this._user=null):(a.parameters.error="invalid id_token",a.parameters.error_description="Invalid id_token. id_token: "+a.parameters[this.CONSTANTS.ID_TOKEN],this._saveItem(this.CONSTANTS.STORAGE.ERROR,"invalid id_token"),this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION,"Invalid id_token. id_token: "+a.parameters[this.CONSTANTS.ID_TOKEN])))}else a.parameters.error="Invalid_state",a.parameters.error_description="Invalid_state. state: "+a.stateResponse,this._saveItem(this.CONSTANTS.STORAGE.ERROR,"Invalid_state"),this._saveItem(this.CONSTANTS.STORAGE.ERROR_DESCRIPTION,"Invalid_state. state: "+a.stateResponse);this._saveItem(this.CONSTANTS.STORAGE.RENEW_STATUS+b,this.CONSTANTS.TOKEN_RENEW_STATUS_COMPLETED)},AuthenticationContext.prototype.getResourceForEndpoint=function(a){if(this.config&&this.config.anonymousEndpoints)for(var b=0;b<this.config.anonymousEndpoints.length;b++)if(a.indexOf(this.config.anonymousEndpoints[b])>-1)return null;if(this.config&&this.config.endpoints)for(var c in this.config.endpoints)if(a.indexOf(c)>-1)return this.config.endpoints[c];return a.indexOf("http://")>-1||a.indexOf("https://")>-1?this._getHostFromUri(a)===this._getHostFromUri(this.config.redirectUri)?this.config.loginResource:null:this.config.loginResource},AuthenticationContext.prototype._getHostFromUri=function(a){var b=String(a).replace(/^(https?:)\/\//,"");return b=b.split("/")[0]},AuthenticationContext.prototype.handleWindowCallback=function(a){if(null==a&&(a=window.location.hash),this.isCallback(a)){var b=null,c=!1;this._openedWindows.length>0&&this._openedWindows[this._openedWindows.length-1].opener&&this._openedWindows[this._openedWindows.length-1].opener._adalInstance?(b=this._openedWindows[this._openedWindows.length-1].opener._adalInstance,c=!0):window.parent&&window.parent._adalInstance&&(b=window.parent._adalInstance);var d,e,f=b.getRequestInfo(a),g=null;e=c||window.parent!==window?b._callBackMappedToRenewStates[f.stateResponse]:b.callback,b.info("Returned from redirect url"),b.saveTokenFromHash(f),f.requestType===this.REQUEST_TYPE.RENEW_TOKEN&&window.parent?(window.parent!==window?b.verbose("Window is in iframe, acquiring token silently"):b.verbose("acquiring token interactive in progress"),d=f.parameters[b.CONSTANTS.ACCESS_TOKEN]||f.parameters[b.CONSTANTS.ID_TOKEN],g=b.CONSTANTS.ACCESS_TOKEN):f.requestType===this.REQUEST_TYPE.LOGIN&&(d=f.parameters[b.CONSTANTS.ID_TOKEN],g=b.CONSTANTS.ID_TOKEN);var h=f.parameters[b.CONSTANTS.ERROR_DESCRIPTION],i=f.parameters[b.CONSTANTS.ERROR];try{e&&e(h,d,i,g)}catch(a){b.error("Error occurred in user defined callback function: "+a)}window.parent!==window||c||(b.config.navigateToLoginRequestUrl?window.location.href=b._getItem(b.CONSTANTS.STORAGE.LOGIN_REQUEST):window.location.hash="")}},AuthenticationContext.prototype._getNavigateUrl=function(a,b){var c="common";this.config.tenant&&(c=this.config.tenant);var d=this.instance+c+"/oauth2/authorize"+this._serialize(a,this.config,b)+this._addLibMetadata();return this.info("Navigate url:"+d),d},AuthenticationContext.prototype._extractIdToken=function(a){var b=this._decodeJwt(a);if(!b)return null;try{var c=b.JWSPayload,d=this._base64DecodeStringUrlSafe(c);return d?JSON.parse(d):(this.info("The returned id_token could not be base64 url safe decoded."),null)}catch(a){this.error("The returned id_token could not be decoded",a)}return null},AuthenticationContext.prototype._base64DecodeStringUrlSafe=function(a){return a=a.replace(/-/g,"+").replace(/_/g,"/"),window.atob?decodeURIComponent(escape(window.atob(a))):decodeURIComponent(escape(this._decode(a)))},AuthenticationContext.prototype._decode=function(a){var b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";a=String(a).replace(/=+$/,"");var c=a.length;if(c%4==1)throw new Error("The token to be decoded is not correctly encoded.");for(var d,e,f,g,h,i,j,k,l="",m=0;m<c;m+=4){if(d=b.indexOf(a.charAt(m)),e=b.indexOf(a.charAt(m+1)),f=b.indexOf(a.charAt(m+2)),g=b.indexOf(a.charAt(m+3)),m+2===c-1){h=d<<18|e<<12|f<<6,i=h>>16&255,j=h>>8&255,l+=String.fromCharCode(i,j);break}if(m+1===c-1){h=d<<18|e<<12,i=h>>16&255,l+=String.fromCharCode(i);break}h=d<<18|e<<12|f<<6|g,i=h>>16&255,j=h>>8&255,k=255&h,l+=String.fromCharCode(i,j,k)}return l},AuthenticationContext.prototype._decodeJwt=function(a){if(this._isEmpty(a))return null;var b=/^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/,c=b.exec(a);return!c||c.length<4?(this.warn("The returned id_token is not parseable."),null):{header:c[1],JWSPayload:c[2],JWSSig:c[3]}},AuthenticationContext.prototype._convertUrlSafeToRegularBase64EncodedString=function(a){return a.replace("-","+").replace("_","/")},AuthenticationContext.prototype._serialize=function(a,b,c){var d=[];if(null!==b){d.push("?response_type="+a),d.push("client_id="+encodeURIComponent(b.clientId)),c&&d.push("resource="+encodeURIComponent(c)),d.push("redirect_uri="+encodeURIComponent(b.redirectUri)),d.push("state="+encodeURIComponent(b.state)),b.hasOwnProperty("slice")&&d.push("slice="+encodeURIComponent(b.slice)),b.hasOwnProperty("extraQueryParameter")&&d.push(b.extraQueryParameter);var e=b.correlationId?b.correlationId:this._guid();d.push("client-request-id="+encodeURIComponent(e))}return d.join("&")},AuthenticationContext.prototype._deserialize=function(a){var b,c=/\+/g,d=/([^&=]+)=([^&]*)/g,e=function(a){return decodeURIComponent(a.replace(c," "))},f={};for(b=d.exec(a);b;)f[e(b[1])]=e(b[2]),b=d.exec(a);return f},AuthenticationContext.prototype._decimalToHex=function(a){for(var b=a.toString(16);b.length<2;)b="0"+b;return b},AuthenticationContext.prototype._guid=function(){var a=window.crypto||window.msCrypto;if(a&&a.getRandomValues){var b=new Uint8Array(16);return a.getRandomValues(b),b[6]|=64,b[6]&=79,b[8]|=128,b[8]&=191,this._decimalToHex(b[0])+this._decimalToHex(b[1])+this._decimalToHex(b[2])+this._decimalToHex(b[3])+"-"+this._decimalToHex(b[4])+this._decimalToHex(b[5])+"-"+this._decimalToHex(b[6])+this._decimalToHex(b[7])+"-"+this._decimalToHex(b[8])+this._decimalToHex(b[9])+"-"+this._decimalToHex(b[10])+this._decimalToHex(b[11])+this._decimalToHex(b[12])+this._decimalToHex(b[13])+this._decimalToHex(b[14])+this._decimalToHex(b[15])}for(var c="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",d="0123456789abcdef",e=0,f="",g=0;g<36;g++)"-"!==c[g]&&"4"!==c[g]&&(e=16*Math.random()|0),"x"===c[g]?f+=d[e]:"y"===c[g]?(e&=3,e|=8,f+=d[e]):f+=c[g];return f},AuthenticationContext.prototype._expiresIn=function(a){return a||(a=3599),this._now()+parseInt(a,10)},AuthenticationContext.prototype._now=function(){return Math.round((new Date).getTime()/1e3)},AuthenticationContext.prototype._addAdalFrame=function(a){if(void 0!==a){this.info("Add adal frame to document:"+a);var b=document.getElementById(a);if(!b){if(document.createElement&&document.documentElement&&(window.opera||-1===window.navigator.userAgent.indexOf("MSIE 5.0"))){var c=document.createElement("iframe");c.setAttribute("id",a),c.setAttribute("aria-hidden","true"),c.style.visibility="hidden",c.style.position="absolute",c.style.width=c.style.height=c.borderWidth="0px",b=document.getElementsByTagName("body")[0].appendChild(c)}else document.body&&document.body.insertAdjacentHTML&&document.body.insertAdjacentHTML("beforeEnd",'<iframe name="'+a+'" id="'+a+'" style="display:none"></iframe>');window.frames&&window.frames[a]&&(b=window.frames[a])}return b}},AuthenticationContext.prototype._saveItem=function(a,b,c){if(this.config&&this.config.cacheLocation&&"localStorage"===this.config.cacheLocation){if(!this._supportsLocalStorage())return this.info("Local storage is not supported"),!1;if(c){var d=this._getItem(a)||"";localStorage.setItem(a,d+b+this.CONSTANTS.CACHE_DELIMETER)}else localStorage.setItem(a,b);return!0}return this._supportsSessionStorage()?(sessionStorage.setItem(a,b),!0):(this.info("Session storage is not supported"),!1)},AuthenticationContext.prototype._getItem=function(a){return this.config&&this.config.cacheLocation&&"localStorage"===this.config.cacheLocation?this._supportsLocalStorage()?localStorage.getItem(a):(this.info("Local storage is not supported"),null):this._supportsSessionStorage()?sessionStorage.getItem(a):(this.info("Session storage is not supported"),null)},AuthenticationContext.prototype._supportsLocalStorage=function(){try{return!!window.localStorage&&(window.localStorage.setItem("storageTest","A"),"A"==window.localStorage.getItem("storageTest")&&(window.localStorage.removeItem("storageTest"),!window.localStorage.getItem("storageTest")))}catch(a){return!1}},AuthenticationContext.prototype._supportsSessionStorage=function(){try{return!!window.sessionStorage&&(window.sessionStorage.setItem("storageTest","A"),"A"==window.sessionStorage.getItem("storageTest")&&(window.sessionStorage.removeItem("storageTest"),!window.sessionStorage.getItem("storageTest")))}catch(a){return!1}},AuthenticationContext.prototype._cloneConfig=function(a){if(null===a||"object"!=typeof a)return a;var b={};for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b},AuthenticationContext.prototype._addLibMetadata=function(){return"&x-client-SKU=Js&x-client-Ver="+this._libVersion()},AuthenticationContext.prototype.log=function(a,b,c,d){if(a<=Logging.level){if(!Logging.piiLoggingEnabled&&d)return;var e=(new Date).toUTCString(),f="";f=this.config.correlationId?e+":"+this.config.correlationId+"-"+this._libVersion()+"-"+this.CONSTANTS.LEVEL_STRING_MAP[a]+" "+b:e+":"+this._libVersion()+"-"+this.CONSTANTS.LEVEL_STRING_MAP[a]+" "+b,c&&(f+="\nstack:\n"+c.stack),Logging.log(f)}},AuthenticationContext.prototype.error=function(a,b){this.log(this.CONSTANTS.LOGGING_LEVEL.ERROR,a,b)},AuthenticationContext.prototype.warn=function(a){this.log(this.CONSTANTS.LOGGING_LEVEL.WARN,a,null)},AuthenticationContext.prototype.info=function(a){
this.log(this.CONSTANTS.LOGGING_LEVEL.INFO,a,null)},AuthenticationContext.prototype.verbose=function(a){this.log(this.CONSTANTS.LOGGING_LEVEL.VERBOSE,a,null)},AuthenticationContext.prototype.errorPii=function(a,b){this.log(this.CONSTANTS.LOGGING_LEVEL.ERROR,a,b,!0)},AuthenticationContext.prototype.warnPii=function(a){this.log(this.CONSTANTS.LOGGING_LEVEL.WARN,a,null,!0)},AuthenticationContext.prototype.infoPii=function(a){this.log(this.CONSTANTS.LOGGING_LEVEL.INFO,a,null,!0)},AuthenticationContext.prototype.verbosePii=function(a){this.log(this.CONSTANTS.LOGGING_LEVEL.VERBOSE,a,null,!0)},AuthenticationContext.prototype._libVersion=function(){return"1.0.17"},true&&module.exports&&(module.exports=AuthenticationContext,module.exports.inject=function(a){return new AuthenticationContext(a)}),AuthenticationContext}();

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
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

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
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

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
});
//# sourceMappingURL=graph.es5.umd.bundle.js.map