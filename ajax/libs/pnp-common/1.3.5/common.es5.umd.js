/**
 * @license
 * v1.3.5
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2019 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https://github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('adal-angular/dist/adal.min.js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'adal-angular/dist/adal.min.js'], factory) :
    (factory((global.pnp = global.pnp || {}, global.pnp.common = {}),global.adal));
}(this, (function (exports,adal) { 'use strict';

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

    var global$1 = (typeof global !== "undefined" ? global :
                typeof self !== "undefined" ? self :
                typeof window !== "undefined" ? window : {});

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

    function mergeHeaders(target, source) {
        if (source !== undefined && source !== null) {
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
            return global$1.fetch(url, options);
        };
        return FetchClient;
    }());
    /**
     * Makes requests using the fetch API adding the supplied token to the Authorization header
     */
    var BearerTokenFetchClient = /** @class */ (function (_super) {
        __extends(BearerTokenFetchClient, _super);
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
        __extends(AdalClient, _super);
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
            if (!isUrlAbsolute(url)) {
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
                    AdalClient._authContext = adal.inject({
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
    }(BearerTokenFetchClient));
    /**
     * Client wrapping the aadTokenProvider available from SPFx >= 1.6
     */
    var SPFxAdalClient = /** @class */ (function (_super) {
        __extends(SPFxAdalClient, _super);
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
    }(BearerTokenFetchClient));

    /**
     * Used to calculate the object properties, with polyfill if needed
     */
    var objectEntries = isFunc(Object.entries) ? Object.entries : function (o) { return Object.keys(o).map(function (k) { return [k, o[k]]; }); };
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
            this._v = mergeMaps(this._v, objectToMap(config));
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
            if (!objectDefinedNotNull(o)) {
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
            var o = this.get(key);
            if (o === null) {
                return getter().then(function (d) {
                    _this.put(key, d, expire);
                    return d;
                });
            }
            return Promise.resolve(o);
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
                var defaultTimeout = RuntimeConfig.defaultCachingTimeoutSeconds;
                if (this.defaultTimeoutMinutes > 0) {
                    defaultTimeout = this.defaultTimeoutMinutes * 60;
                }
                expire = dateAdd(new Date(), "second", defaultTimeout);
            }
            return jsS({ pnp: 1, expiration: expire, value: o });
        };
        /**
         * Deletes expired items added by this library in this.store and sets a timeout to call itself
         */
        PnPClientStorageWrapper.prototype.cacheExpirationHandler = function () {
            var _this = this;
            this.deleteExpired().then(function (_) {
                // call ourself in the future
                setTimeout(getCtxCallback(_this, _this.cacheExpirationHandler), RuntimeConfig.cacheExpirationIntervalMilliseconds);
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

    exports.AdalClient = AdalClient;
    exports.SPFxAdalClient = SPFxAdalClient;
    exports.objectToMap = objectToMap;
    exports.mergeMaps = mergeMaps;
    exports.setup = setup;
    exports.RuntimeConfigImpl = RuntimeConfigImpl;
    exports.RuntimeConfig = RuntimeConfig;
    exports.mergeHeaders = mergeHeaders;
    exports.mergeOptions = mergeOptions;
    exports.FetchClient = FetchClient;
    exports.BearerTokenFetchClient = BearerTokenFetchClient;
    exports.PnPClientStorageWrapper = PnPClientStorageWrapper;
    exports.PnPClientStorage = PnPClientStorage;
    exports.getCtxCallback = getCtxCallback;
    exports.dateAdd = dateAdd;
    exports.combine = combine;
    exports.getRandomString = getRandomString;
    exports.getGUID = getGUID;
    exports.isFunc = isFunc;
    exports.objectDefinedNotNull = objectDefinedNotNull;
    exports.isArray = isArray;
    exports.extend = extend;
    exports.isUrlAbsolute = isUrlAbsolute;
    exports.stringIsNullOrEmpty = stringIsNullOrEmpty;
    exports.getAttrValueFromString = getAttrValueFromString;
    exports.sanitizeGuid = sanitizeGuid;
    exports.jsS = jsS;
    exports.hOP = hOP;
    exports.getHashCode = getHashCode;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=common.es5.umd.js.map
