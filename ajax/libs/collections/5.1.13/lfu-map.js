"use strict";

var Shim = require("./shim");
var LfuSet = require("./lfu-set");
var GenericCollection = require("./generic-collection");
var GenericMap = require("./generic-map");
var PropertyChanges = require("./listen/property-changes");
var MapChanges = require("./listen/map-changes");

module.exports = LfuMap;

function LfuMap(values, maxLength, equals, hash, getDefault) {
    if (!(this instanceof LfuMap)) {
        return new LfuMap(values, maxLength, equals, hash, getDefault);
    }
    equals = equals || Object.equals;
    hash = hash || Object.hash;
    getDefault = getDefault || Function.noop;
    this.contentEquals = equals;
    this.contentHash = hash;
    this.getDefault = getDefault;
    this.store = new LfuSet(
        undefined,
        maxLength,
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

LfuMap.LfuMap = LfuMap; // hack so require("lfu-map").LfuMap will work in MontageJS

Object.addEach(LfuMap.prototype, GenericCollection.prototype);
Object.addEach(LfuMap.prototype, GenericMap.prototype);
Object.addEach(LfuMap.prototype, PropertyChanges.prototype);
Object.addEach(LfuMap.prototype, MapChanges.prototype);

Object.defineProperty(LfuMap.prototype,"size",GenericCollection._sizePropertyDescriptor);
LfuMap.from = GenericCollection.from;

LfuMap.prototype.constructClone = function (values) {
    return new this.constructor(
        values,
        this.maxLength,
        this.contentEquals,
        this.contentHash,
        this.getDefault
    );
};

LfuMap.prototype.log = function (charmap, stringify) {
    stringify = stringify || this.stringify;
    this.store.log(charmap, stringify);
};

LfuMap.prototype.stringify = function (item, leader) {
    return leader + JSON.stringify(item.key) + ": " + JSON.stringify(item.value);
};

LfuMap.prototype.addMapChangeListener = function () {
    if (!this.dispatchesMapChanges) {
        // Detect LFU deletions in the LfuSet and emit as MapChanges.
        // Array and Heap have no store.
        // Dict and FastMap define no listeners on their store.
        var self = this;
        this.store.addBeforeRangeChangeListener(function(plus, minus) {
            if (plus.length && minus.length) {  // LFU item pruned
                self.dispatchBeforeMapChange(minus[0].key, undefined);
            }
        });
        this.store.addRangeChangeListener(function(plus, minus) {
            if (plus.length && minus.length) {
                self.dispatchMapChange(minus[0].key, undefined);
            }
        });
    }
    MapChanges.prototype.addMapChangeListener.apply(this, arguments);
};
