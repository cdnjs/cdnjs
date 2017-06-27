/**
 * sp-pnp-js v1.0.0 - A reusable JavaScript library targeting SharePoint client-side development.
 * Copyright (c) 2016 Microsoft
 * MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$pnp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../utils/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require("../utils/util");
    var Dictionary = (function () {
        function Dictionary() {
            this.keys = [];
            this.values = [];
        }
        Dictionary.prototype.get = function (key) {
            var index = this.keys.indexOf(key);
            if (index < 0) {
                return null;
            }
            return this.values[index];
        };
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
        Dictionary.prototype.merge = function (source) {
            if (util_1.Util.isFunction(source["getKeys"])) {
                var sourceAsDictionary = source;
                var keys = sourceAsDictionary.getKeys();
                var l = keys.length;
                for (var i = 0; i < l; i++) {
                    this.add(keys[i], sourceAsDictionary.get(keys[i]));
                }
            }
            else {
                var sourceAsHash = source;
                for (var key in sourceAsHash) {
                    if (sourceAsHash.hasOwnProperty(key)) {
                        this.add(key, source[key]);
                    }
                }
            }
        };
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
        Dictionary.prototype.getKeys = function () {
            return this.keys;
        };
        Dictionary.prototype.getValues = function () {
            return this.values;
        };
        Dictionary.prototype.clear = function () {
            this.keys = [];
            this.values = [];
        };
        Dictionary.prototype.count = function () {
            return this.keys.length;
        };
        return Dictionary;
    }());
    exports.Dictionary = Dictionary;
});

},{"../utils/util":37}],2:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../collections/collections", "./providers/providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Collections = require("../collections/collections");
    var providers = require("./providers/providers");
    var Settings = (function () {
        function Settings() {
            this.Providers = providers;
            this._settings = new Collections.Dictionary();
        }
        Settings.prototype.add = function (key, value) {
            this._settings.add(key, value);
        };
        Settings.prototype.addJSON = function (key, value) {
            this._settings.add(key, JSON.stringify(value));
        };
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
        Settings.prototype.get = function (key) {
            return this._settings.get(key);
        };
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
});

},{"../collections/collections":1,"./providers/providers":5}],3:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var RuntimeConfigImpl = (function () {
        function RuntimeConfigImpl() {
            this._headers = null;
        }
        RuntimeConfigImpl.prototype.set = function (config) {
            if (config.hasOwnProperty("headers")) {
                this._headers = config.headers;
            }
        };
        Object.defineProperty(RuntimeConfigImpl.prototype, "headers", {
            get: function () {
                return this._headers;
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
});

},{}],4:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../../utils/storage"], factory);
    }
})(function (require, exports) {
    "use strict";
    var storage = require("../../utils/storage");
    var CachingConfigurationProvider = (function () {
        function CachingConfigurationProvider(wrappedProvider, cacheKey, cacheStore) {
            this.wrappedProvider = wrappedProvider;
            this.store = (cacheStore) ? cacheStore : this.selectPnPCache();
            this.cacheKey = "_configcache_" + cacheKey;
        }
        CachingConfigurationProvider.prototype.getWrappedProvider = function () {
            return this.wrappedProvider;
        };
        CachingConfigurationProvider.prototype.getConfiguration = function () {
            var _this = this;
            if ((!this.store) || (!this.store.enabled)) {
                return this.wrappedProvider.getConfiguration();
            }
            var cachedConfig = this.store.get(this.cacheKey);
            if (cachedConfig) {
                return new Promise(function (resolve, reject) {
                    resolve(cachedConfig);
                });
            }
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
            throw new Error("Cannot create a caching configuration provider since cache is not available.");
        };
        return CachingConfigurationProvider;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = CachingConfigurationProvider;
});

},{"../../utils/storage":36}],5:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./cachingConfigurationProvider", "./spListConfigurationProvider"], factory);
    }
})(function (require, exports) {
    "use strict";
    var cachingConfigurationProvider_1 = require("./cachingConfigurationProvider");
    var spListConfigurationProvider_1 = require("./spListConfigurationProvider");
    exports.CachingConfigurationProvider = cachingConfigurationProvider_1.default;
    exports.SPListConfigurationProvider = spListConfigurationProvider_1.default;
});

},{"./cachingConfigurationProvider":4,"./spListConfigurationProvider":6}],6:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./cachingConfigurationProvider"], factory);
    }
})(function (require, exports) {
    "use strict";
    var cachingConfigurationProvider_1 = require("./cachingConfigurationProvider");
    var SPListConfigurationProvider = (function () {
        function SPListConfigurationProvider(sourceWeb, sourceListTitle) {
            if (sourceListTitle === void 0) { sourceListTitle = "config"; }
            this.sourceWeb = sourceWeb;
            this.sourceListTitle = sourceListTitle;
        }
        Object.defineProperty(SPListConfigurationProvider.prototype, "web", {
            get: function () {
                return this.sourceWeb;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SPListConfigurationProvider.prototype, "listTitle", {
            get: function () {
                return this.sourceListTitle;
            },
            enumerable: true,
            configurable: true
        });
        SPListConfigurationProvider.prototype.getConfiguration = function () {
            return this.web.lists.getByTitle(this.listTitle).items.select("Title", "Value")
                .getAs().then(function (data) {
                var configuration = {};
                data.forEach(function (i) {
                    configuration[i.Title] = i.Value;
                });
                return configuration;
            });
        };
        SPListConfigurationProvider.prototype.asCaching = function () {
            var cacheKey = "splist_" + this.web.toUrl() + "+" + this.listTitle;
            return new cachingConfigurationProvider_1.default(this, cacheKey);
        };
        return SPListConfigurationProvider;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = SPListConfigurationProvider;
});

},{"./cachingConfigurationProvider":4}],7:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./fetchClient", "./digestCache", "../utils/util", "../configuration/pnplibconfig"], factory);
    }
})(function (require, exports) {
    "use strict";
    var fetchClient_1 = require("./fetchClient");
    var digestCache_1 = require("./digestCache");
    var util_1 = require("../utils/util");
    var pnplibconfig_1 = require("../configuration/pnplibconfig");
    var HttpClient = (function () {
        function HttpClient(_impl) {
            if (_impl === void 0) { _impl = new fetchClient_1.FetchClient(); }
            this._impl = _impl;
            this._digestCache = new digestCache_1.DigestCache(this);
        }
        HttpClient.prototype.fetch = function (url, options) {
            if (options === void 0) { options = {}; }
            var self = this;
            var opts = util_1.Util.extend(options, { cache: "no-cache", credentials: "same-origin" }, true);
            var headers = new Headers();
            this.mergeHeaders(headers, pnplibconfig_1.RuntimeConfig.headers);
            this.mergeHeaders(headers, options.headers);
            if (!headers.has("Accept")) {
                headers.append("Accept", "application/json");
            }
            if (!headers.has("Content-Type")) {
                headers.append("Content-Type", "application/json;odata=verbose;charset=utf-8");
            }
            if (!headers.has("X-ClientService-ClientTag")) {
                headers.append("X-ClientService-ClientTag", "SharePoint.PnP.JavaScriptCore");
            }
            opts = util_1.Util.extend(opts, { headers: headers });
            if (opts.method && opts.method.toUpperCase() !== "GET") {
                if (!headers.has("X-RequestDigest")) {
                    var index = url.indexOf("/_api/");
                    if (index < 0) {
                        throw new Error("Unable to determine API url");
                    }
                    var webUrl = url.substr(0, index);
                    return this._digestCache.getDigest(webUrl)
                        .then(function (digest) {
                        headers.append("X-RequestDigest", digest);
                        return self.fetchRaw(url, opts);
                    });
                }
            }
            return self.fetchRaw(url, opts);
        };
        HttpClient.prototype.fetchRaw = function (url, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var retry = function (ctx) {
                _this._impl.fetch(url, options).then(function (response) { return ctx.resolve(response); }).catch(function (response) {
                    var delay = ctx.delay;
                    if (response.status !== 429 && response.status !== 503) {
                        ctx.reject(response);
                    }
                    ctx.delay *= 2;
                    ctx.attempts++;
                    if (ctx.retryCount <= ctx.attempts) {
                        ctx.reject(response);
                    }
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
        HttpClient.prototype.mergeHeaders = function (target, source) {
            if (typeof source !== "undefined") {
                var temp = new Request("", { headers: source });
                temp.headers.forEach(function (value, name) {
                    target.append(name, value);
                });
            }
        };
        return HttpClient;
    }());
    exports.HttpClient = HttpClient;
});

},{"../configuration/pnplibconfig":3,"../utils/util":37,"./digestCache":8,"./fetchClient":9}],8:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../collections/collections", "../utils/util", "../sharepoint/rest/odata"], factory);
    }
})(function (require, exports) {
    "use strict";
    var collections_1 = require("../collections/collections");
    var util_1 = require("../utils/util");
    var odata_1 = require("../sharepoint/rest/odata");
    var CachedDigest = (function () {
        function CachedDigest() {
        }
        return CachedDigest;
    }());
    exports.CachedDigest = CachedDigest;
    var DigestCache = (function () {
        function DigestCache(_httpClient, _digests) {
            if (_digests === void 0) { _digests = new collections_1.Dictionary(); }
            this._httpClient = _httpClient;
            this._digests = _digests;
        }
        DigestCache.prototype.getDigest = function (webUrl) {
            var self = this;
            var cachedDigest = this._digests.get(webUrl);
            if (cachedDigest !== null) {
                var now = new Date();
                if (now < cachedDigest.expiration) {
                    return Promise.resolve(cachedDigest.value);
                }
            }
            var url = util_1.Util.combinePaths(webUrl, "/_api/contextinfo");
            return self._httpClient.fetchRaw(url, {
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-type": "application/json;odata=verbose;charset=utf-8",
                },
                method: "POST",
            }).then(function (response) {
                var parser = new odata_1.ODataDefaultParser();
                return parser.parse(response).then(function (d) { return d.GetContextWebInformation; });
            }).then(function (data) {
                var newCachedDigest = new CachedDigest();
                newCachedDigest.value = data.FormDigestValue;
                var seconds = data.FormDigestTimeoutSeconds;
                var expiration = new Date();
                expiration.setTime(expiration.getTime() + 1000 * seconds);
                newCachedDigest.expiration = expiration;
                self._digests.add(webUrl, newCachedDigest);
                return newCachedDigest.value;
            });
        };
        DigestCache.prototype.clear = function () {
            this._digests.clear();
        };
        return DigestCache;
    }());
    exports.DigestCache = DigestCache;
});

},{"../collections/collections":1,"../sharepoint/rest/odata":18,"../utils/util":37}],9:[function(require,module,exports){
(function (global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var FetchClient = (function () {
        function FetchClient() {
        }
        FetchClient.prototype.fetch = function (url, options) {
            return global.fetch(url, options);
        };
        return FetchClient;
    }());
    exports.FetchClient = FetchClient;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],10:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./utils/util", "./utils/storage", "./configuration/configuration", "./utils/logging", "./sharepoint/rest/rest", "./configuration/pnplibconfig"], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require("./utils/util");
    var storage_1 = require("./utils/storage");
    var configuration_1 = require("./configuration/configuration");
    var logging_1 = require("./utils/logging");
    var rest_1 = require("./sharepoint/rest/rest");
    var pnplibconfig_1 = require("./configuration/pnplibconfig");
    exports.util = util_1.Util;
    exports.sp = new rest_1.Rest();
    exports.storage = new storage_1.PnPClientStorage();
    exports.config = new configuration_1.Settings();
    exports.log = logging_1.Logger;
    exports.setup = pnplibconfig_1.setRuntimeConfig;
    var Def = {
        config: exports.config,
        log: exports.log,
        setup: exports.setup,
        sp: exports.sp,
        storage: exports.storage,
        util: exports.util,
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Def;
});

},{"./configuration/configuration":2,"./configuration/pnplibconfig":3,"./sharepoint/rest/rest":22,"./utils/logging":35,"./utils/storage":36,"./utils/util":37}],11:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var ContentTypes = (function (_super) {
        __extends(ContentTypes, _super);
        function ContentTypes(baseUrl, path) {
            if (path === void 0) { path = "contenttypes"; }
            _super.call(this, baseUrl, path);
        }
        ContentTypes.prototype.getById = function (id) {
            var ct = new ContentType(this);
            ct.concat("('" + id + "')");
            return ct;
        };
        return ContentTypes;
    }(queryable_1.QueryableCollection));
    exports.ContentTypes = ContentTypes;
    var ContentType = (function (_super) {
        __extends(ContentType, _super);
        function ContentType(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(ContentType.prototype, "descriptionResource", {
            get: function () {
                return new queryable_1.Queryable(this, "descriptionResource");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "fieldLinks", {
            get: function () {
                return new queryable_1.Queryable(this, "fieldLinks");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "fields", {
            get: function () {
                return new queryable_1.Queryable(this, "fields");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "nameResource", {
            get: function () {
                return new queryable_1.Queryable(this, "nameResource");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "parent", {
            get: function () {
                return new queryable_1.Queryable(this, "parent");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "workflowAssociations", {
            get: function () {
                return new queryable_1.Queryable(this, "workflowAssociations");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "description", {
            get: function () {
                return new queryable_1.Queryable(this, "description");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "displayFormTemplateName", {
            get: function () {
                return new queryable_1.Queryable(this, "displayFormTemplateName");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "displayFormUrl", {
            get: function () {
                return new queryable_1.Queryable(this, "displayFormUrl");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "documentTemplate", {
            get: function () {
                return new queryable_1.Queryable(this, "documentTemplate");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "documentTemplateUrl", {
            get: function () {
                return new queryable_1.Queryable(this, "documentTemplateUrl");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "editFormTemplateName", {
            get: function () {
                return new queryable_1.Queryable(this, "editFormTemplateName");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "editFormUrl", {
            get: function () {
                return new queryable_1.Queryable(this, "editFormUrl");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "group", {
            get: function () {
                return new queryable_1.Queryable(this, "group");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "hidden", {
            get: function () {
                return new queryable_1.Queryable(this, "hidden");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "jsLink", {
            get: function () {
                return new queryable_1.Queryable(this, "jsLink");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "name", {
            get: function () {
                return new queryable_1.Queryable(this, "name");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "newFormTemplateName", {
            get: function () {
                return new queryable_1.Queryable(this, "newFormTemplateName");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "newFormUrl", {
            get: function () {
                return new queryable_1.Queryable(this, "newFormUrl");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "readOnly", {
            get: function () {
                return new queryable_1.Queryable(this, "readOnly");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "schemaXml", {
            get: function () {
                return new queryable_1.Queryable(this, "schemaXml");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "scope", {
            get: function () {
                return new queryable_1.Queryable(this, "scope");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "sealed", {
            get: function () {
                return new queryable_1.Queryable(this, "sealed");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "stringId", {
            get: function () {
                return new queryable_1.Queryable(this, "stringId");
            },
            enumerable: true,
            configurable: true
        });
        return ContentType;
    }(queryable_1.QueryableInstance));
    exports.ContentType = ContentType;
});

},{"./queryable":19}],12:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable", "../../utils/util", "./types"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var util_1 = require("../../utils/util");
    var Types = require("./types");
    var Fields = (function (_super) {
        __extends(Fields, _super);
        function Fields(baseUrl, path) {
            if (path === void 0) { path = "fields"; }
            _super.call(this, baseUrl, path);
        }
        Fields.prototype.getByTitle = function (title) {
            return new Field(this, "getByTitle('" + title + "')");
        };
        Fields.prototype.getById = function (id) {
            var f = new Field(this);
            f.concat("('" + id + "')");
            return f;
        };
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
            var q = new Fields(this, "createfieldasxml");
            return q.postAs({ body: postBody }).then(function (data) {
                return {
                    data: data,
                    field: _this.getById(data.Id),
                };
            });
        };
        Fields.prototype.add = function (title, fieldType, properties) {
            var _this = this;
            if (properties === void 0) { properties = {}; }
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": fieldType },
                "Title": title,
            }, properties));
            return this.postAs({ body: postBody }).then(function (data) {
                return {
                    data: data,
                    field: _this.getById(data.Id),
                };
            });
        };
        Fields.prototype.addText = function (title, maxLength, properties) {
            if (maxLength === void 0) { maxLength = 255; }
            var props = {
                FieldTypeKind: 2,
            };
            return this.add(title, "SP.FieldText", util_1.Util.extend(props, properties));
        };
        Fields.prototype.addCalculated = function (title, formula, dateFormat, outputType, properties) {
            if (outputType === void 0) { outputType = Types.FieldTypes.Text; }
            var props = {
                DateFormat: dateFormat,
                FieldTypeKind: 17,
                Formula: formula,
                OutputType: outputType,
            };
            return this.add(title, "SP.FieldCalculated", util_1.Util.extend(props, properties));
        };
        Fields.prototype.addDateTime = function (title, displayFormat, calendarType, friendlyDisplayFormat, properties) {
            if (displayFormat === void 0) { displayFormat = Types.DateTimeFieldFormatType.DateOnly; }
            if (calendarType === void 0) { calendarType = Types.CalendarType.Gregorian; }
            if (friendlyDisplayFormat === void 0) { friendlyDisplayFormat = 0; }
            var props = {
                DateTimeCalendarType: calendarType,
                DisplayFormat: displayFormat,
                FieldTypeKind: 4,
                FriendlyDisplayFormat: friendlyDisplayFormat,
            };
            return this.add(title, "SP.FieldDateTime", util_1.Util.extend(props, properties));
        };
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
        Fields.prototype.addUrl = function (title, displayFormat, properties) {
            if (displayFormat === void 0) { displayFormat = Types.UrlFieldFormatType.Hyperlink; }
            var props = {
                DisplayFormat: displayFormat,
                FieldTypeKind: 11,
            };
            return this.add(title, "SP.FieldUrl", util_1.Util.extend(props, properties));
        };
        return Fields;
    }(queryable_1.QueryableCollection));
    exports.Fields = Fields;
    var Field = (function (_super) {
        __extends(Field, _super);
        function Field(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(Field.prototype, "canBeDeleted", {
            get: function () {
                return new queryable_1.Queryable(this, "canBeDeleted");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "defaultValue", {
            get: function () {
                return new queryable_1.Queryable(this, "defaultValue");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "description", {
            get: function () {
                return new queryable_1.Queryable(this, "description");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "direction", {
            get: function () {
                return new queryable_1.Queryable(this, "direction");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "enforceUniqueValues", {
            get: function () {
                return new queryable_1.Queryable(this, "enforceUniqueValues");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "entityPropertyName", {
            get: function () {
                return new queryable_1.Queryable(this, "entityPropertyName");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "filterable", {
            get: function () {
                return new queryable_1.Queryable(this, "filterable");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "fromBaseType", {
            get: function () {
                return new queryable_1.Queryable(this, "fromBaseType");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "group", {
            get: function () {
                return new queryable_1.Queryable(this, "group");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "hidden", {
            get: function () {
                return new queryable_1.Queryable(this, "hidden");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "id", {
            get: function () {
                return new queryable_1.Queryable(this, "id");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "indexed", {
            get: function () {
                return new queryable_1.Queryable(this, "indexed");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "internalName", {
            get: function () {
                return new queryable_1.Queryable(this, "internalName");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "jsLink", {
            get: function () {
                return new queryable_1.Queryable(this, "jsLink");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "readOnlyField", {
            get: function () {
                return new queryable_1.Queryable(this, "readOnlyField");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "required", {
            get: function () {
                return new queryable_1.Queryable(this, "required");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "schemaXml", {
            get: function () {
                return new queryable_1.Queryable(this, "schemaXml");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "scope", {
            get: function () {
                return new queryable_1.Queryable(this, "scope");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "sealed", {
            get: function () {
                return new queryable_1.Queryable(this, "sealed");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "sortable", {
            get: function () {
                return new queryable_1.Queryable(this, "sortable");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "staticName", {
            get: function () {
                return new queryable_1.Queryable(this, "staticName");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "title", {
            get: function () {
                return new queryable_1.Queryable(this, "title");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "fieldTypeKind", {
            get: function () {
                return new queryable_1.Queryable(this, "fieldTypeKind");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "typeAsString", {
            get: function () {
                return new queryable_1.Queryable(this, "typeAsString");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "typeDisplayName", {
            get: function () {
                return new queryable_1.Queryable(this, "typeDisplayName");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "typeShortDescription", {
            get: function () {
                return new queryable_1.Queryable(this, "typeShortDescription");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "validationFormula", {
            get: function () {
                return new queryable_1.Queryable(this, "validationFormula");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "validationMessage", {
            get: function () {
                return new queryable_1.Queryable(this, "validationMessage");
            },
            enumerable: true,
            configurable: true
        });
        Field.prototype.update = function (properties, fieldType) {
            var _this = this;
            if (fieldType === void 0) { fieldType = "SP.Field"; }
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": fieldType },
            }, properties));
            return this.post({
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
        Field.prototype.delete = function () {
            return this.post({
                headers: {
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        Field.prototype.setShowInDisplayForm = function (show) {
            var q = new Field(this, "setshowindisplayform(" + show + ")");
            return q.post();
        };
        Field.prototype.setShowInEditForm = function (show) {
            var q = new Field(this, "setshowineditform(" + show + ")");
            return q.post();
        };
        Field.prototype.setShowInNewForm = function (show) {
            var q = new Field(this, "setshowinnewform(" + show + ")");
            return q.post();
        };
        return Field;
    }(queryable_1.QueryableInstance));
    exports.Field = Field;
});

},{"../../utils/util":37,"./queryable":19,"./types":29}],13:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable", "./items"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var items_1 = require("./items");
    var Files = (function (_super) {
        __extends(Files, _super);
        function Files(baseUrl, path) {
            if (path === void 0) { path = "files"; }
            _super.call(this, baseUrl, path);
        }
        Files.prototype.getByName = function (name) {
            var f = new File(this);
            f.concat("('" + name + "')");
            return f;
        };
        Files.prototype.add = function (url, content, shouldOverWrite) {
            var _this = this;
            if (shouldOverWrite === void 0) { shouldOverWrite = true; }
            return new Files(this, "add(overwrite=" + shouldOverWrite + ",url='" + url + "')")
                .post({ body: content }).then(function (response) {
                return {
                    data: response,
                    file: _this.getByName(url),
                };
            });
        };
        Files.prototype.addTemplateFile = function (fileUrl, templateFileType) {
            var _this = this;
            return new Files(this, "addTemplateFile(urloffile='" + fileUrl + "',templatefiletype=" + templateFileType + ")")
                .post().then(function (response) {
                return {
                    data: response,
                    file: _this.getByName(fileUrl),
                };
            });
        };
        return Files;
    }(queryable_1.QueryableCollection));
    exports.Files = Files;
    var File = (function (_super) {
        __extends(File, _super);
        function File(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(File.prototype, "author", {
            get: function () {
                return new queryable_1.Queryable(this, "author");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "checkedOutByUser", {
            get: function () {
                return new queryable_1.Queryable(this, "checkedOutByUser");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "checkInComment", {
            get: function () {
                return new queryable_1.Queryable(this, "checkInComment");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "checkOutType", {
            get: function () {
                return new queryable_1.Queryable(this, "checkOutType");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "contentTag", {
            get: function () {
                return new queryable_1.Queryable(this, "contentTag");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "customizedPageStatus", {
            get: function () {
                return new queryable_1.Queryable(this, "customizedPageStatus");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "eTag", {
            get: function () {
                return new queryable_1.Queryable(this, "eTag");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "exists", {
            get: function () {
                return new queryable_1.Queryable(this, "exists");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "length", {
            get: function () {
                return new queryable_1.Queryable(this, "length");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "level", {
            get: function () {
                return new queryable_1.Queryable(this, "level");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "listItemAllFields", {
            get: function () {
                return new items_1.Item(this, "listItemAllFields");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "lockedByUser", {
            get: function () {
                return new queryable_1.Queryable(this, "lockedByUser");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "majorVersion", {
            get: function () {
                return new queryable_1.Queryable(this, "majorVersion");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "minorVersion", {
            get: function () {
                return new queryable_1.Queryable(this, "minorVersion");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "modifiedBy", {
            get: function () {
                return new queryable_1.Queryable(this, "modifiedBy");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "name", {
            get: function () {
                return new queryable_1.Queryable(this, "name");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "serverRelativeUrl", {
            get: function () {
                return new queryable_1.Queryable(this, "serverRelativeUrl");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "timeCreated", {
            get: function () {
                return new queryable_1.Queryable(this, "timeCreated");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "timeLastModified", {
            get: function () {
                return new queryable_1.Queryable(this, "timeLastModified");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "title", {
            get: function () {
                return new queryable_1.Queryable(this, "title");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "uiVersion", {
            get: function () {
                return new queryable_1.Queryable(this, "uiVersion");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "uiVersionLabel", {
            get: function () {
                return new queryable_1.Queryable(this, "uiVersionLabel");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "versions", {
            get: function () {
                return new Versions(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "value", {
            get: function () {
                return new queryable_1.Queryable(this, "$value");
            },
            enumerable: true,
            configurable: true
        });
        File.prototype.approve = function (comment) {
            return new File(this, "approve(comment='" + comment + "')").post();
        };
        File.prototype.cancelUpload = function (uploadId) {
            return new File(this, "cancelUpload(uploadId=guid'" + uploadId + "')").post();
        };
        File.prototype.checkin = function (comment, checkinType) {
            if (comment === void 0) { comment = ""; }
            if (checkinType === void 0) { checkinType = CheckinType.Major; }
            return new File(this, "checkin(comment='" + comment + "',checkintype=" + checkinType + ")").post();
        };
        File.prototype.checkout = function () {
            return new File(this, "checkout").post();
        };
        File.prototype.continueUpload = function (uploadId, fileOffset, b) {
            return new File(this, "continueUpload(uploadId=guid'" + uploadId + "',fileOffset=" + fileOffset + ")").postAs({ body: b });
        };
        File.prototype.copyTo = function (url, shouldOverWrite) {
            if (shouldOverWrite === void 0) { shouldOverWrite = true; }
            return new File(this, "copyTo(strnewurl='" + url + "',boverwrite=" + shouldOverWrite + ")").post();
        };
        File.prototype.delete = function (eTag) {
            if (eTag === void 0) { eTag = "*"; }
            return new File(this).post({
                headers: {
                    "IF-Match": eTag,
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        File.prototype.deny = function (comment) {
            if (comment === void 0) { comment = ""; }
            return new File(this, "deny(comment='" + comment + "')").post();
        };
        File.prototype.finishUpload = function (uploadId, fileOffset, fragment) {
            return new File(this, "finishUpload(uploadId=guid'" + uploadId + "',fileOffset=" + fileOffset + ")")
                .postAs({ body: fragment }).then(function (response) {
                return {
                    data: response,
                    file: new File(response.ServerRelativeUrl),
                };
            });
        };
        File.prototype.getLimitedWebPartManager = function (scope) {
            if (scope === void 0) { scope = WebPartsPersonalizationScope.User; }
            return new queryable_1.Queryable(this, "getLimitedWebPartManager(scope=" + scope + ")");
        };
        File.prototype.moveTo = function (url, moveOperations) {
            if (moveOperations === void 0) { moveOperations = MoveOperations.Overwrite; }
            return new File(this, "moveTo(newurl='" + url + "',flags=" + moveOperations + ")").post();
        };
        File.prototype.openBinaryStream = function () {
            return new queryable_1.Queryable(this, "openBinaryStream");
        };
        File.prototype.publish = function (comment) {
            if (comment === void 0) { comment = ""; }
            return new File(this, "publish(comment='" + comment + "')").post();
        };
        File.prototype.recycle = function () {
            return new File(this, "recycle").post();
        };
        File.prototype.saveBinaryStream = function (data) {
            return new File(this, "saveBinary").post({ body: data });
        };
        File.prototype.startUpload = function (uploadId, fragment) {
            return new File(this, "startUpload(uploadId=guid'" + uploadId + "')").postAs({ body: fragment });
        };
        File.prototype.undoCheckout = function () {
            return new File(this, "undoCheckout").post();
        };
        File.prototype.unpublish = function (comment) {
            if (comment === void 0) { comment = ""; }
            return new File(this, "unpublish(comment='" + comment + "')").post();
        };
        return File;
    }(queryable_1.QueryableInstance));
    exports.File = File;
    var Versions = (function (_super) {
        __extends(Versions, _super);
        function Versions(baseUrl, path) {
            if (path === void 0) { path = "versions"; }
            _super.call(this, baseUrl, path);
        }
        Versions.prototype.getById = function (versionId) {
            var v = new Version(this);
            v.concat("(" + versionId + ")");
            return v;
        };
        Versions.prototype.deleteAll = function () {
            return new Versions(this, "deleteAll").post();
        };
        Versions.prototype.deleteById = function (versionId) {
            return new Versions(this, "deleteById(vid=" + versionId + ")").post();
        };
        Versions.prototype.deleteByLabel = function (label) {
            return new Versions(this, "deleteByLabel(versionlabel='" + label + "')").post();
        };
        Versions.prototype.restoreByLabel = function (label) {
            return new Versions(this, "restoreByLabel(versionlabel='" + label + "')").post();
        };
        return Versions;
    }(queryable_1.QueryableCollection));
    exports.Versions = Versions;
    var Version = (function (_super) {
        __extends(Version, _super);
        function Version(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(Version.prototype, "checkInComment", {
            get: function () {
                return new queryable_1.Queryable(this, "checkInComment");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "created", {
            get: function () {
                return new queryable_1.Queryable(this, "created");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "createdBy", {
            get: function () {
                return new queryable_1.Queryable(this, "createdBy");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "id", {
            get: function () {
                return new queryable_1.Queryable(this, "id");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "isCurrentVersion", {
            get: function () {
                return new queryable_1.Queryable(this, "isCurrentVersion");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "size", {
            get: function () {
                return new queryable_1.Queryable(this, "size");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "url", {
            get: function () {
                return new queryable_1.Queryable(this, "url");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "versionLabel", {
            get: function () {
                return new queryable_1.Queryable(this, "versionLabel");
            },
            enumerable: true,
            configurable: true
        });
        Version.prototype.delete = function (eTag) {
            if (eTag === void 0) { eTag = "*"; }
            return this.post({
                headers: {
                    "IF-Match": eTag,
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        return Version;
    }(queryable_1.QueryableInstance));
    exports.Version = Version;
    (function (CheckinType) {
        CheckinType[CheckinType["Minor"] = 0] = "Minor";
        CheckinType[CheckinType["Major"] = 1] = "Major";
        CheckinType[CheckinType["Overwrite"] = 2] = "Overwrite";
    })(exports.CheckinType || (exports.CheckinType = {}));
    var CheckinType = exports.CheckinType;
    (function (WebPartsPersonalizationScope) {
        WebPartsPersonalizationScope[WebPartsPersonalizationScope["User"] = 0] = "User";
        WebPartsPersonalizationScope[WebPartsPersonalizationScope["Shared"] = 1] = "Shared";
    })(exports.WebPartsPersonalizationScope || (exports.WebPartsPersonalizationScope = {}));
    var WebPartsPersonalizationScope = exports.WebPartsPersonalizationScope;
    (function (MoveOperations) {
        MoveOperations[MoveOperations["Overwrite"] = 1] = "Overwrite";
        MoveOperations[MoveOperations["AllowBrokenThickets"] = 8] = "AllowBrokenThickets";
    })(exports.MoveOperations || (exports.MoveOperations = {}));
    var MoveOperations = exports.MoveOperations;
    (function (TemplateFileType) {
        TemplateFileType[TemplateFileType["StandardPage"] = 0] = "StandardPage";
        TemplateFileType[TemplateFileType["WikiPage"] = 1] = "WikiPage";
        TemplateFileType[TemplateFileType["FormPage"] = 2] = "FormPage";
    })(exports.TemplateFileType || (exports.TemplateFileType = {}));
    var TemplateFileType = exports.TemplateFileType;
});

},{"./items":15,"./queryable":19}],14:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable", "./files", "./items"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var files_1 = require("./files");
    var items_1 = require("./items");
    var Folders = (function (_super) {
        __extends(Folders, _super);
        function Folders(baseUrl, path) {
            if (path === void 0) { path = "folders"; }
            _super.call(this, baseUrl, path);
        }
        Folders.prototype.getByName = function (name) {
            var f = new Folder(this);
            f.concat("('" + name + "')");
            return f;
        };
        Folders.prototype.add = function (url) {
            var _this = this;
            return new Folders(this, "add('" + url + "')").post().then(function (response) {
                return {
                    data: response,
                    folder: _this.getByName(url),
                };
            });
        };
        return Folders;
    }(queryable_1.QueryableCollection));
    exports.Folders = Folders;
    var Folder = (function (_super) {
        __extends(Folder, _super);
        function Folder(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(Folder.prototype, "contentTypeOrder", {
            get: function () {
                return new queryable_1.QueryableCollection(this, "contentTypeOrder");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "files", {
            get: function () {
                return new files_1.Files(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "folders", {
            get: function () {
                return new Folders(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "itemCount", {
            get: function () {
                return new queryable_1.Queryable(this, "itemCount");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "listItemAllFields", {
            get: function () {
                return new items_1.Item(this, "listItemAllFields");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "name", {
            get: function () {
                return new queryable_1.Queryable(this, "name");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "parentFolder", {
            get: function () {
                return new Folder(this, "parentFolder");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "properties", {
            get: function () {
                return new queryable_1.QueryableInstance(this, "properties");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "serverRelativeUrl", {
            get: function () {
                return new queryable_1.Queryable(this, "serverRelativeUrl");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "uniqueContentTypeOrder", {
            get: function () {
                return new queryable_1.QueryableCollection(this, "uniqueContentTypeOrder");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "welcomePage", {
            get: function () {
                return new queryable_1.Queryable(this, "welcomePage");
            },
            enumerable: true,
            configurable: true
        });
        Folder.prototype.delete = function (eTag) {
            if (eTag === void 0) { eTag = "*"; }
            return new Folder(this).post({
                headers: {
                    "IF-Match": eTag,
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        Folder.prototype.recycle = function () {
            return new Folder(this, "recycle").post();
        };
        return Folder;
    }(queryable_1.QueryableInstance));
    exports.Folder = Folder;
});

},{"./files":13,"./items":15,"./queryable":19}],15:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable", "./queryablesecurable", "./folders", "./contenttypes", "../../utils/util", "./odata"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var queryablesecurable_1 = require("./queryablesecurable");
    var folders_1 = require("./folders");
    var contenttypes_1 = require("./contenttypes");
    var util_1 = require("../../utils/util");
    var odata_1 = require("./odata");
    var Items = (function (_super) {
        __extends(Items, _super);
        function Items(baseUrl, path) {
            if (path === void 0) { path = "items"; }
            _super.call(this, baseUrl, path);
        }
        Items.prototype.getById = function (id) {
            var i = new Item(this);
            i.concat("(" + id + ")");
            return i;
        };
        Items.prototype.skip = function (skip) {
            this._query.add("$skiptoken", encodeURIComponent("Paged=TRUE&p_ID=" + skip));
            return this;
        };
        Items.prototype.getPaged = function () {
            return this.getAs(new PagedItemCollectionParser());
        };
        Items.prototype.add = function (properties) {
            var _this = this;
            if (properties === void 0) { properties = {}; }
            var parentList = this.getParent(queryable_1.QueryableInstance);
            return parentList.select("ListItemEntityTypeFullName").getAs().then(function (d) {
                var postBody = JSON.stringify(util_1.Util.extend({
                    "__metadata": { "type": d.ListItemEntityTypeFullName },
                }, properties));
                return _this.postAs({ body: postBody }).then(function (data) {
                    return {
                        data: data,
                        item: _this.getById(data.Id),
                    };
                });
            });
        };
        return Items;
    }(queryable_1.QueryableCollection));
    exports.Items = Items;
    var PagedItemCollectionParser = (function (_super) {
        __extends(PagedItemCollectionParser, _super);
        function PagedItemCollectionParser() {
            _super.apply(this, arguments);
        }
        PagedItemCollectionParser.prototype.parse = function (r) {
            return PagedItemCollection.fromResponse(r);
        };
        return PagedItemCollectionParser;
    }(odata_1.ODataParserBase));
    var Item = (function (_super) {
        __extends(Item, _super);
        function Item(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(Item.prototype, "attachmentFiles", {
            get: function () {
                return new queryable_1.QueryableCollection(this, "AttachmentFiles");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "contentType", {
            get: function () {
                return new contenttypes_1.ContentType(this, "ContentType");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "effectiveBasePermissions", {
            get: function () {
                return new queryable_1.Queryable(this, "EffectiveBasePermissions");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "effectiveBasePermissionsForUI", {
            get: function () {
                return new queryable_1.Queryable(this, "EffectiveBasePermissionsForUI");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "fieldValuesAsHTML", {
            get: function () {
                return new queryable_1.QueryableInstance(this, "FieldValuesAsHTML");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "fieldValuesAsText", {
            get: function () {
                return new queryable_1.QueryableInstance(this, "FieldValuesAsText");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "fieldValuesForEdit", {
            get: function () {
                return new queryable_1.QueryableInstance(this, "FieldValuesForEdit");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "folder", {
            get: function () {
                return new folders_1.Folder(this, "Folder");
            },
            enumerable: true,
            configurable: true
        });
        Item.prototype.update = function (properties, eTag) {
            var _this = this;
            if (eTag === void 0) { eTag = "*"; }
            var parentList = this.getParent(queryable_1.QueryableInstance, this.parentUrl.substr(0, this.parentUrl.lastIndexOf("/")));
            return parentList.select("ListItemEntityTypeFullName").getAs().then(function (d) {
                var postBody = JSON.stringify(util_1.Util.extend({
                    "__metadata": { "type": d.ListItemEntityTypeFullName },
                }, properties));
                return _this.post({
                    body: postBody,
                    headers: {
                        "IF-Match": eTag,
                        "X-HTTP-Method": "MERGE",
                    },
                }).then(function (data) {
                    return {
                        data: data,
                        item: _this,
                    };
                });
            });
        };
        Item.prototype.delete = function (eTag) {
            if (eTag === void 0) { eTag = "*"; }
            return this.post({
                headers: {
                    "IF-Match": eTag,
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        Item.prototype.recycle = function () {
            var i = new Item(this, "recycle");
            return i.post();
        };
        Item.prototype.validateUpdateListItem = function (formValues, newDocumentUpdate) {
            if (newDocumentUpdate === void 0) { newDocumentUpdate = false; }
            var postBody = JSON.stringify({ "formValues": formValues, bNewDocumentUpdate: newDocumentUpdate });
            var item = new Item(this, "validateupdatelistitem");
            return item.post({ body: postBody });
        };
        return Item;
    }(queryablesecurable_1.QueryableSecurable));
    exports.Item = Item;
    var PagedItemCollection = (function () {
        function PagedItemCollection() {
        }
        Object.defineProperty(PagedItemCollection.prototype, "hasNext", {
            get: function () {
                return typeof this.nextUrl === "string" && this.nextUrl.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        PagedItemCollection.fromResponse = function (r) {
            return r.json().then(function (d) {
                var col = new PagedItemCollection();
                col.nextUrl = d["odata.nextLink"];
                col.results = d.value;
                return col;
            });
        };
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
});

},{"../../utils/util":37,"./contenttypes":11,"./folders":14,"./odata":18,"./queryable":19,"./queryablesecurable":20}],16:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./items", "./views", "./contenttypes", "./fields", "./queryable", "./queryablesecurable", "../../utils/util", "./usercustomactions"], factory);
    }
})(function (require, exports) {
    "use strict";
    var items_1 = require("./items");
    var views_1 = require("./views");
    var contenttypes_1 = require("./contenttypes");
    var fields_1 = require("./fields");
    var queryable_1 = require("./queryable");
    var queryablesecurable_1 = require("./queryablesecurable");
    var util_1 = require("../../utils/util");
    var usercustomactions_1 = require("./usercustomactions");
    var Lists = (function (_super) {
        __extends(Lists, _super);
        function Lists(baseUrl, path) {
            if (path === void 0) { path = "lists"; }
            _super.call(this, baseUrl, path);
        }
        Lists.prototype.getByTitle = function (title) {
            return new List(this, "getByTitle('" + title + "')");
        };
        Lists.prototype.getById = function (id) {
            var list = new List(this);
            list.concat("('" + id + "')");
            return list;
        };
        Lists.prototype.add = function (title, description, template, enableContentTypes, additionalSettings) {
            var _this = this;
            if (description === void 0) { description = ""; }
            if (template === void 0) { template = 100; }
            if (enableContentTypes === void 0) { enableContentTypes = false; }
            if (additionalSettings === void 0) { additionalSettings = {}; }
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": "SP.List" },
                "AllowContentTypes": enableContentTypes,
                "BaseTemplate": template,
                "ContentTypesEnabled": enableContentTypes,
                "Description": description,
                "Title": title,
            }, additionalSettings));
            return this.post({ body: postBody }).then(function (data) {
                return {
                    list: _this.getByTitle(title),
                    data: data
                };
            });
        };
        Lists.prototype.ensure = function (title, description, template, enableContentTypes, additionalSettings) {
            var _this = this;
            if (description === void 0) { description = ""; }
            if (template === void 0) { template = 100; }
            if (enableContentTypes === void 0) { enableContentTypes = false; }
            if (additionalSettings === void 0) { additionalSettings = {}; }
            return new Promise(function (resolve, reject) {
                var list = _this.getByTitle(title);
                list.get().then(function (d) { return resolve({ created: false, list: list, data: d }); }).catch(function () {
                    _this.add(title, description, template, enableContentTypes, additionalSettings).then(function (r) {
                        resolve({ created: true, list: _this.getByTitle(title), data: r.data });
                    });
                }).catch(function (e) { return reject(e); });
            });
        };
        Lists.prototype.ensureSiteAssetsLibrary = function () {
            var q = new Lists(this, "ensuresiteassetslibrary");
            return q.post().then(function (json) {
                return new List(json["odata.id"]);
            });
        };
        Lists.prototype.ensureSitePagesLibrary = function () {
            var q = new Lists(this, "ensuresitepageslibrary");
            return q.post().then(function (json) {
                return new List(json["odata.id"]);
            });
        };
        return Lists;
    }(queryable_1.QueryableCollection));
    exports.Lists = Lists;
    var List = (function (_super) {
        __extends(List, _super);
        function List(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(List.prototype, "contentTypes", {
            get: function () {
                return new contenttypes_1.ContentTypes(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "items", {
            get: function () {
                return new items_1.Items(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "views", {
            get: function () {
                return new views_1.Views(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "fields", {
            get: function () {
                return new fields_1.Fields(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "defaultView", {
            get: function () {
                return new queryable_1.Queryable(this, "DefaultView");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "userCustomActions", {
            get: function () {
                return new usercustomactions_1.UserCustomActions(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "effectiveBasePermissions", {
            get: function () {
                return new queryable_1.Queryable(this, "EffectiveBasePermissions");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "eventReceivers", {
            get: function () {
                return new queryable_1.QueryableCollection(this, "EventReceivers");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "relatedFields", {
            get: function () {
                return new queryable_1.Queryable(this, "getRelatedFields");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "informationRightsManagementSettings", {
            get: function () {
                return new queryable_1.Queryable(this, "InformationRightsManagementSettings");
            },
            enumerable: true,
            configurable: true
        });
        List.prototype.getView = function (viewId) {
            return new views_1.View(this, "getView('" + viewId + "')");
        };
        List.prototype.update = function (properties, eTag) {
            var _this = this;
            if (eTag === void 0) { eTag = "*"; }
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": "SP.List" },
            }, properties));
            return this.post({
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
        List.prototype.delete = function (eTag) {
            if (eTag === void 0) { eTag = "*"; }
            return this.post({
                headers: {
                    "IF-Match": eTag,
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        List.prototype.getChanges = function (query) {
            var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeQuery" } }, query) });
            var q = new List(this, "getchanges");
            return q.post({ body: postBody });
        };
        List.prototype.getItemsByCAMLQuery = function (query) {
            var expands = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                expands[_i - 1] = arguments[_i];
            }
            var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.CamlQuery" } }, query) });
            var q = new List(this, "getitems");
            q = q.expand.apply(q, expands);
            return q.post({ body: postBody });
        };
        List.prototype.getListItemChangesSinceToken = function (query) {
            var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeLogItemQuery" } }, query) });
            var q = new List(this, "getlistitemchangessincetoken");
            return q.post({ body: postBody }, { parse: function (r) { return r.text(); } });
        };
        List.prototype.recycle = function () {
            this.append("recycle");
            return this.post();
        };
        List.prototype.renderListData = function (viewXml) {
            var q = new List(this, "renderlistdata(@viewXml)");
            q.query.add("@viewXml", "'" + viewXml + "'");
            return q.post();
        };
        List.prototype.renderListFormData = function (itemId, formId, mode) {
            var q = new List(this, "renderlistformdata(itemid=" + itemId + ", formid='" + formId + "', mode=" + mode + ")");
            return q.post();
        };
        List.prototype.reserveListItemId = function () {
            var q = new List(this, "reservelistitemid");
            return q.post();
        };
        return List;
    }(queryablesecurable_1.QueryableSecurable));
    exports.List = List;
});

},{"../../utils/util":37,"./contenttypes":11,"./fields":12,"./items":15,"./queryable":19,"./queryablesecurable":20,"./usercustomactions":30,"./views":32}],17:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable", "./quickLaunch", "./topNavigationBar"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var quickLaunch_1 = require("./quickLaunch");
    var topNavigationBar_1 = require("./topNavigationBar");
    var Navigation = (function (_super) {
        __extends(Navigation, _super);
        function Navigation(baseUrl) {
            _super.call(this, baseUrl, "navigation");
        }
        Object.defineProperty(Navigation.prototype, "quicklaunch", {
            get: function () {
                return new quickLaunch_1.QuickLaunch(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Navigation.prototype, "topNavigationBar", {
            get: function () {
                return new topNavigationBar_1.TopNavigationBar(this);
            },
            enumerable: true,
            configurable: true
        });
        return Navigation;
    }(queryable_1.Queryable));
    exports.Navigation = Navigation;
});

},{"./queryable":19,"./quickLaunch":21,"./topNavigationBar":28}],18:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../../utils/util", "../../utils/logging"], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require("../../utils/util");
    var logging_1 = require("../../utils/logging");
    var ODataParserBase = (function () {
        function ODataParserBase() {
        }
        ODataParserBase.prototype.parse = function (r) {
            return r.json().then(function (json) {
                if (json.hasOwnProperty("d")) {
                    if (json.d.hasOwnProperty("results")) {
                        return json.d.results;
                    }
                    return json.d;
                }
                else if (json.hasOwnProperty("value")) {
                    return json.value;
                }
                return json;
            });
        };
        return ODataParserBase;
    }());
    exports.ODataParserBase = ODataParserBase;
    var ODataDefaultParser = (function (_super) {
        __extends(ODataDefaultParser, _super);
        function ODataDefaultParser() {
            _super.apply(this, arguments);
        }
        return ODataDefaultParser;
    }(ODataParserBase));
    exports.ODataDefaultParser = ODataDefaultParser;
    var ODataRawParserImpl = (function () {
        function ODataRawParserImpl() {
        }
        ODataRawParserImpl.prototype.parse = function (r) {
            return r.json();
        };
        return ODataRawParserImpl;
    }());
    exports.ODataRawParserImpl = ODataRawParserImpl;
    var ODataValueParserImpl = (function (_super) {
        __extends(ODataValueParserImpl, _super);
        function ODataValueParserImpl() {
            _super.apply(this, arguments);
        }
        ODataValueParserImpl.prototype.parse = function (r) {
            return _super.prototype.parse.call(this, r).then(function (d) { return d; });
        };
        return ODataValueParserImpl;
    }(ODataParserBase));
    var ODataEntityParserImpl = (function (_super) {
        __extends(ODataEntityParserImpl, _super);
        function ODataEntityParserImpl(factory) {
            _super.call(this);
            this.factory = factory;
        }
        ODataEntityParserImpl.prototype.parse = function (r) {
            var _this = this;
            return _super.prototype.parse.call(this, r).then(function (d) {
                var o = new _this.factory(getEntityUrl(d), null);
                return util_1.Util.extend(o, d);
            });
        };
        return ODataEntityParserImpl;
    }(ODataParserBase));
    var ODataEntityArrayParserImpl = (function (_super) {
        __extends(ODataEntityArrayParserImpl, _super);
        function ODataEntityArrayParserImpl(factory) {
            _super.call(this);
            this.factory = factory;
        }
        ODataEntityArrayParserImpl.prototype.parse = function (r) {
            var _this = this;
            return _super.prototype.parse.call(this, r).then(function (d) {
                return d.map(function (v) {
                    var o = new _this.factory(getEntityUrl(v), null);
                    return util_1.Util.extend(o, v);
                });
            });
        };
        return ODataEntityArrayParserImpl;
    }(ODataParserBase));
    function getEntityUrl(entity) {
        if (entity.hasOwnProperty("__metadata")) {
            return entity.__metadata.uri;
        }
        else if (entity.hasOwnProperty("odata.editLink")) {
            return util_1.Util.combinePaths("_api", entity["odata.editLink"]);
        }
        else {
            logging_1.Logger.write("No uri information found in ODataEntity parsing, chaining will fail for this object.", logging_1.Logger.LogLevel.Warning);
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
});

},{"../../utils/logging":35,"../../utils/util":37}],19:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../../utils/util", "../../collections/collections", "../../net/HttpClient", "./odata"], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require("../../utils/util");
    var collections_1 = require("../../collections/collections");
    var HttpClient_1 = require("../../net/HttpClient");
    var odata_1 = require("./odata");
    var Queryable = (function () {
        function Queryable(baseUrl, path) {
            this._query = new collections_1.Dictionary();
            if (typeof baseUrl === "string") {
                var urlStr = baseUrl;
                if (urlStr.lastIndexOf("/") < 0) {
                    this._parentUrl = urlStr;
                    this._url = util_1.Util.combinePaths(urlStr, path);
                }
                else if (urlStr.lastIndexOf("/") > urlStr.lastIndexOf("(")) {
                    var index = urlStr.lastIndexOf("/");
                    this._parentUrl = urlStr.slice(0, index);
                    path = util_1.Util.combinePaths(urlStr.slice(index), path);
                    this._url = util_1.Util.combinePaths(this._parentUrl, path);
                }
                else {
                    var index = urlStr.lastIndexOf("(");
                    this._parentUrl = urlStr.slice(0, index);
                    this._url = util_1.Util.combinePaths(urlStr, path);
                }
            }
            else {
                var q = baseUrl;
                this._parentUrl = q._url;
                var target = q._query.get("@target");
                if (target !== null) {
                    this._query.add("@target", target);
                }
                this._url = util_1.Util.combinePaths(this._parentUrl, path);
            }
        }
        Queryable.prototype.concat = function (pathPart) {
            this._url += pathPart;
        };
        Queryable.prototype.append = function (pathPart) {
            this._url = util_1.Util.combinePaths(this._url, pathPart);
        };
        Object.defineProperty(Queryable.prototype, "parentUrl", {
            get: function () {
                return this._parentUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Queryable.prototype, "query", {
            get: function () {
                return this._query;
            },
            enumerable: true,
            configurable: true
        });
        Queryable.prototype.toUrl = function () {
            if (!util_1.Util.isUrlAbsolute(this._url)) {
                if (typeof _spPageContextInfo !== "undefined") {
                    if (_spPageContextInfo.hasOwnProperty("webAbsoluteUrl")) {
                        return util_1.Util.combinePaths(_spPageContextInfo.webAbsoluteUrl, this._url);
                    }
                    else if (_spPageContextInfo.hasOwnProperty("webServerRelativeUrl")) {
                        return util_1.Util.combinePaths(_spPageContextInfo.webServerRelativeUrl, this._url);
                    }
                }
            }
            return this._url;
        };
        Queryable.prototype.toUrlAndQuery = function () {
            var _this = this;
            var url = this.toUrl();
            if (this._query.count() > 0) {
                url += "?";
                var keys = this._query.getKeys();
                url += keys.map(function (key, ix, arr) { return (key + "=" + _this._query.get(key)); }).join("&");
            }
            return url;
        };
        Queryable.prototype.get = function (parser) {
            if (parser === void 0) { parser = new odata_1.ODataDefaultParser(); }
            return this.getImpl(parser);
        };
        Queryable.prototype.getAs = function (parser) {
            if (parser === void 0) { parser = new odata_1.ODataDefaultParser(); }
            return this.getImpl(parser);
        };
        Queryable.prototype.post = function (postOptions, parser) {
            if (postOptions === void 0) { postOptions = {}; }
            if (parser === void 0) { parser = new odata_1.ODataDefaultParser(); }
            return this.postImpl(postOptions, parser);
        };
        Queryable.prototype.postAs = function (postOptions, parser) {
            if (postOptions === void 0) { postOptions = {}; }
            if (parser === void 0) { parser = new odata_1.ODataDefaultParser(); }
            return this.postImpl(postOptions, parser);
        };
        Queryable.prototype.getParent = function (factory, baseUrl, path) {
            if (baseUrl === void 0) { baseUrl = this.parentUrl; }
            var parent = new factory(baseUrl, path);
            var target = this.query.get("@target");
            if (target !== null) {
                parent.query.add("@target", target);
            }
            return parent;
        };
        Queryable.prototype.getImpl = function (parser) {
            var client = new HttpClient_1.HttpClient();
            return client.get(this.toUrlAndQuery()).then(function (response) {
                if (!response.ok) {
                    throw "Error making GET request: " + response.statusText;
                }
                return parser.parse(response);
            });
        };
        Queryable.prototype.postImpl = function (postOptions, parser) {
            var client = new HttpClient_1.HttpClient();
            return client.post(this.toUrlAndQuery(), postOptions).then(function (response) {
                if (!response.ok) {
                    throw "Error making POST request: " + response.statusText;
                }
                if ((response.headers.has("Content-Length") && parseFloat(response.headers.get("Content-Length")) === 0)
                    || response.status === 204) {
                    return new Promise(function (resolve, reject) { resolve({}); });
                }
                return parser.parse(response);
            });
        };
        return Queryable;
    }());
    exports.Queryable = Queryable;
    var QueryableCollection = (function (_super) {
        __extends(QueryableCollection, _super);
        function QueryableCollection() {
            _super.apply(this, arguments);
        }
        QueryableCollection.prototype.filter = function (filter) {
            this._query.add("$filter", filter);
            return this;
        };
        QueryableCollection.prototype.select = function () {
            var selects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selects[_i - 0] = arguments[_i];
            }
            this._query.add("$select", selects.join(","));
            return this;
        };
        QueryableCollection.prototype.expand = function () {
            var expands = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                expands[_i - 0] = arguments[_i];
            }
            this._query.add("$expand", expands.join(","));
            return this;
        };
        QueryableCollection.prototype.orderBy = function (orderBy, ascending) {
            if (ascending === void 0) { ascending = false; }
            var keys = this._query.getKeys();
            var query = [];
            var asc = ascending ? " asc" : "";
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
        QueryableCollection.prototype.skip = function (skip) {
            this._query.add("$skip", skip.toString());
            return this;
        };
        QueryableCollection.prototype.top = function (top) {
            this._query.add("$top", top.toString());
            return this;
        };
        return QueryableCollection;
    }(Queryable));
    exports.QueryableCollection = QueryableCollection;
    var QueryableInstance = (function (_super) {
        __extends(QueryableInstance, _super);
        function QueryableInstance() {
            _super.apply(this, arguments);
        }
        QueryableInstance.prototype.select = function () {
            var selects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selects[_i - 0] = arguments[_i];
            }
            this._query.add("$select", selects.join(","));
            return this;
        };
        QueryableInstance.prototype.expand = function () {
            var expands = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                expands[_i - 0] = arguments[_i];
            }
            this._query.add("$expand", expands.join(","));
            return this;
        };
        return QueryableInstance;
    }(Queryable));
    exports.QueryableInstance = QueryableInstance;
});

},{"../../collections/collections":1,"../../net/HttpClient":7,"../../utils/util":37,"./odata":18}],20:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./roles", "./queryable"], factory);
    }
})(function (require, exports) {
    "use strict";
    var roles_1 = require("./roles");
    var queryable_1 = require("./queryable");
    var QueryableSecurable = (function (_super) {
        __extends(QueryableSecurable, _super);
        function QueryableSecurable() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(QueryableSecurable.prototype, "roleAssignments", {
            get: function () {
                return new roles_1.RoleAssignments(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QueryableSecurable.prototype, "firstUniqueAncestorSecurableObject", {
            get: function () {
                this.append("FirstUniqueAncestorSecurableObject");
                return new queryable_1.QueryableInstance(this);
            },
            enumerable: true,
            configurable: true
        });
        QueryableSecurable.prototype.getUserEffectivePermissions = function (loginName) {
            this.append("getUserEffectivePermissions(@user)");
            this._query.add("@user", "'" + encodeURIComponent(loginName) + "'");
            return new queryable_1.Queryable(this);
        };
        QueryableSecurable.prototype.breakRoleInheritance = function (copyRoleAssignments, clearSubscopes) {
            if (copyRoleAssignments === void 0) { copyRoleAssignments = false; }
            if (clearSubscopes === void 0) { clearSubscopes = false; }
            var Breaker = (function (_super) {
                __extends(Breaker, _super);
                function Breaker(baseUrl, copy, clear) {
                    _super.call(this, baseUrl, "breakroleinheritance(copyroleassignments=" + copy + ", clearsubscopes=" + clear + ")");
                }
                Breaker.prototype.break = function () {
                    return this.post();
                };
                return Breaker;
            }(queryable_1.Queryable));
            var b = new Breaker(this, copyRoleAssignments, clearSubscopes);
            return b.break();
        };
        QueryableSecurable.prototype.resetRoleInheritance = function () {
            var Resetter = (function (_super) {
                __extends(Resetter, _super);
                function Resetter(baseUrl) {
                    _super.call(this, baseUrl, "resetroleinheritance");
                }
                Resetter.prototype.reset = function () {
                    return this.post();
                };
                return Resetter;
            }(queryable_1.Queryable));
            var r = new Resetter(this);
            return r.reset();
        };
        return QueryableSecurable;
    }(queryable_1.QueryableInstance));
    exports.QueryableSecurable = QueryableSecurable;
});

},{"./queryable":19,"./roles":23}],21:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var QuickLaunch = (function (_super) {
        __extends(QuickLaunch, _super);
        function QuickLaunch(baseUrl) {
            _super.call(this, baseUrl, "QuickLaunch");
        }
        return QuickLaunch;
    }(queryable_1.Queryable));
    exports.QuickLaunch = QuickLaunch;
});

},{"./queryable":19}],22:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./search", "./site", "./webs", "../../utils/util", "./userprofiles"], factory);
    }
})(function (require, exports) {
    "use strict";
    var search_1 = require("./search");
    var site_1 = require("./site");
    var webs_1 = require("./webs");
    var util_1 = require("../../utils/util");
    var userprofiles_1 = require("./userprofiles");
    var Rest = (function () {
        function Rest() {
        }
        Rest.prototype.search = function (query) {
            var finalQuery;
            if (typeof query === "string") {
                finalQuery = { Querytext: query };
            }
            else {
                finalQuery = query;
            }
            return new search_1.Search("").execute(finalQuery);
        };
        Object.defineProperty(Rest.prototype, "site", {
            get: function () {
                return new site_1.Site("");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rest.prototype, "web", {
            get: function () {
                return new webs_1.Web("");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rest.prototype, "profiles", {
            get: function () {
                return new userprofiles_1.UserProfileQuery("");
            },
            enumerable: true,
            configurable: true
        });
        Rest.prototype.crossDomainSite = function (addInWebUrl, hostWebUrl) {
            return this._cdImpl(site_1.Site, addInWebUrl, hostWebUrl, "site");
        };
        Rest.prototype.crossDomainWeb = function (addInWebUrl, hostWebUrl) {
            return this._cdImpl(webs_1.Web, addInWebUrl, hostWebUrl, "web");
        };
        Rest.prototype._cdImpl = function (factory, addInWebUrl, hostWebUrl, urlPart) {
            if (!util_1.Util.isUrlAbsolute(addInWebUrl)) {
                throw "The addInWebUrl parameter must be an absolute url.";
            }
            if (!util_1.Util.isUrlAbsolute(hostWebUrl)) {
                throw "The hostWebUrl parameter must be an absolute url.";
            }
            var url = util_1.Util.combinePaths(addInWebUrl, "_api/SP.AppContextSite(@target)");
            var instance = new factory(url, urlPart);
            instance.query.add("@target", "'" + encodeURIComponent(hostWebUrl) + "'");
            return instance;
        };
        return Rest;
    }());
    exports.Rest = Rest;
});

},{"../../utils/util":37,"./search":24,"./site":25,"./userprofiles":31,"./webs":33}],23:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable", "./sitegroups", "../../utils/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var sitegroups_1 = require("./sitegroups");
    var util_1 = require("../../utils/util");
    var RoleAssignments = (function (_super) {
        __extends(RoleAssignments, _super);
        function RoleAssignments(baseUrl, path) {
            if (path === void 0) { path = "roleassignments"; }
            _super.call(this, baseUrl, path);
        }
        RoleAssignments.prototype.add = function (principalId, roleDefId) {
            var a = new RoleAssignments(this, "addroleassignment(principalid=" + principalId + ", roledefid=" + roleDefId);
            return a.post();
        };
        RoleAssignments.prototype.remove = function (principalId, roleDefId) {
            var a = new RoleAssignments(this, "removeroleassignment(principalid=" + principalId + ", roledefid=" + roleDefId);
            return a.post();
        };
        RoleAssignments.prototype.getById = function (id) {
            var ra = new RoleAssignment(this);
            ra.concat("(" + id + ")");
            return ra;
        };
        return RoleAssignments;
    }(queryable_1.QueryableCollection));
    exports.RoleAssignments = RoleAssignments;
    var RoleAssignment = (function (_super) {
        __extends(RoleAssignment, _super);
        function RoleAssignment(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(RoleAssignment.prototype, "groups", {
            get: function () {
                return new sitegroups_1.SiteGroups(this, "groups");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleAssignment.prototype, "bindings", {
            get: function () {
                return new RoleDefinitionBindings(this);
            },
            enumerable: true,
            configurable: true
        });
        RoleAssignment.prototype.delete = function () {
            return this.post({
                headers: {
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        return RoleAssignment;
    }(queryable_1.QueryableInstance));
    exports.RoleAssignment = RoleAssignment;
    var RoleDefinitions = (function (_super) {
        __extends(RoleDefinitions, _super);
        function RoleDefinitions(baseUrl, path) {
            if (path === void 0) { path = "roledefinitions"; }
            _super.call(this, baseUrl, path);
        }
        RoleDefinitions.prototype.getById = function (id) {
            return new RoleDefinition(this, "getById(" + id + ")");
        };
        RoleDefinitions.prototype.getByName = function (name) {
            return new RoleDefinition(this, "getbyname('" + name + "')");
        };
        RoleDefinitions.prototype.getByType = function (roleTypeKind) {
            return new RoleDefinition(this, "getbytype(" + roleTypeKind + ")");
        };
        RoleDefinitions.prototype.add = function (name, description, order, basePermissions) {
            var _this = this;
            var postBody = JSON.stringify({
                BasePermissions: util_1.Util.extend({ __metadata: { type: "SP.BasePermissions" } }, basePermissions),
                Description: description,
                Name: name,
                Order: order,
                __metadata: { "type": "SP.RoleDefinition" },
            });
            return this.post({ body: postBody }).then(function (data) {
                return {
                    data: data,
                    definition: _this.getById(data.Id),
                };
            });
        };
        return RoleDefinitions;
    }(queryable_1.QueryableCollection));
    exports.RoleDefinitions = RoleDefinitions;
    var RoleDefinition = (function (_super) {
        __extends(RoleDefinition, _super);
        function RoleDefinition(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        RoleDefinition.prototype.update = function (properties) {
            var _this = this;
            if (typeof properties.hasOwnProperty("BasePermissions")) {
                properties["BasePermissions"] = util_1.Util.extend({ __metadata: { type: "SP.BasePermissions" } }, properties["BasePermissions"]);
            }
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": "SP.RoleDefinition" },
            }, properties));
            return this.post({
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
        RoleDefinition.prototype.delete = function () {
            return this.post({
                headers: {
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        return RoleDefinition;
    }(queryable_1.QueryableInstance));
    exports.RoleDefinition = RoleDefinition;
    var RoleDefinitionBindings = (function (_super) {
        __extends(RoleDefinitionBindings, _super);
        function RoleDefinitionBindings(baseUrl, path) {
            if (path === void 0) { path = "roledefinitionbindings"; }
            _super.call(this, baseUrl, path);
        }
        return RoleDefinitionBindings;
    }(queryable_1.QueryableCollection));
    exports.RoleDefinitionBindings = RoleDefinitionBindings;
});

},{"../../utils/util":37,"./queryable":19,"./sitegroups":26}],24:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var Search = (function (_super) {
        __extends(Search, _super);
        function Search(baseUrl, path) {
            if (path === void 0) { path = "_api/search/postquery"; }
            _super.call(this, baseUrl, path);
        }
        Search.prototype.execute = function (query) {
            var formattedBody;
            formattedBody = query;
            if (formattedBody.SelectProperties) {
                formattedBody.SelectProperties = { results: query.SelectProperties };
            }
            if (formattedBody.RefinementFilters) {
                formattedBody.RefinementFilters = { results: query.RefinementFilters };
            }
            if (formattedBody.Refiners) {
                formattedBody.Refiners = { results: query.Refiners };
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
            var postBody = JSON.stringify({ request: formattedBody });
            return this.post({ body: postBody }).then(function (data) {
                return new SearchResults(data);
            });
        };
        return Search;
    }(queryable_1.QueryableInstance));
    exports.Search = Search;
    var SearchResults = (function () {
        function SearchResults(response) {
            this.PrimarySearchResults = this.formatSearchResults(response.PrimaryQueryResult.RelevantResults.Table.Rows);
            this.RawSearchResults = response;
            this.ElapsedTime = response.ElapsedTime;
            this.RowCount = response.PrimaryQueryResult.RelevantResults.RowCount;
            this.TotalRows = response.PrimaryQueryResult.RelevantResults.TotalRows;
            this.TotalRowsIncludingDuplicates = response.PrimaryQueryResult.RelevantResults.TotalRowsIncludingDuplicates;
        }
        SearchResults.prototype.formatSearchResults = function (rawResults) {
            var results = new Array();
            for (var _i = 0, rawResults_1 = rawResults; _i < rawResults_1.length; _i++) {
                var i = rawResults_1[_i];
                results.push(new SearchResult(i.Cells));
            }
            return results;
        };
        return SearchResults;
    }());
    exports.SearchResults = SearchResults;
    var SearchResult = (function () {
        function SearchResult(item) {
            for (var _i = 0, item_1 = item; _i < item_1.length; _i++) {
                var i = item_1[_i];
                this[i.Key] = i.Value;
            }
        }
        return SearchResult;
    }());
    exports.SearchResult = SearchResult;
    (function (SortDirection) {
        SortDirection[SortDirection["Ascending"] = 0] = "Ascending";
        SortDirection[SortDirection["Descending"] = 1] = "Descending";
        SortDirection[SortDirection["FQLFormula"] = 2] = "FQLFormula";
    })(exports.SortDirection || (exports.SortDirection = {}));
    var SortDirection = exports.SortDirection;
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
    })(exports.ReorderingRuleMatchType || (exports.ReorderingRuleMatchType = {}));
    var ReorderingRuleMatchType = exports.ReorderingRuleMatchType;
    (function (QueryPropertyValueType) {
        QueryPropertyValueType[QueryPropertyValueType["None"] = 0] = "None";
        QueryPropertyValueType[QueryPropertyValueType["StringType"] = 1] = "StringType";
        QueryPropertyValueType[QueryPropertyValueType["Int32TYpe"] = 2] = "Int32TYpe";
        QueryPropertyValueType[QueryPropertyValueType["BooleanType"] = 3] = "BooleanType";
        QueryPropertyValueType[QueryPropertyValueType["StringArrayType"] = 4] = "StringArrayType";
        QueryPropertyValueType[QueryPropertyValueType["UnSupportedType"] = 5] = "UnSupportedType";
    })(exports.QueryPropertyValueType || (exports.QueryPropertyValueType = {}));
    var QueryPropertyValueType = exports.QueryPropertyValueType;
});

},{"./queryable":19}],25:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable", "./webs", "./usercustomactions"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var webs_1 = require("./webs");
    var usercustomactions_1 = require("./usercustomactions");
    var Site = (function (_super) {
        __extends(Site, _super);
        function Site(baseUrl, path) {
            if (path === void 0) { path = "_api/site"; }
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(Site.prototype, "rootWeb", {
            get: function () {
                return new webs_1.Web(this, "rootweb");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Site.prototype, "userCustomActions", {
            get: function () {
                return new usercustomactions_1.UserCustomActions(this);
            },
            enumerable: true,
            configurable: true
        });
        Site.prototype.getContextInfo = function () {
            var q = new Site("", "_api/contextinfo");
            return q.post();
        };
        Site.prototype.getDocumentLibraries = function (absoluteWebUrl) {
            var q = new queryable_1.Queryable("_api/sp.web.getdocumentlibraries(@v)");
            q.query.add("@v", "'" + absoluteWebUrl + "'");
            return q.get();
        };
        Site.prototype.getWebUrlFromPageUrl = function (absolutePageUrl) {
            var q = new queryable_1.Queryable("_api/sp.web.getweburlfrompageurl(@v)");
            q.query.add("@v", "'" + absolutePageUrl + "'");
            return q.get();
        };
        return Site;
    }(queryable_1.QueryableInstance));
    exports.Site = Site;
});

},{"./queryable":19,"./usercustomactions":30,"./webs":33}],26:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable", "./siteusers", "../../utils/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var siteusers_1 = require("./siteusers");
    var util_1 = require("../../utils/util");
    (function (PrincipalType) {
        PrincipalType[PrincipalType["None"] = 0] = "None";
        PrincipalType[PrincipalType["User"] = 1] = "User";
        PrincipalType[PrincipalType["DistributionList"] = 2] = "DistributionList";
        PrincipalType[PrincipalType["SecurityGroup"] = 4] = "SecurityGroup";
        PrincipalType[PrincipalType["SharePointGroup"] = 8] = "SharePointGroup";
        PrincipalType[PrincipalType["All"] = 15] = "All";
    })(exports.PrincipalType || (exports.PrincipalType = {}));
    var PrincipalType = exports.PrincipalType;
    var SiteGroups = (function (_super) {
        __extends(SiteGroups, _super);
        function SiteGroups(baseUrl, path) {
            if (path === void 0) { path = "sitegroups"; }
            _super.call(this, baseUrl, path);
        }
        SiteGroups.prototype.add = function (properties) {
            var _this = this;
            var postBody = JSON.stringify(util_1.Util.extend({ "__metadata": { "type": "SP.Group" } }, properties));
            return this.post({ body: postBody }).then(function (data) {
                return {
                    data: data,
                    group: _this.getById(data.Id),
                };
            });
        };
        SiteGroups.prototype.getByName = function (groupName) {
            return new SiteGroup(this, "getByName('" + groupName + "')");
        };
        SiteGroups.prototype.getById = function (id) {
            var sg = new SiteGroup(this);
            sg.concat("(" + id + ")");
            return sg;
        };
        SiteGroups.prototype.removeById = function (id) {
            var g = new SiteGroups(this, "removeById('" + id + "')");
            return g.post();
        };
        SiteGroups.prototype.removeByLoginName = function (loginName) {
            var g = new SiteGroups(this, "removeByLoginName('" + loginName + "')");
            return g.post();
        };
        return SiteGroups;
    }(queryable_1.QueryableCollection));
    exports.SiteGroups = SiteGroups;
    var SiteGroup = (function (_super) {
        __extends(SiteGroup, _super);
        function SiteGroup(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(SiteGroup.prototype, "users", {
            get: function () {
                return new siteusers_1.SiteUsers(this, "users");
            },
            enumerable: true,
            configurable: true
        });
        SiteGroup.prototype.update = function (properties) {
            var _this = this;
            var postBody = util_1.Util.extend({ "__metadata": { "type": "SP.Group" } }, properties);
            return this.post({
                body: JSON.stringify(postBody),
                headers: {
                    "X-HTTP-Method": "MERGE",
                }
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
    }(queryable_1.QueryableInstance));
    exports.SiteGroup = SiteGroup;
});

},{"../../utils/util":37,"./queryable":19,"./siteusers":27}],27:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable", "./sitegroups", "../../utils/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var sitegroups_1 = require("./sitegroups");
    var util_1 = require("../../utils/util");
    var SiteUsers = (function (_super) {
        __extends(SiteUsers, _super);
        function SiteUsers(baseUrl, path) {
            if (path === void 0) { path = "siteusers"; }
            _super.call(this, baseUrl, path);
        }
        SiteUsers.prototype.getByEmail = function (email) {
            return new SiteUser(this, "getByEmail('" + email + "')");
        };
        SiteUsers.prototype.getById = function (id) {
            return new SiteUser(this, "getById(" + id + ")");
        };
        SiteUsers.prototype.getByLoginName = function (loginName) {
            var su = new SiteUser(this);
            su.concat("(@v)");
            su.query.add("@v", encodeURIComponent(loginName));
            return su;
        };
        SiteUsers.prototype.removeById = function (id) {
            var o = new SiteUsers(this, "removeById(" + id + ")");
            return o.post();
        };
        SiteUsers.prototype.removeByLoginName = function (loginName) {
            var o = new SiteUsers(this, "removeByLoginName(@v)");
            o.query.add("@v", encodeURIComponent(loginName));
            return o.post();
        };
        SiteUsers.prototype.add = function (loginName) {
            var _this = this;
            var postBody = JSON.stringify({ "__metadata": { "type": "SP.User" }, LoginName: loginName });
            return this.post({ body: postBody }).then(function (data) { return _this.getByLoginName(loginName); });
        };
        return SiteUsers;
    }(queryable_1.QueryableCollection));
    exports.SiteUsers = SiteUsers;
    var SiteUser = (function (_super) {
        __extends(SiteUser, _super);
        function SiteUser(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(SiteUser.prototype, "groups", {
            get: function () {
                return new sitegroups_1.SiteGroups(this, "groups");
            },
            enumerable: true,
            configurable: true
        });
        SiteUser.prototype.update = function (properties) {
            var _this = this;
            var postBody = util_1.Util.extend({ "__metadata": { "type": "SP.User" } }, properties);
            return this.post({
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
        SiteUser.prototype.delete = function () {
            return this.post({
                headers: {
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        return SiteUser;
    }(queryable_1.QueryableInstance));
    exports.SiteUser = SiteUser;
});

},{"../../utils/util":37,"./queryable":19,"./sitegroups":26}],28:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var TopNavigationBar = (function (_super) {
        __extends(TopNavigationBar, _super);
        function TopNavigationBar(baseUrl) {
            _super.call(this, baseUrl, "TopNavigationBar");
        }
        return TopNavigationBar;
    }(queryable_1.QueryableInstance));
    exports.TopNavigationBar = TopNavigationBar;
});

},{"./queryable":19}],29:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    (function (ControlMode) {
        ControlMode[ControlMode["Display"] = 1] = "Display";
        ControlMode[ControlMode["Edit"] = 2] = "Edit";
        ControlMode[ControlMode["New"] = 3] = "New";
    })(exports.ControlMode || (exports.ControlMode = {}));
    var ControlMode = exports.ControlMode;
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
    })(exports.FieldTypes || (exports.FieldTypes = {}));
    var FieldTypes = exports.FieldTypes;
    (function (DateTimeFieldFormatType) {
        DateTimeFieldFormatType[DateTimeFieldFormatType["DateOnly"] = 0] = "DateOnly";
        DateTimeFieldFormatType[DateTimeFieldFormatType["DateTime"] = 1] = "DateTime";
    })(exports.DateTimeFieldFormatType || (exports.DateTimeFieldFormatType = {}));
    var DateTimeFieldFormatType = exports.DateTimeFieldFormatType;
    (function (AddFieldOptions) {
        AddFieldOptions[AddFieldOptions["DefaultValue"] = 0] = "DefaultValue";
        AddFieldOptions[AddFieldOptions["AddToDefaultContentType"] = 1] = "AddToDefaultContentType";
        AddFieldOptions[AddFieldOptions["AddToNoContentType"] = 2] = "AddToNoContentType";
        AddFieldOptions[AddFieldOptions["AddToAllContentTypes"] = 4] = "AddToAllContentTypes";
        AddFieldOptions[AddFieldOptions["AddFieldInternalNameHint"] = 8] = "AddFieldInternalNameHint";
        AddFieldOptions[AddFieldOptions["AddFieldToDefaultView"] = 16] = "AddFieldToDefaultView";
        AddFieldOptions[AddFieldOptions["AddFieldCheckDisplayName"] = 32] = "AddFieldCheckDisplayName";
    })(exports.AddFieldOptions || (exports.AddFieldOptions = {}));
    var AddFieldOptions = exports.AddFieldOptions;
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
    })(exports.CalendarType || (exports.CalendarType = {}));
    var CalendarType = exports.CalendarType;
    (function (UrlFieldFormatType) {
        UrlFieldFormatType[UrlFieldFormatType["Hyperlink"] = 0] = "Hyperlink";
        UrlFieldFormatType[UrlFieldFormatType["Image"] = 1] = "Image";
    })(exports.UrlFieldFormatType || (exports.UrlFieldFormatType = {}));
    var UrlFieldFormatType = exports.UrlFieldFormatType;
    (function (PrincipalType) {
        PrincipalType[PrincipalType["None"] = 0] = "None";
        PrincipalType[PrincipalType["User"] = 1] = "User";
        PrincipalType[PrincipalType["DistributionList"] = 2] = "DistributionList";
        PrincipalType[PrincipalType["SecurityGroup"] = 4] = "SecurityGroup";
        PrincipalType[PrincipalType["SharePointGroup"] = 8] = "SharePointGroup";
        PrincipalType[PrincipalType["All"] = 15] = "All";
    })(exports.PrincipalType || (exports.PrincipalType = {}));
    var PrincipalType = exports.PrincipalType;
});

},{}],30:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable", "../../utils/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var util_1 = require("../../utils/util");
    var UserCustomActions = (function (_super) {
        __extends(UserCustomActions, _super);
        function UserCustomActions(baseUrl, path) {
            if (path === void 0) { path = "usercustomactions"; }
            _super.call(this, baseUrl, path);
        }
        UserCustomActions.prototype.getById = function (id) {
            return new UserCustomAction(this, "(" + id + ")");
        };
        UserCustomActions.prototype.add = function (properties) {
            var _this = this;
            var postBody = JSON.stringify(util_1.Util.extend({ __metadata: { "type": "SP.UserCustomAction" } }, properties));
            return this.post({ body: postBody }).then(function (data) {
                return {
                    action: _this.getById(data.Id),
                    data: data,
                };
            });
        };
        UserCustomActions.prototype.clear = function () {
            var a = new UserCustomActions(this, "clear");
            return a.post();
        };
        return UserCustomActions;
    }(queryable_1.QueryableCollection));
    exports.UserCustomActions = UserCustomActions;
    var UserCustomAction = (function (_super) {
        __extends(UserCustomAction, _super);
        function UserCustomAction(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        UserCustomAction.prototype.update = function (properties) {
            var _this = this;
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": "SP.UserCustomAction" },
            }, properties));
            return this.post({
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
        return UserCustomAction;
    }(queryable_1.QueryableInstance));
    exports.UserCustomAction = UserCustomAction;
});

},{"../../utils/util":37,"./queryable":19}],31:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable", "../../utils/files", "./odata"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var FileUtil = require("../../utils/files");
    var odata_1 = require("./odata");
    var UserProfileQuery = (function (_super) {
        __extends(UserProfileQuery, _super);
        function UserProfileQuery(baseUrl, path) {
            if (path === void 0) { path = "_api/sp.userprofiles.peoplemanager"; }
            _super.call(this, baseUrl, path);
            this.profileLoader = new ProfileLoader(baseUrl);
        }
        Object.defineProperty(UserProfileQuery.prototype, "editProfileLink", {
            get: function () {
                var q = new UserProfileQuery(this, "EditProfileLink");
                return q.getAs(odata_1.ODataValue());
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserProfileQuery.prototype, "isMyPeopleListPublic", {
            get: function () {
                var q = new UserProfileQuery(this, "IsMyPeopleListPublic");
                return q.getAs(odata_1.ODataValue());
            },
            enumerable: true,
            configurable: true
        });
        UserProfileQuery.prototype.amIFollowedBy = function (loginName) {
            var q = new UserProfileQuery(this, "amifollowedby(@v)");
            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
            return q.get();
        };
        UserProfileQuery.prototype.amIFollowing = function (loginName) {
            var q = new UserProfileQuery(this, "amifollowing(@v)");
            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
            return q.get();
        };
        UserProfileQuery.prototype.getFollowedTags = function (maxCount) {
            if (maxCount === void 0) { maxCount = 20; }
            var q = new UserProfileQuery(this, "getfollowedtags(" + maxCount + ")");
            return q.get();
        };
        UserProfileQuery.prototype.getFollowersFor = function (loginName) {
            var q = new UserProfileQuery(this, "getfollowersfor(@v)");
            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
            return q.get();
        };
        Object.defineProperty(UserProfileQuery.prototype, "myFollowers", {
            get: function () {
                return new queryable_1.QueryableCollection(this, "getmyfollowers");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserProfileQuery.prototype, "myProperties", {
            get: function () {
                return new UserProfileQuery(this, "getmyproperties");
            },
            enumerable: true,
            configurable: true
        });
        UserProfileQuery.prototype.getPeopleFollowedBy = function (loginName) {
            var q = new UserProfileQuery(this, "getpeoplefollowedby(@v)");
            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
            return q.get();
        };
        UserProfileQuery.prototype.getPropertiesFor = function (loginName) {
            var q = new UserProfileQuery(this, "getpropertiesfor(@v)");
            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
            return q.get();
        };
        Object.defineProperty(UserProfileQuery.prototype, "trendingTags", {
            get: function () {
                var q = new UserProfileQuery(this, null);
                q.concat(".gettrendingtags");
                return q.get();
            },
            enumerable: true,
            configurable: true
        });
        UserProfileQuery.prototype.getUserProfilePropertyFor = function (loginName, propertyName) {
            var q = new UserProfileQuery(this, "getuserprofilepropertyfor(accountname=@v, propertyname='" + propertyName + "')");
            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
            return q.get();
        };
        UserProfileQuery.prototype.hideSuggestion = function (loginName) {
            var q = new UserProfileQuery(this, "hidesuggestion(@v)");
            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
            return q.post();
        };
        UserProfileQuery.prototype.isFollowing = function (follower, followee) {
            var q = new UserProfileQuery(this, null);
            q.concat(".isfollowing(possiblefolloweraccountname=@v, possiblefolloweeaccountname=@y)");
            q.query.add("@v", "'" + encodeURIComponent(follower) + "'");
            q.query.add("@y", "'" + encodeURIComponent(followee) + "'");
            return q.get();
        };
        UserProfileQuery.prototype.setMyProfilePic = function (profilePicSource) {
            var _this = this;
            return FileUtil.readBlobAsArrayBuffer(profilePicSource).then(function (buffer) {
                var request = new UserProfileQuery(_this, "setmyprofilepicture");
                return request.post({
                    body: buffer,
                });
            });
        };
        UserProfileQuery.prototype.createPersonalSiteEnqueueBulk = function () {
            var emails = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                emails[_i - 0] = arguments[_i];
            }
            return this.profileLoader.createPersonalSiteEnqueueBulk(emails);
        };
        Object.defineProperty(UserProfileQuery.prototype, "ownerUserProfile", {
            get: function () {
                return this.profileLoader.ownerUserProfile;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserProfileQuery.prototype, "userProfile", {
            get: function () {
                return this.profileLoader.userProfile;
            },
            enumerable: true,
            configurable: true
        });
        UserProfileQuery.prototype.createPersonalSite = function (interactiveRequest) {
            if (interactiveRequest === void 0) { interactiveRequest = false; }
            return this.profileLoader.createPersonalSite(interactiveRequest);
        };
        UserProfileQuery.prototype.shareAllSocialData = function (share) {
            return this.profileLoader.shareAllSocialData(share);
        };
        return UserProfileQuery;
    }(queryable_1.QueryableInstance));
    exports.UserProfileQuery = UserProfileQuery;
    var ProfileLoader = (function (_super) {
        __extends(ProfileLoader, _super);
        function ProfileLoader(baseUrl, path) {
            if (path === void 0) { path = "_api/sp.userprofiles.profileloader.getprofileloader"; }
            _super.call(this, baseUrl, path);
        }
        ProfileLoader.prototype.createPersonalSiteEnqueueBulk = function (emails) {
            var q = new ProfileLoader(this, "createpersonalsiteenqueuebulk");
            var postBody = JSON.stringify({ "emailIDs": emails });
            return q.post({
                body: postBody,
            });
        };
        Object.defineProperty(ProfileLoader.prototype, "ownerUserProfile", {
            get: function () {
                var q = this.getParent(ProfileLoader, this.parentUrl, "sp.userprofiles.profileloader.getowneruserprofile");
                return q.postAs();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProfileLoader.prototype, "userProfile", {
            get: function () {
                var q = new ProfileLoader(this, "getuserprofile");
                return q.postAs();
            },
            enumerable: true,
            configurable: true
        });
        ProfileLoader.prototype.createPersonalSite = function (interactiveRequest) {
            if (interactiveRequest === void 0) { interactiveRequest = false; }
            var q = new ProfileLoader(this, "getuserprofile/createpersonalsiteenque(" + interactiveRequest + ")\",");
            return q.post();
        };
        ProfileLoader.prototype.shareAllSocialData = function (share) {
            var q = new ProfileLoader(this, "getuserprofile/shareallsocialdata(" + share + ")\",");
            return q.post();
        };
        return ProfileLoader;
    }(queryable_1.Queryable));
});

},{"../../utils/files":34,"./odata":18,"./queryable":19}],32:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable", "../../utils/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var util_1 = require("../../utils/util");
    var Views = (function (_super) {
        __extends(Views, _super);
        function Views(baseUrl) {
            _super.call(this, baseUrl, "views");
        }
        Views.prototype.getById = function (id) {
            var v = new View(this);
            v.concat("('" + id + "')");
            return v;
        };
        Views.prototype.getByTitle = function (title) {
            return new View(this, "getByTitle('" + title + "')");
        };
        Views.prototype.add = function (title, personalView, additionalSettings) {
            var _this = this;
            if (personalView === void 0) { personalView = false; }
            if (additionalSettings === void 0) { additionalSettings = {}; }
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": "SP.View" },
                "Title": title,
                "PersonalView": personalView
            }, additionalSettings));
            return this.postAs({ body: postBody }).then(function (data) {
                return {
                    view: _this.getById(data.Id),
                    data: data
                };
            });
        };
        return Views;
    }(queryable_1.QueryableCollection));
    exports.Views = Views;
    var View = (function (_super) {
        __extends(View, _super);
        function View(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(View.prototype, "fields", {
            get: function () {
                return new ViewFields(this);
            },
            enumerable: true,
            configurable: true
        });
        View.prototype.update = function (properties) {
            var _this = this;
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": "SP.View" },
            }, properties));
            return this.post({
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
        View.prototype.delete = function () {
            return this.post({
                headers: {
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        View.prototype.renderAsHtml = function () {
            var q = new queryable_1.Queryable(this, "renderashtml");
            return q.get();
        };
        return View;
    }(queryable_1.QueryableInstance));
    exports.View = View;
    var ViewFields = (function (_super) {
        __extends(ViewFields, _super);
        function ViewFields(baseUrl, path) {
            if (path === void 0) { path = "viewfields"; }
            _super.call(this, baseUrl, path);
        }
        ViewFields.prototype.getSchemaXml = function () {
            var q = new queryable_1.Queryable(this, "schemaxml");
            return q.get();
        };
        ViewFields.prototype.add = function (fieldTitleOrInternalName) {
            var q = new ViewFields(this, "addviewfield('" + fieldTitleOrInternalName + "')");
            return q.post();
        };
        ViewFields.prototype.move = function (fieldInternalName, index) {
            var q = new ViewFields(this, "moveviewfieldto");
            var postBody = JSON.stringify({ "field": fieldInternalName, "index": index });
            return q.post({ body: postBody });
        };
        ViewFields.prototype.removeAll = function () {
            var q = new ViewFields(this, "removeallviewfields");
            return q.post();
        };
        ViewFields.prototype.remove = function (fieldInternalName) {
            var q = new ViewFields(this, "removeviewfield('" + fieldInternalName + "')");
            return q.post();
        };
        return ViewFields;
    }(queryable_1.QueryableCollection));
    exports.ViewFields = ViewFields;
});

},{"../../utils/util":37,"./queryable":19}],33:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable", "./queryablesecurable", "./lists", "./navigation", "./sitegroups", "./contenttypes", "./folders", "./roles", "./files", "../../utils/util", "./lists", "./siteusers", "./usercustomactions"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var queryablesecurable_1 = require("./queryablesecurable");
    var lists_1 = require("./lists");
    var navigation_1 = require("./navigation");
    var sitegroups_1 = require("./sitegroups");
    var contenttypes_1 = require("./contenttypes");
    var folders_1 = require("./folders");
    var roles_1 = require("./roles");
    var files_1 = require("./files");
    var util_1 = require("../../utils/util");
    var lists_2 = require("./lists");
    var siteusers_1 = require("./siteusers");
    var usercustomactions_1 = require("./usercustomactions");
    var Webs = (function (_super) {
        __extends(Webs, _super);
        function Webs(baseUrl, webPath) {
            if (webPath === void 0) { webPath = "webs"; }
            _super.call(this, baseUrl, webPath);
        }
        Webs.prototype.add = function (title, url, description, template, language, inheritPermissions, additionalSettings) {
            var _this = this;
            if (description === void 0) { description = ""; }
            if (template === void 0) { template = "STS"; }
            if (language === void 0) { language = 1033; }
            if (inheritPermissions === void 0) { inheritPermissions = true; }
            if (additionalSettings === void 0) { additionalSettings = {}; }
            var props = util_1.Util.extend({
                Description: description,
                Language: language,
                Title: title,
                Url: url,
                UseSamePermissionsAsParentSite: inheritPermissions,
                WebTemplate: template,
            }, additionalSettings);
            var postBody = JSON.stringify({
                "parameters": util_1.Util.extend({
                    "__metadata": { "type": "SP.WebCreationInformation" },
                }, props),
            });
            var q = new Webs(this, "add");
            return q.post({ body: postBody }).then(function (data) {
                return {
                    data: data,
                    web: new Web(_this, props.Url),
                };
            });
        };
        return Webs;
    }(queryable_1.QueryableCollection));
    exports.Webs = Webs;
    var Web = (function (_super) {
        __extends(Web, _super);
        function Web(baseUrl, path) {
            if (path === void 0) { path = "_api/web"; }
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(Web.prototype, "webs", {
            get: function () {
                return new Webs(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Web.prototype, "contentTypes", {
            get: function () {
                return new contenttypes_1.ContentTypes(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Web.prototype, "lists", {
            get: function () {
                return new lists_1.Lists(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Web.prototype, "navigation", {
            get: function () {
                return new navigation_1.Navigation(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Web.prototype, "siteUsers", {
            get: function () {
                return new siteusers_1.SiteUsers(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Web.prototype, "siteGroups", {
            get: function () {
                return new sitegroups_1.SiteGroups(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Web.prototype, "folders", {
            get: function () {
                return new folders_1.Folders(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Web.prototype, "userCustomActions", {
            get: function () {
                return new usercustomactions_1.UserCustomActions(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Web.prototype, "roleDefinitions", {
            get: function () {
                return new roles_1.RoleDefinitions(this);
            },
            enumerable: true,
            configurable: true
        });
        Web.prototype.getFolderByServerRelativeUrl = function (folderRelativeUrl) {
            return new folders_1.Folder(this, "getFolderByServerRelativeUrl('" + folderRelativeUrl + "')");
        };
        Web.prototype.getFileByServerRelativeUrl = function (fileRelativeUrl) {
            return new files_1.File(this, "getFileByServerRelativeUrl('" + fileRelativeUrl + "')");
        };
        Web.prototype.update = function (properties) {
            var _this = this;
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": "SP.Web" },
            }, properties));
            return this.post({
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
        Web.prototype.delete = function () {
            return this.post({
                headers: {
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        Web.prototype.applyTheme = function (colorPaletteUrl, fontSchemeUrl, backgroundImageUrl, shareGenerated) {
            var postBody = JSON.stringify({
                backgroundImageUrl: backgroundImageUrl,
                colorPaletteUrl: colorPaletteUrl,
                fontSchemeUrl: fontSchemeUrl,
                shareGenerated: shareGenerated,
            });
            var q = new Web(this, "applytheme");
            return q.post({ body: postBody });
        };
        Web.prototype.applyWebTemplate = function (template) {
            var q = new Web(this, "applywebtemplate");
            q.concat("(@t)");
            q.query.add("@t", template);
            return q.post();
        };
        Web.prototype.doesUserHavePermissions = function (perms) {
            var q = new Web(this, "doesuserhavepermissions");
            q.concat("(@p)");
            q.query.add("@p", JSON.stringify(perms));
            return q.get();
        };
        Web.prototype.ensureUser = function (loginName) {
            var postBody = JSON.stringify({
                logonName: loginName,
            });
            var q = new Web(this, "ensureuser");
            return q.post({ body: postBody });
        };
        Web.prototype.availableWebTemplates = function (language, includeCrossLanugage) {
            if (language === void 0) { language = 1033; }
            if (includeCrossLanugage === void 0) { includeCrossLanugage = true; }
            return new queryable_1.QueryableCollection(this, "getavailablewebtemplates(lcid=" + language + ", doincludecrosslanguage=" + includeCrossLanugage + ")");
        };
        Web.prototype.getCatalog = function (type) {
            var q = new Web(this, "getcatalog(" + type + ")");
            q.select("Id");
            return q.get().then(function (data) {
                return new lists_2.List(data["odata.id"]);
            });
        };
        Web.prototype.getChanges = function (query) {
            var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeQuery" } }, query) });
            var q = new Web(this, "getchanges");
            return q.post({ body: postBody });
        };
        Object.defineProperty(Web.prototype, "customListTemplate", {
            get: function () {
                return new queryable_1.QueryableCollection(this, "getcustomlisttemplates");
            },
            enumerable: true,
            configurable: true
        });
        Web.prototype.getUserById = function (id) {
            return new siteusers_1.SiteUser(this, "getUserById(" + id + ")");
        };
        Web.prototype.mapToIcon = function (filename, size, progId) {
            if (size === void 0) { size = 0; }
            if (progId === void 0) { progId = ""; }
            var q = new Web(this, "maptoicon(filename='" + filename + "', progid='" + progId + "', size=" + size + ")");
            return q.get();
        };
        return Web;
    }(queryablesecurable_1.QueryableSecurable));
    exports.Web = Web;
});

},{"../../utils/util":37,"./contenttypes":11,"./files":13,"./folders":14,"./lists":16,"./navigation":17,"./queryable":19,"./queryablesecurable":20,"./roles":23,"./sitegroups":26,"./siteusers":27,"./usercustomactions":30}],34:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    function readBlobAsText(blob) {
        return readBlobAs(blob, "string");
    }
    exports.readBlobAsText = readBlobAsText;
    function readBlobAsArrayBuffer(blob) {
        return readBlobAs(blob, "buffer");
    }
    exports.readBlobAsArrayBuffer = readBlobAsArrayBuffer;
    function readBlobAs(blob, mode) {
        return new Promise(function (resolve, reject) {
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
        });
    }
});

},{}],35:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Logger = (function () {
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
        Logger.subscribe = function () {
            var listeners = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                listeners[_i - 0] = arguments[_i];
            }
            for (var i = 0; i < listeners.length; i++) {
                Logger.instance.subscribe(listeners[i]);
            }
        };
        Logger.clearSubscribers = function () {
            return Logger.instance.clearSubscribers();
        };
        Object.defineProperty(Logger, "count", {
            get: function () {
                return Logger.instance.count;
            },
            enumerable: true,
            configurable: true
        });
        Logger.write = function (message, level) {
            if (level === void 0) { level = Logger.LogLevel.Verbose; }
            Logger.instance.log({ level: level, message: message });
        };
        Logger.log = function (entry) {
            Logger.instance.log(entry);
        };
        Logger.measure = function (name, f) {
            return Logger.instance.measure(name, f);
        };
        return Logger;
    }());
    exports.Logger = Logger;
    var LoggerImpl = (function () {
        function LoggerImpl(activeLogLevel, subscribers) {
            if (activeLogLevel === void 0) { activeLogLevel = Logger.LogLevel.Warning; }
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
            if (level === void 0) { level = Logger.LogLevel.Verbose; }
            this.log({ level: level, message: message });
        };
        LoggerImpl.prototype.log = function (entry) {
            if (typeof entry === "undefined" || entry.level < this.activeLogLevel) {
                return;
            }
            for (var i = 0; i < this.subscribers.length; i++) {
                this.subscribers[i].log(entry);
            }
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
    var Logger;
    (function (Logger) {
        (function (LogLevel) {
            LogLevel[LogLevel["Verbose"] = 0] = "Verbose";
            LogLevel[LogLevel["Info"] = 1] = "Info";
            LogLevel[LogLevel["Warning"] = 2] = "Warning";
            LogLevel[LogLevel["Error"] = 3] = "Error";
            LogLevel[LogLevel["Off"] = 99] = "Off";
        })(Logger.LogLevel || (Logger.LogLevel = {}));
        var LogLevel = Logger.LogLevel;
        var ConsoleListener = (function () {
            function ConsoleListener() {
            }
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
            ConsoleListener.prototype.format = function (entry) {
                return "Message: " + entry.message + ". Data: " + JSON.stringify(entry.data);
            };
            return ConsoleListener;
        }());
        Logger.ConsoleListener = ConsoleListener;
        var AzureInsightsListener = (function () {
            function AzureInsightsListener(azureInsightsInstrumentationKey) {
                this.azureInsightsInstrumentationKey = azureInsightsInstrumentationKey;
                var appInsights = window["appInsights"] || function (config) {
                    function r(config) {
                        t[config] = function () {
                            var i = arguments;
                            t.queue.push(function () { t[config].apply(t, i); });
                        };
                    }
                    var t = { config: config }, u = document, e = window, o = "script", s = u.createElement(o), i, f;
                    for (s.src = config.url || "//az416426.vo.msecnd.net/scripts/a/ai.0.js", u.getElementsByTagName(o)[0].parentNode.appendChild(s), t.cookie = u.cookie, t.queue = [], i = ["Event", "Exception", "Metric", "PageView", "Trace"]; i.length;) {
                        r("track" + i.pop());
                    }
                    return r("setAuthenticatedUserContext"), r("clearAuthenticatedUserContext"), config.disableExceptionTracking || (i = "onerror", r("_" + i), f = e[i], e[i] = function (config, r, u, e, o) {
                        var s = f && f(config, r, u, e, o);
                        return s !== !0 && t["_" + i](config, r, u, e, o), s;
                    }), t;
                }({
                    instrumentationKey: this.azureInsightsInstrumentationKey
                });
                window["appInsights"] = appInsights;
            }
            AzureInsightsListener.prototype.log = function (entry) {
                var ai = window["appInsights"];
                var msg = this.format(entry);
                if (entry.level === LogLevel.Error) {
                    ai.trackException(msg);
                }
                else {
                    ai.trackEvent(msg);
                }
            };
            AzureInsightsListener.prototype.format = function (entry) {
                return "Message: " + entry.message + ". Data: " + JSON.stringify(entry.data);
            };
            return AzureInsightsListener;
        }());
        Logger.AzureInsightsListener = AzureInsightsListener;
        var FunctionListener = (function () {
            function FunctionListener(method) {
                this.method = method;
            }
            FunctionListener.prototype.log = function (entry) {
                this.method(entry);
            };
            return FunctionListener;
        }());
        Logger.FunctionListener = FunctionListener;
    })(Logger = exports.Logger || (exports.Logger = {}));
});

},{}],36:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require("./util");
    var PnPClientStorageWrapper = (function () {
        function PnPClientStorageWrapper(store, defaultTimeoutMinutes) {
            this.store = store;
            this.defaultTimeoutMinutes = defaultTimeoutMinutes;
            this.defaultTimeoutMinutes = (defaultTimeoutMinutes === void 0) ? 5 : defaultTimeoutMinutes;
            this.enabled = this.test();
        }
        PnPClientStorageWrapper.prototype.get = function (key) {
            if (!this.enabled) {
                return null;
            }
            var o = this.store.getItem(key);
            if (o == null) {
                return o;
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
        PnPClientStorageWrapper.prototype.put = function (key, o, expire) {
            if (this.enabled) {
                this.store.setItem(key, this.createPersistable(o, expire));
            }
        };
        PnPClientStorageWrapper.prototype.delete = function (key) {
            if (this.enabled) {
                this.store.removeItem(key);
            }
        };
        PnPClientStorageWrapper.prototype.getOrPut = function (key, getter, expire) {
            var _this = this;
            if (!this.enabled) {
                return getter();
            }
            if (!util_1.Util.isFunction(getter)) {
                throw "Function expected for parameter 'getter'.";
            }
            return new Promise(function (resolve, reject) {
                var o = _this.get(key);
                if (o == null) {
                    getter().then(function (d) {
                        _this.put(key, d);
                        resolve(d);
                    });
                }
                else {
                    resolve(o);
                }
            });
        };
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
        PnPClientStorageWrapper.prototype.createPersistable = function (o, expire) {
            if (typeof expire === "undefined") {
                expire = util_1.Util.dateAdd(new Date(), "minute", this.defaultTimeoutMinutes);
            }
            return JSON.stringify({ expiration: expire, value: o });
        };
        return PnPClientStorageWrapper;
    }());
    exports.PnPClientStorageWrapper = PnPClientStorageWrapper;
    var PnPClientStorage = (function () {
        function PnPClientStorage() {
            this.local = typeof localStorage !== "undefined" ? new PnPClientStorageWrapper(localStorage) : null;
            this.session = typeof sessionStorage !== "undefined" ? new PnPClientStorageWrapper(sessionStorage) : null;
        }
        return PnPClientStorage;
    }());
    exports.PnPClientStorage = PnPClientStorage;
});

},{"./util":37}],37:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Util = (function () {
        function Util() {
        }
        Util.getCtxCallback = function (context, method) {
            var params = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                params[_i - 2] = arguments[_i];
            }
            return function () {
                method.apply(context, params);
            };
        };
        Util.urlParamExists = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            return regex.test(location.search);
        };
        Util.getUrlParamByName = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            var results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };
        Util.getUrlParamBoolByName = function (name) {
            var p = this.getUrlParamByName(name);
            var isFalse = (p === "" || /false|0/i.test(p));
            return !isFalse;
        };
        Util.stringInsert = function (target, index, s) {
            if (index > 0) {
                return target.substring(0, index) + s + target.substring(index, target.length);
            }
            return s + target;
        };
        Util.dateAdd = function (date, interval, units) {
            var ret = new Date(date.toLocaleString());
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
        Util.combinePaths = function () {
            var paths = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                paths[_i - 0] = arguments[_i];
            }
            var parts = [];
            for (var i = 0; i < paths.length; i++) {
                if (typeof paths[i] !== "undefined" && paths[i] !== null) {
                    parts.push(paths[i].replace(/^[\\|\/]/, "").replace(/[\\|\/]$/, ""));
                }
            }
            return parts.join("/").replace(/\\/, "/");
        };
        Util.getRandomString = function (chars) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < chars; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
        Util.getGUID = function () {
            var d = new Date().getTime();
            var guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return guid;
        };
        Util.isFunction = function (candidateFunction) {
            return typeof candidateFunction === "function";
        };
        Util.isArray = function (array) {
            if (Array.isArray) {
                return Array.isArray(array);
            }
            return array && typeof array.length === "number" && array.constructor === Array;
        };
        Util.stringIsNullOrEmpty = function (s) {
            return typeof s === "undefined" || s === null || s === "";
        };
        Util.extend = function (target, source, noOverwrite) {
            if (noOverwrite === void 0) { noOverwrite = false; }
            var result = {};
            for (var id in target) {
                result[id] = target[id];
            }
            var check = noOverwrite ? function (o, i) { return !o.hasOwnProperty(i); } : function (o, i) { return true; };
            for (var id in source) {
                if (check(result, id)) {
                    result[id] = source[id];
                }
            }
            return result;
        };
        Util.applyMixins = function (derivedCtor) {
            var baseCtors = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                baseCtors[_i - 1] = arguments[_i];
            }
            baseCtors.forEach(function (baseCtor) {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                });
            });
        };
        Util.isUrlAbsolute = function (url) {
            return /^https?:\/\/|^\/\//i.test(url);
        };
        return Util;
    }());
    exports.Util = Util;
});

},{}]},{},[10])(10)
});


//# sourceMappingURL=pnp.js.map
