// version 3.4.2
!function(e) {
    if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define(e); else {
        var o;
        "undefined" != typeof window ? o = window : "undefined" != typeof global ? o = global : "undefined" != typeof self && (o = self), 
        o.MojioClient = e();
    }
}(function() {
    var define, module, exports;
    return function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    throw new Error("Cannot find module '" + o + "'");
                }
                var f = n[o] = {
                    exports: {}
                };
                t[o][0].call(f.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e);
                }, f, f.exports, e, t, n, r);
            }
            return n[o].exports;
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s;
    }({
        1: [ function(_dereq_, module, exports) {
            var formurlencoded = (typeof module === "object" ? module : {}).exports = {
                encode: function(data, options) {
                    function getNestValsArrAsStr(arr) {
                        return arr.filter(function(e) {
                            return typeof e === "string" && e.length;
                        }).join("&");
                    }
                    function getKeys(obj) {
                        var keys = Object.keys(obj);
                        return options && options.sorted ? keys.sort() : keys;
                    }
                    function getObjNestVals(name, obj) {
                        var objKeyStr = ":name[:prop]";
                        return getNestValsArrAsStr(getKeys(obj).map(function(key) {
                            return getNestVals(objKeyStr.replace(/:name/, name).replace(/:prop/, key), obj[key]);
                        }));
                    }
                    function getArrNestVals(name, arr) {
                        var arrKeyStr = ":name[]";
                        return getNestValsArrAsStr(arr.map(function(elem) {
                            return getNestVals(arrKeyStr.replace(/:name/, name), elem);
                        }));
                    }
                    function getNestVals(name, value) {
                        var whitespaceRe = /%20/g, type = typeof value, f = null;
                        if (type === "string") {
                            f = encodeURIComponent(name) + "=" + formEncodeString(value);
                        } else if (type === "number") {
                            f = encodeURIComponent(name) + "=" + encodeURIComponent(value).replace(whitespaceRe, "+");
                        } else if (type === "boolean") {
                            f = encodeURIComponent(name) + "=" + value;
                        } else if (Array.isArray(value)) {
                            f = getArrNestVals(name, value);
                        } else if (type === "object") {
                            f = getObjNestVals(name, value);
                        }
                        return f;
                    }
                    function manuallyEncodeChar(ch) {
                        return "%" + ("0" + ch.charCodeAt(0).toString(16)).slice(-2).toUpperCase();
                    }
                    function formEncodeString(value) {
                        return value.replace(/[^ !'()~\*]*/g, encodeURIComponent).replace(/ /g, "+").replace(/[!'()~\*]/g, manuallyEncodeChar);
                    }
                    return getNestValsArrAsStr(getKeys(data).map(function(key) {
                        return getNestVals(key, data[key]);
                    }));
                }
            };
        }, {} ],
        2: [ function(_dereq_, module, exports) {
            module.exports = _dereq_("./form-urlencoded");
        }, {
            "./form-urlencoded": 1
        } ],
        3: [ function(_dereq_, module, exports) {
            (function() {
                var HttpBrowserWrapper;
                module.exports = HttpBrowserWrapper = function() {
                    function HttpBrowserWrapper(requester) {
                        if (requester == null) {
                            requester = null;
                        }
                        if (requester != null) {
                            this.requester = requester;
                        }
                    }
                    HttpBrowserWrapper.prototype.request = function(params, callback) {
                        var k, url, v, xmlhttp, _ref;
                        if (params.method == null) {
                            params.method = "GET";
                        }
                        if (params.host == null && params.hostname != null) {
                            params.host = params.hostname;
                        }
                        if (!(params.scheme != null || (typeof window === "undefined" || window === null))) {
                            params.scheme = window.location.protocol.split(":")[0];
                        }
                        if (!params.scheme || params.scheme === "file") {
                            params.scheme = "https";
                        }
                        if (params.data == null) {
                            params.data = {};
                        }
                        if (params.body != null) {
                            params.data = params.body;
                        }
                        if (params.headers == null) {
                            params.headers = {};
                        }
                        url = params.scheme + "://" + params.host + ":" + params.port + params.path;
                        if (params.method === "GET" && params.data != null && params.data.length > 0) {
                            url += "?" + Object.keys(params.data).map(function(k) {
                                return encodeURIComponent(k) + "=" + encodeURIComponent(params.data[k]);
                            }).join("&");
                        }
                        if (typeof XMLHttpRequest !== "undefined" && XMLHttpRequest !== null) {
                            xmlhttp = new XMLHttpRequest();
                        } else {
                            xmlhttp = this.requester;
                        }
                        xmlhttp.open(params.method, url, true);
                        _ref = params.headers;
                        for (k in _ref) {
                            v = _ref[k];
                            xmlhttp.setRequestHeader(k, v);
                        }
                        xmlhttp.onreadystatechange = function() {
                            if (xmlhttp.readyState === 4) {
                                if (xmlhttp.status >= 200 && xmlhttp.status <= 299) {
                                    return callback(null, JSON.parse(xmlhttp.responseText));
                                } else {
                                    return callback(xmlhttp.statusText, null);
                                }
                            }
                        };
                        if (params.method === "GET") {
                            return xmlhttp.send();
                        } else {
                            return xmlhttp.send(params.data);
                        }
                    };
                    return HttpBrowserWrapper;
                }();
            }).call(this);
        }, {} ],
        4: [ function(_dereq_, module, exports) {
            (function() {
                var FormUrlencoded, Http, MojioClient, SignalR;
                Http = _dereq_("./HttpBrowserWrapper");
                SignalR = _dereq_("./SignalRBrowserWrapper");
                FormUrlencoded = _dereq_("form-urlencoded");
                module.exports = MojioClient = function() {
                    var App, Event, Login, Mojio, Observer, Product, Subscription, Trip, User, Vehicle, defaults, mojio_models;
                    defaults = {
                        hostname: "api.moj.io",
                        port: "443",
                        version: "v1",
                        scheme: "https",
                        signalr_scheme: "https",
                        signalr_port: "443",
                        signalr_hub: "ObserverHub",
                        live: true
                    };
                    function MojioClient(options) {
                        var _base, _base1, _base2, _base3, _base4, _base5, _base6, _base7;
                        this.options = options;
                        if (this.options == null) {
                            this.options = {
                                hostname: this.defaults.hostname,
                                port: this.defaults.port,
                                version: this.defaults.version,
                                scheme: this.defaults.scheme,
                                live: this.defaults.live
                            };
                        }
                        if ((_base = this.options).hostname == null) {
                            _base.hostname = defaults.hostname;
                        }
                        if ((_base1 = this.options).port == null) {
                            _base1.port = defaults.port;
                        }
                        if ((_base2 = this.options).version == null) {
                            _base2.version = defaults.version;
                        }
                        if ((_base3 = this.options).scheme == null) {
                            _base3.scheme = defaults.scheme;
                        }
                        if ((_base4 = this.options).signalr_port == null) {
                            _base4.signalr_port = defaults.signalr_port;
                        }
                        if ((_base5 = this.options).signalr_scheme == null) {
                            _base5.signalr_scheme = defaults.signalr_scheme;
                        }
                        if ((_base6 = this.options).signalr_hub == null) {
                            _base6.signalr_hub = defaults.signalr_hub;
                        }
                        this.options.application = this.options.application;
                        this.options.secret = this.options.secret;
                        this.options.observerTransport = "SingalR";
                        this.conn = null;
                        this.hub = null;
                        this.connStatus = null;
                        this.auth_token = null;
                        if ((_base7 = this.options).tokenRequester == null) {
                            _base7.tokenRequester = function() {
                                return document.location.hash.match(/access_token=([0-9a-f-]{36})/);
                            };
                        }
                        this.signalr = new SignalR(this.options.signalr_scheme + "://" + this.options.hostname + ":" + this.options.signalr_port + "/v1/signalr", [ this.options.signalr_hub ], $);
                    }
                    MojioClient.prototype.getResults = function(type, results) {
                        var arrlength, objects, result, _i, _j, _len, _len1, _ref;
                        objects = [];
                        if (results instanceof Array) {
                            arrlength = results.length;
                            for (_i = 0, _len = results.length; _i < _len; _i++) {
                                result = results[_i];
                                objects.push(new type(result));
                            }
                        } else if (results.Data instanceof Array) {
                            arrlength = results.Data.length;
                            _ref = results.Data;
                            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                                result = _ref[_j];
                                objects.push(new type(result));
                            }
                        } else if (result.Data !== null) {
                            objects.push(new type(result.Data));
                        } else {
                            objects.push(new type(result));
                        }
                        return objects;
                    };
                    MojioClient._makeParameters = function(params) {
                        var property, query, value;
                        if (params.length === 0) {
                            "";
                        }
                        query = "?";
                        for (property in params) {
                            value = params[property];
                            query += "" + encodeURIComponent(property) + "=" + encodeURIComponent(value) + "&";
                        }
                        return query.slice(0, -1);
                    };
                    MojioClient.prototype.getPath = function(resource, id, action, key) {
                        if (key && id && action && id !== "" && action !== "") {
                            return "/" + encodeURIComponent(resource) + "/" + encodeURIComponent(id) + "/" + encodeURIComponent(action) + "/" + encodeURIComponent(key);
                        } else if (id && action && id !== "" && action !== "") {
                            return "/" + encodeURIComponent(resource) + "/" + encodeURIComponent(id) + "/" + encodeURIComponent(action);
                        } else if (id && id !== "") {
                            return "/" + encodeURIComponent(resource) + "/" + encodeURIComponent(id);
                        } else if (action && action !== "") {
                            return "/" + encodeURIComponent(resource) + "/" + encodeURIComponent(action);
                        }
                        return "/" + encodeURIComponent(resource);
                    };
                    MojioClient.prototype.dataByMethod = function(data, method) {
                        switch (method.toUpperCase()) {
                          case "POST" || "PUT":
                            return this.stringify(data);

                          default:
                            return data;
                        }
                    };
                    MojioClient.prototype.stringify = function(data) {
                        return JSON.stringify(data);
                    };
                    MojioClient.prototype.request = function(request, callback, isOauth) {
                        var http, parts;
                        if (isOauth == null) {
                            isOauth = false;
                        }
                        parts = {
                            hostname: this.options.hostname,
                            host: this.options.hostname,
                            port: this.options.port,
                            scheme: this.options.scheme,
                            path: isOauth ? "" : "/" + this.options.version,
                            method: request.method,
                            withCredentials: false
                        };
                        parts.path = parts.path + this.getPath(request.resource, request.id, request.action, request.key);
                        if (request.parameters != null && Object.keys(request.parameters).length > 0) {
                            parts.path += MojioClient._makeParameters(request.parameters);
                        }
                        parts.headers = {};
                        if (this.getTokenId() != null) {
                            parts.headers["MojioAPIToken"] = this.getTokenId();
                        }
                        if (request.headers != null) {
                            parts.headers += request.headers;
                        }
                        parts.headers["Content-Type"] = "application/json";
                        if (request.body != null) {
                            if (isOauth) {
                                parts.body = FormUrlencoded.encode(request.body);
                            } else {
                                parts.body = request.body;
                            }
                        }
                        http = new Http();
                        return http.request(parts, callback);
                    };
                    MojioClient.prototype.login_resource = "Login";
                    MojioClient.prototype.authorize = function(redirect_url, scope) {
                        var parts, url;
                        if (scope == null) {
                            scope = "full";
                        }
                        parts = {
                            hostname: this.options.hostname,
                            host: this.options.hostname,
                            port: this.options.port,
                            scheme: this.options.scheme,
                            path: this.options.live ? "/OAuth2/authorize" : "/OAuth2Sandbox/authorize",
                            method: "Get",
                            withCredentials: false
                        };
                        parts.path += "?response_type=token";
                        parts.path += "&client_id=" + this.options.application;
                        parts.path += "&redirect_uri=" + redirect_url;
                        parts.path += "&scope=" + scope;
                        parts.headers = {};
                        if (this.getTokenId() != null) {
                            parts.headers["MojioAPIToken"] = this.getTokenId();
                        }
                        parts.headers["Content-Type"] = "application/json";
                        url = parts.scheme + "://" + parts.host + ":" + parts.port + parts.path;
                        return window.location = url;
                    };
                    MojioClient.prototype.token = function(callback) {
                        var match, token;
                        this.user = null;
                        match = this.options.tokenRequester();
                        token = !!match && match[1];
                        if (!token) {
                            return callback("token for authorization not found.", null);
                        } else {
                            return this.request({
                                method: "GET",
                                resource: this.login_resource,
                                id: token
                            }, function(_this) {
                                return function(error, result) {
                                    if (error) {
                                        return callback(error, null);
                                    } else {
                                        _this.auth_token = result;
                                        return callback(null, _this.auth_token);
                                    }
                                };
                            }(this));
                        }
                    };
                    MojioClient.prototype.unauthorize = function(redirect_url) {
                        var parts, url;
                        parts = {
                            hostname: this.options.hostname,
                            host: this.options.hostname,
                            port: this.options.port,
                            scheme: this.options.scheme,
                            path: "/account/logout",
                            method: "Get",
                            withCredentials: false
                        };
                        parts.path += "?Guid=" + this.getTokenId();
                        parts.path += "&client_id=" + this.options.application;
                        parts.path += "&redirect_uri=" + redirect_url;
                        parts.headers = {};
                        if (this.getTokenId() != null) {
                            parts.headers["MojioAPIToken"] = this.getTokenId();
                        }
                        parts.headers["Content-Type"] = "application/json";
                        url = parts.scheme + "://" + parts.host + ":" + parts.port + parts.path;
                        return window.location = url;
                    };
                    MojioClient.prototype._login = function(username, password, callback) {
                        return this.request({
                            method: "POST",
                            resource: this.options.live ? "/OAuth2/token" : "/OAuth2Sandbox/token",
                            body: {
                                username: username,
                                password: password,
                                client_id: this.options.application,
                                client_secret: this.options.secret,
                                grant_type: "password"
                            }
                        }, callback, true);
                    };
                    MojioClient.prototype.login = function(username, password, callback) {
                        return this._login(username, password, function(_this) {
                            return function(error, result) {
                                if (result != null) {
                                    _this.auth_token = result.access_token ? result.access_token : result;
                                }
                                return callback(error, result);
                            };
                        }(this));
                    };
                    MojioClient.prototype._logout = function(callback) {
                        return this.request({
                            method: "DELETE",
                            resource: this.login_resource,
                            id: typeof mojio_token !== "undefined" && mojio_token !== null ? mojio_token : this.getTokenId()
                        }, callback);
                    };
                    MojioClient.prototype.logout = function(callback) {
                        return this._logout(function(_this) {
                            return function(error, result) {
                                _this.auth_token = null;
                                return callback(error, result);
                            };
                        }(this));
                    };
                    mojio_models = {};
                    App = _dereq_("../models/App");
                    mojio_models["App"] = App;
                    Login = _dereq_("../models/Login");
                    mojio_models["Login"] = Login;
                    Mojio = _dereq_("../models/Mojio");
                    mojio_models["Mojio"] = Mojio;
                    Trip = _dereq_("../models/Trip");
                    mojio_models["Trip"] = Trip;
                    User = _dereq_("../models/User");
                    mojio_models["User"] = User;
                    Vehicle = _dereq_("../models/Vehicle");
                    mojio_models["Vehicle"] = Vehicle;
                    Product = _dereq_("../models/Product");
                    mojio_models["Product"] = Product;
                    Subscription = _dereq_("../models/Subscription");
                    mojio_models["Subscription"] = Subscription;
                    Event = _dereq_("../models/Event");
                    mojio_models["Event"] = Event;
                    Observer = _dereq_("../models/Observer");
                    mojio_models["Observer"] = Observer;
                    MojioClient.prototype.model = function(type, json) {
                        var data, object, _i, _len, _ref;
                        if (json == null) {
                            json = null;
                        }
                        if (json === null) {
                            return mojio_models[type];
                        } else if (json.Data != null && json.Data instanceof Array) {
                            object = json;
                            object.Objects = new Array();
                            _ref = json.Data;
                            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                data = _ref[_i];
                                object.Objects.push(new mojio_models[type](data));
                            }
                        } else if (json.Data != null) {
                            object = new mojio_models[type](json.Data);
                        } else {
                            object = new mojio_models[type](json);
                        }
                        object._client = this;
                        return object;
                    };
                    MojioClient.prototype.query = function(model, parameters, callback) {
                        var property, query_criteria, value, _ref;
                        if (parameters instanceof Object) {
                            if (parameters.criteria instanceof Object) {
                                query_criteria = "";
                                _ref = parameters.criteria;
                                for (property in _ref) {
                                    value = _ref[property];
                                    query_criteria += "" + property + "=" + value + ";";
                                }
                                parameters.criteria = query_criteria;
                            }
                            return this.request({
                                method: "GET",
                                resource: model.resource(),
                                parameters: parameters
                            }, function(_this) {
                                return function(error, result) {
                                    return callback(error, _this.model(model.model(), result));
                                };
                            }(this));
                        } else if (typeof parameters === "string") {
                            return this.request({
                                method: "GET",
                                resource: model.resource(),
                                parameters: {
                                    id: parameters
                                }
                            }, function(_this) {
                                return function(error, result) {
                                    return callback(error, _this.model(model.model(), result));
                                };
                            }(this));
                        } else {
                            return callback("criteria given is not in understood format, string or object.", null);
                        }
                    };
                    MojioClient.prototype.get = function(model, criteria, callback) {
                        return this.query(model, criteria, callback);
                    };
                    MojioClient.prototype.save = function(model, callback) {
                        return this.request({
                            method: "PUT",
                            resource: model.resource(),
                            body: model.stringify(),
                            parameters: {
                                id: model._id
                            }
                        }, callback);
                    };
                    MojioClient.prototype.put = function(model, callback) {
                        return this.save(model, callback);
                    };
                    MojioClient.prototype.create = function(model, callback) {
                        return this.request({
                            method: "POST",
                            resource: model.resource(),
                            body: model.stringify()
                        }, callback);
                    };
                    MojioClient.prototype.post = function(model, callback) {
                        return this.create(model, callback);
                    };
                    MojioClient.prototype["delete"] = function(model, callback) {
                        return this.request({
                            method: "DELETE",
                            resource: model.resource(),
                            parameters: {
                                id: model._id
                            }
                        }, callback);
                    };
                    MojioClient.prototype._schema = function(callback) {
                        return this.request({
                            method: "GET",
                            resource: "Schema"
                        }, callback);
                    };
                    MojioClient.prototype.schema = function(callback) {
                        return this._schema(function(_this) {
                            return function(error, result) {
                                return callback(error, result);
                            };
                        }(this));
                    };
                    MojioClient.prototype.watch = function(observer, observer_callback, callback) {
                        return this.request({
                            method: "POST",
                            resource: Observer.resource(),
                            body: observer.stringify()
                        }, function(_this) {
                            return function(error, result) {
                                if (error) {
                                    return callback(error, null);
                                } else {
                                    observer = new Observer(result);
                                    _this.signalr.subscribe(_this.options.signalr_hub, "Subscribe", observer.id(), observer.Subject, observer_callback, function(error, result) {
                                        return callback(null, observer);
                                    });
                                    return observer;
                                }
                            };
                        }(this));
                    };
                    MojioClient.prototype.ignore = function(observer, observer_callback, callback) {
                        if (!observer) {
                            callback("Observer required.");
                        }
                        if (observer["subject"] != null) {
                            if (observer.parent === null) {
                                return this.signalr.unsubscribe(this.options.signalr_hub, "Unsubscribe", observer.id(), observer.subject.id(), observer_callback, callback);
                            } else {
                                return this.signalr.unsubscribe(this.options.signalr_hub, "Unsubscribe", observer.id(), observer.subject.model(), observer_callback, callback);
                            }
                        } else {
                            if (observer.parent === null) {
                                return this.signalr.unsubscribe(this.options.signalr_hub, "Unsubscribe", observer.id(), observer.SubjectId, observer_callback, callback);
                            } else {
                                return this.signalr.unsubscribe(this.options.signalr_hub, "Unsubscribe", observer.id(), observer.Subject, observer_callback, callback);
                            }
                        }
                    };
                    MojioClient.prototype.observe = function(subject, parent, observer_callback, callback) {
                        var observer;
                        if (parent == null) {
                            parent = null;
                        }
                        if (parent === null) {
                            observer = new Observer({
                                ObserverType: "Generic",
                                Status: "Approved",
                                Name: "Test" + Math.random(),
                                Subject: subject.model(),
                                SubjectId: subject.id(),
                                Transports: "SignalR"
                            });
                            return this.request({
                                method: "PUT",
                                resource: Observer.resource(),
                                body: observer.stringify()
                            }, function(_this) {
                                return function(error, result) {
                                    if (error) {
                                        return callback(error, null);
                                    } else {
                                        observer = new Observer(result);
                                        return _this.signalr.subscribe(_this.options.signalr_hub, "Subscribe", observer.id(), observer.SubjectId, observer_callback, function(error, result) {
                                            return callback(null, observer);
                                        });
                                    }
                                };
                            }(this));
                        } else {
                            observer = new Observer({
                                ObserverType: "Generic",
                                Status: "Approved",
                                Name: "Test" + Math.random(),
                                Subject: subject.model(),
                                Parent: parent.model(),
                                ParentId: parent.id(),
                                Transports: "SignalR"
                            });
                            return this.request({
                                method: "PUT",
                                resource: Observer.resource(),
                                body: observer.stringify()
                            }, function(_this) {
                                return function(error, result) {
                                    if (error) {
                                        return callback(error, null);
                                    } else {
                                        observer = new Observer(result);
                                        return _this.signalr.subscribe(_this.options.signalr_hub, "Subscribe", observer.id(), subject.model(), observer_callback, function(error, result) {
                                            return callback(null, observer);
                                        });
                                    }
                                };
                            }(this));
                        }
                    };
                    MojioClient.prototype.unobserve = function(observer, subject, parent, observer_callback, callback) {
                        if (!observer || subject == null) {
                            return callback("Observer and subject required.");
                        } else if (parent === null) {
                            return this.signalr.unsubscribe(this.options.signalr_hub, "Unsubscribe", observer.id(), subject.id(), observer_callback, callback);
                        } else {
                            return this.signalr.unsubscribe(this.options.signalr_hub, "Unsubscribe", observer.id(), subject.model(), observer_callback, callback);
                        }
                    };
                    MojioClient.prototype.store = function(model, key, value, callback) {
                        if (!model || !model._id) {
                            return callback("Storage requires an object with a valid id.");
                        } else {
                            return this.request({
                                method: "PUT",
                                resource: model.resource(),
                                id: model.id(),
                                action: "store",
                                key: key,
                                body: JSON.stringify(value)
                            }, function(_this) {
                                return function(error, result) {
                                    if (error) {
                                        return callback(error, null);
                                    } else {
                                        return callback(null, result);
                                    }
                                };
                            }(this));
                        }
                    };
                    MojioClient.prototype.storage = function(model, key, callback) {
                        if (!model || !model._id) {
                            return callback("Get of storage requires an object with a valid id.");
                        } else {
                            return this.request({
                                method: "GET",
                                resource: model.resource(),
                                id: model.id(),
                                action: "store",
                                key: key
                            }, function(_this) {
                                return function(error, result) {
                                    if (error) {
                                        return callback(error, null);
                                    } else {
                                        return callback(null, result);
                                    }
                                };
                            }(this));
                        }
                    };
                    MojioClient.prototype.unstore = function(model, key, callback) {
                        if (!model || !model._id) {
                            return callback("Storage requires an object with a valid id.");
                        } else {
                            return this.request({
                                method: "DELETE",
                                resource: model.resource(),
                                id: model.id(),
                                action: "store",
                                key: key
                            }, function(_this) {
                                return function(error, result) {
                                    if (error) {
                                        return callback(error, null);
                                    } else {
                                        return callback(null, result);
                                    }
                                };
                            }(this));
                        }
                    };
                    MojioClient.prototype.getTokenId = function() {
                        if (this.auth_token != null && this.auth_token._id != null) {
                            return this.auth_token._id;
                        }
                        if (this.auth_token != null) {
                            return this.auth_token;
                        }
                        return null;
                    };
                    MojioClient.prototype.getUserId = function() {
                        if (this.auth_token != null && this.auth_token.UserId) {
                            return this.auth_token.UserId;
                        }
                        return null;
                    };
                    MojioClient.prototype.isLoggedIn = function() {
                        return this.getUserId() !== null || typeof this.auth_token === "string";
                    };
                    MojioClient.prototype.getCurrentUser = function(callback) {
                        if (this.user != null) {
                            callback(null, this.user);
                        } else if (this.isLoggedIn()) {
                            this.get(Login, this.auth_token, function(_this) {
                                return function(error, result) {
                                    if (error != null) {
                                        return callback(error, null);
                                    } else if (result.UserId != null) {
                                        return _this.get(User, result.UserId, function(error, result) {
                                            if (error != null) {
                                                return callback(error, null);
                                            } else {
                                                _this.user = result;
                                                return callback(null, _this.user);
                                            }
                                        });
                                    } else {
                                        return callback("User not found", null);
                                    }
                                };
                            }(this));
                        } else {
                            callback("User not found", null);
                            return false;
                        }
                        return true;
                    };
                    return MojioClient;
                }();
            }).call(this);
        }, {
            "../models/App": 6,
            "../models/Event": 7,
            "../models/Login": 8,
            "../models/Mojio": 9,
            "../models/Observer": 11,
            "../models/Product": 12,
            "../models/Subscription": 13,
            "../models/Trip": 14,
            "../models/User": 15,
            "../models/Vehicle": 16,
            "./HttpBrowserWrapper": 3,
            "./SignalRBrowserWrapper": 5,
            "form-urlencoded": 2
        } ],
        5: [ function(_dereq_, module, exports) {
            (function() {
                var SignalRBrowserWrapper, __bind = function(fn, me) {
                    return function() {
                        return fn.apply(me, arguments);
                    };
                };
                module.exports = SignalRBrowserWrapper = function() {
                    SignalRBrowserWrapper.prototype.observer_callbacks = {};
                    SignalRBrowserWrapper.prototype.observer_registry = function(entity) {
                        var callback, _i, _j, _len, _len1, _ref, _ref1, _results, _results1;
                        if (this.observer_callbacks[entity._id]) {
                            _ref = this.observer_callbacks[entity._id];
                            _results = [];
                            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                callback = _ref[_i];
                                _results.push(callback(entity));
                            }
                            return _results;
                        } else if (this.observer_callbacks[entity.Type]) {
                            _ref1 = this.observer_callbacks[entity.Type];
                            _results1 = [];
                            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                                callback = _ref1[_j];
                                _results1.push(callback(entity));
                            }
                            return _results1;
                        }
                    };
                    function SignalRBrowserWrapper(url, hubNames, jquery) {
                        this.observer_registry = __bind(this.observer_registry, this);
                        this.$ = jquery;
                        this.url = url;
                        this.hubs = {};
                        this.signalr = null;
                        this.connectionStatus = false;
                    }
                    SignalRBrowserWrapper.prototype.getHub = function(which, callback) {
                        if (this.hubs[which]) {
                            return callback(null, this.hubs[which]);
                        } else {
                            if (this.signalr == null) {
                                this.signalr = this.$.hubConnection(this.url, {
                                    useDefaultPath: false
                                });
                                this.signalr.error(function(error) {
                                    console.log("Connection error" + error);
                                    return callback(error, null);
                                });
                            }
                            this.hubs[which] = this.signalr.createHubProxy(which);
                            this.hubs[which].on("error", function(data) {
                                return console.log("Hub '" + which + "' has error" + data);
                            });
                            this.hubs[which].on("UpdateEntity", this.observer_registry);
                            if (this.hubs[which].connection.state !== 1) {
                                if (!this.connectionStatus) {
                                    return this.signalr.start().done(function(_this) {
                                        return function() {
                                            _this.connectionStatus = true;
                                            return _this.hubs[which].connection.start().done(function() {
                                                return callback(null, _this.hubs[which]);
                                            });
                                        };
                                    }(this));
                                } else {
                                    return this.hubs[which].connection.start().done(function(_this) {
                                        return function() {
                                            return callback(null, _this.hubs[which]);
                                        };
                                    }(this));
                                }
                            } else {
                                return callback(null, this.hubs[which]);
                            }
                        }
                    };
                    SignalRBrowserWrapper.prototype.setCallback = function(id, futureCallback) {
                        if (this.observer_callbacks[id] == null) {
                            this.observer_callbacks[id] = [];
                        }
                        this.observer_callbacks[id].push(futureCallback);
                    };
                    SignalRBrowserWrapper.prototype.removeCallback = function(id, pastCallback) {
                        var callback, temp, _i, _len, _ref;
                        if (pastCallback === null) {
                            this.observer_callbacks[id] = [];
                        } else {
                            temp = [];
                            _ref = this.observer_callbacks[id];
                            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                                callback = _ref[_i];
                                if (callback !== pastCallback) {
                                    temp.push(callback);
                                }
                            }
                            this.observer_callbacks[id] = temp;
                        }
                    };
                    SignalRBrowserWrapper.prototype.subscribe = function(hubName, method, observerId, subject, futureCallback, callback) {
                        this.setCallback(subject, futureCallback);
                        return this.getHub(hubName, function(error, hub) {
                            if (error != null) {
                                return callback(error, null);
                            } else {
                                if (hub != null) {
                                    hub.invoke(method, observerId);
                                }
                                return callback(null, hub);
                            }
                        });
                    };
                    SignalRBrowserWrapper.prototype.unsubscribe = function(hubName, method, observerId, subject, pastCallback, callback) {
                        this.removeCallback(subject, pastCallback);
                        if (this.observer_callbacks[subject].length === 0) {
                            return this.getHub(hubName, function(error, hub) {
                                if (error != null) {
                                    return callback(error, null);
                                } else {
                                    if (hub != null) {
                                        hub.invoke(method, observerId);
                                    }
                                    return callback(null, hub);
                                }
                            });
                        } else {
                            return callback(null, true);
                        }
                    };
                    return SignalRBrowserWrapper;
                }();
            }).call(this);
        }, {} ],
        6: [ function(_dereq_, module, exports) {
            (function() {
                var App, MojioModel, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
                    for (var key in parent) {
                        if (__hasProp.call(parent, key)) child[key] = parent[key];
                    }
                    function ctor() {
                        this.constructor = child;
                    }
                    ctor.prototype = parent.prototype;
                    child.prototype = new ctor();
                    child.__super__ = parent.prototype;
                    return child;
                };
                MojioModel = _dereq_("./MojioModel");
                module.exports = App = function(_super) {
                    __extends(App, _super);
                    App.prototype._schema = {
                        Type: "String",
                        Name: "String",
                        Description: "String",
                        CreationDate: "String",
                        Downloads: "Integer",
                        RedirectUris: "String",
                        ApplicationType: "String",
                        _id: "String",
                        _deleted: "Boolean"
                    };
                    App.prototype._resource = "Apps";
                    App.prototype._model = "App";
                    function App(json) {
                        App.__super__.constructor.call(this, json);
                    }
                    App._resource = "Apps";
                    App._model = "App";
                    App.resource = function() {
                        return App._resource;
                    };
                    App.model = function() {
                        return App._model;
                    };
                    return App;
                }(MojioModel);
            }).call(this);
        }, {
            "./MojioModel": 10
        } ],
        7: [ function(_dereq_, module, exports) {
            (function() {
                var Event, MojioModel, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
                    for (var key in parent) {
                        if (__hasProp.call(parent, key)) child[key] = parent[key];
                    }
                    function ctor() {
                        this.constructor = child;
                    }
                    ctor.prototype = parent.prototype;
                    child.prototype = new ctor();
                    child.__super__ = parent.prototype;
                    return child;
                };
                MojioModel = _dereq_("./MojioModel");
                module.exports = Event = function(_super) {
                    __extends(Event, _super);
                    Event.prototype._schema = {
                        Type: "Integer",
                        MojioId: "String",
                        VehicleId: "String",
                        OwnerId: "String",
                        EventType: "Integer",
                        Time: "String",
                        Location: "Object",
                        Accelerometer: "Object",
                        TimeIsApprox: "Boolean",
                        BatteryVoltage: "Float",
                        ConnectionLost: "Boolean",
                        _id: "String",
                        _deleted: "Boolean",
                        TripId: "String",
                        Altitude: "Float",
                        Heading: "Float",
                        Distance: "Float",
                        FuelLevel: "Float",
                        FuelEfficiency: "Float",
                        Speed: "Float",
                        Acceleration: "Float",
                        Deceleration: "Float",
                        Odometer: "Float",
                        RPM: "Integer",
                        DTCs: "Array",
                        MilStatus: "Boolean",
                        Force: "Float",
                        MaxSpeed: "Float",
                        AverageSpeed: "Float",
                        MovingTime: "Float",
                        IdleTime: "Float",
                        StopTime: "Float",
                        MaxRPM: "Float",
                        EventTypes: "Array",
                        Timing: "Integer",
                        Name: "String",
                        ObserverType: "Integer",
                        AppId: "String",
                        Parent: "String",
                        ParentId: "String",
                        Subject: "String",
                        SubjectId: "String",
                        Transports: "Integer",
                        Status: "Integer",
                        Tokens: "Array"
                    };
                    Event.prototype._resource = "Events";
                    Event.prototype._model = "Event";
                    function Event(json) {
                        Event.__super__.constructor.call(this, json);
                    }
                    Event._resource = "Events";
                    Event._model = "Event";
                    Event.resource = function() {
                        return Event._resource;
                    };
                    Event.model = function() {
                        return Event._model;
                    };
                    return Event;
                }(MojioModel);
            }).call(this);
        }, {
            "./MojioModel": 10
        } ],
        8: [ function(_dereq_, module, exports) {
            (function() {
                var Login, MojioModel, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
                    for (var key in parent) {
                        if (__hasProp.call(parent, key)) child[key] = parent[key];
                    }
                    function ctor() {
                        this.constructor = child;
                    }
                    ctor.prototype = parent.prototype;
                    child.prototype = new ctor();
                    child.__super__ = parent.prototype;
                    return child;
                };
                MojioModel = _dereq_("./MojioModel");
                module.exports = Login = function(_super) {
                    __extends(Login, _super);
                    Login.prototype._schema = {
                        Type: "String",
                        AppId: "String",
                        UserId: "String",
                        ValidUntil: "String",
                        Scopes: "String",
                        Sandboxed: "Boolean",
                        Depricated: "Boolean",
                        _id: "String",
                        _deleted: "Boolean"
                    };
                    Login.prototype._resource = "Login";
                    Login.prototype._model = "Login";
                    function Login(json) {
                        Login.__super__.constructor.call(this, json);
                    }
                    Login._resource = "Login";
                    Login._model = "Login";
                    Login.resource = function() {
                        return Login._resource;
                    };
                    Login.model = function() {
                        return Login._model;
                    };
                    return Login;
                }(MojioModel);
            }).call(this);
        }, {
            "./MojioModel": 10
        } ],
        9: [ function(_dereq_, module, exports) {
            (function() {
                var Mojio, MojioModel, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
                    for (var key in parent) {
                        if (__hasProp.call(parent, key)) child[key] = parent[key];
                    }
                    function ctor() {
                        this.constructor = child;
                    }
                    ctor.prototype = parent.prototype;
                    child.prototype = new ctor();
                    child.__super__ = parent.prototype;
                    return child;
                };
                MojioModel = _dereq_("./MojioModel");
                module.exports = Mojio = function(_super) {
                    __extends(Mojio, _super);
                    Mojio.prototype._schema = {
                        Type: "Integer",
                        OwnerId: "String",
                        Name: "String",
                        Imei: "String",
                        LastContactTime: "String",
                        VehicleId: "String",
                        _id: "String",
                        _deleted: "Boolean"
                    };
                    Mojio.prototype._resource = "Mojios";
                    Mojio.prototype._model = "Mojio";
                    function Mojio(json) {
                        Mojio.__super__.constructor.call(this, json);
                    }
                    Mojio._resource = "Mojios";
                    Mojio._model = "Mojio";
                    Mojio.resource = function() {
                        return Mojio._resource;
                    };
                    Mojio.model = function() {
                        return Mojio._model;
                    };
                    return Mojio;
                }(MojioModel);
            }).call(this);
        }, {
            "./MojioModel": 10
        } ],
        10: [ function(_dereq_, module, exports) {
            (function() {
                var MojioModel;
                module.exports = MojioModel = function() {
                    MojioModel._resource = "Schema";
                    MojioModel._model = "Model";
                    function MojioModel(json) {
                        this._client = null;
                        this.validate(json);
                    }
                    MojioModel.prototype.setField = function(field, value) {
                        this[field] = value;
                        return this[field];
                    };
                    MojioModel.prototype.getField = function(field) {
                        return this[field];
                    };
                    MojioModel.prototype.validate = function(json) {
                        var field, value, _results;
                        _results = [];
                        for (field in json) {
                            value = json[field];
                            _results.push(this.setField(field, value));
                        }
                        return _results;
                    };
                    MojioModel.prototype.stringify = function() {
                        return JSON.stringify(this, this.replacer);
                    };
                    MojioModel.prototype.replacer = function(key, value) {
                        if (key === "_client" || key === "_schema" || key === "_resource" || key === "_model") {
                            return void 0;
                        } else {
                            return value;
                        }
                    };
                    MojioModel.prototype.query = function(criteria, callback) {
                        var property, query_criteria, value;
                        if (this._client === null) {
                            callback("No authorization set for model, use authorize(), passing in a mojio _client where login() has been called successfully.", null);
                            return;
                        }
                        if (criteria instanceof Object) {
                            if (criteria.criteria == null) {
                                query_criteria = "";
                                for (property in criteria) {
                                    value = criteria[property];
                                    query_criteria += "" + property + "=" + value + ";";
                                }
                                criteria = {
                                    criteria: query_criteria
                                };
                            }
                            return this._client.request({
                                method: "GET",
                                resource: this.resource(),
                                parameters: criteria
                            }, function(_this) {
                                return function(error, result) {
                                    return callback(error, _this._client.model(_this.model(), result));
                                };
                            }(this));
                        } else if (typeof criteria === "string") {
                            return this._client.request({
                                method: "GET",
                                resource: this.resource(),
                                parameters: {
                                    id: criteria
                                }
                            }, function(_this) {
                                return function(error, result) {
                                    return callback(error, _this._client.model(_this.model(), result));
                                };
                            }(this));
                        } else {
                            return callback("criteria given is not in understood format, string or object.", null);
                        }
                    };
                    MojioModel.prototype.get = function(criteria, callback) {
                        return this.query(criteria, callback);
                    };
                    MojioModel.prototype.create = function(callback) {
                        if (this._client === null) {
                            callback("No authorization set for model, use authorize(), passing in a mojio _client where login() has been called successfully.", null);
                            return;
                        }
                        return this._client.request({
                            method: "POST",
                            resource: this.resource(),
                            body: this.stringify()
                        }, callback);
                    };
                    MojioModel.prototype.post = function(callback) {
                        return this.create(callback);
                    };
                    MojioModel.prototype.save = function(callback) {
                        if (this._client === null) {
                            callback("No authorization set for model, use authorize(), passing in a mojio _client where login() has been called successfully.", null);
                            return;
                        }
                        return this._client.request({
                            method: "PUT",
                            resource: this.resource(),
                            body: this.stringify(),
                            parameters: {
                                id: this._id
                            }
                        }, callback);
                    };
                    MojioModel.prototype.put = function(callback) {
                        return this.save(callback);
                    };
                    MojioModel.prototype["delete"] = function(callback) {
                        return this._client.request({
                            method: "DELETE",
                            resource: this.resource(),
                            parameters: {
                                id: this._id
                            }
                        }, callback);
                    };
                    MojioModel.prototype.observe = function(object, subject, observer_callback, callback) {
                        if (subject == null) {
                            subject = null;
                        }
                        return this._client.observe(object, subject, observer_callback, callback);
                    };
                    MojioModel.prototype.unobserve = function(object, subject, observer_callback, callback) {
                        if (subject == null) {
                            subject = null;
                        }
                        return this._client.observe(object, subject, observer_callback, callback);
                    };
                    MojioModel.prototype.store = function(model, key, value, callback) {
                        return this._client.store(model, key, value, callback);
                    };
                    MojioModel.prototype.storage = function(model, key, callback) {
                        return this._client.storage(model, key, callback);
                    };
                    MojioModel.prototype.unstore = function(model, key, callback) {
                        return this._client.unstore(model, key, callback);
                    };
                    MojioModel.prototype.statistic = function(expression, callback) {
                        return callback(null, true);
                    };
                    MojioModel.prototype.resource = function() {
                        return this._resource;
                    };
                    MojioModel.prototype.model = function() {
                        return this._model;
                    };
                    MojioModel.prototype.schema = function() {
                        return this._schema;
                    };
                    MojioModel.prototype.authorization = function(client) {
                        this._client = client;
                        return this;
                    };
                    MojioModel.prototype.id = function() {
                        return this._id;
                    };
                    MojioModel.prototype.mock = function(type, withid) {
                        var field, value, _ref;
                        if (withid == null) {
                            withid = false;
                        }
                        _ref = this.schema();
                        for (field in _ref) {
                            value = _ref[field];
                            if (field === "Type") {
                                this.setField(field, this.model());
                            } else if (field === "UserName") {
                                this.setField(field, "Tester");
                            } else if (field === "Email") {
                                this.setField(field, "test@moj.io");
                            } else if (field === "Password") {
                                this.setField(field, "Password007!");
                            } else if (field !== "_id" || withid) {
                                switch (value) {
                                  case "Integer":
                                    this.setField(field, "0");
                                    break;

                                  case "Boolean":
                                    this.setField(field, false);
                                    break;

                                  case "String":
                                    this.setField(field, "test" + Math.random());
                                }
                            }
                        }
                        return this;
                    };
                    return MojioModel;
                }();
            }).call(this);
        }, {} ],
        11: [ function(_dereq_, module, exports) {
            (function() {
                var MojioModel, Observer, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
                    for (var key in parent) {
                        if (__hasProp.call(parent, key)) child[key] = parent[key];
                    }
                    function ctor() {
                        this.constructor = child;
                    }
                    ctor.prototype = parent.prototype;
                    child.prototype = new ctor();
                    child.__super__ = parent.prototype;
                    return child;
                };
                MojioModel = _dereq_("./MojioModel");
                module.exports = Observer = function(_super) {
                    __extends(Observer, _super);
                    Observer.prototype._schema = {
                        Type: "String",
                        Name: "String",
                        ObserverType: "String",
                        EventTypes: "Array",
                        AppId: "String",
                        OwnerId: "String",
                        Parent: "String",
                        ParentId: "String",
                        Subject: "String",
                        SubjectId: "String",
                        Transports: "Integer",
                        Status: "Integer",
                        Tokens: "Array",
                        _id: "String",
                        _deleted: "Boolean"
                    };
                    Observer.prototype._resource = "Observers";
                    Observer.prototype._model = "Observer";
                    function Observer(json) {
                        Observer.__super__.constructor.call(this, json);
                    }
                    Observer._resource = "Observers";
                    Observer._model = "Observer";
                    Observer.resource = function() {
                        return Observer._resource;
                    };
                    Observer.model = function() {
                        return Observer._model;
                    };
                    return Observer;
                }(MojioModel);
            }).call(this);
        }, {
            "./MojioModel": 10
        } ],
        12: [ function(_dereq_, module, exports) {
            (function() {
                var MojioModel, Product, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
                    for (var key in parent) {
                        if (__hasProp.call(parent, key)) child[key] = parent[key];
                    }
                    function ctor() {
                        this.constructor = child;
                    }
                    ctor.prototype = parent.prototype;
                    child.prototype = new ctor();
                    child.__super__ = parent.prototype;
                    return child;
                };
                MojioModel = _dereq_("./MojioModel");
                module.exports = Product = function(_super) {
                    __extends(Product, _super);
                    Product.prototype._schema = {
                        Type: "String",
                        AppId: "String",
                        Name: "String",
                        Description: "String",
                        Shipping: "Boolean",
                        Taxable: "Boolean",
                        Price: "Float",
                        Discontinued: "Boolean",
                        OwnerId: "String",
                        CreationDate: "String",
                        _id: "String",
                        _deleted: "Boolean"
                    };
                    Product.prototype._resource = "Products";
                    Product.prototype._model = "Product";
                    function Product(json) {
                        Product.__super__.constructor.call(this, json);
                    }
                    Product._resource = "Products";
                    Product._model = "Product";
                    Product.resource = function() {
                        return Product._resource;
                    };
                    Product.model = function() {
                        return Product._model;
                    };
                    return Product;
                }(MojioModel);
            }).call(this);
        }, {
            "./MojioModel": 10
        } ],
        13: [ function(_dereq_, module, exports) {
            (function() {
                var MojioModel, Subscription, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
                    for (var key in parent) {
                        if (__hasProp.call(parent, key)) child[key] = parent[key];
                    }
                    function ctor() {
                        this.constructor = child;
                    }
                    ctor.prototype = parent.prototype;
                    child.prototype = new ctor();
                    child.__super__ = parent.prototype;
                    return child;
                };
                MojioModel = _dereq_("./MojioModel");
                module.exports = Subscription = function(_super) {
                    __extends(Subscription, _super);
                    Subscription.prototype._schema = {
                        Type: "Integer",
                        ChannelType: "Integer",
                        ChannelTarget: "String",
                        AppId: "String",
                        OwnerId: "String",
                        Event: "Integer",
                        EntityType: "Integer",
                        EntityId: "String",
                        Interval: "Integer",
                        LastMessage: "String",
                        _id: "String",
                        _deleted: "Boolean"
                    };
                    Subscription.prototype._resource = "Subscriptions";
                    Subscription.prototype._model = "Subscription";
                    function Subscription(json) {
                        Subscription.__super__.constructor.call(this, json);
                    }
                    Subscription._resource = "Subscriptions";
                    Subscription._model = "Subscription";
                    Subscription.resource = function() {
                        return Subscription._resource;
                    };
                    Subscription.model = function() {
                        return Subscription._model;
                    };
                    return Subscription;
                }(MojioModel);
            }).call(this);
        }, {
            "./MojioModel": 10
        } ],
        14: [ function(_dereq_, module, exports) {
            (function() {
                var MojioModel, Trip, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
                    for (var key in parent) {
                        if (__hasProp.call(parent, key)) child[key] = parent[key];
                    }
                    function ctor() {
                        this.constructor = child;
                    }
                    ctor.prototype = parent.prototype;
                    child.prototype = new ctor();
                    child.__super__ = parent.prototype;
                    return child;
                };
                MojioModel = _dereq_("./MojioModel");
                module.exports = Trip = function(_super) {
                    __extends(Trip, _super);
                    Trip.prototype._schema = {
                        Type: "Integer",
                        MojioId: "String",
                        VehicleId: "String",
                        StartTime: "String",
                        LastUpdatedTime: "String",
                        EndTime: "String",
                        MaxSpeed: "Float",
                        MaxAcceleration: "Float",
                        MaxDeceleration: "Float",
                        MaxRPM: "Integer",
                        FuelLevel: "Float",
                        FuelEfficiency: "Float",
                        Distance: "Float",
                        StartLocation: "Object",
                        LastKnownLocation: "Object",
                        EndLocation: "Object",
                        StartAddress: "Object",
                        EndAddress: "Object",
                        ForcefullyEnded: "Boolean",
                        StartMilage: "Float",
                        EndMilage: "Float",
                        StartOdometer: "Float",
                        _id: "String",
                        _deleted: "Boolean"
                    };
                    Trip.prototype._resource = "Trips";
                    Trip.prototype._model = "Trip";
                    function Trip(json) {
                        Trip.__super__.constructor.call(this, json);
                    }
                    Trip._resource = "Trips";
                    Trip._model = "Trip";
                    Trip.resource = function() {
                        return Trip._resource;
                    };
                    Trip.model = function() {
                        return Trip._model;
                    };
                    return Trip;
                }(MojioModel);
            }).call(this);
        }, {
            "./MojioModel": 10
        } ],
        15: [ function(_dereq_, module, exports) {
            (function() {
                var MojioModel, User, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
                    for (var key in parent) {
                        if (__hasProp.call(parent, key)) child[key] = parent[key];
                    }
                    function ctor() {
                        this.constructor = child;
                    }
                    ctor.prototype = parent.prototype;
                    child.prototype = new ctor();
                    child.__super__ = parent.prototype;
                    return child;
                };
                MojioModel = _dereq_("./MojioModel");
                module.exports = User = function(_super) {
                    __extends(User, _super);
                    User.prototype._schema = {
                        Type: "Integer",
                        UserName: "String",
                        FirstName: "String",
                        LastName: "String",
                        Email: "String",
                        UserCount: "Integer",
                        Credits: "Integer",
                        CreationDate: "String",
                        LastActivityDate: "String",
                        LastLoginDate: "String",
                        Locale: "String",
                        _id: "String",
                        _deleted: "Boolean"
                    };
                    User.prototype._resource = "Users";
                    User.prototype._model = "User";
                    function User(json) {
                        User.__super__.constructor.call(this, json);
                    }
                    User._resource = "Users";
                    User._model = "User";
                    User.resource = function() {
                        return User._resource;
                    };
                    User.model = function() {
                        return User._model;
                    };
                    return User;
                }(MojioModel);
            }).call(this);
        }, {
            "./MojioModel": 10
        } ],
        16: [ function(_dereq_, module, exports) {
            (function() {
                var MojioModel, Vehicle, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
                    for (var key in parent) {
                        if (__hasProp.call(parent, key)) child[key] = parent[key];
                    }
                    function ctor() {
                        this.constructor = child;
                    }
                    ctor.prototype = parent.prototype;
                    child.prototype = new ctor();
                    child.__super__ = parent.prototype;
                    return child;
                };
                MojioModel = _dereq_("./MojioModel");
                module.exports = Vehicle = function(_super) {
                    __extends(Vehicle, _super);
                    Vehicle.prototype._schema = {
                        Type: "Integer",
                        OwnerId: "String",
                        MojioId: "String",
                        Name: "String",
                        VIN: "String",
                        LicensePlate: "String",
                        IgnitionOn: "Boolean",
                        VehicleTime: "String",
                        LastTripEvent: "String",
                        LastLocationTime: "String",
                        LastLocation: "Object",
                        LastSpeed: "Float",
                        FuelLevel: "Float",
                        LastAcceleration: "Float",
                        LastAccelerometer: "Object",
                        LastAltitude: "Float",
                        LastBatteryVoltage: "Float",
                        LastDistance: "Float",
                        LastHeading: "Float",
                        LastVirtualOdometer: "Float",
                        LastOdometer: "Float",
                        LastRpm: "Float",
                        LastFuelEfficiency: "Float",
                        CurrentTrip: "String",
                        LastTrip: "String",
                        LastContactTime: "String",
                        MilStatus: "Boolean",
                        DiagnosticCodes: "Object",
                        FaultsDetected: "Boolean",
                        LastLocationTimes: "Array",
                        LastLocations: "Array",
                        LastSpeeds: "Array",
                        LastHeadings: "Array",
                        LastAltitudes: "Array",
                        Viewers: "Array",
                        _id: "String",
                        _deleted: "Boolean"
                    };
                    Vehicle.prototype._resource = "Vehicles";
                    Vehicle.prototype._model = "Vehicle";
                    function Vehicle(json) {
                        Vehicle.__super__.constructor.call(this, json);
                    }
                    Vehicle._resource = "Vehicles";
                    Vehicle._model = "Vehicle";
                    Vehicle.resource = function() {
                        return Vehicle._resource;
                    };
                    Vehicle.model = function() {
                        return Vehicle._model;
                    };
                    return Vehicle;
                }(MojioModel);
            }).call(this);
        }, {
            "./MojioModel": 10
        } ]
    }, {}, [ 4 ])(4);
});