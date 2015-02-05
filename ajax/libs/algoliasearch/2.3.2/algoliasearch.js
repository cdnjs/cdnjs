/*!
 * algoliasearch 2.3.2
 * https://github.com/algolia/algoliasearch-client-js
 * Copyright 2013 Algolia SAS; Licensed MIT
 */

var VERSION = "2.3.2";

var AlgoliaSearch = function(applicationID, apiKey, method, resolveDNS, hostsArray) {
    this.applicationID = applicationID;
    this.apiKey = apiKey;
    if (this._isUndefined(hostsArray)) {
        hostsArray = [ applicationID + "-1.algolia.io", applicationID + "-2.algolia.io", applicationID + "-3.algolia.io" ];
    }
    this.hosts = [];
    for (var i = 0; i < hostsArray.length; ++i) {
        if (Math.random() > .5) {
            this.hosts.reverse();
        }
        if (this._isUndefined(method) || method == null) {
            this.hosts.push(("https:" == document.location.protocol ? "https" : "http") + "://" + hostsArray[i]);
        } else if (method === "https" || method === "HTTPS") {
            this.hosts.push("https://" + hostsArray[i]);
        } else {
            this.hosts.push("http://" + hostsArray[i]);
        }
    }
    if (Math.random() > .5) {
        this.hosts.reverse();
    }
    if (this._isUndefined(resolveDNS) || resolveDNS) {
        this._jsonRequest({
            method: "GET",
            url: "/1/isalive"
        });
    }
};

