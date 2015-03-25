!function(e) {
    if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define(e); else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), 
        f.Address = e();
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
            (function() {
                var Address, MojioModel, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
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
                module.exports = Address = function(_super) {
                    __extends(Address, _super);
                    Address.prototype._schema = {
                        Address1: "String",
                        Address2: "String",
                        City: "String",
                        State: "String",
                        Zip: "String",
                        Country: "String"
                    };
                    Address.prototype._resource = "Addresss";
                    Address.prototype._model = "Address";
                    function Address(json) {
                        Address.__super__.constructor.call(this, json);
                    }
                    Address._resource = "Addresss";
                    Address._model = "Address";
                    Address.resource = function() {
                        return Address._resource;
                    };
                    Address.model = function() {
                        return Address._model;
                    };
                    return Address;
                }(MojioModel);
            }).call(this);
        }, {
            "./MojioModel": 2
        } ],
        2: [ function(_dereq_, module, exports) {
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
        }, {} ]
    }, {}, [ 1 ])(1);
});

!function(e) {
    if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define(e); else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), 
        f.App = e();
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
            "./MojioModel": 2
        } ],
        2: [ function(_dereq_, module, exports) {
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
        }, {} ]
    }, {}, [ 1 ])(1);
});

!function(e) {
    if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define(e); else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), 
        f.Event = e();
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
            "./MojioModel": 2
        } ],
        2: [ function(_dereq_, module, exports) {
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
        }, {} ]
    }, {}, [ 1 ])(1);
});

!function(e) {
    if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define(e); else {
        var o;
        "undefined" != typeof window ? o = window : "undefined" != typeof global ? o = global : "undefined" != typeof self && (o = self), 
        o.Location = e();
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
            (function() {
                var Location, MojioModel, __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
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
                module.exports = Location = function(_super) {
                    __extends(Location, _super);
                    Location.prototype._schema = {
                        Lat: "Float",
                        Lng: "Float",
                        FromLockedGPS: "Boolean",
                        Dilution: "Float",
                        IsValid: "Boolean"
                    };
                    Location.prototype._resource = "Locations";
                    Location.prototype._model = "Location";
                    function Location(json) {
                        Location.__super__.constructor.call(this, json);
                    }
                    Location._resource = "Locations";
                    Location._model = "Location";
                    Location.resource = function() {
                        return Location._resource;
                    };
                    Location.model = function() {
                        return Location._model;
                    };
                    return Location;
                }(MojioModel);
            }).call(this);
        }, {
            "./MojioModel": 2
        } ],
        2: [ function(_dereq_, module, exports) {
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
        }, {} ]
    }, {}, [ 1 ])(1);
});

!function(e) {
    if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define(e); else {
        var o;
        "undefined" != typeof window ? o = window : "undefined" != typeof global ? o = global : "undefined" != typeof self && (o = self), 
        o.Mojio = e();
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
            "./MojioModel": 2
        } ],
        2: [ function(_dereq_, module, exports) {
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
        }, {} ]
    }, {}, [ 1 ])(1);
});

!function(e) {
    if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define(e); else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), 
        f.Observer = e();
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
        2: [ function(_dereq_, module, exports) {
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
            "./MojioModel": 1
        } ]
    }, {}, [ 2 ])(2);
});

!function(e) {
    if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define(e); else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), 
        f.Product = e();
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
        2: [ function(_dereq_, module, exports) {
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
            "./MojioModel": 1
        } ]
    }, {}, [ 2 ])(2);
});

!function(e) {
    if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define(e); else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), 
        f.Subscription = e();
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
        2: [ function(_dereq_, module, exports) {
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
            "./MojioModel": 1
        } ]
    }, {}, [ 2 ])(2);
});

!function(e) {
    if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define(e); else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), 
        f.Trip = e();
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
        2: [ function(_dereq_, module, exports) {
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
            "./MojioModel": 1
        } ]
    }, {}, [ 2 ])(2);
});

!function(e) {
    if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define(e); else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), 
        f.User = e();
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
        2: [ function(_dereq_, module, exports) {
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
            "./MojioModel": 1
        } ]
    }, {}, [ 2 ])(2);
});

!function(e) {
    if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define(e); else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), 
        f.Vehicle = e();
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
        2: [ function(_dereq_, module, exports) {
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
            "./MojioModel": 1
        } ]
    }, {}, [ 2 ])(2);
});