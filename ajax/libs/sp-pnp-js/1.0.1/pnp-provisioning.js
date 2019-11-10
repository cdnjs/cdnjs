/**
 * sp-pnp-js v1.0.0 - A reusable JavaScript library targeting SharePoint client-side development.
 * Copyright (c) 2016 Microsoft
 * MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.$pnp || (g.$pnp = {})).Provisioning = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../utils/util":21}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"../configuration/pnplibconfig":2,"../utils/util":21,"./digestCache":4,"./fetchClient":5}],4:[function(require,module,exports){
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

},{"../collections/collections":1,"../sharepoint/rest/odata":19,"../utils/util":21}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
        define(["require", "exports", "../util", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require("../util");
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectComposedLook = (function (_super) {
        __extends(ObjectComposedLook, _super);
        function ObjectComposedLook() {
            _super.call(this, "ComposedLook");
        }
        ObjectComposedLook.prototype.ProvisionObjects = function (object) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var web = clientContext.get_web();
                var colorPaletteUrl = object.ColorPaletteUrl ? util_1.Util.replaceUrlTokens(object.ColorPaletteUrl) : "";
                var fontSchemeUrl = object.FontSchemeUrl ? util_1.Util.replaceUrlTokens(object.FontSchemeUrl) : "";
                var backgroundImageUrl = object.BackgroundImageUrl ? util_1.Util.replaceUrlTokens(object.BackgroundImageUrl) : null;
                web.applyTheme(util_1.Util.getRelativeUrl(colorPaletteUrl), util_1.Util.getRelativeUrl(fontSchemeUrl), backgroundImageUrl, true);
                web.update();
                clientContext.executeQueryAsync(function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                }, function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                });
            });
        };
        return ObjectComposedLook;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectComposedLook = ObjectComposedLook;
});

},{"../util":18,"./ObjectHandlerBase":10}],7:[function(require,module,exports){
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
        define(["require", "exports", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectCustomActions = (function (_super) {
        __extends(ObjectCustomActions, _super);
        function ObjectCustomActions() {
            _super.call(this, "CustomActions");
        }
        ObjectCustomActions.prototype.ProvisionObjects = function (customactions) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var userCustomActions = clientContext.get_web().get_userCustomActions();
                clientContext.load(userCustomActions);
                clientContext.executeQueryAsync(function () {
                    customactions.forEach(function (obj) {
                        var objExists = userCustomActions.get_data().filter(function (userCustomAction) {
                            return userCustomAction.get_title() === obj.Title;
                        }).length > 0;
                        if (!objExists) {
                            var objCreationInformation = userCustomActions.add();
                            if (obj.Description) {
                                objCreationInformation.set_description(obj.Description);
                            }
                            if (obj.CommandUIExtension) {
                                objCreationInformation.set_commandUIExtension(obj.CommandUIExtension);
                            }
                            if (obj.Group) {
                                objCreationInformation.set_group(obj.Group);
                            }
                            if (obj.Title) {
                                objCreationInformation.set_title(obj.Title);
                            }
                            if (obj.Url) {
                                objCreationInformation.set_url(obj.Url);
                            }
                            if (obj.ScriptBlock) {
                                objCreationInformation.set_scriptBlock(obj.ScriptBlock);
                            }
                            if (obj.ScriptSrc) {
                                objCreationInformation.set_scriptSrc(obj.ScriptSrc);
                            }
                            if (obj.Location) {
                                objCreationInformation.set_location(obj.Location);
                            }
                            if (obj.ImageUrl) {
                                objCreationInformation.set_imageUrl(obj.ImageUrl);
                            }
                            if (obj.Name) {
                                objCreationInformation.set_name(obj.Name);
                            }
                            if (obj.RegistrationId) {
                                objCreationInformation.set_registrationId(obj.RegistrationId);
                            }
                            if (obj.RegistrationType) {
                                objCreationInformation.set_registrationType(obj.RegistrationType);
                            }
                            if (obj.Rights) {
                                objCreationInformation.set_rights(obj.Rights);
                            }
                            if (obj.Sequence) {
                                objCreationInformation.set_sequence(obj.Sequence);
                            }
                            objCreationInformation.update();
                        }
                    });
                    clientContext.executeQueryAsync(function () {
                        _super.prototype.scope_ended.call(_this);
                        resolve();
                    }, function () {
                        _super.prototype.scope_ended.call(_this);
                        resolve();
                    });
                }, function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                });
            });
        };
        return ObjectCustomActions;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectCustomActions = ObjectCustomActions;
});

},{"./ObjectHandlerBase":10}],8:[function(require,module,exports){
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
        define(["require", "exports", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectFeatures = (function (_super) {
        __extends(ObjectFeatures, _super);
        function ObjectFeatures() {
            _super.call(this, "Features");
        }
        ObjectFeatures.prototype.ProvisionObjects = function (features) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var web = clientContext.get_web();
                var webFeatures = web.get_features();
                features.forEach(function (f) {
                    if (f.Deactivate === true) {
                        webFeatures.remove(new SP.Guid(f.ID), true);
                    }
                    else {
                        webFeatures.add(new SP.Guid(f.ID), true, SP.FeatureDefinitionScope.none);
                    }
                });
                web.update();
                clientContext.load(webFeatures);
                clientContext.executeQueryAsync(function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                }, function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                });
            });
        };
        return ObjectFeatures;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectFeatures = ObjectFeatures;
});

},{"./ObjectHandlerBase":10}],9:[function(require,module,exports){
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
        define(["require", "exports", "../../../utils/util", "../util", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var CoreUtil = require("../../../utils/util");
    var util_1 = require("../util");
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectFiles = (function (_super) {
        __extends(ObjectFiles, _super);
        function ObjectFiles() {
            _super.call(this, "Files");
        }
        ObjectFiles.prototype.ProvisionObjects = function (objects) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var web = clientContext.get_web();
                var fileInfos = [];
                var promises = [];
                objects.forEach(function (obj, index) {
                    promises.push(_this.httpClient.fetchRaw(util_1.Util.replaceUrlTokens(obj.Src)).then(function (response) {
                        return response.text();
                    }));
                });
                Promise.all(promises).then(function (responses) {
                    responses.forEach(function (response, index) {
                        var obj = objects[index];
                        var filename = _this.GetFilenameFromFilePath(obj.Dest);
                        var webServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl;
                        var folder = web.getFolderByServerRelativeUrl(webServerRelativeUrl + "/" + _this.GetFolderFromFilePath(obj.Dest));
                        var fi = {
                            Contents: response,
                            Dest: obj.Dest,
                            Filename: filename,
                            Folder: folder,
                            Instance: null,
                            Overwrite: false,
                            Properties: [],
                            RemoveExistingWebParts: true,
                            ServerRelativeUrl: obj.Dest,
                            Src: obj.Src,
                            Views: [],
                            WebParts: [],
                        };
                        CoreUtil.Util.extend(fi, obj);
                        if (fi.Filename.indexOf("Form.aspx") !== -1) {
                            return;
                        }
                        var objCreationInformation = new SP.FileCreationInformation();
                        objCreationInformation.set_overwrite(fi.Overwrite);
                        objCreationInformation.set_url(fi.Filename);
                        objCreationInformation.set_content(new SP.Base64EncodedByteArray());
                        for (var i = 0; i < fi.Contents.length; i++) {
                            objCreationInformation.get_content().append(fi.Contents.charCodeAt(i));
                        }
                        clientContext.load(fi.Folder.get_files().add(objCreationInformation));
                        fileInfos.push(fi);
                    });
                });
                clientContext.executeQueryAsync(function () {
                    promises = [];
                    fileInfos.forEach(function (fi) {
                        if (fi.Properties && Object.keys(fi.Properties).length > 0) {
                            promises.push(_this.ApplyFileProperties(fi.Dest, fi.Properties));
                        }
                        if (fi.WebParts && fi.WebParts.length > 0) {
                            promises.push(_this.AddWebPartsToWebPartPage(fi.Dest, fi.Src, fi.WebParts, fi.RemoveExistingWebParts));
                        }
                    });
                    Promise.all(promises).then(function () {
                        _this.ModifyHiddenViews(objects).then(function (value) {
                            _super.prototype.scope_ended.call(_this);
                            resolve(value);
                        }, function (error) {
                            _super.prototype.scope_ended.call(_this);
                            reject(error);
                        });
                    });
                }, function (error) {
                    _super.prototype.scope_ended.call(_this);
                    reject(error);
                });
            });
        };
        ObjectFiles.prototype.RemoveWebPartsFromFileIfSpecified = function (clientContext, limitedWebPartManager, shouldRemoveExisting) {
            return new Promise(function (resolve, reject) {
                if (!shouldRemoveExisting) {
                    resolve();
                }
                var existingWebParts = limitedWebPartManager.get_webParts();
                clientContext.load(existingWebParts);
                clientContext.executeQueryAsync(function () {
                    existingWebParts.get_data().forEach(function (wp) {
                        wp.deleteWebPart();
                    });
                    clientContext.load(existingWebParts);
                    clientContext.executeQueryAsync(resolve, reject);
                }, reject);
            });
        };
        ObjectFiles.prototype.GetWebPartXml = function (webParts) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var promises = [];
                webParts.forEach(function (wp, index) {
                    if (wp.Contents.FileUrl) {
                        var fileUrl = util_1.Util.replaceUrlTokens(wp.Contents.FileUrl);
                        promises.push(_this.httpClient.fetchRaw(fileUrl).then(function (response) {
                            return response.text();
                        }));
                    }
                    else {
                        promises.push((function () {
                            return new Promise(function (res, rej) {
                                res();
                            });
                        })());
                    }
                });
                Promise.all(promises).then(function (responses) {
                    responses.forEach(function (response, index) {
                        var wp = webParts[index];
                        if (wp !== null && response && response.length > 0) {
                            wp.Contents.Xml = response;
                        }
                    });
                    resolve(webParts);
                });
            });
        };
        ObjectFiles.prototype.AddWebPartsToWebPartPage = function (dest, src, webParts, shouldRemoveExisting) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var web = clientContext.get_web();
                var fileServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + dest;
                var file = web.getFileByServerRelativeUrl(fileServerRelativeUrl);
                clientContext.load(file);
                clientContext.executeQueryAsync(function () {
                    var limitedWebPartManager = file.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
                    _this.RemoveWebPartsFromFileIfSpecified(clientContext, limitedWebPartManager, shouldRemoveExisting).then(function () {
                        _this.GetWebPartXml(webParts).then(function (webPartsWithXml) {
                            webPartsWithXml.forEach(function (wp) {
                                if (!wp.Contents.Xml) {
                                    return;
                                }
                                var oWebPartDefinition = limitedWebPartManager.importWebPart(util_1.Util.replaceUrlTokens(wp.Contents.Xml));
                                var oWebPart = oWebPartDefinition.get_webPart();
                                limitedWebPartManager.addWebPart(oWebPart, wp.Zone, wp.Order);
                            });
                            clientContext.executeQueryAsync(resolve, resolve);
                        });
                    });
                }, resolve);
            });
        };
        ObjectFiles.prototype.ApplyFileProperties = function (dest, fileProperties) {
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var web = clientContext.get_web();
                var fileServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + dest;
                var file = web.getFileByServerRelativeUrl(fileServerRelativeUrl);
                var listItemAllFields = file.get_listItemAllFields();
                Object.keys(fileProperties).forEach(function (key) {
                    listItemAllFields.set_item(key, fileProperties[key]);
                });
                listItemAllFields.update();
                clientContext.executeQueryAsync(resolve, resolve);
            });
        };
        ObjectFiles.prototype.GetViewFromCollectionByUrl = function (viewCollection, url) {
            var serverRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + url;
            var viewCollectionEnumerator = viewCollection.getEnumerator();
            while (viewCollectionEnumerator.moveNext()) {
                var view = viewCollectionEnumerator.get_current();
                if (view.get_serverRelativeUrl().toString().toLowerCase() === serverRelativeUrl.toLowerCase()) {
                    return view;
                }
            }
            return null;
        };
        ObjectFiles.prototype.ModifyHiddenViews = function (objects) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var web = clientContext.get_web();
                var mapping = {};
                var lists = [];
                var listViewCollections = [];
                objects.forEach(function (obj) {
                    if (!obj.Views) {
                        return;
                    }
                    obj.Views.forEach(function (v) {
                        mapping[v.List] = mapping[v.List] || [];
                        mapping[v.List].push(CoreUtil.Util.extend(v, { "Url": obj.Dest }));
                    });
                });
                Object.keys(mapping).forEach(function (l, index) {
                    lists.push(web.get_lists().getByTitle(l));
                    listViewCollections.push(web.get_lists().getByTitle(l).get_views());
                    clientContext.load(lists[index]);
                    clientContext.load(listViewCollections[index]);
                });
                clientContext.executeQueryAsync(function () {
                    Object.keys(mapping).forEach(function (l, index) {
                        var views = mapping[l];
                        var list = lists[index];
                        var viewCollection = listViewCollections[index];
                        views.forEach(function (v) {
                            var view = _this.GetViewFromCollectionByUrl(viewCollection, v.Url);
                            if (view == null) {
                                return;
                            }
                            if (v.Paged) {
                                view.set_paged(v.Paged);
                            }
                            if (v.Query) {
                                view.set_viewQuery(v.Query);
                            }
                            if (v.RowLimit) {
                                view.set_rowLimit(v.RowLimit);
                            }
                            if (v.ViewFields && v.ViewFields.length > 0) {
                                var columns_1 = view.get_viewFields();
                                columns_1.removeAll();
                                v.ViewFields.forEach(function (vf) {
                                    columns_1.add(vf);
                                });
                            }
                            view.update();
                        });
                        clientContext.load(viewCollection);
                        list.update();
                    });
                    clientContext.executeQueryAsync(resolve, resolve);
                }, resolve);
            });
        };
        ObjectFiles.prototype.GetFolderFromFilePath = function (filePath) {
            var split = filePath.split("/");
            return split.splice(0, split.length - 1).join("/");
        };
        ObjectFiles.prototype.GetFilenameFromFilePath = function (filePath) {
            var split = filePath.split("/");
            return split[split.length - 1];
        };
        return ObjectFiles;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectFiles = ObjectFiles;
    ;
});

},{"../../../utils/util":21,"../util":18,"./ObjectHandlerBase":10}],10:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../../../net/HttpClient", "../../../utils/logging"], factory);
    }
})(function (require, exports) {
    "use strict";
    var HttpClient_1 = require("../../../net/HttpClient");
    var logging_1 = require("../../../utils/logging");
    var ObjectHandlerBase = (function () {
        function ObjectHandlerBase(name) {
            this.name = name;
            this.httpClient = new HttpClient_1.HttpClient();
        }
        ObjectHandlerBase.prototype.ProvisionObjects = function (objects, parameters) {
            return new Promise(function (resolve, reject) { resolve("Not implemented."); });
        };
        ObjectHandlerBase.prototype.scope_started = function () {
            logging_1.Logger.write(this.name + ": Code execution scope started");
        };
        ObjectHandlerBase.prototype.scope_ended = function () {
            logging_1.Logger.write(this.name + ": Code execution scope stopped");
        };
        return ObjectHandlerBase;
    }());
    exports.ObjectHandlerBase = ObjectHandlerBase;
});

},{"../../../net/HttpClient":3,"../../../utils/logging":20}],11:[function(require,module,exports){
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
        define(["require", "exports", "../Sequencer/Sequencer", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Sequencer_1 = require("../Sequencer/Sequencer");
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectLists = (function (_super) {
        __extends(ObjectLists, _super);
        function ObjectLists() {
            _super.call(this, "Lists");
        }
        ObjectLists.prototype.ProvisionObjects = function (objects) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var lists = clientContext.get_web().get_lists();
                var listInstances = [];
                clientContext.load(lists);
                clientContext.executeQueryAsync(function () {
                    objects.forEach(function (obj, index) {
                        var existingObj = lists.get_data().filter(function (list) {
                            return list.get_title() === obj.Title;
                        })[0];
                        if (existingObj) {
                            if (obj.Description) {
                                existingObj.set_description(obj.Description);
                            }
                            if (obj.EnableVersioning !== undefined) {
                                existingObj.set_enableVersioning(obj.EnableVersioning);
                            }
                            if (obj.EnableMinorVersions !== undefined) {
                                existingObj.set_enableMinorVersions(obj.EnableMinorVersions);
                            }
                            if (obj.EnableModeration !== undefined) {
                                existingObj.set_enableModeration(obj.EnableModeration);
                            }
                            if (obj.EnableFolderCreation !== undefined) {
                                existingObj.set_enableFolderCreation(obj.EnableFolderCreation);
                            }
                            if (obj.EnableAttachments !== undefined) {
                                existingObj.set_enableAttachments(obj.EnableAttachments);
                            }
                            if (obj.NoCrawl !== undefined) {
                                existingObj.set_noCrawl(obj.NoCrawl);
                            }
                            if (obj.DefaultDisplayFormUrl) {
                                existingObj.set_defaultDisplayFormUrl(obj.DefaultDisplayFormUrl);
                            }
                            if (obj.DefaultEditFormUrl) {
                                existingObj.set_defaultEditFormUrl(obj.DefaultEditFormUrl);
                            }
                            if (obj.DefaultNewFormUrl) {
                                existingObj.set_defaultNewFormUrl(obj.DefaultNewFormUrl);
                            }
                            if (obj.DraftVersionVisibility) {
                                existingObj.set_draftVersionVisibility(SP.DraftVisibilityType[obj.DraftVersionVisibility]);
                            }
                            if (obj.ImageUrl) {
                                existingObj.set_imageUrl(obj.ImageUrl);
                            }
                            if (obj.Hidden !== undefined) {
                                existingObj.set_hidden(obj.Hidden);
                            }
                            if (obj.ForceCheckout !== undefined) {
                                existingObj.set_forceCheckout(obj.ForceCheckout);
                            }
                            existingObj.update();
                            listInstances.push(existingObj);
                            clientContext.load(listInstances[index]);
                        }
                        else {
                            var objCreationInformation = new SP.ListCreationInformation();
                            if (obj.Description) {
                                objCreationInformation.set_description(obj.Description);
                            }
                            if (obj.OnQuickLaunch !== undefined) {
                                var value = obj.OnQuickLaunch ? SP.QuickLaunchOptions.on : SP.QuickLaunchOptions.off;
                                objCreationInformation.set_quickLaunchOption(value);
                            }
                            if (obj.TemplateType) {
                                objCreationInformation.set_templateType(obj.TemplateType);
                            }
                            if (obj.Title) {
                                objCreationInformation.set_title(obj.Title);
                            }
                            if (obj.Url) {
                                objCreationInformation.set_url(obj.Url);
                            }
                            var createdList = lists.add(objCreationInformation);
                            if (obj.EnableVersioning !== undefined) {
                                createdList.set_enableVersioning(obj.EnableVersioning);
                            }
                            if (obj.EnableMinorVersions !== undefined) {
                                createdList.set_enableMinorVersions(obj.EnableMinorVersions);
                            }
                            if (obj.EnableModeration !== undefined) {
                                createdList.set_enableModeration(obj.EnableModeration);
                            }
                            if (obj.EnableFolderCreation !== undefined) {
                                createdList.set_enableFolderCreation(obj.EnableFolderCreation);
                            }
                            if (obj.EnableAttachments !== undefined) {
                                createdList.set_enableAttachments(obj.EnableAttachments);
                            }
                            if (obj.NoCrawl !== undefined) {
                                createdList.set_noCrawl(obj.NoCrawl);
                            }
                            if (obj.DefaultDisplayFormUrl) {
                                createdList.set_defaultDisplayFormUrl(obj.DefaultDisplayFormUrl);
                            }
                            if (obj.DefaultEditFormUrl) {
                                createdList.set_defaultEditFormUrl(obj.DefaultEditFormUrl);
                            }
                            if (obj.DefaultNewFormUrl) {
                                createdList.set_defaultNewFormUrl(obj.DefaultNewFormUrl);
                            }
                            if (obj.DraftVersionVisibility) {
                                var value = SP.DraftVisibilityType[obj.DraftVersionVisibility.toLocaleLowerCase()];
                                createdList.set_draftVersionVisibility(value);
                            }
                            if (obj.ImageUrl) {
                                createdList.set_imageUrl(obj.ImageUrl);
                            }
                            if (obj.Hidden !== undefined) {
                                createdList.set_hidden(obj.Hidden);
                            }
                            if (obj.ForceCheckout !== undefined) {
                                createdList.set_forceCheckout(obj.ForceCheckout);
                            }
                            listInstances.push(createdList);
                            clientContext.load(listInstances[index]);
                        }
                    });
                    clientContext.executeQueryAsync(function () {
                        var sequencer = new Sequencer_1.Sequencer([
                            _this.ApplyContentTypeBindings,
                            _this.ApplyListInstanceFieldRefs,
                            _this.ApplyFields,
                            _this.ApplyLookupFields,
                            _this.ApplyListSecurity,
                            _this.CreateViews,
                            _this.InsertDataRows,
                            _this.CreateFolders,
                        ], { ClientContext: clientContext, ListInstances: listInstances, Objects: objects }, _this);
                        sequencer.execute().then(function () {
                            _super.prototype.scope_ended.call(_this);
                            resolve();
                        });
                    }, function () {
                        _super.prototype.scope_ended.call(_this);
                        resolve();
                    });
                }, function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                });
            });
        };
        ObjectLists.prototype.EnsureLocationBasedMetadataDefaultsReceiver = function (clientContext, list) {
            var eventReceivers = list.get_eventReceivers();
            var eventRecCreationInfo = new SP.EventReceiverDefinitionCreationInformation();
            eventRecCreationInfo.set_receiverName("LocationBasedMetadataDefaultsReceiver ItemAdded");
            eventRecCreationInfo.set_synchronization(1);
            eventRecCreationInfo.set_sequenceNumber(1000);
            eventRecCreationInfo.set_receiverAssembly("Microsoft.Office.DocumentManagement, Version=15.0.0.0, Culture=neutral, " +
                "PublicKeyToken=71e9bce111e9429c");
            eventRecCreationInfo.set_receiverClass("Microsoft.Office.DocumentManagement.LocationBasedMetadataDefaultsReceiver");
            eventRecCreationInfo.set_eventType(SP.EventReceiverType.itemAdded);
            eventReceivers.add(eventRecCreationInfo);
            list.update();
        };
        ObjectLists.prototype.CreateFolders = function (params) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                params.ListInstances.forEach(function (l, index) {
                    var obj = params.Objects[index];
                    if (!obj.Folders) {
                        return;
                    }
                    var folderServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + obj.Url;
                    var rootFolder = l.get_rootFolder();
                    var metadataDefaults = "<MetadataDefaults>";
                    var setMetadataDefaults = false;
                    obj.Folders.forEach(function (f) {
                        var folderUrl = folderServerRelativeUrl + "/" + f.Name;
                        rootFolder.get_folders().add(folderUrl);
                        if (f.DefaultValues) {
                            var keys = Object.keys(f.DefaultValues).length;
                            if (keys > 0) {
                                metadataDefaults += "<a href='" + folderUrl + "'>";
                                Object.keys(f.DefaultValues).forEach(function (key) {
                                    metadataDefaults += "<DefaultValue FieldName=\"" + key + "\">" + f.DefaultValues[key] + "</DefaultValue>";
                                });
                                metadataDefaults += "</a>";
                            }
                            setMetadataDefaults = true;
                        }
                    });
                    metadataDefaults += "</MetadataDefaults>";
                    if (setMetadataDefaults) {
                        var metadataDefaultsFileCreateInfo = new SP.FileCreationInformation();
                        metadataDefaultsFileCreateInfo.set_url(folderServerRelativeUrl + "/Forms/client_LocationBasedDefaults.html");
                        metadataDefaultsFileCreateInfo.set_content(new SP.Base64EncodedByteArray());
                        metadataDefaultsFileCreateInfo.set_overwrite(true);
                        for (var i = 0; i < metadataDefaults.length; i++) {
                            metadataDefaultsFileCreateInfo.get_content().append(metadataDefaults.charCodeAt(i));
                        }
                        rootFolder.get_files().add(metadataDefaultsFileCreateInfo);
                        _this.EnsureLocationBasedMetadataDefaultsReceiver(params.ClientContext, l);
                    }
                });
                params.ClientContext.executeQueryAsync(resolve, resolve);
            });
        };
        ObjectLists.prototype.ApplyContentTypeBindings = function (params) {
            return new Promise(function (resolve, reject) {
                var webCts = params.ClientContext.get_site().get_rootWeb().get_contentTypes();
                var listCts = [];
                params.ListInstances.forEach(function (l, index) {
                    listCts.push(l.get_contentTypes());
                    params.ClientContext.load(listCts[index], "Include(Name,Id)");
                    if (params.Objects[index].ContentTypeBindings) {
                        l.set_contentTypesEnabled(true);
                        l.update();
                    }
                });
                params.ClientContext.load(webCts);
                params.ClientContext.executeQueryAsync(function () {
                    params.ListInstances.forEach(function (list, index) {
                        var obj = params.Objects[index];
                        if (!obj.ContentTypeBindings) {
                            return;
                        }
                        var listContentTypes = listCts[index];
                        var existingContentTypes = new Array();
                        if (obj.RemoveExistingContentTypes && obj.ContentTypeBindings.length > 0) {
                            listContentTypes.get_data().forEach(function (ct) {
                                existingContentTypes.push(ct);
                            });
                        }
                        obj.ContentTypeBindings.forEach(function (ctb) {
                            listContentTypes.addExistingContentType(webCts.getById(ctb.ContentTypeId));
                        });
                        if (obj.RemoveExistingContentTypes && obj.ContentTypeBindings.length > 0) {
                            for (var j = 0; j < existingContentTypes.length; j++) {
                                var ect = existingContentTypes[j];
                                ect.deleteObject();
                            }
                        }
                        list.update();
                    });
                    params.ClientContext.executeQueryAsync(resolve, resolve);
                }, resolve);
            });
        };
        ObjectLists.prototype.ApplyListInstanceFieldRefs = function (params) {
            return new Promise(function (resolve, reject) {
                var siteFields = params.ClientContext.get_site().get_rootWeb().get_fields();
                params.ListInstances.forEach(function (l, index) {
                    var obj = params.Objects[index];
                    if (obj.FieldRefs) {
                        obj.FieldRefs.forEach(function (fr) {
                            var field = siteFields.getByInternalNameOrTitle(fr.Name);
                            l.get_fields().add(field);
                        });
                        l.update();
                    }
                });
                params.ClientContext.executeQueryAsync(resolve, resolve);
            });
        };
        ObjectLists.prototype.ApplyFields = function (params) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                params.ListInstances.forEach(function (l, index) {
                    var obj = params.Objects[index];
                    if (obj.Fields) {
                        obj.Fields.forEach(function (f) {
                            var fieldXml = _this.GetFieldXml(f, params.ListInstances, l);
                            var fieldType = _this.GetFieldXmlAttr(fieldXml, "Type");
                            if (fieldType !== "Lookup" && fieldType !== "LookupMulti") {
                                l.get_fields().addFieldAsXml(fieldXml, true, SP.AddFieldOptions.addToAllContentTypes);
                            }
                        });
                        l.update();
                    }
                });
                params.ClientContext.executeQueryAsync(resolve, resolve);
            });
        };
        ObjectLists.prototype.ApplyLookupFields = function (params) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                params.ListInstances.forEach(function (l, index) {
                    var obj = params.Objects[index];
                    if (obj.Fields) {
                        obj.Fields.forEach(function (f) {
                            var fieldXml = _this.GetFieldXml(f, params.ListInstances, l);
                            if (!fieldXml) {
                                return;
                            }
                            var fieldType = _this.GetFieldXmlAttr(fieldXml, "Type");
                            if (fieldType === "Lookup" || fieldType === "LookupMulti") {
                                l.get_fields().addFieldAsXml(fieldXml, true, SP.AddFieldOptions.addToAllContentTypes);
                            }
                        });
                        l.update();
                    }
                });
                params.ClientContext.executeQueryAsync(resolve, resolve);
            });
        };
        ObjectLists.prototype.GetFieldXmlAttr = function (fieldXml, attr) {
            var regex = new RegExp(attr + '=[\'|\"](?:(.+?))[\'|\"]');
            var match = regex.exec(fieldXml);
            return match[1];
        };
        ObjectLists.prototype.GetFieldXml = function (field, lists, list) {
            var fieldXml = "";
            if (!field.SchemaXml) {
                var properties_1 = [];
                Object.keys(field).forEach(function (prop) {
                    var value = field[prop];
                    if (prop === "List") {
                        var targetList = lists.filter(function (v) {
                            return v.get_title() === value;
                        });
                        if (targetList.length > 0) {
                            value = "{" + targetList[0].get_id().toString() + "}";
                        }
                        else {
                            return null;
                        }
                        properties_1.push(prop + "=\"" + value + "\"");
                    }
                });
                fieldXml = "<Field " + properties_1.join(" ") + ">";
                if (field.Type === "Calculated") {
                    fieldXml += "<Formula>" + field.Formula + "</Formula>";
                }
                fieldXml += "</Field>";
            }
            return fieldXml;
        };
        ObjectLists.prototype.ApplyListSecurity = function (params) {
            return new Promise(function (resolve, reject) {
                params.ListInstances.forEach(function (l, index) {
                    var obj = params.Objects[index];
                    if (!obj.Security) {
                        return;
                    }
                    if (obj.Security.BreakRoleInheritance) {
                        l.breakRoleInheritance(obj.Security.CopyRoleAssignments, obj.Security.ClearSubscopes);
                        l.update();
                        params.ClientContext.load(l.get_roleAssignments());
                    }
                });
                var web = params.ClientContext.get_web();
                var allProperties = web.get_allProperties();
                var siteGroups = web.get_siteGroups();
                var roleDefinitions = web.get_roleDefinitions();
                params.ClientContext.load(allProperties);
                params.ClientContext.load(roleDefinitions);
                params.ClientContext.executeQueryAsync(function () {
                    params.ListInstances.forEach(function (l, index) {
                        var obj = params.Objects[index];
                        if (!obj.Security) {
                            return;
                        }
                        obj.Security.RoleAssignments.forEach(function (ra) {
                            var roleDef = null;
                            if (typeof ra.RoleDefinition === "number") {
                                roleDef = roleDefinitions.getById(ra.RoleDefinition);
                            }
                            else {
                                roleDef = roleDefinitions.getByName(ra.RoleDefinition);
                            }
                            var roleBindings = SP.RoleDefinitionBindingCollection.newObject(params.ClientContext);
                            roleBindings.add(roleDef);
                            var principal = null;
                            if (ra.Principal.match(/\{[A-Za-z]*\}+/g)) {
                                var token = ra.Principal.substring(1, ra.Principal.length - 1);
                                var groupId = allProperties.get_fieldValues()[("vti_" + token)];
                                principal = siteGroups.getById(groupId);
                            }
                            else {
                                principal = siteGroups.getByName(principal);
                            }
                            l.get_roleAssignments().add(principal, roleBindings);
                        });
                        l.update();
                    });
                    params.ClientContext.executeQueryAsync(resolve, resolve);
                }, resolve);
            });
        };
        ObjectLists.prototype.CreateViews = function (params) {
            return new Promise(function (resolve, reject) {
                var listViewCollections = [];
                params.ListInstances.forEach(function (l, index) {
                    listViewCollections.push(l.get_views());
                    params.ClientContext.load(listViewCollections[index]);
                });
                params.ClientContext.executeQueryAsync(function () {
                    params.ListInstances.forEach(function (l, index) {
                        var obj = params.Objects[index];
                        if (!obj.Views) {
                            return;
                        }
                        listViewCollections.push(l.get_views());
                        params.ClientContext.load(listViewCollections[index]);
                        obj.Views.forEach(function (v) {
                            var viewExists = listViewCollections[index].get_data().filter(function (ev) {
                                if (obj.RemoveExistingViews && obj.Views.length > 0) {
                                    ev.deleteObject();
                                    return false;
                                }
                                return ev.get_title() === v.Title;
                            }).length > 0;
                            if (viewExists) {
                                var view = listViewCollections[index].getByTitle(v.Title);
                                if (v.Paged) {
                                    view.set_paged(v.Paged);
                                }
                                if (v.Query) {
                                    view.set_viewQuery(v.Query);
                                }
                                if (v.RowLimit) {
                                    view.set_rowLimit(v.RowLimit);
                                }
                                if (v.ViewFields && v.ViewFields.length > 0) {
                                    var columns_1 = view.get_viewFields();
                                    columns_1.removeAll();
                                    v.ViewFields.forEach(function (vf) {
                                        columns_1.add(vf);
                                    });
                                }
                                if (v.Scope) {
                                    view.set_scope(v.Scope);
                                }
                                view.update();
                            }
                            else {
                                var viewCreationInformation = new SP.ViewCreationInformation();
                                if (v.Title) {
                                    viewCreationInformation.set_title(v.Title);
                                }
                                if (v.PersonalView) {
                                    viewCreationInformation.set_personalView(v.PersonalView);
                                }
                                if (v.Paged) {
                                    viewCreationInformation.set_paged(v.Paged);
                                }
                                if (v.Query) {
                                    viewCreationInformation.set_query(v.Query);
                                }
                                if (v.RowLimit) {
                                    viewCreationInformation.set_rowLimit(v.RowLimit);
                                }
                                if (v.SetAsDefaultView) {
                                    viewCreationInformation.set_setAsDefaultView(v.SetAsDefaultView);
                                }
                                if (v.ViewFields) {
                                    viewCreationInformation.set_viewFields(v.ViewFields);
                                }
                                if (v.ViewTypeKind) {
                                    viewCreationInformation.set_viewTypeKind(SP.ViewType.html);
                                }
                                var view = l.get_views().add(viewCreationInformation);
                                if (v.Scope) {
                                    view.set_scope(v.Scope);
                                    view.update();
                                }
                                l.update();
                            }
                            params.ClientContext.load(l.get_views());
                        });
                    });
                    params.ClientContext.executeQueryAsync(resolve, resolve);
                }, resolve);
            });
        };
        ObjectLists.prototype.InsertDataRows = function (params) {
            return new Promise(function (resolve, reject) {
                params.ListInstances.forEach(function (l, index) {
                    var obj = params.Objects[index];
                    if (obj.DataRows) {
                        obj.DataRows.forEach(function (r) {
                            var item = l.addItem(new SP.ListItemCreationInformation());
                            Object.keys(r).forEach(function (key) {
                                item.set_item(key, r[key]);
                            });
                            item.update();
                            params.ClientContext.load(item);
                        });
                    }
                });
                params.ClientContext.executeQueryAsync(resolve, resolve);
            });
        };
        return ObjectLists;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectLists = ObjectLists;
});

},{"../Sequencer/Sequencer":16,"./ObjectHandlerBase":10}],12:[function(require,module,exports){
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
        define(["require", "exports", "../util", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require("../util");
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectNavigation = (function (_super) {
        __extends(ObjectNavigation, _super);
        function ObjectNavigation() {
            _super.call(this, "Navigation");
        }
        ObjectNavigation.prototype.ProvisionObjects = function (object) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            var clientContext = SP.ClientContext.get_current();
            var navigation = clientContext.get_web().get_navigation();
            return new Promise(function (resolve, reject) {
                _this.ConfigureQuickLaunch(object.QuickLaunch, clientContext, _this.httpClient, navigation).then(function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                }, function () {
                    _super.prototype.scope_ended.call(_this);
                    reject();
                });
            });
        };
        ObjectNavigation.prototype.getNodeFromCollectionByTitle = function (nodeCollection, title) {
            var f = nodeCollection.filter(function (val) {
                return val.get_title() === title;
            });
            return f[0] || null;
        };
        ;
        ObjectNavigation.prototype.ConfigureQuickLaunch = function (nodes, clientContext, httpClient, navigation) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (nodes.length === 0) {
                    resolve();
                }
                else {
                    var quickLaunchNodeCollection_1 = navigation.get_quickLaunch();
                    clientContext.load(quickLaunchNodeCollection_1);
                    clientContext.executeQueryAsync(function () {
                        var temporaryQuickLaunch = [];
                        var index = quickLaunchNodeCollection_1.get_count() - 1;
                        while (index >= 0) {
                            var oldNode = quickLaunchNodeCollection_1.itemAt(index);
                            temporaryQuickLaunch.push(oldNode);
                            oldNode.deleteObject();
                            index--;
                        }
                        clientContext.executeQueryAsync(function () {
                            nodes.forEach(function (n) {
                                var existingNode = _this.getNodeFromCollectionByTitle(temporaryQuickLaunch, n.Title);
                                var newNode = new SP.NavigationNodeCreationInformation();
                                newNode.set_title(n.Title);
                                newNode.set_url(existingNode ? existingNode.get_url() : util_1.Util.replaceUrlTokens(n.Url));
                                newNode.set_asLastNode(true);
                                quickLaunchNodeCollection_1.add(newNode);
                            });
                            clientContext.executeQueryAsync(function () {
                                httpClient.get(_spPageContextInfo.webAbsoluteUrl + "/_api/web/Navigation/QuickLaunch").then(function (response) {
                                    response.json().then(function (json) {
                                        json.value.forEach(function (d) {
                                            var node = navigation.getNodeById(d.Id);
                                            var childrenNodeCollection = node.get_children();
                                            var parentNode = nodes.filter(function (value) { return value.Title === d.Title; })[0];
                                            if (parentNode && parentNode.Children) {
                                                parentNode.Children.forEach(function (n) {
                                                    var existingNode = _this.getNodeFromCollectionByTitle(temporaryQuickLaunch, n.Title);
                                                    var newNode = new SP.NavigationNodeCreationInformation();
                                                    newNode.set_title(n.Title);
                                                    newNode.set_url(existingNode
                                                        ? existingNode.get_url()
                                                        : util_1.Util.replaceUrlTokens(n.Url));
                                                    newNode.set_asLastNode(true);
                                                    childrenNodeCollection.add(newNode);
                                                });
                                            }
                                        });
                                        clientContext.executeQueryAsync(resolve, resolve);
                                    });
                                });
                            }, resolve);
                        });
                    });
                }
            });
        };
        return ObjectNavigation;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectNavigation = ObjectNavigation;
});

},{"../util":18,"./ObjectHandlerBase":10}],13:[function(require,module,exports){
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
        define(["require", "exports", "../util", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require("../util");
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectPropertyBagEntries = (function (_super) {
        __extends(ObjectPropertyBagEntries, _super);
        function ObjectPropertyBagEntries() {
            _super.call(this, "PropertyBagEntries");
        }
        ObjectPropertyBagEntries.prototype.ProvisionObjects = function (entries) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            return new Promise(function (resolve, reject) {
                if (!entries || entries.length === 0) {
                    resolve();
                }
                else {
                    var clientContext_1 = SP.ClientContext.get_current();
                    var web_1 = clientContext_1.get_web();
                    var propBag_1 = web_1.get_allProperties();
                    var indexedProperties_1 = [];
                    for (var i = 0; i < entries.length; i++) {
                        var entry = entries[i];
                        propBag_1.set_item(entry.Key, entry.Value);
                        if (entry.Indexed) {
                            indexedProperties_1.push(util_1.Util.encodePropertyKey(entry.Key));
                        }
                        ;
                    }
                    ;
                    web_1.update();
                    clientContext_1.load(propBag_1);
                    clientContext_1.executeQueryAsync(function () {
                        if (indexedProperties_1.length > 0) {
                            propBag_1.set_item("vti_indexedpropertykeys", indexedProperties_1.join("|"));
                            web_1.update();
                            clientContext_1.executeQueryAsync(function () {
                                _super.prototype.scope_ended.call(_this);
                                resolve();
                            }, function () {
                                _super.prototype.scope_ended.call(_this);
                                resolve();
                            });
                        }
                        else {
                            _super.prototype.scope_ended.call(_this);
                            resolve();
                        }
                    }, function () {
                        _super.prototype.scope_ended.call(_this);
                        resolve();
                    });
                }
            });
        };
        return ObjectPropertyBagEntries;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectPropertyBagEntries = ObjectPropertyBagEntries;
});

},{"../util":18,"./ObjectHandlerBase":10}],14:[function(require,module,exports){
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
        define(["require", "exports", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectWebSettings = (function (_super) {
        __extends(ObjectWebSettings, _super);
        function ObjectWebSettings() {
            _super.call(this, "WebSettings");
        }
        ObjectWebSettings.prototype.ProvisionObjects = function (object) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var web = clientContext.get_web();
                if (object.WelcomePage) {
                    web.get_rootFolder().set_welcomePage(object.WelcomePage);
                    web.get_rootFolder().update();
                }
                if (object.MasterUrl) {
                    web.set_masterUrl(object.MasterUrl);
                }
                if (object.CustomMasterUrl) {
                    web.set_customMasterUrl(object.CustomMasterUrl);
                }
                if (object.SaveSiteAsTemplateEnabled !== undefined) {
                    web.set_saveSiteAsTemplateEnabled(object.SaveSiteAsTemplateEnabled);
                }
                if (object.QuickLaunchEnabled !== undefined) {
                    web.set_saveSiteAsTemplateEnabled(object.QuickLaunchEnabled);
                }
                if (object.TreeViewEnabled !== undefined) {
                    web.set_treeViewEnabled(object.TreeViewEnabled);
                }
                web.update();
                clientContext.load(web);
                clientContext.executeQueryAsync(function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                }, function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                });
            });
        };
        return ObjectWebSettings;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectWebSettings = ObjectWebSettings;
});

},{"./ObjectHandlerBase":10}],15:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ProvisioningStep = (function () {
        function ProvisioningStep(name, index, objects, parameters, handler) {
            this.name = name;
            this.index = index;
            this.objects = objects;
            this.parameters = parameters;
            this.handler = handler;
        }
        ProvisioningStep.prototype.execute = function (dependentPromise) {
            var _this = this;
            var _handler = new this.handler();
            if (!dependentPromise) {
                return _handler.ProvisionObjects(this.objects, this.parameters);
            }
            return new Promise(function (resolve, reject) {
                dependentPromise.then(function () {
                    return _handler.ProvisionObjects(_this.objects, _this.parameters).then(resolve, resolve);
                });
            });
        };
        return ProvisioningStep;
    }());
    exports.ProvisioningStep = ProvisioningStep;
});

},{}],16:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Sequencer = (function () {
        function Sequencer(functions, parameter, scope) {
            this.functions = functions;
            this.parameter = parameter;
            this.scope = scope;
        }
        Sequencer.prototype.execute = function (progressFunction) {
            var promiseSequence = Promise.resolve();
            this.functions.forEach(function (sequenceFunction, functionNr) {
                promiseSequence = promiseSequence.then(function () {
                    return sequenceFunction.call(this.scope, this.parameter);
                }).then(function (result) {
                    if (progressFunction) {
                        progressFunction.call(this, functionNr, this.functions);
                    }
                });
            }, this);
            return promiseSequence;
        };
        return Sequencer;
    }());
    exports.Sequencer = Sequencer;
});

},{}],17:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./ProvisioningStep", "./ObjectHandlers/ObjectNavigation", "./ObjectHandlers/ObjectPropertyBagEntries", "./ObjectHandlers/ObjectFeatures", "./ObjectHandlers/ObjectWebSettings", "./ObjectHandlers/ObjectComposedLook", "./ObjectHandlers/ObjectCustomActions", "./ObjectHandlers/ObjectFiles", "./ObjectHandlers/ObjectLists", "./util", "../../utils/logging", "../../net/HttpClient"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ProvisioningStep_1 = require("./ProvisioningStep");
    var ObjectNavigation_1 = require("./ObjectHandlers/ObjectNavigation");
    var ObjectPropertyBagEntries_1 = require("./ObjectHandlers/ObjectPropertyBagEntries");
    var ObjectFeatures_1 = require("./ObjectHandlers/ObjectFeatures");
    var ObjectWebSettings_1 = require("./ObjectHandlers/ObjectWebSettings");
    var ObjectComposedLook_1 = require("./ObjectHandlers/ObjectComposedLook");
    var ObjectCustomActions_1 = require("./ObjectHandlers/ObjectCustomActions");
    var ObjectFiles_1 = require("./ObjectHandlers/ObjectFiles");
    var ObjectLists_1 = require("./ObjectHandlers/ObjectLists");
    var util_1 = require("./util");
    var logging_1 = require("../../utils/logging");
    var HttpClient_1 = require("../../net/HttpClient");
    var Provisioning = (function () {
        function Provisioning() {
            this.handlers = {
                "Navigation": ObjectNavigation_1.ObjectNavigation,
                "PropertyBagEntries": ObjectPropertyBagEntries_1.ObjectPropertyBagEntries,
                "Features": ObjectFeatures_1.ObjectFeatures,
                "WebSettings": ObjectWebSettings_1.ObjectWebSettings,
                "ComposedLook": ObjectComposedLook_1.ObjectComposedLook,
                "CustomActions": ObjectCustomActions_1.ObjectCustomActions,
                "Files": ObjectFiles_1.ObjectFiles,
                "Lists": ObjectLists_1.ObjectLists,
            };
            this.httpClient = new HttpClient_1.HttpClient();
        }
        Provisioning.prototype.applyTemplate = function (path) {
            var _this = this;
            var url = util_1.Util.replaceUrlTokens(path);
            return new Promise(function (resolve, reject) {
                _this.httpClient.get(url).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (template) {
                            _this.start(template, Object.keys(template)).then(resolve, reject);
                        });
                    }
                    else {
                        reject(response.statusText);
                    }
                }, function (error) {
                    logging_1.Logger.write("Provisioning: The provided template is invalid", logging_1.Logger.LogLevel.Error);
                });
            });
        };
        Provisioning.prototype.start = function (json, queue) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.startTime = new Date().getTime();
                _this.queueItems = [];
                queue.forEach(function (q, index) {
                    if (!_this.handlers[q]) {
                        return;
                    }
                    _this.queueItems.push(new ProvisioningStep_1.ProvisioningStep(q, index, json[q], json.Parameters, _this.handlers[q]));
                });
                var promises = [];
                promises.push(new Promise(function (res) {
                    logging_1.Logger.write("Provisioning: Code execution scope started", logging_1.Logger.LogLevel.Info);
                    res();
                }));
                var index = 1;
                while (_this.queueItems[index - 1] !== undefined) {
                    var i = promises.length - 1;
                    promises.push(_this.queueItems[index - 1].execute(promises[i]));
                    index++;
                }
                ;
                Promise.all(promises).then(function (value) {
                    logging_1.Logger.write("Provisioning: Code execution scope ended", logging_1.Logger.LogLevel.Info);
                    resolve(value);
                }, function (error) {
                    logging_1.Logger.write("Provisioning: Code execution scope ended" + JSON.stringify(error), logging_1.Logger.LogLevel.Error);
                    reject(error);
                });
            });
        };
        return Provisioning;
    }());
    exports.Provisioning = Provisioning;
});

},{"../../net/HttpClient":3,"../../utils/logging":20,"./ObjectHandlers/ObjectComposedLook":6,"./ObjectHandlers/ObjectCustomActions":7,"./ObjectHandlers/ObjectFeatures":8,"./ObjectHandlers/ObjectFiles":9,"./ObjectHandlers/ObjectLists":11,"./ObjectHandlers/ObjectNavigation":12,"./ObjectHandlers/ObjectPropertyBagEntries":13,"./ObjectHandlers/ObjectWebSettings":14,"./ProvisioningStep":15,"./util":18}],18:[function(require,module,exports){
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
        Util.getRelativeUrl = function (url) {
            return url.replace(document.location.protocol + "//" + document.location.hostname, "");
        };
        Util.replaceUrlTokens = function (url) {
            return url.replace(/{site}/g, _spPageContextInfo.webAbsoluteUrl)
                .replace(/{sitecollection}/g, _spPageContextInfo.siteAbsoluteUrl)
                .replace(/{themegallery}/g, _spPageContextInfo.siteAbsoluteUrl + "/_catalogs/theme/15");
        };
        ;
        Util.encodePropertyKey = function (propKey) {
            var bytes = [];
            for (var i = 0; i < propKey.length; ++i) {
                bytes.push(propKey.charCodeAt(i));
                bytes.push(0);
            }
            var b64encoded = window.btoa(String.fromCharCode.apply(null, bytes));
            return b64encoded;
        };
        return Util;
    }());
    exports.Util = Util;
});

},{}],19:[function(require,module,exports){
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

},{"../../utils/logging":20,"../../utils/util":21}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

},{}]},{},[17])(17)
});