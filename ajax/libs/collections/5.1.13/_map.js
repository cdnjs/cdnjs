"use strict";

var Shim = require("./shim");
var GenericCollection = require("./generic-collection");
var Map, GlobalMap, CollectionsMap;

if((global.Map !== void 0) && (typeof global.Set.prototype.values === "function")) {

    Map = module.exports = global.Map,
    GlobalMap = Map;
    Map.Map = Map; // hack so require("map").Map will work in MontageJS

    // use different strategies for making sets observable between Internet
    // Explorer and other browsers.
    var protoIsSupported = {}.__proto__ === Object.prototype,
        map_makeObservable;

    if (protoIsSupported) {
        map_makeObservable = function () {
            this.__proto__ = ChangeDispatchMap;
        };
    } else {
        map_makeObservable = function () {
            Object.defineProperties(this, observableSetProperties);
        };
    }

    Object.defineProperty(Map.prototype, "makeObservable", {
        value: map_makeObservable,
        writable: true,
        configurable: true,
        enumerable: false
    });

    //This is a no-op test in property-changes.js - PropertyChanges.prototype.makePropertyObservable, so might as well not pay the price every time....
    Object.defineProperty(Map.prototype, "makePropertyObservable", {
        value: function(){},
        writable: true,
        configurable: true,
        enumerable: false
    });


    Map.prototype.constructClone = function (values) {
        return new this.constructor(values);
    };

    Map.prototype.isMap = true;
    Map.prototype.addEach = function (values) {
        if (values && Object(values) === values) {
            if (typeof values.forEach === "function") {
                // copy map-alikes
                if (values.isMap === true) {
                    values.forEach(function (value, key) {
                        this.set(key, value);
                    }, this);
                // iterate key value pairs of other iterables
                } else {
                    values.forEach(function (pair) {
                        this.set(pair[0], pair[1]);
                    }, this);
                }
            } else if (typeof values.length === "number") {
                // Array-like objects that do not implement forEach, ergo,
                // Arguments
                for (var i = 0; i < values.length; i++) {
                    this.add(values[i], i);
                }
            } else {
                // copy other objects as map-alikes
                Object.keys(values).forEach(function (key) {
                    this.set(key, values[key]);
                }, this);
            }
        } else if (values && typeof values.length === "number") {
            // String
            for (var i = 0; i < values.length; i++) {
                this.add(values[i], i);
            }
        }
        return this;
    };

    Map.prototype.add = function (value, key) {
        return this.set(key, value);
    };

    Map.prototype.reduce = function (callback, basis /*, thisp*/) {
        var thisp = arguments[2];
        this.forEach(function(value, key, map) {
            basis = callback.call(thisp, basis, value, key, this);
        });
        return basis;
    };

    Map.prototype.reduceRight = function (callback, basis /*, thisp*/) {
        var thisp = arguments[2];
        var keysIterator = this.keys();
        var size = this.size;
        var reverseOrder = new Array(this.size);
        var aKey, i = 0;
        while ((aKey = keysIterator.next().value)) {
            reverseOrder[--size] = aKey;
        }
        while (i++ < size) {
            basis = callback.call(thisp, basis, this.get(reverseOrder[i]), reverseOrder[i], this);
        }
        return basis;
    };

    Map.prototype.equals = function (that, equals) {
        equals = equals || Object.equals;
        if (this === that) {
            return true;
        } else if (that && typeof that.every === "function") {
            return that.size === this.size && that.every(function (value, key) {
                return equals(this.get(key), value);
            }, this);
        } else {
            var keys = Object.keys(that);
            return keys.length === this.size && Object.keys(that).every(function (key) {
                return equals(this.get(key), that[key]);
            }, this);
        }
    };

    var _keysArrayFunction = function(value,key) {return key;};
    Map.prototype.keysArray = function() {
        return this.map(_keysArrayFunction);
    }
    var _valuesArrayFunction = function(value,key) {return value;};
    Map.prototype.valuesArray = function() {
        return this.map(_valuesArrayFunction);
    }
    var _entriesArrayFunction = function(value,key) {return [key,value];};
    Map.prototype.entriesArray = function() {
        return this.map(_entriesArrayFunction);
    }
    Map.prototype.toJSON = function () {
        return this.entriesArray();
    };

    // XXX deprecated
    Map.prototype.items = function () {
        return this.entriesArray();
    };

    // Map.prototype.contentEquals = Object.equals;
    // Map.prototype.contentHash = Object.hash;


    Map.from = function (value) {
        var result = new this;
        result.addEach(value);
        return result;
    };


    //Backward compatibility:
    Object.defineProperty(Map.prototype,"length",{
        get: function() {
            return this.size;
        },
        enumerable: true,
        configurable:true
    });


    var map_clear = Map.prototype.clear,
        map_set = Map.prototype.set,
        map_delete = Map.prototype.delete;

    var observableMapProperties = {
        clear : {
            value: function () {
                var keys;
                if (this.dispatchesMapChanges) {
                    this.forEach(function (value, key) {
                        this.dispatchBeforeMapChange(key, value);
                    }, this);
                    keys = this.keysArray();
                }
                map_clear.call(this);
                if (this.dispatchesMapChanges) {
                    keys.forEach(function (key) {
                        this.dispatchMapChange(key);
                    }, this);
                }
            },
            writable: true,
            configurable: true

        },
        set : {
            value: function (key, value) {
                var found = this.get(key);
                if (found) { // update
                    if (this.dispatchesMapChanges) {
                        this.dispatchBeforeMapChange(key, found);
                    }

                    map_set.call(this,key, value);

                    if (this.dispatchesMapChanges) {
                        this.dispatchMapChange(key, value);
                    }
                } else { // create
                    if (this.dispatchesMapChanges) {
                        this.dispatchBeforeMapChange(key, undefined);
                    }

                    map_set.call(this,key, value);

                    if (this.dispatchesMapChanges) {
                        this.dispatchMapChange(key, value);
                    }
                }
                return this;
            },
            writable: true,
            configurable: true
        },

        "delete": {
            value: function (key) {
                if (this.has(key)) {
                    if (this.dispatchesMapChanges) {
                        this.dispatchBeforeMapChange(key, this.get(key));
                    }
                    map_delete.call(this,key);

                    if (this.dispatchesMapChanges) {
                        this.dispatchMapChange(key, undefined);
                    }
                    return true;
                }
                return false;
            }
        }
    };



    Object.addEach(Map.prototype, GenericCollection.prototype, false);

    var ChangeDispatchMap = Object.create(Map.prototype, observableMapProperties);
}

    var Set = require("./_set").CollectionsSet;
    var GenericMap = require("./generic-map");

    CollectionsMap = Map = function Map(values, equals, hash, getDefault) {
        if (!(this instanceof Map)) {
            return new Map(values, equals, hash, getDefault);
        }
        equals = equals || Object.equals;
        hash = hash || Object.hash;
        getDefault = getDefault || Function.noop;
        this.contentEquals = equals;
        this.contentHash = hash;
        this.getDefault = getDefault;
        this.store = new Set(
            undefined,
            function keysEqual(a, b) {
                return equals(a.key, b.key);
            },
            function keyHash(item) {
                return hash(item.key);
            }
        );
        this.length = 0;
        this.addEach(values);
    }

    Map.Map = Map; // hack so require("map").Map will work in MontageJS

    Object.addEach(Map.prototype, GenericCollection.prototype);
    Object.addEach(Map.prototype, GenericMap.prototype); // overrides GenericCollection
    Object.defineProperty(Map.prototype,"size",GenericCollection._sizePropertyDescriptor);

    Map.from = GenericCollection.from;

    Map.prototype.constructClone = function (values) {
        return new this.constructor(
            values,
            this.contentEquals,
            this.contentHash,
            this.getDefault
        );
    };

    Map.prototype.log = function (charmap, logNode, callback, thisp) {
        logNode = logNode || this.logNode;
        this.store.log(charmap, function (node, log, logBefore) {
            logNode(node.value.value, log, logBefore);
        }, callback, thisp);
    };

    Map.prototype.logNode = function (node, log) {
        log(' key: ' + node.key);
        log(' value: ' + node.value);
    };

    if(!GlobalMap) {
        module.exports = CollectionsMap;
    }
    else {
        module.exports = GlobalMap;
        GlobalMap.CollectionsMap = CollectionsMap;
    }