AlgoliaSearch.prototype = {
    deleteIndex: function(indexName, callback) {
        this._jsonRequest({
            method: "DELETE",
            url: "/1/indexes/" + encodeURIComponent(indexName),
            callback: callback
        });
    },
    moveIndex: function(srcIndexName, dstIndexName, callback) {
        var postObj = {
            operation: "move",
            destination: dstIndexName
        };
        this._jsonRequest({
            method: "POST",
            url: "/1/indexes/" + encodeURIComponent(srcIndexName) + "/operation",
            body: postObj,
            callback: callback
        });
    },
    copyIndex: function(srcIndexName, dstIndexName, callback) {
        var postObj = {
            operation: "copy",
            destination: dstIndexName
        };
        this._jsonRequest({
            method: "POST",
            url: "/1/indexes/" + encodeURIComponent(srcIndexName) + "/operation",
            body: postObj,
            callback: callback
        });
    },
    getLogs: function(callback, offset, length) {
        if (this._isUndefined(offset)) {
            offset = 0;
        }
        if (this._isUndefined(length)) {
            length = 10;
        }
        this._jsonRequest({
            method: "GET",
            url: "/1/logs?offset=" + offset + "&length=" + length,
            callback: callback
        });
    },
    listIndexes: function(callback) {
        this._jsonRequest({
            method: "GET",
            url: "/1/indexes/",
            callback: callback
        });
    },
    initIndex: function(indexName) {
        return new this.Index(this, indexName);
    },
    listUserKeys: function(callback) {
        this._jsonRequest({
            method: "GET",
            url: "/1/keys",
            callback: callback
        });
    },
    getUserKeyACL: function(key, callback) {
        this._jsonRequest({
            method: "GET",
            url: "/1/keys/" + key,
            callback: callback
        });
    },
    deleteUserKey: function(key, callback) {
        this._jsonRequest({
            method: "DELETE",
            url: "/1/keys/" + key,
            callback: callback
        });
    },
    addUserKey: function(acls, callback) {
        var aclsObject = {};
        aclsObject.acl = acls;
        this._jsonRequest({
            method: "POST",
            url: "/1/keys",
            body: aclsObject,
            callback: callback
        });
    },
    addUserKeyWithValidity: function(acls, validity, maxQueriesPerIPPerHour, maxHitsPerQuery, callback) {
        var indexObj = this;
        var aclsObject = {};
        aclsObject.acl = acls;
        aclsObject.validity = validity;
        aclsObject.maxQueriesPerIPPerHour = maxQueriesPerIPPerHour;
        aclsObject.maxHitsPerQuery = maxHitsPerQuery;
        this._jsonRequest({
            method: "POST",
            url: "/1/indexes/" + indexObj.indexName + "/keys",
            body: aclsObject,
            callback: callback
        });
    },
    startQueriesBatch: function() {
        this.batch = [];
    },
    addQueryInBatch: function(indexName, query, args) {
        var params = "query=" + query;
        if (!this._isUndefined(args) && args != null) {
            params = this._getSearchParams(args, params);
        }
        this.batch.push({
            indexName: indexName,
            params: params
        });
    },
    clearCache: function() {
        this.cache = {};
    },
    sendQueriesBatch: function(callback, delay) {
        var as = this;
        var params = {
            requests: [],
            apiKey: this.apiKey,
            appID: this.applicationID
        };
        for (var i = 0; i < as.batch.length; ++i) {
            params.requests.push(as.batch[i]);
        }
        window.clearTimeout(as.onDelayTrigger);
        if (!this._isUndefined(delay) && delay != null && delay > 0) {
            var onDelayTrigger = window.setTimeout(function() {
                as._sendQueriesBatch(params, callback);
            }, delay);
            as.onDelayTrigger = onDelayTrigger;
        } else {
            this._sendQueriesBatch(params, callback);
        }
    },
    Index: function(algoliasearch, indexName) {
        this.indexName = indexName;
        this.as = algoliasearch;
        this.typeAheadArgs = null;
        this.typeAheadPropertyName = null;
    },
    _sendQueriesBatch: function(params, callback) {
        this._jsonRequest({
            cache: this.cache,
            method: "POST",
            url: "/1/indexes/*/queries",
            body: params,
            callback: callback
        });
    },
    _jsonRequest: function(opts) {
        var self = this;
        var callback = opts.callback;
        var cache = null;
        var cacheID = opts.url;
        if (!this._isUndefined(opts.body)) {
            cacheID = opts.url + "_body_" + JSON.stringify(opts.body);
        }
        if (!this._isUndefined(opts.cache)) {
            cache = opts.cache;
            if (!this._isUndefined(cache[cacheID])) {
                if (!this._isUndefined(callback)) {
                    callback(true, cache[cacheID]);
                }
                return;
            }
        }
        var impl = function(position) {
            var idx = 0;
            if (!self._isUndefined(position)) {
                idx = position;
            }
            if (self.hosts.length <= idx) {
                if (!self._isUndefined(callback)) {
                    callback(false, {
                        message: "Cannot contact server"
                    });
                }
                return;
            }
            opts.callback = function(retry, success, res, body) {
                if (!success && !self._isUndefined(body)) {
                    console.log("Error: " + body.message);
                }
                if (success && !self._isUndefined(opts.cache)) {
                    cache[cacheID] = body;
                }
                if (!success && retry && idx + 1 < self.hosts.length) {
                    impl(idx + 1);
                } else {
                    if (!self._isUndefined(callback)) {
                        callback(success, body);
                    }
                }
            };
            opts.hostname = self.hosts[idx];
            self._jsonRequestByHost(opts);
        };
        impl();
    },
    _jsonRequestByHost: function(opts) {
        var body = null;
        var self = this;
        if (!this._isUndefined(opts.body)) {
            body = JSON.stringify(opts.body);
        }
        var url = opts.hostname + opts.url;
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        if ("withCredentials" in xmlHttp) {
            xmlHttp.open(opts.method, url, true);
            xmlHttp.setRequestHeader("X-Algolia-API-Key", this.apiKey);
            xmlHttp.setRequestHeader("X-Algolia-Application-Id", this.applicationID);
            if (body != null) {
                xmlHttp.setRequestHeader("Content-type", "application/json");
            }
        } else if (typeof XDomainRequest != "undefined") {
            xmlHttp = new XDomainRequest();
            xmlHttp.open(opts.method, url);
        } else {
            console.log("your browser is too old to support CORS requests");
        }
        xmlHttp.send(body);
        xmlHttp.onload = function(event) {
            if (!self._isUndefined(event)) {
                var retry = event.target.status === 0 || event.target.status === 503;
                var success = event.target.status === 200 || event.target.status === 201;
                opts.callback(retry, success, event.target, event.target.response != null ? JSON.parse(event.target.response) : null);
            } else {
                opts.callback(false, true, event, JSON.parse(xmlHttp.responseText));
            }
        };
        xmlHttp.onerror = function() {
            opts.callback(true, false, null, {
                message: "Could not connect to Host"
            });
        };
    },
    _getSearchParams: function(args, params) {
        if (this._isUndefined(args) || args == null) {
            return params;
        }
        for (var key in args) {
            if (key != null && args.hasOwnProperty(key)) {
                params += params.length === 0 ? "?" : "&";
                params += key + "=" + encodeURIComponent(Object.prototype.toString.call(args[key]) === "[object Array]" ? JSON.stringify(args[key]) : args[key]);
            }
        }
        return params;
    },
    _isUndefined: function(obj) {
        return obj === void 0;
    },
    applicationID: null,
    apiKey: null,
    hosts: [],
    cache: {}
};

AlgoliaSearch.prototype.Index.prototype = {
    clearCache: function() {
        this.cache = {};
    },
    addObject: function(content, callback, objectID) {
        var indexObj = this;
        if (this.as._isUndefined(objectID)) {
            this.as._jsonRequest({
                method: "POST",
                url: "/1/indexes/" + encodeURIComponent(indexObj.indexName),
                body: content,
                callback: callback
            });
        } else {
            this.as._jsonRequest({
                method: "PUT",
                url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/" + encodeURIComponent(objectID),
                body: content,
                callback: callback
            });
        }
    },
    addObjects: function(objects, callback) {
        var indexObj = this;
        var postObj = {
            requests: []
        };
        for (var i = 0; i < objects.length; ++i) {
            var request = {
                action: "addObject",
                body: objects[i]
            };
            postObj.requests.push(request);
        }
        this.as._jsonRequest({
            method: "POST",
            url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/batch",
            body: postObj,
            callback: callback
        });
    },
    getObject: function(objectID, callback, attributes) {
        var indexObj = this;
        var params = "";
        if (!this.as._isUndefined(attributes)) {
            params = "?attributes=";
            for (var i = 0; i < attributes.length; ++i) {
                if (i !== 0) {
                    params += ",";
                }
                params += attributes[i];
            }
        }
        this.as._jsonRequest({
            method: "GET",
            url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/" + encodeURIComponent(objectID) + params,
            callback: callback
        });
    },
    partialUpdateObject: function(partialObject, callback) {
        var indexObj = this;
        this.as._jsonRequest({
            method: "POST",
            url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/" + encodeURIComponent(partialObject.objectID) + "/partial",
            body: partialObject,
            callback: callback
        });
    },
    saveObject: function(object, callback) {
        var indexObj = this;
        this.as._jsonRequest({
            method: "PUT",
            url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/" + encodeURIComponent(object.objectID),
            body: object,
            callback: callback
        });
    },
    saveObjects: function(objects, callback) {
        var indexObj = this;
        var postObj = {
            requests: []
        };
        for (var i = 0; i < objects.length; ++i) {
            var request = {
                action: "updateObject",
                objectID: encodeURIComponent(objects[i].objectID),
                body: objects[i]
            };
            postObj.requests.push(request);
        }
        this.as._jsonRequest({
            method: "POST",
            url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/batch",
            body: postObj,
            callback: callback
        });
    },
    deleteObject: function(objectID, callback) {
        if (objectID == null || objectID.length === 0) {
            callback(false, {
                message: "empty objectID"
            });
            return;
        }
        var indexObj = this;
        this.as._jsonRequest({
            method: "DELETE",
            url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/" + encodeURIComponent(objectID),
            callback: callback
        });
    },
    search: function(query, callback, args, delay) {
        var indexObj = this;
        var params = "query=" + encodeURIComponent(query);
        if (!this.as._isUndefined(args) && args != null) {
            params = this.as._getSearchParams(args, params);
        }
        window.clearTimeout(indexObj.onDelayTrigger);
        if (!this.as._isUndefined(delay) && delay != null && delay > 0) {
            var onDelayTrigger = window.setTimeout(function() {
                indexObj._search(params, callback);
            }, delay);
            indexObj.onDelayTrigger = onDelayTrigger;
        } else {
            this._search(params, callback);
        }
    },
    getTypeaheadTransport: function(args, propertyName) {
        this.typeAheadArgs = args;
        if (typeof propertyName !== "undefined") {
            this.typeAheadPropertyName = propertyName;
        }
        return this;
    },
    get: function(query, processRemoteData, that, cb, suggestions) {
        self = this;
        this.search(query, function(success, content) {
            if (success) {
                for (var i = 0; i < content.hits.length; ++i) {
                    var obj = content.hits[i];
                    if (typeof obj.value === "undefined") {
                        if (self.typeAheadPropertyName != null && typeof obj[self.typeAheadPropertyName] !== "undefined") {
                            obj.value = obj[self.typeAheadPropertyName];
                        } else {
                            var found = false;
                            for (var propertyName in obj) {
                                if (!found && obj.hasOwnProperty(propertyName) && typeof obj[propertyName] === "string") {
                                    obj.value = obj[propertyName];
                                    found = true;
                                }
                            }
                        }
                    }
                    suggestions.push(that._transformDatum(obj));
                }
                cb && cb(suggestions);
            }
        }, self.typeAheadArgs);
        return true;
    },
    waitTask: function(taskID, callback) {
        var indexObj = this;
        this.as._jsonRequest({
            method: "GET",
            url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/task/" + taskID,
            callback: function(success, body) {
                if (success && body.status === "published") {
                    callback(true, body);
                } else if (success && body.pendingTask) {
                    return indexObj.waitTask(taskID, callback);
                } else {
                    callback(false, body);
                }
            }
        });
    },
    clearIndex: function(callback) {
        var indexObj = this;
        this.as._jsonRequest({
            method: "POST",
            url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/clear",
            callback: callback
        });
    },
    getSettings: function(callback) {
        var indexObj = this;
        this.as._jsonRequest({
            method: "GET",
            url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/settings",
            callback: callback
        });
    },
    setSettings: function(settings, callback) {
        var indexObj = this;
        this.as._jsonRequest({
            method: "PUT",
            url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/settings",
            body: settings,
            callback: callback
        });
    },
    listUserKeys: function(callback) {
        var indexObj = this;
        this.as._jsonRequest({
            method: "GET",
            url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/keys",
            callback: callback
        });
    },
    getUserKeyACL: function(key, callback) {
        var indexObj = this;
        this.as._jsonRequest({
            method: "GET",
            url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/keys/" + key,
            callback: callback
        });
    },
    deleteUserKey: function(key, callback) {
        var indexObj = this;
        this.as._jsonRequest({
            method: "DELETE",
            url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/keys/" + key,
            callback: callback
        });
    },
    addUserKey: function(acls, callback) {
        var indexObj = this;
        var aclsObject = {};
        aclsObject.acl = acls;
        this.as._jsonRequest({
            method: "POST",
            url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/keys",
            body: aclsObject,
            callback: callback
        });
    },
    addUserKeyWithValidity: function(acls, validity, maxQueriesPerIPPerHour, maxHitsPerQuery, callback) {
        var indexObj = this;
        var aclsObject = {};
        aclsObject.acl = acls;
        aclsObject.validity = validity;
        aclsObject.maxQueriesPerIPPerHour = maxQueriesPerIPPerHour;
        aclsObject.maxHitsPerQuery = maxHitsPerQuery;
        this.as._jsonRequest({
            method: "POST",
            url: "/1/indexes/" + encodeURIComponent(indexObj.indexName) + "/keys",
            body: aclsObject,
            callback: callback
        });
    },
    _search: function(params, callback) {
        this.as._jsonRequest({
            cache: this.cache,
            method: "POST",
            url: "/1/indexes/" + encodeURIComponent(this.indexName) + "/query",
            body: {
                params: params,
                apiKey: this.as.apiKey,
                appID: this.as.applicationID
            },
            callback: callback
        });
    },
    as: null,
    indexName: null,
    cache: {},
    typeAheadArgs: null,
    typeAheadPropertyName: null,
    emptyConstructor: function() {}
};